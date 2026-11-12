// Chapter 3 — The back doors: Saudi East-West pipeline to the Red Sea · UAE to Fujairah, Iran to Jask · spare room 3.5–5.5 vs 20 ·
// at best 1 barrel in 4 · gas has no back door · has anyone tried to close it before?
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  P.ARABIA = [33.5, 13.5, 61.5, 32.5];
  const SAU = [[49.67, 25.94], [47.5, 25.3], [45.0, 24.9], [42.5, 24.4], [40.0, 24.2], [38.06, 24.09]];
  const UAE = [[53.73, 23.83], [54.6, 24.3], [55.6, 24.8], [56.33, 25.12]];
  const IRN = [[50.52, 29.58], [52.0, 28.8], [54.0, 27.9], [56.0, 27.45], [56.9, 27.0], [57.4, 26.4], [57.77, 25.7]];
  // a pipeline with oil pulses flowing along it
  const pipe = (ctx, pts, k, t, z, { color = C.gold, lw = 14, flow = 1, dash = null } = {}) => {
    P.trace(ctx, pts, k, P.dk(color, 0.35), (lw + 6) / z, 1, dash); P.trace(ctx, pts, k, color, lw / z, 1, dash);
    if (flow > 0 && k > 0.05) for (let i = 0; i < 6; i++) { const u = ((t * 0.18 + i / 6) % 1) * k; const [x, y] = P.along(pts, u); P.circ(ctx, x, y, (lw * 0.45) / z, C.oil, { a: flow }); }
  };
  P.cardShot('c3', 3, 'The back doors', (ctx, t) => { for (let i = 0; i < 5; i++) P.line(ctx, -100, 200 + i * 170, W + 100, 200 + i * 170 + Math.sin(i) * 40, 'rgba(242,184,75,0.08)', 22); });

  // S1 — Saudi Arabia's pipeline across the desert to the Red Sea (~1,200 km)
  P.shot(ev.c3_s1, (ctx, t) => {
    const m = P.mkMap('arabia', P.ARABIA); const a0 = m.ll(...SAU[0]), y0 = m.ll(...SAU[SAU.length - 1]);
    ctx.save(); const cam = P.cam(ctx, t, ev.c3_s1, ev.c3_s1 + 1.6, { x: a0[0] + 120, y: a0[1] - 40, z: 1.8 }, { x: 980, y: 560, z: 1.0 });
    P.drawMap(ctx, m, { sea: C.sea, z: cam.z });
    P.highlight(ctx, m, 'Saudi Arabia', P.lt(C.gold, 0.25), P.fin(t, ev.c3_tried, 0.4), cam.z);
    const rs = P.fin(t, ev.c3_red, 0.4); const rp = m.ll(37.5, 21.5); P.mapLabel(ctx, 'RED SEA', rp[0], rp[1], { z: cam.z, size: 34, color: C.cream, a: rs });
    pipe(ctx, SAU.map(([a, b]) => m.ll(a, b)), P.eio((t - ev.c3_pipe) / 1.8), t, cam.z);
    P.pin(ctx, a0[0], a0[1], t, ev.c3_pipe - 0.2, { label: 'Gulf oil fields', z: cam.z, color: C.navy, side: 'right', size: 26 });
    P.pin(ctx, y0[0], y0[1], t, ev.c3_red, { label: 'Yanbu', z: cam.z, color: C.coral, side: 'left', size: 26 });
    const hz = m.ll(56.4, 26.5); P.circ(ctx, hz[0], hz[1], 26 / cam.z, C.red, { a: 0.35 + 0.25 * Math.sin(t * 4) }); P.mapLabel(ctx, 'HORMUZ', hz[0], hz[1] + 54 / cam.z, { z: cam.z, size: 26, color: C.cream });
    const tk = P.fin(t, ev.c3_red + 0.3, 0.4); P.tankerTop(ctx, y0[0] - 40 / cam.z, y0[1] + 30 / cam.z, Math.PI * 0.7, 46, { z: cam.z, a: tk });
    ctx.restore();
    P.counter(ctx, { x: 1450, y: 900, from: 0, to: 1200, t, t0: ev.c3_pipe + 0.2, t1: ev.c3_1200 + 0.2, size: 86, prefix: '≈ ', suffix: ' km', sub: 'East–West pipeline', color: C.navy });
    P.kicker(ctx, 'Plan B', t, ev.c3_s1 + 0.3);
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — the UAE's pipe to Fujairah; Iran's to Jask (barely used)
  P.shot(ev.c3_s2, (ctx, t) => {
    const m = P.mkMap('arabia', P.ARABIA); const c = m.ll(55.0, 26.0);
    ctx.save(); const cam = P.cam(ctx, t, ev.c3_s2, ev.c3_s2 + 1.4, { x: 980, y: 560, z: 1.0 }, { x: c[0], y: c[1], z: 2.4 });
    P.drawMap(ctx, m, { sea: C.sea, z: cam.z });
    pipe(ctx, SAU.map(([a, b]) => m.ll(a, b)), 1, t, cam.z, { flow: 0.6 });
    pipe(ctx, UAE.map(([a, b]) => m.ll(a, b)), P.eio((t - ev.c3_uae + 0.8) / 1.2), t, cam.z, { color: C.teal });
    pipe(ctx, IRN.map(([a, b]) => m.ll(a, b)), P.eio((t - ev.c3_jask + 0.4) / 1.2), t, cam.z, { color: C.grey, flow: 0, dash: [16 / cam.z, 10 / cam.z] });
    const f = m.ll(...UAE[3]), j = m.ll(...IRN[6]);
    P.pin(ctx, f[0], f[1], t, ev.c3_uae, { label: 'Fujairah', z: cam.z, color: C.teal, side: 'right', size: 26 });
    P.pin(ctx, j[0], j[1], t, ev.c3_jask, { label: 'Jask', z: cam.z, color: C.grey, side: 'right', size: 26 });
    const hz = m.ll(56.4, 26.5); P.circ(ctx, hz[0], hz[1], 22 / cam.z, C.red, { a: 0.4 + 0.25 * Math.sin(t * 4) });
    ctx.restore();
    P.tag(ctx, 'outside the strait ✓', 1450, 830, t, ev.c3_uae + 0.3, 1e9, { size: 42, fill: C.teal, color: C.navy });
    P.stamp(ctx, 'BARELY USED', 1300, 230, t, ev.c3_barely, { size: 64, color: C.steel, rot: 0.03 });
  }, { in: { type: 'fade', dur: 0.3 } });

  // S3 — spare room in the pipes: ~3.5–5.5 million barrels a day, against ~20 million → at best one barrel in four
  P.shot(ev.c3_s3, (ctx, t) => {
    P.bgLight(ctx, t);
    // the front door pipe (20) vs the back door pipes (3.5–5.5): heights proportional
    const base = 760; const big = 20 * 26, lo = 3.5 * 26, hi = 5.5 * 26;
    const k1 = P.oc((t - ev.c3_spare + 0.3) / 0.8), k2 = P.oc((t - ev.c3_range + 0.2) / 0.8);
    P.rect(ctx, 200, base - big * k1, 360, big * k1, 20, C.navy, { shadow: 0.2 }); G.text(ctx, 'HORMUZ', 380, base + 60, { size: 40, fam: 'Inter', weight: 800, color: C.navy, align: 'center', boil: 0 });
    if (k1 > 0.5) G.text(ctx, '≈ 20', 380, base - big * k1 + 90, { size: 80, fam: 'Bungee', color: C.gold, align: 'center', boil: 0 });
    P.rect(ctx, 760, base - hi * k2, 360, hi * k2, 20, P.lt(C.teal, 0.5)); P.rect(ctx, 760, base - lo * k2, 360, lo * k2, 20, C.teal);
    const flowS = (x, y, w, h, col) => { if (h <= 2) return; ctx.save(); P.pRR(x, y, w, h, 20)(ctx); ctx.clip(); ctx.strokeStyle = col; ctx.lineWidth = 14; for (let k = -6; k < 30; k++) { const yy = y + h - ((k * 46 + t * 70) % (h + 400)) ; ctx.beginPath(); ctx.moveTo(x - 20, yy + 40); ctx.lineTo(x + w + 20, yy - 40); ctx.stroke(); } ctx.restore(); };
    flowS(200, base - big * k1, 360, big * k1, 'rgba(255,255,255,0.07)'); flowS(760, base - lo * k2, 360, lo * k2, 'rgba(255,255,255,0.18)');
    G.text(ctx, 'SPARE PIPE ROOM', 940, base + 60, { size: 40, fam: 'Inter', weight: 800, color: C.teal, align: 'center', boil: 0 });
    if (k2 > 0.5) G.text(ctx, '3.5–5.5', 940, base - hi * k2 - 26, { size: 56, fam: 'Bungee', color: C.teal, align: 'center', boil: 0 });
    P.label(ctx, 'million barrels per day', 660, base + 120, { size: 32, align: 'center' });
    P.tag(ctx, 'International Energy Agency', 940, 180, t, ev.c3_iea, 1e9, { size: 36, fill: C.navy, color: C.cream });
    // four barrels, one takes the back door
    const bx = 1340; for (let i = 0; i < 4; i++) { const k = P.pop(t, ev.c3_against + i * 0.12, 0.35); const go = i === 3 ? P.eio((t - ev.c3_one4) / 0.9) : 0;
      P.barrel(ctx, bx + i * 120 + go * 0, 760 - go * 330, k, { color: i === 3 ? C.teal : C.oil }); }
    P.stamp(ctx, '1 IN 4, AT BEST', 1520, 930, t, ev.c3_one4, { size: 60, color: C.coral, rot: -0.03 });
    P.source(ctx, 'IEA Strait of Hormuz factsheet, Feb 2026', t, ev.c3_range);
  }, { in: { type: 'wipe', dir: 'left', dur: 0.5 } });

  // S4 — gas: no back door at all (Qatar ~93 % of its LNG through the strait)
  P.shot(ev.c3_s4, (ctx, t) => {
    P.bgNavy(ctx, t); P.water(ctx, t, { y0: 760, color: C.sea, color2: C.seaDeep, seed: 5 });
    P.lngShip(ctx, 700, 790, 900, t);
    const sh = P.fin(t, ev.c3_none, 0.15); P.at(ctx, 1500, 760, 1, 0, () => { P.door(ctx, 0, 0, 220, 380, 0, { color: P.mix(C.teal, C.grey, sh) }); if (sh > 0) { P.line(ctx, -150, -420, 150, -20, C.red, 18, sh); P.line(ctx, 150, -420, -150, -20, C.red, 18, sh); } });
    G.text(ctx, 'BACK DOOR', 1500, 300, { size: 40, fam: 'Inter', weight: 800, color: C.cream, align: 'center', alpha: P.fin(t, ev.c3_gas, 0.3), boil: 0 });
    P.stamp(ctx, 'NO BACK DOOR', 1500, 170, t, ev.c3_none, { size: 70, color: C.red });
    P.counter(ctx, { x: 470, y: 330, from: 0, to: 93, t, t0: ev.c3_qatar - 0.2, t1: ev.c3_qatar + 0.6, size: 96, prefix: '≈ ', suffix: '%', sub: 'of Qatar’s gas exports go through', color: C.coral });
    P.source(ctx, 'IEA factsheet 2026: "no alternative routes"', t, ev.c3_none);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S5 — has anyone tried to close it before?
  P.shot(ev.c3_s5, (ctx, t) => {
    P.bgNavy(ctx, t);
    P.door(ctx, 960, 900, 330, 520, 0.6 + 0.08 * Math.sin(t * 2), { color: C.coral });
    P.write(ctx, 'has anyone tried', 960, 190, t, ev.c3_before - 0.5, { size: 84, color: C.cream });
    P.write(ctx, 'to close it before?', 960, 300, t, ev.c3_before - 0.1, { size: 84, color: C.cream, hl: ['close'] });
    const yr = Math.round(lerp(2026, 1984, P.eio((t - ev.c3_before - 0.4) / 1.2))); const ky = P.pop(t, ev.c3_before + 0.3, 0.4);
    P.at(ctx, 1550, 620, ky, 0.05, () => { P.rect(ctx, -150, -80, 300, 160, 20, C.cream, { shadow: 0.3 }); P.rect(ctx, -150, -80, 300, 44, 20, C.coral); G.text(ctx, String(yr), 0, 50, { size: 80, fam: 'Bungee', color: C.navy, align: 'center', boil: 0 }); });
    Ch.gull(ctx, { x: 420, y: 950, s: 0.95, t, dir: 1, gesture: 'worried', eyes: 'worried', mouth: P.talk(t), look: 1 });
  }, { in: { type: 'fade', dur: 0.4 } });
})();
