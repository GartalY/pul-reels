// "13 il gözlənilən GTA VI" — @bilirdinizmi_az 18:30 animated reel, 19 Nov 2026. Pure function of time.
// GTA VI released 19 Nov 2026 after ~13 years (GTA V 2013); early Metacritic 99 ties the all-time record (Ocarina of Time,
// 1998); Alim Qasımov + Fərqanə Qasımova sing a cover of Nelly Furtado's "Say It Right" on the in-game radio
// (Kotaku, GamesRadar, oxu.az, axar.az, ednews). Arif voice (ElevenLabs) on audio/vo.wav; every word/number timed to
// Scribe word starts. Night "neon coast" world (synth sun, palms, neon grid). No game logos; public figures = silhouettes
// with name plates. No music; soft SFX only.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = __TIMING__;
const C = {
  night: '#120822', purple: '#2A1250', violet: '#4B1E7A', pink: '#FF3D8B', teal: '#2FE6D6', sun: '#FFB347',
  gold: '#FFD23F', chalk: '#F6F1E6', ink: '#0A0610', panel: '#1C1233', panel2: '#2E2150', mute: '#B9AECF', sil: '#06030C',
  green: '#3DDC84',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));

const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const END = TIMING.dur + 1.3;
const S = { A: 0, B: T('Oyun') - 0.12, C: T('Tənqidçilər') - 0.12, D: T('Bu') - 0.12, E: T('Oyunun') - 0.12,
  F: T('Onlar') - 0.12, G: T('İndi') - 0.12, H: T('Bəyən') - 0.12 };
const B = (t) => t / 0.5;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.3, from, to }];

// progress strip stops
const STOPS = [['13 İL', 0.1], ['99', T('doqquz')], ['AZ SƏSİ', T('Alim')], ['MİLYONLAR', T('milyonlarla')]];

const HITS = [
  [B(0.02), '13 İL', 'thud'], ...Array.from({ length: 6 }, (_, i) => [B(0.15 + i * 0.16), `year ${i}`, 'tick']),
  [B(T('GTA') - 0.05), 'game case', 'whoosh', { len: 0.35, from: 500, to: 1800 }], [B(T('VI-da')), 'VI', 'thud'],
  [B(T('Azərbaycan') - 0.04), 'gift', 'click'], [B(T('sürprizi')), 'lid pop', 'click'], [B(T('var!')), 'flag', 'tick'],
  WH(S.B, 600, 2200), [B(T('bu gün')), 'calendar', 'click'], [B(T('çıxdı.')), 'ÇIXDI', 'thud'],
  WH(S.C, 2200, 600), ...Array.from({ length: 5 }, (_, i) => [B(T('Tənqidçilər') + 0.05 + i * 0.12), `review ${i}`, 'tick']),
  [B(T('yüz')), '/100', 'click'], [B(T('doxsan') - 0.02), 'gauge run', 'type', { len: 0.7, n: 8 }], [B(T('doqquz') + 0.12), '99', 'thud'],
  WH(S.D, 600, 2200), [B(T('hələlik')), 'HƏLƏLİK', 'click'], [B(T('tarixinin') - 0.05), '1998 column', 'whoosh', { len: 0.4, from: 400, to: 1400 }],
  [B(T('rekordu') - 0.05), 'GTA column', 'whoosh', { len: 0.4, from: 400, to: 1400 }], [B(T('bərabərdir.')), '=', 'thud'],
  WH(S.E, 2200, 600), [B(T('radiosunda')), 'dial', 'type', { len: 0.6, n: 6 }], [B(T('Alim')), 'Alim', 'thud'], [B(T('qızı')), 'QIZI', 'click'],
  [B(T('Fərqanə')), 'Fərqanə', 'thud'], [B(T('oxuyur.')), 'notes', 'tick'],
  WH(S.F, 600, 2200), [B(T('Nelli')), 'Nelli plate', 'click'], [B(T('«Say')), 'record drop', 'thud'], [B(T('ifa')), 'speakers', 'click'],
  WH(S.G, 2200, 600), [B(T('milyonlarla') - 0.05), 'grid fill', 'type', { len: 0.9, n: 12 }], [B(T('oyunçu')), 'OYUNÇU', 'click'], [B(T('eşidəcək.')), 'wave', 'whoosh', { len: 0.5, from: 300, to: 1200 }],
  WH(S.H, 600, 2200), [B(T('Bəyən')), 'BƏYƏN', 'click'], [B(T('izlə')), 'İZLƏ', 'thud'], [B(T('fakt!') + 0.3), 'send line', 'tick'],
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


// ---------------------------------------------------------------- world: neon coast at night
function palm(ctx, x, y, h, lean, t, ph) {
  ctx.save(); ctx.translate(x, y);
  ctx.strokeStyle = C.sil; ctx.lineCap = 'round'; ctx.lineWidth = h * 0.045;
  const tx = lean * h, ty = -h;
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(lean * h * 0.2, -h * 0.6, tx, ty); ctx.stroke();
  ctx.fillStyle = C.sil;
  for (let i = 0; i < 7; i++) {
    const a = -Math.PI / 2 + (i - 3) * 0.55 + 0.05 * Math.sin(t * 1.4 + ph + i);
    const len = h * (0.42 + 0.08 * (i % 2));
    ctx.save(); ctx.translate(tx, ty); ctx.rotate(a);
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(len * 0.5, -len * 0.18, len, len * 0.28);
    ctx.quadraticCurveTo(len * 0.5, len * 0.02, 0, 0); ctx.fill(); ctx.restore();
  }
  ctx.restore();
}
function world(ctx, t, { glow = 0 } = {}) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, C.night); g.addColorStop(0.45, C.purple); g.addColorStop(0.62, '#7A2A6E'); g.addColorStop(0.64, '#1A0B2E'); g.addColorStop(1, '#0B0518');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 40; i++) { const x = hash01(i, 71) * W, y = hash01(i, 72) * H * 0.5, a = 0.25 + 0.35 * Math.abs(Math.sin(t * 1.5 + i));
    ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fillRect(x, y, 3, 3); }
  // striped synth sun on the horizon
  const hy = H * 0.63, sr = 300;
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, hy); ctx.clip();
  const sg = ctx.createLinearGradient(0, hy - sr, 0, hy); sg.addColorStop(0, C.gold); sg.addColorStop(1, C.pink);
  ctx.globalAlpha = 0.55 + 0.25 * glow;
  ctx.beginPath(); ctx.arc(cx, hy, sr, Math.PI, TAU); ctx.fillStyle = sg; ctx.fill();
  ctx.globalAlpha = 1; ctx.fillStyle = C.purple;
  for (let i = 0; i < 6; i++) { const yy = hy - 30 - i * 42 + ((t * 20) % 42); ctx.fillRect(cx - sr, yy, sr * 2, 6 + i * 0.6); }
  ctx.restore();
  // neon grid floor
  ctx.strokeStyle = 'rgba(255,61,139,0.45)'; ctx.lineWidth = 3;
  for (let i = -12; i <= 12; i++) { ctx.beginPath(); ctx.moveTo(cx + i * 40, hy); ctx.lineTo(cx + i * 260, H); ctx.stroke(); }
  for (let i = 0; i < 10; i++) { const p = ((i + (t * 0.9) % 1) / 10), y = hy + (H - hy) * p * p; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.fillStyle = 'rgba(47,230,214,0.9)'; ctx.fillRect(0, hy - 2, W, 4);
  palm(ctx, s.x - 30, hy + 10, 430, 0.22, t, 0); palm(ctx, s.x + 90, hy + 10, 300, 0.12, t, 1.3);
  palm(ctx, s.x + s.w + 30, hy + 10, 460, -0.24, t, 2.1); palm(ctx, s.x + s.w - 100, hy + 10, 280, -0.1, t, 0.7);
}

// ---------------------------------------------------------------- persistent progress strip
function bug(ctx, t) {
  const k = clamp(prog(t, 0.2, 0.55)); if (k <= 0) return;
  const y = s.y + s.h - 30, x0 = cx - 400, w = 800;
  ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 60);
  rrect(ctx, x0, y - 44, w, 88, 16); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 4, C.teal);
  const xs = [x0 + 90, x0 + 230, x0 + 420, x0 + 650];
  let last = -1; STOPS.forEach(([, ft], i) => { if (t >= ft) last = i; });
  STOPS.forEach(([lab, ft], i) => {
    const on = t >= ft, bmp = on ? 1 + 0.4 * Math.exp(-(t - ft) * 7) : 1;
    ctx.save(); ctx.translate(xs[i], y); ctx.scale(bmp, bmp);
    text(ctx, lab, 0, 14, font(38, 800, D), i === last ? C.gold : on ? C.chalk : 'rgba(185,174,207,0.35)', 'center'); ctx.restore();
    if (i < 3) text(ctx, '›', (xs[i] + xs[i + 1]) / 2 + [8, -25, -15][i], y + 12, font(40, 800, D), 'rgba(185,174,207,0.6)', 'center');
  });
  ctx.restore();
}

// generic game case (no logo art): dark case, neon band, plain title text
function gameCase(ctx, x, y, w, k, rot = 0, glow = 0) {
  if (k <= 0) return; const h = w * 1.3;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  if (glow > 0) { ctx.beginPath(); ctx.arc(0, 0, w * 1.05, 0, TAU); ctx.fillStyle = `rgba(255,61,139,${0.22 * glow})`; ctx.fill(); }
  rrect(ctx, -w / 2, -h / 2, w, h, 18); ctx.fillStyle = '#17102A'; ctx.fill(); outline(ctx, 8);
  ctx.save(); rrect(ctx, -w / 2, -h / 2, w, h, 18); ctx.clip();
  const g = ctx.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, C.pink); g.addColorStop(1, C.sun);
  ctx.fillStyle = g; ctx.fillRect(-w / 2, -h * 0.18, w, h * 0.5);
  ctx.fillStyle = C.ink; ctx.fillRect(-w / 2, -h / 2, w, h * 0.1);
  palm(ctx, -w * 0.28, h * 0.33, h * 0.3, 0.15, 0, 0); palm(ctx, w * 0.3, h * 0.33, h * 0.25, -0.15, 0, 1);
  ctx.restore();
  text(ctx, 'GTA', 0, -h * 0.25, font(w * 0.26, 800, D), C.chalk, 'center');
  big(ctx, 'VI', 0, h * 0.13, w * 0.42, C.chalk, 1, { stroke: C.ink, sw: 0.08 });
  ctx.restore();
}
function giftBox(ctx, x, y, w, k, open, t) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  const h = w * 0.8;
  if (open > 0) { // light + flag rising out
    ctx.save(); ctx.globalAlpha = Math.min(1, open);
    ctx.fillStyle = 'rgba(255,210,63,0.25)'; ctx.beginPath(); ctx.moveTo(-w * 0.4, -h / 2); ctx.lineTo(w * 0.4, -h / 2); ctx.lineTo(w * 0.8, -h * 1.8); ctx.lineTo(-w * 0.8, -h * 1.8); ctx.closePath(); ctx.fill();
    ctx.restore();
    flagAZ(ctx, 0, -h / 2 - lerp(0, h * 0.75, E.outBack(clamp(open))), w * 0.85, Math.min(1, open), 0.05 * Math.sin(t * 5));
  }
  rrect(ctx, -w / 2, -h / 2, w, h, 10); ctx.fillStyle = C.teal; ctx.fill(); outline(ctx, 7);
  ctx.fillStyle = C.pink; ctx.fillRect(-w * 0.08, -h / 2, w * 0.16, h); ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.strokeRect(-w * 0.08, -h / 2, w * 0.16, h);
  const lidY = -h / 2 - E.outCubic(clamp(open)) * h * 0.55, lr = open * 0.5;
  ctx.save(); ctx.translate(-w * 0.55, lidY); ctx.rotate(-lr); ctx.translate(w * 0.55, 0);
  rrect(ctx, -w * 0.58, -h * 0.22, w * 1.16, h * 0.24, 8); ctx.fillStyle = C.teal; ctx.fill(); outline(ctx, 7);
  ctx.fillStyle = C.pink; ctx.fillRect(-w * 0.09, -h * 0.22, w * 0.18, h * 0.24);
  ctx.beginPath(); ctx.ellipse(-w * 0.14, -h * 0.3, w * 0.14, h * 0.1, -0.5, 0, TAU); ctx.ellipse(w * 0.14, -h * 0.3, w * 0.14, h * 0.1, 0.5, 0, TAU); ctx.fill(); ctx.lineWidth = 5; ctx.stroke();
  ctx.restore();
  if (open <= 0) text(ctx, '?', 0, h * 0.22, font(w * 0.45, 800, D), C.ink, 'center');
  ctx.restore();
}

// ---------------------------------------------------------------- A: hook "13 il gözlənilən GTA VI-da Azərbaycan sürprizi var!"
function sHook(ctx, t) {
  world(ctx, t, { glow: prog(t, 1.2, 1.6) });
  const lift = E.inOutCubic(prog(t, T('GTA') - 0.3, T('GTA') + 0.1));
  ctx.save(); shake(ctx, B(t), B(0.02), 18, 5, 0.25);
  const k0 = t < 0.35 ? lerp(1.5, 1, E.outBack(prog(t, 0, 0.35))) : 1;
  big(ctx, '13 İL', lerp(cx, cx - 180, lift), lerp(s.y + 560, s.y + 330, lift), lerp(300, 150, lift), C.gold, k0, { sw: 0.06 });
  ctx.restore();
  // year counter 2013 → 2026 (GTA V came out in 2013)
  const yr = Math.min(2026, 2013 + Math.floor(13 * E.outCubic(prog(t, 0.12, 1.1))));
  const kc = pop(t, 0.1);
  if (kc > 0) { const yy = lerp(s.y + 720, s.y + 330, lift), xx = lerp(cx, cx + 230, lift);
    ctx.save(); ctx.translate(xx, yy - 40); ctx.scale(kc * lerp(1, 0.8, lift), kc * lerp(1, 0.8, lift));
    rrect(ctx, -150, -70, 300, 140, 18); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 6);
    ctx.fillStyle = C.pink; rrect(ctx, -150, -70, 300, 40, 18); ctx.fill();
    for (const dx of [-80, 80]) { ctx.beginPath(); ctx.arc(dx, -70, 10, 0, TAU); ctx.fillStyle = C.ink; ctx.fill(); }
    text(ctx, `${yr}`, 0, 52, font(74, 800, D), C.ink, 'center'); ctx.restore();
    if (lift <= 0) chip(ctx, '2013 → 2026', cx, s.y + 860, 44, pop(t, 0.5), { bg: C.teal, rot: 0.03 }); }
  // game case slides in
  const kg = sp(t, T('GTA') - 0.08, SPRING.bouncy);
  if (kg > 0) { const x = lerp(-300, cx - 150, Math.min(1, kg));
    gameCase(ctx, x, s.y + 760, 300, 1, lerp(-0.4, -0.06, Math.min(1, kg)), prog(t, T('VI-da'), T('VI-da') + 0.3)); }
  // gift box with the AZ surprise
  const kb = pop(t, T('Azərbaycan') - 0.06);
  giftBox(ctx, cx + 220, s.y + 900, 240, kb, prog(t, T('sürprizi') - 0.02, T('sürprizi') + 0.45) * 1.0, t);
  chip(ctx, 'AZƏRBAYCAN SÜRPRİZİ', cx, s.y + 1085, 50, pop(t, T('var!') - 0.08), { bg: C.gold, rot: -0.03 });
  if (t > T('var!')) for (let i = 0; i < 30; i++) { const tq = T('var!'), q = prog(t, tq + hash01(i, 2) * 0.2, tq + 1.2 + hash01(i, 2) * 0.3); if (q <= 0 || q >= 1) continue;
    const a = -Math.PI / 2 + (hash01(i, 3) - 0.5) * 2.6, v = 380 + 360 * hash01(i, 4);
    const x = cx + 220 + Math.cos(a) * v * q, y = s.y + 700 + Math.sin(a) * v * q + 700 * q * q;
    ctx.save(); ctx.translate(x, y); ctx.rotate(q * 9 * (hash01(i, 5) - 0.5)); ctx.globalAlpha = 1 - q;
    ctx.fillStyle = ['#00B5E2', '#EF3340', '#509E2F', C.gold][i % 4]; ctx.fillRect(-11, -6, 22, 12); ctx.restore(); }
}

// ---------------------------------------------------------------- B: "Oyun bu gün çıxdı."
function sOut(ctx, t) {
  world(ctx, t, { glow: 0.6 });
  const kc = Math.min(1.05, sp(t, S.B - 0.15, SPRING.bouncy));
  const flip = E.inOutCubic(prog(t, T('bu gün') - 0.1, T('bu gün') + 0.15));
  if (kc > 0) { ctx.save(); ctx.translate(cx, s.y + 640); ctx.scale(kc, kc); ctx.rotate(-0.03);
    rrect(ctx, -260, -260, 520, 520, 30); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 8);
    ctx.save(); rrect(ctx, -260, -260, 520, 520, 30); ctx.clip(); ctx.fillStyle = C.pink; ctx.fillRect(-260, -260, 520, 130); ctx.restore();
    for (const dx of [-140, 140]) { rrect(ctx, dx - 14, -290, 28, 70, 10); ctx.fillStyle = C.ink; ctx.fill(); }
    text(ctx, 'NOYABR 2026', 0, -175, font(56, 800, UI), C.chalk, 'center');
    text(ctx, flip > 0.5 ? '19' : '18', 0, 140, font(300, 800, D), C.ink, 'center');
    if (flip > 0 && flip < 1) { // the old page tearing away
      ctx.save(); ctx.translate(0, -130); ctx.rotate(-flip * 1.2); ctx.translate(flip * 300, flip * 500); ctx.globalAlpha = 1 - flip;
      rrect(ctx, -260, 0, 520, 390, 20); ctx.fillStyle = '#E6DFD0'; ctx.fill(); outline(ctx, 6); ctx.restore(); }
    ctx.restore(); }
  chip(ctx, 'BU GÜN', cx - 210, s.y + 330, 50, pop(t, T('bu gün') - 0.05), { bg: C.teal, rot: -0.06 });
  const ks = pop(t, T('çıxdı.') - 0.04);
  ctx.save(); shake(ctx, B(t), B(T('çıxdı.')), 12, 6, 0.2);
  stamp(ctx, 'ÇIXDI!', cx + 70, s.y + 1010, 110, ks, { bg: C.gold, rot: -0.08 }); ctx.restore();
  gameCase(ctx, cx + 300, s.y + 380, 150, pop(t, S.B + 0.1), 0.12);
}

// ---------------------------------------------------------------- C: critics → 99 / 100
function reviewCard(ctx, x, y, w, k, rot) {
  if (k <= 0) return; const h = w * 1.25;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  rrect(ctx, -w / 2, -h / 2, w, h, 10); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 5);
  ctx.fillStyle = 'rgba(10,6,16,0.35)'; for (let i = 0; i < 5; i++) ctx.fillRect(-w * 0.36, -h * 0.28 + i * h * 0.13, w * (i === 4 ? 0.4 : 0.72), h * 0.05);
  ctx.fillStyle = C.pink; ctx.fillRect(-w * 0.36, -h * 0.42, w * 0.5, h * 0.08);
  ctx.restore();
}
function sScore(ctx, t) {
  world(ctx, t, { glow: 0.8 });
  chip(ctx, 'TƏNQİDÇİLƏR', cx, s.y + 270, 54, pop(t, T('Tənqidçilər') - 0.05), { bg: C.teal, rot: -0.03 });
  const gx = cx, gy = s.y + 700, R = 290;
  const run = E.outCubic(prog(t, T('doxsan') - 0.02, T('doqquz') + 0.12));
  const val = Math.round(99 * run);
  const kg = Math.min(1.04, sp(t, S.C, SPRING.snappy));
  // review cards fly into the gauge
  for (let i = 0; i < 5; i++) { const t0 = T('Tənqidçilər') + 0.05 + i * 0.12, q = E.inOutCubic(prog(t, t0 + 0.25, t0 + 0.75));
    const sx = s.x + 80 + i * (s.w - 160) / 4, sy = s.y + 420;
    if (t < t0 || q >= 1) continue;
    reviewCard(ctx, lerp(sx, gx, q), lerp(sy, gy, q), 110, pop(t, t0) * (1 - q * 0.8), (i - 2) * 0.12 * (1 - q)); }
  if (kg > 0) { ctx.save(); ctx.translate(gx, gy); ctx.scale(kg, kg);
    ctx.beginPath(); ctx.arc(0, 0, R + 30, 0, TAU); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 8, C.ink);
    ctx.lineCap = 'round'; ctx.lineWidth = 46; ctx.strokeStyle = 'rgba(185,174,207,0.2)';
    ctx.beginPath(); ctx.arc(0, 0, R - 20, Math.PI * 0.75, Math.PI * 2.25); ctx.stroke();
    ctx.strokeStyle = val >= 99 ? C.green : C.gold;
    if (val > 0) { ctx.beginPath(); ctx.arc(0, 0, R - 20, Math.PI * 0.75, Math.PI * 0.75 + Math.PI * 1.5 * val / 100); ctx.stroke(); }
    const bp = t > T('doqquz') + 0.12 ? 1 + 0.25 * Math.exp(-(t - T('doqquz') - 0.12) * 7) : 1;
    ctx.save(); ctx.scale(bp, bp); text(ctx, `${val}`, 0, 70, font(230, 800, D), C.chalk, 'center'); ctx.restore();
    const k100 = pop(t, T('yüz') - 0.04);
    if (k100 > 0) { ctx.save(); ctx.translate(0, 175); ctx.scale(k100, k100); text(ctx, '/ 100', 0, 0, font(64, 800, UI), C.mute, 'center'); ctx.restore(); }
    ctx.restore(); }
  stamp(ctx, 'METACRITIC', cx, s.y + 1105, 50, pop(t, T('verib.') - 0.05), { bg: C.chalk, rot: 0.04 });
}

// ---------------------------------------------------------------- D: ties the all-time record (1998)
function column(ctx, x, base, w, h, col, label, sub, k) {
  if (k <= 0) return;
  const hh = h * Math.min(1, k);
  rrect(ctx, x - w / 2, base - hh, w, hh, 14); ctx.fillStyle = col; ctx.fill(); outline(ctx, 7);
  if (k > 0.6) { text(ctx, '99', x, base - hh + 110, font(120, 800, D), C.ink, 'center');
    text(ctx, label, x, base + 70, font(46, 800, D), C.chalk, 'center'); text(ctx, sub, x, base + 120, font(38, 600, UI), C.chalk, 'center'); }
}
function sRecord(ctx, t) {
  world(ctx, t, { glow: 0.5 });
  chip(ctx, 'OYUN TARİXİNİN REKORDU', cx, s.y + 270, 46, pop(t, T('Bu') - 0.02), { bg: C.chalk, rot: -0.02 });
  stamp(ctx, 'HƏLƏLİK', cx + 230, s.y + 390, 44, pop(t, T('hələlik') - 0.04), { bg: C.teal, rot: 0.08 });
  const k99 = pop(t, T('bal') - 0.05) * (1 - prog(t, T('rekordu') - 0.1, T('rekordu') + 0.15));
  if (k99 > 0) { ctx.save(); ctx.translate(cx, s.y + 640); ctx.scale(k99, k99); ctx.beginPath(); ctx.arc(0, 0, 120, 0, TAU); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 7, C.green);
    text(ctx, '99', 0, 40, font(120, 800, D), C.chalk, 'center'); ctx.restore(); }
  const base = s.y + 1010;
  ctx.save(); shake(ctx, B(t), B(T('bərabərdir.')), 10, 6, 0.2);
  column(ctx, cx - 210, base, 260, 470, C.chalk, '1998', 'Zelda: Ocarina of Time', sp(t, T('tarixinin') - 0.05, SPRING.snappy));
  column(ctx, cx + 210, base, 260, 470, C.gold, '2026', 'GTA VI', sp(t, T('rekordu') - 0.05, SPRING.snappy));
  const ke = pop(t, T('bərabərdir.') - 0.04);
  if (ke > 0) { ctx.save(); ctx.translate(cx, base - 300); ctx.scale(ke, ke);
    ctx.beginPath(); ctx.arc(0, 0, 72, 0, TAU); ctx.fillStyle = C.pink; ctx.fill(); outline(ctx, 6);
    text(ctx, '=', 0, 40, font(120, 800, D), C.chalk, 'center'); ctx.restore(); }
  ctx.restore();
}

// ---------------------------------------------------------------- E: radio → Alim Qasımov + Fərqanə Qasımova
function carRadio(ctx, x, y, w, t, tune, label) {
  const h = w * 0.36;
  ctx.save(); ctx.translate(x, y);
  rrect(ctx, -w / 2, -h / 2, w, h, 22); ctx.fillStyle = '#15101F'; ctx.fill(); outline(ctx, 7);
  rrect(ctx, -w * 0.3, -h * 0.34, w * 0.6, h * 0.42, 10); ctx.fillStyle = '#0B2B2A'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.teal; ctx.stroke();
  const fx = -w * 0.27 + w * 0.54 * tune;
  ctx.strokeStyle = 'rgba(47,230,214,0.5)'; ctx.lineWidth = 3;
  for (let i = 0; i <= 20; i++) { const xx = -w * 0.27 + i * w * 0.027; ctx.beginPath(); ctx.moveTo(xx, -h * 0.3); ctx.lineTo(xx, -h * (i % 5 ? 0.24 : 0.2)); ctx.stroke(); }
  ctx.fillStyle = C.pink; ctx.fillRect(fx - 3, -h * 0.32, 6, h * 0.2);
  text(ctx, label, 0, h * 0.02, font(w * 0.058, 800, UI), C.teal, 'center');
  for (const sx of [-1, 1]) { ctx.save(); ctx.translate(sx * w * 0.41, 0); ctx.rotate(sx * tune * 4 + t * 0.2);
    ctx.beginPath(); ctx.arc(0, 0, h * 0.26, 0, TAU); ctx.fillStyle = '#2A2238'; ctx.fill(); outline(ctx, 5);
    ctx.fillStyle = C.chalk; ctx.fillRect(-3, -h * 0.24, 6, h * 0.14); ctx.restore(); }
  for (let i = 0; i < 4; i++) { rrect(ctx, -w * 0.28 + i * w * 0.15, h * 0.2, w * 0.11, h * 0.16, 6); ctx.fillStyle = '#2A2238'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.ink; ctx.stroke(); }
  ctx.restore();
}
function daf(ctx, x, y, r) {
  ctx.save(); ctx.translate(x, y);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fillStyle = '#E9D9B5'; ctx.fill(); ctx.lineWidth = r * 0.14; ctx.strokeStyle = '#7A4A22'; ctx.stroke();
  ctx.lineWidth = 3; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.arc(0, 0, r * 1.07, 0, TAU); ctx.stroke();
  for (let i = 0; i < 10; i++) { const a = i / 10 * TAU; ctx.beginPath(); ctx.arc(Math.cos(a) * r * 0.82, Math.sin(a) * r * 0.82, r * 0.05, 0, TAU); ctx.fillStyle = '#C9A24A'; ctx.fill(); }
  ctx.restore();
}
// silhouette: male = short hair + suit lapels + daf; female = long hair. No facial features.
function singer(ctx, x, y, sc, k, female, t) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y + (1 - Math.min(1, k)) * 300); ctx.scale(sc, sc);
  const bob = 4 * Math.sin(t * 5 + (female ? 1 : 0));
  ctx.fillStyle = C.sil; ctx.strokeStyle = female ? C.pink : C.teal; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(-150, 0); ctx.quadraticCurveTo(-150, -190, 0, -200); ctx.quadraticCurveTo(150, -190, 150, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-26, -200); ctx.lineTo(-22, -240); ctx.lineTo(22, -240); ctx.lineTo(26, -200); ctx.fill();
  ctx.save(); ctx.translate(0, bob);
  if (female) { ctx.beginPath(); ctx.moveTo(-60, -350); ctx.quadraticCurveTo(-98, -250, -84, -165); ctx.quadraticCurveTo(0, -150, 84, -165); ctx.quadraticCurveTo(98, -250, 60, -350); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  ctx.beginPath(); ctx.ellipse(0, -310, 62, 76, 0, 0, TAU); ctx.fill(); ctx.stroke();
  if (female) { ctx.beginPath(); ctx.ellipse(0, -350, 70, 48, 0, Math.PI, TAU); ctx.fill(); }
  else { ctx.beginPath(); ctx.ellipse(0, -345, 64, 46, 0, Math.PI, TAU); ctx.fill(); }
  ctx.restore();
  if (!female) { ctx.strokeStyle = 'rgba(47,230,214,0.6)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-26, -196); ctx.lineTo(-60, -60); ctx.moveTo(26, -196); ctx.lineTo(60, -60); ctx.stroke();
    daf(ctx, -120, -150 + 3 * Math.sin(t * 8), 92); }
  ctx.restore();
}
function plate(ctx, label, x, y, k, col) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.font = font(40, 800, D); const w = ctx.measureText(label).width + 50;
  rrect(ctx, -w / 2, -36, w, 72, 12); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 5, col);
  text(ctx, label, 0, 14, font(40, 800, D), C.chalk, 'center'); ctx.restore();
}
function note(ctx, x, y, sz, col, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineWidth = sz * 0.12;
  ctx.beginPath(); ctx.ellipse(0, 0, sz * 0.32, sz * 0.24, -0.4, 0, TAU); ctx.fill();
  ctx.beginPath(); ctx.moveTo(sz * 0.28, -sz * 0.05); ctx.lineTo(sz * 0.28, -sz); ctx.quadraticCurveTo(sz * 0.55, -sz * 0.8, sz * 0.6, -sz * 0.55); ctx.stroke(); ctx.restore();
}
function sRadio(ctx, t) {
  world(ctx, t, { glow: 0.4 });
  const kr = Math.min(1.04, sp(t, S.E - 0.1, SPRING.snappy));
  const tune = 0.15 + 0.62 * E.inOutCubic(prog(t, T('radiosunda') - 0.05, T('radiosunda') + 0.6));
  const lab = t < T('radiosunda') + 0.5 ? 'RADİO' : 'KALEIDOSCOPE FM';
  ctx.save(); ctx.translate(cx, s.y + 340); ctx.scale(kr, kr); carRadio(ctx, 0, 0, 760, t, tune, lab); ctx.restore();
  const ty = s.y + 1070;
  singer(ctx, cx - 210, ty, 0.88, sp(t, T('Alim') - 0.08, SPRING.snappy), false, t);
  singer(ctx, cx + 220, ty, 0.8, sp(t, T('Fərqanə') - 0.08, SPRING.snappy), true, t);
  plate(ctx, 'ALİM QASIMOV', cx - 210, ty - 440, pop(t, T('Qasımov') - 0.05), C.teal);
  plate(ctx, 'FƏRQANƏ QASIMOVA', cx + 200, ty - 380, pop(t, T('Qasımova') - 0.05), C.pink);
  chip(ctx, 'ATA və QIZ', cx, s.y + 590, 44, pop(t, T('qızı') - 0.05) * (1 - prog(t, T('Fərqanə') + 0.4, T('Fərqanə') + 0.6)), { bg: C.gold, rot: -0.04 });
  if (t > T('oxuyur.') - 0.05) for (let i = 0; i < 10; i++) { const q = prog(t, T('oxuyur.') - 0.05 + i * 0.09, T('oxuyur.') + 1.3 + i * 0.09); if (q <= 0 || q >= 1) continue;
    const from = i % 2 ? cx + 220 : cx - 210, x = from + (hash01(i, 61) - 0.5) * 220 + 40 * Math.sin(q * 8 + i), y = ty - 480 - q * 300;
    ctx.save(); ctx.globalAlpha = 1 - q; note(ctx, x, y, 70, i % 2 ? C.pink : C.teal, 0.2 * Math.sin(i)); ctx.restore(); }
  // sound waves from the radio
  for (let i = 0; i < 3; i++) { const q = ((t * 1.3 + i / 3) % 1); if (t < T('radiosunda')) break;
    ctx.save(); ctx.globalAlpha = (1 - q) * 0.6; ctx.strokeStyle = C.teal; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.arc(cx, s.y + 340, 400 + q * 160, -0.5, 0.5); ctx.stroke(); ctx.beginPath(); ctx.arc(cx, s.y + 340, 400 + q * 160, Math.PI - 0.5, Math.PI + 0.5); ctx.stroke(); ctx.restore(); }
}

// ---------------------------------------------------------------- F: the song — Nelli Furtado «Say It Right» (a cover)
function vinyl(ctx, x, y, r, rot, k) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(rot);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fillStyle = '#0E0B14'; ctx.fill(); outline(ctx, 7);
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 3; for (let i = 1; i < 9; i++) { ctx.beginPath(); ctx.arc(0, 0, r * (0.42 + i * 0.065), 0, TAU); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(255,255,255,0.22)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, r * 0.8, -0.9, -0.4); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r * 0.38, 0, TAU); ctx.fillStyle = C.pink; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r * 0.04, 0, TAU); ctx.fillStyle = C.ink; ctx.fill();
  ctx.restore();
}
function speaker(ctx, x, y, w, pulse) {
  const h = w * 1.6; ctx.save(); ctx.translate(x, y);
  rrect(ctx, -w / 2, -h / 2, w, h, 16); ctx.fillStyle = '#1A1426'; ctx.fill(); outline(ctx, 6);
  for (const [yy, rr] of [[-h * 0.24, w * 0.22], [h * 0.14, w * 0.36]]) { const r2 = rr * (1 + 0.08 * pulse);
    ctx.beginPath(); ctx.arc(0, yy, r2, 0, TAU); ctx.fillStyle = '#2E2645'; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
    ctx.beginPath(); ctx.arc(0, yy, r2 * 0.35, 0, TAU); ctx.fillStyle = C.teal; ctx.fill(); }
  ctx.restore();
}
function sSong(ctx, t) {
  world(ctx, t, { glow: 0.5 });
  const drop = E.outBack(clamp(prog(t, T('«Say') - 0.25, T('«Say') + 0.05)));
  const vy = lerp(s.y - 300, s.y + 700, drop);
  const kv = Math.min(1, sp(t, S.F, SPRING.snappy));
  ctx.save(); shake(ctx, B(t), B(T('«Say')), 8, 6, 0.18);
  vinyl(ctx, cx, t < T('«Say') - 0.25 ? s.y + 700 : vy, 330, t * 3.2, kv);
  if (t >= T('«Say') - 0.05) { const kt = pop(t, T('«Say') - 0.05);
    ctx.save(); ctx.translate(cx, s.y + 700); ctx.scale(kt, kt);
    text(ctx, '«Say It', 0, -8, font(64, 800, D), C.chalk, 'center'); text(ctx, 'Right»', 0, 58, font(64, 800, D), C.chalk, 'center'); ctx.restore(); }
  ctx.restore();
  chip(ctx, 'MAHNI', cx - 240, s.y + 300, 48, pop(t, S.F + 0.1), { bg: C.teal, rot: -0.06 });
  plate(ctx, 'Nelli Furtado · 2006', cx + 120, s.y + 300, pop(t, T('Nelli') - 0.05), C.gold);
  const pulse = t > T('ifa') ? Math.max(0, Math.sin((t - T('ifa')) * 14)) : 0;
  const ksp = sp(t, T('ifa') - 0.1, SPRING.bouncy);
  if (ksp > 0) { const off = (1 - Math.min(1, ksp)) * 400;
    speaker(ctx, s.x + 70 - off, s.y + 980, 150, pulse); speaker(ctx, s.x + s.w - 70 + off, s.y + 980, 150, pulse); }
  chip(ctx, 'ONLARIN İFASINDA', cx, s.y + 1100, 48, pop(t, T('ifa') - 0.02), { bg: C.gold, rot: 0.03 });
}

// ---------------------------------------------------------------- G: millions of players will hear it
function headphones(ctx, x, y, r, col) {
  ctx.save(); ctx.translate(x, y); ctx.strokeStyle = col; ctx.lineWidth = r * 0.22; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, 0, r, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke();
  ctx.fillStyle = col; rrect(ctx, -r * 1.1, -r * 0.1, r * 0.5, r * 0.75, r * 0.18); ctx.fill(); rrect(ctx, r * 0.6, -r * 0.1, r * 0.5, r * 0.75, r * 0.18); ctx.fill();
  ctx.restore();
}
function sMillions(ctx, t) {
  world(ctx, t, { glow: 0.7 });
  const t0 = T('milyonlarla') - 0.05;
  const COLS = 12, ROWS = 16, cell = (s.w - 20) / COLS;
  const n = Math.floor(COLS * ROWS * (0.1 * prog(t, S.G + 0.2, t0) + 0.9 * E.inCubic(prog(t, t0, t0 + 1.0))));
  for (let i = 0; i < COLS * ROWS; i++) { const c = i % COLS, r = Math.floor(i / COLS);
    const ord = (r * 37 + c * 13) % (COLS * ROWS); if (ord >= n) continue;
    const x = s.x + 10 + cell / 2 + c * cell, y = s.y + 220 + r * cell * 0.92;
    ctx.save(); ctx.globalAlpha = 0.5; headphones(ctx, x, y, cell * 0.28, (c + r) % 3 === 0 ? C.pink : (c + r) % 3 === 1 ? C.teal : C.gold); ctx.restore(); }
  // central radio pulse ring
  const kc = Math.min(1.05, sp(t, S.G, SPRING.bouncy));
  if (kc > 0) { ctx.save(); ctx.translate(cx, s.y + 640); ctx.scale(kc, kc);
    for (let i = 0; i < 3; i++) { const q = ((t * 0.9 + i / 3) % 1); ctx.globalAlpha = (1 - q) * 0.7; ctx.beginPath(); ctx.arc(0, 0, 180 + q * 420, 0, TAU); ctx.lineWidth = 8; ctx.strokeStyle = C.gold; ctx.stroke(); }
    ctx.globalAlpha = 1; ctx.beginPath(); ctx.arc(0, 0, 170, 0, TAU); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 8, C.gold);
    flagAZ(ctx, 0, -40, 170, 1, 0.04 * Math.sin(t * 4));
    note(ctx, -50, 110, 70, C.teal, 0.1); note(ctx, 40, 100, 60, C.pink, -0.1);
    ctx.restore(); }
  const km = pop(t, T('milyonlarla') - 0.05);
  if (km > 0) big(ctx, 'MİLYONLARLA', cx, s.y + 975, 112, C.gold, km, { sw: 0.08 });
  chip(ctx, 'OYUNÇU EŞİDƏCƏK', cx, s.y + 1090, 52, pop(t, T('oyunçu') - 0.05), { bg: C.chalk, rot: -0.03 });
}

// ---------------------------------------------------------------- H: end card
function sEnd(ctx, t) {
  world(ctx, t, { glow: 0.3 });
  const t0 = S.H;
  gameCase(ctx, cx - 260, s.y + 450, 180, pop(t, t0 - 0.2), -0.1);
  flagAZ(ctx, cx + 260, s.y + 430, 220, pop(t, t0), 0.05 * Math.sin(t * 4));
  text(ctx, '@bilirdinizmi_az', cx, s.y + 700, font(76, 800, D), C.chalk, 'center');
  const kB = pop(t, T('Bəyən') - 0.05), kI = pop(t, T('izlə') - 0.05);
  if (kB > 0) { ctx.save(); ctx.translate(cx - 215, s.y + 870); ctx.scale(kB, kB); ctx.rotate(-0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 6);
    const hb = 1 + 0.12 * Math.max(0, Math.sin((t - T('Bəyən')) * 9)) * Math.exp(-(t - T('Bəyən')) * 2);
    ctx.save(); ctx.translate(-110, 4); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30);
    ctx.fillStyle = '#E8384F'; ctx.fill(); ctx.restore();
    text(ctx, 'BƏYƏN', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  if (kI > 0) { ctx.save(); ctx.translate(cx + 215, s.y + 870); ctx.scale(kI, kI); ctx.rotate(0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 6);
    ctx.save(); ctx.translate(-115, 4); ctx.lineWidth = 12; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'İZLƏ', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  chip(ctx, 'hər gün bilmədiyin bir fakt', cx, s.y + 1040, 48, pop(t, T('hər') - 0.05), { bg: C.panel, fg: C.chalk, edge: C.gold, rot: -0.02 });
  const kS = pop(t, T('fakt!') + 0.25);
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 1180); ctx.scale(kS, kS);
    const msg = 'Oyunçu dostuna göndər';
    ctx.font = font(46, 800, UI); const w = ctx.measureText(msg).width + 150;
    rrect(ctx, -w / 2, -48, w, 96, 30); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 5);
    envelope(ctx, -w / 2 + 62, 0, 62); text(ctx, msg, 38, 16, font(46, 800, UI), C.ink, 'center'); ctx.restore(); }
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 700, UI), font(40, 600, UI)],
  hits: HITS,
  draw(ctx, u, t) {
    if (t < S.B + 0.2) whip(ctx, t, S.B, () => sHook(ctx, t), () => sOut(ctx, t));
    else if (t < S.C + 0.2) whip(ctx, t, S.C, () => sOut(ctx, t), () => sScore(ctx, t));
    else if (t < S.D + 0.2) whip(ctx, t, S.D, () => sScore(ctx, t), () => sRecord(ctx, t));
    else if (t < S.E + 0.2) whip(ctx, t, S.E, () => sRecord(ctx, t), () => sRadio(ctx, t));
    else if (t < S.F + 0.2) whip(ctx, t, S.F, () => sRadio(ctx, t), () => sSong(ctx, t));
    else if (t < S.G + 0.2) whip(ctx, t, S.G, () => sSong(ctx, t), () => sMillions(ctx, t));
    else whip(ctx, t, S.H, () => sMillions(ctx, t), () => sEnd(ctx, t), 0.36);
    if (t < S.H - 0.2) bug(ctx, t);
    captions(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 260; i++) { ctx.fillStyle = `rgba(255,255,240,${0.02 + 0.03 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
