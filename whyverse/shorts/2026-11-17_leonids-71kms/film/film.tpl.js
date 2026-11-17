// "71 km every second" — Whyverse 23:00 London animated fact Short, 17 Nov 2026. Pure function of time.
// Leonid meteor shower peaks 17/18 Nov 2026 (~23:45 UTC 17 Nov, Space.com / 0 UTC 18 Nov, EarthSky).
// Look: LINE ART on the Whyverse navy night sky — thin single-weight lines drawing themselves on, gold accent, coral second.
// Persistent world: one night sky + line-art horizon + a running METEORS / HOUR meter at the bottom.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, hash01, clamp, TAU } = M;

const TIMING = __TIMING__;
const C = {
  navy: '#0A1030', navy2: '#141D4A', navy3: '#1E2A63', line: '#9DB2FF', white: '#F6F3EA', gold: '#FFC447', gold2: '#E9A21F',
  coral: '#FF6F5E', dim: '#5E6CA8',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const LN = (i) => TIMING.lines[i].t0;
const END = 24.0;
const S = { A: 0, B: LN(1) - 0.1, C: LN(2) - 0.1, D: LN(3) - 0.1, E: LN(4) - 0.1, F: LN(5) - 0.1, G: LN(6) - 0.1 };
const B = (t) => t / 0.500034;

// ---------------------------------------------------------------- helpers
function bg(ctx, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, C.navy); g.addColorStop(0.7, C.navy2); g.addColorStop(1, C.navy3);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 170; i++) { const x = hash01(i, 1) * W, y = hash01(i, 2) * H * 0.82, r = 1 + 2.2 * hash01(i, 3) ** 3;
    const tw = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(t * (1 + 2 * hash01(i, 4)) + i));
    ctx.globalAlpha = tw * (0.35 + 0.65 * hash01(i, 5)); ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }
  ctx.globalAlpha = 1;
}
function horizon(ctx, t, k = 1) { // line-art hills + a small stargazer silhouette (persistent world)
  const y0 = H - 330;
  ctx.save(); ctx.globalAlpha = k;
  ctx.fillStyle = '#070B22'; ctx.beginPath(); ctx.moveTo(0, H);
  for (let x = 0; x <= W; x += 20) ctx.lineTo(x, y0 + 40 * Math.sin(x / 210) + 22 * Math.sin(x / 77 + 1.3));
  ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
  ctx.lineWidth = 3; ctx.strokeStyle = C.line; ctx.beginPath();
  for (let x = 0; x <= W; x += 20) { const y = y0 + 40 * Math.sin(x / 210) + 22 * Math.sin(x / 77 + 1.3); x ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
  ctx.stroke();
  // stargazer: sitting figure, head tilted up (silhouette, no face)
  const gx = 250, gy = y0 + 40 * Math.sin(250 / 210) + 22 * Math.sin(250 / 77 + 1.3) - 2;
  ctx.fillStyle = '#04061A'; ctx.strokeStyle = C.line; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.ellipse(gx, gy - 95, 24, 26, -0.35, 0, TAU); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(gx - 30, gy); ctx.quadraticCurveTo(gx - 34, gy - 50, gx - 8, gy - 70); ctx.lineTo(gx + 16, gy - 66);
  ctx.quadraticCurveTo(gx + 30, gy - 30, gx + 70, gy - 20); ctx.lineTo(gx + 74, gy); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}
// meteor: head moving along a line with a tapered glowing tail
function meteor(ctx, x0, y0, ang, len, t, t0, dur, { w = 4, col = C.white, tail = 260, alpha = 1 } = {}) {
  const p = (t - t0) / dur; if (p < 0 || p > 1.35) return;
  const q = Math.min(1, p), dx = Math.cos(ang), dy = Math.sin(ang);
  const hx = x0 + dx * len * E.outQuad(q), hy = y0 + dy * len * E.outQuad(q);
  const tl = tail * Math.min(1, p * 3) * (p > 1 ? Math.max(0, 1 - (p - 1) / 0.35) : 1);
  const fade = p > 1 ? Math.max(0, 1 - (p - 1) / 0.35) : 1;
  const g = ctx.createLinearGradient(hx, hy, hx - dx * tl, hy - dy * tl);
  g.addColorStop(0, col); g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.save(); ctx.globalAlpha = alpha * fade; ctx.strokeStyle = g; ctx.lineWidth = w; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx - dx * tl, hy - dy * tl); ctx.stroke();
  ctx.fillStyle = col; ctx.beginPath(); ctx.arc(hx, hy, w * 0.9, 0, TAU); ctx.fill(); ctx.restore();
}
// meteors radiating from a point (the Leonid radiant), n per second from tStart
function shower(ctx, t, tS, tE, rate, { rx = cx + 120, ry = s.y + 420, seed = 1, w = 4, tail = 240, len = 520 } = {}) {
  if (t < tS) return;
  const n = Math.floor((Math.min(t, tE + 1) - tS) * rate) + 1;
  for (let i = Math.max(0, n - Math.ceil(rate * 1.4)); i < n; i++) {
    const t0 = tS + i / rate; if (t0 > tE) break;
    const a = TAU * hash01(i, seed), r0 = 40 + 200 * hash01(i, seed + 1);
    meteor(ctx, rx + Math.cos(a) * r0, ry + Math.sin(a) * r0, a, len * (0.6 + 0.6 * hash01(i, seed + 2)), t, t0, 0.55 + 0.3 * hash01(i, seed + 3), { w, tail });
  }
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
function lineDraw(ctx, pts, p, col = C.line, w = 4) { // polyline drawing itself on
  if (p <= 0) return; let L = 0; const seg = [];
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let left = L * Math.min(1, p); ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length && left > 0; i++) { const f = Math.min(1, left / seg[i - 1]);
    ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); left -= seg[i - 1]; }
  ctx.stroke(); ctx.restore();
}
function sceneFade(t, a, b, f = 0.22) { return clamp(Math.min((t - a) / f + 1, (b - t) / f + 1)); }

// ---------------------------------------------------------------- persistent meter (bottom of the safe area)
function rateAt(t) {
  if (t < S.D) return null;
  if (t < S.E) { const k = E.outCubic(prog(t, T('10') - 0.1, T('15') + 0.3)); return Math.round(lerp(0, 15, k)); }
  if (t < S.F) { const k = E.inOutCubic(prog(t, T('150,000') - 0.6, T('150,000') + 0.5)); return Math.round(lerp(15, 150000, k) / (k < 1 ? 1 : 1)); }
  return 15;
}
function meter(ctx, t) {
  const y = s.y + s.h - 70, k = sp(t, 0.15, SPRING.gentle);
  ctx.save(); ctx.globalAlpha = clamp(k); ctx.translate(0, (1 - k) * 60);
  ctx.fillStyle = 'rgba(6,9,30,0.82)'; M.rrect(ctx, s.x + 10, y - 62, s.w - 20, 124, 26); ctx.fill();
  ctx.lineWidth = 3; ctx.strokeStyle = C.line; ctx.stroke();
  const r = rateAt(t);
  if (r === null) { // speed readout first
    text(ctx, 'SPEED', s.x + 50, y - 12, font(30, 800, UI), C.line, 'left');
    text(ctx, 'km per second', s.x + 50, y + 30, font(30, 700, UI), C.dim, 'left');
    const v = Math.round(lerp(0, 71, E.outCubic(prog(t, 0.0, 0.9))));
    big(ctx, `${v}`, s.x + s.w - 60, y + 30, 92, C.gold, 1, { align: 'right' });
  } else {
    text(ctx, 'METEORS', s.x + 50, y - 12, font(30, 800, UI), C.line, 'left');
    text(ctx, 'per hour', s.x + 50, y + 30, font(30, 700, UI), C.dim, 'left');
    const hot = t >= S.E && t < S.F;
    big(ctx, (hot && r > 15 ? 'up to ' : '') + r.toLocaleString('en-US'), s.x + s.w - 60, y + 30, hot && r > 999 ? 80 : 92, hot ? C.coral : C.gold, 1, { align: 'right' });
  }
  ctx.restore();
}

// ---------------------------------------------------------------- captions (top), word by word
function captions(ctx, t) {
  const L = TIMING.lines; const li = L.findIndex((l, i) => t >= l.t0 - 0.05 && t < (L[i + 1] ? L[i + 1].t0 - 0.05 : END)); if (li < 0) return;
  if (li === 0) return; // the hook numbers are the caption on the first line
  if (li === 6) return; // end card carries its own words
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

// ---------------------------------------------------------------- A: hook — 71 km every second
function sHook(ctx, t) {
  // one big fireball crossing on frame 0 + a few more
  meteor(ctx, W + 80, s.y + 120, Math.PI * 0.78, 1500, t, -0.25, 1.1, { w: 9, tail: 520, col: C.gold });
  meteor(ctx, W - 100, s.y - 80, Math.PI * 0.74, 900, t, 0.9, 0.7, { w: 5, tail: 300 });
  meteor(ctx, W + 40, s.y + 520, Math.PI * 0.8, 800, t, 1.55, 0.6, { w: 4, tail: 260 });
  tag(ctx, 'LEONIDS · TONIGHT', cx, s.y + 150, 56, 1, { rot: -0.02 });
  const k = Math.max(0.92, pop(t, -0.4));
  big(ctx, '71', cx - 60, s.y + 620, 360, C.gold, k, { rot: -0.03 });
  big(ctx, 'km', cx + 270, s.y + 620, 130, C.white, Math.max(0.92, pop(t, -0.4)), { rot: -0.03 });
  big(ctx, 'EVERY', cx, s.y + 800, 110, C.white, Math.max(0.92, pop(t, -0.4)));
  big(ctx, 'SECOND', cx, s.y + 950, 130, C.coral, Math.max(0.92, pop(t, -0.4)) * (1 + 0.08 * Math.max(0, Math.sin((t - T('second.')) * 10)) * Math.exp(-Math.max(0, t - T('second.')) * 3) * (t > T('second.') ? 1 : 0)), { rot: 0.02 });
}
// ---------------------------------------------------------------- B: how fast — London to Paris map route
function sFast(ctx, t) {
  const t0 = S.B, a = sceneFade(t, t0 + 0.1, S.C);
  ctx.save(); ctx.globalAlpha = a;
  // simple line-art coastlines: England south coast + France north coast
  const L = [[s.x + 40, s.y + 330], [s.x + 180, s.y + 360], [s.x + 300, s.y + 340], [s.x + 420, s.y + 380], [s.x + 560, s.y + 360], [s.x + 640, s.y + 330]];
  const F = [[s.x + 140, s.y + 720], [s.x + 300, s.y + 640], [s.x + 480, s.y + 610], [s.x + 640, s.y + 560], [s.x + 780, s.y + 600], [s.x + 840, s.y + 660]];
  lineDraw(ctx, L, prog(t, t0, t0 + 0.6), C.line, 4); lineDraw(ctx, F, prog(t, t0 + 0.1, t0 + 0.7), C.line, 4);
  text(ctx, 'UK', s.x + 120, s.y + 290, font(34, 800, UI), C.dim, 'left'); text(ctx, 'FRANCE', s.x + 560, s.y + 760, font(34, 800, UI), C.dim, 'left');
  const A = [s.x + 330, s.y + 250], P = [s.x + 560, s.y + 880];
  const kp = pop(t, t0 + 0.3);
  for (const [pt, name, col] of [[A, 'LONDON', C.white], [P, 'PARIS', C.white]]) {
    ctx.save(); ctx.translate(pt[0], pt[1]); ctx.scale(kp, kp); ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(0, 0, 14, 0, TAU); ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = C.gold; ctx.beginPath(); ctx.arc(0, 0, 26, 0, TAU); ctx.stroke(); ctx.restore();
    text(ctx, name, pt[0] + 40, pt[1] + 14, font(48, 800, UI), col, 'left');
  }
  // the meteor runs the route in < 5 s (shown sped up as a dashed route + clock)
  const rp = E.inOutCubic(prog(t, T('fast') - 0.1, T('fast') + 1.4));
  ctx.save(); ctx.setLineDash([18, 14]); lineDraw(ctx, [A, P], rp, C.gold, 5); ctx.restore();
  meteor(ctx, A[0], A[1], Math.atan2(P[1] - A[1], P[0] - A[0]), Math.hypot(P[0] - A[0], P[1] - A[1]), t, T('fast') - 0.1, 1.5, { w: 7, tail: 200, col: C.gold });
  const secs = (rp * 4.8).toFixed(1);
  tag(ctx, `${secs} s`, s.x + 230, s.y + 960, 64, pop(t, T('fast')), { bg: C.coral, fg: C.white, rot: -0.03 });
  tag(ctx, '344 km', s.x + 620, s.y + 960, 48, pop(t, T('fast') + 0.3), { bg: C.navy3, fg: C.white, rot: 0.03 });
  tag(ctx, 'LONDON → PARIS IN UNDER 5 SECONDS', cx, s.y + 1060, 36, pop(t, T('fast') + 1.2), { bg: C.gold, rot: -0.01 });
  ctx.restore();
}
// ---------------------------------------------------------------- C: the comet — orbit drawing on, 33 years counter
function sComet(ctx, t) {
  const t0 = S.C, a = sceneFade(t, t0 + 0.1, S.D);
  ctx.save(); ctx.globalAlpha = a;
  const ox = cx + 60, oy = s.y + 640, rxE = 330, ryE = 150, rot = -0.42;
  // Sun + Earth orbit (circle) + comet orbit (long ellipse)
  ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(cx - 180, oy + 40, 30 * pop(t, t0), 0, TAU); ctx.fill();
  const eo = []; for (let i = 0; i <= 64; i++) { const q = i / 64 * TAU; eo.push([cx - 180 + Math.cos(q) * 130, oy + 40 + Math.sin(q) * 130]); }
  lineDraw(ctx, eo, prog(t, t0, t0 + 0.7), C.dim, 3);
  const co = []; for (let i = 0; i <= 96; i++) { const q = i / 96 * TAU, x = Math.cos(q) * rxE + 240, y = Math.sin(q) * ryE;
    co.push([ox + x * Math.cos(rot) - y * Math.sin(rot) - 150, oy + x * Math.sin(rot) + y * Math.cos(rot) + 40]); }
  lineDraw(ctx, co, prog(t, t0 + 0.2, t0 + 1.4), C.line, 4);
  // comet travelling its orbit, tail away from the Sun; dust dots left behind
  const cq = (t - t0) * 0.55 + 2.6, cxp = Math.cos(cq) * rxE + 240, cyp = Math.sin(cq) * ryE;
  const px = ox + cxp * Math.cos(rot) - cyp * Math.sin(rot) - 150, py = oy + cxp * Math.sin(rot) + cyp * Math.cos(rot) + 40;
  const kc = pop(t, T('comet') - 0.2);
  if (kc > 0) {
    const ang = Math.atan2(py - (oy + 40), px - (cx - 180));
    const g = ctx.createLinearGradient(px, py, px + Math.cos(ang) * 200, py + Math.sin(ang) * 200); g.addColorStop(0, 'rgba(157,178,255,0.9)'); g.addColorStop(1, 'rgba(157,178,255,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(px, py - 14); ctx.lineTo(px + Math.cos(ang) * 200 - Math.sin(ang) * 50, py + Math.sin(ang) * 200 + Math.cos(ang) * 50);
    ctx.lineTo(px + Math.cos(ang) * 200 + Math.sin(ang) * 50, py + Math.sin(ang) * 200 - Math.cos(ang) * 50); ctx.lineTo(px, py + 14); ctx.fill();
    ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(px, py, 14 * kc, 0, TAU); ctx.fill();
    for (let i = 0; i < 40; i++) { const q = cq - 0.05 - i * 0.04, x = Math.cos(q) * rxE + 240, y = Math.sin(q) * ryE;
      ctx.globalAlpha = a * (1 - i / 40) * 0.8; ctx.fillStyle = C.gold;
      ctx.beginPath(); ctx.arc(ox + x * Math.cos(rot) - y * Math.sin(rot) - 150 + 10 * (hash01(i, 7) - 0.5), oy + x * Math.sin(rot) + y * Math.cos(rot) + 40 + 10 * (hash01(i, 8) - 0.5), 3, 0, TAU); ctx.fill(); }
    ctx.globalAlpha = a;
  }
  tag(ctx, 'SUN', cx - 180, oy + 120, 30, pop(t, t0 + 0.2), { bg: C.navy3, fg: C.gold });
  tag(ctx, 'EARTH', cx - 180, oy - 120, 30, pop(t, t0 + 0.4), { bg: C.navy3, fg: C.white });
  tag(ctx, 'COMET TEMPEL-TUTTLE', cx, s.y + 300, 40, pop(t, T('comet') - 0.05), { bg: C.white, fg: C.navy, rot: -0.02 });
  tag(ctx, 'LEONIDS = ITS DUST', cx, s.y + 380, 36, pop(t, T('Leonids:') - 0.05), { bg: C.gold, rot: 0.02 });
  // orbit counter
  const kY = pop(t, T('33') - 0.1);
  if (kY > 0) { const yrs = Math.round(lerp(0, 33, E.outCubic(prog(t, T('33') - 0.2, T('33') + 0.5))));
    big(ctx, `${yrs}`, cx - 70, s.y + 1020, 190, C.gold, kY); big(ctx, 'YEARS', cx + 190, s.y + 1000, 74, C.white, pop(t, T('years.') - 0.05));
    text(ctx, 'one lap · next return 2031', cx, s.y + 1090, font(36, 700, UI), C.line, 'center'); }
  ctx.restore();
}
// ---------------------------------------------------------------- D: most years — 10 to 15 an hour
function sNormal(ctx, t) {
  const t0 = S.D, a = sceneFade(t, t0 + 0.1, S.E);
  ctx.save(); ctx.globalAlpha = a;
  // radiant: lion's head area (Leo) — small line-art constellation hint
  const R = [[cx + 40, s.y + 380], [cx + 120, s.y + 330], [cx + 200, s.y + 360], [cx + 230, s.y + 440], [cx + 170, s.y + 500], [cx + 260, s.y + 560]];
  lineDraw(ctx, R, prog(t, t0, t0 + 0.9), C.dim, 3);
  R.forEach((p, i) => { ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(p[0], p[1], 6 * pop(t, t0 + i * 0.1), 0, TAU); ctx.fill(); });
  tag(ctx, 'FROM THE LION · LEO', cx + 150, s.y + 280, 30, pop(t, t0 + 0.5), { bg: C.navy3, fg: C.line });
  // a handful of meteors (about one every 0.7 s — "10–15 an hour", sped up)
  [[0.2, 0.9], [0.95, 2.4], [1.6, 3.8], [2.2, 5.2]].forEach(([dt, ang], i) => meteor(ctx, cx + 150, s.y + 440, ang, 560, t, t0 + dt, 0.6, { w: 4, tail: 240 }));
  const k = pop(t, T('10') - 0.08);
  big(ctx, '10–15', cx, s.y + 860, 210, C.gold, k);
  big(ctx, 'AN HOUR', cx, s.y + 990, 90, C.white, pop(t, T('hour.') - 0.05));
  tag(ctx, 'A NORMAL YEAR', cx, s.y + 1090, 38, pop(t, T('Most') + 0.1), { bg: C.white, rot: -0.02 });
  ctx.restore();
}
// ---------------------------------------------------------------- E: 1833 — the storm
function sStorm(ctx, t) {
  const t0 = S.E, a = sceneFade(t, t0 + 0.1, S.F);
  ctx.save(); ctx.globalAlpha = a;
  const storm = prog(t, T('150,000') - 0.8, T('150,000') + 0.2);
  shower(ctx, t, t0 + 0.2, S.F + 0.3, 6 + 70 * storm * storm, { seed: 3, w: 3, tail: 200 });
  tag(ctx, '12–13 NOVEMBER', cx, s.y + 300, 40, pop(t, T('1833,') - 0.1), { bg: C.white, rot: -0.03 });
  big(ctx, '1833', cx, s.y + 520, 240, C.white, pop(t, T('1833,') - 0.08), { rot: -0.02 });
  const k = pop(t, T('150,000') - 0.08);
  big(ctx, 'UP TO', cx, s.y + 700, 70, C.line, k);
  big(ctx, '150,000', cx, s.y + 880, 200, C.coral, k, { rot: 0.02 });
  big(ctx, 'AN HOUR', cx, s.y + 1000, 90, C.white, pop(t, T('hour.', 1) - 0.05));
  tag(ctx, '≈ 40 EVERY SECOND', cx, s.y + 1075, 38, pop(t, T('hour.', 1) + 0.25), { bg: C.gold, rot: 0.02 });
  ctx.restore();
}
// ---------------------------------------------------------------- F: tonight — clock to midnight
function sTonight(ctx, t) {
  const t0 = S.F, a = sceneFade(t, t0 + 0.1, S.G - 0.15, 0.15);
  ctx.save(); ctx.globalAlpha = a;
  shower(ctx, t, t0, S.G, 1.6, { seed: 9, w: 4, tail: 240 });
  const ccx = cx, ccy = s.y + 600, r = 190;
  const circ = []; for (let i = 0; i <= 72; i++) { const q = -Math.PI / 2 + i / 72 * TAU; circ.push([ccx + Math.cos(q) * r, ccy + Math.sin(q) * r]); }
  lineDraw(ctx, circ, prog(t, t0, t0 + 0.6), C.line, 5);
  for (let i = 0; i < 12; i++) { const q = i / 12 * TAU; ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.globalAlpha = a * clamp((t - t0 - 0.3) * 4);
    ctx.beginPath(); ctx.moveTo(ccx + Math.sin(q) * (r - 20), ccy - Math.cos(q) * (r - 20)); ctx.lineTo(ccx + Math.sin(q) * (r - 40), ccy - Math.cos(q) * (r - 40)); ctx.stroke(); }
  ctx.globalAlpha = a;
  const sw = E.inOutCubic(prog(t, T('Look') - 0.2, T('midnight.') + 0.2)); // hands sweep from 9 pm to 12
  const hq = lerp(-Math.PI / 2 * 1, 0, sw) , mq = lerp(0, TAU * 3, sw);
  ctx.lineCap = 'round'; ctx.strokeStyle = C.white; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(ccx, ccy); ctx.lineTo(ccx + Math.sin(hq) * 100, ccy - Math.cos(hq) * 100); ctx.stroke();
  ctx.strokeStyle = C.gold; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(ccx, ccy); ctx.lineTo(ccx + Math.sin(mq) * 150, ccy - Math.cos(mq) * 150); ctx.stroke();
  ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(ccx, ccy, 12, 0, TAU); ctx.fill();
  tag(ctx, 'PEAK TONIGHT · 17–18 NOV', cx, s.y + 300, 42, pop(t, T('peak') - 0.08), { bg: C.gold, rot: -0.02 });
  big(ctx, 'AFTER MIDNIGHT', cx, s.y + 920, 96, C.white, pop(t, T('midnight.') - 0.1));
  tag(ctx, 'NO TELESCOPE NEEDED', cx, s.y + 1030, 36, pop(t, T('midnight.') + 0.3), { bg: C.navy3, fg: C.line });
  ctx.restore();
}
// ---------------------------------------------------------------- G: end card
function sEnd(ctx, t) {
  const t0 = S.G, a = clamp((t - t0 - 0.05) / 0.2);
  ctx.save(); ctx.globalAlpha = a;
  shower(ctx, t, t0, END, 2.2, { seed: 13, w: 3, tail: 200, rx: cx, ry: s.y + 260 });
  big(ctx, '71 km/s', cx, s.y + 330, 110, C.gold, pop(t, t0 - 0.05));
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
    text(ctx, 'always misses shooting stars', 40, 38, font(38, 800, UI), C.gold, 'center');
    ctx.restore(); }
  ctx.restore();
}

const HITS = [
  [B(0.02), '71', 'thud'], [B(T('km')), 'km', 'click'], [B(T('Every')), 'every', 'tick'], [B(T('second.')), 'second', 'pop', { pitch: 'D5' }],
  [B(S.B), 'map', 'whoosh', { len: 0.4, from: 1600, to: 400 }], [B(T('fast') - 0.1), 'route', 'whoosh', { len: 1.2, from: 500, to: 1800 }], [B(T('fast') + 1.2), 'tag', 'click'],
  [B(S.C), 'orbit', 'whoosh', { len: 0.4, from: 600, to: 1800 }], [B(T('comet') - 0.05), 'comet', 'pop', { pitch: 'A4' }], [B(T('33') - 0.1), 'years', 'type', { len: 0.6, n: 8 }], [B(T('years.')), '33', 'pop', { pitch: 'D5' }],
  [B(S.D), 'sky', 'whoosh', { len: 0.35, from: 1800, to: 600 }], [B(T('10') - 0.08), '10-15', 'pop', { pitch: 'F#4' }], [B(T('hour.') - 0.05), 'hour', 'tick'],
  [B(S.E), 'storm', 'whoosh', { len: 0.4, from: 600, to: 2000 }], [B(T('1833,') - 0.08), '1833', 'thud'], [B(T('150,000') - 0.6), 'counter', 'type', { len: 1.1, n: 14 }], [B(T('150,000') - 0.08), '150k', 'pop', { pitch: 'A5' }],
  [B(S.F), 'clock', 'whoosh', { len: 0.35, from: 2000, to: 600 }], [B(T('peak') - 0.08), 'peak', 'click'], [B(T('midnight.') - 0.1), 'midnight', 'blip', { pitch: 'D5' }],
  [B(S.G), 'end', 'whoosh', { len: 0.35, from: 600, to: 1600 }], [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop', { pitch: 'A5' }], [B(T('more.') + 0.1), 'send', 'click'],
];

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI)], samples: 6,
  hits: HITS,
  draw(ctx, u, t) {
    bg(ctx, t);
    const shift = (t0, d = 1) => { const p = E.inOutCubic(prog(t, t0 - 0.2, t0 + 0.2)); return p; };
    // slow camera drift through the one sky
    ctx.save(); ctx.translate(0, Math.sin(t * 0.3) * 6);
    if (t < S.B + 0.25) { ctx.save(); ctx.globalAlpha = 1 - shift(S.B); ctx.translate(-shift(S.B) * 300, 0); sHook(ctx, t); ctx.restore(); }
    if (t >= S.B - 0.2 && t < S.C + 0.25) sFast(ctx, t);
    if (t >= S.C - 0.2 && t < S.D + 0.25) sComet(ctx, t);
    if (t >= S.D - 0.2 && t < S.E + 0.25) sNormal(ctx, t);
    if (t >= S.E - 0.2 && t < S.F + 0.25) sStorm(ctx, t);
    if (t >= S.F - 0.2 && t < S.G + 0.25) sTonight(ctx, t);
    if (t >= S.G - 0.05) sEnd(ctx, t);
    ctx.restore();
    horizon(ctx, t);
    if (t < S.G - 0.1) meter(ctx, t);
    captions(ctx, t);
  },
});
