# Code samples — reference for drafting

Small, real excerpts from `anchor-os/custom-biome-lint`, pulled 2026-09-07 at
package version **0.4.5**. These exist so a drafting session can check an
implementation detail without cloning the repo or guessing.

**Sanitized 2026-09-07.** These files come from the **public** repository and
carry no internal identifiers. Nothing here needs redaction before it reaches
the manuscript.

**Rules for this folder**

- **Excerpts, never whole files.** If a chapter needs a whole file, it goes in
  the *public companion repo* as a teaching version, not here.
- The repo's own licence governs this code. State that in the book's front
  matter before reproducing any of it.
- **Re-verify against the repo at the frozen edition SHA before print** — these
  are a snapshot and the repo moves. This is the live risk with these files, not
  privacy.
- If you pull a *new* excerpt, check it: source files can contain a real internal
  path in a comment or a test fixture. Run
  `ebook-scrub.py --dry` over anything freshly copied in.

## One thing worth noticing before you draft from these

**The AI-written code documents its own reasoning, in the comments, at the exact
point of decision.** Look at `libc-detection.js` below: the comment explains
why an inconclusive probe must fall back to `glibc` and never `musl`, and it
gives the consequence ("guessing 'musl' would turn a working glibc install into
a missing-package failure"). Look at `rule-trait.rs`: the doc comment explains
*why* `check` receives a parsed `FileContext` rather than raw source.

That is a real, checkable, and slightly surprising observation about this
project, and it belongs in the book — probably in Ch. 5 and Ch. 18. When a
human can't read the implementation language fluently, comments that carry the
*reasoning* rather than restating the code are the difference between reviewable
and unreviewable. Whether that happened by instruction or by accident is a
question for the author interview.

## Contents

| File | Source path | Chapter | What it shows |
| --- | --- | --- | --- |
| `rule-trait.rs` | `src/rules/rule.rs` | Ch. 5 | The five-method `Rule` trait, and the `default_severity()` default that makes 5-on/6-off possible |
| `libc-detection.js` | `bin/platform.js` | Ch. 18 | The glibc-vs-musl probe, the macOS trap, and the deliberate fallback direction |
| `biome-pin.toml` | `Cargo.toml` | Ch. 2 | The four-crate single-rev git pin and its reasoning comment |
