/**
 * asin-health-check.mjs
 * Weekly ASIN verification — checks that Amazon product links are still valid
 * Runs Sundays 05:00 UTC
 */

import { PRODUCT_CATALOG } from '../data/product-catalog.js';

const AMAZON_TAG = process.env.AMAZON_TAG || 'spankyspinola-20';

export async function runAsinHealthCheck() {
  console.log('[asin-health-check] Starting ASIN health check');

  const results = { ok: 0, failed: 0, errors: [] };

  for (const product of PRODUCT_CATALOG) {
    const url = `https://www.amazon.com/dp/${product.asin}?tag=${AMAZON_TAG}`;
    try {
      const res = await fetch(url, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; HealthCheck/1.0)',
        },
        redirect: 'follow',
        signal: AbortSignal.timeout(10_000),
      });

      if (res.ok || res.status === 301 || res.status === 302) {
        results.ok++;
      } else {
        results.failed++;
        results.errors.push({ asin: product.asin, name: product.name, status: res.status });
        console.warn(`[asin-health-check] WARN ${product.asin} (${product.name}): HTTP ${res.status}`);
      }
    } catch (err) {
      results.failed++;
      results.errors.push({ asin: product.asin, name: product.name, error: err.message });
      console.warn(`[asin-health-check] WARN ${product.asin}: ${err.message}`);
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`[asin-health-check] Done: ${results.ok} ok, ${results.failed} failed`);
  if (results.errors.length > 0) {
    console.log('[asin-health-check] Failed ASINs:', JSON.stringify(results.errors, null, 2));
  }

  return results;
}
