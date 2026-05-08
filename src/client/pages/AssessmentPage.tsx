import { useState, useEffect } from 'react';
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
  const [animatedScore, setAnimatedScore] = useState(0);

  const totalScore = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const maxScore = assessment.questions.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.value)), 0);
  const result = assessment.results.find(r => totalScore >= r.minScore && totalScore <= r.maxScore)
    || assessment.results[assessment.results.length - 1];

  const question = assessment.questions[currentQ];
  const progress = (currentQ / assessment.questions.length) * 100;
  const scorePercent = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
  const circumference = 2 * Math.PI * 52;

  useEffect(() => {
    if (phase === 'result') {
      setAnimatedScore(0);
      const t = setTimeout(() => setAnimatedScore(scorePercent), 150);
      return () => clearTimeout(t);
    }
  }, [phase, scorePercent]);

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
    setAnimatedScore(0);
  }

  // Level config
  const levelMap: Record<string, { accent: string; bg: string; emoji: string }> = {
    low:      { accent: '#2d7a4f', bg: 'linear-gradient(135deg,#e8f5ee,#f4faf7)', emoji: '🌿' },
    moderate: { accent: '#b07d2a', bg: 'linear-gradient(135deg,#fdf6e3,#fef9ee)', emoji: '🌻' },
    high:     { accent: '#8B1A1A', bg: 'linear-gradient(135deg,#fdf0f0,#fef5f5)', emoji: '🔥' },
    severe:   { accent: '#6b1414', bg: 'linear-gradient(135deg,#fde8e8,#fdf0f0)', emoji: '⚡' },
  };
  const resultLevel = (result as any)?.level || (scorePercent < 33 ? 'low' : scorePercent < 66 ? 'moderate' : 'high');
  const lvl = levelMap[resultLevel] || levelMap['moderate'];

  return (
    <div className="ap">
      {/* ── Header ── */}
      <header className="ap-header">
        <div className="container">
          <div className="ap-header__inner">
            <p className="ap-header__eyebrow">Self-Discovery Tools</p>
            <h1 className="ap-header__title">Know Your Body</h1>
            <p className="ap-header__sub">Science-backed assessments to understand your relationship with sugar, glucose, and metabolic health.</p>
          </div>
          <div className="ap-tabs-wrap">
            <div className="ap-tabs">
              {ASSESSMENTS.map(a => (
                <Link
                  key={a.slug}
                  to={`/assessment/${a.slug}`}
                  className={`ap-tab${assessmentSlug === a.slug ? ' active' : ''}`}
                  onClick={handleRestart}
                >
                  {a.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="ap-body container">

        {/* ── Intro ── */}
        {phase === 'intro' && (
          <div className="ap-intro">
            <div className="ap-intro__badge">{(assessment as any).category || 'Assessment'}</div>
            <h2 className="ap-intro__title">{assessment.title}</h2>
            <p className="ap-intro__sub">{assessment.subtitle}</p>
            <p className="ap-intro__desc">{assessment.description}</p>
            <div className="ap-intro__meta">
              {[
                `${assessment.questions.length} questions`,
                `~${Math.ceil(assessment.questions.length * 0.4)} min`,
                'No email required',
                'Instant results',
              ].map(m => (
                <span key={m} className="ap-intro__meta-item">
                  <span className="ap-dot">◆</span>{m}
                </span>
              ))}
            </div>
            <button className="btn btn--primary btn--lg" onClick={() => setPhase('quiz')}>
              Begin Assessment →
            </button>
            <p className="ap-intro__disc">For educational purposes only. Not medical advice.</p>
          </div>
        )}

        {/* ── Quiz ── */}
        {phase === 'quiz' && question && (
          <div className={`ap-quiz${animating ? ' ap-quiz--fade' : ''}`}>
            <div className="ap-prog">
              <div className="ap-prog__bar">
                <div className="ap-prog__fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="ap-prog__labels">
                <span>Question {currentQ + 1} of {assessment.questions.length}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
            </div>

            <div className="ap-q">
              <div className="ap-q__num">Q{currentQ + 1}</div>
              <h2 className="ap-q__text">{question.text}</h2>
              {(question as any).context && (
                <p className="ap-q__ctx">{(question as any).context}</p>
              )}
            </div>

            <div className="ap-opts">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  className={`ap-opt${selectedOption === opt.value ? ' selected' : ''}`}
                  onClick={() => handleOptionSelect(opt.value)}
                >
                  <span className="ap-opt__dot">{selectedOption === opt.value ? '●' : '○'}</span>
                  <span className="ap-opt__text">{opt.label}</span>
                </button>
              ))}
            </div>

            <div className="ap-quiz__actions">
              <button
                className={`btn btn--primary btn--lg${selectedOption === null ? ' btn--disabled' : ''}`}
                onClick={handleNext}
                disabled={selectedOption === null}
              >
                {currentQ < assessment.questions.length - 1 ? 'Next Question →' : 'See My Results →'}
              </button>
            </div>
          </div>
        )}

        {/* ── Results ── */}
        {phase === 'result' && result && (
          <div className="ap-result">

            {/* Hero */}
            <div className="ap-result__hero" style={{ background: lvl.bg }}>
              <span className="ap-result__emoji">{lvl.emoji}</span>
              <p className="ap-result__eyebrow">Your {assessment.title} Result</p>
              <h2 className="ap-result__title" style={{ color: lvl.accent }}>{result.title}</h2>
              <p className="ap-result__herosub">{(result as any).subtitle || 'Here\'s what your score reveals about your body.'}</p>

              {/* Animated ring */}
              <div className="ap-ring">
                <svg viewBox="0 0 120 120" className="ap-ring__svg">
                  <circle cx="60" cy="60" r="52" className="ap-ring__track" />
                  <circle
                    cx="60" cy="60" r="52"
                    className="ap-ring__prog"
                    style={{
                      stroke: lvl.accent,
                      strokeDasharray: `${(animatedScore / 100) * circumference} ${circumference}`,
                      transition: 'stroke-dasharray 1.5s cubic-bezier(0.34,1.56,0.64,1)',
                    }}
                  />
                </svg>
                <div className="ap-ring__inner">
                  <span className="ap-ring__num" style={{ color: lvl.accent }}>{totalScore}</span>
                  <span className="ap-ring__denom">/{maxScore}</span>
                  <span className="ap-ring__label">score</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="ap-result__desc">{result.description}</p>

            {/* Insights */}
            {(result as any).insights && (result as any).insights.length > 0 && (
              <div className="ap-card">
                <h3 className="ap-card__title">What This Means For You</h3>
                <div className="ap-insights">
                  {(result as any).insights.map((ins: string, i: number) => (
                    <div key={i} className="ap-insight">
                      <span className="ap-insight__dot" style={{ background: lvl.accent }} />
                      <p>{ins}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div className="ap-card">
              <h3 className="ap-card__title">Your Next Steps</h3>
              <ol className="ap-recs">
                {result.recommendations.map((rec: string, i: number) => (
                  <li key={i} className="ap-rec">
                    <span className="ap-rec__num" style={{ background: lvl.accent }}>{i + 1}</span>
                    <p>{rec}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Article links */}
            {result.articles && result.articles.length > 0 && (
              <div className="ap-art-section">
                <h3 className="ap-art-section__title">Recommended Reading For Your Level</h3>
                <p className="ap-art-section__sub">Selected specifically for your score range.</p>
                <div className="ap-art-chips">
                  {result.articles.map((s: string) => (
                    <Link
                      key={s}
                      to={`/articles/${s}`}
                      className="ap-art-chip"
                      style={{ borderColor: lvl.accent + '50' }}
                    >
                      <span style={{ color: lvl.accent }}>→</span>
                      <span>{slugToTitle(s)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quote */}
            <div className="ap-quote" style={{ borderColor: lvl.accent + '30', background: lvl.bg }}>
              <p className="ap-quote__text">
                "Understanding your body is the first act of self-love. You've just taken it."
              </p>
              <p className="ap-quote__attr">— The Oracle Lover</p>
            </div>

            {/* Actions */}
            <div className="ap-result__actions">
              <button className="btn btn--secondary" onClick={handleRestart}>Retake Assessment</button>
              <Link to="/assessment" className="btn btn--outline">Try Another Quiz</Link>
              <Link to="/articles" className="btn btn--primary">Explore All Articles →</Link>
            </div>

            {/* Other assessments */}
            <div className="ap-others">
              <h3 className="ap-others__title">Explore More Assessments</h3>
              <div className="ap-others__grid">
                {ASSESSMENTS.filter(a => a.slug !== assessmentSlug).slice(0, 4).map(a => (
                  <Link
                    key={a.slug}
                    to={`/assessment/${a.slug}`}
                    className="ap-other-card"
                    onClick={handleRestart}
                  >
                    <span className="ap-other-card__name">{a.title}</span>
                    <span className="ap-other-card__arrow" style={{ color: lvl.accent }}>→</span>
                  </Link>
                ))}
              </div>
            </div>

            <p className="ap-result__disc">
              This assessment is for educational purposes only and does not constitute medical advice.
              Consult a qualified healthcare provider for personalised guidance.
            </p>
          </div>
        )}
      </div>

      <style>{`
        .ap { min-height:100vh; padding-bottom:var(--space-24); background:var(--color-bg); }

        /* Header */
        .ap-header { background:var(--color-text); padding:calc(var(--nav-height) + var(--space-10)) 0 0; }
        .ap-header__inner { text-align:center; padding-bottom:var(--space-8); }
        .ap-header__eyebrow { font-family:var(--font-ui); font-size:var(--text-xs); text-transform:uppercase; letter-spacing:.15em; color:#e8a87c; margin-bottom:var(--space-3); }
        .ap-header__title { font-family:var(--font-masthead); font-size:var(--text-4xl); color:#fff; margin-bottom:var(--space-3); }
        .ap-header__sub { font-size:var(--text-base); color:rgba(255,255,255,.6); max-width:520px; margin:0 auto; }
        .ap-tabs-wrap { overflow-x:auto; scrollbar-width:none; }
        .ap-tabs-wrap::-webkit-scrollbar { display:none; }
        .ap-tabs { display:flex; min-width:max-content; padding:0 var(--space-4); border-top:1px solid rgba(255,255,255,.1); }
        .ap-tab { font-family:var(--font-ui); font-size:var(--text-sm); color:rgba(255,255,255,.5); padding:var(--space-4) var(--space-5); text-decoration:none; border-bottom:2px solid transparent; white-space:nowrap; transition:all var(--transition-fast); }
        .ap-tab:hover { color:rgba(255,255,255,.85); opacity:1; }
        .ap-tab.active { color:#fff; border-bottom-color:var(--color-accent); }

        /* Body */
        .ap-body { max-width:720px; margin:0 auto; padding-top:var(--space-16); }

        /* Intro */
        .ap-intro { text-align:center; max-width:560px; margin:0 auto; }
        .ap-intro__badge { display:inline-block; font-family:var(--font-ui); font-size:var(--text-xs); text-transform:uppercase; letter-spacing:.12em; color:var(--color-accent); background:rgba(139,26,26,.08); padding:var(--space-1) var(--space-4); border-radius:var(--radius-full); margin-bottom:var(--space-5); }
        .ap-intro__title { font-family:var(--font-masthead); font-size:var(--text-3xl); color:var(--color-text); margin-bottom:var(--space-4); line-height:1.2; }
        .ap-intro__sub { font-size:var(--text-lg); color:var(--color-accent); font-style:italic; margin-bottom:var(--space-5); }
        .ap-intro__desc { font-size:var(--text-base); color:var(--color-muted); line-height:1.75; margin-bottom:var(--space-8); }
        .ap-intro__meta { display:flex; flex-wrap:wrap; justify-content:center; gap:var(--space-4) var(--space-6); margin-bottom:var(--space-10); }
        .ap-intro__meta-item { display:flex; align-items:center; gap:var(--space-2); font-family:var(--font-ui); font-size:var(--text-sm); color:var(--color-muted); }
        .ap-dot { color:var(--color-accent); font-size:8px; }
        .ap-intro__disc { margin-top:var(--space-5); font-size:var(--text-xs); color:var(--color-muted); font-style:italic; }

        /* Quiz */
        .ap-quiz { transition:opacity .3s ease; }
        .ap-quiz--fade { opacity:0; }
        .ap-prog { margin-bottom:var(--space-10); }
        .ap-prog__bar { height:4px; background:var(--color-border); border-radius:var(--radius-full); overflow:hidden; margin-bottom:var(--space-3); }
        .ap-prog__fill { height:100%; background:var(--color-accent); border-radius:var(--radius-full); transition:width .4s ease; }
        .ap-prog__labels { display:flex; justify-content:space-between; font-family:var(--font-ui); font-size:var(--text-xs); color:var(--color-muted); }
        .ap-q { margin-bottom:var(--space-8); }
        .ap-q__num { font-family:var(--font-ui); font-size:var(--text-xs); text-transform:uppercase; letter-spacing:.12em; color:var(--color-accent); margin-bottom:var(--space-3); }
        .ap-q__text { font-family:var(--font-masthead); font-size:var(--text-2xl); color:var(--color-text); line-height:1.3; margin-bottom:var(--space-3); }
        .ap-q__ctx { font-size:var(--text-sm); color:var(--color-muted); font-style:italic; }
        .ap-opts { display:flex; flex-direction:column; gap:var(--space-3); margin-bottom:var(--space-8); }
        .ap-opt { display:flex; align-items:center; gap:var(--space-4); padding:var(--space-5) var(--space-6); background:var(--color-surface); border:1.5px solid var(--color-border); border-radius:var(--radius-lg); cursor:pointer; text-align:left; transition:all var(--transition-fast); font-size:var(--text-base); color:var(--color-text); font-family:var(--font-ui); }
        .ap-opt:hover { border-color:var(--color-accent); background:rgba(139,26,26,.04); }
        .ap-opt.selected { border-color:var(--color-accent); background:rgba(139,26,26,.06); color:var(--color-accent); }
        .ap-opt__dot { font-size:18px; color:var(--color-accent); flex-shrink:0; width:20px; }
        .ap-opt__text { line-height:1.5; }
        .ap-quiz__actions { display:flex; justify-content:flex-end; }

        /* Result hero */
        .ap-result { max-width:680px; margin:0 auto; }
        .ap-result__hero { border-radius:var(--radius-xl); padding:var(--space-12) var(--space-8); text-align:center; margin-bottom:var(--space-8); }
        .ap-result__emoji { font-size:52px; display:block; margin-bottom:var(--space-4); }
        .ap-result__eyebrow { font-family:var(--font-ui); font-size:var(--text-xs); text-transform:uppercase; letter-spacing:.12em; color:var(--color-muted); margin-bottom:var(--space-3); }
        .ap-result__title { font-family:var(--font-masthead); font-size:var(--text-3xl); margin-bottom:var(--space-3); line-height:1.2; }
        .ap-result__herosub { font-size:var(--text-base); color:var(--color-muted); max-width:400px; margin:0 auto var(--space-8); line-height:1.65; }

        /* Ring */
        .ap-ring { position:relative; width:140px; height:140px; margin:0 auto; }
        .ap-ring__svg { width:140px; height:140px; transform:rotate(-90deg); }
        .ap-ring__track { fill:none; stroke:rgba(0,0,0,.08); stroke-width:8; }
        .ap-ring__prog { fill:none; stroke-width:8; stroke-linecap:round; stroke-dasharray:0 326.7; }
        .ap-ring__inner { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; }
        .ap-ring__num { font-family:var(--font-masthead); font-size:var(--text-4xl); font-weight:700; line-height:1; }
        .ap-ring__denom { font-family:var(--font-ui); font-size:var(--text-sm); color:var(--color-muted); line-height:1; }
        .ap-ring__label { font-family:var(--font-ui); font-size:var(--text-xs); text-transform:uppercase; letter-spacing:.1em; color:var(--color-muted); margin-top:2px; }

        /* Result body */
        .ap-result__desc { font-size:var(--text-lg); line-height:1.8; color:var(--color-muted); margin-bottom:var(--space-8); }
        .ap-card { background:var(--color-surface); border:1px solid var(--color-border); border-radius:var(--radius-xl); padding:var(--space-8); margin-bottom:var(--space-6); }
        .ap-card__title { font-family:var(--font-masthead); font-size:var(--text-xl); color:var(--color-text); margin-bottom:var(--space-6); }
        .ap-insights { display:flex; flex-direction:column; gap:var(--space-4); }
        .ap-insight { display:flex; align-items:flex-start; gap:var(--space-4); }
        .ap-insight__dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; margin-top:8px; }
        .ap-insight p { font-size:var(--text-base); line-height:1.7; color:var(--color-muted); margin:0; }
        .ap-recs { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:var(--space-5); }
        .ap-rec { display:flex; align-items:flex-start; gap:var(--space-4); }
        .ap-rec__num { width:28px; height:28px; border-radius:50%; color:#fff; font-family:var(--font-ui); font-size:var(--text-sm); font-weight:600; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .ap-rec p { font-size:var(--text-base); line-height:1.7; color:var(--color-muted); margin:0; padding-top:4px; }

        /* Article chips */
        .ap-art-section { margin-bottom:var(--space-8); }
        .ap-art-section__title { font-family:var(--font-masthead); font-size:var(--text-xl); margin-bottom:var(--space-2); }
        .ap-art-section__sub { font-size:var(--text-sm); color:var(--color-muted); margin-bottom:var(--space-5); }
        .ap-art-chips { display:flex; flex-wrap:wrap; gap:var(--space-3); }
        .ap-art-chip { display:flex; align-items:center; gap:var(--space-2); padding:var(--space-3) var(--space-5); background:var(--color-surface); border:1.5px solid; border-radius:var(--radius-full); font-family:var(--font-ui); font-size:var(--text-sm); color:var(--color-text); text-decoration:none; transition:all var(--transition-fast); }
        .ap-art-chip:hover { background:var(--color-accent); color:#fff; border-color:var(--color-accent); opacity:1; }

        /* Quote */
        .ap-quote { border:1px solid; border-radius:var(--radius-xl); padding:var(--space-8) var(--space-10); text-align:center; margin-bottom:var(--space-8); }
        .ap-quote__text { font-family:var(--font-masthead); font-size:var(--text-xl); font-style:italic; color:var(--color-text); line-height:1.6; margin-bottom:var(--space-3); }
        .ap-quote__attr { font-family:var(--font-ui); font-size:var(--text-sm); color:var(--color-muted); }

        /* Actions */
        .ap-result__actions { display:flex; gap:var(--space-3); flex-wrap:wrap; margin-bottom:var(--space-10); }

        /* Other assessments */
        .ap-others { margin-bottom:var(--space-10); }
        .ap-others__title { font-family:var(--font-masthead); font-size:var(--text-xl); margin-bottom:var(--space-5); }
        .ap-others__grid { display:grid; grid-template-columns:repeat(2,1fr); gap:var(--space-3); }
        .ap-other-card { display:flex; align-items:center; justify-content:space-between; padding:var(--space-4) var(--space-5); background:var(--color-surface); border:1px solid var(--color-border); border-radius:var(--radius-lg); text-decoration:none; transition:all var(--transition-fast); }
        .ap-other-card:hover { border-color:var(--color-accent); background:rgba(139,26,26,.04); opacity:1; }
        .ap-other-card__name { font-family:var(--font-ui); font-size:var(--text-sm); color:var(--color-text); line-height:1.4; }
        .ap-other-card__arrow { font-size:16px; flex-shrink:0; margin-left:var(--space-3); }

        .ap-result__disc { font-size:var(--text-xs); color:var(--color-muted); font-style:italic; text-align:center; line-height:1.65; }

        /* Buttons */
        .btn { display:inline-flex; align-items:center; justify-content:center; padding:var(--space-4) var(--space-8); border-radius:var(--radius-full); font-family:var(--font-ui); font-size:var(--text-sm); font-weight:var(--font-weight-medium); text-decoration:none; cursor:pointer; border:none; transition:all var(--transition-base); }
        .btn--primary { background:var(--color-accent); color:#fff; }
        .btn--primary:hover { background:#7a2e2e; opacity:1; }
        .btn--primary.btn--disabled { opacity:.4; cursor:not-allowed; }
        .btn--secondary { background:transparent; color:var(--color-accent); border:1.5px solid var(--color-accent); }
        .btn--secondary:hover { background:var(--color-accent); color:#fff; opacity:1; }
        .btn--outline { background:transparent; color:var(--color-text); border:1.5px solid var(--color-border); }
        .btn--outline:hover { border-color:var(--color-accent); color:var(--color-accent); opacity:1; }
        .btn--lg { padding:var(--space-5) var(--space-10); font-size:var(--text-base); }

        /* Responsive */
        @media (max-width:600px) {
          .ap-header__title { font-size:var(--text-3xl); }
          .ap-q__text { font-size:var(--text-xl); }
          .ap-result__hero { padding:var(--space-8) var(--space-5); }
          .ap-result__title { font-size:var(--text-2xl); }
          .ap-others__grid { grid-template-columns:1fr; }
          .ap-result__actions { flex-direction:column; }
          .ap-quote { padding:var(--space-6); }
          .ap-quote__text { font-size:var(--text-lg); }
        }
      `}</style>
    </div>
  );
}

function slugToTitle(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}
