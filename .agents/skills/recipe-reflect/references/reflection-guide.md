# Reflection Guide

## Purpose

Guide for structured reflection at the Hypothesis, Opportunity, and Vision levels.

## Reflection Principles

- **Reflect on the artifact, not in a separate place**: Results are appended to the target file (hypothesis, Opportunity, vision.md)
- **ADR-style lifecycle**: Each artifact carries its full history
- **Decision-relevant learning**: Success and failure can generate knowledge when they change an artifact or future decision
- **Distill evidence**: Use knowledge-distiller to synthesize learnings and contradictions across individual results

## Reflection Levels

### Level 1: Hypothesis Reflection (per hypothesis)
**Trigger**: Hypothesis reaches conclusion (validated / invalidated / inconclusive / adopted / rejected / timeout)
**Target file**: The hypothesis file itself

**Process**:
1. Record the result with evidence in the hypothesis file
2. Update confidence scores with final values
3. Document a learning when it can change a later decision
4. Identify a next decision when the result changes one
5. Flag if this result changes understanding of the parent Opportunity

### Level 2: Opportunity Reflection (per Opportunity)
**Trigger**: After multiple hypotheses under an Opportunity reach conclusions, or when shifting focus away from an Opportunity
**Target file**: The Opportunity file (Tier 2 Learnings section)

**Process**:
1. Invoke knowledge-distiller with the evidence needed to assess candidate learnings and contradictions under this Opportunity
2. Update Tier 2 Learnings from the supported results
3. Check if any Tier 2 learnings qualify for Tier 1 promotion
4. Update related hypotheses only if Opportunity understanding changes their status

### Level 3: Vision Reflection (periodic / milestone)
**Trigger**: After a significant PRD is delivered, quarterly review, or strategic pivot
**Target file**: `docs/product/vision.md` and `docs/product/learnings.md`

**Process**:
1. Review Product Outcomes — are they still the right targets?
2. Review NSM — is it still the right connecting metric?
3. Invoke knowledge-distiller to synthesize cross-Opportunity evidence
4. Promote qualified learnings to Tier 1 (`docs/product/learnings.md`)
5. Preserve links to the evidence supporting each promoted learning

## Distillation Quality Criteria

See product-principles skill for the authoritative Knowledge Pyramid and promotion criteria. knowledge-distiller applies them when proposing promotions.
