// "How old are the two players?" — Whyverse 23:00 London GUESS fact Short, 24 Nov 2026. Pure function of time.
// World Chess Championship 2026, Geneva (Fondation Martin Bodmer, Cologny): D Gukesh (India, b. 29 May 2006) v Javokhir Sindarov
// (Uzbekistan, b. 8 Dec 2005) — both 20, "the youngest World Chess Championship match ever played" (World Chess 22 Nov; Wikipedia).
// Game 1 = 24 Nov; up to 14 classical games; prize fund $2.5 million (Wikipedia; World Chess; Chess.com 23 Nov).
// Look: Whyverse navy + a persistent chessboard world with a chess clock as the progress counter. Fixed subtitle bar (viewer feedback 24 Nov).
import * as M from './lib/motion.js';
const { W, H, E, prog, lerp, spring, SPRING, font, text, hash01, clamp, TAU } = M;

const TIMING = __TIMING__;
const PHOTOS = __PHOTOS__;
const C = {
  navy: '#0A1030', navy2: '#141D4A', navy3: '#1E2A63', line: '#9DB2FF', white: '#F6F3EA', gold: '#FFC447',
  coral: '#FF6F5E', dim: '#5E6CA8', ink: '#04061A', sq1: '#22306E', sq2: '#121A44',
};
const D = 'Display', UI = 'UI';
const s = M.FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const LID = (id) => TIMING.lines.find((l) => l.id === id);
const T = (w, n = 0) => { const m = TIMING.lines.flatMap((l) => l.words).filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const END = TIMING.dur;
const S = { A: 0, G: LID('l2').t0 - 0.1, C3: LID('c3').t0, C2: LID('c2').t0, C1: LID('c1').t0, R: LID('l3').t0 - 0.05, F: LID('l4').t0 - 0.1, E: LID('l5').t0 - 0.1 };
const B = (t) => t / 0.500034;
const BAR_Y = 1350; // subtitle bar centre (lower third, inside the safe zone, above platform UI)
const cnt = (t, t0, t1, v) => v * E.outCubic(prog(t, t0, t1));
// ---------------------------------------------------------------- helpers
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
const fade = (t, a, b, f = 0.22) => clamp(Math.min((t - a) / f + 1, (b - t) / f + 1));
// ---------------------------------------------------------------- persistent world: starry navy + perspective chessboard
function world(ctx, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, C.navy); g.addColorStop(0.65, C.navy2); g.addColorStop(1, C.navy3);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 80; i++) { const x = hash01(i, 1) * W, y = hash01(i, 2) * H * 0.5, r = 1 + 1.5 * hash01(i, 3) ** 3;
    ctx.globalAlpha = (0.2 + 0.4 * hash01(i, 5)) * (0.6 + 0.4 * Math.sin(t * (1 + hash01(i, 4)) + i)); ctx.fillStyle = C.white;
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }
  ctx.globalAlpha = 1;
  // board in perspective (8x8), slowly drifting so the frame is never still
  const top = 1000, bot = H + 60, hw0 = 300, hw1 = 900, drift = Math.sin(t * 0.25) * 18;
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    const y0 = lerp(top, bot, (r / 8) ** 1.35), y1 = lerp(top, bot, ((r + 1) / 8) ** 1.35);
    const w0 = lerp(hw0, hw1, (r / 8) ** 1.35), w1 = lerp(hw0, hw1, ((r + 1) / 8) ** 1.35);
    const xa = (k, w) => W / 2 + drift - w + (2 * w * k) / 8;
    ctx.fillStyle = (r + c) % 2 ? C.sq1 : C.sq2;
    ctx.beginPath(); ctx.moveTo(xa(c, w0), y0); ctx.lineTo(xa(c + 1, w0), y0); ctx.lineTo(xa(c + 1, w1), y1); ctx.lineTo(xa(c, w1), y1); ctx.closePath(); ctx.fill();
  }
  const fog = ctx.createLinearGradient(0, top - 20, 0, top + 160); fog.addColorStop(0, C.navy2); fog.addColorStop(1, 'rgba(20,29,74,0)');
  ctx.fillStyle = fog; ctx.fillRect(0, top - 20, W, 180);
}
// a chess king drawn from shapes (no glyph fallback)
function king(ctx, x, y, sc, col, k, rock = 0) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rock); ctx.scale(sc * k, sc * k);
  ctx.fillStyle = col; ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(-80, 0); ctx.lineTo(80, 0); ctx.lineTo(70, -30); ctx.lineTo(-70, -30); ctx.closePath(); ctx.fill(); ctx.stroke(); // base
  ctx.beginPath(); ctx.moveTo(-55, -30); ctx.quadraticCurveTo(-30, -120, -45, -170); ctx.lineTo(45, -170); ctx.quadraticCurveTo(30, -120, 55, -30); ctx.closePath(); ctx.fill(); ctx.stroke();
  M.rrect(ctx, -62, -192, 124, 26, 8); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -222, 48, 34, 0, 0, TAU); ctx.fill(); ctx.stroke();
  ctx.fillRect(-9, -300, 18, 64); ctx.strokeRect(-9, -300, 18, 64); ctx.fillRect(-28, -282, 56, 16); ctx.strokeRect(-28, -282, 56, 16);
  ctx.restore();
}
// ---------------------------------------------------------------- chess clock = progress counter (whole film)
function clockHud(ctx, t) {
  const k = sp(t, 0.15, SPRING.gentle); if (k <= 0) return;
  const x = s.x + s.w - 150, y = s.y + 40;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.fillStyle = 'rgba(4,6,22,0.9)'; M.rrect(ctx, -140, -40, 280, 92, 20); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.line; ctx.stroke();
  const tick = Math.floor(t * 2) % 2 === 0;
  ctx.fillStyle = tick ? C.gold : C.dim; ctx.beginPath(); ctx.arc(-108, 6, 9, 0, TAU); ctx.fill();
  text(ctx, 'GAME 1 / 14', 10, 22, font(38, 800, UI), C.white, 'center');
  ctx.restore();
}
// ---------------------------------------------------------------- A: hook
function sHook(ctx, t) {
  tag(ctx, 'WORLD CHESS CHAMPIONSHIP · GENEVA', cx, s.y + 130, 36, 1, { rot: -0.02 });
  big(ctx, '14', cx - 150, s.y + 420, 300, C.gold, Math.max(0.95, pop(t, -0.4)), { rot: -0.05 });
  big(ctx, 'GAMES', cx + 170, s.y + 350, 120, C.white, Math.max(0.95, pop(t, -0.3)), { rot: -0.03 });
  big(ctx, 'FROM TODAY', cx + 170, s.y + 440, 76, C.coral, pop(t, T('today.') - 0.15), { rot: -0.03 });
  const kq = pop(t, T('old') - 0.25);
  big(ctx, 'HOW OLD', cx, s.y + 590, 120, C.white, kq, { rot: 0.02 });
  big(ctx, 'ARE THEY?', cx, s.y + 710, 120, C.gold, pop(t, T('players?') - 0.2), { rot: 0.02 });
  // two kings face off on the board
  const k1 = pop(t, 0.25), k2 = pop(t, 0.45);
  king(ctx, cx - 280, 1240, 0.7, C.white, k1, Math.sin(t * 2) * 0.03);
  king(ctx, cx + 280, 1240, 0.7, '#2A2F45', k2, -Math.sin(t * 2 + 1) * 0.03);
  const kqm = pop(t, T('players?') - 0.05);
  tag(ctx, 'AGE ?', cx - 280, 1000, 40, kqm, { bg: C.white }); tag(ctx, 'AGE ?', cx + 280, 1000, 40, kqm, { bg: C.white });
}
// ---------------------------------------------------------------- B: your guess + visible 3-2-1 countdown
function sGuess(ctx, t) {
  const a = fade(t, S.G + 0.1, S.R); ctx.save(); ctx.globalAlpha = a;
  big(ctx, 'YOUR GUESS?', cx, s.y + 220, 120, C.gold, pop(t, S.G), { rot: -0.03 });
  // arrow down to the comments
  const ka = pop(t, S.G + 0.3), bob = Math.sin(t * 6) * 12;
  if (ka > 0) { ctx.save(); ctx.translate(cx, s.y + 310 + bob); ctx.scale(ka, ka); ctx.strokeStyle = C.white; ctx.lineWidth = 14; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(0, 40); ctx.moveTo(-30, 12); ctx.lineTo(0, 42); ctx.lineTo(30, 12); ctx.stroke(); ctx.restore();
    text(ctx, 'comment before it shows', cx, s.y + 410, font(40, 800, UI), C.line, 'center'); }
  // ring countdown
  const ry = 900, R = 190, p = prog(t, S.C3, S.R);
  ctx.lineWidth = 22; ctx.strokeStyle = 'rgba(255,255,255,0.12)'; ctx.beginPath(); ctx.arc(cx, ry, R, 0, TAU); ctx.stroke();
  if (t >= S.C3 - 0.05) { ctx.strokeStyle = C.coral; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(cx, ry, R, -Math.PI / 2, -Math.PI / 2 + TAU * (1 - p)); ctx.stroke(); }
  const n = t < S.C3 - 0.05 ? '' : t < S.C2 - 0.05 ? '3' : t < S.C1 - 0.05 ? '2' : '1';
  const tn = n === '3' ? S.C3 : n === '2' ? S.C2 : S.C1;
  if (n) big(ctx, n, cx, ry + 95, 280, C.white, pop(t, tn - 0.06));
  // the two kings still waiting
  king(ctx, cx - 320, 1230, 0.6, C.white, 1, Math.sin(t * 3) * 0.04);
  king(ctx, cx + 320, 1230, 0.6, '#2A2F45', 1, -Math.sin(t * 3 + 1) * 0.04);
  ctx.restore();
}
// ---------------------------------------------------------------- C: reveal — both 20
function card(ctx, x, y, k, img, name, country, credit, t, ts) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  const w = 390, h = 500;
  ctx.fillStyle = 'rgba(4,6,22,0.95)'; M.rrect(ctx, -w / 2, -h / 2, w, h, 30); ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.line; ctx.stroke();
  if (img) { ctx.save(); M.rrect(ctx, -w / 2 + 14, -h / 2 + 14, w - 28, 330, 20); ctx.clip();
    const z = 1.04 + 0.06 * prog(t, ts, ts + 6);
    M.cover(ctx, img, -w / 2 + 14, -h / 2 + 14, w - 28, 330, { zoom: z, fy: 0.3 }); ctx.restore();
    if (credit) text(ctx, credit, 0, -h / 2 + 368, font(20, 700, UI), 'rgba(246,243,234,0.85)', 'center'); }
  else king(ctx, 0, 70, 0.75, country === 'INDIA' ? C.white : '#2A2F45', 1);
  text(ctx, name, 0, h / 2 - 70, font(42, 800, D), C.white, 'center');
  text(ctx, country, 0, h / 2 - 28, font(30, 800, UI), C.gold, 'center');
  ctx.restore();
}
function sReveal(ctx, t) {
  const a = fade(t, S.R + 0.1, S.F); ctx.save(); ctx.globalAlpha = a;
  const k20 = pop(t, S.R);
  big(ctx, 'BOTH ARE', cx, s.y + 175, 80, C.white, k20);
  // 20 + 20 with a stamp
  big(ctx, '20', cx - 215, s.y + 390, 210, C.gold, pop(t, T('20!') - 0.05), { rot: -0.06 });
  big(ctx, '20', cx + 215, s.y + 390, 210, C.gold, pop(t, T('20!') + 0.12), { rot: 0.06 });
  card(ctx, cx - 215, 965, pop(t, T('Gukesh') - 0.12), PHOTOS.g && IMGS.g, 'GUKESH', 'INDIA', PHOTOS.g && PHOTOS.g.credit, t, T('Gukesh'));
  card(ctx, cx + 215, 965, pop(t, T('Javokhir') - 0.12), PHOTOS.s && IMGS.s, 'SINDAROV', 'UZBEKISTAN', PHOTOS.s && PHOTOS.s.credit, t, T('Javokhir'));
  const kv = pop(t, T('against') - 0.05);
  if (kv > 0) { ctx.save(); ctx.translate(cx, 965); ctx.scale(kv, kv); ctx.fillStyle = C.coral; ctx.beginPath(); ctx.arc(0, 0, 58, 0, TAU); ctx.fill();
    text(ctx, 'VS', 0, 17, font(48, 800, D), C.white, 'center'); ctx.restore(); }
  ctx.restore();
}
// ---------------------------------------------------------------- D: the fact — youngest ever + prize
function sFact(ctx, t) {
  const a = fade(t, S.F + 0.1, S.E - 0.05, 0.15); ctx.save(); ctx.globalAlpha = a;
  const ks = pop(t, T('youngest') - 0.1);
  if (ks > 0) { ctx.save(); ctx.translate(cx, s.y + 300); ctx.rotate(-0.06); ctx.scale(ks, ks);
    ctx.strokeStyle = C.coral; ctx.lineWidth = 12; M.rrect(ctx, -400, -130, 800, 260, 26); ctx.stroke();
    big(ctx, 'YOUNGEST', 0, -10, 130, C.coral, 1); big(ctx, 'TITLE MATCH EVER', 0, 90, 74, C.white, 1); ctx.restore(); }
  // age bar: 20 + 20 = 40 combined, a tiny marker; keep it simple: prize counter
  const kp = pop(t, T('prize:') - 0.1);
  big(ctx, 'PRIZE FUND', cx, s.y + 590, 64, C.white, kp);
  const tm = T('$2.5 million'), v = cnt(t, tm - 0.2, tm + 0.9, 2.5);
  if (t > tm - 0.25) big(ctx, `$${v.toFixed(1)} MILLION`, cx, s.y + 740, 120, C.gold, pop(t, tm - 0.25));
  king(ctx, cx - 340, 1230, 0.5, C.white, 1, Math.sin(t * 2) * 0.04);
  king(ctx, cx + 340, 1230, 0.5, '#2A2F45', 1, -Math.sin(t * 2 + 1) * 0.04);
  tag(ctx, 'UP TO 14 GAMES · FIRST TO 7.5', cx, s.y + 820, 36, pop(t, S.F + 0.3), { bg: C.navy3, fg: C.white, rot: 0.01 });
  ctx.restore();
}
// ---------------------------------------------------------------- end card
function sEnd(ctx, t) {
  const t0 = S.E, a = clamp((t - t0 - 0.05) / 0.2);
  ctx.save(); ctx.globalAlpha = a;
  big(ctx, '20 v 20 · GAME 1 TODAY', cx, s.y + 250, 70, C.gold, pop(t, t0 - 0.05));
  big(ctx, 'WHYVERSE', cx, s.y + 450, 128, C.white, 1);
  const kL = pop(t, T('Like') - 0.05), kF = pop(t, T('follow') - 0.05);
  if (kL > 0) { ctx.save(); ctx.translate(cx - 205, s.y + 640); ctx.scale(kL, kL);
    ctx.fillStyle = C.white; M.rrect(ctx, -180, -66, 360, 132, 30); ctx.fill();
    const hb = 1 + 0.14 * Math.max(0, Math.sin((t - T('Like')) * 9)) * Math.exp(-(t - T('Like')) * 2);
    ctx.save(); ctx.translate(-95, 4); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 28); ctx.bezierCurveTo(-56, -10, -38, -56, 0, -30); ctx.bezierCurveTo(38, -56, 56, -10, 0, 28);
    ctx.fillStyle = C.coral; ctx.fill(); ctx.restore();
    text(ctx, 'LIKE', 45, 22, font(60, 800, D), C.navy, 'center'); ctx.restore(); }
  if (kF > 0) { ctx.save(); ctx.translate(cx + 205, s.y + 640); ctx.scale(kF, kF);
    ctx.fillStyle = C.gold; M.rrect(ctx, -180, -66, 360, 132, 30); ctx.fill();
    ctx.save(); ctx.translate(-110, 4); ctx.lineWidth = 12; ctx.strokeStyle = C.navy; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-24, 0); ctx.lineTo(24, 0); ctx.moveTo(0, -24); ctx.lineTo(0, 24); ctx.stroke(); ctx.restore();
    text(ctx, 'FOLLOW', 40, 22, font(54, 800, D), C.navy, 'center'); ctx.restore(); }
  const kS = pop(t, T('more.') + 0.1);
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 830); ctx.scale(kS, kS);
    ctx.fillStyle = 'rgba(6,9,30,0.9)'; M.rrect(ctx, -420, -64, 840, 128, 24); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.line; ctx.stroke();
    ctx.save(); ctx.translate(-350, 0); ctx.fillStyle = C.white; ctx.fillRect(-34, -22, 68, 44); ctx.strokeStyle = C.navy; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-34, -22); ctx.lineTo(0, 6); ctx.lineTo(34, -22); ctx.stroke(); ctx.restore();
    text(ctx, 'Send this to the friend who', 40, -10, font(36, 800, UI), C.white, 'center');
    text(ctx, 'thinks they could beat you', 40, 38, font(36, 800, UI), C.gold, 'center');
    ctx.restore(); }
  ctx.restore();
}
// ---------------------------------------------------------------- fixed subtitle bar (lower third), phrase chunks, never moves
const CHUNKS = (() => {
  const out = [];
  for (const L of TIMING.lines) {
    if (L.id[0] === 'c') continue; // the countdown numbers carry 3-2-1 on screen
    const ws = L.words; let cur = [];
    const flush = () => { if (cur.length) { out.push({ t0: cur[0].t - 0.08, words: cur }); cur = []; } };
    ws.forEach((w, i) => { cur.push(w); const n = cur.length, endP = /[.,!?:]$/.test(w.w);
      if (n >= 6 || (n >= 4 && endP) || (endP && /[.!?]$/.test(w.w))) flush(); });
    flush();
  }
  out.forEach((c, i) => { const L = TIMING.lines.find((l) => l.words.includes(c.words[c.words.length - 1]));
    const next = out[i + 1]; c.t1 = next ? Math.min(next.t0, L.t1 + 0.6) : END; });
  return out;
})();
function subtitles(ctx, t) {
  const c = CHUNKS.find((x) => t >= x.t0 && t < x.t1); if (!c) return;
  ctx.font = font(62, 800, D); const gap = 18;
  const widths = c.words.map((w) => ctx.measureText(w.w).width);
  // up to 2 lines
  let lines = [[0, c.words.length]]; const total = widths.reduce((a, b) => a + b, 0) + gap * (c.words.length - 1);
  if (total > s.w - 80) { let acc = 0, cut = 1; for (let i = 0; i < widths.length; i++) { acc += widths[i] + gap; if (acc > total / 2) { cut = Math.max(1, i); break; } } lines = [[0, cut], [cut, c.words.length]]; }
  const lh = 78, h = lines.length * lh + 44;
  ctx.fillStyle = 'rgba(4,6,22,0.72)'; M.rrect(ctx, s.x + 10, BAR_Y - h / 2, s.w - 20, h, 26); ctx.fill();
  lines.forEach(([a, b], li) => {
    const lw = widths.slice(a, b).reduce((p, q) => p + q, 0) + gap * (b - a - 1); let x = cx - lw / 2;
    const y = BAR_Y - h / 2 + 22 + lh * li + 58;
    for (let i = a; i < b; i++) { const w = c.words[i]; ctx.fillStyle = w.key ? C.gold : C.white; ctx.textAlign = 'left'; ctx.fillText(w.w, x, y); x += widths[i] + gap; }
  });
}
const HITS = [
  [B(0.02), '14', 'thud'], [B(T('today.') - 0.15), 'today', 'pop', { pitch: 'D4' }], [B(T('old') - 0.25), 'old', 'click'],
  [B(S.G), 'guess', 'whoosh', { len: 0.35, from: 600, to: 1600 }],
  [B(S.C3 - 0.06), 't3', 'click'], [B(S.C2 - 0.06), 't2', 'click'], [B(S.C1 - 0.06), 't1', 'click'],
  [B(T('20!') - 0.05), 'twenty', 'thud'], [B(T('Gukesh') - 0.12), 'g', 'pop', { pitch: 'D5' }], [B(T('Javokhir') - 0.12), 's', 'pop', { pitch: 'F#5' }],
  [B(S.F), 'fact', 'whoosh', { len: 0.35, from: 1800, to: 600 }], [B(T('youngest') - 0.1), 'young', 'thud'], [B(T('$2.5 million') + 0.7), 'prize', 'blip', { pitch: 'A5' }],
  [B(S.E), 'end', 'whoosh', { len: 0.35, from: 600, to: 1600 }], [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop', { pitch: 'A5' }], [B(T('more.') + 0.1), 'send', 'click'],
];
let IMGS = {};
const images = {}; if (PHOTOS.g) images.g = PHOTOS.g.src; if (PHOTOS.s) images.s = PHOTOS.s.src;
M.film({
  fonts: [font(40, 800, D), font(40, 800, UI)], samples: 6, images,
  hits: HITS,
  init(ctx, IMG) { IMGS = IMG; },
  draw(ctx, u, t) {
    world(ctx, t);
    const sh = (t0) => E.inOutCubic(prog(t, t0 - 0.2, t0 + 0.2));
    ctx.save(); ctx.translate(0, Math.sin(t * 0.3) * 4);
    if (t < S.G + 0.25) { ctx.save(); ctx.globalAlpha = 1 - sh(S.G); ctx.translate(-sh(S.G) * 300, 0); sHook(ctx, t); ctx.restore(); }
    if (t >= S.G - 0.2 && t < S.R + 0.25) sGuess(ctx, t);
    if (t >= S.R - 0.2 && t < S.F + 0.25) sReveal(ctx, t);
    if (t >= S.F - 0.2 && t < S.E + 0.25) sFact(ctx, t);
    if (t >= S.E - 0.05) sEnd(ctx, t);
    ctx.restore();
    if (t < S.E - 0.1) clockHud(ctx, t);
    subtitles(ctx, t);
  },
});
