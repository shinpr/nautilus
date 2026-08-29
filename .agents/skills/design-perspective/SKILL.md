---
name: design-perspective
description: Integrates design principles, WCAG 2.2 AA accessibility, persona context, and state design into product decisions. Use when reviewing UX decisions, checking accessibility, applying design principles, or ensuring state coverage in acceptance criteria.
---

# Design Perspective

## Core Philosophy

Apply design evidence wherever it can change discovery, validation, requirements, or reflection.

| Process | Design's Role |
|---------|--------------|
| Opportunity Discovery | Journey maps, pain point visualization |
| Solution Generation | Design principle-driven ideation |
| Assumption Validation | Prototype generation → usability testing |
| PRD Definition | Usability risk confirmation for user stories |
| Reflection | UX learning accumulation |

## Design Principles Reference

Before making a UX or product-design decision, read `docs/product/design-principles.md` when it exists. An accessibility-only check does not require it unless the check also changes a product-specific trade-off.

Design principles are **product-specific guardrails** that guide all design decisions. They are not generic best practices but choices that reflect this product's values and trade-offs.

## State Design

See product-principles skill for the authoritative State Design definition (Loading / Empty / Error / Partial / Success).

Implement the states that can occur and affect the acceptance decision.

In practice:
- PRDs should specify behavior for the states relevant to each acceptance boundary
- Prototypes should demonstrate the states needed to test the current hypothesis
- User stories addressing Usability risk should consider all relevant states

## Accessibility Standards

**Baseline: WCAG 2.2 AA compliance**

Key requirements:
- **Perceivable**: Text alternatives for non-text content, sufficient color contrast (4.5:1 for normal text, 3:1 for large text), content adaptable to different presentations
- **Operable**: All functionality available via keyboard, sufficient time for interactions, no content that causes seizures, clear navigation mechanisms
- **Understandable**: Readable text, predictable behavior, input assistance for error prevention
- **Robust**: Compatible with assistive technologies, valid markup

Accessibility is a **Usability risk** dimension — factor it into confidence scoring.

## Persona and Context Integration

When they can change the design decision, reference:
- **Personas** (`docs/product/personas/`) — Who is using this? What's their context, skill level, environment?
- **Journey Maps** (`docs/discovery/journeys/`) — Where in their journey does this interaction happen?

When creating or updating personas, use `references/persona-template.md` for decision-relevant context, jobs, behavioral evidence, and validation gaps.

Treat design decisions without persona or context evidence as assumptions requiring validation.

## Blueprint Integration

See `blueprint-standards` Artifact Overview for the full blueprint artifact list.

When `docs/product/design/` exists, blueprint artifacts provide shared structural context:
- `information-architecture.md` — page hierarchy and navigation
- `content-model.md` — entities, relationships, and stateful data
- `brand-direction.md` — tone, visual direction, and Visual Tokens
- `flows/` — critical user flows and edge paths
- `ai-interaction-model.md` — AI interaction patterns, guardrails, and error taxonomy

Prototypes and PRDs should reference these artifacts when available instead of re-inferring structure from scratch.

## Design in Hypothesis Validation

When validating Usability risk through prototypes:
1. Define what "usable" means for this specific user story (tied to persona/context)
2. Identify the critical interaction path to test
3. Specify success criteria (task completion rate, time-on-task, error rate)
4. Generate prototype with design context injected (see prototype-guide skill)
5. Record results with specific UX learnings
