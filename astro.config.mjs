// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeBlack from 'starlight-theme-black';

// The site publishes as a GitHub Pages project site from this repository,
// so it is served under `${site}${base}`. Every internal link and asset
// URL must go through the base; root-absolute paths would 404 there.
//
// Type faces are the ones the FieldAssist landing site uses: Hanken
// Grotesk and DM Mono. They are self-hosted through Fontsource (see
// src/styles/tokens.css) rather than Astro's `fonts` API, because
// `starlight-theme-black` installs its own fonts through `updateConfig`
// and replaces the root `fonts` array.
export default defineConfig({
  site: 'https://ngwese.github.io',
  base: '/field-docs',
  integrations: [
    starlight({
      title: 'FieldAssist',
      description:
        'Documentation for reviewing, editing, and processing field-recorded audio.',
      plugins: [
        // Shadcn-inspired theme. It owns the base palette; our tokens.css
        // layers site-specific values on top, including the fonts.
        starlightThemeBlack({
          navLinks: [
            {
              label: 'Download',
              link: 'https://github.com/ngwese/FieldAssist/releases',
            },
          ],
        }),
      ],
      customCss: ['./src/styles/tokens.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/ngwese/FieldAssist',
        },
      ],
      sidebar: [
        {
          label: 'Guide',
          items: [{ autogenerate: { directory: 'guide' } }],
        },
        {
          label: 'Command line',
          items: [{ autogenerate: { directory: 'cli' } }],
        },
        {
          label: 'Scripting',
          items: [{ autogenerate: { directory: 'scripting' } }],
        },
      ],
    }),
  ],
});
