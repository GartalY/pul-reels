// "27 million songs are about to vanish from Tidal" — Whyverse 23:00 London fact Short, 26 Nov 2026. Pure function of time.
// Facts: ~27 M tracks tagged fully AI-generated (What Hi-Fi?/Yahoo 25 Nov); from 9 Dec 2026 wholly AI tracks rejected + removed (Tidal notice via
// Kazi 25 Nov); 43% of new uploads in the last 90 days fully AI; 96% of those got zero streams in 3 months (Yahoo; Kazi 25 Nov).
// Look: PHOTO + WORDS — dark Unsplash headphones photo (Mustafi Numann) under the Whyverse navy, slow push-in; persistent equaliser at the
// bottom of the stage + "FACT n/4" counter; ONE decoration at a time in the stage (y 300–1220); fixed subtitle bar (y ≈ 1290–1440).
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, hash01, clamp, TAU } = M;

const TIMING = __TIMING__;
const C = {
  navy: '#0A1030', navy2: '#141D4A', navy3: '#1E2A63', line: '#9DB2FF', white: '#F6F3EA', gold: '#FFC447',
  coral: '#FF6F5E', dim: '#5E6CA8', ink: '#04061A', green: '#7CE0A3',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => (x.orig || x.w) === w); return m[n] ? m[n].t : 0; };
const LN = (i) => TIMING.lines[i].t0;
const END = TIMING.dur;
const S = { A: 0, B: LN(1) - 0.1, C: LN(2) - 0.1, D: LN(3) - 0.1, E: LN(4) - 0.1, F: LN(5) - 0.1, G: LN(6) - 0.1 };
const B = (t) => t / 0.5;
const STAGE_Y = 760;        // centre of the decoration stage
const SUB_Y = 1365;         // centre of the subtitle bar

// ---------------------------------------------------------------- helpers
function big(ctx, str, x, y, size, col, k, { fam = D, wt = 800, align = 'center' } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.font = font(size, wt, fam); ctx.textAlign = align; ctx.lineJoin = 'round';
  ctx.lineWidth = size * 0.12; ctx.strokeStyle = C.ink; ctx.strokeText(str, 0, 0); ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function tag(ctx, label, x, y, size, k, { bg = C.gold, fg = C.navy } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.font = font(size, 800, UI);
  const w = ctx.measureText(label).width + size * 1.0, h = size * 1.5;
  ctx.fillStyle = bg; M.rrect(ctx, -w / 2, -h / 2, w, h, h * 0.22); ctx.fill();
  ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.fillText(label, 0, size * 0.36); ctx.restore();
}
function cross(ctx, x, y, r, k, col = C.coral) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.strokeStyle = col; ctx.lineWidth = r * 0.26; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-r, -r); ctx.lineTo(r, r); ctx.moveTo(r, -r); ctx.lineTo(-r, r); ctx.stroke(); ctx.restore();
}
function note(ctx, x, y, sz, col) { // a music note drawn from shapes
  ctx.save(); ctx.translate(x, y); ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineWidth = sz * 0.12;
  ctx.beginPath(); ctx.ellipse(0, 0, sz * 0.32, sz * 0.24, -0.4, 0, TAU); ctx.fill();
  ctx.beginPath(); ctx.moveTo(sz * 0.28, -sz * 0.05); ctx.lineTo(sz * 0.28, -sz); ctx.lineTo(sz * 0.62, -sz * 0.8); ctx.stroke(); ctx.restore();
}
const fmt = (n) => Math.round(n).toLocaleString('en-US');

// ---------------------------------------------------------------- background: photo + navy grade
function bg(ctx, t, IMG) {
  ctx.fillStyle = C.navy; ctx.fillRect(0, 0, W, H);
  if (IMG.photo) {
    const z = 1.08 + 0.10 * (t / END);
    ctx.save(); ctx.globalAlpha = 0.62; M.cover(ctx, IMG.photo, 0, 0, W, H, { fx: 0.5, fy: 0.45, zoom: z }); ctx.restore();
  }
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, 'rgba(10,16,48,0.80)'); g.addColorStop(0.45, 'rgba(10,16,48,0.45)'); g.addColorStop(0.75, 'rgba(10,16,48,0.70)'); g.addColorStop(1, 'rgba(6,9,30,0.95)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}
// persistent world: an equaliser under the stage; it "dies" (bars fall flat) on the ban and on zero streams
function eq(ctx, t) {
  const n = 22, x0 = s.x + 20, w = s.w - 40, bw = w / n * 0.62, y = 1215;
  const dead = Math.max(prog(t, T('removed.'), T('removed.') + 0.6) * (1 - prog(t, S.E, S.E + 0.4)), prog(t, T('zero'), T('zero') + 0.5) * (1 - prog(t, S.G, S.G + 0.4)));
  for (let i = 0; i < n; i++) {
    const v = 0.25 + 0.75 * Math.abs(Math.sin(t * (3 + 2.3 * hash01(i, 7)) + i * 1.7)) * (0.5 + 0.5 * hash01(i, 3));
    const h = lerp(14 + 70 * v, 8, dead);
    ctx.fillStyle = i % 5 === 2 ? C.gold : C.line; ctx.globalAlpha = 0.85;
    M.rrect(ctx, x0 + i * (w / n), y - h, bw, h, bw / 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
}
function counter(ctx, t) {
  const n = t < S.C ? 1 : t < S.E ? 2 : t < S.F ? 3 : 4;
  ctx.save(); ctx.font = font(34, 800, UI); ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(6,9,30,0.75)'; M.rrect(ctx, s.x, s.y + 4, 250, 60, 16); ctx.fill();
  ctx.fillStyle = C.gold; ctx.fillText(`FACT ${n}/4`, s.x + 22, s.y + 46);
  for (let i = 0; i < 4; i++) { ctx.fillStyle = i < n ? C.gold : C.dim; ctx.beginPath(); ctx.arc(s.x + 200 + (i % 2) * 22, s.y + 22 + Math.floor(i / 2) * 22, 7, 0, TAU); ctx.fill(); }
  ctx.restore();
  ctx.save(); ctx.font = font(26, 700, UI); ctx.textAlign = 'right'; ctx.fillStyle = 'rgba(246,243,234,0.6)';
  ctx.fillText('Photo: Mustafi Numann / Unsplash', s.x + s.w, s.y + 44); ctx.restore();
}

// ---------------------------------------------------------------- subtitle bar (fixed), phrase chunks
const CHUNKS = (() => {
  const out = [];
  TIMING.lines.forEach((L, li) => {
    if (li === 6) return;
    let cur = [];
    L.words.forEach((w, i) => {
      cur.push(w);
      const last = i === L.words.length - 1, punct = /[,.?!]$/.test(w.w);
      if (last || (punct && cur.length >= 2) || cur.length >= 5) { out.push({ words: cur, t: cur[0].t - 0.08 }); cur = []; }
    });
  });
  out.forEach((c, i) => { c.end = out[i + 1] ? out[i + 1].t : TIMING.lines[6].t0 - 0.1; });
  return out;
})();
function subtitles(ctx, t) {
  const c = CHUNKS.find((x) => t >= x.t && t < x.end); if (!c) return;
  const size = 64, gap = 18; ctx.font = font(size, 800, D);
  const ws = c.words.map((w) => ctx.measureText(w.w).width);
  let total = ws.reduce((a, b) => a + b, 0) + gap * (ws.length - 1);
  // two lines if too wide
  const lines = [[0, ws.length]];
  if (total > s.w - 60) { let acc = 0, k = 0; while (k < ws.length && acc + ws[k] < total / 2) { acc += ws[k] + gap; k++; } lines[0] = [0, k]; lines.push([k, ws.length]); }
  const a = clamp((t - c.t) / 0.12);
  const bh = lines.length === 1 ? 120 : 196;
  ctx.save(); ctx.globalAlpha = a;
  ctx.fillStyle = 'rgba(4,6,26,0.78)'; M.rrect(ctx, s.x - 20, SUB_Y - bh / 2, s.w + 40, bh, 24); ctx.fill();
  lines.forEach(([i0, i1], li) => {
    const lw = ws.slice(i0, i1).reduce((x, y) => x + y, 0) + gap * (i1 - i0 - 1);
    let x = cx - lw / 2; const y = SUB_Y + 22 + (lines.length === 1 ? 0 : (li === 0 ? -40 : 40));
    for (let i = i0; i < i1; i++) { ctx.fillStyle = c.words[i].key ? C.gold : C.white; ctx.textAlign = 'left'; ctx.fillText(c.words[i].w, x, y); x += ws[i] + gap; }
  });
  ctx.restore();
}

// ---------------------------------------------------------------- A: 27 MILLION (frame 0 = the number)
function sA(ctx, t) {
  const k = t < 0.05 ? 1 : Math.min(1.06, 0.94 + 0.12 * sp(t, 0.05, SPRING.bouncy));
  const van = prog(t, T('vanish'), T('vanish') + 0.9);
  big(ctx, '27 MILLION', cx, STAGE_Y - 120, 150, C.gold, k);
  big(ctx, 'SONGS', cx, STAGE_Y + 20, 120, C.white, k);
  tag(ctx, 'TIDAL', cx, STAGE_Y + 150, 52, pop(t, T('Tidal.') - 0.1));
  // notes floating up, fading out on "vanish"
  for (let i = 0; i < 14; i++) {
    const x = s.x + 40 + hash01(i, 11) * (s.w - 80), y0 = 1110 - hash01(i, 12) * 60, yy = y0 - ((t * 50 + i * 37) % 170);
    ctx.save(); ctx.globalAlpha = (1 - van) * (0.35 + 0.4 * hash01(i, 13)); note(ctx, x, yy - (STAGE_Y - 520) * 0, 40 + 30 * hash01(i, 14), i % 3 ? C.line : C.gold); ctx.restore();
  }
}
// ---------------------------------------------------------------- B: NO HUMAN
function person(ctx, x, y, sc, col) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.fillStyle = col;
  ctx.beginPath(); ctx.arc(0, -150, 70, 0, TAU); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-120, 120); ctx.quadraticCurveTo(-120, -60, 0, -60); ctx.quadraticCurveTo(120, -60, 120, 120); ctx.closePath(); ctx.fill();
  ctx.restore();
}
function sB(ctx, t) {
  const k = pop(t, S.B + 0.05);
  if (k > 0) { ctx.save(); ctx.translate(cx, STAGE_Y - 60); ctx.scale(k, k); person(ctx, 0, 0, 1.3, C.line); ctx.restore(); }
  cross(ctx, cx, STAGE_Y - 110, 190, pop(t, T('human') - 0.05));
  big(ctx, 'NO HUMAN MADE THEM', cx, STAGE_Y + 300, 76, C.white, pop(t, T('made') - 0.1));
}
// ---------------------------------------------------------------- C: 100% AI → BANNED
function sC(ctx, t) {
  const f = E.outCubic(prog(t, T('one') - 0.1, T('AI-generated.')));
  const r = 230, y = STAGE_Y - 60;
  ctx.save(); ctx.lineWidth = 34; ctx.lineCap = 'round';
  ctx.strokeStyle = 'rgba(157,178,255,0.25)'; ctx.beginPath(); ctx.arc(cx, y, r, 0, TAU); ctx.stroke();
  if (f > 0) { ctx.strokeStyle = C.coral; ctx.beginPath(); ctx.arc(cx, y, r, -Math.PI / 2, -Math.PI / 2 + TAU * f); ctx.stroke(); }
  ctx.restore();
  big(ctx, `${Math.round(100 * f)}%`, cx, y + 20, 150, C.white, pop(t, S.C + 0.05));
  big(ctx, 'AI-GENERATED', cx, y + 100, 52, C.line, pop(t, S.C + 0.1), { fam: UI });
  const kb = pop(t, T('AI-generated.') + 0.35);
  if (kb > 0) { ctx.save(); ctx.translate(cx, y + 370); ctx.rotate(-0.08); ctx.scale(kb, kb);
    ctx.lineWidth = 12; ctx.strokeStyle = C.coral; M.rrect(ctx, -250, -70, 500, 140, 18); ctx.stroke();
    ctx.font = font(100, 800, D); ctx.textAlign = 'center'; ctx.fillStyle = C.coral; ctx.fillText('BANNED', 0, 36); ctx.restore(); }
}
// ---------------------------------------------------------------- D: DEC 9 calendar + rows sliding out
function sD(ctx, t) {
  const k = pop(t, S.D + 0.05), y = STAGE_Y - 170;
  if (k > 0) { ctx.save(); ctx.translate(cx, y); ctx.scale(k, k);
    ctx.fillStyle = C.white; M.rrect(ctx, -190, -170, 380, 340, 30); ctx.fill();
    ctx.save(); M.rrect(ctx, -190, -170, 380, 340, 30); ctx.clip(); ctx.fillStyle = C.coral; ctx.fillRect(-190, -170, 380, 110); ctx.restore();
    ctx.font = font(64, 800, D); ctx.textAlign = 'center'; ctx.fillStyle = C.white; ctx.fillText('DEC', 0, -98);
    ctx.fillStyle = C.navy; ctx.font = font(190, 800, D); ctx.fillText('9', 0, 140); ctx.restore(); }
  // track rows
  for (let i = 0; i < 4; i++) {
    const ry = y + 250 + i * 78, kr = pop(t, S.D + 0.3 + i * 0.12);
    const out = E.inCubic(prog(t, T('rejected') + i * 0.12, T('rejected') + 0.5 + i * 0.12));
    if (kr <= 0) continue;
    ctx.save(); ctx.globalAlpha = 1 - out; ctx.translate(cx + out * 700, ry); ctx.scale(kr, kr);
    ctx.fillStyle = 'rgba(6,9,30,0.85)'; M.rrect(ctx, -330, -30, 660, 60, 14); ctx.fill();
    note(ctx, -290, 12, 30, C.gold);
    ctx.fillStyle = C.line; M.rrect(ctx, -230, -8, 260 + 120 * hash01(i, 5), 16, 8); ctx.fill();
    tag(ctx, '100% AI', 250, 0, 26, 1, { bg: C.coral, fg: C.white });
    ctx.restore();
  }
  tag(ctx, 'REJECTED + REMOVED', cx, y + 600, 46, pop(t, T('removed.') - 0.1), { bg: C.coral, fg: C.white });
}
// ---------------------------------------------------------------- E/F: 100-dot grids
function grid(ctx, t, lit, t0, colOn, colOff, label1, label2, kLab) {
  const n = 10, gap = 54, x0 = cx - gap * 4.5, y0 = STAGE_Y - 360;
  for (let i = 0; i < 100; i++) {
    const r = Math.floor(i / n), c = i % n;
    const on = i < lit(t);
    const kk = sp(t, t0 + (r * n + c) * 0.006);
    if (kk <= 0) continue;
    ctx.fillStyle = on ? colOn : colOff; ctx.beginPath(); ctx.arc(x0 + c * gap, y0 + r * gap, 22 * Math.min(1, kk), 0, TAU); ctx.fill();
  }
  big(ctx, label1, cx, y0 + 9 * gap + 140, 120, colOn === C.dim ? C.white : colOn, kLab);
  big(ctx, label2, cx, y0 + 9 * gap + 205, 44, C.white, kLab, { fam: UI });
}
function sE(ctx, t) {
  const t1 = T('forty-three'), lit = (tt) => Math.round(43 * E.outCubic(prog(tt, t1 - 0.2, t1 + 0.8)));
  grid(ctx, t, lit, S.E + 0.05, C.coral, 'rgba(157,178,255,0.35)', `${lit(t)}%`, 'OF NEW UPLOADS · LAST 90 DAYS', pop(t, t1 - 0.2));
}
function sF(ctx, t) {
  const t1 = T('ninety-six'), lit = (tt) => Math.round(96 * E.outCubic(prog(tt, t1 - 0.1, t1 + 0.9)));
  grid(ctx, t, lit, S.F + 0.05, C.dim, C.gold, `${lit(t)}%`, 'OF THOSE AI TRACKS', pop(t, t1 - 0.1));
  const kz = pop(t, T('zero') - 0.05);
  if (kz > 0) { ctx.save(); ctx.translate(cx, STAGE_Y - 120); ctx.scale(kz, kz);
    ctx.fillStyle = C.coral; M.rrect(ctx, -250, -58, 500, 116, 22); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-200, -30); ctx.lineTo(-200, 30); ctx.lineTo(-150, 0); ctx.closePath(); ctx.fillStyle = C.white; ctx.fill();
    ctx.font = font(62, 800, D); ctx.textAlign = 'center'; ctx.fillText('0 STREAMS', 40, 22); ctx.restore(); }
}
// ---------------------------------------------------------------- G: end card
function sEnd(ctx, t) {
  const t0 = S.G, a = clamp((t - t0 - 0.05) / 0.2);
  ctx.save(); ctx.globalAlpha = a;
  big(ctx, '27 MILLION AI SONGS', cx, s.y + 330, 80, C.gold, pop(t, t0 - 0.05));
  big(ctx, 'WHYVERSE', cx, s.y + 540, 128, C.white, 1);
  const kL = pop(t, T('Like') - 0.05), kF = pop(t, T('follow') - 0.05);
  if (kL > 0) { ctx.save(); ctx.translate(cx - 205, s.y + 740); ctx.scale(kL, kL);
    ctx.fillStyle = C.white; M.rrect(ctx, -180, -66, 360, 132, 30); ctx.fill();
    ctx.save(); ctx.translate(-95, 4); ctx.beginPath(); ctx.moveTo(0, 28); ctx.bezierCurveTo(-56, -10, -38, -56, 0, -30); ctx.bezierCurveTo(38, -56, 56, -10, 0, 28);
    ctx.fillStyle = C.coral; ctx.fill(); ctx.restore();
    text(ctx, 'LIKE', 45, 22, font(60, 800, D), C.navy, 'center'); ctx.restore(); }
  if (kF > 0) { ctx.save(); ctx.translate(cx + 205, s.y + 740); ctx.scale(kF, kF);
    ctx.fillStyle = C.gold; M.rrect(ctx, -180, -66, 360, 132, 30); ctx.fill();
    ctx.save(); ctx.translate(-110, 4); ctx.lineWidth = 12; ctx.strokeStyle = C.navy; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-24, 0); ctx.lineTo(24, 0); ctx.moveTo(0, -24); ctx.lineTo(0, 24); ctx.stroke(); ctx.restore();
    text(ctx, 'FOLLOW', 40, 22, font(54, 800, D), C.navy, 'center'); ctx.restore(); }
  const kS = pop(t, T('more.') + 0.1);
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 940); ctx.scale(kS, kS);
    ctx.fillStyle = 'rgba(6,9,30,0.9)'; M.rrect(ctx, -420, -64, 840, 128, 24); ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.line; ctx.stroke();
    ctx.save(); ctx.translate(-350, 0); ctx.fillStyle = C.white; ctx.fillRect(-34, -22, 68, 44); ctx.strokeStyle = C.navy; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-34, -22); ctx.lineTo(0, 6); ctx.lineTo(34, -22); ctx.stroke(); ctx.restore();
    text(ctx, 'Send this to the friend who', 40, -10, font(38, 800, UI), C.white, 'center');
    text(ctx, 'makes songs with AI', 40, 38, font(38, 800, UI), C.gold, 'center');
    ctx.restore(); }
  ctx.restore();
}
const HITS = [
  [B(0.02), '27M', 'thud'], [B(T('Tidal.') - 0.1), 'tidal', 'pop', { pitch: 'D5' }], [B(T('vanish')), 'vanish', 'whoosh', { len: 0.5, from: 1800, to: 300 }],
  [B(S.B), 'B', 'whoosh', { len: 0.35, from: 600, to: 1600 }], [B(T('human') - 0.05), 'x', 'thud'],
  [B(S.C), 'C', 'whoosh', { len: 0.35, from: 1600, to: 600 }], [B(T('AI-generated.') + 0.35), 'banned', 'thud'],
  [B(S.D), 'D', 'whoosh', { len: 0.35, from: 600, to: 1800 }], [B(T('removed.') - 0.1), 'removed', 'click'],
  [B(S.E), 'E', 'whoosh', { len: 0.35, from: 1800, to: 600 }], [B(T('forty-three') + 0.8), '43', 'blip', { pitch: 'A5' }],
  [B(S.F), 'F', 'whoosh', { len: 0.35, from: 600, to: 1600 }], [B(T('zero') - 0.05), 'zero', 'thud'],
  [B(S.G), 'end', 'whoosh', { len: 0.35, from: 600, to: 1600 }], [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop', { pitch: 'A5' }], [B(T('more.') + 0.1), 'send', 'click'],
];

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI)], images: { photo: 'photo.jpg' }, samples: 6,
  hits: HITS,
  draw(ctx, u, t, IMG) {
    bg(ctx, t, IMG);
    const fade = (a, b) => clamp(Math.min((t - a) / 0.2 + 1, (b - t) / 0.2));
    const scene = (a, b, fn) => { if (t >= a - 0.2 && t < b + 0.01) { ctx.save(); ctx.globalAlpha = a <= 0 ? clamp((b - t) / 0.2) : fade(a, b); fn(ctx, t); ctx.restore(); } };
    if (t < S.G) eq(ctx, t);
    scene(0, S.B, sA); scene(S.B, S.C, sB); scene(S.C, S.D, sC); scene(S.D, S.E, sD); scene(S.E, S.F, sE); scene(S.F, S.G, sF);
    if (t >= S.G - 0.05) sEnd(ctx, t);
    if (t < S.G - 0.1) counter(ctx, t);
    subtitles(ctx, t);
  },
});
