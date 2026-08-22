---
name: recipe-reflect
description: Orchestrates reflection by updating affected artifacts and distilling reusable knowledge from validation results.
disable-model-invocation: true
---

**Context**: Drive the feedback loop by reflecting on outcomes, updating target artifacts, and distilling learnings across the knowledge pyramid (see product-principles skill for Tier definitions).

## Required Skills [LOAD BEFORE EXECUTION]

1. [LOAD IF NOT ACTIVE] `product-principles` — Knowledge Pyramid and promotion criteria
2. [LOAD IF NOT ACTIVE] `hypothesis-discipline` — validation results, lifecycle status, and confidence changes

Delegate Level 2 and Level 3 distillation to knowledge-distiller for unbiased pattern extraction.

## Execution Decision Flow

### 1. Scope Assessment

Input: Use the path or text supplied with the explicit skill invocation. If no input was supplied and the target cannot be inferred unambiguously, ask for it.

**Determine the reflection level** (see `references/reflection-guide.md`):

| Trigger | Level | Target Files |
|---------|-------|-------------|
| Hypothesis concluded | Level 1: Hypothesis | The hypothesis file |
| Multiple hypotheses concluded under an Opportunity | Level 2: Opportunity | Opportunity file (Tier 2 Learnings section) |
| PRD delivered, quarterly review, strategic pivot | Level 3: Vision | `docs/product/vision.md`, `docs/product/learnings.md` |

### 2. Result Recording

#### Level 1: Hypothesis Reflection
1. Verify the hypothesis file has been updated with results (validation results, confidence scores, evidence)
2. Document a learning when the result changes the parent Opportunity or a later decision
3. Check if this result changes understanding of the parent Opportunity

#### Level 2: Opportunity Reflection
1. Start from the Opportunity summary or index and load the hypothesis evidence needed to confirm or challenge a candidate pattern
2. Prepare context for knowledge-distiller (hypothesis summaries, results, confidence changes)

#### Level 3: Vision Reflection
1. Gather the cross-Opportunity evidence needed for the outcome, NSM, or Tier 1 decision
2. Review Product Outcomes — are targets still correct?
3. Review NSM — still the right connecting metric?
4. Prepare context for knowledge-distiller

### 3. Knowledge Distillation

**Invoke knowledge-distiller** for pattern extraction:
- knowledge-distiller operates in a separate context to avoid individual hypothesis bias
- It analyzes multiple hypotheses to find patterns, contradictions, and trends
- It proposes Tier 2 learnings (for Opportunity) or Tier 1 promotions (for Vision)
- It enforces distillation quality criteria (per product-principles skill)

Present distillation results to the user for the knowledge-promotion decision:
- Extracted patterns and trends
- Proposed learnings (Tier 2 or Tier 1)
- Contradictions found and the decisions they may affect
- Tier promotion proposals with supporting evidence

End the current turn with the distillation result as the workflow output. Promote knowledge only after the user confirms the proposal in a later turn.

### 4. Knowledge Promotion

After that confirmation:

#### Tier 3 → Tier 2
- Write learnings to the Opportunity file's "Tier 2 Learnings" section
- Include hypothesis references that support each learning

#### Tier 2 → Tier 1
- Write to `docs/product/learnings.md`
- Include freshness tag (`last-validated: YYYY-MM-DD`)
- Include supporting hypothesis references (3+ required)
- Include cross-segment evidence

### 5. Index Update

Update `docs/discovery/INDEX.md` when one of these indexed values changed:
- Hypothesis status summary (counts by status)
- Opportunity-to-hypothesis mapping
- Recent validation results
- Tier 1 learning changes (if any)
- Last updated timestamp

## Sub-agent Usage

| Agent | When | Why (context separation benefit) |
|-------|------|----------------------------------|
| knowledge-distiller | Level 2 and Level 3 reflection | Unbiased pattern extraction across individual hypotheses |

## Scope Boundaries

**Included**: Result recording, knowledge distillation, Tier promotion, INDEX.md maintenance
**Not included**: Hypothesis validation (→ recipe-validate), new hypothesis generation (→ recipe-discover)

## Completion

The workflow is complete when approved promotions and affected index values are updated, or a no-change result is reported with the evidence and contradictions relevant to the decision.
