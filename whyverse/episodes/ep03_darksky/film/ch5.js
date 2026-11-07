// Chapter 5 — The glowing wall: stretching light, Webb's infrared, rewind to the hot early universe, last scattering,
// ×1000 stretch to microwaves, Penzias & Wilson's hiss (and the pigeons), the microwave sky.
(function () {
  const { U, G, Ch, P, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  // a soft mottled "glow everywhere" texture (built once, deterministic)
  let TEX = null; const tex = () => { if (TEX) return TEX; const w = 120, h = 68; const cv = document.createElement('canvas'); cv.width = w; cv.height = h; const c = cv.getContext('2d'); const im = c.createImageData(w, h);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { let v = 0; for (let o = 0; o < 4; o++) { const f = 0.06 * Math.pow(2, o); v += Math.sin(x * f + U.hash(o, 1) * 9) * Math.cos(y * f * 1.3 + U.hash(o, 2) * 9) / Math.pow(2, o); } v = 0.5 + 0.32 * v + 0.08 * (U.hash(x * 131 + y, 7) - 0.5);
      const i = (y * w + x) * 4; im.data[i] = 255 * clamp(0.55 + 0.45 * v); im.data[i + 1] = 255 * clamp(0.2 + 0.45 * v * v); im.data[i + 2] = 255 * clamp(0.75 - 0.5 * v); im.data[i + 3] = 255; }
    c.putImageData(im, 0, 0); TEX = cv; return cv; };
  const glowSky = (ctx, a, ellipse = false) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.imageSmoothingEnabled = true; if (ellipse) { ctx.beginPath(); ctx.ellipse(W / 2, H / 2 + 30, 820, 410, 0, 0, 7); ctx.clip(); } ctx.drawImage(tex(), 0, 0, W, H); ctx.restore(); };
  const bg = (ctx, t) => { P.sky(ctx, t, { stars: 0.5, seed: 81 }); glowSky(ctx, 0.25 + 0.05 * Math.sin(t)); };
  P.cardShot('c5', 5, 'The glowing wall', bg);

  // S1 — space expands: the grid spreads and the light wave stretches, reddens and weakens
  P.shot(ev.c5_s1, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.3, seed: 83, haze: 0.2 });
    const ex = P.eio((t - ev.c5_expand) / 6); const sp = lerp(80, 170, ex);
    ctx.save(); ctx.globalAlpha = 0.5; for (let x = W / 2 % sp - sp; x < W + sp; x += sp) P.line(ctx, x, 140, x, 980, C.violet, 1.5, 0.4); for (let y = 560 - sp * 6; y < 1000; y += sp) if (y > 140) P.line(ctx, 0, y, W, y, C.violet, 1.5, 0.4); ctx.restore();
    const st = P.eio((t - ev.c5_stretch) / 2.5); const lam = lerp(70, 300, st), amp = lerp(90, 45, st);
    const col = P.specColor(lerp(0.15, 0.9, st));
    P.wave(ctx, 140, 1780, 560, lam, amp, col, { phase: t * 5, lw: 7 });
    P.tag(ctx, 'STRETCHED', 420, 220, t, ev.c5_stretch, 1e9, { size: 44, border: C.cyan });
    P.tag(ctx, 'REDDER + WEAKER', 960, 220, t, ev.c5_redder, 1e9, { size: 44, border: C.coral });
    P.tag(ctx, 'distant galaxies: even dimmer', 1460, 900, t, ev.c5_dimmer, 1e9, { size: 40, border: C.violet });
    P.kicker(ctx, 'Space is expanding', t, ev.c5_expand);
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — Webb looks in infrared: the first galaxies' light slides off the visible band
  P.shot(ev.c5_s2, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.5, seed: 85 });
    const X0 = 260, X1 = 1660, Y = 640; const vis1 = 1060;
    ctx.save(); const g = ctx.createLinearGradient(X0, 0, vis1, 0); ['#8A5CFF', '#4FA3FF', '#5CFF8A', '#FFE45C', '#FF9A3C', '#FF3B3B'].forEach((c, i) => g.addColorStop(i / 5, c)); ctx.fillStyle = g; ctx.globalAlpha = 0.85; P.rr(ctx, X0, Y - 50, vis1 - X0, 100, 20); ctx.fill(); ctx.restore();
    P.tube(ctx, (c) => P.rr(c, vis1, Y - 50, X1 - vis1, 100, 20), C.magenta, 3, 1, { fill: '#3A0E2A', fillA: 0.9, core: false });
    P.label(ctx, 'what our eyes see', (X0 + vis1) / 2, Y + 100, { align: 'center', size: 30, color: C.white }); P.label(ctx, 'infrared', (vis1 + X1) / 2, Y + 100, { align: 'center', size: 30, color: C.magenta });
    const kw = P.pop(t, ev.c5_webb, 0.45); P.icon(ctx, 'webb', 1500, 300, 110 * kw, { a: clamp(kw), t });
    const mv = P.eio((t - ev.c5_ir) / 3); const mx = lerp(X0 + 120, X1 - 140, mv);
    P.spark(ctx, mx, Y - 120, 8, P.specColor(lerp(0.1, 0.95, mv)), 1); P.arrow(ctx, mx, Y - 95, mx, Y - 58, { color: C.white, lw: 4, head: 16 });
    P.label(ctx, 'light of the first galaxies', mx, Y - 170, { align: 'center', size: 28, color: C.white });
    P.tag(ctx, 'stretched out of what we can see', 960, 940, t, ev.c5_out, 1e9, { size: 40, border: C.magenta });
  }, { in: { type: 'push', dur: 0.5 } });

  // S3 — run the clock backwards: the universe fills with hot glowing gas (~3,000 K); the sky was bright everywhere
  P.shot(ev.c5_s3, (ctx, t) => {
    const rw = P.eio((t - ev.c5_rew) / 1.6), gas = P.eio((t - ev.c5_gas + 0.3) / 1.4);
    P.sky(ctx, t, { stars: 1 - gas, seed: 87, haze: 0.3 });
    // rewind scrubber
    P.line(ctx, 260, 140, 1660, 140, C.violet, 4, 1); const sx = lerp(1660, 300, rw); P.circle(ctx, sx, 140, 16, C.cyan, 4, 1, { fill: true, fillA: 0.9 }); P.label(ctx, 'today', 1660, 200, { align: 'center', size: 26 }); P.label(ctx, 'the beginning', 300, 200, { align: 'center', size: 26 });
    if (t > ev.c5_rew && t < ev.c5_rew + 1.6) P.sign(ctx, '◀◀', 960, 300, { size: 80, color: C.cyan, a: Math.floor(t * 4) % 2 ? 1 : 0.4 });
    if (gas > 0) { ctx.save(); ctx.globalAlpha = gas; const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7); g.addColorStop(0, '#FFE7B0'); g.addColorStop(1, '#FF8A3C'); ctx.fillStyle = g; ctx.fillRect(0, 260, W, H); ctx.restore(); glowSky(ctx, 0.25 * gas); }
    P.counter(ctx, { x: 1440, y: 560, from: 3, to: 3000, t, t0: ev.c5_gas, t1: ev.c5_3000, size: 110, suffix: ' K', sub: 'like a cool star', color: '#FFF2C8', border: C.coral });
    const kb = P.fin(t, ev.c5_bright, 0.4); Ch.nova(ctx, { x: 560, y: 680, s: 0.9, t, eyes: kb > 0.5 ? 'closed' : 'wide', shades: kb, mouth: Ch.novaMouth(t, 'o'), glow: 0 });
    P.stamp(ctx, "OLBERS' WALL WAS REAL", 960, 960, t, ev.c5_real, { size: 70, color: C.magenta });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — 380,000 years: the gas cools, the fog clears, and light flies free — still arriving from every direction
  P.shot(ev.c5_s4, (ctx, t) => {
    const clear = P.eio((t - ev.c5_free + 0.2) / 1.4);
    P.sky(ctx, t, { stars: 0.4 * clear, seed: 89, haze: 0.3 });
    const R = lerp(0, 520, clear); // fog clears from the middle out, leaving a glowing shell
    ctx.save(); const g = ctx.createRadialGradient(960, 560, R * 0.92, 960, 560, R + 700); g.addColorStop(0, 'rgba(255,170,90,0)'); g.addColorStop(0.03, 'rgba(255,190,110,0.95)'); g.addColorStop(1, 'rgba(255,140,60,0.9)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore();
    if (clear > 0) P.circle(ctx, 960, 560, R, C.amber, 5, clear, { core: false });
    P.earth(ctx, 960, 560, 28, t, { spin: t, a: clear });
    if (t > ev.c5_every - 0.6) for (let i = 0; i < 16; i++) { const an = i / 16 * 6.283, ph = ((t - ev.c5_every) * 0.5 + U.hash(i, 5)) % 1; const k = clamp(ph); const r0 = R * (1 - k), r1 = Math.max(30, r0 - 70); P.line(ctx, 960 + Math.cos(an) * r0, 560 + Math.sin(an) * r0, 960 + Math.cos(an) * r1, 560 + Math.sin(an) * r1, C.gold, 4, 0.9); }
    P.counter(ctx, { x: 960, y: 170, from: 0, to: 380000, t, t0: ev.c5_380a, t1: ev.c5_380, size: 84, suffix: ' years', sub: 'after the Big Bang', color: C.gold });
    P.tag(ctx, 'light flies free', 960, 990, t, ev.c5_free, 1e9, { size: 46, border: C.amber });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — stretched ~1000×: 3,000 K → 2.7 K; not visible light any more — microwaves
  P.shot(ev.c5_s5, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.6, seed: 91 });
    const st = P.eio((t - ev.c5_1000 + 0.6) / 1.8); const lam = lerp(30, 640, st);
    P.wave(ctx, 140, 1780, 420, lam, 70, P.mix('#FFB347', '#FF5FD2', st), { phase: t * 4, lw: 7 });
    P.tag(ctx, '× ~1,000 longer waves', 960, 220, t, ev.c5_1000, 1e9, { size: 46, border: C.magenta });
    P.counter(ctx, { x: 640, y: 790, from: 3000, to: 2.7, t, t0: ev.c5_cool0, t1: ev.c5_cool, size: 110, decimals: 1, suffix: ' K', sub: 'just above absolute zero', color: C.cyan });
    P.thermo(ctx, 1160, 880, lerp(0.95, 0.04, P.eio((t - ev.c5_cool0) / Math.max(0.5, ev.c5_cool - ev.c5_cool0))), { h: 330, color: C.cyan });
    P.stamp(ctx, 'MICROWAVES', 1520, 780, t, ev.c5_micro, { size: 80, color: C.magenta });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — 1964, Bell Labs: Penzias & Wilson, the horn antenna, a hiss from everywhere, the pigeons, the hiss stays
  P.shot(ev.c5_s6, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.7, seed: 93 }); P.hills(ctx, t, { y: 1000, color: C.green, seed: 4 });
    // the horn antenna (a sideways funnel on a turntable)
    P.tube(ctx, (c) => { c.beginPath(); c.moveTo(560, 860); c.lineTo(820, 470); c.lineTo(1080, 300); c.lineTo(1160, 560); c.lineTo(900, 700); c.lineTo(640, 900); c.closePath(); c.moveTo(1080, 300); c.lineTo(1160, 560); c.moveTo(520, 940); c.lineTo(760, 940); }, C.cyan, 5, P.fin(t, ev.c5_s6, 0.4), { fill: true, fillA: 0.12 });
    P.tag(ctx, '1964 · Bell Labs', 400, 140, t, ev.c5_1964, 1e9, { size: 42, border: C.gold });
    P.bust(ctx, 'penzias', 1400, 760, 0.7 * P.pop(t, ev.c5_pw, 0.4), 1, t); P.bust(ctx, 'wilson', 1650, 760, 0.7 * P.pop(t, ev.c5_pw2, 0.4), 1, t);
    if (t > ev.c5_pw) P.label(ctx, 'Arno Penzias', 1400, 940, { align: 'center', size: 28, color: C.white, alpha: P.fin(t, ev.c5_pw, 0.3) });
    if (t > ev.c5_pw2) P.label(ctx, 'Robert Wilson', 1650, 940, { align: 'center', size: 28, color: C.white, alpha: P.fin(t, ev.c5_pw2, 0.3) });
    // hiss: an oscilloscope of noise + waves coming from every direction to the horn
    const kh = P.fin(t, ev.c5_hiss, 0.3); if (kh > 0) { P.box(ctx, 1260, 220, 520, 200, C.green, { r: 16, lw: 3, a: kh }); P.tube(ctx, (c) => { c.beginPath(); for (let x = 0; x <= 480; x += 6) { const v = (U.hash(Math.floor(t * 30) * 97 + x, 3) - 0.5) * 120; x ? c.lineTo(1280 + x, 320 + v) : c.moveTo(1280, 320 + v); } }, C.green, 2.5, kh, { core: false }); P.label(ctx, 'hssssss', 1520, 470, { align: 'center', size: 30, color: C.green, alpha: kh }); }
    // pigeons get evicted
    const kp = clamp((t - ev.c5_pigeon) / 1.6); if (t > ev.c5_pigeon - 1.2) for (let i = 0; i < 2; i++) { const x = lerp(900 + i * 60, 300 - i * 200, ease.inCubic(kp)), y = lerp(560 - i * 30, 120, ease.inCubic(kp)); if (kp < 1) P.icon(ctx, kp > 0 ? 'bird' : 'pigeon', x, y, 48, { t }); }
    P.tag(ctx, 'cleaned out the pigeon droppings', 660, 1010, t, ev.c5_pigeon + 0.3, ev.c5_stayed - 0.1, { size: 36, border: C.dim });
    P.tag(ctx, 'the hiss stayed', 660, 1010, t, ev.c5_stayed, 1e9, { size: 40, border: C.green });
    P.stamp(ctx, 'IT WAS THE GLOW', 1520, 610, t, ev.c5_glow, { size: 54, color: C.gold });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S7 — microwave goggles: the night sky glows almost perfectly evenly
  P.shot(ev.c5_s7, (ctx, t) => {
    P.sky(ctx, t, { stars: 1, seed: 95 });
    const g = P.fin(t, ev.c5_cmb - 0.2, 0.8); glowSky(ctx, 0.9 * g, true);
    if (g > 0) P.tube(ctx, (c) => { c.beginPath(); c.ellipse(W / 2, H / 2 + 30, 820, 410, 0, 0, 7); }, C.magenta, 4, g, { core: false });
    Ch.nova(ctx, { x: 960, y: 920, s: 0.7, t, lookY: -1, eyes: g > 0.5 ? 'happy' : 'normal', mouth: Ch.novaMouth(t), goggles: P.pop(t, ev.c5_goggles, 0.35) });
    P.tag(ctx, 'the sky in microwaves', 960, 110, t, ev.c5_cmb, 1e9, { size: 44, border: C.magenta });
    P.label(ctx, 'stylised: the real glow is even to about 1 part in 100,000', 960, 1050, { align: 'center', size: 22, alpha: g * 0.8 });
  }, { in: { type: 'fade', dur: 0.4 } });
})();
