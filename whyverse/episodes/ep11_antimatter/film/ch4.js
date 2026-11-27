// Chapter 4 — One in a billion: compare surviving matter with leftover light · for every billion pairs that wiped out, ≈ one extra matter particle
// survived · every star, planet, person = survivors · ≈ 411 particles of ancient light per cm³ around you · MYTH #3 anti-galaxies hiding →
// we'd see flashes at the borders; none found; no part of the observable universe is antimatter · not hidden: lost → physics favours matter. How?
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L } = S; const C = P.C;
  const W = G.W, H = G.H;
  const photon = (ctx, x, y, s, t, a = 1, seed = 0) => { const pts = []; for (let j = 0; j <= 8; j++) pts.push([x - 24 * s + j * 6 * s, y + Math.sin(j * 1.9 + t * 6 + seed) * 7 * s]); P.art(ctx, [pts], 1, { color: C.yel, lw: 5 * s, a }); P.art(ctx, [pts.map((p) => [p[0] + 2, p[1] + 2])], 1, { color: C.acc, lw: 1.6 * s, a: a * 0.5 }); };

  P.cardShot('c4', 4, 'One in a billion', (ctx, t) => { for (let i = 0; i < 24; i++) { const x = 1480 + (i % 8) * 50, y = 920 + Math.floor(i / 8) * 50; P.part(ctx, x, y, 14, i === 13 ? 'e' : 'p', { k: P.dk(t, S.CH.c4.t0 + 0.3 + i * 0.02, 0.3), sign: false, a: i === 13 ? 1 : 0.25 }); } });

  // S1 — compare surviving matter with leftover light: the answer is tiny
  P.shot(ev.c4_s1, (ctx, t) => {
    P.bgLine(ctx, t);
    P.scale(ctx, 960, 560, 1.15, t, { k: P.dk(t, ev.c4_s1, 0.6), tilt: lerp(0, 0.9, P.dk(t, ev.c4_light, 1.0)),
      left: (x, y) => { const k = P.dk(t, ev.c4_matter, 0.4); P.part(ctx, x, y - 30, 24, 'e', { k, sign: false }); G.text(ctx, 'MATTER', x, y - 150, { size: 44, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0, alpha: k }); },
      right: (x, y) => { const k = P.dk(t, ev.c4_light, 0.6); for (let i = 0; i < 26; i++) photon(ctx, x - 80 + (i % 6) * 32, y - 20 - Math.floor(i / 6) * 22, 0.8, t, k, i); G.text(ctx, 'LIGHT', x, y - 170, { size: 44, fam: 'Inter', weight: 900, color: '#B8860B', align: 'center', boil: 0, alpha: k }); } });
    P.rslam(ctx, 'TINY.', 960, 200, t, ev.c4_tiny, { size: 120 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — a field of pairs flashing out → a billion pairs → ONE extra survives
  P.shot(ev.c4_s2, (ctx, t) => {
    P.bgLine(ctx, t, { corner: 0 });
    const cols = 26, rows = 12; const tw = ev.c4_wiped; const keep = 6 * cols + 13;
    for (let i = 0; i < cols * rows; i++) { const x = 140 + (i % cols) * 63, y = 180 + Math.floor(i / cols) * 54; const tf = tw + U.hash(i, 3) * 1.2; const gone = clamp((t - tf) / 0.25);
      if (i === keep) continue; if (gone < 1) { P.part(ctx, x - 9, y, 11, 'e', { sign: false, a: 1 - gone, k: P.dk(t, ev.c4_s2 + (i % cols) * 0.01, 0.3) }); P.part(ctx, x + 9, y, 11, 'p', { sign: false, a: 1 - gone, k: P.dk(t, ev.c4_s2 + (i % cols) * 0.01, 0.3) }); }
      if (t > tf && t < tf + 0.35) P.iCirc(ctx, x, y, 22 * (1 - (t - tf) / 0.35), C.yel); }
    const kx = 140 + (keep % cols) * 63, ky = 180 + Math.floor(keep / cols) * 54; P.part(ctx, kx - 9, ky, 11, 'e', { sign: false, k: P.dk(t, ev.c4_s2, 0.3) });
    const sk = P.dk(t, ev.c4_one, 0.5); if (sk > 0) { P.glow(ctx, kx - 9, ky, 120, C.ink, sk); P.art(ctx, [P.circPts(kx - 9, ky, 46, 30)], sk, { color: C.acc, lw: 6 }); P.part(ctx, kx - 9, ky, 11 + 22 * sk, 'e', {}); }
    P.lcount(ctx, { x: 960, y: 940, from: 0, to: 1000000000, t, t0: ev.c4_billion - 0.3, t1: ev.c4_billion + 1.0, size: 96, suffix: ' PAIRS', align: 'center', tEnd: ev.c4_one });
    const ok = P.pop(t, ev.c4_one, 0.4); if (ok > 0) P.at(ctx, 960, 920, ok, -0.02, () => P.rtext(ctx, '+1 SURVIVED', 0, 30, { size: 110 }));
    P.note(ctx, 'just one', null, null, kx + 200, ky - 120, t, ev.c4_just, { size: 54 });
    P.source(ctx, 'CERN: "approximately one extra particle per billion"', t, ev.c4_one);
  }, { in: { type: 'push', dir: 'left', dur: 0.45 } });

  // S3 — every star, planet, person = survivors: 1 IN A BILLION
  P.shot(ev.c4_s3, (ctx, t) => {
    P.bgLine(ctx, t);
    const it = [[420, ev.c4_star, (x, y, k) => { P.star(ctx, x, y, 120 * k, C.yel); P.glow(ctx, x, y, 200, C.yel, k * 0.5); }, 'EVERY STAR'], [960, ev.c4_planet, (x, y, k) => P.brandPlanet(ctx, x, y, 100 * k, t, 1), 'EVERY PLANET'], [1500, ev.c4_person, (x, y, k) => P.person(ctx, x, y + 150, 0.9, t, { k }), 'EVERY PERSON']];
    it.forEach(([x, t0, f, s]) => { const k = P.pop(t, t0 - 0.2, 0.45); if (k <= 0) return; f(x, 430, k); G.text(ctx, s, x, 690, { size: 46, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0, alpha: clamp(k) }); });
    P.note(ctx, '= made of survivors', null, null, 960, 780, t, ev.c4_surv, { size: 56 });
    P.rslam(ctx, '1 IN A BILLION', 960, 960, t, ev.c4_1in, { size: 120 });
  }, { in: { type: 'fade', dur: 0.35 } });

  // S4 — ancient light still here: ≈ 411 per cubic centimetre, around you
  P.shot(ev.c4_s4, (ctx, t) => {
    P.bgLine(ctx, t);
    // isometric cube
    const ck = P.dk(t, ev.c4_s4 + 0.3, 0.8), cx = 1300, cy = 560, s = 230; const f = [[cx - s, cy - s * 0.4], [cx, cy - s * 0.9], [cx + s, cy - s * 0.4], [cx + s, cy + s * 0.75], [cx, cy + s * 1.25], [cx - s, cy + s * 0.75]];
    P.iPoly(ctx, f, C.blueW, { a: ck }); P.art(ctx, [{ pts: f, closed: true }, [[cx - s, cy - s * 0.4], [cx, cy + s * 0.1], [cx + s, cy - s * 0.4]], [[cx, cy + s * 0.1], [cx, cy + s * 1.25]]], ck, { lw: 6 });
    G.text(ctx, '1 cm³', cx, cy + s * 1.25 + 70, { size: 52, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0, alpha: ck });
    const n = Math.round(Data.count(t, ev.c4_411a, ev.c4_411, 0, 60, ease.outCubic)); for (let i = 0; i < n; i++) { const x = cx + (U.hash(i, 1) - 0.5) * s * 1.4 + Math.sin(t * 2 + i) * 12, y = cy + (U.hash(i, 2) - 0.3) * s * 1.3 + Math.cos(t * 2.3 + i) * 10; photon(ctx, x, y, 0.7, t, 0.95, i); }
    P.lcount(ctx, { x: 520, y: 560, from: 0, to: 411, t, t0: ev.c4_411a, t1: ev.c4_411, size: 200, prefix: '≈ ', align: 'center' });
    P.small(ctx, 'PARTICLES OF ANCIENT LIGHT', 520, 650, { align: 'center', size: 34, alpha: P.fin(t, ev.c4_411, 0.4) }); P.small(ctx, 'IN EVERY CUBIC CENTIMETRE OF SPACE', 520, 700, { align: 'center', size: 34, alpha: P.fin(t, ev.c4_cm, 0.4) });
    P.write(ctx, 'STILL HERE.', 520, 300, t, Math.min(ev.c4_still, ev.c4_s4 + 0.2), { size: 72, weight: 900, color: C.acc });
    Ch.elle(ctx, { x: 520, y: 1060, s: 0.5, t, gesture: 'cheer', mouth: P.talk(t), eyes: 'happy', k: P.dk(t, ev.c4_you - 0.3, 0.4) });
    P.source(ctx, 'cosmic background light, ≈ 411 photons per cm³', t, ev.c4_411);
  }, { in: { type: 'iris', color: C.yel, at: [1300, 560], dur: 0.6 } });

  // S5 — MYTH #3: anti-stars, anti-galaxies hiding somewhere
  P.shot(ev.c4_s5, (ctx, t) => {
    P.bgInk(ctx, t);
    for (let i = 0; i < 30; i++) P.star(ctx, 60 + U.hash(i, 31) * 1800, 60 + U.hash(i, 32) * 960, 5 + 6 * U.hash(i, 33), C.yel, 0.4 + 0.3 * Math.sin(t + i));
    P.rslam(ctx, 'MYTH #3', 960, 200, t, ev.c4_myth, { size: 96, top: C.pap, under: C.acc });
    P.galaxy(ctx, 600, 600, 260, t, { color: '#8FA8FF', k: P.dk(t, ev.c4_s5, 0.8) });
    const hk = P.dk(t, ev.c4_hiding, 0.6); P.galaxy(ctx, 1380, 620, 240, t, { color: C.acc, k: hk, seed: 5, rot: 1 });
    P.tag(ctx, 'ANTI-STARS?', 1380, 860, t, ev.c4_astars, 1e9, { size: 40, fill: C.acc, color: C.pap }); P.tag(ctx, 'ANTI-GALAXIES?', 1380, 940, t, ev.c4_agal, 1e9, { size: 40, fill: C.acc, color: C.pap });
    P.note(ctx, 'hiding somewhere?', null, null, 1380, 360, t, ev.c4_hiding + 0.2, { size: 52, color: C.acc });
  }, { in: { type: 'wipe', dir: 'left', dur: 0.5, color: C.navy } });

  // S6 — borders would flash; no such zones found; no antimatter region in the observable universe
  P.shot(ev.c4_s6, (ctx, t) => {
    P.bgInk(ctx, t);
    const u = P.eio((t - ev.c4_s6) / Math.max(0.5, ev.c4_touch - ev.c4_s6)); const gx = lerp(560, 760, u), px = lerp(1360, 1160, u);
    P.galaxy(ctx, gx, 520, 240, t, { color: '#8FA8FF' }); P.galaxy(ctx, px, 540, 230, t, { color: C.acc, seed: 5, rot: 1 });
    for (let i = 0; i < 6; i++) P.flash(ctx, 960, 340 + i * 70, t, ev.c4_touch + i * 0.22, { r: 70, n: 6, seed: i, dur: 0.9 });
    P.note(ctx, 'bright flashes at the border', null, null, 960, 140, t, ev.c4_flashes, { size: 48, color: C.yel });
    const nk = P.pop(t, ev.c4_none, 0.35); if (nk > 0) P.at(ctx, 960, 880, nk, -0.03, () => { P.iRect(ctx, -460, -70, 920, 140, 14, C.pap); G.text(ctx, 'NONE FOUND', 0, 30, { size: 86, fam: 'Inter', weight: 900, color: C.acc, align: 'center', boil: 0 }); });
    P.note(ctx, 'no antimatter region in the observable universe', null, null, 960, 1010, t, ev.c4_obs, { size: 42, color: C.pap });
  }, { in: { type: 'fade', dur: 0.3 } });

  // S7 — not hidden: LOST → the laws of physics must favour matter. HOW?
  P.shot(ev.c4_s7, (ctx, t) => {
    P.bgLine(ctx, t);
    P.write(ctx, 'HIDDEN', 520, 260, t, ev.c4_s7 + 0.2, { size: 90, weight: 900 }); P.cross(ctx, 330, 180, 710, 290, P.dk(t, ev.c4_lost - 0.3, 0.4), { lw: 14 });
    P.rslam(ctx, 'LOST.', 1400, 250, t, ev.c4_lost, { size: 130 });
    P.scale(ctx, 960, 560, 0.95, t, { k: P.dk(t, ev.c4_laws - 0.3, 0.6), tilt: -lerp(0, 0.8, P.dk(t, ev.c4_favour - 0.2, 0.9)),
      left: (x, y) => P.part(ctx, x, y - 30, 40, 'e', {}), right: (x, y) => P.part(ctx, x, y - 30, 40, 'p', {}) });
    P.note(ctx, 'physics slightly favours matter', null, null, 960, 960, t, ev.c4_favour, { size: 50 });
    const hk = P.pop(t, ev.c4_how, 0.4); if (hk > 0) P.at(ctx, 1640, 620, hk, 0.06, () => P.rtext(ctx, 'HOW?', 0, 40, { size: 120, top: C.acc, under: C.ink }));
    Ch.elle(ctx, { x: 260, y: 1060, s: 0.55, t, gesture: 'think', mouth: P.talk(t), look: 1 });
  }, { in: { type: 'push', dir: 'up', dur: 0.45 } });
})();
