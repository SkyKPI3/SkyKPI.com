import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Field Notes: the short photo-led posts Lombard Belz publishes.
 * One markdown file per entry, with its image beside it in the same folder.
 * See the README for the file format.
 */
const fieldnotes = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/fieldnotes' }),
  schema: ({ image }) =>
    z.object({
      // Optional reference number kept from the LinkedIn post, e.g. "015".
      number: z.string().optional(),
      // Short line used as the page heading and on the index card.
      title: z.string(),
      date: z.date(),
      image: image(),
      imageAlt: z.string(),
    }),
});

export const collections = { fieldnotes };
