// "Nvidia +$950 billion in one day" — Whyverse 19:00 Baku trend Short, Tue 24 Nov 2026. Pure function of time.
// Nvidia's board reinstated Jensen Huang as CEO on Mon 23 Nov 2026, 11 days after he resigned (12 Nov). NVDA closed +31.5%,
// adding ~$952–954 bn of market value — a one-day record for any company (Kiplinger 23 Nov; Yahoo Finance 24 Nov; Admiral Markets; thewillnews).
// Look: TRADING TERMINAL PHOTO STORY — near-black terminal, thin grid, market green + one red, full-bleed real Wikimedia photos
// with slow log-space zooms and push transitions, a persistent HUD ticker panel (counter), fixed subtitle bar (viewer feedback 24 Nov).
import * as M from './lib/motion.js';
const { W, H, E, prog, lerp, spring, SPRING, font, text, hash01, clamp, TAU } = M;

const TIMING = {"dur": 25.2, "lines": [{"id": "l1", "t0": 0.1, "t1": 4.319, "words": [{"w": "Nvidia", "t": 0.13, "key": true}, {"w": "gained", "t": 0.676, "key": false}, {"w": "over", "t": 1.223, "key": false}, {"w": "$950 billion", "t": 1.633, "key": true}, {"w": "in", "t": 3.204, "key": false}, {"w": "one", "t": 3.477, "key": false}, {"w": "day.", "t": 3.818, "key": true}]}, {"id": "l2", "t0": 4.75, "t1": 6.651, "words": [{"w": "No", "t": 4.78, "key": false}, {"w": "company", "t": 4.963, "key": false}, {"w": "has", "t": 5.375, "key": false}, {"w": "ever", "t": 5.604, "key": true}, {"w": "gained", "t": 5.879, "key": false}, {"w": "more.", "t": 6.245, "key": false}]}, {"id": "l3", "t0": 7.0, "t1": 8.77, "words": [{"w": "Why?", "t": 7.03, "key": false}, {"w": "Jensen", "t": 7.62, "key": true}, {"w": "Huang", "t": 7.943, "key": true}, {"w": "is", "t": 8.226, "key": false}, {"w": "back.", "t": 8.388, "key": true}]}, {"id": "l4", "t0": 9.25, "t1": 11.951, "words": [{"w": "He", "t": 9.33, "key": false}, {"w": "resigned", "t": 9.548, "key": true}, {"w": "as", "t": 10.092, "key": false}, {"w": "CEO", "t": 10.31, "key": false}, {"w": "on", "t": 10.582, "key": false}, {"w": "November", "t": 10.799, "key": true}, {"w": "12th.", "t": 11.343, "key": true}]}, {"id": "l5", "t0": 12.5, "t1": 14.48, "words": [{"w": "Eleven", "t": 12.53, "key": true}, {"w": "days", "t": 12.907, "key": false}, {"w": "later,", "t": 13.19, "key": false}, {"w": "he", "t": 13.76, "key": false}, {"w": "returned.", "t": 13.931, "key": true}]}, {"id": "l6", "t0": 15.0, "t1": 16.816, "words": [{"w": "Shares", "t": 15.04, "key": false}, {"w": "jumped", "t": 15.495, "key": false}, {"w": "31%", "t": 15.95, "key": true}]}, {"id": "l7", "t0": 17.25, "t1": 20.271, "words": [{"w": "One", "t": 17.28, "key": false}, {"w": "man.", "t": 17.59, "key": true}, {"w": "One", "t": 18.02, "key": false}, {"w": "day.", "t": 18.25, "key": true}, {"w": "Nearly", "t": 18.83, "key": false}, {"w": "a", "t": 19.193, "key": false}, {"w": "trillion", "t": 19.329, "key": true}, {"w": "dollars.", "t": 19.782, "key": false}]}, {"id": "l8", "t0": 21.0, "t1": 22.962, "words": [{"w": "Like", "t": 21.03, "key": false}, {"w": "and", "t": 21.302, "key": false}, {"w": "follow", "t": 21.528, "key": false}, {"w": "Whyverse", "t": 21.89, "key": true}, {"w": "for", "t": 22.342, "key": false}, {"w": "more.", "t": 22.568, "key": false}]}]};
const PHOTOS = {"hces": {"src": "img/hces.jpg", "credit": "Joseph Zadeh / CC BY-SA 4.0"}, "nasdaq2": {"src": "img/nasdaq2.jpg", "credit": "Luca Marf\u00e8 / CC BY 2.0"}, "nasdaq": {"src": "img/nasdaq.jpg", "credit": "ajay_suresh / CC BY 2.0"}, "hstan": {"src": "img/hstan.jpg", "credit": "Anderseidesvik / CC BY-SA 4.0"}, "h2010": {"src": "img/h2010.jpg", "credit": "Masaru Kamikura / CC BY 2.0"}, "hq": {"src": "img/hq.jpg", "credit": "Coolcaesar / CC BY-SA 4.0"}, "hstan2": {"src": "img/hstan2.jpg", "credit": "Anderseidesvik / CC BY 4.0"}, "h2016": {"src": "img/h2016.jpg", "credit": "NVIDIA Taiwan / CC BY 2.0"}, "hstan3": {"src": "img/hstan3.jpg", "credit": "Anderseidesvik / CC BY 4.0"}, "die": {"src": "img/die.jpg", "credit": "Fritzchens Fritz / CC0"}, "hq2": {"src": "img/hq2.jpg", "credit": "Daniel J. Prostak / CC BY-SA 4.0"}};
const C = { bg: '#05080A', panel: 'rgba(5,9,11,0.86)', grid: 'rgba(120,255,180,0.06)', white: '#F2F5F3', dim: '#8A9A93',
  green: '#2BE38A', greenD: '#0E6B43', red: '#FF4D5E', gold: '#FFD166', ink: '#020405' };
const D = 'Display', UI = 'UI';
const s = M.FORMAT.safe, cx = W / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const T = (w, n = 0) => { const m = TIMING.lines.flatMap((l) => l.words).filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const LID = (id) => TIMING.lines.find((l) => l.id === id);
const END = TIMING.dur;
const B = (t) => (t - 0.00159) / 0.60002;
const BAR_Y = 1350;
const q = (t) => Math.floor(t * 20) / 20;
const fade = (t, a, b, f = 0.18) => clamp(Math.min((t - a) / f + 1, (b - t) / f + 1));
const EC = 20.9; // end card

// ---------------------------------------------------------------- shots (each a DIFFERENT real photo)
const SHOTS = [
  { k: 'hces', t0: 0, t1: 2.45, z: [1.0, 1.14], fx: 0.5, fy: 0.5 },
  { k: 'nasdaq2', t0: 2.45, t1: 4.7, z: [1.05, 1.2], fx: 0.55, fy: 0.5 },
  { k: 'nasdaq', t0: 4.7, t1: 7.0, z: [1.7, 1.9], fx: 0.5, fy: 0.18 },
  { k: 'hstan', t0: 7.0, t1: 9.2, z: [1.0, 1.1], fx: 0.5, fy: 0.3 },
  { k: 'h2010', t0: 9.2, t1: 10.7, z: [1.15, 1.3], fx: 0.38, fy: 0.5 },
  { k: 'hq', t0: 10.7, t1: 12.45, z: [1.0, 1.12], fx: 0.75, fy: 0.5 },
  { k: 'hstan2', t0: 12.45, t1: 14.9, z: [1.0, 1.1], fx: 0.5, fy: 0.35 },
  { k: 'h2016', t0: 14.9, t1: 17.2, z: [1.05, 1.2], fx: 0.6, fy: 0.4 },
  { k: 'hstan3', t0: 17.2, t1: 18.0, z: [1.1, 1.2], fx: 0.5, fy: 0.3 },
  { k: 'die', t0: 18.0, t1: 18.75, z: [1.0, 1.15], fx: 0.5, fy: 0.5 },
  { k: 'hq2', t0: 18.75, t1: EC, z: [1.0, 1.15], fx: 0.5, fy: 0.6 },
];
let IMGS = {};
function drawShot(ctx, sh, t, dx) {
  const im = IMGS[sh.k]; ctx.save(); ctx.translate(dx, 0);
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
  if (im) { const p = prog(t, sh.t0 - 0.3, sh.t1 + 0.3); const z = sh.z[0] * (sh.z[1] / sh.z[0]) ** p;
    M.cover(ctx, im, 0, 0, W, H, { fx: sh.fx, fy: sh.fy, zoom: z }); }
  // terminal tint + legibility gradients
  ctx.fillStyle = 'rgba(2,10,8,0.28)'; ctx.fillRect(0, 0, W, H);
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, 'rgba(2,5,6,0.85)'); g.addColorStop(0.25, 'rgba(2,5,6,0.15)');
  g.addColorStop(0.55, 'rgba(2,5,6,0.1)'); g.addColorStop(0.8, 'rgba(2,5,6,0.75)'); g.addColorStop(1, 'rgba(2,5,6,0.95)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const cr = PHOTOS[sh.k] && PHOTOS[sh.k].credit;
  if (cr) { ctx.globalAlpha = 0.75; text(ctx, 'Photo: ' + cr, s.x + 14, 1226, font(22, 600, UI), C.white, 'left'); ctx.globalAlpha = 1; }
  ctx.restore();
}
function photos(ctx, t) {
  const i = SHOTS.findIndex((x) => t >= x.t0 && t < x.t1); if (i < 0) return;
  const cur = SHOTS[i], nxt = SHOTS[i + 1];
  const tb = cur.t1, p = nxt ? E.inOutCubic(prog(t, tb - 0.16, tb + 0.0)) : 0;
  if (p > 0 && nxt) { drawShot(ctx, cur, t, -p * W * 0.5); ctx.save(); ctx.beginPath(); ctx.rect((1 - p) * W, 0, W, H); ctx.clip(); drawShot(ctx, nxt, t, (1 - p) * W * 0.4); ctx.restore(); }
  else drawShot(ctx, cur, t, 0);
}
// faint terminal grid over everything (static)
function grid(ctx) {
  ctx.strokeStyle = C.grid; ctx.lineWidth = 2;
  for (let x = 60; x < W; x += 120) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 40; y < H; y += 120) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
}
// ---------------------------------------------------------------- helpers
function big(ctx, str, x, y, size, col, k, { rot = 0, fam = D, wt = 800, align = 'center', max = s.w - 40 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.font = font(size, wt, fam); const mw = ctx.measureText(str).width; if (mw > max) size *= max / mw;
  ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.font = font(size, wt, fam); ctx.textAlign = align; ctx.lineJoin = 'round';
  ctx.lineWidth = size * 0.1; ctx.strokeStyle = C.ink; ctx.strokeText(str, 0, 0); ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function tag(ctx, label, x, y, size, k, { bg = C.green, fg = C.ink, rot = 0 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.font = font(size, 800, UI);
  const w = ctx.measureText(label).width + size * 1.0, h = size * 1.55;
  ctx.fillStyle = bg; M.rrect(ctx, -w / 2, -h / 2, w, h, 10); ctx.fill();
  ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.fillText(label, 0, size * 0.36); ctx.restore();
}
function tri(ctx, x, y, r, up, col) { ctx.fillStyle = col; ctx.beginPath();
  if (up) { ctx.moveTo(x, y - r); ctx.lineTo(x + r, y + r * 0.7); ctx.lineTo(x - r, y + r * 0.7); }
  else { ctx.moveTo(x, y + r); ctx.lineTo(x + r, y - r * 0.7); ctx.lineTo(x - r, y - r * 0.7); } ctx.closePath(); ctx.fill(); }
// a schematic rising line (no values on it)
function riseLine(ctx, x0, y0, x1, y1, p, col, w = 14) {
  if (p <= 0) return; const pts = []; const n = 40;
  for (let i = 0; i <= n; i++) { const f = i / n; const jag = (hash01(i, 77) - 0.5) * 40 * (1 - f * 0.4);
    pts.push([lerp(x0, x1, f), lerp(y0, y1, f < 0.6 ? f * 0.15 : 0.09 + (f - 0.6) / 0.4 * 0.91) + jag]); }
  const m = Math.max(1, Math.floor(n * clamp(p)));
  ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i <= m; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.lineWidth = w + 10; ctx.strokeStyle = 'rgba(2,5,6,0.6)'; ctx.stroke(); ctx.lineWidth = w; ctx.strokeStyle = col; ctx.stroke();
  const e = pts[m]; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(e[0], e[1], w * 1.1, 0, TAU); ctx.fill(); ctx.restore();
}
const money = (v) => '$' + Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// ---------------------------------------------------------------- persistent HUD (counter panel)
function hud(ctx, t) {
  const y0 = 150, h = 190, x0 = s.x + 10, w = s.w - 20;
  ctx.fillStyle = C.panel; M.rrect(ctx, x0, y0, w, h, 22); ctx.fill();
  ctx.strokeStyle = 'rgba(43,227,138,0.35)'; ctx.lineWidth = 3; ctx.stroke();
  // ticker chip
  ctx.fillStyle = C.green; M.rrect(ctx, x0 + 26, y0 + 30, 170, 62, 10); ctx.fill();
  text(ctx, 'NVDA', x0 + 111, y0 + 75, font(42, 800, D), C.ink, 'center');
  // live dot
  const blink = 0.5 + 0.5 * Math.sin(t * 6); ctx.fillStyle = `rgba(255,77,94,${0.4 + 0.6 * blink})`; ctx.beginPath(); ctx.arc(x0 + 228, y0 + 61, 9, 0, TAU); ctx.fill();
  text(ctx, 'LIVE', x0 + 248, y0 + 72, font(30, 700, UI), C.dim, 'left');
  let label, val, col = C.green, up = true;
  if (t < 9.2 || t >= 17.2) { label = 'MARKET VALUE ADDED · 23 NOV'; const v = 950; val = '+$' + Math.round(v) + 'B'; }
  else if (t < 14.9) { label = 'DAYS WITHOUT HUANG'; const d = t < 12.45 ? 0 : Math.round(11 * E.inOutCubic(prog(q(t), 12.6, 13.9))); val = d + (d === 1 ? ' DAY' : ' DAYS');
    col = t < 12.45 ? C.red : (d >= 11 ? C.green : C.white); up = d >= 11; if (t < 12.45) up = false; }
  else { label = 'NVDA SHARES · 23 NOV'; val = '+' + (31.5 * E.outCubic(prog(q(t), 15.0, 16.3))).toFixed(1) + '%'; }
  text(ctx, label, x0 + 26, y0 + 150, font(30, 700, UI), C.dim, 'left');
  ctx.font = font(88, 800, D); const vw = ctx.measureText(val).width;
  text(ctx, val, x0 + w - 30, y0 + 118, font(88, 800, D), col, 'right');
  if (!(t >= 9.2 && t < 12.45) || true) tri(ctx, x0 + w - 60 - vw, y0 + 86, 20, up, col);
}
// ---------------------------------------------------------------- decoration (ONE element at a time)
function decor(ctx, t) {
  const Y = 760;
  if (t < 4.7) { // hook: the number on frame 0
    const k = t < 0.05 ? 1 : 1, a = fade(t, -1, 4.6);
    ctx.globalAlpha = a;
    big(ctx, '$950', cx, Y - 40, 330, C.green, k * (1 + 0.02 * Math.sin(t * 3)));
    big(ctx, 'BILLION', cx, Y + 90, 130, C.white, 1);
    tag(ctx, 'IN ONE DAY', cx, Y + 200, 54, t < 0.02 ? 1 : 1, { bg: C.white });
    if (t > 2.45) riseLine(ctx, s.x + 40, 1130, s.x + s.w - 60, 960, E.outCubic(prog(t, 2.5, 3.9)), C.green, 12);
    ctx.globalAlpha = 1; return;
  }
  if (t < 7.0) { const a = fade(t, 4.75, 6.95), k = pop(t, 4.8) * a;
    // record medal
    ctx.save(); ctx.globalAlpha = a; ctx.translate(cx, Y - 60); ctx.scale(k, k); ctx.rotate(-0.05);
    ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(0, 0, 150, 0, TAU); ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 10; ctx.stroke();
    ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, 120, 0, TAU); ctx.stroke();
    text(ctx, '#1', 0, 52, font(150, 800, D), C.ink, 'center'); ctx.restore();
    tag(ctx, 'BIGGEST ONE-DAY GAIN EVER', cx, Y + 170, 50, sp(t, T('ever') - 0.1) * a, { bg: C.gold });
    ctx.globalAlpha = 1; return;
  }
  if (t < 9.2) { const a = fade(t, 7.0, 9.15);
    if (t < 7.6) { big(ctx, 'WHY?', cx, Y, 260, C.gold, pop(t, 7.03)); return; }
    const k = sp(t, 7.6) * a; ctx.save(); ctx.globalAlpha = a; ctx.translate(lerp(-500, 0, k), 0);
    ctx.fillStyle = C.green; ctx.fillRect(s.x + 20, 1020, 16, 150);
    text(ctx, 'JENSEN HUANG', s.x + 56, 1095, font(96, 800, D), C.white, 'left');
    text(ctx, 'NVIDIA CO-FOUNDER · CEO', s.x + 60, 1155, font(40, 700, UI), C.green, 'left'); ctx.restore(); return;
  }
  if (t < 10.7) { const a = fade(t, 9.25, 10.65); ctx.globalAlpha = a; tag(ctx, 'CEO SINCE 1993', cx, 1090, 56, sp(t, 9.3), { bg: C.white }); ctx.globalAlpha = 1; return; }
  if (t < 14.9) { calendar(ctx, t); return; }
  if (t < 17.2) { const a = fade(t, 14.95, 17.15); ctx.globalAlpha = a;
    riseLine(ctx, s.x + 30, 1150, s.x + s.w - 50, 880, E.outCubic(prog(t, 15.0, 16.2)), C.green, 14);
    big(ctx, '+31%', cx, Y, 300, C.green, pop(t, T('31%') - 0.05)); ctx.globalAlpha = 1; return; }
  if (t < 18.0) { big(ctx, '1 MAN', cx, Y + 200, 210, C.white, pop(t, 17.25)); return; }
  if (t < 18.75) { big(ctx, '1 DAY', cx, Y + 200, 210, C.green, pop(t, 18.0)); return; }
  if (t < EC) { const a = fade(t, 18.8, EC - 0.05); ctx.globalAlpha = a;
    const v = 950e9 * E.outCubic(prog(q(t), 18.85, 19.7));
    big(ctx, money(v), cx, Y, 150, C.green, sp(t, 18.8));
    tag(ctx, 'NEARLY $1 TRILLION', cx, Y + 130, 52, sp(t, T('trillion') - 0.1), { bg: C.gold });
    ctx.globalAlpha = 1; }
}
function calendar(ctx, t) {
  const back = t >= 12.45, a = fade(t, 10.75, 14.85);
  const k = sp(t, 10.75) * a, flip = back ? E.inOutCubic(prog(t, 12.55, 12.95)) : 0;
  ctx.save(); ctx.globalAlpha = a; ctx.translate(cx, 760); ctx.scale(k, k); ctx.rotate(-0.03);
  const w = 420, h = 440;
  ctx.fillStyle = 'rgba(0,0,0,0.4)'; M.rrect(ctx, -w / 2 + 12, -h / 2 + 16, w, h, 30); ctx.fill();
  ctx.fillStyle = C.white; M.rrect(ctx, -w / 2, -h / 2, w, h, 30); ctx.fill();
  const head = back && flip > 0.5 ? C.green : C.red;
  ctx.save(); M.rrect(ctx, -w / 2, -h / 2, w, 120, 30); ctx.clip(); ctx.fillStyle = head; ctx.fillRect(-w / 2, -h / 2, w, 120); ctx.restore();
  text(ctx, 'NOV 2026', 0, -h / 2 + 82, font(54, 800, D), C.white, 'center');
  const day = flip > 0.5 ? '23' : '12'; const sy = Math.abs(Math.cos(flip * Math.PI));
  ctx.save(); ctx.translate(0, 60); ctx.scale(1, Math.max(0.02, sy)); text(ctx, day, 0, 80, font(240, 800, D), C.ink, 'center'); ctx.restore();
  ctx.restore();
  const lab = back ? (flip > 0.5 ? 'BACK AS CEO' : '') : 'RESIGNED';
  if (lab) tag(ctx, lab, cx, 1080, 54, back ? pop(t, 12.95) * a : sp(t, T('resigned') - 0.05) * a, { bg: back ? C.green : C.red, fg: back ? C.ink : C.white });
  if (back && t > 13.0) tag(ctx, '+11 DAYS', cx + 250, 520, 46, pop(t, 13.1) * a, { bg: C.gold, rot: 0.08 });
}
// ---------------------------------------------------------------- end card
function endCard(ctx, t) {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H); grid(ctx);
  const p = E.inOutCubic(prog(t, EC - 0.05, EC + 0.3)); ctx.save(); ctx.translate(0, (1 - p) * 300); ctx.globalAlpha = p;
  big(ctx, 'WHYVERSE', cx, 560, 150, C.white, 1);
  text(ctx, 'big questions, visual answers', cx, 630, font(40, 600, UI), C.dim, 'center');
  const btn = (lab, x, y, t0, bg, fg) => { const k = pop(t, t0); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    ctx.fillStyle = bg; M.rrect(ctx, -200, -70, 400, 140, 70); ctx.fill(); text(ctx, lab, 0, 26, font(72, 800, D), fg, 'center'); ctx.restore(); };
  btn('LIKE', cx - 220, 820, T('Like'), C.white, C.ink);
  btn('FOLLOW', cx + 220, 820, T('follow'), C.green, C.ink);
  const k = sp(t, T('more.') + 0.2);
  if (k > 0) { ctx.save(); ctx.globalAlpha = p * Math.min(1, k); ctx.translate(cx, 1020 + (1 - k) * 40);
    ctx.fillStyle = 'rgba(43,227,138,0.12)'; M.rrect(ctx, -460, -80, 920, 190, 28); ctx.fill();
    ctx.save(); ctx.translate(-360, 8); ctx.fillStyle = C.white; ctx.fillRect(-40, -26, 80, 52); ctx.strokeStyle = C.bg; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(-40, -26); ctx.lineTo(0, 6); ctx.lineTo(40, -26); ctx.stroke(); ctx.restore();
    text(ctx, 'Send this to the friend who', 50, -6, font(44, 800, UI), C.white, 'center');
    text(ctx, 'sold their Nvidia shares', 50, 54, font(44, 800, UI), C.green, 'center');
    ctx.restore(); }
  ctx.restore();
}
// ---------------------------------------------------------------- fixed subtitle bar (lower third), phrase chunks, never moves
const CHUNKS = (() => {
  const out = [];
  for (const L of TIMING.lines) {
    const sents = []; let cur = [];
    L.words.forEach((w) => { cur.push(w); if (/[.!?]$/.test(w.w)) { sents.push(cur); cur = []; } }); if (cur.length) sents.push(cur);
    for (const S of sents) { const n = Math.ceil(S.length / 5), per = Math.ceil(S.length / n);
      for (let i = 0; i < S.length; i += per) out.push({ t0: S[i].t - 0.08, words: S.slice(i, i + per) }); }
  }
  out.forEach((c, i) => { const L = TIMING.lines.find((l) => l.words.includes(c.words[c.words.length - 1]));
    const next = out[i + 1]; c.t1 = next ? Math.min(next.t0, L.t1 + 0.7) : END; });
  return out;
})();
function subtitles(ctx, t) {
  const c = CHUNKS.find((x) => t >= x.t0 && t < x.t1); if (!c) return;
  ctx.font = font(64, 800, D); const gap = 18;
  const widths = c.words.map((w) => ctx.measureText(w.w).width);
  let lines = [[0, c.words.length]]; const total = widths.reduce((a, b) => a + b, 0) + gap * (c.words.length - 1);
  if (total > s.w - 90) { let acc = 0, cut = 1; for (let i = 0; i < widths.length; i++) { acc += widths[i] + gap; if (acc > total / 2) { cut = Math.max(1, i); break; } } lines = [[0, cut], [cut, c.words.length]]; }
  const lh = 80, h = lines.length * lh + 44;
  ctx.fillStyle = 'rgba(2,5,6,0.78)'; M.rrect(ctx, s.x + 10, BAR_Y - h / 2, s.w - 20, h, 26); ctx.fill();
  lines.forEach(([a, b], li) => {
    const lw = widths.slice(a, b).reduce((p, q) => p + q, 0) + gap * (b - a - 1); let x = cx - lw / 2;
    const y = BAR_Y - h / 2 + 22 + lh * li + 60;
    for (let i = a; i < b; i++) { const w = c.words[i]; ctx.fillStyle = w.key ? C.green : C.white; ctx.textAlign = 'left'; ctx.fillText(w.w, x, y); x += widths[i] + gap; }
  });
}
const WH = (t) => [B(t), 'wipe', 'whoosh', { len: 0.25, from: 700, to: 1700 }];
const HITS = [
  [B(0.03), 'hook', 'thud'], [B(0.1), 'counter', 'type', { len: 1.2, n: 8 }], WH(2.3), [B(2.55), 'line', 'whoosh', { len: 0.6, from: 300, to: 1400 }],
  WH(4.55), [B(4.8), 'medal', 'pop'], [B(T('ever') - 0.1), 'record tag', 'bell'],
  WH(6.85), [B(7.03), 'why', 'thud'], [B(7.6), 'name', 'click'],
  WH(9.05), [B(9.3), 'since', 'tick'], WH(10.55), [B(10.75), 'calendar', 'click'], [B(T('resigned') - 0.05), 'resigned', 'sub', { len: 0.4 }],
  WH(12.3), [B(12.55), 'flip', 'tick'], [B(12.95), 'back', 'pop'], [B(13.1), '+11', 'blip'],
  WH(14.75), [B(15.0), 'rise', 'whoosh', { len: 0.8, from: 300, to: 1800 }], [B(T('31%') - 0.05), '+31', 'thud'],
  WH(17.05), [B(17.25), '1 man', 'pop'], WH(17.85), [B(18.0), '1 day', 'pop'], WH(18.6), [B(18.85), 'digits', 'type', { len: 1.0, n: 8 }], [B(T('trillion') - 0.1), 'trillion', 'bell'],
  WH(20.75), [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop'], [B(T('more.') + 0.2), 'send', 'click'],
];
const images = {}; for (const k of Object.keys(PHOTOS)) images[k] = PHOTOS[k].src;
M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 600, UI)], samples: 6, images, hits: HITS,
  init(ctx, IMG) { IMGS = IMG; },
  draw(ctx, u, t) {
    if (t < EC) { photos(ctx, t); grid(ctx); decor(ctx, t); hud(ctx, t); }
    else endCard(ctx, t);
    subtitles(ctx, t);
  },
});
