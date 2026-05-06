/**
 * refresh-quarterly.mjs
 * Quarterly deep refresh — rewrites 5 articles with fresh research
 * Runs Jan/Apr/Jul/Oct 1st at 04:00 UTC
 */

import OpenAI from 'openai';
import { getAllPublished, upsertArticle } from '../lib/articles-store.mjs';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || 'https://openai.manus.space/v1',
});
const MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

export async function refreshQuarterly() {
  console.log('[refresh-quarterly] Starting quarterly refresh');

  const articles = await getAllPublished();
  const toRefresh = articles
    .sort((a, b) => new Date(a.updated_at || a.published_at) - new Date(b.updated_at || b.published_at))
    .slice(0, 5);

  for (const article of toRefresh) {
    try {
      console.log(`[refresh-quarterly] Deep refresh: ${article.slug}`);
      const res = await client.chat.completions.create({
        model: MODEL,
        messages: [{
          role: 'user',
          content: `You are The Oracle Lover. Perform a complete quarterly rewrite of this article for sugarhijack.com.

Title: ${article.title}
Category: ${article.category}

Requirements:
- 2,000-2,500 words (longer than the original)
- Fresh research citations from 2023-2024
- Improved structure with 6 H2 sections
- [AUTHOR_BIO_CARD] marker after section 3
- New counterintuitive insight not in the original
- Closing Sanskrit/Latin phrase in italics

Return ONLY the complete article body in Markdown. No title heading.`,
        }],
        temperature: 0.75,
        max_tokens: 3500,
      });

      const newBody = res.choices[0]?.message?.content?.trim() || '';
      if (newBody.length > 800) {
        await upsertArticle({
          ...article,
          body: newBody,
          word_count: newBody.split(/\s+/).length,
          reading_time: Math.ceil(newBody.split(/\s+/).length / 200),
          updated_at: new Date().toISOString(),
        });
        console.log(`[refresh-quarterly] Deep refreshed: ${article.slug}`);
      }
    } catch (err) {
      console.error(`[refresh-quarterly] Failed ${article.slug}:`, err.message);
    }
  }
}
