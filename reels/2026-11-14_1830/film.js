// "1 xaldan 8 xala!" — @bilirdinizmi_az 18:30 animated reel, 14 Nov 2026. Pure function of time.
// Liechtenstein 0-1 Azerbaijan (Vaduz, 13 Nov 2026, Emreli 26'), AZ wins UNL D Group 2: 8 pts in 4 games.
// Arif voice (ElevenLabs) on audio/vo.wav; every caption word / object is timed to its spoken word
// (TIMING = ElevenLabs Scribe word alignment). Sports-broadcast look on a mown pitch; 2024 flashback in grey.
// Persistent scorebug (bottom) = the points counter. No music; soft non-melodic SFX only.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = {"dur": 25.2, "lines": [{"t0": 0.02, "words": [{"w": "1", "t": 0.02, "key": true}, {"w": "xaldan", "t": 0.24, "key": false}, {"w": "8", "t": 0.64, "key": true}, {"w": "xala!", "t": 1.04, "key": false}], "t1": 1.84}, {"t0": 1.84, "words": [{"w": "Millimiz", "t": 1.84, "key": false}, {"w": "qrupun", "t": 2.36, "key": false}, {"w": "birincisidir.", "t": 2.72, "key": true}], "t1": 3.68}, {"t0": 3.68, "words": [{"w": "Dünən", "t": 3.68, "key": false}, {"w": "Vaduzda", "t": 3.96, "key": false}, {"w": "Lixtenşteyni", "t": 4.48, "key": true}, {"w": "1:0", "t": 5.36, "key": true}, {"w": "hesabı", "t": 5.88, "key": false}, {"w": "ilə", "t": 6.2, "key": false}, {"w": "məğlub", "t": 6.36, "key": false}, {"w": "etdik.", "t": 6.72, "key": false}], "t1": 7.44}, {"t0": 7.44, "words": [{"w": "Qolu", "t": 7.44, "key": false}, {"w": "26-cı", "t": 7.8, "key": true}, {"w": "dəqiqədə", "t": 8.4, "key": false}, {"w": "Mahir", "t": 9.0, "key": false}, {"w": "Emreli", "t": 9.28, "key": true}, {"w": "vurdu.", "t": 9.64, "key": false}], "t1": 10.4}, {"t0": 10.4, "words": [{"w": "İndi", "t": 10.4, "key": false}, {"w": "4", "t": 10.747, "key": true}, {"w": "oyunda", "t": 11.0, "key": false}, {"w": "8", "t": 11.36, "key": true}, {"w": "xalımız", "t": 11.72, "key": false}, {"w": "var.", "t": 12.16, "key": false}], "t1": 12.64}, {"t0": 12.64, "words": [{"w": "Son", "t": 12.64, "key": false}, {"w": "oyun", "t": 12.88, "key": false}, {"w": "heç", "t": 13.36, "key": true}, {"w": "nəyi", "t": 13.6, "key": false}, {"w": "dəyişmir.", "t": 13.787, "key": false}], "t1": 14.64}, {"t0": 14.64, "words": [{"w": "2", "t": 14.64, "key": false}, {"w": "il", "t": 14.84, "key": false}, {"w": "əvvəl", "t": 14.96, "key": false}, {"w": "isə", "t": 15.28, "key": false}, {"w": "6", "t": 15.68, "key": true}, {"w": "oyunda", "t": 15.88, "key": false}, {"w": "cəmi", "t": 16.24, "key": false}, {"w": "1", "t": 16.64, "key": true}, {"w": "xal", "t": 16.8, "key": false}, {"w": "toplayıb", "t": 16.96, "key": false}, {"w": "D", "t": 17.6, "key": true}, {"w": "liqasına", "t": 17.72, "key": false}, {"w": "düşmüşdük.", "t": 18.16, "key": false}], "t1": 19.08}, {"t0": 19.08, "words": [{"w": "İndi", "t": 19.08, "key": false}, {"w": "məğlubiyyətsiz", "t": 19.52, "key": true}, {"w": "C", "t": 20.48, "key": true}, {"w": "liqasına", "t": 20.6, "key": false}, {"w": "qayıdırıq.", "t": 21.093, "key": false}], "t1": 22.08}, {"t0": 22.08, "words": [{"w": "Bəyən", "t": 22.08, "key": true}, {"w": "və", "t": 22.56, "key": false}, {"w": "izlə", "t": 22.72, "key": true}, {"w": "—", "t": 23.44, "key": false}, {"w": "hər", "t": 23.493, "key": false}, {"w": "gün", "t": 23.76, "key": false}, {"w": "bilmədiyin", "t": 24.053, "key": false}, {"w": "bir", "t": 24.56, "key": false}, {"w": "fakt!", "t": 24.72, "key": false}], "t1": 25.2}]};
const C = {
  grass: '#0F5132', grass2: '#13603B', night: '#0A1F16', chalk: '#F6F3EA', gold: '#F5C33B', ink: '#08130E',
  panel: '#0D1B2A', panel2: '#1B2E44', red: '#E2463F', grey: '#2B2B30', grey2: '#35353B', mute: '#A9B4AE', sil: '#06110B',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));

const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const LN = (i) => TIMING.lines[i].t0;
const END = TIMING.dur + 1.3;

// scene clock (cuts land just before the line that needs the new picture)
const S = { A: 0, B: LN(1) - 0.1, C: LN(2) - 0.1, D: LN(3) - 0.1, E: LN(4) - 0.1, F: LN(6) - 0.1, G: LN(7) - 0.1, H: LN(8) - 0.1 };
const B = (t) => t / 0.5;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.32, from, to }];
const HITS = [
  [B(0.02), '1', 'thud'], [B(T('8')), '8', 'thud'], [B(T('xala!')), 'XAL', 'click'],
  WH(S.B, 600, 2200), [B(T('birincisidir.')), 'flag on podium', 'thud'],
  WH(S.C, 2200, 600), [B(T('Vaduzda')), 'date chip', 'click'], [B(T('Lixtenşteyni')), 'LIE row', 'click'], [B(T('1:0')), 'score 1', 'thud'], [B(T('məğlub')), 'stamp', 'thud'],
  WH(S.D, 600, 2200), [B(T('Qolu') + 0.05), 'kick', 'thud'], [B(T('Qolu') + 0.4), 'net', 'whoosh', { len: 0.25, from: 1500, to: 400 }], [B(T('26-cı')), 'clock', 'type', { len: 0.55, n: 8 }], [B(T('Mahir')), 'name plate', 'click'],
  WH(S.E, 2200, 600), [B(T('4')), 'ball 1', 'tick'], [B(T('4') + 0.1), 'ball 2', 'tick'], [B(T('4') + 0.2), 'ball 3', 'tick'], [B(T('4') + 0.3), 'ball 4', 'tick'],
  [B(T('8', 1)), 'counter 8', 'type', { len: 0.5, n: 8 }], [B(T('Son')), '1st card', 'click'], [B(T('heç')), 'lock drop', 'whoosh', { len: 0.25, from: 1800, to: 500 }], [B(T('dəyişmir.') + 0.05), 'lock', 'thud'],
  [B(S.F), 'flashback', 'whoosh', { len: 0.45, from: 400, to: 1600 }], [B(T('2')), '2024', 'type', { len: 0.4, n: 6 }], [B(T('6')), '6 games', 'tick'], [B(T('1', 1)), '1 XAL', 'thud'],
  [B(T('toplayıb')), 'ladder', 'click'], [B(T('D') + 0.05), 'drop to D', 'thud'],
  WH(S.G, 600, 2200), [B(T('məğlubiyyətsiz')), 'unbeaten stamp', 'thud'], [B(T('C')), 'rise to C', 'whoosh', { len: 0.3, from: 500, to: 2000 }], [B(T('liqasına', 1) + 0.15), 'C lands', 'thud'],
  WH(S.H, 2200, 600), [B(T('Bəyən')), 'BƏYƏN', 'click'], [B(T('izlə')), 'İZLƏ', 'thud'], [B(T('fakt!') + 0.3), 'tagline', 'tick'],
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
function pitchBg(ctx, t, grey = false) {
  const a = grey ? C.grey : C.grass, b = grey ? C.grey2 : C.grass2;
  fill(ctx, a);
  const off = (t * 40) % 240;
  ctx.fillStyle = b;
  for (let x = -480 + off; x < W + 720; x += 240) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + 120, 0); ctx.lineTo(x + 120 - 500, H); ctx.lineTo(x - 500, H); ctx.closePath(); ctx.fill(); }
  ctx.save(); ctx.translate(cx, s.y + 760); ctx.rotate(t * 0.05); ctx.strokeStyle = grey ? 'rgba(255,255,255,0.07)' : 'rgba(246,243,234,0.10)'; ctx.lineWidth = 8;
  ctx.beginPath(); ctx.arc(0, 0, 330, 0, TAU); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-W, 0); ctx.lineTo(W, 0); ctx.stroke(); ctx.restore();
  const g = ctx.createRadialGradient(W / 2, H * 0.42, H * 0.2, W / 2, H / 2, H * 0.8);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.45)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
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
function flagLI(ctx, x, y, w, k) {
  if (k <= 0) return; const h = w * 0.6;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.save(); rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.clip();
  ctx.fillStyle = '#002B7F'; ctx.fillRect(-w / 2, -h / 2, w, h / 2); ctx.fillStyle = '#CE1126'; ctx.fillRect(-w / 2, 0, w, h / 2);
  const kx = -w / 2 + w * 0.27, ky = -h / 4; ctx.fillStyle = '#FFD83D';
  ctx.beginPath(); ctx.moveTo(kx - 18, ky + 10); ctx.lineTo(kx - 18, ky - 6); ctx.lineTo(kx - 9, ky + 2); ctx.lineTo(kx, ky - 12); ctx.lineTo(kx + 9, ky + 2); ctx.lineTo(kx + 18, ky - 6); ctx.lineTo(kx + 18, ky + 10); ctx.closePath(); ctx.fill();
  ctx.restore(); rrect(ctx, -w / 2, -h / 2, w, h, 6); outline(ctx, 5); ctx.restore();
}
function ball(ctx, x, y, r, rot = 0, col = '#FFFFFF') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fillStyle = col; ctx.fill(); outline(ctx, Math.max(3, r * 0.1));
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.clip(); ctx.fillStyle = C.ink;
  const pent = (px, py, pr) => { ctx.beginPath(); for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i / 5) * TAU; ctx.lineTo(px + Math.cos(a) * pr, py + Math.sin(a) * pr); } ctx.closePath(); ctx.fill(); };
  pent(0, 0, r * 0.34);
  for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + (i / 5) * TAU; pent(Math.cos(a) * r * 0.95, Math.sin(a) * r * 0.95, r * 0.3); }
  ctx.restore(); ctx.restore();
}
function namePlate(ctx, name, role, x, y, k, rot = -0.03) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(60, 800, UI); const w = Math.max(ctx.measureText(name).width, 300) + 80;
  rrect(ctx, -w / 2, -62, w, 150, 18); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 6, C.gold);
  text(ctx, name, 0, 0, font(60, 800, UI), C.chalk, 'center', 1);
  text(ctx, role, 0, 60, font(42, 600, UI), C.gold, 'center');
  ctx.restore();
}
function whip(ctx, t, t0, a, b, dur = 0.3) {
  const p = E.inOutCubic(prog(t, t0 - dur * 0.55, t0 + dur * 0.45));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(-p * W, 0); a(); ctx.restore(); ctx.save(); ctx.translate((1 - p) * W, 0); b(); ctx.restore();
}

// ---------------------------------------------------------------- persistent scorebug (points counter)
function scorebug(ctx, t) {
  const k = clamp(prog(t, 0.15, 0.5)); if (k <= 0) return;
  const inFlash = t >= S.F + 0.1 && t < S.G;
  let pts = t < T('8') ? 1 : 8;
  if (inFlash) pts = t < T('1', 1) ? null : 1;
  const y = s.y + s.h - 40, x0 = cx - 300;
  ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 60);
  rrect(ctx, x0, y - 44, 420, 88, 14); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 4, '#000');
  flagAZ(ctx, x0 + 62, y, 76, 1);
  text(ctx, 'AZƏRBAYCAN', x0 + 118, y + 15, font(42, 800, UI), C.chalk, 'left');
  rrect(ctx, x0 + 420, y - 44, 180, 88, 14); ctx.fillStyle = inFlash ? C.red : C.gold; ctx.fill(); outline(ctx, 4, '#000');
  const changes = [T('8'), T('1', 1), S.G];
  const last = changes.filter((c) => t >= c).pop() ?? -9;
  const bump = 1 + 0.25 * Math.exp(-(t - last) * 7) * (t - last < 1);
  ctx.save(); ctx.translate(x0 + 510, y + 2); ctx.scale(bump, bump);
  text(ctx, pts === null ? '2024' : `${pts} XAL`, 0, 15, font(44, 800, D), inFlash ? C.chalk : C.ink, 'center'); ctx.restore();
  ctx.restore();
}

// ---------------------------------------------------------------- captions (word by word, top)
function captions(ctx, t) {
  const L = TIMING.lines; const li = L.findIndex((l, i) => t >= l.t0 - 0.05 && t < (L[i + 1] ? L[i + 1].t0 - 0.05 : END)); if (li < 0) return;
  const all = L[li].words.filter((w) => w.w !== '—'), ws = all.filter((w) => t >= w.t - 0.03); if (!ws.length) return;
  const start = Math.floor((ws.length - 1) / 3) * 3, chunk = all.slice(start, start + 3), shown = ws.slice(start);
  let size = 88; const gap = 26;
  const meas = (sz) => { ctx.font = font(sz, 800, D); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 30) { size = Math.floor(size * (s.w - 30) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 110;
  shown.forEach((w, i) => { const k = sp(t, w.t - 0.03, SPRING.bouncy), sc = Math.min(1.1, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.2; ctx.strokeStyle = '#04100A'; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.gold : '#FFFFFF'; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}

// ---------------------------------------------------------------- A: hook 1 → 8
function sHook(ctx, t) {
  pitchBg(ctx, t);
  const t8 = T('8');
  ctx.save(); shake(ctx, B(t), B(t < t8 ? 0.02 : t8), 16, 5, 0.25);
  const mv = E.inOutCubic(prog(t, t8 - 0.15, t8 + 0.15));
  const k1 = t < 0.35 ? lerp(1.3, 1, E.outBack(prog(t, 0, 0.35))) : 1;
  big(ctx, '1', lerp(cx, cx - 270, mv), s.y + 800, lerp(560, 330, mv), mv > 0.5 ? C.mute : C.chalk, k1, { sw: 0.06 });
  if (mv > 0) {
    ctx.save(); ctx.globalAlpha = clamp(mv * 2); ctx.strokeStyle = C.gold; ctx.lineWidth = 18; ctx.lineCap = 'round';
    const ax = cx - 150, ay = s.y + 680, aw = 120 * mv; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax + aw, ay); ctx.lineTo(ax + aw - 34, ay - 34); ctx.moveTo(ax + aw, ay); ctx.lineTo(ax + aw - 34, ay + 34); ctx.stroke(); ctx.restore();
  }
  const k8 = t >= t8 ? Math.min(1.12, lerp(1.6, 1, E.outBack(prog(t, t8, t8 + 0.3)))) : 0;
  big(ctx, '8', cx + 190, s.y + 860, 620, C.gold, k8, { sw: 0.06, rot: 0.03 });
  ctx.restore();
  chip(ctx, 'XAL', cx + 190, s.y + 990, 92, pop(t, T('xala!')), { bg: C.chalk, rot: -0.05 });
  const kc = pop(t, 0.12);
  if (kc > 0) { ctx.save(); ctx.translate(cx, s.y + 300); ctx.scale(kc, kc);
    rrect(ctx, -330, -52, 660, 104, 20); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 5, C.gold);
    flagAZ(ctx, -250, 0, 104, 1); text(ctx, 'AZƏRBAYCAN MİLLİSİ', 40, 18, font(50, 800, UI), C.chalk, 'center'); ctx.restore(); }
}

// ---------------------------------------------------------------- B: podium, flag on #1
function sPodium(ctx, t) {
  pitchBg(ctx, t);
  const base = s.y + 1000;
  const steps = [[cx - 270, 200, '2', 0.1], [cx, 330, '1', 0], [cx + 270, 130, '3', 0.2]];
  steps.forEach(([x, h, n, d]) => { const k = Math.min(1, sp(t, S.B + d, SPRING.snappy)); if (k <= 0) return;
    const hh = h * k; rrect(ctx, x - 125, base - hh, 250, hh, 10); ctx.fillStyle = n === '1' ? C.gold : C.chalk; ctx.fill(); outline(ctx, 7);
    if (k > 0.6) text(ctx, n, x, base - hh + 110, font(110, 800, D), C.ink, 'center'); });
  const tf = T('birincisidir.'); const q = E.outBounce(prog(t, tf - 0.3, tf));
  if (t > tf - 0.3) { const py = lerp(s.y + 100, base - 330, q);
    ctx.save(); ctx.translate(cx - 60, py); ctx.fillStyle = C.chalk; rrect(ctx, -9, -300, 18, 300, 6); ctx.fill(); outline(ctx, 4);
    flagAZ(ctx, 110, -240, 210, 1, 0.04 * Math.sin(t * 6)); ctx.restore(); }
  chip(ctx, 'QRUPDA 1-ci YER', cx, s.y + 1080, 54, pop(t, tf + 0.15), { bg: C.panel, fg: C.gold, edge: C.gold, rot: 0.02 });
  chip(ctx, 'MİLLƏTLƏR LİQASI', cx, s.y + 245, 46, pop(t, S.B + 0.15), { bg: C.chalk, rot: -0.03 });
}

// ---------------------------------------------------------------- C: scoreboard LIE 0-1 AZE
function floodlight(ctx, x, y, t, ph) {
  ctx.save(); ctx.translate(x, y);
  const a = 0.18 + 0.06 * Math.sin(t * 3 + ph);
  const g = ctx.createRadialGradient(0, 0, 10, 0, 0, 420); g.addColorStop(0, `rgba(255,250,220,${a + 0.3})`); g.addColorStop(1, 'rgba(255,250,220,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, 420, 0, TAU); ctx.fill();
  ctx.fillStyle = '#1D2A24'; rrect(ctx, -70, -40, 140, 80, 8); ctx.fill();
  for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) { ctx.beginPath(); ctx.arc(-44 + i * 44, -16 + j * 32, 13, 0, TAU); ctx.fillStyle = '#FFF8D8'; ctx.fill(); }
  ctx.restore();
}
function sScore(ctx, t) {
  pitchBg(ctx, t); ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(0, 0, W, H);
  floodlight(ctx, s.x + 40, s.y + 260, t, 0); floodlight(ctx, s.x + s.w - 40, s.y + 260, t, 2);
  chip(ctx, 'VADUZ · 13 NOYABR', cx, s.y + 360, 54, pop(t, T('Vaduzda') - 0.05), { bg: C.chalk, rot: 0.03 });
  const push = 1 + 0.06 * E.inOutCubic(prog(t, S.C, S.D));
  ctx.save(); ctx.translate(cx, s.y + 760); ctx.scale(push, push);
  const rows = [['LİXTENŞTEYN', T('Lixtenşteyni') - 0.08, flagLI, 0], ['AZƏRBAYCAN', S.C + 0.15, flagAZ, 1]];
  rows.forEach(([name, t0, fl, i]) => {
    const k = Math.min(1, sp(t, t0, SPRING.snappy)); if (k <= 0) return;
    const y = -110 + i * 220, xo = (1 - k) * (i ? W : -W);
    const lost = i === 0 && t > T('məğlub');
    ctx.save(); ctx.translate(xo, y); ctx.globalAlpha = lost ? 0.6 : 1;
    rrect(ctx, -440, -90, 680, 180, 18); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 6, '#000');
    fl(ctx, -350, 0, 120, 1);
    text(ctx, name, -270, 22, font(name.length > 10 ? 54 : 62, 800, UI), C.chalk, 'left');
    rrect(ctx, 260, -90, 180, 180, 18); ctx.fillStyle = i ? C.gold : C.panel2; ctx.fill(); outline(ctx, 6, '#000');
    const sc = i && t >= T('1:0') ? 1 : 0;
    const fl2 = i && t >= T('1:0') ? Math.exp(-(t - T('1:0')) * 6) : 0;
    ctx.save(); ctx.translate(350, 0); ctx.scale(1 + fl2 * 0.5, 1 + fl2 * 0.5); text(ctx, `${sc}`, 0, 44, font(128, 800, D), i ? C.ink : C.chalk, 'center'); ctx.restore();
    ctx.restore();
  });
  ctx.restore();
  const tw = T('məğlub'); const kS = t >= tw ? Math.min(1.05, lerp(1.7, 1, E.outBack(prog(t, tw, tw + 0.25)))) : 0;
  if (kS > 0) { ctx.save(); ctx.translate(cx + 120, s.y + 1040); ctx.rotate(-0.12); ctx.scale(kS, kS);
    rrect(ctx, -230, -70, 460, 140, 18); ctx.fillStyle = 'rgba(8,19,14,0.85)'; ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = C.gold; ctx.stroke();
    text(ctx, 'QƏLƏBƏ', 0, 30, font(90, 800, D), C.gold, 'center', 3); ctx.restore(); }
}

// ---------------------------------------------------------------- footballer silhouette (rule 1g)
function player(ctx, x, y, sc, pose) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.strokeStyle = C.sil; ctx.fillStyle = C.sil; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const cheer = pose === 'cheer', k = cheer ? 0 : pose;
  const limb = (pts, w) => { ctx.lineWidth = w; ctx.beginPath(); pts.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py))); ctx.stroke(); };
  limb([[0, -200], [-18, -100], [-10, 0]], 38); ctx.beginPath(); ctx.ellipse(8, 2, 34, 14, 0, 0, TAU); ctx.fill();
  const a = cheer ? -0.15 : lerp(-0.9, 1.1, k);
  ctx.save(); ctx.translate(10, -200); ctx.rotate(-a); limb([[0, 0], [0, 100]], 38); ctx.translate(0, 100); ctx.rotate(cheer ? 0.2 : lerp(1.0, -0.1, k)); limb([[0, 0], [0, 95]], 34);
  ctx.beginPath(); ctx.ellipse(20, 100, 34, 14, 0, 0, TAU); ctx.fill(); ctx.restore();
  ctx.beginPath(); ctx.moveTo(-52, -240); ctx.lineTo(56, -240); ctx.lineTo(62, -175); ctx.lineTo(-58, -175); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-50, -245); ctx.lineTo(-58, -400); ctx.quadraticCurveTo(0, -425, 58, -400); ctx.lineTo(52, -245); ctx.closePath(); ctx.fill();
  if (cheer) { limb([[-48, -390], [-110, -480], [-130, -580]], 30); limb([[48, -390], [110, -480], [130, -580]], 30); }
  else { limb([[-48, -390], [-120, -330], [-170, -300]], 30); limb([[48, -390], [110, -420], [160, -380]], 30); }
  limb([[0, -410], [0, -432]], 30);
  ctx.beginPath(); ctx.ellipse(4, -472, 40, 46, 0, 0, TAU); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-36, -490); ctx.quadraticCurveTo(-30, -532, 6, -530); ctx.quadraticCurveTo(44, -530, 46, -490); ctx.lineTo(40, -500); ctx.lineTo(-30, -500); ctx.closePath(); ctx.fill();
  ctx.restore();
}

// ---------------------------------------------------------------- D: the goal (26')
function sGoal(ctx, t) {
  pitchBg(ctx, t);
  const tk = T('Qolu') + 0.05, tn = T('Qolu') + 0.4;
  const gx = s.x + s.w - 40, gy = s.y + 700, gw = 300, gh = 420;
  const bulge = t >= tn ? Math.max(0, Math.exp(-(t - tn) * 5) * Math.sin((t - tn) * 18) * 26) : 0;
  ctx.save(); ctx.translate(gx, gy);
  ctx.strokeStyle = 'rgba(246,243,234,0.55)'; ctx.lineWidth = 3;
  for (let i = 0; i <= 10; i++) { ctx.beginPath(); ctx.moveTo(-gw + i * gw / 10 + (i > 2 && i < 9 ? bulge : 0), 0); ctx.lineTo(-gw + i * gw / 10 + 40, gh); ctx.stroke(); }
  for (let j = 0; j <= 12; j++) { const yy = j * gh / 12; ctx.beginPath(); ctx.moveTo(-gw, yy); ctx.quadraticCurveTo(-gw / 2 + bulge * 2, yy, 40, yy); ctx.stroke(); }
  ctx.lineWidth = 22; ctx.strokeStyle = C.chalk; ctx.lineCap = 'square'; ctx.beginPath(); ctx.moveTo(-gw, gh); ctx.lineTo(-gw, 0); ctx.lineTo(60, 0); ctx.stroke();
  ctx.restore();
  const k = E.outCubic(prog(t, tk - 0.25, tk + 0.1));
  const tm = T('Mahir'), cheer = t >= tm - 0.1;
  const px = s.x + 220 + (cheer ? 30 * E.outCubic(prog(t, tm - 0.1, tm + 0.3)) : 0);
  const hop = cheer ? 30 * Math.abs(Math.sin((t - tm) * 6)) * Math.exp(-Math.max(0, t - tm) * 1.5) : 0;
  player(ctx, px, s.y + 1120 - hop, 1.15, cheer ? 'cheer' : k);
  const q = E.outCubic(prog(t, tk, tn));
  const bx0 = s.x + 360, by0 = s.y + 1100, bx1 = gx - 80, by1 = gy + 90;
  let bx = lerp(bx0, bx1, q), by = lerp(by0, by1, q) - Math.sin(q * Math.PI) * 220;
  if (t > tn) { const d = t - tn; bx = bx1 + 30 * (1 - Math.exp(-d * 8)); by = by1 + Math.min(260, 600 * d * d); }
  if (q > 0 && q < 1) { ctx.strokeStyle = 'rgba(246,243,234,0.35)'; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath();
    for (let i = 0; i <= 16; i++) { const q0 = Math.max(0, q - 0.25), qq = q0 + (q - q0) * i / 16; const x = lerp(bx0, bx1, qq), y = lerp(by0, by1, qq) - Math.sin(qq * Math.PI) * 220; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); }
  ball(ctx, bx, by, 46, t * 9);
  chip(ctx, 'QOL!', gx - 150, gy - 70, 76, pop(t, tn), { bg: C.gold, rot: 0.06 });
  const t26 = T('26-cı'); const kc = pop(t, S.D + 0.1);
  const mins = Math.round(lerp(0, 26, E.outCubic(prog(t, t26, t26 + 0.5))));
  if (kc > 0) { ctx.save(); ctx.translate(s.x + 170, s.y + 340); ctx.scale(kc, kc);
    rrect(ctx, -150, -62, 300, 124, 18); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 5, C.gold);
    ctx.beginPath(); ctx.arc(-90, 0, 32, 0, TAU); ctx.strokeStyle = C.chalk; ctx.lineWidth = 6; ctx.stroke();
    ctx.save(); ctx.translate(-90, 0); ctx.rotate(t * 6); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -24); ctx.stroke(); ctx.restore();
    text(ctx, `${String(mins).padStart(2, '0')}'`, 40, 30, font(84, 800, D), mins >= 26 ? C.gold : C.chalk, 'center'); ctx.restore(); }
  namePlate(ctx, 'MAHİR EMRELİ', 'qolun müəllifi', cx + 80, s.y + 490, pop(t, tm - 0.05), 0.03);
}

// ---------------------------------------------------------------- E: 4 games, 8 points, 1st place locked
function sPoints(ctx, t) {
  pitchBg(ctx, t);
  const t4 = T('4'), t8 = T('8', 1), tSon = T('Son');
  const up = E.inOutCubic(prog(t, tSon - 0.2, tSon + 0.25));
  for (let i = 0; i < 4; i++) { const yy = lerp(s.y + 430, s.y + 330, up), sc0 = lerp(1, 0.7, up);
    ctx.beginPath(); ctx.arc(cx - 300 + i * 200, yy, 70 * sc0, 0, TAU); ctx.setLineDash([14, 12]); ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(246,243,234,0.45)'; ctx.stroke(); ctx.setLineDash([]);
    const k = pop(t, t4 - 0.05 + i * 0.1); if (k <= 0) continue;
    ctx.save(); const x = cx - 300 + i * 200, y = lerp(s.y + 430, s.y + 330, up); ctx.translate(x, y); ctx.scale(k * lerp(1, 0.7, up), k * lerp(1, 0.7, up)); ball(ctx, 0, 0, 70, i * 0.7 + t); ctx.restore(); }
  chip(ctx, '4 OYUN', cx, lerp(s.y + 560, s.y + 440, up), 52, pop(t, T('oyunda') - 0.05), { bg: C.chalk, rot: -0.02 });
  const q = E.outCubic(prog(t, t8, t8 + 0.5)), n = Math.round(8 * q);
  if (t < t8 - 0.1) { for (let i = 0; i < 8; i++) { rrect(ctx, cx - 330 + i * 84, s.y + 980, 70, 46, 10); ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fill(); outline(ctx, 4); } }
  const kc = pop(t, t8 - 0.1);
  if (kc > 0) { ctx.save(); ctx.translate(cx, lerp(s.y + 830, s.y + 640, up)); ctx.scale(kc * lerp(1, 0.75, up), kc * lerp(1, 0.75, up));
    big(ctx, `${n}`, -90, 90, 300, C.gold, 1, { sw: 0.06 }); text(ctx, 'XAL', 120, 60, font(110, 800, D), C.chalk, 'center');
    for (let i = 0; i < 8; i++) { rrect(ctx, -330 + i * 84, 150, 70, 46, 10); ctx.fillStyle = i < n ? C.gold : 'rgba(255,255,255,0.15)'; ctx.fill(); outline(ctx, 4); }
    ctx.restore(); }
  const kCard = pop(t, tSon);
  if (kCard > 0) { ctx.save(); ctx.translate(cx - 70, s.y + 1005); ctx.scale(kCard, kCard); ctx.rotate(-0.02);
    rrect(ctx, -330, -120, 660, 240, 26); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 6, C.gold);
    flagAZ(ctx, -200, 0, 180, 1);
    text(ctx, '1-ci YER', 70, 30, font(86, 800, D), C.gold, 'center'); ctx.restore(); }
  const tl = T('heç'), tc = T('dəyişmir.') + 0.05;
  if (t >= tl) { const dq = E.outCubic(prog(t, tl, tl + 0.35)); const ly = lerp(s.y + 300, s.y + 885, dq);
    const sh = E.outBack(prog(t, tc, tc + 0.2)); const lx = cx + 330, so = (1 - sh) * -40;
    ctx.save(); ctx.translate(lx, ly); if (t >= tc) shake(ctx, B(t), B(tc), 8, 4, 0.2);
    ctx.lineWidth = 22; ctx.strokeStyle = '#C9CED6'; ctx.lineCap = 'butt'; ctx.beginPath(); ctx.moveTo(-52, -40 + so + 30); ctx.lineTo(-52, -40 + so); ctx.arc(0, -40 + so, 52, Math.PI, 0); ctx.lineTo(52, -40 + so + 30); ctx.stroke();
    rrect(ctx, -80, -40, 160, 140, 18); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 6);
    ctx.beginPath(); ctx.arc(0, 20, 16, 0, TAU); ctx.fillStyle = C.ink; ctx.fill(); ctx.fillRect(-6, 20, 12, 40); ctx.restore(); }
}

// ---------------------------------------------------------------- league ladder A/B/C/D (F and G)
function ladder(ctx, t, x, y, k, pos, grey, hi) {
  if (k <= 0) return; const rows = ['A', 'B', 'C', 'D'], rh = 120, w = 560;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  rows.forEach((r, i) => { const yy = i * (rh + 14);
    rrect(ctx, -w / 2, yy, w, rh, 16); ctx.fillStyle = hi === r ? (grey ? C.red : C.gold) : (grey ? '#45454C' : C.panel); ctx.fill(); outline(ctx, 5, '#000');
    text(ctx, `${r} LİQASI`, -w / 2 + 40, yy + 82, font(64, 800, UI), hi === r && !grey ? C.ink : C.chalk, 'left'); });
  const my = pos * (rh + 14) + rh / 2;
  flagAZ(ctx, w / 2 - 90, my, 120, 1, 0.04 * Math.sin(t * 5));
  ctx.restore();
}

// ---------------------------------------------------------------- F: flashback 2024 — 6 games, 1 point, down to D
function sPast(ctx, t) {
  pitchBg(ctx, t, true);
  const t2 = T('2');
  const yr = Math.round(lerp(2026, 2024, E.inOutCubic(prog(t, t2, t2 + 0.35))));
  const kY = pop(t, S.F + 0.05);
  if (kY > 0) { ctx.save(); ctx.translate(cx - 230, s.y + 300); ctx.scale(kY, kY); ctx.rotate(-0.05);
    rrect(ctx, -150, -70, 300, 150, 18); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 6);
    ctx.save(); rrect(ctx, -150, -70, 300, 150, 18); ctx.clip(); ctx.fillStyle = C.red; ctx.fillRect(-150, -70, 300, 36); ctx.restore();
    text(ctx, `${yr}`, 0, 62, font(84, 800, D), C.ink, 'center'); ctx.restore(); }
  chip(ctx, '2 İL ƏVVƏL', cx + 210, s.y + 300, 50, pop(t, T('əvvəl') - 0.05), { bg: C.grey2, fg: C.chalk, edge: C.chalk, rot: 0.04 });
  for (let i = 0; i < 6; i++) { const k = pop(t, T('6') - 0.05 + i * 0.06); if (k <= 0) continue;
    ctx.save(); ctx.translate(cx - 340 + i * 136, s.y + 470); ctx.scale(k, k); ball(ctx, 0, 0, 52, i, '#BFBFC4'); ctx.restore(); }
  const t1 = T('1', 1); const k1 = t >= t1 ? Math.min(1.08, lerp(1.6, 1, E.outBack(prog(t, t1, t1 + 0.3)))) : 0;
  if (k1 > 0) { ctx.save(); ctx.translate(cx, s.y + 620); ctx.rotate(-0.04); ctx.scale(k1, k1);
    rrect(ctx, -270, -75, 540, 150, 22); ctx.fillStyle = C.red; ctx.fill(); outline(ctx, 6);
    text(ctx, 'cəmi 1 XAL', 0, 32, font(88, 800, D), C.chalk, 'center'); ctx.restore(); }
  const tD = T('D');
  const pos = lerp(2, 3, E.outBounce(prog(t, tD, tD + 0.45)));
  ladder(ctx, t, cx, s.y + 735, Math.min(1, sp(t, T('toplayıb') - 0.1)) * 0.72, pos, true, t >= tD + 0.2 ? 'D' : null);
}

// ---------------------------------------------------------------- G: now — unbeaten, back up to C
function sNow(ctx, t) {
  pitchBg(ctx, t);
  const tC = T('C');
  const pos = lerp(3, 2, E.outBack(prog(t, tC, tC + 0.5)));
  ladder(ctx, t, cx, s.y + 400, 1, pos, false, t >= tC + 0.35 ? 'C' : null);
  const ar = prog(t, tC - 0.1, tC + 0.6);
  if (ar > 0 && ar < 1) { ctx.save(); ctx.globalAlpha = Math.sin(ar * Math.PI); ctx.translate(cx + 370, s.y + 400 + 2.6 * 134 - ar * 160); ctx.fillStyle = C.gold;
    ctx.beginPath(); ctx.moveTo(0, -70); ctx.lineTo(55, 0); ctx.lineTo(22, 0); ctx.lineTo(22, 70); ctx.lineTo(-22, 70); ctx.lineTo(-22, 0); ctx.lineTo(-55, 0); ctx.closePath(); ctx.fill(); outline(ctx, 5); ctx.restore(); }
  const tm = T('məğlubiyyətsiz'); const kS = t >= tm ? Math.min(1.05, lerp(1.7, 1, E.outBack(prog(t, tm, tm + 0.25)))) : 0;
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 1060); ctx.rotate(-0.06); ctx.scale(kS, kS);
    rrect(ctx, -410, -70, 820, 140, 18); ctx.fillStyle = 'rgba(8,19,14,0.88)'; ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = C.gold; ctx.stroke();
    text(ctx, 'MƏĞLUBİYYƏTSİZ', 0, 28, font(74, 800, D), C.gold, 'center', 2); ctx.restore(); }
}

// ---------------------------------------------------------------- H: payoff + end card (loops into the hook)
function sEnd(ctx, t) {
  pitchBg(ctx, t);
  const t0 = S.H;
  big(ctx, '1 → 8', cx - 40, s.y + 470, 230, C.gold, pop(t, t0 - 0.3), { sw: 0.05, rot: -0.03 });
  chip(ctx, 'XAL', cx + 330, s.y + 470, 60, pop(t, t0 - 0.1), { bg: C.chalk, rot: 0.06 });
  text(ctx, '@bilirdinizmi_az', cx, s.y + 690, font(80, 800, D), C.chalk, 'center');
  const kB = pop(t, T('Bəyən') - 0.05), kI = pop(t, T('izlə') - 0.05);
  if (kB > 0) { ctx.save(); ctx.translate(cx - 215, s.y + 900); ctx.scale(kB, kB); ctx.rotate(-0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 6, '#04100A');
    const hb = 1 + 0.12 * Math.max(0, Math.sin((t - T('Bəyən')) * 9)) * Math.exp(-(t - T('Bəyən')) * 2);
    ctx.save(); ctx.translate(-110, 4); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30);
    ctx.fillStyle = '#E8384F'; ctx.fill(); ctx.restore();
    text(ctx, 'BƏYƏN', 40, 24, font(64, 800, D), '#04100A', 'center'); ctx.restore(); }
  if (kI > 0) { ctx.save(); ctx.translate(cx + 215, s.y + 900); ctx.scale(kI, kI); ctx.rotate(0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 6, '#04100A');
    ctx.save(); ctx.translate(-115, 4); ctx.lineWidth = 12; ctx.strokeStyle = '#04100A'; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'İZLƏ', 40, 24, font(64, 800, D), '#04100A', 'center'); ctx.restore(); }
  chip(ctx, 'hər gün bilmədiyin bir fakt', cx, s.y + 1090, 52, pop(t, T('hər') - 0.05), { bg: C.panel, fg: C.chalk, edge: C.gold, rot: -0.02 });
  const bq = prog(t, t0, END); ball(ctx, lerp(-80, W + 80, bq), s.y + 1240, 40, bq * 30);
}

function flashTo(ctx, t, t0, a, b, dur = 0.4) {
  // flashback: the present slides down as the grey past drops in from the top (both on screen)
  const p = E.inOutCubic(prog(t, t0 - dur * 0.5, t0 + dur * 0.5));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(0, p * H); a(); ctx.restore();
  ctx.save(); ctx.translate(0, (p - 1) * H); b(); ctx.restore();
  ctx.fillStyle = C.chalk; ctx.fillRect(0, p * H - 8, W, 16);
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 600, UI)],
  hits: HITS,
  draw(ctx, u, t) {
    if (t < S.B + 0.2) whip(ctx, t, S.B, () => sHook(ctx, t), () => sPodium(ctx, t));
    else if (t < S.C + 0.2) whip(ctx, t, S.C, () => sPodium(ctx, t), () => sScore(ctx, t));
    else if (t < S.D + 0.2) whip(ctx, t, S.D, () => sScore(ctx, t), () => sGoal(ctx, t));
    else if (t < S.E + 0.2) whip(ctx, t, S.E, () => sGoal(ctx, t), () => sPoints(ctx, t));
    else if (t < S.F + 0.25) flashTo(ctx, t, S.F, () => sPoints(ctx, t), () => sPast(ctx, t));
    else if (t < S.G + 0.2) whip(ctx, t, S.G, () => sPast(ctx, t), () => sNow(ctx, t));
    else whip(ctx, t, S.H, () => sNow(ctx, t), () => sEnd(ctx, t), 0.36);
    if (t < S.H - 0.2) scorebug(ctx, t);
    captions(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 300; i++) { ctx.fillStyle = `rgba(255,255,240,${0.02 + 0.03 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
