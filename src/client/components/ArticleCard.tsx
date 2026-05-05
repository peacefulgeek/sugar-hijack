import { Link } from 'react-router-dom';

interface Article {
  slug: string;
  title: string;
  meta_description?: string;
  category?: string;
  tags?: string[];
  hero_url?: string;
  reading_time?: number;
  published_at?: string;
  word_count?: number;
}

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <article className={`article-card ${featured ? 'article-card--featured' : ''}`}>
      <Link to={`/articles/${article.slug}`} className="article-card__image-link" tabIndex={-1}>
        <div className="article-card__image-wrap">
          {article.hero_url ? (
            <img
              src={article.hero_url}
              alt={article.title}
              loading="lazy"
              className="article-card__image"
            />
          ) : (
            <div className="article-card__image-placeholder" />
          )}
          {article.category && (
            <span className="article-card__category">{article.category}</span>
          )}
        </div>
      </Link>
      <div className="article-card__body">
        <div className="article-card__meta">
          {formattedDate && <time dateTime={article.published_at}>{formattedDate}</time>}
          {article.reading_time && (
            <span className="article-card__read-time">{article.reading_time} min read</span>
          )}
        </div>
        <h2 className="article-card__title">
          <Link to={`/articles/${article.slug}`}>{article.title}</Link>
        </h2>
        {article.meta_description && (
          <p className="article-card__excerpt">{article.meta_description}</p>
        )}
        <Link to={`/articles/${article.slug}`} className="article-card__cta">
          Read article
        </Link>
      </div>

      <style>{`
        .article-card {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: transform var(--transition-base), box-shadow var(--transition-base);
          display: flex;
          flex-direction: column;
        }
        .article-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .article-card--featured {
          grid-column: 1 / -1;
          flex-direction: row;
        }
        .article-card--featured .article-card__image-wrap {
          width: 55%;
          flex-shrink: 0;
          height: 420px;
        }
        .article-card--featured .article-card__body {
          padding: var(--space-10);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .article-card--featured .article-card__title {
          font-size: var(--text-2xl);
        }
        .article-card__image-link {
          display: block;
          text-decoration: none;
        }
        .article-card__image-wrap {
          position: relative;
          overflow: hidden;
          height: 220px;
        }
        .article-card__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .article-card:hover .article-card__image {
          transform: scale(1.04);
        }
        .article-card__image-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--color-surface), var(--color-bio-card));
        }
        .article-card__category {
          position: absolute;
          top: var(--space-4);
          left: var(--space-4);
          background: var(--color-accent);
          color: var(--color-white);
          font-family: var(--font-ui);
          font-size: var(--text-xs);
          font-weight: var(--font-weight-medium);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: var(--space-1) var(--space-3);
          border-radius: var(--radius-full);
        }
        .article-card__body {
          padding: var(--space-6);
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .article-card__meta {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          font-family: var(--font-ui);
          font-size: var(--text-xs);
          color: var(--color-muted);
          margin-bottom: var(--space-3);
        }
        .article-card__read-time::before {
          content: '·';
          margin-right: var(--space-4);
        }
        .article-card__title {
          font-size: var(--text-xl);
          font-weight: var(--font-weight-semibold);
          margin-bottom: var(--space-3);
          line-height: 1.3;
        }
        .article-card__title a {
          color: var(--color-text);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        .article-card__title a:hover {
          color: var(--color-accent);
          opacity: 1;
        }
        .article-card__excerpt {
          font-size: var(--text-sm);
          color: var(--color-muted);
          line-height: 1.65;
          margin-bottom: var(--space-5);
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .article-card__cta {
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
          color: var(--color-accent);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          transition: gap var(--transition-fast);
        }
        .article-card__cta::after {
          content: '→';
        }
        .article-card__cta:hover {
          gap: var(--space-3);
          opacity: 1;
        }

        @media (max-width: 768px) {
          .article-card--featured {
            flex-direction: column;
          }
          .article-card--featured .article-card__image-wrap {
            width: 100%;
            height: 260px;
          }
          .article-card--featured .article-card__body {
            padding: var(--space-6);
          }
          .article-card--featured .article-card__title {
            font-size: var(--text-xl);
          }
        }
      `}</style>
    </article>
  );
}
