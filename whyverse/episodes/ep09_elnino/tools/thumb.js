// Ep09 thumbnail (1920x1080 → 1280x720): vintage comic cover — EL NIÑO starburst, a Pacific map with the glowing Niño 3.4 patch,
// a red "RECORD 29.94 °C" stamp, "ONE PATCH OF OCEAN" caption, Pico the pelican wide-eyed. Run: tools/thumb.sh
(function () {
  const { U, G, Ch, P } = globalThis; const C = P.C;
  G.setStyle('flat', { amp: 0, textBoil: 0, post: { paper: 0, grain: 0, vignette: 0.12 } });
  Studio.film({
    async init() { await Studio.loadFont('Bangers', 'fonts/Bangers-Regular.ttf', '400'); },
    draw(ctx) {
      const t = 2.4; P.bgPaper(ctx, t, { rays: 0.6, rayCol: C.yel, cx: 1300, cy: 600, spin: 0 });
      const m = P.mapCache('thumb', { lon0: 120, lon1: 300, lat0: -40, lat1: 45, w: 1500 });
      P.panel(ctx, 760, 300, 1100, 620, t, -5, (c) => { const pj = P.drawMap(c, m, -180, -60, 0.95); const p = pj(-145, 0); P.heat(c, p[0], p[1], 460, 120, t); P.heat(c, p[0], p[1], 240, 60, t); P.lonLatBox(c, pj, -170, 5, -120, -5, 1, { col: C.yel }); }, { rot: 0.02 });
      P.burstStar(ctx, 470, 330, 360, t, -5, { color: C.red, text: 'EL NIÑO', size: 200, tcol: C.yel, n: 18, wob: false });
      P.cstamp(ctx, 'RECORD 29.94 °C', 1330, 230, t, -5, { size: 110, color: C.red, rot: -0.04 });
      P.caption(ctx, 'ONE PATCH OF OCEAN…\n…THE WHOLE WORLD\'S WEATHER', 60, 720, t, -5, { size: 76, rot: -0.02, maxW: 1200 });
      Ch.pico(ctx, { x: 1680, y: 1110, s: 0.95, t, dir: -1, gesture: 'shrug', eyes: 'wide', mouth: 0.8, look: -1 });
    },
    post: { paper: 0, vignette: 0.12, grain: 0 }, fadeOut: 0,
  });
})();
