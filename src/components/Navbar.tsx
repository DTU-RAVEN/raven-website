import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Join Us', href: '/join' },
  { name: 'Competitions', href: '/competitions' },
  { name: 'Team', href: '/team' },
  { name: 'News', href: '/news' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }

    return location.pathname.startsWith(href);
  };

  return (
    <header className="raven-site-header">
      <div className="wrap raven-navbar">
        <Link to="/" className="raven-brand" onClick={handleLinkClick}>
          <span className="raven-brand-logo">
            <img
              src="/logo-raven-white.png"
              alt="RAVEN Logo"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/favicon.ico';
              }}
            />
          </span>
          <span className="raven-brand-text">
            DTU <b>RAVEN</b>
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="raven-nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  onClick={handleLinkClick}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="raven-menu-button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="raven-mobile-menu" aria-label="Mobile primary">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="nav-link-mobile"
              aria-current={isActive(link.href) ? 'page' : undefined}
              onClick={handleLinkClick}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
