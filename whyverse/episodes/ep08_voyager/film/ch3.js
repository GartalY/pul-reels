// Chapter 3 — A whisper across a light-day. Radio ≈ a fridge bulb · 3.7 m dish aimed at a planet too small to see · the beam spreads:
// NASA once put it at a tenth of a billionth of a trillionth of a watt; weaker today · Deep Space Network: 70 m dishes in California,
// Spain, Australia, a third of the way around the world apart · 160 bits/s (one phone photo ≈ 2 days) · commands: the Canberra dish ·
// "but a radio needs power — what keeps it alive?"
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  P.cardShot('c3', 3, 'A whisper across a light-day', 'night', (ctx, t) => {
    // a fridge in the dark, its bulb switches on
    const on = t > ev.c3_bulb ? 1 : 0; P.at(ctx, 1640, 1040, 1, 0, () => { P.silR(ctx, -90, -330, 180, 330, 12, {}); if (on) { P.rect(ctx, -78, -318, 156, 306, 8, '#FFF1C8'); P.glow(ctx, 0, -280, 200, '#FFF1C8', 1); P.circ(ctx, 0, -296, 14, '#FFFFFF'); P.silR(ctx, 78, -330, 64, 330, 8, { rimA: 0.3 }); } });
    P.hills(ctx, t, { y: 1060, layers: 1, tint: '#33215C' });
  });

  // S1 — the 3.7 m dish, aimed at a planet far too small and too distant to see
  P.shot(ev.c3_s1, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 240, seed: 71, glow: [1400, 400, 500, C.rose, 0.3] });
    P.voyager(ctx, 1260, 560, 1.35, t, { rot: 0.18, beam: P.fin(t, ev.c3_see, 0.5) });
    const dk = P.eio((t - ev.c3_37 + 0.3) / 0.5); P.dimLine(ctx, 1260 - 150 * 1.35 * Math.cos(0.1) + 30, 300, 1260 + 150 * 1.35 + 30, 360, '3.7 m', dk, { size: 40 });
    P.ring(ctx, 1260, 480, t, ev.c3_dish, { r: 260, color: C.gold });
    // the "target": a dot that is just a pixel
    const tk = P.fin(t, ev.c3_see - 0.5, 0.4); P.circ(ctx, 180, 760, 3, C.earth, { a: tk }); P.circle(ctx, 180, 760, 50, 50, tk, { color: C.gold, lw: 4 });
    P.note(ctx, 'Earth: too small to see from here', 330, 880, t, ev.c3_see, { size: 40, align: 'left' });
    P.line(ctx, 1080, 560, 210, 750, P.rgba(C.sig, 0.5), 3, P.fin(t, ev.c3_see, 0.4), 1, [6, 14]);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — the beam spreads; what arrives: 0.000…0001 W (NASA's figure) and weaker today
  P.shot(ev.c3_s2, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 200, seed: 73 });
    const k = P.oc((t - ev.c3_s2 - 0.1) / 2.4);
    ctx.save(); const g = ctx.createLinearGradient(1700, 0, 200, 0); g.addColorStop(0, 'rgba(127,227,214,0.55)'); g.addColorStop(1, 'rgba(127,227,214,0.03)'); ctx.fillStyle = g;
    const xe = lerp(1700, 200, k), sp = lerp(10, 520, k); ctx.beginPath(); ctx.moveTo(1700, 300); ctx.lineTo(xe, 300 - sp); ctx.lineTo(xe, 300 + sp); ctx.closePath(); ctx.fill(); ctx.restore();
    P.voyager(ctx, 1760, 300, 0.25, t, { glint: false }); P.earth(ctx, 180, 300, 14, t);
    if (k > 0.9) P.circle(ctx, 180, 300, 30, 30, P.fin(t, ev.c3_spread + 1.6, 0.4), { color: C.gold, lw: 4 });
    P.note(ctx, 'Earth catches a tiny sliver', 180, 160, t, ev.c3_spread + 1.6, { size: 38, align: 'left', rot: 0 });
    // the number: types itself out
    const s = '0.0000000000000000000001 W'; const n = Math.round(s.length * clamp((t - ev.c3_nasa) / Math.max(0.6, ev.c3_watt - ev.c3_nasa)));
    if (n > 0) { P.rect(ctx, 220, 760, 1480, 150, 24, C.ink, { shadow: 0.3, stroke: P.rgba(C.sig, 0.6), lw: 4 }); G.text(ctx, s.slice(0, n), 960, 860, { size: 74, fam: 'Bungee', color: C.sig, align: 'center', boil: 0 }); }
    P.note(ctx, 'a tenth of a billionth of a trillionth of a watt (NASA)', 960, 980, t, ev.c3_watt, { size: 38, color: C.cream });
    const wk = P.pop(t, ev.c3_weaker, 0.4); if (wk > 0) P.at(ctx, 1700, 700, wk, 0, () => { P.tag(ctx, '…and weaker today ↓', 0, 0, t, ev.c3_weaker, 1e9, { size: 38, fill: C.coral, color: C.cream }); });
    P.source(ctx, 'NASA/JPL', t, ev.c3_watt);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — giant ears: three 70 m dishes (California · Spain · Australia), a person for scale
  P.shot(ev.c3_s3, (ctx, t) => {
    P.sky(ctx, t, 'night', { stars: 120, seed: 75 });
    const panels = [[ev.c3_cal, 'GOLDSTONE, CALIFORNIA', 'dusk'], [ev.c3_spa, 'MADRID, SPAIN', 'gold'], [ev.c3_aus, 'CANBERRA, AUSTRALIA', 'dawn']];
    const intro = P.oc((t - ev.c3_s3 - 0.1) / 0.8) * (1 - P.fin(t, ev.c3_cal - 0.3, 0.3));
    P.big(ctx, 'giant ears', 960, 200, t, ev.c3_ears, { size: 80, color: C.cream, t1: ev.c3_cal - 0.2 });
    panels.forEach(([t0, lab, sky], i) => { const k = P.pop(t, t0 - 0.15, 0.45); const x = 330 + i * 630, y = 560, w = 560, h = 560;
      if (i === 0 && intro > 0) P.dsn(ctx, 960, 1060, 1.0 * intro, t, { tilt: -0.5, listen: intro, a: intro }); if (k <= 0) return;
      P.at(ctx, x, y, k, 0, () => {
        ctx.save(); P.pRR(-w / 2, -h / 2, w, h, 26)(ctx); ctx.clip(); ctx.scale(h / G.H, h / G.H); ctx.translate(-G.W / 2, -G.H / 2);
        P.sky(ctx, t, sky, { stars: 30, seed: i + 3 }); P.hills(ctx, t, { y: 960, layers: 2, seed: i * 3 }); P.dsn(ctx, 960, 980, 1.5, t, { tilt: [-0.6, -0.3, 0.4][i], listen: 1 });
        if (i === 0) { P.person(ctx, 1330, 980, 0.42, t, {}); P.note(ctx, "person", 1330, 1050, t, 0, { size: 44, color: C.cream, rot: 0 }); }
        ctx.restore(); P.stroke(ctx, P.pRR(-w / 2, -h / 2, w, h, 26), P.rgba(C.rim, 0.7), 4);
        G.text(ctx, lab, 0, h / 2 + 56, { size: 30, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 }); }); });
    P.stamp(ctx, '70 m DISHES', 960, 150, t, ev.c3_70, { size: 80, color: C.gold, fg: C.ink });
    P.source(ctx, 'NASA Deep Space Network', t, ev.c3_cal);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — a third of the way around the world apart: Earth from above, three dishes, one always faces deep space
  P.shot(ev.c3_s4, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 220, seed: 77 });
    const cx = 760, cy = 560, r = 300, spin = (t - ev.c3_s4) * 0.55;
    P.glow(ctx, cx, cy, r * 1.6, C.earth, 0.5); P.circ(ctx, cx, cy, r, '#2D5FB8'); P.circ(ctx, cx, cy, r * 0.94, '#3D7BE0');
    { const GEO = globalThis.GEO; ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r * 0.94, 0, 7); ctx.clip(); ctx.fillStyle = '#59B36B'; const pr = (lo, la) => { const rr = r * 0.94 * (90 - la) / 150, a = -lo * Math.PI / 180 - spin; return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]; };
      for (const name in GEO.world) for (const ring of GEO.world[name]) { let mx = -90; for (let i = 1; i < ring.length; i += 2) mx = Math.max(mx, ring[i]); if (mx < -50) continue; ctx.beginPath(); for (let i = 0; i < ring.length; i += 2) { const [x, y] = pr(ring[i], Math.max(-60, ring[i + 1])); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.closePath(); ctx.fill(); } ctx.restore(); }
    P.circ(ctx, cx, cy, 22, '#F2F2F2', { a: 0.9 }); // North Pole
    const deep = 0; // direction of deep space: to the right
    P.signal(ctx, 1800, cy, cx + r + 60, cy, t, { k: 1, a: 0.85 });
    G.text(ctx, 'to Voyager →', 1600, cy - 60, { size: 36, fam: 'Inter', weight: 800, color: C.sig, align: 'center', boil: 0 });
    ['GOLDSTONE', 'MADRID', 'CANBERRA'].forEach((n, i) => { const a = -spin - [-116.9, -4.2, 149][i] * Math.PI / 180; const x = cx + Math.cos(a) * (r + 30), y = cy + Math.sin(a) * (r + 30); const facing = Math.cos(a - deep) > 0.5;
      const k = P.pop(t, ev.c3_third + i * 0.15, 0.35); if (k <= 0) return; P.at(ctx, x, y, k * 0.45, a + Math.PI / 2, () => P.dsn(ctx, 0, 0, 1, t, { tilt: 0, col: facing ? C.ink : C.ink3, rim: facing ? C.gold : C.rim }));
      if (facing) P.glow(ctx, x, y, 90, C.sig, 0.8);
      G.text(ctx, n, cx + Math.cos(a) * (r + 150), cy + Math.sin(a) * (r + 150) + 12, { size: 30, fam: 'Inter', weight: 800, color: facing ? C.gold : C.cream, align: 'center', boil: 0, alpha: k }); });
    if (t > ev.c3_third) { ctx.save(); ctx.globalAlpha *= P.fin(t, ev.c3_third, 0.4) * 0.6; ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.setLineDash([8, 10]); for (let i = 0; i < 3; i++) { const a = -spin - [-116.9, -4.2, 149][i] * Math.PI / 180; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); ctx.stroke(); } ctx.restore(); }
    P.tag(ctx, '≈ 120° APART', 1500, 220, t, ev.c3_third, 1e9, { size: 40, fill: C.gold, color: C.ink });
    P.note(ctx, 'one of them always faces deep space', 1460, 900, t, ev.c3_face, { size: 42, color: C.cream });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S5 — 160 bits per second: a phone photo trickles in, ≈ 2 days
  P.shot(ev.c3_s5, (ctx, t) => {
    P.sky(ctx, t, 'night', { stars: 140, seed: 79 });
    P.inkCount(ctx, { x: 520, y: 300, to: 160, t, t0: ev.c3_slow, t1: ev.c3_160, size: 170, sub: 'BITS PER SECOND', subSize: 48 });
    // bits stream into a phone
    const pa = P.pop(t, ev.c3_photo - 0.1, 0.4); if (pa > 0) P.at(ctx, 1380, 560, pa, 0, () => { P.silR(ctx, -170, -320, 340, 640, 40, {}); P.rect(ctx, -146, -290, 292, 560, 22, '#221B3C');
      const fill = clamp((t - ev.c3_photo) / 16) * 0.12; const hh = 560 * fill; ctx.save(); P.pRR(-146, -290, 292, 560, 22)(ctx); ctx.clip(); P.rect(ctx, -146, -290, 292, hh, 0, '#8EC5FF'); ctx.restore();
      G.text(ctx, Math.max(0.1, (fill * 100)).toFixed(1) + ' %', 0, 360, { size: 46, fam: 'Bungee', color: C.cream, align: 'center', boil: 0 }); });
    for (let i = 0; i < 26; i++) { const ph = ((t * 0.5 + i / 26) % 1); const x = lerp(160, 1220, ph), y = 720 + Math.sin(i * 1.7) * 60; G.text(ctx, U.hash(i, 9) > 0.5 ? '1' : '0', x, y, { size: 40, fam: 'Bungee', color: C.sig, align: 'center', boil: 0, alpha: P.fin(t, ev.c3_slow, 0.5) * Math.sin(ph * Math.PI) }); }
    P.stamp(ctx, '≈ 2 DAYS', 520, 920, t, ev.c3_2d, { size: 90, color: C.coral });
    P.note(ctx, 'for one photo', 520, 1030, t, ev.c3_2d + 0.3, { size: 40, color: C.cream });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — talking back: the Canberra 70 m dish (DSS-43) sends the commands
  P.shot(ev.c3_s6, (ctx, t) => {
    P.sky(ctx, t, 'dawn', { stars: 40, seed: 81 }); P.hills(ctx, t, { y: 960, layers: 3, tint: '#4A3A78' });
    P.dsn(ctx, 760, 1000, 1.45, t, { tilt: 0.45 });
    const fire = clamp((t - ev.c3_cmd) / 1.2); if (fire > 0) { P.signal(ctx, 900, 480, 1840, 60, t, { k: fire, color: C.coral, lw: 7 }); }
    P.tag(ctx, 'CANBERRA · DSS-43 · 70 m', 760, 150, t, ev.c3_canb, 1e9, { size: 42, fill: C.cream, color: C.ink, dot: C.coral });
    P.note(ctx, 'the only dish strong enough to command the Voyagers', 1160, 860, t, ev.c3_canb + 0.5, { size: 38, color: C.cream });
    P.big(ctx, 'talking back', 1400, 330, t, ev.c3_talk, { size: 72, color: C.cream });
    P.source(ctx, 'NASA/JPL, May 2025', t, ev.c3_canb);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S7 — "a radio needs power": a battery icon that dims · what keeps it alive? (heartbeat)
  P.shot(ev.c3_s7, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 220, seed: 83 });
    P.voyager(ctx, 1240, 520, 0.9, t, { rot: -0.08, beam: 0.5 });
    const bk = P.pop(t, ev.c3_power, 0.4); if (bk > 0) P.at(ctx, 420, 440, bk, 0, () => { P.rect(ctx, -150, -80, 300, 160, 20, C.ink, { stroke: C.cream, lw: 6 }); P.rect(ctx, 150, -30, 22, 60, 6, C.cream); const lv = 1 - 0.55 * P.oc((t - ev.c3_49) / 1.2); P.rect(ctx, -134, -64, 268 * lv, 128, 12, lv > 0.5 ? C.sig : C.coral); });
    P.tag(ctx, '49 YEARS ON ONE SUPPLY', 420, 620, t, ev.c3_49, 1e9, { size: 36, fill: C.cream, color: C.ink });
    const hb = t > ev.c3_alive ? 1 + 0.12 * Math.max(0, Math.sin((t - ev.c3_alive) * 7)) * Math.exp(-(t - ev.c3_alive) * 0.8) : 1; const hk = P.pop(t, ev.c3_alive - 0.1, 0.4);
    if (hk > 0) P.at(ctx, 420, 850, hk * hb, 0, () => { P.fill(ctx, (c) => { c.beginPath(); c.moveTo(0, 60); c.bezierCurveTo(-120, -20, -60, -110, 0, -50); c.bezierCurveTo(60, -110, 120, -20, 0, 60); c.closePath(); }, C.coral); G.text(ctx, '?', 0, 18, { size: 70, fam: 'Bungee', color: C.cream, align: 'center', boil: 0 }); });
    Ch.echo(ctx, { x: 1760, y: 1050, s: 0.6, t, dir: -1, gesture: 'think', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'fade', dur: 0.4 } });
})();
