
import { useEffect } from 'react';

// This component enhances accessibility but does not render anything
const AccessibilityFeatures = () => {
  useEffect(() => {
    // Improve keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip to main content with "s" key
      if (e.key === 's' && e.altKey) {
        e.preventDefault();
        const mainContent = document.querySelector<HTMLElement>('main') || document.querySelector<HTMLElement>('section');
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
      // Add a skip link once; the SPA never reloads the document, so a
      // guard here is what stops one link piling up per client-side navigation.
      if (!document.getElementById('skip-to-main-link')) {
        const target = document.querySelector('main') || document.querySelector('section');
        if (target) {
          if (!target.id) target.id = 'main-content';
          const skipLink = document.createElement('a');
          skipLink.id = 'skip-to-main-link';
          skipLink.href = `#${target.id}`;
          skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:z-50 focus:px-4 focus:py-2 focus:bg-raven-white focus:text-raven-black';
          skipLink.textContent = 'Skip to main content';
          document.body.insertBefore(skipLink, document.body.firstChild);
        }
      }

      // Images missing alt text are treated as decorative and hidden from
      // screen readers, rather than announced with a placeholder label.
      document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('alt')) {
          img.alt = '';
          img.setAttribute('role', 'presentation');
        }
      });

      // Only label a section from a heading that actually exists inside it,
      // so aria-labelledby never points at a missing id.
      document.querySelectorAll('section[id]').forEach(section => {
        section.setAttribute('role', 'region');
        const heading = section.querySelector('h1, h2, h3');
        if (heading) {
          if (!heading.id) heading.id = `${section.id}-heading`;
          section.setAttribute('aria-labelledby', heading.id);
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
