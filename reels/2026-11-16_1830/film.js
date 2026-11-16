// "2 il dalbadal" — @bilirdinizmi_az 18:30 animated reel, 16 Nov 2026. Pure function of time.
// Kənan Nəsibov (AZE, +100 kg) won the Zagreb Grand Prix again (Nov 2026), final vs a German judoka; he also won it in Nov 2025.
// Arif voice (ElevenLabs) on audio/vo.wav; captions/objects timed to silencedetect sentence starts + syllable interpolation.
// Night-navy world with a blue tatami; Nəsibov only as a silhouette with a name plate (rule 1g). No music; soft SFX only.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = {"dur": 25.73, "lines": [{"t0": 0.03, "words": [{"w": "İki", "t": 0.03, "key": true}, {"w": "il", "t": 0.45, "key": true}, {"w": "dalbadal", "t": 0.69, "key": true}], "t1": 1.64}, {"t0": 1.64, "words": [{"w": "eyni", "t": 1.64, "key": false}, {"w": "şəhər,", "t": 1.98, "key": true}, {"w": "eyni", "t": 2.58, "key": false}, {"w": "çəki,", "t": 2.85, "key": true}, {"w": "eyni", "t": 3.16, "key": false}, {"w": "qızıl!", "t": 3.54, "key": true}], "t1": 4.7}, {"t0": 4.7, "words": [{"w": "Azərbaycan", "t": 4.7, "key": false}, {"w": "cüdoçusu", "t": 5.39, "key": false}, {"w": "Kənan", "t": 5.88, "key": true}, {"w": "Nəsibov", "t": 6.46, "key": true}, {"w": "Zaqreb", "t": 6.81, "key": true}, {"w": "Qran-prisində", "t": 7.36, "key": true}, {"w": "yenə", "t": 8.05, "key": true}, {"w": "qalib", "t": 8.43, "key": false}, {"w": "gəldi.", "t": 8.86, "key": false}], "t1": 9.57}, {"t0": 9.57, "words": [{"w": "O,", "t": 9.57, "key": false}, {"w": "100", "t": 9.75, "key": true}, {"w": "kiloqramdan", "t": 9.92, "key": false}, {"w": "yuxarı", "t": 10.48, "key": true}, {"w": "çəkidə", "t": 10.9, "key": false}, {"w": "yarışdı.", "t": 11.18, "key": false}], "t1": 12.13}, {"t0": 12.13, "words": [{"w": "Finalda", "t": 12.13, "key": true}, {"w": "almaniyalı", "t": 12.75, "key": true}, {"w": "rəqibini", "t": 13.3, "key": false}, {"w": "məğlub", "t": 13.89, "key": false}, {"w": "etdi.", "t": 14.2, "key": false}], "t1": 14.92}, {"t0": 14.92, "words": [{"w": "Düz", "t": 14.92, "key": true}, {"w": "bir", "t": 15.12, "key": false}, {"w": "il", "t": 15.31, "key": true}, {"w": "əvvəl", "t": 15.5, "key": true}, {"w": "də", "t": 15.79, "key": false}, {"w": "bu", "t": 15.94, "key": false}, {"w": "turniri", "t": 16.12, "key": false}, {"w": "o", "t": 16.56, "key": false}, {"w": "qazanmışdı.", "t": 16.74, "key": false}], "t1": 17.51}, {"t0": 17.51, "words": [{"w": "Yəni", "t": 17.51, "key": false}, {"w": "titulunu", "t": 18.02, "key": true}, {"w": "qorudu.", "t": 18.43, "key": true}], "t1": 19.28}, {"t0": 19.28, "words": [{"w": "Eyni", "t": 19.28, "key": false}, {"w": "şəhərdə,", "t": 19.68, "key": false}, {"w": "bir", "t": 20.29, "key": false}, {"w": "il", "t": 20.43, "key": true}, {"w": "sonra", "t": 20.72, "key": false}, {"w": "yenə", "t": 21.25, "key": true}, {"w": "Nəsibov!", "t": 21.53, "key": true}], "t1": 22.52}, {"t0": 22.52, "words": [{"w": "Bəyən", "t": 22.52, "key": true}, {"w": "və", "t": 22.95, "key": false}, {"w": "izlə", "t": 23.21, "key": true}], "t1": 23.86}, {"t0": 23.86, "words": [{"w": "hər", "t": 23.86, "key": false}, {"w": "gün", "t": 24.08, "key": false}, {"w": "bilmədiyin", "t": 24.31, "key": false}, {"w": "bir", "t": 24.88, "key": false}, {"w": "fakt!", "t": 25.22, "key": true}], "t1": 25.73}]};
const C = {
  night: '#0A1226', night2: '#13224A', mat: '#1F5FD1', mat2: '#2A6FE6', red: '#E23B3B', chalk: '#F6F3EA', gold: '#F5C33B',
  gold2: '#C9921C', ink: '#070B18', panel: '#0E1A36', panel2: '#1B2E5A', mute: '#9FB0D6', sil: '#04060D', sepia: '#3A2A14',
  silver: '#C9CED8', ger: '#2B2B2B',
};
const D = 'Display', UI = 'UI', SER = 'Serif';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));

const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const LN = (i) => TIMING.lines[i].t0;
const END = TIMING.dur + 1.3;
const S = { A: 0, B: LN(2) - 0.12, C: LN(3) - 0.12, D: LN(4) - 0.12, E: LN(5) - 0.12, E2: LN(6) - 0.05, F: LN(7) - 0.12, G: LN(8) - 0.12 };
const B = (t) => t / 0.5;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.3, from, to }];
const GOLD26 = T('qalib'), GOLD25 = T('qazanmışdı.');

const HITS = [
  [B(0.02), '2', 'thud'], [B(T('dalbadal')), 'İL DALBADAL chip', 'click'],
  [B(T('şəhər,')), 'row ZAQREB', 'click'], [B(T('şəhər,') + 0.25), 'check 1', 'tick'],
  [B(T('çəki,')), 'row +100', 'click'], [B(T('çəki,') + 0.2), 'check 2', 'tick'],
  [B(T('qızıl!')), 'medals drop', 'thud'], [B(T('qızıl!') + 0.2), 'check 3', 'tick'],
  WH(S.B, 600, 2200), [B(T('Azərbaycan')), 'silhouette', 'thud'], [B(T('Kənan')), 'name plate', 'click'],
  [B(T('Zaqreb')), 'pin', 'tick'], [B(T('Qran-prisində')), 'banner', 'whoosh', { len: 0.35, from: 500, to: 1500 }],
  [B(T('qalib')), 'arm up + gold 1/2', 'thud'], [B(T('gəldi.')), 'flag', 'click'],
  WH(S.C, 2200, 600), [B(T('100')), 'needle sweep', 'whoosh', { len: 0.45, from: 400, to: 1300 }], [B(T('yuxarı')), '+100 lands', 'thud'],
  [B(T('çəkidə')), 'AĞIR ÇƏKİ', 'click'],
  WH(S.D, 600, 2200), [B(T('Finalda')), 'FİNAL board', 'click'], [B(T('almaniyalı')), 'GER row', 'tick'],
  [B(T('məğlub')), 'winner row', 'thud'], [B(T('etdi.')), 'QALİB stamp', 'click'],
  WH(S.E, 2200, 600), [B(T('il', 1)), 'pages flip', 'type', { len: 0.5, n: 6 }], [B(T('turniri')), '2025 card', 'click'],
  [B(GOLD25), 'gold 2/2', 'thud'],
  [B(S.E2 + 0.05), 'shield', 'whoosh', { len: 0.3, from: 500, to: 1600 }], [B(T('qorudu.')), 'TİTUL QORUNDU stamp', 'thud'],
  WH(S.F, 600, 2200), [B(T('şəhərdə,')), '2025 podium', 'click'], [B(T('sonra')), '2026 podium', 'click'], [B(T('Nəsibov!')), '2/2', 'thud'],
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
function whip(ctx, t, t0, a, b, dur = 0.3) {
  const p = E.inOutCubic(prog(t, t0 - dur * 0.55, t0 + dur * 0.45));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(-p * W, 0); a(); ctx.restore(); ctx.save(); ctx.translate((1 - p) * W, 0); b(); ctx.restore();
}
function check(ctx, x, y, r, k, col = '#3DDC84') {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fillStyle = col; ctx.fill(); outline(ctx, 5);
  ctx.lineWidth = r * 0.28; ctx.strokeStyle = C.ink; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-r * 0.45, 0); ctx.lineTo(-r * 0.1, r * 0.35); ctx.lineTo(r * 0.5, -r * 0.35); ctx.stroke(); ctx.restore();
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
function flagDE(ctx, x, y, w, k) {
  if (k <= 0) return; const h = w * 0.6;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.save(); rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.clip();
  ctx.fillStyle = '#111'; ctx.fillRect(-w / 2, -h / 2, w, h / 3); ctx.fillStyle = '#DD0000'; ctx.fillRect(-w / 2, -h / 6, w, h / 3);
  ctx.fillStyle = '#FFCE00'; ctx.fillRect(-w / 2, h / 6, w, h / 3); ctx.restore();
  rrect(ctx, -w / 2, -h / 2, w, h, 6); outline(ctx, 5); ctx.restore();
}
// gold medal on an AZ-coloured ribbon; year engraved
function medal(ctx, x, y, r, k, year, { swing = 0, dim = false, col = C.gold } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(swing); ctx.scale(k, k);
  if (dim) ctx.globalAlpha *= 0.28;
  const rl = r * 2.4; // ribbon V
  [['#00B5E2', -1], ['#509E2F', 1]].forEach(([c, sgn]) => {
    ctx.beginPath(); ctx.moveTo(sgn * r * 0.9, -rl); ctx.lineTo(sgn * r * 0.9 - sgn * r * 0.62, -rl); ctx.lineTo(sgn * 0.12 * r, -r * 0.55); ctx.lineTo(sgn * r * 0.55, -r * 0.7); ctx.closePath();
    ctx.fillStyle = c; ctx.fill(); outline(ctx, 4);
  });
  ctx.fillStyle = '#EF3340'; ctx.fillRect(-r * 0.2, -rl, r * 0.4, rl - r * 0.75);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fillStyle = col; ctx.fill(); outline(ctx, 6);
  ctx.beginPath(); ctx.arc(0, 0, r * 0.76, 0, TAU); ctx.lineWidth = 4; ctx.strokeStyle = C.gold2; ctx.stroke();
  // shine
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.clip(); ctx.fillStyle = 'rgba(255,255,255,0.28)';
  ctx.beginPath(); ctx.ellipse(-r * 0.35, -r * 0.4, r * 0.35, r * 0.18, -0.6, 0, TAU); ctx.fill(); ctx.restore();
  text(ctx, year, 0, r * 0.2, font(r * 0.52, 800, D), C.ink, 'center');
  ctx.restore();
}
// judoka silhouette (public figure → dark outline only, no face). arm: 0 = down, 1 = right fist up.
function judoka(ctx, x, y, sc, { arm = 0, alpha = 1, rim = 'rgba(245,195,59,0.85)', col = C.sil, flip = 1, lean = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc * flip, sc); ctx.rotate(lean); ctx.globalAlpha *= alpha; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const shape = (extra, c) => {
    ctx.strokeStyle = c; ctx.fillStyle = c;
    const limb = (pts, w) => { ctx.lineWidth = w + extra; ctx.beginPath(); pts.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py))); ctx.stroke(); };
    // wide judogi trousers
    limb([[-55, -250], [-95, -120], [-120, 0]], 78); limb([[55, -250], [95, -120], [120, 0]], 78);
    limb([[-150, 6], [-100, 6]], 36); limb([[150, 6], [100, 6]], 36);
    // jacket body: broad, heavy
    ctx.lineWidth = extra || 1; ctx.beginPath(); ctx.moveTo(-130, -500); ctx.quadraticCurveTo(0, -530, 130, -500);
    ctx.lineTo(118, -230); ctx.quadraticCurveTo(0, -205, -118, -230); ctx.closePath(); ctx.fill(); if (extra) ctx.stroke();
    // left arm down-out (wide sleeve)
    limb([[-120, -485], [-190, -370], [-225, -255]], 70); limb([[-225, -255], [-232, -215]], 52);
    // right arm: lerp from down to raised fist
    const ex = lerp(190, 205, arm), ey = lerp(-370, -620, arm), hx = lerp(225, 150, arm), hy = lerp(-255, -800, arm);
    limb([[120, -485], [ex, ey], [hx, hy]], 70); limb([[hx, hy], [hx + lerp(7, -4, arm), hy + lerp(40, -40, arm)]], 56);
    // neck + head (no features) + short hair cap
    limb([[0, -520], [0, -548]], 70);
    ctx.beginPath(); ctx.ellipse(0, -610, 58 + extra / 2, 68 + extra / 2, 0, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.ellipse(0, -650, 60 + extra / 2, 38 + extra / 2, 0, Math.PI, TAU); ctx.fill();
  };
  shape(12, rim); shape(0, col);
  // lapels + belt in faint rim colour (reads as judogi)
  ctx.strokeStyle = 'rgba(245,195,59,0.45)'; ctx.lineWidth = 8;
  ctx.beginPath(); ctx.moveTo(-70, -505); ctx.lineTo(18, -330); ctx.moveTo(70, -505); ctx.lineTo(-18, -330); ctx.stroke();
  ctx.fillStyle = '#111'; ctx.strokeStyle = 'rgba(245,195,59,0.7)'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.rect(-120, -262, 240, 30); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-14, -235); ctx.lineTo(-40, -150); ctx.lineTo(-18, -146); ctx.lineTo(0, -230); ctx.lineTo(18, -146); ctx.lineTo(40, -150); ctx.lineTo(14, -235); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}
function namePlate(ctx, name, role, x, y, k, rot = -0.03) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(58, 800, UI); const w = Math.max(ctx.measureText(name).width, 300) + 80;
  rrect(ctx, -w / 2, -62, w, 150, 18); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 6, C.gold);
  text(ctx, name, 0, 0, font(58, 800, UI), C.chalk, 'center', 1);
  text(ctx, role, 0, 60, font(40, 600, UI), C.gold, 'center');
  ctx.restore();
}

// ---------------------------------------------------------------- world: night arena + tatami
function arenaBg(ctx, t, { sepia = 0 } = {}) {
  fill(ctx, C.night);
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#050914'); g.addColorStop(0.5, C.night2); g.addColorStop(1, '#060A16');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // tatami in perspective, slowly drifting
  const top = s.y + 760, bot = H + 40, drift = Math.sin(t * 0.6) * 30;
  ctx.save();
  ctx.beginPath(); ctx.moveTo(-200 + drift, bot); ctx.lineTo(W + 200 + drift, bot); ctx.lineTo(W - 120 + drift * 0.4, top); ctx.lineTo(120 + drift * 0.4, top); ctx.closePath();
  ctx.fillStyle = C.red; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-40 + drift, bot); ctx.lineTo(W + 40 + drift, bot); ctx.lineTo(W - 190 + drift * 0.4, top + 22); ctx.lineTo(190 + drift * 0.4, top + 22); ctx.closePath();
  ctx.fillStyle = C.mat; ctx.fill();
  // tatami seams
  ctx.strokeStyle = 'rgba(0,0,0,0.18)'; ctx.lineWidth = 3;
  for (let i = 1; i < 8; i++) { const yy = lerp(top + 22, bot, (i / 8) ** 1.6); ctx.beginPath(); ctx.moveTo(0, yy); ctx.lineTo(W, yy); ctx.stroke(); }
  ctx.restore();
  // floodlight beams
  [[-60, 0.5], [W + 60, 2.3]].forEach(([x, ph]) => {
    const a = 0.06 + 0.03 * Math.sin(t * 1.7 + ph);
    ctx.save(); ctx.translate(x, s.y - 140); ctx.rotate((x < 0 ? 0.5 : -0.5) + 0.05 * Math.sin(t * 0.8 + ph));
    const lg = ctx.createLinearGradient(0, 0, 0, H); lg.addColorStop(0, `rgba(220,235,255,${a * 2})`); lg.addColorStop(1, 'rgba(220,235,255,0)');
    ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(30, 0); ctx.lineTo(300, H); ctx.lineTo(-300, H); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  for (let i = 0; i < 36; i++) { const x = (hash01(i, 3) * W + t * 18 * (0.5 + hash01(i, 4))) % W, y = (hash01(i, 5) * H - t * 14) % H;
    ctx.fillStyle = `rgba(230,240,255,${0.07 + 0.1 * hash01(i, 6)})`; ctx.fillRect(x, (y + H) % H, 3, 3); }
  if (sepia > 0) { ctx.save(); ctx.globalAlpha = sepia * 0.55; ctx.globalCompositeOperation = 'color'; ctx.fillStyle = '#8A6A3A'; ctx.fillRect(0, 0, W, H); ctx.restore();
    ctx.save(); ctx.globalAlpha = sepia * 0.25; ctx.fillStyle = C.sepia; ctx.fillRect(0, 0, W, H); ctx.restore(); }
}

// ---------------------------------------------------------------- persistent bug: name + gold counter n/2
function bug(ctx, t) {
  const k = clamp(prog(t, 0.15, 0.5)); if (k <= 0) return;
  const y = s.y + s.h - 30, x0 = cx - 360, w = 720;
  ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 60);
  rrect(ctx, x0, y - 46, w, 92, 16); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 4, '#000');
  flagAZ(ctx, x0 + 58, y, 72, 1);
  text(ctx, 'NƏSİBOV', x0 + 108, y + 15, font(40, 800, UI), C.chalk, 'left');
  const n = (t >= GOLD26 ? 1 : 0) + (t >= GOLD25 ? 1 : 0);
  const lastT = n === 2 ? GOLD25 : GOLD26, bmp = n ? 1 + 0.3 * Math.exp(-(t - lastT) * 7) : 1;
  text(ctx, `QIZIL ${n}/2`, x0 + 450, y + 15, font(38, 800, D), n === 2 ? C.gold : C.chalk, 'center');
  medal(ctx, x0 + 590, y + 14, 26, t >= GOLD25 ? bmp : 1, '25', { dim: t < GOLD25 });
  medal(ctx, x0 + 660, y + 14, 26, t >= GOLD26 && t < GOLD25 ? bmp : 1, '26', { dim: t < GOLD26 });
  ctx.restore();
}

// ---------------------------------------------------------------- A: hook "2 il dalbadal" + three EYNİ checks
function sHook(ctx, t) {
  arenaBg(ctx, t);
  const t1 = T('şəhər,') - 0.06, up = E.inOutCubic(prog(t, t1 - 0.25, t1 + 0.1));
  ctx.save(); shake(ctx, B(t), B(0.02), 18, 5, 0.25);
  const k0 = t < 0.35 ? lerp(1.45, 1, E.outBack(prog(t, 0, 0.35))) : 1;
  big(ctx, '2', lerp(cx, s.x + 150, up), lerp(s.y + 820, s.y + 400, up), lerp(620, 260, up), C.gold, k0, { sw: 0.05 });
  chip(ctx, 'İL DALBADAL', lerp(cx, s.x + 470, up), lerp(s.y + 920, s.y + 330, up), lerp(84, 62, up), pop(t, T('dalbadal') - 0.04), { bg: C.chalk, rot: lerp(-0.05, 0, up) });
  ctx.restore();
  // three rows: EYNİ ŞƏHƏR / ÇƏKİ / QIZIL with a check each
  const rows = [['EYNİ ŞƏHƏR', 'ZAQREB', T('şəhər,') - 0.05], ['EYNİ ÇƏKİ', '+100 KQ', T('çəki,') - 0.05], ['EYNİ QIZIL', '', T('qızıl!') - 0.05]];
  rows.forEach(([a, b, t0], i) => {
    const k = sp(t, t0 - 0.12, SPRING.snappy); if (k <= 0) return;
    const y = s.y + 560 + i * 200, x = lerp(-600, s.x, k);
    ctx.save(); ctx.translate(x, y);
    rrect(ctx, 0, -70, s.w, 140, 22); ctx.fillStyle = i === 2 ? C.panel2 : C.panel; ctx.fill(); outline(ctx, 5, i === 2 ? C.gold : '#000');
    text(ctx, a, 36, 18, font(52, 800, UI), C.chalk, 'left');
    if (b) chip(ctx, b, s.w - 230, 0, 46, pop(t, t0 + 0.08), { bg: C.gold, rot: 0.03 });
    else [['2025', 0], ['2026', 1]].forEach(([yr, j]) => { const km = sp(t, T('qızıl!') - 0.05 + j * 0.1, SPRING.bouncy); if (km <= 0) return;
      medal(ctx, s.w - 300 + j * 120, lerp(-500, 8, Math.min(1, km)), 50, 1, yr, { swing: 0.3 * M.wobble(t - T('qızıl!') - j * 0.1, 1.4, 2.5) * (j ? 1 : -1) }); });
    check(ctx, s.w - 60, 0, 38, pop(t, t0 + 0.25));
    ctx.restore();
  });
  // counter in corner: EYNİ n/3
  const n = rows.filter((r) => t >= r[2] + 0.25).length;
  if (t > T('şəhər,')) chip(ctx, `${n}/3`, s.x + s.w - 70, s.y + 400, 46, pop(t, T('şəhər,') + 0.2), { bg: n === 3 ? '#3DDC84' : C.chalk, rot: 0.05 });
}

// ---------------------------------------------------------------- B: Nəsibov wins again in Zagreb
function sWin(ctx, t) {
  arenaBg(ctx, t);
  const t0 = S.B, tq = T('qalib') - 0.05;
  // event banner hanging at top
  const kb = sp(t, T('Qran-prisində') - 0.15, SPRING.bouncy);
  if (kb > 0) { ctx.save(); ctx.translate(cx, lerp(s.y + 120, s.y + 280, Math.min(1, kb))); ctx.rotate(0.03 * Math.sin(t * 2));
    rrect(ctx, -380, -60, 760, 130, 14); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 6);
    text(ctx, 'ZAQREB QRAN-PRİ', 0, 12, font(58, 800, D), C.ink, 'center');
    text(ctx, 'NOYABR 2026 · XORVATİYA', 0, 52, font(32, 700, UI), C.red, 'center'); ctx.restore(); }
  // city pin
  const kp = pop(t, T('Zaqreb') - 0.05);
  if (kp > 0) { ctx.save(); ctx.translate(s.x + s.w - 90, s.y + 520); ctx.scale(kp, kp); ctx.translate(0, -8 * Math.abs(Math.sin(t * 4)));
    ctx.beginPath(); ctx.moveTo(0, 60); ctx.bezierCurveTo(-60, -10, -50, -80, 0, -80); ctx.bezierCurveTo(50, -80, 60, -10, 0, 60); ctx.fillStyle = C.red; ctx.fill(); outline(ctx, 5);
    ctx.beginPath(); ctx.arc(0, -35, 18, 0, TAU); ctx.fillStyle = C.chalk; ctx.fill(); ctx.restore(); }
  // silhouette walks in, raises arm on "qalib"
  const kin = sp(t, t0 + 0.05, SPRING.gentle);
  const arm = E.outBack(prog(t, tq, tq + 0.35));
  const jx = lerp(-400, cx - 40, Math.min(1, kin)), jy = s.y + 1290;
  ctx.save(); shake(ctx, B(t), B(tq), 10, 7, 0.2);
  judoka(ctx, jx, jy, 0.95, { arm });
  ctx.restore();
  namePlate(ctx, 'KƏNAN NƏSİBOV', 'Azərbaycan · cüdo', cx + 150, s.y + 500, pop(t, T('Kənan') - 0.05), 0.04);
  flagAZ(ctx, cx + 300, s.y + 820, 180, pop(t, T('gəldi.') - 0.05), 0.08 * Math.sin(t * 5));
  // confetti from the fist after the win (deterministic)
  if (t > tq) for (let i = 0; i < 26; i++) { const q = prog(t, tq + hash01(i, 2) * 0.3, tq + 1.4 + hash01(i, 2) * 0.3); if (q <= 0 || q >= 1) continue;
    const a = -Math.PI / 2 + (hash01(i, 3) - 0.5) * 2.2, v = 380 + 360 * hash01(i, 4);
    const x = jx + 140 + Math.cos(a) * v * q, y = jy - 760 + Math.sin(a) * v * q + 600 * q * q;
    ctx.save(); ctx.translate(x, y); ctx.rotate(q * 9 * (hash01(i, 5) - 0.5)); ctx.globalAlpha = 1 - q;
    ctx.fillStyle = [C.gold, '#00B5E2', '#EF3340', '#509E2F'][i % 4]; ctx.fillRect(-9, -5, 18, 10); ctx.restore(); }
  chip(ctx, 'YENƏ QALİB', cx + 180, s.y + 1010, 60, pop(t, T('yenə') - 0.05), { bg: C.gold, rot: -0.06 });
}

// ---------------------------------------------------------------- C: weight class — scale dial past 100
function sScale(ctx, t) {
  arenaBg(ctx, t);
  const t0 = S.C, ty = T('100') - 0.05;
  const k = sp(t, t0 - 0.3, SPRING.bouncy); if (k <= 0) return;
  const x = cx, y = s.y + 740, R = 280;
  ctx.save(); ctx.translate(x, y); ctx.scale(Math.min(1.06, k), Math.min(1.06, k));
  // scale body (bathroom scale, top view)
  rrect(ctx, -R - 70, -R - 70, 2 * R + 140, 2 * R + 220, 70); ctx.fillStyle = '#E9ECF2'; ctx.fill(); outline(ctx, 8);
  rrect(ctx, -R + 40, R + 40, 2 * R - 80, 70, 30); ctx.fillStyle = '#C5CBD6'; ctx.fill(); outline(ctx, 5);
  ctx.beginPath(); ctx.arc(0, 0, R, 0, TAU); ctx.fillStyle = '#FFFFFF'; ctx.fill(); outline(ctx, 7);
  // dial 0..150 over 270°
  const a0 = Math.PI * 0.75, span = Math.PI * 1.5, ang = (v) => a0 + span * (v / 150);
  // red zone above 100
  ctx.beginPath(); ctx.arc(0, 0, R - 34, ang(100), ang(150)); ctx.lineWidth = 36; ctx.strokeStyle = 'rgba(226,59,59,0.85)'; ctx.stroke();
  for (let v = 0; v <= 150; v += 5) { const a = ang(v), r1 = R - 16, r2 = v % 25 === 0 ? R - 62 : R - 40;
    ctx.beginPath(); ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1); ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2); ctx.lineWidth = v % 25 === 0 ? 7 : 3; ctx.strokeStyle = C.ink; ctx.stroke();
    if (v % 50 === 0) text(ctx, String(v), Math.cos(a) * (R - 100), Math.sin(a) * (R - 100) + 16, font(44, 800, UI), C.ink, 'center'); }
  // needle sweeps past 100 and wobbles at ~118
  const p = E.outCubic(prog(t, ty, ty + 0.9)), val = 118 * p + 3 * M.ring(t - ty - 0.9, 2, 3);
  const a = ang(Math.max(0, val));
  ctx.save(); ctx.rotate(a); ctx.beginPath(); ctx.moveTo(-30, -10); ctx.lineTo(R - 50, 0); ctx.lineTo(-30, 10); ctx.closePath(); ctx.fillStyle = C.red; ctx.fill(); outline(ctx, 3); ctx.restore();
  ctx.beginPath(); ctx.arc(0, 0, 26, 0, TAU); ctx.fillStyle = C.ink; ctx.fill();
  text(ctx, 'KQ', 0, 130, font(48, 800, UI), C.ink, 'center');
  ctx.restore();
  big(ctx, '+100 KQ', cx - 90, s.y + 380, 130, C.gold, pop(t, T('yuxarı') - 0.05), { rot: -0.04, sw: 0.07 });
  chip(ctx, 'AĞIR ÇƏKİ', cx + 300, s.y + 470, 44, pop(t, T('çəkidə') - 0.05), { bg: C.chalk, rot: 0.08 });
}

// ---------------------------------------------------------------- D: final vs Germany — scoreboard
function sFinal(ctx, t) {
  arenaBg(ctx, t);
  const t0 = S.D, tw = T('məğlub') - 0.05;
  // two silhouettes facing, opponent dims after the win
  const kin = Math.min(1, sp(t, t0 - 0.3));
  const win = prog(t, tw, tw + 0.4);
  judoka(ctx, lerp(-300, s.x + 150, kin), s.y + 1300, 0.62, { arm: E.outBack(win), lean: 0 });
  judoka(ctx, lerp(W + 300, s.x + s.w - 150, kin), s.y + 1300, 0.62, { flip: -1, rim: 'rgba(200,210,230,0.6)', alpha: lerp(1, 0.45, win), lean: lerp(0, -0.12, win) });
  // board
  const kb = sp(t, t0 - 0.3, SPRING.bouncy); if (kb <= 0) return;
  ctx.save(); ctx.translate(cx, s.y + 500); ctx.scale(Math.min(1.05, kb), Math.min(1.05, kb));
  rrect(ctx, -400, -190, 800, 400, 26); ctx.fillStyle = '#05070D'; ctx.fill(); outline(ctx, 7, C.gold);
  text(ctx, 'FİNAL · +100 KQ', 0, -120, font(48, 800, D), C.gold, 'center');
  const row = (y, flag, name, k, lit) => { if (k <= 0) return; ctx.save(); ctx.translate(lerp(-900, 0, Math.min(1, k)), y);
    rrect(ctx, -360, -60, 720, 120, 16); ctx.fillStyle = lit ? C.gold : C.panel2; ctx.fill(); outline(ctx, 4, '#000');
    flag(ctx, -280, 0, 100, 1); text(ctx, name, -200, 20, font(54, 800, UI), lit ? C.ink : C.chalk, 'left');
    if (lit) { ctx.save(); ctx.translate(280, 0); ctx.scale(Math.min(1.1, pop(t, tw)), Math.min(1.1, pop(t, tw))); medal(ctx, 0, 14, 40, 1, '1'); ctx.restore(); }
    ctx.restore(); };
  row(-10, flagAZ, 'NƏSİBOV', sp(t, T('Finalda') - 0.05), t >= tw);
  row(130, flagDE, 'ALMANİYA', sp(t, T('almaniyalı') - 0.08), false);
  ctx.restore();
  // stamp
  const ks = pop(t, T('etdi.') - 0.03);
  if (ks > 0) { ctx.save(); ctx.translate(cx + 40, s.y + 860); ctx.rotate(-0.12); ctx.scale(lerp(2, 1, Math.min(1, ks)), lerp(2, 1, Math.min(1, ks)));
    rrect(ctx, -230, -70, 460, 140, 20); ctx.lineWidth = 12; ctx.strokeStyle = '#3DDC84'; ctx.stroke();
    text(ctx, 'QALİB', 0, 30, font(96, 800, D), '#3DDC84', 'center'); ctx.restore(); }
}

// ---------------------------------------------------------------- E: flashback — calendar flips to 2025, then title defended
function calendar(ctx, x, y, w, year, k, rot = 0) {
  if (k <= 0) return; const h = w * 1.05;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  rrect(ctx, -w / 2, -h / 2, w, h, 26); ctx.fillStyle = '#FFFDF6'; ctx.fill(); outline(ctx, 7);
  ctx.save(); rrect(ctx, -w / 2, -h / 2, w, h, 26); ctx.clip(); ctx.fillStyle = C.red; ctx.fillRect(-w / 2, -h / 2, w, h * 0.24); ctx.restore();
  ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2 + h * 0.24); ctx.lineTo(w / 2, -h / 2 + h * 0.24); outline(ctx, 5);
  for (const dx of [-w * 0.25, w * 0.25]) { rrect(ctx, dx - 14, -h / 2 - 34, 28, 70, 12); ctx.fillStyle = '#9AA3B5'; ctx.fill(); outline(ctx, 4); }
  text(ctx, 'NOYABR', 0, -h / 2 + h * 0.165, font(w * 0.13, 800, UI), C.chalk, 'center', 3);
  text(ctx, year, 0, h * 0.16, font(w * 0.36, 800, D), C.ink, 'center');
  text(ctx, 'ZAQREB', 0, h * 0.37, font(w * 0.1, 800, UI), C.red, 'center', 2);
  ctx.restore();
}
function sBack(ctx, t) {
  const tflip = T('il', 1) - 0.05, tc = T('turniri') - 0.05;
  const sep = t < S.E2 ? E.inOutCubic(prog(t, tflip, tflip + 0.4)) : 1 - E.inOutCubic(prog(t, S.E2, S.E2 + 0.4));
  arenaBg(ctx, t, { sepia: sep });
  if (t < S.E2 + 0.15) {
    const kOut = t < S.E2 ? 1 : 1 - E.inCubic(prog(t, S.E2 - 0.05, S.E2 + 0.15));
    // pages fly off backwards: 2026 → 2025
    const fp = prog(t, tflip, tflip + 0.55), yr = fp < 0.5 ? '2026' : '2025';
    const kc = pop(t, S.E + 0.02) * kOut;
    calendar(ctx, cx, s.y + 640, 460, yr, kc, -0.03 + 0.02 * Math.sin(t * 3));
    for (let i = 0; i < 4; i++) { const q = prog(t, tflip + i * 0.11, tflip + i * 0.11 + 0.5); if (q <= 0 || q >= 1) continue;
      ctx.save(); ctx.globalAlpha = 1 - q; ctx.translate(cx + q * 520 * (i % 2 ? 1 : -1), s.y + 640 - q * 500); ctx.rotate(q * 2.2 * (i % 2 ? 1 : -1));
      rrect(ctx, -200, -120, 400, 240, 16); ctx.fillStyle = '#FFFDF6'; ctx.fill(); outline(ctx, 5); ctx.restore(); }
    chip(ctx, '1 İL ƏVVƏL', cx, s.y + 330, 64, pop(t, T('Düz') - 0.05) * kOut, { bg: C.chalk, rot: -0.04 });
    // 2025 result card: gold again
    const kr = pop(t, tc) * kOut;
    if (kr > 0) { ctx.save(); ctx.translate(cx, s.y + 1060); ctx.scale(kr, kr);
      rrect(ctx, -330, -80, 660, 160, 22); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 5, C.gold);
      text(ctx, 'ZAQREB 2025', -40, -6, font(52, 800, UI), C.chalk, 'center');
      text(ctx, 'QALİB: NƏSİBOV', -40, 50, font(38, 700, UI), C.gold, 'center');
      medal(ctx, 250, 14, 58, Math.min(1.1, pop(t, GOLD25 - 0.05)) || 0.001, '2025', { dim: t < GOLD25 - 0.05 });
      ctx.restore(); }
  }
  if (t >= S.E2 - 0.05) {
    // shield with two medals: title defended
    const ksh = pop(t, S.E2);
    if (ksh > 0) { ctx.save(); ctx.translate(cx, s.y + 640); ctx.scale(ksh * 0.92, ksh * 0.92); ctx.rotate(0.03 * Math.sin(t * 2.2));
      ctx.beginPath(); ctx.moveTo(0, -330); ctx.bezierCurveTo(150, -270, 260, -280, 300, -300); ctx.bezierCurveTo(310, 20, 220, 220, 0, 340);
      ctx.bezierCurveTo(-220, 220, -310, 20, -300, -300); ctx.bezierCurveTo(-260, -280, -150, -270, 0, -330); ctx.closePath();
      ctx.fillStyle = C.panel2; ctx.fill(); outline(ctx, 10, C.gold);
      medal(ctx, -105, 30, 82, 1, '2025', { swing: 0.06 * Math.sin(t * 3) });
      medal(ctx, 105, 30, 82, 1, '2026', { swing: -0.06 * Math.sin(t * 3 + 1) });
      ctx.restore(); }
    const kst = pop(t, T('qorudu.') - 0.05);
    if (kst > 0) { ctx.save(); ctx.translate(cx, s.y + 1060); ctx.rotate(-0.06); ctx.scale(lerp(1.8, 1, Math.min(1, kst)), lerp(1.8, 1, Math.min(1, kst)));
      rrect(ctx, -330, -66, 660, 132, 18); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 7);
      text(ctx, 'TİTUL QORUNDU', 0, 26, font(70, 800, D), C.ink, 'center'); ctx.restore(); }
  }
}

// ---------------------------------------------------------------- F: payoff — two podiums, same city, a year apart
function podium(ctx, x, y, w, k, year, { sep = 0, tArm = 99, t = 0 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  const steps = [[-w / 3, 120, '2'], [0, 200, '1'], [w / 3, 80, '3']];
  steps.forEach(([dx, h, n]) => { rrect(ctx, dx - w / 6, -h, w / 3, h, 6); ctx.fillStyle = n === '1' ? C.gold : '#DDE2EA'; ctx.fill(); outline(ctx, 5);
    text(ctx, n, dx, -h + 62, font(56, 800, D), C.ink, 'center'); });
  judoka(ctx, 0, -205, 0.42, { arm: E.outBack(prog(t, tArm, tArm + 0.35)) });
  rrect(ctx, -w / 2 + 20, 20, w - 40, 84, 16); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 4, C.gold);
  text(ctx, year, 0, 80, font(56, 800, D), C.gold, 'center');
  ctx.restore();
}
function sPay(ctx, t) {
  arenaBg(ctx, t);
  chip(ctx, 'EYNİ ŞƏHƏR: ZAQREB', cx, s.y + 300, 54, pop(t, T('Eyni') - 0.05), { bg: C.chalk, rot: -0.03 });
  podium(ctx, s.x + s.w * 0.25, s.y + 1060, 400, pop(t, T('şəhərdə,') - 0.08), '2025', { sep: 1, tArm: T('şəhərdə,'), t });
  podium(ctx, s.x + s.w * 0.75, s.y + 1060, 400, pop(t, T('sonra') - 0.08), '2026', { tArm: T('yenə', 1) - 0.05, t });
  // arrow 2025 → 2026 "1 il"
  const ka = prog(t, T('bir', 1) - 0.05, T('sonra') + 0.1);
  const kf2 = 1 - prog(t, T('Nəsibov!') - 0.1, T('Nəsibov!') + 0.1);
  if (ka > 0 && kf2 > 0) { ctx.save(); ctx.globalAlpha = kf2; ctx.translate(cx, s.y + 560); ctx.strokeStyle = C.gold; ctx.lineWidth = 12; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, 130, 200, Math.PI * 1.2, Math.PI * (1.2 + 0.6 * E.outCubic(ka))); ctx.stroke();
    text(ctx, '+1 İL', 0, 0, font(54, 800, D), C.gold, 'center'); ctx.restore(); }
  const kb = pop(t, T('Nəsibov!') - 0.03);
  big(ctx, '2/2', cx, s.y + 640, 200, C.gold, kb, { rot: -0.05, sw: 0.07 });
}

// ---------------------------------------------------------------- G: end card
function envelope(ctx, x, y, w) {
  const h = w * 0.68; ctx.save(); ctx.translate(x, y);
  rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 4);
  ctx.beginPath(); ctx.moveTo(-w / 2 + 3, -h / 2 + 3); ctx.lineTo(0, h * 0.08); ctx.lineTo(w / 2 - 3, -h / 2 + 3); outline(ctx, 4); ctx.restore();
}
function sEnd(ctx, t) {
  arenaBg(ctx, t);
  const t0 = S.G;
  medal(ctx, cx - 95, s.y + 470, 95, pop(t, t0 - 0.2), '2025', { swing: 0.12 * Math.sin(t * 2.2) });
  medal(ctx, cx + 95, s.y + 470, 95, pop(t, t0 - 0.1), '2026', { swing: -0.12 * Math.sin(t * 2.2 + 0.7) });
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
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 1200); ctx.scale(kS, kS);
    ctx.font = font(46, 800, UI); const w = ctx.measureText('Cüdonu sevən dostuna göndər').width + 150;
    rrect(ctx, -w / 2, -48, w, 96, 30); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 5);
    envelope(ctx, -w / 2 + 62, 0, 62); text(ctx, 'Cüdonu sevən dostuna göndər', 38, 16, font(46, 800, UI), C.ink, 'center'); ctx.restore(); }
}

// ---------------------------------------------------------------- captions (word by word, top)
function captions(ctx, t) {
  const L = TIMING.lines; const li = L.findIndex((l, i) => t >= l.t0 - 0.05 && t < (L[i + 1] ? L[i + 1].t0 - 0.05 : END)); if (li < 0) return;
  const all = L[li].words.filter((w) => w.w !== '—'), ws = all.filter((w) => t >= w.t - 0.03); if (!ws.length) return;
  const start = Math.floor((ws.length - 1) / 3) * 3, chunk = all.slice(start, start + 3), shown = ws.slice(start);
  let size = 96; const gap = 38;
  const meas = (sz) => { ctx.font = font(sz, 800, D); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 30) { size = Math.floor(size * (s.w - 30) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 110;
  shown.forEach((w, i) => { const k = sp(t, w.t - 0.03, SPRING.bouncy), sc = Math.min(1.1, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.2; ctx.strokeStyle = C.ink; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.gold : '#FFFFFF'; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 700, UI), font(40, 600, UI)],
  hits: HITS,
  draw(ctx, u, t) {
    if (t < S.B + 0.2) whip(ctx, t, S.B, () => sHook(ctx, t), () => sWin(ctx, t));
    else if (t < S.C + 0.2) whip(ctx, t, S.C, () => sWin(ctx, t), () => sScale(ctx, t));
    else if (t < S.D + 0.2) whip(ctx, t, S.D, () => sScale(ctx, t), () => sFinal(ctx, t));
    else if (t < S.E + 0.2) whip(ctx, t, S.E, () => sFinal(ctx, t), () => sBack(ctx, t));
    else if (t < S.F + 0.2) whip(ctx, t, S.F, () => sBack(ctx, t), () => sPay(ctx, t));
    else whip(ctx, t, S.G, () => sPay(ctx, t), () => sEnd(ctx, t), 0.36);
    if (t < S.G - 0.2) bug(ctx, t);
    captions(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 300; i++) { ctx.fillStyle = `rgba(255,255,240,${0.02 + 0.03 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
