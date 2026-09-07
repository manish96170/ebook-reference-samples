# The real review stack — what actually reviewed this code

> **⚠️ SUPERSEDED IN ONE RESPECT (2026-09-07, Opus 5 high pass).** The section
> below states that GitHub records "exactly two accounts" reviewing PRs. There
> are **three**: `coderabbitai[bot]` (99 reviews), `anchor-mani` (28), and one
> further account with a single empty-body `APPROVED` on PR #16. Confirm identity
> and consent with the author before naming it — it may be a colleague, i.e.
> another person's data. Everything else in this file stands, and the
> loop-driven-approval analysis below is the most important part of it.
> See `consolidated-opus-high/05-PR-JOURNEY-AND-REVIEW-STACK.md` §3 and risk
> #10 in `consolidated-opus-high/11-RISKS-SANITIZATION-AND-OPEN-DECISIONS.md`.

Pulled live from the GitHub API on 2026-09-07 (`gh api
repos/anchor-os/custom-biome-lint/pulls/{n}/reviews`). This corrects and
sharpens the "Four models, one manuscript" chapter (Ch. 15 in the master
outline) and should be read before drafting Ch. 3, 13, 15, 16, and 21.

## What the GitHub API actually shows

Every PR review recorded by GitHub itself comes from exactly two accounts:

- **`coderabbitai[bot]`** — CodeRabbit, wired in as a real GitHub App.
  This is the only fully automated, natively-integrated reviewer. Review
  volume tracks complexity tightly: PR #21 (the four param-mutation rules)
  got 16 CodeRabbit review rounds; PR #27 (the suppression-placement fix)
  got 9; PR #8 (the autofix engine) got 4 review rounds that found the four
  bugs in Failure Catalogue rows 1–4, verbatim.
- **`anchor-mani`** (the user's own GitHub account) — every "human" review
  and approval in the PR record is attributed to this one account. There is
  no separate bot account for ChatGPT, Claude, Gemini, or OpenCode anywhere
  in the GitHub review API.

**This means:** ChatGPT.com's architecture reviews and PR reviews (visible
in the `chatgpt-*.md` session files) happened **out-of-band** — copy/paste
between the ChatGPT web UI and GitHub, not a GitHub App integration. Same
for Gemini's comparison passes. They influenced the code and the review
decisions, but they don't show up as a distinct actor in the repo's own
audit trail — only the PR body text, commit messages, and the session
transcripts prove they happened.

## The nuance the user flagged: some "human" approvals were loop-driven, not literally hand-clicked

The user's own account (`anchor-mani`) shows up as the approver on every PR,
but the user has said that OpenCode (running "BigPickle" and other free
models) was, for some sessions, run in a loop that **watched CI and
auto-confirmed MR approval** once the gate conditions were met — i.e. an
agent operating under the user's authenticated account executed some of
those approval clicks autonomously, within constraints the user set up in
advance.

**Why this matters for the book's positioning (`01-POSITIONING-AND-TITLE.md`):**
this does not contradict "AI wrote it, I decided" — it *is* the mechanism
that makes that claim precise rather than vague. The decision was made once,
upfront, when the human configured the gate (which checks must pass, what
counts as "safe to auto-approve"); the loop then mechanically enforced that
decision many times without needing a human in the room for each one. This
is actually a **better**, more specific story than "I reviewed every PR
personally" — it's closer to what Ch. 16 ("Review budget as an engineering
constraint") and Ch. 21 ("'I won't approve' is not a gate") are already
arguing: gates you can verify beat vigilance you have to sustain. Recommend
adding one paragraph to Ch. 16 making this explicit: *"Not every approval
click in this project's history was a human sitting at a keyboard reading a
diff in that exact moment — some were an agent enforcing a gate the human
had already decided on. The book's claim isn't 'a human looked at every
line'; it's 'a human decided what 'safe to ship' meant, verified the gate
actually enforced that, and the mechanism — human or looped agent — never
overrode it.'"* This is more honest than either "I approved everything
personally" or "it shipped itself," and it's a distinction most
AI-assisted-development books don't make at all.

## What this means for chapter-by-chapter sourcing

When drafting Ch. 13–16, cite:
- **CodeRabbit findings** → from the GitHub API directly (see
  `sample-pr-evidence/`), not from a transcript's paraphrase of them. The
  API is the primary source; it's more precise and directly quotable.
- **ChatGPT/Gemini architecture reviews** → from the `chatgpt-*.md` /
  `book-idea-gemini.txt` session files, explicitly labeled as out-of-band
  (no GitHub App, no automatic audit trail) — this is itself worth a
  sentence in Ch. 15, since it's an honest limitation: those reviews are
  provably real (they're in the session record) but not independently
  auditable the way a GitHub App review is.
- **Approval/merge mechanics** → from the PR record (`pr-index.md`) for
  *when*; from the session transcripts for *whether a human or a loop*
  clicked approve at that moment, since GitHub's API can't distinguish the
  two.

---

## 5. Review-stack mechanics, from the API

Facts anyone can query. They matter because they explain the *shape* of the
review record, and because two of them are easy to misread.

| Fact | Value | Why it matters |
| --- | --- | --- |
| Reviews by reviewer | **CodeRabbit 99 · author's account 28 · a third account 1** | CodeRabbit did the bulk of the reviewing, and the volume gap is large enough that "reviewed" needs defining per-reviewer rather than in aggregate |
| Branch protection on `main` | **`required_approving_review_count: 1`** | One approval, not two |
| PRs merged with exactly one review | **16 of 37**; PR #7 merged with none | Consistent with the setting above |
| `dismiss_stale_reviews` | **`true`** | Any new push dismisses existing approvals, so an approval had to be re-obtained after every force-push. This is the mechanical source of a lot of re-approval churn |
| Reviews recorded `DISMISSED` | 3 — PRs #15, #35, #37 | What the setting above looks like in the record |

Reproduce:

```bash
gh api repos/anchor-os/custom-biome-lint/branches/main/protection \
  --jq '.required_pull_request_reviews'
for n in $(seq 1 37); do
  printf '%s %s\n' "$n" "$(gh api repos/anchor-os/custom-biome-lint/pulls/$n/reviews --jq 'length')"
done
```

**One caution when drafting from this.** `dismiss_stale_reviews: true` plus a
long `@coderabbitai full review` comment thread means a PR's review state does
not always settle on its own. Do not read a re-approval, or a `DISMISSED`
review, as a reviewer changing their mind — it is usually just a push having
invalidated the previous approval.

The *process* around who approved and why is author-recollection rather than
API-visible, and is held in the book's planning notes until the manuscript
frames it. Do not infer it from the counts above.
