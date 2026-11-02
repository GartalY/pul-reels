// Chapter 6 — who else is out there?
(function () {
  const { U, G, Ch, P, SCORE: S, Shots, Data } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const garden = (ctx, t, night = 0) => {
    P.sky(ctx, P.mix('#CFE7EE', '#1E2550', night), P.mix('#F4EDE0', '#3A3570', night));
    if (night > 0.02) { ctx.globalAlpha = night; for (let i = 0; i < 90; i++) { ctx.fillStyle = '#FFF4D6'; ctx.beginPath(); ctx.arc(U.hash(i, 1) * W, U.hash(i, 2) * 600, 1 + 2 * U.hash(i, 3), 0, 7); ctx.fill(); } G.ellipse(ctx, 1640, 180, 70, 70, { fill: '#FFF4D6', seed: 9, lw: 3 }); ctx.globalAlpha = 1; }
    P.ground(ctx, 860, { fill: P.mix(C.green, '#26403A', night), seed: 61 });
  };
  P.cardShot('c6', 6, 'Who else is out there?', (ctx, t) => { garden(ctx, t); for (let i = 0; i < 8; i++) P.flower(ctx, 140 + i * 240, 960, 0.9, { color: ['#E58FB0', '#B79CFF', '#F2B84B', '#EF7B5B'][i % 4], sway: 1, seed: 80 + i, t }); });

  // S1 — wait! the line-up
  const LINE = ['fly', 'beetle', 'moth', 'butterfly', 'hummingbird', 'bat'];
  P.shot(ev.c6_s1, (ctx, t, s) => {
    garden(ctx, t);
    for (let i = 0; i < 8; i++) P.flower(ctx, 140 + i * 240, 980, 0.8, { color: ['#E58FB0', '#B79CFF', '#F2B84B', '#EF7B5B'][i % 4], sway: 1, seed: 90 + i, t });
    const ku = P.fin(t, ev.c6_wait, 0.2); const shift = ease.inOutCubic(clamp((t - ev.c6_only + 0.3) / 0.5));
    Ch.bee(ctx, { x: lerp(W / 2, 300, shift), y: 520 - 30 * Math.exp(-Math.max(0, t - ev.c6_wait) * 6) * (t > ev.c6_wait ? 1 : 0), s: 1.6, t, armR: ku > 0 ? 1.4 : -0.3, armL: ku > 0 ? 1.2 : -0.3, eyes: t > ev.c6_wait && t < ev.c6_wait + 1.2 ? 'wide' : 'normal', mouth: P.talk(t) });
    if (t > ev.c6_wait && t < ev.c6_only + 0.3) P.note(ctx, 'wait!', W / 2 + 260, 300, t, ev.c6_wait, ev.c6_only + 0.3, { size: 80, fill: C.gold, seed: 3, fam: FT.title });
    LINE.forEach((k, i) => { const sc = P.pop(t, ev.c6_line[i], 0.4); if (sc <= 0) return; const x = 780 + i * 190, y = 520 + Math.sin(t * 2 + i) * 20; G.ellipse(ctx, x, y, 80, 80, { fill: 'rgba(255,255,255,0.7)', seed: 40 + i, lw: 3, stroke: 'rgba(42,35,32,0.4)' }); P.icon(ctx, k, x, y, 0.9 * sc, t, i * 5); });
  }, { in: 'cut', cam: Shots.push(1.0, 1.04) });

  // S2 — cacao and its midges
  P.shot(ev.c6_s2, (ctx, t, s) => {
    P.sky(ctx, '#CFE8D8', '#EEF1DE');
    for (let i = 0; i < 12; i++) G.ellipse(ctx, U.hash(i, 1) * W, 120 + U.hash(i, 2) * 200, 160, 70, { fill: ['#5E9B58', '#77B06A', '#4E8A4C'][i % 3], seed: 200 + i, lw: 3 });
    // trunk with pods + flowers growing straight from the bark
    G.poly(ctx, [[560, 1100], [700, 1100], [680, 160], [580, 160]], { fill: '#8A6142', seed: 3, hatch: { color: 'rgba(40,20,10,0.3)', gap: 7 } });
    const kp = P.pop(t, ev.c6_choc, 0.4);
    [[520, 520, -0.3], [740, 700, 0.3], [530, 840, -0.2]].forEach(([x, y, r], i) => P.food(ctx, 'cacao', x, y, 1.1 * kp, { rot: r, seed: i }));
    for (let i = 0; i < 10; i++) { const x = 590 + U.hash(i, 5) * 80, y = 300 + i * 70; ctx.fillStyle = '#FFF8E8'; ctx.strokeStyle = '#B79E7A'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 9, 0, 7); ctx.fill(); ctx.stroke(); }
    // magnifier on a flower with a midge
    const km = P.pop(t, ev.c6_midge, 0.5);
    if (km > 0) { G.line(ctx, [[660, 440], [1100, 470]], { color: 'rgba(42,35,32,0.35)', lw: 3, seed: 7 });
      P.at(ctx, 1380, 500, km, 0, () => { G.ellipse(ctx, 0, 0, 300, 300, { fill: '#FFFDF4', seed: 8, lw: 12 }); G.line(ctx, [[210, 210], [380, 400]], { color: '#6B4A32', lw: 36, seed: 9 });
        for (let i = 0; i < 5; i++) { const a = i / 5 * 6.283; G.ellipse(ctx, Math.cos(a) * 70, 40 + Math.sin(a) * 70, 60, 30, { fill: '#FFF8E8', seed: 10 + i, lw: 4 }); } G.ellipse(ctx, 0, 40, 34, 34, { fill: '#F3D9A6', seed: 16, lw: 4 });
        P.icon(ctx, 'midge', -30 + Math.sin(t * 3) * 40, -110 + Math.cos(t * 4) * 20, 2.0, t, 3); }); }
    const kr = P.fin(t, ev.c6_mm - 0.2, 0.3);
    if (kr > 0) { ctx.save(); ctx.globalAlpha = kr; G.rrect(ctx, 1080, 880, 600, 70, 6, { fill: '#F2D27A', seed: 20, lw: 4 }); for (let i = 0; i <= 30; i++) G.line(ctx, [[1100 + i * 18.6, 880], [1100 + i * 18.6, 880 + (i % 10 === 0 ? 40 : i % 5 === 0 ? 28 : 16)]], { color: C.ink, lw: 2.5, seed: 21 + i }); ctx.restore();
      P.note(ctx, 'midges: 1–3 mm', 1380, 1010, t, ev.c6_mm, 1e9, { size: 50, seed: 22 }); }
  }, { in: { type: 'push', dir: 'left' }, cam: Shots.push(1.0, 1.04) });

  // S3 — chocolate survives (probably)
  P.shot(ev.c6_s3, (ctx, t, s) => {
    P.paperBg(ctx, '#F1E2CF');
    G.rays(ctx, W / 2, 560, { n: 18, r0: 260, r1: 1200, color: 'rgba(242,184,75,0.35)', lw: 30, spin: t * 0.1 });
    const k = P.pop(t, ev.c6_s3 + 0.2, 0.5); P.at(ctx, W / 2, 560, 3.2 * k, Math.sin(t * 1.5) * 0.05, () => P.food(ctx, 'chocolate', 0, 0, 1));
    P.stamp(ctx, 'SURVIVES', W / 2, 220, t, ev.c6_surv, { size: 120, color: C.greenD, rot: -0.06 });
    P.note(ctx, '…probably', 1450, 900, t, ev.c6_prob, 1e9, { size: 70, seed: 4, rot: 0.06 });
    Ch.bee(ctx, { x: 360, y: 820, s: 0.9, t, eyes: t > ev.c6_prob ? 'happy' : 'normal', mouth: P.talk(t), armR: 0.8 });
  }, { in: { type: 'zoom' }, cam: Shots.push(1.0, 1.05) });

  // S4 — the parade: day → night, bats & agave
  P.shot(ev.c6_s4, (ctx, t, s) => {
    const nt = ease.inOutCubic(clamp((t - ev.c6_night + 0.3) / 1.0));
    garden(ctx, t, nt);
    const flowers = [[260, '#E58FB0'], [600, '#F2B84B'], [940, '#B79CFF'], [1280, '#EF7B5B'], [1620, '#E8718D']];
    flowers.forEach(([x, col], i) => P.flower(ctx, x, 980, 1.1, { color: P.mix(col, '#4A4870', nt * 0.6), sway: 1, seed: 120 + i, t }));
    ['fly', 'beetle', 'moth', 'butterfly', 'hummingbird'].forEach((k, i) => { const t0 = ev.c6_par[i]; const a = clamp((t - t0 + 0.6) / 0.6); if (a <= 0) return; const fx = flowers[i][0], fy = 980 - 1.1 * 150;
      const x = lerp(fx + 500, fx + 20, ease.outCubic(a)), y = lerp(200, fy - 60, ease.outCubic(a)) + Math.sin(t * 3 + i) * 8; ctx.save(); ctx.globalAlpha *= 1 - nt * 0.7; P.icon(ctx, k, x, y, 1.0, t, i * 9); ctx.restore(); });
    if (nt > 0) { // agave + bat
      ctx.save(); ctx.globalAlpha *= nt;
      const ag = P.pop(t, ev.c6_agave, 0.5); const ax = 1500;
      for (let i = 0; i < 7; i++) { const a = -1.2 + i * 0.4; G.poly(ctx, [[ax - 20, 980], [ax + 20, 980], [ax + Math.sin(a) * 220, 980 - Math.cos(a) * 200]], { fill: '#5E8F7A', seed: 140 + i, lw: 4 }); }
      if (ag > 0) { G.line(ctx, [[ax, 960], [ax, 960 - 560 * ag]], { color: '#6B7A4A', lw: 14, seed: 150 }); for (let i = 0; i < 5; i++) { const y = 960 - 560 * ag + 40 + i * 60; G.ellipse(ctx, ax - 50, y, 30, 18, { fill: '#F2D27A', seed: 151 + i, lw: 3 }); G.ellipse(ctx, ax + 50, y + 20, 30, 18, { fill: '#F2D27A', seed: 156 + i, lw: 3 }); } }
      const bu = clamp((t - ev.c6_bat + 0.5) / 1.4); P.icon(ctx, 'bat', lerp(200, ax - 80, ease.outCubic(bu)), lerp(240, 500, ease.outCubic(bu)) + Math.sin(t * 5) * 10, 1.4, t, 7);
      P.note(ctx, 'agave → tequila', ax - 200, 260, t, ev.c6_agave + 0.3, 1e9, { size: 54, seed: 6, fill: '#E6E0F5' });
      ctx.restore();
    }
  }, { in: { type: 'push', dir: 'left' }, cam: Shots.pan(0, 40) });

  // S5 — built to collect pollen
  P.shot(ev.c6_s5, (ctx, t, s) => {
    P.paperBg(ctx, '#2E5C8A');
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.lineWidth = 2; for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    const pol = clamp((t - ev.c6_coll + 0.6) / 1.2);
    Ch.bee(ctx, { x: 880, y: 560, s: 3.2, t, flap: 0.4, pollen: 0.3 + 0.7 * pol, eyes: 'happy', mouth: 'smile' });
    const lab = (txt, x, y, tx, ty, t0, i) => { const k = P.fin(t, t0, 0.3); if (k <= 0) return; G.line(ctx, [[x, y], [lerp(x, tx, k), lerp(y, ty, k)]], { color: '#FFFFFF', lw: 4, seed: 30 + i }); P.note(ctx, txt, x, y, t, t0, 1e9, { size: 50, seed: 31 + i }); };
    lab('feeds its young on pollen', 1500, 230, 1100, 470, ev.c6_young, 0);
    lab('branched, fuzzy hairs', 340, 250, 760, 470, ev.c6_body, 1);
    lab('pollen packed on the legs', 1500, 900, 860, 790, ev.c6_coll, 2);
  }, { in: { type: 'wipe', dir: 'left' }, cam: Shots.push(1.0, 1.04) });

  // S6 — smaller, plainer, harder
  P.shot(ev.c6_s6, (ctx, t, s) => {
    P.paperBg(ctx, '#EDE6DA');
    const g = clamp((t - ev.c6_w[0]) / 2.6); const sc = lerp(1, 0.62, ease.inOutCubic(g));
    P.at(ctx, W / 2, 600, sc, 0, () => { G.ellipse(ctx, 0, 0, 330, 300, { fill: '#FFFFFF', seed: 3, lw: 5 }); ['apple', 'cherry', 'carrot', 'blueberry', 'pumpkin', 'almond', 'melon'].forEach((f, i) => { const a = i / 7 * 6.283; P.food(ctx, f, Math.cos(a) * 180, Math.sin(a) * 160, 1.0, { grey: g * 0.9 }); }); P.food(ctx, 'bread', 0, 0, 1.0); });
    ['SMALLER', 'PLAINER', 'HARDER'].forEach((w, i) => P.stamp(ctx, w, [360, 960, 1560][i], [240, 160, 240][i], t, ev.c6_w[i], { size: 84, color: [C.navy, '#8A8378', C.red][i], rot: (i - 1) * 0.07 }));
  }, { in: { type: 'fade', dur: 0.5 }, cam: Shots.push(1.0, 1.05) });
})();
