import SectionDivider from './SectionDivider';
const About = () => {
  return <>
      <SectionDivider />
      <section id="about" className="section bg-raven-white text-raven-black">
        <div className="section-container">
          <h2 className="section-title">About RAVEN</h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center">
              <p className="mb-6 text-lg leading-relaxed">
                RAVEN is a student organization dedicated to filling industry needs in unmanned systems. 
                We bridge DTU students and companies, developing sustainable, cutting-edge autonomous technology.
              </p>
              <p className="text-lg leading-relaxed">
                Our vision is to create a collaborative environment where students can gain hands-on experience
                with real-world robotics and autonomous vehicle challenges while building connections with industry partners.
              </p>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-full overflow-hidden rounded-md shadow-lg md:h-[400px]">
                <img alt="Robotics team working on project" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" src="/lovable-uploads/16241bad-1b5e-4a9d-b1a8-92bf30008b9a.jpg" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionDivider inverted={true} />
    </>;
};
export default About;