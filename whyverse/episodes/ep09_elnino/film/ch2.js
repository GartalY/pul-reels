// Chapter 2 — The tilted ocean: trade winds east → west · like blowing across a bathtub · the sea ≈ 0.5 m higher near Indonesia than
// Ecuador · ≈ 8 °C warmer · the warm pool ≈ 4 × the lower 48 US states · cold, nutrient-rich water rises off Peru → one of the biggest
// fisheries in the world · rain in the west, dry east · it all hangs on the wind — and the wind gets tired.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  P.cardShot('c2', 2, 'The tilted ocean', C.cyan, (ctx, t) => {
    // a tilted water line under the card
    const tl = Math.sin(t * 0.8) * 0.02 + 0.05; ctx.save(); ctx.translate(960, 1000); ctx.rotate(-tl); P.ink(ctx, (c) => { c.beginPath(); c.rect(-1400, 0, 2800, 400); }, C.sea, { lw: 6, dots: C.blue, dotA: 0.4 }); ctx.restore();
  });
  // mini map with the equator slice (orientation inset)
  const slice = (ctx, t, t0, x = 40, y = 40) => P.panel(ctx, x, y, 420, 230, t, t0, (c) => { const m = P.pac(); const pj = P.drawMap(c, m, -30, -20, 0.2);
    const a = pj(100, 0), b = pj(-80, 0); P.line(c, a[0], a[1], lerp(a[0], b[0], P.oc((t - t0) / 0.8)), a[1], C.red, 8); G.text(c, 'THE SLICE: ALONG THE EQUATOR', 210, 220, { size: 26, fam: 'Bangers', color: C.cream, stroke: C.ink, strokeW: 6, align: 'center', boil: 0 }); });

  // S1 — trade winds blow from east to west, from South America towards Asia, day after day
  P.shot(ev.c2_s1, (ctx, t) => {
    ctx.save(); P.push(ctx, (t - ev.c2_s1) / 7, 960, 520, 0.03); P.section(ctx, t, 0, { labels: P.fin(t, ev.c2_asia, 0.4), windFace: P.fin(t, ev.c2_trade - 0.3, 0.4) }); ctx.restore();
    slice(ctx, t, ev.c2_eq);
    P.slam(ctx, 'TRADE WINDS', 1020, 600, t, ev.c2_trade, { size: 90, color: C.yel, t1: ev.c2_day + 1.2 });
    P.caption(ctx, '← EAST TO WEST', 840, 680, t, ev.c2_east, { size: 44, t1: ev.c2_day + 1.2 });
    P.cstamp(ctx, 'SOUTH AMERICA', 1640, 470, t, ev.c2_sa, { size: 44, color: C.red, t1: ev.c2_day + 1.5 });
    P.cstamp(ctx, 'ASIA', 180, 360, t, ev.c2_asia, { size: 48, color: C.blue, t1: ev.c2_day + 1.5 });
    const dk = P.pop(t, ev.c2_day, 0.35); if (dk > 0) P.at(ctx, 1700, 110, dk, 0, () => { P.iR(ctx, -130, -60, 260, 120, 6, C.cream, { lw: 5, shadow: 1 }); G.text(ctx, 'DAY ' + (1 + Math.floor(Math.max(0, t - ev.c2_day) * 4)), 0, 22, { size: 60, fam: 'Bangers', color: C.ink, align: 'center', boil: 0 }); });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — like blowing across a bathtub · the water piles up in the west · ≈ 0.5 m higher near Indonesia than Ecuador
  P.shot(ev.c2_s2, (ctx, t) => {
    P.section(ctx, t, 0, { labels: 0.6, windFace: 1 });
    const tk = P.pop(t, ev.c2_tub - 0.2, 0.4); P.panel(ctx, 1240, 560, 600, 400, t, ev.c2_tub - 0.2, (c) => { c.fillStyle = '#F7F1E4'; c.fillRect(0, 0, 600, 400);
      const tilt = 0.09 * P.eio((t - ev.c2_tub) / 0.8); c.save(); c.beginPath(); c.moveTo(80, 160); c.lineTo(520, 160); c.quadraticCurveTo(520, 340, 300, 340); c.quadraticCurveTo(80, 340, 80, 160); c.clip();
      c.save(); c.translate(300, 220); c.rotate(-tilt); P.ink(c, (cc) => { cc.beginPath(); cc.rect(-400, 0, 800, 300); }, C.cold, { lw: 4, dots: C.blue, dotA: 0.3 }); c.restore(); c.restore();
      P.stroke(c, (cc) => { cc.beginPath(); cc.moveTo(80, 160); cc.lineTo(520, 160); cc.quadraticCurveTo(520, 340, 300, 340); cc.quadraticCurveTo(80, 340, 80, 160); }, C.ink, 7);
      P.windFace(c, 560, 110, 0.35, t, { energy: 1, dir: -1 }); G.text(c, 'LIKE A BATHTUB', 300, 385, { size: 34, fam: 'Bangers', color: C.ink, align: 'center', boil: 0 }); }, { t1: ev.c2_indo - 0.1 });
    // the height difference: dashed line from the east surface across to the west, dimension ≈ 0.5 m
    const yW = P.secSurface(P.SEC.X0 + 40, 0), yE = P.secSurface(P.SEC.X1 - 40, 0); const dk = P.oc((t - ev.c2_pile) / 0.8);
    if (dk > 0) { P.line(ctx, P.SEC.X1 - 40, yE, lerp(P.SEC.X1 - 40, P.SEC.X0 + 40, dk), yE, C.ink, 4, 0.9, 1, [14, 10]); }
    P.dimLine(ctx, P.SEC.X0 + 120, yE, P.SEC.X0 + 120, yW, '', P.oc((t - ev.c2_half + 0.3) / 0.5), { color: C.red });
    P.burstStar(ctx, 560, 300, 130, t, ev.c2_half, { color: C.yel, text: '≈ 0.5 M', size: 70, tcol: C.red, sub: 'HIGHER', subSize: 30 });
    P.cstamp(ctx, 'INDONESIA', 230, 420, t, ev.c2_indo, { size: 44, color: C.blue });
    P.cstamp(ctx, 'ECUADOR', 1650, 470, t, ev.c2_ecu, { size: 44, color: C.red });
    P.source(ctx, 'NOAA PMEL', t, ev.c2_half);
  }, { in: { type: 'fade', dur: 0.3 } });

  // S3 — ≈ 8 °C warmer · the warm pool covers ≈ 4 × the lower 48 US states
  P.shot(ev.c2_s3, (ctx, t) => {
    ctx.fillStyle = C.sea; ctx.fillRect(-600, -600, W + 1200, H + 1200);
    const m = P.mapCache('indopac', { lon0: 40, lon1: 300, lat0: -50, lat1: 55, w: 2400 }); const s = 0.8; const pj = P.drawMap(ctx, m, 0, 540 - m.h * s / 2, s);
    const pk = P.oc((t - ev.c2_pool + 0.2) / 1.0); const wp = pj(140, 0);
    if (pk > 0) { P.heat(ctx, wp[0], wp[1], 520 * pk, 200 * pk, t); P.heat(ctx, pj(85, -5)[0], pj(85, -5)[1], 260 * pk, 140 * pk, t, { a: 0.8 }); P.slam(ctx, 'THE WARM POOL', wp[0], wp[1] - 230, t, ev.c2_pool + 0.2, { size: 70, color: C.yel }); }
    // 4 lower-48 outlines (area kept: shrunk by cos 37° horizontally), popping one by one
    const us = GEO.world['United States of America']; const ring = us.reduce((a, r) => (r.length > a.length ? r : a), us[0]);
    for (let i = 0; i < 4; i++) { const k = P.pop(t, ev.c2_4x + i * 0.22, 0.35); if (k <= 0) continue; const ox = 1380 + (i % 2) * 300, oy = 620 + Math.floor(i / 2) * 190;
      P.ink(ctx, (c) => { c.beginPath(); for (let q = 0; q < ring.length; q += 2) { const x = ox + (ring[q] + 96) * m.k * s * 0.8 * k, y = oy - (ring[q + 1] - 37) * m.k * s * k; q ? c.lineTo(x, y) : c.moveTo(x, y); } c.closePath(); }, C.red, { lw: 4, shadow: 0.9, dots: C.red2, dotA: 0.3 }); }
    P.burstStar(ctx, 1530, 470, 110, t, ev.c2_4x + 0.9, { color: C.yel, text: '× 4', size: 90, tcol: C.red, sub: 'LOWER-48 US', subSize: 26 });
    // the thermometers (west vs east) first
    P.panel(ctx, 60, 120, 640, 480, t, ev.c2_s3 + 0.1, (c) => { c.fillStyle = C.cream; c.fillRect(0, 0, 640, 480);
      P.thermo(c, 170, 380, 260, 0.85, { col: C.red, label: 'WEST' }); P.thermo(c, 470, 380, 260, 0.35, { col: C.cyan, label: 'EAST' });
      P.ccount(c, { x: 320, y: 140, from: 0, to: 8, prefix: '≈ +', suffix: ' °C', t, t0: ev.c2_8a, t1: ev.c2_8, size: 90, card: false, color: C.red }); }, { t1: ev.c2_pool });
    P.source(ctx, 'NOAA PMEL · NASA Earth Observatory', t, ev.c2_8);
  }, { in: { type: 'push', dir: 'up', dur: 0.5 } });

  // S4 — off Peru: cold water rises from the deep, full of nutrients → fish → one of the biggest fisheries in the world
  P.shot(ev.c2_s4, (ctx, t) => {
    const z = P.eio((t - ev.c2_other + 0.3) / 1.0); ctx.save(); ctx.translate(960, 540); ctx.scale(lerp(1, 1.7, z), lerp(1, 1.7, z)); ctx.translate(-lerp(960, 1380, z), -lerp(540, 640, z));
    P.section(ctx, t, 0, { labels: 0, windFace: 0, upwell: P.fin(t, ev.c2_rises - 0.3, 0.5), fish: P.fin(t, ev.c2_fish - 0.2, 0.5), notToScale: 0 });
    for (let i = 0; i < 26; i++) { const a = P.fin(t, ev.c2_nutr, 0.6); if (a <= 0) break; const ph = (t * 0.25 + U.hash(i, 8)) % 1; const x = 1430 + U.hash(i, 9) * 230, y = lerp(1000, 640, ph); P.circ(ctx, x, y, 5, C.green, { a: a * Math.sin(ph * Math.PI) }); }
    P.boat(ctx, 1340, 548, 0.32, t, { people: 1, col: C.yel, a: P.fin(t, ev.c2_fish, 0.4) });
    ctx.restore();
    P.caption(ctx, 'COLD WATER RISES', 80, 70, t, ev.c2_cold, { size: 50, fill: C.cyan });
    P.caption(ctx, '+ NUTRIENTS', 80, 170, t, ev.c2_nutr, { size: 44, fill: C.green });
    P.slam(ctx, 'ONE OF THE BIGGEST FISHERIES IN THE WORLD', 960, 960, t, ev.c2_world - 0.1, { size: 74, color: C.yel });
    Ch.pico(ctx, { x: lerp(2100, 1650, P.eio((t - ev.c2_fish + 0.4) / 0.8)), y: 330, s: 0.55, t, dir: -1, gesture: 'fly', rot: 0.2, mouth: P.talk(t) });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — rain in the warm west, dry in the cool east — a balance that hangs on the wind… and the wind gets tired
  P.shot(ev.c2_s5, (ctx, t) => {
    const tired = P.eio((t - ev.c2_tired) / 1.2); const zk = P.eio((t - ev.c2_wind + 0.2) / 1.0);
    ctx.save(); ctx.translate(960, 540); const zz = lerp(1, 1.35, zk); ctx.scale(zz, zz); ctx.translate(-lerp(960, 1400, zk), -lerp(540, 420, zk));
    P.section(ctx, t, 0, { wind: lerp(1, 0.15, tired), labels: 1 - zk });
    ctx.restore();
    P.cstamp(ctx, 'CLOUDS + HEAVY RAIN', 470, 90, t, ev.c2_clouds, { size: 50, color: C.blue, t1: ev.c2_wind });
    P.cstamp(ctx, 'DRY', 1500, 280, t, ev.c2_dry, { size: 60, color: C.red, t1: ev.c2_wind });
    const bk = P.pop(t, ev.c2_bal, 0.4); if (bk > 0 && t < ev.c2_wind) P.at(ctx, 960, 160, bk, Math.sin(t * 2.4) * 0.08, () => { P.line(ctx, -160, 0, 160, 0, C.ink, 10); P.iP(ctx, [[-30, 70], [30, 70], [0, 0]], C.land2, { lw: 5 }); P.iE(ctx, -160, 30, 50, 16, C.cyan, { lw: 5 }); P.iE(ctx, 160, 30, 50, 16, C.warm, { lw: 5 }); });
    P.slam(ctx, 'SO WHAT IF THE WIND GETS TIRED?', 760, 980, t, ev.c2_tired, { size: 78, color: C.yel });
  }, { in: { type: 'fade', dur: 0.4 } });
})();
