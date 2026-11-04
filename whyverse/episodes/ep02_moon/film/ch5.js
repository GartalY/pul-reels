// Chapter 5 — The brake on Earth's spin: bulges dragged ahead, the Moon tugs back, days get longer.
(function () {
  const { U, G, Ch, P, SCORE: S, Shots, K } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const MD = 5.0;
  const top = (ctx, t, { lead = 14, bulgeOp = 0.9, moonD = MD, spin = t * 0.5, moon = true, amt = 0.16, ringOp = 0.3 } = {}) => {
    const a = (lead * Math.PI) / 180;
    M3.draw(ctx, K.scene(t, { cam: K.cam([2.2, 7.6, 0.9], [2.2, 0, 0], 40, [0, 0, -1]), sun: K.nrm([0.1, 0.95, 0.3]), earth: { tiltDeg: 0, spin },
      moon: { pos: [moonD, 0, 0], r: 0.3, show: moon }, bulge: { amt, dir: [Math.cos(a), 0, -Math.sin(a)], op: bulgeOp }, ring: { center: [0, 0, 0], r: moonD, normal: [0, 1, 0], op: moon ? ringOp : 0 } }));
  };
  // curved spin arrow around a screen point
  const spinArrow = (ctx, x, y, r, t, { k = 1, color = C.gold, speed = 1 } = {}) => {
    if (k <= 0) return; const a0 = -t * speed, a1 = a0 - 4.2 * k; ctx.strokeStyle = color; ctx.lineWidth = 9; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(x, y, r, a1, a0); ctx.stroke(); const hx = x + Math.cos(a1) * r, hy = y + Math.sin(a1) * r, tg = a1 - Math.PI / 2;
    ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(hx + Math.cos(tg) * 26, hy + Math.sin(tg) * 26); ctx.lineTo(hx + Math.cos(tg + 2.4) * 20, hy + Math.sin(tg + 2.4) * 20); ctx.lineTo(hx + Math.cos(tg - 2.4) * 20, hy + Math.sin(tg - 2.4) * 20); ctx.fill();
  };
  P.cardShot('c5', 5, 'The brake on Earth’s spin', (ctx, t) => top(ctx, t, { bulgeOp: 0, spin: t * 0.9 }));

  // S1 — bulges dragged ahead of the Moon
  P.shot(ev.c5_s1, (ctx, t) => {
    const lead = 14 * ease.inOutCubic(clamp((t - ev.c5_ahead + 0.6) / 1.0));
    top(ctx, t, { lead });
    const c = M3.project([0, 0, 0]), m = M3.project([MD, 0, 0]), a = (lead * Math.PI) / 180, b = M3.project([1.6 * Math.cos(a), 0, -1.6 * Math.sin(a)]);
    ctx.setLineDash([12, 12]); ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.lineTo(m[0], m[1]); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = '#7FC3FF'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(c[0], c[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
    spinArrow(ctx, c[0], c[1], 300, t, { k: clamp((t - ev.c5_s1) / 0.6) });
    P.tag(ctx, 'Earth spins faster than the Moon orbits', 560, 140, t, ev.c5_s1 + 0.4, 1e9, { size: 34 });
    P.callout(ctx, 'bulge dragged ahead', b[0], b[1], t, ev.c5_ahead, { dx: 140, dy: -160, size: 34, border: '#7FC3FF' });
    P.callout(ctx, 'MOON', m[0], m[1], t, ev.c5_s1 + 0.6, { dx: -40, dy: 150, size: 30 });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — the Moon tugs back: a brake
  P.shot(ev.c5_s2, (ctx, t) => {
    top(ctx, t, { lead: 14, spin: t * lerp(0.5, 0.3, clamp((t - ev.c5_brake) / 2)) });
    const c = M3.project([0, 0, 0]), a = (14 * Math.PI) / 180, b = M3.project([1.25 * Math.cos(a), 0, -1.25 * Math.sin(a)]), m = M3.project([MD, 0, 0]);
    const kt = clamp((t - ev.c5_tug) / 0.5); P.arrow(ctx, b[0], b[1], lerp(b[0], m[0], 0.45), lerp(b[1], m[1], 0.45) + 50, { k: kt, lw: 11, head: 30, color: C.coral });
    spinArrow(ctx, c[0], c[1], 300, t, { k: 1, speed: lerp(1, 0.4, clamp((t - ev.c5_brake) / 2)) });
    const kb = P.pop(t, ev.c5_brake, 0.45); if (kb > 0) P.at(ctx, 1500, 300, kb, 0, () => { P.panel(ctx, -230, -150, 460, 300, {});
      ctx.strokeStyle = C.coral; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(0, -20, 80, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.arc(0, -20, 112, -2.4, -0.7); ctx.stroke(); ctx.beginPath(); ctx.arc(0, -20, 112, 0.7 + Math.PI, 2.4 + Math.PI); ctx.stroke();
      G.text(ctx, '!', 0, 10, { size: 90, fam: FT.title, weight: 400, color: C.coral, align: 'center', boil: 0 }); G.text(ctx, 'BRAKE', 0, 128, { size: 50, fam: FT.title, weight: 400, color: C.white, align: 'center', boil: 0 }); });
    P.tag(ctx, 'very slowly, the spin winds down', 560, 960, t, ev.c5_brake + 0.6, 1e9, { size: 36 });
  }, { in: { type: 'push', dur: 0.4 } });

  // S3 — day length through time
  P.shot(ev.c5_s3, (ctx, t) => {
    P.spaceBg(ctx, t, { stars: 0.5 });
    const X0 = 260, X1 = 1680, Y0 = 860, Y1 = 260; const xa = (ga) => lerp(X0, X1, 1 - ga / 1.5), yh = (h) => lerp(Y0, Y1, (h - 16) / 9);
    const ka = clamp((t - ev.c5_s3) / 0.5); ctx.globalAlpha = ka;
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X0, Y0); ctx.lineTo(X1, Y0); ctx.moveTo(X0, Y0); ctx.lineTo(X0, Y1); ctx.stroke();
    for (const h of [18, 20, 22, 24]) { G.text(ctx, h + ' h', X0 - 20, yh(h) + 10, { size: 28, fam: FT.ui, weight: 700, color: C.dim, align: 'right', boil: 0 }); ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fillRect(X0, yh(h) - 1, X1 - X0, 2); }
    for (const [ga, s] of [[1.4, '1.4 billion years ago'], [0.62, '620 million'], [0, 'today']]) G.text(ctx, s, xa(ga), Y0 + 50, { size: 28, fam: FT.ui, weight: 700, color: C.dim, align: 'center', boil: 0 });
    ctx.globalAlpha = 1;
    const pts = [[1.4, 18.0, ev.c5_14, ev.c5_18], [0.62, 21.9, ev.c5_620, ev.c5_22], [0, 24, ev.c5_s3 + 0.5, ev.c5_s3 + 0.8]];
    // line through the points revealed in time order (today first, then back in time)
    ctx.strokeStyle = C.gold; ctx.lineWidth = 6; ctx.beginPath(); let first = true;
    for (const [ga, h, t0] of [...pts].sort((a, b) => b[0] - a[0])) { if (t < t0) continue; const x = xa(ga), y = yh(h); first ? ctx.moveTo(x, y) : ctx.lineTo(x, y); first = false; } ctx.stroke();
    pts.forEach(([ga, h, t0, t1], i) => { const k = P.pop(t, t0, 0.4); if (k <= 0) return; const x = xa(ga), y = yh(h);
      P.at(ctx, x, y, k, 0, () => { ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(0, 0, 16, 0, 7); ctx.fill(); });
      P.counter(ctx, { x, y: y - 110, from: 24, to: h, decimals: i === 2 ? 0 : 1, suffix: ' h', t, t0, t1: Math.max(t0 + 0.3, t1), size: 64, card: true, sub: i === 1 ? 'under 22 hours' : i === 0 ? 'just over 18' : 'a day today' }); });
    P.tag(ctx, '~400 days in a year back then', 1300, 180, t, ev.c5_400, 1e9, { size: 38 });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S4 — +2 ms per century
  P.shot(ev.c5_s4, (ctx, t) => {
    P.spaceBg(ctx, t, { stars: 0.5 });
    const k = P.pop(t, ev.c5_s4 + 0.2, 0.4); P.at(ctx, 620, 560, k, 0, () => { ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.beginPath(); ctx.arc(0, 0, 240, 0, 7); ctx.fill(); ctx.strokeStyle = C.white; ctx.lineWidth = 10; ctx.stroke();
      ctx.fillStyle = C.white; ctx.fillRect(-30, -290, 60, 40); for (let i = 0; i < 60; i++) { const a = i / 60 * 6.283; ctx.fillStyle = i % 5 ? 'rgba(255,255,255,0.35)' : C.white; ctx.fillRect(Math.cos(a) * 210 - 2, Math.sin(a) * 210 - 2, 4, 4); }
      const a = -Math.PI / 2 + (t - ev.c5_s4) * 3.2; ctx.strokeStyle = C.gold; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * 190, Math.sin(a) * 190); ctx.stroke(); });
    P.counter(ctx, { x: 1360, y: 420, from: 0, to: 0.002, decimals: 3, prefix: '+', suffix: ' s', t, t0: ev.c5_ms - 0.4, t1: ev.c5_ms + 0.3, size: 110, sub: 'longer day' });
    P.tag(ctx, 'every century', 1360, 640, t, ev.c5_century, 1e9, { size: 44 });
    P.label(ctx, 'measured: ~1.8 ms per century · tides alone: ~2.3', 1360, 760, { size: 26, align: 'center', alpha: clamp((t - ev.c5_century - 0.5) / 0.4) });
  }, { in: { type: 'push', dur: 0.5 } });

  // S5 — no Moon: the brake comes off
  P.shot(ev.c5_s5, (ctx, t) => {
    const off = ease.inOutCubic(clamp((t - ev.c5_off) / 0.8));
    top(ctx, t, { moon: off < 0.5, bulgeOp: lerp(0.9, 0.5, off), amt: lerp(0.16, 0.07, off), lead: lerp(14, 6, off), spin: t * 0.5 });
    const c = M3.project([0, 0, 0]); spinArrow(ctx, c[0], c[1], 300, t, { k: 1, color: off > 0.5 ? C.white : C.gold });
    if (off > 0 && off < 1) P.sparkle(ctx, M3.project([MD, 0, 0])[0], M3.project([MD, 0, 0])[1], t, ev.c5_off, { n: 14, r: 140, color: '#E8EEFF' });
    P.stamp(ctx, 'BRAKE OFF', 1480, 260, t, ev.c5_off, { size: 84, color: C.white });
    P.tag(ctx, "the Sun's tides: much gentler", 1480, 900, t, ev.c5_gentle - 0.6, 1e9, { size: 36, border: '#FFE08A' });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — the twist: spin → orbit, the Moon drifts away
  P.shot(ev.c5_s6, (ctx, t) => {
    const dr = ease.inOutCubic(clamp((t - ev.c5_drift) / 2.4)); const d = MD + 0.9 * dr;
    top(ctx, t, { moonD: d, spin: t * 0.4, ringOp: 0.35 });
    const c = M3.project([0, 0, 0]), m = M3.project([d, 0, 0]);
    spinArrow(ctx, c[0], c[1], 300, t, { k: 1, speed: 0.6 });
    const ki = clamp((t - ev.c5_into) / 0.9);
    if (ki > 0) { ctx.save(); ctx.setLineDash([22, 16]); ctx.lineDashOffset = -t * 120; P.arrow(ctx, c[0] + 320, c[1] - 120, m[0] - 60, m[1] - 120, { k: ki, lw: 10, head: 30 }); ctx.restore();
      P.tag(ctx, 'spin → orbit', (c[0] + m[0]) / 2 + 100, c[1] - 220, t, ev.c5_into + 0.2, 1e9, { size: 40 }); }
    P.stamp(ctx, 'THE TWIST', 560, 140, t, ev.c5_twist, { size: 70 });
    P.callout(ctx, 'drifting away', m[0], m[1], t, ev.c5_drift, { dx: -60, dy: 170, size: 34 });
  }, { in: { type: 'push', dur: 0.4 } });
})();
