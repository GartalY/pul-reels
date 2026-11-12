// Ep06 thumbnail (1920x1080 → 1280x720): the strait from above with the gold 33 km line, a supertanker icon in the gap,
// THIS 33 KM GAP / SHAKES THE WORLD + "1 IN 5 BARRELS", Captain Gull. Run: tools/thumb.sh
(function () {
  const { U, G, Ch, P } = globalThis; const C = P.C; const W = G.W, H = G.H;
  G.setStyle('flat', { amp: 0, textBoil: 0, post: { paper: 0, grain: 0, vignette: 0.15 } });
  Studio.film({
    draw(ctx) {
      const t = 3; const m = P.mkMap('gulf', [47.6, 23.2, 60.6, 31.0]);
      const GEO = globalThis.GEO; let best = null;
      const om = GEO.detail['Oman'].flatMap((r) => { const a = []; for (let i = 0; i < r.length; i += 2) if (r[i + 1] > 25.9 && r[i] > 55.9 && r[i] < 56.8) a.push([r[i], r[i + 1]]); return a; });
      const ir = GEO.detail['Iran'].flatMap((r) => { const a = []; for (let i = 0; i < r.length; i += 2) if (r[i] > 55.9 && r[i] < 57.3 && r[i + 1] < 27.4) a.push([r[i], r[i + 1]]); return a; });
      for (const a of om) for (const b of ir) { const d = Math.hypot((a[0] - b[0]) * Math.cos(0.46), a[1] - b[1]); if (!best || d < best.d) best = { d, a, b }; }
      const A = m.ll(...best.a), B = m.ll(...best.b); const mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
      ctx.save(); const z = 3.1; ctx.translate(560, 560); ctx.scale(z, z); ctx.translate(-mid[0], -mid[1]);
      P.drawMap(ctx, m, { sea: C.sea, z, colors: { Oman: C.sand, Iran: C.land2 } });
      P.line(ctx, A[0], A[1], B[0], B[1], C.gold, 9 / z, 1, 1, [16 / z, 10 / z]); P.circ(ctx, A[0], A[1], 11 / z, C.gold); P.circ(ctx, B[0], B[1], 11 / z, C.gold);
      P.tankerTop(ctx, mid[0] + 40 / z, mid[1] + 30 / z, -0.6, 120, { z });
      ctx.restore();
      P.stamp(ctx, '33 km', 500, 330, 10, 0, { size: 110, color: C.gold, fg: C.navy, rot: -0.05 });
      // right panel
      ctx.save(); const g = ctx.createLinearGradient(980, 0, 1920, 0); g.addColorStop(0, 'rgba(20,32,74,0)'); g.addColorStop(0.18, 'rgba(20,32,74,0.94)'); g.addColorStop(1, 'rgba(20,32,74,0.98)'); ctx.fillStyle = g; ctx.fillRect(980, 0, 940, H); ctx.restore();
      G.text(ctx, 'THIS GAP', 1460, 300, { size: 150, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 });
      G.text(ctx, 'SHAKES THE', 1460, 470, { size: 128, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 });
      G.text(ctx, 'WORLD', 1460, 660, { size: 210, fam: 'Inter', weight: 800, color: C.gold, align: 'center', boil: 0 });
      P.stamp(ctx, '1 IN 5 BARRELS', 1470, 850, 10, 0, { size: 84, color: C.coral, rot: -0.03 });
      Ch.gull(ctx, { x: 860, y: 1070, s: 1.1, t, dir: 1, gesture: 'point', mouth: 0.6, eyes: 'wide' });
      P.planet(ctx, 1840, 80, 34, 0);
    },
    post: { paper: 0, vignette: 0.15, grain: 0 }, fadeOut: 0,
  });
})();
