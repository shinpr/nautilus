---
name: design-perspective
description: Integrates design principles, WCAG 2.2 AA accessibility, persona context, and state design into product decisions. Use when reviewing UX decisions, checking accessibility, applying design principles, or ensuring state coverage in acceptance criteria.
---

# Design Perspective

## Core Philosophy

Design is not a phase — it is a **perspective applied across all product processes**.

| Process | Design's Role |
|---------|--------------|
| Opportunity Discovery | Journey maps, pain point visualization |
| Solution Generation | Design principle-driven ideation |
| Assumption Validation | Prototype generation → usability testing |
| PRD Definition | Usability risk confirmation for user stories |
| Reflection | UX learning accumulation |

## Design Principles Reference

Always reference `docs/product/design-principles.md` for this product's design principles (3-5 principles).

Design principles are **product-specific guardrails** that guide all design decisions. They are not generic best practices but choices that reflect this product's values and trade-offs.

## State Design

See product-principles skill for the authoritative State Design definition (Loading / Empty / Error / Partial / Success).

In practice:
- PRDs should specify behavior for all states in acceptance criteria
- Prototypes should demonstrate at minimum: empty, success, and error states
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

When making design decisions, always reference:
- **Personas** (`docs/product/personas/`) — Who is using this? What's their context, skill level, environment?
- **Journey Maps** (`docs/discovery/journeys/`) — Where in their journey does this interaction happen?

When creating or updating personas, use `references/persona-template.md` for the standard structure (demographics, JTBD, pains/gains, behavioral patterns, validation status).

Design decisions without persona/context grounding are assumptions that need validation.

## Design in Hypothesis Validation

When validating Usability risk through prototypes:
1. Define what "usable" means for this specific user story (tied to persona/context)
2. Identify the critical interaction path to test
3. Specify success criteria (task completion rate, time-on-task, error rate)
4. Generate prototype with design context injected (see prototype-guide skill)
5. Record results with specific UX learnings

## Key Principles for Daily Decisions

- **Design principles first**: Check product design principles before making UX decisions
- **All states matter**: A feature isn't designed until all states are considered
- **Accessibility is not optional**: WCAG 2.2 AA is the baseline, not a stretch goal
- **Context over aesthetics**: A beautiful design that ignores user context fails the Usability risk
- **Test with real scenarios**: Validate UX with persona-grounded scenarios, not abstract tasks

## Why Design Is a Perspective

Treating design as a phase (something done after requirements and before development) leads to surface-level UI work disconnected from user needs. As a perspective:

- Design thinking applies at Opportunity Discovery (journey maps reveal pain points that metrics miss)
- Design thinking applies at Validation (prototypes make hypotheses testable before code is written)
- Design thinking applies at Definition (state design and accessibility in ACs catch gaps that functional specs miss)
- Design principles are product-specific trade-off resolutions, not generic aesthetics guidelines
