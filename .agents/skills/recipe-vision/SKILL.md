---
name: recipe-vision
description: Defines or updates product vision, outcomes, NSM, and decision-relevant design principles. Use when starting a product, changing strategy, or reassessing outcomes.
disable-model-invocation: true
---

**Context**: Create or update `docs/product/vision.md` with Product Outcomes, Business Outcomes, NSM, design principles, and strategic priorities.

## Execution Decision Flow

### 1. Context Assessment

Input: $ARGUMENTS

| Situation | Mode | Action |
|-----------|------|--------|
| No `docs/product/vision.md` exists | Create | Full vision definition |
| Vision exists, triggered by reflection | Update | Review and update specific sections |
| Vision exists, strategic pivot | Update | Re-evaluate outcomes and priorities |

### 2. Vision Definition

Use `references/vision-template.md` to structure the vision:

#### New Product (Create Mode)
1. **Product Vision**: What does this product aspire to become? (2-3 sentences)
2. **Design Vision**: How should the product feel to users?
3. **Business Outcomes**: What business results does the product contribute to?
4. **Product Outcomes**: What team-controllable product goals drive those business results?
5. **NSM**: What single metric connects Product Outcomes to Business Outcomes?

#### Existing Product (Update Mode)
1. Review current vision against `docs/product/learnings.md` when that file exists
2. Assess whether Product Outcomes are still the right targets
3. Evaluate NSM — still the right connecting metric?
4. Update specific sections based on trigger

### 3. Design Principles

Define or review the small set of product-specific design principles needed to resolve recurring design trade-offs:
- Each principle should resolve a specific design trade-off
- Principles guide all design decisions across the product
- Write to `docs/product/design-principles.md`

### 4. Strategic Priorities

When the current request includes cycle planning, define priorities:
- Map priorities to Product Outcomes
- Identify key Opportunities per priority
- Document strategic bets (outcome-level hypotheses)

Present the complete vision to the user for the product-strategy decision:
- Product vision and design vision
- Outcome structure (Business → Product → NSM)
- Design principles
- Strategic priorities for current cycle
- Strategic bets with confidence levels

End the current turn with the vision draft as the workflow output. Write files only after the user confirms that draft in a later turn.

### 5. File Output

After that confirmation:
- Write or update `docs/product/vision.md`
- Write or update `docs/product/design-principles.md`

## Scope Boundaries

**Included**: Vision definition, outcome structure, NSM, design principles, strategic priorities
**Not included**: Opportunity discovery (→ recipe-discover), persona definition (→ recipe-persona), reflection/distillation (→ recipe-reflect)

## Completion

The workflow is complete when the confirmed vision and applicable design principles are written, or a no-change result is reported with any unresolved strategy decision.
