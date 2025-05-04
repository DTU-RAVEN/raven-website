
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
      <div className="absolute inset-0 bg-gradient-to-b from-raven-black/80 to-raven-black/90 z-10"></div>
      
      {/* Video background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="https://streamable.com/eah18m" type="video/mp4" />
          {/* Fallback image if video fails to load */}
          Your browser does not support the video tag.
        </video>
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
