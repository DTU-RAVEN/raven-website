
import Navbar from '@/components/Navbar';
import Project from '@/components/Project';
import Footer from '@/components/Footer';
import MetaTags from '@/components/MetaTags';
import ScrollToTop from '@/components/ScrollToTop';

const CompetitionsPage = () => {
  return (
    <div className="bg-raven-black text-raven-white">
      <MetaTags
        title="Competitions - RAVEN DTU"
        description="RAVEN's competition history and achievements in unmanned aerial systems competitions."
      />
      <ScrollToTop />
      <Navbar />
      <main className="pt-16">
        <Project />
      </main>
      <Footer />
    </div>
  );
};

export default CompetitionsPage;
