---
name: recipe-prototype-prompt
description: Exports an evidence-grounded prompt for Lovable, v0, or a similar external prototype generator. Use when the desired artifact is a reusable generator prompt rather than an internally generated HTML prototype.
disable-model-invocation: true
metadata:
  opencode/autoinvoke: "false"
---

# Prototype Prompt Export

## Required Skills [LOAD BEFORE EXECUTION]

1. [LOAD IF NOT ACTIVE] `prototype-guide` — prototype quality and external prompt construction
2. [LOAD IF NOT ACTIVE] `design-perspective` — product design decisions, persona context, and accessibility

## Input

Use the hypothesis path and target platform supplied with the explicit skill invocation. If either cannot be inferred unambiguously, ask for the missing value.

## Process

1. Read the target hypothesis and extract the decision under test, scenario, and observable success/failure criteria.
2. Read the loaded `prototype-guide` skill's `references/prototype-quality.md` and acquire only product/design sources that can change the generated prototype or its evaluation.
3. Read the loaded `prototype-guide` skill's `references/prototype-prompt-guide.md` and the selected platform template when one exists.
4. Materialize the decision-relevant product, design, component, and data context in the prompt unless the target generator has verified repository access.
5. Write the machine-executable prompt to `docs/discovery/prototypes/hypo-{id}-{platform}-prompt.md`.

## Output Contract

Return the prompt path, target platform, decision under test, and source paths used. Source paths provide traceability and become generator instructions only when the target has verified access to them. The prompt contains only instructions consumed by the external generator; add a separate guide only when a named human consumer needs information that would degrade the executable prompt.

## Scope Boundary

This recipe does not generate the HTML prototype, execute validation, or update the hypothesis record. Use `recipe-validate` for the context-separated generation and validation lifecycle.

## Completion

The workflow is complete when `docs/discovery/prototypes/hypo-{id}-{platform}-prompt.md` exists at the reported path and its content carries the applicable prototype quality criteria and decision-relevant product context.
