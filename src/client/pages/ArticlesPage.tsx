import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArticleCard } from '../components/ArticleCard';

interface ArticlesPageProps {
  ssrData?: { articles?: any[] };
}

const CATEGORIES = [
  { value: '', label: 'All Topics' },
  { value: 'neuroscience', label: 'Neuroscience' },
  { value: 'glucose-science', label: 'Glucose Science' },
  { value: 'protocols', label: 'Protocols' },
  { value: 'metabolic-health', label: 'Metabolic Health' },
  { value: 'psychology', label: 'Psychology' },
  { value: 'lifestyle', label: 'Lifestyle' },
];

export function ArticlesPage({ ssrData }: ArticlesPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allArticles, setAllArticles] = useState<any[]>(ssrData?.articles || []);
  const [loading, setLoading] = useState(!ssrData?.articles?.length);
  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');

  useEffect(() => {
    if (!ssrData?.articles?.length) {
      fetch('/api/articles')
        .then(r => r.json())
        .then(d => {
          setAllArticles(d.articles || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);

  const filtered = allArticles.filter(a => {
    const matchCat = !category || a.category === category;
    const matchSearch = !search ||
      a.title?.toLowerCase().includes(search.toLowerCase()) ||
      a.meta_description?.toLowerCase().includes(search.toLowerCase()) ||
      (a.tags || []).some((t: string) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="articles-page">
      {/* ─── Page header ─── */}
      <header className="articles-header">
        <div className="container">
          <div className="articles-header__content">
            <h1 className="articles-header__title">All Articles</h1>
            <p className="articles-header__subtitle">
              The no-morality, all-biology guide to sugar addiction and metabolic health.
              {allArticles.length > 0 && ` ${allArticles.length} articles and counting.`}
            </p>
          </div>
        </div>
      </header>

      {/* ─── Filters ─── */}
      <div className="articles-filters container">
        <div className="articles-filters__inner">
          <div className="articles-search">
            <input
              type="search"
              placeholder="Search articles..."
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                const p: any = {};
                if (e.target.value) p.q = e.target.value;
                if (category) p.category = category;
                setSearchParams(p);
              }}
              className="articles-search__input"
              aria-label="Search articles"
            />
          </div>
          <div className="articles-categories">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                className={`articles-category-btn ${category === cat.value ? 'active' : ''}`}
                onClick={() => {
                  setCategory(cat.value);
                  const p: any = {};
                  if (search) p.q = search;
                  if (cat.value) p.category = cat.value;
                  setSearchParams(p);
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Results ─── */}
      <div className="articles-results container">
        {loading ? (
          <div className="articles-loading">Loading articles...</div>
        ) : filtered.length === 0 ? (
          <div className="articles-empty">
            <p>No articles found{search ? ` for "${search}"` : ''}.</p>
          </div>
        ) : (
          <>
            <p className="articles-count">
              {filtered.length} article{filtered.length !== 1 ? 's' : ''}
              {category ? ` in ${CATEGORIES.find(c => c.value === category)?.label}` : ''}
              {search ? ` matching "${search}"` : ''}
            </p>
            <div className="articles-grid">
              {filtered.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        .articles-page {
          min-height: 80vh;
          padding-bottom: var(--space-24);
        }
        .articles-header {
          background: var(--color-text);
          padding: calc(var(--nav-height) + var(--space-16)) 0 var(--space-16);
        }
        .articles-header__content {
          max-width: 640px;
        }
        .articles-header__title {
          font-family: var(--font-masthead);
          font-size: var(--text-4xl);
          color: var(--color-white);
          margin-bottom: var(--space-4);
        }
        .articles-header__subtitle {
          font-size: var(--text-lg);
          color: rgba(253,250,244,0.65);
          margin: 0;
        }
        .articles-filters {
          padding: var(--space-8) 0;
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: var(--nav-height);
          background: rgba(253,250,244,0.97);
          backdrop-filter: blur(12px);
          z-index: 10;
        }
        .articles-filters__inner {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }
        .articles-search__input {
          width: 100%;
          max-width: 480px;
          padding: var(--space-3) var(--space-5);
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-full);
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          background: var(--color-white);
          color: var(--color-text);
          transition: border-color var(--transition-fast);
        }
        .articles-search__input:focus {
          outline: none;
          border-color: var(--color-accent);
        }
        .articles-categories {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-2);
        }
        .articles-category-btn {
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
        .articles-category-btn:hover,
        .articles-category-btn.active {
          background: var(--color-accent);
          border-color: var(--color-accent);
          color: var(--color-white);
        }
        .articles-results {
          padding-top: var(--space-10);
        }
        .articles-count {
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          color: var(--color-muted);
          margin-bottom: var(--space-8);
        }
        .articles-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-8);
        }
        .articles-loading,
        .articles-empty {
          text-align: center;
          padding: var(--space-20) 0;
          color: var(--color-muted);
          font-size: var(--text-lg);
        }

        @media (max-width: 1024px) {
          .articles-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .articles-grid { grid-template-columns: 1fr; }
          .articles-header__title { font-size: var(--text-3xl); }
        }
      `}</style>
    </div>
  );
}
