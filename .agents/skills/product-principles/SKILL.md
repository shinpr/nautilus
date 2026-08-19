---
name: product-principles
description: Defines 4 Risks confidence thresholds, OST hierarchy levels, Knowledge Pyramid tiers, and state design requirements. Use when evaluating user stories, setting confidence scores, referencing OST levels, scoping MVP, or determining validation sufficiency.
---

# Product Management Principles

## Core Philosophy

1. **Hypothesis Until Proven**: Every assumption is a hypothesis until validated with evidence. Treat unvalidated ideas as hypotheses, not facts
2. **Value Traceability**: Preserve the links needed to connect a decision or implementation back to its supporting outcome and evidence
3. **Feedback Accumulation**: Every outcome (including failures) is a learning asset. Never delete invalidated hypotheses — they inform future decisions
4. **Validated Enough, Not Perfect**: Don't wait for perfect validation. Use cost x risk x reversibility to determine sufficient confidence
5. **Proportionate Artifacts**: Keep durable decisions in repo artifacts when a downstream consumer will reuse them; no-change and reuse are valid outcomes

## Opportunity Solution Tree (OST) Hierarchy

Use this hierarchy to distinguish outcomes, opportunities, solutions, assumptions, and experiments when those distinctions affect the current decision:

```
Outcome
  ├── Product Outcome (team-controllable product goals)
  │     NSM connects Product Outcome ↔ Business Outcome
  └── Business Outcome (business results Product Outcome contributes to)

Product Outcome
  └── Opportunity (user problems, needs, desires)
        └── Solution (approaches to address the opportunity = feature candidates)
              └── Assumption (premises underlying the solution = hypotheses)
                    └── Experiment (methods to validate the hypothesis)
```

### Level Definitions

| Level | Granularity | Artifact | Description |
|-------|-------------|----------|-------------|
| Business Outcome | Largest | `docs/product/vision.md` | Business results the product contributes to |
| Product Outcome | Large | `docs/product/vision.md` | Team-controllable product goals |
| Opportunity | Large | `docs/discovery/opportunities/` | User problems, needs, desires |
| Solution | Medium | PRD (`docs/prd/`) | Feature candidates addressing an Opportunity |
| Assumption | Small | `docs/discovery/hypotheses/` | Premises underlying a Solution |
| User Story | Smallest | Within PRD | Minimum unit of value with sufficient evidence for its material risks |

## 4 Risks (Authoritative Definition)

A user story is the **minimum unit of value**. Consider all four risks and gather enough evidence for the dimensions that can change the delivery decision:

- **Value** — Will users use/buy this? Does it solve their problem?
- **Usability** — Can users figure out how to use it? Does the UX work?
- **Feasibility** — Can we build it technically? Is the effort realistic?
- **Viability** — Does it work as a business? Can we explain why we're building it?

## Confidence Meter (Authoritative Definition)

Track confidence per risk dimension (0-10):

| Score | Meaning | Typical Evidence |
|-------|---------|------------------|
| 0-2 | Gut feeling / no evidence | Assumption only |
| 3-4 | Structured evaluation | Expert review, competitive analysis, scoring |
| 5-7 | Data-backed | Analytics, surveys, interview patterns |
| 8-10 | Tested and confirmed | Prototype validation, A/B test, beta results |

### Threshold by Cost x Risk x Reversibility

| Condition | Confidence Needed | Evidence Level |
|-----------|-------------------|----------------|
| Low-cost, reversible (feature flag, gradual rollout) | 3-4 | Structured evaluation |
| Medium cost | 5-7 | Data |
| High-cost, irreversible (platform change, pricing change) | 8+ | Test results |

PRDs show **current confidence and remaining risks** at the smallest scope that changes a delivery decision. Avoid repeating the same assessment on every story when the evidence and decision are shared.

## Knowledge Pyramid (Authoritative Definition)

Knowledge is organized in three tiers to manage context as hypotheses accumulate:

| Tier | Scope | Location | Loading |
|------|-------|----------|---------|
| **Tier 1** | Distilled product principles | `docs/product/learnings.md` | Always (via this skill) |
| **Tier 2** | Opportunity-level learnings | Each Opportunity file's "Tier 2 Learnings" section | When working on that Opportunity |
| **Tier 3** | Individual hypothesis files | `docs/discovery/hypotheses/` | On demand |

Tier 1 learnings are validated patterns derived from 3+ independent hypotheses. Treat them as established principles until re-validated.

Distillation criteria (enforced by knowledge-distiller):
- **3+ Rule**: 3+ independent hypotheses required for Tier 1 promotion
- **Cross-segment consistency**: Must hold across 2+ user segments/contexts
- **Contradiction handling**: Conflicting evidence recorded with conditions, never discarded
- **Freshness tags**: All Tier 1 learnings get `last-validated` dates; 6-12 months without re-validation triggers review

## State Design (Authoritative Definition)

For each user-facing interaction, account for the states that can occur or change its acceptance:

| State | Description |
|-------|-------------|
| **Loading** | Data is being fetched/processed — show progress indicator |
| **Empty** | No data exists yet — guide user to first action |
| **Error** | Something went wrong — explain what happened, offer recovery |
| **Partial** | Some data available, some not — show available, indicate missing |
| **Success** | Normal state with data — primary design focus |

PRDs and prototypes cover the states needed to define or validate the current interaction. Omit states that cannot occur or do not affect the decision.

## Key Principles for Daily Decisions

- **3+ Solutions Test**: Use the ability to identify meaningfully different Solutions as a diagnostic for whether an Opportunity is framed too narrowly. A failed diagnostic is a framing signal, not an obligation to manufacture alternatives. See `references/opportunity-template.md` for Opportunity file structure
- **Don't Kill the Product**: Never sever the connection to business outcomes, but use NSM to balance against pure metric-chasing pressure
- **Design is a Perspective, Not a Phase**: Design thinking applies across all processes — discovery, validation, definition, delivery, and reflection
- **Cycle, Not Phases**: Discovery → Validation → Definition → Delivery → Reflection is a continuous cycle. Start from anywhere
- **MVP Scoping**: When transitioning validated hypotheses to PRD, use `references/mvp-definition.md` for prioritization (MoSCoW/RICE) and scope reduction techniques

## Common Pitfalls (Why These Principles Exist)

These principles exist to counter natural tendencies in product thinking:

- **3+ Solutions Test** counters the tendency to treat the first Solution idea as the Opportunity itself. When only one Solution comes to mind, the framing is likely too narrow
- **Confidence Meter (0-10)** counters all-or-nothing thinking about validation. The threshold varies by cost × risk × reversibility because not everything needs the same evidence level
- **Knowledge Pyramid tiers** counter both context overload (loading every hypothesis) and knowledge loss (forgetting past learnings). The 3+ rule for Tier 1 promotion ensures principles are grounded, not anecdotal
- **State Design** counters the tendency to design only for the happy path. Cover the non-success states that can occur and affect the current interaction
