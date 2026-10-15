# Proposal

## Why

FieldAssist, `field-batch`, and `field-play` have no end-user
documentation. Product behavior lives in requirement-voice specifications
and the Lua surface lives in reference-toned material; neither tells a
reader how to open a take, review it, or run a script, and there is no
published, linkable home for the reference. This repository is the site
that publishes that documentation.

## What Changes

- Build the documentation site with Astro and the Starlight integration,
  rendering to static output.
- Publish the site as a GitHub Pages project site from this repository:
  `site: 'https://ngwese.github.io'`, `base: '/field-docs'`, so
  stylesheets, fonts, and internal links resolve under the base path.
- Consume the FieldAssist scripting documentation through a git submodule
  restricted with sparse-checkout to `docs/scripting`, `docs/spec`, and
  `docs/examples`, and sync `docs/scripting/` into the Starlight content
  collection before build and dev.
- Add the `docs-site` content collection for the site's own pages, with
  frontmatter (title, description, sidebar order) validated by a schema.
- Author the user guide: getting started, opening and playing media, the
  review editor, sessions, and export. Author the CLI section for
  `field-batch` and `field-play`.
- Present the scripting guide plus one page per module as the scripting
  section, sourced from the submodule rather than re-authored.
- Declare the site's colors, type, spacing, and radii once in a token
  stylesheet consumed by Starlight, so a future landing page can share
  the same tokens.
- Deploy on push to the default branch with the official Astro action and
  `actions/deploy-pages`; fail the workflow when `astro check`, the
  build, or a link check fails.

## Capabilities

### New Capabilities

- `docs-site`: The Astro and Starlight site, its content collection and
  frontmatter contract, routing and navigation, the scripting reference
  synced from the submodule, and the theming token layer.
- `docs-content`: The authored user guide and CLI documentation, and what
  a reader can find and do in each section.
- `docs-publishing`: Static build, GitHub Pages project-site deployment,
  base-path correctness, and the build-time gates that block publishing.

### Modified Capabilities

- (none — this repository is new and has no existing specs)

## Impact

- **Routes:** `/` (site index), `/guide/**`, `/cli/**`, `/scripting/**`
  (guide plus module pages synced from the submodule). All are static.
- **Content collections:** new `docs` collection under
  `src/content/docs/`, validated by a schema in
  `src/content.config.ts`. The scripting pages are generated into that
  collection by the sync step and are not hand-edited.
- **Components:** Starlight's layout and navigation; site additions only
  for the token stylesheet and any section index pages. No client-side
  framework is added; the only client JavaScript is what Starlight ships.
- **Compatibility:** the site URL is part of the published interface.
  Moving to a custom domain later changes `site` and `base` and requires
  link review. The synced scripting paths track `field-assist`'s
  documentation structure and break if that layout changes.
- **Assets:** documentation images live under `src/assets` or `public/`
  and follow the LFS policy in `.gitattributes`. No binaries are added by
  this change.
- **Dependencies:** adds Node.js 22.22+, npm, Astro, and Starlight. The
  `field-assist` Rust workspace is unaffected.
- **External:** GitHub Pages and GitHub Actions. The submodule depends on
  the `field-assist` repository being reachable from CI.
