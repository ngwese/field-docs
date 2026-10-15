// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// The site publishes as a GitHub Pages project site from this repository,
// so it is served under `${site}${base}`. Every internal link and asset
// URL must go through the base; root-absolute paths would 404 there.
export default defineConfig({
  site: 'https://ngwese.github.io',
  base: '/field-docs',
  integrations: [
    starlight({
      title: 'FieldAssist',
      description:
        'Documentation for reviewing, editing, and processing field-recorded audio.',
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
