// "Neft Daşları" — 15 s bilirdinizmi_az test: Arif voice (ElevenLabs), cream flat world, word captions.
// Scenes are laid out on a planned clock; WARP maps the real voice timing onto it (filled from the voice track).
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, layout, glyph, text, fill, rrect, hash01, clamp, TAU, ring } = M;

const C = { bg: '#F1E8D6', sky: '#F6EEDD', ink: '#1E1B18', red: '#E0452B', yel: '#F5C431', sea: '#2F7FC0', sea2: '#25689F', deep: '#1B4E7A', rust: '#B5532E', grey: '#8B8070', white: '#FFFDF7', steel: '#5E6670' };
const UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => spring(t - t0, cfg);

// planned clock (seconds): L0 0.1 · L1 2.2 · L2 6.6 · L3 9.6 · L4 13.5 · end 16
// VO = real timings (start, duration, text, keywords) — set from the measured voice track
const VO = __VO__;
const WARP = __WARP__;
const inv = (t) => { for (let i = 1; i < WARP.length; i++) { const [r0, o0] = WARP[i - 1], [r1, o1] = WARP[i]; if (t <= r1) return o0 + (o1 - o0) * clamp((t - r0) / (r1 - r0)); } return WARP[WARP.length - 1][1]; };
const fwd = (o) => { for (let i = 1; i < WARP.length; i++) { const [r0, o0] = WARP[i - 1], [r1, o1] = WARP[i]; if (o <= o1) return r0 + (r1 - r0) * clamp((o - o0) / (o1 - o0)); } return WARP[WARP.length - 1][0]; };
const WORDS = VO.map(([t0, d, str, keys]) => {
  const ws = str.split(' '), tot = ws.reduce((a, w) => a + w.length + 2, 0); let acc = 0;
  return ws.map((w) => { const st = t0 + (acc / tot) * d; acc += w.length + 2; return { w, t: st, key: keys.includes(w) }; });
});
const B = (o) => fwd(o) / 0.5;
const HITS = [
  [B(0.1), 'sea open', 'whoosh', { len: 0.5, from: 500, to: 1600 }], [B(1.0), 'city pop', 'impact'],
  [B(2.3), 'title', 'thud'], [B(3.4), 'ship sinks', 'sub'], [B(4.2), 'ship 2', 'thud'], [B(5.0), 'ship 3', 'thud'], [B(5.6), 'platform', 'impact'],
  [B(6.5), 'whip', 'whoosh', { len: 0.35, from: 2400, to: 700 }], [B(7.0), 'bridge', 'tick'], [B(8.6), '200 km', 'impact'],
  [B(9.5), 'whip', 'whoosh', { len: 0.35, from: 2400, to: 700 }], [B(10.6), 'trophy', 'thud'], [B(11.8), 'stamp', 'impact'],
  [B(13.4), 'end', 'whoosh', { len: 0.4, from: 800, to: 2200 }], [B(14.2), 'handle', 'click'], [B(14.8), 'İZLƏ', 'thud'],
];

// ---------------------------------------------------------------- pieces
function bg(ctx, col = C.bg) { fill(ctx, col); ctx.fillStyle = 'rgba(120,90,40,0.06)';
  for (let i = 0; i < 90; i++) { ctx.beginPath(); ctx.arc(hash01(i, 3) * W, hash01(i, 4) * H, 2 + hash01(i, 5) * 3, 0, TAU); ctx.fill(); } }
function outline(ctx, w = 7) { ctx.lineWidth = w; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.stroke(); }
function sticker(ctx, label, x, y, size, t0, t, { rot = -0.08, col = C.red, txt = C.white } = {}) {
  const k = sp(t, t0, SPRING.bouncy); if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot + 0.03 * ring(t - t0, 2.5, 4)); ctx.scale(k, k);
  ctx.font = font(size, 800, UI); const w = ctx.measureText(label).width + size * 0.9, h = size * 1.4;
  rrect(ctx, -w / 2 - 10, -h / 2 - 10, w + 20, h + 20, 22); ctx.fillStyle = C.white; ctx.fill(); outline(ctx, 6);
  rrect(ctx, -w / 2, -h / 2, w, h, 16); ctx.fillStyle = col; ctx.fill();
  text(ctx, label, 0, size * 0.36, font(size, 800, UI), txt, 'center'); ctx.restore();
}
function big(ctx, str, x, y, size, col, t0, t, rot = -0.04) {
  const k = sp(t, t0, SPRING.bouncy); if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(Math.min(1.1, k), Math.min(1.1, k));
  ctx.font = font(size, 800, UI); ctx.textAlign = 'center'; ctx.lineJoin = 'round'; ctx.lineWidth = size * 0.08; ctx.strokeStyle = C.ink;
  ctx.strokeText(str, 0, 0); ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function waves(ctx, y, t, col, amp = 16, sp2 = 3, ph = 0) {
  ctx.beginPath(); ctx.moveTo(0, H);
  for (let x = 0; x <= W; x += 12) ctx.lineTo(x, y + amp * Math.sin(x / 70 + t * sp2 + ph));
  ctx.lineTo(W, H); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
  ctx.beginPath(); for (let x = 0; x <= W; x += 12) ctx.lineTo(x, y + amp * Math.sin(x / 70 + t * sp2 + ph)); ctx.lineWidth = 7; ctx.strokeStyle = C.ink; ctx.stroke();
}
function derrick(ctx, x, base, h, col = C.rust) {
  ctx.beginPath(); ctx.moveTo(x - h * 0.22, base); ctx.lineTo(x, base - h); ctx.lineTo(x + h * 0.22, base); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); outline(ctx, 6);
  ctx.strokeStyle = C.ink; ctx.lineWidth = 4; for (let i = 1; i < 4; i++) { const yy = base - (h * i) / 4, ww = h * 0.22 * (1 - i / 4);
    ctx.beginPath(); ctx.moveTo(x - ww, yy); ctx.lineTo(x + ww, yy); ctx.stroke(); }
}
function platform(ctx, x, y, w, t0, t) {
  const k = sp(t, t0, SPRING.bouncy); if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(1, Math.min(1.05, k));
  for (let i = 0; i < 5; i++) { ctx.fillStyle = C.steel; ctx.fillRect(-w / 2 + 20 + i * (w - 40) / 4 - 8, 0, 16, 220); }
  rrect(ctx, -w / 2, -30, w, 40, 8); ctx.fillStyle = C.steel; ctx.fill(); outline(ctx, 6);
  rrect(ctx, -w / 2 + 30, -110, 130, 80, 6); ctx.fillStyle = C.white; ctx.fill(); outline(ctx, 5);
  ctx.fillStyle = C.sea; ctx.fillRect(-w / 2 + 50, -90, 30, 26); ctx.fillRect(-w / 2 + 100, -90, 30, 26);
  derrick(ctx, w / 2 - 110, -30, 260);
  ctx.restore();
}
function ship(ctx, x, y, w, rot, col) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.moveTo(-w / 2, -30); ctx.lineTo(w / 2, -30); ctx.lineTo(w / 2 - 40, 40); ctx.lineTo(-w / 2 + 40, 40); ctx.closePath();
  ctx.fillStyle = col; ctx.fill(); outline(ctx, 6);
  rrect(ctx, -w * 0.18, -80, w * 0.32, 50, 6); ctx.fillStyle = C.white; ctx.fill(); outline(ctx, 5);
  ctx.restore();
}
function captions(ctx, t) {
  const li = VO.findIndex(([t0], i) => t >= t0 - 0.05 && t < (VO[i + 1] ? VO[i + 1][0] - 0.05 : 99)); if (li < 0) return;
  const all = WORDS[li], ws = all.filter((w) => t >= w.t); if (!ws.length) return;
  const start = Math.floor((ws.length - 1) / 3) * 3, chunk = all.slice(start, start + 3), shown = ws.slice(start);
  let size = 84; const gap = 24; ctx.textAlign = 'left';
  const meas = (sz) => { ctx.font = font(sz, 800, UI); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 40) { size = Math.floor(size * (s.w - 40) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 150;
  shown.forEach((w, i) => { const k = sp(t, w.t, SPRING.bouncy), sc = Math.min(1.12, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, UI); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.18; ctx.strokeStyle = C.ink; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.yel : C.white; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}
function whip(ctx, t, t0, a, b, dur = 0.35) { const p = E.inOutCubic(prog(t, t0, t0 + dur));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(-p * W, 0); a(); ctx.restore(); ctx.save(); ctx.translate((1 - p) * W, 0); b(); ctx.restore(); }

// ---------------------------------------------------------------- S1: city in the sea + sunken ships (0–6.5)
function sSea(ctx, t) {
  bg(ctx, C.sky);
  const seaY = s.y + 620 + (1 - E.outCubic(prog(t, 0, 0.6))) * 500;
  // far "city" silhouettes pop on the horizon
  for (let i = 0; i < 5; i++) { const k = sp(t, 0.9 + i * 0.12, SPRING.bouncy); if (k <= 0) continue;
    const x = s.x + 90 + i * 190, h = 90 + hash01(i, 7) * 90; ctx.save(); ctx.translate(x, seaY); ctx.scale(1, Math.min(1.1, k));
    if (i % 2) derrick(ctx, 0, 0, h + 60, C.rust); else { ctx.beginPath(); ctx.rect(-50, -h, 100, h); ctx.fillStyle = C.steel; ctx.fill(); outline(ctx, 6); }
    ctx.restore(); }
  waves(ctx, seaY, t, C.sea, 16, 3);
  big(ctx, 'NEFT DAŞLARI', cx, s.y + 330, 120, C.yel, 2.3, t, -0.03);
  // underwater: ships sink one by one and stack
  const ships = [[3.3, cx - 120, 0.18, C.rust], [4.1, cx + 150, -0.15, '#7A5A44'], [4.9, cx, 0.05, C.rust]];
  const bottom = s.y + 1300;
  ships.forEach(([t0, x, rot, col], i) => { if (t < t0) return; const p = E.outBack(prog(t, t0, t0 + 0.7));
    ship(ctx, x, lerp(seaY - 60, bottom - i * 90, p), 300, rot * p, col); });
  if (t > 3.3) { ctx.fillStyle = 'rgba(255,255,255,0.6)'; for (let i = 0; i < 14; i++) { const ph = (t * 0.9 + hash01(i, 2)) % 1;
    ctx.beginPath(); ctx.arc(cx + (hash01(i, 3) - 0.5) * 500, lerp(bottom, seaY + 40, ph), 6 + 6 * hash01(i, 4), 0, TAU); ctx.fill(); } }
  platform(ctx, cx, bottom - 330, 520, 5.6, t);
  if (t > 2.3) sticker(ctx, '1949', s.x + 150, s.y + 560, 70, 3.0, t, { rot: -0.1, col: C.ink, txt: C.yel });
}

// ---------------------------------------------------------------- S2: 200 km of bridges (6.5–9.5)
function sBridge(ctx, t) {
  bg(ctx, C.sky);
  const seaY = s.y + 760; waves(ctx, seaY, t, C.sea, 12, 3);
  const p = E.inOutCubic(prog(t, 6.9, 8.6));
  // trestle drawing across, zig-zagging between islands
  const pts = [[s.x - 40, seaY - 40], [s.x + 220, seaY - 60], [s.x + 420, seaY - 20], [s.x + 640, seaY - 70], [s.x + 880, seaY - 30], [s.x + s.w + 60, seaY - 50]];
  const L = pts.length - 1, upto = p * L;
  ctx.lineWidth = 16; ctx.strokeStyle = C.ink; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(...pts[0]);
  for (let i = 1; i <= L; i++) { const f = clamp(upto - (i - 1)); if (f <= 0) break; ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); }
  ctx.stroke(); ctx.lineWidth = 8; ctx.strokeStyle = C.yel; ctx.stroke();
  // stilts
  for (let x = s.x; x < s.x + s.w; x += 70) { if ((x - s.x) / s.w > p) break; ctx.fillStyle = C.steel; ctx.fillRect(x, seaY - 45, 10, 120); }
  // islands
  pts.slice(1, -1).forEach(([x, y], i) => { const k = sp(t, 6.9 + i * 0.35, SPRING.bouncy); if (k <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(Math.min(1.1, k), Math.min(1.1, k)); rrect(ctx, -60, -26, 120, 40, 8); ctx.fillStyle = C.steel; ctx.fill(); outline(ctx, 5);
    if (i % 2 === 0) derrick(ctx, 20, -26, 120); ctx.restore(); });
  const km = Math.round(200 * p);
  big(ctx, `${km} km`, cx, s.y + 560, 210, C.red, 6.6, t, -0.05);
  if (t > 8.6) sticker(ctx, 'körpü dənizin üstündə', cx, s.y + 1060, 54, 8.6, t, { rot: 0.05, col: C.ink, txt: C.white });
}

// ---------------------------------------------------------------- S3: record (9.5–13.4)
function sRecord(ctx, t) {
  bg(ctx, C.bg);
  // trophy
  const k = sp(t, 10.6, SPRING.bouncy);
  if (k > 0) { ctx.save(); ctx.translate(cx, s.y + 760); ctx.scale(Math.min(1.1, k), Math.min(1.1, k)); ctx.rotate(0.04 * Math.sin(t * 2));
    ctx.beginPath(); ctx.moveTo(-170, -220); ctx.lineTo(170, -220); ctx.quadraticCurveTo(160, 40, 0, 60); ctx.quadraticCurveTo(-160, 40, -170, -220); ctx.closePath();
    ctx.fillStyle = C.yel; ctx.fill(); outline(ctx, 9);
    ctx.beginPath(); ctx.arc(-180, -130, 60, Math.PI * 0.5, Math.PI * 1.5); outline(ctx, 18); ctx.beginPath(); ctx.arc(180, -130, 60, -Math.PI * 0.5, Math.PI * 0.5); outline(ctx, 18);
    ctx.fillStyle = C.yel; ctx.fillRect(-30, 55, 60, 80); ctx.strokeRect(-30, 55, 60, 80);
    rrect(ctx, -140, 130, 280, 60, 10); ctx.fillStyle = C.ink; ctx.fill();
    text(ctx, '№1', 0, -60, font(130, 800, UI), C.ink, 'center'); ctx.restore(); }
  // sparkles
  for (let i = 0; i < 10; i++) { const q = clamp(prog(t, 10.7, 11.4)); if (q <= 0 || q >= 1) continue; const a = (i / 10) * TAU, r = 260 + 260 * E.outCubic(q);
    ctx.globalAlpha = 1 - q; ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, s.y + 660 + Math.sin(a) * r, 14, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; }
  sticker(ctx, 'DÜNYANIN ƏN QƏDİMİ', cx, s.y + 1080, 64, 11.8, t, { rot: -0.06 });
  if (t > 12.3) text(ctx, 'dəniz neft platforması · Ginnes rekordu', cx, s.y + 1220, font(42, 700, UI), C.grey, 'center');
}

// ---------------------------------------------------------------- S4: end (13.4–16)
function sEnd(ctx, t) {
  bg(ctx, '#E8DCC3');
  const k = sp(t, 13.6, SPRING.bouncy);
  if (k > 0) { ctx.save(); ctx.translate(cx, s.y + 640); ctx.rotate(0.06 * Math.sin(t * 2.4)); ctx.scale(Math.min(1.1, k), Math.min(1.1, k));
    ctx.beginPath(); ctx.arc(0, 0, 160, 0, TAU); ctx.fillStyle = C.yel; ctx.fill(); outline(ctx, 10);
    text(ctx, '?!', 0, 62, font(190, 800, UI), C.ink, 'center'); ctx.restore(); }
  if (t > 14.2) text(ctx, '@bilirdinizmi_az', cx, s.y + 950, font(82, 800, UI), C.ink, 'center');
  sticker(ctx, 'İZLƏ', cx, s.y + 1160, 96, 14.8, t, { rot: -0.08 });
}

M.film({
  fonts: [font(40, 800, UI)],
  hits: HITS,
  draw(ctx, u, tr) {
    const t = inv(tr);
    if (t < 6.5) sSea(ctx, t);
    else if (t < 9.5) whip(ctx, t, 6.5, () => sSea(ctx, t), () => sBridge(ctx, t));
    else if (t < 13.4) whip(ctx, t, 9.5, () => sBridge(ctx, t), () => sRecord(ctx, t));
    else whip(ctx, t, 13.4, () => sRecord(ctx, t), () => sEnd(ctx, t), 0.4);
    captions(ctx, tr);
  },
  post(ctx, u, t) { for (let i = 0; i < 500; i++) { ctx.fillStyle = `rgba(60,40,20,${0.03 + 0.03 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
