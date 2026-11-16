// Chapter 4 — A slowly fading heart. No solar panels: the Sun is just a bright star out there · three plutonium generators turn the heat
// of decaying atoms into electricity · ≈ 470 W at launch, −≈ 4 W a year · today less than half (a house on a couple of bulbs) ·
// rationing: heaters off, colder · 10 instruments → turned off one by one; April 2026 another (LECP) · 2 left: magnetometer + plasma waves ·
// into the 2030s · "what happens when something breaks?"
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  P.cardShot('c4', 4, 'A slowly fading heart', 'deep', (ctx, t) => {
    const k = P.fin(t, ev.c4_star - 0.6, 1.2); P.sunDisc(ctx, 1600, 220, lerp(90, 10, k), t, { a: 1 }); if (k > 0.5) P.ring(ctx, 1600, 220, t, ev.c4_star, { r: 120, color: C.gold });
    P.voyager(ctx, 300, 900, 0.4, t, { rot: -0.2 });
  });

  // S1 — three generators: heat → electricity (glowing cylinders, heat shimmer, a bulb lights)
  P.shot(ev.c4_s1, (ctx, t) => {
    P.sky(ctx, t, 'night', { stars: 160, seed: 91 });
    for (let i = 0; i < 3; i++) { const k = P.pop(t, ev.c4_s1 + 0.25 + i * 0.15, 0.4); if (k <= 0) continue; const x = 380 + i * 300, y = 560;
      P.at(ctx, x, y, k, 0, () => { P.silR(ctx, -80, -180, 160, 360, 24, {}); for (let f = -3; f <= 3; f++) P.line(ctx, f * 22, -200, f * 22, 200, C.ink, 8);
        const heat = P.fin(t, ev.c4_heat - 0.3, 0.6); P.glow(ctx, 0, 0, 200, C.coral, heat * (0.7 + 0.2 * Math.sin(t * 3 + i))); P.rect(ctx, -40, -140, 80, 280, 30, '#FF8A5B', { a: heat * 0.85 }); P.rect(ctx, -20, -110, 40, 220, 20, '#FFD07A', { a: heat * 0.8 });
        for (let w = 0; w < 3; w++) { const ph = ((t * 0.7 + w / 3 + i * 0.2) % 1); P.stroke(ctx, (c) => { c.beginPath(); for (let yy = 0; yy < 80; yy += 8) { const xx = Math.sin(yy * 0.15 + t * 6 + w) * 10; yy ? c.lineTo(-30 + w * 30 + xx, -220 - ph * 120 - yy) : c.moveTo(-30 + w * 30 + xx, -220 - ph * 120); } }, P.rgba(C.coral, 0.8), 4, (1 - ph) * heat); } }); }
    P.tag(ctx, 'PLUTONIUM-238', 680, 870, t, ev.c4_plu, 1e9, { size: 42, fill: C.coral, color: C.cream });
    // electricity → bulb
    const ek = P.oc((t - ev.c4_elec) / 0.4); if (ek > 0) { P.trace(ctx, [[1040, 560], [1180, 560], [1220, 500], [1260, 620], [1300, 500], [1340, 560], [1460, 560]], ek, C.gold, 8); P.glow(ctx, 1560, 520, 220 * ek, '#FFF1C8', ek); P.circ(ctx, 1560, 500, 70, '#FFF1C8', { a: ek }); P.rect(ctx, 1530, 570, 60, 50, 8, C.cream, { a: ek }); }
    P.big(ctx, 'heat → electricity', 1350, 260, t, ev.c4_elec, { size: 64, color: C.gold });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — growing graph: ≈ 470 W in 1977, −≈ 4 W every year
  P.shot(ev.c4_s2, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 120, seed: 93 });
    const x0 = 260, x1 = 1660, y0 = 900, yTop = 260; const yw = (w) => lerp(y0, yTop, w / 500); const xy = (yr) => lerp(x0, x1, (yr - 1977) / 49);
    P.line(ctx, x0, y0, x1 + 40, y0, P.rgba(C.cream, 0.6), 4); P.line(ctx, x0, y0, x0, yTop - 30, P.rgba(C.cream, 0.6), 4);
    [1977, 1990, 2000, 2010, 2026].forEach((yr) => G.text(ctx, String(yr), xy(yr), y0 + 50, { size: 30, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 }));
    G.text(ctx, 'WATTS', x0 - 20, yTop - 50, { size: 30, fam: 'Inter', weight: 800, color: C.cream, align: 'left', boil: 0 });
    const k = P.eio((t - ev.c4_470) / Math.max(1.2, ev.c4_lost - ev.c4_470 + 1.6)); const yrNow = 1977 + 49 * k; const w = (yr) => 470 - (245 / 46) * (yr - 1977);
    const pts = []; for (let yr = 1977; yr <= yrNow; yr += 0.5) pts.push([xy(yr), yw(w(yr))]); if (pts.length > 1) { P.trace(ctx, pts, 1, C.gold, 8); }
    const sk = P.pop(t, ev.c4_470a, 0.35); if (sk > 0) { P.circ(ctx, xy(1977), yw(470), 12 * sk, C.gold); G.text(ctx, '470 W', xy(1977) + 30, yw(470) - 20, { size: 40, fam: 'Bungee', color: C.gold, boil: 0, alpha: clamp(sk) }); }
    if (t > ev.c4_470) { const xx = xy(yrNow), yy = yw(w(yrNow)); P.circ(ctx, xx, yy, 12, C.gold); if (yrNow > 2023) { P.circ(ctx, xy(2023), yw(225), 12, C.cream); G.text(ctx, '≈ 225 W (2023)', xy(2023) - 20, yw(225) + 70, { size: 40, fam: 'Bungee', color: C.cream, align: 'right', boil: 0 }); } G.text(ctx, String(Math.floor(yrNow)), xx + 20, yy - 34, { size: 30, fam: 'Inter', weight: 800, color: C.gold, align: 'center', boil: 0 }); }
    P.inkCount(ctx, { x: 1300, y: 260, to: 470, t, t0: ev.c4_470a, t1: ev.c4_470, size: 110, prefix: '≈ ', suffix: ' W', sub: 'AT LAUNCH', subSize: 36, tEnd: ev.c4_lost });
    P.stamp(ctx, '− 4 W EVERY YEAR', 1240, 300, t, ev.c4_lost, { size: 70, color: C.coral });
    P.source(ctx, 'NASA/JPL', t, ev.c4_470);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — less than half: a whole house on a couple of light bulbs, one flickering
  P.shot(ev.c4_s3, (ctx, t) => {
    P.sky(ctx, t, 'dusk', { stars: 60, seed: 95 }); P.hills(ctx, t, { y: 980, layers: 2 });
    P.stamp(ctx, 'LESS THAN HALF', 960, 170, t, ev.c4_half, { size: 84, color: C.coral });
    const hk = P.oc((t - ev.c4_house + 0.4) / 0.6); ctx.save(); ctx.globalAlpha *= hk;
    P.silP(ctx, [[560, 980], [560, 600], [960, 360], [1360, 600], [1360, 980]], {}); P.silR(ctx, 1180, 380, 70, 160, 4, {});
    const wins = [[640, 640], [800, 640], [1040, 640], [1200, 640], [640, 800], [1200, 800]];
    wins.forEach(([x, y], i) => { const lit = i === 1 ? 1 : i === 4 ? (t > ev.c4_less ? 0.4 + 0.6 * (Math.sin(t * 13) > 0 ? 1 : 0.3) : 1) : 0; const on = t > ev.c4_bulbs ? lit : 0; P.rect(ctx, x, y, 110, 110, 6, on > 0 ? '#FFE6A0' : '#2A2244', { a: on > 0 ? on : 1 }); if (on > 0) P.glow(ctx, x + 55, y + 55, 140, '#FFE6A0', on * 0.7); });
    P.rect(ctx, 905, 840, 110, 140, 6, '#2A2244'); ctx.restore();
    Ch.echo(ctx, { x: 1620, y: 1010, s: 0.62, t, dir: -1, gesture: 'shrug', mouth: P.talk(t), look: -1 });
    P.note(ctx, 'a couple of bulbs… and fewer every year', 960, 1050, t, ev.c4_less, { size: 42, color: C.cream });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — rationing: heater icons switch off, a thermometer drops, frost creeps over Voyager's rim light
  P.shot(ev.c4_s4, (ctx, t) => {
    const cold = P.oc((t - ev.c4_cold + 0.5) / 1.2); P.sky(ctx, t, cold > 0.5 ? 'deep' : 'night', { stars: 200, seed: 97 });
    P.voyager(ctx, 1150, 520, 1.0, t, { rot: -0.06, rim: P.mix(C.rim, '#9FD8FF', cold) });
    for (let i = 0; i < 4; i++) { const tOff = ev.c4_heaters + i * 0.32; const on = t < tOff; const x = 180 + (i % 2) * 180, y = 300 + Math.floor(i / 2) * 200;
      P.circ(ctx, x, y, 66, on ? '#3A1F2A' : '#1C1A30', { stroke: on ? C.coral : '#5A5A7A', lw: 5 }); for (let z = -1; z <= 1; z++) P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(x + z * 22, y + 30); c.bezierCurveTo(x + z * 22 - 14, y + 10, x + z * 22 + 14, y - 10, x + z * 22, y - 30); }, on ? C.coral : '#5A5A7A', 6); if (!on && t < tOff + 0.3) P.ring(ctx, x, y, t, tOff, { r: 90, color: C.cream }); }
    G.text(ctx, 'HEATERS', 270, 620, { size: 36, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 });
    // thermometer
    const tx = 270, ty = 820; P.rect(ctx, tx - 26, ty - 140, 52, 220, 26, C.ink, { stroke: C.cream, lw: 4 }); P.circ(ctx, tx, ty + 90, 40, C.ink, { stroke: C.cream, lw: 4 });
    const lvl = lerp(0.8, 0.12, cold); P.rect(ctx, tx - 12, ty + 70 - 200 * lvl, 24, 200 * lvl + 20, 12, P.mix(C.coral, '#7FC8FF', cold)); P.circ(ctx, tx, ty + 90, 28, P.mix(C.coral, '#7FC8FF', cold));
    P.tag(ctx, 'RATIONING EVERY WATT', 1150, 140, t, ev.c4_ration, 1e9, { size: 42, fill: C.cream, color: C.ink, dot: C.coral });
    P.big(ctx, 'colder…', 1150, 960, t, ev.c4_cold, { size: 72, color: '#BFE6FF' });
    if (cold > 0) for (let i = 0; i < 40; i++) { const x = (U.hash(i, 3) * W + t * 20) % W, y = (U.hash(i, 4) * H + t * 50 * (0.5 + U.hash(i, 5))) % H; P.circ(ctx, x, y, 2 + 2 * U.hash(i, 6), '#DDF2FF', { a: cold * 0.6 }); }
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — 10 instruments, switched off one by one; April 2026: another goes dark
  const INST = ['IMAGING', 'INFRARED', 'ULTRAVIOLET', 'PHOTOPOLARIMETER', 'PLANETARY RADIO', 'PLASMA SCIENCE', 'COSMIC RAYS', 'LOW-ENERGY PARTICLES', 'MAGNETOMETER', 'PLASMA WAVES'];
  const OFF = [0, 1, 2, 3, 4, 5, 6, 7]; // switched off in the montage; the last one (LECP) goes dark on 'April 2026'
  const lights = (ctx, t, x0, y0, offAt) => { INST.forEach((n, i) => { const col = i % 2, row = Math.floor(i / 2); const x = x0 + col * 620, y = y0 + row * 118; const off = offAt(i); const on = off == null || t < off;
    P.circ(ctx, x, y, 26, on ? C.sig : '#2A2244', { stroke: on ? C.sig2 : '#4A4466', lw: 4 }); if (on) P.glow(ctx, x, y, 60, C.sig, 0.6); if (off != null) P.ring(ctx, x, y, t, off, { r: 60, color: C.coral });
    G.text(ctx, n, x + 50, y + 12, { size: 34, fam: 'Inter', weight: 800, color: on ? C.cream : '#6A6488', boil: 0 }); }); };
  P.shot(ev.c4_s5, (ctx, t) => {
    P.sky(ctx, t, 'night', { stars: 120, seed: 99 });
    const k = P.pop(t, ev.c4_10 - 0.2, 0.4); P.tag(ctx, '10 SCIENCE INSTRUMENTS', 960, 110, t, ev.c4_10, 1e9, { size: 44, fill: C.cream, color: C.ink });
    ctx.save(); ctx.globalAlpha *= clamp(k);
    lights(ctx, t, 400, 250, (i) => { const j = OFF.indexOf(i); if (j < 0) return null; if (j < 7) return ev.c4_off + j * 0.36; return ev.c4_dark; }); ctx.restore();
    P.tag(ctx, 'APRIL 2026', 1640, 980, t, ev.c4_apr, 1e9, { size: 40, fill: C.coral, color: C.cream });
    P.source(ctx, 'NASA/JPL 2025; NASA Voyager blog, 17 Apr 2026', t, ev.c4_apr);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S6 — two still working: a magnetometer (the long boom) and plasma waves
  P.shot(ev.c4_s6, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 220, seed: 101 });
    P.voyager(ctx, 1200, 640, 0.95, t, { rot: -0.05 });
    const m = P.fin(t, ev.c4_mag, 0.4); if (m > 0) { P.glow(ctx, 1200 - 400 * 0.95, 640 - 220 * 0.95, 200, C.sig, m * 0.8); for (let i = 0; i < 4; i++) P.stroke(ctx, P.pEll(1200 - 400 * 0.95, 640 - 220 * 0.95, 60 + i * 50 + Math.sin(t * 2 + i) * 6, 30 + i * 26, 0.4), P.rgba(C.sig, 0.6), 3, m * (1 - i * 0.2)); }
    const wv = P.fin(t, ev.c4_waves, 0.4); if (wv > 0) { ctx.save(); ctx.globalAlpha *= wv; ctx.strokeStyle = C.gold; ctx.lineWidth = 5; ctx.beginPath(); for (let x = 1000; x < 1880; x += 6) { const yy = 940 + Math.sin(x * 0.04 - t * 8) * 24 * Math.sin((x - 1000) / 880 * Math.PI); x === 1000 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke(); ctx.restore(); }
    P.inkCount(ctx, { x: 400, y: 330, to: 2, t, t0: ev.c4_two - 0.4, t1: ev.c4_two, size: 220, sub: 'INSTRUMENTS STILL ON', subSize: 42 });
    P.tag(ctx, '① MAGNETIC FIELDS', 400, 620, t, ev.c4_mag, 1e9, { size: 40, fill: C.sig, color: C.ink });
    P.tag(ctx, '② PLASMA WAVES', 400, 720, t, ev.c4_waves, 1e9, { size: 40, fill: C.gold, color: C.ink });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S7 — into the 2030s · and when something breaks, a light-day from the nearest mechanic?
  P.shot(ev.c4_s7, (ctx, t) => {
    P.sky(ctx, t, 'rose', { stars: 60, seed: 103 }); P.hills(ctx, t, { y: 1000, layers: 2, tint: '#6A3A72' });
    P.tag(ctx, 'HOPE: INTO THE 2030s', 960, 150, t, ev.c4_2030, 1e9, { size: 48, fill: C.cream, color: C.ink, dot: C.sig });
    const bk = P.fin(t, ev.c4_breaks, 0.2); P.voyager(ctx, 1420, 440, 0.75, t, { rot: -0.06 + (t > ev.c4_breaks ? Math.sin((t - ev.c4_breaks) * 30) * 0.02 * Math.exp(-(t - ev.c4_breaks) * 4) : 0) });
    if (bk > 0) { P.trace(ctx, [[1380, 380], [1420, 430], [1395, 470], [1440, 520]], P.oc((t - ev.c4_breaks) / 0.25), C.coral, 6); P.burst(ctx, 1420, 440, t, ev.c4_breaks, { r: 140, colors: [C.coral, C.gold, C.cream] }); }
    // a mechanic far away on Earth (a tiny silhouette with a wrench) and the distance between
    const mk = P.pop(t, ev.c4_mech - 0.1, 0.4); if (mk > 0) { P.person(ctx, 300, 980, 0.6 * mk, t, { pose: 'hold' }); P.at(ctx, 335, 890, mk, -0.6, () => { P.silR(ctx, -6, -60, 12, 80, 4, {}); P.silE(ctx, 0, -66, 18, 14, {}); }); P.dimLine(ctx, 400, 820, 1260, 520, '1 LIGHT-DAY', P.eio((t - ev.c4_mech) / 0.6), { size: 34 }); }
    Ch.echo(ctx, { x: 860, y: 1030, s: 0.55, t, gesture: 'shrug', mouth: P.talk(t), look: 1, eyes: 'wide' });
  }, { in: { type: 'fade', dur: 0.4 } });
})();
