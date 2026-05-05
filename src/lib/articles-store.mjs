/**
 * Article store — uses PostgreSQL when DATABASE_URL is set,
 * falls back to JSON files for local dev / small deploys.
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Use process.cwd() so paths work both from src/lib/ (dev) and dist/ (prod)
const DATA_DIR = path.resolve(process.cwd(), 'src/data');
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json');
const ARTICLES_DIR = path.join(DATA_DIR, 'articles');

let _useDb = null;

async function useDb() {
  if (_useDb === null) {
    _useDb = !!process.env.DATABASE_URL;
  }
  return _useDb;
}

async function readJsonStore() {
  // Try per-file directory first (seeded articles)
  try {
    const { existsSync, readdirSync, readFileSync } = await import('fs');
    if (existsSync(ARTICLES_DIR)) {
      const files = readdirSync(ARTICLES_DIR)
        .filter(f => f.endsWith('.json') && !f.startsWith('_'));
      const articles = files
        .map(f => {
          try { return JSON.parse(readFileSync(path.join(ARTICLES_DIR, f), 'utf8')); }
          catch { return null; }
        })
        .filter(Boolean);
      if (articles.length > 0) return articles;
    }
  } catch {}
  // Fallback to single articles.json
  try {
    const raw = await fs.readFile(ARTICLES_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeJsonStore(articles) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(ARTICLES_FILE, JSON.stringify(articles, null, 2));
}

export async function getAllPublished() {
  if (await useDb()) {
    const { query } = await import('./db.mjs');
    const { rows } = await query(
      `SELECT * FROM articles WHERE status='published' ORDER BY published_at DESC`
    );
    return rows;
  }
  const all = await readJsonStore();
  return all.filter(a => a.status === 'published').sort(
    (a, b) => new Date(b.published_at) - new Date(a.published_at)
  );
}

export async function getBySlug(slug) {
  if (await useDb()) {
    const { query } = await import('./db.mjs');
    const { rows } = await query(`SELECT * FROM articles WHERE slug=$1 LIMIT 1`, [slug]);
    return rows[0] || null;
  }
  const all = await readJsonStore();
  return all.find(a => a.slug === slug) || null;
}

export async function getByCategory(category) {
  if (await useDb()) {
    const { query } = await import('./db.mjs');
    const { rows } = await query(
      `SELECT * FROM articles WHERE status='published' AND category=$1 ORDER BY published_at DESC`,
      [category]
    );
    return rows;
  }
  const all = await readJsonStore();
  return all.filter(a => a.status === 'published' && a.category === category);
}

export async function getRelated(slug, limit = 3) {
  if (await useDb()) {
    const { query } = await import('./db.mjs');
    const { rows } = await query(
      `SELECT * FROM articles WHERE status='published' AND slug != $1 ORDER BY RANDOM() LIMIT $2`,
      [slug, limit]
    );
    return rows;
  }
  const all = await readJsonStore();
  return all
    .filter(a => a.status === 'published' && a.slug !== slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
}

export async function upsertArticle(article) {
  if (await useDb()) {
    const { query } = await import('./db.mjs');
    await query(`
      INSERT INTO articles (slug, title, meta_description, og_title, og_description,
        category, tags, body, hero_url, image_alt, reading_time, author, status,
        cta_primary, asins_used, word_count, queued_at, published_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)
      ON CONFLICT (slug) DO UPDATE SET
        title=EXCLUDED.title, body=EXCLUDED.body, hero_url=EXCLUDED.hero_url,
        status=EXCLUDED.status, published_at=EXCLUDED.published_at,
        updated_at=NOW()
    `, [
      article.slug, article.title, article.meta_description, article.og_title,
      article.og_description, article.category, article.tags, article.body,
      article.hero_url, article.image_alt, article.reading_time, article.author,
      article.status, article.cta_primary, article.asins_used, article.word_count,
      article.queued_at, article.published_at
    ]);
    return;
  }
  const all = await readJsonStore();
  const idx = all.findIndex(a => a.slug === article.slug);
  if (idx >= 0) {
    all[idx] = { ...all[idx], ...article, updated_at: new Date().toISOString() };
  } else {
    all.push({ ...article, id: Date.now(), created_at: new Date().toISOString() });
  }
  await writeJsonStore(all);
}

export async function getPublishedCount() {
  if (await useDb()) {
    const { query } = await import('./db.mjs');
    const { rows } = await query(`SELECT count(*)::int as count FROM articles WHERE status='published'`);
    return rows[0].count;
  }
  const all = await readJsonStore();
  return all.filter(a => a.status === 'published').length;
}

export async function getQueuedArticle() {
  if (await useDb()) {
    const { query } = await import('./db.mjs');
    const { rows } = await query(
      `SELECT * FROM articles WHERE status='queued' ORDER BY queued_at ASC LIMIT 1`
    );
    return rows[0] || null;
  }
  const all = await readJsonStore();
  return all.filter(a => a.status === 'queued').sort(
    (a, b) => new Date(a.queued_at) - new Date(b.queued_at)
  )[0] || null;
}
