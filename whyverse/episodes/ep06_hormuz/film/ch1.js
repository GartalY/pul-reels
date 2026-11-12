// Chapter 1 — A door in the map: the Gulf is almost a lake · one way out past Musandam · the strait: 167 km long, 33–39 km wide ·
// two 3-km lanes + buffer · a seven-storey draught · "that's it".
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  const ARAB = ['Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Kuwait', 'Oman', 'Bahrain', 'Iraq'];
  // the shipping route through the strait (simplified centre line, lon/lat)
  P.LANE = [[54.6, 26.15], [55.3, 26.34], [55.9, 26.56], [56.3, 26.72], [56.62, 26.66], [56.9, 26.33], [57.15, 25.84], [57.5, 25.38]];
  P.lanes = (ctx, m, t, z, { a = 1, k = 1, ships = 1, t0 = 0, gap = 20 } = {}) => {
    if (a <= 0.01) return; const c = P.LANE.map(([lo, la]) => m.ll(lo, la));
    const off = (d) => c.map((p, i) => { const q = c[Math.min(c.length - 1, i + 1)], r = c[Math.max(0, i - 1)]; const dx = q[0] - r[0], dy = q[1] - r[1], l = Math.hypot(dx, dy) || 1; return [p[0] - dy / l * d / z, p[1] + dx / l * d / z]; });
    const inL = off(-gap), outL = off(gap);
    ctx.save(); ctx.globalAlpha *= a;
    P.trace(ctx, inL, k, P.rgba(C.teal, 0.9), 16 / z); P.trace(ctx, outL, k, P.rgba(C.coral, 0.9), 16 / z);
    P.trace(ctx, c, k, 'rgba(255,255,255,0.7)', 3 / z, 1, [8 / z, 8 / z]);
    if (ships > 0) for (let i = 0; i < 5; i++) { const u1 = ((t - t0) * 0.045 + i / 5) % 1, u2 = 1 - (((t - t0) * 0.045 + i / 5 + 0.1) % 1);
      if (u1 < k) { const [x, y, ang] = P.along(inL.slice().reverse(), u1); P.tankerTop(ctx, x, y, ang, 30, { z, a: ships }); }
      if (1 - u2 < k) { const [x, y, ang] = P.along(outL, 1 - u2); P.tankerTop(ctx, x, y, ang, 30, { z, a: ships, color: C.navy3 }); } }
    ctx.restore(); return { inL, outL, c };
  };

  P.cardShot('c1', 1, 'A door in the map', (ctx, t) => { for (let i = 0; i < 6; i++) P.tankerTop(ctx, ((t * 40 + i * 340) % 2200) - 140, 160 + i * 150, 0, 70, { a: 0.12, color: C.cream }); });

  // S1 — the Gulf: almost a lake. Iran on one side, the Arabian Peninsula on the other.
  P.shot(ev.c1_s1, (ctx, t, s) => {
    const m = P.gulf(); ctx.save(); const cam = P.cam(ctx, t, ev.c1_s1, ev.c1_s1 + 9, { x: 960, y: 560, z: 1.0 }, { x: 900, y: 540, z: 1.06 }, (x) => x);
    const fill = P.fin(t, ev.c1_lake - 0.3, 0.6);
    P.drawMap(ctx, m, { sea: P.mix('#8C97B8', C.sea, fill), z: cam.z });
    P.highlight(ctx, m, 'Iran', P.lt(C.coral, 0.35), P.fin(t, ev.c1_iran, 0.3), cam.z);
    const ka = P.fin(t, ev.c1_arab, 0.3); for (const n of ARAB) P.highlight(ctx, m, n, C.gold, ka, cam.z);
    ctx.restore();
    P.stamp(ctx, 'ALMOST A LAKE', 780, 640, t, ev.c1_lake, { size: 70, color: C.sea2, rot: -0.05 });
    P.tag(ctx, 'IRAN', 900, 250, t, ev.c1_iran, 1e9, { size: 48, fill: C.coral, color: C.cream });
    P.tag(ctx, 'ARABIAN PENINSULA', 560, 930, t, ev.c1_arab, 1e9, { size: 44, fill: C.gold, color: C.navy });
    P.kicker(ctx, 'The Persian Gulf', t, ev.c1_s1 + 0.2);
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — one way out: the flow arrow squeezes past Musandam
  P.shot(ev.c1_s2, (ctx, t) => {
    const m = P.gulf(); const nar = P.narrows(); const A = m.ll(...nar.a), B = m.ll(...nar.b); const mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    ctx.save(); const cam = P.cam(ctx, t, ev.c1_s2, ev.c1_musandam + 0.3, { x: 900, y: 540, z: 1.06 }, { x: mid[0] - 60, y: mid[1] + 40, z: 1.9 });
    P.drawMap(ctx, m, { sea: C.sea, z: cam.z });
    const om = P.fin(t, ev.c1_musandam, 0.3); P.highlight(ctx, m, 'Oman', P.mix(C.sand, C.gold, 0.5 + 0.3 * Math.sin(t * 5)), om, cam.z);
    const flow = [m.ll(50.6, 27.6), m.ll(53.0, 26.7), m.ll(55.3, 26.3), m.ll(56.3, 26.58), m.ll(56.85, 26.2), m.ll(57.6, 25.2), m.ll(58.8, 24.4)];
    const k = P.eio((t - ev.c1_one) / 1.6); P.trace(ctx, flow, k, P.rgba(C.gold, 0.9), 22 / cam.z);
    if (k > 0.02) { const [x, y, ang] = P.along(flow, k); P.fill(ctx, P.pPoly([[x + Math.cos(ang) * 30 / cam.z, y + Math.sin(ang) * 30 / cam.z], [x + Math.cos(ang + 2.4) * 30 / cam.z, y + Math.sin(ang + 2.4) * 30 / cam.z], [x + Math.cos(ang - 2.4) * 30 / cam.z, y + Math.sin(ang - 2.4) * 30 / cam.z]]), C.gold); }
    const mu = m.ll(56.25, 26.15); P.pin(ctx, mu[0], mu[1], t, ev.c1_musandam, { label: 'Musandam (Oman)', z: cam.z, color: C.coral, side: 'left' });
    const ta = P.oc((t - ev.c1_toward) / 0.6); if (ta > 0) P.arrow(ctx, mu[0], mu[1] - 40 / cam.z, mu[0] + 20 / cam.z, lerp(mu[1] - 40 / cam.z, B[1] + 30 / cam.z, ta), { color: C.white, lw: 6 / cam.z, head: 18 / cam.z });
    const oc = m.ll(58.6, 24.9); P.mapLabel(ctx, 'TO THE OCEAN →', oc[0], oc[1], { z: cam.z, size: 30, color: C.cream, a: P.fin(t, ev.c1_ocean, 0.4) });
    ctx.restore();
    P.tag(ctx, 'ONLY ONE WAY OUT', 960, 130, t, ev.c1_one, 1e9, { size: 52, fill: C.navy, color: C.gold });
  }, { in: { type: 'fade', dur: 0.3 } });

  // S3 — the Strait of Hormuz: ~167 km long, 33–39 km across at its narrowest
  P.shot(ev.c1_s3, (ctx, t) => {
    const m = P.gulf(); const nar = P.narrows(); const A = m.ll(...nar.a), B = m.ll(...nar.b); const mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    ctx.save(); const cam = P.cam(ctx, t, ev.c1_s3, ev.c1_s3 + 1.2, { x: mid[0] - 60, y: mid[1] + 40, z: 1.9 }, { x: mid[0] - 20, y: mid[1] + 30, z: 2.7 });
    P.drawMap(ctx, m, { sea: C.sea, z: cam.z, colors: { Oman: C.sand } });
    // length bracket along the strait
    const l0 = m.ll(55.75, 26.98), l1 = m.ll(57.05, 26.15); const lk = P.oc((t - ev.c1_167 + 0.5) / 0.7);
    if (lk > 0) { P.line(ctx, l0[0], l0[1] - 70 / cam.z, lerp(l0[0], l1[0], lk), lerp(l0[1], l1[1], lk) - 70 / cam.z, C.cream, 5 / cam.z, 0.9, 1, [10 / cam.z, 8 / cam.z]); P.circ(ctx, l0[0], l0[1] - 70 / cam.z, 8 / cam.z, C.cream); if (lk >= 1) P.circ(ctx, l1[0], l1[1] - 70 / cam.z, 8 / cam.z, C.cream); }
    const wk = P.oc((t - ev.c1_narrow) / 0.6); if (wk > 0) { P.line(ctx, A[0], A[1], lerp(A[0], B[0], wk), lerp(A[1], B[1], wk), C.gold, 7 / cam.z, 1, 1, [14 / cam.z, 9 / cam.z]); P.circ(ctx, A[0], A[1], 9 / cam.z, C.gold); }
    P.mapLabel(ctx, 'IRAN', ...m.ll(56.9, 27.45), { z: cam.z, size: 40, color: C.dim }); P.mapLabel(ctx, 'OMAN', ...m.ll(56.2, 25.9), { z: cam.z, size: 34, color: C.dim });
    P.mapLabel(ctx, 'Persian Gulf', ...m.ll(55.4, 26.0), { z: cam.z, size: 30, color: C.cream, a: 0.9 }); P.mapLabel(ctx, 'Gulf of Oman', ...m.ll(57.6, 25.5), { z: cam.z, size: 30, color: C.cream, a: 0.9 });
    ctx.restore();
    P.stamp(ctx, 'STRAIT OF HORMUZ', 960, 140, t, ev.c1_name, { size: 76, color: C.navy, fg: C.gold, rot: -0.02 });
    P.counter(ctx, { x: 360, y: 860, from: 0, to: 167, t, t0: ev.c1_167 - 0.5, t1: ev.c1_167 + 0.2, size: 84, suffix: ' km', sub: 'long', color: C.navy });
    P.counter(ctx, { x: 1530, y: 860, from: 0, to: 39, t, t0: ev.c1_narrow, t1: ev.c1_3339, size: 84, fmt: (v) => (v < 33 ? Math.round(v) : '33–' + Math.round(v)), suffix: ' km', sub: 'across, at the narrowest', color: C.coral });
  }, { in: { type: 'fade', dur: 0.3 } });

  // S4 — two marked lanes, ~3 km each: one in, one out, a buffer between (schematic, widened to be visible)
  P.shot(ev.c1_s4, (ctx, t) => {
    const m = P.gulf(); const c = m.ll(56.45, 26.45);
    ctx.save(); const cam = P.cam(ctx, t, ev.c1_s4, ev.c1_s4 + 10, { x: c[0], y: c[1], z: 3.0 }, { x: c[0] + 10, y: c[1] + 4, z: 3.12 }, (x) => x);
    P.drawMap(ctx, m, { sea: C.sea, z: cam.z, colors: { Oman: C.sand } });
    const ln = P.lanes(ctx, m, t, cam.z, { k: P.eio((t - ev.c1_lanes) / 1.2), t0: ev.c1_lanes, ships: P.fin(t, ev.c1_lanes + 0.6, 0.4) });
    const hi = (pts, tt, col) => { const a = P.win(t, tt, tt + 1.6, 0.25); if (a > 0) P.trace(ctx, pts, 1, P.rgba(C.white, 0.6 * a), 30 / cam.z); };
    hi(ln.inL, ev.c1_in, C.teal); hi(ln.outL, ev.c1_out, C.coral);
    ctx.restore();
    P.tag(ctx, 'LANE IN', 560, 200, t, ev.c1_in, 1e9, { size: 42, fill: C.teal, color: C.navy, dot: C.white });
    P.tag(ctx, 'LANE OUT', 1360, 880, t, ev.c1_out, 1e9, { size: 42, fill: C.coral, color: C.cream, dot: C.white });
    P.tag(ctx, 'BUFFER', 1500, 300, t, ev.c1_buffer, 1e9, { size: 38, fill: C.cream, color: C.ink });
    P.counter(ctx, { x: 360, y: 860, from: 0, to: 3, t, t0: ev.c1_3km - 0.4, t1: ev.c1_3km + 0.1, size: 90, prefix: '≈ ', suffix: ' km', sub: 'each lane', color: C.teal });
    P.label(ctx, 'lanes drawn wider than real, to be visible', W - 70, H - 40, { size: 24, align: 'right', color: C.cream });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — a loaded supertanker draws as much water as a seven-storey building is tall
  P.shot(ev.c1_s5, (ctx, t, s) => {
    P.sky(ctx, t, { top: '#9ED6F4', bot: '#E7F5FC', h: 380 });
    const wy = 380; ctx.save(); const g = ctx.createLinearGradient(0, wy, 0, H); g.addColorStop(0, '#3C8FC4'); g.addColorStop(1, '#0F3F6B'); ctx.fillStyle = g; ctx.fillRect(0, wy, W, H); ctx.restore(); P.dark = true;
    // seabed: shallow sides, deep channel in the middle
    P.poly(ctx, [[-50, H + 50], [-50, 720], [380, 740], [620, 960], [1320, 960], [1560, 740], [W + 50, 700], [W + 50, H + 50]], '#C9A86A');
    P.poly(ctx, [[-50, H + 50], [-50, 800], [380, 820], [620, 1010], [1320, 1010], [1560, 820], [W + 50, 790], [W + 50, H + 50]], '#B08E55');
    // the tanker: hull seen end-on would be confusing — show a side view sitting deep
    const sink = P.oc((t - ev.c1_deep + 0.3) / 0.8);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, wy); ctx.clip(); P.tanker(ctx, 960, wy + 2, 1300, t, { load: 1, rock: 0.4 }); ctx.restore();
    ctx.save(); ctx.globalAlpha *= 0.85; P.rect(ctx, 960 - 640, wy, 1240, 70 + 180 * sink, 10, C.hull); ctx.restore();
    P.line(ctx, 0, wy, W, wy, C.white, 4, 0.8);
    const dH = 70 + 180 * sink;
    if (sink > 0) { P.arrow(ctx, 1660, wy + 4, 1660, wy + dH, { color: C.gold, lw: 6, head: 22 }); P.arrow(ctx, 1660, wy + dH, 1660, wy + 4, { color: C.gold, lw: 6, head: 22, a: P.fin(t, ev.c1_deep + 0.6, 0.2) }); }
    P.tag(ctx, '20–25 m under water', 1660, wy + dH + 60, t, ev.c1_deep + 0.4, 1e9, { size: 38, fill: C.gold, color: C.navy });
    // ghost building: 7 storeys, the same height as the draught
    const bk = P.fin(t, ev.c1_seven - 0.3, 0.9); P.building(ctx, 160, wy + dH, 7, dH / 7, 150, { color: C.cream, a: 0.85, k: bk });
    P.tag(ctx, '7 storeys', 160, wy + dH + 60, t, ev.c1_seven, 1e9, { size: 38 });
    const ck = P.fin(t, ev.c1_channel, 0.4); if (ck > 0) { P.tag(ctx, 'DEEP CHANNEL', 970, 1040, t, ev.c1_channel, 1e9, { size: 40, fill: C.teal, color: C.navy }); P.line(ctx, 640, 990, 1300, 990, C.teal, 6, ck, 1, [16, 10]); }
    Ch.gull(ctx, { x: 1300, y: wy - 150 + Math.sin(t * 1.3) * 3, s: 0.5, t, dir: -1, gesture: t > ev.c1_seven ? 'point' : 'idle', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'wipe', dir: 'up', dur: 0.5 } });

  // S6 — that's it: two lanes, three kilometres each — the world's busiest oil doorway
  P.shot(ev.c1_s6, (ctx, t) => {
    const m = P.gulf(); const c = m.ll(56.45, 26.45);
    ctx.save(); const cam = P.cam(ctx, t, ev.c1_s6, ev.c1_s6 + 7, { x: c[0], y: c[1], z: 3.3 }, { x: c[0], y: c[1], z: 2.9 }, (x) => x);
    P.drawMap(ctx, m, { sea: C.sea, z: cam.z, colors: { Oman: C.sand } }); P.lanes(ctx, m, t, cam.z, { t0: ev.c1_s4 });
    ctx.restore();
    P.stamp(ctx, '2 LANES × 3 KM', 960, 170, t, ev.c1_2x3, { size: 84, color: C.coral, rot: -0.03 });
    P.tag(ctx, 'the world’s busiest oil doorway', 960, 940, t, ev.c1_busiest, 1e9, { size: 46, fill: C.navy, color: C.gold });
    const f = P.oc((t - ev.c1_s6) / 1.2); Ch.gull(ctx, { x: lerp(2100, 1640, f), y: lerp(500, 760, f), s: 0.8, t, dir: -1, fly: 1 - P.fin(t, ev.c1_s6 + 1.1, 0.3), gesture: t > ev.c1_busiest ? 'cheer' : 'point', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S7 — the question: why does so much oil need to pass here?
  P.shot(ev.c1_s7, (ctx, t) => {
    P.bgNavy(ctx, t);
    for (let i = 0; i < 9; i++) { const k = P.pop(t, ev.c1_s7 + 0.3 + i * 0.12, 0.4); const x = 300 + i * 165, y = 700 + Math.sin(t * 2 + i) * 14; P.drop(ctx, x, y, 34 * k, { color: i % 3 === 1 ? C.gold : C.oil2 }); }
    P.write(ctx, 'why does so much oil', 960, 330, t, ev.c1_why - 0.2, { size: 88, color: C.cream });
    P.write(ctx, 'need to pass HERE?', 960, 450, t, ev.c1_why + 0.4, { size: 88, color: C.cream, hl: ['HERE'] });
    Ch.gull(ctx, { x: 1700, y: 1000, s: 0.9, t, dir: -1, gesture: 'think', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });
})();
