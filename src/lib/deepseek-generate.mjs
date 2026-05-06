import OpenAI from 'openai';
import { runQualityGate } from './article-quality-gate.mjs';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.deepseek.com',
});

const MODEL = process.env.OPENAI_MODEL || 'deepseek-chat';
const MAX_ATTEMPTS = 4;

const ORACLE_LOVER_PHRASES = [
  'Look, here\'s the thing.',
  'Stop overthinking this.',
  'This isn\'t mystical. It\'s mechanical.',
  'You already know the answer. You just don\'t like it.',
  'Let me demystify this for you.',
  'Here\'s what actually works.',
  'That\'s the short version. Want the long one?',
  'Nobody\'s coming to explain this to you. So I will.',
  'The body doesn\'t lie. The mind does. Constantly.',
  'Less theory. More practice.',
];

const NICHE_PHRASES = [
  'Sugar isn\'t a moral failing. It\'s a neuroscience problem.',
  'You\'re not addicted to sugar because you lack willpower. You\'re addicted because your brain is working exactly as designed.',
  'Here\'s what a glucose spike actually looks like — and what it costs you three hours later.',
  'The flat curve isn\'t a diet. It\'s a nervous system strategy.',
  'This is not about never eating sugar. It\'s about not being owned by it.',
];

const RESEARCHERS = [
  'Jessie Inchauspé', 'Robert Lustig MD', 'Casey Means MD',
  'David Ludwig MD PhD', 'Mark Hyman MD', 'Richard Johnson MD',
  'Gary Taubes', 'Benjamin Bikman PhD',
  'Carl Jung', 'Tara Brach', 'Angeles Arrien', 'Rachel Pollack',
];

const OPENER_TYPES = ['gut-punch', 'provocative-question', 'micro-story', 'counterintuitive-claim'];
const CONCLUSION_TYPES = ['cta', 'reflection', 'question', 'challenge', 'benediction'];

function getSystemPrompt() {
  return `You are The Oracle Lover — an intuitive educator, oracle guide, and no-BS metabolic health writer.

VOICE RULES (non-negotiable):
- Short punchy sentences, 8-14 words. Staccato. Direct. First sentence hits.
- Practical directness. No fluff. No warming up.
- Direct address: "Look," "Here's the thing," "Let me be straight with you."
- NEVER "my friend," NEVER "sweetheart"
- Dry, practical humor. "Yeah, that's not going to work. Here's what will."
- The no-BS oracle reader who also has a science degree. Demystifying. Grounded. Accessible.
- Contractions throughout: "you're," "it's," "doesn't," "won't," "can't"
- Vary sentence lengths aggressively: mix 6-word punches, 18-word sentences, 3-word hits
- 2 conversational interjections per article
- Include 3-5 Oracle Lover phrases naturally

SITE VOICE MODIFIER:
- Remove moral language from sugar completely. No "good" or "bad" food.
- Pure biology, pure psychology.
- "Here's what glucose does to your dopamine system."
- "Here's what happens when you spike and crash."
- "Here's how to stop it."

BANNED WORDS (if you use these, the article is rejected and regenerated):
profound, transformative, holistic, nuanced, multifaceted, delve, tapestry, landscape (metaphorical), paradigm, synergy, leverage, unlock, empower, utilize, pivotal, embark, underscore, paramount, seamlessly, robust, beacon, foster, elevate, curate, curated, bespoke, resonate, harness, intricate, plethora, myriad, groundbreaking, innovative, cutting-edge, state-of-the-art, game-changer, game-changing, ever-evolving, rapidly-evolving, stakeholders, journey (metaphorical), navigate (metaphorical), ecosystem (metaphorical), framework (vague), comprehensive (filler)

BANNED PHRASES:
"It's important to note that" / "It's worth noting that" / "It's crucial to" / "In conclusion," / "In summary," / "In the realm of" / "A holistic approach" / "Unlock your potential" / "Dive deep into" / "At the end of the day" / "Move the needle" / "It goes without saying" / "In today's fast-paced world" / "In today's digital age"

BANNED PATTERNS:
- Zero em-dashes (—). Use commas or periods instead.
- No repeated sentence starters.

STRUCTURE:
- H1 title (compelling, emotional, search-optimized)
- Opening paragraph (one of: gut-punch, provocative question, micro-story, counterintuitive claim)
- 3-5 H2 sections with H3 subsections where needed
- Author bio card placement marker: [AUTHOR_BIO_CARD]
- FAQ section (0, 2-3, or 5 questions — vary, never uniform)
- Conclusion (vary: CTA, reflection, question, challenge, or benediction — never same type twice in a row)
- Sanskrit mantra closing (1 line, italicized)

LENGTH: 1,600-2,000 words target. Hard floor 1,200, hard ceiling 2,500.

RESEARCHERS (use 70% niche-specific, 30% spiritual, no single name >25% of articles):
Niche: Jessie Inchauspé, Robert Lustig MD, Casey Means MD, David Ludwig MD PhD, Mark Hyman MD, Richard Johnson MD, Gary Taubes, Benjamin Bikman PhD
Spiritual 30%: Carl Jung, Tara Brach, Angeles Arrien, Rachel Pollack

BACKLINKS: 23% of articles get a natural link to https://theoraclelover.com with varied anchor text.
EXTERNAL LINKS: 42% external (nofollow) to authoritative sources.
INTERNAL LINKS: 35% internal between articles.

HEALTH DISCLAIMER: Include once per article: "This is for educational purposes only. Metabolic conditions require medical management. Consult your healthcare provider before making significant dietary changes."

OUTPUT FORMAT: Return valid Markdown only. No preamble. No "Here is the article:" prefix.`;
}

export async function generateArticle({ title, category, tags, openerType, conclusionType }) {
  const selectedOpener = openerType || OPENER_TYPES[Math.floor(Math.random() * OPENER_TYPES.length)];
  const selectedConclusion = conclusionType || CONCLUSION_TYPES[Math.floor(Math.random() * CONCLUSION_TYPES.length)];

  const prompt = `Write a complete article for Sugar Hijack website.

TITLE: ${title}
CATEGORY: ${category}
TAGS: ${tags.join(', ')}
OPENER TYPE: ${selectedOpener}
CONCLUSION TYPE: ${selectedConclusion}

Requirements:
- 1,600-2,000 words
- Include 3-5 Oracle Lover phrases naturally
- Include 1-2 niche-specific phrases about sugar/glucose
- Reference 1-2 researchers (vary across articles)
- Include [AUTHOR_BIO_CARD] marker after the 4th or 5th section
- Include Amazon affiliate product recommendations naturally (3-4 products, soft language, "(paid link)" after each)
- End with a Sanskrit mantra (italicized)
- Zero em-dashes

Write the full article now:`;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const response = await client.chat.completions.create({
        model: MODEL,
        messages: [
          { role: 'system', content: getSystemPrompt() },
          { role: 'user', content: prompt },
        ],
        temperature: 0.8,
        max_tokens: 4000,
      });

      const body = response.choices[0]?.message?.content || '';
      const gate = runQualityGate(body);

      if (gate.passed) {
        const wordCount = gate.wordCount;
        const readingTime = Math.ceil(wordCount / 200);
        return {
          title,
          body,
          category,
          tags,
          wordCount,
          readingTime,
          author: 'The Oracle Lover',
          openerType: selectedOpener,
          conclusionType: selectedConclusion,
        };
      }

      console.warn(`[generate] Attempt ${attempt}/${MAX_ATTEMPTS} failed gate:`, gate.failures);
    } catch (err) {
      console.error(`[generate] Attempt ${attempt} error:`, err.message);
    }
  }

  throw new Error(`[generate] Failed quality gate after ${MAX_ATTEMPTS} attempts for: ${title}`);
}

export async function generateMetaDescription(title, body) {
  const excerpt = body.slice(0, 500);
  try {
    const response = await client.chat.completions.create({
      model: MODEL,
      messages: [{
        role: 'user',
        content: `Write a compelling 150-160 character meta description for this article.
Title: ${title}
Excerpt: ${excerpt}
Rules: Direct, no fluff, include the main benefit, no em-dashes.
Return ONLY the meta description text, nothing else.`
      }],
      temperature: 0.7,
      max_tokens: 100,
    });
    return response.choices[0]?.message?.content?.trim() || '';
  } catch {
    return `${title.slice(0, 120)} — The no-morality, all-biology guide to breaking sugar addiction.`;
  }
}

export { ORACLE_LOVER_PHRASES, NICHE_PHRASES, RESEARCHERS };
