# Information Architecture Template

## Product: {product-name}

### Site Map

```
/ (Root)
├── {page-name} — {role} [{persona}]
│   ├── {sub-page} — {role} [{persona}]
│   └── {sub-page} — {role} [{persona}]
├── {page-name} — {role} [{persona}]
└── ...
```

**Role types**: Landing, Dashboard, Creation, Detail, Transaction, Settings, Discovery

### Labeling & Taxonomy

| Aspect | Decision |
|--------|----------|
| Navigation labels | {user-facing terminology} |
| Content categories | {how content is grouped} |
| Search strategy | {navigation-driven / search-driven / hybrid} |

### Navigation Model

Linear task flows may use step indicators instead of full navigation to avoid premature exits.

| Element | Type | Visible To | Content |
|---------|------|-----------|---------|
| {nav-element} | Global / Contextual / Utility / Step indicator | {roles} | {items} |

### Page Inventory

#### {Page Name}

- **URL pattern**: `/{path}`
- **Purpose**: {what the user accomplishes}
- **Primary persona**: {persona name}
- **Linked Opportunity**: {OPP-NNN or supporting function}
- **Key content**: {displayed or manipulated data}
- **Entry points**: {navigation, link, redirect}
- **Exit points**: {where users go next}
