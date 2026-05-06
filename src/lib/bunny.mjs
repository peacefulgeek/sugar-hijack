// HARDCODE per site. DO NOT move these to env vars.
const BUNNY_STORAGE_ZONE = 'sugar-hijack';
const BUNNY_API_KEY      = 'bc90ca4d-ca9a-4449-91fa87d55cd9-c7b3-4a40';
const BUNNY_PULL_ZONE    = 'https://sugar-hijack.b-cdn.net';
const BUNNY_HOSTNAME     = 'ny.storage.bunnycdn.com';

/**
 * Download a source image URL, convert to compressed WebP via sharp,
 * upload to Bunny CDN at images/{slug}.webp, return the CDN URL.
 */
export async function uploadImageToBunny(slug, sourceUrl) {
  try {
    const downloadRes = await fetch(sourceUrl);
    if (!downloadRes.ok) throw new Error(`download ${downloadRes.status}`);
    const imageBuffer = Buffer.from(await downloadRes.arrayBuffer());

    // Convert to WebP with sharp
    const { default: sharp } = await import('sharp');
    const webpBuffer = await sharp(imageBuffer)
      .resize(1200, 630, { fit: 'cover', position: 'centre' })
      .webp({ quality: 82 })
      .toBuffer();

    const destPath = `images/${slug}.webp`;
    const uploadUrl = `https://${BUNNY_HOSTNAME}/${BUNNY_STORAGE_ZONE}/${destPath}`;
    const uploadRes = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        AccessKey: BUNNY_API_KEY,
        'Content-Type': 'image/webp',
      },
      body: webpBuffer,
    });
    if (!uploadRes.ok) throw new Error(`upload ${uploadRes.status}: ${await uploadRes.text()}`);
    console.log(`[bunny] uploaded ${slug}.webp → ${BUNNY_PULL_ZONE}/${destPath}`);
    return `${BUNNY_PULL_ZONE}/${destPath}`;
  } catch (err) {
    console.warn(`[bunny.uploadImageToBunny] failed for ${slug}: ${err.message}`);
    return null;
  }
}

/**
 * Pick a topic-matched Unsplash image, upload to Bunny as WebP, return CDN URL.
 * Falls back to Unsplash URL if upload fails.
 */
export async function assignHeroImage(slug, tags = [], category = '') {
  const sourceUrl = getTopicImage(tags, category);
  const cdnUrl = await uploadImageToBunny(slug, sourceUrl);
  return cdnUrl || sourceUrl;
}

/**
 * Upload an arbitrary WebP buffer to a target path under the storage zone.
 */
export async function uploadWebP(targetPath, buffer) {
  const url = `https://${BUNNY_HOSTNAME}/${BUNNY_STORAGE_ZONE}/${targetPath.replace(/^\//, '')}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: { AccessKey: BUNNY_API_KEY, 'Content-Type': 'image/webp' },
    body: buffer,
  });
  if (!res.ok) throw new Error(`bunny upload ${res.status} for ${targetPath}`);
  return `${BUNNY_PULL_ZONE}/${targetPath.replace(/^\//, '')}`;
}

export const PULL_ZONE = BUNNY_PULL_ZONE;
export const STORAGE_ZONE = BUNNY_STORAGE_ZONE;
export const API_KEY = BUNNY_API_KEY;
export const HOSTNAME = BUNNY_HOSTNAME;

// Topic-specific hero images (curated Unsplash — downloaded, converted, uploaded to Bunny)
export const TOPIC_IMAGES = {
  'dopamine':     'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1400&q=90',
  'glucose':      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=90',
  'nutrition':    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400&q=90',
  'fasting':      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1400&q=90',
  'stress':       'https://images.unsplash.com/photo-1541199249251-f713e6145474?w=1400&q=90',
  'sleep':        'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1400&q=90',
  'exercise':     'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=90',
  'sugar':        'https://images.unsplash.com/photo-1559181567-c3190ca9d715?w=1400&q=90',
  'brain':        'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=1400&q=90',
  'inflammation': 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=1400&q=90',
  'gut':          'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1400&q=90',
  'hormones':     'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=90',
  'insulin':      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=90',
  'detox':        'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1400&q=90',
  'psychology':   'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1400&q=90',
  'food':         'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400&q=90',
  'children':     'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1400&q=90',
  'women':        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=90',
  'liver':        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=90',
  'microbiome':   'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=90',
  'magnesium':    'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=1400&q=90',
  'vinegar':      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1400&q=90',
  'cgm':          'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=90',
  'protein':      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1400&q=90',
  'breakfast':    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1400&q=90',
  'walking':      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=90',
  'herbs':        'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=1400&q=90',
  'tcm':          'https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=1400&q=90',
  'supplements':  'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=1400&q=90',
  'cravings':     'https://images.unsplash.com/photo-1559181567-c3190ca9d715?w=1400&q=90',
  'addiction':    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1400&q=90',
  'metabolic':    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=90',
  'lifestyle':    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=90',
  'protocols':    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1400&q=90',
  'default':      'https://images.unsplash.com/photo-1559181567-c3190ca9d715?w=1400&q=90',
};

export function getTopicImage(tags = [], category = '') {
  const all = [...(Array.isArray(tags) ? tags : []).map(t => t.toLowerCase()), (category || '').toLowerCase()];
  for (const key of all) {
    if (!key) continue;
    if (TOPIC_IMAGES[key]) return TOPIC_IMAGES[key];
    // partial match
    for (const [k, v] of Object.entries(TOPIC_IMAGES)) {
      if (k === 'default') continue;
      if (key.includes(k) || k.includes(key)) return v;
    }
  }
  return TOPIC_IMAGES.default;
}
