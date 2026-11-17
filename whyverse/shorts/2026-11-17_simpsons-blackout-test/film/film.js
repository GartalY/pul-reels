// "1.5 million views" — Whyverse daily trend Short, 17 Nov 2026. Pure function of time.
// The viral "Simpsons predicted a blackout on 17 Nov" claim vs the real FEMA/FCC nationwide Emergency Alert System test
// (Tue 17 Nov 2026, ~2:20 p.m. ET, about one minute, TV + radio, no phone alerts this year; no blackout announced).
// Kokoro af_heart VO on audio/vo.wav; every caption word / object lands on its spoken word (TIMING from the VO edit).
// Structure from the AZ football reel (reels/2026-11-14_1830): number on frame 0, persistent bottom board (VIEWS counter ->
// FACT CHECK board), flashback (2023 phones buzzed), twist (episode is 3 years old), payoff (no blackout), LIKE + FOLLOW end card.
// Look: LATE-NIGHT BROADCAST — one dark living room (window skyline, wall clock, CRT TV, radio, phone), CRT scanlines,
// test-card colour bars, amber lamp light, alert red. Camera moves inside the one room. No show characters, no logos.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, rrect, hash01, clamp, TAU } = M;

const TIMING = {"dur": 25.802, "lines": [{"t0": 0.1, "t1": 1.796, "words": [{"w": "1.5", "t": 0.13, "key": true}, {"w": "million", "t": 0.966, "key": true}, {"w": "views.", "t": 1.385, "key": false}]}, {"t0": 2.0, "t1": 4.811, "words": [{"w": "One", "t": 2.03, "key": false}, {"w": "clip", "t": 2.242, "key": false}, {"w": "says", "t": 2.496, "key": false}, {"w": "the", "t": 2.75, "key": false}, {"w": "Simpsons", "t": 2.962, "key": true}, {"w": "predicted", "t": 3.386, "key": false}, {"w": "a", "t": 3.852, "key": false}, {"w": "blackout", "t": 3.98, "key": true}, {"w": "today.", "t": 4.403, "key": false}]}, {"t0": 5.0, "t1": 5.982, "words": [{"w": "Here's", "t": 5.06, "key": false}, {"w": "the", "t": 5.314, "key": false}, {"w": "truth.", "t": 5.496, "key": true}]}, {"t0": 6.25, "t1": 12.287, "words": [{"w": "At", "t": 6.28, "key": false}, {"w": "2:20 PM", "t": 6.507, "key": true}, {"w": "Eastern,", "t": 8.03, "key": false}, {"w": "TVs", "t": 8.76, "key": true}, {"w": "and", "t": 8.998, "key": false}, {"w": "radios", "t": 9.235, "key": true}, {"w": "across", "t": 9.615, "key": false}, {"w": "America", "t": 9.995, "key": false}, {"w": "will", "t": 10.423, "key": false}, {"w": "beep", "t": 10.708, "key": true}, {"w": "for", "t": 10.993, "key": false}, {"w": "about", "t": 11.23, "key": false}, {"w": "1", "t": 11.563, "key": true}, {"w": "minute.", "t": 11.8, "key": true}]}, {"t0": 12.5, "t1": 14.579, "words": [{"w": "It's", "t": 12.53, "key": false}, {"w": "a", "t": 12.762, "key": false}, {"w": "national", "t": 12.901, "key": false}, {"w": "emergency", "t": 13.366, "key": true}, {"w": "alert", "t": 13.876, "key": false}, {"w": "test.", "t": 14.201, "key": true}]}, {"t0": 14.75, "t1": 19.278, "words": [{"w": "In", "t": 14.78, "key": false}, {"w": "2023,", "t": 14.993, "key": true}, {"w": "every", "t": 16.17, "key": false}, {"w": "phone", "t": 16.385, "key": false}, {"w": "buzzed", "t": 16.6, "key": true}, {"w": "too.", "t": 16.846, "key": false}, {"w": "This", "t": 17.49, "key": false}, {"w": "year,", "t": 17.725, "key": false}, {"w": "phones", "t": 18.12, "key": false}, {"w": "stay", "t": 18.502, "key": false}, {"w": "silent.", "t": 18.788, "key": true}]}, {"t0": 19.5, "t1": 23.822, "words": [{"w": "The", "t": 19.54, "key": false}, {"w": "episode", "t": 19.755, "key": false}, {"w": "is", "t": 20.142, "key": false}, {"w": "3", "t": 20.314, "key": true}, {"w": "years", "t": 20.614, "key": true}, {"w": "old.", "t": 20.915, "key": false}, {"w": "No", "t": 21.54, "key": true}, {"w": "power", "t": 21.704, "key": false}, {"w": "company", "t": 21.991, "key": false}, {"w": "has", "t": 22.36, "key": false}, {"w": "announced", "t": 22.565, "key": false}, {"w": "any", "t": 23.015, "key": false}, {"w": "blackout.", "t": 23.22, "key": true}]}, {"t0": 24.0, "t1": 25.802, "words": [{"w": "Like", "t": 24.03, "key": true}, {"w": "and", "t": 24.278, "key": false}, {"w": "follow", "t": 24.484, "key": true}, {"w": "Whyverse", "t": 24.814, "key": true}, {"w": "for", "t": 25.226, "key": false}, {"w": "more.", "t": 25.432, "key": false}]}]};
const C = {
  night: '#0B1020', wall: '#1A2335', wall2: '#212C42', floor: '#2B2019', wood: '#5A3B26', wood2: '#3E2818',
  cream: '#F5EFE3', amber: '#FFC23D', amber2: '#E59A1F', red: '#E5383B', red2: '#A8232A', green: '#2DBE6C', grey: '#8A93A6',
  ink: '#07090F', screen: '#0E1A2A', glow: '#9FD4FF', sky: '#141C33', bld: '#0A0F1C',
};
const BARS = ['#E9E9E9', '#E8D63A', '#3AD2E0', '#3BCB5A', '#D64ACB', '#D8393C', '#3348D6'];
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const LN = (i) => TIMING.lines[i].t0;
const END = 27.6;
const S = { A: 0, A2: LN(1) - 0.1, B: LN(2) - 0.1, C: LN(3) - 0.1, D: LN(4) - 0.1, E: LN(5) - 0.1, F: LN(6) - 0.1, G: LN(7) - 0.1 };
const B = (t) => t / 0.500008;
const tCaret = T('This'); // 2023 -> 2026 switch

// ---------------------------------------------------------------- room geometry (world coords; camera moves over it)
const TV = { x: 200, y: 720, w: 680, h: 530 }, SC = { x: 240, y: 760, w: 600, h: 410 };
const CLK = { x: 880, y: 545, r: 100 }, WIN = { x: 90, y: 430, w: 400, h: 250 };
const RAD = { x: 40, y: 1130, w: 150, h: 120 }, PH = { x: 893, y: 1010, w: 134, h: 236 };
const CAB = { x: 20, y: 1250, w: 1040, h: 150 };

// ---------------------------------------------------------------- helpers
function chip(ctx, label, x, y, size, k, { bg = C.amber, fg = C.ink, rot = -0.03, fam = UI, wt = 800 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, fam); const w = ctx.measureText(label).width + size * 1.0, h = size * 1.6;
  ctx.fillStyle = 'rgba(0,0,0,0.45)'; rrect(ctx, -w / 2 + 6, -h / 2 + 8, w, h, 12); ctx.fill();
  ctx.fillStyle = bg; rrect(ctx, -w / 2, -h / 2, w, h, 12); ctx.fill();
  text(ctx, label, 0, size * 0.36, font(size, wt, fam), fg, 'center', 1); ctx.restore();
}
function big(ctx, str, x, y, size, col, k, { rot = 0, stroke = C.ink, sw = 0.1 } = {}) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
  ctx.lineWidth = size * sw; ctx.strokeStyle = stroke; ctx.strokeText(str, 0, 0); ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function stamp(ctx, label, x, y, size, t, t0, col = C.red, rot = -0.08) {
  const k = t >= t0 ? Math.min(1.04, lerp(1.7, 1, E.outBack(prog(t, t0, t0 + 0.22)))) : 0; if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, 800, D); const w = ctx.measureText(label).width + size * 0.9, h = size * 1.4;
  ctx.lineWidth = 10; ctx.strokeStyle = col; ctx.strokeRect(-w / 2, -h / 2, w, h);
  ctx.globalAlpha = 0.18; ctx.fillStyle = col; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.globalAlpha = 1;
  text(ctx, label, 0, size * 0.36, font(size, 800, D), col, 'center', 3); ctx.restore();
}
// camera: keys [time, zoom, fx, fy]; each key eases in over 0.5 s starting 0.15 s before its time (log-space zoom)
const CAM = [
  [0, 1.0, 540, 900], [LN(2) - 0.15, 1.28, 540, 960], [LN(3) - 0.1, 1.55, CLK.x - 170, CLK.y + 170],
  [T('TVs') - 0.25, 1.22, 540, 960], [LN(4) - 0.1, 1.42, 540, 965], [LN(5) - 0.1, 2.15, PH.x + PH.w / 2, PH.y + PH.h / 2 - 20],
  [LN(6) - 0.1, 1.3, 540, 960], [T('No') - 0.25, 1.0, 540, 900], [LN(7) - 0.1, 1.0, 540, 900],
];
function camAt(t) {
  let z = CAM[0][1], fx = CAM[0][2], fy = CAM[0][3];
  for (let i = 1; i < CAM.length; i++) { const [ti, zi, xi, yi] = CAM[i]; const p = E.inOutCubic(prog(t, ti - 0.15, ti + 0.4)); if (p <= 0) break;
    z = z * (zi / z) ** p; fx = lerp(fx, xi, p); fy = lerp(fy, yi, p); }
  // gentle drift so nothing is ever still
  z *= 1 + 0.012 * Math.sin(t * 0.9); fx += 6 * Math.sin(t * 0.7); fy += 5 * Math.cos(t * 0.6);
  return { z, fx, fy };
}

// ---------------------------------------------------------------- lights: skyline windows + room dim (the "blackout" claim)
const tOff0 = T('blackout'), tOn = S.B + 0.05;
function dimAt(t) { // 0 = normal, 1 = full dark
  if (t < tOff0 - 0.1) return 0;
  if (t < tOn) { const d = clamp(prog(t, tOff0 - 0.1, tOff0 + 0.5)); return 0.72 * d * (0.85 + 0.15 * Math.sin(t * 40) * (d < 1 ? 1 : 0.3)); }
  return 0.72 * (1 - E.outCubic(prog(t, tOn, tOn + 0.25)));
}
function winLit(i, t) { // window i of the skyline lit?
  if (t >= tOff0 && t < tOn) return t < tOff0 + hash01(i, 77) * 0.55;
  return hash01(i, 78) > 0.28 || (t >= T('No') && t < S.G);
}

// ---------------------------------------------------------------- props
function windowSky(ctx, t) {
  const { x, y, w, h } = WIN;
  ctx.save(); rrect(ctx, x, y, w, h, 8); ctx.clip();
  const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#1C2A52'); g.addColorStop(1, '#3B3560'); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
  // moon
  ctx.fillStyle = '#F3EBD2'; ctx.beginPath(); ctx.arc(x + w - 70, y + 60, 26, 0, TAU); ctx.fill();
  // skyline: buildings with windows
  let bx = x - 10, i = 0;
  while (bx < x + w) { const bw = 40 + 40 * hash01(i, 3), bh = 70 + 140 * hash01(i, 4), by = y + h - bh;
    ctx.fillStyle = C.bld; ctx.fillRect(bx, by, bw, bh);
    for (let r = 0; r < Math.floor(bh / 22) - 1; r++) for (let c = 0; c < Math.floor(bw / 16); c++) { const id = i * 97 + r * 13 + c;
      if (winLit(id, t)) { ctx.fillStyle = hash01(id, 5) > 0.5 ? C.amber : '#FFE08A'; ctx.fillRect(bx + 5 + c * 16, by + 10 + r * 22, 8, 11); } }
    bx += bw + 4; i++; }
  ctx.restore();
  ctx.lineWidth = 14; ctx.strokeStyle = C.wood2; rrect(ctx, x, y, w, h, 8); ctx.stroke();
  ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2, y + h); ctx.stroke();
}
function clockAngles(t) { // returns [hourAngle, minuteAngle]; 10:00 drifting, spins to 2:20 on '2:20 PM'
  const t22 = T('2:20 PM'), base = 10 * 60 + 6 + t * 2; // minutes past 0:00
  const q = E.inOutCubic(prog(t, t22 - 0.45, t22 + 0.2));
  const target = 14 * 60 + 20; const m = lerp(base, target, q) + (q >= 1 ? (t - t22 - 0.2) * 0.4 : 0);
  return [((m / 60) % 12) / 12 * TAU, (m % 60) / 60 * TAU];
}
function clock(ctx, t) {
  const { x, y, r } = CLK; const hot = t >= T('2:20 PM') - 0.1 && t < S.D;
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(4, 8, r + 12, 0, TAU); ctx.fill();
  ctx.fillStyle = C.wood; ctx.beginPath(); ctx.arc(0, 0, r + 12, 0, TAU); ctx.fill();
  ctx.fillStyle = C.cream; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill();
  for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU; ctx.lineWidth = i % 3 ? 4 : 9; ctx.strokeStyle = C.ink; ctx.beginPath();
    ctx.moveTo(Math.sin(a) * r * 0.8, -Math.cos(a) * r * 0.8); ctx.lineTo(Math.sin(a) * r * 0.93, -Math.cos(a) * r * 0.93); ctx.stroke(); }
  const [ha, ma] = clockAngles(t); ctx.lineCap = 'round';
  ctx.lineWidth = 11; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.sin(ha) * r * 0.5, -Math.cos(ha) * r * 0.5); ctx.stroke();
  ctx.lineWidth = 7; ctx.strokeStyle = hot ? C.red : C.ink; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.sin(ma) * r * 0.78, -Math.cos(ma) * r * 0.78); ctx.stroke();
  ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(0, 0, 9, 0, TAU); ctx.fill();
  ctx.restore();
}
function radio(ctx, t) {
  const { x, y, w, h } = RAD, on = t >= T('radios') - 0.05 && t < S.E;
  ctx.save(); const shk = on ? Math.sin(t * 70) * 1.5 : 0; ctx.translate(shk, 0);
  ctx.fillStyle = C.wood; rrect(ctx, x, y, w, h, 18); ctx.fill();
  ctx.fillStyle = C.wood2; rrect(ctx, x + 12, y + 14, 74, h - 28, 10); ctx.fill();
  ctx.fillStyle = '#2A1A10'; for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) { ctx.beginPath(); ctx.arc(x + 26 + c * 15, y + 30 + r * 15, 4, 0, TAU); ctx.fill(); }
  ctx.fillStyle = on ? C.amber : C.grey; ctx.beginPath(); ctx.arc(x + 118, y + 42, 17, 0, TAU); ctx.fill();
  ctx.fillStyle = C.cream; ctx.beginPath(); ctx.arc(x + 118, y + 88, 12, 0, TAU); ctx.fill();
  ctx.strokeStyle = C.grey; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + w - 24, y); ctx.lineTo(x + w + 20, y - 80); ctx.stroke();
  ctx.restore();
  if (on) waves(ctx, x + w / 2, y + h / 2, t, C.amber, 110, -1);
}
function waves(ctx, x, y, t, col, r0, dir = 1) {
  for (let i = 0; i < 3; i++) { const a = (t * 2.2 + i / 3) % 1; ctx.save(); ctx.globalAlpha = 1 - a; ctx.lineWidth = 9; ctx.strokeStyle = col; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(x, y, r0 + a * 90, -0.55 + (dir < 0 ? 0 : Math.PI), 0.55 + (dir < 0 ? 0 : Math.PI)); ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y, r0 + a * 90, Math.PI - 0.55 + (dir < 0 ? 0 : Math.PI), Math.PI + 0.55 + (dir < 0 ? 0 : Math.PI)); ctx.stroke(); ctx.restore(); }
}
// bell icon (optionally slashed)
function bell(ctx, x, y, r, col, slash) {
  ctx.save(); ctx.translate(x, y); ctx.fillStyle = col;
  ctx.beginPath(); ctx.moveTo(-r * 0.8, r * 0.5); ctx.quadraticCurveTo(-r * 0.7, -r * 0.9, 0, -r * 0.95); ctx.quadraticCurveTo(r * 0.7, -r * 0.9, r * 0.8, r * 0.5); ctx.closePath(); ctx.fill();
  ctx.fillRect(-r, r * 0.45, r * 2, r * 0.22); ctx.beginPath(); ctx.arc(0, r * 0.82, r * 0.22, 0, TAU); ctx.fill();
  if (slash) { ctx.lineCap = 'round'; ctx.lineWidth = r * 0.26; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.moveTo(-r * 1.1, -r * 1.0); ctx.lineTo(r * 1.1, r * 1.1); ctx.stroke();
    ctx.lineWidth = r * 0.16; ctx.strokeStyle = C.red; ctx.stroke(); }
  ctx.restore();
}
function phone(ctx, t) {
  const { x, y, w, h } = PH; const past = t >= S.E && t < tCaret - 0.05, buzz = past && t >= T('2023,') - 0.05;
  ctx.save(); ctx.translate(x + w / 2, y + h / 2); if (buzz) ctx.rotate(Math.sin(t * 55) * 0.05);
  ctx.fillStyle = '#05070C'; rrect(ctx, -w / 2, -h / 2, w, h, 18); ctx.fill();
  ctx.fillStyle = '#121A2C'; rrect(ctx, -w / 2 + 6, -h / 2 + 8, w - 12, h - 16, 12); ctx.fill();
  if (past) { const k = pop(t, S.E + 0.2); if (k > 0) { ctx.save(); ctx.scale(k, k);
      ctx.fillStyle = C.red; rrect(ctx, -w / 2 + 10, -h / 2 + 28, w - 20, 74, 8); ctx.fill();
      text(ctx, 'ALERT', 0, -h / 2 + 62, font(20, 800, D), C.cream, 'center', 1); text(ctx, 'TEST', 0, -h / 2 + 88, font(16, 700, UI), C.cream, 'center', 1); ctx.restore(); } }
  else if (t >= tCaret) bell(ctx, 0, 6, 26 * pop(t, T('silent.') - 0.15), C.grey, true);
  ctx.restore();
  if (buzz) for (let i = 0; i < 2; i++) { const sd = i ? 1 : -1; ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 6; ctx.lineCap = 'round';
    for (let j = 0; j < 2; j++) { const o = 18 + j * 16 + 4 * Math.sin(t * 30); ctx.beginPath(); ctx.moveTo(x + w / 2 + sd * (w / 2 + o), y + 50); ctx.lineTo(x + w / 2 + sd * (w / 2 + o), y + h - 50); ctx.stroke(); } ctx.restore(); }
}
function lamp(ctx, t) { // warm floor lamp glow in the left corner
  const g = ctx.createRadialGradient(150, 880, 10, 150, 880, 520); g.addColorStop(0, 'rgba(255,194,61,0.20)'); g.addColorStop(1, 'rgba(255,194,61,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 300, 800, 1200);
}

// ---------------------------------------------------------------- TV screen content (clipped)
function scanlines(ctx, x, y, w, h, t, a = 0.16) {
  ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#000'; for (let yy = y + ((t * 40) % 6); yy < y + h; yy += 6) ctx.fillRect(x, yy, w, 2); ctx.restore();
}
function colourBars(ctx, x, y, w, h, t) {
  const bw = w / BARS.length; BARS.forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(x + i * bw, y, bw + 1, h * 0.72); });
  ['#3348D6', '#121212', '#D64ACB', '#121212', '#3AD2E0', '#121212', '#E9E9E9'].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(x + i * bw, y + h * 0.72, bw + 1, h * 0.08); });
  ctx.fillStyle = '#0D2340'; ctx.fillRect(x, y + h * 0.8, w * 0.3, h * 0.2); ctx.fillStyle = '#F2F2F2'; ctx.fillRect(x + w * 0.3, y + h * 0.8, w * 0.3, h * 0.2);
  ctx.fillStyle = '#251040'; ctx.fillRect(x + w * 0.6, y + h * 0.8, w * 0.4, h * 0.2);
}
function screenContent(ctx, t) {
  const { x, y, w, h } = SC, mx = x + w / 2, my = y + h / 2;
  ctx.fillStyle = C.screen; ctx.fillRect(x, y, w, h);
  if (t < S.B) { // the viral clip: a phone-video frame with a play head
    const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, '#2B3B6E'); g.addColorStop(1, '#6A3D6E'); ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
    // tiny city in the clip, going dark on 'blackout'
    for (let i = 0; i < 9; i++) { const bw = w / 9, bh = 90 + 110 * hash01(i, 31); ctx.fillStyle = '#10142A'; ctx.fillRect(x + i * bw + 3, y + h - 60 - bh, bw - 6, bh);
      for (let r = 0; r < 4; r++) if (winLit(500 + i * 7 + r, t)) { ctx.fillStyle = C.amber; ctx.fillRect(x + i * bw + 16, y + h - 50 - bh + 14 + r * 24, 14, 12); ctx.fillRect(x + i * bw + 38, y + h - 50 - bh + 14 + r * 24, 14, 12); } }
    const kq = pop(t, T('predicted') - 0.05);
    if (kq > 0) { ctx.save(); ctx.translate(mx, y + 120); ctx.scale(kq, kq); ctx.fillStyle = 'rgba(0,0,0,0.6)'; rrect(ctx, -250, -50, 500, 100, 14); ctx.fill();
      text(ctx, 'BLACKOUT ON NOV 17?', 0, 15, font(46, 800, D), C.cream, 'center', 1); ctx.restore(); }
    // play button + progress
    const pk = 1 - prog(t, T('predicted') - 0.2, T('predicted')); if (pk > 0) { ctx.save(); ctx.globalAlpha = pk; ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.beginPath(); ctx.arc(mx, my - 20, 62, 0, TAU); ctx.fill(); ctx.fillStyle = C.red; ctx.beginPath(); ctx.moveTo(mx - 18, my - 50); ctx.lineTo(mx + 30, my - 20); ctx.lineTo(mx - 18, my + 10); ctx.fill(); ctx.restore(); }
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(x + 20, y + h - 26, w - 40, 8); ctx.fillStyle = C.red; ctx.fillRect(x + 20, y + h - 26, (w - 40) * prog(t, 0, S.B), 8);
  } else if (t < S.C) { // truth: colour bars + glitch
    colourBars(ctx, x, y, w, h, t);
    const gl = 1 - prog(t, S.B, S.B + 0.3); if (gl > 0) for (let i = 0; i < 8; i++) { ctx.fillStyle = BARS[i % 7]; ctx.fillRect(x + hash01(i, Math.floor(t * 30)) * w * 0.5, y + hash01(i + 9, Math.floor(t * 30)) * h, w * 0.6, 10 + 20 * hash01(i, 3)); }
  } else if (t < T('TVs') - 0.1) { // clock time on screen
    colourBars(ctx, x, y, w, h, t); ctx.fillStyle = 'rgba(8,12,24,0.78)'; ctx.fillRect(x, y, w, h);
  } else if (t < S.E) { // EAS test slate + 1-minute timer
    ctx.fillStyle = '#7A0E14'; ctx.fillRect(x, y, w, h);
    const fl = Math.sin(t * 9) > 0 ? 1 : 0.86; ctx.fillStyle = `rgba(229,56,59,${fl})`; ctx.fillRect(x, y + 28, w, 92);
    text(ctx, 'EMERGENCY ALERT SYSTEM', mx, y + 92, font(42, 800, D), C.cream, 'center', 1);
    const isTest = t >= S.D; const kT = pop(t, isTest ? T('test.') - 0.1 : T('TVs'));
    if (!isTest) { text(ctx, 'NATIONWIDE TEST', mx, y + 196, font(56, 800, D), C.cream, 'center', 2);
      // the one-minute timer
      const t1 = T('1') - 0.05, q = clamp(prog(t, t1, T('minute.') + 0.4));
      ctx.lineWidth = 18; ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.beginPath(); ctx.arc(mx, y + 315, 62, 0, TAU); ctx.stroke();
      ctx.strokeStyle = C.amber; ctx.beginPath(); ctx.arc(mx, y + 315, 62, -Math.PI / 2, -Math.PI / 2 + TAU * q); ctx.stroke();
      text(ctx, t < t1 ? 'BEEP' : `0:${String(Math.round(60 * q)).padStart(2, '0')}`, mx, y + 332, font(t < t1 ? 34 : 44, 800, D), C.cream, 'center');
    } else { ctx.save(); ctx.translate(mx, y + 230); ctx.scale(kT || 1, kT || 1);
      text(ctx, 'THIS IS ONLY', 0, 0, font(66, 800, D), C.cream, 'center', 2); text(ctx, 'A TEST', 0, 92, font(96, 800, D), C.amber, 'center', 3); ctx.restore(); }
  } else if (t < S.F) { // flashback on screen: 2023
    colourBars(ctx, x, y, w, h, t); ctx.fillStyle = 'rgba(10,8,4,0.72)'; ctx.fillRect(x, y, w, h);
    text(ctx, t < tCaret ? '2023' : '2026', mx, my + 50, font(170, 800, D), t < tCaret ? '#E8D6A8' : C.cream, 'center', 4);
  } else if (t < S.G) { // the episode card
    if (t < T('No') - 0.15) { ctx.fillStyle = '#F3E7C6'; ctx.fillRect(x, y, w, h);
      text(ctx, 'THE EPISODE', mx, y + 80, font(40, 700, UI), '#6A5A3A', 'center', 4);
      text(ctx, 'FIRST AIRED', mx, y + 160, font(54, 800, D), C.ink, 'center', 1);
      text(ctx, 'NOV 19, 2023', mx, y + 240, font(72, 800, D), C.red2, 'center', 1);
      const k3 = pop(t, T('3') - 0.05); if (k3 > 0) { ctx.save(); ctx.translate(mx, y + 335); ctx.scale(k3, k3); ctx.fillStyle = C.ink; rrect(ctx, -190, -40, 380, 80, 12); ctx.fill();
        text(ctx, '3 YEARS OLD', 0, 18, font(50, 800, D), C.amber, 'center', 2); ctx.restore(); }
    } else { colourBars(ctx, x, y, w, h, t); ctx.fillStyle = 'rgba(8,12,24,0.8)'; ctx.fillRect(x, y, w, h);
      const k0 = pop(t, T('No') - 0.05); big(ctx, '0', mx, my + 40, 230, C.amber, k0, { sw: 0.04 });
      text(ctx, 'BLACKOUTS ANNOUNCED', mx, y + h - 50, font(40, 800, D), C.cream, 'center', 2); }
  } else { colourBars(ctx, x, y, w, h, t); }
  scanlines(ctx, x, y, w, h, t);
  // screen glass glow
  const g2 = ctx.createRadialGradient(mx, my, 40, mx, my, w * 0.75); g2.addColorStop(0, 'rgba(255,255,255,0.06)'); g2.addColorStop(1, 'rgba(0,0,0,0.35)'); ctx.fillStyle = g2; ctx.fillRect(x, y, w, h);
}
function tv(ctx, t) {
  const { x, y, w, h } = TV;
  // glow on wall from the screen
  const gc = t >= T('TVs') - 0.1 && t < S.E ? 'rgba(229,56,59,0.25)' : 'rgba(159,212,255,0.16)';
  const g = ctx.createRadialGradient(x + w / 2, y + h / 2, 100, x + w / 2, y + h / 2, 640); g.addColorStop(0, gc); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(x - 400, y - 400, w + 800, h + 800);
  ctx.fillStyle = C.ink; rrect(ctx, x + 8, y + 14, w, h, 34); ctx.fill();
  ctx.fillStyle = '#2E2A30'; rrect(ctx, x, y, w, h, 34); ctx.fill();
  ctx.fillStyle = '#1E1B20'; rrect(ctx, x + 14, y + 14, w - 28, h - 28, 26); ctx.fill();
  ctx.save(); rrect(ctx, SC.x, SC.y, SC.w, SC.h, 22); ctx.clip(); screenContent(ctx, t); ctx.restore();
  // knobs strip under screen
  ctx.fillStyle = '#3A3540'; ctx.fillRect(x + 40, y + h - 70, w - 80, 44);
  for (let i = 0; i < 3; i++) { ctx.fillStyle = '#121014'; ctx.beginPath(); ctx.arc(x + w - 90 - i * 60, y + h - 48, 14, 0, TAU); ctx.fill(); }
  ctx.fillStyle = t >= T('TVs') - 0.1 && t < S.E && Math.sin(t * 9) > 0 ? C.red : C.green; ctx.beginPath(); ctx.arc(x + 80, y + h - 48, 8, 0, TAU); ctx.fill();
  // antenna
  ctx.strokeStyle = '#6E6A75'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2 - 150, y - 140 + 6 * Math.sin(t * 2)); ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w / 2 + 130, y - 150); ctx.stroke();
  ctx.fillStyle = '#4A4552'; ctx.beginPath(); ctx.ellipse(x + w / 2, y + 4, 60, 22, 0, Math.PI, 0); ctx.fill();
  if (t >= T('beep') - 0.05 && t < S.E) waves(ctx, x + w / 2, y + h / 2, t, C.red, w * 0.56, 1);
}
function room(ctx, t) {
  ctx.fillStyle = C.wall; ctx.fillRect(-600, -600, W + 1200, H + 1200);
  for (let i = -10; i < 30; i++) { ctx.fillStyle = i % 2 ? C.wall2 : C.wall; ctx.fillRect(i * 70, -600, 70, 1850 + 600); } // wallpaper stripes
  ctx.fillStyle = C.floor; ctx.fillRect(-600, 1250, W + 1200, 1200);
  lamp(ctx, t); windowSky(ctx, t); clock(ctx, t);
  // cabinet
  ctx.fillStyle = C.wood; ctx.fillRect(CAB.x, CAB.y, CAB.w, CAB.h); ctx.fillStyle = C.wood2; ctx.fillRect(CAB.x, CAB.y, CAB.w, 16);
  ctx.fillStyle = C.wood2; ctx.fillRect(CAB.x + 30, CAB.y + 40, CAB.w / 2 - 50, CAB.h - 60); ctx.fillRect(CAB.x + CAB.w / 2 + 20, CAB.y + 40, CAB.w / 2 - 50, CAB.h - 60);
  tv(ctx, t); radio(ctx, t); phone(ctx, t);
}

// ---------------------------------------------------------------- persistent bottom board: VIEWS -> FACT CHECK
function viewsAt(t) { return Math.round(1500000 * E.outCubic(prog(t, 0.05, T('views.') + 0.1))); }
const CELLS = [
  ['TV', () => T('TVs'), 'BEEP', C.amber], ['RADIO', () => T('radios'), 'BEEP', C.amber],
  ['PHONES', () => T('silent.'), 'SILENT', C.green], ['BLACKOUT', () => T('blackout.'), 'NONE', C.green],
];
function board(ctx, t) {
  const y = s.y + s.h - 50, w = 960, x0 = cx - w / 2, h = 140;
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.5)'; rrect(ctx, x0 + 6, y - h / 2 + 10, w, h, 18); ctx.fill();
  ctx.fillStyle = '#10131C'; rrect(ctx, x0, y - h / 2, w, h, 18); ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#2C3448'; ctx.stroke();
  const flip = E.inOutCubic(prog(t, S.B, S.B + 0.3));
  if (flip < 0.5) { ctx.save(); ctx.translate(cx, y); ctx.scale(1, 1 - flip * 2); ctx.translate(-cx, -y);
    ctx.fillStyle = C.red; rrect(ctx, x0, y - h / 2, 300, h, 18); ctx.fill();
    // play triangle + VIEWS
    ctx.fillStyle = C.cream; ctx.beginPath(); ctx.moveTo(x0 + 40, y - 22); ctx.lineTo(x0 + 78, y); ctx.lineTo(x0 + 40, y + 22); ctx.fill();
    text(ctx, 'VIEWS', x0 + 190, y + 17, font(48, 800, D), C.cream, 'center', 2);
    const n = viewsAt(t).toLocaleString('en-US'); text(ctx, n, x0 + 630, y + 30, font(84, 800, D), C.cream, 'center', 1);
    ctx.restore();
  } else { ctx.save(); ctx.translate(cx, y); ctx.scale(1, (flip - 0.5) * 2); ctx.translate(-cx, -y);
    const cw = w / 4;
    CELLS.forEach(([lab, tf, val, col], i) => { const ti = tf(), done = t >= ti - 0.05, xx = x0 + i * cw;
      if (i) { ctx.fillStyle = '#2C3448'; ctx.fillRect(xx, y - h / 2 + 14, 3, h - 28); }
      text(ctx, lab, xx + cw / 2, y - 18, font(34, 700, UI), C.grey, 'center', 3);
      if (!done) text(ctx, '?', xx + cw / 2, y + 46, font(54, 800, D), '#4A5368', 'center');
      else { const k = pop(t, ti - 0.05); ctx.save(); ctx.translate(xx + cw / 2, y + 46); ctx.scale(k, k); text(ctx, val, 0, 0, font(54, 800, D), col, 'center', 1); ctx.restore(); } });
    ctx.restore(); }
  ctx.restore();
}

// ---------------------------------------------------------------- captions (word by word, top)
function captions(ctx, t) {
  const L = TIMING.lines; const li = L.findIndex((l, i) => t >= l.t0 - 0.05 && t < (L[i + 1] ? L[i + 1].t0 - 0.05 : END)); if (li < 0) return;
  if (li === 0 || t < S.A2 + 0.3) return; // the hook number is the caption itself
  if (li === 7) return; // end card carries its own words
  const all = L[li].words, ws = all.filter((w) => t >= w.t - 0.03); if (!ws.length) return;
  const start = Math.floor((ws.length - 1) / 3) * 3, chunk = all.slice(start, start + 3), shown = ws.slice(start);
  let size = 94; const gap = 24;
  const meas = (sz) => { ctx.font = font(sz, 800, D); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 20) { size = Math.floor(size * (s.w - 20) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 100;
  shown.forEach((w, i) => { const k = sp(t, w.t - 0.03, SPRING.bouncy), sc = Math.min(1.1, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.22; ctx.strokeStyle = C.ink; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.amber : C.cream; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}

// ---------------------------------------------------------------- screen-space overlays per beat
function overlays(ctx, t) {
  if (t < S.A2 + 0.35) { // HOOK: 1.5M on frame 0
    const out = E.inCubic(prog(t, S.A2 - 0.05, S.A2 + 0.3)); const k0 = t < 0.2 ? lerp(1.12, 1, E.outBack(prog(t, 0, 0.2))) : 1;
    ctx.save(); ctx.translate(0, -out * 700); ctx.globalAlpha = 1 - out;
    ctx.fillStyle = 'rgba(5,7,14,0.55)'; ctx.fillRect(0, s.y - 60, W, 520);
    const n = t < T('views.') ? '1.5M' : '1.5M';
    big(ctx, n, cx, s.y + 300, 300, C.amber, k0 * (1 + 0.015 * Math.sin(t * 7)), { sw: 0.06 });
    chip(ctx, 'VIEWS', cx - 170, s.y + 400, 52, pop(t, T('views.') - 0.1), { bg: C.red, fg: C.cream, rot: -0.05 });
    chip(ctx, 'SIMPSONS BLACKOUT?', cx + 90, s.y + 20, 58, pop(t, 0.02), { bg: C.cream, rot: 0.03 });
    ctx.restore();
  }
  // claim beat: TV quote + "SIMPSONS" type (no characters)
  if (t >= S.A2 && t < S.B + 0.1) { const k = pop(t, T('Simpsons') - 0.05);
    chip(ctx, '"THE SIMPSONS PREDICTED IT"', cx, s.y + 300, 54, k, { bg: '#F2E24A', rot: -0.04 }); }
  // truth beat: FACT CHECK stamp
  if (t >= S.B && t < S.C + 0.05) stamp(ctx, 'FACT CHECK', cx, s.y + 330, 96, t, T('truth.') - 0.15, C.red, -0.07);
  if (t >= S.C && t < T('TVs') - 0.15) { const k = pop(t, T('2:20 PM') - 0.05);
    chip(ctx, '2:20 PM ET', cx - 140, s.y + 760, 84, k, { bg: C.amber, rot: -0.04 });
    chip(ctx, 'TUE 17 NOV', cx - 170, s.y + 600, 50, pop(t, S.C + 0.1), { bg: C.cream, rot: 0.03 }); }
  // test: FEMA + FCC tags
  if (t >= S.D && t < S.E + 0.05) { chip(ctx, 'FEMA', cx - 220, s.y + 300, 60, pop(t, T('national') - 0.05), { bg: C.cream, rot: -0.06 });
    chip(ctx, 'FCC', cx + 220, s.y + 300, 60, pop(t, T('emergency') - 0.05), { bg: C.cream, rot: 0.06 }); }
  // flashback year flags
  if (t >= S.E && t < S.F + 0.05) { const past = t < tCaret - 0.05;
    big(ctx, past ? '2023' : '2026', cx, s.y + 450, 190, past ? '#E8D6A8' : C.amber, past ? pop(t, T('2023,') - 0.1) : pop(t, tCaret - 0.05), { rot: -0.05, sw: 0.07 });
    chip(ctx, past ? 'PHONES ALERTED TOO' : 'NO PHONE ALERT', cx, s.y + 240, 56, past ? pop(t, T('2023,') - 0.05) : pop(t, tCaret - 0.05), { bg: past ? '#E8D6A8' : C.green, fg: C.ink, rot: past ? -0.04 : 0.04 }); }
  // payoff
  if (t >= T('No') - 0.1 && t < S.G) chip(ctx, 'NO BLACKOUT PLANNED', cx, s.y + 300, 56, pop(t, T('announced') - 0.05), { bg: C.green, fg: C.ink, rot: -0.03 });
}

// ---------------------------------------------------------------- end card
function endCard(ctx, t) {
  const k = E.outCubic(prog(t, S.G - 0.05, S.G + 0.35)); if (k <= 0) return;
  ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = 'rgba(6,8,16,0.86)'; ctx.fillRect(0, 0, W, H); ctx.restore();
  // little colour bars strip
  const bw = 720 / 7; BARS.forEach((c, i) => { const kk = pop(t, S.G + i * 0.04); if (kk <= 0) return; ctx.fillStyle = c; ctx.fillRect(cx - 360 + i * bw, s.y + 230, bw + 1, 40 * kk); });
  big(ctx, 'WHYVERSE', cx, s.y + 420, 130, C.cream, pop(t, S.G), { sw: 0.05 });
  text(ctx, 'NO BLACKOUT. JUST A TEST.', cx, s.y + 520, font(46, 800, D), C.amber, 'center', 2);
  const kB = pop(t, T('Like') - 0.05), kF = pop(t, T('follow') - 0.05);
  if (kB > 0) { ctx.save(); ctx.translate(cx - 215, s.y + 720); ctx.scale(kB, kB); ctx.rotate(-0.04);
    ctx.fillStyle = C.cream; rrect(ctx, -190, -72, 380, 144, 24); ctx.fill();
    const hb = 1 + 0.14 * Math.max(0, Math.sin((t - T('Like')) * 9)) * Math.exp(-(t - T('Like')) * 2);
    ctx.save(); ctx.translate(-105, 4); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30);
    ctx.fillStyle = C.red; ctx.fill(); ctx.restore();
    text(ctx, 'LIKE', 45, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  if (kF > 0) { ctx.save(); ctx.translate(cx + 215, s.y + 720); ctx.scale(kF, kF); ctx.rotate(0.04);
    ctx.fillStyle = C.red; rrect(ctx, -190, -72, 380, 144, 24); ctx.fill();
    ctx.save(); ctx.translate(-130, 4); ctx.lineWidth = 13; ctx.strokeStyle = C.cream; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'FOLLOW', 45, 24, font(56, 800, D), C.cream, 'center'); ctx.restore(); }
  const kS = pop(t, T('more.') + 0.05);
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 930); ctx.scale(kS, kS);
    ctx.fillStyle = '#1B2234'; rrect(ctx, -470, -80, 940, 160, 20); ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#2C3448'; ctx.stroke();
    ctx.save(); ctx.translate(-385, 0); ctx.fillStyle = C.cream; ctx.fillRect(-36, -24, 72, 48); ctx.lineWidth = 5; ctx.strokeStyle = '#1B2234'; ctx.beginPath(); ctx.moveTo(-36, -24); ctx.lineTo(0, 6); ctx.lineTo(36, -24); ctx.stroke(); ctx.restore();
    text(ctx, 'Send this to the friend who sends', 40, -12, font(42, 700, UI), C.cream, 'center');
    text(ctx, 'every "Simpsons predicted it" video', 40, 42, font(42, 700, UI), C.amber, 'center');
    ctx.restore(); }
  // the little TV keeps glowing at the bottom
  ctx.save(); ctx.translate(cx, s.y + 1130); const kt = pop(t, S.G + 0.2); ctx.scale(kt * 0.32, kt * 0.32); ctx.translate(-(TV.x + TV.w / 2), -(TV.y + TV.h / 2)); tv(ctx, t); ctx.restore();
}

const HITS = [
  [B(0.02), '1.5M', 'pop', { pitch: 'D5' }], [B(0.1), 'views roll', 'type', { len: 1.3, n: 10 }], [B(T('views.') - 0.1), 'VIEWS', 'click'],
  [B(T('Simpsons')), 'quote', 'pop', { pitch: 'A4' }], [B(T('predicted')), 'card', 'click'], [B(T('blackout')), 'lights off', 'whoosh', { len: 0.5, from: 1200, to: 200 }],
  [B(S.B), 'lights on', 'whoosh', { len: 0.3, from: 300, to: 1500 }], [B(S.B + 0.05), 'board flip', 'tick'], [B(T('truth.') - 0.15), 'FACT CHECK', 'click'],
  [B(S.C), 'to clock', 'whoosh', { len: 0.35, from: 600, to: 1800 }], [B(T('2:20 PM') - 0.4), 'clock spin', 'type', { len: 0.5, n: 6 }], [B(T('2:20 PM')), '2:20', 'pop', { pitch: 'E5' }],
  [B(T('TVs') - 0.2), 'to TV', 'whoosh', { len: 0.35, from: 1800, to: 600 }], [B(T('TVs')), 'TV BEEP', 'blip', { pitch: 'A5' }], [B(T('radios')), 'RADIO BEEP', 'blip', { pitch: 'A5' }],
  [B(T('beep')), 'beep', 'blip', { pitch: 'E5' }], [B(T('1')), 'timer', 'type', { len: 0.8, n: 8 }],
  [B(T('national')), 'FEMA', 'pop', { pitch: 'G4' }], [B(T('emergency')), 'FCC', 'pop', { pitch: 'B4' }], [B(T('test.') - 0.1), 'ONLY A TEST', 'click'],
  [B(S.E), 'to phone', 'whoosh', { len: 0.4, from: 600, to: 1800 }], [B(T('2023,')), '2023', 'pop', { pitch: 'D5' }], [B(T('buzzed') - 0.25), 'buzz', 'type', { len: 0.6, n: 10 }],
  [B(tCaret), '2026', 'pop', { pitch: 'A5' }], [B(T('silent.')), 'SILENT', 'click'],
  [B(S.F), 'to TV', 'whoosh', { len: 0.35, from: 1800, to: 600 }], [B(T('episode')), 'card', 'click'], [B(T('3')), '3 years', 'pop', { pitch: 'E5' }],
  [B(T('No') - 0.2), 'pull back', 'whoosh', { len: 0.4, from: 400, to: 1400 }], [B(T('No')), '0', 'pop', { pitch: 'D5' }], [B(T('blackout.')), 'NONE', 'click'],
  [B(S.G), 'end', 'whoosh', { len: 0.4, from: 1600, to: 400 }], [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop', { pitch: 'A5' }], [B(T('more.') + 0.05), 'send', 'click'],
];

M.film({
  fonts: [font(40, 800, D), font(40, 700, UI)], samples: 4,
  hits: HITS,
  draw(ctx, u, t) {
    const { z, fx, fy } = camAt(t);
    const past = t >= S.E + 0.1 && t < tCaret - 0.05; // 2023 flashback = sepia room
    ctx.save(); if (past) ctx.filter = 'sepia(0.85) saturate(0.8) brightness(0.95)';
    ctx.translate(W / 2, 900); ctx.scale(z, z); ctx.translate(-fx, -fy);
    room(ctx, t); ctx.restore(); ctx.filter = 'none';
    const dm = dimAt(t); if (dm > 0) { ctx.fillStyle = `rgba(2,3,8,${dm})`; ctx.fillRect(0, 0, W, H); }
    // vignette
    const vg = ctx.createRadialGradient(W / 2, H / 2, 500, W / 2, H / 2, 1250); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.55)'); ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
    overlays(ctx, t);
    if (t < S.G + 0.2) board(ctx, t);
    captions(ctx, t);
    endCard(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 220; i++) { ctx.fillStyle = `rgba(255,255,255,${0.015 + 0.025 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
