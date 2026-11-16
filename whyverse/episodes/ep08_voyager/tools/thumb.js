// Ep08 thumbnail (1920x1080 → 1280x720): ink-silhouette Voyager on a deep-violet sky with its beam, ONE / LIGHT-DAY / AWAY,
// a coral "…and still talking" pill, Echo listening. Run: tools/thumb.sh
(function () {
  const { U, G, Ch, P } = globalThis; const C = P.C; const W = G.W, H = G.H;
  G.setStyle('flat', { amp: 0, textBoil: 0, post: { paper: 0, grain: 0, vignette: 0.2 } });
  Studio.film({
    draw(ctx) {
      const t = 2.4; P.sky(ctx, t, 'deep', { stars: 320, seed: 9, glow: [1350, 520, 700, C.rose, 0.55] });
      P.hills(ctx, t, { y: 1010, layers: 2, tint: '#3E2A66' });
      P.voyager(ctx, 1540, 430, 1.2, t, { rot: 0.12, beam: 1 }); P.tag(ctx, 'VOYAGER 1', 100, 90, t, 0, 1e9, { size: 50, fill: C.cream, color: C.ink, dot: C.gold, align: 'left' });
      P.earth(ctx, 120, 980, 14, t);
      G.text(ctx, 'ONE', 90, 300, { size: 170, fam: 'Inter', weight: 800, color: C.cream, boil: 0 });
      G.text(ctx, 'LIGHT-DAY', 80, 500, { size: 200, fam: 'Bungee', color: C.gold, boil: 0, stroke: C.ink, strokeW: 14 });
      G.text(ctx, 'AWAY', 90, 690, { size: 170, fam: 'Inter', weight: 800, color: C.cream, boil: 0 });
      ctx.save(); ctx.translate(100, 760); ctx.rotate(-0.03); P.rect(ctx, 0, 0, 720, 120, 60, C.coral, { shadow: 0.35, sy: 10 });
      G.text(ctx, '…and still talking', 360, 82, { size: 66, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 }); ctx.restore();
      Ch.echo(ctx, { x: 1040, y: 1040, s: 0.8, t, gesture: 'listen', eyes: 'wide', mouth: 0.6, look: 1 });
    },
    post: { paper: 0, vignette: 0.2, grain: 0 }, fadeOut: 0,
  });
})();
