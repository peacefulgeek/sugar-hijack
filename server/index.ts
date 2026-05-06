import express from 'express';
import compression from 'compression';
import path from 'path';
import { articlesRouter } from './routes/articles.js';
import { healthRouter } from './routes/health.js';
import { sitemapRouter } from './routes/sitemap.js';
import { robotsRouter } from './routes/robots.js';
import { llmsRouter } from './routes/llms.js';
import { assessmentsRouter } from './routes/assessments.js';

// __dirname is available in CJS (esbuild format:cjs) and also in tsx via shim
// Use process.cwd() as the project root for reliable path resolution
const projectRoot = process.cwd();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

// ─── WWW → apex 301 redirect ───
app.use((req, res, next) => {
  const host = req.headers.host || '';
  if (host.startsWith('www.')) {
    const apex = host.slice(4);
    return res.redirect(301, `https://${apex}${req.url}`);
  }
  next();
});

// ─── Middleware ───
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Security headers ───
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// ─── Static assets (from Vite build) ───
const clientDist = path.resolve(projectRoot, 'dist/client');
app.use('/assets', express.static(path.join(clientDist, 'assets'), {
  maxAge: '1y',
  immutable: true,
}));

// ─── Favicon ───
app.use('/favicon.ico', express.static(path.join(clientDist, 'favicon.ico')));

// ─── API Routes ───
app.use('/health', healthRouter);
app.use('/sitemap.xml', sitemapRouter);
app.use('/robots.txt', robotsRouter);
app.use('/llms.txt', llmsRouter);

// ─── ai.txt (AI crawler permissions) ───
app.get('/ai.txt', (req, res) => {
  res.type('text/plain').send(`# ai.txt for sugarhijack.com
# AI crawler permissions — we welcome responsible AI indexing

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

# Site information
Site: https://sugarhijack.com
Name: Sugar Hijack
Description: Evidence-based articles on sugar detox, blood sugar balance, and metabolic health
Author: The Oracle Lover
Contact: hello@sugarhijack.com
License: https://sugarhijack.com/privacy

# Content type
Type: Educational health content
Topics: sugar detox, blood sugar, metabolic health, insulin resistance, sugar addiction, glucose management

# LLM discovery
llms.txt: https://sugarhijack.com/llms.txt
llms-full.txt: https://sugarhijack.com/llms-full.txt
`);
});
app.use('/api/articles', articlesRouter);
app.use('/api/assessments', assessmentsRouter);

// ─── SSR for all other routes ───
app.get('*', async (req, res) => {
  try {
    const { render } = await import('./ssr.js');
    const url = req.originalUrl;
    const { html, status } = await render(url, req);
    res.status(status || 200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (err) {
    console.error('[ssr] Error:', err);
    res.status(500).send('<h1>Server Error</h1>');
  }
});

// ─── Start ───
app.listen(PORT, () => {
  console.log(`[server] Sugar Hijack running on port ${PORT}`);
  console.log(`[server] NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`[server] AUTO_GEN_ENABLED: ${process.env.AUTO_GEN_ENABLED}`);
});

export default app;
