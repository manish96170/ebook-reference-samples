# PR Index — custom-biome-lint, live via `gh pr list` on 2026-09-07

All 37 PRs, #1-37, all MERGED. Real dated timeline: 2026-08-05 -> 2026-08-19.
This replaces the 'reconstruct a dated timeline once' TODO in consolidated-sonnet-medium-oo/09.

**✅ Sanitized 2026-09-07.** PR #8's title originally carried a real internal
Jira-style ticket ID; it now reads `PRIV-1042`, a placeholder. This table is safe
to quote as-is.

Two things that remain true:

- **The real ID is still in PR #8's title on GitHub.** Scrubbing this table did
  not change the public record — that is an open decision (risk #3 in
  `consolidated-opus-high/11-RISKS-SANITIZATION-AND-OPEN-DECISIONS.md`).
- **Re-pulling brings it back.** `gh pr list` returns the real title. Re-run
  `ebook-scrub.py` on anything freshly pulled.

| # | Merged (UTC) | Title | Branch |
| --- | --- | --- | --- |
| 1 | 2026-08-05T11:43:40Z | docs: add installation-at-source guide | `[docs/installation-at-source-guide]` |
| 2 | 2026-08-05T15:06:07Z | fix: hash rule names instead of their concatenated length | `[fix/rule-hash-collision]` |
| 3 | 2026-08-05T15:06:32Z | docs: require git executable alongside cargo for github: install | `[docs/require-git-prereq]` |
| 4 | 2026-08-05T15:44:06Z | ci: add GitHub Actions workflow for build, test, and clippy | `[ci/add-github-actions]` |
| 5 | 2026-08-05T16:46:56Z | ci: add cargo fmt, cargo audit, and cargo deny checks | `[ci/rustfmt-audit-deny]` |
| 6 | 2026-08-07T20:14:48Z | Phase 1: trait cleanup, JSON diagnostics, severity levels, edge-case fixtures, Biome upgrade CI check | `[feature/phase1-trait-cleanup-json-severity]` |
| 7 | 2026-08-07T19:51:16Z | Phase 2: content-hash incremental cache + benchmark harness | `[feature/phase2-content-hash-cache-benchmark]` |
| 8 | 2026-08-08T05:44:45Z | feat: rule-owned autofix via --auto-fix (Phase 3, PRIV-1042) | `[feature/phase3-rule-owned-autofix]` |
| 9 | 2026-08-08T12:45:46Z | feat: lightweight semantic scope/binding layer (future-scope infra, no rule changes) | `[scope-binding-work]` |
| 10 | 2026-08-08T13:02:56Z | docs: catch remaining docs up to the semantic model + fix stale test counts | `[docs/semantic-model-followups]` |
| 11 | 2026-08-08T15:26:55Z | feat: migrate the three existing rules to semantic identifier resolution | `[migrate-rules-to-semantic]` |
| 12 | 2026-08-08T18:47:13Z | Added auto publish to npmjs.com | `[publish-pipeline]` |
| 13 | 2026-08-08T19:03:50Z | fix: remove forced provenance from publishConfig and bump to v0.1.1 | `[fix/npm-publish-provenance]` |
| 14 | 2026-08-08T20:01:37Z | ci: surface npm OIDC exchange error in publish logs | `[ci/oidc-verbose-log]` |
| 15 | 2026-08-13T06:34:18Z | fix: rename suppression marker to avoid Biome collision; improve cache observability (v0.2.0) | `[fix/suppression-marker-and-cache-bug]` |
| 16 | 2026-08-13T07:06:40Z | ci: verify Actions permissions fix | `[ci/verify-actions-permissions-fix]` |
| 17 | 2026-08-13T15:30:48Z | fix: correct Windows path-absoluteness assertion in file_matcher test | `[fix/windows-absolute-path-detection]` |
| 18 | 2026-08-13T16:47:19Z | docs: document the npm trusted-publishing first-publish bootstrap | `[docs/npm-trusted-publishing-bootstrap]` |
| 19 | 2026-08-13T16:51:38Z | chore: release v0.2.1 | `[release/v0.2.1]` |
| 20 | 2026-08-13T17:04:13Z | ci: retry the post-publish registry check with backoff | `[ci/tolerate-npm-registry-propagation-lag]` |
| 21 | 2026-08-14T11:09:25Z | feat: four rules closing the no-param-reassign → noParameterAssign gap (v0.3.0) | `[feat/destructured-param-mutation-rules]` |
| 22 | 2026-08-14T15:10:17Z | feat: ship linux-musl platform packages (arm64 + x64) | `[feat/linux-musl-platform-packages]` |
| 23 | 2026-08-14T15:02:15Z | test: pin semantic scope and binding behaviour against regressions | `[test/semantic-scope-regression-coverage]` |
| 24 | 2026-08-14T16:23:36Z | ci: stop ESLint problem matchers annotating the fixtures smoke test | `[ci/silence-eslint-matcher-annotations]` |
| 25 | 2026-08-14T16:22:04Z | chore: refresh package-lock.json for v0.3.0 | `[chore/refresh-package-lock-v0.3.0]` |
| 26 | 2026-08-15T09:33:49Z | feat: param-mutating-array-method-call - Add rule for mutating array-method calls on parameters | `[feat/param-mutating-array-method-call]` |
| 27 | 2026-08-15T11:34:03Z | fix(fixer): avoid emitting suppressions the formatter would detach | `[docs/write-fix-suppression-placement-bug]` |
| 28 | 2026-08-15T12:52:42Z | feat: add loop-statement ban rules (no-while/no-do-while/no-for) | `[new_loop_rules]` |
| 29 | 2026-08-15T13:01:10Z | chore: release v0.4.0 | `[bump-version-0.4.0]` |
| 30 | 2026-08-16T06:00:19Z | upgrad rust parser  | `[upgrad-rust-parser]` |
| 31 | 2026-08-17T11:35:05Z | feat: add IDE machine-readable contract | `[feat/ide-machine-readable-contract]` |
| 32 | 2026-08-17T16:28:30Z | feat: bump version to 0.4.3 | `[bump-version-0.4.3]` |
| 33 | 2026-08-18T05:51:26Z | fix: resolve Windows absolute paths so CLI emits JSON stdout | `[fix/windows-cli-json-empty-stdout]` |
| 34 | 2026-08-18T05:52:16Z | chore: bump biome git rev to current main (20814601) | `[chore/bump-biome-rev]` |
| 35 | 2026-08-19T05:43:04Z | chore: 🤖 bump version to 0.4.4 | `[bump-version-0.4.4]` |
| 36 | 2026-08-19T06:24:57Z | fix: 🤖 bare Windows drive root resolves to C:/ in root_dir | `[fix/bare-windows-drive-root]` |
| 37 | 2026-08-19T09:47:52Z | fix: 🤖 harden IDE protocol contract (single PROTOCOL_VERSION + Unicode coordinate tests) | `[hardening/ide-contract-review]` |

---

## Addendum — size and review metrics (added 2026-09-07, Opus 5 high pass)

Pulled via `gh api .../pulls/{n}` and `.../pulls/{n}/reviews`. No prior
planning pass had this. Use it to pick which PRs are worth full narrative
length: **review count tracks conceptual difficulty, not diff size**
(PR #27 changed 2 files and drew 15 reviews; PR #28 changed 23 files and drew 2).

`CR` = CodeRabbit reviews, `Hum` = reviews from a human-attributed account
(see the loop-driven-approval caveat in `review-stack-notes.md`).

| # | +ins | -del | files | commits | open (min) | CR | Hum | changes-req |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 36 | 0 | 1 | 1 | 4 | 2 | 0 | 0 |
| 2 | 10 | 3 | 1 | 1 | 189 | 2 | 0 | 0 |
| 3 | 4 | 1 | 1 | 1 | 186 | 1 | 0 | 0 |
| 4 | 54 | 4 | 2 | 2 | 31 | 2 | 0 | 1 |
| 5 | 234 | 60 | 14 | 4 | 51 | 2 | 0 | 1 |
| 6 | 1374 | 317 | 30 | 8 | 67 | 2 | 0 | 1 |
| 7 | 562 | 207 | 7 | 1 | 4 | 0 | 0 | 0 |
| 8 | 1129 | 62 | 14 | 4 | 552 | 4 | 0 | 3 |
| 9 | 1486 | 6 | 11 | 2 | 395 | 2 | 0 | 1 |
| 10 | 17 | 5 | 5 | 1 | 5 | 1 | 0 | 0 |
| 11 | 673 | 355 | 16 | 2 | 57 | 2 | 0 | 1 |
| 12 | 106 | 5 | 6 | 4 | 40 | 5 | 2 | 2 |
| 13 | 4 | 5 | 3 | 1 | 6 | 1 | 0 | 0 |
| 14 | 3 | 1 | 1 | 1 | 19 | 1 | 0 | 0 |
| 15 | 2042 | 375 | 49 | 1 | 733 | 10 | 4 | 4 |
| 16 | 9 | 9 | 3 | 2 | 11 | 0 | 1 | 0 |
| 17 | 16 | 1 | 1 | 1 | 82 | 1 | 0 | 0 |
| 18 | 79 | 0 | 2 | 2 | 31 | 2 | 0 | 1 |
| 19 | 15 | 15 | 9 | 1 | 2 | 1 | 0 | 0 |
| 20 | 20 | 4 | 1 | 1 | 3 | 1 | 0 | 0 |
| 21 | 3950 | 161 | 51 | 7 | 133 | 16 | 13 | 2 |
| 22 | 766 | 137 | 17 | 3 | 237 | 5 | 3 | 1 |
| 23 | 360 | 4 | 3 | 1 | 12 | 1 | 0 | 0 |
| 24 | 21 | 0 | 1 | 1 | 16 | 1 | 0 | 0 |
| 25 | 113 | 3 | 1 | 1 | 8 | 1 | 0 | 0 |
| 26 | 1175 | 22 | 11 | 6 | 690 | 3 | 0 | 2 |
| 27 | 1073 | 48 | 2 | 5 | 117 | 9 | 6 | 2 |
| 28 | 1577 | 871 | 23 | 3 | 46 | 2 | 0 | 1 |
| 29 | 29 | 29 | 12 | 1 | 5 | 1 | 0 | 0 |
| 30 | 841 | 687 | 37 | 8 | 650 | 5 | 0 | 3 |
| 31 | 1775 | 60 | 16 | 6 | 172 | 4 | 0 | 3 |
| 32 | 29 | 29 | 12 | 1 | 23 | 1 | 0 | 0 |
| 33 | 101 | 11 | 1 | 2 | 149 | 2 | 0 | 1 |
| 34 | 27 | 27 | 2 | 1 | 143 | 1 | 0 | 0 |
| 35 | 48 | 29 | 13 | 3 | 11 | 2 | 0 | 0 |
| 36 | 19 | 5 | 1 | 1 | 14 | 1 | 0 | 0 |
| 37 | 138 | 34 | 18 | 2 | 13 | 2 | 0 | 0 |

**Totals:** 19,915 insertions · 3,592 deletions · net 16,323 lines · 398 file-changes ·
99 CodeRabbit reviews · 29 human-attributed reviews · 14 PRs with CHANGES_REQUESTED ·
median 39.6 min open · **PR #7 = zero reviews, 4.4 min open.**

**Reviewer accounts (whole repo):** `coderabbitai[bot]` 99, `anchor-mani` 28,
plus **one third account with a single empty-body approval on PR #16** — confirm
identity and consent with the author before naming it anywhere. See risk #10 in
`consolidated-opus-high/11-RISKS-SANITIZATION-AND-OPEN-DECISIONS.md`.
