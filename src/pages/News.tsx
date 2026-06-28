
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsArticleList from '@/components/NewsArticleList';
import MetaTags from '@/components/MetaTags';
import AccessibilityFeatures from '@/components/AccessibilityFeatures';
import ScrollToTop from '@/components/ScrollToTop';

const News = () => {
  return (
    <div>
      <MetaTags
        title="News - RAVEN DTU"
        description="Latest updates and news from RAVEN - Robotics, Autonomous Vehicle Engineering & Navigation"
      />
      <AccessibilityFeatures />
      <ScrollToTop />
      <Navbar />

      <main className="index-section">
        <div className="wrap">
          <div className="sec-head">
            <hr className="rule" />
            <p className="eyebrow mono roles-count">News <span className="slash">/</span> Latest</p>
            <h2>Updates from RAVEN</h2>
          </div>
          <NewsArticleList />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;
