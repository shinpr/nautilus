---
name: recipe-persona
description: Creates or updates evidence-backed personas with the context and JTBD needed for product decisions. Use when user segments or behavior affect discovery, design, or requirements.
disable-model-invocation: true
---

**Context**: Create or update persona files with the evidence-backed distinctions, context, and jobs needed by current product decisions.

## Required Skills [LOAD BEFORE EXECUTION]

1. [LOAD IF NOT ACTIVE] `design-perspective` — persona template and context criteria

## Conditional Skills [LOAD WHEN TRIGGERED]

- WHEN VPC, market, or viability evidence informs the persona: [LOAD IF NOT ACTIVE] `business-context`

Delegate code analysis when repository evidence can answer a current persona question.

## Execution Decision Flow

### 1. Context Assessment

Input: Use the path or text supplied with the explicit skill invocation. If no input was supplied and the target cannot be inferred unambiguously, ask for it.

| Situation | Action |
|-----------|--------|
| No personas exist | Gather available user evidence and label unresolved assumptions |
| Personas exist, new data available | Update existing personas with new evidence |
| Existing codebase | Invoke codebase-analyzer when roles, permissions, or implemented workflows can change the persona |
| Post-interview / post-survey | Update with new primary research |

### 2. Research Gathering

#### From Existing Code (if applicable)
**Invoke codebase-analyzer** to identify:
- User roles and permissions in the system
- User-facing features and workflows
- Data models related to users
- Analytics/tracking events (if present)

#### From User Research
Gather the available data that can answer a current persona question:
- Interview transcripts or summaries
- Survey results
- Support ticket patterns
- Usage analytics
- Market research (per business-context skill)

#### From VPC Analysis
Map Customer Profile from Value Proposition Canvas:
- Customer jobs (functional, social, emotional)
- Pains (frustrations, obstacles, risks)
- Gains (required, expected, desired, unexpected)

### 3. Persona Drafting

Use design-perspective skill `references/persona-template.md`. Include only distinctions, context, jobs, pains, gains, and behavioral evidence that can change a current product decision. Mark each inference or assumption explicitly.

Present the persona draft to the user for confirmation:
- Decision-relevant persona content
- Evidence sources and confidence level
- Assumptions that need validation
- Connections to existing Opportunities (if any)

End the current turn with the persona draft as the workflow output. Write files only after the user confirms that draft in a later turn.

### 4. File Output

After that confirmation:
- Write persona to `docs/product/personas/persona-[name].md`
- Update an Opportunity file only when the confirmed persona changes its meaning
- Update journey maps if persona context changed

## Sub-agent Usage

| Agent | When | Why (context separation benefit) |
|-------|------|----------------------------------|
| codebase-analyzer | Implemented behavior can answer a current persona question | Objective analysis of actual user behavior patterns in code |

## Scope Boundaries

**Included**: Persona creation, persona update, integration with VPC and code analysis
**Not included**: Journey mapping (→ recipe-discover), user story writing (→ recipe-define)

## Completion

The workflow is complete when the confirmed persona exists, or a no-change result identifies the evidence reused, and the user has received any assumptions that still require validation.
