// Chapter 6 — Slow, but not stuck: Dubai 2023 "transitioning away from fossil fuels" (first time ever) · the High Seas Treaty by consensus,
// in force Jan 2026 · MYTH "1.5 °C is already lost" (2024 above 1.5, but the goal is a 20-year average, long-term ≈ 1.3) · the price of yes ·
// next: COP32, Addis Ababa, Nov 2027
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L } = S; const C = P.C;
  const W = G.W, H = G.H;
  P.cardShot('c6', 6, 'Slow, but not stuck', (ctx, t) => { const p = ((t - S.CH.c6.t0) * 0.15) % 1; P.dLine(ctx, 1500, 260, 1820, 260, 1, { lw: 4, color: C.ink3 }); Ch.ozzy(ctx, { x: 1500 + p * 320, y: 300, s: 0.35, t, gesture: 'idle' }); });

  // S1 — Dubai 2023: for the first time ever, "transitioning away from fossil fuels"
  P.shot(ev.c6_s1, (ctx, t) => {
    P.bgLine(ctx, t);
    P.stamp(ctx, 'DUBAI 2023 · COP28', 480, 140, t, ev.c6_dubai, { size: 62, color: C.acc, rot: -0.03 });
    P.stamp(ctx, 'FIRST TIME EVER', 1460, 150, t, ev.c6_first, { size: 54, color: C.ink, fg: C.pap, rot: 0.03 });
    P.summit(ctx, 960, 900, 560, 110, t, { k: P.dk(t, ev.c6_s1 + 0.2, 0.8), n: 46, lit: t > ev.c6_agreed ? 1 : 0 });
    const ck = P.dk(t, ev.c6_words - 0.6, 0.6); P.card(ctx, 230, 330, 1460, 360, ck);
    P.write(ctx, '"…transitioning away from', 960, 470, t, ev.c6_words, { size: 76, weight: 800, stag: 0.09 });
    P.head(ctx, 'fossil fuels…"', 960, 590, t, ev.c6_words + 0.5, { size: 90, hl: ['fossil', 'fuels…"'], stag: 0.1 });
    P.note(ctx, 'words avoided for almost 30 years', null, null, 960, 250, t, ev.c6_avoid, { size: 44, color: C.ink2, t1: ev.c6_words + 1.0 });
    P.source(ctx, 'UNFCCC, COP28 decision, 13 Dec 2023', t, ev.c6_words);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — the High Seas Treaty, agreed by consensus (2023), in force January 2026
  P.shot(ev.c6_s2, (ctx, t) => {
    P.bgLine(ctx, t);
    for (let i = 0; i < 6; i++) P.art(ctx, [P.wave(-50, 1970, 640 + i * 70, 12, 9, t * (1 + i * 0.2) + i)], P.dk(t, ev.c6_s2 + i * 0.1, 0.8), { lw: 4, color: i % 2 ? C.ink2 : C.ink });
    for (let i = 0; i < 4; i++) { const x = ((t * 60 + i * 520) % 2200) - 140, y = 860 + (i % 2) * 90; P.art(ctx, [{ pts: [[x - 50, y], [x - 10, y - 26], [x + 40, y - 6], [x + 60, y - 26], [x + 60, y + 26], [x + 40, y + 6], [x - 10, y + 26], [x - 50, y]], fill: C.pap }], P.fin(t, ev.c6_seas, 0.5), { lw: 4 }); }
    P.doc(ctx, 1460, 330, 0.8, t, { k: P.dk(t, ev.c6_cons - 0.2, 0.6), title: 'HIGH SEAS TREATY', sig: P.fin(t, ev.c6_cons, 1.0), stamp: t > ev.c6_force ? 'IN FORCE' : '' });
    P.head(ctx, 'THE HIGH SEAS TREATY', 600, 200, t, ev.c6_seas - 0.3, { size: 66, hl: ['HIGH', 'SEAS'] });
    P.note(ctx, 'agreed by consensus, 2023', null, null, 600, 290, t, ev.c6_cons, { size: 48 });
    P.write(ctx, 'IN FORCE: JANUARY 2026', 600, 420, t, ev.c6_force, { size: 52, weight: 900, color: C.acc });
    P.source(ctx, 'UN press release SEA/2181 · IISD SDG Knowledge Hub', t, ev.c6_cons);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — MYTH: "1.5 °C is already lost" — one year above 1.5 (2024) vs the 20-year average (≈ 1.3)
  P.shot(ev.c6_s3, (ctx, t) => {
    P.bgLine(ctx, t);
    const out = P.eio((t - ev.c6_2024 + 0.3) / 0.5);
    ctx.save(); ctx.translate(0, -out * 280); ctx.scale(1 - out * 0.3, 1 - out * 0.3); ctx.translate(out * 400, 0);
    ctx.globalAlpha *= 1 - out; P.stamp(ctx, 'MYTH', 960, 220, t, Math.min(ev.c6_myth, ev.c6_s3 + 0.3), { size: 70, color: C.acc, rot: -0.04 });
    P.head(ctx, '"1.5 °C IS ALREADY LOST"', 960, 380, t, Math.min(ev.c6_myth, ev.c6_s3 + 0.3) + 0.2, { size: 80, hl: [] });
    P.cross(ctx, 520, 300, 1400, 420, P.dk(t, ev.c6_doesnt, 0.5), { lw: 12 });
    ctx.restore();
    if (out > 0) { const x0 = 260, y0 = 420, w = 1400, h = 500; const ck = P.fin(t, ev.c6_2024 - 0.2, 0.4);
      P.dLine(ctx, x0, y0 + h, x0 + w, y0 + h, ck, { lw: 4 }); P.dLine(ctx, x0, y0, x0, y0 + h, ck, { lw: 4 });
      const yv = (v) => y0 + h - ((v - 0.4) / 1.4) * h; P.dLine(ctx, x0, yv(1.5), x0 + w, yv(1.5), ck, { lw: 3, color: C.acc, dash: [12, 10] }); G.text(ctx, '1.5 °C', x0 + w + 20, yv(1.5) + 12, { size: 36, fam: 'Inter', weight: 900, color: C.acc, boil: 0, alpha: ck });
      const yr = []; for (let i = 0; i <= 40; i++) { const u = i / 40; const base = 0.55 + 0.75 * Math.pow(u, 1.25); yr.push([x0 + u * w, yv(base + 0.12 * Math.sin(i * 1.9) * (0.6 + u * 0.4))]); }
      yr[39] = [x0 + 39 / 40 * w, yv(1.55)]; yr[40] = [x0 + w, yv(1.44)];
      P.art(ctx, [yr], P.dk(t, ev.c6_2024 - 0.1, 1.0), { lw: 3.5, color: C.ink2 });
      const k24 = P.pop(t, ev.c6_15, 0.4); if (k24 > 0) { P.circ(ctx, yr[39][0], yr[39][1], 14 * k24, C.acc); P.note(ctx, '2024: ≈ 1.55 °C (one year)', yr[39][0], yr[39][1], 1240, 300, t, ev.c6_15, { size: 42 }); }
      const av = []; for (let i = 0; i <= 40; i++) { const u = i / 40; av.push([x0 + u * w, yv(0.55 + 0.75 * Math.pow(u, 1.25) * 0.97)]); }
      P.art(ctx, [av], P.dk(t, ev.c6_20y, 1.0), { lw: 8, color: C.ink });
      P.note(ctx, '20-year average ≈ 1.3 °C', av[40][0], av[40][1], 1000, 1000, t, ev.c6_13, { size: 48, color: C.ink });
      P.small(ctx, 'schematic', x0 + 10, y0 + h + 40, { size: 26, alpha: ck }); }
    P.source(ctx, 'WMO 2025 · Copernicus C3S', t, ev.c6_15);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — the price of yes: cheap, ready alternatives make yes easy; the harder the change, the harder the yes
  P.shot(ev.c6_s4, (ctx, t) => {
    P.bgLine(ctx, t);
    P.head(ctx, 'THE PRICE OF YES', 960, 150, t, ev.c6_s4 + 0.2, { size: 72, hl: ['YES'] });
    const cost = 0.3 + 0.55 * P.eio((t - ev.c6_harder) / 0.6) - 0.7 * P.eio((t - ev.c6_easier) / 0.6); const ang = -0.28 + cost * 0.56;
    const cx = 960, cy = 640, Lh = 620; P.art(ctx, [{ pts: [[cx - 70, cy + 260], [cx + 70, cy + 260], [cx, cy]], fill: C.pap, closed: true }], P.dk(t, ev.c6_s4, 0.6), { lw: 5 });
    const lx = cx - Math.cos(ang) * Lh, ly = cy - Math.sin(ang) * Lh, rx = cx + Math.cos(ang) * Lh, ry = cy + Math.sin(ang) * Lh;
    P.dLine(ctx, lx, ly, rx, ry, P.dk(t, ev.c6_s4 + 0.2, 0.6), { lw: 9 });
    const bs = 70 + cost * 150; P.art(ctx, [{ pts: P.rectPts(lx - bs / 2 + 40, ly - bs, bs, bs), fill: C.accW }], P.fin(t, ev.c6_ready - 0.3, 0.4), { lw: 5, color: C.acc });
    G.text(ctx, 'COST OF CHANGE', lx + 40, ly - bs - 24, { size: 34, fam: 'Inter', weight: 900, color: C.acc, align: 'center', boil: 0, alpha: P.fin(t, ev.c6_ready, 0.4) });
    P.art(ctx, [{ pts: P.circPts(rx - 40, ry - 70, 70, 30), fill: C.pap }], P.fin(t, ev.c6_ready, 0.5), { lw: 5 });
    G.text(ctx, 'YES', rx - 40, ry - 56, { size: 50, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0, alpha: P.fin(t, ev.c6_ready + 0.2, 0.4) });
    P.note(ctx, 'cheap & ready → easy yes', null, null, 960, 1000, t, ev.c6_cheap, { size: 52, t1: ev.c6_harder });
    P.note(ctx, 'harder change → harder yes', null, null, 960, 1000, t, ev.c6_harder, { size: 52, t1: ev.c6_easier - 0.1 });
    P.note(ctx, 'cheaper change → easier yes', null, null, 960, 1000, t, ev.c6_easier, { size: 52 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S5 — next: COP32, Addis Ababa, Ethiopia, November 2027 — same rules, same ~190 voices
  P.shot(ev.c6_s5, (ctx, t) => {
    P.bgLine(ctx, t);
    const pr = P.globe(ctx, 640, 560, 360, t, { lon0: 30 + Math.sin(t * 0.2) * 6, lat0: 10, k: P.dk(t, ev.c6_s5, 1.0) });
    const p = pr(38.75, 9.0); const pk = P.pop(t, ev.c6_addis, 0.4); if (pk > 0 && p[2] > 0) { P.ring(ctx, p[0], p[1], t, ev.c6_addis, { r: 90, color: C.acc }); P.circ(ctx, p[0], p[1], 15 * pk, C.acc); P.note(ctx, 'Addis Ababa, Ethiopia', p[0], p[1], p[0] + 420, p[1] - 380, t, ev.c6_addis + 0.1, { size: 50 }); }
    P.stamp(ctx, 'COP32', 1500, 380, t, ev.c6_addis + 0.2, { size: 100, color: C.ink, fg: C.pap, rot: -0.03 });
    P.write(ctx, 'NOVEMBER 2027', 1500, 540, t, ev.c6_nov, { size: 64, weight: 900, color: C.acc });
    P.write(ctx, 'SAME RULES', 1500, 700, t, ev.c6_rules, { size: 54, weight: 900 });
    for (let i = 0; i < 198; i++) { const an = i / 198 * 6.283; const q = clamp((t - ev.c6_voices - i * 0.004) / 0.2); if (q <= 0) continue; ctx.save(); ctx.globalAlpha *= q; ctx.fillStyle = C.pap; ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(1500 + Math.cos(an) * 220, 900 + Math.sin(an) * 70, 6, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); }
    P.source(ctx, 'UNFCCC decision, COP31', t, ev.c6_nov);
  }, { in: { type: 'fade', dur: 0.4 } });
})();
