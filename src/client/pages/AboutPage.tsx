import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <div className="about-page">
      <header className="about-header">
        <div className="container">
          <div className="about-header__content">
            <div className="about-header__eyebrow">About the Author</div>
            <h1 className="about-header__title">The Oracle Lover</h1>
            <p className="about-header__subtitle">
              Intuitive Educator &amp; Oracle Guide
            </p>
          </div>
        </div>
      </header>

      <div className="about-content container">
        <div className="about-content__inner content-width">
          <div className="about-bio-card">
            <div className="about-bio-card__avatar" aria-hidden="true">OL</div>
            <div className="about-bio-card__text">
              <p>
                Look, here's the thing. Most people writing about sugar are either trying to
                sell you a diet or make you feel bad about your choices. Neither of those
                approaches works. And neither is honest.
              </p>
              <p>
                The Oracle Lover is the no-BS oracle reader who also has a science degree.
                Demystifying. Grounded. Accessible. The body doesn't lie. The mind does. Constantly.
              </p>
              <p>
                This site exists because sugar addiction is a neuroscience problem, not a
                willpower problem. Once you understand the mechanism, you can interrupt it.
                That's the whole point.
              </p>
            </div>
          </div>

          <div className="about-section">
            <h2>The Approach</h2>
            <p>
              Stop overthinking this. Your brain is working exactly as designed. The glucose
              spike, the dopamine hit, the crash, the craving — that's not weakness. That's
              biology. And biology can be understood. And once understood, it can be worked with.
            </p>
            <p>
              The Oracle Lover removes moral language from sugar completely. No "good" or "bad"
              food. Pure biology, pure psychology. Here's what glucose does to your dopamine
              system. Here's what happens when you spike and crash. Here's how to stop it.
            </p>
          </div>

          <div className="about-section">
            <h2>The Researchers Behind the Work</h2>
            <p>
              The articles on this site draw from the best metabolic health researchers working
              today. Jessie Inchauspé's glucose spike research. Robert Lustig's work on fructose
              and addiction neuroscience. Casey Means on metabolic health. Benjamin Bikman on
              insulin resistance. Gary Taubes on the historical case against sugar.
            </p>
            <p>
              Plus the psychological and spiritual dimensions: Carl Jung on the shadow of desire,
              Tara Brach on urge surfing, Angeles Arrien on nourishment as a four-fold need.
              Because the body and the psyche are not separate systems.
            </p>
          </div>

          <div className="about-section">
            <h2>What This Site Is Not</h2>
            <ul>
              <li>This is not a diet plan.</li>
              <li>This is not a morality lecture.</li>
              <li>This is not a "never eat sugar again" manifesto.</li>
              <li>This is not medical advice.</li>
            </ul>
            <p>
              This is not about never eating sugar. It's about not being owned by it.
              There's a difference. A significant one.
            </p>
          </div>

          <div className="about-disclaimer">
            <strong>Health Disclaimer:</strong> sugarhijack.com is for educational purposes only.
            Metabolic conditions including diabetes and prediabetes require medical management.
            Consult your healthcare provider before making significant dietary changes.
          </div>

          <div className="about-cta">
            <a
              href="https://theoraclelover.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              Visit theoraclelover.com
            </a>
            <Link to="/articles" className="btn btn--secondary">
              Read the Articles
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .about-page { padding-bottom: var(--space-24); }
        .about-header {
          background: var(--color-text);
          padding: calc(var(--nav-height) + var(--space-16)) 0 var(--space-16);
        }
        .about-header__eyebrow {
          font-family: var(--font-ui);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--color-accent);
          margin-bottom: var(--space-4);
        }
        .about-header__title {
          font-family: var(--font-masthead);
          font-size: var(--text-4xl);
          color: var(--color-white);
          margin-bottom: var(--space-3);
        }
        .about-header__subtitle {
          font-size: var(--text-xl);
          color: rgba(253,250,244,0.6);
          font-style: italic;
          margin: 0;
        }
        .about-content { padding: var(--space-16) 0; }
        .about-content__inner { padding: 0 var(--space-6); }
        .about-bio-card {
          display: flex;
          gap: var(--space-8);
          background: var(--color-bio-card);
          border-radius: var(--radius-lg);
          padding: var(--space-8);
          margin-bottom: var(--space-12);
          border: 1px solid rgba(139,58,58,0.1);
        }
        .about-bio-card__avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: var(--color-accent);
          color: var(--color-white);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-masthead);
          font-weight: var(--font-weight-bold);
          font-size: var(--text-xl);
          flex-shrink: 0;
        }
        .about-bio-card__text p { font-size: var(--text-lg); line-height: 1.75; }
        .about-section { margin-bottom: var(--space-12); }
        .about-section h2 {
          font-size: var(--text-2xl);
          margin-bottom: var(--space-5);
          padding-bottom: var(--space-3);
          border-bottom: 1px solid var(--color-border);
        }
        .about-section p { font-size: var(--text-lg); line-height: 1.75; color: var(--color-muted); }
        .about-section ul { font-size: var(--text-lg); color: var(--color-muted); }
        .about-section li { margin-bottom: var(--space-2); }
        .about-disclaimer {
          font-size: var(--text-sm);
          color: var(--color-muted);
          background: var(--color-surface);
          border-radius: var(--radius-md);
          padding: var(--space-4) var(--space-5);
          margin-bottom: var(--space-10);
          border: 1px solid var(--color-border);
        }
        .about-cta {
          display: flex;
          gap: var(--space-4);
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

        @media (max-width: 600px) {
          .about-bio-card { flex-direction: column; align-items: center; text-align: center; }
          .about-header__title { font-size: var(--text-3xl); }
        }
      `}</style>
    </div>
  );
}
