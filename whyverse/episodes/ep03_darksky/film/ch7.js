// Payoff + end card: three reasons, a dive into a black gap, the cast of the story, the Leonids, call to action (no tease).
(function () {
  const { U, G, Ch, P, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;

  // S1 — the answer in three neon lines
  P.shot(ev.c7_s1, (ctx, t) => {
    P.sky(ctx, t, { stars: 1, seed: 121 }); P.hills(ctx, t, { y: 1010, color: C.violet, seed: 3 });
    const q = P.fin(t, ev.c7_q, 0.4) * (1 - P.fin(t, ev.c7_reasons[0] - 0.4, 0.3));
    P.text(ctx, 'Why is the sky dark at night?', 960, 300, { size: 76, align: 'center', alpha: q });
    const ks = P.fin(t, ev.c7_sun, 0.3); if (ks > 0 && q > 0) { P.icon(ctx, 'sun', 960, 520, 70, { a: q * ks }); P.icon(ctx, 'cross', 1030, 470, 30, { a: q * ks }); P.label(ctx, 'not just the Sun setting', 960, 650, { align: 'center', alpha: q * ks }); }
    const R = [['THE UNIVERSE HAD A BEGINNING', C.gold], ['LIGHT TAKES TIME TO TRAVEL', C.cyan], ['SPACE STRETCHES THE LIGHT', C.magenta]];
    R.forEach(([s, col], i) => { const k = P.pop(t, ev.c7_reasons[i], 0.4); if (k <= 0) return; P.at(ctx, 960, 300 + i * 190, k, 0, () => { P.box(ctx, -720, -75, 1440, 150, col, { r: 24, lw: 4 }); P.sign(ctx, (i + 1) + '. ' + s, 0, 28, { size: 66, color: col }); }); });
  }, { in: { type: 'fade', dur: 0.6 } });

  // S2 — dive into a black gap between the stars → faint galaxies → the ancient glow
  P.shot(ev.c7_s2, (ctx, t) => {
    const z = Math.pow(60, P.eio((t - ev.c7_zoom + 0.3) / Math.max(1.5, ev.c7_begin - ev.c7_zoom + 0.6)));
    const gx = 1180, gy = 420;
    P.sky(ctx, t, { stars: 0, haze: 0.2 });
    ctx.save(); ctx.translate(gx, gy); ctx.scale(z, z); ctx.translate(-gx, -gy);
    ctx.fillStyle = C.star; for (let i = 0; i < 420; i++) { let x = U.hash(i, 131) * W, y = U.hash(i, 132) * H; if (Math.hypot(x - gx, y - gy) < 140) continue; const r = (1 + 2 * Math.pow(U.hash(i, 133), 4)) / Math.sqrt(z); ctx.fillRect(x - r, y - r, r * 2, r * 2); }
    // faint galaxies inside the gap (tiny), and deeper still more
    for (let i = 0; i < 40; i++) { const x = gx + (U.hash(i, 134) - 0.5) * 220, y = gy + (U.hash(i, 135) - 0.5) * 220, s = (0.6 + U.hash(i, 136)) * 2.2; P.glow(ctx, x, y, s * 3, [C.amber, C.coral, C.violet][i % 3], clamp((z - 3) / 6) * 0.9); }
    ctx.restore();
    const deep = P.fin(t, ev.c7_begin - 0.4, 1.2); if (deep > 0) { ctx.save(); ctx.globalAlpha = deep * 0.85; const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7); g.addColorStop(0, '#FFB37A'); g.addColorStop(1, '#B0306A'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); }
    const kc = P.pop(t, ev.c7_patch, 0.35); if (kc > 0 && z < 1.5) P.circle(ctx, gx, gy, 140 * kc, C.cyan, 4, 1, { core: false });
    P.tag(ctx, 'every black patch is a clue', 960, 960, t, ev.c7_patch + 0.2, ev.c7_begin - 0.3, { size: 44, border: C.cyan });
    P.stamp(ctx, 'BACK TOWARD THE BEGINNING OF TIME', 960, 540, t, ev.c7_begin + 0.3, { size: 54, color: C.white });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S3 — a child's question … answered by a poet, a physicist, two radio scientists and a pile of pigeon droppings
  P.shot(ev.c7_s3, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.8, seed: 137 });
    const kc = P.pop(t, ev.c7_child, 0.4); if (kc > 0) { P.at(ctx, 960, 250, kc, 0, () => { P.icon(ctx, 'person', -40, 0, 70, { color: C.white }); P.sign(ctx, '?', 60, 20, { size: 110, color: C.gold }); }); P.label(ctx, 'a question a child could ask', 960, 360, { align: 'center', size: 30, alpha: clamp(kc) }); }
    const cast = [['poe', 'POET'], ['kelvin', 'PHYSICIST'], ['radio', 'RADIO SCIENTISTS'], ['pigeon', 'PIGEON DROPPINGS']];
    cast.forEach(([who, lab], i) => { const k = P.pop(t, ev.c7_cast[i], 0.4); if (k <= 0) return; const x = 300 + i * 440, y = 680;
      if (who === 'radio') { P.bust(ctx, 'penzias', x - 70, y, 0.65 * k, 1, t); P.bust(ctx, 'wilson', x + 70, y, 0.65 * k, 1, t); }
      else if (who === 'pigeon') { P.icon(ctx, 'pigeon', x, y - 30, 80 * k, { t }); ctx.save(); ctx.globalAlpha = clamp(k); ctx.fillStyle = '#F2F2E8'; for (let j = 0; j < 7; j++) { ctx.beginPath(); ctx.ellipse(x - 60 + j * 22, y + 70 + (j % 2) * 8, 12, 6, 0, 0, 7); ctx.fill(); } ctx.restore(); }
      else P.bust(ctx, who, x, y, 0.85 * k, 1, t);
      P.text(ctx, lab, x, y + 210, { size: 34, fam: FT.title, weight: 400, color: [C.magenta, C.coral, C.cyan, C.white][i], align: 'center', alpha: clamp(k) }); });
  }, { in: { type: 'push', dur: 0.5 } });

  // S4 — the Leonids: meteors across a dark sky; Nova lies back and looks up
  const radiant = [520, 160];
  P.shot(ev.c7_s4, (ctx, t) => {
    P.sky(ctx, t, { stars: 1, seed: 139, n: 520 }); P.hills(ctx, t, { y: 960, color: C.violet, seed: 11 });
    ev.c7_meteors.forEach((t0, i) => { const a = (t - t0) / 0.6; if (a < 0 || a > 1.4) return; const an = 0.35 + U.hash(i, 141) * 0.9, d0 = 120 + 360 * U.hash(i, 142), len = 520;
      const x0 = radiant[0] + Math.cos(an) * d0, y0 = radiant[1] + Math.sin(an) * d0; const k = ease.outCubic(clamp(a)), fade = 1 - clamp((a - 1) / 0.4);
      const hx = x0 + Math.cos(an) * len * k, hy = y0 + Math.sin(an) * len * k, tx = x0 + Math.cos(an) * len * Math.max(0, k - 0.45), ty = y0 + Math.sin(an) * len * Math.max(0, k - 0.45);
      P.line(ctx, tx, ty, hx, hy, C.white, 5, fade); P.glow(ctx, hx, hy, 30, C.cyan, fade); });
    P.tag(ctx, 'LEONIDS · peak around 17 November', 1300, 200, t, ev.c7_nov, 1e9, { size: 46, border: C.cyan });
    Ch.nova(ctx, { x: 960, y: 880, s: 0.7, t, rot: -0.25, lookY: -1, look: -0.8, eyes: 'happy', mouth: Ch.novaMouth(t), float: 0.3 });
    P.stamp(ctx, 'LOOK UP', 1360, 560, t, ev.c7_look + 0.2, { size: 84, color: C.gold });
  }, { in: { type: 'fade', dur: 0.6 } });

  // S5 — end card
  P.shot(ev.c7_s5, (ctx, t) => {
    P.sky(ctx, t, { stars: 1, seed: 143 });
    const k = P.pop(t, ev.sync_logo, 0.5); const up = ease.inOutCubic(clamp((t - ev.c7_like + 0.4) / 0.6));
    ctx.save(); ctx.translate(W / 2, 520); ctx.scale(1 - 0.35 * up, 1 - 0.35 * up); ctx.translate(-W / 2, -520 - 330 * up);
    P.planet(ctx, W / 2, 430, 150 * k, t);
    if (k > 0) P.sign(ctx, 'WHYVERSE', W / 2, 760, { size: 120, color: C.gold, a: clamp(k) });
    P.text(ctx, 'Big questions. Visual answers.', W / 2, 870, { size: 54, align: 'center', alpha: P.fin(t, ev.sync_logo + 0.4, 0.4) });
    ctx.restore();
    const kl = P.pop(t, ev.c7_like, 0.4); if (kl > 0) P.at(ctx, 640, 640, kl * (1 + 0.08 * Math.exp(-(t - ev.c7_like) * 6)), -0.04, () => {
      P.circle(ctx, 0, 0, 110, C.gold, 6, 1, { fill: true, fillA: 0.25 });
      P.tube(ctx, (c) => { c.beginPath(); P.rr(c, -52, -10, 30, 76, 8); c.moveTo(-14, -10); c.lineTo(10, -70); c.lineTo(34, -66); c.lineTo(26, -10); c.lineTo(62, -10); c.lineTo(62, 66); c.lineTo(-14, 66); c.closePath(); }, C.gold, 5, 1, { fill: true, fillA: 0.6 });
      P.sign(ctx, 'LIKE', 0, 175, { size: 46, color: C.white }); });
    const ks = P.pop(t, ev.c7_sub, 0.4); if (ks > 0) { const pressed = t > ev.c7_sub + 0.5; P.at(ctx, 1180, 640, ks * (pressed ? 0.96 : 1), 0, () => {
      P.tube(ctx, (c) => P.rr(c, -310, -70, 620, 140, 70), pressed ? C.dim : C.red, 5, 1, { fill: true, fillA: pressed ? 0.3 : 0.75 });
      P.sign(ctx, pressed ? 'SUBSCRIBED' : 'SUBSCRIBE', 0, 24, { size: 60, color: C.white }); });
      P.ring(ctx, 1180, 640, t, ev.c7_sub + 0.35, { r: 300, color: C.white, dur: 0.8 }); }
    P.tag(ctx, 'Instagram  @whyverse___', 640, 930, t, ev.c7_ig, 1e9, { size: 50, border: C.magenta });
    P.tag(ctx, 'TikTok  @Whyverse', 1280, 930, t, ev.c7_tt, 1e9, { size: 50, border: C.cyan });
    const u = clamp((t - ev.c7_s5) / 1.5); Ch.nova(ctx, { x: lerp(-150, 250, ease.outCubic(u)), y: 560, s: 0.75, t, eyes: 'happy', wave: u >= 1 ? 1 : 0, mouth: Ch.novaMouth(t) });
  }, { in: { type: 'iris', at: [W / 2, 430], color: '#05070E' } });
})();
