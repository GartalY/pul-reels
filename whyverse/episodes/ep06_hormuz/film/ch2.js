// Chapter 2 — A fifth of the world: the producers behind the door · 20 million barrels a day · 230 a second, a pool a minute ·
// a fifth of oil use, a quarter of seaborne oil, a fifth of LNG · mostly to Asia · a back door?
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  P.door = (ctx, x, y, w, h, open, { color = C.coral, frame = C.navy, a = 1 } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
    P.rect(ctx, x - w / 2 - 22, y - h - 22, w + 44, h + 22, 14, frame, { shadow: 0.25 }); P.rect(ctx, x - w / 2, y - h, w, h, 8, '#0B1230');
    const ow = w * (1 - 0.82 * clamp(open)); P.rect(ctx, x - w / 2, y - h, ow, h, 8, color); P.circ(ctx, x - w / 2 + ow - 22, y - h / 2, 10, C.gold); ctx.restore(); };

  P.cardShot('c2', 2, 'A fifth of the world', (ctx, t) => { for (let i = 0; i < 7; i++) P.barrel(ctx, ((t * 60 + i * 300) % 2200) - 120, 980, 0.6, { a: 0.14, color: C.cream, band: C.cream }); });

  // S1 — who sits behind the door
  const PROD = [['Saudi Arabia', 'SAUDI ARABIA', 47.9, 25.0], ['Iraq', 'IRAQ', 47.3, 30.6], ['United Arab Emirates', 'UAE', 54.4, 23.75], ['Kuwait', 'KUWAIT', 49.4, 29.45], ['Iran', 'IRAN', 53.6, 28.9]];
  P.shot(ev.c2_s1, (ctx, t) => {
    const m = P.gulf(); ctx.save(); const cam = P.cam(ctx, t, ev.c2_s1, ev.c2_s1 + 11, { x: 940, y: 560, z: 1.02 }, { x: 900, y: 540, z: 1.08 }, (x) => x);
    P.drawMap(ctx, m, { sea: C.sea, z: cam.z });
    PROD.forEach(([n], i) => P.highlight(ctx, m, n, P.lt(i % 2 ? C.coral : C.gold, 0.15), P.fin(t, ev.c2_prod[i], 0.25), cam.z));
    P.highlight(ctx, m, 'Qatar', C.gas, P.fin(t, ev.c2_qatar, 0.25), cam.z);
    PROD.forEach(([n, lab, lo, la], i) => { const p = m.ll(lo, la); const k = P.pop(t, ev.c2_prod[i], 0.4); if (k <= 0) return; ctx.save(); ctx.translate(p[0], p[1]); ctx.scale(1 / cam.z, 1 / cam.z);
      P.at(ctx, 0, -50, k, 0, () => P.drop(ctx, 0, 0, 26, { color: C.oil })); ctx.restore(); P.mapLabel(ctx, lab, p[0], p[1] + 40 / cam.z, { z: cam.z, size: 32, a: clamp(k) }); });
    const q = m.ll(51.2, 25.3); const kq = P.pop(t, ev.c2_qatar, 0.4); if (kq > 0) { ctx.save(); ctx.translate(q[0], q[1]); ctx.scale(1 / cam.z, 1 / cam.z); P.at(ctx, 60, -40, kq, 0, () => { P.fill(ctx, P.pCurve([[-22, 30], [-18, -10], [0, -40 - 6 * Math.sin(t * 9)], [18, -10], [22, 30]], true), C.gas); P.fill(ctx, P.pCurve([[-10, 30], [-8, 0], [0, -16], [8, 0], [10, 30]], true), C.white); }); ctx.restore(); }
    ctx.restore();
    P.tag(ctx, 'QATAR: natural gas', 1240, 900, t, ev.c2_qatar + 0.1, 1e9, { size: 42, fill: C.gas, color: C.navy });
    P.kicker(ctx, 'Behind the door', t, ev.c2_s1 + 0.3);
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — 2025: about 20 million barrels of oil and fuel, every single day
  P.shot(ev.c2_s2, (ctx, t) => {
    P.bgLight(ctx, t);
    // conveyor through the gate
    P.rect(ctx, -40, 820, W + 80, 26, 13, C.steel); for (let i = 0; i < 30; i++) P.circ(ctx, ((i * 70 + t * 120) % (W + 140)) - 70, 833, 9, C.grey2);
    for (let i = 0; i < 12; i++) { const x = ((i * 190 + (t - ev.c2_s2) * 240) % (W + 380)) - 190; P.barrel(ctx, x, 818, 0.95, { color: i % 5 === 2 ? C.coral : C.oil }); }
    P.rect(ctx, 1380, 380, 120, 470, 16, C.navy, { shadow: 0.2 }); P.rect(ctx, 1380, 380, 120, 60, 16, C.gold); G.text(ctx, 'HORMUZ', 1440, 422, { size: 26, fam: 'Inter', weight: 800, color: C.navy, align: 'center', boil: 0 });
    const ky = P.pop(t, ev.c2_2025, 0.4); P.at(ctx, 260, 170, ky, -0.04, () => { P.rect(ctx, -120, -60, 240, 120, 18, C.coral, { shadow: 0.25 }); G.text(ctx, '2025', 0, 30, { size: 64, fam: 'Bungee', color: C.cream, align: 'center', boil: 0 }); });
    P.counter(ctx, { x: 820, y: 420, from: 0, to: 20000000, t, t0: ev.c2_20ma, t1: ev.c2_20m + 0.3, size: 130, sub: 'barrels of oil + fuel', color: C.navy });
    P.stamp(ctx, 'EVERY DAY', 820, 640, t, ev.c2_day, { size: 70, color: C.coral, rot: -0.03 });
    P.source(ctx, 'IEA, Strait of Hormuz factsheet (Feb 2026); EIA', t, ev.c2_20m);
    // ≈ 10 supertankers a day (2 million barrels each)
    const tk = P.fin(t, ev.c2_ten[0] - 0.4, 0.3); if (tk > 0) { ctx.save(); ctx.globalAlpha *= tk; P.rect(ctx, 80, 160, 1760, 560, 30, C.navy, { shadow: 0.3 }); ctx.restore(); P.dark = true;
      ev.c2_ten.forEach((tt, i) => { const k = P.pop(t, tt, 0.35); if (k <= 0) return; const sail = P.eio((t - ev.c2_leave) / 2.5) * (1 + i * 0.06); P.at(ctx, 250 + (i % 5) * 350 + sail * 900, 380 + Math.floor(i / 5) * 200, k, 0, () => P.tanker(ctx, 0, 0, 300, t + i, { load: 1, rock: 0.5, wake: sail > 0 ? 1 : 0 })); });
      G.text(ctx, '≈ 10 SUPERTANKERS A DAY', 960, 660, { size: 54, fam: 'Inter', weight: 800, color: C.gold, align: 'center', alpha: P.fin(t, ev.c2_ten[9], 0.3), boil: 0 }); P.dark = false; }
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — ~230 barrels every second; an Olympic pool roughly every minute
  P.shot(ev.c2_s3, (ctx, t) => {
    P.bgLight(ctx, t);
    // left: the per-second ticker — a clock hand sweeps, barrels pile into a 15x15 grid
    const cx = 470, cy = 520; P.circ(ctx, cx, cy, 190, C.white, { shadow: 0.15 }); P.circ(ctx, cx, cy, 190, C.navy, { a: 0.06 });
    const sec = ((t - ev.c2_s3) % 1); const ang = -Math.PI / 2 + sec * Math.PI * 2;
    P.fill(ctx, (c) => { c.beginPath(); c.moveTo(cx, cy); c.arc(cx, cy, 180, -Math.PI / 2, ang); c.closePath(); }, C.gold, { a: 0.35 });
    P.line(ctx, cx, cy, cx + Math.cos(ang) * 170, cy + Math.sin(ang) * 170, C.coral, 8);
    P.circ(ctx, cx, cy, 14, C.navy);
    const n = Math.floor(230 * P.oc((t - ev.c2_230a) / 1.3)); for (let i = 0; i < n; i++) { const gx = cx - 180 + (i % 23) * 16, gy = cy + 260 + Math.floor(i / 23) * 16; P.rect(ctx, gx, gy, 12, 12, 3, i % 7 === 0 ? C.coral : C.oil); }
    P.counter(ctx, { x: cx, y: 190, from: 0, to: 230, t, t0: ev.c2_230a, t1: ev.c2_230 + 0.2, size: 110, prefix: '≈ ', sub: 'barrels every second', color: C.coral });
    // right: an Olympic pool filling with oil
    const pk = P.fin(t, ev.c2_pool - 0.4, 0.3); const fill = clamp((t - ev.c2_pool) / 4.5);
    P.pool(ctx, 1000, 420, 760, 330, fill, { a: pk });
    G.text(ctx, 'OLYMPIC POOL', 1380, 390, { size: 36, fam: 'Inter', weight: 800, color: C.sea, align: 'center', alpha: pk, boil: 0 });
    P.stamp(ctx, '≈ 1 EVERY MINUTE', 1380, 870, t, ev.c2_minute, { size: 62, color: C.navy, fg: C.gold });
    P.label(ctx, '20 million barrels a day ÷ 86,400 seconds', 1380, 990, { size: 28, align: 'center', alpha: P.fin(t, ev.c2_minute + 0.5, 0.4) });
  }, { in: { type: 'wipe', dir: 'left', dur: 0.5 } });

  // S4 — a fifth of world oil use · a quarter of seaborne oil · a fifth of LNG
  P.shot(ev.c2_s4, (ctx, t) => {
    P.bgNavy(ctx, t);
    const ring = (x, tt, frac, col, big, line1, line2) => { const k = P.pop(t, tt - 0.2, 0.45); if (k <= 0) return; const sw = P.oc((t - tt) / 0.9);
      P.at(ctx, x, 470, k, 0, () => { P.circ(ctx, 0, 0, 200, '#24346E'); ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = col; ctx.lineWidth = 46; ctx.beginPath(); ctx.arc(0, 0, 170, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * frac * sw); ctx.stroke(); ctx.restore();
        G.text(ctx, big, 0, 34, { size: 104, fam: 'Bungee', color: C.cream, align: 'center', boil: 0 }); });
      G.text(ctx, line1, x, 760, { size: 40, fam: 'Inter', weight: 800, color: col, align: 'center', alpha: clamp(k), boil: 0 }); G.text(ctx, line2, x, 812, { size: 34, fam: 'Inter', weight: 700, color: '#AEB9E6', align: 'center', alpha: clamp(k), boil: 0 }); };
    ring(390, ev.c2_fifth, 0.2, C.coral, '1/5', 'of all oil', 'the world uses');
    ring(960, ev.c2_quarter, 0.25, C.teal, '1/4', 'of all oil', 'traded by sea');
    ring(1530, ev.c2_lng, 0.19, C.gas, '1/5', 'of the world’s', 'liquefied natural gas');
    P.lngShip(ctx, 1530, 985, 380, t, { a: P.fin(t, ev.c2_lng, 0.4) });
    P.source(ctx, 'EIA (2024–25 flows), IEA factsheet 2026', t, ev.c2_fifth);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — most of it heads east: >80 % of the crude goes to Asia
  P.ASIA = [33, -8, 146, 46];
  P.shot(ev.c2_s5, (ctx, t) => {
    const m = P.mkMap('asia', P.ASIA); const hz = m.ll(56.4, 26.5);
    ctx.save(); const cam = P.cam(ctx, t, ev.c2_s5, ev.c2_s5 + 2.0, { x: hz[0] + 40, y: hz[1], z: 2.2 }, { x: 960, y: 560, z: 1.0 });
    P.drawMap(ctx, m, { sea: C.sea, z: cam.z });
    const DEST = [['China', 'CHINA', 121.8, 30.6], ['India', 'INDIA', 72.8, 19.0], ['Japan', 'JAPAN', 139.9, 35.4], ['South Korea', 'SOUTH KOREA', 129.4, 35.4]];
    DEST.forEach(([n], i) => P.highlight(ctx, m, n, P.lt(C.gold, 0.1), P.fin(t, ev.c2_dest[i], 0.3), cam.z));
    const via = { China: [[60, 22], [75, 8], [96, 6.5], [104, 2], [110, 10], [121.8, 30.6]], India: [[60, 23], [66, 21], [72.8, 19.0]], Japan: [[60, 22], [75, 8], [96, 6.5], [104, 2], [114, 12], [126, 26], [139.9, 35.4]], 'South Korea': [[60, 22], [75, 8], [96, 6.5], [104, 2], [114, 12], [124, 28], [129.4, 35.4]] };
    DEST.forEach(([n, lab, lo, la], i) => { const pts = [[56.4, 26.5], ...via[n]].map(([a, b]) => m.ll(a, b)); const k = P.eio((t - ev.c2_east - i * 0.15) / 2.2);
      P.trace(ctx, pts, k, P.rgba(C.gold, 0.85), 6 / cam.z, 1, [14 / cam.z, 9 / cam.z]); if (k > 0.02 && k < 0.999) { const [x, y, a] = P.along(pts, k); P.tankerTop(ctx, x, y, a, 34, { z: cam.z }); }
      const p = m.ll(lo, la); P.pin(ctx, p[0], p[1], t, ev.c2_dest[i], { label: lab, z: cam.z, color: C.coral, side: i === 1 ? 'left' : 'right', size: 26 }); });
    P.pin(ctx, hz[0], hz[1], t, ev.c2_s5 + 0.2, { label: 'HORMUZ', z: cam.z, color: C.gold, side: 'left', size: 26 });
    ctx.restore();
    P.counter(ctx, { x: 330, y: 880, from: 0, to: 84, t, t0: ev.c2_80 - 0.6, t1: ev.c2_80 + 0.2, size: 100, suffix: '%', sub: 'of the crude → Asia (2024)', color: C.coral });
    P.source(ctx, 'EIA, Today in Energy, 16 Jun 2025', t, ev.c2_80);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — one doorway feeds the world's engines… surely there's a back door?
  P.shot(ev.c2_s6, (ctx, t) => {
    P.bgNavy(ctx, t);
    P.door(ctx, 760, 900, 360, 560, 0.85, { color: C.coral });
    G.text(ctx, 'HORMUZ', 760, 300, { size: 46, fam: 'Inter', weight: 800, color: C.gold, align: 'center', boil: 0 });
    for (let i = 0; i < 8; i++) { const u = ((t - ev.c2_s6) * 0.5 + i / 8) % 1; P.barrel(ctx, 600 + 60 * Math.sin(i), lerp(860, 860, u), 0.55, { a: 0 }); const x = lerp(700, -100, u); P.barrel(ctx, x, 900, 0.7, { color: i % 4 === 1 ? C.coral : C.oil, a: u < 0.05 ? u / 0.05 : 1 }); }
    // the small side door, the gull knocks
    const kd = P.pop(t, ev.c2_back - 0.6, 0.4); if (kd > 0) P.at(ctx, 1420, 900, kd, 0, () => { P.door(ctx, 0, 0, 160, 260, 0, { color: C.teal }); G.text(ctx, 'BACK DOOR?', 0, -300, { size: 40, fam: 'Inter', weight: 800, color: C.teal, align: 'center', boil: 0 }); });
    const kn = ev.c2_back; const knock = (t > kn && t < kn + 0.5) ? Math.abs(Math.sin((t - kn) * 20)) : 0;
    Ch.gull(ctx, { x: 1650, y: 900, s: 0.85, t, dir: -1, gesture: knock > 0 ? 'point' : 'think', rot: -0.05 * knock, mouth: P.talk(t), look: -1 });
    P.write(ctx, 'one doorway feeds the world’s engines', 960, 150, t, ev.c2_s6 + 0.2, { size: 60, color: C.cream });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });
})();
