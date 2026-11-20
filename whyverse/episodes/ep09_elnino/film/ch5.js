// Chapter 5 — The price of a warm patch: Peru's anchovy catch 13.1 M t (1970) → 1.7 M t (1973), El Niño + overfishing (FAO) ·
// 1997–98: floods, droughts, fires; ≈ 23,000 deaths in linked disasters (World Bank) — sober · $5.7 trillion lost income in 5 years
// (Callahan & Mankin, Science 2023) · Panama Canal 2023: ≈ 36 → 25 ships a day · coral bleaching 2014–17: > 70 % of reefs · climate change?
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  P.coinStack = (ctx, x, y, n, { a = 1 } = {}) => { if (a <= 0.01) return; for (let i = 0; i < n; i++) P.iE(ctx, x, y - i * 22, 70, 22, i % 2 ? C.gold : C.yel, { lw: 4, a }); };
  P.cardShot('c5', 5, 'The price of a warm patch', C.gold, (ctx, t) => { for (let i = 0; i < 5; i++) P.coinStack(ctx, 160 + i * 110, 1060, 3 + (i * 3) % 5); for (let i = 0; i < 4; i++) P.coinStack(ctx, 1400 + i * 120, 1060, 2 + (i * 2) % 5); });

  // S1 — Peru's anchovy catch crashed: 13.1 M t (1970) → 1.7 M t (1973); El Niño on top of overfishing
  P.shot(ev.c5_s1, (ctx, t) => {
    P.bgPaper(ctx, t, { rays: 0.15, rayCol: C.cyan, cx: 700, cy: 900 });
    const base = 900, x1 = 380, x2 = 860, bw = 300, per = 38; // px per million tonnes
    P.line(ctx, 200, base, 1200, base, C.ink, 8);
    const g1 = P.oc((t - ev.c5_1970 + 0.2) / 0.8), g2 = P.oc((t - ev.c5_1973 + 0.1) / 0.6);
    const bar = (x, v, k, col) => { if (k <= 0) return; const h = v * per * k; P.iR(ctx, x - bw / 2, base - h, bw, h, 6, col, { lw: 6, shadow: 1, dots: C.blue, dotA: 0.25 });
      ctx.save(); ctx.beginPath(); ctx.rect(x - bw / 2, base - h, bw, h); ctx.clip(); for (let r = 0; r < 14; r++) for (let c = 0; c < 3; c++) P.fish(ctx, x - 90 + c * 90 + (r % 2) * 30, base - 26 - r * 44, 0.38, t, { seed: r * 3 + c, col: C.cold }); ctx.restore(); };
    bar(x1, 13.1, g1, C.cyan); bar(x2, 1.7, g2, C.cyan);
    G.text(ctx, '1970', x1, base + 56, { size: 48, fam: 'Bangers', color: C.ink, align: 'center', boil: 0, alpha: P.fin(t, ev.c5_1970, 0.3) });
    G.text(ctx, '1973', x2, base + 56, { size: 48, fam: 'Bangers', color: C.ink, align: 'center', boil: 0, alpha: P.fin(t, ev.c5_1973, 0.3) });
    P.ccount(ctx, { x: x1, y: base - 13.1 * per - 90, to: 13.1, decimals: 1, suffix: ' M T', t, t0: ev.c5_10a, t1: ev.c5_10, size: 80, card: false, color: C.yel });
    P.ccount(ctx, { x: x2, y: base - 1.7 * per - 90, to: 1.7, decimals: 1, suffix: ' M T', t, t0: ev.c5_crash, t1: ev.c5_2m, size: 80, card: false, color: C.red });
    P.caption(ctx, 'PERU\'S ANCHOVY CATCH', 80, 60, t, ev.c5_s1 + 0.2, { size: 50 });
    for (let i = 0; i < 9; i++) { const a = 1 - P.fin(t, ev.c5_1970, 0.4); if (a <= 0) break; P.fish(ctx, ((t - ev.c5_s1) * 260 + i * 140) % 1500 - 100, 400 + (i % 3) * 110 + Math.sin(t * 2 + i) * 20, 0.8, t, { seed: i, a }); }
    P.panel(ctx, 1300, 180, 520, 300, t, ev.c5_came, (c) => { c.translate(-700, -450); P.duskSea(c, t, { horizon: 520 }); c.translate(700, 450); P.heat(c, 260, 180, 300, 70, t); G.text(c, 'EL NIÑO…', 260, 280, { size: 44, fam: 'Bangers', color: C.cream, stroke: C.ink, strokeW: 7, align: 'center', boil: 0 }); }, { from: 'right' });
    P.panel(ctx, 1300, 540, 520, 300, t, ev.c5_over, (c) => { c.fillStyle = C.sky2; c.fillRect(0, 0, 520, 300); for (let i = 0; i < 3; i++) P.boat(c, 110 + i * 150, 140 + (i % 2) * 30, 0.32, t + i, { people: 1, net: 1, catch_: 2 }); G.text(c, '…ON TOP OF OVERFISHING', 260, 280, { size: 40, fam: 'Bangers', color: C.cream, stroke: C.ink, strokeW: 7, align: 'center', boil: 0 }); }, { from: 'right' });
    P.slam(ctx, 'CRASH!', 1140, 760, t, ev.c5_crash, { size: 120, color: C.red, rot: 0.08, t1: ev.c5_2m + 1.5 });
    P.source(ctx, 'FAO', t, ev.c5_10);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — 1997–98 (sober): floods, droughts and fires; ≈ 23,000 people died in disasters linked to it
  P.shot(ev.c5_s2, (ctx, t) => {
    P.bgPaper(ctx, t, { tint: 'rgba(60,70,100,0.22)' });
    P.cstamp(ctx, '1997–98', 960, 110, t, ev.c5_97, { size: 90, color: C.navy });
    [[ev.c5_flood, 'FLOODS'], [ev.c5_drought, 'DROUGHTS'], [ev.c5_fires, 'FIRES']].forEach(([t0, lab], i) => P.panel(ctx, 120 + i * 580, 220, 520, 380, t, t0, (c) => {
      c.fillStyle = [C.sky2, '#F6D8A0', '#F3C9A0'][i]; c.fillRect(0, 0, 520, 380);
      if (i === 0) { P.stormCloud(c, 260, 140, 0.4, t, { rain: 1 }); P.ink(c, (cc) => { cc.beginPath(); cc.moveTo(0, 300); for (let x = 0; x <= 520; x += 40) cc.quadraticCurveTo(x + 20, 280 + Math.sin(t * 3 + x) * 10, x + 40, 300); cc.lineTo(520, 380); cc.lineTo(0, 380); cc.closePath(); }, C.sea, { lw: 5 }); }
      if (i === 1) { P.sunIcon(c, 400, 100, 50, t); P.crack(c, 0, 250, 520, 130); }
      if (i === 2) { P.flame(c, 180, 330, 1.1, t); P.flame(c, 330, 340, 0.8, t, { seed: 3 }); }
      G.text(c, lab, 260, 360, { size: 46, fam: 'Bangers', color: C.cream, stroke: C.ink, strokeW: 8, align: 'center', boil: 0 }); }));
    P.ccount(ctx, { x: 960, y: 820, to: 23000, t, t0: ev.c5_23a, t1: ev.c5_23, size: 120, prefix: '≈ ', sub: 'ESTIMATED DEATHS IN DISASTERS LINKED TO IT', subSize: 32, cardCol: C.navy, color: C.cream, rot: 0 });
    P.source(ctx, 'World Bank (2015) · NOAA', t, ev.c5_23);
  }, { in: { type: 'fade', dur: 0.5 } });

  // S3 — Dartmouth followed the money: $5.7 trillion of lost income in the five years after 1997–98 (1982–83: $4.1 T)
  P.shot(ev.c5_s3, (ctx, t) => {
    P.bgPaper(ctx, t, { rays: 0.35, rayCol: C.gold, cy: 600, spin: 0.05 });
    const n = Math.round(P.oc((t - ev.c5_57a + 0.4) / 1.6) * 9); for (let i = 0; i < 7; i++) P.coinStack(ctx, 330 + i * 210, 1010, Math.max(0, Math.min(14, n + (i % 3) - 1)) + (i === 3 ? 3 : 0), { a: P.fin(t, ev.c5_money - 0.3, 0.3) });
    P.ccount(ctx, { x: 960, y: 330, to: 5.7, decimals: 1, prefix: '$', suffix: ' TRILLION', t, t0: ev.c5_money, t1: ev.c5_57, size: 150, sub: 'LOST INCOME WORLDWIDE AFTER THE 1997–98 EL NIÑO', subSize: 34, cardCol: C.green2 });
    P.caption(ctx, 'DARTMOUTH COLLEGE STUDY', 70, 60, t, ev.c5_dart, { size: 44 });
    const yk = P.fin(t, ev.c5_5y - 0.2, 0.3); if (yk > 0) { for (let i = 0; i < 5; i++) { const k = P.pop(t, ev.c5_5y + i * 0.14, 0.3); P.at(ctx, 620 + i * 170, 620, k, 0, () => { P.iR(ctx, -70, -46, 140, 92, 6, C.white, { lw: 5, shadow: 1 }); P.iR(ctx, -70, -46, 140, 26, 6, C.red, { lw: 5 }); G.text(ctx, 'YEAR ' + (i + 1), 0, 30, { size: 34, fam: 'Bangers', color: C.ink, align: 'center', boil: 0 }); }); } }
    P.tag(ctx, '1982–83 event: $4.1 trillion', 1580, 140, t, ev.c5_5y + 0.8, 1e9, { size: 32, fill: C.cream, color: C.ink, border: C.ink });
    P.source(ctx, 'Callahan & Mankin, Science (2023)', t, ev.c5_57);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S4 — Panama 2023: the lakes that feed the canal ran low; ships per day ≈ 36 → 25
  P.shot(ev.c5_s4, (ctx, t) => {
    P.bgFlat(ctx, t, C.sky2, { dotCol: C.cyan, dir: 'up', a: 0.3 });
    const m = P.mapCache('panama', { lon0: -84.5, lon1: -76.5, lat0: 6.5, lat1: 10.5, w: 820, sea: C.sea }); P.panel(ctx, 70, 150, m.w, m.h, t, ev.c5_pan - 0.2, (c) => { const pj = P.drawMap(c, m, 0, 0, 1); P.countryOn(c, pj, 'Panama', C.yel, { lw: 4 }); P.trace(c, [pj(-79.92, 9.35), pj(-79.8, 9.15), pj(-79.68, 9.0), pj(-79.55, 8.9)], P.fin(t, ev.c5_pan, 0.6), C.blue, 10); });
    P.cstamp(ctx, '2023', 230, 120, t, ev.c5_2023, { size: 80, color: C.red });
    P.cstamp(ctx, 'PANAMA CANAL', 480, 640, t, ev.c5_pan + 0.2, { size: 52, color: C.blue });
    // lake gauge dropping
    const lv = 1 - 0.55 * P.eio((t - ev.c5_lakes) / 1.4); P.iR(ctx, 160, 720, 520, 280, 8, C.land, { lw: 6, shadow: 1, a: P.fin(t, ev.c5_lakes - 0.3, 0.3) });
    ctx.save(); ctx.globalAlpha *= P.fin(t, ev.c5_lakes - 0.3, 0.3); P.iR(ctx, 190, 1000 - 250 * lv, 460, 250 * lv - 10, 4, C.sea, { lw: 4, dots: C.blue, dotA: 0.3 }); P.line(ctx, 180, 760, 680, 760, C.red, 4, 1, 1, [12, 8]); G.text(ctx, 'NORMAL', 640, 750, { size: 26, fam: 'Bangers', color: C.red, align: 'right', boil: 0 }); G.text(ctx, 'THE LAKES RAN LOW', 420, 990, { size: 34, fam: 'Bangers', color: C.cream, stroke: C.ink, strokeW: 6, align: 'center', boil: 0 }); ctx.restore();
    // ships per day
    const nShips = Math.round(lerp(36, 25, P.eio((t - ev.c5_36) / Math.max(0.5, ev.c5_25 - ev.c5_36)))); const sk = P.fin(t, ev.c5_ships - 0.2, 0.3);
    if (sk > 0) for (let i = 0; i < 36; i++) { const on = i < nShips; P.ship(ctx, 1040 + (i % 6) * 140, 280 + Math.floor(i / 6) * 100, 0.36, t + i * 0.3, { a: sk * (on ? 1 : 0.15), col: on ? C.red : C.grey }); }
    P.ccount(ctx, { x: 1460, y: 960, from: 36, to: 25, t, t0: ev.c5_36, t1: ev.c5_25, size: 110, suffix: ' SHIPS / DAY', cardCol: C.blue, sub: 'WAS ABOUT 36', subSize: 30 });
    P.source(ctx, 'Carbon Brief · World Weather Attribution', t, ev.c5_25);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — under the sea: 2014–17 coral bleaching; > 70 % of the world's reefs under bleaching-level heat stress
  P.shot(ev.c5_s5, (ctx, t) => {
    P.bgFlat(ctx, t, '#2A6FA6', { dotCol: C.cold, dir: 'down', a: 0.35, dark: true });
    for (let i = 0; i < 6; i++) { const ph = (t * 0.2 + i / 6) % 1; P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(200 + i * 300, 0); c.lineTo(100 + i * 300 + ph * 80, 700); }, 'rgba(255,255,255,0.12)', 50); }
    P.ink(ctx, P.pPoly([[-100, 1100], [-100, 930], [400, 900], [900, 940], [1400, 900], [2100, 930], [2100, 1100]]), C.land, { lw: 6, dots: C.land2, dotA: 0.5 });
    const bl = P.eio((t - ev.c5_bleach) / 1.6); for (let i = 0; i < 7; i++) P.coral(ctx, 160 + i * 260, 930 - (i % 2) * 20, 1.2 - (i % 3) * 0.15, t, { bleach: clamp(bl * 1.3 - i * 0.06), seed: i });
    for (let i = 0; i < 5; i++) P.fish(ctx, ((t * 60 + i * 400) % 2200) - 140, 300 + i * 90, 0.6, t, { seed: i, col: [C.yel, C.coral, C.cyan, C.pink, C.yel][i], a: 1 - bl * 0.6 });
    P.caption(ctx, 'UNDER THE SEA · 2014–2017', 70, 60, t, ev.c5_sea, { size: 44, t1: ev.c5_coral });
    P.cstamp(ctx, 'THE WORST CORAL BLEACHING (UNTIL THEN)', 960, 110, t, ev.c5_bleach, { size: 54, color: C.cream, fg: C.ink });
    P.ccount(ctx, { x: 960, y: 450, to: 70, prefix: '> ', suffix: ' %', t, t0: ev.c5_70a, t1: ev.c5_70, size: 170, sub: 'OF THE WORLD\'S REEFS: BLEACHING-LEVEL HEAT STRESS', subSize: 32, cardCol: C.red });
    P.source(ctx, 'NOAA Coral Reef Watch', t, ev.c5_70);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — "is climate change behind all this?"
  P.shot(ev.c5_s6, (ctx, t) => {
    P.bgPaper(ctx, t, { rays: 0.3, rayCol: C.grey, cy: 520 });
    for (let i = 0; i < 3; i++) { const x = 1150 + i * 220; P.iR(ctx, x, 640, 180, 260, 4, C.grey, { lw: 6, shadow: 1 }); P.iR(ctx, x + 120, 480, 40, 170, 4, C.red, { lw: 5 }); for (let k = 0; k < 4; k++) { const ph = (t * 0.5 + k / 4 + i * 0.3) % 1; P.iC(ctx, x + 140 + ph * 80, 470 - ph * 220, 20 + ph * 40, P.mix('#9AA0AE', '#E6E6EA', ph), { lw: 4, a: 1 - ph }); } }
    P.ink(ctx, (c) => { c.beginPath(); c.rect(-100, 900, 2200, 300); }, C.land, { lw: 6 });
    Ch.pico(ctx, { x: 520, y: 960, s: 1.05, t, gesture: 'think', mouth: P.talk(t), look: 1 });
    P.bubble(ctx, 'IS CLIMATE CHANGE\nBEHIND ALL THIS?', 760, 260, 640, 520, t, ev.c5_q, { size: 60 });
    P.slam(ctx, 'CLIMATE CHANGE?', 1360, 300, t, ev.c5_cc, { size: 96, color: C.yel });
  }, { in: { type: 'fade', dur: 0.4 } });
})();
