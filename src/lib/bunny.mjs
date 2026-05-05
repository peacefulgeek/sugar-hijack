// HARDCODE per site. DO NOT move these to env vars.
const BUNNY_STORAGE_ZONE = 'the-sugar-detach';
const BUNNY_API_KEY      = 'BUNNY_API_KEY_PLACEHOLDER';  // Paul will provide
const BUNNY_PULL_ZONE    = 'https://the-sugar-detach.b-cdn.net';
const BUNNY_HOSTNAME     = 'ny.storage.bunnycdn.com';

// Fallback placeholder images for development (Unsplash)
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1559181567-c3190ca9d715?w=1200&q=80', // sugar/food
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80', // healthy food
  'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=1200&q=80', // glucose/science
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80', // wellness
  'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&q=80', // nutrition
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80', // medical
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80', // vegetables
  'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1200&q=80', // brain/mind
];

/**
 * Pick a random library image, copy it to /images/{slug}.webp, return the public URL.
 * Falls back to Unsplash placeholder if Bunny is not yet configured.
 */
export async function assignHeroImage(slug) {
  // If Bunny is not yet configured, use fallback
  if (BUNNY_API_KEY === 'BUNNY_API_KEY_PLACEHOLDER') {
    const idx = Math.floor(Math.random() * FALLBACK_IMAGES.length);
    return FALLBACK_IMAGES[idx];
  }

  const idx = String(Math.floor(Math.random() * 40) + 1).padStart(2, '0');
  const sourceFile = `lib-${idx}.webp`;
  const destFile   = `${slug}.webp`;

  try {
    const sourceUrl = `${BUNNY_PULL_ZONE}/library/${sourceFile}`;
    const downloadRes = await fetch(sourceUrl);
    if (!downloadRes.ok) throw new Error(`download ${downloadRes.status}`);
    const imageBuffer = await downloadRes.arrayBuffer();

    const uploadUrl = `https://${BUNNY_HOSTNAME}/${BUNNY_STORAGE_ZONE}/images/${destFile}`;
    const uploadRes = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { AccessKey: BUNNY_API_KEY, 'Content-Type': 'image/webp' },
      body: imageBuffer,
    });
    if (!uploadRes.ok) throw new Error(`upload ${uploadRes.status}`);
    return `${BUNNY_PULL_ZONE}/images/${destFile}`;
  } catch (err) {
    console.warn(`[bunny.assignHeroImage] copy failed (${err.message}), using fallback`);
    const idx2 = Math.floor(Math.random() * FALLBACK_IMAGES.length);
    return FALLBACK_IMAGES[idx2];
  }
}

/**
 * Upload an arbitrary WebP buffer to a target path under the storage zone.
 */
export async function uploadWebP(targetPath, buffer) {
  if (BUNNY_API_KEY === 'BUNNY_API_KEY_PLACEHOLDER') {
    throw new Error('Bunny CDN not configured — set BUNNY_API_KEY');
  }
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

// Topic-specific hero images (curated Unsplash for dev)
export const TOPIC_IMAGES = {
  'dopamine': 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1200&q=80',
  'glucose': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
  'nutrition': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80',
  'fasting': 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80',
  'stress': 'https://images.unsplash.com/photo-1541199249251-f713e6145474?w=1200&q=80',
  'sleep': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1200&q=80',
  'exercise': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
  'default': 'https://images.unsplash.com/photo-1559181567-c3190ca9d715?w=1200&q=80',
};

export function getTopicImage(tags = []) {
  for (const tag of tags) {
    const key = tag.toLowerCase();
    if (TOPIC_IMAGES[key]) return TOPIC_IMAGES[key];
  }
  return TOPIC_IMAGES.default;
}
