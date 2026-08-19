/**
 * The guides registry. One entry per guide, in sheet order.
 *
 * `published` is the go-live date. A guide with a future date is built but
 * held out of the index, the sitemap, and llms.txt until a rebuild happens on
 * or after that date. The site rebuilds automatically every Monday morning,
 * so a future-dated guide publishes itself. To pull or edit a guide before it
 * goes live, change the file before its Monday.
 *
 * Plain .mjs so astro.config.mjs and pages can both import it.
 */

export const guides = [
  {
    slug: 'marketing-for-architects',
    sheet: 'A-701',
    title: 'Marketing for architects, graded like a submittal',
    line: 'Why marketing decides shortlists, a 20-point self-audit, what to build at every firm size, and an honest DIY path.',
    published: '2026-08-16',
  },
  {
    slug: 'how-precast-gets-specified',
    sheet: 'A-702',
    title: 'How precast gets specified, and where producers fall out of the running',
    line: 'The path from first consideration to a named spec, and what a producer can do at each step to stay in it.',
    published: '2026-08-24',
  },
  {
    slug: 'association-outgrown-single-director',
    sheet: 'A-703',
    title: 'Twelve signs an association has outgrown the single-director model',
    line: 'A board-level checklist for spotting the breaking point before the director resigns, with what to do about each sign.',
    published: '2026-08-31',
  },
  {
    slug: 'general-contractor-website-checklist',
    sheet: 'A-704',
    title: 'The general contractor website, inspected like a jobsite',
    line: 'What an owner’s rep checks before the interview, a 15-point inspection, and the fixes in priority order.',
    published: '2026-09-07',
  },
  {
    slug: 'subcontractor-marketing-bid-list',
    sheet: 'A-705',
    title: 'How subcontractors get on the bid list',
    line: 'The prequalification path from search to shortlist, and the pages that carry a sub through it.',
    published: '2026-09-14',
  },
  {
    slug: 'association-member-retention',
    sheet: 'A-706',
    title: 'Why members leave associations, and the renewal calendar that keeps them',
    line: 'The five real reasons renewals slip and a twelve-month calendar that fixes them before invoice season.',
    published: '2026-09-21',
  },
  {
    slug: 'jobsite-plant-photography-guide',
    sheet: 'A-707',
    title: 'A field guide to jobsite and plant photography',
    line: 'The shot list, the timing, and the habits that give a construction company photography its sales team can use.',
    published: '2026-09-28',
  },
  {
    slug: 'linkedin-for-construction-companies',
    sheet: 'A-708',
    title: 'How construction companies make LinkedIn survive busy season',
    line: 'What to post, who posts it, and a cadence that holds up when the work gets heavy.',
    published: '2026-10-05',
  },
  {
    slug: 'association-sponsorship-programs',
    sheet: 'A-709',
    title: 'Sponsorship programs sponsors actually renew',
    line: 'How to build association sponsorships around value instead of obligation, with a worksheet for pricing the tiers.',
    published: '2026-10-12',
  },
  {
    slug: 'email-marketing-building-products',
    sheet: 'A-710',
    title: 'Email that keeps building products in front of specifiers between projects',
    line: 'The list, the cadence, and the content that keeps a producer remembered without pestering anyone.',
    published: '2026-10-19',
  },
  {
    slug: 'trade-show-marketing-precast-aec',
    sheet: 'A-711',
    title: 'Trade show marketing in the six weeks before, the three days there, and the week after',
    line: 'A timeline for getting paid back on the booth, from pre-show outreach to the follow-up that most exhibitors skip.',
    published: '2026-10-26',
  },
];

/** Guides visible as of the moment the site was last built. */
export function publishedGuides(now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  return guides.filter((g) => g.published <= today);
}

/** Slugs that are still embargoed at build time. */
export function unpublishedSlugs(now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  return guides.filter((g) => g.published > today).map((g) => g.slug);
}
