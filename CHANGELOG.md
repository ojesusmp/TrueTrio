# Changelog

All notable changes to `TrueTrio` are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-05-12

### Added

- `package.json` and `bin/install.mjs` cross-platform postinstall script. `npm install -g github:ojesusmp/TrueTrio` now installs the skill on Linux, macOS, and Windows with one command. SKILL.md is copied to `~/.claude/skills/trio/SKILL.md` using Node's `os.homedir()` for cross-platform path resolution.
- `truetrio` bin command for manual re-install / repair without re-running `npm install`.
- Source-checkout guard (`.git` detection) prevents postinstall from clobbering a developer's working tree; bypass with `--force` for local testing.
- SHA256 hash verification after copy.
- `--dry-run` mode for inspecting the planned source and target paths without writing.

### Changed

- README install section reduced from manual `cp` / `Copy-Item` instructions to a single `npm install -g github:ojesusmp/TrueTrio` command. Removed Windows-specific and Linux-specific copy steps.

### Notes

- Marketplace install (`/plugin marketplace add`) is not yet supported. `.claude-plugin/marketplace.json` is intentionally not shipped (Karpathy R2 — not requested). Use the npm install path.

[1.1.0]: https://github.com/ojesusmp/TrueTrio/releases/tag/v1.1.0

## [1.0.0] - 2026-05-11

### Added

- Initial release of the Trio skill (`SKILL.md`).
- Round 0 Scout pre-flight (4 anchor-breaking questions: hidden cost, outside view, reversibility, premortem).
- Three sequential non-overlapping lenses (Observer / Constraint-Finder / Solomon) keyed to 3 Core Questions.
- Default 1-pass mode (≤ 1,000 words output) and `--deliberate` 3-round House-model differential (≤ 1,700 words).
- `--pass=prompt` / `--pass=solution` modes with auto-detect at 200 characters.
- `--paid` flag for tier-cap violation detection.
- Solomon verdict block with PROCEED / SIMPLIFY / STOP-AND-RECLARIFY verdicts and emit-only `Log entry:` line for optional `.usage.log` tracking.
- 14 acceptance criteria (AC1–AC14).
- ADR documenting design decisions, alternatives killed, and follow-ups.

### Notes

- Skill writes no files; all logging is emit-only via the `Log entry:` line that the operator manually copies if desired.

[1.0.0]: https://github.com/ojesusmp/TrueTrio/releases/tag/v1.0.0
