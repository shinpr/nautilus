# Lovable Prompt Template

## When to Use Lovable

- Multi-page flows needing realistic navigation
- Prototypes requiring backend logic simulation (Supabase integration)
- Full user journeys across multiple screens
- Prototypes that benefit from deployment for remote testing

## Prompt Structure

```markdown
Before building, ask clarifying questions if any of these are ambiguous:
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

## States
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

## Design
- Color palette: [hex values]
- Typography: [font family, sizes]
- Spacing: [scale]
- Border-radius: [values]
- Atmosphere: [3-5 adjectives describing the feel]

## Mock Data
Use LocalStorage with this sample data:
[provide JSON structure with 3-5 sample records]

## Technical
- Responsive: mobile-first, breakpoints at 768px and 1024px
- Framework: React + Tailwind
```

## Lovable-Specific Tips

### Prompt Size

Keep prompts focused. One prompt per feature area or user flow. Asking for too many features in one prompt leads to incomplete implementations.

If requirements are unclear, ask 2-5 clarifying questions before generating. A short clarification round is better than a broad but inaccurate first pass.

### Incremental Building

Build in layers:
1. First prompt: core layout and navigation
2. Second prompt: primary feature with interactions
3. Third prompt: states (empty, error, loading)
4. Fourth prompt: polish and edge cases

Use Lovable's version pinning after each stable state.
Prefer editing the current prototype in focused increments over re-prompting the entire app from scratch.

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

## Guide File Template

The guide file (`lovable-guide.md`) should contain:

1. **What this prototype tests** — the hypothesis in plain language
2. **How to use it** — steps for the person doing the testing
3. **What to observe** — specific behaviors to watch for
4. **How to record results** — where to note findings
5. **Lovable-specific notes** — pin versions, use visual diff between versions to catch regressions, prefer focused edits over full rewrites
