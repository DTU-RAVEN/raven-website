import SectionDivider from './SectionDivider';
const partnerLogos = [{
  name: 'DTU Blue Dot',
  logo: '/placeholder.svg',
  contribution: 'Support'
}, {
  name: 'Tuborgfonden',
  logo: '/placeholder.svg',
  contribution: 'Support'
}, {
  name: 'UXV',
  logo: '/placeholder.svg',
  contribution: 'In-kind support'
}];
const Funding = () => {
  return <>
      <SectionDivider />
      <section id="funding" className="section bg-raven-white text-raven-black">
        <div className="section-container">
          <h2 className="section-title">Funding & Partners</h2>
          
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <p className="mb-8 text-lg">
                We are grateful for the support of our partners who make our projects possible.
              </p>
              
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {partnerLogos.map((partner, index) => <div key={index} className="flex flex-col items-center">
                    <div className="mb-4 h-24 w-24 overflow-hidden grayscale transition-transform hover:scale-105 hover:grayscale-0 duration-300">
                      <img src={partner.logo} alt={`${partner.name} logo`} className="h-full w-full object-contain" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{partner.name}</h3>
                    
                  </div>)}
              </div>
            </div>
            
            
          </div>
        </div>
      </section>
      <SectionDivider inverted={true} />
    </>;
};
export default Funding;