// Chapter 6 — Worlds that hit the brakes: Venus (243-day spin > 225-day year, backwards; 117 days sunrise to sunrise) ·
// Mercury (3 spins per 2 orbits → a day lasts 2 years) · Venus has no global field · the Moon is locked · the far future.
(function () {
  const { U, G, Ch, P, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  // a cloudy planet ball with drifting bands; spin = band offset
  const ball = (ctx, x, y, r, col, band, spin, { a = 1, seed = 1 } = {}) => {
    if (a <= 0.01 || r < 1) return; ctx.save(); ctx.globalAlpha *= a;
    P.stroke(ctx, (c) => { c.beginPath(); c.arc(x, y, r, 0, 7); }, col, 6, 1, { fill: col, fillA: 0.55, seed });
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r - 3, 0, 7); ctx.clip();
    for (let i = 0; i < 7; i++) { const yy = y - r + (i + 0.5) * (2 * r / 7); const off = ((spin * r * 0.8 + i * 70) % (r * 2.4)) - r * 1.2; ctx.strokeStyle = band; ctx.lineWidth = r * 0.07; ctx.globalAlpha = 0.55; ctx.beginPath(); ctx.moveTo(x - r * 1.3 + off, yy); ctx.bezierCurveTo(x - r * 0.4 + off, yy - r * 0.12, x + r * 0.2 + off, yy + r * 0.12, x + r * 1.1 + off, yy); ctx.stroke(); }
    const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.2, x, y, r); g.addColorStop(0, 'rgba(255,255,255,0.1)'); g.addColorStop(1, 'rgba(5,10,25,0.45)'); ctx.globalAlpha = 1; ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
    ctx.restore(); ctx.restore();
  };
  const VENUS = '#E8C77A', VBAND = '#FFF0C8';
  P.cardShot('c6', 6, 'Worlds that hit the brakes', (ctx, t) => { P.board(ctx, t); ball(ctx, 1680, 880, 110, VENUS, VBAND, -t * 0.05); });

  // S1 — Venus: one slow, backwards spin takes 243 Earth days — longer than its 225-day year
  P.shot(ev.c6_s1, (ctx, t) => {
    P.board(ctx, t); P.stars(ctx, t, { n: 90, seed: 61 });
    const kv = P.pop(t, ev.c6_venus - 0.3, 0.5); ball(ctx, 560, 520, 300 * kv, VENUS, VBAND, -(t - ev.c6_s1) * 0.08, { seed: 62 });
    P.label(ctx, 'VENUS', 560, 920, { size: 56, align: 'center', color: VENUS, alpha: clamp(kv), fam: FT.title });
    const kb = P.fin(t, ev.c6_back - 0.2, 0.4); P.arcArrow(ctx, 560, 180, 160, Math.PI * 0.2, Math.PI * 0.85, { ry: 34, color: C.coral, a: kb, lw: 7 }); P.label(ctx, 'backwards', 790, 160, { size: 40, color: C.coral, alpha: kb });
    P.hbar(ctx, { x: 1060, y: 380, w: 720, h: 66, frac: 1, t, t0: ev.c6_243 - 0.4, color: C.coral, label: 'one spin', value: '', seed: 63 });
    G.text(ctx, '243 Earth days', 1060 + 700, 428, { size: 44, fam: FT.num, color: '#16223A', align: 'right', alpha: P.fin(t, ev.c6_243 + 0.3, 0.3), boil: 0 });
    P.hbar(ctx, { x: 1060, y: 580, w: 720, h: 66, frac: 225 / 243, t, t0: ev.c6_225 - 0.4, color: C.sky, label: 'one year (one trip around the Sun)', value: '', seed: 64 });
    G.text(ctx, '225', 1060 + 720 * 225 / 243 - 20, 628, { size: 44, fam: FT.num, color: '#16223A', align: 'right', alpha: P.fin(t, ev.c6_225 + 0.3, 0.3), boil: 0 });
    P.stamp(ctx, 'DAY > YEAR', 1420, 830, t, ev.c6_225 + 0.7, { size: 84, color: C.gold });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — on Venus, sunrise to sunrise: ~117 Earth days
  P.shot(ev.c6_s2, (ctx, t) => {
    P.board(ctx, t, { tone: 0.4 });
    const u = P.eio((t - ev.c6_sunrise + 0.4) / 3.5); const sx = 360 + u * 260, sy = 820 - u * 180;
    P.sun(ctx, sx, sy, 70, t, { a: 0.9 });
    P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(-20, 840); for (let x = -20; x <= W + 20; x += 40) c.lineTo(x, 840 + 18 * Math.sin(x / 140) + 10 * U.hash(x, 3)); c.lineTo(W + 20, H + 20); c.lineTo(-20, H + 20); c.closePath(); }, VENUS, 6, 1, { fill: '#6B5532', fillA: 0.9, scribble: true, seed: 65, gap: 13 });
    ctx.save(); ctx.globalAlpha = 0.18; ctx.fillStyle = VENUS; ctx.fillRect(0, 0, W, 840); ctx.restore();
    P.counter(ctx, { x: 1300, y: 330, from: 0, to: 117, t, t0: ev.c6_sunrise, t1: ev.c6_117, size: 150, prefix: '~', sub: 'Earth days, sunrise to sunrise', color: C.gold });
    P.stamp(ctx, 'ONE VENUS DAY', 1300, 640, t, ev.c6_117 + 0.4, { size: 72, color: VENUS });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S3 — Mercury: three spins for every two orbits → one day (sunrise to sunrise) = two of its years
  P.shot(ev.c6_s3, (ctx, t) => {
    P.board(ctx, t); P.stars(ctx, t, { n: 90, seed: 66 });
    const cx = 620, cy = 560, R = 320; P.sun(ctx, cx, cy, 70, t);
    P.stroke(ctx, (c) => { c.beginPath(); c.arc(cx, cy, R, 0, 7); }, C.dim, 3, 0.7, { seed: 67 });
    const km = P.pop(t, ev.c6_merc, 0.45);
    const u = clamp((t - ev.c6_merc - 0.3) / 5.0); const orb = u * 2 * 6.283, spin = u * 3 * 6.283;   // 2 orbits, 3 spins
    const mx = cx + Math.cos(orb) * R, my = cy + Math.sin(orb) * R;
    ball(ctx, mx, my, 46 * km, '#B9B2A8', '#DDD6CC', 0, { seed: 68 });
    if (km > 0) { P.line(ctx, mx, my, mx + Math.cos(spin) * 70, my + Math.sin(spin) * 70, C.coral, 6, clamp(km), 1, { dash: false }); P.circle(ctx, mx + Math.cos(spin) * 70, my + Math.sin(spin) * 70, 8, C.coral, 4, clamp(km), { fill: C.coral, fillA: 1, dash: false }); }
    P.label(ctx, 'MERCURY', mx, my + 90, { size: 36, align: 'center', color: C.chalk, alpha: clamp(km), fam: FT.title });
    const ns = Math.min(3, Math.floor(u * 3 + 1e-6)), no = Math.min(2, Math.floor(u * 2 + 1e-6));
    G.text(ctx, `spins: ${ns}`, 1400, 330, { size: 80, fam: FT.num, color: C.coral, align: 'center', alpha: clamp(km), boil: 0 });
    G.text(ctx, `orbits: ${no}`, 1400, 460, { size: 80, fam: FT.num, color: C.sky, align: 'center', alpha: clamp(km), boil: 0 });
    P.stamp(ctx, '1 DAY = 2 YEARS', 1400, 700, t, ev.c6_twoyears, { size: 80, color: C.gold });
    P.label(ctx, 'sunrise to sunrise, on Mercury', 1400, 810, { size: 36, align: 'center', alpha: P.fin(t, ev.c6_twoyears + 0.3, 0.4) });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S4 — Venus: no global magnetic field of its own; scientists still debate why
  P.shot(ev.c6_s4, (ctx, t) => {
    P.board(ctx, t);
    ball(ctx, 700, 560, 260, VENUS, VBAND, -t * 0.02, { seed: 69 });
    const kn = P.fin(t, ev.c6_nofield - 0.3, 0.5);
    for (let i = 1; i <= 3; i++) for (const side of [-1, 1]) P.stroke(ctx, (c) => { c.beginPath(); for (let k = 0; k <= 50; k++) { const th = 0.2 + k / 50 * (Math.PI - 0.4); const r = (300 + i * 80) * Math.pow(Math.sin(th), 2); c.lineTo(700 + side * Math.sin(th) * r, 560 - Math.cos(th) * r); } }, C.mint, 4, kn * 0.6 * (1 - P.fin(t, ev.c6_nofield + 0.5, 0.8)), { seed: 80 + i + side });
    P.icon(ctx, 'magnet', 1400, 380, 90, { a: kn }); P.icon(ctx, 'cross', 1400, 380, 130, { a: P.fin(t, ev.c6_nofield + 0.4, 0.3) });
    P.tag(ctx, 'no global magnetic field', 1400, 580, t, ev.c6_nofield + 0.3, 1e9, { size: 46, border: C.mint });
    const kq = P.fin(t, ev.c6_debate - 0.2, 0.3); for (let i = 0; i < 3; i++) { const k = P.pop(t, ev.c6_debate + i * 0.18, 0.3); if (k > 0) G.text(ctx, '?', 1260 + i * 140, 840, { size: 110 * k, fam: FT.title, color: [C.gold, C.coral, C.sky][i], align: 'center', boil: 0 }); }
    P.label(ctx, 'scientists still debate exactly why', 1400, 940, { size: 38, align: 'center', alpha: kq });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S5 — the Moon is locked: it turns once per orbit, so the same face (gold dot) always points at us
  P.shot(ev.c6_s5, (ctx, t) => {
    P.board(ctx, t); P.stars(ctx, t, { n: 110, seed: 70 });
    const cx = 760, cy = 560, R = 380; P.globe(ctx, cx, cy, 150, t, { lon0: -t * 25, lat0: 90 });
    P.stroke(ctx, (c) => { c.beginPath(); c.arc(cx, cy, R, 0, 7); }, C.dim, 3, 0.6, { seed: 71 });
    const an = (t - ev.c6_s5) * 0.55; const mx = cx + Math.cos(an) * R, my = cy + Math.sin(an) * R;
    P.moon(ctx, mx, my, 62, { face: P.fin(t, ev.c6_locked - 0.3, 0.3), rot: an });
    P.line(ctx, mx - Math.cos(an) * 66, my - Math.sin(an) * 66, cx + Math.cos(an) * 160, cy + Math.sin(an) * 160, C.gold, 3, P.fin(t, ev.c6_face - 0.2, 0.3) * 0.7, 1, { dash: true });
    P.stamp(ctx, 'LOCKED', 1540, 360, t, ev.c6_locked, { size: 90, color: C.chalk });
    P.tag(ctx, 'always the same face toward Earth', 1540, 560, t, ev.c6_face, 1e9, { size: 40, border: C.gold });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S6 — the far future: ~5 billion years → the Sun becomes a red giant, long before Earth could lock to the Moon (tens of billions)
  P.shot(ev.c6_s6, (ctx, t) => {
    P.board(ctx, t);
    const y = 760, x0 = 200, x1 = 1760; const kx = (gy) => x0 + (x1 - x0) * gy / 60;   // 0..60 billion years
    P.arrow(ctx, x0, y, x1 + 40, y, { color: C.chalk, lw: 6 });
    P.circle(ctx, x0, y, 12, C.gold, 5, 1, { fill: C.gold, fillA: 1, dash: false }); P.label(ctx, 'today', x0, y + 60, { size: 38, align: 'center', color: C.chalk });
    const kl = P.fin(t, ev.c6_tens - 0.2, 0.4); P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(kx(30), y); c.lineTo(kx(60), y); }, C.sky, 14, kl * 0.6, { dash: false, seed: 72 });
    P.label(ctx, 'Earth locked to the Moon: tens of billions of years', kx(45), y + 60, { size: 34, align: 'center', color: C.sky, alpha: kl });
    const kf = P.pop(t, ev.c6_five, 0.4); if (kf > 0) { P.line(ctx, kx(5), y - 20, kx(5), y + 20, C.coral, 6, 1, 1, { dash: false }); P.label(ctx, '~5 billion years', kx(5), y + 60, { size: 34, align: 'center', color: C.coral, alpha: clamp(kf) }); }
    const kg = P.eio((t - ev.c6_giant + 0.3) / 1.6); const sr = lerp(40, 330, kg); const sc = P.mix(C.sun, '#FF5A3C', kg);
    const ksun = P.pop(t, ev.c6_s6 + 0.3, 0.4); if (ksun > 0) { P.glow(ctx, kx(5), 400, sr * 2.2, C.sun, 0.8 * clamp(ksun) * (1 - kg)); P.glow(ctx, kx(5), 400, sr * 2.2, '#FF5A3C', 0.8 * kg); P.stroke(ctx, (c) => { c.beginPath(); c.arc(kx(5), 400, sr * clamp(ksun), 0, 7); }, sc, 6, clamp(ksun), { fill: sc, fillA: 0.6, scribble: true, seed: 73 }); P.label(ctx, 'the Sun', kx(5) + sr + 30, 410, { size: 38, color: C.chalk, alpha: clamp(ksun) * (1 - kg) }); }
    P.stamp(ctx, 'RED GIANT', 1150, 330, t, ev.c6_giant + 0.2, { size: 90, color: '#FF7A5A' });
    P.label(ctx, 'it comes first', 1150, 450, { size: 40, align: 'center', color: C.chalk, alpha: P.fin(t, ev.c6_giant + 0.8, 0.4) });
  }, { in: { type: 'fade', dur: 0.5 } });
})();
