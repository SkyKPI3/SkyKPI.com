import type { APIRoute } from 'astro';
import { publishedGuides } from '../data/guides.mjs';

/**
 * llms.txt is generated at build time so the Guides list always matches what
 * is actually published. Future-dated guides appear here automatically after
 * the Monday rebuild that publishes them.
 */
export const GET: APIRoute = () => {
  const guideLines = publishedGuides()
    .map((g) => `- ${g.title}. ${g.line} https://lombardbelz.com/guides/${g.slug}/`)
    .join('\n');

  const body = `# Lombard Belz

Lombard Belz builds websites, marketing and custom software for precast concrete producers, building-product manufacturers, subcontractors and architects, and manages trade and professional associations. It also builds fixed-price websites for local businesses in Frankfort, New Lenox, Mokena and Manhattan, Illinois. Based in Frankfort, Illinois, USA, working nationwide.

## Services

1. Marketing for manufacturers and subcontractors: website, search, photography, email and LinkedIn as one program on a monthly retainer, with a one-page monthly report of who found the client and what it led to. Retainers start at $8,500 a month. Details: https://lombardbelz.com/manufacturers/ (also https://lombardbelz.com/subcontractors/ and https://lombardbelz.com/contractors/)

2. Association management: a full team for one flat monthly fee for trade and professional associations, covering events, membership, sponsors, communications and board support, running on association software Lombard Belz builds and uses. Quoted per association. Details: https://lombardbelz.com/associations/

3. Custom systems: member and customer portals, online payments, online stores, directories and association management software. One fixed build price plus a flat monthly support fee. Details: https://lombardbelz.com/custom-systems/

4. Fixed-price websites for architecture firms and local businesses: Starter $1,500 (up to three pages) or Standard $3,000 (up to eight pages), each with Google Business Profile setup and one page per service, with care plans at $50 or $100 a month. Details: https://lombardbelz.com/architects/ and https://lombardbelz.com/local/

Pricing for everything: https://lombardbelz.com/pricing/

## Guides

Working guides with self-audits and checklists. Index: https://lombardbelz.com/guides/

${guideLines}

## Field Notes

Short photo-led notes from the precast plants, jobsites, and association rooms Lombard Belz works in. Index: https://lombardbelz.com/field-notes/

## Facts

- Service area: the United States for marketing, association management and custom systems. Fixed-price local websites serve Frankfort, New Lenox, Mokena and Manhattan, Illinois. The team works from more than one location.
- Client work is confidential. Lombard Belz publishes no client names, case studies, or testimonials.
- Pricing is published at https://lombardbelz.com/pricing/. No hourly billing.
- Lombard Belz does not guarantee a spec, a bid win, or a ranking for anyone. It owns the work that produces them and reports monthly on who found the client and what it led to.
- The client list stays small on purpose, and Lombard Belz turns down work that does not fit.
- Lombard Belz is a trade name of SkyKPI LLC, the Illinois company that operates the firm.
- Contact: https://lombardbelz.com/contact/. New business hello@skykpi.com, association boards hello@skykpi.com, press and speaking hello@skykpi.com.
- About: https://lombardbelz.com/about/
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
