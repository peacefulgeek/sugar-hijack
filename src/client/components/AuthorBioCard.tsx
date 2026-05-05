export function AuthorBioCard() {
  return (
    <aside className="author-bio-card" aria-label="About the author">
      <div className="author-bio-card__inner">
        <div className="author-bio-card__avatar" aria-hidden="true">OL</div>
        <div className="author-bio-card__content">
          <p className="author-bio-card__label">Written by</p>
          <a
            href="https://theoraclelover.com"
            target="_blank"
            rel="noopener noreferrer"
            className="author-bio-card__name"
          >
            The Oracle Lover
          </a>
          <p className="author-bio-card__title">Intuitive Educator &amp; Oracle Guide</p>
          <p className="author-bio-card__bio">
            The no-BS oracle reader who also has a science degree. Demystifying the body's
            signals, one glucose curve at a time. This isn't mystical. It's mechanical.
            And you deserve to understand it.
          </p>
          <a
            href="https://theoraclelover.com"
            target="_blank"
            rel="noopener noreferrer"
            className="author-bio-card__link"
          >
            Read more at theoraclelover.com →
          </a>
        </div>
      </div>

      <style>{`
        .author-bio-card {
          background: var(--color-bio-card);
          border-radius: var(--radius-lg);
          padding: var(--space-8);
          margin: var(--space-12) 0;
          border: 1px solid rgba(139, 58, 58, 0.1);
        }
        .author-bio-card__inner {
          display: flex;
          gap: var(--space-6);
          align-items: flex-start;
        }
        .author-bio-card__avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--color-accent);
          color: var(--color-white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-masthead);
          font-weight: var(--font-weight-bold);
          font-size: var(--text-lg);
          flex-shrink: 0;
        }
        .author-bio-card__content {
          flex: 1;
        }
        .author-bio-card__label {
          font-family: var(--font-ui);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-muted);
          margin-bottom: var(--space-1);
        }
        .author-bio-card__name {
          display: block;
          font-family: var(--font-masthead);
          font-size: var(--text-xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-text);
          text-decoration: none;
          margin-bottom: var(--space-1);
          transition: color var(--transition-fast);
        }
        .author-bio-card__name:hover {
          color: var(--color-accent);
          opacity: 1;
        }
        .author-bio-card__title {
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          color: var(--color-accent);
          font-style: italic;
          margin-bottom: var(--space-4);
        }
        .author-bio-card__bio {
          font-size: var(--text-sm);
          line-height: 1.7;
          color: var(--color-muted);
          margin-bottom: var(--space-4);
        }
        .author-bio-card__link {
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
          color: var(--color-accent);
          text-decoration: none;
          transition: gap var(--transition-fast);
        }
        .author-bio-card__link:hover {
          opacity: 0.8;
        }

        @media (max-width: 600px) {
          .author-bio-card__inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
      `}</style>
    </aside>
  );
}
