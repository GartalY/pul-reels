// Chapter 5 — It's already slowing down: the Moon's tides brake the spin · +1.8 ms per century · Devonian corals: ~400 days a
// year, 22-hour days · the Moon drifts 3.8 cm/yr (lasers + mirrors) · record shortest day 5 Jul 2024 · 27 leap seconds, retired.
(function () {
  const { U, G, Ch, P, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  P.cardShot('c5', 5, "It's already slowing down", (ctx, t) => { P.board(ctx, t); P.moon(ctx, 1680, 880, 90, {}); });

  // S1 — the Moon raises two tidal bulges; Earth turns under them and the friction acts as a brake
  P.shot(ev.c5_s1, (ctx, t) => {
    P.board(ctx, t); P.stars(ctx, t, { n: 100, seed: 51 });
    const cx = 640, cy = 560, R = 250, mx = 1560, my = 560;
    const km = P.pop(t, ev.c5_moon, 0.45); P.moon(ctx, mx, my, 90 * km, {});
    P.label(ctx, 'Moon', mx, my + 150, { size: 40, align: 'center', color: C.chalk, alpha: clamp(km) });
    const kt = P.eio((t - ev.c5_tides + 0.3) / 1.0); const lead = 0.25 * kt;   // bulge dragged slightly ahead by the spin
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-lead);
    P.stroke(ctx, (c) => { c.beginPath(); c.ellipse(0, 0, R + 30 + 80 * kt, R + 30 - 10 * kt, 0, 0, 7); }, C.sky, 6, 1, { fill: C.ocean, fillA: 0.6, scribble: true, seed: 52 });
    ctx.restore();
    P.globe(ctx, cx, cy, R, t, { lon0: -t * 30, lat0: 90, grid: 0.3 });
    P.arcArrow(ctx, cx, cy, R + 150, Math.PI * 0.6, Math.PI * 0.95, { color: C.gold, lw: 6 }); P.label(ctx, 'spin', cx - 300, cy + 290, { size: 38, color: C.gold });
    P.line(ctx, cx, cy, mx - 100, my, C.dim, 3, km * 0.6, 1, { dash: true });
    P.label(ctx, 'tidal bulges (exaggerated)', cx, 140, { size: 38, align: 'center', color: C.sky, alpha: kt });
    const kb = P.pop(t, ev.c5_brake, 0.4); if (kb > 0) { P.at(ctx, cx + 270, cy - 260, kb, 0, () => P.icon(ctx, 'brake', 0, 0, 70, { t })); for (let i = 0; i < 6; i++) { const a = (t - ev.c5_brake) * 2 + i; P.circle(ctx, cx + 230 + Math.cos(a * 3) * 60, cy - 220 + Math.sin(a * 2) * 40, 4, C.coral, 3, 0.8 * clamp(kb), { fill: C.coral, fillA: 1, dash: false }); } }
    P.tag(ctx, 'a gentle brake on the spin', 1180, 900, t, ev.c5_brake + 0.2, 1e9, { size: 44, border: C.coral });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — +1.8 milliseconds per century
  P.shot(ev.c5_s2, (ctx, t) => {
    P.board(ctx, t);
    P.counter(ctx, { x: 960, y: 330, from: 0, to: 1.8, decimals: 1, t, t0: ev.c5_18a, t1: ev.c5_18, size: 170, prefix: '+', suffix: ' ms', sub: 'longer day, every century (on average)', color: C.gold });
    // a day as a long bar; the added sliver drawn huge in a zoom bubble
    const kd = P.fin(t, ev.c5_century - 0.4, 0.5);
    P.hbar(ctx, { x: 260, y: 700, w: 1400, h: 70, frac: 1, t, t0: ev.c5_s2 + 0.3, d: 0.8, color: C.sky, label: 'one day: 86,400 seconds', seed: 7 });
    if (kd > 0) { P.circle(ctx, 1660, 735, 22, C.gold, 4, kd, { dash: false }); P.line(ctx, 1676, 720, 1720, 620, C.gold, 3, kd); P.circle(ctx, 1760, 560, 80, C.gold, 5, kd, { fill: C.glass, fillA: 1 }); G.text(ctx, '+0.0018 s', 1760, 572, { size: 34, fam: FT.num, color: C.gold, align: 'center', alpha: kd, boil: 0 }); }
    Ch.axel(ctx, { x: 240, y: 1040, s: 0.6, t, mouth: Ch.axelMouth(t), gesture: 'think', look: 0.6 });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S3 — fossil coral: count the daily growth lines in one year → ~400; a day was ~22 hours
  P.shot(ev.c5_s3, (ctx, t) => {
    P.board(ctx, t);
    const kc = P.pop(t, ev.c5_s3 + 0.3, 0.45); P.ring(ctx, 560, 600, t, ev.c5_coral, { r: 320, color: C.pink }); if (kc > 0) P.at(ctx, 560, 600, kc, 0, () => {
      P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(-170, 300); c.quadraticCurveTo(-240, -40, -110, -280); c.lineTo(110, -280); c.quadraticCurveTo(240, -40, 170, 300); c.closePath(); }, C.pink, 7, 1, { fill: '#7A4A5A', fillA: 0.6, seed: 53 });
      const nl = Math.floor(clamp((t - ev.c5_lines) / 2.2) * 40);
      for (let i = 0; i < nl; i++) { const y = -260 + i * 13.5; const w = 110 + 40 * Math.sin((y + 280) / 580 * Math.PI); P.line(ctx, -w, y, w, y + 3, C.chalk, 2.5, 0.75, 1, { dash: false }); }
      for (let i = 0; i < 4; i++) P.icon(ctx, 'coral', -120 + i * 80, -330, 40, { seed: 54 + i }); });
    P.label(ctx, 'fossil coral, ~400 million years old', 560, 1000, { size: 38, align: 'center', color: C.chalk, alpha: clamp(kc) });
    P.counter(ctx, { x: 1380, y: 300, from: 0, to: 400, t, t0: ev.c5_400a, t1: ev.c5_400, size: 140, prefix: '~', sub: 'daily lines in one year', color: C.pink });
    const kh = P.fin(t, ev.c5_22 - 0.6, 0.4); P.clock(ctx, 1260, 690, 120, lerp(24, 22, P.oc((t - ev.c5_22 + 0.6) / 0.8)), 0, { a: kh });
    P.stamp(ctx, '1 DAY ~22 HOURS', 1460, 900, t, ev.c5_22, { size: 74, color: C.gold });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S4 — the lost spin is handed to the Moon, which drifts away 3.8 cm a year; lasers bounce off mirrors left by astronauts
  P.shot(ev.c5_s4, (ctx, t) => {
    P.board(ctx, t); P.stars(ctx, t, { n: 110, seed: 55 });
    const dr = P.eio((t - ev.c5_drift) / 4); const ex = 380, ey = 560, mx = lerp(1300, 1500, dr), my = 520;
    P.globe(ctx, ex, ey, 200, t, { lon0: -t * 20, lat0: 15 });
    P.moon(ctx, mx, my, 80, {});
    // the "spin" token hops from Earth to the Moon
    const kh = clamp((t - ev.c5_handed + 0.2) / 0.9); if (kh > 0 && kh < 1) { const x = lerp(ex + 200, mx - 80, ease.inOutCubic(kh)), y = lerp(ey - 160, my - 120, kh) - Math.sin(kh * Math.PI) * 120; P.arcArrow(ctx, x, y, 34, 0, 4.5, { color: C.gold, lw: 6, head: 14 }); }
    if (kh >= 1) P.arcArrow(ctx, mx, my, 120, -Math.PI * 0.85, -Math.PI * 0.2, { color: C.gold, lw: 6, a: 0.8 });
    P.arrow(ctx, mx + 110, my + 140, mx + 260, my + 140, { color: C.coral, a: P.fin(t, ev.c5_drift, 0.3), lw: 7 });
    P.counter(ctx, { x: 1500, y: 930, from: 0, to: 3.8, decimals: 1, t, t0: ev.c5_drift + 0.3, t1: ev.c5_38, size: 100, suffix: ' cm', sub: 'farther away, every year', color: C.coral });
    const km = P.pop(t, ev.c5_mirror, 0.4); if (km > 0) { P.at(ctx, mx - 50, my - 10, 0.5 * km, 0, () => P.icon(ctx, 'mirror', 0, 0, 40)); }
    // a laser pulse bouncing Earth → mirror → Earth, repeating
    const kl = P.fin(t, ev.c5_laser - 0.1, 0.2); if (kl > 0) { const ph = ((t - ev.c5_laser) * 0.9) % 1; const x0 = ex + 150, y0 = ey - 130, x1 = mx - 50, y1 = my - 10;
      P.line(ctx, x0, y0, x1, y1, C.red, 2, kl * 0.35, 1, { dash: false }); const q = ph < 0.5 ? ph * 2 : 2 - ph * 2; P.circle(ctx, lerp(x0, x1, q), lerp(y0, y1, q), 9, C.red, 4, kl, { fill: C.red, fillA: 1, dash: false }); P.glow(ctx, lerp(x0, x1, q), lerp(y0, y1, q), 40, C.red, kl); }
    P.label(ctx, 'laser + mirrors left by Apollo astronauts', 960, 140, { size: 40, align: 'center', color: C.chalk, alpha: P.fin(t, ev.c5_laser, 0.4) });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S5 — the spin also wobbles: 5 July 2024, the shortest day ever measured (1.66 ms short)
  P.shot(ev.c5_s5, (ctx, t) => {
    P.board(ctx, t);
    const kw = P.fin(t, ev.c5_wobble - 0.2, 0.4); P.stroke(ctx, (c) => { c.beginPath(); for (let x = 120; x <= 1800; x += 8) { const y = 860 + Math.sin(x / 90 + t * 2) * 30 * Math.sin(x / 400); x === 120 ? c.moveTo(x, y) : c.lineTo(x, y); } }, C.sky, 5, kw, { seed: 56 });
    P.label(ctx, 'length of day: tiny wobbles', 140, 800, { size: 36, color: C.sky, alpha: kw });
    const kc = P.pop(t, ev.c5_july, 0.45); if (kc > 0) P.at(ctx, 600, 430, kc, -0.04, () => {
      P.box(ctx, -260, -230, 520, 460, C.chalk, { seed: 57 }); P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(-260, -120); c.lineTo(260, -120); }, C.red, 6, 1, { seed: 58 });
      G.text(ctx, 'JULY 2024', 0, -150, { size: 48, fam: FT.title, color: C.red, align: 'center', boil: 0 });
      G.text(ctx, '5', 0, 120, { size: 230, fam: FT.title, color: C.chalk, align: 'center', boil: 0 }); });
    P.stamp(ctx, 'SHORTEST DAY ON RECORD', 1300, 330, t, ev.c5_record, { size: 60, color: C.gold });
    P.counter(ctx, { x: 1300, y: 600, from: 0, to: 1.66, decimals: 2, t, t0: ev.c5_166 - 0.6, t1: ev.c5_166, size: 110, prefix: '−', suffix: ' ms', sub: 'shorter than 24 hours', color: C.gold });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S6 — leap seconds: 23:59:60 · 27 added since 1972 · retired
  P.shot(ev.c5_s6, (ctx, t) => {
    P.board(ctx, t);
    const tick = Math.floor((t - ev.c5_s6) * 1.2) % 4; const face = ['23:59:58', '23:59:59', '23:59:60', '00:00:00'][tick];
    P.box(ctx, 220, 240, 760, 260, C.chalk, { seed: 59 });
    G.text(ctx, face, 600, 410, { size: 130, fam: FT.num, color: face.endsWith('60') ? C.gold : C.chalk, align: 'center', boil: 0 });
    P.label(ctx, 'a leap second', 600, 560, { size: 42, align: 'center', color: C.gold, alpha: face.endsWith('60') ? 1 : 0.3 });
    P.counter(ctx, { x: 1420, y: 330, from: 0, to: 27, t, t0: ev.c5_27a, t1: ev.c5_27, size: 150, sub: 'leap seconds added since 1972', color: C.chalk });
    P.stamp(ctx, 'RETIRED', 1420, 760, t, ev.c5_retire, { size: 120, color: C.red, rot: -0.08 });
    P.label(ctx, 'world timekeepers, autumn 2026', 1420, 900, { size: 36, align: 'center', alpha: P.fin(t, ev.c5_retire + 0.4, 0.4) });
    Ch.axel(ctx, { x: 600, y: 1000, s: 0.7, t, mouth: Ch.axelMouth(t), gesture: t > ev.c5_retire ? 'wave' : 'idle', eyes: t > ev.c5_retire ? 'happy' : 'normal' });
  }, { in: { type: 'fade', dur: 0.5 } });
})();
