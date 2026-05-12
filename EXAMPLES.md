# Trio worked examples

Three sample runs showing the format Trio emits. Each example shows the input, the expected actor blocks, and the verdict. Use these to calibrate what "good" output looks like before reporting a bug.

---

## Example 1 — Vague prompt (1-pass)

### Input

```
/trio "make my app better"
```

### Expected output shape

```
Round 0 — Scout pre-flight
1. Not counting: which dimension of "better" (speed, UX, revenue, retention) is the target.
2. Outside view: vague-goal rewrites take 3–5 follow-up clarifications on average.
3. Door: two-way (clarifying does not commit any action)
4. Premortem: 30 days from now you built the wrong "better" and shipped a feature no user asked for.

Lens 1 — Observer (Q1)
- Real problem: target dimension of "better" is undefined; success cannot be measured until specified.
- Cynefin tag: confused
- Position vs interest: position = "make app better"; interest = unknown — likely revenue, retention, or perceived quality
- False binary flag: n/a (not enough constraint to form a binary)

Lens 2 — Constraint-Finder (Q2)
- The one constraint: missing-info: target dimension and current baseline
- What stops being needed if constraint dissolves: most downstream design choices anchor on the dimension
- Bloat in proposed solution: n/a (no solution proposed yet)
- Tier-cap check: n/a

Lens 3 — Solomon (Q3 + Q1-criterion)
Controlling Question: Which one dimension of "better" — measured how — would you most regret not improving in 90 days?
Smallest Testable Action: write one sentence in the format "I will improve <metric> from <current value> to <target value> by <date>." Pass if the sentence contains all four fields. Fail otherwise.
Verifiable Success Criterion: a one-sentence goal statement exists in writing with metric, baseline, target, and deadline.
Verdict: STOP-AND-RECLARIFY
Why: Cynefin tag is "confused"; Constraint-Finder named missing-info on the target dimension. No action is sound until the dimension is named.
Log entry: 2026-05-11 | 1-pass | STOP-AND-RECLARIFY | followed=?
```

### What this example demonstrates

- AC1: vague prompt → `STOP-AND-RECLARIFY` with Cynefin = `confused`.
- AC11: Scout emits four numbered answers.
- AC14: Solomon emits a `Log entry:` line.

---

## Example 2 — Paid-tier context, capped-tool solution (1-pass)

### Input

```
/trio --paid --pass=solution "I need to host my paid SaaS backend. Plan: use a free serverless tier with cold-start latency and a 100k requests/month cap."
```

### Expected output shape (key lines)

```
Round 0 — Scout pre-flight
1. Not counting: cost of every request beyond the 100k cap; cold-start impact on paying users.
2. Outside view: paid SaaS backends on free serverless tiers fail SLA within ~3 months of usage growth.
3. Door: two-way for tooling, one-way for customer-trust damage if the cap is hit publicly
4. Premortem: traffic spike past 100k → forced emergency migration during outage.

Lens 1 — Observer (Q1)
- Real problem: hosting choice optimizes acquisition cost at the expense of reliability and ceiling
- Cynefin tag: complicated
- Position vs interest: position = "save money"; interest = sustainable paid SaaS that does not embarrass under load
- False binary flag: false-binary: free-tier vs full enterprise plan

Lens 2 — Constraint-Finder (Q2)
- The one constraint: money (limited budget for backend) — but compounded by tier-cap
- What stops being needed if constraint dissolves: hard-cap risk mitigation, cold-start workarounds
- Bloat in proposed solution: cold-start retries, request batching to stay under cap
- Tier-cap check: CONSTRAINT VIOLATION: tier-cap: serverless free tier capped at 100k requests/month and cold-start latency degrades paid-customer experience

Lens 3 — Solomon (Q3 + Q1-criterion)
Controlling Question: What is the smallest paid-tier hosting plan whose ceiling exceeds your 90-day traffic forecast with margin?
Smallest Testable Action: enumerate current and projected requests/month; price the smallest paid plan that fits with ≥ 2x headroom. Pass if a plan is identified with monthly cost <= 5% of expected MRR. Fail otherwise.
Verifiable Success Criterion: written plan name, monthly cost, request ceiling, and 90-day forecast on a single page.
Verdict: SIMPLIFY
Why: Constraint-Finder flagged tier-cap; Observer's false-binary (free vs enterprise) resolves to a third path (smallest paid plan with margin).
Log entry: 2026-05-11 | 1-pass | SIMPLIFY | followed=?
```

### What this example demonstrates

- AC2: `--paid` flag + capped-tier solution → `CONSTRAINT VIOLATION: tier-cap` emitted.
- Observer detects false binary; Solomon resolves it (no role overlap).

---

## Example 3 — High-stakes decision (--deliberate, 3 rounds)

### Input

```
/trio --deliberate "Should I migrate my SaaS from a managed PaaS to raw cloud to save $400/month?"
```

### Expected output shape (compressed; full run is under 1,700 words)

```
Round 0 — Scout pre-flight
1. Not counting: engineering hours to rebuild what the managed PaaS provides (deploys, SSL, DB, monitoring).
2. Outside view: PaaS-to-raw-cloud migrations typically consume 40–120 engineering hours; ongoing maintenance adds 5–10 hours/month.
3. Door: mixed — DB migration is close to one-way; static assets and background jobs are two-way.
4. Premortem: 30 days in, deploys are slower, SSL renewal breaks, monitoring is incomplete, founder lost 40 hours of product time.

Round 1 — Hypotheses
Observer: real problem = high recurring bill. Cynefin = complicated. False-binary: PaaS vs raw cloud (third path = stay PaaS, prune unused add-ons).
Constraint-Finder: constraint = money: $400/month bill. Bloat = none yet.

Round 2 — Cross-attack
Observer attacks CF: "money is the visible constraint; the load-bearing constraint is time — managed services represent ~20 hours/month of senior labor that you would now own. Killing test: list every managed service in use; estimate rebuild hours. Pass if total ≤ 10 hours. Fail if > 40 hours."
CF attacks Observer: "Cynefin tag = complicated assumes expert can solve. Migration outcomes depend on team skill + traffic patterns, which is complex. Killing test: get three independent estimates from engineers who have done this migration. Pass if estimates within 20%. Fail if spread > 50%."

Round 3 — Revise or hold
Observer holds: skill is rule-based; deterministic same-input → same-output stays complicated. CF's test measures user surprise, not Trio behavior.
CF revises: "constraint is time, not money. Money is the visible bill; time is the hidden cost of rebuilding managed services."

Lens 3 — Solomon (Q3 + Q1-criterion)
Controlling Question: What is the all-in cost (engineering hours plus ongoing maintenance) of replicating the managed PaaS bundle on raw cloud?
Smallest Testable Action: spend two hours listing every managed service in use; estimate rebuild hours per service. Pass if list ≤ 5 services AND total rebuild estimate ≤ 20 hours. Fail otherwise.
Verifiable Success Criterion: written inventory and hour estimate, reviewed by one second engineer.
Verdict: STOP-AND-RECLARIFY
Why: CF's R3-revised constraint (time, not money) is load-bearing; the $400/month savings is dominated by hidden rebuild cost. Cannot judge until inventory exists. Cites Scout Q1, Observer R2 attack, CF R3 revise.
Disagreement: Observer holds Cynefin = complicated (deterministic rule-domain); CF's R2 attack proposed complex. Unresolved; does not block the verdict since the fix does not depend on Cynefin classification.
Log entry: 2026-05-11 | deliberate | STOP-AND-RECLARIFY | followed=?
```

### What this example demonstrates

- AC8: three distinct round headers; Solomon's `Why:` cites R2 and R3.
- AC9: each R2 attack contains a binary or numeric killing test.
- AC7: lenses disagreed → `Disagreement:` line appended.
- AC14: `Log entry:` line emitted with `deliberate` mode.

---

## How to use these examples

1. Run the inputs verbatim.
2. Compare your output's *structure* (headers, line formats, AC compliance) to the examples — exact wording will differ because Trio responds to the actual input you give it.
3. If the structure deviates (missing Scout header, missing `Log entry:` line, Constraint-Finder named zero or multiple constraints), open a bug report using the issue template.

The examples are not benchmarks of "correct verdicts." They illustrate the *shape* the skill is supposed to produce. The verdict itself depends on your input.
