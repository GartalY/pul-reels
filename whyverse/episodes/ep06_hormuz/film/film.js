// Whyverse ep06 — assembles every chapter's shots (registered by ch*.js via P.shot) into one film. Flat style: no boil, no paper.
(function () {
  const S = globalThis.SCORE;
  G.setStyle('flat', { amp: 0, textBoil: 0, post: { paper: 0, grain: 0, vignette: 0.12 } });
  const list = (globalThis.SHOTS || []).slice().sort((a, b) => a.at - b.at);
  const draw = Shots.film(list, { end: S.DURATION });
  Studio.film({
    draw(ctx, t) { draw(ctx, t); },
    post: { paper: 0, vignette: 0.12, grain: 0 },
    fadeOut: 1.4,
  });
})();
