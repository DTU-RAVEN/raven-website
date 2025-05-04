
import React from 'react';

const Hero = () => {
  const scrollToTeam = () => {
    const teamSection = document.getElementById('team');
    if (teamSection) {
      teamSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center bg-raven-black">
      <div className="absolute inset-0 bg-gradient-to-b from-raven-black/50 to-raven-black/70 z-10"></div>
      
      {/* Video background using iframe embed */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-full h-full">
          <iframe 
            src="https://streamable.com/e/eah18m?autoplay=1&muted=1&loop=1" 
            allow="autoplay" 
            allowFullScreen
            className="w-full h-full object-cover opacity-40"
            style={{ 
              border: 'none', 
              position: 'absolute', 
              top: 0, 
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          ></iframe>
        </div>
      </div>
      
      <div className="container z-20 px-4 text-center flex flex-col items-center">
        <img 
          src="/lovable-uploads/d1a0b707-5936-4f6e-b959-cd3493e04cf8.png" 
          alt="RAVEN Logo" 
          className="h-32 w-32 mb-6 animate-fade-in"
        />
        <h1 className="mb-4 animate-fade-in text-6xl font-bold tracking-tighter md:text-7xl lg:text-8xl">
          RAVEN
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed md:text-2xl">
          Advancing unmanned systems through hands-on student projects.
        </p>
        <button
          onClick={scrollToTeam}
          className="btn-primary animate-fade-in"
          aria-label="Join Us - Scroll to Team section"
        >
          Join Us
        </button>
      </div>
    </section>
  );
};

export default Hero;
