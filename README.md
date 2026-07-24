# Where Abdul Stands

A searchable, sourced guide to Abdul El-Sayed's public positions, in his own
words, published at **[tools4abdul.com](https://tools4abdul.com/cliposition/)**.

> Created by volunteers. Not officially affiliated with or endorsed by the
> Abdul for U.S. Senate campaign. It is not independent fact-checking. Minor errors
> may slip in. For his official positions, refer directly to the campaign's own
> materials.

## Sourcing rule

Every position bullet must trace to a primary source: an official campaign page
or a direct public clip in Abdul's own words. The full policy:

- Every "What he has said" point traces to at least one primary source.
- Nothing is invented, softened, or extrapolated from a clip's theme. A video
  about teachers does not license unrelated education-policy bullets.
- Clips are illustrative (quote + media only). Policy points stay sourced to
  campaign pages, and `source` is the page that actually supports the points
  shown, not the clip that happens to sit above them.
- `additionalSources` is used only when a card's points genuinely come from more
  than one primary page. Every point still traces to one of them, and every
  cited source supports at least one point shown.
- Each cited URL is opened and checked against the text before a bullet ships.
  If a claim cannot be verified, it is omitted.

## Tech

- [Vite](https://vitejs.dev/) + [React 19](https://react.dev/) + TypeScript
- Static build deployed to **GitHub Pages** (custom domain `tools4abdul.com`)
- No backend, no database, no secrets, no cookies
- Privacy-first analytics via [GoatCounter](https://www.goatcounter.com/)
  (open source, no cookies, no personal data)

## Develop

```bash
npm install
npm run dev        # local dev server at http://127.0.0.1:5173/cliposition/
npm run build      # production build to dist/
npm run preview    # preview the production build
npm run check      # typecheck (tsc --noEmit)
npm test           # unit tests (shared/*.test.ts)
npm run verify:clips   # confirm every clip embed still resolves (200)
npm run list:bluesky   # list recent Bluesky video posts for clip research
```

## Structure

```
cliposition/index.html      # app entry (built by Vite)
src/positions/main.tsx      # the app
src/positions/styles.css    # styles
src/positions/thumbnails/   # local clip thumbnails (metadata-stripped)
shared/positions.ts         # the position library (source of truth for content)
shared/slugs.ts             # short-URL slug <-> issue id map
shared/bluesky.ts           # Bluesky oEmbed/iframe helpers
shared/instagram.ts         # Instagram embed helpers
scripts/                    # clip verification + research helpers
docs/clip-catalog.md        # inventory of long-form YouTube sources mined for clips
vite.config.ts              # build config + GitHub Pages / short-URL / hardening plugins
```

## Short URLs

Each position gets a short, shareable link at the apex domain, e.g.
`tools4abdul.com/medicare`. These are static redirect pages generated at build
time (with per-issue link-preview metadata) that deep-link into the app. The
slug map lives in [`shared/slugs.ts`](shared/slugs.ts).

## Analytics

GoatCounter is injected only into the production build (not local dev). It sets
no cookies and collects no personal data. The dashboard lives at
`https://tools4abdul.goatcounter.com`.

## Deployment

Pushing to `main` triggers
[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml),
which runs tests + typecheck + build and publishes `dist/` to GitHub Pages.
