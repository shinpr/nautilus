---
name: recipe-validate
description: Orchestrate hypothesis validation through type-appropriate methods — prototypes, code analysis, market research, and expert review
disable-model-invocation: true
---

**Context**: Validate hypotheses using appropriate methods based on risk type. Invoke hypothesis-verifier for bias-free validation design. Record results in hypothesis files.

## Required Skills [LOAD BEFORE EXECUTION]

1. [LOAD IF NOT ACTIVE] `hypothesis-discipline` — hypothesis lifecycle, confidence scoring rules, time budgets
2. [LOAD IF NOT ACTIVE] `product-principles` — 4 Risks, Confidence Meter, MVP definition
3. [LOAD IF NOT ACTIVE] `prototype-guide` — prototype prompt construction and design context injection
4. [LOAD IF NOT ACTIVE] `business-context` — BMC/VPC for Viability validation

## Orchestrator Definition

**Execution Protocol**:
1. **Delegate verification design** to hypothesis-verifier for bias-free assessment
2. **Follow the validation flow** defined below
3. **Stop at every `[STOP — BLOCKING]` marker** — present findings and CANNOT proceed until user explicitly confirms

## Workflow Overview

```
Input (hypothesis file or hypothesis ID)
    ↓
1. Hypothesis Assessment → Read and understand the hypothesis
    ↓
2. Validation Design → hypothesis-verifier designs the test [Stop: User confirms design]
    ↓
3. Validation Execution → Type-appropriate method
    ↓
4. Result Recording → Update hypothesis file [Stop: User reviews results]
    ↓
Output: Updated hypothesis file with validation results
```

## Execution Decision Flow

### 1. Hypothesis Assessment

Input: $ARGUMENTS

Read the target hypothesis file(s). Understand:
- What is being tested (the hypothesis statement)
- Which risk dimension is primary (Value / Usability / Feasibility / Viability)
- Current confidence scores
- Time budget and deadline
- Parent Opportunity context

### 2. Validation Design

**Invoke hypothesis-verifier** to design the validation:
- hypothesis-verifier operates in a separate context to prevent confirmation bias
- It designs the test without knowing the orchestrator's expectations
- It defines success/failure criteria independently

**[STOP — BLOCKING]** Present validation design to user for confirmation:
- Proposed validation method
- Success and failure criteria
- Required resources and time estimate
- Risk of the validation approach itself

**CANNOT proceed to validation execution until user explicitly confirms the design.**

### 3. Validation Execution

Execute validation based on the risk type and method:

| Risk Type | Validation Methods | Tools |
|-----------|-------------------|-------|
| **Value** | Market research, user interviews, competitive analysis, landing page test | Web search, survey analysis |
| **Usability** | Prototype testing, usability study, interaction analysis | Prototype generation (per prototype-guide skill) |
| **Feasibility** | Code spike, architecture review, dependency analysis | codebase-analyzer, code execution |
| **Viability** | Business model analysis, ROI calculation, regulatory review | Web search, BMC/VPC analysis |

#### Prototype Generation (for Usability validation)
When generating prototypes:
1. Construct prompt using prototype-guide skill `references/prototype-prompt-guide.md`
2. Inject design context (principles, persona, scenario, DS)
3. When `docs/product/design/` exists, read only the blueprint artifacts relevant to the prototype:
   - see `blueprint-standards` Artifact Overview for the full artifact list
   - always read `brand-direction.md` when present
   - read `information-architecture.md` when page hierarchy or navigation matters
   - read the specific file in `flows/` that matches the interaction under test
   - read `content-model.md` when mock data shape or entity relationships matter
   - read `ai-interaction-model.md` only for AI-powered features
   - if a relevant artifact is missing, say so explicitly instead of inferring a missing file
4. Generate prototype with appropriate tool
5. Save output to `docs/discovery/prototypes/`

#### Market Research (for Value/Viability validation)
Use web search to gather market data. See product-principles skill `references/mvp-definition.md` for scope assessment.

### 4. Result Recording

After validation execution:

1. Update the hypothesis file:
   - Change status (validated / invalidated / inconclusive / timeout)
   - Update confidence scores with evidence
   - Record evidence and artifacts
   - Document learnings
2. Link to validation artifacts (prototypes, data, interview notes)

**[STOP — BLOCKING]** Present results to user for review:
- Validation outcome (validated / invalidated / inconclusive)
- Updated confidence scores with evidence
- Key learnings
- Recommended next actions

**CANNOT proceed to next hypothesis or close the workflow until user explicitly reviews.**

### 5. Timeout Handling

When a hypothesis reaches its deadline without conclusion:
1. Set status to `timeout`
2. Present options to user:
   - **Extend**: Add more time with justification
   - **Pivot**: Modify the hypothesis based on partial evidence
   - **Abandon**: Stop validation, record learnings from partial evidence

## Sub-agent Usage

| Agent | When | Why (context separation benefit) |
|-------|------|----------------------------------|
| hypothesis-verifier | Always (validation design) | Eliminates confirmation bias in test design |
| codebase-analyzer | Feasibility validation | Objective code analysis without hypothesis bias |

## Scope Boundaries

**Included**: Hypothesis validation design, validation execution, result recording
**Not included**: Hypothesis generation (→ recipe-discover), PRD creation (→ recipe-define), reflection/distillation (→ recipe-reflect)

## Completion Criteria

- [ ] Hypothesis assessed and understood
- [ ] hypothesis-verifier designed the validation (bias-free)
- [ ] User confirmed validation design
- [ ] Validation executed with appropriate method
- [ ] Hypothesis file updated with results and evidence
- [ ] User reviewed results
- [ ] Next actions identified
