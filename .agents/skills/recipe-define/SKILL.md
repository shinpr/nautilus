---
name: recipe-define
description: Orchestrate PRD creation from validated hypotheses — standard PRD output with 4 Risks confidence and hypothesis traceability
disable-model-invocation: true
---

**Context**: Transform validated hypotheses into a PRD with 4 Risks confidence scores, hypothesis traceability, and user stories. The PRD follows a standard structure that can be consumed by downstream implementation workflows.

## Required Skills [LOAD BEFORE EXECUTION]

1. [LOAD IF NOT ACTIVE] `prd-standards` — PRD template, user story format, acceptance criteria
2. [LOAD IF NOT ACTIVE] `product-principles` — 4 Risks, Confidence Meter, MVP scope
3. [LOAD IF NOT ACTIVE] `design-perspective` — state design requirements, WCAG 2.2 AA for PRD completeness

## Orchestrator Definition

**Execution Protocol**:
1. **Delegate review** to doc-reviewer for bias-free quality assessment
2. **Follow the definition flow** defined below
3. **Stop at every `[STOP — BLOCKING]` marker** — present findings and CANNOT proceed until user explicitly confirms

## Workflow Overview

```
Input (validated hypotheses + Opportunity context)
    ↓
1. Readiness Assessment → Check hypothesis confidence levels
    ↓
2. PRD Drafting → Using prd-template.md with nautilus extensions
    ↓
3. User Story Generation → 4 Risks per story [Stop: User reviews PRD draft]
    ↓
4. Quality Review → doc-reviewer assesses the PRD [Stop: User reviews feedback]
    ↓
Output: docs/prd/[feature-name]-prd.md
```

## Execution Decision Flow

### 1. Readiness Assessment

Input: $ARGUMENTS

Assess whether hypotheses are "validated enough" for PRD creation:

1. Read relevant Opportunity and hypothesis files
2. For each hypothesis intended for the PRD:
   - Check confidence scores against thresholds (see prd-standards skill `references/user-story-guide.md`)
   - Assess cost x risk x reversibility
   - Determine: validated enough / needs more validation
3. See product-principles skill `references/mvp-definition.md` for scope determination

**Decision**:
- All key hypotheses validated enough → Proceed to PRD drafting
- Some hypotheses below threshold → Present to user with options:
  - Lower threshold (add risk mitigation like feature flags)
  - Validate further (→ recipe-validate)
  - Proceed with documented remaining risks

### 2. PRD Drafting

Use prd-standards skill `references/prd-template.md` to create the PRD:

1. **Overview**: Link to Opportunity and validated hypotheses
2. **User Stories**: Apply 4 Risks assessment per story (see step 3)
3. **Functional Requirements**: Derive from validated hypotheses with EARS-format ACs (see prd-standards skill `references/acceptance-criteria.md`). Assign stable AC IDs (`AC-001`, `AC-002`, ...) sequentially across the PRD
4. **Design Context**: Populate from project design artifacts and validation artifacts:
   - **Design Principles**: Copy from `docs/product/design-principles.md`
   - **Tone & Voice / Visual Direction**: Copy from `docs/product/design/brand-direction.md` when available
   - **Design Guardrails**: Derive Do/Don't guidance from principles and prototype learnings
   - **Visual Reference**: Link relevant blueprint and prototype files
5. **Success Criteria**: Tie to Product Outcomes from `docs/product/vision.md`
6. **Assumptions (Unvalidated)**: Explicitly list hypotheses NOT yet validated that the PRD proceeds with

### 3. User Story Generation

For each user story, follow prd-standards skill `references/user-story-guide.md`:

1. Write in persona-grounded format (As a [persona name], I want to...)
2. Assess 4 Risks confidence with evidence
3. Determine delivery readiness per story
4. Document remaining risks per story

**[STOP — BLOCKING]** Present PRD draft to user for review:
- Complete PRD draft
- User stories with 4 Risks confidence summary
- Highlighted remaining risks and unvalidated assumptions
- MVP scope recommendation (Must Have / Should Have / Could Have)

**CANNOT proceed to quality review until user explicitly approves the draft.**

### 4. Quality Review

**Invoke doc-reviewer** for bias-free assessment:
- doc-reviewer operates in a separate context
- It checks: completeness, internal consistency, evidence backing
- It identifies gaps the author might have missed

**[STOP — BLOCKING]** Present doc-reviewer feedback to user:
- doc-reviewer's assessment
- Required changes (if any)
- Approval recommendation

**CANNOT finalize PRD until user explicitly approves after reviewing feedback.**

If changes required:
1. Apply changes to the PRD
2. Re-run doc-reviewer if changes are significant
3. Present updated PRD for final approval

### 5. File Output

After user approval:
- Write PRD to `docs/prd/[feature-name]-prd.md`

## Sub-agent Usage

| Agent | When | Why (context separation benefit) |
|-------|------|----------------------------------|
| doc-reviewer | PRD quality review | Eliminates author's self-review bias |

## PRD Structure

The PRD output follows a standard structure:
- **Core sections**: Overview, User Stories, Functional Requirements, Design Context, Non-Functional Requirements, Success Criteria, Technical Considerations
- **nautilus extensions**: Hypothesis & validation references, 4 Risks confidence per user story, design context references, unvalidated assumptions section
- **Storage**: `docs/prd/`

The extensions are additive — they don't replace or modify the core sections. This means the PRD can be consumed by any downstream workflow that expects the standard structure.

## Scope Boundaries

**Included**: PRD creation, user story generation, quality review
**Not included**: Hypothesis validation (→ recipe-validate), Design Doc/ADR creation, implementation

## Completion Criteria

- [ ] Hypothesis readiness assessed
- [ ] PRD drafted with hypothesis refs, 4 Risks, remaining risks
- [ ] User stories include 4 Risks confidence per story
- [ ] User reviewed PRD draft
- [ ] doc-reviewer assessed quality
- [ ] User approved final PRD
- [ ] PRD written to `docs/prd/`
