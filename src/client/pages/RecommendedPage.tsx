import { useState } from 'react';
import { PRODUCT_CATALOG, amazonUrl } from '../../data/product-catalog';

const CATEGORY_META: Record<string, { label: string; icon: string; description: string; color: string }> = {
  books: {
    label: 'Books',
    icon: '📚',
    description: 'The essential reading list for understanding sugar addiction and metabolic health.',
    color: '#8B1A1A',
  },
  supplements: {
    label: 'Supplements & Herbs',
    icon: '🌿',
    description: 'Evidence-based supplements, adaptogens, TCM herbs, and Ayurvedic botanicals that support blood sugar and metabolic health.',
    color: '#2D6A4F',
  },
  testing: {
    label: 'Testing & Monitoring',
    icon: '🔬',
    description: 'Tools to actually see what\'s happening in your body after you eat.',
    color: '#1D3557',
  },
  fitness: {
    label: 'Fitness & Movement',
    icon: '🏃',
    description: 'Movement tools that dramatically improve insulin sensitivity.',
    color: '#E76F51',
  },
  kitchen: {
    label: 'Kitchen & Pantry',
    icon: '🍽️',
    description: 'Pantry staples and kitchen tools that make glucose-friendly eating effortless.',
    color: '#F4A261',
  },
};

const SUBCATEGORY_META: Record<string, { label: string; description: string }> = {
  'blood-sugar': { label: 'Blood Sugar Support', description: 'Direct glucose and insulin support' },
  'adaptogens': { label: 'Adaptogens & Mushrooms', description: 'Stress resilience and cortisol balance' },
  'tcm': { label: 'Traditional Chinese Medicine', description: 'Classical TCM herbs and formulas' },
  'ayurveda': { label: 'Ayurvedic Herbs', description: 'Ancient Indian botanical medicine' },
  'gut-health': { label: 'Gut Health & Probiotics', description: 'Microbiome and intestinal support' },
  'vitamins': { label: 'Vitamins & Minerals', description: 'Essential micronutrients for metabolism' },
  'neurotransmitters': { label: 'Mood & Cravings', description: 'Neurotransmitter support for craving control' },
  'minerals': { label: 'Minerals', description: 'Essential minerals for glucose metabolism' },
  'glucose-science': { label: 'Glucose Science', description: 'Books on blood sugar and glucose' },
  'sugar-science': { label: 'Sugar Science', description: 'The science of sugar and addiction' },
  'metabolic-health': { label: 'Metabolic Health', description: 'Metabolism and energy books' },
  'insulin-resistance': { label: 'Insulin Resistance', description: 'Understanding insulin' },
  'nutrition-science': { label: 'Nutrition Science', description: 'Evidence-based nutrition' },
  'gut-health-books': { label: 'Gut Health Books', description: 'Microbiome and digestion' },
  'longevity': { label: 'Longevity', description: 'Fasting and longevity science' },
  'emotional-eating': { label: 'Emotional Eating', description: 'Psychology of food' },
  'cgm': { label: 'Continuous Glucose Monitors', description: 'Real-time glucose tracking' },
  'meters': { label: 'Glucose Meters', description: 'Blood glucose testing' },
  'body-composition': { label: 'Body Composition', description: 'Body fat and muscle tracking' },
  'cardiovascular': { label: 'Cardiovascular', description: 'Heart and blood pressure' },
  'wearables': { label: 'Wearables', description: 'Smart health tracking devices' },
  'strength': { label: 'Strength Training', description: 'Resistance and weight training' },
  'movement': { label: 'Daily Movement', description: 'Low-intensity movement tools' },
  'cardio': { label: 'Cardio', description: 'Cardiovascular exercise' },
  'flexibility': { label: 'Flexibility & Mind-Body', description: 'Yoga and stretching' },
  'pantry': { label: 'Pantry Staples', description: 'Blood-sugar-friendly pantry items' },
  'appliances': { label: 'Kitchen Appliances', description: 'Cooking tools for healthy eating' },
  'storage': { label: 'Meal Prep & Storage', description: 'Containers and organization' },
  'tools': { label: 'Kitchen Tools', description: 'Scales, spiralizers, and more' },
};

export function RecommendedPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const categories = ['all', ...Object.keys(CATEGORY_META)];

  const subcategories = activeCategory !== 'all'
    ? ['all', ...Array.from(new Set(
        PRODUCT_CATALOG
          .filter(p => p.category === activeCategory && p.subcategory)
          .map(p => p.subcategory!)
      ))]
    : [];

  const filtered = PRODUCT_CATALOG.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (activeSubcategory !== 'all' && p.subcategory !== activeSubcategory) return false;
    if (showFeaturedOnly && !p.featured) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q)) ||
        p.subcategory?.includes(q) ||
        p.category.includes(q)
      );
    }
    return true;
  });

  const grouped = activeCategory === 'all' && !searchQuery && !showFeaturedOnly
    ? Object.keys(CATEGORY_META).reduce((acc, cat) => {
        acc[cat] = PRODUCT_CATALOG.filter(p => p.category === cat);
        return acc;
      }, {} as Record<string, typeof PRODUCT_CATALOG>)
    : null;

  const supplementSubcats = ['blood-sugar', 'adaptogens', 'tcm', 'ayurveda', 'gut-health', 'vitamins', 'neurotransmitters', 'minerals'];

  return (
    <div className="recommended-page">
      {/* ─── Hero Header ─── */}
      <header className="recommended-header" style={{
        background: 'linear-gradient(135deg, #1a0a0a 0%, #3d1515 50%, #1a0a0a 100%)',
        padding: '5rem 0 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.05,
          backgroundImage: 'radial-gradient(circle at 20% 50%, #8B1A1A 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C4A35A 0%, transparent 40%)',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <div style={{
              display: 'inline-block', background: 'rgba(139,26,26,0.3)', border: '1px solid rgba(139,26,26,0.5)',
              color: '#C4A35A', padding: '0.35rem 1rem', borderRadius: '20px',
              fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem',
            }}>
              Curated by The Oracle Lover
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#FAF8F4', marginBottom: '1.25rem', lineHeight: 1.2 }}>
              The Sugar Hijack<br />Resource Library
            </h1>
            <p style={{ color: 'rgba(250,248,244,0.75)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              110+ books, supplements, herbs, TCM formulas, Ayurvedic botanicals, testing tools, and kitchen essentials — everything I'd actually recommend for reclaiming your metabolic health.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {Object.entries(CATEGORY_META).map(([key, meta]) => {
                const count = PRODUCT_CATALOG.filter(p => p.category === key).length;
                return (
                  <div key={key} style={{
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '12px', padding: '0.6rem 1rem', textAlign: 'center', cursor: 'pointer',
                  }} onClick={() => { setActiveCategory(key); setActiveSubcategory('all'); }}>
                    <div style={{ fontSize: '1.4rem' }}>{meta.icon}</div>
                    <div style={{ color: '#FAF8F4', fontSize: '0.75rem', fontWeight: 600 }}>{meta.label}</div>
                    <div style={{ color: 'rgba(250,248,244,0.5)', fontSize: '0.7rem' }}>{count} items</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* ─── Filters Bar ─── */}
      <div style={{ background: '#FAF8F4', borderBottom: '1px solid var(--color-border)', position: 'sticky', top: '60px', zIndex: 10 }}>
        <div className="container">
          <div style={{ padding: '1rem 0', display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: '1', minWidth: '200px', maxWidth: '300px' }}>
              <input
                type="text"
                placeholder="Search herbs, supplements..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%', padding: '0.5rem 0.75rem 0.5rem 2rem',
                  border: '1px solid var(--color-border)', borderRadius: '8px',
                  fontSize: '0.875rem', background: 'white', outline: 'none',
                }}
              />
              <span style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.9rem', opacity: 0.5 }}>🔍</span>
            </div>

            {/* Category tabs */}
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setActiveSubcategory('all'); }}
                  style={{
                    padding: '0.4rem 0.85rem', borderRadius: '20px', border: 'none', cursor: 'pointer',
                    fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s',
                    background: activeCategory === cat ? 'var(--color-primary)' : 'white',
                    color: activeCategory === cat ? 'white' : 'var(--color-text-muted)',
                    border: `1px solid ${activeCategory === cat ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  }}
                >
                  {cat === 'all' ? 'All' : (CATEGORY_META[cat]?.icon + ' ' + CATEGORY_META[cat]?.label)}
                </button>
              ))}
            </div>

            {/* Featured toggle */}
            <button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              style={{
                padding: '0.4rem 0.85rem', borderRadius: '20px', border: 'none', cursor: 'pointer',
                fontSize: '0.8rem', fontWeight: 600, transition: 'all 0.2s',
                background: showFeaturedOnly ? '#C4A35A' : 'white',
                color: showFeaturedOnly ? 'white' : 'var(--color-text-muted)',
                border: `1px solid ${showFeaturedOnly ? '#C4A35A' : 'var(--color-border)'}`,
              }}
            >
              ⭐ Featured
            </button>
          </div>

          {/* Subcategory tabs (only when a category is selected) */}
          {subcategories.length > 1 && (
            <div style={{ paddingBottom: '0.75rem', display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {subcategories.map(sub => (
                <button
                  key={sub}
                  onClick={() => setActiveSubcategory(sub)}
                  style={{
                    padding: '0.3rem 0.7rem', borderRadius: '20px', border: 'none', cursor: 'pointer',
                    fontSize: '0.75rem', fontWeight: 500, transition: 'all 0.2s',
                    background: activeSubcategory === sub ? 'var(--color-accent-warm)' : 'rgba(0,0,0,0.04)',
                    color: activeSubcategory === sub ? 'white' : 'var(--color-text-muted)',
                  }}
                >
                  {sub === 'all' ? 'All subcategories' : (SUBCATEGORY_META[sub]?.label || sub)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── Results count ─── */}
      {(searchQuery || activeCategory !== 'all' || showFeaturedOnly) && (
        <div className="container" style={{ paddingTop: '1.5rem' }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'item' : 'items'}
            {activeCategory !== 'all' && ` in ${CATEGORY_META[activeCategory]?.label}`}
            {activeSubcategory !== 'all' && ` › ${SUBCATEGORY_META[activeSubcategory]?.label}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
        </div>
      )}

      {/* ─── Main Content ─── */}
      <div className="container" style={{ padding: '2rem 1rem 5rem' }}>

        {/* ── Grouped "All" view ── */}
        {grouped && !searchQuery && !showFeaturedOnly ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {Object.entries(grouped).map(([cat, products]) => {
              if (products.length === 0) return null;
              const meta = CATEGORY_META[cat];

              // For supplements, group by subcategory
              if (cat === 'supplements') {
                return (
                  <section key={cat}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <div style={{
                        width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: `${meta.color}15`, fontSize: '1.5rem',
                      }}>{meta.icon}</div>
                      <div>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-text)', margin: 0 }}>{meta.label}</h2>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>{meta.description}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                      {supplementSubcats.map(subcat => {
                        const subcatProducts = products.filter(p => p.subcategory === subcat);
                        if (subcatProducts.length === 0) return null;
                        const subcatMeta = SUBCATEGORY_META[subcat];
                        return (
                          <div key={subcat}>
                            <div style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--color-border)' }}>
                              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-primary)', margin: '0 0 0.25rem' }}>
                                {subcatMeta?.label || subcat}
                              </h3>
                              {subcatMeta?.description && (
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: 0 }}>{subcatMeta.description}</p>
                              )}
                            </div>
                            <ProductGrid products={subcatProducts} />
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              }

              return (
                <section key={cat}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: `${meta.color}15`, fontSize: '1.5rem',
                    }}>{meta.icon}</div>
                    <div>
                      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: 'var(--color-text)', margin: 0 }}>{meta.label}</h2>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>{meta.description}</p>
                    </div>
                  </div>
                  <ProductGrid products={products} />
                </section>
              );
            })}
          </div>
        ) : (
          /* ── Filtered flat view ── */
          <div>
            {activeCategory === 'supplements' && activeSubcategory === 'all' && !searchQuery && !showFeaturedOnly ? (
              /* Supplements grouped by subcategory */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {supplementSubcats.map(subcat => {
                  const subcatProducts = filtered.filter(p => p.subcategory === subcat);
                  if (subcatProducts.length === 0) return null;
                  const subcatMeta = SUBCATEGORY_META[subcat];
                  return (
                    <div key={subcat}>
                      <div style={{ marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--color-border)' }}>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--color-primary)', margin: '0 0 0.25rem' }}>
                          {subcatMeta?.label || subcat}
                        </h3>
                        {subcatMeta?.description && (
                          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', margin: 0 }}>{subcatMeta.description}</p>
                        )}
                      </div>
                      <ProductGrid products={subcatProducts} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <ProductGrid products={filtered} />
            )}
          </div>
        )}

        {filtered.length === 0 && (searchQuery || showFeaturedOnly) && (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--color-text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌿</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>No results found</h3>
            <p>Try a different search term or clear the filters.</p>
            <button onClick={() => { setSearchQuery(''); setShowFeaturedOnly(false); setActiveCategory('all'); }}
              style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* ─── Disclaimer ─── */}
      <div style={{ background: '#F5F0E8', borderTop: '1px solid var(--color-border)', padding: '2rem 0' }}>
        <div className="container">
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', textAlign: 'center', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            <strong>Affiliate Disclosure:</strong> Some links on this page are Amazon affiliate links. If you purchase through them, I may earn a small commission at no extra cost to you. I only recommend products I genuinely believe in. This page is for informational purposes only and does not constitute medical advice. Always consult a qualified healthcare provider before starting any supplement.
          </p>
        </div>
      </div>
    </div>
  );
}

function ProductGrid({ products }: { products: typeof PRODUCT_CATALOG }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1.25rem',
    }}>
      {products.map(product => (
        <ProductCard key={product.asin} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: typeof PRODUCT_CATALOG[0] }) {
  const subcatMeta = product.subcategory ? SUBCATEGORY_META[product.subcategory] : null;
  const catMeta = CATEGORY_META[product.category];

  return (
    <a
      href={amazonUrl(product.asin)}
      target="_blank"
      rel="noopener noreferrer nofollow"
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div style={{
        background: 'white',
        border: product.featured ? '2px solid var(--color-accent-warm)' : '1px solid var(--color-border)',
        borderRadius: '16px',
        padding: '1.25rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
          (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        }}
      >
        {product.featured && (
          <div style={{
            position: 'absolute', top: '0.75rem', right: '0.75rem',
            background: '#C4A35A', color: 'white', fontSize: '0.65rem',
            fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '20px',
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}>
            ⭐ Featured
          </div>
        )}

        {/* Category badge */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
          {subcatMeta && (
            <span style={{
              background: `${catMeta?.color || '#8B1A1A'}15`,
              color: catMeta?.color || '#8B1A1A',
              fontSize: '0.7rem', fontWeight: 600, padding: '0.2rem 0.6rem',
              borderRadius: '20px', letterSpacing: '0.04em',
            }}>
              {subcatMeta.label}
            </span>
          )}
        </div>

        {/* Product name */}
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1rem',
          color: 'var(--color-text)',
          margin: '0 0 0.5rem',
          lineHeight: 1.3,
          flex: 1,
        }}>
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p style={{
            color: 'var(--color-text-muted)',
            fontSize: '0.82rem',
            lineHeight: 1.55,
            margin: '0 0 1rem',
          }}>
            {product.description}
          </p>
        )}

        {/* Tags */}
        <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {product.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{
              background: 'rgba(0,0,0,0.04)',
              color: 'var(--color-text-muted)',
              fontSize: '0.65rem',
              padding: '0.15rem 0.45rem',
              borderRadius: '4px',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '0.75rem', borderTop: '1px solid var(--color-border)',
        }}>
          <span style={{
            color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 700,
            display: 'flex', alignItems: 'center', gap: '0.3rem',
          }}>
            View on Amazon →
          </span>
          {product.rating && (
            <span style={{ color: '#C4A35A', fontSize: '0.8rem', fontWeight: 600 }}>
              ★ {product.rating}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}
