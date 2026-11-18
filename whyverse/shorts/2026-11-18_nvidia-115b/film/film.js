// "$115.8 billion" — Whyverse daily trend Short, 18 Nov 2026. Pure function of time.
// Nvidia Q3 FY2027 results (17 Nov 2026, after the US close): revenue $115.8B (record), a year ago $57B (+103%),
// first report without Jensen Huang (resigned last week); board chair: no plans to reinstate him; Colette Kress = interim CEO.
// Kokoro af_heart VO on audio/vo.wav; every caption word / object lands on its spoken word (TIMING from the VO edit).
// Football-reel structure: number on frame 0, persistent bottom SCOREBOARD (REVENUE / VS 2025 / PER DAY / CEO),
// flashback (Q3 2025 bar in sepia), twist (the empty podium), payoff (biggest ever, without him), LIKE + FOLLOW end card.
// Look: CASH-STACK TRADING FLOOR — one long dark world the camera pans across: the chart zone (bars made of stacked
// banknotes), the day-counter zone (flip calendar + growing cash pile), the stage zone (spotlight, podium, ink silhouettes).
// No company logos (Nvidia only in type). Huang = silhouette (swept-back grey hair, leather-jacket collar), no face.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, rrect, hash01, clamp, TAU } = M;

const TIMING = {"dur": 22.802, "lines": [{"t0": 0.1, "t1": 3.655, "words": [{"w": "$115.8 billion", "t": 0.13, "key": true}, {"w": "dollars.", "t": 2.098, "key": false}, {"w": "In", "t": 2.81, "key": false}, {"w": "three", "t": 2.97, "key": true}, {"w": "months.", "t": 3.25, "key": false}]}, {"t0": 4.0, "t1": 5.867, "words": [{"w": "Nvidia", "t": 4.03, "key": false}, {"w": "just", "t": 4.381, "key": false}, {"w": "broke", "t": 4.644, "key": false}, {"w": "its", "t": 4.951, "key": false}, {"w": "own", "t": 5.17, "key": false}, {"w": "record.", "t": 5.389, "key": true}]}, {"t0": 6.25, "t1": 8.392, "words": [{"w": "A", "t": 6.28, "key": false}, {"w": "year", "t": 6.404, "key": false}, {"w": "ago,", "t": 6.653, "key": false}, {"w": "it", "t": 7.0, "key": false}, {"w": "was", "t": 7.171, "key": false}, {"w": "$57 billion.", "t": 7.384, "key": true}]}, {"t0": 8.75, "t1": 10.481, "words": [{"w": "That's", "t": 8.78, "key": false}, {"w": "over", "t": 9.042, "key": false}, {"w": "a", "t": 9.266, "key": false}, {"w": "billion", "t": 9.378, "key": true}, {"w": "dollars", "t": 9.715, "key": false}, {"w": "a", "t": 10.051, "key": false}, {"w": "day.", "t": 10.163, "key": true}]}, {"t0": 10.75, "t1": 12.49, "words": [{"w": "But", "t": 10.78, "key": false}, {"w": "the", "t": 10.956, "key": false}, {"w": "man", "t": 11.131, "key": false}, {"w": "who", "t": 11.307, "key": false}, {"w": "built", "t": 11.482, "key": false}, {"w": "it", "t": 11.728, "key": false}, {"w": "wasn't", "t": 11.868, "key": true}, {"w": "there.", "t": 12.114, "key": false}]}, {"t0": 12.75, "t1": 17.049, "words": [{"w": "Jensen", "t": 12.78, "key": false}, {"w": "Huang", "t": 13.191, "key": true}, {"w": "resigned", "t": 13.55, "key": false}, {"w": "last", "t": 14.064, "key": false}, {"w": "week.", "t": 14.372, "key": false}, {"w": "The", "t": 15.06, "key": false}, {"w": "board", "t": 15.247, "key": false}, {"w": "has", "t": 15.509, "key": false}, {"w": "no", "t": 15.696, "key": true}, {"w": "plans", "t": 15.845, "key": false}, {"w": "to", "t": 16.107, "key": false}, {"w": "bring", "t": 16.257, "key": false}, {"w": "him", "t": 16.519, "key": false}, {"w": "back.", "t": 16.706, "key": false}]}, {"t0": 17.25, "t1": 20.834, "words": [{"w": "The", "t": 17.29, "key": false}, {"w": "first", "t": 17.493, "key": true}, {"w": "report", "t": 17.777, "key": false}, {"w": "without", "t": 18.102, "key": false}, {"w": "him,", "t": 18.467, "key": false}, {"w": "and", "t": 19.0, "key": false}, {"w": "the", "t": 19.21, "key": false}, {"w": "biggest", "t": 19.42, "key": true}, {"w": "in", "t": 19.797, "key": false}, {"w": "Nvidia's", "t": 19.965, "key": false}, {"w": "history.", "t": 20.342, "key": false}]}, {"t0": 21.0, "t1": 22.802, "words": [{"w": "Like", "t": 21.03, "key": true}, {"w": "and", "t": 21.278, "key": false}, {"w": "follow", "t": 21.484, "key": true}, {"w": "Whyverse", "t": 21.814, "key": true}, {"w": "for", "t": 22.226, "key": false}, {"w": "more.", "t": 22.432, "key": false}]}]};
const C = {
  bg: '#0B0E0C', bg2: '#121814', grid: '#18211B', cream: '#F4F1E8', green: '#8FD13F', green2: '#5E9A26',
  cash: '#4F9A5A', cash2: '#3A7A45', cash3: '#2B5E35', strap: '#E9E2C8', amber: '#FFB547', amber2: '#E8892B',
  red: '#E5484D', grey: '#7D8A80', ink: '#050605', sepia: '#B79E72', sepia2: '#8E7752', sepia3: '#6E5C40', panel: '#0F1411', line: '#26302A',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const LN = (i) => TIMING.lines[i].t0;
const END = 24.4;
const S = { A: 0, B: LN(1) - 0.1, C: LN(2) - 0.1, D: LN(3) - 0.1, E: LN(4) - 0.1, F: LN(5) - 0.1, G: LN(6) - 0.1, H: LN(7) - 0.1 };
const B = (t) => t / 0.500008;
const tBack = T('biggest') - 0.75; // whip back to the chart

// ---------------------------------------------------------------- helpers
function chip(ctx, label, x, y, size, k, { bg = C.green, fg = C.ink, rot = -0.03, fam = UI, wt = 800 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, fam); const w = ctx.measureText(label).width + size * 1.0, h = size * 1.6;
  ctx.fillStyle = 'rgba(0,0,0,0.45)'; rrect(ctx, -w / 2 + 6, -h / 2 + 8, w, h, 12); ctx.fill();
  ctx.fillStyle = bg; rrect(ctx, -w / 2, -h / 2, w, h, 12); ctx.fill();
  text(ctx, label, 0, size * 0.36, font(size, wt, fam), fg, 'center', 1); ctx.restore();
}
function big(ctx, str, x, y, size, col, k, { rot = 0, stroke = C.ink, sw = 0.1 } = {}) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
  ctx.lineWidth = size * sw; ctx.strokeStyle = stroke; ctx.strokeText(str, 0, 0); ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function stamp(ctx, label, x, y, size, t, t0, col = C.red, rot = -0.08) {
  const k = t >= t0 ? Math.min(1.04, lerp(1.7, 1, E.outBack(prog(t, t0, t0 + 0.22)))) : 0; if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, 800, D); const w = ctx.measureText(label).width + size * 0.9, h = size * 1.4;
  ctx.fillStyle = 'rgba(5,6,5,0.75)'; ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.lineWidth = 10; ctx.strokeStyle = col; ctx.strokeRect(-w / 2, -h / 2, w, h);
  text(ctx, label, 0, size * 0.36, font(size, 800, D), col, 'center', 3); ctx.restore();
}
// a banknote seen face-on
function bill(ctx, x, y, w, h, rot = 0, pal = [C.cash, C.cash3, C.strap]) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(-w / 2 + 5, -h / 2 + 7, w, h);
  ctx.fillStyle = pal[0]; ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.lineWidth = Math.max(2, h * 0.06); ctx.strokeStyle = pal[1]; ctx.strokeRect(-w / 2 + h * 0.1, -h / 2 + h * 0.1, w - h * 0.2, h * 0.8);
  ctx.fillStyle = pal[1]; ctx.beginPath(); ctx.ellipse(0, 0, h * 0.32, h * 0.32, 0, 0, TAU); ctx.fill();
  text(ctx, '$', 0, h * 0.18, font(h * 0.5, 800, D), pal[2], 'center');
  text(ctx, '1', -w / 2 + h * 0.3, -h / 2 + h * 0.36, font(h * 0.24, 800, D), pal[2], 'center');
  text(ctx, '1', w / 2 - h * 0.3, h / 2 - h * 0.14, font(h * 0.24, 800, D), pal[2], 'center');
  ctx.restore();
}
// a stack of banknotes seen from the side: a bar of height hpx standing on baseline y0
function cashBar(ctx, x, w, y0, hpx, t, sep = false) {
  if (hpx <= 1) return;
  const pal = sep ? [C.sepia, C.sepia2, C.sepia3] : [C.cash, C.cash2, C.cash3];
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.4)'; ctx.fillRect(x + 12, y0 - hpx + 12, w, hpx);
  ctx.fillStyle = pal[0]; ctx.fillRect(x, y0 - hpx, w, hpx);
  ctx.beginPath(); ctx.rect(x, y0 - hpx, w, hpx); ctx.clip();
  for (let yy = y0; yy > y0 - hpx; yy -= 11) { ctx.fillStyle = pal[1]; ctx.fillRect(x, yy - 2, w, 2);
    const off = (hash01(Math.round(yy), 7) - 0.5) * 10; ctx.fillStyle = pal[2]; ctx.fillRect(x + off, yy - 11, 4, 9); }
  // paper straps every 130 px
  for (let yy = y0 - 60; yy > y0 - hpx + 10; yy -= 130) { ctx.fillStyle = sep ? '#D9CBA8' : C.strap; ctx.fillRect(x + w * 0.38, yy - 22, w * 0.24, 44);
    text(ctx, '$', x + w / 2, yy + 13, font(36, 800, D), pal[2], 'center'); }
  ctx.restore();
  // top bill (face-on, slight perspective)
  ctx.save(); ctx.translate(x + w / 2, y0 - hpx); ctx.scale(1, 0.32); bill(ctx, 0, 0, w, w * 0.45, 0, sep ? [C.sepia, C.sepia3, '#EDE2C6'] : [C.cash, C.cash3, C.strap]); ctx.restore();
}

// ---------------------------------------------------------------- camera: keys [time, zoom, fx, fy]
const Z1 = 540, Z2 = 1620, Z3 = 2700;
const CAM = [
  [0, 1.0, Z1, 960], [S.B + 0.05, 1.14, Z1 + 90, 820], [S.C + 0.05, 1.0, Z1 - 20, 960],
  [S.D - 0.05, 1.0, Z2, 960], [S.E - 0.05, 1.02, Z3, 960], [T('Jensen') - 0.15, 1.12, Z3 + 40, 900],
  [T('board') - 0.25, 0.97, Z3, 980], [S.H - 0.5 > tBack ? tBack : tBack, 1.0, Z1, 960], [T('history.') - 0.2, 1.04, Z1 + 60, 960],
];
function camAt(t) {
  let z = CAM[0][1], fx = CAM[0][2], fy = CAM[0][3];
  for (let i = 1; i < CAM.length; i++) { const [ti, zi, xi, yi] = CAM[i]; const far = Math.abs(xi - fx) > 600;
    const p = E.inOutCubic(prog(t, ti - 0.15, ti + (far ? 0.42 : 0.5))); if (p <= 0) break;
    z = z * (zi / z) ** p; fx = lerp(fx, xi, p); fy = lerp(fy, yi, p); }
  z *= 1 + 0.012 * Math.sin(t * 0.9); fx += 6 * Math.sin(t * 0.7); fy += 5 * Math.cos(t * 0.6);
  return { z, fx, fy };
}

// ---------------------------------------------------------------- the world
function backdrop(ctx, t) {
  const g = ctx.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#0A0D0B'); g.addColorStop(0.7, '#111713'); g.addColorStop(1, '#0B0E0C');
  ctx.fillStyle = g; ctx.fillRect(-600, -400, 4400, 2800);
  ctx.strokeStyle = C.grid; ctx.lineWidth = 2;
  for (let x = -600; x < 3800; x += 90) { ctx.beginPath(); ctx.moveTo(x, -400); ctx.lineTo(x, 2400); ctx.stroke(); }
  for (let y = -400; y < 2400; y += 90) { ctx.beginPath(); ctx.moveTo(-600, y); ctx.lineTo(3800, y); ctx.stroke(); }
  // floor
  ctx.fillStyle = '#151C17'; ctx.fillRect(-600, BASE, 4400, 900);
  ctx.fillStyle = C.line; ctx.fillRect(-600, BASE, 4400, 6);
}
const BASE = 1330, BAR25 = { x: 170, w: 250 }, BAR26 = { x: 600, w: 300 }, PXB = 7.4; // px per $1B
function revHeight(t) { // Q3 2026 bar
  const a = E.outCubic(prog(t, 0.1, 2.6)) * 0.86; const b = E.outBack(prog(t, T('broke') - 0.08, T('broke') + 0.35), 1.2) * 0.14;
  return 115.8 * PXB * (a + b);
}
const TAPE_Y = BASE - 115.8 * PXB * 0.9;
function chartZone(ctx, t) {
  const sep25 = true;
  // axis labels
  // Q3 2025 bar (flashback)
  const h25 = 57 * PXB * E.outBack(prog(t, T('year') - 0.1, T('year') + 0.6), 1.1);
  if (t >= T('year') - 0.1) { cashBar(ctx, BAR25.x, BAR25.w, BASE, h25, t, sep25);
    text(ctx, 'Q3 2025', BAR25.x + BAR25.w / 2, BASE + 70, font(50, 800, D), C.sepia, 'center', 2);
    const k = pop(t, T('$57 billion.') - 0.05); if (k > 0) { ctx.save(); ctx.translate(BAR25.x + BAR25.w / 2, BASE - h25 - 70); ctx.scale(k, k); text(ctx, '$57B', 0, 0, font(84, 800, D), C.sepia, 'center'); ctx.restore(); } }
  // record tape (snaps when the bar breaks through)
  const tb = T('broke');
  if (t >= S.B - 0.2) { const k = E.outCubic(prog(t, S.B - 0.2, S.B + 0.15)); const brk = E.outCubic(prog(t, tb, tb + 0.45));
    if (t > T('year') + 0.2) {} else { ctx.save(); ctx.globalAlpha = 1 - E.inCubic(prog(t, T('year') - 0.25, T('year') + 0.15));
    for (const side of [-1, 1]) { ctx.save(); const px = BAR26.x + BAR26.w / 2; ctx.translate(px + side * brk * 40, TAPE_Y + brk * 60); ctx.rotate(side * brk * 0.45);
      const len = 560 * k; ctx.fillStyle = C.amber; ctx.fillRect(side < 0 ? -len : 0, -22, len, 44);
      ctx.save(); ctx.beginPath(); ctx.rect(side < 0 ? -len : 0, -22, len, 44); ctx.clip();
      for (let i = -12; i < 12; i++) { ctx.fillStyle = C.ink; ctx.beginPath(); const xx = i * 60 + (side < 0 ? -10 : 10); ctx.moveTo(xx, -22); ctx.lineTo(xx + 26, -22); ctx.lineTo(xx + 2, 22); ctx.lineTo(xx - 24, 22); ctx.fill(); }
      ctx.restore();
      text(ctx, 'OLD RECORD', side < 0 ? -len / 2 - 40 : len / 2 + 40, 13, font(34, 800, UI), C.ink, 'center', 2);
      ctx.restore(); }
    ctx.restore(); } }
  // Q3 2026 bar
  const h26 = revHeight(t); cashBar(ctx, BAR26.x, BAR26.w, BASE, h26, t, false);
  text(ctx, 'Q3 2026', BAR26.x + BAR26.w / 2, BASE + 70, font(50, 800, D), C.green, 'center', 2);
  // flying bills while it grows
  if (t < 3.2) for (let i = 0; i < 14; i++) { const t0 = 0.15 + i * 0.19, a = prog(t, t0, t0 + 0.7); if (a <= 0 || a >= 1) continue;
    const sx = -150 + hash01(i, 2) * 1400, sy = -100; const ex = BAR26.x + BAR26.w / 2, ey = BASE - revHeight(t0 + 0.7);
    const e = E.inCubic(a); bill(ctx, lerp(sx, ex, e), lerp(sy, ey, e) - Math.sin(a * Math.PI) * 120, 150, 66, (1 - a) * (hash01(i, 3) - 0.5) * 3); }
  // doubling bracket (+103%)
  if (t >= T('$57 billion.') + 0.25 && t < S.E + 0.3) { const k = E.outCubic(prog(t, T('$57 billion.') + 0.25, T('$57 billion.') + 0.7));
    const y1 = BASE - 57 * PXB, y2 = BASE - 115.8 * PXB, xa = BAR25.x + BAR25.w + 40;
    ctx.save(); ctx.strokeStyle = C.cream; ctx.lineWidth = 7; ctx.setLineDash([18, 14]); ctx.beginPath(); ctx.moveTo(BAR25.x, y1); ctx.lineTo(BAR26.x + BAR26.w, y1); ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(xa + 60, y1); ctx.lineTo(xa + 60, lerp(y1, y2 + 30, k)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(xa + 40, lerp(y1, y2 + 30, k) + 24); ctx.lineTo(xa + 60, lerp(y1, y2 + 30, k)); ctx.lineTo(xa + 80, lerp(y1, y2 + 30, k) + 24); ctx.stroke(); ctx.restore();
    chip(ctx, '×2', xa + 60, (y1 + y2) / 2 + 40, 64, pop(t, T('$57 billion.') + 0.55), { bg: C.cream, rot: -0.05, fam: D }); }
  // crown + BIGGEST EVER at the payoff
  if (false) { const k = 0, y = 0;
    ctx.save(); ctx.translate(BAR26.x + BAR26.w / 2, y + Math.sin(t * 3) * 6); ctx.scale(k, k);
    ctx.fillStyle = C.amber; ctx.beginPath(); ctx.moveTo(-90, 40); ctx.lineTo(-100, -40); ctx.lineTo(-50, 0); ctx.lineTo(0, -60); ctx.lineTo(50, 0); ctx.lineTo(100, -40); ctx.lineTo(90, 40); ctx.closePath(); ctx.fill();
    ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore(); }
}
function dayAt(t) { const a = prog(t, T('over') - 0.1, T('day.') + 0.35); return Math.max(1, Math.round(1 + 90 * E.inOutSine(a))); }
function dayZone(ctx, t) {
  const X = Z2; if (t < S.D - 0.6 || t > S.F + 0.6) return;
  // flip calendar
  const cxw = X - 200, cy = 780, d = dayAt(Math.floor(t * 12) / 12);
  ctx.save(); ctx.translate(cxw, cy); ctx.rotate(-0.04);
  ctx.fillStyle = 'rgba(0,0,0,0.45)'; rrect(ctx, -190 + 10, -220 + 14, 380, 440, 26); ctx.fill();
  ctx.fillStyle = C.cream; rrect(ctx, -190, -220, 380, 440, 26); ctx.fill();
  ctx.fillStyle = C.red; rrect(ctx, -190, -220, 380, 110, 26); ctx.fill(); ctx.fillRect(-190, -140, 380, 30);
  text(ctx, 'DAY', 0, -142, font(64, 800, D), C.cream, 'center', 6);
  { const kd = 1 + 0.06 * Math.exp(-(((t - T('over')) * 18) % 1) * 6) * (t > T('over') && t < T('day.') + 0.35 ? 1 : 0); ctx.save(); ctx.translate(0, 40); ctx.scale(kd, kd); text(ctx, String(d), 0, 80, font(220, 800, D), C.ink, 'center'); ctx.restore(); }
  ctx.fillStyle = '#444'; for (const rx of [-110, 110]) { ctx.beginPath(); ctx.arc(rx, -220, 16, 0, TAU); ctx.fill(); }
  // flipping page
  const ph = ((t - T('over')) * 18) % 1; if (false) { ctx.save(); ctx.scale(1, Math.cos(ph * Math.PI) * 0.999);
    ctx.globalAlpha = 0.85; ctx.fillStyle = '#E3DED0'; rrect(ctx, -190, -110, 380, 330, 0); ctx.fill(); ctx.restore(); }
  ctx.restore();
  // cash pile growing: one bundle per "day"
  const n = Math.min(40, Math.floor((d - 1) * 40 / 90) + (t > T('over') ? 1 : 0));
  for (let i = 0; i < n; i++) { const row = Math.floor(i / 5), col = i % 5; const bx = X + 70 + col * 72 + (row % 2) * 36 - 150, by = BASE - 30 - row * 44;
    if (bx > X + 400) continue; ctx.save(); ctx.translate(bx + 140, by); ctx.scale(1, 1); bill(ctx, 0, 0, 150, 40, (hash01(i, 5) - 0.5) * 0.08); ctx.restore(); }
  // label
  chip(ctx, '$1B+ EVERY DAY', X + 20, 1080 - 80, 66, pop(t, T('day.') - 0.15), { bg: C.green, rot: -0.04, fam: D });
}
// silhouette of a man in a leather jacket with swept-back hair (no facial features)
function huang(ctx, x, y, sc, t, a = 1, outline = false) {
  if (a <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.globalAlpha = a;
  const breathe = Math.sin(t * 2.2) * 3;
  ctx.beginPath();
  // body: jacket shoulders, collar points
  ctx.moveTo(-215, 760); ctx.lineTo(-200, 170 + breathe); ctx.quadraticCurveTo(-190, 90, -110, 60); ctx.lineTo(-62, 30); ctx.lineTo(-40, -10);
  ctx.lineTo(40, -10); ctx.lineTo(62, 30); ctx.lineTo(110, 60); ctx.quadraticCurveTo(190, 90, 200, 170 + breathe); ctx.lineTo(215, 760); ctx.closePath();
  const fillBody = outline ? 'rgba(0,0,0,0)' : C.ink;
  ctx.fillStyle = fillBody; ctx.fill();
  if (outline) { ctx.setLineDash([16, 12]); ctx.lineWidth = 6; ctx.strokeStyle = C.cream; ctx.stroke(); ctx.setLineDash([]); }
  // collar flaps (leather jacket)
  ctx.beginPath(); ctx.moveTo(-60, 26); ctx.lineTo(-120, 70); ctx.lineTo(-70, 150); ctx.lineTo(-20, 60); ctx.closePath();
  ctx.moveTo(60, 26); ctx.lineTo(120, 70); ctx.lineTo(70, 150); ctx.lineTo(20, 60); ctx.closePath();
  if (!outline) { ctx.fillStyle = '#1A1D1B'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#2E332F'; ctx.stroke(); }
  // neck + head
  ctx.beginPath(); ctx.ellipse(0, -110, 78, 96, 0, 0, TAU); ctx.rect(-34, -40, 68, 50);
  if (!outline) { ctx.fillStyle = C.ink; ctx.fill(); } else { ctx.setLineDash([16, 12]); ctx.lineWidth = 6; ctx.strokeStyle = C.cream; ctx.stroke(); ctx.setLineDash([]); }
  // swept-back hair volume (grey rim)
  ctx.beginPath(); ctx.moveTo(-76, -140); ctx.quadraticCurveTo(-70, -228, 10, -236); ctx.quadraticCurveTo(84, -236, 98, -170); ctx.quadraticCurveTo(102, -130, 84, -96);
  ctx.lineTo(70, -130); ctx.quadraticCurveTo(20, -160, -60, -110); ctx.closePath();
  if (!outline) { ctx.fillStyle = C.ink; ctx.fill();
    ctx.beginPath(); ctx.moveTo(-70, -150); ctx.quadraticCurveTo(-64, -224, 10, -230); ctx.quadraticCurveTo(80, -230, 94, -168);
    ctx.lineWidth = 9; ctx.strokeStyle = '#9EA3A0'; ctx.lineCap = 'round'; ctx.stroke();
    for (const o of [-30, 10, 50]) { ctx.beginPath(); ctx.moveTo(o - 30, -200); ctx.quadraticCurveTo(o + 10, -222, o + 50, -205); ctx.lineWidth = 4; ctx.strokeStyle = '#5E6461'; ctx.stroke(); } }
  ctx.restore();
}
function stageZone(ctx, t) {
  const X = Z3; if (t < S.E - 0.7 || t > tBack + 0.7) return;
  // spotlight backdrop
  const sx = X, sy = 760; const g = ctx.createRadialGradient(sx, sy, 40, sx, sy, 520);
  g.addColorStop(0, '#FFD58A'); g.addColorStop(0.55, C.amber); g.addColorStop(1, 'rgba(232,137,43,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, sy, 520, 0, TAU); ctx.fill();
  // beam
  ctx.save(); ctx.globalAlpha = 0.12; ctx.fillStyle = '#FFE2A8'; ctx.beginPath(); ctx.moveTo(sx - 40, 120); ctx.lineTo(sx + 40, 120); ctx.lineTo(sx + 330, BASE); ctx.lineTo(sx - 330, BASE); ctx.fill(); ctx.restore();
  // board table (behind) — appears on "board"
  const kb = pop(t, T('board') - 0.1);
  if (kb > 0 && t < S.H + 0.3) { ctx.save(); ctx.translate(sx, 0);
    for (let i = 0; i < 5; i++) { const bx = -440 + i * 220, by = 1040 + (1 - Math.min(1, kb)) * 300, nod = t > T('no') ? Math.sin((t - T('no')) * 9 + i) * 0.06 * Math.exp(-(t - T('no')) * 1.6) : 0;
      ctx.save(); ctx.translate(bx, by); ctx.rotate(nod); ctx.fillStyle = '#1B201C'; ctx.beginPath(); ctx.ellipse(0, -60, 40, 48, 0, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-80, 80); ctx.quadraticCurveTo(-75, 0, 0, -6); ctx.quadraticCurveTo(75, 0, 80, 80); ctx.fill(); ctx.restore(); }
    ctx.fillStyle = '#2A1E14'; ctx.fillRect(-540, 1110, 1080, 60); ctx.fillStyle = '#3B2A1B'; ctx.fillRect(-540, 1110, 1080, 14);
    text(ctx, 'NVIDIA BOARD', -330, 1158, font(34, 800, UI), C.amber, 'center', 4);
    ctx.restore(); }
  // Huang silhouette: appears on "man", dissolves to an outline on "wasn't", returns with name plate, walks off on "back."
  const tm = T('man') - 0.1, tw = T("wasn't") - 0.05, tj = T('Jensen') - 0.1, tbk = T('back.') - 0.2;
  let hx = sx + 150, hy = 720, a = 0, outl = false;
  if (t >= tm && t < tw) { a = E.outCubic(prog(t, tm, tm + 0.35)); hy += (1 - a) * 80; }
  else if (t >= tw && t < tj) { a = 1; outl = true; }
  else if (t >= tj) { const off = E.inOutCubic(prog(t, tbk, tbk + 0.9)); a = 1 - off * 0.9; hx = lerp(sx - 170, sx - 760, off); hy = 700 + off * 30; }
  ctx.save(); ctx.beginPath(); ctx.rect(sx - 1200, -400, 2400, BASE + 400); ctx.clip();
  if (t >= tj && t < tj + 0.4) { const q = E.inOutCubic(prog(t, tj, tj + 0.4)); hx = lerp(sx + 150, sx - 170, q); }
  if (t < tbk + 1.0 && a > 0) { if (t >= tj) huang(ctx, hx, hy, 0.95, t, a, false); else huang(ctx, hx, hy, 0.95, t, a, outl); }
  ctx.restore();
  // podium (always)
  ctx.save();
  const px = sx + 150, pw = 300;
  ctx.fillStyle = '#1C1410'; ctx.beginPath(); ctx.moveTo(px - pw / 2, 980); ctx.lineTo(px + pw / 2, 980); ctx.lineTo(px + pw / 2 - 30, BASE); ctx.lineTo(px - pw / 2 + 30, BASE); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#2B1F17'; ctx.fillRect(px - pw / 2 - 20, 960, pw + 40, 36);
  ctx.strokeStyle = '#555'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(px - 40, 960); ctx.quadraticCurveTo(px - 60, 880, px - 100, 860); ctx.stroke();
  ctx.fillStyle = '#333'; ctx.beginPath(); ctx.ellipse(px - 104, 856, 14, 20, -0.6, 0, TAU); ctx.fill();
  ctx.fillStyle = C.cream; rrect(ctx, px - 110, 1040, 220, 80, 10); ctx.fill();
  text(ctx, 'Q3', px, 1095, font(48, 800, D), C.ink, 'center', 3);
  ctx.restore();
  // EMPTY podium tag
  if (t >= tw && t < tj) chip(ctx, 'NOT AT THE PODIUM', sx, 560, 52, pop(t, tw), { bg: C.cream, rot: -0.04 });
  // name plate for Huang
  if (t >= tj && t < tbk + 0.6) { const k = pop(t, tj); chip(ctx, 'JENSEN HUANG', sx - 150, 1140, 54, k, { bg: C.cream, rot: -0.03 });
    text(ctx, 'co-founder · CEO since 1993', sx - 150, 1212, font(36, 700, UI), C.cream, 'center', 1); }
  if (t >= T('resigned') - 0.1 && t < T('board') - 0.2) stamp(ctx, 'RESIGNED', sx - 110, 600, 96, t, T('resigned') - 0.1, C.red, -0.09);
  if (t >= T('last') && t < T('board') - 0.2) chip(ctx, 'LAST WEEK', sx + 190, 700, 56, pop(t, T('last') - 0.05), { bg: C.amber, rot: 0.05 });
  if (t >= T('no') - 0.1 && t < S.G) { stamp(ctx, 'NO PLANS TO REINSTATE', sx, 600, 62, t, T('no') - 0.1, C.red, -0.05); }
  // Kress name plate on the podium
  if (t >= S.G - 0.05) { const k = pop(t, T('first') - 0.1); chip(ctx, 'COLETTE KRESS', sx + 150, 790, 50, k, { bg: C.green, rot: -0.03 });
    text(ctx, 'interim CEO', sx + 150, 858, font(38, 700, UI), C.cream, 'center', 1); }
}

// ---------------------------------------------------------------- persistent scoreboard
function revAt(t) { return 115.8 * E.outCubic(prog(t, 0.13, 2.1)); }
const CELLS = [
  ['REVENUE', 0.13, () => null, C.green],
  ['VS 2025', () => T('$57 billion.') + 0.5, '+103%', C.cream],
  ['PER DAY', () => T('day.') - 0.1, '$1B+', C.cream],
  ['CEO', () => T('Huang') - 0.05, 'HUANG', C.cream],
];
function board(ctx, t) {
  const y = s.y + s.h - 50, w = 960, x0 = cx - w / 2, h = 140, cw = w / 4;
  const k = E.outCubic(prog(t, 0, 0.25));
  ctx.save(); ctx.translate(0, (1 - k) * 220);
  ctx.fillStyle = 'rgba(0,0,0,0.5)'; rrect(ctx, x0 + 6, y - h / 2 + 10, w, h, 18); ctx.fill();
  ctx.fillStyle = C.panel; rrect(ctx, x0, y - h / 2, w, h, 18); ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.line; ctx.stroke();
  for (let i = 0; i < 4; i++) { const xx = x0 + i * cw; if (i) { ctx.fillStyle = C.line; ctx.fillRect(xx, y - h / 2 + 14, 3, h - 28); }
    const lab = CELLS[i][0]; text(ctx, lab, xx + cw / 2, y - 20, font(32, 700, UI), C.grey, 'center', 3);
    let val = '?', col = '#3E4A42', ti = 0;
    if (i === 0) { if (t >= 0.13) { const r = revAt(t); val = '$' + r.toFixed(1) + 'B'; col = C.green; ti = 0.13; } }
    else if (i === 3) { const tr = T('Huang') - 0.05, tk = T('first') - 0.1;
      if (t >= tk) { val = 'KRESS'; col = C.green; ti = tk; } else if (t >= tr) { val = 'HUANG'; col = C.cream; ti = tr; } }
    else { ti = CELLS[i][1](); if (t >= ti - 0.05) { val = CELLS[i][2]; col = C.cream; } }
    const pk = i === 0 ? 1 : (t >= ti ? pop(t, ti - 0.05) : 1);
    ctx.save(); ctx.translate(xx + cw / 2, y + 46); ctx.scale(pk, pk); text(ctx, val, 0, 0, font(i === 0 ? 50 : 50, 800, D), col, 'center', 1); ctx.restore();
    if (i === 3 && t >= T('resigned') - 0.05 && t < T('first') - 0.1) { const kk = E.outCubic(prog(t, T('resigned') - 0.05, T('resigned') + 0.2));
      ctx.fillStyle = C.red; ctx.fillRect(xx + 30, y + 30, (cw - 60) * kk, 7); }
    if (i === 3 && t >= T('first') - 0.1) text(ctx, 'INTERIM', xx + cw / 2, y + 62 + 18, font(22, 700, UI), C.grey, 'center', 3);
  }
  ctx.restore();
}
// ticker strip above the scoreboard
const TICK = ['Q3 REVENUE $115.8B', 'UP 103% IN A YEAR', 'WALL ST EXPECTED ~$109B', 'SHARES UP ~3% AFTER HOURS', 'FIRST REPORT WITHOUT HUANG'];
function ticker(ctx, t) {
  if (t < 0.4) return; const y = s.y + s.h - 165, h = 56;
  ctx.fillStyle = 'rgba(8,10,9,0.85)'; ctx.fillRect(0, y - h / 2, W, h); ctx.fillStyle = C.green; ctx.fillRect(0, y - h / 2, W, 3);
  ctx.save(); ctx.beginPath(); ctx.rect(0, y - h / 2, W, h); ctx.clip();
  if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'; ctx.font = font(32, 700, UI); const str = TICK.join('     •     ') + '     •     '; const wd = ctx.measureText(str).width;
  ctx.fillStyle = C.cream; ctx.textAlign = 'left'; let x = -((t * 150) % wd); while (x < W) { ctx.fillText(str, x, y + 11); x += wd; }
  ctx.restore();
}

// ---------------------------------------------------------------- captions (word by word, top)
function captions(ctx, t) {
  const L = TIMING.lines; const li = L.findIndex((l, i) => t >= l.t0 - 0.05 && t < (L[i + 1] ? L[i + 1].t0 - 0.05 : END)); if (li < 0) return;
  if (li === 7) return;
  let all = L[li].words; if (li === 0) { all = all.slice(all.findIndex((w) => w.w === 'In')); }
  const ws = all.filter((w) => t >= w.t - 0.03); if (!ws.length) return;
  const start = Math.floor((ws.length - 1) / 3) * 3, chunk = all.slice(start, start + 3), shown = ws.slice(start);
  let size = 96; const gap = 24;
  const meas = (sz) => { ctx.font = font(sz, 800, D); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 20) { size = Math.floor(size * (s.w - 20) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 90;
  shown.forEach((w, i) => { const k = sp(t, w.t - 0.03, SPRING.bouncy), sc = Math.min(1.1, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.22; ctx.strokeStyle = C.ink; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.green : C.cream; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}

// ---------------------------------------------------------------- screen-space overlays
function overlays(ctx, t) {
  const tOut = T('In') - 0.1;
  if (t < tOut + 0.4) { // HOOK on frame 0
    const out = E.inCubic(prog(t, tOut, tOut + 0.35)); const k0 = t < 0.2 ? lerp(1.12, 1, E.outBack(prog(t, 0, 0.2))) : 1;
    ctx.save(); ctx.translate(0, -out * 800); ctx.globalAlpha = 1 - out;
    ctx.fillStyle = 'rgba(5,7,6,0.6)'; ctx.fillRect(0, s.y - 70, W, 560);
    big(ctx, '$115.8', cx, s.y + 270, 270, C.green, k0 * (1 + 0.012 * Math.sin(t * 7)), { sw: 0.06 });
    big(ctx, 'BILLION', cx, s.y + 420, 150, C.cream, k0, { sw: 0.07 });
    chip(ctx, 'NVIDIA', cx - 250, s.y + 10, 60, pop(t, 0.02), { bg: C.cream, rot: -0.05, fam: D });
    chip(ctx, 'RECORD QUARTER', cx + 160, s.y + 20, 48, pop(t, 0.5), { bg: C.amber, rot: 0.04 });
    ctx.restore();
  }
  if (t >= T('three') - 0.05 && t < S.B + 0.1) { // 3 months
    const k = pop(t, T('three') - 0.05); chip(ctx, '3 MONTHS', cx - 210, s.y + 260, 70, k, { bg: C.cream, rot: -0.05, fam: D }); }
  if (t >= T('record.') - 0.1 && t < S.C + 0.1) stamp(ctx, 'NEW RECORD', cx - 110, s.y + 300, 92, t, T('record.') - 0.12, C.amber, -0.07);
  if (t >= T('year') - 0.1 && t < S.D) chip(ctx, 'A YEAR AGO', cx - 250, s.y + 230, 50, pop(t, T('year') - 0.1), { bg: C.sepia, rot: -0.04 });
  if (t >= T('biggest') - 0.1 && t < S.H) { stamp(ctx, 'BIGGEST EVER', cx, s.y + 300, 90, t, T('biggest') - 0.1, C.green, -0.05);
    chip(ctx, 'WITHOUT HIM', cx + 170, s.y + 440, 50, pop(t, T('history.') - 0.1), { bg: C.cream, rot: 0.05 }); }
}

// ---------------------------------------------------------------- end card
function endCard(ctx, t) {
  const k = E.outCubic(prog(t, S.H - 0.05, S.H + 0.35)); if (k <= 0) return;
  ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = 'rgba(6,8,7,0.88)'; ctx.fillRect(0, 0, W, H); ctx.restore();
  // mini cash bars
  const bk = E.outBack(prog(t, S.H + 0.05, S.H + 0.6)); if (bk > 0) { cashBar(ctx, cx - 190, 120, s.y + 300, 57 * 2.2 * bk, t, true); cashBar(ctx, cx + 70, 120, s.y + 300, 115.8 * 2.2 * bk, t, false); }
  big(ctx, 'WHYVERSE', cx, s.y + 430, 130, C.cream, pop(t, S.H), { sw: 0.05 });
  text(ctx, '$115.8B · NO JENSEN · NEW RECORD', cx, s.y + 520, font(42, 800, D), C.green, 'center', 2);
  const kB = pop(t, T('Like') - 0.05), kF = pop(t, T('follow') - 0.05);
  if (kB > 0) { ctx.save(); ctx.translate(cx - 215, s.y + 720); ctx.scale(kB, kB); ctx.rotate(-0.04);
    ctx.fillStyle = C.cream; rrect(ctx, -190, -72, 380, 144, 24); ctx.fill();
    const hb = 1 + 0.14 * Math.max(0, Math.sin((t - T('Like')) * 9)) * Math.exp(-(t - T('Like')) * 2);
    ctx.save(); ctx.translate(-105, 4); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30);
    ctx.fillStyle = C.red; ctx.fill(); ctx.restore();
    text(ctx, 'LIKE', 45, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  if (kF > 0) { ctx.save(); ctx.translate(cx + 215, s.y + 720); ctx.scale(kF, kF); ctx.rotate(0.04);
    ctx.fillStyle = C.green; rrect(ctx, -190, -72, 380, 144, 24); ctx.fill();
    ctx.save(); ctx.translate(-130, 4); ctx.lineWidth = 13; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'FOLLOW', 45, 24, font(56, 800, D), C.ink, 'center'); ctx.restore(); }
  const kS = pop(t, T('more.') + 0.05);
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 930); ctx.scale(kS, kS);
    ctx.fillStyle = '#18201B'; rrect(ctx, -470, -80, 940, 160, 20); ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.line; ctx.stroke();
    ctx.save(); ctx.translate(-385, 0); ctx.fillStyle = C.cream; ctx.fillRect(-36, -24, 72, 48); ctx.lineWidth = 5; ctx.strokeStyle = '#18201B'; ctx.beginPath(); ctx.moveTo(-36, -24); ctx.lineTo(0, 6); ctx.lineTo(36, -24); ctx.stroke(); ctx.restore();
    text(ctx, 'Send this to the friend who says', 40, -12, font(42, 700, UI), C.cream, 'center');
    text(ctx, 'the AI bubble is about to pop', 40, 42, font(42, 700, UI), C.green, 'center');
    ctx.restore(); }
  // a few bills drifting down on the end card
  for (let i = 0; i < 8; i++) { const a = ((t - S.H) * 0.35 + hash01(i, 11)) % 1; if (t < S.H + 0.2) break;
    ctx.save(); ctx.globalAlpha = 0.5 * k; bill(ctx, 80 + hash01(i, 12) * 920, lerp(-60, H + 60, a), 120, 52, Math.sin(t * 2 + i) * 0.5); ctx.restore(); }
}

const HITS = [
  [B(0.02), '$115.8', 'pop', { pitch: 'D5' }], [B(0.15), 'counter roll', 'type', { len: 1.9, n: 14 }], [B(0.5), 'RECORD QUARTER', 'click'],
  [B(T('In') - 0.1), 'hook off', 'whoosh', { len: 0.35, from: 500, to: 1600 }], [B(T('three') - 0.05), '3 MONTHS', 'pop', { pitch: 'A4' }],
  [B(S.B + 0.05), 'push in', 'whoosh', { len: 0.4, from: 300, to: 1200 }], [B(T('broke') - 0.05), 'tape snap', 'click'], [B(T('record.') - 0.12), 'NEW RECORD', 'pop', { pitch: 'E5' }],
  [B(T('year') - 0.1), 'flashback bar', 'whoosh', { len: 0.4, from: 1400, to: 400 }], [B(T('$57 billion.') - 0.05), '$57B', 'pop', { pitch: 'A4' }], [B(T('$57 billion.') + 0.55), 'x2', 'blip', { pitch: 'E5' }],
  [B(S.D - 0.05), 'pan to days', 'whoosh', { len: 0.45, from: 500, to: 1800 }], [B(T('over') - 0.1), 'days flip', 'type', { len: 1.4, n: 18 }], [B(T('day.') - 0.15), '$1B+ DAY', 'coins'],
  [B(S.E - 0.05), 'pan to stage', 'whoosh', { len: 0.45, from: 1800, to: 500 }], [B(T('man') - 0.1), 'silhouette', 'tok', { pitch: 'C4' }], [B(T("wasn't") - 0.05), 'empty', 'blip', { pitch: 'G4' }],
  [B(T('Jensen') - 0.1), 'name plate', 'click'], [B(T('resigned') - 0.1), 'RESIGNED', 'pop', { pitch: 'D4' }], [B(T('last') - 0.05), 'LAST WEEK', 'tick'],
  [B(T('board') - 0.1), 'board rises', 'whoosh', { len: 0.35, from: 300, to: 900 }], [B(T('no') - 0.1), 'NO RETURN', 'pop', { pitch: 'A4' }], [B(T('back.') - 0.2), 'walk off', 'whoosh', { len: 0.5, from: 900, to: 300 }],
  [B(T('first') - 0.1), 'KRESS', 'click'], [B(tBack), 'whip back', 'whoosh', { len: 0.45, from: 1800, to: 500 }], [B(T('biggest') - 0.1), 'BIGGEST EVER', 'bell', { pitch: 'E5' }],
  [B(T('history.') - 0.1), 'WITHOUT HIM', 'click'],
  [B(S.H), 'end', 'whoosh', { len: 0.4, from: 1600, to: 400 }], [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop', { pitch: 'A5' }], [B(T('more.') + 0.05), 'send', 'click'],
];

M.film({
  fonts: [font(40, 800, D), font(40, 700, UI)], samples: 4,
  hits: HITS,
  draw(ctx, u, t) {
    const { z, fx, fy } = camAt(t);
    ctx.save(); ctx.translate(W / 2, 900); ctx.scale(z, z); ctx.translate(-fx, -fy);
    backdrop(ctx, t); chartZone(ctx, t); dayZone(ctx, t); stageZone(ctx, t);
    ctx.restore();
    const vg = ctx.createRadialGradient(W / 2, H / 2, 500, W / 2, H / 2, 1250); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.55)'); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
    overlays(ctx, t);
    if (t < S.H + 0.2) { ticker(ctx, t); board(ctx, t); }
    captions(ctx, t);
    endCard(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 200; i++) { ctx.fillStyle = `rgba(255,255,255,${0.012 + 0.02 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
