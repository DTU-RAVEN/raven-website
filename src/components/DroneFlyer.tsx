import { useEffect, useRef } from 'react';

/*
 * A small quadcopter that patrols the viewport.
 * - Wanders between random waypoints; orbits the cursor while the mouse is moving.
 * - Banks/pitches in 3D from its acceleration, faces its direction of travel.
 * - Leaves an ember trail and emits radar pings on a canvas overlay.
 * - Click it for a boost + barrel roll.
 * Everything runs in one requestAnimationFrame loop that writes to refs — no React state per frame.
 */

type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; hue: 'red' | 'white' };
type Ping = { x: number; y: number; age: number };

const MAX_PARTICLES = 450;
const ORBIT_RADIUS = 110;
const FOLLOW_TIMEOUT = 2500; // ms after the last mouse move before returning to patrol

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const angleDiff = (a: number, b: number) => Math.atan2(Math.sin(b - a), Math.cos(b - a));

const DroneFlyer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const droneRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const clickRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    const drone = droneRef.current;
    const body = bodyRef.current;
    const hud = hudRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const pos = { x: -80, y: h * 0.35 };
    const vel = { x: 260, y: 0 };
    const prevVel = { x: 260, y: 0 };
    const mouse = { x: 0, y: 0, last: -Infinity };
    let waypoint = { x: w * 0.6, y: h * 0.3 };
    let heading = 0;
    let pitch = 0;
    let roll = 0;
    let orbit = 0;
    let boostUntil = 0;
    let rollStart = -Infinity;
    let nextPing = performance.now() + 1500;
    let hudTick = 0;
    const particles: Particle[] = [];
    const pings: Ping[] = [];

    const pickWaypoint = () => {
      const m = 90;
      waypoint = { x: m + Math.random() * (w - 2 * m), y: m + Math.random() * (h - 2 * m) };
    };

    const emit = (x: number, y: number, vx: number, vy: number, life: number, size: number, hue: Particle['hue']) => {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      particles.push({ x, y, vx, vy, life, max: life, size, hue });
    };

    const burst = (x: number, y: number) => {
      for (let i = 0; i < 70; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 120 + Math.random() * 380;
        emit(x, y, Math.cos(a) * s, Math.sin(a) * s, 0.5 + Math.random() * 0.6, 1.5 + Math.random() * 2.5, Math.random() < 0.3 ? 'white' : 'red');
      }
      pings.push({ x, y, age: 0 });
    };

    clickRef.current = () => {
      const now = performance.now();
      boostUntil = now + 1100;
      rollStart = now;
      burst(pos.x, pos.y);
      // Kick forward along the current heading.
      vel.x += Math.cos(heading) * 500;
      vel.y += Math.sin(heading) * 500;
      pickWaypoint();
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.last = performance.now();
    };
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const dy = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      vel.y -= clamp(dy, -60, 60) * 4;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    let last = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // --- Steering -------------------------------------------------------
      const boosting = now < boostUntil;
      const maxSpeed = boosting ? 950 : 360;
      const maxForce = boosting ? 1600 : 520;

      let target: { x: number; y: number };
      if (now - mouse.last < FOLLOW_TIMEOUT) {
        orbit += dt * 1.6;
        target = { x: mouse.x + Math.cos(orbit) * ORBIT_RADIUS, y: mouse.y + Math.sin(orbit) * ORBIT_RADIUS * 0.6 };
      } else {
        if (Math.hypot(waypoint.x - pos.x, waypoint.y - pos.y) < 70) pickWaypoint();
        target = waypoint;
      }

      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      const dist = Math.hypot(dx, dy) || 1;
      const arrive = boosting ? 1 : clamp(dist / 220, 0.25, 1);
      let sx = (dx / dist) * maxSpeed * arrive - vel.x;
      let sy = (dy / dist) * maxSpeed * arrive - vel.y;
      const sm = Math.hypot(sx, sy);
      if (sm > maxForce) {
        sx = (sx / sm) * maxForce;
        sy = (sy / sm) * maxForce;
      }
      vel.x += sx * dt;
      vel.y += sy * dt;
      const speed = Math.hypot(vel.x, vel.y);
      const cap = maxSpeed * 1.4;
      if (speed > cap) {
        vel.x = (vel.x / speed) * cap;
        vel.y = (vel.y / speed) * cap;
      }
      pos.x += vel.x * dt;
      pos.y += vel.y * dt;

      // --- Attitude: face travel, pitch with forward accel, roll into turns
      const ax = (vel.x - prevVel.x) / (dt || 1 / 60);
      const ay = (vel.y - prevVel.y) / (dt || 1 / 60);
      prevVel.x = vel.x;
      prevVel.y = vel.y;
      if (speed > 25) {
        const desired = Math.atan2(vel.y, vel.x);
        heading += angleDiff(heading, desired) * Math.min(1, dt * 5);
      }
      const fwd = ax * Math.cos(heading) + ay * Math.sin(heading);
      const lat = -ax * Math.sin(heading) + ay * Math.cos(heading);
      pitch += (clamp(fwd * 0.03, -28, 28) - pitch) * Math.min(1, dt * 6);
      roll += (clamp(lat * 0.035, -35, 35) - roll) * Math.min(1, dt * 6);

      const rollT = (now - rollStart) / 750;
      const barrel = rollT >= 0 && rollT < 1 ? 360 * (1 - Math.pow(1 - rollT, 3)) : 0;
      const bob = Math.sin(now / 420) * 3;
      const scale = 1 + Math.sin(now / 1300) * 0.06 + (boosting ? 0.08 : 0);

      drone.style.transform = `translate3d(${pos.x}px, ${pos.y + bob}px, 0) rotate(${heading + Math.PI / 2}rad)`;
      body.style.transform = `scale(${scale}) rotateX(${pitch}deg) rotateY(${roll + barrel}deg)`;
      drone.classList.toggle('drone--boost', boosting);

      hudTick += dt;
      if (hudTick > 0.12) {
        hudTick = 0;
        const kmh = Math.round(speed * 0.4);
        const hdg = Math.round(((heading * 180) / Math.PI + 450) % 360);
        hud.textContent = `RVN-01 · ${String(kmh).padStart(3, '0')} KM/H · HDG ${String(hdg).padStart(3, '0')}°`;
      }
      hud.style.transform = `translate3d(${pos.x + 46}px, ${pos.y - 52 + bob}px, 0)`;

      // --- Effects --------------------------------------------------------
      // Exhaust embers from the two rear rotors, density scales with speed.
      const back = heading + Math.PI;
      const emitCount = Math.min(4, Math.floor(speed / 110) + (Math.random() < 0.5 ? 1 : 0));
      for (let i = 0; i < emitCount; i++) {
        const side = i % 2 ? 1 : -1;
        const ox = Math.cos(back) * 22 + Math.cos(heading + Math.PI / 2) * 16 * side;
        const oy = Math.sin(back) * 22 + Math.sin(heading + Math.PI / 2) * 16 * side;
        const spread = (Math.random() - 0.5) * 0.6;
        const s = 40 + Math.random() * 60;
        emit(pos.x + ox, pos.y + oy, Math.cos(back + spread) * s, Math.sin(back + spread) * s,
          0.5 + Math.random() * 0.7, 1 + Math.random() * 2.2, Math.random() < 0.15 ? 'white' : 'red');
      }

      if (now > nextPing) {
        pings.push({ x: pos.x, y: pos.y, age: 0 });
        nextPing = now + 2600 + Math.random() * 1800;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= dt;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.vx *= 1 - dt * 2.2;
        p.vy *= 1 - dt * 2.2;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const t = p.life / p.max;
        ctx.fillStyle = p.hue === 'white' ? `rgba(255,236,230,${t * 0.9})` : `rgba(224,40,58,${t * 0.85})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.4 + t * 0.8), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';
      for (let i = pings.length - 1; i >= 0; i--) {
        const g = pings[i];
        g.age += dt;
        const t = g.age / 1.6;
        if (t >= 1) {
          pings.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(224,40,58,${(1 - t) * 0.55})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(g.x, g.y, 20 + t * 160, 0, Math.PI * 2);
        ctx.stroke();
        ctx.strokeStyle = `rgba(242,242,242,${(1 - t) * 0.25})`;
        ctx.beginPath();
        ctx.arc(g.x, g.y, 10 + t * 110, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="drone-layer" aria-hidden="true">
      <canvas ref={canvasRef} className="drone-canvas" />
      <div ref={hudRef} className="drone-hud mono" />
      <div ref={droneRef} className="drone">
        <div ref={bodyRef} className="drone-body" onClick={() => clickRef.current()}>
          <div className="drone-glow" />
          <svg viewBox="-60 -60 120 120" width="96" height="96">
            {/* arms */}
            <g stroke="#2a2a2a" strokeWidth="7" strokeLinecap="round">
              <line x1="-34" y1="-34" x2="34" y2="34" />
              <line x1="34" y1="-34" x2="-34" y2="34" />
            </g>
            <g stroke="#555" strokeWidth="1.2">
              <line x1="-34" y1="-34" x2="34" y2="34" />
              <line x1="34" y1="-34" x2="-34" y2="34" />
            </g>
            {/* rotors */}
            {[[-34, -34, 'cw'], [34, -34, 'ccw'], [34, 34, 'cw'], [-34, 34, 'ccw']].map(([x, y, dir], i) => (
              <g key={i} transform={`translate(${x} ${y})`}>
                <circle r="21" className="drone-disc" />
                <circle r="21" fill="none" stroke="rgba(224,40,58,0.35)" strokeWidth="1" />
                <g className={`drone-prop drone-prop--${dir}`}>
                  <rect x="-20" y="-2" width="40" height="4" rx="2" fill="rgba(230,230,230,0.75)" />
                  <rect x="-2" y="-20" width="4" height="40" rx="2" fill="rgba(230,230,230,0.35)" />
                </g>
                <circle r="4.5" fill="#1a1a1a" stroke="#666" strokeWidth="1" />
              </g>
            ))}
            {/* fuselage */}
            <rect x="-15" y="-21" width="30" height="42" rx="9" fill="#141414" stroke="#3a3a3a" strokeWidth="1.2" />
            <path d="M-11 -12 L0 -19 L11 -12 L11 8 L-11 8 Z" fill="url(#droneCrimson)" />
            <circle cx="0" cy="-15" r="3.2" fill="#0a0a0a" stroke="#E0283A" strokeWidth="1" />
            <rect x="-6" y="12" width="12" height="3" rx="1.5" fill="#2e2e2e" />
            {/* nav lights */}
            <circle cx="-48" cy="-48" r="2.6" className="drone-light drone-light--red" />
            <circle cx="48" cy="-48" r="2.6" className="drone-light drone-light--white" />
            <defs>
              <linearGradient id="droneCrimson" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A00000" />
                <stop offset="50%" stopColor="#82000E" />
                <stop offset="100%" stopColor="#5A0018" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DroneFlyer;
