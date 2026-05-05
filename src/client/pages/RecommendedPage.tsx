import { useState } from 'react';
import { PRODUCT_CATALOG } from '../../data/product-catalog';

const AMAZON_TAG = 'spankyspinola-20';

const CATEGORY_LABELS: Record<string, string> = {
  books: 'Books',
  testing: 'Testing & Monitoring',
  kitchen: 'Kitchen Tools',
  supplements: 'Supplements',
  fitness: 'Fitness',
  pantry: 'Pantry Staples',
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  books: 'The essential reading list for understanding sugar addiction and metabolic health.',
  testing: 'Tools to actually see what\'s happening in your body after you eat.',
  kitchen: 'Simple tools that make glucose-friendly eating easier.',
  supplements: 'Evidence-based supplements that support blood sugar management.',
  fitness: 'Movement tools that improve insulin sensitivity.',
  pantry: 'Pantry staples that reduce glucose spikes without sacrificing taste.',
};

export function RecommendedPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', ...Object.keys(CATEGORY_LABELS)];

  const filtered = activeCategory === 'all'
    ? PRODUCT_CATALOG
    : PRODUCT_CATALOG.filter(p => p.category === activeCategory);

  const grouped = activeCategory === 'all'
    ? Object.keys(CATEGORY_LABELS).reduce((acc, cat) => {
        acc[cat] = PRODUCT_CATALOG.filter(p => p.category === cat);
        return acc;
      }, {} as Record<string, typeof PRODUCT_CATALOG>)
    : { [activeCategory]: filtered };

  return (
    <div className="recommended-page">
      <header className="recommended-header">
        <div className="container">
          <div className="recommended-header__content">
            <div className="recommended-header__eyebrow">Blood Sugar Library</div>
            <h1 className="recommended-header__title">Recommended Resources</h1>
            <p className="recommended-header__subtitle">
              Tools, books, and resources that support metabolic health and sugar detachment.
              Everything here is something I'd actually recommend.
            </p>
            <p className="recommended-header__disclosure">
              <em>
                As an Amazon Associate, I earn from qualifying purchases.
                Links marked with (paid link) may earn a small commission.
              </em>
            </p>
          </div>
        </div>
      </header>

      {/* ─── Category filter ─── */}
      <div className="recommended-filters container">
        <div className="recommended-filters__inner">
          {categories.map(cat => (
            <button
              key={cat}
              className={`recommended-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === 'all' ? 'All Resources' : CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Products ─── */}
      <div className="recommended-content container">
        {Object.entries(grouped).map(([cat, products]) => (
          <section key={cat} className="recommended-section">
            <div className="recommended-section__header">
              <h2>{CATEGORY_LABELS[cat]}</h2>
              <p>{CATEGORY_DESCRIPTIONS[cat]}</p>
            </div>
            <div className="recommended-grid">
              {products.map(product => (
                <a
                  key={product.asin}
                  href={`https://www.amazon.com/dp/${product.asin}?tag=${AMAZON_TAG}`}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="recommended-card"
                  aria-label={`${product.name} on Amazon (paid link)`}
                >
                  <div className="recommended-card__category-badge">
                    {CATEGORY_LABELS[product.category]}
                  </div>
                  <h3 className="recommended-card__name">{product.name}</h3>
                  {product.description && (
                    <p className="recommended-card__desc">{product.description}</p>
                  )}
                  <div className="recommended-card__footer">
                    <span className="recommended-card__cta">View on Amazon →</span>
                    <span className="recommended-card__disclosure">(paid link)</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="recommended-legal container">
        <p>
          <strong>Affiliate Disclosure:</strong> thesugardetach.com is a participant in the Amazon
          Services LLC Associates Program. As an Amazon Associate, I earn from qualifying purchases.
          This does not affect the price you pay.
        </p>
        <p>
          <strong>Health Disclaimer:</strong> Supplements and health tools should be used in
          consultation with your healthcare provider, especially if you have diabetes, prediabetes,
          or are taking medications.
        </p>
      </div>

      <style>{`
        .recommended-page { padding-bottom: var(--space-24); }
        .recommended-header {
          background: var(--color-text);
          padding: calc(var(--nav-height) + var(--space-16)) 0 var(--space-16);
        }
        .recommended-header__content { max-width: 680px; }
        .recommended-header__eyebrow {
          font-family: var(--font-ui);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--color-accent);
          margin-bottom: var(--space-4);
        }
        .recommended-header__title {
          font-family: var(--font-masthead);
          font-size: var(--text-4xl);
          color: var(--color-white);
          margin-bottom: var(--space-4);
        }
        .recommended-header__subtitle {
          font-size: var(--text-lg);
          color: rgba(253,250,244,0.65);
          line-height: 1.65;
          margin-bottom: var(--space-4);
        }
        .recommended-header__disclosure {
          font-size: var(--text-sm);
          color: rgba(253,250,244,0.4);
          margin: 0;
        }
        .recommended-filters {
          padding: var(--space-6) 0;
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: var(--nav-height);
          background: rgba(253,250,244,0.97);
          backdrop-filter: blur(12px);
          z-index: 10;
        }
        .recommended-filters__inner {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        .recommended-filter-btn {
          font-family: var(--font-ui);
          font-size: var(--text-xs);
          font-weight: var(--font-weight-medium);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          border: 1.5px solid var(--color-border);
          background: transparent;
          color: var(--color-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .recommended-filter-btn:hover,
        .recommended-filter-btn.active {
          background: var(--color-accent);
          border-color: var(--color-accent);
          color: var(--color-white);
        }
        .recommended-content { padding-top: var(--space-12); }
        .recommended-section { margin-bottom: var(--space-16); }
        .recommended-section__header {
          margin-bottom: var(--space-8);
          padding-bottom: var(--space-5);
          border-bottom: 2px solid var(--color-border);
        }
        .recommended-section__header h2 {
          font-size: var(--text-2xl);
          margin-bottom: var(--space-2);
        }
        .recommended-section__header p {
          font-size: var(--text-base);
          color: var(--color-muted);
          margin: 0;
        }
        .recommended-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-5);
        }
        .recommended-card {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          padding: var(--space-6);
          background: var(--color-white);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          text-decoration: none;
          transition: all var(--transition-base);
        }
        .recommended-card:hover {
          border-color: var(--color-accent);
          box-shadow: var(--shadow-md);
          transform: translateY(-3px);
          opacity: 1;
        }
        .recommended-card__category-badge {
          font-family: var(--font-ui);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-accent);
          font-weight: var(--font-weight-medium);
        }
        .recommended-card__name {
          font-family: var(--font-masthead);
          font-size: var(--text-base);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          line-height: 1.4;
          flex: 1;
        }
        .recommended-card__desc {
          font-size: var(--text-sm);
          color: var(--color-muted);
          line-height: 1.55;
          margin: 0;
        }
        .recommended-card__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: var(--space-3);
          border-top: 1px solid var(--color-border);
        }
        .recommended-card__cta {
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
          color: var(--color-accent);
        }
        .recommended-card__disclosure {
          font-size: var(--text-xs);
          color: var(--color-muted);
          font-style: italic;
        }
        .recommended-legal {
          margin-top: var(--space-12);
          padding-top: var(--space-8);
          border-top: 1px solid var(--color-border);
        }
        .recommended-legal p {
          font-size: var(--text-sm);
          color: var(--color-muted);
          line-height: 1.65;
          margin-bottom: var(--space-3);
        }

        @media (max-width: 1024px) {
          .recommended-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .recommended-grid { grid-template-columns: 1fr; }
          .recommended-header__title { font-size: var(--text-3xl); }
        }
      `}</style>
    </div>
  );
}
