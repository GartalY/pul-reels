// Whyverse ep01 — assembles every chapter's shots (registered by ch*.js via P.shot) into one film.
(function () {
  const S = globalThis.SCORE;
  const list = (globalThis.SHOTS || []).slice();
  const draw = Shots.film(list, { end: S.DURATION });
  Studio.film({
    draw(ctx, t) { draw(ctx, t); P.motes(ctx, t, { n: 18, color: 'rgba(255,214,120,0.32)', seed: 5, speed: 22 }); },
    post: { paper: 0.22, vignette: 0.16, grain: 0.04 },
    fadeOut: 1.4,
  });
})();
