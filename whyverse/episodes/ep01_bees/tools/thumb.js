(function () {
  const { U, G, Ch, P } = globalThis; const C = P.C, FT = P.FT; const W = G.W, H = G.H;
  Studio.film({
    draw(ctx, t) {
      P.sky(ctx, '#FFE3B3', '#F6C77A');
      G.rays(ctx, 520, 600, { n: 18, r0: 200, r1: 1500, color: 'rgba(255,255,255,0.35)', lw: 40 });
      // half-empty shelf
      G.rrect(ctx, 60, 640, 900, 380, 10, { fill: '#C8DDE6', seed: 3, lw: 6 });
      G.rrect(ctx, 50, 830, 920, 26, 4, { fill: '#F2F2F2', seed: 4, lw: 5 });
      ['apple', 'cherry', 'blueberry'].forEach((f, i) => P.food(ctx, f, 160 + i * 130, 770, 1.1, { seed: i }));
      for (let i = 0; i < 3; i++) { G.ellipse(ctx, 600 + i * 120, 780, 40, 12, { fill: 'rgba(0,0,0,0.08)', stroke: null, lw: 0, seed: 9 + i }); }
      P.at(ctx, 760, 700, 1, -0.1, () => { G.rrect(ctx, -90, -40, 180, 80, 8, { fill: '#FFE07A', seed: 5, lw: 4 }); G.text(ctx, '$$$', 0, 22, { size: 60, fam: FT.title, weight: 400, color: C.red, align: 'center', boil: 0 }); });
      ['bread', 'rice', 'corn'].forEach((f, i) => P.food(ctx, f, 200 + i * 200, 950, 1.0, { seed: i + 5 }));
      Ch.bee(ctx, { x: 520, y: 380, s: 3.0, t: 0.2, eyes: 'wide', mouth: 'o', flap: 1, armL: 1.0, armR: 1.2, blush: 0.6 });
      // headline
      const card = (txt, x, y, size, fill, rot, col) => P.at(ctx, x, y, 1, rot, () => { const w = G.measure(ctx, txt, size, FT.title, 400) + 70; G.tornPaper(ctx, -w / 2, -size * 0.85, w, size * 1.3, { fill, seed: x | 0, tear: 4 }); G.text(ctx, txt, 0, size * 0.33, { size, fam: FT.title, weight: 400, color: col, align: 'center', boil: 0 }); });
      card('NO BEES?', 1440, 300, 190, C.navy, -0.04, C.gold);
      card('WHAT HAPPENS', 1440, 560, 92, '#FFF8E8', 0.03, C.navyD);
      card('TO YOUR FOOD', 1440, 720, 92, C.coral, -0.02, '#FFF8E8');
      P.planet(ctx, 1810, 980, 46, 0);
    },
    post: { paper: 0.2, vignette: 0.12, grain: 0.02 }, fadeOut: 0,
  });
})();
