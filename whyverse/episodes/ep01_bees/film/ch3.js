// Chapter 3 — the human bees of Maoxian.
(function () {
  const { U, G, Ch, P, SCORE: S, Shots, Data } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const FARMER = { skin: '#D8A47A', hair: '#1E1A1A', hairStyle: 'short', outfit: 'shirt', shirt: '#4F7CAC', bottoms: 'pants', shorts: '#3A3A44', headwear: 'cap', headwearColor: '#6B8E5A', build: 'regular' };
  const FARMER2 = { skin: '#E2B08A', hair: '#231B18', hairStyle: 'bun', outfit: 'shirt', shirt: '#C0504D', bottoms: 'pants', shorts: '#4A4038', build: 'slim' };
  const FARMER3 = { skin: '#CF9A70', hair: '#2B2420', hairStyle: 'buzz', outfit: 'tee', shirt: '#E0A23C', bottoms: 'pants', shorts: '#3A4A3A', build: 'regular' };
  globalThis.CAST = Object.assign(globalThis.CAST || {}, { farmer: FARMER, farmer2: FARMER2, farmer3: FARMER3 });
  const mountains = (ctx, t, cam = 0) => {
    P.sky(ctx, '#F7D9C9', '#F4EDE0');
    const layer = (y, amp, fill, seed, par) => { const pts = []; for (let x = -400; x <= W + 400; x += 80) pts.push([x - cam * par, y - Math.abs(Math.sin(x * 0.0042 + seed)) * amp - Math.sin(x * 0.011 + seed * 2) * amp * 0.25]); pts.push([W + 400, H + 400], [-400, H + 400]); G.shape(ctx, pts, { fill, seed, hatch: { color: 'rgba(0,0,0,0.12)', gap: 9 } }); };
    layer(560, 300, '#B9A3C9', 21, 0.2); layer(700, 240, '#8E86B5', 22, 0.4); layer(820, 160, '#6F9A7A', 23, 0.7);
  };
  const orchard = (ctx, t, o = {}) => { const n = o.n || 7; for (let i = 0; i < n; i++) { const x = 140 + i * (1640 / (n - 1)), y = 960 + (i % 2) * 40; P.tree(ctx, x, y, o.s || 0.9, { seed: 30 + i, bloom: o.bloom === undefined ? 1 : clamp(o.bloom * n - i), n: 22, crown: '#7DB56E' }); } };
  const ladder = (ctx, x, y, h = 330) => { G.line(ctx, [[x - 50, y], [x - 10, y - h]], { color: '#8E6444', lw: 9, seed: 1 }); G.line(ctx, [[x + 50, y], [x + 10, y - h]], { color: '#8E6444', lw: 9, seed: 2 }); for (let i = 1; i < 6; i++) { const yy = y - i * h / 6, w = 50 - i * 40 / 6; G.line(ctx, [[x - w, yy], [x + w, yy]], { color: '#8E6444', lw: 7, seed: 3 + i }); } };

  P.cardShot('c3', 3, 'The human bees', (ctx, t) => { mountains(ctx, t); orchard(ctx, t); });

  // S1 — map: China, Sichuan, Maoxian
  const MAP = { region: [72, 16, 136, 54], x: 160, y: 90, w: 1600, h: 900 };
  P.shot(ev.c3_s1, (ctx, t, s) => {
    P.paperBg(ctx, '#DCEBF0');
    const m = Data.map(MAP);
    Data.drawMap(ctx, m, { highlight: { China: '#F2C9A0' }, land: '#EFE6D2', sea: '#DCEBF0', t, t0: ev.c3_s1, dur: 1.2, stroke: C.ink, lw: 2.5 });
    const [px, py] = m.proj(103.85, 31.68);
    const k = P.pop(t, ev.c3_china); if (k > 0) P.at(ctx, m.proj(96, 40)[0], m.proj(96, 40)[1], k, -0.05, () => G.text(ctx, 'CHINA', 0, 0, { size: 80, fam: FT.title, weight: 400, color: C.coral, align: 'center' }));
    Data.pin(ctx, px, py, { t, at: ev.c3_pin, color: C.red, size: 40, label: 'Maoxian, Sichuan', labelSide: 'right', labelSize: 44 });
    if (t > ev.c3_pin) { const r = 30 + ((t - ev.c3_pin) * 60) % 90; ctx.strokeStyle = `rgba(217,70,59,${1 - r / 120})`; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(px, py, r, 0, 7); ctx.stroke(); }
  }, { in: 'cut', cam: (s) => { const m = Data.map(MAP); const [px, py] = m.proj(103.85, 31.68); const z = U.lerp(1, 1.9, ease.inCubic(clamp((s.t - (s.t1 - 1.2)) / 1.2))); return { zoom: z * U.lerp(1, 1.06, s.u), x: (px - W / 2) * (z - 1) / z, y: (py - H / 2) * (z - 1) / z }; } });

  // S2 — the valley in bloom, but no insects
  P.shot(ev.c3_s2, (ctx, t, s) => {
    mountains(ctx, t, (t - ev.c3_s2) * 30);
    for (let i = 0; i < 5; i++) { const x = 220 + i * 370, y = 980 + (i % 2) * 30; P.tree(ctx, x, y, 1.05, { seed: 40 + i, bloom: P.fin(t, ev.c3_blooms[i], 0.5), n: 26, crown: '#7DB56E' }); }
    const u = clamp((t - (ev.c3_insects - 1.6)) / 2.4);
    if (u > 0 && u < 1) Ch.bee(ctx, { x: lerp(-100, W + 150, u), y: 330 + Math.sin(u * 12) * 40, s: 0.55, t, eyes: 'worried' });
    P.note(ctx, 'not enough insects', 1400, 260, t, ev.c3_insects, 1e9, { size: 60, seed: 4, rot: 0.03 });
    P.note(ctx, 'Maoxian County', 330, 200, t, ev.c3_s2 + 0.3, 1e9, { size: 56, seed: 5, fill: C.gold, rot: -0.04 });
  }, { in: { type: 'fade', dur: 0.5 }, cam: Shots.push(1.0, 1.05) });

  // S3 — sprays + shrinking forest
  P.shot(ev.c3_s3, (ctx, t, s) => {
    mountains(ctx, t);
    // hillside forest tiles → farmland tiles
    for (let i = 0; i < 14; i++) { const x = 900 + (i % 7) * 140, y = 560 + Math.floor(i / 7) * 120; const tf = lerp(ev.c3_farm0, ev.c3_farm + 0.4, i / 13); const f = clamp((t - tf) / 0.3);
      if (f < 1) P.at(ctx, x, y, 1 - f, 0, () => { G.poly(ctx, [[0, -80], [45, 20], [-45, 20]], { fill: '#3E7F45', seed: 60 + i, lw: 3.5 }); G.line(ctx, [[0, 20], [0, 40]], { color: C.brown, lw: 6, seed: 61 + i }); });
      if (f > 0) P.at(ctx, x, y, f, 0, () => G.rrect(ctx, -62, -20, 124, 60, 4, { fill: i % 2 ? '#E3C27A' : '#C9A15E', seed: 90 + i, lw: 3.5, hatch: { color: 'rgba(0,0,0,0.14)', gap: 7, angle: 0 } })); }
    // farmer with sprayer
    const sp = ev.c3_sprays; const last = sp.filter((x) => x <= t).length;
    Ch.person(ctx, { x: 420, y: 1000, pose: 'stand', s: 0.95, style: FARMER, handR: [130, -200], handL: [-60, -150], eyes: 'normal', mouth: 'flat' });
    G.rrect(ctx, 330, 700, 80, 120, 14, { fill: '#C9C9C0', seed: 70, lw: 4 });
    G.line(ctx, [[540, 810], [640, 760]], { color: C.ink, lw: 6, seed: 71 });
    sp.forEach((ts, i) => { const a = t - ts; if (a < 0 || a > 1.4) return; const k = a / 1.4; ctx.globalAlpha = 0.55 * (1 - k); for (let j = 0; j < 5; j++) { ctx.fillStyle = '#D6E8C8'; ctx.beginPath(); ctx.arc(650 + k * 300 + j * 30, 760 - k * 120 + Math.sin(j + i) * 30, 30 + k * 60, 0, 7); ctx.fill(); } ctx.globalAlpha = 1; });
    P.counter(ctx, { x: 640, y: 230, from: 0, to: Math.min(10, Math.max(1, last)), t, t0: ev.c3_spr0 - 0.01, t1: ev.c3_spr0, size: 120, color: C.red, suffix: '×', sub: '8–10 sprays a season', subSize: 42, alpha: last ? 1 : 0 });
    P.stamp(ctx, '× 4 DECADES', 1300, 250, t, ev.c3_decades, { size: 80, color: C.navy, rot: 0.06 });
    P.note(ctx, 'forest → farmland', 1350, 860, t, ev.c3_farm, 1e9, { size: 56, seed: 8 });
  }, { in: { type: 'push', dir: 'left' }, cam: Shots.push(1.0, 1.04) });

  // S4 — late 1980s: people take over
  P.shot(ev.c3_s4, (ctx, t, s) => {
    mountains(ctx, t); orchard(ctx, t, { s: 0.8 });
    P.stamp(ctx, 'LATE 1980s', W / 2, 220, t, ev.c3_80s, { size: 110, color: C.navy, rot: -0.04 });
    [[FARMER, 0], [FARMER2, 0.35], [FARMER3, 0.7]].forEach(([st, d], i) => { const wk = Ch.walk(t, { x0: -220 - i * 260, speed: 300, t0: ev.c3_people - 0.6 + d * 0.3, s: 0.8 });
      const x = Math.min(wk.x, 560 + i * 380); const walking = wk.x < 560 + i * 380;
      if (i === 1) ladder(ctx, x + 70, 1010, 260);
      Ch.person(ctx, { x, y: 1010, pose: walking ? 'walk' : 'stand', walk: wk.walk, s: 0.8, style: st, eyes: walking ? 'normal' : 'happy', mouth: walking ? 'flat' : 'smile', gesture: !walking && i === 0 ? 'thumbsUp' : undefined }); });
  }, { in: { type: 'paper' }, cam: Shots.push(1.0, 1.04) });

  // S5 — collect flowers → pollen stock → climb and dab, flower by flower
  P.shot(ev.c3_s5, (ctx, t, s) => {
    mountains(ctx, t);
    const zoom = clamp((t - ev.c3_climb) / 0.8);
    // step cards
    const steps = [['collect flowers', ev.c3_collect, '#FBE3EA'], ['pollen stock', ev.c3_stock, '#FFF1C9'], ['dab, one by one', ev.c3_climb, '#E3F1DA']];
    steps.forEach(([txt, t0, fill], i) => P.note(ctx, `${i + 1}. ${txt}`, 330 + i * 600, 140, t, t0, 1e9, { size: 54, fill, seed: 20 + i, rot: (i - 1) * 0.03 }));
    // basket + jar
    const kb = P.pop(t, ev.c3_collect); if (kb > 0) P.at(ctx, 330, 430, kb, 0, () => { G.poly(ctx, [[-110, 0], [110, 0], [80, 120], [-80, 120]], { fill: '#C9955E', seed: 3, lw: 4, hatch: { color: 'rgba(90,50,20,0.35)', gap: 6, angle: 0.8 } }); for (let i = 0; i < 6; i++) { ctx.fillStyle = C.blossom; ctx.beginPath(); ctx.arc(-80 + i * 32, -8 - (i % 2) * 14, 20, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(160,60,90,0.6)'; ctx.lineWidth = 3; ctx.stroke(); } });
    const kj = P.pop(t, ev.c3_stock); if (kj > 0) P.at(ctx, 930, 430, kj, 0, () => { G.rrect(ctx, -60, -70, 120, 170, 18, { fill: 'rgba(230,240,250,0.9)', seed: 4, lw: 4 }); G.rrect(ctx, -56, 0, 112, 96, 12, { fill: '#FFC93C', seed: 5, lw: 3 }); G.rrect(ctx, -66, -90, 132, 30, 6, { fill: C.coral, seed: 6, lw: 4 }); });
    // tree + ladder + farmer dabbing
    const tx = 1460; P.tree(ctx, tx, 1010, 1.25, { seed: 77, n: 30, crown: '#7DB56E' });
    ladder(ctx, tx - 160, 1010, 330);
    const dabs = ev.c3_dabs; const di = dabs.filter((x) => x <= t).length; const ph = di ? clamp((t - dabs[di - 1]) / 0.3) : 0;
    const targets = [[1380, 690], [1460, 650], [1540, 700], [1410, 740], [1500, 760], [1600, 660], [1330, 660], [1560, 740]];
    const tgt = targets[Math.min(7, Math.max(0, di - 1))] || targets[0];
    const climb = clamp((t - ev.c3_climb) / 0.8);
    const py = lerp(1010, 830, ease.inOutQuad(climb));
    const hx = tgt[0] - (tx - 260) + Math.sin(ph * Math.PI) * 10, hy = tgt[1] - py - Math.sin(ph * Math.PI) * 14;
    Ch.person(ctx, { x: tx - 260, y: py, pose: 'stand', s: 0.85, style: FARMER2, handR: climb > 0.9 ? [hx / 0.85, hy / 0.85] : undefined, eyes: 'focus' === 'x' ? 'normal' : 'normal', mouth: 'flat', look: 1 });
    if (climb > 0.9) { const ex = tgt[0] + Math.sin(ph * Math.PI) * 10, ey = tgt[1] - Math.sin(ph * Math.PI) * 14; G.line(ctx, [[ex - 30, ey + 30], [ex, ey]], { color: '#8E6444', lw: 6, seed: 9 }); G.ellipse(ctx, ex, ey, 9, 9, { fill: '#FFC93C', seed: 10, lw: 2.5 }); }
    dabs.forEach((ts, i) => { P.sparkle(ctx, targets[i][0], targets[i][1], t, ts, { n: 9, r: 50, seed: i }); if (t > ts) { ctx.fillStyle = '#FFC93C'; ctx.beginPath(); ctx.arc(targets[i][0], targets[i][1], 6, 0, 7); ctx.fill(); } });
    if (di > 0) P.counter(ctx, { x: 1760, y: 380, from: di, to: di, t, t0: dabs[0], t1: dabs[0] + 0.01, size: 80, color: C.greenD, sub: 'flowers', subSize: 36 });
  }, { in: { type: 'push', dir: 'left' }, cam: (s) => Shots.push(1.0, 1.0)(s) });

  // S6 — 2001 survey: 100% by hand
  P.shot(ev.c3_s6, (ctx, t, s) => {
    mountains(ctx, t); orchard(ctx, t, { s: 0.85 });
    for (let i = 0; i < 6; i++) { const x = 250 + i * 290; Ch.person(ctx, { x, y: 1060, pose: 'stand', s: 0.5, style: [FARMER, FARMER2, FARMER3][i % 3], gesture: 'pointUp', eyes: 'normal', mouth: 'flat' }); }
    P.note(ctx, '2001 survey', 380, 190, t, ev.c3_2001, 1e9, { size: 60, seed: 6, fill: C.gold, rot: -0.04 });
    P.stamp(ctx, '100% BY HAND', W / 2 + 60, 420, t, ev.c3_100, { size: 140, color: C.red, rot: -0.08 });
  }, { in: { type: 'fade', dur: 0.4 }, cam: (s) => Shots.combine(Shots.push(1.02, 1.07), Shots.shake(18, ev.c3_100 - s.t0, 7))(s) });

  // S7 — five days
  P.shot(ev.c3_s7, (ctx, t, s) => {
    P.paperBg(ctx, '#F3E7D2');
    // clock
    const ck = P.pop(t, ev.c3_clock); P.at(ctx, 360, 420, ck, 0, () => { G.ellipse(ctx, 0, 0, 170, 170, { fill: '#FFFFFF', seed: 3, lw: 7 }); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; G.line(ctx, [[Math.cos(a) * 140, Math.sin(a) * 140], [Math.cos(a) * 158, Math.sin(a) * 158]], { color: C.ink, lw: 5, seed: i }); }
      const a = (t - ev.c3_s7) * 4; G.line(ctx, [[0, 0], [Math.cos(a - 1.57) * 120, Math.sin(a - 1.57) * 120]], { color: C.red, lw: 8, seed: 20 }); G.line(ctx, [[0, 0], [Math.cos(a / 12 - 1.57) * 80, Math.sin(a / 12 - 1.57) * 80]], { color: C.ink, lw: 10, seed: 21 }); });
    // five day cards, each a branch with blossoms that ages
    ev.c3_days.forEach((td, i) => { const k = P.pop(t, td, 0.3); if (k <= 0) return; const x = 760 + i * 230, y = 520;
      P.at(ctx, x, y, k, (i - 2) * 0.03, () => { G.tornPaper(ctx, -100, -170, 200, 340, { fill: '#FFF8E8', seed: 30 + i });
        G.text(ctx, 'DAY ' + (i + 1), 0, -120, { size: 40, fam: FT.title, weight: 400, color: i === 4 ? C.red : C.navy, align: 'center' });
        G.line(ctx, [[-70, 90], [60, -30]], { color: C.brown, lw: 9, seed: 40 + i });
        for (let j = 0; j < 3; j++) { const bx = -40 + j * 40, by = 60 - j * 35; const wilt = i / 4; ctx.fillStyle = P.mix('#FBE3EA', '#C9B9A8', wilt); ctx.beginPath(); ctx.arc(bx, by + wilt * 10, 22 - wilt * 8, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(120,60,80,0.6)'; ctx.lineWidth = 3; ctx.stroke(); } }); });
    P.note(ctx, '~5 days to pollinate each flower', 1220, 900, t, ev.c3_days[4] + 0.3, 1e9, { size: 56, fill: C.gold, seed: 9 });
  }, { in: { type: 'wipe', dir: 'left' }, cam: Shots.push(1.0, 1.04) });

  // S8 — one person: 5–10 trees a day
  P.shot(ev.c3_s8, (ctx, t, s) => {
    mountains(ctx, t);
    Ch.person(ctx, { x: 230, y: 1010, pose: 'stand', s: 0.9, style: FARMER, gesture: 'point', eyes: 'normal', mouth: 'smile' });
    for (let i = 0; i < 10; i++) { const k = P.pop(t, ev.c3_trees[i], 0.35); const x = 520 + i * 145, y = 960; P.tree(ctx, x, y, 0.55, { seed: 100 + i, n: 18, bloom: 1, crown: k > 0 ? '#7DB56E' : '#B5B0A2', blossom: k > 0 ? C.blossom : '#DDD6C8' }); if (k > 0) P.at(ctx, x, y - 230, k, 0, () => { G.ellipse(ctx, 0, 0, 24, 24, { fill: C.green, seed: 120 + i, lw: 3 }); G.line(ctx, [[-10, 0], [-2, 9], [12, -9]], { color: '#FFF', lw: 5, seed: 130 + i }); }); }
    P.counter(ctx, { x: 1180, y: 250, from: 0, to: 10, t, t0: ev.c3_trees[0], t1: ev.c3_trees[9], size: 130, prefix: '5–', suffix: '', color: C.navy, sub: 'trees per person, per day', subSize: 44 });
  }, { in: { type: 'push', dir: 'left' }, cam: Shots.push(1.0, 1.04) });

  // S9 — workers leave; cost ×10
  P.shot(ev.c3_s9, (ctx, t, s) => {
    P.paperBg(ctx, '#F3E7D2');
    // city skyline right
    for (let i = 0; i < 7; i++) { const x = 1380 + i * 80, h = 160 + U.hash(i, 3) * 260; G.rrect(ctx, x, 700 - h, 70, h, 3, { fill: ['#9AA6C9', '#B7BED8', '#8E99BF'][i % 3], seed: 200 + i, lw: 3.5 }); for (let j = 0; j < h / 50 - 1; j++) { ctx.fillStyle = '#FFF1C9'; ctx.fillRect(x + 14, 700 - h + 20 + j * 46, 14, 20); ctx.fillRect(x + 42, 700 - h + 20 + j * 46, 14, 20); } }
    G.line(ctx, [[0, 700], [W, 700]], { color: C.ink, lw: 5, seed: 3 });
    for (let i = 0; i < 4; i++) { const wk = Ch.walk(t, { x0: 200 + i * 150, speed: 260, t0: ev.c3_city - 1.5 + i * 0.2, s: 0.5 }); if (wk.x < 1480) Ch.person(ctx, { x: wk.x, y: 700, pose: 'walk', walk: wk.walk, s: 0.5, style: [FARMER, FARMER2, FARMER3, FARMER][i] }); }
    P.note(ctx, 'to the cities', 1580, 300, t, ev.c3_city, 1e9, { size: 54, seed: 5 });
    // cost bars
    P.hbar(ctx, { x: 260, y: 820, w: 1300, h: 70, frac: 2 / 19, t, t0: ev.c3_ten - 0.8, color: '#9BC48A', label: '2000', value: '$2 / day', seed: 11 });
    P.hbar(ctx, { x: 260, y: 960, w: 1300, h: 70, frac: 1, t, t0: ev.c3_cost0, d: 1.0, color: C.coral, label: 'later', value: '', seed: 12 });
    P.counter(ctx, { x: 1640, y: 1000, from: 2, to: 19, t, t0: ev.c3_cost0, t1: ev.c3_cost, size: 64, prefix: '$12–', suffix: '', color: C.red, card: null });
    P.stamp(ctx, '×10', 900, 420, t, ev.c3_ten, { size: 150, color: C.red, rot: -0.1 });
  }, { in: { type: 'paper' }, cam: Shots.push(1.0, 1.04) });

  // S10 — swap crops; S11 prices
  P.shot(ev.c3_s10, (ctx, t, s) => {
    mountains(ctx, t);
    const sw = ev.c3_swap;
    for (let i = 0; i < 6; i++) { const x = 260 + i * 280, y = 980; const tgt = sw[i % 3] + Math.floor(i / 3) * 0.12; const f = clamp((t - tgt) / 0.3);
      P.tree(ctx, x, y, 0.75, { seed: 140 + i, n: 0, crown: f < 0.5 ? '#7DB56E' : ['#6D9E5C', '#8DBE6C', '#5E8F4A'][i % 3] });
      const kind = f < 0.5 ? 'apple' : ['plum', 'loquat', 'walnut'][i % 3]; const sc = f < 0.5 ? 1 - f * 2 : (f - 0.5) * 2;
      for (let j = 0; j < 3; j++) P.food(ctx, kind, x - 70 + j * 70, y - 200 + (j % 2) * 40, 0.42 * Math.max(0.05, t < ev.c3_giveup ? 1 : sc), { seed: i * 3 + j, grey: f < 0.5 && t > ev.c3_giveup ? clamp((t - ev.c3_giveup) / 0.6) * 0.7 : 0 }); }
    ['plums', 'loquats', 'walnuts'].forEach((w, i) => P.note(ctx, w, 540 + i * 420, 220, t, sw[i] + 0.1, 1e9, { size: 60, seed: 50 + i, fill: ['#E9D8F0', '#FFE7C4', '#EFE1CF'][i], rot: (i - 1) * 0.04 }));
  }, { in: { type: 'push', dir: 'up' }, cam: Shots.push(1.0, 1.04) });
  P.shot(ev.c3_s11, (ctx, t, s) => {
    P.paperBg(ctx, '#F3E7D2');
    G.text(ctx, 'farm-gate price, per kilo', W / 2, 200, { size: 60, fam: FT.hand, color: C.ink, align: 'center', alpha: P.fin(t, ev.c3_s11, 0.4) });
    P.food(ctx, 'apple', 300, 470, 1.3); P.food(ctx, 'plum', 300, 770, 1.3);
    P.hbar(ctx, { x: 460, y: 430, w: 1200, h: 90, frac: 0.19 / 2.5, t, t0: ev.c3_pa - 0.3, color: '#D9463B', value: '< $0.20', seed: 21 });
    P.hbar(ctx, { x: 460, y: 730, w: 1200, h: 90, frac: 2 / 2.5, t, t0: ev.c3_pp - 0.3, d: 1.0, color: '#7A3D8C', value: '≈ $2', seed: 22 });
    P.note(ctx, '≈ 10× more', 1300, 960, t, ev.c3_pp + 0.8, 1e9, { size: 60, fill: C.gold, seed: 23 });
  }, { in: { type: 'wipe', dir: 'left' }, cam: Shots.push(1.0, 1.04) });

  // S12 — the verdict
  P.shot(ev.c3_s12, (ctx, t, s) => {
    mountains(ctx, t); orchard(ctx, t, { s: 0.7, n: 6 });
    ladder(ctx, 900, 1040, 300);
    Ch.person(ctx, { x: 900, y: 860, pose: 'sit', s: 0.85, style: FARMER, sweat: 1, eyes: 'closed', mouth: 'wavy', handR: [40, -250] });
    Ch.bee(ctx, { x: 1200 + Math.sin(t * 2) * 20, y: 520, s: 0.8, t, facing: -1, eyes: 'worried', mouth: P.talk(t) });
    ['SLOWLY', 'EXPENSIVELY', 'NOT FOR LONG'].forEach((w, i) => P.stamp(ctx, w, 360 + i * 600, 200 + (i % 2) * 70, t, ev.c3_w[i], { size: 72, color: [C.navy, C.red, C.coral][i], rot: (i - 1) * 0.06 }));
  }, { in: { type: 'fade', dur: 0.4 }, cam: Shots.push(1.0, 1.06) });
})();
