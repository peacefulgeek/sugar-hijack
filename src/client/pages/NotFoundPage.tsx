import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="not-found__inner container">
        <div className="not-found__number" aria-hidden="true">404</div>
        <h1>Page not found.</h1>
        <p>
          Stop overthinking this. The page you're looking for doesn't exist.
          Here's what does.
        </p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--primary">Go home</Link>
          <Link to="/articles" className="btn btn--secondary">Browse articles</Link>
        </div>
      </div>

      <style>{`
        .not-found {
          min-height: 80vh;
          display: flex;
          align-items: center;
          padding: var(--nav-height) 0;
        }
        .not-found__inner {
          text-align: center;
          padding: var(--space-16) var(--space-6);
        }
        .not-found__number {
          font-family: var(--font-masthead);
          font-size: 120px;
          font-weight: var(--font-weight-bold);
          color: var(--color-border);
          line-height: 1;
          margin-bottom: var(--space-4);
        }
        .not-found h1 {
          font-size: var(--text-3xl);
          margin-bottom: var(--space-4);
        }
        .not-found p {
          font-size: var(--text-lg);
          color: var(--color-muted);
          margin-bottom: var(--space-10);
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }
        .not-found__actions {
          display: flex;
          gap: var(--space-4);
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          padding: var(--space-4) var(--space-8);
          border-radius: var(--radius-full);
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
          text-decoration: none;
          transition: all var(--transition-base);
        }
        .btn--primary { background: var(--color-accent); color: var(--color-white); }
        .btn--primary:hover { background: #7a2e2e; opacity: 1; }
        .btn--secondary {
          background: transparent;
          color: var(--color-accent);
          border: 1.5px solid var(--color-accent);
        }
        .btn--secondary:hover { background: var(--color-accent); color: var(--color-white); opacity: 1; }
      `}</style>
    </div>
  );
}
