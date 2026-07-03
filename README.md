# TrueTrio

> Three-lens simplicity check (with pre-flight Scout) for any prompt or proposed solution. Catches overengineering, missing variables, hidden costs, and false binaries before you commit.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A Claude Code skill that runs a 4-actor analytical pipeline on any input — a typed prompt, a proposed solution, a decision you are about to make:

- **Scout (pre-flight, always-on)** — 4 anchor-breaking questions: what am I not counting, outside-view base rate, one-way or two-way door, 30-day premortem.
- **Observer (Q1)** — names the real problem under the visible one.
- **Constraint-Finder (Q2)** — names the one bottleneck and flags tier-cap violations.
- **Solomon (Q3)** — synthesizes a verdict: PROCEED / SIMPLIFY / STOP-AND-RECLARIFY, with a smallest testable action and verifiable success criterion.

Backed by the 4 LLM coding Methods, the Line Method 10 steps, and outside-view / reversibility / premortem pre-flight discipline.

Default `/trio <thing>` runs Scout + 1-pass (under 1,000 words output). The `--deliberate` flag runs Scout + 3-round differential model where lenses cross-attack each other's weakest claims with killing tests before Solomon judges (under 1,700 words).

---

## Install

Three independent install paths. Pick the one that fits your workflow.

### 1. Claude Code plugin marketplace

In a Claude Code conversation, run:

```
/plugin marketplace add ojesusmp/TrueTrio
/plugin install trio@truetrio
```

The marketplace metadata at `.claude-plugin/marketplace.json` registers the skill with Claude Code automatically. No file copying required.

**Verify:** open a fresh Claude Code conversation and run `/trio "make app better"`. The output should begin with `Round 0 — Scout pre-flight`.

### 2. Git clone

Use when you want the full repo on disk (for version control, contributing, or pinning to a specific tag).

```bash
git clone https://github.com/ojesusmp/TrueTrio.git
cd TrueTrio
```

Then copy `SKILL.md` into your Claude Code skills directory. Git does not run install scripts — this step is manual.

```bash
# Linux / macOS
mkdir -p ~/.claude/skills/trio
cp SKILL.md ~/.claude/skills/trio/SKILL.md
```

```powershell
# Windows PowerShell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\skills\trio" | Out-Null
Copy-Item .\SKILL.md "$env:USERPROFILE\.claude\skills\trio\SKILL.md"
```

**Update later:** `git pull` then re-run the copy command above.

**Verify:** the deployed `SKILL.md` should be byte-identical to the repo's `SKILL.md`. On Linux/macOS: `sha256sum SKILL.md ~/.claude/skills/trio/SKILL.md` should print matching hashes. On Windows: `(Get-FileHash .\SKILL.md).Hash -eq (Get-FileHash "$env:USERPROFILE\.claude\skills\trio\SKILL.md").Hash` should print `True`.

### 3. npm

Cross-platform, automatic copy via postinstall script.

```bash
npm install -g github:ojesusmp/TrueTrio
```

The postinstall step copies `SKILL.md` into your Claude Code skills directory automatically (`~/.claude/skills/trio/SKILL.md` on every platform — Node's `os.homedir()` resolves the path).

Requires Node.js 18+.

**Update later:** re-run the same command. It fetches the latest `main`, re-runs postinstall, and overwrites the deployed `SKILL.md`.

> **Windows note:** on Windows with Node.js 24 and npm 11, `npm install -g github:...` may print a `MODULE_NOT_FOUND` error and exit with code 1 even when the postinstall script ran successfully and `SKILL.md` was deployed to the correct location. This is a known cosmetic issue in npm's GitHub-install pipeline on that combination, not a real failure. Verify by checking the hash of `~/.claude/skills/trio/SKILL.md` against the repo's `SKILL.md` — if they match, the install worked. If you prefer a clean exit code on Windows, use the git clone path above, or download the tarball and install it directly: `npm pack github:ojesusmp/TrueTrio` then `npm install -g .\truetrio-<version>.tgz`.

**Verify:** the install command prints `[trio install] SHA256: <hash>`. The deployed file should hash to the same value:

```bash
# Linux / macOS
sha256sum ~/.claude/skills/trio/SKILL.md
```

```powershell
# Windows PowerShell
(Get-FileHash "$env:USERPROFILE\.claude\skills\trio\SKILL.md" -Algorithm SHA256).Hash
```

### Final verification (all install paths)

Open a fresh Claude Code conversation. Type:

```
/trio "make app better"
```

The output should begin with `Round 0 — Scout pre-flight` and end with a Solomon verdict of `STOP-AND-RECLARIFY` (because the prompt itself is Cynefin-confused — that is the skill's first acceptance test).

---

## Usage

```text
/trio <prompt or proposed solution>
/trio --pass=prompt <text>
/trio --pass=solution <pasted code or plan>
/trio --paid <text>
/trio --deliberate <high-stakes decision>
```

- **Pass auto-detect** — input under 200 chars defaults to `--pass=prompt`; longer input defaults to `--pass=solution`.
- **`--paid`** — signals paid-tier business context. Constraint-Finder will emit `CONSTRAINT VIOLATION: tier-cap` if your proposed solution depends on a capped or free-tier tool.
- **`--deliberate`** — runs 3 rounds of cross-examination (differential model: hypotheses killed by tests, not negotiated) before Solomon judges. Use on high-stakes decisions (firing, lawsuit, irreversible architecture, big purchase). Costs ~1.6x tokens and ~3x latency vs default 1-pass.

Solomon emits a final `Log entry:` line in the format `<YYYY-MM-DD> | <mode> | <verdict> | followed=?` that you can paste into a `.usage.log` to track whether you actually followed Trio's verdicts over time. The skill itself writes no files.

---

## Why it exists

LLMs silently pick interpretations, overengineer, and offer 15 options when 1 will do. Generic adversarial loops (pitcher / skeptic / judge) work for marketing copy but manufacture friction on routine decisions. Trio replaces always-on adversaries with three sequential non-overlapping lenses keyed to three universal questions:

| Question | Owner |
|---|---|
| Q1 — What is the real problem? | Observer |
| Q2 — What is really blocking it? | Constraint-Finder |
| Q3 — What is the smallest smart move now? | Solomon |

Scout fires before Q1 to break the obvious frame.

The full spec, persona prompts, acceptance criteria, and ADR live in `SKILL.md`.

---

## Verification

Trio ships with a mechanical gate: a quiz whose questions are piped to a model together with the **live** `SKILL.md` (never a pasted copy, so the test can never drift from the rules it tests). Any cheap model works — and the gate must pass identically on at least two tiers when the environment offers two or more (on the single available model if the lineup has collapsed to one), which is what proves Trio reads correctly on every Claude model from the cheapest to the flagship, at any effort level:

```bash
cat SKILL.md test/trio-quiz.txt | claude -p --model haiku
```

Expected answers:

- **(a)** No — empty input short-circuits: emit only `STOP-AND-RECLARIFY — no input to review`; no Scout, no lenses (AC15).
- **(b)** No — that is Trio's own output; emit only the self-invocation refusal: Trio reviews input, not itself (AC16).
- **(c)** No — trivial single-fact input downgrades to 1-pass, first line states the downgrade (AC17).
- **(d)** `--pass=solution` — it carries strictly more context (AC18).
- **(e)** No — exactly ONE constraint from the enum, never two (AC6).
- **(f)** No — Trio is emit-only and writes no file (AC5); self-count per section while composing.
- **(g)** No — Trio is model-agnostic; the environment's accepted aliases are the live source of truth and new/renamed/removed models change nothing in SKILL.md.
- **(h)** No — the Smallest Testable Action must contain a threshold or comparison matching the AC4 regex; "try it and see" fails it.

Any drift from those answers means an edit broke a rule. Re-run on two model tiers after any `SKILL.md` change.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Security

See [SECURITY.md](./SECURITY.md).

## Credits

Built and maintained by **Orlando Molina — TruePointAgents**.

Design draws on a set of established decision-making and problem-reduction frameworks:

- A 4-rule discipline for LLM-assisted coding (think before coding, simplicity first, surgical changes, goal-driven execution).
- Theory of Constraints (find the one bottleneck).
- Cynefin framework (classify the problem type before choosing an approach).
- The OODA loop (observe, orient, decide, act).
- Outside-view discipline (compare against base rates from similar past cases).
- One-way / two-way door reversibility tests.
- Premortem (imagined-failure exercise).
- Interest-vs-position separation in negotiation.

## License

Released under the [MIT License](./LICENSE).
