<p align="center">
  <img src="assets/banner.jpg" alt="Nautilus" width="100%" />
</p>

# Nautilus

Turn product questions into evidence-backed PRDs in Cursor or Codex.

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

- [Cursor](https://cursor.com) or [Codex](https://developers.openai.com/codex)
- Node.js for the `npx` installer

Install Nautilus in your project:

```bash
cd your-project
npx nautilus-kit install
```

The default installs shared skills and Cursor agents in the current project. Install for Codex or both clients with:

```bash
npx nautilus-kit install --target codex
npx nautilus-kit install --target all
```

Then invoke a recipe in your client. For example:

```text
Cursor: /recipe-discover Explore why trial users abandon onboarding
Codex:  $recipe-discover Explore why trial users abandon onboarding
```

The recipe frames Opportunities, asks you to confirm the product scope, and then records the confirmed Opportunities and their hypotheses under `docs/discovery/`.

The tables below use Cursor's `/recipe-*` form. In Codex, use the corresponding `$recipe-*` skill name.

Other useful starting points in Cursor:

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
| `/recipe-validate` | Test a hypothesis with a method suited to its primary risk; applicable prototype validation generates a self-contained HTML prototype in a separate agent context |
| `/recipe-prototype-prompt` | Export a Lovable, v0, or similar external-generator prompt instead of generating HTML internally |
| `/recipe-reflect` | Update affected artifacts or distill a reusable learning when validation changes a product decision |
| `/recipe-define` | Turn sufficiently supported hypotheses into a PRD |

Examples:

- For an existing product, `/recipe-discover` can ask the codebase-analyzer to report current behavior before framing an Opportunity.
- For usability testing, run `/recipe-blueprint` only when shared design context is missing, then use `/recipe-validate` to generate the prototype and record the result.
- Use `/recipe-prototype-prompt` when the required artifact is a reusable external-generator prompt rather than the HTML prototype.
- After validation, use `/recipe-reflect` when the result changes an artifact, reveals a repeated pattern, or affects a later decision.

## Where Nautilus Pauses

Nautilus asks for confirmation before recording product scope, strategy, personas, major design choices, PRDs, visual overrides, or promoted learnings.

Validation pauses before it would use external resources, change the product outcome, or exceed an agreed time or cost boundary. Local analysis and reversible validation within the agreed boundary continue without another approval step.

## What It Writes

Recipes create or update only the artifacts needed for the current work:

```text
your-project/
├── .agents/skills/          # Product workflows and shared rules
├── .cursor/agents/          # Cursor separate-context reviewers, analyzers, and prototype generator
├── .codex/agents/           # Codex equivalents with the same prompt bodies
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

Five agents handle work where a fresh context improves the result:

| Agent | Responsibility |
|-------|----------------|
| `doc-reviewer` | Reviews PRDs for unsupported claims, contradictions, missing boundaries, and delivery usability |
| `codebase-analyzer` | Reports relevant facts about the current implementation |
| `hypothesis-verifier` | Designs validation that can disprove a hypothesis and checks material confounders |
| `knowledge-distiller` | Looks across hypothesis evidence for repeated patterns and contradictions |
| `prototype-generator` | Generates an evidence-grounded self-contained HTML prototype without displacing the parent validation context |

The authoring recipe does not treat review findings as commands. It checks the evidence behind each one and returns any change to an approved product decision to you.

### Promote repeated findings into product knowledge

Validation results stay with their hypotheses. Reflection promotes a repeated finding to `docs/product/learnings.md` only when independent evidence supports it. Freshness dates keep older learnings visible for review instead of treating them as permanent facts.

## Connecting to Implementation

Nautilus stops at the PRD. The PRD links the approved outcome and requirements to the evidence and design decisions needed for delivery. From there, use your coding assistant or implementation workflow to design, build, and test the change.

## Installation and Updates

The installer copies shared skills once and installs the native agents selected by `--target cursor|codex|all`. Project installs create `.nautilus-manifest.json`; user installs create `~/.nautilus-kit/manifest.json`. The manifest tracks only files supplied by Nautilus.

Install at user scope:

```bash
npx nautilus-kit install --user                    # Cursor by default
npx nautilus-kit install --target codex --user
npx nautilus-kit install --target all --user
```

User-scoped files are placed at:

| Content | Location |
|---------|----------|
| Shared skills | `~/.agents/skills/` |
| Cursor agents | `~/.cursor/agents/` |
| Codex agents | `${CODEX_HOME:-~/.codex}/agents/` |

To install from a clone instead of `npx`:

```bash
git clone https://github.com/shinpr/nautilus.git /path/to/nautilus
cd /path/to/your-project
node /path/to/nautilus/bin/cli.js install --target all
```

Preview and apply an update:

```bash
npx nautilus-kit update --dry-run
npx nautilus-kit update
```

Without `--target`, update keeps the targets recorded by the installation. Supply `--target` to add or retire a native-agent target:

```bash
npx nautilus-kit update --target all
```

`update` replaces unchanged managed files, adds new packaged files, and preserves local modifications. A conflicting unmanaged destination fails before other files are changed. Files outside the manifest remain untouched. During the one-time migration from a v0.3 manifest, a differing known managed file is copied under `.nautilus-preserved/` before its packaged replacement is installed.

Check the installed version and managed file count:

```bash
npx nautilus-kit status
npx nautilus-kit status --user
```

## License

MIT
