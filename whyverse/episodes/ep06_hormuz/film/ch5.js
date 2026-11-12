// Chapter 5 — The year the door almost shut (2026, neutral + attributed): 28 Feb strikes; Iran declares the strait closed ·
// insurers pull war-risk cover; premiums from a fraction of a percent to several percent per voyage · 100+ ships a day → ~5 (−95 %) ·
// Brent ~$70 → ~$126 (30 Apr) · IEA record 400 million barrels ≈ 20 days of Hormuz flow · autumn: a fraction of traffic; Iran says mines; talks stalled.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  const cal = (ctx, t, t0, top, big, x, y, s = 1) => { const k = P.pop(t, t0, 0.4); P.at(ctx, x, y, k * s, -0.03, () => { P.rect(ctx, -160, -120, 320, 240, 22, C.cream, { shadow: 0.3 }); P.rect(ctx, -160, -120, 320, 66, 22, C.coral); P.rect(ctx, -160, -80, 320, 26, 0, C.coral);
    G.text(ctx, top, 0, -72, { size: 34, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 }); G.text(ctx, big, 0, 80, { size: 104, fam: 'Bungee', color: C.navy, align: 'center', boil: 0 }); }); };

  P.cardShot('c5', 5, 'The year the door almost shut', (ctx, t) => { P.door(ctx, 1640, 1080, 220, 360, 0.15 + 0.1 * Math.sin(t * 1.5), { color: P.rgba(C.coral, 0.25), frame: 'rgba(255,255,255,0.05)' }); });

  // S1 — 28 February 2026: US and Israeli strikes on Iran begin; within days Iran declares the strait closed
  P.shot(ev.c5_s1, (ctx, t) => {
    const m = P.gulf(); const nar = P.narrows(); const A = m.ll(...nar.a), B = m.ll(...nar.b); const mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    ctx.save(); const cam = P.cam(ctx, t, ev.c5_s1, ev.c5_closed + 0.2, { x: 1000, y: 540, z: 1.1 }, { x: mid[0] - 80, y: mid[1] + 30, z: 2.4 });
    P.drawMap(ctx, m, { sea: C.sea, z: cam.z });
    const bk = P.oc((t - ev.c5_closed) / 0.35); if (bk > 0) { const ex = [A[0] - (B[0] - A[0]) * 0.1, A[1] - (B[1] - A[1]) * 0.1], ey = [B[0] + (B[0] - A[0]) * 0.1, B[1] + (B[1] - A[1]) * 0.1];
      P.line(ctx, ex[0], ex[1], lerp(ex[0], ey[0], bk), lerp(ex[1], ey[1], bk), C.red, 16 / cam.z, 0.95); P.ring(ctx, mid[0], mid[1], t, ev.c5_closed, { r: 120 / cam.z, color: C.red, lw: 8 / cam.z }); }
    ctx.restore();
    cal(ctx, t, ev.c5_feb - 0.2, 'FEB 2026', '28', 260, 250);
    P.tag(ctx, 'US + Israeli strikes on Iran begin', 960, 960, t, ev.c5_strikes, 1e9, { size: 42, fill: C.navy, color: C.cream });
    P.stamp(ctx, 'IRAN: “STRAIT CLOSED”', 1240, 230, t, ev.c5_closed, { size: 62, color: C.red, rot: -0.03 });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — insurers pull war-risk cover; without insurance most owners won't sail. Premiums: a fraction of a percent → several percent.
  P.shot(ev.c5_s2, (ctx, t) => {
    P.bgLight(ctx, t);
    const sw = P.fin(t, ev.c5_prem - 0.4, 0.5); // second half: the premium bars
    ctx.save(); ctx.translate(-sw * 420, 0); ctx.globalAlpha *= 1 - sw * 0.0;
    P.doc(ctx, 520, 560, 1.15, t, { a: P.pop(t, ev.c5_s2 + 0.1, 0.4), stamp: clamp((t - ev.c5_pulled) / 0.18), stampText: 'CANCELLED', rot: -0.04 });
    ctx.restore();
    // the anchored tanker + an owner who shakes his head
    const ak = P.fin(t, ev.c5_wont - 0.6, 0.4) * (1 - sw); if (ak > 0) { ctx.save(); ctx.globalAlpha *= ak; P.rect(ctx, 980, 620, 860, 380, 30, C.sea, { shadow: 0.2 }); ctx.save(); P.pRR(980, 620, 860, 380, 30)(ctx); ctx.clip(); P.water(ctx, t, { y0: 820, color: C.sea, color2: C.seaDeep }); P.tanker(ctx, 1400, 860, 640, t, { load: 1 }); ctx.restore();
      P.line(ctx, 1150, 870, 1150, 990, C.grey, 4); P.circ(ctx, 1150, 990, 14, C.grey); ctx.restore();
      P.person(ctx, 900, 1000, 1.0, { t, color: C.navy, arm: 0.2 }); P.tag(ctx, 'no cover → no sailing', 1410, 560, t, ev.c5_wont, ev.c5_prem - 0.2, { size: 44, fill: C.red, color: C.cream }); }
    // premiums: before vs 2026 (share of the ship's value, per voyage)
    if (sw > 0) { ctx.save(); ctx.globalAlpha *= sw; const bx = 900, by = 860;
      P.label(ctx, 'war-risk premium, per voyage (share of the ship’s value)', 1360, 250, { size: 32, color: C.ink, align: 'center' });
      const h1 = 30 * P.oc((t - ev.c5_frac) / 0.5), h2 = 480 * P.oc((t - ev.c5_several) / 0.9);
      P.rect(ctx, bx + 80, by - h1, 260, h1, 12, C.grey); P.rect(ctx, bx + 520, by - h2, 260, h2, 12, C.coral);
      P.line(ctx, bx, by, bx + 900, by, C.ink, 4);
      G.text(ctx, 'before', bx + 210, by + 50, { size: 34, fam: 'Inter', weight: 800, color: C.dim, align: 'center', boil: 0 }); G.text(ctx, '2026', bx + 650, by + 50, { size: 34, fam: 'Inter', weight: 800, color: C.coral, align: 'center', boil: 0 });
      P.tag(ctx, 'a fraction of 1%', bx + 210, by - 90, t, ev.c5_frac, 1e9, { size: 36 });
      P.tag(ctx, 'several % (quotes ≈ 6–9%)', bx + 650, by - h2 - 60, t, ev.c5_several + 0.5, 1e9, { size: 36, fill: C.coral, color: C.cream });
      ctx.restore(); }
    P.stamp(ctx, 'EVERY SINGLE VOYAGE', 500, 960, t, ev.c5_voyage, { size: 52, color: C.navy, fg: C.gold });
    P.source(ctx, 'Reuters 24 Sep 2026; S&P Global (rates are not public)', t, ev.c5_several);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — ships per day: more than 100 before the war → about 5 by the summer (−95 %)
  P.shot(ev.c5_s3, (ctx, t) => {
    P.bgNavy(ctx, t);
    const gone = P.eio((t - ev.c5_summer) / 1.6);
    for (let i = 0; i < 100; i++) { const keep = i % 20 === 7; const x = 200 + (i % 10) * 82, y = 300 + Math.floor(i / 10) * 64; const k = P.pop(t, ev.c5_s3 + 0.1 + i * 0.012, 0.3);
      const a = keep ? 1 : 1 - gone; if (a <= 0.01 || k <= 0) continue; P.at(ctx, x - (keep ? 0 : gone * 60), y, k, 0, () => { ctx.globalAlpha *= a; const col = keep && gone > 0.5 ? C.gold : C.hull; P.fill(ctx, P.pPoly([[-30, -13], [18, -13], [32, 0], [18, 13], [-30, 13]]), col); P.rect(ctx, -30, -10, 12, 20, 3, C.deck); }); }
    P.counter(ctx, { x: 1440, y: 360, from: 0, to: 100, t, t0: ev.c5_100 - 0.6, t1: ev.c5_100 + 0.2, size: 100, suffix: '+', sub: 'ships a day, before the war', color: C.teal });
    P.counter(ctx, { x: 1440, y: 680, from: 100, to: 5, t, t0: ev.c5_summer, t1: ev.c5_five + 0.2, size: 100, prefix: '≈ ', sub: 'a day by summer 2026', color: C.gold });
    P.stamp(ctx, '−95%', 1440, 930, t, ev.c5_95, { size: 96, color: C.red });
    P.source(ctx, 'Reuters 21 Sep 2026; Al Jazeera 27 Aug 2026 (UNCTAD)', t, ev.c5_100);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — Brent: ~$70 before the war → briefly ~$126 at the end of April (then down to ~$92 in November)
  P.shot(ev.c5_s4, (ctx, t) => {
    P.bgNavy(ctx, t);
    const D = [[0, 72, '27 Feb'], [1, 112, '20 Mar'], [2.1, 126, '30 Apr'], [8.4, 92, '11 Nov']];
    const x0 = 260, x1 = 1660, y0 = 900, sc = 5.4; const X = (m) => lerp(x0, x1, m / 8.6), Y = (v) => y0 - (v - 40) * sc;
    for (const v of [60, 80, 100, 120]) { P.line(ctx, x0 - 20, Y(v), x1 + 20, Y(v), 'rgba(255,255,255,0.1)', 2); G.text(ctx, '$' + v, x0 - 40, Y(v) + 10, { size: 28, fam: 'Inter', weight: 700, color: '#8C98C8', align: 'right', boil: 0 }); }
    ['MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV'].forEach((mm, i) => G.text(ctx, mm, X(i + 0.1), y0 + 50, { size: 26, fam: 'Inter', weight: 800, color: '#8C98C8', align: 'center', boil: 0 }));
    const pts = D.map(([mm, v]) => [X(mm), Y(v)]);
    const k = t < ev.c5_april ? 0.12 * P.fin(t, ev.c5_70, 0.4) + 0.2 * P.fin(t, ev.c5_70 + 0.6, 1.2) : lerp(0.32, 1, P.eio((t - ev.c5_april) / 3.2));
    P.trace(ctx, pts, k, C.gold, 9); const [hx, hy] = P.along(pts, Math.max(0.001, k)); P.circ(ctx, hx, hy, 14, C.gold);
    P.tag(ctx, '≈ $70 before', X(0) + 40, Y(72) + 70, t, ev.c5_70, 1e9, { size: 36, align: 'left' });
    P.tag(ctx, '≈ $126, briefly', X(2.1), Y(126) - 70, t, ev.c5_126, 1e9, { size: 40, fill: C.coral, color: C.cream });
    P.tag(ctx, '≈ $92 (11 Nov)', X(8.4) - 20, Y(92) - 70, t, ev.c5_126 + 1.6, 1e9, { size: 36, fill: C.cream, align: 'right' });
    P.label(ctx, 'Brent crude, $ per barrel, 2026 (key points only)', x0, 150, { size: 32, color: C.cream });
    P.tag(ctx, 'BRENT = the world’s benchmark oil price', 1180, 160, t, ev.c5_brent, 1e9, { size: 34, fill: C.navy2, color: C.gold });
    P.source(ctx, 'AP / ABC 30 Apr 2026; Majalla; Reuters via HDFC Sky 11 Nov 2026', t, ev.c5_70);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S5 — emergency tanks: 32 IEA members release a record 400 million barrels ≈ only 20 days of Hormuz flow
  P.shot(ev.c5_s5, (ctx, t) => {
    P.bgLight(ctx, t);
    const sw = P.fin(t, ev.c5_enorm - 0.3, 0.5);
    for (let i = 0; i < 32; i++) { const x = 220 + (i % 8) * 120, y = 330 + Math.floor(i / 8) * 135; const k = P.pop(t, ev.c5_s5 + 0.2 + i * 0.03, 0.3); if (k <= 0) continue;
      const lvl = 1 - 0.55 * P.eio((t - ev.c5_tanks - i * 0.02) / 2.2);
      P.at(ctx, x, y, k * (1 - sw * 0.25), 0, () => { P.rect(ctx, -44, -60, 88, 110, 14, C.grey2, { shadow: 0.15 }); P.rect(ctx, -44, -60 + 110 * (1 - lvl), 88, 110 * lvl, 14, C.oil); P.ell(ctx, 0, -60, 44, 12, C.steel); }); }
    P.tag(ctx, '32 IEA members', 640, 230, t, ev.c5_32, 1e9, { size: 40, fill: C.navy, color: C.cream });
    P.counter(ctx, { x: 1490, y: 380, from: 0, to: 400, t, t0: ev.c5_400a, t1: ev.c5_400 + 0.2, size: 84, suffix: ' MILLION', sub: 'barrels released (a record)', color: C.coral });
    // 20-day calendar strip
    if (sw > 0) { ctx.save(); ctx.globalAlpha *= sw; P.rect(ctx, 1100, 600, 760, 330, 24, C.navy, { shadow: 0.25 });
      for (let d = 0; d < 21; d++) { const x = 1140 + (d % 7) * 100, y = 640 + Math.floor(d / 7) * 90; const on = d < 20 && t > ev.c5_20d - 0.3 + d * 0.04; P.rect(ctx, x, y, 84, 72, 10, on ? C.gold : '#24346E'); if (on) G.text(ctx, String(d + 1), x + 42, y + 50, { size: 34, fam: 'Bungee', color: C.navy, align: 'center', boil: 0 }); }
      ctx.restore(); }
    P.tag(ctx, '≈ 20 days of normal Hormuz flow', 1480, 990, t, ev.c5_20d + 0.6, 1e9, { size: 40, fill: C.gold, color: C.navy });
    P.source(ctx, 'IEA, 11 Mar 2026 (Fortune); 400 ÷ 20 million barrels a day', t, ev.c5_400);
  }, { in: { type: 'wipe', dir: 'left', dur: 0.5 } });

  // S6 — by the autumn: a fraction of the old traffic; this week Iran says tankers hit mines (not independently verified); talks stalled
  P.shot(ev.c5_s6, (ctx, t) => {
    const m = P.gulf(); const c = m.ll(56.45, 26.5);
    ctx.save(); const cam = P.cam(ctx, t, ev.c5_s6, ev.c5_s6 + 14, { x: c[0], y: c[1], z: 2.7 }, { x: c[0] + 20, y: c[1], z: 2.95 }, (x) => x);
    P.drawMap(ctx, m, { sea: C.sea, z: cam.z, colors: { Oman: C.sand } });
    const cl = P.LANE.map(([lo, la]) => m.ll(lo, la)); P.trace(ctx, cl, 1, 'rgba(255,255,255,0.35)', 3 / cam.z, 1, [8 / cam.z, 8 / cam.z]);
    for (let i = 0; i < 2; i++) { const u = ((t - ev.c5_s6) * 0.03 + i * 0.5) % 1; const [x, y, a] = P.along(cl, u); P.tankerTop(ctx, x, y, a, 34, { z: cam.z }); }
    const mn = m.ll(56.55, 26.62); const mk = P.pop(t, ev.c5_mines, 0.4); if (mk > 0) { ctx.save(); ctx.translate(mn[0], mn[1]); ctx.scale(mk / cam.z, mk / cam.z); P.mine(ctx, 0, 0, 30, t); ctx.restore(); }
    ctx.restore();
    P.tag(ctx, 'a fraction of the old traffic', 560, 160, t, ev.c5_autumn, 1e9, { size: 42, fill: C.navy, color: C.cream });
    P.tag(ctx, 'THIS WEEK', 1500, 160, t, ev.c5_week, 1e9, { size: 44, fill: C.coral, color: C.cream, dot: C.cream });
    P.tag(ctx, 'Iran says: several tankers hit mines', 1300, 820, t, ev.c5_mines, 1e9, { size: 40 });
    P.stamp(ctx, 'NOT INDEPENDENTLY VERIFIED', 1300, 930, t, ev.c5_verified, { size: 42, color: C.steel, rot: -0.02 });
    P.stamp(ctx, 'TALKS STALLED', 520, 930, t, ev.c5_stalled, { size: 56, color: C.navy, fg: C.gold, rot: 0.03 });
    P.source(ctx, 'Reuters via MarineLink 11–12 Nov 2026; Al Jazeera 12 Nov 2026', t, ev.c5_week);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S7 — but wait: only part of the oil went missing — why did prices jump so much?
  P.shot(ev.c5_s7, (ctx, t) => {
    P.bgNavy(ctx, t);
    const k1 = P.pop(t, ev.c5_part, 0.4); P.at(ctx, 560, 600, k1, 0, () => { P.circ(ctx, 0, 0, 170, '#24346E'); P.fill(ctx, (c) => { c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 170, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.2); c.closePath(); }, C.coral); G.text(ctx, 'missing oil', 0, 240, { size: 40, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 }); });
    const k2 = P.oc((t - ev.c5_much) / 0.8); if (k2 > 0) { P.arrow(ctx, 1340, 860, 1340, lerp(860, 300, k2), { color: C.gold, lw: 60, head: 120 }); G.text(ctx, 'price', 1340, 950, { size: 40, fam: 'Inter', weight: 800, color: C.gold, align: 'center', boil: 0 }); }
    P.write(ctx, 'small gap… big jump. Why?', 960, 170, t, ev.c5_wait - 0.1, { size: 80, color: C.cream, hl: ['Why?'] });
    Ch.gull(ctx, { x: 960, y: 1010, s: 0.85, t, dir: 1, gesture: 'shrug', mouth: P.talk(t), eyes: 'wide' });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });
})();
