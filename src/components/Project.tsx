
const Project = () => {
  return (
    <section id="competitions" className="section bg-raven-black text-raven-white">
      <div className="section-container">
        <h2 className="section-title">Competitions</h2>

        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <h3 className="mb-6 text-2xl font-bold">C-UASC 2026 — 1st Place</h3>
            <p className="mb-6 text-lg leading-relaxed">
              DTU RAVEN finished 1st overall at the 2026 California Unmanned Aerial Systems Competition (C-UASC),
              competing against 25 university teams from across the world. The competition was held at
              California State University, Los Angeles, with 9 RAVEN members making the trip.
            </p>

            <p className="mb-8 text-lg leading-relaxed">
              We completed all planned missions across the three competition days — and didn't just win by
              performing well across the board. We also placed best of all teams in waypoint navigation
              accuracy and set the course speed record at <span className="font-bold">140 km/h</span>.
            </p>

            <h3 className="mb-4 text-xl font-bold">Missions completed:</h3>
            <ul className="mb-8 space-y-2 text-lg">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Precision waypoint navigation — best accuracy of all teams</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Circuit time trial — set the course speed record at 140 km/h</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Autonomous payload drop and delivery</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Autonomous target localization</span>
              </li>
            </ul>

            <p className="text-lg leading-relaxed text-raven-white/70">
              The aircraft integrates a Cube Orange autopilot, Jetson Orin Nano flight computer,
              gimbal-mounted camera, and custom PCBs — all designed and built by our members.
              Thank you to our sponsors Tuborgfondet and dane-rc.dk, and to DTU Skylab for hosting our workshop.
            </p>
          </div>

          <div className="border-t border-raven-white/10 pt-10">
            <h3 className="mb-3 text-xl font-bold">SUAS 2025 — First Competition Entry</h3>
            <p className="text-lg leading-relaxed text-raven-white/70">
              In June 2025, RAVEN made its first ever competition appearance with drone <span className="italic">Munnin</span> at
              the Student Unmanned Aerial Systems (SUAS) Competition in Maryland, USA. Competing in our debut season,
              the experience laid the foundation for everything that followed at C-UASC 2026.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;
