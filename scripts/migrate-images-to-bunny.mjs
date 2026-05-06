#!/usr/bin/env node
/**
 * One-time migration: download each article's hero_url, convert to WebP,
 * upload to Bunny CDN sugar-hijack zone, update the article JSON.
 * After migration, the article JSON will reference sugar-hijack.b-cdn.net URLs.
 */
import { readdir, readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = join(__dirname, '../src/data/articles');

const BUNNY_STORAGE_ZONE = 'sugar-hijack';
const BUNNY_API_KEY      = 'bc90ca4d-ca9a-4449-91fa87d55cd9-c7b3-4a40';
const BUNNY_PULL_ZONE    = 'https://sugar-hijack.b-cdn.net';
const BUNNY_HOSTNAME     = 'ny.storage.bunnycdn.com';

async function uploadToBunny(slug, sourceUrl) {
  console.log(`  Downloading: ${sourceUrl.substring(0, 60)}...`);
  const downloadRes = await fetch(sourceUrl, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; SugarHijack/1.0)' }
  });
  if (!downloadRes.ok) throw new Error(`download ${downloadRes.status}`);
  const imageBuffer = Buffer.from(await downloadRes.arrayBuffer());

  console.log(`  Converting to WebP...`);
  const webpBuffer = await sharp(imageBuffer)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .webp({ quality: 82 })
    .toBuffer();

  const destPath = `images/${slug}.webp`;
  const uploadUrl = `https://${BUNNY_HOSTNAME}/${BUNNY_STORAGE_ZONE}/${destPath}`;
  console.log(`  Uploading to Bunny: ${destPath} (${Math.round(webpBuffer.length / 1024)}KB)`);

  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      AccessKey: BUNNY_API_KEY,
      'Content-Type': 'image/webp',
    },
    body: webpBuffer,
  });

  if (!uploadRes.ok) {
    const body = await uploadRes.text();
    throw new Error(`upload ${uploadRes.status}: ${body}`);
  }

  return `${BUNNY_PULL_ZONE}/${destPath}`;
}

async function migrateAll() {
  const files = (await readdir(ARTICLES_DIR)).filter(f => f.endsWith('.json'));
  console.log(`\n🐰 Bunny CDN Image Migration`);
  console.log(`   Zone: ${BUNNY_STORAGE_ZONE}`);
  console.log(`   CDN:  ${BUNNY_PULL_ZONE}`);
  console.log(`   Articles: ${files.length}\n`);

  let success = 0;
  let skipped = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = join(ARTICLES_DIR, file);
    const article = JSON.parse(await readFile(filePath, 'utf8'));
    const slug = article.slug || file.replace('.json', '');

    // Already on Bunny CDN?
    if (article.hero_url && article.hero_url.includes('sugar-hijack.b-cdn.net')) {
      console.log(`✓ ${slug} — already on Bunny CDN`);
      skipped++;
      continue;
    }

    console.log(`\n→ ${slug}`);
    try {
      const cdnUrl = await uploadToBunny(slug, article.hero_url);
      article.hero_url = cdnUrl;
      // Also update og_image if it exists
      if (article.og_image) article.og_image = cdnUrl;
      await writeFile(filePath, JSON.stringify(article, null, 2));
      console.log(`  ✅ ${cdnUrl}`);
      success++;
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}`);
      failed++;
    }

    // Rate limit: 200ms between uploads
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\n📊 Migration complete:`);
  console.log(`   ✅ Uploaded: ${success}`);
  console.log(`   ⏭  Skipped:  ${skipped}`);
  console.log(`   ❌ Failed:   ${failed}`);
}

migrateAll().catch(console.error);
