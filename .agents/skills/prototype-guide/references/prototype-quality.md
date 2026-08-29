# Prototype Quality Criteria

Apply these criteria to generated artifacts and to prompts that delegate their generation. A criterion changes implementation or evaluation; it is not explanatory design theory.

## Source Acquisition

Select the first applicable source that has authority over the current prototype decision:

| Priority | Source | Use |
|---|---|---|
| 1 | Approved target-state decisions in `docs/product/design/` | Apply information architecture, flows, content model, brand direction, Visual Tokens, and AI interaction decisions for the behavior being changed or tested |
| 2 | Existing product UI and in-repository components | Preserve established interaction, density, vocabulary, and component behavior for decisions the approved target state does not replace |
| 3 | Product evidence in `docs/product/` and `docs/discovery/` | Ground entry context, task, content, and trade-offs in the hypothesis, persona, journey, vision, and design principles |
| 4 | Authoritative platform guidance | Resolve a platform convention or accessibility requirement that repository sources do not determine |
| 5 | Current domain references | Resolve a domain convention that can change interpretation; record the decision informed by each external source |

An approved target-state decision governs the behavior it changes; the current UI supplies continuity for unaffected or undecided behavior. External research is required only when a missing convention can change the tested interaction or its evaluation. General inspiration does not override a higher-priority product source.

## Judgment Criteria

| Criterion | Apply | Failure condition | Required response |
|---|---|---|---|
| **Validation Observability** | Trace the hypothesis success and failure criteria to visible actions, states, and consequences | A tester can complete the UI without observing evidence that distinguishes success from failure | Add or revise only the interaction needed to expose the decision |
| **Evidence-grounded Entry** | Derive the first screen and existing records from the scenario, persona, and prior-use evidence | The prototype invents onboarding, history, collaboration, or populated data that changes interpretation | Replace the invented context with the supported entry state or report the missing decision |
| **Product-native UI** | Use domain vocabulary, realistic entities, and controls a real user would encounter | The UI falls back to generic marketing copy, arbitrary dashboard cards, or visible test controls | Replace generic structure with the domain task and keep evaluation controls in the report |
| **Source Fidelity** | Apply one primary design source and trace non-trivial overrides | Competing design sources are blended without precedence or an approved decision is silently replaced | Use the highest-priority source and record any gap-filling decision |
| **Interaction and State Reachability** | Give each state needed for evaluation a reproducible trigger; record an exclusion only when its absence could change interpretation | A state needed for evaluation cannot be reached, or an unexplained exclusion obscures the decision | Implement the trigger or explain the decision-relevant exclusion |
| **Hierarchy and Affordance** | Render the entry viewport and identify the primary information and action from placement, emphasis, and control behavior | Competing actions have equal priority without a product reason, or explanatory text outside the UI is needed | Revise hierarchy or affordance and render again |
| **Content Fidelity** | Use concrete copy and mock data whose shape and edge cases match the content model and scenario | Placeholders or unrealistic data make layout, comprehension, or recovery easier than the real task | Replace them with decision-relevant domain content |
| **Accessibility** | Exercise keyboard operation, visible focus, semantic names/roles, and WCAG 2.2 AA contrast | A required interaction is unavailable by keyboard or its purpose/state is not perceivable | Correct the interaction before completion |
| **Responsive Integrity** | Check the target viewports used by the scenario; use 390×844 and 1440×900 when no viewport evidence exists | Content overlaps, clips, escapes the viewport, or loses the primary action | Revise layout and check the affected viewport again |
| **Repeatability** | Map test inputs to stable results when the validation compares repeated observations | The same test condition produces a different result without the hypothesis requiring variability | Make mock behavior deterministic and report its input mapping |

## Rendered Verification

When an exposed browser capability can open and render the local artifact:

1. Open the generated artifact at each target viewport.
2. Complete the primary flow and every required state trigger.
3. Inspect hierarchy, focus behavior, overlap, clipping, text wrapping, and recovery.
4. Revise failures and repeat only the affected checks.

Set `visual_verification.status: "passed"` only after those rendered checks run. When no exposed capability can render the local artifact, complete the artifact and return `visual_verification.status: "not_run"` with the unavailable boundary. Static inspection is not evidence of rendered quality.

## Artifact Boundary

- Produce one self-contained HTML file with inline CSS, JavaScript, and mock data.
- Use no build step or runtime network dependency.
- Keep measurement, logging, administrative controls, and evaluation notes outside the visible product UI.
- Write only the requested prototype path; the parent validation workflow owns hypothesis and result records.
