# Acceptance Criteria Guide

Use an EARS form when its event, state, or condition makes the required behavior more testable. Plain testable statements remain valid when an EARS form adds no precision.

## Patterns

| Condition | Form |
|-----------|------|
| Event changes behavior | `When [trigger], the system shall [observable behavior].` |
| Behavior applies during a state | `While [state], the system shall [observable behavior].` |
| Behavior depends on a condition | `If [condition], then the system shall [observable behavior].` |

Combine forms only when the same acceptance decision requires their relationship.

## State Coverage

Add criteria for states that can occur and affect acceptance. Loading, Empty, Error, Partial, and Success are reference categories; they create no requirement by themselves.

## Quality Boundary

Each criterion:

- names an observable trigger, condition, state, or result;
- tests one behavior unless multiple effects form one inseparable outcome;
- includes concrete limits only when a requirement or source determines them;
- exposes recovery, accessibility, or edge behavior when it can change acceptance;
- leaves implementation choices open unless they are part of the approved requirement or preserved contract.

## Downstream Identity

Assign stable IDs only when an implementation, test, or planning consumer references individual criteria:

```markdown
- **AC-001**: When [trigger], the system shall [observable behavior].
```

Otherwise keep criteria unnumbered.

## Traceability

Trace each criterion to the story value, material risk, design decision, or preserved behavior it proves. Use the smallest set that covers the accepted requirement.
