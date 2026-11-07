// Cold open — look up · the Sun has set · 400 years of puzzle · the sky should BLAZE · a clue · the title in neon.
(function () {
  const { U, G, Ch, P, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;

  // S1 — night hills, Nova pops up and looks up; the camera tilts up into the stars; rings mark the black gaps
  P.shot(ev.c0_s1, (ctx, t) => {
    const tilt = P.eio((t - ev.c0_tilt) / 2.2);
    P.sky(ctx, t, { stars: 0, haze: 0.45 * (1 - tilt) });
    ctx.save(); ctx.translate(0, 520 * tilt); P.stars(ctx, t, { n: 340, y0: -700, y1: H, seed: 3 });
    for (let i = 0; i < 6; i++) P.spark(ctx, 200 + U.hash(i, 8) * 1500, -600 + U.hash(i, 9) * 1100, 2.5 + 2 * U.hash(i, 10), C.star, 0.8 + 0.2 * Math.sin(t * 2 + i));
    P.hills(ctx, t, { y: 930, color: C.magenta });
    const up = P.pop(t, ev.c0_novaIn, 0.5, 1.6);
    Ch.nova(ctx, { x: 960, y: lerp(1120, 800, up), s: 0.9, t, eyes: 'normal', lookY: -1 * tilt, mouth: Ch.novaMouth(t), wave: clamp((t - ev.c0_novaIn - 0.6) / 0.3) * (t < ev.c0_tilt + 0.3 ? 1 : 0) });
    ctx.restore();
    // after the tilt: the black between the stars gets circled
    [[520, 330], [1240, 250], [890, 560], [1530, 640], [360, 720]].forEach(([x, y], i) => { const k = P.pop(t, ev.c0_black + i * 0.12, 0.35); if (k > 0) P.circle(ctx, x, y, 58 * k, C.cyan, 4, 0.9 * k, { core: false }); });
    P.sign(ctx, 'BLACK', 960, 980, { size: 96, color: C.cyan, a: P.fin(t, ev.c0_black + 0.2, 0.2) });
  }, { in: { type: 'fade', dur: 0.6 } });

  // S2 — Earth turns away from the Sun (obvious!) → then 400 YEARS · ONE OF THE GREAT PUZZLES
  P.shot(ev.c0_s2, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.7, seed: 5 });
    const set = P.eio((t - ev.c0_s2) / Math.max(0.5, ev.c0_sunset - ev.c0_s2 + 0.4));
    const sx = lerp(560, 300, set), sy = lerp(360, 760, set);
    P.glow(ctx, sx, sy, 260, C.gold, 1 - 0.7 * set); P.circle(ctx, sx, sy, 90, C.gold, 7, 1, { fill: true, fillA: 0.5 });
    P.hills(ctx, t, { y: 860, color: C.coral, seed: 3, a: 1 });
    const dk = P.fin(t, ev.c0_dark, 0.25); ctx.save(); ctx.globalAlpha = 0.55 * dk; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); ctx.restore();
    P.tag(ctx, 'Sun has set → dark. Obvious?', 1260, 300, t, ev.c0_sunset - 0.2, ev.c0_400a - 0.2, { size: 46, border: C.gold });
    P.counter(ctx, { x: 1280, y: 470, from: 0, to: 400, t, t0: ev.c0_400a, t1: ev.c0_400, size: 150, suffix: '', sub: 'years of puzzling', color: C.gold });
    P.stamp(ctx, 'GREAT PUZZLE', 1280, 800, t, ev.c0_puzzle, { size: 90, color: C.magenta, rot: -0.04 });
    Ch.nova(ctx, { x: 520, y: 760, s: 0.6 * P.pop(t, ev.c0_dark, 0.4), t, eyes: t > ev.c0_puzzle ? 'wide' : 'normal', mouth: Ch.novaMouth(t, 'o') });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S3 — endless, eternal, full of stars → the sky fills up until it BLAZES; Nova needs sunglasses
  P.shot(ev.c0_s3, (ctx, t) => {
    const fill = P.eio((t - ev.c0_fill0) / Math.max(0.6, ev.c0_blaze - ev.c0_fill0));
    const blaze = P.fin(t, ev.c0_blaze, 0.5);
    P.sky(ctx, t, { stars: 0, haze: 0.4 });
    const n = Math.round(lerp(220, 2600, fill));
    P.stars(ctx, t, { n, seed: 11, size: 1 + 1.6 * fill, tw: 0.4 });
    // the blaze: everything goes star-surface white-gold
    if (blaze > 0) { const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7); g.addColorStop(0, `rgba(255,248,220,${blaze})`); g.addColorStop(1, `rgba(255,140,60,${blaze * 0.95})`); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
    ['ENDLESS', 'ETERNAL', 'FULL OF STARS'].forEach((w, i) => P.tag(ctx, w, 420 + i * 540, 170, t, ev.c0_tags[i], ev.c0_blaze - 0.2, { size: 52, border: [C.cyan, C.violet, C.gold][i] }));
    Ch.nova(ctx, { x: 960, y: 640, s: 1.0, t, eyes: blaze > 0.3 ? 'closed' : 'wide', mouth: Ch.novaMouth(t, 'o'), shades: P.pop(t, ev.c0_shades, 0.35), glow: 1 - blaze });
    if (blaze > 0) { P.text(ctx, 'AS BRIGHT AS THE SURFACE OF A STAR', 960, 940, { size: 70, fam: FT.title, weight: 400, color: '#7A2A10', align: 'center', alpha: P.fin(t, ev.c0_surface, 0.3) }); }
  }, { in: { type: 'fade', dur: 0.5 } });

  // S4 — the clue: a glowing key-shaped question that points back to a tiny bright dot (where everything came from)
  P.shot(ev.c0_s4, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.8, seed: 13 });
    const u = clamp((t - ev.c0_s4) / 6); ctx.save(); P.push(ctx, u);
    const k = P.pop(t, ev.c0_clue, 0.45);
    if (k > 0) P.at(ctx, 960, 470, k, 0, () => { P.tube(ctx, (c) => { c.beginPath(); c.arc(0, -40, 120, Math.PI * 1.05, Math.PI * 2.25); c.quadraticCurveTo(40, 60, 0, 110); c.lineTo(0, 150); c.moveTo(0, 210); c.arc(0, 210, 6, 0, 7); }, C.gold, 14, 1); });
    const kc = P.fin(t, ev.c0_came, 0.6);
    if (kc > 0) { P.spark(ctx, 960, 680, 6 + 4 * Math.sin(t * 6), C.hot, kc); for (let i = 0; i < 16; i++) { const an = i / 16 * 6.283, r = 40 + 600 * ease.outCubic(clamp((t - ev.c0_came) / 2.5)); P.line(ctx, 960 + Math.cos(an) * 40, 680 + Math.sin(an) * 40, 960 + Math.cos(an) * r, 680 + Math.sin(an) * r * 0.6, i % 2 ? C.cyan : C.magenta, 3, kc * 0.6); } }
    Ch.nova(ctx, { x: 360, y: 760, s: 0.7 * P.pop(t, ev.c0_s4 + 0.2, 0.45), t, eyes: 'normal', look: 1, mouth: Ch.novaMouth(t) });
    P.tag(ctx, 'a clue to where everything came from', 960, 960, t, ev.c0_clue + 0.4, 1e9, { size: 44, border: C.cyan });
    ctx.restore();
  }, { in: { type: 'push', dur: 0.5 } });

  // S5 — the question, then the neon title
  P.shot(ev.c0_s5, (ctx, t) => {
    P.sky(ctx, t, { stars: 1, seed: 17, haze: 0.5 }); P.hills(ctx, t, { y: 990, color: C.violet, seed: 9 });
    const q = L('c0_6');
    if (t < ev.title0 + 0.2) P.text(ctx, 'So… why is the sky dark at night?', 960, 560, { size: 76, align: 'center', alpha: P.fin(t, q.t, 0.3) * (1 - P.fin(t, ev.title0, 0.2)) });
    // the sign
    const words = ev.titleWords; let x = 0; const size = 132; const sp = P.measure(ctx, ' ', size, FT.title, 400);
    const line1 = words.slice(0, 4), line2 = words.slice(4);
    const draw = (ws, y) => { const tw = ws.reduce((a, w) => a + P.measure(ctx, w.w, size, FT.title, 400) + sp, -sp); let xx = 960 - tw / 2;
      ws.forEach((w, i) => { const on = t >= w.t; const fl = on && t - w.t < 0.18 ? (Math.floor((t - w.t) * 40) % 2 ? 0.3 : 1) : 1; const ww = P.measure(ctx, w.w, size, FT.title, 400);
        if (on) P.sign(ctx, w.w, xx + ww / 2, y, { size, color: w.w === 'DARK' ? C.cyan : w.w === 'NIGHT?' ? C.gold : C.white, a: fl }); xx += ww + sp; }); };
    draw(line1, 420); draw(line2, 590); void x;
    const kb = P.pop(t, ev.titleBrand, 0.45); if (kb > 0) { P.planet(ctx, 830, 790, 34 * kb, t); P.sign(ctx, 'WHYVERSE', 1010, 812, { size: 54, color: C.gold, a: clamp(kb) }); }
    Ch.nova(ctx, { x: 1560, y: 820, s: 0.55, t, lookY: -1, look: -0.6, mouth: Ch.novaMouth(t), eyes: t > ev.sync_title ? 'happy' : 'normal' });
  }, { in: { type: 'fade', dur: 0.5 } });
})();
