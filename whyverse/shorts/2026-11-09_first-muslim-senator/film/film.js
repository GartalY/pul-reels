// Whyverse trend Short 2026-11-09 — assembles the shots (shots.js) + burned-in word captions (≤4 words, one keyword highlighted).
(function () {
  const S = globalThis.SCORE, G = globalThis.G, U = globalThis.U, P = globalThis.P, C = P.C;
  const draw = Shots.film(globalThis.SHOTS.slice(), { end: S.DURATION });
  const KEY = { l1: 'muslim', l2: 'first', l3: 'egyptian', l4: 'lost', l5: 'won', l6: 'ellison', l7: 'jefferson', l8: 'january', l9: 'whyverse' };
  const norm = (w) => w.toLowerCase().replace(/[^a-z0-9]/g, '');
  // chunks: up to 4 words, break after punctuation
  const CHUNKS = [];
  for (const l of S.TL.lines) {
    let cur = [];
    l.words.forEach((w, i) => { cur.push(w); const last = i === l.words.length - 1; if (cur.length >= 4 || /[,.?!]$/.test(w.w) || last) { CHUNKS.push({ id: l.id, words: cur, t: cur[0].t, end: last ? l.end : cur[cur.length - 1].end }); cur = []; } });
  }
  for (let i = 0; i < CHUNKS.length; i++) { const nx = CHUNKS[i + 1]; CHUNKS[i].hold = nx ? Math.min(nx.t, CHUNKS[i].end + 0.5) : CHUNKS[i].end + 0.5; }
  const caption = (ctx, t) => {
    const c = CHUNKS.find((c) => t >= c.t - 0.05 && t < c.hold); if (!c) return;
    let size = 60; const fam = P.FT.title, y = 1440, gap = 22;
    const ws = c.words.map((w) => w.w.replace(/[,.]$/, '').toUpperCase());
    let wd = ws.map((w) => G.measure(ctx, w, size, fam, 400));
    { const tw0 = wd.reduce((a, b) => a + b, 0) + gap * (ws.length - 1); if (tw0 > 840) { size = Math.floor(size * 840 / tw0); wd = ws.map((w) => G.measure(ctx, w, size, fam, 400)); } }
    const tw = wd.reduce((a, b) => a + b, 0) + gap * (ws.length - 1);
    const k = U.ease.outBack(U.clamp((t - c.t + 0.05) / 0.18), 1.6);
    let x = P.CX - tw / 2;
    ctx.save(); ctx.translate(P.CX, y); ctx.scale(0.9 + 0.1 * k, 0.9 + 0.1 * k); ctx.translate(-P.CX, -y);
    ws.forEach((w, i) => {
      const isKey = norm(c.words[i].w) === KEY[c.id];
      const said = t >= c.words[i].t - 0.03;
      if (isKey) { ctx.fillStyle = C.yellow; P.rr(ctx, x - 12, y - size * 0.95, wd[i] + 24, size * 1.3, 14); ctx.fill(); }
      G.text(ctx, w, x + wd[i] / 2, y, { size, fam, color: isKey ? C.ink : (said ? C.paper : 'rgba(255,246,232,0.55)'), align: 'center', boil: 0, stroke: isKey ? null : 'rgba(10,6,30,0.95)', strokeW: 10 });
      x += wd[i] + gap;
    });
    ctx.restore();
  };
  Studio.film({ draw(ctx, t) { draw(ctx, t); caption(ctx, t); }, fadeOut: 0.8 });
})();
