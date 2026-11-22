// "167 il, 1 milyon dollar" — @bilirdinizmi_az 18:30 animated TREND reel, 22 Nov 2026 (TOPIC OVERRIDE, PHOTO STORY look).
// Riemann hypothesis (B. Riemann 1859; Clay Millennium Prize $1M). 20 Nov 2026: Levent Alpöge (Turkish-American mathematician,
// Anthropic) announced a proof made with Claude, as a Lean archive of 175,187 files; Lean kernel check passed (A. Sutherland, MIT),
// NOT yet accepted by mathematicians (CASRAI, FelloAI, Hollywood Life/AP). A CLAIM stays a claim on screen.
// Real photos: B. Riemann 1863 (Smithsonian, no known restrictions), L. Alpöge 2024 (Marlene Ruf / MFO, CC BY-SA 2.0 DE).
// Arif voice (ElevenLabs) on audio/vo.wav; every caption on Scribe word starts. World: chalkboard. No logos. No music.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = __TIMING__;
const C = {
  board: '#1D2925', board2: '#26352F', chalk: '#F4F1E8', ink: '#15191A', gold: '#FFCD00', red: '#E5372B', green: '#2FB866',
  mute: 'rgba(244,241,232,0.18)', paper: '#F6F0E1', panel: '#101716', blue: '#3F8EE8',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));

const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const END = TIMING.dur + 1.4;
const S = { A: 0, B: T('Söhbət') - 0.12, C: T('1859-dan') - 0.12, D: T('20') - 0.12, E: T('Sübut') - 0.12, F: T('Amma') - 0.12,
  G: T('Bəyən') - 0.12 };
const B = (t) => t / 0.5;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.3, from, to }];

const STOPS = [['167 İL', 0.1], ['RİMAN', T('Riman')], ['ALPÖGE', T('Alpöge')], ['175 187', T('175')], ['YOXLAMA', T('alimlər')]];

const HITS = [
  [B(0.02), '167', 'thud'], [B(T('milyon') - 0.03), '$1M', 'thud'], [B(T('türk') - 0.05), 'alpoge photo', 'click'],
  [B(T('əsilli')), 'chip', 'tick'],
  WH(S.B, 600, 2200), [B(T('Riman')), 'name', 'click'], [B(T('fərziyyəsindən')), 'board', 'tick'], [B(T('gedir.')), 'zeros', 'tick'],
  WH(S.C, 2200, 600), [B(T('1859-dan')), '1859', 'thud'], [B(T('bəri') - 0.1), 'roll', 'whoosh', { len: 0.6, from: 400, to: 1600 }],
  [B(T('heç')), 'x1', 'thud'], [B(T('kim')), 'x2', 'thud'], [B(T('sübut')), 'x3', 'thud'], [B(T('bilməyib.')), 'x4', 'thud'],
  WH(S.D, 600, 2200), [B(T('20')), 'calendar', 'thud'], [B(T('Levent') - 0.05), 'photo', 'click'], [B(T('Alpöge')), 'name', 'tick'],
  [B(T('Claude')), 'claude', 'click'], [B(T('sübut', 1)), 'paper', 'whoosh', { len: 0.3, from: 800, to: 2000 }], [B(T('açıqladı.')), 'stamp', 'thud'],
  WH(S.E, 2200, 600), [B(T('Sübut', 0)), 'files', 'tick'], [B(T('175') - 0.05), 'count', 'whoosh', { len: 1.2, from: 300, to: 1400 }],
  [B(T('kompüter')), 'laptop', 'click'], [B(T('ibarətdir.')), '175187', 'thud'],
  WH(S.F, 600, 2200), [B(T('alimlər') - 0.05), 'split', 'click'], [B(T('onu', 1)), 'hourglass', 'tick'], [B(T('təsdiqləməyib.')), 'stamp', 'thud'],
  WH(S.G, 2200, 600), [B(T('Bəyən')), 'BƏYƏN', 'click'], [B(T('izlə')), 'İZLƏ', 'thud'], [B(T('fakt!') + 0.3), 'send line', 'tick'],
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

// ---------------------------------------------------------------- world: chalkboard with drifting formulas
const SCRIB = ['ζ(s) = 0', '½ + it', 'Σ 1/n', 'π(x)', '∞', 'ζ(½)', 'Re(s) = ½', 'x / ln x', '1859', 'p = 2, 3, 5, 7…'];
function world(ctx, t, { zoom = 1, seed = 0 } = {}) {
  fill(ctx, C.board);
  const g = ctx.createRadialGradient(W / 2, H * 0.45, 100, W / 2, H * 0.45, H * 0.75);
  g.addColorStop(0, 'rgba(60,80,70,0.55)'); g.addColorStop(1, 'rgba(0,0,0,0.45)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); M.zoomAbout(ctx, zoom, W / 2, H / 2);
  for (let i = 0; i < 12; i++) {
    const j = i + seed * 7, x = hash01(j, 21) * W, y = ((hash01(j, 22) * H * 1.2 - t * (14 + 10 * hash01(j, 23))) % (H * 1.2) + H * 1.2) % (H * 1.2) - H * 0.1;
    ctx.save(); ctx.translate(x, y); ctx.rotate((hash01(j, 24) - 0.5) * 0.4);
    text(ctx, SCRIB[j % SCRIB.length], 0, 0, font(46 + 40 * hash01(j, 25), 600, UI), C.mute, 'center'); ctx.restore();
  }
  ctx.restore();
}

// ---------------------------------------------------------------- persistent progress strip
function bug(ctx, t) {
  const k = clamp(prog(t, 0.2, 0.55)); if (k <= 0) return;
  const y = s.y + s.h - 30, x0 = cx - 430, w = 860;
  ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 60);
  rrect(ctx, x0, y - 42, w, 84, 16); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 4, C.gold);
  const xs = [x0 + 95, x0 + 260, x0 + 430, x0 + 605, x0 + 775];
  let last = -1; STOPS.forEach(([, ft], i) => { if (t >= ft) last = i; });
  STOPS.forEach(([lab, ft], i) => {
    const on = t >= ft, bmp = on ? 1 + 0.4 * Math.exp(-(t - ft) * 7) : 1;
    ctx.save(); ctx.translate(xs[i], y); ctx.scale(bmp, bmp);
    text(ctx, lab, 0, 12, font(32, 800, D), i === last ? C.gold : on ? C.chalk : 'rgba(244,241,232,0.3)', 'center'); ctx.restore();
    if (i < 4) { ctx.beginPath(); ctx.arc((xs[i] + xs[i + 1]) / 2, y, 5, 0, TAU); ctx.fillStyle = 'rgba(244,241,232,0.45)'; ctx.fill(); }
  });
  ctx.restore();
}

// ---------------------------------------------------------------- A: hook "167 il, 1 milyon dollar və türk əsilli alim"
function sHook(ctx, t, IMG) {
  world(ctx, t, { zoom: Math.exp(0.03 * t) });
  // Riemann portrait (1863), slow push
  photo(ctx, IMG.riemann, cx - 150, s.y + 820, 470, 590, lerp(0.92, 1, E.outBack(prog(t, 0, 0.3))), t, 0,
    { rot: -0.05, crop: [60, 40, 880, 1110], zoom1: 1.15, dur: 5, fy: 0.35 });
  chip(ctx, 'RİMAN · 1859', cx - 150, s.y + 1135, 40, pop(t, 0.35), { bg: C.chalk, rot: -0.05 });
  // 1 000 000 $
  const kM = pop(t, T('milyon') - 0.05);
  if (kM > 0) { ctx.save(); shake(ctx, B(t), B(T('milyon')), 10, 4, 0.2); stamp(ctx, '$1 000 000', cx + 170, s.y + 560, 76, kM, { bg: C.green, fg: C.chalk, rot: 0.06 }); ctx.restore(); }
  // Alpöge photo slides in
  const kA = pop(t, T('türk') - 0.08);
  photo(ctx, IMG.alpoge, cx + 250, s.y + 880, 330, 400, kA, t, T('türk'), { rot: 0.06, crop: [190, 10, 190, 250], zoom1: 1.1, dur: 3, fy: 0.25 });
  chip(ctx, 'TÜRK ƏSİLLİ ALİM', cx + 230, s.y + 1135, 44, pop(t, T('əsilli') - 0.05), { bg: C.gold, rot: 0.04 });
  // the hook number, big on frame 0
  const kk = t < 0.3 ? lerp(1.15, 1, E.outBack(prog(t, 0, 0.3))) : 1 + 0.06 * Math.exp(-(t - T('il,')) * 5) * (t > T('il,'));
  ctx.save(); shake(ctx, B(t), B(0.02), 12, 3, 0.2);
  big(ctx, '167 İL', cx - 90, s.y + 440, 230, C.gold, kk, { rot: -0.04 }); ctx.restore();
}

// ---------------------------------------------------------------- B: "Söhbət Riman fərziyyəsindən gedir."
function sRiemann(ctx, t, IMG) {
  const t0 = S.B;
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 1 });
  photo(ctx, IMG.riemann, cx - 170, s.y + 640, 520, 660, 1, t, t0, { rot: -0.03, crop: [0, 0, 1000, 1180], zoom0: 1.02, zoom1: 1.25, dur: 2.6, fy: 0.3,
    name: 'BERNHARD RİMAN', sub: 'alman riyaziyyatçı', nameK: pop(t, T('Riman') - 0.05) });
  // chalk card: the critical line with zeros
  const kB = pop(t, T('fərziyyəsindən') - 0.05);
  if (kB > 0) {
    const bx = cx + 270, by = s.y + 940, bw = 330, bh = 420;
    ctx.save(); ctx.translate(bx, by); ctx.rotate(0.05); ctx.scale(kB, kB);
    rrect(ctx, -bw / 2, -bh / 2, bw, bh, 18); ctx.fillStyle = C.board2; ctx.fill(); outline(ctx, 6, C.chalk);
    ctx.strokeStyle = 'rgba(244,241,232,0.5)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-bw / 2 + 30, 0); ctx.lineTo(bw / 2 - 30, 0); ctx.stroke();
    const lp = E.outCubic(prog(t, T('fərziyyəsindən'), T('fərziyyəsindən') + 0.5));
    ctx.strokeStyle = C.gold; ctx.lineWidth = 7; ctx.setLineDash([18, 12]); ctx.beginPath(); ctx.moveTo(20, bh / 2 - 60); ctx.lineTo(20, bh / 2 - 60 - lp * (bh - 120)); ctx.stroke(); ctx.setLineDash([]);
    text(ctx, '½', 20, bh / 2 - 22, font(40, 800, D), C.gold, 'center');
    for (let i = 0; i < 6; i++) { const ky = pop(t, T('gedir.') - 0.2 + i * 0.09); if (ky <= 0) continue;
      const yy = (i < 3 ? -1 : 1) * (50 + (i % 3) * 55); ctx.beginPath(); ctx.arc(20, yy, 13 * ky, 0, TAU); ctx.fillStyle = C.chalk; ctx.fill(); }
    ctx.restore();
    stamp(ctx, 'RİMAN FƏRZİYYƏSİ', cx + 110, s.y + 500, 56, pop(t, T('fərziyyəsindən') + 0.05), { bg: C.gold, rot: 0.05 });
  }
}

// ---------------------------------------------------------------- C: 1859 -> 2026, nobody proved it
function sYears(ctx, t) {
  const t0 = S.C;
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 2 });
  const yr = rollNum(t, 1859, 2026, T('bəri') - 0.15, T('heç') + 0.2);
  const kY = pop(t, t0 - 0.2);
  if (kY > 0) { ctx.save(); ctx.translate(cx, s.y + 470); ctx.scale(kY, kY);
    rrect(ctx, -380, -150, 760, 260, 30); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 6, C.gold);
    text(ctx, String(yr), 0, 55, font(210, 800, D), yr === 2026 ? C.gold : C.chalk, 'center'); ctx.restore(); }
  const k167 = pop(t, T('heç') + 0.1);
  chip(ctx, '167 İL', cx + 290, s.y + 330, 50, k167, { bg: C.gold, rot: 0.08 });
  // four "SÜBUT?" sheets get crossed out one by one
  const marks = [T('heç'), T('kim'), T('sübut'), T('bilməyib.')];
  for (let i = 0; i < 4; i++) {
    const x = s.x + 130 + i * 210, y = s.y + 860 + (i % 2) * 70, k = pop(t, t0 - 0.05 + i * 0.1);
    if (k <= 0) continue;
    ctx.save(); ctx.translate(x, y); ctx.rotate((i % 2 ? 0.06 : -0.05)); ctx.scale(k, k);
    rrect(ctx, -90, -125, 180, 250, 10); ctx.fillStyle = C.paper; ctx.fill(); outline(ctx, 5);
    for (let l = 0; l < 6; l++) { ctx.fillStyle = 'rgba(21,25,26,0.25)'; ctx.fillRect(-65, -80 + l * 26, 130 - 40 * hash01(i * 9 + l, 3), 8); }
    text(ctx, 'SÜBUT?', 0, 100, font(34, 800, D), C.ink, 'center');
    const kx = sp(t, marks[i] - 0.03, SPRING.bouncy);
    if (kx > 0) { const q = Math.min(1, kx); ctx.strokeStyle = C.red; ctx.lineWidth = 20; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(-70, -90); ctx.lineTo(-70 + 140 * q, -90 + 180 * q); ctx.stroke();
      if (q > 0.5) { const q2 = (q - 0.5) * 2; ctx.beginPath(); ctx.moveTo(70, -90); ctx.lineTo(70 - 140 * q2, -90 + 180 * q2); ctx.stroke(); } }
    ctx.restore();
  }
  stamp(ctx, 'HEÇ KİM', cx, s.y + 1130, 64, pop(t, T('bilməyib.') + 0.05), { bg: C.red, fg: C.chalk, rot: -0.04 });
}

// ---------------------------------------------------------------- D: 20 Nov, Levent Alpöge + Claude announced
function sAlpoge(ctx, t, IMG) {
  const t0 = S.D;
  world(ctx, t, { zoom: Math.exp(0.025 * (t - t0)), seed: 3 });
  // calendar
  const kC = pop(t, t0 - 0.2);
  if (kC > 0) { const cw = 300, ch = 250; ctx.save(); ctx.translate(s.x + 190, s.y + 330); ctx.rotate(-0.06); ctx.scale(kC, kC);
    rrect(ctx, -cw / 2, -ch / 2, cw, ch, 20); ctx.fillStyle = C.paper; ctx.fill(); outline(ctx, 6);
    ctx.save(); rrect(ctx, -cw / 2, -ch / 2, cw, ch, 20); ctx.clip(); ctx.fillStyle = C.red; ctx.fillRect(-cw / 2, -ch / 2, cw, 60); ctx.restore();
    text(ctx, 'NOYABR 2026', 0, -ch / 2 + 42, font(30, 800, UI), C.chalk, 'center');
    text(ctx, '20', 0, 100, font(150, 800, D), C.ink, 'center'); ctx.restore(); }
  chip(ctx, 'İDDİA', cx + 230, s.y + 330, 50, pop(t, t0 + 0.05), { bg: C.gold, rot: 0.06 });
  // the photo, big, slow push; name plate on it
  const kP = pop(t, T('noyabrda') - 0.05);
  photo(ctx, IMG.alpoge, cx + 110, s.y + 830, 600, 660, kP, t, T('Levent'), { rot: 0.02, crop: [150, 0, 250, 267], zoom0: 1.0, zoom1: 1.22, dur: 4.2, fy: 0.12,
    name: 'LEVENT ALPÖGE', sub: 'türk əsilli riyaziyyatçı', nameK: pop(t, T('Alpöge') - 0.05) });
  // Claude chip (plain text, no logo)
  const kQ = pop(t, T('Claude') - 0.05);
  if (kQ > 0) { ctx.save(); ctx.translate(s.x + 190, s.y + 700); ctx.rotate(-0.05); ctx.scale(kQ, kQ);
    rrect(ctx, -170, -70, 340, 140, 28); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 6);
    ctx.beginPath(); ctx.moveTo(-60, 68); ctx.lineTo(-90, 110); ctx.lineTo(-20, 68); ctx.closePath(); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 6);
    ctx.fillStyle = C.chalk; ctx.fillRect(-64, 60, 46, 12);
    text(ctx, 'Claude', 0, 8, font(64, 800, D), C.ink, 'center');
    text(ctx, 'süni intellekt', 0, 48, font(28, 700, UI), '#5A6460', 'center'); ctx.restore(); }
  // proof sheets fly onto the desk
  const kS = pop(t, T('sübut', 1) - 0.05);
  if (kS > 0) for (let i = 0; i < 3; i++) { const kk = pop(t, T('sübut', 1) - 0.05 + i * 0.08);
    ctx.save(); ctx.translate(s.x + 120 + i * 14, s.y + 960 - i * 12); ctx.rotate(-0.12 + i * 0.07); ctx.scale(kk * 0.8, kk * 0.8);
    rrect(ctx, -110, -80, 220, 160, 8); ctx.fillStyle = C.paper; ctx.fill(); outline(ctx, 4);
    for (let l = 0; l < 4; l++) { ctx.fillStyle = 'rgba(21,25,26,0.3)'; ctx.fillRect(-80, -45 + l * 26, 160 - 50 * hash01(i * 7 + l, 5), 8); }
    if (i === 2) text(ctx, 'SÜBUT', 0, 70, font(30, 800, D), C.ink, 'center');
    ctx.restore(); }
  stamp(ctx, 'İDDİA EDİR', cx + 180, s.y + 520, 60, pop(t, T('açıqladı.') - 0.02), { bg: C.gold, rot: -0.06 });
}

// ---------------------------------------------------------------- E: 175 187 files
function sFiles(ctx, t) {
  const t0 = S.E;
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 4 });
  // a wall of tiny file icons that fills up
  const cols = 9, rows = 4, fw = 80, fh = 96, gx = (s.w - 40) / cols, x0 = s.x + 20 + gx / 2, y0 = s.y + 735;
  const fillP = prog(t, T('Sübut') + 0.1, T('ibarətdir.') + 0.1);
  const n = Math.floor(fillP * cols * rows);
  for (let i = 0; i < Math.min(n + 1, cols * rows); i++) {
    const r = Math.floor(i / cols), c = i % cols, ti = T('Sübut') + 0.1 + (i / (cols * rows)) * (T('ibarətdir.') - T('Sübut'));
    const k = pop(t, ti); if (k <= 0) continue;
    const x = x0 + c * gx, y = y0 + r * (fh + 20);
    ctx.save(); ctx.translate(x, y); ctx.scale(k * 0.95, k * 0.95);
    ctx.beginPath(); ctx.moveTo(-fw / 2, -fh / 2); ctx.lineTo(fw / 2 - 18, -fh / 2); ctx.lineTo(fw / 2, -fh / 2 + 18); ctx.lineTo(fw / 2, fh / 2); ctx.lineTo(-fw / 2, fh / 2); ctx.closePath();
    ctx.fillStyle = (i * 7) % 11 === 0 ? C.gold : C.paper; ctx.fill(); outline(ctx, 3);
    ctx.fillStyle = 'rgba(21,25,26,0.35)'; for (let l = 0; l < 3; l++) ctx.fillRect(-fw / 2 + 10, -fh / 2 + 26 + l * 14, fw - 26, 5);
    ctx.restore();
  }
  const num = rollNum(t, 0, 175187, T('175') - 0.05, T('ibarətdir.') + 0.05, E.outCubic);
  const kN = pop(t, t0 - 0.2);
  if (kN > 0) { ctx.save(); ctx.translate(cx, s.y + 430); ctx.scale(kN, kN);
    rrect(ctx, -420, -140, 840, 250, 30); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 6, C.gold);
    text(ctx, fmt(num), 0, 30, font(170, 800, D), num === 175187 ? C.gold : C.chalk, 'center');
    text(ctx, 'KOMPÜTER FAYLI', 0, 88, font(40, 800, UI), C.chalk, 'center'); ctx.restore(); }
  stamp(ctx, 'LEAN PROQRAMI', cx + 250, s.y + 290, 40, pop(t, T('kompüter') - 0.05), { bg: C.blue, fg: C.chalk, rot: 0.07 });
  stamp(ctx, '175 MİNDƏN ÇOX', cx + 130, s.y + 640, 58, pop(t, T('ibarətdir.') + 0.05), { bg: C.gold, rot: -0.05 });
}

// ---------------------------------------------------------------- F: computer said yes, mathematicians not yet
function hourglass(ctx, x, y, sz, t, k) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(0.15 * Math.sin(t * 3)); ctx.scale(k, k);
  ctx.beginPath(); ctx.moveTo(-sz, -sz * 1.3); ctx.lineTo(sz, -sz * 1.3); ctx.lineTo(sz * 0.12, 0); ctx.lineTo(sz, sz * 1.3); ctx.lineTo(-sz, sz * 1.3); ctx.lineTo(-sz * 0.12, 0); ctx.closePath();
  ctx.fillStyle = C.paper; ctx.fill(); outline(ctx, 6);
  const f = (t * 0.6) % 1; ctx.fillStyle = C.gold;
  ctx.beginPath(); ctx.moveTo(-sz * 0.8 * (1 - f), -sz * 1.25 + sz * 1.1 * f); ctx.lineTo(sz * 0.8 * (1 - f), -sz * 1.25 + sz * 1.1 * f); ctx.lineTo(0, -sz * 0.1); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-sz * 0.85, sz * 1.25); ctx.lineTo(sz * 0.85, sz * 1.25); ctx.lineTo(0, sz * 1.25 - sz * 1.0 * f); ctx.closePath(); ctx.fill();
  ctx.restore();
}
function sCheck(ctx, t) {
  const t0 = S.F;
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 5 });
  const card = (x, y, k, bg, title, sub, rot) => { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
    rrect(ctx, -200, -300, 400, 600, 30); ctx.fillStyle = bg; ctx.fill(); outline(ctx, 7);
    text(ctx, title, 0, -210, font(50, 800, D), C.ink, 'center'); text(ctx, sub, 0, 250, font(38, 800, UI), C.ink, 'center'); ctx.restore(); };
  const kL = pop(t, t0 + 0.08), kR = pop(t, T('alimlər') - 0.05);
  card(cx - 215, s.y + 680, kL, C.green, 'KOMPÜTER', 'YOXLADI', -0.04);
  if (kL > 0) { ctx.save(); ctx.translate(cx - 215, s.y + 680); ctx.rotate(-0.04); ctx.scale(kL, kL); big(ctx, '✓', 0, 70, 260, C.chalk, pop(t, t0 + 0.3), { sw: 0.06 }); ctx.restore(); }
  card(cx + 215, s.y + 680, kR, C.paper, 'ALİMLƏR', 'HƏLƏ YOXLAYIR', 0.04);
  if (kR > 0) { ctx.save(); ctx.translate(cx + 215, s.y + 680); ctx.rotate(0.04); hourglass(ctx, 0, 10, 80, t, pop(t, T('onu', 1) - 0.05)); ctx.restore(); }
  stamp(ctx, 'HƏLƏ TƏSDİQ YOXDUR', cx, s.y + 1075, 54, pop(t, T('təsdiqləməyib.') - 0.02), { bg: C.red, fg: C.chalk, rot: -0.04 });
}

// ---------------------------------------------------------------- G: end card
function sEnd(ctx, t, IMG) {
  const t0 = S.G;
  world(ctx, t, { zoom: Math.exp(0.02 * (t - t0)), seed: 6 });
  photo(ctx, IMG.riemann, cx - 200, s.y + 400, 260, 310, pop(t, t0 - 0.1), t, t0, { rot: -0.07, crop: [60, 40, 880, 1050], zoom1: 1.08, dur: 5, fy: 0.3 });
  photo(ctx, IMG.alpoge, cx + 200, s.y + 400, 260, 310, pop(t, t0), t, t0, { rot: 0.06, crop: [190, 10, 190, 230], zoom1: 1.08, dur: 5, fy: 0.2 });
  big(ctx, '167 İL', cx, s.y + 650, 90, C.gold, pop(t, t0 + 0.15), { rot: -0.03 });
  text(ctx, '@bilirdinizmi_az', cx, s.y + 765, font(76, 800, D), C.chalk, 'center');
  const kB = pop(t, T('Bəyən') - 0.05), kI = pop(t, T('izlə') - 0.05);
  if (kB > 0) { ctx.save(); ctx.translate(cx - 215, s.y + 890); ctx.scale(kB, kB); ctx.rotate(-0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 6);
    const hb = 1 + 0.12 * Math.max(0, Math.sin((t - T('Bəyən')) * 9)) * Math.exp(-(t - T('Bəyən')) * 2);
    ctx.save(); ctx.translate(-110, 4); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30);
    ctx.fillStyle = '#E8384F'; ctx.fill(); ctx.restore();
    text(ctx, 'BƏYƏN', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  if (kI > 0) { ctx.save(); ctx.translate(cx + 215, s.y + 890); ctx.scale(kI, kI); ctx.rotate(0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 6);
    ctx.save(); ctx.translate(-115, 4); ctx.lineWidth = 12; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'İZLƏ', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  chip(ctx, 'hər gün bilmədiyin bir fakt', cx, s.y + 1050, 46, pop(t, T('hər') - 0.05), { bg: C.panel, fg: C.chalk, edge: C.gold, rot: -0.02 });
  const kS = pop(t, T('fakt!') + 0.25);
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 1175); ctx.scale(kS, kS);
    const msg = 'Riyaziyyatı sevən dostuna göndər';
    ctx.font = font(42, 800, UI); const w = ctx.measureText(msg).width + 150;
    rrect(ctx, -w / 2, -46, w, 92, 30); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 5);
    envelope(ctx, -w / 2 + 62, 0, 62); text(ctx, msg, 38, 15, font(42, 800, UI), C.ink, 'center'); ctx.restore(); }
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 700, UI), font(40, 600, UI)],
  images: { riemann: 'assets/riemann.jpg', alpoge: 'assets/alpoge_2024.jpg' },
  hits: HITS,
  draw(ctx, u, t, IMG) {
    const seq = [[0, sHook], [S.B, sRiemann], [S.C, sYears], [S.D, sAlpoge], [S.E, sFiles], [S.F, sCheck], [S.G, sEnd]];
    let j = 1; while (j < seq.length && t >= seq[j][0] + 0.2) j++;
    if (j >= seq.length) sEnd(ctx, t, IMG);
    else whip(ctx, t, seq[j][0], () => seq[j - 1][1](ctx, t, IMG), () => seq[j][1](ctx, t, IMG), j === seq.length - 1 ? 0.36 : 0.3);
    if (t < S.G - 0.2) bug(ctx, t);
    captions(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 220; i++) { ctx.fillStyle = `rgba(240,240,230,${0.02 + 0.03 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
