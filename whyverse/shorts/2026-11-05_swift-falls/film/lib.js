// Whyverse short — neon prop library: glow text, chips, counters, stamps, bursts, stars, Earth, Swift, robot.
// Every function is a pure function of its arguments + t. Text never boils (FEEDBACK 2026-11-04).
(function () {
  const G = globalThis.G, U = globalThis.U, Data = globalThis.Data;
  const { clamp, lerp, ease } = U;
  G.setStyle('neon', { textBoil: 0, amp: 0.15 });
  const P = {};
  const C = P.C = {
    night: '#07071A', navy: '#141A3D', cyan: '#4FE3FF', blue: '#4FA3E0', gold: '#FFC857', coral: '#FF7A5C',
    pink: '#FF4FD8', violet: '#9B7BFF', green: '#5CFFA8', red: '#FF4A5A', white: '#F4F8FF', dim: '#8FA3C8', fire: '#FF9A3C',
  };
  P.rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; };
  const SAFE = G.SAFE; P.CX = SAFE.x + SAFE.w / 2; // 500 on 1080x1920
  P.FT = { title: 'Bungee', ui: 'Inter' };
  const pop = P.pop = (t, t0, d = 0.32, s = 2.2) => (t < t0 ? 0 : ease.outBack(clamp((t - t0) / d), s));
  const fin = P.fin = (t, t0, d = 0.3) => clamp((t - t0) / d);
  const fout = P.fout = (t, t1, d = 0.3) => 1 - clamp((t - (t1 - d)) / d);
  P.win = (t, t0, t1, d = 0.3) => Math.min(fin(t, t0, d), fout(t, t1, d));
  P.at = (ctx, x, y, s, rot, fn) => { ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot); if (s !== 1) ctx.scale(s, s); fn(); ctx.restore(); };
  const glowOn = (ctx, color, blur) => { ctx.shadowColor = color; ctx.shadowBlur = blur; };
  const glowOff = (ctx) => { ctx.shadowBlur = 0; ctx.shadowColor = 'transparent'; };

  // ---------- background: deep night, 3 layers of drifting stars, faint nebula ----------
  P.bg = (ctx, t, { drift = 1, nebula = C.violet, n = 220 } = {}) => {
    G.bg(ctx, C.night);
    const g = ctx.createRadialGradient(G.W * 0.7, G.H * 0.25, 0, G.W * 0.7, G.H * 0.25, G.H * 0.6);
    g.addColorStop(0, 'rgba(120,70,220,0.18)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, G.W, G.H);
    for (let i = 0; i < n; i++) {
      const layer = i % 3, sp = (6 + layer * 9) * drift;
      const x = ((U.hash(i, 1) * (G.W + 100) - t * sp) % (G.W + 100) + G.W + 100) % (G.W + 100) - 50;
      const y = U.hash(i, 2) * G.H;
      const r = 0.8 + layer * 0.7 + 1.6 * Math.pow(U.hash(i, 3), 6);
      ctx.globalAlpha = (0.35 + 0.5 * U.hash(i, 5)) * (0.65 + 0.35 * Math.sin(t * (1 + 2 * U.hash(i, 4)) + i));
      ctx.fillStyle = U.hash(i, 6) < 0.15 ? '#BFE8FF' : '#FFF4D6';
      ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  // ---------- text ----------
  P.text = (ctx, s, x, y, o = {}) => {
    const { size = 64, color = C.white, fam = P.FT.title, weight = 400, align = 'center', alpha = 1, glow = true, stroke } = o;
    ctx.save(); ctx.globalAlpha *= alpha;
    if (glow) glowOn(ctx, color, size * 0.4);
    G.text(ctx, s, x, y, { size, fam, weight, color, align, boil: 0, stroke, strokeW: stroke ? 6 : 8 });
    ctx.restore();
  };
  // pops in at t0 (scale), fades by t1
  P.pText = (ctx, s, x, y, t, t0, t1 = 1e9, o = {}) => {
    const k = pop(t, t0, 0.3, 1.8) * fout(t, t1, 0.25); if (k <= 0.01) return;
    P.at(ctx, x, y, k, o.rot || 0, () => P.text(ctx, s, 0, 0, Object.assign({}, o, { alpha: (o.alpha || 1) * clamp(k * 1.5) })));
  };
  // a glass chip with a glowing border + text
  P.chip = (ctx, s, x, y, t, t0, t1 = 1e9, { size = 40, color = C.cyan, fam = P.FT.ui, weight = 800, pad = 26, txt = C.white } = {}) => {
    const k = pop(t, t0, 0.3, 1.6) * fout(t, t1, 0.25); if (k <= 0.01) return;
    const w = G.measure(ctx, s, size, fam, weight) + pad * 2, h = size * 1.6;
    P.at(ctx, x, y, k, 0, () => {
      ctx.globalAlpha *= clamp(k * 1.5);
      ctx.fillStyle = 'rgba(20,26,61,0.72)'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, h / 2); ctx.fill();
      glowOn(ctx, color, 18); ctx.strokeStyle = color; ctx.lineWidth = 4; ctx.stroke(); glowOff(ctx);
      G.text(ctx, s, 0, size * 0.36, { size, fam, weight, color: txt, align: 'center', boil: 0 });
    });
  };
  // a neon stamp that slams down at t0
  P.stamp = (ctx, s, x, y, t, t0, { size = 84, color = C.red, rot = -0.08, t1 = 1e9 } = {}) => {
    if (t < t0) return; const a = clamp((t - t0) / 0.14), k = lerp(2.2, 1, ease.outCubic(a)) * fout(t, t1, 0.3);
    if (k <= 0.01) return;
    const w = G.measure(ctx, s, size, P.FT.title, 400) + 64, h = size * 1.45;
    P.at(ctx, x, y, k, rot, () => {
      ctx.globalAlpha *= clamp(a * 2);
      ctx.fillStyle = 'rgba(7,7,26,0.75)'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 18); ctx.fill();
      glowOn(ctx, color, 30); ctx.strokeStyle = color; ctx.lineWidth = 8; ctx.stroke(); glowOff(ctx);
      P.text(ctx, s, 0, size * 0.36, { size, color });
    });
  };
  // big glowing counter
  P.counter = (ctx, { x, y, from = 0, to, t, t0, t1, size = 150, color = C.gold, prefix = '', suffix = '', decimals = 0, alpha = 1, k = 1 }) => {
    if (alpha <= 0 || t < t0 - 0.3) return;
    const v = Data.count(t, t0, t1, from, to, ease.outCubic);
    const str = prefix + Data.number(v, { decimals }) + suffix;
    const land = t >= t1 ? Math.exp(-(t - t1) * 8) : 0;
    const kk = pop(t, t0 - 0.3, 0.3) * k * (1 + 0.1 * land);
    P.at(ctx, x, y, kk, 0, () => P.text(ctx, str, 0, 0, { size, color, alpha }));
  };

  // ---------- FX ----------
  P.burst = (ctx, x, y, t, t0, { color = C.pink, size = 120, n = 14, seed = 1 } = {}) => {
    const a = t - t0; if (a < 0 || a > 1.6) return;
    const u = clamp(a / 1.6), r = size * ease.outCubic(clamp(a / 0.9));
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createRadialGradient(x, y, 0, x, y, size * 1.2);
    g.addColorStop(0, `rgba(255,255,255,${0.9 * (1 - u) * (1 - u)})`); g.addColorStop(0.3, P.rgba(color, 0.55 * (1 - u))); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(x - size * 1.3, y - size * 1.3, size * 2.6, size * 2.6);
    glowOn(ctx, color, 20); ctx.strokeStyle = color; ctx.lineCap = 'round'; ctx.globalAlpha = 1 - u;
    for (let i = 0; i < n; i++) {
      const ang = (i / n) * Math.PI * 2 + U.hash(i, seed) * 0.4, r0 = r * 0.45, r1 = r * (0.85 + 0.3 * U.hash(i, seed + 1));
      ctx.lineWidth = 5 * (1 - u) + 1; ctx.beginPath(); ctx.moveTo(x + Math.cos(ang) * r0, y + Math.sin(ang) * r0); ctx.lineTo(x + Math.cos(ang) * r1, y + Math.sin(ang) * r1); ctx.stroke();
    }
    ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r * 1.05, 0, 7); ctx.stroke();
    ctx.restore();
  };
  P.flash = (ctx, t, t0, { color = '255,255,255', a = 0.35, d = 0.25 } = {}) => {
    const u = t - t0; if (u < 0 || u > d) return; ctx.fillStyle = `rgba(${color},${a * (1 - u / d)})`; ctx.fillRect(0, 0, G.W, G.H);
  };
  // a fiery streak from (x0,y0) to (x1,y1), head at progress p (0..1)
  P.fireTrail = (ctx, x0, y0, x1, y1, p, { len = 0.45, w = 26, alpha = 1 } = {}) => {
    const hx = lerp(x0, x1, p), hy = lerp(y0, y1, p), q = Math.max(0, p - len), tx = lerp(x0, x1, q), ty = lerp(y0, y1, q);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha *= alpha;
    const g = ctx.createLinearGradient(tx, ty, hx, hy); g.addColorStop(0, 'rgba(255,80,40,0)'); g.addColorStop(0.7, 'rgba(255,140,50,0.6)'); g.addColorStop(1, 'rgba(255,240,200,1)');
    ctx.strokeStyle = g; ctx.lineCap = 'round';
    for (const [lw, a] of [[w * 2.2, 0.25], [w, 0.7], [w * 0.35, 1]]) { ctx.globalAlpha = a * alpha; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx, hy); ctx.stroke(); }
    const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, w * 2.4); hg.addColorStop(0, 'rgba(255,255,230,1)'); hg.addColorStop(0.4, 'rgba(255,170,60,0.7)'); hg.addColorStop(1, 'rgba(255,80,40,0)');
    ctx.globalAlpha = alpha; ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(hx, hy, w * 2.4, 0, 7); ctx.fill();
    ctx.restore(); return [hx, hy];
  };

  // ---------- Earth (stylised neon globe) ----------
  P.earth = (ctx, x, y, r, t, { atmo = 1, atmoGlow = 0, spin = 0.15 } = {}) => {
    ctx.save();
    // atmosphere ring (thickness atmo)
    const ar = r * (1 + 0.07 * atmo);
    const ag = ctx.createRadialGradient(x, y, r * 0.98, x, y, ar * 1.25);
    ag.addColorStop(0, `rgba(79,227,255,${0.55 + 0.3 * atmoGlow})`); ag.addColorStop(0.45, `rgba(79,163,224,${0.25 + 0.25 * atmoGlow})`); ag.addColorStop(1, 'rgba(79,163,224,0)');
    ctx.fillStyle = ag; ctx.beginPath(); ctx.arc(x, y, ar * 1.25, 0, 7); ctx.fill();
    // body
    const bg = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
    bg.addColorStop(0, '#2C6FB8'); bg.addColorStop(1, '#0B1E4A');
    ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    // meridians + parallels (spinning)
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip();
    ctx.strokeStyle = 'rgba(79,227,255,0.35)'; ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) { const ph = ((i / 6 + t * spin * 0.1) % 1) * Math.PI; const rx = Math.abs(Math.cos(ph)) * r; ctx.beginPath(); ctx.ellipse(x, y, rx, r, 0, 0, 7); ctx.stroke(); }
    for (let k = -2; k <= 2; k++) { ctx.beginPath(); ctx.ellipse(x, y + k * r * 0.36, Math.sqrt(1 - Math.pow(k * 0.36, 2)) * r, r * 0.06, 0, 0, 7); ctx.stroke(); }
    // land blobs drifting with spin
    ctx.fillStyle = 'rgba(92,255,168,0.28)';
    for (let i = 0; i < 7; i++) {
      const lon = ((U.hash(i, 9) + t * spin * 0.1) % 1) * 2 - 1, lat = (U.hash(i, 10) - 0.5) * 1.3;
      const px = x + Math.sin(lon * Math.PI) * r * Math.cos(lat * 0.9), py = y + lat * r * 0.7;
      if (Math.cos(lon * Math.PI) < 0) continue;
      ctx.beginPath(); ctx.ellipse(px, py, r * (0.12 + 0.12 * U.hash(i, 11)) * Math.cos(lon * Math.PI) + 4, r * (0.08 + 0.1 * U.hash(i, 12)), U.hash(i, 13), 0, 7); ctx.fill();
    }
    // night-side shade
    const sh = ctx.createLinearGradient(x - r, y - r, x + r, y + r); sh.addColorStop(0.45, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(0,0,10,0.6)');
    ctx.fillStyle = sh; ctx.fillRect(x - r, y - r, r * 2, r * 2);
    ctx.restore();
    glowOn(ctx, C.cyan, 24); ctx.strokeStyle = C.cyan; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.stroke(); glowOff(ctx);
    ctx.restore();
  };

  // ---------- the Swift observatory (stylised): body, telescope tube, two solar wings ----------
  P.swift = (ctx, x, y, s, rot, t, { heat = 0, alpha = 1 } = {}) => {
    P.at(ctx, x, y, s, rot, () => {
      ctx.globalAlpha *= alpha;
      const body = heat > 0 ? `rgb(255,${Math.round(200 - 120 * heat)},${Math.round(87 - 60 * heat)})` : C.gold;
      // wings
      for (const side of [-1, 1]) {
        const wx = side * 150;
        ctx.strokeStyle = C.dim; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(side * 48, 0); ctx.lineTo(wx - side * 75, 0); ctx.stroke();
        ctx.fillStyle = 'rgba(79,163,224,0.35)'; ctx.fillRect(wx - 75, -48, 150, 96);
        glowOn(ctx, C.cyan, 16); ctx.strokeStyle = C.cyan; ctx.lineWidth = 4; ctx.strokeRect(wx - 75, -48, 150, 96); glowOff(ctx);
        ctx.strokeStyle = 'rgba(79,227,255,0.5)'; ctx.lineWidth = 2; ctx.beginPath();
        for (let i = 1; i < 5; i++) { ctx.moveTo(wx - 75 + i * 30, -48); ctx.lineTo(wx - 75 + i * 30, 48); }
        ctx.moveTo(wx - 75, 0); ctx.lineTo(wx + 75, 0); ctx.stroke();
        // panel glint sweeping
        const gx = ((t * 0.6 + (side > 0 ? 0.5 : 0)) % 2) * 220 - 110 + wx;
        if (Math.abs(gx - wx) < 75) { ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fillRect(gx - 8, -48, 16, 96); }
      }
      // telescope tube (points "up")
      ctx.fillStyle = 'rgba(255,200,87,0.18)'; ctx.fillRect(-34, -150, 68, 80);
      glowOn(ctx, body, 18); ctx.strokeStyle = body; ctx.lineWidth = 5; ctx.strokeRect(-34, -150, 68, 80);
      ctx.beginPath(); ctx.ellipse(0, -150, 34, 10, 0, 0, 7); ctx.stroke();
      // body
      ctx.fillStyle = 'rgba(255,200,87,0.22)'; ctx.beginPath(); ctx.roundRect(-50, -72, 100, 140, 14); ctx.fill(); ctx.stroke();
      glowOff(ctx);
      ctx.strokeStyle = 'rgba(255,200,87,0.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-50, -20); ctx.lineTo(50, -20); ctx.moveTo(-50, 25); ctx.lineTo(50, 25); ctx.stroke();
      // blinking light
      const blink = (t * 1.3) % 1 < 0.15 ? 1 : 0.25; ctx.fillStyle = `rgba(255,74,90,${blink})`; glowOn(ctx, C.red, 12 * blink);
      ctx.beginPath(); ctx.arc(0, 50, 7, 0, 7); ctx.fill(); glowOff(ctx);
      // little dish
      ctx.strokeStyle = C.white; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(30, 68); ctx.lineTo(42, 92); ctx.stroke(); ctx.beginPath(); ctx.arc(46, 98, 12, Math.PI * 1.1, Math.PI * 2.1); ctx.stroke();
    });
  };

  // ---------- the rescue robot (a cute tug with eyes and two grabber arms) ----------
  P.robot = (ctx, x, y, s, rot, t, { mood = 'ok', flame = 1, armReach = 0, alpha = 1 } = {}) => {
    P.at(ctx, x, y, s, rot, () => {
      ctx.globalAlpha *= alpha;
      // thruster flame (behind, to the left)
      if (flame > 0) {
        const fl = (50 + 18 * Math.sin(t * 40)) * flame;
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        const g = ctx.createLinearGradient(-60, 0, -60 - fl, 0); g.addColorStop(0, 'rgba(255,240,200,0.95)'); g.addColorStop(1, 'rgba(255,79,216,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-58, -22); ctx.lineTo(-60 - fl, 0); ctx.lineTo(-58, 22); ctx.fill(); ctx.restore();
      }
      // arms (to the right)
      ctx.strokeStyle = C.pink; ctx.lineWidth = 7; ctx.lineCap = 'round'; glowOn(ctx, C.pink, 14);
      for (const side of [-1, 1]) {
        const ex = 70 + 40 * armReach, ey = side * (30 - 10 * armReach);
        ctx.beginPath(); ctx.moveTo(50, side * 20); ctx.lineTo(ex, ey); ctx.lineTo(ex + 22, ey + side * 6); ctx.stroke();
      }
      // body
      ctx.fillStyle = 'rgba(255,79,216,0.2)'; ctx.beginPath(); ctx.roundRect(-58, -58, 116, 116, 26); ctx.fill();
      ctx.lineWidth = 5; ctx.stroke(); glowOff(ctx);
      // antenna
      ctx.strokeStyle = C.white; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, -58); ctx.lineTo(0, -86); ctx.stroke();
      ctx.fillStyle = mood === 'broken' ? C.red : C.green; glowOn(ctx, ctx.fillStyle, 12); ctx.beginPath(); ctx.arc(0, -90, 7, 0, 7); ctx.fill(); glowOff(ctx);
      // face screen
      ctx.fillStyle = 'rgba(7,7,26,0.85)'; ctx.beginPath(); ctx.roundRect(-40, -34, 80, 56, 14); ctx.fill();
      ctx.strokeStyle = C.cyan; ctx.lineWidth = 3; ctx.stroke();
      ctx.fillStyle = C.cyan; ctx.strokeStyle = C.cyan; glowOn(ctx, C.cyan, 10);
      if (mood === 'broken') {
        ctx.lineWidth = 4; for (const ex of [-16, 16]) { ctx.beginPath(); ctx.moveTo(ex - 8, -16); ctx.lineTo(ex + 8, -2); ctx.moveTo(ex + 8, -16); ctx.lineTo(ex - 8, -2); ctx.stroke(); }
        ctx.beginPath(); ctx.moveTo(-14, 12); for (let i = 0; i <= 4; i++) ctx.lineTo(-14 + i * 7, 12 + (i % 2 ? -5 : 0)); ctx.stroke();
      } else {
        const bl = (t * 0.7) % 1 < 0.06 ? 0.15 : 1;
        for (const ex of [-16, 16]) { ctx.beginPath(); ctx.ellipse(ex, -9, 7, 9 * bl, 0, 0, 7); ctx.fill(); }
        ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 4, 12, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke();
      }
      glowOff(ctx);
    });
  };

  // ---------- Whyverse brand planet (blue, ringed) ----------
  P.planet = (ctx, x, y, r, t) => {
    ctx.save();
    const rot = -0.35;
    const ring = (front) => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = C.gold; ctx.lineWidth = r * 0.09; glowOn(ctx, C.gold, 20); ctx.beginPath(); ctx.ellipse(0, 0, r * 1.75, r * 0.45, 0, front ? 0 : Math.PI, front ? Math.PI : Math.PI * 2); ctx.stroke(); ctx.restore(); };
    ring(false);
    const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.35, r * 0.1, x, y, r); g.addColorStop(0, '#8FD0FF'); g.addColorStop(1, '#2A5FB0');
    ctx.fillStyle = g; glowOn(ctx, C.blue, 40); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); glowOff(ctx);
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip(); ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = r * 0.12;
    for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(x - r, y + k * r * 0.4 + Math.sin(t + k) * 4); ctx.lineTo(x + r, y + k * r * 0.4 - r * 0.2 + Math.sin(t + k) * 4); ctx.stroke(); }
    ctx.restore();
    ring(true);
    ctx.restore();
  };

  globalThis.P = P;
})();
