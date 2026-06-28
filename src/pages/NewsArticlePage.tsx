
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsArticle from '@/components/NewsArticle';
import MetaTags from '@/components/MetaTags';
import AccessibilityFeatures from '@/components/AccessibilityFeatures';
import ScrollToTop from '@/components/ScrollToTop';

const NewsArticlePage = () => {
  return (
    <div>
      <MetaTags
        title="News Article - RAVEN DTU"
        description="News from RAVEN - Robotics, Autonomous Vehicle Engineering & Navigation"
      />
      <AccessibilityFeatures />
      <ScrollToTop />
      <Navbar />

      <main className="index-section">
        <NewsArticle />
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsArticlePage;
