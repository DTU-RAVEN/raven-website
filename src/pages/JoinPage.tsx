import { useLocation } from 'react-router-dom';
import { MouseEvent, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MetaTags from '@/components/MetaTags';
import ScrollToTop from '@/components/ScrollToTop';

const APPLICATION_FORM_URL = 'https://forms.cloud.microsoft/e/68etcR19hq';

type Role = {
  title: string;
  description: string;
  tasks: string[];
  goodToHave: string[];
  subject: string;
};

const roles: Role[] = [
  {
    title: 'Software',
    description: 'The code that runs autonomy, perception, and mission logic on the drone.',
    tasks: [
      'Autonomy, perception, and mission logic',
      'Build and integrate nodes in ROS2',
      'Take a piece of the stack from idea to flight-tested code',
    ],
    goodToHave: ['Python or C++', 'Any robotics or ML tinkering', 'Curiosity beats a CV'],
    subject: 'Software',
  },
  {
    title: 'Mechanical',
    description: 'Building the airframe, mounts, and mechanisms that make the drone fly.',
    tasks: [
      'Frames, mounts, and mechanisms',
      'The wing, tail, and transition of the VTOL fixed-wing',
      'Go from CAD drawing to a part you can hold',
    ],
    goodToHave: ['CAD', '3D printing or other hands-on building', 'Aero or wind-energy interest'],
    subject: 'Mechanical (incl. airframe / aero)',
  },
  {
    title: 'Electrical, RF & System Integration',
    description: 'Power, wiring, custom PCBs, and radios.',
    tasks: [
      'Power systems, wiring, and ESC setups',
      'Custom PCBs and radio links',
      'Make hardware and software behave as one system',
    ],
    goodToHave: ['An EE/Physics background', 'Soldering experience', 'Tinkering with electronics or RF'],
    subject: 'Electrical, RF & System Integration',
  },
  {
    title: 'Drone Pilot',
    description: 'Hands on the sticks for test flights and competition runs.',
    tasks: [
      'Fly test flights and competition runs',
      'Work with the engineering teams on what the aircraft needs',
      'Bring the judgment that only comes from real flight time',
    ],
    goodToHave: ['Real flying hours', 'FPV experience', 'An RC or model background'],
    subject: 'Drone Pilot',
  },
  {
    title: 'Business & Partnership Lead',
    description: 'Sponsors, industry contacts, and the relationships that fund the team.',
    tasks: [
      'Find and manage sponsors and industry contacts',
      'Represent the team to companies and partners',
      'Likely to also cover treasury duties (to be confirmed at the general assembly)',
    ],
    goodToHave: ['Comfort talking to companies', 'Basic money admin'],
    subject: 'Business & Partnership Lead',
  },
  {
    title: 'Social Media',
    description: 'LinkedIn, Instagram, and the website. Keeping the team visible.',
    tasks: [
      'Post on LinkedIn, Instagram, and the website',
      'Document builds, tests, and competitions as they happen',
      'Shape how the team looks from the outside',
    ],
    goodToHave: ['Clean writing', 'An eye for photo or video', 'Consistency'],
    subject: 'Social Media',
  },
  {
    title: 'Operations',
    description: 'Procurement, money, and documentation, so the engineers can keep building.',
    tasks: [
      'Procurement and purchasing',
      'Money flow and documentation',
      'Chase down the small things so engineers can keep building',
    ],
    goodToHave: ['Nothing specific - reliability is the skill'],
    subject: 'Operations',
  },
];

// The header is sticky, so scroll targets have to clear its height or the
// heading lands underneath it.
const scrollToRoles = () => {
  const target = document.getElementById('roles');
  if (!target) return;

  const header = document.querySelector<HTMLElement>('.raven-site-header');
  const offset = (header?.offsetHeight ?? 80) + 16;
  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};

const JoinPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash && location.hash.includes('roles')) {
      scrollToRoles();
    }
  }, [location.hash]);

  return (
    <div className="join-page">
      <MetaTags
        title="Join us - DTU Raven"
        description="Open roles at DTU Raven: software, mechanical, electrical/RF, drone pilot, business, social media, operations, and open applications."
      />
      <ScrollToTop />
      <Navbar />

      <main>
        <section className="join-hero">
          <div className="wrap">
            <div className="info-meeting" role="note">
              <span className="info-meeting-tag mono">Info meeting</span>
              <p className="info-meeting-when">
                <strong>Tuesday 8 September, 17:30</strong>
                <span className="info-meeting-where">Arena, SkyLab &middot; Centrifugevej 374</span>
              </p>
              <p className="info-meeting-note">
                Curious about the team? Come meet us, hear about the projects, and ask anything.
              </p>
            </div>
            <div className="join-hero-headline">
              <div className="join-hero-copy">
                <h1>
                  Build drones that <em>sense</em>, <em>think</em> and <em>act</em>.
                </h1>
                <p className="lede">
                  We are a student team building autonomous systems, and we are looking for people to
                  build the next projects with us.
                </p>
                <div className="hero-actions join-hero-actions">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={(event: MouseEvent<HTMLButtonElement>) => {
                      event.preventDefault();
                      scrollToRoles();
                    }}
                  >
                    View open positions
                  </button>
                  <a
                    className="btn-secondary"
                    href={APPLICATION_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply now
                  </a>
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
              <p className="big">
                DTU Raven is student-run and we strive to build everything end to end: {' '}
                <strong>airframe, electronics, and the entire software stack.</strong> You join one of our
                sub-teams and take ownership of a subsystem. Every new member works alongside someone who has
                already been through a full build cycle, and the expectation in your first month is that you learn
                the stack, not that you are an expert.
              </p>
              <p className="big" style={{ marginTop: '24px' }}>
                We are now building a VTOL fixed-wing for the IMechE UAS Challenge and an autonomous swarm for IARC
                Mission 10, where the aircraft have to map a safe path through a minefield.
              </p>
            </div>
            <div className="principles">
              <div>
                <h3>~5 ECTS of time</h3>
                <p>Expect roughly the workload of a 5-ECTS course.</p>
              </div>
              <div>
                <h3>Monday evenings</h3>
                <p>We meet Monday evenings, plus a workday most Saturdays.</p>
              </div>
              <div>
                <h3>Based in Skylab</h3>
                <p>Our workshop is in Skylab, where the team builds and meets.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="roles">
          <div className="wrap">
            <div className="sec-head">
              <hr className="rule" />
              <p className="eyebrow mono roles-count">
                Open roles <span className="slash">/</span> 7
              </p>
              <h2>Profiles we are looking for</h2>
            </div>

            <p style={{ color: 'var(--text-muted)', maxWidth: '60ch', marginBottom: '40px', lineHeight: 1.6 }}>
              Nothing below is a hard requirement. If you are driven and willing to learn, apply even if you do
              not tick every box under "Good to have." We especially welcome students early in their studies -
              the time and commitment you bring count for as much as experience.
            </p>

            <div className="roles-grid">
              {roles.map((role) => (
                <article className="role" key={role.title}>
                  <h3>{role.title}</h3>
                  <p className="mission">{role.description}</p>
                  <h4>What you will do</h4>
                  <ul>
                    {role.tasks.map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                  <h4>Good to have</h4>
                  <ul>
                    {role.goodToHave.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}

              <article className="role open">
                <h3>Do not see your profile?</h3>
                <p className="mission">
                  Apply anyway and tell us what you want to work on.
                </p>
                <a
                  className="apply"
                  href={APPLICATION_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get in touch
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="wrap">
            <span className="mono">How to apply</span>
            <h2>Fill out our application form.</h2>
            <p>
              Tell us which role fits you, what you have built before, and why drones. We read every application
              and reply to set up a chat.
            </p>
            <a
              className="apply"
              href={APPLICATION_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply now
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default JoinPage;

