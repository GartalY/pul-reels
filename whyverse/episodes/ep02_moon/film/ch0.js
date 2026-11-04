// Chapter 0 — cold open: the Moon vanishes, 1.3 s of borrowed light, then the night switches off → title.
(function () {
  const { U, G, Ch, P, SCORE: S, Shots, K } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const SUN0 = K.nrm([1, 0.25, 0.25]);
  const MOON0 = [3.0, 1.0, -2.6];
  // moon "pop": a quick swell then gone
  const vanishK = (t, t0) => (t < t0 ? 1 : t < t0 + 0.08 ? 1 + (t - t0) / 0.08 * 0.08 : Math.max(0, 1.08 * (1 - (t - t0 - 0.08) / 0.16)));

  // --- shot A: the vanishing ---
  P.shot(0, (ctx, t) => {
    const cam = K.path(t, [[0, K.cam([-0.7, 0.35, 3.3], [1.25, 0.45, -1.0], 44)], [ev.c0_s2, K.cam([-0.55, 0.45, 3.0], [1.3, 0.5, -1.0], 42)]]);
    const mk = vanishK(t, ev.c0_vanish);
    const light = t < ev.c0_off ? 1 : Math.max(0, 1 - (t - ev.c0_off) / 0.25);
    const p = K.scene(t, { cam, sun: SUN0, exposure: lerp(1.0, 0.85, 1 - light), earth: { spin: 2.2 + t * 0.03, lights: 1.8 }, moon: { pos: MOON0, r: 0.5, opacity: mk > 0 ? 1 : 0, light: 3.0 * light } });
    p.moon.r = 0.5 * mk;
    M3.draw(ctx, p);
    const mp = M3.project(MOON0), ep = M3.project([0, 0, 0]);
    // moonlight wash over the frame while the light is still arriving
    ctx.save(); ctx.globalAlpha = 0.18 * light; P.glow(ctx, mp[0], mp[1], 900, 'rgba(180,200,255,', 0.5); ctx.restore();
    if (t >= ev.c0_vanish) { P.ring(ctx, mp[0], mp[1], t, ev.c0_vanish, { r: 260, color: '230,235,255', dur: 0.7, lw: 8 }); P.sparkle(ctx, mp[0], mp[1], t, ev.c0_vanish, { n: 16, r: 200, color: '#E8EEFF', seed: 4 }); }
    P.kicker(ctx, 'A thought experiment', t, 0.3, { t1: ev.c0_s2 });
    P.tag(ctx, 'RIGHT NOW', mp[0], mp[1] + 190, t, ev.c0_now, ev.c0_vanish + 0.6, { size: 40 });
    // 1.3 s timer: light still in flight
    if (t > ev.c0_timer0 - 0.3) {
      const v = t < ev.c0_vanish ? 0 : Math.min(1.3, (t - ev.c0_vanish) * (1.3 / Math.max(0.6, ev.c0_off - ev.c0_vanish)));
      const k = P.pop(t, ev.c0_timer0 - 0.2) * P.fout(t, ev.c0_s2 - 0.1, 0.3);
      if (k > 0) P.at(ctx, 1500, 860, k, 0, () => { P.panel(ctx, -250, -95, 500, 190, {});
        G.text(ctx, v.toFixed(1) + ' s', 0, 30, { size: 96, fam: FT.title, weight: 400, color: t < ev.c0_off ? C.gold : C.white, align: 'center', boil: 0 });
        P.label(ctx, t < ev.c0_off ? 'light still on its way' : 'the last light has landed', 0, 72, { size: 24, align: 'center' }); });
    }
    // the last moonlight travelling to Earth
    if (t > ev.c0_beam - 0.1 && t < ev.c0_off + 0.4) {
      const u = clamp((t - ev.c0_beam) / Math.max(0.3, ev.c0_off - ev.c0_beam));
      const bx = lerp(mp[0], ep[0] + 120, u), by = lerp(mp[1], ep[1] - 60, u);
      ctx.save(); const a = t > ev.c0_off ? 1 - (t - ev.c0_off) / 0.4 : 1; ctx.globalAlpha = a;
      const gr = ctx.createLinearGradient(mp[0], mp[1], bx, by); gr.addColorStop(0, 'rgba(200,215,255,0)'); gr.addColorStop(1, 'rgba(220,230,255,0.8)');
      ctx.strokeStyle = gr; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(mp[0], mp[1]); ctx.lineTo(bx, by); ctx.stroke();
      P.glow(ctx, bx, by, 70, 'rgba(230,238,255,', 1); ctx.restore();
    }
    P.tag(ctx, 'MOONLIGHT: OFF', ep[0] + 80, ep[1] + 300, t, ev.c0_off + 0.1, ev.c0_s2, { size: 38, border: C.coral });
  }, { in: { type: 'fade', dur: 0.8 } });

  // --- shot B: Luna returns ("don't worry") ---
  const lunaBg = (ctx, t, earthX = 0.0) => {
    const cam = K.cam([0, 0.35, 4.6 + 0.05 * Math.sin(t * 0.2)], [earthX, 0, 0], 38);
    M3.draw(ctx, K.scene(t, { cam, sun: K.nrm([1, 0.3, 0.5]), earth: { pos: [2.4, -1.1, -2.2], r: 1.0, spin: t * 0.05 }, moon: { show: false } }));
  };
  P.shot(ev.c0_s2, (ctx, t) => {
    lunaBg(ctx, t);
    const k = P.pop(t, ev.c0_lunaIn, 0.5, 1.8);
    Ch.luna(ctx, { x: 640, y: 560, s: 2.3 * k, t, eyes: 'happy', mouth: Ch.lunaMouth(t), armR: 1.1, wave: 1, armL: -0.4 });
    P.ring(ctx, 640, 560, t, ev.c0_lunaIn, { r: 360, color: '230,235,255' });
    P.stamp(ctx, 'THOUGHT', 1380, 430, t, ev.c0_thought, { size: 110 });
    P.stamp(ctx, 'EXPERIMENT', 1380, 600, t, ev.c0_thought + 0.22, { size: 96, color: C.white, rot: 0.04 });
    P.tag(ctx, "not going anywhere", 1380, 780, t, L('c0_4').t + 0.6, 1e9, { size: 40, border: C.dim });
  }, { in: { type: 'flash', dur: 0.25 } });

  // --- shot C: what the Moon does — four tiles ---
  P.shot(ev.c0_s3, (ctx, t) => {
    lunaBg(ctx, t, 0.3);
    Ch.luna(ctx, { x: 420, y: 560, s: 1.7, t, eyes: 'normal', look: 0.8, mouth: Ch.lunaMouth(t), armR: 0.5 });
    const items = [['tide', 'TIDES'], ['night', 'NIGHTS'], ['coral', 'A REEF'], ['season', 'SEASONS?']];
    items.forEach(([ic, lb], i) => { const x = 900 + (i % 2) * 460, y = 330 + Math.floor(i / 2) * 400; const k = P.pop(t, ev.c0_icons[i], 0.4);
      if (k <= 0) return; P.at(ctx, x + 180, y + 150, k, 0, () => { P.panel(ctx, -180, -150, 360, 300, { glow: 0.3 * Math.exp(-(t - ev.c0_icons[i]) * 3) });
        P.icon(ctx, ic, 0, -30, 70, { color: i === 3 ? C.dim : C.gold, t }); G.text(ctx, lb, 0, 100, { size: 44, fam: FT.title, weight: 400, color: C.white, align: 'center', boil: 0 }); }); });
  }, { in: { type: 'push', dur: 0.5 } });

  // --- shot D: the question + title over a big Moon that pops at the end ---
  P.shot(ev.c0_s4, (ctx, t) => {
    const u = clamp((t - ev.c0_s4) / 9);
    const cam = K.cam([0, 0, 3.2 - 0.25 * u], [0, 0, 0], 36);
    const mk = vanishK(t, ev.titlePop);
    M3.draw(ctx, K.scene(t, { cam, sun: K.nrm([-1, 0.25, 0.75]), earth: { show: false }, moon: { pos: [0.55, 0.05, 0], r: 0.95 * mk, opacity: mk > 0 ? 1 : 0, spin: -1.6 + t * 0.04 } }));
    const mp = M3.project([0.55, 0.05, 0]);
    if (t > ev.titlePop) { P.ring(ctx, mp[0], mp[1], t, ev.titlePop, { r: 520, color: '230,235,255', dur: 0.8, lw: 10 }); P.sparkle(ctx, mp[0], mp[1], t, ev.titlePop, { n: 22, r: 380, color: '#E8EEFF', seed: 8 }); }
    // spoken question first, then the stamped title
    if (t < ev.title0 + 0.2) { const a = P.fout(t, ev.title0 + 0.2, 0.3); ctx.save(); ctx.globalAlpha = a; P.spoken(ctx, L('c0_6'), 620, 560, t, { size: 76, maxW: 900, key: /disappeared/ }); ctx.restore(); }
    const ws = ev.titleWords;
    P.words(ctx, ws.slice(0, 3).map((w) => ({ w: w.w, t: w.t })), 640, 430, t, { size: 120, align: 'center', color: C.white });
    P.words(ctx, [{ w: 'MOON', t: ws[3].t, color: C.gold }], 640, 600, t, { size: 190, align: 'center' });
    P.words(ctx, [{ w: 'DISAPPEARED?', t: ws[4].t }], 640, 740, t, { size: 104, align: 'center', color: C.white });
    const kb = P.pop(t, ev.titleBrand, 0.5);
    if (kb > 0) { P.planet(ctx, 520, 930, 34 * kb, t); G.text(ctx, 'WHYVERSE', 580, 948, { size: 46, fam: FT.title, weight: 400, color: C.gold, alpha: clamp(kb), boil: 0 }); }
  }, { in: { type: 'fade', dur: 0.6 } });
})();
