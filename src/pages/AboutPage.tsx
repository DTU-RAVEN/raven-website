
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import Funding from '@/components/Funding';
import Footer from '@/components/Footer';
import MetaTags from '@/components/MetaTags';
import ScrollToTop from '@/components/ScrollToTop';

const AboutPage = () => {
  return (
    <div className="bg-raven-black text-raven-white">
      <MetaTags
        title="About - RAVEN DTU"
        description="RAVEN is a student organization at DTU dedicated to filling industry needs in unmanned systems."
      />
      <ScrollToTop />
      <Navbar />
      <div className="h-16 bg-raven-black" />
      <About />
      <section className="py-16 bg-raven-black text-center">
        <div className="container mx-auto px-4">
          <p className="text-xl italic text-raven-white/70 max-w-2xl mx-auto">
            "Bridging DTU students and industry through sustainable, cutting-edge autonomous technology."
          </p>
        </div>
      </section>
      <Funding />
      <Footer />
    </div>
  );
};

export default AboutPage;
