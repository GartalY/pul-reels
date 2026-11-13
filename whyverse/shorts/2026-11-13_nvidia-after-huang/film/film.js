// Nvidia after Huang — Whyverse daily trend Short 2026-11-13. Pure function of time.
// Look: NAVY KINETIC TYPE (gold accent), silhouettes for public figures, word-by-word captions on the voice.
import * as M from './lib/motion.js';
const { W, H, E, prog, lerp, clamp, spring, SPRING, wobble, font, layout, text, fill, rrect, hash01 } = M;

const C = { bg: '#0B1534', panel: '#18295A', ink: '#F4F1EA', dim: '#8C97B8', gold: '#FFC24B', sil: '#03060E', sil2: '#1B2233', shirt: '#C9CFDB' };
const D = 'Display', UI = 'UI';
const sp = (t, t0, cfg = SPRING.bouncy) => (t < t0 ? 0 : spring(t - t0, cfg));
const ease = (t, a, b, f = E.outCubic) => f(prog(t, a, b));
const backE = (p) => E.outBack(p, 1.6);

// ---------------------------------------------------------------- voice timing (vo_timing.json)
let VO = [], CUES = [];
const KEY = /billions|nvidia|thirty|gone|thursday|resigned|immediately|colette|kress|^ai\b|now\.|first|ever|chair|harvey|jones|four|percent|tuesday|earnings|founder|whyverse/i;
function buildCues() {
  CUES = [];
  VO.forEach((L) => {
    let cur = [];
    L.words.forEach((w, i) => {
      cur.push({ w: w[0], a: w[1], b: w[2] });
      const last = i === L.words.length - 1;
      if (last || cur.length >= 4 || (/[.,:?]$/.test(w[0]) && cur.length >= 2)) { CUES.push({ words: cur, line: L.id, end: L.t + L.d }); cur = []; }
    });
  });
  CUES.forEach((c) => { c.a = c.words[0].a - 0.06; });
  CUES.forEach((c, i) => { c.b = i + 1 < CUES.length && CUES[i + 1].line === c.line ? CUES[i + 1].a : c.end + 0.25; });
}
function wt(id, pre, n = 0) {
  const L = VO.find((l) => l.id === id); if (!L) return 0;
  const m = L.words.filter((w) => w[0].toLowerCase().startsWith(pre.toLowerCase()));
  return m.length ? m[Math.min(n, m.length - 1)][1] : L.t;
}
let T = {};

// ---------------------------------------------------------------- drawing kit
function bg(ctx, t) {
  fill(ctx, C.bg);
  ctx.fillStyle = 'rgba(140,151,184,0.16)';
  const g = 72, ox = (t * 18) % g, oy = (t * 30) % g;
  for (let y = -g; y < H + g; y += g) for (let x = -g; x < W + g; x += g) { ctx.beginPath(); ctx.arc(x + ox, y + oy, 2.6, 0, M.TAU); ctx.fill(); }
  const gr = ctx.createRadialGradient(W / 2, H * 0.52, 100, W / 2, H * 0.52, H * 0.75);
  gr.addColorStop(0, 'rgba(40,70,150,0.35)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
}
function ctext(ctx, s, x, y, size, color, w = 800, f = D, track = -0.02) {
  const L = layout(ctx, s, font(size, w, f), track * size);
  text(ctx, s, x - L.width / 2, y, font(size, w, f), color, 'left', track * size);
  return L.width;
}
function popText(ctx, s, x, y, size, color, t0, t, w = 800, f = D) {
  const k = sp(t, t0); if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.globalAlpha *= clamp(k * 2);
  ctext(ctx, s, 0, 0, size, color, w, f); ctx.restore();
}
function stamp(ctx, s, x, y, size, t0, t, rot = -0.12, color = C.gold) {
  const k = sp(t, t0, SPRING.snappy); if (k <= 0) return;
  const sc = lerp(2.2, 1, clamp(k)) * (1 + 0.04 * wobble(t - t0, 3, 6));
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha *= clamp(k * 1.6);
  const f = font(size, 800, D); const L = layout(ctx, s, f, -0.01 * size);
  const pw = L.width + size * 0.7, ph = size * 1.25;
  ctx.fillStyle = 'rgba(11,21,52,0.85)'; rrect(ctx, -pw / 2, -ph / 2, pw, ph, 18); ctx.fill();
  ctx.lineWidth = 9; ctx.strokeStyle = color; ctx.stroke();
  text(ctx, s, -L.width / 2, size * 0.36, f, color, 'left', -0.01 * size);
  ctx.restore();
}
function plate(ctx, s, sub, x, y, t0, t) {
  const k = ease(t, t0, t0 + 0.35, backE); if (k <= 0) return;
  ctx.save(); ctx.translate(x, y + (1 - k) * 40); ctx.globalAlpha *= clamp(k * 1.5);
  const f = font(54, 800, D), fs = font(34, 600, UI); const L = layout(ctx, s, f, -1);
  const pw = Math.max(L.width, sub ? layout(ctx, sub, fs, 1).width : 0) + 70, ph = sub ? 128 : 84;
  ctx.fillStyle = C.gold; rrect(ctx, -pw / 2, 0, pw, ph, 16); ctx.fill();
  text(ctx, s, -L.width / 2, 60, f, C.bg, 'left', -1);
  if (sub) { const l2 = layout(ctx, sub, fs, 1); text(ctx, sub, -l2.width / 2, 106, fs, '#2A2A44', 'left', 1); }
  ctx.restore();
}

// silhouettes: dark figure, recognisable outline only, no facial features
function bust(ctx) {
  ctx.beginPath(); ctx.moveTo(-215, 0); ctx.bezierCurveTo(-215, -150, -160, -200, -62, -214);
  ctx.lineTo(-44, -262); ctx.lineTo(44, -262); ctx.lineTo(62, -214);
  ctx.bezierCurveTo(160, -200, 215, -150, 215, 0); ctx.closePath();
}
function headPath(ctx) { ctx.beginPath(); ctx.ellipse(0, -338, 70, 90, 0, 0, M.TAU); }
function hairPath(ctx, who) {
  ctx.beginPath();
  if (who === 'huang') {
    ctx.moveTo(-74, -350); ctx.bezierCurveTo(-92, -420, -50, -462, 8, -458); ctx.bezierCurveTo(70, -455, 96, -420, 86, -352);
    ctx.bezierCurveTo(80, -380, 60, -400, 20, -404); ctx.bezierCurveTo(-20, -408, -58, -396, -74, -350); ctx.closePath();
  } else if (who === 'kress') {
    ctx.moveTo(-60, -250); ctx.bezierCurveTo(-112, -262, -108, -330, -96, -370); ctx.bezierCurveTo(-82, -440, 82, -440, 96, -370);
    ctx.bezierCurveTo(108, -330, 112, -262, 60, -250); ctx.bezierCurveTo(78, -300, 74, -360, 40, -392); ctx.bezierCurveTo(0, -370, -60, -380, -74, -330);
    ctx.bezierCurveTo(-76, -300, -78, -270, -60, -250); ctx.closePath();
  } else {
    ctx.moveTo(-72, -352); ctx.bezierCurveTo(-80, -420, -40, -440, 0, -440); ctx.bezierCurveTo(40, -440, 80, -420, 72, -352);
    ctx.bezierCurveTo(60, -392, 20, -400, 0, -398); ctx.bezierCurveTo(-20, -400, -60, -392, -72, -352); ctx.closePath();
  }
}
function person(ctx, who, x, y, s, t, alpha = 1, rim = C.gold) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= alpha;
  ctx.scale(1, 1 + 0.006 * Math.sin(t * 2.2));
  ctx.fillStyle = C.sil; ctx.strokeStyle = rim; ctx.lineWidth = 5 / s;
  bust(ctx); ctx.fill(); ctx.stroke(); headPath(ctx); ctx.fill(); ctx.stroke(); hairPath(ctx, who); ctx.fill(); ctx.stroke();
  if (who === 'huang') {
    ctx.fillStyle = C.sil2;
    ctx.beginPath(); ctx.moveTo(-62, -214); ctx.lineTo(-120, -150); ctx.lineTo(-70, -120); ctx.lineTo(-30, -200); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(62, -214); ctx.lineTo(120, -150); ctx.lineTo(70, -120); ctx.lineTo(30, -200); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = '#3A4256'; ctx.lineWidth = 4 / s; ctx.beginPath(); ctx.moveTo(18, -190); ctx.lineTo(10, 0); ctx.stroke();
  } else if (who === 'kress') {
    ctx.fillStyle = '#3B4766'; ctx.beginPath(); ctx.moveTo(-40, -216); ctx.lineTo(0, -120); ctx.lineTo(40, -216); ctx.closePath(); ctx.fill();
    ctx.fillStyle = C.sil2; ctx.beginPath(); ctx.moveTo(-60, -214); ctx.lineTo(-10, -80); ctx.lineTo(-90, -150); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(60, -214); ctx.lineTo(10, -80); ctx.lineTo(90, -150); ctx.closePath(); ctx.fill();
  } else {
    ctx.fillStyle = C.shirt; ctx.beginPath(); ctx.moveTo(-44, -216); ctx.lineTo(0, -90); ctx.lineTo(44, -216); ctx.closePath(); ctx.fill();
    ctx.fillStyle = C.sil; ctx.beginPath(); ctx.moveTo(-12, -206); ctx.lineTo(12, -206); ctx.lineTo(18, -120); ctx.lineTo(0, -96); ctx.lineTo(-18, -120); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}
function ghost(ctx, who, x, y, s, alpha) {
  if (alpha <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= alpha;
  ctx.setLineDash([22, 16]); ctx.strokeStyle = C.dim; ctx.lineWidth = 6 / s;
  bust(ctx); ctx.stroke(); headPath(ctx); ctx.stroke(); hairPath(ctx, who); ctx.stroke(); ctx.restore();
}
function orgBox(ctx, label, x, y, w, h, k, hl = false) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.fillStyle = C.panel; rrect(ctx, -w / 2, -h / 2, w, h, 34); ctx.fill();
  ctx.lineWidth = 5; ctx.strokeStyle = hl ? C.gold : 'rgba(244,241,234,0.25)'; ctx.stroke();
  const f = font(40, 700, UI); const L = layout(ctx, label, f, 3);
  text(ctx, label, -L.width / 2, -h / 2 + 62, f, hl ? C.gold : C.dim, 'left', 3);
  ctx.restore();
}
function chip(ctx, x, y, s, t, k) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); ctx.rotate(0.05 * Math.sin(t * 1.5));
  ctx.strokeStyle = C.gold; ctx.lineWidth = 10; ctx.lineCap = 'round';
  for (let i = 0; i < 6; i++) { const p = -100 + i * 40; [[p, -130, p, -170], [p, 130, p, 170], [-130, p, -170, p], [130, p, 170, p]].forEach(([a, b, c, d]) => { ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke(); }); }
  ctx.fillStyle = '#22336A'; rrect(ctx, -135, -135, 270, 270, 26); ctx.fill(); ctx.lineWidth = 8; ctx.stroke();
  ctx.strokeStyle = 'rgba(255,194,75,0.35)'; ctx.lineWidth = 4; rrect(ctx, -95, -95, 190, 190, 14); ctx.stroke();
  ctext(ctx, 'AI', 0, 38, 110, C.gold);
  ctx.restore();
}
function hourglass(ctx, x, y, s, t, t0) {
  const k = sp(t, t0); if (k <= 0) return;
  const flip = E.inOutCubic(prog(t, t0 + 0.4, t0 + 0.9));
  const sand = flip >= 1 ? clamp((t - t0 - 0.9) / 2.5) : 0;
  ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); ctx.rotate(flip * Math.PI);
  ctx.fillStyle = C.ink; rrect(ctx, -90, -150, 180, 22, 8); ctx.fill(); rrect(ctx, -90, 128, 180, 22, 8); ctx.fill();
  ctx.strokeStyle = C.ink; ctx.lineWidth = 9;
  ctx.beginPath(); ctx.moveTo(-70, -128); ctx.lineTo(70, -128); ctx.lineTo(8, 0); ctx.lineTo(70, 128); ctx.lineTo(-70, 128); ctx.lineTo(-8, 0); ctx.closePath(); ctx.stroke();
  ctx.restore();
  // sand drawn upright (after the flip the full chamber is on top)
  ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); ctx.fillStyle = C.gold;
  const full = flip < 0.5 ? 0 : 1; // before flip: sand at bottom (drawn rotated == top after flip)
  const top = full ? 1 - sand : 0, bot = full ? sand : 1;
  if (flip > 0.02 && flip < 0.98) { ctx.restore(); return; }
  if (top > 0) { const hh = 110 * top; ctx.beginPath(); ctx.moveTo(-60 * top, -10 - hh); ctx.lineTo(60 * top, -10 - hh); ctx.lineTo(0, -6); ctx.closePath(); ctx.fill(); }
  if (bot > 0) { const hh = 100 * bot; ctx.beginPath(); ctx.moveTo(-62, 120); ctx.lineTo(62, 120); ctx.lineTo(62 - 50 * bot, 120 - hh); ctx.lineTo(-62 + 50 * bot, 120 - hh); ctx.closePath(); ctx.fill(); }
  if (full && sand > 0 && sand < 1) ctx.fillRect(-3, -6, 6, 126 - 100 * bot);
  ctx.restore();
}
function calendar(ctx, x, y, s, mon, day, wk, t, t0) {
  const k = sp(t, t0); if (k <= 0) return;
  const fl = E.outCubic(prog(t, t0, t0 + 0.45));
  ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k * lerp(0.2, 1, fl)); ctx.rotate(-0.05 + 0.03 * Math.sin(t * 1.3));
  ctx.fillStyle = C.ink; rrect(ctx, -170, -190, 340, 380, 30); ctx.fill();
  ctx.fillStyle = C.gold; rrect(ctx, -170, -190, 340, 100, 30); ctx.fill(); ctx.fillRect(-170, -120, 340, 30);
  ctext(ctx, mon, 0, -118, 62, C.bg, 800);
  ctext(ctx, day, 0, 80, 190, C.bg, 800);
  ctext(ctx, wk, 0, 150, 46, '#4A5578', 700, UI, 0.06);
  ctx.fillStyle = C.bg; [-100, 100].forEach((rx) => { rrect(ctx, rx - 12, -215, 24, 60, 12); ctx.fill(); });
  ctx.restore();
}
function chart(ctx, x, y, w, h, p, t) {
  ctx.save(); ctx.translate(x, y);
  ctx.strokeStyle = 'rgba(244,241,234,0.12)'; ctx.lineWidth = 3;
  for (let i = 0; i <= 4; i++) { ctx.beginPath(); ctx.moveTo(0, (h * i) / 4); ctx.lineTo(w, (h * i) / 4); ctx.stroke(); }
  const N = 40, pts = [];
  for (let i = 0; i <= N; i++) { const f = i / N; const base = 0.12 + 0.75 * E.inCubic(f); const n = (hash01(i, 7) - 0.5) * 0.16; pts.push([f * w, (base + n) * h]); }
  const m = Math.max(1, Math.floor(clamp(p) * N));
  ctx.beginPath(); pts.slice(0, m + 1).forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)));
  ctx.strokeStyle = C.gold; ctx.lineWidth = 12; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke();
  const [ex, ey] = pts[m]; ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(ex, ey, 18 + 4 * Math.sin(t * 8), 0, M.TAU); ctx.fill();
  ctx.restore();
}
function arrowDown(ctx, x, y, s, k) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * k, s * k); ctx.fillStyle = C.gold;
  ctx.beginPath(); ctx.moveTo(-34, -110); ctx.lineTo(34, -110); ctx.lineTo(34, 10); ctx.lineTo(80, 10); ctx.lineTo(0, 110); ctx.lineTo(-80, 10); ctx.lineTo(-34, 10); ctx.closePath(); ctx.fill(); ctx.restore();
}
function headlines(ctx, t, t0) {
  for (let i = 0; i < 4; i++) {
    const k = sp(t, t0 + i * 0.22, SPRING.gentle); if (k <= 0) continue;
    const side = i % 2 ? 1 : -1;
    ctx.save(); ctx.translate(W / 2 + side * (1 - k) * 900 + side * 40, 1110 + i * 80); ctx.rotate(side * (0.04 + i * 0.015));
    ctx.fillStyle = i === 3 ? C.ink : '#D9D4C7'; rrect(ctx, -330, -60, 660, 150, 14); ctx.fill();
    text(ctx, 'REPORTS', -300, -6, font(40, 800, D), C.bg, 'left', 2);
    ctx.fillStyle = 'rgba(11,21,52,0.35)'; rrect(ctx, -300, 22, 520, 16, 8); ctx.fill(); rrect(ctx, -300, 52, 380, 16, 8); ctx.fill();
    ctx.restore();
  }
}

// ---------------------------------------------------------------- progress counter (top)
const STEPS = ['CEO OUT', 'NEW CEO', 'FIRST CHAIR', 'SHARES DOWN'];
function progress(ctx, t) {
  const on = [T.l2, T.l3, T.l4, T.l5];
  if (t < T.l2 - 0.3 || t > T.l7) return;
  const a = ease(t, T.l2 - 0.3, T.l2) * (1 - ease(t, T.l7 - 0.4, T.l7));
  ctx.save(); ctx.globalAlpha = a;
  const n = on.filter((x) => t >= x - 0.05).length;
  const y = 232, x0 = W / 2 - 210;
  for (let i = 0; i < 4; i++) {
    if (i < 3) { ctx.fillStyle = 'rgba(244,241,234,0.22)'; ctx.fillRect(x0 + i * 140 + 24, y - 3, 92, 6); if (i < n - 1) { ctx.fillStyle = C.gold; ctx.fillRect(x0 + i * 140 + 24, y - 3, 92 * ease(t, on[i + 1] - 0.3, on[i + 1]), 6); } }
    ctx.fillStyle = i < n ? C.gold : 'rgba(244,241,234,0.22)';
    ctx.beginPath(); ctx.arc(x0 + i * 140, y, 16 + (i < n ? 7 * Math.max(0, wobble(t - on[i], 3, 6)) : 0), 0, M.TAU); ctx.fill();
  }
  if (n > 0) ctext(ctx, `${n}/4 · ${STEPS[n - 1]}`, W / 2, y + 66, 38, C.dim, 700, UI, 0.08);
  ctx.restore();
}

// ---------------------------------------------------------------- captions (word by word, top)
function captions(ctx, t) {
  const c = CUES.find((q) => t >= q.a && t < q.b); if (!c) return;
  const size = 90, f = font(size, 800, D), y0 = 520, maxW = W - 150;
  const ws = c.words.map((w) => ({ ...w, s: w.w.toUpperCase(), L: layout(ctx, w.w.toUpperCase(), f, -1).width + size * 0.34 }));
  const rows = [[]]; let rw = 0;
  ws.forEach((w) => { if (rw + w.L > maxW && rows[rows.length - 1].length) { rows.push([]); rw = 0; } rows[rows.length - 1].push(w); rw += w.L; });
  rows.forEach((r, ri) => {
    const tw = r.reduce((s, w) => s + w.L, 0); let x = (W - tw) / 2; const y = y0 + ri * size * 1.08 - (rows.length - 1) * size * 0.54;
    r.forEach((w) => {
      const k = sp(t, w.a - 0.06, SPRING.snappy);
      if (k > 0) {
        const key = KEY.test(w.w); const said = t >= w.a && t < w.b + 0.1;
        ctx.save(); ctx.translate(x + w.L / 2, y); const sc = k * (said ? 1.03 : 1); ctx.scale(sc, sc); ctx.globalAlpha = clamp(k * 2);
        const lw = layout(ctx, w.s, f, -1).width;
        ctx.lineWidth = 14; ctx.strokeStyle = C.bg; ctx.lineJoin = 'round'; ctx.font = f; ctx.strokeText(w.s, -lw / 2 - 0, 0);
        text(ctx, w.s, -lw / 2, 0, f, key ? C.gold : C.ink, 'left', -1); ctx.restore();
      }
      x += w.L;
    });
  });
}

// ---------------------------------------------------------------- scenes (stage = y 600..1490)
function sHook(ctx, t) {
  const p = ease(t, -0.2, 3.0, E.inOutCubic);
  chart(ctx, 120, 590, 840, 290, 0.15 + 0.85 * p, t);
  const k1 = sp(t, -0.6), k2 = sp(t, -0.5), z = 1 + 0.03 * t / 3;
  ctx.save(); ctx.translate(W / 2, 1010); ctx.scale(z, z);
  ctx.save(); ctx.scale(k1, k1); ctext(ctx, 'HUNDREDS OF', 0, -60, 104, C.ink); ctx.restore();
  ctx.save(); ctx.scale(k2, k2); ctext(ctx, 'BILLIONS $', 0, 115, 150, C.gold); ctx.restore();
  ctx.restore();
  popText(ctx, 'WIPED OFF NVIDIA', W / 2, 1300, 66, C.ink, -0.45, t, 800);
}
function sGone(ctx, t) {
  const t33 = wt('l1', 'thirty'), tg = wt('l1', 'gone');
  const k = sp(t, T.cut1, SPRING.gentle);
  const yr = Math.round(lerp(1993, 2026, ease(t, t33 - 0.2, t33 + 0.9, E.inOutCubic)));
  popText(ctx, `${yr}`, W / 2, 770, 130, C.ink, T.cut1, t);
  popText(ctx, '33 YEARS AS CEO', W / 2, 850, 52, C.gold, t33, t, 700, UI);
  const out = ease(t, tg, tg + 0.5, E.inCubic);
  ghost(ctx, 'huang', W / 2, 1450, 1.0, clamp((t - tg) * 3));
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, 1452); ctx.clip();
  person(ctx, 'huang', W / 2, 1450 + out * 720, lerp(0.85, 1, k), t);
  ctx.restore();
  plate(ctx, 'JENSEN HUANG', 'CO-FOUNDER · CEO SINCE 1993', W / 2, 1470, T.cut1 + 0.3, t);
  stamp(ctx, 'GONE', W / 2, 1180, 150, tg, t);
}
function sOut(ctx, t) {
  const tR = wt('l2', 'resigned'), tE = wt('l2', 'effective'), tW = wt('l2', 'week');
  const fade = 1 - ease(t, tW - 0.2, tW + 0.3);
  ctx.save(); ctx.globalAlpha = fade;
  calendar(ctx, W / 2 - 230, 900, 0.95, 'NOV', '12', 'THURSDAY', t, T.l2 - 0.1);
  orgBox(ctx, 'CEO', W / 2 + 230, 900, 360, 430, sp(t, T.l2 + 0.15));
  if (t > T.l2 + 0.2) ghost(ctx, 'huang', W / 2 + 230, 1105, 0.55, 0.9);
  stamp(ctx, 'RESIGNED', W / 2, 1240, 104, tR, t, -0.08);
  if (t > tE) {
    const full = 'EFFECTIVE IMMEDIATELY', fu = font(54, 700, UI), n = Math.floor(clamp((t - tE) / 0.7) * full.length);
    const s = full.slice(0, n), w = layout(ctx, full, fu, 3).width;
    text(ctx, s, W / 2 - w / 2, 1400, fu, C.ink, 'left', 3);
    if (n < full.length) { ctx.fillStyle = C.gold; ctx.fillRect(W / 2 - w / 2 + layout(ctx, s, fu, 3).width + 6, 1355, 6, 54); }
  }
  ctx.restore();
  if (t > tW - 0.3) {
    headlines(ctx, t, tW - 0.1);
    popText(ctx, '1 WEEK', W / 2, 900, 160, C.gold, tW, t);
    popText(ctx, 'OF REPORTS ON HIS PRIVATE LIFE', W / 2, 990, 44, C.ink, tW + 0.3, t, 700, UI);
  }
}
function sKress(ctx, t) {
  const tC = wt('l3', 'colette'), tX = wt('l3', 'chipmaker'), tN = wt('l3', 'for');
  const shift = ease(t, tX - 0.2, tX + 0.4, E.inOutCubic);
  const bx = W / 2 - 200 * shift;
  orgBox(ctx, 'CEO', bx, 990, 460, 560, sp(t, T.l3 - 0.15));
  const pk = sp(t, tC - 0.1);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 700, W, 568); ctx.clip();
  if (pk > 0) person(ctx, 'kress', bx, 1268 + (1 - clamp(pk)) * 300, 0.8, t, clamp(pk * 2));
  else ghost(ctx, 'huang', bx, 1268, 0.8, 0.8);
  ctx.restore();
  plate(ctx, 'COLETTE KRESS', 'INTERIM CEO · STILL CFO', bx, 1300, tC + 0.25, t);
  chip(ctx, W / 2 + 270, 880, 0.75, t, sp(t, tX));
  if (t > tX) popText(ctx, 'AI CHIPS', W / 2 + 270, 1090, 50, C.gold, tX + 0.2, t, 700, UI);
  hourglass(ctx, W / 2 + 270, 1280, 0.5, t, tN - 0.25);
  if (t > tN) popText(ctx, 'FOR NOW', W / 2 + 270, 1420, 50, C.ink, tN + 0.1, t, 700, UI);
}
function sChair(ctx, t) {
  const tF = wt('l4', 'first'), tC = wt('l4', 'chair'), tH = wt('l4', 'harvey');
  orgBox(ctx, 'CEO', W / 2, 1320, 300, 300, 1);
  ctx.save(); ctx.beginPath(); ctx.rect(0, 1180, W, 288); ctx.clip(); person(ctx, 'kress', W / 2, 1468, 0.42, t); ctx.restore();
  const dk = sp(t, tF - 0.15, SPRING.bouncy);
  ctx.save(); ctx.translate(0, (1 - dk) * -600);
  if (dk > 0) {
    ctx.strokeStyle = C.gold; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(W / 2, 1100); ctx.lineTo(W / 2, 1170); ctx.stroke();
    orgBox(ctx, 'CHAIR OF THE BOARD', W / 2, 870, 640, 460, 1, true);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 700, W, 398); ctx.clip(); person(ctx, 'jones', W / 2, 1098, 0.62, t); ctx.restore();
  }
  ctx.restore();
  plate(ctx, 'HARVEY JONES', 'ON THE BOARD SINCE 1993', W / 2, 1010, tH + 0.2, t);
  stamp(ctx, 'FIRST EVER', W / 2 + 200, 610, 64, tF + 0.25, t, 0.1);
  if (t > T.l4 + 0.1) { const c = t >= tF + 0.2 ? 1 : 0; popText(ctx, `BOARD CHAIRS IN 33 YEARS: ${c}`, W / 2, 1540, 44, c ? C.gold : C.dim, T.l4 + 0.1, t, 700, UI); }
}
function sShares(ctx, t) {
  const tF = wt('l5', 'four');
  const p = ease(t, T.l5 - 0.1, T.l5 + 1.4, E.inOutCubic);
  chart(ctx, 120, 680, 840, 420, p, t);
  arrowDown(ctx, W / 2 - 330, 1290, 0.9, sp(t, T.l5 + 0.2));
  popText(ctx, 'MORE THAN', W / 2 + 80, 1190, 56, C.ink, T.l5 + 0.1, t, 700, UI);
  popText(ctx, '−4%', W / 2 + 80, 1370, 210, C.gold, tF, t);
  popText(ctx, 'NVIDIA SHARES · THURSDAY', W / 2, 1490, 40, C.dim, tF + 0.3, t, 700, UI);
}
function sTest(ctx, t) {
  const tE = wt('l6', 'earnings'), tC = wt('l6', 'can'), tF = wt('l6', 'founder');
  const q = ease(t, tC - 0.2, tC + 0.4, E.inOutCubic);
  if (q < 1) {
    ctx.save(); ctx.globalAlpha = 1 - q;
    calendar(ctx, W / 2, 930, 1.05, 'NOV', '17', 'TUESDAY', t, T.l6 - 0.1);
    popText(ctx, 'EARNINGS DAY', W / 2, 1290, 74, C.gold, tE, t);
    ctx.restore();
  }
  if (q > 0) {
    chip(ctx, W / 2 + 210, 1050, 0.8, t, q);
    ghost(ctx, 'huang', W / 2 - 200, 1330, 0.9, q * 0.9);
    const k = sp(t, tF - 0.2);
    if (k > 0) { ctx.save(); ctx.translate(W / 2 - 200, 960); ctx.scale(k, k); ctx.rotate(0.12 * wobble(t - tF, 2, 3)); ctext(ctx, '?', 0, 110, 300, C.gold); ctx.restore(); }
    popText(ctx, 'WITHOUT ITS FOUNDER?', W / 2, 1460, 64, C.ink, tF - 0.1, t);
  }
}
function planet(ctx, x, y, r, t) {
  if (r <= 1) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.35);
  ctx.strokeStyle = C.gold; ctx.lineWidth = 10;
  ctx.beginPath(); ctx.ellipse(0, 0, r * 1.7, r * 0.42, 0, Math.PI, M.TAU); ctx.stroke();
  const g = ctx.createLinearGradient(-r, -r, r, r); g.addColorStop(0, '#5BA8FF'); g.addColorStop(1, '#2546B8');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, M.TAU); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.beginPath(); ctx.ellipse(-r * 0.2, -r * 0.1 + Math.sin(t) * 4, r * 0.75, r * 0.14, 0, 0, M.TAU); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, 0, r * 1.7, r * 0.42, 0, 0, Math.PI); ctx.stroke();
  ctx.restore();
}
function sEnd(ctx, t) {
  const t0 = T.l7, tL = wt('l7', 'like'), tF = wt('l7', 'follow');
  planet(ctx, W / 2, 860 + 8 * Math.sin(t * 1.4), 150 * sp(t, t0 - 0.2), t);
  popText(ctx, 'WHYVERSE', W / 2, 1150, 130, C.ink, t0, t);
  const btn = (label, x, ta, filled) => {
    const b = sp(t, ta - 0.1); if (b <= 0) return;
    const press = 1 - 0.08 * Math.max(0, wobble(t - ta - 0.35, 2.5, 5));
    ctx.save(); ctx.translate(x, 1340); ctx.scale(b * press, b * press);
    ctx.fillStyle = filled ? C.gold : C.bg; ctx.strokeStyle = C.gold; ctx.lineWidth = 7;
    rrect(ctx, -190, -62, 380, 124, 62); ctx.fill(); ctx.stroke();
    ctext(ctx, label, 0, 26, 70, filled ? C.bg : C.gold); ctx.restore();
    const r = clamp((t - ta - 0.3) / 0.5); if (r > 0 && r < 1) { ctx.strokeStyle = `rgba(255,194,75,${1 - r})`; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x + 90, 1360, 30 + r * 90, 0, M.TAU); ctx.stroke(); }
  };
  btn('LIKE', W / 2 - 210, tL, true); btn('FOLLOW', W / 2 + 210, tF, false);
  popText(ctx, 'A NEW "WHY" EVERY DAY', W / 2, 1500, 44, C.dim, tF + 0.4, t, 700, UI);
}

const SC = [];
function stage(ctx, t) {
  let i = 0; while (i + 1 < SC.length && t >= SC[i + 1][0] - 0.18) i++;
  const [tc, f] = SC[i];
  const p = E.inOutCubic(prog(t, tc - 0.18, tc + 0.16));
  if (i > 0 && p < 1) {
    ctx.save(); ctx.translate(-W * p, 0); SC[i - 1][1](ctx, t); ctx.restore();
    ctx.save(); ctx.translate(W * (1 - p), 0); f(ctx, t); ctx.restore();
  } else f(ctx, t);
}

const HITS = [];
M.film({
  fonts: [font(100, 800, D), font(40, 700, UI)],
  hits: HITS,
  samples: 8,
  async init() {
    VO = await fetch('vo_timing.json').then((r) => r.json());
    buildCues();
    VO.forEach((l) => (T[l.id] = l.t));
    T.cut1 = wt('l1', 'and') - 0.1;
    SC.push([0, sHook], [T.cut1, sGone], [T.l2, sOut], [T.l3, sKress], [T.l4, sChair], [T.l5, sShares], [T.l6, sTest], [T.l7, sEnd]);
    const b = (s) => s / M.GRID.period;
    const add = (s, n, o) => HITS.push([+b(s).toFixed(3), n, ...o]);
    SC.slice(1).forEach(([tc], i) => add(tc, 'cut ' + i, ['whoosh', { len: 0.35, from: 500, to: 2200 }]));
    [[wt('l1', 'gone'), 'gone stamp'], [wt('l2', 'resigned'), 'resigned'], [wt('l4', 'first'), 'first ever'], [wt('l5', 'four'), '-4%']].forEach(([s, n]) => add(s, n, ['pop', { pitch: 'E4' }]));
    [[wt('l3', 'colette'), 'kress in'], [wt('l4', 'harvey'), 'jones in'], [wt('l7', 'like') + 0.35, 'like'], [wt('l7', 'follow') + 0.35, 'follow']].forEach(([s, n]) => add(s, n, ['blip', { pitch: 'A5' }]));
    [T.l2, T.l3, T.l4, T.l5].forEach((s, i) => add(s + 0.02, 'step ' + (i + 1), ['tick']));
    add(wt('l2', 'effective'), 'typing', ['type', { n: 10, len: 0.7 }]);
    add(wt('l6', 'earnings'), 'earnings', ['bell', { pitch: 'E6' }]);
    add(T.l7 + 0.05, 'end card', ['bell', { pitch: 'A5' }]);
    HITS.sort((a, c) => a[0] - c[0]);
    window.HITS = HITS;
  },
  draw(ctx, u, t) {
    bg(ctx, t);
    ctx.save(); M.zoomAbout(ctx, 1 + 0.012 * Math.sin(t * 0.7), W / 2, H * 0.55);
    stage(ctx, t);
    ctx.restore();
    progress(ctx, t);
    captions(ctx, t);
  },
});
