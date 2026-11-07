// Ep03 thumbnail scene (1920x1080, scaled to 1280x720): the sky split diagonally — left half BLAZING (what the
// simple picture predicts), right half the real dark night — Nova in sunglasses on the seam, 3 big neon words.
(function () {
  const { U, G, Ch, P } = globalThis; const C = P.C, FT = P.FT; const W = G.W, H = G.H;
  Studio.film({
    draw(ctx, t) {
      P.sky(ctx, 0.3, { stars: 0, haze: 0.5 }); P.stars(ctx, 0.3, { n: 500, seed: 5, size: 1.3, tw: 0 });
      for (let i = 0; i < 7; i++) P.spark(ctx, 1100 + U.hash(i, 8) * 780, 120 + U.hash(i, 9) * 700, 3 + 2 * U.hash(i, 10), C.star, 1);
      // blazing wedge (left)
      ctx.save(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(1020, 0); ctx.lineTo(620, H); ctx.lineTo(0, H); ctx.closePath(); ctx.clip();
      const g = ctx.createRadialGradient(380, 480, 0, 380, 480, 900); g.addColorStop(0, '#FFFBEA'); g.addColorStop(0.5, '#FFD27A'); g.addColorStop(1, '#FF8A3C'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter'; for (let i = 0; i < 260; i++) { ctx.fillStyle = 'rgba(255,255,240,0.35)'; ctx.beginPath(); ctx.arc(U.hash(i, 21) * 1100, U.hash(i, 22) * H, 10 + 40 * U.hash(i, 23), 0, 7); ctx.fill(); }
      ctx.restore();
      P.tube(ctx, (c) => { c.beginPath(); c.moveTo(1020, 0); c.lineTo(620, H); }, C.magenta, 8, 1);
      P.hills(ctx, 0, { y: 1010, color: C.violet, seed: 9 });
      Ch.nova(ctx, { x: 820, y: 640, s: 1.9, t: 0.25, eyes: 'wide', mouth: 'o', shades: 1, float: 0, glow: 0.6 });
      const card = (txt, x, y, size, col, rot, fill = 'rgba(8,6,26,0.9)') => P.at(ctx, x, y, 1, rot, () => { const w = P.measure(ctx, txt, size, FT.title, 400) + 80; P.box(ctx, -w / 2, -size * 0.85, w, size * 1.3, col, { r: 24, lw: 6, fill }); G.text(ctx, txt, 0, size * 0.3, { size, fam: FT.title, weight: 400, color: col, align: 'center', boil: 0 }); });
      card('WHY IS NIGHT', 1420, 200, 104, C.white, -0.03);
      card('DARK?', 1440, 500, 220, C.cyan, 0.02);
      card('IT SHOULD BLAZE', 470, 950, 80, '#7A2A10', -0.02, 'rgba(255,248,225,0.92)');
      P.planet(ctx, 1840, 1010, 34, 0);
    },
    post: { paper: 0, vignette: 0.25, grain: 0, bloom: 0.3 }, fadeOut: 0,
  });
})();
