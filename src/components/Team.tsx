
import { Link } from 'react-router-dom';
import teamMembers from '../data/team-members.json';

const sortedMembers = [...teamMembers].sort((a, b) => {
  if (a.isBoard && !b.isBoard) return -1;
  if (!a.isBoard && b.isBoard) return 1;
  return 0;
});

const Team = () => {
  return (
    <section id="team" className="index-section">
      <div className="wrap">
        <div className="sec-head">
          <hr className="rule" />
          <p className="eyebrow mono roles-count">
            Team <span className="slash">/</span> {sortedMembers.length} members
          </p>
          <h2>Our team</h2>
        </div>

        <div className="team-grid-light">
          {sortedMembers.map((member, index) => (
            <div key={index} className="team-card-light">
              <div className="team-photo-light">
                <img src={member.image} alt={member.name} />
              </div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-program">{member.program}</p>
              {member.isBoard && <span className="board-badge">Board</span>}
            </div>
          ))}
        </div>
      </div>

      <section className="cta">
        <div className="wrap">
          <span className="mono">Join us</span>
          <h2>There's a place for you on this team.</h2>
          <p>
            We're always looking for passionate students. Whether you're into robotics, programming,
            mechanical design, or project management. We'd love to hear from you.
          </p>
          <Link to="/join" className="apply">See open roles</Link>
        </div>
      </section>
    </section>
  );
};

export default Team;
