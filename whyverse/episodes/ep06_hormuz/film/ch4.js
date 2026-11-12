// Chapter 4 — The Tanker War (sober): 1980s, Iran–Iraq war, both sides attack ships · 451 ships hit, 400+ sailors ·
// 1987 Bridgeton mine, escorted convoys · the myth: the oil did not stop (≤ ~2 % of ships hit) · prices slid; 1986 crash below $10.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  const RETRO = { sea: '#3F6E8C', land: '#E8D5AE', coast: '#D6BE8E' };
  const yearCard = (ctx, t, t0, s, x = 260, y = 190, col = C.coral) => { const k = P.pop(t, t0, 0.4); P.at(ctx, x, y, k, -0.04, () => { P.rect(ctx, -140, -70, 280, 140, 18, C.cream, { shadow: 0.3 }); P.rect(ctx, -140, -70, 280, 40, 18, col); G.text(ctx, s, 0, 52, { size: 72, fam: 'Bungee', color: C.navy, align: 'center', boil: 0 }); }); };

  P.cardShot('c4', 4, 'The Tanker War', (ctx, t) => { ctx.save(); ctx.globalAlpha = 0.1; for (let i = 0; i < 4; i++) P.tanker(ctx, ((t * 30 + i * 600) % 2600) - 300, 1000, 380, t); ctx.restore(); });

  // S1 — the 1980s: Iran and Iraq at war; from 1984, ships in the Gulf attacked, to hit each other's oil money
  P.shot(ev.c4_s1, (ctx, t) => {
    const m = P.gulf(); ctx.save(); const cam = P.cam(ctx, t, ev.c4_s1, ev.c4_s1 + 12, { x: 820, y: 500, z: 1.08 }, { x: 800, y: 500, z: 1.14 }, (x) => x);
    P.drawMap(ctx, m, { sea: RETRO.sea, land: RETRO.land, coast: RETRO.coast, z: cam.z });
    P.highlight(ctx, m, 'Iran', '#D98C6A', P.fin(t, ev.c4_iran, 0.3), cam.z); P.highlight(ctx, m, 'Iraq', '#C9A35A', P.fin(t, ev.c4_iraq, 0.3), cam.z);
    const ir = m.ll(53.5, 29.3), iq = m.ll(46.6, 30.5); P.mapLabel(ctx, 'IRAN', ir[0], ir[1], { z: cam.z, size: 46, color: C.cream, a: P.fin(t, ev.c4_iran, 0.3) }); P.mapLabel(ctx, 'IRAQ', iq[0], iq[1], { z: cam.z, size: 46, color: C.cream, a: P.fin(t, ev.c4_iraq, 0.3) });
    // ships hit across the Gulf (sober: a ring + a small smoke puff)
    const SH = [[50.2, 28.6], [51.4, 27.4], [52.6, 26.9], [50.9, 26.7], [53.9, 26.4], [49.6, 28.0], [55.2, 26.6], [51.8, 28.0]];
    SH.forEach(([lo, la], i) => { const p = m.ll(lo, la); const tt = ev.c4_ships + i * 0.28; P.tankerTop(ctx, p[0], p[1], 0.4 + i, 64, { z: cam.z, color: '#7A5A4A' });
      if (t > tt) { P.ring(ctx, p[0], p[1], t, tt, { r: 50 / cam.z, color: C.coral, lw: 6 / cam.z }); for (let k = 0; k < 3; k++) { const u = ((t - tt) * 0.4 + k / 3) % 1; P.circ(ctx, p[0] - u * 14 / cam.z, p[1] - u * 40 / cam.z, (6 + u * 12) / cam.z, '#555B6E', { a: 0.5 * (1 - u) * P.fin(t, tt, 0.3) }); } } });
    ctx.restore();
    yearCard(ctx, t, ev.c4_80s, '1980s'); if (t > ev.c4_1984) yearCard(ctx, t, ev.c4_1984, '1984', 260, 360, C.gold);
    const km = P.pop(t, ev.c4_money, 0.4); if (km > 0) { P.at(ctx, 1600, 860, km, 0, () => { P.barrel(ctx, -70, 60, 1.0, { color: C.oil }); P.coin(ctx, 60, -10, 50); P.coin(ctx, 110, 30, 40); }); P.tag(ctx, 'target: oil money', 1600, 980, t, ev.c4_money, 1e9, { size: 38 }); }
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — over four years: 451 ships hit; more than 400 sailors died
  P.shot(ev.c4_s2, (ctx, t) => {
    P.bgNavy(ctx, t);
    const n = Math.floor(451 * P.oc((t - ev.c4_451a) / 1.6)); const cols = 41;
    for (let i = 0; i < 451; i++) { const x = 160 + (i % cols) * 40, y = 330 + Math.floor(i / cols) * 40; P.rect(ctx, x, y, 30, 12, 6, i < n ? C.coral : '#24346E'); }
    P.counter(ctx, { x: 960, y: 210, from: 0, to: 451, t, t0: ev.c4_451a, t1: ev.c4_451 + 0.4, size: 110, sub: 'ships hit, 1984–1988', color: C.coral });
    const sa = P.fin(t, ev.c4_sailors - 0.2, 0.5); if (sa > 0) { ctx.save(); ctx.globalAlpha *= sa; P.rect(ctx, 560, 840, 800, 120, 24, C.cream, { shadow: 0.3 }); G.text(ctx, 'more than 400 sailors lost their lives', 960, 914, { size: 42, fam: 'Inter', weight: 800, color: C.navy, align: 'center', boil: 0 }); ctx.restore(); }
    P.source(ctx, 'USIP Iran Primer, "The Tanker War"', t, ev.c4_451);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — 1987: the tanker Bridgeton strikes a mine; the US starts escorting Kuwaiti tankers in convoys
  P.shot(ev.c4_s3, (ctx, t) => {
    const conv = P.fin(t, ev.c4_escort - 0.2, 0.5);
    P.sky(ctx, t, { top: '#B7D6E8', bot: '#F2E6CC', h: 560 }); P.water(ctx, t, { y0: 540, color: '#3F7BA3', color2: '#1F4F78', seed: 9 });
    ctx.save(); P.shake(ctx, t, ev.c4_mine, 6, 0.3);
    const sail = (t - ev.c4_s3) * 40;
    P.tanker(ctx, 760 - sail * (1 - conv) - conv * 300, 700, 900, t, { load: 1, smoke: P.fin(t, ev.c4_mine, 0.2), wake: 1, a: 1 - P.fin(t, ev.c4_escort + 0.2, 0.4) });
    P.mine(ctx, 1280, 730, 34, t, { a: 1 - P.fin(t, ev.c4_mine, 0.08) });
    if (t > ev.c4_mine && t < ev.c4_mine + 0.5) { const u = (t - ev.c4_mine) / 0.5; P.circ(ctx, 1210, 720, 60 + 200 * u, C.gold, { a: (1 - u) * 0.9 }); P.circ(ctx, 1210, 720, 30 + 120 * u, C.cream, { a: (1 - u) }); }
    // the convoy: a warship leads two tankers
    if (conv > 0) { ctx.save(); ctx.globalAlpha *= conv; const cx = lerp(-600, 300, P.eio((t - ev.c4_escort) / 3.5));
      P.tanker(ctx, cx + 300, 720, 600, t, { load: 1, wake: 1 }); P.tanker(ctx, cx - 450, 720, 600, t + 1, { load: 1, wake: 1 }); P.warship(ctx, cx + 900, 700, 360, t);
      P.flag(ctx, cx + 300 - 200, 560, 0.8, t, ['#B22234', C.white, '#B22234', C.white, '#3C3B6E']); ctx.restore(); }
    ctx.restore();
    yearCard(ctx, t, ev.c4_1987, '1987', 260, 170);
    P.tag(ctx, 'tanker Bridgeton', 760, 420, t, ev.c4_mine - 0.6, ev.c4_escort, { size: 40, dot: C.coral });
    P.stamp(ctx, 'MINE', 1300, 560, t, ev.c4_mine, { size: 70, color: C.red, t1: ev.c4_escort });
    P.tag(ctx, 'US Navy escorts Kuwaiti tankers', 1180, 330, t, ev.c4_escort + 0.3, 1e9, { size: 42, fill: C.navy, color: C.cream });
    P.tag(ctx, 'CONVOYS', 1180, 430, t, ev.c4_convoy, 1e9, { size: 44, fill: C.gold, color: C.navy });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — the myth crossed out: at worst, ~2 % of ships passing were hit; Iran even cut its price to cover the insurance
  P.shot(ev.c4_s4, (ctx, t) => {
    P.bgLight(ctx, t);
    const mk = P.pop(t, ev.c4_s4 + 0.2, 0.4); const out = P.fin(t, ev.c4_2pc - 0.6, 0.4);
    P.at(ctx, 960, 270 - out * 120, mk * (1 - out * 0.35), -0.02, () => { P.rect(ctx, -620, -90, 1240, 180, 26, C.cream, { shadow: 0.25 }); G.text(ctx, 'MYTH', -540, -20, { size: 34, fam: 'Inter', weight: 800, color: C.coral, boil: 0 });
      G.text(ctx, 'if the shooting starts, the oil stops', 0, 42, { size: 58, fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0 });
      const sk = P.oc((t - ev.c4_didnt) / 0.3); if (sk > 0) P.line(ctx, -560, 22, -560 + 1120 * sk, 22, C.red, 12); });
    P.stamp(ctx, "IT DIDN'T", 1400, 420 - out * 200, t, ev.c4_didnt + 0.05, { size: 72, color: C.red, rot: 0.05, t1: ev.c4_2pc - 0.4 });
    // 100 ships, 2 hit
    if (out > 0) { for (let i = 0; i < 100; i++) { const x = 210 + (i % 20) * 60, y = 420 + Math.floor(i / 20) * 70; const hitI = i === 37 || i === 82; const k = P.pop(t, ev.c4_2pc - 0.6 + i * 0.006, 0.3);
        P.at(ctx, x, y, k, 0, () => { const col = hitI && t > ev.c4_2pc ? C.red : C.steel; P.fill(ctx, P.pPoly([[-22, -10], [14, -10], [24, 0], [14, 10], [-22, 10]]), col); P.rect(ctx, -22, -8, 9, 16, 2, C.deck); }); }
      P.counter(ctx, { x: 1640, y: 560, from: 0, to: 2, t, t0: ev.c4_2pc - 0.3, t1: ev.c4_2pc + 0.2, size: 110, prefix: '≤ ', suffix: '%', sub: 'of ships passing were hit', color: C.red }); }
    P.tag(ctx, 'Iran cut its oil price ↓', 760, 900, t, ev.c4_cut, 1e9, { size: 42, fill: C.navy, color: C.cream });
    P.tag(ctx, 'to cover higher insurance', 1300, 900, t, ev.c4_ins, 1e9, { size: 42, fill: C.gold, color: C.navy });
    P.source(ctx, 'Strauss Center, "Strait of Hormuz – Tanker War", lessons learned', t, ev.c4_2pc);
  }, { in: { type: 'wipe', dir: 'left', dur: 0.5 } });

  // S5 — prices jumped at first, slid all decade, then crashed in 1986 (below $10 in July) — not because of the war
  const BR = [[1980, 36.83], [1981, 35.93], [1982, 32.97], [1983, 29.55], [1984, 28.78], [1985, 27.56], [1986, 14.43], [1987, 18.44], [1988, 14.92]];
  P.shot(ev.c4_s5, (ctx, t) => {
    P.bgNavy(ctx, t);
    const x0 = 260, x1 = 1660, y0 = 880, sc = 16; const X = (yr) => lerp(x0, x1, (yr - 1980) / 8), Y = (v) => y0 - v * sc;
    for (const v of [10, 20, 30, 40]) { P.line(ctx, x0 - 20, Y(v), x1 + 20, Y(v), 'rgba(255,255,255,0.1)', 2); G.text(ctx, '$' + v, x0 - 40, Y(v) + 10, { size: 28, fam: 'Inter', weight: 700, color: '#8C98C8', align: 'right', boil: 0 }); }
    BR.forEach(([yr], i) => G.text(ctx, "'" + String(yr).slice(2), X(yr), y0 + 50, { size: 28, fam: 'Inter', weight: 800, color: '#8C98C8', align: 'center', boil: 0 }));
    // shade the Tanker War years
    P.rect(ctx, X(1984), Y(42), X(1988) - X(1984), y0 - Y(42), 10, C.coral, { a: 0.12 * P.fin(t, ev.c4_s5, 0.4) }); G.text(ctx, 'TANKER WAR', (X(1984) + X(1988)) / 2, Y(42) + 40, { size: 30, fam: 'Inter', weight: 800, color: C.coral, align: 'center', alpha: P.fin(t, ev.c4_s5 + 0.3, 0.4), boil: 0 });
    const pts = BR.map(([yr, v]) => [X(yr), Y(v)]); const k = clamp((t - ev.c4_jump + 0.3) / (ev.c4_crash + 0.6 - ev.c4_jump + 0.3));
    P.trace(ctx, pts, k, C.gold, 9); const [hx, hy] = P.along(pts, Math.max(0.001, k)); P.circ(ctx, hx, hy, 14, C.gold);
    [1984.4, 1987.6].forEach((yr, i) => { const v = BR[Math.floor(yr - 1980)][1]; const sk = P.win(t, ev.c4_jump + i * 0.25, ev.c4_slide + 0.4, 0.2); if (sk <= 0) return;
      P.stroke(ctx, P.pPoly([[X(yr) - 30, Y(v)], [X(yr) - 10, Y(v) - 90 * sk], [X(yr) + 5, Y(v) - 20], [X(yr) + 18, Y(v) - 60 * sk], [X(yr) + 34, Y(v)]], false), C.coral, 6, sk); });
    P.tag(ctx, 'short spikes', X(1984.4), Y(28.8) - 140, t, ev.c4_jump, ev.c4_slide + 0.4, { size: 34, fill: C.coral, color: C.cream });
    const lo = P.fin(t, ev.c4_10, 0.3); if (lo > 0) { P.line(ctx, X(1986.55), Y(9), X(1986.55), Y(14.4), C.red, 5, lo, 1, [8, 6]); P.circ(ctx, X(1986.55), Y(9), 12, C.red, { a: lo }); }
    P.tag(ctx, 'below $10 (July 1986)', X(1986.6) + 40, Y(6), t, ev.c4_10, 1e9, { size: 36, fill: C.red, color: C.cream, align: 'left' });
    P.stamp(ctx, 'CRASH', X(1986), Y(28), t, ev.c4_crash, { size: 64, color: C.coral, rot: -0.05 });
    P.tag(ctx, 'cause: a global oil glut + price war, not the attacks', 960, 1010, t, ev.c4_crash + 0.6, 1e9, { size: 34, fill: C.cream, color: C.navy });
    P.label(ctx, 'Brent, $/barrel, yearly average (nominal)', x0, 140, { size: 30, color: C.cream });
    P.source(ctx, 'Energy Institute Statistical Review; Wikipedia, 1980s oil glut', t, ev.c4_jump);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — attacks alone didn't close the door. What would it take?
  P.shot(ev.c4_s6, (ctx, t) => {
    P.bgNavy(ctx, t);
    P.write(ctx, 'attacks alone didn’t close the door.', 960, 300, t, ev.c4_s6 + 0.2, { size: 74, color: C.cream });
    P.write(ctx, 'What would it take?', 960, 440, t, ev.c4_take - 0.2, { size: 96, color: C.gold });
    P.door(ctx, 760, 980, 260, 420, 0.75, { color: C.coral });
    Ch.gull(ctx, { x: 1260, y: 990, s: 1.0, t, dir: -1, gesture: 'think', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });
})();
