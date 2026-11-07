// Ep02 thumbnail scene (1920x1080, scaled to 1280x720): 3D Earth + a Moon crumbling away, worried Luna, 3 big words.
(function () {
  const { U, G, Ch, P, K } = globalThis; const C = P.C, FT = P.FT; const W = G.W, H = G.H;
  const MP = [2.2, 0.75, -1.3];
  Studio.film({
    init: async () => { await M3.init(); },
    draw(ctx, t) {
      M3.draw(ctx, K.scene(0, { cam: K.cam([-0.9, 0.3, 3.0], [0.9, 0.35, -0.6], 44), sun: K.nrm([1, 0.25, 0.3]), earth: { spin: 2.3, lights: 2.0 }, moon: { show: false } }));
      const lx = 1290, ly = 545, ls = 1.35, mr = 100 * ls;
      P.glow(ctx, lx - 30, ly, mr * 2.6, 'rgba(210,225,255,', 0.3);
      const oc = document.createElement('canvas'); oc.width = W; oc.height = H; const o = oc.getContext('2d');
      Ch.luna(o, { x: lx, y: ly, s: ls, t: 0.3, eyes: 'wide', mouth: 'o', armL: 1.3, armR: -2.2, float: 0, blush: 0.5, glow: 0 });
      o.globalCompositeOperation = 'destination-out';
      for (let i = 0; i < 260; i++) { const yy = ly + (U.hash(i, 1) - 0.5) * mr * 2.3, edge = lx + mr * (0.42 + 0.28 * Math.sin(yy * 0.05) + 0.12 * U.hash(i, 4)); const x = edge + U.hash(i, 2) * mr * 1.4; const s = 14 + 22 * U.hash(i, 3); o.fillRect(x - s / 2, yy - s / 2, s, s); }
      o.fillRect(lx + mr * 0.95, 0, W, H);
      ctx.drawImage(oc, 0, 0);
      for (let i = 0; i < 130; i++) { const k = U.hash(i, 5); const x = lx + mr * 0.95 + k * 560, y = ly + (U.hash(i, 6) - 0.5) * mr * 1.5 * (1 + 0.8 * k); const s = (16 + 20 * U.hash(i, 7)) * (1 - k * 0.75);
        ctx.fillStyle = `rgba(${200 + 40 * U.hash(i, 8)},${195 + 40 * U.hash(i, 8)},${185 + 40 * U.hash(i, 8)},${1 - k * 0.8})`; ctx.save(); ctx.translate(x, y); ctx.rotate(U.hash(i, 9) * 3); ctx.fillRect(-s / 2, -s / 2, s, s); ctx.restore(); }
      // words
      const card = (txt, x, y, size, fill, col, rot) => P.at(ctx, x, y, 1, rot, () => { const w = P.measure(ctx, txt, size, FT.title, 400) + 70; P.rr(ctx, -w / 2, -size * 0.82, w, size * 1.25, 22); ctx.fillStyle = fill; ctx.fill(); G.text(ctx, txt, 0, size * 0.3, { size, fam: FT.title, weight: 400, color: col, align: 'center', boil: 0 }); });
      card('NO MOON?', 1400, 190, 180, C.gold, C.navyD, -0.03);
      card('WHAT HAPPENS', 1400, 880, 96, 'rgba(8,12,28,0.88)', C.white, 0.02);
      card('TO EARTH', 1400, 1005, 96, C.coral, C.white, -0.02);
      P.planet(ctx, 90, 80, 40, 0);
    },
    post: { paper: 0, vignette: 0.2, grain: 0 }, fadeOut: 0,
  });
})();
