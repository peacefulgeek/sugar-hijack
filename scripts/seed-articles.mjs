/**
 * seed-articles.mjs
 * Generates 30 seeded articles using OpenAI and saves them to src/data/articles/
 * Run: node scripts/seed-articles.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'src/data/articles');

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || 'https://openai.manus.space/v1',
});

const MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

// ─── Article manifest ───────────────────────────────────────────────────────
const ARTICLES = [
  {
    slug: 'what-is-sugar-addiction',
    title: 'What Is Sugar Addiction? The Biology Behind the Craving',
    category: 'neuroscience',
    tags: ['sugar-addiction', 'dopamine', 'neuroscience', 'cravings', 'biology'],
    heroQuery: 'sugar crystals close up macro photography',
  },
  {
    slug: 'glucose-spikes-explained',
    title: 'Glucose Spikes Explained: What Happens in Your Body After You Eat Sugar',
    category: 'glucose-science',
    tags: ['glucose', 'spikes', 'insulin', 'blood-sugar', 'science'],
    heroQuery: 'blood glucose monitor healthy food',
  },
  {
    slug: 'dopamine-sugar-reward',
    title: 'Dopamine and Sugar: How Your Brain\'s Reward System Gets Hijacked',
    category: 'neuroscience',
    tags: ['dopamine', 'reward-system', 'addiction', 'neuroscience', 'brain'],
    heroQuery: 'brain neuroscience neurons glowing',
  },
  {
    slug: 'how-to-quit-sugar',
    title: 'How to Quit Sugar Without White-Knuckling It',
    category: 'protocols',
    tags: ['quit-sugar', 'protocols', 'detox', 'strategies', 'practical'],
    heroQuery: 'healthy food vegetables colorful fresh',
  },
  {
    slug: 'insulin-resistance-explained',
    title: 'Insulin Resistance Explained: The Silent Metabolic Shift',
    category: 'metabolic-health',
    tags: ['insulin-resistance', 'metabolic-health', 'diabetes', 'science', 'health'],
    heroQuery: 'insulin syringe medical science',
  },
  {
    slug: 'vinegar-hack-glucose',
    title: 'The Vinegar Hack: Does Apple Cider Vinegar Really Flatten Glucose Spikes?',
    category: 'protocols',
    tags: ['vinegar', 'apple-cider-vinegar', 'glucose', 'hack', 'protocols'],
    heroQuery: 'apple cider vinegar bottle natural',
  },
  {
    slug: 'savory-breakfast-protocol',
    title: 'The Savory Breakfast Protocol: Why Your Morning Meal Sets Your Glucose for the Day',
    category: 'protocols',
    tags: ['breakfast', 'glucose', 'protocols', 'morning', 'savory'],
    heroQuery: 'eggs avocado healthy breakfast',
  },
  {
    slug: 'glucose-crash-cycle',
    title: 'The Glucose Crash Cycle: Why You\'re Tired, Foggy, and Craving Sugar by 3pm',
    category: 'glucose-science',
    tags: ['glucose-crash', 'energy', 'fatigue', 'brain-fog', 'cravings'],
    heroQuery: 'tired person fatigue afternoon energy',
  },
  {
    slug: 'sugar-addiction-neuroscience',
    title: 'The Neuroscience of Sugar Addiction: What the Research Actually Shows',
    category: 'neuroscience',
    tags: ['neuroscience', 'addiction', 'research', 'science', 'sugar'],
    heroQuery: 'brain scan neuroscience research laboratory',
  },
  {
    slug: 'emotional-eating-biology',
    title: 'Emotional Eating Is Biology, Not Weakness: The Cortisol-Glucose Connection',
    category: 'psychology',
    tags: ['emotional-eating', 'cortisol', 'stress', 'psychology', 'biology'],
    heroQuery: 'stress anxiety woman calm mindful',
  },
  {
    slug: 'sleep-blood-sugar',
    title: 'How Poor Sleep Destroys Your Blood Sugar Control',
    category: 'lifestyle',
    tags: ['sleep', 'blood-sugar', 'cortisol', 'insulin-resistance', 'lifestyle'],
    heroQuery: 'sleep bedroom peaceful night rest',
  },
  {
    slug: 'food-order-glucose',
    title: 'Food Order Matters: Eat This First to Flatten Your Glucose Curve',
    category: 'protocols',
    tags: ['food-order', 'glucose', 'vegetables', 'protein', 'protocols'],
    heroQuery: 'salad vegetables healthy meal order',
  },
  {
    slug: 'post-meal-walking-glucose',
    title: 'The 10-Minute Walk After Meals That Changes Your Glucose',
    category: 'protocols',
    tags: ['walking', 'exercise', 'post-meal', 'glucose', 'protocols'],
    heroQuery: 'walking nature path exercise outdoor',
  },
  {
    slug: 'fructose-liver-damage',
    title: 'Fructose and Your Liver: The Hidden Damage of "Natural" Sugars',
    category: 'metabolic-health',
    tags: ['fructose', 'liver', 'metabolic-health', 'science', 'sugar'],
    heroQuery: 'fruit juice natural sugar health',
  },
  {
    slug: 'hidden-sugars-guide',
    title: 'Hidden Sugars: The 60+ Names for Sugar on Food Labels',
    category: 'glucose-science',
    tags: ['hidden-sugars', 'food-labels', 'processed-food', 'nutrition', 'guide'],
    heroQuery: 'food label nutrition facts reading',
  },
  {
    slug: 'protein-satiety-glucose',
    title: 'Protein and Satiety: How Eating More Protein Reduces Sugar Cravings',
    category: 'protocols',
    tags: ['protein', 'satiety', 'cravings', 'glucose', 'nutrition'],
    heroQuery: 'protein food eggs chicken nuts healthy',
  },
  {
    slug: 'cgm-guide-beginners',
    title: 'Continuous Glucose Monitors for Non-Diabetics: A Beginner\'s Guide',
    category: 'metabolic-health',
    tags: ['cgm', 'glucose-monitor', 'metabolic-health', 'testing', 'guide'],
    heroQuery: 'glucose monitor wearable technology health',
  },
  {
    slug: 'stress-sugar-cravings',
    title: 'Why Stress Makes You Crave Sugar: The Cortisol-Dopamine Loop',
    category: 'psychology',
    tags: ['stress', 'cortisol', 'cravings', 'psychology', 'dopamine'],
    heroQuery: 'stress work cortisol anxiety',
  },
  {
    slug: 'metabolic-syndrome-spectrum',
    title: 'The Metabolic Syndrome Spectrum: From Sugar Addiction to Insulin Resistance',
    category: 'metabolic-health',
    tags: ['metabolic-syndrome', 'insulin-resistance', 'spectrum', 'health', 'science'],
    heroQuery: 'metabolic health wellness science',
  },
  {
    slug: 'sugar-detox-timeline',
    title: 'The Sugar Detox Timeline: What to Expect Day by Day',
    category: 'protocols',
    tags: ['detox', 'timeline', 'withdrawal', 'protocols', 'practical'],
    heroQuery: 'calendar timeline progress health journey',
  },
  {
    slug: 'artificial-sweeteners-glucose',
    title: 'Do Artificial Sweeteners Spike Blood Sugar? The Research Is Complicated',
    category: 'glucose-science',
    tags: ['artificial-sweeteners', 'glucose', 'research', 'stevia', 'science'],
    heroQuery: 'artificial sweetener sugar substitute',
  },
  {
    slug: 'gut-microbiome-sugar',
    title: 'Your Gut Microbiome on Sugar: How the Bacteria That Control Your Cravings Work',
    category: 'metabolic-health',
    tags: ['gut-microbiome', 'bacteria', 'cravings', 'sugar', 'science'],
    heroQuery: 'gut health microbiome bacteria science',
  },
  {
    slug: 'berberine-blood-sugar',
    title: 'Berberine and Blood Sugar: What the Research Shows',
    category: 'metabolic-health',
    tags: ['berberine', 'supplements', 'blood-sugar', 'insulin-resistance', 'research'],
    heroQuery: 'herbal supplement natural medicine',
  },
  {
    slug: 'magnesium-insulin-sensitivity',
    title: 'Magnesium Deficiency and Insulin Resistance: The Missing Link',
    category: 'metabolic-health',
    tags: ['magnesium', 'insulin-resistance', 'deficiency', 'supplements', 'science'],
    heroQuery: 'magnesium supplement mineral health',
  },
  {
    slug: 'exercise-insulin-sensitivity',
    title: 'Exercise and Insulin Sensitivity: The Best Workouts for Blood Sugar Control',
    category: 'lifestyle',
    tags: ['exercise', 'insulin-sensitivity', 'workout', 'fitness', 'glucose'],
    heroQuery: 'exercise workout fitness strength training',
  },
  {
    slug: 'sugar-and-inflammation',
    title: 'Sugar and Chronic Inflammation: The Mechanism Behind the Damage',
    category: 'metabolic-health',
    tags: ['inflammation', 'sugar', 'chronic-disease', 'science', 'health'],
    heroQuery: 'inflammation health cells biology',
  },
  {
    slug: 'mindful-eating-glucose',
    title: 'Mindful Eating and Glucose: How Slowing Down Changes Your Blood Sugar',
    category: 'psychology',
    tags: ['mindful-eating', 'glucose', 'psychology', 'awareness', 'protocols'],
    heroQuery: 'mindful eating meditation food awareness',
  },
  {
    slug: 'sugar-hormones-women',
    title: 'Sugar, Hormones, and the Menstrual Cycle: Why Cravings Aren\'t Random',
    category: 'lifestyle',
    tags: ['hormones', 'women', 'menstrual-cycle', 'cravings', 'biology'],
    heroQuery: 'women health hormones wellness',
  },
  {
    slug: 'children-sugar-addiction',
    title: 'Sugar Addiction in Children: How Early Exposure Shapes the Brain',
    category: 'neuroscience',
    tags: ['children', 'sugar-addiction', 'brain-development', 'neuroscience', 'parenting'],
    heroQuery: 'children healthy food eating',
  },
  {
    slug: 'sugar-detach-maintenance',
    title: 'After the Detox: How to Maintain Low Sugar Without Obsessing Over It',
    category: 'protocols',
    tags: ['maintenance', 'long-term', 'protocols', 'lifestyle', 'balance'],
    heroQuery: 'balance healthy lifestyle sustainable',
  },
];

// ─── Unsplash image map ──────────────────────────────────────────────────────
const HERO_IMAGES = {
  'what-is-sugar-addiction': 'https://images.unsplash.com/photo-1559181567-c3190ca9d715?w=1200&q=80',
  'glucose-spikes-explained': 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=80',
  'dopamine-sugar-reward': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=80',
  'how-to-quit-sugar': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
  'insulin-resistance-explained': 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=1200&q=80',
  'vinegar-hack-glucose': 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=1200&q=80',
  'savory-breakfast-protocol': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&q=80',
  'glucose-crash-cycle': 'https://images.unsplash.com/photo-1541199249251-f713e6145474?w=1200&q=80',
  'sugar-addiction-neuroscience': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80',
  'emotional-eating-biology': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80',
  'sleep-blood-sugar': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1200&q=80',
  'food-order-glucose': 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=80',
  'post-meal-walking-glucose': 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&q=80',
  'fructose-liver-damage': 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=1200&q=80',
  'hidden-sugars-guide': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80',
  'protein-satiety-glucose': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80',
  'cgm-guide-beginners': 'https://images.unsplash.com/photo-1576671081837-49000212a370?w=1200&q=80',
  'stress-sugar-cravings': 'https://images.unsplash.com/photo-1541199249251-f713e6145474?w=1200&q=80',
  'metabolic-syndrome-spectrum': 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1200&q=80',
  'sugar-detox-timeline': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
  'artificial-sweeteners-glucose': 'https://images.unsplash.com/photo-1559181567-c3190ca9d715?w=1200&q=80',
  'gut-microbiome-sugar': 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=80',
  'berberine-blood-sugar': 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=1200&q=80',
  'magnesium-insulin-sensitivity': 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=1200&q=80',
  'exercise-insulin-sensitivity': 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&q=80',
  'sugar-and-inflammation': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80',
  'mindful-eating-glucose': 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=80',
  'sugar-hormones-women': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80',
  'children-sugar-addiction': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80',
  'sugar-detach-maintenance': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
};

// ─── Article prompt builder ──────────────────────────────────────────────────
function buildPrompt(article) {
  return `You are The Oracle Lover — a no-BS wellness educator with a science degree who writes about sugar addiction and metabolic health. Your voice is direct, grounded, occasionally wry, and never preachy. No moral language. Pure biology and psychology.

Write a complete, high-quality article for thesugardetach.com.

ARTICLE SPEC:
- Title: ${article.title}
- Category: ${article.category}
- Tags: ${article.tags.join(', ')}
- Target word count: 1,800-2,200 words
- Reading level: Educated adult, not academic

STRUCTURE REQUIRED:
1. Opening hook (2-3 paragraphs) — start with a specific scenario, surprising fact, or direct challenge. NO "In today's world" or "Have you ever wondered" openers.
2. H2: [First major section — the core mechanism or problem]
3. H2: [Second major section — the science/research]
4. H2: [Third major section — what this means practically]
5. [AUTHOR_BIO_CARD] — insert this exact marker here
6. H2: [Fourth major section — what to actually do]
7. H2: [Fifth major section — common mistakes or nuances]
8. Closing paragraph — end with a specific, actionable insight. Include a Sanskrit or Latin phrase in italics as the final line.

VOICE RULES:
- Never use "willpower" as a positive trait
- Never moralize about food choices
- Use "mechanism" and "biology" frequently
- Reference at least 2 real researchers by name (Jessie Inchauspé, Robert Lustig, Casey Means, Benjamin Bikman, Gary Taubes, etc.)
- Short sentences for impact. Longer ones for explanation.
- Use em dashes — like this — for asides
- No bullet points in the main body (use prose)
- Bold key terms on first use

QUALITY REQUIREMENTS:
- Must include at least one specific research finding with approximate numbers
- Must explain the mechanism, not just the outcome
- Must have at least one counterintuitive insight
- Must be actionable — readers should know what to do differently

Return ONLY the article body in Markdown format. Start with the opening paragraph (no title heading). Use ## for H2 headings and ### for H3 headings.`;
}

// ─── Quality gate ────────────────────────────────────────────────────────────
function qualityGate(body, article) {
  const issues = [];
  const wc = body.split(/\s+/).length;

  if (wc < 1400) issues.push(`word_count too low: ${wc}`);
  if (!body.includes('##')) issues.push('missing H2 headings');
  if (!body.includes('[AUTHOR_BIO_CARD]')) issues.push('missing AUTHOR_BIO_CARD marker');
  if (body.toLowerCase().includes('in today\'s world')) issues.push('banned opener');
  if (body.toLowerCase().includes('have you ever wondered')) issues.push('banned opener');
  if (body.toLowerCase().includes('willpower is key')) issues.push('morality language');

  const researchers = ['inchauspé', 'lustig', 'means', 'bikman', 'taubes', 'ludwig', 'fung'];
  const hasResearcher = researchers.some(r => body.toLowerCase().includes(r));
  if (!hasResearcher) issues.push('no researcher cited');

  const score = Math.max(0, 100 - issues.length * 15);
  return { score, issues, passed: score >= 70 };
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function generateArticle(article, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      console.log(`  [${attempt > 0 ? `retry ${attempt}` : 'gen'}] ${article.slug}`);
      const res = await client.chat.completions.create({
        model: MODEL,
        messages: [{ role: 'user', content: buildPrompt(article) }],
        temperature: 0.75,
        max_tokens: 3000,
      });

      const body = res.choices[0]?.message?.content?.trim() || '';
      const wc = body.split(/\s+/).length;
      const qg = qualityGate(body, article);

      if (!qg.passed && attempt < retries) {
        console.log(`  [qg-fail] score=${qg.score} issues=${qg.issues.join(', ')} — retrying`);
        continue;
      }

      const now = new Date();
      const publishedAt = new Date(now.getTime() - Math.random() * 60 * 24 * 60 * 60 * 1000);

      const articleData = {
        slug: article.slug,
        title: article.title,
        category: article.category,
        tags: article.tags,
        hero_url: HERO_IMAGES[article.slug] || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
        meta_description: '',
        body,
        word_count: wc,
        reading_time: Math.ceil(wc / 200),
        published_at: publishedAt.toISOString(),
        updated_at: now.toISOString(),
        status: 'published',
        quality_score: qg.score,
        quality_issues: qg.issues,
      };

      // Generate meta description
      const metaRes = await client.chat.completions.create({
        model: MODEL,
        messages: [{
          role: 'user',
          content: `Write a compelling meta description (150-160 characters) for this article: "${article.title}". 
Voice: direct, science-based, no fluff. No "In this article" opener.
Return ONLY the meta description text, nothing else.`,
        }],
        temperature: 0.7,
        max_tokens: 80,
      });
      articleData.meta_description = metaRes.choices[0]?.message?.content?.trim() || article.title;

      return articleData;
    } catch (err) {
      console.error(`  [error] ${article.slug} attempt ${attempt}:`, err.message);
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, 2000));
    }
  }
}

async function main() {
  console.log(`\n🌿 The Sugar Detach — Article Seeder`);
  console.log(`   Generating ${ARTICLES.length} articles with ${MODEL}\n`);

  const results = [];
  let passed = 0;
  let failed = 0;

  for (let i = 0; i < ARTICLES.length; i++) {
    const article = ARTICLES[i];
    console.log(`[${i + 1}/${ARTICLES.length}] ${article.title}`);

    try {
      const data = await generateArticle(article);
      const outPath = resolve(OUT_DIR, `${article.slug}.json`);
      writeFileSync(outPath, JSON.stringify(data, null, 2));
      console.log(`  ✓ saved (${data.word_count}w, score=${data.quality_score})`);
      results.push({ slug: article.slug, status: 'ok', score: data.quality_score });
      passed++;
    } catch (err) {
      console.error(`  ✗ failed: ${err.message}`);
      results.push({ slug: article.slug, status: 'error', error: err.message });
      failed++;
    }

    // Rate limit pause
    if (i < ARTICLES.length - 1) {
      await new Promise(r => setTimeout(r, 800));
    }
  }

  // Write index
  const indexPath = resolve(OUT_DIR, '_index.json');
  writeFileSync(indexPath, JSON.stringify(results, null, 2));

  console.log(`\n✅ Done: ${passed} passed, ${failed} failed`);
  console.log(`   Articles saved to: ${OUT_DIR}`);
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
