// Chapter 4 — A day that lasts a year: the orbit with no spin (half a year facing the Sun) · bake / freeze · a calendar where
// one day is one year · Coriolis spins hurricanes → no spinning storms, one big flow · the magnetic shield would likely weaken.
(function () {
  const { U, G, Ch, P, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  P.cardShot('c4', 4, 'A day that lasts a year', (ctx, t) => { P.board(ctx, t); P.sun(ctx, 1680, 880, 90, t, { a: 0.8 }); });

  // a little Earth seen from above with its day half toward (sx, sy); a flag marks one place that never turns
  const miniEarth = (ctx, x, y, r, sx, sy, t, { flag = true } = {}) => {
    const ang = Math.atan2(sy - y, sx - x);
    P.stroke(ctx, (c) => { c.beginPath(); c.arc(x, y, r, 0, 7); }, C.sky, 5, 1, { fill: C.ocean, fillA: 0.8, scribble: true, seed: 3 });
    ctx.save(); ctx.globalAlpha = 0.75; ctx.fillStyle = C.night; ctx.beginPath(); ctx.arc(x, y, r - 2, ang + Math.PI / 2, ang + Math.PI * 1.5); ctx.closePath(); ctx.fill(); ctx.restore();
    if (flag) { const fx = x, fy = y - r; P.line(ctx, fx, fy, fx, fy - 46, C.chalk, 4, 1, 1, { dash: false }); P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(fx, fy - 46); c.lineTo(fx + 30, fy - 38); c.lineTo(fx, fy - 30); c.closePath(); }, C.coral, 3, 1, { fill: C.coral, fillA: 0.9, dash: false }); }
    return Math.cos(ang - (-Math.PI / 2)) > 0; // is the flagged place (top of the disc) facing the Sun?
  };

  // S1 — the orbit with no spin: the flagged place faces the Sun for half the year, away for the other half
  P.shot(ev.c4_s1, (ctx, t) => {
    P.board(ctx, t); P.stars(ctx, t, { n: 120, seed: 41 });
    const cx = 760, cy = 560, rx = 520, ry = 360;
    P.sun(ctx, cx, cy, 80, t);
    P.stroke(ctx, (c) => { c.beginPath(); c.ellipse(cx, cy, rx, ry, 0, 0, 7); }, C.dim, 3, 0.7, { seed: 4 });
    const kd = P.fin(t, ev.c4_face, 0.6);
    // day half of the orbit (Earth above the Sun → flag points away... the place faces the Sun when Earth is BELOW the Sun)
    P.stroke(ctx, (c) => { c.beginPath(); c.ellipse(cx, cy, rx, ry, 0, 0, Math.PI); }, C.gold, 9, kd, { seed: 5 });
    P.stroke(ctx, (c) => { c.beginPath(); c.ellipse(cx, cy, rx, ry, 0, Math.PI, Math.PI * 2); }, '#4A5A80', 9, P.fin(t, ev.c4_away, 0.6), { seed: 6 });
    G.text(ctx, '~6 months of DAY', cx, cy + ry + 70, { size: 50, fam: FT.title, color: C.gold, align: 'center', alpha: kd, boil: 0 });
    G.text(ctx, '~6 months of NIGHT', cx, cy - ry - 40, { size: 50, fam: FT.title, color: C.sky, align: 'center', alpha: P.fin(t, ev.c4_away, 0.6), boil: 0 });
    const u = (t - ev.c4_race + 0.5) * 0.11; const an = Math.PI * 0.15 + u * 6.283;
    const ex = cx + Math.cos(an) * rx, ey = cy + Math.sin(an) * ry; const lit = miniEarth(ctx, ex, ey, 46, cx, cy, t);
    P.label(ctx, lit ? 'facing the Sun' : 'facing away', ex, ey + 92, { size: 32, align: 'center', color: lit ? C.gold : C.sky });
    P.counter(ctx, { x: 1560, y: 290, from: 0, to: 107000, t, t0: ev.c4_race, t1: ev.c4_107, size: 100, suffix: '', sub: 'km/h around the Sun', color: C.chalk });
    P.tag(ctx, 'no spin: the flag never turns', 1560, 560, t, ev.c4_face - 0.6, 1e9, { size: 40, border: C.coral });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — split: six months of baking daylight | six months of freezing dark
  P.shot(ev.c4_s2, (ctx, t) => {
    P.board(ctx, t);
    const kl = P.fin(t, ev.c4_light - 0.3, 0.5), kn = P.fin(t, ev.c4_dark - 0.2, 0.4);
    ctx.save(); ctx.globalAlpha = 0.5 * kl; const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#E8A04A'); g.addColorStop(1, '#8A4A2A'); ctx.fillStyle = g; ctx.fillRect(0, 0, W / 2, H); ctx.restore();
    ctx.save(); ctx.globalAlpha = 0.6 * kn; ctx.fillStyle = '#070C18'; ctx.fillRect(W / 2, 0, W / 2, H); ctx.restore();
    P.line(ctx, W / 2, 40, W / 2, H - 40, C.chalk, 5, 1, 1);
    // day side
    if (kl > 0) { P.sun(ctx, 300, 220, 80, t, { a: kl });
      for (let i = 0; i < 5; i++) { const x = 140 + i * 170, ph = t * 2 + i; P.stroke(ctx, (c) => { c.beginPath(); for (let y = 900; y > 760; y -= 8) c.lineTo(x + Math.sin(y / 18 + ph) * 8, y); }, C.coral, 4, kl * 0.6 * P.fin(t, ev.c4_bake, 0.5), { dash: false }); }
      P.thermo(ctx, 790, 760, lerp(0.4, 0.97, P.oc((t - ev.c4_bake + 0.3) / 1.4)), { h: 380, color: C.red, a: kl, label: 'baking' });
      Ch.axel(ctx, { x: 480, y: 960, s: 1.0, t, sweat: P.fin(t, ev.c4_bake, 0.4), eyes: 'worried', mouth: t < ev.c4_dark - 0.3 ? Ch.axelMouth(t) : 'frown', gesture: 'think', a: kl }); }
    G.text(ctx, '6 MONTHS OF DAYLIGHT', W / 4, 1040, { size: 50, fam: FT.title, color: C.gold, align: 'center', alpha: kl, boil: 0 });
    // night side
    if (kn > 0) { P.moon(ctx, 1640, 220, 60, { a: kn * 0.0 }); P.stars(ctx, t, { n: 70, seed: 43, x0: W / 2, w: W / 2, h: 600, a: kn });
      const kf = P.fin(t, ev.c4_freeze - 0.2, 0.6);
      for (let i = 0; i < 26; i++) { const x = W / 2 + 40 + U.hash(i, 5) * (W / 2 - 80), y = ((t * (40 + 30 * U.hash(i, 6)) + U.hash(i, 7) * 1100) % 1100) - 20; P.stroke(ctx, (c) => { c.beginPath(); for (let k = 0; k < 3; k++) { const a = k * 1.047; c.moveTo(x - Math.cos(a) * 9, y - Math.sin(a) * 9); c.lineTo(x + Math.cos(a) * 9, y + Math.sin(a) * 9); } }, C.ice, 3, kn * (0.4 + 0.6 * kf), { dash: false }); }
      P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(W / 2 + 30, 860); for (let x = W / 2 + 30; x < W - 30; x += 40) c.lineTo(x, 860 + 10 * Math.sin(x / 30)); c.lineTo(W - 30, 1000); c.lineTo(W / 2 + 30, 1000); c.closePath(); }, C.ice, 5, kf, { fill: C.ice, fillA: 0.35, scribble: true, seed: 8 });
      P.thermo(ctx, 1130, 760, lerp(0.5, 0.06, P.oc((t - ev.c4_freeze + 0.3) / 1.4)), { h: 380, color: C.sky, a: kn, label: 'freezing' });
      G.text(ctx, '6 MONTHS OF DARKNESS', W * 0.75, 1040, { size: 50, fam: FT.title, color: C.sky, align: 'center', alpha: kn, boil: 0 }); }
  }, { in: { type: 'fade', dur: 0.5 } });

  // S3 — rooster, owl and a plant tuned to 24 h … on a calendar where one day is one year
  P.shot(ev.c4_s3, (ctx, t) => {
    P.board(ctx, t);
    // the Sun crawls along a sky arc labelled sunrise → sunset
    const su = 0.15 + 0.05 * clamp((t - ev.c4_s3) / 6); const sx = 960 + Math.cos(Math.PI * (1 - su)) * 640, sy = 700 - Math.sin(Math.PI * (1 - su)) * 420;
    P.stroke(ctx, (c) => { c.beginPath(); c.ellipse(960, 700, 640, 420, 0, Math.PI, 2 * Math.PI); }, C.gold, 3, 0.5, { seed: 9 }); P.sun(ctx, sx, sy, 50, t, { rays: 0.6 });
    P.label(ctx, 'sunrise', 320, 750, { size: 36, align: 'center', color: C.gold }); P.label(ctx, 'sunset: in ~6 months', 1600, 750, { size: 36, align: 'center', color: C.gold });
    P.line(ctx, 100, 800, 1820, 800, '#C9A27A', 6, 1);
    const ks = [P.pop(t, ev.c4_s3 + 0.4, 0.4), P.pop(t, ev.c4_s3 + 0.7, 0.4), P.pop(t, ev.c4_s3 + 1.0, 0.4)];
    P.at(ctx, 560, 720, ks[0], Math.sin(t * 3) * 0.05, () => P.icon(ctx, 'rooster', 0, 0, 80, { t }));
    P.at(ctx, 960, 700, ks[1], 0, () => P.icon(ctx, 'owl', 0, 0, 90, { t }));
    P.at(ctx, 1360, 720, ks[2], Math.sin(t * 1.3) * 0.04, () => P.icon(ctx, 'plant', 0, 0, 90, { t }));
    for (let i = 0; i < 3; i++) { const k = P.pop(t, ev.c4_rhythm + 0.4 + i * 0.2, 0.3); if (k > 0) G.text(ctx, '?', [620, 1030, 1420][i], 600, { size: 80 * k, fam: FT.title, color: C.coral, align: 'center', boil: 0 }); }
    const kc = P.pop(t, ev.c4_cal, 0.45); if (kc > 0) P.at(ctx, 960, 280, kc, -0.03, () => {
      P.box(ctx, -330, -150, 660, 300, C.chalk, { seed: 11 }); P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(-330, -70); c.lineTo(330, -70); }, C.red, 6, 1, { seed: 12 });
      G.text(ctx, 'CALENDAR', 0, -95, { size: 40, fam: FT.title, color: C.red, align: 'center', boil: 0 });
      G.text(ctx, '1 DAY = 1 YEAR', 0, 70, { size: 80, fam: FT.title, color: t > ev.c4_year ? C.gold : C.chalk, align: 'center', boil: 0 }); });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S4 — today: the spin bends moving air (Coriolis) and that's what makes hurricanes rotate
  const hurricanes = (ctx, t, cx, cy, R, unwind) => {
    for (const [lon, lat, dir] of [[-60, 22, 1], [130, 18, 1], [80, -16, -1], [160, -20, -1]]) { const p = P.globePt(cx, cy, R, lon, lat, -t * 4 + 20, 10); if (!p.vis) continue;
      ctx.save(); ctx.translate(p.x, p.y); ctx.scale(dir, 1); ctx.globalAlpha *= 1 - unwind; P.icon(ctx, 'hurricane', 0, 0, 70, { t: t * (1 - unwind), color: C.chalk }); ctx.restore(); }
  };
  P.shot(ev.c4_s4, (ctx, t) => {
    P.board(ctx, t);
    P.globe(ctx, 640, 560, 340, t, { lon0: -t * 4 + 20, lat0: 10, grid: 0.25, equator: 0.6 });
    const kh = P.fin(t, ev.c4_hurr - 0.4, 0.5); ctx.save(); ctx.globalAlpha = kh; hurricanes(ctx, t, 640, 560, 340, 0); ctx.restore();
    // a straight path that curves (bent by the spin)
    const kb = P.fin(t, ev.c4_bend - 0.2, 1.0); P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(1180, 260); c.quadraticCurveTo(1460, 260 + 260 * kb, 1520 - 160 * kb, 620); }, C.sky, 7, P.fin(t, ev.c4_bend - 0.2, 0.3), { seed: 13 });
    P.arrow(ctx, 1180, 760, 1700, 760, { color: C.dim, a: P.fin(t, ev.c4_bend - 0.2, 0.3) * 0.7, lw: 5 }); P.label(ctx, 'without spin: straight', 1440, 820, { size: 34, align: 'center', alpha: P.fin(t, ev.c4_bend, 0.3) });
    P.label(ctx, 'with spin: bent', 1500, 230, { size: 34, align: 'center', color: C.sky, alpha: P.fin(t, ev.c4_bend, 0.3) });
    P.stamp(ctx, 'CORIOLIS EFFECT', 1440, 470, t, ev.c4_cor, { size: 60, color: C.gold });
    P.tag(ctx, 'that is what makes hurricanes rotate', 960, 1000, t, ev.c4_hurr, 1e9, { size: 42, border: C.chalk });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S5 — no spin: storms unwind; models suggest one giant slow flow from the hot side to the cold side
  P.shot(ev.c4_s5, (ctx, t) => {
    P.board(ctx, t);
    const un = P.fin(t, ev.c4_nospin, 0.8), half = P.fin(t, ev.c4_flow - 0.6, 0.6);
    const cx = 960, cy = 580, R = 330;
    P.globe(ctx, cx, cy, R, t, { lon0: 20, lat0: 10, grid: 0.2, overlay: (c, RR) => { if (half <= 0) return; c.save(); c.globalAlpha = 0.6 * half; c.fillStyle = C.night; c.fillRect(0, -RR, RR, 2 * RR); c.globalAlpha = 0.25 * half; c.fillStyle = C.sun; c.fillRect(-RR, -RR, RR, 2 * RR); c.restore(); } });
    ctx.save(); ctx.globalAlpha = 1 - half; hurricanes(ctx, ev.c4_nospin, cx, cy, R, un); ctx.restore();
    if (half > 0) { P.sun(ctx, 160, cy, 70, t, { a: half });
      for (let i = 0; i < 3; i++) { const k = P.fin(t, ev.c4_flow + i * 0.2, 0.8); P.arcArrow(ctx, cx, cy, R + 50 + i * 50, Math.PI * 1.25 - 0.1 * i, Math.PI * (1.25 + 0.5 * k) - 0.1 * i, { color: C.coral, lw: 7, a: half, seed: 60 + i });
        P.arcArrow(ctx, cx, cy, R + 50 + i * 50, Math.PI * 0.75 + 0.1 * i, Math.PI * (0.75 - 0.5 * k) + 0.1 * i, { color: C.coral, lw: 7, a: half, seed: 63 + i }); }
      P.label(ctx, 'HOT SIDE', cx - 200, cy + 20, { size: 46, align: 'center', color: C.gold, alpha: half }); P.label(ctx, 'COLD SIDE', cx + 200, cy + 20, { size: 46, align: 'center', color: C.ice, alpha: P.fin(t, ev.c4_cold, 0.3) }); }
    P.stamp(ctx, 'NO SPINNING STORMS', 960, 130, t, ev.c4_nospin, { size: 64, color: C.chalk, t1: ev.c4_flow - 0.2 });
    P.tag(ctx, 'models suggest: one giant, slow flow of air', 960, 1010, t, ev.c4_flow, 1e9, { size: 42, border: C.coral });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S6 — the shield: swirling liquid iron, organised partly by the spin, makes the magnetic field; it would likely weaken
  P.shot(ev.c4_s6, (ctx, t) => {
    P.board(ctx, t);
    const cx = 960, cy = 560, R = 210, wk = P.eio((t - ev.c4_weak) / 1.6);
    // solar wind from the left
    for (let i = 0; i < 30; i++) { const y = 120 + U.hash(i, 3) * 840, x = ((t * 500 + U.hash(i, 4) * 1600) % 1600) - 200; const block = 1 - wk; const stop = 420 + 160 * block; if (x > stop + 300 * wk && Math.abs(y - cy) < 380 * block) continue; P.line(ctx, x, y, x + 90, y, C.gold, 4, 0.75, 1, { dash: false }); }
    P.label(ctx, 'solar wind', 140, 110, { size: 38, color: C.gold });
    // field lines (dipole loops)
    const kf = P.fin(t, ev.c4_s6 + 0.3, 0.6); P.ring(ctx, cx, cy, t, ev.c4_field, { r: 560, color: C.mint });
    for (let i = 1; i <= 5; i++) { const s = i * 70 * (1 - 0.55 * wk); for (const side of [-1, 1]) P.stroke(ctx, (c) => { c.beginPath(); for (let k = 0; k <= 60; k++) { const th = 0.15 + k / 60 * (Math.PI - 0.3); const r = (R + s) * Math.pow(Math.sin(th), 2) * 1.6 + R * 0.2; const x = cx + side * Math.sin(th) * r, y = cy - Math.cos(th) * r; k ? c.lineTo(x, y) : c.moveTo(x, y); } }, C.mint, 4, kf * (1 - 0.75 * wk) * (1 - i * 0.1), { seed: 70 + i + side }); }
    // Earth cut open: mantle + swirling liquid iron core
    P.stroke(ctx, (c) => { c.beginPath(); c.arc(cx, cy, R, 0, 7); }, C.chalk, 6, 1, { fill: '#5A4636', fillA: 0.9, seed: 71 });
    const kc = P.fin(t, ev.c4_s6 + 0.2, 0.4); P.ring(ctx, cx, cy, t, ev.c4_iron, { r: 160, color: C.coral }); P.stroke(ctx, (c) => { c.beginPath(); c.arc(cx, cy, R * 0.55, 0, 7); }, C.coral, 5, kc, { fill: '#C8642F', fillA: 0.7, seed: 72 });
    for (let i = 0; i < 4; i++) P.arcArrow(ctx, cx + (i % 2 ? 40 : -40), cy + (i < 2 ? -35 : 35), 34, t * 2 * (1 - wk * 0.8) + i, t * 2 * (1 - wk * 0.8) + i + 3.5, { color: C.gold, lw: 4, head: 10, a: kc, seed: 73 + i });
    P.label(ctx, 'liquid iron', cx, cy + R + 60, { size: 36, align: 'center', color: C.coral, alpha: kc });
    P.icon(ctx, 'magnet', 1560, 300, 80, { a: kf });
    P.tag(ctx, "Earth's magnetic shield", 1560, 440, t, ev.c4_field, 1e9, { size: 42, border: C.mint });
    P.stamp(ctx, 'WEAKER?', 1560, 640, t, ev.c4_weak + 0.2, { size: 84, color: C.red });
    P.label(ctx, 'what many scientists expect', 1560, 760, { size: 34, align: 'center', alpha: P.fin(t, ev.c4_weak + 0.5, 0.4) });
  }, { in: { type: 'fade', dur: 0.5 } });
})();
