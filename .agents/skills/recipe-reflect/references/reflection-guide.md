# Reflection Guide

## Purpose

Guide for structured reflection at three levels: PRD unit, Opportunity unit, and Vision unit. Reflection drives the feedback loop that makes the product development cycle learn from itself.

## Reflection Principles

- **Reflect on the artifact, not in a separate place**: Results are appended to the target file (hypothesis, Opportunity, vision.md)
- **ADR-style lifecycle**: Each artifact carries its full history
- **Every outcome is a learning**: Success and failure both generate knowledge
- **Distill, don't just record**: Use knowledge-distiller to extract patterns from individual results

## Reflection Levels

### Level 1: Hypothesis Reflection (per hypothesis)
**Trigger**: Hypothesis reaches conclusion (validated / invalidated / inconclusive / adopted / rejected / timeout)
**Target file**: The hypothesis file itself

**Process**:
1. Record the result with evidence in the hypothesis file
2. Update confidence scores with final values
3. Document what was learned regardless of outcome
4. Identify next actions
5. Flag if this result changes understanding of the parent Opportunity

### Level 2: Opportunity Reflection (per Opportunity)
**Trigger**: After multiple hypotheses under an Opportunity reach conclusions, or when shifting focus away from an Opportunity
**Target file**: The Opportunity file (Tier 2 Learnings section)

**Process**:
1. Invoke knowledge-distiller to analyze all hypotheses under this Opportunity
2. Extract patterns: What worked? What didn't? What surprised us?
3. Update Tier 2 Learnings in the Opportunity file
4. Check if any Tier 2 learnings qualify for Tier 1 promotion
5. Update related hypotheses' status if Opportunity understanding changed

### Level 3: Vision Reflection (periodic / milestone)
**Trigger**: After a significant PRD is delivered, quarterly review, or strategic pivot
**Target file**: `docs/product/vision.md` and `docs/product/learnings.md`

**Process**:
1. Review Product Outcomes — are they still the right targets?
2. Review NSM — is it still the right connecting metric?
3. Invoke knowledge-distiller to analyze cross-Opportunity patterns
4. Promote qualified learnings to Tier 1 (`docs/product/learnings.md`)
5. Update `docs/discovery/INDEX.md` with current status

## Distillation Quality Criteria

See product-principles skill for authoritative definitions of the Knowledge Pyramid and distillation criteria (3+ Rule, Cross-Segment Consistency, Contradiction Handling, Freshness Tags). knowledge-distiller enforces these criteria when proposing promotions.

## INDEX.md Update

recipe-reflect updates `docs/discovery/INDEX.md` with:
- Hypothesis status summary (draft / testing / validated / invalidated / inconclusive / adopted / rejected / timeout counts)
- Opportunity-to-hypothesis mapping
- Recent validation results
- Tier 1 learning changes

## Reflection Checklist

- [ ] Target artifact updated with results
- [ ] Confidence scores updated with evidence
- [ ] Learnings documented (not just outcomes)
- [ ] knowledge-distiller invoked for pattern extraction (Level 2+)
- [ ] Tier promotion criteria checked
- [ ] Contradictions explicitly noted
- [ ] INDEX.md updated
- [ ] Freshness tags current on Tier 1 learnings
