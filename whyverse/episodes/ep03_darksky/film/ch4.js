// Chapter 4 — A poet's answer: Poe's Eureka, light takes time, look-back times, the 13.8-billion-year bubble, gaps, Webb, Kelvin.
(function () {
  const { U, G, Ch, P, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const bg = (ctx, t) => { P.sky(ctx, t, { stars: 1, seed: 51 }); P.icon(ctx, 'raven', 1600, 260 + Math.sin(t * 1.5) * 20, 90, { t }); P.icon(ctx, 'book', 320, 280, 90, { color: C.magenta, t }); };
  P.cardShot('c4', 4, "A poet's answer", bg);

  // S1 — Edgar Allan Poe, 1848, The Raven, Eureka → his idea as a quote that lights up as it's spoken
  const QUOTE = ['“…the', 'distance', 'of', 'the', 'invisible', 'background', 'so', 'immense', 'that', 'no', 'ray', 'from', 'it', 'has', 'yet', 'been', 'able', 'to', 'reach', 'us', 'at', 'all.”'];
  P.shot(ev.c4_s1, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.6, seed: 53 });
    const kp = P.pop(t, ev.c4_poe, 0.45); P.bust(ctx, 'poe', 400, 470, 1.6 * kp, kp, t);
    if (kp > 0) P.text(ctx, 'EDGAR ALLAN POE', 400, 820, { size: 50, fam: FT.title, weight: 400, color: C.magenta, align: 'center', alpha: clamp(kp) });
    const kr = P.pop(t, ev.c4_raven, 0.4); if (kr > 0) P.icon(ctx, 'raven', 620, 280 + Math.sin(t * 2) * 6, 70 * kr, { t });
    P.tag(ctx, '1848', 400, 130, t, ev.c4_1848, 1e9, { size: 50, border: C.gold });
    const kb = P.pop(t, ev.c4_eureka, 0.45); if (kb > 0) P.at(ctx, 1260, 330, kb, -0.04, () => { P.box(ctx, -300, -150, 600, 300, C.gold, { r: 18, lw: 4 }); P.sign(ctx, 'EUREKA', 0, 20, { size: 110, color: C.gold }); P.label(ctx, 'an essay on the universe', 0, 100, { align: 'center', size: 28, color: C.white }); });
    // the quote (his words, from Eureka)
    const q0 = ev.c4_quote, q1 = L('c4_3').end; if (t > q0 - 0.3) { const a = P.fin(t, q0 - 0.3, 0.4); P.box(ctx, 800, 560, 1000, 400, C.violet, { r: 24, lw: 3, a });
      let x = 850, y = 650; QUOTE.forEach((w, i) => { const wt = lerp(q0, q1, i / QUOTE.length); const ww = P.measure(ctx, w + ' ', 44, FT.ui, 700); if (x + ww > 1760) { x = 850; y += 62; }
        G.text(ctx, w, x, y, { size: 44, fam: FT.ui, weight: 700, color: /immense|reach/.test(w) ? C.gold : C.white, alpha: a * (0.2 + 0.8 * P.fin(t, wt, 0.15)), boil: 0 }); x += ww; });
      P.label(ctx, '— Poe, Eureka (1848)', 1760, 930, { align: 'right', size: 26, alpha: a }); }
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — light is fast, not infinitely fast; the universe hasn't been around forever
  P.shot(ev.c4_s2, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.7, seed: 55 });
    P.earth(ctx, 200, 560, 70, t, { spin: t });
    const ph = clamp((t - ev.c4_s2 - 0.2) / 2.2); const x = lerp(1780, 290, ease.inOutQuad(ph));
    P.spark(ctx, 1780, 560, 9, C.hot, 1); P.wave(ctx, x, Math.min(1780, x + 260), 560, 90, 26, C.gold, { phase: t * 12, lw: 5 });
    P.counter(ctx, { x: 960, y: 260, from: 0, to: 299792, t, t0: ev.c4_fast - 0.6, t1: ev.c4_fast, size: 100, suffix: ' km/s', sub: 'speed of light', color: C.gold });
    P.tag(ctx, 'fast — but not infinite', 960, 800, t, ev.c4_fast + 0.3, 1e9, { size: 44, border: C.gold });
    const kf = P.pop(t, ev.c4_forever, 0.4); if (kf > 0) { P.icon(ctx, 'clock', 960, 940, 60 * kf, { color: C.cyan, t }); }
    P.stamp(ctx, 'NOT FOREVER', 1440, 940, t, ev.c4_forever, { size: 64, color: C.cyan });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S3 — looking out = looking back: Moon ~1 s, Sun ~8 min, Andromeda 2.5 million years
  P.shot(ev.c4_s3, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.7, seed: 57 });
    P.kicker(ctx, 'What you see is old light', t, ev.c4_s3 + 0.1);
    const cards = [[ev.c4_moon, 'moon', 'THE MOON', '~1 second ago', C.white], [ev.c4_sun, 'sun', 'THE SUN', '~8 minutes ago', C.gold], [ev.c4_25 - 0.5, 'galaxy', 'ANDROMEDA', '2.5 million years ago', C.magenta]];
    cards.forEach(([t0, ic, name, ago, col], i) => { const k = P.pop(t, i === 2 ? ev.c4_andro : t0, 0.45); if (k <= 0) return; const x = 400 + i * 560;
      P.at(ctx, x, 560, k, 0, () => { P.box(ctx, -240, -260, 480, 520, col, { r: 30, lw: 3 });
        if (ic === 'moon') { P.circle(ctx, 0, -70, 90, C.white, 5, 1, { fill: '#D8D4CC', fillA: 0.85 }); }
        else if (ic === 'sun') P.icon(ctx, 'sun', 0, -70, 110, { t }); else P.icon(ctx, 'galaxy', 0, -70, 120, { color: C.magenta, t });
        P.text(ctx, name, 0, 110, { size: 46, fam: FT.title, weight: 400, color: col, align: 'center' });
        P.text(ctx, ago, 0, 185, { size: 40, color: C.white, align: 'center', alpha: P.fin(t, (i === 2 ? ev.c4_25 : t0) + 0.2, 0.3) }); }); });
  }, { in: { type: 'push', dur: 0.5 } });

  // S4 — 13.8 billion years: only light from inside a bubble has reached us; the rest is still on its way
  P.shot(ev.c4_s4, (ctx, t) => {
    P.sky(ctx, t, { stars: 0, haze: 0.3 });
    const cx = 960, cy = 590, R = lerp(60, 400, P.eio((t - ev.c4_bubble + 0.4) / 1.6));
    // stars everywhere; inside the bubble they shine, outside they're dark outlines with light still travelling
    for (let i = 0; i < 260; i++) { const x = U.hash(i, 61) * W, y = 150 + U.hash(i, 62) * 880, d = Math.hypot(x - cx, y - cy); const inside = d < R;
      if (inside) { ctx.fillStyle = C.star; ctx.fillRect(x - 2.5, y - 2.5, 5, 5); } else { ctx.save(); ctx.globalAlpha = 0.35; ctx.strokeStyle = C.dim; ctx.lineWidth = 1.5; ctx.strokeRect(x - 3, y - 3, 6, 6); ctx.restore();
        if (t > ev.c4_way - 0.5 && i % 9 === 0) { const ph = ((t - ev.c4_way) * 0.25 + U.hash(i, 63)) % 1; const k = clamp(ph); P.line(ctx, lerp(x, cx, k * 0.5), lerp(y, cy, k * 0.5), lerp(x, cx, k * 0.5 + 0.05), lerp(y, cy, k * 0.5 + 0.05), C.gold, 3, 0.8); } } }
    P.circle(ctx, cx, cy, R, C.cyan, 4, 1, { core: false }); P.earth(ctx, cx, cy, 26, t, { spin: t });
    P.counter(ctx, { x: 960, y: 160, from: 0, to: 13.8, t, t0: ev.c4_138a, t1: ev.c4_138, size: 96, decimals: 1, suffix: ' billion years', sub: 'age of the universe', color: C.gold });
    P.tag(ctx, 'light that had time to reach us', cx, cy + R + 50, t, ev.c4_bubble, 1e9, { size: 36, border: C.cyan });
    P.tag(ctx, 'still on its way', 1620, 980, t, ev.c4_way, 1e9, { size: 40, border: C.gold });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — inside the bubble: an enormous number of stars, but not enough to cover the sky → gaps
  P.shot(ev.c4_s5, (ctx, t) => {
    P.sky(ctx, t, { stars: 0, haze: 0.3 });
    const k = P.fin(t, ev.c4_enorm, 1.2); P.stars(ctx, t, { n: Math.round(200 + 1600 * k), seed: 65, size: 1.1 });
    for (let i = 0; i < 6; i++) P.icon(ctx, 'galaxy', 200 + U.hash(i, 66) * 1500, 200 + U.hash(i, 67) * 600, 40 + 30 * U.hash(i, 68), { color: [C.cyan, C.magenta, C.violet][i % 3], a: k, t });
    P.hbar(ctx, { x: 460, y: 900, w: 1000, h: 50, frac: 0.012, t, t0: ev.c4_cover, d: 0.6, color: C.gold, label: 'sky covered by stars', value: 'a tiny fraction' });
    // gaps highlighted
    [[480, 380], [1100, 300], [1460, 560], [760, 640]].forEach(([x, y], i) => { const kg = P.pop(t, ev.c4_gaps + i * 0.1, 0.35); if (kg > 0) P.circle(ctx, x, y, 70 * kg, C.cyan, 4, kg, { core: false }); });
    P.stamp(ctx, 'GAPS', 960, 160, t, ev.c4_gaps, { size: 110, color: C.cyan });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — Webb looks deep into the bubble: galaxies whose light left < 300 million years after the Big Bang
  P.shot(ev.c4_s6, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.6, seed: 69 });
    const kw = P.pop(t, ev.c4_webb, 0.45); P.icon(ctx, 'webb', 320, 520, 150 * kw, { a: clamp(kw), t });
    const kz = P.fin(t, ev.c4_spot, 0.6); P.line(ctx, 470, 470, lerp(470, 900, kz), lerp(470, 300, kz), C.gold, 3, kz);
    if (kz > 0) { P.box(ctx, 900, 160, 760, 620, C.gold, { r: 10, lw: 3, a: kz }); ctx.save(); ctx.beginPath(); ctx.rect(900, 160, 760, 620); ctx.clip();
      for (let i = 0; i < 40; i++) { const x = 900 + U.hash(i, 71) * 760, y = 160 + U.hash(i, 72) * 620; P.glow(ctx, x, y, 14 + 26 * U.hash(i, 73), [C.amber, C.coral, '#FFF0C8', C.violet][i % 4], 0.7 * kz); }
      const hx = 1300, hy = 450; P.glow(ctx, hx, hy, 40, '#FF4A3A', kz); P.circle(ctx, hx, hy, 46 + 4 * Math.sin(t * 4), C.red, 3, kz, { core: false }); ctx.restore(); }
    P.counter(ctx, { x: 1280, y: 930, from: 0, to: 300, t, t0: ev.c4_300 - 0.3, t1: ev.c4_300 + 0.4, size: 80, prefix: '< ', suffix: ' million yrs', sub: 'after the Big Bang', color: C.coral });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S7 — Lord Kelvin, 1901: the numbers. 10^23 years needed; the universe is trillions of times too young; stars burn out
  P.shot(ev.c4_s7, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.5, seed: 73 });
    const kk = P.pop(t, ev.c4_kelvin, 0.45); P.bust(ctx, 'kelvin', 280, 400, 1.1 * kk, kk, t);
    if (kk > 0) { P.text(ctx, 'LORD KELVIN', 280, 640, { size: 44, fam: FT.title, weight: 400, color: C.coral, align: 'center', alpha: clamp(kk) }); P.label(ctx, '1901', 280, 690, { align: 'center', alpha: clamp(kk), color: C.white }); }
    P.tag(ctx, 'the math works ✓', 280, 790, t, ev.c4_works, 1e9, { size: 36, border: C.green });
    // log scale of time (years), 10^9 … 10^24
    const X0 = 620, X1 = 1780, Y = 560; const lx = (e) => X0 + (e - 9) / 15 * (X1 - X0); const ka = P.fin(t, ev.c4_works, 0.6);
    P.line(ctx, X0, Y, X1, Y, C.violet, 4, ka); for (let e = 9; e <= 24; e += 3) { P.line(ctx, lx(e), Y - 12, lx(e), Y + 12, C.violet, 3, ka); P.label(ctx, '10^' + e, lx(e), Y + 54, { align: 'center', size: 26, alpha: ka }); }
    P.label(ctx, 'years (log scale: each tick = ×1,000)', X0, Y + 110, { size: 24, alpha: ka });
    const ku = P.pop(t, ev.c4_works + 0.3, 0.4); if (ku > 0) { P.circle(ctx, lx(10.14), Y, 14, C.gold, 4, ku, { fill: true, fillA: 0.9 }); P.text(ctx, 'UNIVERSE: 13.8 BILLION', lx(10.14), Y - 50, { size: 34, fam: FT.title, weight: 400, color: C.gold, align: 'center', alpha: clamp(ku) }); }
    const kn = P.fin(t, ev.c4_1023 - 0.6, 0.8); if (kn > 0) { P.line(ctx, lx(10.14), Y - 110, lx(23), Y - 110, C.coral, 6, 1, ease.outCubic(kn)); P.arrow(ctx, lx(10.14), Y - 110, lx(23), Y - 110, { color: C.coral, k: ease.outCubic(kn) }); if (kn >= 1) { P.circle(ctx, lx(23), Y, 14, C.coral, 4, 1, { fill: true, fillA: 0.9 }); P.text(ctx, 'NEEDED: ~10^23', lx(23) - 40, Y - 150, { size: 34, fam: FT.title, weight: 400, color: C.coral, align: 'center' }); } }
    P.stamp(ctx, 'TRILLIONS OF TIMES TOO YOUNG', 1200, 260, t, ev.c4_young, { size: 56, color: C.magenta });
    // a star burning out
    const kb = P.fin(t, ev.c4_burn, 1.6); if (t > ev.c4_burn - 0.4) { const r = lerp(70, 14, kb); P.glow(ctx, 1200, 900, r * 3, P.mix('#FFE7A0', '#FF3B3B', kb), 1 - kb * 0.6); P.circle(ctx, 1200, 900, r, P.mix('#FFE7A0', '#C2402A', kb), 4, 1, { fill: true, fillA: 0.9 }); P.label(ctx, 'stars burn out first', 1420, 910, { size: 30, color: C.white, alpha: P.fin(t, ev.c4_burn, 0.3) }); }
  }, { in: { type: 'fade', dur: 0.4 } });
})();
