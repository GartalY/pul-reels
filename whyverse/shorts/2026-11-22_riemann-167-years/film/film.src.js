// "167 years. $1 million." — Whyverse 19:00 Baku trend Short, Sun 22 Nov 2026 (TOPIC OVERRIDE, PHOTO STORY test).
// Levent Alpöge (Anthropic) announced 20 Nov 2026 a claimed proof of the Riemann hypothesis made with Claude, as Lean code
// (~17 million lines; >250,000 pages written out). NOT verified yet. A CLAIM stays a claim.
// Look: CHALKBOARD PHOTO STORY — dark green slate, chalk line art, real photos taped on, chalk-yellow accent, pink for CLAIM.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, rrect, hash01, clamp, TAU, cover } = M;

const TIMING = __TIMING__;
const C = { slate: '#1E2A25', slate2: '#16201C', chalk: '#EEEDE6', dim: 'rgba(238,237,230,0.45)', faint: 'rgba(238,237,230,0.14)',
  yel: '#FFD24A', pink: '#FF7F8E', blue: '#8FD3FF', ink: '#0F1512', paper: '#F4F1E8', wood: '#7A5A3A' };
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const slam = (t, t0, from = 1.8) => (t < t0 ? 0 : Math.min(1.06, lerp(from, 1, E.outBack(prog(t, t0, t0 + 0.28)))));
const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const LID = (id) => TIMING.lines.find((l) => l.id === id).t0;
const END = 28.5;
// scene starts
const S = { A: 0, B1: LID('l2') - 0.1, B2: T("Math's") - 0.1, C1: LID('l3') - 0.1, C1b: T('it,') - 0.1, C2: T('AI') - 0.15, D: LID('l4') - 0.1,
  E: LID('l5') - 0.1, F: LID('l6') - 0.1, G1: LID('l7') - 0.1, G2: T('mystery') - 0.1, Hh: LID('l8') - 0.1 };
const B = (t) => t / 0.5;
const WH = (t) => [B(t), 'wipe', 'whoosh', { len: 0.3, from: 700, to: 1800 }];
const HITS = [
  [B(0.03), 'hook 167', 'pop'], [B(0.2), 'odometer', 'type', { len: 1.3, n: 12 }], [B(T('$1 million.')), '$1M', 'coins'], [B(T('$1 million.') + 0.35), 'prize chip', 'click'],
  WH(S.B1), [B(T('Riemann') - 0.05), 'name tag', 'click'], [B(T('hypothesis.')), 'title', 'tick'],
  WH(S.B2), [B(T('most')), 'zeros', 'type', { len: 0.9, n: 7 }], [B(T('famous')), '#1 chip', 'pop'],
  WH(S.C1), [B(T('Levent') - 0.05), 'name tag', 'click'], [B(T('says')), 'CLAIM stamp', 'pop'],
  WH(S.C1b), [B(S.C1b + 0.1), 'Harvard tag', 'click'], WH(S.C2), [B(T('AI') + 0.05), 'plus', 'tick'], [B(T('Claude.')), 'Claude card', 'pop'],
  WH(S.D), [B(T('17 million') - 0.05), 'code wall', 'type', { len: 1.6, n: 16 }], [B(T('code.')), 'LEAN chip', 'click'],
  WH(S.E), [B(T('250,000 pages.') - 0.05), 'pages', 'type', { len: 1.3, n: 12 }], [B(T('250,000 pages.') + 1.3), 'stack top', 'pop'],
  WH(S.F), [B(T('human')), 'magnifier', 'tick'], [B(T('yet.')), 'NOT YET', 'pop'], [B(T('Experts')), 'experts', 'click'], [B(T('checking.')), 'status', 'tick'],
  WH(S.G1), [B(T('holds,')), 'IF IT HOLDS', 'click'], [B(T('a 167-year')), 'timeline', 'whoosh', { len: 0.5, from: 400, to: 1400 }],
  WH(S.G2), [B(T('prime')), 'primes', 'type', { len: 0.8, n: 8 }], [B(T('cracked.')), 'crack', 'pop'],
  WH(S.Hh), [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop'], [B(T('more.') + 0.35), 'send line', 'tick'],
];

// ---------------------------------------------------------------- helpers
function stroke(ctx, w = 4, col = C.chalk) { ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); }
function big(ctx, str, x, y, size, col, k, { rot = 0, fam = D, wt = 800, max = s.w - 20 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.font = font(size, wt, fam); const mw = ctx.measureText(str).width; if (mw > max) size = size * max / mw;
  ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.font = font(size, wt, fam); ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillText(str, size * 0.03, size * 0.05);
  ctx.fillStyle = col; ctx.fillText(str, 0, 0);
  // chalk grain: sparse slate-coloured specks over the letters
  ctx.restore();
}
function chip(ctx, label, x, y, size, k, { bg = C.yel, fg = C.ink, rot = 0, wt = 800, edge = null } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, UI); const w = ctx.measureText(label).width + size * 1.1, h = size * 1.6;
  rrect(ctx, -w / 2, -h / 2, w, h, 10); ctx.fillStyle = bg; ctx.fill(); if (edge) stroke(ctx, 4, edge);
  text(ctx, label, 0, size * 0.36, font(size, wt, UI), fg, 'center'); ctx.restore();
}
// chalk-drawn line that draws itself on (p = 0..1)
function chalkPath(ctx, pts, p, w = 6, col = C.chalk) {
  if (p <= 0) return; let tot = 0; const seg = [];
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); tot += d; }
  let left = tot * clamp(p); ctx.beginPath(); ctx.moveTo(...pts[0]);
  for (let i = 1; i < pts.length && left > 0; i++) { const f = Math.min(1, left / seg[i - 1]);
    ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); left -= seg[i - 1]; }
  ctx.globalAlpha *= 0.92; stroke(ctx, w, col); ctx.globalAlpha /= 0.92;
}
// the persistent slate: gradient + baked smudges (static, no boil) + faint old formulas
let SLATE = null;
function initSlate() {
  const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, C.slate); gr.addColorStop(1, C.slate2); g.fillStyle = gr; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 26; i++) { const x = hash01(i, 7) * W, y = hash01(i, 8) * H, r = 120 + 260 * hash01(i, 9);
    const rg = g.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, `rgba(238,237,230,${0.025 + 0.035 * hash01(i, 10)})`); rg.addColorStop(1, 'rgba(238,237,230,0)');
    g.fillStyle = rg; g.fillRect(x - r, y - r, 2 * r, 2 * r); }
  g.font = font(54, 600, UI); g.fillStyle = 'rgba(238,237,230,0.06)';
  const ghosts = ['ζ(s) = 0', 'Re(s) = ½', '2, 3, 5, 7, 11 …', 'Σ 1/nˢ', '1859', 'π(x) ≈ x / ln x'];
  ghosts.forEach((q, i) => { g.save(); g.translate(60 + hash01(i, 3) * (W - 420), 120 + i * 300 + hash01(i, 4) * 90); g.rotate((hash01(i, 5) - 0.5) * 0.2); g.fillText(q, 0, 0); g.restore(); });
  for (let i = 0; i < 2500; i++) { g.fillStyle = `rgba(255,255,255,${0.02 + 0.03 * hash01(i, 12)})`; g.fillRect(hash01(i, 13) * W, hash01(i, 14) * H, 2, 2); }
  SLATE = c;
}
function slate(ctx, t, dx = 0) { ctx.drawImage(SLATE, 0, 0); }
// wipe: a horizontal pan with both scenes on screen and a chalk eraser edge
function wipe(ctx, t, t0, a, b, dur = 0.32) {
  const p = E.inOutCubic(prog(t, t0 - dur * 0.55, t0 + dur * 0.45));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(-p * W, 0); a(); ctx.restore(); ctx.save(); ctx.translate((1 - p) * W, 0); b(); ctx.restore();
  const x = (1 - p) * W; ctx.fillStyle = C.wood; ctx.fillRect(x - 18, 0, 36, H); ctx.fillStyle = 'rgba(238,237,230,0.5)'; ctx.fillRect(x - 18, 0, 6, H);
}
// real photo taped to the slate, slow log-space zoom inside the frame, name tag + credit
function photo(ctx, img, x, y, w, h, t, t0, { rot = 0, z0 = 1.0, z1 = 1.14, fx = 0.5, fy = 0.4, k = 1, tag = null, sub = null, tagT = 0, credit = '' } = {}) {
  if (!img || k <= 0) return;
  const p = clamp((t - t0) / 3.0), z = z0 * (z1 / z0) ** p;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.fillStyle = 'rgba(0,0,0,0.45)'; ctx.fillRect(-w / 2 + 14, -h / 2 + 18, w + 24, h + 24);
  ctx.fillStyle = C.paper; ctx.fillRect(-w / 2 - 12, -h / 2 - 12, w + 24, h + 24);
  ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.clip();
  cover(ctx, img, -w / 2, -h / 2, w, h, { fx, fy, zoom: z }); ctx.restore();
  // tape
  [[-w / 2 + 30, -h / 2 - 8, -0.6], [w / 2 - 30, -h / 2 - 8, 0.6]].forEach(([tx, ty, r]) => { ctx.save(); ctx.translate(tx, ty); ctx.rotate(r);
    ctx.fillStyle = 'rgba(240,228,190,0.82)'; ctx.fillRect(-55, -18, 110, 36); ctx.restore(); });
  if (credit) { ctx.font = font(20, 600, UI); const cw = ctx.measureText(credit).width + 16; ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(w / 2 - cw, -h / 2, cw, 30); text(ctx, credit, w / 2 - 8, -h / 2 + 21, font(20, 600, UI), 'rgba(255,255,255,0.9)', 'right'); }
  ctx.restore();
  if (tag) { const kt = pop(t, tagT); if (kt > 0) { ctx.save(); ctx.translate(x - w / 2 + 10, y + h / 2 - 20); ctx.rotate(-0.03); ctx.scale(kt, kt);
    ctx.font = font(50, 800, D); const tw = Math.max(ctx.measureText(tag).width, sub ? (ctx.font = font(32, 700, UI), ctx.measureText(sub).width + sub.length) : 0) + 50;
    rrect(ctx, 0, -40, tw, sub ? 130 : 84, 10); ctx.fillStyle = C.yel; ctx.fill();
    text(ctx, tag, 25, 20, font(50, 800, D), C.ink, 'left'); if (sub) text(ctx, sub, 25, 70, font(32, 700, UI), C.ink, 'left', 1); ctx.restore(); } }
}
function stamp(ctx, label, x, y, size, t, t0, col = C.pink, rot = -0.16) {
  const k = slam(t, t0, 2.2); if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.font = font(size, 800, D);
  const w = ctx.measureText(label).width + size * 0.8, h = size * 1.3; rrect(ctx, -w / 2, -h / 2, w, h, 14);
  ctx.fillStyle = 'rgba(15,21,18,0.55)'; ctx.fill(); stroke(ctx, 9, col);
  text(ctx, label, 0, size * 0.36, font(size, 800, D), col, 'center', 3); ctx.restore();
}
const fmt = (n) => Math.round(n).toLocaleString('en-US');

// ---------------------------------------------------------------- persistent PROOF BOARD (bottom)
function board(ctx, t) {
  const k = clamp(prog(t, 0.05, 0.4)); if (k <= 0) return;
  const y = s.y + s.h - 70, x0 = s.x, w = s.w, h = 128;
  const yrs = Math.round(167 * E.outCubic(prog(t, 0.1, 1.5)));
  const prize = t >= T('$1 million.') ? '$1M' : '—';
  let st = 'UNSOLVED', stBg = C.dim;
  if (t >= T('says')) { st = 'CLAIMED'; stBg = C.pink; }
  if (t >= T('Experts')) { st = 'CHECKING…'; stBg = C.blue; }
  if (t >= T('holds,')) { st = 'IF IT HOLDS'; stBg = C.yel; }
  const changes = [T('$1 million.'), T('says'), T('Experts'), T('holds,')];
  const last = changes.filter((c) => t >= c).pop() ?? -9; const bmp = 1 + 0.18 * Math.exp(-(t - last) * 7) * (t - last < 1);
  ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 80);
  rrect(ctx, x0, y - h / 2, w, h, 12); ctx.fillStyle = 'rgba(10,14,12,0.86)'; ctx.fill(); stroke(ctx, 4, C.wood);
  const cells = [['OPEN FOR', `${yrs} YRS`], ['PRIZE', prize]]; const cw = w * 0.30;
  cells.forEach(([lab, val], i) => { const x = x0 + 28 + i * cw;
    text(ctx, lab, x, y - 20, font(26, 800, UI), C.dim, 'left', 2);
    ctx.save(); ctx.translate(x, y + 36); if (i === 1 && last === changes[0]) ctx.scale(bmp, bmp);
    text(ctx, val, 0, 0, font(54, 800, D), C.yel, 'left'); ctx.restore(); });
  const sx = x0 + w * 0.60, sw = w * 0.38;
  ctx.save(); ctx.translate(sx + sw / 2, y); if (last !== changes[0]) ctx.scale(bmp, bmp);
  rrect(ctx, -sw / 2 + 6, -h / 2 + 16, sw - 12, h - 32, 10); ctx.fillStyle = stBg; ctx.fill();
  text(ctx, st, 0, 14, font(st.length > 9 ? 38 : 44, 800, D), C.ink, 'center'); ctx.restore();
  ctx.restore();
}

// ---------------------------------------------------------------- captions (word by word, top)
function captions(ctx, t) {
  const L = TIMING.lines; const li = L.findIndex((l, i) => t >= l.t0 - 0.05 && t < (L[i + 1] ? L[i + 1].t0 - 0.05 : END)); if (li < 0) return;
  const all = L[li].words, ws = all.filter((w) => t >= w.t - 0.03); if (!ws.length) return;
  const start = Math.floor((ws.length - 1) / 3) * 3, chunk = all.slice(start, start + 3), shown = ws.slice(start);
  let size = 78; const gap = 22;
  const meas = (sz) => { ctx.font = font(sz, 800, D); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 20) { size = Math.floor(size * (s.w - 20) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 30;
  shown.forEach((w, i) => { const k = sp(t, w.t - 0.03, SPRING.bouncy), sc = Math.min(1.1, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.2; ctx.strokeStyle = C.ink; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.yel : C.chalk; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}

// ---------------------------------------------------------------- A: hook — 167 YEARS / $1 MILLION
function sA(ctx, t) {
  slate(ctx, t);
  const y0 = s.y + 330;
  // frame 0: the number is already there (tiny settle only)
  const k1 = t < 0.02 ? 1 : Math.min(1.04, lerp(1.25, 1, E.outBack(prog(t, 0, 0.3))));
  const lift = E.inOutCubic(prog(t, T('$1 million.') - 0.15, T('$1 million.') + 0.2));
  big(ctx, '167', cx, y0 + 60 - lift * 170, 330 * (1 - lift * 0.45), C.yel, k1);
  big(ctx, 'YEARS', cx, y0 + 170 - lift * 190, 120 * (1 - lift * 0.45), C.chalk, k1);
  // odometer 1859 → 2026
  const yr = Math.round(1859 + 167 * E.inOutCubic(prog(t, -0.3, 1.5)));
  const ko = 1 - lift;
  if (ko > 0) { ctx.save(); ctx.globalAlpha = ko; text(ctx, `1859  →  ${yr}`, cx, y0 + 300, font(70, 800, UI), C.chalk, 'center', 3);
    chalkPath(ctx, [[cx - 330, y0 + 330], [cx + 330, y0 + 330]], prog(t, 0.2, 1.5), 6, C.dim); ctx.restore(); }
  // $1 MILLION slams
  const tm = T('$1 million.');
  big(ctx, '$1,000,000', cx, y0 + 290, 170, C.chalk, slam(t, tm, 2.0), { rot: -0.03 });
  chip(ctx, 'CLAY MILLENNIUM PRIZE', cx, y0 + 410, 40, pop(t, tm + 0.35), { rot: 0.02 });
  // chalk circle around the prize
  const pc = prog(t, tm + 0.15, tm + 0.7);
  if (pc > 0) { const pts = []; for (let i = 0; i <= 60; i++) { const a = -0.5 + i / 60 * TAU * 1.05; pts.push([cx + Math.cos(a) * 470, y0 + 300 + Math.sin(a) * 150]); } chalkPath(ctx, pts, pc, 7, C.yel); }
}
// ---------------------------------------------------------------- B1: Bernhard Riemann photo
function sB1(ctx, t, IMG) {
  slate(ctx, t);
  photo(ctx, IMG.riemann, cx, s.y + 470, 540, 680, t, S.B1, { rot: -0.025, z0: 1.0, z1: 1.12, fy: 0.3, tag: 'BERNHARD RIEMANN', sub: 'POSED IT IN 1859', tagT: T('Riemann') - 0.05,
    credit: 'Photo: Smithsonian Institution / Wikimedia Commons' });
  photo(ctx, IMG.paper, s.x + s.w - 150, s.y + 500, 280, 440, t, T('hypothesis.') - 0.1, { rot: 0.07, z0: 1.0, z1: 1.08, fy: 0.2, k: pop(t, T('hypothesis.') - 0.15), credit: 'Public domain' });
  chip(ctx, 'HIS 1859 PAPER', s.x + s.w - 150, s.y + 760, 30, pop(t, T('hypothesis.') + 0.1), { rot: 0.05, bg: C.chalk });
  big(ctx, 'THE RIEMANN HYPOTHESIS', cx, s.y + 1000, 74, C.yel, pop(t, T('hypothesis.') - 0.05));
}
// ---------------------------------------------------------------- B2: zeros on the ½ line
function sB2(ctx, t, IMG) {
  slate(ctx, t);
  const ox = cx - 40, top = s.y + 170, bot = s.y + 800;
  photo(ctx, IMG.zeta, cx, (top + bot) / 2, s.w - 40, bot - top + 40, t, S.B2, { z0: 1.5, z1: 1.75, fx: 0.25, fy: 0.5, credit: 'Zeta plot: --MULLIGANACEOUS-- / Wikimedia, CC BY-SA 4.0' });
  chalkPath(ctx, [[s.x + 40, (top + bot) / 2], [s.x + s.w - 40, (top + bot) / 2]], prog(t, S.B2, S.B2 + 0.4), 5, C.dim); // real axis
  chalkPath(ctx, [[ox, bot], [ox, top]], prog(t, S.B2 + 0.05, S.B2 + 0.5), 8, C.yel); // critical line
  text(ctx, 'Re = ½', ox + 30, top + 50, font(60, 800, UI), C.yel, 'left');
  for (let i = 0; i < 9; i++) { const yy = lerp(bot - 50, top + 90, i / 8); const k = pop(t, T('most') + i * 0.1);
    if (k > 0) { ctx.save(); ctx.translate(ox, yy); ctx.scale(k, k); ctx.beginPath(); ctx.arc(0, 0, 16, 0, TAU); ctx.fillStyle = C.chalk; ctx.fill(); ctx.restore(); } }
  text(ctx, 'every zero on one line?', cx, bot + 90, font(52, 800, UI), C.chalk, 'center');
  chip(ctx, "MATH'S MOST FAMOUS PROBLEM", cx, bot + 180, 40, pop(t, T('famous')), { rot: -0.02 });
}
// ---------------------------------------------------------------- C1: Levent Alpöge photo + CLAIM
function sC1(ctx, t, IMG) {
  slate(ctx, t);
  photo(ctx, IMG.a24, cx, s.y + 420, 820, 548, t, S.C1, { rot: 0.02, z0: 1.05, z1: 1.2, fx: 0.5, fy: 0.35, tag: 'LEVENT ALPÖGE', sub: 'MATHEMATICIAN · ANTHROPIC', tagT: T('Levent') - 0.05,
    credit: 'Photo: Marlene Ruf / MFO, CC BY-SA 2.0 DE' });
  stamp(ctx, 'CLAIM', cx + 190, s.y + 820, 110, t, T('says'));
  text(ctx, '"says he proved it"', cx - 150, s.y + 960, font(50, 700, UI), C.chalk, 'center');
}
// ---------------------------------------------------------------- C1b: Harvard (where he studied)
function sC1b(ctx, t, IMG) {
  slate(ctx, t);
  photo(ctx, IMG.harv, cx, s.y + 440, 820, 560, t, S.C1b, { rot: -0.02, z0: 1.0, z1: 1.1, fy: 0.45, tag: 'HARVARD 2014', sub: 'TOP OF HIS CLASS · PRINCETON PhD', tagT: S.C1b + 0.1, credit: 'Widener Library, Harvard: Chris Rycroft, CC BY 2.0' });
  chip(ctx, 'CLAIM', cx + 260, s.y + 860, 50, 1, { bg: C.pink, rot: -0.1 });
}
// ---------------------------------------------------------------- C2: + Claude (AI)
function sC2(ctx, t, IMG) {
  slate(ctx, t);
  photo(ctx, IMG.a18, s.x + 205, s.y + 470, 390, 260, t, S.C2, { rot: -0.05, z0: 1.05, z1: 1.15, fy: 0.35, credit: 'Petra Lein / MFO, CC BY-SA 2.0 DE' });
  text(ctx, 'ALPÖGE', s.x + 200, s.y + 660, font(44, 800, D), C.chalk, 'center', 2);
  big(ctx, '+', cx + 30, s.y + 520, 150, C.yel, pop(t, T('AI') - 0.1));
  const kc = pop(t, T('Claude.') - 0.05);
  if (kc > 0) { ctx.save(); ctx.translate(s.x + s.w - 160, s.y + 470); ctx.rotate(0.04); ctx.scale(kc, kc);
    rrect(ctx, -150, -130, 300, 260, 18); ctx.fillStyle = 'rgba(10,14,12,0.6)'; ctx.fill(); stroke(ctx, 7, C.chalk);
    text(ctx, 'CLAUDE', 0, 10, font(66, 800, D), C.yel, 'center', 2); text(ctx, 'an AI model', 0, 70, font(34, 700, UI), C.chalk, 'center'); ctx.restore(); }
  big(ctx, 'WORKED TOGETHER', cx, s.y + 820, 84, C.chalk, pop(t, T('Claude.') + 0.15));
  text(ctx, 'announced 20 Nov 2026 · alpo.ge', cx, s.y + 900, font(34, 600, UI), C.dim, 'center');
}
// ---------------------------------------------------------------- D: 17 MILLION LINES
function sD(ctx, t) {
  slate(ctx, t);
  const t0 = T('17 million') - 0.05, p = E.outCubic(prog(t, t0, t0 + 1.7));
  // the code wall: rows of chalk strokes scrolling up, faster as the count climbs
  const scroll = (t - S.D) * 420 + p * 1600, rowH = 34;
  ctx.save(); ctx.beginPath(); ctx.rect(s.x, s.y + 150, s.w, 760); ctx.clip();
  for (let r = -2; r < 30; r++) { const idx = Math.floor(scroll / rowH) + r, yy = s.y + 150 + r * rowH - (scroll % rowH);
    const ind = 30 * Math.floor(hash01(idx, 31) * 4), n = 2 + Math.floor(hash01(idx, 32) * 4); let x = s.x + 20 + ind;
    for (let j = 0; j < n; j++) { const ww = 40 + 140 * hash01(idx * 7 + j, 33); ctx.fillStyle = j === 0 && hash01(idx, 34) < 0.3 ? 'rgba(255,210,74,0.55)' : 'rgba(238,237,230,0.30)';
      rrect(ctx, x, yy, ww, 14, 7); ctx.fill(); x += ww + 18; } }
  ctx.restore();
  const g = ctx.createLinearGradient(0, s.y + 150, 0, s.y + 910); g.addColorStop(0, C.slate); g.addColorStop(0.18, 'rgba(30,42,37,0)'); g.addColorStop(0.82, 'rgba(30,42,37,0)'); g.addColorStop(1, C.slate2);
  ctx.fillStyle = g; ctx.fillRect(s.x, s.y + 150, s.w, 760);
  rrect(ctx, s.x + 20, s.y + 380, s.w - 40, 270, 18); ctx.fillStyle = 'rgba(10,14,12,0.82)'; ctx.fill(); stroke(ctx, 5, C.yel);
  big(ctx, fmt(17000000 * p), cx, s.y + 540, 150, C.yel, t >= t0 ? 1 : 0);
  text(ctx, 'LINES OF CODE', cx, s.y + 615, font(48, 800, UI), C.chalk, 'center', 4);
  chip(ctx, 'WRITTEN IN LEAN · A COMPUTER CAN CHECK IT', cx, s.y + 980, 34, pop(t, T('code.')), { bg: C.chalk });
}
// ---------------------------------------------------------------- E: 250,000 PAGES
function sE(ctx, t) {
  slate(ctx, t);
  const t0 = T('250,000 pages.') - 0.05, p = E.outCubic(prog(t, t0, t0 + 1.4));
  const baseY = s.y + 1040, n = Math.floor(8 + 52 * p);
  for (let i = 0; i < n; i++) { const yy = baseY - i * 14, xo = (hash01(i, 41) - 0.5) * 30, r = (hash01(i, 42) - 0.5) * 0.06;
    ctx.save(); ctx.translate(cx + 190 + xo, yy); ctx.rotate(r); ctx.fillStyle = i % 2 ? C.paper : '#E6E1D2'; ctx.fillRect(-170, -7, 340, 12);
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(-170, 5, 340, 2); ctx.restore(); }
  // flying page
  const fp = ((t - t0) * 2.2) % 1; if (t > t0 && p < 1) { ctx.save(); ctx.translate(lerp(W + 120, cx + 190, fp), lerp(s.y - 60, baseY - n * 14, fp)); ctx.rotate(lerp(-0.6, 0, fp)); ctx.fillStyle = C.paper; ctx.fillRect(-90, -120, 180, 240); ctx.restore(); }
  text(ctx, 'WRITTEN OUT', s.x + 20, s.y + 280, font(46, 800, UI), C.dim, 'left', 3);
  big(ctx, fmt(250000 * p), s.x + 230, s.y + 440, 130, C.yel, t >= t0 - 0.3 ? 1 : 0, { max: 460 });
  text(ctx, 'PAGES+', s.x + 230, s.y + 520, font(56, 800, D), C.chalk, 'center', 3);
  chip(ctx, 'his estimate', s.x + 230, s.y + 610, 30, pop(t, t0 + 0.4), { bg: C.chalk });
}
// ---------------------------------------------------------------- F: no human has read it all
function sF(ctx, t) {
  slate(ctx, t);
  // page wall
  for (let i = 0; i < 9; i++) { const c = i % 3, r = Math.floor(i / 3); const x = s.x + 80 + c * 260, y = s.y + 170 + r * 190;
    ctx.fillStyle = 'rgba(244,241,232,0.16)'; ctx.fillRect(x, y, 220, 160);
    for (let l = 0; l < 6; l++) { ctx.fillStyle = 'rgba(238,237,230,0.25)'; ctx.fillRect(x + 18, y + 22 + l * 22, 120 + 60 * hash01(i * 9 + l, 51), 8); } }
  // magnifier gliding across
  const mx = s.x + 160 + (s.w - 320) * (0.5 + 0.5 * Math.sin((t - S.F) * 2.2 - 1.5)), my = s.y + 420 + 80 * Math.sin((t - S.F) * 1.3);
  const km = pop(t, T('human') - 0.1);
  if (km > 0) { ctx.save(); ctx.translate(mx, my); ctx.scale(km, km); ctx.beginPath(); ctx.arc(0, 0, 110, 0, TAU); ctx.fillStyle = 'rgba(143,211,255,0.12)'; ctx.fill(); stroke(ctx, 12, C.chalk);
    ctx.beginPath(); ctx.moveTo(78, 78); ctx.lineTo(170, 170); stroke(ctx, 26, C.wood); ctx.restore(); }
  stamp(ctx, 'NOT YET', cx, s.y + 560, 120, t, T('yet.'), C.pink, 0.1);
  // experts: three reviewer magnifiers with ? marks
  for (let i = 0; i < 3; i++) { const k = pop(t, T('Experts') + i * 0.12); if (k <= 0) continue; const x = cx + (i - 1) * 260, y = s.y + 860;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.beginPath(); ctx.arc(0, 0, 70, 0, TAU); ctx.fillStyle = 'rgba(10,14,12,0.7)'; ctx.fill(); stroke(ctx, 7, C.blue);
    text(ctx, '?', 0, 32, font(96, 800, D), C.blue, 'center'); ctx.restore(); }
  if (t >= T('Experts')) text(ctx, 'EXPERTS CHECKING', cx, s.y + 1000, font(40, 800, UI), C.blue, 'center', 3);
}
// ---------------------------------------------------------------- G1: if it holds — timeline 1859 → 2026
function sG1(ctx, t, IMG) {
  slate(ctx, t);
  big(ctx, 'IF IT HOLDS…', cx, s.y + 330, 120, C.yel, pop(t, S.G1 + 0.05));
  const y = s.y + 560, x0 = s.x + 60, x1 = s.x + s.w - 60, p = E.inOutCubic(prog(t, T('a 167-year') - 0.05, T('a 167-year') + 1.0));
  chalkPath(ctx, [[x0, y], [x1, y]], p, 9, C.chalk);
  [[x0, '1859', 'Riemann'], [x1, '2026', 'Alpöge']].forEach(([x, yr, who], i) => { const k = pop(t, T('a 167-year') + i * 0.9); if (k <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.beginPath(); ctx.arc(0, 0, 18, 0, TAU); ctx.fillStyle = C.yel; ctx.fill();
    text(ctx, yr, 0, -50, font(60, 800, D), C.chalk, 'center'); text(ctx, who, 0, 70, font(36, 700, UI), C.dim, 'center'); ctx.restore(); });
  const k = pop(t, T('a 167-year') + 0.5); if (k > 0) chip(ctx, '167 YEARS', cx + 200, y + 150, 54, k);
  photo(ctx, IMG.gott, s.x + 210, y + 250, 360, 280, t, T('a 167-year'), { rot: -0.04, fy: 0.5, k: pop(t, T('a 167-year') + 0.1), tag: 'GÖTTINGEN', sub: "RIEMANN'S UNIVERSITY", tagT: T('a 167-year') + 0.3, credit: 'Julian Herzog, CC BY 4.0' });
}
// ---------------------------------------------------------------- G2: primes — mystery cracked
function sG2(ctx, t) {
  slate(ctx, t);
  const P = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
  P.forEach((q, i) => { const k = pop(t, S.G2 + 0.05 + i * 0.09); if (k <= 0) return; const c = i % 5, r = Math.floor(i / 5);
    const x = s.x + 100 + c * ((s.w - 200) / 4), y = s.y + 330 + r * 170; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    text(ctx, String(q), 0, 0, font(100, 800, D), i % 4 === 0 ? C.yel : C.chalk, 'center'); ctx.restore(); });
  text(ctx, 'THE PRIME NUMBERS', cx, s.y + 830, font(50, 800, UI), C.dim, 'center', 4);
  // chalk crack across the board on "cracked"
  const pc = prog(t, T('cracked.') - 0.05, T('cracked.') + 0.25);
  if (pc > 0) { const pts = []; for (let i = 0; i <= 14; i++) pts.push([lerp(0, W, i / 14), s.y + 600 + (hash01(i, 61) - 0.5) * 120 + (i % 2 ? 30 : -30)]);
    chalkPath(ctx, pts, pc, 10, C.ink); chalkPath(ctx, pts, pc, 3, C.chalk); }
  big(ctx, 'CRACKED?', cx, s.y + 980, 150, C.yel, slam(t, T('cracked.'), 2.0), { rot: -0.04 });
}
// ---------------------------------------------------------------- H: end card
function envelope(ctx, x, y, w) {
  const h = w * 0.66; ctx.save(); ctx.translate(x, y); rrect(ctx, -w / 2, -h / 2, w, h, 4); ctx.fillStyle = C.chalk; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(0, h * 0.1); ctx.lineTo(w / 2, -h / 2); stroke(ctx, 4, C.ink); ctx.restore();
}
function sH(ctx, t) {
  slate(ctx, t);
  big(ctx, '167 YEARS · $1M', cx, s.y + 280, 100, C.yel, pop(t, S.Hh - 0.1));
  text(ctx, 'A CLAIM — NOT VERIFIED YET', cx, s.y + 360, font(40, 800, UI), C.pink, 'center', 2);
  text(ctx, 'WHYVERSE', cx, s.y + 540, font(96, 800, D), C.chalk, 'center', 8);
  const btn = (x, label, bg, k, icon, rot) => { if (k <= 0) return; ctx.save(); ctx.translate(x, s.y + 720); ctx.rotate(rot); ctx.scale(k, k);
    rrect(ctx, -190, -72, 380, 144, 72); ctx.fillStyle = bg; ctx.fill(); stroke(ctx, 5, C.ink); icon(); text(ctx, label, 45, 24, font(62, 800, D), C.ink, 'center'); ctx.restore(); };
  btn(cx - 205, 'LIKE', C.chalk, pop(t, T('Like') - 0.05), () => { const hb = 1 + 0.15 * Math.max(0, Math.sin((t - T('Like')) * 9)) * Math.exp(-(t - T('Like')) * 2);
    ctx.save(); ctx.translate(-105, 6); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30); ctx.fillStyle = C.pink; ctx.fill(); ctx.restore(); }, -0.04);
  btn(cx + 205, 'FOLLOW', C.yel, pop(t, T('follow') - 0.05), () => { ctx.save(); ctx.translate(-115, 4); ctx.lineWidth = 13; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-24, 0); ctx.lineTo(24, 0); ctx.moveTo(0, -24); ctx.lineTo(0, 24); ctx.stroke(); ctx.restore(); }, 0.04);
  const kS = pop(t, T('more.') + 0.3);
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 910); ctx.scale(kS, kS); rrect(ctx, -420, -72, 840, 144, 18); ctx.fillStyle = 'rgba(10,14,12,0.85)'; ctx.fill(); stroke(ctx, 4, C.wood);
    envelope(ctx, -350, 0, 70);
    text(ctx, 'Send this to the friend', 40, -12, font(40, 800, UI), C.chalk, 'center'); text(ctx, 'who hated math class', 40, 40, font(40, 800, UI), C.yel, 'center'); ctx.restore(); }
  text(ctx, 'Sources: Al Jazeera, Scientific American, Tom\'s Hardware, alpo.ge (20–21 Nov 2026)', cx, s.y + 1060, font(23, 600, UI), C.dim, 'center');
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 600, UI), font(40, 700, UI)],
  images: { paper: 'assets/2026-11-22_W_paper1859.jpg', gott: 'assets/2026-11-22_W_goettingen.jpg', harv: 'assets/2026-11-22_W_harvard.jpg', zeta: 'assets/2026-11-22_W_zeta.jpg', riemann: 'assets/2026-11-22_T_riemann.jpg', a24: 'assets/2026-11-22_T_alpoge_2024.jpg', a18: 'assets/2026-11-22_T_alpoge_2018.jpg' },
  hits: HITS,
  init() { initSlate(); },
  draw(ctx, u, t, IMG) {
    const seq = [[S.A, sA], [S.B1, sB1], [S.B2, sB2], [S.C1, sC1], [S.C1b, sC1b], [S.C2, sC2], [S.D, sD], [S.E, sE], [S.F, sF], [S.G1, sG1], [S.G2, sG2], [S.Hh, sH]];
    let i = seq.length - 1; while (i > 0 && t < seq[i][0] - 0.18) i--;
    const cur = seq[i], nxt = seq[i + 1];
    if (nxt && t > nxt[0] - 0.18) wipe(ctx, t, nxt[0], () => cur[1](ctx, t, IMG), () => nxt[1](ctx, t, IMG));
    else if (i > 0 && t < cur[0] + 0.15) wipe(ctx, t, cur[0], () => seq[i - 1][1](ctx, t, IMG), () => cur[1](ctx, t, IMG));
    else cur[1](ctx, t, IMG);
    if (t < S.Hh - 0.15) board(ctx, t);
    captions(ctx, t);
  },
  post(ctx, u, t) { const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.35)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); },
});
