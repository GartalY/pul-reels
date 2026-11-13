// Ep07 blueprint prop kit — every prop is a list of line-art parts (local coords, origin = bottom centre unless noted),
// drawn with P.art(ctx, parts, k, {x, y, s}) so it traces itself on (k 0→1). Fills are translucent; gold is yellow.
(function () {
  const G = globalThis.G, U = globalThis.U, P = globalThis.P; const C = P.C; const { clamp, lerp, ease } = U;
  const R = P.rectPts, CP = P.circPts; const F = 'rgba(234,244,255,0.08)', FY = 'rgba(255,213,74,0.35)';
  const A = P.A = {};
  A.house = (w = 300) => { const h = w * 0.62, r = w * 0.42; return [
    { pts: [[-w / 2, 0], [w / 2, 0], [w / 2, -h], [-w / 2, -h]], closed: true, fill: F },
    { pts: [[-w / 2 - 24, -h], [0, -h - r], [w / 2 + 24, -h]], fill: F },
    [[w * 0.22, -h - r * 0.48], [w * 0.22, -h - r * 0.85], [w * 0.34, -h - r * 0.85], [w * 0.34, -h - r * 0.2]],
    { pts: [[-w * 0.1, 0], [-w * 0.1, -h * 0.55], [w * 0.1, -h * 0.55], [w * 0.1, 0]] },
    { pts: R(-w * 0.4, -h * 0.82, w * 0.2, w * 0.16), fill: 'rgba(255,213,74,0.18)', closed: true }, { pts: R(w * 0.2, -h * 0.82, w * 0.2, w * 0.16), fill: 'rgba(255,213,74,0.18)', closed: true },
    [[-w * 0.3, -h * 0.82], [-w * 0.3, -h * 0.82 + w * 0.16]], [[w * 0.3, -h * 0.82], [w * 0.3, -h * 0.82 + w * 0.16]],
  ]; };
  A.tower = (w = 160, h = 520, rows = 8) => { const o = [{ pts: [[-w / 2, 0], [w / 2, 0], [w / 2, -h], [-w / 2, -h]], closed: true, fill: F }, [[-w * 0.3, -h], [-w * 0.3, -h - 30], [w * 0.3, -h - 30], [w * 0.3, -h]], [[0, -h - 30], [0, -h - 90]]];
    for (let i = 1; i < rows; i++) o.push([[-w / 2 + 14, -h * i / rows], [w / 2 - 14, -h * i / rows]]); o.push([[0, -h + 20], [0, -20]]); return o; };
  A.factory = (w = 380) => [ { pts: [[-w / 2, 0], [-w / 2, -150], [-w / 2 + w / 3, -210], [-w / 2 + w / 3, -150], [-w / 2 + 2 * w / 3, -210], [-w / 2 + 2 * w / 3, -150], [w / 2, -210], [w / 2, 0]], closed: true, fill: F },
    [[w * 0.3, -210], [w * 0.3, -330], [w * 0.4, -330], [w * 0.4, -190]], { pts: R(-w * 0.35, -100, 70, 100) }, { pts: R(-w * 0.05, -110, 110, 60), closed: true, fill: 'rgba(255,213,74,0.18)' } ];
  // gold bar (iso), origin bottom centre
  A.bar = (w = 160) => { const h = w * 0.3, d = w * 0.28, ins = w * 0.14; return [
    { pts: [[-w / 2, 0], [w / 2, 0], [w / 2 - ins, -h], [-w / 2 + ins, -h]], closed: true, fill: FY },
    { pts: [[-w / 2 + ins, -h], [w / 2 - ins, -h], [w / 2 - ins + d, -h - d * 0.55], [-w / 2 + ins + d, -h - d * 0.55]], closed: true, fill: 'rgba(255,213,74,0.55)' },
    { pts: [[w / 2, 0], [w / 2 + d, -d * 0.55], [w / 2 - ins + d, -h - d * 0.55], [w / 2 - ins, -h]], closed: true, fill: 'rgba(242,178,46,0.4)' } ]; };
  // iso cube, origin = bottom-front corner; s = edge in px
  A.cube = (e = 300) => { const cx = Math.cos(Math.PI / 6) * e, cy = Math.sin(Math.PI / 6) * e; return [
    { pts: [[0, 0], [cx, -cy], [cx, -cy - e], [0, -e]], closed: true, fill: 'rgba(242,178,46,0.45)' },
    { pts: [[0, 0], [-cx, -cy], [-cx, -cy - e], [0, -e]], closed: true, fill: 'rgba(255,213,74,0.3)' },
    { pts: [[0, -e], [cx, -cy - e], [0, -2 * cy - e], [-cx, -cy - e]], closed: true, fill: 'rgba(255,230,140,0.55)' } ]; };
  A.coin = (r = 60) => [{ pts: CP(0, 0, r, 40), closed: true, fill: FY }, { pts: CP(0, 0, r * 0.74, 40) }, [[r * 0.18, -r * 0.4], [-r * 0.2, -r * 0.36], [-r * 0.24, -r * 0.08], [r * 0.2, 0.06 * r], [r * 0.22, r * 0.34], [-r * 0.22, r * 0.38]], [[0, -r * 0.55], [0, r * 0.55]]];
  A.note = (w = 240) => { const h = w * 0.46; return [{ pts: R(-w / 2, -h / 2, w, h), closed: true, fill: 'rgba(110,231,183,0.18)' }, { pts: R(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28) }, { pts: CP(0, 0, h * 0.26, 30) }, [[-w * 0.36, -h * 0.2], [-w * 0.36, h * 0.2]], [[w * 0.36, -h * 0.2], [w * 0.36, h * 0.2]]]; };
  A.card = (w = 260) => { const h = w * 0.62; return [{ pts: [[-w / 2 + 18, -h / 2], [w / 2 - 18, -h / 2], [w / 2, -h / 2 + 18], [w / 2, h / 2 - 18], [w / 2 - 18, h / 2], [-w / 2 + 18, h / 2], [-w / 2, h / 2 - 18], [-w / 2, -h / 2 + 18]], closed: true, fill: F },
    { pts: R(-w * 0.36, -h * 0.18, w * 0.18, h * 0.24), closed: true, fill: FY }, [[-w * 0.36, h * 0.22], [w * 0.1, h * 0.22]], [[w * 0.2, h * 0.22], [w * 0.36, h * 0.22]]]; };
  A.ring = (r = 50) => [{ pts: CP(0, 0, r, 40, 0, Math.PI * 2, r * 0.42) }, { pts: CP(0, 0, r * 0.8, 40, 0, Math.PI * 2, r * 0.32) }, { pts: [[-10, -r * 0.4], [0, -r * 0.4 - 24], [10, -r * 0.4], [0, -r * 0.4 + 6]], closed: true, fill: 'rgba(127,211,255,0.6)' }];
  A.tree = (h = 300) => { const r = h * 0.3; return [[[-10, 0], [-10, -h * 0.5]], [[10, 0], [10, -h * 0.5]], { pts: [...CP(0, -h * 0.7, r, 36, Math.PI * 0.8, Math.PI * 2.2)].concat([[r * 0.6, -h * 0.48], [-r * 0.6, -h * 0.48]]), closed: true, fill: 'rgba(110,231,183,0.25)' }, [[0, -h * 0.55], [-r * 0.4, -h * 0.75]], [[0, -h * 0.6], [r * 0.35, -h * 0.8]]]; };
  A.bee = (s = 60) => [{ pts: CP(0, 0, s, 30, 0, Math.PI * 2, s * 0.62), closed: true, fill: FY }, [[-s * 0.3, -s * 0.58], [-s * 0.3, s * 0.58]], [[s * 0.15, -s * 0.6], [s * 0.15, s * 0.6]], { pts: CP(-s * 0.1, -s * 0.9, s * 0.55, 24, 0, Math.PI * 2, s * 0.32), fill: 'rgba(234,244,255,0.25)', closed: true }, { pts: CP(s * 0.4, -s * 0.85, s * 0.45, 24, 0, Math.PI * 2, s * 0.28), fill: 'rgba(234,244,255,0.25)', closed: true }, [[s, 0], [s * 1.3, -s * 0.05]]];
  A.fish = (s = 80) => [{ pts: [[-s, 0], [-s * 0.3, -s * 0.42], [s * 0.5, -s * 0.3], [s, 0], [s * 0.5, s * 0.3], [-s * 0.3, s * 0.42]], closed: true, fill: 'rgba(127,211,255,0.2)' }, { pts: [[-s, 0], [-s * 1.45, -s * 0.38], [-s * 1.4, s * 0.38]], closed: true }, { pts: CP(s * 0.58, -s * 0.06, s * 0.07, 10) }];
  A.cloud = (w = 260) => [{ pts: [...CP(-w * 0.25, 0, w * 0.2, 20, Math.PI * 0.5, Math.PI * 1.5), ...CP(0, -w * 0.1, w * 0.26, 24, Math.PI * 1.1, Math.PI * 1.95), ...CP(w * 0.26, 0, w * 0.2, 20, -Math.PI * 0.5, Math.PI * 0.5)], closed: true, fill: F }];
  A.gavel = (s = 1) => [{ pts: R(-90 * s, -40 * s, 180 * s, 80 * s), closed: true, fill: 'rgba(234,244,255,0.1)' }, { pts: R(-110 * s, -48 * s, 22 * s, 96 * s), closed: true }, { pts: R(88 * s, -48 * s, 22 * s, 96 * s), closed: true }, { pts: R(-12 * s, 40 * s, 24 * s, 230 * s), closed: true, fill: 'rgba(234,244,255,0.1)' }];
  A.podium = (w = 300) => [{ pts: [[-w / 2, 0], [w / 2, 0], [w * 0.42, -w * 0.9], [-w * 0.42, -w * 0.9]], closed: true, fill: F }, { pts: R(-w * 0.55, -w * 0.98, w * 1.1, w * 0.08), closed: true }, { pts: CP(0, -w * 0.5, w * 0.16, 30) }];
  A.pitch = (w = 900) => { const h = w * 0.65; return [{ pts: R(-w / 2, -h / 2, w, h), closed: true, fill: 'rgba(110,231,183,0.1)' }, [[0, -h / 2], [0, h / 2]], { pts: CP(0, 0, h * 0.14, 40) }, { pts: [[-w / 2, -h * 0.3], [-w * 0.34, -h * 0.3], [-w * 0.34, h * 0.3], [-w / 2, h * 0.3]] }, { pts: [[w / 2, -h * 0.3], [w * 0.34, -h * 0.3], [w * 0.34, h * 0.3], [w / 2, h * 0.3]] }]; };
  A.monitor = (w = 420) => { const h = w * 0.62; return [{ pts: R(-w / 2, -h - 60, w, h), closed: true, fill: 'rgba(7,39,72,0.8)' }, [[-30, -60], [-50, 0], [50, 0], [30, -60]]]; };
  A.scale = (w = 500) => [[[0, 0], [0, -360]], [[-w * 0.2, 0], [w * 0.2, 0]], { pts: CP(0, -370, 14, 20), closed: true }];
  A.pan = (w = 220) => [[[-w / 2, 0], [0, -180], [w / 2, 0]], { pts: CP(0, 0, w / 2, 24, 0, Math.PI, 40), closed: true, fill: F }];
  A.frame = (w = 300, h = 220) => [{ pts: R(-w / 2, -h, w, h), closed: true, fill: F }, { pts: R(-w / 2 + 22, -h + 22, w - 44, h - 44) }, [[-w / 2 + 40, -60], [-w * 0.1, -h * 0.6], [w * 0.05, -100], [w * 0.2, -h * 0.5], [w / 2 - 40, -60]], { pts: CP(w * 0.22, -h * 0.72, 18, 16) }];
  A.tube = (s = 1) => [{ pts: [[-60 * s, -16 * s], [50 * s, -22 * s], [50 * s, 22 * s], [-60 * s, 16 * s]], closed: true, fill: 'rgba(255,123,92,0.3)' }, { pts: R(50 * s, -10 * s, 22 * s, 20 * s), closed: true }];
  A.school = (w = 300) => [{ pts: R(-w / 2, -w * 0.5, w, w * 0.5), closed: true, fill: F }, { pts: [[-w * 0.56, -w * 0.5], [0, -w * 0.8], [w * 0.56, -w * 0.5]] }, [[0, -w * 0.8], [0, -w * 1.05]], { pts: [[0, -w * 1.05], [w * 0.2, -w * 0.99], [0, -w * 0.93]], closed: true, fill: FY }, { pts: R(-w * 0.08, -w * 0.25, w * 0.16, w * 0.25) }];
  A.hospital = (w = 300) => [{ pts: R(-w / 2, -w * 0.7, w, w * 0.7), closed: true, fill: F }, { pts: [[-w * 0.06, -w * 0.62], [w * 0.06, -w * 0.62], [w * 0.06, -w * 0.5], [w * 0.18, -w * 0.5], [w * 0.18, -w * 0.38], [w * 0.06, -w * 0.38], [w * 0.06, -w * 0.26], [-w * 0.06, -w * 0.26], [-w * 0.06, -w * 0.38], [-w * 0.18, -w * 0.38], [-w * 0.18, -w * 0.5], [-w * 0.06, -w * 0.5]], closed: true, fill: 'rgba(255,123,92,0.45)', color: C.cor }, { pts: R(-w * 0.1, -w * 0.18, w * 0.2, w * 0.18) }];
  A.ore = (w = 400) => { const o = [{ pts: [[-w / 2, 0], [-w * 0.35, -w * 0.2], [-w * 0.12, -w * 0.32], [w * 0.1, -w * 0.36], [w * 0.3, -w * 0.22], [w / 2, 0]], closed: true, fill: 'rgba(255,123,92,0.18)' }];
    for (let i = 0; i < 7; i++) { const x = -w * 0.32 + i * w * 0.1, y = -w * (0.08 + 0.12 * Math.sin(i * 1.3 + 0.5) ** 2); o.push({ pts: [[x - 18, y], [x - 6, y - 16], [x + 14, y - 10], [x + 16, y + 8]], closed: true }); } return o; };
  A.truck = (w = 300) => [{ pts: [[-w / 2, -30], [w * 0.15, -30], [w * 0.15, -w * 0.42], [-w / 2, -w * 0.42]], closed: true, fill: F }, { pts: [[w * 0.15, -30], [w / 2, -30], [w / 2, -w * 0.22], [w * 0.38, -w * 0.34], [w * 0.15, -w * 0.34]], closed: true, fill: F }, { pts: CP(-w * 0.3, -30, 28, 20) }, { pts: CP(w * 0.3, -30, 28, 20) }];
  // a bank-computer screen with columns of digits that scroll
  P.screen = (ctx, x, y, w, h, t, k, { seed = 1 } = {}) => {
    if (k <= 0.01) return; P.art(ctx, A.monitor(w), k, { x, y }); const a = clamp((k - 0.6) / 0.4); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(x - w / 2 + 12, y - w * 0.62 - 48, w - 24, w * 0.62 - 24); ctx.clip();
    for (let c = 0; c < 9; c++) for (let r = 0; r < 12; r++) { const v = Math.floor(U.hash(c, r + Math.floor(t * 6 + c * 3), seed) * 10); const yy = y - w * 0.62 - 40 + ((r * 34 + t * 60 * (0.6 + U.hash(c, seed)) ) % (w * 0.62 + 20));
      G.text(ctx, String(v), x - w / 2 + 40 + c * (w - 60) / 9, yy, { size: 26, fam: 'Bungee', color: c % 3 === 1 ? C.yel : C.mint, alpha: 0.35 + 0.55 * U.hash(c, r, seed + 2), boil: 0 }); }
    ctx.restore();
  };
  // planet logo (Whyverse) in line art: ringed planet
  P.planetBP = (ctx, x, y, r, t, k = 1) => { if (k <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate(-0.25);
    P.art(ctx, [{ pts: CP(0, 0, r, 60), closed: true, fill: 'rgba(127,211,255,0.35)' }], k, { lw: 5 });
    P.art(ctx, [{ pts: CP(0, 0, r * 1.75, 60, -0.15, Math.PI + 0.15, r * 0.42), color: C.yel }], k, { lw: 6 });
    ctx.restore(); };
  // Earth cutaway: crust / mantle / outer core / inner core; cut = 0..1 opens a wedge
  P.earthCut = (ctx, x, y, r, t, { k = 1, cut = 0, glow = 0, lon0 = 0 } = {}) => {
    P.globe(ctx, x, y, r, t, { lon0, lat0: 18, k });
    if (cut <= 0.01) return; const a0 = -Math.PI * 0.5, a1 = a0 + Math.PI * 0.5 * ease.outCubic(cut);
    ctx.save(); ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, r + 2, a0, a1); ctx.closePath(); ctx.clip();
    ctx.fillStyle = C.bp3; ctx.fillRect(x - r - 4, y - r - 4, 2 * r + 8, 2 * r + 8);
    const L = [[1, 'rgba(234,244,255,0.15)'], [0.98, 'rgba(255,123,92,0.22)'], [0.55, 'rgba(255,170,74,0.5)'], [0.19, 'rgba(255,213,74,0.85)']];
    for (const [f, col] of L) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r * f, 0, 7); ctx.fill(); ctx.strokeStyle = C.ln; ctx.lineWidth = 2.5; ctx.stroke(); }
    if (glow > 0) P.glow(ctx, x, y, r * 0.7, C.yel, glow * (0.7 + 0.3 * Math.sin(t * 4)));
    ctx.restore();
    ctx.save(); ctx.strokeStyle = C.ln; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + Math.cos(a0) * r, y + Math.sin(a0) * r); ctx.lineTo(x, y); ctx.lineTo(x + Math.cos(a1) * r, y + Math.sin(a1) * r); ctx.stroke(); ctx.restore();
  };
  // a balance scale; tilt −1..1 (positive = right pan down)
  P.balance = (ctx, x, y, w, t, k, tilt, { left = null, right = null } = {}) => {
    if (k <= 0.01) return; P.art(ctx, A.scale(w), k, { x, y }); const ang = tilt * 0.32; const bx = Math.cos(ang) * w / 2, by = Math.sin(ang) * w / 2; const yy = y - 360;
    ctx.save(); ctx.globalAlpha *= clamp(k * 2); P.line(ctx, x - bx, yy - by, x + bx, yy + by, C.ln, 6);
    for (const [sx, side] of [[-1, left], [1, right]]) { const px = x + sx * bx, py = yy + sx * by; P.art(ctx, A.pan(220), 1, { x: px, y: py + 180 }); if (side) side(px, py + 180); }
    ctx.restore();
  };
})();
