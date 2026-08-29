# Lovable Prompt Template

## When to Use Lovable

- Multi-page flows needing realistic navigation
- Prototypes requiring backend logic simulation (Supabase integration)
- Full user journeys across multiple screens
- Prototypes that benefit from deployment for remote testing

## Prompt Section Library

Use only the sections that affect the prototype or its evaluation.

```markdown
Before building, ask one focused question when plausible answers to a missing decision would materially change the prototype or its evaluation. Name the affected decision and the evidence needed to resolve it. Continue with the supplied sources when the unresolved choice cannot change the validation evidence.

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
Classify each state as `required` or `not_applicable`:
- Loading: [required — trigger and visible behavior | not_applicable — reason]
- Empty: [required — trigger, message, and next action | not_applicable — reason]
- Error: [required — trigger, message, and recovery | not_applicable — reason]
- Success: [required — trigger and visible consequence | not_applicable — reason]
- Partial: [required — trigger and visible behavior | not_applicable — reason]

## Guardrails
- Preserve [shared navigation / existing pages / established branding]
- Keep [auth / backend integration / payments] outside this prompt; represent required behavior with [frontend mock or preset state]
- Keep the prototype focused on [the flow under test]
- Use realistic domain copy for headlines, helper text, actions, and states
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
- Role-based descriptions tied to the target persona and action
- Concrete data examples rather than abstract descriptions
- Specific interaction descriptions that map each trigger to its visible response
- Real UI copy for actions and states
- Scope boundaries that name the included flow and deferred neighboring flows

### What to Keep Simple

- Use LocalStorage for data persistence during initial UI and flow validation
- Add Supabase in a later prompt when persistence becomes part of the evaluated behavior
- Represent authentication as a preset mock state and validate the authentication flow in a separate prompt

## Guide File Condition

Create `lovable-guide.md` when a named human evaluator needs instructions outside the executable prompt. Include each item that evaluator uses:

1. **What this prototype tests** — the hypothesis in plain language
2. **How to use it** — steps for the person doing the testing
3. **What to observe** — specific behaviors to watch for
4. **How to record results** — where to note findings
5. **Lovable-specific notes** — pin versions, use visual diff between versions to catch regressions, prefer focused edits over full rewrites
