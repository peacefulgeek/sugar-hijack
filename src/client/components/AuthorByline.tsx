interface AuthorBylineProps {
  readingTime?: number;
  publishedAt?: string;
  compact?: boolean;
}

export function AuthorByline({ readingTime, publishedAt, compact = false }: AuthorBylineProps) {
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  if (compact) {
    return (
      <div className="author-byline author-byline--compact">
        <span className="author-byline__name">The Oracle Lover</span>
        {formattedDate && <span className="author-byline__sep">·</span>}
        {formattedDate && <time dateTime={publishedAt}>{formattedDate}</time>}
        {readingTime && <span className="author-byline__sep">·</span>}
        {readingTime && <span>{readingTime} min read</span>}
        <style>{compactStyles}</style>
      </div>
    );
  }

  return (
    <div className="author-byline">
      <div className="author-byline__avatar" aria-hidden="true">OL</div>
      <div className="author-byline__info">
        <a
          href="https://theoraclelover.com"
          target="_blank"
          rel="noopener noreferrer"
          className="author-byline__name"
        >
          The Oracle Lover
        </a>
        <div className="author-byline__meta">
          <span className="author-byline__title">Intuitive Educator &amp; Oracle Guide</span>
          {formattedDate && <span className="author-byline__sep">·</span>}
          {formattedDate && <time dateTime={publishedAt}>{formattedDate}</time>}
          {readingTime && <span className="author-byline__sep">·</span>}
          {readingTime && <span>{readingTime} min read</span>}
        </div>
      </div>
      <style>{fullStyles}</style>
    </div>
  );
}

const compactStyles = `
  .author-byline--compact {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    color: var(--color-muted);
  }
  .author-byline--compact .author-byline__name {
    color: var(--color-text);
    font-weight: var(--font-weight-medium);
  }
  .author-byline__sep {
    opacity: 0.4;
  }
`;

const fullStyles = `
  .author-byline {
    display: flex;
    align-items: center;
    gap: var(--space-4);
  }
  .author-byline__avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--color-accent);
    color: var(--color-white);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-masthead);
    font-weight: var(--font-weight-bold);
    font-size: var(--text-sm);
    flex-shrink: 0;
  }
  .author-byline__info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .author-byline__name {
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text);
    text-decoration: none;
  }
  .author-byline__name:hover {
    color: var(--color-accent);
    opacity: 1;
  }
  .author-byline__meta {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-ui);
    font-size: var(--text-xs);
    color: var(--color-muted);
  }
  .author-byline__title {
    font-style: italic;
  }
  .author-byline__sep {
    opacity: 0.4;
  }
`;
