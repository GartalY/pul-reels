// Chapter 1 — The night goes dark: albedo, lux, a moonless landscape, dung beetles, Arctic zooplankton.
(function () {
  const { U, G, Ch, P, SCORE: S, Shots, K } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  // card backdrop: Earth's night side drifting
  const nightEarth = (ctx, t, moonOn = 1) => {
    const a = 200 + t * 1.2;
    M3.draw(ctx, K.scene(t, { cam: K.cam(K.sph(3.6, a, 12), [0, -0.3, 0], 40), sun: K.nrm([0.4, 0.1, -1]), earth: { spin: t * 0.03 }, moon: { show: false } }));
  };
  P.cardShot('c1', 1, 'The night goes dark', nightEarth);

  // S1 — the Moon is dark: albedo meter
  P.shot(ev.c1_s1, (ctx, t) => {
    const u = clamp((t - ev.c1_s1) / 12);
    M3.draw(ctx, K.scene(t, { cam: K.cam([0, 0, 3.0 - 0.15 * u], [-0.55, 0, 0], 38), sun: K.nrm([-0.6, 0.2, 0.8]), earth: { show: false }, moon: { pos: [0.35, 0, 0], r: 1.0, spin: -1.3 + t * 0.03 } }));
    P.kicker(ctx, 'How bright is the Moon, really?', t, ev.c1_s1 + 0.2);
    // panel: 100 rays in, 12 bounce back
    const k = P.pop(t, ev.c1_s1 + 0.3, 0.4); if (k > 0) P.at(ctx, 470, 560, k, 0, () => {
      P.panel(ctx, -330, -300, 660, 600, {});
      P.label(ctx, 'sunlight in', -280, -240, { size: 28, color: C.gold });
      for (let i = 0; i < 10; i++) { const y = -200 + i * 26; const q = clamp((t - (ev.c1_s1 + 0.5 + i * 0.05)) / 0.5); P.arrow(ctx, -280, y, -280 + 300, y + 60, { color: 'rgba(255,196,61,0.9)', lw: 5, head: 16, k: q }); }
      const q2 = clamp((t - ev.c1_tenth) / 0.5); P.arrow(ctx, 40, 20, 240, -160, { color: C.white, lw: 9, head: 26, k: q2 });
      G.text(ctx, '~12%', 210, -190, { size: 64, fam: FT.title, weight: 400, color: C.white, alpha: q2, boil: 0 });
      P.label(ctx, 'bounces back', 120, -120, { size: 26, alpha: q2 });
      // asphalt swatch
      const qa = P.pop(t, ev.c1_asphalt, 0.4); if (qa > 0) P.at(ctx, 0, 170, qa, 0, () => {
        P.rr(ctx, -270, -70, 540, 140, 20); ctx.fillStyle = '#3B3C40'; ctx.fill();
        for (let j = 0; j < 160; j++) { ctx.fillStyle = `rgba(${150 + 80 * U.hash(j, 2)},${150 + 80 * U.hash(j, 2)},${150 + 80 * U.hash(j, 2)},0.35)`; ctx.fillRect(-260 + U.hash(j, 1) * 520, -60 + U.hash(j, 3) * 120, 3, 3); }
        ctx.fillStyle = '#EDEDED'; for (let j = 0; j < 4; j++) ctx.fillRect(-230 + j * 130, -6, 70, 12);
        G.text(ctx, 'worn asphalt', 0, 118, { size: 40, fam: FT.ui, weight: 800, color: C.white, align: 'center', boil: 0 }); });
    });
    if (t > ev.c1_black) P.tag(ctx, 'it only LOOKS bright: the sky is black', 1250, 960, t, ev.c1_black, 1e9, { size: 36 });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — lux meter
  P.shot(ev.c1_s2, (ctx, t) => {
    P.spaceBg(ctx, t, { top: '#070B1A', bottom: '#111A3C' });
    P.kicker(ctx, 'Light on the ground', t, ev.c1_s2 + 0.1);
    const X0 = 260, X1 = 1660, Y = 600;
    // log scale 0.001 → 100,000 lux
    const lx = (v) => X0 + (Math.log10(v) + 3) / 8 * (X1 - X0);
    const k = clamp((t - ev.c1_s2 - 0.1) / 0.6); ctx.save(); ctx.globalAlpha = k;
    ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(X0, Y); ctx.lineTo(X0 + (X1 - X0) * ease.outCubic(k), Y); ctx.stroke();
    [[0.001, '0.001'], [0.1, '0.1'], [10, '10'], [1000, '1,000'], [100000, '100,000']].forEach(([v, s]) => { ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillRect(lx(v) - 2, Y - 14, 4, 28); G.text(ctx, s, lx(v), Y + 64, { size: 30, fam: FT.ui, weight: 700, color: C.dim, align: 'center', boil: 0 }); });
    P.label(ctx, 'lux (log scale: each step = ×100)', X0, Y + 120, { size: 26 });
    ctx.restore();
    // full moon marker
    const km = P.pop(t, ev.c1_lux, 0.45); if (km > 0) { P.at(ctx, lx(0.1), Y - 150, km, 0, () => { P.moonDisc(ctx, 0, 0, 62, { glow: 0.6 }); }); G.text(ctx, 'FULL MOON ≈ 0.1', lx(0.1), Y - 250, { size: 40, fam: FT.title, weight: 400, color: C.white, align: 'center', alpha: clamp(km), boil: 0 }); }
    // sun grows across the scale
    const ks = clamp((t - ev.c1_sun0) / Math.max(0.4, ev.c1_sun1 - ev.c1_sun0));
    if (ks > 0) { const x = lerp(lx(0.1), lx(100000), ease.inOutCubic(ks)); ctx.fillStyle = 'rgba(255,196,61,0.85)'; P.rr(ctx, lx(0.1), Y - 22, x - lx(0.1), 44, 22); ctx.fill();
      P.at(ctx, x, Y - 150, 1, 0, () => { P.glow(ctx, 0, 0, 160, 'rgba(255,210,120,', 0.9); ctx.fillStyle = '#FFF3C8'; ctx.beginPath(); ctx.arc(0, 0, 56, 0, 7); ctx.fill(); });
      P.counter(ctx, { x: 1180, y: 900, from: 1, to: 400000, t, t0: ev.c1_sun0, t1: ev.c1_sun1, size: 110, suffix: '×', sub: 'the Sun is brighter than the full Moon' }); }
  }, { in: { type: 'push', dur: 0.5 } });

  // shared flat night landscape
  const land = (ctx, t, moonA, dark) => {
    const sky = ctx.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, P.mix('#1B2A5C', '#03040A', dark)); sky.addColorStop(1, P.mix('#3A4C82', '#070912', dark));
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H); P.stars(ctx, t, { a: 0.5 + 0.5 * dark, n: 260, y1: 700 });
    P.moonDisc(ctx, 1450, 230, 80, { alpha: moonA, glow: 0.9 });
    const hill = (pts, c) => { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(0, H); pts.forEach(([x, y]) => ctx.lineTo(x, y)); ctx.lineTo(W, H); ctx.closePath(); ctx.fill(); };
    hill([[0, 700], [300, 640], [700, 690], [1100, 610], [1500, 670], [1920, 630]], P.mix('#33477A', '#06080F', dark));
    hill([[0, 820], [400, 760], [800, 800], [1200, 740], [1600, 790], [1920, 760]], P.mix('#24345E', '#04050A', dark));
    // town
    for (let i = 0; i < 9; i++) { const x = 1040 + i * 58, h = 50 + 40 * U.hash(i, 5); ctx.fillStyle = P.mix('#1C2748', '#030408', dark); ctx.fillRect(x, 760 - h, 48, h + 60); }
    for (let i = 0; i < 6; i++) { const x = 360 + i * 110; ctx.fillStyle = P.mix('#1F3A33', '#040706', dark); ctx.beginPath(); ctx.moveTo(x, 900); ctx.lineTo(x - 38, 900); ctx.lineTo(x - 19, 800 - 30 * U.hash(i, 2)); ctx.fill(); }
  };
  // S3 — every night a new-moon night
  P.shot(ev.c1_s3, (ctx, t) => {
    const f = ease.inOutCubic(clamp((t - ev.c1_fade) / 1.6));
    land(ctx, t, 1 - f, f);
    // lamps pop on
    ev.c1_lamps.forEach((tl, i) => { const k = P.pop(t, tl, 0.3); if (k <= 0) return; const x = 1064 + i * 75, y = 700 + 18 * U.hash(i, 8);
      P.glow(ctx, x, y, 60 * k, 'rgba(255,190,90,', 0.9); ctx.fillStyle = '#FFD27A'; ctx.fillRect(x - 8, y - 8, 16, 16); });
    P.stamp(ctx, 'NEW MOON. FOREVER.', 640, 300, t, ev.c1_forever, { size: 84, color: C.white });
    P.kicker(ctx, 'Without the Moon', t, ev.c1_s3 + 0.2);
    P.tag(ctx, 'astronomers: delighted', 520, 470, t, ev.c1_astro, 1e9, { size: 36 });
    P.tag(ctx, 'everyone else: flashlight', 520, 560, t, ev.c1_torch, 1e9, { size: 36, border: C.dim });
    if (t > ev.c1_torch) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const bx = 300, by = 930; const gr = ctx.createRadialGradient(bx, by, 0, bx + 300, by - 40, 380); gr.addColorStop(0, 'rgba(255,240,190,0.5)'); gr.addColorStop(1, 'rgba(255,240,190,0)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + 620, by - 200); ctx.lineTo(bx + 620, by + 120); ctx.fill(); ctx.restore(); P.icon(ctx, 'person', bx - 20, by - 10, 50, { color: '#0B0E1C' }); }
  }, { in: { type: 'fade', dur: 0.5 } });

  // S4 — dung beetles steer by polarized moonlight
  const beetle = (ctx, x, y, s, t, roll) => {
    P.at(ctx, x, y, s, 0, () => {
      const br = 54; ctx.save(); ctx.translate(70, -br); ctx.rotate(roll); ctx.fillStyle = '#6B4B2E'; ctx.beginPath(); ctx.arc(0, 0, br, 0, 7); ctx.fill();
      ctx.strokeStyle = 'rgba(40,25,10,0.5)'; ctx.lineWidth = 4; for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(0, 0, br * 0.7, i * 1.6, i * 1.6 + 0.8); ctx.stroke(); } ctx.restore();
      // beetle doing a handstand, back legs on the ball
      ctx.fillStyle = '#15171F'; ctx.beginPath(); ctx.ellipse(-20, -40, 44, 30, -0.7, 0, 7); ctx.fill();
      ctx.fillStyle = '#2A2E3C'; ctx.beginPath(); ctx.ellipse(-50, -10, 18, 14, -0.7, 0, 7); ctx.fill();
      ctx.strokeStyle = '#15171F'; ctx.lineWidth = 6; ctx.lineCap = 'round';
      const st = Math.sin(t * 9) * 8;
      for (const [a, b, c, d] of [[-8, -60, 22, -86 + st], [4, -48, 30, -50 - st], [-30, -30, -40 + st, 0], [-50, -14, -70 - st, 0]]) { ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke(); }
      ctx.fillStyle = 'rgba(160,200,255,0.5)'; ctx.beginPath(); ctx.ellipse(-30, -52, 20, 8, -0.7, 0, 7); ctx.fill();
    });
  };
  P.shot(ev.c1_s4, (ctx, t) => {
    const sky = ctx.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#152454'); sky.addColorStop(1, '#2F3F70'); ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    P.stars(ctx, t, { a: 0.6, n: 160, y1: 650 });
    const mx = 1500, my = 200; P.moonDisc(ctx, mx, my, 70, { glow: 0.9 });
    // polarization pattern: concentric arcs centred on the Moon (light polarized at 90° to the Moon direction)
    const kp = clamp((t - ev.c1_pol) / 0.9);
    if (kp > 0) { ctx.save(); ctx.globalAlpha = 0.55 * kp; ctx.strokeStyle = '#9FD3FF'; ctx.lineWidth = 3; ctx.setLineDash([16, 14]); ctx.lineDashOffset = -t * 30;
      for (let r = 220; r < 1600; r += 140) { ctx.beginPath(); ctx.arc(mx, my, r * (0.8 + 0.2 * kp), 0, Math.PI * 2); ctx.stroke(); } ctx.setLineDash([]); ctx.restore();
      P.tag(ctx, 'polarized moonlight = a compass', 1250, 470, t, ev.c1_pol + 0.2, 1e9, { size: 36, border: '#9FD3FF' }); }
    ctx.fillStyle = '#3B3A3F'; ctx.fillRect(0, 820, W, 260); ctx.fillStyle = '#4A4850'; ctx.fillRect(0, 820, W, 10);
    for (let i = 0; i < 14; i++) { const x = (i * 157 + 40) % W; ctx.fillStyle = '#2E5040'; ctx.beginPath(); ctx.moveTo(x, 822); ctx.lineTo(x + 12, 770 - 30 * U.hash(i, 3)); ctx.lineTo(x + 24, 822); ctx.fill(); }
    // straight track
    const u = clamp((t - ev.c1_roll) / 9); const bx = lerp(200, 1450, u);
    ctx.strokeStyle = 'rgba(255,196,61,0.75)'; ctx.lineWidth = 6; ctx.setLineDash([2, 14]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(160, 905); ctx.lineTo(bx + 140, 905); ctx.stroke(); ctx.setLineDash([]);
    beetle(ctx, bx, 930, 2.0, t, (bx - 260) / 108);
    P.tag(ctx, 'AFRICA · dung beetle', 330, 160, t, ev.c1_africa, 1e9, { size: 36, align: 'left' });
    P.tag(ctx, 'a map in the sky', 330, 250, t, ev.c1_map, ev.c1_africa, { size: 40, align: 'left' });
    P.stamp(ctx, 'FIRST ANIMAL SHOWN · 2003', 960, 640, t, ev.c1_first, { size: 64, rot: -0.04 });
  }, { in: { type: 'push', dur: 0.5 } });

  // S5 — Arctic zooplankton follow the Moon in the polar night
  P.shot(ev.c1_s5, (ctx, t) => {
    const sky = ctx.createLinearGradient(0, 0, 0, 380); sky.addColorStop(0, '#060A18'); sky.addColorStop(1, '#16224A'); ctx.fillStyle = sky; ctx.fillRect(0, 0, W, 380);
    P.stars(ctx, t, { a: 0.8, n: 120, y1: 360 });
    const mOn = clamp((t - ev.c1_moonOn + 0.2) / 0.6);
    const ph = (t - ev.c1_s5) * 0.9; const mx = 300 + ((ph * 180) % 1400), my = 170 - Math.sin(((ph * 180) % 1400) / 1400 * Math.PI) * 90;
    P.moonDisc(ctx, mx, my, 46, { alpha: 0.25 + 0.75 * mOn, glow: mOn });
    // sea ice + water column
    ctx.fillStyle = '#DCEBF5'; ctx.fillRect(0, 372, W, 18); for (let i = 0; i < 12; i++) { ctx.fillStyle = '#EAF4FA'; ctx.fillRect(i * 170 + 30 * U.hash(i, 1), 362, 120, 14); }
    const sea = ctx.createLinearGradient(0, 390, 0, H); sea.addColorStop(0, '#0E2E4E'); sea.addColorStop(1, '#030B18'); ctx.fillStyle = sea; ctx.fillRect(0, 390, W, H - 390);
    // depth ruler
    for (let d = 0; d <= 100; d += 25) { const y = 390 + d * 6.4; ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(110, y - 2, 30, 4); G.text(ctx, d + ' m', 160, y + 10, { size: 26, fam: FT.ui, weight: 700, color: C.dim, boil: 0 }); }
    // zooplankton cloud: rises and sinks with the Moon (sinks deeper when it is up)
    const up = clamp((t - ev.c1_up) / 0.8);
    const depth = lerp(15, 15 + 35 * (0.5 + 0.5 * Math.sin((mx - 300) / 1400 * Math.PI * 2 - 1.5)) * mOn + 20 * (1 - mOn), up);
    for (let i = 0; i < 320; i++) { const x = 300 + U.hash(i, 3) * 1550 + Math.sin(t * 0.7 + i) * 10, y = 390 + (depth + (U.hash(i, 4) - 0.5) * 22 + Math.sin(t * 1.3 + i * 0.5) * 2) * 6.4;
      ctx.fillStyle = `rgba(150,230,255,${0.4 + 0.5 * U.hash(i, 5)})`; ctx.beginPath(); ctx.arc(x, y, 2 + 2.5 * U.hash(i, 6), 0, 7); ctx.fill(); }
    P.tag(ctx, 'ARCTIC WINTER: no sunrise for months', 1400, 470, t, ev.c1_arctic, 1e9, { size: 34 });
    P.tag(ctx, 'they follow the Moon instead (24.8-hour lunar day)', 1180, 1000, t, ev.c1_moonOn + 0.2, 1e9, { size: 32, border: '#9FE7FF' });
  }, { in: { type: 'fade', dur: 0.5 } });
})();
