/**
 * generate-article.mjs
 * Called by cron to generate or release a queued article.
 * Phase 1 (< 60 published): generate new + release queued
 * Phase 2 (>= 60 published): release queued only
 */

import OpenAI from 'openai';
import { getAllPublished, getPublishedCount, getQueuedArticle, upsertArticle } from '../lib/articles-store.mjs';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || 'https://openai.manus.space/v1',
});
const MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

// ─── Topic queue (auto-generated topics beyond the 30 seeds) ─────────────────
const TOPIC_QUEUE = [
  { slug: 'intermittent-fasting-blood-sugar', title: 'Intermittent Fasting and Blood Sugar: What the Research Shows', category: 'protocols', tags: ['fasting', 'blood-sugar', 'protocols', 'research'] },
  { slug: 'cortisol-weight-gain-sugar', title: 'Cortisol, Weight Gain, and Sugar: The Stress-Fat Connection', category: 'psychology', tags: ['cortisol', 'stress', 'weight-gain', 'sugar'] },
  { slug: 'alcohol-blood-sugar', title: 'Alcohol and Blood Sugar: Why Drinking Makes Cravings Worse', category: 'lifestyle', tags: ['alcohol', 'blood-sugar', 'cravings', 'lifestyle'] },
  { slug: 'sugar-skin-aging', title: 'Sugar and Skin Aging: The Glycation Mechanism', category: 'metabolic-health', tags: ['glycation', 'skin', 'aging', 'sugar', 'science'] },
  { slug: 'low-glycemic-diet-guide', title: 'The Low-Glycemic Diet: A Practical Guide Without the Rules', category: 'protocols', tags: ['low-glycemic', 'diet', 'protocols', 'practical'] },
  { slug: 'sugar-brain-fog', title: 'Sugar and Brain Fog: How Glucose Spikes Impair Cognition', category: 'neuroscience', tags: ['brain-fog', 'cognition', 'glucose', 'neuroscience'] },
  { slug: 'polycystic-ovary-insulin', title: 'PCOS and Insulin Resistance: The Sugar Connection', category: 'metabolic-health', tags: ['pcos', 'insulin-resistance', 'hormones', 'women'] },
  { slug: 'fiber-glucose-control', title: 'Fiber and Glucose Control: Why Fiber Is the Most Underrated Tool', category: 'protocols', tags: ['fiber', 'glucose', 'protocols', 'nutrition'] },
];

export async function generateOrReleaseArticle({ allowedPhase = 1 } = {}) {
  const count = await getPublishedCount();
  const phase = count < 60 ? 1 : 2;

  if (phase !== allowedPhase) {
    console.log(`[gen-article] Phase ${phase} active, slot is for phase ${allowedPhase} — skipping`);
    return;
  }

  // Try releasing a queued article first
  const queued = await getQueuedArticle();
  if (queued) {
    console.log(`[gen-article] Releasing queued article: ${queued.slug}`);
    await upsertArticle({
      ...queued,
      status: 'published',
      published_at: new Date().toISOString(),
    });
    return;
  }

  // Phase 2 — only release queued, don't generate
  if (phase === 2) {
    console.log('[gen-article] Phase 2, no queued articles — skipping generation');
    return;
  }

  // Phase 1 — generate a new article
  const published = await getAllPublished();
  const publishedSlugs = new Set(published.map(a => a.slug));
  const next = TOPIC_QUEUE.find(t => !publishedSlugs.has(t.slug));

  if (!next) {
    console.log('[gen-article] No more topics in queue');
    return;
  }

  console.log(`[gen-article] Generating: ${next.title}`);

  try {
    const body = await generateBody(next);
    const meta = await generateMeta(next);
    const wc = body.split(/\s+/).length;

    await upsertArticle({
      slug: next.slug,
      title: next.title,
      category: next.category,
      tags: next.tags,
      body,
      meta_description: meta,
      hero_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
      word_count: wc,
      reading_time: Math.ceil(wc / 200),
      status: 'published',
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    console.log(`[gen-article] Published: ${next.slug} (${wc}w)`);
  } catch (err) {
    console.error(`[gen-article] Failed to generate ${next.slug}:`, err.message);
  }
}

async function generateBody(article) {
  const res = await client.chat.completions.create({
    model: MODEL,
    messages: [{
      role: 'user',
      content: `You are The Oracle Lover — a no-BS wellness educator with a science degree. Write a 1,800-2,200 word article for sugarhijack.com.

Title: ${article.title}
Category: ${article.category}
Tags: ${article.tags.join(', ')}

Structure: Opening hook → ## sections (5 total) → [AUTHOR_BIO_CARD] marker after section 3 → closing with Sanskrit/Latin phrase in italics.

Voice: Direct, biology-focused, no moral language, cite real researchers (Inchauspé, Lustig, Means, Bikman, etc.).

Return ONLY the article body in Markdown. No title heading.`,
    }],
    temperature: 0.75,
    max_tokens: 3000,
  });
  return res.choices[0]?.message?.content?.trim() || '';
}

async function generateMeta(article) {
  const res = await client.chat.completions.create({
    model: MODEL,
    messages: [{
      role: 'user',
      content: `Write a 150-160 character meta description for: "${article.title}". Direct, science-based. No "In this article" opener. Return ONLY the text.`,
    }],
    temperature: 0.7,
    max_tokens: 80,
  });
  return res.choices[0]?.message?.content?.trim() || article.title;
}
