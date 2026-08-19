---
name: prd-standards
description: Defines PRD structure, user story format with 4 Risks assessment, EARS-format acceptance criteria, and delivery readiness thresholds. Use when writing PRDs, drafting user stories, defining acceptance criteria, or reviewing PRD quality and completeness.
---

# PRD Standards

## Purpose

Canonical reference for PRD quality — shared by both authoring (recipe-define) and review (doc-reviewer) workflows. Ensures the author and reviewer apply the same standards.

## Reference Selection

| Task | Read |
|------|------|
| Writing or reviewing a full PRD | `references/prd-template.md` |
| Writing or reviewing acceptance criteria | `references/acceptance-criteria.md` |
| Assessing story readiness or drafting user stories | `references/user-story-guide.md` |

## Relationship to product-principles

4 Risks framework, Confidence Meter (0-10), and OST hierarchy are **defined** in product-principles. This skill operationalizes them in the PRD context — templates, thresholds, and format. For authoritative definitions, always defer to product-principles.

## PRD Structure

A nautilus PRD uses the portions of the standard structure required by its delivery consumer. See `references/prd-template.md` for the available structure.

**Core sections** (include when they carry a delivery decision or required evidence):
- Overview (one-line summary, background)
- Users and Stories
- Functional Requirements (with EARS-format ACs)
- Design Context
- Non-Functional Requirements (including accessibility)
- Success Criteria (tied to Product Outcomes)
- Technical Considerations

**Nautilus extensions** (include at the smallest scope that affects delivery):
- Hypothesis & validation references in Overview
- 4 Risks evidence at the scope that changes delivery readiness
- Design Context derived from design artifacts and prototypes
- Unvalidated assumptions section in Technical Considerations

## User Story Standards

User stories remain persona-grounded. Record 4 Risks evidence at the smallest scope that changes delivery readiness; shared evidence does not need to be repeated per story. See `references/user-story-guide.md` for the full guide.

Key rules:
- Reference a specific persona from `docs/product/personas/`, not generic "user"
- Each material risk has evidence available to the delivery decision
- "Validated enough" is judged by cost x risk x reversibility, not a fixed threshold
- Remaining risks are documented explicitly, not hidden

## Acceptance Criteria Standards

Use EARS-format acceptance criteria when its event, state, or conditional form makes the requirement more testable or a downstream consumer requires it. See `references/acceptance-criteria.md` for patterns and examples.

Key rules:
- Use When (event-driven), While (state-driven), or If-Then (conditional) patterns
- Each AC is testable with a clear pass/fail
- User-facing ACs cover relevant states (loading, empty, error, partial, success)
- Accessibility ACs included for UI features
