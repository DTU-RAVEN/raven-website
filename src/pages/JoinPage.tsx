import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MetaTags from '@/components/MetaTags';
import ScrollToTop from '@/components/ScrollToTop';

const contactEmail = 'contact@dturaven.com';

const JoinPage = () => {
  return (
    <div className="join-page">
      <MetaTags
        title="Join us - DTU Raven"
        description="DTU Raven is not currently recruiting. Follow us on Instagram to see what we are building and to be the first to know when new spots open up."
      />
      <ScrollToTop />
      <Navbar />

      <main>
        <section className="join-hero">
          <div className="wrap">
            <div className="join-hero-headline">
              <div className="join-hero-copy">
                <h1>
                  Interested in RAVEN?
                </h1>
                <p className="lede">
                  <strong>We are not currently recruiting.</strong> Follow us on Instagram to see what we are
                  building and to be the first to know when new spots open up.
                </p>
                <div className="hero-actions join-hero-actions">
                  <a
                    className="btn-primary"
                    href="https://www.instagram.com/dtu_raven/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Follow us on Instagram
                  </a>
                </div>
              </div>
              <img
                className="join-hero-image"
                src="/join-hero.svg"
                alt="Illustration for joining DTU Raven"
              />
            </div>
          </div>
        </section>

        <section className="work">
          <div className="wrap work-grid">
            <div>
              <p className="big">
                DTU Raven is student-run and we strive to build everything end to end: {' '}
                <strong>airframe, electronics, and the entire software stack.</strong> Each member takes
                ownership of a subsystem and works alongside people who have already been through a full
                build cycle.
              </p>
              <p className="big" style={{ marginTop: '24px' }}>
                We are now building a VTOL fixed-wing for the IMechE UAS Challenge and an autonomous swarm for IARC
                Mission 10, where the aircraft have to map a safe path through a minefield.
              </p>
              <p className="big" style={{ marginTop: '24px' }}>
                Curious about what we do or want to say hello? Email us at{' '}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
              </p>
            </div>
            <div className="principles">
              <div>
                <h3>~5 ECTS of time</h3>
                <p>The team runs at roughly the workload of a 5-ECTS course.</p>
              </div>
              <div>
                <h3>Monday evenings</h3>
                <p>We meet Monday evenings, plus a workday most Saturdays.</p>
              </div>
              <div>
                <h3>Based in Skylab</h3>
                <p>Our workshop is in Skylab, where the team builds and meets.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default JoinPage;
