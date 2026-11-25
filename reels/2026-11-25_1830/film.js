// "Üç il, üç Avropa qızılı" — @bilirdinizmi_az 18:30 animated TREND reel, 25 Nov 2026.
// Bilalhəbaşi Nəzərov (19, Azerbaijan) won 50 kg gold at the 2026 European U23 Championships in Poreč, Croatia (24 Nov):
// final v Tevfik Akkaş (Türkiye) 5:0 on all five cards; 3rd European title in 3 years (Poreč 2024 youth, Ostrava 2025 youth,
// Poreč 2026 U23) — report.az, trend.az, news.az, qol.az, azertag. Arif voice (ElevenLabs) on audio/vo.wav.
// VIEWER FEEDBACK 24 Nov: narration = ONE fixed subtitle bar, phrases, never moving; max ONE other text element at a time.
// REAL PHOTOS: none could be fetched this run (the session's network blocked every photo host) -> rule fallback:
// SILHOUETTES (code-drawn boxer figures) + drawn ring / map / medals. No logos. No music.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = {"dur": 25.2, "chunks": [{"t0": 0.0, "text": "Üç il, üç Avropa qızılı!", "keys": ["Üç", "üç", "qızılı!"], "t1": 2.66}, {"t0": 2.66, "text": "On doqquz yaşlı boksçumuz", "keys": ["On", "doqquz"], "t1": 4.17}, {"t0": 4.17, "text": "Bilalhəbaşi Nəzərov yenə birincidir.", "keys": ["Bilalhəbaşi", "Nəzərov"], "t1": 6.94}, {"t0": 6.94, "text": "Xorvatiyanın Poreç şəhərində,", "keys": ["Poreç"], "t1": 8.848}, {"t0": 8.848, "text": "23 yaşadək boksçular arasında qalib gəldi.", "keys": ["23", "yaşadək"], "t1": 11.9}, {"t0": 11.9, "text": "Finalda 5 hakimin hamısı onu seçdi.", "keys": ["5", "hamısı"], "t1": 14.68}, {"t0": 14.68, "text": "Ən maraqlısı:", "keys": ["maraqlısı:"], "t1": 16.04}, {"t0": 16.04, "text": "ilk Avropa qızılını 2 il əvvəl", "keys": ["ilk", "qızılını"], "t1": 18.192}, {"t0": 18.192, "text": "elə bu şəhərdə qazanmışdı.", "keys": ["bu", "şəhərdə"], "t1": 20.23}, {"t0": 20.23, "text": "Bəyən və izlə —", "keys": ["Bəyən", "izlə"], "t1": 21.69}, {"t0": 21.69, "text": "hər gün bilmədiyin bir fakt!", "keys": ["fakt!"], "t1": 25.2}], "words": [["Üç", -0.05], ["il,", 0.211], ["üç", 0.733], ["Avropa", 0.993], ["qızılı!", 1.602], ["On", 2.7], ["doqquz", 2.809], ["yaşlı", 3.157], ["boksçumuz", 3.591], ["Bilalhəbaşi", 4.2], ["Nəzərov", 4.939], ["yenə", 5.591], ["birincidir.", 5.852], ["Xorvatiyanın", 6.98], ["Poreç", 7.704], ["şəhərində,", 8.096], ["iyirmi", 8.878], ["üç", 9.153], ["yaşadək", 9.313], ["boksçular", 9.748], ["arasında", 10.313], ["qalib", 10.835], ["gəldi.", 11.27], ["Finalda", 11.94], ["beş", 12.53], ["hakimin", 12.748], ["hamısı", 13.27], ["onu", 13.791], ["seçdi.", 14.052], ["Ən", 14.72], ["maraqlısı:", 14.878], ["ilk", 16.08], ["Avropa", 16.352], ["qızılını", 16.743], ["iki", 17.396], ["il", 17.657], ["əvvəl", 17.83], ["elə", 18.222], ["bu", 18.483], ["şəhərdə", 18.613], ["qazanmışdı.", 19.004], ["Bəyən", 20.27], ["və", 20.813], ["izlə", 20.987], ["—", 21.683], ["hər", 21.73], ["gün", 22.03], ["bilmədiyin", 22.349], ["bir", 22.9], ["fakt!", 23.074]]};
const C = {
  bg: '#0B1224', bg2: '#15203F', ink: '#070A12', paper: '#F5F1E6', white: '#FFFFFF', gold: '#FFC629', gold2: '#E09B12',
  green: '#2FD27A', red: '#E5372B', mute: 'rgba(245,241,230,0.10)', azB: '#00B5E2', azR: '#EF3340', azG: '#509E2F', grey: '#5A6274',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const TOP = s.y, BOT = 1225;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const out = (t, t1, d = 0.18) => 1 - E.inCubic(prog(t, t1, t1 + d));

const WS = TIMING.words;
const T = (w, n = 0) => { const m = WS.filter((x) => x[0] === w); return m[n] ? m[n][1] : 0; };
const END = TIMING.dur;
const S = { A: 0, B: T('On') - 0.04, C: T('Xorvatiyanın') - 0.04, D: T('Finalda') - 0.04, E: T('Ən') - 0.04, F: T('Bəyən') - 0.04 };
const B = (t) => t / 0.5;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.3, from, to }];

const HITS = [
  [B(0.02), 'hook', 'thud'], [B(T('üç') + 0.02), 'medal 2', 'thud'], [B(T('qızılı!') + 0.02), 'medal 3', 'impact'],
  WH(S.B, 600, 2200), [B(T('On') + 0.05), '19', 'click'], [B(T('Bilalhəbaşi') - 0.03), 'name', 'click'], [B(T('birincidir.') + 0.25), 'arm up', 'thud'],
  WH(S.C, 2200, 600), [B(T('Poreç') - 0.05), 'pin', 'tick'], [B(T('boksçular')), 'crowd', 'whoosh', { len: 0.9, from: 300, to: 1400 }],
  [B(T('yaşadək') - 0.1), 'stamp', 'thud'], [B(T('qalib') + 0.1), 'medal drop', 'thud'],
  WH(S.D, 600, 2200), [B(T('Finalda') + 0.1), 'punch', 'thud'],
  [B(T('beş') + 0.0), 'card 1', 'click'], [B(T('beş') + 0.22), 'card 2', 'click'], [B(T('hakimin') + 0.12), 'card 3', 'click'],
  [B(T('hamısı') + 0.05), 'card 4', 'click'], [B(T('onu') + 0.0), 'card 5', 'click'], [B(T('seçdi.') + 0.02), '5:0', 'impact'],
  WH(S.E, 2200, 600), [B(T('maraqlısı:') + 0.1), '?', 'tick'], [B(T('ilk') + 0.05), 'medal 1', 'click'], [B(T('iki') + 0.0), '2024', 'thud'],
  [B(T('elə') + 0.05), 'loop', 'whoosh', { len: 1.0, from: 400, to: 1800 }], [B(T('şəhərdə') + 0.05), 'YENƏ POREÇ', 'thud'],
  WH(S.F, 600, 2200), [B(T('Bəyən')), 'BƏYƏN', 'click'], [B(T('izlə')), 'İZLƏ', 'thud'], [B(T('fakt!') + 0.3), 'send line', 'tick'],
];

// ---------------------------------------------------------------- helpers
function outline(ctx, w = 6, col = C.ink) { ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineJoin = 'round'; ctx.stroke(); }
function big(ctx, str, x, y, size, col, k, { stroke = C.ink, rot = 0, fam = D, wt = 800, sw = 0.09 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, fam); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
  if (stroke) { ctx.lineWidth = size * sw; ctx.strokeStyle = stroke; ctx.strokeText(str, 0, 0); }
  ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function stamp(ctx, label, x, y, size, k, { bg = C.gold, fg = C.ink, rot = -0.07, edge = C.ink } = {}) {
  if (k <= 0) return; const q = Math.min(1, k), sc = lerp(1.8, 1, q) * (k > 1 ? k : 1);
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha *= clamp(q * 3);
  ctx.font = font(size, 800, D); const w = ctx.measureText(label).width + size * 1.1, h = size * 1.6;
  rrect(ctx, -w / 2, -h / 2, w, h, size * 0.25); ctx.fillStyle = bg; ctx.fill(); outline(ctx, 7, edge);
  text(ctx, label, 0, size * 0.36, font(size, 800, D), fg, 'center'); ctx.restore();
}
function whip(ctx, t, t0, a, b, dur = 0.3) {
  const p = E.inOutCubic(prog(t, t0 - dur * 0.55, t0 + dur * 0.45));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(-p * W, 0); a(); ctx.restore(); ctx.save(); ctx.translate((1 - p) * W, 0); b(); ctx.restore();
}
function envelope(ctx, x, y, w) {
  const h = w * 0.68; ctx.save(); ctx.translate(x, y);
  rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.fillStyle = C.paper; ctx.fill(); outline(ctx, 4);
  ctx.beginPath(); ctx.moveTo(-w / 2 + 3, -h / 2 + 3); ctx.lineTo(0, h * 0.08); ctx.lineTo(w / 2 - 3, -h / 2 + 3); outline(ctx, 4); ctx.restore();
}
function azFlag(ctx, x, y, w, h) {
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = C.azB; ctx.fillRect(-w / 2, -h / 2, w, h / 3); ctx.fillStyle = C.azR; ctx.fillRect(-w / 2, -h / 6, w, h / 3);
  ctx.fillStyle = C.azG; ctx.fillRect(-w / 2, h / 6, w, h / 3);
  const r = h * 0.12; ctx.beginPath(); ctx.arc(-r * 0.15, 0, r, 0, TAU); ctx.fillStyle = '#fff'; ctx.fill();
  ctx.beginPath(); ctx.arc(r * 0.12, 0, r * 0.8, 0, TAU); ctx.fillStyle = C.azR; ctx.fill();
  ctx.beginPath(); for (let i = 0; i < 16; i++) { const a = i * TAU / 16, rr = i % 2 ? r * 0.22 : r * 0.5; ctx.lineTo(r * 0.95 + Math.cos(a) * rr * 0.6, Math.sin(a) * rr * 0.6); }
  ctx.closePath(); ctx.fillStyle = '#fff'; ctx.fill();
  ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.strokeRect(-w / 2, -h / 2, w, h); ctx.restore();
}

// gold medal with an AZ-colour ribbon; spin = 0..1 edge-flip on landing
function medal(ctx, x, y, r, k, { spin = 0, ribbon = true, glow = 0 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  if (ribbon) {
    const cols = [C.azB, C.azR, C.azG];
    for (const side of [-1, 1]) { ctx.save(); ctx.beginPath(); ctx.moveTo(side * r * 0.15, -r * 0.6); ctx.lineTo(side * r * 0.95, -r * 2.3);
      ctx.lineTo(side * r * 0.35, -r * 2.3); ctx.lineTo(-side * r * 0.25, -r * 0.7); ctx.closePath(); ctx.clip();
      for (let i = 0; i < 3; i++) { ctx.fillStyle = cols[i]; ctx.fillRect(-r * 2, -r * 2.4 + i * r * 0.62, r * 4, r * 0.62); }
      ctx.restore(); ctx.beginPath(); ctx.moveTo(side * r * 0.15, -r * 0.6); ctx.lineTo(side * r * 0.95, -r * 2.3);
      ctx.lineTo(side * r * 0.35, -r * 2.3); ctx.lineTo(-side * r * 0.25, -r * 0.7); ctx.closePath(); outline(ctx, 4); }
  }
  if (glow > 0) { const g = ctx.createRadialGradient(0, 0, r * 0.6, 0, 0, r * 2.2); g.addColorStop(0, `rgba(255,198,41,${0.45 * glow})`); g.addColorStop(1, 'rgba(255,198,41,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r * 2.2, 0, TAU); ctx.fill(); }
  ctx.scale(Math.max(0.08, Math.abs(Math.cos(spin * Math.PI))), 1);
  const g = ctx.createLinearGradient(-r, -r, r, r); g.addColorStop(0, '#FFE58A'); g.addColorStop(0.5, C.gold); g.addColorStop(1, C.gold2);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fillStyle = g; ctx.fill(); outline(ctx, 5);
  ctx.beginPath(); ctx.arc(0, 0, r * 0.74, 0, TAU); ctx.strokeStyle = 'rgba(120,70,0,0.55)'; ctx.lineWidth = r * 0.06; ctx.stroke();
  ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * TAU / 10, rr = i % 2 ? r * 0.2 : r * 0.48; ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
  ctx.closePath(); ctx.fillStyle = '#FFF3C2'; ctx.fill(); ctx.strokeStyle = 'rgba(120,70,0,0.6)'; ctx.lineWidth = 3; ctx.stroke();
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.clip(); ctx.globalAlpha = 0.35; ctx.fillStyle = '#fff';
  ctx.rotate(-0.6); ctx.fillRect(-r * 1.2 + (spin * 3 % 1) * r * 2.4, -r * 1.5, r * 0.25, r * 3); ctx.restore();
  ctx.restore();
}

// ---------------------------------------------------------------- BOXER SILHOUETTE (no face; ink figure with a rim light)
function boxer(ctx, x, y, sc, pose = {}, { face = 1, rim = C.gold, body = C.ink, belt = true, alpha = 1, gloves = '#C8231B' } = {}) {
  const { punch = 0, raise = 0, lean = 0, bob = 0 } = pose;
  ctx.save(); ctx.translate(x, y + bob); ctx.scale(sc * face, sc); ctx.rotate(lean); ctx.globalAlpha *= alpha;
  const hip = [0, 0], neck = [8, -175], head = [16, -232];
  const shR = [30, -158], shL = [-22, -150];
  const elR = [lerp(lerp(70, 120, punch), 70, raise), lerp(lerp(-110, -168, punch), -250, raise)];
  const glR = [lerp(lerp(48, 235, punch), 60, raise), lerp(lerp(-200, -182, punch), -370, raise)];
  const elL = [-40, -95], glL = [lerp(-8, -20, raise), lerp(-205, -190, raise)];
  const legs = [[[0, 0], [-48, 95], [-70, 205]], [[0, 0], [45, 92], [72, 205]]];
  const paint = (col, extra) => {
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (const L of legs) { ctx.lineWidth = 46 + extra; ctx.beginPath(); ctx.moveTo(...L[0]); ctx.lineTo(...L[1]); ctx.lineTo(...L[2]); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(L[2][0] + 14, L[2][1] + 14, 34 + extra / 2, 16 + extra / 2, 0, 0, TAU); ctx.fill(); }
    ctx.beginPath(); ctx.moveTo(-58 - extra / 2, -30); ctx.lineTo(58 + extra / 2, -30); ctx.lineTo(70 + extra / 2, 55); ctx.lineTo(4, 40); ctx.lineTo(-66 - extra / 2, 55); ctx.closePath(); ctx.fill();
    ctx.lineWidth = 96 + extra; ctx.beginPath(); ctx.moveTo(...hip); ctx.lineTo(...neck); ctx.stroke();
    ctx.beginPath(); ctx.arc(...head, 44 + extra / 2, 0, TAU); ctx.fill();
    ctx.lineWidth = 34 + extra;
    ctx.beginPath(); ctx.moveTo(...shL); ctx.lineTo(...elL); ctx.lineTo(...glL); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(...shR); ctx.lineTo(...elR); ctx.lineTo(...glR); ctx.stroke();
    ctx.beginPath(); ctx.arc(...glL, 36 + extra / 2, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(...glR, 38 + extra / 2, 0, TAU); ctx.fill();
  };
  ctx.save(); ctx.translate(5, -4); paint(rim, 10); ctx.restore();
  paint(body, 0);
  ctx.save(); for (const [g, r] of [[glL, 36], [glR, 38]]) { const gg = ctx.createRadialGradient(g[0] - 10, g[1] - 12, 4, g[0], g[1], r);
    gg.addColorStop(0, '#FF6B5E'); gg.addColorStop(1, gloves); ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(g[0], g[1], r, 0, TAU); ctx.fill();
    ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fillRect(g[0] - r * 0.6, g[1] + r * 0.55, r * 1.2, r * 0.32); } ctx.restore();
  if (belt) { const cols = [C.azB, C.azR, C.azG]; for (let i = 0; i < 3; i++) { ctx.fillStyle = cols[i]; ctx.fillRect(-58, -34 + i * 9, 116, 9); } }
  ctx.restore();
}

// ---------------------------------------------------------------- boxing ring in perspective
function ringFloor(ctx, t, { y = 1010, k = 1, light = 1 } = {}) {
  const xl = -40, xr = W + 40, yt = y - 230 * k, inset = 170;
  ctx.save(); const g = ctx.createRadialGradient(cx, y - 300, 40, cx, y - 200, 700); g.addColorStop(0, `rgba(255,236,170,${0.28 * light})`); g.addColorStop(1, 'rgba(255,236,170,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx - 90, 0); ctx.lineTo(cx + 90, 0); ctx.lineTo(cx + 560, y + 40); ctx.lineTo(cx - 560, y + 40); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.beginPath(); ctx.moveTo(xl + inset, yt); ctx.lineTo(xr - inset, yt); ctx.lineTo(xr, y + 120); ctx.lineTo(xl, y + 120); ctx.closePath();
  const fg = ctx.createLinearGradient(0, yt, 0, y + 120); fg.addColorStop(0, '#26324F'); fg.addColorStop(1, '#3A4A72'); ctx.fillStyle = fg; ctx.fill();
  ctx.fillStyle = '#121A30'; ctx.fillRect(xl, y + 120, xr - xl, 70);
  const posts = [[xl + inset, yt], [xr - inset, yt]];
  ctx.strokeStyle = '#0A0F1C'; ctx.lineWidth = 16; for (const [px, py] of posts) { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py - 220); ctx.stroke(); }
  const rc = [C.azB, C.azR, C.azG];
  for (let i = 0; i < 3; i++) { ctx.strokeStyle = rc[i]; ctx.globalAlpha = 0.85; ctx.lineWidth = 7; ctx.beginPath();
    ctx.moveTo(posts[0][0], posts[0][1] - 70 - i * 65); ctx.lineTo(posts[1][0], posts[1][1] - 70 - i * 65); ctx.stroke(); ctx.globalAlpha = 1; }
}
function frontRopes(ctx, y = 1010) {
  const rc = [C.azB, C.azR, C.azG];
  for (let i = 0; i < 3; i++) { ctx.strokeStyle = rc[i]; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-40, y + 40 - i * 70); ctx.quadraticCurveTo(W / 2, y + 60 - i * 70, W + 40, y + 40 - i * 70); ctx.stroke(); }
}
function crowd(ctx, t, y0 = 520, seed = 1) {
  for (let r = 0; r < 4; r++) for (let i = 0; i < 26; i++) {
    const x = (i + (r % 2) * 0.5) * (W / 24) - 20, y = y0 + r * 46; ctx.fillStyle = `rgba(4,6,12,${0.55 + r * 0.1})`;
    ctx.beginPath(); ctx.arc(x, y, 22, 0, TAU); ctx.fill(); ctx.fillRect(x - 26, y + 12, 52, 60);
    const f = hash01(i * 7 + r, Math.floor(t * 6) + seed); if (f > 0.965) { ctx.fillStyle = 'rgba(255,255,240,0.9)'; ctx.beginPath(); ctx.arc(x + 6, y - 4, 9, 0, TAU); ctx.fill(); }
  }
}
function arena(ctx, t, seed = 0) {
  fill(ctx, C.bg);
  const g = ctx.createRadialGradient(cx, 560, 60, cx, 560, 1100); g.addColorStop(0, 'rgba(60,90,170,0.45)'); g.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 6; i++) { const x = 90 + i * 180; ctx.fillStyle = 'rgba(255,240,200,0.85)'; ctx.beginPath(); ctx.arc(x, 150, 14, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(255,240,200,0.06)'; ctx.beginPath(); ctx.moveTo(x - 14, 150); ctx.lineTo(x + 14, 150); ctx.lineTo(x + 160 - i * 30, 900); ctx.lineTo(x - 160 - i * 30 + 120, 900); ctx.closePath(); ctx.fill(); }
  crowd(ctx, t, 470, seed);
}
function dark(ctx, t, seed = 0) {
  fill(ctx, C.bg);
  const g = ctx.createRadialGradient(cx, H * 0.36, 80, cx, H * 0.36, H * 0.8); g.addColorStop(0, 'rgba(40,70,140,0.45)'); g.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = C.mute; const off = (t * 20 + seed * 30) % 60;
  for (let y = 30; y < H; y += 60) for (let x = -off; x < W; x += 60) { ctx.beginPath(); ctx.arc(x, y, 3, 0, TAU); ctx.fill(); }
}

// ---------------------------------------------------------------- SUBTITLE BAR (fixed, lower third, phrases)
function subtitles(ctx, t) {
  const y0 = 1252, y1 = 1442;
  ctx.save(); rrect(ctx, 36, y0, W - 72, y1 - y0, 26); ctx.fillStyle = 'rgba(6,9,16,0.82)'; ctx.fill();
  ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,198,41,0.55)'; ctx.stroke(); ctx.restore();
  const ch = TIMING.chunks.find((c) => t >= c.t0 && t < c.t1); if (!ch) return;
  const a = ch.t0 <= 0 ? 1 : clamp((t - ch.t0) / 0.08);
  const words = ch.text.split(' '); const maxW = W - 72 - 80;
  let size = 76, lines;
  for (;;) {
    ctx.font = font(size, 800, D); const sw = ctx.measureText(' ').width; lines = [[]]; let lw = 0;
    for (const w of words) { const ww = ctx.measureText(w).width;
      if (lines[lines.length - 1].length && lw + sw + ww > maxW) { lines.push([]); lw = 0; }
      lw += (lines[lines.length - 1].length ? sw : 0) + ww; lines[lines.length - 1].push(w); }
    if (lines.length <= 2 || size < 50) break; size -= 4;
  }
  ctx.save(); ctx.globalAlpha = a; ctx.font = font(size, 800, D); ctx.textAlign = 'left'; ctx.lineJoin = 'round';
  const sw = ctx.measureText(' ').width, lh = size * 1.18, yc = (y0 + y1) / 2 - ((lines.length - 1) * lh) / 2 + size * 0.36;
  lines.forEach((ln, li) => {
    const tw = ln.reduce((q, w) => q + ctx.measureText(w).width, 0) + sw * (ln.length - 1); let x = W / 2 - tw / 2;
    ln.forEach((w) => { ctx.lineWidth = size * 0.14; ctx.strokeStyle = C.ink; ctx.strokeText(w, x, yc + li * lh);
      ctx.fillStyle = ch.keys.includes(w) ? C.gold : C.white; ctx.fillText(w, x, yc + li * lh); x += ctx.measureText(w).width + sw; });
  });
  ctx.restore();
}

// ---------------------------------------------------------------- A: hook — "Üç il, üç Avropa qızılı!"
function sHook(ctx, t) {
  arena(ctx, t, 1);
  ringFloor(ctx, t, { y: 1060 });
  const pj = Math.max(0, Math.sin(clamp(prog(t, 0.15, 0.55)) * Math.PI), Math.sin(clamp(prog(t, 1.0, 1.4)) * Math.PI));
  boxer(ctx, cx + 260, 1110, 1.1, { punch: pj, bob: 6 * Math.sin(t * 7) }, { face: -1 });
  frontRopes(ctx, 1060);
  const kk = t < 0.25 ? lerp(1.1, 1, E.outBack(prog(t, 0, 0.25))) : 1 + 0.06 * Math.exp(-(t - T('qızılı!')) * 6) * (t > T('qızılı!'));
  ctx.save(); shake(ctx, B(t), B(T('qızılı!')), 14, 3, 0.2);
  ctx.save(); ctx.translate(cx, TOP + 95); ctx.rotate(-0.035); ctx.scale(kk, kk);
  rrect(ctx, -300, -100, 600, 128, 24); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 6);
  text(ctx, '3 İL', 0, 8, font(104, 800, D), C.ink, 'center'); ctx.restore();
  big(ctx, '3 AVROPA', cx, TOP + 265, 138, C.white, kk, { rot: -0.035, sw: 0.1 });
  big(ctx, 'QIZILI', cx, TOP + 400, 150, C.gold, kk, { rot: -0.035, sw: 0.09 });
  ctx.save(); ctx.translate(cx, TOP + 478); ctx.rotate(-0.035); ctx.scale(kk, kk); rrect(ctx, -380, -58, 760, 84, 18); ctx.fillStyle = 'rgba(7,10,18,0.88)'; ctx.fill(); outline(ctx, 4, C.gold); ctx.restore();
  big(ctx, 'BİLALHƏBAŞİ NƏZƏROV', cx, TOP + 500, 62, C.white, kk, { rot: -0.035, sw: 0.12 });
  ctx.restore();
  const ts = [0.05, T('üç') - 0.02, T('qızılı!') - 0.02];
  ts.forEach((ti, i) => { const k = pop(t, ti); if (k <= 0) return; const drop = (1 - Math.min(1, k)) * -260;
    medal(ctx, s.x + 100 + i * 165, 1030 + drop + (i === 1 ? -25 : 0), 70, Math.min(1.05, k), { spin: clamp((t - ti) / 0.5), glow: i === 2 ? clamp((t - ti) * 2) : 0.4 }); });
}

// ---------------------------------------------------------------- B: "On doqquz yaşlı boksçumuz Bilalhəbaşi Nəzərov yenə birincidir."
function sChamp(ctx, t) {
  const t0 = S.B; arena(ctx, t, 2);
  const push = 1 + 0.08 * E.inOutSine(prog(t, t0, S.C));
  ctx.save(); M.zoomAbout(ctx, push, cx, 900);
  ringFloor(ctx, t, { y: 1080 });
  const up = E.outBack(prog(t, T('birincidir.') + 0.2, T('birincidir.') + 0.65));
  boxer(ctx, cx - 10, 1050, 1.5, { punch: up > 0 ? 0 : 0.15 * Math.max(0, Math.sin(t * 5)), raise: up, bob: 5 * Math.sin(t * 6) * (1 - up) });
  frontRopes(ctx, 1080);
  ctx.restore();
  if (up > 0) for (let i = 0; i < 60; i++) { const q = (t - T('birincidir.') - 0.2) * (0.6 + hash01(i, 3)); if (q < 0) continue;
    const x = hash01(i, 4) * W + Math.sin(q * 3 + i) * 30, y = -40 + q * 520 + hash01(i, 5) * 200; if (y > BOT) continue;
    ctx.save(); ctx.translate(x, y); ctx.rotate(q * 6 + i); ctx.fillStyle = [C.azB, C.azR, C.azG, C.gold][i % 4]; ctx.fillRect(-9, -5, 18, 10); ctx.restore(); }
  const k19 = pop(t, T('On') + 0.02) * out(t, T('Bilalhəbaşi') - 0.12);
  if (k19 > 0) { big(ctx, '19', s.x + 170, TOP + 300, 260, C.gold, k19, { rot: -0.06, sw: 0.07 }); big(ctx, 'YAŞ', s.x + 170, TOP + 400, 90, C.white, k19, { rot: -0.06, sw: 0.12 }); }
  const kN = pop(t, T('Bilalhəbaşi') - 0.05);
  if (kN > 0) { ctx.save(); ctx.translate(cx, TOP + 150); ctx.rotate(-0.03); ctx.scale(Math.min(1.05, kN), Math.min(1.05, kN));
    ctx.font = font(74, 800, D); const nw = ctx.measureText('BİLALHƏBAŞİ NƏZƏROV').width + 80;
    rrect(ctx, -nw / 2, -80, nw, 170, 18); ctx.fillStyle = C.ink; ctx.fill(); outline(ctx, 5, C.gold);
    text(ctx, 'BİLALHƏBAŞİ NƏZƏROV', 0, -2, font(74, 800, D), C.white, 'center');
    azFlag(ctx, -205, 52, 66, 40); text(ctx, '50 kq · Azərbaycan', 25, 66, font(40, 700, UI), C.gold, 'center');
    ctx.restore(); }
}

// ---------------------------------------------------------------- C: map route Bakı -> Poreç, 276 boxers stream in, gold lands
function pin(ctx, x, y, k, col) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-46, -60, -46, -120, 0, -120); ctx.bezierCurveTo(46, -120, 46, -60, 0, 0); ctx.fillStyle = col; ctx.fill(); outline(ctx, 5);
  ctx.beginPath(); ctx.arc(0, -82, 16, 0, TAU); ctx.fillStyle = C.ink; ctx.fill(); ctx.restore();
}
function sMap(ctx, t) {
  const t0 = S.C; dark(ctx, t, 3);
  const P = [s.x + 190, 930], A = [s.x + s.w - 90, 1150];
  const pr = E.inOutCubic(prog(t, t0 + 0.05, T('Poreç') + 0.3));
  ctx.save(); ctx.setLineDash([22, 18]); ctx.lineDashOffset = -t * 60; ctx.strokeStyle = C.gold; ctx.lineWidth = 9; ctx.lineCap = 'round';
  ctx.beginPath(); const N = 50; for (let i = 0; i <= N * pr; i++) { const q = i / N; const x = lerp(A[0], P[0], q), y = lerp(A[1], P[1], q) - Math.sin(q * Math.PI) * 420; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
  ctx.stroke(); ctx.restore();
  if (pr > 0 && pr < 1) { const q = pr, x = lerp(A[0], P[0], q), y = lerp(A[1], P[1], q) - Math.sin(q * Math.PI) * 420;
    ctx.save(); ctx.translate(x, y); ctx.rotate(-q * 2); const gg = ctx.createRadialGradient(-12, -14, 4, 0, 0, 48); gg.addColorStop(0, '#FF6B5E'); gg.addColorStop(1, '#C8231B');
    ctx.beginPath(); ctx.arc(0, 0, 48, 0, TAU); ctx.fillStyle = gg; ctx.fill(); outline(ctx, 5); ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.fillRect(-30, 26, 60, 16); ctx.restore(); }
  pin(ctx, A[0], A[1] - 10, 1.3 * pop(t, t0 - 0.1), C.paper); azFlag(ctx, A[0], A[1] - 130 * Math.min(1, pop(t, t0 - 0.1)) - 70, 96, 60);
  pin(ctx, P[0], P[1], 1.5 * pop(t, T('Poreç') - 0.08), C.gold);
  const kc = prog(t, T('boksçular') - 0.1, T('arasında') + 0.4);
  if (kc > 0) for (let i = 0; i < 276; i++) { const a = hash01(i, 11) * TAU, d0 = 420 + hash01(i, 12) * 520;
    const q = E.outCubic(clamp(kc * 1.6 - hash01(i, 13) * 0.6));
    const x = P[0] + Math.cos(a) * d0 * (1 - q * 0.82), y = P[1] - 60 + Math.sin(a) * d0 * 0.7 * (1 - q * 0.82);
    if (y > BOT - 10 || y < TOP - 40) continue;
    ctx.fillStyle = i === 7 ? C.gold : 'rgba(245,241,230,0.75)'; ctx.beginPath(); ctx.arc(x, y, i === 7 ? 11 : 6, 0, TAU); ctx.fill(); }
  const kM = pop(t, T('qalib') + 0.05);
  if (kM > 0) medal(ctx, P[0] + 10, P[1] - 300 + (1 - Math.min(1, kM)) * -200, 84, Math.min(1.05, kM), { spin: clamp((t - T('qalib')) / 0.6), glow: 1 });
  const kL = pop(t, T('Poreç') + 0.05) * out(t, T('iyirmi') - 0.12);
  if (kL > 0) { ctx.save(); ctx.translate(cx + 120, TOP + 210); ctx.scale(Math.min(1.05, kL), Math.min(1.05, kL)); ctx.rotate(-0.03);
    rrect(ctx, -330, -95, 660, 190, 22); ctx.fillStyle = C.ink; ctx.fill(); outline(ctx, 5, C.gold);
    text(ctx, 'POREÇ', 0, 0, font(96, 800, D), C.gold, 'center'); text(ctx, 'Xorvatiya · 24 noyabr', 0, 62, font(44, 700, UI), C.white, 'center'); ctx.restore(); }
  ctx.save(); shake(ctx, B(t), B(T('yaşadək') - 0.1), 12, 3, 0.2);
  stamp(ctx, '23 YAŞADƏK', cx + 110, TOP + 210, 92, pop(t, T('yaşadək') - 0.12) * out(t, S.D - 0.1), { bg: C.paper, fg: C.ink, rot: -0.05 }); ctx.restore();
}

// ---------------------------------------------------------------- D: "Finalda 5 hakimin hamısı onu seçdi."
function card(ctx, x, y, k, flip) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(Math.min(1.05, k) * Math.max(0.06, Math.abs(Math.cos(flip * Math.PI))), Math.min(1.05, k));
  const w = 140, h = 180; rrect(ctx, -w / 2, -h / 2, w, h, 14);
  if (flip < 0.5) { ctx.fillStyle = C.paper; ctx.fill(); outline(ctx, 5); for (let i = 0; i < 4; i++) { ctx.fillStyle = 'rgba(7,10,18,0.25)'; ctx.fillRect(-46, -50 + i * 30, 92, 8); } }
  else { ctx.fillStyle = C.green; ctx.fill(); outline(ctx, 5); azFlag(ctx, 0, -48, 70, 42);
    ctx.strokeStyle = C.ink; ctx.lineWidth = 15; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-30, 28); ctx.lineTo(-8, 52); ctx.lineTo(34, 2); ctx.stroke(); }
  ctx.restore();
}
function sFinal(ctx, t) {
  const t0 = S.D; arena(ctx, t, 4);
  ringFloor(ctx, t, { y: 1090 });
  const pj = Math.max(0, Math.sin(clamp(prog(t, T('Finalda'), T('Finalda') + 0.35)) * Math.PI), Math.sin(clamp(prog(t, T('hakimin') - 0.1, T('hakimin') + 0.25)) * Math.PI));
  const hit = clamp(pj);
  boxer(ctx, cx + 230, 1095, 1.3, { lean: -0.12 * hit, bob: 4 * Math.sin(t * 5 + 1) }, { face: -1, belt: false, rim: '#8A93A8', body: '#1B2233', alpha: 0.95 });
  const up = E.outBack(prog(t, T('seçdi.') + 0.05, T('seçdi.') + 0.5));
  boxer(ctx, cx - 180, 1095, 1.35, { punch: up > 0 ? 0 : pj, raise: up, bob: 4 * Math.sin(t * 6) * (1 - up) });
  frontRopes(ctx, 1090);
  const tf = [T('beş') - 0.02, T('beş') + 0.2, T('hakimin') + 0.1, T('hamısı') + 0.03, T('onu') - 0.02];
  for (let i = 0; i < 5; i++) card(ctx, s.x + 90 + i * 170, TOP + 120, pop(t, t0 + 0.05 + i * 0.05), clamp((t - tf[i]) / 0.25));
  const kS = pop(t, T('seçdi.') - 0.04);
  ctx.save(); shake(ctx, B(t), B(T('seçdi.')), 14, 3, 0.25);
  if (kS > 0) { ctx.save(); ctx.translate(cx, TOP + 400); ctx.rotate(-0.04); ctx.scale(Math.min(1.08, kS), Math.min(1.08, kS));
    rrect(ctx, -250, -120, 500, 220, 30); ctx.fillStyle = C.ink; ctx.fill(); outline(ctx, 6, C.gold);
    text(ctx, '5 : 0', 0, 58, font(190, 800, D), C.gold, 'center'); ctx.restore(); }
  ctx.restore();
}

// ---------------------------------------------------------------- E: payoff — Poreç 2024 ... Poreç 2026
function skyline(ctx, t, yb) {
  ctx.fillStyle = '#1E2A4C';
  const hs = [[0, 90], [70, 120], [150, 80], [215, 140], [300, 100], [380, 130], [470, 95], [540, 150], [640, 110], [720, 125], [800, 90], [880, 135], [960, 100]];
  for (const [x, h] of hs) { ctx.fillRect(x, yb - h, 82, h); ctx.beginPath(); ctx.moveTo(x - 6, yb - h); ctx.lineTo(x + 41, yb - h - 34); ctx.lineTo(x + 88, yb - h); ctx.fill(); }
  ctx.fillRect(470, yb - 330, 70, 330); ctx.beginPath(); ctx.moveTo(462, yb - 330); ctx.lineTo(505, yb - 410); ctx.lineTo(548, yb - 330); ctx.fill();
  ctx.fillStyle = 'rgba(255,214,120,0.8)'; for (let i = 0; i < 3; i++) { ctx.fillRect(492, yb - 300 + i * 70, 26, 34); }
  ctx.fillStyle = '#10234A'; ctx.fillRect(0, yb, W, 140);
  ctx.strokeStyle = 'rgba(255,214,120,0.25)'; ctx.lineWidth = 4; for (let i = 0; i < 7; i++) { const y = yb + 18 + i * 18, o = Math.sin(t * 2 + i) * 30;
    ctx.beginPath(); ctx.moveTo(380 + o - i * 20, y); ctx.lineTo(640 + o + i * 20, y); ctx.stroke(); }
}
function sPayoff(ctx, t) {
  const t0 = S.E; fill(ctx, '#0E1630');
  const g = ctx.createLinearGradient(0, 0, 0, 1100); g.addColorStop(0, '#0B1430'); g.addColorStop(1, '#3B2B5E'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 1100);
  const pan = lerp(0, -40, E.inOutSine(prog(t, t0, S.F)));
  ctx.save(); ctx.translate(pan, 0); skyline(ctx, t, 1085); ctx.restore();
  const P1 = [s.x + 150, 860], P2 = [cx, 640], P3 = [s.x + s.w - 150, 860];
  const k1 = pop(t, T('ilk') - 0.02), k2 = pop(t, t0 + 0.1), k3 = pop(t, t0 + 0.2);
  ctx.save(); ctx.strokeStyle = 'rgba(245,241,230,0.35)'; ctx.lineWidth = 6; ctx.setLineDash([16, 14]);
  ctx.beginPath(); ctx.moveTo(...P1); ctx.quadraticCurveTo(P1[0] + 40, P2[1] - 40, P2[0], P2[1]); ctx.quadraticCurveTo(P3[0] - 40, P2[1] - 40, P3[0], P3[1]); ctx.stroke(); ctx.restore();
  const lp = E.inOutCubic(prog(t, T('elə') - 0.05, T('şəhərdə') + 0.2));
  if (lp > 0) { ctx.save(); ctx.strokeStyle = C.gold; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath();
    const N = 40; for (let i = 0; i <= N * lp; i++) { const q = i / N; const x = lerp(P3[0], P1[0], q), y = lerp(P3[1], P1[1], q) + Math.sin(q * Math.PI) * 150; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke();
    if (lp >= 1) { const x = P1[0] + 70, y = P1[1] + 40; ctx.fillStyle = C.gold; ctx.beginPath(); ctx.moveTo(x - 10, y + 30); ctx.lineTo(x - 40, y - 6); ctx.lineTo(x + 18, y - 4); ctx.closePath(); ctx.fill(); }
    ctx.restore(); }
  const glow1 = t > T('şəhərdə') ? 1 : 0.3;
  medal(ctx, ...P1, 100, Math.min(1.05, k1), { spin: clamp((t - T('ilk')) / 0.5), glow: glow1 });
  medal(ctx, ...P2, 76, Math.min(1.05, k2) * 0.9, { glow: 0 });
  medal(ctx, ...P3, 100, Math.min(1.05, k3), { glow: glow1 });
  const kQ = pop(t, T('maraqlısı:') + 0.05) * out(t, T('ilk') - 0.1);
  big(ctx, '?', cx, TOP + 200, 330, C.gold, kQ, { rot: 0.05, sw: 0.07 });
  const kY = pop(t, T('iki') - 0.05) * out(t, T('elə') - 0.1);
  if (kY > 0) { big(ctx, '2024', P1[0] + 70, P1[1] - 440, 150, C.white, kY, { rot: -0.04, sw: 0.08 }); big(ctx, 'POREÇ', P1[0] + 70, P1[1] - 370, 64, C.gold, kY, { rot: -0.04, sw: 0.14 }); }
  ctx.save(); shake(ctx, B(t), B(T('şəhərdə')), 14, 3, 0.25);
  stamp(ctx, 'YENƏ POREÇ!', cx, TOP + 150, 100, pop(t, T('şəhərdə') - 0.02), { bg: C.gold, fg: C.ink, rot: -0.05 }); ctx.restore();
}

// ---------------------------------------------------------------- F: end card
function sEnd(ctx, t) {
  const t0 = S.F; dark(ctx, t, 6);
  boxer(ctx, cx + 300, 525 + 8 * Math.sin(t * 4), 0.7, { raise: 0.85 + 0.15 * Math.sin(t * 5) }, {});
  for (let i = 0; i < 3; i++) { ctx.save(); ctx.translate(s.x + 90 + i * 135, 470 + (i === 1 ? -20 : 0)); ctx.rotate(0.12 * Math.sin(t * 2.4 + i * 1.3));
    medal(ctx, 0, 0, 50, pop(t, t0 - 0.05 + i * 0.08), { glow: 0.5, spin: (t > T('fakt!') + 0.4 && i === (Math.floor((t - T('fakt!')) * 1.5) % 3)) ? ((t - T('fakt!')) * 1.5) % 1 : 0 }); ctx.restore(); }
  text(ctx, '@bilirdinizmi_az', cx, TOP + 485, font(80, 800, D), C.white, 'center');
  const kB = pop(t, T('Bəyən') - 0.05), kI = pop(t, T('izlə') - 0.05);
  if (kB > 0) { ctx.save(); ctx.translate(cx - 215, TOP + 600); ctx.scale(kB, kB); ctx.rotate(-0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.paper; ctx.fill(); outline(ctx, 6);
    const hb = 1 + 0.12 * Math.max(0, Math.sin((t - T('Bəyən')) * 9)) * Math.exp(-(t - T('Bəyən')) * 2);
    ctx.save(); ctx.translate(-110, 4); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30);
    ctx.fillStyle = '#E8384F'; ctx.fill(); ctx.restore();
    text(ctx, 'BƏYƏN', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  if (kI > 0) { ctx.save(); ctx.translate(cx + 215, TOP + 600); ctx.scale(kI, kI); ctx.rotate(0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 6);
    ctx.save(); ctx.translate(-115, 4); ctx.lineWidth = 12; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'İZLƏ', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  const kS = pop(t, T('hər') - 0.05);
  if (kS > 0) { ctx.save(); ctx.translate(cx, TOP + 830); ctx.scale(Math.min(1.05, kS), Math.min(1.05, kS));
    rrect(ctx, -400, -95, 800, 190, 34); ctx.fillStyle = C.paper; ctx.fill(); outline(ctx, 5);
    ctx.save(); ctx.translate(-310, 0); ctx.rotate(0.15 * Math.sin((t - T('hər')) * 8) * Math.exp(-Math.max(0, t - T('fakt!') - 0.4) * 1.5) * (t > T('fakt!') + 0.4 ? 1 : 0)); envelope(ctx, 0, 0, 90); ctx.restore(); text(ctx, 'Boksu sevən', 50, -12, font(52, 800, UI), C.ink, 'center'); text(ctx, 'dostuna göndər', 50, 52, font(52, 800, UI), C.ink, 'center'); ctx.restore(); }
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 700, UI)],
  images: {},
  hits: HITS,
  draw(ctx, u, t) {
    const seq = [[0, sHook], [S.B, sChamp], [S.C, sMap], [S.D, sFinal], [S.E, sPayoff], [S.F, sEnd]];
    let j = 1; while (j < seq.length && t >= seq[j][0] + 0.2) j++;
    if (j >= seq.length) sEnd(ctx, t);
    else whip(ctx, t, seq[j][0], () => seq[j - 1][1](ctx, t), () => seq[j][1](ctx, t), 0.3);
    subtitles(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 160; i++) { ctx.fillStyle = `rgba(240,240,230,${0.015 + 0.025 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
