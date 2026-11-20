// "$81 billion. In one day." — Whyverse 19:00 Baku trend Short, Fri 20 Nov 2026 (GUESS THE ANSWER day).
// Anthropic's IPO (Nasdaq: ANT, first trade 19 Nov 2026): 980M shares x $83 = $81.3B, the largest IPO on record (beat SpaceX, June 2026),
// closed day one at $97.17 (+17%). Look: VINTAGE COMIC game show — cream halftone paper, thick ink outlines, starbursts, panels.
// Persistent SCOREBOARD at the bottom (RAISED counter + RANK). Kokoro af_heart on audio/vo.wav; every word/object timed to its spoken word.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = {"dur": 27.052, "lines": [{"id": "l1", "t0": 0.1, "t1": 2.367, "words": [{"w": "$81 billion.", "t": 0.13, "key": true}, {"w": "In", "t": 1.7, "key": false}, {"w": "one", "t": 1.857, "key": false}, {"w": "day.", "t": 2.054, "key": true}]}, {"id": "l2", "t0": 2.75, "t1": 4.562, "words": [{"w": "Which", "t": 2.78, "key": false}, {"w": "company", "t": 3.022, "key": false}, {"w": "raised", "t": 3.334, "key": false}, {"w": "it?", "t": 3.611, "key": false}, {"w": "Your", "t": 3.97, "key": false}, {"w": "guess?", "t": 4.196, "key": true}]}, {"id": "l3a", "t0": 4.75, "t1": 5.318, "words": [{"w": "Three.", "t": 4.79, "key": true}]}, {"id": "l3b", "t0": 5.75, "t1": 6.26, "words": [{"w": "Two.", "t": 5.78, "key": true}]}, {"id": "l3c", "t0": 6.75, "t1": 7.246, "words": [{"w": "One.", "t": 6.78, "key": true}]}, {"id": "l4", "t0": 7.75, "t1": 10.139, "words": [{"w": "Anthropic,", "t": 7.78, "key": true}, {"w": "the", "t": 8.51, "key": false}, {"w": "AI", "t": 8.734, "key": false}, {"w": "company", "t": 8.912, "key": false}, {"w": "behind", "t": 9.315, "key": false}, {"w": "Claude.", "t": 9.672, "key": false}]}, {"id": "l5", "t0": 10.5, "t1": 13.835, "words": [{"w": "980 million", "t": 10.53, "key": true}, {"w": "shares,", "t": 11.834, "key": false}, {"w": "at", "t": 12.44, "key": false}, {"w": "$83", "t": 12.604, "key": true}, {"w": "each.", "t": 13.504, "key": false}]}, {"id": "l6", "t0": 14.0, "t1": 17.827, "words": [{"w": "That", "t": 14.04, "key": false}, {"w": "beats", "t": 14.326, "key": false}, {"w": "SpaceX's", "t": 14.659, "key": true}, {"w": "record", "t": 15.088, "key": false}, {"w": "from", "t": 15.469, "key": false}, {"w": "June:", "t": 15.754, "key": false}, {"w": "the", "t": 16.4, "key": false}, {"w": "biggest", "t": 16.656, "key": false}, {"w": "IPO", "t": 17.117, "key": false}, {"w": "ever.", "t": 17.373, "key": true}]}, {"id": "l7", "t0": 18.0, "t1": 21.639, "words": [{"w": "Nearly", "t": 18.03, "key": false}, {"w": "three", "t": 18.617, "key": true}, {"w": "times", "t": 19.13, "key": false}, {"w": "Saudi", "t": 19.643, "key": false}, {"w": "Aramco's", "t": 20.157, "key": false}, {"w": "in", "t": 20.817, "key": false}, {"w": "2019.", "t": 21.11, "key": true}]}, {"id": "l8", "t0": 22.0, "t1": 24.951, "words": [{"w": "And", "t": 22.03, "key": false}, {"w": "on", "t": 22.222, "key": false}, {"w": "day", "t": 22.376, "key": false}, {"w": "one,", "t": 22.568, "key": false}, {"w": "the", "t": 23.03, "key": false}, {"w": "stock", "t": 23.236, "key": false}, {"w": "closed", "t": 23.524, "key": false}, {"w": "up", "t": 23.853, "key": false}, {"w": "+17%.", "t": 24.017, "key": true}]}, {"id": "l9", "t0": 25.25, "t1": 27.052, "words": [{"w": "Like", "t": 25.28, "key": true}, {"w": "and", "t": 25.528, "key": false}, {"w": "follow", "t": 25.734, "key": true}, {"w": "Whyverse", "t": 26.064, "key": true}, {"w": "for", "t": 26.476, "key": false}, {"w": "more.", "t": 26.682, "key": false}]}]};
const C = {
  paper: '#F3E6C8', paper2: '#EAD9B2', ink: '#16120E', red: '#E2412F', yel: '#FFCF33', blue: '#2C5DA8', sky: '#8EC5E8',
  white: '#FFFBF0', sepia: '#C9A97A', sepia2: '#B8935F', green: '#2E9E57', grey: '#8C8270',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const LID = (id) => TIMING.lines.find((l) => l.id === id).t0;
const END = TIMING.dur + 1.6;

// scene clock
const S = { A: 0, B: LID('l2') - 0.12, C: LID('l4') - 0.12, D: LID('l5') - 0.12, E: LID('l6') - 0.12, F: LID('l7') - 0.12, G: LID('l8') - 0.12, H: LID('l9') - 0.12 };
const B = (t) => t / 0.5;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.3, from, to }];
const HITS = [
  [B(0.03), 'burst', 'coins'], [B(T('day.')), 'IN ONE DAY', 'click'],
  WH(S.B, 600, 2000), [B(T('company')), 'mystery box', 'click'], [B(T('guess?')), 'guess arrow', 'tick'],
  [B(T('Three.')), '3', 'tick'], [B(T('Two.')), '2', 'tick'], [B(T('One.')), '1', 'tick'],
  [B(T('Anthropic,')), 'reveal', 'bell'], [B(T('AI')), 'chip', 'click'], [B(T('Claude.')), 'ticker', 'click'],
  WH(S.D, 2000, 600), [B(T('980 million')), 'cards', 'type', { len: 0.9, n: 12 }], [B(T('$83')), 'price tag', 'pop'], [B(T('each.') + 0.1), 'equation', 'click'],
  WH(S.E, 600, 2000), [B(T("SpaceX's")), 'SpaceX bar', 'whoosh', { len: 0.3, from: 500, to: 1600 }], [B(T('biggest')), 'overtake', 'whoosh', { len: 0.3, from: 500, to: 1900 }], [B(T('ever.')), 'crown stamp', 'pop'],
  [B(S.F), 'flashback', 'whoosh', { len: 0.45, from: 400, to: 1500 }], [B(T('three')), 'stack 1', 'tick'], [B(T('three') + 0.25), 'stack 2', 'tick'], [B(T('three') + 0.5), 'stack 3', 'tick'], [B(T('2019.')), '2019', 'click'],
  WH(S.G, 2000, 600), [B(T('day')), 'chart', 'type', { len: 0.8, n: 10 }], [B(T('+17%.')), '+17%', 'pop'],
  WH(S.H, 600, 2000), [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop'], [B(T('more.') + 0.35), 'send line', 'tick'],
];

// ---------------------------------------------------------------- helpers
function outline(ctx, w = 7, col = C.ink) { ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineJoin = 'round'; ctx.stroke(); }
function big(ctx, str, x, y, size, col, k, { stroke = C.ink, rot = 0, fam = D, wt = 800, sw = 0.1, shadow = true } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, fam); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
  if (shadow) { ctx.fillStyle = C.ink; ctx.fillText(str, size * 0.06, size * 0.07); }
  if (stroke) { ctx.lineWidth = size * sw; ctx.strokeStyle = stroke; ctx.strokeText(str, 0, 0); }
  ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function chip(ctx, label, x, y, size, k, { bg = C.yel, fg = C.ink, rot = -0.04, edge = C.ink, fam = UI, wt = 800 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, fam); const w = ctx.measureText(label).width + size * 1.0, h = size * 1.55;
  rrect(ctx, -w / 2 + 8, -h / 2 + 9, w, h, 10); ctx.fillStyle = C.ink; ctx.fill();
  rrect(ctx, -w / 2, -h / 2, w, h, 10); ctx.fillStyle = bg; ctx.fill(); outline(ctx, 6, edge);
  text(ctx, label, 0, size * 0.36, font(size, wt, fam), fg, 'center'); ctx.restore();
}
function burst(ctx, x, y, r, col, k, rot = 0, n = 14, inner = 0.72) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.beginPath();
  for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * TAU, rr = i % 2 ? r * inner : r * (0.95 + 0.08 * hash01(i, 4)); ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
  ctx.closePath(); ctx.fillStyle = col; ctx.fill(); outline(ctx, 8); ctx.restore();
}
function panel(ctx, x, y, w, h, col, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.fillStyle = C.ink; ctx.fillRect(-w / 2 + 12, -h / 2 + 12, w, h);
  ctx.fillStyle = col; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.lineWidth = 8; ctx.strokeStyle = C.ink; ctx.strokeRect(-w / 2, -h / 2, w, h); ctx.restore();
}
// halftone paper + slowly rotating speed lines
function paperBg(ctx, t, sepia = false) {
  fill(ctx, sepia ? C.sepia : C.paper);
  ctx.save(); ctx.translate(W / 2, H * 0.45); ctx.rotate(t * 0.06);
  ctx.fillStyle = sepia ? C.sepia2 : C.paper2;
  for (let i = 0; i < 24; i++) { const a = (i / 24) * TAU; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, H, a, a + TAU / 48); ctx.closePath(); ctx.fill(); }
  ctx.restore();
  ctx.fillStyle = sepia ? 'rgba(90,60,20,0.16)' : 'rgba(226,65,47,0.10)';
  const g = 34, off = (t * 12) % g;
  for (let y = -g; y < H + g; y += g) for (let x = -g; x < W + g; x += g) {
    const xx = x + ((y / g) % 2 ? g / 2 : 0) + off, yy = y + off * 0.5;
    const r = 3 + 6 * clamp(1 - Math.hypot(xx - W * 0.85, yy - H * 0.12) / 1100); ctx.beginPath(); ctx.arc(xx, yy, r, 0, TAU); ctx.fill(); }
}
function whip(ctx, t, t0, a, b, dur = 0.3) {
  const p = E.inOutCubic(prog(t, t0 - dur * 0.55, t0 + dur * 0.45));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(-p * W, 0); a(); ctx.restore(); ctx.save(); ctx.translate((1 - p) * W, 0); b(); ctx.restore();
  ctx.fillStyle = C.ink; ctx.fillRect((1 - p) * W - 10, 0, 20, H);
}
function flashTo(ctx, t, t0, a, b, dur = 0.42) {
  const p = E.inOutCubic(prog(t, t0 - dur * 0.5, t0 + dur * 0.5));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(0, p * H); a(); ctx.restore();
  ctx.save(); ctx.translate(0, (p - 1) * H); b(); ctx.restore();
  ctx.fillStyle = C.ink; ctx.fillRect(0, p * H - 10, W, 20);
}
function bill(ctx, x, y, w, rot, k = 1) {
  if (k <= 0) return; const h = w * 0.46;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.fillStyle = '#8FCB8A'; ctx.fill(); outline(ctx, 5);
  ctx.beginPath(); ctx.ellipse(0, 0, h * 0.3, h * 0.32, 0, 0, TAU); ctx.fillStyle = '#5FA866'; ctx.fill(); outline(ctx, 3);
  text(ctx, '$', 0, h * 0.14, font(h * 0.42, 800, D), C.ink, 'center'); ctx.restore();
}
const fmtB = (v) => (v >= 10 ? `$${v.toFixed(1)}B` : `$${v.toFixed(1)}B`);

// ---------------------------------------------------------------- persistent SCOREBOARD (bottom)
function scoreboard(ctx, t) {
  const k = clamp(prog(t, 0.1, 0.45)); if (k <= 0) return;
  const inFlash = t >= S.F + 0.1 && t < S.G;
  const y = s.y + s.h - 30, x0 = s.x + 6, w = s.w - 12;
  // RAISED value: counts up in the hook, holds at 81.3
  const raised = lerp(0, 81.3, E.outCubic(prog(t, 0.05, T('day.') + 0.2)));
  let rank = '?', rankBg = C.white;
  if (t >= T('Anthropic,')) { rank = 'ANT'; rankBg = C.yel; }
  if (t >= T('ever.')) { rank = '#1 EVER'; rankBg = C.red; }
  let left = 'RAISED', val = fmtB(raised);
  if (inFlash) { left = 'ARAMCO 2019'; val = '$29.4B'; }
  if (t >= S.G + 0.1) { left = 'DAY ONE'; val = t >= T('+17%.') ? '+17%' : `+${Math.round(17 * E.outCubic(prog(t, T('day'), T('+17%.'))))}%`; }
  ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 80);
  ctx.fillStyle = C.ink; ctx.fillRect(x0 + 10, y - 50, w, 110);
  ctx.fillStyle = inFlash ? C.sepia2 : C.blue; ctx.fillRect(x0, y - 60, w * 0.66, 110); ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.strokeRect(x0, y - 60, w * 0.66, 110);
  ctx.fillStyle = rankBg; ctx.fillRect(x0 + w * 0.66, y - 60, w * 0.34, 110); ctx.strokeRect(x0 + w * 0.66, y - 60, w * 0.34, 110);
  text(ctx, left, x0 + 26, y - 18, font(30, 800, UI), C.white, 'left', 2);
  const changes = [T('Anthropic,'), T('ever.'), S.F + 0.1, S.G, T('day.'), T('+17%.')];
  const last = changes.filter((c) => t >= c).pop() ?? -9; const bmp = 1 + 0.22 * Math.exp(-(t - last) * 7) * (t - last < 1);
  ctx.save(); ctx.translate(x0 + 26, y + 34); ctx.scale(bmp, bmp); text(ctx, val, 0, 0, font(62, 800, D), C.yel, 'left'); ctx.restore();
  text(ctx, 'RANK', x0 + w * 0.83, y - 18, font(30, 800, UI), rankBg === C.red ? C.white : C.ink, 'center', 2);
  ctx.save(); ctx.translate(x0 + w * 0.83, y + 32); ctx.scale(bmp, bmp); text(ctx, rank, 0, 0, font(rank.length > 4 ? 46 : 58, 800, D), rankBg === C.red ? C.white : C.ink, 'center'); ctx.restore();
  ctx.restore();
}

// ---------------------------------------------------------------- captions (word by word, top)
function captions(ctx, t) {
  const L = TIMING.lines; const li = L.findIndex((l, i) => t >= l.t0 - 0.05 && t < (L[i + 1] ? L[i + 1].t0 - 0.05 : END)); if (li < 0) return;
  if (['l3a', 'l3b', 'l3c'].includes(L[li].id)) return; // the countdown speaks for itself
  const all = L[li].words, ws = all.filter((w) => t >= w.t - 0.03); if (!ws.length) return;
  const start = Math.floor((ws.length - 1) / 3) * 3, chunk = all.slice(start, start + 3), shown = ws.slice(start);
  let size = 84; const gap = 24;
  const meas = (sz) => { ctx.font = font(sz, 800, D); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 20) { size = Math.floor(size * (s.w - 20) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 70;
  shown.forEach((w, i) => { const k = sp(t, w.t - 0.03, SPRING.bouncy), sc = Math.min(1.1, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.fillStyle = C.ink; ctx.fillText(w.w, size * 0.05, size * 0.06);
    ctx.lineWidth = size * 0.2; ctx.strokeStyle = C.ink; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.yel : C.white; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}

// ---------------------------------------------------------------- A: hook — $81 BILLION in a starburst, bills raining
function sHook(ctx, t) {
  paperBg(ctx, t);
  for (let i = 0; i < 16; i++) { const t0 = 0.05 + i * 0.12, q = t - t0; if (q < 0) continue;
    const x = s.x + hash01(i, 2) * s.w, y = s.y + 120 + q * (520 + 200 * hash01(i, 3)) % 1300;
    bill(ctx, x, y, 150, Math.sin(q * 3 + i) * 0.6, Math.min(1, q * 6)); }
  burst(ctx, cx, s.y + 560, 430, C.yel, t < 0.02 ? 1 : Math.min(1.06, lerp(1.25, 1, E.outBack(prog(t, 0, 0.35)))), t * 0.15, 16);
  const kN = t < 0.02 ? 1 : Math.min(1.06, lerp(1.35, 1, E.outBack(prog(t, 0, 0.3))));
  big(ctx, '$81', cx, s.y + 560, 250, C.red, kN, { rot: -0.05, sw: 0.08 });
  big(ctx, 'BILLION', cx, s.y + 700, 120, C.white, kN, { rot: -0.05, sw: 0.12 });
  const kd = pop(t, T('In') - 0.05);
  if (kd > 0) { panel(ctx, cx, s.y + 965, 640 * kd, 150 * kd, C.blue, 0.03); big(ctx, 'IN ONE DAY', cx, s.y + 1000, 92, C.yel, kd, { rot: 0.03, sw: 0.1 }); }
}

// ---------------------------------------------------------------- B: the guess — mystery box + 3-2-1
function sGuess(ctx, t) {
  paperBg(ctx, t);
  const kq = pop(t, S.B + 0.05);
  if (kq > 0) { ctx.save(); ctx.translate(cx, s.y + 300); ctx.scale(kq, kq); panel(ctx, 0, 0, 800, 170, C.white, -0.02);
    text(ctx, 'WHICH COMPANY', 0, -10, font(74, 800, D), C.ink, 'center'); text(ctx, 'RAISED IT?', 0, 62, font(60, 800, D), C.red, 'center'); ctx.restore(); }
  // mystery box with a "?" — wobbles with every tick
  const kb = pop(t, T('company') - 0.05);
  const ticks = [T('Three.'), T('Two.'), T('One.')]; const lt = ticks.filter((c) => t >= c).pop();
  const wob = lt ? M.ring(t - lt, 3, 5) * 0.08 : Math.sin(t * 4) * 0.03;
  if (kb > 0) { ctx.save(); ctx.translate(cx - 150, s.y + 720); ctx.rotate(wob); ctx.scale(kb, kb);
    ctx.fillStyle = C.ink; ctx.fillRect(-190 + 14, -170 + 14, 380, 340);
    ctx.fillStyle = C.red; ctx.fillRect(-190, -170, 380, 340); ctx.lineWidth = 8; ctx.strokeStyle = C.ink; ctx.strokeRect(-190, -170, 380, 340);
    ctx.fillStyle = C.yel; ctx.fillRect(-30, -170, 60, 340); ctx.strokeRect(-30, -170, 60, 340);
    ctx.fillStyle = C.yel; ctx.fillRect(-210, -200, 420, 70); ctx.strokeRect(-210, -200, 420, 70);
    big(ctx, '?', 0, 90, 230, C.white, 1, { sw: 0.1 }); ctx.restore(); }
  // countdown dial on the right
  const kc = pop(t, T('guess?') - 0.1);
  if (kc > 0) { const n = t >= T('One.') ? '1' : t >= T('Two.') ? '2' : t >= T('Three.') ? '3' : '';
    const frac = t >= T('Three.') ? clamp(prog(t, T('Three.'), T('One.') + 0.95)) : 0;
    ctx.save(); ctx.translate(cx + 250, s.y + 720); ctx.scale(kc, kc);
    ctx.beginPath(); ctx.arc(10, 10, 150, 0, TAU); ctx.fillStyle = C.ink; ctx.fill();
    ctx.beginPath(); ctx.arc(0, 0, 150, 0, TAU); ctx.fillStyle = C.white; ctx.fill(); outline(ctx, 8);
    if (frac > 0) { ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 150, -Math.PI / 2, -Math.PI / 2 + frac * TAU); ctx.closePath(); ctx.fillStyle = C.yel; ctx.fill(); ctx.beginPath(); ctx.arc(0, 0, 150, 0, TAU); outline(ctx, 8); }
    if (n) { const kk = Math.min(1.1, lerp(1.6, 1, E.outBack(prog(t, lt, lt + 0.25)))); big(ctx, n, 0, 70, 200, C.red, kk, { sw: 0.08 }); }
    else { text(ctx, 'YOUR', 0, -10, font(58, 800, D), C.ink, 'center'); text(ctx, 'GUESS?', 0, 55, font(58, 800, D), C.red, 'center'); }
    ctx.restore(); }
  // "comment below" arrow
  const ka = pop(t, T('guess?') + 0.1);
  if (ka > 0) { const bob = Math.sin(t * 8) * 12; ctx.save(); ctx.translate(cx, s.y + 1040 + bob); ctx.scale(ka, ka);
    chip(ctx, 'COMMENT YOUR GUESS', 0, 0, 46, 1, { bg: C.yel, rot: -0.02 });
    ctx.translate(0, 95); ctx.beginPath(); ctx.moveTo(-36, -20); ctx.lineTo(36, -20); ctx.lineTo(0, 30); ctx.closePath(); ctx.fillStyle = C.red; ctx.fill(); outline(ctx, 6); ctx.restore(); }
}

// ---------------------------------------------------------------- C: reveal — ANTHROPIC bursts out of the box
function sReveal(ctx, t) {
  paperBg(ctx, t);
  const t0 = T('Anthropic,');
  // box flaps flying away
  const q = t - t0;
  if (q < 0.9) for (let i = 0; i < 4; i++) { const a = -Math.PI / 2 + (i - 1.5) * 0.8;
    ctx.save(); ctx.translate(cx + Math.cos(a) * q * 1400, s.y + 640 + Math.sin(a) * q * 1100 + q * q * 900); ctx.rotate(q * (i % 2 ? 6 : -6));
    ctx.fillStyle = C.red; ctx.fillRect(-90, -60, 180, 120); ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.strokeRect(-90, -60, 180, 120); ctx.restore(); }
  burst(ctx, cx, s.y + 620, 470, C.yel, pop(t, t0 - 0.02), -t * 0.2, 18);
  const kA = t >= t0 ? Math.min(1.06, lerp(1.7, 1, E.outBack(prog(t, t0, t0 + 0.3)))) : 0;
  big(ctx, 'ANTHROPIC', cx, s.y + 660, 138, C.white, kA, { rot: -0.04, sw: 0.12 });
  chip(ctx, 'the AI company behind Claude', cx, s.y + 860, 44, pop(t, T('AI') - 0.08), { bg: C.white, rot: 0.03 });
  // ticker tag
  const kt = pop(t, T('Claude.') - 0.1);
  if (kt > 0) { ctx.save(); ctx.translate(cx, s.y + 1040); ctx.scale(kt, kt); ctx.rotate(-0.03);
    panel(ctx, 0, 0, 560, 130, C.ink, 0);
    text(ctx, 'NASDAQ:', -70, 22, font(54, 800, UI), C.white, 'center'); text(ctx, 'ANT', 150, 26, font(78, 800, D), C.yel, 'center'); ctx.restore(); }
}

// ---------------------------------------------------------------- D: 980 million shares x $83
function cert(ctx, x, y, w, k, col) {
  if (k <= 0) return; const h = w * 0.66;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.fillStyle = col; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.lineWidth = 3.5; ctx.strokeStyle = C.ink; ctx.strokeRect(-w / 2, -h / 2, w, h);
  ctx.strokeRect(-w / 2 + 6, -h / 2 + 6, w - 12, h - 12);
  ctx.fillStyle = C.ink; ctx.fillRect(-w * 0.3, -2, w * 0.6, 4); ctx.restore();
}
function sShares(ctx, t) {
  paperBg(ctx, t);
  const t0 = T('980 million'), cols = 10, rows = 10, cw = 74, gx = 82, gy = 58, ox = cx - (cols - 1) * gx / 2, oy = s.y + 290;
  const n = Math.round(98 * E.outCubic(prog(t, t0 - 0.05, T('shares,') + 0.4)));
  for (let i = 0; i < 98; i++) { if (i >= n) break; const r = Math.floor(i / cols), c = i % cols;
    const k = Math.min(1, sp(t, t0 - 0.05 + i * ((T('shares,') + 0.4 - t0) / 98), SPRING.snappy));
    cert(ctx, ox + c * gx, oy + r * gy, cw, k, i % 7 === 3 ? C.yel : C.white); }
  chip(ctx, '1 card = 10 million shares', cx, s.y + 225, 36, pop(t, t0 + 0.6), { bg: C.white, rot: 0.02 });
  const cnt = Math.round(980 * E.outCubic(prog(t, t0 - 0.05, T('shares,') + 0.4)));
  const kc = pop(t, t0 - 0.05);
  if (kc > 0) { ctx.save(); ctx.translate(cx - 150, s.y + 965); ctx.scale(kc, kc); panel(ctx, 0, 0, 420, 150, C.blue, -0.03);
    text(ctx, `${cnt}M`, 0, 20, font(96, 800, D), C.yel, 'center'); text(ctx, 'SHARES', 0, 64, font(30, 800, UI), C.white, 'center', 3); ctx.restore(); }
  // price tag slams
  const tp = T('$83'); const kp = t >= tp ? Math.min(1.08, lerp(1.8, 1, E.outBack(prog(t, tp, tp + 0.28)))) : 0;
  if (kp > 0) { ctx.save(); ctx.translate(cx + 240, s.y + 975); ctx.rotate(0.08); ctx.scale(kp, kp); if (t > tp) shake(ctx, B(t), B(tp + 0.12), 5, 6, 0.15);
    ctx.beginPath(); ctx.moveTo(-150, -70); ctx.lineTo(110, -70); ctx.lineTo(170, 0); ctx.lineTo(110, 70); ctx.lineTo(-150, 70); ctx.closePath();
    ctx.fillStyle = C.red; ctx.fill(); outline(ctx, 8); ctx.beginPath(); ctx.arc(110, 0, 14, 0, TAU); ctx.fillStyle = C.paper; ctx.fill(); outline(ctx, 5);
    text(ctx, '$83', -20, 34, font(100, 800, D), C.white, 'center'); ctx.restore();
  }
  const ke = pop(t, T('each.') + 0.05);
  chip(ctx, '980M × $83 = $81.3B', cx, s.y + 1105, 50, ke, { bg: C.yel, rot: -0.02 });
}

// ---------------------------------------------------------------- record bars (E and F)
function bars(ctx, t, items, k, sepia = false) {
  if (k <= 0) return;
  const base = s.y + 980, maxH = 620, bw = 290, n = items.length, gap = 60, x0 = cx - ((n - 1) * (bw + gap)) / 2;
  ctx.save(); ctx.globalAlpha = 1;
  ctx.lineWidth = 8; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.moveTo(s.x, base); ctx.lineTo(s.x + s.w, base); ctx.stroke();
  items.forEach((it, i) => { const x = x0 + i * (bw + gap), h = maxH * (it.v / 81.3) * it.p; if (it.p <= 0) return;
    ctx.fillStyle = C.ink; ctx.fillRect(x - bw / 2 + 12, base - h + 12, bw, h - 12);
    ctx.fillStyle = it.col; ctx.fillRect(x - bw / 2, base - h, bw, h); ctx.lineWidth = 7; ctx.strokeRect(x - bw / 2, base - h, bw, h);
    // halftone shading on the bar
    ctx.save(); ctx.beginPath(); ctx.rect(x - bw / 2, base - h, bw, h); ctx.clip(); ctx.fillStyle = 'rgba(0,0,0,0.12)';
    for (let yy = base - h; yy < base; yy += 22) for (let xx = x - bw / 2; xx < x + bw / 2; xx += 22) { ctx.beginPath(); ctx.arc(xx + 11, yy + 11, 3.5, 0, TAU); ctx.fill(); }
    ctx.restore();
    if (it.p > 0.08) text(ctx, it.val, x, base - h - 26, font(68, 800, D), C.ink, 'center');
    text(ctx, it.name, x, base + 52, font(it.name.length > 8 ? 44 : 50, 800, UI), C.ink, 'center');
    text(ctx, it.yr, x, base + 100, font(38, 600, UI), sepia ? '#3B2A14' : C.grey, 'center'); });
  ctx.restore();
}
function sRecord(ctx, t) {
  paperBg(ctx, t);
  const ts = T("SpaceX's"), tb = T('biggest');
  const pS = E.outCubic(prog(t, ts - 0.1, ts + 0.5)), pA = E.outBack(prog(t, tb - 0.15, tb + 0.45));
  bars(ctx, t, [
    { name: 'SpaceX', yr: 'June 2026', v: 75, p: pS, col: C.sky, val: '≈$75B' },
    { name: 'ANTHROPIC', yr: 'Nov 2026', v: 81.3, p: pA, col: C.yel, val: '$81.3B' },
  ], 1);
  const kh = pop(t, S.E + 0.05);
  chip(ctx, 'BIGGEST IPOs EVER', cx, s.y + 230, 50, kh, { bg: C.white, rot: -0.02 });
  const te = T('ever.'); const ks = t >= te ? Math.min(1.06, lerp(1.9, 1, E.outBack(prog(t, te, te + 0.25)))) : 0;
  if (ks > 0) { burst(ctx, cx + 175, s.y + 640, 140, C.red, ks, 0.2, 12, 0.7); big(ctx, '#1', cx + 175, s.y + 675, 104, C.white, ks, { rot: 0.1, sw: 0.1 }); }
}
function sAramco(ctx, t) {
  paperBg(ctx, t, true);
  const k3 = (i) => E.outBack(prog(t, T('three') + i * 0.25 - 0.05, T('three') + i * 0.25 + 0.3));
  // Anthropic bar vs a stack of 3 Aramco blocks
  const base = s.y + 980, maxH = 600, bw = 240;
  ctx.save(); ctx.translate(165, 0); bars(ctx, t, [{ name: 'ANTHROPIC', yr: '2026', v: 81.3, p: 1, col: C.yel, val: '$81.3B' }], 1, true); ctx.restore();
  ctx.save(); ctx.translate(250, 0); ctx.restore();
  const xA = cx + 0; // reuse: bars() centers single item at cx; draw Aramco stack to the left
  const hb0 = maxH * (29.4 / 81.3), xs = cx - 190;
  for (let i = 0; i < 3; i++) { const k = k3(i); if (k <= 0) continue; const hb = i < 2 ? hb0 : hb0 * 0.77; const yTop = base - hb0 * i - hb;
    ctx.save(); ctx.translate(xs, yTop + hb / 2 - (1 - Math.min(1, k)) * 300); ctx.globalAlpha = Math.min(1, k * 2);
    ctx.fillStyle = C.ink; ctx.fillRect(-bw / 2 + 10, -hb / 2 + 10, bw, hb - 10);
    ctx.fillStyle = '#E9D5AE'; ctx.fillRect(-bw / 2, -hb / 2, bw, hb); ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.strokeRect(-bw / 2, -hb / 2, bw, hb);
    text(ctx, i < 2 ? '$29.4B' : '', 0, 16, font(48, 800, D), C.ink, 'center'); ctx.restore(); }
  // re-centre: shift the Anthropic bar right by drawing labels
  if (k3(0) > 0) { text(ctx, 'Saudi Aramco', xs, base + 52, font(42, 800, UI), C.ink, 'center'); const k19 = t >= T('2019.') ? 1 + 0.35 * Math.exp(-(t - T('2019.')) * 5) : 1; ctx.save(); ctx.translate(xs, base + 100); ctx.scale(k19, k19); text(ctx, '2019 record', 0, 0, font(36, 800, UI), t >= T('2019.') ? C.red : '#3B2A14', 'center'); ctx.restore(); }
  const k = pop(t, T('three') - 0.05);
  if (k > 0) { burst(ctx, cx - 190, s.y + 225, 115, C.white, k, -0.2, 12, 0.72); big(ctx, '≈2.8×', cx - 190, s.y + 247, 56, C.red, k, { sw: 0.1 }); }
}

// ---------------------------------------------------------------- G: day one chart — $83 → close $97.17 (+17%)
function sDayOne(ctx, t) {
  paperBg(ctx, t);
  const x0 = s.x + 40, x1 = s.x + s.w - 40, yTop = s.y + 360, yBot = s.y + 1050;
  const yv = (v) => lerp(yBot, yTop, (v - 75) / (120 - 75));
  panel(ctx, cx, (yTop + yBot) / 2, x1 - x0 + 40, yBot - yTop + 120, C.white, 0);
  ctx.save(); ctx.setLineDash([16, 14]); ctx.lineWidth = 4; ctx.strokeStyle = C.grey; ctx.beginPath(); ctx.moveTo(x0, yv(83)); ctx.lineTo(x1, yv(83)); ctx.stroke(); ctx.restore();
  text(ctx, 'IPO PRICE $83', x0 + 10, yv(83) + 44, font(34, 800, UI), C.grey, 'left');
  // a deterministic path from 83 up, then settling to 97.17 at the close
  const N = 60, pts = [];
  for (let i = 0; i <= N; i++) { const f = i / N; let v = f < 0.12 ? lerp(83, 108, f / 0.12) : lerp(108, 97.17, E.inOutCubic((f - 0.12) / 0.88));
    v += (f > 0.05 && f < 0.97 ? (hash01(i, 7) - 0.5) * 5 : 0); pts.push([lerp(x0, x1, f), yv(v)]); }
  const p = E.inOutCubic(prog(t, T('day') - 0.1, T('+17%.') - 0.05)), m = Math.floor(p * N);
  if (p > 0) { ctx.lineWidth = 10; ctx.strokeStyle = C.green; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.beginPath();
    for (let i = 0; i <= m; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.stroke();
    const [hx, hy] = pts[m]; ctx.beginPath(); ctx.arc(hx, hy, 16, 0, TAU); ctx.fillStyle = C.yel; ctx.fill(); outline(ctx, 5); }
  chip(ctx, 'DAY ONE · 19 NOV', cx, s.y + 250, 48, pop(t, S.G + 0.05), { bg: C.yel, rot: -0.02 });
  const tc = T('closed'); if (t >= tc) chip(ctx, 'CLOSE $97.17', x1 - 150, yv(97.17) + 90, 40, pop(t, tc), { bg: C.white, rot: 0.03 });
  const t17 = T('+17%.'); const k = t >= t17 ? Math.min(1.08, lerp(1.9, 1, E.outBack(prog(t, t17, t17 + 0.28)))) : 0;
  if (k > 0) { burst(ctx, cx + 170, s.y + 520, 165, C.red, k, 0.1, 14); big(ctx, '+17%', cx + 170, s.y + 552, 100, C.white, k, { sw: 0.1, rot: -0.06 }); }
}

// ---------------------------------------------------------------- H: end card (loops to the hook)
function envelope(ctx, x, y, w) {
  const h = w * 0.66; ctx.save(); ctx.translate(x, y); rrect(ctx, -w / 2, -h / 2, w, h, 4); ctx.fillStyle = C.white; ctx.fill(); outline(ctx, 4);
  ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(0, h * 0.1); ctx.lineTo(w / 2, -h / 2); outline(ctx, 4); ctx.restore();
}
function sEnd(ctx, t) {
  paperBg(ctx, t);
  burst(ctx, cx, s.y + 330, 270, C.yel, pop(t, S.H - 0.25), t * 0.2, 16);
  big(ctx, '$81.3B', cx, s.y + 375, 130, C.red, pop(t, S.H - 0.15), { rot: -0.04 });
  text(ctx, 'ANTHROPIC · BIGGEST IPO EVER', cx, s.y + 650, font(38, 800, UI), C.ink, 'center', 1);
  text(ctx, 'WHYVERSE', cx, s.y + 760, font(84, 800, D), C.ink, 'center', 4);
  const kL = pop(t, T('Like') - 0.05), kF = pop(t, T('follow') - 0.05);
  if (kL > 0) { ctx.save(); ctx.translate(cx - 205, s.y + 905); ctx.scale(kL, kL); ctx.rotate(-0.05);
    rrect(ctx, -185 + 10, -72 + 10, 370, 144, 30); ctx.fillStyle = C.ink; ctx.fill();
    rrect(ctx, -185, -72, 370, 144, 30); ctx.fillStyle = C.white; ctx.fill(); outline(ctx, 7);
    const hb = 1 + 0.15 * Math.max(0, Math.sin((t - T('Like')) * 9)) * Math.exp(-(t - T('Like')) * 2);
    ctx.save(); ctx.translate(-100, 6); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30);
    ctx.fillStyle = C.red; ctx.fill(); outline(ctx, 5); ctx.restore();
    text(ctx, 'LIKE', 45, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  if (kF > 0) { ctx.save(); ctx.translate(cx + 205, s.y + 905); ctx.scale(kF, kF); ctx.rotate(0.05);
    rrect(ctx, -185 + 10, -72 + 10, 370, 144, 30); ctx.fillStyle = C.ink; ctx.fill();
    rrect(ctx, -185, -72, 370, 144, 30); ctx.fillStyle = C.yel; ctx.fill(); outline(ctx, 7);
    ctx.save(); ctx.translate(-110, 4); ctx.lineWidth = 13; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'FOLLOW', 40, 24, font(60, 800, D), C.ink, 'center'); ctx.restore(); }
  const kS = pop(t, T('more.') + 0.3);
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 1075); ctx.scale(kS, kS); panel(ctx, 0, 0, 840, 140, C.blue, -0.015);
    envelope(ctx, -360, 0, 70);
    text(ctx, 'Send this to the friend who', 30, -12, font(38, 800, UI), C.white, 'center');
    text(ctx, 'keeps talking about AI stocks', 30, 38, font(38, 800, UI), C.yel, 'center'); ctx.restore(); }
  text(ctx, 'Sources: Anthropic, Fortune, AP (19–20 Nov 2026)', cx, s.y + 1190, font(28, 600, UI), C.grey, 'center');
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 600, UI)],
  hits: HITS,
  draw(ctx, u, t) {
    if (t < S.B + 0.2) whip(ctx, t, S.B, () => sHook(ctx, t), () => sGuess(ctx, t));
    else if (t < S.D + 0.2) { if (t < T('Anthropic,') - 0.02) sGuess(ctx, t); else whip(ctx, t, S.D, () => sReveal(ctx, t), () => sShares(ctx, t)); }
    else if (t < S.E + 0.2) whip(ctx, t, S.E, () => sShares(ctx, t), () => sRecord(ctx, t));
    else if (t < S.F + 0.25) flashTo(ctx, t, S.F, () => sRecord(ctx, t), () => sAramco(ctx, t));
    else if (t < S.G + 0.2) whip(ctx, t, S.G, () => sAramco(ctx, t), () => sDayOne(ctx, t));
    else whip(ctx, t, S.H, () => sDayOne(ctx, t), () => sEnd(ctx, t), 0.34);
    if (t < S.H - 0.15) scoreboard(ctx, t);
    captions(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 260; i++) { ctx.fillStyle = `rgba(40,25,10,${0.03 + 0.04 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
