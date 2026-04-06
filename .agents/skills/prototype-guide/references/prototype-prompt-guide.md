# Prototype Prompt Construction Guide

## Purpose

Guide for constructing prompts that generate prototypes with proper design context injection. Prototypes validate Usability and Value risks — without context, they validate nothing.

## Prompt Engineering Principles

These principles apply to all prototype prompts regardless of platform.

Examples in this guide are illustrative only. Replace them with domain-specific content for the product you are testing.

### Be Specific, Not Vague

Vague instructions produce vague prototypes. Specify exactly what you want to see.

| Instead of | Write |
|-----------|-------|
| "Create a search feature" | "Create a search bar that filters a product list by name and category. When user types 'laptop', show only laptop products. Include autocomplete suggestions showing top 3 matches." |
| "Make it look good" | "Use a white background, 4px border-radius, subtle shadow (0 1px 3px rgba(0,0,0,0.1)), 16px padding between cards." |
| "Add error handling" | "When search returns no results: show 'No products found for [query]' with a clear search button. When API fails: show 'Search unavailable' with a retry button." |

### Structure Over Length

A well-structured short prompt outperforms a long unstructured one. Use the section template below — it helps the AI identify priorities and relationships.

### Describe Interactions as State Transitions

Every interactive element has states. Describe them explicitly:

```markdown
Add to Cart button:
- Default: Blue background (#2563EB), white text
- Hover: Darker blue (#1D4ED8)
- Loading: Show spinner, button disabled
- Success: Change text to "Added ✓" for 2 seconds, then revert
- Error: Shake animation, show error message below button
```

### Provide Concrete Data Examples

Instead of "show some sample data", provide the exact structure:

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

Each prompt should test one hypothesis. If you need to test multiple things, create separate prompts. Bundling reduces the quality of each test.

## Prompt Template

### Required Sections

```markdown
## Context
- Product: [name and brief description]
- Design Principles: [from docs/product/design-principles.md]
- Persona: [name and key characteristics from persona file]
- Scenario: [what the user is trying to do, their environment, constraints]

### Include When Relevant
- Brand Direction: [relevant decisions and Visual Tokens from `docs/product/design/brand-direction.md`]
- IA Context: [relevant page path from `docs/product/design/information-architecture.md` when navigation matters]
- Flow Context: [specific file from `docs/product/design/flows/` that matches this interaction]
- Content Model Context: [relevant entities/relationships from `docs/product/design/content-model.md` when data structure matters]
- AI Interaction Context: [relevant section from `docs/product/design/ai-interaction-model.md` for AI-powered features]

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
- Loading: [behavior]
- Empty: [behavior]
- Error: [behavior and recovery]
- Success: [primary state]
- Partial: [if applicable]

## Accessibility
- WCAG 2.2 AA baseline
- [Additional specific requirements]

## What to Build
[Specific description of the prototype — layout, components, interactions, data]
```

### Output Format Principle

Generate **two separate files** per platform:

1. **`[platform]-prompt.md`**: Machine-executable instructions only. Content that gets copy-pasted directly into the AI tool
2. **`[platform]-guide.md`**: Human-readable usage documentation, platform tips, post-execution workflow

**Decision test**: "Would I paste this text directly into the AI tool?" YES → prompt file. NO → guide file.

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
Read `docs/product/design/brand-direction.md` and apply Visual Tokens directly:
- Colors: use `--color-*` token values for surfaces, actions, text, feedback
- Typography: use `--font-*`, `--font-size-base`, and weight tokens
- Spacing: use `--space-*`, `--radius-*`, and `--shadow-*` tokens
Trace any overrides back to the relevant blueprint decision.
```

### Source Selection Rule

```markdown
Choose one primary design source in this order:
1. Existing in-repo design system/components
2. Blueprint Visual Tokens
3. Tailwind config / standalone tokens
4. Ad-hoc constraints derived from principles

If multiple sources exist, prefer the highest-priority source and use lower-priority sources only to fill gaps.
```

### No DS Yet
```markdown
## Design System
Use these constraints (seed for future DS):
- Colors: [palette]
- Typography: [font, sizes]
- Spacing: [scale]
- Border-radius: [values]
Record any new design decisions made during prototyping.
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
- Third-party APIs → Placeholder data

## Quality Checklist

- [ ] Design principles included in prompt
- [ ] Persona and scenario specified
- [ ] Blueprint artifacts referenced when relevant
- [ ] Primary design source selected using the precedence rule
- [ ] Hypothesis under test is explicit
- [ ] User flow described step-by-step
- [ ] Features have specific acceptance criteria
- [ ] Interactions described as state transitions
- [ ] States to demonstrate listed (loading, empty, error, success)
- [ ] Accessibility requirements included
- [ ] DS integration details provided
- [ ] Mock data examples provided with concrete structure
- [ ] Prompt file contains only executable content (passed decision test)
- [ ] Guide file contains only human-readable documentation
