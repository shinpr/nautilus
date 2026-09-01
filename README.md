<p align="center">
  <img src="assets/banner.jpg" alt="Nautilus" width="100%" />
</p>

# Nautilus

Turn product questions into testable hypotheses, working prototypes, and evidence-backed PRDs in Cursor, Codex, or OpenCode.

Nautilus keeps discovery work in your repository, where later sessions can reuse what earlier ones learned. Start with a rough question or whatever evidence already exists, including the codebase itself. Run only the workflow you need. Nautilus adds only what the current question requires. The resulting evidence and decisions are still there when you validate, write the PRD, or start implementation.

## What You Can Do

- Turn rough questions and existing evidence into focused opportunities and hypotheses
- Test assumptions about customer value, usability, technical feasibility, and business viability
- Generate a self-contained HTML prototype grounded in your product context
- Turn validated work into a PRD without losing the evidence and open risks behind it

## Quick Start

You need Node.js and [Cursor](https://cursor.com), [Codex](https://developers.openai.com/codex), or [OpenCode](https://opencode.ai).

From your project directory, install Nautilus for the client you use:

| Client | Install command |
|--------|-----------------|
| Cursor | `npx nautilus-kit install --target cursor` |
| Codex | `npx nautilus-kit install --target codex` |
| OpenCode | `npx nautilus-kit install --target opencode` |
| All three | `npx nautilus-kit install --target all` |

`npx nautilus-kit install` is shorthand for the Cursor installation. Open a new session in the selected client after installation.

Then start with a plain request:

| Goal | Cursor | Codex | OpenCode |
|------|--------|-------|----------|
| Explore a product problem | `/recipe-discover Explore why trial users abandon onboarding` | `$recipe-discover Explore why trial users abandon onboarding` | `/recipe-discover Explore why trial users abandon onboarding` |
| Generate a prototype | `/recipe-validate Make a prototype for HYPO-001` | `$recipe-validate Make a prototype for HYPO-001` | `/recipe-validate Make a prototype for HYPO-001` |
| Create a PRD | `/recipe-define Create a PRD from the validated onboarding hypotheses` | `$recipe-define Create a PRD from the validated onboarding hypotheses` | `/recipe-define Create a PRD from the validated onboarding hypotheses` |

Cursor and OpenCode invoke recipes with `/recipe-*`; Codex uses the same recipe name with `$recipe-*`.

## Recipes

Recipes are independent workflows. Run one when you need it, or combine them as the work progresses.

| Recipe | Use it to |
|--------|-----------|
| `recipe-vision` | Define or revise the product vision, outcomes, success measures, or product-specific design principles |
| `recipe-persona` | Create or update a persona from research, product evidence, or implemented user roles |
| `recipe-discover` | Frame opportunities and generate hypotheses from the evidence available now |
| `recipe-blueprint` | Define the structure, key flows, content, visual direction, or AI interactions needed by a prototype or PRD |
| `recipe-refine-visuals` | Refine colors, typography, spacing, and other visual direction before prototype testing |
| `recipe-validate` | Choose an appropriate validation method, generate a prototype when needed, and record the resulting evidence |
| `recipe-prototype-prompt` | Export a prompt for Lovable, v0, or a similar external prototype generator |
| `recipe-reflect` | Update affected product artifacts or preserve a reusable learning after validation |
| `recipe-define` | Turn sufficiently supported hypotheses into a PRD |

## Prototype Generation

For usability testing, `recipe-validate` calls a dedicated subagent to build a self-contained HTML prototype in `docs/discovery/prototypes/`. It uses the hypothesis, persona, design decisions, and existing UI, so the prototype stays focused on what you need to test.

If you need to hand the work off to Lovable, v0, or another external generator, `recipe-prototype-prompt` writes the prompt instead.

## What Stays in the Repository

Each recipe reads what already exists and adds only the files needed for the current work. Later sessions and implementation work can use the same record:

```text
docs/
├── product/       # Vision, personas, design decisions, and reusable learnings
├── discovery/     # Opportunities, hypotheses, journeys, evidence, and prototypes
└── prd/           # Product requirements ready for implementation
```

Validation results stay with their hypotheses. PRDs link back to the opportunities, hypotheses, prototypes, and product decisions they rely on.

Local, reversible work continues without repeated approval. Nautilus asks before recording product scope, strategy, major design choices, or a PRD.

## Installation and Updates

### Project installation

Use the commands in [Quick Start](#quick-start) to install Nautilus in the current project.

### User installation

Use `--user` to make Nautilus available across projects:

```bash
npx nautilus-kit install --target cursor --user
npx nautilus-kit install --target codex --user
npx nautilus-kit install --target opencode --user
npx nautilus-kit install --target all --user
```

User-scoped skills are installed once in `~/.agents/skills/`. Cursor agents go to `~/.cursor/agents/`, Codex agents to `${CODEX_HOME:-~/.codex}/agents/`, and OpenCode agents to `~/.config/opencode/agents/`.

### Updates

Nautilus remembers which clients you installed, so the same update command works for any target:

```bash
npx nautilus-kit update --dry-run
npx nautilus-kit update
```

For a user installation, add `--user`. To change the installed clients during an update, specify the target:

```bash
npx nautilus-kit update --target cursor
npx nautilus-kit update --target codex
npx nautilus-kit update --target opencode
npx nautilus-kit update --target all
```

Updates add new managed files and replace unchanged managed files while preserving local modifications and unrelated files.

Open a new session in the selected client after updating so it loads the new workflows and agents.

Check the installed version and selected clients with:

```bash
npx nautilus-kit status
npx nautilus-kit status --user
```

## License

MIT
