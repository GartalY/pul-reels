// Whyverse ep09 — assembles every chapter's shots (registered by ch*.js via P.shot) into one film.
// Vintage-comic look: flat style engine (no boil), plus a tiny ocean strip where the warm water slides east one step per chapter.
(function () {
  const S = globalThis.SCORE, P = globalThis.P, U = globalThis.U;
  G.setStyle('flat', { amp: 0, textBoil: 0, post: { paper: 0, grain: 0, vignette: 0.12 } });
  const list = (globalThis.SHOTS || []).slice().sort((a, b) => a.at - b.at);
  const draw = Shots.film(list, { end: S.DURATION });
  const chs = Object.keys(S.CH);
  Studio.film({
    async init() { await Studio.loadFont('Bangers', 'fonts/Bangers-Regular.ttf', '400'); },
    draw(ctx, t) {
      draw(ctx, t);
      const c = chs.find((k) => t >= S.CH[k].t0 && t < S.CH[k].t1) || 'c7'; const n = Math.min(6, chs.indexOf(c));
      const hideTitle = U.clamp((t - S.ev.title0) / 0.4) * (1 - U.clamp((t - (S.CH.c1.t0 - 0.2)) / 0.4));
      const onCard = chs.slice(1, 7).some((k) => t >= S.CH[k].t0 - 0.2 && t < S.ev[k + '_cardOut'] + 0.2);
      const hideEnd = U.clamp((t - S.ev.c7_s5) / 0.4);
      const a = (1 - hideTitle) * (1 - hideEnd) * (onCard ? 0 : 1) * U.clamp((t - 2) / 0.6);
      P.progress(ctx, t, n, a);
    },
    post: { paper: 0, vignette: 0.12, grain: 0 },
    fadeOut: 1.4,
  });
})();
