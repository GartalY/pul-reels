// Chapter 6 — Leaving the bubble. The Sun's bubble (heliosphere) of solar wind · 25 Aug 2012, ≈ 122 × Earth's distance → interstellar
// space · myth: "left the solar system" — not quite: the Oort cloud · ≈ 300 years to its inner edge, ≈ 30,000 to pass through ·
// 1990 the last look home: Pale Blue Dot, 6 billion km, ≈ 0.12 pixel (Carl Sagan) · the Golden Record: 115 pictures, 55 languages, ≈ 90 min
// of music · in ≈ 40,000 years within 1.6 light-years of another star; silent long before.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  // the heliosphere: a soft bubble around the Sun, solar-wind streaks flowing outward
  const bubble = (ctx, t, cx, cy, R, { a = 1, wind = 1 } = {}) => {
    ctx.save(); ctx.globalAlpha *= a; const g = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R); g.addColorStop(0, 'rgba(255,200,120,0.18)'); g.addColorStop(0.85, 'rgba(255,138,91,0.12)'); g.addColorStop(1, 'rgba(255,138,91,0.0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(cx, cy, R * 1.15, R, 0, 0, 7); ctx.fill();
    ctx.strokeStyle = P.rgba(C.coral, 0.8); ctx.lineWidth = 5; ctx.setLineDash([18, 12]); ctx.lineDashOffset = -t * 20; ctx.beginPath(); ctx.ellipse(cx, cy, R * 1.15, R, 0, 0, 7); ctx.stroke(); ctx.setLineDash([]);
    for (let i = 0; i < 70 * wind; i++) { const an = U.hash(i, 3) * 6.283, ph = ((t * 0.35 + U.hash(i, 4)) % 1); const d = R * (0.12 + ph * 0.95); ctx.globalAlpha = a * (1 - ph) * 0.8; P.line(ctx, cx + Math.cos(an) * d * 1.15, cy + Math.sin(an) * d, cx + Math.cos(an) * (d + 26) * 1.15, cy + Math.sin(an) * (d + 26), '#FFD9A8', 3); }
    ctx.restore(); P.sunDisc(ctx, cx, cy, 34, t, { a });
  };
  P.cardShot('c6', 6, 'Leaving the bubble', 'deep', (ctx, t) => { bubble(ctx, t, 300, 900, 260, { a: 0.9 }); P.voyager(ctx, 640 + (t - S.CH.c6.t0) * 8, 680, 0.2, t, { glint: false }); });

  // S1 — the solar wind's bubble · 25 Aug 2012 · ≈ 122 × Earth's distance · crosses into interstellar space
  P.shot(ev.c6_s1, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 260, seed: 131 });
    const cx = 760, cy = 560, R = 380; bubble(ctx, t, cx, cy, R, { a: P.fin(t, ev.c6_s1, 0.5) });
    P.note(ctx, 'solar wind', cx, cy - 120, t, ev.c6_wind, { size: 44, color: C.gold });
    const k = P.eio((t - ev.c6_aug + 1.0) / Math.max(1.5, ev.c6_edge - ev.c6_aug + 1.0)); const vx = lerp(cx + 180, cx + R * 1.15 + 260, k), vy = lerp(cy - 40, cy - 160, k);
    P.trace(ctx, [[cx + 40, cy], [vx, vy]], 1, P.rgba(C.cream, 0.5), 3, 1, [6, 10]); P.voyager(ctx, vx, vy, 0.24, t, { glint: false });
    P.ring(ctx, cx + R * 1.15, cy - 120, t, ev.c6_edge, { r: 160, color: C.coral });
    P.tag(ctx, '25 AUG 2012', 1500, 150, t, ev.c6_aug, 1e9, { size: 44, fill: C.cream, color: C.ink, dot: C.coral });
    P.inkCount(ctx, { x: 1500, y: 360, to: 122, t, t0: ev.c6_122a, t1: ev.c6_122, size: 120, prefix: '≈ ', suffix: ' ×', sub: 'EARTH’S DISTANCE FROM THE SUN', subSize: 32 });
    P.stamp(ctx, 'INTERSTELLAR SPACE', 1440, 860, t, ev.c6_inter, { size: 66, color: C.violet });
    P.source(ctx, 'NASA', t, ev.c6_122);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — myth: "it left the solar system" — not quite: zoom out to the Oort cloud
  P.shot(ev.c6_s2, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 200, seed: 133 });
    const z = lerp(1, 0.16, P.eio((t - ev.c6_cloud + 0.4) / 1.6)); const cx = 960, cy = 600;
    ctx.save(); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy); bubble(ctx, t, cx, cy, 380, { wind: 0.6 }); P.voyager(ctx, cx + 700, cy - 160, 0.24, t, { glint: false }); ctx.restore();
    const ok = P.fin(t, ev.c6_cloud - 0.2, 0.8); if (ok > 0) { for (let i = 0; i < 700; i++) { const an = U.hash(i, 7) * 6.283, d = lerp(330, 470, U.hash(i, 8)) + Math.sin(t * 0.3 + i) * 3; P.circ(ctx, cx + Math.cos(an + t * 0.01) * d * 1.6, cy + Math.sin(an + t * 0.01) * d * 0.95, 1.4 + 1.6 * U.hash(i, 9), '#CFE3FF', { a: ok * (0.4 + 0.5 * U.hash(i, 10)) }); }
      P.note(ctx, 'a huge cloud of icy bodies — still held by the Sun', cx, 1010, t, ev.c6_cloud + 0.6, { size: 42, color: C.cream }); }
    const mk = P.pop(t, ev.c6_myth - 0.1, 0.4) * P.fout(t, ev.c6_cloud + 0.2, 0.3); if (mk > 0) P.at(ctx, 960, 260, mk, -0.02, () => { P.rect(ctx, -560, -80, 1120, 160, 22, C.cream, { shadow: 0.3 }); G.text(ctx, '“Voyager 1 left the solar system”', 0, 22, { size: 54, fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0 }); P.cross(ctx, -520, -60, 520, 60, (t - ev.c6_quite) / 0.35, { lw: 12 }); });
    P.stamp(ctx, 'MYTH', 1500, 140, t, ev.c6_myth, { size: 70, color: C.coral, rot: 0.06, t1: ev.c6_cloud + 0.2 });
    P.big(ctx, 'NOT QUITE', 960, 140, t, ev.c6_cloud + 0.4, { size: 80, color: C.gold, fam: 'Bungee' });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — ≈ 300 years to the inner edge, ≈ 30,000 to pass through (a timeline in years)
  P.shot(ev.c6_s3, (ctx, t) => {
    P.sky(ctx, t, 'night', { stars: 200, seed: 135 });
    const x0 = 180, x1 = 1740, y = 560; P.line(ctx, x0, y, x1, y, P.rgba(C.cream, 0.4), 6);
    const span = (y0, y1, col, lab, t0, row) => { const k = P.oc((t - t0 + 0.3) / 0.7); const a = lerp(x0, x1, y0 / 30300), b = lerp(x0, x1, y1 / 30300); P.rect(ctx, a, y - 20 + row * 0, Math.max(10, (b - a) * k), 40, 20, col, { a: clamp(k * 2) }); if (k > 0.5) G.text(ctx, lab, row ? lerp(a, b, 0.5) : a + 20, y + (row ? 110 : -60), { size: 40, fam: 'Inter', weight: 800, color: col, align: row ? 'center' : 'left', boil: 0 }); };
    span(0, 300, C.gold, '≈ 300 YEARS → THE INNER EDGE', ev.c6_300, 0);
    span(300, 30300, P.rgba('#CFE3FF', 0.7), '≈ 30,000 YEARS TO PASS THROUGH', ev.c6_30k, 1);
    P.voyager(ctx, lerp(x0, x1, P.eio((t - ev.c6_s3) / 6) * 0.98), y - 120, 0.18, t, { glint: false });
    P.inkCount(ctx, { x: 1300, y: 320, to: 30000, t, t0: ev.c6_30k - 0.3, t1: ev.c6_30k + 0.6, size: 120, prefix: '≈ ', sub: 'YEARS', subSize: 40 });
    P.source(ctx, 'NASA/JPL', t, ev.c6_300);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — 1990: it turned around and took one last look home (shutter)
  P.shot(ev.c6_s4, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 260, seed: 137, glow: [200, 540, 400, C.gold, 0.3] });
    const turn = P.eio((t - ev.c6_turn + 0.2) / 1.0); P.voyager(ctx, 1150, 560, 1.0, t, { rot: lerp(-0.1, 0.5, turn) });
    P.tag(ctx, '14 FEB 1990', 1150, 140, t, ev.c6_1990, 1e9, { size: 44, fill: C.cream, color: C.ink, dot: C.earth });
    P.big(ctx, 'one last look home', 520, 900, t, ev.c6_look - 0.3, { size: 72, color: C.cream });
    const sh = t > ev.c6_look ? Math.exp(-(t - ev.c6_look) * 6) : 0; if (sh > 0) { ctx.save(); ctx.globalAlpha = sh; ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — the Pale Blue Dot: a sunbeam band, one speck; 6 billion km, ≈ 0.12 pixel
  P.shot(ev.c6_s5, (ctx, t) => {
    ctx.fillStyle = '#050508'; ctx.fillRect(-200, -200, W + 400, H + 400); P.dark = true;
    const bands = [[0.42, 'rgba(214,150,110,0.20)', 120], [0.55, 'rgba(170,120,190,0.14)', 90], [0.68, 'rgba(120,160,210,0.14)', 140]];
    bands.forEach(([x, col, w], i) => { ctx.save(); ctx.translate(x * W + Math.sin(t * 0.2 + i) * 6, 0); ctx.rotate(0.12); const g = ctx.createLinearGradient(-w, 0, w, 0); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.5, col); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(-w, -300, w * 2, H + 600); ctx.restore(); });
    const dx = 1180, dy = 600; const sk = P.fin(t, ev.c6_speck - 0.2, 0.5); P.circ(ctx, dx, dy, 3.2, '#9EC6FF', { a: 0.4 + 0.6 * sk }); P.glow(ctx, dx, dy, 30, '#9EC6FF', sk);
    P.circle(ctx, dx, dy, 60, 60, P.oc((t - ev.c6_speck) / 0.5), { color: C.gold, lw: 4 });
    P.note(ctx, 'you are here', dx + 70, dy - 80, t, ev.c6_speck + 0.3, { size: 44, align: 'left', color: C.gold });
    P.tag(ctx, '6 BILLION KM AWAY', 420, 160, t, ev.c6_6b, 1e9, { size: 40, fill: C.cream, color: C.ink });
    P.tag(ctx, 'EARTH ≈ 0.12 PIXEL', 420, 250, t, ev.c6_pixel, 1e9, { size: 40, fill: C.earth, color: C.ink });
    P.write(ctx, '“the pale blue dot” — Carl Sagan', 960, 960, t, ev.c6_pbd, { size: 56, color: C.cream, hl: ['blue'], hlColor: '#9EC6FF' });
    P.source(ctx, 'NASA/JPL Photojournal', t, ev.c6_6b);
  }, { in: { type: 'fade', dur: 0.6 } });

  // S6 — the Golden Record: 115 pictures · 55 languages · ≈ 90 minutes of music
  P.shot(ev.c6_s6, (ctx, t) => {
    P.sky(ctx, t, 'dusk', { stars: 50, seed: 139 }); P.hills(ctx, t, { y: 1020, layers: 2 });
    const rk = P.pop(t, ev.c6_rec - 0.3, 0.6); const cx = 560, cy = 540, R = 300;
    if (rk > 0) P.at(ctx, cx, cy, rk, t * 0.6, () => { P.glow(ctx, 0, 0, R * 1.6, C.gold, 0.6); P.circ(ctx, 0, 0, R, '#E9B44C', { shadow: 0.3 }); for (let r = 80; r < R; r += 12) P.stroke(ctx, P.pEll(0, 0, r, r), 'rgba(140,96,30,0.35)', 2); P.circ(ctx, 0, 0, 70, '#C48E2E'); P.circ(ctx, 0, 0, 10, '#5A3E10'); P.line(ctx, -R * 0.2, -R * 0.75, R * 0.5, -R * 0.55, 'rgba(255,255,255,0.45)', 10); });
    const items = [[ev.c6_115, 115, 'PICTURES'], [ev.c6_55, 55, 'LANGUAGES OF GREETINGS'], [ev.c6_90, 90, 'MINUTES OF MUSIC']];
    items.forEach(([t0, n, lab], i) => { const y = 300 + i * 220; const k = P.pop(t, t0 - 0.2, 0.4); if (k <= 0) return; P.at(ctx, 1320, y, k, 0, () => { P.rect(ctx, -380, -80, 760, 160, 24, C.ink, { shadow: 0.3, stroke: P.rgba(C.gold, 0.7), lw: 3 }); G.text(ctx, (i === 2 ? '≈ ' : '') + Math.round(Data.count(t, t0 - 0.2, t0 + 0.4, 0, n, ease.outCubic)), -330, 36, { size: 96, fam: 'Bungee', color: C.gold, boil: 0 }); G.text(ctx, lab, -90, 18, { size: 34, fam: 'Inter', weight: 800, color: C.cream, boil: 0 }); }); });
    P.source(ctx, 'NASA; Smithsonian Magazine', t, ev.c6_115);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S7 — in ≈ 40,000 years: within 1.6 light-years of another star, long silent
  P.shot(ev.c6_s7, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 300, seed: 141 });
    const sx = 1560, sy = 360; const sk = P.fin(t, ev.c6_star - 0.4, 0.8); P.glow(ctx, sx, sy, 160 + 40 * sk, '#FFD9A8', 0.5 + 0.5 * sk); P.circ(ctx, sx, sy, 10 + 6 * sk, '#FFF4DE');
    G.text(ctx, 'Gliese 445', sx, sy + 90, { size: 36, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0, alpha: sk });
    const k = P.eio((t - ev.c6_s7) / 9); P.voyager(ctx, lerp(380, 1080, k), lerp(760, 520, k), lerp(0.45, 0.3, k), t, { rot: -0.25 });
    P.dimLine(ctx, 1150, 470, 1500, 380, '1.6 LIGHT-YEARS', P.eio((t - ev.c6_star) / 0.6), { size: 30 });
    P.inkCount(ctx, { x: 520, y: 260, to: 40000, t, t0: ev.c6_40k - 0.3, t1: ev.c6_40k + 0.6, size: 120, prefix: '≈ ', sub: 'YEARS FROM NOW', subSize: 40 });
    const si = P.fin(t, ev.c6_silent, 0.8); if (si > 0) P.note(ctx, 'long silent by then', 760, 960, t, ev.c6_silent, { size: 50, color: C.cream });
  }, { in: { type: 'fade', dur: 0.5 } });
})();
