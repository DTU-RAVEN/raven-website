
import teamMembers from '../data/team-members.json';
import SectionDivider from './SectionDivider';

// Sort members with board members first
const sortedMembers = [...teamMembers].sort((a, b) => {
  if (a.isBoard && !b.isBoard) return -1;
  if (!a.isBoard && b.isBoard) return 1;
  return 0;
});

const Team = () => {
  return (
    <section id="team" className="section bg-raven-black text-raven-white">
      <div className="section-container">
        <h2 className="section-title">Our Team</h2>
        
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedMembers.map((member, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="mb-4 h-40 w-40 overflow-hidden rounded-full border-2 border-raven-white">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
                <p className="mb-1 text-raven-white/80">{member.role}</p>
                <p className="text-sm text-raven-white/60">{member.program}</p>
                {member.isBoard && (
                  <span className="mt-2 rounded-full bg-raven-white px-3 py-1 text-xs font-medium text-raven-black">
                    Board Member
                  </span>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="mb-4 text-2xl font-bold">Join Our Team</h3>
            <p className="mb-6 mx-auto max-w-2xl text-lg">
              We're always looking for passionate students to join RAVEN. 
              Whether you're interested in robotics, programming, mechanical design, 
              or project management, there's a place for you on our team.
            </p>
            <a 
              href="#contact" 
              className="btn-secondary inline-block"
            >
              Get Involved
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
