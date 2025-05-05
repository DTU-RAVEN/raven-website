
import { Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer id="contact" className="bg-raven-black py-12 text-raven-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center md:items-start">
            <img 
              src="/lovable-uploads/2643b5c2-26fd-491e-9b14-102c0d03ab74.png" 
              alt="RAVEN Logo" 
              className="h-10 w-auto mb-4"
            />
            <p className="text-center md:text-left">
              Robotics, Autonomous Vehicle Engineering & Navigation
            </p>
            <p className="mt-2 text-sm text-raven-white/60">
              Student organization at DTU
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="mb-4 text-xl font-bold">Contact Us</h3>
            <a 
              href="mailto:contact@dturaven.com" 
              className="mb-2 transition-opacity hover:opacity-80"
            >
              contact@dturaven.com
            </a>
            <div className="mt-4 flex space-x-4">
              <a href="https://www.instagram.com/ravenxdtu/" className="transition-opacity hover:opacity-80" aria-label="Instagram">
                <Instagram size={24} />
              </a>
              <a href="https://www.linkedin.com/company/dtu-raven/" className="transition-opacity hover:opacity-80" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <h3 className="mb-4 text-xl font-bold">Quick Links</h3>
            <div className="flex flex-col items-center md:items-end space-y-2">
              <a href="#home" className="transition-opacity hover:opacity-80">Home</a>
              <a href="#about" className="transition-opacity hover:opacity-80">About</a>
              <a href="#project" className="transition-opacity hover:opacity-80">Project</a>
              <a href="#team" className="transition-opacity hover:opacity-80">Team</a>
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
