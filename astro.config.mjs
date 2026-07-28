// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync } from 'node:fs';

// Field Notes stays out of both the nav and the sitemap until the first entry
// exists, so the two never disagree about whether the section is ready.
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
      serialize(item) {
        // The sheets are reference pages rather than a news feed. Weight the
        // service sheets above the legal and utility sheets.
        if (item.url === 'https://skykpi.com/') {
          item.priority = 1.0;
          item.changefreq = 'monthly';
        } else if (/\/(marketing|associations)\/$/.test(item.url)) {
          item.priority = 0.9;
          item.changefreq = 'monthly';
        } else if (/\/(architects|contractors|subcontractors)\/$/.test(item.url)) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (/\/field-notes\//.test(item.url)) {
          item.priority = 0.7;
          item.changefreq = 'weekly';
        } else if (/\/privacy\/$/.test(item.url)) {
          item.priority = 0.3;
          item.changefreq = 'yearly';
        } else {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        }
        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
  ],
});
