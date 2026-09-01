---
name: recipe-refine-visuals
description: Use when a design-capable human wants to refine the auto-derived Visual Tokens in `docs/product/design/brand-direction.md`
disable-model-invocation: true
metadata:
  opencode/autoinvoke: "false"
---

**Context**: Refine the Visual Tokens in `docs/product/design/brand-direction.md` after `recipe-blueprint` has created an initial set.

This side workflow applies when a human with design judgment explicitly requests refinement of the auto-derived token set.

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
4. Apply exact overrides supplied by the user and mark the source as `expert-refined`
5. When the request requires a new design choice, present only that choice and its rationale; update the file after the user confirms it

## Scope Boundaries

**Included**: colors, typography, spacing, radius, shadow values
**Not included**: redesigning the entire blueprint or introducing implementation-specific component APIs
