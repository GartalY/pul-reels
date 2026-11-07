// Chapter 3 — The wrong answers: dust soaks up light (but heats and glows), galaxies clump (but the gaps still close), the picture cracks.
(function () {
  const { U, G, Ch, P, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const dustBlob = (ctx, x, y, r, col, a, seed) => { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; for (let i = 0; i < 9; i++) { const an = U.hash(i, seed) * 6.283, d = r * 0.55 * U.hash(i, seed + 1); ctx.beginPath(); ctx.arc(x + Math.cos(an) * d, y + Math.sin(an) * d * 0.6, r * (0.35 + 0.3 * U.hash(i, seed + 2)), 0, 7); ctx.fill(); } ctx.restore(); };
  const bg = (ctx, t) => { P.sky(ctx, t, { stars: 1, seed: 41 }); for (let i = 0; i < 5; i++) dustBlob(ctx, (i * 420 + t * 30) % 2200 - 150, 300 + 400 * U.hash(i, 3), 160, '#2A2140', 0.8, 40 + i * 5); };
  P.cardShot('c3', 3, 'The wrong answers', bg);

  const DUST = [[760, 330, 150], [1080, 520, 170], [860, 760, 140], [1240, 260, 120], [1320, 760, 130]];
  // S1 — Olbers' idea: dust clouds between us and distant stars soak up the light
  P.shot(ev.c3_s1, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.5, seed: 43, haze: 0.25 });
    const ey = 560; P.icon(ctx, 'eye', 220, ey, 60, { color: C.white });
    // distant stars on the right, rays travelling left
    const kd = P.fin(t, ev.c3_dust, 0.8), soak = P.fin(t, ev.c3_soak, 0.5);
    for (let i = 0; i < 9; i++) { const sy = 160 + i * 100, sx = 1760; P.spark(ctx, sx, sy, 5, C.hot, 1); const ph = ((t * 0.9 + i * 0.13) % 1);
      const blocked = i % 3 !== 1 && kd > 0.5; const stopX = blocked ? lerp(1760, 1100 + 120 * U.hash(i, 4), 1) : 240; const x = lerp(sx, 240, ph); if (blocked && x < stopX) continue;
      P.line(ctx, x + 60, lerp(sy, ey, (sx - x - 60) / (sx - 240)), x, lerp(sy, ey, (sx - x) / (sx - 240)), C.gold, 4, blocked ? 1 - soak * 0.2 : 1); }
    DUST.forEach(([x, y, r], i) => dustBlob(ctx, x + Math.sin(t * 0.4 + i) * 10, y, r * P.oc(kd * 1.2 - i * 0.1), '#3A2E52', 0.92, 80 + i * 7));
    const ko = P.pop(t, ev.c3_olbers, 0.4); if (ko > 0) { P.bust(ctx, 'olbers', 260, 230, 0.6 * ko, ko, t); P.tag(ctx, 'dust?', 430, 120, t, ev.c3_olbers + 0.3, 1e9, { size: 40, border: C.gold }); }
    P.tag(ctx, 'dust + gas soak up starlight?', 1000, 1000, t, ev.c3_soak, 1e9, { size: 42, border: C.violet });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — but absorbing means warming: the dust heats up until it glows like the stars → part of the wall
  P.shot(ev.c3_s2, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.4, seed: 45, haze: 0.2 });
    const heat = P.eio((t - ev.c3_warm) / Math.max(0.8, ev.c3_glow - ev.c3_warm + 0.3));
    const col = heat < 0.5 ? P.mix('#3A2E52', '#C2402A', heat * 2) : P.mix('#C2402A', '#FFE7B0', (heat - 0.5) * 2);
    DUST.forEach(([x, y, r], i) => { if (heat > 0.6) P.glow(ctx, x - 200, y, r * 2.2, '#FFB347', (heat - 0.6) * 2); dustBlob(ctx, x - 200, y, r, col, 0.95, 80 + i * 7); });
    for (let i = 0; i < 9; i++) { const sy = 160 + i * 100; P.spark(ctx, 1500, sy, 5, C.hot, 1); P.line(ctx, 1500, sy, 1150, sy * 0.8 + 100, C.gold, 3, 0.7); }
    P.thermo(ctx, 1740, 820, heat * 0.95, { h: 500, color: C.coral, label: 'dust temperature' });
    const tc = P.fin(t, ev.c3_time, 0.3); if (tc > 0) { P.icon(ctx, 'clock', 260, 200, 70, { color: C.cyan, a: tc, t: t * 6 }); P.label(ctx, 'give it time…', 260, 320, { align: 'center', size: 30, alpha: tc }); }
    P.tag(ctx, 'as hot as the starlight around it', 760, 1000, t, ev.c3_hot, ev.c3_part - 0.1, { size: 42, border: C.coral });
    P.stamp(ctx, 'IT GLOWS TOO', 760, 1000, t, ev.c3_part, { size: 80, color: C.gold });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S3 — galaxies with empty space between… zoom out: endless galaxies close the gaps again
  const GAL = []; for (let i = 0; i < 140; i++) GAL.push([U.hash(i, 91), U.hash(i, 92), 0.6 + 0.8 * U.hash(i, 93), U.hash(i, 94) * 6.283]);
  P.shot(ev.c3_s3, (ctx, t) => {
    P.sky(ctx, t, { stars: 0, haze: 0.25 });
    const clump = P.fin(t, ev.c3_clump, 1.2); const zoom = lerp(1, 0.22, P.eio((t - ev.c3_rearr) / 2.6));
    ctx.save(); ctx.translate(960, 540); ctx.scale(zoom, zoom); ctx.translate(-960, -540);
    const N = zoom < 0.9 ? GAL.length : 8; const span = 1 / zoom;
    for (let gi = 0; gi < N; gi++) { const [hx, hy, s, rot] = GAL[gi]; const gx = gi < 3 ? [560, 1260, 960][gi] : 960 + (hx - 0.5) * W * 4.5, gy = gi < 3 ? [380, 420, 800][gi] : 540 + (hy - 0.5) * H * 4.5;
      if (gi >= 3 && gi < 8 && zoom > 0.9) continue; const sz = 170 * s;
      // stars drift from uniform → into the spiral
      ctx.save(); ctx.translate(gx, gy); ctx.rotate(rot + t * 0.05); ctx.globalCompositeOperation = 'lighter';
      for (let k = 0; k < (zoom < 0.5 ? 60 : 140); k++) { const arm = k % 2, q = U.hash(k, gi + 300), an = q * 5 + arm * Math.PI, rr = sz * (0.08 + q * 0.95);
        const tx = Math.cos(an) * rr, ty = Math.sin(an) * rr * 0.55, ux = (U.hash(k, gi + 400) - 0.5) * 700, uy = (U.hash(k, gi + 500) - 0.5) * 600;
        const x = lerp(ux, tx, gi < 3 ? clump : 1), y = lerp(uy, ty, gi < 3 ? clump : 1); ctx.fillStyle = k % 7 ? C.star : C.cyan; ctx.globalAlpha = 0.85; ctx.fillRect(x - 2.5 / zoom * 0.6, y - 2.5 / zoom * 0.6, 5 / zoom * 0.6, 5 / zoom * 0.6); }
      ctx.restore(); if (gi < 3 || zoom < 0.9) P.glow(ctx, gx, gy, sz * 0.5, C.hot, 0.6); }
    ctx.restore(); void span;
    { const fz = clamp((0.9 - zoom) / 0.68); if (fz > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = `rgba(255,220,170,${0.45 * fz})`; ctx.fillRect(0, 0, W, H); ctx.restore(); } }
    P.tag(ctx, 'galaxies + empty space between', 960, 120, t, ev.c3_gal, ev.c3_rearr, { size: 42, border: C.cyan });
    P.tag(ctx, 'go on forever → the gaps still close', 960, 980, t, ev.c3_close, 1e9, { size: 44, border: C.gold });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — something more basic is wrong: the three assumptions on a neon sign; one cracks and flickers out
  P.shot(ev.c3_s4, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.7, seed: 47 });
    const items = ['ENDLESS', 'ETERNAL', 'FULL OF STARS']; const crack = P.fin(t, ev.c3_crack, 0.15);
    ctx.save(); P.shake(ctx, t, ev.c3_crack, 6, 0.3);
    P.box(ctx, 360, 260, 1200, 520, C.violet, { r: 30, lw: 4 });
    P.text(ctx, 'THE PICTURE', 960, 340, { size: 40, fam: FT.title, weight: 400, color: C.dim, align: 'center' });
    items.forEach((w, i) => { const y = 470 + i * 110; const dead = i === 1 && crack > 0 ? (Math.floor((t - ev.c3_crack) * 14) % 3 === 0 ? 0.6 : 0.15) : 1; P.sign(ctx, w, 960, y, { size: 80, color: [C.cyan, C.gold, C.magenta][i], a: P.fin(t, ev.c3_s4 + 0.2 + i * 0.15, 0.2) * dead }); });
    if (crack > 0) P.tube(ctx, (c) => { c.beginPath(); c.moveTo(980, 260); c.lineTo(940, 380); c.lineTo(1010, 450); c.lineTo(950, 560); c.lineTo(1030, 660); c.lineTo(990, 780); }, C.white, 4, crack);
    ctx.restore();
    Ch.nova(ctx, { x: 1700, y: 880, s: 0.6, t, eyes: t > ev.c3_crack ? 'wide' : 'worried', mouth: Ch.novaMouth(t, 'o') });
  }, { in: { type: 'push', dur: 0.5 } });
})();
