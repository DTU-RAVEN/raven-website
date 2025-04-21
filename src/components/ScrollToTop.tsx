
import { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 64, // Adjust for header height
            behavior: 'smooth'
          });
        }
      });
    });

    // Button to scroll back to top
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    const createScrollTopButton = () => {
      const button = document.createElement('button');
      button.innerHTML = '↑';
      button.className = 'fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-raven-white text-xl text-raven-black shadow-lg transition-opacity duration-300 hover:opacity-90';
      button.style.opacity = '0';
      button.style.display = 'none';
      button.setAttribute('aria-label', 'Scroll to top');
      button.addEventListener('click', scrollToTop);
      document.body.appendChild(button);
      return button;
    };

    const scrollTopButton = createScrollTopButton();

    const toggleScrollButton = () => {
      if (window.scrollY > 500) {
        scrollTopButton.style.display = 'block';
        setTimeout(() => {
          scrollTopButton.style.opacity = '1';
        }, 10);
      } else {
        scrollTopButton.style.opacity = '0';
        setTimeout(() => {
          scrollTopButton.style.display = 'none';
        }, 300);
      }
    };

    window.addEventListener('scroll', toggleScrollButton);

    return () => {
      window.removeEventListener('scroll', toggleScrollButton);
      document.body.removeChild(scrollTopButton);
    };
  }, []);

  return null;
};

export default ScrollToTop;
