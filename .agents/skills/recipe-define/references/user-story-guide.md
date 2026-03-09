# User Story Guide

## Purpose

Guide for writing user stories with 4 Risks assessment and Confidence Meter integration. User stories are the **minimum unit of value** in nautilus.

## User Story Format

```
As a [user type]
I want to [goal/desire]
So that [expected value/benefit]
```

### Writing Good User Stories

- **User type**: Reference a specific persona from `docs/product/personas/`. Avoid generic "user"
- **Goal/desire**: What the user wants to accomplish, not how the system works
- **Value/benefit**: Why this matters to the user. Must connect to an Opportunity

### INVEST Criteria

| Criterion | Description |
|-----------|-------------|
| **Independent** | Can be developed and delivered independently |
| **Negotiable** | Details can be discussed, not a rigid contract |
| **Valuable** | Delivers value to the user or business |
| **Estimable** | Team can estimate the effort |
| **Small** | Small enough to be delivered in a single iteration |
| **Testable** | Has clear acceptance criteria |

## 4 Risks Assessment

Every user story must assess Cagan's 4 Risks:

### Value Risk
- **Question**: Will users use this? Does it solve their problem?
- **Evidence types**: User interviews, usage data, prototype testing, competitive analysis
- **Low confidence indicators**: No user evidence, only stakeholder opinion, untested assumption

### Usability Risk
- **Question**: Can users figure out how to use it? Does the UX work?
- **Evidence types**: Prototype testing, usability studies, interaction patterns, accessibility audit
- **Low confidence indicators**: No prototype tested, complex interaction, new paradigm

### Feasibility Risk
- **Question**: Can we build it? Is the effort realistic?
- **Evidence types**: Code spike, architecture review, team expertise, dependency analysis
- **Low confidence indicators**: Unknown technology, complex integration, tight timeline

### Viability Risk
- **Question**: Does it work as a business? Can we explain why we're building it?
- **Evidence types**: Market analysis, business model fit, regulatory review, ROI analysis
- **Low confidence indicators**: Unclear revenue impact, regulatory uncertainty, misaligned with strategy

## Confidence Meter (0-10) per Risk

| Score | Meaning | Typical Evidence |
|-------|---------|------------------|
| 0-2 | Gut feeling / no evidence | Assumption only |
| 3-4 | Structured evaluation | Expert review, competitive analysis, scoring |
| 5-7 | Data-backed | Analytics, surveys, interview patterns |
| 8-10 | Tested and confirmed | Prototype validation, A/B test, beta results |

## "Validated Enough" Judgment

Not all stories need 8+ on every risk. The threshold depends on **cost x risk x reversibility**:

| Condition | Required Confidence | Example |
|-----------|--------------------|---------|
| Low-cost, reversible | 3-4 on each risk | Feature flag experiment, UI tweak |
| Medium cost | 5-7 on each risk | New feature requiring 1-2 sprints |
| High-cost, irreversible | 8+ on each risk | Platform migration, pricing model change |

### Decision Framework

```
For each user story:
1. Assess current confidence per risk (0-10)
2. Determine the cost/reversibility of implementation
3. Compare confidence to threshold
4. If any risk is below threshold:
   a. Can we reduce cost/increase reversibility? (feature flag, gradual rollout)
   b. If yes → lower the threshold
   c. If no → validate further before including in PRD
5. Document the rationale for "validated enough" or "needs more validation"
```

## User Story in PRD

In the PRD, each user story includes:

```markdown
#### US-N: [Story Title]

As a [persona name]
I want to [goal]
So that [benefit]

**4 Risks Confidence (0-10):**
| Risk | Score | Evidence | Remaining Risk |
|------|-------|----------|----------------|
| Value | N | [evidence] | [what's uncertain] |
| Usability | N | [evidence] | [what's uncertain] |
| Feasibility | N | [evidence] | [what's uncertain] |
| Viability | N | [evidence] | [what's uncertain] |

**Delivery readiness**: [validated enough / needs more validation]
**Rationale**: [cost x risk x reversibility justification]
```

## Common Anti-Patterns

- **Solution-as-story**: "As a user, I want a dropdown menu" — this describes implementation, not value
- **Epic disguised as story**: Too large to deliver independently. Split it
- **Missing persona**: "As a user" instead of referencing a specific persona
- **No evidence**: Confidence scores without backing evidence
- **Perfectionism**: Waiting for all 8+ before proceeding when 3-4 would suffice
- **Ignoring remaining risks**: Not documenting what's still uncertain
