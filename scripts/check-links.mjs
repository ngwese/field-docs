// Check internal links in the built site.
//
// Runs after `astro build` over `dist/`. It verifies that every internal
// href or src resolves to a file the build emitted, catching broken
// content links and base-path mistakes that a link checker limited to
// source Markdown would miss.
//
// Usage: node scripts/check-links.mjs

import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const dist = join(root, 'dist');
const base = '/field-docs';

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

/** Map a site path (`/field-docs/guide/`) to the file the build emitted. */
async function resolves(sitePath) {
  let p = sitePath;
  if (p.startsWith(base)) p = p.slice(base.length) || '/';
  p = p.replace(/^\//, '');
  const candidates = [
    join(dist, p),
    join(dist, p, 'index.html'),
    join(dist, `${p}.html`),
    join(dist, p.replace(/\/$/, ''), 'index.html'),
  ];
  for (const c of candidates) {
    if (await exists(c)) return true;
  }
  return false;
}

async function main() {
  if (!(await exists(dist))) {
    console.error('check-links: dist/ not found; run `astro build` first');
    process.exit(1);
  }

  const files = (await walk(dist)).filter((f) => f.endsWith('.html'));
  const errors = [];
  const hrefRe = /\s(?:href|src)="([^"]+)"/g;

  for (const file of files) {
    const html = await readFile(file, 'utf8');
    for (const match of html.matchAll(hrefRe)) {
      const target = match[1];
      // Only internal links; skip anchors, external, data, and mail.
      if (
        target.startsWith('http://') ||
        target.startsWith('https://') ||
        target.startsWith('mailto:') ||
        target.startsWith('data:') ||
        target.startsWith('#')
      ) {
        continue;
      }
      const path = target.split('#')[0].split('?')[0];
      if (path === '') continue;
      if (!(await resolves(path))) {
        errors.push(`${relative(root, file)} -> ${target}`);
      }
    }
  }

  if (errors.length > 0) {
    console.error(`check-links: ${errors.length} broken link(s):`);
    for (const e of errors) console.error(`  ${e}`);
    process.exit(1);
  }

  console.log(`check-links: OK (${files.length} pages)`);
}

await main();
