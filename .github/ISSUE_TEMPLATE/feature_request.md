---
name: Feature request
about: Propose a change to a lens, the Scout pre-flight, the verdict block, or the workflow
title: "[feature] "
labels: ["enhancement"]
assignees: []
---

## User problem

Describe the underlying problem first. What were you trying to decide? What did Trio give you that did not help? Do not start with the proposed solution.

## Proposed change

What should Trio do instead? Which actor would this change touch?

- [ ] Scout (Round 0 pre-flight)
- [ ] Observer (Lens 1, Q1)
- [ ] Constraint-Finder (Lens 2, Q2)
- [ ] Solomon (Lens 3, Q3)
- [ ] Verdict block format
- [ ] Workflow / mode selection (`--pass`, `--paid`, `--deliberate`)
- [ ] Token cap
- [ ] Acceptance criteria

## Karpathy R2 justification

The project's primary discipline is "no flexibility or configurability that was not requested." Briefly justify why this change is load-bearing rather than speculative:

- What real decision did Trio mis-handle that motivates this change?
- Why can existing flags / modes not cover the case?
- What would the minimum surface-area implementation look like?

## Non-overlap check

Trio's actors own non-overlapping slices of Karpathy + Line Method. Does this change preserve that?

- Will it cause Scout, Observer, Constraint-Finder, or Solomon to duplicate another actor's output?
- Will it require an actor to produce something currently outside its job?

If yes to either, redesign to keep boundaries clean.

## Acceptance criteria for the new behavior

Propose at least one testable AC (binary or numeric pass/fail) that would prove the change works.

## Alternatives considered

List the cheaper variants you ruled out and why.
