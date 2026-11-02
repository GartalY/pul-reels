// Chapter 7 — the real news, and what helps.
(function () {
  const { U, G, Ch, P, SCORE: S, Shots, Data } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const field = (ctx, t) => { P.sky(ctx, '#CFE7EE', '#F4EDE0'); P.sun(ctx, 1680, 170, 70, t); P.ground(ctx, 640, { fill: '#9BC27E', seed: 71, hill: 10 }); };
  P.cardShot('c7', 7, 'The real news', (ctx, t) => { field(ctx, t); for (let r = 0; r < 4; r++) G.rrect(ctx, -100, 720 + r * 90, W + 200, 50, 6, { fill: r % 2 ? '#C9A15E' : '#E3C27A', seed: 80 + r, lw: 3 }); });

  // S1 — +300% in 50 years
  P.shot(ev.c7_s1, (ctx, t, s) => {
    P.paperBg(ctx, '#F3E7D2');
    G.text(ctx, 'production of pollinator-dependent crops', 260, 190, { size: 56, fam: FT.hand, color: C.ink, alpha: P.fin(t, ev.c7_s1, 0.4) });
    const x0 = 260, y0 = 900, w = 1300, h = 560;
    G.line(ctx, [[x0, y0], [x0 + w, y0]], { color: C.ink, lw: 5, seed: 3 }); G.line(ctx, [[x0, y0], [x0, y0 - h]], { color: C.ink, lw: 5, seed: 4 });
    G.text(ctx, '50 years ago', x0, y0 + 60, { size: 44, fam: FT.label, weight: 400, color: C.ink }); G.text(ctx, 'today', x0 + w, y0 + 60, { size: 44, fam: FT.label, weight: 400, color: C.ink, align: 'right' });
    const u = ease.inOutQuad(clamp((t - ev.c7_line0) / (ev.c7_300 - ev.c7_line0 + 0.3)));
    const pts = []; for (let i = 0; i <= 60 * u; i++) { const v = i / 60; const val = 1 + 3 * Math.pow(v, 1.15) + Math.sin(v * 25) * 0.05; pts.push([x0 + v * w, y0 - (val / 4) * h]); }
    if (pts.length > 1) { G.line(ctx, pts, { color: C.coral, lw: 10, seed: 5 }); const p = pts[pts.length - 1]; G.ellipse(ctx, p[0], p[1], 16, 16, { fill: C.coral, seed: 6, lw: 4 }); }
    G.ellipse(ctx, x0, y0 - h / 4, 14, 14, { fill: C.navy, seed: 7, lw: 3 });
    P.stamp(ctx, '+300%', x0 + w - 120, y0 - h - 20, t, ev.c7_300, { size: 120, color: C.coral, rot: -0.08 });
    P.note(ctx, 'we need them more than ever', 1100, 1000, t, ev.c7_more, 1e9, { size: 52, fill: C.gold, seed: 8 });
    Ch.bee(ctx, { x: x0 + w * u + 30, y: y0 - (1 + 3 * Math.pow(u, 1.15)) / 4 * h - 120, s: 0.6, t, eyes: 'wide', mouth: P.talk(t), alpha: P.fin(t, ev.c7_line0, 0.3) });
  }, { in: 'cut', cam: Shots.push(1.0, 1.04) });

  // S2 — honeybees are managed: beekeepers replace losses
  const KEEPER = { skin: '#E2B08A', hair: '#5A3B28', hairStyle: 'short', outfit: 'shirt', shirt: '#F4F1E8', bottoms: 'pants', shorts: '#E8E2D2', headwear: 'cap', headwearColor: '#E8E2D2', glasses: 'round' };
  P.shot(ev.c7_s2, (ctx, t, s) => {
    field(ctx, t);
    const kq = P.pop(t, ev.c7_q); if (kq > 0 && t < ev.c7_not + 0.2) P.at(ctx, W / 2, 260, kq, 0, () => G.text(ctx, 'disappearing?', 0, 0, { size: 96, fam: FT.title, weight: 400, color: C.navy, align: 'center' }));
    P.stamp(ctx, 'NOT ALL AT ONCE', W / 2, 260, t, ev.c7_not + 0.2, { size: 90, color: C.greenD, rot: -0.04 });
    Ch.person(ctx, { x: 420, y: 960, pose: 'stand', s: 0.95, style: KEEPER, gesture: t > ev.c7_live ? 'point' : undefined, eyes: 'happy', mouth: 'smile' });
    // a row of hives; one is lost, new ones appear
    for (let i = 0; i < 6; i++) { const x = 760 + i * 190; const lost = i === 2 && t > ev.c7_live + 0.5; const k = lost ? 1 - clamp((t - ev.c7_live - 0.5) / 0.4) : 1;
      if (k > 0) { ctx.save(); ctx.globalAlpha *= k; P.hive(ctx, x, 960, 1.0, { seed: 10 + i, color: lost ? '#BDB6AC' : '#F2E3B8' }); ctx.restore(); } }
    ev.c7_rep.forEach((tr, i) => { const k = P.pop(t, tr, 0.4); if (k > 0) P.hive(ctx, [760 + 2 * 190, 760 + 6 * 190, 760 + 7 * 190][i] - (i ? 0 : 0), 960 - (i === 0 ? 0 : 0), k, { seed: 30 + i, color: '#BFE0F0' }); });
    for (let i = 0; i < 5; i++) Ch.bee(ctx, { x: 900 + ((t * 90 + i * 260) % 1000), y: 640 + Math.sin(t * 2 + i) * 50, s: 0.3, t: t + i, seed: i });
    P.note(ctx, 'kept like livestock', 1450, 450, t, ev.c7_live, 1e9, { size: 56, seed: 3 });
  }, { in: { type: 'push', dir: 'left' }, cam: Shots.push(1.0, 1.04) });

  // S3 — wild pollinators: >40% of species face extinction (where assessed)
  P.shot(ev.c7_s3, (ctx, t, s) => {
    P.paperBg(ctx, '#EDE6DA');
    P.note(ctx, 'the wild ones', 330, 150, t, ev.c7_wild, 1e9, { size: 64, seed: 3, fill: C.gold, rot: -0.04 });
    const kinds = ['bee', 'butterfly', 'bee', 'butterfly', 'bee', 'moth', 'bee', 'butterfly', 'bee', 'beetle'];
    kinds.forEach((k, i) => { const x = 280 + (i % 5) * 340, y = 430 + Math.floor(i / 5) * 300; const lost = [1, 4, 6, 8].indexOf(i); const tl = lost >= 0 ? ev.c7_ext[lost] : 1e9; const g = clamp((t - tl) / 0.5);
      G.ellipse(ctx, x, y, 110, 110, { fill: P.mix('#FFFFFF', '#CFC6B4', g), seed: 50 + i, lw: 3, stroke: 'rgba(42,35,32,0.4)' });
      ctx.save(); ctx.globalAlpha *= 1 - 0.75 * g; P.icon(ctx, k, x, y + 4 * g * 10, 1.1, t, i * 3); ctx.restore();
      if (g > 0) G.line(ctx, [[x - 80, y + 80], [x + 80, y - 80]], { color: C.red, lw: 8, seed: 60 + i, alpha: g }); });
    P.counter(ctx, { x: 1650, y: 190, from: 0, to: 40, t, t0: ev.c7_40a, t1: ev.c7_40, size: 110, prefix: '>', suffix: '%', color: C.red, sub: 'of species at risk, where assessed', subSize: 34 });
  }, { in: { type: 'paper' }, cam: Shots.push(1.0, 1.04) });

  // S4 — the causes
  P.shot(ev.c7_s4, (ctx, t, s) => {
    P.paperBg(ctx, '#EDE6DA');
    const tiles = [['LOST HABITAT', '#C9A15E', (k) => { for (let i = 0; i < 3; i++) G.poly(ctx, [[-90 + i * 60, 60], [-60 + i * 60, -60], [-30 + i * 60, 60]], { fill: '#3E7F45', seed: 70 + i, lw: 3 }); G.rrect(ctx, -110, 60, 220, 40, 4, { fill: '#E3C27A', seed: 74, lw: 3 }); }],
      ['PESTICIDES', '#9BC48A', (k) => { G.rrect(ctx, -40, -70, 80, 140, 12, { fill: '#D9D4C8', seed: 75, lw: 4 }); G.rrect(ctx, -16, -100, 32, 30, 4, { fill: C.red, seed: 76, lw: 3 }); for (let i = 0; i < 4; i++) { ctx.fillStyle = 'rgba(214,232,200,0.8)'; ctx.beginPath(); ctx.arc(60 + i * 26, -90 - i * 8, 14 + i * 4, 0, 7); ctx.fill(); } }],
      ['CLIMATE CHANGE', '#EF9B7B', (k) => { G.rrect(ctx, -18, -100, 36, 160, 18, { fill: '#FFFFFF', seed: 77, lw: 4 }); G.ellipse(ctx, 0, 70, 34, 34, { fill: C.red, seed: 78, lw: 4 }); G.rrect(ctx, -8, -60 + 40 * (1 - k), 16, 130 - 40 * (1 - k), 8, { fill: C.red, seed: 79, lw: 0 }); }]];
    tiles.forEach(([lab, col, icon], i) => { const k = P.pop(t, ev.c7_c[i], 0.4); if (k <= 0) return; const x = 380 + i * 580, y = 560;
      P.at(ctx, x, y, k, (i - 1) * 0.04, () => { G.tornPaper(ctx, -240, -260, 480, 520, { fill: col, seed: 80 + i }); P.at(ctx, 0, -60, 1.4, 0, () => icon(clamp((t - ev.c7_c[i]) / 1.2))); G.text(ctx, lab, 0, 190, { size: 48, fam: FT.title, weight: 400, color: C.navyD, align: 'center' }); }); });
    P.note(ctx, 'the same lessons as Maoxian', W / 2, 970, t, ev.c7_s4 + 0.3, 1e9, { size: 52, seed: 9 });
    { const k = 1 - P.fin(t, ev.c7_c[0] - 0.2, 0.3); if (k > 0) P.at(ctx, W / 2, 520, P.pop(t, ev.c7_s4 + 0.1) * k, Math.sin(t * 2) * 0.05, () => G.text(ctx, 'why?', 0, 60, { size: 220, fam: FT.title, weight: 400, color: C.coral, align: 'center' })); }
  }, { in: { type: 'push', dir: 'up' }, cam: Shots.push(1.0, 1.03) });

  // S5 — the fixes: wildflower strips, smarter sprays, a wild corner → bees come back
  P.shot(ev.c7_s5, (ctx, t, s) => {
    field(ctx, t);
    for (let r = 0; r < 3; r++) G.rrect(ctx, -100, 720 + r * 110, W + 200, 70, 6, { fill: r % 2 ? '#C9A15E' : '#E3C27A', seed: 90 + r, lw: 3, hatch: { color: 'rgba(0,0,0,0.12)', gap: 7, angle: 0 } });
    ev.c7_strip.forEach((ts, i) => { const k = P.pop(t, ts, 0.4); if (k <= 0) return; P.flower(ctx, 60 + i * 165, 700 + (i % 2) * 8, 0.55 * k, { color: ['#E58FB0', '#B79CFF', '#F2B84B', '#EF7B5B'][i % 4], sway: 1, seed: 100 + i, t }); });
    P.note(ctx, 'wildflower strips', 330, 300, t, ev.c7_strip0, 1e9, { size: 54, seed: 4, fill: '#FBE3EA' });
    const ks = P.pop(t, ev.c7_spray); if (ks > 0) { P.note(ctx, 'fewer, smarter sprays', 960, 220, t, ev.c7_spray, 1e9, { size: 54, seed: 5, fill: '#E3F1DA' }); P.at(ctx, 960, 400, 0.8 * ks, 0, () => { G.rrect(ctx, -30, -50, 60, 100, 10, { fill: '#D9D4C8', seed: 6, lw: 4 }); G.ellipse(ctx, 0, 0, 90, 90, { stroke: C.greenD, lw: 6, seed: 7 }); }); }
    const kg = P.pop(t, ev.c7_garden); if (kg > 0) { P.note(ctx, 'a wild corner', 1580, 300, t, ev.c7_garden, 1e9, { size: 54, seed: 8, fill: C.gold }); for (let i = 0; i < 6; i++) P.flower(ctx, 1460 + i * 60, 640 + (i % 3) * 14, 0.5 * kg, { color: ['#E58FB0', '#F2B84B', '#B79CFF'][i % 3], sway: 1, seed: 130 + i, t, stem: 120 + (i % 2) * 40 }); }
    ev.c7_bees.forEach((tb, i) => { const a = clamp((t - tb) / 1.5); if (a <= 0) return; Ch.bee(ctx, { x: lerp(-100, 300 + i * 320, ease.outCubic(a)) + Math.sin(t * 2 + i) * 30, y: 520 + Math.sin(t * 3 + i) * 40 - i * 20, s: 0.45, t: t + i, seed: i + 3, eyes: 'happy' }); });
  }, { in: { type: 'wipe', dir: 'left' }, cam: Shots.push(1.0, 1.05) });
})();
