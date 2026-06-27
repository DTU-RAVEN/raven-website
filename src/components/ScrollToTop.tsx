
import { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-raven-white text-xl text-raven-black shadow-lg transition-opacity duration-300 hover:opacity-90';
    button.style.opacity = '0';
    button.style.display = 'none';
    button.setAttribute('aria-label', 'Scroll to top');
    button.addEventListener('click', scrollToTop);
    document.body.appendChild(button);

    const toggleScrollButton = () => {
      if (window.scrollY > 500) {
        button.style.display = 'block';
        setTimeout(() => { button.style.opacity = '1'; }, 10);
      } else {
        button.style.opacity = '0';
        setTimeout(() => { button.style.display = 'none'; }, 300);
      }
    };

    window.addEventListener('scroll', toggleScrollButton);

    return () => {
      window.removeEventListener('scroll', toggleScrollButton);
      document.body.removeChild(button);
    };
  }, []);

  return null;
};

export default ScrollToTop;
