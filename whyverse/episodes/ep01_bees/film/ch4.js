// Chapter 4 — California almonds: one valley, almost every hive.
(function () {
  const { U, G, Ch, P, SCORE: S, Shots, Data } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const MAP = { region: [-126, 23, -65, 50], x: 120, y: 120, w: 1680, h: 860 };
  const FRESNO = [-119.79, 36.74];
  const CV = [[-122.4, 40.6], [-121.9, 39.4], [-121.5, 38.4], [-121.0, 37.6], [-120.3, 36.9], [-119.6, 36.2], [-119.2, 35.4]];
  const FROM = [[-74.0, 40.7], [-87.6, 41.9], [-95.4, 29.8], [-80.2, 25.8], [-104.9, 39.7], [-93.3, 45.0], [-84.4, 33.7], [-112.1, 33.4]];
  const usMap = (ctx, t, o = {}) => { const m = Data.map(MAP); Data.drawMap(ctx, m, { highlight: { 'United States of America': '#F3E2BE' }, land: '#EFE9DA', sea: '#D7E8EE', t, t0: o.t0 ?? -10, dur: 1.2, stroke: C.ink, lw: 2.5 }); return m; };
  const valley = (ctx, m, k, glow = 0) => { if (k <= 0) return; const pts = CV.map(([a, b]) => m.proj(a, b)); const n = Math.max(2, Math.ceil(pts.length * k));
    ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = `rgba(239,123,91,${0.35 + 0.3 * glow})`; ctx.lineWidth = 46; ctx.beginPath(); pts.slice(0, n).forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.stroke(); ctx.restore(); };
  const orchard = (ctx, t, o = {}) => { for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) { const x = 60 + i * 230 + (r % 2) * 110, y = 760 + r * 120; P.tree(ctx, x, y, 0.55 + r * 0.1, { seed: 300 + r * 10 + i, n: 26, blossom: '#FFF6F8', crown: '#8DBE6C', bloom: 1 }); } };

  P.cardShot('c4', 4, 'One valley, almost every hive', (ctx, t) => { P.sky(ctx, '#CFE3F2', '#F4EDE0'); P.ground(ctx, 700, { fill: '#9BC27E', seed: 31 }); orchard(ctx, t); });

  // S1+S2 — the map: California, the valley; then orchards with 2 hives per acre
  P.shot(ev.c4_s1, (ctx, t, s) => {
    P.paperBg(ctx, '#D7E8EE');
    const m = usMap(ctx, t, { t0: ev.c4_s1 });
    const k = P.pop(t, ev.c4_ca); const ca = m.proj(-120.5, 37.5);
    if (k > 0) { ctx.save(); ctx.globalAlpha = 0.5 * clamp(k); G.ellipse(ctx, ca[0] - 5, ca[1] + 10, 48 * k, 120 * k, { fill: C.coral, seed: 5, lw: 4 }); ctx.restore(); P.note(ctx, 'California', ca[0] + 260, ca[1] - 160, t, ev.c4_ca, 1e9, { size: 62, seed: 6, fill: C.gold }); }
    valley(ctx, m, clamp((t - ev.c4_valley + 0.3) / 0.8), Math.sin(t * 5) * 0.5 + 0.5);
    if (t > ev.c4_valley) P.note(ctx, 'the Central Valley', ca[0] + 330, ca[1] + 130, t, ev.c4_valley + 0.2, 1e9, { size: 50, seed: 7 });
    const [fx, fy] = m.proj(...FRESNO);
    Ch.bee(ctx, { x: 330 + Math.sin(t * 1.5) * 30, y: 900, s: 0.7, t, facing: 1, eyes: 'normal', mouth: P.talk(t), look: 0.6 });
  }, { in: 'cut', cam: (s) => { const m = Data.map(MAP); const [px, py] = m.proj(-120.5, 37.5); const z = lerp(1, 1.5, ease.inOutCubic(clamp((s.t - (ev.c4_valley - 0.8)) / 1.2))); return { zoom: z, x: (px - W / 2) * (z - 1) / z * 0.9, y: (py - H / 2) * (z - 1) / z * 0.9 }; } });

  P.shot(ev.c4_orch - 0.2, (ctx, t, s) => {
    P.sky(ctx, '#CFE3F2', '#F4EDE0'); P.sun(ctx, 1700, 160, 70, t);
    G.shape(ctx, [[-300, 520], [600, 470], [1300, 520], [2200, 480], [2200, 1400], [-300, 1400]], { fill: '#A7C98A', seed: 41, hatch: { color: 'rgba(30,80,30,0.15)', gap: 9 } });
    // acre plots, each with 2 hives
    for (let i = 0; i < 8; i++) { const x = 140 + (i % 4) * 430, y = 560 + Math.floor(i / 4) * 260; const k = P.pop(t, ev.c4_acres[i], 0.3);
      G.rrect(ctx, x, y, 390, 220, 8, { fill: '#C4DDA8', seed: 50 + i, lw: 3.5, stroke: 'rgba(42,35,32,0.5)' });
      for (let j = 0; j < 3; j++) P.tree(ctx, x + 70 + j * 125, y + 150, 0.34, { seed: 60 + i * 3 + j, n: 16, blossom: '#FFF6F8', crown: '#8DBE6C' });
      if (k > 0) { P.hive(ctx, x + 130, y + 205, 0.55 * k, { seed: 70 + i }); P.hive(ctx, x + 260, y + 205, 0.55 * k, { seed: 80 + i }); } }
    P.note(ctx, '≈ 2 hives per acre', W / 2, 230, t, ev.c4_acres[0] + 0.2, 1e9, { size: 72, fill: C.gold, seed: 9 });
    for (let i = 0; i < 6; i++) Ch.bee(ctx, { x: 200 + ((t * 120 + i * 330) % 1700), y: 420 + Math.sin(t * 2 + i) * 60, s: 0.28, t: t + i, seed: i });
  }, { in: { type: 'fade', dur: 0.5 }, cam: Shots.push(1.0, 1.05) });

  // S3 — trucks converge from all over the US
  P.shot(ev.c4_s3, (ctx, t, s) => {
    P.paperBg(ctx, '#D7E8EE');
    const m = usMap(ctx, t); valley(ctx, m, 1, 0.5);
    const [fx, fy] = m.proj(...FRESNO);
    FROM.forEach((c, i) => { const [ax, ay] = m.proj(...c); const t0 = ev.c4_drive - 0.3 + i * 0.12, t1 = ev.c4_arrive[i];
      const u = clamp((t - t0) / (t1 - t0)); if (t < ev.c4_load) return;
      const mx = (ax + fx) / 2, my = Math.min(ay, fy) - 120 - i * 10;
      const B = (v) => [(1 - v) * (1 - v) * ax + 2 * (1 - v) * v * mx + v * v * fx, (1 - v) * (1 - v) * ay + 2 * (1 - v) * v * my + v * v * fy];
      ctx.save(); ctx.setLineDash([12, 12]); ctx.strokeStyle = 'rgba(39,48,92,0.5)'; ctx.lineWidth = 4; ctx.beginPath(); for (let k = 0; k <= 20; k++) { const p = B(k / 20 * Math.max(u, 0.001)); k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke(); ctx.restore();
      G.ellipse(ctx, ax, ay, 10, 10, { fill: C.navy, seed: 90 + i, lw: 2 });
      const p = B(ease.inOutQuad(u)); const q = B(Math.min(1, ease.inOutQuad(u) + 0.02));
      if (u < 1) P.truck(ctx, p[0], p[1] + 14, 0.32, { seed: 100 + i, hives: 3, t, moving: 1 });
      if (u >= 1) P.sparkle(ctx, fx, fy, t, t1, { n: 8, r: 60, seed: i });
    });
    const n = ev.c4_arrive.filter((x) => x <= t).length;
    for (let i = 0; i < n * 3; i++) P.hive(ctx, fx - 60 + (i % 6) * 26, fy + 60 + Math.floor(i / 6) * 24, 0.24, { seed: 140 + i });
    P.note(ctx, 'every winter', 1500, 200, t, ev.c4_s3 + 0.4, 1e9, { size: 62, seed: 11, fill: '#DDEFF8' });
  }, { in: { type: 'push', dir: 'left' }, cam: Shots.push(1.0, 1.04) });

  // S4 — 2.7 million colonies ≈ the whole country
  P.shot(ev.c4_s4, (ctx, t, s) => {
    P.paperBg(ctx, '#F3E7D2');
    P.counter(ctx, { x: W / 2, y: 230, from: 0, to: 2.7, decimals: 1, t, t0: ev.c4_s4 + 0.4, t1: ev.c4_m, size: 140, suffix: ' million', color: C.navy, sub: 'colonies needed for the 2024 almond bloom', subSize: 42 });
    const col = (x, t0, lab, color) => { const k = ease.outCubic(clamp((t - t0) / 1.0)); const nh = Math.round(36 * k);
      for (let i = 0; i < nh; i++) P.hive(ctx, x - 150 + (i % 6) * 60, 960 - Math.floor(i / 6) * 64, 0.5, { seed: i + (x | 0), color });
      if (k > 0) P.note(ctx, lab, x, 1010, t, t0 + 0.2, 1e9, { size: 44, seed: x | 0 }); };
    col(620, ev.c4_m - 0.5, 'needed for almonds', '#F2E3B8');
    col(1300, ev.c4_jan - 0.3, 'all US colonies, 1 Jan 2024', '#BFE0F0');
    if (t > ev.c4_jan + 0.9) { G.line(ctx, [[400, 560], [1520, 560]], { color: C.red, lw: 6, seed: 3 }); P.note(ctx, '≈ the same', 960, 520, t, ev.c4_jan + 0.9, 1e9, { size: 56, fill: C.gold, seed: 4 }); }
  }, { in: { type: 'paper' }, cam: Shots.push(1.0, 1.04) });

  // S5 — the rent
  P.shot(ev.c4_s5, (ctx, t, s) => {
    P.sky(ctx, '#CFE3F2', '#F4EDE0'); P.ground(ctx, 820, { fill: '#A7C98A', seed: 44 });
    P.hive(ctx, 640, 860, 2.6, { seed: 5 });
    const k = P.pop(t, ev.c4_rent0 - 0.2, 0.5); const sw = Math.sin((t - ev.c4_rent0) * 3) * 0.12 * Math.exp(-(t - ev.c4_rent0) * 0.8);
    if (k > 0) { G.line(ctx, [[760, 560], [1060, 430]], { color: C.ink, lw: 4, seed: 6 }); P.at(ctx, 1240, 450, k, sw, () => { G.poly(ctx, [[-200, -110], [200, -110], [200, 110], [-200, 110], [-260, 0]], { fill: '#FFE07A', seed: 7, lw: 5 }); ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(-210, 0, 12, 0, 7); ctx.fill(); }); }
    P.counter(ctx, { x: 1260, y: 470, from: 0, to: 180, t, t0: ev.c4_rent0, t1: ev.c4_rent, size: 120, prefix: '$', color: C.navyD, card: null, sub: 'per hive (2024 avg.)', subSize: 38 });
    P.note(ctx, 'for a few weeks of work', 1240, 800, t, ev.c4_weeks, 1e9, { size: 56, seed: 8 });
    for (let i = 0; i < 4; i++) Ch.bee(ctx, { x: 640 + Math.sin(t * 1.3 + i * 1.6) * 260, y: 520 + Math.cos(t * 1.7 + i) * 90, s: 0.35, t: t + i, seed: i + 4, eyes: 'happy' });
  }, { in: { type: 'wipe', dir: 'left' }, cam: Shots.push(1.0, 1.05) });

  // S6 — $320M+, 80% of all pollination money
  P.shot(ev.c4_s6, (ctx, t, s) => {
    P.paperBg(ctx, '#F3E7D2');
    P.counter(ctx, { x: 640, y: 420, from: 0, to: 320, t, t0: ev.c4_s6 + 0.4, t1: ev.c4_usd, size: 150, prefix: '$', suffix: 'M+', color: C.greenD, sub: 'paid for almond pollination, 2024', subSize: 40 });
    const k = P.fin(t, ev.c4_80 - 0.5, 0.3);
    if (k > 0) Data.donut(ctx, { x: 1380, y: 520, r: 260, thickness: 90, t, t0: ev.c4_80 - 0.3, t1: ev.c4_80 + 0.8, data: [{ value: 81, color: '#C68A55', label: '' }, { value: 19, color: '#D8CCB6', label: '' }], center: '≈80%', centerSub: 'of all US pollination fees' });
    P.food(ctx, 'almond', 1380, 900, 0.9 * k);
    for (let i = 0; i < 10; i++) { const a = t - ev.c4_usd - i * 0.05; if (a < 0 || a > 1.4) continue; const x = 300 + i * 70, y = 620 + a * a * 420; G.ellipse(ctx, x, y, 26, 26, { fill: C.gold, seed: i, lw: 3 }); G.text(ctx, '$', x, y + 11, { size: 30, fam: FT.title, weight: 400, color: C.navyD, align: 'center' }); }
  }, { in: { type: 'push', dir: 'up' }, cam: Shots.push(1.0, 1.04) });

  // S7 — one crop, one valley, almost every hive
  P.shot(ev.c4_s7, (ctx, t, s) => {
    P.sky(ctx, '#F6D8C2', '#F4EDE0'); P.ground(ctx, 800, { fill: '#C9A15E', seed: 46 });
    G.rrect(ctx, -300, 860, W + 600, 90, 4, { fill: '#6A6560', seed: 47, lw: 4 }); for (let i = 0; i < 14; i++) ctx.fillStyle = '#F2E3B8', ctx.fillRect(i * 160 - ((t * 300) % 160), 900, 80, 10);
    for (let i = 0; i < 5; i++) { const x = W + 300 - ((t - ev.c4_s7) * 420 + i * 520) % (W + 900); P.truck(ctx, x, 920, 0.9, { seed: 200 + i, hives: 6, t }); }
    ['ONE CROP', 'ONE VALLEY', 'ALMOST EVERY HIVE'].forEach((w, i) => P.stamp(ctx, w, [420, 980, 1460][i], [250, 420, 250][i], t, ev.c4_w[i], { size: i === 2 ? 70 : 84, color: [C.navy, C.coral, C.red][i], rot: (i - 1) * 0.07 }));
  }, { in: { type: 'fade', dur: 0.4 }, cam: Shots.push(1.0, 1.05) });
})();
