/**
 * Generates the default OG image from the brand wordmark: a white card with
 * the Lombard Belz wordmark centered at about 640px wide, nothing else.
 * Favicons come straight from the brand package (public/favicon.svg,
 * favicon-32.png, apple-touch-icon.png, icon-512.png) and are not generated.
 * Run after a wordmark change: node scripts/generate-assets.mjs
 */
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const wordmark = await readFile('public/brand/lombard-belz-wordmark.svg', 'utf8');
// Strip the outer svg tag so the paths can be placed inside the card.
const inner = wordmark.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');

// The wordmark viewBox is 975.5 by 116. Scaled to 640 wide it is 76 tall.
const scale = 640 / 975.5;
const x = (1200 - 640) / 2;
const y = (630 - 116 * scale) / 2;

const og = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#FFFFFF"/>
  <g transform="translate(${x}, ${y}) scale(${scale})">
    ${inner}
  </g>
</svg>`;

await sharp(Buffer.from(og)).png().toFile('public/og-default.png');
console.log('og-default.png regenerated');
