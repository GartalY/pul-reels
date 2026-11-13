// Chapter 2 — The gold myth: a mountain? a city? 224,000 tonnes · one cube ≈ 22.6 m a side, fits on a football pitch ·
// every ring, coin and vault bar inside · ~half jewellery, ~a fifth central banks · ≈ $28 tn at ~$3,900/oz ·
// only ~1/20 of what people own → MYTH · "maybe it's money?"
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C; const A = P.A;
  const W = G.W, H = G.H;
  P.cardShot('c2', 2, 'The gold myth', (ctx, t) => { for (let i = 0; i < 7; i++) P.art(ctx, A.bar(150), 1, { x: ((t * 50 + i * 320) % 2300) - 160, y: 1030, a: 0.2 }); });

  // S1 — guesses (mountain, city — crossed) → 224,000 tonnes
  P.shot(ev.c2_s1, (ctx, t, s) => {
    P.bp(ctx, t);
    const mk = P.oc((t - ev.c2_mtn + 0.2) / 0.8); P.art(ctx, [[[100, 620], [300, 300], [380, 400], [500, 220], [720, 620]], [[430, 300], [500, 220], [560, 320]]], mk, { lw: 5 });
    P.note(ctx, 'a mountain?', null, null, 410, 700, t, ev.c2_mtn, { size: 50 });
    const ck = P.oc((t - ev.c2_city + 0.2) / 0.8); [[A.tower(80, 260), 1250], [A.tower(110, 360), 1370], [A.tower(70, 200), 1480], [A.tower(120, 300), 1600], [A.tower(80, 230), 1720]].forEach(([p, x], i) => P.art(ctx, p, clamp(ck * 1.5 - i * 0.12), { x, y: 620, lw: 4 }));
    P.note(ctx, 'a city?', null, null, 1490, 700, t, ev.c2_city, { size: 50 });
    const cr = (t - ev.c2_224a) / 0.35; P.cross(ctx, 90, 200, 730, 640, cr); P.cross(ctx, 1180, 200, 1800, 640, cr - 0.6);
    P.bcount(ctx, { x: 960, y: 860, to: 224000, t, t0: ev.c2_224a, t1: ev.c2_224, size: 120, sub: 'TONNES', subSize: 44 });
    P.source(ctx, 'World Gold Council, above-ground stocks (Q3 2026)', t, ev.c2_224);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — melt it into one cube: ≈ 22.6 m a side; zoom out → it sits on a football pitch with room to play around it
  P.shot(ev.c2_s2, (ctx, t, s) => {
    P.bp(ctx, t);
    const out = P.eio((t - ev.c2_pitch + 0.2) / 1.6);
    ctx.save(); P.cam(ctx, t, ev.c2_pitch - 0.2, ev.c2_pitch + 1.4, { x: 960, y: 560, z: 1 }, { x: 960, y: 560, z: 0.55 });
    // pitch (iso-ish: squashed top view)
    ctx.save(); ctx.translate(960, 700); ctx.scale(1, 0.5); P.art(ctx, A.pitch(1900), P.oc((t - ev.c2_pitch) / 1.0), { lw: 7, color: C.mint }); ctx.restore();
    // bars melt into the cube
    const mt = P.eio((t - ev.c2_melt) / 0.9); const ck = P.oc((t - ev.c2_cube + 0.15) / 0.6);
    if (ck < 1) for (let i = 0; i < 9; i++) { const sx = 500 + (i % 3) * 460 + (i > 5 ? 120 : 0), sy = 420 + Math.floor(i / 3) * 140; P.art(ctx, A.bar(150), 1, { x: lerp(sx, 960, mt), y: lerp(sy, 640, mt), s: lerp(1, 0.3, mt), a: 1 - ck }); }
    P.art(ctx, A.cube(250), ck, { x: 960, y: 760, lw: 6, color: C.yel });
    P.glow(ctx, 960, 540, 380, C.yel, ck * 0.5);
    const e = 250, cx = Math.cos(Math.PI / 6) * e, cy = Math.sin(Math.PI / 6) * e;
    P.dim(ctx, 960 + 40, 760 + 24, 960 + cx + 40, 760 - cy + 24, '≈ 22.6 m', P.fin(t, ev.c2_22, 0.7), { size: 38 / lerp(1, 0.6, out) });
    P.dim(ctx, 960 + cx + 40, 760 - cy, 960 + cx + 40, 760 - cy - e, '22.6 m', P.fin(t, ev.c2_22 + 0.3, 0.7), { size: 34 / lerp(1, 0.6, out) });
    // a tiny Pip for scale
    Ch.pip(ctx, { x: 1360, y: 760, s: 0.32, t, dir: -1, gesture: 'pointUp', mouth: 0, a: P.fin(t, ev.c2_cube + 0.4, 0.3) });
    for (let i = 0; i < 6; i++) { const k = P.pop(t, ev.c2_room + i * 0.08, 0.3); if (k > 0) { const x = 300 + i * 260 + Math.sin(t * 2 + i) * 30, y = 900 + (i % 2) * 120; P.person(ctx, x, y, 0.42 * k, t, { pose: 'walk', seed: i, lw: 3 }); } }
    ctx.restore();
    P.write(ctx, 'all the gold ever mined', 960, 140, t, ev.c2_melt - 0.2, { size: 60, color: C.ln, hl: ['gold'], hlColor: C.yel, t1: ev.c2_pitch });
    P.ytag(ctx, 'FITS ON ONE FOOTBALL PITCH', 960, 140, t, ev.c2_pitch + 0.4, 1e9, { size: 42 });
  }, { in: { type: 'fade', dur: 0.35 } });

  // S3 — gold is dense: rings, coins and vault bars all fly into the one cube
  P.shot(ev.c2_s3, (ctx, t, s) => {
    P.bp(ctx, t);
    P.art(ctx, A.cube(210), 1, { x: 960, y: 820, lw: 6, color: C.yel }); P.glow(ctx, 960, 640, 300, C.yel, 0.4 + 0.15 * Math.sin(t * 2));
    P.note(ctx, '19.3 × heavier than water', null, null, 960, 260, t, ev.c2_dense, { size: 46, color: C.ln });
    const fly = (t0, x0, y0, draw, n) => { for (let i = 0; i < n; i++) { const u = P.eio((t - t0 - i * 0.1) / 0.8); if (u <= 0 || u >= 1) continue; const x = lerp(x0 + (i - n / 2) * 60, 960, u), y = lerp(y0, 640, u) - Math.sin(u * Math.PI) * 140; draw(x, y, 1 - u * 0.6); } };
    fly(ev.c2_ring, 260, 420, (x, y, sc) => P.art(ctx, A.ring(46), 1, { x, y, s: sc, color: C.yel }), 5);
    fly(ev.c2_coin, 960, 120, (x, y, sc) => P.art(ctx, A.coin(40), 1, { x, y, s: sc }), 5);
    fly(ev.c2_bar, 1660, 420, (x, y, sc) => P.art(ctx, A.bar(120), 1, { x, y, s: sc }), 4);
    P.ytag(ctx, 'WEDDING RINGS', 300, 330, t, ev.c2_ring, 1e9, { size: 34 }); P.ytag(ctx, 'COINS', 640, 150, t, ev.c2_coin, 1e9, { size: 34 }); P.ytag(ctx, 'BANK BARS', 1620, 330, t, ev.c2_bar, 1e9, { size: 34 });
    // vault door outline closes around the cube
    const vk = P.oc((t - ev.c2_vault) / 0.6); if (vk > 0) { P.art(ctx, [P.circPts(960, 640, 330, 80, -Math.PI / 2, Math.PI * 1.5)], vk, { lw: 8, color: C.ln }); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283 + t * 0.3; P.circ(ctx, 960 + Math.cos(a) * 330, 640 + Math.sin(a) * 330, 12 * vk, C.ln); } }
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S4 — almost half is jewellery, only about a fifth sits in central banks
  P.shot(ev.c2_s4, (ctx, t, s) => {
    P.bp(ctx, t);
    const seg = [[44, C.yel, 'JEWELLERY ≈ 44 %', ev.c2_jew], [18, C.cyan, 'CENTRAL BANKS ≈ 18 %', ev.c2_cb], [21, 'rgba(234,244,255,0.55)', 'BARS + COINS ≈ 21 %', ev.c2_cb + 0.6], [17, 'rgba(234,244,255,0.25)', 'OTHER ≈ 17 %', ev.c2_cb + 0.9]];
    let a0 = -Math.PI / 2; const cx = 700, cy = 560, r = 330;
    seg.forEach(([v, col, lab, t0], i) => { const k = P.eio((t - t0 + 0.2) / 0.6); const a1 = a0 + v / 100 * 6.283 * k; if (k > 0) { ctx.save(); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, a0, a1); ctx.closePath(); ctx.fill(); ctx.strokeStyle = C.bp2; ctx.lineWidth = 6; ctx.stroke(); ctx.restore(); }
      const ma = a0 + v / 200 * 6.283; P.note(ctx, lab, cx + Math.cos(ma) * r * 0.85, cy + Math.sin(ma) * r * 0.85, 1420, 300 + i * 150, t, t0 + 0.3, { size: 46, color: i < 2 ? col : C.ln, align: 'center' }); a0 += v / 100 * 6.283; });
    P.circ(ctx, cx, cy, 120, C.bp2); P.art(ctx, A.ring(52), 1, { x: cx, y: cy + 10, color: C.yel, a: P.fin(t, ev.c2_jew, 0.4) });
    P.source(ctx, 'World Gold Council, Q3 2026', t, ev.c2_s4 + 0.3);
  }, { in: { type: 'fade', dur: 0.35 } });

  // S5 — the worked example: 7.2 billion oz × ≈ $3,900 = ≈ $28 trillion
  P.shot(ev.c2_s5, (ctx, t, s) => {
    P.bp(ctx, t);
    P.panel(ctx, 200, 200, 1520, 640, P.fin(t, ev.c2_s5, 0.5));
    P.write(ctx, '224,000 t  =  7.2 billion ounces', 300, 340, t, ev.c2_s5 + 0.4, { size: 58, align: 'left', color: C.ln, weight: 800 });
    P.write(ctx, '× ≈ $3,900 an ounce', 300, 470, t, ev.c2_oz - 0.2, { size: 58, align: 'left', color: C.yel, weight: 800 });
    P.line(ctx, 300, 530, 1600, 530, C.ln, 5, 1, P.eio((t - ev.c2_28a + 0.4) / 0.5));
    P.bcount(ctx, { x: 960, y: 700, to: 28, t, t0: ev.c2_28a, t1: ev.c2_28, size: 130, prefix: '≈ $', suffix: ' T', sub: 'TRILLION', subSize: 40 });
    P.art(ctx, A.coin(70), P.oc((t - ev.c2_oz) / 0.5), { x: 1580, y: 420, rot: Math.sin(t * 2) * 0.2 });
    P.source(ctx, 'spot ≈ $3,875–3,890/oz, 13 Nov 2026 (USAGOLD, Trading Economics)', t, ev.c2_oz);
  }, { in: { type: 'fade', dur: 0.35 } });

  // S6 — only about one twentieth of what people own → the gold-vault idea is a MYTH
  P.shot(ev.c2_s6, (ctx, t, s) => {
    P.bp(ctx, t);
    P.write(ctx, 'what people own: ≈ $518 trillion', 960, 180, t, ev.c2_s6 + 0.2, { size: 54, color: C.ln });
    for (let i = 0; i < 20; i++) { const x = 360 + (i % 10) * 124, y = 300 + Math.floor(i / 10) * 140; const k = P.pop(t, ev.c2_s6 + 0.4 + i * 0.04, 0.3); if (k <= 0) continue; const gold = i === 0 && t > ev.c2_20th;
      P.rect(ctx, x, y, 104, 120, 8, gold ? C.yel : 'rgba(234,244,255,0.1)', { stroke: gold ? C.yel : C.ln2, lw: 3, a: k }); if (gold) P.art(ctx, A.bar(70), 1, { x: x + 52, y: y + 82, color: C.ink2 }); }
    P.note(ctx, 'all the gold ≈ 1 / 20', 412, 430, 520, 690, t, ev.c2_20th, { size: 52 });
    P.stamp(ctx, 'MYTH', 1300, 760, t, ev.c2_myth, { size: 120, color: C.cor, rot: -0.08 });
    P.note(ctx, '“the world’s wealth = gold in a vault”', null, null, 1300, 900, t, ev.c2_vaultq, { size: 40, color: C.ln2 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S7 — "maybe it's money… a giant pile of cash somewhere?"
  P.shot(ev.c2_s7, (ctx, t, s) => {
    P.bp(ctx, t);
    for (let i = 0; i < 14; i++) { const u = (t - ev.c2_cash + U.hash(i, 1) * 0.6); if (u < 0) continue; const x = 200 + U.hash(i, 2) * 1300 + Math.sin(u * 2 + i) * 60, y = -60 + u * 260 + U.hash(i, 3) * 80; if (y > 1150) continue; P.art(ctx, A.note(160), 1, { x, y, rot: Math.sin(u * 3 + i) * 0.5, lw: 3.5, color: C.mint }); }
    P.write(ctx, 'maybe it’s money?', 800, 480, t, ev.c2_money - 0.2, { size: 92, color: C.ln, hl: ['money?'], hlColor: C.mint });
    Ch.pip(ctx, { x: 1550, y: 900, s: 1.05, t, dir: -1, gesture: t > ev.c2_cash ? 'shrug' : 'think', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'fade', dur: 0.35 } });
})();
