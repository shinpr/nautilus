# AI Interaction Model Template

## Product: {product-name}

Skip this artifact if the product has no AI-powered features.

### AI Features Inventory

| Feature | User Goal | AI Role | Interaction Pattern | Linked Opportunity |
|---------|----------|---------|--------------------|--------------------|
| {feature} | {goal} | {generate/suggest/assist/automate} | {chat/form/inline/background} | {OPP-NNN} |

### Interaction Pattern Decisions

#### {Feature Name}

**Pattern**: {Chat / Form / Inline Suggestion / Hybrid / Background}

**Rationale**: {why this pattern fits the product and persona}

**UI Placement**: {full-screen / side panel / inline / modal / overlay}

**User Control Model**:
- Input method: {free text / structured form / guided prompts / selection}
- Preview: {real-time / on-submit / staged}
- Edit: {direct manipulation / re-prompt / both}
- Undo: {step-by-step / full reset / version history}

### AI Capability Boundaries

| Capability | Confidence | Constraint | Fallback |
|-----------|-----------|------------|----------|
| {what AI does} | {high/medium/low} | {known limitation} | {what happens when AI fails} |

### Response Display Strategy

| Scenario | Display Method | Rationale |
|----------|---------------|-----------|
| Short response (< 3s) | {spinner / skeleton / instant} | {rationale} |
| Long generation (3-30s) | {streaming / progressive / staged reveal} | {rationale} |
| Very long (> 30s) | {background + notification / chunked delivery} | {rationale} |

### Transparency & Confidence Communication

| Aspect | Decision | Rationale |
|--------|----------|-----------|
| AI disclosure | {label, icon, explanation, none} | {trust or regulatory reason} |
| Confidence indication | {explicit score, visual cue, hedging language, none} | {user expectation} |
| Source attribution | {how AI-generated content is marked} | {ownership clarity} |
| Limitation visibility | {where limitations are communicated} | {error prevention} |

### Error & Edge Case Taxonomy

| Error Type | User Sees | Recovery Action |
|-----------|-----------|----------------|
| Generation failure | {message} | {retry / fallback / manual entry} |
| Inappropriate output | {message} | {regenerate / report / edit} |
| Timeout | {message} | {retry / queue / simplify request} |
| Low confidence output | {message} | {review prompt / accept with warning} |
| Rate limit | {message} | {wait indicator / queue position} |

### Guardrails

| Guardrail | Implementation | User-Visible Behavior |
|-----------|---------------|----------------------|
| Content safety | {moderation layer / output filtering} | {message when triggered} |
| Scope limitation | {prompt constraints / output validation} | {what AI refuses to do} |
| Quality gate | {validation rules / confidence threshold} | {warning or block} |
