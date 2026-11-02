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

  // S3 — tease: the Moon
  P.shot(ev.c8_s3, (ctx, t, s) => {
    P.nightBg(ctx, t, { stars: 220 });
    const rise = ease.outCubic(clamp((t - ev.c8_moon + 0.4) / 1.6)); const gone = clamp((t - ev.sync_moon) / 0.25);
    const mx = W / 2 + 120, my = lerp(980, 430, rise);
    if (gone < 1) { ctx.save(); const sc = 1 + gone * 0.5; ctx.globalAlpha *= 1 - gone; const g = ctx.createRadialGradient(mx, my, 150, mx, my, 330); g.addColorStop(0, 'rgba(240,236,220,0.35)'); g.addColorStop(1, 'rgba(240,236,220,0)'); ctx.fillStyle = g; ctx.fillRect(mx - 340, my - 340, 680, 680);
      G.ellipse(ctx, mx, my, 210 * sc, 210 * sc, { fill: '#E9E4D6', seed: 7, lw: 5, hatch: { color: 'rgba(90,85,78,0.25)', gap: 9 } }); for (let k = 0; k < 7; k++) { const a = U.hash(k, 1) * 6.28, d = U.hash(k, 2) * 140; G.ellipse(ctx, mx + Math.cos(a) * d * sc, my + Math.sin(a) * d * sc, (20 + 30 * U.hash(k, 3)) * sc, (20 + 30 * U.hash(k, 3)) * sc, { fill: '#CFC8B6', seed: 20 + k, lw: 3 }); } ctx.restore(); }
    P.sparkle(ctx, mx, my, t, ev.sync_moon, { n: 18, r: 300, color: '#FFF4D6' });
    if (gone > 0) { ctx.save(); ctx.setLineDash([18, 16]); ctx.strokeStyle = 'rgba(255,244,214,0.6)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(mx, my, 210, 0, 7); ctx.stroke(); ctx.restore(); G.text(ctx, '?', mx, my + 70, { size: 220, fam: FT.title, weight: 400, color: C.gold, align: 'center', alpha: gone }); }
    G.shape(ctx, [[-300, 900], [500, 840], [1200, 900], [2200, 850], [2200, 1400], [-300, 1400]], { fill: '#2C4A57', seed: 30, hatch: { color: 'rgba(0,0,0,0.2)', gap: 9 } });
    P.note(ctx, 'next time', 360, 200, t, ev.c8_s3 + 0.3, 1e9, { size: 60, seed: 6, fill: C.gold, rot: -0.05 });
    Ch.bee(ctx, { x: 360, y: 700, s: 0.8, t, eyes: t > ev.sync_moon ? 'wide' : 'normal', mouth: t > ev.sync_moon && t < ev.sync_moon + 1.2 ? 'o' : P.talk(t), look: 0.8, lookY: -0.5 });
  }, { in: { type: 'fade', dur: 0.5 }, cam: (s) => Shots.combine(Shots.push(1.0, 1.05), Shots.shake(14, ev.sync_moon - s.t0, 6))(s) });

  // S4 — end card
  P.shot(ev.c8_s4, (ctx, t, s) => {
    P.nightBg(ctx, t, { stars: 200 });
    const k = P.pop(t, ev.sync_logo, 0.5); P.planet(ctx, W / 2, 430, 150 * k, t);
    if (k > 0) G.text(ctx, 'WHYVERSE', W / 2, 760, { size: 120, fam: FT.title, weight: 400, color: C.gold, align: 'center', alpha: clamp(k) });
    P.words(ctx, [{ w: 'Big', t: ev.c8_tag }, { w: 'questions.', t: ev.c8_tag + 0.25 }, { w: 'Visual', t: ev.c8_tag + 0.6 }, { w: 'answers.', t: ev.c8_tag + 0.85 }], W / 2, 880, t, { size: 58, fam: FT.hand, color: '#FFF8E8', align: 'center', maxW: 1600 });
    const u = clamp((t - ev.c8_s4) / 1.5); Ch.bee(ctx, { x: lerp(-150, 440, ease.outCubic(u)), y: 600 + Math.sin(t * 2) * 20, s: 0.8, t, eyes: 'happy', wave: u >= 1 ? 1 : 0, armR: u >= 1 ? 1.2 : -0.3, mouth: P.talk(t) || 'smile' });
  }, { in: { type: 'iris', at: [W / 2, 430], color: '#0E1230' }, cam: Shots.push(1.0, 1.03) });
})();
