/**
 * generate-article.mjs
 * Called by cron to generate or release a queued (gated) article.
 *
 * Phase 1 — days 1–40 from SITE_LAUNCH_DATE: 5 articles/day
 *   Cron fires at 07,10,13,16,19 UTC every day (5 fires = 5 articles)
 *
 * Phase 2 — day 41+ from SITE_LAUNCH_DATE: 1 article/weekday (Mon–Fri)
 *   Cron fires at 08:00 UTC Mon–Fri (1 fire = 1 article)
 *
 * Each fire: release the next gated article (status: gated → published).
 * If no gated articles remain, generate a fresh one using the AI writing engine.
 *
 * Set SITE_LAUNCH_DATE=YYYY-MM-DD in DigitalOcean env vars on first deploy.
 * Defaults to today if not set (safe for first run).
 */

import OpenAI from 'openai';
import { getQueuedArticle, upsertArticle, getAllPublished } from '../lib/articles-store.mjs';
import { uploadImageToBunny } from '../lib/bunny.mjs';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || 'https://openai.manus.space/v1',
});
const MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

// ─── Phase detection ──────────────────────────────────────────────────────────
function getCurrentPhase() {
  const launchDateStr = process.env.SITE_LAUNCH_DATE;
  if (!launchDateStr) {
    // No launch date set — default to Phase 1 (safe for first deploy)
    return 1;
  }
  const launchDate = new Date(launchDateStr);
  launchDate.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysSinceLaunch = Math.floor((today - launchDate) / (1000 * 60 * 60 * 24));
  return daysSinceLaunch < 40 ? 1 : 2;
}

// ─── Topic queue for AI generation (when gated queue is exhausted) ────────────
const TOPIC_QUEUE = [
  { slug: 'sugar-and-longevity', title: 'Sugar and Longevity: What Centenarian Research Reveals About Sweet Foods', category: 'metabolic-health', tags: ['longevity', 'sugar', 'aging', 'research'] },
  { slug: 'glucose-and-fertility', title: 'Glucose and Fertility: How Blood Sugar Affects Reproductive Health', category: 'metabolic-health', tags: ['fertility', 'glucose', 'hormones', 'reproductive-health'] },
  { slug: 'sugar-and-chronic-pain', title: 'Sugar and Chronic Pain: The Inflammation-Pain Connection', category: 'metabolic-health', tags: ['chronic-pain', 'inflammation', 'sugar', 'science'] },
  { slug: 'glucose-tracking-beginners', title: 'Glucose Tracking for Beginners: Everything You Need to Know About CGMs', category: 'protocols', tags: ['cgm', 'glucose-tracking', 'beginners', 'protocols'] },
  { slug: 'sugar-and-mental-clarity', title: 'Sugar and Mental Clarity: The Neuroscience of Cognitive Performance', category: 'neuroscience', tags: ['mental-clarity', 'cognition', 'sugar', 'neuroscience'] },
  { slug: 'insulin-resistance-reversal', title: 'Insulin Resistance Reversal: The Evidence-Based 90-Day Protocol', category: 'protocols', tags: ['insulin-resistance', 'reversal', 'protocol', 'science'] },
  { slug: 'sugar-and-autoimmune', title: 'Sugar and Autoimmune Disease: How Glucose Drives Immune Dysfunction', category: 'metabolic-health', tags: ['autoimmune', 'sugar', 'immune-system', 'inflammation'] },
  { slug: 'berberine-vs-metformin', title: 'Berberine vs. Metformin: What the Research Actually Shows', category: 'herbs-supplements', tags: ['berberine', 'metformin', 'blood-sugar', 'research'] },
  { slug: 'sugar-and-hormones-men', title: 'Sugar and Male Hormones: How Glucose Disrupts Testosterone', category: 'metabolic-health', tags: ['testosterone', 'hormones', 'sugar', 'men'] },
  { slug: 'postprandial-glucose-hacks', title: 'Postprandial Glucose Hacks: 12 Evidence-Based Ways to Flatten Your Curve', category: 'protocols', tags: ['postprandial', 'glucose', 'hacks', 'protocols'] },
];

// ─── Main export ──────────────────────────────────────────────────────────────
export async function generateOrReleaseArticle({ phase: callerPhase } = {}) {
  const activePhase = getCurrentPhase();

  // If the cron slot's phase doesn't match the active phase, skip gracefully
  if (callerPhase && callerPhase !== activePhase) {
    console.log(`[gen-article] Active phase: ${activePhase}, cron slot phase: ${callerPhase} — skipping`);
    return;
  }

  // Try releasing the next gated article first (always preferred over generating)
  const queued = await getQueuedArticle();
  if (queued) {
    console.log(`[gen-article] Releasing gated article: ${queued.slug}`);
    await upsertArticle({
      ...queued,
      status: 'published',
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    console.log(`[gen-article] ✅ Released: ${queued.slug}`);
    return;
  }

  // No gated articles — generate a fresh one
  console.log('[gen-article] No gated articles in queue — generating fresh article');
  const published = await getAllPublished();
  const publishedSlugs = new Set(published.map(a => a.slug));
  const next = TOPIC_QUEUE.find(t => !publishedSlugs.has(t.slug));

  if (!next) {
    console.log('[gen-article] Topic queue exhausted — nothing to generate');
    return;
  }

  console.log(`[gen-article] Generating: ${next.title}`);

  try {
    const [body, meta] = await Promise.all([
      generateBody(next),
      generateMeta(next),
    ]);

    const wc = body.split(/\s+/).length;

    // Upload a relevant Unsplash image to Bunny CDN
    let heroUrl = `https://sugar-hijack.b-cdn.net/images/${next.slug}.webp`;
    try {
      const unsplashUrl = `https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80`;
      const uploaded = await uploadImageToBunny(unsplashUrl, next.slug);
      if (uploaded) heroUrl = uploaded;
    } catch (imgErr) {
      console.warn(`[gen-article] Image upload failed for ${next.slug}:`, imgErr.message);
    }

    await upsertArticle({
      slug: next.slug,
      title: next.title,
      category: next.category,
      tags: next.tags,
      body,
      meta_description: meta,
      hero_url: heroUrl,
      word_count: wc,
      reading_time: Math.ceil(wc / 200),
      status: 'published',
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author: 'The Oracle Lover',
      author_url: 'https://theoraclelover.com',
    });

    console.log(`[gen-article] ✅ Generated & published: ${next.slug} (${wc} words)`);
  } catch (err) {
    console.error(`[gen-article] ❌ Failed to generate ${next.slug}:`, err.message);
  }
}

// ─── AI generation helpers ────────────────────────────────────────────────────
async function generateBody(article) {
  const res = await client.chat.completions.create({
    model: MODEL,
    messages: [{
      role: 'user',
      content: `You are The Oracle Lover — a no-BS wellness educator with a science degree and a gift for making complex biology feel personal and empowering. Write a 1,800–2,200 word article for sugarhijack.com.

Title: ${article.title}
Category: ${article.category}
Tags: ${article.tags.join(', ')}

Structure:
- Opening hook (2–3 paragraphs, no heading) — a surprising fact or relatable scenario
- ## Section 1 (science foundation)
- ## Section 2 (mechanism or research deep-dive)
- ## Section 3 (practical implications)
- [AUTHOR_BIO_CARD] — insert this exact marker on its own line after section 3
- ## Section 4 (protocol or action steps)
- ## Section 5 (closing synthesis)
- Closing paragraph ending with a Sanskrit or Latin phrase in italics

Voice: Direct, biology-focused, zero moral language, cite real researchers by name (Jessie Inchauspé, Robert Lustig, Casey Means, Benjamin Bikman, Mark Hyman, Rhonda Patrick). Warm but not fluffy. Scientific but not academic.

Return ONLY the article body in Markdown. No title heading at the top.`,
    }],
    temperature: 0.75,
    max_tokens: 3500,
  });
  return res.choices[0]?.message?.content?.trim() || '';
}

async function generateMeta(article) {
  const res = await client.chat.completions.create({
    model: MODEL,
    messages: [{
      role: 'user',
      content: `Write a 150–160 character meta description for this article: "${article.title}". Make it direct, science-based, and benefit-focused. No "In this article" opener. Return ONLY the text, no quotes.`,
    }],
    temperature: 0.7,
    max_tokens: 80,
  });
  return res.choices[0]?.message?.content?.trim() || article.title;
}
