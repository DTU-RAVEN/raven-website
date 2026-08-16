import { useEffect, useRef } from 'react';

const Project = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const play = () => {
      const attempt = video.play();
      if (attempt && typeof attempt.catch === 'function') {
        attempt.catch(() => {
          video.addEventListener('canplay', () => video.play().catch(() => {}), { once: true });
        });
      }
    };

    play();
  }, []);

  return (
    <section id="competitions" className="index-section">
      <div className="wrap">
        <div className="sec-head">
          <hr className="rule" />
          <p className="eyebrow mono roles-count">
            Competitions <span className="slash">/</span> History
          </p>
          <h1>Competition results</h1>
        </div>

        <div className="comp-layout">
          <div className="comp-content">
            <div className="comp-block">
              <p className="comp-result">1st place · C-UASC 2026</p>
              <h3 style={{ fontFamily: 'var(--disp)', fontSize: '1.6rem', fontWeight: 400, margin: '0 0 16px' }}>
                C-UASC 2026
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.6 }}>
                DTU RAVEN finished 1st overall at the 2026 California Unmanned Aerial Systems Competition (C-UASC),
                competing against 26 university teams from across the world. The competition was held at
                California State University, Los Angeles, with 9 RAVEN members making the trip.
              </p>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
                We completed all planned missions across the three competition days. We also placed best of all
                teams in waypoint navigation accuracy and set the course speed record at{' '}
                <strong style={{ color: 'var(--text)' }}>140 km/h</strong>.
              </p>

              <h4 style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 12px' }}>
                Missions completed
              </h4>
              <ul className="comp-missions">
                <li>Precision waypoint navigation - best accuracy of all teams</li>
                <li>Circuit time trial - set the course speed record at 140 km/h</li>
                <li>Autonomous payload drop and delivery</li>
                <li>Autonomous target localization</li>
              </ul>

              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                The aircraft integrates a Cube Orange autopilot, Jetson Orin Nano flight computer,
                gimbal-mounted camera, and custom PCBs, all designed and built by our members.
                Thank you to our sponsors Tuborgfondet and dane-rc.dk, and to DTU Skylab for hosting our workshop.
              </p>
            </div>

            <div className="comp-block">
              <p className="comp-result">Debut · SUAS 2025</p>
              <h3 style={{ fontFamily: 'var(--disp)', fontSize: '1.6rem', fontWeight: 400, margin: '0 0 16px' }}>
                SUAS 2025 - First competition entry
              </h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                In June 2025, RAVEN made its first ever competition appearance with drone <em>Munnin</em> at
                the Student Unmanned Aerial Systems (SUAS) Competition in Maryland, USA. Competing in our debut season,
                the experience laid the foundation for everything that followed at C-UASC 2026.
              </p>
            </div>
          </div>

          <div className="comp-video-panel">
            <div className="comp-video-head mono">
              <span>C-UASC 2026</span>
              <span style={{ background: 'var(--brand)', color: 'var(--text)', padding: '2px 8px' }}>140 km/h</span>
            </div>
            <video
              ref={videoRef}
              src="/general_photos_videos/YouCut_20260607_170635049.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;
