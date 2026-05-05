# The Sugar Detach

> The no-morality, all-biology guide to breaking sugar addiction.

A full-stack SSR content site built on **React 18 + Express + Vite**, designed for deployment on **DigitalOcean App Platform**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router 6, TypeScript |
| Build | Vite 5, esbuild (CJS server bundle) |
| Server | Express 4, Node.js 20+ |
| SSR | `react-dom/server` + Vite manifest asset resolution |
| Styling | CSS custom properties (design tokens), Libre Baskerville + DM Sans |
| Articles | JSON file store (upgradeable to PostgreSQL) |
| CDN | Bunny CDN (configured via `BUNNY_*` env vars) |
| Affiliate | Amazon Associates (tag via `AMAZON_AFFILIATE_TAG`) |
| AI Writing | OpenAI-compatible API (DeepSeek / GPT-4.1) |
| Scheduling | `node-cron` (daily article gen, monthly refresh, ASIN health) |
| Deployment | DigitalOcean App Platform (`.do/app.yaml`) |

---

## Project Structure

```
the-sugar-detach/
├── .do/app.yaml              # DigitalOcean App Platform config
├── server/
│   ├── index.ts              # Express server entry
│   ├── ssr.ts                # SSR renderer (reads Vite manifest)
│   ├── ssrHead.ts            # SEO/AEO head builder
│   └── routes/               # API routes (articles, assessments, sitemap, etc.)
├── src/
│   ├── client/
│   │   ├── App.tsx           # React app with routing
│   │   ├── components/       # Navbar, Footer, ArticleCard, TOC, etc.
│   │   ├── pages/            # HomePage, ArticlePage, AssessmentPage, etc.
│   │   └── styles/tokens.css # Design system tokens
│   ├── cron/                 # Scheduled jobs (article gen, refresh, ASIN check)
│   ├── data/
│   │   ├── articles/         # 30 seeded JSON articles
│   │   ├── assessments.ts    # Quiz data (Sugar Dependency + Glucose Awareness)
│   │   └── product-catalog.ts # Affiliate product library
│   └── lib/                  # DB, Bunny CDN, AEO helpers, quality gate, etc.
├── scripts/
│   ├── build-server.mjs      # esbuild CJS server bundle
│   ├── seed-articles.mjs     # AI article seeder (30 articles)
│   └── start-with-cron.mjs   # Production entry (server + cron)
└── dist/                     # Build output (gitignored)
    ├── client/               # Vite client bundle
    └── index.cjs             # esbuild server bundle
```

---

## Local Development

```bash
# Install dependencies
pnpm install

# Start Vite dev server (client only, with API proxy)
pnpm dev

# Or run the full SSR server in dev mode
pnpm build && pnpm start
```

---

## Production Build

```bash
# Build client (Vite) + server (esbuild CJS)
pnpm build

# Start production server with cron jobs
pnpm start
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```bash
# Required for production
SITE_URL=https://thesugardetach.com
NODE_ENV=production
PORT=3000

# PostgreSQL (optional — falls back to JSON file store)
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# Bunny CDN (add when ready)
BUNNY_API_KEY=
BUNNY_STORAGE_ZONE=the-sugar-detach
BUNNY_CDN_URL=https://the-sugar-detach.b-cdn.net

# Amazon Associates
AMAZON_AFFILIATE_TAG=thesugardetach-20

# AI Writing Engine (OpenAI-compatible)
OPENAI_API_KEY=
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4.1-mini

# Auto article generation cron
AUTO_GEN_ENABLED=true
AUTO_GEN_HOUR=3
AUTO_GEN_MINUTE=0
```

---

## Seeding Articles

```bash
# Generate all 30 seed articles (requires OPENAI_API_KEY)
pnpm seed
```

Articles are stored as individual JSON files in `src/data/articles/`. Each article includes:
- Full body content (1,200–1,800 words)
- SEO metadata (title, meta description, OG tags)
- Structured data (Article JSON-LD)
- Hero image URL (Unsplash → replace with Bunny CDN)
- Tags, category, reading time, word count

---

## Deploying to DigitalOcean

1. Push this repo to GitHub
2. In DigitalOcean App Platform → **Create App** → connect your GitHub repo
3. The `.do/app.yaml` config will be detected automatically
4. Set environment variables in the App Platform dashboard
5. Deploy

The build command is `pnpm build` and the run command is `pnpm start`.

---

## Adding Bunny CDN

When you have your Bunny CDN zone ready:

1. Set `BUNNY_API_KEY`, `BUNNY_STORAGE_ZONE`, and `BUNNY_CDN_URL` in your environment
2. Run `pnpm seed` to regenerate articles with CDN image URLs
3. The `src/lib/bunny.mjs` module handles all uploads

---

## Adding a Custom Domain

Update `SITE_URL` in your environment variables. The server automatically:
- Redirects `www.` → apex domain (301)
- Generates canonical URLs in all structured data
- Updates `sitemap.xml` and `robots.txt`

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with hero, featured article, latest grid |
| `/articles` | Full article archive with search + category filter |
| `/articles/:slug` | Individual article (Archetype D scroll layout) |
| `/assessment` | Sugar Dependency Assessment (10 questions) |
| `/recommended` | Blood Sugar Library (affiliate product catalog) |
| `/about` | About The Oracle Lover |
| `/privacy` | Privacy Policy + Affiliate Disclosure |
| `/sitemap.xml` | XML sitemap |
| `/robots.txt` | Robots + LLM crawl permissions |
| `/llms.txt` | LLM discoverability file |
| `/health` | Health check endpoint |

---

## Author

Written by **The Oracle Lover** — [theoraclelover.com](https://theoraclelover.com)
