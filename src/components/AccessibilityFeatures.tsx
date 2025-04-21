
import { useEffect } from 'react';

// This component enhances accessibility but doesn't render anything
const AccessibilityFeatures = () => {
  useEffect(() => {
    // Improve keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip to main content with "s" key
      if (e.key === 's' && e.altKey) {
        e.preventDefault();
        const mainContent = document.getElementById('about');
        if (mainContent) {
          mainContent.tabIndex = -1;
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      // Skip to team section with "t" key
      if (e.key === 't' && e.altKey) {
        e.preventDefault();
        const teamSection = document.getElementById('team');
        if (teamSection) {
          teamSection.tabIndex = -1;
          teamSection.focus();
          teamSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      // Skip to footer/contact with "c" key
      if (e.key === 'c' && e.altKey) {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.tabIndex = -1;
          contactSection.focus();
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    
    // Add aria-labels and roles to enhance screen reader experience
    const enhanceAccessibility = () => {
      // Add skip link
      const skipLink = document.createElement('a');
      skipLink.href = '#about';
      skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-raven-white focus:text-raven-black';
      skipLink.textContent = 'Skip to main content';
      document.body.insertBefore(skipLink, document.body.firstChild);
      
      // Ensure all images have proper alt text
      document.querySelectorAll('img').forEach(img => {
        if (!img.alt) {
          img.alt = 'Decorative image';
          img.setAttribute('role', 'presentation');
        }
      });
      
      // Add roles to sections
      document.querySelectorAll('section').forEach(section => {
        section.setAttribute('role', 'region');
        if (section.id) {
          section.setAttribute('aria-labelledby', `${section.id}-heading`);
        }
      });
    };
    
    window.addEventListener('keydown', handleKeyDown);
    enhanceAccessibility();
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return null;
};

export default AccessibilityFeatures;
