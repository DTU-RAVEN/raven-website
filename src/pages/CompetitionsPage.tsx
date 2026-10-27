
import Navbar from '@/components/Navbar';
import Project from '@/components/Project';
import Footer from '@/components/Footer';
import MetaTags from '@/components/MetaTags';
import ScrollToTop from '@/components/ScrollToTop';

const CompetitionsPage = () => {
  return (
    <div>
      <MetaTags
        title="Competitions - RAVEN DTU"
        description="Competition history of RAVEN, DTU's autonomy and aerospace team, in unmanned aerial systems competitions."
      />
      <ScrollToTop />
      <Navbar />
      <main>
        <Project />
      </main>
      <Footer />
    </div>
  );
};

export default CompetitionsPage;
