# Ebook reference samples

Public evidence archive for a book about building **`custom-biome-lint`** — a
Rust linter for JavaScript, built with AI assistance and published to npm across
8 platform targets.

**Why this exists.** The book's central claim is that AI wrote effectively all of
the code while a human made every decision. That claim is only worth reading if
it can be checked. This repo is where the checking happens: the dated PR record,
verbatim review findings, the git trailers that name which model co-wrote which
commit, and the prompts that actually caught bugs.

**Everything here is independently verifiable.** Every fact traces to the public
repository [`anchor-os/custom-biome-lint`](https://github.com/anchor-os/custom-biome-lint)
or to its public pull requests. Nothing rests on the author's word. Where a claim
*can't* be verified, it is labelled as such — see "Conventions" below.

**What this repo is not:** the book, the book's plan, the product itself, or the
book's eventual code companion. Those live elsewhere — see "Related" below.

---

## Start here

| If you need… | Read |
| --- | --- |
| The dated timeline and per-PR metrics | `pr-index.md` |
| Who and what actually reviewed the code | `review-stack-notes.md` |
| Verbatim proof for a specific bug or design decision | `sample-pr-evidence/` |
| Evidence that AI wrote the code | `sample-pr-evidence/git-authorship-evidence.md` |
| A real prompt, with what it caught | `prompt-samples/` |
| A real implementation detail | `code-samples/` |

Each subdirectory has its own README explaining what's in it and what's still
worth pulling.

## Sanitization status — read before quoting anything

**Sanitized 2026-09-07.** 176 replacements over two passes. This archive contains
**no internal identifiers, no employer references, no private component paths, no
ticket IDs, no private commit hashes, no local absolute paths, no credentials, and
no email addresses** — verified by grep across 31 patterns.

Every remaining fact is sourced from the **public** repository
(`github.com/anchor-os/custom-biome-lint`) or from the author's own PR
descriptions. Anyone with `gh` and `git` could re-derive all of it.

### Placeholder legend

So you are not confused by a name that reads oddly generic:

| You will see | It stands for |
| --- | --- |
| `PRIV-1042` | An internal Jira-style ticket ID |
| `private-org` | The employer / internal GitLab organisation |
| `private-app` | The private React codebase the linter was built for |
| `src/components/Example/*` | Real internal component paths |
| `localRules/` | The internal rule namespace |
| `~/workspace/...` | Real absolute local paths |
| `gitlab.example.com/...` | The internal GitLab remote |
| `second-reviewer` | A third GitHub account that reviewed one PR |
| `onReady` | An internal JSX prop name quoted in a PR body |
| `author` | The author's machine username |
| `<PRIVATE_COMMIT>` | A commit hash in the private codebase |
| `~4,400 files` | An exact file count of the private codebase (rounded) |

**Kept deliberately, because genuinely public:** `custom-biome-lint` (on npm),
`anchor-os` and `anchor-mani` (public GitHub org and handle), `github.com` URLs,
PR numbers, public commit SHAs, npm download statistics, `mapboxgl.Map` (a public
library and a legitimate technical example), and `comment-doc-links` (the
author's own separate public project).

### Two things sanitization does not solve

1. **The product repo keeps its own originals, by decision.** A ticket ID appears
   in PR #8's title and an internal prop name in PR #27's body over in
   `anchor-os/custom-biome-lint`. Those stay there — rewriting merged PR metadata
   costs more than it buys, and the strings are unremarkable in isolation. They
   are deliberately absent **here**, and this archive's full git history has been
   scanned to confirm it: zero originals, in any blob, in any commit.
2. **Anything freshly pulled arrives unsanitized.** A new `gh api` call returns
   the real strings; a fresh transcript paste brings back internal paths. Re-run
   the scrub script (kept in the author's working folder, deliberately outside
   this repo, because it maps placeholders back to real strings) on anything new.

### A note on the editorial annotations

This archive is published **with** its working notes intact — which stories are
strongest, which numbers not to trust, which incidents a chapter should dramatize
at full length. Those were written as instructions to whoever drafts the book, not
as reader-facing prose.

They are left in deliberately. A book that argues "verify everything, trust
nothing on confidence alone" is in a poor position to hide its own working. If
you want to see how the argument was assembled — including the places where a
tempting claim was cut for lack of evidence — it is all here.

Two consequences worth stating plainly:

- **The annotations are opinions, not findings.** "The best story in the record"
  is an editorial judgement. The *evidence* it points at is the verifiable part.
- **Nothing here is final.** Counts, framings, and conclusions may all differ in
  the finished book, because re-verification is a required step before print and
  some of these numbers will move.

## Conventions used throughout

- **Evidence-strength labels.** Every factual claim carries one: *Confirmed
  live* / *Observed in export* / *Reported outcome* / *Proposal* / *New teaching
  material* / *Unverified*. Treat them as load-bearing — "CodeRabbit flagged X
  and the fix shipped" and "an audit recommended X" are different sentences.
- **Row numbers** (e.g. "Failure Catalogue row 27") point into the book's
  planning documents, which are not in this repo.
- **Re-verify before print.** Everything here is a 2026-09-07 snapshot and the
  product repo moves. Counts especially: the project's own README understates its
  test count, and three mutually incompatible figures circulate.

## Related, not in this repo

| What | Where |
| --- | --- |
| The product being written about | `github.com/anchor-os/custom-biome-lint` (public, on npm) |
| The book's plan and chapter outline | `consolidated-opus-high/` in the author's working folder — deliberately excluded |
| Raw session transcripts | The author's working folder — too large and too raw to publish |
| The sanitization script | The author's working folder — it is a reverse-mapping, so it stays out |
| The eventual public companion repo | Not created yet |

## Provenance

See `NOTICE.md` — this archive mixes three kinds of material with three
different owners, and that needs stating before anything is reproduced in print.
