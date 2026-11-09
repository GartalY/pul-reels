// Whyverse ep04 — "chalk" prop + HUD library. Pure functions of their args + t.
// FEEDBACK 2026-11-04: NOTHING boils — chalk strokes use fixed (seeded) dashes, text is static,
// camera shake only on real impacts (≤ 6 px, ≤ 0.3 s), pushes ≤ 3 %.
(function () {
  const G = globalThis.G, U = globalThis.U, Data = globalThis.Data;
  const { clamp, lerp, ease } = U;
  const P = {};
  const C = P.C = {
    board: '#16223A', board2: '#1C2B47', chalk: '#F3EFE4', dim: '#9FB0C8', gold: '#F7C548', coral: '#FF8466', sky: '#7CC4F2',
    ocean: '#3B78B8', land: '#7DC383', mint: '#7FE0B5', pink: '#F79AC0', lilac: '#B9A6FF', red: '#FF6B6B', ice: '#DDF1FF',
    glass: 'rgba(12,20,36,0.82)', sun: '#FFD45A', night: '#0A1020',
  };
  P.FT = { title: 'Permanent Marker', hand: 'Patrick Hand', ui: 'Inter', num: 'Permanent Marker' };
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

  // ---------- chalk primitives (static: no boil) ----------
  // a chalk stroke: a solid pass + a thinner broken pass offset a hair; dashes are seeded, never re-drawn per frame
  P.stroke = (ctx, path, color = C.chalk, lw = 6, a = 1, { seed = 1, dash = true, fill = null, fillA = 0.3, scribble = false, angle = -0.7, gap = 9 } = {}) => {
    if (a <= 0.01) return; ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    if (fill) { ctx.globalAlpha = a * fillA; ctx.fillStyle = fill === true ? color : fill; path(ctx); ctx.fill();
      if (scribble) { ctx.save(); path(ctx); ctx.clip(); P.hatchBox(ctx, -2400, -2400, 4800, 4800, fill === true ? color : fill, { a: a * 0.5, angle, gap, seed, lw: Math.max(2, lw * 0.45) }); ctx.restore(); } }
    ctx.strokeStyle = color;
    ctx.globalAlpha = a * 0.92; ctx.lineWidth = lw; path(ctx); ctx.stroke();
    if (dash) { ctx.globalAlpha = a * 0.5; ctx.lineWidth = Math.max(1.2, lw * 0.5); const d = lw * 2.6;
      ctx.setLineDash([d * (2 + U.hash(seed, 1)), d * 0.5, d * (1 + U.hash(seed, 2)), d * 0.8]); ctx.lineDashOffset = U.hash(seed, 3) * d * 4;
      ctx.translate(1.3, -1.1); path(ctx); ctx.stroke(); }
    ctx.restore();
  };
  // diagonal chalk hatching inside a box (call inside a clip)
  P.hatchBox = (ctx, x, y, w, h, color, { a = 0.5, angle = -0.7, gap = 9, seed = 1, lw = 2.5 } = {}) => {
    ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round';
    const cx = x + w / 2, cy = y + h / 2, R = Math.hypot(w, h) / 2; ctx.translate(cx, cy); ctx.rotate(angle);
    ctx.beginPath(); let i = 0; for (let yy = -R; yy < R; yy += gap, i++) { const j = (U.hash(i, seed) - 0.5) * gap * 0.5; ctx.moveTo(-R, yy + j); ctx.lineTo(R, yy + j + (U.hash(i, seed + 1) - 0.5) * 6); }
    ctx.stroke(); ctx.restore();
  };
  P.circle = (ctx, x, y, r, color = C.chalk, lw = 5, a = 1, o = {}) => P.stroke(ctx, (c) => { c.beginPath(); c.arc(x, y, Math.max(0.1, r), 0, 6.2832); }, color, lw, a, o);
  P.line = (ctx, x0, y0, x1, y1, color = C.chalk, lw = 5, a = 1, k = 1, o = {}) => { if (k <= 0.001) return; P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(x0, y0); c.lineTo(lerp(x0, x1, k), lerp(y0, y1, k)); }, color, lw, a, o); };
  P.rr = (ctx, x, y, w, h, r) => { r = Math.min(r, w / 2, h / 2); ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); };
  P.box = (ctx, x, y, w, h, color = C.chalk, { r = 22, lw = 4, a = 1, fill = C.glass, seed = 5 } = {}) => {
    if (a <= 0.01) return; if (fill) { ctx.save(); ctx.globalAlpha *= a; P.rr(ctx, x, y, w, h, r); ctx.fillStyle = fill; ctx.fill(); ctx.restore(); }
    P.stroke(ctx, (c) => P.rr(c, x, y, w, h, r), color, lw, a * 0.95, { seed });
  };
  P.arrow = (ctx, ax, ay, bx, by, { color = C.gold, lw = 7, head = 26, k = 1, a = 1, seed = 3 } = {}) => {
    if (k <= 0.001 || a <= 0) return; const ex = lerp(ax, bx, k), ey = lerp(ay, by, k), ang = Math.atan2(ey - ay, ex - ax);
    P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(ax, ay); c.lineTo(ex, ey); c.moveTo(ex - Math.cos(ang - 0.5) * head, ey - Math.sin(ang - 0.5) * head); c.lineTo(ex, ey); c.lineTo(ex - Math.cos(ang + 0.5) * head, ey - Math.sin(ang + 0.5) * head); }, color, lw, a, { seed });
  };
  // curved arrow along an arc (cx,cy,r from a0 to a1)
  P.arcArrow = (ctx, cx, cy, r, a0, a1, { color = C.gold, lw = 7, head = 24, a = 1, ry = null, seed = 4 } = {}) => {
    if (a <= 0) return; const ryy = ry == null ? r : ry; const ex = cx + Math.cos(a1) * r, ey = cy + Math.sin(a1) * ryy; const dir = a1 > a0 ? 1 : -1;
    const tx = -Math.sin(a1) * r * dir, ty = Math.cos(a1) * ryy * dir, ang = Math.atan2(ty, tx);
    P.stroke(ctx, (c) => { c.beginPath(); c.ellipse(cx, cy, r, ryy, 0, a0, a1, a1 < a0); c.moveTo(ex - Math.cos(ang - 0.5) * head, ey - Math.sin(ang - 0.5) * head); c.lineTo(ex, ey); c.lineTo(ex - Math.cos(ang + 0.5) * head, ey - Math.sin(ang + 0.5) * head); }, color, lw, a, { seed });
  };
  P.ring = (ctx, x, y, t, t0, { r = 120, color = C.gold, dur = 0.8, lw = 6 } = {}) => {
    const a = (t - t0) / dur; if (a < 0 || a > 1) return; P.circle(ctx, x, y, r * ease.outCubic(a), color, lw * (1 - a) + 1, 1 - a, { dash: false });
  };
  P.dust = (ctx, x, y, t, t0, { n = 14, r = 90, color = C.chalk, seed = 1 } = {}) => {       // a puff of chalk dust on a hit
    const a = t - t0; if (a < 0 || a > 0.8) return; const k = a / 0.8;
    ctx.save(); for (let i = 0; i < n; i++) { const ang = (i / n) * 6.283 + U.hash(i, seed) * 0.6, d = r * ease.outCubic(k) * (0.5 + 0.7 * U.hash(i, seed + 1));
      ctx.fillStyle = color; ctx.globalAlpha = (1 - k) * 0.7; ctx.beginPath(); ctx.arc(x + Math.cos(ang) * d, y + Math.sin(ang) * d - 20 * k, 4 + 6 * U.hash(i, seed + 2) * (1 - k), 0, 7); ctx.fill(); }
    ctx.restore();
  };
  // a soft light (used sparingly: Sun, hot side)
  P.glow = (ctx, x, y, r, color = C.sun, a = 1) => {
    if (a <= 0.005 || r <= 1) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, P.rgba(color, 0.55 * a)); g.addColorStop(0.35, P.rgba(color, 0.2 * a)); g.addColorStop(1, P.rgba(color, 0));
    ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore();
  };

  // ---------- text (never boils) ----------
  P.text = (ctx, s, x, y, o = {}) => G.text(ctx, s, x, y, Object.assign({ size: 54, fam: P.FT.hand, weight: 400, color: C.chalk, boil: 0 }, o));
  P.label = (ctx, s, x, y, o = {}) => G.text(ctx, String(s), x, y, Object.assign({ size: 34, fam: P.FT.hand, weight: 400, color: C.dim, boil: 0 }, o));
  P.measure = (ctx, s, size, fam = P.FT.hand, w = 400) => G.measure(ctx, s, size, fam, w);
  P.big = (ctx, s, x, y, o = {}) => G.text(ctx, s, x, y, Object.assign({ size: 110, fam: P.FT.title, weight: 400, color: C.chalk, align: 'center', boil: 0 }, o));
  // chalk handwriting: the text is revealed left → right over dur, a chalk tip rides the edge
  P.write = (ctx, s, x, y, t, t0, { dur = null, size = 64, fam = P.FT.hand, color = C.chalk, align = 'center', a = 1, t1 = 1e9, underline = false } = {}) => {
    if (t < t0) return; const al = a * fout(t, t1, 0.3); if (al <= 0.01) return;
    const w = P.measure(ctx, s, size, fam), d = dur == null ? Math.min(1.1, 0.12 + s.length * 0.035) : dur, k = clamp((t - t0) / d);
    const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
    ctx.save(); ctx.beginPath(); ctx.rect(x0 - 20, y - size * 1.3, (w + 40) * k + 1, size * 1.9); ctx.clip();
    G.text(ctx, s, x0, y, { size, fam, weight: 400, color, align: 'left', boil: 0, alpha: al });
    if (underline) P.line(ctx, x0, y + size * 0.22, x0 + w, y + size * 0.26, color, Math.max(3, size * 0.07), al * 0.85);
    ctx.restore();
    if (k < 1) { ctx.save(); ctx.globalAlpha = al; ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(x0 + w * k, y - size * 0.3, size * 0.07, 0, 7); ctx.fill(); ctx.restore(); }
  };
  P.tag = (ctx, s, x, y, t, t0, t1 = 1e9, { size = 42, color = C.chalk, border = C.gold, align = 'center', pad = 26, rot = 0, fam = P.FT.hand } = {}) => {
    const k = pop(t, t0) * fout(t, t1, 0.25); if (k <= 0.01) return;
    const w = P.measure(ctx, s, size, fam) + pad * 2, h = size * 1.5;
    const ox = align === 'left' ? w / 2 : align === 'right' ? -w / 2 : 0;
    ctx.save(); ctx.translate(x + ox, y); ctx.rotate(rot); ctx.scale(k, k); ctx.globalAlpha *= clamp(k * 1.5);
    P.box(ctx, -w / 2, -h / 2, w, h, border, { r: 18, lw: 4, seed: s.length });
    G.text(ctx, s, 0, size * 0.34, { size, fam, weight: 400, color, align: 'center', boil: 0 });
    ctx.restore(); return w;
  };
  P.stamp = (ctx, s, x, y, t, t0, { size = 90, color = C.gold, rot = -0.05, t1 = 1e9 } = {}) => {
    if (t < t0) return; const a = clamp((t - t0) / 0.14), k = lerp(1.8, 1, ease.outCubic(a)) * fout(t, t1, 0.3); if (k <= 0.01) return;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.globalAlpha *= clamp(a * 2);
    const w = P.measure(ctx, s, size, P.FT.title) + 70, h = size * 1.4;
    P.box(ctx, -w / 2, -h / 2, w, h, color, { r: 14, lw: 7, fill: 'rgba(12,18,32,0.85)', seed: 9 });
    G.text(ctx, s, 0, size * 0.36, { size, fam: P.FT.title, weight: 400, color, align: 'center', boil: 0 });
    ctx.restore();
    P.dust(ctx, x - w * 0 , y + h * 0.4, t, t0, { color, r: w * 0.5 });
  };
  P.counter = (ctx, { x, y, from = 0, to, t, t0, t1, size = 120, color = C.gold, prefix = '', suffix = '', decimals = 0, sub = '', subSize = 38, card = true, tEnd = 1e9, fmt, border = C.chalk }) => {
    const k = pop(t, t0 - 0.25, 0.35) * fout(t, tEnd, 0.3); if (k <= 0.01) return;
    const v = Data.count(t, t0, t1, from, to, ease.outCubic); const f = fmt || ((n) => Data.number(n, { decimals }));
    const str = prefix + f(v) + suffix, strF = prefix + f(to) + suffix; const land = t >= t1 ? Math.exp(-(t - t1) * 8) : 0;
    const w = Math.max(P.measure(ctx, strF, size, P.FT.num), sub ? P.measure(ctx, sub, subSize) : 0) + 90, h = size * 1.25 + (sub ? subSize * 1.4 : 0);
    ctx.save(); ctx.translate(x, y); const sc = k * (1 + 0.05 * land); ctx.scale(sc, sc); ctx.globalAlpha *= clamp(k * 1.4);
    if (card) P.box(ctx, -w / 2, -size * 0.95, w, h + 10, land > 0.05 ? color : border, { r: 20, lw: 4 });
    G.text(ctx, str, 0, size * 0.2, { size, fam: P.FT.num, weight: 400, color, align: 'center', boil: 0 });
    if (sub) G.text(ctx, sub, 0, size * 0.22 + subSize * 1.3, { size: subSize, fam: P.FT.hand, weight: 400, color: C.dim, align: 'center', boil: 0 });
    ctx.restore();
  };
  P.kicker = (ctx, s, t, t0, { x = 110, y = 110, t1 = 1e9, color = C.gold } = {}) => {
    const a = P.win(t, t0, t1, 0.35); if (a <= 0) return;
    P.line(ctx, x, y - 12, x + 46 * ease.outCubic(a), y - 12, color, 5, a);
    G.text(ctx, s, x + 66, y, { size: 36, fam: P.FT.hand, weight: 400, color: C.dim, alpha: a, boil: 0 });
  };
  P.hbar = (ctx, { x, y, w, h = 54, frac, t, t0, d = 0.8, color = C.gold, label = '', value = '', t1 = 1e9, seed = 1 }) => {
    const k = ease.outCubic(clamp((t - t0) / d)); const a = fin(t, t0 - 0.2, 0.3) * fout(t, t1, 0.3); if (a <= 0) return;
    P.stroke(ctx, (c) => P.rr(c, x, y, w, h, 10), C.dim, 3, a * 0.5, { seed });
    if (k > 0.01) P.stroke(ctx, (c) => P.rr(c, x, y, Math.max(12, w * frac * k), h, 10), color, 4, a, { fill: true, fillA: 0.35, scribble: true, seed: seed + 1 });
    if (label) P.label(ctx, label, x, y - 16, { size: 36, alpha: a, color: C.chalk });
    if (value) G.text(ctx, value, x + Math.max(12, w * frac * k) + 24, y + h * 0.8, { size: h * 0.95, fam: P.FT.num, weight: 400, color, alpha: a * fin(t, t0 + d * 0.6, 0.3), boil: 0 });
  };

  // ---------- board ----------
  P.board = (ctx, t, { tone = 0, smudge = 1 } = {}) => {
    const g = ctx.createLinearGradient(0, 0, 0, G.H); g.addColorStop(0, P.mix(C.board, '#0E1628', tone)); g.addColorStop(1, P.mix(C.board2, '#101A2E', tone));
    ctx.fillStyle = g; ctx.fillRect(-300, -300, G.W + 600, G.H + 600);
    if (smudge) for (let i = 0; i < 18; i++) { const x = U.hash(i, 1) * G.W, y = U.hash(i, 2) * G.H, r = 140 + U.hash(i, 3) * 360;
      const gg = ctx.createRadialGradient(x, y, 0, x, y, r); gg.addColorStop(0, `rgba(255,255,255,${(0.02 + U.hash(i, 4) * 0.03) * smudge})`); gg.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = gg; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); }
  };
  P.stars = (ctx, t, { n = 160, a = 1, seed = 1, x0 = 0, y0 = 0, w = G.W, h = G.H } = {}) => {
    if (a <= 0.01) return; ctx.save(); ctx.fillStyle = C.chalk;
    for (let i = 0; i < n; i++) { const x = x0 + U.hash(i, seed) * w, y = y0 + U.hash(i, seed + 1) * h, r = 1 + 2 * Math.pow(U.hash(i, seed + 2), 4);
      ctx.globalAlpha = a * (0.35 + 0.5 * U.hash(i, seed + 3)); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); }
    ctx.restore();
  };

  // ---------- the globe (orthographic, real coastlines from engine/data/geo.js) ----------
  const D = Math.PI / 180; let RINGS = null;
  const rings = () => { if (RINGS) return RINGS; const GEO = globalThis.GEO; RINGS = [];
    for (const name of Object.keys(GEO.world)) for (const r of GEO.world[name]) { if (r.length < 8) continue; const pts = []; for (let i = 0; i < r.length; i += 2) pts.push([r[i] * D, r[i + 1] * D]); RINGS.push(pts); }
    return RINGS; };
  P.rings = rings;
  // project lon/lat (radians) → [x, y, z] on a unit sphere viewed from (lon0, lat0)
  P.proj = (lon, lat, lon0, lat0) => { const cl = Math.cos(lat); const x = cl * Math.sin(lon - lon0), y = Math.sin(lat), z = cl * Math.cos(lon - lon0);
    const y2 = y * Math.cos(lat0) - z * Math.sin(lat0), z2 = y * Math.sin(lat0) + z * Math.cos(lat0); return [x, -y2, z2]; };
  // o: {lon0 (deg), lat0 (deg), a, ocean, land, grid (0..1), sx, sy (oblate squash), water (0..1 water drawn), oceanFn}
  P.globe = (ctx, cx, cy, R, t, o = {}) => {
    const { lon0 = 0, lat0 = 15, a = 1, ocean = C.ocean, land = C.land, grid = 0.35, sx = 1, sy = 1, lw = 5, equator = 0, rim = C.chalk, seed = 11, landA = 0.85, shade = 0.35, wire = 0 } = o;
    if (a <= 0.01 || R <= 1) return; const L0 = lon0 * D, B0 = lat0 * D;
    ctx.save(); ctx.globalAlpha *= a; ctx.translate(cx, cy); ctx.scale(sx, sy);
    // ocean disc
    ctx.save(); ctx.beginPath(); ctx.arc(0, 0, R, 0, 7); ctx.clip();
    if (o.oceanFn) o.oceanFn(ctx, R, L0, B0); else { ctx.globalAlpha *= 0.8; ctx.fillStyle = ocean; ctx.fillRect(-R, -R, 2 * R, 2 * R); ctx.globalAlpha /= 0.8; P.hatchBox(ctx, -R, -R, 2 * R, 2 * R, '#9CCBF0', { a: 0.18, gap: 11, seed }); }
    // land
    ctx.fillStyle = land; ctx.globalAlpha *= landA;
    for (const r of rings()) { let vis = 0; const pts = r.map(([lo, la]) => { const p = P.proj(lo, la, L0, B0); if (p[2] > 0) vis++; else { const d = Math.hypot(p[0], p[1]) || 1; p[0] /= d; p[1] /= d; } return p; });
      if (!vis) continue; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0] * R, p[1] * R) : ctx.moveTo(p[0] * R, p[1] * R))); ctx.closePath(); ctx.fill(); }
    ctx.globalAlpha /= landA;
    // grid (meridians/parallels)
    if (grid > 0) { ctx.strokeStyle = C.chalk; ctx.lineWidth = 1.6; ctx.globalAlpha *= grid;
      for (let la = -60; la <= 60; la += 30) { ctx.beginPath(); let st = false; for (let lo = -180; lo <= 180; lo += 6) { const p = P.proj(lo * D, la * D, L0, B0); if (p[2] < 0) { st = false; continue; } st ? ctx.lineTo(p[0] * R, p[1] * R) : ctx.moveTo(p[0] * R, p[1] * R); st = true; } ctx.stroke(); }
      for (let lo = -180; lo < 180; lo += 30) { ctx.beginPath(); let st = false; for (let la = -90; la <= 90; la += 5) { const p = P.proj(lo * D, la * D, L0, B0); if (p[2] < 0) { st = false; continue; } st ? ctx.lineTo(p[0] * R, p[1] * R) : ctx.moveTo(p[0] * R, p[1] * R); st = true; } ctx.stroke(); }
      ctx.globalAlpha /= grid; }
    if (o.overlay) o.overlay(ctx, R, L0, B0);
    // shading toward the limb
    if (shade) { const g = ctx.createRadialGradient(-R * 0.35, -R * 0.4, R * 0.2, 0, 0, R); g.addColorStop(0, 'rgba(255,255,255,0.08)'); g.addColorStop(1, `rgba(5,10,25,${shade})`); ctx.fillStyle = g; ctx.fillRect(-R, -R, 2 * R, 2 * R); }
    ctx.restore();
    if (equator > 0) { ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = C.gold; ctx.globalAlpha *= equator; ctx.beginPath(); let st = false; for (let lo = -180; lo <= 180; lo += 4) { const p = P.proj(lo * D, 0, L0, B0); if (p[2] < 0) { st = false; continue; } st ? ctx.lineTo(p[0] * R, p[1] * R) : ctx.moveTo(p[0] * R, p[1] * R); st = true; } ctx.stroke(); ctx.restore(); }
    P.circle(ctx, 0, 0, R, rim, lw, 1, { seed });
    ctx.restore();
  };
  // a point on the globe in screen space (for pins); returns null if on the far side
  P.globePt = (cx, cy, R, lonDeg, latDeg, lon0, lat0, sx = 1, sy = 1) => { const p = P.proj(lonDeg * D, latDeg * D, lon0 * D, lat0 * D); return { x: cx + p[0] * R * sx, y: cy + p[1] * R * sy, vis: p[2] > 0, z: p[2] }; };
  P.pin = (ctx, x, y, label, t, t0, { color = C.gold, side = 1, size = 36, a = 1 } = {}) => {
    const k = pop(t, t0, 0.35); if (k <= 0 || a <= 0) return; ctx.save(); ctx.globalAlpha *= a;
    P.circle(ctx, x, y, 11 * k, color, 5, 1, { fill: color, fillA: 0.8, dash: false });
    if (label) { const lx = x + side * 40; P.line(ctx, x + side * 12, y, lx - side * 6, y, color, 3, clamp(k));
      G.text(ctx, label, lx, y + size * 0.32, { size, fam: P.FT.hand, weight: 400, color: C.chalk, align: side > 0 ? 'left' : 'right', alpha: clamp(k), boil: 0 }); }
    ctx.restore();
  };

  // ---------- props ----------
  P.sun = (ctx, x, y, r, t, { a = 1, face = false, rays = 1 } = {}) => {
    if (a <= 0.01) return; P.glow(ctx, x, y, r * 3.2, C.sun, a * 0.9);
    P.stroke(ctx, (c) => { c.beginPath(); c.arc(x, y, r, 0, 7); }, C.sun, 6, a, { fill: C.sun, fillA: 0.75, scribble: true, seed: 21, angle: 0.6 });
    if (rays) P.stroke(ctx, (c) => { c.beginPath(); for (let i = 0; i < 12; i++) { const an = i * 0.5236 + t * 0.15; c.moveTo(x + Math.cos(an) * r * 1.2, y + Math.sin(an) * r * 1.2); c.lineTo(x + Math.cos(an) * r * (1.45 + 0.1 * Math.sin(t * 3 + i)), y + Math.sin(an) * r * (1.45 + 0.1 * Math.sin(t * 3 + i))); } }, C.sun, 6, a * rays, { seed: 22 });
  };
  P.moon = (ctx, x, y, r, { a = 1, face = 0, rot = 0 } = {}) => {
    if (a <= 0.01) return; P.stroke(ctx, (c) => { c.beginPath(); c.arc(x, y, r, 0, 7); }, '#D8D8D0', 5, a, { fill: '#B9B9B0', fillA: 0.55, scribble: true, seed: 31 });
    ctx.save(); ctx.globalAlpha *= a * 0.6; ctx.fillStyle = '#7E7E78'; for (const [dx, dy, rr] of [[-0.3, -0.25, 0.22], [0.25, 0.1, 0.16], [-0.05, 0.4, 0.12], [0.35, -0.35, 0.1]]) { const c0 = Math.cos(rot), s0 = Math.sin(rot); const px = dx * c0 - dy * s0, py = dx * s0 + dy * c0; ctx.beginPath(); ctx.arc(x + px * r, y + py * r, rr * r, 0, 7); ctx.fill(); } ctx.restore();
    if (face) { const c0 = Math.cos(rot), s0 = Math.sin(rot); P.circle(ctx, x + (-0.55 * c0) * r, y + (-0.55 * s0) * r, r * 0.12, C.gold, 4, a * face, { fill: C.gold, fillA: 0.9, dash: false }); }
  };
  P.thermo = (ctx, x, y, frac, { h = 360, color = C.coral, label = '', a = 1 } = {}) => {
    if (a <= 0.01) return; const top = y - h, f = clamp(frac);
    P.stroke(ctx, (c) => P.rr(c, x - 26, top, 52, h, 26), C.chalk, 4, a, { fill: C.glass, fillA: 1 });
    P.circle(ctx, x, y + 30, 46, color, 5, a, { fill: color, fillA: 0.85 });
    const fh = (h - 30) * f; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = color; P.rr(ctx, x - 12, y - fh, 24, fh + 20, 12); ctx.fill(); ctx.restore();
    if (label) P.label(ctx, label, x, y + 125, { align: 'center', alpha: a, size: 38, color: C.chalk });
  };
  // a speedometer dial: value 0..max, needle eased
  P.gauge = (ctx, x, y, r, v, max, { a = 1, label = '', color = C.gold, ticks = 5, unit = 'km/h', red = null } = {}) => {
    if (a <= 0.01) return; const a0 = Math.PI * 0.8, a1 = Math.PI * 2.2;
    P.stroke(ctx, (c) => { c.beginPath(); c.arc(x, y, r, a0, a1); }, C.chalk, 6, a, { seed: 41 });
    if (red != null) P.stroke(ctx, (c) => { c.beginPath(); c.arc(x, y, r - 14, a0 + (a1 - a0) * red / max, a1); }, C.red, 8, a, { seed: 42 });
    for (let i = 0; i <= ticks; i++) { const an = a0 + (a1 - a0) * i / ticks; P.line(ctx, x + Math.cos(an) * (r - 22), y + Math.sin(an) * (r - 22), x + Math.cos(an) * (r - 4), y + Math.sin(an) * (r - 4), C.chalk, 4, a, 1, { dash: false });
      G.text(ctx, Data.number(max * i / ticks), x + Math.cos(an) * (r - 58), y + Math.sin(an) * (r - 58) + 12, { size: 30, fam: P.FT.hand, weight: 400, color: C.dim, align: 'center', alpha: a, boil: 0 }); }
    const an = a0 + (a1 - a0) * clamp(v / max); P.line(ctx, x, y, x + Math.cos(an) * (r - 30), y + Math.sin(an) * (r - 30), color, 9, a, 1, { dash: false });
    P.circle(ctx, x, y, 14, color, 5, a, { fill: color, fillA: 1, dash: false });
    G.text(ctx, Data.number(v), x, y + r * 0.62, { size: r * 0.42, fam: P.FT.num, weight: 400, color, align: 'center', alpha: a, boil: 0 });
    G.text(ctx, unit, x, y + r * 0.62 + r * 0.25, { size: r * 0.17, fam: P.FT.hand, weight: 400, color: C.dim, align: 'center', alpha: a, boil: 0 });
    if (label) G.text(ctx, label, x, y - r - 30, { size: 40, fam: P.FT.hand, weight: 400, color: C.chalk, align: 'center', alpha: a, boil: 0 });
  };
  // a clock face (h, m as floats)
  P.clock = (ctx, x, y, r, hh, mm, { a = 1, color = C.chalk, hand = C.gold } = {}) => {
    if (a <= 0.01) return; P.circle(ctx, x, y, r, color, 6, a, { fill: C.glass, fillA: 1 });
    for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; P.line(ctx, x + Math.sin(an) * r * 0.82, y - Math.cos(an) * r * 0.82, x + Math.sin(an) * r * 0.93, y - Math.cos(an) * r * 0.93, color, 4, a, 1, { dash: false }); }
    const ah = (hh % 12 + mm / 60) / 12 * 6.283, am = mm / 60 * 6.283;
    P.line(ctx, x, y, x + Math.sin(ah) * r * 0.5, y - Math.cos(ah) * r * 0.5, hand, 9, a, 1, { dash: false });
    P.line(ctx, x, y, x + Math.sin(am) * r * 0.78, y - Math.cos(am) * r * 0.78, color, 6, a, 1, { dash: false });
  };
  // Whyverse planet mark (chalk variant)
  P.planet = (ctx, x, y, r, t, { a = 1 } = {}) => {
    if (r <= 0.5 || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.35);
    const ring = (front) => { ctx.save(); ctx.beginPath(); if (front) ctx.rect(-r * 2.3, 0, r * 4.6, r * 2); else ctx.rect(-r * 2.3, -r * 2, r * 4.6, r * 2); ctx.clip();
      P.stroke(ctx, (c) => { c.beginPath(); c.ellipse(0, 0, r * 1.75, r * 0.45, 0, 0, 7); }, C.gold, r * 0.09, 1, { seed: 51 });
      P.stroke(ctx, (c) => { c.beginPath(); c.ellipse(0, 0, r * 2.0, r * 0.53, 0, 0, 7); }, C.coral, r * 0.045, 1, { seed: 52 }); ctx.restore(); };
    ring(false);
    P.stroke(ctx, (c) => { c.beginPath(); c.arc(0, 0, r, 0, 7); }, C.sky, r * 0.06, 1, { fill: C.sky, fillA: 0.75, scribble: true, seed: 53, gap: Math.max(5, r * 0.09) });
    ring(true); ctx.restore();
  };
  // simple chalk icons, size ~r
  P.icon = (ctx, kind, x, y, r, { color = C.chalk, a = 1, t = G.t, lw = null, seed = 61 } = {}) => {
    if (a <= 0.01) return; const T = (fn, col = color, o = {}) => P.stroke(ctx, (c) => { c.save(); c.translate(x, y); fn(c); c.restore(); }, col, lw || Math.max(3, r * 0.09), a, Object.assign({ seed }, o));
    switch (kind) {
      case 'car': T((c) => { c.beginPath(); c.moveTo(-r, r * 0.25); c.lineTo(-r, -r * 0.1); c.lineTo(-r * 0.55, -r * 0.15); c.lineTo(-r * 0.3, -r * 0.5); c.lineTo(r * 0.35, -r * 0.5); c.lineTo(r * 0.6, -r * 0.12); c.lineTo(r, -r * 0.05); c.lineTo(r, r * 0.25); c.closePath(); c.moveTo(-r * 0.55 + r * 0.22, r * 0.3); c.arc(-r * 0.55, r * 0.3, r * 0.22, 0, 7); c.moveTo(r * 0.55 + r * 0.22, r * 0.3); c.arc(r * 0.55, r * 0.3, r * 0.22, 0, 7); }, color, { fill: color, fillA: 0.3 }); break;
      case 'tree': T((c) => { c.beginPath(); c.moveTo(0, r); c.lineTo(0, 0); }, '#C9A27A'); T((c) => { c.beginPath(); c.arc(0, -r * 0.3, r * 0.6, 0, 7); }, C.land, { fill: C.land, fillA: 0.5, scribble: true }); break;
      case 'rock': T((c) => { c.beginPath(); c.moveTo(-r, r * 0.5); c.lineTo(-r * 0.6, -r * 0.3); c.lineTo(0, -r * 0.6); c.lineTo(r * 0.7, -r * 0.2); c.lineTo(r, r * 0.5); c.closePath(); }, C.dim, { fill: C.dim, fillA: 0.3 }); break;
      case 'house': T((c) => { c.beginPath(); c.moveTo(-r * 0.8, r * 0.8); c.lineTo(-r * 0.8, -r * 0.1); c.lineTo(0, -r * 0.8); c.lineTo(r * 0.8, -r * 0.1); c.lineTo(r * 0.8, r * 0.8); c.closePath(); c.rect(-r * 0.2, r * 0.25, r * 0.4, r * 0.55); }, color, { fill: C.coral, fillA: 0.3 }); break;
      case 'plane': T((c) => { c.beginPath(); c.moveTo(-r, 0); c.quadraticCurveTo(0, -r * 0.2, r, -r * 0.05); c.quadraticCurveTo(r * 1.1, r * 0.08, r * 0.9, r * 0.12); c.lineTo(-r * 0.9, r * 0.12); c.closePath(); c.moveTo(-r * 0.1, 0); c.lineTo(-r * 0.45, r * 0.6); c.lineTo(-r * 0.2, r * 0.6); c.lineTo(r * 0.25, 0.05 * r); c.moveTo(-r * 0.75, 0); c.lineTo(-r * 0.95, -r * 0.45); c.lineTo(-r * 0.75, -r * 0.45); c.lineTo(-r * 0.5, -r * 0.05); }, color, { fill: color, fillA: 0.25 }); break;
      case 'cup': T((c) => { c.beginPath(); c.moveTo(-r * 0.5, -r * 0.5); c.lineTo(-r * 0.4, r * 0.5); c.lineTo(r * 0.4, r * 0.5); c.lineTo(r * 0.5, -r * 0.5); c.closePath(); c.moveTo(r * 0.45, -r * 0.25); c.quadraticCurveTo(r * 0.9, -r * 0.2, r * 0.42, r * 0.2); }, color, { fill: C.coral, fillA: 0.35 }); break;
      case 'wave': T((c) => { c.beginPath(); c.moveTo(-r, r * 0.5); c.quadraticCurveTo(-r * 0.5, -r * 0.6, 0, -r * 0.4); c.quadraticCurveTo(r * 0.6, -r * 0.3, r * 0.4, r * 0.1); c.quadraticCurveTo(r * 0.1, -r * 0.1, r * 0.2, r * 0.2); c.moveTo(-r, r * 0.5); c.lineTo(r, r * 0.5); }, C.sky, { fill: C.sky, fillA: 0.35, scribble: true }); break;
      case 'tornado': T((c) => { c.beginPath(); for (let i = 0; i < 6; i++) { const yy = -r + i * r * 0.36, w = r * (0.95 - i * 0.15); c.moveTo(-w + Math.sin(t * 6 + i) * 6, yy); c.quadraticCurveTo(0, yy + r * 0.12, w + Math.sin(t * 6 + i) * 6, yy); } }, C.dim); break;
      case 'bolt': T((c) => { c.beginPath(); c.moveTo(r * 0.2, -r); c.lineTo(-r * 0.4, r * 0.1); c.lineTo(0, r * 0.1); c.lineTo(-r * 0.2, r); c.lineTo(r * 0.45, -r * 0.15); c.lineTo(r * 0.05, -r * 0.15); c.closePath(); }, C.gold, { fill: C.gold, fillA: 0.6 }); break;
      case 'check': T((c) => { c.beginPath(); c.moveTo(-r * 0.6, 0); c.lineTo(-r * 0.15, r * 0.45); c.lineTo(r * 0.65, -r * 0.5); }, C.mint); break;
      case 'cross': T((c) => { c.beginPath(); c.moveTo(-r * 0.55, -r * 0.55); c.lineTo(r * 0.55, r * 0.55); c.moveTo(r * 0.55, -r * 0.55); c.lineTo(-r * 0.55, r * 0.55); }, C.red); break;
      case 'hurricane': T((c) => { c.beginPath(); for (let k = 0; k < 3; k++) { for (let i = 0; i <= 30; i++) { const an = i / 30 * 3.2 + k * 2.094 + t * 2.4, rr = r * 0.15 + r * 0.85 * i / 30; const px = Math.cos(an) * rr, py = Math.sin(an) * rr; i ? c.lineTo(px, py) : c.moveTo(px, py); } } c.moveTo(r * 0.12, 0); c.arc(0, 0, r * 0.12, 0, 7); }, color); break;
      case 'coral': T((c) => { c.beginPath(); c.moveTo(0, r); c.lineTo(0, 0); c.lineTo(-r * 0.5, -r * 0.6); c.moveTo(0, 0); c.lineTo(r * 0.45, -r * 0.5); c.lineTo(r * 0.45, -r * 0.9); c.moveTo(-r * 0.25, -r * 0.3); c.lineTo(-r * 0.25, -r * 0.8); }, C.pink, { lw: r * 0.16 }); break;
      case 'mirror': T((c) => { c.beginPath(); c.rect(-r * 0.6, -r * 0.6, r * 1.2, r * 1.2); for (let i = 1; i < 4; i++) { c.moveTo(-r * 0.6 + i * r * 0.3, -r * 0.6); c.lineTo(-r * 0.6 + i * r * 0.3, r * 0.6); c.moveTo(-r * 0.6, -r * 0.6 + i * r * 0.3); c.lineTo(r * 0.6, -r * 0.6 + i * r * 0.3); } }, C.chalk); break;
      case 'plant': T((c) => { c.beginPath(); c.moveTo(0, r); c.quadraticCurveTo(r * 0.1, 0, 0, -r * 0.6); c.moveTo(0, -r * 0.1); c.quadraticCurveTo(-r * 0.6, -r * 0.3, -r * 0.7, -r * 0.7); c.quadraticCurveTo(-r * 0.2, -r * 0.6, 0, -r * 0.1); c.moveTo(0, -r * 0.3); c.quadraticCurveTo(r * 0.6, -r * 0.5, r * 0.6, -r * 0.9); c.quadraticCurveTo(r * 0.1, -r * 0.8, 0, -r * 0.3); }, C.land, { fill: C.land, fillA: 0.4 }); break;
      case 'owl': T((c) => { c.beginPath(); c.ellipse(0, 0, r * 0.55, r * 0.75, 0, 0, 7); c.moveTo(-r * 0.05, -r * 0.25); c.arc(-r * 0.22, -r * 0.25, r * 0.17, 0, 7); c.moveTo(r * 0.39, -r * 0.25); c.arc(r * 0.22, -r * 0.25, r * 0.17, 0, 7); c.moveTo(-r * 0.4, -r * 0.65); c.lineTo(-r * 0.3, -r * 0.95); c.lineTo(-r * 0.15, -r * 0.7); c.moveTo(r * 0.4, -r * 0.65); c.lineTo(r * 0.3, -r * 0.95); c.lineTo(r * 0.15, -r * 0.7); }, '#C9A27A', { fill: '#C9A27A', fillA: 0.3 }); break;
      case 'rooster': T((c) => { c.beginPath(); c.ellipse(0, r * 0.1, r * 0.55, r * 0.4, 0, 0, 7); c.moveTo(r * 0.35, -r * 0.1); c.lineTo(r * 0.5, -r * 0.6); c.arc(r * 0.55, -r * 0.65, r * 0.15, 3.5, 2.6); c.moveTo(r * 0.7, -r * 0.65); c.lineTo(r * 0.9, -r * 0.6); c.lineTo(r * 0.7, -r * 0.55); c.moveTo(-r * 0.5, 0); c.quadraticCurveTo(-r * 0.9, -r * 0.6, -r * 0.6, -r * 0.8); c.moveTo(0, r * 0.5); c.lineTo(0, r * 0.9); c.moveTo(r * 0.15, r * 0.5); c.lineTo(r * 0.15, r * 0.9); }, C.chalk); T((c) => { c.beginPath(); c.arc(r * 0.5, -r * 0.85, r * 0.1, 0, 7); }, C.red, { fill: C.red, fillA: 0.8 }); break;
      case 'magnet': T((c) => { c.beginPath(); c.moveTo(-r * 0.6, -r * 0.7); c.lineTo(-r * 0.6, r * 0.1); c.arc(0, r * 0.1, r * 0.6, Math.PI, 0, true); c.lineTo(r * 0.6, -r * 0.7); }, C.red, { lw: r * 0.22 }); break;
      case 'brake': T((c) => { c.beginPath(); c.arc(0, 0, r * 0.8, 0, 7); c.moveTo(r * 0.25, 0); c.arc(0, 0, r * 0.25, 0, 7); }, C.dim); T((c) => { c.beginPath(); c.arc(0, 0, r * 0.95, -2.4, -0.7); }, C.coral, { lw: r * 0.2 }); break;
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
  // chapter card: a chalk "lesson" header written onto the board, number in a circle; then the hook line
  P.chapter = (ctx, t, n, title, t0, t1) => {
    const a = U.clamp((t - t0) / 0.35), b = U.clamp((t - (t1 - 0.45)) / 0.45); if (a <= 0 || b >= 1) return;
    ctx.save(); ctx.globalAlpha *= (1 - U.ease.inCubic(b)); ctx.translate(0, -40 * U.ease.inCubic(b));
    const d = P.pop(t, t0 + 0.2, 0.4); P.at(ctx, 330, G.H / 2, d, -0.04, () => { P.circle(ctx, 0, 0, 92, C.gold, 8, 1, { fill: C.gold, fillA: 0.12, seed: 70 + n }); G.text(ctx, String(n), 0, 44, { size: 130, fam: P.FT.title, weight: 400, color: C.gold, align: 'center', boil: 0 }); });
    P.write(ctx, 'Chapter ' + n, 470, G.H / 2 - 62, t, t0 + 0.25, { size: 44, align: 'left', color: C.sky, dur: 0.35 });
    const fs = Math.min(104, 104 * (G.W - 470 - 160) / P.measure(ctx, title, 104, P.FT.title));
    P.write(ctx, title, 470, G.H / 2 + fs * 0.62, t, t0 + 0.4, { size: fs, fam: P.FT.title, align: 'left', color: C.chalk, dur: 0.75, underline: true });
    ctx.restore();
  };
  P.hook = (ctx, h, t, t1) => {
    const a = U.clamp((t - (h.t - 0.3)) / 0.35), b = 1 - U.clamp((t - (t1 - 0.4)) / 0.35); const k = Math.min(U.ease.outCubic(a), b); if (k <= 0.01) return;
    const size = 66, maxW = 1440, sp = P.measure(ctx, ' ', size); const lines = [[]]; let x = 0;
    for (const w of h.words) { const ww = P.measure(ctx, w.w, size); if (x + ww > maxW && x > 0) { lines.push([]); x = 0; } lines[lines.length - 1].push({ ...w, x, ww }); x += ww + sp; }
    const lh = size * 1.22, Hh = lines.length * lh + 70, y0 = 680;
    ctx.save(); ctx.globalAlpha *= k; ctx.translate(0, (1 - k) * 40);
    P.box(ctx, G.W / 2 - maxW / 2 - 60, y0 - 30, maxW + 120, Hh, C.coral, { r: 20, lw: 5, fill: 'rgba(12,18,32,0.88)', seed: 77 });
    lines.forEach((ln, li) => { const lw = ln.length ? ln[ln.length - 1].x + ln[ln.length - 1].ww : 0; const ox = G.W / 2 - lw / 2;
      for (const w of ln) { const q = U.clamp((t - w.t) / 0.14); const key = /[?.!]$/.test(w.w) && li === lines.length - 1;
        G.text(ctx, w.w, ox + w.x, y0 + 46 + li * lh, { size, fam: P.FT.hand, weight: 400, color: key ? C.gold : C.chalk, alpha: 0.2 + 0.8 * q, boil: 0 }); } });
    ctx.restore();
  };
  P.cardShot = (c, n, title, bg, o = {}) => P.shot(S.CH[c].t0, (ctx, t, s) => {
    bg(ctx, t, s);
    const h = S.ev[c + '_hook'], up = h ? U.ease.inOutCubic(U.clamp((t - (h.t - 0.45)) / 0.5)) : 0;
    ctx.save(); ctx.translate(0, -230 * up); P.chapter(ctx, t, n, title, S.CH[c].t0 + 0.1, S.ev[c + '_cardOut']); ctx.restore();
    if (h) P.hook(ctx, h, t, S.ev[c + '_cardOut']);
  }, Object.assign({ in: { type: 'wipe', dir: 'left', dur: 0.6 } }, o));
  P.push = (ctx, u, cx = G.W / 2, cy = G.H / 2, amt = 0.03) => { const s = 1 + amt * U.ease.inOutQuad(U.clamp(u)); ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-cx, -cy); };
  P.shake = (ctx, t, t0, amp = 6, dur = 0.3) => { const a = (t - t0) / dur; if (a < 0 || a > 1) return; const k = (1 - a) * amp; ctx.translate(Math.sin(t * 90) * k, Math.cos(t * 77) * k); };
  // speed lines (motion streaks) behind something moving right
  P.streaks = (ctx, x, y, w, h, t, { n = 9, a = 1, color = C.chalk, dir = -1, seed = 81 } = {}) => {
    if (a <= 0.01) return; for (let i = 0; i < n; i++) { const yy = y - h / 2 + U.hash(i, seed) * h, len = w * (0.4 + 0.6 * U.hash(i, seed + 1)), off = ((t * 3 + U.hash(i, seed + 2)) % 1) * 60;
      P.line(ctx, x + dir * (20 + off), yy, x + dir * (20 + off + len), yy, color, 3, a * (0.3 + 0.4 * U.hash(i, seed + 3)), 1, { dash: false }); }
  };
})();
