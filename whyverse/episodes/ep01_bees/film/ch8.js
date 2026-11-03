// Chapter 8 — payoff, tease, end card.
(function () {
  const { U, G, Ch, P, SCORE: S, Shots, Data } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  // S1 — the quote card returns
  P.shot(ev.c8_s1, (ctx, t, s) => {
    P.nightBg(ctx, t, { stars: 150 });
    P.at(ctx, W / 2, 470, 0.85, -0.03, () => { G.tornPaper(ctx, -620, -230, 1240, 460, { fill: C.cream, seed: 12, tear: 5 });
      G.text(ctx, '“If the bee disappeared…', -540, -90, { size: 80, fam: FT.hand, color: C.ink }); G.text(ctx, '…four years left to live.”', -540, 20, { size: 80, fam: FT.hand, color: C.ink });
      G.text(ctx, '— Albert Einstein', 0, 160, { size: 62, fam: FT.marker, weight: 400, color: C.navy }); G.line(ctx, [[-10, 140], [560, 136]], { color: C.red, lw: 9, seed: 5 }); });
    P.stamp(ctx, 'FAKE', 1500, 260, t, ev.c8_s1 + 0.4, { size: 110, rot: 0.12 });
    P.note(ctx, 'but a real question', 960, 920, t, ev.c8_reason, 1e9, { size: 64, seed: 4, fill: C.gold });
    Ch.bee(ctx, { x: 360 + Math.sin(t) * 30, y: 820, s: 0.9, t, eyes: t > ev.c8_reason ? 'happy' : 'normal', mouth: P.talk(t), armR: 0.5 });
  }, { in: { type: 'dip', color: '#1A2045' }, cam: Shots.push(1.0, 1.05) });

  // S2 — the plate as a constellation of tiny deliveries
  P.shot(ev.c8_s2, (ctx, t, s) => {
    P.nightBg(ctx, t, { stars: 80, top: '#1E2550', bottom: '#2E2A5C' });
    const items = ['apple', 'almond', 'cherry', 'blueberry', 'pumpkin', 'melon', 'carrot'];
    G.ellipse(ctx, W / 2, 620, 330, 300, { fill: '#FFFFFF', seed: 3, lw: 5 });
    items.forEach((f, i) => { const a = i / 7 * 6.283 - 1.2; const x = W / 2 + Math.cos(a) * 180, y = 620 + Math.sin(a) * 160; P.food(ctx, f, x, y, 1.0);
      const fx = W / 2 + Math.cos(a) * 760, fy = 560 + Math.sin(a) * 430; const k = clamp((t - ev.c8_dots[i]) / 0.7);
      if (k > 0) { P.flower(ctx, fx, fy + 60, 0.6, { color: ['#E58FB0', '#B79CFF', '#F2B84B', '#EF7B5B'][i % 4], sway: 1, seed: 150 + i, t, stem: 80 });
        for (let j = 0; j < 14 * k; j++) { const v = j / 14; ctx.fillStyle = '#FFD25A'; ctx.beginPath(); ctx.arc(lerp(fx, x, v), lerp(fy, y, v) - Math.sin(v * Math.PI) * 60, 5, 0, 7); ctx.fill(); }
        const bv = ease.inOutQuad(k); Ch.bee(ctx, { x: lerp(fx, x, bv), y: lerp(fy, y, bv) - Math.sin(bv * Math.PI) * 60 - 30, s: 0.3, t: t + i, seed: i, alpha: 1 - clamp((k - 0.9) / 0.1) }); P.sparkle(ctx, x, y, t, ev.c8_dots[i] + 0.7, { seed: i }); } });
    P.note(ctx, 'a tiny delivery', W / 2, 1000, t, ev.c8_deliv, 1e9, { size: 64, seed: 5, fill: C.gold });
  }, { in: { type: 'fade', dur: 0.6 }, cam: Shots.push(1.0, 1.06) });

  // S4 — end card
  P.shot(ev.c8_s4, (ctx, t, s) => {
    P.nightBg(ctx, t, { stars: 200 });
    const k = P.pop(t, ev.sync_logo, 0.5); const up = ease.inOutCubic(clamp((t - ev.c8_cta) / 0.6));
    ctx.save(); ctx.translate(W / 2, 520); ctx.scale(1 - 0.3 * up, 1 - 0.3 * up); ctx.translate(-W / 2, -520 - 330 * up);
    P.planet(ctx, W / 2, 430, 150 * k, t);
    if (k > 0) G.text(ctx, 'WHYVERSE', W / 2, 760, { size: 120, fam: FT.title, weight: 400, color: C.gold, align: 'center', alpha: clamp(k) });
    P.words(ctx, [{ w: 'Big', t: ev.c8_tag }, { w: 'questions.', t: ev.c8_tag + 0.25 }, { w: 'Visual', t: ev.c8_tag + 0.6 }, { w: 'answers.', t: ev.c8_tag + 0.85 }], W / 2, 880, t, { size: 58, fam: FT.hand, color: '#FFF8E8', align: 'center', maxW: 1600 });
    ctx.restore();
    // call to action: like, subscribe, Instagram + TikTok
    const kl = P.pop(t, ev.c8_like, 0.4); if (kl > 0) P.at(ctx, 640, 700, kl * (1 + 0.08 * Math.exp(-(t - ev.c8_like) * 6)), -0.06, () => {
      G.ellipse(ctx, 0, 0, 110, 110, { fill: C.gold, seed: 91, lw: 6 });
      G.rrect(ctx, -52, -10, 30, 76, 8, { fill: '#FFF8E8', seed: 92, lw: 5 }); G.poly(ctx, [[-14, -10], [10, -70], [34, -66], [26, -10], [62, -10], [62, 66], [-14, 66]], { fill: '#FFF8E8', seed: 93, lw: 5 });
      G.text(ctx, 'LIKE', 0, 160, { size: 46, fam: FT.title, weight: 400, color: '#FFF8E8', align: 'center' }); });
    const ks = P.pop(t, ev.c8_sub, 0.4); if (ks > 0) { const pressed = t > ev.c8_sub + 0.5; P.at(ctx, 1180, 700, ks * (pressed ? 0.96 : 1), 0.02, () => {
      G.rrect(ctx, -310, -70, 620, 140, 70, { fill: pressed ? '#8A8378' : C.red, seed: 94, lw: 6 });
      G.text(ctx, pressed ? 'SUBSCRIBED' : 'SUBSCRIBE', 0, 24, { size: 60, fam: FT.title, weight: 400, color: '#FFF8E8', align: 'center' }); });
      if (t > ev.c8_sub + 0.35 && t < ev.c8_sub + 1.2) { const r = (t - ev.c8_sub - 0.35) * 260; ctx.strokeStyle = `rgba(255,248,232,${1 - (t - ev.c8_sub - 0.35) / 0.85})`; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(1180, 700, r, 0, 7); ctx.stroke(); }
      Ch.bee(ctx, { x: lerp(1750, 1560, ease.outCubic(clamp((t - ev.c8_sub) / 0.4))), y: 660 + Math.sin(t * 3) * 8, s: 0.45, t, facing: -1, eyes: 'happy', armR: 0.6 }); }
    P.note(ctx, 'Instagram  @whyverse___', 640, 990, t, ev.c8_ig, 1e9, { size: 58, seed: 95, fill: '#FBE3EA', rot: -0.03 });
    P.note(ctx, 'TikTok  @Whyverse', 1280, 990, t, ev.c8_tt, 1e9, { size: 58, seed: 96, fill: '#DDEFF8', rot: 0.03 });
    const u = clamp((t - ev.c8_s4) / 1.5); if (t < ev.c8_cta + 0.3) Ch.bee(ctx, { x: lerp(-150, 440, ease.outCubic(u)), y: 600 + Math.sin(t * 2) * 20, s: 0.8, t, eyes: 'happy', wave: u >= 1 ? 1 : 0, armR: u >= 1 ? 1.2 : -0.3, mouth: P.talk(t) || 'smile' });
  }, { in: { type: 'iris', at: [W / 2, 430], color: '#0E1230' }, cam: Shots.push(1.0, 1.03) });
})();
