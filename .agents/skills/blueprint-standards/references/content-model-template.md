# Content Model Template

## Product: {product-name}

### Entity Overview

| Entity | Description | Created By | Visible To | Linked Opportunity |
|--------|-------------|-----------|------------|-------------------|
| {entity} | {what it represents} | {persona/system} | {who sees it} | {OPP-NNN} |

### Entity Definitions

#### {Entity Name}

**Purpose**: {why this entity exists}

**Attributes**:

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| {name} | {text/number/date/enum/reference} | {yes/no} | {what it represents} |

**Relationships**:

| Related Entity | Relationship | Cardinality | Description |
|---------------|-------------|-------------|-------------|
| {entity} | {has-many/belongs-to/has-one} | {1:N/N:M/1:1} | {context} |

**States**:

| State | Meaning | Transitions To | Trigger |
|-------|---------|---------------|---------|
| {state} | {description} | {next states} | {trigger} |

### Display Contexts

| Entity | List View | Detail View | Creation | Embedded In |
|--------|----------|------------|----------|-------------|
| {entity} | {page} | {page} | {page/flow} | {other entity's detail} |
