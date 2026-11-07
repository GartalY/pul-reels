// Chapter 2 — Far away doesn't help: onion shells, ×4 fainter, ×4 as many, they cancel, light piles up, the oven.
(function () {
  const { U, G, Ch, P, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const ringsBg = (ctx, t) => { P.sky(ctx, t, { stars: 0.6, seed: 31 }); for (let i = 1; i <= 7; i++) P.circle(ctx, 960, 560, i * 110 + (t * 20) % 110, C.violet, 2, 0.25, { core: false }); };
  P.cardShot('c2', 2, "Far away doesn't help", ringsBg);
  const SHC = [C.cyan, C.violet, C.magenta, C.coral, C.gold];

  // S1 — shells around us, like an onion, all the same thickness
  P.shot(ev.c2_s1, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.2, seed: 33, haze: 0.25 });
    const cx = 960, cy = 560; P.earth(ctx, cx, cy, 34, t, { spin: t });
    ev.c2_shells.forEach((t0, i) => { const k = P.pop(t, t0, 0.4, 1.3); if (k <= 0) return; const r = (i + 1) * 92;
      P.circle(ctx, cx, cy, r * k, SHC[i], 4, 0.9, { core: false });
      const n = 6 * (i + 1) * (i + 1) / 2 + 4; for (let j = 0; j < n; j++) { const an = U.hash(j, 50 + i) * 6.283, rr = r - 30 + 30 * U.hash(j, 60 + i); ctx.fillStyle = C.star; ctx.globalAlpha = k * 0.85; ctx.fillRect(cx + Math.cos(an) * rr * k - 2, cy + Math.sin(an) * rr * k - 2, 4, 4); } ctx.globalAlpha = 1; });
    // thickness bracket
    const kt = P.fin(t, ev.c2_same, 0.4); if (kt > 0) for (let i = 0; i < 5; i++) { const x0 = cx + i * 92 + 4, x1 = cx + (i + 1) * 92 - 4; P.line(ctx, x0, cy + 6, x1, cy + 6, C.white, 3, kt); P.label(ctx, 'd', (x0 + x1) / 2, cy + 46, { align: 'center', size: 28, color: C.white, alpha: kt }); }
    const ko = P.pop(t, ev.c2_onion, 0.4); if (ko > 0) P.at(ctx, 1600, 300, ko, 0, () => { for (let i = 1; i <= 5; i++) P.tube(ctx, (c) => { c.beginPath(); c.ellipse(0, 20, i * 22, i * 26, 0, 0, 7); }, C.magenta, 3, 0.8, { core: false }); P.tube(ctx, (c) => { c.beginPath(); c.moveTo(0, -120); c.quadraticCurveTo(10, -150, 30, -165); }, C.green, 4, 1); P.label(ctx, 'like an onion', 0, 200, { align: 'center', size: 32, color: C.white }); });
    P.kicker(ctx, 'Stars in shells around Earth', t, ev.c2_s1 + 0.2);
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — twice as far: each star looks 4× fainter … but the shell holds 4× as many stars (same patch of sky)
  P.shot(ev.c2_s2, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.2, seed: 35, haze: 0.25 });
    const ex = 200, ey = 620; P.earth(ctx, ex, ey, 40, t, { spin: t });
    const ang = 0.16; const r1 = 560, r2 = 1120 * 0.9 + 100;
    // the cone (a patch of sky)
    P.tube(ctx, (c) => { c.beginPath(); c.moveTo(ex, ey); c.lineTo(ex + Math.cos(-ang) * 1700, ey + Math.sin(-ang) * 1700); c.moveTo(ex, ey); c.lineTo(ex + Math.cos(ang) * 1700, ey + Math.sin(ang) * 1700); }, C.violet, 2, 0.5, { core: false });
    for (const [r, col, lab] of [[r1, C.cyan, 'distance 1'], [r2, C.magenta, 'distance 2']]) { P.tube(ctx, (c) => { c.beginPath(); c.arc(ex, ey, r, -0.5, 0.5); }, col, 4, 0.9, { core: false }); P.label(ctx, lab, ex + r, ey - 420 * (r / 1000) - 60, { align: 'center', size: 28, color: col }); }
    const k2 = P.fin(t, ev.c2_twice, 0.5);
    // shell 1: one star, full brightness
    P.spark(ctx, ex + r1, ey, 16, C.hot, 1); P.label(ctx, '1 star', ex + r1, ey + 90, { align: 'center', size: 28, color: C.white });
    // shell 2: one star, 1/4 as bright, then ×4 stars
    const many = P.fin(t, ev.c2_many, 0.4);
    const pts = [[0, 0], [-0.07, -0.08], [0.06, 0.07], [0.07, -0.06]];
    pts.forEach(([da, dr], i) => { if (i > 0 && many <= 0) return; const a = (i ? da : 0), x = ex + Math.cos(a) * (r2 + dr * 300), y = ey + Math.sin(a) * (r2 + dr * 300); P.spark(ctx, x, y, 16 * lerp(1, 0.5, P.fin(t, ev.c2_fainter, 0.4)), C.hot, (i ? many : k2) * lerp(1, 0.25, P.fin(t, ev.c2_fainter, 0.4))); });
    P.tag(ctx, '2× farther', ex + r2, 200, t, ev.c2_twice, 1e9, { size: 40, border: C.magenta });
    P.tag(ctx, 'each star: ¼ as bright', 1280, 870, t, ev.c2_fainter, 1e9, { size: 42, border: C.cyan });
    P.tag(ctx, 'bigger shell: 4× the stars', 1280, 970, t, ev.c2_many, 1e9, { size: 42, border: C.gold });
    if (t > ev.c2_bigger) P.tube(ctx, (c) => { c.beginPath(); c.arc(ex, ey, r2, -ang, ang); }, C.gold, 8, P.fin(t, ev.c2_bigger, 0.3) * (0.6 + 0.4 * Math.sin(t * 6)));
  }, { in: { type: 'push', dur: 0.5 } });

  // S3 — ¼ × 4 = 1: every shell sends the same light
  P.shot(ev.c2_s3, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.4, seed: 37 });
    const y = 400;
    const kf = P.pop(t, ev.c2_f, 0.35), km = P.pop(t, ev.c2_m, 0.35), kc = P.pop(t, ev.c2_cancel, 0.4);
    if (kf > 0) P.at(ctx, 520, y, kf, 0, () => P.sign(ctx, '¼', 0, 50, { size: 170, color: C.cyan }));
    if (km > 0) P.at(ctx, 820, y, km, 0, () => P.sign(ctx, '× 4', 0, 50, { size: 150, color: C.gold }));
    if (kc > 0) P.at(ctx, 1220, y, kc, 0, () => { P.sign(ctx, '= 1', 0, 50, { size: 170, color: C.green }); });
    P.label(ctx, 'as bright', 520, y + 120, { align: 'center', alpha: kf }); P.label(ctx, 'as many', 820, y + 120, { align: 'center', alpha: km }); P.label(ctx, 'same light', 1220, y + 120, { align: 'center', alpha: kc, color: C.green });
    // equal bars for each shell
    const ks = P.fin(t, ev.c2_same2, 0.4); for (let i = 0; i < 5; i++) { const x = 560 + i * 170; const h = 220 * ease.outBack(clamp((t - ev.c2_same2 - i * 0.1) / 0.4), 1.4); if (h <= 1) continue; P.tube(ctx, (c) => { P.rr(c, x, 960 - h, 110, h, 14); }, SHC[i], 3, ks, { fill: true, fillA: 0.45, core: false }); P.label(ctx, 'shell ' + (i + 1), x + 55, 1010, { align: 'center', size: 24, alpha: ks }); }
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — shell after shell, forever: the total keeps piling up; far stars fill the gaps
  P.shot(ev.c2_s4, (ctx, t) => {
    P.sky(ctx, t, { stars: 0, haze: 0.25 });
    const n = ev.c2_stack.filter((t0) => t >= t0).length; const fl = P.fin(t, ev.c2_fill, 1.5);
    // sky window filling up with dimmer and dimmer stars
    ctx.save(); P.rr(ctx, 120, 160, 900, 760, 30); ctx.clip(); ctx.fillStyle = '#06051A'; ctx.fillRect(120, 160, 900, 760); ctx.globalCompositeOperation = 'lighter';
    const tot = Math.round(60 + n * 160 + fl * 1400); for (let i = 0; i < tot; i++) { const x = 120 + U.hash(i, 71) * 900, y = 160 + U.hash(i, 72) * 760, r = 1 + 2.5 * Math.pow(U.hash(i, 73), 4) + fl * 6 * U.hash(i, 74); ctx.globalAlpha = 0.5 + 0.5 * U.hash(i, 75); ctx.fillStyle = P.mix('#FFF6E0', '#FFB347', U.hash(i, 76)); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); }
    ctx.restore(); P.tube(ctx, (c) => P.rr(c, 120, 160, 900, 760, 30), C.violet, 3, 1, { core: false }); P.label(ctx, 'your sky', 570, 970, { align: 'center' });
    // the stack
    const stp = Math.min(70, 600 / Math.max(1, n)); for (let i = 0; i < n; i++) { const y = 900 - (i + 1) * stp; P.tube(ctx, (c) => P.rr(c, 1260, y, 380, stp - 10, 10), SHC[i % 5], 3, 1, { fill: true, fillA: 0.4, core: false }); }
    const total = n + fl * 6; P.text(ctx, 'TOTAL LIGHT', 1450, 150, { size: 40, fam: FT.title, weight: 400, color: C.dim, align: 'center' }); P.sign(ctx, '+' + Math.round(total) + ' shells', 1450, 230, { size: 64, color: C.gold });
    P.arrow(ctx, 1700, 900, 1700, 220, { color: C.gold, k: clamp(n / 10), lw: 6 });
    P.tag(ctx, "far stars don't fade — they fill the gaps", 960, 1020, t, ev.c2_fill, 1e9, { size: 40, border: C.gold });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — do the sum: the sky = the Sun's surface everywhere; a thermometer climbs; an oven; Nova sweats
  P.shot(ev.c2_s5, (ctx, t) => {
    const heat = P.eio((t - ev.c2_shock) / Math.max(0.6, ev.c2_deg - ev.c2_shock + 0.5));
    const top = P.mix('#07071A', '#FF8A3C', heat), bot = P.mix('#100B2E', '#FFD27A', heat);
    P.sky(ctx, t, { top, bottom: bot, stars: 1 - heat, haze: 0.3 * (1 - heat) });
    for (let i = 0; i < 6; i++) { const x = 300 + i * 260, ph = (t * 0.6 + i * 0.17) % 1; P.tube(ctx, (c) => { c.beginPath(); for (let k = 0; k <= 20; k++) { const yy = 1000 - k * 30 - ph * 120; c.lineTo(x + Math.sin(k * 0.6 + t * 3 + i) * 14, yy); } }, '#FFFFFF', 3, 0.35 * heat * (1 - ph)); }
    const ks = P.pop(t, ev.c2_sum, 0.4); if (ks > 0) P.at(ctx, 480, 320, ks, 0, () => { P.box(ctx, -260, -90, 520, 180, C.cyan, {}); P.sign(ctx, 'Σ shells = ∞?', 0, 30, { size: 64, color: C.cyan }); });
    P.thermo(ctx, 1500, 860, heat * 0.92, { h: 560, color: C.coral, label: 'sky temperature' });
    P.counter(ctx, { x: 1180, y: 420, from: -270, to: 5500, t, t0: ev.c2_shock, t1: ev.c2_deg + 0.4, size: 110, suffix: ' °C', sub: "≈ the Sun's surface", color: '#FFF2C8' });
    Ch.nova(ctx, { x: 520, y: 760, s: 0.95, t, eyes: heat > 0.5 ? 'worried' : 'normal', mouth: Ch.novaMouth(t, 'frown'), sweat: heat, glow: 0.5 });
    P.stamp(ctx, 'AN OVEN', 960, 160, t, ev.c2_oven, { size: 110, color: C.red });
  }, { in: { type: 'fade', dur: 0.4 } });
})();
