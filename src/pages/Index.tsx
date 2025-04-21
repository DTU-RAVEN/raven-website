import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import KeyFeatures from '@/components/KeyFeatures';
import Project from '@/components/Project';
import Timeline from '@/components/Timeline';
import Funding from '@/components/Funding';
import Team from '@/components/Team';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import AccessibilityFeatures from '@/components/AccessibilityFeatures';
import MetaTags from '@/components/MetaTags';

const Index = () => {
  useEffect(() => {
    // Update document title when component mounts
    document.title = 'RAVEN - Robotics, Autonomous Vehicle Engineering & Navigation';
    
    // Add page transitions
    const fadeInElements = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          // Unobserve once animation is applied
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    fadeInElements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-raven-black text-raven-white">
      <MetaTags />
      <AccessibilityFeatures />
      <ScrollToTop />
      <Navbar />
      <Hero />
      <About />
      <KeyFeatures />
      <Project />
      <Timeline />
      <Funding />
      <Team />
      <Footer />
    </div>
  );
};

export default Index;
