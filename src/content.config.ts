import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Starlight supplies title, description, sidebar, and the rest. The
// extension adds the site's own contract: every page carries a
// description, and synced scripting reference pages are marked so a build
// can tell generated content from authored content.
export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        /**
         * True when the page was produced by scripts/sync-reference.mjs
         * from the field-assist submodule. Generated pages must not be
         * hand-edited.
         */
        generated: z.boolean().default(false),
      }),
    }),
  }),
};
