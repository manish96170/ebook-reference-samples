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

## 5. Why there were two reviewers at all — and what the second one actually was

**Added 2026-09-07 from the author's own account, with the parts the record
confirms and the one part it contradicts kept separate.**

### What the author reports

The repository's process required **at least two reviewers** before a merge.
CodeRabbit filled one slot. The second slot needed a human account — so:

- On substantial PRs, CodeRabbit did the real reviewing (99 reviews, 14 PRs
  sent back with `CHANGES_REQUESTED`, and every one of the four autofix bugs in
  Failure Catalogue rows 1–4).
- On **simple PRs — one or two changed files** — the author would take an
  out-of-band review from a web chat session, then click approve on the human
  account to satisfy the count. Those approvals were, in the author's words,
  procedural rather than substantive.
- A second driver: `@coderabbitai full review` produces a lot of inline
  comments. Some went stale, some were resolved without GitHub clearing the
  mergeable state. A human approval became the mechanism for unblocking a PR
  whose comment state would not resolve itself.

The author's own conclusion, and it is the useful one: **the human step was a
corporate-process artifact, not an engineering necessity.** Someone without a
two-reviewer rule could run this workflow with AI review alone.

### What the record confirms

| Fact | Value | Source |
| --- | --- | --- |
| CodeRabbit reviews vs author-account reviews | **99 vs 28** | GitHub API |
| PR #16's sole approval body length | **0 characters** — a literal empty-body approval | GitHub API |
| `dismiss_stale_reviews` on `main` | **true** — any new push dismisses existing approvals, so every force-push required re-approving | Branch protection API |
| Reviews recorded as `DISMISSED` | 3 (PRs #15, #35, #37) | GitHub API |

`dismiss_stale_reviews: true` is the mechanical explanation for a good deal of
the friction the author describes. It is worth stating plainly, because it is
checkable and it is the kind of detail that makes the rest credible.

### What the record does NOT support — resolve before print

**Current branch protection on `main` requires `1` approving review, not 2.**
And **16 of the 37 PRs merged with exactly one review** (PR #7 merged with
none at all). A GitHub-enforced two-reviewer minimum is not consistent with
either the current settings or the merge record.

Three possible explanations, and the author needs to pick the true one:

1. **Most likely, and the best story:** the two-reviewer rule came from the
   author's *employer's* internal GitLab process, and was carried over to this
   repo as a working habit rather than as an enforced setting. That makes the
   chapter about **process cargo-culting** — importing a governance ritual into
   a repo that never required it — which is a sharper and more useful point than
   "the policy made me do it."
2. The setting was 2 during the August work and has since been changed to 1.
   Checkable only if the author remembers, since branch-protection history is
   not exposed by the API.
3. Misremembered.

**Do not write "GitHub required two reviewers" until this is settled.** A reader
can query the branch protection in one call, and 16 single-review merges are
right there in `pr-index.md`.

### Why this matters more than it looks

It relocates the human decision point. If the second approval was procedural,
then the deciding was not happening at the merge button — it was happening
**upstream**: in the plan document, in the design of the local gate, in the
release-environment gate, and in triaging CodeRabbit's findings against the
current code. That is a **more defensible** version of "AI wrote it, I decided,"
because those are the places the record actually shows judgment being exercised.

It also raises a governance question most engineering orgs currently have no
answer to: a two-reviewer rule assumes two independent human judgments. When one
slot is a bot and the other is a formality, the rule is satisfied and its intent
is not. That observation is unusual, current, and belongs in the book.
