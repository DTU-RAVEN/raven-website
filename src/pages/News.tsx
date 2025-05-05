
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsArticleList from '@/components/NewsArticleList';
import ScrollToTop from '@/components/ScrollToTop';
import MetaTags from '@/components/MetaTags';

const News = () => {
  useEffect(() => {
    document.title = 'News - RAVEN';
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-raven-black text-raven-white min-h-screen flex flex-col">
      <MetaTags 
        title="News - RAVEN DTU"
        description="Latest news and updates from RAVEN DTU - Robotics, Autonomous Vehicle Engineering & Navigation"
      />
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Latest News</h1>
          <NewsArticleList />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default News;
