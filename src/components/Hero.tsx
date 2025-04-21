
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
      
      {/* This is where we could add a background image if desired */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30"></div>
      
      <div className="container z-20 px-4 text-center">
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
