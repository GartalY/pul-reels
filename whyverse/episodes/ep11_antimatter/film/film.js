// Whyverse ep11 — assembles every chapter's shots (registered by ch*.js via P.shot) into one film.
// RISOGRAPH look: flat style engine (no boil) + the progress counter (6 chapter dots) + the static paper grain printed over everything.
(function () {
  const S = globalThis.SCORE, P = globalThis.P, U = globalThis.U;
  G.setStyle('flat', { amp: 0, textBoil: 0, post: { paper: 0, grain: 0, vignette: 0.06 } });
  const list = (globalThis.SHOTS || []).slice().sort((a, b) => a.at - b.at);
  const draw = Shots.film(list, { end: S.DURATION });
  const chs = Object.keys(S.CH);
  Studio.film({
    async init() { await Studio.loadFont('PatrickHand', 'fonts/PatrickHand-Regular.ttf', '400'); },
    draw(ctx, t) {
      draw(ctx, t);
      const c = chs.find((k) => t >= S.CH[k].t0 && t < S.CH[k].t1) || 'c7'; const n = Math.min(6, chs.indexOf(c));
      const hideTitle = U.clamp((t - S.ev.title0) / 0.4) * (1 - U.clamp((t - (S.CH.c1.t0 - 0.2)) / 0.4));
      const onCard = chs.slice(1, 7).some((k) => t >= S.CH[k].t0 - 0.2 && t < S.ev[k + '_cardOut'] + 0.2);
      const hideEnd = U.clamp((t - S.ev.c7_s5) / 0.4);
      const a = (1 - hideTitle) * (1 - hideEnd) * (onCard ? 0 : 1) * U.clamp((t - 2) / 0.6);
      P.progress(ctx, t, n, a);
      P.paperPost(ctx, 1);
    },
    post: { paper: 0, vignette: 0.06, grain: 0 },
    fadeOut: 1.4,
  });
})();
