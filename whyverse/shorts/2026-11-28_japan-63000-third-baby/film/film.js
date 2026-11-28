// "Japan: $63,000 for a third baby" — Whyverse 19:00 Baku trend Short, Sat 28 Nov 2026. Pure function of time.
// Facts: on Fri 27 Nov 2026 the LDP's population strategy HQ (head: Hakubun Shimomura) drew up a draft set of proposals incl.
// 10-million-yen benefits each for third and subsequent children (Jiji via nippon.com 27 Nov; AA 27 Nov "$62,715"; Japan Times 28 Nov).
// Total fertility rate: record low 1.14 in 2025, 1.15 in 2024; 65+ a record 29.4% of the population (AA/Jiji).
// Look: WASHI EDITORIAL — warm washi-paper page, ink black, ONE accent (vermilion hanko red), real photos in the top band,
// a live "SUPPORT PER CHILD" yen counter in the HUD, baby row, 1.15→1.14 dial, 10-people grid, hanko stamps.
import * as M from './lib/motion.js';
const { W, H, E, prog, lerp, spring, SPRING, font, text, hash01, clamp, TAU } = M;

const TIMING = {"dur": 25.2, "lines": [{"id": "l1", "t0": 0.1, "t1": 2.875, "words": [{"w": "$63,000", "t": 0.13, "key": true}, {"w": "for", "t": 1.698, "key": false}, {"w": "a", "t": 1.951, "key": false}, {"w": "third", "t": 2.103, "key": true}, {"w": "baby?", "t": 2.457, "key": true}]}, {"id": "l2", "t0": 3.25, "t1": 8.13, "words": [{"w": "Japan's", "t": 3.28, "key": false}, {"w": "ruling", "t": 3.708, "key": true}, {"w": "party", "t": 4.136, "key": false}, {"w": "proposed", "t": 4.511, "key": false}, {"w": "it:", "t": 5.046, "key": false}, {"w": "¥10 million,", "t": 5.69, "key": true}, {"w": "from", "t": 6.91, "key": false}, {"w": "baby", "t": 7.15, "key": false}, {"w": "number", "t": 7.39, "key": false}, {"w": "three.", "t": 7.71, "key": true}]}, {"id": "l3", "t0": 8.75, "t1": 12.655, "words": [{"w": "Why?", "t": 8.78, "key": false}, {"w": "Japan's", "t": 9.26, "key": false}, {"w": "birth", "t": 9.614, "key": false}, {"w": "rate", "t": 9.924, "key": false}, {"w": "hit", "t": 10.19, "key": false}, {"w": "a", "t": 10.411, "key": false}, {"w": "record", "t": 10.544, "key": true}, {"w": "low:", "t": 10.899, "key": true}, {"w": "1.14.", "t": 11.5, "key": true}]}, {"id": "l4", "t0": 13.25, "t1": 16.506, "words": [{"w": "Nearly", "t": 13.28, "key": false}, {"w": "3 in 10", "t": 13.703, "key": true}, {"w": "people", "t": 14.549, "key": false}, {"w": "are", "t": 14.972, "key": false}, {"w": "65", "t": 15.237, "key": true}, {"w": "or", "t": 15.818, "key": false}, {"w": "older.", "t": 16.03, "key": false}]}, {"id": "l5", "t0": 17.25, "t1": 19.023, "words": [{"w": "For", "t": 17.31, "key": false}, {"w": "now,", "t": 17.57, "key": false}, {"w": "only", "t": 18.0, "key": false}, {"w": "a", "t": 18.281, "key": false}, {"w": "proposal.", "t": 18.422, "key": true}]}, {"id": "l6", "t0": 19.75, "t1": 21.736, "words": [{"w": "Like", "t": 19.78, "key": true}, {"w": "and", "t": 20.056, "key": false}, {"w": "follow", "t": 20.286, "key": true}, {"w": "Whyverse", "t": 20.654, "key": true}, {"w": "for", "t": 21.114, "key": false}, {"w": "more.", "t": 21.344, "key": false}]}]};
const PHOTOS = {"feet": {"src": "img/feet.jpg", "credit": "Omar Lopez / Unsplash"}, "hand": {"src": "img/hand.jpg", "credit": "Nathan Dumlao / Unsplash"}, "shim1": {"src": "img/shim1.jpg", "credit": "MEXT Japan / CC BY 4.0"}, "ldp": {"src": "img/ldp.jpg", "credit": "Lombroso / CC BY-SA 4.0"}, "yen": {"src": "img/yen.jpg", "credit": "Bank of Japan / public domain"}, "diet": {"src": "img/diet.jpg", "credit": "Daderot / CC0"}, "playground": {"src": "img/playground.jpg", "credit": "Leongsan / Unsplash"}, "skytree": {"src": "img/skytree.jpg", "credit": "Fabrizio Montanari / Unsplash"}, "temple": {"src": "img/temple.jpg", "credit": "Joris Beugels / Unsplash"}, "shibuya": {"src": "img/shibuya.jpg", "credit": "Chintya Akemi Keirayuki / Unsplash"}, "shim2": {"src": "img/shim2.jpg", "credit": "Wikimedia Commons / CC BY-SA 4.0"}};
const BEAT = {"offset": 0.0013, "period": 0.652181};
const C = { paper: '#F2EBDD', paper2: '#E7DDC9', ink: '#17120E', red: '#E0382B', redL: '#FF6A50', grey: '#8A7F70', white: '#FFFFFF' };
const D = 'Display', UI = 'UI';
const s = M.FORMAT.safe, cx = W / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const T = (w, n = 0) => { const m = TIMING.lines.flatMap((l) => l.words).filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const LT = (id) => TIMING.lines.find((l) => l.id === id);
const END = TIMING.dur;
const B = (t) => (t - BEAT.offset) / BEAT.period;
const BAR_Y = 1370;
const fade = (t, a, b, f = 0.15) => clamp(Math.min((t - a) / f + 1, (b - t) / f + 1));
const YEN = T('¥10 million,') - 0.05;   // the yen counter runs here
const EC = LT('l6').t0 - 0.25;           // end card

const SHOTS = [{"k": "feet", "t0": 0, "t1": 1.55, "z": [1.05, 1.2], "fx": 0.45, "fy": 0.45}, {"k": "hand", "t0": 1.55, "t1": 3.25, "z": [1.0, 1.14], "fx": 0.5, "fy": 0.4}, {"k": "shim1", "t0": 3.25, "t1": 4.75, "z": [1.0, 1.1], "fx": 0.5, "fy": 0.22, "label": "HAKUBUN SHIMOMURA", "sub": "Head, LDP population strategy HQ"}, {"k": "ldp", "t0": 4.75, "t1": 6.0, "z": [1.0, 1.14], "fx": 0.45, "fy": 0.4, "label": "LDP HEADQUARTERS \u00b7 TOKYO"}, {"k": "yen", "t0": 6.0, "t1": 7.35, "z": [1.0, 1.1], "fx": 0.78, "fy": 0.5, "bgc": "#E9E2D3"}, {"k": "diet", "t0": 7.35, "t1": 8.75, "z": [1.0, 1.15], "fx": 0.45, "fy": 0.4, "label": "NATIONAL DIET \u00b7 TOKYO"}, {"k": "playground", "t0": 8.75, "t1": 10.95, "z": [1.0, 1.14], "fx": 0.5, "fy": 0.5}, {"k": "skytree", "t0": 10.95, "t1": 13.25, "z": [1.0, 1.12], "fx": 0.5, "fy": 0.4}, {"k": "temple", "t0": 13.25, "t1": 15.25, "z": [1.0, 1.14], "fx": 0.6, "fy": 0.5}, {"k": "shibuya", "t0": 15.25, "t1": 17.25, "z": [1.0, 1.14], "fx": 0.5, "fy": 0.75}, {"k": "shim2", "t0": 17.25, "t1": 19.75, "z": [1.0, 1.12], "fx": 0.55, "fy": 0.3, "label": "HAKUBUN SHIMOMURA"}];
let IMGS = {}, PAPER = null;
const PH_ = 1180; // photo band height, fades into the paper below

function bg(ctx) { ctx.drawImage(PAPER, 0, 0); }
function shot(ctx, sh, t, alpha = 1, dx = 0) {
  const im = IMGS[sh.k]; if (!im) return;
  const p = prog(t, sh.t0 - 0.3, sh.t1 + 0.4); const z = sh.z[0] * (sh.z[1] / sh.z[0]) ** p;
  ctx.save(); ctx.globalAlpha = alpha; ctx.translate(dx, 0);
  ctx.beginPath(); ctx.rect(0, 0, W, PH_); ctx.clip();
  if (sh.bgc) { ctx.fillStyle = sh.bgc; ctx.fillRect(0, 0, W, PH_); }
  if (sh.dim) ctx.filter = `brightness(${sh.dim})`;
  M.cover(ctx, im, 0, 0, W, PH_, { fx: sh.fx, fy: sh.fy, zoom: z }); ctx.filter = 'none';
  const g = ctx.createLinearGradient(0, PH_ - 420, 0, PH_); g.addColorStop(0, 'rgba(242,235,221,0)'); g.addColorStop(1, 'rgba(242,235,221,1)');
  ctx.fillStyle = g; ctx.fillRect(0, PH_ - 420, W, 420);
  const g2 = ctx.createLinearGradient(0, 0, 0, 330); g2.addColorStop(0, 'rgba(23,18,14,0.8)'); g2.addColorStop(1, 'rgba(23,18,14,0)');
  ctx.fillStyle = g2; ctx.fillRect(0, 0, W, 330);
  ctx.restore();
}
function photos(ctx, t) {
  const i = SHOTS.findIndex((x) => t >= x.t0 && t < x.t1); if (i < 0) return;
  const cur = SHOTS[i], prev = SHOTS[i - 1];
  const p = i === 0 ? 1 : E.outCubic(prog(t, cur.t0, cur.t0 + 0.35));
  const dir = i % 2 ? 1 : -1;
  if (prev && p < 1) shot(ctx, prev, t, 1, -dir * 1080 * p);   // whip: A slides out as B slides in
  shot(ctx, cur, t, 1, dir * 1080 * (1 - p));
  const cr = PHOTOS[cur.k] && PHOTOS[cur.k].credit;
  if (cr) text(ctx, 'Photo: ' + cr, s.x + 14, 1262, font(22, 700, UI), 'rgba(23,18,14,0.6)', 'left');
  if (cur.label) { const k = sp(t, cur.t0 + 0.15); if (k > 0) { ctx.save(); ctx.globalAlpha = Math.min(1, k);
    ctx.font = font(38, 800, UI); const w = ctx.measureText(cur.label).width + 44; const x = s.x + 14, y = 270;
    ctx.fillStyle = C.red; ctx.fillRect(x, y, 10, 62); ctx.fillStyle = 'rgba(23,18,14,0.85)'; ctx.fillRect(x + 10, y, w * Math.min(1, k), 62);
    ctx.fillStyle = C.white; ctx.textAlign = 'left'; ctx.fillText(cur.label, x + 32, y + 44);
    if (cur.sub) { ctx.font = font(28, 700, UI); const w2 = ctx.measureText(cur.sub).width + 44; ctx.fillStyle = 'rgba(242,235,221,0.92)';
      ctx.fillRect(x + 10, y + 62, w2 * Math.min(1, k), 46); ctx.fillStyle = C.ink; ctx.fillText(cur.sub, x + 32, y + 96); }
    ctx.restore(); } }
}
// ---------------------------------------------------------------- helpers
function big(ctx, str, x, y, size, col, k, { fam = D, wt = 700, align = 'center', max = s.w - 40, stroke = 'rgba(242,235,221,0.95)' } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.font = font(size, wt, fam); const mw = ctx.measureText(str).width; if (mw > max) size *= max / mw;
  ctx.translate(x, y); ctx.scale(k, k); ctx.font = font(size, wt, fam); ctx.textAlign = align;
  if (stroke) { ctx.lineJoin = 'round'; ctx.lineWidth = size * 0.14; ctx.strokeStyle = stroke; ctx.strokeText(str, 0, 0); }
  ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function tag(ctx, label, x, y, size, k, { bg = C.red, fg = C.white } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.font = font(size, 800, UI);
  const w = ctx.measureText(label).width + size * 1.1, h = size * 1.7;
  ctx.fillStyle = bg; M.rrect(ctx, -w / 2, -h / 2, w, h, 8); ctx.fill();
  ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.fillText(label, 0, size * 0.36); ctx.restore();
}
function card(ctx, x, y, w, h, a = 1) { // a paper card with a soft shadow (decoration sits on it)
  ctx.save(); ctx.globalAlpha *= a; ctx.shadowColor = 'rgba(23,18,14,0.28)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10;
  ctx.fillStyle = C.paper; M.rrect(ctx, x, y, w, h, 16); ctx.fill(); ctx.restore();
}
function hanko(ctx, label, x, y, r, t, t0, rot = -0.18) { // a red stamp that slams down (scale 1.6 -> 1) with a rough ring
  if (t < t0) return; const f = prog(t, t0, t0 + 0.16); const sc = lerp(1.7, 1, E.outCubic(f)) + M.wobble(t - t0 - 0.16, 3, 9) * 0.03;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha = Math.min(1, f * 1.5) * 0.92;
  ctx.strokeStyle = C.red; ctx.lineWidth = r * 0.09; ctx.beginPath();
  for (let i = 0; i <= 64; i++) { const a = (i / 64) * TAU, rr = r * (1 + (hash01(i, 7) - 0.5) * 0.035); i ? ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : ctx.moveTo(rr, 0); }
  ctx.stroke(); ctx.lineWidth = r * 0.035; ctx.beginPath(); ctx.arc(0, 0, r * 0.82, 0, TAU); ctx.stroke();
  const parts = label.split('\n'); ctx.fillStyle = C.red; ctx.textAlign = 'center';
  const fs = r * (parts.length > 1 ? 0.3 : 0.36); ctx.font = font(fs, 800, UI);
  parts.forEach((p, i) => ctx.fillText(p, 0, fs * 0.36 + (i - (parts.length - 1) / 2) * fs * 1.1));
  ctx.restore();
}
function baby(ctx, x, y, r, col, k) { // flat swaddled baby: head + wrapped body
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.fillStyle = col; M.rrect(ctx, -r * 0.62, -r * 0.1, r * 1.24, r * 1.35, r * 0.6); ctx.fill();
  ctx.fillStyle = '#F7D9BE'; ctx.beginPath(); ctx.arc(0, -r * 0.42, r * 0.48, 0, TAU); ctx.fill();
  ctx.strokeStyle = C.ink; ctx.lineWidth = r * 0.07; ctx.beginPath(); ctx.arc(0, -r * 0.42, r * 0.48, 0, TAU); ctx.stroke();
  M.rrect(ctx, -r * 0.62, -r * 0.1, r * 1.24, r * 1.35, r * 0.6); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-r * 0.5, r * 0.45); ctx.lineTo(r * 0.5, r * 0.2); ctx.stroke();
  ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(-r * 0.16, -r * 0.44, r * 0.05, 0, TAU); ctx.arc(r * 0.16, -r * 0.44, r * 0.05, 0, TAU); ctx.fill();
  ctx.restore();
}
function person(ctx, x, y, r, col) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - r * 1.15, r * 0.5, 0, TAU); ctx.fill();
  M.rrect(ctx, x - r * 0.62, y - r * 0.55, r * 1.24, r * 1.55, r * 0.5); ctx.fill(); }
// ---------------------------------------------------------------- top HUD: topic tag + live yen counter
function hud(ctx, t) {
  const y = 160;
  tag(ctx, 'JAPAN · BABY PLAN', s.x + 175, y, 30, 1);
  const rp = E.outCubic(prog(t, YEN, YEN + 0.9));
  const n = t < YEN ? 0 : Math.round(10000000 * rp);
  ctx.save(); ctx.fillStyle = 'rgba(23,18,14,0.72)'; M.rrect(ctx, s.x + s.w - 400, y - 66, 400, 132, 14); ctx.fill(); ctx.restore();
  ctx.save(); ctx.font = font(28, 800, UI); ctx.textAlign = 'right'; ctx.fillStyle = C.white; ctx.fillText('SUPPORT PER 3RD CHILD', s.x + s.w - 20, y - 26); ctx.restore();
  text(ctx, '¥' + n.toLocaleString('en-US'), s.x + s.w - 20, y + 44, font(62, 700, D), t < YEN ? C.white : C.redL, 'right');
}
// ---------------------------------------------------------------- decoration (ONE element at a time, never over the subtitle bar)
function decor(ctx, t) {
  const l2 = LT('l2').t0, l3 = LT('l3').t0, l4 = LT('l4').t0, l5 = LT('l5').t0;
  if (t < l2 - 0.05) { // hook on frame 0
    big(ctx, '$63,000', cx, 960, 230, C.red, 1);
    tag(ctx, 'FOR A 3RD BABY?', cx, 1075, 52, Math.max(t < 0.05 ? 1 : 0, Math.min(1, 0.85 + sp(t, 0) * 0.15)), { bg: C.ink });
    return; }
  if (t < YEN - 0.05) { const a = fade(t, l2 - 0.05, YEN - 0.05);
    ctx.save(); ctx.globalAlpha = a; tag(ctx, 'RULING PARTY PROPOSAL · 27 NOV', cx, 1080, 40, sp(t, T('proposed') - 0.1)); ctx.restore(); return; }
  if (t < l3 - 0.1) { babies(ctx, t, fade(t, YEN - 0.05, l3 - 0.12)); return; }
  if (t < T('record') - 0.15) { const a = fade(t, l3 - 0.1, T('record') - 0.15);
    ctx.save(); ctx.globalAlpha = a; big(ctx, 'WHY?', cx, 1010, 200, C.ink, pop(t, l3 - 0.05)); ctx.restore(); return; }
  if (t < l4 - 0.1) { rate(ctx, t, fade(t, T('record') - 0.15, l4 - 0.12)); return; }
  if (t < l5 - 0.1) { people(ctx, t, fade(t, l4 - 0.1, l5 - 0.12)); return; }
  if (t < EC) { const a = fade(t, l5 - 0.1, EC - 0.03); ctx.save(); ctx.globalAlpha = a;
    card(ctx, cx - 300, 760, 600, 470); text(ctx, 'FOR NOW', cx, 840, font(44, 800, UI), C.grey, 'center', 4); hanko(ctx, 'PROPOSAL', cx, 1000, 140, t, T('only') - 0.05);
    tag(ctx, 'NOT YET LAW', cx, 1185, 40, sp(t, l5 - 0.05), { bg: C.ink }); ctx.restore(); return; }
}
function babies(ctx, t, a) { // three babies; the 3rd lights up red with ¥10,000,000
  ctx.save(); ctx.globalAlpha = a; card(ctx, s.x + 30, 760, s.w - 60, 470);
  const xs = [cx - 290, cx, cx + 290], ts = [YEN, YEN + 0.35, T('three.') - 0.1];
  xs.forEach((x, i) => { const k = pop(t, ts[i]); const third = i === 2;
    baby(ctx, x, 940, third ? 92 : 74, third ? C.red : C.grey, k);
    big(ctx, ['1st', '2nd', '3rd'][i], x, 1095, 52, third ? C.red : C.ink, k, { fam: UI, wt: 800, stroke: null }); });
  const k3 = pop(t, T('three.'));
  tag(ctx, '¥10 MILLION ≈ $63,000', cx, 1175, 40, k3);
  ctx.restore();
}
function rate(ctx, t, a) { // fertility rate: 1.15 (2024) -> 1.14 (2025), record low stamp
  ctx.save(); ctx.globalAlpha = a; card(ctx, s.x + 30, 740, s.w - 60, 500);
  const t0 = T('record') - 0.15;
  text(ctx, 'BABIES PER WOMAN', cx, 815, font(40, 800, UI), C.grey, 'center', 3);
  const f = E.inOutCubic(prog(t, t0 + 0.1, T('1.14.') + 0.2));
  const v = lerp(1.15, 1.14, f);
  big(ctx, v.toFixed(2), cx - 70, 1030, 230, C.ink, pop(t, t0), { stroke: null });
  text(ctx, f < 0.5 ? '2024' : '2025', cx - 70, 1120, font(44, 800, UI), f < 0.5 ? C.grey : C.red, 'center', 2);
  hanko(ctx, 'RECORD\nLOW', cx + 300, 990, 120, t, T('low:') - 0.05, 0.2);
  ctx.restore();
}
function people(ctx, t, a) { // 10 people; 3 turn red = 65+
  ctx.save(); ctx.globalAlpha = a; card(ctx, s.x + 30, 740, s.w - 60, 500);
  const t0 = LT('l4').t0, tr = T('3 in 10') + 0.2;
  for (let i = 0; i < 10; i++) { const r = i % 5, row = Math.floor(i / 5); const x = cx - 360 + r * 180, y = 900 + row * 180;
    const k = sp(t, t0 + i * 0.05); if (k <= 0) continue; const old = i >= 7 && t > tr + (i - 7) * 0.12;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); person(ctx, 0, 0, 52, old ? C.red : C.ink); ctx.restore(); }
  tag(ctx, '65+  ·  29.4%  ·  RECORD HIGH', cx, 1190, 38, sp(t, T('65') - 0.1));
  ctx.restore();
}
// ---------------------------------------------------------------- end card
function endCard(ctx, t) {
  bg(ctx);
  for (let i = 0; i < 12; i++) { const f = t - EC; const y = 260 + hash01(i, 31) * 1400, v = 60 + hash01(i, 32) * 90; // drifting petals keep the card alive
    const x = ((f * v + hash01(i, 33) * W * 1.4) % (W + 200)) - 100; ctx.save(); ctx.translate(x, y + Math.sin(f * 2 + i) * 20); ctx.rotate(f + i);
    ctx.fillStyle = 'rgba(224,56,43,0.35)'; ctx.beginPath(); ctx.ellipse(0, 0, 14, 8, 0, 0, TAU); ctx.fill(); ctx.restore(); }
  const p = E.inOutCubic(prog(t, EC - 0.05, EC + 0.3)); ctx.save(); ctx.translate(0, (1 - p) * 300); ctx.globalAlpha = p;
  big(ctx, 'WHYVERSE', cx, 560, 150, C.ink, 1, { stroke: null });
  text(ctx, 'big questions, visual answers', cx, 640, font(40, 700, UI), C.grey, 'center');
  const btn = (lab, x, y, t0, bg, fg) => { const k = pop(t, t0); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    ctx.fillStyle = bg; M.rrect(ctx, -200, -70, 400, 140, 70); ctx.fill(); text(ctx, lab, 0, 26, font(70, 800, UI), fg, 'center'); ctx.restore(); };
  btn('LIKE', cx - 220, 820, T('Like'), C.ink, C.paper);
  btn('FOLLOW', cx + 220, 820, T('follow'), C.red, C.white);
  const k = sp(t, T('more.') + 0.1);
  if (k > 0) { ctx.save(); ctx.globalAlpha = p * Math.min(1, k); ctx.translate(cx, 1030 + (1 - k) * 40);
    ctx.fillStyle = 'rgba(23,18,14,0.06)'; M.rrect(ctx, -470, -80, 940, 190, 20); ctx.fill(); ctx.strokeStyle = C.red; ctx.lineWidth = 4; ctx.stroke();
    ctx.save(); ctx.translate(-380, 14); ctx.fillStyle = C.red; ctx.fillRect(-40, -26, 80, 52); ctx.strokeStyle = C.paper; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(-40, -26); ctx.lineTo(0, 6); ctx.lineTo(40, -26); ctx.stroke(); ctx.restore();
    text(ctx, 'Send this to the friend', 50, -4, font(46, 800, UI), C.ink, 'center');
    text(ctx, 'who already has two kids', 50, 56, font(46, 800, UI), C.red, 'center');
    ctx.restore(); }
  ctx.restore();
}
// ---------------------------------------------------------------- fixed subtitle bar (lower third), phrase chunks, never moves
const CHUNKS = (() => {
  const out = [];
  for (const L of TIMING.lines) {
    const sents = []; let cur = [];
    L.words.forEach((w) => { cur.push(w); if (/[.!?:]$/.test(w.w) || (/,$/.test(w.w) && cur.length >= 2)) { sents.push(cur); cur = []; } }); if (cur.length) sents.push(cur);
    for (const S of sents) { const n = Math.ceil(S.length / 6), per = Math.ceil(S.length / n);
      for (let i = 0; i < S.length; i += per) out.push({ t0: S[i].t - 0.08, words: S.slice(i, i + per) }); }
  }
  out.forEach((c, i) => { const L = TIMING.lines.find((l) => l.words.includes(c.words[c.words.length - 1]));
    const next = out[i + 1]; c.t1 = next ? Math.min(next.t0, L.t1 + 0.7) : Math.min(END, L.t1 + 0.9); });
  return out;
})();
function subtitles(ctx, t) {
  const c = CHUNKS.find((x) => t >= x.t0 && t < x.t1); if (!c) return;
  const fs = 58; ctx.font = font(fs, 800, UI); const gap = 16, maxW = s.w - 80;
  const widths = c.words.map((w) => ctx.measureText(w.w).width);
  const total = widths.reduce((a, b) => a + b, 0) + gap * (c.words.length - 1);
  let lines = [[0, c.words.length]];
  if (total > maxW) { let best = 1, bd = 1e9; for (let k = 1; k < c.words.length; k++) { const a = widths.slice(0, k).reduce((p, q) => p + q, 0) + gap * (k - 1);
      const b = total - a - gap; const d = Math.max(a, b); if (d < bd) { bd = d; best = k; } } lines = [[0, best], [best, c.words.length]]; }
  const lh = 72, h = lines.length * lh + 40;
  ctx.fillStyle = 'rgba(23,18,14,0.9)'; M.rrect(ctx, s.x + 10, BAR_Y - h / 2, s.w - 20, h, 14); ctx.fill();
  ctx.fillStyle = C.red; ctx.fillRect(s.x + 10, BAR_Y - h / 2 + 14, 6, h - 28);
  lines.forEach(([a, b], li) => {
    const lw = widths.slice(a, b).reduce((p, q) => p + q, 0) + gap * (b - a - 1); let x = cx - lw / 2;
    const y = BAR_Y - h / 2 + 20 + lh * li + 54;
    for (let i = a; i < b; i++) { const w = c.words[i]; ctx.fillStyle = w.key ? C.redL : C.white; ctx.textAlign = 'left'; ctx.fillText(w.w, x, y); x += widths[i] + gap; }
  });
}
const CUT = (t) => [B(t), 'cut', 'whoosh', { len: 0.22, from: 900, to: 2400 }];
const HITS = [
  [B(0.03), 'hook', 'thud'],
  ...SHOTS.slice(1).map((x) => CUT(x.t0)),
  [B(T('proposed') - 0.1), 'proposal tag', 'pop'],
  [B(YEN), 'yen counter', 'coins'], [B(YEN + 0.35), 'baby2', 'pop'], [B(T('three.') - 0.1), 'baby3', 'pop'], [B(T('three.')), 'yen tag', 'bell'],
  [B(LT('l3').t0 - 0.05), 'why', 'thud'], [B(T('record') - 0.15), 'rate', 'pop'], [B(T('low:') - 0.05), 'record stamp', 'thud'],
  [B(T('3 in 10') + 0.2), 'three red', 'tick'], [B(T('65') - 0.1), 'tag 65', 'pop'],
  [B(T('only') - 0.05), 'proposal stamp', 'thud'],
  [B(EC - 0.05), 'end', 'whoosh', { len: 0.3, from: 600, to: 1800 }], [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop'], [B(T('more.') + 0.1), 'send', 'click'],
];
const images = {}; for (const k of Object.keys(PHOTOS)) images[k] = PHOTOS[k].src;
M.film({
  fonts: [font(40, 700, D), font(40, 800, UI), font(40, 700, UI)], samples: 5, images, hits: HITS,
  init(ctx, IMG) { IMGS = IMG;
    PAPER = document.createElement('canvas'); PAPER.width = W; PAPER.height = H; const d = PAPER.getContext('2d');
    const g = d.createLinearGradient(0, 0, 0, H); g.addColorStop(0, C.paper); g.addColorStop(1, C.paper2); d.fillStyle = g; d.fillRect(0, 0, W, H);
    for (let i = 0; i < 900; i++) { const x = hash01(i, 1) * W, y = hash01(i, 2) * H, l = 6 + hash01(i, 3) * 30, a = hash01(i, 4) * TAU; // washi fibres
      d.strokeStyle = `rgba(120,100,70,${0.05 + hash01(i, 5) * 0.08})`; d.lineWidth = 1 + hash01(i, 6); d.beginPath(); d.moveTo(x, y);
      d.quadraticCurveTo(x + Math.cos(a) * l * 0.5 + 4, y + Math.sin(a) * l * 0.5, x + Math.cos(a) * l, y + Math.sin(a) * l); d.stroke(); } },
  draw(ctx, u, t) {
    if (t < EC) { bg(ctx); photos(ctx, t); decor(ctx, t); hud(ctx, t); }
    else endCard(ctx, t);
    subtitles(ctx, t);
  },
});
