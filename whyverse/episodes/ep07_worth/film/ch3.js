// Chapter 3 — Where is the money? US money (M2) ≈ $23 tn (Sept 2026) · only ≈ $2.4 tn is paper and coins: 1 dollar in 10 ·
// the other nine are digits (tap a card) · banks lend deposits out again · a house is worth what someone pays today ·
// everyone sells the same morning → crash, the wealth vanishes · worth = a price; some things have no price tag.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C; const A = P.A;
  const W = G.W, H = G.H;
  P.cardShot('c3', 3, 'Where is the money?', (ctx, t) => { for (let i = 0; i < 6; i++) P.art(ctx, A.note(170), 1, { x: ((t * 45 + i * 380) % 2300) - 160, y: 1000 + Math.sin(t + i) * 20, rot: Math.sin(t * 0.7 + i) * 0.3, a: 0.18, color: C.mint }); });

  // S1 — the United States, Sept 2026: ≈ $23 trillion in cash, bank accounts and savings (M2)
  P.shot(ev.c3_s1, (ctx, t, s) => {
    P.bp(ctx, t);
    const mk = P.oc((t - ev.c3_us + 0.2) / 1.0);
    ctx.save(); ctx.translate(560, 560); ctx.globalAlpha *= mk; // simplified US outline from GEO
    const GEO = globalThis.GEO; const ring = GEO.world['United States of America'] || GEO.world['United States']; if (ring) { const big = ring.slice().sort((a, b) => b.length - a.length)[0]; const pts = []; for (let i = 0; i < big.length; i += 2) if (big[i] > -126 && big[i + 1] < 50) pts.push([(big[i] + 96) * 13, -(big[i + 1] - 38) * 16]); P.art(ctx, [{ pts, closed: true, fill: 'rgba(234,244,255,0.1)' }], mk, { lw: 4 }); }
    ctx.restore();
    P.ytag(ctx, 'SEPTEMBER 2026', 560, 220, t, ev.c3_sep, 1e9, { size: 38 });
    P.bcount(ctx, { x: 1360, y: 520, to: 23, t, t0: ev.c3_23a, t1: ev.c3_23, size: 160, prefix: '$', suffix: ' T' });
    P.note(ctx, 'cash + bank accounts + savings', null, null, 1360, 640, t, ev.c3_23, { size: 44, color: C.ln });
    P.note(ctx, '(“M2”, US Federal Reserve)', null, null, 1360, 710, t, ev.c3_23 + 0.4, { size: 36, color: C.ln2 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — only ≈ $2.4 tn of it is real paper and coins: one dollar in ten
  P.shot(ev.c3_s2, (ctx, t, s) => {
    P.bp(ctx, t);
    for (let i = 0; i < 10; i++) { const x = 300 + i * 140; const k = P.pop(t, ev.c3_s2 + 0.2 + i * 0.05, 0.3); if (k <= 0) continue; const cash = i === 0; const hot = cash && t > ev.c3_24;
      const h = 420; ctx.save(); ctx.globalAlpha *= k; for (let j = 0; j < 12; j++) P.art(ctx, [[[x - 50, 800 - j * 34], [x + 50, 800 - j * 34]]], 1, { color: hot ? C.yel : C.ln2, lw: hot ? 7 : 4 }); ctx.restore();
      if (hot) P.art(ctx, A.note(110), 1, { x, y: 380, color: C.mint }); else if (t > ev.c3_ten) G.text(ctx, '0101', x, 380, { size: 30, fam: 'Bungee', color: C.ln2, align: 'center', boil: 0 }); }
    P.dim(ctx, 230, 860, 1640, 860, '$23 T', P.fin(t, ev.c3_s2 + 0.6, 0.6), { size: 36, color: C.ln });
    P.bcount(ctx, { x: 300, y: 980, to: 2.4, decimals: 1, t, t0: ev.c3_24 - 0.3, t1: ev.c3_24 + 0.3, size: 70, prefix: '$', suffix: ' T', align: 'left' });
    P.note(ctx, 'paper + coins', 300, 340, 600, 250, t, ev.c3_paper, { size: 46 });
    P.stamp(ctx, '1 IN 10', 1320, 230, t, ev.c3_ten, { size: 88, color: C.yel, fg: C.ink2 });
    P.source(ctx, 'Federal Reserve H.6, Sept 2026', t, ev.c3_24);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — the other nine are just numbers: digits in bank computers, moving when you tap a card
  P.shot(ev.c3_s3, (ctx, t, s) => {
    P.bp(ctx, t);
    P.screen(ctx, 620, 880, 760, 0, t, P.oc((t - ev.c3_s3) / 0.8));
    P.note(ctx, 'just numbers', null, null, 620, 180, t, ev.c3_nums, { size: 56 });
    // the tap: a card swings to a reader, ripples, a digit packet flies to the screen
    const sw = P.eio((t - ev.c3_tap + 0.5) / 0.5); P.art(ctx, [P.rectPts(1380, 520, 220, 300), P.rectPts(1420, 560, 140, 70), [[1430, 700], [1550, 700]], [[1430, 740], [1520, 740]]], 1, { lw: 4 });
    P.art(ctx, A.card(240), 1, { x: lerp(1700, 1490, sw), y: lerp(300, 450, sw), rot: lerp(0.5, 0, sw), color: C.yel });
    if (t > ev.c3_tap) { for (let i = 0; i < 3; i++) P.ring(ctx, 1490, 600, t, ev.c3_tap + i * 0.15, { r: 180, color: C.mint, dur: 0.8 }); const u = P.eio((t - ev.c3_tap - 0.2) / 0.8); if (u > 0 && u < 1) P.digits(ctx, '-$4', lerp(1490, 800, u), lerp(600, 520, u) - Math.sin(u * Math.PI) * 120, { size: 60, hot: C.mint, land: 1 }); }
    P.ytag(ctx, 'TAP', 1490, 900, t, ev.c3_tap, 1e9, { size: 40 });
  }, { in: { type: 'fade', dur: 0.35 } });

  // S4 — banks lend most deposits out again; the loan becomes someone else's deposit (a loop)
  P.shot(ev.c3_s4, (ctx, t, s) => {
    P.bp(ctx, t);
    const k = P.oc((t - ev.c3_s4) / 0.8);
    P.art(ctx, [{ pts: [[760, 760], [1160, 760], [1160, 520], [760, 520]], closed: true, fill: 'rgba(234,244,255,0.07)' }, [[730, 520], [960, 380], [1190, 520]], ...[0, 1, 2, 3].map((i) => [[800 + i * 110, 560], [800 + i * 110, 740]])], k, { lw: 5 });
    G.text(ctx, 'BANK', 960, 490, { size: 40, fam: 'Inter', weight: 800, color: C.yel, align: 'center', alpha: k, boil: 0 });
    P.person(ctx, 360, 860, 0.9, t, { k, seed: 1 }); P.person(ctx, 1560, 860, 0.9, t, { k: P.fin(t, ev.c3_loan, 0.4), seed: 2, color: C.cyan, fill: 'rgba(127,211,255,0.15)' });
    G.text(ctx, 'YOU', 360, 920, { size: 34, fam: 'Inter', weight: 800, color: C.ln2, align: 'center', alpha: k, boil: 0 });
    G.text(ctx, 'SOMEONE ELSE', 1560, 920, { size: 34, fam: 'Inter', weight: 800, color: C.cyan, align: 'center', alpha: P.fin(t, ev.c3_loan, 0.4), boil: 0 });
    const path1 = [[440, 620], [600, 560], [760, 600]], path2 = [[1160, 600], [1320, 560], [1480, 620]], path3 = [[1560, 540], [1300, 300], [620, 300], [360, 540]];
    P.trace(ctx, path1, P.eio((t - ev.c3_s4 - 0.3) / 0.6), C.ln, 6); P.trace(ctx, path2, P.eio((t - ev.c3_lend) / 0.7), C.yel, 7); P.trace(ctx, path3, P.eio((t - ev.c3_dep) / 0.9), C.cyan, 5, 1, [14, 12]);
    const coinOn = (pts, t0, d) => { const u = ((t - t0) / d); if (u < 0) return; const [x, y] = P.along(pts, u % 1); P.art(ctx, A.coin(24), 1, { x, y, lw: 3 }); };
    coinOn(path1, ev.c3_s4 + 0.3, 1.4); coinOn(path2, ev.c3_lend, 1.4); if (t > ev.c3_dep) coinOn(path3, ev.c3_dep, 2.2);
    P.ytag(ctx, 'NOT IN A DRAWER', 600, 160, t, ev.c3_drawer, 1e9, { size: 36 }); P.ytag(ctx, 'LOAN', 1320, 470, t, ev.c3_loan, 1e9, { size: 34 }); P.ytag(ctx, 'A NEW DEPOSIT', 960, 240, t, ev.c3_dep + 0.3, 1e9, { size: 36, fill: C.cyan });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S5 — a house is worth $500,000 only because someone would pay that today
  P.shot(ev.c3_s5, (ctx, t, s) => {
    P.bp(ctx, t);
    P.art(ctx, A.house(440), P.oc((t - ev.c3_house + 0.3) / 0.9), { x: 640, y: 860, lw: 6 });
    const tg = P.pop(t, ev.c3_500, 0.4); if (tg > 0) P.at(ctx, 980, 480, tg, Math.sin(t * 2) * 0.06, () => { P.line(ctx, -120, -40, 0, 0, C.ln, 3); P.rect(ctx, 0, -50, 330, 100, 12, C.yel); P.circ(ctx, 24, 0, 10, C.bp); G.text(ctx, '$500,000', 180, 18, { size: 50, fam: 'Bungee', color: C.ink2, align: 'center', boil: 0 }); });
    P.person(ctx, 1480, 880, 1.0, t, { pose: t > ev.c3_someone + 0.4 ? 'raise' : 'stand', prop: t > ev.c3_someone + 0.4 ? 'paddle' : null, num: '$', k: P.fin(t, ev.c3_someone, 0.4), color: C.cyan, fill: 'rgba(127,211,255,0.15)' });
    P.panel(ctx, 380, 110, 1160, 140, P.fin(t, ev.c3_today - 0.2, 0.4)); P.write(ctx, 'PRICE = WHAT SOMEONE PAYS TODAY', 960, 200, t, ev.c3_today - 0.1, { size: 44, color: C.yel });
  }, { in: { type: 'fade', dur: 0.35 } });

  // S6 — everyone sells on the same morning → prices crash, the wealth just vanishes
  P.shot(ev.c3_s6, (ctx, t, s) => {
    P.bp(ctx, t);
    for (let i = 0; i < 6; i++) { const x = 190 + i * 250; P.art(ctx, A.house(170), 1, { x, y: 560, lw: 4 }); const k = P.pop(t, ev.c3_everyone + i * 0.09, 0.3);
      if (k > 0) P.at(ctx, x + 70, 470, k, Math.sin(t * 3 + i) * 0.08, () => { P.line(ctx, 0, 0, 0, 90, C.ln, 4); P.rect(ctx, -60, -46, 120, 52, 6, C.cor); G.text(ctx, 'SALE', 0, -10, { size: 28, fam: 'Inter', weight: 800, color: C.ln, align: 'center', boil: 0 }); }); }
    P.sun(ctx, 1700, 200, 60 * P.fin(t, ev.c3_morning - 0.3, 0.5), t, { color: C.yel, a: P.fin(t, ev.c3_morning - 0.3, 0.5) });
    // price chart: steady then a crash
    const X0 = 220, X1 = 1700, Y0 = 760, cp = []; const ck = P.eio((t - ev.c3_crash + 0.6) / 1.0);
    for (let i = 0; i <= 40; i++) { const u = i / 40; const crash = u > 0.7 ? ease.inCubic((u - 0.7) / 0.3) : 0; cp.push([lerp(X0, X1, u), Y0 + 40 - 30 * Math.sin(u * 9) * 0.3 + crash * 230 - u * 30]); }
    P.line(ctx, X0, 1010, X1, 1010, C.ln2, 3, P.fin(t, ev.c3_s6, 0.3)); P.trace(ctx, cp, ck, C.cor, 7);
    // dots of value evaporate upward
    if (t > ev.c3_vanish - 0.2) for (let i = 0; i < 30; i++) { const u = t - ev.c3_vanish + 0.2 - U.hash(i, 5) * 0.4; if (u < 0 || u > 1.6) continue; P.circ(ctx, 200 + U.hash(i, 6) * 1500, 560 - u * 300, 8 * (1 - u / 1.6), C.yel, { a: 1 - u / 1.6 }); }
    P.stamp(ctx, 'CRASH', 1500, 880, t, ev.c3_crash, { size: 70, color: C.cor });
    P.note(ctx, '…it simply vanishes', null, null, 900, 210, t, ev.c3_vanish, { size: 54 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S7 — worth ≠ a pile of stuff. Worth = a price. Some of the most valuable things have no price tag at all.
  P.shot(ev.c3_s7, (ctx, t, s) => {
    P.bp(ctx, t);
    P.panel(ctx, 260, 150, 1400, 300, P.fin(t, ev.c3_s7, 0.4));
    P.write(ctx, 'WORTH  ≠  A PILE OF STUFF', 960, 280, t, ev.c3_pile - 0.2, { size: 70, color: C.ln2 });
    P.write(ctx, 'WORTH  =  A PRICE', 960, 390, t, ev.c3_price, { size: 80, color: C.yel });
    const tk = P.oc((t - ev.c3_tag + 0.6) / 1.0); P.art(ctx, A.tree(360), tk, { x: 600, y: 960 }); P.art(ctx, A.cloud(260), tk, { x: 1000, y: 620 }); P.art(ctx, [[[1180, 900], [1300, 870], [1420, 900], [1540, 870], [1660, 900]], [[1180, 960], [1300, 930], [1420, 960], [1540, 930], [1660, 960]]], tk, { color: C.cyan });
    const tg = P.pop(t, ev.c3_tag, 0.4); if (tg > 0) P.at(ctx, 760, 720, tg, -0.1, () => { P.rect(ctx, 0, -40, 220, 80, 10, 'rgba(0,0,0,0)', { stroke: C.yel, lw: 4 }); G.text(ctx, '$ ???', 110, 16, { size: 44, fam: 'Bungee', color: C.yel, align: 'center', boil: 0 }); P.cross(ctx, -10, -50, 230, 50, (t - ev.c3_tag - 0.3) / 0.4, { lw: 8 }); });
    P.note(ctx, 'no price tag at all', null, null, 1240, 700, t, ev.c3_tag + 0.3, { size: 52 });
  }, { in: { type: 'fade', dur: 0.35 } });
})();
