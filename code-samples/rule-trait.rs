// SOURCE: custom-biome-lint/src/rules/rule.rs  @ v0.4.5, 2026-09-07
// CHAPTER: 5 (Rules are pure detectors); referenced by Ch. 6, Ch. 10
//
// WHY THIS EXCERPT: the whole rule contract is five methods. Everything else --
// suppression filtering, extension filtering, printing, caching, severity
// resolution -- belongs to the runner. That is what makes "adding a rule is
// four steps" true, and it is why an AI can follow ADDING_A_RULE.md without
// drifting.
//
// NOTE FOR THE DRAFTER: the doc comments below carry the *reasoning*, not a
// restatement of the code ("`check` receives an already-parsed FileContext
// rather than raw source so that a file is parsed once and every rule shares
// the tree"). That is the reviewability property Ch. 5 is arguing for, visible
// in the artifact itself.

use crate::analyzer::runner::FileContext;
use crate::config::RuleSeverity;
use crate::diagnostics::Violation;

/// A single lint rule.
///
/// `check` receives an already-parsed [`FileContext`] rather than raw source so
/// that a file is parsed once and every rule shares the tree. The path and
/// source are still reachable via [`FileContext::path`] and
/// [`FileContext::source`].
///
/// To add a rule: create `src/rules/my_rule.rs`, implement this trait, register
/// it in [`crate::rules::registry::RuleRegistry::with_all_rules`], and add
/// `fixtures/my_rule/{valid,invalid,suppressed}.js`.
pub trait Rule: Send + Sync {
    /// Kebab-case identifier used in output and in suppression comments.
    fn name(&self) -> &'static str;

    fn description(&self) -> &'static str;

    /// Extensions this rule can analyze, with leading dots (e.g. `[".js", ".jsx"]`).
    fn supported_extensions(&self) -> &'static [&'static str];

    fn check(&self, file: &FileContext) -> Vec<Violation>;

    /// The severity this rule runs at when `ignoreBiomeExtensionRules` has no
    /// entry for it.
    ///
    /// Defaults to [`RuleSeverity::Error`] — every rule is on unless explicitly
    /// turned off. Override with [`RuleSeverity::Off`] for a rule whose
    /// findings are opinionated enough that a consuming repo should have to opt
    /// in, by setting it to `"warn"`/`"error"` in `ignoreBiomeExtensionRules`.
    fn default_severity(&self) -> RuleSeverity {
        RuleSeverity::Error
    }
}

// ---------------------------------------------------------------------------
// VERIFIED 2026-09-07: six rules override default_severity() with
// RuleSeverity::Off --
//   bare-arrow-param-prop-assign, deep-param-prop-assign,
//   no-do-while-statement, no-for-statement, no-while-statement,
//   param-mutating-array-method-call
// The other five inherit Error. That is the "5 on by default / 6 opt-in" split
// in Appendix C, confirmed from source rather than from the README.
//
// The severity RESOLUTION path (registry.rs: resolved_severity ->
// config.severity(rule.name(), rule.default_severity())) is a separate and more
// subtle thing -- see Failure Catalogue row 53 and
// sample-pr-evidence/pr-21-body-severity-design.md. An explicit "off" in config
// must beat a rule's default-on state, and the naive
// severity_override(..).unwrap_or_else(default) would have silently resurrected
// a disabled rule.
