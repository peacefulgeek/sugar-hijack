# Sugar Hijack — Post-Launch Submission Checklist

**Domain:** sugarhijack.com  
**Amazon Tag:** `spankyspinola-20`  
**Bunny CDN:** `sugar-hijack.b-cdn.net`  
**Repo:** `peacefulgeek/sugar-hijack`

---

## Pre-Launch (Before DNS Goes Live)

- [ ] Set `SITE_LAUNCH_DATE` env var in Render dashboard to your actual go-live date
- [ ] Set `OPENAI_API_KEY` in Render dashboard (for daily article cron)
- [ ] Set `OPENAI_BASE_URL=https://api.openai.com/v1` in Render dashboard
- [ ] Set `OPENAI_MODEL=gpt-4o-mini` in Render dashboard
- [ ] Confirm `BUNNY_API_KEY=bc90ca4d-ca9a-4449-91fa87d55cd9-c7b3-4a40` is set in Render
- [ ] Confirm `BUNNY_CDN_URL=https://sugar-hijack.b-cdn.net` is set in Render
- [ ] Confirm `AMAZON_AFFILIATE_TAG=spankyspinola-20` is set in Render
- [ ] Confirm `SITE_URL=https://sugarhijack.com` is set in Render
- [ ] Point `sugarhijack.com` DNS A record to Render app IP / CNAME to Render URL
- [ ] Add custom domain `sugarhijack.com` in Render dashboard → Settings → Custom Domains
- [ ] Verify SSL certificate is issued by Render (auto via Let's Encrypt)

---

## Day 1 — Search Engine Submissions

### Google Search Console
- [ ] Go to https://search.google.com/search-console
- [ ] Add property: `https://sugarhijack.com`
- [ ] Verify ownership via DNS TXT record (add to your domain registrar)
- [ ] Submit sitemap: `https://sugarhijack.com/sitemap.xml`
- [ ] Request indexing of homepage: `https://sugarhijack.com`

### Bing Webmaster Tools
- [ ] Go to https://www.bing.com/webmasters
- [ ] Add site: `https://sugarhijack.com`
- [ ] Verify ownership (import from Google Search Console or DNS TXT)
- [ ] Submit sitemap: `https://sugarhijack.com/sitemap.xml`
- [ ] Submit homepage URL for immediate crawl

### You.com
- [ ] Go to https://you.com/submit
- [ ] Submit `https://sugarhijack.com` for YouChat indexing
- [ ] Submit sitemap URL: `https://sugarhijack.com/sitemap.xml`

### Brave Search
- [ ] Go to https://search.brave.com/webmasters
- [ ] Submit `https://sugarhijack.com` for Brave AI Answers indexing
- [ ] Submit sitemap: `https://sugarhijack.com/sitemap.xml`

---

## Day 1 — Social & Rich Media Validation

### Pinterest Rich Pins
- [ ] Go to https://developers.pinterest.com/tools/url-debugger/
- [ ] Validate: `https://sugarhijack.com/articles/sugar-detox-timeline`
- [ ] Confirm `og:type=article`, `og:image`, `pinterest:description` are detected
- [ ] Apply for Rich Pins at: https://help.pinterest.com/en/business/article/rich-pins-overview
- [ ] Select "Article" as the Rich Pin type

---

## Auto-Crawled (No Submission Needed)

These platforms auto-crawl based on your `robots.txt` and `llms.txt`:

| Platform | How It Finds You |
|---|---|
| **Perplexity** | Crawls via `robots.txt` — GPTBot allowed |
| **ChatGPT / SearchGPT** | Crawls via `robots.txt` — GPTBot allowed |
| **Kagi** | Crawls standard web |
| **DuckDuckGo** | Uses Bing index — covered by Bing submission |
| **Claude / Anthropic** | Crawls via `robots.txt` — ClaudeBot allowed |
| **Gemini** | Crawls via `robots.txt` — Google-Extended allowed |

Your `robots.txt` at `https://sugarhijack.com/robots.txt` already allows all major AI crawlers.  
Your `llms.txt` at `https://sugarhijack.com/llms.txt` provides LLM-friendly site summary.  
Your `ai.txt` at `https://sugarhijack.com/ai.txt` provides AI content permissions.

---

## Week 1 — Content & Authority Building

- [ ] Share 3 articles on Pinterest (use article hero images from Bunny CDN)
- [ ] Submit to Reddit communities: r/sugarfree, r/keto, r/metabolichealth (as helpful content, not spam)
- [ ] Post 1 article excerpt on Medium with link back to sugarhijack.com
- [ ] Submit to Flipboard: https://flipboard.com/editor (add RSS feed: `https://sugarhijack.com/sitemap.xml`)
- [ ] Add site to Feedly Source: https://feedly.com/i/subscription/feed/https://sugarhijack.com/sitemap.xml

---

## Week 2 — Amazon Affiliate Verification

- [ ] Log into Amazon Associates at https://affiliate-program.amazon.com
- [ ] Confirm tag `spankyspinola-20` is active and approved
- [ ] Verify at least 3 qualifying sales within 180 days of account creation (Amazon requirement)
- [ ] Spot-check 5 product links on the Recommended page to confirm `?tag=spankyspinola-20` is appended
- [ ] Test: `https://www.amazon.com/dp/1982159227?tag=spankyspinola-20` (The Blood Sugar Solution)
- [ ] Test: `https://www.amazon.com/dp/B00ZVJZ7EO?tag=spankyspinola-20` (Berberine)
- [ ] Test: `https://www.amazon.com/dp/B07CKBV7WX?tag=spankyspinola-20` (Continuous Glucose Monitor)

---

## Month 1 — Technical SEO Audit

- [ ] Run Screaming Frog crawl on `sugarhijack.com` — check for broken links, missing meta
- [ ] Verify all 217 live articles have unique `og:image` pointing to Bunny CDN
- [ ] Check Google Search Console for crawl errors
- [ ] Verify structured data (JSON-LD) with Google Rich Results Test: https://search.google.com/test/rich-results
- [ ] Test one article URL: `https://sugarhijack.com/articles/sugar-detox-timeline`
- [ ] Confirm `Article`, `BreadcrumbList`, `FAQPage` schemas are detected

---

## Ongoing — Cron Health Checks

| Cron Job | Schedule | What It Does |
|---|---|---|
| Article generation | 5×/day (days 1–40), then 1/weekday | Generates new articles via OpenAI |
| Monthly refresh | 1st of each month, 4am | Refreshes top 10 articles |
| Quarterly refresh | Jan/Apr/Jul/Oct 1st, 5am | Deep-refreshes all articles |
| ASIN health check | Quarterly | Verifies Amazon product links still resolve |

- [ ] After 1 week: check Render logs to confirm cron jobs are firing
- [ ] After 1 month: verify new articles are appearing in `/articles`

---

## Confirmed Technical Specs

| Item | Value |
|---|---|
| Amazon Affiliate Tag | `spankyspinola-20` |
| Bunny CDN Zone | `sugar-hijack.b-cdn.net` |
| Bunny Storage Region | New York, US |
| Total Articles | 550 |
| Live Now | 217 |
| Gated (drip) | 333 |
| Drip Schedule | 5/day × 40 days → 1/weekday Mon–Fri |
| No Database | JSON file store (no PostgreSQL/MySQL needed) |
| No Manus Dependencies | All cron/AI via standard OpenAI API |
| Render Config | `render.yaml` in repo root |
