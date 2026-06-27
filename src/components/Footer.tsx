import { Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="contact" className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <img
                src="/logo-raven-white.png"
                alt="RAVEN Logo"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/favicon.ico';
                }}
              />
              <p className="footer-title">DTU RAVEN</p>
            </div>
            <p className="footer-muted">Robotics, Autonomous Vehicle Engineering & Navigation</p>
            <p className="footer-muted mono">Technical University of Denmark - Lyngby</p>
          </div>

          <div>
            <div className="footer-social">
              <a href="https://www.instagram.com/ravenxdtu/" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="https://www.linkedin.com/company/dtu-raven/" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
              <a href="mailto:contact@dturaven.com" aria-label="Email">
                <Mail size={24} />
              </a>
            </div>
            <a href="mailto:contact@dturaven.com" className="footer-mail">
              contact@dturaven.com
            </a>
          </div>

          <nav className="footer-links" aria-label="Footer">
            <Link to="/">Home</Link>
            <Link to="/join">Join Us</Link>
            <Link to="/competitions">Competitions</Link>
            <Link to="/team">Team</Link>
            <Link to="/news">News</Link>
          </nav>
        </div>

        <div className="footer-bottom mono">
          <p>2026 RAVEN DTU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
