---
name: prototype-guide
description: Defines evidence-grounded prototype quality and external-generator prompt construction. Use when generating or evaluating a prototype, or exporting a prompt for Lovable, v0, or a similar tool.
---

# Prototype Guide

## Purpose

A prototype makes one product decision observable before delivery. Apply product evidence and design decisions that affect that observation; leave unrelated implementation choices to the generator.

## Required Context

Start from:

1. the hypothesis and its success/failure criteria;
2. the persona and scenario when they change behavior or evaluation;
3. the product and design sources selected by `references/prototype-quality.md`.

Classify a missing input as blocking only when it controls the tested flow or interpretation. Name the missing decision and the evidence that would resolve it.

## Shared Prototype Contract

- Focus on one validation decision. Combine hypotheses only when the same interaction and evidence resolve them together.
- Make the critical flow, consequences, and relevant recovery behavior observable.
- Use domain-realistic content and data rather than generic placeholders.
- Apply the highest-priority available design source instead of re-inferring existing decisions.
- Classify Loading, Empty, Error, Partial, and Success as `required` or `not_applicable`. Implement the states that can occur and affect the validation decision; record a reason for every `not_applicable` state.
- Keep the visible UI product-native; carry test setup and evaluation evidence in the completion report.
- Preserve the artifacts needed to evaluate, reproduce, or reuse the result.

## Reference Routing

- WHEN generating or evaluating a prototype artifact: read `references/prototype-quality.md` and apply every applicable criterion.
- WHEN exporting a prompt for an external generator: also read `references/prototype-prompt-guide.md` and the selected platform template.
- WHEN product-specific usability, persona, state, or accessibility decisions are needed: load `design-perspective`.

## Scope Boundary

This skill owns prototype quality and prompt construction. `recipe-validate` owns the validation lifecycle and hypothesis record. `recipe-prototype-prompt` owns explicit external prompt export. The prototype generator owns the HTML artifact.
