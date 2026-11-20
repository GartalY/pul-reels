// "$2.36 billion in one day" — Whyverse 23:00 London animated fact Short, 20 Nov 2026. Pure function of time.
// GTA VI launched 19 Nov 2026; Sensor Tower ESTIMATE ~24.6M copies / ~$2.36B through launch day (incl. pre-orders, PS5 + Xbox).
// GTA V Sept 2013: 11.21M copies / $815.7M in 24 h (Guinness). No official Take-Two numbers yet.
// Look: GROWING GRAPH + night city skyline on the Whyverse navy with a sunset band; generic controller/case, no IP.
// Persistent world: skyline at the bottom + DAY ONE meter (24 h ring + running $ counter) as progress counter.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, hash01, clamp, TAU } = M;

const TIMING = __TIMING__;
const C = {
  navy: '#0A1030', navy2: '#141D4A', navy3: '#1E2A63', line: '#9DB2FF', white: '#F6F3EA', gold: '#FFC447', gold2: '#E9A21F',
  coral: '#FF6F5E', dim: '#5E6CA8', ink: '#04061A', green: '#7CE0A3',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const LN = (i) => TIMING.lines[i].t0;
const END = TIMING.dur;
const S = { A: 0, B: LN(1) - 0.1, C: LN(2) - 0.1, D: LN(3) - 0.1, E: LN(4) - 0.1, F: LN(5) - 0.1, G: LN(6) - 0.1 };
const B = (t) => t / 0.500034;
const GROUND = H - 300;
// ---------------------------------------------------------------- helpers
function bg(ctx, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, C.navy); g.addColorStop(0.7, C.navy2); g.addColorStop(1, C.navy3);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 90; i++) { const x = hash01(i, 1) * W, y = hash01(i, 2) * H * 0.75, r = 1 + 1.6 * hash01(i, 3) ** 3;
    ctx.globalAlpha = (0.25 + 0.4 * hash01(i, 5)) * (0.6 + 0.4 * Math.sin(t * (1 + hash01(i, 4)) + i)); ctx.fillStyle = C.white;
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }
  ctx.globalAlpha = 1;
}
function big(ctx, str, x, y, size, col, k, { rot = 0, fam = D, wt = 800, align = 'center' } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.font = font(size, wt, fam); ctx.textAlign = align; ctx.lineJoin = 'round';
  ctx.lineWidth = size * 0.12; ctx.strokeStyle = C.navy; ctx.strokeText(str, 0, 0); ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function tag(ctx, label, x, y, size, k, { bg = C.gold, fg = C.navy, rot = 0 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.font = font(size, 800, UI);
  const w = ctx.measureText(label).width + size * 1.0, h = size * 1.5;
  ctx.fillStyle = bg; M.rrect(ctx, -w / 2, -h / 2, w, h, h * 0.22); ctx.fill();
  ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.fillText(label, 0, size * 0.36); ctx.restore();
}
function lineDraw(ctx, pts, p, col = C.line, w = 4) {
  if (p <= 0) return; let L = 0; const seg = [];
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let left = L * Math.min(1, p); ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length && left > 0; i++) { const f = Math.min(1, left / seg[i - 1]);
    ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); left -= seg[i - 1]; }
  ctx.stroke(); ctx.restore();
}
function sceneFade(t, a, b, f = 0.22) { return clamp(Math.min((t - a) / f + 1, (b - t) / f + 1)); }
function cross(ctx, x, y, r, k, col = C.coral) { // red ✗ drawn as strokes (no glyph fallback)
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.strokeStyle = col; ctx.lineWidth = r * 0.28; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-r, -r); ctx.lineTo(r, r); ctx.moveTo(r, -r); ctx.lineTo(-r, r); ctx.stroke(); ctx.restore();
}
// ---------------------------------------------------------------- captions (top), word by word
function captions(ctx, t) {
  const L = TIMING.lines; const li = L.findIndex((l, i) => t >= l.t0 - 0.05 && t < (L[i + 1] ? L[i + 1].t0 - 0.05 : END)); if (li < 0) return;
  if (li === 0 || li === 6) return; // hook + end card carry their own words
  const all = L[li].words, ws = all.filter((w) => t >= w.t - 0.03); if (!ws.length) return;
  const start = Math.floor((ws.length - 1) / 3) * 3, chunk = all.slice(start, start + 3), shown = ws.slice(start);
  let size = 84; const gap = 22;
  const meas = (sz) => { ctx.font = font(sz, 800, D); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 20) { size = Math.floor(size * (s.w - 20) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 90;
  shown.forEach((w, i) => { const k = sp(t, w.t - 0.03, SPRING.bouncy), sc = Math.min(1.1, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.2; ctx.strokeStyle = C.navy; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.gold : C.white; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}

const fmtB = (v) => `$${v.toFixed(2)}B`;
// ---------------------------------------------------------------- persistent world: sunset band + night skyline
function city(ctx, t) {
  ctx.save();
  const g = ctx.createLinearGradient(0, GROUND - 420, 0, GROUND); g.addColorStop(0, 'rgba(255,111,94,0)'); g.addColorStop(0.7, 'rgba(255,111,94,0.18)'); g.addColorStop(1, 'rgba(255,196,71,0.32)');
  ctx.fillStyle = g; ctx.fillRect(0, GROUND - 420, W, 420);
  // sun half-disc with stripes
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, GROUND); ctx.clip();
  ctx.fillStyle = 'rgba(255,196,71,0.35)'; ctx.beginPath(); ctx.arc(W * 0.3, GROUND, 170, Math.PI, 0); ctx.fill();
  ctx.fillStyle = C.navy2; for (let i = 0; i < 5; i++) ctx.fillRect(W * 0.3 - 180, GROUND - 30 - i * 30, 360, 6 + i);
  ctx.restore();
  // buildings
  let x = -20, i = 0;
  while (x < W + 20) { const bw = 70 + hash01(i, 7) * 90, bh = 120 + hash01(i, 8) * 300; const y = GROUND - bh;
    ctx.fillStyle = i % 2 ? '#070B22' : '#0B1130'; ctx.fillRect(x, y, bw, bh); ctx.strokeStyle = C.navy3; ctx.lineWidth = 2; ctx.strokeRect(x, y, bw, bh);
    for (let r = 0; r < Math.floor(bh / 34) - 1; r++) for (let c = 0; c < Math.floor(bw / 26) - 1; c++) {
      const on = hash01(i * 97 + r * 13 + c, 3 + Math.floor(t * 0.7 + hash01(i, r) * 4)) > 0.62; if (!on) continue;
      ctx.fillStyle = hash01(i + c, r) > 0.8 ? C.coral : C.gold; ctx.globalAlpha = 0.55; ctx.fillRect(x + 14 + c * 26, y + 18 + r * 34, 10, 14); }
    ctx.globalAlpha = 1; x += bw + 6; i++; }
  // two palm silhouettes
  for (const [px, sc] of [[110, 1], [W - 150, 0.85]]) { ctx.save(); ctx.translate(px, GROUND); ctx.scale(sc, sc); ctx.fillStyle = C.ink;
    ctx.beginPath(); ctx.moveTo(-8, 0); ctx.quadraticCurveTo(10, -150, 0, -300); ctx.lineTo(10, -300); ctx.quadraticCurveTo(22, -150, 8, 0); ctx.fill();
    for (let k = 0; k < 6; k++) { const q = -Math.PI + k * Math.PI / 5 + Math.sin(t * 1.3 + k) * 0.04; ctx.save(); ctx.translate(5, -300); ctx.rotate(q);
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(70, -26, 130, 18); ctx.quadraticCurveTo(70, -6, 0, 8); ctx.fill(); ctx.restore(); }
    ctx.restore(); }
  ctx.fillStyle = '#05081C'; ctx.fillRect(0, GROUND, W, H - GROUND);
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, GROUND); ctx.lineTo(W, GROUND); ctx.stroke();
  ctx.restore();
}
// DAY ONE meter: 24-hour ring + running $ estimate (progress counter)
function meter(ctx, t) {
  const y = s.y + s.h - 70, k = sp(t, S.B, SPRING.gentle); if (t < S.B) return;
  ctx.save(); ctx.globalAlpha = clamp(k); ctx.translate(0, (1 - k) * 60);
  ctx.fillStyle = 'rgba(6,9,30,0.88)'; M.rrect(ctx, s.x + 10, y - 62, s.w - 20, 124, 26); ctx.fill();
  ctx.lineWidth = 3; ctx.strokeStyle = C.line; ctx.stroke();
  const p = clamp((t - S.B) / (S.G - 0.3 - S.B));
  // 24h ring
  const rx = s.x + 80; ctx.lineWidth = 10; ctx.strokeStyle = C.navy3; ctx.beginPath(); ctx.arc(rx, y, 36, 0, TAU); ctx.stroke();
  ctx.strokeStyle = C.gold; ctx.beginPath(); ctx.arc(rx, y, 36, -Math.PI / 2, -Math.PI / 2 + TAU * p); ctx.stroke();
  text(ctx, `${Math.min(24, Math.floor(p * 24 + 1e-6))}h`, rx, y + 10, font(26, 800, UI), C.white, 'center');
  text(ctx, 'DAY ONE', s.x + 140, y - 10, font(32, 800, UI), C.gold, 'left');
  text(ctx, 'estimate · Sensor Tower', s.x + 140, y + 30, font(26, 700, UI), C.dim, 'left');
  big(ctx, fmtB(2.36 * E.outCubic(p)), s.x + s.w - 50, y + 30, 80, C.gold, 1, { align: 'right' });
  ctx.restore();
}
function controller(ctx, x, y, sc, k, t) { // generic gamepad, line art
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc * k, sc * k); ctx.rotate(Math.sin(t * 2) * 0.04);
  ctx.fillStyle = C.ink; ctx.strokeStyle = C.white; ctx.lineWidth = 6; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-120, -40); ctx.quadraticCurveTo(0, -70, 120, -40); ctx.quadraticCurveTo(175, 20, 150, 90); ctx.quadraticCurveTo(120, 120, 80, 60);
  ctx.lineTo(-80, 60); ctx.quadraticCurveTo(-120, 120, -150, 90); ctx.quadraticCurveTo(-175, 20, -120, -40); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.white; ctx.fillRect(-98, -6, 50, 14); ctx.fillRect(-80, -24, 14, 50);
  const cols = [C.gold, C.coral, C.green, C.line]; [[80, -22], [104, 0], [80, 22], [56, 0]].forEach(([bx, by], i) => { ctx.fillStyle = cols[i];
    const pr = 1 - 0.25 * Math.max(0, Math.sin(t * 6 - i * 1.5)); ctx.beginPath(); ctx.arc(bx, by, 11 * pr, 0, TAU); ctx.fill(); });
  ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(-34, 34, 16, 0, TAU); ctx.arc(34, 34, 16, 0, TAU); ctx.stroke();
  ctx.restore();
}
function gameCase(ctx, x, y, sc, k, label, col = C.gold) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc * k, sc * k);
  ctx.fillStyle = C.navy3; M.rrect(ctx, -40, -56, 80, 112, 8); ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.stroke();
  ctx.fillStyle = col; M.rrect(ctx, -32, -44, 64, 64, 6); ctx.fill();
  ctx.font = font(30, 800, D); ctx.textAlign = 'center'; ctx.fillStyle = C.navy; ctx.fillText(label, 0, -2);
  ctx.fillStyle = C.white; ctx.fillRect(-28, 32, 56, 6); ctx.restore();
}
function stamp(ctx, str, x, y, size, k, col = C.coral, rot = -0.12) {
  if (k <= 0) return; const sc = 1 + 0.6 * (1 - clamp(k)); ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha *= clamp(k);
  ctx.font = font(size, 800, D); const w = ctx.measureText(str).width + size * 0.8, h = size * 1.4;
  ctx.strokeStyle = col; ctx.lineWidth = size * 0.1; M.rrect(ctx, -w / 2, -h / 2, w, h, 14); ctx.stroke();
  ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.fillText(str, 0, size * 0.36); ctx.restore();
}

// ---------------------------------------------------------------- A: hook — $2.36 billion in one day
function sHook(ctx, t) {
  tag(ctx, 'GTA VI · LAUNCH DAY', cx, s.y + 150, 52, 1, { rot: -0.02 });
  const k = Math.max(0.92, pop(t, -0.4));
  const v = 2.36;
  big(ctx, `$${v.toFixed(2)}`, cx, s.y + 520, 300, C.gold, k, { rot: -0.03 });
  big(ctx, 'BILLION', cx, s.y + 690, 150, C.white, Math.max(0.92, pop(t, T('billion') - 0.1)), { rot: -0.03 });
  // 24h clock fills
  const kc = pop(t, T('one') - 0.2), cy = s.y + 950;
  if (kc > 0) { ctx.save(); ctx.translate(cx - 230, cy); ctx.scale(kc, kc); ctx.lineWidth = 16; ctx.strokeStyle = C.navy3; ctx.beginPath(); ctx.arc(0, 0, 70, 0, TAU); ctx.stroke();
    ctx.strokeStyle = C.coral; ctx.beginPath(); ctx.arc(0, 0, 70, -Math.PI / 2, -Math.PI / 2 + TAU * E.inOutCubic(prog(t, T('one') - 0.1, T('day.') + 0.4))); ctx.stroke(); ctx.restore(); }
  big(ctx, 'IN ONE DAY', cx + 70, cy + 30, 110, C.coral, kc, { rot: 0.02 });
  // coins bursting
  for (let i = 0; i < 14; i++) { const t0 = 0.15 + i * 0.12, q = prog(t, t0, t0 + 1.2); if (q <= 0 || q >= 1) continue;
    const ang = -Math.PI / 2 + (hash01(i, 9) - 0.5) * 2.4, r = 600 * E.outCubic(q), x = cx + Math.cos(ang) * r, y = s.y + 520 + Math.sin(ang) * r * 0.7 + 600 * q * q;
    ctx.save(); ctx.globalAlpha = 1 - q; ctx.fillStyle = C.gold; ctx.beginPath(); ctx.ellipse(x, y, 22 * Math.abs(Math.cos(t * 8 + i)), 22, 0, 0, TAU); ctx.fill(); ctx.restore(); }
}
// ---------------------------------------------------------------- B: GTA VI, launch day, one estimate
function sGame(ctx, t) {
  const t0 = S.B, a = sceneFade(t, t0 + 0.1, S.C);
  ctx.save(); ctx.globalAlpha = a;
  controller(ctx, cx, s.y + 480, 1.7, pop(t, t0 + 0.05), t);
  big(ctx, 'GTA VI', cx, s.y + 300, 170, C.white, pop(t, T('GTA VI') - 0.1), { rot: -0.03 });
  tag(ctx, 'OUT 19 NOV 2026', cx, s.y + 720, 46, pop(t, T('launch') - 0.1), { bg: C.white, rot: 0.02 });
  stamp(ctx, 'ESTIMATE', cx, s.y + 900, 90, pop(t, T('estimate.') - 0.08));
  ctx.restore();
}
// ---------------------------------------------------------------- C: copies — ~24.6M, 3 in 4 on PlayStation
function sCopies(ctx, t) {
  const t0 = S.C, a = sceneFade(t, t0 + 0.1, S.D);
  ctx.save(); ctx.globalAlpha = a;
  tag(ctx, 'SENSOR TOWER ESTIMATE', cx, s.y + 196, 44, pop(t, T('Sensor') - 0.1), { bg: C.gold, rot: -0.02 });
  // a wall of game cases filling, 4 per row; 3 of 4 gold (PlayStation), 1 blue (Xbox)
  const cols = 8, rows = 4, gw = 108, gh = 128, x0 = cx - (cols - 1) * gw / 2, y0 = s.y + 320;
  const span = T('copies,') - t0;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const i = r * cols + c;
    const k = sp(t, t0 + 0.2 + (i / (rows * cols)) * span, SPRING.bouncy); if (k <= 0) continue;
    const ps = (c % 4) !== 3, show = t > T('three') - 0.1;
    gameCase(ctx, x0 + c * gw, y0 + r * gh, 0.95, Math.min(1.05, k), 'VI', show ? (ps ? C.gold : C.line) : C.gold);
  }
  const n = Math.round(lerp(0, 24.6, E.outCubic(prog(t, T('24½') - 0.4, T('copies,') + 0.2))) * 10) / 10;
  big(ctx, `${n.toFixed(1)}M`, cx, s.y + 880, 170, C.gold, pop(t, T('24½') - 0.2));
  text(ctx, 'COPIES · LAUNCH DAY', cx, s.y + 945, font(42, 800, UI), C.white, 'center');
  // split bar 75 / 25
  const kb = pop(t, T('three') - 0.1);
  if (kb > 0) { const bx = s.x + 60, bw = s.w - 120, by = s.y + 990, f = E.outCubic(prog(t, T('three') - 0.1, T('PlayStation.') + 0.2));
    ctx.save(); ctx.globalAlpha = a * clamp(kb);
    ctx.fillStyle = C.line; M.rrect(ctx, bx, by, bw, 34, 17); ctx.fill(); ctx.fillStyle = C.gold; M.rrect(ctx, bx, by, bw * 0.75 * f, 34, 17); ctx.fill();
    text(ctx, '3 IN 4 · PLAYSTATION', bx, by + 82, font(38, 800, UI), C.gold, 'left'); text(ctx, 'XBOX', bx + bw, by + 82, font(38, 800, UI), C.line, 'right');
    ctx.restore(); }
  ctx.restore();
}
// ---------------------------------------------------------------- D+E: growing graph — 2013 vs 2026, nearly 3×
function sGraph(ctx, t) {
  const t0 = S.D, a = sceneFade(t, t0 + 0.1, S.F);
  ctx.save(); ctx.globalAlpha = a;
  big(ctx, 'FIRST DAY', cx, s.y + 300, 110, C.white, pop(t, t0 + 0.05));
  const base = s.y + 960, maxH = 470, bw = 260, x1 = cx - 190, x2 = cx + 190;
  ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(s.x + 60, base); ctx.lineTo(s.x + s.w - 60, base); ctx.stroke();
  // 2013 bar: $0.82B (Guinness $815.7M)
  const f1 = E.outCubic(prog(t, T('800') - 0.3, T('first') + 0.2)), h1 = maxH * 0.8157 / 2.36 * f1;
  if (t > T('2013,') - 0.2) { ctx.fillStyle = C.line; M.rrect(ctx, x1 - bw / 2, base - h1, bw, h1, 14); ctx.fill();
    text(ctx, 'GTA V · 2013', x1, base + 60, font(36, 800, UI), C.line, 'center');
    if (f1 > 0) big(ctx, `$${Math.round(815.7 * f1)}M`, x1, base - h1 - 30, 76, C.white, pop(t, T('800') - 0.2)); }
  // 2026 bar: $2.36B estimate
  const f2 = E.outCubic(prog(t, S.E + 0.1, T('times') + 0.2)), h2 = maxH * f2;
  if (t > S.E - 0.1) { ctx.fillStyle = C.gold; M.rrect(ctx, x2 - bw / 2, base - h2, bw, h2, 14); ctx.fill();
    text(ctx, 'GTA VI · 2026 (est.)', x2, base + 60, font(36, 800, UI), C.gold, 'center');
    big(ctx, fmtB(2.36 * f2), x2, base - h2 - 30, 76, C.gold, pop(t, S.E + 0.05)); }
  stamp(ctx, 'NEARLY 3×', x1, s.y + 560, 80, pop(t, T('times') - 0.1), C.coral, -0.1);
  ctx.restore();
}
// ---------------------------------------------------------------- F: still an estimate
function sEstimate(ctx, t) {
  const t0 = S.F, a = sceneFade(t, t0 + 0.1, S.G - 0.15, 0.15);
  ctx.save(); ctx.globalAlpha = a;
  stamp(ctx, 'ESTIMATE', cx, s.y + 380, 150, pop(t, S.F + 0.1), C.gold, -0.06);
  text(ctx, 'Sensor Tower · PS5 + Xbox · incl. pre-orders', cx, s.y + 560, font(36, 700, UI), C.line, 'center');
  // official numbers: loading dots
  const ko = pop(t, T('Rockstar') - 0.15);
  if (ko > 0) { ctx.save(); ctx.translate(cx, s.y + 800); ctx.scale(ko, ko);
    ctx.fillStyle = 'rgba(6,9,30,0.9)'; M.rrect(ctx, -400, -110, 800, 220, 28); ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.stroke();
    text(ctx, 'OFFICIAL SALES', 0, -24, font(64, 800, D), C.white, 'center');
    for (let i = 0; i < 3; i++) { ctx.globalAlpha = 0.3 + 0.7 * Math.max(0, Math.sin(t * 6 - i * 0.9)); ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(-50 + i * 50, 56, 14, 0, TAU); ctx.fill(); }
    ctx.restore(); }
  tag(ctx, 'NOT PUBLISHED YET', cx, s.y + 1000, 46, pop(t, T('official') - 0.1), { bg: C.coral, fg: C.white, rot: -0.02 });
  ctx.restore();
}
// ---------------------------------------------------------------- G: end card
function sEnd(ctx, t) {
  const t0 = S.G, a = clamp((t - t0 - 0.05) / 0.2);
  ctx.save(); ctx.globalAlpha = a;
  big(ctx, '$2.36B · DAY ONE', cx, s.y + 330, 96, C.gold, pop(t, t0 - 0.05));
  big(ctx, 'WHYVERSE', cx, s.y + 560, 128, C.white, 1);
  const kL = pop(t, T('Like') - 0.05), kF = pop(t, T('follow') - 0.05);
  if (kL > 0) { ctx.save(); ctx.translate(cx - 205, s.y + 760); ctx.scale(kL, kL);
    ctx.fillStyle = C.white; M.rrect(ctx, -180, -66, 360, 132, 30); ctx.fill();
    const hb = 1 + 0.14 * Math.max(0, Math.sin((t - T('Like')) * 9)) * Math.exp(-(t - T('Like')) * 2);
    ctx.save(); ctx.translate(-95, 4); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 28); ctx.bezierCurveTo(-56, -10, -38, -56, 0, -30); ctx.bezierCurveTo(38, -56, 56, -10, 0, 28);
    ctx.fillStyle = C.coral; ctx.fill(); ctx.restore();
    text(ctx, 'LIKE', 45, 22, font(60, 800, D), C.navy, 'center'); ctx.restore(); }
  if (kF > 0) { ctx.save(); ctx.translate(cx + 205, s.y + 760); ctx.scale(kF, kF);
    ctx.fillStyle = C.gold; M.rrect(ctx, -180, -66, 360, 132, 30); ctx.fill();
    ctx.save(); ctx.translate(-110, 4); ctx.lineWidth = 12; ctx.strokeStyle = C.navy; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-24, 0); ctx.lineTo(24, 0); ctx.moveTo(0, -24); ctx.lineTo(0, 24); ctx.stroke(); ctx.restore();
    text(ctx, 'FOLLOW', 40, 22, font(54, 800, D), C.navy, 'center'); ctx.restore(); }
  const kS = pop(t, T('more.') + 0.1);
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 960); ctx.scale(kS, kS);
    ctx.fillStyle = 'rgba(6,9,30,0.9)'; M.rrect(ctx, -420, -64, 840, 128, 24); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.line; ctx.stroke();
    ctx.save(); ctx.translate(-350, 0); ctx.fillStyle = C.white; ctx.fillRect(-34, -22, 68, 44); ctx.strokeStyle = C.navy; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-34, -22); ctx.lineTo(0, 6); ctx.lineTo(34, -22); ctx.stroke(); ctx.restore();
    text(ctx, 'Send this to the friend who', 40, -10, font(38, 800, UI), C.white, 'center');
    text(ctx, 'took the day off for GTA VI', 40, 38, font(38, 800, UI), C.gold, 'center');
    ctx.restore(); }
  ctx.restore();
}

const HITS = [
  [B(0.02), '$', 'thud'], [B(T('billion') - 0.1), 'billion', 'pop', { pitch: 'D4' }], [B(T('one') - 0.2), 'day', 'click'],
  [B(S.B), 'game', 'whoosh', { len: 0.4, from: 1600, to: 400 }], [B(T('GTA VI') - 0.1), 'title', 'pop', { pitch: 'A4' }], [B(T('estimate.') - 0.08), 'stamp', 'thud'],
  [B(S.C), 'copies', 'whoosh', { len: 0.4, from: 600, to: 1800 }], [B(T('24½') - 0.4), 'count', 'type', { len: 1.0, n: 12 }], [B(T('three') - 0.1), 'split', 'pop', { pitch: 'D5' }],
  [B(S.D), 'graph', 'whoosh', { len: 0.35, from: 1800, to: 600 }], [B(T('2013,') - 0.1), '2013', 'click'], [B(T('800') - 0.2), '800', 'pop', { pitch: 'F#4' }],
  [B(S.E), '2026', 'click'], [B(S.E + 0.3), 'grow', 'type', { len: 1.0, n: 10 }], [B(T('times') - 0.1), '3x', 'thud'],
  [B(S.F), 'est', 'whoosh', { len: 0.35, from: 2000, to: 600 }], [B(T('estimate.', 1) - 0.1), 'stamp', 'thud'], [B(T('Rockstar') - 0.15), 'official', 'blip', { pitch: 'D5' }],
  [B(S.G), 'end', 'whoosh', { len: 0.35, from: 600, to: 1600 }], [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop', { pitch: 'A5' }], [B(T('more.') + 0.1), 'send', 'click'],
];

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI)], samples: 6,
  hits: HITS,
  draw(ctx, u, t) {
    bg(ctx, t);
    const shift = (t0) => E.inOutCubic(prog(t, t0 - 0.2, t0 + 0.2));
    city(ctx, t);
    ctx.save(); ctx.translate(0, Math.sin(t * 0.3) * 5);
    if (t < S.B + 0.25) { ctx.save(); ctx.globalAlpha = 1 - shift(S.B); ctx.translate(-shift(S.B) * 300, 0); sHook(ctx, t); ctx.restore(); }
    if (t >= S.B - 0.2 && t < S.C + 0.25) sGame(ctx, t);
    if (t >= S.C - 0.2 && t < S.D + 0.25) sCopies(ctx, t);
    if (t >= S.D - 0.2 && t < S.F + 0.25) sGraph(ctx, t);
    if (t >= S.F - 0.2 && t < S.G + 0.25) sEstimate(ctx, t);
    if (t >= S.G - 0.05) sEnd(ctx, t);
    ctx.restore();
    if (t < S.G - 0.1) meter(ctx, t);
    captions(ctx, t);
  },
});
