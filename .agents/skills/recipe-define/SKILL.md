---
name: recipe-define
description: Creates a delivery-ready PRD from validated hypotheses with material 4 Risks evidence and necessary traceability. Use when turning validation results into requirements or user stories.
disable-model-invocation: true
---

**Context**: Transform validated hypotheses into a PRD with 4 Risks confidence scores, hypothesis traceability, and user stories. The PRD follows a standard structure that can be consumed by downstream implementation workflows.

## Required Skills [LOAD BEFORE EXECUTION]

1. [LOAD IF NOT ACTIVE] `prd-standards` — PRD structure, user stories, and acceptance criteria
2. [LOAD IF NOT ACTIVE] `product-principles` — 4 Risks, confidence thresholds, and MVP scope

## Conditional Skills [LOAD WHEN TRIGGERED]

- WHEN the PRD contains user-facing interaction, Design Context, or accessibility requirements: [LOAD IF NOT ACTIVE] `design-perspective`

Delegate the completed draft to doc-reviewer for bias-free quality assessment before asking for final product approval.

## Execution Decision Flow

### 1. Readiness Assessment

Input: Use the path or text supplied with the explicit skill invocation. If no input was supplied and the target cannot be inferred unambiguously, ask for it.

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
2. **User Stories**: Record material 4 Risks evidence at the smallest scope that changes delivery readiness
3. **Functional Requirements**: Derive from validated hypotheses with testable ACs. Use EARS patterns when they clarify the trigger, state, or condition. Assign stable AC IDs when an implementation, test, or planning consumer references individual ACs; keep criteria unnumbered when no such consumer exists
4. **Design Context**: Include the project design decisions and validation artifacts needed by delivery; link the source instead of copying unrelated sections
5. **Success Criteria**: Tie to Product Outcomes from `docs/product/vision.md`
6. **Assumptions (Unvalidated)**: Explicitly list hypotheses NOT yet validated that the PRD proceeds with

### 3. User Story Generation

Use prd-standards skill `references/user-story-guide.md` for the user stories:

1. Write in persona-grounded format (As a [persona name], I want to...)
2. Assess the risk dimensions that can change the story's delivery decision, reusing shared evidence instead of repeating it
3. Determine delivery readiness per story
4. Document a remaining risk at story level only when it differs from the shared assessment

### 4. Quality Review

**Invoke doc-reviewer** for bias-free assessment:
- doc-reviewer operates in a separate context
- It checks: completeness, internal consistency, evidence backing
- It identifies gaps the author might have missed

For each finding:
- apply it when it corrects an approved requirement, accepted decision, repository rule, observable correctness, or necessary evidence;
- decline it with evidence when it adds scope, reverses an exclusion, duplicates proof, or has no justified effect on the PRD consumer; or
- return it to the user when resolving it changes the product outcome or a major approved decision.

Re-run doc-reviewer only when an applied change can invalidate its assessment. Present the reviewed PRD, remaining risks, declined findings, and approval recommendation to the user for final product approval.

End the current turn with the reviewed draft as the workflow output. Write the PRD only after the user confirms that draft in a later turn.

### 5. File Output

After that confirmation:
- Write PRD to `docs/prd/[feature-name]-prd.md`

## Sub-agent Usage

| Agent | When | Why (context separation benefit) |
|-------|------|----------------------------------|
| doc-reviewer | PRD quality review | Eliminates author's self-review bias |

## PRD Structure

The PRD uses the sections and nautilus extensions needed by its delivery consumer and is stored in `docs/prd/`. Shared evidence belongs at feature scope; story sections contain only story-specific decisions or differences.

## Scope Boundaries

**Included**: PRD creation, user story generation, quality review
**Not included**: Hypothesis validation (→ recipe-validate), Design Doc/ADR creation, implementation

## Completion

The workflow is complete when the confirmed PRD exists at its target path and the user has received the remaining risks, declined findings, and any unresolved product decision.
