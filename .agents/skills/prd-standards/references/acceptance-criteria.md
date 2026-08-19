# Acceptance Criteria Guide (EARS Format)

## Purpose

Guide for writing clear, testable acceptance criteria using EARS (Easy Approach to Requirements Syntax) patterns. ACs define when a user story is "done".

## EARS Patterns

### When (Event-driven)
Triggered by a specific event or user action.

```
When [trigger event],
the system shall [expected behavior].
```

**Example:**
```
When the user clicks the "Save" button,
the system shall persist the form data and display a success notification within 2 seconds.
```

### While (State-driven)
Active during a specific system state or condition.

```
While [system state],
the system shall [expected behavior].
```

**Example:**
```
While the application is loading data,
the system shall display a skeleton screen with animated placeholders.
```

### If-Then (Conditional)
Behavior depends on a condition being true or false.

```
If [condition],
then the system shall [expected behavior].
```

**Example:**
```
If the user has not completed onboarding,
then the system shall display the onboarding wizard on login.
```

### Combined Patterns
Complex ACs can combine patterns:

```
When [trigger] while [state],
if [condition],
then the system shall [behavior].
```

**Example:**
```
When the user submits the search form while offline,
if cached results exist,
then the system shall display cached results with a "Results may be outdated" banner.
```

## State-Aware ACs

For each user-facing requirement, add ACs for the states that can occur and change acceptance:

| State | AC Pattern |
|-------|-----------|
| **Loading** | While [data is loading], the system shall [show progress indicator] |
| **Empty** | If [no data exists], then the system shall [show empty state with guidance] |
| **Error** | When [operation fails], the system shall [show error with recovery action] |
| **Partial** | While [some data is unavailable], the system shall [show available data and indicate missing] |
| **Success** | When [operation completes], the system shall [confirm and show result] |

## Writing Good ACs

### Characteristics
- **Testable**: Can be verified with a clear pass/fail
- **Specific**: No ambiguity about expected behavior
- **Independent**: Each AC tests one behavior
- **Sufficient**: Covers the required behavior and material edge cases

### Do
- Use concrete values ("within 2 seconds", "maximum 50 characters")
- Specify error handling and recovery
- Include accessibility requirements where relevant
- Reference design states (loading, empty, error)

### Don't
- Use vague terms ("quickly", "user-friendly", "intuitive")
- Describe implementation details ("using REST API", "with Redux")
- Combine multiple behaviors in one AC
- Forget edge cases and error states

## AC in PRD Format

When an implementation, test, or planning consumer references individual ACs, assign stable IDs:

```markdown
- [ ] Requirement: [Description]
  - AC-001: When [trigger], the system shall [behavior]
  - AC-002: If [condition], then the system shall [behavior]
  - AC-003: While [state], the system shall [behavior]
```

## Accessibility ACs

Include accessibility ACs for UI features:

```
When the user navigates using keyboard only,
the system shall support Tab/Shift+Tab for focus movement
and Enter/Space for activation of all interactive elements.

While a screen reader is active,
the system shall announce [component] with role [role]
and accessible name [name].

If the user has set "prefers-reduced-motion",
then the system shall disable all non-essential animations.
```

## Traceability

Each AC should be traceable:
- **User Story** → AC tests a specific aspect of the story's value
- **Material Risks** → ACs cover behavior needed to contain or verify the risks that affect delivery
- **Design States** → ACs specify behavior for each relevant state
- **Implementation/Test** → Assign stable AC IDs (`AC-001`, `AC-002`, ...) when downstream specs, plans, or tests reference individual ACs; otherwise keep the criteria unnumbered
