// Chapter 6 — The darkness we're losing: the world at night, who can't see the Milky Way, dark site vs city,
// Globe at Night (sky ~10 % brighter a year), the child's 18 years, birds + turtles, the simple fixes.
(function () {
  const { U, G, Ch, P, SCORE: S, Data } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const CITIES = [[-74, 40.7, 3], [-118.2, 34, 2.5], [-87.6, 41.9, 2], [-99.1, 19.4, 2.5], [-46.6, -23.5, 2.5], [-0.1, 51.5, 2.5], [2.35, 48.9, 2], [37.6, 55.8, 2], [31.2, 30, 2.5], [3.4, 6.5, 2], [77.2, 28.6, 3], [72.9, 19.1, 2.5], [116.4, 39.9, 3], [121.5, 31.2, 3], [139.7, 35.7, 3], [127, 37.6, 2], [106.8, -6.2, 2.5], [151.2, -33.9, 1.5], [49.9, 40.4, 1.5], [29, 41, 2], [51.4, 35.7, 2], [67, 24.9, 2], [90.4, 23.8, 2.5], [121, 14.6, 2], [100.5, 13.8, 2], [28, -26.2, 1.5], [-58.4, -34.6, 2], [-77, -12, 1.5], [-74, 4.7, 1.5], [-79.4, 43.7, 1.5], [-95.4, 29.8, 2], [-3.7, 40.4, 1.5], [13.4, 52.5, 1.5], [12.5, 41.9, 1.5], [-80.2, 25.8, 1.5], [-84.4, 33.7, 1.5], [-122.4, 37.8, 1.5], [-71, 42.4, 1.5], [-77, 38.9, 1.5], [8.7, 50.1, 1.5], [4.9, 52.4, 1.5], [18, 59.3, 1], [24, 52, 1], [30.5, 50.4, 1.2], [44.5, 33.3, 1.2], [46.7, 24.7, 1.5], [55.3, 25.2, 1.5], [80.3, 13.1, 2], [88.4, 22.6, 2.5], [114.2, 22.3, 2.5], [113.3, 23.1, 2.5], [104, 30.7, 2], [135.5, 34.7, 2], [-43.2, -22.9, 2], [36.8, -1.3, 1.2], [32.6, 0.3, 1], [38.7, 9, 1.2], [-6.8, 34, 1], [10.2, 36.8, 1], [-17.4, 14.7, 1]];
  const bg = (ctx, t) => { P.sky(ctx, t, { stars: 0.6, seed: 101 }); P.dome(ctx, 1400, 1000, 700, 0.8); P.hills(ctx, t, { y: 1000, color: C.coral, city: 1, seed: 6 }); };
  P.cardShot('c6', 6, "The darkness we're losing", bg);

  // S1 — the world at night: city lights; > ⅓ of humanity can't see the Milky Way; ~80 % of North Americans
  let MAP = null;
  P.shot(ev.c6_s1, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.25, seed: 103, haze: 0.15 });
    if (!MAP) MAP = Data.map({ region: 'world', x: 40, y: 120, w: 1250, h: 760 });
    const k = P.fin(t, ev.c6_s1, 0.6);
    ctx.save(); ctx.globalAlpha = k; Data.drawMap(ctx, MAP, { land: '#120F2C', stroke: '#5B4FB0', lw: 1.5 }); ctx.restore();
    const kl = P.fin(t, ev.c6_atlas - 0.4, 1.2);
    CITIES.forEach(([lon, lat, s], i) => { const [x, y] = MAP.proj(lon, lat); const a = clamp(kl * 2 - U.hash(i, 3)); if (a > 0) { P.glow(ctx, x, y, 22 * s, '#FFB347', a * 0.9); ctx.fillStyle = '#FFF2C8'; ctx.globalAlpha = a; ctx.fillRect(x - 2, y - 2, 4, 4); ctx.globalAlpha = 1; } });
    P.tag(ctx, '2016 · world atlas of light pollution', 660, 960, t, ev.c6_atlas, 1e9, { size: 36, border: C.amber });
    // people: >1/3 can't see the Milky Way
    const kp = P.fin(t, ev.c6_third - 0.3, 0.4); if (kp > 0) { P.box(ctx, 1330, 130, 540, 470, C.violet, { a: kp }); for (let i = 0; i < 30; i++) { const x = 1390 + (i % 6) * 84, y = 210 + Math.floor(i / 6) * 74; const lost = i < 11 && t > ev.c6_third + i * 0.04; P.icon(ctx, 'person', x, y, 28, { color: lost ? C.coral : C.dim, a: kp }); }
      P.text(ctx, '> ⅓ of humanity', 1600, 600 - 30, { size: 40, fam: FT.title, weight: 400, color: C.coral, align: 'center', alpha: kp }); P.label(ctx, "can't see the Milky Way", 1600, 620, { align: 'center', size: 26, alpha: P.fin(t, ev.c6_milky, 0.3) }); }
    const kd = P.pop(t, ev.c6_80, 0.45); if (kd > 0) P.at(ctx, 1600, 840, kd, 0, () => { Data.donut(ctx, { x: 0, y: 0, r: 120, data: [{ value: 80, color: C.coral }, { value: 20, color: '#2A2550' }], labels: false, t, t0: ev.c6_80, t1: ev.c6_80 + 0.8 }); P.text(ctx, '~80%', 0, 16, { size: 50, fam: FT.title, weight: 400, color: C.white, align: 'center' }); P.label(ctx, 'of North Americans', 0, 175, { align: 'center', size: 26 }); });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — a dark place vs a big city
  P.shot(ev.c6_s2, (ctx, t) => {
    const kd = P.fin(t, ev.c6_dark - 0.2, 0.5), kc = P.fin(t, ev.c6_city - 0.2, 0.5);
    // left: dark site
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W / 2, H); ctx.clip(); P.sky(ctx, t, { stars: 0, haze: 0.2 }); P.stars(ctx, t, { n: Math.round(150 + 1300 * kd), seed: 105, w: W / 2 });
    ctx.save(); ctx.translate(480, 480); ctx.rotate(-0.5); for (let i = 0; i < 260; i++) { const x = (U.hash(i, 7) - 0.5) * 1400, y = (U.hash(i, 8) + U.hash(i, 9) - 1) * 150; ctx.fillStyle = 'rgba(220,215,255,' + (0.25 * kd) + ')'; ctx.fillRect(x, y, 3, 3); } P.glow(ctx, 0, 0, 260, '#B8A8FF', 0.35 * kd); ctx.restore();
    P.hills(ctx, t, { y: 960, color: C.violet, seed: 2 }); ctx.restore();
    // right: city
    ctx.save(); ctx.beginPath(); ctx.rect(W / 2, 0, W / 2, H); ctx.clip(); P.sky(ctx, t, { top: '#1A1030', bottom: '#5A3A40', stars: 0, haze: 0 }); P.dome(ctx, W * 0.78, 1100, 900, kc); P.stars(ctx, t, { n: 30, seed: 107, x0: W / 2, w: W / 2, y1: 500 });
    P.hills(ctx, t, { y: 980, color: C.coral, seed: 5, city: 1 }); ctx.restore();
    P.line(ctx, W / 2, 0, W / 2, H, C.white, 3, 0.6);
    P.counter(ctx, { x: 480, y: 200, from: 0, to: 2500, t, t0: ev.c6_dark, t1: ev.c6_2500, size: 96, prefix: '~', sub: 'stars at once · dark site', color: C.cyan });
    P.counter(ctx, { x: 1440, y: 200, from: 2500, to: 30, t, t0: ev.c6_city, t1: ev.c6_dozen, size: 96, fmt: (v) => v > 99 ? Data.number(v) : 'a few dozen', sub: 'stars · big city', color: C.coral });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S3 — Globe at Night: 51,351 people counting stars; the sky got ~10 % brighter every year (2011–2022)
  P.shot(ev.c6_s3, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.5, seed: 109 });
    P.stamp(ctx, 'GETTING WORSE', 1370, 330, t, ev.c6_worse, { size: 64, color: C.red, t1: ev.c6_10 - 0.1 });
    P.counter(ctx, { x: 480, y: 300, from: 0, to: 51351, t, t0: ev.c6_50k0, t1: ev.c6_50k, size: 100, sub: 'people counting stars by eye', color: C.cyan });
    for (let i = 0; i < 24; i++) P.icon(ctx, 'eye', 220 + (i % 8) * 74, 520 + Math.floor(i / 8) * 64, 26, { color: C.dim, a: P.fin(t, ev.c6_50k0 + i * 0.05, 0.2) });
    const X = 960, Y = 860, Wd = 820, Hd = 560; const k = P.fin(t, ev.c6_s3 + 0.2, 0.4);
    P.line(ctx, X, Y, X + Wd, Y, C.violet, 3, k); P.line(ctx, X, Y, X, Y - Hd, C.violet, 3, k);
    P.label(ctx, '2011', X, Y + 46, { size: 26, alpha: k }); P.label(ctx, '2022', X + Wd, Y + 46, { size: 26, align: 'right', alpha: k }); P.label(ctx, 'sky brightness', X, Y - Hd - 24, { size: 26, alpha: k });
    const prog = P.eio((t - ev.c6_line0) / Math.max(0.8, ev.c6_line1 - ev.c6_line0)); const yv = (v) => Y - (v - 0.8) / (2.9 - 0.8) * Hd;
    if (prog > 0) { P.tube(ctx, (c) => { c.beginPath(); for (let i = 0; i <= 11 * prog; i++) { const x = X + i / 11 * Wd, y = yv(Math.pow(1.096, i)); i ? c.lineTo(x, y) : c.moveTo(x, y); } }, C.coral, 6, 1); }
    P.tag(ctx, '≈ +10% a year', X + Wd / 2, 200, t, ev.c6_10, 1e9, { size: 48, border: C.coral });
    if (prog >= 1) P.text(ctx, '≈ 2.7×', X + Wd - 10, yv(2.74) - 30, { size: 54, fam: FT.title, weight: 400, color: C.coral, align: 'right' });
  }, { in: { type: 'push', dur: 0.5 } });

  // S4 — a child born under 250 stars sees ~100 by 18
  P.shot(ev.c6_s4, (ctx, t) => {
    P.sky(ctx, t, { stars: 0, haze: 0.25 });
    const age = clamp((t - ev.c6_100a) / Math.max(0.8, ev.c6_100 - ev.c6_100a));
    const n = Math.round(lerp(250, 100, age)); const glow = lerp(0, 0.6, age);
    ctx.save(); P.rr(ctx, 300, 140, 1320, 600, 30); ctx.clip(); P.sky(ctx, t, { stars: 0, haze: 0 }); P.dome(ctx, 960, 900, 1000, glow);
    ctx.fillStyle = C.star; for (let i = 0; i < 250; i++) { const vis = U.hash(i, 111) * 250 < n; if (!vis) continue; const x = 300 + U.hash(i, 112) * 1320, y = 140 + U.hash(i, 113) * 600, r = 1.5 + 2.5 * Math.pow(U.hash(i, 114), 3); ctx.fillRect(x - r, y - r, r * 2, r * 2); }
    ctx.restore(); P.tube(ctx, (c) => P.rr(c, 300, 140, 1320, 600, 30), C.violet, 3, 1, { core: false });
    P.counter(ctx, { x: 620, y: 900, from: 0, to: 18, t, t0: ev.c6_100a, t1: ev.c6_100, size: 90, sub: 'age', color: C.gold });
    P.text(ctx, n + ' stars', 1300, 905, { size: 90, fam: FT.title, weight: 400, color: n <= 100 ? C.coral : C.white, align: 'center', alpha: P.fin(t, ev.c6_250 - 0.3, 0.3) });
    const kb = P.pop(t, ev.c6_born, 0.45); if (kb > 0) Ch.nova(ctx, { x: 1700, y: 900, s: 0.45 * kb, t, eyes: age > 0.8 ? 'worried' : 'happy', mouth: Ch.novaMouth(t) });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — birds circle bright lights; hatchling turtles head for the city instead of the sea
  P.shot(ev.c6_s5, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.4, seed: 115, haze: 0.2 });
    // sea on the left, beach, city glow on the right
    ctx.fillStyle = '#081430'; ctx.fillRect(0, 700, 700, 380); P.tube(ctx, (c) => { c.beginPath(); for (let x = 0; x <= 700; x += 10) { const y = 700 + Math.sin(x * 0.03 + t * 2) * 6; x ? c.lineTo(x, y) : c.moveTo(x, y); } }, C.cyan, 3, 0.8);
    ctx.fillStyle = '#2A2238'; ctx.fillRect(700, 760, 1220, 320); P.dome(ctx, 1700, 760, 700, 1); P.hills(ctx, t, { y: 780, color: C.coral, city: 1, seed: 8, a: 0.9 });
    // the tower with birds circling
    const kb = P.fin(t, ev.c6_birds - 0.5, 0.5); if (kb > 0) { P.tube(ctx, (c) => { c.beginPath(); c.moveTo(1280, 760); c.lineTo(1280, 260); }, C.amber, 6, kb); P.glow(ctx, 1280, 250, 160, '#FFE6A8', kb); for (let i = 0; i < 6; i++) { const an = t * (1.2 + 0.1 * i) + i; P.icon(ctx, 'bird', 1280 + Math.cos(an) * (120 + i * 22), 250 + Math.sin(an) * (60 + i * 10), 22, { t: t + i, a: kb }); } }
    const kt = P.fin(t, ev.c6_turtles - 0.3, 0.4); if (kt > 0) for (let i = 0; i < 5; i++) { const go = clamp((t - ev.c6_turtles - i * 0.15) / 3.5); const x = lerp(760 + i * 40, 1100 + i * 60, go), y = 900 + i * 30; P.icon(ctx, 'turtle', x, y, 30, { a: kt, t }); }
    if (t > ev.c6_away) { P.arrow(ctx, 900, 1040, 1260, 1040, { color: C.coral, k: P.fin(t, ev.c6_away, 0.4) }); P.arrow(ctx, 760, 1040, 420, 1040, { color: C.cyan, k: P.fin(t, ev.c6_away, 0.4), a: 0.5 }); P.label(ctx, 'the sea', 420, 1010, { align: 'center', size: 26, color: C.cyan }); }
    P.tag(ctx, 'confused migrating birds', 1280, 120, t, ev.c6_birds, 1e9, { size: 38, border: C.amber });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — the fixes: shield the light, warm the bulb, switch off → the stars come back
  P.shot(ev.c6_s6, (ctx, t) => {
    const back = P.fin(t, ev.c6_stars, 1.4);
    P.sky(ctx, t, { stars: 0.25 + 0.75 * back, seed: 117, n: Math.round(260 + 900 * back) });
    const items = [[ev.c6_shield, 'SHIELD IT', 360], [ev.c6_warm, 'WARMER BULBS', 960], [ev.c6_off, 'SWITCH OFF', 1560]];
    items.forEach(([t0, lab, x], i) => { const k = P.pop(t, t0 - 0.6, 0.4); if (k <= 0) return; const done = t >= t0; P.at(ctx, x, 560, k, 0, () => {
      P.box(ctx, -250, -330, 500, 560, done ? C.green : C.violet, { r: 30, lw: 3 });
      if (i === 0) { P.tube(ctx, (c) => { c.beginPath(); c.moveTo(0, 200); c.lineTo(0, -160); c.lineTo(70, -160); }, C.dim, 6, 1); const sh = done; ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(70, -150, 0, 70, -150, 260); g.addColorStop(0, 'rgba(255,230,170,0.7)'); g.addColorStop(1, 'rgba(255,230,170,0)'); ctx.fillStyle = g; ctx.beginPath(); if (sh) { ctx.moveTo(30, -150); ctx.lineTo(-60, 200); ctx.lineTo(200, 200); ctx.lineTo(110, -150); } else ctx.arc(70, -150, 260, 0, 7); ctx.fill(); ctx.restore(); if (sh) P.tube(ctx, (c) => { c.beginPath(); c.moveTo(20, -150); c.quadraticCurveTo(70, -210, 120, -150); }, C.green, 6, 1); }
      if (i === 1) { const col = done ? '#FFB347' : '#CFE8FF'; P.glow(ctx, 0, -60, 200, col, 0.7); P.icon(ctx, 'bulb', 0, -60, 110, { color: col }); }
      if (i === 2) { P.icon(ctx, 'switch', 0, -60, 110, { color: done ? C.green : C.white }); if (!done) P.glow(ctx, 0, -60, 160, '#FFE6A8', 0.5); }
      P.text(ctx, lab, 0, 170, { size: 42, fam: FT.title, weight: 400, color: done ? C.green : C.white, align: 'center' }); }); });
    if (back > 0) P.sparkle(ctx, 960, 200, t, ev.c6_stars, { n: 18, r: 300, color: C.star });
  }, { in: { type: 'fade', dur: 0.4 } });
})();
