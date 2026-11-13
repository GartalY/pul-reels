// Chapter 4 — The free stuff: forests, wetlands, bees, oceans · Costanza et al. 2014 · ≈ $125 tn of services EVERY YEAR ·
// vs a world economy of ≈ $75 tn/yr then: nature did more work, for free · losses from cleared land $4–20 tn/yr ·
// none of it in the $518 tn: nobody owns the rain · an estimate, not a price → what else is missing?
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C; const A = P.A;
  const W = G.W, H = G.H;
  P.cardShot('c4', 4, 'The free stuff', (ctx, t) => { for (let i = 0; i < 7; i++) P.art(ctx, A.tree(200), 1, { x: ((t * 35 + i * 330) % 2300) - 160, y: 1060, a: 0.18, color: C.mint }); });
  const bees = (ctx, t, x0, y0, x1, y1, n, a = 1) => { for (let i = 0; i < n; i++) { const u = ((t * 0.25 + i / n) % 1); const x = lerp(x0, x1, u), y = lerp(y0, y1, u) - Math.sin(u * Math.PI) * 120 + Math.sin(t * 9 + i) * 10; P.art(ctx, A.bee(20), 1, { x, y, lw: 3, a }); } };

  // S1 — the landscape draws itself: forests clean air + hold soil · wetlands filter water · bees carry pollen · oceans feed billions
  P.shot(ev.c4_s1, (ctx, t, s) => {
    P.bp(ctx, t);
    ctx.save(); P.push(ctx, s.u, 960, 600, 0.03);
    P.line(ctx, -100, 700, 1260, 700, C.ln, 5);
    const fk = P.oc((t - ev.c4_forest + 0.2) / 1.0); [[150, 300], [280, 360], [410, 280]].forEach(([x, h], i) => P.art(ctx, A.tree(h), clamp(fk * 1.5 - i * 0.2), { x, y: 700, color: C.mint }));
    if (fk > 0.5) for (let i = 0; i < 4; i++) { const u = ((t * 0.4 + i / 4) % 1); P.art(ctx, [[[200 + i * 60, 300 - u * 160], [220 + i * 60, 280 - u * 160], [200 + i * 60, 260 - u * 160]]], 1, { color: C.cyan, lw: 4, a: Math.sin(u * Math.PI) }); }
    P.ytag(ctx, 'CLEAN AIR · HOLD SOIL', 290, 790, t, ev.c4_forest + 0.3, 1e9, { size: 30, fill: C.mint });
    const wk = P.oc((t - ev.c4_wet + 0.2) / 0.8); P.art(ctx, [[[540, 700], [600, 690], [660, 705], [720, 692], [780, 700]], [[560, 730], [620, 720], [680, 735], [740, 722]], ...[0, 1, 2, 3, 4].map((i) => [[560 + i * 50, 700], [565 + i * 50, 620 + (i % 2) * 20]])], wk, { color: C.cyan, lw: 4 });
    P.ytag(ctx, 'FILTER WATER', 660, 790, t, ev.c4_wet + 0.3, 1e9, { size: 30, fill: C.cyan });
    const bk = P.fin(t, ev.c4_bees - 0.2, 0.4); for (let i = 0; i < 5; i++) P.art(ctx, [[[880 + i * 60, 700], [880 + i * 60, 620]], P.circPts(880 + i * 60, 605, 16, 14)], bk, { color: C.yel, lw: 4 }); if (bk > 0) bees(ctx, t, 160, 380, 1100, 600, 5, bk);
    P.ytag(ctx, 'POLLINATE CROPS', 1000, 790, t, ev.c4_bees + 0.3, 1e9, { size: 30 });
    const ok = P.oc((t - ev.c4_ocean + 0.2) / 0.8); if (ok > 0) { P.art(ctx, [[[1260, 700], [1340, 690], [1420, 705], [1500, 690], [1580, 705], [1660, 692], [1820, 700]]], ok, { color: C.cyan, lw: 5 });
      for (let i = 0; i < 4; i++) P.art(ctx, A.fish(36), 1, { x: 1330 + ((t * 60 + i * 140) % 500), y: 800 + i * 40, a: ok, color: C.cyan, lw: 3 }); }
    P.ytag(ctx, 'FEED BILLIONS', 1540, 600, t, ev.c4_ocean + 0.3, 1e9, { size: 30, fill: C.cyan });
    ctx.restore();
    P.write(ctx, 'what nature does for free', 960, 140, t, ev.c4_s1 + 0.3, { size: 60, color: C.ln, hl: ['free'], hlColor: C.mint });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — 2014: a team led by ecologist Robert Costanza estimates what these services are worth
  P.shot(ev.c4_s2, (ctx, t, s) => {
    P.bp(ctx, t);
    const dk = P.oc((t - ev.c4_2014) / 0.8);
    P.at(ctx, 720, 560, 1, -0.04, () => { P.art(ctx, [{ pts: P.rectPts(-300, -380, 600, 760), closed: true, fill: 'rgba(234,244,255,0.08)' }, ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => [[-240, -160 + i * 56], [240 - (i % 3) * 60, -160 + i * 56]])], dk, { lw: 4 });
      G.text(ctx, 'Changes in the global value', 0, -300, { size: 34, fam: 'Inter', weight: 800, color: C.ln, align: 'center', alpha: dk, boil: 0 }); G.text(ctx, 'of ecosystem services', 0, -258, { size: 34, fam: 'Inter', weight: 800, color: C.ln, align: 'center', alpha: dk, boil: 0 });
      G.text(ctx, 'Costanza et al. · 2014', 0, -205, { size: 30, fam: P.HAND, color: C.yel, align: 'center', alpha: P.fin(t, ev.c4_cost, 0.4), boil: 0 }); });
    P.ytag(ctx, 'GLOBAL ENVIRONMENTAL CHANGE · 2014', 720, 1000, t, ev.c4_2014 + 0.2, 1e9, { size: 30 });
    Ch.pip(ctx, { x: 1440, y: 880, s: 1.1, t, dir: -1, gesture: t > ev.c4_worth ? 'point' : 'write', mouth: P.talk(t), look: -1 });
    P.note(ctx, 'what is it all worth?', null, null, 1440, 380, t, ev.c4_worth, { size: 48 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — ≈ $125 trillion, EVERY YEAR (a bill nobody sends)
  P.shot(ev.c4_s3, (ctx, t, s) => {
    P.bp(ctx, t);
    P.at(ctx, 960, 560, 1, Math.sin(t * 0.8) * 0.015, () => { P.panel(ctx, -620, -330, 1240, 620, P.fin(t, ev.c4_s3, 0.4));
      G.text(ctx, 'INVOICE · TO: HUMANITY', -560, -250, { size: 40, fam: 'Inter', weight: 800, color: C.ln2, alpha: P.fin(t, ev.c4_s3 + 0.2, 0.3), boil: 0 });
      ['clean air', 'fresh water', 'pollination', 'fish', 'soil'].forEach((w, i) => G.text(ctx, '· ' + w, -560, -170 + i * 44, { size: 32, fam: P.HAND, color: C.ln, alpha: P.fin(t, ev.c4_s3 + 0.3 + i * 0.1, 0.3), boil: 0 })); });
    P.bcount(ctx, { x: 1180, y: 560, to: 125, t, t0: ev.c4_125a, t1: ev.c4_125, size: 150, prefix: '$', sub: 'TRILLION', subSize: 50 });
    P.stamp(ctx, 'EVERY YEAR', 1180, 800, t, ev.c4_year, { size: 70, color: C.mint, fg: C.ink2 });
    P.note(ctx, 'never sent', null, null, 560, 820, t, ev.c4_year + 0.6, { size: 52, color: C.cor });
    P.source(ctx, 'Costanza et al., Global Environmental Change 26 (2014), in 2007 US$', t, ev.c4_125);
  }, { in: { type: 'fade', dur: 0.35 } });

  // S4 — vs the world economy then: ≈ $75 tn a year. Nature did more work than all of us, for free.
  P.shot(ev.c4_s4, (ctx, t, s) => {
    P.bp(ctx, t);
    const b1 = P.eio((t - ev.c4_s4 - 0.4) / 0.9), b2 = P.eio((t - ev.c4_nature + 0.2) / 0.9);
    P.line(ctx, 260, 900, 1660, 900, C.ln, 5);
    P.rect(ctx, 460, 900 - 360 * b1, 300, 360 * b1, 6, 'rgba(234,244,255,0.2)', { stroke: C.ln, lw: 4 }); P.art(ctx, A.factory(200), b1, { x: 610, y: 900 - 360 * b1 - 10, lw: 3.5 });
    P.rect(ctx, 1160, 900 - 600 * b2, 300, 600 * b2, 6, 'rgba(110,231,183,0.4)', { stroke: C.mint, lw: 4 }); P.art(ctx, A.tree(160), b2, { x: 1310, y: 900 - 600 * b2 - 10, color: C.mint });
    if (b1 > 0.5) { G.text(ctx, '$75 T', 610, 960, { size: 50, fam: 'Bungee', color: C.ln, align: 'center', boil: 0 }); G.text(ctx, 'world economy / year', 610, 1010, { size: 30, fam: 'Inter', weight: 700, color: C.ln2, align: 'center', boil: 0 }); }
    if (b2 > 0.5) { G.text(ctx, '$125 T', 1310, 960, { size: 50, fam: 'Bungee', color: C.mint, align: 'center', boil: 0 }); G.text(ctx, 'nature’s services / year', 1310, 1010, { size: 30, fam: 'Inter', weight: 700, color: C.ln2, align: 'center', boil: 0 }); }
    P.stamp(ctx, 'FOR FREE', 960, 220, t, ev.c4_free, { size: 84, color: C.mint, fg: C.ink2 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S5 — cut forests, drained wetlands: a loss of $4–20 trillion a year (same study)
  P.shot(ev.c4_s5, (ctx, t, s) => {
    P.bp(ctx, t);
    P.line(ctx, 100, 720, 1820, 720, C.ln, 5);
    for (let i = 0; i < 8; i++) { const x = 180 + i * 170; const fall = P.eio((t - ev.c4_cut - i * 0.12) / 0.6); ctx.save(); ctx.translate(x, 720); ctx.rotate(fall * 1.45); P.art(ctx, A.tree(240), 1, { color: C.mint, a: 1 - 0.6 * fall }); ctx.restore(); if (fall > 0.95) P.circ(ctx, x, 720, 18, C.ln2); }
    const dr = P.fin(t, ev.c4_drain, 1.2); P.art(ctx, [[[1560, 720], [1640, 712], [1720, 724], [1800, 714]]], 1 - dr, { color: C.cyan });
    const k4 = P.fin(t, ev.c4_4 - 0.1, 0.25); if (k4 > 0) P.digits(ctx, t < ev.c4_20 ? '$4' : '$4–20 T', 960, 330, { size: 110, a: k4, land: Math.exp(-(t - (t < ev.c4_20 ? ev.c4_4 : ev.c4_20)) * 3) });
    G.text(ctx, 'PER YEAR', 960, 410, { size: 40, fam: 'Inter', weight: 800, color: C.ln2, align: 'center', boil: 0, alpha: P.fin(t, ev.c4_20, 0.3) });
    P.note(ctx, 'lost when land is cleared', null, null, 960, 500, t, ev.c4_loss, { size: 48, color: C.cor });
  }, { in: { type: 'fade', dur: 0.35 } });

  // S6 — none of it is in the $518 tn: nobody owns the rain, so no bank can count it
  P.shot(ev.c4_s6, (ctx, t, s) => {
    P.bp(ctx, t);
    P.panel(ctx, 560, 560, 800, 300, 1); P.digits(ctx, '$518 T', 960, 760, { size: 120 }); G.text(ctx, 'WHAT PEOPLE OWN', 960, 620, { size: 32, fam: 'Inter', weight: 800, color: C.ln2, align: 'center', boil: 0 });
    P.art(ctx, A.cloud(380), P.oc((t - ev.c4_rain + 0.4) / 0.6), { x: 960, y: 240 });
    if (t > ev.c4_rain - 0.1) for (let i = 0; i < 34; i++) { const u = ((t - ev.c4_rain) * 1.4 + U.hash(i, 1)) % 1; const x = 720 + U.hash(i, 2) * 480; const y = 300 + u * 250; const bounce = y > 540; P.line(ctx, x + (bounce ? (u - 0.96) * 300 * (i % 2 ? 1 : -1) : 0), bounce ? 540 - (u - 0.96) * 400 : y, x, (bounce ? 540 : y) + 26, C.cyan, 4, 0.8); }
    P.stamp(ctx, 'NOT COUNTED', 960, 960, t, ev.c4_count, { size: 66, color: C.cor });
    P.note(ctx, 'nobody owns the rain', null, null, 1480, 330, t, ev.c4_rain + 0.2, { size: 50 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S7 — an estimate, not a price anyone pays. What else is missing?
  P.shot(ev.c4_s7, (ctx, t, s) => {
    P.bp(ctx, t);
    P.ytag(ctx, 'ESTIMATE  ≠  PRICE', 600, 300, t, ev.c4_est, 1e9, { size: 52 });
    const qk = P.pop(t, ev.c4_missing, 0.5); if (qk > 0) { ctx.save(); ctx.globalAlpha *= clamp(qk); ctx.strokeStyle = C.yel; ctx.lineWidth = 5; ctx.setLineDash([18, 14]); ctx.lineDashOffset = -t * 40; ctx.strokeRect(460, 420, 300, 300); ctx.setLineDash([]); ctx.restore();
      G.text(ctx, '?', 610, 660, { size: 230 * qk, fam: 'Bungee', color: C.yel, align: 'center', boil: 0 }); }
    P.write(ctx, 'what else is missing?', 610, 880, t, ev.c4_missing - 0.3, { size: 64, color: C.ln, hl: ['missing?'], hlColor: C.yel });
    Ch.pip(ctx, { x: 1400, y: 900, s: 1.2, t, dir: -1, gesture: t > ev.c4_bigger ? 'think' : 'shrug', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'fade', dur: 0.35 } });
})();
