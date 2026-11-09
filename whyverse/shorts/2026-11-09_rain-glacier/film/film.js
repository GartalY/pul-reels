// Whyverse short 2026-11-09 — assembles the shots (shots.js) into one film.
(function () {
  const S = globalThis.SCORE;
  const draw = Shots.film(globalThis.SHOTS.slice(), { end: S.DURATION });
  Studio.film({ draw(ctx, t) { draw(ctx, t); }, fadeOut: 0.8 });
})();
