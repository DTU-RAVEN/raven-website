import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MetaTags from '@/components/MetaTags';
import ScrollToTop from '@/components/ScrollToTop';

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
                <strong>airframe, electronics, and the entire software stack.</strong> You join one of our
                sub-teams and take ownership of a subsystem. Every new member works alongside someone who has
                already been through a full build cycle, and the expectation in your first month is that you learn
                the stack, not that you are an expert.
              </p>
              <p className="big" style={{ marginTop: '24px' }}>
                We are now building a VTOL fixed-wing for the IMechE UAS Challenge and an autonomous swarm for IARC
                Mission 10, where the aircraft have to map a safe path through a minefield.
              </p>
            </div>
            <div className="principles">
              <div>
                <h3>~5 ECTS of time</h3>
                <p>Expect roughly the workload of a 5-ECTS course.</p>
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

