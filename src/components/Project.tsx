
const Project = () => {
  return (
    <section id="project" className="section bg-raven-black text-raven-white">
      <div className="section-container">
        <h2 className="section-title">This Year's Project: SUAS</h2>
        
        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <p className="mb-6 text-lg leading-relaxed">
              Our team is focused on the Student Unmanned Aerial Systems (SUAS) competition, 
              developing autonomous flight capabilities for real-world applications.
            </p>
            
            <h3 className="mb-4 text-xl font-bold">Project Goals:</h3>
            <ul className="mb-8 space-y-2 text-lg">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Autonomous flight and navigation systems</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Obstacle detection and avoidance</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Computer vision for object recognition</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Precision air delivery systems</span>
              </li>
            </ul>
            
            <p className="text-lg italic">
              Competition: June 24-26, 2025 in Maryland, USA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;
