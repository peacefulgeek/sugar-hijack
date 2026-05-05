/**
 * product-spotlight.mjs
 * Weekly product spotlight article generator
 * Runs Saturdays 08:00 UTC
 */

import OpenAI from 'openai';
import { upsertArticle } from '../lib/articles-store.mjs';
import { PRODUCT_CATALOG } from '../data/product-catalog.js';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || 'https://openai.manus.space/v1',
});
const MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

export async function generateProductSpotlight() {
  // Pick a random book or supplement from the catalog
  const eligible = PRODUCT_CATALOG.filter(p => p.category === 'books' || p.category === 'supplements');
  const product = eligible[Math.floor(Math.random() * eligible.length)];

  if (!product) return;

  const slug = `spotlight-${product.asin}-${Date.now()}`;
  const title = `${product.name}: An Honest Look at What the Research Shows`;

  console.log(`[product-spotlight] Generating spotlight for: ${product.name}`);

  try {
    const res = await client.chat.completions.create({
      model: MODEL,
      messages: [{
        role: 'user',
        content: `You are The Oracle Lover. Write a 1,200-1,500 word honest product spotlight article for thesugardetach.com.

Product: ${product.name}
ASIN: ${product.asin}
Category: ${product.category}
Description: ${product.description || ''}

Structure:
1. Opening — what this is and why it matters for metabolic health
2. ## What the Research Shows — cite actual studies/researchers
3. ## Who This Is For — specific use cases
4. ## What to Watch Out For — honest caveats
5. [AUTHOR_BIO_CARD]
6. ## The Bottom Line — clear recommendation

Include the Amazon link: https://www.amazon.com/dp/${product.asin}?tag=${process.env.AMAZON_TAG || 'spankyspinola-20'}
Mark it as: (paid link)

Voice: Direct, no hype, biology-focused. Return ONLY the article body in Markdown.`,
      }],
      temperature: 0.7,
      max_tokens: 2500,
    });

    const body = res.choices[0]?.message?.content?.trim() || '';
    const wc = body.split(/\s+/).length;

    await upsertArticle({
      slug,
      title,
      category: product.category,
      tags: product.tags,
      body,
      meta_description: `An honest, research-based look at ${product.name} for blood sugar and metabolic health.`,
      hero_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
      word_count: wc,
      reading_time: Math.ceil(wc / 200),
      status: 'published',
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      asins_used: [product.asin],
    });

    console.log(`[product-spotlight] Published: ${slug}`);
  } catch (err) {
    console.error('[product-spotlight] Failed:', err.message);
  }
}
