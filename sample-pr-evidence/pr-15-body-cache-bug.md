## Summary

Implements the two bugs (and records a decision for the open question) from `docs/custom-biome-lint-fix-prompt.md`, written up from real integration testing against the private-app monorepo.

**Bug 1 (breaking, fixed as specified):** the suppression marker collided with Biome's own `biome-ignore` prefix. Renamed `biome-ignore-line`/`biome-ignore-next-line` → `custom-biome-ignore-line`/`custom-biome-ignore-next-line` everywhere — source, `--write-fix` output, all fixtures, all docs. Bumped to **v0.2.0** (also fixes a pre-existing `package.json`/`Cargo.toml` version drift: 0.1.2 vs 0.1.1). `MIGRATION_NOTES.md` has a consumer-facing upgrade section with a one-line sed.

**Bug 2 (root-caused — turned out different from the original hypothesis):** reproduced the exact large-run-then-small-overlapping-run sequence. This is **not a cache-correctness bug** — the cache is correctly declining to re-analyze files that are genuinely unchanged and already confirmed clean, which is the whole point of a content-hash cache. The real, fixed defects this exposed:
- The verbose `"N hit(s)"` counter never counted actual cache hits — it counted freshly-analyzed-and-clean files, the opposite of what "hit" implies.
- `filesChecked: 0` was indistinguishable from "0 discovered" (a genuinely bad case) since nothing exposed the cache-skip count. Added `filesCacheSkipped` (JSON) and a `, N skipped via cache` clause in the text summary (shown only when nonzero, so uncached runs read exactly as before).

**Open question (decision recorded, no os/cpu guard added):** while investigating, found `docs/PUBLISH_TO_NPM.md` describes a pre-compiled-binary shipping strategy the project isn't actually using — `package.json` builds from source via `postinstall` (`bin/cli.js` spawns a binary built fresh on the consumer's own machine). Under that actual architecture, the brief's suggested `os`/`cpu` guard would be **actively wrong** — it would block installs on every unlisted platform even though a source build would work fine there. Didn't add it; corrected the doc instead and recorded the build-from-source decision explicitly.

## Test plan
- [x] `cargo test` — 157 tests (88 unit + 68 integration + 1 doctest), all passing, including a new regression test reproducing the exact cache sequence from the brief and 4 new unit tests locking in the summary-line wording
- [x] `cargo clippy --all-targets -- -D warnings` clean
- [x] `cargo fmt --all -- --check` clean
- [x] `cargo deny check` clean
- [x] `./target/release/custom-biome-lint fixtures` — still 11 errors in 6 files (unaffected)
- [x] `grep -rn "biome-ignore-line\|biome-ignore-next-line"` outside `custom-biome-ignore` and the historical fix-prompt doc — zero remaining
- [x] Manually reproduced the original cache sequence and confirmed the new output distinguishes "0 checked, N skipped via cache" from a genuinely empty discovery

No Jira ticket for this work, per the standing process for this repo.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
