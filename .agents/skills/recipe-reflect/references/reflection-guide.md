# Reflection Guide

## Purpose

Guide for structured reflection at three levels: PRD unit, Opportunity unit, and Vision unit. Reflection drives the feedback loop that makes the product development cycle learn from itself.

## Reflection Principles

- **Reflect on the artifact, not in a separate place**: Results are appended to the target file (hypothesis, Opportunity, vision.md)
- **ADR-style lifecycle**: Each artifact carries its full history
- **Decision-relevant learning**: Success and failure can generate knowledge when they change an artifact or future decision
- **Distill, don't just record**: Use knowledge-distiller to extract patterns from individual results

## Reflection Levels

### Level 1: Hypothesis Reflection (per hypothesis)
**Trigger**: Hypothesis reaches conclusion (validated / invalidated / inconclusive / adopted / rejected / timeout)
**Target file**: The hypothesis file itself

**Process**:
1. Record the result with evidence in the hypothesis file
2. Update confidence scores with final values
3. Document what was learned regardless of outcome
4. Identify a next decision when the result changes one
5. Flag if this result changes understanding of the parent Opportunity

### Level 2: Opportunity Reflection (per Opportunity)
**Trigger**: After multiple hypotheses under an Opportunity reach conclusions, or when shifting focus away from an Opportunity
**Target file**: The Opportunity file (Tier 2 Learnings section)

**Process**:
1. Invoke knowledge-distiller with the evidence needed to confirm or challenge candidate patterns under this Opportunity
2. Extract patterns: What worked? What didn't? What surprised us?
3. Update Tier 2 Learnings in the Opportunity file
4. Check if any Tier 2 learnings qualify for Tier 1 promotion
5. Update related hypotheses only if Opportunity understanding changes their status

### Level 3: Vision Reflection (periodic / milestone)
**Trigger**: After a significant PRD is delivered, quarterly review, or strategic pivot
**Target file**: `docs/product/vision.md` and `docs/product/learnings.md`

**Process**:
1. Review Product Outcomes — are they still the right targets?
2. Review NSM — is it still the right connecting metric?
3. Invoke knowledge-distiller to analyze cross-Opportunity patterns
4. Promote qualified learnings to Tier 1 (`docs/product/learnings.md`)
5. Update `docs/discovery/INDEX.md` when an indexed status or mapping changed

## Distillation Quality Criteria

See product-principles skill for authoritative definitions of the Knowledge Pyramid and distillation criteria (3+ Rule, Cross-Segment Consistency, Contradiction Handling, Freshness Tags). knowledge-distiller enforces these criteria when proposing promotions.

## INDEX.md Update

When an indexed value changes, recipe-reflect updates the affected part of `docs/discovery/INDEX.md`:
- Hypothesis status summary (draft / testing / validated / invalidated / inconclusive / adopted / rejected / timeout counts)
- Opportunity-to-hypothesis mapping
- Recent validation results
- Tier 1 learning changes
