import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isArticle = location.pathname.startsWith('/articles/') && location.pathname.length > '/articles/'.length;

  return (
    <>
      <nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isArticle && !scrolled ? 'navbar--hero' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar__inner">
          <Link to="/" className="navbar__brand" aria-label="The Sugar Detach — Home">
            <span className="navbar__brand-icon">◆</span>
            <span className="navbar__brand-text">The Sugar Detach</span>
          </Link>

          {/* Desktop nav */}
          <ul className="navbar__links" role="list">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
            <li><Link to="/articles" className={location.pathname.startsWith('/articles') ? 'active' : ''}>Articles</Link></li>
            <li><Link to="/recommended" className={location.pathname === '/recommended' ? 'active' : ''}>Recommended</Link></li>
            <li><Link to="/assessment" className={location.pathname === '/assessment' ? 'active' : ''}>Assessment</Link></li>
            <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <ul role="list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/articles">Articles</Link></li>
          <li><Link to="/recommended">Recommended</Link></li>
          <li><Link to="/assessment">Assessment</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: var(--z-nav);
          height: var(--nav-height);
          transition: background var(--transition-base), box-shadow var(--transition-base);
          background: transparent;
        }
        .navbar--scrolled {
          background: rgba(253, 250, 244, 0.97);
          backdrop-filter: blur(12px);
          box-shadow: var(--shadow-sm);
        }
        .navbar--hero {
          background: transparent;
        }
        .navbar__inner {
          max-width: var(--site-max-width);
          margin: 0 auto;
          padding: 0 var(--space-6);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .navbar__brand {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          text-decoration: none;
          font-family: var(--font-masthead);
          font-weight: var(--font-weight-bold);
          font-size: 1.1rem;
          color: var(--color-text);
          letter-spacing: -0.01em;
          transition: color var(--transition-fast);
        }
        .navbar--hero .navbar__brand,
        .navbar--hero .navbar__links a {
          color: var(--color-white);
          text-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }
        .navbar__brand-icon {
          color: var(--color-accent);
          font-size: 0.8em;
        }
        .navbar--hero .navbar__brand-icon {
          color: rgba(255,255,255,0.8);
        }
        .navbar__links {
          display: flex;
          align-items: center;
          gap: var(--space-8);
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .navbar__links a {
          font-family: var(--font-ui);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
          color: var(--color-text);
          text-decoration: none;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          transition: color var(--transition-fast);
          position: relative;
        }
        .navbar__links a::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--color-accent);
          transform: scaleX(0);
          transition: transform var(--transition-fast);
        }
        .navbar__links a:hover::after,
        .navbar__links a.active::after {
          transform: scaleX(1);
        }
        .navbar__links a:hover,
        .navbar__links a.active {
          color: var(--color-accent);
          opacity: 1;
        }
        .navbar--hero .navbar__links a:hover,
        .navbar--hero .navbar__links a.active {
          color: rgba(255,255,255,0.85);
        }
        .navbar--hero .navbar__links a::after {
          background: rgba(255,255,255,0.7);
        }
        .navbar__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--space-2);
        }
        .navbar__hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--color-text);
          border-radius: 2px;
          transition: transform var(--transition-base), opacity var(--transition-base);
        }
        .navbar--hero .navbar__hamburger span {
          background: var(--color-white);
        }
        .navbar__hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .navbar__hamburger.open span:nth-child(2) { opacity: 0; }
        .navbar__hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        .mobile-menu {
          position: fixed;
          top: var(--nav-height);
          left: 0;
          right: 0;
          background: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
          z-index: calc(var(--z-nav) - 1);
          transform: translateY(-100%);
          opacity: 0;
          transition: transform var(--transition-base), opacity var(--transition-base);
          pointer-events: none;
        }
        .mobile-menu--open {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        .mobile-menu ul {
          list-style: none;
          padding: var(--space-4) var(--space-6);
          margin: 0;
        }
        .mobile-menu li {
          margin: 0;
          border-bottom: 1px solid var(--color-border);
        }
        .mobile-menu li:last-child { border-bottom: none; }
        .mobile-menu a {
          display: block;
          padding: var(--space-4) 0;
          font-family: var(--font-ui);
          font-size: var(--text-base);
          font-weight: var(--font-weight-medium);
          color: var(--color-text);
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (max-width: 768px) {
          .navbar__links { display: none; }
          .navbar__hamburger { display: flex; }
        }
      `}</style>
    </>
  );
}
