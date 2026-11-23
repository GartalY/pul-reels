// "9 yaşlı Sabah 127 yaşlı nəhəngə qarşı" — @bilirdinizmi_az 18:30 animated reel, 23 Nov 2026 (Monday DATA + PHOTO STORY).
// Sabah FK (founded 2017) v FC Barcelona (founded 29 Nov 1899): UCL league phase MD5, Wed 25 Nov 2026 21:45, Baku Olympic
// Stadium. Barça arrive in Baku 23 Nov. Sabah qualifiers: TNS 4–1, KuPS 3–0, Aarhus 5–2, Hapoel Be'er Sheva 6–4 (8 games, 18 goals).
// After 4 games: Sabah 3 pts, Barça 9. Barça turn 127 on 29 Nov, 4 days after the match. Sources: facts/2026-11-23.json.
// Real photos (Wikimedia Commons, credited in the caption). No logos (club names as plain text). Arif voice. No music.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = __TIMING__;
const C = {
  night: '#0B1426', night2: '#14213A', chalk: '#F4F1E8', ink: '#0D1220', gold: '#FFCD00', red: '#E5372B', green: '#2FB866',
  mute: 'rgba(244,241,232,0.10)', paper: '#F6F0E1', panel: '#0E1830', blue: '#1E5BC6', claret: '#A50044', pitch: '#1F7A45',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));

const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const END = TIMING.dur + 1.4;
const S = { A: 0, B: T('Barselona') - 0.12, C: T('Çərşənbə') - 0.12, D: T('Sabah', 1) - 0.12, E: T('4') - 0.12, F: T('Sabahın') - 0.12,
  G: T('Ən') - 0.12, H: T('Bəyən') - 0.12 };
const B = (t) => t / 0.5;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.3, from, to }];
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
function envelope(ctx, x, y, w) {
  const h = w * 0.68; ctx.save(); ctx.translate(x, y);
  rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 4);
  ctx.beginPath(); ctx.moveTo(-w / 2 + 3, -h / 2 + 3); ctx.lineTo(0, h * 0.08); ctx.lineTo(w / 2 - 3, -h / 2 + 3); outline(ctx, 4); ctx.restore();
}
function rollNum(t, a, b, t0, t1, ease = E.inOutCubic) { return Math.round(lerp(a, b, ease(prog(t, t0, t1)))); }
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

// a real photo in a white print frame, slow push-in, name plate on the photo
function photo(ctx, img, x, y, w, h, k, t, t0, { rot = 0, crop = null, zoom0 = 1.0, zoom1 = 1.12, dur = 6, fx = 0.5, fy = 0.4, name = '', sub = '', nameK = 1 } = {}) {
  if (k <= 0 || !img) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  const pad = 16;
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18;
  rrect(ctx, -w / 2 - pad, -h / 2 - pad, w + pad * 2, h + pad * 2, 10); ctx.fillStyle = C.paper; ctx.fill(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.clip();
  const z = zoom0 * (zoom1 / zoom0) ** clamp((t - t0) / dur);
  const [sx, sy, sw, sh] = crop || [0, 0, img.width, img.height];
  const sc = Math.max(w / sw, h / sh) * z, dw = sw * sc, dh = sh * sc;
  ctx.drawImage(img, sx, sy, sw, sh, -w / 2 + (w - dw) * fx, -h / 2 + (h - dh) * fy, dw, dh);
  ctx.restore();
  if (name && nameK > 0) {
    ctx.save(); ctx.translate(0, h / 2 - 20); ctx.scale(nameK, nameK);
    ctx.font = font(52, 800, D); const nw = Math.max(ctx.measureText(name).width, sub ? (ctx.font = font(34, 700, UI), ctx.measureText(sub).width) : 0) + 60;
    const nh = sub ? 128 : 86;
    rrect(ctx, -nw / 2, -nh + 20, nw, nh, 14); ctx.fillStyle = C.ink; ctx.fill(); outline(ctx, 4, C.gold);
    text(ctx, name, 0, sub ? -50 : -5, font(52, 800, D), C.chalk, 'center');
    if (sub) text(ctx, sub, 0, 2, font(34, 700, UI), C.gold, 'center');
    ctx.restore();
  }
  ctx.restore();
}

// ---------------------------------------------------------------- captions (word by word, top)
function captions(ctx, t) {
  const L = TIMING.lines; const li = L.findIndex((l, i) => t >= l.t0 - 0.05 && t < (L[i + 1] ? L[i + 1].t0 - 0.05 : END)); if (li < 0) return;
  const all = L[li].words, ws = all.filter((w) => t >= w.t - 0.03); if (!ws.length) return;
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


const STOPS = [['9 : 127', 0.1], ['BAKI', T('Bakıya')], ['2017', T('2017-də')], ['18 QOL', T('18')], ['XAL', T('Sabahın')], ['127', T('127', 1)]];

const HITS = [
  [B(0.02), '9', 'thud'], [B(T('Sabah') - 0.05), 'sabah photo', 'click'], [B(T('127') - 0.03), '127', 'thud'], [B(T('nəhəngə')), 'barca photo', 'click'],
  [B(T('qarşı!')), 'vs', 'impact'],
  WH(S.B, 600, 2200), [B(T('Barselona') + 0.1), 'plane', 'whoosh', { len: 1.1, from: 300, to: 1500 }], [B(T('Bakıya')), 'baku pin', 'thud'],
  [B(T('Bakıya') + 0.25), 'flick', 'click'],
  WH(S.C, 2200, 600), [B(T('Çərşənbə') + 0.05), 'calendar', 'thud'], [B(T('Sabahla')), 'stadium name', 'click'], [B(T('oynayacaq.')), 'time', 'tick'],
  WH(S.D, 600, 2200), [B(T('Sabah', 1)), 'timeline', 'tick'], [B(T('2017-də') - 0.05), 'roll', 'whoosh', { len: 0.7, from: 400, to: 1600 }],
  [B(T('2017-də') + 0.6), '2017', 'thud'],
  WH(S.E, 2200, 600), [B(T('təsnifat')), 'r1', 'tick'], [B(T('təsnifat') + 0.3), 'r2', 'tick'], [B(T('mərhələsini') + 0.1), 'r3', 'tick'],
  [B(T('keçdi:')), 'r4', 'thud'], [B(T('8')), 'games', 'click'], [B(T('18') - 0.05), 'goals', 'whoosh', { len: 0.8, from: 300, to: 1400 }],
  [B(T('qol!')), '18', 'thud'],
  WH(S.F, 600, 2200), [B(T('3,') - 0.05), 'bar 3', 'click'], [B(T('9', 1) - 0.05), 'bar 9', 'whoosh', { len: 0.6, from: 400, to: 1500 }],
  [B(T('var.')), 'gap', 'tick'],
  WH(S.G, 2200, 600), [B(T('maraqlısı:')), 'cal', 'tick'], [B(T('4', 1)), 'days', 'tick'], [B(T('gün', 0) + 0.0), 'flip', 'tick'],
  [B(T('127', 1) - 0.05), '127', 'thud'], [B(T('yaşını')), 'cake', 'click'],
  WH(S.H, 2200, 600), [B(T('Bəyən')), 'BƏYƏN', 'click'], [B(T('izlə')), 'İZLƏ', 'thud'], [B(T('fakt!') + 0.3), 'send line', 'tick'],
];

// ---------------------------------------------------------------- world: night stadium, pitch lines, sweeping floodlights
function world(ctx, t, { zoom = 1, seed = 0 } = {}) {
  fill(ctx, C.night);
  ctx.save(); M.zoomAbout(ctx, zoom, W / 2, H / 2);
  // pitch at the bottom, in perspective
  const g = ctx.createLinearGradient(0, H * 0.62, 0, H); g.addColorStop(0, '#0E3A24'); g.addColorStop(1, '#16603A');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-200, H); ctx.lineTo(W + 200, H); ctx.lineTo(W * 0.82, H * 0.64); ctx.lineTo(W * 0.18, H * 0.64); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.16)'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(W * 0.5, H * 0.64); ctx.lineTo(W * 0.5, H); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(W / 2, H * 0.8, 260, 80, 0, 0, TAU); ctx.stroke();
  // crowd dots (stands)
  for (let i = 0; i < 160; i++) { const j = i + seed * 31, x = hash01(j, 3) * W, y = H * 0.5 + hash01(j, 4) * H * 0.13;
    const tw = 0.25 + 0.25 * Math.sin(t * (2 + 3 * hash01(j, 5)) + j);
    ctx.fillStyle = `rgba(255,255,255,${0.05 + 0.1 * tw})`; ctx.fillRect(x, y, 4, 4); }
  // two floodlight beams sweeping slowly
  for (let k = 0; k < 2; k++) { const ox = k ? W + 60 : -60, a = (k ? Math.PI * 0.72 : Math.PI * 0.28) + 0.12 * Math.sin(t * 0.7 + k * 2 + seed);
    ctx.save(); ctx.translate(ox, H * 0.1); ctx.rotate(a);
    const lg = ctx.createLinearGradient(0, 0, 1600, 0); lg.addColorStop(0, 'rgba(255,240,200,0.20)'); lg.addColorStop(1, 'rgba(255,240,200,0)');
    ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(1600, -260); ctx.lineTo(1600, 260); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.restore();
  const v = ctx.createRadialGradient(W / 2, H * 0.45, 200, W / 2, H * 0.45, H * 0.8);
  v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.55)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
}

// ---------------------------------------------------------------- persistent progress strip
function bug(ctx, t) {
  const k = clamp(prog(t, 0.2, 0.55)); if (k <= 0) return;
  const y = s.y + s.h - 30, x0 = cx - 440, w = 880;
  ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 60);
  rrect(ctx, x0, y - 42, w, 84, 16); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 4, C.gold);
  const n = STOPS.length, xs = STOPS.map((_, i) => x0 + 75 + i * (w - 150) / (n - 1));
  let last = -1; STOPS.forEach(([, ft], i) => { if (t >= ft) last = i; });
  STOPS.forEach(([lab, ft], i) => {
    const on = t >= ft, bmp = on ? 1 + 0.4 * Math.exp(-(t - ft) * 7) : 1;
    ctx.save(); ctx.translate(xs[i], y); ctx.scale(bmp, bmp);
    text(ctx, lab, 0, 11, font(29, 800, D), i === last ? C.gold : on ? C.chalk : 'rgba(244,241,232,0.3)', 'center'); ctx.restore();
    if (i < n - 1) { ctx.beginPath(); ctx.arc((xs[i] + xs[i + 1]) / 2, y, 5, 0, TAU); ctx.fillStyle = 'rgba(244,241,232,0.45)'; ctx.fill(); }
  });
  ctx.restore();
}

// ---------------------------------------------------------------- A: hook  9 vs 127
function sHook(ctx, t, IMG) {
  world(ctx, t, { zoom: Math.exp(0.03 * t) });
  // photos: Sabah (left) and Camp Nou (right)
  photo(ctx, IMG.sabah1, cx - 215, s.y + 870, 400, 520, pop(t, T('Sabah') - 0.08), t, T('Sabah'),
    { rot: -0.05, zoom1: 1.15, dur: 4, fy: 0.3, name: 'SABAH', sub: '2017-ci ildən', nameK: pop(t, T('Sabah') + 0.1) });
  photo(ctx, IMG.campnou, cx + 215, s.y + 900, 400, 520, pop(t, T('nəhəngə') - 0.1), t, T('nəhəngə'),
    { rot: 0.05, zoom1: 1.18, dur: 3, fx: 0.5, fy: 0.5, name: 'BARSELONA', sub: '1899-cu ildən', nameK: pop(t, T('nəhəngə') + 0.1) });
  // the hook numbers, big on frame 0
  const k9 = t < 0.3 ? lerp(1.2, 1, E.outBack(prog(t, 0, 0.3))) : 1;
  ctx.save(); shake(ctx, B(t), B(0.02), 12, 3, 0.2);
  big(ctx, '9', cx - 215, s.y + 440, 300, C.gold, k9, { rot: -0.05 });
  text(ctx, 'YAŞLI SABAH', cx - 215, s.y + 520, font(52, 800, D), C.chalk, 'center');
  ctx.restore();
  const k127 = t < 0.3 ? k9 : 1;
  const hit = 1 + 0.12 * Math.exp(-(t - T('127')) * 6) * (t > T('127'));
  big(ctx, '127', cx + 215, s.y + 440, 230, '#FF4F8B', k127 * hit, { rot: 0.04 });
  text(ctx, 'YAŞLI NƏHƏNG', cx + 215, s.y + 520, font(52, 800, D), C.chalk, 'center');
  big(ctx, 'VS', cx, s.y + 690, 110, C.chalk, t < 0.3 ? k9 : 1 + 0.25 * Math.exp(-(t - T('qarşı!')) * 6) * (t > T('qarşı!')), { stroke: C.red, sw: 0.14 });
}

// ---------------------------------------------------------------- B: Barcelona flies to Baku today (map route) + Flick
function sFly(ctx, t, IMG) {
  const t0 = S.B;
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 1 });
  // a simple map card: two pins and a dashed arc
  const mx = cx, my = s.y + 470, mw = 820, mh = 400;
  const kM = pop(t, t0 - 0.2);
  if (kM > 0) {
    ctx.save(); ctx.translate(mx, my); ctx.scale(kM, kM);
    rrect(ctx, -mw / 2, -mh / 2, mw, mh, 26); ctx.fillStyle = '#12284A'; ctx.fill(); outline(ctx, 6, C.chalk);
    // coast blobs (stylised Mediterranean / Black Sea / Caspian)
    ctx.fillStyle = 'rgba(255,255,255,0.07)';
    for (let i = 0; i < 26; i++) { ctx.beginPath(); ctx.arc(-mw / 2 + 40 + hash01(i, 7) * (mw - 80), -mh / 2 + 40 + hash01(i, 8) * (mh - 80), 30 + 40 * hash01(i, 9), 0, TAU); ctx.fill(); }
    const A = [-300, 90], Z = [300, -40];
    const p = E.inOutCubic(prog(t, T('Barselona') + 0.1, T('Bakıya') + 0.05));
    ctx.strokeStyle = C.gold; ctx.lineWidth = 7; ctx.setLineDash([22, 14]); ctx.lineDashOffset = -t * 60;
    ctx.beginPath(); const N = 40; for (let i = 0; i <= N * p; i++) { const q = i / N, x = lerp(A[0], Z[0], q), y = lerp(A[1], Z[1], q) - Math.sin(q * Math.PI) * 150;
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.setLineDash([]);
    const pin = (x, y, lab, k, col) => { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
      ctx.beginPath(); ctx.arc(0, 0, 18, 0, TAU); ctx.fillStyle = col; ctx.fill(); outline(ctx, 5, C.ink);
      text(ctx, lab, 0, 62, font(44, 800, D), C.chalk, 'center'); ctx.restore(); };
    pin(A[0], A[1], 'BARSELONA', 1, '#FF4F8B'); pin(Z[0], Z[1], 'BAKI', pop(t, T('Bakıya') - 0.05), C.gold);
    // plane
    const q = p, px = lerp(A[0], Z[0], q), py = lerp(A[1], Z[1], q) - Math.sin(q * Math.PI) * 150;
    const ang = Math.atan2((lerp(A[1], Z[1], q + 0.01) - Math.sin((q + 0.01) * Math.PI) * 150) - py, (lerp(A[0], Z[0], q + 0.01)) - px);
    if (p < 1) { ctx.save(); ctx.translate(px, py); ctx.rotate(ang); ctx.fillStyle = C.chalk;
      ctx.beginPath(); ctx.moveTo(40, 0); ctx.lineTo(-30, -10); ctx.lineTo(-30, 10); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(5, 0); ctx.lineTo(-15, -38); ctx.lineTo(-25, -38); ctx.lineTo(-12, 0); ctx.lineTo(-25, 38); ctx.lineTo(-15, 38); ctx.closePath(); ctx.fill();
      ctx.restore(); }
    ctx.restore();
  }
  stamp(ctx, 'BU GÜN', cx - 260, s.y + 270, 54, pop(t, T('bu') - 0.05), { bg: C.gold, rot: -0.06 });
  // Flick photo
  photo(ctx, IMG.flick, cx + 170, s.y + 900, 420, 400, pop(t, T('Bakıya') + 0.2), t, T('Bakıya'),
    { rot: 0.03, zoom1: 1.12, dur: 2.5, fx: 0.5, fy: 0.3, name: 'HANSİ FLİK', sub: 'Barselonanın baş məşqçisi', nameK: pop(t, T('gəlir.') - 0.05) });
}

// ---------------------------------------------------------------- C: Wednesday, 21:45, Baku Olympic Stadium
function sStadium(ctx, t, IMG) {
  const t0 = S.C;
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 2 });
  photo(ctx, IMG.olympic, cx, s.y + 760, 820, 560, pop(t, t0 - 0.15), t, t0,
    { rot: -0.02, zoom0: 1.0, zoom1: 1.2, dur: 2.6, fx: 0.5, fy: 0.55, name: 'BAKI OLİMPİYA STADİONU', sub: '68 700 yer', nameK: pop(t, T('Sabahla') - 0.05) });
  // calendar
  const kC = pop(t, T('Çərşənbə') - 0.02);
  if (kC > 0) { const cw = 300, ch = 260; ctx.save(); ctx.translate(s.x + 170, s.y + 330); ctx.rotate(-0.06); ctx.scale(kC, kC);
    rrect(ctx, -cw / 2, -ch / 2, cw, ch, 20); ctx.fillStyle = C.paper; ctx.fill(); outline(ctx, 6);
    ctx.save(); rrect(ctx, -cw / 2, -ch / 2, cw, ch, 20); ctx.clip(); ctx.fillStyle = C.red; ctx.fillRect(-cw / 2, -ch / 2, cw, 64); ctx.restore();
    text(ctx, 'ÇƏRŞƏNBƏ', 0, -ch / 2 + 45, font(36, 800, UI), C.chalk, 'center');
    text(ctx, '25', 0, 60, font(140, 800, D), C.ink, 'center'); text(ctx, 'NOYABR', 0, 110, font(34, 800, UI), C.ink, 'center'); ctx.restore(); }
  stamp(ctx, '21:45', cx + 250, s.y + 320, 80, pop(t, T('oynayacaq.') - 0.1), { bg: C.gold, rot: 0.06 });
  chip(ctx, 'SABAH – BARSELONA', cx, s.y + 1110, 50, pop(t, T('Sabahla') + 0.1), { bg: C.chalk, rot: -0.02 });
}

// ---------------------------------------------------------------- D: 1899 -> 2017 timeline
function sYears(ctx, t, IMG) {
  const t0 = S.D;
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 3 });
  // Gamper (founder, 1899) left, Sabah photo right at 2017
  photo(ctx, IMG.gamper, s.x + 200, s.y + 860, 330, 440, pop(t, t0 - 0.1), t, t0,
    { rot: -0.05, zoom1: 1.12, dur: 2.2, fy: 0.2, name: 'JOAN GAMPER', sub: 'qurucu · 1899', nameK: pop(t, t0 + 0.1) });
  photo(ctx, IMG.sabah2, s.x + s.w - 220, s.y + 860, 360, 440, pop(t, T('2017-də') + 0.55), t, T('2017-də'),
    { rot: 0.05, zoom1: 1.15, dur: 2.2, fy: 0.3, name: 'SABAH', sub: 'Bakı · 2017' , nameK: pop(t, T('yaranıb.')) });
  const yr = Math.round(lerp(1899, 2017, E.inOutCubic(prog(t, T('2017-də') - 0.1, T('2017-də') + 0.6))));
  const kY = pop(t, t0 - 0.2);
  if (kY > 0) { ctx.save(); ctx.translate(cx, s.y + 400); ctx.scale(kY, kY);
    rrect(ctx, -360, -140, 720, 240, 30); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 6, C.gold);
    text(ctx, String(yr), 0, 60, font(200, 800, D), yr === 2017 ? C.gold : C.chalk, 'center'); ctx.restore(); }
  // timeline bar
  const y = s.y + 590, x0 = s.x + 40, x1 = s.x + s.w - 40, pp = (yr - 1899) / (2026 - 1899);
  ctx.strokeStyle = 'rgba(244,241,232,0.3)'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  ctx.strokeStyle = C.gold; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(lerp(x0, x1, pp), y); ctx.stroke();
  text(ctx, '1899', x0, y + 52, font(36, 800, UI), C.chalk, 'left'); text(ctx, '2026', x1, y + 52, font(36, 800, UI), C.chalk, 'right');
  const kD = pop(t, T('2017-də') + 0.55);
  if (kD > 0) { const dx = lerp(x0, x1, (2017 - 1899) / 127); ctx.save(); ctx.translate(dx, y); ctx.scale(kD * (1 + 0.15 * Math.sin(t * 8)), kD);
    ctx.beginPath(); ctx.arc(0, 0, 20, 0, TAU); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 5, C.ink); ctx.restore(); }
  chip(ctx, '118 İL SONRA', cx, s.y + 1150, 50, pop(t, T('yaranıb.') + 0.1), { bg: C.gold, rot: -0.03 });
}

// ---------------------------------------------------------------- E: 4 qualifying rounds, 8 games, 18 goals
const ROUNDS = [['TNS', 'Uels', '4:1'], ['KuPS', 'Finlandiya', '3:0'], ['Orhus', 'Danimarka', '5:2'], ['Hapoel Beer-Şeva', 'İsrail', '6:4']];
function sPath(ctx, t, IMG) {
  const t0 = S.E;
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 4 });
  const rt = [T('təsnifat'), T('təsnifat') + 0.3, T('mərhələsini') + 0.1, T('keçdi:')];
  let done = 0; rt.forEach((x) => { if (t >= x) done++; });
  // counter
  const kN = pop(t, t0 - 0.2);
  if (kN > 0) { ctx.save(); ctx.translate(cx - 230, s.y + 330); ctx.scale(kN, kN); rrect(ctx, -170, -80, 340, 160, 24); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 5, C.gold);
    text(ctx, `${done}/4`, 0, 30, font(100, 800, D), done === 4 ? C.gold : C.chalk, 'center'); ctx.restore();
    text(ctx, 'TƏSNİFAT', cx - 230, s.y + 450, font(36, 800, UI), C.chalk, 'center'); }
  // rows
  ROUNDS.forEach(([team, land, sc], i) => { const k = pop(t, rt[i] - 0.05); if (k <= 0) return;
    const y = s.y + 560 + i * 118; ctx.save(); ctx.translate(cx, y); ctx.scale(k, k);
    rrect(ctx, -420, -48, 840, 96, 20); ctx.fillStyle = i === 3 ? C.gold : C.paper; ctx.fill(); outline(ctx, 5);
    text(ctx, `${i + 1}`, -380, 16, font(44, 800, D), C.red, 'center');
    text(ctx, 'Sabah – ' + team, -340, 4, font(40, 800, D), C.ink, 'left');
    text(ctx, land, -340, 38, font(26, 700, UI), '#4A5266', 'left');
    text(ctx, sc, 370, 18, font(56, 800, D), C.ink, 'right');
    ctx.restore(); });
  // games and goals counters
  const kG = pop(t, T('8') - 0.05), kQ = pop(t, T('18') - 0.05);
  const goals = Math.round(lerp(0, 18, E.outCubic(prog(t, T('18') - 0.05, T('qol!')))));
  if (kG > 0) { ctx.save(); ctx.translate(cx + 120, s.y + 330); ctx.scale(kG, kG); rrect(ctx, -110, -80, 220, 160, 24); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 5);
    text(ctx, '8', 0, 22, font(96, 800, D), C.ink, 'center'); text(ctx, 'OYUN', 0, 60, font(28, 800, UI), C.ink, 'center'); ctx.restore(); }
  if (kQ > 0) { ctx.save(); ctx.translate(cx + 340, s.y + 330); ctx.scale(kQ, kQ); rrect(ctx, -110, -80, 220, 160, 24); ctx.fillStyle = C.green; ctx.fill(); outline(ctx, 5);
    text(ctx, String(goals), 0, 22, font(96, 800, D), C.chalk, 'center'); text(ctx, 'QOL', 0, 60, font(28, 800, UI), C.chalk, 'center'); ctx.restore(); }
  photo(ctx, IMG.hapoel, cx - 60, s.y + 1080, 700, 150, pop(t, T('qol!') - 0.1), t, T('qol!'), { rot: -0.02, zoom1: 1.1, dur: 1.5, fy: 0.35 });
  stamp(ctx, '18 QOL!', cx + 270, s.y + 1040, 56, pop(t, T('qol!')), { bg: C.green, fg: C.chalk, rot: 0.06 });
}

// ---------------------------------------------------------------- F: points table 3 vs 9 (data)
function sPoints(ctx, t, IMG) {
  const t0 = S.F;
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 5 });
  photo(ctx, IMG.bvb, cx, s.y + 300, 820, 300, pop(t, t0 - 0.15), t, t0, { rot: -0.015, zoom1: 1.12, dur: 3, fy: 0.45 });
  chip(ctx, 'ÇEMPİONLAR LİQASI · 4 TURDAN SONRA', cx, s.y + 480, 36, pop(t, t0 + 0.05), { bg: C.chalk, rot: 0.01 });
  const base = s.y + 1080, unit = 52;
  const bar = (x, val, col, lab, tt) => { const k = E.outCubic(prog(t, tt, tt + 0.55)); if (t < tt) return;
    const h = unit * val * k; rrect(ctx, x - 130, base - h, 260, h, 14); ctx.fillStyle = col; ctx.fill(); outline(ctx, 6, C.ink);
    big(ctx, String(Math.round(val * k)), x, base - h - 30, 120, C.chalk, 1, { sw: 0.1 });
    text(ctx, lab, x, base + 60, font(48, 800, D), C.chalk, 'center'); };
  bar(cx - 200, 3, C.gold, 'SABAH', T('3,') - 0.1);
  bar(cx + 200, 9, '#FF4F8B', 'BARSELONA', T('9', 1) - 0.1);
  if (t > T('3,') - 0.1) text(ctx, 'XAL', cx, base - 20, font(44, 800, UI), 'rgba(244,241,232,0.8)', 'center');
}

// ---------------------------------------------------------------- G: payoff — 4 days later Barça turn 127
function sBirthday(ctx, t, IMG) {
  const t0 = S.G;
  world(ctx, t, { zoom: Math.exp(0.025 * (t - t0)), seed: 6 });
  // old team photo (1910) sepia, the club's age
  photo(ctx, IMG.fcb1910, cx, s.y + 380, 800, 380, pop(t, t0 - 0.1), t, t0, { rot: -0.02, zoom1: 1.15, dur: 5, fy: 0.4,
    name: 'BARSELONA, 1910', nameK: pop(t, t0 + 0.2) });
  stamp(ctx, 'ƏN MARAQLISI', cx + 150, s.y + 640, 56, (t < T('127', 1) - 0.12 ? pop(t, T('maraqlısı:') - 0.05) : 0), { bg: C.red, fg: C.chalk, rot: -0.06 });
  // calendar 25 -> 29
  const day = 25 + Math.min(4, Math.max(0, Math.floor((t - T('4', 1)) / 0.2) + 1)) * (t >= T('4', 1));
  const kC = pop(t, T('oyundan') - 0.05);
  if (kC > 0) { const cw = 280, ch = 260; ctx.save(); ctx.translate(s.x + 170, s.y + 860); ctx.rotate(-0.05); ctx.scale(kC, kC);
    rrect(ctx, -cw / 2, -ch / 2, cw, ch, 20); ctx.fillStyle = C.paper; ctx.fill(); outline(ctx, 6);
    ctx.save(); rrect(ctx, -cw / 2, -ch / 2, cw, ch, 20); ctx.clip(); ctx.fillStyle = C.red; ctx.fillRect(-cw / 2, -ch / 2, cw, 60); ctx.restore();
    text(ctx, 'NOYABR', 0, -ch / 2 + 43, font(34, 800, UI), C.chalk, 'center');
    const fl = 1 + 0.15 * Math.exp(-((t - T('4', 1)) % 0.2) * 20) * (t >= T('4', 1) && day < 29);
    ctx.save(); ctx.translate(0, 60); ctx.scale(fl, fl); text(ctx, String(day), 0, 0, font(140, 800, D), day === 29 ? C.red : C.ink, 'center'); ctx.restore();
    ctx.restore(); }
  chip(ctx, '+4 GÜN', s.x + 170, s.y + 690, 44, pop(t, T('sonra') - 0.05), { bg: C.gold, rot: 0.04 });
  // cake with 127
  const kK = pop(t, T('127', 1) - 0.1);
  if (kK > 0) { ctx.save(); ctx.translate(cx + 170, s.y + 880); ctx.scale(kK, kK);
    rrect(ctx, -230, 0, 460, 180, 26); ctx.fillStyle = '#7A1F3D'; ctx.fill(); outline(ctx, 6);
    rrect(ctx, -180, -120, 360, 130, 22); ctx.fillStyle = '#1E4FA0'; ctx.fill(); outline(ctx, 6);
    ctx.fillStyle = C.paper; for (let i = 0; i < 9; i++) { ctx.beginPath(); ctx.arc(-200 + i * 50, 6, 22, 0, Math.PI); ctx.fill(); }
    text(ctx, '127', 0, 135, font(110, 800, D), C.gold, 'center');
    for (let i = 0; i < 7; i++) { const x = -150 + i * 50, lit = t > T('127', 1) + i * 0.06;
      ctx.fillStyle = C.paper; ctx.fillRect(x - 7, -175, 14, 55); ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.strokeRect(x - 7, -175, 14, 55);
      if (lit) { const f = 1 + 0.15 * Math.sin(t * 20 + i); ctx.save(); ctx.translate(x, -188); ctx.scale(f, f);
        ctx.beginPath(); ctx.ellipse(0, 0, 9, 16, 0, 0, TAU); ctx.fillStyle = C.gold; ctx.fill(); ctx.restore(); } }
    ctx.restore(); }
  stamp(ctx, '29 NOYABR · 127 YAŞ', cx + 60, s.y + 1110, 46, pop(t, T('yaşını') - 0.02), { bg: C.gold, rot: -0.03 });
}

// ---------------------------------------------------------------- H: end card
function sEnd(ctx, t, IMG) {
  const t0 = S.H;
  world(ctx, t, { zoom: Math.exp(0.02 * (t - t0)), seed: 7 });
  photo(ctx, IMG.bakunight, cx - 200, s.y + 350, 300, 240, pop(t, t0 - 0.1), t, t0, { rot: -0.06, zoom1: 1.08, dur: 5, fy: 0.5 });
  photo(ctx, IMG.baku, cx + 200, s.y + 350, 300, 240, pop(t, t0), t, t0, { rot: 0.05, zoom1: 1.08, dur: 5, fy: 0.5 });
  text(ctx, 'SABAH – BARSELONA · 25.11 · 21:45', cx, s.y + 560, font(44, 800, D), C.gold, 'center');
  text(ctx, '@bilirdinizmi_az', cx, s.y + 680, font(76, 800, D), C.chalk, 'center');
  const kB = pop(t, T('Bəyən') - 0.05), kI = pop(t, T('izlə') - 0.05);
  if (kB > 0) { ctx.save(); ctx.translate(cx - 215, s.y + 830); ctx.scale(kB, kB); ctx.rotate(-0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 6);
    const hb = 1 + 0.12 * Math.max(0, Math.sin((t - T('Bəyən')) * 9)) * Math.exp(-(t - T('Bəyən')) * 2);
    ctx.save(); ctx.translate(-110, 4); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30);
    ctx.fillStyle = '#E8384F'; ctx.fill(); ctx.restore();
    text(ctx, 'BƏYƏN', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  if (kI > 0) { ctx.save(); ctx.translate(cx + 215, s.y + 830); ctx.scale(kI, kI); ctx.rotate(0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 6);
    ctx.save(); ctx.translate(-115, 4); ctx.lineWidth = 12; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'İZLƏ', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  chip(ctx, 'hər gün bilmədiyin bir fakt', cx, s.y + 990, 46, pop(t, T('hər') - 0.05), { bg: C.panel, fg: C.chalk, edge: C.gold, rot: -0.02 });
  const kS = pop(t, T('fakt!') + 0.25);
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 1120); ctx.scale(kS, kS);
    const msg = 'Oyuna gedən dostuna göndər';
    ctx.font = font(44, 800, UI); const w = ctx.measureText(msg).width + 150;
    rrect(ctx, -w / 2, -48, w, 96, 30); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 5);
    envelope(ctx, -w / 2 + 62, 0, 62); text(ctx, msg, 38, 16, font(44, 800, UI), C.ink, 'center'); ctx.restore(); }
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 700, UI), font(40, 600, UI)],
  images: { sabah1: 'assets/sabah_hapoel1.jpg', sabah2: 'assets/sabah_aarhus.jpg', hapoel: 'assets/sabah_hapoel2.jpg', bvb: 'assets/sabah_bvb2.jpg', baku: 'assets/baku.jpg', bakunight: 'assets/bakunight.jpg',
    campnou: 'assets/campnou.jpg', flick: 'assets/flick_face.jpg', olympic: 'assets/olympic.jpg', gamper: 'assets/gamper.jpg', fcb1910: 'assets/fcb1910.jpg' },
  hits: HITS,
  draw(ctx, u, t, IMG) {
    const seq = [[0, sHook], [S.B, sFly], [S.C, sStadium], [S.D, sYears], [S.E, sPath], [S.F, sPoints], [S.G, sBirthday], [S.H, sEnd]];
    let j = 1; while (j < seq.length && t >= seq[j][0] + 0.2) j++;
    if (j >= seq.length) sEnd(ctx, t, IMG);
    else whip(ctx, t, seq[j][0], () => seq[j - 1][1](ctx, t, IMG), () => seq[j][1](ctx, t, IMG), j === seq.length - 1 ? 0.36 : 0.3);
    if (t < S.H - 0.2) bug(ctx, t);
    captions(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 180; i++) { ctx.fillStyle = `rgba(240,240,230,${0.015 + 0.025 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
