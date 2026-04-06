# Brand Direction Template

## Product: {product-name}

### Design Vision

{1-2 sentences from `docs/product/vision.md` describing how the product should feel}

### Tone & Voice

| Dimension | Position | Rationale (design principle) |
|-----------|----------|------------------------------|
| Formal ↔ Casual | {position} | {which principle drives this} |
| Serious ↔ Playful | {position} | {which principle drives this} |
| Expert ↔ Approachable | {position} | {which principle drives this} |
| Technical ↔ Plain | {position} | {which principle drives this} |

### Color Direction

| Role | Intention | Reference | Traced To |
|------|-----------|-----------|-----------|
| Primary | {meaning} | {color family or reference} | {design principle} |
| Surface | {background feel} | {warm/cool/neutral} | {design principle} |
| Accent | {emphasis} | {color family or reference} | {design principle} |
| Success | {positive feedback} | {color family} | Standard |
| Error | {negative feedback} | {color family} | Standard |

### Typography Direction

| Role | Intention | Reference |
|------|-----------|-----------|
| Heading | {personality, weight} | {font family or style reference} |
| Body | {readability, density} | {font family or style reference} |
| UI / Label | {clarity, compactness} | {font family or style reference} |

**Language consideration**: {language and implications for font selection}

### Motion Tendency

| Dimension | Direction | Rationale |
|-----------|-----------|-----------|
| Transitions | {none / subtle fade / spring animations} | {tone alignment} |
| Micro-interactions | {none / hover only / expressive} | {persona or device context} |
| Loading states | {spinner / skeleton / progressive reveal} | {perceived performance priority} |

### Visual Density

| Dimension | Direction | Rationale |
|-----------|-----------|-----------|
| Whitespace | {generous / moderate / compact} | {persona context} |
| Information density | {sparse / balanced / dense} | {persona expertise} |
| Card / Surface elevation | {flat / subtle / layered} | {design principle} |

### Reference Products

| Product | What to Reference | What to Avoid |
|---------|------------------|---------------|
| {product} | {specific aspect} | {specific aspect} |

### Visual Tokens

Concrete values derived from the direction above. These are for prototype consistency and AI-readable handoff, not final production tokens.

**Source**: {`auto-derived` | `expert-refined`}

#### Color Tokens

| Token | Value | Derived From |
|-------|-------|-------------|
| `--color-primary` | {hex} | Color Direction → Primary |
| `--color-primary-hover` | {hex} | Primary darkened 10% |
| `--color-surface` | {hex} | Color Direction → Surface |
| `--color-surface-elevated` | {hex} | Surface adjusted for elevation |
| `--color-accent` | {hex} | Color Direction → Accent |
| `--color-text` | {hex} | Contrast against surface |
| `--color-text-secondary` | {hex} | Reduced emphasis text |
| `--color-success` | {hex} | Color Direction → Success |
| `--color-error` | {hex} | Color Direction → Error |
| `--color-border` | {hex} | Surface-derived border color |

#### Typography Tokens

| Token | Value | Derived From |
|-------|-------|-------------|
| `--font-heading` | {font family} | Typography Direction → Heading |
| `--font-body` | {font family} | Typography Direction → Body |
| `--font-ui` | {font family} | Typography Direction → UI / Label |
| `--font-size-base` | {px/rem} | Visual Density → Information density |
| `--font-weight-normal` | {weight} | Body readability |
| `--font-weight-bold` | {weight} | Heading emphasis |
| `--line-height-body` | {ratio} | Body readability |

#### Spacing Tokens

| Token | Value | Derived From |
|-------|-------|-------------|
| `--space-unit` | {px} | Visual Density → Whitespace |
| `--space-xs` | {px} | unit × 0.5 |
| `--space-sm` | {px} | unit × 1 |
| `--space-md` | {px} | unit × 2 |
| `--space-lg` | {px} | unit × 3 |
| `--space-xl` | {px} | unit × 5 |
| `--radius-sm` | {px} | Surface elevation |
| `--radius-md` | {px} | Surface elevation |
| `--shadow-sm` | {value} | Card elevation |
| `--shadow-md` | {value} | Card elevation |

### Brand Direction Decisions Log

| Decision | Options Considered | Chosen | Rationale |
|----------|-------------------|--------|-----------|
| {decision} | {options} | {chosen} | {rationale} |
