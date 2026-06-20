import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Competitions', href: '/#competitions' },
  { name: 'Team', href: '/#team' },
  { name: 'News', href: '/news' },
  // Contact removed per request
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrolledDown = currentScrollPos > prevScrollPos;
      const isOverHero = currentScrollPos > window.innerHeight;

      setVisible(!isScrolledDown || !isOverHero || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);

      if (currentScrollPos > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleNavigation = (href: string) => {
    if (href.startsWith('/#')) {
      // If we're not on the home page, navigate to home page first
      if (window.location.pathname !== '/') {
        window.location.href = href;
      } else {
        // If we're on the home page, scroll to the section
        const targetId = href.substring(2);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 64,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled || mobileMenuOpen ? 'bg-raven-black bg-opacity-90 backdrop-blur-sm shadow-md' : 'bg-transparent'
      } transform ${visible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img 
              src="/logo-raven-white.png" 
              alt="RAVEN Logo" 
              className="h-10 w-auto"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/favicon.ico'; }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/#') ? (
                    <a 
                      href={link.href} 
                      className="nav-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigation(link.href);
                      }}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.href} className="nav-link">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="flex items-center rounded-md p-2 text-raven-white hover:bg-raven-gray/20 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden absolute w-full transition-all duration-300 ease-in-out overflow-hidden ${
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-raven-white py-2 shadow-lg">
          {navLinks.map((link) => (
            link.href.startsWith('/#') ? (
              <a
                key={link.name}
                href={link.href}
                className="nav-link-mobile"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.href);
                  handleLinkClick();
                }}
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="nav-link-mobile"
                onClick={handleLinkClick}
              >
                {link.name}
              </Link>
            )
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
