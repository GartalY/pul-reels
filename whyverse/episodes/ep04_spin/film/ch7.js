// Payoff + end card: the four consequences recapped · what the spin gives us · back to Axel and his tea on the turning planet
// ("until now") · Whyverse end card with like / subscribe / handles (no tease of another episode).
(function () {
  const { U, G, Ch, P, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;

  // S1 — the recap: four chalk panels
  P.shot(ev.c7_s1, (ctx, t) => {
    P.board(ctx, t);
    P.write(ctx, 'so, what if Earth stopped spinning?', 960, 170, t, ev.c7_q - 0.1, { size: 76, dur: 0.9 });
    const R = [['SUDDEN STOP', 'scoured clean', C.red], ['OCEANS', 'move to the poles', C.sky], ['ONE DAY', 'lasts a year', C.gold], ['STORMS', 'one long wind', C.mint]];
    R.forEach(([a, b, col], i) => { const k = P.pop(t, ev.c7_recap[i], 0.4); if (k <= 0) return; const x = 255 + i * 470, y = 600;
      P.at(ctx, x, y, k, (i - 1.5) * 0.03, () => { P.box(ctx, -210, -250, 420, 500, col, { r: 22, lw: 6, seed: 90 + i });
        if (i === 0) { P.streaks(ctx, 60, -80, 260, 160, t, { a: 0.9 }); P.icon(ctx, 'house', 80, -80, 50, { seed: 3 }); }
        if (i === 1) { P.circle(ctx, 0, -80, 80, '#C9A27A', 5, 1, { fill: '#5A4636', fillA: 0.9 }); for (const s of [-1, 1]) P.stroke(ctx, (c) => { c.beginPath(); c.arc(0, -80, 92, s < 0 ? Math.PI * 1.25 : Math.PI * 0.25, s < 0 ? Math.PI * 1.75 : Math.PI * 0.75); }, C.sky, 18, 1, { seed: 5 + s }); }
        if (i === 2) { P.sun(ctx, 0, -80, 50, t); }
        if (i === 3) { for (let j = 0; j < 3; j++) P.arcArrow(ctx, 0, 40, 120 + j * 22, Math.PI * 1.15, Math.PI * 1.85, { color: C.mint, lw: 6, head: 16, seed: 7 + j }); }
        G.text(ctx, a, 0, 120, { size: 50, fam: FT.title, color: col, align: 'center', boil: 0 });
        G.text(ctx, b, 0, 190, { size: 42, fam: FT.hand, color: C.chalk, align: 'center', boil: 0 }); }); });
  }, { in: { type: 'fade', dur: 0.6 } });

  // S2 — what the spin gives us, around a turning globe
  P.shot(ev.c7_s2, (ctx, t) => {
    P.board(ctx, t); P.stars(ctx, t, { n: 90, seed: 95 });
    P.globe(ctx, 960, 560, 260, t, { lon0: -t * 18, lat0: 20 });
    P.arcArrow(ctx, 960, 560 - 290, 110, Math.PI * 0.85, Math.PI * 0.15, { ry: 26, color: C.gold });
    const G4 = [['SUNRISE', 'sun', 520, 300, C.gold], ['OCEANS', 'wave', 1400, 300, C.sky], ['WEATHER', 'hurricane', 520, 830, C.chalk], ['SHIELD', 'magnet', 1400, 830, C.mint]];
    G4.forEach(([s, ic, x, y, col], i) => { const k = P.pop(t, ev.c7_gifts[i], 0.4); if (k <= 0) return; P.at(ctx, x, y, k, 0, () => { if (ic === 'sun') P.sun(ctx, -150, 0, 46, t); else P.icon(ctx, ic, -150, 0, 70, { t }); G.text(ctx, s, -80, 22, { size: 64, fam: FT.title, color: col, align: 'left', boil: 0 }); });
      P.line(ctx, x + (x < 960 ? 180 : -200), y + (y < 560 ? 40 : -40), lerp(x, 960, 0.55), lerp(y, 560, 0.55), col, 3, clamp(k) * 0.5, 1, { dash: true }); });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S3 — back where we started: Axel and his tea, the planet turning; "until now."
  P.shot(ev.c7_s3, (ctx, t) => {
    P.board(ctx, t); P.stars(ctx, t, { n: 90, seed: 2, h: 640 });
    const z = lerp(1.08, 1, P.eio((t - ev.c7_s3) / 3));
    ctx.save(); ctx.translate(960, 700); ctx.scale(z, z); ctx.translate(-960, -700);
    P.globe(ctx, 960, 1380, 640, t, { lon0: -t * 18 + 40, lat0: 35, grid: 0.3 });
    P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(900, 745); c.lineTo(900, 640); c.moveTo(900, 690); c.lineTo(990, 690); c.lineTo(990, 745); c.moveTo(900, 690); c.lineTo(900, 600); }, '#C9A27A', 8, 1, { seed: 5 });
    const sip = t > ev.c7_now - 0.1 && t < ev.c7_now + 0.9;
    Ch.axel(ctx, { x: 920, y: 690, s: 0.95, t, pose: 'sit', gesture: 'cup', cup: sip ? 0.5 : 0, eyes: sip ? 'happy' : 'normal', mouth: Ch.axelMouth(t), look: 0.4, wind: 0.3 });
    ctx.restore();
    P.tag(ctx, 'still turning: 1,000+ km/h for most of us', 960, 200, t, ev.c7_thousand - 0.3, 1e9, { size: 46, border: C.gold });
    P.write(ctx, 'so smoothly, you never noticed.', 960, 330, t, ev.c7_thousand + 1.2, { size: 64, dur: 0.8 });
    P.stamp(ctx, 'UNTIL NOW.', 1460, 520, t, ev.c7_now, { size: 90, color: C.gold, rot: -0.05 });
  }, { in: { type: 'fade', dur: 0.6 } });

  // S5 — end card
  P.shot(ev.c7_s5, (ctx, t) => {
    P.board(ctx, t); P.stars(ctx, t, { n: 80, seed: 143 });
    const k = P.pop(t, ev.sync_logo, 0.5); const up = ease.inOutCubic(clamp((t - ev.c7_like + 0.4) / 0.6));
    ctx.save(); ctx.translate(W / 2, 520); ctx.scale(1 - 0.35 * up, 1 - 0.35 * up); ctx.translate(-W / 2, -520 - 330 * up);
    P.planet(ctx, W / 2, 430, 150 * k, t);
    if (k > 0) G.text(ctx, 'WHYVERSE', W / 2, 790, { size: 130, fam: FT.title, color: C.gold, align: 'center', alpha: clamp(k), boil: 0 });
    P.write(ctx, 'Big questions. Visual answers.', W / 2, 890, t, ev.sync_logo + 0.4, { size: 60, dur: 0.8 });
    ctx.restore();
    const kl = P.pop(t, ev.c7_like, 0.4); if (kl > 0) P.at(ctx, 640, 640, kl * (1 + 0.08 * Math.exp(-(t - ev.c7_like) * 6)), -0.04, () => {
      P.circle(ctx, 0, 0, 110, C.gold, 7, 1, { fill: C.gold, fillA: 0.18 });
      P.stroke(ctx, (c) => { c.beginPath(); P.rr(c, -52, -10, 30, 76, 8); c.moveTo(-14, -10); c.lineTo(10, -70); c.lineTo(34, -66); c.lineTo(26, -10); c.lineTo(62, -10); c.lineTo(62, 66); c.lineTo(-14, 66); c.closePath(); }, C.gold, 6, 1, { fill: C.gold, fillA: 0.5 });
      G.text(ctx, 'LIKE', 0, 180, { size: 50, fam: FT.title, color: C.chalk, align: 'center', boil: 0 }); });
    const ks = P.pop(t, ev.c7_sub, 0.4); if (ks > 0) { const pressed = t > ev.c7_sub + 0.5; P.at(ctx, 1180, 640, ks * (pressed ? 0.96 : 1), 0, () => {
      P.stroke(ctx, (c) => P.rr(c, -310, -70, 620, 140, 70), pressed ? C.dim : C.red, 6, 1, { fill: pressed ? C.dim : C.red, fillA: pressed ? 0.25 : 0.7 });
      G.text(ctx, pressed ? 'SUBSCRIBED' : 'SUBSCRIBE', 0, 24, { size: 64, fam: FT.title, color: C.chalk, align: 'center', boil: 0 }); });
      P.ring(ctx, 1180, 640, t, ev.c7_sub + 0.35, { r: 300, color: C.chalk, dur: 0.8 }); }
    P.tag(ctx, 'Instagram  @whyverse___', 640, 930, t, ev.c7_ig, 1e9, { size: 52, border: C.pink });
    P.tag(ctx, 'TikTok  @Whyverse', 1280, 930, t, ev.c7_tt, 1e9, { size: 52, border: C.sky });
    const u = clamp((t - ev.c7_s5) / 1.5); Ch.axel(ctx, { x: lerp(-150, 230, ease.outCubic(u)), y: 760, s: 0.8, t, pose: u < 1 ? 'walk' : 'stand', phase: t, eyes: 'happy', gesture: u >= 1 ? 'wave' : 'idle', mouth: Ch.axelMouth(t) });
  }, { in: { type: 'iris', at: [W / 2, 430], color: '#0E1628' } });
})();
