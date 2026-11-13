// Chapter 1 — Everything we own: the UBS ledger (houses, savings, shares, pensions − debts) · ≈ $518 trillion (56 markets) ·
// 1 dollar a second = 16 million years · ≈ $130k per adult, but not shared evenly · +11 %, ~1 million new millionaires ·
// under our feet: real estate $393 tn, ~73 % homes · bigger than shares + bonds + gold · "isn't gold the treasure?"
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C; const A = P.A;
  const W = G.W, H = G.H;
  P.cardShot('c1', 1, 'Everything we own', (ctx, t) => { for (let i = 0; i < 6; i++) P.art(ctx, A.house(160), 1, { x: ((t * 40 + i * 360) % 2300) - 180, y: 1040, a: 0.18 }); });

  // S1 — the ledger
  P.shot(ev.c1_s1, (ctx, t, s) => {
    P.bp(ctx, t);
    P.kicker(ctx, 'UBS Global Wealth Report', t, ev.c1_s1 + 0.2, { color: C.yel });
    P.panel(ctx, 260, 190, 980, 760, P.fin(t, ev.c1_s1, 0.6));
    G.text(ctx, 'WHAT PEOPLE OWN', 320, 280, { size: 44, fam: 'Inter', weight: 800, color: C.yel, alpha: P.fin(t, ev.c1_s1 + 0.3, 0.3), boil: 0 });
    const rows = [['HOUSES', '+', (x, y, k) => P.art(ctx, A.house(110), k, { x, y: y + 34 })], ['SAVINGS', '+', (x, y, k) => P.art(ctx, A.coin(38), k, { x, y })], ['SHARES', '+', (x, y, k) => P.art(ctx, [[[x - 50, y + 30], [x - 20, y], [x, y + 14], [x + 50, y - 34]], [[x + 30, y - 34], [x + 50, y - 34], [x + 50, y - 14]]], k, {})], ['PENSIONS', '+', (x, y, k) => P.art(ctx, [P.rectPts(x - 40, y - 34, 80, 68), [[x - 40, y - 10], [x + 40, y - 10]], [[x - 12, y - 34], [x - 12, y - 46], [x + 12, y - 46], [x + 12, y - 34]]], k, {})], ['DEBTS', '−', (x, y, k) => P.art(ctx, A.card(100), k, { x, y, color: C.cor })]];
    rows.forEach(([lab, sign, icon], i) => { const t0 = ev.c1_rows[i]; const k = P.oc((t - t0 + 0.15) / 0.5); if (k <= 0) return; const y = 380 + i * 112;
      icon(390, y - 14, k); G.text(ctx, lab, 480, y + 2, { size: 54, fam: 'Inter', weight: 800, color: i === 4 ? C.cor : C.ln, alpha: k, boil: 0 });
      G.text(ctx, sign, 1150, y + 6, { size: 74, fam: 'Bungee', color: i === 4 ? C.cor : C.yel, align: 'center', alpha: k, boil: 0 }); P.line(ctx, 330, y + 40, 1180, y + 40, C.ln3, 2, 1, k); });
    Ch.pip(ctx, { x: 1530, y: 900, s: 1.05, t, dir: -1, gesture: 'write', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — ≈ $518 trillion at the end of 2025, only the 56 markets UBS tracks
  P.shot(ev.c1_s2, (ctx, t, s) => {
    P.bp(ctx, t);
    P.globe(ctx, 1460, 520, 300, t, { lon0: -20 + t * 10, lat0: 20, k: P.oc((t - ev.c1_s2) / 1.2) });
    const yr = P.pop(t, ev.c1_2025, 0.35); if (yr > 0) P.ytag(ctx, 'END OF 2025', 1460, 140, t, ev.c1_2025, 1e9, { size: 40 });
    P.note(ctx, 'latest report', null, null, 560, 250, t, ev.c1_report, { size: 46, color: C.ln2 });
    P.bcount(ctx, { x: 560, y: 520, to: 518, t, t0: ev.c1_518a, t1: ev.c1_518, size: 170, prefix: '$', sub: 'TRILLION', subSize: 54 });
    const k56 = P.fin(t, ev.c1_56, 0.4); if (k56 > 0) { P.ytag(ctx, 'ONLY 56 MARKETS', 560, 800, t, ev.c1_56, 1e9, { size: 40 }); P.note(ctx, '≈ 92 % of the world’s wealth', null, null, 560, 880, t, ev.c1_56 + 0.4, { size: 40, color: C.ln }); }
    for (let i = 0; i < 18; i++) { const a = U.hash(i, 3) * 6.28, d = 0.2 + 0.7 * U.hash(i, 4); const k = P.pop(t, ev.c1_56 + i * 0.04, 0.3); if (k <= 0) continue; P.circ(ctx, 1460 + Math.cos(a + t * 0.17) * 300 * d, 520 + Math.sin(a) * 260 * d, 9 * k, C.yel); }
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — count one dollar a second: ~16 million years (Homo sapiens ≈ 300,000 years — a sliver)
  P.shot(ev.c1_s3, (ctx, t, s) => {
    P.bp(ctx, t);
    const dg = '500,000,000,000,000'; const nk = P.eio((t - ev.c1_s3 - 0.2) / 1.4); if (nk > 0) P.digits(ctx, dg.slice(0, Math.max(1, Math.round(dg.length * nk))), 960, 200, { size: 74, a: P.fout(t, ev.c1_count + 0.6, 0.4) });
    P.note(ctx, 'hard to picture…', null, null, 960, 300, t, ev.c1_hard, { size: 46, t1: ev.c1_count + 0.6 });
    // stopwatch
    const sk = P.oc((t - ev.c1_s3) / 0.8); P.art(ctx, [P.circPts(380, 470, 190, 64, -Math.PI / 2, Math.PI * 1.5), P.rectPts(350, 240, 60, 30), [[380, 240], [380, 270]]], sk, { lw: 6 });
    for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; P.line(ctx, 380 + Math.cos(a) * 160, 470 + Math.sin(a) * 160, 380 + Math.cos(a) * 178, 470 + Math.sin(a) * 178, C.ln2, 4, sk); }
    const run = t > ev.c1_count; const ha = (t - ev.c1_s3) * 1.2 + (run ? (t - ev.c1_count) * 5 : 0); P.line(ctx, 380, 470, 380 + Math.sin(ha) * 150, 470 - Math.cos(ha) * 150, C.yel, 7, sk);
    if (run) { const n = Math.floor(t - ev.c1_count) + 1; P.digits(ctx, '$' + n, 380, 780, { size: 80 }); P.note(ctx, '1 dollar every second', null, null, 380, 870, t, ev.c1_sec, { size: 40, color: C.ln }); }
    // timeline
    const tk = P.eio((t - ev.c1_16 + 0.8) / 1.0);
    P.line(ctx, 760, 520, 1760, 520, C.ln, 6, 1, tk); P.line(ctx, 760, 490, 760, 550, C.ln, 6, tk); P.line(ctx, 1760, 490, 1760, 550, C.ln, 6, tk);
    if (tk > 0.9) { G.text(ctx, 'START', 760, 610, { size: 34, fam: 'Inter', weight: 800, color: C.ln2, align: 'center', boil: 0 }); G.text(ctx, 'DONE', 1760, 610, { size: 34, fam: 'Inter', weight: 800, color: C.ln2, align: 'center', boil: 0 }); }
    P.bcount(ctx, { x: 1260, y: 380, to: 16, t, t0: ev.c1_16 - 0.5, t1: ev.c1_16, size: 130, sub: 'MILLION YEARS', subSize: 50 });
    const hs = P.fin(t, ev.c1_16 + 1.0, 0.4); if (hs > 0) { P.rect(ctx, 1760 - 19, 500, 19, 40, 3, C.yel, { a: hs }); P.note(ctx, 'all of human history (≈ 300,000 years)', 1752, 540, 1420, 720, t, ev.c1_16 + 1.0, { size: 38 }); }
  }, { in: { type: 'fade', dur: 0.35 } });

  // S4 — shared evenly ≈ $130,000 per adult; but it isn't, most people own far less
  P.shot(ev.c1_s4, (ctx, t, s) => {
    P.bp(ctx, t);
    const uneven = P.eio((t - ev.c1_isnt) / 1.0);
    const hs = [0.2, 0.35, 0.15, 0.5, 0.25, 0.3, 4.2, 0.4, 0.18, 0.6, 1.2, 0.22];
    for (let i = 0; i < 12; i++) { const x = 230 + i * 130; const k = P.pop(t, ev.c1_s4 + 0.2 + i * 0.05, 0.35); if (k <= 0) continue;
      const h = lerp(200, 60 + hs[i] * 140, uneven); P.rect(ctx, x - 40, 900 - h, 80, h, 6, i === 6 && uneven > 0.5 ? C.yel : 'rgba(255,213,74,0.55)', { a: k });
      P.person(ctx, x, 1060, 0.55, t, { seed: i, k }); }
    P.bcount(ctx, { x: 960, y: 330, to: 130000, t, t0: ev.c1_130 - 0.9, t1: ev.c1_130, size: 110, prefix: '≈ $', fmt: (n) => Data.number(Math.round(n / 1000) * 1000), tEnd: ev.c1_isnt + 0.4 });
    P.note(ctx, 'per adult — if shared evenly', null, null, 960, 430, t, ev.c1_130, { size: 42, t1: ev.c1_isnt + 0.4 });
    P.stamp(ctx, 'BUT IT ISN’T', 960, 300, t, ev.c1_isnt + 0.4, { size: 80, color: C.cor });
    P.note(ctx, 'most people own far less', null, null, 960, 450, t, ev.c1_less, { size: 46 });
  }, { in: { type: 'fade', dur: 0.35 } });

  // S5 — in one year +11 %; nearly a million new millionaires
  P.shot(ev.c1_s5, (ctx, t, s) => {
    P.bp(ctx, t);
    const g = P.eio((t - ev.c1_grew) / 1.0);
    P.line(ctx, 200, 900, 1100, 900, C.ln, 5); P.line(ctx, 200, 900, 200, 220, C.ln, 5);
    P.rect(ctx, 340, 900 - 560, 220, 560, 6, 'rgba(234,244,255,0.2)', { stroke: C.ln, lw: 4 }); G.text(ctx, '2024', 450, 960, { size: 40, fam: 'Inter', weight: 800, color: C.ln2, align: 'center', boil: 0 });
    const h2 = 560 * lerp(1, 1.108, g); P.rect(ctx, 720, 900 - h2, 220, h2, 6, 'rgba(255,213,74,0.5)', { stroke: C.yel, lw: 4, a: P.fin(t, ev.c1_s5, 0.4) }); G.text(ctx, '2025', 830, 960, { size: 40, fam: 'Inter', weight: 800, color: C.yel, align: 'center', boil: 0 });
    P.dim(ctx, 990, 340, 990, 900 - h2, '', P.fin(t, ev.c1_11 - 0.2, 0.4));
    P.stamp(ctx, '+ 11 %', 830, 220, t, ev.c1_11, { size: 76, color: C.yel, fg: C.ink2 });
    P.bcount(ctx, { x: 1480, y: 400, to: 1000000, t, t0: ev.c1_mill - 0.4, t1: ev.c1_mill + 0.8, size: 80, prefix: '≈ ', sub: 'NEW DOLLAR MILLIONAIRES', subSize: 36 });
    for (let i = 0; i < 14; i++) { const k = P.pop(t, ev.c1_mill + i * 0.08, 0.3); if (k > 0) P.person(ctx, 1240 + (i % 7) * 80, 680 + Math.floor(i / 7) * 160, 0.42 * k, t, { seed: i, color: C.yel, fill: 'rgba(255,213,74,0.2)', lw: 3 }); }
    P.source(ctx, 'UBS Global Wealth Report 2026', t, ev.c1_s5 + 0.5);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S6 — where is it? under our feet (camera tilts down through the ground line)
  P.shot(ev.c1_s6, (ctx, t, s) => {
    P.bp(ctx, t);
    ctx.save(); const cam = P.cam(ctx, t, ev.c1_feet - 0.3, ev.c1_feet + 0.9, { x: 960, y: 480, z: 1 }, { x: 960, y: 760, z: 1.03 });
    P.line(ctx, -200, 760, 2200, 760, C.ln, 6);
    for (let i = 0; i < 40; i++) P.line(ctx, -200 + i * 60, 760, -240 + i * 60, 800, C.ln2, 3);
    for (let i = 0; i < 5; i++) P.art(ctx, A.house(170), 1, { x: 260 + i * 330, y: 760, a: 0.5 });
    const fk = P.fin(t, ev.c1_feet, 0.4); if (fk > 0) { for (let i = 0; i < 10; i++) { const y = 840 + i * 30; P.line(ctx, 100, y, 1820, y, P.rgba(C.yel, 0.25 * fk), 3); } }
    ctx.restore();
    Ch.pip(ctx, { x: 1520, y: 680, s: 1.0, t, dir: -1, gesture: t > ev.c1_feet - 0.2 ? 'point' : 'think', mouth: P.talk(t), look: t > ev.c1_feet ? -1 : 0 });
    P.arrow(ctx, 960, 420, 960, lerp(420, 700, P.oc((t - ev.c1_feet) / 0.5)), { color: C.yel, lw: 10, head: 34, a: fk });
    P.write(ctx, 'mostly… right under our feet', 900, 260, t, ev.c1_where, { size: 64, color: C.ln, hl: ['feet'], hlColor: C.yel });
  }, { in: { type: 'fade', dur: 0.35 } });

  // S7 — the world's buildings and land: $393 tn; almost three quarters is homes
  P.shot(ev.c1_s7, (ctx, t, s) => {
    P.bp(ctx, t);
    const bk = P.oc((t - ev.c1_bld + 0.2) / 1.4);
    const city = [[A.house(130), 130], [A.tower(110, 360), 300], [A.house(150), 470], [A.tower(140, 500), 640], [A.factory(220), 850], [A.tower(90, 280), 1030], [A.house(120), 1170]];
    city.forEach(([parts, x], i) => P.art(ctx, parts, clamp(bk * 1.6 - i * 0.1), { x, y: 640, lw: 4 }));
    const lk = P.oc((t - ev.c1_land) / 0.8); P.art(ctx, [[[60, 640], [1260, 640]], ...[0, 1, 2, 3, 4].map((i) => [[80 + i * 230, 690], [260 + i * 230, 690]])], lk, { color: C.mint, lw: 4 });
    P.bcount(ctx, { x: 640, y: 860, to: 393, t, t0: ev.c1_393a, t1: ev.c1_393, size: 120, prefix: '$', suffix: ' T', sub: 'TRILLION', subSize: 40 });
    // stacked bar: homes 286.9 / commercial 58.5 / farmland 47.9
    const sb = P.eio((t - ev.c1_homes + 0.6) / 0.9); const X = 1420, Y0 = 900, HH = 680;
    const parts = [[286.9, C.yel, 'HOMES  73 %'], [58.5, C.cyan, 'COMMERCIAL'], [47.9, C.mint, 'FARMLAND']]; let y = Y0;
    parts.forEach(([v, col, lab], i) => { const h = HH * v / 393.3 * sb; P.rect(ctx, X, y - h, 200, h, 4, P.rgba(col, i ? 0.55 : 0.75), { stroke: col, lw: 3, a: sb > 0 ? 1 : 0 }); if (sb > 0.9) G.text(ctx, lab, X + 230, y - h / 2 + 14, { size: 34, fam: 'Inter', weight: 800, color: col, boil: 0, alpha: P.fin(t, ev.c1_homes, 0.3) }); y -= h; });
    P.source(ctx, 'Savills, 2025 (value at the start of 2025)', t, ev.c1_s7 + 0.4);
  }, { in: { type: 'fade', dur: 0.35 } });

  // S8 — the largest store of wealth: real estate outweighs shares + bonds + gold together
  P.shot(ev.c1_s8, (ctx, t, s) => {
    P.bp(ctx, t);
    const tilt = lerp(0, -1, P.eio((t - ev.c1_tilt) / 0.7)) + (t > ev.c1_tilt + 0.7 ? Math.sin((t - ev.c1_tilt) * 5) * 0.03 * Math.exp(-(t - ev.c1_tilt - 0.7) * 2) : 0);
    P.balance(ctx, 960, 960, 900, t, P.oc((t - ev.c1_s8) / 0.8), tilt, {
      left: (x, y) => { P.art(ctx, A.house(150), 1, { x: x - 40, y: y - 8 }); P.art(ctx, A.tower(70, 220), 1, { x: x + 70, y: y - 8 }); G.text(ctx, 'REAL ESTATE', x, y + 80, { size: 34, fam: 'Inter', weight: 800, color: C.yel, align: 'center', boil: 0 }); },
      right: (x, y) => { const k1 = P.pop(t, ev.c1_sh, 0.3), k2 = P.pop(t, ev.c1_bo, 0.3), k3 = P.pop(t, ev.c1_go, 0.3);
        if (k1 > 0) G.text(ctx, 'SHARES', x, y + 70, { size: 34 * k1, fam: 'Inter', weight: 800, color: C.ln, align: 'center', boil: 0 });
        if (k2 > 0) G.text(ctx, 'BONDS', x, y + 112, { size: 34 * k2, fam: 'Inter', weight: 800, color: C.ln, align: 'center', boil: 0 });
        if (k3 > 0) P.art(ctx, A.bar(110), 1, { x, y: y - 8, s: k3 }); G.text(ctx, '+ GOLD', x, y + 154, { size: 34 * k3, fam: 'Inter', weight: 800, color: C.yel, align: 'center', boil: 0 }); } });
    P.write(ctx, 'the largest store of wealth on Earth', 960, 200, t, ev.c1_largest - 0.3, { size: 62, color: C.ln, hl: ['largest'], hlColor: C.yel });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S9 — "But wait. Isn't the real treasure supposed to be gold?"
  P.shot(ev.c1_s9, (ctx, t, s) => {
    P.bp(ctx, t);
    const k = P.oc((t - ev.c1_treasure + 0.3) / 0.7);
    for (let i = 0; i < 3; i++) P.art(ctx, A.bar(230), k, { x: 760 + (i - 1) * 130, y: 760 - (i === 1 ? 70 : 0) });
    P.glow(ctx, 760, 680, 360, C.yel, k * (0.6 + 0.3 * Math.sin(t * 3)));
    for (let i = 0; i < 6; i++) { const a = t * 1.2 + i; const sp = Math.max(0, Math.sin(a * 2)); P.poly(ctx, [[0, -24], [6, -6], [24, 0], [6, 6], [0, 24], [-6, 6], [-24, 0], [-6, -6]].map(([x, y]) => [600 + U.hash(i, 2) * 340 + x * sp, 560 + U.hash(i, 3) * 200 + y * sp]), C.yel, { a: k }); }
    G.text(ctx, '?', 1180, 560 + Math.sin(t * 3) * 8, { size: 260, fam: 'Bungee', color: C.yel, align: 'center', alpha: P.fin(t, ev.c1_wait, 0.3), boil: 0 });
    Ch.pip(ctx, { x: 1520, y: 900, s: 1.05, t, dir: -1, gesture: 'think', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'fade', dur: 0.35 } });
})();
