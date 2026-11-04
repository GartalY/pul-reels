// Chapter 7 — The real news: lasers on Apollo mirrors, 3.8 cm a year, the Theia impact, eclipses fading.
(function () {
  const { U, G, Ch, P, SCORE: S, Shots, K } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  P.cardShot('c7', 7, 'The real news', (ctx, t) => { const u = (t - S.CH.c7.t0) / 7;
    M3.draw(ctx, K.scene(t, { cam: K.cam([-1.4, 0.5, 4.2], [1.2, 0.2, -1.5], 40), sun: K.nrm([1, 0.25, 0.6]), moon: { pos: [3.2 + 1.2 * u, 0.4, -3.4 - 1.4 * u], r: 0.34 } })); });

  // S1 — lasers to the Apollo mirrors, 2.5 s round trip
  P.shot(ev.c7_s1, (ctx, t) => {
    const E0 = [0.55, 0.62, 0.56], MP = [4.6, 0.6, -1.0];
    const rt = 2.56 * 1.0; const kL = clamp((t - ev.c7_laser) / 0.3); const ph = t > ev.c7_laser ? ((t - ev.c7_laser) % rt) / rt : -1; const pk = ph < 0 ? -1 : ph < 0.5 ? ph * 2 : 2 - ph * 2;
    const moonEdge = K.add(MP, K.mul(K.nrm(K.add(E0, K.mul(MP, -1))), 0.33));
    M3.draw(ctx, K.scene(t, { cam: K.cam([2.2, 1.6, 5.6], [2.3, 0.3, -0.4], 38), sun: K.nrm([0.4, 0.5, 1]), moon: { pos: MP, r: 0.34 }, laser: { a: E0, b: moonEdge, op: kL, pulse: pk, w: 0.012 } }));
    const pm = M3.project(moonEdge), pe = M3.project(E0);
    P.callout(ctx, 'APOLLO MIRRORS', pm[0], pm[1], t, ev.c7_mirrors, { dx: -80, dy: -170, size: 34 });
    P.callout(ctx, 'LASER STATION', pe[0], pe[1], t, ev.c7_laser + 0.2, { dx: -140, dy: -150, size: 30, border: '#7CFF9A' });
    P.tag(ctx, '50+ years of timing light', 960, 960, t, ev.c7_trip, 1e9, { size: 36 });
    const kr = P.pop(t, ev.c7_rt0 - 0.2, 0.4); if (kr > 0) P.at(ctx, 1550, 880, kr, 0, () => { P.panel(ctx, -230, -90, 460, 180, {});
      const v = Math.min(2.5, Math.max(0, t - ev.c7_rt0) * 1.6); G.text(ctx, v.toFixed(1) + ' s', 0, 24, { size: 84, fam: FT.title, weight: 400, color: '#9CFFB4', align: 'center', boil: 0 }); P.label(ctx, 'there and back', 0, 68, { size: 24, align: 'center' }); });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — 3.8 cm a year ≈ fingernails
  P.shot(ev.c7_s2, (ctx, t) => {
    P.spaceBg(ctx, t);
    const k = ease.outCubic(clamp((t - ev.c7_38) / 1.0));
    // ruler
    const X0 = 260, CM = 120; P.panel(ctx, X0 - 40, 260, 5 * CM + 80, 160, { r: 16, fill: 'rgba(255,214,120,0.92)', stroke: null });
    for (let i = 0; i <= 50; i++) { const x = X0 + i * CM / 10; ctx.fillStyle = '#2A2320'; ctx.fillRect(x - 1.5, 260, 3, i % 10 ? (i % 5 ? 26 : 40) : 56); if (i % 10 === 0) G.text(ctx, String(i / 10), x, 360, { size: 30, fam: FT.ui, weight: 800, color: '#2A2320', align: 'center', boil: 0 }); }
    ctx.fillStyle = C.coral; ctx.fillRect(X0, 404, 3.8 * CM * k, 12);
    P.counter(ctx, { x: X0 + 2.5 * CM, y: 610, from: 0, to: 3.8, decimals: 1, suffix: ' cm', t, t0: ev.c7_38, t1: ev.c7_38 + 1.0, size: 110, sub: 'farther away every year' });
    // a finger whose nail grows
    const kn = P.pop(t, ev.c7_nail, 0.4); if (kn > 0) P.at(ctx, 1380, 640, kn, -0.2, () => {
      ctx.fillStyle = '#E8B48F'; P.rr(ctx, -110, -320, 220, 640, 110); ctx.fill();
      const g = clamp((t - ev.c7_nail) / 1.5); ctx.fillStyle = '#F8E3DA'; P.rr(ctx, -74, -300 - 30 * g, 148, 190 + 30 * g, 70); ctx.fill(); ctx.fillStyle = '#FFFFFF'; ctx.fillRect(-74, -300 - 30 * g, 148, 22 + 30 * g);
      G.text(ctx, '≈ same speed', 0, 420, { size: 44, fam: FT.ui, weight: 800, color: C.white, align: 'center', boil: 0 }); });
    // Luna tiptoes away
    const u = clamp((t - ev.c7_s2) / 7); Ch.luna(ctx, { x: lerp(900, 1050, u), y: 900, s: 0.6, t, eyes: 'happy', mouth: 'smile', armR: 0.9, wave: 1 });
  }, { in: { type: 'push', dur: 0.5 } });

  // S3 — Theia: the impact that made the Moon
  P.shot(ev.c7_s3, (ctx, t) => {
    const ti = ev.sync_impact; const a = clamp((t - (ti - 2.2)) / 2.2);
    const TH0 = [7, 1.4, -4], TH1 = [1.35, 0.25, -0.35];
    const thPos = K.lerp3(TH0, TH1, ease.inQuad(a));
    const after = t - ti; const fl = after < 0 ? 0 : Math.exp(-after * 1.6);
    const moonK = clamp((after - 1.6) / 1.6);
    const shake = after > 0 && after < 0.3 ? 6 * (1 - after / 0.3) : 0;
    ctx.save(); ctx.translate(Math.sin(t * 90) * shake, Math.cos(t * 77) * shake);
    M3.draw(ctx, K.scene(t, { cam: K.cam([0.6, 1.2, 5.6], [1.0, 0.1, -0.6], 42), sun: K.nrm([1, 0.4, 0.8]), exposure: 1 + fl * 0.6,
      earth: { lights: 0, spin: t * 0.4 }, theia: after < 0.05 ? { pos: thPos, r: 0.5 } : null, flash: fl > 0.01 ? { pos: [1.0, 0.2, -0.25], size: 6 * fl + 1, op: fl } : null,
      moon: { pos: K.moonAt(2.4, 30 + after * 25, 5), r: 0.27 * moonK, opacity: moonK, show: moonK > 0.01, glow: [0.25 * (1 - moonK), 0.08 * (1 - moonK), 0] } }));
    // debris ring
    if (after > 0) { const c = M3.project([0, 0, 0]); const n = 260; for (let i = 0; i < n; i++) { const ang = U.hash(i, 3) * 6.283 + after * (0.6 + U.hash(i, 4)) * 0.5; const r = (180 + 260 * U.hash(i, 5)) * Math.min(1, after * 0.9 + 0.2);
      const x = c[0] + Math.cos(ang) * r * 1.4, y = c[1] + Math.sin(ang) * r * 0.42; const al = Math.max(0, 1 - moonK * 0.9) * (0.4 + 0.6 * U.hash(i, 6));
      ctx.fillStyle = `rgba(255,${150 + 80 * U.hash(i, 7)},${90 + 60 * U.hash(i, 8)},${al})`; ctx.beginPath(); ctx.arc(x, y, 2 + 3 * U.hash(i, 9), 0, 7); ctx.fill(); } }
    ctx.restore();
    if (t < ti) { const tp = M3.project(thPos); P.callout(ctx, 'THEIA (about Mars-sized)', tp[0], tp[1], t, ev.c7_theia, { dx: -170, dy: -140, size: 32, t1: ti - 0.1 }); }
    P.tag(ctx, '≈ 4.5 billion years ago', 420, 140, t, ev.c7_s3 + 0.4, 1e9, { size: 36 });
    P.stamp(ctx, '15–20× CLOSER', 1450, 860, t, ev.c7_closer, { size: 80 });
    P.label(ctx, 'than today (estimate)', 1450, 950, { size: 26, align: 'center', alpha: clamp((t - ev.c7_closer - 0.2) / 0.3) });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S4 — the Moon shrinks in our sky; total eclipses fade
  P.shot(ev.c7_s4, (ctx, t) => {
    const sky = ctx.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#0B1430'); sky.addColorStop(1, '#1C2A55'); ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H); P.stars(ctx, t, { a: 0.6 });
    const sh = ease.inOutCubic(clamp((t - ev.c7_600 + 0.3) / 2.2)); const x = 960, y = 470, R = 200;
    P.glow(ctx, x, y, R * 2.4, 'rgba(255,200,110,', 0.7);
    ctx.fillStyle = '#FFD86A'; ctx.beginPath(); ctx.arc(x, y, R, 0, 7); ctx.fill();
    ctx.fillStyle = '#05070E'; ctx.beginPath(); ctx.arc(x, y, R * lerp(1.03, 0.9, sh), 0, 7); ctx.fill();
    // timeline slider
    const X0 = 460, X1 = 1460, Y = 880; ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.fillRect(X0, Y - 3, X1 - X0, 6);
    ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(lerp(X0, X1, sh), Y, 18, 0, 7); ctx.fill();
    G.text(ctx, 'TODAY', X0, Y + 56, { size: 28, fam: FT.ui, weight: 800, color: C.dim, align: 'center', boil: 0 });
    G.text(ctx, '+600 MILLION YEARS', X1, Y + 56, { size: 28, fam: FT.ui, weight: 800, color: C.dim, align: 'center', boil: 0 });
    P.tag(ctx, 'too small to cover the Sun', 960, 160, t, ev.c7_small, 1e9, { size: 40 });
    P.stamp(ctx, 'TOTAL ECLIPSES START TO FADE', 960, 760, t, ev.c7_end, { size: 58, color: C.white });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S5 — it won't escape; the Sun changes first
  P.shot(ev.c7_s5, (ctx, t) => {
    const u = clamp((t - ev.c7_sun) / 2.5);
    M3.draw(ctx, K.scene(t, { cam: K.cam(K.sph(9, 78 + (t - ev.c7_s5) * 1.5, 12, [2, 0, 0]), [1.0, 0.2, 0], 40), sun: K.nrm([-1, 0.12, 0.25]), sunSize: 70 + 110 * ease.inOutCubic(u),
      moon: { pos: K.moonAt(5.0, 40 + (t - ev.c7_s5) * 6), r: 0.27 }, ring: { center: [0, 0, 0], r: 5.0, normal: [0, 1, 0], op: 0.35 } }));
    P.stamp(ctx, "WON'T ESCAPE", 1450, 200, t, ev.c7_escape, { size: 80 });
    P.tag(ctx, 'the Sun changes long before', 1450, 900, t, ev.c7_sun + 0.2, 1e9, { size: 38, border: '#FFB347' });
  }, { in: { type: 'push', dur: 0.5 } });
})();
