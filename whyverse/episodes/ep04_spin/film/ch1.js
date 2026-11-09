// Chapter 1 — The ride you never feel: one turn in 23 h 56 min · 40,000 km → 1,670 km/h · speed by latitude · lighter on the
// equator · pouring a drink at 900 km/h · ground, air, oceans and you move together … until one stops.
(function () {
  const { U, G, Ch, P, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  P.cardShot('c1', 1, 'The ride you never feel', (ctx, t) => { P.board(ctx, t); P.globe(ctx, 1640, 900, 260, t, { lon0: -t * 18, lat0: 20, a: 0.35 }); });

  // S1 — from above the North Pole: one full turn against a fixed star = 23 h 56 min
  P.shot(ev.c1_s1, (ctx, t) => {
    P.board(ctx, t); P.stars(ctx, t, { n: 140, seed: 12 });
    const u = clamp((t - ev.c1_turn) / Math.max(1, ev.c1_2356 - ev.c1_turn + 0.3));
    const ang = 360 * ease.inOutCubic(u);
    P.globe(ctx, 640, 560, 330, t, { lon0: 30 - ang, lat0: 90, grid: 0.45 });
    P.label(ctx, 'North Pole, seen from above', 640, 960, { size: 38, align: 'center', color: C.chalk });
    P.arcArrow(ctx, 640, 560, 390, -Math.PI * 0.2, -Math.PI * 0.8, { color: C.gold, lw: 7, a: P.fin(t, ev.c1_turn - 0.3, 0.4) });
    // a pointer from the centre to a fixed far star, plus a marker on the globe (Greenwich-ish) that sweeps around
    const ks = P.fin(t, ev.c1_stars - 0.2, 0.4); P.line(ctx, 640, 560, 1230, 170, C.chalk, 3, ks * 0.6, 1, { dash: true }); if (ks > 0) { P.circle(ctx, 1240, 164, 10, C.gold, 4, ks, { fill: C.gold, fillA: 1, dash: false }); P.label(ctx, 'a distant star', 1270, 150, { size: 36, alpha: ks, color: C.gold }); }
    const p = P.globePt(640, 560, 330, 40, 30, 30 - ang, 90); P.circle(ctx, p.x, p.y, 12, C.coral, 5, 1, { fill: C.coral, fillA: 1, dash: false });
    const hrs = 23.9345 * ease.inOutCubic(u); const hh = Math.floor(hrs), mm = Math.floor((hrs - hh) * 60);
    P.clock(ctx, 1460, 560, 150, hrs, (hrs % 1) * 60, { a: P.fin(t, ev.c1_turn, 0.3) });
    G.text(ctx, `${hh} h ${String(mm).padStart(2, '0')} min`, 1460, 820, { size: 84, fam: FT.num, color: t >= ev.c1_2356 ? C.gold : C.chalk, align: 'center', alpha: P.fin(t, ev.c1_turn, 0.3), boil: 0 });
    P.tag(ctx, 'one turn, measured against the stars', 1460, 920, t, ev.c1_2356 + 0.2, 1e9, { size: 40, border: C.gold });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — a dot runs the whole equator: 40,000 km in a day → 1,670 km/h
  P.shot(ev.c1_s2, (ctx, t) => {
    P.board(ctx, t);
    const cx = 620, cy = 560, R = 300; const lon = -t * 12;
    const u = clamp((t - ev.c1_around) / 3.0);
    // the equator as a ring around the globe; back half drawn first
    P.stroke(ctx, (c) => { c.beginPath(); c.ellipse(cx, cy, R * 1.0, R * 0.2, 0, Math.PI, 2 * Math.PI); }, C.gold, 5, 0.5, { seed: 8 });
    P.globe(ctx, cx, cy, R, t, { lon0: lon, lat0: 11, equator: 1 });
    const an = Math.PI * 0.5 + u * 6.283; const dx = cx + Math.cos(an) * R, dy = cy + Math.sin(an) * R * 0.2;
    P.stroke(ctx, (c) => { c.beginPath(); c.ellipse(cx, cy, R, R * 0.2, 0, Math.PI * 0.5, an); }, C.gold, 9, P.fin(t, ev.c1_around, 0.2), { seed: 9 });
    if (Math.sin(an) > -0.2 && u > 0) { P.circle(ctx, dx, dy, 14, C.coral, 5, 1, { fill: C.coral, fillA: 1, dash: false }); }
    P.counter(ctx, { x: 1380, y: 300, from: 0, to: 40000, t, t0: ev.c1_40k0, t1: ev.c1_40k, size: 120, sub: 'km around the equator', color: C.chalk });
    const kd = P.fin(t, ev.c1_40k + 0.2, 0.4);
    G.text(ctx, '÷  23.93 h', 1380, 560, { size: 70, fam: FT.num, color: C.dim, align: 'center', alpha: kd, boil: 0 });
    P.line(ctx, 1150, 600, 1610, 600, C.chalk, 5, kd, P.oc(kd));
    P.stamp(ctx, '1,670 km/h', 1380, 720, t, ev.c1_1670, { size: 96, color: C.gold });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S3 — smaller circles near the poles: speed by latitude (Equator · Baku · London · North Pole)
  const SITES = [['Equator', 0, 1670, C.gold], ['Baku', 40.4, 1270, C.coral], ['London', 51.5, 1040, C.sky], ['North Pole', 90, 0, C.chalk]];
  P.shot(ev.c1_s3, (ctx, t) => {
    P.board(ctx, t);
    const cx = 520, cy = 570, R = 330, lon0 = 20, lat0 = 18;
    P.globe(ctx, cx, cy, R, t, { lon0, lat0, grid: 0.18 });
    const ks = P.fin(t, ev.c1_smaller - 0.6, 0.5);
    // latitude rings for each site
    SITES.forEach(([name, lat, v, col], i) => { if (lat >= 89) return; const k = i === 0 ? ks : P.fin(t, [0, ev.c1_baku, ev.c1_london][i] - 0.2, 0.4); if (k <= 0) return;
      ctx.save(); ctx.lineWidth = 6; ctx.strokeStyle = col; ctx.globalAlpha = k; ctx.beginPath(); let st = false; for (let lo = -180; lo <= 180; lo += 4) { const p = P.globePt(cx, cy, R, lo, lat, lon0, lat0); if (!p.vis) { st = false; continue; } st ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); st = true; } ctx.stroke(); ctx.restore(); });
    const pins = [[0, 32, 0], [1, 49.9, 40.4], [2, -0.1, 51.5], [3, 0, 90]];
    pins.forEach(([i, lo, la]) => { const tt = [ev.c1_smaller - 0.2, ev.c1_baku, ev.c1_london, ev.c1_pole][i]; const p = P.globePt(cx, cy, R, lo, la, lon0, lat0); P.pin(ctx, p.x, p.y, SITES[i][0], t, tt, { color: SITES[i][3], side: i === 2 ? -1 : 1, size: 34 }); });
    // bars on the right
    SITES.forEach(([name, lat, v, col], i) => { const t0 = [ev.c1_smaller - 0.2, ev.c1_baku, ev.c1_london, ev.c1_pole][i];
      P.hbar(ctx, { x: 1060, y: 250 + i * 170, w: 600, h: 58, frac: Math.max(0.012, v / 1670), t, t0, color: col, label: name, value: v ? Data.number(v) : '0', seed: 40 + i }); });
    P.label(ctx, 'km/h', 1660, 210, { size: 34, align: 'right' });
    // Axel turns on the spot at the North Pole
    const kp = P.pop(t, ev.c1_spot, 0.4); if (kp > 0) { const p = P.globePt(cx, cy, R, 0, 90, lon0, lat0); ctx.save(); ctx.translate(p.x, p.y); ctx.scale(Math.cos((t - ev.c1_spot) * 5), 1); Ch.axel(ctx, { x: 0, y: 0, s: 0.3 * kp, t, mouth: 'smile', eyes: 'happy' }); ctx.restore(); }
  }, { in: { type: 'fade', dur: 0.5 } });

  // S4 — the scale: on the equator the spin makes you about a third of a percent lighter
  P.shot(ev.c1_s4, (ctx, t) => {
    P.board(ctx, t);
    P.globe(ctx, 960, 1520, 900, t, { lon0: -t * 8 + 20, lat0: 0, equator: 1, grid: 0.2 });
    const fl = P.fin(t, ev.c1_fling - 0.2, 0.4);
    // scale
    P.stroke(ctx, (c) => P.rr(c, 820, 600, 280, 70, 18), C.chalk, 6, 1, { fill: C.glass, fillA: 1, seed: 3 });
    const kg = lerp(70, 70 * (1 - 0.0035), P.oc((t - ev.c1_third + 0.3) / 0.6));
    G.text(ctx, kg.toFixed(2) + ' kg', 960, 652, { size: 44, fam: FT.num, color: t > ev.c1_third ? C.gold : C.chalk, align: 'center', boil: 0 });
    Ch.axel(ctx, { x: 960, y: 600 - 8 * fl, s: 1.1, t, mouth: Ch.axelMouth(t), eyes: t > ev.c1_third ? 'happy' : 'normal', gesture: t > ev.c1_third ? 'cheer' : 'idle' });
    P.arrow(ctx, 960, 200, 960, 60, { color: C.gold, a: fl, k: P.oc(fl) });
    P.label(ctx, 'the spin flings you outward', 1000, 130, { size: 42, color: C.gold, alpha: fl });
    P.stamp(ctx, '0.35% LIGHTER', 1480, 420, t, ev.c1_third, { size: 70, color: C.gold, rot: 0.04 });
    P.label(ctx, 'than if the planet stood still', 1480, 520, { size: 36, align: 'center', alpha: P.fin(t, ev.c1_third + 0.4, 0.4) });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S5 — a smooth flight: pour a drink at 900 km/h (you feel changes in speed, not speed)
  P.shot(ev.c1_s5, (ctx, t) => {
    P.board(ctx, t);
    // cabin window with clouds streaming past
    const wx = 1180, wy = 160, ww = 560, wh = 420;
    ctx.save(); P.rr(ctx, wx, wy, ww, wh, 140); ctx.clip(); ctx.fillStyle = '#2D4A73'; ctx.fillRect(wx, wy, ww, wh);
    for (let i = 0; i < 7; i++) { const x = wx + ww + 200 - (((t * 260) + i * 190) % (ww + 400)), y = wy + 60 + U.hash(i, 9) * (wh - 120); P.stroke(ctx, (c) => { c.beginPath(); c.ellipse(x, y, 90 + 40 * U.hash(i, 3), 30, 0, 0, 7); }, C.chalk, 4, 0.8, { fill: C.chalk, fillA: 0.35, seed: i }); }
    ctx.restore(); P.stroke(ctx, (c) => P.rr(c, wx, wy, ww, wh, 140), C.chalk, 8, 1, { seed: 4 });
    P.tag(ctx, '900 km/h', wx + ww / 2, wy + wh + 70, t, ev.c1_900, 1e9, { size: 56, border: C.gold });
    // seat + Axel pouring from a jug into a cup on a tray
    P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(380, 980); c.lineTo(380, 520); c.quadraticCurveTo(380, 470, 430, 470); c.lineTo(470, 470); c.lineTo(470, 840); c.lineTo(760, 840); c.lineTo(760, 980); }, C.sky, 10, 1, { fill: C.sky, fillA: 0.15, seed: 6 });
    P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(780, 720); c.lineTo(1080, 720); }, C.chalk, 8, 1, { seed: 7 });
    Ch.axel(ctx, { x: 560, y: 840, s: 1.15, t, pose: 'sit', gesture: 'hold', mouth: Ch.axelMouth(t), look: 0.6, eyes: t > ev.c1_pour + 1 ? 'happy' : 'normal' });
    const kp = P.fin(t, ev.c1_pour - 0.4, 0.4); const jx = 860, jy = 560;
    P.at(ctx, jx, jy, 1, -0.6 * kp, () => P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(-40, -50); c.lineTo(40, -50); c.lineTo(50, 50); c.lineTo(-50, 50); c.closePath(); c.moveTo(40, -40); c.lineTo(80, -70); }, C.chalk, 6, 1, { fill: C.coral, fillA: 0.3, seed: 8 }));
    const pour = P.win(t, ev.c1_pour, ev.c1_pour + 2.6, 0.2); if (pour > 0) { P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(918, 516); c.quadraticCurveTo(940, 560, 940, 680); }, C.coral, 8, pour, { dash: false }); }
    const fillLv = clamp((t - ev.c1_pour) / 2.6); P.at(ctx, 940, 700, 1, 0, () => { P.icon(ctx, 'cup', 0, 0, 38, { seed: 92 }); ctx.save(); ctx.globalAlpha = 0.8; ctx.fillStyle = C.coral; ctx.fillRect(-15, 19 - 32 * fillLv, 30, 32 * fillLv); ctx.restore(); });
    P.write(ctx, 'you feel CHANGES in speed —', 600, 170, t, ev.c1_feel - 0.2, { size: 58, dur: 0.6 });
    P.write(ctx, 'not speed itself', 600, 250, t, ev.c1_feel + 0.4, { size: 58, color: C.gold, dur: 0.5 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S6 — ground, air, oceans, you: four arrows marching together
  const ROWS = [['THE GROUND', '#C9A27A'], ['THE AIR', C.sky], ['THE OCEANS', C.ocean], ['YOU', C.gold]];
  const rowsDraw = (ctx, t, stopT) => {
    ROWS.forEach(([s, col], i) => { const t0 = ev.c1_four[i]; const k = P.pop(t, t0, 0.35); if (k <= 0) return; const y = 230 + i * 190;
      G.text(ctx, s, 120, y + 20, { size: 54, fam: FT.title, color: col === C.ocean ? C.sky : col, align: 'left', alpha: clamp(k), boil: 0 });
      const ground = i === 0 && stopT && t > stopT; const tt = ground ? stopT : t; const off = ((tt * 1.2) % 1) * 160;
      for (let j = 0; j < 6; j++) { const x = 600 + j * 200 + off; if (x > W + 60) continue; P.arrow(ctx, x, y, x + 110, y, { color: ground ? C.red : col === C.ocean ? C.sky : col, lw: 8, a: clamp(k) * (ground ? 0.85 : 1), seed: i * 10 + j }); } });
  };
  P.shot(ev.c1_s6, (ctx, t) => {
    P.board(ctx, t); rowsDraw(ctx, t, null);
    const kt = P.fin(t, ev.c1_together - 0.1, 0.4); if (kt > 0) { P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(1800, 200); c.quadraticCurveTo(1850, 200, 1850, 260); c.lineTo(1850, 760); c.quadraticCurveTo(1850, 820, 1800, 820); }, C.gold, 7, kt, { seed: 5 }); }
    P.tag(ctx, 'all moving together', 1500, 960, t, ev.c1_together, 1e9, { size: 50, border: C.gold });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S7 — the ground stops; the others don't
  P.shot(ev.c1_s7, (ctx, t) => {
    P.board(ctx, t); ctx.save(); P.shake(ctx, t, ev.c1_stops, 5, 0.25); rowsDraw(ctx, t, ev.c1_stops); ctx.restore();
    P.stamp(ctx, 'STOPPED', 1300, 230, t, ev.c1_stops, { size: 70, color: C.red, rot: -0.04 });
    Ch.axel(ctx, { x: 1700, y: 1000, s: 0.6, t, eyes: t > ev.c1_dont ? 'wide' : 'worried', mouth: t > ev.c1_dont + 0.6 ? 'o' : Ch.axelMouth(t), look: -0.5, gesture: t > ev.c1_dont ? 'shrug' : 'idle' });
  }, { in: { type: 'cut' } });
})();
