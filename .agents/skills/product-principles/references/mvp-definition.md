# MVP Definition Reference

## Purpose

Framework for defining Minimum Viable Product scope. Use when transitioning from validated hypotheses to PRD — determining what to build first and what to defer.

## MVP Philosophy

**MVP IS**: Minimum features to validate core hypothesis. Fastest path to learning. Starting point for iteration.

**MVP IS NOT**: A low-quality product. Just the first release. Everything customers might want.

## Prioritization Frameworks

### MoSCoW Method

| Priority | Criteria | MVP Inclusion |
|----------|----------|---------------|
| **Must Have** | Core functionality. Without it, product has no value. Directly solves primary pain | YES |
| **Should Have** | Important but not critical. Enhances experience. Can be added soon after MVP | NO (V1.1) |
| **Could Have** | Desirable. Low priority. Future enhancement | NO (V1.2+) |
| **Won't Have** | Explicitly excluded. Not aligned with core value | NO (tracked for future) |

### RICE Score

**RICE = (Reach x Impact x Confidence) / Effort**

| Factor | Scale | Description |
|--------|-------|-------------|
| Reach | Users per time period | How many users affected |
| Impact | 0.25 / 0.5 / 1 / 2 / 3 | Minimal / Low / Medium / High / Massive |
| Confidence | 50% / 80% / 100% | Low / Medium / High — maps to hypothesis confidence |
| Effort | Person-months | Time and resources required |

### ICE Score (Simplified)

**ICE = Impact x Confidence x Ease**

Each factor scored 1-10. Simpler than RICE, useful for quick prioritization.

## MVP Scoping Process

1. **Identify core problem** — What is the primary pain point? (from validated Opportunities)
2. **Define success criteria** — What metrics indicate success? (from Product Outcome)
3. **List all potential features** — From validated hypotheses and Solutions
4. **Apply MoSCoW** — Be ruthless: when in doubt, Should Have or lower
5. **Validate scope** — Can this be built in reasonable time? Does it deliver core value?
6. **Define roadmap** — MVP → V1.1 → V1.2 → V2.0

## Scope Reduction Techniques

- **Remove features**: Question every feature. Remove if not critical
- **Simplify features**: Reduce complexity. Manual processes initially. Limited use cases first
- **Narrow target**: Smaller user segment. Specific use case. Geographic limitation

## MVP Patterns

| Pattern | Description | When to Use |
|---------|-------------|-------------|
| **Concierge** | Manual delivery of service | Validate demand before automation |
| **Wizard of Oz** | Automated frontend, manual backend | Validate UX before full build |
| **Single-Feature** | One core feature done well | Validate feature-market fit |
| **Landing Page** | Describe value, measure interest | Validate problem before building |

## Connection to nautilus Concepts

- **Must Have** features come from **adopted hypotheses** with sufficient confidence
- **Confidence scores** from hypothesis validation directly inform RICE's Confidence factor
- **4 Risks** assessment determines which features need more validation vs. are ready for MVP
- PRD's user stories should only include features that are **validated enough** per the Confidence Meter

## Anti-Patterns

- **Feature creep**: Adding "just one more feature"
- **Perfectionism**: Making MVP too polished
- **No hypothesis**: Building without clear validation goal
- **Kitchen sink MVP**: Trying to serve everyone
- **Scope too large**: MVP takes too long to build

## Quality Checklist

- [ ] Core hypothesis clearly stated
- [ ] Core value identified from validated evidence
- [ ] Features prioritized using MoSCoW or RICE
- [ ] Must Haves are truly essential (challenge each one)
- [ ] Success metrics defined and tied to Product Outcome
- [ ] MVP scope achievable in target timeframe
- [ ] Clear path from MVP to full product
