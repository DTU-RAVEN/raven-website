
import { Link } from 'react-router-dom';
import teamMembers from '../data/team-members.json';

// Recruiting is closed. Set to true to bring back the "Join us" call-to-action below the team.
const SHOW_JOIN_CTA = false;

const DEPARTMENTS = ['Electrical', 'Mechanical', 'Operations', 'Software', 'Alumni'];

// Department lead first, then board members, otherwise keep the JSON order
const rank = (member) => (/\bLead\b/.test(member.role) ? 0 : member.isBoard ? 1 : 2);

const departments = DEPARTMENTS.map((name) => ({
  name,
  members: teamMembers
    .filter((member) => member.department === name)
    .sort((a, b) => rank(a) - rank(b)),
})).filter((department) => department.members.length > 0);

const activeCount = teamMembers.filter((member) => member.department !== 'Alumni').length;

const Team = () => {
  return (
    <section id="team" className="index-section">
      <div className="wrap">
        <div className="sec-head">
          <hr className="rule" />
          <p className="eyebrow mono roles-count">
            Team <span className="slash">/</span> {activeCount} members
          </p>
          <h1>Our team</h1>
        </div>

        {departments.map((department) => (
          <div key={department.name} className="team-department">
            <h2 className="team-department-title">{department.name}</h2>
            <div className="team-grid-light">
              {department.members.map((member) => (
                <div key={member.name} className="team-card-light">
                  <div className="team-photo-light">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <h3 className="team-name">{member.name}</h3>
                  {member.role && <p className="team-role">{member.role}</p>}
                  <p className="team-program">{member.program}</p>
                  {member.isBoard && <span className="board-badge">Board</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {SHOW_JOIN_CTA && (
        <section className="cta">
          <div className="wrap">
            <span className="mono">Join us</span>
            <h2>There is a place for you on this team.</h2>
            <p>
              We are always looking for students to join, whether you are into robotics, programming,
              mechanical design, or project management. Get in touch.
            </p>
            <Link to="/join" className="apply">See open roles</Link>
          </div>
        </section>
      )}
    </section>
  );
};

export default Team;
