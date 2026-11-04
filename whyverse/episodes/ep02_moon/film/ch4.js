// Chapter 4 — A wobbling planet? Axial tilt today, Laskar 1993 (chaos 0–85°), Lissauer 2012 (a 20–25° band).
(function () {
  const { U, G, Ch, P, SCORE: S, Shots, K } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const pole = (deg) => { const a = (deg * Math.PI) / 180; return [-Math.sin(a), Math.cos(a), 0]; };
  // deterministic "chaos": sum of sines
  const chaos = (t) => clamp(42 + 30 * Math.sin(t * 1.3) + 14 * Math.sin(t * 3.1 + 1) + 8 * Math.sin(t * 5.7 + 2), 2, 85);
  const earthAxis = (ctx, t, tilt, { cam, sun = K.nrm([1, 0.05, 0.6]), op = 1, ex = 0 } = {}) => {
    M3.draw(ctx, K.scene(t, { cam: cam || K.cam([ex, 0.1, 4.4], [ex, 0, 0], 40), sun, earth: { tiltDeg: tilt, spin: t * 0.15 }, moon: { show: false }, axis: { op, len: 1.65 } }));
  };
  // dial 0..90 with a highlighted band and a needle
  const dial = (ctx, x, y, r, t, { deg, band = null, bandColor = 'rgba(255,196,61,0.45)', a = 1 } = {}) => {
    if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y);
    P.panel(ctx, -r - 50, -r - 60, 2 * r + 100, r + 150, {});
    const ang = (d) => Math.PI + (d / 90) * (Math.PI / 2) * 2 * 0.5 * 2 / 2; // 0° = left … 90° = up … (we use 0–90 over a half circle: 0 left, 90 right)
    const A = (d) => Math.PI + (d / 90) * Math.PI;
    ctx.lineWidth = 26; ctx.strokeStyle = 'rgba(255,255,255,0.10)'; ctx.beginPath(); ctx.arc(0, 0, r, Math.PI, 2 * Math.PI); ctx.stroke();
    if (band) { ctx.strokeStyle = bandColor; ctx.beginPath(); ctx.arc(0, 0, r, A(band[0]), A(band[1])); ctx.stroke(); }
    for (let d = 0; d <= 90; d += 15) { const q = A(d); ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(Math.cos(q) * (r - 24), Math.sin(q) * (r - 24)); ctx.lineTo(Math.cos(q) * (r + 18), Math.sin(q) * (r + 18)); ctx.stroke();
      G.text(ctx, d + '°', Math.cos(q) * (r + 48), Math.sin(q) * (r + 48) + 10, { size: 24, fam: FT.ui, weight: 700, color: C.dim, align: 'center', boil: 0 }); }
    const q = A(deg); ctx.strokeStyle = C.white; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(q) * (r - 10), Math.sin(q) * (r - 10)); ctx.stroke();
    ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(0, 0, 14, 0, 7); ctx.fill();
    G.text(ctx, deg.toFixed(1) + '°', 0, 72, { size: 60, fam: FT.title, weight: 400, color: C.gold, align: 'center', boil: 0 });
    void ang; ctx.restore();
  };
  P.cardShot('c4', 4, 'A wobbling planet?', (ctx, t) => earthAxis(ctx, t, 23.4, { cam: K.cam(K.sph(4.6, 30 + t * 1.5, 10), [0, 0, 0], 40) }));

  // S1 — the tilt today: 23.4°
  P.shot(ev.c4_s1, (ctx, t) => {
    const ka = clamp((t - ev.c4_axis) / 0.8);
    earthAxis(ctx, t, 23.4 * ease.inOutCubic(ka), { ex: 0.9, op: 1 });
    const c = M3.project([0, 0, 0]), top = M3.project(K.mul(pole(23.4 * ease.inOutCubic(ka)), 1.65)), up = M3.project([0, 1.65, 0]);
    ctx.setLineDash([12, 12]); ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.lineTo(up[0], up[1]); ctx.stroke(); ctx.setLineDash([]);
    if (ka > 0) { const r = 260; const a0 = -Math.PI / 2, a1 = Math.atan2(top[1] - c[1], top[0] - c[0]); ctx.strokeStyle = C.gold; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(c[0], c[1], r, Math.min(a0, a1), Math.max(a0, a1)); ctx.stroke(); }
    P.counter(ctx, { x: 1450, y: 360, from: 0, to: 23.4, decimals: 1, suffix: '°', t, t0: ev.c4_axis, t1: ev.c4_234, size: 130, sub: 'tilt of Earth’s axis' });
    const ks = P.pop(t, ev.c4_seasons, 0.4);
    if (ks > 0) P.at(ctx, 1450, 760, ks, 0, () => { P.panel(ctx, -330, -100, 660, 200, {}); G.text(ctx, 'SUMMER', -150, 18, { size: 52, fam: FT.title, weight: 400, color: C.gold, align: 'center', boil: 0 }); G.text(ctx, 'WINTER', 150, 18, { size: 52, fam: FT.title, weight: 400, color: C.ice, align: 'center', boil: 0 }); P.label(ctx, 'because of the tilt', 0, 75, { size: 26, align: 'center' }); });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — barely moves: 22.1–24.5° over 41,000 years
  P.shot(ev.c4_s2, (ctx, t) => {
    const d = 23.3 + 1.2 * Math.sin((t - ev.c4_s2) * 1.4);
    earthAxis(ctx, t, d, { ex: -1.0 });
    dial(ctx, 560, 640, 330, t, { deg: d, band: [22.1, 24.5], a: clamp((t - ev.c4_s2) / 0.4) });
    P.tag(ctx, '22.1° to 24.5°', 560, 200, t, ev.c4_band, 1e9, { size: 46 });
    P.counter(ctx, { x: 1450, y: 900, from: 0, to: 41000, t, t0: ev.c4_41k0, t1: ev.c4_41k, size: 80, sub: 'years per cycle' });
  }, { in: { type: 'push', dur: 0.5 } });

  // S3 — Laskar 1993: chaos up to 85°
  P.shot(ev.c4_s3, (ctx, t) => {
    const go = clamp((t - ev.c4_chaos) / 0.6); const d = lerp(23.4, chaos(t - ev.c4_chaos), go); const dd = t > ev.c4_85 && t < ev.c4_85 + 0.9 ? lerp(d, 85, Math.sin(Math.PI * clamp((t - ev.c4_85) / 0.9))) : d;
    earthAxis(ctx, t, dd, { ex: -1.0, sun: K.nrm([1, 0.1, 0.5]) });
    dial(ctx, 560, 640, 330, t, { deg: dd, band: [0, 85 * go], bandColor: 'rgba(229,72,77,0.45)' });
    const k = P.pop(t, ev.c4_1993, 0.4); if (k > 0) P.at(ctx, 560, 190, k, 0, () => { P.panel(ctx, -330, -70, 660, 140, {}); G.text(ctx, 'LASKAR et al. 1993', 0, 14, { size: 44, fam: FT.title, weight: 400, color: C.white, align: 'center', boil: 0 }); P.label(ctx, 'computer model, no Moon', 0, 52, { size: 24, align: 'center' }); });
    P.stamp(ctx, 'CHAOTIC', 1450, 200, t, ev.c4_alarm, { size: 90, color: C.red });
    P.tag(ctx, 'from nearly 0° up to ~85°', 1450, 960, t, ev.c4_85, 1e9, { size: 42, border: C.red });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — 85°: a pole pointing at the Sun
  P.shot(ev.c4_s4, (ctx, t) => {
    const u = clamp((t - ev.c4_s4) / 8);
    M3.draw(ctx, K.scene(t, { cam: K.cam(K.sph(4.2, 12 - 20 * u, 8), [0, 0, 0], 40), sun: K.nrm([-0.995, 0.09, 0.0]), earth: { tiltDeg: 85, spin: t * 0.2 }, moon: { show: false }, axis: { op: 1, len: 1.6 } }));
    const pd = pole(85), a = M3.project(K.mul(pd, 1.25)), b = M3.project(K.mul(pd, -1.25));
    P.callout(ctx, 'MONTHS OF DAY', a[0], a[1], t, ev.c4_day, { dx: -160, dy: -120, size: 38, border: C.gold });
    P.callout(ctx, 'MONTHS OF NIGHT', b[0], b[1], t, ev.c4_night, { dx: 160, dy: 120, size: 38, border: C.ice });
    P.kicker(ctx, 'Tilted 85°', t, ev.c4_s4 + 0.2);
  }, { in: { type: 'push', dur: 0.5 } });

  // S5 — Lissauer 2012: a band only ~20–25° wide
  P.shot(ev.c4_s5, (ctx, t) => {
    const k2 = clamp((t - ev.c4_band2) / 0.8); const lo = lerp(0, 12, ease.inOutCubic(k2)), hi = lerp(85, 35, ease.inOutCubic(k2));
    const d = lerp(chaos(t), 23.5 + 10 * Math.sin(t * 1.1) * 0.95, k2);
    earthAxis(ctx, t, d, { ex: -1.0 });
    dial(ctx, 560, 640, 330, t, { deg: d, band: [lo, hi], bandColor: P.mix('#E5484D', '#FFC43D', k2).replace('rgb', 'rgba').replace(')', ',0.5)') });
    const k = P.pop(t, ev.c4_2012, 0.4); if (k > 0) P.at(ctx, 560, 190, k, 0, () => { P.panel(ctx, -330, -70, 660, 140, {}); G.text(ctx, 'LISSAUER et al. 2012', 0, 14, { size: 44, fam: FT.title, weight: 400, color: C.white, align: 'center', boil: 0 }); P.label(ctx, 'longer, closer look, no Moon', 0, 52, { size: 24, align: 'center' }); });
    P.tag(ctx, 'a band only ~20–25° wide', 1450, 200, t, ev.c4_band2 + 0.3, 1e9, { size: 42 });
    P.tag(ctx, 'for hundreds of millions of years', 1450, 960, t, ev.c4_hundreds, 1e9, { size: 38, border: C.dim });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — verdict
  P.shot(ev.c4_s6, (ctx, t) => {
    earthAxis(ctx, t, 23.4 + 3 * Math.sin(t * 1.5), { cam: K.cam([-2.0, 0.2, 4.6], [-2.0, 0, 0], 40) });
    const row = (y, a, b, t0, ic, col) => { const k = P.pop(t, t0, 0.4); if (k <= 0) return; P.at(ctx, 560, y, k, 0, () => { P.panel(ctx, -380, -80, 760, 160, {}); G.text(ctx, a, -330, 22, { size: 56, fam: FT.title, weight: 400, color: C.white, boil: 0 }); P.icon(ctx, ic, 290, 0, 50, { color: col }); P.label(ctx, b, -330, 62, { size: 24 }); }); };
    row(330, 'WOBBLIER', 'yes', ev.c4_yes, 'check', C.gold);
    row(540, 'WILD?', 'maybe not', ev.c4_maybe, 'cross', C.coral);
    const k = P.pop(t, ev.c4_stab, 0.5); Ch.luna(ctx, { x: 560, y: 820, s: 0.95 * k, t, eyes: 'happy', mouth: Ch.lunaMouth(t), armL: 1.0, armR: 1.0 });
    P.tag(ctx, 'a stabilizer, not the only one', 1100, 900, t, ev.c4_stab + 0.3, 1e9, { size: 36, align: 'left' });
  }, { in: { type: 'push', dur: 0.5 } });
})();
