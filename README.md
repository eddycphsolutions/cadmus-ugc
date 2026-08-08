# Cadmus UGC — Vercel site

Static marketing portfolio for **Cadmus The Creator**, ported from the WordPress `cadmus-ugc` theme in `cphsolutions-cms`.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- React 19
- Theme CSS/JS/assets from the WordPress theme
- GSAP + ScrollTrigger for motion

## Local development

```bash
cd "/Users/blessingekaadmin/Projects/Cadmus UGC"
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

### Option A — Vercel CLI

```bash
cd "/Users/blessingekaadmin/Projects/Cadmus UGC"
npm install
vercel login
vercel
```

Follow the prompts to link or create a project. Production deploy:

```bash
vercel --prod
```

### Option B — GitHub + Vercel dashboard

1. Initialise git and push this folder to a GitHub repo.
2. In [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Deploy.

No environment variables are required for the static marketing site.

## Content updates

Edit `src/lib/config.ts` for copy, stats, services, and portfolio URLs.

Images live in `public/assets/images/`.

Styles and motion: `public/assets/css/main.css` and `public/assets/js/main.js` (sync from the WordPress theme when needed).

## WordPress vs Vercel

| | WordPress theme | This Vercel site |
|---|---|---|
| Host | CPH VPS multisite | Vercel |
| Portfolio previews | oEmbed/scraped thumbnails | Link cards (add thumbnails in config later) |
| CMS | WordPress | Code/config |

The production WordPress subsite remains the CMS path for CPH clients; this repo is a standalone Vercel-deployable front end.
