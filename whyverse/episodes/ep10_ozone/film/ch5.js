// Chapter 5 — Why carbon is different: 86 % of the world's energy from coal, oil, gas (cars, planes, factories, steel, cement, lights) ·
// 2025: a record 38 billion tonnes of fossil CO2 · the tragedy of the commons (1968) · Kyoto 1997 binding; US signed, never ratified; Canada out ·
// Paris 2015: every country its own plan, well below 2 °C, aim 1.5 · add them up: ≈ 2.8 °C by 2100 (UNEP 2026) · hopeless? not quite
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L } = S; const C = P.C;
  const W = G.W, H = G.H;
  P.cardShot('c5', 5, 'Why carbon is different', (ctx, t) => { P.factory(ctx, 1800, 1050, 0.4, t, { k: P.dk(t, S.CH.c5.t0 + 0.3, 0.8), n: 3 }); });
  const bulb = (ctx, x, y, s, k, on) => { P.art(ctx, [{ pts: P.circPts(x, y, 50 * s, 30), fill: on ? C.accW2 : C.pap }, P.rectPts(x - 22 * s, y + 48 * s, 44 * s, 40 * s), [[x - 22 * s, y + 62 * s], [x + 22 * s, y + 62 * s]]], k, { lw: 4.5 }); };
  const beam = (ctx, x, y, s, k) => P.art(ctx, [{ pts: [[-90, -40], [90, -40], [90, -26], [14, -26], [14, 26], [90, 26], [90, 40], [-90, 40], [-90, 26], [-14, 26], [-14, -26], [-90, -26]].map(([a, b]) => [x + a * s, y + b * s]), closed: true, fill: C.pap }], k, { lw: 4.5 });
  const bag = (ctx, x, y, s, k) => { P.art(ctx, [{ pts: [[-60, 60], [-70, -40], [-50, -70], [50, -70], [70, -40], [60, 60], [-60, 60]].map(([a, b]) => [x + a * s, y + b * s]), fill: C.pap }], k, { lw: 4.5 }); if (k > 0.8) G.text(ctx, 'CEMENT', x, y + 10, { size: 22 * s * 1.4, fam: 'Inter', weight: 900, color: C.ink2, align: 'center', boil: 0 }); };

  // S1 — 86 % of the world's energy: a donut, and everything it powers
  P.shot(ev.c5_s1, (ctx, t) => {
    P.bgLine(ctx, t);
    const cx = 520, cy = 540, r = 260; const f = 0.86 * P.eio((t - ev.c5_86a + 0.4) / ((ev.c5_86 - ev.c5_86a) + 0.6));
    P.dCirc(ctx, cx, cy, r, P.dk(t, ev.c5_s1, 0.6), { lw: 4, color: C.ink3 });
    ctx.save(); ctx.strokeStyle = C.acc; ctx.lineWidth = 70; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + f * 6.283); ctx.stroke(); ctx.restore();
    [['COAL', ev.c5_coal], ['OIL', ev.c5_oil], ['GAS', ev.c5_gas]].forEach(([s, t0], i) => P.write(ctx, s, cx, cy - 70 + i * 70, t, t0, { size: 56, weight: 900, t1: ev.c5_86a - 0.1 }));
    P.lcount(ctx, { x: cx, y: cy + 60, from: 0, to: 86, t, t0: ev.c5_86a - 0.1, t1: ev.c5_86, size: 150, suffix: '%' });
    P.write(ctx, 'OF THE WORLD\'S ENERGY', cx, 900, t, ev.c5_86, { size: 44, weight: 900 });
    const st = (w, i) => Math.min(w - 0.2, ev.c5_s1 + 0.8 + i * 0.35);
    P.car(ctx, 1120, 420, 0.85, t, { k: P.dk(t, st(ev.c5_cars, 0), 0.5) });
    P.plane(ctx, 1520 + Math.sin(t * 0.8) * 20, 300, 0.75, t, { k: P.dk(t, st(ev.c5_planes, 1), 0.5), rot: -0.1 });
    P.factory(ctx, 1160, 780, 0.6, t, { k: P.dk(t, st(ev.c5_fact, 2), 0.5) });
    beam(ctx, 1480, 640, 1.1, P.dk(t, st(ev.c5_steel, 3), 0.5));
    bag(ctx, 1500, 840, 1.0, P.dk(t, st(ev.c5_cem, 4), 0.5));
    bulb(ctx, 1760, 560, 1.2, P.dk(t, st(ev.c5_lights, 5), 0.5), t > ev.c5_lights); if (t > ev.c5_lights) P.glow(ctx, 1760, 560, 140, C.acc, 0.5);
    P.source(ctx, 'Energy Institute Statistical Review 2026 (share of total energy supply, 2025)', t, ev.c5_86);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — 2025: a record 38 billion tonnes of fossil CO2 — billions of chimneys and engines
  P.shot(ev.c5_s2, (ctx, t) => {
    P.bgLine(ctx, t);
    P.stamp(ctx, '2025 · RECORD', 360, 150, t, ev.c5_rec, { size: 66, color: C.acc, rot: -0.04 });
    for (let i = 0; i < 38; i++) { const c = i % 8, r = Math.floor(i / 8); const x = 140 + c * 92, y = 900 - r * 92; const q = P.pop(t, ev.c5_s2 + 0.3 + i * ((ev.c5_38 - ev.c5_s2 - 0.3) / 38), 0.25); if (q <= 0) continue;
      P.at(ctx, x, y, q, 0, () => { P.rect(ctx, -38, -38, 76, 76, 6, C.pap, { stroke: C.ink, lw: 4 }); G.text(ctx, '1', 0, 14, { size: 36, fam: 'Inter', weight: 900, color: C.ink2, align: 'center', boil: 0 }); }); }
    P.note(ctx, '= 1 billion tonnes', null, null, 340, 330, t, ev.c5_38a, { size: 40, color: C.ink2 });
    P.lcount(ctx, { x: 1340, y: 420, from: 0, to: 38, t, t0: ev.c5_38a - 0.1, t1: ev.c5_38, size: 220 });
    P.write(ctx, 'BILLION TONNES OF CO₂', 1340, 520, t, ev.c5_38, { size: 54, weight: 900 });
    P.cross(ctx, 1040, 650, 1260, 760, P.dk(t, ev.c5_notfew, 0.4), { lw: 8 }); P.write(ctx, 'A FEW FACTORIES', 1150, 720, t, ev.c5_notfew - 0.3, { size: 34, weight: 800, color: C.ink2 });
    for (let i = 0; i < 12; i++) { const x = 1340 + (i % 6) * 90, y = 880 + Math.floor(i / 6) * 110; const k = P.dk(t, ev.c5_bil + i * 0.06, 0.4); if (i % 3 === 0) P.car(ctx, x, y, 0.28, t, { k }); else P.factory(ctx, x, y, 0.22, t, { k, n: 1 }); }
    P.source(ctx, 'Global Carbon Project, Global Carbon Budget 2025', t, ev.c5_38);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — the trap: the tragedy of the commons (1968) — each farmer adds a cow, everyone shares the damage; the sky is that field
  P.shot(ev.c5_s3, (ctx, t) => {
    P.bgLine(ctx, t);
    P.stamp(ctx, 'THE TRAGEDY OF THE COMMONS', 960, 120, t, ev.c5_tragedy, { size: 60, color: C.ink, fg: C.pap, rot: -0.02 });
    P.note(ctx, 'Garrett Hardin, 1968', null, null, 960, 200, t, ev.c5_1968, { size: 44 });
    const sky = P.eio((t - ev.c5_sky + 0.2) / 0.8);
    ctx.save(); ctx.translate(0, sky * 460);
    P.fence(ctx, 160, 1760, 900, P.dk(t, ev.c5_s3 + 0.2, 0.9));
    const dmg = P.fin(t, ev.c5_damage - 0.4, 1.0); for (let i = 0; i < 24; i++) { const x = 200 + i * 66, h = 30 * (1 - dmg * 0.85) * (0.7 + 0.3 * U.hash(i, 4)); P.art(ctx, [[[x, 880], [x - 8, 880 - h]], [[x, 880], [x + 8, 880 - h * 0.8]]], P.dk(t, ev.c5_field, 0.5), { lw: 3 }); }
    const nc = 1 + Math.floor(clamp((t - ev.c5_cow) / 1.6) * 5); for (let i = 0; i < 6; i++) { const q = i === 0 ? P.fin(t, ev.c5_field, 0.4) : P.pop(t, ev.c5_cow + (i - 1) * 0.32, 0.35); if (q <= 0) continue; P.cow(ctx, 300 + i * 250, 870, 0.75 * q, t, { k: 1, dir: i % 2 ? -1 : 1, seed: i }); }
    for (let i = 0; i < 3; i++) P.person(ctx, 260 + i * 640, 880, 0.55, t, { pose: 'point', k: P.fin(t, ev.c5_cow - 0.3, 0.4), seed: i, dir: i === 2 ? -1 : 1 });
    P.note(ctx, 'one more cow = my gain', null, null, 600, 560, t, ev.c5_cow + 0.2, { size: 44 });
    P.note(ctx, 'the damage = everyone\'s', null, null, 1340, 560, t, ev.c5_damage, { size: 44 });
    ctx.restore();
    if (sky > 0) { ctx.save(); ctx.globalAlpha *= sky; for (let i = 0; i < 5; i++) P.factory(ctx, 260 + i * 350, 1080 + (1 - sky) * 300, 0.5, t, { k: 1, n: 2 }); ctx.restore();
      P.head(ctx, 'THE SKY IS THAT FIELD', 960, 420, t, ev.c5_sky + 0.2, { size: 80, hl: ['SKY'] }); }
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — Kyoto 1997: binding cuts for rich countries · the US signed but never ratified · Canada later walked out
  P.shot(ev.c5_s4, (ctx, t) => {
    P.bgLine(ctx, t);
    P.doc(ctx, 520, 560, 1.3, t, { k: P.dk(t, ev.c5_strict, 0.8), title: 'KYOTO PROTOCOL', stamp: t > ev.c5_binding ? 'BINDING' : '' });
    P.stamp(ctx, 'KYOTO 1997', 520, 140, t, ev.c5_kyoto, { size: 66, color: C.acc, rot: -0.03 });
    P.person(ctx, 1080, 860, 1.0, t, { pose: t > ev.c5_signed ? 'hold' : 'stand', prop: t > ev.c5_signed ? 'pen' : null, k: P.fin(t, ev.c5_us - 0.2, 0.4), name: 'UNITED STATES' });
    const box = (x, y, lab, t0, ok) => { const k = P.dk(t, t0 - 0.2, 0.5); P.dRect(ctx, x, y, 70, 70, k, { lw: 5 }); G.text(ctx, lab, x + 100, y + 50, { size: 44, fam: 'Inter', weight: 900, color: C.ink, boil: 0, alpha: k }); if (ok === 1) P.tick(ctx, x + 35, y + 35, 1.1, P.dk(t, t0, 0.4)); if (ok === 0) P.cross(ctx, x + 10, y + 10, x + 60, y + 60, P.dk(t, t0 + 0.3, 0.4), { lw: 8 }); };
    box(1300, 360, 'SIGNED', ev.c5_signed, 1); box(1300, 480, 'RATIFIED', ev.c5_never, 0);
const go = clamp((t - ev.c5_out) / 2.0);
    P.person(ctx, 1560 + go * 500, 860, 1.0, t, { pose: go > 0 ? 'walk' : 'stand', k: P.fin(t, ev.c5_canada - 0.2, 0.4), name: go < 0.2 ? 'CANADA' : '', seed: 3 });
    P.note(ctx, 'announced its exit, Dec 2011', null, null, 1640, 700, t, ev.c5_out, { size: 46 });
    P.source(ctx, 'UNFCCC · CRS · UN Treaty Collection', t, ev.c5_never);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S5 — Paris 2015: every country picks its own plan; well below 2 °C, aim for 1.5
  P.shot(ev.c5_s5, (ctx, t) => {
    P.bgLine(ctx, t);
    P.stamp(ctx, 'PARIS 2015', 400, 140, t, ev.c5_paris, { size: 70, color: C.acc, rot: -0.03 });
    for (let i = 0; i < 28; i++) { const c = i % 7, r = Math.floor(i / 7); const x = 140 + c * 150, y = 330 + r * 160; const q = P.dk(t, ev.c5_own - 0.2 + i * 0.05, 0.4); if (q <= 0) continue;
      P.dRect(ctx, x, y, 110, 130, q, { lw: 3.5, fill: C.pap }); for (let j = 0; j < 3; j++) P.dLine(ctx, x + 18, y + 34 + j * 28, x + 92 - U.hash(i, j) * 40, y + 34 + j * 28, q, { lw: 3, color: C.ink3 });
      if (U.hash(i, 9) > 0.55) P.tick(ctx, x + 78, y + 104, 0.5, q, { lw: 5 }); }
    P.note(ctx, 'each country, its own plan', null, null, 600, 990, t, ev.c5_own + 0.3, { size: 48 });
    P.write(ctx, 'ALMOST EVERYONE JOINED', 600, 280, t, ev.c5_join, { size: 40, weight: 900, color: C.ink2 });
    const tx = 1450; P.thermo(ctx, tx, 940, 1.2, 1.3 + 0.1 * Math.sin(t), { k: P.dk(t, ev.c5_paris, 0.8), max: 3.2, marks: [] });
    const yAt = (v) => 940 - 60 * 1.2 - (v / 3.2) * 440 * 1.2;
    [[2, 'WELL BELOW 2 °C', ev.c5_two, C.ink], [1.5, 'AIM: 1.5 °C', ev.c5_15, C.acc]].forEach(([v, lab, t0, col]) => { const k = P.dk(t, t0 - 0.2, 0.5); P.dLine(ctx, tx - 80, yAt(v), tx + 90, yAt(v), k, { lw: 5, color: col, dash: [12, 8] }); G.text(ctx, lab, tx + 110, yAt(v) + 14, { size: 40, fam: 'Inter', weight: 900, color: col, boil: 0, alpha: k }); });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — add up the plans: today's policies → about 2.8 °C by 2100 (UNEP Emissions Gap Report 2026)
  P.shot(ev.c5_s6, (ctx, t) => {
    P.bgLine(ctx, t);
    const tx = 700; const lvl = lerp(1.3, 2.8, P.eio((t - ev.c5_28a + 0.2) / ((ev.c5_28 - ev.c5_28a) + 0.5)));
    for (let i = 0; i < 12; i++) { const u = P.eio((t - ev.c5_add - i * 0.06) / 0.8); const sx = 1200 + (i % 4) * 140, sy = 560 + Math.floor(i / 4) * 150; if (u >= 1) continue; P.dRect(ctx, lerp(sx, tx - 40, u), lerp(sy, 900, u), 100 * (1 - u * 0.7), 120 * (1 - u * 0.7), 1, { lw: 3.5, fill: C.pap, a: 1 - u }); }
    P.thermo(ctx, tx, 980, 1.35, lvl, { k: P.dk(t, ev.c5_s6, 0.7), max: 3.2, marks: [] });
    const yAt = (v) => 980 - 60 * 1.35 - (v / 3.2) * 440 * 1.35;
    [[1.5, '1.5 °C', C.ink2], [2, '2 °C', C.ink2]].forEach(([v, lab, col]) => { P.dLine(ctx, tx - 90, yAt(v), tx + 90, yAt(v), P.fin(t, ev.c5_s6 + 0.4, 0.5), { lw: 4, color: col, dash: [10, 8] }); G.text(ctx, lab, tx - 110, yAt(v) + 12, { size: 34, fam: 'Inter', weight: 800, color: col, align: 'right', boil: 0 }); });
    P.lcount(ctx, { x: 1000, y: yAt(2.8) + 40, from: 1.3, to: 2.8, decimals: 1, t, t0: ev.c5_28a - 0.2, t1: ev.c5_28, size: 180, suffix: ' °C', align: 'left' });
    P.write(ctx, 'BY 2100, WITH TODAY\'S POLICIES', 1000, yAt(2.8) + 140, t, ev.c5_2100, { size: 44, weight: 900, align: 'left' });
    P.source(ctx, 'UNEP Emissions Gap Report 2026', t, ev.c5_unep);
  }, { in: { type: 'push', dir: 'up', dur: 0.5 } });

  // S7 — hopeless? Not quite — the ozone story has one more lesson
  P.shot(ev.c5_s7, (ctx, t) => {
    P.bgLine(ctx, t);
    P.head(ctx, 'HOPELESS?', 960, 300, t, ev.c5_hope - 0.2, { size: 110, hl: [] });
    P.cross(ctx, 640, 200, 1280, 330, P.dk(t, ev.c5_quite, 0.4), { lw: 10 });
    P.note(ctx, 'not quite', null, null, 1320, 420, t, ev.c5_quite + 0.1, { size: 80 });
    Ch.ozzy(ctx, { x: 960, y: 1000, s: 1.05, t, gesture: t > ev.c5_lesson ? 'pointUp' : 'shrug', mouth: P.talk(t), eyes: t > ev.c5_quite ? 'happy' : 'open' });
    P.globe(ctx, 1600, 760, 170, t, { lon0: t * 4, lat0: -70, k: P.dk(t, ev.c5_lesson - 0.3, 0.8), hole: 0.5 });
  }, { in: { type: 'fade', dur: 0.4 } });
})();
