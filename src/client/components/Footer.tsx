import { Link } from 'react-router-dom';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-icon">◆</span>
              Sugar Hijack
            </Link>
            <p className="footer__tagline">
              The no-morality, all-biology guide to breaking sugar addiction.
            </p>
            <p className="footer__niche-tag">Sugar Addiction · Metabolic Reset · Glucose Management</p>
          </div>

          <div className="footer__col">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/articles">All Articles</Link></li>
              <li><Link to="/recommended">Blood Sugar Library</Link></li>
              <li><Link to="/assessment">Sugar Assessment</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/privacy#affiliate">Affiliate Disclosure</Link></li>
              <li><Link to="/privacy#health">Health Disclaimer</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Connect</h4>
            <ul>
              <li><Link to="/about">About The Oracle Lover</Link></li>
              <li>
                <a
                  href="https://theoraclelover.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  theoraclelover.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__disclaimer">
            <strong>Health Disclaimer:</strong> sugarhijack.com is for educational purposes only.
            Metabolic conditions including diabetes and prediabetes require medical management.
            Consult your healthcare provider before making significant dietary changes.
          </p>
          <p className="footer__affiliate">
            As an Amazon Associate I earn from qualifying purchases.
          </p>
          <p className="footer__copyright">
            &copy; {year} Sugar Hijack. Written by{' '}
            <a href="https://theoraclelover.com" target="_blank" rel="noopener noreferrer">
              The Oracle Lover
            </a>.
          </p>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--color-text);
          color: rgba(253, 250, 244, 0.85);
          padding: var(--space-16) 0 var(--space-8);
          margin-top: var(--space-24);
        }
        .footer__inner {
          max-width: var(--site-max-width);
        }
        .footer__grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: var(--space-12);
          margin-bottom: var(--space-12);
        }
        .footer__logo {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          font-family: var(--font-masthead);
          font-weight: var(--font-weight-bold);
          font-size: 1.2rem;
          color: var(--color-white);
          text-decoration: none;
          margin-bottom: var(--space-4);
        }
        .footer__logo-icon {
          color: var(--color-accent);
        }
        .footer__tagline {
          font-size: var(--text-sm);
          line-height: 1.6;
          color: rgba(253, 250, 244, 0.65);
          margin-bottom: var(--space-3);
        }
        .footer__niche-tag {
          font-size: var(--text-xs);
          font-family: var(--font-ui);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-accent);
          margin: 0;
        }
        .footer__col h4 {
          font-family: var(--font-ui);
          font-size: var(--text-xs);
          font-weight: var(--font-weight-medium);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(253, 250, 244, 0.5);
          margin-bottom: var(--space-4);
        }
        .footer__col ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer__col li {
          margin-bottom: var(--space-3);
        }
        .footer__col a {
          color: rgba(253, 250, 244, 0.75);
          text-decoration: none;
          font-size: var(--text-sm);
          transition: color var(--transition-fast);
        }
        .footer__col a:hover {
          color: var(--color-white);
          opacity: 1;
        }
        .footer__bottom {
          border-top: 1px solid rgba(253, 250, 244, 0.1);
          padding-top: var(--space-8);
        }
        .footer__disclaimer {
          font-size: var(--text-xs);
          color: rgba(253, 250, 244, 0.5);
          line-height: 1.6;
          margin-bottom: var(--space-3);
        }
        .footer__affiliate {
          font-size: var(--text-xs);
          color: rgba(253, 250, 244, 0.45);
          margin-bottom: var(--space-3);
        }
        .footer__copyright {
          font-size: var(--text-xs);
          color: rgba(253, 250, 244, 0.4);
          margin: 0;
        }
        .footer__copyright a {
          color: rgba(253, 250, 244, 0.6);
          text-decoration: underline;
        }

        @media (max-width: 900px) {
          .footer__grid {
            grid-template-columns: 1fr 1fr;
            gap: var(--space-8);
          }
          .footer__brand {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 600px) {
          .footer__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
