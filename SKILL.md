---
name: trio
description: "Three-lens simplicity check with pre-flight Scout for any prompt or proposed solution. Scout opens with 4 anchor-breaking questions (hidden cost, outside view, reversibility, premortem). Then each lens answers one of the 3 Core Questions — Observer: 'what are we changing?' (Q1) — Constraint-Finder: 'what is really blocking it?' (Q2) — Solomon: 'what is the smallest smart move now, and how will we know it worked?' (Q3). Backed by Karpathy's 4 LLM rules + Line Method 10 steps + Kahneman/Bezos/Klein pre-flight discipline. Default = Scout + 1-pass forward sweep. `--deliberate` flag runs Scout + 3-round House-model differential: lenses cross-attack weakest claims and propose killing tests before Solomon judges. Constraint-Finder flags tier-cap violations for paid-context users. Solomon emits PROCEED / SIMPLIFY / STOP-AND-RECLARIFY verdict. Output capped at 1,000 words (1-pass) or 1,700 words (--deliberate). Use when a request looks vague, when a Claude-proposed solution offers many options, when you suspect overengineering, or when paid-tier business context must reject free-tier capped tools."
aliases: [trio, simplicity-trio, line-method, karpathy-check]
argument-hint: "<prompt or proposed solution to review> [--pass=prompt|solution] [--paid] [--deliberate]"
level: 2
---

# Trio — Three-Lens Simplicity Check

## Why this exists

LLMs silently pick interpretations, overengineer, and offer 15 options when 1 will do. Marketing Council's adversarial loop works for marketing assets but manufactures friction unnecessary for general decisions. Trio replaces adversaries with three sequential lenses that share one goal: factual simplicity. Each lens owns a non-overlapping slice of Karpathy's 4 LLM coding guidelines and the Line Method's 10 simplification steps. Solomon synthesizes — no rubber-stamp, no theater.

## Prime Directive

**Trio succeeds when the operator reads the verdict and knows the simplest true next step — in under 900 words (1-pass) or 1,500 words (--deliberate).** Fails when output exceeds the cap, when lenses repeat each other's work, when Solomon ratifies the input without applying step 8 (false-binary resolution), or when Constraint-Finder names zero or more than one constraint.

---

## The 3 Core Questions (the spine)

Every Trio run answers these in order. Each lens owns one.

1. **What exactly are we trying to change, and how will we know it is solved?** → Observer names *what*; Solomon names *how known*.
2. **What is the real cause or constraint keeping it from being solved?** → Constraint-Finder.
3. **What is the smallest evidence-based action we can take now, and what will we learn from it?** → Solomon.

Short form:

```
Q1 — What is the real problem?           [Observer + Solomon-criterion]
Q2 — What is really blocking it?         [Constraint-Finder]
Q3 — What is the smallest smart move?    [Solomon]
```

Failure modes the 3 questions prevent:

| Failure | Question that fixes it |
| --- | --- |
| Solving the wrong problem | Q1 |
| Treating symptoms not causes | Q2 |
| Overthinking without action | Q3 |

## When to use

- User prompt looks vague, multi-interpretation, or maze-shaped.
- Claude has proposed >2 solutions and you want the simplest true one.
- Decision touches paid-tier business context where capped/free-tier tools would silently fail.
- Conflict, workplace, or strategy decision where the visible problem hides the real one.

## When NOT to use

- Pure marketing-asset critique with adversarial pitcher / skeptic / judge framing — use a dedicated marketing review tool.
- Multi-option strategic decision needing broad stakeholder-lens analysis — use a dedicated stakeholder-council tool.
- Creative ideation with no constraint yet — use a dedicated ideation framework.
- Pure code review where line-level diff feedback is the goal — use a dedicated code review tool.

## Pass mode (auto-default, one flag)

- `--pass=prompt` review the user's typed request before Claude answers
- `--pass=solution` review a proposed solution (code, plan, multi-option answer)
- **Default auto-detect:** input `<200 chars → prompt-pass`, `≥200 chars → solution-pass`

## Paid-tier signal

Trio flags tier-cap violations when input contains any of: `paid`, `budget $`, `enterprise`, or `--paid` flag, AND the proposed solution depends on a capped/free-tier tool (free hobby plan, free API tier with rate limits, trial-only feature). Constraint-Finder emits `CONSTRAINT VIOLATION: tier-cap`.

---

## Round 0 — Scout (pre-flight, always-on)

Scout fires before any of the 3 lenses. Its job: break the obvious frame before Observer and Constraint-Finder anchor on it. Composite role drawing from Kahneman (outside view), Bezos (reversibility), Klein (premortem), and the universal "what's not counted" check.

Scout does NOT propose solutions, name constraints, or render verdicts. Scout names the *missing variables* before the rest of Trio starts.

**Scout's 4 mandatory questions (in this order):**

1. **What am I not counting?** (hidden cost / labor / time / dependency that the framing pretends is free)
2. **Outside view: what is the base rate?** (what happens when others try this — known cases, typical outcomes, "none known" if genuinely novel)
3. **One-way door or two-way door?** (Bezos: reversibility class — `one-way` if hard to undo, `two-way` if cheap to undo, `mixed` if some sub-decisions are each)
4. **Smart now, foolish in 30 days?** (pre-anchor premortem: imagine the action shipped, 30 days later it failed — name the most likely killer)

**Output shape (default, 1-pass mode):**

```
Round 0 — Scout pre-flight
1. Not counting: <hidden cost / labor / dependency, ≤15 words>
2. Outside view: <base rate or "none known", ≤15 words>
3. Door: one-way | two-way | mixed
4. Premortem: <most likely 30-day killer, ≤15 words>
```

≤80 words total. Always fires. Even in 1-pass mode.

**Under `--deliberate`:** expand each answer to 1-2 short paragraphs (≤200 words total). Same 4 questions; deeper evidence.

**Hard rules for Scout:**
- 4 questions. Not 3. Not 5.
- No solution proposal (Solomon's job).
- No constraint naming (CF's job).
- If a question has no answer, write `none known` — do not skip the line.
- Scout's findings are *inputs* to Observer and CF, not orders. Observer and CF may disagree with Scout's framing in their own outputs.

**Anti-overlap rule:** Scout names *what is missing*; Solomon names *what to do about it*. Scout's "premortem" identifies failure mode; Solomon's "Smallest Testable Action" picks the test. Different jobs.

---

## The 3 Lenses (sequential, no overlap)

### Lens 1: Observer

**Answers Q1 (what):** "What exactly are we trying to change?"

**Owns:** Karpathy R1 (Think Before Coding) + R3 (Surgical Changes). Line Method steps 1 (name real problem), 2 (Cynefin classification), 4 (position vs interest), 6 (detect false binary).

**Role:** Detect and name. Does NOT propose solutions. Does NOT resolve binaries — only flags them. Does NOT name success criterion (that is Solomon).

**Per invocation, produce up to 4 bullets:**

- **Real problem:** one sentence — the condition underneath the visible request.
- **Cynefin tag:** one word from {clear, complicated, complex, chaotic, confused}.
- **Position vs interest:** if the request hides a deeper need (security, control, profit, recognition, avoiding loss), name it. If not present, write `n/a`.
- **False binary flag:** if the request frames as A-or-B and a third path likely exists, write `false-binary: <A> vs <B>`. Else `n/a`.

**Hard rules:**
- No solution proposals.
- No constraint naming (that is Lens 2).
- No verdict (that is Lens 3).
- ≤4 bullets, ≤150 words.

---

### Lens 2: Constraint-Finder

**Answers Q2 (blocker):** "What is the real cause or constraint keeping it from being solved?"

**Owns:** Karpathy R2 (Simplicity First). Line Method step 3 (Theory of Constraints: find the one bottleneck).

**Role:** Name **exactly one** bottleneck. Not zero. Not multiple. Apply the tier-cap check.

**Per invocation, produce up to 4 bullets:**

- **The one constraint:** pick exactly ONE from `{trust, authority, money, time, fear, ego, bad-incentives, missing-info, bottleneck-person}`. If the input doesn't fit the enum, pick the closest and append a 3-word clarifier (e.g., `missing-info: which framework`).
- **What stops being needed if constraint dissolves:** one sentence — the work that becomes irrelevant once the constraint is gone.
- **Bloat in proposed solution (solution-pass only):** if the proposed solution has features, abstractions, error handling, or flexibility not requested, list them. ≤3 items. Else `n/a`.
- **Tier-cap check:** if paid-tier signal present AND solution depends on capped/free-tier tool, emit `CONSTRAINT VIOLATION: tier-cap: <tool-name> capped at <limit>`. Else `n/a`.

**Hard rules:**
- Exactly one constraint from the enum. Not zero. Not two.
- No solution proposals.
- No false-binary resolution (that is Lens 3 step 8).
- ≤4 bullets, ≤150 words.

---

### Lens 3: Solomon

**Answers Q3 (smallest move):** "What is the smallest evidence-based action we can take now, and what will we learn from it?" Also closes Q1 by naming the verifiable success criterion.

**Owns:** Karpathy R4 (Goal-Driven Execution). Line Method steps 5 (OODA: observe-orient-decide-act), 7 (one controlling question), 8 (false binary resolution / third option), 9 (smallest testable action), 10 (one change that simplifies the rest).

**Role:** Read Observer + Constraint-Finder output. Resolve any false binary Observer flagged (step 8). Decide. Synthesize the verdict block. If Observer and Constraint-Finder produced incompatible diagnoses, name the disagreement explicitly — no synthetic consensus.

**Produce this exact block:**

```
Controlling Question: <1 sentence — the one question that, if answered, collapses the rest>
Smallest Testable Action: <binary or numeric pass/fail, runnable in <72h for <$50>
Verifiable Success Criterion: <one line — observable evidence the action worked>
Verdict: PROCEED | SIMPLIFY | STOP-AND-RECLARIFY
Why: <one line — the load-bearing reason>
Log entry: <YYYY-MM-DD> | <1-pass | deliberate> | <PROCEED | SIMPLIFY | STOP-AND-RECLARIFY> | followed=?
```

**Append IF Observer ↔ Constraint-Finder conflict:**
```
Disagreement: <one line — what Observer said vs what Constraint-Finder said, no resolution forced>
```

**Verdict rules:**
- `PROCEED` — Cynefin tag is `clear` or `complicated`, no tier-cap violation, no false binary, controlling question has a known answer path.
- `SIMPLIFY` — bloat detected, OR false binary resolved into third option, OR proposed solution offers >2 paths when one suffices.
- `STOP-AND-RECLARIFY` — Cynefin `confused` or `chaotic`, OR Observer cannot name the real problem, OR `tier-cap` violation blocks the solution.

**Hard rules:**
- Smallest Testable Action MUST contain a comparison or threshold (regex: `(pass|fail|>=|<=|=|<|>)\s*[\d\w]`).
- One verdict only.
- ≤250 words total including the block.

---

## Deliberate mode (`--deliberate`, 3 rounds, House-model differential)

Default Trio = 1 forward pass (Observer → Constraint-Finder → Solomon). Good for daily prompts and small decisions. Single pass means lenses do not test each other's claims — only Solomon arbitrates.

`--deliberate` unlocks 3 rounds of cross-examination before Solomon judges. Modeled on Dr. House's differential diagnosis and Marketing Council's pitcher/skeptic loop: hypotheses get killed by tests, not by negotiation.

**Round 1 — Hypotheses (same as default 1-pass).**
- Observer emits Q1 block.
- Constraint-Finder emits Q2 block.
- Solomon stays silent in R1.

**Round 2 — Cross-attack (House differential).**
- Observer picks the single weakest claim in Constraint-Finder's R1 output. Names it. Proposes the cheapest test that would kill it (binary or numeric, <72h, <$50).
- Constraint-Finder picks the single weakest claim in Observer's R1 output. Names it. Proposes the cheapest test that would kill it.
- Each lens emits exactly 1 attack + 1 killing test. ≤80 words per lens.
- No defensive responses in R2. Attacks land; defense waits for R3.

**Round 3 — Revise or hold.**
- Observer reads R2 attack against itself. Either revises its R1 claim (state what changed) OR holds (state why R2 attack fails). ≤60 words.
- Constraint-Finder same. ≤60 words.
- Solomon now reads all 6 prior turns (R1 + R2 + R3 from both lenses) and emits the verdict block. Solomon MUST cite at least one R2 or R3 turn in the `Why:` line — proves the rounds shaped the verdict, not just the R1 inputs.

**When R2 attack lands and lens revises in R3:** Solomon treats the revised claim as authoritative.
**When R2 attack lands and lens holds in R3:** Solomon must adjudicate which side held up; the `Disagreement:` line names the unresolved split.
**When R2 attacks miss (Observer attacks Constraint-Finder's tier-cap with no counter-evidence, etc.):** the original claim stands, R2 attack is discarded silently.

**Deliberate mode output cap:** 1,500 words (vs 900 for 1-pass). If output approaches cap, truncate R2 attacks before truncating Solomon's verdict.

**When to use `--deliberate`:**
- High-stakes decision (firing someone, big purchase, legal letter, architecture pick, surgical decision).
- Observer and Constraint-Finder produced wildly different diagnoses on a 1-pass run.
- Stakeholder needs to see the work, not just the verdict.

**When NOT to use `--deliberate`:**
- Daily prompts, quick sanity checks, single-fact questions. Default 1-pass suffices. `--deliberate` on a trivial prompt is itself a Karpathy R2 violation.

---

## Token / word cap

- Default 1-pass: total Trio output ≤ 1,000 words (Scout Round 0 ≤ 80 + 3 lenses + Solomon block).
- `--deliberate`: ≤ 1,700 words (Scout Round 0 ≤ 200 + R1 + R2 + R3 + Solomon block).
- Verify with `(Get-Content out.txt | Measure-Object -Word).Words`.
- If approaching cap, truncate lowest-value content (R2 attacks first in --deliberate; lowest-value bullet otherwise). Never truncate Scout's 4 questions or Solomon's verdict.

---

## Acceptance criteria

- **AC1** `/trio "make my app better"` → Solomon verdict `STOP-AND-RECLARIFY`, Observer Cynefin tag = `confused`.
- **AC2** input with `paid` or `--paid` + solution naming free-tier capped tool → `CONSTRAINT VIOLATION: tier-cap` in Lens 2.
- **AC3** total output ≤ 1,000 words (1-pass) or ≤ 1,700 words (`--deliberate`).
- **AC4** Smallest Testable Action matches `(pass|fail|>=|<=|=|<|>)\s*[\d\w]`.
- **AC5** skill writes no file outside its own `SKILL.md`. All Trio output is emit-only; the operator may copy the `Log entry:` line into a `.usage.log` file manually.
- **AC6** Constraint-Finder names exactly ONE constraint from the enum.
- **AC7** when Observer ↔ Constraint-Finder conflict, Solomon output contains substring `Disagreement:`.
- **AC8** `--deliberate` run emits 3 distinct round headers (`Round 1`, `Round 2`, `Round 3`) and Solomon's `Why:` cites at least one R2 or R3 turn.
- **AC9** in `--deliberate`, each R2 attack contains its own killing test matching the AC4 regex.
- **AC10** every Trio run (1-pass and `--deliberate`) emits header `Round 0 — Scout pre-flight` BEFORE any lens output.
- **AC11** Scout output contains exactly 4 numbered answers — one each for `Not counting`, `Outside view`, `Door`, `Premortem`. Missing answer must be written as `none known` (not omitted).
- **AC12** Scout's `Door:` line contains exactly one of `one-way | two-way | mixed`.
- **AC13** Scout proposes no solution, names no constraint, renders no verdict (boundary-respect check).
- **AC14** Solomon's block contains exactly one `Log entry:` line matching format `<YYYY-MM-DD> | <1-pass|deliberate> | <PROCEED|SIMPLIFY|STOP-AND-RECLARIFY> | followed=?` — operator copies this manually to `.usage.log` if maintaining a feedback file. Trio itself writes no file.

---

## Operator instructions

1. User invokes `/trio <thing>` (or with `--pass=`, `--paid`, `--deliberate` flags).
2. Auto-detect pass mode if not specified (<200 chars → prompt; ≥200 → solution).
3. Detect `--deliberate` flag. If absent → **1-pass mode** (steps 4–6). If present → **deliberate mode** (steps 7–13).

**1-pass mode (default):**

4. Run **Scout** Round 0. Print its 4-question block (≤80 words).
5. Run **Observer** lens, reading Scout's output. Print its block.
6. Run **Constraint-Finder** lens, reading Scout + Observer output. Print its block.
7. Run **Solomon** lens, reading Scout + both lenses. Print verdict block. Append `Disagreement:` line only if the two main lenses produced incompatible diagnoses. Stop.

**Deliberate mode (`--deliberate`):**

8. Run **Scout** Round 0 (expanded, ≤200 words). Print its block.
9. Print header `Round 1 — Hypotheses`. Run Observer + Constraint-Finder, both reading Scout's output. Print both blocks. Solomon silent.
10. Print header `Round 2 — Cross-attack`. Observer picks weakest claim in Constraint-Finder's R1; emits 1 attack + 1 killing test (AC4 regex required). Constraint-Finder same against Observer's R1. No defenses in R2.
11. Print header `Round 3 — Revise or hold`. Observer reads R2 attack against itself; revises (state change) or holds (state why R2 attack fails). Constraint-Finder same. ≤60 words each.
12. Run **Solomon**, reading Scout + all 6 prior turns (R1 Observer, R1 CF, R2 Observer attack, R2 CF attack, R3 Observer revise/hold, R3 CF revise/hold).
13. Print Solomon verdict block. `Why:` line MUST cite at least one R2 or R3 turn. May also cite Scout.
14. If R2 attack landed and lens held: append `Disagreement:` naming the unresolved split.
15. Stop. Do not summarize beyond Solomon's verdict.

In both modes: do not offer next steps beyond Solomon's Smallest Testable Action.

---

## Anti-patterns (Trio fails when…)

- Observer proposes a solution → it stops being Observer.
- Constraint-Finder lists three constraints → it stops being Constraint-Finder.
- Solomon synthesizes consensus when the two lenses disagreed → erases the disagreement that mattered most.
- Smallest Testable Action reads "test it" or "try it" → no threshold, AC4 fails.
- Output > 900 words → token-cap breach, AC3 fails.
- Trio invoked on its own output recursively → forbidden; Trio reviews input, not itself.
- `--deliberate` used on trivial prompt ("what time is it") → R2 violation; lenses manufacture friction with nothing to cross-examine.
- In `--deliberate` R2: an "attack" with no killing test → silently dropped (AC9 violation). Attack must include a runnable test.
- In `--deliberate` R3: lens both revises AND holds → forbidden; pick one stance.
- Scout proposes a solution or names a constraint → it stops being Scout.
- Scout's Door classification missing or vague ("depends") → AC12 fails; force one of `one-way | two-way | mixed`.
- Scout question answered with silence or skipped → AC11 fails; write `none known`.
- Scout expanded to 5+ questions or 8 thinker-personas → bloat, Karpathy R2 violation.

---

## ADR (one-line each)

- **Decision:** Single file. Pre-flight Scout (Round 0) with 4 anchor-breaking questions runs before 3 sequential non-overlapping lenses keyed to 3 Core Questions. Manual `/trio` trigger. Variable depth via `--deliberate` flag (default Scout + 1-pass; optional Scout + 3-round House-model differential). Solomon synthesizes.
- **Drivers:** Karpathy 4 rules; Line Method 10 steps; 3 Core Questions spine (real problem / real blocker / smallest smart move); Dr. House differential diagnosis pattern (hypotheses killed by tests, not negotiated); Kahneman outside view + Bezos reversibility + Klein premortem (pre-anchor discipline via Scout); user "simple/elegant" directive; meta-discipline (skill obeys what it enforces).
- **Alternatives killed:** multi-file orchestrator (R2 violation); always-on adversarial pushback round (consensus theater on trivial prompts); auto-hook trigger modes (idempotency + R2); `context.json` persistence (overbuilt for one flag); fixed-depth 3 rounds for every invocation (R2 violation when 1 pass suffices); 10-question Scout with 8 named-thinker personas (theater + 6 functions overlapping existing lenses); user-proposed Scout Q4 "smallest reversible test" (encroaches on Solomon's verdict).
- **Why chosen:** smallest viable shape delivering Scout pre-flight + Solomon synthesis under 1,000 words for daily use, with `--deliberate` opt-in for high-stakes decisions where Observer ↔ Constraint-Finder must cross-examine. Scout's 4 questions cover the genuinely-new failure modes (outside view, reversibility, hidden cost, premortem) without duplicating Observer / CF / Solomon roles.
- **Consequences:** manual only; tier-cap keyword-based (false negatives possible — Observer catches semantically and surfaces via `Disagreement:`); `--deliberate` ~1.6× tokens and ~3× latency vs 1-pass, user must judge when stakes justify; Scout adds ~80 tokens / call in 1-pass mode (negligible, always-on); Scout findings are inputs not orders — Observer and CF may disagree with Scout in their own outputs.
- **Follow-ups (2026-05-25):** evaluate hook need, tier-cap keyword list expansion, whether R3 should also allow Solomon to propose a third killing test if both lens attacks miss, whether Scout's `none known` answers should auto-suggest `--deliberate` upgrade.
