
import React from 'react';

const Hero = () => {
  const scrollToTeam = () => {
    const teamSection = document.getElementById('team');
    if (teamSection) {
      teamSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center bg-raven-black">
      <div className="absolute inset-0 bg-gradient-to-b from-raven-black/50 to-raven-black/70 z-10"></div>
      
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container z-20 px-4 text-center flex flex-col items-center mt-100">
        <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed md:text-2xl">
          Advancing unmanned systems through hands-on student projects.
        </p>
        <button onClick={scrollToTeam} className="btn-primary animate-fade-in" aria-label="Join Us - Scroll to Team section">
          Join Us
        </button>
      </div>
    </section>
  );
};

export default Hero;
