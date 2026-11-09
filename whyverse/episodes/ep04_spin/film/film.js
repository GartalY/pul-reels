// Whyverse ep04 — assembles every chapter's shots (registered by ch*.js via P.shot) into one film.
// Chalk style with NO boil (FEEDBACK 2026-11-04): amp 0, text static, one static chalk-dust texture.
(function () {
  const S = globalThis.SCORE;
  G.setStyle('chalk', { amp: 0, textBoil: 0, boilFps: 12, bg: '#16223A', post: { paper: 0, grain: 0.025, vignette: 0.4, chalk: 0.42 } });
  const list = (globalThis.SHOTS || []).slice().sort((a, b) => a.at - b.at);
  const draw = Shots.film(list, { end: S.DURATION });
  Studio.film({
    init() { if (G.chalkTex) G.chalkTex[1] = G.chalkTex[0]; },
    draw(ctx, t) { draw(ctx, t); },
    post: { paper: 0, vignette: 0.4, grain: 0.025, chalk: 0.42 },
    fadeOut: 1.4,
  });
})();
