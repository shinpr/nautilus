---
name: hypothesis-discipline
description: Manages hypothesis lifecycle, enforces validation criteria, time budgets, and confidence scoring rules. Use when creating hypotheses, updating confidence scores, setting validation criteria, handling timeouts, or recording validation results.
---

# Hypothesis Discipline

## Core Principle

A hypothesis is not a guess — it is a **structured statement with clear validation criteria and a time budget**. Every hypothesis must answer: "How will we know if this is true or false?"

## Hypothesis Characteristics

- Hypotheses exist at **every level** of the OST hierarchy (see product-principles skill)
- Each hypothesis has a **target level** attribute indicating which OST level it addresses
- Hypotheses follow an **ADR-style lifecycle** — a single file tracks the full journey from draft to conclusion
- **Rejected and invalidated hypotheses are never deleted** — they are learning assets

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
- `confidence`: per-risk scores (value, usability, feasibility, viability) on 0-10 scale (see product-principles skill for Confidence Meter definition)
- `time-budget` and `deadline`: validation time constraints

## Validation Criteria Requirements

Every hypothesis **must** define before testing begins:

1. **We believe that** — the hypothesis statement
2. **We'll know we're right when** — measurable success criteria
3. **We'll know we're wrong when** — measurable failure criteria
4. **Validation method** — how we will test (prototype, data analysis, interview, code spike, market research)
5. **Time budget** — maximum time investment before forced decision

## Time Budget and Cutoff

- Every hypothesis gets a **time budget** (e.g., 1d, 1w, 2w)
- A **deadline** sets the hard cutoff date
- When deadline passes without conclusion → status becomes `timeout`
- Timeout forces a decision: extend (with justification), pivot, or abandon
- **Never let a hypothesis run indefinitely** — unbounded exploration wastes resources

## Confidence Update Rules

- Confidence scores are updated **only when new evidence is gathered**
- Record the evidence that justified each score change
- Confidence can go **down** as well as up — negative evidence is valid evidence
- Different risk dimensions can have different confidence levels

## Result Recording

When a hypothesis reaches conclusion (validated/invalidated/inconclusive/adopted/rejected):

1. **Record the result** in the hypothesis file with evidence
2. **Update confidence scores** with final values
3. **Link to evidence** (data, screenshots, prototype results, interview notes)
4. **Extract learnings** — what did we learn regardless of the outcome?
5. **Update the parent Opportunity** if the result changes its understanding

## Key Disciplines

- **Separate creation from evaluation**: Don't judge hypotheses while generating them
- **Seek disconfirming evidence**: Actively look for reasons the hypothesis might be wrong
- **One hypothesis, one test**: Don't bundle multiple hypotheses into a single validation
- **Record everything**: Even "obvious" conclusions need recorded reasoning
- **Rejected ≠ worthless**: A rejected hypothesis teaches what doesn't work and why
- **Inconclusive is honest**: When evidence is insufficient, say so instead of forcing a verdict

## Why These Disciplines Matter

Each discipline exists to counter a specific cognitive tendency:

- **Separate creation from evaluation** counters premature judgment that kills divergent thinking
- **Seek disconfirming evidence** counters the natural pull toward confirming what we already believe
- **One hypothesis, one test** counters the temptation to bundle tests, which makes results uninterpretable
- **Time budgets with hard cutoffs** counter unbounded exploration — a hypothesis without a deadline is an excuse to avoid decisions
- **Confidence can go down** counters the assumption that validation is always forward progress. Negative evidence is equally valuable
