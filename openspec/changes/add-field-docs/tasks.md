# Tasks

## 1. Astro and Starlight scaffold

- [x] 1.1 Scaffold an Astro project with the Starlight integration and
      TypeScript; verify `astro dev` serves a page and `astro build`
      emits static output
- [x] 1.2 Pin Node.js 22.12+ (`.nvmrc`) and the package manager, and add
      `.gitignore` for `node_modules`, build output, and the synced
      scripting content directory; verify a fresh install reproduces the
      toolchain
- [x] 1.3 Configure `astro.config.mjs` with
      `site: 'https://ngwese.github.io'` and `base: '/field-docs'` and
      set the site title and description; verify a build succeeds
- [x] 1.4 Add the token stylesheet and wire it through Starlight's
      `customCss`; verify a token change alters every page

## 2. Submodule and sync

- [x] 2.1 Add the `field-assist` repository as a git submodule under
      `vendor/`; verify `git submodule status` reports the pin
- [x] 2.2 Configure sparse-checkout for `docs/scripting`, `docs/spec`,
      and `docs/examples`; verify `crates/` and the vendored `lsqlite`
      tree are absent after update
- [x] 2.3 Write the sync script that copies `docs/scripting/guide.md`
      and `docs/scripting/reference/*.md` into the `docs` content
      collection, injects a `title` per page derived from the module
      name, and normalizes reference links to absolute site paths;
      verify the copied pages validate against the content schema
- [x] 2.4 Wire the sync into the dev and build scripts; verify a fresh
      clone plus build produces the scripting pages
- [x] 2.5 Confirm `field-assist`'s `split-scripting-reference` change has
      landed and pin a revision containing it; verify the sync finds the
      guide and every reference page

## 3. Content collection and navigation

- [x] 3.1 Define the Starlight content collection and the frontmatter
      schema (title, description, sidebar order, generated); verify
      validation fails on a page missing its title
- [x] 3.2 Add the site index and section indexes for guide, CLI, and
      scripting; verify navigation reaches each section
- [x] 3.3 Confirm the synced scripting pages are covered by the schema
      and appear in navigation in module order; verify every module is
      reachable

## 4. Authored user documentation

- [x] 4.1 Write Getting started (install, first launch, open a file,
      play); verify the steps match the application as shipped
- [x] 4.2 Write the review editor page (waveform, regions, markers,
      grouping); verify terminology matches the product UI
- [x] 4.3 Write the sessions page (contents, open, save, documents);
      verify terminology matches the session behavior
- [x] 4.4 Write the export page (formats, destination behavior); verify
      the formats listed match the supported set
- [x] 4.5 Write the CLI section: `field-batch` (REPL, script file,
      arguments, shebang) and `field-play` (composition or media,
      options); verify each example command is valid
- [x] 4.6 Add any screenshots or diagrams under `src/assets`, with alt
      text and LFS tracking where required; verify the asset pipeline
      optimizes them and no binary is committed without LFS. The first
      release ships no images beyond the favicon; LFS tracking is in
      place for images and media.

## 5. Scripting section

- [x] 5.1 Present the synced scripting guide as the section introduction;
      verify its links resolve on the built site
- [x] 5.2 Verify each module page renders with a title, appears in
      navigation, and is reachable from the section index
- [x] 5.3 Report any reference link that does not resolve to
      `field-assist` rather than patching it here; verify the sync stays a
      presentation step (frontmatter and link normalization only). Links
      out of the site (spec, examples) are unwrapped to plain text.

## 6. Publishing

- [ ] 6.1 Set the repository Pages source to GitHub Actions; verify the
      setting is reported by the repository
- [x] 6.2 Add the deploy workflow using `actions/deploy-pages`,
      checking out the submodule and applying sparse-checkout before the
      sync and build; verify the workflow definition is well formed
- [x] 6.3 Verify `site` and `base` match
      `https://ngwese.github.io/field-docs/` and that stylesheets, fonts,
      and internal links resolve with no root-absolute 404s
- [x] 6.4 Add a link check over the built site and a step that fails the
      workflow on a broken internal link; verify a deliberate broken link
      blocks the deploy
- [ ] 6.5 Trigger the workflow; verify the site publishes and the
      scripting pages match the pinned submodule revision

## 7. Gates

- [x] 7.1 Run `astro check`; verify no errors and no warnings
- [x] 7.2 Run `astro build`; verify no errors and static output for every
      route. Starlight logs two upstream informational warnings (an empty
      `i18n` collection lookup and an optional custom-404 lookup) that a
      stock Starlight project also emits; they are not build failures.
- [x] 7.3 Run the link check over the built site; verify it passes
- [ ] 7.4 Verify keyboard navigation and image alt text on the guide,
      CLI, and scripting sections
- [x] 7.5 Verify a fresh clone plus the documented setup reproduces the
      site and that the submodule pin is recorded in the repository
