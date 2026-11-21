// "İki ildə 36 pillə" — @bilirdinizmi_az 18:30 animated TREND reel, 21 Nov 2026. Pure function of time.
// UN E-Government Survey 2026 (EGDI, 194 countries): Azerbaijan 74th (2024) -> 38th (2026), +36; Online Services Index
// 67th -> 11th; overall above China (41st); Nov 2025 target "top 40 in five years" reached in one year
// (trend.az, apa.az, koreatimes, xinhua, un.org). Arif voice (ElevenLabs) on audio/vo.wav; every word/number timed to
// Scribe word starts remapped onto silencedetect phrases. World: cream ranking paper. No logos, no people. No music.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = {"dur": 27.2, "lines": [{"t0": 0.0, "words": [{"w": "2", "t": 0.0, "key": false}, {"w": "ildə", "t": 0.24, "key": false}, {"w": "36", "t": 0.72, "key": true}, {"w": "pillə!", "t": 1.28, "key": true}], "t1": 2.18}, {"t0": 2.18, "words": [{"w": "BMT", "t": 2.18, "key": true}, {"w": "194", "t": 2.698, "key": true}, {"w": "ölkənin", "t": 3.587, "key": false}, {"w": "elektron", "t": 4.105, "key": true}, {"w": "hökumət", "t": 4.475, "key": true}, {"w": "siyahısını", "t": 4.845, "key": false}, {"w": "açıqladı.", "t": 5.253, "key": false}], "t1": 6.22}, {"t0": 6.22, "words": [{"w": "Azərbaycan", "t": 6.22, "key": true}, {"w": "2", "t": 7.017, "key": false}, {"w": "il", "t": 7.176, "key": false}, {"w": "əvvəl", "t": 7.336, "key": false}, {"w": "74-cü", "t": 7.655, "key": true}, {"w": "idi.", "t": 8.571, "key": false}], "t1": 9.27}, {"t0": 9.27, "words": [{"w": "İndi", "t": 9.27, "key": false}, {"w": "38-cidir.", "t": 9.64, "key": true}], "t1": 10.91}, {"t0": 10.91, "words": [{"w": "Ən", "t": 10.91, "key": false}, {"w": "böyük", "t": 11.11, "key": false}, {"w": "sıçrayış", "t": 11.35, "key": true}, {"w": "onlayn", "t": 11.99, "key": true}, {"w": "dövlət", "t": 12.31, "key": false}, {"w": "xidmətlərindədir:", "t": 12.71, "key": false}], "t1": 14.04}, {"t0": 14.04, "words": [{"w": "67-cidən", "t": 14.04, "key": true}, {"w": "11-ci", "t": 14.98, "key": true}, {"w": "yerə.", "t": 15.45, "key": false}], "t1": 16.32}, {"t0": 16.32, "words": [{"w": "Azərbaycan", "t": 16.32, "key": true}, {"w": "Çindən", "t": 16.91, "key": true}, {"w": "yuxarıdadır.", "t": 17.271, "key": true}], "t1": 18.6}, {"t0": 18.6, "words": [{"w": "Ən", "t": 18.6, "key": false}, {"w": "maraqlısı:", "t": 18.748, "key": false}], "t1": 19.67}, {"t0": 19.67, "words": [{"w": "keçən", "t": 19.67, "key": false}, {"w": "il", "t": 19.954, "key": false}, {"w": "hədəf", "t": 20.061, "key": true}, {"w": "5", "t": 20.523, "key": true}, {"w": "ilə", "t": 20.736, "key": false}, {"w": "ilk", "t": 21.021, "key": false}, {"w": "40-a", "t": 21.234, "key": true}, {"w": "girmək", "t": 21.518, "key": false}, {"w": "idi.", "t": 21.909, "key": false}], "t1": 22.69}, {"t0": 22.69, "words": [{"w": "1", "t": 22.69, "key": true}, {"w": "ilə", "t": 22.794, "key": false}, {"w": "alındı.", "t": 22.923, "key": true}], "t1": 24.05}, {"t0": 24.05, "words": [{"w": "Bəyən", "t": 24.05, "key": true}, {"w": "və", "t": 24.56, "key": false}, {"w": "izlə", "t": 24.73, "key": true}, {"w": "hər", "t": 25.432, "key": false}, {"w": "gün", "t": 25.642, "key": false}, {"w": "bilmədiyin", "t": 25.893, "key": false}, {"w": "bir", "t": 26.334, "key": false}, {"w": "fakt!", "t": 26.46, "key": true}], "t1": 27.2}]};
const C = {
  paper: '#F3E7CD', paper2: '#E8D8B4', ink: '#1C1A22', red: '#DA251D', star: '#FFDE00', gold: '#FFCD00', teal: '#178A86',
  chalk: '#FFFDF6', green: '#2FB866', grey: '#B9AE98', mute: '#7D7262', sil: '#141219', blue: '#1E5BB8', panel: '#1C1A22',
  azb: '#00B5E2', azr: '#EF3340', azg: '#509E2F',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));

const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const END = TIMING.dur + 1.3;
const S = { A: 0, B: T('BMT') - 0.12, C: T('Azərbaycan') - 0.12, E: T('Ən') - 0.12, F: T('Azərbaycan', 1) - 0.12,
  G: T('Ən', 1) - 0.12, I: T('Bəyən') - 0.12 };
const B = (t) => t / 0.5;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.3, from, to }];

const STOPS = [['+36', 0.1], ['38-Cİ', T('38-cidir.')], ['11-Cİ', T('11-ci')], ['ÇİN', T('Çindən')], ['HƏDƏF', T('hədəf')]];

const HITS = [
  [B(0.02), '+36', 'thud'], [B(T('36')), 'climb', 'whoosh', { len: 0.5, from: 400, to: 1600 }], [B(T('pillə!')), 'PİLLƏ', 'click'],
  WH(S.B, 600, 2200), [B(T('BMT')), 'BMT', 'thud'], [B(T('194')), '194', 'click'], [B(T('elektron')), 'E-HÖKUMƏT', 'tick'],
  [B(T('açıqladı.')), 'list stops', 'tick'],
  WH(S.C, 2200, 600), [B(T('Azərbaycan')), 'flag', 'click'], [B(T('74-cü')), '74', 'thud'], [B(T('İndi')), '2026', 'tick'],
  [B(T('38-cidir.') - 0.05), 'climb', 'whoosh', { len: 0.6, from: 400, to: 1800 }], [B(T('38-cidir.') + 0.55), '38', 'thud'],
  WH(S.E, 600, 2200), [B(T('sıçrayış')), 'stamp', 'thud'], [B(T('onlayn')), 'phone', 'click'], [B(T('dövlət')), 'tiles', 'tick'],
  [B(T('xidmətlərindədir:')), 'tiles', 'tick'], [B(T('67-cidən')), '67', 'click'], [B(T('11-ci') - 0.05), 'roll', 'whoosh', { len: 0.5, from: 500, to: 1700 }],
  [B(T('11-ci') + 0.45), '11', 'thud'],
  WH(S.F, 2200, 600), [B(T('Azərbaycan', 1)), 'AZ row', 'click'], [B(T('Çindən')), 'CN row', 'click'], [B(T('yuxarıdadır.')), 'swap', 'whoosh', { len: 0.4, from: 500, to: 1500 }],
  [B(T('yuxarıdadır.') + 0.35), 'land', 'thud'],
  WH(S.G, 600, 2200), [B(T('hədəf')), 'target', 'thud'], [B(T('5')), '5 İL', 'click'], [B(T('40-a')), 'İLK 40', 'tick'],
  [B(T('1')), 'X', 'click'], [B(T('alındı.') - 0.25), 'arrow', 'whoosh', { len: 0.35, from: 800, to: 2400 }], [B(T('alındı.') + 0.05), 'bullseye', 'thud'],
  WH(S.I, 600, 2200), [B(T('Bəyən')), 'BƏYƏN', 'click'], [B(T('izlə')), 'İZLƏ', 'thud'], [B(T('fakt!') + 0.3), 'send line', 'tick'],
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
function chip(ctx, label, x, y, size, k, { bg = C.gold, fg = C.ink, rot = -0.04, edge = C.ink, fam = UI, wt = 800 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, fam); const w = ctx.measureText(label).width + size * 1.0, h = size * 1.55;
  rrect(ctx, -w / 2, -h / 2, w, h, h * 0.3); ctx.fillStyle = bg; ctx.fill(); outline(ctx, 5, edge);
  text(ctx, label, 0, size * 0.36, font(size, wt, fam), fg, 'center'); ctx.restore();
}
function stamp(ctx, label, x, y, size, k, { bg = C.gold, fg = C.ink, rot = -0.07, edge = C.ink } = {}) {
  if (k <= 0) return; const q = Math.min(1, k), sc = lerp(1.8, 1, q) * (k > 1 ? k : 1);
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc);
  ctx.font = font(size, 800, D); const w = ctx.measureText(label).width + size * 1.1, h = size * 1.6;
  rrect(ctx, -w / 2, -h / 2, w, h, size * 0.25); ctx.fillStyle = bg; ctx.fill(); outline(ctx, 7, edge);
  text(ctx, label, 0, size * 0.36, font(size, 800, D), fg, 'center'); ctx.restore();
}
function whip(ctx, t, t0, a, b, dur = 0.3) {
  const p = E.inOutCubic(prog(t, t0 - dur * 0.55, t0 + dur * 0.45));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(-p * W, 0); a(); ctx.restore(); ctx.save(); ctx.translate((1 - p) * W, 0); b(); ctx.restore();
}
function flagAZ(ctx, x, y, w, k, wave = 0) {
  if (k <= 0) return; const h = w / 2;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(wave);
  ctx.save(); rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.clip();
  ctx.fillStyle = '#00B5E2'; ctx.fillRect(-w / 2, -h / 2, w, h / 3); ctx.fillStyle = '#EF3340'; ctx.fillRect(-w / 2, -h / 6, w, h / 3);
  ctx.fillStyle = '#509E2F'; ctx.fillRect(-w / 2, h / 6, w, h / 3);
  const r = h * 0.12; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-r * 0.25, 0, r, 0, TAU); ctx.fill();
  ctx.fillStyle = '#EF3340'; ctx.beginPath(); ctx.arc(r * 0.05, 0, r * 0.8, 0, TAU); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath();
  for (let i = 0; i < 16; i++) { const a = (i / 16) * TAU, rr = i % 2 ? r * 0.28 : r * 0.62; ctx.lineTo(r * 1.15 + Math.cos(a) * rr, Math.sin(a) * rr); }
  ctx.closePath(); ctx.fill(); ctx.restore();
  rrect(ctx, -w / 2, -h / 2, w, h, 6); outline(ctx, 5); ctx.restore();
}

function envelope(ctx, x, y, w) {
  const h = w * 0.68; ctx.save(); ctx.translate(x, y);
  rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 4);
  ctx.beginPath(); ctx.moveTo(-w / 2 + 3, -h / 2 + 3); ctx.lineTo(0, h * 0.08); ctx.lineTo(w / 2 - 3, -h / 2 + 3); outline(ctx, 4); ctx.restore();
}

// ---------------------------------------------------------------- captions (word by word, top)
function captions(ctx, t) {
  const L = TIMING.lines; const li = L.findIndex((l, i) => t >= l.t0 - 0.05 && t < (L[i + 1] ? L[i + 1].t0 - 0.05 : END)); if (li < 0) return;
  const all = L[li].words.filter((w) => w.w !== '—'), ws = all.filter((w) => t >= w.t - 0.03); if (!ws.length) return;
  let size = 100; const gap = 34;
  const wOf = (arr, sz) => { ctx.font = font(sz, 800, D); return arr.reduce((a, w) => a + ctx.measureText(w.w).width, 0) + gap * (arr.length - 1); };
  let n = 3; for (let i = 0; i < all.length; i += 3) if (wOf(all.slice(i, i + 3), 84) > s.w - 30) n = 2;
  const start = Math.floor((ws.length - 1) / n) * n, chunk = all.slice(start, start + n), shown = ws.slice(start);
  const meas = (sz) => { ctx.font = font(sz, 800, D); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 30) { size = Math.floor(size * (s.w - 30) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 100;
  shown.forEach((w, i) => { const k = sp(t, w.t - 0.03, SPRING.bouncy), sc = Math.min(1.1, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.2; ctx.strokeStyle = C.ink; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.gold : '#FFFFFF'; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}



// ---------------------------------------------------------------- world: cream map paper
function world(ctx, t, { tint = 0, zoom = 1 } = {}) {
  fill(ctx, C.paper);
  ctx.save(); M.zoomAbout(ctx, zoom, W / 2, H / 2);
  ctx.strokeStyle = 'rgba(125,114,98,0.18)'; ctx.lineWidth = 3;
  const drift = (t * 18) % 120;
  for (let i = -2; i < 20; i++) { const y = i * 120 + drift; ctx.beginPath(); ctx.moveTo(-50, y); ctx.quadraticCurveTo(W / 2, y - 60, W + 50, y); ctx.stroke(); }
  for (let i = -1; i < 12; i++) { const x = i * 120 + drift * 0.5; ctx.beginPath(); ctx.moveTo(x, -50); ctx.quadraticCurveTo(x + 50, H / 2, x, H + 50); ctx.stroke(); }
  // a few soft land blobs
  ctx.fillStyle = `rgba(214,195,152,${0.45 + 0.2 * tint})`;
  for (let i = 0; i < 5; i++) { const x = hash01(i, 11) * W, y = hash01(i, 12) * H, r = 120 + 140 * hash01(i, 13);
    ctx.beginPath(); for (let j = 0; j < 14; j++) { const a = j / 14 * TAU, rr = r * (0.75 + 0.35 * hash01(i * 20 + j, 14)); ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr * 0.7); } ctx.closePath(); ctx.fill(); }
  ctx.restore();
}

// ---------------------------------------------------------------- persistent progress strip
function bug(ctx, t) {
  const k = clamp(prog(t, 0.2, 0.55)); if (k <= 0) return;
  const y = s.y + s.h - 30, x0 = cx - 420, w = 840;
  ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 60);
  rrect(ctx, x0, y - 42, w, 84, 16); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 4, C.red);
  const xs = [x0 + 85, x0 + 250, x0 + 420, x0 + 590, x0 + 755];
  let last = -1; STOPS.forEach(([, ft], i) => { if (t >= ft) last = i; });
  STOPS.forEach(([lab, ft], i) => {
    const on = t >= ft, bmp = on ? 1 + 0.4 * Math.exp(-(t - ft) * 7) : 1;
    ctx.save(); ctx.translate(xs[i], y); ctx.scale(bmp, bmp);
    text(ctx, lab, 0, 13, font(34, 800, D), i === last ? C.gold : on ? C.chalk : 'rgba(255,253,246,0.3)', 'center'); ctx.restore();
    if (i < 4) { ctx.beginPath(); ctx.arc((xs[i] + xs[i + 1]) / 2, y, 5, 0, TAU); ctx.fillStyle = 'rgba(255,253,246,0.45)'; ctx.fill(); }
  });
  ctx.restore();
}
function starPath(ctx, x, y, r) {
  ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.4 : r; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } ctx.closePath();
}
function pin(ctx, x, y, k, col, label, sc = 1) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k * sc, k * sc);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-46, -50, -46, -110, 0, -110); ctx.bezierCurveTo(46, -110, 46, -50, 0, 0); ctx.fillStyle = col; ctx.fill(); outline(ctx, 6);
  ctx.beginPath(); ctx.arc(0, -72, 15, 0, TAU); ctx.fillStyle = C.chalk; ctx.fill();
  if (label) { ctx.font = font(46, 800, D); const w = ctx.measureText(label).width + 40;
    rrect(ctx, -w / 2, 18, w, 66, 12); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 5); text(ctx, label, 0, 66, font(46, 800, D), C.ink, 'center'); }
  ctx.restore();
}
function calendar(ctx, x, y, w, k, label, big, col = C.red) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(-0.03);
  const h = w * 0.8;
  rrect(ctx, -w / 2, -h / 2, w, h, 24); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 7);
  ctx.save(); rrect(ctx, -w / 2, -h / 2, w, h, 24); ctx.clip(); ctx.fillStyle = col; ctx.fillRect(-w / 2, -h / 2, w, h * 0.28); ctx.restore();
  for (const dx of [-w * 0.27, w * 0.27]) { rrect(ctx, dx - 12, -h / 2 - 26, 24, 56, 9); ctx.fillStyle = C.ink; ctx.fill(); }
  text(ctx, label, 0, -h / 2 + h * 0.19, font(w * 0.1, 800, UI), C.chalk, 'center');
  text(ctx, big, 0, h * 0.3, font(w * 0.3, 800, D), C.ink, 'center');
  ctx.restore();
}
function plate(ctx, label, x, y, k, col, size = 42) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.font = font(size, 800, D); const w = ctx.measureText(label).width + 50;
  rrect(ctx, -w / 2, -size * 0.9, w, size * 1.8, 12); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 5, col);
  text(ctx, label, 0, size * 0.36, font(size, 800, D), C.chalk, 'center'); ctx.restore();
}

// ---------------------------------------------------------------- props
function flagCN(ctx, x, y, w, k, wave = 0) {
  if (k <= 0) return; const h = w * 2 / 3;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(wave);
  rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.fillStyle = '#DE2910'; ctx.fill();
  starPath(ctx, -w * 0.33, -h * 0.22, h * 0.16); ctx.fillStyle = C.star; ctx.fill();
  [[-0.17, -0.38], [-0.1, -0.27], [-0.1, -0.13], [-0.17, -0.03]].forEach(([a, b]) => { starPath(ctx, a * w, b * h, h * 0.055); ctx.fill(); });
  rrect(ctx, -w / 2, -h / 2, w, h, 6); outline(ctx, 5); ctx.restore();
}
function rankCard(ctx, label, x, y, w, k, { bg = C.chalk, fg = C.ink, rot = 0, sub = '' } = {}) {
  if (k <= 0) return; const h = w * 0.62;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  rrect(ctx, -w / 2 + 10, -h / 2 + 12, w, h, h * 0.2); ctx.fillStyle = 'rgba(28,26,34,0.85)'; ctx.fill();
  rrect(ctx, -w / 2, -h / 2, w, h, h * 0.2); ctx.fillStyle = bg; ctx.fill(); outline(ctx, 7);
  text(ctx, label, 0, sub ? h * 0.12 : h * 0.22, font(h * (sub ? 0.5 : 0.62), 800, D), fg, 'center');
  if (sub) text(ctx, sub, 0, h * 0.38, font(h * 0.16, 800, UI), fg, 'center');
  ctx.restore();
}
function globe(ctx, x, y, r, k, t) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fillStyle = '#5BB6E8'; ctx.fill();
  ctx.save(); ctx.clip();
  ctx.fillStyle = '#6FBF73';
  for (let i = 0; i < 4; i++) { const ph = ((t * 0.35 + i * 0.27) % 1.2) - 0.1, gx = lerp(-r * 1.3, r * 1.3, ph), gy = (hash01(i, 3) - 0.5) * r * 1.1;
    ctx.beginPath(); ctx.ellipse(gx, gy, r * (0.25 + 0.2 * hash01(i, 4)), r * (0.18 + 0.2 * hash01(i, 5)), hash01(i, 6), 0, TAU); ctx.fill(); }
  ctx.strokeStyle = 'rgba(28,26,34,0.35)'; ctx.lineWidth = 4;
  for (let i = 0; i < 4; i++) { const ph = ((t * 0.35 + i / 4) % 1); const ew = Math.abs(Math.cos(ph * Math.PI)) * r;
    ctx.beginPath(); ctx.ellipse(0, 0, ew, r, 0, 0, TAU); ctx.stroke(); }
  for (const yy of [-0.5, 0, 0.5]) { ctx.beginPath(); ctx.ellipse(0, yy * r, r * Math.sqrt(1 - yy * yy), r * 0.12, 0, 0, TAU); ctx.stroke(); }
  ctx.restore();
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); outline(ctx, 7); ctx.restore();
}
function flagPole(ctx, x, y, w, k, t) {     // AZ flag on a short pole, base at (x,y)
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -w * 1.05); ctx.stroke();
  flagAZ(ctx, w * 0.5, -w * 0.8, w, 1, 0.04 * Math.sin(t * 5)); ctx.restore();
}
function phone(ctx, x, y, w, k, t) {
  if (k <= 0) return; const h = w * 1.95;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(-0.05);
  rrect(ctx, -w / 2 + 12, -h / 2 + 14, w, h, w * 0.16); ctx.fillStyle = 'rgba(28,26,34,0.85)'; ctx.fill();
  rrect(ctx, -w / 2, -h / 2, w, h, w * 0.16); ctx.fillStyle = C.sil; ctx.fill(); outline(ctx, 6);
  rrect(ctx, -w / 2 + 18, -h / 2 + 18, w - 36, h - 36, w * 0.11); ctx.fillStyle = C.chalk; ctx.fill();
  rrect(ctx, -w * 0.14, -h / 2 + 26, w * 0.28, 22, 11); ctx.fillStyle = C.sil; ctx.fill();
  ctx.restore();
}
function tile(ctx, x, y, sz, k, col, kind) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  rrect(ctx, -sz / 2, -sz / 2, sz, sz, sz * 0.24); ctx.fillStyle = col; ctx.fill(); outline(ctx, 4);
  ctx.strokeStyle = C.chalk; ctx.fillStyle = C.chalk; ctx.lineWidth = sz * 0.08; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const q = sz * 0.22;
  if (kind === 0) { rrect(ctx, -q, -q * 1.2, q * 2, q * 2.4, 4); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-q * 0.5, -q * 0.4); ctx.lineTo(q * 0.5, -q * 0.4); ctx.moveTo(-q * 0.5, q * 0.2); ctx.lineTo(q * 0.5, q * 0.2); ctx.stroke(); }
  else if (kind === 1) { ctx.beginPath(); ctx.moveTo(-q, 0); ctx.lineTo(-q * 0.2, q * 0.8); ctx.lineTo(q * 1.1, -q * 0.8); ctx.stroke(); }
  else if (kind === 2) { ctx.beginPath(); ctx.arc(0, -q * 0.5, q * 0.55, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.arc(0, q * 1.2, q * 1.1, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); }
  else if (kind === 3) { rrect(ctx, -q * 1.2, -q * 0.7, q * 2.4, q * 1.5, 4); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-q * 1.2, -q * 0.15); ctx.lineTo(q * 1.2, -q * 0.15); ctx.stroke(); }
  else { ctx.beginPath(); ctx.moveTo(-q * 1.1, q); ctx.lineTo(-q * 1.1, -q * 0.2); ctx.lineTo(0, -q); ctx.lineTo(q * 1.1, -q * 0.2); ctx.lineTo(q * 1.1, q); ctx.closePath(); ctx.stroke(); }
  ctx.restore();
}
function upArrow(ctx, x, y0, y1, wdt, k, col = C.gold) {   // grows from y0 (bottom) to y1 (top)
  if (k <= 0) return; const yt = lerp(y0, y1, Math.min(1, k));
  ctx.save(); ctx.beginPath();
  ctx.moveTo(x - wdt * 0.28, y0); ctx.lineTo(x - wdt * 0.28, yt + wdt * 0.6); ctx.lineTo(x - wdt * 0.6, yt + wdt * 0.6); ctx.lineTo(x, yt);
  ctx.lineTo(x + wdt * 0.6, yt + wdt * 0.6); ctx.lineTo(x + wdt * 0.28, yt + wdt * 0.6); ctx.lineTo(x + wdt * 0.28, y0); ctx.closePath();
  ctx.fillStyle = col; ctx.fill(); outline(ctx, 6); ctx.restore();
}
function rollNum(t, a, b, t0, t1) { return Math.round(lerp(a, b, E.inOutCubic(prog(t, t0, t1)))); }

// ---------------------------------------------------------------- A: hook "+36 pillə" — the flag climbs a staircase
function sHook(ctx, t) {
  world(ctx, t, { zoom: Math.exp(0.04 * t) });
  const N = 8, x0 = s.x + 30, y0 = s.y + 1110, x1 = s.x + s.w - 30, y1 = s.y + 560, sw = (x1 - x0) / N, sh = (y0 - y1) / N;
  for (let i = 0; i < N; i++) { const k = lerp(0.55, 1, clamp(E.outBack(prog(t, 0.03 * i, 0.03 * i + 0.3)))); if (k <= 0) continue;
    const top = y0 - (i + 1) * sh * k;
    ctx.beginPath(); ctx.rect(x0 + i * sw, top, sw + 1, y0 + 60 - top); ctx.fillStyle = i % 2 ? C.paper2 : '#DCC89D'; ctx.fill(); outline(ctx, 5);
  }
  text(ctx, '74', x0 + sw / 2, y0 - sh + 70, font(50, 800, D), C.mute, 'center');
  text(ctx, '38', x1 - sw / 2, y1 + 70, font(50, 800, D), C.ink, 'center');
  const p = E.inOutCubic(prog(t, 0.55, 1.75)), fi = Math.min(N - 1, Math.floor(p * N)), hopP = (p * N) % 1;
  const fx = x0 + (fi + 0.5) * sw + (p >= 1 ? 0 : hopP * sw), fy = y0 - (fi + 1) * sh - Math.sin(Math.min(1, hopP) * Math.PI) * 50 * (p < 1);
  flagPole(ctx, fx - 20, fy, 130, pop(t, 0.1), t);
  const rank = rollNum(t, 74, 38, 0.55, 1.75);
  chip(ctx, `${rank}-${rank === 38 ? 'Cİ' : 'YER'}`.replace('-YER', ''), fx - 40, fy - 215, 58, pop(t, 0.12), { bg: rank === 38 ? C.green : C.chalk, rot: -0.04 });
  const kk = t < 0.3 ? lerp(1.15, 1, E.outBack(prog(t, 0, 0.3))) : 1 + 0.08 * Math.exp(-(t - T('36')) * 5) * (t > T('36'));
  ctx.save(); shake(ctx, B(t), B(0.02), 12, 3, 0.2);
  big(ctx, '+36', cx - 50, s.y + 410, 300, C.gold, kk, { rot: -0.04 }); ctx.restore();
  stamp(ctx, 'PİLLƏ', cx + 270, s.y + 360, 62, pop(t, T('pillə!') - 0.05), { bg: C.red, fg: C.chalk, rot: 0.08 });
  chip(ctx, '2 İLDƏ', s.x + 160, s.y + 560, 48, pop(t, T('ildə') - 0.05), { bg: C.chalk, rot: -0.05 });
}

// ---------------------------------------------------------------- B: UN list of 194 countries scrolls
function sList(ctx, t) {
  world(ctx, t, { zoom: Math.exp(0.03 * (t - S.B)), tint: 1 });
  globe(ctx, cx - 170, s.y + 340, 120, pop(t, S.B + 0.05), t);
  stamp(ctx, 'BMT', cx - 170, s.y + 340, 72, pop(t, T('BMT') - 0.03), { bg: C.chalk, rot: -0.08 });
  const n194 = rollNum(t, 1, 194, T('194') - 0.1, T('ölkənin') + 0.3);
  if (t > T('194') - 0.1) chip(ctx, `${n194} ÖLKƏ`, cx + 230, s.y + 330, 60, pop(t, T('194') - 0.1), { bg: C.gold, rot: 0.04 });
  // the board
  const bx = s.x + 50, by = s.y + 560, bw = s.w - 100, bh = 540, kb = sp(t, S.B + 0.1);
  if (kb > 0) { ctx.save(); ctx.translate(0, (1 - kb) * 500);
    rrect(ctx, bx + 10, by + 12, bw, bh, 26); ctx.fillStyle = 'rgba(28,26,34,0.85)'; ctx.fill();
    rrect(ctx, bx, by, bw, bh, 26); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 7);
    ctx.save(); rrect(ctx, bx, by, bw, bh, 26); ctx.clip();
    const rh = 78, scroll = 193 * rh * E.inOutCubic(prog(t, T('194') - 0.1, T('açıqladı.') + 0.2)) - (bh - rh * 1.2) * E.inOutCubic(prog(t, T('194'), T('açıqladı.') + 0.2));
    const first = Math.max(0, Math.floor(scroll / rh) - 1);
    for (let i = first; i < Math.min(194, first + 10); i++) { const y = by + 20 + i * rh - scroll;
      text(ctx, `${i + 1}`, bx + 90, y + 50, font(44, 800, D), C.ink, 'right');
      rrect(ctx, bx + 120, y + 16, 62, 42, 6); ctx.fillStyle = ['#C9BDA4', '#D8CBAE', '#BBAE95'][i % 3]; ctx.fill();
      rrect(ctx, bx + 205, y + 24, (bw - 260) * (0.35 + 0.6 * hash01(i, 7)), 26, 13); ctx.fillStyle = C.paper2; ctx.fill();
      ctx.fillStyle = 'rgba(28,26,34,0.12)'; ctx.fillRect(bx + 20, y + rh - 4, bw - 40, 3); }
    ctx.restore(); ctx.restore(); }
  chip(ctx, 'ELEKTRON HÖKUMƏT', cx, s.y + 525, 52, pop(t, T('elektron') - 0.05), { bg: C.red, fg: C.chalk, rot: -0.02 });
  stamp(ctx, '2026', s.x + s.w - 130, s.y + 1060, 56, pop(t, T('açıqladı.') + 0.05), { bg: C.gold, rot: -0.1 });
}

// ---------------------------------------------------------------- C/D: ranking scale — 74 (2024) → 38 (2026)
const yR = (r) => s.y + 300 + (r - 1) / 79 * 760;
function sLadder(ctx, t) {
  world(ctx, t, { zoom: Math.exp(0.025 * (t - S.C)) });
  const sx = s.x + 110, ks = clamp(prog(t, S.C, S.C + 0.35));
  ctx.save(); ctx.lineWidth = 12; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(sx, yR(1)); ctx.lineTo(sx, lerp(yR(1), yR(80), ks)); ctx.stroke(); ctx.restore();
  for (const r of [1, 10, 20, 30, 40, 50, 60, 70, 80]) { if (yR(r) > lerp(yR(1), yR(80), ks)) continue;
    ctx.fillStyle = C.ink; ctx.fillRect(sx - 22, yR(r) - 3, 44, 6); text(ctx, `${r}`, sx - 36, yR(r) + 15, font(40, 800, UI), r === 40 ? C.red : C.mute, 'right'); }
  // "top 40" line, seeded for the payoff
  const kl = clamp(prog(t, S.C + 0.3, S.C + 0.8));
  if (kl > 0) { ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 7; ctx.setLineDash([26, 16]); ctx.lineDashOffset = -t * 50;
    ctx.beginPath(); ctx.moveTo(sx, yR(40)); ctx.lineTo(lerp(sx, s.x + s.w - 20, kl), yR(40)); ctx.stroke(); ctx.restore();
    chip(ctx, 'İLK 40', s.x + s.w - 100, yR(40) + 95, 40, pop(t, S.C + 0.6), { bg: C.red, fg: C.chalk, rot: 0.03 }); }
  // the climb
  const tc0 = T('38-cidir.') - 0.12, tc1 = tc0 + 0.75;
  const rank = rollNum(t, 74, 38, tc0, tc1), y = yR(lerp(74, 38, E.inOutCubic(prog(t, tc0, tc1))));
  const climbed = t >= tc1;
  if (t > tc0) { ctx.save(); ctx.fillStyle = C.gold; ctx.globalAlpha = 0.9; rrect(ctx, sx - 16, y, 32, yR(74) - y, 16); ctx.fill(); outline(ctx, 4); ctx.restore(); }
  ctx.save(); shake(ctx, B(t), B(tc1), 10, 5, 0.2);
  const kf = pop(t, T('Azərbaycan') - 0.05);
  if (kf > 0) { ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(sx + 20, y); ctx.lineTo(s.x + 220, y); ctx.stroke(); ctx.restore();
    ctx.beginPath(); ctx.arc(sx, y, 20 * Math.min(1, kf), 0, TAU); ctx.fillStyle = climbed ? C.green : C.gold; ctx.fill(); outline(ctx, 5); }
  flagAZ(ctx, s.x + 330, y, 200, kf, 0.04 * Math.sin(t * 5));
  rankCard(ctx, `${rank}`, s.x + 590, y, 260, pop(t, T('74-cü') - 0.05), { bg: climbed ? C.green : t > tc0 ? C.gold : C.chalk, rot: -0.03, sub: 'YER' });
  ctx.restore();
  if (climbed) big(ctx, '+36', s.x + 300, lerp(yR(74), yR(38), 0.5) + 60, 120, C.gold, pop(t, tc1), { rot: -0.06 });
  const yr = t < T('İndi') - 0.05 ? '2024' : '2026';
  calendar(ctx, s.x + s.w - 140, s.y + 330, 210, pop(t, T('2', 1) - 0.1) * (t < T('İndi') - 0.05 ? 1 : 1 + 0.12 * Math.exp(-(t - T('İndi')) * 6)), 'İL', yr, t < T('İndi') - 0.05 ? C.mute : C.teal);
  if (t < tc0) chip(ctx, '2 İL ƏVVƏL', s.x + s.w - 150, s.y + 495, 38, pop(t, T('əvvəl') - 0.05), { bg: C.chalk, rot: 0.03 });
  else stamp(ctx, 'İNDİ', s.x + s.w - 150, s.y + 495, 46, pop(t, T('İndi') - 0.05), { bg: C.gold, rot: 0.05 });
}

// ---------------------------------------------------------------- E: online public services 67 → 11
function sOnline(ctx, t) {
  world(ctx, t, { zoom: Math.exp(0.03 * (t - S.E)) });
  stamp(ctx, 'ƏN BÖYÜK SIÇRAYIŞ', cx, s.y + 275, 58, pop(t, T('sıçrayış') - 0.05), { bg: C.gold, rot: -0.04 });
  chip(ctx, 'ONLAYN DÖVLƏT XİDMƏTLƏRİ', cx, s.y + 410, 44, pop(t, T('onlayn') - 0.05), { bg: C.red, fg: C.chalk, rot: 0.02 });
  const px = s.x + 240, py = s.y + 790, pw = 370;
  phone(ctx, px, py, pw, sp(t, S.E + 0.05), t);
  const cols = [C.teal, C.red, C.blue, C.green, '#E58A1F', '#8A4FBF'];
  for (let i = 0; i < 12; i++) { const r = Math.floor(i / 3), c = i % 3;
    const tt = i < 4 ? T('onlayn') + i * 0.07 : i < 8 ? T('dövlət') + (i - 4) * 0.07 : T('xidmətlərindədir:') + (i - 8) * 0.07;
    ctx.save(); ctx.translate(px, py); ctx.rotate(-0.05);
    tile(ctx, (c - 1) * 104, -240 + r * 130, 90, pop(t, tt), cols[i % 6], i % 5); ctx.restore(); }
  // rank counter 67 -> 11
  const t0 = T('11-ci') - 0.12, t1 = t0 + 0.6, k = pop(t, T('67-cidən') - 0.08);
  const rank = rollNum(t, 67, 11, t0, t1), done = t >= t1;
  upArrow(ctx, s.x + s.w - 300, s.y + 1110, s.y + 560, 120, E.outCubic(prog(t, t0, t1)));
  ctx.save(); shake(ctx, B(t), B(t1), 12, 8, 0.2);
  rankCard(ctx, `${rank}`, s.x + s.w - 200, lerp(s.y + 980, s.y + 700, E.inOutCubic(prog(t, t0, t1))), 300, k,
    { bg: done ? C.green : t > t0 ? C.gold : C.chalk, rot: 0.03, sub: 'YER' });
  ctx.restore();
  chip(ctx, '+56 PİLLƏ', s.x + s.w - 200, s.y + 965, 46, pop(t, t1 + 0.15), { bg: C.gold, rot: -0.04 });
}

// ---------------------------------------------------------------- F: above China (overall ranking)
function sChina(ctx, t) {
  world(ctx, t, { zoom: Math.exp(0.025 * (t - S.F)) });
  chip(ctx, 'ÜMUMİ REYTİNQ · 2026', cx, s.y + 280, 46, pop(t, S.F + 0.05), { bg: C.chalk, rot: -0.02 });
  const rows = [[38, 'AZƏRBAYCAN', 'az', T('Azərbaycan', 1) - 0.08], [39, '', '', S.F + 0.15], [40, '', '', S.F + 0.2], [41, 'ÇİN', 'cn', T('Çindən') - 0.08]];
  const x0 = s.x + 30, wd = s.w - 200, rh = 140, ty = T('yuxarıdadır.');
  rows.forEach(([r, name, fl, t0], i) => {
    const k = sp(t, t0), y = s.y + 420 + i * (rh + 26); if (k <= 0) return;
    const bump = fl === 'az' ? 1 + 0.06 * Math.exp(-(t - ty - 0.3) * 5) * (t > ty + 0.3) : 1;
    ctx.save(); ctx.translate(x0 + wd / 2 - (1 - k) * 900, y + rh / 2); ctx.scale(bump, bump);
    rrect(ctx, -wd / 2 + 8, -rh / 2 + 10, wd, rh, 24); ctx.fillStyle = 'rgba(28,26,34,0.8)'; ctx.fill();
    rrect(ctx, -wd / 2, -rh / 2, wd, rh, 24); ctx.fillStyle = fl === 'az' ? C.gold : fl === 'cn' ? C.chalk : C.paper2; ctx.fill(); outline(ctx, 6);
    text(ctx, `${r}`, -wd / 2 + 90, 30, font(78, 800, D), fl ? C.ink : C.mute, 'center');
    if (fl === 'az') flagAZ(ctx, -wd / 2 + 225, 0, 110, 1, 0.03 * Math.sin(t * 5));
    if (fl === 'cn') flagCN(ctx, -wd / 2 + 225, 0, 110, 1, 0.03 * Math.sin(t * 5 + 1));
    if (name) text(ctx, name, -wd / 2 + 300, 22, font(name.length > 5 ? 50 : 72, 800, D), C.ink, 'left');
    else { rrect(ctx, -wd / 2 + 190, -18, wd * 0.55, 36, 18); ctx.fillStyle = 'rgba(125,114,98,0.35)'; ctx.fill(); }
    ctx.restore(); });
  const ka = E.outCubic(prog(t, ty - 0.05, ty + 0.4));
  upArrow(ctx, s.x + s.w - 70, s.y + 420 + 3 * (rh + 26) + rh / 2, s.y + 420 + rh / 2 - 20, 100, ka);
  chip(ctx, '3 PİLLƏ YUXARI', cx, s.y + 1090, 50, pop(t, ty + 0.3), { bg: C.green, fg: C.ink, rot: 0.03 });
}

// ---------------------------------------------------------------- G: the target — "top 40 in 5 years", done in 1
function sTarget(ctx, t) {
  world(ctx, t, { zoom: Math.exp(0.03 * (t - S.G)) });
  const tx = cx + 40, ty = s.y + 630, R = 220;
  const hit = T('alındı.') + 0.05, wob = t > hit ? 0.06 * Math.sin((t - hit) * 22) * Math.exp(-(t - hit) * 4) : 0;
  const kt = Math.min(1.05, sp(t, S.G + 0.02, SPRING.bouncy));
  if (kt > 0) { ctx.save(); ctx.translate(tx, ty); ctx.rotate(wob); ctx.scale(kt, kt);
    ctx.beginPath(); ctx.ellipse(18, 22, R, R, 0, 0, TAU); ctx.fillStyle = 'rgba(28,26,34,0.85)'; ctx.fill();
    for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(0, 0, R * (1 - i * 0.2), 0, TAU); ctx.fillStyle = i % 2 ? C.chalk : C.red; ctx.fill(); outline(ctx, 5); }
    ctx.beginPath(); ctx.arc(0, 0, R * 0.2, 0, TAU); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 5);
    ctx.restore(); }
  if (t < hit) big(ctx, '?', tx, ty + 60, 200, C.chalk, pop(t, S.G + 0.15) * (t < T('hədəf') ? 1 : 0), { sw: 0.1 });
  plate(ctx, 'İLK 40', tx, ty + R + 8, pop(t, T('40-a') - 0.06), C.gold, 62);
  chip(ctx, 'HƏDƏF · 2025', cx - 140, s.y + 280, 54, pop(t, T('hədəf') - 0.05), { bg: C.gold, rot: -0.03 });
  // plan: 5 years
  const k5 = pop(t, T('5') - 0.06);
  calendar(ctx, s.x + 170, s.y + 1035, 220, k5, 'PLAN', '5 İL', C.mute);
  const kx = clamp(prog(t, T('1') - 0.08, T('1') + 0.12));
  if (kx > 0) { ctx.save(); ctx.translate(s.x + 170, s.y + 1035); ctx.strokeStyle = C.red; ctx.lineWidth = 22; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-90, -80); ctx.lineTo(lerp(-90, 90, kx), lerp(-80, 100, kx)); ctx.stroke();
    if (kx > 0.5) { const k2 = (kx - 0.5) * 2; ctx.beginPath(); ctx.moveTo(90, -80); ctx.lineTo(lerp(90, -90, k2), lerp(-80, 100, k2)); ctx.stroke(); } ctx.restore(); }
  calendar(ctx, s.x + s.w - 170, s.y + 1035, 220, pop(t, T('1') + 0.02), 'FAKT', '1 İL', C.green);
  // the arrow flies into the bullseye
  const fa = prog(t, hit - 0.3, hit);
  if (fa > 0) { const ax = fa < 1 ? lerp(s.x - 300, tx, E.inCubic(fa)) : tx, ay = fa < 1 ? lerp(ty - 260, ty, E.inCubic(fa)) : ty;
    ctx.save(); ctx.translate(ax, ay); ctx.rotate(Math.atan2(260, tx - s.x + 300) + wob);
    ctx.lineWidth = 12; ctx.strokeStyle = C.ink; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(-300, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-40, -22); ctx.lineTo(-40, 22); ctx.closePath(); ctx.fillStyle = C.ink; ctx.fill();
    for (const sg of [-1, 1]) { ctx.beginPath(); ctx.moveTo(-250, 0); ctx.lineTo(-300, sg * 34); ctx.lineTo(-320, sg * 34); ctx.lineTo(-280, 0); ctx.closePath(); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 4); }
    ctx.restore(); }
  if (t > hit) stamp(ctx, 'ALINDI!', tx + 170, ty - 210, 66, pop(t, hit), { bg: C.green, rot: 0.08 });
}

// ---------------------------------------------------------------- I: end card
function sEnd(ctx, t) {
  world(ctx, t, { zoom: Math.exp(0.02 * (t - S.I)) });
  const t0 = S.I;
  flagAZ(ctx, cx - 210, s.y + 400, 230, pop(t, t0 - 0.1), 0.05 * Math.sin(t * 4));
  rankCard(ctx, '38', cx + 190, s.y + 400, 270, pop(t, t0), { bg: C.green, rot: 0.04, sub: 'YER · 2026' });
  big(ctx, '+36', cx + 330, s.y + 290, 90, C.gold, pop(t, t0 + 0.15), { rot: 0.1 });
  text(ctx, '@bilirdinizmi_az', cx, s.y + 690, font(76, 800, D), C.ink, 'center');
  const kB = pop(t, T('Bəyən') - 0.05), kI = pop(t, T('izlə') - 0.05);
  if (kB > 0) { ctx.save(); ctx.translate(cx - 215, s.y + 860); ctx.scale(kB, kB); ctx.rotate(-0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 6);
    const hb = 1 + 0.12 * Math.max(0, Math.sin((t - T('Bəyən')) * 9)) * Math.exp(-(t - T('Bəyən')) * 2);
    ctx.save(); ctx.translate(-110, 4); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30);
    ctx.fillStyle = '#E8384F'; ctx.fill(); ctx.restore();
    text(ctx, 'BƏYƏN', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  if (kI > 0) { ctx.save(); ctx.translate(cx + 215, s.y + 860); ctx.scale(kI, kI); ctx.rotate(0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 6);
    ctx.save(); ctx.translate(-115, 4); ctx.lineWidth = 12; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'İZLƏ', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  chip(ctx, 'hər gün bilmədiyin bir fakt', cx, s.y + 1030, 46, pop(t, T('hər') - 0.05), { bg: C.panel, fg: C.chalk, edge: C.red, rot: -0.02 });
  const kS = pop(t, T('fakt!') + 0.25);
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 1160); ctx.scale(kS, kS);
    const msg = 'Bunu bilməyən dostuna göndər';
    ctx.font = font(42, 800, UI); const w = ctx.measureText(msg).width + 150;
    rrect(ctx, -w / 2, -46, w, 92, 30); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 5);
    envelope(ctx, -w / 2 + 62, 0, 62); text(ctx, msg, 38, 15, font(42, 800, UI), C.ink, 'center'); ctx.restore(); }
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 700, UI), font(40, 600, UI)],
  hits: HITS,
  draw(ctx, u, t) {
    const seq = [[0, sHook], [S.B, sList], [S.C, sLadder], [S.E, sOnline], [S.F, sChina], [S.G, sTarget], [S.I, sEnd]];
    let j = 1; while (j < seq.length && t >= seq[j][0] + 0.2) j++;
    if (j >= seq.length) sEnd(ctx, t);
    else whip(ctx, t, seq[j][0], () => seq[j - 1][1](ctx, t), () => seq[j][1](ctx, t), j === seq.length - 1 ? 0.36 : 0.3);
    if (t < S.I - 0.2) bug(ctx, t);
    captions(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 220; i++) { ctx.fillStyle = `rgba(60,40,20,${0.03 + 0.03 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
