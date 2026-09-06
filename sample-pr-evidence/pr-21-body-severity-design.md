Implements `docs/DESTRUCTURED_PARAM_MUTATION_RULES_PLAN.md` in full, and bumps to v0.3.0.

## Why

Biome's `lint/style/noParameterAssign` — enabled in the private app with `propertyAssignment: "deny"` — turns out to reach only **plain identifier parameters**, at **one** level of property depth, in a **parenthesized** parameter list. Everything else the removed ESLint `no-param-reassign` used to catch is now invisible to both tools.

Each of the four gaps was confirmed by direct repro against Biome 2.5.8, not inferred from its docs:

```js
function plainParam(a)      { a = 5; }           // Biome flags
function plainPropAssign(d) { d.token = 'x'; }   // Biome flags
function depthOne(acc, x)   { acc[x] = 1; }      // Biome flags
const bareReassign = d =>   { d = 5; };          // Biome flags

function destrReassign({ b }) { b = 'x'; }        // MISSED → rule 1
function destrProp({ c })     { c.token = 'x'; }  // MISSED → rule 2
const bareProp = d =>         { d.token = 'x'; }; // MISSED → rule 3
function depthTwo(acc, x, y)  { acc[x][y] = 1; }  // MISSED → rule 4
```

## The four rules

| Rule | Catches | Default |
| --- | --- | --- |
| `destructure-default-param-assign` | Reassigning a destructured parameter binding | on |
| `destructure-param-prop-assign` | Property mutation of a destructured parameter, **any depth** | on |
| `bare-arrow-param-prop-assign` | Property mutation through an arrow's unparenthesized single parameter | **off** |
| `deep-param-prop-assign` | Plain-parameter mutation **2+ levels deep** | **off** |

All four share one assignment-target walk and one parameter-shape classifier (`src/rules/param_mutation.rs`); each rule file is an eligibility predicate plus a message.

## New tool capability: `Rule::default_severity()`

Rules 3 and 4 ship off and are opted into per repo:

```json
{ "ignoreBiomeExtensionRules": { "deep-param-prop-assign": "error" } }
```

Resolution goes through a new `PackageConfig::severity(name, default)`, **not** `severity_override`. This is the one non-obvious part of the change: `severity_override` deliberately collapses "no entry" and `"off"` to `None`, which is right for overriding a violation's severity and wrong for deciding whether a rule runs — the plan's suggested `severity_override(..).unwrap_or_else(default)` would have silently resurrected an explicitly-disabled rule at its default severity. There's a regression test pinning that (`config::an_explicit_off_beats_a_default_on`).

## Semantic model: assignment targets are now resolvable

Biome models the identifier being *written to* as `JsIdentifierAssignment` — a different node type from the `JsReferenceIdentifier` used in read positions — so it was previously unresolvable. The builder now records both into the same pending-refs list, and `SemanticModel::resolve_assignment` resolves them with the same two-pass hoisting and shadowing rules as `resolve`. Rule 1 needs this to tell a destructured parameter from a same-named local.

## Verification against the real private app

~4,400 files, private-app commit `<PRIVATE_COMMIT>`, both opt-in rules enabled:

| Rule | Findings | Files | Already carried an eslint `no-param-reassign` disable |
| --- | --- | --- | --- |
| `destructure-default-param-assign` | 4 | 4 | 4 (100%) |
| `destructure-param-prop-assign` | 8 | 7 | 8 (100%) |
| `bare-arrow-param-prop-assign` | 81 | 31 | 75 (92%) |
| `deep-param-prop-assign` | 137 | 34 | 135 (98%) |

**222 of 230 findings (96%) land on a line the private app's own ESLint setup was already suppressing** — the same positional-parity evidence that verified `no-native-map`'s port. The 8 that don't were each read by hand and are all genuine: 5 sit under an inline `/*eslint no-param-reassign: ["error", { "props": false }]*/` that turned ESLint's own check off for that file, and 3 are depth-2 writes in code ESLint wasn't covering.

`deep-param-prop-assign` at 137 vs the plan's ~32 estimate is worth a note: the estimate came from counting existing disable comments bucketed by cause, whereas the rule reports every occurrence and one line can belong to two buckets. The 98% already-suppressed rate is what rules out over-firing as the explanation. 21 lines trip both opt-in rules, consistent with the documented decision to let them fire independently.

## Deliberate deviations from the plan

Tabulated at the top of the plan doc. The two that matter:

- **`severity_override` → `severity`**, per above.
- **Rule 3 does not cover bare *reassignment*.** The plan left this "to decide at implementation time, don't assume symmetry without checking". Checked: Biome **does** flag `d => { d = 5 }`. Only property mutation is missed, so only property mutation is in scope.

Rule names are kebab-case (`destructure-default-param-assign`), not the plan's camelCase — the `Rule` trait requires it, and the plan's own rules 3/4 were already kebab.

## Documented non-goals (unchanged)

No alias tracking (`const local = payload; local.token = 'x'`), no mutating method calls (`payload.items.push(x)` — matches `noParameterAssign`'s own scope), no `--auto-fix` for any of the four, and the rule 3 / rule 4 overlap fires twice by design.

## Tests

`cargo test`: **197 passing** (94 unit, 102 integration, 1 doctest), `cargo clippy --all-targets -- -D warnings` and `cargo fmt --check` clean.

- 28 tests across the four new rule modules, plus `opt_in_rule_overlap` proving both rules report the same line and one marker suppresses both.
- 16 new fixture files (4 rules × valid/invalid/suppressed/edge-cases), each count pinned.
- An end-to-end `cli_behavior` test running the real binary: the same file is clean until `package.json` opts the rule in, then reports.

**Fixture contract changed: 11 errors in 6 files → 52 errors in 10 files.** `publish.yml`'s smoke test asserted the old number and is updated; `ci.yml` only checks the exit code.

Four `valid.js` files carry a `custom-biome-ignore` marker naming the *other* rule of a pair — a near-miss for one rule is often a genuine finding for its sibling — which preserves the property that no `valid.js` reports anything in a whole-directory run.

## Release

Second commit bumps to v0.3.0 via `scripts/set-version.js` (all 8 manifests + `Cargo.lock`). Minor, not patch: rules 1 and 2 are always-on, so a repo upgrading from 0.2.1 can see new findings without changing config — both are opt-outable the usual way. **The `v0.3.0` tag is deliberately not pushed yet**; publishing is gated on this merging.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

