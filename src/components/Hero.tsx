import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="home-hero">
      <div className="wrap home-hero-grid">
        <div className="home-hero-copy">
          <p className="eyebrow mono">
            DTU Raven <span className="slash">/</span> Autonomous systems
          </p>
          <h1>
            We build machines that fly, drive, and sail <em>themselves</em>.
          </h1>
          <p className="lede">
            A DTU student team building autonomous vehicles end to end, competing at the highest level.
          </p>
          <div className="hero-actions">
            <Link to="/join" className="apply">Join us</Link>
            <Link to="/competitions" className="btn-secondary">View competitions</Link>
          </div>
        </div>

        <div className="hero-video-panel">
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />
          <div className="hero-video-head mono">
            <span>Autonomous flight</span>
            <span className="hero-live">
              <span className="hero-live-dot" />
              In flight
            </span>
          </div>
          <video
            src="/general_photos_videos/drone_flying1.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
