---
name: recipe-reflect
description: Orchestrate structured reflection — update target artifacts with learnings, distill knowledge across hypotheses, and maintain INDEX.md
disable-model-invocation: true
---

**Context**: Drive the feedback loop by reflecting on outcomes, updating target artifacts, and distilling learnings across the knowledge pyramid (see product-principles skill for Tier definitions).

## Orchestrator Definition

**Execution Protocol**:
1. **Delegate distillation** to knowledge-distiller for unbiased pattern extraction
2. **Follow the reflection flow** defined below
3. **Stop at every `[STOP — BLOCKING]` marker** — present findings and CANNOT proceed until user explicitly confirms

## Workflow Overview

```
Input (reflection trigger — hypothesis concluded, Opportunity review, or periodic)
    ↓
1. Scope Assessment → Determine reflection level (hypothesis / Opportunity / Vision)
    ↓
2. Result Recording → Update target artifacts with outcomes
    ↓
3. Knowledge Distillation → knowledge-distiller extracts patterns [Stop: Distillation review]
    ↓
4. Knowledge Promotion → Tier 2 → Tier 1 if criteria met
    ↓
5. Index Update → Update INDEX.md
    ↓
Output: Updated artifacts + learnings + INDEX.md
```

## Execution Decision Flow

### 1. Scope Assessment

Input: $ARGUMENTS

**Determine the reflection level** (see `references/reflection-guide.md`):

| Trigger | Level | Target Files |
|---------|-------|-------------|
| Hypothesis concluded | Level 1: Hypothesis | The hypothesis file |
| Multiple hypotheses concluded under an Opportunity | Level 2: Opportunity | Opportunity file (Tier 2 Learnings section) |
| PRD delivered, quarterly review, strategic pivot | Level 3: Vision | `docs/product/vision.md`, `docs/product/learnings.md` |

### 2. Result Recording

#### Level 1: Hypothesis Reflection
1. Verify the hypothesis file has been updated with results (validation results, confidence scores, evidence)
2. Document learnings: What did we learn regardless of outcome?
3. Check if this result changes understanding of the parent Opportunity

#### Level 2: Opportunity Reflection
1. Gather all hypotheses under the target Opportunity
2. Prepare context for knowledge-distiller (hypothesis summaries, results, confidence changes)

#### Level 3: Vision Reflection
1. Gather cross-Opportunity data
2. Review Product Outcomes — are targets still correct?
3. Review NSM — still the right connecting metric?
4. Prepare context for knowledge-distiller

### 3. Knowledge Distillation

**Invoke knowledge-distiller** for pattern extraction:
- knowledge-distiller operates in a separate context to avoid individual hypothesis bias
- It analyzes multiple hypotheses to find patterns, contradictions, and trends
- It proposes Tier 2 learnings (for Opportunity) or Tier 1 promotions (for Vision)
- It enforces distillation quality criteria (see product-principles skill for definitions)

**[STOP — BLOCKING]** Present distillation results to user for review:
- Extracted patterns and trends
- Proposed learnings (Tier 2 or Tier 1)
- Contradictions found (these become priority Discovery targets)
- Tier promotion proposals with supporting evidence

**CANNOT write learnings or promote Tiers until user explicitly confirms.**

### 4. Knowledge Promotion

After user approval:

#### Tier 3 → Tier 2
- Write learnings to the Opportunity file's "Tier 2 Learnings" section
- Include hypothesis references that support each learning

#### Tier 2 → Tier 1
- Write to `docs/product/learnings.md`
- Include freshness tag (`last-validated: YYYY-MM-DD`)
- Include supporting hypothesis references (3+ required)
- Include cross-segment evidence

### 5. Index Update

Update `docs/discovery/INDEX.md` with:
- Hypothesis status summary (counts by status)
- Opportunity-to-hypothesis mapping
- Recent validation results
- Tier 1 learning changes (if any)
- Last updated timestamp

## Sub-agent Usage

| Agent | When | Why (context separation benefit) |
|-------|------|----------------------------------|
| knowledge-distiller | Level 2 and Level 3 reflection | Unbiased pattern extraction across individual hypotheses |

## Scope Boundaries

**Included**: Result recording, knowledge distillation, Tier promotion, INDEX.md maintenance
**Not included**: Hypothesis validation (→ recipe-validate), new hypothesis generation (→ recipe-discover)

## Completion Criteria

- [ ] Reflection level determined
- [ ] Target artifacts updated with results
- [ ] knowledge-distiller invoked for pattern extraction (Level 2+)
- [ ] User reviewed distillation proposals
- [ ] Tier promotions applied (if approved)
- [ ] `docs/discovery/INDEX.md` updated
- [ ] Freshness tags current on modified learnings
