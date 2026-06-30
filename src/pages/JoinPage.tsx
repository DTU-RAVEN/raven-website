import { useLocation } from 'react-router-dom';
import { MouseEvent, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ApplyDialog from '@/components/ApplyDialog';
import MetaTags from '@/components/MetaTags';
import ScrollToTop from '@/components/ScrollToTop';

type Role = {
  discipline: string;
  code: string;
  title: string;
  mission: string;
  tasks: string[];
  brings: string[];
  chips: string[];
  subject: string;
};

const roles: Role[] = [
  {
    discipline: 'Perception',
    code: 'PER',
    title: 'Perception Engineer',
    mission: 'Make the drone see - turn raw cameras and sensors into a world it can reason about.',
    tasks: [
      'Integrate stereo and depth cameras into the onboard stack',
      'Write and wire up sensor drivers; handle calibration and coordinate frames',
      'Build real-time perception nodes in ROS 2',
    ],
    brings: [
      'Hands-on with stereo/depth camera integration',
      'Experience writing or integrating device drivers',
      'ROS 2, and C++ or Python',
    ],
    chips: ['ROS 2', 'Stereo / depth', 'C++ / Python', 'Calibration'],
    subject: 'Perception Engineer',
  },
  {
    discipline: 'Autonomy',
    code: 'AUT',
    title: 'Autonomy Engineer',
    mission: 'Turn sensor data into decisions - planning, estimation, and control that hold up without GPS.',
    tasks: [
      'Develop path planning, state estimation, and control',
      'Work on GNSS-denied navigation and sensor fusion',
      'Integrate with the flight stack (ArduPilot / PX4) over ROS 2',
    ],
    brings: [
      'A control, estimation, or planning background',
      'ROS 2, and C++ or Python',
      'Some exposure to a flight stack or robotics middleware',
    ],
    chips: ['ROS 2', 'Planning / control', 'State estimation', 'ArduPilot / PX4'],
    subject: 'Application - Autonomy Engineer',
  },
  {
    discipline: 'State estimation / SLAM',
    code: 'STE',
    title: 'State Estimation Engineer',
    mission: 'Know where you are when GPS lies - fuse cameras, IMU, and lidar into a state estimate that holds.',
    tasks: [
      'Implement and tune SLAM and VIO pipelines for GPS-denied flight',
      'Fuse IMU, camera, and ranging sensors into a robust state estimate',
      'Evaluate and adapt open-source frameworks (ORB-SLAM, VINS, MSCKF) to our hardware',
    ],
    brings: [
      'Solid grasp of probabilistic state estimation (EKF, factor graphs)',
      'Hands-on with at least one SLAM or VIO framework',
      'C++ and ROS 2',
    ],
    chips: ['SLAM', 'VIO', 'Sensor fusion', 'C++ / ROS 2'],
    subject: 'State Estimation Engineer',
  },
  {
    discipline: 'Electrical / PCB',
    code: 'ELE',
    title: 'Electrical Engineer - PCB',
    mission: 'Design the boards that fly - power and signal that stay alive through vibration, heat, and hard landings.',
    tasks: [
      'Design custom PCBs for power distribution and sensor integration',
      'Take boards from schematic to layout to bring-up',
      'Build in the reliability margin that keeps aircraft flying',
    ],
    brings: [
      'Schematic capture and PCB layout (KiCad or Altium)',
      'Power-electronics basics and an eye for EMI',
      'Soldering and board bring-up',
    ],
    chips: ['KiCad / Altium', 'Power electronics', 'Bring-up', 'Soldering'],
    subject: 'Electrical Engineer - PCB',
  },
  {
    discipline: 'Mechanical / Fixed-wing',
    code: 'MEC',
    title: 'Mechanical Engineer - Fixed-wing',
    mission: 'Shape what flies - airframes designed around a hard weight budget and real aerodynamics.',
    tasks: [
      'Design fixed-wing airframes and aerodynamic surfaces',
      'Model in CAD and fabricate in composites or 3D print',
      'Own the weight budget from concept to flight',
    ],
    brings: [
      'Aircraft or aerodynamic design interest and intuition',
      'CAD (SolidWorks or Fusion 360)',
      'Hands-on fabrication - composites or 3D printing',
    ],
    chips: ['Fixed-wing', 'CAD', 'Aerodynamics', 'Composites'],
    subject: 'Mechanical Engineer - Fixed-wing',
  },
  {
    discipline: 'Flight test',
    code: 'FTE',
    title: 'Flight Test Engineer',
    mission: 'Prove it in the air - plan the tests, own the safety, and read the truth in the flight logs.',
    tasks: [
      'Plan and run flight tests; own pre-flight and safety procedures',
      'Analyze flight logs and feed findings back to the engineering teams',
      'Build the test discipline that wins competitions',
    ],
    brings: [
      'A methodical mindset and calm under pressure',
      'Data analysis (Python) and an interest in flight operations',
      'Bonus: piloting or ArduPilot / Mission Planner log experience',
    ],
    chips: ['Flight ops', 'Safety', 'Log analysis', 'Python'],
    subject: 'Flight Test Engineer',
  },
];

const JoinPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash && location.hash.includes('roles')) {
      const target = document.getElementById('roles');
      if (target) {
        const offset = 24;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  return (
    <div className="join-page">
      <MetaTags
        title="Join us - DTU Raven"
        description="Open roles at DTU Raven: perception, autonomy, electrical, mechanical, flight test, and open applications."
      />
      <ScrollToTop />
      <Navbar />

      <main>
        <section className="join-hero">
          <div className="wrap">
            <p className="eyebrow mono">
              DTU Raven <span className="dot">/</span> Now recruiting
            </p>
            <div className="join-hero-headline">
              <div className="join-hero-copy">
                <h1>
                  Build drones that <em>sense</em>, <em>think</em> and <em>act</em>.
                </h1>
                <p className="lede">
                  We're a student team building autonomous systems end to end, and we're looking for people to
                  build the next projects with us.
                </p>
                <div className="hero-actions join-hero-actions">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={(event: MouseEvent<HTMLButtonElement>) => {
                      event.preventDefault();
                      const target = document.getElementById('roles');
                      if (target) {
                        const offset = 24;
                        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                        window.scrollTo({ top, behavior: 'smooth' });
                      }
                    }}
                  >
                    View open positions
                  </button>
                  <ApplyDialog
                    buttonClassName="btn-secondary"
                    buttonText="Apply now"
                    label="Start your application"
                  />
                </div>
              </div>
              <img
                className="join-hero-image"
                src="/join-hero.svg"
                alt="Illustration for joining DTU Raven"
              />
            </div>
          </div>
        </section>

        <section className="work">
          <div className="wrap work-grid">
            <div>
              <p className="eyebrow mono">How we work</p>
              <p className="big">
                DTU Raven is a student-run team building autonomous drones end to end -{' '}
                <strong>airframe, electronics, and the software that lets them fly themselves.</strong> We work in
                small sub-teams, build hardware that has to survive contact with the real
                world, and fly it ourselves at our test site. You take on real responsibility from week one, learn
                by doing the actual engineering, and have teammates who'll help you get there. We took first place
                at C-UASC 2026, and we're now building toward IARC Mission 10 - autonomous swarms that map a safe
                path through a minefield. It's a difficult competition so we need more motivated engineers on the team.
              </p>
            </div>
            <div className="principles">
              <div>
                <span className="mono">01 - Own it</span>
                <h3>Own a subsystem</h3>
                <p>Every member owns a part of the vehicle, not a ticket in a backlog.</p>
              </div>
              <div>
                <span className="mono">02 - Fly it</span>
                <h3>Ship and fly</h3>
                <p>We design it, build it, then put it in the air. The stakes are high - a small mistake could mean losing months of work</p>
              </div>
              <div>
                <span className="mono">03 - Learn by doing</span>
                <h3>No prior experience required</h3>
                <p>Curiosity and follow-through matter more than a CV. We'll help eachother learn the rest.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="roles">
          <div className="wrap">
            <div className="sec-head">
              <hr className="rule" />
              <p className="eyebrow mono roles-count">
                Open roles <span className="slash">/</span> 6
              </p>
              <h2>Profiles we're looking for</h2>
            </div>

            <p style={{ color: 'var(--ink-soft)', maxWidth: '60ch', marginBottom: '40px', lineHeight: 1.6 }}>
              We're looking for students with hands-on experience in the areas below, but also for driven, hard-working people who can lead the organisation in the future.
            </p>

            <div className="roles-grid">
              {roles.map((role) => (
                <article className="role" key={role.code}>
                  <p className="disc mono">
                    <span>{role.discipline}</span>
                    <span className="code">{role.code}</span>
                  </p>
                  <h3>{role.title}</h3>
                  <p className="mission">{role.mission}</p>
                  <h4>What you'll do</h4>
                  <ul>
                    {role.tasks.map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                  <h4>You bring</h4>
                  <ul>
                    {role.brings.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <div className="chips">
                    {role.chips.map((chip) => (
                      <span className="chip" key={chip}>
                        {chip}
                      </span>
                    ))}
                  </div>
                  <ApplyDialog
                    subject={role.subject}
                    label={`Apply for ${role.title}`}
                    buttonClassName="apply"
                    buttonText="Apply"
                  />
                </article>
              ))}

              <article className="role open">
                <p className="disc mono">
                  <span className="open-label">Open application</span>
                </p>
                <h3>Don't see your profile?</h3>
                <p className="mission">
                  Software, business, design, finance - if you want to help build autonomous aircraft, tell us what
                  you'd bring.
                </p>
                <ApplyDialog
                  subject="Open application"
                  label="Open application"
                  buttonClassName="apply"
                  buttonText="Get in touch"
                />
              </article>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="wrap">
            <span className="mono">How to apply</span>
            <h2>Send a short intro and your CV.</h2>
            <p>
              Tell us which role fits you, what you've built before, and why drones. We read every application and
              reply to set up a chat.
            </p>
            <ApplyDialog
              label="Email us"
              buttonClassName="apply"
              buttonText="Email us"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default JoinPage;

