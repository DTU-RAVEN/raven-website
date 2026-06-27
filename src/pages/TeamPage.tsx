
import Navbar from '@/components/Navbar';
import Team from '@/components/Team';
import Footer from '@/components/Footer';
import MetaTags from '@/components/MetaTags';
import ScrollToTop from '@/components/ScrollToTop';

const TeamPage = () => {
  return (
    <div className="bg-raven-black text-raven-white">
      <MetaTags
        title="Team - RAVEN DTU"
        description="Meet the RAVEN team — DTU students passionate about autonomous systems and unmanned vehicles."
      />
      <ScrollToTop />
      <Navbar />
      <main className="pt-16">
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;
