// "15 km through a war zone" — Whyverse 19:00 Baku trend Short, Mon 23 Nov 2026.
// Lewis Pugh (British endurance swimmer, UN Patron of the Oceans) swam 15 km across the Strait of Hormuz over 3 days
// (15–18 Nov 2026, from Oman's Musandam peninsula to the Cape of Hormuz). ~30 min in, a tanker was hit ~4 km away; on day 2
// he passed a burning gas carrier. Aim: show the war's toll on marine wildlife. Sources: The National, ABC, Lewis Pugh Foundation, Guardian.
// Look: SEA CHART PHOTO STORY — parchment nautical chart, ink-navy line art, ONE signal-red accent (route, key words, stamps),
// real Wikimedia photos as white-bordered cards pinned to the chart, a persistent SWIM LOG at the bottom.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, rrect, hash01, clamp, TAU, cover } = M;

const TIMING = __TIMING__;
const C = { paper: '#EFE6D2', paper2: '#E4D8BE', ink: '#14263D', inkS: 'rgba(20,38,61,0.55)', inkF: 'rgba(20,38,61,0.12)',
  red: '#E0442A', redL: '#FF6A4D', sea: '#2E6E8E', cream: '#FFF8EC', white: '#FFFFFF', shadow: 'rgba(20,38,61,0.35)' };
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const slam = (t, t0, from = 1.8) => (t < t0 ? 0 : Math.min(1.06, lerp(from, 1, E.outBack(prog(t, t0, t0 + 0.28)))));
const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const LID = (id) => TIMING.lines.find((l) => l.id === id).t0;
const END = 23.7;
const S = { A: 0, B: LID('l2') - 0.1, C: T('Strait') - 0.1, D: LID('l4') - 0.1, E: LID('l5') - 0.1, F: LID('l6') - 0.1,
  G1: LID('l7') - 0.1, G2: T('show') - 0.15, Hh: LID('l8') - 0.1 };
const B = (t) => (t - 0.002) / 0.6; // 100 bpm grid
const WH = (t) => [B(t), 'wipe', 'whoosh', { len: 0.3, from: 600, to: 1600 }];
const HITS = [
  [B(0.03), 'hook 15', 'thud'], [B(0.1), 'km counter', 'type', { len: 0.9, n: 9 }], [B(T('war')), 'WAR ZONE stamp', 'thud'],
  WH(S.B), [B(T('Lewis') - 0.05), 'name tag', 'click'], [B(T('Pugh') + 0.3), 'title chip', 'tick'],
  WH(S.C), [B(T('Hormuz.')), 'strait chip', 'pop'], [B(T('3')), 'route', 'whoosh', { len: 0.6, from: 400, to: 1200 }], [B(T('Oman')), 'Oman card', 'click'], [B(T('Cape')), 'cape pin', 'pop'], [B(T('Hormuz.', 1)), 'day log', 'tick'],
  WH(S.D), [B(T('30')), 'clock', 'tick'], [B(T('tanker')), 'tanker', 'click'], [B(T('hit')), 'blast', 'sub', { len: 0.5 }], [B(T('4')), '4 km', 'pop'],
  WH(S.E), [B(T('2:')), 'DAY 2', 'thud'], [B(T('burning')), 'fire', 'crash', { len: 0.8 }], [B(T('gas')), 'gas chip', 'click'],
  WH(S.F), [B(T('man')), 'photo', 'click'], [B(T('North')), 'north pole tag', 'pop'],
  WH(S.G1), [B(T('risk')), 'question', 'pop'], WH(S.G2), [B(T('war', 1)), 'animals', 'type', { len: 1.0, n: 5 }], [B(T('wildlife.')), 'wildlife chip', 'bell'],
  WH(S.Hh), [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop'], [B(T('more.') + 0.35), 'send line', 'tick'],
];

// ---------------------------------------------------------------- helpers
function stroke(ctx, w = 4, col = C.ink) { ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); }
function big(ctx, str, x, y, size, col, k, { rot = 0, fam = D, wt = 800, max = s.w - 20, outline = null } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.font = font(size, wt, fam); const mw = ctx.measureText(str).width; if (mw > max) size = size * max / mw;
  ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.font = font(size, wt, fam); ctx.textAlign = 'center';
  if (outline) { ctx.lineJoin = 'round'; ctx.lineWidth = size * 0.14; ctx.strokeStyle = outline; ctx.strokeText(str, 0, 0); }
  ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function chip(ctx, label, x, y, size, k, { bg = C.red, fg = C.cream, rot = 0, wt = 800 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, UI); const w = ctx.measureText(label).width + size * 1.1, h = size * 1.6;
  rrect(ctx, -w / 2 + 5, -h / 2 + 7, w, h, 8); ctx.fillStyle = C.shadow; ctx.fill();
  rrect(ctx, -w / 2, -h / 2, w, h, 8); ctx.fillStyle = bg; ctx.fill();
  text(ctx, label, 0, size * 0.36, font(size, wt, UI), fg, 'center', 1); ctx.restore();
}
function path(ctx, pts, p, w = 6, col = C.ink, dash = null) {
  if (p <= 0) return; let tot = 0; const seg = [];
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); tot += d; }
  let left = tot * clamp(p); ctx.beginPath(); ctx.moveTo(...pts[0]); let end = pts[0];
  for (let i = 1; i < pts.length && left > 0; i++) { const f = Math.min(1, left / seg[i - 1]);
    end = [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]; ctx.lineTo(...end); left -= seg[i - 1]; }
  ctx.save(); if (dash) ctx.setLineDash(dash); stroke(ctx, w, col); ctx.restore(); return end;
}
// the persistent chart paper: parchment gradient, lat/long grid, depth soundings, compass rose (static, baked once)
let CHART = null;
function initChart() {
  const c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  const gr = g.createLinearGradient(0, 0, W, H); gr.addColorStop(0, C.paper); gr.addColorStop(1, C.paper2); g.fillStyle = gr; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 18; i++) { const x = hash01(i, 7) * W, y = hash01(i, 8) * H, r = 160 + 300 * hash01(i, 9);
    const rg = g.createRadialGradient(x, y, 0, x, y, r); rg.addColorStop(0, `rgba(150,110,60,${0.04 + 0.05 * hash01(i, 10)})`); rg.addColorStop(1, 'rgba(150,110,60,0)');
    g.fillStyle = rg; g.fillRect(x - r, y - r, 2 * r, 2 * r); }
  g.strokeStyle = 'rgba(20,38,61,0.10)'; g.lineWidth = 2;
  for (let x = 90; x < W; x += 180) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
  for (let y = 120; y < H; y += 180) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
  g.font = font(26, 600, UI); g.fillStyle = 'rgba(20,38,61,0.16)';
  for (let i = 0; i < 40; i++) g.fillText(String(8 + Math.floor(hash01(i, 21) * 80)), hash01(i, 22) * (W - 60), 60 + hash01(i, 23) * (H - 80));
  // compass rose, bottom-right, faint
  g.save(); g.translate(W - 170, H - 470); g.strokeStyle = 'rgba(20,38,61,0.18)'; g.fillStyle = 'rgba(20,38,61,0.14)'; g.lineWidth = 3;
  g.beginPath(); g.arc(0, 0, 120, 0, TAU); g.stroke(); g.beginPath(); g.arc(0, 0, 96, 0, TAU); g.stroke();
  for (let i = 0; i < 8; i++) { const a = i * TAU / 8, r = i % 2 ? 70 : 140; g.beginPath(); g.moveTo(0, 0); g.lineTo(Math.cos(a - 0.12) * 22, Math.sin(a - 0.12) * 22);
    g.lineTo(Math.cos(a) * r, Math.sin(a) * r); g.lineTo(Math.cos(a + 0.12) * 22, Math.sin(a + 0.12) * 22); g.closePath(); g.fill(); }
  g.font = font(40, 800, D); g.textAlign = 'center'; g.fillText('N', 0, -150); g.restore();
  for (let i = 0; i < 3000; i++) { g.fillStyle = `rgba(90,60,30,${0.03 + 0.04 * hash01(i, 12)})`; g.fillRect(hash01(i, 13) * W, hash01(i, 14) * H, 2, 2); }
  CHART = c;
}
function chart(ctx) { ctx.drawImage(CHART, 0, 0); }
// whip pan: both scenes on screen, a navy rule on the seam
function wipe(ctx, t, t0, a, b, dur = 0.32) {
  const p = E.inOutCubic(prog(t, t0 - dur * 0.55, t0 + dur * 0.45));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(-p * W, 0); a(); ctx.restore(); ctx.save(); ctx.translate((1 - p) * W, 0); b(); ctx.restore();
  const x = (1 - p) * W; ctx.fillStyle = C.ink; ctx.fillRect(x - 10, 0, 20, H); ctx.fillStyle = C.red; ctx.fillRect(x - 10, 0, 5, H);
}
// full-bleed photo with a slow log-space push
function bleed(ctx, img, t, t0, { z0 = 1.0, z1 = 1.12, fx = 0.5, fy = 0.5, dur = 3.5, tint = 0 } = {}) {
  if (!img) return; const p = clamp((t - t0) / dur), z = z0 * (z1 / z0) ** p;
  cover(ctx, img, 0, 0, W, H, { fx, fy, zoom: z });
  if (tint) { ctx.fillStyle = `rgba(20,38,61,${tint})`; ctx.fillRect(0, 0, W, H); }
}
// photo card pinned to the chart: white border, red pin, slow push inside, name tag + credit
function photo(ctx, img, x, y, w, h, t, t0, { rot = 0, z0 = 1.0, z1 = 1.14, fx = 0.5, fy = 0.4, k = 1, tag = null, sub = null, tagT = 0, credit = '' } = {}) {
  if (!img || k <= 0) return;
  const p = clamp((t - t0) / 3.0), z = z0 * (z1 / z0) ** p;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.fillStyle = C.shadow; ctx.fillRect(-w / 2 + 10, -h / 2 + 16, w + 28, h + 28);
  ctx.fillStyle = C.white; ctx.fillRect(-w / 2 - 14, -h / 2 - 14, w + 28, h + 28);
  ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.clip(); cover(ctx, img, -w / 2, -h / 2, w, h, { fx, fy, zoom: z }); ctx.restore();
  ctx.beginPath(); ctx.arc(0, -h / 2 - 2, 16, 0, TAU); ctx.fillStyle = C.red; ctx.fill(); ctx.beginPath(); ctx.arc(-5, -h / 2 - 7, 5, 0, TAU); ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.fill();
  if (credit) { ctx.font = font(20, 600, UI); const cw = ctx.measureText(credit).width + 16; ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(w / 2 - cw, -h / 2, cw, 30); text(ctx, credit, w / 2 - 8, -h / 2 + 21, font(20, 600, UI), 'rgba(255,255,255,0.92)', 'right'); }
  ctx.restore();
  if (tag) tagAt(ctx, tag, sub, x - w / 2 + 6, y + h / 2 - 34, t, tagT);
}
function tagAt(ctx, tag, sub, x, y, t, t0) {
  const kt = pop(t, t0); if (kt <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.03); ctx.scale(kt, kt);
  ctx.font = font(52, 800, D); let tw = ctx.measureText(tag).width; if (sub) { ctx.font = font(30, 700, UI); tw = Math.max(tw, ctx.measureText(sub).width + sub.length); } tw += 48;
  rrect(ctx, 6, -34, tw, sub ? 128 : 84, 8); ctx.fillStyle = C.shadow; ctx.fill();
  rrect(ctx, 0, -40, tw, sub ? 128 : 84, 8); ctx.fillStyle = C.ink; ctx.fill(); ctx.fillStyle = C.red; ctx.fillRect(0, -40, 10, sub ? 128 : 84);
  text(ctx, tag, 26, 20, font(52, 800, D), C.cream, 'left'); if (sub) text(ctx, sub, 26, 68, font(30, 700, UI), C.redL, 'left', 1); ctx.restore();
}
function stamp(ctx, label, x, y, size, t, t0, col = C.red, rot = -0.12) {
  const k = slam(t, t0, 2.2); if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.font = font(size, 800, D);
  const w = ctx.measureText(label).width + size * 0.8, h = size * 1.3; rrect(ctx, -w / 2, -h / 2, w, h, 12);
  ctx.fillStyle = 'rgba(239,230,210,0.9)'; ctx.fill(); stroke(ctx, 10, col);
  text(ctx, label, 0, size * 0.36, font(size, 800, D), col, 'center', 3); ctx.restore();
}
// swimmer glyph: a head + stroking arm, line art
function swimmer(ctx, x, y, t, sc = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  const a = t * 5; ctx.beginPath(); ctx.arc(0, 0, 18, 0, TAU); ctx.fillStyle = C.red; ctx.fill(); // cap
  ctx.beginPath(); ctx.moveTo(-6, 8); ctx.quadraticCurveTo(-30 + Math.cos(a) * 10, -30 + Math.sin(a) * 18, -54 + Math.cos(a) * 26, 6 + Math.sin(a) * 22); stroke(ctx, 8, C.ink);
  for (let i = 0; i < 3; i++) { ctx.beginPath(); const r = 30 + ((t * 40 + i * 25) % 75); ctx.arc(0, 14, r, Math.PI * 0.15, Math.PI * 0.85); ctx.globalAlpha = 1 - r / 105; stroke(ctx, 3, C.sea); ctx.globalAlpha = 1; }
  ctx.restore();
}
function waves(ctx, y0, t, n = 6, col = 'rgba(46,110,142,0.35)') {
  for (let r = 0; r < n; r++) { const y = y0 + r * 46; ctx.beginPath();
    for (let x = -20; x <= W + 20; x += 20) { const yy = y + Math.sin(x / 70 + t * 1.6 + r) * 8; x === -20 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); }
    stroke(ctx, 4, col); }
}
function ship(ctx, x, y, w, { tanker = true } = {}) { // side-view hull line art
  ctx.save(); ctx.translate(x, y);
  ctx.beginPath(); ctx.moveTo(-w / 2, -w * 0.08); ctx.lineTo(w / 2, -w * 0.08); ctx.lineTo(w / 2 - w * 0.06, w * 0.07); ctx.lineTo(-w / 2 + w * 0.03, w * 0.07); ctx.closePath();
  ctx.fillStyle = C.ink; ctx.fill();
  ctx.fillStyle = C.ink; ctx.fillRect(w * 0.28, -w * 0.2, w * 0.14, w * 0.12); ctx.fillRect(w * 0.33, -w * 0.27, w * 0.04, w * 0.08);
  if (tanker) { ctx.strokeStyle = C.paper; ctx.lineWidth = 3; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(-w * 0.4 + i * w * 0.13, -w * 0.08); ctx.lineTo(-w * 0.4 + i * w * 0.13, w * 0.05); ctx.stroke(); } }
  else { for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(-w * 0.36 + i * w * 0.15, -w * 0.08, w * 0.06, Math.PI, 0); ctx.fillStyle = C.ink; ctx.fill(); } } // LPG domes
  ctx.restore();
}
function fire(ctx, x, y, t, sz, k = 1) { // stylised flames + smoke column (no people, no gore)
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  for (let i = 0; i < 7; i++) { const ph = ((t * 0.35 + i / 7) % 1), yy = -sz * 0.4 - ph * sz * 2.6, r = sz * (0.25 + ph * 0.6), xx = Math.sin(i * 2.1 + t) * sz * 0.2 + ph * sz * 0.8;
    ctx.beginPath(); ctx.arc(xx, yy, r, 0, TAU); ctx.fillStyle = `rgba(40,40,46,${0.38 * (1 - ph)})`; ctx.fill(); }
  for (let i = 0; i < 5; i++) { const f = 1 + 0.18 * Math.sin(t * 13 + i * 1.7), xx = (i - 2) * sz * 0.16;
    ctx.beginPath(); ctx.moveTo(xx - sz * 0.13, 0); ctx.quadraticCurveTo(xx - sz * 0.1, -sz * 0.45 * f, xx, -sz * 0.7 * f); ctx.quadraticCurveTo(xx + sz * 0.1, -sz * 0.45 * f, xx + sz * 0.13, 0); ctx.closePath();
    ctx.fillStyle = i % 2 ? C.red : '#F29B38'; ctx.fill(); }
  ctx.restore();
}

// ---------------------------------------------------------------- persistent SWIM LOG (bottom)
const LOG = [[T('3'), 'SET OFF · DAY 1'], [T('hit'), 'TANKER HIT 4 KM AWAY'], [T('2:'), 'DAY 2 · BURNING SHIP'], [T('man'), 'DAY 3 · DONE']];
function swimlog(ctx, t) {
  const k = clamp(prog(t, 0.05, 0.4)); if (k <= 0) return;
  const y = s.y + s.h - 70, x0 = s.x, w = s.w, h = 128;
  const km = 15;
  const day = t >= T('man') ? 3 : t >= T('2:') ? 2 : t >= T('3') ? 1 : 0;
  const cur = LOG.filter((l) => t >= l[0]).pop(); const st = cur ? cur[1] : 'STRAIT OF HORMUZ';
  const last = cur ? cur[0] : -9; const bmp = 1 + 0.16 * Math.exp(-(t - last) * 7) * (t - last < 1);
  ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 80);
  rrect(ctx, x0 + 6, y - h / 2 + 8, w, h, 10); ctx.fillStyle = C.shadow; ctx.fill();
  rrect(ctx, x0, y - h / 2, w, h, 10); ctx.fillStyle = C.ink; ctx.fill();
  const cells = [['DISTANCE', `${km} KM`], ['DAY', day ? `${day}/3` : '—']], cw = w * 0.25;
  cells.forEach(([lab, val], i) => { const x = x0 + 28 + i * cw;
    text(ctx, lab, x, y - 20, font(24, 800, UI), 'rgba(255,248,236,0.55)', 'left', 2);
    ctx.save(); ctx.translate(x, y + 36); if (i === 1 && t - last < 1) ctx.scale(bmp, bmp); text(ctx, val, 0, 0, font(52, 800, D), C.cream, 'left'); ctx.restore(); });
  // 3-dot day track
  for (let d = 0; d < 3; d++) { ctx.beginPath(); ctx.arc(x0 + 28 + cw + 150 + d * 30, y - 28, 9, 0, TAU); ctx.fillStyle = d < day ? C.redL : 'rgba(255,248,236,0.25)'; ctx.fill(); }
  const sx = x0 + w * 0.52, sw = w * 0.46;
  ctx.save(); ctx.translate(sx + sw / 2, y); ctx.scale(bmp, bmp);
  rrect(ctx, -sw / 2 + 6, -h / 2 + 16, sw - 12, h - 32, 8); ctx.fillStyle = cur ? C.red : 'rgba(255,248,236,0.18)'; ctx.fill();
  ctx.font = font(34, 800, D); let fs = 34; const mw = ctx.measureText(st).width; if (mw > sw - 40) fs = 34 * (sw - 40) / mw;
  text(ctx, st, 0, fs * 0.36, font(fs, 800, D), C.cream, 'center', 1); ctx.restore();
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
  let x = cx - total / 2; const y = s.y + 40;
  shown.forEach((w, i) => { const k = sp(t, w.t - 0.03, SPRING.bouncy), sc = Math.min(1.1, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.22; ctx.strokeStyle = C.ink; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.redL : C.cream; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}

// ---------------------------------------------------------------- A: hook — 15 KM / THROUGH A WAR ZONE (space photo of the strait)
function sA(ctx, t, IMG) {
  bleed(ctx, IMG.sts, t, 0, { z0: 1.25, z1: 1.45, fx: 0.55, fy: 0.45, dur: 3, tint: 0.45 });
  const y0 = s.y + 520;
  const k1 = t < 0.02 ? 1 : Math.min(1.04, lerp(1.2, 1, E.outBack(prog(t, 0, 0.3))));
  big(ctx, '15', cx, y0, 420, C.cream, k1, { outline: C.ink });
  big(ctx, 'KILOMETRES', cx, y0 + 130, 110, C.cream, k1, { outline: C.ink });
  // a red swim line drawing across under the number
  const pl = prog(t, 0.2, 1.4), pts = []; for (let i = 0; i <= 30; i++) pts.push([lerp(s.x + 60, s.x + s.w - 60, i / 30), y0 + 220 + Math.sin(i * 0.9) * 14]);
  const e = path(ctx, pts, pl, 10, C.redL, [24, 16]); if (e && pl < 1) swimmer(ctx, e[0], e[1] - 6, t, 1.2);
  stamp(ctx, 'THROUGH A WAR ZONE', cx, y0 + 400, 80, t, T('war') - 0.05);
  text(ctx, 'Strait of Hormuz from space · NASA (public domain)', cx, s.y + s.h - 170, font(24, 600, UI), 'rgba(255,248,236,0.8)', 'center');
}
// ---------------------------------------------------------------- B: Lewis Pugh
function sB(ctx, t, IMG) {
  chart(ctx); waves(ctx, s.y + 980, t, 4);
  photo(ctx, IMG.head, cx, s.y + 560, 760, 780, t, S.B, { rot: -0.02, z0: 1.0, z1: 1.12, fy: 0.4, tag: 'LEWIS PUGH', sub: 'ENDURANCE SWIMMER · 56', tagT: T('Lewis') - 0.05,
    credit: 'Photo: Tessa Graham, CC BY-SA 3.0' });
  chip(ctx, 'UN PATRON OF THE OCEANS', cx + 120, s.y + 170, 38, pop(t, T('Pugh') + 0.3), { rot: 0.03, bg: C.ink });
}
// ---------------------------------------------------------------- C: the map — Strait of Hormuz, route, Oman, Cape of Hormuz
function sC(ctx, t, IMG) {
  // satellite map, pushing in toward the Musandam tip
  const p = E.inOutCubic(prog(t, S.C, S.C + 1.4)), z = 1.05 * (2.1 / 1.05) ** p;
  cover(ctx, IMG.modis, 0, 0, W, H, { fx: lerp(0.5, 0.56, p), fy: lerp(0.5, 0.42, p), zoom: z });
  ctx.fillStyle = 'rgba(20,38,61,0.18)'; ctx.fillRect(0, 0, W, H);
  chip(ctx, 'STRAIT OF HORMUZ', 300, 470, 46, pop(t, T('Hormuz.') - 0.05), { rot: -0.02 });
  // route schematic over the strait
  const t3 = T('3'); const a = [730, 940], b = [640, 480];
  const ctl = [[730, 940], [770, 800], [775, 660], [745, 550], [700, 500], [640, 480]];
  const pts = []; for (let i = 0; i < ctl.length - 1; i++) for (let j = 0; j < 8; j++) { const f = j / 8; pts.push([lerp(ctl[i][0], ctl[i + 1][0], f) + Math.sin((i * 8 + j) * 0.8) * 6, lerp(ctl[i][1], ctl[i + 1][1], f)]); } pts.push(b);
  const e = path(ctx, pts, E.inOutCubic(prog(t, t3, t3 + 2.2)), 12, C.redL, [26, 16]);
  if (t >= t3) { ctx.beginPath(); ctx.arc(a[0], a[1], 20, 0, TAU); ctx.fillStyle = C.cream; ctx.fill(); stroke(ctx, 6, C.red); }
  if (e && t < t3 + 2.2) swimmer(ctx, e[0], e[1], t, 1.1);
  // start: Oman (Musandam) photo card; end: Cape of Hormuz pin
  photo(ctx, IMG.fjord, 290, 860, 400, 270, t, T('Oman') - 0.1, { rot: -0.05, k: pop(t, T('Oman') - 0.1), credit: 'Eckhard Pecher, CC BY 2.5' });
  tagAt(ctx, 'OMAN', 'MUSANDAM PENINSULA', 80, 1050, t, T('Oman'));
  const kp = pop(t, T('Cape') - 0.05);
  if (kp > 0) { ctx.save(); ctx.translate(b[0], b[1]); ctx.scale(kp, kp); ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-34, -44, -34, -84, 0, -84); ctx.bezierCurveTo(34, -84, 34, -44, 0, 0);
    ctx.fillStyle = C.red; ctx.fill(); ctx.beginPath(); ctx.arc(0, -58, 12, 0, TAU); ctx.fillStyle = C.cream; ctx.fill(); ctx.restore();
    chip(ctx, 'CAPE OF HORMUZ', b[0] + 150, b[1] - 120, 40, kp, { bg: C.ink, rot: 0.02 }); }
  chip(ctx, '3 DAYS · 15–18 NOV', 330, 600, 40, pop(t, T('days,') - 0.05), { bg: C.cream, fg: C.ink, rot: -0.04 });
  text(ctx, 'Map: NASA MODIS (public domain) · route schematic', cx, 1300, font(24, 600, UI), 'rgba(255,248,236,0.85)', 'center');
}
// ---------------------------------------------------------------- D: 30 minutes in — a tanker hit 4 km away
function sD(ctx, t) {
  chart(ctx);
  const sea = s.y + 760; ctx.fillStyle = 'rgba(46,110,142,0.16)'; ctx.fillRect(0, sea - 20, W, 520); waves(ctx, sea, t, 9);
  const sx = s.x + 130, tx = s.x + s.w - 210;
  swimmer(ctx, sx + (t - S.D) * 12, sea + 40, t, 2.0);
  // clock +30 MIN
  const kc = pop(t, T('30') - 0.05);
  if (kc > 0) { ctx.save(); ctx.translate(s.x + 200, s.y + 400); ctx.scale(kc * 1.5, kc * 1.5); ctx.beginPath(); ctx.arc(0, 0, 100, 0, TAU); ctx.fillStyle = C.cream; ctx.fill(); stroke(ctx, 10, C.ink);
    const a = -Math.PI / 2 + Math.PI * E.outCubic(prog(t, T('30'), T('30') + 0.9)); ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 80, -Math.PI / 2, a); ctx.closePath(); ctx.fillStyle = 'rgba(224,68,42,0.35)'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * 78, Math.sin(a) * 78); stroke(ctx, 9, C.red); ctx.restore();
    big(ctx, '+30 MIN', s.x + 200, s.y + 640, 80, C.ink, kc); }
  // tanker slides in on the horizon
  const kt = sp(t, T('tanker') - 0.15, SPRING.smooth);
  if (kt > 0) ship(ctx, lerp(W + 300, tx, kt), sea - 6, 420);
  // the hit: flash ring + smoke (no detail, no people)
  const th = T('hit');
  if (t >= th) { const r = 40 + 380 * E.outCubic(prog(t, th, th + 0.6)); ctx.beginPath(); ctx.arc(tx, sea - 40, r, 0, TAU); ctx.globalAlpha = 1 - prog(t, th, th + 0.6); stroke(ctx, 10, C.red); ctx.globalAlpha = 1;
    fire(ctx, tx - 60, sea - 50, t, 170, Math.min(1, sp(t, th, SPRING.snappy))); }
  stamp(ctx, 'HIT', tx, s.y + 360, 120, t, th, C.red, 0.1);
  // measuring line: 4 KM
  const t4 = T('4'), pm = E.inOutCubic(prog(t, t4 - 0.05, t4 + 0.5));
  if (pm > 0) { const y = sea + 190; path(ctx, [[sx, y], [lerp(sx, tx, pm), y]], 1, 7, C.ink);
    [[sx], [lerp(sx, tx, pm)]].forEach(([x]) => { ctx.beginPath(); ctx.moveTo(x, y - 24); ctx.lineTo(x, y + 24); stroke(ctx, 7, C.ink); });
    big(ctx, '4 KM AWAY', (sx + tx) / 2, y + 120, 110, C.red, pop(t, t4)); }
}
// ---------------------------------------------------------------- E: day 2 — a burning gas ship (Houghton's 1825 coast drawing as the backdrop)
function sE(ctx, t, IMG) {
  chart(ctx);
  ctx.save(); ctx.globalAlpha = 0.85; cover(ctx, IMG.hough, 0, s.y + 120, W, 520, { fx: 0.5, fy: 0.62, zoom: 1.6 * (1.75 / 1.6) ** clamp((t - S.E) / 2.5) }); ctx.restore();
  text(ctx, 'Musandam coast, drawn 1825 · M. Houghton (public domain)', cx, s.y + 670, font(22, 600, UI), C.inkS, 'center');
  big(ctx, 'DAY 2', s.x + 200, s.y + 330, 170, C.red, slam(t, T('2:') - 0.05), { rot: -0.04, outline: C.paper });
  const sea = s.y + 900; ctx.fillStyle = 'rgba(46,110,142,0.16)'; ctx.fillRect(0, sea - 10, W, 440); waves(ctx, sea, t, 8);
  const shx = lerp(s.x + s.w + 200, cx + 120, sp(t, S.E, SPRING.smooth));
  ship(ctx, shx, sea, 600, { tanker: false });
  fire(ctx, shx - 80, sea - 50, t, 230, sp(t, T('burning') - 0.1));
  swimmer(ctx, lerp(s.x + 60, s.x + 330, prog(t, S.E, S.E + 2.6)), sea + 150, t, 1.3);
  chip(ctx, 'BURNING GAS CARRIER (LPG)', cx, sea + 290, 40, pop(t, T('gas') - 0.05), { rot: 0.02 });
}
// ---------------------------------------------------------------- F: the man who swam at the North Pole
function sF(ctx, t, IMG) {
  bleed(ctx, IMG.ice, t, S.F, { z0: 1.05, z1: 1.18, dur: 3, tint: 0.25 });
  photo(ctx, IMG.berg, s.x + s.w - 260, s.y + 330, 420, 280, t, S.F + 0.1, { rot: 0.06, z0: 1.4, z1: 1.55, fx: 0.15, fy: 0.45, k: pop(t, S.F + 0.05), credit: 'Lewispugh, CC BY-SA 3.0' });
  photo(ctx, IMG.npole, cx - 20, s.y + 760, 840, 560, t, T('man') - 0.1, { rot: -0.025, z0: 1.05, z1: 1.2, fx: 0.55, fy: 0.5, k: pop(t, T('man') - 0.1), tag: 'NORTH POLE', sub: '2007 · HE SWAM HERE', tagT: T('North') - 0.05,
    credit: 'Lewispugh, CC BY-SA 3.0' });
  text(ctx, 'Sea ice: Matti&Keti, CC BY-SA 4.0', cx, 1320, font(22, 600, UI), 'rgba(20,38,61,0.75)', 'center');
}
// ---------------------------------------------------------------- G1: why risk it?
function sG1(ctx, t, IMG) {
  chart(ctx);
  photo(ctx, IMG.unep, cx, s.y + 640, 820, 660, t, S.G1, { rot: 0.02, z0: 1.25, z1: 1.38, fx: 0.18, fy: 0.3, tag: 'LEWIS PUGH', sub: 'UN PATRON OF THE OCEANS', tagT: S.G1 + 0.15,
    credit: 'Photo: Lewis Pugh / UNEP, CC BY-SA 3.0' });
  big(ctx, 'WHY RISK IT?', cx, s.y + 270, 130, C.red, slam(t, T('risk') - 0.05), { rot: -0.03, outline: C.paper });
}
// ---------------------------------------------------------------- G2: the war's toll on ocean wildlife
function animal(ctx, kind, x, y, sc, k, t) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y + Math.sin(t * 2 + x) * 8); ctx.scale(sc * k, sc * k); ctx.fillStyle = C.ink;
  if (kind === 'turtle') { ctx.beginPath(); ctx.ellipse(0, 0, 60, 42, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(70, -6, 20, 0, TAU); ctx.fill();
    [[-40, -40, -0.6], [40, -40, 0.6], [-40, 40, 0.6], [40, 40, -0.6]].forEach(([a, b, r]) => { ctx.save(); ctx.translate(a, b); ctx.rotate(r); ctx.beginPath(); ctx.ellipse(0, 0, 30, 12, 0, 0, TAU); ctx.fill(); ctx.restore(); });
    ctx.strokeStyle = C.paper; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-30, -20); ctx.lineTo(0, 0); ctx.lineTo(30, -20); ctx.moveTo(0, 0); ctx.lineTo(0, 35); ctx.stroke(); }
  if (kind === 'dolphin') { ctx.beginPath(); ctx.moveTo(-90, 10); ctx.quadraticCurveTo(-20, -60, 70, -10); ctx.lineTo(100, -4); ctx.lineTo(70, 6); ctx.quadraticCurveTo(0, 30, -90, 10); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-10, -32); ctx.lineTo(10, -70); ctx.lineTo(24, -30); ctx.fill(); ctx.beginPath(); ctx.moveTo(-88, 10); ctx.lineTo(-120, -20); ctx.lineTo(-110, 14); ctx.lineTo(-124, 38); ctx.fill(); }
  if (kind === 'fish') { ctx.beginPath(); ctx.ellipse(0, 0, 50, 24, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(-80, -26); ctx.lineTo(-80, 26); ctx.fill();
    ctx.beginPath(); ctx.arc(26, -6, 6, 0, TAU); ctx.fillStyle = C.paper; ctx.fill(); }
  if (kind === 'bird') { ctx.beginPath(); ctx.moveTo(-80, 0); ctx.quadraticCurveTo(-40, -50, 0, 0); ctx.quadraticCurveTo(40, -50, 80, 0); stroke(ctx, 12, C.ink); }
  if (kind === 'coral') { for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.moveTo(0, 50); ctx.quadraticCurveTo((i - 2) * 20, 0, (i - 2) * 34, -50 + Math.abs(i - 2) * 12); stroke(ctx, 12, C.ink); } }
  ctx.restore();
}
function sG2(ctx, t) {
  chart(ctx);
  const sea = s.y + 420; ctx.fillStyle = 'rgba(46,110,142,0.18)'; ctx.fillRect(0, sea, W, 760); waves(ctx, sea, t, 3);
  // a slow-spreading oil sheen on the surface
  const po = E.outCubic(prog(t, T('war', 1) - 0.1, T('war', 1) + 1.6)); if (po > 0) { ctx.beginPath(); ctx.ellipse(cx + 80, sea + 8, 60 + 380 * po, 18 + 30 * po, 0, 0, TAU); ctx.fillStyle = 'rgba(20,20,26,0.55)'; ctx.fill(); }
  const tw = T('war', 1);
  animal(ctx, 'bird', s.x + 200, sea - 160, 0.9, pop(t, tw - 0.2), t);
  animal(ctx, 'dolphin', cx + 150, sea + 210, 1.3, pop(t, tw), t);
  animal(ctx, 'turtle', s.x + 230, sea + 430, 1.2, pop(t, tw + 0.25), t);
  animal(ctx, 'fish', cx + 220, sea + 520, 1.2, pop(t, tw + 0.5), t);
  animal(ctx, 'coral', s.x + s.w - 120, sea + 640, 1.3, pop(t, tw + 0.7), t);
  big(ctx, "WAR'S TOLL", cx, s.y + 270, 120, C.ink, pop(t, S.G2 + 0.05));
  chip(ctx, 'ON OCEAN WILDLIFE', cx, s.y + 370, 46, pop(t, T('wildlife.') - 0.05));
}
// ---------------------------------------------------------------- H: end card
function envelope(ctx, x, y, w) {
  const h = w * 0.66; ctx.save(); ctx.translate(x, y); rrect(ctx, -w / 2, -h / 2, w, h, 4); ctx.fillStyle = C.cream; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(0, h * 0.1); ctx.lineTo(w / 2, -h / 2); stroke(ctx, 4, C.ink); ctx.restore();
}
function sH(ctx, t) {
  chart(ctx); waves(ctx, s.y + 1000, t, 3);
  big(ctx, '15 KM · 3 DAYS', cx, s.y + 290, 110, C.red, pop(t, S.Hh - 0.1));
  text(ctx, 'LEWIS PUGH · STRAIT OF HORMUZ · NOV 2026', cx, s.y + 370, font(34, 800, UI), C.ink, 'center', 2);
  text(ctx, 'WHYVERSE', cx, s.y + 540, font(96, 800, D), C.ink, 'center', 8);
  const btn = (x, label, bg, fg, k, icon, rot) => { if (k <= 0) return; ctx.save(); ctx.translate(x, s.y + 720); ctx.rotate(rot); ctx.scale(k, k);
    rrect(ctx, -184, -64, 380, 144, 72); ctx.fillStyle = C.shadow; ctx.fill();
    rrect(ctx, -190, -72, 380, 144, 72); ctx.fillStyle = bg; ctx.fill(); icon(); text(ctx, label, 45, 24, font(62, 800, D), fg, 'center'); ctx.restore(); };
  btn(cx - 205, 'LIKE', C.cream, C.ink, pop(t, T('Like') - 0.05), () => { const hb = 1 + 0.15 * Math.max(0, Math.sin((t - T('Like')) * 9)) * Math.exp(-(t - T('Like')) * 2);
    ctx.save(); ctx.translate(-105, 6); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30); ctx.fillStyle = C.red; ctx.fill(); ctx.restore(); }, -0.04);
  btn(cx + 205, 'FOLLOW', C.red, C.cream, pop(t, T('follow') - 0.05), () => { ctx.save(); ctx.translate(-115, 4); ctx.lineWidth = 13; ctx.strokeStyle = C.cream; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-24, 0); ctx.lineTo(24, 0); ctx.moveTo(0, -24); ctx.lineTo(0, 24); ctx.stroke(); ctx.restore(); }, 0.04);
  const kS = pop(t, T('more.') + 0.3);
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 910); ctx.scale(kS, kS); rrect(ctx, -430, -72, 860, 144, 14); ctx.fillStyle = C.ink; ctx.fill();
    envelope(ctx, -360, 0, 70);
    text(ctx, 'Send this to the friend who', 40, -12, font(40, 800, UI), C.cream, 'center'); text(ctx, 'says the pool is too cold', 40, 40, font(40, 800, UI), C.redL, 'center'); ctx.restore(); }
  text(ctx, 'Sources: The National, ABC, The Guardian, Lewis Pugh Foundation (21–23 Nov 2026)', cx, s.y + 1060, font(23, 600, UI), C.inkS, 'center');
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 600, UI), font(40, 700, UI)],
  images: { sts: 'assets/2026-11-23_w_hormuz_sts.jpg', modis: 'assets/2026-11-23_w_hormuz_modis.jpg', head: 'assets/2026-11-23_w_pugh_head.jpg', fjord: 'assets/2026-11-23_w_musandam_fjord.jpg',
    hough: 'assets/2026-11-23_w_houghton1825.jpg', ice: 'assets/2026-11-23_w_npole_ice.jpg', npole: 'assets/2026-11-23_w_pugh_npole.jpg', berg: 'assets/2026-11-23_w_pugh_berg.jpg', unep: 'assets/2026-11-23_w_pugh_unep.jpg' },
  hits: HITS,
  init() { initChart(); },
  draw(ctx, u, t, IMG) {
    const seq = [[S.A, sA], [S.B, sB], [S.C, sC], [S.D, sD], [S.E, sE], [S.F, sF], [S.G1, sG1], [S.G2, sG2], [S.Hh, sH]];
    let i = seq.length - 1; while (i > 0 && t < seq[i][0] - 0.18) i--;
    const cur = seq[i], nxt = seq[i + 1];
    if (nxt && t > nxt[0] - 0.18) wipe(ctx, t, nxt[0], () => cur[1](ctx, t, IMG), () => nxt[1](ctx, t, IMG));
    else if (i > 0 && t < cur[0] + 0.15) wipe(ctx, t, cur[0], () => seq[i - 1][1](ctx, t, IMG), () => cur[1](ctx, t, IMG));
    else cur[1](ctx, t, IMG);
    if (t < S.Hh - 0.15) swimlog(ctx, t);
    captions(ctx, t);
  },
  post(ctx, u, t) { const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(30,20,10,0.28)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); },
});
