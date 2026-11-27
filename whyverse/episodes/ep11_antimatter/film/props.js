// Ep11 props in riso inks. Pure functions of args + t. k = 0..1 build-in.
(function () {
  const G = globalThis.G, U = globalThis.U, P = globalThis.P; const C = P.C; const { clamp, lerp, ease } = U;
  const at = (ctx, x, y, s, fn, rot = 0) => { ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot); ctx.scale(s, s); fn(); ctx.restore(); };

  // banana (yellow ink + blue outline), slight sway; spark = 0..1 shows a positron leaving from point (dx,dy)
  P.banana = (ctx, x, y, s, t, { k = 1, rot = -0.25, a = 1 } = {}) => {
    if (k <= 0.01) return; at(ctx, x, y, s * ease.outBack(clamp(k), 1.6), () => {
      ctx.globalAlpha *= a; ctx.rotate(Math.sin(t * 0.9) * 0.03);
      const body = []; for (let i = 0; i <= 16; i++) { const a = Math.PI * (0.12 + 0.76 * i / 16); body.push([-Math.cos(a) * 250, Math.sin(a) * 120 - 60]); } for (let i = 16; i >= 0; i--) { const a = Math.PI * (0.12 + 0.76 * i / 16); const th = Math.sin(Math.PI * i / 16); body.push([-Math.cos(a) * 240, Math.sin(a) * 120 - 60 - 22 - 58 * th]); }
      P.iPoly(ctx, body, C.yel, { curve: true, shade: 0.6, shadeColor: '#E39A1B', sp: 12 });
      P.art(ctx, [{ pts: body, closed: true }], 1, { color: C.ink, lw: 6 });
      P.art(ctx, [P.circPts(0, -60, 245, 30, Math.PI * 0.2, Math.PI * 0.8, 95).map((p) => [p[0], p[1] - 8])], 1, { color: C.ink2, lw: 3 });
      P.iRect(ctx, 214, -58, 30, 34, 6, '#6B4F2A', { }); P.iEll(ctx, -226, -50, 12, 14, '#4A3A22');
    }, rot);
  };
  // cloud chamber: a dark glass box with dotted condensation tracks; 'wrong' track curls the other way (pink)
  P.chamber = (ctx, x, y, w, h, t, { k = 1, tr = 1, wrong = 0, a = 1 } = {}) => {
    if (k <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
    P.iRect(ctx, x, y, w, h * clamp(k * 1.5), 18, C.navy, { shade: 0.5, shadeColor: '#33498F', sp: 14 });
    P.art(ctx, [P.rrPts(x, y, w, h, 18)], k, { color: C.ink, lw: 6 });
    ctx.save(); ctx.beginPath(); ctx.rect(x + 8, y + 8, w - 16, h - 16); ctx.clip();
    const drawTrack = (pts, col, kk) => { const n = Math.floor(pts.length * clamp(kk)); for (let i = 0; i < n; i++) { const p = pts[i]; ctx.fillStyle = col; ctx.globalAlpha = 0.85; ctx.beginPath(); ctx.arc(p[0], p[1], 3.2 + U.hash(i, 3) * 2, 0, 7); ctx.fill(); } ctx.globalAlpha = a; };
    for (let j = 0; j < 4; j++) { const pts = []; const x0 = x + w * (0.15 + 0.2 * j); for (let i = 0; i < 70; i++) pts.push([x0 + i * 4 + Math.sin(i * 0.3 + j) * 3, y + 20 + i * (h - 40) / 70]); drawTrack(pts, '#DDE6FF', clamp(tr * 1.2 - j * 0.1)); }
    if (wrong > 0) { const pts = []; const cx = x + w * 0.55, cy = y + h * 0.15; for (let i = 0; i < 110; i++) { const u = i / 110; const r = 260 * (1 - u * 0.55); const ang = -1.4 + u * 2.6; pts.push([cx + Math.cos(ang) * r * 0.8 - 120, cy + Math.sin(ang) * r + 260 * u]); }
      drawTrack(pts, C.acc, wrong); }
    // the lead plate across the middle (Anderson's chamber had one)
    P.iRect(ctx, x + 10, y + h * 0.52, w - 20, 16, 4, '#8E97B8', { a: clamp(k * 2 - 1) });
    ctx.restore(); ctx.restore();
  };
  // a medal (Nobel) — ink disc, pink ribbon, year
  P.medal = (ctx, x, y, s, label, t, { k = 1 } = {}) => { if (k <= 0.01) return; at(ctx, x, y, s * ease.outBack(clamp(k), 2), () => {
    P.iPoly(ctx, [[-40, -150], [-10, -60], [10, -60], [-10, -150]], C.acc); P.iPoly(ctx, [[40, -150], [10, -60], [-10, -60], [10, -150]], C.acc);
    P.iCirc(ctx, 0, 0, 74, C.yel, { shade: 0.7, shadeColor: '#E39A1B' }); P.art(ctx, [P.circPts(0, 0, 74, 40)], 1, { color: C.ink, lw: 5 }); P.art(ctx, [P.circPts(0, 0, 56, 40)], 1, { color: C.ink2, lw: 3 });
    G.text(ctx, label, 0, 16, { size: 40, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0 }); }); };
  // power station: two cooling towers with steam puffs + a building
  P.plant = (ctx, x, y, s, t, { k = 1, on = 1 } = {}) => { if (k <= 0.01) return; at(ctx, x, y, s, () => {
    const tower = (dx) => { const pts = [[dx - 90, 0], [dx - 60, -120], [dx - 70, -240], [dx + 70, -240], [dx + 60, -120], [dx + 90, 0]]; P.iPoly(ctx, pts, C.pap2, { shade: 0.5, shadeColor: C.ink3 }); P.art(ctx, [{ pts, closed: true }], k, { color: C.ink, lw: 6 }); };
    tower(-120); tower(110); P.iRect(ctx, 220, -120, 200, 120, 4, C.ink, { a: clamp(k * 2 - 1), shade: 0.4 });
    for (let i = 0; i < 8 * on; i++) { const u = ((t * 0.35 + i / 8) % 1); P.iCirc(ctx, -120 + (i % 2 ? 230 : 0) + Math.sin(u * 5 + i) * 20, -270 - u * 230, 30 + u * 50, '#D9DEEC', { a: (1 - u) * 0.8 * clamp(k * 2 - 1) }); }
    P.dLine(ctx, -300, 0, 520, 0, k, { lw: 6 }); }); };
  // light bulb; on = 0..1 glow (yellow ink)
  P.bulb = (ctx, x, y, s, t, { k = 1, on = 0 } = {}) => { if (k <= 0.01) return; at(ctx, x, y, s * ease.outBack(clamp(k), 2), () => {
    if (on > 0.01) { for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; P.line(ctx, Math.cos(a) * 130, -40 + Math.sin(a) * 130, Math.cos(a) * (150 + 40 * on), -40 + Math.sin(a) * (150 + 40 * on), C.yel, 10, on); } P.iCirc(ctx, 0, -40, 110 * (0.8 + 0.2 * on), C.yel, { a: on * 0.9 }); }
    const glass = [...P.circPts(0, -40, 92, 30, Math.PI * 0.75, Math.PI * 2.25)]; P.art(ctx, [{ pts: glass.concat([[34, 50], [-34, 50]]), closed: true }], 1, { color: C.ink, lw: 6 });
    P.iRect(ctx, -36, 50, 72, 56, 8, C.ink, { shade: 0.6 }); P.art(ctx, [[[-20, 10], [-10, -40], [0, 0], [10, -40], [20, 10]]], 1, { color: on > 0.3 ? C.acc : C.ink2, lw: 5 }); }); };
  // Penning trap: stacked ring electrodes inside a magnet coil; a particle floats in the centre (kind), wobbling on its orbit
  P.trap = (ctx, x, y, s, t, { k = 1, kind = 'p', parts = 1, glow = 1 } = {}) => { if (k <= 0.01) return; at(ctx, x, y, s, () => {
    // magnet coil (back)
    for (let i = 0; i < 9; i++) P.iRect(ctx, -250, -230 + i * 52, 500, 30, 14, i % 2 ? C.ink3 : C.blueW, { a: clamp(k * 2 - i * 0.08) });
    P.art(ctx, [P.rrPts(-260, -250, 520, 500, 40)], k, { color: C.ink, lw: 6 });
    // vacuum tube
    P.iRect(ctx, -140, -210, 280, 420, 30, C.pap, { a: clamp(k * 2 - 0.6) }); P.art(ctx, [P.rrPts(-140, -210, 280, 420, 30)], clamp(k * 1.4 - 0.3), { color: C.ink2, lw: 4 });
    // electrodes
    for (let i = 0; i < 5; i++) { const yy = -170 + i * 76; P.iRect(ctx, -110, yy, 220, 46, 8, i === 2 ? C.acc : C.ink, { a: clamp(k * 2 - 0.8 - i * 0.05) * (i === 2 ? 0.35 : 0.85), shade: 0.4 }); }
    // the particle(s) dancing on their cyclotron + magnetron orbit
    for (let j = 0; j < parts; j++) { const ph = j * 2.1; const px = Math.cos(t * 3.1 + ph) * 34 + Math.cos(t * 19 + ph) * 6, py = Math.sin(t * 5.3 + ph) * 18 + (parts > 1 ? (j - (parts - 1) / 2) * 16 : 0);
      if (glow > 0) P.glow(ctx, px, py, 60, kind === 'e' ? C.ink : C.acc, glow * clamp(k * 2 - 1));
      P.part(ctx, px, py, 18, kind, { k: clamp(k * 2 - 1), sign: true }); }
  }); };
  // a flat truck (side view) carrying a box; wheels turn with distance d (px)
  P.truck = (ctx, x, y, s, t, { k = 1, d = 0, cargo = 'BASE-STEP' } = {}) => { if (k <= 0.01) return; at(ctx, x, y, s, () => {
    P.iRect(ctx, -300, -150, 400, 110, 10, C.pap2, { a: k }); P.art(ctx, [P.rrPts(-300, -150, 400, 110, 10)], k, { color: C.ink, lw: 6 });
    P.iRect(ctx, -270, -250, 330, 110, 16, C.acc, { a: clamp(k * 2 - 0.5), shade: 0.5 }); G.text(ctx, cargo, -105, -180, { size: 38, fam: 'Inter', weight: 900, color: C.pap, align: 'center', boil: 0, alpha: clamp(k * 2 - 1) });
    P.iPoly(ctx, [[110, -40], [110, -170], [210, -170], [260, -100], [260, -40]], C.ink, { shade: 0.5 }); P.iRect(ctx, 130, -155, 70, 50, 6, C.pap, { a: 0.9 });
    for (const wx of [-220, -60, 190]) { P.iCirc(ctx, wx, -20, 40, C.navy); const r = d / 40; P.line(ctx, wx - Math.cos(r) * 26, -20 - Math.sin(r) * 26, wx + Math.cos(r) * 26, -20 + Math.sin(r) * 26, C.pap, 6); P.iCirc(ctx, wx, -20, 10, C.pap); } }); };
  // thermometer with a label at the bottom of its scale
  P.thermo = (ctx, x, y, s, t, { k = 1, level = 0.5 } = {}) => { if (k <= 0.01) return; at(ctx, x, y, s, () => {
    P.iRect(ctx, -30, -360, 60, 380, 30, C.pap, {}); P.art(ctx, [P.rrPts(-30, -360, 60, 380, 30)], k, { color: C.ink, lw: 6 }); P.iCirc(ctx, 0, 40, 56, C.ink, { a: k, shade: 0.5 });
    const h = 340 * clamp(level) * clamp(k * 1.5 - 0.3); P.iRect(ctx, -14, 20 - h, 28, h + 10, 14, C.ink, { a: k });
    for (let i = 0; i < 7; i++) P.line(ctx, 30, -320 + i * 50, 56, -320 + i * 50, C.ink2, 4, k); }); };
  // spiral galaxy of dots in one ink
  P.galaxy = (ctx, x, y, r, t, { color = C.ink, a = 1, k = 1, seed = 1, rot = 0 } = {}) => { if (k <= 0.01 || a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot + t * 0.04); ctx.scale(1, 0.55); ctx.globalAlpha *= a; if (!P.dark) ctx.globalCompositeOperation = 'multiply';
    const n = Math.round(160 * k); for (let i = 0; i < n; i++) { const arm = i % 2, u = (i / 160); const ang = arm * Math.PI + u * 7 + U.hash(i, seed) * 0.5; const rr = r * Math.pow(u, 0.8) * (0.9 + 0.2 * U.hash(i, seed + 1));
      ctx.fillStyle = color; ctx.beginPath(); ctx.arc(Math.cos(ang) * rr, Math.sin(ang) * rr, 2.5 + 4 * (1 - u) * U.hash(i, seed + 2), 0, 7); ctx.fill(); }
    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(0, 0, r * 0.12, 0, 7); ctx.fill(); ctx.restore(); };
  // a star (5-point) in an ink
  P.star = (ctx, x, y, r, color = C.yel, a = 1) => { const pts = []; for (let i = 0; i < 10; i++) { const ang = -Math.PI / 2 + i * Math.PI / 5; const rr = i % 2 ? r * 0.45 : r; pts.push([x + Math.cos(ang) * rr, y + Math.sin(ang) * rr]); } P.iPoly(ctx, pts, color, { a }); };
  // a balance scale: tilt -1..1 (positive = right pan lower)
  P.scale = (ctx, x, y, s, t, { k = 1, tilt = 0, left = null, right = null } = {}) => { if (k <= 0.01) return; at(ctx, x, y, s, () => {
    P.iRect(ctx, -110, 260, 220, 30, 10, C.ink, { a: k }); P.dLine(ctx, 0, 260, 0, -40, k, { lw: 12 }); P.iPoly(ctx, [[-30, -40], [30, -40], [0, -80]], C.acc, { a: k });
    const ang = tilt * 0.22; const ex = Math.cos(ang) * 300, ey = Math.sin(ang) * 300;
    P.line(ctx, -ex, -40 - ey, ex, -40 + ey, C.ink, 12, k);
    for (const sg of [-1, 1]) { const px = sg * ex, py = -40 + sg * ey; P.line(ctx, px, py, px - 70, py + 150, C.ink2, 4, k); P.line(ctx, px, py, px + 70, py + 150, C.ink2, 4, k);
      P.iEll(ctx, px, py + 156, 100, 20, sg < 0 ? C.ink : C.acc, { a: k, shade: 0.4 }); const f = sg < 0 ? left : right; if (f) f(px, py + 140); } }); };
  // a ghostly neutrino: dashed circle with a tiny dot, leaving a faint trail
  P.ghost = (ctx, x, y, r, t, { a = 1 } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; P.art(ctx, [{ pts: P.circPts(x, y, r, 40), dash: [10, 10] }], 1, { color: C.ink2, lw: 4 }); P.iCirc(ctx, x, y, r * 0.22, C.ink); P.art(ctx, [{ pts: [[x - r * 4, y], [x - r * 1.2, y]], dash: [4, 14] }], 1, { color: C.ink3, lw: 4 });
    G.text(ctx, 'ν', x, y - r - 16, { size: 44, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0 }); ctx.restore(); };
  // a spinning particle with its magnetic arrow (bar magnet look)
  P.spinner = (ctx, x, y, r, t, kind = 'e', { k = 1, ang = -1.2 } = {}) => { if (k <= 0.01) return; const col = kind === 'e' ? C.ink : C.acc;
    ctx.save(); ctx.translate(x, y); P.art(ctx, [P.circPts(0, 0, r * 1.6, 40, 0.3 + t * 2, 0.3 + t * 2 + 4.6, r * 0.55)], k, { color: col, lw: 4 }); ctx.restore();
    P.part(ctx, x, y, r, kind, { k }); P.arrow(ctx, x - Math.cos(ang) * r * 1.6, y - Math.sin(ang) * r * 1.6, x + Math.cos(ang) * r * 2.4, y + Math.sin(ang) * r * 2.4, { color: col, lw: 9, head: 30, k: clamp(k * 1.5 - 0.5) }); };
  // ring accelerator / antimatter factory (top view) with bunches circulating
  P.accel = (ctx, x, y, r, t, { k = 1, color = C.ink, speed = 1, n = 6, kind = 'p' } = {}) => { if (k <= 0.01) return; P.art(ctx, [P.circPts(x, y, r, 80)], k, { color, lw: 16 }); P.art(ctx, [P.circPts(x, y, r - 26, 80)], k, { color: C.ink3, lw: 4 });
    if (k > 0.8) for (let i = 0; i < n; i++) { const a = t * speed + i * 6.283 / n; P.part(ctx, x + Math.cos(a) * r, y + Math.sin(a) * r, 11, kind, { sign: false }); } };
  // a stopwatch-ish clock face counting hours
  P.clockFace = (ctx, x, y, r, t, spin, k) => { if (k <= 0.01) return; P.iCirc(ctx, x, y, r, C.pap); P.dCirc(ctx, x, y, r, k, { lw: 6 }); if (k < 0.8) return;
    for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; P.line(ctx, x + Math.cos(a) * r * 0.8, y + Math.sin(a) * r * 0.8, x + Math.cos(a) * r * 0.92, y + Math.sin(a) * r * 0.92, C.ink, 5); }
    const hA = -1.57 + spin * 0.52, mA = -1.57 + spin * 6.283; P.line(ctx, x, y, x + Math.cos(hA) * r * 0.5, y + Math.sin(hA) * r * 0.5, C.ink, 9); P.line(ctx, x, y, x + Math.cos(mA) * r * 0.75, y + Math.sin(mA) * r * 0.75, C.acc, 6); P.iCirc(ctx, x, y, 9, C.ink); };
  // a vertical bar chart pair (matter vs antimatter) — used for "equal amounts"
  P.twinBars = (ctx, x, y, h, t, { k = 1, hl = 1, hr = 1, w = 120, labels = ['MATTER', 'ANTIMATTER'] } = {}) => { if (k <= 0.01) return;
    const H1 = h * hl * P.eio(k), H2 = h * hr * P.eio(k); P.iRect(ctx, x - w - 20, y - H1, w, H1, 8, C.ink, { shade: 0.4 }); P.iRect(ctx, x + 20, y - H2, w, H2, 8, C.acc, { shade: 0.4 });
    P.dLine(ctx, x - w - 60, y, x + w + 60, y, k, { lw: 5 });
    G.text(ctx, labels[0], x - w / 2 - 20, y + 44, { size: 28, fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0, alpha: k }); G.text(ctx, labels[1], x + w / 2 + 20, y + 44, { size: 28, fam: 'Inter', weight: 800, color: C.acc, align: 'center', boil: 0, alpha: k }); };
  // the Whyverse ringed planet in riso inks
  P.brandPlanet = (ctx, x, y, r, t, a = 1) => { if (r < 1 || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const ring = (a0, a1) => { ctx.beginPath(); ctx.ellipse(x, y, r * 1.8, r * 0.45, -0.3, a0, a1); ctx.strokeStyle = C.yel; ctx.lineWidth = r * 0.2; ctx.stroke(); };
    ring(Math.PI, Math.PI * 2); P.iCirc(ctx, x, y, r, C.ink, { shade: 0.6 }); ring(0, Math.PI); ctx.restore(); };
})();
