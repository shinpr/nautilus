---
name: recipe-vision
description: Define or update product vision, strategy, outcomes, and NSM
disable-model-invocation: true
---

**Context**: Create or update `docs/product/vision.md` with Product Outcomes, Business Outcomes, NSM, design principles, and strategic priorities.

## Orchestrator Definition

**Execution Protocol**:
1. **Follow the vision flow** defined below
2. **Stop at every `[STOP — BLOCKING]` marker** — present findings and CANNOT proceed until user explicitly confirms

## Workflow Overview

```
Input (new product / strategic update / reflection trigger)
    ↓
1. Context Assessment → New vs. Update mode
    ↓
2. Vision Definition → Product vision, design vision, outcomes, NSM
    ↓
3. Design Principles → Define or review product-specific principles
    ↓
4. Strategic Priorities → Current cycle priorities [Stop: User confirms vision]
    ↓
Output: docs/product/vision.md + docs/product/design-principles.md
```

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
1. Review current vision against recent learnings (`docs/product/learnings.md`)
2. Assess whether Product Outcomes are still the right targets
3. Evaluate NSM — still the right connecting metric?
4. Update specific sections based on trigger

### 3. Design Principles

Define or review 3-5 product-specific design principles:
- Each principle should resolve a specific design trade-off
- Principles guide all design decisions across the product
- Write to `docs/product/design-principles.md`

### 4. Strategic Priorities

Define current cycle priorities:
- Map priorities to Product Outcomes
- Identify key Opportunities per priority
- Document strategic bets (outcome-level hypotheses)

**[STOP — BLOCKING]** Present complete vision to user for confirmation:
- Product vision and design vision
- Outcome structure (Business → Product → NSM)
- Design principles
- Strategic priorities for current cycle
- Strategic bets with confidence levels

**CANNOT write files until user explicitly confirms.**

### 5. File Output

After user approval:
- Write or update `docs/product/vision.md`
- Write or update `docs/product/design-principles.md`
- Initialize `docs/product/learnings.md` if it doesn't exist (empty, ready for recipe-reflect)

## Scope Boundaries

**Included**: Vision definition, outcome structure, NSM, design principles, strategic priorities
**Not included**: Opportunity discovery (→ recipe-discover), persona definition (→ recipe-persona), reflection/distillation (→ recipe-reflect)

## Completion Criteria

- [ ] Context assessed (create vs. update)
- [ ] Vision defined with outcome structure
- [ ] NSM defined with rationale
- [ ] Design principles defined (3-5 principles)
- [ ] Strategic priorities set for current cycle
- [ ] User confirmed vision
- [ ] Files written to `docs/product/`
