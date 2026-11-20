// "Neçə vyetnamlı?" — @bilirdinizmi_az 18:30 animated GUESS reel, 20 Nov 2026. Pure function of time.
// ~5 000 Vietnamese studied in Soviet Azerbaijan; Ho Chi Minh visited Baku in 1959; a "Baku" street in Vung Tau (many
// Vietsovpetro oil workers studied in Baku); President Ilham Aliyev's official visit to Vietnam 19–21 Nov 2026, 12 years after
// the last one (plenglish, AA, apa.az, trend.az, azernews, qdnd.vn, baoquocte.vn). Arif voice (ElevenLabs) on audio/vo.wav;
// every word/number timed to Scribe word starts remapped onto silencedetect phrases. World: cream map paper with route lines.
// Public figures = dark silhouettes + name plates (no faces). No logos. No music; soft SFX only.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = __TIMING__;
const C = {
  paper: '#F3E7CD', paper2: '#E8D8B4', ink: '#1C1A22', red: '#DA251D', star: '#FFCD00', gold: '#FFCD00', teal: '#178A86',
  sea: '#2C7FB8', sea2: '#1F5F8E', chalk: '#FFFDF6', green: '#2FB866', grey: '#B9AE98', mute: '#7D7262', sil: '#141219',
  blue: '#1E5BB8', panel: '#1C1A22',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));

const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const END = TIMING.dur + 1.3;
const S = { A: 0, B: T('Sovet') - 0.12, C: T('İpucu:') - 0.12, D: T('Üç!') - 0.12, E: T('Təxminən') - 0.12,
  F: T('Vunq') - 0.12, G: T('Orada') - 0.12, H: T('Prezident') - 0.12, I: T('Bəyən') - 0.12 };
const B = (t) => t / 0.5;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.3, from, to }];

const STOPS = [['SUAL', 0.1], ['İPUCU', T('İpucu:')], ['3·2·1', T('Üç!')], ['CAVAB', T('5 000!')], ['BONUS', T('Vunq')]];

const HITS = [
  [B(0.02), '500', 'thud'], [B(T('5 000,') + 0.02), '5 000', 'thud'], [B(T('50 000?') + 0.02), '50 000', 'thud'], [B(T('yoxsa')), 'guess chip', 'click'],
  WH(S.B, 600, 2200), [B(T('Sovet')), 'SOVET', 'click'], [B(T('Azərbaycanda')), 'Baku pin', 'tick'], [B(T('neçə')), 'plane', 'whoosh', { len: 0.6, from: 300, to: 1200 }],
  [B(T('vyetnamlı')), 'VN pin', 'tick'], [B(T('oxuyub?')), 'cap', 'click'],
  WH(S.C, 2200, 600), [B(T('İpucu:')), 'İPUCU', 'thud'], [B(T('1959-cu')), 'year run', 'type', { len: 1.0, n: 10 }], [B(T('Ho')), 'Ho', 'thud'],
  [B(T('Bakıya')), 'BAKI', 'click'],
  WH(S.D, 600, 2200), [B(T('Üç!')), '3', 'tick'], [B(T('iki!')), '2', 'tick'], [B(T('bir!')), '1', 'tick'],
  [B(T('Təxminən') - 0.03), 'drop', 'whoosh', { len: 0.4, from: 1600, to: 400 }], [B(T('5 000!')), 'answer', 'thud'],
  WH(S.F, 2200, 600), [B(T('Tauda')), 'rig', 'thud'], [B(T('neftçi')), 'NEFTÇİ', 'click'], [B(T('Bakıda')), 'route', 'whoosh', { len: 0.5, from: 400, to: 1400 }],
  [B(T('oxuyub.')), 'diploma', 'tick'],
  WH(S.G, 600, 2200), [B(T('«Bakı»')), 'sign', 'thud'], [B(T('küçəsi')), 'KÜÇƏSİ', 'click'],
  WH(S.H, 2200, 600), [B(T('İlham')), 'silhouette', 'thud'], [B(T('12')), 'year run', 'type', { len: 0.5, n: 6 }], [B(T('sonra')), '12 İL', 'click'],
  [B(T('Vyetnamdadır.')), 'flags', 'thud'],
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
  const start = Math.floor((ws.length - 1) / 3) * 3, chunk = all.slice(start, start + 3), shown = ws.slice(start);
  let size = 100; const gap = 34;
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

// ---------------------------------------------------------------- props
function flagVN(ctx, x, y, w, k, wave = 0) {
  if (k <= 0) return; const h = w * 2 / 3;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(wave);
  rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.fillStyle = C.red; ctx.fill(); outline(ctx, 5);
  starPath(ctx, 0, h * 0.02, h * 0.3); ctx.fillStyle = C.star; ctx.fill(); ctx.restore();
}
function starPath(ctx, x, y, r) {
  ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.4 : r; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } ctx.closePath();
}
function answerCard(ctx, label, x, y, w, k, state = 0, rot = 0) {
  if (k <= 0) return; const h = w * 0.34;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  rrect(ctx, -w / 2 + 10, -h / 2 + 12, w, h, h * 0.25); ctx.fillStyle = 'rgba(28,26,34,0.85)'; ctx.fill();
  rrect(ctx, -w / 2, -h / 2, w, h, h * 0.25);
  ctx.fillStyle = state === 2 ? C.green : state === 1 ? C.gold : state === -1 ? C.paper2 : C.chalk; ctx.fill(); outline(ctx, 7);
  text(ctx, label, state === 2 ? -w * 0.08 : 0, h * 0.2, font(h * 0.58, 800, D), state === -1 ? C.mute : C.ink, 'center');
  if (state === 2) { ctx.save(); ctx.translate(w * 0.36, 0); ctx.lineWidth = h * 0.12; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = C.chalk;
    ctx.beginPath(); ctx.moveTo(-h * 0.18, 0); ctx.lineTo(-h * 0.04, h * 0.15); ctx.lineTo(h * 0.2, -h * 0.17); ctx.stroke(); ctx.restore(); }
  ctx.restore();
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
function plane(ctx, x, y, sz, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sz / 100, sz / 100);
  ctx.beginPath();
  ctx.moveTo(60, 0); ctx.quadraticCurveTo(56, -8, 40, -8); ctx.lineTo(10, -8); ctx.lineTo(-14, -52); ctx.lineTo(-28, -52); ctx.lineTo(-12, -8);
  ctx.lineTo(-40, -8); ctx.lineTo(-52, -26); ctx.lineTo(-62, -26); ctx.lineTo(-54, 0); ctx.lineTo(-62, 26); ctx.lineTo(-52, 26); ctx.lineTo(-40, 8);
  ctx.lineTo(-12, 8); ctx.lineTo(-28, 52); ctx.lineTo(-14, 52); ctx.lineTo(10, 8); ctx.lineTo(40, 8); ctx.quadraticCurveTo(56, 8, 60, 0); ctx.closePath();
  ctx.fillStyle = C.chalk; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
}
function cap(ctx, x, y, w, k, rot = 0) {   // graduation cap
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.beginPath(); ctx.moveTo(-w * 0.32, 0); ctx.lineTo(-w * 0.32, w * 0.22); ctx.quadraticCurveTo(0, w * 0.34, w * 0.32, w * 0.22); ctx.lineTo(w * 0.32, 0); ctx.closePath();
  ctx.fillStyle = C.sil; ctx.fill(); outline(ctx, 5);
  ctx.beginPath(); ctx.moveTo(0, -w * 0.25); ctx.lineTo(w * 0.55, 0); ctx.lineTo(0, w * 0.2); ctx.lineTo(-w * 0.55, 0); ctx.closePath(); ctx.fillStyle = '#2A2733'; ctx.fill(); outline(ctx, 5);
  ctx.strokeStyle = C.gold; ctx.lineWidth = w * 0.035; ctx.beginPath(); ctx.moveTo(0, -w * 0.02); ctx.lineTo(w * 0.42, w * 0.06); ctx.lineTo(w * 0.42, w * 0.34); ctx.stroke();
  ctx.fillStyle = C.gold; rrect(ctx, w * 0.38, w * 0.3, w * 0.08, w * 0.14, 4); ctx.fill();
  ctx.restore();
}
function bulb(ctx, x, y, r, k, glow) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  for (let i = 0; i < 8; i++) { const a = -Math.PI / 2 + (i - 3.5) * 0.4; const l0 = r * 1.3, l1 = r * (1.55 + 0.15 * glow);
    ctx.beginPath(); ctx.moveTo(Math.cos(a) * l0, Math.sin(a) * l0 - r * 0.2); ctx.lineTo(Math.cos(a) * l1, Math.sin(a) * l1 - r * 0.2); ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.strokeStyle = C.ink; ctx.stroke(); }
  ctx.beginPath(); ctx.arc(0, -r * 0.2, r, Math.PI * 0.8, Math.PI * 2.2); ctx.lineTo(r * 0.45, r * 0.95); ctx.lineTo(-r * 0.45, r * 0.95); ctx.closePath();
  ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 7);
  rrect(ctx, -r * 0.48, r * 0.95, r * 0.96, r * 0.42, 8); ctx.fillStyle = C.grey; ctx.fill(); outline(ctx, 6);
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
// silhouettes (rule 1g): dark recognisable outline, no facial features
function hoSil(ctx, x, y, sc, k, t) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y + (1 - Math.min(1, k)) * 260); ctx.scale(sc, sc);
  ctx.fillStyle = C.sil; ctx.strokeStyle = C.red; ctx.lineWidth = 6;
  // high-collar tunic
  ctx.beginPath(); ctx.moveTo(-170, 0); ctx.quadraticCurveTo(-165, -175, -40, -195); ctx.lineTo(40, -195); ctx.quadraticCurveTo(165, -175, 170, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = 'rgba(218,37,29,0.55)'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(0, -190); ctx.lineTo(0, 0); ctx.stroke();
  for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(0, -150 + i * 42, 6, 0, TAU); ctx.fillStyle = 'rgba(218,37,29,0.7)'; ctx.fill(); }
  ctx.fillStyle = C.sil; ctx.strokeStyle = C.red; ctx.lineWidth = 6;
  const bob = 3 * Math.sin(t * 3);
  ctx.save(); ctx.translate(0, bob);
  ctx.beginPath(); ctx.moveTo(-28, -192); ctx.lineTo(-24, -232); ctx.lineTo(24, -232); ctx.lineTo(28, -192); ctx.closePath(); ctx.fill();
  // ears
  for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sx * 58, -305, 16, 26, sx * 0.2, 0, TAU); ctx.fill(); ctx.stroke(); }
  // narrow head, high forehead
  ctx.beginPath(); ctx.ellipse(0, -312, 54, 80, 0, 0, TAU); ctx.fill(); ctx.stroke();
  // wispy goatee
  ctx.beginPath(); ctx.moveTo(-20, -248); ctx.quadraticCurveTo(-8, -205, 2, -168); ctx.quadraticCurveTo(10, -205, 20, -248); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -312, 50, 76, 0, 0, TAU); ctx.fill();
  ctx.restore(); ctx.restore();
}
function presSil(ctx, x, y, sc, k, t) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y + (1 - Math.min(1, k)) * 260); ctx.scale(sc, sc);
  ctx.fillStyle = C.sil; ctx.strokeStyle = C.teal; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(-180, 0); ctx.quadraticCurveTo(-175, -185, -40, -200); ctx.lineTo(40, -200); ctx.quadraticCurveTo(175, -185, 180, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  // shirt V, tie, lapels
  ctx.beginPath(); ctx.moveTo(-34, -198); ctx.lineTo(0, -110); ctx.lineTo(34, -198); ctx.closePath(); ctx.fillStyle = '#E9E4D8'; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-10, -186); ctx.lineTo(10, -186); ctx.lineTo(14, -120); ctx.lineTo(0, -100); ctx.lineTo(-14, -120); ctx.closePath(); ctx.fillStyle = C.blue; ctx.fill();
  ctx.strokeStyle = 'rgba(23,138,134,0.7)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-36, -196); ctx.lineTo(-70, -40); ctx.moveTo(36, -196); ctx.lineTo(70, -40); ctx.stroke();
  ctx.fillStyle = C.sil; ctx.strokeStyle = C.teal; ctx.lineWidth = 6;
  ctx.save(); ctx.translate(0, 2 * Math.sin(t * 3));
  ctx.beginPath(); ctx.moveTo(-30, -196); ctx.lineTo(-26, -236); ctx.lineTo(26, -236); ctx.lineTo(30, -196); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, -315, 64, 82, 0, 0, TAU); ctx.fill(); ctx.stroke();
  // short hair, side part
  ctx.beginPath(); ctx.ellipse(0, -352, 68, 52, 0, Math.PI * 1.02, TAU * 0.99); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -315, 60, 78, 0, 0, TAU); ctx.fill();
  ctx.strokeStyle = 'rgba(23,138,134,0.6)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-26, -398); ctx.quadraticCurveTo(-20, -380, -30, -362); ctx.stroke();
  ctx.restore(); ctx.restore();
}
function plate(ctx, label, x, y, k, col, size = 42) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.font = font(size, 800, D); const w = ctx.measureText(label).width + 50;
  rrect(ctx, -w / 2, -size * 0.9, w, size * 1.8, 12); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 5, col);
  text(ctx, label, 0, size * 0.36, font(size, 800, D), C.chalk, 'center'); ctx.restore();
}
function oilRig(ctx, x, y, w, k, t) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y + (1 - Math.min(1, k)) * 400); 
  const h = w * 1.2;
  ctx.lineWidth = 12; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
  for (const lx of [-0.38, -0.13, 0.13, 0.38]) { ctx.beginPath(); ctx.moveTo(lx * w, 0); ctx.lineTo(lx * w * 1.1, h * 0.38); ctx.stroke(); }
  ctx.lineWidth = 5; for (const [a, b] of [[-0.38, -0.13], [0.13, 0.38]]) { ctx.beginPath(); ctx.moveTo(a * w, h * 0.08); ctx.lineTo(b * w * 1.1, h * 0.3); ctx.moveTo(b * w, h * 0.08); ctx.lineTo(a * w * 1.1, h * 0.3); ctx.stroke(); }
  rrect(ctx, -w / 2, -h * 0.1, w, h * 0.12, 6); ctx.fillStyle = C.grey; ctx.fill(); outline(ctx, 6);
  rrect(ctx, -w * 0.45, -h * 0.25, w * 0.4, h * 0.15, 6); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 6);
  // derrick
  ctx.beginPath(); ctx.moveTo(w * 0.05, -h * 0.1); ctx.lineTo(w * 0.2, -h * 0.75); ctx.lineTo(w * 0.35, -h * 0.1); ctx.lineWidth = 9; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.lineWidth = 4; for (let i = 0; i < 5; i++) { const y0 = -h * 0.1 - i * h * 0.13, y1 = y0 - h * 0.13, f0 = 1 - i / 5.0, f1 = 1 - (i + 1) / 5.0;
    ctx.beginPath(); ctx.moveTo(w * 0.2 - w * 0.15 * f0, y0); ctx.lineTo(w * 0.2 + w * 0.15 * f1, y1); ctx.moveTo(w * 0.2 + w * 0.15 * f0, y0); ctx.lineTo(w * 0.2 - w * 0.15 * f1, y1); ctx.stroke(); }
  // flag on the derrick
  ctx.beginPath(); ctx.moveTo(w * 0.2, -h * 0.75); ctx.lineTo(w * 0.2, -h * 0.92); ctx.lineWidth = 5; ctx.stroke();
  flagVN(ctx, w * 0.2 + 52, -h * 0.87, 100, 1, 0.06 * Math.sin(t * 4));
  ctx.restore();
}
function sea(ctx, y0, t) {
  ctx.fillStyle = C.sea; ctx.fillRect(0, y0, W, H - y0);
  ctx.strokeStyle = 'rgba(255,253,246,0.55)'; ctx.lineWidth = 6; ctx.lineCap = 'round';
  for (let r = 0; r < 6; r++) { const yy = y0 + 40 + r * 70; ctx.beginPath();
    for (let x = -40; x <= W + 40; x += 20) ctx.lineTo(x, yy + 10 * Math.sin(x / 60 + t * 3 + r)); ctx.stroke(); }
}
function diploma(ctx, x, y, w, k, rot = 0) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  const h = w * 0.36;
  rrect(ctx, -w / 2, -h / 2, w, h, h / 2); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 6);
  for (const sx of [-1, 1]) { ctx.beginPath(); ctx.ellipse(sx * w / 2, 0, h * 0.22, h / 2, 0, 0, TAU); ctx.fillStyle = C.paper2; ctx.fill(); outline(ctx, 5); }
  ctx.fillStyle = C.red; ctx.fillRect(-h * 0.2, -h / 2, h * 0.4, h);
  ctx.beginPath(); ctx.moveTo(-h * 0.2, h / 2); ctx.lineTo(-h * 0.3, h * 0.9); ctx.lineTo(-h * 0.05, h * 0.75); ctx.lineTo(h * 0.05, h * 0.75); ctx.lineTo(h * 0.3, h * 0.9); ctx.lineTo(h * 0.2, h / 2); ctx.fill();
  ctx.restore();
}
function lamp(ctx, x, y, h) { ctx.save(); ctx.translate(x, y); ctx.lineWidth = Math.max(3, h * 0.03); ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -h); ctx.quadraticCurveTo(0, -h * 1.08, h * 0.15, -h * 1.05); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(h * 0.17, -h * 1.02, h * 0.07, h * 0.035, 0, 0, TAU); ctx.fillStyle = C.gold; ctx.fill(); ctx.stroke(); ctx.restore(); }
function tree(ctx, x, y, h) { ctx.save(); ctx.translate(x, y); ctx.fillStyle = '#5B4A33'; ctx.fillRect(-h * 0.03, -h * 0.5, h * 0.06, h * 0.5);
  ctx.beginPath(); ctx.arc(0, -h * 0.65, h * 0.26, 0, TAU); ctx.arc(-h * 0.17, -h * 0.55, h * 0.18, 0, TAU); ctx.arc(h * 0.17, -h * 0.55, h * 0.18, 0, TAU); ctx.fillStyle = '#4E9A5A'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore(); }

// ---------------------------------------------------------------- A: hook "500, 5 000, yoxsa 50 000?"
function sHook(ctx, t) {
  world(ctx, t, { zoom: Math.exp(0.04 * t) });
  // big "?" behind
  const kq = clamp(prog(t, 0, 0.3)); ctx.save(); ctx.globalAlpha = 0.16 * kq; text(ctx, '?', cx + 250, s.y + 1000, font(900, 800, D), C.red, 'center'); ctx.restore();
  // header: Vietnam → Azerbaijan
  flagVN(ctx, cx - 230, s.y + 255, 150, pop(t, 0.05), 0.04 * Math.sin(t * 4));
  flagAZ(ctx, cx + 230, s.y + 255, 150, pop(t, 0.2), -0.04 * Math.sin(t * 4));
  const ka = clamp(prog(t, 0.2, 0.6)); if (ka > 0) { ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 9; ctx.setLineDash([22, 16]); ctx.lineDashOffset = -t * 60;
    ctx.beginPath(); ctx.moveTo(cx - 130, s.y + 255); ctx.lineTo(cx - 130 + 220 * ka, s.y + 255); ctx.stroke(); ctx.restore();
    if (ka >= 1) plane(ctx, cx - 130 + ((t * 120) % 220), s.y + 255, 60, 0); }
  const labs = ['500', '5 000', '50 000'], ts = [0, T('5 000,') - 0.04, T('50 000?') - 0.04];
  const cur = t < ts[1] ? 0 : t < ts[2] ? 1 : 2;
  labs.forEach((l, i) => { const k = t < 0.3 && i === 0 ? lerp(1.4, 1, E.outBack(prog(t, 0, 0.3))) : pop(t, ts[i]);
    ctx.save(); shake(ctx, B(t), B(ts[i] + 0.02), 10, 4 + i, 0.18);
    answerCard(ctx, l, cx + [-40, 40, -20][i], s.y + 480 + i * 225, 640, k, i === cur ? 1 : 0, [-0.04, 0.03, -0.02][i]); ctx.restore(); });
  const kg = pop(t, T('yoxsa') - 0.05);
  if (kg > 0) { chip(ctx, 'Sənin cavabın?', cx - 40, s.y + 1105, 54, kg, { bg: C.red, fg: C.chalk, rot: -0.03 });
    ctx.save(); ctx.translate(cx + 270, s.y + 1105 + 8 * Math.sin(t * 9)); ctx.scale(kg, kg); ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.strokeStyle = C.ink;
    ctx.beginPath(); ctx.moveTo(0, -36); ctx.lineTo(0, 30); ctx.moveTo(-24, 8); ctx.lineTo(0, 32); ctx.lineTo(24, 8); ctx.stroke(); ctx.restore(); }
}

// ---------------------------------------------------------------- B: Soviet era, Vietnam → Azerbaijan, students
function sRoute(ctx, t) {
  world(ctx, t, { zoom: Math.exp(0.03 * (t - S.B)), tint: 1 });
  chip(ctx, 'SOVET DÖVRÜ', cx, s.y + 245, 52, pop(t, T('Sovet') - 0.05), { bg: C.red, fg: C.chalk, rot: -0.03 });
  const bx = s.x + 180, by = s.y + 600, vx = s.x + s.w - 170, vy = s.y + 1000;
  const c1 = [cx + 330, s.y + 520];
  const qd = (p) => { const a = (1 - p) * (1 - p), b = 2 * (1 - p) * p, c = p * p; return [a * vx + b * c1[0] + c * bx, a * vy + b * c1[1] + c * by]; };
  const kr = E.inOutCubic(prog(t, T('neçə') - 0.1, T('vyetnamlı') + 0.5));
  if (kr > 0) { ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 9; ctx.setLineDash([24, 18]); ctx.beginPath();
    for (let i = 0; i <= 40; i++) { const [x, y] = qd(i / 40 * kr); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore();
    const [px, py] = qd(kr), [qx, qy] = qd(Math.max(0, kr - 0.02)); if (kr < 1) plane(ctx, px, py, 110, Math.atan2(py - qy, px - qx)); }
  pin(ctx, bx, by, pop(t, T('Azərbaycanda') - 0.05), C.teal, 'BAKI', 1.45);
  flagAZ(ctx, bx + 20, by - 290, 190, pop(t, T('Azərbaycanda') + 0.05), 0.04 * Math.sin(t * 4));
  pin(ctx, vx, vy, pop(t, S.B + 0.05), C.red, 'VYETNAM', 1.45);
  flagVN(ctx, vx, vy - 290, 190, pop(t, T('vyetnamlı') - 0.05), -0.04 * Math.sin(t * 4));
  // students arriving: caps stack near Baku
  const kc = pop(t, T('oxuyub?') - 0.05);
  for (let i = 0; i < 3; i++) cap(ctx, bx + 230 + i * 150, by + 120 - (i % 2) * 40, 170, pop(t, T('oxuyub?') - 0.05 + i * 0.08), (i - 1) * 0.12);
  if (kc > 0) big(ctx, '?', cx - 60, s.y + 1060, 200, C.gold, kc, { sw: 0.08 });
}

// ---------------------------------------------------------------- C: clue — 1959, Ho Chi Minh came to Baku
function sClue(ctx, t) {
  world(ctx, t, { zoom: Math.exp(0.03 * (t - S.C)) });
  const kb = pop(t, T('İpucu:') - 0.08);
  const shrink = E.inOutCubic(prog(t, T('1959-cu') - 0.2, T('1959-cu') + 0.2));
  bulb(ctx, lerp(cx - 120, s.x + 110, shrink), lerp(s.y + 620, s.y + 280, shrink), lerp(130, 60, shrink), kb, Math.sin(t * 8));
  ctx.save(); shake(ctx, B(t), B(T('İpucu:')), 10, 7, 0.2);
  stamp(ctx, 'İPUCU', lerp(cx + 150, s.x + 300, shrink), lerp(s.y + 640, s.y + 290, shrink), lerp(110, 54, shrink), pop(t, T('İpucu:') - 0.02), { bg: C.gold, rot: -0.06 });
  ctx.restore();
  const yr = Math.min(1959, 1900 + Math.floor(59 * E.outCubic(prog(t, T('1959-cu') - 0.05, T('1959-cu') + 0.9))));
  calendar(ctx, s.x + s.w - 190, s.y + 345, 290, pop(t, T('1959-cu') - 0.1), 'İL', `${yr}`);
  hoSil(ctx, cx - 90, s.y + 1150, 1.05, sp(t, T('Ho') - 0.12, SPRING.snappy), t);
  plate(ctx, 'HO Şİ MİN', cx - 90, s.y + 640, pop(t, T('Min') - 0.06), C.red, 62);
  // arrival at Baku
  const kp = pop(t, T('Bakıya') - 0.06);
  pin(ctx, s.x + s.w - 130, s.y + 930, kp, C.teal, 'BAKI', 1.45);
  if (kp > 0) { ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 8; ctx.setLineDash([18, 14]); ctx.lineDashOffset = -t * 80;
    const q = clamp(prog(t, T('Bakıya'), T('Bakıya') + 0.4)); ctx.beginPath(); ctx.moveTo(cx + 110, s.y + 950); ctx.lineTo(lerp(cx + 110, s.x + s.w - 170, q), lerp(s.y + 950, s.y + 870, q)); ctx.stroke(); ctx.restore(); }
}

// ---------------------------------------------------------------- D: 3-2-1 countdown
function sCount(ctx, t) {
  world(ctx, t, { zoom: Math.exp(0.05 * (t - S.D)) });
  const marks = [T('Üç!'), T('iki!'), T('bir!')];
  let n = -1; marks.forEach((m, i) => { if (t >= m - 0.05) n = i; });
  const ring = clamp(prog(t, marks[0] - 0.05, T('Təxminən') - 0.05));
  const kr = Math.min(1.05, sp(t, S.D, SPRING.snappy));
  if (kr > 0) { ctx.save(); ctx.translate(cx, s.y + 470); ctx.scale(kr, kr);
    ctx.beginPath(); ctx.arc(0, 0, 250, 0, TAU); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 9);
    ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.strokeStyle = C.red;
    ctx.beginPath(); ctx.arc(0, 0, 215, -Math.PI / 2, -Math.PI / 2 + TAU * (1 - ring)); ctx.stroke();
    if (n >= 0) { const tn = marks[n], kk = Math.min(1.15, sp(t, tn - 0.05, SPRING.bouncy));
      ctx.save(); ctx.scale(kk, kk); text(ctx, `${3 - n}`, 0, 105, font(300, 800, D), C.ink, 'center'); ctx.restore(); }
    ctx.restore(); }
  // the three answers waiting; a highlight hops between them
  const hop = Math.floor((t - S.D) * 5) % 3;
  ['500', '5 000', '50 000'].forEach((l, i) => answerCard(ctx, l, cx, s.y + 830 + i * 135, 420, pop(t, S.D + 0.05 + i * 0.07), hop === i ? 1 : 0, (i - 1) * 0.02));
}

// ---------------------------------------------------------------- E: reveal ~5 000
function sReveal(ctx, t) {
  world(ctx, t, { zoom: Math.exp(0.05 * (t - S.D)) });
  const tr = T('5 000!') - 0.05;
  const go = E.inOutCubic(prog(t, tr - 0.2, tr + 0.15));
  ['500', '5 000', '50 000'].forEach((l, i) => {
    if (i === 1) return;
    const fall = E.inCubic(prog(t, tr, tr + 0.6));
    answerCard(ctx, l, cx + (i - 1) * 60 * fall, s.y + 830 + i * 135 + fall * 700, 420, 1, t > tr ? -1 : 0, (i - 1) * (0.02 + fall * 0.6));
  });
  if (t > tr) for (let i = 0; i < 36; i++) { const q = prog(t, tr + hash01(i, 2) * 0.15, tr + 1.2 + hash01(i, 2) * 0.3); if (q <= 0 || q >= 1) continue;
    const a = -Math.PI / 2 + (hash01(i, 3) - 0.5) * 2.8, v = 420 + 380 * hash01(i, 4);
    const x = cx + Math.cos(a) * v * q, y = s.y + 720 + Math.sin(a) * v * q + 800 * q * q;
    ctx.save(); ctx.translate(x, y); ctx.rotate(q * 9 * (hash01(i, 5) - 0.5)); ctx.globalAlpha = 1 - q;
    ctx.fillStyle = [C.red, C.star, '#00B5E2', '#509E2F'][i % 4]; ctx.fillRect(-12, -6, 24, 12); ctx.restore(); }
  const kk = t < tr ? 1 : 1 + 0.25 * Math.exp(-(t - tr) * 6) * Math.cos((t - tr) * 18);
  ctx.save(); shake(ctx, B(t), B(tr + 0.05), 14, 9, 0.2);
  answerCard(ctx, '5 000', cx, lerp(s.y + 965, s.y + 700, go), lerp(420, 760, go), kk, t > tr ? 2 : 1, 0);
  ctx.restore();
  stamp(ctx, 'TƏXMİNƏN', cx, s.y + 440, 74, pop(t, T('Təxminən') - 0.03), { bg: C.gold, rot: -0.05 });
  chip(ctx, 'VYETNAMLI TƏLƏBƏ', cx, s.y + 990, 56, pop(t, tr + 0.25), { bg: C.chalk, rot: 0.03 });
}

// ---------------------------------------------------------------- F: Vung Tau oil workers studied in Baku
function sRig(ctx, t) {
  world(ctx, t, { zoom: 1 });
  const pan = E.inOutCubic(prog(t, S.F, S.G)) * 60;
  ctx.save(); ctx.translate(-pan, 0);
  sea(ctx, s.y + 820, t);
  oilRig(ctx, cx - 110, s.y + 825, 450, sp(t, T('Tauda') - 0.12, SPRING.snappy), t);
  ctx.restore();
  pin(ctx, s.x + 140, s.y + 470, pop(t, T('Vunq') - 0.06), C.red, 'VUNQ TAU', 1.3);
  stamp(ctx, 'NEFTÇİLƏR', cx + 150, s.y + 1060, 70, pop(t, T('neftçi') - 0.05), { bg: C.gold, rot: 0.04 });
  // route to Baku diploma
  const kd = pop(t, T('Bakıda') - 0.05);
  const q = clamp(prog(t, T('Bakıda') - 0.05, T('Bakıda') + 0.4));
  if (q > 0) { ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 8; ctx.setLineDash([18, 14]); ctx.lineDashOffset = -t * 80;
    ctx.beginPath(); ctx.moveTo(cx - 60, s.y + 450); ctx.quadraticCurveTo(cx + 200, s.y + 280, lerp(cx - 60, s.x + s.w - 130, q), lerp(s.y + 450, s.y + 470, q)); ctx.stroke(); ctx.restore(); }
  pin(ctx, s.x + s.w - 130, s.y + 560, kd, C.teal, 'BAKI', 1.3);
  diploma(ctx, s.x + s.w - 150, s.y + 760, 230, pop(t, T('oxuyub.') - 0.05), -0.12);
  cap(ctx, s.x + s.w - 160, s.y + 300, 140, pop(t, T('oxuyub.') + 0.05), 0.1);
}

// ---------------------------------------------------------------- G: a "Baku" street in Vung Tau
function sStreet(ctx, t) {
  world(ctx, t);
  const hy = s.y + 620;
  // road in perspective, moving forward
  ctx.fillStyle = '#5E5A63'; ctx.beginPath(); ctx.moveTo(cx - 40, hy); ctx.lineTo(cx + 40, hy); ctx.lineTo(W + 200, H); ctx.lineTo(-200, H); ctx.closePath(); ctx.fill();
  ctx.fillStyle = C.chalk; for (let i = 0; i < 8; i++) { const p = ((i + (t * 1.6) % 1) / 8), y = hy + (H - hy) * p * p, w = 6 + 30 * p * p, h = 10 + 90 * p * p; ctx.fillRect(cx - w / 2, y, w, h); }
  for (let i = 0; i < 6; i++) { const p = ((i + (t * 1.6) % 1) / 6), pp = p * p, y = hy + (H - hy) * pp, sz = 40 + 520 * pp;
    tree(ctx, cx - 60 - (cx + 160) * pp, y, sz); lamp(ctx, cx + 60 + (cx + 160) * pp, y, sz * 0.9); }
  // street sign
  const ks = Math.min(1.06, sp(t, T('«Bakı»') - 0.1, SPRING.bouncy));
  if (ks > 0) { ctx.save(); ctx.translate(cx + 20, s.y + 1060); ctx.rotate(0.03 * Math.sin((t - T('«Bakı»')) * 8) * Math.exp(-(t - T('«Bakı»')) * 2)); ctx.scale(ks, ks);
    ctx.fillStyle = '#3A3742'; ctx.fillRect(-12, -330, 24, 520); outline(ctx, 0);
    rrect(ctx, -270, -520, 540, 220, 22); ctx.fillStyle = C.blue; ctx.fill(); outline(ctx, 8);
    rrect(ctx, -250, -500, 500, 180, 14); ctx.lineWidth = 6; ctx.strokeStyle = C.chalk; ctx.stroke();
    text(ctx, 'BAKU', 0, -370, font(130, 800, D), C.chalk, 'center');
    ctx.restore(); }
  chip(ctx, '«BAKI» KÜÇƏSİ', cx, s.y + 250, 58, pop(t, T('küçəsi') - 0.05), { bg: C.gold, rot: -0.03 });
  chip(ctx, 'VUNQ TAU, VYETNAM', cx, s.y + 1090, 48, pop(t, S.G + 0.1), { bg: C.chalk, rot: 0.02 });
}

// ---------------------------------------------------------------- H: President Ilham Aliyev in Vietnam again after 12 years
function sVisit(ctx, t) {
  world(ctx, t, { zoom: Math.exp(0.025 * (t - S.H)) });
  presSil(ctx, cx - 140, s.y + 1160, 1.2, sp(t, S.H + 0.02, SPRING.snappy), t);
  plate(ctx, 'PREZİDENT', cx - 140, s.y + 470, pop(t, T('Prezident') + 0.05), C.teal, 40);
  plate(ctx, 'İLHAM ƏLİYEV', cx - 140, s.y + 565, pop(t, T('İlham') - 0.05), C.teal, 50);
  const yr = 2014 + Math.floor(12 * E.outCubic(prog(t, T('12') - 0.05, T('12') + 0.5)));
  calendar(ctx, s.x + s.w - 170, s.y + 440, 260, pop(t, T('12') - 0.12), 'İL', `${yr}`, C.teal);
  stamp(ctx, '12 İL SONRA', s.x + s.w - 190, s.y + 655, 50, pop(t, T('sonra') - 0.05), { bg: C.gold, rot: 0.06 });
  const kf = pop(t, T('Vyetnamdadır.') - 0.08);
  ctx.save(); shake(ctx, B(t), B(T('Vyetnamdadır.')), 8, 3, 0.2);
  flagAZ(ctx, s.x + s.w - 230, s.y + 860, 190, kf, -0.08 + 0.04 * Math.sin(t * 4));
  flagVN(ctx, s.x + s.w - 120, s.y + 960, 190, pop(t, T('Vyetnamdadır.') + 0.02), 0.08 - 0.04 * Math.sin(t * 4));
  ctx.restore();
  chip(ctx, 'RƏSMİ SƏFƏR · 19–21 NOYABR', cx, s.y + 250, 42, pop(t, T('yenidən') - 0.05), { bg: C.chalk, rot: -0.02 });
  // plane landing
  const q = prog(t, T('yenidən') - 0.3, T('Vyetnamdadır.') + 0.4);
  if (q > 0 && q < 1) { const x = lerp(s.x - 100, s.x + s.w - 200, E.outCubic(q)), y = lerp(s.y + 380, s.y + 700, E.inOutCubic(q)); plane(ctx, x, y, 120, 0.35 * (1 - q)); }
}

// ---------------------------------------------------------------- I: end card
function sEnd(ctx, t) {
  world(ctx, t, { zoom: Math.exp(0.02 * (t - S.I)) });
  const t0 = S.I;
  flagVN(ctx, cx - 230, s.y + 360, 210, pop(t, t0 - 0.1), 0.05 * Math.sin(t * 4));
  flagAZ(ctx, cx + 230, s.y + 360, 210, pop(t, t0), -0.05 * Math.sin(t * 4));
  answerCard(ctx, '≈ 5 000', cx, s.y + 620, 520, pop(t, t0 + 0.1), 2, -0.03);
  text(ctx, '@bilirdinizmi_az', cx, s.y + 830, font(76, 800, D), C.ink, 'center');
  const kB = pop(t, T('Bəyən') - 0.05), kI = pop(t, T('izlə') - 0.05);
  if (kB > 0) { ctx.save(); ctx.translate(cx - 215, s.y + 990); ctx.scale(kB, kB); ctx.rotate(-0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 6);
    const hb = 1 + 0.12 * Math.max(0, Math.sin((t - T('Bəyən')) * 9)) * Math.exp(-(t - T('Bəyən')) * 2);
    ctx.save(); ctx.translate(-110, 4); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30);
    ctx.fillStyle = '#E8384F'; ctx.fill(); ctx.restore();
    text(ctx, 'BƏYƏN', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  if (kI > 0) { ctx.save(); ctx.translate(cx + 215, s.y + 990); ctx.scale(kI, kI); ctx.rotate(0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 6);
    ctx.save(); ctx.translate(-115, 4); ctx.lineWidth = 12; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'İZLƏ', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  chip(ctx, 'hər gün bilmədiyin bir fakt', cx, s.y + 1150, 46, pop(t, T('hər') - 0.05), { bg: C.panel, fg: C.chalk, edge: C.red, rot: -0.02 });
  const kS = pop(t, T('fakt!') + 0.25);
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 1270); ctx.scale(kS, kS);
    const msg = 'Cavabını bilən dostuna göndər';
    ctx.font = font(42, 800, UI); const w = ctx.measureText(msg).width + 150;
    rrect(ctx, -w / 2, -46, w, 92, 30); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 5);
    envelope(ctx, -w / 2 + 62, 0, 62); text(ctx, msg, 38, 15, font(42, 800, UI), C.ink, 'center'); ctx.restore(); }
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 700, UI), font(40, 600, UI)],
  hits: HITS,
  draw(ctx, u, t) {
    const seq = [[0, sHook], [S.B, sRoute], [S.C, sClue], [S.D, sCount], [S.E, sReveal], [S.F, sRig], [S.G, sStreet], [S.H, sVisit], [S.I, sEnd]];
    let j = 1; while (j < seq.length && t >= seq[j][0] + 0.2) j++;
    if (j >= seq.length) sEnd(ctx, t);
    else if (seq[j][1] === sReveal) (t < seq[j][0] ? sCount : sReveal)(ctx, t);
    else whip(ctx, t, seq[j][0], () => seq[j - 1][1](ctx, t), () => seq[j][1](ctx, t), j === seq.length - 1 ? 0.36 : 0.3);
    if (t < S.I - 0.2) bug(ctx, t);
    captions(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 220; i++) { ctx.fillStyle = `rgba(60,40,20,${0.03 + 0.03 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
