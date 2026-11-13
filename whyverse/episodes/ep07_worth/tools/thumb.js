// Ep07 thumbnail (1920x1080 → 1280x720): blueprint sheet, a line-art Earth with a yellow price tag "$ ???",
// WHAT IS / EARTH / WORTH? + digit boxes "$1,152 T", Pip pointing at the tag. Run: tools/thumb.sh
(function () {
  const { U, G, Ch, P } = globalThis; const C = P.C; const W = G.W, H = G.H;
  G.setStyle('flat', { amp: 0, textBoil: 0, post: { paper: 0, grain: 0, vignette: 0.2 } });
  Studio.film({
    draw(ctx) {
      const t = 2.2; P.bp(ctx, 0);
      P.glow(ctx, 560, 560, 520, C.cyan, 0.35);
      P.globe(ctx, 560, 580, 400, t, { lon0: 15, lat0: 22, k: 1, lw: 3 });
      P.dim(ctx, 160, 1020, 960, 1020, 'PLANET EARTH · LOT 001', 1, { size: 30 });
      // price tag hanging off the globe
      P.line(ctx, 470, 120, 400, 250, C.ln, 5); P.circ(ctx, 400, 250, 9, C.ln);
      ctx.save(); ctx.translate(90, 90); ctx.rotate(0.12);
      P.rect(ctx, 0, -70, 420, 140, 16, C.yel, { shadow: 0.35, sy: 10 }); P.circ(ctx, 386, 0, 14, C.bp);
      G.text(ctx, '$ ???', 190, 30, { size: 92, fam: 'Bungee', color: C.ink2, align: 'center', boil: 0 }); ctx.restore();
      G.text(ctx, 'WHAT IS', 1480, 300, { size: 130, fam: 'Inter', weight: 800, color: C.ln, align: 'center', boil: 0 });
      G.text(ctx, 'EARTH', 1480, 500, { size: 210, fam: 'Inter', weight: 800, color: C.yel, align: 'center', boil: 0 });
      G.text(ctx, 'WORTH?', 1480, 690, { size: 180, fam: 'Inter', weight: 800, color: C.ln, align: 'center', boil: 0 });
      P.digits(ctx, '$1,152 T', 1540, 900, { size: 96, land: 1 });
      Ch.pip(ctx, { x: 1020, y: 1050, s: 0.85, t, dir: -1, gesture: 'pointUp', mouth: 0.6, eyes: 'wide', look: -1 });
      P.frame(ctx, 1);
    },
    post: { paper: 0, vignette: 0.2, grain: 0 }, fadeOut: 0,
  });
})();
