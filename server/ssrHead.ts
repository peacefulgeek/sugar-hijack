import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildWebsiteJsonLd,
  buildCanonicalUrl,
  SITE_NAME,
  SITE_DESCRIPTION,
  AUTHOR_NAME,
} from '../src/lib/aeo.mjs';

const DEFAULT_OG_IMAGE = 'https://the-sugar-detach.b-cdn.net/og-default.webp';

export function buildSsrHead(url: string, pageData: any, req: any): string {
  const canonicalUrl = buildCanonicalUrl(req, url);
  const siteUrl = buildCanonicalUrl(req, '');
  const tags: string[] = [];

  // ─── Article page ───
  if (pageData?.article) {
    const a = pageData.article;
    const articleUrl = buildCanonicalUrl(req, `/articles/${a.slug}`);
    const ogImage = a.hero_url || DEFAULT_OG_IMAGE;

    tags.push(`<title>${a.og_title || a.title} | ${SITE_NAME}</title>`);
    tags.push(`<meta name="description" content="${esc(a.meta_description || a.og_description || '')}" />`);
    tags.push(`<meta name="author" content="${AUTHOR_NAME}" />`);
    tags.push(`<link rel="canonical" href="${articleUrl}" />`);

    // OG
    tags.push(`<meta property="og:type" content="article" />`);
    tags.push(`<meta property="og:title" content="${esc(a.og_title || a.title)}" />`);
    tags.push(`<meta property="og:description" content="${esc(a.og_description || a.meta_description || '')}" />`);
    tags.push(`<meta property="og:image" content="${ogImage}" />`);
    tags.push(`<meta property="og:url" content="${articleUrl}" />`);
    tags.push(`<meta property="og:site_name" content="${SITE_NAME}" />`);
    tags.push(`<meta property="article:author" content="${AUTHOR_NAME}" />`);
    if (a.published_at) tags.push(`<meta property="article:published_time" content="${a.published_at}" />`);
    if (a.tags) tags.push(`<meta property="article:tag" content="${(a.tags || []).join(', ')}" />`);

    // Twitter
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
    tags.push(`<meta name="twitter:title" content="${esc(a.og_title || a.title)}" />`);
    tags.push(`<meta name="twitter:description" content="${esc(a.og_description || a.meta_description || '')}" />`);
    tags.push(`<meta name="twitter:image" content="${ogImage}" />`);

    // JSON-LD
    const articleLd = buildArticleJsonLd(a, articleUrl);
    tags.push(`<script type="application/ld+json">${JSON.stringify(articleLd)}</script>`);

    const breadcrumbLd = buildBreadcrumbJsonLd([
      { name: 'Home', url: siteUrl },
      { name: 'Articles', url: `${siteUrl}/articles` },
      { name: a.title, url: articleUrl },
    ]);
    tags.push(`<script type="application/ld+json">${JSON.stringify(breadcrumbLd)}</script>`);

  } else if (url === '/' || url === '') {
    // ─── Homepage ───
    tags.push(`<title>${SITE_NAME} — Break Free From Sugar Addiction</title>`);
    tags.push(`<meta name="description" content="${esc(SITE_DESCRIPTION)}" />`);
    tags.push(`<link rel="canonical" href="${siteUrl}/" />`);
    tags.push(`<meta property="og:type" content="website" />`);
    tags.push(`<meta property="og:title" content="${SITE_NAME} — Break Free From Sugar Addiction" />`);
    tags.push(`<meta property="og:description" content="${esc(SITE_DESCRIPTION)}" />`);
    tags.push(`<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`);
    tags.push(`<meta property="og:url" content="${siteUrl}/" />`);
    tags.push(`<meta property="og:site_name" content="${SITE_NAME}" />`);
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
    tags.push(`<meta name="twitter:title" content="${SITE_NAME}" />`);
    tags.push(`<meta name="twitter:description" content="${esc(SITE_DESCRIPTION)}" />`);
    tags.push(`<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`);

    const websiteLd = buildWebsiteJsonLd(siteUrl);
    tags.push(`<script type="application/ld+json">${JSON.stringify(websiteLd)}</script>`);

  } else {
    // ─── Default ───
    const pageTitle = getPageTitle(url);
    tags.push(`<title>${pageTitle} | ${SITE_NAME}</title>`);
    tags.push(`<meta name="description" content="${esc(SITE_DESCRIPTION)}" />`);
    tags.push(`<link rel="canonical" href="${canonicalUrl}" />`);
    tags.push(`<meta property="og:type" content="website" />`);
    tags.push(`<meta property="og:title" content="${pageTitle} | ${SITE_NAME}" />`);
    tags.push(`<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`);
    tags.push(`<meta property="og:url" content="${canonicalUrl}" />`);
    tags.push(`<meta property="og:site_name" content="${SITE_NAME}" />`);
  }

  // ─── Fonts (Bunny CDN WOFF2 — placeholder until Bunny is configured) ───
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
      font-family: 'Lato';
      src: url('https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjx4wXiWtFCc.woff2') format('woff2');
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
    '/recommended': 'Blood Sugar Library',
    '/privacy': 'Privacy Policy',
    '/assessment': 'Sugar Dependency Assessment',
    '/404': 'Page Not Found',
  };
  return map[url] || SITE_NAME;
}
