// Chapter 2 — The flash: annihilation, mass → pure energy (E = mc²), nothing left · 1 g + 1 g ≈ a big (1 GW) power station for two days ·
// MYTH #2 super fuel / super bomb → reality check: CERN's antimatter factory, a whole year of antiprotons = a 100 W bulb for ≈ 5 s ·
// making it is slow, keeping it is harder: touch a wall → gone
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L } = S; const C = P.C;
  const W = G.W, H = G.H;
  const weight = (ctx, x, y, s, label, anti, k) => { if (k <= 0.01) return; P.at(ctx, x, y, s * ease.outBack(clamp(k), 1.8), 0, () => {
    const col = anti ? C.acc : C.ink; P.iPoly(ctx, [[-90, 70], [-70, -40], [70, -40], [90, 70]], col, { shade: 0.5 }); P.iRect(ctx, -30, -80, 60, 46, 20, col);
    G.text(ctx, '1 g', 0, 30, { size: 58, fam: 'Inter', weight: 900, color: C.pap, align: 'center', boil: 0 }); G.text(ctx, label, 0, 130, { size: 34, fam: 'Inter', weight: 900, color: col, align: 'center', boil: 0 }); }); };

  P.cardShot('c2', 2, 'The flash', (ctx, t) => { P.flash(ctx, 1700, 900, t, S.CH.c2.t0 + 0.6 + ((t - S.CH.c2.t0) > 2.2 ? 1.6 : 0), { r: 120, n: 8, seed: 5 }); });

  // S1 — annihilation: mass → energy (light), E = mc², nothing left over
  P.shot(ev.c2_s1, (ctx, t) => {
    P.bgLine(ctx, t);
    const tm = ev.c2_ann; const u = P.eio((t - ev.c2_s1) / Math.max(0.4, tm - ev.c2_s1)); const d = 460 * (1 - u);
    if (t < tm) { P.part(ctx, 760 - d * 0.6, 470, 80, 'e', { k: P.dk(t, ev.c2_s1, 0.4) }); P.part(ctx, 760 + d * 0.6, 470, 80, 'p', { k: P.dk(t, ev.c2_s1 + 0.15, 0.4) }); }
    P.flash(ctx, 760, 470, t, tm, { r: 320, n: 14, seed: 2, dur: 1.8 });
    P.rslam(ctx, 'ANNIHILATION', 760, 860, t, tm, { size: 96, t1: ev.c2_emc - 0.2 });
    // mass → energy arrow
    const ak = P.dk(t, ev.c2_mass, 0.5); if (ak > 0) { P.tag(ctx, 'MASS', 1250, 330, t, ev.c2_mass, 1e9, { size: 44, fill: C.ink, color: C.pap }); P.carrow(ctx, 1250, 380, 1500, 560, -0.25, P.dk(t, ev.c2_energy - 0.2, 0.5), { color: C.acc, lw: 7 }); }
    P.tag(ctx, 'ENERGY', 1580, 620, t, ev.c2_energy, 1e9, { size: 44, fill: C.yel, color: C.ink });
    P.note(ctx, 'mostly light', null, null, 1580, 720, t, ev.c2_light, { size: 46 });
    const ek = P.pop(t, ev.c2_emc, 0.4); if (ek > 0) P.at(ctx, 760, 880, ek, -0.02, () => P.rtext(ctx, 'E = mc²', 0, 40, { size: 150 }));
    P.note(ctx, 'nothing left over', null, null, 1520, 930, t, ev.c2_nothing, { size: 54 });
  }, { in: { type: 'flash', dur: 0.3 } });

  // S2 — 1 g + 1 g → a big power station for two days
  P.shot(ev.c2_s2, (ctx, t) => {
    P.bgLine(ctx, t, { corner: 0 });
    const tm = ev.c2_rel; const u = P.eio((t - ev.c2_g2 - 0.2) / Math.max(0.3, tm - ev.c2_g2 - 0.2)); const d = 230 * (1 - u);
    if (t < tm + 0.05) { weight(ctx, 520 - d, 520, 1.1, 'ANTIMATTER', true, P.dk(t, ev.c2_g1 - 0.2, 0.4)); weight(ctx, 520 + d + 0, 520, 1.1, 'MATTER', false, P.dk(t, ev.c2_g2 - 0.2, 0.4)); }
    P.flash(ctx, 520, 520, t, tm, { r: 300, n: 12, seed: 4, dur: 1.5 });
    P.write(ctx, 'ENORMOUS.', 520, 200, t, ev.c2_enorm, { size: 80, weight: 900, color: C.acc });
    P.plant(ctx, 1320, 700, 1.0, t, { k: P.dk(t, Math.min(ev.c2_plant - 0.3, ev.c2_rel + 0.6), 0.7) });
    P.lcount(ctx, { x: 1420, y: 930, from: 0, to: 2, t, t0: ev.c2_days - 0.6, t1: ev.c2_days, size: 120, suffix: ' DAYS', align: 'center' });
    P.small(ctx, 'OF A BIG (1 GW) POWER STATION', 1420, 1020, { align: 'center', size: 30, alpha: P.fin(t, ev.c2_days, 0.4) });
    P.small(ctx, '2 g × c² ≈ 1.8 × 10¹⁴ J  ·  1 GW × 1 day ≈ 8.6 × 10¹³ J  (our calculation)', 60, 1050, { size: 22, alpha: P.fin(t, ev.c2_days + 0.4, 0.4) });
  }, { in: { type: 'push', dir: 'left', dur: 0.45 } });

  // S3 — MYTH #2: super fuel / super bomb → REALITY CHECK
  P.shot(ev.c2_s3, (ctx, t) => {
    P.bgLine(ctx, t);
    P.rslam(ctx, 'MYTH #2', 960, 200, t, ev.c2_myth, { size: 96 });
    const fk = P.pop(t, ev.c2_fuel - 0.1, 0.4); if (fk > 0) P.at(ctx, 620, 560, fk, -0.06, () => { P.iPoly(ctx, [[0, -220], [70, -80], [70, 140], [-70, 140], [-70, -80]], C.ink, { shade: 0.5 }); P.iCirc(ctx, 0, -40, 34, C.pap);
      P.iPoly(ctx, [[-70, 60], [-140, 160], [-70, 140]], C.acc); P.iPoly(ctx, [[70, 60], [140, 160], [70, 140]], C.acc); P.iPoly(ctx, [[-50, 140], [0, 260 + Math.sin(t * 20) * 14], [50, 140]], C.yel); G.text(ctx, 'SUPER FUEL?', 0, 360, { size: 48, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0 }); });
    const bk = P.pop(t, ev.c2_bomb - 0.1, 0.4); if (bk > 0) P.at(ctx, 1300, 580, bk, 0.05, () => { P.iCirc(ctx, 0, 0, 130, C.acc, { shade: 0.6 }); P.iRect(ctx, -30, -170, 60, 50, 6, C.ink); P.art(ctx, [[[0, -170], [30, -230], [70, -240]]], 1, { lw: 6 }); P.star(ctx, 74, -244, 26 + Math.sin(t * 18) * 5, C.yel); G.text(ctx, 'SUPER BOMB?', 0, 340, { size: 48, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0 }); });
    const rk = P.pop(t, ev.c2_check, 0.35); if (rk > 0) P.at(ctx, 960, 560, rk, -0.08, () => { P.iRect(ctx, -380, -80, 760, 160, 14, C.yel, { shade: 0.3 }); P.art(ctx, [P.rrPts(-380, -80, 760, 160, 14)], 1, { lw: 6 }); G.text(ctx, 'REALITY CHECK', 0, 30, { size: 84, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0 }); });
  }, { in: { type: 'wipe', dir: 'up', dur: 0.45, color: C.acc } });

  // S4 — CERN, near Geneva: the antimatter factory; a whole year of antiprotons → a 100 W bulb for ≈ 5 seconds
  P.shot(ev.c2_s4, (ctx, t) => {
    P.bgLine(ctx, t);
    const pr = P.globe(ctx, 330, 330, 230, t, { lon0: 6 - (t - ev.c2_s4) * 0.8, lat0: 40, k: P.dk(t, ev.c2_s4, 1.0), land: C.blueW });
    const p = pr(6.05, 46.23); if (p[2] > 0 && t > ev.c2_cern) { P.ring(ctx, p[0], p[1], t, ev.c2_cern, { r: 70, color: C.acc }); P.iCirc(ctx, p[0], p[1], 12, C.acc); P.note(ctx, 'CERN, near Geneva', p[0], p[1], p[0] + 260, p[1] + 260, t, ev.c2_geneva, { size: 44 }); }
    P.accel(ctx, 1000, 430, 200, t, { k: P.dk(t, ev.c2_fact - 0.4, 0.7), color: C.ink, speed: 2.2, n: 5, kind: 'pbar' });
    P.write(ctx, 'ANTIMATTER FACTORY', 1000, 740, t, ev.c2_fact, { size: 46, weight: 900 });
    P.tag(ctx, '1 YEAR NON-STOP', 1000, 160, t, ev.c2_year, 1e9, { size: 40, fill: C.ink, color: C.pap });
    // the bulb: lit for 5 s after "bulb", with a countdown
    const t0 = ev.c2_bulb, on = t >= t0 && t < t0 + 5 ? 1 : (t >= t0 + 5 ? Math.max(0, 1 - (t - t0 - 5) / 0.3) : 0);
    P.bulb(ctx, 1560, 520, 1.25, t, { k: P.dk(t, ev.c2_bulb - 0.5, 0.4), on });
    if (t >= t0) { const left = Math.max(0, 5 - (t - t0)); G.text(ctx, left > 0 ? left.toFixed(1) + ' s' : 'OFF', 1560, 880, { size: 84, fam: 'Inter', weight: 900, color: left > 0 ? C.acc : C.ink2, align: 'center', boil: 0 }); }
    P.small(ctx, '100 W', 1560, 250, { align: 'center', size: 34, alpha: P.fin(t, ev.c2_bulb, 0.3) });
    P.source(ctx, 'CERN — "about 500 joules … a 100 W light bulb for five seconds"', t, ev.c2_bulb + 0.5);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — slow to make, harder to keep: the particle drifts to the jar wall → flash → gone
  P.shot(ev.c2_s5, (ctx, t) => {
    P.bgLine(ctx, t);
    P.write(ctx, 'MAKING IT: SLOW', 520, 220, t, ev.c2_slow - 0.1, { size: 56, weight: 900 });
    P.clockFace(ctx, 520, 520, 150, t, (t - ev.c2_s5) * 0.15, P.dk(t, ev.c2_s5, 0.5));
    P.write(ctx, 'KEEPING IT: HARDER', 1360, 220, t, ev.c2_harder - 0.1, { size: 56, weight: 900, color: C.acc });
    const jk = P.dk(t, ev.c2_harder - 0.3, 0.6); P.art(ctx, [[[1160, 340], [1160, 880], [1560, 880], [1560, 340]]], jk, { lw: 8 }); P.iRect(ctx, 1160, 340, 400, 540, 0, C.blueW, { a: jk * 0.5 });
    const tw = ev.c2_wall; const u = clamp((t - (ev.c2_harder + 0.2)) / Math.max(0.3, tw - ev.c2_harder - 0.2)); const px = lerp(1360, 1560 - 30, ease.inCubic(u)), py = 610 + Math.sin(t * 3) * 30;
    if (t < tw) P.part(ctx, px, py, 30, 'p', { k: jk });
    P.flash(ctx, 1545, py, t, tw, { r: 160, n: 8, seed: 9 });
    P.rslam(ctx, 'GONE.', 1360, 990, t, ev.c2_gone, { size: 100 });
    Ch.elle(ctx, { x: 860, y: 1060, s: 0.55, t, gesture: t > ev.c2_wall ? 'worried' : 'idle', mouth: P.talk(t), sweat: P.dk(t, ev.c2_wall, 0.4), look: 1 });
  }, { in: { type: 'push', dir: 'up', dur: 0.45 } });
})();
