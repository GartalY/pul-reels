// Chapter 2 — The sudden stop: everything not bolted down flies east · winds 3× the strongest tornado · oceans slosh ·
// swept clean · the honest part (it can't happen: 2×10^29 J) · the gentle version: the spin winds down to zero.
(function () {
  const { U, G, Ch, P, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  P.cardShot('c2', 2, 'The sudden stop', (ctx, t) => { P.board(ctx, t); P.icon(ctx, 'brake', 1680, 880, 150, { t }); });

  // ground strip (a gentle curve of the planet's surface)
  const ground = (ctx, y = 860, col = '#C9A27A') => { P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(-50, y + 40); c.quadraticCurveTo(W / 2, y - 40, W + 50, y + 40); c.lineTo(W + 50, H + 50); c.lineTo(-50, H + 50); c.closePath(); }, col, 7, 1, { fill: '#3A2F2A', fillA: 0.7, scribble: true, seed: 12, gap: 14 }); };
  const gy = (x, y = 860) => { const u = (x + 50) / (W + 100); return lerp(y + 40, y + 40, u) - 80 * u * (1 - u) * 2 * 0.5 * 2; };

  // S1 — the ground stops, you don't: Axel, a car, a tree and a rock fly off to the east
  P.shot(ev.c2_s1, (ctx, t) => {
    P.board(ctx, t); ground(ctx);
    // a post bolted into the bedrock stays
    const kb = P.pop(t, ev.c2_bolted, 0.4); if (kb > 0) { P.at(ctx, 300, gy(300) - 10, kb, 0, () => { P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -230); c.moveTo(-60, -230); c.lineTo(60, -230); }, C.chalk, 10, 1, { seed: 3 }); for (const bx of [-16, 16]) P.circle(ctx, bx, -10, 7, C.gold, 4, 1, { fill: C.gold, fillA: 1, dash: false }); }); P.label(ctx, 'bolted to bedrock: stays', 300, gy(300) + 110, { size: 34, align: 'center', color: C.chalk, alpha: clamp(kb) }); }
    const items = [['axel', 620], ['car', 880], ['tree', 1120], ['rock', 1340]];
    items.forEach(([k, x0], i) => { const tf = ev.c2_things[i] - 0.3; const fly = Math.max(0, t - tf);
      const x = x0 + fly * 420 + fly * fly * 160, y = gy(x0) - 6 - fly * 160 * (1 - Math.exp(-fly * 2)) - (k === 'axel' ? 0 : 50), rot = fly * (k === 'axel' ? 0.6 : 2.2);
      if (x > W + 300) return; if (fly > 0) P.streaks(ctx, x - 40, y - 60, 380, 140, t, { a: 0.8, seed: 90 + i });
      if (k === 'axel') Ch.axel(ctx, { x, y, s: 0.95, t, rot: Math.min(1.2, rot), pose: fly > 0 ? 'fly' : 'stand', gesture: fly > 0 ? 'flail' : 'idle', eyes: fly > 0 ? 'wide' : 'normal', mouth: fly > 0 ? 'o' : Ch.axelMouth(t), wind: fly > 0 ? 1.8 : 0.3 });
      else P.at(ctx, x, y, 1, rot, () => P.icon(ctx, k, 0, 0, 80, { t, seed: 40 + i })); });
    P.streaks(ctx, 1900, 560, 1700, 560, t, { n: 16, a: 0.7 * P.fin(t, ev.c2_things[3], 0.5), seed: 120 });
    P.arrow(ctx, 760, 170, 1240, 170, { color: C.gold, a: P.fin(t, ev.c2_east - 0.2, 0.3), k: P.oc((t - ev.c2_east + 0.2) / 0.4), lw: 9 });
    P.label(ctx, 'EAST', 1290, 186, { size: 52, color: C.gold, alpha: P.fin(t, ev.c2_east, 0.3) });
    P.tag(ctx, 'up to 1,670 km/h', 1000, 290, t, ev.c2_speed, 1e9, { size: 50, border: C.gold });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — the air keeps going: the strongest tornado winds measured vs a sudden-stop wind
  P.shot(ev.c2_s2, (ctx, t) => {
    P.board(ctx, t);
    P.kicker(ctx, 'wind speed', t, L('c2_3').t);
    const kt = P.pop(t, ev.c2_tornado - 0.2, 0.4); if (kt > 0) P.at(ctx, 260, 470, kt, 0, () => P.icon(ctx, 'tornado', 0, 0, 120, { t }));
    P.hbar(ctx, { x: 460, y: 410, w: 1300, h: 70, frac: 484 / 1670, t, t0: ev.c2_tornado, color: C.dim, label: 'strongest tornado winds ever measured (Oklahoma, 1999)', value: '~484 km/h', seed: 21 });
    P.hbar(ctx, { x: 460, y: 680, w: 1300, h: 70, frac: 1, t, t0: L('c2_3').t + 0.2, d: 1.6, color: C.sky, label: 'the air after a sudden stop, at the equator', value: '', seed: 22 });
    G.text(ctx, '1,670 km/h', 1740, 732, { size: 52, fam: FT.num, color: '#16223A', align: 'right', alpha: P.fin(t, L('c2_3').t + 1.6, 0.3), boil: 0 });
    // wind streaks across the board
    const kw = P.fin(t, ev.c2_air, 0.5); for (let i = 0; i < 14; i++) { const y = 120 + U.hash(i, 5) * 900, x = ((t * 1400 + U.hash(i, 6) * 2400) % 2600) - 400; P.line(ctx, x, y, x + 180 + 120 * U.hash(i, 7), y, C.sky, 3, kw * 0.35, 1, { dash: false }); }
    P.stamp(ctx, 'MORE THAN 3×', 1100, 920, t, ev.c2_three, { size: 84, color: C.gold });
    const kp = P.fin(t, ev.c2_planet, 0.4); if (kp > 0) { P.globe(ctx, 300, 900, 120, t, { lon0: 0, lat0: 10, a: kp }); for (let i = 0; i < 5; i++) P.arcArrow(ctx, 300, 900, 150 + i * 6, Math.PI * (1.1 + 0.15 * i) + t * 2, Math.PI * (1.6 + 0.15 * i) + t * 2, { color: C.sky, lw: 4, head: 14, a: kp * 0.8, seed: 60 + i }); }
  }, { in: { type: 'fade', dur: 0.5 } });

  // S3 — the oceans slosh out of their basins and surge over the land
  P.shot(ev.c2_s3, (ctx, t) => {
    P.board(ctx, t);
    const u = clamp((t - ev.c2_slosh + 0.2) / 2.2), sg = clamp((t - ev.c2_surge) / 1.6);
    // seabed + continent profile
    const bed = (x) => x < 300 ? 760 : x < 1150 ? 760 + 200 * Math.sin((x - 300) / 850 * Math.PI) : 760 - 160 * Math.min(1, (x - 1150) / 160);
    P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(-20, 1100); for (let x = -20; x <= W + 20; x += 20) c.lineTo(x, bed(x)); c.lineTo(W + 20, 1100); c.closePath(); }, '#C9A27A', 7, 1, { fill: '#3A2F2A', fillA: 0.8, scribble: true, seed: 31, gap: 14 });
    // town on the continent
    for (let i = 0; i < 4; i++) P.icon(ctx, i % 2 ? 'tree' : 'house', 1360 + i * 130, 560 - 40, 46, { seed: 70 + i, a: 1 - clamp((sg - 0.5) * 3) });
    // water: a surface that tilts east, then a surge runs up and over the continent
    const level = 700, tilt = 120 * Math.sin(u * Math.PI * 0.9);
    const surf = (x) => level + tilt * (0.5 - x / W) * 2 - 260 * sg * Math.exp(-Math.pow((x - lerp(900, 1700, sg)) / 260, 2)) * (sg > 0 ? 1 : 0) + 8 * Math.sin(x / 60 + t * 3);
    ctx.save(); ctx.beginPath(); ctx.moveTo(-20, 1100); for (let x = -20; x <= W + 20; x += 16) ctx.lineTo(x, Math.min(surf(x), x > 1150 && sg <= 0 ? bed(x) : 2000)); ctx.lineTo(W + 20, 1100); ctx.closePath(); ctx.clip();
    ctx.globalAlpha = 0.6; ctx.fillStyle = C.ocean; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1; P.hatchBox(ctx, 0, 0, W, H, C.sky, { a: 0.3, gap: 12, seed: 33 }); ctx.restore();
    P.stroke(ctx, (c) => { c.beginPath(); for (let x = -20; x <= W + 20; x += 16) { const y = surf(x); x === -20 ? c.moveTo(x, y) : c.lineTo(x, y); } }, C.sky, 7, 1, { seed: 34 });
    P.arrow(ctx, 600, 300, 1100, 300, { color: C.sky, a: P.fin(t, ev.c2_slosh, 0.3), k: P.oc((t - ev.c2_slosh) / 0.5) });
    P.write(ctx, 'the oceans keep going too', 760, 210, t, L('c2_4').t, { size: 62 });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S4 — swept clean: buildings off their foundations, forests flattened
  P.shot(ev.c2_s4, (ctx, t) => {
    P.board(ctx, t); ground(ctx, 820);
    for (let i = 0; i < 5; i++) { const x0 = 220 + i * 170; const go = Math.max(0, t - ev.c2_build - i * 0.12); P.at(ctx, x0 + go * go * 700, 760 - go * 120, 1, go * 1.8, () => P.icon(ctx, 'house', 0, 0, 70, { seed: 80 + i })); if (go > 0 && go < 1.5) P.dust(ctx, x0, 800, t, ev.c2_build + i * 0.12, { color: '#C9A27A', r: 70, seed: i }); }
    for (let i = 0; i < 6; i++) { const x0 = 1120 + i * 120; const go = clamp((t - ev.c2_forest - i * 0.08) / 0.35); P.at(ctx, x0, 800, 1, go * 1.45, () => P.icon(ctx, 'tree', 40, -40, 70, { seed: 90 + i })); }
    const kc = P.fin(t, ev.c2_clean - 0.2, 0.6); if (kc > 0) { ctx.save(); ctx.globalAlpha = kc * 0.85; ctx.fillStyle = '#16223A'; ctx.fillRect(0, 0, W * kc, 790); ctx.restore(); P.streaks(ctx, W * kc, 500, 700, 600, t, { a: kc * (1 - kc) * 3 }); }
    P.stamp(ctx, 'SWEPT CLEAN', 960, 380, t, ev.c2_clean + 0.3, { size: 100, color: C.chalk });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — the honest part: it can't happen. The spin holds ~2×10^29 joules.
  P.shot(ev.c2_s5, (ctx, t) => {
    P.board(ctx, t);
    Ch.axel(ctx, { x: 380, y: 940, s: 1.3, t, gesture: t > ev.c2_cant ? 'point' : 'think', dir: 1, mouth: Ch.axelMouth(t), eyes: 'normal', look: 0.5 });
    P.write(ctx, 'the honest part:', 1150, 230, t, ev.c2_honest - 0.1, { size: 72, color: C.coral, underline: true });
    P.stamp(ctx, "IT CAN'T HAPPEN", 1150, 420, t, ev.c2_cant, { size: 100, color: C.red, rot: -0.04 });
    const kj = P.pop(t, ev.c2_joules - 0.6, 0.45); if (kj > 0) P.at(ctx, 1150, 720, kj, 0, () => {
      P.box(ctx, -420, -130, 840, 250, C.gold, { seed: 6 });
      G.text(ctx, '2 × 10', -60, 40, { size: 120, fam: FT.num, color: C.gold, align: 'center', boil: 0 });
      G.text(ctx, '29', 155, -18, { size: 70, fam: FT.num, color: C.gold, align: 'center', boil: 0 });
      G.text(ctx, 'J', 260, 40, { size: 110, fam: FT.num, color: C.gold, align: 'center', boil: 0 }); });
    P.label(ctx, "energy stored in Earth's spin", 1150, 900, { size: 42, align: 'center', color: C.chalk, alpha: P.fin(t, ev.c2_joules, 0.4) });
  }, { in: { type: 'cut' } });

  // S6 — more than 300 million years of all the energy humanity uses
  P.shot(ev.c2_s6, (ctx, t) => {
    P.board(ctx, t);
    // one small box = a year of humanity's energy; the grid fills up behind the counter
    const k = clamp((t - ev.c2_300a + 0.4) / (ev.c2_300 - ev.c2_300a + 0.6));
    const n = Math.floor(ease.inCubic(k) * 840); ctx.save(); ctx.fillStyle = C.gold;
    for (let i = 0; i < n; i++) { const x = 110 + (i % 60) * 28, y = 980 - Math.floor(i / 60) * 28; ctx.globalAlpha = 0.25 + 0.3 * U.hash(i, 2); ctx.fillRect(x, y, 22, 22); } ctx.restore();
    const kh = P.pop(t, ev.c2_humanity, 0.4); if (kh > 0) { P.circle(ctx, 121, 991, 30 * kh, C.coral, 5, 1, { dash: false }); P.tag(ctx, '= one year of ALL the energy humanity uses', 560, 900, t, ev.c2_humanity, 1e9, { size: 40, border: C.coral }); }
    P.counter(ctx, { x: 960, y: 330, from: 0, to: 300, t, t0: ev.c2_300a, t1: ev.c2_300, size: 150, suffix: ' million', sub: 'years of it — and more', color: C.gold });
    P.write(ctx, 'nothing we know of could stop that in an instant', 960, 520, t, ev.c2_nothing, { size: 58 });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S7 — the gentle version: a big dial winds the spin down to zero; the globe slows and stops
  P.shot(ev.c2_s7, (ctx, t) => {
    P.board(ctx, t);
    const sl = clamp((t - ev.c2_slow) / Math.max(0.6, ev.c2_zero - ev.c2_slow));
    const speed = 1 - (sl < 0.5 ? 2 * sl * sl : 1 - Math.pow(-2 * sl + 2, 2) / 2); const D = Math.max(0.6, ev.c2_zero - ev.c2_slow); const lon = t < ev.c2_slow ? -t * 30 : -30 * (ev.c2_slow + D * (sl - sl * sl / 2));
    P.globe(ctx, 620, 560, 330, t, { lon0: lon, lat0: 18 });
    if (speed > 0.05) P.arcArrow(ctx, 620, 160, 140, Math.PI * 0.85, Math.PI * (0.85 - 0.7 * speed), { ry: 30, color: C.gold, a: speed });
    P.gauge(ctx, 1400, 560, 250, 1670 * speed, 2000, { a: 1, label: 'spin at the equator' });
    P.stamp(ctx, 'ZERO', 1400, 930, t, ev.c2_zero, { size: 90, color: C.chalk });
    const ku = P.pop(t, ev.c2_unrec, 0.4); if (ku > 0) P.at(ctx, 620, 560, ku, 0, () => G.text(ctx, '?', 0, 90, { size: 300, fam: FT.title, color: C.gold, align: 'center', alpha: 0.85, boil: 0 }));
  }, { in: { type: 'fade', dur: 0.5 } });
})();
