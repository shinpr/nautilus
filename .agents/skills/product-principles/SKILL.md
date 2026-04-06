---
name: product-principles
description: Defines 4 Risks confidence thresholds, OST hierarchy levels, Knowledge Pyramid tiers, and state design requirements. Use when evaluating user stories, setting confidence scores, referencing OST levels, scoping MVP, or determining validation sufficiency.
---

# Product Management Principles

## Core Philosophy

1. **Hypothesis Until Proven**: Every assumption is a hypothesis until validated with evidence. Treat unvalidated ideas as hypotheses, not facts
2. **Value Traceability**: From hypothesis to validation to user story to PRD to implementation to test — maintain traceability across the entire chain
3. **Feedback Accumulation**: Every outcome (including failures) is a learning asset. Never delete invalidated hypotheses — they inform future decisions
4. **Validated Enough, Not Perfect**: Don't wait for perfect validation. Use cost x risk x reversibility to determine sufficient confidence
5. **Artifacts Over Notes**: Keep structural decisions in designated repo artifacts so prototypes, PRDs, and implementation can reuse the same context

## Opportunity Solution Tree (OST) Hierarchy

All product work follows this hierarchy:

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
| User Story | Smallest | Within PRD | Minimum unit of value with all 4 Risks validated |

## 4 Risks (Authoritative Definition)

A user story is the **minimum unit of value**. All four risks must be **sufficiently validated**:

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

PRDs must show each user story's **current confidence and remaining risks**. Enable PO/DRI to judge "validated enough for delivery", not just "fully validated".

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

Every user-facing interaction must account for these states:

| State | Description |
|-------|-------------|
| **Loading** | Data is being fetched/processed — show progress indicator |
| **Empty** | No data exists yet — guide user to first action |
| **Error** | Something went wrong — explain what happened, offer recovery |
| **Partial** | Some data available, some not — show available, indicate missing |
| **Success** | Normal state with data — primary design focus |

PRDs should specify behavior for all states in acceptance criteria. Prototypes should demonstrate at minimum: empty, success, and error states.

## Key Principles for Daily Decisions

- **3+ Solutions Test**: If an Opportunity can't generate 3+ different Solutions, it may actually be a Solution disguised as an Opportunity (Torres principle). See `references/opportunity-template.md` for Opportunity file structure
- **Don't Kill the Product**: Never sever the connection to business outcomes, but use NSM to balance against pure metric-chasing pressure
- **Design is a Perspective, Not a Phase**: Design thinking applies across all processes — discovery, validation, definition, delivery, and reflection
- **Cycle, Not Phases**: Discovery → Validation → Definition → Delivery → Reflection is a continuous cycle. Start from anywhere
- **MVP Scoping**: When transitioning validated hypotheses to PRD, use `references/mvp-definition.md` for prioritization (MoSCoW/RICE) and scope reduction techniques

## Common Pitfalls (Why These Principles Exist)

These principles exist to counter natural tendencies in product thinking:

- **3+ Solutions Test** counters the tendency to treat the first Solution idea as the Opportunity itself. When only one Solution comes to mind, the framing is likely too narrow
- **Confidence Meter (0-10)** counters all-or-nothing thinking about validation. The threshold varies by cost × risk × reversibility because not everything needs the same evidence level
- **Knowledge Pyramid tiers** counter both context overload (loading every hypothesis) and knowledge loss (forgetting past learnings). The 3+ rule for Tier 1 promotion ensures principles are grounded, not anecdotal
- **State Design** counters the tendency to design only for the happy path. Acceptance criteria that cover only Success state miss the states users encounter most during onboarding
