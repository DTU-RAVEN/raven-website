
import React from 'react';
import { ExternalLink } from 'lucide-react';

const News = () => {
  return (
    <div className="min-h-screen bg-raven-black text-raven-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">RAVEN News</h1>
        
        <div className="max-w-2xl mx-auto bg-raven-gray/20 rounded-lg p-6 shadow-md">
          <p className="mb-4">
            Stay up to date with the latest news and updates from RAVEN - Robotics, Autonomous Vehicle Engineering & Navigation.
          </p>
          
          <div className="flex flex-col space-y-4">
            <a 
              href="https://www.linkedin.com/company/dtu-raven/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-raven-gray/10 p-4 rounded-md hover:bg-raven-gray/20 transition-colors"
            >
              <span>Follow our LinkedIn Page</span>
              <ExternalLink className="ml-2" size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
