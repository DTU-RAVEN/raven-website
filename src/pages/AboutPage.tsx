
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MetaTags from '@/components/MetaTags';
import ScrollToTop from '@/components/ScrollToTop';

const AboutPage = () => {
  return (
    <div>
      <MetaTags title="Join us — DTU Raven" description="Open roles at DTU Raven: perception, autonomy, electrical, mechanical, flight test, and open applications." />
      <ScrollToTop />
      <Navbar />

      <main>
        <section id="roles" style={{padding: '48px 0'}}>
          <div className="wrap">
            <div className="sec-head">
              <hr className="rule" />
              <p className="eyebrow mono" style={{color: 'var(--teal)', margin: '18px 0 0'}}>Open roles <span style={{color: 'var(--crimson)'}}>/</span> 5</p>
              <h2>Profiles we're looking for</h2>
            </div>

            <div className="roles-grid">
              <article className="role">
                <p className="disc mono"><span>Perception</span><span className="code">PER</span></p>
                <h3>Perception Engineer</h3>
                <p className="mission">Make the drone see — turn raw cameras and sensors into a world it can reason about.</p>
                <h4>What you'll do</h4>
                <ul>
                  <li>Integrate stereo and depth cameras into the onboard stack</li>
                  <li>Write and wire up sensor drivers; handle calibration and coordinate frames</li>
                  <li>Build real-time perception nodes in ROS 2</li>
                </ul>
                <h4>You bring</h4>
                <ul>
                  <li>Hands-on with stereo/depth camera integration</li>
                  <li>Experience writing or integrating device drivers</li>
                  <li>ROS 2, and C++ or Python</li>
                </ul>
                <div className="chips"><span className="chip">ROS 2</span><span className="chip">Stereo / depth</span><span className="chip">C++ / Python</span><span className="chip">Calibration</span></div>
                <a className="apply" href="mailto:join@dturaven.dk?subject=Application%20%E2%80%94%20Perception%20Engineer">Apply</a>
              </article>

              <article className="role">
                <p className="disc mono"><span>Autonomy</span><span className="code">AUT</span></p>
                <h3>Autonomy Engineer</h3>
                <p className="mission">Turn sensor data into decisions — planning, estimation, and control that hold up without GPS.</p>
                <h4>What you'll do</h4>
                <ul>
                  <li>Develop path planning, state estimation, and control</li>
                  <li>Work on GNSS-denied navigation and sensor fusion</li>
                  <li>Integrate with the flight stack (ArduPilot / PX4) over ROS 2</li>
                </ul>
                <h4>You bring</h4>
                <ul>
                  <li>A control, estimation, or planning background</li>
                  <li>ROS 2, and C++ or Python</li>
                  <li>Some exposure to a flight stack or robotics middleware</li>
                </ul>
                <div className="chips"><span className="chip">ROS 2</span><span className="chip">Planning / control</span><span className="chip">State estimation</span><span className="chip">ArduPilot / PX4</span></div>
                <a className="apply" href="mailto:join@dturaven.dk?subject=Application%20%E2%80%94%20Autonomy%20Engineer">Apply</a>
              </article>

              <article className="role">
                <p className="disc mono"><span>Electrical · PCB</span><span className="code">ELE</span></p>
                <h3>Electrical Engineer — PCB</h3>
                <p className="mission">Design the boards that fly — power and signal that stay alive through vibration, heat, and hard landings.</p>
                <h4>What you'll do</h4>
                <ul>
                  <li>Design custom PCBs for power distribution and sensor integration</li>
                  <li>Take boards from schematic to layout to bring-up</li>
                  <li>Build in the reliability margin that keeps aircraft flying</li>
                </ul>
                <h4>You bring</h4>
                <ul>
                  <li>Schematic capture and PCB layout (KiCad or Altium)</li>
                  <li>Power-electronics basics and an eye for EMI</li>
                  <li>Soldering and board bring-up</li>
                </ul>
                <div className="chips"><span className="chip">KiCad / Altium</span><span className="chip">Power electronics</span><span className="chip">Bring-up</span><span className="chip">Soldering</span></div>
                <a className="apply" href="mailto:join@dturaven.dk?subject=Application%20%E2%80%94%20Electrical%20Engineer%20(PCB)">Apply</a>
              </article>

              <article className="role">
                <p className="disc mono"><span>Mechanical · Fixed-wing</span><span className="code">MEC</span></p>
                <h3>Mechanical Engineer — Fixed-wing</h3>
                <p className="mission">Shape what flies — airframes designed around a hard weight budget and real aerodynamics.</p>
                <h4>What you'll do</h4>
                <ul>
                  <li>Design fixed-wing airframes and aerodynamic surfaces</li>
                  <li>Model in CAD and fabricate in composites or 3D print</li>
                  <li>Own the weight budget from concept to flight</li>
                </ul>
                <h4>You bring</h4>
                <ul>
                  <li>Aircraft or aerodynamic design interest and intuition</li>
                  <li>CAD (SolidWorks or Fusion 360)</li>
                  <li>Hands-on fabrication — composites or 3D printing</li>
                </ul>
                <div className="chips"><span className="chip">Fixed-wing</span><span className="chip">CAD</span><span className="chip">Aerodynamics</span><span className="chip">Composites</span></div>
                <a className="apply" href="mailto:join@dturaven.dk?subject=Application%20%E2%80%94%20Mechanical%20Engineer%20(Fixed-wing)">Apply</a>
              </article>

              <article className="role">
                <p className="disc mono"><span>Flight test</span><span className="code">FTE</span></p>
                <h3>Flight Test Engineer</h3>
                <p className="mission">Prove it in the air — plan the tests, own the safety, and read the truth in the flight logs.</p>
                <h4>What you'll do</h4>
                <ul>
                  <li>Plan and run flight tests; own pre-flight and safety procedures</li>
                  <li>Analyze flight logs and feed findings back to the engineering teams</li>
                  <li>Build the test discipline that wins competitions</li>
                </ul>
                <h4>You bring</h4>
                <ul>
                  <li>A methodical mindset and calm under pressure</li>
                  <li>Data analysis (Python) and an interest in flight operations</li>
                  <li>Bonus: piloting or ArduPilot / Mission Planner log experience</li>
                </ul>
                <div className="chips"><span className="chip">Flight ops</span><span className="chip">Safety</span><span className="chip">Log analysis</span><span className="chip">Python</span></div>
                <a className="apply" href="mailto:join@dturaven.dk?subject=Application%20%E2%80%94%20Flight%20Test%20Engineer">Apply</a>
              </article>

              <article className="role open">
                <p className="disc mono"><span style={{color: 'var(--crimson)'}}>Open application</span></p>
                <h3>Don't see your profile?</h3>
                <p className="mission">Software, business, design, finance — if you want to help build autonomous aircraft, tell us what you'd bring.</p>
                <a className="apply" href="mailto:join@dturaven.dk?subject=Open%20application%20%E2%80%94%20DTU%20Raven">Get in touch</a>
              </article>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="wrap">
            <span className="mono">How to apply</span>
            <h2>Send a short intro and your CV.</h2>
            <p>Tell us which role fits you, what you've built before, and why drones. We read every application and reply to set up a chat.</p>
            <a className="apply" href="mailto:join@dturaven.dk?subject=Application%20%E2%80%94%20DTU%20Raven">Email us</a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
