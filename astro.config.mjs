// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync } from 'node:fs';

// The Field Notes index only belongs in the sitemap once it has entries.
const fieldNoteCount = (() => {
  try {
    return readdirSync('./src/content/fieldnotes').filter((f) => f.endsWith('.md')).length;
  } catch {
    return 0;
  }
})();

export default defineConfig({
  site: 'https://skykpi.com',
  trailingSlash: 'ignore',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/contact/thanks/') &&
        !page.includes('/404') &&
        !(fieldNoteCount === 0 && page.includes('/field-notes')),
    }),
  ],
});
