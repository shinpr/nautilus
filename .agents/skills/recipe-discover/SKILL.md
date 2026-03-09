---
name: recipe-discover
description: Orchestrate Opportunity discovery and hypothesis generation through business and user perspectives
disable-model-invocation: true
---

**Context**: Discover Opportunities and generate hypotheses by combining business analysis (BMC/VPC/market) with user analysis (JTBD/pains/gains). Outputs Opportunity files and hypothesis files.

## Required Skills [LOAD BEFORE EXECUTION]

1. [LOAD IF NOT ACTIVE] `business-context` — BMC, VPC, and market analysis frameworks
2. [LOAD IF NOT ACTIVE] `hypothesis-discipline` — hypothesis lifecycle and confidence scoring
3. [LOAD IF NOT ACTIVE] `product-principles` — OST hierarchy, 4 Risks, Knowledge Pyramid

## Orchestrator Definition

**Execution Protocol**:
1. **Delegate analysis work** to sub-agents when context separation benefits accuracy
2. **Follow the discovery flow** defined below
3. **Stop at every `[STOP — BLOCKING]` marker** — present findings and CANNOT proceed until user explicitly confirms

## Workflow Overview

```
Input (user request / existing code / market opportunity)
    ↓
1. Context Assessment → Determine starting point
    ↓
2. Business Context Analysis → BMC/VPC/Market (if needed)
    ↓
3. User Context Analysis → Personas/JTBD/Journeys
    ↓
4. Opportunity Identification → [Stop: Opportunity confirmation]
    ↓
5. Hypothesis Generation → [Stop: Hypothesis review]
    ↓
Output: Opportunity files + Hypothesis files in docs/discovery/
```

## Execution Decision Flow

### 1. Context Assessment

Input: $ARGUMENTS

**Assess the starting point:**

| Situation | Action |
|-----------|--------|
| Greenfield (no existing product) | Full business + user analysis |
| Existing codebase | Invoke codebase-analyzer first for objective fact-gathering |
| Specific market opportunity | Focus on market analysis + VPC |
| User feedback / support tickets | Focus on user analysis + journey mapping |
| Vision exists (`docs/product/vision.md`) | Align discovery with Product Outcomes |

### 2. Business Context Analysis

When business context is needed, use the business-context skill frameworks:

- **BMC**: Understand the business model — especially Customer Segments, Value Propositions, Revenue Streams
- **VPC**: Map Customer Profile (jobs/pains/gains) to Value Map (products/pain relievers/gain creators)
- **Market Analysis**: TAM/SAM/SOM, competitive landscape, market gaps

See business-context skill `references/business-model-canvas.md`, `references/value-proposition-canvas.md`, and `references/market-analysis.md` for detailed frameworks.

**Web search**: Use web search for market research — industry reports, competitor analysis, trend data. Market research benefits from hypothesis context (unlike code analysis).

### 3. User Context Analysis

- **Personas**: Reference existing personas (`docs/product/personas/`) or delegate to recipe-persona for full persona work
- **JTBD**: Identify functional, social, and emotional jobs from VPC Customer Profile
- **Journey Mapping**: Create journey maps using `references/journey-template.md` to visualize pain points and opportunities

### 4. Opportunity Identification

Synthesize business and user analysis into Opportunities:

1. Draft Opportunity files using product-principles skill `references/opportunity-template.md`
2. **3+ Solutions Test**: For each Opportunity, verify 3+ meaningfully different Solutions exist. If not, it may be a Solution disguised as an Opportunity
3. Link Opportunities to Product Outcomes (if vision exists)
4. Assess impact (frequency x severity x breadth)

**[STOP — BLOCKING]** Present Opportunities to user for confirmation:
- Opportunity summaries with impact assessment
- Evidence supporting each Opportunity
- 3+ Solutions test results
- Recommended priority order

**CANNOT proceed to Step 5 until user explicitly confirms, modifies, or rejects Opportunities.**

### 5. Hypothesis Generation

For confirmed Opportunities, generate hypotheses:

1. Draft hypothesis files using hypothesis-discipline skill `references/hypothesis-template.md`
2. Assign appropriate level (outcome / opportunity / solution / assumption)
3. Set initial confidence scores (typically 0-2 for new hypotheses)
4. Propose time budgets and deadlines
5. Suggest validation methods

**[STOP — BLOCKING]** Present hypotheses to user for review:
- Hypothesis list per Opportunity
- Proposed validation methods and time budgets
- Recommended validation priority

**CANNOT write files to `docs/discovery/` until user explicitly approves.**

### 6. File Output

After user approval:
- Write Opportunity files to `docs/discovery/opportunities/`
- Write hypothesis files to `docs/discovery/hypotheses/`
- Create journey maps in `docs/discovery/journeys/` (if created)
- Create or update `docs/discovery/INDEX.md`

## Sub-agent Usage

| Agent | When | Why (context separation benefit) |
|-------|------|----------------------------------|
| codebase-analyzer | Existing codebase exists | Objective fact-gathering without hypothesis bias |

## Scope Boundaries

**Included**: Opportunity discovery, hypothesis generation, market research, journey mapping
**Not included**: Hypothesis validation (→ recipe-validate), PRD creation (→ recipe-define), persona deep-dive (→ recipe-persona)

## Completion Criteria

- [ ] Starting context assessed
- [ ] Business and/or user analysis completed (as appropriate)
- [ ] Opportunities identified with 3+ Solutions test passed
- [ ] User confirmed Opportunities
- [ ] Hypotheses generated with validation methods and time budgets
- [ ] User reviewed hypotheses
- [ ] Files written to `docs/discovery/`
