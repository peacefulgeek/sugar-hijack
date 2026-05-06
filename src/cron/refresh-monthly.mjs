/**
 * refresh-monthly.mjs
 * Monthly article refresh — updates the top 3 articles by traffic
 * Runs 1st of month 03:00 UTC
 */

import OpenAI from 'openai';
import { getAllPublished, upsertArticle } from '../lib/articles-store.mjs';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || 'https://openai.manus.space/v1',
});
const MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

export async function refreshMonthly() {
  console.log('[refresh-monthly] Starting monthly refresh');

  const articles = await getAllPublished();
  // Pick the 3 oldest articles (most likely to need freshening)
  const toRefresh = articles
    .sort((a, b) => new Date(a.updated_at || a.published_at) - new Date(b.updated_at || b.published_at))
    .slice(0, 3);

  for (const article of toRefresh) {
    try {
      console.log(`[refresh-monthly] Refreshing: ${article.slug}`);
      const res = await client.chat.completions.create({
        model: MODEL,
        messages: [{
          role: 'user',
          content: `You are The Oracle Lover. Refresh and improve this article for sugarhijack.com.

Title: ${article.title}
Current body (first 500 chars): ${(article.body || '').slice(0, 500)}...

Tasks:
1. Update any statistics or research references to be current
2. Improve the opening hook if it's weak
3. Add one new section with fresh insight
4. Ensure [AUTHOR_BIO_CARD] marker is present after section 3
5. Keep the same overall structure and voice

Return the COMPLETE improved article body in Markdown. No title heading.`,
        }],
        temperature: 0.7,
        max_tokens: 3000,
      });

      const newBody = res.choices[0]?.message?.content?.trim() || '';
      if (newBody.length > 500) {
        await upsertArticle({
          ...article,
          body: newBody,
          word_count: newBody.split(/\s+/).length,
          updated_at: new Date().toISOString(),
        });
        console.log(`[refresh-monthly] Refreshed: ${article.slug}`);
      }
    } catch (err) {
      console.error(`[refresh-monthly] Failed ${article.slug}:`, err.message);
    }
  }
}
