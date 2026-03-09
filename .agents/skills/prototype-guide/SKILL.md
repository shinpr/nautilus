---
name: prototype-guide
description: Generates high-quality prototype prompts with design context injection, user flows, state transitions, concrete mock data, and prompt/guide separation. Use when creating prototypes, writing prompts for Lovable or v0, or validating Usability and Value risks through tangible artifacts.
---

# Prototype Generation Guide

## Purpose

Prototypes are **hypothesis validation tools**, not final implementations. They test Usability and Value risks by making ideas tangible enough for evaluation.

## Design Context Injection

Every prototype prompt must include relevant design context. Without context, prototypes validate nothing — they just produce arbitrary UI.

### Required Context (always include)

1. **Design Principles** — from `docs/product/design-principles.md`
2. **Persona** — from `docs/product/personas/`
3. **Scenario** — what the user is trying to accomplish, their context
4. **Hypothesis Under Test** — what specific question this prototype answers

### Recommended Context (include when available)

5. **State Design** — which states to demonstrate (see product-principles skill)
6. **Accessibility Requirements** — WCAG 2.2 AA baseline
7. **Existing Components** — design system components for consistency
8. **Journey Position** — where in the user journey this occurs

## Design System Integration

How to connect prototypes with your design system depends on your setup:

- **npm Package**: Include install instruction and component names in prompt
- **In-Repository Components**: Use codebase-analyzer to identify existing components, list paths and APIs
- **Tailwind Config / Design Tokens**: Include token definitions in prompt
- **No DS Yet**: Define basic constraints (palette, typography, spacing) — these seed a future DS

## Key Principles

- **Prototype to learn, not to ship**: Don't over-invest in polish
- **Context makes the difference**: A prototype without design context is just random UI
- **One hypothesis per prototype**: Keep focused on a single question
- **Describe flows, not just screens**: Step-by-step user flow improves output quality more than isolated UI descriptions
- **Describe states, not just features**: State transitions and recovery behavior matter as much as happy-path layout
- **Use concrete data and copy**: Realistic sample data and actual UI copy produce better prototypes than placeholders
- **Separate machine prompt from human guide**: Keep executable instructions and evaluation notes in different files
- **Save everything**: Code, screenshots, and learnings all go to `docs/discovery/prototypes/`
- **Iterate, don't restart**: Build on previous prototypes

For detailed prompt construction patterns, DS integration examples, platform-specific tips, and scope boundaries, see `references/prototype-prompt-guide.md`.
