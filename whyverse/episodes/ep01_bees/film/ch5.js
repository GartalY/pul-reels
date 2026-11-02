// Chapter 5 — the health bill.
(function () {
  const { U, G, Ch, P, SCORE: S, Shots, Data } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const bg = (ctx) => P.paperBg(ctx, '#EDE6DA');
  const plate = (ctx, x, y, r, items, grey = 0) => { G.ellipse(ctx, x, y, r, r * 0.9, { fill: '#FFFFFF', seed: x | 0, lw: 5 }); G.ellipse(ctx, x, y, r * 0.76, r * 0.68, { fill: '#F7F3EA', seed: (x | 0) + 1, lw: 3, stroke: 'rgba(42,35,32,0.3)' });
    items.forEach((it, i) => { const a = (i / items.length) * 6.283 + 0.3; P.food(ctx, it, x + Math.cos(a) * r * 0.42, y + Math.sin(a) * r * 0.36, r / 280, { grey, seed: i }); }); };
  const heart = (ctx, x, y, s, o = {}) => P.at(ctx, x, y, s, 0, () => { const pts = []; for (let i = 0; i < 40; i++) { const a = i / 40 * 6.283; pts.push([16 * Math.pow(Math.sin(a), 3) * 6, -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) * 6]); } G.shape(ctx, pts, { fill: o.fill || '#E0506A', seed: 5, lw: 5, hatch: { color: 'rgba(120,20,40,0.2)', gap: 8 } });
    if (o.crack) G.line(ctx, [[0, -40], [-14, 0], [10, 20], [-4, 60]], { color: C.ink, lw: 6, seed: 6 }); });

  P.cardShot('c5', 5, 'The health bill', (ctx, t) => { bg(ctx); plate(ctx, W / 2, 760, 260, ['apple', 'carrot', 'blueberry', 'almond', 'pumpkin', 'cherry']); });

  // S1 — not money: health
  P.shot(ev.c5_s1, (ctx, t, s) => {
    bg(ctx);
    const km = P.pop(t, ev.c5_s1 + 0.3); if (km > 0) P.at(ctx, 600, 540, km, 0, () => { G.ellipse(ctx, 0, 0, 170, 130, { fill: '#F2A0B5', seed: 3, lw: 5 }); G.ellipse(ctx, 150, -10, 40, 34, { fill: '#F2A0B5', seed: 4, lw: 4 }); G.rrect(ctx, -30, -140, 60, 14, 4, { fill: C.ink, seed: 5 });
      for (const lx of [-90, 70]) G.rrect(ctx, lx, 100, 34, 60, 8, { fill: '#F2A0B5', seed: 6 + lx, lw: 4 }); G.text(ctx, '$', 0, 40, { size: 120, fam: FT.title, weight: 400, color: '#B5506A', align: 'center' }); });
    const kx = clamp((t - ev.c5_money) / 0.25); if (kx > 0) { G.line(ctx, [[400, 340], [400 + 400 * kx, 340 + 400 * kx]], { color: C.red, lw: 16, seed: 7 }); G.line(ctx, [[800, 340], [800 - 400 * kx, 340 + 400 * kx]], { color: C.red, lw: 16, seed: 8 }); }
    const kh = P.pop(t, ev.c5_health, 0.5); if (kh > 0) heart(ctx, 1320, 540, kh * (1 + 0.05 * Math.sin(t * 7)));
    P.note(ctx, 'money', 600, 860, t, ev.c5_s1 + 0.4, 1e9, { size: 56, seed: 9 }); P.note(ctx, 'health', 1320, 860, t, ev.c5_health + 0.1, 1e9, { size: 56, seed: 10, fill: '#FBE3EA' });
  }, { in: 'cut', cam: Shots.push(1.0, 1.05) });

  // S2 — the 2015 model: every animal pollinator gone
  const POLL = ['bee', 'butterfly', 'bird', 'bat', 'beetle', 'moth'];
  P.icon = (ctx, kind, x, y, s, t, seed = 1) => P.at(ctx, x, y, s, 0, () => {
    const flap = Math.sin(t * 14 + seed) ;
    if (kind === 'bee') Ch.bee(ctx, { x: 0, y: 0, s: 0.5, t, seed });
    else if (kind === 'butterfly' || kind === 'moth') { const col = kind === 'moth' ? '#BBA98E' : '#E8718D'; for (const sx of [-1, 1]) { ctx.save(); ctx.scale(sx * (0.6 + 0.4 * Math.abs(flap)), 1); G.ellipse(ctx, 34, -18, 36, 30, { fill: col, seed: seed + 1, lw: 3.5 }); G.ellipse(ctx, 26, 22, 24, 20, { fill: P.mix(col, '#FFFFFF', 0.3), seed: seed + 2, lw: 3.5 }); ctx.restore(); } G.rrect(ctx, -6, -34, 12, 70, 6, { fill: C.ink, seed: seed + 3 }); }
    else if (kind === 'bird') { G.ellipse(ctx, 0, 0, 44, 30, { fill: '#3FA89B', seed: seed + 1, lw: 3.5 }); G.ellipse(ctx, 40, -16, 20, 18, { fill: '#3FA89B', seed: seed + 2, lw: 3.5 }); G.line(ctx, [[56, -16], [96, -20]], { color: C.ink, lw: 4, seed: seed + 3 }); ctx.save(); ctx.scale(1, flap); G.ellipse(ctx, -6, -24, 30, 14, { fill: '#2B8075', seed: seed + 4, lw: 3 }); ctx.restore(); ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(44, -20, 4, 0, 7); ctx.fill(); }
    else if (kind === 'bat') { for (const sx of [-1, 1]) { ctx.save(); ctx.scale(sx, 0.6 + 0.4 * Math.abs(flap)); G.poly(ctx, [[10, -10], [80, -40], [70, 0], [50, -6], [36, 16], [10, 12]], { fill: '#4A3F5E', seed: seed + 1, lw: 3.5 }); ctx.restore(); } G.ellipse(ctx, 0, 0, 20, 26, { fill: '#4A3F5E', seed: seed + 2, lw: 3.5 }); ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.arc(-7, -6, 4, 0, 7); ctx.arc(7, -6, 4, 0, 7); ctx.fill(); }
    else if (kind === 'beetle') { G.ellipse(ctx, 0, 0, 36, 44, { fill: '#5A8F3A', seed: seed + 1, lw: 3.5 }); G.line(ctx, [[0, -44], [0, 44]], { color: C.ink, lw: 3, seed: seed + 2 }); G.ellipse(ctx, 0, -50, 18, 14, { fill: C.ink, seed: seed + 3, lw: 2 }); for (let i = 0; i < 3; i++) for (const sx of [-1, 1]) G.line(ctx, [[sx * 30, -20 + i * 20], [sx * 54, -26 + i * 24]], { color: C.ink, lw: 4, seed: seed + 4 + i }); }
    else if (kind === 'fly' || kind === 'midge') { G.ellipse(ctx, 0, 0, 26, 16, { fill: '#5B5B66', seed: seed + 1, lw: 3 }); G.ellipse(ctx, 26, -2, 13, 13, { fill: '#B5453C', seed: seed + 2, lw: 3 }); ctx.save(); ctx.globalAlpha *= 0.7; for (const sx of [-1, 1]) G.ellipse(ctx, -2, -18 + 0 * sx, 24, 10 + 4 * flap, { fill: 'rgba(220,235,255,0.8)', seed: seed + 3 + sx, lw: 2.5 }); ctx.restore(); }
    else if (kind === 'hummingbird') { G.ellipse(ctx, 0, 0, 38, 18, { fill: '#3FA86B', seed: seed + 1, lw: 3.5 }); G.ellipse(ctx, 34, -10, 15, 14, { fill: '#3FA86B', seed: seed + 2, lw: 3 }); G.line(ctx, [[46, -10], [98, -4]], { color: C.ink, lw: 3, seed: seed + 3 }); ctx.save(); ctx.globalAlpha *= 0.6; G.ellipse(ctx, -6, -30, 16, 34 * (0.4 + 0.6 * Math.abs(flap)), { fill: 'rgba(220,240,255,0.8)', seed: seed + 4, lw: 2.5 }); ctx.restore(); G.ellipse(ctx, 6, 6, 12, 7, { fill: '#D9463B', seed: seed + 5, lw: 2 }); }
  });
  P.shot(ev.c5_s2, (ctx, t, s) => {
    P.nightBg(ctx, t, { stars: 120, top: '#1E2550', bottom: '#3A3570' });
    P.note(ctx, '2015 study (a model)', 360, 140, t, ev.c5_2015, 1e9, { size: 54, seed: 3, fill: C.gold, rot: -0.04 });
    P.globe(ctx, W / 2, 560, 250, t, { grey: clamp((t - ev.c5_gone[5]) / 1.5) * 0.5 });
    POLL.forEach((k, i) => { const tv = ev.c5_gone[i]; if (t > tv + 0.25) return; const a = i / POLL.length * 6.283 + t * 0.4; const x = W / 2 + Math.cos(a) * 420, y = 560 + Math.sin(a) * 300; const sc = t > tv ? 1 - (t - tv) / 0.25 : P.pop(t, ev.c5_s2 + 0.2 + i * 0.1);
      P.icon(ctx, k, x, y, 1.1 * sc, t, i * 7); P.sparkle(ctx, x, y, t, tv, { seed: i, color: '#FFF4D6' }); });
    P.stamp(ctx, 'NOT JUST BEES. ALL OF THEM.', W / 2, 960, t, ev.c5_all, { size: 66, color: C.coral, rot: -0.03 });
  }, { in: { type: 'dip', color: '#1A2045' }, cam: Shots.push(1.0, 1.05) });

  // S3 — supply drops
  P.shot(ev.c5_s3, (ctx, t, s) => {
    bg(ctx);
    G.text(ctx, 'world supply, if every animal pollinator vanished', W / 2, 150, { size: 54, fam: FT.hand, color: C.ink, align: 'center', alpha: P.fin(t, ev.c5_s3, 0.4) });
    const bars = [['fruit', 22.9, '−23%', '#D9463B', 'apple'], ['vegetables', 16.3, '−16%', '#5DA35E', 'carrot'], ['nuts & seeds', 22.1, '−22%', '#C68A55', 'almond']];
    bars.forEach(([lab, pc, txt, col, food], i) => { const x = 420 + i * 540, base = 900, h0 = 560; const d = ease.outBounce(clamp((t - ev.c5_drop[i]) / 0.8)); const h = h0 * (1 - pc / 100 * d);
      G.rrect(ctx, x - 120, base - h0, 240, h0, 10, { fill: 'rgba(42,35,32,0.06)', seed: 10 + i, lw: 3, stroke: 'rgba(42,35,32,0.35)' });
      G.rrect(ctx, x - 120, base - h, 240, h, 10, { fill: col, seed: 20 + i, lw: 5, hatch: { color: 'rgba(0,0,0,0.15)', gap: 9 } });
      P.food(ctx, food, x, base - h - 70, 1.0);
      G.text(ctx, lab, x, base + 70, { size: 52, fam: FT.label, weight: 400, color: C.ink, align: 'center' });
      if (d > 0) P.note(ctx, txt, x + 150, base - h0 + 40, t, ev.c5_drop[i] + 0.2, 1e9, { size: 64, fill: '#FFE5DE', color: C.red, seed: 30 + i, fam: FT.title }); });
  }, { in: { type: 'paper' }, cam: Shots.push(1.0, 1.03) });

  // S4 — 71M + 173M people (1 token = 1 million)
  const grid = (ctx, n, x0, y0, cols, col, t0, t1, t) => { const shown = Math.round(Data.count(t, t0, t1, 0, n, ease.outCubic)); for (let i = 0; i < shown; i++) P.token(ctx, x0 + (i % cols) * 34, y0 + Math.floor(i / cols) * 46, 0.42, { color: col, seed: i }); };
  P.shot(ev.c5_s4, (ctx, t, s) => {
    bg(ctx);
    grid(ctx, 71, 180, 360, 12, C.gold, ev.c5_71a, ev.c5_71, t);
    grid(ctx, 173, 820, 360, 28, C.coral, ev.c5_173a, ev.c5_173, t);
    P.counter(ctx, { x: 380, y: 190, from: 0, to: 71, t, t0: ev.c5_71a, t1: ev.c5_71, size: 110, suffix: 'M', color: '#B5821F', sub: 'more short of vitamin A', subSize: 40 });
    P.counter(ctx, { x: 1290, y: 190, from: 0, to: 173, t, t0: ev.c5_173a, t1: ev.c5_173, size: 110, suffix: 'M', color: C.red, sub: 'more short of folate', subSize: 40 });
    G.text(ctx, '1 figure = 1 million people', W - 80, 1040, { size: 34, fam: FT.label, weight: 400, color: C.ink, align: 'right', alpha: 0.8 });
  }, { in: { type: 'push', dir: 'left' }, cam: Shots.push(1.0, 1.03) });

  // S5 — on top of 2.2 billion
  P.shot(ev.c5_s5, (ctx, t, s) => {
    bg(ctx);
    const z = lerp(1, 0.42, ease.inOutCubic(clamp((t - ev.c5_22a + 0.4) / 1.4)));
    ctx.save(); ctx.translate(W / 2, H / 2 + 60); ctx.scale(z, z); ctx.translate(-W / 2, -H / 2);
    const n = Math.round(Data.count(t, ev.c5_22a - 0.2, ev.c5_22 + 0.5, 0, 2200, ease.inCubic));
    for (let i = 0; i < Math.min(n, 2200); i++) { const c = i % 110, r = Math.floor(i / 110); const x = W / 2 + (c - 55) * 34, y = H / 2 + (r - 10) * 46; if (c > 47 && c < 62 && r > 7 && r < 13) continue; P.token(ctx, x, y, 0.42, { color: '#C9BFAE', seed: i }); }
    for (let i = 0; i < 71; i++) P.token(ctx, W / 2 + ((i % 12) - 6) * 34 + 20, H / 2 + (Math.floor(i / 12) - 2.4) * 46, 0.42, { color: C.gold, seed: i });
    ctx.restore();
    P.counter(ctx, { x: W / 2, y: 170, from: 0, to: 2.2, decimals: 1, t, t0: ev.c5_22a, t1: ev.c5_22, size: 110, suffix: ' billion', color: C.navy, sub: 'people already short of vitamin A', subSize: 40 });
  }, { in: 'cut', cam: Shots.push(1.0, 1.02) });

  // S6 — diseases
  P.shot(ev.c5_s6, (ctx, t, s) => {
    bg(ctx);
    plate(ctx, W / 2, 620, 250, ['bread', 'rice', 'pasta'], 0.2);
    const icons = [['heart disease', (x, y, k) => heart(ctx, x, y, 0.8 * k, { crack: true })], ['stroke', (x, y, k) => P.at(ctx, x, y, k, 0, () => { G.ellipse(ctx, 0, 0, 90, 70, { fill: '#F2A0B5', seed: 61, lw: 5 }); G.line(ctx, [[-50, -10], [-20, 20], [10, -20], [40, 10]], { color: '#B5506A', lw: 6, seed: 62 }); G.poly(ctx, [[10, -60], [-10, -10], [14, -10], [-6, 40]], { fill: C.gold, seed: 63, lw: 3 }); })],
      ['diabetes', (x, y, k) => P.at(ctx, x, y, k, 0, () => { G.rrect(ctx, -60, -60, 120, 120, 14, { fill: '#FFFFFF', seed: 64, lw: 5, hatch: { color: 'rgba(0,0,0,0.1)', gap: 10 } }); G.rrect(ctx, -30, -30, 60, 60, 8, { fill: '#F6F0E2', seed: 65, lw: 3 }); })],
      ['some cancers', (x, y, k) => P.at(ctx, x, y, k, 0, () => { G.ellipse(ctx, 0, 0, 80, 80, { fill: '#B79CFF', seed: 66, lw: 5 }); G.ellipse(ctx, 10, -6, 30, 26, { fill: '#7E63C9', seed: 67, lw: 4 }); })]];
    icons.forEach(([lab, f], i) => { const k = P.pop(t, ev.c5_dis[i], 0.4); if (k <= 0) return; const x = [260, 700, 1220, 1660][i], y = [300, 220, 220, 300][i]; f(x, y, k); P.note(ctx, lab, x, y + 150, t, ev.c5_dis[i] + 0.1, 1e9, { size: 44, seed: 70 + i }); });
  }, { in: { type: 'wipe', dir: 'up' }, cam: Shots.push(1.0, 1.04) });

  // S7 — 1.42 million a year, +2.7%
  P.shot(ev.c5_s7, (ctx, t, s) => {
    P.paperBg(ctx, '#E4DED3');
    P.counter(ctx, { x: W / 2, y: 330, from: 0, to: 1.4, decimals: 1, t, t0: ev.c5_14a, t1: ev.c5_14, size: 170, suffix: ' million', color: C.navyD, sub: 'extra deaths a year (estimate)', subSize: 46 });
    const k = P.fin(t, ev.c5_3pc - 0.2, 0.3);
    if (k > 0) { for (let i = 0; i < 100; i++) { const x = 360 + (i % 25) * 48, y = 640 + Math.floor(i / 25) * 66; const hl = i >= 97; P.token(ctx, x, y, 0.5, { color: hl && t > ev.c5_3pc ? C.red : '#B9B3A8', seed: i, alpha: k }); }
      P.note(ctx, '≈ +2.7% of all deaths', 1640, 760, t, ev.c5_3pc + 0.2, 1e9, { size: 50, seed: 4, fill: '#FFE5DE' }); }
  }, { in: { type: 'fade', dur: 0.5 }, cam: Shots.push(1.0, 1.04) });

  // S8 — it's a model
  P.shot(ev.c5_s8, (ctx, t, s) => {
    P.paperBg(ctx, '#2E5C8A');
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.lineWidth = 2; for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    for (const [gx, gy, r, sp] of [[560, 480, 140, 1], [770, 640, 90, -1.5], [420, 700, 70, 2]]) { ctx.save(); ctx.translate(gx, gy); ctx.rotate(t * sp * 0.8); for (let i = 0; i < 10; i++) { ctx.rotate(0.628); ctx.fillStyle = '#DCEBF7'; ctx.fillRect(-14, -r - 24, 28, 30); } ctx.restore(); G.ellipse(ctx, gx, gy, r, r, { fill: '#DCEBF7', seed: gx, lw: 4, stroke: '#FFFFFF' }); G.ellipse(ctx, gx, gy, r * 0.35, r * 0.35, { fill: '#2E5C8A', seed: gx + 1, lw: 3, stroke: '#FFFFFF' }); }
    P.stamp(ctx, 'MODEL', 560, 220, t, ev.c5_model, { size: 120, color: '#FFFFFF', rot: -0.06 });
    P.note(ctx, 'big assumptions', 1380, 300, t, ev.c5_model + 0.5, 1e9, { size: 60, seed: 5 });
    const a = ease.outCubic(clamp((t - ev.c5_dir) / 0.8)); if (a > 0) { G.line(ctx, [[1100, 520], [1100 + 500 * a, 520 + 300 * a]], { color: C.gold, lw: 18, seed: 6 }); if (a > 0.9) G.poly(ctx, [[1600, 820], [1530, 740], [1630, 730]], { fill: C.gold, seed: 7, lw: 4 }); P.note(ctx, 'but the direction is clear', 1380, 940, t, ev.c5_dir + 0.4, 1e9, { size: 54, seed: 8, fill: C.gold }); }
  }, { in: { type: 'push', dir: 'left' }, cam: Shots.push(1.0, 1.04) });

  // S9 — already today: 3–5% missing
  P.shot(ev.c5_s9, (ctx, t, s) => {
    bg(ctx);
    P.note(ctx, '2022 follow-up study: today', 520, 150, t, ev.c5_2022, 1e9, { size: 56, seed: 3, fill: C.gold, rot: -0.03 });
    const cx = 960, cy = 600, r = 330; const k = ease.outCubic(clamp((t - ev.c5_35) / 0.7));
    ctx.save(); ctx.translate(cx, cy);
    const pts = (a0, a1, rr) => { const p = [[0, 0]]; for (let i = 0; i <= 30; i++) { const a = a0 + (a1 - a0) * i / 30; p.push([Math.cos(a) * rr, Math.sin(a) * rr]); } return p; };
    const gap = 0.25 * k; // ~4% of a full turn
    G.shape(ctx, pts(-1.57 + gap, 4.71, r), { fill: '#F2C94C', seed: 10, lw: 5, hatch: { color: 'rgba(150,90,10,0.2)', gap: 9 } });
    const off = 120 * k; ctx.translate(Math.cos(-1.57 + gap / 2) * off, Math.sin(-1.57 + gap / 2) * off - 40 * k); G.shape(ctx, pts(-1.57, -1.57 + 0.25, r), { fill: '#F2C94C', seed: 11, lw: 5, alpha: 1 - 0.6 * k });
    ctx.restore();
    ['apple', 'carrot', 'almond', 'cherry', 'pumpkin', 'blueberry'].forEach((f, i) => { const a = i / 6 * 6.283 + 0.6; P.food(ctx, f, cx + Math.cos(a) * 180, cy + Math.sin(a) * 160, 0.9); });
    if (k > 0.5) P.note(ctx, '3–5% of fruit, veg & nuts lost', 1450, 300, t, ev.c5_35 + 0.4, 1e9, { size: 52, seed: 12, fill: '#FFE5DE' });
  }, { in: { type: 'paper' }, cam: Shots.push(1.0, 1.05) });

  // S10 — 427,000 a year. Now.
  P.shot(ev.c5_s10, (ctx, t, s) => {
    P.paperBg(ctx, '#E4DED3');
    P.counter(ctx, { x: W / 2, y: 430, from: 0, to: 427000, t, t0: ev.c5_427a, t1: ev.c5_427, size: 190, color: C.navyD, sub: 'excess deaths a year, linked to poor pollination today', subSize: 44 });
    P.stamp(ctx, 'NOW', W / 2, 820, t, ev.sync_now, { size: 170, color: C.red, rot: -0.08 });
  }, { in: { type: 'fade', dur: 0.4 }, cam: (s) => Shots.combine(Shots.push(1.0, 1.06), Shots.shake(20, ev.sync_now - s.t0, 7))(s) });
})();
