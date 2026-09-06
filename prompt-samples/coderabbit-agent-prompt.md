# CodeRabbit's "🤖 Prompt for AI Agents" boxes

**Provenance:** `generated/` — written by the review tool, for a coding agent.
Pulled verbatim from PR #8's review bodies via `gh api`, 2026-09-07. Full
context in `../sample-pr-evidence/pr-08-coderabbit-autofix-findings.md`.

**Chapter:** 8, and Appendix A.

---

## The finding worth building a chapter beat around

Every one of these machine-generated fix-prompts **opens with the author's own
verification prompt, verbatim**:

```
Verify each finding against current code. Fix only still-valid issues, skip the
rest with a brief reason, keep changes minimal, and validate.

In `@src/autofix.rs` around lines 544 - 572, Update the test
exclusive_temp_creation_refuses_a_pre_existing_symlink_rather_than_following_it
to plant the symlink at a candidate filename that create_temp_sibling can
generate, then invoke create_temp_sibling instead of fs::OpenOptions::create_new
directly. Assert the helper fails or skips the occupied candidate and verify the
victim contents remain unchanged, preserving the symlink-safety regression
coverage.
```

Compare the first paragraph with `verification-prompt.md` in this folder. It is
the same text, minus the prompt-injection clause.

**What that means:** the reviewer appears to have been *configured* to prefix
its agent-facing output with the project's own verification discipline. So when
a finding was handed to a coding agent, the "verify before you change anything"
instruction travelled with it automatically. The guard was built into the
artifact rather than remembered by the human each time.

That is the book's thesis in miniature, and it is a much better story than
"I had a good prompt." It is: **I stopped relying on myself to remember the good
prompt, and made the pipeline emit it.** It belongs in Ch. 8 or Ch. 16, and it
pairs directly with the Ch. 21 lesson (*gates you can verify beat vigilance you
have to sustain*).

**⚠️ Confirm before printing.** This inference — that the prefix is the author's
configuration rather than a CodeRabbit default — is not proven by the API
response alone. Ask the author: was the CodeRabbit agent-prompt prefix
configured (e.g. via `.coderabbit.yaml` or dashboard settings), and if so, when
and why? If it turns out to be a tool default, the observation collapses and the
paragraph must be cut. Add this to the author-interview list in
`consolidated-opus-high/11-RISKS-SANITIZATION-AND-OPEN-DECISIONS.md` §3.

---

## The secondary, lighter observation

A review tool generating structured re-prompts for *other* AIs is a real and
slightly funny artifact of 2026-era engineering: one model writes the code,
a second model reviews it, and the second model's output is formatted as
instructions for a third. Worth exactly one callout box — the temptation is to
over-philosophise it.

The useful, non-cute part is the **shape** of these prompts, which is worth
copying:

1. The standing verification instruction, first.
2. An exact anchor — `@file` plus a line range.
3. A specific, bounded action, stated as an imperative.
4. The assertion or property the change must establish.
5. What must be preserved (`preserving the symlink-safety regression coverage`).

Point 5 is the one most hand-written fix-prompts omit, and it is the one that
prevents an agent from "fixing" a finding by deleting the test.

---

## Two more of these boxes worth pulling when drafting Ch. 8

Both are in the PR #8 evidence file already:

- A trivial one (add a language tag to a fenced code block in `docs/TESTING.md`)
  — useful precisely *because* it is trivial. It shows the same rigorous format
  applied to a cosmetic finding, which is what makes a review gate consistent
  rather than selective.
- The symlink test rewrite quoted above — a case where the reviewer's finding
  was not "this code is wrong" but **"this test does not prove what it claims to
  prove."** That is Failure Catalogue row 6's category, and it is the more
  interesting kind of finding.

There is also a "🤖 Prompt for all review comments with AI agents" variant — a
single batched prompt covering every finding on the PR at once. That is the
mechanism behind Ch. 16's "batch fixes, resolve threads before re-requesting"
discipline, so it is worth one sentence there.
