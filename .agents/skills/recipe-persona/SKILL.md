---
name: recipe-persona
description: Create or update personas with demographic, contextual, JTBD, and behavioral data
disable-model-invocation: true
---

**Context**: Create or update persona files with demographics, context, JTBD, pains/gains, and behavioral patterns. Integrates existing codebase analysis when available.

## Orchestrator Definition

**Execution Protocol**:
1. **Delegate code analysis** to codebase-analyzer when existing code reveals user behavior
2. **Follow the persona flow** defined below
3. **Stop at every `[STOP — BLOCKING]` marker** — present findings and CANNOT proceed until user explicitly confirms

## Workflow Overview

```
Input (new persona request / persona update / discovery trigger)
    ↓
1. Context Assessment → New vs. Update, existing code?
    ↓
2. Research Gathering → User data, interviews, analytics, code analysis
    ↓
3. Persona Drafting → Using persona-template.md [Stop: User confirms persona]
    ↓
Output: docs/product/personas/persona-[name].md
```

## Execution Decision Flow

### 1. Context Assessment

Input: $ARGUMENTS

| Situation | Action |
|-----------|--------|
| No personas exist | Create from scratch — gather user research or assumptions |
| Personas exist, new data available | Update existing personas with new evidence |
| Existing codebase | Invoke codebase-analyzer for real user behavior insights |
| Post-interview / post-survey | Update with new primary research |

### 2. Research Gathering

#### From Existing Code (if applicable)
**Invoke codebase-analyzer** to identify:
- User roles and permissions in the system
- User-facing features and workflows
- Data models related to users
- Analytics/tracking events (if present)

#### From User Research
Gather available data:
- Interview transcripts or summaries
- Survey results
- Support ticket patterns
- Usage analytics
- Market research (see business-context skill)

#### From VPC Analysis
Map Customer Profile from Value Proposition Canvas:
- Customer jobs (functional, social, emotional)
- Pains (frustrations, obstacles, risks)
- Gains (required, expected, desired, unexpected)

### 3. Persona Drafting

Use design-perspective skill's `references/persona-template.md` to create persona files:

1. **Demographics**: Role, experience, technical proficiency, industry
2. **Context**: Environment, frequency, time pressure, adjacent tools
3. **JTBD**: Primary job, secondary jobs, social/emotional jobs
4. **Pains and Gains**: Mapped from research with severity/priority
5. **Behavioral Patterns**: Decision-making, adoption tendency, information sources
6. **Validation Status**: Based on research quality — mark assumptions explicitly

**[STOP — BLOCKING]** Present persona draft to user for confirmation:
- Complete persona draft
- Evidence sources and confidence level
- Assumptions that need validation
- Connections to existing Opportunities (if any)

**CANNOT write persona file until user explicitly confirms.**

### 4. File Output

After user approval:
- Write persona to `docs/product/personas/persona-[name].md`
- Update any Opportunity files that reference this persona
- Update journey maps if persona context changed

## Sub-agent Usage

| Agent | When | Why (context separation benefit) |
|-------|------|----------------------------------|
| codebase-analyzer | Existing codebase with user-facing features | Objective analysis of actual user behavior patterns in code |

## Scope Boundaries

**Included**: Persona creation, persona update, integration with VPC and code analysis
**Not included**: Journey mapping (→ recipe-discover), user story writing (→ recipe-define)

## Completion Criteria

- [ ] Context assessed (create vs. update)
- [ ] Research gathered (code analysis, user data, market research as available)
- [ ] Persona drafted with all template sections
- [ ] Validation status clearly marked (evidence-based vs. assumption)
- [ ] User confirmed persona
- [ ] File written to `docs/product/personas/`
