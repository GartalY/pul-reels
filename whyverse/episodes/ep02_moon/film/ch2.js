// Chapter 2 — The tides shrink: the stretch, two bulges, Moon vs Sun, a third, Bay of Fundy, the shore strip.
(function () {
  const { U, G, Ch, P, SCORE: S, Shots, K } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const MOON = [5.2, 0, 0];
  const wide = (ctx, t) => {
    const a = 20 + (t - S.CH.c2.t0) * 2;
    M3.draw(ctx, K.scene(t, { cam: K.cam(K.sph(8.5, a, 28, [2.4, 0, 0]), [2.4, 0, 0], 40), sun: K.nrm([0.2, 0.3, 1]), moon: { pos: MOON, r: 0.27 }, ring: { center: [0, 0, 0], r: 5.2, normal: [0, 1, 0], op: 0.35 } }));
  };
  P.cardShot('c2', 2, 'The tides shrink', wide);

  // S1 — the stretch: pull arrows + two bulges
  P.shot(ev.c2_s1, (ctx, t) => {
    const u = clamp((t - ev.c2_s1) / 14);
    const cam = K.cam(K.sph(7.2, 8 + 6 * u, 22, [2.2, 0, 0]), [2.2, -0.2, 0], 40);
    const b = ease.inOutCubic(clamp((t - ev.c2_bulge) / 1.2));
    M3.draw(ctx, K.scene(t, { cam, sun: K.nrm([0.2, 0.4, 1]), earth: { tiltDeg: 0, spin: 0.4 + t * 0.02 }, moon: { pos: MOON, r: 0.3 }, bulge: { amt: 0.16 * b, dir: [1, 0, 0], op: 0.9 * b } }));
    const pn = M3.project([1, 0, 0]), pc = M3.project([0, 0, 0]), pf = M3.project([-1, 0, 0]), pm = M3.project(MOON);
    const kn = clamp((t - ev.c2_near) / 0.5), kf = clamp((t - ev.c2_far) / 0.5);
    P.arrow(ctx, pn[0], pn[1] - 90, pn[0] + 260, pn[1] - 90, { k: kn, lw: 12, head: 32 });
    P.arrow(ctx, pc[0], pc[1] - 230, pc[0] + 190, pc[1] - 230, { k: kn, lw: 9, head: 26, color: 'rgba(255,196,61,0.8)' });
    P.arrow(ctx, pf[0], pf[1] - 90, pf[0] + 120, pf[1] - 90, { k: kf, lw: 7, head: 22, color: 'rgba(255,196,61,0.6)' });
    P.tag(ctx, 'pulled harder', pn[0] + 140, pn[1] - 170, t, ev.c2_near + 0.2, 1e9, { size: 32 });
    P.tag(ctx, 'pulled less', pf[0] + 40, pf[1] - 170, t, ev.c2_far + 0.2, 1e9, { size: 32, border: C.dim });
    P.tag(ctx, 'two bulges (exaggerated)', pc[0], pc[1] + 300, t, ev.c2_bulge + 0.5, 1e9, { size: 34, border: '#7FC3FF' });
    P.callout(ctx, 'MOON', pm[0], pm[1], t, ev.c2_s1 + 0.4, { dx: -60, dy: -150, size: 30 });
    P.kicker(ctx, 'Not to scale', t, ev.c2_s1 + 0.2);
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — Earth spins under the bulges: two high tides a day
  P.shot(ev.c2_s2, (ctx, t) => {
    const sp = (t - ev.c2_spin) * 1.1; const spin = 0.4 + Math.max(0, sp);
    const cam = K.cam([2.3, 7.4, 1.2], [2.3, 0, 0], 40, [0, 0, -1]);
    M3.draw(ctx, K.scene(t, { cam, sun: K.nrm([0.2, 0.9, 0.4]), earth: { tiltDeg: 0, spin }, moon: { pos: MOON, r: 0.3 }, bulge: { amt: 0.16, dir: [1, 0, 0], op: 0.9 } }));
    // a coastal town marker riding on the equator
    const a = spin + 2.0; const pt = [Math.cos(a) * 1.02, 0, -Math.sin(a) * 1.02]; const pp = M3.project(pt);
    const hi = 0.5 + 0.5 * Math.cos(2 * a); // high when facing toward/away from the Moon
    ctx.fillStyle = C.coral; ctx.beginPath(); ctx.arc(pp[0], pp[1], 16, 0, 7); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; ctx.stroke();
    // tide chart on the right
    const X = 1240, Y = 190, Wd = 560, Hh = 200; P.panel(ctx, X - 40, Y - 90, Wd + 80, Hh + 170, {});
    P.label(ctx, 'water level at the red dot', X, Y - 40, { size: 26 });
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X, Y + Hh / 2); ctx.lineTo(X + Wd, Y + Hh / 2); ctx.stroke();
    const span = Math.max(0, sp); ctx.strokeStyle = '#7FC3FF'; ctx.lineWidth = 6; ctx.beginPath();
    for (let i = 0; i <= 120; i++) { const q = i / 120 * Math.min(span, 6.283); const x = X + q / 6.283 * Wd; const y = Y + Hh / 2 - Math.cos(2 * (0.4 + q + 2.0)) * Hh * 0.4; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke();
    G.text(ctx, '1 DAY →', X + Wd, Y + Hh + 50, { size: 28, fam: FT.ui, weight: 800, color: C.dim, align: 'right', boil: 0 });
    P.counter(ctx, { x: 1520, y: 860, from: 0, to: 2, t, t0: ev.c2_two - 0.3, t1: ev.c2_two, size: 110, sub: 'high tides a day (most coasts)' });
    void hi;
    P.tag(ctx, '≈ 50 minutes later each day', 1520, 1010, t, ev.c2_50, 1e9, { size: 32, border: C.dim });
  }, { in: { type: 'push', dur: 0.5 } });

  // S3 — Moon vs Sun
  P.shot(ev.c2_s3, (ctx, t) => {
    P.spaceBg(ctx, t);
    P.kicker(ctx, 'Tidal pull', t, ev.c2_s3 + 0.1);
    P.moonDisc(ctx, 330, 420, 70, { alpha: clamp((t - ev.c2_s3) / 0.4) });
    P.hbar(ctx, { x: 460, y: 390, w: 1100, frac: 1, t, t0: ev.c2_s3 + 0.3, label: 'Moon', value: '100%', h: 70 });
    const ks = clamp((t - ev.c2_sunBar + 0.2) / 0.4);
    if (ks > 0) { P.glow(ctx, 330, 690, 140, 'rgba(255,210,120,', ks); ctx.fillStyle = `rgba(255,236,180,${ks})`; ctx.beginPath(); ctx.arc(330, 690, 60, 0, 7); ctx.fill(); }
    P.hbar(ctx, { x: 460, y: 660, w: 1100, frac: 0.46, t, t0: ev.c2_sunBar, label: 'Sun', value: '≈ 46%', h: 70, color: '#FFE08A' });
    P.tag(ctx, 'about half', 1060, 880, t, ev.c2_half, 1e9, { size: 44 });
    P.label(ctx, 'Sun: 27 million times the mass, but 390 times farther away', 460, 990, { size: 26, alpha: clamp((t - ev.c2_half - 0.6) / 0.4) });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S4 — tide gauge: today vs Sun only
  P.shot(ev.c2_s4, (ctx, t) => {
    P.spaceBg(ctx, t, { stars: 0.4 });
    const col = (x, label, frac, t0, color) => { const k = ease.outCubic(clamp((t - t0) / 1.0)); const top = 860 - 560 * frac * k;
      P.rr(ctx, x - 150, 300, 300, 560, 30); ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.fill(); ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 3; ctx.stroke();
      ctx.save(); P.rr(ctx, x - 150, 300, 300, 560, 30); ctx.clip(); ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(x - 160, 870);
      for (let i = 0; i <= 30; i++) ctx.lineTo(x - 150 + i * 10, top + Math.sin(t * 3 + i * 0.5) * 6); ctx.lineTo(x + 160, 870); ctx.fill(); ctx.restore();
      G.text(ctx, label, x, 930, { size: 36, fam: FT.ui, weight: 800, color: C.white, align: 'center', boil: 0 }); };
    col(660, 'TODAY (biggest tides)', 1.0, ev.c2_s4 + 0.2, '#3F8FD8');
    col(1260, 'NO MOON (Sun only)', 0.31, ev.c2_third - 0.4, '#7FC3FF');
    P.tag(ctx, "tides don't stop", 960, 200, t, ev.c2_stop, 1e9, { size: 40 });
    P.stamp(ctx, '≈ ⅓', 1260, 380, t, ev.c2_third + 0.5, { size: 110 });
  }, { in: { type: 'push', dur: 0.5 } });

  // S5 — Bay of Fundy: 16 m
  P.shot(ev.c2_s5, (ctx, t) => {
    const sky = ctx.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#9CC7E8'); sky.addColorStop(1, '#E8D7B5'); ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    // cliffs + mud
    ctx.fillStyle = '#8C6A4E'; ctx.beginPath(); ctx.moveTo(0, 220); ctx.lineTo(260, 260); ctx.lineTo(330, 1080); ctx.lineTo(0, 1080); ctx.fill();
    ctx.fillStyle = '#7A5B42'; ctx.beginPath(); ctx.moveTo(1920, 250); ctx.lineTo(1640, 300); ctx.lineTo(1560, 1080); ctx.lineTo(1920, 1080); ctx.fill();
    ctx.fillStyle = '#6E5A48'; ctx.fillRect(0, 960, W, 120);
    // pier + ruler
    ctx.fillStyle = '#5B4636'; ctx.fillRect(560, 250, 40, 720); ctx.fillRect(820, 250, 40, 720); ctx.fillRect(520, 230, 380, 40);
    for (let m = 0; m <= 16; m += 2) { const y = 960 - m * 42; ctx.fillStyle = '#fff'; ctx.fillRect(900, y - 3, m % 4 ? 30 : 50, 6); if (m % 4 === 0) G.text(ctx, m + ' m', 970, y + 12, { size: 30, fam: FT.ui, weight: 800, color: '#14213D', boil: 0 }); }
    // water level: big swing, then shrinks after "over"
    const amp = t < ev.c2_over ? 1 : lerp(1, 0.3, ease.inOutCubic(clamp((t - ev.c2_over) / 1.5)));
    const ph = (t - ev.c2_rise0) * 0.9; const lvl = ph < 0 ? 0.05 : 0.5 - 0.5 * Math.cos(Math.min(ph, Math.PI) + (ph > Math.PI ? (ph - Math.PI) * 0.6 : 0));
    const mid = 0.5 * (1 - amp) + 0.0; const lv = mid + lvl * amp; const y = 960 - lv * 16.3 * 42;
    ctx.fillStyle = 'rgba(40,110,160,0.88)'; ctx.beginPath(); ctx.moveTo(0, 1080); for (let i = 0; i <= 48; i++) ctx.lineTo(i * 40, y + Math.sin(t * 2.2 + i * 0.6) * 5); ctx.lineTo(W, 1080); ctx.fill();
    // a boat that rides the water (and sits on the mud)
    const by = Math.min(940, y - 10); P.at(ctx, 1180, by, 1, Math.sin(t * 1.6) * 0.03, () => { ctx.fillStyle = '#C9483B'; ctx.beginPath(); ctx.moveTo(-120, -10); ctx.lineTo(120, -10); ctx.lineTo(90, 30); ctx.lineTo(-90, 30); ctx.fill(); ctx.fillStyle = '#F4EFE6'; ctx.fillRect(-40, -70, 70, 60); ctx.fillStyle = '#333'; ctx.fillRect(-4, -150, 6, 80); });
    P.tag(ctx, 'BAY OF FUNDY, CANADA', 960, 120, t, ev.c2_fundy, 1e9, { size: 40, fill: 'rgba(14,19,48,0.85)' });
    P.counter(ctx, { x: 1520, y: 300, from: 0, to: 16.3, decimals: 1, suffix: ' m', t, t0: ev.c2_rise0, t1: ev.c2_16, size: 100, sub: 'between low and high tide', card: true });
    if (t > ev.c2_over) P.tag(ctx, 'no Moon: most of the show is gone', 1360, 560, t, ev.c2_over + 0.2, 1e9, { size: 34, border: C.coral, fill: 'rgba(14,19,48,0.85)' });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S6 — the shore strip between high and low tide
  P.shot(ev.c2_s6, (ctx, t) => {
    const sky = ctx.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#87B9DD'); sky.addColorStop(1, '#DDEBF2'); ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    const nar = ease.inOutCubic(clamp((t - ev.c2_narrow) / 1.4));
    const hiY = 470 + 60 * nar, loY = 820 - 200 * nar; const slope = (y) => 300 + (y - 300) * 1.6;
    // beach slope (left high, right low)
    ctx.fillStyle = '#D8BF8C'; ctx.beginPath(); ctx.moveTo(0, 300); ctx.lineTo(W, 980); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
    // intertidal band
    const xh = (hiY - 300) / (680 / W), xl = (loY - 300) / (680 / W);
    ctx.fillStyle = 'rgba(70,140,110,0.45)'; ctx.beginPath(); ctx.moveTo(xh, hiY); ctx.lineTo(xl, loY); ctx.lineTo(xl, H); ctx.lineTo(xh, H); ctx.fill();
    // sea at low water
    ctx.fillStyle = 'rgba(45,115,170,0.92)'; ctx.beginPath(); ctx.moveTo(xl, loY); for (let i = 0; i <= 30; i++) ctx.lineTo(xl + (W - xl) * i / 30, loY + Math.sin(t * 2 + i) * 4); ctx.lineTo(W, H); ctx.lineTo(xl, H); ctx.fill();
    ctx.setLineDash([14, 10]); ctx.strokeStyle = '#14213D'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(xh - 120, hiY); ctx.lineTo(xh + 220, hiY); ctx.stroke(); ctx.beginPath(); ctx.moveTo(xl - 220, loY); ctx.lineTo(xl + 120, loY); ctx.stroke(); ctx.setLineDash([]);
    G.text(ctx, 'HIGH TIDE', xh - 120, hiY - 18, { size: 30, fam: FT.ui, weight: 800, color: '#14213D', boil: 0 });
    G.text(ctx, 'LOW TIDE', xl - 220, loY - 18, { size: 30, fam: FT.ui, weight: 800, color: '#14213D', boil: 0 });
    // creatures on the band
    const at = (f) => [lerp(xh, xl, f), lerp(hiY, loY, f)];
    const crit = [['crab', 0.25], ['mussels', 0.5], ['seaweed', 0.72], ['bird', 0.12]];
    crit.forEach(([k, f], i) => { const kk = P.pop(t, ev.c2_life[i], 0.4); if (kk <= 0) return; const [x, y] = at(f); P.at(ctx, x, y - 12, kk, 0, () => {
      if (k === 'crab') { ctx.fillStyle = '#D9523C'; ctx.beginPath(); ctx.ellipse(0, -18, 34, 22, 0, 0, 7); ctx.fill(); ctx.strokeStyle = '#D9523C'; ctx.lineWidth = 6; for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(s * 28, -26); ctx.lineTo(s * 52, -48); ctx.stroke(); } ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(-9, -40, 5, 0, 7); ctx.arc(9, -40, 5, 0, 7); ctx.fill(); }
      if (k === 'mussels') for (let j = 0; j < 4; j++) { ctx.fillStyle = '#26304A'; ctx.beginPath(); ctx.ellipse(-36 + j * 24, -10, 12, 24, 0.5, 0, 7); ctx.fill(); }
      if (k === 'seaweed') { ctx.strokeStyle = '#3F8A3A'; ctx.lineWidth = 10; ctx.lineCap = 'round'; for (let j = 0; j < 3; j++) { ctx.beginPath(); ctx.moveTo(-20 + j * 20, 0); ctx.quadraticCurveTo(-30 + j * 20 + Math.sin(t * 2 + j) * 14, -50, -16 + j * 20, -100); ctx.stroke(); } }
      if (k === 'bird') { ctx.fillStyle = '#F2F2F2'; ctx.beginPath(); ctx.ellipse(0, -40, 36, 20, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(30, -60, 13, 0, 7); ctx.fill(); ctx.fillStyle = '#F2A33A'; ctx.beginPath(); ctx.moveTo(40, -60); ctx.lineTo(62, -56); ctx.lineTo(40, -54); ctx.fill(); ctx.strokeStyle = '#E88F2E'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-6, -22); ctx.lineTo(-8, 0); ctx.moveTo(8, -22); ctx.lineTo(10, 0); ctx.stroke(); }
    }); P.label(ctx, k, x, y + 40, { size: 26, color: '#14213D', align: 'center', alpha: clamp(kk) }); });
    P.tag(ctx, 'the strip between the tides', 1380, 160, t, ev.c2_s6 + 0.4, 1e9, { size: 38, fill: 'rgba(14,19,48,0.85)' });
    if (t > ev.c2_narrow) P.tag(ctx, 'no Moon: much narrower', 1380, 260, t, ev.c2_narrow + 0.2, 1e9, { size: 36, border: C.coral, fill: 'rgba(14,19,48,0.85)' });
    void slope;
  }, { in: { type: 'push', dur: 0.5 } });
})();
