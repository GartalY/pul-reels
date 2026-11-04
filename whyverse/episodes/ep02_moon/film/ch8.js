// Chapter 8 — payoff + end card (call to action, no tease).
(function () {
  const { U, G, Ch, P, SCORE: S, Shots, K } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const MOONP = [3.0, 1.0, -2.6];
  // S1 — a darker, quieter, wobblier planet (no Moon)
  P.shot(ev.c8_s1, (ctx, t) => {
    const u = clamp((t - ev.c8_s1) / 10);
    M3.draw(ctx, K.scene(t, { cam: K.cam([-0.7, 0.35, 3.3 - 0.25 * u], [1.25, 0.45, -1.0], 44), sun: K.nrm([1, 0.25, 0.25]), exposure: 0.85, earth: { spin: 2.4 + t * 0.03, lights: 1.8, tiltDeg: 23.4 + 4 * Math.sin(t * 0.9) }, moon: { show: false } }));
    ['DARKER', 'QUIETER', 'WOBBLIER'].forEach((w, i) => P.stamp(ctx, w, 1420, 300 + i * 170, t, ev.c8_adj[i], { size: 92, color: i === 1 ? C.white : C.gold, rot: -0.05 + i * 0.04 }));
    P.tag(ctx, "we wouldn't all die", 1420, 860, t, L('c8_1').t + 1.2, 1e9, { size: 40, border: C.dim });
  }, { in: { type: 'fade', dur: 0.7 } });

  // S2 — what we'd miss, then what it does (callback to the cold-open tiles)
  P.shot(ev.c8_s2, (ctx, t) => {
    P.spaceBg(ctx, t);
    const miss = [['tide', 'SMALLER TIDES'], ['eclipse', 'NO ECLIPSES'], ['clock', 'LOST CLOCKS']];
    const flip = clamp((t - (L('c8_2b').t - 0.3)) / 0.5);
    if (flip < 1) { ctx.save(); ctx.globalAlpha = 1 - flip; miss.forEach(([ic, lb], i) => { const k = P.pop(t, ev.c8_list[i], 0.4); if (k <= 0) return; const x = 420 + i * 540;
      P.at(ctx, x, 520, k, 0, () => { P.panel(ctx, -230, -200, 460, 400, {}); P.icon(ctx, ic, 0, -50, 80, { color: C.dim, t }); P.icon(ctx, 'cross', 110, -130, 34, { color: C.coral }); G.text(ctx, lb, 0, 140, { size: 44, fam: FT.title, weight: 400, color: C.white, align: 'center', boil: 0 }); }); }); ctx.restore(); }
    if (flip > 0) { const does = [['night', 'LIGHTS OUR NIGHTS'], ['tide', 'LIFTS OUR OCEANS'], ['season', 'HELPS STEADY SEASONS'], ['clock', 'SLOWS OUR SPIN']];
      does.forEach(([ic, lb], i) => { const k = P.pop(t, ev.c8_rec[i], 0.4); if (k <= 0) return; const x = 300 + i * 440; P.at(ctx, x, 520, k, 0, () => { P.panel(ctx, -200, -190, 400, 380, { glow: 0.35 * Math.exp(-(t - ev.c8_rec[i]) * 3) }); P.icon(ctx, ic, 0, -50, 72, { color: C.gold, t });
        G.text(ctx, lb, 0, 120, { size: 34, fam: FT.title, weight: 400, color: C.white, align: 'center', boil: 0 }); }); });
      Ch.luna(ctx, { x: 960, y: 900, s: 0.75 * P.pop(t, ev.c8_rec[0], 0.5), t, eyes: 'happy', mouth: Ch.lunaMouth(t), armL: 1.1, armR: 1.1 }); }
  }, { in: { type: 'fade', dur: 0.5 } });

  // S3 — the Moon comes back: beauty orbit
  P.shot(ev.c8_s3, (ctx, t) => {
    const u = clamp((t - ev.c8_s3) / 6); const back = ease.inOutCubic(clamp((t - ev.c8_s3) / 1.4));
    M3.draw(ctx, K.scene(t, { cam: K.cam([-0.55 + 0.2 * u, 0.45, 3.0], [1.3, 0.5, -1.0], 42), sun: K.nrm([1, 0.25, 0.25]), earth: { spin: 2.6 + t * 0.03, lights: 1.8 }, moon: { pos: MOONP, r: 0.5 * (0.6 + 0.4 * ease.outBack(back, 1.6)), opacity: back, light: 3 * back } }));
    ctx.save(); ctx.globalAlpha = 0.18 * back; const mq = M3.project(MOONP); P.glow(ctx, mq[0], mq[1], 900, 'rgba(180,200,255,', 0.5); ctx.restore();
    const mp = M3.project(MOONP); if (t < ev.c8_s3 + 1.5) P.ring(ctx, mp[0], mp[1], t, ev.c8_s3 + 0.3, { r: 300, color: '230,235,255', dur: 1.0 });
    P.tag(ctx, 'shaping Earth since the day it was born', 960, 960, t, ev.c8_born - 0.4, 1e9, { size: 38 });
  }, { in: { type: 'fade', dur: 0.6 } });

  // S4 — two supermoons: go outside and look up
  P.shot(ev.c8_s4, (ctx, t) => {
    const sky = ctx.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#0E1638'); sky.addColorStop(0.7, '#3A3A6E'); sky.addColorStop(1, '#C0745A'); ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    P.stars(ctx, t, { a: 0.6, y1: 600 });
    const rise = ease.outCubic(clamp((t - ev.c8_s4) / 5)); P.moonDisc(ctx, 1300, lerp(900, 380, rise), 150, { glow: 1.0 });
    ctx.fillStyle = '#0B0E1C'; ctx.beginPath(); ctx.moveTo(0, H); for (let i = 0; i <= 24; i++) ctx.lineTo(i * 80, 900 - 26 * U.hash(i, 9) - (i > 4 && i < 9 ? 40 : 0)); ctx.lineTo(W, H); ctx.fill();
    const kl = clamp((t - ev.c8_look) / 0.6); for (let i = 0; i < 4; i++) P.icon(ctx, 'person', 330 + i * 120, 840 - 10 * U.hash(i, 2), 84, { color: '#0B0E1C' });
    Ch.luna(ctx, { x: 600, y: lerp(760, 640, kl), s: 0.55, t, eyes: 'happy', mouth: Ch.lunaMouth(t), armR: 1.2, wave: clamp((t - ev.c8_thanks) / 0.3), alpha: kl });
    P.tag(ctx, 'SUPERMOON · 24 NOV', 520, 220, t, ev.c8_nov, 1e9, { size: 46 });
    P.tag(ctx, 'SUPERMOON · 24 DEC', 520, 330, t, ev.c8_dec, 1e9, { size: 46 });
    P.label(ctx, 'closest full moon of 2026 (23 Dec in the Americas)', 520, 410, { size: 24, align: 'center', alpha: clamp((t - ev.c8_dec - 0.4) / 0.4) });
    P.stamp(ctx, 'LOOK UP', 1300, 700, t, ev.c8_look + 0.3, { size: 80, color: C.white });
  }, { in: { type: 'fade', dur: 0.6 } });

  // S5 — end card
  P.shot(ev.c8_s5, (ctx, t) => {
    P.spaceBg(ctx, t);
    const k = P.pop(t, ev.sync_logo, 0.5); const up = ease.inOutCubic(clamp((t - ev.c8_like + 0.4) / 0.6));
    ctx.save(); ctx.translate(W / 2, 520); ctx.scale(1 - 0.35 * up, 1 - 0.35 * up); ctx.translate(-W / 2, -520 - 330 * up);
    P.planet(ctx, W / 2, 430, 150 * k, t);
    if (k > 0) G.text(ctx, 'WHYVERSE', W / 2, 760, { size: 120, fam: FT.title, weight: 400, color: C.gold, align: 'center', alpha: clamp(k), boil: 0 });
    P.words(ctx, [{ w: 'Big', t: ev.sync_logo + 0.3 }, { w: 'questions.', t: ev.sync_logo + 0.5 }, { w: 'Visual', t: ev.sync_logo + 0.8 }, { w: 'answers.', t: ev.sync_logo + 1.0 }], W / 2, 870, t, { size: 54, fam: FT.ui, weight: 800, color: C.white, align: 'center' });
    ctx.restore();
    const kl = P.pop(t, ev.c8_like, 0.4); if (kl > 0) P.at(ctx, 640, 640, kl * (1 + 0.08 * Math.exp(-(t - ev.c8_like) * 6)), -0.04, () => {
      ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(0, 0, 110, 0, 7); ctx.fill(); ctx.fillStyle = C.navyD;
      P.rr(ctx, -52, -10, 30, 76, 8); ctx.fill(); ctx.beginPath(); ctx.moveTo(-14, -10); ctx.lineTo(10, -70); ctx.lineTo(34, -66); ctx.lineTo(26, -10); ctx.lineTo(62, -10); ctx.lineTo(62, 66); ctx.lineTo(-14, 66); ctx.closePath(); ctx.fill();
      G.text(ctx, 'LIKE', 0, 170, { size: 46, fam: FT.title, weight: 400, color: C.white, align: 'center', boil: 0 }); });
    const ks = P.pop(t, ev.c8_sub, 0.4); if (ks > 0) { const pressed = t > ev.c8_sub + 0.5; P.at(ctx, 1180, 640, ks * (pressed ? 0.96 : 1), 0, () => {
      P.rr(ctx, -310, -70, 620, 140, 70); ctx.fillStyle = pressed ? '#5D6375' : C.red; ctx.fill();
      G.text(ctx, pressed ? 'SUBSCRIBED' : 'SUBSCRIBE', 0, 24, { size: 60, fam: FT.title, weight: 400, color: C.white, align: 'center', boil: 0 }); });
      P.ring(ctx, 1180, 640, t, ev.c8_sub + 0.35, { r: 300, color: '255,255,255', dur: 0.8 }); }
    P.tag(ctx, 'Instagram  @whyverse___', 640, 930, t, ev.c8_ig, 1e9, { size: 50, border: C.pink });
    P.tag(ctx, 'TikTok  @Whyverse', 1280, 930, t, ev.c8_tt, 1e9, { size: 50, border: '#7FE7FF' });
    const u = clamp((t - ev.c8_s5) / 1.5); Ch.luna(ctx, { x: lerp(-150, 260, ease.outCubic(u)), y: 560, s: 0.8, t, eyes: 'happy', wave: u >= 1 ? 1 : 0, armR: 1.2, mouth: Ch.lunaMouth(t) });
  }, { in: { type: 'iris', at: [W / 2, 430], color: '#05070E' } });
})();
