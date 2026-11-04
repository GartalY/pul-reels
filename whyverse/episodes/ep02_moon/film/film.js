// Whyverse ep02 — assembles every chapter's shots (registered by ch*.js via P.shot) into one film.
(function () {
  const S = globalThis.SCORE;
  const list = (globalThis.SHOTS || []).slice().sort((a, b) => a.at - b.at);
  const draw = Shots.film(list, { end: S.DURATION });
  Studio.film({
    init: async () => { await M3.init(); },
    draw(ctx, t) { draw(ctx, t); },
    post: { paper: 0, vignette: 0.22, grain: 0.025 },
    fadeOut: 1.4,
  });
})();
