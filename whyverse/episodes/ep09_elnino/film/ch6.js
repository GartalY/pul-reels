// Chapter 6 — The record breaker: El Niño is ancient (fossil corals, ≥ 7,000 years) · on a warmer planet: Galápagos corals suggest recent
// El Niños are the strongest in 1,000 years; how much warming adds is still debated · Oct 2026: Niño 3.4 = 29.94 °C, +3.21 °C, records
// beating 1982–83 / 1997–98 / 2015–16 · NOAA ≈ 60 % chance strongest since 1950; WMO: peak ≈ December, lasting into February ·
// already felt: India −13 %, Indonesia fires, Peru "extraordinary" · Met Office: 2027 very likely the hottest year on record.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  P.trophy = (ctx, x, y, s, lab, { a = 1, fall = 0, col = C.gold } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate(fall * 1.4); ctx.translate(fall * 60, fall * 30); ctx.scale(s, s); ctx.globalAlpha *= a;
    P.iR(ctx, -60, -20, 120, 30, 4, C.land2, { lw: 5 }); P.iR(ctx, -20, -70, 40, 50, 4, col, { lw: 5 }); P.iP(ctx, [[-80, -200], [80, -200], [50, -100], [0, -70], [-50, -100]], col, { lw: 6, curve: false, dots: C.yel2, dotA: 0.4 });
    P.stroke(ctx, (c) => { c.beginPath(); c.arc(-80, -160, 34, 1.2, 4.6); }, C.ink, 7); P.stroke(ctx, (c) => { c.beginPath(); c.arc(80, -160, 34, -1.4, 1.9); }, C.ink, 7);
    G.text(ctx, lab, 0, 34, { size: 38, fam: 'Bangers', color: C.ink, align: 'center', boil: 0 }); ctx.restore(); };

  P.cardShot('c6', 6, 'The record breaker', C.red, (ctx, t) => { P.thermo(ctx, 1700, 980, 380, 0.85 + 0.05 * Math.sin(t * 2), { w: 50 }); P.trophy(ctx, 220, 1020, 1.2, 'RECORD'); });

  // S1 — El Niño is ancient: fossil corals record it for at least 7,000 years, long before cars and factories
  P.shot(ev.c6_s1, (ctx, t) => {
    P.bgPaper(ctx, t, { tint: 'rgba(214,170,110,0.25)' });
    P.slam(ctx, 'ANCIENT!', 520, 140, t, ev.c6_anc, { size: 120, color: C.yel });
    // a fossil coral slab with growth bands; the band widths wiggle like an ENSO record
    const fk = P.pop(t, ev.c6_fossil, 0.4); if (fk > 0) P.at(ctx, 520, 560, fk, -0.05, () => { P.iE(ctx, 0, 0, 330, 250, '#E9D9B8', { lw: 7, shadow: 1, dots: C.land2, dotA: 0.3 });
      ctx.save(); ctx.beginPath(); ctx.ellipse(0, 0, 326, 246, 0, 0, 7); ctx.clip(); for (let i = 0; i < 26; i++) { const x = -320 + i * 26 + 8 * Math.sin(i * 1.7); P.line(ctx, x, -260, x + 12, 260, i % 3 ? '#B89A6A' : '#8E6E42', 4 + 3 * Math.abs(Math.sin(i * 0.9 + 1))); } ctx.restore();
      G.text(ctx, 'FOSSIL CORAL', 0, 300, { size: 44, fam: 'Bangers', color: C.ink, align: 'center', boil: 0 }); });
    const pts = []; for (let i = 0; i <= 80; i++) pts.push([1000 + i * 10, 480 - Math.sin(i * 0.55) * 60 * (0.5 + 0.5 * Math.sin(i * 0.13)) - Math.sin(i * 1.3) * 18]);
    P.trace(ctx, pts, P.oc((t - ev.c6_rise + 0.2) / 1.4), C.red, 8); P.lab(ctx, 'WARM', 990, 400, { size: 28, color: C.red, align: 'right', a: P.fin(t, ev.c6_rise, 0.3) }); P.lab(ctx, 'COOL', 990, 580, { size: 28, color: C.blue, align: 'right', a: P.fin(t, ev.c6_fall, 0.3) });
    P.line(ctx, 1000, 760, 1820, 760, C.ink, 7, P.fin(t, ev.c6_7ka - 0.4, 0.3)); for (let i = 0; i <= 7; i++) P.line(ctx, 1000 + i * 117, 744, 1000 + i * 117, 776, C.ink, 5, P.fin(t, ev.c6_7ka - 0.4, 0.3));
    P.ccount(ctx, { x: 1410, y: 900, to: 7000, prefix: '≥ ', suffix: ' YEARS', t, t0: ev.c6_7ka, t1: ev.c6_7k, size: 100, card: false, color: C.yel });
    const ck = P.pop(t, ev.c6_cars, 0.4); if (ck > 0) P.at(ctx, 1810, 700, ck, 0, () => { P.iR(ctx, -50, -30, 100, 40, 10, C.red, { lw: 4 }); P.iC(ctx, -26, 12, 12, C.ink, { lw: 0 }); P.iC(ctx, 26, 12, 12, C.ink, { lw: 0 }); P.iR(ctx, -20, -120, 30, 70, 2, C.grey, { lw: 4 }); P.iR(ctx, 14, -100, 40, 50, 2, C.grey, { lw: 4 }); });
    P.lab(ctx, 'cars & factories →', 1680, 640, { size: 28, a: P.fin(t, ev.c6_cars, 0.3) });
    P.source(ctx, 'Cobb et al., Science (2013) · Scripps', t, ev.c6_7k);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — today, on a warmer planet: Galápagos corals suggest recent El Niños are the strongest in 1,000 years · how much is still debated
  P.shot(ev.c6_s2, (ctx, t) => {
    ctx.fillStyle = C.sea; ctx.fillRect(-600, -600, W + 1200, H + 1200);
    const m = P.pac(); const pj = P.drawMap(ctx, m, -300, 540 - m.h * 0.95 / 2, 0.95); const gp = pj(-90.5, -0.6);
    { const wa = P.fin(t, ev.c6_warmer, 0.8); if (wa > 0) { ctx.save(); ctx.globalAlpha *= 0.5 * wa; ctx.drawImage(P.dotGrad('warmR', C.red, { dir: 'radial', r0: 0, r1: 7, gap: 18 }), 0, 0); ctx.restore(); } }
    P.caption(ctx, 'A WARMER PLANET', 70, 60, t, ev.c6_warmer, { size: 50, fill: C.warm2 });
    if (t > ev.c6_gal - 0.2) Data.pin(ctx, gp[0], gp[1], { t, at: ev.c6_gal - 0.1, label: 'GALÁPAGOS', color: C.red });
    // the 1,000-year strip
    const sk = P.fin(t, ev.c6_1000 - 0.6, 0.4); if (sk > 0) { ctx.save(); ctx.globalAlpha *= sk; P.iR(ctx, 160, 760, 1600, 220, 8, C.cream, { lw: 6, shadow: 1 });
      for (let i = 0; i < 40; i++) { const h = 30 + 50 * Math.abs(Math.sin(i * 1.9 + 0.5)) * (i > 36 ? 2.0 : 0.8); P.rect(ctx, 200 + i * 38, 940 - h, 26, h, 4, i > 36 ? C.red : C.cyan); }
      G.text(ctx, '1,000 YEARS AGO', 200, 800, { size: 30, fam: 'Bangers', color: C.ink, boil: 0 }); G.text(ctx, 'RECENT DECADES', 1720, 800, { size: 30, fam: 'Bangers', color: C.red, align: 'right', boil: 0 }); G.text(ctx, 'schematic', 960, 800, { size: 24, fam: 'Inter', weight: 700, color: C.grey, align: 'center', boil: 0 }); ctx.restore(); }
    P.burstStar(ctx, 1150, 380, 150, t, ev.c6_1000, { color: C.yel, text: 'STRONGEST', size: 50, tcol: C.red, sub: 'IN 1,000 YEARS?', subSize: 28 });
    P.fatArrow(ctx, 1500, 620, 1580, 520, { w: 30, color: C.red, k: P.oc((t - ev.c6_stronger) / 0.4) });
    P.cstamp(ctx, 'STILL DEBATED', 600, 260, t, ev.c6_debated, { size: 64, color: C.blue });
    P.source(ctx, 'Cole et al., Science (Aug 2026)', t, ev.c6_1000);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S3 — October 2026: 29.94 °C, +3.21 °C above normal → records, beating 1982–83, 1997–98 and 2015–16
  P.shot(ev.c6_s3, (ctx, t) => {
    P.bgPaper(ctx, t, { rays: 0.45, rayCol: C.red, cy: 440, spin: 0.06 });
    P.cstamp(ctx, 'NOW · OCTOBER 2026', 960, 90, t, ev.c6_now, { size: 56, color: C.navy });
    P.ccount(ctx, { x: 560, y: 360, to: 29.94, decimals: 2, suffix: ' °C', t, t0: ev.c6_s3 + 0.6, t1: ev.c6_2994, size: 140, sub: 'NIÑO 3.4 · MONTHLY AVERAGE', subSize: 30, cardCol: C.red });
    P.ccount(ctx, { x: 1360, y: 360, to: 3.21, decimals: 2, prefix: '+', suffix: ' °C', t, t0: ev.c6_s3 + 1.0, t1: ev.c6_321, size: 140, sub: 'ABOVE THE 1991–2020 AVERAGE', subSize: 30, cardCol: C.warm });
    P.slam(ctx, 'BOTH RECORDS!', 960, 620, t, ev.c6_rec, { size: 110, color: C.yel });
    [[ev.c6_82, '1982–83'], [ev.c6_97, '1997–98'], [ev.c6_15, '2015–16']].forEach(([t0, lab], i) => P.trophy(ctx, 560 + i * 400, 900, 0.9, lab, { a: P.fin(t, ev.c6_s3 + 0.3, 0.3), fall: P.eio((t - t0) / 0.5) }));
    P.source(ctx, 'Copernicus C3S, 5 Nov 2026', t, ev.c6_2994);
  }, { in: { type: 'zoom', dur: 0.5 } });

  // S4 — NOAA: ≈ 60 % chance of the strongest El Niño since 1950 · WMO: peak ≈ December, lasting at least into February
  P.shot(ev.c6_s4, (ctx, t) => {
    P.bgFlat(ctx, t, C.cream, { dotCol: C.cyan, dir: 'up', a: 0.25 });
    // probability dial
    const dk = P.pop(t, Math.min(ev.c6_noaa, ev.c6_s4 + 0.3), 0.4); if (dk > 0) P.at(ctx, 480, 520, dk, 0, () => { P.iC(ctx, 0, 0, 280, C.white, { lw: 8, shadow: 1 });
      ctx.save(); ctx.fillStyle = C.red; ctx.beginPath(); ctx.moveTo(0, 0); const p = 0.6 * P.eio((t - ev.c6_60a) / Math.max(0.4, ev.c6_60 - ev.c6_60a)); ctx.arc(0, 0, 250, -1.57, -1.57 + p * 6.283); ctx.closePath(); ctx.fill(); ctx.restore();
      P.iC(ctx, 0, 0, 150, C.cream, { lw: 6 }); G.text(ctx, Math.round(p * 100) + '%', 0, 30, { size: 96, fam: 'Bangers', color: C.ink, align: 'center', boil: 0 }); });
    P.caption(ctx, 'NOAA: CHANCE OF THE STRONGEST EL NIÑO SINCE 1950', 120, 60, t, ev.c6_noaa + 0.2, { size: 42 });
    P.cstamp(ctx, 'SINCE 1950', 480, 900, t, ev.c6_1950, { size: 54, color: C.blue });
    // WMO forecast curve: Oct → Feb with a December peak
    const ck = P.fin(t, ev.c6_wmo - 0.3, 0.4); if (ck > 0) { ctx.save(); ctx.globalAlpha *= ck; P.iR(ctx, 960, 220, 860, 640, 8, C.white, { lw: 6, shadow: 1 });
      const mons = ['OCT', 'NOV', 'DEC', 'JAN', 'FEB']; const xm = (i) => 1040 + i * 180; mons.forEach((mo, i) => G.text(ctx, mo, xm(i), 830, { size: 36, fam: 'Bangers', color: C.ink, align: 'center', boil: 0 }));
      const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40 * 4; pts.push([xm(u), 740 - 380 * Math.exp(-Math.pow((u - 2) / 1.6, 2))]); } P.trace(ctx, pts, P.oc((t - ev.c6_wmo) / 1.6), C.red, 10);
      G.text(ctx, 'WMO FORECAST (shape)', 1390, 280, { size: 30, fam: 'Bangers', color: C.ink, align: 'center', boil: 0 }); ctx.restore(); }
    P.burstStar(ctx, 1400, 330, 80, t, ev.c6_dec, { color: C.yel, text: 'PEAK', size: 50, tcol: C.red, n: 12 });
    P.cstamp(ctx, 'INTO FEB 2027', 1640, 520, t, ev.c6_feb, { size: 44, color: C.blue });
    P.source(ctx, 'NOAA CPC, 12 Nov 2026 · WMO, Oct 2026', t, ev.c6_60);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S5 — already felt: India's monsoon −13 % · Indonesia's wildfires · Peru warns of an "extraordinary" event
  P.shot(ev.c6_s5, (ctx, t) => {
    P.bgPaper(ctx, t, { rays: 0.2, rayCol: C.warm2, cy: 540 });
    P.caption(ctx, 'ALREADY BEING FELT', 70, 50, t, ev.c6_s5 + 0.3, { size: 50 });
    P.panel(ctx, 80, 170, 560, 640, t, Math.min(ev.c6_india - 0.1, ev.c6_s5 + 0.6), (c) => { c.fillStyle = '#F6D8A0'; c.fillRect(0, 0, 560, 640); P.cloud(c, 280, 150, 0.8); P.drops(c, 200, 200, 160, 120, t, { n: 4 });
      P.ccount(c, { x: 280, y: 450, to: -13, prefix: '', suffix: ' %', t, t0: ev.c6_13 - 0.5, t1: ev.c6_13, size: 120, card: false, color: C.red }); G.text(c, 'INDIA\'S MONSOON 2026', 280, 600, { size: 40, fam: 'Bangers', color: C.ink, align: 'center', boil: 0 }); });
    P.panel(ctx, 680, 170, 560, 640, t, ev.c6_indo - 0.1, (c) => { c.fillStyle = '#F3C9A0'; c.fillRect(0, 0, 560, 640); for (let i = 0; i < 4; i++) P.flame(c, 100 + i * 120, 480 - (i % 2) * 30, 1.0, t, { seed: i });
      G.text(c, 'INDONESIA: WILDFIRES', 280, 600, { size: 40, fam: 'Bangers', color: C.ink, align: 'center', boil: 0 }); });
    P.panel(ctx, 1280, 170, 560, 640, t, ev.c6_peru - 0.1, (c) => { c.fillStyle = C.sky2; c.fillRect(0, 0, 560, 640); P.stormCloud(c, 280, 260, 0.6, t, { rain: 1, bolt: 1 });
      P.cstamp(c, 'EXTRAORDINARY', 280, 470, t, ev.c6_extra, { size: 56, color: C.red }); G.text(c, 'PERU: HEAVY RAIN WARNING', 280, 600, { size: 38, fam: 'Bangers', color: C.ink, align: 'center', boil: 0 }); });
    P.source(ctx, 'IMD via Business Standard · Al Jazeera · ENFEN via Gestión', t, ev.c6_13);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — the heat boost comes after the peak → the Met Office: 2027 very likely the hottest year on record
  P.shot(ev.c6_s6, (ctx, t) => {
    P.bgPaper(ctx, t, { rays: 0.4, rayCol: C.red, cy: 520, spin: 0.05 });
    const pts = []; for (let i = 0; i <= 60; i++) { const u = i / 60; pts.push([200 + u * 900, 760 - 320 * Math.exp(-Math.pow((u - 0.35) / 0.2, 2))]); } P.trace(ctx, pts, P.oc((t - ev.c6_s6) / 1.2), C.warm, 10);
    const pts2 = []; for (let i = 0; i <= 60; i++) { const u = i / 60; pts2.push([200 + u * 900, 800 - 260 * Math.exp(-Math.pow((u - 0.65) / 0.25, 2))]); } P.trace(ctx, pts2, P.oc((t - ev.c6_peak) / 1.2), C.red, 10, 1, [20, 12]);
    P.lab(ctx, 'EL NIÑO PEAK', 515, 400, { size: 32, color: C.warm, a: P.fin(t, ev.c6_s6 + 0.6, 0.3) }); P.lab(ctx, 'GLOBAL HEAT, LATER', 800, 520, { size: 32, color: C.red, a: P.fin(t, ev.c6_peak + 0.6, 0.3) });
    P.line(ctx, 200, 820, 1100, 820, C.ink, 6);
    P.caption(ctx, 'UK MET OFFICE', 1200, 160, t, ev.c6_met, { size: 48 });
    P.trophy(ctx, 1340, 760, 1.0, '2024', { a: P.fin(t, ev.c6_met, 0.3), fall: P.eio((t - ev.c6_likely) / 0.6) * 0.6 });
    P.burstStar(ctx, 1640, 560, 150, t, ev.c6_2027, { color: C.yel, text: '2027', size: 100, tcol: C.red, n: 16 });
    P.cstamp(ctx, 'VERY LIKELY THE HOTTEST YEAR ON RECORD', 960, 960, t, ev.c6_likely, { size: 54, color: C.red });
    P.source(ctx, 'UK Met Office blog, Aug 2026', t, ev.c6_2027);
  }, { in: { type: 'fade', dur: 0.4 } });
})();
