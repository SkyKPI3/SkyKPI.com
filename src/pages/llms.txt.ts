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

Lombard Belz is a marketing and association management firm for the precast concrete and AEC (architecture, engineering, and construction) industries, based in Frankfort, Illinois, USA. By the time a job goes out to bid, the big decisions are already made. Lombard Belz's marketing work gets precast producers and suppliers known to the people making those decisions while there is still time to shape them, with a monthly report of who found the client and what it led to.

## Services

1. Marketing: websites, email, photography, and social media, built as an extension of the client's sales team and scoped to how precast is specified and bought. Core expertise is the precast concrete industry (producers, suppliers, and associate members), extended to the AEC chain around it: architects (https://lombardbelz.com/architects/), general contractors (https://lombardbelz.com/contractors/), and subcontractors (https://lombardbelz.com/subcontractors/). Details: https://lombardbelz.com/marketing/

2. Association management: a full team for one fee, for AEC trade and professional associations that have outgrown the single executive director model. Covers events, membership, sponsors, communications, and board support. Details: https://lombardbelz.com/associations/

## Guides

Working guides with self-audits and checklists. Index: https://lombardbelz.com/guides/

${guideLines}

## Field Notes

Short photo-led notes from the precast plants, jobsites, and association rooms Lombard Belz works in. Index: https://lombardbelz.com/field-notes/

## Facts

- Service area: the United States. The firm is based in Frankfort, Illinois, and the team works from more than one location. Clients are nationwide, not local.
- Client work is confidential. Lombard Belz publishes no client names, case studies, or testimonials.
- Pricing: a single monthly retainer scoped to the work, no hourly billing. Figures come from a scope conversation, not a rate card.
- Lombard Belz does not guarantee a spec, a bid win, or a ranking for anyone. It owns the work that produces them and reports monthly on who found the client and what it led to.
- The firm was founded by a husband and wife, and took on its first two employees in 2026. The client list stays small on purpose, and Lombard Belz turns down work that does not fit.
- Lombard Belz is an assumed name of SkyKPI LLC, the Illinois company that operates the firm.
- Contact: https://lombardbelz.com/contact/. New business hello@lombardbelz.com, association boards boards@lombardbelz.com, press and speaking press@lombardbelz.com.
- About: https://lombardbelz.com/about/
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
