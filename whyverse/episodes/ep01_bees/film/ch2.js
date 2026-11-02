// Chapter 2 — the supermarket test.
(function () {
  const { U, G, Ch, P, SCORE: S, Shots, Data } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const store = (ctx, t) => {
    P.paperBg(ctx, '#F6EEDD');
    ctx.fillStyle = '#E9DFC9'; ctx.fillRect(-400, 880, W + 800, 600);
    for (let i = -4; i < 30; i++) { G.line(ctx, [[i * 120, 880], [i * 120 - 300, 1300]], { color: 'rgba(42,35,32,0.12)', lw: 3, seed: i }); }
    // ceiling lights
    for (let i = 0; i < 5; i++) { G.rrect(ctx, 120 + i * 400, 40, 240, 26, 12, { fill: '#FFFBEA', seed: 200 + i, lw: 3 }); }
  };
  const shelf = (ctx, x, y, w, rows, items, o = {}) => {
    G.rrect(ctx, x, y, w, rows * 190 + 30, 8, { fill: o.fill || '#C8DDE6', seed: (x | 0) + 1, lw: 5, hatch: { color: 'rgba(0,0,0,0.06)', gap: 10 } });
    for (let r = 0; r < rows; r++) { G.rrect(ctx, x - 10, y + 180 + r * 190, w + 20, 24, 4, { fill: '#F2F2F2', seed: (x | 0) + 10 + r, lw: 4 }); }
    items(ctx);
  };
  P.cardShot('c2', 2, 'The supermarket test', (ctx, t) => { store(ctx, t); shelf(ctx, 260, 330, 1400, 2, () => {}); });

  // S1 — the morning after: the whole store, the bee waves goodbye
  const AIS = [['apple', 'pear', 'cherry', 'melon', 'blueberry'], ['pumpkin', 'cucumber', 'carrot', 'onion', 'almond'], ['bread', 'rice', 'pasta', 'corn', 'coffee']];
  P.shot(ev.c2_s1, (ctx, t, s) => {
    store(ctx, t);
    shelf(ctx, 160, 300, 1600, 2, () => { for (let r = 0; r < 2; r++) for (let i = 0; i < 12; i++) P.food(ctx, AIS[(i / 4 | 0)][(i + r * 2) % 5], 230 + i * 128, 420 + r * 190, 0.8, { seed: i * 3 + r }); });
    const gone = ev.c2_gone; const u = clamp((t - (gone - 1.4)) / 1.4);
    const bx = lerp(820, 2100, ease.inCubic(u)), by = lerp(800, 160, ease.inQuad(u));
    if (t < gone + 0.05) Ch.bee(ctx, { x: bx, y: by + Math.sin(t * 3) * 10, s: 1.1, t, eyes: u > 0 ? 'happy' : 'normal', wave: 1, armR: 1.3, mouth: P.talk(t), rot: -0.25 * u });
    P.note(ctx, 'the morning after', 360, 200, t, ev.c2_s1 + 0.6, 1e9, { size: 58, seed: 3, rot: -0.04 });
  }, { in: 'cut', cam: Shots.push(1.0, 1.06) });

  // S2 — 87 vs 28 crops
  P.shot(ev.c2_s2, (ctx, t, s) => {
    P.paperBg(ctx, '#F3E7D2');
    const kinds = ['apple', 'pear', 'cherry', 'melon', 'blueberry', 'pumpkin', 'cucumber', 'carrot', 'onion', 'almond', 'coffee', 'plum', 'cacao', 'loquat'];
    const n87 = Math.round(Data.count(t, ev.c2_87a, ev.c2_87 + 0.6, 0, 87, ease.outCubic));
    for (let i = 0; i < n87; i++) { const x = 140 + (i % 11) * 92, y = 300 + Math.floor(i / 11) * 88; P.food(ctx, kinds[i % kinds.length], x, y, 0.55, { seed: i }); }
    const n28 = Math.round(Data.count(t, ev.c2_28 - 0.4, ev.c2_28 + 0.5, 0, 28, ease.outCubic));
    for (let i = 0; i < n28; i++) { const x = 1340 + (i % 5) * 92, y = 300 + Math.floor(i / 5) * 88; P.food(ctx, ['bread', 'rice', 'corn', 'pasta'][i % 4], x, y, 0.55, { seed: i + 99 }); }
    P.counter(ctx, { x: 600, y: 150, from: 0, to: 87, t, t0: ev.c2_87a, t1: ev.c2_87 + 0.6, size: 110, color: C.coral, sub: 'need animal pollination (at least partly)', subSize: 40 });
    P.counter(ctx, { x: 1530, y: 150, from: 0, to: 28, t, t0: ev.c2_28 - 0.4, t1: ev.c2_28 + 0.5, size: 110, color: C.navy, sub: "don't", subSize: 40 });
    P.note(ctx, 'of the leading food crops', 600, 1000, t, ev.c2_87 + 0.6, 1e9, { size: 46, seed: 5 });
  }, { in: { type: 'push', dir: 'left' }, cam: Shots.push(1.0, 1.04) });

  // S3 — 3/4 of crop types, $577 bn
  P.shot(ev.c2_s3, (ctx, t, s) => {
    P.paperBg(ctx, '#F3E7D2');
    const k = P.fin(t, ev.c2_s3, 0.4);
    if (k > 0) Data.donut(ctx, { x: 560, y: 560, r: 270, thickness: 110, t, t0: ev.c2_s3 + 0.2, t1: ev.c2_threeq + 0.9, thickness: 80, data: [{ value: 75, color: C.coral, label: '' }, { value: 25, color: '#D8CCB6', label: '' }], center: '>¾', centerSub: 'of crop types' });
    P.counter(ctx, { x: 1340, y: 520, from: 0, to: 577, t, t0: ev.c2_bn0, t1: ev.c2_bn, size: 104, prefix: 'up to $', suffix: ' bn', color: C.greenD, sub: 'a year of crops that pollinators help produce', subSize: 38, rot: 0.02 });
    const cs = ev.c2_bn; for (let i = 0; i < 8; i++) { const a = t - cs - i * 0.06; if (a < 0 || a > 1.2) continue; const x = 1100 + i * 80, y = 700 + a * a * 500; G.ellipse(ctx, x, y, 26, 26, { fill: C.gold, seed: i, lw: 3 }); G.text(ctx, '$', x, y + 11, { size: 30, fam: FT.title, weight: 400, color: C.navyD, align: 'center' }); }
  }, { in: { type: 'wipe', dir: 'up' }, cam: Shots.push(1.0, 1.05) });

  // S4 — one long shelf: fruit → vegetables → nuts & coffee (camera pans)
  const SEC = [
    { x: 0, label: 'FRUIT', items: ['apple', 'pear', 'cherry', 'melon', 'blueberry'], times: () => ev.c2_fruit },
    { x: 1920, label: 'VEGETABLES', items: ['pumpkin', 'cucumber', 'carrot', 'onion'], times: () => ev.c2_veg },
    { x: 3840, label: 'NUTS & COFFEE', items: ['almond', 'coffee'], times: () => [ev.c2_almond, ev.c2_coffee] },
  ];
  P.shot(ev.c2_s4, (ctx, t, s) => {
    const camx = U.keys ? U.keys(t, [[ev.c2_s4, 0], [ev.c2_veg0 - 0.3, 0, ease.inOutCubic], [ev.c2_veg0 + 0.5, 1920, ease.inOutCubic], [ev.c2_nut0 - 0.3, 1920], [ev.c2_nut0 + 0.5, 3840, ease.inOutCubic]]) : 0;
    ctx.save(); ctx.translate(-camx, 0);
    P.paperBg(ctx, '#F6EEDD'); ctx.fillStyle = '#F6EEDD'; ctx.fillRect(-400, -400, 7000, 2000);
    ctx.fillStyle = '#E9DFC9'; ctx.fillRect(-400, 900, 7000, 600);
    SEC.forEach((sec, si) => {
      const x0 = sec.x + 140, n = sec.items.length, w = 1640;
      G.rrect(ctx, x0, 170, w, 110, 10, { fill: [C.coral, C.green, C.brown][si], seed: 300 + si, lw: 5 });
      G.text(ctx, sec.label, x0 + w / 2, 250, { size: 74, fam: FT.title, weight: 400, color: '#FFF8E8', align: 'center' });
      G.rrect(ctx, x0, 300, w, 600, 8, { fill: '#C8DDE6', seed: 310 + si, lw: 5 });
      for (let r = 0; r < 2; r++) G.rrect(ctx, x0 - 10, 570 + r * 300, w + 20, 26, 4, { fill: '#F2F2F2', seed: 320 + si * 3 + r, lw: 4 });
      const times = sec.times();
      sec.items.forEach((it, i) => {
        const cx = x0 + (i + 0.5) * w / n, t0 = times[i];
        const hl = t >= t0 ? Math.exp(-(t - t0) * 5) : 0;
        // stock: 6 per item; after its word, 4 of them pop away one by one
        for (let k = 0; k < 6; k++) {
          const row = k < 3 ? 0 : 1, col = k % 3; const tv = t0 + 0.25 + k * 0.08;
          if (k >= 2 && t > tv + 0.15) continue;
          const sc = k >= 2 && t > tv ? 1 - (t - tv) / 0.15 : 1;
          P.food(ctx, it, cx + (col - 1) * (w / n / 3.4), 500 + row * 300 - (hl * 30 * (k === 0 ? 1 : 0)), (si === 2 ? 1.0 : 0.85) * sc * (1 + hl * 0.25), { seed: k + i * 7 });
          if (k >= 2) P.sparkle(ctx, cx + (col - 1) * (w / n / 3.4), 500 + row * 300, t, tv, { n: 6, r: 40, color: '#FFFFFF', seed: k });
        }
        // price tag flips to $$$
        const pt = si === 0 ? ev.c2_price : t0 + 0.6; const f = clamp((t - pt) / 0.25);
        P.at(ctx, cx, 620, 1, 0, () => { G.rrect(ctx, -60, -10, 120, 60, 6, { fill: f > 0.5 ? '#FFE07A' : '#FFFFFF', seed: 330 + i + si * 9, lw: 3.5 });
          ctx.save(); ctx.scale(1, Math.abs(Math.cos(f * Math.PI)) || 0.01); G.text(ctx, f > 0.5 ? '$$$' : '$', 0, 34, { size: 40, fam: FT.title, weight: 400, color: f > 0.5 ? C.red : C.ink, align: 'center' }); ctx.restore(); });
      });
    });
    // seed packets in veg section
    const ks = P.pop(t, ev.c2_seeds);
    if (ks > 0) for (let i = 0; i < 2; i++) P.at(ctx, 1920 + 1260 + i * 200, 1000, ks, (i - 0.5) * 0.1, () => { G.rrect(ctx, -70, -90, 140, 180, 8, { fill: '#FFF8E8', seed: 340 + i, lw: 4 }); P.food(ctx, i ? 'onion' : 'carrot', 0, -10, 0.7); G.text(ctx, 'SEEDS', 0, 70, { size: 32, fam: FT.title, weight: 400, color: C.navy, align: 'center' }); });
    ctx.restore();
    P.note(ctx, 'fewer, and pricier', 1500, 1000, t, ev.c2_fewer, ev.c2_veg0 - 0.2, { size: 58, fill: C.gold, seed: 9, rot: 0.03 });
  }, { in: { type: 'paper' } });

  // S6 — the other side: bread, rice, pasta, cornflakes stay (wind)
  P.shot(ev.c2_s6, (ctx, t, s) => {
    P.paperBg(ctx, '#F6EEDD'); ctx.fillStyle = '#E9DFC9'; ctx.fillRect(-400, 900, W + 800, 600);
    G.rrect(ctx, 140, 170, 1640, 110, 10, { fill: '#C9A15E', seed: 400, lw: 5 });
    G.text(ctx, 'BREAD · RICE · PASTA · CEREAL', W / 2, 250, { size: 66, fam: FT.title, weight: 400, color: '#FFF8E8', align: 'center' });
    G.rrect(ctx, 140, 300, 1640, 330, 8, { fill: '#C8DDE6', seed: 401, lw: 5 }); G.rrect(ctx, 130, 600, 1660, 26, 4, { fill: '#F2F2F2', seed: 402, lw: 4 });
    ['bread', 'rice', 'pasta', 'corn'].forEach((it, i) => { const x = 140 + (i + 0.5) * 410; const k = P.pop(t, ev.c2_carb[i], 0.3, 3);
      for (let j = 0; j < 3; j++) P.food(ctx, it, x + (j - 1) * 110, 500, 0.9 * (0.7 + 0.3 * k), { seed: i * 5 + j });
      if (k > 0) P.at(ctx, x + 150, 360, k, 0, () => { G.ellipse(ctx, 0, 0, 34, 34, { fill: C.green, seed: 410 + i, lw: 4 }); G.line(ctx, [[-14, 0], [-3, 12], [16, -12]], { color: '#FFF', lw: 7, seed: 420 + i }); }); });
    // fields of wind-pollinated grain + gusts
    const wk = P.fin(t, ev.c2_wind - 0.4, 0.5);
    for (let i = 0; i < 26; i++) { const x = 80 + i * 70, sw = Math.sin(t * 3 + i * 0.4) * 14 * (0.3 + wk); G.line(ctx, [[x, 1080], [x + sw * 0.5, 900], [x + sw, 820]], { color: '#C9A15E', lw: 6, seed: 430 + i });
      G.ellipse(ctx, x + sw, 800, 10, 26, { fill: '#E3BE6A', seed: 460 + i, lw: 3 }); }
    if (wk > 0) for (let g = 0; g < 6; g++) { const ph = ((t - ev.c2_wind) * 0.9 + g * 0.37) % 1.6; const x = -200 + ph * 1600, y = 700 + g * 40; ctx.globalAlpha = 0.6 * wk;
      G.line(ctx, [[x, y], [x + 140, y - 10], [x + 260, y + 6], [x + 300, y - 20]], { color: '#7FA8C9', lw: 5, seed: 480 + g }); ctx.globalAlpha = 1; }
    P.note(ctx, 'pollinated by the wind', 1450, 760, t, ev.c2_wind, 1e9, { size: 56, fill: '#DDEFF8', seed: 12, rot: -0.03 });
    Ch.bee(ctx, { x: 1760, y: 400, s: 0.55, t, facing: -1, alpha: P.fin(t, ev.c2_single - 0.2, 0.3) * (1 - P.fin(t, ev.c2_single + 1.2, 0.3)), eyes: 'happy', mouth: 'smile' });
    P.stamp(ctx, 'NO BEES NEEDED', 1450, 980, t, ev.c2_single, { size: 64, color: C.greenD, rot: -0.05 });
  }, { in: { type: 'whip', dir: 'left' }, cam: Shots.push(1.0, 1.05) });

  // S7 — by weight: 60 / 35 / 5
  P.shot(ev.c2_s7, (ctx, t, s) => {
    P.paperBg(ctx, '#F3E7D2');
    G.text(ctx, 'world food production, by weight', W / 2, 220, { size: 64, fam: FT.hand, color: C.ink, align: 'center', alpha: P.fin(t, ev.c2_s7, 0.4) });
    const x = 160, y = 420, w = 1600, h = 200;
    G.rrect(ctx, x, y, w, h, 20, { fill: 'rgba(42,35,32,0.06)', seed: 3, lw: 4 });
    const a = ease.outCubic(clamp((t - ev.c2_60 + 0.3) / 0.8)), b = ease.outCubic(clamp((t - ev.c2_35 + 0.3) / 0.8));
    if (a > 0) G.rrect(ctx, x, y, w * 0.6 * a, h, 20, { fill: '#D9B46A', seed: 4, lw: 5, hatch: { color: 'rgba(0,0,0,0.12)', gap: 9 } });
    if (b > 0) G.rrect(ctx, x + w * 0.6, y, w * 0.35 * b, h, 20, { fill: C.coral, seed: 5, lw: 5, hatch: { color: 'rgba(0,0,0,0.12)', gap: 9 } });
    if (b > 0.9) G.rrect(ctx, x + w * 0.95, y, w * 0.05, h, 12, { fill: '#CFC6B4', seed: 6, lw: 4 });
    if (a > 0.5) { G.text(ctx, '60%', x + w * 0.3, y + 135, { size: 110, fam: FT.title, weight: 400, color: C.navyD, align: 'center' }); P.note(ctx, "crops that don't need animals", x + w * 0.3, 760, t, ev.c2_60 + 0.3, 1e9, { size: 50, seed: 7 }); }
    if (b > 0.5) { G.text(ctx, '35%', x + w * 0.775, y + 135, { size: 100, fam: FT.title, weight: 400, color: '#FFF8E8', align: 'center' }); P.note(ctx, 'crops that do', x + w * 0.775, 760, t, ev.c2_35 + 0.3, 1e9, { size: 50, seed: 8, fill: '#FBE3EA' }); }
    for (let i = 0; i < 3; i++) { P.food(ctx, ['bread', 'rice', 'corn'][i], x + w * 0.3 + (i - 1) * 140, 900 - Math.abs(Math.sin(t * 3 + i)) * 10 * (1 - a), 0.8 * P.pop(t, ev.c2_s7 + 0.3 + i * 0.12)); P.food(ctx, ['apple', 'pumpkin', 'almond'][i], x + w * 0.775 + (i - 1) * 140, 900 - Math.abs(Math.sin(t * 3 + i + 1)) * 10 * (1 - b), 0.8 * P.pop(t, ev.c2_s7 + 0.7 + i * 0.12)); }
    if (b > 0.95) G.text(ctx, '5% not assessed', x + w * 0.975, y - 20, { size: 34, fam: FT.label, weight: 400, color: C.ink, align: 'right' });
  }, { in: { type: 'push', dir: 'left' }, cam: Shots.push(1.0, 1.04) });

  // S8 — calories yes, colour no: the plate drains
  P.shot(ev.c2_s8, (ctx, t, s) => {
    P.paperBg(ctx, '#F3E7D2');
    const g = clamp((t - ev.c2_fade) / 1.2);
    for (const [px, grey, items, lab, t0] of [[560, 0, ['bread', 'rice', 'pasta'], 'calories ✓', ev.c2_cal], [1360, g, ['apple', 'cherry', 'carrot', 'blueberry', 'pumpkin'], 'colour ✗', ev.c2_colour]]) {
      G.ellipse(ctx, px, 560, 330, 300, { fill: '#FFFFFF', seed: px, lw: 5 }); G.ellipse(ctx, px, 560, 250, 225, { fill: '#F7F3EA', seed: px + 1, lw: 3, stroke: 'rgba(42,35,32,0.3)' });
      items.forEach((it, i) => { const a = (i / items.length) * 6.283 + 0.4; P.food(ctx, it, px + Math.cos(a) * 130 * (items.length > 3 ? 1 : 0.7), 560 + Math.sin(a) * 110 * (items.length > 3 ? 1 : 0.7), 0.95, { grey, seed: i }); });
      P.note(ctx, lab, px, 960, t, t0, 1e9, { size: 64, seed: px + 5, fill: px < 900 ? '#E3F1DA' : '#FBE3EA' });
    }
    ['A', 'C', 'K', 'folate'].forEach((v, i) => { const a = t - ev.c2_vit - i * 0.12; if (a < -0.5) return; const k = P.pop(t, ev.c2_vit - 0.5 + i * 0.05);
      const x = 1180 + i * 120, y = 300 - Math.max(0, a) * 260; const al = 1 - clamp(a / 1.4);
      if (al > 0) P.at(ctx, x, y, k, Math.sin(t * 3 + i) * 0.1, () => { ctx.globalAlpha *= al; G.ellipse(ctx, 0, 0, v.length > 1 ? 70 : 44, 44, { fill: [C.gold, C.coral, C.green, '#7CC4F2'][i], seed: 500 + i, lw: 4 }); G.text(ctx, v, 0, 14, { size: v.length > 1 ? 32 : 46, fam: FT.title, weight: 400, color: C.navyD, align: 'center' }); }); });
  }, { in: { type: 'zoom' }, cam: Shots.push(1.0, 1.06) });
})();
