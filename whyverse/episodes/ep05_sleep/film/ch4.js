// Chapter 4 — The night shift: growth hormone in deep sleep · 164 volunteers and a cold virus (4.2×) · 2013 "brain wash" (+60 %) · 2024: the opposite (−30 %) → under debate · flies, mice and the gut.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const fly = (ctx, x, y, r, t) => { for (const sx of [-1, 1]) P.ell(ctx, x + sx * r * 0.5, y - r * 0.5, r * 0.6, r * 0.28, '#CFE3F5', { fillA: 0.7, rot: sx * (0.5 + 0.3 * Math.sin(t * 60)), edge: 0.3 }); P.ell(ctx, x, y, r * 0.42, r * 0.62, '#4A4E6E', { seed: 2 }); P.ell(ctx, x, y - r * 0.6, r * 0.3, r * 0.26, '#4A4E6E', { seed: 3 }); P.dot(ctx, x - r * 0.16, y - r * 0.66, r * 0.11, C.red); P.dot(ctx, x + r * 0.16, y - r * 0.66, r * 0.11, C.red); };

  P.cardShot('c4', 4, 'The night shift', (ctx, t) => {
    [C.mint, C.gold, C.pink].forEach((c, i) => Ch.nod(ctx, { x: 1300 + i * 190, y: 990 - Math.abs(Math.sin(t * 5 + i)) * 12, s: 0.6, t, color: c, gesture: 'hold', eyes: 'happy', a: 0.75, seed: 4 + i }));
  });

  // S1 — start with the body: in deep sleep it releases a large share of the day's growth hormone — build and repair
  P.shot(ev.c4_s1, (ctx, t, s) => {
    P.night(ctx, t, { seed: 30, stars: 0.5 }); P.moon(ctx, 1700, 170, 70);
    ctx.save(); P.push(ctx, s.u, 800, 800, 0.03);
    const head = P.bed(ctx, 800, 1040, 1.75, { t, blanket: C.peri });
    P.zzz(ctx, head.x + 120, head.y - 130, t, { color: C.cream, size: 56 });
    // growth hormone droplets leave the head and travel along the body
    if (t > ev.c4_gh) for (let i = 0; i < 12; i++) { const ph = (t - ev.c4_gh) * 0.4 - i * 0.07; if (ph < 0) continue; const u = ph % 1; const x = lerp(head.x + 40, head.x + 820, u), y = head.y - 150 - Math.sin(u * Math.PI) * 120 + Math.sin(u * 9 + i) * 14; P.drop(ctx, x, y, 17, C.mint, Math.sin(u * Math.PI)); }
    // the night shift: little workers on the blanket
    const kb = P.pop(t, ev.c4_build, 0.4), kr = P.pop(t, ev.c4_repair, 0.4);
    if (kb > 0) { const up = Math.sin(t * 9) > 0; Ch.nod(ctx, { x: 900, y: 760, s: 0.5 * kb, t, color: C.gold, gesture: up ? 'pointUp' : 'point', eyes: 'happy', shadow: false, seed: 6 });
      const n = Math.min(6, Math.floor((t - ev.c4_build) * 3)); for (let i = 0; i < n; i++) P.rect(ctx, 1000 + (i % 3) * 62 + (Math.floor(i / 3) % 2) * 30, 735 - Math.floor(i / 3) * 40, 58, 36, 6, C.coral, { seed: 40 + i }); }
    if (kr > 0) { Ch.nod(ctx, { x: 1240, y: 800, s: 0.5 * kr, t, color: C.mint, gesture: 'wave', eyes: 'happy', shadow: false, seed: 9, flip: true }); P.ring(ctx, 1240, 740, t, ev.c4_repair, { r: 160, color: C.mint }); }
    ctx.restore();
    P.tag(ctx, 'growth hormone', 1010, 330, t, ev.c4_gh, 1e9, { size: 60, border: C.mint, fam: FT.title });
    P.tag(ctx, 'released mostly in early, deep sleep', 1010, 440, t, ev.c4_gh + 0.5, 1e9, { size: 42, border: '#6F8BF0' });
    P.stamp(ctx, 'BUILD + REPAIR', 560, 200, t, ev.c4_repair, { size: 88, color: C.coral, rot: -0.04 });
    P.write(ctx, 'start with the body.', 400, 170, t, ev.c4_s1 + 0.3, { size: 76, color: C.cream, t1: ev.c4_repair, dur: 0.6 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — the immune system: 164 volunteers get a cold virus; < 6 h of sleep → about 4 times more likely to get sick than > 7 h
  P.shot(ev.c4_s2, (ctx, t, s) => {
    P.paper(ctx, t, { tint: C.mint });
    const n = Math.round(Data.count(t, ev.c4_164a, ev.c4_164, 0, 164, ease.outCubic));
    for (let i = 0; i < n; i++) { const cx = 190 + (i % 41) * 38.5, cy = 230 + Math.floor(i / 41) * 52; const sick = t > ev.c4_virus + 0.3 + U.hash(i, 3) * 0.6 && U.hash(i, 7) < 0.32;
      P.dot(ctx, cx, cy + 16, 15, sick ? C.coral : C.sky, 0.9); P.dot(ctx, cx, cy - 6, 11, C.skin); }
    P.counter(ctx, { x: 960, y: 550, from: 0, to: 164, t, t0: ev.c4_164a, t1: ev.c4_164, size: 100, sub: 'volunteers', subSize: 36, color: C.navy, tEnd: ev.c4_six - 0.2 });
    if (t > ev.c4_virus) for (let i = 0; i < 30; i++) { const u = clamp((t - ev.c4_virus - U.hash(i, 1) * 0.4) / 0.7); if (u <= 0 || u >= 1) continue; P.drop(ctx, 200 + U.hash(i, 2) * 1520, lerp(120, 420, u), 9, C.coral, 1 - u * 0.5); }
    P.tag(ctx, 'the immune system', 380, 120, t, ev.c4_immune, 1e9, { size: 52, border: C.mint, fam: FT.title });
    P.tag(ctx, 'each one given a cold virus', 1400, 120, t, ev.c4_virus, 1e9, { size: 46, border: C.coral });
    // two bars: risk of catching the cold
    const base = 990, unit = 96;
    const k6 = P.eio((t - ev.c4_six) / (ev.c4_four - ev.c4_six + 0.2)), k7 = P.eio((t - ev.c4_seven) / 0.6);
    if (t > ev.c4_six - 0.3) { const a = P.fin(t, ev.c4_six - 0.3, 0.3); ctx.save(); ctx.globalAlpha *= a; P.line(ctx, 330, base, 1590, base, C.ink, 5, 0.7);
      P.label(ctx, 'slept less than 6 hours', 640, base + 58, { align: 'center', size: 42, color: C.ink }); P.label(ctx, 'slept more than 7 hours', 1280, base + 58, { align: 'center', size: 42, color: C.ink }); ctx.restore(); }
    if (k6 > 0) { const h = unit * 4.2 * k6; P.wash(ctx, P.pRR(530, base - h, 220, h, 18), C.coral, { bb: [640, base - h / 2, 220], seed: 5 }); G.text(ctx, (1 + 3.2 * k6).toFixed(1) + '×', 640, base - h - 20, { size: 80, fam: FT.title, weight: 700, color: C.coral, align: 'center', boil: 0 }); }
    if (k7 > 0) { const h = unit * k7; P.wash(ctx, P.pRR(1170, base - h, 220, h, 18), C.sky, { bb: [1280, base - h / 2, 220], seed: 6 }); G.text(ctx, '1×', 1280, base - h - 20, { size: 80, fam: FT.title, weight: 700, color: C.sea, align: 'center', boil: 0, alpha: k7 }); }
    P.stamp(ctx, 'ABOUT 4× MORE COLDS', 1290, 640, t, ev.c4_four, { size: 68, color: C.coral, rot: -0.04, t1: ev.c4_seven - 0.1 });
    P.label(ctx, 'Prather et al., Sleep, 2015', 1700, 1050, { align: 'right', size: 32, alpha: P.fin(t, ev.c4_six, 0.4) });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — 2013, in mice: during sleep the space between brain cells grows 60 % and fluid washes waste away
  P.shot(ev.c4_s3, (ctx, t, s) => {
    P.paper(ctx, t, { tint: C.sky });
    const open = P.eio((t - ev.c4_space) / 0.9); const sc = lerp(1, 0.84, open); const flow = t > ev.c4_fluid;
    ctx.save(); P.push(ctx, s.u, 760, 600, 0.03);
    P.rect(ctx, 200, 250, 1120, 720, 40, '#CFE3F5', { seed: 3, edge: 0.3, fillA: lerp(0.35, 0.9, open) });
    // waste specks sitting in the gaps, then carried off
    for (let i = 0; i < 26; i++) { const ch = i % 3; let x, y; const dx = flow ? (t - ev.c4_fluid) * (140 + 80 * U.hash(i, 4)) : 0;
      if (ch === 0) { x = 230 + U.hash(i, 1) * 1050 + dx; y = 610 + (U.hash(i, 2) - 0.5) * 40 * open; } else { x = (ch === 1 ? 573 : 947) + (U.hash(i, 2) - 0.5) * 34 * open; y = 280 + U.hash(i, 1) * 660 + dx * 0.6; }
      if (x < 1300 && y < 950) P.dot(ctx, x, y, 7 + 4 * U.hash(i, 3), '#7A7F94', 0.85); }
    if (flow) for (let i = 0; i < 40; i++) { const ch = i % 3; const ph = ((t - ev.c4_fluid) * 0.5 + U.hash(i, 5)) % 1; let x, y; if (ch === 0) { x = 215 + ph * 1090; y = 610 + (U.hash(i, 6) - 0.5) * 50; } else { x = (ch === 1 ? 573 : 947) + (U.hash(i, 6) - 0.5) * 40; y = 265 + ph * 690; } P.dot(ctx, x, y, 8, C.sea, 0.75 * Math.sin(ph * Math.PI)); }
    for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) { const cx = 386 + i * 374, cy = 430 + j * 360; P.at(ctx, cx, cy, sc, 0, () => { P.shape(ctx, [[-170, -20], [-140, -140], [0, -160], [150, -130], [172, 10], [140, 140], [-10, 158], [-150, 130]], C.brain, { seed: 10 + i + j * 3 }); P.ell(ctx, 10, 0, 50, 42, P.dk(C.brain, 0.25), { seed: 20 + i }); }); }
    ctx.restore();
    P.calendar(ctx, 1600, 210, 'YEAR', '2013', P.pop(t, ev.c4_2013, 0.4), C.sky, 0.85);
    P.animal(ctx, 'rat', 1590, 480, 90 * P.pop(t, ev.c4_2013 + 0.3, 0.4), { t, sleep: true }); P.zzz(ctx, 1680, 420, t, { size: 40, a: P.fin(t, ev.c4_2013 + 0.6, 0.3) }); P.label(ctx, 'a study in mice', 1590, 590, { align: 'center', size: 38, alpha: P.fin(t, ev.c4_2013 + 0.4, 0.3) });
    P.tag(ctx, 'brain cells', 760, 190, t, ev.c4_s3 + 0.5, ev.c4_space, { size: 46, border: C.brain });
    P.tag(ctx, 'the space between them', 760, 190, t, ev.c4_space, 1e9, { size: 46, border: C.sea });
    P.counter(ctx, { x: 1600, y: 780, from: 0, to: 60, t, t0: ev.c4_space, t1: ev.c4_60 + 0.2, size: 150, prefix: '+', suffix: '%', sub: 'more space during sleep', subSize: 36, color: C.sea });
    P.stamp(ctx, 'A BRAIN WASH', 760, 1000, t, ev.c4_wash, { size: 100, color: C.sea, rot: -0.03 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — but science isn't finished: 2024 measured the opposite (about 30 % lower clearance asleep) → honestly under debate
  P.shot(ev.c4_s4, (ctx, t, s) => {
    P.paper(ctx, t, { tint: C.coral });
    P.calendar(ctx, 260, 230, 'YEAR', '2024', P.pop(t, ev.c4_2024, 0.4), C.coral, 0.9);
    // clearance bars: awake vs asleep
    const a = P.fin(t, ev.c4_opposite - 0.3, 0.4), k = P.eio((t - ev.c4_opposite) / 0.6), dr = P.eio((t - ev.c4_30 + 0.5) / 0.7); const base = 940;
    ctx.save(); ctx.globalAlpha *= a; P.line(ctx, 430, base, 1010, base, C.ink, 5, 0.7); P.label(ctx, 'awake', 560, base + 56, { align: 'center', size: 44, color: C.ink }); P.label(ctx, 'asleep', 880, base + 56, { align: 'center', size: 44, color: C.ink }); P.label(ctx, 'how fast the brain cleared a dye (mice)', 720, 330, { align: 'center', size: 40, color: C.ink }); ctx.restore();
    if (k > 0) { P.wash(ctx, P.pRR(470, base - 480 * k, 180, 480 * k, 18), C.gold, { bb: [560, base - 240, 250], seed: 3 }); const h = 480 * k * lerp(1, 0.7, dr); P.wash(ctx, P.pRR(790, base - h, 180, h, 18), C.night2, { bb: [880, base - h / 2, 250], seed: 4 });
      if (dr > 0) { P.brush(ctx, (c) => { c.beginPath(); c.setLineDash([14, 12]); c.moveTo(790, base - 480); c.lineTo(970, base - 480); }, C.dim, 4, 0.7); ctx.setLineDash([]); } }
    P.counter(ctx, { x: 1130, y: 560, from: 0, to: 30, t, t0: ev.c4_30 - 0.5, t1: ev.c4_30 + 0.2, size: 130, prefix: '−', suffix: '%', sub: 'in sleeping mice', subSize: 36, color: C.night2 });
    // the see-saw: 2013 vs 2024
    const tilt = t > ev.c4_debate ? Math.sin((t - ev.c4_debate) * 2.4) * 0.12 : lerp(-0.14, 0.14, P.eio((t - ev.c4_opposite) / 0.8));
    const ks = P.pop(t, ev.c4_but, 0.45); if (ks > 0) P.at(ctx, 1520, 780, ks, 0, () => { P.shape(ctx, [[0, 0], [70, 130], [-70, 130]], C.wood, { poly: true, seed: 5 });
      ctx.save(); ctx.rotate(tilt); P.rect(ctx, -330, -18, 660, 30, 12, C.wood, { seed: 6 });
      P.at(ctx, -230, -100, 1, 0, () => { P.rect(ctx, -90, -78, 180, 156, 18, C.sea, { seed: 7 }); G.text(ctx, '2013', 0, -8, { size: 64, fam: FT.title, weight: 700, color: C.cream, align: 'center', boil: 0 }); G.text(ctx, 'washes', 0, 46, { size: 40, fam: FT.hand, color: C.cream, align: 'center', boil: 0 }); });
      P.at(ctx, 230, -100, 1, 0, () => { P.rect(ctx, -90, -78, 180, 156, 18, C.coral, { seed: 8 }); G.text(ctx, '2024', 0, -8, { size: 64, fam: FT.title, weight: 700, color: C.cream, align: 'center', boil: 0 }); G.text(ctx, 'slower?', 0, 46, { size: 40, fam: FT.hand, color: C.cream, align: 'center', boil: 0 }); }); ctx.restore(); });
    P.write(ctx, "but science isn't finished.", 1100, 170, t, ev.c4_but - 0.3, { size: 84, dur: 0.7, t1: ev.c4_debate });
    P.stamp(ctx, 'UNDER DEBATE', 1300, 190, t, ev.c4_debate, { size: 110, color: C.navy, fg: C.gold, rot: -0.03 });
    P.label(ctx, 'Miao et al., Nature Neuroscience, 2024', 1700, 1050, { align: 'right', size: 32, alpha: P.fin(t, ev.c4_2024, 0.4) });
    Ch.nod(ctx, { x: 1160, y: 1040, s: 0.8, t, gesture: t > ev.c4_debate ? 'shrug' : 'think', eyes: 'open', mouth: Ch.nodMouth(t), look: 0.5, lookY: -0.4 });
  }, { in: { type: 'whip', dir: 'left', dur: 0.3 } });

  // S5 — not in doubt: in flies and mice, lost sleep lets harmful molecules build up in the gut — the whole body pays
  P.shot(ev.c4_s5, (ctx, t, s) => {
    P.paper(ctx, t, { tint: C.mint });
    const kf = P.pop(t, ev.c4_flies, 0.4); if (kf > 0) { fly(ctx, 300 + Math.sin(t * 7) * 14, 330 + Math.cos(t * 9) * 10, 90 * kf, t); P.label(ctx, 'fruit flies', 300, 480, { align: 'center', size: 42, color: C.ink, alpha: kf }); }
    const km = P.pop(t, ev.c4_mice, 0.4); if (km > 0) { P.animal(ctx, 'rat', 300, 720, 110 * km, { t, sleep: false }); P.label(ctx, 'mice', 300, 850, { align: 'center', size: 42, color: C.ink, alpha: km }); }
    P.tag(ctx, 'kept from sleeping', 300, 150, t, ev.c4_flies + 0.2, 1e9, { size: 44, border: C.coral });
    // the gut
    const kg = P.fin(t, ev.c4_gut - 1.0, 0.6); const gut = []; for (let i = 0; i <= 40; i++) { const u = i / 40; gut.push([720 + u * 560 + Math.sin(u * 22) * 20, 330 + u * 420 + Math.sin(u * 12.566) * 150]); }
    if (kg > 0) { P.arrow(ctx, 470, 540, 640, 540, { color: C.dim, k: kg }); P.brush(ctx, P.pCurve(gut.slice(0, Math.max(2, Math.round(40 * kg))), false), C.brain, 74, 1); P.brush(ctx, P.pCurve(gut.slice(0, Math.max(2, Math.round(40 * kg))), false), P.lt(C.brain, 0.35), 40, 0.7); }
    if (t > ev.c4_gut) { const n = Math.min(34, Math.floor((t - ev.c4_gut) * 12)); for (let i = 0; i < n; i++) { const p = gut[3 + (i * 7) % 35]; const x = p[0] + (U.hash(i, 1) - 0.5) * 40, y = p[1] + (U.hash(i, 2) - 0.5) * 40; const pr = 1 + 0.2 * Math.sin(t * 6 + i); P.glow(ctx, x, y, 34, C.red, 0.6); P.dot(ctx, x, y, 9 * pr, C.red); } }
    P.tag(ctx, 'harmful molecules build up in the gut', 1000, 960, t, ev.c4_gut, 1e9, { size: 46, border: C.red });
    const kw = P.pop(t, ev.c4_whole - 0.4, 0.4); if (kw > 0) { P.human(ctx, { x: 1620, y: 900, s: 1.5 * kw, t, shirt: C.sky, eyes: 'tired', mouth: 'frown', sway: 0.03 }); for (let i = 0; i < 3; i++) P.ring(ctx, 1620, 600, t, ev.c4_whole + i * 0.35, { r: 330, color: C.red, dur: 1.0 }); }
    P.stamp(ctx, 'THE WHOLE BODY', 1560, 190, t, ev.c4_whole, { size: 76, color: C.coral, rot: 0.03 });
    P.label(ctx, 'Vaccaro et al., Cell, 2020', 1700, 1050, { align: 'right', size: 32, alpha: P.fin(t, ev.c4_gut, 0.4) });
  }, { in: { type: 'fade', dur: 0.4 } });
})();
