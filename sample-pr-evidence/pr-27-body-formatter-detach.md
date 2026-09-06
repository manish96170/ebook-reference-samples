# PR #27 — the formatter-detachment bug (verbatim body)

**Pulled live via `gh api repos/anchor-os/custom-biome-lint/pulls/27` on 2026-09-07.**
Merged 2026-08-15T11:34:03Z. Branch `docs/write-fix-suppression-placement-bug`.
1,073 insertions / 48 deletions across **2 files**, 5 commits, **15 reviews**
(9 CodeRabbit + 6 author) — the highest review-to-file ratio in the project.

Upgrades Failure Catalogue rows **7, 8, 9** (and row 56 in the
"good design decisions" section) from *absent* to **Confirmed verbatim**.
This bug appears in **no** planning pass except Gemini's, and the prior
consolidation dropped it entirely.

---

## Body, verbatim

> ## Summary
> Implements the bug report in `docs/WRITE_FIX_SUPPRESSION_PLACEMENT_BUG.md`. `--write-fix` previously chose trailing comment placement based only on the violation line's lexical end being code. A downstream `biome check --write` reprints multi-line statements and can move a trailing comment's trivia onto a different physical line, silently detaching the suppression so the rule fires again with no error.
> 
> Three fixes in `src/fixer.rs`:
> - **Statement-boundedness**: a trailing comment is now only used when the smallest enclosing statement starts and ends on the violation line; otherwise own-line placement is used (which is formatter-stable).
> - **JSX ancestry**: `JsxText::contains` now walks tree ancestry instead of byte-range containment, so a plain-JS arrow body passed as a JSX attribute value (e.g. `onReady={toolbar => {...}}`) is no longer given the inert `{/* ... */}` marker form — it gets a normal `//` comment.
> - **Circular adjacency** (Case 4): when a foreign suppression comment (`biome-ignore`, `eslint-disable`, or another `custom-biome-ignore`) already occupies the line directly above a single-line target, trailing is preferred; for multi-line targets it is reported as `Unfixable` rather than writing a broken result.
> 
> ## Test plan
> - Added 7 fixer unit tests covering the documented Cases 1–4, the single-line-inside-multi-line-arrow shape, and the genuine-JSX-child contrast case.
> - Full suite passes (`cargo test` → 126 passed) and `cargo clippy --all-targets` is clean.
> 
> ## Notes
> The plan's tertiary recommendation (self-verify the result against Biome's own formatter) is intentionally deferred as a separate, larger change — it requires pulling in or shelling out to Biome's formatter, which is not a current dependency.
> 
> 🤖 Generated with [Claude](https://claude.com/claude-code)

---

## ✅ Already redacted — 2026-09-07

The JSX-ancestry bullet above originally quoted a **real JSX prop name from the
private consumer codebase**. It has been replaced with the neutral `onReady`,
which preserves the only thing that matters technically: a plain-JS arrow body
passed as a JSX **attribute** value (as opposed to a JSX *child*). That
distinction is the whole point of the bug, and it survives the substitution
intact:

```jsx
<Toolbar onReady={toolbar => { /* ... */ }} />
```

So this body is safe to quote as-is. **Two cautions if you re-pull it:**

- Running `gh api .../pulls/27` again will return the **real** prop name. Re-run
  the scrub (`ebook-scrub.py`) on anything freshly pulled.
- The real name is still in the PR body **on GitHub**. Scrubbing our copy does
  not change the public record.

## Why this is a top-tier chapter beat (Ch. 7)

It is the only bug in the whole catalogue where **the tool was correct and the
world moved underneath it.** Every other failure is a logic error, a wrong
assumption, or a missing check. Here the emitted suppression was textually
correct at the moment it was written, and a *different tool* — the formatter the
project is built to complement — invalidated it afterwards by reprinting the
enclosing statement. The rule then fired again, **with no error and no warning**.

Three things make it worth full narrative length:

1. **The failure is silent and self-inflicted by the ecosystem.** A developer
   runs `--write-fix`, then runs `biome check --write` as they always do, and the
   suppression they just added stops working. Nothing reports anything.
2. **The fix is a shift in what the code models.** Trailing placement was chosen
   from a purely *lexical* fact (the violation line ends in code). The fix
   requires modelling a *structural* fact (does the smallest enclosing statement
   begin and end on this line?) and, separately, a *tree* fact (JSX ancestry, not
   byte-range containment). Two different "the obvious check is the wrong check"
   moments in one PR — which is exactly Ch. 7's argument.
3. **The refusal case is the mature part.** Case 4 does not attempt a clever
   placement when the line above is already occupied by a foreign suppression on
   a multi-line target. It returns `Unfixable`. That is Ch. 9's "skip rather than
   guess" principle showing up in a second, independent subsystem — evidence
   that it was a real design principle, not a one-off in the autofix path.

## The deferral is also material — Failure Catalogue row 56

The Notes section declines the plan's own tertiary recommendation (self-verify
the result against Biome's formatter) *and states the reason*: it would require
pulling in or shelling out to a formatter that isn't a dependency. Knowing which
correct suggestion **not** to implement now, and documenting why rather than
silently dropping it, is a senior judgment call. Use it as a counterweight entry.

## Two numbers to handle carefully

- **"126 passed."** Three days after PR #15's body claimed 157, and today's
  source contains 294 `#[test]` functions. This is the third mutually
  incompatible test count in the record. Do not build a growth curve from these.
  See `consolidated-opus-high/03-EVIDENCE-LEDGER.md` §B.
- **"7 fixer unit tests."** Verifiable — count them at the frozen edition SHA
  before printing.

## Also pull, when drafting Ch. 7

`docs/WRITE_FIX_SUPPRESSION_PLACEMENT_BUG.md` in the repo — the bug report this
PR implements, with the documented Cases 1–4. Gemini's pass claims it records a
real monorepo rollout in which **9 of 218 findings** were silently detached.
That figure is unverified here: read the doc and confirm it before quoting, and
note that a real-rollout statistic may itself carry internal context that needs
scrubbing.
