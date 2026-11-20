// Chapter 3 — When the wind lets go: every 2–7 years the trade winds weaken, even reverse; the warm water sloshes back east · Kelvin waves
// under the surface, about bicycle speed, 2–3 months across · the warm water covers the cold off Peru: nutrients fade, fish go deeper ·
// the feedback trap · Niño 3.4 box: +0.5 °C = El Niño, above +2 °C "very strong" / "super" · the most important thing that moves is the rain.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  P.bike = (ctx, x, y, s, t, { a = 1 } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a; const r = 46, sp = t * 6;
    for (const wx of [-70, 70]) { P.iC(ctx, wx, 0, r, null, { lw: 7 }); for (let i = 0; i < 3; i++) P.line(ctx, wx, 0, wx + Math.cos(sp + i * 2.09) * r, Math.sin(sp + i * 2.09) * r, C.ink, 3); }
    P.trace(ctx, [[-70, 0], [-10, -70], [50, -70], [70, 0]], 1, C.red, 9); P.trace(ctx, [[-10, -70], [0, 0], [-70, 0]], 1, C.red, 9); P.line(ctx, 50, -70, 60, -100, C.ink, 7); P.line(ctx, 44, -100, 80, -100, C.ink, 7); P.iE(ctx, -16, -82, 26, 9, C.ink, { lw: 0 }); ctx.restore(); };

  P.cardShot('c3', 3, 'When the wind lets go', C.warm, (ctx, t) => { P.windFace(ctx, 1640, 960, 0.7, t, { energy: 0.1, dir: -1 }); });

  // S1 — every few years the trade winds weaken, even reverse → the warm water sloshes back east
  P.shot(ev.c3_s1, (ctx, t) => {
    const wd = lerp(lerp(1, 0.2, P.eio((t - ev.c3_weak) / 1.0)), -0.45, P.eio((t - ev.c3_rev) / 0.8)); const st = 0.35 * P.eio((t - ev.c3_slosh + 0.2) / 2.2);
    P.section(ctx, t, st, { wind: wd, labels: 0.7 });
    P.caption(ctx, 'EVERY 2–7 YEARS…', 80, 60, t, ev.c3_s1 + 0.3, { size: 50 });
    P.cstamp(ctx, 'WEAKER', 1240, 330, t, ev.c3_weak, { size: 60, color: C.blue, t1: ev.c3_rev });
    P.cstamp(ctx, 'REVERSED!', 1240, 330, t, ev.c3_rev, { size: 60, color: C.red });
    const k = P.oc((t - ev.c3_slosh) / 1.2); P.fatArrow(ctx, 420, 660, lerp(420, 1300, k), 660, { k: k > 0 ? 1 : 0, w: 60, color: C.yel, a: P.fin(t, ev.c3_slosh, 0.3) });
    P.slam(ctx, 'SLOSH!', 1360, 760, t, ev.c3_east, { size: 110, color: C.yel, rot: 0.06 });
    P.source(ctx, 'NOAA', t, ev.c3_s1 + 0.3, { t1: ev.c3_weak + 1 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — Kelvin waves: a bulge of warm water travelling under the surface · bicycle speed · 2–3 months to cross
  P.shot(ev.c3_s2, (ctx, t) => {
    const dur = Math.max(4, ev.c3_cross + 1.2 - ev.c3_s2); const kk = clamp((t - ev.c3_s2 - 0.3) / dur); const st = lerp(0.35, 0.6, kk);
    P.section(ctx, t, st, { wind: -0.2, kel: { k: kk, a: P.fin(t, ev.c3_huge - 0.3, 0.6) }, labels: 0, windFace: 0.5 });
    const kx = lerp(P.SEC.X0 + 100, P.SEC.X1 - 80, kk); const sy = P.secSurface(kx, st);
    P.slam(ctx, 'KELVIN WAVE', kx, 930, t, ev.c3_kelvin, { size: 90, color: C.yel });
    P.fatArrow(ctx, kx - 160, 860, kx + 60, 860, { w: 30, color: C.yel, a: P.fin(t, ev.c3_kelvin, 0.3) });
    P.bike(ctx, kx, sy - 50, 0.8, t, { a: P.fin(t, ev.c3_bike - 0.2, 0.3) });
    P.cstamp(ctx, '≈ 8–16 KM/H', kx, sy - 210, t, ev.c3_bike + 0.3, { size: 50, color: C.blue });
    const mk = P.pop(t, ev.c3_months, 0.4); if (mk > 0) P.at(ctx, 1700, 120, mk, 0.03, () => { P.iR(ctx, -150, -80, 300, 170, 6, C.white, { lw: 6, shadow: 1 }); P.iR(ctx, -150, -80, 300, 46, 6, C.red, { lw: 6 });
      G.text(ctx, '2–3', 0, 50, { size: 80, fam: 'Bangers', color: C.ink, align: 'center', boil: 0 }); G.text(ctx, 'MONTHS', 0, -45, { size: 34, fam: 'Bangers', color: C.cream, align: 'center', boil: 0 }); });
    P.source(ctx, 'NOAA Ocean Service', t, ev.c3_bike);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S3 — the warm water covers the cold off Peru; nutrients fade; fish go deeper or disappear — what the fishermen saw at Christmas
  P.shot(ev.c3_s3, (ctx, t) => {
    const cov = P.eio((t - ev.c3_cover + 0.2) / 1.2); const st = lerp(0.6, 1, cov);
    ctx.save(); ctx.translate(960, 540); ctx.scale(1.6, 1.6); ctx.translate(-1380, -650);
    P.section(ctx, t, st, { wind: -0.2, labels: 0, windFace: 0, upwell: 1 - cov, notToScale: 0 });
    const nf = 1 - P.fin(t, ev.c3_fade, 0.8); for (let i = 0; i < 26; i++) { const ph = (t * 0.25 + U.hash(i, 8)) % 1; const x = 1430 + U.hash(i, 9) * 230, y = lerp(1000, 680, ph); P.circ(ctx, x, y, 5, C.green, { a: nf * Math.sin(ph * Math.PI) }); }
    const dd = P.eio((t - ev.c3_deep) / 1.2), gone = P.fin(t, ev.c3_dis, 0.6);
    for (let i = 0; i < 7; i++) P.fish(ctx, 1560 - (i % 4) * 60, 620 + Math.floor(i / 4) * 40 + (i % 2) * 14 + dd * 260, 0.38, t, { seed: i, dir: -1, a: 1 - gone * (i % 2 ? 1 : 0.6), col: C.cyan });
    ctx.restore();
    P.caption(ctx, 'WARM WATER ARRIVES', 80, 60, t, ev.c3_arr, { size: 50, fill: C.warm2 });
    P.cstamp(ctx, 'NUTRIENTS FADE', 1500, 160, t, ev.c3_fade, { size: 50, color: C.green2 });
    P.panel(ctx, 1240, 620, 600, 380, t, ev.c3_xmas - 0.3, (c) => { c.translate(-660, -400); P.duskSea(c, t, { horizon: 560 }); c.translate(660, 400); P.boat(c, 300, 300, 0.6, t, { net: 1, catch_: 1, people: 1 });
      P.ink(c, P.starPath(520, 70, 30, 5, 0.45, 2), C.yel, { lw: 4 }); G.text(c, 'AT CHRISTMAS…', 30, 360, { size: 40, fam: 'Bangers', color: C.cream, stroke: C.ink, strokeW: 7, boil: 0 }); });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — the trap: a feedback loop (weaker winds → warm water flows east → warmer east → weaker winds…)
  P.shot(ev.c3_s4, (ctx, t) => {
    P.bgPaper(ctx, t, { rays: 0.3, rayCol: C.warm2, cy: 560, spin: 0.08 });
    const cx = 960, cy = 570, R = 300; const spin = (t - ev.c3_s4) * (t > ev.c3_feeds ? 2.4 : 0.8);
    for (let i = 0; i < 3; i++) { const a0 = i / 3 * 6.283 - 1.57 + 0.45 + spin * 0.2, a1 = a0 + 6.283 / 3 - 0.9; const pts = []; for (let k = 0; k <= 20; k++) { const a = lerp(a0, a1, k / 20); pts.push([cx + Math.cos(a) * R, cy + Math.sin(a) * R]); }
      const ak = P.fin(t, [ev.c3_w1, ev.c3_w2, ev.c3_w3][i] + 0.2, 0.4); P.trace(ctx, pts, ak, C.ink, 18); P.trace(ctx, pts, ak, C.red, 10); if (ak > 0.95) { const e = pts[20], p = pts[18]; P.fatArrow(ctx, p[0], p[1], e[0] + (e[0] - p[0]) * 0.6, e[1] + (e[1] - p[1]) * 0.6, { w: 22, color: C.red }); } }
    const nodes = [[ev.c3_w1, 'WARMER EAST', -1.57], [ev.c3_w2, 'WEAKER WINDS', 0.52], [ev.c3_flow, 'MORE WARM WATER FLOWS EAST', 2.62]];
    nodes.forEach(([t0, lab, a], i) => { const k = P.pop(t, t0, 0.35); if (k <= 0) return; const x = cx + Math.cos(a + spin * 0.2) * R, y = cy + Math.sin(a + spin * 0.2) * R; P.at(ctx, x, y, k, 0, () => {
      P.iC(ctx, 0, 0, 92, [C.warm, C.white, C.yel][i], { lw: 6, shadow: 1 }); if (i === 0) P.thermo(ctx, 0, 40, 90, 0.8, { w: 30 }); if (i === 1) P.windFace(ctx, 0, 6, 0.4, t, { energy: 0.2 }); if (i === 2) P.fatArrow(ctx, -50, 0, 50, 0, { w: 30, color: C.warm });
      P.cstamp(ctx, lab, 0, 130, t, t0, { size: 34, color: C.blue }); }); });
    P.slam(ctx, 'THE TRAP', 960, 110, t, ev.c3_trap, { size: 110, color: C.yel });
    P.burstStar(ctx, cx, cy, 120, t, ev.c3_feeds, { color: C.red, text: 'IT FEEDS', size: 50, tcol: C.yel, sub: 'ITSELF!', subSize: 34 });
    P.source(ctx, 'NOAA climate.gov · Bjerknes 1969', t, ev.c3_feeds);
  }, { in: { type: 'wipe', dir: 'left', dur: 0.5 } });

  // S5 — the Niño 3.4 box · +0.5 °C for months = El Niño · above +2 °C = very strong ("super")
  P.shot(ev.c3_s5, (ctx, t) => {
    ctx.fillStyle = C.sea; ctx.fillRect(-600, -600, W + 1200, H + 1200);
    const m = P.pac(); const pj = P.drawMap(ctx, m, -1000, 540 - m.h * 0.95 / 2, 0.95);
    const [a0, b0, a1, b1] = P.N34; P.lonLatBox(ctx, pj, a0, b0, a1, b1, P.oc((t - ev.c3_box) / 0.6), { col: C.yel });
    const c = pj(-145, 0); P.cstamp(ctx, 'NIÑO 3.4', c[0], c[1] - 110, t, ev.c3_34, { size: 60, color: C.red });
    const val = lerp(0, 0.5, P.eio((t - ev.c3_half + 0.3) / 0.6)) + lerp(0, 1.5, P.eio((t - ev.c3_two + 0.3) / 0.8)) + lerp(0, 0.8, P.eio((t - ev.c3_super) / 0.6));
    P.heat(ctx, pj(-145, 0)[0], pj(-145, 0)[1], 120 + 220 * clamp(val / 2.8), 40 + 50 * clamp(val / 2.8), t, { a: clamp(0.3 + val / 2) }); P.lonLatBox(ctx, pj, a0, b0, a1, b1, P.oc((t - ev.c3_box) / 0.6), { col: C.yel });
    ctx.save(); ctx.globalAlpha *= P.fin(t, ev.c3_half - 0.6, 0.4); P.iR(ctx, 1260, 70, 620, 940, 8, C.cream, { lw: 7, shadow: 1 }); ctx.restore();
    P.ninoGauge(ctx, 1380, 860, 700, val, t, { a: P.fin(t, ev.c3_half - 0.6, 0.4), hl: t > ev.c3_very ? 2 : t > ev.c3_isnino ? 0 : -1 });
    G.text(ctx, 'ABOVE NORMAL', 1570, 1000, { size: 30, fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0, alpha: P.fin(t, ev.c3_half - 0.6, 0.4) });
    P.cstamp(ctx, '= EL NIÑO', c[0], c[1] + 150, t, ev.c3_isnino, { size: 60, color: C.blue, t1: ev.c3_super });
    P.burstStar(ctx, c[0], c[1] + 190, 170, t, ev.c3_super, { color: C.yel, text: 'SUPER EL NIÑO', size: 64, tcol: C.red, n: 16 });
    P.source(ctx, 'NOAA CPC · Columbia Climate School', t, ev.c3_half);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — the most important thing that moves east isn't the water… it's the rain
  P.shot(ev.c3_s6, (ctx, t) => {
    P.section(ctx, t, 1, { wind: -0.2, labels: 0, cloudX: lerp(-400, 980, P.eio((t - ev.c3_rainw + 0.5) / 0.7)), rain: P.fin(t, ev.c3_rainw, 0.3) });
    const dk = P.pop(t, ev.c3_water, 0.35); if (dk > 0) P.at(ctx, 960, 680, dk, 0, () => { P.iP(ctx, [[0, -110], [70, 10], [60, 60], [0, 90], [-60, 60], [-70, 10]], C.cold, { lw: 7, curve: true, shadow: 1 }); });
    P.cross(ctx, 860, 570, 1060, 790, (t - ev.c3_water - 0.3) / 0.35);
    P.slam(ctx, 'IT\'S THE RAIN!', 1300, 900, t, ev.c3_rainw, { size: 120, color: C.yel, rot: -0.05 });
  }, { in: { type: 'fade', dur: 0.4 } });
})();
