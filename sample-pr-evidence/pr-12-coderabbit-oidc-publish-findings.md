**Actionable comments posted: 2**

<details>
<summary>🧹 Nitpick comments (1)</summary><blockquote>

<details>
<summary>.github/workflows/publish.yml (1)</summary><blockquote>

`50-54`: _🔒 Security & Privacy_ | _🔵 Trivial_ | _⚡ Quick win_

**Enforce the checked-in Cargo dependency graph.**

If `Cargo.lock` is tracked, add `--locked` to both commands. This prevents Cargo from resolving and publishing with a changed dependency graph during a release.

Cargo documents `--locked` for deterministic CI builds and fails when the lockfile is missing or needs modification. ([doc.rust-lang.org](https://doc.rust-lang.org/stable/cargo/commands/cargo-metadata.html?utm_source=openai))

<details>
<summary>🤖 Prompt for AI Agents</summary>

```
Verify each finding against current code. Fix only still-valid issues, skip the
rest with a brief reason, keep changes minimal, and validate.

In @.github/workflows/publish.yml around lines 50 - 54, Update the release
workflow’s “Build (release)” and “Test” steps to run Cargo with the --locked
flag, enforcing the checked-in Cargo.lock dependency graph for both build and
test commands.
```

</details>

<!-- cr-comment:v1:071fce93b6671cb93c413793 -->

</blockquote></details>

</blockquote></details>

<details>
<summary>🤖 Prompt for all review comments with AI agents</summary>

```
Verify each finding against current code. Fix only still-valid issues, skip the
rest with a brief reason, keep changes minimal, and validate.

Inline comments:
In @.github/workflows/publish.yml:
- Line 7: Update the publish workflow’s npm-publish job to use a protected
environment configured with required reviewers, disabled self-review, and a v*
tag restriction. Ensure the npm trusted publisher configuration references the
identical environment name so manual dispatches cannot bypass release approval.
- Line 24: Update the publish workflow’s checkout and setup action references to
verified full commit SHAs, and replace floating Node, Rust, and npm toolchain
inputs with reviewed exact versions. Ensure npm is pinned to a version at least
11.5.1 for trusted publishing, while preserving the existing full-SHA pin for
Swatinem/rust-cache.

---

Nitpick comments:
In @.github/workflows/publish.yml:
- Around line 50-54: Update the release workflow’s “Build (release)” and “Test”
steps to run Cargo with the --locked flag, enforcing the checked-in Cargo.lock
dependency graph for both build and test commands.
```

</details>

<details>
<summary>🪄 Autofix</summary>

Fix all unresolved CodeRabbit comments on this PR:

- [ ] <!-- {"checkboxId": "4b0d0e0a-96d7-4f10-b296-3a18ea78f0b9"} --> Push a commit to this branch (recommended)
- [ ] <!-- {"checkboxId": "ff5b1114-7d8c-49e6-8ac1-43f82af23a33"} --> Create a new PR with the fixes

</details>

---

<details>
<summary>ℹ️ Review info</summary>

<details>
<summary>⚙️ Run configuration</summary>

**Configuration used**: Organization UI

**Review profile**: CHILL

**Plan**: Pro

**Run ID**: `d86c6a53-dd1d-4edd-9126-dbf935d30816`

</details>

<details>
<summary>📥 Commits</summary>

Reviewing files that changed from the base of the PR and between 29235fceaf861bd8ca06cce81a7d7bf181f98c7f and 7459684b88b3c3c79ba8b562d44f5cafb717745e.

</details>

<details>
<summary>📒 Files selected for processing (3)</summary>

* `.github/workflows/publish.yml`
* `Cargo.toml`
* `package.json`

</details>

</details>

<!-- This is an auto-generated comment by CodeRabbit for review status -->
**Actionable comments posted: 2**

> [!CAUTION]
> Some comments are outside the diff and can’t be posted inline due to platform limitations.
> 
> 
> 
> <details>
> <summary>⚠️ Outside diff range comments (1)</summary><blockquote>
> 
> <details>
> <summary>.github/workflows/publish.yml (1)</summary><blockquote>
> 
> `73-84`: _🎯 Functional Correctness_ | _🟠 Major_ | _⚡ Quick win_
> 
> **Assert the documented fixture result.**
> 
> Exit code `1` only proves that the binary reported at least one violation. A regression that reports the wrong files, error count, or diagnostics still passes this check and can be published.
> 
> Assert the documented result of 11 errors across 6 files, or invoke an existing golden-output test.
> 
> <details>
> <summary>🤖 Prompt for AI Agents</summary>
> 
> ```
> Verify each finding against current code. Fix only still-valid issues, skip the
> rest with a brief reason, keep changes minimal, and validate.
> 
> In @.github/workflows/publish.yml around lines 73 - 84, Strengthen the “Smoke
> test against fixtures” step to validate the documented fixture result: require
> 11 errors across 6 files, not merely exit code 1. Prefer invoking an existing
> golden-output test if available; otherwise capture and inspect the linter output
> while preserving failure for unexpected exit codes.
> ```
> 
> </details>
> 
> <!-- cr-comment:v1:d2c97a9f80fda2790fc06ff9 -->
> 
> </blockquote></details>
> 
> </blockquote></details>

<details>
<summary>🤖 Prompt for all review comments with AI agents</summary>

```
Verify each finding against current code. Fix only still-valid issues, skip the
rest with a brief reason, keep changes minimal, and validate.

Inline comments:
In @.github/workflows/publish.yml:
- Around line 26-27: Update the publish smoke test before the publish job runs
to assert the documented fixture result: require exactly 11 errors affecting 6
files, in addition to the existing exit-code check. Ensure the publish job
proceeds only when both result counts match.

In `@docs/PUBLISH_TO_NPM.md`:
- Line 108: Update the package.json example in the documentation to use the
tested consumer Node.js minimum for engines.node rather than the publishing
runtime version 26.4.0; if no consumer minimum is supported, remove the engines
field entirely. Keep the example aligned with the current package.json behavior,
which has no engines restriction.

---

Outside diff comments:
In @.github/workflows/publish.yml:
- Around line 73-84: Strengthen the “Smoke test against fixtures” step to
validate the documented fixture result: require 11 errors across 6 files, not
merely exit code 1. Prefer invoking an existing golden-output test if available;
otherwise capture and inspect the linter output while preserving failure for
unexpected exit codes.
```

</details>

<details>
<summary>🪄 Autofix</summary>

Fix all unresolved CodeRabbit comments on this PR:

- [ ] <!-- {"checkboxId": "4b0d0e0a-96d7-4f10-b296-3a18ea78f0b9"} --> Push a commit to this branch (recommended)
- [ ] <!-- {"checkboxId": "ff5b1114-7d8c-49e6-8ac1-43f82af23a33"} --> Create a new PR with the fixes

</details>

---

<details>
<summary>ℹ️ Review info</summary>

<details>
<summary>⚙️ Run configuration</summary>

**Configuration used**: Organization UI

**Review profile**: CHILL

**Plan**: Pro

**Run ID**: `06e20b98-4edd-4e3c-8e1b-abc6b51f3260`

</details>

<details>
<summary>📥 Commits</summary>

Reviewing files that changed from the base of the PR and between 7459684b88b3c3c79ba8b562d44f5cafb717745e and aa699b657c560802c65f36bc3818aba13cec8f3c.

</details>

<details>
<summary>📒 Files selected for processing (4)</summary>

* `.github/workflows/publish.yml`
* `docs/EXTRACT_TO_SEPARATE_REPO.md`
* `docs/INTEGRATION_GUIDE.md`
* `docs/PUBLISH_TO_NPM.md`

</details>

</details>

<!-- This is an auto-generated comment by CodeRabbit for review status -->



