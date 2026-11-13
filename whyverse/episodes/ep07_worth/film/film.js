// Whyverse ep07 — assembles every chapter's shots (registered by ch*.js via P.shot) into one film.
// Blueprint look: flat style engine (no boil), plus a sheet frame + title block ("SHEET n / 8" progress counter) on top.
(function () {
  const S = globalThis.SCORE, P = globalThis.P, U = globalThis.U;
  G.setStyle('flat', { amp: 0, textBoil: 0, post: { paper: 0, grain: 0, vignette: 0.16 } });
  const list = (globalThis.SHOTS || []).slice().sort((a, b) => a.at - b.at);
  const draw = Shots.film(list, { end: S.DURATION });
  const NAMES = { c0: 'The auction', c1: 'Everything we own', c2: 'The gold myth', c3: 'Where is the money?', c4: 'The free stuff', c5: 'The biggest asset', c6: 'Pricing a planet', c7: 'The answer' };
  const chs = Object.keys(S.CH);
  Studio.film({
    draw(ctx, t) {
      draw(ctx, t);
      const c = chs.find((k) => t >= S.CH[k].t0 && t < S.CH[k].t1) || 'c7'; const n = chs.indexOf(c) + 1;
      const hideTitle = U.clamp((t - S.ev.title0) / 0.4) * (1 - U.clamp((t - (S.CH.c1.t0 - 0.2)) / 0.4));
      const hideEnd = U.clamp((t - S.ev.c7_s5) / 0.4);
      const a = (1 - hideTitle) * (1 - hideEnd);
      P.frame(ctx, a); P.titleBlock(ctx, n, NAMES[c], a);
    },
    post: { paper: 0, vignette: 0.16, grain: 0 },
    fadeOut: 1.4,
  });
})();
