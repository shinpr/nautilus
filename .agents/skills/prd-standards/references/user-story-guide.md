# User Story Guide

User stories express the smallest delivery unit whose value and material risks can be judged together.

## Story Form

```text
As a [persona or evidenced user distinction]
I want to [goal]
So that [value]
```

Use a named persona when its behavior or acceptance differs. Otherwise use the narrowest evidenced user distinction. Describe the goal and value while leaving implementation choices to requirements and design.

## Delivery Readiness

Use the product-principles definitions for the 4 Risks and Confidence Meter. For each delivery decision:

1. Identify only the risk dimensions that can change readiness.
2. Reuse feature-level evidence shared by multiple stories.
3. Compare the remaining uncertainty with implementation cost, risk, and reversibility.
4. Record story-level evidence only when it differs from the shared assessment.
5. Mark the story `validated enough` or `needs more validation` with the evidence that determines that result.

## PRD Form

```markdown
### US-N: [Story Title]

As a [persona or evidenced user distinction]
I want to [goal]
So that [value]

- **Delivery readiness**: [validated enough / needs more validation]
- **Rationale**: [cost × risk × reversibility evidence]
- **Story-specific risk**: [material difference from shared evidence; omit when none]
```

Split a story when its parts can be delivered independently or require materially different readiness decisions. Keep a larger story intact when splitting would make its value or acceptance uninterpretable.
