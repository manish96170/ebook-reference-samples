# Authorship evidence from the public git history

Pulled 2026-09-07 from `git log origin/main` and the GitHub PR API. **This is
the single biggest evidence upgrade available to the book**, because every one
of the nine planning passes independently concluded that "AI wrote the code" was
an author claim that could not be corroborated — *"a git diff alone does not
prove authorship."*

It is now partly corroborated, in public, by any reader with `git log`.

---

## The numbers

```
Commits on origin/main                           63
  carrying an AI Co-Authored-By trailer          45   (71%)
    Claude Sonnet 5                              35
    Claude Opus 5 (1M context)                    7
    Claude Haiku 4.5                              3
  no AI trailer                                  18   (29%)

Commits also naming the human author as co-author  27

PR bodies (of 37) with a generator/attribution trailer  20
  "🤖 Generated with [Claude](https://claude.com/claude-code)"  13
  OpenCode attribution                                     3
  Co-Authored-By trailer only                              4

PR titles carrying a visible 🤖 marker            3   (#35, #36, #37)
```

### Reproduce it

```bash
git -C custom-biome-lint rev-list --count origin/main
git -C custom-biome-lint log --format='%b' origin/main \
  | grep -oiE "Co-Authored-By: (Claude [A-Za-z0-9. ()]*)" \
  | sed 's/[Cc]o-[Aa]uthored-[Bb]y: //' | sort | uniq -c | sort -rn
```

Put this command in **Appendix D**. A reader who can re-derive the book's
central claim in one command is a reader who trusts the rest of the book.

---

## How to present it — and the three honesty rules

The tempting version is *"AI wrote every line."* The better version is the
precise one:

> Authorship here is not just claimed — it is recorded, commit by commit, in a
> public repository, with the model named. 45 of 63 commits say which model
> co-wrote them. The remaining 18 do not, and this book does not pretend
> otherwise.

That sentence is **more** persuasive than the absolute claim, because it is
checkable. Three rules:

1. **A trailer is a convention, not an audit.** The author's own tooling wrote
   it. It corroborates; it does not prove. Anyone could write the same trailer by
   hand on hand-written code. Say this explicitly — it costs nothing and it
   inoculates the claim against the obvious objection.
2. **The 18 untrailered commits are part of the story, not an embarrassment.**
   Some are merge commits, some predate the convention taking hold. Establish
   which before print (`git log --merges` will separate the merges out), and
   report the breakdown rather than quoting only 45.
3. **Give the ratio, never the absolute.** "71% of commits name an AI
   co-author" survives scrutiny. "AI wrote it all" does not.

---

## Why the model mix is worth its own short table (Ch. 28)

A public, dated record of *which model did which work* across a 14-day project
is unusual, and it is more interesting than the headline ratio:

| Model | Commits | What it suggests |
| --- | ---: | --- |
| Claude Sonnet 5 | 35 | The default workhorse for implementation |
| Claude Opus 5 (1M context) | 7 | Reserved for long, multi-step sessions — consistent with the `/context` dumps in `CC-D`/`CC-C` showing very high context utilisation |
| Claude Haiku 4.5 | 3 | A handful of small, cheap tasks |

**Do not assert the "why" from the trailers alone.** The counts are facts; the
selection rationale is an author-interview question. Ask: what made you reach
for Opus over Sonnet, and did you ever regret the choice either way? The answer
is Ch. 28's most useful paragraph and it does not exist in any source material.

Note also that the trailers name **specific model versions**, which will read as
historical within a year. Date the table and treat it as a snapshot of a moment
in tooling, not as a recommendation.

---

## The OpenCode attribution is a separate, useful thread

Three PR bodies attribute OpenCode rather than Claude Code (#28, #29, #31). Two
of those — #28 (loop-ban rules) and #31 (the IDE contract) — are substantial
feature PRs, so this is not incidental.

It corroborates the multi-harness story from an independent direction: the
session transcripts say OpenCode was used, and the public PR record agrees. That
matters for **Ch. 15**, because it is the *only* place in GitHub's own record
where a non-CodeRabbit AI tool leaves a trace at all. GitHub's review API shows
nothing from OpenCode, ChatGPT, or Gemini (see
`consolidated-opus-high/05-PR-JOURNEY-AND-REVIEW-STACK.md` §3) — but the PR
*bodies* do. So the honest statement for Ch. 15 is:

> The out-of-band tools left no audit trail as *reviewers*. They did leave one
> as *authors*, in the PR descriptions they wrote.

---

## What this does NOT establish

Be strict about the boundary, because this is exactly the kind of evidence that
invites over-reading:

- It does not establish the **proportion of lines** written by AI, only the
  proportion of commits carrying an attribution.
- It does not establish that the human wrote nothing. 27 commits name the human
  as a co-author *alongside* a model.
- It does not establish that the AI's contribution to any given commit was
  large. A one-line fix and a 1,500-line feature carry the same trailer.
- It says nothing about **review** or **decision-making** — which is the book's
  actual thesis, and which is evidenced by the PR review record instead.

The right claim to build on this: *the authorship is documented; the
responsibility is the human's; here is the machinery that made that split safe.*
