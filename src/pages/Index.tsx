
import { Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SectionDivider from '@/components/SectionDivider';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import AccessibilityFeatures from '@/components/AccessibilityFeatures';
import MetaTags from '@/components/MetaTags';
import sponsors from '@/data/sponsors.json';

const Index = () => {
  return (
    <div className="bg-raven-black text-raven-white">
      <MetaTags />
      <AccessibilityFeatures />
      <ScrollToTop />
      <Navbar />
      <Hero />

      {/* About Summary */}
      <SectionDivider />
      <section className="section bg-raven-white text-raven-black">
        <div className="section-container">
          <h2 className="section-title">About RAVEN</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center">
              <p className="mb-8 text-lg leading-relaxed">
                RAVEN is a student organization at DTU dedicated to filling industry needs in unmanned systems.
                We bridge students and companies, developing sustainable, cutting-edge autonomous technology.
              </p>
              <Link
                to="/join"
                className="inline-block w-fit px-6 py-3 bg-raven-black text-raven-white font-bold transition-all hover:opacity-80"
              >
                Get Involved
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-full overflow-hidden rounded-md shadow-lg">
                <img
                  src="/Pictures/20250426_181020.jpg"
                  alt="Robotics team working on project"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionDivider inverted={true} />

      {/* Competitions Highlight */}
      <section className="section bg-raven-black text-raven-white">
        <div className="section-container">
          <h2 className="section-title text-center">Competitions</h2>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-3xl font-bold mb-6">1st Place — C-UASC 2026</p>
            <p className="mb-8 text-lg leading-relaxed text-raven-white/80">
              DTU RAVEN took 1st place overall at the California Unmanned Aerial Systems Competition,
              competing against 26 university teams from across the world and setting the course speed record at{' '}
              <span className="font-bold text-raven-white">140 km/h</span>.
            </p>
            <Link to="/competitions" className="btn-primary inline-block">
              View All Competitions
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <SectionDivider />
      <section className="section bg-raven-white text-raven-black">
        <div className="section-container">
          <h2 className="section-title">Our Partners</h2>
          <div className="mx-auto max-w-4xl">
            <p className="mb-8 text-lg">
              We are grateful for the support of our partners who make our projects possible.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {sponsors.map((partner, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="mb-4 h-24 w-24 overflow-hidden grayscale transition-transform hover:scale-105 hover:grayscale-0 duration-300">
                    <img src={partner.logo} alt={`${partner.name} logo`} className="h-full w-full object-contain" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{partner.name}</h3>
                  <p className="text-sm text-gray-600">{partner.contribution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SectionDivider inverted={true} />

      {/* Team CTA */}
      <section className="section bg-raven-black text-raven-white">
        <div className="section-container text-center">
          <h2 className="section-title">Our Team</h2>
          <p className="mb-8 mx-auto max-w-2xl text-lg text-raven-white/80">
            RAVEN is made up of DTU students from diverse disciplines, united by a passion for autonomous systems.
            Whether you're into engineering, programming, or project management, there's a place for you.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/team" className="btn-primary inline-block">
              Meet the Team
            </Link>
            <Link to="/join" className="btn-secondary inline-block">
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <Analytics />
    </div>
  );
};

export default Index;
