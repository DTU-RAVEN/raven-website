
import { useState } from 'react';

const features = [
  {
    title: 'Student-led Design',
    description: 'Our projects are fully conceptualized, designed, and executed by DTU students, providing hands-on experience with cutting-edge technologies.'
  },
  {
    title: 'Industry Collaboration',
    description: 'We work closely with industry partners to develop solutions that address real-world challenges in the field of unmanned systems.'
  },
  {
    title: 'Interdisciplinary Approach',
    description: 'RAVEN brings together students from various engineering disciplines to create comprehensive solutions that integrate multiple technical domains.'
  },
  {
    title: 'Competition Focus',
    description: 'We participate in international competitions like SUAS to test our systems against real-world scenarios and other top university teams.'
  }
];

const KeyFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="section bg-raven-black text-raven-white">
      <div className="section-container">
        <h2 className="section-title">Key Features</h2>
        
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          {/* Feature Tabs */}
          <div className="flex flex-col space-y-2">
            {features.map((feature, index) => (
              <button
                key={index}
                className={`border border-raven-white/20 px-6 py-4 text-left transition-all hover:bg-raven-white/5 ${
                  activeFeature === index 
                    ? 'border-l-4 border-l-raven-white bg-raven-white/5' 
                    : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <h3 className="text-xl font-bold">{feature.title}</h3>
              </button>
            ))}
          </div>
          
          {/* Feature Description */}
          <div className="flex items-center">
            <div className="border border-raven-white/20 bg-raven-white/5 p-8">
              <h3 className="mb-4 text-2xl font-bold">{features[activeFeature].title}</h3>
              <p className="text-lg leading-relaxed">{features[activeFeature].description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
