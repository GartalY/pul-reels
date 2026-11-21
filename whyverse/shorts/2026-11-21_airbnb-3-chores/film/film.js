// "3 chores your Airbnb host can't make you do any more" — Whyverse 23:00 London animated fact Short, 21 Nov 2026. Pure function of time.
// Airbnb house-rules policy, bookings made on/after 20 Nov 2026 (Skift 21 Oct, Fox Business, AP 22 Oct): hosts generally can't require
// washing dishes, stripping beds, taking trash off-site (also starting laundry). Still OK: dishes in the sink, gather towels, sort trash/recycling.
// Look: LINE ART countdown on the Whyverse navy; persistent world = a row of little rental houses at night + "CHORES YOU CAN SKIP 0/3" counter.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, hash01, clamp, TAU } = M;

const TIMING = {"dur": 21.6, "lines": [{"t0": 0.1, "t1": 2.802, "words": [{"w": "3", "t": 0.16, "key": true}, {"w": "chores", "t": 0.424, "key": true}, {"w": "your", "t": 0.726, "key": false}, {"w": "Airbnb", "t": 0.953, "key": true}, {"w": "host", "t": 1.255, "key": false}, {"w": "can't", "t": 1.482, "key": false}, {"w": "make", "t": 1.708, "key": false}, {"w": "you", "t": 1.935, "key": false}, {"w": "do", "t": 2.124, "key": false}, {"w": "any", "t": 2.275, "key": false}, {"w": "more.", "t": 2.463, "key": false}]}, {"t0": 3.0, "t1": 6.811, "words": [{"w": "Airbnb's", "t": 3.02, "key": true}, {"w": "new", "t": 3.413, "key": false}, {"w": "house", "t": 3.632, "key": false}, {"w": "rules", "t": 3.937, "key": true}, {"w": "start", "t": 4.243, "key": false}, {"w": "with", "t": 4.549, "key": false}, {"w": "bookings", "t": 4.811, "key": true}, {"w": "made", "t": 5.248, "key": false}, {"w": "from", "t": 5.51, "key": false}, {"w": "20 Nov.", "t": 5.772, "key": true}]}, {"t0": 7.0, "t1": 9.017, "words": [{"w": "#3", "t": 7.03, "key": true}, {"w": "taking", "t": 7.77, "key": false}, {"w": "the", "t": 8.068, "key": false}, {"w": "trash", "t": 8.254, "key": true}, {"w": "off-site.", "t": 8.515, "key": true}]}, {"t0": 9.25, "t1": 10.846, "words": [{"w": "#2", "t": 9.28, "key": true}, {"w": "stripping", "t": 9.93, "key": true}, {"w": "the", "t": 10.335, "key": false}, {"w": "beds.", "t": 10.519, "key": true}]}, {"t0": 11.0, "t1": 12.843, "words": [{"w": "And", "t": 11.03, "key": false}, {"w": "#1", "t": 11.191, "key": true}, {"w": "washing", "t": 11.82, "key": true}, {"w": "the", "t": 12.2, "key": false}, {"w": "dishes.", "t": 12.412, "key": true}]}, {"t0": 13.0, "t1": 18.068, "words": [{"w": "Hosts", "t": 13.06, "key": false}, {"w": "can", "t": 13.328, "key": false}, {"w": "still", "t": 13.519, "key": true}, {"w": "ask", "t": 13.787, "key": false}, {"w": "you", "t": 13.978, "key": false}, {"w": "to", "t": 14.169, "key": false}, {"w": "leave", "t": 14.322, "key": false}, {"w": "dishes", "t": 14.59, "key": false}, {"w": "in", "t": 14.896, "key": false}, {"w": "the", "t": 15.049, "key": false}, {"w": "sink,", "t": 15.24, "key": true}, {"w": "gather", "t": 15.88, "key": false}, {"w": "the", "t": 16.228, "key": false}, {"w": "towels", "t": 16.446, "key": true}, {"w": "and", "t": 16.794, "key": false}, {"w": "sort", "t": 17.012, "key": false}, {"w": "the", "t": 17.273, "key": false}, {"w": "recycling.", "t": 17.491, "key": true}]}, {"t0": 18.25, "t1": 19.958, "words": [{"w": "Like", "t": 18.28, "key": true}, {"w": "and", "t": 18.514, "key": false}, {"w": "follow", "t": 18.709, "key": true}, {"w": "Whyverse", "t": 19.021, "key": true}, {"w": "for", "t": 19.411, "key": false}, {"w": "more.", "t": 19.606, "key": false}]}]};
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


const GOLDL = '#FFE3A0';
// ---------------------------------------------------------------- persistent world: little rental houses at night
function houses(ctx, t) {
  ctx.save();
  const g = ctx.createLinearGradient(0, GROUND - 360, 0, GROUND); g.addColorStop(0, 'rgba(255,196,71,0)'); g.addColorStop(1, 'rgba(255,196,71,0.16)');
  ctx.fillStyle = g; ctx.fillRect(0, GROUND - 360, W, 360);
  const xs = [-30, 230, 520, 800], hw = [230, 260, 250, 300];
  xs.forEach((x0, i) => { const w = hw[i], h = 150 + hash01(i, 4) * 70, y = GROUND - h;
    ctx.fillStyle = '#080C26'; ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(x0, GROUND); ctx.lineTo(x0, y); ctx.lineTo(x0 + w / 2, y - 90); ctx.lineTo(x0 + w, y); ctx.lineTo(x0 + w, GROUND); ctx.closePath(); ctx.fill(); ctx.stroke();
    // door
    ctx.strokeRect(x0 + w / 2 - 26, GROUND - 90, 52, 90);
    // windows, gently flickering
    for (const wx of [x0 + 28, x0 + w - 78]) { const on = 0.55 + 0.45 * Math.sin(t * (0.8 + hash01(i, 9)) + i * 2 + wx);
      ctx.fillStyle = `rgba(255,196,71,${0.35 + 0.4 * on})`; ctx.fillRect(wx, y + 30, 50, 46); ctx.strokeRect(wx, y + 30, 50, 46); } });
  ctx.fillStyle = '#05081C'; ctx.fillRect(0, GROUND, W, H - GROUND);
  ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, GROUND); ctx.lineTo(W, GROUND); ctx.stroke();
  ctx.restore();
}
// ---------------------------------------------------------------- icons (line art, white strokes, gold accents)
function icoTrash(ctx, x, y, sc, k, t) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc * k, sc * k); ctx.rotate(Math.sin(t * 2.2) * 0.05);
  ctx.lineWidth = 6; ctx.strokeStyle = C.white; ctx.lineJoin = 'round'; ctx.fillStyle = C.navy3;
  ctx.beginPath(); ctx.moveTo(-30, -48); ctx.quadraticCurveTo(-62, -10, -56, 34); ctx.quadraticCurveTo(-48, 62, 0, 62); ctx.quadraticCurveTo(48, 62, 56, 34);
  ctx.quadraticCurveTo(62, -10, 30, -48); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.gold; ctx.beginPath(); ctx.moveTo(-30, -48); ctx.lineTo(-14, -70); ctx.lineTo(0, -54); ctx.lineTo(14, -70); ctx.lineTo(30, -48); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-26, 0); ctx.quadraticCurveTo(-10, 20, -20, 44); ctx.moveTo(22, -8); ctx.quadraticCurveTo(10, 16, 22, 40); ctx.stroke();
  ctx.restore();
}
function icoBed(ctx, x, y, sc, k, t) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc * k, sc * k);
  ctx.lineWidth = 6; ctx.strokeStyle = C.white; ctx.lineJoin = 'round';
  ctx.fillStyle = C.navy3; ctx.fillRect(-80, -50, 14, 100); ctx.strokeRect(-80, -50, 14, 100);
  ctx.fillRect(66, -10, 14, 60); ctx.strokeRect(66, -10, 14, 60);
  ctx.fillStyle = C.white; M.rrect(ctx, -66, -4, 132, 30, 8); ctx.fill();
  const lift = 6 * Math.sin(t * 3); // sheet
  ctx.fillStyle = C.gold; ctx.beginPath(); ctx.moveTo(-20, -6 - lift); ctx.quadraticCurveTo(20, -18 - lift, 66, -6); ctx.lineTo(66, 30); ctx.lineTo(-20, 30); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = C.line; M.rrect(ctx, -62, -26, 40, 22, 10); ctx.fill(); ctx.stroke();
  ctx.restore();
}
function icoDishes(ctx, x, y, sc, k, t) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc * k, sc * k);
  ctx.lineWidth = 6; ctx.strokeStyle = C.white; ctx.lineJoin = 'round';
  for (let i = 0; i < 4; i++) { const yy = 40 - i * 22, dx = Math.sin(t * 2 + i) * 3 * (i / 3);
    ctx.fillStyle = i % 2 ? C.navy3 : C.line; ctx.beginPath(); ctx.ellipse(dx, yy, 66 - i * 3, 14, 0, 0, TAU); ctx.fill(); ctx.stroke(); }
  // a cup on top + suds
  ctx.fillStyle = C.gold; ctx.beginPath(); ctx.moveTo(-22, -40); ctx.lineTo(22, -40); ctx.lineTo(16, -6); ctx.lineTo(-16, -6); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = 'rgba(246,243,234,0.85)';
  for (let i = 0; i < 5; i++) { const q = (t * 0.6 + i / 5) % 1; ctx.globalAlpha = 1 - q; ctx.beginPath(); ctx.arc(-40 + i * 20, -50 - q * 60, 6 + 4 * hash01(i, 2), 0, TAU); ctx.fill(); }
  ctx.globalAlpha = 1; ctx.restore();
}
function check(ctx, x, y, r, k, col = C.green) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill();
  ctx.strokeStyle = C.navy; ctx.lineWidth = r * 0.24; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-r * 0.45, 0); ctx.lineTo(-r * 0.1, r * 0.35); ctx.lineTo(r * 0.5, -r * 0.35); ctx.stroke(); ctx.restore();
}
const ICONS = [icoTrash, icoBed, icoDishes];
// cross times for #3, #2, #1
const XT = () => [T('off-site.') + 0.15, T('beds.') + 0.1, T('dishes.') + 0.1];
// ---------------------------------------------------------------- progress counter: CHORES YOU CAN SKIP n/3
function counter(ctx, t) {
  if (t < S.B) return; const y = s.y + s.h - 70, k = sp(t, S.B, SPRING.gentle);
  ctx.save(); ctx.globalAlpha = clamp(k); ctx.translate(0, (1 - k) * 60);
  ctx.fillStyle = 'rgba(6,9,30,0.9)'; M.rrect(ctx, s.x + 10, y - 62, s.w - 20, 124, 26); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.line; ctx.stroke();
  const xt = XT(), n = xt.filter((q) => t >= q).length;
  text(ctx, 'CHORES YOU', s.x + 50, y - 8, font(32, 800, UI), C.white, 'left');
  text(ctx, 'CAN SKIP', s.x + 50, y + 32, font(32, 800, UI), C.gold, 'left');
  for (let i = 0; i < 3; i++) { const bx = s.x + 330 + i * 120; ctx.strokeStyle = C.dim; ctx.lineWidth = 3; M.rrect(ctx, bx - 46, y - 46, 92, 92, 18); ctx.stroke();
    ICONS[i](ctx, bx, y + 4, 0.48, 1, t); cross(ctx, bx, y, 34, pop(t, xt[i] - 0.05)); }
  const kn = pop(t, xt[Math.max(0, n - 1)] - 0.05);
  big(ctx, `${n}/3`, s.x + s.w - 60, y + 28, 84, n ? C.gold : C.dim, n ? Math.max(0.9, kn) : 1, { align: 'right' });
  ctx.restore();
}
// ---------------------------------------------------------------- A: hook — 3 chores
function sHook(ctx, t) {
  tag(ctx, 'AIRBNB · NEW HOUSE RULES', cx, s.y + 150, 50, 1, { rot: -0.02 });
  big(ctx, '3', cx, s.y + 500, 400, C.gold, Math.max(0.94, pop(t, -0.4)), { rot: -0.05 });
  big(ctx, 'CHORES', cx, s.y + 670, 180, C.white, Math.max(0.94, pop(t, T('chores') - 0.15)), { rot: -0.03 });
  big(ctx, 'YOUR AIRBNB HOST', cx, s.y + 800, 96, C.white, pop(t, T('Airbnb') - 0.15));
  big(ctx, "CAN'T MAKE YOU DO", cx, s.y + 910, 86, C.coral, pop(t, T("can't") - 0.1), { rot: 0.02 });
  const xs = [cx - 260, cx, cx + 260];
  xs.forEach((x, i) => { const k = pop(t, 0.2 + i * 0.25); ICONS[i](ctx, x, s.y + 1060, 1.1, k, t); cross(ctx, x, s.y + 1052, 62, pop(t, T('any') + i * 0.12)); });
}
// ---------------------------------------------------------------- B: the rule — bookings from 20 Nov
function sRule(ctx, t) {
  const t0 = S.B, a = sceneFade(t, t0 + 0.1, S.C); ctx.save(); ctx.globalAlpha = a;
  tag(ctx, 'AIRBNB HOUSE RULES', cx, s.y + 270, 50, pop(t, T('house') - 0.1), { rot: -0.02 });
  // calendar page
  const kc = pop(t, t0 + 0.05), y0 = s.y + 640;
  if (kc > 0) { ctx.save(); ctx.translate(cx, y0); ctx.scale(kc, kc); ctx.rotate(-0.03);
    ctx.fillStyle = C.white; M.rrect(ctx, -250, -230, 500, 460, 36); ctx.fill();
    ctx.fillStyle = C.coral; M.rrect(ctx, -250, -230, 500, 120, 36); ctx.fill(); ctx.fillRect(-250, -150, 500, 40);
    text(ctx, 'NOVEMBER 2026', 0, -150, font(52, 800, UI), C.white, 'center');
    for (const rx of [-150, 150]) { ctx.fillStyle = C.navy; M.rrect(ctx, rx - 12, -262, 24, 64, 12); ctx.fill(); }
    const kd = Math.max(0.0, pop(t, T('20 Nov.') - 0.15));
    big(ctx, '20', 0, 130, 260, C.navy, Math.max(0.6, kd)); ctx.restore(); }
  tag(ctx, 'NEW BOOKINGS FROM', cx, s.y + 960, 48, pop(t, T('bookings') - 0.1), { bg: C.gold, rot: 0.02 });
  ctx.restore();
}
// ---------------------------------------------------------------- C/D/E: countdown #3, #2, #1
function sChore(ctx, t, t0, t1, n, i, l1, l2, tx) {
  const a = sceneFade(t, t0 + 0.1, t1); ctx.save(); ctx.globalAlpha = a;
  const push = E.outCubic(prog(t, t0, t0 + 0.35)); ctx.translate((1 - push) * 260, 0);
  big(ctx, `#${n}`, s.x + 150, s.y + 330, 220, C.gold, pop(t, t0 + 0.02), { rot: -0.08 });
  ICONS[i](ctx, cx + 70, s.y + 620, 3.2, pop(t, t0 + 0.1), t);
  big(ctx, l1, cx, s.y + 940, 96, C.white, pop(t, T(tx[0]) - 0.12));
  big(ctx, l2, cx, s.y + 1050, 96, C.gold, pop(t, T(tx[1]) - 0.12));
  const xt = XT()[i]; cross(ctx, cx + 70, s.y + 610, 190, pop(t, xt - 0.05));
  tag(ctx, 'NO LONGER REQUIRED', cx + 70, s.y + 800, 42, pop(t, xt + 0.05), { bg: C.coral, fg: C.white, rot: -0.04 });
  ctx.restore();
}
// ---------------------------------------------------------------- F: still OK to ask
function sStill(ctx, t) {
  const t0 = S.F, a = sceneFade(t, t0 + 0.1, S.G - 0.1, 0.15); ctx.save(); ctx.globalAlpha = a;
  big(ctx, 'STILL OK', cx, s.y + 300, 150, C.green, pop(t, T('still') - 0.15), { rot: -0.03 });
  big(ctx, 'TO ASK', cx, s.y + 420, 100, C.white, pop(t, T('ask') - 0.1));
  const rows = [['Dishes in the sink', 'sink,'], ['Gather the towels', 'towels'], ['Sort the recycling', 'recycling.']];
  rows.forEach(([lab, w], i) => { const k = pop(t, T(w) - 0.25), y = s.y + 590 + i * 150; if (k <= 0) return;
    ctx.save(); ctx.translate(cx, y); ctx.scale(k, k); ctx.fillStyle = 'rgba(6,9,30,0.9)'; M.rrect(ctx, -390, -58, 780, 116, 24); ctx.fill();
    ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.stroke(); check(ctx, -320, 0, 38, 1);
    text(ctx, lab, -250, 20, font(56, 800, D), C.white, 'left'); ctx.restore(); });
  ctx.restore();
}
// ---------------------------------------------------------------- G: end card
function sEnd(ctx, t) {
  const t0 = S.G, a = clamp((t - t0 - 0.05) / 0.2);
  ctx.save(); ctx.globalAlpha = a;
  big(ctx, '3 CHORES · SKIP THEM', cx, s.y + 330, 86, C.gold, pop(t, t0 - 0.05));
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
    text(ctx, 'always does the Airbnb dishes', 40, 38, font(38, 800, UI), C.gold, 'center');
    ctx.restore(); }
  ctx.restore();
}
const xt = XT();
const HITS = [
  [B(0.02), '3', 'thud'], [B(T('chores') - 0.15), 'chores', 'pop', { pitch: 'D4' }], [B(T("can't") - 0.1), 'cant', 'click'], [B(T('any')), 'x', 'thud'],
  [B(S.B), 'rule', 'whoosh', { len: 0.4, from: 1600, to: 400 }], [B(T('house') - 0.1), 'tag', 'pop', { pitch: 'A4' }], [B(T('20 Nov.') - 0.15), '20', 'thud'],
  [B(S.C), '#3', 'whoosh', { len: 0.35, from: 600, to: 1800 }], [B(xt[0] - 0.05), 'x3', 'thud'],
  [B(S.D), '#2', 'whoosh', { len: 0.35, from: 1800, to: 600 }], [B(xt[1] - 0.05), 'x2', 'thud'],
  [B(S.E), '#1', 'whoosh', { len: 0.35, from: 600, to: 1800 }], [B(xt[2] - 0.05), 'x1', 'thud'],
  [B(S.F), 'still', 'whoosh', { len: 0.35, from: 2000, to: 600 }], [B(T('sink,') - 0.25), 'ok1', 'blip', { pitch: 'D5' }], [B(T('towels') - 0.25), 'ok2', 'blip', { pitch: 'F#5' }], [B(T('recycling.') - 0.25), 'ok3', 'blip', { pitch: 'A5' }],
  [B(S.G), 'end', 'whoosh', { len: 0.35, from: 600, to: 1600 }], [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop', { pitch: 'A5' }], [B(T('more.') + 0.1), 'send', 'click'],
];

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI)], samples: 6,
  hits: HITS,
  draw(ctx, u, t) {
    bg(ctx, t);
    const shift = (t0) => E.inOutCubic(prog(t, t0 - 0.2, t0 + 0.2));
    houses(ctx, t);
    ctx.save(); ctx.translate(0, Math.sin(t * 0.3) * 5);
    if (t < S.B + 0.25) { ctx.save(); ctx.globalAlpha = 1 - shift(S.B); ctx.translate(-shift(S.B) * 300, 0); sHook(ctx, t); ctx.restore(); }
    if (t >= S.B - 0.2 && t < S.C + 0.25) sRule(ctx, t);
    if (t >= S.C - 0.2 && t < S.D + 0.25) sChore(ctx, t, S.C, S.D, 3, 0, 'TAKING THE TRASH', 'OFF-SITE', ['trash', 'off-site.']);
    if (t >= S.D - 0.2 && t < S.E + 0.25) sChore(ctx, t, S.D, S.E, 2, 1, 'STRIPPING', 'THE BEDS', ['stripping', 'beds.']);
    if (t >= S.E - 0.2 && t < S.F + 0.25) sChore(ctx, t, S.E, S.F, 1, 2, 'WASHING', 'THE DISHES', ['washing', 'dishes.']);
    if (t >= S.F - 0.2 && t < S.G + 0.25) sStill(ctx, t);
    if (t >= S.G - 0.05) sEnd(ctx, t);
    ctx.restore();
    if (t < S.G - 0.1) counter(ctx, t);
    captions(ctx, t);
  },
});
