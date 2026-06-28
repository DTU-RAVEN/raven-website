import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="home-hero">
      <div className="wrap">
        <p className="eyebrow mono">
          DTU Raven <span className="slash">/</span> Autonomous systems
        </p>
        <h1>
          Advancing unmanned systems through <em>hands-on</em> student projects.
        </h1>
        <p className="lede">
          A student team at DTU building autonomous vehicles end to end and competing at the highest level.
        </p>
        <div className="hero-actions">
          <Link to="/join" className="apply">Join us</Link>
          <Link to="/competitions" className="btn-secondary">View competitions</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
