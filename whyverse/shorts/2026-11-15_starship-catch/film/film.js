// "22.5 hours in space. Then a tower caught it." — Whyverse daily trend Short, 15 Nov 2026. Pure function of time.
// SpaceX Starship Flight 15 (launched 13 Nov, ship caught by the launch tower's arms 14 Nov after ~22.5 h; booster splashed down).
// Kokoro af_heart voice on audio/vo.wav; every caption word / object is timed to its spoken word (TIMING from the VO edit).
// Structure copied from the AZ football reel (reels/2026-11-14_1830): number on frame 0, persistent catch scorebug,
// flashback (2024 booster catch), twist (booster splashdown), payoff (reuse), spoken + on-screen CTA.
// Look: NIGHT-SPACE MISSION (deep navy space, glowing Earth limb, steel rocket, orange plasma) — not blueprint / kinetic type.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = {"dur": 23.052, "lines": [{"t0": 0.1, "t1": 3.255, "words": [{"w": "22.5", "t": 0.13, "key": true}, {"w": "hours", "t": 1.223, "key": true}, {"w": "in", "t": 1.529, "key": false}, {"w": "space.", "t": 1.704, "key": false}, {"w": "Then", "t": 2.34, "key": false}, {"w": "a", "t": 2.514, "key": false}, {"w": "tower", "t": 2.6, "key": true}, {"w": "caught", "t": 2.803, "key": true}, {"w": "it.", "t": 3.034, "key": false}]}, {"t0": 3.5, "t1": 7.926, "words": [{"w": "SpaceX's", "t": 3.54, "key": false}, {"w": "Starship", "t": 3.994, "key": true}, {"w": "dropped", "t": 4.497, "key": false}, {"w": "26", "t": 4.951, "key": true}, {"w": "satellites,", "t": 5.505, "key": false}, {"w": "then", "t": 6.45, "key": false}, {"w": "fell", "t": 6.699, "key": false}, {"w": "home", "t": 6.948, "key": false}, {"w": "through", "t": 7.197, "key": false}, {"w": "fire.", "t": 7.571, "key": true}]}, {"t0": 8.25, "t1": 10.205, "words": [{"w": "Steel", "t": 8.3, "key": true}, {"w": "arms", "t": 8.569, "key": false}, {"w": "snatched", "t": 8.8, "key": true}, {"w": "it", "t": 9.185, "key": false}, {"w": "out", "t": 9.339, "key": false}, {"w": "of", "t": 9.531, "key": false}, {"w": "the", "t": 9.685, "key": false}, {"w": "air.", "t": 9.878, "key": false}]}, {"t0": 10.5, "t1": 13.219, "words": [{"w": "Back", "t": 10.53, "key": false}, {"w": "in", "t": 10.772, "key": false}, {"w": "2024,", "t": 10.933, "key": true}, {"w": "they", "t": 12.02, "key": false}, {"w": "first", "t": 12.205, "key": false}, {"w": "caught", "t": 12.421, "key": true}, {"w": "the", "t": 12.668, "key": false}, {"w": "booster.", "t": 12.822, "key": true}]}, {"t0": 13.5, "t1": 16.81, "words": [{"w": "This", "t": 13.54, "key": false}, {"w": "time,", "t": 13.805, "key": false}, {"w": "the", "t": 14.12, "key": false}, {"w": "booster", "t": 14.333, "key": false}, {"w": "ran", "t": 14.717, "key": false}, {"w": "low", "t": 14.93, "key": true}, {"w": "on", "t": 15.144, "key": false}, {"w": "fuel,", "t": 15.314, "key": true}, {"w": "and", "t": 15.84, "key": false}, {"w": "splashed", "t": 16.042, "key": true}, {"w": "down.", "t": 16.447, "key": false}]}, {"t0": 17.0, "t1": 20.925, "words": [{"w": "The", "t": 17.03, "key": false}, {"w": "ship", "t": 17.207, "key": true}, {"w": "was", "t": 17.42, "key": false}, {"w": "the", "t": 17.597, "key": false}, {"w": "hard", "t": 17.775, "key": true}, {"w": "part.", "t": 17.987, "key": false}, {"w": "Catch", "t": 18.54, "key": false}, {"w": "both,", "t": 18.847, "key": true}, {"w": "and", "t": 19.31, "key": false}, {"w": "rockets", "t": 19.54, "key": false}, {"w": "fly", "t": 19.955, "key": false}, {"w": "like", "t": 20.185, "key": false}, {"w": "planes.", "t": 20.462, "key": true}]}, {"t0": 21.25, "t1": 23.052, "words": [{"w": "Like", "t": 21.28, "key": true}, {"w": "and", "t": 21.528, "key": false}, {"w": "follow", "t": 21.734, "key": true}, {"w": "Whyverse", "t": 22.064, "key": true}, {"w": "for", "t": 22.476, "key": false}, {"w": "more.", "t": 22.682, "key": false}]}]};
const C = {
  space: '#03071A', space2: '#0A1638', steel: '#D3DAE3', steel2: '#9AA5B4', steelD: '#5E6876', tile: '#16181E',
  orange: '#FF8A2A', fire: '#FFC15A', white: '#F4F6FA', ink: '#050912', panel: '#0C1530', panel2: '#17244A',
  red: '#EF4A3F', green: '#3BD17A', earth: '#2F74D6', earthD: '#0E2F6B', land: '#5E8A4A', sea: '#0C3B4C', sea2: '#125468',
  truss: '#1C2129', mute: '#8E9AB0',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const LN = (i) => TIMING.lines[i].t0;
const END = 25.0;
const S = { A: 0, B: LN(1) - 0.1, C: LN(2) - 0.12, D: LN(3) - 0.1, E: LN(4) - 0.1, F: LN(5) - 0.1, G: LN(6) - 0.1 };
const B = (t) => t / 0.500024;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.32, from, to }];

// ---------------------------------------------------------------- helpers
function outline(ctx, w = 6, col = C.ink) { ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineJoin = 'round'; ctx.stroke(); }
function big(ctx, str, x, y, size, col, k, { stroke = C.ink, rot = 0, fam = D, wt = 800, sw = 0.08 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, fam); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
  if (stroke) { ctx.lineWidth = size * sw; ctx.strokeStyle = stroke; ctx.strokeText(str, 0, 0); }
  ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function chip(ctx, label, x, y, size, k, { bg = C.orange, fg = C.ink, rot = -0.04, edge = C.ink, fam = UI, wt = 800 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, fam); const w = ctx.measureText(label).width + size * 1.0, h = size * 1.55;
  rrect(ctx, -w / 2, -h / 2, w, h, h * 0.3); ctx.fillStyle = bg; ctx.fill(); outline(ctx, 5, edge);
  text(ctx, label, 0, size * 0.36, font(size, wt, fam), fg, 'center'); ctx.restore();
}
function stamp(ctx, label, x, y, size, t, t0, col = C.orange, rot = -0.1) {
  const k = t >= t0 ? Math.min(1.05, lerp(1.8, 1, E.outBack(prog(t, t0, t0 + 0.25)))) : 0; if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, 800, D); const w = ctx.measureText(label).width + size * 0.9, h = size * 1.5;
  rrect(ctx, -w / 2, -h / 2, w, h, 18); ctx.fillStyle = 'rgba(5,9,18,0.86)'; ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = col; ctx.stroke();
  text(ctx, label, 0, size * 0.36, font(size, 800, D), col, 'center', 2); ctx.restore();
}
function stars(ctx, t, { vy = 0, streak = 0, seed = 1, n = 170, alpha = 1 } = {}) {
  for (let i = 0; i < n; i++) {
    const x = hash01(i, seed) * W, y0 = hash01(i + 400, seed) * H, z = 0.3 + hash01(i + 900, seed) * 0.7;
    const y = ((y0 + vy * t * z) % H + H) % H;
    const tw = 0.55 + 0.45 * Math.sin(t * (2 + z * 3) + i);
    ctx.globalAlpha = alpha * tw * z; ctx.fillStyle = '#FFFFFF';
    if (streak > 0) { ctx.fillRect(x, y, 2.4 * z, 8 + streak * z); } else { ctx.beginPath(); ctx.arc(x, y, 1.2 + 1.8 * z, 0, TAU); ctx.fill(); }
  }
  ctx.globalAlpha = 1;
}
function spaceBg(ctx, t, opts = {}) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, C.space); g.addColorStop(1, C.space2);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); stars(ctx, t, opts);
}
function earth(ctx, x, y, r, t) {
  ctx.save();
  const halo = ctx.createRadialGradient(x, y, r * 0.98, x, y, r * 1.08); halo.addColorStop(0, 'rgba(110,180,255,0.55)'); halo.addColorStop(1, 'rgba(110,180,255,0)');
  ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(x, y, r * 1.08, 0, TAU); ctx.fill();
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.clip();
  const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.6, r * 0.1, x, y, r); g.addColorStop(0, '#4A92F0'); g.addColorStop(0.6, C.earth); g.addColorStop(1, C.earthD);
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  for (let i = 0; i < 14; i++) { // drifting land masses
    const ax = x - r + ((hash01(i, 7) * 2.4 * r + t * 60) % (2.4 * r)) - 0.2 * r, ay = y - r + hash01(i, 8) * r * 0.9;
    ctx.fillStyle = i % 3 ? 'rgba(84,130,70,0.55)' : 'rgba(160,140,95,0.45)';
    ctx.beginPath(); ctx.ellipse(ax, ay, 110 + 180 * hash01(i, 9), 22 + 30 * hash01(i, 10), (hash01(i, 11) - 0.5) * 0.5, 0, TAU); ctx.fill();
  }
  for (let i = 0; i < 18; i++) { // clouds
    const ax = x - r + ((hash01(i, 17) * 2.4 * r + t * 90) % (2.4 * r)) - 0.2 * r, ay = y - r + hash01(i, 18) * r * 0.8;
    ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.beginPath(); ctx.ellipse(ax, ay, 120 * hash01(i, 19) + 40, 14 + 10 * hash01(i, 20), 0.1, 0, TAU); ctx.fill();
  }
  const sh = ctx.createLinearGradient(x - r, 0, x + r, 0); sh.addColorStop(0, 'rgba(0,0,10,0)'); sh.addColorStop(0.65, 'rgba(0,0,10,0)'); sh.addColorStop(1, 'rgba(0,0,10,0.6)');
  ctx.fillStyle = sh; ctx.fillRect(x - r, y - r, 2 * r, 2 * r);
  ctx.restore();
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.lineWidth = 6; ctx.strokeStyle = 'rgba(160,215,255,0.9)'; ctx.stroke();
}
// Starship upper stage, drawn nose-up around its centre. height ~ 420*sc
function ship(ctx, x, y, sc, rot = 0, { plasma = 0, flames = 0, t = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc);
  const w = 92, h = 420, top = -h / 2, bot = h / 2;
  if (plasma > 0) { // reentry plasma on the belly (left side) + trail
    for (let i = 0; i < 4; i++) {
      const g = ctx.createRadialGradient(-w * 0.6, 0, 10, -w * 0.6, 0, 260 + i * 40);
      g.addColorStop(0, `rgba(255,${200 - i * 30},120,${0.55 * plasma})`); g.addColorStop(1, 'rgba(255,90,20,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(-w * 0.9 - i * 20, 0, 150 + 30 * Math.sin(t * 20 + i), h * 0.62, 0, 0, TAU); ctx.fill();
    }
  }
  // aft flaps
  ctx.fillStyle = C.steelD;
  ctx.beginPath(); ctx.moveTo(-w / 2, bot - 120); ctx.lineTo(-w / 2 - 46, bot - 70); ctx.lineTo(-w / 2 - 46, bot - 4); ctx.lineTo(-w / 2, bot - 4); ctx.closePath(); ctx.fill(); outline(ctx, 4);
  ctx.beginPath(); ctx.moveTo(w / 2, bot - 120); ctx.lineTo(w / 2 + 46, bot - 70); ctx.lineTo(w / 2 + 46, bot - 4); ctx.lineTo(w / 2, bot - 4); ctx.closePath(); ctx.fill(); outline(ctx, 4);
  // forward flaps
  ctx.beginPath(); ctx.moveTo(-w / 2 + 4, top + 150); ctx.lineTo(-w / 2 - 30, top + 175); ctx.lineTo(-w / 2 - 30, top + 225); ctx.lineTo(-w / 2 + 2, top + 230); ctx.closePath(); ctx.fill(); outline(ctx, 4);
  ctx.beginPath(); ctx.moveTo(w / 2 - 4, top + 150); ctx.lineTo(w / 2 + 30, top + 175); ctx.lineTo(w / 2 + 30, top + 225); ctx.lineTo(w / 2 - 2, top + 230); ctx.closePath(); ctx.fill(); outline(ctx, 4);
  // flames
  if (flames > 0) for (let i = -1; i <= 1; i++) {
    const L = (110 + 30 * Math.sin(t * 40 + i * 2)) * flames;
    const g = ctx.createLinearGradient(0, bot, 0, bot + L); g.addColorStop(0, 'rgba(255,240,200,0.95)'); g.addColorStop(0.4, 'rgba(255,170,60,0.8)'); g.addColorStop(1, 'rgba(255,90,20,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(i * 26 - 12, bot + 8); ctx.quadraticCurveTo(i * 26, bot + L * 1.1, i * 26 + 12, bot + 8); ctx.fill();
  }
  // engine bells
  ctx.fillStyle = '#3A3F48'; for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(i * 26 - 9, bot); ctx.lineTo(i * 26 + 9, bot); ctx.lineTo(i * 26 + 13, bot + 14); ctx.lineTo(i * 26 - 13, bot + 14); ctx.closePath(); ctx.fill(); }
  // body with ogive nose
  ctx.beginPath(); ctx.moveTo(-w / 2, bot); ctx.lineTo(-w / 2, top + 110); ctx.bezierCurveTo(-w / 2, top + 30, -12, top, 0, top); ctx.bezierCurveTo(12, top, w / 2, top + 30, w / 2, top + 110); ctx.lineTo(w / 2, bot); ctx.closePath();
  const g = ctx.createLinearGradient(-w / 2, 0, w / 2, 0); g.addColorStop(0, '#8E99A8'); g.addColorStop(0.45, C.steel); g.addColorStop(0.7, '#F2F5F9'); g.addColorStop(1, '#A7B1BF');
  ctx.fillStyle = g; ctx.fill();
  ctx.save(); ctx.clip(); ctx.fillStyle = C.tile; ctx.fillRect(-w / 2 - 2, top, w * 0.42, h); // heat-shield tiles (belly)
  ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 2; for (let yy = top + 60; yy < bot; yy += 34) { ctx.beginPath(); ctx.moveTo(-w / 2, yy); ctx.lineTo(w / 2, yy); ctx.stroke(); }
  if (plasma > 0) { ctx.fillStyle = `rgba(255,150,60,${0.45 * plasma})`; ctx.fillRect(-w / 2 - 2, top, w * 0.5, h); }
  ctx.restore();
  ctx.beginPath(); ctx.moveTo(-w / 2, bot); ctx.lineTo(-w / 2, top + 110); ctx.bezierCurveTo(-w / 2, top + 30, -12, top, 0, top); ctx.bezierCurveTo(12, top, w / 2, top + 30, w / 2, top + 110); ctx.lineTo(w / 2, bot); ctx.closePath(); outline(ctx, 5);
  ctx.restore();
}
// Super Heavy booster, nose-up around its centre, height ~ 560*sc
function booster(ctx, x, y, sc, rot = 0, { flames = 0, t = 0, low = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc);
  const w = 100, h = 560, top = -h / 2, bot = h / 2;
  if (flames > 0) for (let i = -2; i <= 2; i++) {
    const L = (130 + 30 * Math.sin(t * 37 + i)) * flames * (low > 0 && Math.sin(t * 30 + i * 3) > 0.3 ? 0.4 : 1);
    const g = ctx.createLinearGradient(0, bot, 0, bot + L); g.addColorStop(0, 'rgba(255,240,200,0.95)'); g.addColorStop(0.4, 'rgba(255,170,60,0.8)'); g.addColorStop(1, 'rgba(255,90,20,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(i * 18 - 9, bot + 6); ctx.quadraticCurveTo(i * 18, bot + L, i * 18 + 9, bot + 6); ctx.fill();
  }
  // grid fins
  const fin = (sx) => { ctx.save(); ctx.translate(sx * (w / 2 + 26), top + 70); ctx.fillStyle = '#4C5562'; rrect(ctx, -24, -26, 48, 52, 4); ctx.fill(); outline(ctx, 4);
    ctx.strokeStyle = '#1C2129'; ctx.lineWidth = 3; for (let k = -16; k <= 16; k += 11) { ctx.beginPath(); ctx.moveTo(k, -22); ctx.lineTo(k, 22); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-20, k); ctx.lineTo(20, k); ctx.stroke(); } ctx.restore(); };
  fin(-1); fin(1);
  rrect(ctx, -w / 2, top, w, h, 6);
  const g = ctx.createLinearGradient(-w / 2, 0, w / 2, 0); g.addColorStop(0, '#8A95A4'); g.addColorStop(0.5, '#E9EDF2'); g.addColorStop(1, '#9CA7B5');
  ctx.fillStyle = g; ctx.fill(); outline(ctx, 5);
  ctx.fillStyle = '#2A2F38'; ctx.fillRect(-w / 2, top + 6, w, 22); // hot-staging ring
  ctx.fillStyle = '#F2F5F9'; for (let k = -40; k <= 40; k += 16) ctx.fillRect(k - 3, top + 10, 6, 14);
  ctx.strokeStyle = 'rgba(0,0,0,0.22)'; ctx.lineWidth = 2; for (let yy = top + 60; yy < bot; yy += 40) { ctx.beginPath(); ctx.moveTo(-w / 2, yy); ctx.lineTo(w / 2, yy); ctx.stroke(); }
  ctx.fillStyle = '#2E333B'; ctx.fillRect(-w / 2 - 4, bot - 30, w + 8, 30); // engine skirt
  ctx.restore();
}
// Launch tower with two "chopstick" arms. x = tower centre, yb = ground, armY = arm height, close 0..1, reach = arm length
function tower(ctx, x, yb, ht, armY, close, reach = 360, { dark = false } = {}) {
  const w = 130, top = yb - ht;
  ctx.save();
  ctx.fillStyle = dark ? '#111419' : C.truss; ctx.fillRect(x - w / 2, top, w, ht);
  ctx.strokeStyle = dark ? '#2B313B' : '#4A5464'; ctx.lineWidth = 5;
  for (let yy = top; yy < yb; yy += 90) { ctx.beginPath(); ctx.moveTo(x - w / 2, yy); ctx.lineTo(x + w / 2, yy + 90); ctx.moveTo(x + w / 2, yy); ctx.lineTo(x - w / 2, yy + 90); ctx.moveTo(x - w / 2, yy); ctx.lineTo(x + w / 2, yy); ctx.stroke(); }
  ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.strokeRect(x - w / 2, top, w, ht);
  ctx.fillStyle = '#323A46'; ctx.fillRect(x - w / 2 - 14, top - 40, w + 28, 40); ctx.strokeRect(x - w / 2 - 14, top - 40, w + 28, 40);
  // carriage
  ctx.fillStyle = '#3B4452'; ctx.fillRect(x + w / 2 - 6, armY - 50, 40, 100); ctx.strokeRect(x + w / 2 - 6, armY - 50, 40, 100);
  // arms (scissor-open -> parallel when closed)
  const px = x + w / 2 + 30, spread = lerp(150, 0, close);
  [-1, 1].forEach((sgn) => {
    const ex = px + reach, ey = armY + sgn * (16 + spread);
    ctx.beginPath(); ctx.moveTo(px, armY + sgn * 22); ctx.lineTo(ex, ey - 12 * 1); ctx.lineTo(ex, ey + 12); ctx.lineTo(px, armY + sgn * 22 + sgn * 26); ctx.closePath();
    ctx.fillStyle = '#56606E'; ctx.fill(); outline(ctx, 5);
    ctx.strokeStyle = '#2B313B'; ctx.lineWidth = 3; for (let k = 0.15; k < 1; k += 0.14) { const xx = lerp(px, ex, k); ctx.beginPath(); ctx.moveTo(xx, lerp(armY + sgn * 22, ey - 10, k)); ctx.lineTo(xx + 18, lerp(armY + sgn * 22, ey + 10, k)); ctx.stroke(); }
  });
  ctx.restore();
}
function whip(ctx, t, t0, a, b, dur = 0.3) {
  const p = E.inOutCubic(prog(t, t0 - dur * 0.55, t0 + dur * 0.45));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(-p * W, 0); a(); ctx.restore(); ctx.save(); ctx.translate((1 - p) * W, 0); b(); ctx.restore();
}
function slideV(ctx, t, t0, a, b, dir = 1, dur = 0.4, line = C.white) {
  const p = E.inOutCubic(prog(t, t0 - dur * 0.5, t0 + dur * 0.5));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(0, dir * p * H); a(); ctx.restore();
  ctx.save(); ctx.translate(0, dir * (p - 1) * H); b(); ctx.restore();
  ctx.fillStyle = line; ctx.fillRect(0, dir > 0 ? p * H - 8 : (1 - p) * H - 8, W, 16);
}
function check(ctx, x, y, r, k, ok) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fillStyle = ok ? C.orange : C.red; ctx.fill(); outline(ctx, 4);
  ctx.strokeStyle = ok ? C.ink : C.white; ctx.lineWidth = r * 0.28; ctx.lineCap = 'round'; ctx.beginPath();
  if (ok) { ctx.moveTo(-r * 0.45, 0); ctx.lineTo(-r * 0.1, r * 0.35); ctx.lineTo(r * 0.5, -r * 0.35); } else { ctx.moveTo(-r * 0.38, -r * 0.38); ctx.lineTo(r * 0.38, r * 0.38); ctx.moveTo(r * 0.38, -r * 0.38); ctx.lineTo(-r * 0.38, r * 0.38); }
  ctx.stroke(); ctx.restore();
}

// ---------------------------------------------------------------- persistent catch scorebug (bottom)
function scorebug(ctx, t) {
  const k = clamp(prog(t, 0.2, 0.55)); if (k <= 0) return;
  const inFlash = t >= S.D + 0.15 && t < S.E;
  const y = s.y + s.h - 40, x0 = cx - 400, w = 800;
  ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 60);
  rrect(ctx, x0, y - 46, w, 92, 16); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 4, '#000');
  rrect(ctx, x0, y - 46, 230, 92, 16); ctx.fillStyle = inFlash ? '#6B6F78' : C.orange; ctx.fill(); outline(ctx, 4, '#000');
  text(ctx, inFlash ? 'OCT 2024' : 'FLIGHT 15', x0 + 115, y + 14, font(40, 800, D), C.ink, 'center');
  const tS = T('snatched'), tBf = T('caught', 1), tBx = T('splashed');
  // SHIP slot
  text(ctx, 'SHIP', x0 + 268, y + 14, font(40, 800, UI), inFlash ? C.mute : C.white, 'left');
  const sx = x0 + 420;
  if (inFlash) { ctx.fillStyle = C.mute; ctx.fillRect(sx - 18, y - 4, 36, 8); }
  else if (t >= tS) check(ctx, sx, y, 30, pop(t, tS), true);
  else { ctx.beginPath(); ctx.arc(sx, y, 28, 0, TAU); ctx.setLineDash([8, 7]); ctx.lineWidth = 4; ctx.strokeStyle = C.mute; ctx.stroke(); ctx.setLineDash([]); }
  // BOOSTER slot
  text(ctx, 'BOOSTER', x0 + 480, y + 14, font(40, 800, UI), C.white, 'left');
  const bx = x0 + 745;
  if (inFlash) { if (t >= tBf) check(ctx, bx, y, 30, pop(t, tBf), true); else { ctx.beginPath(); ctx.arc(bx, y, 28, 0, TAU); ctx.setLineDash([8, 7]); ctx.lineWidth = 4; ctx.strokeStyle = C.mute; ctx.stroke(); ctx.setLineDash([]); } }
  else if (t >= tBx) check(ctx, bx, y, 30, pop(t, tBx), false);
  else { ctx.beginPath(); ctx.arc(bx, y, 28, 0, TAU); ctx.setLineDash([8, 7]); ctx.lineWidth = 4; ctx.strokeStyle = C.mute; ctx.stroke(); ctx.setLineDash([]); }
  ctx.restore();
}

// ---------------------------------------------------------------- captions (word by word, top)
function captions(ctx, t) {
  const L = TIMING.lines; const li = L.findIndex((l, i) => t >= l.t0 - 0.05 && t < (L[i + 1] ? L[i + 1].t0 - 0.05 : END)); if (li < 0) return;
  const all = L[li].words, ws = all.filter((w) => t >= w.t - 0.03); if (!ws.length) return;
  const start = Math.floor((ws.length - 1) / 3) * 3, chunk = all.slice(start, start + 3), shown = ws.slice(start);
  let size = 90; const gap = 24;
  const meas = (sz) => { ctx.font = font(sz, 800, D); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 20) { size = Math.floor(size * (s.w - 20) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 100;
  shown.forEach((w, i) => { const k = sp(t, w.t - 0.03, SPRING.bouncy), sc = Math.min(1.1, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.2; ctx.strokeStyle = C.ink; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.orange : C.white; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}

// ---------------------------------------------------------------- A: hook — 22.5 hours in space
function sHook(ctx, t) {
  spaceBg(ctx, t, { vy: 6 });
  earth(ctx, cx + 120, s.y + 2050, 1350, t);
  // orbit path + ship gliding sideways above the limb
  const q = (t + 0.6) / 4.2; const ang = lerp(-0.62, 0.5, q);
  ctx.save(); ctx.strokeStyle = 'rgba(255,193,90,0.35)'; ctx.lineWidth = 4; ctx.setLineDash([16, 14]);
  ctx.beginPath(); ctx.arc(cx + 120, s.y + 2050, 1560, -Math.PI / 2 - 0.8, -Math.PI / 2 + ang); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
  const ox = cx + 120 + Math.sin(ang) * 1560, oy = s.y + 2050 - Math.cos(ang) * 1560;
  ship(ctx, ox, oy, 0.42, Math.PI / 2 + ang, { t });
  // number on frame 0
  const t2 = T('caught');
  const up = E.inOutCubic(prog(t, T('Then') - 0.1, T('Then') + 0.3));
  const k0 = t < 0.3 ? lerp(1.08, 1, E.outBack(prog(t, 0, 0.3))) : 1;
  const hrs = 22.5;
  big(ctx, hrs.toFixed(1), cx, lerp(s.y + 640, s.y + 470, up), lerp(370, 250, up), C.orange, k0, { sw: 0.06 });
  chip(ctx, 'HOURS IN SPACE', cx, lerp(s.y + 760, s.y + 560, up), lerp(62, 48, up), pop(t, 0.05), { bg: C.white, rot: -0.03 });
  // "Then a tower caught it": tower rises from the right edge, arms snap shut
  const tr = E.outCubic(prog(t, T('tower') - 0.2, T('tower') + 0.25));
  if (tr > 0) { ctx.save(); ctx.translate(0, (1 - tr) * 700);
    const cl = E.outBack(prog(t, t2, t2 + 0.2));
    tower(ctx, cx - 210, s.y + 1400, 640, s.y + 900, cl, 300);
    ship(ctx, cx - 210 + 65 + 30 + 230, s.y + 900 + 150 - (1 - E.outCubic(prog(t, T('tower') - 0.1, t2))) * 380, 0.62, 0, { flames: t < t2 ? 1 : 0, t });
    ctx.restore(); }
  stamp(ctx, 'CAUGHT!', cx + 210, s.y + 760, 78, t, t2 + 0.05, C.orange, -0.12);
}

// ---------------------------------------------------------------- B: orbit — 26 satellites, then reentry through fire
function sat(ctx, x, y, r, sc) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(sc, sc);
  ctx.fillStyle = '#C8CFD9'; rrect(ctx, -26, -12, 52, 24, 3); ctx.fill(); outline(ctx, 3);
  ctx.fillStyle = '#244A8C'; rrect(ctx, 30, -9, 70, 18, 2); ctx.fill(); outline(ctx, 3);
  ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 2; for (let k = 40; k < 100; k += 14) { ctx.beginPath(); ctx.moveTo(k, -8); ctx.lineTo(k, 8); ctx.stroke(); }
  ctx.restore();
}
function sOrbit(ctx, t) {
  const tf = T('then'), tFire = T('fire.');
  const fall = E.inOutCubic(prog(t, tf - 0.15, tf + 0.5));
  spaceBg(ctx, t, { vy: lerp(10, -2600, fall), streak: fall * 50 });
  // Earth limb rises as the ship falls
  earth(ctx, cx, lerp(s.y + 2300, s.y + 1700, fall), 1400, t);
  if (fall > 0) { const g = ctx.createRadialGradient(cx, s.y + 760, 50, cx, s.y + 760, 900); g.addColorStop(0, `rgba(255,120,40,${0.35 * fall})`); g.addColorStop(1, 'rgba(255,80,20,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
  const tD = T('dropped'), t26 = T('26');
  const shx = cx + lerp(40, 0, fall) + (1 - E.outCubic(prog(t, S.B, S.B + 0.5))) * 600, shy = s.y + 720;
  // satellites stream out of the ship's slot (26)
  const nOut = Math.floor(26 * clamp(prog(t, tD, t26 + 0.9)));
  for (let i = 0; i < nOut; i++) {
    const ti = lerp(tD, t26 + 0.9, i / 26), d = t - ti;
    const sx = shx - 40 - d * (180 + 60 * hash01(i, 3)), sy = shy - 60 - d * (120 + 90 * hash01(i, 4)) + 30 * hash01(i, 5);
    sat(ctx, sx, sy, d * (0.6 + hash01(i, 6)), 0.75 * Math.min(1, d * 5));
  }
  ctx.save(); if (fall > 0.5) shake(ctx, B(t), B(tf + 0.3), 5, 4, 0.5);
  ship(ctx, shx, shy + fall * 40, lerp(1.3, 1.2, fall), lerp(Math.PI / 2, -0.15 - 0.05 * Math.sin(t * 3), fall), { plasma: fall * (0.8 + 0.2 * Math.sin(t * 25)), t });
  ctx.restore();
  // satellite counter chip
  const n = Math.min(26, nOut);
  const kc = pop(t, tD - 0.1);
  if (kc > 0) { ctx.save(); ctx.translate(cx - 200, s.y + 1040); ctx.scale(kc, kc); ctx.rotate(-0.03);
    rrect(ctx, -220, -70, 440, 140, 20); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 5, C.orange);
    sat(ctx, -150, 0, -0.3, 1.0);
    text(ctx, `${n}`, 40, 34, font(96, 800, D), n === 26 ? C.orange : C.white, 'center');
    text(ctx, 'SATS', 150, 22, font(40, 800, UI), C.mute, 'center'); ctx.restore(); }
  chip(ctx, 'REENTRY', cx + 200, s.y + 1010, 60, pop(t, T('through') - 0.1), { bg: C.orange, rot: 0.05 });
  chip(ctx, 'SPACEX STARSHIP', cx, s.y + 300, 46, pop(t, S.B + 0.1) * (1 - fall), { bg: C.white, rot: 0.02 });
}

// ---------------------------------------------------------------- C: the catch at Starbase
function dayBg(ctx, t, grey = false) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, grey ? '#3B3F46' : '#2B5FA8'); g.addColorStop(0.62, grey ? '#7A7D82' : '#8EB8E6'); g.addColorStop(0.8, grey ? '#9A9A98' : '#F2C89A');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // clouds drifting
  for (let i = 0; i < 6; i++) { const x = ((hash01(i, 31) * 1600 + t * 30 * (0.5 + hash01(i, 32))) % 1600) - 260, y = s.y + 380 + hash01(i, 33) * 500;
    ctx.fillStyle = grey ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.35)'; ctx.beginPath(); ctx.ellipse(x, y, 160, 26, 0, 0, TAU); ctx.fill(); }
  ctx.fillStyle = grey ? '#55575B' : '#C9A66E'; ctx.fillRect(0, s.y + 1180, W, H); // ground
  ctx.fillStyle = grey ? '#46484C' : '#A8864F'; ctx.fillRect(0, s.y + 1180, W, 14);
}
function sCatch(ctx, t) {
  dayBg(ctx, t);
  const tS = T('snatched');
  const push = 1 + 0.06 * E.inOutCubic(prog(t, S.C, S.D));
  ctx.save(); M.zoomAbout(ctx, push, cx, s.y + 800);
  const tx = cx - 250, armY = s.y + 690, yb = s.y + 1190;
  const cl = E.outBack(prog(t, tS - 0.05, tS + 0.22));
  tower(ctx, tx, yb, 960, armY, cl, 400);
  const q = E.outCubic(prog(t, S.C - 0.1, tS));
  const sy = lerp(s.y - 300, armY + 120, q) + (t > tS ? -14 * M.wobble(t - tS, 2.5, 6) : 0);
  ctx.save(); if (t > tS) shake(ctx, B(t), B(tS), 6, 7, 0.25);
  ship(ctx, tx + 65 + 30 + 290, sy, 0.95, 0, { flames: t < tS + 0.15 ? 1 : clamp(1 - (t - tS - 0.15) * 4), t });
  ctx.restore();
  // dust puff at the mount
  if (t > tS - 0.3) { const d = t - tS + 0.3; for (let i = 0; i < 10; i++) { const a = clamp(1 - d * 0.8); ctx.fillStyle = `rgba(230,215,190,${0.35 * a})`;
    ctx.beginPath(); ctx.arc(tx + 380 + (hash01(i, 41) - 0.5) * 400 * Math.min(1, d * 1.5), yb - 20 - hash01(i, 42) * 80 * d, 40 + 50 * d, 0, TAU); ctx.fill(); } }
  ctx.restore();
  stamp(ctx, 'CAUGHT!', cx + 150, s.y + 400, 96, t, tS + 0.05, C.orange, -0.1);
  chip(ctx, 'FIRST EVER · 14 NOV', cx + 130, s.y + 1060, 46, pop(t, T('air.') - 0.1), { bg: C.white, rot: 0.03 });
}

// ---------------------------------------------------------------- D: flashback 2024 — the first booster catch (grey)
function sPast(ctx, t) {
  ctx.save();
  dayBg(ctx, t, true);
  const tC = T('caught', 1);
  const tx = cx - 260, armY = s.y + 560, yb = s.y + 1190;
  const cl = E.outBack(prog(t, tC - 0.05, tC + 0.22));
  tower(ctx, tx, yb, 960, armY, cl, 400, { dark: true });
  const q = E.outCubic(prog(t, S.D, tC));
  const by = lerp(s.y - 400, armY + 220, q) + (t > tC ? -12 * M.wobble(t - tC, 2.5, 6) : 0);
  booster(ctx, tx + 65 + 30 + 290, by, 0.95, 0, { flames: t < tC + 0.1 ? 1 : 0, t });
  ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = '#808080'; ctx.fillRect(0, 0, W, H);
  ctx.restore();
  const t24 = T('2024,');
  const yr = Math.round(lerp(2026, 2024, E.inOutCubic(prog(t, t24, t24 + 0.35))));
  const kY = pop(t, S.D + 0.05);
  if (kY > 0) { ctx.save(); ctx.translate(cx - 120, s.y + 300); ctx.scale(kY, kY); ctx.rotate(-0.05);
    rrect(ctx, -150, -70, 300, 150, 18); ctx.fillStyle = C.white; ctx.fill(); outline(ctx, 6);
    ctx.save(); rrect(ctx, -150, -70, 300, 150, 18); ctx.clip(); ctx.fillStyle = '#6B6F78'; ctx.fillRect(-150, -70, 300, 36); ctx.restore();
    text(ctx, `${yr}`, 0, 62, font(84, 800, D), C.ink, 'center'); ctx.restore(); }
  stamp(ctx, 'FIRST CATCH: BOOSTER', cx + 60, s.y + 1060, 58, t, tC + 0.05, C.white, -0.05);
}

// ---------------------------------------------------------------- E: twist — booster low on fuel, splashdown
function sSea(ctx, t) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#24508F'); g.addColorStop(0.55, '#9CC3E8'); g.addColorStop(0.6, C.sea2); g.addColorStop(1, C.sea);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const hz = H * 0.58;
  ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 4;
  for (let i = 0; i < 16; i++) { const y = hz + 30 + i * 50, off = (t * 40 * (1 + i * 0.1)) % 160; ctx.beginPath(); for (let x = -160 + off; x < W + 160; x += 160) { ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 40, y - 8, x + 80, y); } ctx.stroke(); }
  // distant shore + tiny tower (empty arms)
  ctx.fillStyle = '#C9A66E'; ctx.fillRect(0, hz - 14, 300, 16);
  ctx.save(); ctx.translate(140, hz - 14); ctx.scale(0.22, 0.22); tower(ctx, 0, 0, 900, -650, 0, 380); ctx.restore();
  chip(ctx, 'GULF OF MEXICO', cx + 180, hz + 120, 44, pop(t, S.E + 0.2), { bg: C.white, rot: -0.02 });
  const tLow = T('low'), tSp = T('splashed');
  const fuel = lerp(1, 0.08, E.inOutCubic(prog(t, S.E + 0.2, tLow + 0.1)));
  const fx = s.x + s.w - 70, fy0 = s.y + 420, fh = 520;
  rrect(ctx, fx - 40, fy0, 80, fh, 16); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 5, C.white);
  const lowOn = t >= tLow;
  const fc = lowOn ? (Math.sin(t * 18) > 0 ? C.red : '#8A1F18') : (fuel > 0.4 ? C.green : C.orange);
  rrect(ctx, fx - 30, fy0 + 10 + (fh - 20) * (1 - fuel), 60, (fh - 20) * fuel, 10); ctx.fillStyle = fc; ctx.fill();
  text(ctx, 'FUEL', fx, fy0 - 22, font(38, 800, UI), C.white, 'center');
  chip(ctx, 'LOW FUEL', fx - 160, fy0 + fh * 0.62, 50, pop(t, tLow), { bg: C.red, fg: C.white, rot: -0.06 });
  // booster descends, drifts offshore, splashes
  const q = prog(t, S.E, tSp);
  const bx = lerp(cx - 120, cx + 30, E.inOutCubic(q)), by = lerp(s.y + 300, hz + 40, E.inCubic(q));
  const tilt = lerp(0, 0.25, E.inCubic(q));
  if (t < tSp + 0.25) {
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, hz + 60 + Math.max(0, t - tSp) * 0); ctx.clip();
    booster(ctx, bx, by - 230 + (t > tSp ? (t - tSp) * 900 : 0), 0.8, tilt, { flames: lowOn ? 0.7 : 1, low: lowOn ? 1 : 0, t }); ctx.restore();
  }
  if (t >= tSp) { const d = t - tSp; // soft splash
    for (let i = 0; i < 26; i++) { const a = -Math.PI / 2 + (hash01(i, 51) - 0.5) * 2.2, v = 500 + 600 * hash01(i, 52);
      const x = bx + Math.cos(a) * v * d, y = hz + 40 + Math.sin(a) * v * d + 1200 * d * d;
      if (y < hz + 80) { ctx.fillStyle = 'rgba(235,245,255,0.85)'; ctx.beginPath(); ctx.arc(x, y, 10 + 10 * hash01(i, 53), 0, TAU); ctx.fill(); } }
    ctx.strokeStyle = `rgba(255,255,255,${clamp(0.8 - d * 0.5)})`; ctx.lineWidth = 6; ctx.beginPath(); ctx.ellipse(bx, hz + 50, 80 + d * 260, 14 + d * 40, 0, 0, TAU); ctx.stroke(); }
  stamp(ctx, 'SPLASHDOWN', cx - 40, s.y + 380, 80, t, tSp + 0.05, C.red, 0.06);
}

// ---------------------------------------------------------------- F: payoff — the ship is the hard part; reuse like planes
function plane(ctx, x, y, sc, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.fillStyle = C.white;
  ctx.beginPath(); ctx.ellipse(0, 0, 110, 16, 0, 0, TAU); ctx.fill(); outline(ctx, 4);
  ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(-30, -90); ctx.lineTo(-52, -90); ctx.lineTo(-22, 0); ctx.closePath(); ctx.fill(); outline(ctx, 4);
  ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(-30, 90); ctx.lineTo(-52, 90); ctx.lineTo(-22, 0); ctx.closePath(); ctx.fill(); outline(ctx, 4);
  ctx.beginPath(); ctx.moveTo(-82, 0); ctx.lineTo(-104, -40); ctx.lineTo(-116, -40); ctx.lineTo(-104, 0); ctx.closePath(); ctx.fill(); outline(ctx, 4);
  ctx.beginPath(); ctx.moveTo(-82, 0); ctx.lineTo(-104, 40); ctx.lineTo(-116, 40); ctx.lineTo(-104, 0); ctx.closePath(); ctx.fill(); outline(ctx, 4);
  ctx.restore();
}
function sPayoff(ctx, t) {
  spaceBg(ctx, t, { vy: 8, seed: 3 });
  const tH = T('hard'), tCb = T('Catch'), tR = T('rockets'), tP = T('planes.');
  const ex = cx, ey = s.y + 1080, er = 270, orr = 400;
  const move = E.inOutCubic(prog(t, tCb - 0.2, tCb + 0.3));
  ctx.save(); ctx.globalAlpha = 1 - move * 0.75; earth(ctx, ex, ey + move * 250, er, t * 0.6); ctx.restore();
  const kA = clamp(prog(t, S.F + 0.1, tCb - 0.1));
  ctx.save(); ctx.globalAlpha = 1 - move;
  ctx.lineWidth = 10; ctx.lineCap = 'round';
  const hc = [ex - 140, ey - er + 10], hr = 120, ha = Math.PI + Math.PI * clamp(kA * 1.6);
  ctx.strokeStyle = C.mute; ctx.setLineDash([16, 12]); ctx.beginPath(); ctx.arc(hc[0], hc[1], hr, Math.PI, ha); ctx.stroke();
  ctx.strokeStyle = C.orange; ctx.beginPath(); ctx.arc(ex, ey, orr, -Math.PI / 2, -Math.PI / 2 + TAU * kA * 0.999); ctx.stroke(); ctx.setLineDash([]);
  const a = -Math.PI / 2 + TAU * kA; ship(ctx, ex + Math.cos(a) * orr, ey + Math.sin(a) * orr, 0.36, a + Math.PI / 2 + Math.PI / 2, { t, plasma: kA > 0.85 ? 0.7 : 0 });
  booster(ctx, hc[0] + Math.cos(ha) * hr, hc[1] + Math.sin(ha) * hr, 0.24, ha + Math.PI / 2 - Math.PI / 2, { t });
  ctx.restore();
  chip(ctx, 'BOOSTER: SHORT HOP', cx - 170, ey - er - 190, 42, pop(t, S.F + 0.2) * (1 - move), { bg: C.panel2, fg: C.white, edge: C.mute, rot: 0.02 });
  chip(ctx, 'SHIP: FROM ORBIT', cx + 120, s.y + 520, 56, pop(t, tH - 0.05) * (1 - move), { bg: C.orange, rot: -0.03 });
  // reuse loop with flight counter
  if (move > 0) {
    const lx = cx, ly = s.y + 760, lr = 290;
    ctx.save(); ctx.globalAlpha = move;
    ctx.strokeStyle = C.orange; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(lx, ly, lr, -Math.PI * 0.4, Math.PI * 1.45); ctx.stroke();
    const ah = Math.PI * 1.45; ctx.fillStyle = C.orange; ctx.save(); ctx.translate(lx + Math.cos(ah) * lr, ly + Math.sin(ah) * lr); ctx.rotate(ah + Math.PI / 2);
    ctx.beginPath(); ctx.moveTo(0, 30); ctx.lineTo(-30, -18); ctx.lineTo(30, -18); ctx.closePath(); ctx.fill(); ctx.restore();
    const spin = Math.max(0, t - tR) * 4.5;
    const sa = -Math.PI / 2 + spin, px = lx + Math.cos(sa) * lr, py = ly + Math.sin(sa) * lr;
    ctx.save(); ctx.translate(px, py); ctx.rotate(sa + Math.PI);
    booster(ctx, 0, 70, 0.3, 0, { t, flames: 1 }); ship(ctx, 0, -86, 0.3, 0, { t }); ctx.restore();
    const n = 1 + Math.floor(spin / TAU * 2 + (t >= tR ? 1 : 0));
    text(ctx, 'FLIGHT', lx, ly - 70, font(48, 800, UI), C.mute, 'center');
    const bumpK = 1 + 0.2 * Math.exp(-((spin / TAU * 2) % 1) * 6);
    ctx.save(); ctx.translate(lx, ly + 80); ctx.scale(bumpK, bumpK); text(ctx, `${n}`, 0, 0, font(190, 800, D), C.white, 'center'); ctx.restore();
    ctx.restore();
    chip(ctx, 'FLY AGAIN', cx, s.y + 380, 64, pop(t, tR), { bg: C.orange, rot: -0.03 });
    const pq = prog(t, tP - 0.5, tP + 1.0);
    if (pq > 0 && pq < 1) plane(ctx, lerp(-200, W + 200, pq), s.y + 1150 - 60 * Math.sin(pq * Math.PI), 1.1, -0.06);
    chip(ctx, 'LIKE A PLANE', cx, s.y + 1110, 56, pop(t, tP - 0.05), { bg: C.white, rot: 0.04 });
  }
}

// ---------------------------------------------------------------- G: end card (loops into the hook)
function sEnd(ctx, t) {
  spaceBg(ctx, t, { vy: 10, seed: 5 });
  earth(ctx, cx + 120, s.y + 2250, 1350, t);
  const t0 = S.G;
  big(ctx, '22.5 h', cx - 130, s.y + 470, 170, C.orange, pop(t, t0 - 0.2), { sw: 0.05, rot: -0.03 });
  chip(ctx, 'CAUGHT', cx + 290, s.y + 420, 54, pop(t, t0), { bg: C.white, rot: 0.06 });
  text(ctx, 'WHYVERSE', cx, s.y + 690, font(110, 800, D), C.white, 'center', 4);
  const kB = pop(t, T('Like') - 0.05), kF = pop(t, T('follow') - 0.05);
  if (kB > 0) { ctx.save(); ctx.translate(cx - 215, s.y + 900); ctx.scale(kB, kB); ctx.rotate(-0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.white; ctx.fill(); outline(ctx, 6);
    const hb = 1 + 0.12 * Math.max(0, Math.sin((t - T('Like')) * 9)) * Math.exp(-(t - T('Like')) * 2);
    ctx.save(); ctx.translate(-110, 4); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30);
    ctx.fillStyle = '#E8384F'; ctx.fill(); ctx.restore();
    text(ctx, 'LIKE', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  if (kF > 0) { ctx.save(); ctx.translate(cx + 215, s.y + 900); ctx.scale(kF, kF); ctx.rotate(0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.orange; ctx.fill(); outline(ctx, 6);
    ctx.save(); ctx.translate(-120, 4); ctx.lineWidth = 12; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'FOLLOW', 40, 24, font(60, 800, D), C.ink, 'center'); ctx.restore(); }
  chip(ctx, 'a new "why" every day', cx, s.y + 1090, 50, pop(t, T('more.') - 0.05), { bg: C.panel, fg: C.white, edge: C.orange, rot: -0.02 });
  const q = prog(t, t0, END); const ang = lerp(-0.6, 0.7, q);
  ship(ctx, cx + 120 + Math.sin(ang) * 1700, s.y + 2250 - Math.cos(ang) * 1700, 0.45, Math.PI / 2 + ang, { t });
}

const tS = T('snatched');
const HITS = [
  [B(0.02), '22.5', 'thud'], [B(0.1), 'hours chip', 'click'], [B(T('tower') - 0.1), 'tower rises', 'whoosh', { len: 0.3, from: 400, to: 1400 }], [B(T('caught') + 0.05), 'CAUGHT', 'thud'],
  WH(S.B, 600, 2200), [B(T('dropped')), 'sats', 'type', { len: 1.2, n: 12 }], [B(T('26') + 0.9), '26', 'tick'],
  [B(T('then')), 'fall', 'whoosh', { len: 0.6, from: 1800, to: 300 }],
  WH(S.C, 2200, 600), [B(tS), 'arms close', 'thud'], [B(T('air.') - 0.1), 'first ever chip', 'click'],
  [B(S.D), 'flashback', 'whoosh', { len: 0.45, from: 400, to: 1600 }], [B(T('2024,')), '2024', 'type', { len: 0.4, n: 6 }], [B(T('caught', 1)), 'booster caught', 'thud'],
  [B(S.E), 'back to now', 'whoosh', { len: 0.45, from: 1600, to: 400 }], [B(T('low')), 'low fuel', 'blip', { pitch: 'A4' }], [B(T('splashed')), 'splash', 'whoosh', { len: 0.3, from: 900, to: 200 }],
  WH(S.F, 600, 2200), [B(T('hard') - 0.05), 'ship from orbit', 'click'], [B(T('rockets')), 'fly again', 'pop', { pitch: 'D5' }], [B(T('planes.') - 0.05), 'plane', 'whoosh', { len: 0.5, from: 500, to: 1500 }],
  WH(S.G, 2200, 600), [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop', { pitch: 'A5' }],
];

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI)], samples: 8,
  hits: HITS,
  draw(ctx, u, t) {
    if (t < S.B + 0.2) whip(ctx, t, S.B, () => sHook(ctx, t), () => sOrbit(ctx, t));
    else if (t < S.C + 0.2) whip(ctx, t, S.C, () => sOrbit(ctx, t), () => sCatch(ctx, t));
    else if (t < S.D + 0.25) slideV(ctx, t, S.D, () => sCatch(ctx, t), () => sPast(ctx, t), 1);
    else if (t < S.E + 0.25) slideV(ctx, t, S.E, () => sPast(ctx, t), () => sSea(ctx, t), -1);
    else if (t < S.F + 0.2) whip(ctx, t, S.F, () => sSea(ctx, t), () => sPayoff(ctx, t));
    else whip(ctx, t, S.G, () => sPayoff(ctx, t), () => sEnd(ctx, t), 0.36);
    if (t < S.G - 0.2) scorebug(ctx, t);
    captions(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 220; i++) { ctx.fillStyle = `rgba(255,255,255,${0.015 + 0.025 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
