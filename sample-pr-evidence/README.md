# Sample PR evidence — verbatim, pulled live via `gh api` / `git log`

These upgrade specific rows in
`consolidated-opus-high/04-FAILURE-CATALOGUE.md` from "reported in a
transcript" to **confirmed against the actual merged record**. Pulled
2026-09-07.

| File | Failure Catalogue rows | What it confirms |
| --- | --- | --- |
| `pr-08-coderabbit-autofix-findings.md` | 1–4 | CodeRabbit's actual review body for the autofix PR — verbatim confirmation of the async-arrow, malformed-range, TOCTOU, and non-atomic-write findings. Also contains the **"🤖 Prompt for AI Agents"** boxes, which turn out to open with the author's own verification prompt — see `../prompt-samples/coderabbit-agent-prompt.md`. |
| `pr-27-body-formatter-detach.md` | **7, 8, 9**, and 56 | **New in this pass.** The formatter-detachment bug: a textually-correct suppression silently detached by a downstream `biome check --write`. Appears in no planning pass except Gemini's, and was dropped entirely from the prior consolidation. The only bug in the catalogue where the tool was correct and the ecosystem moved underneath it. ✅ The internal prop name it quoted is already replaced with `onReady`. |
| `pr-15-body-cache-bug.md` | 14, plus a dated fact for Ch. 17 | The author's own root-cause writeup of the cache-observability bug. Also reveals that at v0.2.0 the distribution model was **still `postinstall` building from source** — the precompiled platform-package model came later, contradicting an assumption in several plans. Also states plainly: "No Jira ticket for this work, per the standing process for this repo" — sanitized evidence that not every PR carried an internal ticket. |
| `pr-21-body-severity-design.md` | **53** (a *good* decision, not a failure) | The design rationale for `Rule::default_severity()` vs `severity_override()` — the AI reasoning correctly about a genuinely subtle distinction, plus the regression test (`config::an_explicit_off_beats_a_default_on`) that pins it. Counterweight material for Ch. 5/10. |
| `pr-12-coderabbit-oidc-publish-findings.md` | Supporting, Ch. 19–20 | CodeRabbit's review of the original publish workflow, including a `--locked`/`Cargo.lock` supply-chain suggestion — colour for the publishing chapters, predating the OIDC saga itself. |
| `git-authorship-evidence.md` | — (evidence, not a failure) | **New in this pass.** 37 of 63 commits carry an AI co-author trailer, with the model named (Sonnet 5 ×35, Opus 5 1M ×7, Haiku 4.5 ×3); 20 of 37 PR bodies carry a generator trailer. Every planning pass called authorship unverifiable. It is now partly checkable in public, with a one-line command a reader can run. |

## Still worth pulling verbatim, by review volume

Not yet captured here — pull on demand when drafting reaches the chapter:

| PR | Reviews | Drafting chapter |
| --- | ---: | --- |
| **#21** | 16 CodeRabbit + 13 author — the most-reviewed PR in the project (3,950 insertions / 51 files) | Ch. 10, Ch. 5 |
| #30 | 5, of which 3 CHANGES_REQUESTED | Ch. 2 (parser pin), Ch. 12 |
| #31 | 4, of which 3 CHANGES_REQUESTED | Ch. 23 (IDE contract) |
| #22 | 5 CodeRabbit + 3 author | Ch. 18 (musl) |
| #15 | 10 CodeRabbit + 4 author (body already captured; the *reviews* are not) | Ch. 7, Ch. 17 |
| **#7** | **zero reviews** — nothing to pull, and that *is* the evidence | Ch. 4 / Ch. 12 — the only unreviewed PR is the one that shipped the flawed benchmark |

## A note on PR #7

There is deliberately no evidence file for PR #7, because the evidence is an
absence: created 19:46:50, merged 19:51:16, zero reviews of any kind. Verify with:

```bash
gh api repos/anchor-os/custom-biome-lint/pulls/7 \
  --jq '{created:.created_at, merged:.merged_at, review_comments, comments}'
gh api repos/anchor-os/custom-biome-lint/pulls/7/reviews --jq 'length'
```

See `consolidated-opus-high/05-PR-JOURNEY-AND-REVIEW-STACK.md` §2, Phase 2.
