# Design

## Context

This repository publishes the documentation for FieldAssist,
`field-batch`, and `field-play`. The source material exists but is not
user-facing:

- `field-assist`'s `docs/scripting/` — a scripting guide plus one
  reference page per module, after that repository's
  `split-scripting-reference` change.
- `field-assist`'s `docs/spec/SPEC-*.md` — requirement-voice product
  behavior, useful as authoring source but not as published user
  documentation.
- `field-assist`'s `docs/examples/` — runnable Lua samples.

The site is static and deployed to GitHub Pages as a project site.
Versions at planning time: Astro 7.3.x, Starlight 0.42.x. Astro requires
Node.js 22.22+, which `.nvmrc` and the `engines` field pin.

## Goals / Non-Goals

**Goals:**

- One published site for the user guide, CLI docs, and the scripting
  guide and reference.
- The scripting reference has a single source of truth in `field-assist`
  and is consumed, not re-authored.
- Publishing happens automatically and never ships a broken build.
- One token stylesheet so a future landing page can share the visual
  language.

**Non-Goals:**

- A marketing landing page, landing theme, or marketing copy.
- Documentation versioning (`/v0.25/`, `/latest/`).
- Internationalization.
- Publishing `docs/spec/` as user-facing pages.
- Any change to the FieldAssist product or its Rust workspace.

## Decisions

### 1. Astro with the Starlight integration

**Choice:** Astro with `@astrojs/starlight`, static output.

**Rationale:** Starlight provides the documentation shell — navigation,
search, table of contents, and components — without authoring it. Astro
keeps the output static, matching the repository's no-SSR constraint, and
is the framework a future landing page would share.

**Alternatives considered:**

- A barrel of hand-written Astro pages — reimplements navigation and
  search for no benefit.
- A non-Astro generator — loses the shared-component path a landing page
  would use.

### 2. Submodule plus sparse-checkout, synced into the collection

**Choice:** Add `field-assist` as a git submodule under `vendor/`, limit
it with sparse-checkout to `docs/scripting`, `docs/spec`, and
`docs/examples`, and run a sync step that copies `docs/scripting/` into
`src/content/docs/scripting/` before build and dev.

**Rationale:** A submodule keeps one source of truth and pins a revision.
A submodule cannot point at a subdirectory, so sparse-checkout avoids
materializing the Rust workspace and the vendored `lsqlite` tree.
Starlight reads `src/content/docs/**` and does not read a submodule path
directly, so a copy step is required; copying also provides the place to
attach frontmatter.

**Alternatives considered:**

- Copy the reference in by hand — drifts, which is what the submodule
  prevents.
- Symlink the submodule path into the collection — fragile across
  platforms and tooling.
- Publish the reference as a package — extra release machinery for a
  small content set.

### 3. The sync step adds frontmatter and normalizes links

**Choice:** The sync step copies reference pages, injects the Starlight
`title` each page needs (derived from the module name), and rewrites
reference links to absolute site paths. It does not change headings or
prose; `field-assist` owns those, and its own check enforces them.

**Rationale:** `field-assist` writes links relative to its own
`docs/scripting/` tree. Starlight rewrites a relative `.md` link only
when it appears in paragraph content; a link inside a table cell is left
untouched, and the reference is largely tables. Rewriting to absolute
site paths makes every link resolve from any page and inside tables.
Links that point outside the site (`../spec`, `../../examples`) have no
target, so the sync unwraps them to plain text rather than shipping a
dead link. This is presentation, not content: no meaning changes.

**Alternatives considered:**

- Leave the links as `field-assist` wrote them — table-cell links ship
  broken, which the link check then fails on.
- Fix the links in `field-assist` as absolute site paths — couples the
  source repository to this site's URL and base path.
- Convert the reference tables to non-table layout — rewrites content to
  satisfy a renderer.

### 4. Authored content lives here; specs are not published

**Choice:** The user guide (`guide/`) and CLI docs (`cli/`) are authored
in this repository. The scripting section is generated from the
submodule. `docs/spec/` stays in the submodule as authoring source and is
not published as pages.

**Rationale:** User-voice content has no other home; requirement-voice
specifications would confuse readers as user documentation.

**Alternatives considered:**

- Publish `docs/spec/` as an internals section — deferred; it is
  maintainer material and was not requested.

### 5. One token stylesheet via Starlight `customCss`

**Choice:** Declare colors, type, spacing, and radii once in
`src/styles/tokens.css`, point Starlight's `customCss` at it, and map the
tokens onto Starlight's own custom properties where Starlight requires
its names.

**Rationale:** A future landing page is expected to look modern and
minimal and to share the documentation's visual language. A single token
file makes that possible later without adopting a particular landing
theme now.

**Alternatives considered:**

- Theme Starlight per selector — leaves nothing for a landing page to
  reuse.
- Adopt a third-party Starlight theme — premature; the landing page
  design is not settled.

### 6. Base path configured for the project site

**Choice:** Set `site: 'https://ngwese.github.io'` and
`base: '/field-docs'`, and use base-aware asset handling and
`import.meta.env.BASE_URL` for internal links.

**Rationale:** The site publishes as a GitHub Pages project site from
this repository, served under `https://ngwese.github.io/field-docs/`.
Root-absolute URLs do not resolve there; without `base`, stylesheets and
fonts 404.

**Alternatives considered:**

- A user site at `https://ngwese.github.io` — requires the repository to
  be named `<owner>.github.io`; not the case.
- A custom domain — a routing decision that changes `site` and `base`
  later; links already use base-aware handling.

### 7. Deployment regenerates the synced reference in CI

**Choice:** The deploy workflow checks out the submodule, applies
sparse-checkout, and syncs at build time. The synced pages are not
committed; the content directory they occupy is ignored.

**Rationale:** Regenerating in CI guarantees the published reference
matches the pinned revision. Committing would add reviewability in pull
requests at the cost of a drift check.

**Alternatives considered:**

- Commit the synced pages and never verify — silent staleness, the
  failure this design exists to prevent.

## Open Questions

- Whether the `field-assist` repository rename is in scope, since the
  submodule URL depends on the final repository name.
- Whether to commit the synced reference and add a drift check instead of
  regenerating it in CI.
