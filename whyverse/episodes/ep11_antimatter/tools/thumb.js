// Ep10 thumbnail (1920x1080 → 1280x720): line-art cover — "OZONE ✓ / CLIMATE ?" + a "COP31 FAILED" tag, the south-pole globe with the
// coral hatched ozone hole, Ozzy pointing. Run: tools/thumb.sh
(function () {
  const { U, G, Ch, P } = globalThis; const C = P.C;
  G.setStyle('flat', { amp: 0, textBoil: 0, post: { paper: 0, grain: 0, vignette: 0.1 } });
  Studio.film({
    async init() { await Studio.loadFont('PatrickHand', 'fonts/PatrickHand-Regular.ttf', '400'); },
    draw(ctx) {
      const t = 3; P.bgLine(ctx, t);
      P.globe(ctx, 1380, 560, 400, t, { lon0: 40, lat0: -70, k: 1, hole: 1, lw: 3 });
      P.tag(ctx, 'COP31 FAILED', 360, 150, t, -5, 1e9, { size: 64, fill: C.ink, color: C.pap, rot: -0.04 });
      G.text(ctx, 'OZONE', 90, 450, { size: 210, fam: 'Inter', weight: 900, color: C.ink, boil: 0 });
      P.tick(ctx, 960, 340, 2.6, 1, { lw: 22 });
      G.text(ctx, 'CLIMATE', 90, 700, { size: 210, fam: 'Inter', weight: 900, color: C.acc, boil: 0 });
      G.text(ctx, '?', 1020, 710, { size: 260, fam: 'Inter', weight: 900, color: C.acc, boil: 0 });
      P.underline(ctx, 90, 980, 740, 1, { lw: 14 });
      G.text(ctx, 'Why the world fixed one, not the other', 100, 860, { size: 64, fam: 'PatrickHand', color: C.ink, boil: 0 });
      Ch.ozzy(ctx, { x: 1700, y: 1080, s: 0.95, t, dir: -1, gesture: 'point', eyes: 'wide', mouth: 0.7, look: -1 });
      P.brandPlanet(ctx, 130, 1000, 26, t, 1); G.text(ctx, 'WHYVERSE', 190, 1015, { size: 44, fam: 'Inter', weight: 900, color: C.ink, boil: 0 });
    },
    post: { paper: 0, vignette: 0.1, grain: 0 }, fadeOut: 0,
  });
})();
