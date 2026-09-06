# Prompt samples — reference for drafting

Real prompts as actually used, with what they produced. These are the *source*
material; the tiered, publishable versions live in
`consolidated-opus-high/07-PROMPT-AND-ARTIFACT-LIBRARY.md`.

**Sanitized 2026-09-07.** The prompts captured here are generic or drawn from
public PR review bodies — they carry no internal paths, ticket IDs, or codebase
specifics. Safe to quote into the manuscript as-is.

**What this folder is still for, now that privacy isn't the reason:** honest
provenance. Several prompts that appear under a user heading in a transcript were
pasted from another conversation, and the polished library versions can't show
that without being wrong about it. This is where the messy attribution lives.

**Watch this when you add prompts.** The scrub catches known strings; it cannot
catch a *secret*, and it cannot catch a prompt that quotes private code as
context. Both are common in raw prompts. Read anything new by eye before filing
it here, and run `ebook-scrub.py --dry` over it.

## Provenance labels — apply one to every file here

- `human/` — the author wrote it, verbatim.
- `refined/` — the author wrote it, an AI tightened it. **Use generously.**
- `generated/` — an AI wrote it for another AI.
- `teaching-template/` — new, written for the book.

A prompt appearing under a user heading does **not** prove the author composed
it unassisted. When provenance is genuinely unknown, say `unknown` rather than
guessing — the author interview can resolve it later.

## Contents

| File | Provenance | Chapter | What it produced |
| --- | --- | --- | --- |
| `verification-prompt.md` | `refined/` — appears in ≥3 session files | Ch. 13 | Three correctly-rejected review findings, on the record |
| `coderabbit-agent-prompt.md` | `generated/` — by the reviewer tool, for a coding agent | Ch. 8 | The autofix fixes in Failure Catalogue rows 1–4 |

## Still to extract, when drafting reaches these chapters

Pull from the session files listed in
`consolidated-opus-high/03-EVIDENCE-LEDGER.md` §G:

- The **destructured-parameter-mutation plan document** used as an
  implementation prompt (`CC-D`). Its "do NOT implement" section is the best
  negative-constraint example in the corpus — it is what kept PR #21 from
  doubling in size. High priority for Ch. 10 and Appendix A.
- The **semantic model specification** pasted as a single prompt (`CC-C`
  ~3178–4520), including its explicit exclusions.
- The **architecture-review prompt** that produced the 10-axis grade (`GPT-1`).
- The **IDE-protocol hardening prompt** (`OC-3`) — the six-item review round.
- The **regression-coverage prompt** (`GPT-2`) that became PR #23. Notable
  because a suggested prompt turned directly into a merged PR.
- The **final-report template** used to close out sessions.
