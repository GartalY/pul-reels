// "4,068 days" — Whyverse daily trend Short, 16 Nov 2026. Pure function of time.
// Ronaldinho (46) started for Ravenna (Serie C) v Forli on Sun 15 Nov 2026 — first competitive match since 26 Sept 2015 (Fluminense).
// Kokoro af_heart VO on audio/vo.wav; every caption word / object lands on its spoken word (TIMING from the VO edit).
// Structure from the AZ football reel (reels/2026-11-14_1830): number on frame 0, persistent scorebug (DAYS AWAY -> RAV v FOR),
// flashback (2015 -> 2026 day counter), ladder (Serie A/B/C), twist (he's also an investor), payoff (quote), LIKE + FOLLOW end card.
// Look: VINTAGE COMIC (cream newsprint, halftone dots, thick ink outlines, panel frames, red/yellow/blue, speech bubbles, ink silhouette).
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = {"dur": 21.552, "lines": [{"t0": 0.1, "t1": 1.878, "words": [{"w": "4,068", "t": 0.18, "key": true}, {"w": "days.", "t": 1.525, "key": true}]}, {"t0": 2.25, "t1": 5.571, "words": [{"w": "That's", "t": 2.28, "key": false}, {"w": "how", "t": 2.606, "key": false}, {"w": "long", "t": 2.838, "key": false}, {"w": "Ronaldinho", "t": 3.117, "key": true}, {"w": "went", "t": 3.722, "key": false}, {"w": "without", "t": 4.001, "key": false}, {"w": "a", "t": 4.42, "key": false}, {"w": "competitive", "t": 4.56, "key": true}, {"w": "match.", "t": 5.164, "key": false}]}, {"t0": 5.75, "t1": 8.083, "words": [{"w": "On", "t": 5.78, "key": false}, {"w": "Sunday,", "t": 5.993, "key": true}, {"w": "at", "t": 6.51, "key": false}, {"w": "46,", "t": 6.681, "key": true}, {"w": "he", "t": 7.16, "key": false}, {"w": "started", "t": 7.322, "key": true}, {"w": "again.", "t": 7.687, "key": false}]}, {"t0": 8.25, "t1": 11.335, "words": [{"w": "Not", "t": 8.28, "key": false}, {"w": "Barcelona.", "t": 8.558, "key": true}, {"w": "Ravenna,", "t": 9.54, "key": true}, {"w": "in", "t": 10.16, "key": false}, {"w": "Italy's", "t": 10.306, "key": false}, {"w": "third", "t": 10.599, "key": true}, {"w": "division.", "t": 10.854, "key": false}]}, {"t0": 11.5, "t1": 13.228, "words": [{"w": "He's", "t": 11.58, "key": false}, {"w": "also", "t": 11.771, "key": false}, {"w": "an", "t": 12.001, "key": false}, {"w": "investor", "t": 12.154, "key": true}, {"w": "in", "t": 12.536, "key": false}, {"w": "the", "t": 12.689, "key": false}, {"w": "club.", "t": 12.881, "key": false}]}, {"t0": 13.5, "t1": 16.038, "words": [{"w": "45", "t": 13.59, "key": true}, {"w": "minutes.", "t": 14.118, "key": false}, {"w": "Ravenna", "t": 14.82, "key": false}, {"w": "won", "t": 15.274, "key": false}, {"w": "2-0.", "t": 15.526, "key": true}]}, {"t0": 16.25, "t1": 19.531, "words": [{"w": "Will", "t": 16.28, "key": false}, {"w": "he", "t": 16.502, "key": false}, {"w": "play", "t": 16.65, "key": false}, {"w": "again?", "t": 16.871, "key": true}, {"w": "If", "t": 17.43, "key": false}, {"w": "the", "t": 17.589, "key": false}, {"w": "president", "t": 17.787, "key": true}, {"w": "calls,", "t": 18.223, "key": false}, {"w": "he", "t": 18.6, "key": false}, {"w": "says", "t": 18.726, "key": false}, {"w": "he'll", "t": 18.915, "key": false}, {"w": "be", "t": 19.105, "key": false}, {"w": "back.", "t": 19.231, "key": true}]}, {"t0": 19.75, "t1": 21.552, "words": [{"w": "Like", "t": 19.78, "key": true}, {"w": "and", "t": 20.028, "key": false}, {"w": "follow", "t": 20.234, "key": true}, {"w": "Whyverse", "t": 20.564, "key": true}, {"w": "for", "t": 20.976, "key": false}, {"w": "more.", "t": 21.182, "key": false}]}]};
const C = {
  paper: '#F4E8C8', paper2: '#E9D9AE', ink: '#14110F', red: '#E23B2E', red2: '#B82A20', yellow: '#FFD23F', blue: '#2B59C3',
  blue2: '#1E3F8F', white: '#FFFDF6', sepia: '#C9B38A', sepia2: '#9C8460', green: '#3E9B4F', green2: '#2F7D3E', grey: '#6E6658',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const LN = (i) => TIMING.lines[i].t0;
const END = 24.0;
const S = { A: 0, B: LN(1) - 0.1, C: LN(2) - 0.1, D: LN(3) - 0.1, E: LN(4) - 0.1, F: LN(5) - 0.1, G: LN(6) - 0.1, H: LN(7) - 0.1 };
const B = (t) => t / 0.500033;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.3, from, to }];

// ---------------------------------------------------------------- helpers
function outline(ctx, w = 7, col = C.ink) { ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineJoin = 'round'; ctx.stroke(); }
function big(ctx, str, x, y, size, col, k, { stroke = C.ink, rot = 0, fam = D, wt = 800, sw = 0.09, shadow = true } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, fam); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
  if (shadow) { ctx.fillStyle = C.ink; ctx.fillText(str, size * 0.05, size * 0.06); ctx.lineWidth = size * sw; ctx.strokeStyle = C.ink; ctx.strokeText(str, size * 0.05, size * 0.06); }
  if (stroke) { ctx.lineWidth = size * sw; ctx.strokeStyle = stroke; ctx.strokeText(str, 0, 0); }
  ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function chip(ctx, label, x, y, size, k, { bg = C.yellow, fg = C.ink, rot = -0.04, fam = UI, wt = 800 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, fam); const w = ctx.measureText(label).width + size * 1.0, h = size * 1.55;
  ctx.fillStyle = C.ink; ctx.fillRect(-w / 2 + 8, -h / 2 + 8, w, h);
  ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.fillStyle = bg; ctx.fill(); outline(ctx, 6);
  text(ctx, label, 0, size * 0.36, font(size, wt, fam), fg, 'center'); ctx.restore();
}
// halftone dot field: dots grow toward (gx,gy)
function halftone(ctx, col, { gx = cx, gy = H / 2, step = 30, rmax = 11, reach = 1300, alpha = 1, ox = 0, oy = 0 } = {}) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = col;
  for (let y = -step; y < H + step; y += step) for (let x = -step; x < W + step; x += step) {
    const xx = x + ((y / step) % 2 ? step / 2 : 0) + (ox % step), yy = y + (oy % step);
    const d = Math.hypot(xx - gx, yy - gy), r = rmax * clamp(1 - d / reach);
    if (r > 0.8) { ctx.beginPath(); ctx.arc(xx, yy, r, 0, TAU); ctx.fill(); }
  }
  ctx.restore();
}
function paperBg(ctx, base = C.paper) { ctx.fillStyle = base; ctx.fillRect(0, 0, W, H); }
// comic burst behind a number
function burst(ctx, x, y, r, n, col, k, rot = 0) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.beginPath(); for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * TAU, rr = i % 2 ? r * 0.72 : r * (0.95 + 0.1 * hash01(i, 4)); ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
  ctx.closePath(); ctx.fillStyle = col; ctx.fill(); outline(ctx, 8); ctx.restore();
}
function speedLines(ctx, x, y, t, col = C.ink, n = 40, alpha = 0.22) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = col;
  for (let i = 0; i < n; i++) { const a = (i / n) * TAU + hash01(i, 2) * 0.1, r0 = 520 + 120 * hash01(i, 3) + ((t * 300) % 80), r1 = 2200;
    ctx.beginPath(); ctx.moveTo(x + Math.cos(a - 0.012) * r0, y + Math.sin(a - 0.012) * r0); ctx.lineTo(x + Math.cos(a) * r1, y + Math.sin(a) * r1); ctx.lineTo(x + Math.cos(a + 0.012) * r0, y + Math.sin(a + 0.012) * r0); ctx.fill(); }
  ctx.restore();
}
function panelFrame(ctx) { // thick page frame (comic panel)
  ctx.save(); ctx.lineWidth = 22; ctx.strokeStyle = C.ink; ctx.strokeRect(11, 11, W - 22, H - 22); ctx.restore();
}
function stamp(ctx, label, x, y, size, t, t0, col = C.red, rot = -0.1) {
  const k = t >= t0 ? Math.min(1.05, lerp(1.8, 1, E.outBack(prog(t, t0, t0 + 0.22)))) : 0; if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, 800, D); const w = ctx.measureText(label).width + size * 0.9, h = size * 1.45;
  ctx.fillStyle = C.ink; ctx.fillRect(-w / 2 + 10, -h / 2 + 10, w, h);
  ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.fillStyle = col; ctx.fill(); outline(ctx, 8);
  text(ctx, label, 0, size * 0.36, font(size, 800, D), C.white, 'center', 2); ctx.restore();
}
function ball(ctx, x, y, r, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fillStyle = C.white; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = C.ink;
  const pent = (px, py, pr) => { ctx.beginPath(); for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i / 5) * TAU; ctx.lineTo(px + Math.cos(a) * pr, py + Math.sin(a) * pr); } ctx.closePath(); ctx.fill(); };
  pent(0, 0, r * 0.36); for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i / 5) * TAU + Math.PI / 5; pent(Math.cos(a) * r * 0.95, Math.sin(a) * r * 0.95, r * 0.3); }
  ctx.restore(); ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); outline(ctx, Math.max(3, r * 0.12)); ctx.restore();
}
// Ronaldinho as an INK SILHOUETTE: long curly hair to the shoulders, headband, slim build. No facial features.
// pose: 'run' (back view, No. 10), 'sit', 'stand', 'phone'. (x,y) = feet. height ~ 600*sc
function ronnie(ctx, x, y, sc, pose, t, { flip = 1, ph = 0, number = true } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc * flip, sc);
  const ink = C.ink; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const limb = (pts, w) => { ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.lineWidth = w; ctx.strokeStyle = ink; ctx.stroke(); };
  const run = pose === 'run', sit = pose === 'sit';
  const cyc = Math.sin(t * 11 + ph), cyc2 = Math.cos(t * 11 + ph);
  const hipY = sit ? -230 : -300, shY = sit ? -470 : -545, headY = shY - 70;
  // legs
  if (sit) { limb([[-30, hipY], [-150, hipY + 10], [-150, 0]], 46); limb([[25, hipY], [-90, hipY + 20], [-70, 0]], 46); }
  else if (run) { limb([[-22, hipY], [-22 + 60 * cyc, hipY + 150], [-22 + 90 * cyc - 20, -10 - 40 * Math.max(0, cyc)]], 46); limb([[22, hipY], [22 - 60 * cyc, hipY + 150], [22 - 90 * cyc + 20, -10 - 40 * Math.max(0, -cyc)]], 46); }
  else { limb([[-24, hipY], [-34, hipY + 150], [-40, 0]], 46); limb([[24, hipY], [34, hipY + 150], [44, 0]], 46); }
  // boots
  // torso (shirt)
  ctx.beginPath(); ctx.moveTo(-78, shY); ctx.lineTo(78, shY); ctx.lineTo(56, hipY + 10); ctx.lineTo(-56, hipY + 10); ctx.closePath(); ctx.fillStyle = ink; ctx.fill();
  // arms
  if (run) { limb([[-70, shY + 20], [-110 - 30 * cyc2, shY + 130], [-90 - 50 * cyc2, shY + 230]], 36); limb([[70, shY + 20], [110 + 30 * cyc2, shY + 130], [90 + 50 * cyc2, shY + 230]], 36); }
  else if (pose === 'phone') { limb([[-70, shY + 20], [-90, shY + 150], [-70, shY + 260]], 36); limb([[70, shY + 20], [110, shY + 90], [52, headY + 10]], 36);
    ctx.save(); ctx.translate(48, headY + 4); ctx.rotate(-0.3); ctx.fillStyle = C.ink; rrect(ctx, -16, -40, 32, 80, 8); ctx.fill(); ctx.restore(); }
  else if (sit) { limb([[-70, shY + 20], [-100, shY + 140], [-150, hipY + 10]], 36); limb([[70, shY + 20], [40, shY + 150], [-60, hipY + 20]], 36); }
  else { limb([[-70, shY + 20], [-100, shY + 140], [-96, shY + 250]], 36); limb([[70, shY + 20], [110, shY + 100], [160, shY + 20]], 36); }
  // neck + head
  ctx.fillStyle = ink; ctx.fillRect(-16, shY - 40, 32, 46);
  ctx.beginPath(); ctx.ellipse(0, headY, 50, 60, 0, 0, TAU); ctx.fill();
  // big curly hair: a full mass over the crown falling past the ears to the shoulders
  ctx.beginPath(); ctx.ellipse(0, headY + 14, 90, 100, 0, 0, TAU); ctx.fill(); // solid hair mass (no gaps = no face read)
  for (let i = 0; i < 30; i++) { const a = Math.PI * (0.78 + 1.44 * (i / 29)), rx = 84, ry = 92;
    const bob = 3 * Math.sin(t * 9 + i);
    ctx.beginPath(); ctx.arc(Math.cos(a) * rx, headY + 10 + Math.sin(a) * ry + bob, 30 + 9 * hash01(i, 22), 0, TAU); ctx.fill(); }
  for (let i = 0; i < 12; i++) { const side = i % 2 ? 1 : -1, k = Math.floor(i / 2); // curls down to the shoulders
    ctx.beginPath(); ctx.arc(side * (70 + 10 * hash01(i, 23) - k * 2), headY + 30 + k * 22 + 2 * Math.sin(t * 8 + i), 27, 0, TAU); ctx.fill(); }
  // headband across the forehead (the one light accent on the figure)
  ctx.save(); ctx.beginPath(); ctx.moveTo(-80, headY - 44); ctx.quadraticCurveTo(0, headY - 66, 80, headY - 44); ctx.lineWidth = 13; ctx.strokeStyle = C.white; ctx.stroke(); ctx.restore();
  // No. 10 on the back (run) / chest
  if (number && !sit) { ctx.save(); ctx.scale(flip, 1); text(ctx, '10', 0, shY + 140, font(110, 800, D), C.yellow, 'center'); ctx.restore(); }
  ctx.restore();
}
function nameplate(ctx, name, x, y, k, rot = -0.03) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(56, 800, D); const w = ctx.measureText(name).width + 70;
  ctx.fillStyle = C.ink; ctx.fillRect(-w / 2 + 9, -40 + 9, w, 80);
  ctx.fillStyle = C.blue; ctx.fillRect(-w / 2, -40, w, 80); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.strokeRect(-w / 2, -40, w, 80);
  text(ctx, name, 0, 20, font(56, 800, D), C.white, 'center', 2); ctx.restore();
}
function bubble(ctx, lines, x, y, size, k, { tailX = -120, tailY = 170, bg = C.white } = {}) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.font = font(size, 800, D); const w = Math.max(...lines.map((l) => ctx.measureText(l).width)) + size * 1.4, h = lines.length * size * 1.18 + size * 0.9;
  ctx.beginPath(); ctx.ellipse(0, 0, w / 2 + 30, h / 2 + 24, 0, 0, TAU); ctx.fillStyle = bg; ctx.fill(); outline(ctx, 7);
  ctx.beginPath(); ctx.moveTo(tailX * 0.3 - 30, h / 2); ctx.lineTo(tailX, tailY); ctx.lineTo(tailX * 0.3 + 30, h / 2 + 4); ctx.fillStyle = bg; ctx.fill();
  ctx.beginPath(); ctx.moveTo(tailX * 0.3 - 30, h / 2 + 10); ctx.lineTo(tailX, tailY); ctx.lineTo(tailX * 0.3 + 30, h / 2 + 12); outline(ctx, 7);
  lines.forEach((l, i) => text(ctx, l, 0, -h / 2 + size * 0.45 + size * 1.18 * (i + 0.8), font(size, 800, D), C.ink, 'center'));
  ctx.restore();
}
function panelSlide(ctx, t, t0, a, b, dir = 1, dur = 0.34) { // new panel slides in on a slanted gutter
  const p = E.inOutCubic(prog(t, t0 - dur * 0.55, t0 + dur * 0.45));
  if (p <= 0) return a(); if (p >= 1) return b();
  const off = dir * p * (W + 400);
  ctx.save(); ctx.translate(-off, 0); a(); ctx.restore();
  ctx.save(); const x0 = dir > 0 ? W + 200 - off : -200 - off + 0;
  ctx.beginPath(); if (dir > 0) { ctx.moveTo(x0 - 160, 0); ctx.lineTo(W + 400, 0); ctx.lineTo(W + 400, H); ctx.lineTo(x0 + 160, H); } else { ctx.moveTo(-400, 0); ctx.lineTo(x0 + 160 + W, 0); ctx.lineTo(x0 - 160 + W, H); ctx.lineTo(-400, H); }
  ctx.closePath(); ctx.save(); ctx.clip(); ctx.translate((1 - p) * dir * (W + 400) * 0.0, 0); b(); ctx.restore();
  ctx.lineWidth = 26; ctx.strokeStyle = C.ink; ctx.beginPath(); if (dir > 0) { ctx.moveTo(x0 - 160, 0); ctx.lineTo(x0 + 160, H); } else { ctx.moveTo(x0 + 160 + W, 0); ctx.lineTo(x0 - 160 + W, H); } ctx.stroke();
  ctx.restore();
}

// ---------------------------------------------------------------- persistent scorebug (bottom): DAYS AWAY -> RAV v FOR
const tStart = T('started'), tFirstGoal = T('minutes.') + 0.25, tHT = T('minutes.') + 0.35, tFT = T('2-0.');
function daysAt(t) {
  if (t < S.B + 0.15) return 4068;
  return Math.round(4068 * E.outCubic(prog(t, S.B + 0.35, T('competitive') + 0.2)));
}
function scorebug(ctx, t) {
  const k = clamp(prog(t, 0.15, 0.45)); if (k <= 0) return;
  const y = s.y + s.h - 50, w = 860, x0 = cx - w / 2;
  ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 60);
  ctx.fillStyle = C.ink; ctx.fillRect(x0 + 10, y - 50 + 10, w, 100);
  ctx.fillStyle = C.white; ctx.fillRect(x0, y - 50, w, 100); ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.strokeRect(x0, y - 50, w, 100);
  const flip = E.inOutCubic(prog(t, tStart - 0.05, tStart + 0.25));
  if (flip < 0.5) { // DAYS AWAY counter
    ctx.save(); ctx.translate(cx, y); ctx.scale(1, 1 - flip * 2); ctx.translate(-cx, -y);
    const fb = t >= S.B + 0.15 && t < S.C;
    ctx.fillStyle = fb ? C.sepia2 : C.red; ctx.fillRect(x0, y - 50, 330, 100); ctx.strokeRect(x0, y - 50, 330, 100);
    text(ctx, fb ? 'SINCE 2015' : 'DAYS AWAY', x0 + 165, y + 16, font(46, 800, D), C.white, 'center', 1);
    const n = daysAt(t).toLocaleString('en-US');
    text(ctx, n, x0 + 600, y + 30, font(86, 800, D), C.ink, 'center', 2);
    ctx.restore();
  } else { // match bug
    ctx.save(); ctx.translate(cx, y); ctx.scale(1, (flip - 0.5) * 2); ctx.translate(-cx, -y);
    const g1 = t >= tFirstGoal ? 1 : 0, g2 = t >= tFT ? 1 : 0;
    ctx.fillStyle = C.yellow; ctx.fillRect(x0, y - 50, 220, 100); ctx.strokeRect(x0, y - 50, 220, 100);
    text(ctx, 'RAV', x0 + 110, y + 20, font(56, 800, D), C.ink, 'center', 2);
    ctx.fillStyle = C.ink; ctx.fillRect(x0 + 220, y - 50, 200, 100);
    const sc = `${g1 + g2}-0`, bumpK = 1 + 0.25 * Math.exp(-Math.max(0, t - (g2 ? tFT : tFirstGoal)) * 6) * (g1 ? 1 : 0);
    ctx.save(); ctx.translate(x0 + 320, y + 24); ctx.scale(bumpK, bumpK); text(ctx, sc, 0, 0, font(70, 800, D), C.yellow, 'center', 2); ctx.restore();
    ctx.fillStyle = C.blue; ctx.fillRect(x0 + 420, y - 50, 220, 100); ctx.strokeRect(x0 + 420, y - 50, 220, 100);
    text(ctx, 'FOR', x0 + 530, y + 20, font(56, 800, D), C.white, 'center', 2);
    let clk; const tc0 = T('45') - 0.1;
    if (t >= tFT) clk = 'FT'; else if (t >= tHT) clk = 'HT'; else if (t >= tc0) clk = `${Math.min(45, Math.round(45 * prog(t, tc0, tHT)))}'`; else clk = "0'";
    text(ctx, clk, x0 + 750, y + 22, font(60, 800, D), C.ink, 'center', 1);
    ctx.restore();
  }
  ctx.restore();
}

// ---------------------------------------------------------------- captions (word by word, top)
function captions(ctx, t) {
  const L = TIMING.lines; const li = L.findIndex((l, i) => t >= l.t0 - 0.05 && t < (L[i + 1] ? L[i + 1].t0 - 0.05 : END)); if (li < 0) return;
  if (li === 0 && t < 1.4) return; // the hook number is the caption itself on frame 0
  const all = L[li].words, ws = all.filter((w) => t >= w.t - 0.03); if (!ws.length) return;
  const start = Math.floor((ws.length - 1) / 3) * 3, chunk = all.slice(start, start + 3), shown = ws.slice(start);
  let size = 92; const gap = 24;
  const meas = (sz) => { ctx.font = font(sz, 800, D); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 20) { size = Math.floor(size * (s.w - 20) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 110;
  shown.forEach((w, i) => { const k = sp(t, w.t - 0.03, SPRING.bouncy), sc = Math.min(1.1, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.22; ctx.strokeStyle = C.ink; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.yellow : C.white; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}

// ---------------------------------------------------------------- A: hook — 4,068 days (calendar pages blowing off, he waits on a bench)
function calPage(ctx, x, y, rot, sc, label, col = C.white) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc);
  ctx.fillStyle = col; ctx.fillRect(-70, -80, 140, 160); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.strokeRect(-70, -80, 140, 160);
  ctx.fillStyle = C.red; ctx.fillRect(-70, -80, 140, 40); ctx.strokeRect(-70, -80, 140, 40);
  text(ctx, label, 0, 50, font(70, 800, D), C.ink, 'center'); ctx.restore();
}
function sHook(ctx, t) {
  paperBg(ctx, C.yellow);
  halftone(ctx, C.red, { gx: cx, gy: s.y + 620, reach: 1100, rmax: 13, ox: t * 20 });
  speedLines(ctx, cx, s.y + 620, t, C.ink, 46, 0.16);
  // calendar pages tearing off and flying (one every ~0.2 s)
  for (let i = 0; i < 14; i++) { const ti = 0.05 + i * 0.16, d = t - ti; if (d < 0) continue;
    const x = cx + 330 + d * (500 + 300 * hash01(i, 1)) * (hash01(i, 5) > 0.5 ? 1 : -1.2), y = s.y + 900 - d * (520 + 200 * hash01(i, 2)) + d * d * 300;
    calPage(ctx, x, y, d * (2 + 3 * hash01(i, 3)), 0.75, `${1 + Math.floor(hash01(i, 4) * 28)}`); }
  // pad with the top page
  calPage(ctx, cx + 330, s.y + 900, 0.04, 0.95, '15');
  // number on frame 0
  const k0 = t < 0.25 ? lerp(1.1, 1, E.outBack(prog(t, 0, 0.25))) : 1;
  const up = E.inOutCubic(prog(t, T('days.') - 0.15, T('days.') + 0.25));
  burst(ctx, cx, s.y + 560, 440, 16, C.white, k0 * (1 + 0.02 * Math.sin(t * 6)), t * 0.1);
  big(ctx, '4,068', cx, s.y + 640, 250, C.red, k0, { sw: 0.08 });
  // the bench + silhouette waiting
  ctx.fillStyle = C.ink; ctx.fillRect(cx - 470, s.y + 990, 380, 26); ctx.fillRect(cx - 450, s.y + 1016, 20, 90); ctx.fillRect(cx - 130, s.y + 1016, 20, 90);
  ronnie(ctx, cx - 250, s.y + 1110, 0.66, 'sit', t, { number: false });
  ball(ctx, cx + 20, s.y + 958 - 40 * Math.abs(Math.sin(t * 5)), 30, t * 3);
  nameplate(ctx, 'RONALDINHO', cx - 250, s.y + 1085, pop(t, 0.1));
  chip(ctx, 'DAYS', cx, s.y + 760, lerp(84, 92, up), pop(t, 0.02) , { bg: C.blue, fg: C.white, rot: -0.05 });
}

// ---------------------------------------------------------------- B: flashback — 26 Sept 2015 -> 2026, the counter rolls
function sPast(ctx, t) {
  paperBg(ctx, C.sepia);
  halftone(ctx, C.sepia2, { gx: cx, gy: H, reach: 1700, rmax: 10, alpha: 0.6 });
  const tN = T('Ronaldinho'), tC = T('competitive');
  // ticket stub: last match
  const kT = pop(t, S.B + 0.08);
  if (kT > 0) { ctx.save(); ctx.translate(cx - 40, s.y + 360); ctx.rotate(-0.06); ctx.scale(kT, kT);
    ctx.fillStyle = C.ink; ctx.fillRect(-370 + 10, -110 + 10, 740, 220);
    ctx.fillStyle = C.paper; ctx.fillRect(-370, -110, 740, 220); ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.strokeRect(-370, -110, 740, 220);
    ctx.setLineDash([14, 10]); ctx.beginPath(); ctx.moveTo(200, -110); ctx.lineTo(200, 110); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, 'LAST MATCH', -85, -38, font(46, 800, UI), C.grey, 'center', 3);
    text(ctx, '26 SEPT 2015', -85, 40, font(78, 800, D), C.ink, 'center');
    text(ctx, 'FLUMINENSE', -85, 92, font(36, 800, UI), C.red2, 'center', 2);
    ball(ctx, 285, 0, 56, t); ctx.restore(); }
  // timeline 2015 -> 2026 with a runner token
  const y = s.y + 760, xa = s.x + 60, xb = s.x + s.w - 60;
  const q = E.outCubic(prog(t, S.B + 0.35, tC + 0.2));
  ctx.lineWidth = 14; ctx.strokeStyle = C.ink; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xa, y); ctx.lineTo(lerp(xa, xb, q), y); ctx.stroke();
  for (let yr = 2015; yr <= 2026; yr++) { const f = (yr - 2015) / 11, x = lerp(xa, xb, f); const kk = q >= f - 0.001 ? pop(t, S.B + 0.35 + f * (tC - S.B - 0.15) * 0.6) : 0;
    if (kk > 0) { ctx.save(); ctx.translate(x, y); ctx.scale(kk, kk); ctx.beginPath(); ctx.arc(0, 0, 16, 0, TAU); ctx.fillStyle = yr === 2026 ? C.red : C.paper; ctx.fill(); outline(ctx, 6);
      if (yr % 2 === 1 || yr === 2026) text(ctx, `'${String(yr).slice(2)}`, 0, yr % 4 === 1 ? -36 : 66, font(40, 800, D), C.ink, 'center'); ctx.restore(); } }
  // big day counter
  const n = daysAt(t);
  big(ctx, n.toLocaleString('en-US'), cx, s.y + 660, 190, n >= 4068 ? C.red : C.paper, pop(t, S.B + 0.3), { sw: 0.08 });
  // silhouette walks away along the line (retired years) + name plate
  ronnie(ctx, lerp(xa, xb, q) - 10, s.y + 1090, 0.5, 'stand', t, { number: false });
  nameplate(ctx, 'RONALDINHO', cx + 150, s.y + 1085, pop(t, tN - 0.05));
  stamp(ctx, 'NO COMPETITIVE MATCH', cx - 30, s.y + 420, 50, t, tC + 0.1, C.red, 0.05);
}

// ---------------------------------------------------------------- C: Sunday, at 46, he started again (runs out of the tunnel)
function sReturn(ctx, t) {
  paperBg(ctx, C.green);
  // pitch stripes in perspective
  for (let i = 0; i < 9; i++) { ctx.fillStyle = i % 2 ? C.green2 : C.green; const y0 = s.y + 700 + i * i * 14, y1 = s.y + 700 + (i + 1) * (i + 1) * 14; ctx.fillRect(0, y0, W, y1 - y0); }
  // stands at the top: crowd dots (halftone people)
  ctx.fillStyle = C.blue2; ctx.fillRect(0, 0, W, s.y + 700);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, s.y + 700); ctx.clip();
  halftone(ctx, C.yellow, { gx: cx, gy: s.y + 300, reach: 1500, rmax: 9, step: 26, oy: Math.sin(t * 12) * 4 });
  ctx.restore();
  ctx.fillStyle = C.ink; ctx.fillRect(0, s.y + 690, W, 16);
  // flashes in the crowd
  for (let i = 0; i < 10; i++) { const ft = (t * 3 + hash01(i, 8) * 5) % 1; if (ft < 0.12) { ctx.fillStyle = C.white; ctx.beginPath(); ctx.arc(hash01(i, 9) * W, s.y + 200 + hash01(i, 10) * 400, 18, 0, TAU); ctx.fill(); } }
  // runs from the back toward camera (scale up)
  const q = E.outCubic(prog(t, S.C, tStart + 0.4));
  ronnie(ctx, cx + lerp(-60, 40, q), lerp(s.y + 900, s.y + 1150, q), lerp(0.42, 0.82, q), 'run', t, { flip: 1 });
  ball(ctx, cx + lerp(40, 260, q) + 20 * Math.sin(t * 11), lerp(s.y + 900, s.y + 1135, q) - 10, lerp(16, 40, q), t * 12);
  chip(ctx, 'SUNDAY · 15 NOV', cx + 160, s.y + 330, 52, pop(t, T('Sunday,') - 0.05), { bg: C.white, rot: 0.04 });
  burst(ctx, cx - 220, s.y + 560, 190, 12, C.red, pop(t, T('46,') - 0.05), -0.1);
  big(ctx, '46', cx - 220, s.y + 600, 150, C.yellow, pop(t, T('46,') - 0.05), { sw: 0.08, shadow: false });
  text(ctx, 'AGE', cx - 220, s.y + 470, font(0.01 + 44 * Math.min(1, pop(t, T('46,'))), 800, D), C.white, 'center', 3);
  stamp(ctx, 'STARTED!', cx + 190, s.y + 590, 82, t, tStart + 0.03, C.blue, 0.08);
}

// ---------------------------------------------------------------- D: not Barcelona — Ravenna, Italy's third division (ladder)
function sLadder(ctx, t) {
  paperBg(ctx);
  halftone(ctx, C.blue, { gx: s.x, gy: s.y + 300, reach: 1200, rmax: 10, alpha: 0.35 });
  const tBar = T('Barcelona.'), tRav = T('Ravenna,'), tThird = T('third');
  // name card swept away with a red X
  const away = E.inCubic(prog(t, tRav - 0.25, tRav + 0.1));
  const kB = pop(t, S.D + 0.05);
  if (kB > 0 && away < 1) { ctx.save(); ctx.translate(cx + away * 1200, s.y + 420); ctx.rotate(-0.05 + away * 0.6); ctx.scale(kB, kB);
    ctx.fillStyle = C.ink; ctx.fillRect(-330 + 10, -80 + 10, 660, 160); ctx.fillStyle = C.blue2; ctx.fillRect(-330, -80, 660, 160); ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.strokeRect(-330, -80, 660, 160);
    text(ctx, 'BARCELONA', 0, 30, font(96, 800, D), C.white, 'center', 2);
    const xk = clamp(prog(t, tBar + 0.1, tBar + 0.35)); ctx.lineWidth = 30; ctx.strokeStyle = C.red; ctx.lineCap = 'round';
    if (xk > 0) { ctx.beginPath(); ctx.moveTo(-300, -70); ctx.lineTo(lerp(-300, 300, Math.min(1, xk * 2)), lerp(-70, 70, Math.min(1, xk * 2))); ctx.stroke(); }
    if (xk > 0.5) { ctx.beginPath(); ctx.moveTo(300, -70); ctx.lineTo(lerp(300, -300, (xk - 0.5) * 2), lerp(-70, 70, (xk - 0.5) * 2)); ctx.stroke(); }
    ctx.restore(); }
  // ladder of three tiers
  const tiers = [['SERIE A', 1], ['SERIE B', 2], ['SERIE C', 3]];
  const ly = s.y + 560, rh = 165;
  tiers.forEach(([name, n], i) => { const kk = pop(t, tRav - 0.2 + i * 0.12); if (kk <= 0) return;
    ctx.save(); ctx.translate(cx - 60, ly + i * rh + 100); ctx.scale(kk, kk);
    const w = 520 - i * 40, lit = i === 2 && t >= tThird;
    ctx.fillStyle = C.ink; ctx.fillRect(-w / 2 + 10, -70 + 10, w, 140);
    ctx.fillStyle = lit ? C.yellow : C.white; ctx.fillRect(-w / 2, -70, w, 140); ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.strokeRect(-w / 2, -70, w, 140);
    text(ctx, `${n}`, -w / 2 + 60, 30, font(90, 800, D), i === 2 ? C.red : C.grey, 'center');
    text(ctx, name, 40, 26, font(70, 800, D), C.ink, 'center', 2); ctx.restore(); });
  // marker drops down the tiers to 3
  const drop = E.outBack(prog(t, tRav + 0.1, tThird + 0.15));
  const ky = ly + 100 + lerp(-rh * 0.9, 2 * rh, drop);
  if (t >= tRav) { ctx.save(); ctx.translate(cx + 230, ky); ctx.rotate(0.03);
    ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(-10, -50); ctx.lineTo(220, -50); ctx.lineTo(220, 50); ctx.lineTo(-10, 50); ctx.closePath(); ctx.fillStyle = C.red; ctx.fill(); outline(ctx, 7);
    text(ctx, 'RAVENNA', 105, 18, font(48, 800, D), C.white, 'center', 1); ctx.restore(); }
  chip(ctx, "ITALY'S 3RD TIER", cx, s.y + 400, 54, pop(t, T('division.') - 0.05), { bg: C.blue, fg: C.white, rot: 0.03 });
  ball(ctx, cx - 330, s.y + 1110 - 90 * Math.abs(Math.sin(t * 6)), 34, t * 5);
}

// ---------------------------------------------------------------- E: twist — he's also an investor in the club
function coin(ctx, x, y, r, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(Math.max(0.15, Math.abs(Math.cos(rot))), 1);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fillStyle = C.yellow; ctx.fill(); outline(ctx, 6); ctx.beginPath(); ctx.arc(0, 0, r * 0.66, 0, TAU); outline(ctx, 4); ctx.restore(); }
function sInvestor(ctx, t) {
  paperBg(ctx, C.red);
  halftone(ctx, C.red2, { gx: W, gy: s.y + 200, reach: 1600, rmax: 14 });
  const tI = T('investor');
  // two ID cards: PLAYER (shirt 10) and INVESTOR (stamped)
  const k1 = pop(t, S.E + 0.05), k2 = pop(t, tI - 0.08);
  const card = (x, y, rot, k, label, col) => { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
    ctx.fillStyle = C.ink; ctx.fillRect(-210 + 12, -260 + 12, 420, 520); ctx.fillStyle = C.paper; ctx.fillRect(-210, -260, 420, 520); ctx.lineWidth = 8; ctx.strokeStyle = C.ink; ctx.strokeRect(-210, -260, 420, 520);
    ctx.fillStyle = col; ctx.fillRect(-210, 150, 420, 110); ctx.strokeRect(-210, 150, 420, 110);
    text(ctx, label, 0, 225, font(64, 800, D), C.white, 'center', 2); ctx.restore(); };
  card(cx - 210, s.y + 700, -0.08, k1, 'PLAYER', C.blue);
  if (k1 > 0) { ctx.save(); ctx.translate(cx - 210, s.y + 700); ctx.rotate(-0.08); ctx.scale(k1, k1); ronnie(ctx, 0, 140, 0.5, 'stand', t); ctx.restore(); }
  card(cx + 210, s.y + 740, 0.07, k2, 'INVESTOR', C.ink);
  if (k2 > 0) { ctx.save(); ctx.translate(cx + 210, s.y + 740); ctx.rotate(0.07); ctx.scale(k2, k2);
    for (let i = 0; i < 6; i++) coin(ctx, -90 + (i % 3) * 90, 80 - Math.floor(i / 3) * 40 - i * 12, 52, 0); // coin stack
    ctx.restore(); }
  // coins raining
  for (let i = 0; i < 16; i++) { const ti = tI + i * 0.07, d = t - ti; if (d < 0) continue;
    coin(ctx, cx + 210 + (hash01(i, 61) - 0.5) * 560, s.y + 300 + d * 900 + d * d * 600, 30, d * 9 + i); }
  stamp(ctx, 'IN THE CLUB', cx, s.y + 330, 70, t, T('club.') - 0.02, C.yellow, -0.05);
  ctx.save(); ctx.globalAlpha = 1; ctx.restore();
}

// ---------------------------------------------------------------- F: 45 minutes — the match, then FT 2-0
function sMatch(ctx, t) {
  paperBg(ctx, C.green);
  for (let i = 0; i < 12; i++) { ctx.fillStyle = i % 2 ? C.green2 : C.green; ctx.fillRect(0, i * 170 - ((t * 120) % 340), W, 170); }
  ctx.strokeStyle = C.white; ctx.lineWidth = 10; ctx.globalAlpha = 0.85;
  ctx.beginPath(); ctx.arc(cx, s.y + 860 - ((t * 120) % 340) + 340, 210, 0, TAU); ctx.stroke();
  ctx.strokeRect(70, -10, W - 140, H + 20); ctx.globalAlpha = 1;
  const t45 = T('45'), tWon = T('won');
  // he dribbles diagonally across, ball at the feet
  const q = prog(t, S.F, tHT + 0.2);
  const px = cx + Math.sin(q * 5) * 220, py = s.y + 1150;
  ronnie(ctx, px, py, 0.8, 'run', t, { flip: Math.cos(q * 5) > 0 ? 1 : -1 });
  ball(ctx, px + 120 * (Math.cos(q * 5) > 0 ? 1 : -1), py - 20 - 30 * Math.abs(Math.sin(t * 10)), 36, t * 14);
  // big match clock
  const mins = t >= tHT ? 45 : Math.min(45, Math.round(45 * prog(t, t45 - 0.1, tHT)));
  const kc = pop(t, t45 - 0.12), sh = E.inOutCubic(prog(t, T('won') - 0.3, T('won') + 0.1));
  ctx.save(); M.zoomAbout(ctx, lerp(1, 0.62, sh), cx, s.y + 380);
  burst(ctx, cx, s.y + 560, 300, 14, C.yellow, kc, t * 0.2);
  big(ctx, `${mins}'`, cx, s.y + 620, 190, C.white, kc, { sw: 0.08 });
  chip(ctx, 'MINUTES PLAYED', cx, s.y + 760, 48, pop(t, T('minutes.') - 0.05), { bg: C.white, rot: -0.04 });
  stamp(ctx, 'HALF-TIME', cx + 150, s.y + 380, 56, t, tHT, C.ink, 0.07);
  ctx.restore();
  // FT result card slides up
  const kF = E.outBack(prog(t, tWon - 0.15, tWon + 0.25));
  if (kF > 0) { ctx.save(); ctx.translate(cx, lerp(H + 300, s.y + 880, kF)); ctx.rotate(-0.03);
    ctx.fillStyle = C.ink; ctx.fillRect(-380 + 12, -110 + 12, 760, 220); ctx.fillStyle = C.paper; ctx.fillRect(-380, -110, 760, 220); ctx.lineWidth = 8; ctx.strokeStyle = C.ink; ctx.strokeRect(-380, -110, 760, 220);
    text(ctx, 'RAVENNA', -230, 20, font(56, 800, D), C.ink, 'center'); text(ctx, 'FORLI', 260, 20, font(56, 800, D), C.ink, 'center');
    const k2 = pop(t, T('2-0.') - 0.03); ctx.save(); ctx.translate(15, 34); ctx.scale(k2, k2); text(ctx, '2-0', 0, 0, font(120, 800, D), C.red, 'center', 2); ctx.restore();
    text(ctx, 'FULL TIME', 15, -66, font(34, 800, UI), C.grey, 'center', 4); ctx.restore(); }
}

// ---------------------------------------------------------------- G: will he play again? — the phone rings: PRESIDENT
function sPhone(ctx, t) {
  paperBg(ctx, C.blue);
  halftone(ctx, C.blue2, { gx: cx, gy: s.y + 900, reach: 1400, rmax: 13 });
  speedLines(ctx, cx + 200, s.y + 620, t, C.white, 30, 0.12);
  const tQ = T('again?'), tP = T('president'), tBk = T('back.');
  // big question mark first
  const qk = pop(t, tQ - 0.1) * (1 - E.inCubic(prog(t, tP - 0.3, tP)));
  big(ctx, '?', cx + 260, s.y + 700, 420, C.yellow, qk, { sw: 0.06, rot: 0.1 });
  // phone rings
  const kp = pop(t, tP - 0.15);
  if (kp > 0) { const shk = t < tBk ? Math.sin(t * 60) * 0.06 : 0;
    ctx.save(); ctx.translate(cx + 230, s.y + 700); ctx.rotate(0.1 + shk); ctx.scale(kp, kp);
    ctx.fillStyle = C.ink; rrect(ctx, -150 + 12, -260 + 12, 300, 520, 46); ctx.fill();
    rrect(ctx, -150, -260, 300, 520, 46); ctx.fillStyle = C.ink; ctx.fill(); rrect(ctx, -128, -220, 256, 430, 18); ctx.fillStyle = C.white; ctx.fill();
    text(ctx, 'CALLING', 0, -130, font(34, 800, UI), C.grey, 'center', 4);
    text(ctx, 'PRESIDENT', 0, -70, font(46, 800, D), C.ink, 'center');
    ctx.beginPath(); ctx.arc(0, 90, 62, 0, TAU); ctx.fillStyle = C.green; ctx.fill(); outline(ctx, 6);
    ctx.save(); ctx.translate(0, 90); ctx.rotate(-0.7); ctx.fillStyle = C.white; rrect(ctx, -34, -12, 68, 24, 10); ctx.fill(); ctx.restore();
    ctx.restore();
    if (t < tBk) for (let i = 0; i < 3; i++) { const a = (t * 5 + i / 3) % 1; ctx.save(); ctx.globalAlpha = 1 - a; ctx.lineWidth = 10; ctx.strokeStyle = C.yellow;
      ctx.beginPath(); ctx.arc(cx + 230, s.y + 700, 330 + a * 160, -0.6, 0.6); ctx.stroke(); ctx.beginPath(); ctx.arc(cx + 230, s.y + 700, 330 + a * 160, Math.PI - 0.6, Math.PI + 0.6); ctx.stroke(); ctx.restore(); }
    chip(ctx, 'RING!', cx + 380, s.y + 430, 60, pop(t, tP), { bg: C.red, fg: C.white, rot: 0.12 });
  }
  // silhouette answers
  const pose = t >= tBk - 0.6 ? 'phone' : 'stand';
  ronnie(ctx, cx - 240, s.y + 1170, 0.85, pose, t, { number: false });
  bubble(ctx, ['IF THE PRESIDENT', "CALLS ME, I'LL", 'BE BACK!'], cx - 10, s.y + 310, 56, pop(t, T('says') - 0.05), { tailX: -150, tailY: 200 });
  chip(ctx, 'RONALDINHO, 15 NOV', cx + 230, s.y + 1060, 36, pop(t, T('says') + 0.1), { bg: C.white, rot: -0.03 });
}

// ---------------------------------------------------------------- H: end card
function sEnd(ctx, t) {
  paperBg(ctx, C.yellow);
  halftone(ctx, C.red, { gx: cx, gy: s.y + 1700, reach: 1300, rmax: 12, ox: t * 15 });
  const t0 = S.H;
  burst(ctx, cx - 120, s.y + 450, 250, 14, C.white, pop(t, t0 - 0.15), -0.05);
  big(ctx, '4,068', cx - 120, s.y + 490, 130, C.red, pop(t, t0 - 0.15), { sw: 0.08, rot: -0.04 });
  chip(ctx, 'DAYS LATER', cx + 260, s.y + 400, 46, pop(t, t0), { bg: C.blue, fg: C.white, rot: 0.08 });
  ronnie(ctx, cx + 330, s.y + 1010, 0.62, 'stand', t, { flip: -1, number: false });
  { const jt = (t - S.H) * 2.2, ph = jt % 1, hgt = 4 * ph * (1 - ph); ball(ctx, cx + 330 + (Math.floor(jt) % 2 ? -40 : 40) * (1 - ph * 2) * 0.5 - 90, s.y + 960 - 300 * hgt, 30, t * 8); }
  big(ctx, 'WHYVERSE', cx, s.y + 760, 120, C.white, 1, { sw: 0.1 });
  const kB = pop(t, T('Like') - 0.05), kF = pop(t, T('follow') - 0.05);
  if (kB > 0) { ctx.save(); ctx.translate(cx - 215, s.y + 960); ctx.scale(kB, kB); ctx.rotate(-0.05);
    ctx.fillStyle = C.ink; ctx.fillRect(-190 + 10, -72 + 10, 380, 144); ctx.fillStyle = C.white; ctx.fillRect(-190, -72, 380, 144); ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.strokeRect(-190, -72, 380, 144);
    const hb = 1 + 0.14 * Math.max(0, Math.sin((t - T('Like')) * 9)) * Math.exp(-(t - T('Like')) * 2);
    ctx.save(); ctx.translate(-105, 4); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30);
    ctx.fillStyle = C.red; ctx.fill(); outline(ctx, 5); ctx.restore();
    text(ctx, 'LIKE', 45, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  if (kF > 0) { ctx.save(); ctx.translate(cx + 215, s.y + 960); ctx.scale(kF, kF); ctx.rotate(0.05);
    ctx.fillStyle = C.ink; ctx.fillRect(-190 + 10, -72 + 10, 380, 144); ctx.fillStyle = C.red; ctx.fillRect(-190, -72, 380, 144); ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.strokeRect(-190, -72, 380, 144);
    ctx.save(); ctx.translate(-115, 4); ctx.lineWidth = 13; ctx.strokeStyle = C.white; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'FOLLOW', 40, 24, font(58, 800, D), C.white, 'center'); ctx.restore(); }
  // sends line with a drawn envelope (no emoji glyph)
  const kS = pop(t, T('more.') + 0.1);
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 1160); ctx.scale(kS, kS); ctx.rotate(-0.02);
    ctx.fillStyle = C.ink; ctx.fillRect(-440 + 9, -62 + 9, 880, 124); ctx.fillStyle = C.paper; ctx.fillRect(-440, -62, 880, 124); ctx.lineWidth = 6; ctx.strokeStyle = C.ink; ctx.strokeRect(-440, -62, 880, 124);
    ctx.save(); ctx.translate(-370, 0); ctx.fillStyle = C.white; ctx.fillRect(-36, -24, 72, 48); ctx.lineWidth = 5; ctx.strokeRect(-36, -24, 72, 48); ctx.beginPath(); ctx.moveTo(-36, -24); ctx.lineTo(0, 6); ctx.lineTo(36, -24); ctx.stroke(); ctx.restore();
    text(ctx, 'Send this to the friend who', 40, -10, font(40, 800, UI), C.ink, 'center');
    text(ctx, 'still copies his tricks', 40, 40, font(40, 800, UI), C.red2, 'center');
    ctx.restore(); }
}

const HITS = [
  [B(0.02), '4,068', 'thud'], [B(0.08), 'DAYS', 'click'], [B(0.7), 'pages', 'type', { len: 1.2, n: 8 }],
  [B(S.B), 'flashback', 'whoosh', { len: 0.4, from: 1600, to: 400 }], [B(S.B + 0.1), 'ticket', 'click'], [B(S.B + 0.4), 'counter', 'type', { len: 2.4, n: 14 }],
  [B(T('Ronaldinho')), 'name', 'pop', { pitch: 'G4' }], [B(T('competitive') + 0.12), 'stamp', 'click'],
  WH(S.C, 600, 2000), [B(T('Sunday,')), 'sunday', 'click'], [B(T('46,')), '46', 'pop', { pitch: 'D5' }], [B(tStart + 0.03), 'STARTED', 'click'], [B(tStart), 'bug flip', 'tick'],
  WH(S.D, 2000, 600), [B(T('Barcelona.') + 0.15), 'X', 'whoosh', { len: 0.25, from: 1500, to: 600 }], [B(T('Ravenna,')), 'ladder', 'tick'], [B(T('third') + 0.1), 'tier 3', 'pop', { pitch: 'G4' }],
  WH(S.E, 600, 2000), [B(T('investor')), 'investor', 'pop', { pitch: 'B4' }], [B(T('investor') + 0.1), 'coins', 'type', { len: 1.0, n: 10 }], [B(T('club.')), 'stamp', 'click'],
  WH(S.F, 2000, 600), [B(T('45') - 0.1), 'clock', 'type', { len: 0.5, n: 8 }], [B(tHT), 'half-time', 'blip', { pitch: 'E5' }], [B(T('won') - 0.1), 'FT card', 'whoosh', { len: 0.3, from: 400, to: 1400 }], [B(T('2-0.')), '2-0', 'pop', { pitch: 'D5' }],
  WH(S.G, 600, 2000), [B(T('again?')), '?', 'pop', { pitch: 'A4' }], [B(T('president')), 'ring', 'blip', { pitch: 'A5' }], [B(T('president') + 0.25), 'ring2', 'blip', { pitch: 'A5' }], [B(T('says')), 'bubble', 'pop', { pitch: 'E5' }],
  WH(S.H, 2000, 600), [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop', { pitch: 'A5' }], [B(T('more.') + 0.1), 'send', 'click'],
];

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI)], samples: 6,
  hits: HITS,
  draw(ctx, u, t) {
    if (t < S.B + 0.2) panelSlide(ctx, t, S.B, () => sHook(ctx, t), () => sPast(ctx, t), 1);
    else if (t < S.C + 0.2) panelSlide(ctx, t, S.C, () => sPast(ctx, t), () => sReturn(ctx, t), 1);
    else if (t < S.D + 0.2) panelSlide(ctx, t, S.D, () => sReturn(ctx, t), () => sLadder(ctx, t), -1);
    else if (t < S.E + 0.2) panelSlide(ctx, t, S.E, () => sLadder(ctx, t), () => sInvestor(ctx, t), 1);
    else if (t < S.F + 0.2) panelSlide(ctx, t, S.F, () => sInvestor(ctx, t), () => sMatch(ctx, t), -1);
    else if (t < S.G + 0.2) panelSlide(ctx, t, S.G, () => sMatch(ctx, t), () => sPhone(ctx, t), 1);
    else panelSlide(ctx, t, S.H, () => sPhone(ctx, t), () => sEnd(ctx, t), -1);
    panelFrame(ctx);
    if (t < S.H - 0.2) scorebug(ctx, t);
    captions(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 260; i++) { ctx.fillStyle = `rgba(60,40,20,${0.02 + 0.03 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
