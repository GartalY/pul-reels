// Ep05 thumbnail scene (1920x1080, scaled to 1280x720): Nod yawning under a big Moon, WHY DO WE / SLEEP? + "26 years of your life".
// Run: tools/thumb.sh (copies the film to a temp folder with this file as film.js and renders one still).
(function () {
  const { U, G, Ch, P } = globalThis; const C = P.C, FT = P.FT; const W = G.W, H = G.H;
  G.setStyle('watercolor', { amp: 0, textBoil: 0, post: { paper: 0.9, grain: 0.02, vignette: 0.2 } });
  Studio.film({
    draw(ctx, t) {
      P.night(ctx, 0, { seed: 10 }); P.moon(ctx, 300, 250, 190);
      P.hill(ctx, 930, '#2A3A6E', { seed: 3, amp: 24 });
      Ch.nod(ctx, { x: 520, y: 1040, s: 2.5, t: 0.4, gesture: 'yawn', mouth: 'yawn', eyes: 'closed', swing: 1 });
      [['Z', 800, 200, 120], ['z', 900, 120, 90], ['Z', 980, 70, 64]].forEach(([s, x, y, sz]) => G.text(ctx, s, x, y, { size: sz, fam: FT.title, weight: 700, color: C.cream, align: 'center', boil: 0 }));
      G.text(ctx, 'WHY DO WE', 1330, 420, { size: 210, fam: FT.title, weight: 700, color: C.cream, align: 'center', boil: 0 });
      G.text(ctx, 'SLEEP?', 1330, 720, { size: 360, fam: FT.title, weight: 700, color: C.gold, align: 'center', boil: 0 });
      P.stamp(ctx, '26 YEARS OF YOUR LIFE', 1330, 900, 10, 0, { size: 96, color: C.coral, rot: -0.03 });
      P.planet(ctx, 1830, 90, 36, 0);
    },
    post: { paper: 0.9, vignette: 0.2, grain: 0.02 }, fadeOut: 0,
  });
})();
