import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArticleBody } from '../components/ArticleBody';
import { AuthorByline } from '../components/AuthorByline';
import { TableOfContents } from '../components/TableOfContents';
import { ScrollDotNav } from '../components/ScrollDotNav';
import { AutoAffiliates } from '../components/AutoAffiliates';
import { ArticleCard } from '../components/ArticleCard';
import { PRODUCT_CATALOG } from '../../data/product-catalog';

interface ArticlePageProps {
  ssrData?: { article?: any; related?: any[] };
}

export function ArticlePage({ ssrData }: ArticlePageProps) {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any>(ssrData?.article || null);
  const [related, setRelated] = useState<any[]>(ssrData?.related || []);
  const [loading, setLoading] = useState(!ssrData?.article);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroOffset, setHeroOffset] = useState(0);

  useEffect(() => {
    if (!ssrData?.article && slug) {
      fetch(`/api/articles/${slug}`)
        .then(r => r.json())
        .then(d => {
          setArticle(d.article);
          setRelated(d.related || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [slug]);

  // Parallax effect on hero
  useEffect(() => {
    const handleScroll = () => {
      setHeroOffset(window.scrollY * 0.4);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="article-loading">
        <div className="article-loading__spinner" />
        <style>{`.article-loading { display:flex; align-items:center; justify-content:center; min-height:60vh; }
          .article-loading__spinner { width:40px; height:40px; border:3px solid var(--color-border); border-top-color:var(--color-accent); border-radius:50%; animation:spin 0.8s linear infinite; }
          @keyframes spin { to { transform:rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-not-found container">
        <h1>Article not found</h1>
        <p>This article doesn't exist or hasn't been published yet.</p>
        <Link to="/articles" className="btn btn--primary">Browse all articles</Link>
        <style>{`.article-not-found { padding: var(--space-24) 0; text-align:center; }
          .article-not-found h1 { margin-bottom:var(--space-4); }
          .article-not-found p { margin-bottom:var(--space-8); color:var(--color-muted); }`}</style>
      </div>
    );
  }

  // Build section list for dot nav
  const sections = extractSections(article.body || '');

  // Match products for affiliate section
  const products = matchArticleProducts(article, PRODUCT_CATALOG);

  return (
    <article className="article-page">
      {/* ─── Full-viewport hero ─── */}
      <header className="article-hero" ref={heroRef}>
        <div
          className="article-hero__bg"
          style={{
            backgroundImage: `url(${article.hero_url || 'https://images.unsplash.com/photo-1559181567-c3190ca9d715?w=1600&q=85'})`,
            transform: `translateY(${heroOffset}px)`,
          }}
          aria-hidden="true"
        />
        <div className="article-hero__overlay" aria-hidden="true" />
        <div className="article-hero__content">
          {article.category && (
            <Link
              to={`/articles?category=${article.category}`}
              className="article-hero__category"
            >
              {article.category}
            </Link>
          )}
          <h1 className="article-hero__title">{article.title}</h1>
          <div className="article-hero__byline">
            <AuthorByline
              readingTime={article.reading_time}
              publishedAt={article.published_at}
              compact
            />
          </div>
        </div>
      </header>

      {/* ─── Floating dot nav ─── */}
      <ScrollDotNav sections={sections} />

      {/* ─── Article content ─── */}
      <div className="article-content container">
        <div className="article-content__inner content-width">
          {/* Table of contents */}
          {article.body && <TableOfContents content={article.body} />}

          {/* Article body */}
          {article.body && <ArticleBody content={article.body} />}

          {/* Affiliate products */}
          {products.length > 0 && (
            <AutoAffiliates products={products} sectionTitle="Blood Sugar Library" />
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="article-tags">
              <span className="article-tags__label">Topics:</span>
              {article.tags.map((tag: string) => (
                <Link
                  key={tag}
                  to={`/articles?q=${encodeURIComponent(tag)}`}
                  className="article-tag"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Health disclaimer */}
          <div className="article-disclaimer">
            <strong>Health Disclaimer:</strong> This article is for educational purposes only.
            Metabolic conditions including diabetes and prediabetes require medical management.
            Consult your healthcare provider before making significant dietary changes.
          </div>
        </div>
      </div>

      {/* ─── Related articles ─── */}
      {related.length > 0 && (
        <section className="article-related container" aria-label="Related articles">
          <h2 className="article-related__title">Keep Reading</h2>
          <div className="article-related__grid">
            {related.map((a: any) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      <style>{`
        /* ─── Hero ─── */
        .article-hero {
          position: relative;
          height: 100vh;
          min-height: 600px;
          display: flex;
          align-items: flex-end;
          overflow: hidden;
        }
        .article-hero__bg {
          position: absolute;
          inset: -20% 0 0;
          background-size: cover;
          background-position: center;
          will-change: transform;
        }
        .article-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(28,21,16,0.1) 0%,
            rgba(28,21,16,0.3) 40%,
            rgba(28,21,16,0.85) 80%,
            rgba(28,21,16,0.95) 100%
          );
        }
        .article-hero__content {
          position: relative;
          z-index: 2;
          padding: 0 var(--space-6) var(--space-16);
          max-width: var(--content-max-width);
          margin: 0 auto;
          width: 100%;
        }
        .article-hero__category {
          display: inline-block;
          font-family: var(--font-ui);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.3);
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          margin-bottom: var(--space-5);
          transition: all var(--transition-fast);
        }
        .article-hero__category:hover {
          background: rgba(255,255,255,0.1);
          color: var(--color-white);
          opacity: 1;
        }
        .article-hero__title {
          font-family: var(--font-masthead);
          font-size: clamp(var(--text-2xl), 4.5vw, var(--text-4xl));
          font-weight: var(--font-weight-bold);
          color: var(--color-white);
          line-height: 1.15;
          margin-bottom: var(--space-6);
          letter-spacing: -0.01em;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        .article-hero__byline {
          color: rgba(255,255,255,0.75);
        }
        .article-hero__byline .author-byline--compact {
          color: rgba(255,255,255,0.75);
        }
        .article-hero__byline .author-byline__name {
          color: var(--color-white);
        }

        /* ─── Content ─── */
        .article-content {
          padding: var(--space-16) 0 var(--space-12);
        }
        .article-content__inner {
          padding: 0 var(--space-6);
        }

        /* ─── Tags ─── */
        .article-tags {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: var(--space-2);
          margin: var(--space-8) 0;
        }
        .article-tags__label {
          font-family: var(--font-ui);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-muted);
        }
        .article-tag {
          font-family: var(--font-ui);
          font-size: var(--text-xs);
          color: var(--color-muted);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
          text-decoration: none;
          transition: all var(--transition-fast);
        }
        .article-tag:hover {
          background: var(--color-accent);
          color: var(--color-white);
          border-color: var(--color-accent);
          opacity: 1;
        }

        /* ─── Disclaimer ─── */
        .article-disclaimer {
          font-size: var(--text-xs);
          color: var(--color-muted);
          background: var(--color-surface);
          border-radius: var(--radius-md);
          padding: var(--space-4) var(--space-5);
          margin: var(--space-8) 0;
          border: 1px solid var(--color-border);
          line-height: 1.6;
        }

        /* ─── Related ─── */
        .article-related {
          padding: var(--space-16) 0 var(--space-20);
          border-top: 1px solid var(--color-border);
        }
        .article-related__title {
          font-size: var(--text-2xl);
          margin-bottom: var(--space-8);
        }
        .article-related__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
        }

        /* ─── Btn (needed here) ─── */
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-4) var(--space-8);
          border-radius: var(--radius-full);
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
          text-decoration: none;
          transition: all var(--transition-base);
        }
        .btn--primary {
          background: var(--color-accent);
          color: var(--color-white);
        }
        .btn--primary:hover {
          background: #7a2e2e;
          opacity: 1;
        }

        @media (max-width: 768px) {
          .article-related__grid { grid-template-columns: 1fr; }
          .article-hero__content { padding-bottom: var(--space-10); }
        }
      `}</style>
    </article>
  );
}

function extractSections(body: string) {
  const headingRegex = /^#{2}\s+(.+)$/gm;
  const sections: { id: string; label: string }[] = [
    { id: 'article-top', label: 'Top' },
  ];
  let match;
  while ((match = headingRegex.exec(body)) !== null) {
    const text = match[1].replace(/\*\*/g, '').trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    sections.push({ id, label: text });
  }
  return sections;
}

function matchArticleProducts(article: any, catalog: any[]) {
  if (!catalog || catalog.length === 0) return [];
  const tags = article.tags || [];
  const category = article.category || '';
  const title = article.title || '';

  const scored = catalog.map(p => {
    let score = 0;
    const pTags = p.tags || [];
    if (p.category === category) score += 10;
    for (const t of tags) if (pTags.includes(t)) score += 3;
    const words = title.toLowerCase().split(/\W+/);
    const name = (p.name || '').toLowerCase();
    for (const w of words) if (w.length > 3 && name.includes(w)) score += 2;
    return { p, score };
  }).sort((a, b) => b.score - a.score);

  return scored.slice(0, 4).map(s => s.p);
}
