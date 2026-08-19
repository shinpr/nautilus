<p align="center">
  <img src="assets/banner.jpg" alt="Nautilus" width="100%" />
</p>

# Nautilus

Turn product questions into evidence-backed PRDs in Cursor.

Nautilus installs Agent Skills and review agents in your repository. They help you frame opportunities and test the assumptions that could change a product decision. The resulting evidence stays next to the code when implementation begins.

## What You Can Do

- Frame product opportunities from user feedback, market evidence, or an existing codebase
- Track hypotheses with explicit success, failure, and stopping conditions
- Validate Value, Usability, Feasibility, and Viability risks with evidence proportional to the decision
- Create only the design context needed by a prototype or PRD
- Produce PRDs that carry the relevant evidence, remaining risks, and design decisions
- Review documents and validation plans in a separate context before committing important decisions

Nautilus does not require a fixed sequence. Start with the recipe that matches the decision in front of you, reuse what already exists, and add an artifact only when it helps the current work.

## Quick Start

Requirements:

- [Cursor](https://cursor.com)
- Node.js for the `npx` installer

Install Nautilus in your project:

```bash
cd your-project
npx nautilus-kit install
```

Then invoke a recipe in Cursor chat. For example:

```text
/recipe-discover Explore why trial users abandon onboarding
```

The recipe frames Opportunities, asks you to confirm the product scope, and then records the confirmed Opportunities and their hypotheses under `docs/discovery/`.

Other useful starting points:

```text
/recipe-validate HYPO-001
/recipe-define Create a PRD from the validated onboarding hypotheses
/recipe-vision Reassess our product outcomes
```

## Choose a Recipe

| Command | Use it when you want to |
|---------|-------------------------|
| `/recipe-vision` | Define or revise the product vision, outcomes, North Star Metric, or product-specific design principles |
| `/recipe-persona` | Create or update a persona from research, product evidence, or implemented user roles |
| `/recipe-discover` | Frame Opportunities and generate hypotheses from the evidence available now |
| `/recipe-blueprint` | Add the information architecture, flows, content model, brand direction, or AI interaction decisions needed by a prototype or PRD |
| `/recipe-refine-visuals` | Have a designer refine generated Visual Tokens before prototype testing |
| `/recipe-validate` | Test a hypothesis with a method suited to its primary risk |
| `/recipe-reflect` | Update affected artifacts or distill a reusable learning when validation changes a product decision |
| `/recipe-define` | Turn sufficiently supported hypotheses into a PRD |

Examples:

- For an existing product, `/recipe-discover` can ask the codebase-analyzer to report current behavior before framing an Opportunity.
- For usability testing, run `/recipe-blueprint` only when shared design context is missing, then use `/recipe-validate` to prepare the prototype prompt and record the result.
- After validation, use `/recipe-reflect` when the result changes an artifact, reveals a repeated pattern, or affects a later decision.

## Where Nautilus Pauses

Nautilus asks for confirmation before recording product scope, strategy, personas, major design choices, PRDs, visual overrides, or promoted learnings.

Validation pauses before it would use external resources, change the product outcome, or exceed an agreed time or cost boundary. Local analysis and reversible validation within the agreed boundary continue without another approval step.

## What It Writes

Recipes create or update only the artifacts needed for the current work:

```text
your-project/
├── .agents/skills/          # Product workflows and shared rules
├── .cursor/agents/          # Separate-context reviewers and analyzers
└── docs/
    ├── product/
    │   ├── vision.md
    │   ├── design-principles.md
    │   ├── learnings.md
    │   ├── personas/
    │   └── design/          # IA, flows, content model, brand direction, AI interaction model
    ├── discovery/
    │   ├── opportunities/
    │   ├── hypotheses/
    │   ├── journeys/
    │   ├── prototypes/
    │   └── INDEX.md         # Updated when indexed status or mappings change
    └── prd/                 # PRDs ready for an implementation workflow
```

Not every project needs every directory or file.

## How It Works

### Match the evidence to the stakes

Nautilus tracks confidence separately across Value, Usability, Feasibility, and Viability. A small feature behind a flag needs less proof than a platform migration.

### Load only what the current task needs

Artifacts remain available in the repo, but recipes read only the sources that can change the current task. This keeps prior evidence reachable without loading the entire discovery history.

### Review in a separate context

Four agents handle work where a fresh context improves the result:

| Agent | Responsibility |
|-------|----------------|
| `doc-reviewer` | Reviews PRDs for unsupported claims, contradictions, missing boundaries, and delivery usability |
| `codebase-analyzer` | Reports relevant facts about the current implementation |
| `hypothesis-verifier` | Designs validation that can disprove a hypothesis and checks material confounders |
| `knowledge-distiller` | Looks across hypothesis evidence for repeated patterns and contradictions |

The authoring recipe does not treat review findings as commands. It checks the evidence behind each one and returns any change to an approved product decision to you.

### Promote repeated findings into product knowledge

Validation results stay with their hypotheses. Reflection promotes a repeated finding to `docs/product/learnings.md` only when independent evidence supports it. Freshness dates keep older learnings visible for review instead of treating them as permanent facts.

## Connecting to Implementation

Nautilus stops at the PRD. The PRD links the approved outcome and requirements to the evidence and design decisions needed for delivery. From there, use your coding assistant or implementation workflow to design, build, and test the change.

## Installation and Updates

The installer copies `.agents/skills/` and `.cursor/agents/` into your project and creates `.nautilus-manifest.json` to track files managed by Nautilus. You may want to add the manifest to `.gitignore`.

To install from a clone instead of `npx`:

```bash
git clone https://github.com/shinpr/nautilus.git
cp -r nautilus/.agents your-project/
cp -r nautilus/.cursor your-project/
```

Preview and apply an update:

```bash
npx nautilus-kit update --dry-run
npx nautilus-kit update
```

`update` replaces changed files listed in `.nautilus-manifest.json` and adds new packaged files. Commit or back up edits to managed files before updating. Files outside the manifest are left untouched.

Check the installed version and managed file count:

```bash
npx nautilus-kit status
```

## License

MIT
