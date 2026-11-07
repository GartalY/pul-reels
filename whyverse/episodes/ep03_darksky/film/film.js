// Whyverse ep03 — assembles every chapter's shots (registered by ch*.js via P.shot) into one film.
(function () {
  const S = globalThis.SCORE;
  G.setStyle('neon', { amp: 0.12, textBoil: 0, post: { bloom: 0.75, grain: 0.03, vignette: 0.45, paper: 0 } });
  const list = (globalThis.SHOTS || []).slice().sort((a, b) => a.at - b.at);
  const draw = Shots.film(list, { end: S.DURATION });
  Studio.film({
    draw(ctx, t) { draw(ctx, t); },
    post: { paper: 0, vignette: 0.45, grain: 0.03, bloom: 0.75 },
    fadeOut: 1.4,
  });
})();
