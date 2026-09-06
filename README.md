# Ebook reference samples

Private evidence archive for a book about building **`custom-biome-lint`** — a
Rust linter for JavaScript, built with AI assistance and published to npm across
8 platform targets.

**What this repo is for:** whoever drafts a chapter reads the relevant file here
to check a fact, quote a real artifact, or see what to draw out of a source. It
is drafting scaffolding, not reader-facing material.

**What this repo is not:** the book, the book's plan, the product, or the public
companion repo. Those live elsewhere — see "Related, not in this repo" below.

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

1. **The public repo still holds the originals.** The real ticket ID is in PR #8's
   title and the real JSX prop name is in PR #27's body, on GitHub right now.
   Scrubbing this archive changed nothing upstream.
2. **Anything freshly pulled arrives unsanitized.** A new `gh api` call returns
   the real strings; a fresh transcript paste brings back internal paths. Re-run
   the scrub script (kept in the author's working folder, deliberately outside
   this repo, because it maps placeholders back to real strings) on anything new.

### Why this repo is private

Not for privacy — nothing in here is private any more. Two other reasons:

- It contains **editorial annotations** — which stories are strongest, which
  numbers not to trust, which failure-catalogue rows a chapter should dramatize.
  That is the book's angle, and it stays the author's until the book ships.
- It is a working archive, not a curated asset.

Flip it public after launch if that's useful then; it's one flag.

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
