import { useMemo } from 'react';
import { AuthorBioCard } from './AuthorBioCard';

interface ArticleBodyProps {
  content: string;
}

function parseMarkdown(md: string): string {
  let html = md;

  // Strip [AUTHOR_BIO_CARD] marker (handled separately)
  html = html.replace(/\[AUTHOR_BIO_CARD\]/g, '<div class="author-bio-card-placeholder"></div>');

  // Headers with IDs
  html = html.replace(/^#{1}\s+(.+)$/gm, (_, t) => {
    const id = t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return `<h1 id="${id}">${t}</h1>`;
  });
  html = html.replace(/^#{2}\s+(.+)$/gm, (_, t) => {
    const id = t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return `<h2 id="${id}">${t}</h2>`;
  });
  html = html.replace(/^#{3}\s+(.+)$/gm, (_, t) => {
    const id = t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return `<h3 id="${id}">${t}</h3>`;
  });
  html = html.replace(/^#{4}\s+(.+)$/gm, (_, t) => `<h4>${t}</h4>`);

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
    const isExternal = url.startsWith('http');
    const rel = isExternal ? ' rel="nofollow noopener noreferrer"' : '';
    const target = isExternal ? ' target="_blank"' : '';
    return `<a href="${url}"${target}${rel}>${text}</a>`;
  });

  // Blockquotes
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>');

  // Unordered lists
  html = html.replace(/^[\-\*]\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  // Ordered lists
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');

  // Horizontal rules
  html = html.replace(/^---+$/gm, '<hr />');

  // Paragraphs (lines not starting with HTML tags)
  const lines = html.split('\n');
  const result: string[] = [];
  let inParagraph = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inParagraph) {
        result.push('</p>');
        inParagraph = false;
      }
      continue;
    }
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol') ||
        trimmed.startsWith('<li') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<hr') ||
        trimmed.startsWith('<div') || trimmed.startsWith('</')) {
      if (inParagraph) {
        result.push('</p>');
        inParagraph = false;
      }
      result.push(trimmed);
    } else {
      if (!inParagraph) {
        result.push('<p>');
        inParagraph = true;
      }
      result.push(trimmed);
    }
  }
  if (inParagraph) result.push('</p>');

  return result.join('\n');
}

export function ArticleBody({ content }: ArticleBodyProps) {
  const parts = useMemo(() => {
    const marker = '[AUTHOR_BIO_CARD]';
    const idx = content.indexOf(marker);
    if (idx === -1) {
      return { before: content, after: null };
    }
    return {
      before: content.slice(0, idx),
      after: content.slice(idx + marker.length),
    };
  }, [content]);

  const beforeHtml = useMemo(() => parseMarkdown(parts.before), [parts.before]);
  const afterHtml = useMemo(() => parts.after ? parseMarkdown(parts.after) : null, [parts.after]);

  return (
    <div className="article-body">
      <div
        className="article-body__content"
        dangerouslySetInnerHTML={{ __html: beforeHtml }}
      />
      <AuthorBioCard />
      {afterHtml && (
        <div
          className="article-body__content"
          dangerouslySetInnerHTML={{ __html: afterHtml }}
        />
      )}

      <style>{`
        .article-body {
          font-family: var(--font-body);
          font-size: var(--text-base);
          line-height: var(--line-height-body);
          color: var(--color-text);
        }
        .article-body__content h1 {
          font-size: var(--text-3xl);
          margin: var(--space-10) 0 var(--space-6);
          font-weight: var(--font-weight-bold);
        }
        .article-body__content h2 {
          font-size: var(--text-2xl);
          margin: var(--space-10) 0 var(--space-5);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          padding-top: var(--space-4);
          border-top: 1px solid var(--color-border);
        }
        .article-body__content h3 {
          font-size: var(--text-xl);
          margin: var(--space-8) 0 var(--space-4);
          font-weight: var(--font-weight-semibold);
          color: var(--color-accent);
        }
        .article-body__content h4 {
          font-size: var(--text-lg);
          margin: var(--space-6) 0 var(--space-3);
          font-weight: var(--font-weight-semibold);
        }
        .article-body__content p {
          margin-bottom: var(--space-5);
        }
        .article-body__content ul,
        .article-body__content ol {
          margin-bottom: var(--space-5);
          padding-left: var(--space-6);
        }
        .article-body__content li {
          margin-bottom: var(--space-2);
          line-height: 1.7;
        }
        .article-body__content blockquote {
          border-left: 3px solid var(--color-accent);
          padding: var(--space-4) var(--space-6);
          margin: var(--space-8) 0;
          background: var(--color-bio-card);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          font-style: italic;
          font-size: var(--text-lg);
          color: var(--color-text);
        }
        .article-body__content hr {
          border: none;
          border-top: 1px solid var(--color-border);
          margin: var(--space-10) 0;
        }
        .article-body__content a {
          color: var(--color-accent);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .article-body__content strong {
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
        }
        .article-body__content em {
          font-style: italic;
        }
        /* Sanskrit mantra at end */
        .article-body__content p:last-of-type em {
          display: block;
          text-align: center;
          font-size: var(--text-lg);
          color: var(--color-accent);
          margin-top: var(--space-8);
          padding: var(--space-6);
          border-top: 1px solid var(--color-border);
          border-bottom: 1px solid var(--color-border);
        }
      `}</style>
    </div>
  );
}
