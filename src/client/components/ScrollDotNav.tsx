import { useState, useEffect } from 'react';

interface Section {
  id: string;
  label: string;
}

interface ScrollDotNavProps {
  sections: Section[];
}

export function ScrollDotNav({ sections }: ScrollDotNavProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined' || sections.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.3;
      let current = 0;
      for (let i = 0; i < sections.length; i++) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollY) {
          current = i;
        }
      }
      setActiveIdx(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  if (sections.length < 3) return null;

  return (
    <nav className="dot-nav" aria-label="Section navigation">
      {sections.map((section, i) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`dot-nav__dot ${i === activeIdx ? 'dot-nav__dot--active' : ''}`}
          aria-label={section.label}
          title={section.label}
        />
      ))}

      <style>{`
        .dot-nav {
          position: fixed;
          right: var(--space-6);
          top: 50%;
          transform: translateY(-50%);
          z-index: var(--z-base);
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          align-items: center;
        }
        .dot-nav__dot {
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-border);
          border: 1.5px solid var(--color-muted);
          transition: all var(--transition-base);
          cursor: pointer;
          text-decoration: none;
        }
        .dot-nav__dot--active {
          background: var(--color-accent);
          border-color: var(--color-accent);
          transform: scale(1.4);
        }
        .dot-nav__dot:hover {
          background: var(--color-accent);
          border-color: var(--color-accent);
          opacity: 1;
        }

        @media (max-width: 768px) {
          .dot-nav { display: none; }
        }
      `}</style>
    </nav>
  );
}
