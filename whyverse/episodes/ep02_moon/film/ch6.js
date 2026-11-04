// Chapter 6 — The things we'd lose: the 400×400 coincidence, totality, helium 1868, 1919, months, moonwalkers.
(function () {
  const { U, G, Ch, P, SCORE: S, Shots, K } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const sunDisc = (ctx, x, y, r, a = 1) => { P.glow(ctx, x, y, r * 2.6, 'rgba(255,200,110,', 0.8 * a); const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, '#FFF6D8'); g.addColorStop(0.8, '#FFD26A'); g.addColorStop(1, '#FFB347');
    ctx.globalAlpha = a; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.globalAlpha = 1; };
  const corona = (ctx, x, y, r, k, t) => { if (k <= 0) return; ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 48; i++) { const a = i / 48 * 6.283 + U.hash(i, 3) * 0.12, l = r * (1.4 + 1.6 * Math.pow(U.hash(i, 4), 2)) * (0.6 + 0.4 * k);
      const g = ctx.createLinearGradient(x + Math.cos(a) * r, y + Math.sin(a) * r, x + Math.cos(a) * l, y + Math.sin(a) * l); g.addColorStop(0, `rgba(235,240,255,${0.35 * k})`); g.addColorStop(1, 'rgba(235,240,255,0)');
      ctx.strokeStyle = g; ctx.lineWidth = r * (0.06 + 0.1 * U.hash(i, 5)); ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r); ctx.lineTo(x + Math.cos(a + 0.05 * Math.sin(t * 0.3 + i)) * l, y + Math.sin(a) * l); ctx.stroke(); }
    P.glow(ctx, x, y, r * 2.2, 'rgba(220,230,255,', 0.6 * k); ctx.restore(); };
  P.cardShot('c6', 6, 'The things we’d lose', (ctx, t) => { P.spaceBg(ctx, t); const u = clamp((t - S.CH.c6.t0) / 6); sunDisc(ctx, 1500, 300, 150); ctx.fillStyle = '#05070E'; ctx.beginPath(); ctx.arc(lerp(1150, 1420, u), 320, 148, 0, 7); ctx.fill(); });

  // S1 — 400× wider, 400× farther
  P.shot(ev.c6_s1, (ctx, t) => {
    P.spaceBg(ctx, t);
    const ex = 150, ey = 620;                            // the eye on Earth
    const mx = 560, mr = 26, sx = 1900, sr = 470;         // moon and (cropped) sun, schematic
    const kc = clamp((t - ev.c6_same) / 0.8);
    // sight lines
    ctx.save(); ctx.globalAlpha = 0.25 + 0.6 * kc; ctx.strokeStyle = C.gold; ctx.lineWidth = 3;
    for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(sx, ey + s * sr * 0.98); ctx.stroke(); } ctx.restore();
    if (kc > 0) { ctx.save(); ctx.globalAlpha = 0.15 * kc; ctx.fillStyle = C.gold; ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(sx, ey - sr); ctx.lineTo(sx, ey + sr); ctx.fill(); ctx.restore(); }
    sunDisc(ctx, sx, ey, sr); P.moonDisc(ctx, mx, ey, (mx - ex) * sr * 0.98 / (sx - ex), { glow: 0.2 }); void mr;
    ctx.fillStyle = '#4FA3E0'; ctx.beginPath(); ctx.arc(ex, ey, 30, 0, 7); ctx.fill(); P.label(ctx, 'you', ex, ey + 70, { size: 26, align: 'center' });
    P.counter(ctx, { x: 1450, y: 170, from: 1, to: 400, suffix: '× wider', t, t0: ev.c6_wider - 0.4, t1: ev.c6_wider + 0.2, size: 66, sub: 'Sun vs Moon' });
    P.counter(ctx, { x: 640, y: 170, from: 1, to: 400, suffix: '× farther', t, t0: ev.c6_farther - 0.4, t1: ev.c6_farther + 0.2, size: 66, sub: 'Sun vs Moon' });
    P.stamp(ctx, 'SAME SIZE IN OUR SKY', 860, 950, t, ev.c6_same, { size: 66 });
    P.kicker(ctx, 'Not to scale', t, ev.c6_s1 + 0.3, { y: 1010 });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — totality
  P.shot(ev.c6_s2, (ctx, t) => {
    const u = ease.inOutCubic(clamp((t - ev.c6_s2 - 0.2) / Math.max(0.5, ev.sync_totality - ev.c6_s2 - 0.2)));
    const dark = clamp((u - 0.75) / 0.25);
    const sky = ctx.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, P.mix('#3E79B8', '#04060E', 0.4 + 0.6 * dark)); sky.addColorStop(1, P.mix('#8FB6D8', '#0B1024', 0.4 + 0.6 * dark));
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H); P.stars(ctx, t, { a: dark, n: 120 });
    const x = 960, y = 480, r = 170;
    if (t >= ev.sync_totality) corona(ctx, x, y, r, clamp((t - ev.sync_totality) / 0.4) , t);
    sunDisc(ctx, x, y, r, t >= ev.sync_totality ? 0 : 1);
    ctx.fillStyle = '#04060C'; ctx.beginPath(); ctx.arc(lerp(x - 420, x, u), lerp(y - 60, y, u), r * 1.01, 0, 7); ctx.fill();
    if (t >= ev.sync_totality && t < ev.sync_totality + 0.5) { const q = 1 - (t - ev.sync_totality) / 0.5; P.glow(ctx, x + r * 0.7, y - r * 0.7, 240, 'rgba(255,255,255,', q); }
    // horizon
    ctx.fillStyle = '#05070D'; ctx.beginPath(); ctx.moveTo(0, H); for (let i = 0; i <= 20; i++) ctx.lineTo(i * 96, 930 - 30 * U.hash(i, 6)); ctx.lineTo(W, H); ctx.fill();
    for (let i = 0; i < 7; i++) P.icon(ctx, 'person', 560 + i * 120, 880 - 10 * U.hash(i, 3), 62, { color: '#05070D' });
    P.tag(ctx, 'the corona: the Sun’s outer atmosphere', 960, 800, t, ev.sync_totality + 0.4, 1e9, { size: 36, border: '#DDE6FF' });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S3 — 1868: a yellow line → helium
  P.shot(ev.c6_s3, (ctx, t) => {
    P.spaceBg(ctx, t, { stars: 0.3 });
    const X0 = 260, X1 = 1660, Y = 420, Hh = 130; const kx = ease.outCubic(clamp((t - ev.c6_s3 - 0.2) / 0.8));
    ctx.save(); ctx.beginPath(); ctx.rect(X0, Y, (X1 - X0) * kx, Hh); ctx.clip();
    const g = ctx.createLinearGradient(X0, 0, X1, 0); ['#6A3BFF', '#2F6BFF', '#22C3E6', '#3BD26B', '#E6E63B', '#FFB13B', '#FF4B3B'].forEach((c, i) => g.addColorStop(i / 6, c));
    ctx.fillStyle = g; ctx.fillRect(X0, Y, X1 - X0, Hh); ctx.restore();
    P.label(ctx, 'sunlight split into colours', X0, Y - 24, { size: 28, alpha: kx });
    const xl = lerp(X0, X1, (587.6 - 400) / 300); const kl = clamp((t - ev.c6_line) / 0.3);
    if (kl > 0) { ctx.fillStyle = '#FFF6A0'; ctx.fillRect(xl - 5, Y - 30 * kl, 10, Hh + 60 * kl); P.glow(ctx, xl, Y + Hh / 2, 120, 'rgba(255,250,170,', kl * 0.8); P.tag(ctx, 'a mystery yellow line', xl, Y + Hh + 80, t, ev.c6_line + 0.1, 1e9, { size: 34 }); }
    P.stamp(ctx, '1868', 380, 240, t, ev.c6_1868, { size: 90 });
    P.tag(ctx, 'Jules Janssen, during an eclipse', 820, 240, t, ev.c6_1868 + 0.3, 1e9, { size: 32, align: 'left', border: C.dim });
    const ke = P.pop(t, ev.c6_he, 0.5); if (ke > 0) P.at(ctx, 960, 830, ke, 0, () => { P.panel(ctx, -360, -150, 720, 300, { glow: 0.4 });
      G.text(ctx, '2', -300, -90, { size: 40, fam: FT.ui, weight: 800, color: C.dim, boil: 0 }); G.text(ctx, 'He', -180, 60, { size: 170, fam: FT.ui, weight: 800, color: C.gold, align: 'center', boil: 0 });
      G.text(ctx, 'HELIUM', 120, -10, { size: 64, fam: FT.title, weight: 400, color: C.white, boil: 0 }); P.label(ctx, 'from Greek “helios” = Sun', 120, 50, { size: 26 }); P.label(ctx, 'named by Norman Lockyer', 120, 92, { size: 26 }); });
  }, { in: { type: 'push', dur: 0.5 } });

  // S4 — 1919: starlight bends around the Sun
  P.shot(ev.c6_s4, (ctx, t) => {
    P.spaceBg(ctx, t, { stars: 0.6 });
    const x = 960, y = 520, r = 120; corona(ctx, x, y, r, 1, t); ctx.fillStyle = '#04060C'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    const kb = ease.inOutCubic(clamp((t - ev.c6_bend) / 1.2));
    for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283 + 0.3, d0 = r * (1.35 + 0.9 * U.hash(i, 2)); const d = d0 + 40 * kb * (r * 1.4 / d0);
      const px = x + Math.cos(a) * d0, py = y + Math.sin(a) * d0, qx = x + Math.cos(a) * d, qy = y + Math.sin(a) * d;
      ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.beginPath(); ctx.arc(px, py, 6, 0, 7); ctx.fill();
      if (kb > 0) { P.arrow(ctx, px, py, qx, qy, { k: 1, lw: 3, head: 12, color: C.gold, alpha: kb }); ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(qx, qy, 7, 0, 7); ctx.fill(); } }
    P.stamp(ctx, '1919', 380, 200, t, ev.c6_1919, { size: 90 });
    P.tag(ctx, 'stars seem to shift: light bends', 1450, 200, t, ev.c6_bend + 0.3, 1e9, { size: 34 });
    const ke = P.pop(t, ev.c6_einstein, 0.4); if (ke > 0) P.at(ctx, 960, 930, ke, 0, () => { P.panel(ctx, -360, -60, 720, 120, {}); G.text(ctx, "a test of Einstein's gravity", 0, 16, { size: 44, fam: FT.ui, weight: 800, color: C.white, align: 'center', boil: 0 }); });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S5 — month ← moon; the Islamic calendar
  P.shot(ev.c6_s5, (ctx, t) => {
    P.spaceBg(ctx, t, { stars: 0.4 });
    const km = clamp((t - ev.c6_moonw) / 0.6);
    const word = km < 0.5 ? 'MONTH' : 'MOON';
    const k = P.pop(t, ev.c6_month, 0.4);
    if (k > 0) P.at(ctx, 620, 400, k, 0, () => { G.text(ctx, 'MONTH', 0, 0, { size: 150, fam: FT.title, weight: 400, color: C.white, align: 'center', boil: 0, alpha: 1 - 0.55 * km });
      if (km > 0) { G.text(ctx, '← moon', 0, 120, { size: 70, fam: FT.title, weight: 400, color: C.gold, align: 'center', boil: 0, alpha: km }); P.label(ctx, 'Old English mōnaþ, from the word for moon', 0, 190, { size: 26, align: 'center', alpha: km }); } });
    void word;
    P.moonDisc(ctx, 620, 160, 50, { alpha: km, glow: 0.4 });
    const ki = clamp((t - ev.c6_islamic) / 0.4);
    if (ki > 0) { P.label(ctx, 'days in a year', 1060, 640, { size: 28, alpha: ki });
      P.hbar(ctx, { x: 1060, y: 680, w: 700, frac: 365.25 / 380, t, t0: ev.c6_islamic, label: '', value: '365', h: 60, color: '#FFE08A' }); G.text(ctx, 'SOLAR', 1040, 726, { size: 30, fam: FT.ui, weight: 800, color: C.dim, align: 'right', boil: 0, alpha: ki });
      P.hbar(ctx, { x: 1060, y: 790, w: 700, frac: 354.5 / 380, t, t0: ev.c6_354, label: '', value: '354–355', h: 60, color: C.gold }); G.text(ctx, 'ISLAMIC', 1040, 836, { size: 30, fam: FT.ui, weight: 800, color: C.dim, align: 'right', boil: 0, alpha: ki });
      P.tag(ctx, '12 lunar months', 1410, 960, t, ev.c6_354 + 0.4, 1e9, { size: 34 }); }
  }, { in: { type: 'push', dur: 0.5 } });

  // S6 — twelve moonwalkers + Artemis II
  P.shot(ev.c6_s6, (ctx, t) => {
    P.spaceBg(ctx, t);
    ev.c6_walkers.forEach((tw, i) => { const k = P.pop(t, tw, 0.35); if (k <= 0) return; const x = 200 + (i % 6) * 130, y = 330 + Math.floor(i / 6) * 190; P.at(ctx, x, y, k, 0, () => P.icon(ctx, 'astronaut', 0, 0, 62, { color: '#EDEFF5' })); });
    P.counter(ctx, { x: 525, y: 720, from: 0, to: 12, t, t0: ev.c6_twelve0, t1: ev.c6_twelve0 + 1.3, size: 110, sub: 'people have walked on the Moon (1969–72)' });
    // Artemis II: free-return loop around the Moon
    const ka = clamp((t - ev.c6_april + 0.3) / 0.5);
    if (ka > 0) { ctx.save(); ctx.globalAlpha = ka; const ex = 1180, ey = 600, mx = 1700, my = 560;
      ctx.fillStyle = '#4FA3E0'; ctx.beginPath(); ctx.arc(ex, ey, 54, 0, 7); ctx.fill(); P.moonDisc(ctx, mx, my, 60, { glow: 0.3, alpha: 1 - 0.7 * clamp((t - ev.c6_nowhere) / 0.8) });
      const path = (u) => { const a = u * 6.283; return [lerp(ex, mx, 0.5 - 0.5 * Math.cos(a)) + (u > 0.35 && u < 0.65 ? Math.sin((u - 0.35) / 0.3 * Math.PI) * 120 : 0), ey - Math.sin(a) * 140 * (u < 0.5 ? 1 : -1) * 0.9]; };
      const u = clamp((t - ev.c6_artemis) / 4);
      ctx.strokeStyle = 'rgba(255,196,61,0.75)'; ctx.lineWidth = 4; ctx.setLineDash([10, 10]); ctx.beginPath(); for (let i = 0; i <= 80 * u; i++) { const [x, y] = path(i / 80); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.setLineDash([]);
      const [cx, cy] = path(u); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx, cy, 9, 0, 7); ctx.fill(); ctx.restore();
      P.tag(ctx, 'ARTEMIS II · APRIL 2026 · 4 crew', 1440, 300, t, ev.c6_april, 1e9, { size: 36 }); }
    if (t > ev.c6_nowhere) P.tag(ctx, 'no Moon: nowhere close to go', 1440, 880, t, ev.c6_nowhere, 1e9, { size: 36, border: C.coral });
  }, { in: { type: 'fade', dur: 0.5 } });
})();
