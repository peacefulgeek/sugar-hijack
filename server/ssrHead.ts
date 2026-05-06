import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildWebsiteJsonLd,
  buildCanonicalUrl,
  SITE_NAME,
  SITE_DESCRIPTION,
  AUTHOR_NAME,
} from '../src/lib/aeo.mjs';

const DEFAULT_OG_IMAGE = 'https://sugar-hijack.b-cdn.net/og-default.webp';
const TWITTER_HANDLE = '@sugarhijack';
const SITE_URL = process.env.SITE_URL || 'https://sugarhijack.com';

export function buildSsrHead(url: string, pageData: any, req: any): string {
  const canonicalUrl = buildCanonicalUrl(req, url);
  const siteUrl = buildCanonicalUrl(req, '');
  const tags: string[] = [];

  // ─── Global meta ───
  tags.push(`<meta charset="UTF-8" />`);
  tags.push(`<meta name="viewport" content="width=device-width, initial-scale=1.0" />`);
  tags.push(`<meta name="theme-color" content="#8B1A1A" />`);
  tags.push(`<link rel="icon" type="image/x-icon" href="/favicon.ico" />`);
  tags.push(`<link rel="apple-touch-icon" href="/apple-touch-icon.png" />`);

  // ─── Article page ───
  if (pageData?.article) {
    const a = pageData.article;
    const articleUrl = buildCanonicalUrl(req, `/articles/${a.slug}`);
    const ogImage = a.hero_url || DEFAULT_OG_IMAGE;
    const publishedAt = a.published_at || new Date().toISOString();
    const modifiedAt = a.updated_at || a.published_at || new Date().toISOString();

    tags.push(`<title>${esc(a.og_title || a.title)} | ${SITE_NAME}</title>`);
    tags.push(`<meta name="description" content="${esc(a.meta_description || a.og_description || '')}" />`);
    tags.push(`<meta name="author" content="${esc(AUTHOR_NAME)}" />`);
    tags.push(`<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`);
    tags.push(`<link rel="canonical" href="${articleUrl}" />`);

    // Open Graph — article
    tags.push(`<meta property="og:type" content="article" />`);
    tags.push(`<meta property="og:title" content="${esc(a.og_title || a.title)}" />`);
    tags.push(`<meta property="og:description" content="${esc(a.og_description || a.meta_description || '')}" />`);
    tags.push(`<meta property="og:image" content="${ogImage}" />`);
    tags.push(`<meta property="og:image:width" content="1200" />`);
    tags.push(`<meta property="og:image:height" content="630" />`);
    tags.push(`<meta property="og:image:alt" content="${esc(a.title)}" />`);
    tags.push(`<meta property="og:url" content="${articleUrl}" />`);
    tags.push(`<meta property="og:site_name" content="${SITE_NAME}" />`);
    tags.push(`<meta property="og:locale" content="en_US" />`);
    tags.push(`<meta property="article:author" content="${esc(AUTHOR_NAME)}" />`);
    tags.push(`<meta property="article:published_time" content="${publishedAt}" />`);
    tags.push(`<meta property="article:modified_time" content="${modifiedAt}" />`);
    if (a.category) tags.push(`<meta property="article:section" content="${esc(a.category)}" />`);
    if (a.tags) (a.tags || []).forEach((t: string) => tags.push(`<meta property="article:tag" content="${esc(t)}" />`));

    // Twitter / X
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
    tags.push(`<meta name="twitter:site" content="${TWITTER_HANDLE}" />`);
    tags.push(`<meta name="twitter:creator" content="${TWITTER_HANDLE}" />`);
    tags.push(`<meta name="twitter:title" content="${esc(a.og_title || a.title)}" />`);
    tags.push(`<meta name="twitter:description" content="${esc(a.og_description || a.meta_description || '')}" />`);
    tags.push(`<meta name="twitter:image" content="${ogImage}" />`);
    tags.push(`<meta name="twitter:image:alt" content="${esc(a.title)}" />`);

    // Pinterest Rich Pins
    tags.push(`<meta name="pinterest:description" content="${esc(a.og_description || a.meta_description || '')}" />`);
    tags.push(`<meta name="pinterest:media" content="${ogImage}" />`);
    tags.push(`<meta property="og:rich_attachment" content="true" />`);

    // Article-specific meta
    tags.push(`<meta name="article:published_time" content="${publishedAt}" />`);
    tags.push(`<meta name="article:modified_time" content="${modifiedAt}" />`);

    // JSON-LD — Article
    const articleLd = buildArticleJsonLd(a, articleUrl);
    tags.push(`<script type="application/ld+json">${JSON.stringify(articleLd, null, 0)}</script>`);

    // JSON-LD — BreadcrumbList
    const breadcrumbLd = buildBreadcrumbJsonLd([
      { name: 'Home', url: siteUrl },
      { name: 'Articles', url: `${siteUrl}/articles` },
      { name: a.title, url: articleUrl },
    ]);
    tags.push(`<script type="application/ld+json">${JSON.stringify(breadcrumbLd, null, 0)}</script>`);

    // JSON-LD — FAQPage (if article has faq)
    if (a.faq && Array.isArray(a.faq) && a.faq.length > 0) {
      const faqLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: a.faq.map((item: any) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      };
      tags.push(`<script type="application/ld+json">${JSON.stringify(faqLd, null, 0)}</script>`);
    }

  } else if (url === '/' || url === '') {
    // ─── Homepage ───
    const homeTitle = `${SITE_NAME} — Break Free From Sugar Addiction`;
    tags.push(`<title>${homeTitle}</title>`);
    tags.push(`<meta name="description" content="${esc(SITE_DESCRIPTION)}" />`);
    tags.push(`<meta name="robots" content="index, follow, max-image-preview:large" />`);
    tags.push(`<link rel="canonical" href="${siteUrl}/" />`);

    // OG
    tags.push(`<meta property="og:type" content="website" />`);
    tags.push(`<meta property="og:title" content="${esc(homeTitle)}" />`);
    tags.push(`<meta property="og:description" content="${esc(SITE_DESCRIPTION)}" />`);
    tags.push(`<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`);
    tags.push(`<meta property="og:image:width" content="1200" />`);
    tags.push(`<meta property="og:image:height" content="630" />`);
    tags.push(`<meta property="og:url" content="${siteUrl}/" />`);
    tags.push(`<meta property="og:site_name" content="${SITE_NAME}" />`);
    tags.push(`<meta property="og:locale" content="en_US" />`);

    // Twitter
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
    tags.push(`<meta name="twitter:site" content="${TWITTER_HANDLE}" />`);
    tags.push(`<meta name="twitter:title" content="${esc(homeTitle)}" />`);
    tags.push(`<meta name="twitter:description" content="${esc(SITE_DESCRIPTION)}" />`);
    tags.push(`<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`);

    // Pinterest
    tags.push(`<meta name="pinterest:description" content="${esc(SITE_DESCRIPTION)}" />`);
    tags.push(`<meta name="pinterest:media" content="${DEFAULT_OG_IMAGE}" />`);

    // JSON-LD — WebSite
    const websiteLd = buildWebsiteJsonLd(siteUrl);
    tags.push(`<script type="application/ld+json">${JSON.stringify(websiteLd, null, 0)}</script>`);

    // JSON-LD — Organization
    const orgLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      sameAs: [
        'https://theoraclelover.com',
      ],
    };
    tags.push(`<script type="application/ld+json">${JSON.stringify(orgLd, null, 0)}</script>`);

  } else if (url.startsWith('/assessment')) {
    // ─── Assessment page ───
    const assessTitle = 'Sugar Dependency Assessment';
    tags.push(`<title>${assessTitle} | ${SITE_NAME}</title>`);
    tags.push(`<meta name="description" content="Take our free Sugar Dependency Assessment to understand your relationship with sugar and get personalized recommendations." />`);
    tags.push(`<link rel="canonical" href="${canonicalUrl}" />`);
    tags.push(`<meta property="og:type" content="website" />`);
    tags.push(`<meta property="og:title" content="${assessTitle} | ${SITE_NAME}" />`);
    tags.push(`<meta property="og:description" content="Take our free Sugar Dependency Assessment to understand your relationship with sugar and get personalized recommendations." />`);
    tags.push(`<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`);
    tags.push(`<meta property="og:url" content="${canonicalUrl}" />`);
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
    tags.push(`<meta name="twitter:site" content="${TWITTER_HANDLE}" />`);
    tags.push(`<meta name="twitter:title" content="${assessTitle} | ${SITE_NAME}" />`);
    tags.push(`<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`);

  } else {
    // ─── Default pages ───
    const pageTitle = getPageTitle(url);
    const pageDesc = getPageDescription(url);
    tags.push(`<title>${esc(pageTitle)} | ${SITE_NAME}</title>`);
    tags.push(`<meta name="description" content="${esc(pageDesc)}" />`);
    tags.push(`<link rel="canonical" href="${canonicalUrl}" />`);
    tags.push(`<meta property="og:type" content="website" />`);
    tags.push(`<meta property="og:title" content="${esc(pageTitle)} | ${SITE_NAME}" />`);
    tags.push(`<meta property="og:description" content="${esc(pageDesc)}" />`);
    tags.push(`<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`);
    tags.push(`<meta property="og:image:width" content="1200" />`);
    tags.push(`<meta property="og:image:height" content="630" />`);
    tags.push(`<meta property="og:url" content="${canonicalUrl}" />`);
    tags.push(`<meta property="og:site_name" content="${SITE_NAME}" />`);
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
    tags.push(`<meta name="twitter:site" content="${TWITTER_HANDLE}" />`);
    tags.push(`<meta name="twitter:title" content="${esc(pageTitle)} | ${SITE_NAME}" />`);
    tags.push(`<meta name="twitter:description" content="${esc(pageDesc)}" />`);
    tags.push(`<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`);
  }

  // ─── Fonts (preloaded from Google Fonts CDN) ───
  tags.push(`<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`);
  tags.push(`<style>
    @font-face {
      font-family: 'Libre Baskerville';
      src: url('https://fonts.gstatic.com/s/librebaskerville/v14/kmKnZrc3Hgbbcjq75U4uslyuy4kn0pNeYRI4CN2V.woff2') format('woff2');
      font-weight: 700;
      font-display: swap;
    }
    @font-face {
      font-family: 'Libre Baskerville';
      src: url('https://fonts.gstatic.com/s/librebaskerville/v14/kmKiZrc3Hgbbcjq75U4uslyuy4kn0qNcaxYaDg.woff2') format('woff2');
      font-weight: 400;
      font-display: swap;
    }
    @font-face {
      font-family: 'DM Sans';
      src: url('https://fonts.gstatic.com/s/dmsans/v14/rP2Hp2ywxg089UriCZOIHQ.woff2') format('woff2');
      font-weight: 400 500;
      font-display: swap;
    }
  </style>`);

  return tags.join('\n  ');
}

function esc(str: string): string {
  return (str || '').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function getPageTitle(url: string): string {
  const map: Record<string, string> = {
    '/articles': 'Articles',
    '/about': 'About The Oracle Lover',
    '/recommended': 'Blood Sugar Resource Library',
    '/privacy': 'Privacy Policy',
    '/assessment': 'Sugar Dependency Assessment',
    '/404': 'Page Not Found',
  };
  // Handle /assessment/:slug
  if (url.startsWith('/assessment/')) return 'Sugar Assessment';
  return map[url] || SITE_NAME;
}

function getPageDescription(url: string): string {
  const map: Record<string, string> = {
    '/articles': 'Browse all articles on sugar detox, blood sugar balance, metabolic health, and breaking free from sugar addiction.',
    '/about': 'Meet The Oracle Lover — intuitive educator, oracle guide, and metabolic health writer dedicated to helping you understand your body\'s signals.',
    '/recommended': 'Curated books, supplements, herbs, TCM formulas, Ayurvedic botanicals, and tools for metabolic health and sugar detachment.',
    '/privacy': 'Privacy policy for sugarhijack.com.',
    '/assessment': 'Take our free Sugar Dependency Assessment to understand your relationship with sugar and get personalized recommendations.',
  };
  return map[url] || SITE_DESCRIPTION;
}
