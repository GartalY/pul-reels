// "35 minutes, no takeoffs" — Whyverse 23:00 London animated fact Short, 19 Nov 2026. Pure function of time.
// South Korea's Suneung (CSAT), Thu 19 Nov 2026: takeoffs banned nationwide 13:05–13:40 for the English listening test.
// Look: LINE ART + MAP-ROUTE feel on the Whyverse navy — thin self-drawing lines, gold accent, coral second.
// Persistent world: a line-art runway + control tower at the bottom and a FLIGHT BAN clock (13:05 → 13:40) as progress counter.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, hash01, clamp, TAU } = M;

const TIMING = __TIMING__;
const C = {
  navy: '#0A1030', navy2: '#141D4A', navy3: '#1E2A63', line: '#9DB2FF', white: '#F6F3EA', gold: '#FFC447', gold2: '#E9A21F',
  coral: '#FF6F5E', dim: '#5E6CA8', ink: '#04061A',
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
function plane(ctx, x, y, sc, rot = 0, col = C.white) { // top-down airliner silhouette
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.fillStyle = col; ctx.strokeStyle = C.navy; ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, -90); ctx.quadraticCurveTo(12, -80, 12, -50); ctx.lineTo(12, -10); ctx.lineTo(95, 20); ctx.lineTo(95, 34); ctx.lineTo(12, 18);
  ctx.lineTo(10, 62); ctx.lineTo(38, 80); ctx.lineTo(38, 90); ctx.lineTo(0, 82); ctx.lineTo(-38, 90); ctx.lineTo(-38, 80); ctx.lineTo(-10, 62);
  ctx.lineTo(-12, 18); ctx.lineTo(-95, 34); ctx.lineTo(-95, 20); ctx.lineTo(-12, -10); ctx.lineTo(-12, -50); ctx.quadraticCurveTo(-12, -80, 0, -90);
  ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
}
function sidePlane(ctx, x, y, sc, col = C.white) { // side-view airliner
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.fillStyle = col;
  ctx.beginPath(); ctx.moveTo(-120, -6); ctx.quadraticCurveTo(-120, -22, -96, -22); ctx.lineTo(90, -22); ctx.quadraticCurveTo(130, -20, 140, 0);
  ctx.quadraticCurveTo(130, 12, 90, 12); ctx.lineTo(-100, 12); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-96, -20); ctx.lineTo(-122, -66); ctx.lineTo(-100, -66); ctx.lineTo(-60, -20); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(-50, 34); ctx.lineTo(-30, 34); ctx.lineTo(30, 0); ctx.fill();
  ctx.fillStyle = C.navy3; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(-60 + i * 17, -9, 4, 0, TAU); ctx.fill(); }
  ctx.restore();
}

// ---------------------------------------------------------------- persistent world: runway + tower
function airport(ctx, t) {
  ctx.save();
  ctx.fillStyle = '#070B22'; ctx.fillRect(0, GROUND, W, H - GROUND);
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, GROUND); ctx.lineTo(W, GROUND); ctx.stroke();
  // runway dashes drawing on, scrolling slowly
  ctx.strokeStyle = C.dim; ctx.lineWidth = 6; ctx.setLineDash([60, 50]); ctx.lineDashOffset = -t * 20;
  ctx.beginPath(); ctx.moveTo(0, GROUND + 60); ctx.lineTo(W, GROUND + 60); ctx.stroke(); ctx.setLineDash([]);
  // control tower (line art) on the right
  const tx = W - 170, ty = GROUND;
  ctx.fillStyle = C.ink; ctx.strokeStyle = C.line; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(tx - 22, ty); ctx.lineTo(tx - 16, ty - 190); ctx.lineTo(tx + 16, ty - 190); ctx.lineTo(tx + 22, ty); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(tx - 60, ty - 190); ctx.lineTo(tx + 60, ty - 190); ctx.lineTo(tx + 48, ty - 250); ctx.lineTo(tx - 48, ty - 250); ctx.closePath(); ctx.fill(); ctx.stroke();
  // tower window light: red while the ban runs, green after
  const banOn = t < S.G - 0.1; ctx.fillStyle = banOn ? C.coral : '#7CE0A3';
  ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 5); ctx.fillRect(tx - 36, ty - 236, 72, 24); ctx.globalAlpha = 1;
  ctx.fillStyle = C.ink; ctx.fillRect(tx - 4, ty - 280, 8, 30); ctx.fillStyle = banOn ? C.coral : '#7CE0A3';
  ctx.beginPath(); ctx.arc(tx, ty - 284, 8, 0, TAU); ctx.fill();
  ctx.restore();
}
// FLIGHT BAN clock: 13:05 → 13:40 across the film (progress counter)
function meter(ctx, t) {
  const y = s.y + s.h - 70, k = sp(t, S.B, SPRING.gentle); if (t < S.B) return;
  ctx.save(); ctx.globalAlpha = clamp(k); ctx.translate(0, (1 - k) * 60);
  ctx.fillStyle = 'rgba(6,9,30,0.86)'; M.rrect(ctx, s.x + 10, y - 62, s.w - 20, 124, 26); ctx.fill();
  ctx.lineWidth = 3; ctx.strokeStyle = C.line; ctx.stroke();
  text(ctx, 'NO TAKEOFFS', s.x + 50, y - 12, font(32, 800, UI), C.coral, 'left');
  text(ctx, 'Korea time · 19 Nov', s.x + 50, y + 30, font(28, 700, UI), C.dim, 'left');
  const p = clamp(t / (S.G - 0.3)), mins = Math.min(35, Math.floor(p * 35 + 1e-6));
  const mm = 5 + mins, clock = `13:${String(mm).padStart(2, '0')}`;
  big(ctx, clock, s.x + s.w - 60, y + 32, 88, C.gold, 1, { align: 'right' });
  // progress bar
  const bx = s.x + 380, bw = s.w - 700; ctx.fillStyle = C.navy3; M.rrect(ctx, bx, y - 8, bw, 16, 8); ctx.fill();
  ctx.fillStyle = C.coral; M.rrect(ctx, bx, y - 8, Math.max(16, bw * p), 16, 8); ctx.fill();
  ctx.restore();
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

// ---------------------------------------------------------------- A: hook — 35 minutes, no plane took off
function sHook(ctx, t) {
  tag(ctx, 'SOUTH KOREA · FLIGHT BAN', cx, s.y + 150, 52, 1, { rot: -0.02 });
  const k = Math.max(0.92, pop(t, -0.4));
  big(ctx, '35', cx - 150, s.y + 560, 380, C.gold, k, { rot: -0.03 });
  big(ctx, 'MIN', cx + 230, s.y + 540, 150, C.white, k, { rot: -0.03 });
  // plane on the runway: rolls, tries to lift, brakes; a ✗ stamps over it
  const roll = E.outCubic(prog(t, 0.0, 1.6)), px = lerp(s.x + 60, cx + 40, roll);
  const lift = Math.sin(clamp((t - 0.6) / 0.9) * Math.PI) * 16;
  sidePlane(ctx, px, GROUND - 40 - lift, 1.5, C.white);
  const kx = pop(t, T('Not') - 0.05); cross(ctx, px + 20, GROUND - 120, 95, kx);
  big(ctx, 'NO TAKEOFFS', cx, s.y + 760, 120, C.coral, Math.max(0.92, pop(t, -0.4)), { rot: 0.02 });
  const kc = pop(t, T('Korea.') - 0.05);
  big(ctx, 'ACROSS THE COUNTRY', cx, s.y + 890, 76, C.white, kc);
}
// ---------------------------------------------------------------- B: the reason — an English listening test
function sReason(ctx, t) {
  const t0 = S.B, a = sceneFade(t, t0 + 0.1, S.C);
  ctx.save(); ctx.globalAlpha = a;
  const kq = pop(t, t0 + 0.05); big(ctx, 'WHY?', cx, s.y + 360, 200, C.gold, kq * (1 - 0.15 * clamp((t - T('An')) * 3)));
  // headphones (line art) drawing on
  const hx = cx, hy = s.y + 700, p = prog(t, T('An') - 0.15, T('listening') + 0.2);
  const arc = []; for (let i = 0; i <= 40; i++) { const q = Math.PI + i / 40 * Math.PI; arc.push([hx + Math.cos(q) * 170, hy + Math.sin(q) * 170]); }
  lineDraw(ctx, arc, p, C.white, 16);
  const kc = pop(t, T('listening') - 0.1);
  for (const sx of [-1, 1]) { ctx.save(); ctx.translate(hx + sx * 170, hy + 20); ctx.scale(kc, kc); ctx.fillStyle = C.gold; M.rrect(ctx, -40, -60, 80, 130, 26); ctx.fill(); ctx.restore(); }
  // sound waves
  for (let i = 0; i < 3; i++) { const r = 40 + i * 40, al = clamp(kc) * (0.5 + 0.5 * Math.sin(t * 8 - i));
    ctx.save(); ctx.globalAlpha = a * al; ctx.strokeStyle = C.line; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(hx, hy + 20, r, -0.6, 0.6); ctx.stroke();
    ctx.beginPath(); ctx.arc(hx, hy + 20, r, Math.PI - 0.6, Math.PI + 0.6); ctx.stroke(); ctx.restore(); }
  tag(ctx, 'ENGLISH LISTENING TEST', cx, s.y + 980, 50, pop(t, T('English') - 0.05), { bg: C.white, rot: -0.02 });
  ctx.restore();
}
// ---------------------------------------------------------------- C: exam hall — 550,000+ students, the Suneung
function sHall(ctx, t) {
  const t0 = S.C, a = sceneFade(t, t0 + 0.1, S.D);
  ctx.save(); ctx.globalAlpha = a;
  tag(ctx, 'SUNEUNG · 19 NOVEMBER', cx, s.y + 260, 46, pop(t, T('Thursday,') - 0.1), { bg: C.gold, rot: -0.02 });
  // grid of desks + student silhouettes filling in, row by row
  const cols = 9, rows = 5, gw = 96, gh = 92, x0 = cx - (cols - 1) * gw / 2, y0 = s.y + 360;
  const fillP = prog(t, T('550,000+') - 0.3, T('Suneung,') + 0.2);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const i = r * cols + c, k = sp(t, t0 + 0.2 + (i / (rows * cols)) * (T('Suneung,') - t0 - 0.2) * 0.9, SPRING.bouncy);
    if (k <= 0) continue; const x = x0 + c * gw, y = y0 + r * gh;
    ctx.save(); ctx.translate(x, y); ctx.scale(Math.min(1.05, k), Math.min(1.05, k));
    ctx.fillStyle = C.ink; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(0, -22, 13, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-20, 10); ctx.quadraticCurveTo(0, -12, 20, 10); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.navy3; ctx.fillRect(-34, 10, 68, 16); ctx.fillStyle = (i + Math.floor(t * 2)) % 7 === 0 ? C.gold : C.white; ctx.fillRect(-14, 12, 22, 10);
    ctx.restore();
  }
  const n = Math.round(lerp(0, 551864, E.outCubic(fillP)));
  big(ctx, n.toLocaleString('en-US'), cx, s.y + 920, 170, C.gold, pop(t, T('550,000+') - 0.15));
  text(ctx, 'STUDENTS · ONE EXAM', cx, s.y + 990, font(44, 800, UI), C.white, 'center');
  tag(ctx, '8:40 AM → 5:45 PM', cx, s.y + 1070, 38, pop(t, T('university.') - 0.2), { bg: C.navy3, fg: C.line, rot: 0.02 });
  ctx.restore();
}
// ---------------------------------------------------------------- D: departure board — 130 flights moved, drones banned
function sBoard(ctx, t) {
  const t0 = S.D, a = sceneFade(t, t0 + 0.1, S.E);
  ctx.save(); ctx.globalAlpha = a;
  const bx = s.x + 40, by = s.y + 240, bw = s.w - 80, rh = 74;
  ctx.fillStyle = 'rgba(4,6,26,0.92)'; M.rrect(ctx, bx, by, bw, rh * 6 + 30, 20); ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.stroke();
  text(ctx, 'DEPARTURES', bx + 30, by + 52, font(34, 800, UI), C.line, 'left');
  const rows = [['KE 0xx', 'NEW YORK'], ['OZ 1xx', 'TOKYO'], ['7C 2xx', 'JEJU'], ['KE 9xx', 'PARIS'], ['LJ 3xx', 'BUSAN']];
  rows.forEach((r, i) => {
    const y = by + 70 + (i + 1) * rh - 12, kr = clamp((t - t0 - 0.15 - i * 0.12) * 4);
    if (kr <= 0) return;
    ctx.save(); ctx.globalAlpha = a * kr;
    text(ctx, r[1], bx + 30, y, font(40, 800, UI), C.white, 'left');
    const flip = T('moved,') - 0.6 + i * 0.12, done = t > flip;
    const st = done ? 'RESCHEDULED' : (t > flip - 0.35 ? String.fromCharCode(65 + Math.floor(hash01(i, Math.floor(t * 30)) * 26)).repeat(6) : 'ON TIME');
    text(ctx, st, bx + bw - 30, y, font(40, 800, UI), done ? C.coral : '#7CE0A3', 'right');
    ctx.restore();
  });
  const k130 = pop(t, T('130') - 0.1), n = Math.round(lerp(0, 130, E.outCubic(prog(t, T('130') - 0.2, T('moved,') + 0.2))));
  big(ctx, `${n}`, cx - 140, s.y + 850, 200, C.gold, k130);
  text(ctx, 'FLIGHTS MOVED', cx + 120, s.y + 790, font(44, 800, UI), C.white, 'left');
  text(ctx, '81 intl · 49 domestic', cx + 120, s.y + 845, font(36, 700, UI), C.line, 'left');
  // drone with a red cross
  const kd = pop(t, T('drones') - 0.1);
  if (kd > 0) { const dx = s.x + 120, dy = s.y + 1010 + Math.sin(t * 6) * 6; ctx.save(); ctx.translate(dx, dy); ctx.scale(kd, kd);
    ctx.strokeStyle = C.white; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-50, -20); ctx.lineTo(50, 20); ctx.moveTo(50, -20); ctx.lineTo(-50, 20); ctx.stroke();
    ctx.fillStyle = C.white; M.rrect(ctx, -18, -12, 36, 24, 6); ctx.fill();
    for (const [px, py] of [[-50, -20], [50, -20], [-50, 20], [50, 20]]) { ctx.beginPath(); ctx.ellipse(px, py, 26 * Math.abs(Math.cos(t * 40 + px)), 5, 0, 0, TAU); ctx.fill(); }
    ctx.restore(); cross(ctx, dx, dy, 60, pop(t, T('banned') - 0.05)); }
  tag(ctx, 'DRONES BANNED NATIONWIDE', cx + 90, s.y + 1015, 36, pop(t, T('banned') + 0.05), { bg: C.coral, fg: C.white, rot: -0.02 });
  ctx.restore();
}
// ---------------------------------------------------------------- E: the whole country adjusts — office clock, trains, artillery
function sCountry(ctx, t) {
  const t0 = S.E, a = sceneFade(t, t0 + 0.1, S.F);
  ctx.save(); ctx.globalAlpha = a;
  const items = [
    { w: 'Offices', y: s.y + 330, label: 'OFFICES START LATE', sub: 'asked to open after 10 a.m.' },
    { w: 'trains', y: s.y + 590, label: 'EXTRA TRAINS', sub: 'more rush-hour subways' },
    { w: 'artillery', y: s.y + 850, label: 'ARTILLERY: ON HOLD', sub: 'the army goes quiet' },
  ];
  items.forEach((it, i) => {
    const k = pop(t, T(it.w) - 0.15); if (k <= 0) return;
    const ix = s.x + 150, iy = it.y;
    ctx.save(); ctx.translate(ix, iy); ctx.scale(k, k);
    ctx.fillStyle = C.navy3; ctx.beginPath(); ctx.arc(0, 0, 95, 0, TAU); ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.stroke();
    ctx.strokeStyle = C.white; ctx.fillStyle = C.white; ctx.lineWidth = 7; ctx.lineCap = 'round';
    if (i === 0) { // clock moving to 10
      ctx.beginPath(); ctx.arc(0, 0, 58, 0, TAU); ctx.stroke();
      const q = lerp(-Math.PI * 0.75, -Math.PI / 3, E.inOutCubic(prog(t, T(it.w), T(it.w) + 0.9)));
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(q) * 32, Math.sin(q) * 32); ctx.stroke();
      ctx.strokeStyle = C.gold; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -46); ctx.stroke();
    } else if (i === 1) { // train front
      M.rrect(ctx, -46, -56, 92, 100, 20); ctx.fill(); ctx.fillStyle = C.navy3; M.rrect(ctx, -34, -42, 68, 40, 8); ctx.fill();
      ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(-24, 22, 8, 0, TAU); ctx.arc(24, 22, 8, 0, TAU); ctx.fill();
      ctx.strokeStyle = C.line; ctx.beginPath(); ctx.moveTo(-40, 60); ctx.lineTo(-56, 80); ctx.moveTo(40, 60); ctx.lineTo(56, 80); ctx.stroke();
    } else { // cannon silhouette
      ctx.save(); ctx.rotate(-0.4); M.rrect(ctx, -10, -14, 100, 28, 10); ctx.fill(); ctx.restore();
      ctx.beginPath(); ctx.arc(-14, 22, 30, 0, TAU); ctx.fill(); ctx.fillStyle = C.navy3; ctx.beginPath(); ctx.arc(-14, 22, 10, 0, TAU); ctx.fill();
    }
    ctx.restore();
    if (i === 2) cross(ctx, ix + 60, iy - 60, 34, pop(t, T('hold.') - 0.1));
    ctx.save(); ctx.globalAlpha = a * clamp(k);
    const sl = (1 - clamp(k)) * 80;
    text(ctx, it.label, ix + 140 + sl, iy - 6, font(54, 800, D), i === 2 ? C.coral : C.gold, 'left');
    text(ctx, it.sub, ix + 140 + sl, iy + 46, font(36, 700, UI), C.line, 'left');
    ctx.restore();
  });
  ctx.restore();
}
// ---------------------------------------------------------------- F: a whole nation, silent
function sSilent(ctx, t) {
  const t0 = S.F, a = sceneFade(t, t0 + 0.1, S.G - 0.15, 0.15);
  ctx.save(); ctx.globalAlpha = a;
  // a waveform flattening to a line (silence)
  const flat = E.inOutCubic(prog(t, t0 + 0.1, T('silent,') + 0.3)), y = s.y + 520;
  ctx.strokeStyle = C.line; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath();
  for (let x = s.x + 40; x <= s.x + s.w - 40; x += 8) { const amp = (1 - flat) * 120 * (0.5 + 0.5 * hash01(Math.floor(x / 8), 4));
    const yy = y + Math.sin(x * 0.07 + t * 9) * amp; x === s.x + 40 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); }
  ctx.stroke();
  big(ctx, 'A WHOLE NATION', cx, s.y + 300, 100, C.white, pop(t, t0 + 0.05));
  big(ctx, 'SILENT', cx, s.y + 780, 190, C.gold, pop(t, T('silent,') - 0.08));
  // one small student at a desk, headphones on
  const kh = pop(t, T('hear.') - 0.3);
  if (kh > 0) { ctx.save(); ctx.translate(cx, s.y + 980); ctx.scale(kh * 1.6, kh * 1.6); ctx.fillStyle = C.ink; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.arc(0, -22, 13, 0, TAU); ctx.fill(); ctx.stroke(); ctx.strokeStyle = C.gold; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, -22, 17, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();
    ctx.fillStyle = C.gold; ctx.fillRect(-20, -28, 6, 12); ctx.fillRect(14, -28, 6, 12);
    ctx.fillStyle = C.ink; ctx.strokeStyle = C.line; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-20, 10); ctx.quadraticCurveTo(0, -12, 20, 10); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.navy3; ctx.fillRect(-34, 10, 68, 16); ctx.restore(); }
  ctx.restore();
}
// ---------------------------------------------------------------- G: end card
function sEnd(ctx, t) {
  const t0 = S.G, a = clamp((t - t0 - 0.05) / 0.2);
  ctx.save(); ctx.globalAlpha = a;
  // ban over: a plane finally takes off
  const tk = prog(t, t0 + 0.2, t0 + 2.6); if (tk > 0) { ctx.save(); ctx.translate(lerp(s.x - 100, W + 200, E.inQuad(tk)), GROUND - 40 - 380 * E.inQuad(tk)); ctx.rotate(-0.35 * clamp(tk * 3)); sidePlane(ctx, 0, 0, 1.2); ctx.restore(); }
  big(ctx, '35 MIN', cx, s.y + 330, 110, C.gold, pop(t, t0 - 0.05));
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
    text(ctx, 'has a big exam coming up', 40, 38, font(38, 800, UI), C.gold, 'center');
    ctx.restore(); }
  ctx.restore();
}

const HITS = [
  [B(0.02), '35', 'thud'], [B(T('Not') - 0.05), 'X', 'pop', { pitch: 'D4' }], [B(T('Korea.') - 0.05), 'country', 'click'],
  [B(S.B), 'why', 'whoosh', { len: 0.4, from: 1600, to: 400 }], [B(T('listening') - 0.1), 'phones', 'pop', { pitch: 'A4' }], [B(T('English') - 0.05), 'tag', 'click'],
  [B(S.C), 'hall', 'whoosh', { len: 0.4, from: 600, to: 1800 }], [B(T('550,000+') - 0.2), 'count', 'type', { len: 1.0, n: 12 }], [B(T('Suneung,')), 'suneung', 'pop', { pitch: 'D5' }],
  [B(S.D), 'board', 'whoosh', { len: 0.35, from: 1800, to: 600 }], [B(T('moved,') - 0.5), 'flip', 'type', { len: 0.8, n: 10 }], [B(T('130') - 0.1), '130', 'thud'], [B(T('banned') - 0.05), 'drone X', 'pop', { pitch: 'F#4' }],
  [B(S.E), 'country', 'whoosh', { len: 0.4, from: 600, to: 2000 }], [B(T('Offices') - 0.15), 'office', 'click'], [B(T('trains') - 0.15), 'train', 'click'], [B(T('artillery') - 0.15), 'army', 'tick'],
  [B(S.F), 'silent', 'whoosh', { len: 0.35, from: 2000, to: 600 }], [B(T('silent,') - 0.08), 'silent', 'blip', { pitch: 'D5' }],
  [B(S.G), 'end', 'whoosh', { len: 0.35, from: 600, to: 1600 }], [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop', { pitch: 'A5' }], [B(T('more.') + 0.1), 'send', 'click'],
];

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI)], samples: 6,
  hits: HITS,
  draw(ctx, u, t) {
    bg(ctx, t);
    const shift = (t0) => E.inOutCubic(prog(t, t0 - 0.2, t0 + 0.2));
    airport(ctx, t);
    ctx.save(); ctx.translate(0, Math.sin(t * 0.3) * 5);
    if (t < S.B + 0.25) { ctx.save(); ctx.globalAlpha = 1 - shift(S.B); ctx.translate(-shift(S.B) * 300, 0); sHook(ctx, t); ctx.restore(); }
    if (t >= S.B - 0.2 && t < S.C + 0.25) sReason(ctx, t);
    if (t >= S.C - 0.2 && t < S.D + 0.25) sHall(ctx, t);
    if (t >= S.D - 0.2 && t < S.E + 0.25) sBoard(ctx, t);
    if (t >= S.E - 0.2 && t < S.F + 0.25) sCountry(ctx, t);
    if (t >= S.F - 0.2 && t < S.G + 0.25) sSilent(ctx, t);
    if (t >= S.G - 0.05) sEnd(ctx, t);
    ctx.restore();
    if (t < S.G - 0.1) meter(ctx, t);
    captions(ctx, t);
  },
});
