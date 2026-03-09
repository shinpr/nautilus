# v0 Prompt Template

## When to Use v0

- Component-level prototypes (single interaction patterns)
- UI quality is the priority (shadcn/ui produces polished output)
- Exploring design variations quickly
- Responsive component behavior testing

## Prompt Structure

```markdown
Build [component/page description] used by [persona name] in [scenario] to [action/decision].

## Context
[Product name]: [brief description].
This component tests: [hypothesis statement].
Success: [what validates the hypothesis].
Failure: [what disproves the hypothesis].

## Component Specification

### [Component Name]
- Purpose: [what it does for the user]
- Layout: [description]
- Interactions:
  - [trigger] → [response]
  - [trigger] → [response]
- States:
  - Default: [appearance]
  - Hover: [appearance]
  - Active: [appearance]
  - Disabled: [appearance]
  - Loading: [appearance]
  - Error: [appearance]

### Data
[Provide concrete sample data as JSON or TypeScript interface]

## Design
- Color palette: [hex values with semantic meaning — primary for actions, red for errors, etc.]
- Border-radius: [values]
- Shadows: [values]
- Spacing: [scale]
- Typography: [font, size scale]

Override shadcn/ui defaults:
- [specific overrides — colors, radius, shadows]

## Responsive
- Mobile (< 768px): [layout changes]
- Desktop (>= 768px): [layout]

## Accessibility
- All interactive elements keyboard-navigable
- Color contrast: WCAG AA (4.5:1 text, 3:1 large text)
- [Additional requirements]
```

## v0-Specific Tips

### shadcn/ui Integration

v0 is built on shadcn/ui. Use this to your advantage:
- Name shadcn/ui components explicitly ("use a shadcn Dialog, not a custom modal")
- Specify overrides clearly — v0 defaults to shadcn/ui's default theme
- For custom styling, describe the override relative to defaults ("border-radius: 12px instead of shadcn default")

### Design System via Registry

If your project has a shadcn registry, reference it:
```markdown
Use our design system registry at [URL].
Import components from the registry instead of default shadcn/ui.
```

### Iterative Refinement

v0 supports conversational refinement:
1. Generate the base component
2. "Make the card corners more rounded and add a subtle shadow"
3. "Add a dark mode variant"
4. "Make it responsive — stack vertically on mobile"

Each refinement builds on the previous output.

### What Works Well

- Single-component focus (one Card, one Form, one Dashboard panel)
- Explicit color semantics ("red for destructive actions, green for success")
- Naming third-party libraries when needed ("use framer-motion for animations")
- Specifying data structures with TypeScript interfaces

### What to Keep Simple

- Focus on one component or tightly related component group
- Use inline mock data rather than external APIs
- Keep interactions to the component being tested

## Guide File Template

The guide file (`v0-guide.md`) should contain:

1. **What this component tests** — the hypothesis in plain language
2. **How to evaluate** — what to look at in the generated output
3. **Refinement suggestions** — follow-up prompts to try if the first output needs adjustment
4. **Integration notes** — how to bring the component into the actual codebase if validated
5. **v0-specific notes** — use "Open in v0" from shadcn/ui docs for starting points, export code directly to your project
