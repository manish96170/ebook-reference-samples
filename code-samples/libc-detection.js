// SOURCE: custom-biome-lint/bin/platform.js  @ v0.4.5, 2026-09-07
// CHAPTER: 18 (The platform matrix, and the one npm can't see)
//
// WHY THIS EXCERPT: this is the best single artifact in the whole project for
// the book's thesis. It is ~30 lines of AI-written JavaScript in which the
// comments carry the entire engineering argument -- the trap, the fallback
// direction, the reason for the fallback direction, and the consequence of
// getting it backwards. A human who cannot read Rust fluently can still audit
// THIS, and that is exactly the reviewability property Part 2 argues for.
//
// THREE THINGS TO PULL OUT IN THE CHAPTER:
//
// 1. THE TRAP. npm's `os`/`cpu` fields cannot express "glibc vs musl", so the
//    launcher has to probe at runtime. The obvious probe is
//    `process.report.getReport().header.glibcVersionRuntime`. The trap is that
//    macOS reports that field as absent too -- for the entirely ordinary reason
//    that macOS has no glibc. Without the `platform !== 'linux'` guard, every
//    Mac resolves to a musl package that was never built for it.
//
// 2. THE FALLBACK DIRECTION IS THE DESIGN DECISION. `null` (report unreadable)
//    resolves to 'glibc', never 'musl'. The stated reason is the good one:
//    glibc Linux is the flavor that worked before musl packages existed, so an
//    inconclusive probe must resolve exactly the way it resolved before this
//    function was written. Guessing 'musl' converts a working install into a
//    missing-package failure. This is "fail toward the previously-working
//    state," and it is worth a callout box.
//
// 3. TESTABILITY WAS DESIGNED IN. The report reader and `env` are injected
//    parameters rather than globals read deep inside, specifically so tests can
//    drive every branch without mutating process state. This is what made
//    Failure Catalogue row 17 possible: deliberately breaking musl key
//    resolution failed 4 of 31 launcher tests. A function that read
//    `process.report` directly could not have been tested that way.
//
// ALSO NOTE the escape hatch (CUSTOM_BIOME_LINT_LIBC) and its stated principle:
// "an explicit override always beats detection." Worth one sentence -- shipping
// a documented override for your own heuristic is an admission that the
// heuristic can be wrong, which is the honest position.

// Escape hatch for a machine where libc detection gets it wrong (a patched or
// stripped `process.report`, an unusual distro). Same spirit as
// CUSTOM_BIOME_LINT_BIN: an explicit override always beats detection.
const LIBC_ENV_VAR = 'CUSTOM_BIOME_LINT_LIBC';

// Reads Node's own account of the libc it is linked against. Returns the
// runtime glibc version string, `''` when the report exists but reports no
// glibc (that is what a musl build looks like), or `null` when the report
// could not be read at all — `process.report` is optional API surface and can
// be missing, patched away by an embedder, or throw. `null` deliberately does
// not mean musl: see `detectLibc`.
function readGlibcVersionReport() {
  try {
    const header = process.report?.getReport()?.header;
    if (!header) {
      return null;
    }
    return header.glibcVersionRuntime ?? '';
  } catch {
    return null;
  }
}

// Returns 'glibc' | 'musl' on Linux, and `null` on every other platform —
// nothing else in this repo ships more than one libc flavor per platform, and
// on macOS `glibcVersionRuntime` is absent for the ordinary reason that macOS
// has no glibc, which must not be read as "musl".
//
// The report reader and env are parameters (not read from globals deep inside)
// so tests can drive every branch without mutating process state.
//
// An unreadable report falls back to 'glibc', never 'musl': glibc Linux is the
// flavor that already worked before musl packages existed, so an inconclusive
// probe must resolve exactly the way it resolved before this function existed.
// Guessing 'musl' would turn a working glibc install into a
// missing-package failure.
function detectLibc(
  platform,
  { env = process.env, readGlibcVersion = readGlibcVersionReport } = {}
) {
  if (platform !== 'linux') {
    return null;
  }

  const override = env[LIBC_ENV_VAR];
  if (override === 'glibc' || override === 'musl') {
    return override;
  }

  const glibcVersion = readGlibcVersion();
  if (glibcVersion === null) {
    return 'glibc';
  }
  return glibcVersion === '' ? 'musl' : 'glibc';
}

function resolvePackageName(platform, arch, libc) {
  const key =
    platform === 'linux' && libc === 'musl'
      ? `${platform}-${arch}-musl`
      : `${platform}-${arch}`;
  return PLATFORM_PACKAGES[key] || null;
}

// The unsupported-platform message is worth quoting too: it names the platform,
// the architecture, the detected libc, lists what IS supported, and points at
// the source-build escape hatch. Compare with what a consumer would otherwise
// see -- a bare MODULE_NOT_FOUND from a missing optional dependency. Ch. 17's
// "a published package is an interface" argument, in one error string.
