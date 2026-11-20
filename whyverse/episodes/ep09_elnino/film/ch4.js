// Chapter 4 — One ocean, the whole world: the heaviest rain on Earth moves east · storms pump heat up and bend the jet stream ·
// typical fingerprints (Peru/Ecuador floods, Indonesia/Australia drought, India's monsoon, southern Africa dry) · North America wetter
// south / milder north · Atlantic hurricanes torn apart, more in the Pacific · MYTH: "hotter everywhere" (Australia 2026 wet) · the global
// average +0.1–0.2 °C for a while; record years 2016 and 2024 came after El Niños · "can be very expensive".
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  P.hurricane = (ctx, x, y, r, t, { shear = 0, a = 1 } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a * (1 - shear * 0.8); ctx.rotate(-t * 2);
    for (let i = 0; i < 3; i++) { ctx.save(); ctx.rotate(i * 2.094); ctx.translate(shear * 120 * Math.cos(i * 2.1), shear * 120 * Math.sin(i * 2.1)); P.iP(ctx, [[0, -r * 0.2], [r * 0.6, -r * 0.6], [r, -r * 0.1], [r * 0.5, 0], [r * 0.2, r * 0.1]], C.white, { lw: 5, curve: true, dots: C.cyan, dotA: 0.3 }); ctx.restore(); }
    if (shear < 0.5) P.iC(ctx, 0, 0, r * 0.18, C.sea, { lw: 4 }); ctx.restore(); };
  const world = () => P.mapCache('world', { lon0: -10, lon1: 330, lat0: -50, lat1: 72, w: 2600 });

  P.cardShot('c4', 4, 'One ocean, the whole world', C.cyan, (ctx, t) => { P.stormCloud(ctx, 220, 900, 0.6, t, { rain: 1 }); P.sunIcon(ctx, 1720, 900, 70, t); });

  // S1 — towering storm clouds follow the warm water: the heaviest rain on the planet moves from Indonesia to the mid-Pacific
  P.shot(ev.c4_s1, (ctx, t) => {
    const mv = P.eio((t - ev.c4_slides + 0.2) / 1.6); const cx = lerp(470, 1040, mv);
    P.section(ctx, t, lerp(0.3, 1, mv), { wind: lerp(0.4, -0.2, mv), labels: 0, cloudX: -999, windFace: 0 });
    const gr = P.oc((t - ev.c4_tower + 0.3) / 0.8); P.stormCloud(ctx, cx, 300, lerp(0.6, 1.0, gr), t, { rain: P.fin(t, ev.c4_heavy - 0.4, 0.4) + 0.3, bolt: 1 });
    if (mv > 0.05) { P.iC(ctx, 470, 250, 40, null, { lw: 5, a: 0.5 }); P.dimLine(ctx, 470, 560, cx, 560, 'THOUSANDS OF KM', mv, { size: 34 }); }
    P.cstamp(ctx, 'TOWERING STORM CLOUDS', 960, 70, t, ev.c4_tower, { size: 52, color: C.blue, t1: ev.c4_heavy });
    P.slam(ctx, 'THE HEAVIEST RAIN ON THE PLANET', 960, 120, t, ev.c4_heavy, { size: 78, color: C.yel });
    P.cstamp(ctx, 'INDONESIA', 200, 360, t, ev.c4_indo, { size: 44, color: C.green2 });
    P.cstamp(ctx, 'MID-PACIFIC', cx, 640, t, ev.c4_mid, { size: 48, color: C.red });
    P.source(ctx, 'NOAA climate.gov', t, ev.c4_mid);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — storms pump heat high into the sky → the jet stream bends → ripples around the globe
  P.shot(ev.c4_s2, (ctx, t) => {
    ctx.fillStyle = C.sea; ctx.fillRect(-600, -600, W + 1200, H + 1200);
    const m = world(); const s = 1920 / 2600 * 1.02; const pj = P.drawMap(ctx, m, -20, 540 - m.h * s / 2, s);
    const st = pj(-165, 0); P.heat(ctx, st[0], st[1] + 10, 200, 50, t);
    for (let i = 0; i < 3; i++) { const ph = (t * 0.7 + i / 3) % 1; P.fatArrow(ctx, st[0] - 60 + i * 60, st[1] - 20 - ph * 60, st[0] - 60 + i * 60, st[1] - 120 - ph * 90, { w: 20, color: C.red, a: P.fin(t, ev.c4_pump, 0.3) * Math.sin(ph * Math.PI) }); }
    P.at(ctx, st[0], st[1] - 60, 0.35, 0, () => P.stormCloud(ctx, 0, 0, 1, t, { rain: 0.8 }));
    // jet stream: a wavy ribbon across the North Pacific into North America; it shifts south and east when it bends
    const bend = P.eio((t - ev.c4_bends) / 1.4); const ja = P.fin(t, ev.c4_bends - 0.5, 0.5);
    if (ja > 0) { const pts = []; for (let lo = 120; lo <= 300; lo += 4) { const lat = lerp(45, 36, bend) + Math.sin((lo - 120) / 180 * Math.PI * lerp(2, 2.6, bend) + t * 0.6) * lerp(6, 9, bend); pts.push(pj(lo > 180 ? lo - 360 : lo, lat)); }
      ctx.save(); ctx.globalAlpha *= ja; P.trace(ctx, pts, 1, C.ink, 26); P.trace(ctx, pts, 1, C.yel, 16); const ph = (t * 0.2) % 1; for (let k = 0; k < 4; k++) { const q = P.along(pts, (ph + k / 4) % 1); P.at(ctx, q[0], q[1], 1, q[2], () => P.iP(ctx, [[-16, -12], [16, 0], [-16, 12]], C.red, { lw: 3 })); } ctx.restore(); }
    P.cstamp(ctx, 'JET STREAM', pj(-120, 52)[0], pj(-120, 52)[1], t, ev.c4_jet, { size: 50, color: C.blue });
    for (let i = 0; i < 4; i++) { const t0 = ev.c4_ripple + i * 0.5; const k = clamp((t - t0) / 2.4); if (k <= 0 || k >= 1) continue; ctx.save(); ctx.globalAlpha *= (1 - k) * 0.9; ctx.strokeStyle = C.yel; ctx.lineWidth = 8; ctx.beginPath(); ctx.ellipse(st[0], st[1], 1400 * k, 700 * k, 0, 0, 7); ctx.stroke(); ctx.restore(); }
    P.caption(ctx, 'HEAT PUMPED HIGH INTO THE SKY', 70, 60, t, ev.c4_pump, { size: 44 });
    P.slam(ctx, 'RIPPLES AROUND THE GLOBE', 960, 990, t, ev.c4_globe - 0.1, { size: 84, color: C.yel });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S3 — typical El Niño fingerprints on a world map (wetter = blue, drier = orange)
  P.shot(ev.c4_s3, (ctx, t) => {
    ctx.fillStyle = C.sea; ctx.fillRect(-600, -600, W + 1200, H + 1200);
    const m = world(); const s = 1920 / 2600 * 1.02; const pj = P.drawMap(ctx, m, -20, 540 - m.h * s / 2, s);
    const groups = [[ev.c4_peru, ['Peru', 'Ecuador'], C.cyan, 'FLOODS', -78, -6, 'wet'], [ev.c4_indo2, ['Indonesia', 'Papua New Guinea', 'Malaysia'], C.warm2, 'DROUGHT', 115, -2, 'dry'], [ev.c4_aus, ['Australia'], C.warm2, 'DROUGHT', 135, -25, 'dry'],
      [ev.c4_india, ['India'], C.warm2, 'WEAKER MONSOON', 79, 22, 'dry'], [ev.c4_saf, ['Zimbabwe', 'Mozambique', 'Zambia', 'Botswana', 'South Africa'], C.warm2, 'DRIER', 28, -20, 'dry']];
    groups.forEach(([t0, names, col, lab, lo, la, kind]) => { const k = P.fin(t, t0 - 0.1, 0.35); if (k <= 0) return; names.forEach((n) => P.countryOn(ctx, pj, n, col, { a: k, lw: 4, dots: kind === 'wet' ? C.blue : C.red }));
      const p = pj(lo, la); if (kind === 'wet') P.drops(ctx, p[0] - 50, p[1] - 80, 100, 90, t, { n: 7, a: k }); else P.sunIcon(ctx, p[0], p[1] - 70, 26, t, { a: k });
      P.cstamp(ctx, lab, p[0], p[1] + 50, t, t0 + 0.15, { size: 36, color: kind === 'wet' ? C.blue : C.red }); });
    const lk = P.fin(t, ev.c4_s3 + 0.3, 0.4); P.iR(ctx, 70, 860, 380, 150, 6, C.cream, { lw: 5, shadow: 1, a: lk });
    ctx.save(); ctx.globalAlpha *= lk; P.iR(ctx, 100, 885, 40, 40, 4, C.cyan, { lw: 4 }); G.text(ctx, 'WETTER', 160, 918, { size: 36, fam: 'Bangers', color: C.ink, boil: 0 }); P.iR(ctx, 100, 945, 40, 40, 4, C.warm2, { lw: 4 }); G.text(ctx, 'DRIER', 160, 978, { size: 36, fam: 'Bangers', color: C.ink, boil: 0 }); ctx.restore();
    P.caption(ctx, 'TYPICAL EL NIÑO EFFECTS', 70, 60, t, ev.c4_s3 + 0.3, { size: 46 });
    P.source(ctx, 'NOAA CPC · WMO', t, ev.c4_s3 + 0.5);
  }, { in: { type: 'fade', dur: 0.3 } });

  // S4 — North America: wetter south, milder north · Atlantic hurricanes torn apart, more in the Pacific
  P.shot(ev.c4_s4, (ctx, t) => {
    ctx.fillStyle = C.sea; ctx.fillRect(-600, -600, W + 1200, H + 1200);
    const m = P.mapCache('na', { lon0: -145, lon1: -15, lat0: 2, lat1: 62, w: 2000 }); const s = 1920 / 2000; const pj = P.drawMap(ctx, m, 0, 540 - m.h * s / 2, s);
    const sk = P.fin(t, ev.c4_wet - 0.2, 0.4); const nk = P.fin(t, ev.c4_mild - 0.2, 0.4);
    if (sk > 0) { for (const [lo, la] of [[-110, 32], [-95, 31], [-82, 31]]) { const p = pj(lo, la); P.cloud(ctx, p[0], p[1] - 40, 0.42, { a: sk }); P.drops(ctx, p[0] - 40, p[1] - 10, 80, 60, t, { n: 4, a: sk }); } P.cstamp(ctx, 'WETTER SOUTH', pj(-98, 26)[0], pj(-98, 26)[1], t, ev.c4_wet, { size: 44, color: C.blue }); }
    if (nk > 0) { for (const [lo, la] of [[-115, 48], [-90, 47]]) { const p = pj(lo, la); P.sunIcon(ctx, p[0], p[1], 34, t, { a: nk }); } P.cstamp(ctx, 'MILDER NORTH', pj(-100, 54)[0], pj(-100, 54)[1], t, ev.c4_mild, { size: 44, color: C.red }); }
    // Atlantic hurricane sheared apart
    const ap = pj(-55, 20); const sh = P.eio((t - ev.c4_tear) / 0.8); P.hurricane(ctx, ap[0], ap[1], 110, t, { shear: sh, a: P.fin(t, ev.c4_atl - 0.2, 0.3) });
    if (t > ev.c4_tear - 0.4) for (let i = 0; i < 3; i++) { const ph = (t * 1.2 + i / 3) % 1; P.fatArrow(ctx, ap[0] - 260 + ph * 200, ap[1] - 160 + i * 60, ap[0] - 60 + ph * 200, ap[1] - 160 + i * 60, { w: 20, color: C.white, a: Math.sin(ph * Math.PI) * P.fin(t, ev.c4_tear - 0.4, 0.3) }); }
    P.cstamp(ctx, 'ATLANTIC: TORN APART', ap[0], ap[1] + 190, t, ev.c4_tear, { size: 44, color: C.blue });
    [[-112, 14], [-125, 17], [-100, 11]].forEach(([lo, la], i) => { const p = pj(lo, la); P.hurricane(ctx, p[0], p[1], 70, t + i, { a: P.pop(t, ev.c4_more - 0.2 + i * 0.2, 0.35) }); });
    P.cstamp(ctx, 'PACIFIC: MORE', pj(-118, 8)[0], pj(-118, 8)[1] + 40, t, ev.c4_more, { size: 44, color: C.red });
    P.source(ctx, 'NOAA · NOAA AOML', t, ev.c4_wet);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S5 — MYTH: "El Niño makes everywhere hotter" → BUSTED: it reshuffles heat and rain; Australia 2026 unusually wet
  P.shot(ev.c4_s5, (ctx, t) => {
    P.bgPaper(ctx, t, { rays: 0.35, rayCol: C.red, cy: 420 });
    const mk = P.fin(t, ev.c4_myth - 0.2, 0.3), out = P.eio((t - ev.c4_reshuf + 0.2) / 0.6);
    ctx.save(); ctx.translate(-out * 1300, 0);
    P.panel(ctx, 260, 160, 1400, 520, t, ev.c4_myth - 0.15, (c) => { c.fillStyle = C.cream; c.fillRect(0, 0, 1400, 520); P.ctext(c, 'MYTH', 700, 130, { size: 110, color: C.red, stroke: C.ink, strokeW: 10 });
      P.ctext(c, '"EL NIÑO MAKES', 700, 280, { size: 90, color: C.ink }); P.ctext(c, 'EVERYWHERE HOTTER"', 700, 390, { size: 90, color: C.ink }); P.thermo(c, 1250, 440, 260, 0.9 * P.fin(t, ev.c4_hotter, 0.5) + 0.1, { w: 40 }); });
    P.cstamp(ctx, 'BUSTED!', 1300, 640, t, ev.c4_doesnt, { size: 120, color: C.red, rot: -0.12 });
    ctx.restore();
    if (out > 0) { // reshuffle: tiles of red / blue flipping
      for (let i = 0; i < 12; i++) { const x = 300 + (i % 6) * 220, y = 240 + Math.floor(i / 6) * 240; const fl = Math.sin((t - ev.c4_reshuf) * 3 + i * 0.7) > 0; const k = P.pop(t, ev.c4_reshuf + i * 0.05, 0.3) * (1 - P.fin(t, ev.c4_aus2 - 0.3, 0.3));
        if (k > 0) P.at(ctx, x + 100, y + 100, k, 0, () => { P.iR(ctx, -95, -95, 190, 190, 10, fl ? C.warm : C.cyan, { lw: 6, shadow: 1, dots: C.white, dotA: 0.2 }); if (fl) P.sunIcon(ctx, 0, 0, 34, t); else P.drops(ctx, -40, -50, 80, 100, t, { n: 5, col: C.white }); }); }
      P.cstamp(ctx, 'IT RESHUFFLES HEAT + RAIN', 960, 110, t, ev.c4_reshuf, { size: 56, color: C.blue, t1: ev.c4_aus2 - 0.2 });
      P.cstamp(ctx, 'SOME PLACES: COOLER + WETTER', 960, 900, t, ev.c4_cool, { size: 50, color: C.cyan, t1: ev.c4_aus2 - 0.2 }); }
    const ak = P.fin(t, ev.c4_aus2 - 0.3, 0.3); if (ak > 0) { const m = P.mapCache('aus', { lon0: 105, lon1: 165, lat0: -46, lat1: -5, w: 1300, sea: C.sea }); P.panel(ctx, 310, 150, 1300, m.h, t, ev.c4_aus2 - 0.3, (c) => { const pj = P.drawMap(c, m, 0, 0, 1); P.countryOn(c, pj, 'Australia', C.cyan, { lw: 5, dots: C.blue });
        for (const [lo, la] of [[120, -25], [135, -22], [145, -30]]) { const p = pj(lo, la); P.cloud(c, p[0], p[1] - 60, 0.5); P.drops(c, p[0] - 50, p[1] - 30, 100, 90, t, { n: 6 }); } });
      P.cstamp(ctx, '2026: UNUSUALLY WET!', 960, 960, t, ev.c4_unwet, { size: 64, color: C.blue }); P.source(ctx, 'ABC News (Australia), Aug 2026', t, ev.c4_unwet); }
  }, { in: { type: 'wipe', dir: 'down', dur: 0.5 } });

  // S6 — averaged over the planet El Niño warms the air: +0.1–0.2 °C for a while; record years 2016 and 2024 followed El Niños
  P.shot(ev.c4_s6, (ctx, t) => {
    P.bgFlat(ctx, t, C.sky, { dotCol: C.white, dir: 'up', a: 0.3 });
    const gx = 520, gy = 460, R = 260; P.iC(ctx, gx, gy, R, C.sea, { lw: 8, shadow: 1, dots: C.blue, dotA: 0.35 }); ctx.save(); ctx.beginPath(); ctx.arc(gx, gy, R, 0, 7); ctx.clip();
    const m = P.pac(); P.drawMap(ctx, m, gx - 420, gy - 216, 0.35); ctx.restore(); P.stroke(ctx, (c) => { c.beginPath(); c.arc(gx, gy, R, 0, 7); }, C.ink, 8);
    for (let i = 0; i < 5; i++) { const ph = (t * 0.6 + i / 5) % 1; const a = P.fin(t, ev.c4_rel, 0.4); P.stroke(ctx, (c) => { const x = gx - 160 + i * 80; c.beginPath(); c.moveTo(x, gy - R + 30 - ph * 200); c.bezierCurveTo(x + 20, gy - R - ph * 200, x - 20, gy - R - 40 - ph * 200, x, gy - R - 80 - ph * 200); }, C.red, 7, a * Math.sin(ph * Math.PI)); }
    P.thermo(ctx, 960, 760, 460, 0.45 + 0.15 * P.eio((t - ev.c4_tenth) / 0.8) - 0.15 * P.eio((t - ev.c4_while - 0.6) / 1.2), { label: 'WORLD AVERAGE', w: 56 });
    P.burstStar(ctx, 1200, 400, 120, t, ev.c4_tenth, { color: C.yel, text: '+0.1–0.2 °C', size: 50, tcol: C.red, n: 14 });
    P.cstamp(ctx, 'FOR A WHILE', 1200, 580, t, ev.c4_while, { size: 48, color: C.blue });
    // year ruler 2012 → 2026 with El Niño spans and record markers
    const x0 = 1220, x1 = 1860, y = 860, yr = (Y) => lerp(x0, x1, (Y - 2012) / 14); const rk = P.fin(t, ev.c4_2016 - 0.8, 0.5);
    if (rk > 0) { ctx.save(); ctx.globalAlpha *= rk; P.iR(ctx, x0 - 40, 640, x1 - x0 + 80, 330, 8, C.cream, { lw: 6, shadow: 1 });
      for (const [a, b] of [[2015.3, 2016.4], [2023.4, 2024.4]]) P.rect(ctx, yr(a), y - 60, yr(b) - yr(a), 60, 4, C.warm2);
      P.line(ctx, x0, y, x1, y, C.ink, 6); for (let Y = 2012; Y <= 2026; Y++) { P.line(ctx, yr(Y), y, yr(Y), y + (Y % 2 ? 10 : 18), C.ink, 3); if (Y % 4 === 0) G.text(ctx, String(Y), yr(Y), y + 52, { size: 28, fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0 }); }
      G.text(ctx, 'EL NIÑO', yr(2015.8), y - 76, { size: 26, fam: 'Bangers', color: C.warm, align: 'center', boil: 0 }); G.text(ctx, 'EL NIÑO', yr(2023.9), y - 76, { size: 26, fam: 'Bangers', color: C.warm, align: 'center', boil: 0 }); ctx.restore(); }
    P.burstStar(ctx, yr(2016.5), 700, 64, t, ev.c4_2016, { color: C.red, text: '2016', size: 38, tcol: C.yel, n: 10 });
    P.burstStar(ctx, yr(2024.5), 700, 64, t, ev.c4_2024, { color: C.red, text: '2024', size: 38, tcol: C.yel, n: 10, seed: 4 });
    P.lab(ctx, 'RECORD HOT YEARS', 1540, 1000, { size: 30, a: P.fin(t, ev.c4_2024, 0.4) });
    P.source(ctx, 'UK Met Office · NASA/NOAA · Copernicus', t, ev.c4_tenth);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S7 — "a tenth of a degree sounds small… but El Niño can be very expensive"
  P.shot(ev.c4_s7, (ctx, t) => {
    P.bgPaper(ctx, t, { rays: 0.25, rayCol: C.yel, cy: 560 });
    const sm = 1 - 0.7 * P.eio((t - ev.c4_small) / 0.6); P.ctext(ctx, '0.1 °C', 960, 420, { size: 200 * sm, color: C.cyan, stroke: C.ink, strokeW: 12, a: 1 - P.fin(t, ev.c4_exp - 0.2, 0.3) });
    const tk = P.pop(t, ev.c4_exp, 0.4); if (tk > 0) P.at(ctx, 960, 500, tk, Math.sin((t - ev.c4_exp) * 3) * 0.08 * Math.exp(-(t - ev.c4_exp)), () => { P.line(ctx, 0, -330, 0, -220, C.ink, 6);
      P.iP(ctx, [[-260, -220], [200, -220], [300, 0], [200, 220], [-260, 220]], C.yel, { lw: 8, shadow: 1, dots: C.red, dotA: 0.2 }); P.iC(ctx, -180, 0, 30, C.cream, { lw: 6 }); P.ctext(ctx, '$$$', 60, 60, { size: 200, color: C.red, stroke: C.ink, strokeW: 12 }); });
    for (let i = 0; i < 8; i++) { const ph = clamp((t - ev.c4_exp - i * 0.08) / 1.2); if (ph <= 0) continue; P.at(ctx, 960 + Math.cos(i * 0.8) * 520 * ph, 520 + Math.sin(i * 0.8) * 320 * ph + 300 * ph * ph, 1, ph * 6, () => P.iE(ctx, 0, 0, 30, 30 * Math.abs(Math.cos(ph * 9)) + 4, C.gold, { lw: 4 })); }
    Ch.pico(ctx, { x: 1640, y: 1060, s: 0.75, t, dir: -1, gesture: t > ev.c4_exp ? 'shrug' : 'idle', eyes: t > ev.c4_exp ? 'wide' : 'open', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'fade', dur: 0.4 } });
})();
