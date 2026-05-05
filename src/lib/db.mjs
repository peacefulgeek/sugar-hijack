import pg from 'pg';
const { Pool } = pg;

let pool;

function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      // JSON file fallback for development without a database
      return null;
    }
    pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
    pool.on('error', (err) => {
      console.error('[db] Unexpected pool error:', err);
    });
  }
  return pool;
}

export async function query(text, params) {
  const p = getPool();
  if (!p) throw new Error('DATABASE_URL not set — cannot run query');
  const start = Date.now();
  const res = await p.query(text, params);
  const duration = Date.now() - start;
  if (duration > 1000) {
    console.warn(`[db] Slow query (${duration}ms):`, text.slice(0, 80));
  }
  return res;
}

export async function initSchema() {
  const p = getPool();
  if (!p) {
    console.log('[db] No DATABASE_URL — skipping schema init (using JSON fallback)');
    return;
  }
  await p.query(`
    CREATE TABLE IF NOT EXISTS articles (
      id            SERIAL PRIMARY KEY,
      slug          TEXT UNIQUE NOT NULL,
      title         TEXT NOT NULL,
      meta_description TEXT,
      og_title      TEXT,
      og_description TEXT,
      category      TEXT,
      tags          TEXT[],
      body          TEXT NOT NULL,
      hero_url      TEXT,
      image_alt     TEXT,
      reading_time  INT,
      author        TEXT DEFAULT 'The Oracle Lover',
      status        TEXT DEFAULT 'draft' CHECK (status IN ('draft','queued','published')),
      cta_primary   TEXT,
      asins_used    TEXT[],
      word_count    INT,
      queued_at     TIMESTAMPTZ,
      published_at  TIMESTAMPTZ,
      last_refreshed_at TIMESTAMPTZ,
      created_at    TIMESTAMPTZ DEFAULT NOW(),
      updated_at    TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
    CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
    CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
    CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);

    CREATE TABLE IF NOT EXISTS assessments (
      id            SERIAL PRIMARY KEY,
      slug          TEXT UNIQUE NOT NULL,
      title         TEXT NOT NULL,
      description   TEXT,
      questions     JSONB NOT NULL,
      results       JSONB NOT NULL,
      created_at    TIMESTAMPTZ DEFAULT NOW()
    );
  `);
  console.log('[db] Schema initialized');
}

export default { query, initSchema };
