/**
 * Generates the favicon set and the default OG image from the crosshair mark.
 * Run once (or after swapping in the master SVG): node scripts/generate-assets.mjs
 */
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const mark = (fg, size, pad = 0) => `
<svg width="${size}" height="${size}" viewBox="${-pad} ${-pad} ${64 + 2 * pad} ${64 + 2 * pad}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
      <stop stop-color="#1AB0C4"/>
      <stop offset="1" stop-color="#1296B0"/>
    </linearGradient>
  </defs>
  <g fill="url(#g)">
    <path d="M32 32 L32 14 A18 18 0 0 1 50 32 Z"/>
    <path d="M32 32 L32 50 A18 18 0 0 1 14 32 Z"/>
  </g>
  <circle cx="32" cy="32" r="20" stroke="${fg}" stroke-width="4"/>
  <line x1="32" y1="5" x2="32" y2="59" stroke="${fg}" stroke-width="4" stroke-linecap="round"/>
  <line x1="5" y1="32" x2="59" y2="32" stroke="${fg}" stroke-width="4" stroke-linecap="round"/>
</svg>`;

// Favicon SVG: mark on an ink tile so it reads on light and dark tabs
const faviconSvg = `
<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="10" fill="#0D0F14"/>
  <g transform="translate(8 8) scale(0.75)">
    ${mark('#E8EDF2', 64).replace(/<\/?svg[^>]*>/g, '')}
  </g>
</svg>`;

await writeFile('public/favicon.svg', faviconSvg.trim());

const tile = (size) =>
  sharp(Buffer.from(faviconSvg))
    .resize(size, size)
    .png()
    .toFile(`public/${size === 180 ? 'apple-touch-icon' : size === 512 ? 'icon-512' : `favicon-${size}`}.png`);

await Promise.all([tile(32), tile(180), tile(512)]);

// Default OG image: dark card, faint drafting grid, mark, wordmark, one line.
// TODO: replace with a final designed version once the master SVG arrives.
const og = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#1AB0C4"/>
      <stop offset="1" stop-color="#1296B0"/>
    </linearGradient>
    <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse">
      <path d="M 72 0 L 0 0 0 72" fill="none" stroke="#E8EDF2" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#0D0F14"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect x="36" y="36" width="1128" height="558" fill="none" stroke="#E8EDF2" stroke-opacity="0.18"/>
  <g transform="translate(96 215) scale(3.1)">
    ${mark('#E8EDF2', 64).replace(/<\/?svg[^>]*>/g, '')}
  </g>
  <text x="340" y="298" font-family="Arial Narrow, Arial, sans-serif" font-weight="bold" font-size="96" letter-spacing="12" fill="#E8EDF2">SKYKPI</text>
  <text x="344" y="360" font-family="Courier New, monospace" font-size="26" letter-spacing="4" fill="#A7B0BC">MARKETING + ASSOCIATION MANAGEMENT</text>
  <text x="344" y="400" font-family="Courier New, monospace" font-size="26" letter-spacing="4" fill="#1AB0C4">PRECAST / AEC · FRANKFORT, ILLINOIS</text>
  <text x="1052" y="90" font-family="Courier New, monospace" font-size="24" letter-spacing="3" fill="#1AB0C4">G-000</text>
</svg>`;

await sharp(Buffer.from(og)).png().toFile('public/og-default.png');

console.log('Assets generated: favicon.svg, favicon-32.png, apple-touch-icon.png, icon-512.png, og-default.png');
