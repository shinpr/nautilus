# Lovable Prompt Template

## When to Use Lovable

- Multi-page flows needing realistic navigation
- Prototypes requiring backend logic simulation (Supabase integration)
- Full user journeys across multiple screens
- Prototypes that benefit from deployment for remote testing

## Prompt Section Library

Use only the sections that affect the prototype or its evaluation.

```markdown
Before building, ask about an ambiguity only when its plausible answers would materially change the prototype or its evaluation:
- Target user or role
- Primary user flow
- Design system constraints
- Data model or sample content
- What should be in scope vs. explicitly out of scope

Build an interactive prototype for [product name].

## Context
[product name] is [brief description].
Target user: [persona name] — [key characteristics, skill level, context].
This prototype tests: [hypothesis statement].

## Knowledge
- Product vision: [1-2 lines]
- Core features already established: [list]
- Design principles: [list]
- Existing navigation or page structure: [list]
- Reusable components or patterns: [list]

## User Flow
1. User lands on [page] → sees [what]
2. User [action] → [what happens]
3. [continue for entire flow]

## Pages and Features

### Page: [/path]
- [Component]: [specific behavior]
- [Component]: [specific behavior]
- Layout: [description]
- Copy: [actual headline, helper text, CTA labels]

### Page: [/path]
- [Component]: [specific behavior]
- Copy: [actual headline, helper text, CTA labels]

## Relevant States
- Loading: [show skeleton / spinner / progressive load]
- Empty: [empty state message and CTA]
- Error: [error message and recovery action]
- Success: [primary display]

## Guardrails
- Do not modify [shared navigation / existing pages / established branding]
- Do not introduce [auth / backend integration / payments] in this prompt
- Keep the prototype focused on [the flow under test]
- Use realistic copy, not placeholder text like "Lorem ipsum" or generic labels
- Prefer frontend mocks over real integrations until the flow is validated

## Design (when visual decisions affect the prototype)
- Color palette: [hex values]
- Typography: [font family, sizes]
- Spacing: [scale]
- Border-radius: [values]
- Atmosphere: [Only product-specific qualities that affect the evaluated experience]

## Mock Data (when data shape or copy affects the flow)
Use LocalStorage with this sample data:
[provide the smallest record set that exercises the relevant cases]

## Technical (when the output consumer requires it)
- Responsive: mobile-first, breakpoints at 768px and 1024px
- Framework: React + Tailwind
```

## Lovable-Specific Tips

### Prompt Size

Keep prompts focused on one validation decision and the flow needed to observe it.

Ask only the questions whose answers can change correctness, scope, or evaluation.

### Incremental Building

Edit the current prototype in the smallest increment that makes the next validation boundary observable. Use Lovable's version pinning when a stable state must be preserved for comparison.

### What Works Well

- Explicit page paths (`/dashboard`, `/settings`)
- Role-based descriptions ("As an admin, I can see all users")
- Concrete data examples rather than abstract descriptions
- Specific interaction descriptions ("click → modal opens → form inside")
- Real UI copy ("Start free trial", "No invoices found") instead of placeholders
- Clear scope boundaries ("only the billing flow, not account settings")

### What to Keep Simple

- Use LocalStorage for data persistence until the frontend is stable
- Connect Supabase only after the UI and flows are working
- Start without authentication — add it as a separate prompt later
- Keep one prompt focused on one flow or tightly related page set

## Optional Guide File

Create `lovable-guide.md` only when a human evaluator needs instructions outside the executable prompt. Include only the applicable items:

1. **What this prototype tests** — the hypothesis in plain language
2. **How to use it** — steps for the person doing the testing
3. **What to observe** — specific behaviors to watch for
4. **How to record results** — where to note findings
5. **Lovable-specific notes** — pin versions, use visual diff between versions to catch regressions, prefer focused edits over full rewrites
