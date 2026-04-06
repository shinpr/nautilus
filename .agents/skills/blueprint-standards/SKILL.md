---
name: blueprint-standards
description: Defines structural design artifact formats — information architecture, user flows, content model, brand direction, Visual Tokens, and AI interaction model. Use when creating or reviewing design artifacts that precede prototype generation.
---

# Blueprint Standards

## Purpose

Blueprint artifacts define the structural and visual foundation that prototypes and downstream specs build upon.

They answer:
- What pages and flows exist?
- What data lives where?
- What should the product feel like?
- What concrete visual rules should AI tools reuse?

## Artifact Overview

| Artifact | Question It Answers | Template |
|----------|-------------------|----------|
| Information Architecture | What pages exist and how are they organized? | `references/ia-template.md` |
| User Flows | How do users move through the product to achieve goals? | `references/flow-template.md` |
| Content Model | What data types exist and how do they relate? | `references/content-model-template.md` |
| Brand Direction | What does the product look and feel like? | `references/brand-direction-template.md` |
| AI Interaction Model | How do users interact with AI features? | `references/ai-interaction-model-template.md` |

## Relationship to Other Artifacts

```
docs/product/vision.md              ← Strategic intent
docs/product/design-principles.md   ← Trade-off resolutions
docs/product/personas/              ← Who uses it
docs/discovery/opportunities/       ← What problems to solve
docs/discovery/hypotheses/          ← What to validate
                ↓
docs/product/design/                ← Blueprint
                ↓
docs/discovery/prototypes/          ← Validation artifacts
                ↓
docs/prd/                           ← Delivery handoff
```

## Scope

**Blueprint defines**: structure, navigation, data relationships, visual direction, Visual Tokens, interaction patterns  
**Blueprint defers**: component APIs, production-ready design systems, pixel-perfect responsive specs

## Key Principles

- **Opportunity-grounded**: Every major page or flow traces to a real opportunity or support need
- **Persona-informed**: Flows and terminology reflect actual users
- **Consistent across prototypes**: Shared blueprint context prevents prototype-to-prototype drift
- **AI-readable**: Visual Tokens and decisions are written in markdown so coding agents can consume them directly
- **Reusable downstream**: PRDs, UI specs, and implementation can reference the same artifacts
