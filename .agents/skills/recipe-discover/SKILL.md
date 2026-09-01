---
name: recipe-discover
description: Frames product Opportunities and creates decision-relevant hypotheses from available evidence. Use when exploring a problem, market opportunity, or user need.
disable-model-invocation: true
metadata:
  opencode/autoinvoke: "false"
---

**Context**: Discover Opportunities and generate hypotheses by combining business analysis (BMC/VPC/market) with user analysis (JTBD/pains/gains). Outputs Opportunity files and hypothesis files.

## Required Skills [LOAD BEFORE EXECUTION]

1. [LOAD IF NOT ACTIVE] `hypothesis-discipline` — hypothesis lifecycle, evidence, and stopping conditions
2. [LOAD IF NOT ACTIVE] `product-principles` — Opportunity hierarchy, 4 Risks, and framing rules

## Conditional Skills [LOAD WHEN TRIGGERED]

- WHEN the request or available evidence raises a business-model, market, or viability decision: [LOAD IF NOT ACTIVE] `business-context`

Delegate code analysis when a separate repository reading can change the discovery decision.

## Execution Decision Flow

### 1. Context Assessment

Input: Use the path or text supplied with the explicit skill invocation. If no input was supplied and the target cannot be inferred unambiguously, ask for it.

**Assess the starting point:**

| Situation | Action |
|-----------|--------|
| Greenfield (no existing product) | Gather the business and user evidence needed to frame the requested outcome |
| Existing codebase | Invoke codebase-analyzer when current behavior can change the Opportunity framing |
| Specific market opportunity | Focus on market analysis + VPC |
| User feedback / support tickets | Focus on user analysis + journey mapping |
| Vision exists (`docs/product/vision.md`) | Align discovery with Product Outcomes |

### 2. Business Context Analysis

When business context can change the Opportunity decision, select the relevant business-context framework:

- **BMC**: Understand the business model — especially Customer Segments, Value Propositions, Revenue Streams
- **VPC**: Map Customer Profile (jobs/pains/gains) to Value Map (products/pain relievers/gain creators)
- **Market Analysis**: TAM/SAM/SOM, competitive landscape, market gaps

Read the selected business-context reference for its decision boundary and evidence requirements.

**Web search**: Use web search for market research — industry reports, competitor analysis, trend data. Market research benefits from hypothesis context (unlike code analysis).

### 3. User Context Analysis

- **Personas**: Reference existing personas (`docs/product/personas/`) or delegate to recipe-persona for full persona work
- **JTBD**: Identify functional, social, and emotional jobs from VPC Customer Profile
- **Journey Mapping**: Create a journey map using `references/journey-template.md` when sequence or handoff evidence is needed to locate the Opportunity

### 4. Opportunity Identification

Synthesize business and user analysis into Opportunities:

1. Draft Opportunity files using product-principles skill `references/opportunity-template.md`
2. **3+ Solutions Test**: Use the ability to identify meaningfully different Solutions as a diagnostic. If the framing supports fewer than three, report that signal without generating filler alternatives
3. Link Opportunities to Product Outcomes (if vision exists)
4. Assess impact (frequency x severity x breadth)

Present Opportunities to the user for the product-scope decision:
- Opportunity summaries with impact assessment
- Evidence supporting each Opportunity
- 3+ Solutions test results
- Recommended priority order

End the current turn with the Opportunity summaries as the workflow output. Generate hypotheses only for the Opportunities the user confirms in a later turn.

### 5. Hypothesis Generation

For confirmed Opportunities, generate hypotheses:

1. Draft hypothesis files using hypothesis-discipline skill `references/hypothesis-template.md`
2. Assign appropriate level (outcome / opportunity / solution / assumption)
3. Set initial confidence scores (typically 0-2 for new hypotheses)
4. Define a stopping condition; add a time budget or deadline only when it changes the validation decision
5. Suggest validation methods

### 6. File Output

Write the confirmed Opportunities and their decision-relevant hypotheses. Create only the artifacts produced by this discovery:
- Opportunity files in `docs/discovery/opportunities/`
- Hypothesis files in `docs/discovery/hypotheses/`
- Journey maps in `docs/discovery/journeys/` when journey evidence was required

Present the created hypotheses, proposed validation methods or stopping conditions, and recommended priority.

## Sub-agent Usage

| Agent | When | Why (context separation benefit) |
|-------|------|----------------------------------|
| codebase-analyzer | Current implementation can change the Opportunity or persona decision | Objective fact-gathering without hypothesis bias |

## Scope Boundaries

**Included**: Opportunity discovery, hypothesis generation, market research, journey mapping
**Not included**: Hypothesis validation (→ recipe-validate), PRD creation (→ recipe-define), persona deep-dive (→ recipe-persona)

## Completion

The workflow is complete when the confirmed Opportunities and their decision-relevant hypotheses exist, and the user has received the proposed validation methods, stopping conditions, and priority.
