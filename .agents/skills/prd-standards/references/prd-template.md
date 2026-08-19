# PRD: [Feature Name]

Use the sections that carry a decision, boundary, evidence, or information required by delivery. Omit empty sections and avoid repeating shared evidence per story.

## Overview

- **Outcome**: [Observable product or user outcome]
- **Background**: [Why this outcome matters]
- **In scope**: [Required behavior]
- **Out of scope**: [Explicit exclusions]
- **Decision-bearing references**: [Opportunity, hypothesis, prototype, or product decision links]

## Users and Stories

### Primary Users

[Reference the personas or user evidence that changes behavior or acceptance.]

### US-N: [Story Title]

```text
As a [user type]
I want to [goal]
So that [benefit]
```

- **Delivery readiness**: [validated enough / needs more validation]
- **Rationale**: [Cost x risk x reversibility evidence]
- **Story-specific risk**: [Only a risk or evidence delta not already covered at feature scope]

### Shared Risk Evidence

Include this section when multiple stories rely on the same evidence.

| Material Risk | Confidence | Evidence | Remaining Risk |
|---------------|------------|----------|----------------|
| [Value / Usability / Feasibility / Viability] | [0-10] | [source] | [decision-relevant uncertainty] |

## Functional Requirements

### Required

- **FR-N**: [Required behavior]
  - [Testable acceptance criterion; use EARS when its event, state, or condition improves precision. Prefix with a stable AC ID when an implementation, test, or planning consumer references individual ACs.]
  - **Relevant states**: [Only states that can occur and affect acceptance]

### Optional

[Include only options retained in the confirmed scope.]

## Design Context

Include the design sources and decisions needed by UI specification or implementation:

- Design principles: [Relevant trade-offs]
- Brand direction or Visual Tokens: [Relevant source]
- Critical flow: [Relevant flow]
- Prototype evidence: [Relevant artifact]
- Accessibility boundary: [Applicable WCAG 2.2 AA requirement]

## Non-Functional Requirements

Include only measurable performance, reliability, security, scalability, accessibility, or operational requirements that constrain the solution or its verification.

## Success Criteria

- [Observable criterion tied to the approved outcome]

## Technical Considerations

### Dependencies and Constraints

- [Dependency or constraint that affects delivery]

### Unvalidated Assumptions

- [Assumption that the PRD proceeds with, its evidence, and the decision it may change]

### Material Risks

| Risk | Effect | Response |
|------|--------|----------|
| [Risk] | [Outcome, boundary, or delivery effect] | [Accepted mitigation or remaining uncertainty] |

## Unresolved Decisions

List only user-owned decisions or missing evidence that blocks faithful delivery. Repository-local reversible choices stay with implementation.
