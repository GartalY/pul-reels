// Whyverse ep05 — assembles every chapter's shots (registered by ch*.js via P.shot) into one film.
// Watercolor style with NO boil (FEEDBACK 2026-11-04): amp 0, text static; washes are seeded once.
(function () {
  const S = globalThis.SCORE;
  G.setStyle('watercolor', { amp: 0, textBoil: 0, post: { paper: 0.9, grain: 0.03, vignette: 0.26 } });
  const list = (globalThis.SHOTS || []).slice().sort((a, b) => a.at - b.at);
  const draw = Shots.film(list, { end: S.DURATION });
  Studio.film({
    draw(ctx, t) { draw(ctx, t); },
    post: { paper: 0.9, vignette: 0.26, grain: 0.03 },
    fadeOut: 1.4,
  });
})();
