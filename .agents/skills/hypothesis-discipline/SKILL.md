---
name: hypothesis-discipline
description: Manages hypothesis lifecycle, enforces validation criteria, time budgets, and confidence scoring rules. Use when creating hypotheses, updating confidence scores, setting validation criteria, handling timeouts, or recording validation results.
---

# Hypothesis Discipline

## Core Principle

A hypothesis is not a guess. A hypothesis selected for validation needs a clear decision, evidence criteria, and a stopping condition.

## Hypothesis Characteristics

- Hypotheses exist at **every level** of the OST hierarchy (see product-principles skill)
- Each hypothesis has a **target level** attribute indicating which OST level it addresses
- Hypotheses follow an **ADR-style lifecycle** — a single file tracks the full journey from draft to conclusion
- Preserve rejected and invalidated hypotheses as learning assets

## Hypothesis Lifecycle

```
draft → testing → validated → adopted
                            → rejected (validated but not adopted)
              → invalidated (disproven by evidence)
              → inconclusive (evidence gathered but insufficient to confirm or deny)
              → timeout (deadline passed, decision needed: continue or stop)
```

## Hypothesis File Schema

The authoritative schema is defined in `references/hypothesis-template.md`. Key fields:

- `id`: HYPO-NNN
- `level`: outcome / opportunity / solution / assumption
- `status`: draft / testing / validated / invalidated / inconclusive / adopted / rejected / timeout
- `confidence`: scores for the risk dimensions that can change the hypothesis decision, on the product-principles 0-10 scale
- `time-budget` and `deadline`: include when time or calendar limits affect the validation decision

## Validation Criteria Requirements

A hypothesis entering validation defines:

1. **We believe that** — the hypothesis statement
2. **We'll know we're right when** — measurable success criteria
3. **We'll know we're wrong when** — measurable failure criteria
4. **Validation method** — how we will test (prototype, data analysis, interview, code spike, market research)
5. **Stopping condition** — the evidence, time limit, or cost limit that ends this validation

## Time Budget and Cutoff

- Give a validation a **time budget** when exploration or evidence collection can expand
- Add a **deadline** when a calendar cutoff changes the decision
- When deadline passes without conclusion → status becomes `timeout`
- Timeout forces a decision: extend (with justification), pivot, or abandon
- End validation at its evidence, time, or cost boundary

## Confidence Update Rules

- Confidence scores are updated **only when new evidence is gathered**
- Record the evidence that justified each score change
- Confidence can go **down** as well as up — negative evidence is valid evidence
- Different risk dimensions can have different confidence levels

## Result Recording

When a hypothesis reaches a conclusion, record the result, changed confidence dimensions, and evidence in the hypothesis file. Carry a learning or parent-Opportunity update into reflection only when the result can change a later decision.

## Key Disciplines

- **Separate creation from evaluation**: Generate candidates before applying evaluation criteria
- **Seek disconfirming evidence**: Actively look for reasons the hypothesis might be wrong
- **One decision per validation**: Combine hypotheses when the same evidence resolves the same decision; separate them when bundling would make the result uninterpretable
- **Record decision-relevant evidence**: Preserve the evidence and reasoning needed to understand or reuse the conclusion
- **Rejected ≠ worthless**: A rejected hypothesis teaches what doesn't work and why
- **Inconclusive is honest**: When evidence is insufficient, say so instead of forcing a verdict
