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

A nautilus PRD follows a standard structure with additive extensions. See `references/prd-template.md` for the authoritative template.

**Core sections** (standard PRD):
- Overview (one-line summary, background)
- User Stories
- Functional Requirements (with EARS-format ACs)
- Non-Functional Requirements (including accessibility)
- Success Criteria (tied to Product Outcomes)
- Technical Considerations

**Nautilus extensions** (additive, never replace core sections):
- Hypothesis & validation references in Overview
- 4 Risks confidence per user story
- Unvalidated assumptions section in Technical Considerations

## User Story Standards

Each user story follows the persona-grounded format with 4 Risks assessment. See `references/user-story-guide.md` for the full guide.

Key rules:
- Reference a specific persona from `docs/product/personas/`, not generic "user"
- Every story has a 4 Risks confidence table with evidence
- "Validated enough" is judged by cost x risk x reversibility, not a fixed threshold
- Remaining risks are documented explicitly, not hidden

## Acceptance Criteria Standards

All functional requirements use EARS-format acceptance criteria. See `references/acceptance-criteria.md` for patterns and examples.

Key rules:
- Use When (event-driven), While (state-driven), or If-Then (conditional) patterns
- Each AC is testable with a clear pass/fail
- User-facing ACs cover relevant states (loading, empty, error, partial, success)
- Accessibility ACs included for UI features
