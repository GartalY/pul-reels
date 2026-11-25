// "Pakistan's first astronaut" — Whyverse 19:00 Baku trend Short, Wed 25 Nov 2026. Pure function of time.
// Shenzhou-24 launched Wed 25 Nov 2026 from Jiuquan with Tang Hongbo, Wu Yi and Muhammad Zeeshan Ali (40), Pakistan's first astronaut,
// the first foreign national to board China's Tiangong station (Dawn 25 Nov; Reuters/US News 24 Nov; Particle 25 Nov; Anadolu 25 Nov).
// Look: MISSION LOG PHOTO STORY — deep-space navy, starfield, one rocket-flame orange accent, real Wikimedia photos with log zooms and
// diagonal push transitions, a persistent mission-log HUD (counter: steps 0/4 → 4/4), fixed subtitle bar (viewer feedback 24 Nov).
import * as M from './lib/motion.js';
const { W, H, E, prog, lerp, spring, SPRING, font, text, hash01, clamp, TAU } = M;

const TIMING = __TIMING__;
const PHOTOS = __PHOTOS__;
const BEAT = __BEAT__;
const C = { bg: '#04060F', panel: 'rgba(6,9,22,0.86)', white: '#F4F1EA', dim: '#9AA3B8', acc: '#FF8A3D', accD: '#B4521C',
  pk: '#0B7A3B', ink: '#02030A', cyan: '#7FD8FF' };
const D = 'Display', UI = 'UI';
const s = M.FORMAT.safe, cx = W / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const T = (w, n = 0) => { const m = TIMING.lines.flatMap((l) => l.words).filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const END = TIMING.dur;
const B = (t) => (t - BEAT.offset) / BEAT.period;
const BAR_Y = 1350;
const fade = (t, a, b, f = 0.18) => clamp(Math.min((t - a) / f + 1, (b - t) / f + 1));
const EC = 20.3; // end card

// ---------------------------------------------------------------- shots (each a DIFFERENT real photo)
const SHOTS = [
  { k: 'launch13', t0: 0, t1: 2.0, z: [1.0, 1.16], fx: 0.5, fy: 0.45 },
  { k: 'tgsky', t0: 2.0, t1: 3.9, z: [1.0, 1.2], fx: 0.5, fy: 0.4 },
  { k: 'ali', t0: 3.9, t1: 6.3, z: [1.0, 1.1], fx: 0.5, fy: 0.35 },
  { k: 'vab', t0: 6.3, t1: 7.5, z: [1.1, 1.25], fx: 0.5, fy: 0.5 },
  { k: 'launch19', t0: 7.5, t1: 9.0, z: [1.05, 1.22], fx: 0.5, fy: 0.5 },
  { k: 'tgrender', t0: 9.0, t1: 10.6, z: [1.0, 1.12], fx: 0.5, fy: 0.5 },
  { k: 'tgrear', t0: 10.6, t1: 12.4, contain: true, z: [1.6, 1.85], fx: 0.5, fy: 0.68 },
  { k: 'handshake', t0: 12.4, t1: 14.4, z: [1.0, 1.12], fx: 0.6, fy: 0.3 },
  { k: 'tang', t0: 14.4, t1: 15.5, z: [1.0, 1.1], fx: 0.5, fy: 0.35 },
  { k: 'wuyi', t0: 15.5, t1: 16.6, z: [1.0, 1.1], fx: 0.5, fy: 0.35 },
  { k: 'cabinet', t0: 16.6, t1: 18.4, z: [1.0, 1.15], fx: 0.5, fy: 0.45 },
  { k: 'pkspace', t0: 18.4, t1: EC, z: [1.0, 1.15], fx: 0.5, fy: 0.5 },
];
let IMGS = {};
function stars(ctx, t, seed = 3) {
  for (let i = 0; i < 160; i++) { const x = hash01(i, seed) * W, y = hash01(i, seed + 1) * H, r = 1 + hash01(i, seed + 2) * 2.4;
    const tw = 0.4 + 0.6 * Math.abs(Math.sin(t * (0.6 + hash01(i, 9)) + i));
    ctx.fillStyle = `rgba(244,241,234,${0.25 + 0.6 * tw * hash01(i, 11)})`; ctx.beginPath(); ctx.arc(x, (y + t * 12 * r) % H, r, 0, TAU); ctx.fill(); }
}
function drawShot(ctx, sh, t, dx, dy) {
  const im = IMGS[sh.k]; ctx.save(); ctx.translate(dx, dy);
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H);
  if (im && sh.contain) { stars(ctx, t, 7); const p = prog(t, sh.t0 - 0.3, sh.t1 + 0.3); const z = sh.z[0] * (sh.z[1] / sh.z[0]) ** p;
    const w = W * z, h = w * im.height / im.width; ctx.drawImage(im, cx - w * sh.fx, 760 - h * sh.fy, w, h); }
  else if (im) { const p = prog(t, sh.t0 - 0.3, sh.t1 + 0.3); const z = sh.z[0] * (sh.z[1] / sh.z[0]) ** p;
    M.cover(ctx, im, 0, 0, W, H, { fx: sh.fx, fy: sh.fy, zoom: z }); }
  ctx.fillStyle = 'rgba(4,8,30,0.22)'; ctx.fillRect(0, 0, W, H);
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, 'rgba(3,5,15,0.85)'); g.addColorStop(0.24, 'rgba(3,5,15,0.1)');
  g.addColorStop(0.55, 'rgba(3,5,15,0.05)'); g.addColorStop(0.8, 'rgba(3,5,15,0.72)'); g.addColorStop(1, 'rgba(3,5,15,0.95)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const cr = PHOTOS[sh.k] && PHOTOS[sh.k].credit;
  if (cr) { ctx.globalAlpha = 0.75; text(ctx, 'Photo: ' + cr, s.x + 14, 1226, font(22, 600, UI), C.white, 'left'); ctx.globalAlpha = 1; }
  ctx.restore();
}
// diagonal push: the next photo slides up-left over the old one (different from yesterday's horizontal push)
function photos(ctx, t) {
  const i = SHOTS.findIndex((x) => t >= x.t0 && t < x.t1); if (i < 0) return;
  const cur = SHOTS[i], nxt = SHOTS[i + 1];
  const tb = cur.t1, p = nxt && nxt.t0 < EC ? E.inOutCubic(prog(t, tb - 0.18, tb)) : 0;
  if (p > 0) { drawShot(ctx, cur, t, -p * W * 0.3, -p * H * 0.15);
    ctx.save(); ctx.beginPath(); const ox = (1 - p) * W, oy = (1 - p) * H * 0.5;
    ctx.moveTo(ox + 200, oy); ctx.lineTo(W + 400, oy); ctx.lineTo(W + 400, H + 400); ctx.lineTo(ox - 200, H + 400); ctx.closePath(); ctx.clip();
    drawShot(ctx, nxt, t, ox * 0.4, oy * 0.4);
    ctx.strokeStyle = C.acc; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(ox + 200, oy); ctx.lineTo(ox - 200, H + 400); ctx.stroke(); ctx.restore(); }
  else drawShot(ctx, cur, t, 0, 0);
}
// ---------------------------------------------------------------- helpers
function big(ctx, str, x, y, size, col, k, { fam = D, wt = 800, align = 'center', max = s.w - 40 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.font = font(size, wt, fam); const mw = ctx.measureText(str).width; if (mw > max) size *= max / mw;
  ctx.translate(x, y); ctx.scale(k, k); ctx.font = font(size, wt, fam); ctx.textAlign = align; ctx.lineJoin = 'round';
  ctx.lineWidth = size * 0.1; ctx.strokeStyle = C.ink; ctx.strokeText(str, 0, 0); ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function tag(ctx, label, x, y, size, k, { bg = C.acc, fg = C.ink, rot = 0 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.font = font(size, 800, UI);
  const w = ctx.measureText(label).width + size * 1.0, h = size * 1.55;
  ctx.fillStyle = bg; M.rrect(ctx, -w / 2, -h / 2, w, h, h / 2); ctx.fill();
  ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.fillText(label, 0, size * 0.36); ctx.restore();
}
function plate(ctx, t, t0, a, l1, l2) {
  const k = sp(t, t0) * a; if (k <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.translate(lerp(-600, 0, k), 0);
  ctx.fillStyle = 'rgba(3,5,15,0.78)'; M.rrect(ctx, s.x + 10, 1000, s.w - 20, 180, 22); ctx.fill();
  ctx.fillStyle = C.acc; ctx.fillRect(s.x + 20, 1010, 16, 160);
  big(ctx, l1, s.x + 56, 1090, 84, C.white, 1, { align: 'left', max: s.w - 80 });
  text(ctx, l2, s.x + 60, 1150, font(40, 700, UI), C.acc, 'left'); ctx.restore();
}
function check(ctx, x, y, r, p, col) {
  if (p <= 0) return; ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = col; ctx.lineWidth = r * 0.22;
  const pts = [[-0.45, 0.02], [-0.12, 0.35], [0.5, -0.35]]; const L1 = 0.45, tot = 1.39; const d = p * tot;
  ctx.beginPath(); ctx.moveTo(x + pts[0][0] * r, y + pts[0][1] * r);
  if (d < L1) { const f = d / L1; ctx.lineTo(x + lerp(pts[0][0], pts[1][0], f) * r, y + lerp(pts[0][1], pts[1][1], f) * r); }
  else { ctx.lineTo(x + pts[1][0] * r, y + pts[1][1] * r); const f = (d - L1) / (tot - L1); ctx.lineTo(x + lerp(pts[1][0], pts[2][0], f) * r, y + lerp(pts[1][1], pts[2][1], f) * r); }
  ctx.stroke(); ctx.restore();
}
function pkFlag(ctx, x, y, w, k) { // Pakistan flag, drawn (not a logo)
  if (k <= 0) return; const h = w * 2 / 3; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.translate(-w / 2, -h / 2);
  ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#01411C'; ctx.fillRect(w / 4, 0, w * 3 / 4, h);
  const fx = w / 4 + w * 3 / 8, fy = h / 2; ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(fx, fy, h * 0.3, 0, TAU); ctx.fill();
  ctx.fillStyle = '#01411C'; ctx.beginPath(); ctx.arc(fx + h * 0.08, fy - h * 0.06, h * 0.27, 0, TAU); ctx.fill();
  ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? h * 0.045 : h * 0.11, a = -Math.PI / 2 + i * Math.PI / 5 + 0.6;
    ctx.lineTo(fx + h * 0.15 + Math.cos(a) * r, fy - h * 0.12 + Math.sin(a) * r); } ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(0,0,0,0.5)'; ctx.lineWidth = 4; ctx.strokeRect(0, 0, w, h); ctx.restore();
}
// ---------------------------------------------------------------- persistent HUD: mission log, steps 0/4 → 4/4 (the counter)
const STEPS = [['LAUNCH', () => T('launched')], ['DOCKED', () => T('docked')], ['ABOARD', () => T('aboard')], ['SCIENCE', () => T('algae')]];
function hud(ctx, t) {
  const y0 = 150, h = 196, x0 = s.x + 10, w = s.w - 20;
  ctx.fillStyle = C.panel; M.rrect(ctx, x0, y0, w, h, 24); ctx.fill();
  ctx.strokeStyle = 'rgba(255,138,61,0.4)'; ctx.lineWidth = 3; ctx.stroke();
  const n = STEPS.filter(([, f]) => t >= f()).length;
  text(ctx, 'SHENZHOU-24 · MISSION LOG', x0 + 28, y0 + 56, font(32, 800, UI), C.dim, 'left');
  const blink = 0.5 + 0.5 * Math.sin(t * 6); ctx.fillStyle = `rgba(255,138,61,${0.4 + 0.6 * blink})`; ctx.beginPath(); ctx.arc(x0 + w - 190, y0 + 46, 9, 0, TAU); ctx.fill();
  text(ctx, n + '/4', x0 + w - 30, y0 + 64, font(54, 800, D), n === 4 ? C.acc : C.white, 'right');
  const gx = x0 + 40, gw = w - 80, yy = y0 + 128;
  ctx.strokeStyle = 'rgba(154,163,184,0.35)'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(gx, yy); ctx.lineTo(gx + gw, yy); ctx.stroke();
  STEPS.forEach(([lab, f], i) => {
    const x = gx + gw * i / 3, on = t >= f(), k = on ? pop(t, f()) : 0;
    if (i > 0) { const pf = clamp((t - STEPS[i - 1][1]()) / 0.5) * (t >= STEPS[i - 1][1]() ? 1 : 0); if (on || pf > 0) {
      ctx.strokeStyle = C.acc; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(gx + gw * (i - 1) / 3, yy); ctx.lineTo(gx + gw * (i - 1) / 3 + gw / 3 * (on ? 1 : Math.min(pf, 0.5)), yy); ctx.stroke(); } }
    ctx.fillStyle = '#1A2036'; ctx.beginPath(); ctx.arc(x, yy, 20, 0, TAU); ctx.fill();
    if (k > 0) { ctx.fillStyle = C.acc; ctx.beginPath(); ctx.arc(x, yy, 20 * k, 0, TAU); ctx.fill(); }
    const al = i === 0 ? 'left' : i === 3 ? 'right' : 'center'; const lx = i === 0 ? x - 20 : i === 3 ? x + 20 : x;
    text(ctx, lab, lx, yy + 54, font(26, 800, UI), on ? C.white : C.dim, al);
  });
}
// ---------------------------------------------------------------- decoration (ONE element at a time)
function decor(ctx, t) {
  const Y = 720;
  if (t < 2.0) { // hook on frame 0
    big(ctx, "PAKISTAN'S", cx, Y - 170, 120, C.white, 1);
    big(ctx, '1ST', cx, Y + 110, 330, C.acc, 1 + 0.015 * Math.sin(t * 4));
    big(ctx, 'ASTRONAUT', cx, Y + 240, 130, C.white, 1); return;
  }
  if (t < 3.9) { const a = fade(t, 2.0, 3.85);
    ctx.globalAlpha = a; pkFlag(ctx, cx, Y - 40, 300, pop(t, 2.05)); tag(ctx, 'SPACE HISTORY', cx, Y + 180, 60, sp(t, T('history.') - 0.15)); ctx.globalAlpha = 1; return; }
  if (t < 6.3) { plate(ctx, t, T('Muhammad') - 0.05, fade(t, 3.95, 6.25), 'MUHAMMAD ZEESHAN ALI', 'AGE 40 · PAKISTAN'); return; }
  if (t < 7.5) { const a = fade(t, 6.35, 7.45); ctx.globalAlpha = a; tag(ctx, 'LONG MARCH 2F', cx, 1080, 54, sp(t, 6.4), { bg: C.white }); ctx.globalAlpha = 1; return; }
  if (t < 9.0) { const a = fade(t, 7.55, 8.95); ctx.globalAlpha = a;
    big(ctx, 'SHENZHOU-24', cx, Y, 150, C.white, pop(t, T('Shenzhou') - 0.1));
    tag(ctx, 'LIFTOFF · 25 NOV 2026', cx, Y + 120, 46, sp(t, T('Shenzhou') + 0.1)); ctx.globalAlpha = 1; return; }
  if (t < 10.6) { orbit(ctx, t); return; }
  if (t < 12.4) { const a = fade(t, 10.65, 12.35); const k = pop(t, T('docked') - 0.05) * a; if (k <= 0) return;
    ctx.save(); ctx.globalAlpha = a; ctx.translate(cx, Y + 40); ctx.scale(k, k); ctx.rotate(-0.06);
    ctx.fillStyle = 'rgba(2,3,10,0.7)'; M.rrect(ctx, -330, -110, 660, 220, 30); ctx.fill(); ctx.strokeStyle = C.acc; ctx.lineWidth = 10; ctx.stroke();
    text(ctx, 'DOCKED', 85, 40, font(120, 800, D), C.white, 'center'); check(ctx, -250, 0, 120, prog(t, T('docked'), T('docked') + 0.35), C.acc);
    ctx.restore(); return; }
  if (t < 14.4) { const a = fade(t, 12.45, 14.35); ctx.globalAlpha = a;
    big(ctx, '1ST FOREIGNER', cx, 1000, 140, C.acc, pop(t, T('first', 1) - 0.1));
    big(ctx, 'EVER ON BOARD', cx, 1110, 100, C.white, sp(t, T('ever') - 0.05));
    tag(ctx, '← ZEESHAN ALI', 690, 470, 40, sp(t, 12.6), { bg: C.white, rot: -0.04 }); ctx.globalAlpha = 1; return; }
  if (t < 15.5) { plate(ctx, t, 14.5, fade(t, 14.45, 15.45), 'TANG HONGBO', 'COMMANDER · CHINA'); return; }
  if (t < 16.6) { plate(ctx, t, 15.55, fade(t, 15.5, 16.55), 'WU YI', 'CREWMATE · CHINA'); return; }
  if (t < 18.4) { algae(ctx, t); return; }
  if (t < EC) { seeds(ctx, t); return; }
}
function orbit(ctx, t) { // Earth → Tiangong arc, capsule travelling ("just hours later")
  const a = fade(t, 9.05, 10.55); ctx.save(); ctx.globalAlpha = a;
  const ex = s.x + 120, ey = 1150, sx = s.x + s.w - 130, sy = 560;
  ctx.fillStyle = '#1E5FA8'; ctx.beginPath(); ctx.arc(ex, ey, 110 * sp(t, 9.05), 0, TAU); ctx.fill();
  ctx.fillStyle = 'rgba(127,216,255,0.35)'; ctx.beginPath(); ctx.arc(ex - 20, ey - 30, 60 * sp(t, 9.05), 0, TAU); ctx.fill();
  const p = E.inOutCubic(prog(t, 9.15, 10.35)), ctrl = [cx - 80, 380];
  const bez = (f) => [(1 - f) ** 2 * ex + 2 * (1 - f) * f * ctrl[0] + f * f * sx, (1 - f) ** 2 * ey + 2 * (1 - f) * f * ctrl[1] + f * f * sy];
  ctx.setLineDash([18, 16]); ctx.strokeStyle = 'rgba(244,241,234,0.7)'; ctx.lineWidth = 6; ctx.beginPath();
  for (let i = 0; i <= 40; i++) { const q = bez(i / 40 * Math.max(0.01, p)); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); } ctx.stroke(); ctx.setLineDash([]);
  // station: two panels + core
  ctx.save(); ctx.translate(sx, sy); ctx.scale(sp(t, 9.1), sp(t, 9.1)); ctx.fillStyle = C.cyan; ctx.fillRect(-120, -26, 80, 52); ctx.fillRect(40, -26, 80, 52);
  ctx.fillStyle = C.white; M.rrect(ctx, -40, -18, 80, 36, 10); ctx.fill(); ctx.restore();
  const q = bez(p); ctx.fillStyle = C.acc; ctx.beginPath(); ctx.arc(q[0], q[1], 22, 0, TAU); ctx.fill();
  big(ctx, 'JUST HOURS', cx, 1020, 110, C.white, sp(t, T('hours') - 0.1));
  ctx.restore();
}
function algae(ctx, t) {
  const a = fade(t, 16.65, 18.35); ctx.save(); ctx.globalAlpha = a;
  for (let i = 0; i < 14; i++) { const k = sp(t, T('algae') - 0.3 + i * 0.05); if (k <= 0) continue;
    const x = cx + (hash01(i, 21) - 0.5) * 640, y = 720 + (hash01(i, 22) - 0.5) * 300, r = (28 + hash01(i, 23) * 40) * k;
    ctx.fillStyle = 'rgba(70,200,110,0.85)'; ctx.beginPath(); ctx.arc(x, y + Math.sin(t * 2 + i) * 8, r, 0, TAU); ctx.fill();
    ctx.strokeStyle = 'rgba(200,255,210,0.9)'; ctx.lineWidth = 4; ctx.stroke(); }
  tag(ctx, 'MICROALGAE', cx, 1000, 60, sp(t, T('algae') - 0.1), { bg: C.white }); ctx.restore();
}
function seeds(ctx, t) {
  const a = fade(t, 18.45, EC - 0.05); ctx.save(); ctx.globalAlpha = a;
  for (let i = 0; i < 18; i++) { const k = pop(t, T('quinoa') - 0.25 + i * 0.03); if (k <= 0) continue;
    const ang = i / 18 * TAU, rr = 150 + hash01(i, 31) * 120, x = cx + Math.cos(ang + t * 0.4) * rr, y = 700 + Math.sin(ang + t * 0.4) * rr * 0.7;
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(k, k); ctx.fillStyle = '#F1D9A8'; ctx.beginPath(); ctx.ellipse(0, 0, 26, 20, 0, 0, TAU); ctx.fill();
    ctx.strokeStyle = '#8C6B3A'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
  tag(ctx, 'QUINOA SEEDS IN ORBIT', cx, 1000, 52, sp(t, T('quinoa') - 0.1)); ctx.restore();
}
// ---------------------------------------------------------------- end card
function endCard(ctx, t) {
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, W, H); stars(ctx, t);
  const p = E.inOutCubic(prog(t, EC - 0.05, EC + 0.3)); ctx.save(); ctx.translate(0, (1 - p) * 300); ctx.globalAlpha = p;
  big(ctx, 'WHYVERSE', cx, 560, 150, C.white, 1);
  text(ctx, 'big questions, visual answers', cx, 630, font(40, 600, UI), C.dim, 'center');
  const btn = (lab, x, y, t0, bg, fg) => { const k = pop(t, t0); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    ctx.fillStyle = bg; M.rrect(ctx, -200, -70, 400, 140, 70); ctx.fill(); text(ctx, lab, 0, 26, font(72, 800, D), fg, 'center'); ctx.restore(); };
  btn('LIKE', cx - 220, 820, T('Like'), C.white, C.ink);
  btn('FOLLOW', cx + 220, 820, T('follow'), C.acc, C.ink);
  const k = sp(t, T('more.') + 0.2);
  if (k > 0) { ctx.save(); ctx.globalAlpha = p * Math.min(1, k); ctx.translate(cx, 1020 + (1 - k) * 40);
    ctx.fillStyle = 'rgba(255,138,61,0.14)'; M.rrect(ctx, -460, -80, 920, 190, 28); ctx.fill();
    ctx.save(); ctx.translate(-360, 8); ctx.fillStyle = C.white; ctx.fillRect(-40, -26, 80, 52); ctx.strokeStyle = C.bg; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(-40, -26); ctx.lineTo(0, 6); ctx.lineTo(40, -26); ctx.stroke(); ctx.restore();
    text(ctx, 'Send this to the friend who', 50, -6, font(44, 800, UI), C.white, 'center');
    text(ctx, 'dreamed of being an astronaut', 50, 54, font(44, 800, UI), C.acc, 'center');
    ctx.restore(); }
  ctx.restore();
}
// ---------------------------------------------------------------- fixed subtitle bar (lower third), phrase chunks, never moves
const CHUNKS = (() => {
  const out = [];
  for (const L of TIMING.lines) {
    const sents = []; let cur = [];
    L.words.forEach((w) => { cur.push(w); if (/[.!?:]$/.test(w.w) || (/,$/.test(w.w) && cur.length >= 3)) { sents.push(cur); cur = []; } }); if (cur.length) sents.push(cur);
    for (const S of sents) { const n = Math.ceil(S.length / 5), per = Math.ceil(S.length / n);
      for (let i = 0; i < S.length; i += per) out.push({ t0: S[i].t - 0.08, words: S.slice(i, i + per) }); }
  }
  out.forEach((c, i) => { const L = TIMING.lines.find((l) => l.words.includes(c.words[c.words.length - 1]));
    const next = out[i + 1]; c.t1 = next ? Math.min(next.t0, L.t1 + 0.7) : END; });
  return out;
})();
function subtitles(ctx, t) {
  const c = CHUNKS.find((x) => t >= x.t0 && t < x.t1); if (!c) return;
  ctx.font = font(64, 800, D); const gap = 18;
  const widths = c.words.map((w) => ctx.measureText(w.w).width);
  let lines = [[0, c.words.length]]; const total = widths.reduce((a, b) => a + b, 0) + gap * (c.words.length - 1);
  if (total > s.w - 90) { let acc = 0, cut = 1; for (let i = 0; i < widths.length; i++) { acc += widths[i] + gap; if (acc > total / 2) { cut = Math.max(1, i); break; } } lines = [[0, cut], [cut, c.words.length]]; }
  const lh = 80, h = lines.length * lh + 44;
  ctx.fillStyle = 'rgba(3,5,15,0.8)'; M.rrect(ctx, s.x + 10, BAR_Y - h / 2, s.w - 20, h, 26); ctx.fill();
  lines.forEach(([a, b], li) => {
    const lw = widths.slice(a, b).reduce((p, q) => p + q, 0) + gap * (b - a - 1); let x = cx - lw / 2;
    const y = BAR_Y - h / 2 + 22 + lh * li + 60;
    for (let i = a; i < b; i++) { const w = c.words[i]; ctx.fillStyle = w.key ? C.acc : C.white; ctx.textAlign = 'left'; ctx.fillText(w.w, x, y); x += widths[i] + gap; }
  });
}
const WH = (t) => [B(t), 'wipe', 'whoosh', { len: 0.25, from: 700, to: 1700 }];
const HITS = [
  [B(0.03), 'hook', 'thud'], WH(1.85), [B(2.05), 'flag', 'pop'], [B(T('history.') - 0.15), 'history', 'bell'],
  WH(3.75), [B(T('Muhammad') - 0.05), 'name', 'click'], WH(6.15), [B(6.4), 'rocket tag', 'tick'],
  WH(7.35), [B(T('Shenzhou') - 0.1), 'shenzhou', 'thud'], [B(T('launched')), 'step1', 'blip'],
  WH(8.85), [B(9.15), 'orbit', 'whoosh', { len: 1.1, from: 300, to: 1500 }], WH(10.45), [B(T('docked') - 0.05), 'docked', 'pop'], [B(T('docked')), 'step2', 'blip'],
  WH(12.25), [B(T('first', 1) - 0.1), '1st foreigner', 'thud'], [B(T('aboard')), 'step3', 'bell'],
  WH(14.25), [B(14.5), 'tang', 'click'], WH(15.35), [B(15.55), 'wuyi', 'click'], WH(16.45), [B(T('algae') - 0.3), 'algae', 'type', { len: 0.8, n: 8 }], [B(T('algae')), 'step4', 'blip'],
  WH(18.25), [B(T('quinoa') - 0.25), 'seeds', 'type', { len: 0.6, n: 8 }],
  WH(EC - 0.15), [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop'], [B(T('more.') + 0.2), 'send', 'click'],
];
const images = {}; for (const k of Object.keys(PHOTOS)) images[k] = PHOTOS[k].src;
M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 600, UI)], samples: 6, images, hits: HITS,
  init(ctx, IMG) { IMGS = IMG; },
  draw(ctx, u, t) {
    if (t < EC) { photos(ctx, t); decor(ctx, t); hud(ctx, t); }
    else endCard(ctx, t);
    subtitles(ctx, t);
  },
});
