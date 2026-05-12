## Summary

One sentence: what changes and why.

## Linked issue

Closes #

## Type of change

- [ ] Bug fix (non-breaking change that fixes a defect)
- [ ] New feature (non-breaking change that adds capability)
- [ ] Breaking change (alters existing actor outputs, verdict format, or acceptance criteria)
- [ ] Documentation only
- [ ] Refactor (no behavior change)

## Karpathy discipline checklist

- [ ] **R1 — Think Before Coding.** Assumptions surfaced in the PR description. If interpretations were ambiguous, both were named.
- [ ] **R2 — Simplicity First.** Diff is the minimum that solves the user problem. No speculative flexibility added.
- [ ] **R3 — Surgical Changes.** Every changed line traces directly to the linked issue. Adjacent style / comments / formatting were not modified.
- [ ] **R4 — Goal-Driven Execution.** Acceptance criterion stated below and verified before submitting.

## Non-overlap verification

If this PR touches an actor (Scout, Observer, Constraint-Finder, Solomon):

- [ ] No actor's output now duplicates another's.
- [ ] Each actor still answers only its assigned Core Question.
- [ ] Verdict-block changes (if any) are reflected in `SKILL.md` Hard rules.

## Self-test

Run Trio on your own diff and paste the verdict block here.

```text
Controlling Question: ...
Smallest Testable Action: ...
Verifiable Success Criterion: ...
Verdict: ...
Why: ...
Log entry: ...
```

## Files changed

- [ ] `SKILL.md` — describe the section
- [ ] `README.md`
- [ ] `CHANGELOG.md` updated under `## [Unreleased]`
- [ ] Other:

## Manual verification plan

Steps a reviewer can run locally to confirm the change works.

1. 
2. 
3. 

## Backwards compatibility

Does this change alter any existing acceptance criterion?

- [ ] No
- [ ] Yes — list which AC and the migration path:
