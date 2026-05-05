import { useState, useEffect } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    // Parse headings from content
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const parsed: TocItem[] = [];
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].replace(/\*\*/g, '').trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      parsed.push({ id, text, level });
    }
    setItems(parsed);
  }, [content]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0% -70% 0%' }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length < 3) return null;

  return (
    <nav className="toc" aria-label="Table of contents">
      <p className="toc__title">In this article</p>
      <ol className="toc__list">
        {items.map((item) => (
          <li
            key={item.id}
            className={`toc__item toc__item--h${item.level} ${activeId === item.id ? 'toc__item--active' : ''}`}
          >
            <a href={`#${item.id}`} className="toc__link">
              {item.text}
            </a>
          </li>
        ))}
      </ol>

      <style>{`
        .toc {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          margin: var(--space-8) 0;
          border: 1px solid var(--color-border);
        }
        .toc__title {
          font-family: var(--font-ui);
          font-size: var(--text-xs);
          font-weight: var(--font-weight-medium);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--color-muted);
          margin-bottom: var(--space-4);
        }
        .toc__list {
          list-style: none;
          padding: 0;
          margin: 0;
          counter-reset: toc;
        }
        .toc__item {
          margin-bottom: var(--space-2);
          counter-increment: toc;
        }
        .toc__item--h3 {
          padding-left: var(--space-5);
        }
        .toc__link {
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          color: var(--color-muted);
          text-decoration: none;
          transition: color var(--transition-fast);
          display: block;
          padding: 2px 0;
          border-left: 2px solid transparent;
          padding-left: var(--space-3);
          margin-left: -var(--space-3);
        }
        .toc__item--active .toc__link {
          color: var(--color-accent);
          border-left-color: var(--color-accent);
          font-weight: var(--font-weight-medium);
        }
        .toc__link:hover {
          color: var(--color-accent);
          opacity: 1;
        }
      `}</style>
    </nav>
  );
}
