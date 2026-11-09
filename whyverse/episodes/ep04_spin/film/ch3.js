// Chapter 3 — The oceans move out: Earth is 43 km wider than tall · an 8 km ocean bulge · water flows to the poles ·
// Fraczek's model: two polar oceans + one equatorial continent · Andes > 12 km · inland seas, oceans 1.4 km apart.
(function () {
  const { U, G, Ch, P, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H; const D = Math.PI / 180;
  P.cardShot('c3', 3, 'The oceans move out', (ctx, t) => { P.board(ctx, t); P.icon(ctx, 'wave', 1660, 880, 170, { t }); });

  // S1 — a squashed planet (drawn ×100 exaggerated): 12,756 km wide, 12,714 km tall
  P.shot(ev.c3_s1, (ctx, t) => {
    P.board(ctx, t);
    const sq = P.eio((t - ev.c3_squash + 0.2) / 0.8); const sy = 1 - 0.2 * sq, sx = 1 + 0.04 * sq;
    P.globe(ctx, 700, 560, 330, t, { lon0: -t * 14, lat0: 5, sx, sy, equator: 0.7 });
    const kw = P.fin(t, ev.c3_43 - 0.5, 0.4);
    P.arrow(ctx, 700, 560, 700 - 330 * sx - 4, 560, { color: C.gold, a: kw, lw: 6, head: 20 }); P.arrow(ctx, 700, 560, 700 + 330 * sx + 4, 560, { color: C.gold, a: kw, lw: 6, head: 20 });
    P.arrow(ctx, 700, 560, 700, 560 - 330 * sy - 4, { color: C.sky, a: kw, lw: 6, head: 20 }); P.arrow(ctx, 700, 560, 700, 560 + 330 * sy + 4, { color: C.sky, a: kw, lw: 6, head: 20 });
    P.label(ctx, 'drawn ×100 exaggerated', 700, 1000, { size: 34, align: 'center', alpha: P.fin(t, ev.c3_squash + 0.3, 0.4) });
    P.tag(ctx, 'equator to equator: 12,756 km', 1440, 330, t, ev.c3_43 - 0.4, 1e9, { size: 44, border: C.gold });
    P.tag(ctx, 'pole to pole: 12,714 km', 1440, 460, t, ev.c3_pole, 1e9, { size: 44, border: C.sky });
    P.stamp(ctx, '43 km WIDER', 1440, 680, t, ev.c3_43 + 0.6, { size: 90, color: C.gold });
    Ch.axel(ctx, { x: 1440, y: 1040, s: 0.6, t, gesture: 'shrug', mouth: Ch.axelMouth(t), eyes: t > ev.c3_squash ? 'wide' : 'normal' });
  }, { in: { type: 'fade', dur: 0.5 } });

  // ocean shell around a core: thickness profile w(θ) blends from the equatorial bulge to two polar caps (k 0..1)
  const ocean = (ctx, cx, cy, R, k, t, { bulge = 1, a = 1 } = {}) => {
    const w = (th) => { const lat = Math.abs(Math.sin(th)); const eq = 18 + 70 * bulge * (1 - lat * lat); const po = 10 + 120 * Math.pow(lat, 6); return lerp(eq, po, k) + 3 * Math.sin(th * 9 + t * 2); };
    ctx.save(); ctx.beginPath(); for (let i = 0; i <= 120; i++) { const th = i / 120 * 6.283; const r = R + w(th); const x = cx + Math.cos(th) * r, y = cy + Math.sin(th) * r; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.closePath();
    ctx.moveTo(cx + R, cy); ctx.arc(cx, cy, R, 0, 6.283, true); ctx.globalAlpha = 0.75 * a; ctx.fillStyle = C.ocean; ctx.fill('evenodd'); ctx.restore();
    P.stroke(ctx, (c) => { c.beginPath(); for (let i = 0; i <= 120; i++) { const th = i / 120 * 6.283; const r = R + w(th); const x = cx + Math.cos(th) * r, y = cy + Math.sin(th) * r; i ? c.lineTo(x, y) : c.moveTo(x, y); } c.closePath(); }, C.sky, 6, a, { seed: 14 });
    P.stroke(ctx, (c) => { c.beginPath(); c.arc(cx, cy, R, 0, 7); }, '#C9A27A', 7, a, { fill: '#5A4636', fillA: 0.9, scribble: true, seed: 15, gap: 14 });
  };

  // S2 — the ocean bulge: water piled up around the middle, ~8 km high (exaggerated)
  P.shot(ev.c3_s2, (ctx, t) => {
    P.board(ctx, t);
    const kb = P.eio((t - ev.c3_fling) / 1.2);
    ocean(ctx, 760, 560, 300, 0, t, { bulge: 0.2 + 0.8 * kb });
    for (const sgn of [-1, 1]) for (let i = -1; i <= 1; i++) P.arrow(ctx, 760 + sgn * 420, 560 + i * 60, 760 + sgn * 520, 560 + i * 60, { color: C.gold, a: P.fin(t, ev.c3_fling, 0.3) * (1 - P.fin(t, ev.c3_bulge + 1, 0.5)), lw: 6, head: 18, seed: 30 + i });
    P.label(ctx, 'N', 760, 210, { size: 48, align: 'center', color: C.chalk }); P.label(ctx, 'S', 760, 950, { size: 48, align: 'center', color: C.chalk });
    P.label(ctx, 'equator', 1110, 570, { size: 40, color: C.gold, alpha: P.fin(t, ev.c3_bulge, 0.3) });
    P.counter(ctx, { x: 1520, y: 330, from: 0, to: 8, t, t0: ev.c3_bulge, t1: ev.c3_8km, size: 140, suffix: ' km', sub: 'ocean bulge at the equator', color: C.sky });
    P.label(ctx, 'thicknesses exaggerated', 760, 1010, { size: 32, align: 'center' });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S3 — stop the spin: the bulge runs downhill to the poles
  P.shot(ev.c3_s3, (ctx, t) => {
    P.board(ctx, t);
    const k = P.eio((t - ev.c3_flow + 0.2) / 2.6);
    ocean(ctx, 760, 560, 300, k, t, { bulge: 1 });
    for (const sgn of [-1, 1]) for (const side of [-1, 1]) { const a0 = sgn < 0 ? (side < 0 ? Math.PI * 1.02 : -0.02) : (side < 0 ? Math.PI * 0.98 : 0.02); const a1 = sgn < 0 ? (side < 0 ? Math.PI * 1.35 : -0.35 * Math.PI) : (side < 0 ? Math.PI * 0.65 : 0.35 * Math.PI);
      P.arcArrow(ctx, 760, 560, 420, a0, a1, { color: C.sky, a: P.win(t, ev.c3_flow - 0.2, ev.c3_flow + 2.8, 0.3), lw: 7, seed: 40 + sgn + side * 2 }); }
    P.stamp(ctx, 'SPIN: OFF', 1460, 260, t, ev.c3_stop, { size: 80, color: C.red });
    P.write(ctx, 'water flows downhill —', 1460, 520, t, ev.c3_flow, { size: 60 });
    P.write(ctx, 'toward the poles', 1460, 600, t, ev.c3_poles, { size: 60, color: C.sky });
    Ch.axel(ctx, { x: 1460, y: 1000, s: 0.62, t, gesture: 'point', dir: -1, mouth: Ch.axelMouth(t), look: -0.6 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // equirectangular world map with real coastlines; k = how far the "stopped Earth" sketch has taken over
  const MX = 160, MY = 190, MW = 1600, MH = 800;
  const mapXY = (lon, lat) => [MX + (lon + 180) / 360 * MW, MY + (90 - lat) / 180 * MH];
  const worldMap = (ctx, t, k) => {
    ctx.save(); P.rr(ctx, MX, MY, MW, MH, 10); ctx.clip();
    ctx.globalAlpha = 0.75; ctx.fillStyle = C.ocean; ctx.fillRect(MX, MY, MW, MH); ctx.globalAlpha = 1;
    ctx.fillStyle = C.land; ctx.globalAlpha = 0.85 * (1 - 0.65 * k);
    for (const r of P.rings()) { let prev = null, off = 0; const pts = r.map(([lo, la]) => { let L0 = lo / D; if (prev != null) { if (L0 + off - prev > 180) off -= 360; else if (L0 + off - prev < -180) off += 360; } L0 += off; prev = L0; return [L0, la / D]; });
      for (const sh of [0, 360, -360]) { ctx.beginPath(); pts.forEach(([lo, la], i) => { const [x, y] = mapXY(lo + sh, la); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath(); ctx.fill(); } }
    ctx.globalAlpha = 1;
    if (k > 0) { // sketch of Fraczek's result: land band around the equator, oceans capping both poles (simplified)
      const band = (lat0, lat1, col, a) => { const [, y0] = mapXY(0, lat1), [, y1] = mapXY(0, lat0); ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.beginPath(); for (let x = MX; x <= MX + MW; x += 20) ctx.lineTo(x, y0 + 14 * Math.sin(x / 90)); for (let x = MX + MW; x >= MX; x -= 20) ctx.lineTo(x, y1 + 14 * Math.sin(x / 70 + 1)); ctx.closePath(); ctx.fill(); ctx.restore(); };
      band(-38, 38, '#6FA86F', 0.85 * k); band(48, 90, C.ocean, 0.95 * k); band(-90, -50, C.ocean, 0.95 * k);
      // a few inland seas left in deep basins
      for (const [lo, la, rx, ry] of [[-90, 24, 60, 28], [20, 35, 50, 16], [-55, -5, 40, 22], [140, 2, 46, 26]]) { const [x, y] = mapXY(lo, la); ctx.save(); ctx.globalAlpha = 0.85 * k; ctx.fillStyle = C.ocean; ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, 7); ctx.fill(); ctx.restore(); }
    }
    ctx.restore(); P.stroke(ctx, (c) => P.rr(c, MX, MY, MW, MH, 10), C.chalk, 6, 1, { seed: 50 });
    const [, ye] = mapXY(0, 0); P.line(ctx, MX, ye, MX + MW, ye, C.gold, 3, 0.6, 1, { dash: true });
  };

  // S4 — Fraczek's model: two polar oceans and one giant continent around the middle
  P.shot(ev.c3_s4, (ctx, t) => {
    P.board(ctx, t);
    const k = P.eio((t - ev.c3_two + 0.1) / 2.0);
    worldMap(ctx, t, k);
    P.tag(ctx, 'Witold Fraczek (Esri), mapping-software model', 960, 110, t, ev.c3_fraczek, 1e9, { size: 40, border: C.chalk });
    const kl = P.fin(t, ev.c3_two + 1.2, 0.5);
    G.text(ctx, 'NORTHERN OCEAN', 960, 290, { size: 56, fam: FT.title, color: C.ice, align: 'center', alpha: kl, boil: 0 });
    G.text(ctx, 'SOUTHERN OCEAN', 960, 940, { size: 56, fam: FT.title, color: C.ice, align: 'center', alpha: kl, boil: 0 });
    P.stamp(ctx, 'ONE GIANT CONTINENT', 960, 600, t, ev.c3_cont, { size: 76, color: C.gold });
    P.label(ctx, 'simplified sketch', MX + MW - 10, MY + MH + 50, { size: 30, align: 'right', alpha: kl });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S5 — mountains measured from the new sea level; your beach far from the sea
  P.shot(ev.c3_s5, (ctx, t) => {
    P.board(ctx, t);
    const base = 900, sc = 52; // px per km
    const ke = P.fin(t, L('c3_6').t, 0.4), ka = P.eio((t - ev.c3_andes + 0.1) / 1.2);
    const mountain = (x, hKm, col, a, lab, val) => { if (a <= 0) return; const h = hKm * sc; P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(x - h * 0.55, base); c.lineTo(x - h * 0.12, base - h * 0.75); c.lineTo(x, base - h); c.lineTo(x + h * 0.18, base - h * 0.8); c.lineTo(x + h * 0.6, base); c.closePath(); }, col, 7, a, { fill: col, fillA: 0.3, scribble: true, seed: Math.round(x) });
      P.line(ctx, x, base - h, x + 260, base - h, col, 3, a * 0.8, 1, { dash: true }); G.text(ctx, val, x + 280, base - h + 18, { size: 56, fam: FT.num, color: col, align: 'left', alpha: a, boil: 0 }); P.label(ctx, lab, x, base + 60, { size: 36, align: 'center', color: C.chalk, alpha: a }); };
    P.line(ctx, 80, base, 1840, base, C.sky, 6, 1, 1);
    P.label(ctx, 'sea level', 90, base + 50, { size: 32, color: C.sky });
    mountain(420, 8.85, C.chalk, ke, 'Everest today', '8.8 km');
    mountain(1050, lerp(6.9, 12.28, ka), C.gold, P.fin(t, ev.c3_andes - 0.5, 0.4), 'the Andes, stopped Earth', ka > 0.98 ? '12.3 km' : (lerp(6.9, 12.28, ka)).toFixed(1) + ' km');
    const kb = P.pop(t, ev.c3_beach, 0.4); if (kb > 0) { P.at(ctx, 1640, 400, kb, 0, () => { P.icon(ctx, 'house', 0, 0, 60, { seed: 3 }); }); P.arrow(ctx, 1640, 470, 1640, base - 20, { color: C.sky, a: P.fin(t, ev.c3_far, 0.3), k: P.oc((t - ev.c3_far) / 0.6) }); P.label(ctx, 'your beach house', 1640, 320, { size: 36, align: 'center', color: C.chalk, alpha: clamp(kb) }); P.label(ctx, 'the sea: far below', 1660, base - 40, { size: 32, align: 'left', color: C.sky, alpha: P.fin(t, ev.c3_far + 0.4, 0.3) }); }
  }, { in: { type: 'fade', dur: 0.5 } });

  // S6 — inland seas; the two polar oceans don't even sit at the same height (~1.4 km apart)
  P.shot(ev.c3_s6, (ctx, t) => {
    P.board(ctx, t);
    worldMap(ctx, t, 1);
    ctx.save(); ctx.globalAlpha = 0.55; ctx.fillStyle = '#0E1628'; ctx.fillRect(0, 0, W, H); ctx.restore();
    const kb = P.fin(t, ev.c3_basins - 0.1, 0.4); for (const [lo, la] of [[-90, 24], [20, 35], [-55, -5], [140, 2]]) { const [x, y] = mapXY(lo, la); P.ring(ctx, x, y, t, ev.c3_basins + U.hash(lo, 1) * 0.4, { r: 90, color: C.sky }); if (kb > 0) P.circle(ctx, x, y, 64, C.sky, 4, kb * 0.8, { dash: true }); }
    // side profile of the two polar sea surfaces
    const kh = P.pop(t, ev.c3_height, 0.4); if (kh > 0) P.at(ctx, 960, 640, kh, 0, () => {
      P.box(ctx, -560, -230, 1120, 400, C.chalk, { seed: 52, fill: 'rgba(12,18,32,0.92)' });
      P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(-500, -80); c.lineTo(-120, -80); }, C.sky, 9, 1, { seed: 53 }); P.label(ctx, 'northern ocean surface', -310, -110, { size: 34, align: 'center', color: C.ice });
      P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(120, 60); c.lineTo(500, 60); }, C.sky, 9, 1, { seed: 54 }); P.label(ctx, 'southern ocean surface', 310, 115, { size: 34, align: 'center', color: C.ice });
      P.line(ctx, 0, -80, 0, 60, C.gold, 4, 1, 1, { dash: true }); P.arrow(ctx, 40, -20, 40, -80, { color: C.gold, lw: 5, head: 16 }); P.arrow(ctx, 40, 0, 40, 60, { color: C.gold, lw: 5, head: 16 });
      G.text(ctx, '~1.4 km', 70, 0, { size: 58, fam: FT.num, color: C.gold, align: 'left', alpha: P.fin(t, ev.c3_14, 0.3), boil: 0 }); });
  }, { in: { type: 'fade', dur: 0.4 } });
})();
