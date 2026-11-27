// Ep11 thumbnail (1920x1080 → 1280x720): risograph cover — "WE SHOULDN'T EXIST." in two inks, an electron and a positron meeting in a
// yellow flash, an "ANTIMATTER" tag, Elle pointing, WHYVERSE. Run: tools/thumb.sh
(function () {
  const { U, G, Ch, P } = globalThis; const C = P.C;
  G.setStyle('flat', { amp: 0, textBoil: 0, post: { paper: 0, grain: 0, vignette: 0.06 } });
  Studio.film({
    async init() { await Studio.loadFont('PatrickHand', 'fonts/PatrickHand-Regular.ttf', '400'); },
    draw(ctx) {
      const t = 3; P.bgLine(ctx, t);
      // the meeting: big electron + positron with the flash between them
      P.flash(ctx, 1500, 560, 0.35, 0, { r: 330, n: 12, seed: 3, dur: 1.6 });
      P.part(ctx, 1300, 560, 140, 'e'); P.part(ctx, 1720, 560, 140, 'p');
      P.tag(ctx, 'ANTIMATTER', 330, 140, t, -5, 1e9, { size: 62, fill: C.acc, color: C.pap, rot: -0.04 });
      P.rtext(ctx, "WE SHOULDN'T", 90, 420, { size: 160, align: 'left', off: [8, 7] });
      P.rtext(ctx, 'EXIST.', 90, 610, { size: 210, align: 'left', top: C.acc, under: C.ink, off: [9, 8] });
      G.text(ctx, 'So why does anything exist?', 100, 760, { size: 70, fam: 'PatrickHand', color: C.ink, boil: 0 });
      Ch.elle(ctx, { x: 1180, y: 1080, s: 0.75, t, dir: -1, gesture: 'point', eyes: 'wide', mouth: 0.7, look: -1 });
      P.brandPlanet(ctx, 130, 990, 30, t, 1); G.text(ctx, 'WHYVERSE', 200, 1008, { size: 50, fam: 'Inter', weight: 900, color: C.ink, boil: 0 });
      P.paperPost(ctx, 1);
    },
    post: { paper: 0, vignette: 0.06, grain: 0 }, fadeOut: 0,
  });
})();
