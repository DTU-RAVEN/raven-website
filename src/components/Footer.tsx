
import { Instagram, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="contact" className="bg-raven-black py-12 text-raven-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center md:items-start">
            <img
              src="/logo-raven-white.png"
              alt="RAVEN Logo"
              className="h-10 w-auto mb-4"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/favicon.ico'; }}
            />
            <p className="text-center md:text-left">
              Robotics, Autonomous Vehicle Engineering & Navigation
            </p>
            <p className="mt-2 text-sm text-raven-white/60">
              Student organization at DTU
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/ravenxdtu/" className="transition-opacity hover:opacity-80" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="https://www.linkedin.com/company/dtu-raven/" className="transition-opacity hover:opacity-80" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
              <a href="mailto:contact@dturaven.com" className="transition-opacity hover:opacity-80" aria-label="Email">
                <Mail size={24} />
              </a>
            </div>
            <a href="mailto:contact@dturaven.com" className="mt-3 text-sm text-raven-white/60 hover:text-raven-white transition-colors">
              contact@dturaven.com
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h3 className="mb-4 text-xl font-bold">Quick Links</h3>
            <div className="flex flex-col items-center md:items-end space-y-2">
              <Link to="/" className="transition-opacity hover:opacity-80">Home</Link>
              <Link to="/about" className="transition-opacity hover:opacity-80">About</Link>
              <Link to="/competitions" className="transition-opacity hover:opacity-80">Competitions</Link>
              <Link to="/team" className="transition-opacity hover:opacity-80">Team</Link>
              <Link to="/news" className="transition-opacity hover:opacity-80">News</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-raven-white/20 pt-8 text-center">
          <p className="text-sm text-raven-white/60">
            &copy; 2025 RAVEN DTU. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
