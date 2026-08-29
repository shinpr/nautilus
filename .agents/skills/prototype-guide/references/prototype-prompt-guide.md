# Prototype Prompt Construction Guide

## Purpose

Guide for constructing external-generator prompts that make one prototype validation decision observable with decision-sufficient product and design context.

## Prompt Writing Principles

Apply an instruction when it can change prototype generation or evaluation. Use the smallest instruction set that makes the validation decision observable.

### State Positive, Executable Outcomes

State the required action, behavior, or allowed state first. Express quality expectations as observable acceptance conditions and preserve accepted product decisions with the same meaning.

Retain an explicit prohibition only when a violation would be an irreversible action the caller cannot normally recover from and positive wording would blur the boundary. Pair it with the required safe behavior and the condition that permits crossing the boundary.

### Clarify Outcome-Relevant Decisions

Resolve an ambiguity when its plausible interpretations would materially change correctness, scope, or evaluation. Use the highest-priority available product source or the least-restrictive observable criterion that resolves the decision.

Leave choices whose valid alternatives produce equivalent validation evidence to the generator.

### Provide Necessary and Sufficient Context

Include a context item when removing it could change a generation decision, action, or evaluation result. Name the source of product-specific decisions and extract the facts that control the prompt.

Consolidate repeated context and place each detail near the instruction it controls.

### Define the Consumer-Required Output

Specify the artifact, sections, fields, or serialization required by the next consumer. Require an exact representation when a platform, evaluator, or machine parser depends on it.

### Control Boundaries, Not Reversible Routes

State the scope, protected product decisions, true dependencies, and observable completion conditions. For reversible implementation choices, provide the purpose, relevant evidence, and selection criteria, then let the generator choose the route.

### Use the Smallest Useful Structure

Use section boundaries when they make instruction roles, priorities, or dependencies visible. Keep a single clear action as lightweight prose.

### Use Examples Deliberately

Use an example when it communicates a product-specific mapping, non-obvious exception, or boundary that a concise rule cannot express. Keep the smallest set that removes those ambiguities and replace illustrative values with decision-relevant product content.

### Handle Unresolved Inputs

Treat source facts as observed, gap-filling decisions as inferred, and unresolved inputs as unknown. When an unknown controls the tested flow or its interpretation, pause generation and name the missing decision, its effect, and the evidence or user choice needed to continue. Proceed with the selected sources when the unresolved choice cannot change the validation evidence.

### Describe Interactions as State Transitions

Describe the states that the prototype must demonstrate or that can change the evaluation:

```markdown
[Interaction]:
- Trigger: [user action]
- Default: [visible state]
- Loading: [visible progress and available actions]
- Success: [visible consequence]
- Error: [visible failure and recovery action]
```

### Provide Decision-Relevant Data

Provide the smallest realistic record set when its shape, wording, or edge cases affect the interaction being tested. Include the exact case that makes the evaluated behavior observable.

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

Include each source whose decisions can change the generated prototype or its evaluation:

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
Classify each state as `required` or `not_applicable`:
- Loading: [required — trigger and visible behavior | not_applicable — reason]
- Empty: [required — trigger and visible behavior | not_applicable — reason]
- Error: [required — trigger, visible behavior, and recovery | not_applicable — reason]
- Success: [required — trigger and visible consequence | not_applicable — reason]
- Partial: [required — trigger and visible behavior | not_applicable — reason]

## Accessibility
- WCAG 2.2 AA baseline
- [Additional specific requirements]

## What to Build
[Specific description of the prototype — layout, components, interactions, data]
```

### Output Format Principle

Generate the machine-executable `{platform}-prompt.md`. Add a separate `{platform}-guide.md` when a named human consumer needs usage instructions outside the executable prompt.

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

- [ ] Required actions and states are positive and observable; each retained prohibition protects an irreversible action boundary and supplies the safe behavior and authorization condition
- [ ] Each resolved ambiguity or added constraint can change generation or evaluation and uses the least-restrictive sufficient criterion
- [ ] Decision under test and observable success/failure criteria are explicit
- [ ] Scenario and each included product/design source can change generation or evaluation
- [ ] Reversible implementation choices remain open when their alternatives produce equivalent validation evidence
- [ ] Each example communicates a non-obvious product mapping, exception, or boundary and belongs to the smallest covering set
- [ ] Missing inputs that control the tested flow name their effect and the evidence or user decision required to continue
- [ ] Primary design source selected using Source Acquisition in `prototype-quality.md`
- [ ] Critical user flow and decision-relevant state transitions are observable
- [ ] Each state that can change the decision is required with a trigger; other listed states are not applicable with a reason
- [ ] Applicable criteria from `prototype-quality.md` are expressed as generator actions and acceptance conditions
- [ ] Design-system details and concrete mock data are included when they control fidelity or evaluation
- [ ] Decision-relevant repository content is embedded unless the target generator has verified repository access
- [ ] Target-platform instructions are included only when they change generated output or invocation
- [ ] Prompt file contains only executable content (passed decision test)
- [ ] A guide file exists only for a named human consumer and contains no machine-executable prompt content
