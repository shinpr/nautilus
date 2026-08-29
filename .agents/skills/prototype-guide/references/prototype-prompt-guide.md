# Prototype Prompt Construction Guide

## Purpose

Guide for constructing external-generator prompts that make one prototype validation decision observable with decision-sufficient product and design context.

## Prompt Engineering Principles

Apply these principles when they affect the prototype's validation decision.

Examples in this guide are illustrative only. Replace them with domain-specific content for the product you are testing.

### Make the Validation Observable

State the required behavior, state, or visual decision first and make its acceptance conditions observable.

Resolve an ambiguity when its plausible answers would materially change correctness, scope, or evaluation; use the highest-priority available product source or the least-restrictive sufficient criterion. Leave choices that cannot change the validation evidence to the generator.

| Instead of | Write |
|-----------|-------|
| "Create a search feature" | "Create a search bar that filters a product list by name and category. When user types 'laptop', show only laptop products. Include autocomplete suggestions showing top 3 matches." |
| "Make it look good" | "Apply the product's primary design source. Preserve its hierarchy and interaction patterns; introduce new visual values only where the prototype tests them." |
| "Add error handling" | "When search returns no results: show 'No products found for [query]' with a clear search button. When API fails: show 'Search unavailable' with a retry button." |

### Structure Over Length

A well-structured short prompt outperforms a long unstructured one. Use the section template below — it helps the AI identify priorities and relationships.

### Describe Interactions as State Transitions

Describe the states that the prototype must demonstrate or that can change the evaluation:

```markdown
Add to Cart button:
- Default: Blue background (#2563EB), white text
- Hover: Darker blue (#1D4ED8)
- Loading: Show spinner, button disabled
- Success: Change text to "Added ✓" for 2 seconds, then revert
- Error: Shake animation, show error message below button
```

### Provide Decision-Relevant Data

Provide concrete data when its shape, wording, or edge cases affect the interaction being tested:

```markdown
Sample product:
{
  "id": "prod-001",
  "name": "Wireless Headphones",
  "price": 89.99,
  "category": "Audio",
  "in_stock": true,
  "rating": 4.5
}
```

### One Prompt, One Focus

Keep one decision focus per prompt. Multiple hypotheses may share a prompt when the same interaction and evidence resolve them together.

## Prompt Template

### Section Library

Use only the sections needed by the prototype generator or evaluator.

```markdown
## Context
- Product: [name and brief description]
- Design Principles: [relevant decisions extracted from docs/product/design-principles.md]
- Persona: [name and key characteristics from persona file]
- Scenario: [what the user is trying to do, their environment, constraints]

### Decision-Relevant Sources

- Brand Direction: [relevant decisions and Visual Token values extracted from `docs/product/design/brand-direction.md`]
- IA Context: [relevant page structure extracted from `docs/product/design/information-architecture.md` when navigation matters]
- Flow Context: [relevant steps extracted from the matching file in `docs/product/design/flows/`]
- Content Model Context: [relevant entities and relationships extracted from `docs/product/design/content-model.md` when data structure matters]
- AI Interaction Context: [relevant decisions extracted from `docs/product/design/ai-interaction-model.md` for AI-powered features]

## Hypothesis
- Testing: [the specific hypothesis being validated]
- Success looks like: [observable criteria for this prototype]
- Failure looks like: [what would disprove the hypothesis]

## User Flow
1. [Step 1: what the user does → what happens]
2. [Step 2: what the user does → what happens]
3. [continue for entire flow]

## Features
- [Feature]: [specific behavior and acceptance criteria]
  - Priority: Must Have / Should Have / Could Have

## Design System
[Integration details — see Design System section below]

## States to Demonstrate
- [Required state]: [trigger and visible behavior; include recovery for a failure state]

## Accessibility
- WCAG 2.2 AA baseline
- [Additional specific requirements]

## What to Build
[Specific description of the prototype — layout, components, interactions, data]
```

### Output Format Principle

Generate the machine-executable `{platform}-prompt.md`. Add a separate `{platform}-guide.md` only when a named human consumer needs usage instructions outside the executable prompt.

For platform-specific prompt templates, see:
- `references/lovable-template.md` — Lovable prompt structure and tips
- `references/v0-template.md` — v0 prompt structure and shadcn/ui integration

## Design System Integration

### npm Package (DS as published package)
```markdown
## Design System
Install: `npm install @company/design-system`
Use components: Button, Card, Input, Dialog from the package
Reference: [package documentation URL]
```

### In-Repository Components
```markdown
## Design System
Use existing components from the codebase:
- Button: src/components/ui/Button.tsx
- Card: src/components/ui/Card.tsx
[List components with their import paths and key props]
```

### Tailwind Config / Design Tokens
```markdown
## Design System
Apply these design tokens:
- Colors: primary=#XXX, secondary=#XXX, accent=#XXX
- Spacing: base=4px scale
- Border-radius: [values]
- Typography: [font stack and scale]
```

### Blueprint Visual Tokens
```markdown
## Design System
Apply these Visual Tokens extracted from the approved brand direction:
- Colors: [applicable `--color-*` names and values for surfaces, actions, text, feedback]
- Typography: [applicable `--font-*`, `--font-size-*`, and weight values]
- Spacing and depth: [applicable `--space-*`, `--radius-*`, and `--shadow-*` values]
```

### Applying the Selected Source

Use the primary source selected by Source Acquisition in `prototype-quality.md`. Materialize the applicable components, properties, and token values in the prompt. A repository-local path is sufficient only when the target generator has verified access to that repository; otherwise include the decision-relevant content directly.

### No DS Yet
```markdown
## Design System
Use these constraints (seed for future DS):
- Colors: [palette]
- Typography: [font, sizes]
- Spacing: [scale]
- Border-radius: [values]
```

## Prototype Scope Boundaries

**Include in prototypes:**
- UI/UX specifications (layout, components, interactions)
- User flows (step-by-step journeys)
- Visual design (colors, fonts, spacing)
- Mock data (simple JSON / LocalStorage)

**Replace with frontend mocks:**
- Backend → LocalStorage or hardcoded arrays
- Database → Simple JSON structures
- API endpoints → Static mock responses
- Authentication → Mock login state (boolean)
- Third-party APIs → Deterministic mock responses with realistic domain values

## Quality Checklist

- [ ] Decision under test and observable success/failure criteria are explicit
- [ ] Scenario and each included product/design source can change generation or evaluation
- [ ] Primary design source selected using Source Acquisition in `prototype-quality.md`
- [ ] Critical user flow and decision-relevant state transitions are observable
- [ ] Each state that can change the decision is required with a trigger; other listed states are not applicable with a reason
- [ ] Applicable criteria from `prototype-quality.md` are expressed as generator actions and acceptance conditions
- [ ] Design-system details and concrete mock data are included when they control fidelity or evaluation
- [ ] Decision-relevant repository content is embedded unless the target generator has verified repository access
- [ ] Target-platform instructions are included only when they change generated output or invocation
- [ ] Prompt file contains only executable content (passed decision test)
- [ ] A guide file exists only for a named human consumer and contains no machine-executable prompt content
