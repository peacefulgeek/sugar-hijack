import express from 'express';
import { getAllPublished } from '../../src/lib/articles-store.mjs';

export const sitemapRouter = express.Router();

sitemapRouter.get('/', async (req, res) => {
  try {
    const articles = await getAllPublished();
    const host = req.hostname || 'thesugardetach.com';
    const base = `https://${host}`;
    const now = new Date().toISOString();

    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/articles', priority: '0.9', changefreq: 'daily' },
      { url: '/about', priority: '0.7', changefreq: 'monthly' },
      { url: '/recommended', priority: '0.8', changefreq: 'weekly' },
      { url: '/assessment', priority: '0.8', changefreq: 'monthly' },
      { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
    ];

    const urls = [
      ...staticPages.map(p => `
  <url>
    <loc>${base}${p.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`),
      ...articles.map(a => `
  <url>
    <loc>${base}/articles/${a.slug}</loc>
    <lastmod>${a.updated_at || a.published_at || now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    ${a.hero_url ? `<image:image>
      <image:loc>${a.hero_url}</image:loc>
      <image:title>${(a.title || '').replace(/[<>&"]/g, '')}</image:title>
    </image:image>` : ''}
  </url>`),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('')}
</urlset>`;

    res.set('Content-Type', 'application/xml').send(xml);
  } catch (err: any) {
    console.error('[sitemap] error:', err);
    res.status(500).send('<?xml version="1.0"?><urlset></urlset>');
  }
});
