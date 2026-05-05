import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { createElement } from 'react';
import { App } from '../src/client/App.js';
import { buildSsrHead } from './ssrHead.js';
import { getBySlug, getAllPublished } from '../src/lib/articles-store.mjs';
import fs from 'fs';
import path from 'path';

// ─── Read Vite manifest for hashed asset filenames ───
let _manifest: any = null;
function getManifest() {
  if (_manifest) return _manifest;
  try {
    const manifestPath = path.resolve(process.cwd(), 'dist/client/.vite/manifest.json');
    _manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch {
    _manifest = {};
  }
  return _manifest;
}

function getClientAssets(): { js: string; css: string[] } {
  const manifest = getManifest();
  const entry = manifest['src/client/entry-client.tsx'];
  if (entry) {
    return {
      js: `/${entry.file}`,
      css: (entry.css || []).map((c: string) => `/${c}`),
    };
  }
  // Fallback: scan dist/client/assets for entry-client JS
  try {
    const assetsDir = path.resolve(process.cwd(), 'dist/client/assets');
    const files = fs.readdirSync(assetsDir);
    const jsFile = files.find(f => f.startsWith('entry-client') && f.endsWith('.js'));
    const cssFile = files.find(f => f.startsWith('entry-client') && f.endsWith('.css'));
    return {
      js: jsFile ? `/assets/${jsFile}` : '/assets/entry-client.js',
      css: cssFile ? [`/assets/${cssFile}`] : [],
    };
  } catch {
    return { js: '/assets/entry-client.js', css: [] };
  }
}

export async function render(url: string, req: any) {
  // Pre-fetch data for SSR
  let pageData: any = {};
  let status = 200;

  try {
    if (url.startsWith('/articles/') && url !== '/articles/') {
      const slug = url.replace('/articles/', '').split('?')[0].split('#')[0];
      const article = await getBySlug(slug);
      if (!article) {
        status = 404;
        pageData = { notFound: true };
      } else {
        pageData = { article };
      }
    } else if (url === '/articles' || url === '/articles/') {
      const articles = await getAllPublished();
      pageData = { articles };
    } else if (url === '/' || url === '') {
      const articles = await getAllPublished();
      pageData = { articles: articles.slice(0, 9) };
    }
  } catch (err) {
    console.error('[ssr] Data fetch error:', err);
  }

  const appHtml = renderToString(
    createElement(StaticRouter, { location: url },
      createElement(App, { ssrData: pageData })
    )
  );

  const head = buildSsrHead(url, pageData, req);
  const assets = getClientAssets();

  const cssLinks = assets.css.map(href =>
    `<link rel="stylesheet" href="${href}" />`
  ).join('\n  ');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  ${head}
  ${cssLinks}
  <link rel="preconnect" href="https://the-sugar-detach.b-cdn.net" crossorigin />
</head>
<body>
  <div id="root">${appHtml}</div>
  <script>window.__SSR_DATA__ = ${JSON.stringify(pageData).replace(/</g, '\\u003c')};</script>
  <script type="module" src="${assets.js}"></script>
</body>
</html>`;

  return { html, status };
}
