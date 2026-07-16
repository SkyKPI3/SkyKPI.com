# skykpi.com

The SkyKPI website. Built with [Astro](https://astro.build), deployed on Netlify. No CMS, no client-side framework, no cookies, no analytics scripts.

Everything below is written for the exact toolchain in use: **VS Code, GitHub, and Netlify**.

The site lives in the GitHub repository **SkyKPI3/SkyKPI.com** (the same one the old site used), and that repository is connected to Netlify, which already serves skykpi.com with the custom domain, the www redirect, and HTTPS in place. The working copy on this Mac is at `~/Documents/GitHub/SkyKPI.com`.

---

## 1. Publishing a change

1. Open `~/Documents/GitHub/SkyKPI.com` in VS Code: File > Open Folder.
2. Edit what you need (page copy lives in `src/pages/`, one file per page).
3. Click the **Source Control** icon in the left sidebar (the branching lines), type a short note about what you changed, and click **Commit**.
4. Click **Sync Changes** (or use GitHub Desktop: Commit, then Push origin).
5. Netlify sees the push and republishes skykpi.com automatically in a couple of minutes. Watch it under **Deploys** in the Netlify dashboard if you are curious.

If a deploy ever goes wrong, open the Netlify dashboard > Deploys, click the last good deploy, and choose **Publish deploy**. The site rolls back instantly.

## 2. One-time checks in the Netlify dashboard

### The contact form

1. In the site's Netlify dashboard go to **Forms** and click **Enable form detection**, then trigger one more deploy (Deploys > Trigger deploy > Deploy site).
2. Under Site configuration > Notifications > **Form submission notifications**, add an **Email notification** pointed at `hello@skykpi.com` (or whichever inbox should get inquiries) for the form named `contact`.
3. Test it: submit the live form yourself. You should land on the "Received." page and get the email.

### Domain and HTTPS

Already configured (skykpi.com is live on Netlify with HTTPS and the www redirect). Nothing to do unless you change registrars.

## 4. After launch: Google Search Console

1. In [Google Search Console](https://search.google.com/search-console), open the skykpi.com property.
2. Go to **Sitemaps**, remove any old sitemap entry, and submit `https://skykpi.com/sitemap-index.xml`.
3. Use **URL Inspection** on the homepage and each main page (`/marketing/`, `/associations/`, `/about/`, `/contact/`, `/architects/`, `/contractors/`, `/subcontractors/`) and click **Request indexing** for each.
4. Old `.html` addresses from the previous site redirect automatically (see `netlify.toml`), so indexed links keep working.

## 5. Running the site on your own Mac (optional)

Node.js is installed at `~/.local/node` on the machine this was built on. In the VS Code terminal:

```sh
export PATH="$HOME/.local/node/bin:$PATH"
npm install        # first time only
npm run dev        # then open http://localhost:4321
```

`npm run build` produces the production site in `dist/` if you want to check a build locally. You never need to upload `dist/` anywhere; Netlify builds it from GitHub.

## Project map

```
src/
  layouts/Sheet.astro      shared page frame: header, sheet tag, title-block footer
  components/              Mark (logo), RegistrationMarks, Faq
  pages/                   one file per page (index = Home A-100)
  styles/global.css        colors, type, sheet furniture
  assets/photos/           cleared photos (see PHOTOS.md for the full manifest)
public/                    favicon set, robots.txt, llms.txt, OG image
netlify.toml               build settings, redirects, security headers
scripts/generate-assets.mjs  regenerates favicons + OG card from the mark
```

## House rules baked into the site

- No client names, case studies, or testimonials anywhere. `PHOTOS.md` records which photos were skipped for confidentiality and why.
- No analytics, no cookies. If analytics are ever wanted, enable **Netlify Analytics** in the dashboard (server-side, cookieless); the privacy policy already allows for that and nothing in the code needs to change.
- The logo is a placeholder SVG recreation. When the master SVG is ready, replace the drawing in `src/components/Mark.astro` and in `scripts/generate-assets.mjs`, then run `node scripts/generate-assets.mjs` to refresh favicons and the OG image.
