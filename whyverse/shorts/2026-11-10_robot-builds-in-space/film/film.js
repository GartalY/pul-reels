// Whyverse trend Short 2026-11-10 — assembles the shots (shots.js) into one film + burned-in captions.
(function () {
  const S = globalThis.SCORE;
  const draw = Shots.film(globalThis.SHOTS.slice(), { end: S.DURATION });
  Studio.film({ draw(ctx, t) { draw(ctx, t); globalThis.P.captions(ctx, t, S.TL.lines); }, fadeOut: 0.8 });
})();
