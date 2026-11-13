// Chapter 6 — Pricing a planet (the worked example): Earth ≈ 6 × 10²⁴ kg, ≈ 32 % iron, mostly in the core ·
// ≈ 1.9 × 10²¹ t of iron × ≈ $90/t (iron ore) ≈ $1.7 × 10²³ — over 300 million × what people own · nonsense (painting by the weight of its paint) ·
// Greg Laughlin's 2011 playful formula: ≈ $5 quadrillion · neither: a price needs a buyer and a seller · no market, no price.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C; const A = P.A;
  const W = G.W, H = G.H;
  P.cardShot('c6', 6, 'Pricing a planet', (ctx, t) => { P.globe(ctx, 1600, 900, 300, t, { lon0: t * 15, k: 1, a: 0.2 }); });
  const sup = (ctx, base, exp, x, y, size, color, align = 'left', a = 1) => { const w = P.measure(ctx, base, size, 'Inter', 800); const xx = align === 'center' ? x - (w + P.measure(ctx, exp, size * 0.6, 'Inter', 800)) / 2 : x;
    G.text(ctx, base, xx, y, { size, fam: 'Inter', weight: 800, color, boil: 0, alpha: a }); G.text(ctx, exp, xx + w + 4, y - size * 0.42, { size: size * 0.6, fam: 'Inter', weight: 800, color, boil: 0, alpha: a }); return w; };

  // S1 — Earth's mass ≈ 6 trillion trillion kg (5.97 × 10²⁴); the cutaway opens: ≈ a third is iron, mostly in the core
  P.shot(ev.c6_s1, (ctx, t, s) => {
    P.bp(ctx, t);
    const cut = P.eio((t - ev.c6_third + 0.2) / 0.9);
    P.earthCut(ctx, 640, 560, 360, t, { k: P.oc((t - ev.c6_s1) / 1.0), cut, glow: P.fin(t, ev.c6_core, 0.5), lon0: 30 + t * 8 });
    P.dim(ctx, 280, 960, 1000, 960, 'Ø 12,742 km', P.fin(t, ev.c6_s1 + 0.6, 0.7), { size: 32, color: C.ln2 });
    P.panel(ctx, 1120, 230, 680, 190, P.fin(t, ev.c6_weighs - 0.2, 0.4));
    G.text(ctx, 'MASS', 1170, 290, { size: 30, fam: 'Inter', weight: 800, color: C.ln2, boil: 0, alpha: P.fin(t, ev.c6_weighs, 0.3) });
    const mk = P.fin(t, ev.c6_6 - 0.3, 0.4); if (mk > 0) { const w = sup(ctx, '5.97 × 10', '24', 1170, 380, 72, C.yel, 'left', mk); G.text(ctx, 'kg', 1170 + w + 70, 380, { size: 56, fam: 'Inter', weight: 800, color: C.yel, alpha: mk, boil: 0 }); }
    P.note(ctx, '≈ 6 trillion trillion kg', null, null, 1460, 480, t, ev.c6_6 + 0.3, { size: 42, color: C.ln });
    P.note(ctx, '≈ 32 % iron', 700, 470, 1380, 640, t, ev.c6_third, { size: 64 });
    P.note(ctx, 'most of it in the core', 660, 560, 1380, 760, t, ev.c6_core, { size: 48, color: C.ln });
    P.source(ctx, 'NASA Earth Fact Sheet; McDonough (2003) bulk Earth: 32.0 % Fe', t, ev.c6_third + 0.5);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — ≈ 1.9 × 10²¹ tonnes of iron; iron ore ≈ $90 a tonne
  P.shot(ev.c6_s2, (ctx, t, s) => {
    P.bp(ctx, t);
    P.panel(ctx, 160, 170, 1600, 430, P.fin(t, ev.c6_s2, 0.4));
    const r1 = P.fin(t, ev.c6_s2 + 0.3, 0.4); { const w = sup(ctx, '5.97 × 10', '24', 230, 300, 64, C.ln, 'left', r1); G.text(ctx, 'kg  ×  32 %', 230 + w + 60, 300, { size: 64, fam: 'Inter', weight: 800, color: C.ln, alpha: r1, boil: 0 }); }
    P.line(ctx, 230, 350, 1690, 350, C.ln, 4, 1, P.eio((t - ev.c6_2bt + 0.8) / 0.5));
    const r2 = P.fin(t, ev.c6_2bt - 0.3, 0.4); { G.text(ctx, '=', 230, 470, { size: 70, fam: 'Inter', weight: 800, color: C.yel, alpha: r2, boil: 0 }); const w = sup(ctx, '1.9 × 10', '21', 300, 470, 78, C.yel, 'left', r2); G.text(ctx, 'tonnes of iron', 300 + w + 80, 470, { size: 64, fam: 'Inter', weight: 800, color: C.yel, alpha: r2, boil: 0 }); }
    P.note(ctx, '≈ two billion trillion tonnes', null, null, 960, 560, t, ev.c6_2bt + 0.3, { size: 40, color: C.ln2 });
    P.art(ctx, A.ore(440), P.oc((t - ev.c6_ore + 0.2) / 0.7), { x: 620, y: 960 });
    const tg = P.pop(t, ev.c6_90, 0.4); if (tg > 0) P.at(ctx, 1120, 820, tg, Math.sin(t * 2) * 0.06, () => { P.line(ctx, -150, 60, 0, 0, C.ln, 3); P.rect(ctx, 0, -55, 380, 110, 12, C.yel); P.circ(ctx, 24, 0, 10, C.bp); G.text(ctx, '$90 / t', 210, 20, { size: 60, fam: 'Bungee', color: C.ink2, align: 'center', boil: 0 }); });
    P.note(ctx, 'iron ore price', null, null, 1310, 980, t, ev.c6_90 + 0.3, { size: 40, color: C.ln });
    P.source(ctx, 'iron ore 62 % Fe ≈ $90/t, late Oct 2026 (Kallanish via GMK Center)', t, ev.c6_90 + 0.3);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — multiply: ≈ $1.7 × 10²³ = 170 sextillion dollars → over 300 million × everything people own
  P.shot(ev.c6_s3, (ctx, t, s) => {
    P.bp(ctx, t);
    const r1 = P.fin(t, ev.c6_mult - 0.2, 0.4); { const w = sup(ctx, '1.9 × 10', '21', 260, 230, 64, C.ln, 'left', r1); G.text(ctx, 't  ×  $90  =', 260 + w + 60, 230, { size: 64, fam: 'Inter', weight: 800, color: C.ln, alpha: r1, boil: 0 }); }
    const r2 = P.fin(t, ev.c6_170a, 0.4); sup(ctx, '$1.7 × 10', '23', 1260, 230, 72, C.yel, 'left', r2);
    // the long number scrolls in, box by box
    const nk = P.eio((t - ev.c6_170a) / 1.6); const str = '$170,000,000,000,000,000,000,000'; const n = Math.max(1, Math.round(str.length * nk));
    if (nk > 0) P.digits(ctx, str.slice(0, n), 960, 520, { size: 58, land: t > ev.c6_170 ? Math.exp(-(t - ev.c6_170) * 3) : 0 });
    P.note(ctx, '≈ 170 sextillion dollars', null, null, 960, 610, t, ev.c6_170, { size: 52 });
    // scale comparison: a speck vs a giant bar
    const ck = P.eio((t - ev.c6_300 + 0.3) / 1.0); P.rect(ctx, 260, 780, 6, 120, 2, C.yel, { a: ck > 0 ? 1 : 0 }); G.text(ctx, 'all human wealth', 280, 760, { size: 32, fam: 'Inter', weight: 800, color: C.yel, alpha: ck, boil: 0 });
    P.rect(ctx, 280, 780, 1400 * ck, 120, 4, 'rgba(255,123,92,0.35)', { stroke: C.cor, lw: 3 });
    P.stamp(ctx, '× 300,000,000+', 1220, 840, t, ev.c6_300 + 0.5, { size: 64, color: C.cor });
  }, { in: { type: 'fade', dur: 0.35 } });

  // S4 — nonsense: nobody can dig out the core; like pricing a painting by the weight of its paint
  P.shot(ev.c6_s4, (ctx, t, s) => {
    P.bp(ctx, t);
    P.stamp(ctx, 'NONSENSE', 960, 180, t, ev.c6_nonsense, { size: 90, color: C.cor, rot: -0.05 });
    const dk = P.fin(t, ev.c6_dig, 0.4); if (dk > 0) { P.art(ctx, [[[320, 520], [320, 360]], [[280, 360], [360, 360]], { pts: [[290, 520], [350, 520], [340, 590], [300, 590]], closed: true, fill: 'rgba(234,244,255,0.1)' }], dk, { lw: 5 }); P.note(ctx, 'can’t dig out the core', null, null, 320, 680, t, ev.c6_dig + 0.2, { size: 40, color: C.ln }); }
    const tilt = lerp(0, 0.8, P.eio((t - ev.c6_paint) / 0.6));
    P.balance(ctx, 1200, 1000, 760, t, P.oc((t - ev.c6_s4 - 0.1) / 0.8), tilt, {
      left: (x, y) => { P.art(ctx, A.frame(220, 170), 1, { x, y: y - 8, lw: 4 }); },
      right: (x, y) => { const k = P.pop(t, ev.c6_paint - 0.3, 0.35); if (k > 0) for (let i = 0; i < 3; i++) P.art(ctx, A.tube(0.8), 1, { x: x - 40 + i * 40, y: y - 20 - i * 26, s: k, rot: 0.2 * (i - 1) }); } });
    P.note(ctx, '“price by the weight of its paint”', null, null, 1200, 330, t, ev.c6_paint, { size: 46 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S5 — 2011: astronomer Greg Laughlin's playful planet formula → Earth ≈ $5 quadrillion
  P.shot(ev.c6_s5, (ctx, t, s) => {
    P.bp(ctx, t);
    // telescope + stars
    const tk = P.oc((t - ev.c6_s5 - 0.1) / 0.9); P.art(ctx, [{ pts: [[220, 560], [520, 380], [560, 440], [260, 620]], closed: true, fill: 'rgba(234,244,255,0.08)' }, [[390, 520], [330, 820]], [[390, 520], [450, 820]], [[390, 520], [390, 820]]], tk, { lw: 5 });
    for (let i = 0; i < 9; i++) { const x = 560 + U.hash(i, 3) * 400, y = 150 + U.hash(i, 4) * 220, tw = 0.5 + 0.5 * Math.sin(t * 3 + i * 2); P.poly(ctx, [[0, -14], [4, -4], [14, 0], [4, 4], [0, 14], [-4, 4], [-14, 0], [-4, -4]].map(([a, b]) => [x + a * tw, y + b * tw]), C.yel, { a: tk }); }
    P.ytag(ctx, '2011 · ASTRONOMER GREG LAUGHLIN', 420, 960, t, ev.c6_2011, 1e9, { size: 32 });
    P.panel(ctx, 960, 200, 820, 360, P.fin(t, ev.c6_formula - 0.2, 0.4));
    ['$ = f ( mass,', '   temperature,', '   its star’s age,', '   type, brightness )'].forEach((ln, i) => G.text(ctx, ln, 1010, 280 + i * 70, { size: 46, fam: P.HAND, color: C.ln, boil: 0, alpha: P.fin(t, ev.c6_formula + i * 0.25, 0.3) }));
    P.bcount(ctx, { x: 1370, y: 760, to: 5, t, t0: ev.c6_5q - 0.2, t1: ev.c6_5q, size: 130, prefix: '≈ $', sub: 'QUADRILLION', subSize: 48 });
    P.note(ctx, 'a playful estimate', null, null, 1000, 900, t, ev.c6_5q + 0.4, { size: 40, color: C.ln2 });
  }, { in: { type: 'fade', dur: 0.35 } });

  // S6 — which is right? Neither. A price needs a buyer and a seller; nobody to sell to, nowhere else to go.
  P.shot(ev.c6_s6, (ctx, t, s) => {
    P.bp(ctx, t);
    const tags = [['$170 SEXTILLION', 520, ev.c6_which], ['$5 QUADRILLION', 1400, ev.c6_which + 0.25]];
    tags.forEach(([s0, x, t0]) => { const k = P.pop(t, t0, 0.4); if (k <= 0) return; P.at(ctx, x, 200, k, 0, () => { P.rect(ctx, -250, -50, 500, 100, 12, 'rgba(7,39,72,0.85)', { stroke: C.yel, lw: 4 }); G.text(ctx, s0, 0, 18, { size: 46, fam: 'Bungee', color: C.yel, align: 'center', boil: 0 }); }); P.cross(ctx, x - 260, 140, x + 260, 260, (t - ev.c6_neither) / 0.4); });
    P.globe(ctx, 960, 640, 230, t, { lon0: 200 + t * 12, k: 1 });
    const slot = (x, lab, t0) => { const k = P.fin(t, t0, 0.4); if (k <= 0) return; ctx.save(); ctx.globalAlpha *= k; ctx.strokeStyle = C.ln2; ctx.lineWidth = 4; ctx.setLineDash([14, 12]); ctx.lineDashOffset = -t * 30; ctx.beginPath(); ctx.ellipse(x, 480, 70, 80, 0, 0, 7); ctx.stroke(); ctx.strokeRect(x - 80, 570, 160, 220); ctx.setLineDash([]); ctx.restore();
      G.text(ctx, lab, x, 860, { size: 40, fam: 'Inter', weight: 800, color: C.ln, align: 'center', alpha: k, boil: 0 }); G.text(ctx, '?', x, 710, { size: 90, fam: 'Bungee', color: C.yel, align: 'center', alpha: k, boil: 0 }); };
    slot(360, 'BUYER', ev.c6_buyer); slot(1560, 'SELLER', ev.c6_seller);
    P.note(ctx, 'nobody to sell to', null, null, 960, 920, t, ev.c6_nobody, { size: 46 });
    P.note(ctx, 'nowhere else to go', null, null, 960, 975, t, ev.c6_nowhere, { size: 40, color: C.ln });
    Ch.pip(ctx, { x: 1240, y: 900, s: 0.75, t, dir: -1, gesture: 'shrug', mouth: P.talk(t), look: -1, a: P.fin(t, ev.c6_neither, 0.3) });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S7 — NO MARKET → NO PRICE
  P.shot(ev.c6_s7, (ctx, t, s) => {
    P.bp(ctx, t);
    ctx.save(); P.push(ctx, s.u, 960, 540, 0.03);
    P.globe(ctx, 960, 560, 300, t, { lon0: 230 + t * 12, k: 1, a: 0.5 });
    P.stamp(ctx, 'NO MARKET', 960, 440, t, ev.c6_market, { size: 110, color: C.ink2, fg: C.ln, rot: -0.03 });
    P.stamp(ctx, 'NO PRICE', 960, 660, t, ev.c6_noprice, { size: 130, color: C.yel, fg: C.ink2, rot: 0.02 });
    ctx.restore();
  }, { in: { type: 'fade', dur: 0.3 } });
})();
