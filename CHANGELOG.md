# Changelog

All notable changes to `TrueTrio` are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.2] - 2026-05-12

### Documentation

- Added a Windows note to the README install section documenting that `npm install -g github:...` may surface a phantom `MODULE_NOT_FOUND` exit-1 on Windows + Node 24 + npm 11 despite the postinstall script running successfully and deploying `SKILL.md`. The note explains how to verify the install via hash comparison and offers the local-tarball install path (`npm pack` + `npm install -g <tgz>`) as a clean-exit alternative.

### Chore

- Added `.commit-msg-*.tmp` and `.release-notes-*.tmp.md` to `.gitignore` to prevent local release-prep scratch files from being committed.
- Removed a stray `.commit-msg-v1.3.1.tmp` that was accidentally committed in the v1.3.1 release.

### Notes

- No skill behavior change. `SKILL.md` content is byte-identical to v1.3.0 and v1.3.1.

[1.3.2]: https://github.com/ojesusmp/TrueTrio/releases/tag/v1.3.2

## [1.3.1] - 2026-05-12

### Changed

- Converted the cross-platform installer from ESM (`install.mjs`) to CommonJS (`install.cjs`) to align with the lifecycle convention used by mature packages with postinstall scripts. This did not eliminate the Windows + Node 24 + npm 11 phantom `MODULE_NOT_FOUND` exit-1 on the `github:` install path; v1.3.2 documents that quirk as a known cosmetic issue.
- `package.json` no longer declares `"type": "module"` since the installer is CommonJS.
- `main`, `postinstall`, `test`, and `files` array all reference `install.cjs`.

### Notes

- No skill behavior change. `SKILL.md` content is byte-identical to v1.3.0.

[1.3.1]: https://github.com/ojesusmp/TrueTrio/releases/tag/v1.3.1

## [1.3.0] - 2026-05-12

### Added

- `.claude-plugin/marketplace.json` registers Trio as a Claude Code plugin. Users can install via `/plugin marketplace add ojesusmp/TrueTrio` followed by `/plugin install trio@truetrio`.
- README documents all three install paths (Claude Code marketplace, git clone, npm) with a per-path `Verify` step.

### Changed

- Moved the cross-platform installer from `bin/install.mjs` to `install.mjs` at the repo root and dropped the unused `truetrio` bin command, simplifying the package shape. This attempted to address the Windows + Node 24 + npm 11 postinstall `MODULE_NOT_FOUND` exit-1 on the `github:` install path; the cosmetic exit-1 persisted and is documented in v1.3.2.
- Updated `package.json` `files` array, `main`, `postinstall`, and `test` script to reference `install.mjs` at the root.

### Notes

- No skill behavior change. `SKILL.md` content is byte-identical. All 14 acceptance criteria still hold.

[1.3.0]: https://github.com/ojesusmp/TrueTrio/releases/tag/v1.3.0

## [1.2.0] - 2026-05-12

### Changed

- Removed personal-name attributions from all user-facing documentation (README, SKILL.md, CONTRIBUTING, CHANGELOG, EXAMPLES, PR/issue templates, package.json). Replaced with generic descriptors of the underlying frameworks (e.g. "the 4 LLM coding Methods" instead of an individual's name; "outside-view discipline" instead of an individual's name; "differential model" instead of a fictional-character reference). This eliminates endorsement-implication and trademark-association risk.
- `--deliberate` mode now referred to as the "3-round differential model" rather than any named individual's method.
- Scout's role description no longer attributes the four pre-flight questions to specific individuals.
- README "Credits" section now lists the frameworks used (Theory of Constraints, Cynefin, OODA, outside-view, reversibility, premortem, interest-vs-position) without naming originators.

### Added

- Pre-release name-audit checklist item in `CONTRIBUTING.md` to prevent future reintroduction of personal-name attributions.

### Notes

- No skill behavior change. `SKILL.md` acceptance criteria (AC1–AC14) still hold.
- Frameworks themselves (Cynefin, OODA loop, Theory of Constraints, MIT License) remain referenced by their public concept names.

[1.2.0]: https://github.com/ojesusmp/TrueTrio/releases/tag/v1.2.0

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

- Marketplace install (`/plugin marketplace add`) is not yet supported. `.claude-plugin/marketplace.json` is intentionally not shipped (Method R2 — not requested). Use the npm install path.

[1.1.0]: https://github.com/ojesusmp/TrueTrio/releases/tag/v1.1.0

## [1.0.0] - 2026-05-11

### Added

- Initial release of the Trio skill (`SKILL.md`).
- Round 0 Scout pre-flight (4 anchor-breaking questions: hidden cost, outside view, reversibility, premortem).
- Three sequential non-overlapping lenses (Observer / Constraint-Finder / Solomon) keyed to 3 Core Questions.
- Default 1-pass mode (≤ 1,000 words output) and `--deliberate` 3-round differential model (≤ 1,700 words).
- `--pass=prompt` / `--pass=solution` modes with auto-detect at 200 characters.
- `--paid` flag for tier-cap violation detection.
- Solomon verdict block with PROCEED / SIMPLIFY / STOP-AND-RECLARIFY verdicts and emit-only `Log entry:` line for optional `.usage.log` tracking.
- 14 acceptance criteria (AC1–AC14).
- ADR documenting design decisions, alternatives killed, and follow-ups.

### Notes

- Skill writes no files; all logging is emit-only via the `Log entry:` line that the operator manually copies if desired.

[1.0.0]: https://github.com/ojesusmp/TrueTrio/releases/tag/v1.0.0
