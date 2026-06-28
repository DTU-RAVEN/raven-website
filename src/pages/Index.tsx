
import { Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import AccessibilityFeatures from '@/components/AccessibilityFeatures';
import MetaTags from '@/components/MetaTags';
import sponsors from '@/data/sponsors.json';

type PhotoSet = {
  wide: { src: string; alt: string };
  cells: { src: string; alt: string }[];
};

const photoSets: PhotoSet[] = [
  {
    wide: { src: '/general_photos_videos/20260607_213903113_iOS.jpg', alt: 'RAVEN team receiving 1st place award at Mojave' },
    cells: [
      { src: '/general_photos_videos/20260605_140430653_iOS.jpg', alt: 'RAVEN drone ready for flight' },
      { src: '/general_photos_videos/20260606_150819267_iOS.jpg', alt: 'Team pre-flight on the runway' },
      { src: '/general_photos_videos/ai.png', alt: 'AI object detection from drone camera' },
      { src: '/general_photos_videos/05-06-2026_table_C-UASC.jpg', alt: 'Team at C-UASC 2026 competition' },
    ],
  },
  {
    wide: { src: '/general_photos_videos/20260607_213903113_iOS.jpg', alt: 'RAVEN team receiving 1st place award at Mojave' },
    cells: [
      { src: '/Pictures/Roof_Photo.jpeg', alt: 'Team member inspecting the drone' },
      { src: '/general_photos_videos/20260607_203636436_iOS.jpg', alt: 'Walking to the flight line at Mojave' },
      { src: '/Pictures/RAVEN_Meeting.jpeg', alt: 'RAVEN team meeting' },
      { src: '/general_photos_videos/P1140759_fixed.jpg', alt: 'Pilots on the runway at Virgin Galactic' },
    ],
  },
];

const todaySet = photoSets[Math.floor(Date.now() / 86400000) % photoSets.length];

const Index = () => {
  return (
    <div>
      <MetaTags />
      <AccessibilityFeatures />
      <ScrollToTop />
      <Navbar />
      <Hero />

      {/* Competitions */}
      <section className="index-section">
        <div className="wrap">
          <div className="sec-head">
            <hr className="rule" />
            <p className="eyebrow mono roles-count">
              Competitions <span className="slash">/</span> Latest
            </p>
            <h2>1st Place - C-UASC 2026</h2>
          </div>
          <p className="big" style={{ maxWidth: '56ch' }}>
            DTU RAVEN took 1st place overall at the California Unmanned Aerial Systems Competition, competing
            against 26 university teams from across the world and setting the course speed record at{' '}
            <strong>140 km/h</strong>.
          </p>
          <Link to="/competitions" className="apply" style={{ marginTop: '28px', display: 'inline-block' }}>
            View all competitions
          </Link>
        </div>
      </section>

      {/* Photo grid */}
      <section className="photo-section">
        <div className="photo-grid">
          <div className="photo-cell photo-cell--wide">
            <img src={todaySet.wide.src} alt={todaySet.wide.alt} />
          </div>
          {todaySet.cells.map((photo) => (
            <div key={photo.src} className="photo-cell">
              <img src={photo.src} alt={photo.alt} />
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="work">
        <div className="wrap work-grid">
          <div>
            <p className="eyebrow mono">About RAVEN</p>
            <p className="big">
              RAVEN is a student organisation at DTU dedicated to filling industry needs in unmanned systems.
              We bridge students and companies,{' '}
              <strong>developing sustainable, cutting-edge autonomous technology.</strong>
            </p>
            <Link to="/join" className="apply" style={{ marginTop: '28px', display: 'inline-block' }}>
              Get involved
            </Link>
          </div>
          <div className="about-image">
            <img src="/Pictures/20250426_181020.jpg" alt="RAVEN team working on project" />
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="work">
        <div className="wrap">
          <p className="eyebrow mono" style={{ marginBottom: '28px' }}>Our Partners</p>
          <div className="partners-grid">
            {sponsors.map((partner, index) => (
              <div key={index} className="partner-item">
                <div className="partner-logo">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    style={partner.logo.includes('white') ? { filter: 'invert(1)' } : undefined}
                  />
                </div>
                <p className="partner-name">{partner.name}</p>
                <p className="partner-desc">{partner.contribution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="cta">
        <div className="wrap">
          <span className="mono">Our team</span>
          <h2>Built by students, for the future of flight.</h2>
          <p>
            RAVEN is made up of DTU students from diverse disciplines, united by a passion for autonomous systems.
          </p>
          <div className="cta-actions">
            <Link to="/team" className="apply">Meet the team</Link>
            <Link to="/join" className="btn-secondary cta-secondary">Get involved</Link>
          </div>
        </div>
      </section>

      <Footer />
      <Analytics />
    </div>
  );
};

export default Index;
