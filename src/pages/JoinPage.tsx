
import Navbar from '@/components/Navbar';
import SectionDivider from '@/components/SectionDivider';
import Footer from '@/components/Footer';
import MetaTags from '@/components/MetaTags';
import ScrollToTop from '@/components/ScrollToTop';

// Add positions here when applications open
const openPositions: { title: string; team: string; description: string }[] = [
  // { title: 'Autopilot Engineer', team: 'Avionics', description: '...' },
];

const JoinPage = () => {
  return (
    <div className="bg-raven-black text-raven-white">
      <MetaTags
        title="Join Us - RAVEN DTU"
        description="Join RAVEN — a student organisation at DTU building autonomous aerial systems."
      />
      <ScrollToTop />
      <Navbar />
      <main className="pt-16">

        {/* Intro */}
        <section className="section bg-raven-black text-raven-white">
          <div className="section-container">
            <h1 className="section-title">Join RAVEN</h1>
            <div className="mx-auto max-w-3xl">
              <p className="mb-6 text-lg leading-relaxed text-raven-white/80">
                RAVEN is built by DTU students who want to do more than study — we design,
                build, and fly autonomous aircraft that compete internationally.
              </p>
              <p className="text-lg leading-relaxed text-raven-white/80">
                We welcome members from all disciplines: aerospace, electronics, software,
                mechanical design, and project management. No prior experience required —
                just a drive to learn and build.
              </p>
            </div>
          </div>
        </section>

        {/* How to apply */}
        <SectionDivider />
        <section className="section bg-raven-white text-raven-black">
          <div className="section-container">
            <h2 className="section-title">How to Apply</h2>
            <div className="mx-auto max-w-3xl">
              <div className="mb-10 rounded-r-md border-l-4 border-raven-black bg-raven-black/5 p-6">
                <h3 className="mb-2 text-xl font-bold">Application Period — September</h3>
                <p className="text-lg leading-relaxed">
                  Applications open at the start of the fall semester each year.
                  The next intake is in <strong>September</strong>. Keep an eye on our
                  social media for announcements closer to the date.
                </p>
              </div>
              <p className="mb-6 text-lg">
                Want to get in touch before then? Write to us directly:
              </p>
              <a
                href="mailto:contact@dturaven.com"
                className="inline-block px-6 py-3 bg-raven-black text-raven-white font-bold transition-all hover:opacity-80"
              >
                contact@dturaven.com
              </a>
            </div>
          </div>
        </section>
        <SectionDivider inverted={true} />

        {/* Open positions */}
        <section className="section bg-raven-black text-raven-white">
          <div className="section-container">
            <h2 className="section-title">Open Positions</h2>
            <div className="mx-auto max-w-4xl">
              {openPositions.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {openPositions.map((pos, i) => (
                    <div key={i} className="rounded-md border border-raven-white/20 p-6">
                      <p className="mb-1 text-sm text-raven-white/50">{pos.team}</p>
                      <h3 className="mb-3 text-xl font-bold">{pos.title}</h3>
                      <p className="text-raven-white/70">{pos.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-md border border-raven-white/10 p-10 text-center">
                  <p className="mb-2 text-xl font-medium">No open positions right now</p>
                  <p className="text-raven-white/60">
                    Positions will be posted here when the September application period opens.
                    In the meantime, feel free to reach out at{' '}
                    <a href="mailto:contact@dturaven.com" className="underline hover:text-raven-white transition-colors">
                      contact@dturaven.com
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default JoinPage;
