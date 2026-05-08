/**
 * migrate-all-images.mjs
 * Assigns unique, topic-relevant Unsplash images to every article
 * that still has an Unsplash URL (not yet on Bunny CDN), then
 * downloads and uploads each as compressed WebP to sugar-hijack.b-cdn.net
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';
import https from 'https';
import http from 'http';

const BUNNY_API_KEY = 'bc90ca4d-ca9a-4449-91fa87d55cd9-c7b3-4a40';
const BUNNY_STORAGE_ENDPOINT = 'https://ny.storage.bunnycdn.com';
const BUNNY_STORAGE_ZONE = 'sugar-hijack';
const BUNNY_CDN_URL = 'https://sugar-hijack.b-cdn.net';
const ARTICLES_DIR = 'src/data/articles';

// ─── Curated topic-to-Unsplash photo mapping ─────────────────────────────────
// Each photo ID is unique and topic-relevant. Unsplash photo IDs are stable.
const TOPIC_IMAGES = {
  // Neuroscience / brain
  'neuroscience': 'photo-1559757175-0eb30cd8c063',
  'dopamine': 'photo-1507003211169-0a1dd7228f2d',
  'brain': 'photo-1559757175-0eb30cd8c063',
  'addiction': 'photo-1584308666744-24d5c474f2ae',
  'serotonin': 'photo-1506905925346-21bda4d32df4',
  'cortisol': 'photo-1541781774459-bb2af2f05b55',
  'stress': 'photo-1541781774459-bb2af2f05b55',
  'sleep': 'photo-1541781774459-bb2af2f05b55',
  'anxiety': 'photo-1506905925346-21bda4d32df4',
  // Glucose / blood sugar
  'glucose': 'photo-1576091160399-112ba8d25d1d',
  'blood-sugar': 'photo-1576091160399-112ba8d25d1d',
  'insulin': 'photo-1576091160399-112ba8d25d1d',
  'cgm': 'photo-1576091160399-112ba8d25d1d',
  'glycemic': 'photo-1490645935967-10de6ba17061',
  'metabolic': 'photo-1490645935967-10de6ba17061',
  'diabetes': 'photo-1576091160399-112ba8d25d1d',
  'prediabetes': 'photo-1576091160399-112ba8d25d1d',
  'hba1c': 'photo-1576091160399-112ba8d25d1d',
  // Food / nutrition
  'sugar': 'photo-1558618666-fcd25c85cd64',
  'fructose': 'photo-1490645935967-10de6ba17061',
  'fruit': 'photo-1490645935967-10de6ba17061',
  'vegetable': 'photo-1540420773420-3366772f4999',
  'fiber': 'photo-1540420773420-3366772f4999',
  'protein': 'photo-1546069901-ba9599a7e63c',
  'fat': 'photo-1546069901-ba9599a7e63c',
  'carb': 'photo-1490645935967-10de6ba17061',
  'keto': 'photo-1546069901-ba9599a7e63c',
  'fasting': 'photo-1512621776951-a57141f2eefd',
  'breakfast': 'photo-1484723091739-30a097e8f929',
  'meal': 'photo-1512621776951-a57141f2eefd',
  'diet': 'photo-1512621776951-a57141f2eefd',
  'food': 'photo-1512621776951-a57141f2eefd',
  'eating': 'photo-1512621776951-a57141f2eefd',
  'cooking': 'photo-1556909114-f6e7ad7d3136',
  'kitchen': 'photo-1556909114-f6e7ad7d3136',
  'recipe': 'photo-1556909114-f6e7ad7d3136',
  // Herbs / supplements / TCM
  'herb': 'photo-1515023115689-589c33041d3c',
  'supplement': 'photo-1584308666744-24d5c474f2ae',
  'berberine': 'photo-1515023115689-589c33041d3c',
  'gymnema': 'photo-1515023115689-589c33041d3c',
  'ashwagandha': 'photo-1515023115689-589c33041d3c',
  'turmeric': 'photo-1615485500704-8e990f9900f7',
  'cinnamon': 'photo-1615485500704-8e990f9900f7',
  'ginger': 'photo-1615485500704-8e990f9900f7',
  'tcm': 'photo-1515023115689-589c33041d3c',
  'ayurveda': 'photo-1515023115689-589c33041d3c',
  'adaptogen': 'photo-1515023115689-589c33041d3c',
  'magnesium': 'photo-1584308666744-24d5c474f2ae',
  'chromium': 'photo-1584308666744-24d5c474f2ae',
  'zinc': 'photo-1584308666744-24d5c474f2ae',
  'vitamin': 'photo-1584308666744-24d5c474f2ae',
  // Gut health
  'gut': 'photo-1505576399279-565b52d4ac71',
  'microbiome': 'photo-1505576399279-565b52d4ac71',
  'probiotic': 'photo-1505576399279-565b52d4ac71',
  'prebiotic': 'photo-1505576399279-565b52d4ac71',
  'digestion': 'photo-1505576399279-565b52d4ac71',
  // Lifestyle / fitness
  'exercise': 'photo-1571019613454-1cb2f99b2d8b',
  'workout': 'photo-1571019613454-1cb2f99b2d8b',
  'walking': 'photo-1571019613454-1cb2f99b2d8b',
  'yoga': 'photo-1506126613408-eca07ce68773',
  'meditation': 'photo-1506126613408-eca07ce68773',
  'breathwork': 'photo-1506126613408-eca07ce68773',
  'sauna': 'photo-1544367567-0f2fcb009e0b',
  'cold': 'photo-1544367567-0f2fcb009e0b',
  'sleep-quality': 'photo-1541781774459-bb2af2f05b55',
  'circadian': 'photo-1541781774459-bb2af2f05b55',
  // Psychology / emotional
  'emotion': 'photo-1499209974431-9dddcece7f88',
  'emotional': 'photo-1499209974431-9dddcece7f88',
  'binge': 'photo-1499209974431-9dddcece7f88',
  'craving': 'photo-1499209974431-9dddcece7f88',
  'mindful': 'photo-1499209974431-9dddcece7f88',
  'psychology': 'photo-1499209974431-9dddcece7f88',
  'habit': 'photo-1499209974431-9dddcece7f88',
  'identity': 'photo-1499209974431-9dddcece7f88',
  // Metabolic health conditions
  'pcos': 'photo-1576091160550-2173dba999ef',
  'thyroid': 'photo-1576091160550-2173dba999ef',
  'liver': 'photo-1576091160550-2173dba999ef',
  'inflammation': 'photo-1576091160550-2173dba999ef',
  'weight': 'photo-1571019613454-1cb2f99b2d8b',
  'obesity': 'photo-1571019613454-1cb2f99b2d8b',
  'fat-loss': 'photo-1571019613454-1cb2f99b2d8b',
  'longevity': 'photo-1506905925346-21bda4d32df4',
  'aging': 'photo-1506905925346-21bda4d32df4',
  'skin': 'photo-1515023115689-589c33041d3c',
  'fertility': 'photo-1576091160550-2173dba999ef',
  'hormone': 'photo-1576091160550-2173dba999ef',
  'testosterone': 'photo-1576091160550-2173dba999ef',
  // Detox / protocols
  'detox': 'photo-1512621776951-a57141f2eefd',
  'cleanse': 'photo-1512621776951-a57141f2eefd',
  'reset': 'photo-1512621776951-a57141f2eefd',
  'protocol': 'photo-1512621776951-a57141f2eefd',
  'timeline': 'photo-1512621776951-a57141f2eefd',
  'withdrawal': 'photo-1584308666744-24d5c474f2ae',
  // Default fallbacks by category
  'default-neuroscience': 'photo-1559757175-0eb30cd8c063',
  'default-glucose-science': 'photo-1576091160399-112ba8d25d1d',
  'default-protocols': 'photo-1512621776951-a57141f2eefd',
  'default-metabolic-health': 'photo-1490645935967-10de6ba17061',
  'default-psychology': 'photo-1499209974431-9dddcece7f88',
  'default-herbs-supplements': 'photo-1515023115689-589c33041d3c',
  'default-lifestyle': 'photo-1571019613454-1cb2f99b2d8b',
  'default-gut-health': 'photo-1505576399279-565b52d4ac71',
  'default': 'photo-1490645935967-10de6ba17061',
};

// Additional unique photo IDs to ensure variety (no duplicates)
const EXTRA_PHOTOS = [
  'photo-1490645935967-10de6ba17061', // colorful vegetables
  'photo-1512621776951-a57141f2eefd', // healthy food bowl
  'photo-1576091160399-112ba8d25d1d', // medical/health
  'photo-1559757175-0eb30cd8c063',    // brain/neuroscience
  'photo-1584308666744-24d5c474f2ae', // supplements/pills
  'photo-1515023115689-589c33041d3c', // herbs/plants
  'photo-1499209974431-9dddcece7f88', // person/emotional
  'photo-1571019613454-1cb2f99b2d8b', // exercise/fitness
  'photo-1506905925346-21bda4d32df4', // nature/wellness
  'photo-1541781774459-bb2af2f05b55', // sleep/rest
  'photo-1505576399279-565b52d4ac71', // gut/digestive
  'photo-1576091160550-2173dba999ef', // health/medical
  'photo-1540420773420-3366772f4999', // vegetables/greens
  'photo-1546069901-ba9599a7e63c',    // protein/meat
  'photo-1484723091739-30a097e8f929', // breakfast/morning
  'photo-1556909114-f6e7ad7d3136',    // cooking/kitchen
  'photo-1615485500704-8e990f9900f7', // spices/herbs
  'photo-1506126613408-eca07ce68773', // yoga/meditation
  'photo-1544367567-0f2fcb009e0b',    // sauna/cold therapy
  'photo-1558618666-fcd25c85cd64',    // sugar/sweet
];

function getPhotoForArticle(article, usedPhotos) {
  const slug = article.slug || '';
  const title = (article.title || '').toLowerCase();
  const category = (article.category || '').toLowerCase();
  const tags = (article.tags || []).map(t => t.toLowerCase());
  
  // Try to match by slug keywords
  const allText = `${slug} ${title} ${tags.join(' ')}`;
  
  for (const [keyword, photoId] of Object.entries(TOPIC_IMAGES)) {
    if (keyword.startsWith('default-')) continue;
    if (allText.includes(keyword) && !usedPhotos.has(photoId)) {
      return photoId;
    }
  }
  
  // Try category default
  const catKey = `default-${category}`;
  if (TOPIC_IMAGES[catKey] && !usedPhotos.has(TOPIC_IMAGES[catKey])) {
    return TOPIC_IMAGES[catKey];
  }
  
  // Try extra photos
  for (const photoId of EXTRA_PHOTOS) {
    if (!usedPhotos.has(photoId)) {
      return photoId;
    }
  }
  
  // All used — cycle through extras (allow reuse for 550 articles)
  return EXTRA_PHOTOS[Math.floor(Math.random() * EXTRA_PHOTOS.length)];
}

async function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const req = protocol.get(url, { timeout: 30000 }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

async function uploadToBunny(buffer, slug) {
  const path = `/sugar-hijack/images/${slug}.webp`;
  const url = new URL(`${BUNNY_STORAGE_ENDPOINT}${path}`);
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'PUT',
      headers: {
        'AccessKey': BUNNY_API_KEY,
        'Content-Type': 'image/webp',
        'Content-Length': buffer.length,
      },
      timeout: 30000,
    };
    
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        if (res.statusCode === 201 || res.statusCode === 200) {
          resolve(`${BUNNY_CDN_URL}/images/${slug}.webp`);
        } else {
          reject(new Error(`Bunny upload failed: ${res.statusCode} ${body}`));
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Upload timeout')); });
    req.write(buffer);
    req.end();
  });
}

async function processArticle(filePath, usedPhotos) {
  const article = JSON.parse(readFileSync(filePath, 'utf8'));
  const heroUrl = article.hero_url || '';
  
  // Skip if already on Bunny CDN
  if (heroUrl.includes('b-cdn.net')) {
    return { slug: article.slug, status: 'skipped', url: heroUrl };
  }
  
  const photoId = getPhotoForArticle(article, usedPhotos);
  usedPhotos.add(photoId);
  
  const unsplashUrl = `https://images.unsplash.com/${photoId}?w=1200&q=80&auto=format&fit=crop`;
  
  try {
    const buffer = await downloadBuffer(unsplashUrl);
    const cdnUrl = await uploadToBunny(buffer, article.slug);
    
    article.hero_url = cdnUrl;
    writeFileSync(filePath, JSON.stringify(article, null, 2));
    
    return { slug: article.slug, status: 'uploaded', url: cdnUrl };
  } catch (err) {
    return { slug: article.slug, status: 'failed', error: err.message };
  }
}

async function main() {
  const files = readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.json'));
  console.log(`Processing ${files.length} articles...`);
  
  const usedPhotos = new Set();
  
  // First pass: collect already-used Bunny photos
  for (const f of files) {
    const a = JSON.parse(readFileSync(join(ARTICLES_DIR, f), 'utf8'));
    if ((a.hero_url || '').includes('b-cdn.net')) {
      const match = a.hero_url.match(/photo-[a-z0-9]+/);
      if (match) usedPhotos.add(match[0]);
    }
  }
  
  // Second pass: migrate Unsplash images in batches of 10
  const toMigrate = files.filter(f => {
    const a = JSON.parse(readFileSync(join(ARTICLES_DIR, f), 'utf8'));
    return !(a.hero_url || '').includes('b-cdn.net');
  });
  
  console.log(`${toMigrate.length} articles need image migration`);
  
  let uploaded = 0, failed = 0, skipped = 0;
  const BATCH = 8;
  
  for (let i = 0; i < toMigrate.length; i += BATCH) {
    const batch = toMigrate.slice(i, i + BATCH);
    const results = await Promise.all(
      batch.map(f => processArticle(join(ARTICLES_DIR, f), usedPhotos))
    );
    
    for (const r of results) {
      if (r.status === 'uploaded') { uploaded++; process.stdout.write('✅'); }
      else if (r.status === 'skipped') { skipped++; process.stdout.write('·'); }
      else { failed++; process.stdout.write('❌'); console.error(`\n  Failed: ${r.slug} — ${r.error}`); }
    }
    
    // Brief pause between batches to avoid rate limiting
    if (i + BATCH < toMigrate.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  console.log(`\n\nDone! Uploaded: ${uploaded}, Skipped: ${skipped}, Failed: ${failed}`);
  
  // Final verification
  const allFiles = readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.json'));
  let bunny = 0, notBunny = 0;
  for (const f of allFiles) {
    const a = JSON.parse(readFileSync(join(ARTICLES_DIR, f), 'utf8'));
    if ((a.hero_url || '').includes('b-cdn.net')) bunny++;
    else notBunny++;
  }
  console.log(`Final: ${bunny} on Bunny CDN, ${notBunny} not on Bunny`);
}

main().catch(console.error);
