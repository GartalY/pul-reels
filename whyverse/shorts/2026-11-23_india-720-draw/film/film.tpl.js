// "720 runs — and India still couldn't win" — Whyverse 23:00 London animated fact Short, 23 Nov 2026. Pure function of time.
// 1st Test NZ v India, Basin Reserve, Wellington: India 720/9 dec (22 Nov) = highest Test total ever in New Zealand, beating West Indies 660/5 (1995)
// as the touring record (ICC 22 Nov); Pant 128, Rahul 136; NZ 239/5 on day 5 → draw (France 24/AFP 23 Nov).
// Look: GROWING GRAPH + scoreboard on the Whyverse navy; persistent world = a floodlit cricket ground + bottom scoreboard.
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
const S = { A: 0, B: LN(1) - 0.1, C: LN(2) - 0.1, D: LN(3) - 0.1, G: LN(4) - 0.1 };
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
  if (li === 0 || li === 4) return; // hook + end card carry their own words
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



const GREEN = '#1F7A4D', GREEN2 = '#16583A', PITCH = '#D9C08A';
const cnt = (t, t0, t1, v) => Math.round(v * E.outCubic(prog(t, t0, t1)));
// ---------------------------------------------------------------- persistent world: floodlit ground at night
function ground(ctx, t) {
  ctx.save();
  // floodlight beams
  for (const [x, dir] of [[90, 1], [W - 90, -1]]) {
    const g = ctx.createLinearGradient(x, 300, x + dir * 300, GROUND); g.addColorStop(0, 'rgba(255,240,200,0.20)'); g.addColorStop(1, 'rgba(255,240,200,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - 20, 300); ctx.lineTo(x + 20, 300); ctx.lineTo(x + dir * 520, GROUND); ctx.lineTo(x + dir * 80, GROUND); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, 300); ctx.lineTo(x, GROUND - 120); ctx.stroke();
    ctx.fillStyle = '#FFF4D6'; M.rrect(ctx, x - 44, 270, 88, 40, 8); ctx.fill();
    ctx.globalAlpha = 0.35 + 0.1 * Math.sin(t * 3 + x); ctx.beginPath(); ctx.arc(x, 290, 70, 0, TAU); ctx.fill(); ctx.globalAlpha = 1;
  }
  // field
  const fy = GROUND - 120;
  ctx.fillStyle = GREEN2; ctx.beginPath(); ctx.ellipse(cx, H, W * 0.9, H - fy, 0, Math.PI, TAU); ctx.fill();
  ctx.fillStyle = GREEN; ctx.beginPath(); ctx.ellipse(cx, H, W * 0.75, H - fy - 40, 0, Math.PI, TAU); ctx.fill();
  // pitch strip in perspective + stumps
  ctx.fillStyle = PITCH; ctx.beginPath(); ctx.moveTo(cx - 40, fy + 30); ctx.lineTo(cx + 40, fy + 30); ctx.lineTo(cx + 120, H); ctx.lineTo(cx - 120, H); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = C.white; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx - 52, fy + 70); ctx.lineTo(cx + 52, fy + 70); ctx.stroke();
  ctx.fillStyle = C.white; for (const dx of [-14, 0, 14]) ctx.fillRect(cx + dx - 3, fy + 22, 6, 48);
  ctx.fillStyle = C.gold; ctx.fillRect(cx - 18, fy + 18, 36, 5);
  ctx.restore();
}
function ball(ctx, x, y, r, k, rot = 0) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(rot);
  ctx.fillStyle = '#C8323B'; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill(); ctx.lineWidth = r * 0.08; ctx.strokeStyle = C.white;
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.stroke();
  ctx.setLineDash([r * 0.12, r * 0.12]); ctx.beginPath(); ctx.moveTo(-r * 0.15, -r * 0.95); ctx.quadraticCurveTo(-r * 0.4, 0, -r * 0.15, r * 0.95);
  ctx.moveTo(r * 0.15, -r * 0.95); ctx.quadraticCurveTo(r * 0.4, 0, r * 0.15, r * 0.95); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
}
function bat(ctx, x, y, sc, k, rot) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc * k, sc * k); ctx.rotate(rot);
  ctx.lineWidth = 6; ctx.strokeStyle = C.white; ctx.lineJoin = 'round';
  ctx.fillStyle = '#E8C98A'; M.rrect(ctx, -32, -40, 64, 220, 20); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.navy3; M.rrect(ctx, -11, -140, 22, 104, 8); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.gold; for (let i = 0; i < 4; i++) ctx.fillRect(-11, -130 + i * 22, 22, 8);
  ctx.restore();
}
// ---------------------------------------------------------------- scoreboard (bottom, whole film)
function scoreboard(ctx, t) {
  const y = s.y + s.h - 70, k = sp(t, 0.3, SPRING.gentle);
  ctx.save(); ctx.globalAlpha = clamp(k); ctx.translate(0, (1 - k) * 60);
  ctx.fillStyle = 'rgba(4,6,22,0.94)'; M.rrect(ctx, s.x + 10, y - 66, s.w - 20, 132, 26); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.line; ctx.stroke();
  const ind = cnt(t, 0.0, 0.9, 720);
  text(ctx, 'IND', s.x + 44, y - 12, font(34, 800, UI), C.white, 'left');
  text(ctx, ind >= 720 ? '720/9 d' : `${ind}`, s.x + 44, y + 40, font(48, 800, D), C.gold, 'left');
  const tn = T('239/5'), nz = cnt(t, S.D + 0.4, tn + 0.1, 239);
  text(ctx, 'NZ', s.x + 330, y - 12, font(34, 800, UI), C.white, 'left');
  text(ctx, t < S.D + 0.3 ? '—' : nz >= 239 ? '239/5' : `${nz}/${Math.min(5, Math.floor(nz / 48))}`, s.x + 330, y + 40, font(48, 800, D), t < S.D + 0.3 ? C.dim : C.white, 'left');
  const dr = T('Draw.');
  text(ctx, 'RESULT', s.x + s.w - 44, y - 12, font(34, 800, UI), C.white, 'right');
  if (t < dr - 0.05) text(ctx, '?', s.x + s.w - 44, y + 40, font(48, 800, D), C.dim, 'right');
  else big(ctx, 'DRAW', s.x + s.w - 44, y + 42, 54, C.coral, Math.max(0.9, pop(t, dr - 0.05)), { align: 'right' });
  ctx.restore();
}
// ---------------------------------------------------------------- A: hook — 720
function sHook(ctx, t) {
  tag(ctx, 'NEW ZEALAND v INDIA · 1st TEST', cx, s.y + 150, 44, 1, { rot: -0.02 });
  big(ctx, '720', cx, s.y + 520, 400, C.gold, Math.max(0.94, pop(t, -0.4)), { rot: -0.05 });
  big(ctx, 'RUNS', cx, s.y + 680, 170, C.white, Math.max(0.94, pop(t, T('runs,') - 0.15)), { rot: -0.03 });
  big(ctx, '…AND INDIA', cx, s.y + 820, 100, C.white, pop(t, T('India') - 0.12));
  big(ctx, "STILL COULDN'T WIN", cx, s.y + 930, 90, C.coral, pop(t, T("couldn't") - 0.1), { rot: 0.02 });
  const bx = cx + 360, by = s.y + 260 + Math.sin(t * 4) * 10;
  ball(ctx, bx, by, 52, pop(t, 0.15), t * 3);
}
// ---------------------------------------------------------------- B: growing graph — highest Test totals in New Zealand
function sRecord(ctx, t) {
  const t0 = S.B, a = sceneFade(t, t0 + 0.1, S.C); ctx.save(); ctx.globalAlpha = a;
  big(ctx, 'HIGHEST TEST TOTALS', cx, s.y + 290, 80, C.white, pop(t, t0 + 0.05));
  big(ctx, 'EVER MADE IN NEW ZEALAND', cx, s.y + 375, 60, C.gold, pop(t, t0 + 0.2));
  const rows = [['INDIA', '2026', 720, '720/9', C.gold, T('720/9') - 0.1], ['WEST INDIES', '1995', 660, '660/5', C.line, T('720/9') + 0.35]];
  const x0 = s.x + 40, maxw = s.w - 120;
  rows.forEach(([who, yr, v, lab, col, ts], i) => { const y = s.y + 520 + i * 190, p = E.outCubic(prog(t, ts, ts + 1.1));
    if (t < ts - 0.1) return;
    text(ctx, who, x0, y - 20, font(44, 800, UI), C.white, 'left'); text(ctx, yr, x0 + maxw, y - 20, font(40, 800, UI), C.dim, 'right');
    ctx.fillStyle = 'rgba(255,255,255,0.08)'; M.rrect(ctx, x0, y, maxw, 84, 16); ctx.fill();
    const w = Math.max(30, maxw * (v / 760) * p); ctx.fillStyle = col; M.rrect(ctx, x0, y, w, 84, 16); ctx.fill();
    const shown = p >= 0.999 ? lab : `${Math.round(v * p)}`;
    text(ctx, shown, x0 + Math.max(w - 20, 200), y + 60, font(56, 800, D), C.navy, 'right'); });
  const kr = pop(t, T('biggest') - 0.1);
  tag(ctx, 'NEW RECORD', cx + 230, s.y + 470, 42, kr, { bg: C.coral, fg: C.white, rot: -0.06 });
  tag(ctx, 'BASIN RESERVE · WELLINGTON', cx, s.y + 990, 40, pop(t, T('Test') - 0.1), { bg: C.navy3, fg: C.white, rot: 0.01 });
  ctx.restore();
}
// ---------------------------------------------------------------- C: two hundreds
function sCenturies(ctx, t) {
  const t0 = S.C, a = sceneFade(t, t0 + 0.1, S.D); ctx.save(); ctx.globalAlpha = a;
  const push = E.outCubic(prog(t, t0, t0 + 0.35)); ctx.translate((1 - push) * 260, 0);
  const cards = [['RISHABH PANT', 128, T('Rishabh') - 0.1, -1], ['K.L. RAHUL', 136, T('K.L.') - 0.1, 1]];
  cards.forEach(([nm, v, ts, side], i) => { const k = pop(t, ts); if (k <= 0) return; const x = cx + side * 230, y = s.y + 640;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    ctx.fillStyle = 'rgba(4,6,22,0.92)'; M.rrect(ctx, -205, -300, 410, 600, 34); ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.stroke();
    bat(ctx, 0, -110, 0.9, 1, side * 0.35 + Math.sin(t * 2 + i) * 0.06);
    const n = cnt(t, ts + 0.1, ts + 1.0, v);
    big(ctx, `${n}`, 0, 170, 150, C.gold, 1);
    text(ctx, nm, 0, 250, font(40, 800, UI), C.white, 'center');
    ctx.restore(); });
  big(ctx, '2 HUNDREDS', cx, s.y + 1060, 110, C.white, pop(t, T('hundreds.') - 0.15), { rot: -0.03 });
  ctx.restore();
}
// ---------------------------------------------------------------- D: the twist — final day, draw
function sDraw(ctx, t) {
  const t0 = S.D, a = sceneFade(t, t0 + 0.1, S.G - 0.05, 0.15); ctx.save(); ctx.globalAlpha = a;
  big(ctx, 'FINAL DAY', cx, s.y + 300, 130, C.white, pop(t, T('final') - 0.12), { rot: -0.03 });
  tag(ctx, 'INDIA LED BY 352', cx, s.y + 410, 44, pop(t, t0 + 0.05), { bg: C.gold, rot: 0.02 });
  // clock of the day: sun arc running
  const p = prog(t, t0 + 0.2, T('239/5') + 0.3), ax = cx, ay = s.y + 760, R = 260;
  lineDraw(ctx, Array.from({ length: 41 }, (_, i) => [ax + R * Math.cos(Math.PI + Math.PI * i / 40), ay + R * Math.sin(Math.PI + Math.PI * i / 40)]), 1, C.dim, 4);
  lineDraw(ctx, Array.from({ length: 41 }, (_, i) => [ax + R * Math.cos(Math.PI + Math.PI * i / 40), ay + R * Math.sin(Math.PI + Math.PI * i / 40)]), p, C.gold, 8);
  const an = Math.PI + Math.PI * p; ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(ax + R * Math.cos(an), ay + R * Math.sin(an), 26, 0, TAU); ctx.fill();
  const nz = cnt(t, t0 + 0.4, T('239/5') + 0.1, 239);
  big(ctx, `NZ ${nz >= 239 ? '239/5' : nz}`, cx, ay - 30, 120, C.white, pop(t, t0 + 0.3));
  const kd = pop(t, T('Draw.') - 0.08);
  if (kd > 0) { ctx.save(); ctx.translate(cx, s.y + 990); ctx.rotate(-0.08); ctx.scale(kd * 1.0, kd * 1.0);
    ctx.strokeStyle = C.coral; ctx.lineWidth = 12; M.rrect(ctx, -270, -100, 540, 200, 24); ctx.stroke();
    big(ctx, 'DRAW', 0, 60, 170, C.coral, 1); ctx.restore(); }
  ctx.restore();
}
// ---------------------------------------------------------------- end card
function sEnd(ctx, t) {
  const t0 = S.G, a = clamp((t - t0 - 0.05) / 0.2);
  ctx.save(); ctx.globalAlpha = a;
  big(ctx, '720 RUNS · NO WIN', cx, s.y + 330, 90, C.gold, pop(t, t0 - 0.05));
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
    text(ctx, 'still calls draws boring', 40, 38, font(38, 800, UI), C.gold, 'center');
    ctx.restore(); }
  ctx.restore();
}
const HITS = [
  [B(0.02), '720', 'thud'], [B(T('runs,') - 0.15), 'runs', 'pop', { pitch: 'D4' }], [B(T("couldn't") - 0.1), 'cant', 'click'],
  [B(S.B), 'rec', 'whoosh', { len: 0.4, from: 1600, to: 400 }], [B(T('720/9') - 0.1), 'bar1', 'riser', { len: 0.8, anchor: 'start' }], [B(T('720/9') + 0.35), 'bar2', 'blip', { pitch: 'A4' }], [B(T('biggest') - 0.1), 'record', 'thud'],
  [B(S.C), 'cent', 'whoosh', { len: 0.35, from: 600, to: 1800 }], [B(T('Rishabh') - 0.1), 'pant', 'pop', { pitch: 'D5' }], [B(T('K.L.') - 0.1), 'rahul', 'pop', { pitch: 'F#5' }], [B(T('hundreds.') - 0.15), '2h', 'click'],
  [B(S.D), 'final', 'whoosh', { len: 0.35, from: 1800, to: 600 }], [B(T('239/5') + 0.1), 'nz', 'blip', { pitch: 'A5' }], [B(T('Draw.') - 0.08), 'draw', 'thud'],
  [B(S.G), 'end', 'whoosh', { len: 0.35, from: 600, to: 1600 }], [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop', { pitch: 'A5' }], [B(T('more.') + 0.1), 'send', 'click'],
];

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI)], samples: 6,
  hits: HITS,
  draw(ctx, u, t) {
    bg(ctx, t);
    const shift = (t0) => E.inOutCubic(prog(t, t0 - 0.2, t0 + 0.2));
    ground(ctx, t);
    ctx.save(); ctx.translate(0, Math.sin(t * 0.3) * 5);
    if (t < S.B + 0.25) { ctx.save(); ctx.globalAlpha = 1 - shift(S.B); ctx.translate(-shift(S.B) * 300, 0); sHook(ctx, t); ctx.restore(); }
    if (t >= S.B - 0.2 && t < S.C + 0.25) sRecord(ctx, t);
    if (t >= S.C - 0.2 && t < S.D + 0.25) sCenturies(ctx, t);
    if (t >= S.D - 0.2 && t < S.G + 0.25) sDraw(ctx, t);
    if (t >= S.G - 0.05) sEnd(ctx, t);
    ctx.restore();
    if (t < S.G - 0.1) scoreboard(ctx, t);
    captions(ctx, t);
  },
});
