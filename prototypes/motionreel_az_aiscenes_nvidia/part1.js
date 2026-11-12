// "$450 milyard" — Nvidia / Jensen Huang, bilirdinizmi_az, Arif voice. Money-first hook (Gartal 21:48).
// Bright cream flat world: sunburst, flying money, piles, stage + spotlight, dossier desk, exchange board, price tag.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, hash01, clamp, TAU, ring } = M;

const C = { bg: '#F3EAD7', bg2: '#EADFC6', ray: '#F7D774', ink: '#1E1B18', green: '#3FA34D', money: '#7CC576', money2: '#4E9A57', red: '#E0452B', yel: '#F5C431',
  blue: '#3A8FD0', grey: '#8B8070', white: '#FFFDF7', skin: '#E9B98F', hair: '#C9CCD1', jacket: '#1E1E1E', wood: '#B07A4A', board: '#22262B', nv: '#76B900' };
const UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => spring(t - t0, cfg);
const VO = [[0.03, 1.71, "Dörd yüz əlli milyard dollar.", ["milyard", "dollar."]], [2.18, 1.5, "Cəmi bir neçə gündə yox oldu.", ["yox", "oldu."]], [4.18, 3.15, "Bu, Azərbaycanın bir illik iqtisadiyyatından beş dəfə çoxdur.", ["beş", "dəfə"]], [7.96, 0.32, "Səbəb?", ["Səbəb?"]], [8.86, 3.91, "Nvidia-nın qurucusu Censen Huanq arvadına xəyanət etdiyini etiraf etdi.", ["etiraf"]], [13.23, 4.01, "Bildirilir ki, ABŞ kəşfiyyatı həmin qadını Çin casusu hesab edir.", ["Çin", "casusu"]], [17.73, 2.11, "Şirkət isə deyir ki, heç bir sirr sızmayıb.", ["sirr"]], [20.36, 0.84, "Səhmlər çökdü.", ["çökdü."]], [21.68, 1.72, "Və bu gün Huanq istefa verdi.", ["istefa"]], [23.95, 3.15, "Bir etirafın qiyməti: dörd yüz əlli milyard dollar.", ["qiyməti:", "milyard"]], [27.74, 3.3, "Bəyən və izlə — hər gün bilmədiyin bir fakt!", ["Bəyən", "izlə"]]];
const WARP = [[0, 0], [0.03, 0.05], [2.18, 2.4], [4.18, 4.3], [7.96, 7.6], [8.86, 8.4], [13.23, 12.6], [17.73, 16.5], [20.36, 19.0], [21.68, 20.4], [23.95, 22.6], [27.6, 27.45], [33.0, 32.9]];
const END = WARP[WARP.length - 1][1];
const inv = (t) => { for (let i = 1; i < WARP.length; i++) { const [r0, o0] = WARP[i - 1], [r1, o1] = WARP[i]; if (t <= r1) return o0 + (o1 - o0) * clamp((t - r0) / (r1 - r0)); } return END; };
const fwd = (o) => { for (let i = 1; i < WARP.length; i++) { const [r0, o0] = WARP[i - 1], [r1, o1] = WARP[i]; if (o <= o1) return r0 + (r1 - r0) * clamp((o - o0) / (o1 - o0)); } return WARP[WARP.length - 1][0]; };
const WORDS = VO.map(([t0, d, str, keys]) => { const ws = str.split(' '), tot = ws.reduce((a, w) => a + w.length + 2, 0); let acc = 0;
  return ws.map((w) => { const st = t0 + (acc / tot) * d; acc += w.length + 2; return { w, t: st, key: keys.includes(w) }; }); });
const B = (o) => fwd(o) / 0.5;
const HITS = [
  [B(0.0), 'vault', 'thud', { gain: 0.5 }], [B(0.3), 'money', 'whoosh', { len: 0.5, from: 600, to: 2400, gain: 0.45 }], [B(2.6), 'yox oldu', 'thud', { gain: 0.45 }],
  [B(4.2), 'whip', 'whoosh', { len: 0.3, from: 2200, to: 700, gain: 0.4 }], [B(4.8), 'p1', 'click'], [B(5.2), 'p2', 'click'], [B(5.6), 'p3', 'click'], [B(6.0), 'p4', 'click'], [B(6.4), 'p5', 'click'], [B(6.8), 'x5', 'thud', { gain: 0.45 }],
  [B(7.5), 'whip', 'whoosh', { len: 0.3, from: 2200, to: 700, gain: 0.4 }], [B(7.6), 'sebeb', 'thud', { gain: 0.4 }], [B(8.5), 'spot', 'click'], [B(11.2), 'crack', 'thud', { gain: 0.4 }],
  [B(12.4), 'whip', 'whoosh', { len: 0.3, from: 2200, to: 700, gain: 0.4 }], [B(12.9), 'file', 'click'], [B(14.6), 'iddia', 'thud', { gain: 0.35 }], [B(16.6), 'shield', 'click'],
  [B(18.9), 'whip', 'whoosh', { len: 0.3, from: 2200, to: 700, gain: 0.4 }], [B(19.1), 'crash', 'tick'], [B(20.6), 'istefa', 'thud', { gain: 0.45 }],
  [B(22.5), 'whip', 'whoosh', { len: 0.3, from: 2200, to: 700, gain: 0.4 }], [B(23.0), 'tag', 'thud', { gain: 0.4 }], [B(27.5), 'end', 'click'],
];

// ---------------------------------------------------------------- shared
function bg(ctx, col = C.bg) { fill(ctx, col); ctx.fillStyle = 'rgba(120,90,40,0.06)';
  for (let i = 0; i < 90; i++) { ctx.beginPath(); ctx.arc(hash01(i, 3) * W, hash01(i, 4) * H, 2 + hash01(i, 5) * 3, 0, TAU); ctx.fill(); } }
function rays(ctx, x, y, t, col = C.ray, n = 18, a0 = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(a0 + t * 0.25); ctx.fillStyle = col;
  for (let i = 0; i < n; i++) { ctx.rotate(TAU / n); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-90, -2200); ctx.lineTo(90, -2200); ctx.closePath(); ctx.globalAlpha = 0.55; ctx.fill(); }
  ctx.restore(); ctx.globalAlpha = 1; }
function stroke(ctx, w = 7, col = C.ink) { ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineJoin = 'round'; ctx.stroke(); }
function slam(ctx, str, x, y, size, col, t0, t, rot = -0.03, from = 2.2) {
  const k = sp(t, t0, SPRING.bouncy); if (k <= 0) return; const sc = lerp(from, 1, Math.min(1, k)) * (k > 1 ? 1 + (k - 1) * 0.4 : 1);
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha = Math.min(1, k * 1.5);
  ctx.font = font(size, 800, UI); ctx.textAlign = 'center'; ctx.lineJoin = 'round'; ctx.lineWidth = size * 0.12; ctx.strokeStyle = C.ink; ctx.strokeText(str, 0, 0);
  ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore(); }
function tag(ctx, label, x, y, size, t0, t, { rot = -0.06, col = C.red, txt = C.white } = {}) {
  const k = sp(t, t0, SPRING.bouncy); if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot + 0.03 * ring(t - t0, 2.5, 4)); ctx.scale(k, k);
  ctx.font = font(size, 800, UI); const w = ctx.measureText(label).width + size * 0.9, h = size * 1.4;
  rrect(ctx, -w / 2 - 10, -h / 2 - 10, w + 20, h + 20, 22); ctx.fillStyle = C.white; ctx.fill(); stroke(ctx, 6);
  rrect(ctx, -w / 2, -h / 2, w, h, 16); ctx.fillStyle = col; ctx.fill();
  text(ctx, label, 0, size * 0.36, font(size, 800, UI), txt, 'center'); ctx.restore(); }
function bill(ctx, x, y, w, rot, alpha = 1) { const h = w * 0.46; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.globalAlpha = alpha;
  rrect(ctx, -w / 2, -h / 2, w, h, 8); ctx.fillStyle = C.money; ctx.fill(); stroke(ctx, 5);
  ctx.beginPath(); ctx.arc(0, 0, h * 0.3, 0, TAU); ctx.fillStyle = C.money2; ctx.fill();
  text(ctx, '$', 0, h * 0.14, font(h * 0.42, 800, UI), C.white, 'center'); ctx.restore(); ctx.globalAlpha = 1; }
function pile(ctx, x, base, w, n) { for (let i = 0; i < n; i++) { const y = base - i * 22;
  rrect(ctx, x - w / 2, y - 20, w, 24, 6); ctx.fillStyle = i % 2 ? C.money : C.money2; ctx.fill(); stroke(ctx, 4); } }
function floor(ctx, y, col = C.bg2) { ctx.fillStyle = col; ctx.fillRect(0, y, W, H - y); ctx.fillStyle = C.ink; ctx.fillRect(0, y, W, 7); }
function captions(ctx, t) {
  const li = VO.findIndex(([t0], i) => t >= t0 - 0.05 && t < (VO[i + 1] ? VO[i + 1][0] - 0.05 : 99)); if (li < 0) return;
  const all = WORDS[li], ws = all.filter((w) => t >= w.t); if (!ws.length) return;
  const start = Math.floor((ws.length - 1) / 3) * 3, chunk = all.slice(start, start + 3), shown = ws.slice(start);
  let size = 82; const gap = 22; ctx.textAlign = 'left';
  const meas = (sz) => { ctx.font = font(sz, 800, UI); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 40) { size = Math.floor(size * (s.w - 40) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 150;
  shown.forEach((w, i) => { const k = sp(t, w.t, SPRING.bouncy), sc = Math.min(1.12, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, UI); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.2; ctx.strokeStyle = C.ink; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.yel : C.white; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}
function whip(ctx, t, t0, a, b, dur = 0.3) { const p = E.inOutCubic(prog(t, t0, t0 + dur));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(-p * W, 0); a(); ctx.restore(); ctx.save(); ctx.translate((1 - p) * W, 0); b(); ctx.restore(); }
function bigNumber(ctx, n, x, y, size, col) { // $450 000 000 000 with thin spaces
  const str = '$' + n.toLocaleString('en-US').replace(/,/g, ' ');
  ctx.save(); ctx.translate(x, y); ctx.font = font(size, 800, UI); ctx.textAlign = 'center'; ctx.lineJoin = 'round'; ctx.lineWidth = size * 0.14; ctx.strokeStyle = C.ink;
  ctx.strokeText(str, 0, 0); ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore(); }

