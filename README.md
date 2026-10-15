# field-docs

Documentation site for FieldAssist, `field-batch`, and `field-play`. Built
with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build),
published as a static site to GitHub Pages.

The published site lives at <https://ngwese.github.io/field-docs/>.

## Layout

- `src/content/docs/` — authored pages. The `guide/` and `cli/` sections are
  written by hand; `scripting/` is generated and must not be edited.
- `src/styles/tokens.css` — the single source of theme tokens.
- `scripts/sync-reference.mjs` — copies the scripting documentation out of the
  `field-assist` submodule into the content collection.
- `scripts/check-links.mjs` — verifies internal links in the built site.
- `openspec/` — OpenSpec specifications and change proposals.

## Local development

Node.js 22.22 or newer is required (see `.nvmrc`).

```bash
git submodule update --init --depth 1 vendor/field-assist
git -C vendor/field-assist sparse-checkout set docs/scripting docs/spec docs/examples
npm install
npm run dev
```

`npm run dev` and `npm run build` run the sync step first, so the scripting
pages are always current with the submodule pin.

## Checks

```bash
npm run check        # astro check: types and content schema
npm run build        # astro build: static output
npm run check:links  # internal link check over the built site
```

All three run in CI before the site is published.

## The scripting reference

The scripting guide and per-module reference are authored in the
[`field-assist`](https://github.com/ngwese/FieldAssist) repository and
consumed here through a submodule. To update the published reference, bump
the submodule pin:

```bash
git -C vendor/field-assist fetch
git -C vendor/field-assist checkout <revision>
git add vendor/field-assist
```

Fix content problems in `field-assist`, not here; the sync step only adds
frontmatter and normalizes links.
