
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsArticleList from '@/components/NewsArticleList';
import MetaTags from '@/components/MetaTags';
import AccessibilityFeatures from '@/components/AccessibilityFeatures';
import ScrollToTop from '@/components/ScrollToTop';

const News = () => {
  return (
    <div className="bg-raven-black text-raven-white">
      <MetaTags 
        title="News - RAVEN DTU" 
        description="Latest updates and news from RAVEN - Robotics, Autonomous Vehicle Engineering & Navigation" 
      />
      <AccessibilityFeatures />
      <ScrollToTop />
      <Navbar />
      
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center">Latest News</h1>
          <NewsArticleList />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default News;
