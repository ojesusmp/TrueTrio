# Contributing to TrueTrio

Thanks for your interest in improving `TrueTrio`. This document explains how to propose changes, what the project's design constraints are, and how the maintainer reviews contributions.

## Ways to contribute

- **Bug reports** — open an issue describing the unexpected behavior and a minimal reproduction.
- **Feature requests** — open an issue. Describe the user problem first, then propose a solution.
- **Pull requests** — small, focused, with a manual verification plan.
- **Documentation** — README, CHANGELOG, glossary improvements are always welcome.

## Design constraints (please read before opening a PR)

TrueTrio is intentionally minimal. The skill consists of a single `SKILL.md` file that obeys its own rules:

- **Method R2 — Simplicity First.** No flexibility / configurability not requested. If your change adds a flag, a mode, or an abstraction, justify it against R2 in the PR description.
- **Method R3 — Surgical Changes.** Every changed line must trace directly to the user's request. Do not refactor adjacent prose.
- **No overlap between actors.** Scout names *what is missing*; Observer names *what we are changing*; Constraint-Finder names *what blocks it*; Solomon names *what to do about it*. PRs that blur these boundaries will be asked to re-scope.
- **Hard line cap.** `SKILL.md` must stay under 250 lines and the spec word count under 3,500.
- **Self-test before submission.** Re-run Trio on your own diff using `/trio --pass=solution` and paste the verdict block into your PR description.

## Pull request workflow

1. Fork the repo and create a feature branch from `main`.
2. Make your change. Keep diffs small and focused — one logical change per pull request.
3. Update `CHANGELOG.md` under an `## [Unreleased]` heading describing what you changed.
4. Run Trio on your own diff and paste the verdict.
5. Open a pull request against `main`.
6. Be patient — review may take a few days.

## Coding conventions

- Match the existing prose style in `SKILL.md`. Terse, table-heavy, no filler.
- Use plain ASCII characters unless the file requires Unicode for content reasons.
- Do not add new top-level files unless you are also updating `README.md` to reference them.

## Pre-release name-audit

Before tagging any release, run this check from the repo root. It must return zero matches across all tracked files (excluding `.git/`):

The list of disallowed personal-name patterns lives in `.namecheck.txt` at the repo root. Run this from the repo root before tagging any release:

```bash
git grep -iEf .namecheck.txt -- ':!.namecheck.txt'
```

```powershell
git grep -iEf .namecheck.txt -- ':!.namecheck.txt'
```

The `-- ':!.namecheck.txt'` exclusion prevents the pattern file from matching itself.

If any other tracked file matches, the release is blocked until the offending file is scrubbed. The project policy is to reference frameworks by their concept names (Cynefin, OODA loop, Theory of Constraints, etc.) and not by the names of their originators.

To extend the audit, add a new lowercase pattern (one per line) to `.namecheck.txt`.

## Reporting security issues

Do **not** open a public issue for security-related reports. Follow the process in [SECURITY.md](./SECURITY.md).

## Code of conduct

By participating in this project, you agree to abide by the [Contributor Covenant](./CODE_OF_CONDUCT.md).
