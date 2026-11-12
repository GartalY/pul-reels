// Cold open — the waiting supertanker (3 football fields, 2 million barrels) · the 33 km gap vs a marathon · 1 in 5 barrels ·
// 2026: ships stop, oil price jumps · the promise · title.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  P.GULF = [47.6, 23.2, 60.6, 31.0];
  P.gulf = () => P.mkMap('gulf', P.GULF);
  // the narrowest crossing, found once on the 1:50m outlines: Musandam's northern tip ↔ the nearest Iranian coast point
  P.narrows = () => { if (P._nar) return P._nar; const GEO = globalThis.GEO; let best = null;
    const om = GEO.detail['Oman'].flatMap((r) => { const a = []; for (let i = 0; i < r.length; i += 2) if (r[i + 1] > 25.9 && r[i] > 55.9 && r[i] < 56.8) a.push([r[i], r[i + 1]]); return a; });
    const ir = GEO.detail['Iran'].flatMap((r) => { const a = []; for (let i = 0; i < r.length; i += 2) if (r[i] > 55.9 && r[i] < 57.3 && r[i + 1] < 27.4) a.push([r[i], r[i + 1]]); return a; });
    for (const a of om) for (const b of ir) { const d = Math.hypot((a[0] - b[0]) * Math.cos(0.46), a[1] - b[1]); if (!best || d < best.d) best = { d, a, b }; }
    P._nar = best; return best; };
  P.sky1 = (ctx, t) => { P.sky(ctx, t, { top: '#F6A66B', bot: '#FCE3B4', h: 700 }); P.sun(ctx, 1150, 450, 90, t, { color: '#FFD27A' }); };

  // S1 — dusk off Oman: a supertanker at anchor, as long as three football fields, two million barrels in its belly. Gull lands on deck.
  P.shot(ev.c0_s1, (ctx, t, s) => {
    ctx.save(); P.push(ctx, s.u, 960, 600, 0.03);
    P.sky1(ctx, t);
    // far coast
    P.poly(ctx, [[-100, 640], [200, 600], [420, 615], [700, 585], [900, 610], [1100, 640], [-100, 640]], '#C98A6A', { a: 0.6, curve: true });
    P.water(ctx, t, { y0: 630, color: '#2C79A8', color2: '#174E7C', seed: 3 });
    // three football fields under the hull (dimension)
    const fx0 = 210, fw = 500;
    ev.c0_fields.forEach((tf, i) => { const k = P.pop(t, tf, 0.35); if (k <= 0) return; P.at(ctx, fx0 + fw * i + fw / 2, 955, k, 0, () => {
      P.rect(ctx, -fw / 2 + 6, -55, fw - 12, 110, 8, i % 2 ? '#4FA765' : '#5DB872', { shadow: 0.2 }); ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 4; ctx.strokeRect(-fw / 2 + 20, -42, fw - 40, 84);
      P.line(ctx, 0, -42, 0, 42, C.white, 4, 0.85); ctx.beginPath(); ctx.arc(0, 0, 22, 0, 7); ctx.stroke(); }); });
    const dk = P.fin(t, ev.c0_fields[2] + 0.3, 0.4);
    if (dk > 0) { ctx.save(); ctx.globalAlpha *= dk; P.arrow(ctx, 760, 1040, 210, 1040, { color: C.white, lw: 5, head: 20 }); P.arrow(ctx, 1160, 1040, 1710, 1040, { color: C.white, lw: 5, head: 20 }); P.rect(ctx, 790, 1012, 340, 56, 28, C.navy); G.text(ctx, 'LENGTH ≈ 330 m', 960, 1052, { size: 32, fam: 'Inter', weight: 800, color: C.gold, align: 'center', boil: 0 }); ctx.restore(); }
    // the tanker
    const fill = P.fin(t, ev.c0_belly, 0.6);
    P.tanker(ctx, 960, 790, 1500, t, { load: 1, smoke: 0.4, wake: 0 });
    // the cargo cutaway: oil rising inside the tanks
    if (fill > 0) { ctx.save(); ctx.globalAlpha *= fill; const x0 = 380, x1 = 1580, top = 742, bot = 900; P.rect(ctx, x0, top, x1 - x0, bot - top, 10, '#2E3140');
      for (let i = 0; i < 8; i++) { const cx = x0 + 12 + i * (x1 - x0 - 24) / 8, cw = (x1 - x0 - 24) / 8 - 10; const lvl = clamp((t - ev.c0_belly - i * 0.12) / 1.2); P.rect(ctx, cx, top + 10, cw, bot - top - 20, 6, '#454A5C');
        const hh = (bot - top - 20) * ease.outCubic(lvl); P.rect(ctx, cx, bot - 10 - hh, cw, hh, 6, C.oil); P.rect(ctx, cx, bot - 10 - hh, cw, 6, 3, '#5A5E70', { a: lvl }); }
      ctx.restore(); }
    // gull flies in and lands on the bow
    const land = P.oc((t - 0.6) / 1.4); const gx = lerp(2150, 1480, land), gy = lerp(380, 724, land);
    Ch.gull(ctx, { x: gx, y: gy, s: 0.95, t, dir: -1, fly: 1 - P.fin(t, 1.8, 0.35), gesture: t > ev.c0_belly ? 'point' : 'idle', mouth: P.talk(t), look: -1 });
    ctx.restore();
    P.kicker(ctx, 'Off the coast of Oman', t, ev.c0_oman - 0.2, { x: 110, y: 110 });
    P.tag(ctx, '3 football fields long', 520, 230, t, ev.c0_fields[0], ev.c0_belly + 0.2, { size: 44, fill: C.cream, dot: C.green });
    P.counter(ctx, { x: 560, y: 300, from: 0, to: 2000000, t, t0: ev.c0_2ma, t1: ev.c0_2m + 0.2, size: 96, sub: 'barrels of oil on board', color: C.coral });
  }, { in: { type: 'fade', dur: 0.6 } });

  // S2 — the map: down to the gap. 33 km at the narrowest; a marathon is longer.
  P.shot(ev.c0_s2, (ctx, t, s) => {
    const m = P.gulf(); const nar = P.narrows(); const A = m.ll(...nar.a), B = m.ll(...nar.b); const mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    ctx.save(); const cam = P.cam(ctx, t, ev.c0_s2, ev.c0_gap + 0.4, { x: 980, y: 540, z: 1 }, { x: mid[0] - 20, y: mid[1] + 60, z: 3.2 });
    P.drawMap(ctx, m, { sea: C.sea, z: cam.z, colors: { Iran: C.land2, Oman: C.sand } });
    // a tanker icon nosing toward the gap
    const k = P.eio((t - ev.c0_s2) / 6); const tp = [lerp(mid[0] + 260, mid[0] + 30, k), lerp(mid[1] + 140, mid[1] + 10, k)];
    P.tankerTop(ctx, tp[0], tp[1], Math.atan2(-130, -230), 46, { z: cam.z });
    // the measuring line
    const mk = P.oc((t - ev.c0_gap) / 0.6); if (mk > 0) { ctx.save(); ctx.lineWidth = 6 / cam.z; P.line(ctx, A[0], A[1], lerp(A[0], B[0], mk), lerp(A[1], B[1], mk), C.gold, 7 / cam.z, 1, 1, [14 / cam.z, 9 / cam.z]); P.circ(ctx, A[0], A[1], 9 / cam.z, C.gold); if (mk >= 1) P.circ(ctx, B[0], B[1], 9 / cam.z, C.gold); ctx.restore(); }
    P.ring(ctx, mid[0], mid[1], t, ev.c0_33, { r: 60 / cam.z, color: C.gold, lw: 6 / cam.z });
    ctx.restore();
    P.stamp(ctx, '≈ 33 km', 1320, 300, t, ev.c0_33, { size: 92, color: C.gold, fg: C.navy });
    // marathon comparison
    const ka = P.fin(t, ev.c0_mar - 0.3, 0.3); if (ka > 0) { ctx.save(); ctx.globalAlpha *= ka; P.rect(ctx, 260, 780, 1400, 230, 26, C.navy, { shadow: 0.3 });
      P.hbar(ctx, { x: 520, y: 815, w: 1040, h: 54, frac: 33 / 42.2, t, t0: ev.c0_mar - 0.2, color: C.gold, value: '' }); G.text(ctx, 'THE GAP', 300, 856, { size: 34, fam: 'Inter', weight: 800, color: C.gold, boil: 0 });
      P.hbar(ctx, { x: 520, y: 915, w: 1040, h: 54, frac: 1, t, t0: ev.c0_mar, color: C.teal }); G.text(ctx, 'MARATHON', 300, 956, { size: 34, fam: 'Inter', weight: 800, color: C.teal, boil: 0 });
      G.text(ctx, '33 km', 520 + 1040 * 33 / 42.2 - 20, 856, { size: 34, fam: 'Bungee', color: C.navy, align: 'right', boil: 0 }); G.text(ctx, '42.2 km', 1540, 956, { size: 34, fam: 'Bungee', color: C.navy, align: 'right', boil: 0 });
      const rk = clamp((t - ev.c0_mar) / 2.2); P.person(ctx, 540 + 960 * rk, 912, 0.38, { color: C.cream, t, arm: 0.4 + 0.3 * Math.sin(t * 12) });
      ctx.restore(); }
    P.kicker(ctx, 'The gap', t, ev.c0_s2 + 0.3);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — one in every five barrels the world burned went through this gap
  P.shot(ev.c0_s3, (ctx, t) => {
    P.bgLight(ctx, t);
    P.write(ctx, 'the world’s oil, before 2026', 960, 200, t, ev.c0_s3 + 0.15, { size: 64, color: C.dim, weight: 800 });
    const sel = 2; const slide = P.eio((t - ev.c0_through) / 1.0);
    // the gap: two walls
    const ga = P.fin(t, ev.c0_through - 0.5, 0.4); P.rect(ctx, 1500, 360, 70, 230, 12, C.land2, { a: ga, shadow: 0.2 }); P.rect(ctx, 1500, 700, 70, 230, 12, C.land2, { a: ga, shadow: 0.2 }); P.rect(ctx, 1490, 590, 90, 110, 0, '#BFE3F5', { a: ga * 0.8 });
    G.text(ctx, 'HORMUZ', 1535, 330, { size: 34, fam: 'Inter', weight: 800, color: C.sea, align: 'center', alpha: ga, boil: 0 });
    for (let i = 0; i < 5; i++) { const k = P.pop(t, ev.c0_barrels[i], 0.35); if (k <= 0) continue; const isSel = i === sel; const lift = isSel ? P.oc((t - ev.c0_five) / 0.35) : 0;
      let x = 360 + i * 230, y = 760 - lift * 40; if (isSel) { x = lerp(x, 1535, slide); y = lerp(y, 700, slide); }
      P.barrel(ctx, x, y, k * 1.25, { color: isSel && lift > 0 ? C.coral : C.oil, band: C.gold }); }
    P.ring(ctx, 360 + sel * 230, 690, t, ev.c0_five, { r: 150, color: C.coral });
    P.stamp(ctx, '1 IN 5', 560, 960, t, ev.c0_five, { size: 96, color: C.coral, rot: -0.03 });
    Ch.gull(ctx, { x: 1720, y: 1040, s: 0.75, t, dir: -1, gesture: t > ev.c0_through ? 'point' : 'idle', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'wipe', dir: 'left', dur: 0.5 } });

  // S4 — 2026: the ships almost stopped; oil jumped by more than half
  P.shot(ev.c0_s4, (ctx, t) => {
    P.bgNavy(ctx, t);
    const ky = P.pop(t, ev.c0_2026, 0.4); P.at(ctx, 350, 230, ky, -0.04, () => { P.rect(ctx, -150, -80, 300, 160, 20, C.cream, { shadow: 0.3 }); P.rect(ctx, -150, -80, 300, 44, 20, C.coral); G.text(ctx, '2026', 0, 50, { size: 84, fam: 'Bungee', color: C.navy, align: 'center', boil: 0 }); });
    // a lane of ships thinning out
    const lane = (i) => 140 + i * 150; const thin = P.fin(t, ev.c0_stopped, 1.0);
    for (let i = 0; i < 9; i++) { const x = ((lane(i) + (t - ev.c0_s4) * 70) % 1500) + 60; const keep = i === 2 || i === 6; const a = keep ? 1 : 1 - thin; P.tankerTop(ctx, x, 520, 0, 90, { a: a * 0.95 }); }
    P.rect(ctx, 0, 470, W, 4, 2, 'rgba(255,255,255,0.15)'); P.rect(ctx, 0, 570, W, 4, 2, 'rgba(255,255,255,0.15)');
    P.tag(ctx, 'ships almost stopped', 1320, 400, t, ev.c0_stopped, 1e9, { size: 40, fill: C.cream, dot: C.red });
    // the price: ~$70 → ~$126
    const b0 = 640, bx = [620, 1080]; const v0 = P.oc((t - ev.c0_shot + 0.5) / 0.5) * 70, v1 = 70 + 56 * P.oc((t - ev.c0_shot) / 0.9);
    if (t > ev.c0_shot - 0.6) { const sc = 3.4; P.rect(ctx, bx[0] - 90, b0 + 330 - v0 * sc, 180, v0 * sc, 14, C.grey); P.rect(ctx, bx[1] - 90, b0 + 330 - Math.max(v0, v1) * sc, 180, Math.max(v0, v1) * sc, 14, C.coral);
      G.text(ctx, '$' + Math.round(v0), bx[0], b0 + 310 - v0 * sc, { size: 50, fam: 'Bungee', color: C.cream, align: 'center', boil: 0 }); G.text(ctx, '$' + Math.round(Math.max(v0, v1)), bx[1], b0 + 310 - Math.max(v0, v1) * sc, { size: 50, fam: 'Bungee', color: C.gold, align: 'center', boil: 0 });
      P.label(ctx, 'before (Feb)', bx[0], b0 + 370, { align: 'center', size: 28 }); P.label(ctx, 'peak (30 Apr)', bx[1], b0 + 370, { align: 'center', size: 28 });
      P.label(ctx, 'Brent crude, $ per barrel', 380, b0 + 30, { size: 30, color: C.cream }); }
    P.stamp(ctx, 'MORE THAN HALF', 1490, 820, t, ev.c0_half, { size: 72, color: C.coral, rot: -0.04 });
    P.source(ctx, 'AP, Reuters (Brent ≈ $70 before the war; briefly ≈ $126 on 30 Apr 2026)', t, ev.c0_shot);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S5 — the promise: two questions this video will answer
  P.shot(ev.c0_s5, (ctx, t) => {
    P.bgNavy(ctx, t);
    P.write(ctx, 'by the end of this video…', 960, 190, t, ev.c0_end - 0.1, { size: 64, color: C.cream });
    const card = (i, tt, line1, line2, col) => { const k = P.pop(t, tt, 0.45); if (k <= 0) return; P.at(ctx, 700, 410 + i * 250, k, 0, () => {
      P.rect(ctx, -460, -95, 1100, 190, 26, C.cream, { shadow: 0.3, sy: 10 }); P.rect(ctx, -460, -95, 20, 190, 10, col);
      P.rect(ctx, -400, -40, 80, 80, 14, C.white, { stroke: col, lw: 6 }); G.text(ctx, '?', -360, 30, { size: 64, fam: 'Bungee', color: col, align: 'center', boil: 0 });
      G.text(ctx, line1, -280, -8, { size: 50, fam: 'Inter', weight: 800, color: C.ink, boil: 0 }); G.text(ctx, line2, -280, 54, { size: 40, fam: 'Inter', weight: 700, color: C.dim, boil: 0 }); }); };
    card(0, ev.c0_why1 - 0.3, 'Why one narrow strait', 'can shake the whole world', C.coral);
    card(1, ev.c0_forty - 0.2, 'Why, 40 years ago,', 'it didn’t', C.teal);
    P.stamp(ctx, "IT DIDN'T", 1350, 690, t, ev.c0_didnt + 0.25, { size: 56, color: C.teal, rot: 0.05 });
    Ch.gull(ctx, { x: 1610, y: 990, s: 1.1, t, dir: -1, gesture: t > ev.c0_forty ? 'pointUp' : 'point', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — the question, then the title: eight words slam in over the strait; the brand; the gull salutes
  P.shot(ev.c0_s6, (ctx, t, s) => {
    const m = P.gulf(); const nar = P.narrows(); const A = m.ll(...nar.a), B = m.ll(...nar.b);
    ctx.save(); const cam = P.cam(ctx, t, ev.c0_s6, ev.c0_s6 + 12, { x: (A[0] + B[0]) / 2, y: (A[1] + B[1]) / 2, z: 2.6 }, { x: (A[0] + B[0]) / 2, y: (A[1] + B[1]) / 2, z: 2.75 }, (x) => x);
    P.drawMap(ctx, m, { sea: C.sea2, z: cam.z, colors: { Iran: '#6F7FA8', Oman: '#6F7FA8', 'United Arab Emirates': '#6F7FA8' }, coast: '#5A6A94', land: '#6F7FA8' });
    ctx.restore();
    ctx.save(); ctx.fillStyle = 'rgba(14,24,56,0.62)'; ctx.fillRect(0, 0, W, H); ctx.restore(); P.dark = true;
    if (t < ev.title0 + 0.2) P.write(ctx, 'the Strait of Hormuz', 960, 560, t, ev.c0_q - 0.3, { size: 110, color: C.cream, t1: ev.title0 + 0.2, hl: ['Hormuz'] });
    const words = ev.titleWords; const size = 150; const rows = [[0, 1, 2], [3, 4], [5, 6, 7]];
    rows.forEach((idx, r) => { const sp = 40; const ws = idx.map((i) => P.measure(ctx, words[i].w, size, 'Inter', 800)); const tw = ws.reduce((a, b) => a + b, 0) + sp * (idx.length - 1); let xx = 960 - tw / 2;
      idx.forEach((i, j) => { const w = words[i]; if (t >= w.t) { const k = lerp(1.6, 1, ease.outCubic(clamp((t - w.t) / 0.14))); const col = w.w === 'STRAIT' || w.w === 'WORLD?' ? C.gold : C.cream;
        P.at(ctx, xx + ws[j] / 2, 330 + r * 190, k, 0, () => G.text(ctx, w.w, 0, 0, { size, fam: 'Inter', weight: 800, color: col, align: 'center', boil: 0 })); P.burst(ctx, xx + ws[j] / 2, 280 + r * 190, t, w.t, { r: ws[j] * 0.5, seed: i + 3 }); }
        xx += ws[j] + sp; }); });
    const kb = P.pop(t, ev.titleBrand, 0.45); if (kb > 0) { P.planet(ctx, 790, 930, 34 * kb, t); G.text(ctx, 'WHYVERSE', 1030, 954, { size: 66, fam: 'Bungee', color: C.gold, align: 'center', alpha: clamp(kb), boil: 0 }); }
    const fl = P.oc((t - ev.titleGull + 0.6) / 1.0);
    Ch.gull(ctx, { x: lerp(2100, 1660, fl), y: lerp(600, 1010, fl), s: 0.9, t, dir: -1, fly: 1 - P.fin(t, ev.titleGull + 0.3, 0.3), gesture: t > ev.titleGull + 0.4 ? 'cheer' : 'idle', mouth: 0, eyes: 'happy', a: fl > 0 ? 1 : 0 });
  }, { in: { type: 'fade', dur: 0.5 } });
})();
