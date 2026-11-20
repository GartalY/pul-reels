// Chapter 1 — The Christmas child: 1877, India's monsoon fails, the worst famine in its history · 1904 Gilbert Walker heads India's
// observatories, job: predict the monsoon · pressure readings → a see-saw of air (Indian Ocean ↔ eastern Pacific) · 1920s "Southern
// Oscillation", but what rocks it? · 1969 Jacob Bjerknes: warm water + see-saw = one machine of ocean and air = ENSO · a normal day…
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  P.gear = (ctx, x, y, r, n, rot, col, { a = 1, label = '' } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha *= a;
    const pts = []; for (let i = 0; i < n * 4; i++) { const an = i / (n * 4) * 6.283; const rr = (i % 4 < 2) ? r : r * 0.84; pts.push([Math.cos(an) * rr, Math.sin(an) * rr]); }
    P.iP(ctx, pts, col, { lw: 6, shadow: 0.9, dots: C.ink, dotA: 0.15 }); P.iC(ctx, 0, 0, r * 0.3, C.cream, { lw: 5 }); ctx.restore();
    if (label) P.ctext(ctx, label, x, y + r * 0.62 + 18, { size: r * 0.32, color: C.cream, stroke: C.ink, strokeW: 8, a }); };
  P.seesaw = (ctx, x, y, len, ang, { a = 1, lab = '', col = C.red } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; P.iP(ctx, [[x - 50, y + 90], [x + 50, y + 90], [x, y]], C.land2, { lw: 6, shadow: 0.8 });
    ctx.translate(x, y); ctx.rotate(ang); P.iR(ctx, -len / 2, -22, len, 44, 10, col, { lw: 6, shadow: 0.8, dots: C.red2, dotA: 0.3 }); if (lab) P.ctext(ctx, lab, 0, 14, { size: 40, color: C.cream, stroke: C.ink, strokeW: 7 }); ctx.restore(); };

  P.cardShot('c1', 1, 'The Christmas child', C.yel, (ctx, t) => {
    P.glow(ctx, 1640, 160, 200, C.yel, 0.8); P.ink(ctx, P.starPath(1640, 160, 54, 5, 0.45, 4), C.yel, { lw: 6 });
    P.boat(ctx, 250, 1040, 0.6, t, { people: 1, col: C.blue });
  });

  // S1 — 1877: India's monsoon fails; the worst famine in its history (sober: dry fields, no people suffering on screen)
  P.shot(ev.c1_s1, (ctx, t) => {
    P.bgPaper(ctx, t, { tint: 'rgba(214,170,110,0.35)' });
    const m = P.mapCache('india', { lon0: 62, lon1: 100, lat0: 4, lat1: 38, w: 1100, sea: '#7FB9D8' }); const pj = P.drawMap(ctx, m, 110, 140, 0.78);
    ctx.strokeStyle = C.ink; ctx.lineWidth = 8; ctx.strokeRect(110, 140, m.w * 0.78, m.h * 0.78);
    P.countryOn(ctx, pj, 'India', P.mix(C.land, C.warm, P.fin(t, ev.c1_failed, 1)), { lw: 5 });
    P.cstamp(ctx, '1877', 250, 120, t, ev.c1_1877, { size: 90, color: C.red });
    P.cloud(ctx, 520, 300, 0.9, { a: 1 - 0.6 * P.fin(t, ev.c1_failed, 0.6) }); P.drops(ctx, 440, 350, 160, 200, t, { n: 10, a: 1 - P.fin(t, ev.c1_failed - 0.2, 0.4) });
    P.cross(ctx, 440, 230, 600, 370, (t - ev.c1_failed) / 0.35);
    P.lab(ctx, 'MONSOON RAINS', 520, 190, { size: 34, a: P.fin(t, ev.c1_rains, 0.3) });
    P.panel(ctx, 1080, 200, 720, 520, t, ev.c1_failed + 0.2, (c) => { c.fillStyle = '#F6D8A0'; c.fillRect(0, 0, 720, 520); P.sunIcon(c, 600, 110, 60, t); P.crack(c, 0, 320, 720, 200);
      for (let i = 0; i < 6; i++) { const x = 80 + i * 110, droop = P.fin(t, ev.c1_worst, 1.4); c.save(); c.translate(x, 330); P.line(c, 0, 0, Math.sin(droop * 1.2) * 30, -110 + droop * 40, C.green2, 7); P.iE(c, Math.sin(droop * 1.2) * 30 + 14, -100 + droop * 50, 24, 9, P.mix(C.green, C.land2, droop), { lw: 3, rot: 0.6 + droop }); c.restore(); } });
    P.caption(ctx, 'THE WORST FAMINE IN ITS HISTORY', 1080, 800, t, ev.c1_worst, { size: 50, fill: C.cream });
    P.source(ctx, 'Columbia University IRI', t, ev.c1_worst);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — 1904: Gilbert Walker, head of India's weather observatories; the job: predict the monsoon
  P.shot(ev.c1_s2, (ctx, t) => {
    P.bgPaper(ctx, t, { tint: 'rgba(214,170,110,0.25)', rays: 0.12, rayCol: C.land2, cx: 600, cy: 500 });
    P.iR(ctx, 1080, 120, 520, 380, 6, C.sky2, { lw: 7 }); P.line(ctx, 1340, 120, 1340, 500, C.ink, 6); P.line(ctx, 1080, 310, 1600, 310, C.ink, 6); P.cloud(ctx, 1240 + Math.sin(t * 0.4) * 20, 230, 0.5);
    P.iR(ctx, 820, 760, 1000, 40, 6, C.land2, { lw: 6, shadow: 0.8 }); P.iR(ctx, 860, 800, 30, 280, 4, C.land2, { lw: 5 }); P.iR(ctx, 1760, 800, 30, 280, 4, C.land2, { lw: 5 });
    for (let i = 0; i < 4; i++) { const k = P.pop(t, ev.c1_obs + i * 0.15); if (k > 0) P.at(ctx, 1000 + i * 150, 740, k, -0.1 + i * 0.07, () => { P.iR(ctx, -60, -40, 120, 70, 3, C.cream, { lw: 4 }); for (let j = 0; j < 3; j++) P.line(ctx, -44, -22 + j * 16, 40, -22 + j * 16, C.grey, 3); }); }
    P.sil(ctx, 520, 880, 0.92, t, { hat: 0, name: 'GILBERT WALKER', sub: 'INDIA · 1904', a: P.fin(t, ev.c1_walker - 0.3, 0.4), pose: t > ev.c1_predict ? 'point' : 'stand' });
    P.cstamp(ctx, '1904', 200, 140, t, ev.c1_1904, { size: 90, color: C.red });
    P.caption(ctx, 'HEAD OF INDIA\'S WEATHER OBSERVATORIES', 120, 260, t, ev.c1_obs, { size: 40, fill: C.cream });
    const jk = P.pop(t, ev.c1_job, 0.4); if (jk > 0) P.at(ctx, 1340, 640, jk, 0.04, () => { P.iR(ctx, -280, -110, 560, 220, 4, C.white, { lw: 6, shadow: 1 }); P.iC(ctx, 0, -110, 16, C.red, { lw: 4 });
      G.text(ctx, 'JOB:', -240, -40, { size: 46, fam: 'Bangers', color: C.ink, boil: 0 }); G.text(ctx, 'PREDICT THE MONSOON', 0, 40, { size: 58, fam: 'Bangers', color: C.red, align: 'center', boil: 0 }); P.circle(ctx, 0, 22, 280, 60, (t - ev.c1_predict) / 0.6); });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — readings from around the world → a see-saw of air between the Indian Ocean and the eastern Pacific
  const SEE = (t) => { const base = -0.16 * P.eio((t - ev.c1_rose) / 0.6) + 0.32 * P.eio((t - ev.c1_round) / 0.8);
    return t < ev.c1_round + 0.8 ? base : 0.16 * Math.cos((t - ev.c1_round - 0.8) * 1.6); };
  P.shot(ev.c1_s3, (ctx, t) => {
    ctx.fillStyle = C.sea; ctx.fillRect(-600, -600, W + 1200, H + 1200);
    const m = P.mapCache('indopac', { lon0: 40, lon1: 300, lat0: -50, lat1: 55, w: 2400 }); const s = 0.8; const pj = P.drawMap(ctx, m, 0, 540 - m.h * s / 2, s);
    const spots = [[78, -12], [130, -12], [150, -34], [-150, -17], [-110, -10], [-80, 10], [10, 50], [-70, 45], [100, 35], [20, -30]];
    spots.forEach(([lo, la], i) => { const p = pj(lo, la); const k = P.pop(t, ev.c1_read - 0.3 + i * 0.12, 0.3); if (k <= 0) return; P.at(ctx, p[0], p[1], k * 0.8, 0, () => { P.iC(ctx, 0, 0, 30, C.cream, { lw: 5 }); P.line(ctx, 0, 0, Math.cos(t * 2 + i) * 22, Math.sin(t * 2 + i) * 22, C.red, 4); }); });
    const L0 = pj(80, -15), R0 = pj(-115, -15), mid = [(L0[0] + R0[0]) / 2, (L0[1] + R0[1]) / 2 + 40]; const ang = t < ev.c1_rose ? 0 : SEE(t);
    const sk = P.fin(t, ev.c1_strange, 0.5); P.seesaw(ctx, mid[0], mid[1], R0[0] - L0[0], ang, { a: sk });
    const lx = mid[0] - Math.cos(ang) * (R0[0] - L0[0]) / 2, ly = mid[1] - Math.sin(ang) * (R0[0] - L0[0]) / 2, rx = mid[0] + Math.cos(ang) * (R0[0] - L0[0]) / 2, ry = mid[1] + Math.sin(ang) * (R0[0] - L0[0]) / 2;
    const flip = t > ev.c1_round + 0.4; P.burstStar(ctx, lx, ly - 110, 100, t, ev.c1_rose, { color: flip ? C.cyan : C.yel, text: flip ? 'LOW' : 'HIGH', size: 56, tcol: C.ink, n: 12 }); P.burstStar(ctx, rx, ry - 110, 100, t, ev.c1_fall, { color: flip ? C.yel : C.cyan, text: flip ? 'HIGH' : 'LOW', size: 56, tcol: C.ink, n: 12, seed: 3 });
    P.lab(ctx, 'INDIAN OCEAN', L0[0], L0[1] + 110, { size: 32, color: C.cream, stroke: C.ink, a: sk }); P.lab(ctx, 'EASTERN PACIFIC', R0[0], R0[1] + 110, { size: 32, color: C.cream, stroke: C.ink, a: sk });
    P.caption(ctx, 'AIR PRESSURE', 80, 60, t, ev.c1_read, { size: 44 });
    P.slam(ctx, 'A GIANT SEE-SAW OF AIR!', 960, 980, t, ev.c1_seesaw, { size: 92, color: C.yel });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — 1920s: "the Southern Oscillation" … but what rocks it? (Walker shrugs, a big "?")
  P.shot(ev.c1_s4, (ctx, t) => {
    P.bgPaper(ctx, t, { tint: 'rgba(214,170,110,0.25)', rays: 0.2, rayCol: C.cyan, cx: 1200, cy: 520 });
    const ang = Math.sin((t - ev.c1_s4) * 1.8) * 0.17 * (t > ev.c1_rock ? 1.4 : 1); P.seesaw(ctx, 1200, 560, 1100, ang, { lab: t > ev.c1_so ? 'SOUTHERN OSCILLATION' : '' });
    P.cloud(ctx, 1200 - Math.cos(ang) * 520, 560 - Math.sin(ang) * 520 - 100, 0.6); P.cloud(ctx, 1200 + Math.cos(ang) * 520, 560 + Math.sin(ang) * 520 - 100, 0.6);
    P.cstamp(ctx, '1920s', 1200, 150, t, ev.c1_1920, { size: 80, color: C.blue });
    P.slam(ctx, 'SOUTHERN OSCILLATION', 1200, 300, t, ev.c1_so, { size: 92, color: C.yel, t1: ev.c1_cant + 0.2 });
    P.sil(ctx, 400, 900, 0.9, t, { name: 'GILBERT WALKER', pose: t > ev.c1_cant ? 'shrug' : 'stand' });
    P.burstStar(ctx, 1200, 330, 120, t, ev.c1_cant + 0.1, { color: C.yel, text: '?', size: 170, tcol: C.red, n: 12 });
    P.bubble(ctx, 'WHAT ROCKS IT?', 600, 300, 440, 470, t, ev.c1_rock, { size: 48, think: true });
  }, { in: { type: 'wipe', dir: 'right', dur: 0.5 } });

  // S5 — 1969: Jacob Bjerknes connects the dots → warm water + see-saw = one machine (two gears) = ENSO
  P.shot(ev.c1_s5, (ctx, t) => {
    P.bgPaper(ctx, t, { rays: 0.3, rayCol: C.yel, cy: 480 });
    P.cstamp(ctx, '1969', 220, 120, t, ev.c1_1969, { size: 90, color: C.red });
    P.sil(ctx, 200, 900, 0.75, t, { name: 'JACOB BJERKNES', sub: '1969', a: P.fin(t, ev.c1_bj - 0.3, 0.4), pose: t > ev.c1_dots ? 'point' : 'stand' });
    const join = P.eio((t - ev.c1_same + 0.1) / 0.6); const gk = P.fin(t, ev.c1_machine - 0.1, 0.35);
    const pw = 520; const lx = lerp(560, 690, join), rx = lerp(1260, 1130 - 0, join);
    if (gk < 1) { ctx.save(); ctx.globalAlpha *= 1 - gk;
      P.panel(ctx, lx - 260 + 260 - pw / 2, 240, pw, 420, t, ev.c1_warm, (c) => { c.translate(-700, -440); P.duskSea(c, t, { horizon: 520 }); c.translate(700, 440); P.heat(c, 260, 330, 300, 70, t); G.text(c, 'FISHERMEN\'S WARM WATER', 260, 400, { size: 36, fam: 'Bangers', color: C.cream, stroke: C.ink, strokeW: 7, align: 'center', boil: 0 }); }, { from: 'left' });
      P.panel(ctx, rx - pw / 2, 240, pw, 420, t, ev.c1_see, (c) => { c.fillStyle = C.sky2; c.fillRect(0, 0, pw, 420); P.seesaw(c, 260, 200, 400, Math.sin(t * 2) * 0.15); G.text(c, 'WALKER\'S SEE-SAW', 260, 400, { size: 36, fam: 'Bangers', color: C.cream, stroke: C.ink, strokeW: 7, align: 'center', boil: 0 }); }, { from: 'right' });
      ctx.restore(); }
    if (gk > 0) { const r = (t - ev.c1_machine) * 1.2; P.gear(ctx, 820, 460, 200 * gk, 12, r, C.sea, { label: 'OCEAN' }); P.gear(ctx, 1170, 400, 170 * gk, 10, -r * 1.18 + 0.15, C.cyan, { label: 'AIR' }); }
    const fl = t > ev.c1_same ? Math.exp(-(t - ev.c1_same) * 6) : 0; if (fl > 0.02) P.glow(ctx, 960, 450, 500, C.yel, fl);
    P.slam(ctx, 'ENSO', 1000, 790, t, ev.c1_enso, { size: 160, color: C.red, rot: -0.04 });
    P.caption(ctx, 'EL NIÑO – SOUTHERN OSCILLATION', 1000, 900, t, ev.c1_enso + 0.3, { size: 42, align: 'center' });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — "a normal day" — Pico with a magnifying glass over a calm cross-section; "it's not what you think"
  P.shot(ev.c1_s6, (ctx, t) => {
    ctx.save(); P.push(ctx, (t - ev.c1_s6) / 4, 960, 540, 0.03); P.section(ctx, t, 0, { labels: 0, windFace: 0, wind: 0.6, notToScale: 0 }); ctx.restore();
    P.caption(ctx, 'A NORMAL DAY IN THE PACIFIC', 80, 60, t, ev.c1_normal, { size: 50 });
    Ch.pico(ctx, { x: 1790, y: 560, s: 0.55, t, dir: -1, gesture: 'hold', mouth: P.talk(t), look: -1, prop: (c, hx, hy) => { P.line(c, hx, hy, hx + 60, hy - 60, C.ink, 10); P.iC(c, hx + 100, hy - 100, 56, 'rgba(220,240,255,0.5)', { lw: 8 }); } });
    P.slam(ctx, 'IT\'S NOT WHAT YOU THINK!', 960, 200, t, ev.c1_think, { size: 84, color: C.yel });
  }, { in: { type: 'iris', color: C.yel, at: [960, 540], dur: 0.7 } });
})();
