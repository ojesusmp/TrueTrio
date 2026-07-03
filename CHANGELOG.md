# Changelog

All notable changes to `TrueTrio` are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 2026-07-02

### Added

- **Model & effort adaptation section** in `SKILL.md`: Trio is explicitly
  model-agnostic and effort-agnostic — it must behave identically on any
  Claude tier (cheapest to flagship) at any reasoning-effort level. The
  environment's accepted aliases are the live source of truth; models added,
  renamed, or removed change nothing in the file. Written against bands, not
  names, per skill-hardener defect class (e).
- **Mechanical gate** (`test/trio-quiz.txt`, shipped in the npm package): 8
  scenario questions piped with the live `SKILL.md` to any model
  (`cat SKILL.md test/trio-quiz.txt | claude -p --model <alias>`); expected
  answers documented in the README's new Verification section. The gate must
  pass identically on at least two model tiers — the cross-tier proof that
  Trio reads correctly on every model.
- `.namecheck.txt` — referenced by CONTRIBUTING.md's pre-release name audit
  since v1.2.0 but never actually committed; now exists, seeded with the
  known scrubbed patterns.
- CONTRIBUTING.md now requires running the gate before any PR touching
  `SKILL.md`, and adding a quiz question for any rule change.

### Hardened (adversarial audit, Phase 4)

Round 1 (independent T3 auditor): 6 confirmed defects, all fixed —

- **Word-cap contradiction**: Prime Directive said 900/1,500 while AC3, the
  Token/word-cap section, and the README said 1,000/1,700, and the
  anti-pattern line declared >900 an AC3 failure that AC3 itself permitted.
  All five spots now agree on 1,000 (1-pass) / 1,700 (--deliberate).
- **Unmapped `complex` Cynefin tag**: a valid enum value satisfied none of
  the three verdict rules, leaving Solomon with a mandated verdict and no
  rule to produce one. `complex` now maps to PROCEED, with the Smallest
  Testable Action explicitly serving as the probe (probe-sense-respond).
- **Wrong operator step ranges**: "1-pass (steps 4–6)" omitted Solomon's
  verdict step, and "deliberate (steps 7–13)" claimed 1-pass's step 7 and
  stopped before 14–15. Now 4–7 and 8–15.
- **AC8 vs AC17 seam** (introduced by the new triviality downgrade): AC8
  demanded round headers from every --deliberate run including downgraded
  ones. AC8 now scopes itself to runs not downgraded by AC17.
- **One-model-lineup seam** (introduced by the new cross-tier proof): "at
  least two tiers" was unsatisfiable when the environment offers one model.
  The rule now degrades to the single available model and restores the
  two-tier requirement when a second exists.
- **README/SKILL cap disagreement**: same root as the first defect; resolved
  by the same rewrite.

Round 2 re-verified all six fixes (all FIXED) and found 4 seam defects, also
fixed: the `complex`→PROCEED fix was negated by the ANDed "known answer path"
clause (the probe is now explicitly that path); AC8's carve-out covered only
AC17 downgrades, not AC15/AC16 short-circuits; the README kept one uncarved
"re-run on two model tiers" absolute; and PROCEED/SIMPLIFY had no precedence
when both qualified (now STOP > SIMPLIFY > PROCEED). Round 3 results are
recorded in the release PR.

### Fixed (skill-hardener Phase 0/1/2 pass)

- **Contradiction:** the Token/word cap section told operators to verify with `(Get-Content out.txt | Measure-Object -Word).Words`, implying output must be written to a file — directly contradicting AC5 ("skill writes no file outside its own `SKILL.md`... emit-only"). Replaced with a self-count instruction that requires no file.
- **Environment fragility:** that same verification command was PowerShell-only with no bash/macOS equivalent, unlike every other verify step in the README. Removed along with the contradiction above (one rewrite fixed both).
- **Contradiction / unenforced anti-pattern:** Anti-patterns forbade `--deliberate` on trivial prompts and forbade recursive self-invocation, but the Operator instructions had no rule enforcing either — an agent following the literal instructions had no way to avoid the exact failures the Anti-patterns section describes. Added an explicit triviality-downgrade rule (step 3) and a self-invocation refusal guard (step 1), plus AC15-AC18 documenting them.
- **Undefined behavior:** empty/near-empty input (e.g. bare `/trio`) had no defined handling; the pipeline would run Scout and all three lenses against nothing. Added a short-circuit guard (step 1, AC15).
- **Undefined behavior:** conflicting `--pass=prompt --pass=solution` flags had no precedence rule. `--pass=solution` now wins (AC18).
- **Trigger-health drift:** the published frontmatter `description` had diverged from (and was looser than) the version already running locally in production — the published copy lacked the "do not auto-fire" guard entirely. Adopted the tighter, already-proven description.

- **Leftover fictional-name reference**: the Round 2 parenthetical still carried the fictional-doctor reference missed by the v1.2.0 scrub — exactly what the (previously missing) `.namecheck.txt` audit exists to catch. Now reads "(differential)".
- **3-way version mismatch** (package.json 1.3.1 / CHANGELOG 1.3.2 / marketplace.json 1.3.0) — all now agree on 1.4.0.
- **CONTRIBUTING.md's 250-line cap** was already violated by the pre-existing 313-line `SKILL.md`; the cap now honestly reads 400 lines.

### Notes

- All findings come from an independent skill-hardener run against this skill (2026-07-02): Phase 0 staleness recon, Phase 1 five-class gap analysis, Phase 2 rewrites, Phase 3 gate build, Phase 6 repo sweep. Gate results per model tier are recorded in the release PR.

## [1.3.2] - 2026-05-12

### Documentation

- Added a Windows note to the README install section documenting that `npm install -g github:...` may surface a phantom `MODULE_NOT_FOUND` exit-1 on Windows + Node 24 + npm 11 despite the postinstall script running successfully and deploying `SKILL.md`. The note explains how to verify the install via hash comparison and offers the local-tarball install path (`npm pack` + `npm install -g <tgz>`) as a clean-exit alternative.

### Chore

- Added `.commit-msg-*.tmp` and `.release-notes-*.tmp.md` to `.gitignore` to prevent local release-prep scratch files from being committed.
- Removed a stray `.commit-msg-v1.3.1.tmp` that was accidentally committed in the v1.3.1 release.

### Notes

- No skill behavior change. `SKILL.md` content is byte-identical to v1.3.0 and v1.3.1.

[1.4.0]: https://github.com/ojesusmp/TrueTrio/releases/tag/v1.4.0
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
