// Ep04 thumbnail scene (1920x1080, scaled to 1280x720): a big chalk Earth with a STOP sign stuck in it, Axel flung off
// to the east with his tea, speed streaks, 3 big words + "1,670 km/h".
(function () {
  const { U, G, Ch, P } = globalThis; const C = P.C, FT = P.FT; const W = G.W, H = G.H;
  Studio.film({
    draw(ctx, t) {
      P.board(ctx, 0); P.stars(ctx, 0, { n: 120, seed: 9 });
      P.globe(ctx, 560, 640, 470, 0, { lon0: 10, lat0: 22, grid: 0.3, lw: 8 });
      // STOP sign planted on top of the globe
      P.line(ctx, 470, 200, 470, 360, C.chalk, 12, 1, 1);
      ctx.save(); ctx.translate(470, 150); ctx.beginPath(); for (let i = 0; i < 8; i++) { const a = Math.PI / 8 + i * Math.PI / 4; ctx.lineTo(Math.cos(a) * 120, Math.sin(a) * 120); } ctx.closePath(); ctx.fillStyle = '#D9443C'; ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = C.chalk; ctx.stroke();
      G.text(ctx, 'STOP', 0, 30, { size: 84, fam: FT.title, color: '#FFFFFF', align: 'center', boil: 0 }); ctx.restore();
      // Axel flung east with his cup and a trail of tea
      P.streaks(ctx, 980, 900, 320, 260, 0.2, { n: 10, a: 0.9 });
      Ch.axel(ctx, { x: 980, y: 960, s: 1.7, t: 0.1, rot: 1.3, pose: 'fly', gesture: 'flail', eyes: 'wide', mouth: 'o', wind: 0.2 });
      P.at(ctx, 1830, 860, 1, 0.8, () => P.icon(ctx, 'cup', 0, 0, 44, { seed: 91 }));
      for (let i = 0; i < 9; i++) { ctx.fillStyle = C.coral; ctx.beginPath(); ctx.arc(1790 - i * 22, 890 + (U.hash(i, 4) - 0.5) * 50, 6 + 5 * U.hash(i, 5), 0, 7); ctx.fill(); }
      const card = (txt, x, y, size, col, rot, fill = 'rgba(12,18,32,0.9)') => P.at(ctx, x, y, 1, rot, () => { const w = P.measure(ctx, txt, size, FT.title) + 80; P.box(ctx, -w / 2, -size * 0.85, w, size * 1.3, col, { r: 22, lw: 8, fill, seed: 3 }); G.text(ctx, txt, 0, size * 0.3, { size, fam: FT.title, color: col, align: 'center', boil: 0 }); });
      card('WHAT IF EARTH', 1420, 160, 100, C.chalk, -0.03);
      card('STOPPED?', 1430, 400, 160, C.gold, 0.02);
      card('1,670 km/h', 1600, 625, 66, C.coral, -0.02);
      P.planet(ctx, 1850, 1020, 34, 0);
    },
    post: { paper: 0, vignette: 0.3, grain: 0, chalk: 0.3 }, fadeOut: 0,
  });
})();
