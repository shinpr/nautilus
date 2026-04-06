---
name: recipe-refine-visuals
description: Use when a design-capable human wants to refine the auto-derived Visual Tokens in `docs/product/design/brand-direction.md`
disable-model-invocation: true
---

**Context**: Refine the Visual Tokens in `docs/product/design/brand-direction.md` after `recipe-blueprint` has created an initial set.

This is intentionally a side workflow. Use it when a human with design judgment wants to refine the auto-derived token set. Do not force this into the main blueprint flow for users who cannot make token-level design decisions.

## Required Skills [LOAD BEFORE EXECUTION]

1. [LOAD IF NOT ACTIVE] `blueprint-standards` — brand-direction template and Visual Token structure
2. [LOAD IF NOT ACTIVE] `design-perspective` — accessibility and persona-aware design review

## Workflow

1. Read `docs/product/design/brand-direction.md`
2. Review current Visual Tokens against design principles, personas, and prototype learnings
3. Verify:
   - text-on-surface contrast ratio is at least 4.5:1 for normal text
   - heading text is at least 1.25x the body size in the primary hierarchy step
   - spacing tokens form a consistent increasing scale without reversals
4. Present overrides and rationale to the user
5. After approval, update the same `brand-direction.md` file and mark the source as `expert-refined`

## Scope Boundaries

**Included**: colors, typography, spacing, radius, shadow values
**Not included**: redesigning the entire blueprint or introducing implementation-specific component APIs
