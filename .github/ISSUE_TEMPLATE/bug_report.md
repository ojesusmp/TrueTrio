---
name: Bug report
about: Report a defect, unexpected verdict, AC violation, or formatting break
title: "[bug] "
labels: ["bug"]
assignees: []
---

## Summary

One sentence describing what went wrong.

## Reproduction

What command did you run?

```text
/trio <paste the exact input here>
```

If using flags: `--pass=prompt | --pass=solution | --paid | --deliberate`.

## Expected behavior

What did you expect Trio to emit? Be specific about which acceptance criterion you believe was violated:

- AC1 — vague prompt → `STOP-AND-RECLARIFY` with `Cynefin tag: confused`
- AC2 — `--paid` flag + capped-tier solution → `CONSTRAINT VIOLATION: tier-cap`
- AC3 — output ≤ 1,000 words (1-pass) or ≤ 1,700 words (`--deliberate`)
- AC4 — Smallest Testable Action contains a binary or numeric pass/fail threshold
- AC5 — skill writes no file outside its own `SKILL.md`
- AC6 — Constraint-Finder names exactly one constraint from the fixed enum
- AC7 — Observer ↔ Constraint-Finder conflict → `Disagreement:` line present
- AC8 — `--deliberate` emits three round headers and Solomon cites R2 or R3 in `Why:`
- AC9 — every R2 attack contains a killing test matching the AC4 regex
- AC10 — every run emits `Round 0 — Scout pre-flight` header before any lens output
- AC11 — Scout output contains exactly four numbered answers
- AC12 — Scout `Door:` line is one of `one-way | two-way | mixed`
- AC13 — Scout proposes no solution, names no constraint, renders no verdict
- AC14 — Solomon emits exactly one `Log entry:` line in the required format

## Actual behavior

Paste the full Trio output (or the broken section). Use a code fence so formatting survives.

```text

```

## Environment

- Trio version: (see CHANGELOG.md, e.g. `1.0.0`)
- Claude Code version: 
- Operating system: 
- Pass mode used: `auto | prompt | solution`
- Deliberate flag: `yes | no`

## Additional context

Anything else that helps locate the defect.
