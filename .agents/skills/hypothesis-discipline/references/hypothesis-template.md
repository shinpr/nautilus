# Hypothesis: [Hypothesis Statement]

Create the definition and validation sections when the hypothesis is drafted. Add result sections only after validation produces evidence.

```yaml
---
id: HYPO-NNN
level: solution
status: draft
confidence: {}
opportunity: OPP-NNN
created: YYYY-MM-DD
---
```

Populate `confidence` only with decision-relevant `value`, `usability`, `feasibility`, or `viability` scores. Add `time-budget` when validation work can expand, `deadline` when a calendar cutoff changes the decision, and `validated` when the hypothesis reaches a conclusion.

## We believe that

[Clear statement of the hypothesis]

## We'll know we're right when

[Observable outcome that supports the hypothesis]

## We'll know we're wrong when

[Observable outcome that disproves the hypothesis]

## Validation Method

- **Type**: [prototype / data-analysis / interview / code-spike / market-research / expert-review]
- **Description**: [How the evidence will be gathered]
- **Stopping condition**: [Evidence, time, or cost boundary]
- **Resources needed**: [Include only resources required by the selected method]

## Context

[Opportunity, prior evidence, or product decision that makes this hypothesis relevant]

## Validation Results

Add this section after validation runs.

### Evidence

[Observed results with sources]

### Confidence Update

Record only risk dimensions whose evidence changed.

| Risk | Before | After | Evidence |
|------|--------|-------|----------|
| [risk] | [score] | [score] | [source] |

### Conclusion

[Confirmed, disproved, or inconclusive result and its evidence]

### Next Decision

[Decision changed by the result, or no further action]
