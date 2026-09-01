---
name: recipe-validate
description: Validates a hypothesis with a risk-appropriate method and records decision-relevant evidence. Use when testing Value, Usability, Feasibility, or Viability assumptions.
disable-model-invocation: true
metadata:
  opencode/autoinvoke: "false"
---

**Context**: Validate hypotheses using appropriate methods based on risk type. Invoke hypothesis-verifier for bias-free validation design. Record results in hypothesis files.

## Required Skills [LOAD BEFORE EXECUTION]

1. [LOAD IF NOT ACTIVE] `hypothesis-discipline` — lifecycle, evidence, confidence, and stopping conditions
2. [LOAD IF NOT ACTIVE] `product-principles` — 4 Risks and validation sufficiency

## Conditional Skills [LOAD WHEN TRIGGERED]

- WHEN the selected method is prototype validation: [LOAD IF NOT ACTIVE] `prototype-guide`
- WHEN the selected method uses business-model, market, or viability analysis: [LOAD IF NOT ACTIVE] `business-context`

Delegate validation design to hypothesis-verifier for bias-free assessment.

## Execution Decision Flow

### 1. Hypothesis Assessment

Input: Use the path or text supplied with the explicit skill invocation. If no input was supplied and the target cannot be inferred unambiguously, ask for it.

Read the target hypothesis file(s). Understand:
- What is being tested (the hypothesis statement)
- Which risk dimension is primary (Value / Usability / Feasibility / Viability)
- Current confidence scores
- Validation stopping condition, including a time budget or deadline when present
- Parent Opportunity context

### 2. Validation Design

**Invoke hypothesis-verifier** to design the validation:
- hypothesis-verifier operates in a separate context to prevent confirmation bias
- It designs the test without knowing the orchestrator's expectations
- It defines success/failure criteria independently

Present the validation design to the user when executing it would commit external resources, change the product outcome, or exceed the confirmed time or cost boundary:
- Proposed validation method
- Success and failure criteria
- Required resources and time estimate
- Risk of the validation approach itself

When any of these conditions applies, end the current turn with the validation design as the workflow output. Execute that validation only after the user confirms it in a later turn.

Otherwise, execute local and reversible validation within the confirmed boundary without an additional stop.

### 3. Validation Execution

Execute validation based on the risk type and method:

| Risk Type | Validation Methods | Tools |
|-----------|-------------------|-------|
| **Value** | Market research, user interviews, competitive analysis, landing page test | Web search, survey analysis |
| **Usability** | Prototype testing, usability study, interaction analysis | prototype-generator (per prototype-guide skill) |
| **Feasibility** | Code spike, architecture review, dependency analysis | codebase-analyzer, code execution |
| **Viability** | Business model analysis, ROI calculation, regulatory review | Web search, BMC/VPC analysis |

#### Prototype Generation (for Usability validation)
Invoke `prototype-generator` in a separate context:

1. Pass `hypothesis_path` as the canonical target hypothesis path.
2. Pass one exact `output_path` per invocation. Use `docs/discovery/prototypes/hypo-{id}-prototype.html` by default; when the confirmed validation design requires separate artifacts, use `docs/discovery/prototypes/hypo-{id}-{variant}-prototype.html` for each artifact.
3. The generator reads the decision-relevant product and design sources directly and writes one self-contained HTML artifact at that path. The validation design determines whether one artifact or separate variant artifacts supply sufficient evidence.
4. Consume its completion report as prototype-readiness evidence. When it returns `blocked`, resolve only the named incomplete condition before invoking it again.
5. Collect the observations defined by the confirmed validation design before recording a hypothesis result. When observation has not run, report the prototype as ready and validation as pending; use `inconclusive` only when executed validation produced insufficient evidence.
6. Continue validation and result recording in the parent context; prototype-generator does not update the hypothesis record.

#### Market Research (for Value/Viability validation)
Use web search to gather market data. See product-principles skill `references/mvp-definition.md` for scope assessment.

### 4. Result Recording

After validation execution:

1. Update the hypothesis file:
   - Change status (validated / invalidated / inconclusive / timeout)
   - Update confidence scores with evidence
   - Record evidence and artifacts
   - Document a learning when the result can change a later decision
2. Link to validation artifacts (prototypes, data, interview notes)

Present the results to the user:
- Validation outcome (validated / invalidated / inconclusive)
- Updated confidence scores with evidence
- Key learnings
- Next decision, when the result creates one

### 5. Timeout Handling

When a hypothesis with a deadline reaches it without conclusion:
1. Set status to `timeout`
2. Present options to user:
   - **Extend**: Add more time with justification
   - **Pivot**: Modify the hypothesis based on partial evidence
   - **Abandon**: Stop validation, record learnings from partial evidence

## Sub-agent Usage

| Agent | When | Why (context separation benefit) |
|-------|------|----------------------------------|
| hypothesis-verifier | Always (validation design) | Eliminates confirmation bias in test design |
| prototype-generator | Prototype validation | Keeps generated frontend code and visual iteration out of validation design and result-recording context |
| codebase-analyzer | Feasibility validation | Objective code analysis without hypothesis bias |

## Scope Boundaries

**Included**: Hypothesis validation design, validation execution, result recording
**Not included**: Hypothesis generation (→ recipe-discover), PRD creation (→ recipe-define), reflection/distillation (→ recipe-reflect)

## Completion

The workflow is complete when the hypothesis record contains the validation result and evidence, including a bounded inconclusive or timeout result, and the user has received the next decision when one exists.
