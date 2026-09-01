---
name: recipe-blueprint
description: Selects and defines the structural design context needed by a prototype or PRD. Use when shared information architecture, flows, content, brand, Visual Tokens, or AI interaction decisions are missing.
disable-model-invocation: true
metadata:
  opencode/autoinvoke: "false"
---

**Context**: Create or update structural design artifacts in `docs/product/design/` so prototype generation and PRD authoring reuse the same design context.

## Required Skills [LOAD BEFORE EXECUTION]

1. [LOAD IF NOT ACTIVE] `blueprint-standards` — artifact selection and templates

## Conditional Skills [LOAD WHEN TRIGGERED]

- WHEN the selected artifacts define user-facing states, persona-sensitive behavior, or accessibility boundaries: [LOAD IF NOT ACTIVE] `design-perspective`
- WHEN the selected artifacts require state-design or product-confidence rules: [LOAD IF NOT ACTIVE] `product-principles`

A blueprint may contain any subset of the defined artifacts.

## Execution Decision Flow

### 1. Context Reading

Identify the prototype or PRD decision that needs shared design context. Read only the available vision, principles, personas, Opportunities, journeys, and learnings that can change that decision.

When missing evidence leaves the design outcome materially ambiguous, name the exact product decision required from the user. Otherwise proceed with the available evidence and mark the assumption in the affected artifact.

### 2. IA and Key Flow Definition

Use blueprint-standards references:
- `references/ia-template.md`
- `references/flow-template.md`

When navigation or task sequence affects the consumer, capture:
- page hierarchy
- navigation model
- labeling and taxonomy
- the critical user flows needed by the consumer, with entry, success, and relevant recovery paths

### 3. Content Model Definition

When entity shape or lifecycle affects the consumer, use `references/content-model-template.md` to define:
- core entities
- relationships
- lifecycle states when relevant
- where those entities appear in the product

### 4. Brand Direction and Visual Tokens

When visual consistency affects the consumer, use `references/brand-direction-template.md` to define:
- tone and voice
- color and typography direction
- motion and density choices
- reference products
- Visual Tokens for prototype consistency

Visual Tokens are concrete prototype values, not final production tokens.
When Visual Tokens are needed, derive them using the `Derived From` rules in the template and mark `Source` as `auto-derived` unless a design expert later refines the values.

### 5. AI Interaction Model

If AI behavior affects the current prototype or PRD, use `references/ai-interaction-model-template.md` to define:
- interaction patterns
- disclosure and confidence communication
- guardrails
- error taxonomy

Present the blueprint decisions that were created to the user for confirmation.

End the current turn with the blueprint draft as the workflow output. Write artifacts only after the user confirms those decisions in a later turn.

### 6. File Output

After that confirmation, write only the artifacts produced for the current consumer:
- `docs/product/design/information-architecture.md` when IA was needed
- `docs/product/design/content-model.md` when a content model was needed
- `docs/product/design/brand-direction.md` when brand direction or Visual Tokens were needed
- `docs/product/design/ai-interaction-model.md` when AI interaction decisions were needed
- `docs/product/design/flows/flow-{name}.md` for each required flow

## Scope Boundaries

**Included**: structural design artifacts for reusable prototype and PRD context
**Not included**: pixel-perfect specs, final production design system, implementation details

## Completion

The workflow is complete when the confirmed artifacts needed by the current consumer exist, or a no-change result identifies the reusable artifacts and any unresolved design decision.
