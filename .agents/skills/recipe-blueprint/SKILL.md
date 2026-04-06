---
name: recipe-blueprint
description: Use when you need shared structural design context before prototype-heavy validation — define information architecture, user flows, content model, brand direction, Visual Tokens, and AI interaction model
disable-model-invocation: true
---

**Context**: Create or update structural design artifacts in `docs/product/design/` so prototype generation and PRD authoring reuse the same design context.

## Required Skills [LOAD BEFORE EXECUTION]

1. [LOAD IF NOT ACTIVE] `blueprint-standards` — blueprint templates and artifact rules
2. [LOAD IF NOT ACTIVE] `design-perspective` — design principles, persona grounding, accessibility
3. [LOAD IF NOT ACTIVE] `product-principles` — traceability, state design, validation discipline

## Orchestrator Definition

**Execution Protocol**:
1. Follow the blueprint flow below
2. Stop at every `[STOP — BLOCKING]` marker

## Workflow Overview

```
Input (vision, personas, opportunities, existing product context)
    ↓
1. Context Reading
    ↓
2. IA and Key Flow Definition
    ↓
3. Content Model Definition
    ↓
4. Brand Direction and Visual Tokens
    ↓
5. AI Interaction Model (if applicable)
    ↓
Output: docs/product/design/ artifacts
```

## Execution Decision Flow

### 1. Context Reading

Read:
- `docs/product/vision.md`
- `docs/product/design-principles.md`
- `docs/product/personas/`
- `docs/discovery/opportunities/`
- `docs/discovery/journeys/` when available
- `docs/product/learnings.md` when available

**Gate**: vision, design principles, at least one persona, and at least one opportunity must exist.

If the gate fails:
- list the missing prerequisites explicitly
- recommend the corresponding recipe:
  - missing vision or design principles → `recipe-vision`
  - missing personas → `recipe-persona`
  - missing opportunities → `recipe-discover`
- present the missing prerequisites to the user and stop

Do not invent missing prerequisite artifacts in order to continue.

### 2. IA and Key Flow Definition

Use blueprint-standards references:
- `references/ia-template.md`
- `references/flow-template.md`

Capture:
- page hierarchy
- navigation model
- labeling and taxonomy
- 3-5 critical user flows with entry, success, and recovery paths

### 3. Content Model Definition

Use `references/content-model-template.md` to define:
- core entities
- relationships
- lifecycle states when relevant
- where those entities appear in the product

### 4. Brand Direction and Visual Tokens

Use `references/brand-direction-template.md` to define:
- tone and voice
- color and typography direction
- motion and density choices
- reference products
- Visual Tokens for prototype consistency

Visual Tokens are concrete prototype values, not final production tokens.
Always derive and write the Visual Tokens section using the `Derived From` rules in the template. Mark `Source` as `auto-derived` unless a design expert later refines the values.

### 5. AI Interaction Model

If the product includes AI-powered features, use `references/ai-interaction-model-template.md` to define:
- interaction patterns
- disclosure and confidence communication
- guardrails
- error taxonomy

**[STOP — BLOCKING]** Present the blueprint draft to the user:
- IA summary
- key flows
- content model summary
- brand direction and Visual Tokens
- AI interaction model summary when applicable

### 6. File Output

After user approval, write:
- `docs/product/design/information-architecture.md`
- `docs/product/design/content-model.md`
- `docs/product/design/brand-direction.md`
- `docs/product/design/ai-interaction-model.md` when applicable
- `docs/product/design/flows/flow-{name}.md`

## Scope Boundaries

**Included**: structural design artifacts for reusable prototype and PRD context
**Not included**: pixel-perfect specs, final production design system, implementation details
