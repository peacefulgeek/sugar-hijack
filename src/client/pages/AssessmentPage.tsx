import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ASSESSMENTS } from '../../data/assessments';

interface AssessmentPageProps {
  ssrData?: any;
}

type Phase = 'intro' | 'quiz' | 'result';

export function AssessmentPage({ ssrData }: AssessmentPageProps) {
  const { slug } = useParams<{ slug?: string }>();
  const assessmentSlug = slug || 'sugar-dependency';
  const assessment = ASSESSMENTS.find(a => a.slug === assessmentSlug) || ASSESSMENTS[0];

  const [phase, setPhase] = useState<Phase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  const totalScore = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const result = assessment.results.find(r => totalScore >= r.minScore && totalScore <= r.maxScore)
    || assessment.results[assessment.results.length - 1];

  const question = assessment.questions[currentQ];
  const progress = ((currentQ) / assessment.questions.length) * 100;

  function handleOptionSelect(value: number) {
    setSelectedOption(value);
  }

  function handleNext() {
    if (selectedOption === null) return;
    const newAnswers = { ...answers, [question.id]: selectedOption };
    setAnswers(newAnswers);
    setAnimating(true);

    setTimeout(() => {
      setAnimating(false);
      setSelectedOption(null);
      if (currentQ < assessment.questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        setPhase('result');
      }
    }, 300);
  }

  function handleRestart() {
    setPhase('intro');
    setCurrentQ(0);
    setAnswers({});
    setSelectedOption(null);
  }

  return (
    <div className="assessment-page">
      {/* ─── Header ─── */}
      <header className="assessment-header">
        <div className="container">
          <div className="assessment-header__nav">
            {ASSESSMENTS.map(a => (
              <Link
                key={a.slug}
                to={`/assessment/${a.slug}`}
                className={`assessment-tab ${assessmentSlug === a.slug ? 'active' : ''}`}
                onClick={handleRestart}
              >
                {a.title}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <div className="assessment-body container">
        {/* ─── Intro ─── */}
        {phase === 'intro' && (
          <div className="assessment-intro">
            <div className="assessment-intro__icon" aria-hidden="true">◆</div>
            <h1 className="assessment-intro__title">{assessment.title}</h1>
            <p className="assessment-intro__subtitle">{assessment.subtitle}</p>
            <p className="assessment-intro__desc">{assessment.description}</p>
            <div className="assessment-intro__meta">
              <span>{assessment.questions.length} questions</span>
              <span>·</span>
              <span>No email required</span>
              <span>·</span>
              <span>Instant results</span>
            </div>
            <button
              className="btn btn--primary btn--large"
              onClick={() => setPhase('quiz')}
            >
              Start Assessment
            </button>
          </div>
        )}

        {/* ─── Quiz ─── */}
        {phase === 'quiz' && question && (
          <div className={`assessment-quiz ${animating ? 'assessment-quiz--exit' : 'assessment-quiz--enter'}`}>
            {/* Progress */}
            <div className="assessment-progress">
              <div className="assessment-progress__bar">
                <div
                  className="assessment-progress__fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="assessment-progress__label">
                {currentQ + 1} of {assessment.questions.length}
              </span>
            </div>

            {/* Question */}
            <div className="assessment-question">
              <div className="assessment-question__number">Question {currentQ + 1}</div>
              <h2 className="assessment-question__text">{question.text}</h2>
            </div>

            {/* Options */}
            <div className="assessment-options" role="radiogroup" aria-label={question.text}>
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  className={`assessment-option ${selectedOption === opt.value && answers[question.id] === undefined ? 'selected' : ''} ${selectedOption !== null && selectedOption === opt.value ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(opt.value)}
                  role="radio"
                  aria-checked={selectedOption === opt.value}
                >
                  <span className="assessment-option__indicator" aria-hidden="true">
                    {selectedOption === opt.value ? '●' : '○'}
                  </span>
                  <span className="assessment-option__label">{opt.label}</span>
                </button>
              ))}
            </div>

            {/* Next button */}
            <div className="assessment-actions">
              <button
                className={`btn btn--primary ${selectedOption === null ? 'btn--disabled' : ''}`}
                onClick={handleNext}
                disabled={selectedOption === null}
              >
                {currentQ < assessment.questions.length - 1 ? 'Next Question' : 'See My Results'}
              </button>
            </div>
          </div>
        )}

        {/* ─── Result ─── */}
        {phase === 'result' && result && (
          <div className="assessment-result">
            <div className="assessment-result__header">
              <div className="assessment-result__score-ring" aria-label={`Score: ${totalScore} out of ${assessment.questions.length * 3}`}>
                <svg viewBox="0 0 120 120" className="assessment-result__ring-svg">
                  <circle cx="60" cy="60" r="50" className="ring-bg" />
                  <circle
                    cx="60" cy="60" r="50"
                    className="ring-fill"
                    strokeDasharray={`${(totalScore / (assessment.questions.length * 3)) * 314} 314`}
                  />
                </svg>
                <div className="assessment-result__score-inner">
                  <span className="assessment-result__score-num">{totalScore}</span>
                  <span className="assessment-result__score-max">/{assessment.questions.length * 3}</span>
                </div>
              </div>
              <div className="assessment-result__header-text">
                <div className="assessment-result__level-label">Your Result</div>
                <h2 className="assessment-result__title">{result.title}</h2>
              </div>
            </div>

            <p className="assessment-result__description">{result.description}</p>

            <div className="assessment-result__recommendations">
              <h3>What to do next</h3>
              <ul>
                {result.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>

            {result.articles.length > 0 && (
              <div className="assessment-result__articles">
                <h3>Recommended reading for your level</h3>
                <div className="assessment-result__article-links">
                  {result.articles.map(slug => (
                    <Link
                      key={slug}
                      to={`/articles/${slug}`}
                      className="assessment-result__article-link"
                    >
                      {slugToTitle(slug)}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="assessment-result__actions">
              <button className="btn btn--secondary" onClick={handleRestart}>
                Retake Assessment
              </button>
              <Link to="/articles" className="btn btn--primary">
                Browse All Articles
              </Link>
            </div>

            <p className="assessment-result__disclaimer">
              This assessment is for educational purposes only and does not constitute medical advice.
            </p>
          </div>
        )}
      </div>

      <style>{`
        .assessment-page {
          min-height: 100vh;
          padding-bottom: var(--space-24);
        }
        .assessment-header {
          background: var(--color-text);
          padding: calc(var(--nav-height) + var(--space-6)) 0 var(--space-6);
        }
        .assessment-header__nav {
          display: flex;
          gap: var(--space-4);
          flex-wrap: wrap;
        }
        .assessment-tab {
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
          color: rgba(253,250,244,0.55);
          text-decoration: none;
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          border: 1px solid rgba(253,250,244,0.2);
          transition: all var(--transition-fast);
        }
        .assessment-tab.active,
        .assessment-tab:hover {
          color: var(--color-white);
          border-color: var(--color-accent);
          background: rgba(139,58,58,0.3);
          opacity: 1;
        }

        .assessment-body {
          max-width: 680px;
          padding-top: var(--space-16);
        }

        /* ─── Intro ─── */
        .assessment-intro {
          text-align: center;
          padding: var(--space-8) 0;
        }
        .assessment-intro__icon {
          font-size: 48px;
          color: var(--color-accent);
          margin-bottom: var(--space-6);
        }
        .assessment-intro__title {
          font-family: var(--font-masthead);
          font-size: var(--text-3xl);
          margin-bottom: var(--space-3);
        }
        .assessment-intro__subtitle {
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          color: var(--color-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: var(--space-6);
        }
        .assessment-intro__desc {
          font-size: var(--text-lg);
          color: var(--color-muted);
          line-height: 1.7;
          margin-bottom: var(--space-6);
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
        }
        .assessment-intro__meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          color: var(--color-muted);
          margin-bottom: var(--space-10);
        }

        /* ─── Quiz ─── */
        .assessment-quiz {
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .assessment-quiz--exit {
          opacity: 0;
          transform: translateX(-20px);
        }
        .assessment-quiz--enter {
          opacity: 1;
          transform: translateX(0);
        }
        .assessment-progress {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-10);
        }
        .assessment-progress__bar {
          flex: 1;
          height: 4px;
          background: var(--color-border);
          border-radius: var(--radius-full);
          overflow: hidden;
        }
        .assessment-progress__fill {
          height: 100%;
          background: var(--color-accent);
          border-radius: var(--radius-full);
          transition: width 0.4s ease;
        }
        .assessment-progress__label {
          font-family: var(--font-ui);
          font-size: var(--text-xs);
          color: var(--color-muted);
          white-space: nowrap;
        }
        .assessment-question {
          margin-bottom: var(--space-8);
        }
        .assessment-question__number {
          font-family: var(--font-ui);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-accent);
          margin-bottom: var(--space-3);
        }
        .assessment-question__text {
          font-family: var(--font-masthead);
          font-size: var(--text-2xl);
          line-height: 1.35;
          color: var(--color-text);
        }
        .assessment-options {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          margin-bottom: var(--space-8);
        }
        .assessment-option {
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
          padding: var(--space-5) var(--space-6);
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-lg);
          background: var(--color-white);
          cursor: pointer;
          text-align: left;
          transition: all var(--transition-fast);
          font-size: var(--text-base);
          color: var(--color-text);
          font-family: var(--font-body);
        }
        .assessment-option:hover {
          border-color: var(--color-accent);
          background: var(--color-bio-card);
        }
        .assessment-option.selected {
          border-color: var(--color-accent);
          background: rgba(139,58,58,0.06);
        }
        .assessment-option__indicator {
          color: var(--color-accent);
          font-size: 1.1em;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .assessment-option__label {
          line-height: 1.5;
        }
        .assessment-actions {
          display: flex;
          justify-content: flex-end;
        }

        /* ─── Result ─── */
        .assessment-result {
          padding: var(--space-4) 0;
        }
        .assessment-result__header {
          display: flex;
          align-items: center;
          gap: var(--space-8);
          margin-bottom: var(--space-8);
          padding-bottom: var(--space-8);
          border-bottom: 1px solid var(--color-border);
        }
        .assessment-result__score-ring {
          position: relative;
          width: 120px;
          height: 120px;
          flex-shrink: 0;
        }
        .assessment-result__ring-svg {
          width: 120px;
          height: 120px;
          transform: rotate(-90deg);
        }
        .ring-bg {
          fill: none;
          stroke: var(--color-border);
          stroke-width: 8;
        }
        .ring-fill {
          fill: none;
          stroke: var(--color-accent);
          stroke-width: 8;
          stroke-linecap: round;
          transition: stroke-dasharray 1s ease;
        }
        .assessment-result__score-inner {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row;
          gap: 1px;
        }
        .assessment-result__score-num {
          font-family: var(--font-masthead);
          font-size: var(--text-3xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-accent);
        }
        .assessment-result__score-max {
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          color: var(--color-muted);
          align-self: flex-end;
          margin-bottom: 6px;
        }
        .assessment-result__level-label {
          font-family: var(--font-ui);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-muted);
          margin-bottom: var(--space-2);
        }
        .assessment-result__title {
          font-family: var(--font-masthead);
          font-size: var(--text-2xl);
          color: var(--color-text);
        }
        .assessment-result__description {
          font-size: var(--text-lg);
          line-height: 1.75;
          color: var(--color-muted);
          margin-bottom: var(--space-10);
        }
        .assessment-result__recommendations {
          background: var(--color-bio-card);
          border-radius: var(--radius-lg);
          padding: var(--space-8);
          margin-bottom: var(--space-8);
          border: 1px solid rgba(139,58,58,0.1);
        }
        .assessment-result__recommendations h3 {
          font-size: var(--text-xl);
          margin-bottom: var(--space-5);
        }
        .assessment-result__recommendations ul {
          padding-left: var(--space-5);
          margin: 0;
        }
        .assessment-result__recommendations li {
          margin-bottom: var(--space-3);
          line-height: 1.65;
          font-size: var(--text-base);
        }
        .assessment-result__articles {
          margin-bottom: var(--space-8);
        }
        .assessment-result__articles h3 {
          font-size: var(--text-xl);
          margin-bottom: var(--space-5);
        }
        .assessment-result__article-links {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
        }
        .assessment-result__article-link {
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          color: var(--color-accent);
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-full);
          text-decoration: none;
          transition: all var(--transition-fast);
        }
        .assessment-result__article-link:hover {
          background: var(--color-accent);
          color: var(--color-white);
          border-color: var(--color-accent);
          opacity: 1;
        }
        .assessment-result__actions {
          display: flex;
          gap: var(--space-4);
          margin-bottom: var(--space-8);
          flex-wrap: wrap;
        }
        .assessment-result__disclaimer {
          font-size: var(--text-xs);
          color: var(--color-muted);
          font-style: italic;
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
          cursor: pointer;
          border: none;
          transition: all var(--transition-base);
        }
        .btn--primary { background: var(--color-accent); color: var(--color-white); }
        .btn--primary:hover { background: #7a2e2e; opacity: 1; }
        .btn--primary.btn--disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .btn--secondary {
          background: transparent;
          color: var(--color-accent);
          border: 1.5px solid var(--color-accent);
        }
        .btn--secondary:hover { background: var(--color-accent); color: var(--color-white); opacity: 1; }
        .btn--large { padding: var(--space-5) var(--space-10); font-size: var(--text-base); }

        @media (max-width: 600px) {
          .assessment-result__header { flex-direction: column; align-items: flex-start; }
          .assessment-question__text { font-size: var(--text-xl); }
        }
      `}</style>
    </div>
  );
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
