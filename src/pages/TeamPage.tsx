
import Navbar from '@/components/Navbar';
import Team from '@/components/Team';
import Footer from '@/components/Footer';
import MetaTags from '@/components/MetaTags';
import ScrollToTop from '@/components/ScrollToTop';

const TeamPage = () => {
  return (
    <div>
      <MetaTags
        title="Team - RAVEN DTU"
        description="Meet the RAVEN team, DTU's autonomy and aerospace team building unmanned aircraft and autonomous systems."
      />
      <ScrollToTop />
      <Navbar />
      <main>
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;
