
const timelineData = [
  {
    date: 'Feb 28',
    event: 'SUAS sign-up deadline'
  },
  {
    date: 'Apr 28',
    event: 'Proof of flight video submission'
  },
  {
    date: 'May 5',
    event: 'Event submission deadline'
  },
  {
    date: 'May 12',
    event: 'Pre-mission deliverables due'
  },
  {
    date: 'Jun 22',
    event: 'Travel to Maryland'
  }
];

const Timeline = () => {
  return (
    <section id="timeline" className="section bg-raven-black text-raven-white">
      <div className="section-container">
        <h2 className="section-title">Project Timeline</h2>
        
        <div className="relative mx-auto max-w-4xl py-8">
          {/* Mobile Timeline (vertical) */}
          <div className="md:hidden">
            <div className="relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-3 top-0 bottom-0 h-full w-[1px] bg-raven-white/30"></div>
              
              {/* Timeline Items */}
              {timelineData.map((item, index) => (
                <div key={index} className="mb-10 relative">
                  {/* Date Point */}
                  <div className="absolute left-0 top-0 mt-1 -ml-[6px] h-3 w-3 rounded-full bg-raven-white">
                    <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-raven-white/30"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="pl-6">
                    <p className="mb-1 font-bold">{item.date}</p>
                    <p className="text-sm md:text-base">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop Timeline (horizontal) */}
          <div className="hidden md:block">
            {/* Timeline Line */}
            <div className="absolute left-0 right-0 top-1/2 h-[1px] w-full -translate-y-1/2 bg-raven-white/30"></div>
            
            {/* Timeline Items */}
            <div className="relative flex flex-row space-y-0">
              {timelineData.map((item, index) => (
                <div key={index} className="flex flex-1 flex-col items-center">
                  {/* Date Point */}
                  <div className="relative mb-4 h-4 w-4 rounded-full bg-raven-white">
                    <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-raven-white/30"></div>
                  </div>
                  
                  {/* Content - Alternate above/below */}
                  <div className={`text-center absolute w-full ${
                    index % 2 === 0 ? '-top-28' : 'top-12'
                  }`}>
                    <p className="mb-1 font-bold">{item.date}</p>
                    <p>{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
