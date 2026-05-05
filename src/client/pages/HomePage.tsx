import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArticleCard } from '../components/ArticleCard';

interface HomePageProps {
  ssrData?: { articles?: any[] };
}

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1559181567-c3190ca9d715?w=1600&q=85',
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&q=85',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1600&q=85',
];

export function HomePage({ ssrData }: HomePageProps) {
  const [articles, setArticles] = useState<any[]>(ssrData?.articles || []);
  const [heroImg] = useState(HERO_IMAGES[0]);

  useEffect(() => {
    if (articles.length === 0) {
      fetch('/api/articles?limit=9')
        .then(r => r.json())
        .then(d => setArticles(d.articles || []))
        .catch(console.error);
    }
  }, []);

  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1, 9);

  return (
    <div className="home-page">
      {/* ─── Hero ─── */}
      <section className="home-hero" aria-label="Site hero">
        <div
          className="home-hero__bg"
          style={{ backgroundImage: `url(${heroImg})` }}
          aria-hidden="true"
        />
        <div className="home-hero__overlay" aria-hidden="true" />
        <div className="home-hero__content container">
          <div className="home-hero__eyebrow">Sugar Addiction · Metabolic Reset · Glucose Science</div>
          <h1 className="home-hero__title">
            Stop Being Owned<br />By Sugar.
          </h1>
          <p className="home-hero__subtitle">
            This isn't about willpower. It's about neuroscience.
            The no-morality, all-biology guide to breaking the glucose rollercoaster.
          </p>
          <div className="home-hero__actions">
            <Link to="/articles" className="btn btn--primary">
              Read the Articles
            </Link>
            <Link to="/assessment" className="btn btn--ghost">
              Take the Assessment
            </Link>
          </div>
        </div>
        <div className="home-hero__scroll-hint" aria-hidden="true">
          <span>Scroll</span>
          <div className="home-hero__scroll-line" />
        </div>
      </section>

      {/* ─── Oracle Lover intro ─── */}
      <section className="home-intro container">
        <div className="home-intro__inner">
          <div className="home-intro__quote">
            <blockquote>
              "Sugar isn't a moral failing. It's a neuroscience problem. And once you understand
              the mechanism, you can interrupt it."
            </blockquote>
            <cite>— The Oracle Lover</cite>
          </div>
          <div className="home-intro__text">
            <p>
              Look, here's the thing. Your brain is working exactly as designed. The glucose spike,
              the dopamine hit, the crash, the craving — that's not weakness. That's biology.
            </p>
            <p>
              This site exists to demystify the mechanism. No judgment. No "eat clean" lectures.
              Just the science of what's happening in your body, and what actually interrupts the cycle.
            </p>
            <Link to="/about" className="home-intro__link">
              About The Oracle Lover →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats bar ─── */}
      <section className="home-stats" aria-label="Site statistics">
        <div className="home-stats__inner container">
          {[
            { value: '30+', label: 'Evidence-based articles' },
            { value: '8', label: 'Expert researchers cited' },
            { value: '0', label: 'Moral judgments' },
            { value: '100%', label: 'Biology-based approach' },
          ].map(stat => (
            <div key={stat.label} className="home-stats__item">
              <span className="home-stats__value">{stat.value}</span>
              <span className="home-stats__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Featured article ─── */}
      {featuredArticle && (
        <section className="home-featured container" aria-label="Featured article">
          <div className="home-section-header">
            <h2>Featured</h2>
            <Link to="/articles" className="home-section-link">View all →</Link>
          </div>
          <div className="home-featured__grid">
            <ArticleCard article={featuredArticle} featured />
          </div>
        </section>
      )}

      {/* ─── Article grid ─── */}
      {gridArticles.length > 0 && (
        <section className="home-articles container" aria-label="Recent articles">
          <div className="home-section-header">
            <h2>Latest Articles</h2>
            <Link to="/articles" className="home-section-link">View all →</Link>
          </div>
          <div className="home-articles__grid">
            {gridArticles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* ─── Assessment CTA ─── */}
      <section className="home-cta-section" aria-label="Assessment call to action">
        <div className="home-cta-section__inner container">
          <div className="home-cta-section__content">
            <h2>How Dependent Are You on Sugar?</h2>
            <p>
              Take the 5-minute Sugar Dependency Assessment. No email required.
              Just honest answers and a clear picture of where you are.
            </p>
            <Link to="/assessment" className="btn btn--primary btn--large">
              Start the Assessment
            </Link>
          </div>
          <div className="home-cta-section__visual" aria-hidden="true">
            <div className="home-cta-section__circle">
              <span>5 min</span>
              <small>assessment</small>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Category strips ─── */}
      <section className="home-categories container" aria-label="Article categories">
        <div className="home-section-header">
          <h2>Explore by Topic</h2>
        </div>
        <div className="home-categories__grid">
          {[
            { slug: 'neuroscience', label: 'Neuroscience', desc: 'Dopamine, addiction, and the brain' },
            { slug: 'glucose-science', label: 'Glucose Science', desc: 'Spikes, crashes, and flat curves' },
            { slug: 'protocols', label: 'Protocols', desc: 'Practical detox strategies' },
            { slug: 'metabolic-health', label: 'Metabolic Health', desc: 'Insulin, labs, and markers' },
            { slug: 'psychology', label: 'Psychology', desc: 'Emotional eating and cravings' },
            { slug: 'lifestyle', label: 'Lifestyle', desc: 'Sleep, stress, and exercise' },
          ].map(cat => (
            <Link
              key={cat.slug}
              to={`/articles?category=${cat.slug}`}
              className="home-category-card"
            >
              <span className="home-category-card__label">{cat.label}</span>
              <span className="home-category-card__desc">{cat.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        /* ─── Hero ─── */
        .home-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .home-hero__bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transform: scale(1.05);
          transition: transform 0.1s linear;
          will-change: transform;
        }
        .home-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(28,21,16,0.3) 0%,
            rgba(28,21,16,0.6) 50%,
            rgba(28,21,16,0.85) 100%
          );
        }
        .home-hero__content {
          position: relative;
          z-index: 2;
          padding-top: var(--nav-height);
          max-width: 800px;
        }
        .home-hero__eyebrow {
          font-family: var(--font-ui);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.65);
          margin-bottom: var(--space-5);
        }
        .home-hero__title {
          font-family: var(--font-masthead);
          font-size: clamp(var(--text-4xl), 7vw, var(--text-5xl));
          font-weight: var(--font-weight-bold);
          color: var(--color-white);
          line-height: 1.05;
          margin-bottom: var(--space-6);
          letter-spacing: -0.02em;
        }
        .home-hero__subtitle {
          font-size: var(--text-xl);
          color: rgba(255,255,255,0.82);
          line-height: 1.6;
          margin-bottom: var(--space-10);
          max-width: 580px;
        }
        .home-hero__actions {
          display: flex;
          gap: var(--space-4);
          flex-wrap: wrap;
        }
        .home-hero__scroll-hint {
          position: absolute;
          bottom: var(--space-8);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
          color: rgba(255,255,255,0.5);
          font-family: var(--font-ui);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .home-hero__scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.5), transparent);
          animation: scrollPulse 2s ease infinite;
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.5; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.2); }
        }

        /* ─── Buttons ─── */
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
          letter-spacing: 0.02em;
          transition: all var(--transition-base);
          cursor: pointer;
          border: none;
        }
        .btn--primary {
          background: var(--color-accent);
          color: var(--color-white);
        }
        .btn--primary:hover {
          background: #7a2e2e;
          opacity: 1;
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .btn--ghost {
          background: transparent;
          color: var(--color-white);
          border: 1.5px solid rgba(255,255,255,0.5);
        }
        .btn--ghost:hover {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.8);
          opacity: 1;
        }
        .btn--large {
          padding: var(--space-5) var(--space-10);
          font-size: var(--text-base);
        }

        /* ─── Intro ─── */
        .home-intro {
          padding: var(--space-20) 0;
        }
        .home-intro__inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-16);
          align-items: center;
        }
        .home-intro__quote blockquote {
          font-family: var(--font-masthead);
          font-size: var(--text-2xl);
          line-height: 1.4;
          color: var(--color-text);
          border-left: 4px solid var(--color-accent);
          padding-left: var(--space-8);
          font-style: italic;
          margin: 0 0 var(--space-4);
        }
        .home-intro__quote cite {
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          color: var(--color-muted);
          padding-left: var(--space-8);
        }
        .home-intro__text p {
          font-size: var(--text-lg);
          line-height: 1.75;
          color: var(--color-muted);
        }
        .home-intro__link {
          font-family: var(--font-ui);
          font-weight: var(--font-weight-medium);
          color: var(--color-accent);
          text-decoration: none;
          font-size: var(--text-sm);
        }

        /* ─── Stats ─── */
        .home-stats {
          background: var(--color-text);
          padding: var(--space-12) 0;
        }
        .home-stats__inner {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-8);
          text-align: center;
        }
        .home-stats__item {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .home-stats__value {
          font-family: var(--font-masthead);
          font-size: var(--text-4xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-white);
        }
        .home-stats__label {
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          color: rgba(253,250,244,0.55);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* ─── Section headers ─── */
        .home-section-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: var(--space-8);
        }
        .home-section-header h2 {
          font-size: var(--text-2xl);
          font-weight: var(--font-weight-semibold);
        }
        .home-section-link {
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          color: var(--color-accent);
          text-decoration: none;
          font-weight: var(--font-weight-medium);
        }

        /* ─── Featured ─── */
        .home-featured {
          padding: var(--space-20) 0 0;
        }
        .home-featured__grid {
          display: grid;
          grid-template-columns: 1fr;
        }

        /* ─── Articles grid ─── */
        .home-articles {
          padding: var(--space-16) 0 0;
        }
        .home-articles__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-8);
        }

        /* ─── Assessment CTA ─── */
        .home-cta-section {
          background: var(--color-bio-card);
          margin-top: var(--space-20);
          padding: var(--space-20) 0;
        }
        .home-cta-section__inner {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: var(--space-16);
          align-items: center;
        }
        .home-cta-section__content h2 {
          font-size: var(--text-3xl);
          margin-bottom: var(--space-5);
        }
        .home-cta-section__content p {
          font-size: var(--text-lg);
          color: var(--color-muted);
          margin-bottom: var(--space-8);
          max-width: 500px;
        }
        .home-cta-section__circle {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          border: 2px solid var(--color-accent);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-1);
        }
        .home-cta-section__circle span {
          font-family: var(--font-masthead);
          font-size: var(--text-3xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-accent);
        }
        .home-cta-section__circle small {
          font-family: var(--font-ui);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-muted);
        }

        /* ─── Categories ─── */
        .home-categories {
          padding: var(--space-20) 0;
        }
        .home-categories__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-5);
        }
        .home-category-card {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          padding: var(--space-6);
          background: var(--color-white);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          text-decoration: none;
          transition: all var(--transition-base);
        }
        .home-category-card:hover {
          border-color: var(--color-accent);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
          opacity: 1;
        }
        .home-category-card__label {
          font-family: var(--font-masthead);
          font-size: var(--text-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
        }
        .home-category-card__desc {
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          color: var(--color-muted);
        }

        /* ─── Responsive ─── */
        @media (max-width: 1024px) {
          .home-articles__grid { grid-template-columns: repeat(2, 1fr); }
          .home-stats__inner { grid-template-columns: repeat(2, 1fr); }
          .home-categories__grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .home-intro__inner { grid-template-columns: 1fr; gap: var(--space-8); }
          .home-articles__grid { grid-template-columns: 1fr; }
          .home-stats__inner { grid-template-columns: repeat(2, 1fr); }
          .home-cta-section__inner { grid-template-columns: 1fr; }
          .home-cta-section__visual { display: none; }
          .home-categories__grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
