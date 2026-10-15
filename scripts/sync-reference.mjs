// Sync the scripting documentation from the field-assist submodule into
// the Starlight content collection.
//
// field-assist owns the reference: links, headings, and content. This step
// only moves it and attaches the frontmatter Starlight needs, so there is
// no second place that has to understand the reference's structure.
//
// Run before `astro dev` and `astro build` (see package.json). The output
// directory is git-ignored; the submodule pin is the source of truth.

import { existsSync } from 'node:fs';

const base = '/field-docs';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const source = join(root, 'vendor', 'field-assist', 'docs', 'scripting');
const dest = join(root, 'src', 'content', 'docs', 'scripting');

/** Derive a page title from a module slug: `field-composition` -> `field.composition`. */
function titleFor(slug) {
  if (slug === 'app') return 'app (host-only)';
  if (slug === 'nested-types') return 'Nested types';
  if (slug.startsWith('field-')) {
    return slug.replace(/^field-/, 'field.');
  }
  return slug;
}

/** Sidebar order: app first, then modules alphabetically, nested types last. */
function orderFor(slug) {
  if (slug === 'app') return 1;
  if (slug === 'nested-types') return 999;
  return 100;
}

async function main() {
  if (!existsSync(source)) {
    console.error(
      `sync-reference: missing ${source}\n` +
        `Run: git submodule update --init --depth 1`
    );
    process.exit(1);
  }

  await rm(dest, { recursive: true, force: true });
  await mkdir(join(dest, 'reference'), { recursive: true });

  // The guide becomes the section index (`scripting/index.md`) so that
  // `/scripting/` resolves to it, with the module pages beside it.
  const guide = await readFile(join(source, 'guide.md'), 'utf8');
  await writeFile(
    join(dest, 'index.md'),
    frontmatter('Scripting guide', 1, rewriteLinks(guide)),
    'utf8'
  );

  const refDir = join(source, 'reference');
  const entries = (await readdir(refDir)).filter((f) => f.endsWith('.md')).sort();

  for (const entry of entries) {
    const slug = entry.replace(/\.md$/, '');
    const body = await readFile(join(refDir, entry), 'utf8');
    await writeFile(
      join(dest, 'reference', entry),
      frontmatter(
        titleFor(slug),
        orderFor(slug),
        rewriteLinks(body)
      ),
      'utf8'
    );
  }

  console.log(
    `sync-reference: wrote scripting guide and ${entries.length} reference pages`
  );
}

/**
 * Rewrite links so they resolve in the built site.
 *
 * `field-assist` writes links relative to its own `docs/scripting/`
 * tree. Starlight only rewrites `.md` links that appear in paragraph
 * content; links inside table cells are left untouched, and links that
 * point outside the site (`../spec`, `../../examples`) have no target.
 *
 * Rewrite every reference link to an absolute site path, which resolves
 * from any page and inside tables, and unwrap links that point outside
 * the site so they render as plain text rather than a dead link.
 */
function rewriteLinks(body) {
  // Strip any trailing `.md`/folder and map a module slug to its page.
  const fix = (target) => {
    if (/^https?:|^mailto:|^#/.test(target)) return target;

    // Links out of the site: keep the words, drop the link.
    if (target.startsWith('../')) return null;

    // A module reference -> its page under scripting/reference/.
    const slug = target
      .replace(/^\.\//, '')
      .replace(/^reference\//, '')
      .replace(/\.md$/, '')
      .replace(/\/$/, '');

    if (slug === 'index' || slug === 'guide') {
      return `${base}/scripting/`;
    }
    return `${base}/scripting/reference/${slug}/`;
  };

  return body.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_full, text, target) => {
    const fixed = fix(target);
    // A link out of the site becomes plain text rather than a dead link.
    return fixed === null ? text : `[${text}](${fixed})`;
  });
}

/** Prepend Starlight frontmatter and drop the source H1 (Starlight renders the title). */
function frontmatter(title, order, body) {
  // `field-assist` pages start with `# ` and then a markdownlint HTML
  // comment. Remove both: the title comes from frontmatter, and the
  // comment is a source-repository lint directive.
  const lines = body.split('\n');
  let i = 0;
  // Drop the source H1.
  if (lines[i] !== undefined && lines[i].startsWith('# ')) i += 1;
  // Drop blank lines and any markdownlint directive that followed it.
  while (i < lines.length && lines[i].trim() === '') i += 1;
  if (i < lines.length && lines[i].startsWith('<!-- markdownlint-disable')) {
    i += 1;
  }
  const rest = lines.slice(i).join('\n').replace(/^\n+/, '');

  return [
    '---',
    `title: ${JSON.stringify(title)}`,
    'generated: true',
    `sidebar:`,
    `  order: ${order}`,
    '---',
    '',
    rest,
  ].join('\n');
}

await main();
