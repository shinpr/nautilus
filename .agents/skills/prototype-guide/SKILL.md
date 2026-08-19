---
name: prototype-guide
description: Generates prototype prompts focused on one validation decision with the design context, flows, states, and data needed to observe it. Use when creating prototypes or validating Usability and Value risks with Lovable, v0, or similar tools.
---

# Prototype Generation Guide

## Purpose

Prototypes are **hypothesis validation tools**, not final implementations. They test Usability and Value risks by making ideas tangible enough for evaluation.

## Design Context Injection

Every prototype prompt includes the context needed to make its validation result meaningful.

### Core Context

1. **Scenario** — what the user is trying to accomplish and under what conditions
2. **Decision Under Test** — what specific question the prototype must answer

### Include When It Changes the Prototype or Evaluation

3. **Design Principles** — relevant trade-offs from `docs/product/design-principles.md`
4. **Persona** — characteristics that affect behavior or evaluation
5. **State Design** — states needed to test the decision (see product-principles skill)
6. **Accessibility Requirements** — requirements exercised by the prototype
7. **Existing Components** — design system components needed for consistency
8. **Journey Position** — when surrounding journey context affects the interaction

### Blueprint Context (include when `docs/product/design/` exists)

See `blueprint-standards` Artifact Overview for the full blueprint artifact list.

Read only the blueprint artifacts relevant to the hypothesis under test:
- **Include** `brand-direction.md` when visual direction or tokens affect the prototype or its evaluation
- **Include** `information-architecture.md` when navigation, page hierarchy, or screen placement matters
- **Include** the specific file in `flows/` that matches the interaction under test
- **Include** `content-model.md` when realistic entities, relationships, or stateful data shape the prototype
- **Include** `ai-interaction-model.md` only for AI-powered features

If no matching flow exists, say so explicitly and proceed with the available blueprint artifacts.

### Design Source Priority

Use the primary-source precedence defined in `references/prototype-prompt-guide.md` under `Source Selection Rule`.

## Design System Integration

How to connect prototypes with your design system depends on your setup:

- **npm Package**: Include install instruction and component names in prompt
- **In-Repository Components**: Use codebase-analyzer to identify existing components, list paths and APIs
- **Tailwind Config / Design Tokens**: Include token definitions in prompt only when no higher-priority source exists
- **No DS Yet**: Use Visual Tokens from `brand-direction.md` when available; otherwise define basic constraints (palette, typography, spacing) that can seed a future DS

## Key Principles

- **Prototype to learn, not to ship**: Don't over-invest in polish
- **Context makes the difference**: A prototype without design context is just random UI
- **One decision focus per prototype**: Combine hypotheses only when the same flow and evidence resolve them together
- **Describe flows, not just screens**: Step-by-step user flow improves output quality more than isolated UI descriptions
- **Describe states, not just features**: State transitions and recovery behavior matter as much as happy-path layout
- **Use concrete data and copy**: Realistic sample data and actual UI copy produce better prototypes than placeholders
- **Separate machine prompt from human guide**: Keep executable instructions and evaluation notes in different files
- **Preserve reusable evidence**: Save the artifacts needed to evaluate, reproduce, or reuse the result
- **Iterate, don't restart**: Build on previous prototypes

For detailed prompt construction patterns, DS integration examples, platform-specific tips, and scope boundaries, see `references/prototype-prompt-guide.md`.
