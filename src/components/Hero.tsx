import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React does not reliably reflect the `muted` prop onto the DOM element,
    // and browsers only allow autoplay for genuinely muted videos. Force it
    // here and kick off playback explicitly.
    video.muted = true;
    video.defaultMuted = true;

    const play = () => {
      const attempt = video.play();
      if (attempt && typeof attempt.catch === 'function') {
        attempt.catch(() => {
          // Autoplay was blocked; retry once the video has enough data.
          video.addEventListener('canplay', () => video.play().catch(() => {}), { once: true });
        });
      }
    };

    play();
  }, []);

  return (
    <section id="home" className="home-hero home-hero--video">
      <video
        ref={videoRef}
        className="hero-bg-video"
        src="/general_photos_videos/drone_flying1.mp4"
        poster="/general_photos_videos/drone_flying1_poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      <div className="hero-bg-scrim" />
      <div className="wrap home-hero-inner">
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
    </section>
  );
};

export default Hero;
