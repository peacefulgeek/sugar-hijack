import { getAllPublished } from './articles-store.mjs';

const SITE_NAME = 'The Sugar Detach';
const SITE_DESCRIPTION = 'The no-morality, all-biology guide to breaking sugar addiction — what glucose does to your brain, your metabolism, and your cravings, and the protocol that actually interrupts the cycle.';
const AUTHOR_NAME = 'The Oracle Lover';
const AUTHOR_URL = 'https://theoraclelover.com';

export function buildRobotsTxt(req) {
  const host = req?.hostname || 'thesugardetach.com';
  const protocol = req?.protocol || 'https';
  return `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Anthropic-AI
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: YouBot
Allow: /

Sitemap: ${protocol}://${host}/sitemap.xml
Sitemap: ${protocol}://${host}/news-sitemap.xml

# LLM Discovery
# llms.txt: ${protocol}://${host}/llms.txt
# llms-full.txt: ${protocol}://${host}/llms-full.txt
`;
}

export async function buildLlmsTxt() {
  const articles = await getAllPublished();
  const recent = articles.slice(0, 20);

  return `# ${SITE_NAME}

> ${SITE_DESCRIPTION}

## About

${SITE_NAME} is written by ${AUTHOR_NAME}, an intuitive educator and oracle guide. The site covers sugar addiction, metabolic reset, glucose management, and breaking the glucose rollercoaster — from a no-morality, all-biology perspective.

## Author

${AUTHOR_NAME} — ${AUTHOR_URL}

## Recent Articles

${recent.map(a => `- [${a.title}](/articles/${a.slug})`).join('\n')}

## Key Topics

- Sugar addiction neuroscience and dopamine
- Glucose spikes and metabolic health
- Insulin resistance and metabolic syndrome
- Practical detox protocols
- Emotional eating and stress-cortisol cycles
- Sleep, exercise, and glucose management
- Evidence-based supplement guidance

## Health Disclaimer

${SITE_NAME} is for educational purposes only. Metabolic conditions including diabetes and prediabetes require medical management. Consult your healthcare provider before making significant dietary changes.
`;
}

export async function buildLlmsFullTxt() {
  const articles = await getAllPublished();
  const lines = [`# ${SITE_NAME} — Full Article Index\n`];
  for (const a of articles) {
    lines.push(`## ${a.title}`);
    lines.push(`URL: /articles/${a.slug}`);
    lines.push(`Category: ${a.category || 'general'}`);
    lines.push(`Tags: ${(a.tags || []).join(', ')}`);
    lines.push(`Published: ${a.published_at}`);
    lines.push('');
  }
  return lines.join('\n');
}

export function buildCanonicalUrl(req, path = '') {
  const host = req?.hostname || 'thesugardetach.com';
  const protocol = 'https';
  return `${protocol}://${host}${path}`;
}

export function buildArticleJsonLd(article, canonicalUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.meta_description || article.og_description,
    image: article.hero_url,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: canonicalUrl.split('/articles')[0],
    },
    datePublished: article.published_at,
    dateModified: article.updated_at || article.published_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    wordCount: article.word_count,
    articleSection: article.category,
    keywords: (article.tags || []).join(', '),
  };
}

export function buildBreadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildWebsiteJsonLd(siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: siteUrl,
    author: {
      '@type': 'Person',
      name: AUTHOR_NAME,
      url: AUTHOR_URL,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/articles?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildFaqJsonLd(faqs) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export { SITE_NAME, SITE_DESCRIPTION, AUTHOR_NAME, AUTHOR_URL };
