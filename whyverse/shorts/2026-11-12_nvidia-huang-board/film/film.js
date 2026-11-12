// Whyverse daily trend Short 2026-11-12 — "Nvidia: $600 billion over one man's private life".
// NEWSPAPER / EDITORIAL style (Lora + Inter), 120 bpm, 1 beat = 0.5 s, 72 beats = 36 s, 60 fps.
// Every super is timed to the Kokoro af_heart line that says it (vo_timing.json, u = 2 * seconds).
// No faces, no logos: type, numbers, a chart, a memo, a dossier, a boardroom, chips.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, springU, SPRING, font, layout, glyph, text, fill, rrect, hash01, clamp, TAU, kf } = M;

const C = { paper: '#F1EBDD', paper2: '#E6DCC6', ink: '#16140F', red: '#C62828', grey: '#6E665A', navy: '#0E1A33', gold: '#F2B33D' };
const SERIF = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;

const HITS = [
  [0, 'hook -$600B', 'impact'], [4.4, 'BILLION pulse', 'thud'], [6.6, 'market value', 'tick'],
  [8, 'page slam', 'thud'], [9.0, 'ONE MAN', 'click'], [9.8, 'PRIVATE LIFE', 'type', { len: 0.9, n: 10 }],
  [12, 'nameplate', 'whoosh', { len: 0.35, from: 2400, to: 700 }], [13.4, 'CEO', 'click'],
  [15.5, 'memo', 'thud'], [16.2, 'memo typing', 'type', { len: 1.8, n: 16 }], [18.4, 'unfaithful mark', 'tick'],
  [21, 'dossier', 'whoosh', { len: 0.4, from: 600, to: 2400 }], [21.6, 'REPORTEDLY', 'impact'],
  [23.6, 'US INTELLIGENCE', 'click'], [27.4, 'CHINESE SPY?', 'thud'],
  [29.5, 'statement', 'whoosh', { len: 0.4, from: 2400, to: 600 }], [32.4, 'no reason', 'tick'], [35.1, 'lock', 'click'],
  [37.5, '2ND', 'impact'], [40.6, 'ALLEGED AFFAIR', 'click'], [42.6, 'executive', 'tick'],
  [46, 'boardroom', 'whoosh', { len: 0.4, from: 600, to: 2000 }],
  ...Array.from({ length: 11 }, (_, i) => [46.6 + i * 0.16, 'chair ' + (i + 1), 'blip', { pitch: ['C5', 'D5', 'F5', 'G5', 'A5', 'C6', 'D6', 'F6', 'G6', 'A6', 'C7'][i] }]),
  [48.4, '11 DIRECTORS', 'thud'], [52.6, '1993', 'click'], [56.6, 'STAY OR GO', 'impact'],
  [59.5, 'why it matters', 'whoosh', { len: 0.4, from: 2400, to: 600 }], [62.4, 'chips', 'coins'], [65.2, 'AI BOOM', 'thud'],
  [67, 'end card', 'impact'], [67.8, 'whyverse', 'bell', { pitch: 'D6' }],
];

// ---------------------------------------------------------------- helpers
function paperBg(ctx, col = C.paper) {
  fill(ctx, col);
  for (let i = 0; i < 220; i++) {
    const x = hash01(i, 11) * W, y = hash01(i, 12) * H, l = 6 + hash01(i, 13) * 30;
    ctx.strokeStyle = `rgba(80,60,30,${0.04 + 0.05 * hash01(i, 14)})`; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + l, y + l * 0.2); ctx.stroke();
  }
}
function words(ctx, str, x, y, size, color, u0, u, { weight = 700, fam = SERIF, align = 'center', track = -0.01, stagger = 0.025, cfg = SPRING.snappy } = {}) {
  const f = font(size, weight, fam), L = layout(ctx, str, f, track * size);
  const x0 = align === 'center' ? x - L.width / 2 : align === 'right' ? x - L.width : x;
  L.glyphs.forEach((g, j) => {
    const k = springU(u, u0 + j * stagger, cfg); if (k <= 0.001) return;
    glyph(ctx, g.ch, x0 + g.cx, y + (1 - k) * size * 0.55, f, color, Math.min(1, k * 1.25), 1);
  });
  return L.width;
}
function typed(ctx, str, x, y, size, color, u0, u, perChar = 0.06, fam = SERIF, weight = 600, align = 'left') {
  const n = Math.floor(clamp((u - u0) / perChar, 0, str.length));
  const f = font(size, weight, fam); ctx.font = f;
  const full = ctx.measureText(str).width, xs = align === 'center' ? x - full / 2 : x;
  text(ctx, str.slice(0, n), xs, y, f, color, 'left');
  if (n > 0 && n < str.length) { ctx.font = f; ctx.fillStyle = color; ctx.fillRect(xs + ctx.measureText(str.slice(0, n)).width + 4, y - size * 0.78, 5, size * 0.9); }
}
function stamp(ctx, label, x, y, size, u0, u, rot = -0.1, col = C.red) {
  const k = springU(u, u0, SPRING.bouncy); if (k <= 0) return;
  const sc = lerp(2.2, 1, Math.min(1, k));
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha = Math.min(1, k * 1.5);
  ctx.font = font(size, 800, UI); const w = ctx.measureText(label).width + size * 0.9;
  ctx.strokeStyle = col; ctx.lineWidth = size * 0.09; rrect(ctx, -w / 2, -size * 0.86, w, size * 1.24, size * 0.16); ctx.stroke();
  text(ctx, label, 0, size * 0.1, font(size, 800, UI), col, 'center', size * 0.03);
  for (let i = 0; i < 36; i++) { ctx.fillStyle = 'rgba(241,235,221,0.85)'; ctx.fillRect((hash01(i, 21) - 0.5) * w, (hash01(i, 22) - 0.6) * size * 1.1, 3 + hash01(i, 23) * 5, 2 + hash01(i, 24) * 3); }
  ctx.restore();
}
function kicker(ctx, label, u0, u, y = s.y + 20, col = C.red) {
  const k = E.outCubic(prog(u, u0, u0 + 0.6)); if (k <= 0) return;
  ctx.font = font(34, 800, UI); ctx.letterSpacing = '4px'; const w = ctx.measureText(label).width + 44; ctx.letterSpacing = '0px';
  ctx.save(); ctx.beginPath(); ctx.rect(s.x, y - 10, w * k, 70); ctx.clip();
  ctx.fillStyle = col; ctx.fillRect(s.x, y - 10, w, 66);
  text(ctx, label, s.x + 22, y + 36, font(34, 800, UI), '#fff', 'left', 4);
  ctx.restore();
}
function tri(ctx, x, y, r, col) { ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x - r, y - r * 0.6); ctx.lineTo(x + r, y - r * 0.6); ctx.lineTo(x, y + r * 0.8); ctx.closePath(); ctx.fill(); }
function push(ctx, u, a, b, amt = 0.03) { const k = prog(u, a, b); const sc = 1 + amt * E.inOutSine(k); ctx.translate(W / 2, H * 0.45); ctx.scale(sc, sc); ctx.translate(-W / 2, -H * 0.45); }
// slide-in pan for a whole shot (the previous shot stays underneath, so no empty frames)
function enter(ctx, u, u0, dir = 1, len = 0.5) { const k = E.outCubic(prog(u, u0 - len * 0.5, u0 + len * 0.5)); ctx.translate((1 - k) * W * dir, 0); }

// ---------------------------------------------------------------- S1 hook (0..8): -$600 BILLION + falling chart
const CHART = Array.from({ length: 60 }, (_, i) => { const x = i / 59; return 0.15 + (x < 0.4 ? 0.04 * Math.sin(i * 1.3) : (x - 0.4) * 1.3) + 0.05 * (hash01(i, 5) - 0.5); });
function sHook(ctx, u) {
  paperBg(ctx);
  ctx.save(); push(ctx, u, 0, 8, 0.035);
  text(ctx, 'NVIDIA', s.x, s.y + 70, font(64, 800, UI), C.ink, 'left', 6);
  text(ctx, 'JENSEN HUANG', s.x + s.w, s.y + 70, font(40, 700, UI), C.grey, 'right', 3);
  ctx.fillStyle = C.ink; ctx.fillRect(s.x, s.y + 100, s.w, 6); ctx.fillRect(s.x, s.y + 116, s.w, 2);
  const zq = E.inOutCubic(prog(u, 3.8, 4.8));
  const cx0 = s.x, cw = s.w, cy0 = s.y + lerp(760, 640, zq), ch = lerp(430, 600, zq);
  const n = Math.floor(lerp(16, 60, E.outCubic(prog(u, -0.5, 6.5))));
  ctx.strokeStyle = 'rgba(22,20,15,0.12)'; ctx.lineWidth = 2;
  for (let g = 0; g < 5; g++) { ctx.beginPath(); ctx.moveTo(cx0, cy0 + g * ch / 4); ctx.lineTo(cx0 + cw, cy0 + g * ch / 4); ctx.stroke(); }
  ctx.beginPath(); for (let i = 0; i < n; i++) { const x = cx0 + cw * i / 59, y = cy0 + CHART[i] * ch; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
  ctx.strokeStyle = C.red; ctx.lineWidth = 12; ctx.lineJoin = 'round'; ctx.stroke();
  const lx = cx0 + cw * (n - 1) / 59, ly = cy0 + CHART[n - 1] * ch;
  ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(lx, ly, 18 + 4 * Math.sin(u * 6), 0, TAU); ctx.fill();
  const k = springU(u, -0.35, SPRING.bouncy), pulse = 1 + 0.06 * M.wobble((u - 4.4) * 0.5, 2, 6) * (u > 4.4 ? 1 : 0);
  ctx.save(); ctx.translate(cx, s.y + lerp(400, 330, zq)); const zs = lerp(1.35, 1, Math.min(1, k)) * pulse * lerp(1, 0.8, zq); ctx.scale(zs, zs);
  text(ctx, '−$600', 0, 0, font(300, 700, SERIF), C.red, 'center', -6);
  ctx.restore();
  words(ctx, 'BILLION', cx, s.y + lerp(560, 470, zq), lerp(150, 120, zq), C.ink, -0.2, u, { fam: UI, weight: 800, track: 0.02, stagger: 0.03 });
  if (u > 6.2) { tri(ctx, s.x + 24, s.y + 557, 22, C.red); words(ctx, 'in market value, in days', s.x + 64, s.y + 572, 50, C.grey, 6.2, u, { fam: UI, weight: 700, align: 'left', track: 0, stagger: 0.01 }); }
  ctx.restore();
}

// ---------------------------------------------------------------- S2 front page (8..12): ONE MAN'S PRIVATE LIFE
function sPage(ctx, u) {
  paperBg(ctx, C.paper2);
  const k = springU(u, 8, SPRING.snappy);
  const rot = lerp(-0.22, -0.025, Math.min(1, k)), sc = lerp(1.5, 1, Math.min(1, k));
  ctx.save(); ctx.translate(W / 2, H * 0.45); ctx.rotate(rot + 0.008 * Math.sin(u * 0.8)); ctx.scale(sc, sc); ctx.translate(-W / 2, -H * 0.45);
  const px = 60, py = 290, pw = W - 200, ph = 1180;
  ctx.fillStyle = 'rgba(0,0,0,0.22)'; ctx.fillRect(px + 14, py + 18, pw, ph);
  ctx.fillStyle = C.paper; ctx.fillRect(px, py, pw, ph);
  text(ctx, 'THE BUSINESS DAILY', px + pw / 2, py + 100, font(68, 700, SERIF), C.ink, 'center', 2);
  ctx.fillStyle = C.ink; ctx.fillRect(px + 40, py + 128, pw - 80, 5); ctx.fillRect(px + 40, py + 184, pw - 80, 2);
  text(ctx, 'THURSDAY 12 NOVEMBER 2026  ·  TECH', px + pw / 2, py + 168, font(26, 700, UI), C.ink, 'center', 3);
  words(ctx, "ONE MAN'S", px + pw / 2, py + 380, 150, C.ink, 8.6, u, { weight: 700, stagger: 0.02 });
  typed(ctx, 'PRIVATE LIFE', px + pw / 2, py + 560, 132, C.red, 9.6, u, 0.07, SERIF, 700, 'center');
  for (let c = 0; c < 2; c++) for (let i = 0; i < 10; i++) {
    const a = clamp(prog(u, 10.2 + i * 0.05, 10.7 + i * 0.05)); if (a <= 0) continue;
    ctx.fillStyle = `rgba(22,20,15,${0.3 * a})`;
    const lx = px + 50 + c * (pw / 2), lw = pw / 2 - 90 - (i === 9 ? 120 : hash01(i + c * 9, 3) * 30);
    ctx.fillRect(lx, py + 660 + i * 34, lw * a, 12);
  }
  ctx.restore();
}

// ---------------------------------------------------------------- S3 nameplate (12..15.5) + memo (15.5..21)
function sName(ctx, u) {
  sPage(ctx, u);
  ctx.save(); enter(ctx, u, 12, 1, 0.6);
  paperBg(ctx);
  push(ctx, u, 12, 15.5, 0.03);
  kicker(ctx, 'SUNDAY · 8 NOV', 12.2, u);
  const y = s.y + 560;
  ctx.fillStyle = '#5A4632'; ctx.fillRect(0, y + 150, W, 700);
  ctx.fillStyle = '#4A3826'; ctx.fillRect(0, y + 150, W, 22);
  ctx.save(); ctx.translate(cx, y + 40);
  ctx.fillStyle = '#2A2118'; ctx.beginPath(); ctx.moveTo(-380, 110); ctx.lineTo(380, 110); ctx.lineTo(340, -90); ctx.lineTo(-340, -90); ctx.closePath(); ctx.fill();
  ctx.fillStyle = C.gold; rrect(ctx, -320, -70, 640, 150, 10); ctx.fill();
  text(ctx, 'JENSEN HUANG', 0, 8, font(78, 800, UI), C.ink, 'center', 2);
  text(ctx, 'CO-FOUNDER · CEO', 0, 62, font(34, 700, UI), C.ink, 'center', 5);
  ctx.restore();
  words(ctx, 'The CEO', cx, s.y + 300, 120, C.ink, 13.0, u);
  words(ctx, 'admits…', cx, s.y + 430, 120, C.red, 14.4, u);
  ctx.restore();
}
function sMemo(ctx, u) {
  paperBg(ctx, C.paper2);
  const k = springU(u, 15.5, SPRING.snappy);
  ctx.save(); push(ctx, u, 15.5, 21, 0.03);
  ctx.translate(cx, s.y + 620); ctx.rotate(lerp(0.3, 0.03, Math.min(1, k))); ctx.translate(0, (1 - Math.min(1, k)) * 1100);
  const w = 840, h = 900;
  ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fillRect(-w / 2 + 16, -h / 2 + 20, w, h);
  ctx.fillStyle = '#FBF8F1'; ctx.fillRect(-w / 2, -h / 2, w, h);
  text(ctx, 'MEMO', -w / 2 + 60, -h / 2 + 120, font(96, 700, SERIF), C.ink, 'left');
  text(ctx, 'TO: ALL EMPLOYEES', -w / 2 + 60, -h / 2 + 190, font(34, 700, UI), C.grey, 'left', 3);
  ctx.fillStyle = C.ink; ctx.fillRect(-w / 2 + 60, -h / 2 + 220, w - 120, 4);
  typed(ctx, '“I was', -w / 2 + 60, -h / 2 + 360, 92, C.ink, 16.0, u, 0.06);
  typed(ctx, 'unfaithful', -w / 2 + 60, -h / 2 + 490, 120, C.ink, 16.6, u, 0.06, SERIF, 700);
  typed(ctx, 'to my wife.”', -w / 2 + 60, -h / 2 + 600, 92, C.ink, 17.6, u, 0.06);
  const mk = E.outCubic(prog(u, 18.4, 19.2));
  if (mk > 0) { ctx.fillStyle = 'rgba(198,40,40,0.85)'; ctx.fillRect(-w / 2 + 52, -h / 2 + 510, 610 * mk, 14); }
  if (u > 19) words(ctx, '— Jensen Huang, memo to staff', -w / 2 + 60, -h / 2 + 730, 38, C.grey, 19, u, { fam: UI, weight: 600, align: 'left', track: 0, stagger: 0.006 });
  ctx.restore();
}

// ---------------------------------------------------------------- S4 dossier (21..29.5)
function sDossier(ctx, u) {
  if (u < 21.3) sMemo(ctx, u);
  ctx.save(); enter(ctx, u, 21, -1, 0.6);
  fill(ctx, '#2B2A26');
  push(ctx, u, 21, 29.5, 0.04);
  const fx = 80, fy = s.y + 120, fw = W - 230, fh = 1080;
  ctx.fillStyle = '#C9A86A'; rrect(ctx, fx, fy - 50, 300, 80, 14); ctx.fill();
  ctx.fillStyle = '#D8BC80'; rrect(ctx, fx, fy, fw, fh, 16); ctx.fill();
  ctx.fillStyle = '#F4EFE3'; ctx.fillRect(fx + 50, fy + 60, fw - 100, fh - 120);
  text(ctx, 'FILE · U.S. INTELLIGENCE', fx + 90, fy + 150, font(38, 800, UI), C.ink, 'left', 3);
  ctx.fillStyle = C.ink; ctx.fillRect(fx + 90, fy + 175, fw - 180, 3);
  for (let i = 0; i < 6; i++) {
    const a = E.outCubic(prog(u, 22.4 + i * 0.25, 23.2 + i * 0.25)); if (a <= 0) continue;
    const bw = (fw - 180) * (0.55 + 0.4 * hash01(i, 31));
    ctx.fillStyle = C.ink; ctx.fillRect(fx + 90, fy + 230 + i * 62, bw * a, 34);
  }
  words(ctx, 'U.S. intelligence', cx - 40, fy + 690, 78, C.ink, 23.4, u, { stagger: 0.015 });
  words(ctx, 'reportedly believed she was', cx - 40, fy + 770, 46, C.grey, 24.8, u, { fam: UI, weight: 700, track: 0, stagger: 0.01 });
  const k = springU(u, 27.3, SPRING.bouncy);
  if (k > 0) { ctx.save(); ctx.translate(cx - 40, fy + 930); ctx.scale(Math.min(1.1, k), Math.min(1.1, k));
    text(ctx, 'A CHINESE SPY?', 0, 0, font(104, 800, UI), C.red, 'center', 1); ctx.restore(); }
  ctx.restore();
  stamp(ctx, 'REPORTEDLY', cx, s.y + 560, 104, 21.6, u, -0.12);
  if (u > 27.9) stamp(ctx, 'ALLEGED', s.x + 620, s.y + 1150, 52, 27.9, u, 0.1);
}

// ---------------------------------------------------------------- S5 board statement (29.5..37.5)
function lock(ctx, x, y, r, closed, col) {
  ctx.strokeStyle = col; ctx.lineWidth = r * 0.22;
  ctx.beginPath(); ctx.arc(x, y - r * 0.55 - (closed ? 0 : r * 0.35), r * 0.55, Math.PI, 0); ctx.stroke();
  ctx.fillStyle = col; rrect(ctx, x - r, y - r * 0.55, r * 2, r * 1.5, r * 0.25); ctx.fill();
  ctx.fillStyle = C.paper; ctx.beginPath(); ctx.arc(x, y + 0.1 * r, r * 0.2, 0, TAU); ctx.fill();
}
function sBoard(ctx, u) {
  if (u < 29.8) sDossier(ctx, u);
  ctx.save(); enter(ctx, u, 29.5, 1, 0.6);
  paperBg(ctx);
  push(ctx, u, 29.5, 37.5, 0.03);
  kicker(ctx, 'NVIDIA BOARD · 8 NOV', 29.7, u, s.y + 20, C.ink);
  words(ctx, "Nvidia's board says:", s.x + 10, s.y + 220, 84, C.ink, 29.8, u, { align: 'left', stagger: 0.012 });
  if (u > 31.4) text(ctx, '“', s.x - 10, s.y + 420, font(240, 700, SERIF), C.red, 'left');
  const L = [['no reason', 32.0, C.red], ['to believe', 33.0, C.ink], ['secrets were', 34.4, C.ink], ['compromised”', 35.2, C.ink]];
  L.forEach(([w, u0, col], i) => words(ctx, w, s.x + 10, s.y + 470 + i * 150, 126, col, u0, u, { align: 'left', stagger: 0.018 }));
  const lk = springU(u, 35.1, SPRING.bouncy);
  if (lk > 0) { ctx.save(); ctx.translate(s.x + 70, s.y + 1110); ctx.scale(Math.min(1, lk), Math.min(1, lk)); lock(ctx, 0, 0, 60, u > 35.7, C.ink); ctx.restore(); }
  if (u > 30.6) words(ctx, 'Independent investigation opened', s.x + 160, s.y + 1135, 42, C.grey, 30.4, u, { fam: UI, align: 'left', track: 0, stagger: 0.008 });
  ctx.restore();
}

// ---------------------------------------------------------------- S6 second affair (37.5..46)
function sSecond(ctx, u) {
  fill(ctx, C.ink);
  ctx.save(); push(ctx, u, 37.5, 46, 0.04);
  const k = springU(u, 37.4, SPRING.bouncy);
  ctx.save(); ctx.translate(cx, s.y + 560); ctx.rotate(-0.05); const zs = lerp(2.4, 1, Math.min(1, k)); ctx.scale(zs, zs);
  ctx.globalAlpha = Math.min(1, k * 1.4);
  text(ctx, '2ND', 0, 0, font(420, 700, SERIF), C.red, 'center', -8);
  ctx.restore();
  kicker(ctx, 'NEW REPORT · 11 NOV', 37.8, u, s.y + 20, C.red);
  words(ctx, 'ALLEGED AFFAIR', cx, s.y + 740, 104, C.paper, 40.2, u, { fam: UI, weight: 800, track: 0.01, stagger: 0.015 });
  words(ctx, 'with one of his executives', cx, s.y + 850, 56, C.paper2, 42.2, u, { fam: UI, weight: 700, track: 0, stagger: 0.01 });
  const a = E.outCubic(prog(u, 43.4, 44.1));
  if (a > 0) { ctx.globalAlpha = a; ctx.fillStyle = C.paper; ctx.fillRect(cx - 300, s.y + 930, 600 * a, 3);
    text(ctx, 'Reported by The New York Times, 11 Nov', cx, s.y + 1000, font(44, 600, UI), C.paper2, 'center'); ctx.globalAlpha = 1; }
  ctx.restore();
}

// ---------------------------------------------------------------- S7 boardroom (46..59.5)
function chair(ctx, x, y, r, col, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = col; rrect(ctx, -r, -r, r * 2, r * 2, r * 0.4); ctx.fill(); ctx.fillRect(-r, -r * 1.45, r * 2, r * 0.38); ctx.restore(); }
function sRoom(ctx, u) {
  if (u < 46.3) sSecond(ctx, u);
  ctx.save(); enter(ctx, u, 46, -1, 0.6);
  paperBg(ctx);
  const tx = cx, ty = s.y + 700, tw = 300, th = 720;
  const headY = ty - th / 2 - 80;
  // camera: wide (46-52), log-zoom onto the head chair (52-56), back out for STAY/GO (56.2-57)
  const p1 = E.inOutCubic(prog(u, 52, 53.4)), p2 = E.inOutCubic(prog(u, 56.1, 56.9));
  const zp = p1 * (1 - p2), z = 0.95 * (1.7 / 0.95) ** zp, fy = lerp(ty, headY + 40, zp);
  ctx.translate(cx, ty); ctx.scale(z, z); ctx.translate(-cx, -fy);
  ctx.fillStyle = '#6B4F35'; rrect(ctx, tx - tw / 2, ty - th / 2, tw, th, 150); ctx.fill();
  ctx.fillStyle = '#7C5E40'; rrect(ctx, tx - tw / 2 + 18, ty - th / 2 + 18, tw - 36, th - 36, 132); ctx.fill();
  const seats = [];
  for (let i = 0; i < 5; i++) { seats.push([tx - tw / 2 - 70, ty - 250 + i * 125, -Math.PI / 2]); seats.push([tx + tw / 2 + 70, ty - 250 + i * 125, Math.PI / 2]); }
  seats.push([tx, ty + th / 2 + 70, Math.PI]);
  seats.forEach(([x, y, r], i) => { const k = springU(u, 46.6 + i * 0.16, SPRING.bouncy); if (k <= 0) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(Math.min(1.15, k), Math.min(1.15, k)); chair(ctx, 0, 0, 40, C.ink, r); ctx.restore(); });
  const hk = springU(u, 48.8, SPRING.bouncy);
  if (hk > 0) { ctx.save(); ctx.translate(tx, headY); ctx.scale(Math.min(1, hk), Math.min(1, hk));
    chair(ctx, 0, 0, 52, C.red, 0); text(ctx, '?', 0, 26, font(80, 800, UI), '#fff', 'center'); ctx.restore(); }
  if (u > 52.4 && u < 56.2) { const a = springU(u, 52.4, SPRING.snappy);
    ctx.save(); ctx.translate(tx, headY - 140); ctx.scale(Math.min(1, a), Math.min(1, a));
    ctx.fillStyle = C.gold; rrect(ctx, -170, -50, 340, 90, 14); ctx.fill();
    text(ctx, 'SINCE 1993', 0, 14, font(46, 800, UI), C.ink, 'center', 2); ctx.restore(); }
  ctx.restore();
  ctx.save(); enter(ctx, u, 46, -1, 0.6);
  if (u < 52.4) { words(ctx, '11', s.x, s.y + 170, 200, C.red, 47.4, u, { align: 'left' }); words(ctx, 'DIRECTORS', s.x + 250, s.y + 110, 72, C.ink, 48.1, u, { fam: UI, weight: 800, align: 'left', track: 0.02, stagger: 0.012 });
    if (u > 49.2) words(ctx, 'a majority can remove the CEO', s.x + 250, s.y + 172, 40, C.grey, 49.2, u, { fam: UI, weight: 700, align: 'left', track: 0, stagger: 0.006 }); }
  else if (u < 56.3) { ctx.fillStyle = 'rgba(241,235,221,0.9)'; ctx.fillRect(0, s.y + 40, W, 150); words(ctx, 'The co-founder…', cx, s.y + 150, 96, C.ink, 52.5, u, { stagger: 0.012 }); }
  if (u > 56.3) {
    const k = springU(u, 56.4, SPRING.bouncy);
    ctx.save(); ctx.translate(cx, s.y + 1150); ctx.rotate(-0.04); ctx.scale(Math.min(1.06, k), Math.min(1.06, k));
    ctx.fillStyle = C.ink; rrect(ctx, -400, -110, 800, 180, 22); ctx.fill();
    text(ctx, 'STAY', -190, 28, font(104, 800, UI), C.paper, 'center'); text(ctx, 'or', 0, 22, font(60, 600, SERIF), C.gold, 'center');
    text(ctx, 'GO?', 210, 28, font(104, 800, UI), C.red, 'center'); ctx.restore();
    words(ctx, 'Does he keep his job?', cx, s.y + 140, 80, C.ink, 56.6, u, { stagger: 0.01 });
  }
  ctx.restore();
}

// ---------------------------------------------------------------- S8 why it matters (59.5..67)
function chip(ctx, x, y, r, col) {
  ctx.fillStyle = col;
  for (let i = -2; i <= 2; i++) { ctx.fillRect(x + i * r * 0.36 - r * 0.07, y - r * 1.25, r * 0.14, r * 2.5); ctx.fillRect(x - r * 1.25, y + i * r * 0.36 - r * 0.07, r * 2.5, r * 0.14); }
  rrect(ctx, x - r, y - r, r * 2, r * 2, r * 0.18); ctx.fill();
  ctx.fillStyle = C.gold; rrect(ctx, x - r * 0.55, y - r * 0.55, r * 1.1, r * 1.1, r * 0.1); ctx.fill();
}
function sWhy(ctx, u) {
  if (u < 59.8) sRoom(ctx, u);
  ctx.save(); enter(ctx, u, 59.5, 1, 0.6);
  fill(ctx, C.navy);
  push(ctx, u, 59.5, 67, 0.04);
  kicker(ctx, 'WHY IT MATTERS', 59.6, u, s.y + 20, C.red);
  const R = 44, gap = 150;
  for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) {
    const x = s.x + 54 + c * gap, y = s.y + 330 + r * gap;
    const d = Math.hypot(c - 2.5, r - 2.5);
    const k = springU(u, 59.9 + d * 0.3, SPRING.bouncy); if (k <= 0) continue;
    const lit = 0.5 + 0.5 * Math.max(0, Math.sin(u * 2.4 - d * 1.3));
    ctx.save(); ctx.translate(x, y); ctx.scale(Math.min(1, k), Math.min(1, k)); ctx.globalAlpha = 0.45 + 0.4 * lit; chip(ctx, 0, 0, R, '#3A5390'); ctx.restore();
  }
  ctx.fillStyle = 'rgba(14,26,51,0.55)'; ctx.fillRect(0, s.y + 170, W, 130);
  words(ctx, "Nvidia's chips", cx, s.y + 270, 96, C.paper, 60.6, u, { stagger: 0.012 });
  if (u > 62.6) { ctx.fillStyle = 'rgba(14,26,51,0.7)'; ctx.fillRect(0, s.y + 590, W, 90); words(ctx, 'power much of the', cx, s.y + 655, 64, C.paper, 62.6, u, { fam: UI, weight: 700, track: 0, stagger: 0.01 }); }
  const k = springU(u, 65.1, SPRING.bouncy);
  if (k > 0) { ctx.save(); ctx.translate(cx, s.y + 860); ctx.scale(Math.min(1.1, k), Math.min(1.1, k));
    ctx.fillStyle = C.gold; rrect(ctx, -380, -140, 760, 220, 26); ctx.fill();
    text(ctx, 'AI BOOM', 0, 30, font(170, 800, UI), C.navy, 'center', 2); ctx.restore(); }
  if (u > 65.8) { const a = E.outCubic(prog(u, 65.8, 66.4)); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(14,26,51,0.85)'; ctx.fillRect(0, s.y + 1060, W, 120);
    text(ctx, 'Board: no decision announced yet (12 Nov)', cx, s.y + 1110, font(42, 700, UI), C.paper, 'center');
    text(ctx, 'Earnings due 17 Nov', cx, s.y + 1166, font(42, 700, UI), C.gold, 'center'); ctx.globalAlpha = 1; }
  ctx.restore();
}

// ---------------------------------------------------------------- S9 end card (67..72)
function planet(ctx, x, y, r) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.35);
  ctx.strokeStyle = C.gold; ctx.lineWidth = r * 0.12; ctx.beginPath(); ctx.ellipse(0, 0, r * 1.7, r * 0.45, 0, Math.PI, TAU); ctx.stroke();
  const g = ctx.createLinearGradient(-r, -r, r, r); g.addColorStop(0, '#5AA7FF'); g.addColorStop(1, '#2A5FC0');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fill();
  ctx.strokeStyle = '#F07A5A'; ctx.beginPath(); ctx.ellipse(0, 0, r * 1.7, r * 0.45, 0, 0, Math.PI); ctx.stroke();
  ctx.restore();
}
function sEnd(ctx, u) {
  fill(ctx, C.navy);
  for (let i = 0; i < 120; i++) { ctx.fillStyle = `rgba(255,255,255,${0.2 + 0.5 * hash01(i, 41)})`; ctx.fillRect(hash01(i, 42) * W, (hash01(i, 43) * H + u * 6 * hash01(i, 44)) % H, 2.5, 2.5); }
  const k = springU(u, 66.9, SPRING.bouncy);
  ctx.save(); ctx.translate(cx, s.y + 430); ctx.scale(Math.min(1, k), Math.min(1, k)); ctx.rotate(0.05 * Math.sin(u * 1.2)); planet(ctx, 0, 0, 120); ctx.restore();
  words(ctx, 'Whyverse', cx, s.y + 760, 150, C.paper, 67.4, u, { fam: UI, weight: 800, track: -0.01, stagger: 0.02 });
  if (u > 68.2) words(ctx, 'Big questions, visual answers', cx, s.y + 850, 48, C.gold, 68.2, u, { fam: UI, weight: 700, track: 0, stagger: 0.01 });
  const b = springU(u, 68.8, SPRING.bouncy);
  if (b > 0) { ctx.save(); ctx.translate(cx, s.y + 1020); const bs = Math.min(1, b) * (1 + 0.04 * Math.sin(u * 3)); ctx.scale(bs, bs);
    ctx.fillStyle = C.red; rrect(ctx, -230, -62, 460, 112, 56); ctx.fill(); text(ctx, 'FOLLOW', 0, 18, font(58, 800, UI), '#fff', 'center', 4); ctx.restore(); }
}

M.film({
  fonts: [font(100, 700, SERIF), font(40, 800, UI)],
  hits: HITS,
  draw(ctx, u) {
    if (u < 8) sHook(ctx, u);
    else if (u < 12) sPage(ctx, u);
    else if (u < 15.5) sName(ctx, u);
    else if (u < 21) sMemo(ctx, u);
    else if (u < 29.5) sDossier(ctx, u);
    else if (u < 37.5) sBoard(ctx, u);
    else if (u < 46) sSecond(ctx, u);
    else if (u < 59.5) sRoom(ctx, u);
    else if (u < 67) sWhy(ctx, u);
    else sEnd(ctx, u);
  },
  post(ctx, u) {
    for (let i = 0; i < 500; i++) { ctx.fillStyle = `rgba(40,30,20,${0.035 + 0.035 * hash01(i, 9)})`;
      ctx.fillRect(hash01(i, Math.floor(u * 24)) * W, hash01(i + 5, Math.floor(u * 24) + 1) * H, 2, 2); }
    const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.75);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(30,20,10,0.25)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  },
});
