// "Macy's parade: first weather delay in 100 years" — Whyverse 19:00 Baku MYTH vs FACT Short, Thu 26 Nov 2026. Pure function of time.
// Facts: the 100th Macy's Thanksgiving Day Parade was postponed to Saturday 8:30 a.m. because of a storm — the first weather postponement
// in its history (ABC News, CBS New York, NBC New York, 25–26 Nov 2026). Suspended 1942–1944 in WWII; the helium (and rubber) went to the war
// effort (CBS New York; ABC News).
// Look: VINTAGE NEWSPAPER PHOTO STORY — cream newsprint with halftone dots, black ink, ONE accent (parade red), Lora headlines,
// real Wikimedia photos as tilted paper prints dealt onto a stack, a masthead "MYTH vs FACT" with a facts counter 0/2 → 2/2,
// fixed subtitle bar (viewer feedback 24 Nov).
import * as M from './lib/motion.js';
const { W, H, E, prog, lerp, spring, SPRING, font, text, hash01, clamp, TAU } = M;

const TIMING = __TIMING__;
const PHOTOS = __PHOTOS__;
const BEAT = __BEAT__;
const C = { paper: '#F2EADB', paper2: '#E6DAC3', ink: '#151210', inkS: '#3B342C', red: '#D3261C', redL: '#FF5A4E', white: '#FFFDF8', dim: '#7A6E5E' };
const D = 'Display', UI = 'UI';
const s = M.FORMAT.safe, cx = W / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const T = (w, n = 0) => { const m = TIMING.lines.flatMap((l) => l.words).filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const END = TIMING.dur;
const B = (t) => (t - BEAT.offset) / BEAT.period;
const BAR_Y = 1350;
const fade = (t, a, b, f = 0.15) => clamp(Math.min((t - a) / f + 1, (b - t) / f + 1));
const EC = 19.95; // end card

// ---------------------------------------------------------------- shots: each a DIFFERENT real photo, dealt as a paper print
// from: direction the print slides in from; rot: resting tilt (rad)
const SHOTS = __SHOTS__;
let IMGS = {}, DOTS = null;
const PX = cx, PY = 790, PW = 940, PH = 840; // print centre + size (photo area)

function paper(ctx) {
  ctx.fillStyle = C.paper; ctx.fillRect(0, 0, W, H);
  if (DOTS) ctx.drawImage(DOTS, 0, 0);
}
function printAt(ctx, sh, t, ox, oy, rot, sc = 1) {
  const im = IMGS[sh.k]; const bw = 22, cap = 46;
  ctx.save(); ctx.translate(PX + ox, PY + oy); ctx.rotate(rot); ctx.scale(sc, sc);
  ctx.fillStyle = 'rgba(40,28,10,0.28)'; ctx.fillRect(-PW / 2 - bw + 16, -PH / 2 - bw + 22, PW + bw * 2, PH + bw * 2 + cap);
  ctx.fillStyle = C.white; ctx.fillRect(-PW / 2 - bw, -PH / 2 - bw, PW + bw * 2, PH + bw * 2 + cap);
  ctx.save(); ctx.beginPath(); ctx.rect(-PW / 2, -PH / 2, PW, PH); ctx.clip();
  if (im) { const p = prog(t, sh.t0 - 0.2, sh.t1 + 0.4); const z = sh.z[0] * (sh.z[1] / sh.z[0]) ** p;
    if (sh.bw) ctx.filter = 'grayscale(1) contrast(1.1)';
    M.cover(ctx, im, -PW / 2, -PH / 2, PW, PH, { fx: sh.fx, fy: sh.fy, zoom: z }); ctx.filter = 'none'; }
  else { ctx.fillStyle = '#999'; ctx.fillRect(-PW / 2, -PH / 2, PW, PH); }
  ctx.restore();
  const cr = PHOTOS[sh.k] && PHOTOS[sh.k].credit;
  if (cr) text(ctx, 'Photo: ' + cr, -PW / 2, PH / 2 + bw + 22, font(24, 700, UI), C.inkS, 'left');
  if (sh.label) text(ctx, sh.label, PW / 2, PH / 2 + bw + 22, font(24, 700, UI), C.red, 'right');
  ctx.restore();
}
function photos(ctx, t) {
  const i = SHOTS.findIndex((x) => t >= x.t0 && t < x.t1); if (i < 0) return;
  const cur = SHOTS[i], prev = SHOTS[i - 1];
  if (prev) printAt(ctx, prev, cur.t0, 0, 0, prev.rot);
  const p = i === 0 ? 1 : sp(t, cur.t0 - 0.12, SPRING.snappy);
  const [dx, dy] = { r: [1300, -80], l: [-1300, 60], b: [60, 1500], t: [-40, -1400] }[cur.from || 'r'];
  printAt(ctx, cur, t, dx * (1 - p), dy * (1 - p), cur.rot + (1 - p) * (cur.from === 'l' ? -0.25 : 0.25));
}
// ---------------------------------------------------------------- helpers
function big(ctx, str, x, y, size, col, k, { fam = D, wt = 700, align = 'center', max = s.w - 40, stroke = null } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.font = font(size, wt, fam); const mw = ctx.measureText(str).width; if (mw > max) size *= max / mw;
  ctx.translate(x, y); ctx.scale(k, k); ctx.font = font(size, wt, fam); ctx.textAlign = align; ctx.lineJoin = 'round';
  if (stroke) { ctx.lineWidth = size * 0.14; ctx.strokeStyle = stroke; ctx.strokeText(str, 0, 0); }
  ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function tag(ctx, label, x, y, size, k, { bg = C.ink, fg = C.white, rot = 0 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.font = font(size, 800, UI);
  const w = ctx.measureText(label).width + size * 1.0, h = size * 1.6;
  ctx.fillStyle = bg; ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.fillText(label, 0, size * 0.36); ctx.restore();
}
function clipping(ctx, lines, x, y, w, k, rot = -0.03) { // a cut-out newspaper headline on the print
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  const lh = 92, h = lines.length * lh + 50;
  ctx.fillStyle = 'rgba(40,28,10,0.3)'; ctx.fillRect(-w / 2 + 10, -h / 2 + 12, w, h);
  ctx.fillStyle = C.paper; ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.fillStyle = C.ink; ctx.fillRect(-w / 2 + 24, -h / 2 + 16, w - 48, 5);
  lines.forEach(([str, col], i) => big(ctx, str, 0, -h / 2 + 50 + lh * (i + 0.72), 84, col, 1, { max: w - 60 }));
  ctx.restore();
}
function stampX(ctx, x, y, r, p) { // red ✗ drawn in two strokes
  if (p <= 0) return; ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = C.red; ctx.lineWidth = r * 0.22;
  const a = clamp(p * 2), b = clamp(p * 2 - 1);
  ctx.beginPath(); ctx.moveTo(x - r, y - r); ctx.lineTo(x - r + 2 * r * a, y - r + 2 * r * a); ctx.stroke();
  if (b > 0) { ctx.beginPath(); ctx.moveTo(x + r, y - r); ctx.lineTo(x + r - 2 * r * b, y - r + 2 * r * b); ctx.stroke(); }
  ctx.restore();
}
function stamp(ctx, label, x, y, size, k, rot = -0.14, col = C.red) { // rubber stamp box
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); const sc = 1 + 0.6 * (1 - Math.min(1, k)); ctx.scale(sc, sc);
  ctx.globalAlpha *= Math.min(1, k); ctx.font = font(size, 800, UI); const w = ctx.measureText(label).width + size * 0.9, h = size * 1.5;
  ctx.strokeStyle = col; ctx.lineWidth = size * 0.12; ctx.strokeRect(-w / 2, -h / 2, w, h);
  ctx.fillStyle = 'rgba(255,253,248,0.82)'; ctx.fillRect(-w / 2 + size * 0.1, -h / 2 + size * 0.1, w - size * 0.2, h - size * 0.2);
  ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.fillText(label, 0, size * 0.36); ctx.restore();
}
function check(ctx, x, y, r, p, col) {
  if (p <= 0) return; ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = col; ctx.lineWidth = r * 0.24;
  const pts = [[-0.45, 0.02], [-0.12, 0.35], [0.5, -0.35]]; const L1 = 0.45, tot = 1.39; const d = p * tot;
  ctx.beginPath(); ctx.moveTo(x + pts[0][0] * r, y + pts[0][1] * r);
  if (d < L1) { const f = d / L1; ctx.lineTo(x + lerp(pts[0][0], pts[1][0], f) * r, y + lerp(pts[0][1], pts[1][1], f) * r); }
  else { ctx.lineTo(x + pts[1][0] * r, y + pts[1][1] * r); const f = (d - L1) / (tot - L1); ctx.lineTo(x + lerp(pts[1][0], pts[2][0], f) * r, y + lerp(pts[1][1], pts[2][1], f) * r); }
  ctx.stroke(); ctx.restore();
}
// ---------------------------------------------------------------- masthead: MYTH vs FACT, facts counter 0/2 → 2/2
const FACTS = [() => T('never'), () => T('war.')];
function masthead(ctx, t) {
  const y0 = 140, x0 = s.x + 10, w = s.w - 20;
  ctx.fillStyle = C.ink; ctx.fillRect(x0, y0, w, 6); ctx.fillRect(x0, y0 + 150, w, 3);
  text(ctx, 'THE WHYVERSE TIMES · 26 NOV 2026', x0, y0 + 44, font(26, 800, UI), C.inkS, 'left', 3);
  const k = (t < 5.5) ? 0 : 1;
  text(ctx, 'MYTH', x0, y0 + 124, font(66, 700, D), C.ink, 'left');
  ctx.font = font(66, 700, D); const mw = ctx.measureText('MYTH').width;
  stampX(ctx, x0 + mw / 2, y0 + 100, 34, prog(t, T('Actually,') - 0.05, T('Actually,') + 0.3));
  text(ctx, 'vs FACT', x0 + mw + 22, y0 + 124, font(66, 700, D), k ? C.red : C.ink, 'left');
  const n = FACTS.filter((f) => t >= f()).length;
  for (let i = 0; i < 2; i++) { const bx = x0 + w - 134 + i * 100, by = y0 + 100, on = t >= FACTS[i]();
    ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.strokeRect(bx - 34, by - 34, 68, 68);
    if (on) check(ctx, bx, by, 40, prog(t, FACTS[i](), FACTS[i]() + 0.3), C.red); }
  text(ctx, 'FACTS ' + n + '/2', x0 + w, y0 + 44, font(30, 800, UI), n ? C.red : C.inkS, 'right', 2);
}
// ---------------------------------------------------------------- decoration (ONE element at a time, never over the subtitle bar)
function decor(ctx, t) {
  if (t < SHOTS[1].t0) { // hook on frame 0: the myth as a headline clipping
    clipping(ctx, [["MACY'S PARADE", C.ink], ['NEVER MISSES', C.ink], ['THANKSGIVING', C.red]], cx, 1010, 900, 1, -0.025);
    stamp(ctx, 'IN 100 YEARS?', cx + 150, 520, 62, 1, 0.07);
    return; }
  if (t < SHOTS[2].t0) { const a = fade(t, SHOTS[1].t0, SHOTS[2].t0 - 0.05); ctx.globalAlpha = a;
    tag(ctx, "MACY'S THANKSGIVING DAY PARADE · NYC", cx, 1095, 38, sp(t, SHOTS[1].t0 + 0.1)); ctx.globalAlpha = 1; return; }
  if (t < SHOTS[3].t0) { const a = fade(t, SHOTS[2].t0, SHOTS[3].t0 - 0.05); const k = sp(t, T('100') - 0.15);
    const n = Math.round(100 * E.outCubic(prog(t, T('100') - 0.15, T('100') + 0.5)));
    ctx.globalAlpha = a; big(ctx, String(n), cx, 1000, 300, C.red, pop(t, T('100') - 0.15), { stroke: C.paper });
    big(ctx, 'YEARS', cx, 1100, 90, C.ink, k, { fam: UI, wt: 800, stroke: C.paper }); ctx.globalAlpha = 1; return; }
  if (t < SHOTS[4].t0) { const a = fade(t, SHOTS[3].t0, SHOTS[4].t0 - 0.05); ctx.globalAlpha = a; // the myth crossed out
    clipping(ctx, [['NEVER MISSES', C.ink], ['THANKSGIVING', C.ink]], cx, 990, 860, sp(t, SHOTS[3].t0), 0.02);
    const p = prog(t, T('Actually,') - 0.05, T('Actually,') + 0.35); stampX(ctx, cx, 990, 170, p);
    stamp(ctx, 'NOT THIS YEAR', cx, 560, 64, sp(t, T('not') - 0.05, SPRING.bouncy)); ctx.globalAlpha = 1; return; }
  if (t < SHOTS[5].t0) { wind(ctx, t, fade(t, SHOTS[4].t0, SHOTS[5].t0 - 0.05)); return; }
  if (t < SHOTS[6].t0) { calendar(ctx, t, fade(t, SHOTS[5].t0, SHOTS[6].t0 - 0.05)); return; }
  if (t < SHOTS[7].t0) { const a = fade(t, SHOTS[6].t0, SHOTS[7].t0 - 0.05); ctx.globalAlpha = a;
    big(ctx, '1ST', cx, 1000, 220, C.red, pop(t, T('never') - 0.1), { stroke: C.paper });
    stamp(ctx, 'WEATHER DELAY EVER', cx, 1120, 56, sp(t, T('never') + 0.15), -0.05, C.ink); ctx.globalAlpha = 1; return; }
  if (t < SHOTS[9].t0) { years(ctx, t, fade(t, SHOTS[7].t0, SHOTS[9].t0 - 0.05)); return; }
  if (t < EC) { helium(ctx, t, fade(t, SHOTS[9].t0, EC - 0.03)); return; }
}
function wind(ctx, t, a) { // storm: gust lines streaking across the print + tag
  ctx.save(); ctx.globalAlpha = a; ctx.lineCap = 'round';
  for (let i = 0; i < 9; i++) { const y = 470 + i * 70 + Math.sin(t * 3 + i) * 10, sp0 = 900 + hash01(i, 5) * 900, ph = hash01(i, 6);
    const x = ((t * sp0 + ph * 2000) % 2200) - 600, len = 160 + hash01(i, 7) * 220;
    ctx.strokeStyle = 'rgba(255,253,248,0.85)'; ctx.lineWidth = 6 + hash01(i, 8) * 6;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(x + len * 0.5, y - 18, x + len, y); ctx.stroke(); }
  stamp(ctx, 'STORM', cx, 1080, 92, sp(t, T('storm') - 0.1, SPRING.bouncy), -0.08);
  ctx.restore();
}
function calendar(ctx, t, a) { // THU 26 flips to SAT 28 on "Saturday"
  ctx.save(); ctx.globalAlpha = a; const k = sp(t, SHOTS[5].t0 + 0.05); const x = cx, y = 960;
  ctx.translate(x, y); ctx.scale(k, k);
  const w = 380, h = 330; ctx.fillStyle = 'rgba(40,28,10,0.3)'; ctx.fillRect(-w / 2 + 12, -h / 2 + 14, w, h);
  ctx.fillStyle = C.white; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.fillStyle = C.red; ctx.fillRect(-w / 2, -h / 2, w, 90);
  text(ctx, 'NOVEMBER', 0, -h / 2 + 62, font(44, 800, UI), C.white, 'center', 3);
  const tf = T('Saturday.') - 0.1, f = E.inOutCubic(prog(t, tf, tf + 0.35));
  const showNew = f >= 0.5, sy = Math.abs(Math.cos(f * Math.PI));
  ctx.save(); ctx.scale(1, sy);
  text(ctx, showNew ? 'SAT' : 'THU', 0, -10, font(60, 800, UI), showNew ? C.red : C.inkS, 'center', 4);
  text(ctx, showNew ? '28' : '26', 0, 120, font(150, 700, D), C.ink, 'center');
  ctx.restore();
  if (showNew) tag(ctx, '8:30 AM', 0, h / 2 + 50, 44, sp(t, tf + 0.35), { bg: C.ink });
  ctx.restore();
}
function years(ctx, t, a) { // 1942 → 1943 → 1944, each stamped NO PARADE
  ctx.save(); ctx.globalAlpha = a;
  const t42 = T('1942'), t44 = T('1944,'), steps = [t42 - 0.05, (t42 + t44) / 2, t44 - 0.05];
  const idx = steps.filter((x) => t >= x).length - 1; if (idx < 0) { ctx.restore(); return; }
  const yr = 1942 + idx, k = pop(t, steps[idx]);
  ctx.fillStyle = C.ink; ctx.fillRect(cx - 330, 905, 660, 210);
  big(ctx, String(yr), cx, 1065, 170, C.paper, k);
  for (let i = 0; i <= idx; i++) { const dx = (i - 1) * 210; ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(cx + dx, 1150, 14 * sp(t, steps[i]), 0, TAU); ctx.fill(); }
  if (t >= T('march', 0) - 0.1 && t > t44) stamp(ctx, 'NO PARADE', cx, 860, 70, sp(t, T('march') - 0.1, SPRING.bouncy), 0.08);
  ctx.restore();
}
function helium(ctx, t, a) { // a helium balloon floats up and away + tag
  ctx.save(); ctx.globalAlpha = a; const t0 = T('helium') - 0.1, k = sp(t, t0);
  const up = E.inCubic(prog(t, T('war.') + 0.1, EC)) * 330, x = cx + 250 + Math.sin(t * 2) * 14, y = 640 - up;
  ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x, y + 95 * k); ctx.quadraticCurveTo(x - 30, y + 200, x + 10, y + 300); ctx.stroke();
  ctx.fillStyle = C.red; ctx.beginPath(); ctx.ellipse(x, y, 80 * k, 95 * k, 0, 0, TAU); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.beginPath(); ctx.ellipse(x - 26 * k, y - 32 * k, 18 * k, 28 * k, -0.4, 0, TAU); ctx.fill();
  text(ctx, 'He', x, y + 22, font(64 * Math.max(0.01, k), 800, UI), C.white, 'center');
  tag(ctx, 'HELIUM → WAR EFFORT', cx, 1110, 50, sp(t, T('war.') - 0.15), { bg: C.red });
  ctx.restore();
}
// ---------------------------------------------------------------- end card
function endCard(ctx, t) {
  paper(ctx);
  for (let i = 0; i < 7; i++) { const st = EC + 0.2 + i * 0.45, f = t - st; if (f < 0) continue; // balloons drifting up (keeps the card alive)
    const x = s.x + 60 + hash01(i, 41) * (s.w - 120) + Math.sin(f * 1.6 + i) * 30, y = 1900 - f * (170 + hash01(i, 42) * 90), r = 46 + hash01(i, 43) * 26;
    ctx.strokeStyle = 'rgba(21,18,16,0.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y + r * 1.15); ctx.quadraticCurveTo(x - 20, y + r * 2.2, x + 6, y + r * 3.2); ctx.stroke();
    ctx.fillStyle = i % 3 === 1 ? C.ink : C.red; ctx.beginPath(); ctx.ellipse(x, y, r, r * 1.18, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.beginPath(); ctx.ellipse(x - r * 0.32, y - r * 0.4, r * 0.2, r * 0.32, -0.4, 0, TAU); ctx.fill(); }
  const p = E.inOutCubic(prog(t, EC - 0.05, EC + 0.3)); ctx.save(); ctx.translate(0, (1 - p) * 300); ctx.globalAlpha = p;
  ctx.fillStyle = C.ink; ctx.fillRect(s.x + 10, 430, s.w - 20, 6);
  big(ctx, 'WHYVERSE', cx, 580, 150, C.ink, 1);
  text(ctx, 'big questions, visual answers', cx, 650, font(40, 700, UI), C.dim, 'center');
  ctx.fillStyle = C.ink; ctx.fillRect(s.x + 10, 700, s.w - 20, 3);
  const btn = (lab, x, y, t0, bg, fg) => { const k = pop(t, t0); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    ctx.fillStyle = bg; M.rrect(ctx, -200, -70, 400, 140, 70); ctx.fill(); text(ctx, lab, 0, 26, font(70, 800, UI), fg, 'center'); ctx.restore(); };
  btn('LIKE', cx - 220, 840, T('Like'), C.ink, C.white);
  btn('FOLLOW', cx + 220, 840, T('follow'), C.red, C.white);
  const k = sp(t, T('more.') + 0.2);
  if (k > 0) { ctx.save(); ctx.globalAlpha = p * Math.min(1, k); ctx.translate(cx, 1040 + (1 - k) * 40);
    ctx.fillStyle = C.white; ctx.fillRect(-470, -80, 940, 190); ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.strokeRect(-470, -80, 940, 190);
    ctx.save(); ctx.translate(-380, 14); ctx.fillStyle = C.red; ctx.fillRect(-40, -26, 80, 52); ctx.strokeStyle = C.white; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(-40, -26); ctx.lineTo(0, 6); ctx.lineTo(40, -26); ctx.stroke(); ctx.restore();
    text(ctx, 'Send this to the friend who', 50, -4, font(44, 800, UI), C.ink, 'center');
    text(ctx, 'watches the parade every year', 50, 56, font(44, 800, UI), C.red, 'center');
    ctx.restore(); }
  ctx.restore();
}
// ---------------------------------------------------------------- fixed subtitle bar (lower third), phrase chunks, never moves
const CHUNKS = (() => {
  const out = [];
  for (const L of TIMING.lines) {
    const sents = []; let cur = [];
    L.words.forEach((w) => { cur.push(w); if (/[.!?:]$/.test(w.w) || (/,$/.test(w.w) && cur.length >= 2)) { sents.push(cur); cur = []; } }); if (cur.length) sents.push(cur);
    for (const S of sents) { const n = Math.ceil(S.length / 5), per = Math.ceil(S.length / n);
      for (let i = 0; i < S.length; i += per) out.push({ t0: S[i].t - 0.08, words: S.slice(i, i + per) }); }
  }
  out.forEach((c, i) => { const L = TIMING.lines.find((l) => l.words.includes(c.words[c.words.length - 1]));
    const next = out[i + 1]; c.t1 = next ? Math.min(next.t0, L.t1 + 0.7) : Math.min(END, L.t1 + 0.9); });
  return out;
})();
function subtitles(ctx, t) {
  const c = CHUNKS.find((x) => t >= x.t0 && t < x.t1); if (!c) return;
  const fs = 56; ctx.font = font(fs, 800, UI); const gap = 15, maxW = s.w - 80;
  const widths = c.words.map((w) => ctx.measureText(w.w).width);
  const total = widths.reduce((a, b) => a + b, 0) + gap * (c.words.length - 1);
  let lines = [[0, c.words.length]];
  if (total > maxW) { let best = 1, bd = 1e9; for (let k = 1; k < c.words.length; k++) { const a = widths.slice(0, k).reduce((p, q) => p + q, 0) + gap * (k - 1);
      const b = total - a - gap; const d = Math.max(a, b); if (d < bd) { bd = d; best = k; } } lines = [[0, best], [best, c.words.length]]; }
  const lh = 70, h = lines.length * lh + 40;
  ctx.fillStyle = 'rgba(21,18,16,0.9)'; M.rrect(ctx, s.x + 10, BAR_Y - h / 2, s.w - 20, h, 18); ctx.fill();
  lines.forEach(([a, b], li) => {
    const lw = widths.slice(a, b).reduce((p, q) => p + q, 0) + gap * (b - a - 1); let x = cx - lw / 2;
    const y = BAR_Y - h / 2 + 20 + lh * li + 52;
    for (let i = a; i < b; i++) { const w = c.words[i]; ctx.fillStyle = w.key ? C.redL : C.white; ctx.textAlign = 'left'; ctx.fillText(w.w, x, y); x += widths[i] + gap; }
  });
}
const DEAL = (t) => [B(t), 'deal', 'whoosh', { len: 0.22, from: 900, to: 2400 }];
const HITS = [
  [B(0.03), 'hook', 'thud'],
  ...SHOTS.slice(1).map((x) => DEAL(x.t0)),
  [B(T('100') - 0.15), '100', 'type', { len: 0.6, n: 7 }], [B(T('100') + 0.45), '100 lands', 'bell'],
  [B(T('Actually,') - 0.05), 'myth X', 'thud'], [B(T('not') - 0.05), 'not this year', 'thud'],
  [B(T('storm') - 0.1), 'storm', 'whoosh', { len: 0.9, from: 300, to: 1200 }],
  [B(T('Saturday.') - 0.1), 'calendar', 'click'], [B(T('Saturday.') + 0.25), 'sat', 'pop'],
  [B(T('never') - 0.1), '1st', 'thud'], [B(T('never')), 'fact1', 'bell'],
  [B(T('1942') - 0.05), '1942', 'click'], [B(T('1944,') - 0.05), '1944', 'click'], [B(T('march') - 0.1), 'no parade', 'thud'],
  [B(T('helium') - 0.1), 'balloon', 'boing'], [B(T('war.')), 'fact2', 'bell'],
  [B(EC - 0.05), 'end', 'whoosh', { len: 0.3, from: 600, to: 1800 }], [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop'], [B(T('more.') + 0.2), 'send', 'click'],
];
const images = {}; for (const k of Object.keys(PHOTOS)) images[k] = PHOTOS[k].src;
M.film({
  fonts: [font(40, 700, D), font(40, 800, UI), font(40, 700, UI)], samples: 5, images, hits: HITS,
  init(ctx, IMG) { IMGS = IMG;
    DOTS = document.createElement('canvas'); DOTS.width = W; DOTS.height = H; const d = DOTS.getContext('2d');
    for (let y = 0; y < H; y += 14) for (let x = (y / 14) % 2 ? 7 : 0; x < W; x += 14) { const r = 1.2 + 1.6 * hash01(x * 7 + y, 3);
      d.fillStyle = 'rgba(120,95,60,0.13)'; d.beginPath(); d.arc(x, y, r, 0, TAU); d.fill(); }
    const g = d.createRadialGradient(cx, H / 2, 300, cx, H / 2, 1200); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(90,60,20,0.25)');
    d.fillStyle = g; d.fillRect(0, 0, W, H); },
  draw(ctx, u, t) {
    if (t < EC) { paper(ctx); photos(ctx, t); decor(ctx, t); masthead(ctx, t); }
    else endCard(ctx, t);
    subtitles(ctx, t);
  },
});
