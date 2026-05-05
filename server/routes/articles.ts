import express from 'express';
import { getAllPublished, getBySlug, getByCategory, getRelated } from '../../src/lib/articles-store.mjs';

export const articlesRouter = express.Router();

// GET /api/articles — list all published
articlesRouter.get('/', async (req, res) => {
  try {
    const { category, q, limit } = req.query;
    let articles = await getAllPublished();

    if (category) {
      articles = articles.filter(a => a.category === category);
    }

    if (q && typeof q === 'string') {
      const query = q.toLowerCase();
      articles = articles.filter(a =>
        a.title?.toLowerCase().includes(query) ||
        a.meta_description?.toLowerCase().includes(query) ||
        (a.tags || []).some((t: string) => t.toLowerCase().includes(query))
      );
    }

    if (limit) {
      articles = articles.slice(0, parseInt(limit as string, 10));
    }

    res.json({
      articles: articles.map(a => ({
        slug: a.slug,
        title: a.title,
        meta_description: a.meta_description,
        category: a.category,
        tags: a.tags,
        hero_url: a.hero_url,
        reading_time: a.reading_time,
        published_at: a.published_at,
        word_count: a.word_count,
      })),
      total: articles.length,
    });
  } catch (err: any) {
    console.error('[articles] list error:', err);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// GET /api/articles/:slug — single article
articlesRouter.get('/:slug', async (req, res) => {
  try {
    const article = await getBySlug(req.params.slug);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    const related = await getRelated(req.params.slug, 3);
    res.json({ article, related });
  } catch (err: any) {
    console.error('[articles] single error:', err);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// GET /api/articles/category/:category
articlesRouter.get('/category/:category', async (req, res) => {
  try {
    const articles = await getByCategory(req.params.category);
    res.json({ articles, total: articles.length });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch category articles' });
  }
});
