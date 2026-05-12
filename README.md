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

One command. Works on Linux, macOS, and Windows. No manual file copying.

```bash
npm install -g github:ojesusmp/TrueTrio
```

The package's postinstall step copies `SKILL.md` into your Claude Code skills directory automatically (`~/.claude/skills/trio/SKILL.md` on every platform — Node's `os.homedir()` resolves to the correct path).

Requires Node.js 18+.

### Update

Re-run the same command. It pulls the latest `main`, re-runs postinstall, and overwrites the deployed `SKILL.md`.

```bash
npm install -g github:ojesusmp/TrueTrio
```

### Manual re-install / repair

After installation, the package exposes a `truetrio` command. Run it any time to re-copy `SKILL.md` from the installed package back into your skills directory (useful if the skills file was deleted, edited, or corrupted):

```bash
truetrio
```

### Verify

Open a fresh Claude Code conversation. Type:

```
/trio "make my app better"
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
