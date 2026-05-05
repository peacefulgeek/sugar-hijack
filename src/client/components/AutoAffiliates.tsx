interface Product {
  asin: string;
  name: string;
  category: string;
  tags: string[];
  description?: string;
}

interface AutoAffiliatesProps {
  products: Product[];
  sectionTitle?: string;
}

const AMAZON_TAG = 'spankyspinola-20';

function buildAmazonUrl(asin: string) {
  return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;
}

const SOFT_INTROS = [
  'One option that many people like is',
  'A tool that often helps with this is',
  'Something worth considering might be',
  'For those looking for a simple solution, this works well:',
  'You could also try',
  'A popular choice for situations like this is',
];

export function AutoAffiliates({ products, sectionTitle = 'Blood Sugar Library' }: AutoAffiliatesProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="auto-affiliates" aria-label={sectionTitle}>
      <div className="auto-affiliates__header">
        <h3 className="auto-affiliates__title">{sectionTitle}</h3>
        <p className="auto-affiliates__subtitle">
          Tools and resources that support metabolic health.
        </p>
      </div>
      <ul className="auto-affiliates__list">
        {products.map((p, i) => (
          <li key={p.asin} className="auto-affiliates__item">
            <div className="auto-affiliates__item-intro">
              {SOFT_INTROS[i % SOFT_INTROS.length]}
            </div>
            <a
              href={buildAmazonUrl(p.asin)}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="auto-affiliates__link"
            >
              {p.name}
            </a>
            {p.description && (
              <span className="auto-affiliates__desc"> — {p.description}</span>
            )}
            <span className="auto-affiliates__disclosure"> (paid link)</span>
          </li>
        ))}
      </ul>
      <p className="auto-affiliates__legal">
        As an Amazon Associate, I earn from qualifying purchases.
      </p>

      <style>{`
        .auto-affiliates {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          padding: var(--space-8);
          margin: var(--space-10) 0;
          border: 1px solid var(--color-border);
        }
        .auto-affiliates__header {
          margin-bottom: var(--space-6);
        }
        .auto-affiliates__title {
          font-family: var(--font-masthead);
          font-size: var(--text-xl);
          color: var(--color-text);
          margin-bottom: var(--space-2);
        }
        .auto-affiliates__subtitle {
          font-size: var(--text-sm);
          color: var(--color-muted);
          margin: 0;
        }
        .auto-affiliates__list {
          list-style: none;
          padding: 0;
          margin: 0 0 var(--space-4);
        }
        .auto-affiliates__item {
          padding: var(--space-4) 0;
          border-bottom: 1px solid var(--color-border);
          font-size: var(--text-sm);
          line-height: 1.6;
          margin: 0;
        }
        .auto-affiliates__item:last-child {
          border-bottom: none;
        }
        .auto-affiliates__item-intro {
          display: inline;
          color: var(--color-muted);
        }
        .auto-affiliates__link {
          font-weight: var(--font-weight-medium);
          color: var(--color-accent);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .auto-affiliates__desc {
          color: var(--color-muted);
        }
        .auto-affiliates__disclosure {
          font-size: var(--text-xs);
          color: var(--color-muted);
          font-style: italic;
        }
        .auto-affiliates__legal {
          font-size: var(--text-xs);
          color: var(--color-muted);
          margin: 0;
          font-style: italic;
        }
      `}</style>
    </section>
  );
}
