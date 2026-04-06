# User Flow Template

## Flow: {flow-name}

### Overview

- **Persona**: {persona name}
- **Goal**: {what the user is trying to accomplish}
- **Linked Opportunity**: {OPP-NNN}
- **Entry condition**: {how the user starts}
- **Success outcome**: {what done looks like}

### Steps

| # | Action | Page/Screen | System Response | Next Step |
|---|--------|-------------|----------------|-----------|
| 1 | {user action} | {page} | {what happens} | → 2 |
| 2 | {user action} | {page} | {what happens} | → 3 or → 2a |
| 2a | {alternative path} | {page} | {what happens} | → 3 |

### Decision Points

| At Step | Condition | Path A | Path B |
|---------|-----------|--------|--------|
| {step} | {condition} | {action → step} | {action → step} |

### Error Scenarios

| At Step | Error | User Sees | Recovery Path |
|---------|-------|-----------|--------------|
| {step} | {what goes wrong} | {error state} | {recovery} |
