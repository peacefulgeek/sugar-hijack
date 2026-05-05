const MIN_WORDS = 1200;
const MAX_WORDS = 2500;

const BANNED_WORDS = [
  'profound', 'transformative', 'holistic', 'nuanced', 'multifaceted',
  'delve', 'tapestry', 'paradigm', 'synergy', 'leverage', 'unlock',
  'empower', 'utilize', 'pivotal', 'embark', 'underscore', 'paramount',
  'seamlessly', 'robust', 'beacon', 'foster', 'elevate', 'curate',
  'curated', 'bespoke', 'resonate', 'harness', 'intricate', 'plethora',
  'myriad', 'groundbreaking', 'innovative', 'cutting-edge', 'state-of-the-art',
  'game-changer', 'game-changing', 'ever-evolving', 'rapidly-evolving',
  'stakeholders', 'comprehensive'
];

const BANNED_PHRASES = [
  "it's important to note that",
  "it's worth noting that",
  "it's crucial to",
  "in conclusion,",
  "in summary,",
  "in the realm of",
  "a holistic approach",
  "unlock your potential",
  "dive deep into",
  "at the end of the day",
  "move the needle",
  "it goes without saying",
  "in today's fast-paced world",
  "in today's digital age",
  "landscape",
  "journey"
];

const BANNED_PATTERNS = [
  /\u2014/g,  // em-dash — ZERO tolerance
  /\u2013/g,  // en-dash
];

export function runQualityGate(body) {
  const failures = [];

  // 1. Word count
  const words = body.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  if (wordCount < MIN_WORDS) {
    failures.push(`word-count-too-low: ${wordCount} (min ${MIN_WORDS})`);
  }
  if (wordCount > MAX_WORDS) {
    failures.push(`word-count-too-high: ${wordCount} (max ${MAX_WORDS})`);
  }

  // 2. Em-dash check (zero tolerance)
  const emDashCount = (body.match(/\u2014/g) || []).length;
  if (emDashCount > 0) {
    failures.push(`em-dash-found: ${emDashCount} occurrences`);
  }

  // 3. Banned words
  const lowerBody = body.toLowerCase();
  for (const word of BANNED_WORDS) {
    const regex = new RegExp(`\\b${word.replace(/-/g, '[- ]')}\\b`, 'gi');
    if (regex.test(body)) {
      failures.push(`banned-word: "${word}"`);
    }
  }

  // 4. Banned phrases
  for (const phrase of BANNED_PHRASES) {
    if (lowerBody.includes(phrase.toLowerCase())) {
      failures.push(`banned-phrase: "${phrase}"`);
    }
  }

  // 5. Check for raw HTML anchor tags (must render as clickable)
  const rawAnchorCount = (body.match(/<a\s[^>]*href/gi) || []).length;
  // Raw HTML anchors are OK in markdown body — just log if excessive
  if (rawAnchorCount > 20) {
    failures.push(`excessive-raw-anchors: ${rawAnchorCount}`);
  }

  return {
    passed: failures.length === 0,
    failures,
    wordCount,
    emDashCount,
  };
}

export function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function stripBannedWords(text) {
  let result = text;
  // Replace em-dashes with comma or space
  result = result.replace(/\u2014/g, ', ');
  result = result.replace(/\u2013/g, '-');
  return result;
}
