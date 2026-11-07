// Whyverse ep03 — "neon" prop + HUD library. Pure functions of their args + t (no randomness, no boil on text).
// FEEDBACK 2026-11-04: text never jitters, camera shake only on real impacts (≤ 6 px, ≤ 0.3 s), pushes ≤ 3 %.
(function () {
  const G = globalThis.G, U = globalThis.U, Data = globalThis.Data;
  const { clamp, lerp, ease } = U;
  const P = {};
  const C = P.C = {
    bg: '#07071A', bg2: '#100B2E', navy: '#1B2350', navyD: '#0B0D24', gold: '#FFC43D', amber: '#FFB347', coral: '#FF7B5B',
    cyan: '#5FE3FF', magenta: '#FF5FD2', violet: '#9B7BFF', planet: '#4FA3E0', white: '#EEF7FF', dim: '#9AA6C8', green: '#5CFFB0',
    red: '#FF4D6A', glass: 'rgba(10,8,30,0.78)', star: '#F4F1FF', hot: '#FFF2C8',
  };
  P.FT = { title: 'Bungee', ui: 'Inter', hand: 'Caveat' };
  const pop = P.pop = (t, t0, d = 0.32, s = 2.0) => (t < t0 ? 0 : ease.outBack(clamp((t - t0) / d), s));
  const fin = P.fin = (t, t0, d = 0.3) => clamp((t - t0) / d);
  const fout = P.fout = (t, t1, d = 0.3) => 1 - clamp((t - (t1 - d)) / d);
  P.win = (t, t0, t1, d = 0.3) => Math.min(fin(t, t0, d), fout(t, t1, d));
  P.at = (ctx, x, y, s, rot, fn) => { ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot); if (s !== 1) ctx.scale(s, s); fn(); ctx.restore(); };
  P.eio = (x) => ease.inOutCubic(clamp(x));
  P.oc = (x) => ease.outCubic(clamp(x));
  const hex = (h) => { const m = /^#?([0-9a-f]{6})$/i.exec(h || ''); if (!m) return null; const n = parseInt(m[1], 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  P.mix = (a, b, k) => { const pa = hex(a), pb = hex(b); if (!pa || !pb) return a; const f = (i) => Math.round(pa[i] + (pb[i] - pa[i]) * clamp(k)); return `rgb(${f(0)},${f(1)},${f(2)})`; };
  P.rgba = (h, a) => { const p = hex(h); return p ? `rgba(${p[0]},${p[1]},${p[2]},${a})` : h; };

  // ---------- neon primitives ----------
  // a glowing tube: path(ctx) builds the path; drawn as halo + body + hot core, additive
  P.tube = (ctx, path, color = C.cyan, lw = 6, a = 1, { fill = null, fillA = 0.12, core = true } = {}) => {
    if (a <= 0.01) return; ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (fill) { ctx.globalAlpha = a * fillA; ctx.fillStyle = fill === true ? color : fill; path(ctx); ctx.fill(); }
    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = color; path(ctx);
    ctx.globalAlpha = a * 0.16; ctx.lineWidth = lw * 4.2; ctx.stroke();
    ctx.globalAlpha = a * 0.35; ctx.lineWidth = lw * 2.1; ctx.stroke();
    ctx.globalAlpha = a * 0.95; ctx.lineWidth = lw; ctx.stroke();
    if (core) { ctx.strokeStyle = 'rgba(255,255,255,0.75)'; ctx.globalAlpha = a * 0.8; ctx.lineWidth = Math.max(1, lw * 0.35); ctx.stroke(); }
    ctx.restore();
  };
  P.circle = (ctx, x, y, r, color, lw = 5, a = 1, o = {}) => P.tube(ctx, (c) => { c.beginPath(); c.arc(x, y, Math.max(0.1, r), 0, 6.2832); }, color, lw, a, o);
  P.line = (ctx, x0, y0, x1, y1, color, lw = 5, a = 1, k = 1) => P.tube(ctx, (c) => { c.beginPath(); c.moveTo(x0, y0); c.lineTo(lerp(x0, x1, k), lerp(y0, y1, k)); }, color, lw, a);
  P.rr = (ctx, x, y, w, h, r) => { r = Math.min(r, w / 2, h / 2); ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); };
  P.box = (ctx, x, y, w, h, color = C.cyan, { r = 26, lw = 3, a = 1, fill = C.glass } = {}) => {
    if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; P.rr(ctx, x, y, w, h, r); ctx.fillStyle = fill; ctx.fill(); ctx.restore();
    P.tube(ctx, (c) => P.rr(c, x, y, w, h, r), color, lw, a * 0.9, { core: false });
  };
  P.panel = (ctx, x, y, w, h, o = {}) => P.box(ctx, x, y, w, h, o.stroke || C.violet, { r: o.r || 26, lw: 2.5, a: o.a == null ? 1 : o.a, fill: o.fill || C.glass });
  // soft radial light
  P.glow = (ctx, x, y, r, color = '#FFE6A8', a = 1) => {
    if (a <= 0.005 || r <= 1) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, P.rgba(color, 0.9 * a)); g.addColorStop(0.25, P.rgba(color, 0.35 * a)); g.addColorStop(1, P.rgba(color, 0));
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore();
  };
  // a twinkly 4-spike star (for hero stars)
  P.spark = (ctx, x, y, r, color = C.star, a = 1) => {
    if (a <= 0.01 || r <= 0.2) return; P.glow(ctx, x, y, r * 4, color, a * 0.7);
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = a; ctx.fillStyle = '#FFFFFF';
    ctx.beginPath(); ctx.moveTo(x, y - r * 2.4); ctx.quadraticCurveTo(x, y, x + r * 2.4, y); ctx.quadraticCurveTo(x, y, x, y + r * 2.4); ctx.quadraticCurveTo(x, y, x - r * 2.4, y); ctx.quadraticCurveTo(x, y, x, y - r * 2.4); ctx.fill();
    ctx.restore();
  };

  // ---------- text ----------
  P.text = (ctx, s, x, y, o = {}) => G.text(ctx, s, x, y, Object.assign({ size: 54, fam: P.FT.ui, weight: 800, color: C.white, boil: 0 }, o));
  P.label = (ctx, s, x, y, o = {}) => G.text(ctx, String(s).toUpperCase(), x, y, Object.assign({ size: 30, fam: P.FT.ui, weight: 700, color: C.dim, boil: 0 }, o));
  P.measure = (ctx, s, size, fam = P.FT.ui, w = 800) => G.measure(ctx, s, size, fam, w);
  // neon sign word (Bungee, glowing outline colour)
  P.sign = (ctx, s, x, y, { size = 96, color = C.gold, a = 1, align = 'center', flick = 0 } = {}) => {
    if (a <= 0.01) return; G.text(ctx, s, x, y, { size, fam: P.FT.title, weight: 400, color, align, alpha: a * (1 - flick), boil: 0 });
  };
  P.tag = (ctx, s, x, y, t, t0, t1 = 1e9, { size = 40, color = C.white, border = C.gold, align = 'center', pad = 26, rot = 0, fam = P.FT.ui, weight = 800 } = {}) => {
    const k = pop(t, t0) * fout(t, t1, 0.25); if (k <= 0.01) return;
    const w = P.measure(ctx, s, size, fam, weight) + pad * 2, h = size * 1.55;
    const ox = align === 'left' ? w / 2 : align === 'right' ? -w / 2 : 0;
    ctx.save(); ctx.translate(x + ox, y); ctx.rotate(rot); ctx.scale(k, k); ctx.globalAlpha *= clamp(k * 1.5);
    P.box(ctx, -w / 2, -h / 2, w, h, border, { r: h / 2, lw: 3 });
    G.text(ctx, s, 0, size * 0.36, { size, fam, weight, color, align: 'center', boil: 0 });
    ctx.restore(); return w;
  };
  P.stamp = (ctx, s, x, y, t, t0, { size = 92, color = C.gold, rot = -0.05, t1 = 1e9 } = {}) => {
    if (t < t0) return; const a = clamp((t - t0) / 0.14), k = lerp(1.8, 1, ease.outCubic(a)) * fout(t, t1, 0.3); if (k <= 0.01) return;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.globalAlpha *= clamp(a * 2);
    const w = P.measure(ctx, s, size, P.FT.title, 400) + 70, h = size * 1.42;
    P.box(ctx, -w / 2, -h / 2, w, h, color, { r: 20, lw: 5, fill: 'rgba(8,6,24,0.82)' });
    G.text(ctx, s, 0, size * 0.36, { size, fam: P.FT.title, weight: 400, color, align: 'center', boil: 0 });
    ctx.restore();
  };
  P.counter = (ctx, { x, y, from = 0, to, t, t0, t1, size = 120, color = C.gold, prefix = '', suffix = '', decimals = 0, sub = '', subSize = 34, card = true, tEnd = 1e9, fmt, border = C.violet }) => {
    const k = pop(t, t0 - 0.25, 0.35) * fout(t, tEnd, 0.3); if (k <= 0.01) return;
    const v = Data.count(t, t0, t1, from, to, ease.outCubic); const f = fmt || ((n) => Data.number(n, { decimals }));
    const str = prefix + f(v) + suffix, strF = prefix + f(to) + suffix; const land = t >= t1 ? Math.exp(-(t - t1) * 8) : 0;
    const w = Math.max(P.measure(ctx, strF, size, P.FT.title, 400), sub ? P.measure(ctx, sub.toUpperCase(), subSize, P.FT.ui, 700) : 0) + 90, h = size * 1.25 + (sub ? subSize * 1.5 : 0);
    ctx.save(); ctx.translate(x, y); const sc = k * (1 + 0.05 * land); ctx.scale(sc, sc); ctx.globalAlpha *= clamp(k * 1.4);
    if (card) P.box(ctx, -w / 2, -size * 0.95, w, h + 10, land > 0.05 ? color : border, { r: 26, lw: 3 });
    G.text(ctx, str, 0, size * 0.18, { size, fam: P.FT.title, weight: 400, color, align: 'center', boil: 0 });
    if (sub) G.text(ctx, sub.toUpperCase(), 0, size * 0.2 + subSize * 1.35, { size: subSize, fam: P.FT.ui, weight: 700, color: C.dim, align: 'center', boil: 0 });
    ctx.restore();
  };
  P.kicker = (ctx, s, t, t0, { x = 110, y = 110, t1 = 1e9, color = C.cyan } = {}) => {
    const a = P.win(t, t0, t1, 0.35); if (a <= 0) return;
    P.line(ctx, x, y - 10, x + 46 * ease.outCubic(a), y - 10, color, 4, a);
    G.text(ctx, s.toUpperCase(), x + 66, y, { size: 28, fam: P.FT.ui, weight: 700, color: C.dim, alpha: a, boil: 0 });
  };
  P.arrow = (ctx, ax, ay, bx, by, { color = C.gold, lw = 6, head = 24, k = 1, a = 1 } = {}) => {
    if (k <= 0.001 || a <= 0) return; const ex = lerp(ax, bx, k), ey = lerp(ay, by, k), ang = Math.atan2(ey - ay, ex - ax);
    P.tube(ctx, (c) => { c.beginPath(); c.moveTo(ax, ay); c.lineTo(ex, ey); c.moveTo(ex - Math.cos(ang - 0.5) * head, ey - Math.sin(ang - 0.5) * head); c.lineTo(ex, ey); c.lineTo(ex - Math.cos(ang + 0.5) * head, ey - Math.sin(ang + 0.5) * head); }, color, lw, a);
  };
  P.ring = (ctx, x, y, t, t0, { r = 120, color = C.gold, dur = 0.8, lw = 5 } = {}) => {
    const a = (t - t0) / dur; if (a < 0 || a > 1) return; P.circle(ctx, x, y, r * ease.outCubic(a), color, lw * (1 - a) + 1, 1 - a, { core: false });
  };
  P.sparkle = (ctx, x, y, t, t0, { n = 12, r = 80, color = C.gold, seed = 1 } = {}) => {
    const a = t - t0; if (a < 0 || a > 0.7) return; const k = a / 0.7;
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < n; i++) { const ang = (i / n) * 6.283 + U.hash(i, seed) * 0.6, d = r * ease.outCubic(k) * (0.6 + 0.6 * U.hash(i, seed + 1));
      ctx.fillStyle = color; ctx.globalAlpha = 1 - k; ctx.beginPath(); ctx.arc(x + Math.cos(ang) * d, y + Math.sin(ang) * d, 5 * (1 - k) + 2, 0, 7); ctx.fill(); }
    ctx.restore();
  };
  P.hbar = (ctx, { x, y, w, h = 54, frac, t, t0, d = 0.8, color = C.gold, label = '', value = '', t1 = 1e9 }) => {
    const k = ease.outCubic(clamp((t - t0) / d)); const a = fin(t, t0 - 0.2, 0.3) * fout(t, t1, 0.3); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a; P.rr(ctx, x, y, w, h, h / 2); ctx.fillStyle = 'rgba(255,255,255,0.07)'; ctx.fill(); ctx.restore();
    if (k > 0.01) P.tube(ctx, (c) => P.rr(c, x, y, Math.max(h, w * frac * k), h, h / 2), color, 3, a, { fill: true, fillA: 0.55, core: false });
    if (label) P.label(ctx, label, x, y - 18, { size: 30, alpha: a });
    if (value) G.text(ctx, value, x + Math.max(h, w * frac * k) + 22, y + h * 0.78, { size: h * 0.85, fam: P.FT.title, weight: 400, color: C.white, alpha: a * fin(t, t0 + d * 0.6, 0.3), boil: 0 });
  };

  // ---------- backgrounds ----------
  P.stars = (ctx, t, { n = 260, a = 1, seed = 1, y1 = G.H, x0 = 0, w = G.W, y0 = 0, tw = 1, size = 1 } = {}) => {
    if (a <= 0.01) return; ctx.save(); ctx.fillStyle = C.star;
    for (let i = 0; i < n; i++) { const x = x0 + U.hash(i, seed) * w, y = y0 + U.hash(i, seed + 1) * (y1 - y0), r = (0.8 + 2.2 * Math.pow(U.hash(i, seed + 2), 5)) * size;
      ctx.globalAlpha = a * (0.4 + 0.6 * U.hash(i, seed + 3)) * (1 - tw * 0.3 + tw * 0.3 * Math.sin(t * (0.7 + U.hash(i, seed + 4) * 1.8) + i));
      ctx.fillRect(x - r, y - r, r * 2, r * 2); }
    ctx.restore();
  };
  P.sky = (ctx, t, { top = C.bg, bottom = C.bg2, stars = 1, seed = 1, n = 260, haze = 0.35 } = {}) => {
    const g = ctx.createLinearGradient(0, 0, 0, G.H); g.addColorStop(0, top); g.addColorStop(1, bottom); ctx.fillStyle = g; ctx.fillRect(-300, -300, G.W + 600, G.H + 600);
    if (haze) { const r = ctx.createRadialGradient(G.W * 0.5, G.H * 0.75, 0, G.W * 0.5, G.H * 0.75, G.W * 0.75); r.addColorStop(0, `rgba(90,40,170,${haze})`); r.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = r; ctx.fillRect(0, 0, G.W, G.H); }
    if (stars) P.stars(ctx, t, { a: stars, seed, n });
  };
  // neon hills / skyline silhouette along the bottom
  P.hills = (ctx, t, { y = 900, color = C.magenta, seed = 7, a = 1, city = 0, fill = '#05040F' } = {}) => {
    const pts = []; for (let i = 0; i <= 32; i++) { const x = -40 + i * 64; pts.push([x, y - 60 * Math.sin(i * 0.35 + seed) - 30 * U.hash(i, seed)]); }
    const path = (c) => { c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) { const p = pts[i - 1], q = pts[i]; c.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } };
    ctx.save(); path(ctx); ctx.lineTo(G.W + 60, G.H + 50); ctx.lineTo(-60, G.H + 50); ctx.closePath(); ctx.fillStyle = fill; ctx.globalAlpha = a; ctx.fill(); ctx.restore();
    P.tube(ctx, path, color, 4, a, { core: false });
    if (city > 0) for (let i = 0; i < 14; i++) { const bx = 1180 + i * 52, bh = 60 + 160 * U.hash(i, 3), by = y - 40;
      ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = fill; ctx.fillRect(bx, by - bh, 46, bh + 200); ctx.restore();
      P.tube(ctx, (c) => { c.beginPath(); c.rect(bx, by - bh, 46, bh + 200); }, C.cyan, 2, a * 0.6, { core: false });
      for (let j = 0; j < Math.floor(bh / 34); j++) if (U.hash(i, j + 9) < 0.55 * city) { ctx.save(); ctx.globalAlpha = a * city; ctx.fillStyle = C.amber; ctx.fillRect(bx + 10 + (j % 2) * 16, by - bh + 14 + j * 30, 9, 12); ctx.restore(); } }
  };
  // light-pollution dome over a city
  P.dome = (ctx, x, y, r, a = 1) => { if (a <= 0) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, `rgba(255,170,90,${0.55 * a})`); g.addColorStop(0.5, `rgba(255,120,80,${0.18 * a})`); g.addColorStop(1, 'rgba(255,120,80,0)'); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); };

  // ---------- props ----------
  P.thermo = (ctx, x, y, frac, { h = 380, color = C.coral, label = '', a = 1 } = {}) => {
    if (a <= 0.01) return; const top = y - h, f = clamp(frac);
    ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = C.glass; P.rr(ctx, x - 26, top, 52, h, 26); ctx.fill(); ctx.restore();
    P.tube(ctx, (c) => { P.rr(c, x - 26, top, 52, h, 26); }, C.white, 3, a * 0.7, { core: false });
    P.tube(ctx, (c) => { c.beginPath(); c.arc(x, y + 30, 46, 0, 7); }, color, 4, a, { fill: true, fillA: 0.8 });
    const fh = (h - 30) * f; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = color; P.rr(ctx, x - 13, y - fh, 26, fh + 20, 13); ctx.fill(); ctx.restore();
    if (label) P.label(ctx, label, x, y + 120, { align: 'center', alpha: a, size: 28 });
  };
  // a sine light wave from x0..x1, wavelength lam, colour
  P.wave = (ctx, x0, x1, y, lam, amp, color, { phase = 0, lw = 5, a = 1, head = 1 } = {}) => {
    const xe = lerp(x0, x1, clamp(head)); if (xe <= x0 + 1) return;
    P.tube(ctx, (c) => { c.beginPath(); for (let x = x0; x <= xe; x += 4) { const yy = y + Math.sin((x - x0) / lam * 6.283 - phase) * amp; x === x0 ? c.moveTo(x, yy) : c.lineTo(x, yy); } }, color, lw, a);
  };
  // wavelength → colour (rough visible spectrum; beyond red → dark red/violet hint)
  P.specColor = (k) => { const stops = ['#8A5CFF', '#4FA3FF', '#5FE3FF', '#5CFF8A', '#FFE45C', '#FF9A3C', '#FF3B3B', '#8E1A2A']; const i = clamp(k) * (stops.length - 1), i0 = Math.floor(i); return P.mix(stops[i0], stops[Math.min(stops.length - 1, i0 + 1)], i - i0); };
  // Whyverse planet mark (neon variant)
  P.planet = (ctx, x, y, r, t, { a = 1 } = {}) => {
    if (r <= 0.5 || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.35);
    const ring = (front) => { ctx.save(); ctx.beginPath(); if (front) ctx.rect(-r * 2.3, 0, r * 4.6, r * 2); else ctx.rect(-r * 2.3, -r * 2, r * 4.6, r * 2); ctx.clip();
      P.tube(ctx, (c) => { c.beginPath(); c.ellipse(0, 0, r * 1.75, r * 0.45, 0, 0, 7); }, C.gold, r * 0.09, 1);
      P.tube(ctx, (c) => { c.beginPath(); c.ellipse(0, 0, r * 2.0, r * 0.53, 0, 0, 7); }, C.coral, r * 0.04, 1); ctx.restore(); };
    ring(false);
    const g = ctx.createLinearGradient(-r, -r, r, r); g.addColorStop(0, '#7CC4F2'); g.addColorStop(1, '#2F6FB8'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill();
    P.circle(ctx, 0, 0, r, '#9BD8FF', r * 0.05, 0.8, { core: false });
    ring(true); ctx.restore();
  };
  // Earth (neon outline globe)
  P.earth = (ctx, x, y, r, t, { a = 1, spin = 0 } = {}) => {
    if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r); g.addColorStop(0, '#2E7CC9'); g.addColorStop(1, '#0B2A5A');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip(); ctx.fillStyle = '#3FBF7F';
    for (let i = 0; i < 5; i++) { const ph = (spin * 0.5 + i * 1.3) % 6.283, cx = x + Math.sin(ph) * r * 0.8, cy = y + (U.hash(i, 4) - 0.5) * r * 1.1; if (Math.cos(ph) < -0.1) continue; ctx.beginPath(); ctx.ellipse(cx, cy, r * (0.18 + 0.15 * U.hash(i, 5)) * Math.max(0.2, Math.cos(ph)), r * (0.12 + 0.2 * U.hash(i, 6)), 0.3, 0, 7); ctx.fill(); }
    ctx.restore(); ctx.restore(); P.circle(ctx, x, y, r, C.cyan, Math.max(2, r * 0.04), a, { core: false });
  };
  // icons drawn as neon strokes, size ~r
  P.icon = (ctx, kind, x, y, r, { color = C.white, a = 1, t = G.t } = {}) => {
    if (a <= 0.01) return; const T = (fn, col = color, lw = r * 0.1) => P.tube(ctx, (c) => { c.save(); c.translate(x, y); fn(c); c.restore(); }, col, lw, a);
    switch (kind) {
      case 'person': T((c) => { c.beginPath(); c.arc(0, -r * 0.55, r * 0.3, 0, 7); c.moveTo(-r * 0.5, r * 0.9); c.quadraticCurveTo(-r * 0.5, -r * 0.1, 0, -r * 0.12); c.quadraticCurveTo(r * 0.5, -r * 0.1, r * 0.5, r * 0.9); }); break;
      case 'sun': T((c) => { c.beginPath(); c.arc(0, 0, r * 0.45, 0, 7); for (let i = 0; i < 8; i++) { const an = i * 0.785; c.moveTo(Math.cos(an) * r * 0.65, Math.sin(an) * r * 0.65); c.lineTo(Math.cos(an) * r * 0.95, Math.sin(an) * r * 0.95); } }, C.gold); break;
      case 'clock': T((c) => { c.beginPath(); c.arc(0, 0, r * 0.8, 0, 7); c.moveTo(0, 0); c.lineTo(Math.sin(t * 2) * r * 0.55, -Math.cos(t * 2) * r * 0.55); c.moveTo(0, 0); c.lineTo(r * 0.35, r * 0.1); }); break;
      case 'check': T((c) => { c.beginPath(); c.moveTo(-r * 0.6, 0); c.lineTo(-r * 0.15, r * 0.45); c.lineTo(r * 0.65, -r * 0.5); }, C.green, r * 0.16); break;
      case 'cross': T((c) => { c.beginPath(); c.moveTo(-r * 0.55, -r * 0.55); c.lineTo(r * 0.55, r * 0.55); c.moveTo(r * 0.55, -r * 0.55); c.lineTo(-r * 0.55, r * 0.55); }, C.red, r * 0.16); break;
      case 'eye': T((c) => { c.beginPath(); c.moveTo(-r, 0); c.quadraticCurveTo(0, -r * 0.8, r, 0); c.quadraticCurveTo(0, r * 0.8, -r, 0); c.moveTo(r * 0.3, 0); c.arc(0, 0, r * 0.3, 0, 7); }); break;
      case 'bulb': T((c) => { c.beginPath(); c.arc(0, -r * 0.2, r * 0.55, 2.4, 0.74); c.lineTo(r * 0.25, r * 0.6); c.lineTo(-r * 0.25, r * 0.6); c.closePath(); c.moveTo(-r * 0.25, r * 0.8); c.lineTo(r * 0.25, r * 0.8); }); break;
      case 'galaxy': T((c) => { c.beginPath(); for (let k = 0; k < 2; k++) { for (let i = 0; i <= 40; i++) { const an = i / 40 * 4 + k * Math.PI + t * 0.3, rr = r * 0.08 + r * 0.9 * i / 40; const px = Math.cos(an) * rr, py = Math.sin(an) * rr * 0.55; i ? c.lineTo(px, py) : c.moveTo(px, py); } } }, color, r * 0.07); P.glow(ctx, x, y, r * 0.6, C.hot, a * 0.8); break;
      case 'book': T((c) => { c.beginPath(); c.moveTo(0, -r * 0.6); c.quadraticCurveTo(-r * 0.5, -r * 0.8, -r, -r * 0.6); c.lineTo(-r, r * 0.6); c.quadraticCurveTo(-r * 0.5, r * 0.4, 0, r * 0.6); c.quadraticCurveTo(r * 0.5, r * 0.4, r, r * 0.6); c.lineTo(r, -r * 0.6); c.quadraticCurveTo(r * 0.5, -r * 0.8, 0, -r * 0.6); c.lineTo(0, r * 0.6); }); break;
      case 'raven': T((c) => { c.beginPath(); c.moveTo(-r, r * 0.2); c.quadraticCurveTo(-r * 0.2, -r * 0.1, r * 0.2, -r * 0.4); c.arc(r * 0.35, -r * 0.45, r * 0.18, 3.6, 2.6); c.lineTo(r * 0.75, -r * 0.35); c.lineTo(r * 0.5, -r * 0.25); c.quadraticCurveTo(r * 0.6, r * 0.4, -r * 0.2, r * 0.45); c.closePath(); c.moveTo(0, r * 0.45); c.lineTo(-r * 0.1, r * 0.85); c.moveTo(r * 0.2, r * 0.4); c.lineTo(r * 0.2, r * 0.85); }, C.violet); break;
      case 'pigeon': T((c) => { c.beginPath(); c.ellipse(0, 0, r * 0.7, r * 0.42, -0.1, 0, 7); c.moveTo(r * 0.55, -r * 0.2); c.arc(r * 0.7, -r * 0.4, r * 0.22, 3.4, 2.4); c.moveTo(r * 0.9, -r * 0.42); c.lineTo(r * 1.1, -r * 0.35); c.moveTo(-r * 0.1, r * 0.4); c.lineTo(-r * 0.15, r * 0.75); c.moveTo(r * 0.2, r * 0.4); c.lineTo(r * 0.2, r * 0.75); c.moveTo(-r * 0.6, -r * 0.1); c.lineTo(-r * 1.05, -r * 0.2); }, '#C9D2FF'); break;
      case 'turtle': T((c) => { c.beginPath(); c.ellipse(0, 0, r * 0.6, r * 0.45, 0, 0, 7); c.moveTo(r * 0.6, 0); c.arc(r * 0.82, 0, r * 0.2, 3.14, 9.4); c.moveTo(-r * 0.35, -r * 0.38); c.lineTo(-r * 0.6, -r * 0.7); c.moveTo(r * 0.35, -r * 0.38); c.lineTo(r * 0.6, -r * 0.7); c.moveTo(-r * 0.35, r * 0.38); c.lineTo(-r * 0.6, r * 0.7); c.moveTo(r * 0.35, r * 0.38); c.lineTo(r * 0.6, r * 0.7); }, C.green); break;
      case 'bird': T((c) => { c.beginPath(); const f = Math.sin(t * 9 + x) * 0.5; c.moveTo(-r, -r * f); c.quadraticCurveTo(-r * 0.4, -r * 0.4 - r * f * 0.5, 0, 0); c.quadraticCurveTo(r * 0.4, -r * 0.4 - r * f * 0.5, r, -r * f); }, '#C9D2FF'); break;
      case 'telescope': T((c) => { c.beginPath(); c.save(); c.rotate(-0.5); c.rect(-r * 0.9, -r * 0.18, r * 1.5, r * 0.36); c.rect(r * 0.6, -r * 0.26, r * 0.3, r * 0.52); c.restore(); c.moveTo(0, r * 0.1); c.lineTo(-r * 0.4, r); c.moveTo(0, r * 0.1); c.lineTo(r * 0.4, r); }); break;
      case 'webb': T((c) => { c.beginPath(); for (const [hx, hy] of [[0, -0.42], [0.36, -0.21], [0.36, 0.21], [0, 0.42], [-0.36, 0.21], [-0.36, -0.21], [0, 0]]) { for (let i = 0; i <= 6; i++) { const an = i / 6 * 6.283 + 0.52; const px = (hx + Math.cos(an) * 0.2) * r, py = (hy + Math.sin(an) * 0.2) * r; i ? c.lineTo(px, py) : c.moveTo(px, py); } } }, C.gold, r * 0.05); T((c) => { c.beginPath(); c.moveTo(-r * 1.1, r * 0.8); c.lineTo(r * 1.1, r * 0.8); c.lineTo(r * 0.8, r * 1.0); c.lineTo(-r * 0.8, r * 1.0); c.closePath(); }, C.magenta, r * 0.05); break;
      case 'lamp': T((c) => { c.beginPath(); c.moveTo(0, r); c.lineTo(0, -r * 0.6); c.quadraticCurveTo(0, -r, r * 0.5, -r); c.moveTo(r * 0.3, -r); c.lineTo(r * 0.7, -r); c.lineTo(r * 0.6, -r * 0.85); c.lineTo(r * 0.4, -r * 0.85); c.closePath(); }); break;
      case 'switch': T((c) => { c.beginPath(); P.rr(c, -r * 0.45, -r * 0.7, r * 0.9, r * 1.4, r * 0.15); c.moveTo(0, -r * 0.05); c.lineTo(0, r * 0.4); }); break;
      default: T((c) => { c.beginPath(); c.arc(0, 0, r * 0.6, 0, 7); });
    }
  };
  globalThis.P = P;
})();
(function () {
  const P = globalThis.P, S = globalThis.SCORE, U = globalThis.U, G = globalThis.G; const C = P.C;
  P.talk = (t) => { const s = S && S.MOUTH; if (!s) return 0; const c = s.charCodeAt(Math.round(t * 30)); return c >= 48 && c <= 57 ? (c - 48) / 9 : 0; };
  P.shot = (at, draw, o = {}) => { (globalThis.SHOTS = globalThis.SHOTS || []).push(Object.assign({ at, draw }, o)); };
  P.path = (t, keys) => { if (t <= keys[0][0]) return { x: keys[0][1], y: keys[0][2] }; for (let i = 0; i < keys.length - 1; i++) { const a = keys[i], b = keys[i + 1]; if (t <= b[0]) { const u = U.ease.inOutQuad((t - a[0]) / (b[0] - a[0])); return { x: U.lerp(a[1], b[1], u), y: U.lerp(a[2], b[2], u) }; } } const z = keys[keys.length - 1]; return { x: z[1], y: z[2] }; };
  // chapter card: neon sign banner flickers on, number in a glowing ring, title words light up; then the hook line
  P.chapter = (ctx, t, n, title, t0, t1) => {
    const a = U.clamp((t - t0) / 0.45), b = U.clamp((t - (t1 - 0.45)) / 0.45); if (a <= 0 || b >= 1) return;
    const fl = (t - t0) < 0.5 ? (Math.floor((t - t0) * 30) % 3 === 1 ? 0.35 : 1) : 1;   // neon flicker as it turns on
    ctx.save(); ctx.globalAlpha *= (1 - U.ease.inCubic(b)) * fl; ctx.translate(0, -40 * U.ease.inCubic(b));
    P.box(ctx, 140, G.H / 2 - 135, G.W - 280, 270, C.magenta, { r: 34, lw: 4, fill: 'rgba(8,6,26,0.86)' });
    const d = P.pop(t, t0 + 0.25, 0.4); P.at(ctx, 320, G.H / 2, d, 0, () => { P.circle(ctx, 0, 0, 82, C.gold, 7, 1, { fill: true, fillA: 0.15 }); G.text(ctx, String(n), 0, 42, { size: 112, fam: P.FT.title, weight: 400, color: C.gold, align: 'center', boil: 0 }); });
    P.label(ctx, 'Chapter ' + n, 460, G.H / 2 - 52, { size: 30, color: C.cyan });
    const ws = title.split(' '); let xx = 460; const fs = Math.min(92, 92 * (G.W - 280 - 460 - 80) / P.measure(ctx, title, 92, P.FT.title, 400));
    ws.forEach((w, i) => { const on = t >= t0 + 0.4 + i * 0.09; const ww = P.measure(ctx, w + ' ', fs, P.FT.title, 400);
      if (on) G.text(ctx, w, xx, G.H / 2 + fs * 0.55, { size: fs, fam: P.FT.title, weight: 400, color: i % 2 ? C.gold : C.white, boil: 0 }); xx += ww; });
    ctx.restore();
  };
  P.hook = (ctx, h, t, t1) => {
    const a = U.clamp((t - (h.t - 0.3)) / 0.35), b = 1 - U.clamp((t - (t1 - 0.4)) / 0.35); const k = Math.min(U.ease.outCubic(a), b); if (k <= 0.01) return;
    const size = 64, maxW = 1440, sp = P.measure(ctx, ' ', size, P.FT.ui, 800); const lines = [[]]; let x = 0;
    for (const w of h.words) { const ww = P.measure(ctx, w.w, size, P.FT.ui, 800); if (x + ww > maxW && x > 0) { lines.push([]); x = 0; } lines[lines.length - 1].push({ ...w, x, ww }); x += ww + sp; }
    const lh = size * 1.25, Hh = lines.length * lh + 80, y0 = 690;
    ctx.save(); ctx.globalAlpha *= k; ctx.translate(0, (1 - k) * 40);
    P.box(ctx, G.W / 2 - maxW / 2 - 60, y0 - 30, maxW + 120, Hh, C.cyan, { r: 30, lw: 3, fill: 'rgba(8,6,26,0.86)' });
    lines.forEach((ln, li) => { const lw = ln.length ? ln[ln.length - 1].x + ln[ln.length - 1].ww : 0; const ox = G.W / 2 - lw / 2;
      for (const w of ln) { const q = U.clamp((t - w.t) / 0.14); const key = /[?:]$/.test(w.w);
        G.text(ctx, w.w, ox + w.x, y0 + 50 + li * lh, { size, fam: P.FT.ui, weight: 800, color: key ? C.gold : C.white, alpha: 0.22 + 0.78 * q, boil: 0 }); } });
    ctx.restore();
  };
  P.cardShot = (c, n, title, bg, o = {}) => P.shot(S.CH[c].t0, (ctx, t, s) => {
    bg(ctx, t, s);
    const h = S.ev[c + '_hook'], up = h ? U.ease.inOutCubic(U.clamp((t - (h.t - 0.45)) / 0.5)) : 0;
    ctx.save(); ctx.translate(0, -230 * up); P.chapter(ctx, t, n, title, S.CH[c].t0 + 0.1, S.ev[c + '_cardOut']); ctx.restore();
    if (h) P.hook(ctx, h, t, S.ev[c + '_cardOut']);
  }, Object.assign({ in: { type: 'fade', dur: 0.5 } }, o));
  // a camera transform for slow pushes (≤ 3 %) around a point
  P.push = (ctx, u, cx = G.W / 2, cy = G.H / 2, amt = 0.03) => { const s = 1 + amt * U.ease.inOutQuad(U.clamp(u)); ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-cx, -cy); };
  // small, short shake for real impacts only
  P.shake = (ctx, t, t0, amp = 6, dur = 0.3) => { const a = (t - t0) / dur; if (a < 0 || a > 1) return; const k = (1 - a) * amp; ctx.translate(Math.sin(t * 90) * k, Math.cos(t * 77) * k); };
})();
