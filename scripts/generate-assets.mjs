/**
 * Generates the default OG image from the brand wordmark.
 * Favicons come straight from the brand package (public/favicon.svg,
 * favicon-32.png, apple-touch-icon.png, icon-512.png) and are not generated.
 * Run after a wordmark change: node scripts/generate-assets.mjs
 */
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const wordmark = await readFile('public/brand/skykpi-wordmark-primary.svg', 'utf8');
// Strip the outer svg tag so the paths can be placed inside the card
const inner = wordmark.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');

// Light card per the August 2026 standards: white sheet, faint drafting grid,
// ink border, primary wordmark, one teal rule. No gradient, no reticle.
const og = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
      <path d="M 72 0 L 0 0 0 72" fill="none" stroke="#0D1B24" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#FFFFFF"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect x="36" y="36" width="1128" height="558" fill="none" stroke="#0D1B24" stroke-opacity="0.85" stroke-width="2"/>
  <g transform="translate(320, 205) scale(1.77)">
    ${inner}
  </g>
  <rect x="322" y="452" width="130" height="6" fill="#2ABFB8"/>
  <text x="322" y="510" font-family="Arial Narrow, Arial, sans-serif" font-size="30" letter-spacing="2" fill="#5C6B75">MARKETING + ASSOCIATION MANAGEMENT</text>
  <text x="322" y="552" font-family="Arial Narrow, Arial, sans-serif" font-size="30" letter-spacing="2" fill="#0D1B24">PRECAST / AEC &#183; FRANKFORT, ILLINOIS</text>
  <text x="1058" y="88" font-family="Courier New, monospace" font-size="24" letter-spacing="3" fill="#5C6B75">G-000</text>
</svg>`;

await sharp(Buffer.from(og)).png().toFile('public/og-default.png');
console.log('og-default.png regenerated (light brand card)');
