import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MetaTags from '@/components/MetaTags';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div>
      <MetaTags title="Page not found - RAVEN DTU" />
      <Navbar />
      <main className="notfound page-top">
        <div className="wrap">
          <p className="notfound-code grad-text" aria-hidden="true">404</p>
          <h1>This page flew off course.</h1>
          <p className="lede">The page you are looking for does not exist or has moved.</p>
          <Link to="/" className="apply">Return to home</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
