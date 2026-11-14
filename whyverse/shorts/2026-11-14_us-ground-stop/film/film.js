// America's ground stop — Whyverse daily trend Short 2026-11-14. Pure function of time.
// Look: BLUEPRINT (blueprint-blue grid, white technical line art, yellow tags, digits in boxes, spec box).
import * as M from './lib/motion.js';
const { W, H, E, prog, lerp, clamp, spring, SPRING, wobble, font, layout, text, fill, rrect, hash01 } = M;

const C = { bg: '#0F3E7A', bg2: '#0A2F60', line: 'rgba(214,232,255,0.13)', line2: 'rgba(214,232,255,0.26)', ink: '#F2F7FF', dim: '#9DB9DE', y: '#FFD23F', red: '#FF6B57', tag: '#0A2F60' };
const D = 'Display', UI = 'UI';
const sp = (t, t0, cfg = SPRING.bouncy) => (t < t0 ? 0 : spring(t - t0, cfg));
const ease = (t, a, b, f = E.outCubic) => f(prog(t, a, b));
const backE = (p) => E.outBack(p, 1.6);

// ---------------------------------------------------------------- voice timing
let VO = [], CUES = [];
const KEY = /3,500|stop|faa|grounded|every|storm|hackers|phone|routers|overloaded|four|hours|nothing|thousands|cancelled|delayed|twice|9\/11|2023|wires|whyverse/i;
const SHOW = { 'thirty-five': '3,500', 'nine': '9/11', 'twenty': '2023' };
const DROP = /^(hundred|eleven,|twenty-three)$/;
function buildCues() {
  CUES = [];
  VO.forEach((L) => {
    let cur = [];
    const ws = [];
    L.words.forEach((w) => {
      if (DROP.test(w[0]) && ws.length) { const p = ws[ws.length - 1]; p.b = w[2]; if (/,$/.test(w[0])) p.w += ','; return; }
      ws.push({ w: SHOW[w[0]] || w[0], a: w[1], b: w[2] });
    });
    ws.forEach((w, i) => {
      cur.push(w);
      const last = i === ws.length - 1;
      if (last || cur.length >= 3 || (/[.,:?]$/.test(w.w) && cur.length >= 2)) { CUES.push({ words: cur, line: L.id, end: L.t + L.d }); cur = []; }
    });
  });
  CUES.forEach((c) => { c.a = c.words[0].a - 0.06; });
  CUES.forEach((c, i) => { c.b = i + 1 < CUES.length && CUES[i + 1].line === c.line ? CUES[i + 1].a : c.end + 0.2; });
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
  const g = 60, oy = (t * 14) % g, ox = (t * 6) % g;
  ctx.lineWidth = 2; ctx.strokeStyle = C.line;
  ctx.beginPath();
  for (let x = -g + ox; x < W + g; x += g) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
  for (let y = -g + oy; y < H + g; y += g) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
  ctx.stroke();
  ctx.lineWidth = 3; ctx.strokeStyle = C.line2; ctx.beginPath();
  const G5 = g * 5, ox5 = (t * 6) % G5, oy5 = (t * 14) % G5;
  for (let x = -G5 + ox5; x < W + G5; x += G5) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
  for (let y = -G5 + oy5; y < H + G5; y += G5) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
  ctx.stroke();
  const gr = ctx.createRadialGradient(W / 2, H * 0.5, 200, W / 2, H * 0.5, H * 0.8);
  gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, 'rgba(3,18,45,0.55)');
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
// highlighter tag
function tag(ctx, s, x, y, size, t0, t, rot = -0.03, bgc = C.y, fg = C.tag) {
  const k = ease(t, t0, t0 + 0.32, backE); if (k <= 0) return;
  const f = font(size, 800, D); const L = layout(ctx, s, f, 0.02 * size);
  const pw = L.width + size * 0.8, ph = size * 1.35;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.fillStyle = bgc; ctx.beginPath(); ctx.rect(-pw / 2, -ph / 2, pw, ph); ctx.fill();
  text(ctx, s, -L.width / 2, size * 0.36, f, fg, 'left', 0.02 * size);
  ctx.restore();
}
function stamp(ctx, s, x, y, size, t0, t, rot = -0.12, color = C.red) {
  const k = sp(t, t0, SPRING.snappy); if (k <= 0) return;
  const sc = lerp(2.2, 1, clamp(k)) * (1 + 0.04 * wobble(t - t0, 3, 6));
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha *= clamp(k * 1.6);
  const f = font(size, 800, D); const L = layout(ctx, s, f, 0.02 * size);
  const pw = L.width + size * 0.7, ph = size * 1.25;
  ctx.fillStyle = 'rgba(10,47,96,0.92)'; rrect(ctx, -pw / 2, -ph / 2, pw, ph, 12); ctx.fill();
  ctx.lineWidth = 10; ctx.strokeStyle = color; ctx.stroke();
  text(ctx, s, -L.width / 2, size * 0.36, f, color, 'left', 0.02 * size);
  ctx.restore();
}
// digits in boxes (blueprint counter)
function digitBoxes(ctx, s, x, y, size, t0, t, color = C.y) {
  const f = font(size, 800, D); const bw = size * 0.78, bh = size * 1.18, gap = size * 0.12;
  const wOf = (ch) => (ch === ',' ? bw * 0.45 : bw);
  const tw = [...s].reduce((a, ch) => a + wOf(ch) + gap, -gap); let cx = x - tw / 2;
  for (let i = 0; i < s.length; i++) {
    const k = sp(t, t0 + i * 0.06, SPRING.snappy); const ch = s[i]; const cw = wOf(ch);
    if (k > 0) {
      ctx.save(); ctx.translate(cx + cw / 2, y); ctx.scale(1, clamp(k, 0, 1.3));
      if (ch !== ',') { ctx.fillStyle = 'rgba(10,47,96,0.85)'; ctx.fillRect(-bw / 2, -bh / 2, bw, bh); ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.strokeRect(-bw / 2, -bh / 2, bw, bh); }
      const L = layout(ctx, ch, f, 0); text(ctx, ch, -L.width / 2, size * 0.36, f, color, 'left', 0);
      ctx.restore();
    }
    cx += cw + gap;
  }
}
// dimension line with end ticks
function dimLine(ctx, x0, x1, y, label, k) {
  if (k <= 0) return;
  const xe = lerp(x0, x1, k);
  ctx.strokeStyle = C.dim; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(xe, y);
  ctx.moveTo(x0, y - 18); ctx.lineTo(x0, y + 18); if (k >= 1) { ctx.moveTo(x1, y - 18); ctx.lineTo(x1, y + 18); } ctx.stroke();
  if (k > 0.6) { ctx.save(); ctx.globalAlpha *= clamp((k - 0.6) * 3); ctext(ctx, label, (x0 + x1) / 2, y - 22, 32, C.dim, 600, UI, 0.08); ctx.restore(); }
}

// plane, top view, nose up (~100 px long at s=1)
function plane(ctx, x, y, s, rot, color = C.ink, filled = false) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.beginPath();
  ctx.moveTo(0, -50); ctx.bezierCurveTo(6, -46, 7, -36, 7, -26);
  ctx.lineTo(7, -10); ctx.lineTo(48, 8); ctx.lineTo(48, 16); ctx.lineTo(7, 8);
  ctx.lineTo(6, 32); ctx.lineTo(20, 42); ctx.lineTo(20, 48); ctx.lineTo(0, 44);
  ctx.lineTo(-20, 48); ctx.lineTo(-20, 42); ctx.lineTo(-6, 32);
  ctx.lineTo(-7, 8); ctx.lineTo(-48, 16); ctx.lineTo(-48, 8); ctx.lineTo(-7, -10);
  ctx.lineTo(-7, -26); ctx.bezierCurveTo(-7, -36, -6, -46, 0, -50); ctx.closePath();
  if (filled) { ctx.fillStyle = color; ctx.fill(); } else { ctx.fillStyle = 'rgba(10,47,96,0.9)'; ctx.fill(); ctx.strokeStyle = color; ctx.lineWidth = 5 / s; ctx.lineJoin = 'round'; ctx.stroke(); }
  ctx.restore();
}
// rough outline of the contiguous US (lon, lat)
const USA = [[-124.7, 48.4], [-124.1, 46.2], [-124.4, 42.8], [-124.2, 40.4], [-122.5, 37.8], [-120.6, 34.6], [-117.1, 32.5], [-114.7, 32.7], [-111, 31.3], [-108.2, 31.3], [-106.5, 31.8], [-104.5, 29.6], [-103, 29], [-101.4, 29.8], [-99.5, 27.5], [-97.2, 25.9], [-97.4, 27.8], [-94.7, 29.4], [-90, 29.1], [-89.4, 30.2], [-86, 30.3], [-84.3, 29.9], [-83, 29], [-82.6, 27.5], [-81.8, 26.1], [-80.4, 25.2], [-80, 26.8], [-80.6, 28.5], [-81.4, 30.7], [-80.9, 32.1], [-79, 33.6], [-77, 34.6], [-75.5, 35.6], [-76.3, 37], [-75.0, 38.6], [-74, 40.5], [-72, 41], [-70, 41.6], [-70.6, 42.6], [-70.0, 43.8], [-67, 44.8], [-67.8, 47.1], [-69.2, 47.4], [-71.5, 45], [-75, 45], [-76.5, 44], [-79, 43.3], [-79.2, 42.8], [-82.5, 41.7], [-83.2, 42.2], [-82.5, 43], [-82.4, 45.3], [-84.7, 45.9], [-88, 48.2], [-89.6, 48.0], [-95.2, 49], [-123, 49]];
function usaPath(ctx, cx, cy, k) {
  ctx.beginPath();
  USA.forEach(([lo, la], i) => { const x = cx + (lo + 96) * k, y = cy - (la - 38) * k * 1.25; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
  ctx.closePath();
}
const mapXY = (cx, cy, k, lo, la) => [cx + (lo + 96) * k, cy - (la - 38) * k * 1.25];
const PL = [];
for (let i = 0; i < 400 && PL.length < 46; i++) {
  const lo = lerp(-121, -72, hash01(i, 3)), la = lerp(30.5, 47, hash01(i, 9));
  if (la > 45 && lo > -96 && lo < -75) continue; if (la < 32 && (lo < -100 || lo > -83)) continue; if (lo > -76 && la < 40) continue; if (lo > -74 && la > 44) continue;
  PL.push([lo, la, hash01(i, 21) * M.TAU]);
}
function usaMap(ctx, cx, cy, k, t, frozen = -1) {
  usaPath(ctx, cx, cy, k); ctx.fillStyle = 'rgba(10,47,96,0.6)'; ctx.fill();
  ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.stroke();
  const tm = frozen >= 0 ? Math.min(t, frozen) : t;
  const fz = frozen >= 0 && t > frozen;
  PL.forEach(([lo, la, hd], i) => {
    const d = (tm + 2) * 0.5;
    const [x, y] = mapXY(cx, cy, k, lo + Math.sin(hd) * d * 0.5, la + Math.cos(hd) * d * 0.35);
    const [x0, y0] = mapXY(cx, cy, k, lo + Math.sin(hd) * (d - 1.6) * 0.5, la + Math.cos(hd) * (d - 1.6) * 0.35);
    ctx.save(); ctx.setLineDash([6, 10]); ctx.strokeStyle = fz ? 'rgba(255,210,63,0.5)' : 'rgba(242,247,255,0.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x, y); ctx.stroke(); ctx.restore();
    plane(ctx, x, y, 0.32, hd, fz ? C.y : C.ink, true);
  });
}
function cloud(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-110, 40); ctx.lineTo(100, 40); ctx.arc(100, 0, 40, Math.PI / 2, -Math.PI / 2, true);
  ctx.arc(40, -40, 62, 0, -Math.PI, true); ctx.arc(-60, -10, 50, -Math.PI / 4, Math.PI / 2, true); ctx.closePath();
  ctx.fillStyle = 'rgba(10,47,96,0.9)'; ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 7; ctx.lineJoin = 'round'; ctx.stroke();
  ctx.fillStyle = C.y; ctx.beginPath(); ctx.moveTo(10, 50); ctx.lineTo(-20, 110); ctx.lineTo(4, 110); ctx.lineTo(-14, 160); ctx.lineTo(36, 92); ctx.lineTo(12, 92); ctx.lineTo(30, 50); ctx.closePath(); ctx.fill();
  ctx.restore();
}
function laptop(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.strokeStyle = C.ink; ctx.lineWidth = 7; ctx.lineJoin = 'round'; ctx.fillStyle = 'rgba(10,47,96,0.9)';
  rrect(ctx, -110, -110, 220, 150, 12); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-140, 40); ctx.lineTo(140, 40); ctx.lineTo(160, 70); ctx.lineTo(-160, 70); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctext(ctx, '</>', 0, -12, 74, C.y, 800, D, 0);
  ctx.restore();
}
function cross(ctx, x, y, r, k) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.strokeStyle = C.red; ctx.lineWidth = 18; ctx.lineCap = 'round';
  const a = clamp(k * 2), b = clamp(k * 2 - 1);
  ctx.beginPath(); ctx.moveTo(-r, -r); ctx.lineTo(-r + 2 * r * a, -r + 2 * r * a); ctx.stroke();
  if (b > 0) { ctx.beginPath(); ctx.moveTo(r, -r); ctx.lineTo(r - 2 * r * b, -r + 2 * r * b); ctx.stroke(); }
  ctx.restore();
}
function tower(ctx, x, y, s) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.lineJoin = 'round'; ctx.fillStyle = 'rgba(10,47,96,0.9)';
  ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(-26, -220); ctx.lineTo(26, -220); ctx.lineTo(40, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-80, -220); ctx.lineTo(80, -220); ctx.lineTo(64, -290); ctx.lineTo(-64, -290); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = C.y; ctx.lineWidth = 5; for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 26, -230); ctx.lineTo(i * 24, -280); ctx.stroke(); }
  ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(-70, -290); ctx.lineTo(-50, -320); ctx.lineTo(50, -320); ctx.lineTo(70, -290); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0, -320); ctx.lineTo(0, -360); ctx.stroke();
  ctx.restore();
  ctext(ctx, 'CONTROL', x, y + 50, 30, C.dim, 700, UI, 0.08);
}
function radar(ctx, x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.fillStyle = 'rgba(10,47,96,0.9)';
  ctx.beginPath(); ctx.moveTo(-50, 0); ctx.lineTo(0, -90); ctx.lineTo(50, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.save(); ctx.translate(0, -100); ctx.scale(Math.cos(t * 2.4), 1);
  ctx.beginPath(); ctx.ellipse(0, -40, 110, 60, 0, 0, Math.PI); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
  ctx.restore();
  ctext(ctx, 'RADAR', x, y + 50, 30, C.dim, 700, UI, 0.08);
}
function router(ctx, s, t, load) {
  const jit = load > 0.85 ? Math.sin(t * 70) * 4 : 0;
  ctx.save(); ctx.translate(jit, 0); ctx.scale(s, s); ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.fillStyle = 'rgba(10,47,96,0.95)';
  rrect(ctx, -170, -70, 340, 140, 14); ctx.fill(); ctx.stroke();
  [-90, 90].forEach((ax) => { ctx.beginPath(); ctx.moveTo(ax, -70); ctx.lineTo(ax + (ax < 0 ? -20 : 20), -150); ctx.stroke(); });
  for (let i = 0; i < 6; i++) { const on = Math.sin(t * (9 + i * 3) + i) > 0; ctx.fillStyle = load > 0.85 ? (on ? C.red : '#5A2A2A') : (on ? C.y : '#4B6A93'); ctx.beginPath(); ctx.arc(-120 + i * 48, 26, 13, 0, M.TAU); ctx.fill(); }
  text(ctx, 'ROUTER', -64, -12, font(32, 700, UI), C.dim, 'left', 4);
  ctx.restore();
}
function clockFace(ctx, r, sweep) {
  const a1 = sweep * M.TAU * (4.3 / 12);
  ctx.fillStyle = 'rgba(10,47,96,0.92)'; ctx.beginPath(); ctx.arc(0, 0, r, 0, M.TAU); ctx.fill();
  ctx.fillStyle = 'rgba(255,210,63,0.85)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r - 14, -Math.PI / 2, -Math.PI / 2 + a1); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = C.ink; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, r, 0, M.TAU); ctx.stroke();
  for (let i = 0; i < 12; i++) { const a = (i / 12) * M.TAU; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(Math.sin(a) * (r - 8), -Math.cos(a) * (r - 8)); ctx.lineTo(Math.sin(a) * (r - 30), -Math.cos(a) * (r - 30)); ctx.stroke(); }
  const am = sweep * M.TAU * 4.3;
  ctx.lineCap = 'round'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.sin(a1) * r * 0.5, -Math.cos(a1) * r * 0.5); ctx.stroke();
  ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.sin(am) * r * 0.78, -Math.cos(am) * r * 0.78); ctx.stroke();
  ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(0, 0, 14, 0, M.TAU); ctx.fill();
}

// ---------------------------------------------------------------- spec box (progress counter, top)
const STEPS = ['WHAT HAPPENED', 'WHY', 'HOW BAD', 'HOW RARE'];
function progress(ctx, t) {
  const on = [T.l2, T.l3, T.l4, T.l5];
  if (t < T.l2 - 0.3 || t > T.l7 - 0.2) return;
  const a = ease(t, T.l2 - 0.3, T.l2) * (1 - ease(t, T.l7 - 0.6, T.l7 - 0.2));
  const n = on.filter((x) => t >= x - 0.05).length;
  ctx.save(); ctx.globalAlpha = a;
  const y = 250, x0 = W / 2 - 300, bw = 135;
  for (let i = 0; i < 4; i++) {
    const x = x0 + i * 150;
    ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.strokeRect(x, y - 44, bw, 44);
    if (i < n) { const f = i === n - 1 ? ease(t, on[i] - 0.05, on[i] + 0.35) : 1; ctx.fillStyle = C.y; ctx.fillRect(x + 6, y - 38, (bw - 12) * f, 32); }
  }
  if (n > 0) text(ctx, `STEP ${n}/4 · ${STEPS[n - 1]}`, x0, y + 52, font(36, 700, UI), C.ink, 'left', 3);
  ctx.restore();
}

// ---------------------------------------------------------------- captions (word by word, top)
function captions(ctx, t) {
  const c = CUES.find((q) => t >= q.a && t < q.b); if (!c) return;
  const size = 96, f = font(size, 800, D), y0 = 500, maxW = W - 150;
  const ws = c.words.map((w) => ({ ...w, s: w.w.toUpperCase(), L: layout(ctx, w.w.toUpperCase(), f, -1).width + size * 0.3 }));
  const rows = [[]]; let rw = 0;
  ws.forEach((w) => { if (rw + w.L > maxW && rows[rows.length - 1].length) { rows.push([]); rw = 0; } rows[rows.length - 1].push(w); rw += w.L; });
  rows.forEach((r, ri) => {
    const tw = r.reduce((s, w) => s + w.L, 0); let x = (W - tw) / 2; const y = y0 + ri * size * 1.08 - (rows.length - 1) * size * 0.54;
    r.forEach((w) => {
      const k = sp(t, w.a - 0.06, SPRING.snappy);
      if (k > 0) {
        const key = KEY.test(w.w.replace(/[.,:!?]/g, ''));
        ctx.save(); ctx.translate(x + w.L / 2, y); ctx.scale(k, k); ctx.globalAlpha = clamp(k * 2);
        const lw = layout(ctx, w.s, f, -1).width;
        ctx.lineWidth = 16; ctx.strokeStyle = C.bg2; ctx.lineJoin = 'round'; ctx.font = f; ctx.strokeText(w.s, -lw / 2, 0);
        text(ctx, w.s, -lw / 2, 0, f, key ? C.y : C.ink, 'left', -1); ctx.restore();
      }
      x += w.L;
    });
  });
}

// ---------------------------------------------------------------- scenes (stage = y 640..1600)
function sHook(ctx, t) {
  const tS = wt('l1', 'stop'), tA = wt('l1', 'america');
  const z = 1 + 0.05 * ease(t, 0, 4.6, E.inOutCubic);
  ctx.save(); M.zoomAbout(ctx, z, W / 2, 1200);
  usaMap(ctx, W / 2 + 10, 1260, 17.5, t, tS);
  // radar sweep ring pulses over the map
  for (let j = 0; j < 2; j++) { const rp = ((t - 1.2 + j * 1.1) / 2.2); if (rp <= 0 || t > tS) continue; const r = (rp % 1) * 620; ctx.strokeStyle = `rgba(255,210,63,${0.5 * (1 - (rp % 1))})`; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(W / 2, 1230, r, 0, M.TAU); ctx.stroke(); }
  ctx.restore();
  const n = Math.round(3500 * ease(t, -0.15, 1.3, E.outCubic) / 10) * 10;
  const s = n >= 3500 ? '3,500+' : n.toLocaleString('en-US');
  digitBoxes(ctx, s, W / 2, 770, 118, -0.6, t);
  tag(ctx, 'PLANES IN THE SKY', W / 2, 920, 50, -0.4, t, -0.02);
  if (t > tA - 0.1) tag(ctx, 'USA', W / 2 - 330, 1530, 44, tA - 0.1, t, 0.03, C.ink, C.tag);
  stamp(ctx, 'STOP', W / 2, 1270, 170, tS - 0.05, t, -0.1);
}
function sGround(ctx, t) {
  const tF = wt('l2', 'faa'), tG = wt('l2', 'grounded'), tU = wt('l2', 'united');
  tag(ctx, 'FRI 13 NOV 2026', W / 2 - 200, 700, 42, T.l2, t, -0.03);
  tag(ctx, 'FAA ORDER', W / 2 + 270, 700, 42, tF, t, 0.03, C.ink, C.tag);
  const k = sp(t, T.l2 - 0.15, SPRING.gentle);
  if (k > 0) {
    const push = 1 + 0.07 * ease(t, tG, T.l3, E.inOutCubic);
    ctx.save(); ctx.translate(W / 2, 1110); ctx.scale(k * push, k * push); ctx.rotate(-0.012 * ease(t, tG, T.l3));
    const bw = 880, bh = 600;
    ctx.fillStyle = 'rgba(10,47,96,0.95)'; ctx.fillRect(-bw / 2, -bh / 2, bw, bh); ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.strokeRect(-bw / 2, -bh / 2, bw, bh);
    plane(ctx, -bw / 2 + 62, -bh / 2 + 55, 0.5, Math.PI / 4, C.y, true);
    text(ctx, 'DEPARTURES', -bw / 2 + 115, -bh / 2 + 72, font(54, 800, D), C.ink, 'left', 4);
    ctx.strokeStyle = C.line2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-bw / 2, -bh / 2 + 110); ctx.lineTo(bw / 2, -bh / 2 + 110); ctx.stroke();
    const rows = [['NEW YORK', '16:05'], ['CHICAGO', '16:10'], ['ATLANTA', '16:20'], ['DALLAS', '16:25'], ['DENVER', '16:40'], ['LOS ANGELES', '16:55']];
    rows.forEach(([city, tm], i) => {
      const y = -bh / 2 + 172 + i * 76;
      text(ctx, tm, -bw / 2 + 36, y, font(42, 700, UI), C.dim, 'left', 2);
      text(ctx, city, -bw / 2 + 190, y, font(44, 800, D), C.ink, 'left', 2);
      const tf = tG + 0.1 + i * 0.16; const flip = ease(t, tf, tf + 0.2);
      const g = flip >= 0.5, st = g ? 'GROUNDED' : 'ON TIME';
      ctx.save(); ctx.translate(bw / 2 - 150, y - 15); ctx.scale(1, Math.max(0.05, Math.abs(Math.cos(flip * Math.PI))));
      ctx.fillStyle = g ? C.red : 'rgba(157,185,222,0.25)'; ctx.fillRect(-125, -30, 250, 56);
      const fo = font(36, 800, D); const L = layout(ctx, st, fo, 2); text(ctx, st, -L.width / 2, 13, fo, g ? C.ink : C.dim, 'left', 2);
      ctx.restore();
    });
    ctx.restore();
  }
  const tE = wt('l2', 'every');
  if (t > tE - 0.1) tag(ctx, 'EVERY DEPARTURE', W / 2, 1490, 50, tE - 0.1, t, -0.02);
  if (t > tU - 0.2) { tag(ctx, 'WHOLE COUNTRY', W / 2 + 150, 1580, 50, tU - 0.2, t, 0.03, C.red, C.ink); }
}
function sWhy(ctx, t) {
  const tS = wt('l3', 'storm'), tH = wt('l3', 'hackers'), tO = wt('l3', 'officials'), tP = wt('l3', 'phone'), tR = wt('l3', 'routers'), tV = wt('l3', 'overloaded');
  const sw = ease(t, tO - 0.25, tO + 0.2, E.inOutCubic);
  if (sw < 1) {
    ctx.save(); ctx.translate(-W * sw, 0);
    const k1 = sp(t, T.l3 - 0.1), k2 = sp(t, tH - 0.25);
    if (k1 > 0) { ctx.save(); ctx.translate(W / 2 - 240, 1000); ctx.scale(k1, k1); cloud(ctx, 0, 0, 1.25); ctx.restore(); cross(ctx, W / 2 - 240, 1020, 120, ease(t, tS, tS + 0.3)); popText(ctx, 'STORM', W / 2 - 240, 1310, 60, C.ink, T.l3, t); }
    if (k2 > 0) { ctx.save(); ctx.translate(W / 2 + 240, 1010); ctx.scale(k2, k2); laptop(ctx, 0, 0, 1.1); ctx.restore(); cross(ctx, W / 2 + 240, 1010, 120, ease(t, tH + 0.1, tH + 0.4)); popText(ctx, 'HACKERS', W / 2 + 240, 1310, 60, C.ink, tH - 0.2, t); }
    tag(ctx, 'NO SIGN OF A CYBERATTACK', W / 2, 1450, 44, tH + 0.2, t, -0.02);
    ctx.restore();
  }
  if (sw > 0) {
    ctx.save(); ctx.translate(W * (1 - sw), 0);
    tag(ctx, 'OFFICIALS SAY', W / 2, 700, 40, tO, t, -0.02, C.ink, C.tag);
    tower(ctx, 170, 1330, 1.25);
    radar(ctx, W - 170, 1330, 1.25, t);
    const load = ease(t, tR, tV + 0.4, E.inCubic);
    const wireK = ease(t, tP - 0.1, tP + 0.5);
    const wc = load > 0.85 ? C.red : C.y;
    ctx.save(); ctx.globalAlpha = wireK; ctx.strokeStyle = wc; ctx.lineWidth = 8;
    ctx.beginPath(); ctx.moveTo(240, 1000); ctx.bezierCurveTo(300, 960, 330, 1000, W / 2 - 196, 1000); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W / 2 + 196, 1000); ctx.bezierCurveTo(750, 1000, 800, 1060, W - 190, 1150); ctx.stroke();
    ctx.restore();
    if (wireK > 0.5) { ctx.save(); ctx.globalAlpha = clamp(wireK * 2 - 1); dimLine(ctx, 90, 450, 880, 'OLD PHONE LINE', 1); ctx.restore(); }
    const nPk = Math.floor(lerp(2, 26, load));
    for (let i = 0; i < nPk && wireK > 0.3; i++) {
      const ph = (t * (0.9 + load * 1.5) + hash01(i, 5)) % 1;
      const x = lerp(250, W / 2 - 200, ph), y = 1000 - Math.sin(ph * Math.PI) * 25 + (hash01(i, 8) - 0.5) * 24;
      ctx.fillStyle = wc; ctx.fillRect(x - 11, y - 11, 22, 22);
    }
    const rk = sp(t, tR - 0.2);
    if (rk > 0) { ctx.save(); ctx.translate(W / 2, 1000); ctx.scale(rk * 1.15, rk * 1.15); router(ctx, 1, t, load); ctx.restore(); }
    if (t > tR) {
      const mx = W / 2 - 220, my = 1190, mw = 440, lv = Math.min(1, load * 1.05);
      ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.strokeRect(mx, my, mw, 44);
      ctx.fillStyle = wc; ctx.fillRect(mx + 6, my + 6, (mw - 12) * lv, 32);
      text(ctx, `LOAD ${Math.round(lv * 100)}%`, mx, my - 16, font(32, 700, UI), C.ink, 'left', 3);
    }
    stamp(ctx, 'OVERLOADED', W / 2, 1420, 92, tV + 0.15, t, -0.06);
    ctx.restore();
  }
}
function sBad(ctx, t) {
  const tF = wt('l4', 'four'), tN = wt('l4', 'nothing'), tT = wt('l4', 'thousands'), tC = wt('l4', 'cancelled');
  const sw = ease(t, tT - 0.3, tT + 0.1, E.inOutCubic);
  if (sw < 1) {
    ctx.save(); ctx.translate(-W * sw, 0);
    const sweep = ease(t, T.l4, tN + 0.4, E.inOutCubic);
    const k = sp(t, T.l4 - 0.15);
    if (k > 0) { ctx.save(); ctx.translate(W / 2, 1020); ctx.scale(k, k); ctx.rotate(0.03 * Math.sin(t * 2)); clockFace(ctx, 250, sweep); ctx.restore(); }
    dimLine(ctx, W / 2 - 300, W / 2 + 300, 710, 'GROUND STOP', ease(t, T.l4 + 0.1, T.l4 + 0.6));
    digitBoxes(ctx, '4+', W / 2 - 160, 1400, 120, tF - 0.05, t);
    popText(ctx, 'HOURS', W / 2 + 150, 1440, 96, C.ink, tF + 0.2, t);
    if (t > tN) tag(ctx, 'NO DEPARTURES', W / 2 + 250, 800, 42, tN, t, 0.05, C.red, C.ink);
    ctx.restore();
  }
  if (sw > 0) {
    ctx.save(); ctx.translate(W * (1 - sw), 0);
    const cols = 9, rows = 8, gx = 104, gy = 90, x0 = W / 2 - ((cols - 1) * gx) / 2, y0 = 760;
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const i = r * cols + c; const ap = sp(t, tT - 0.2 + i * 0.006, SPRING.snappy); if (ap <= 0) continue;
      const hit = t > tC - 0.1 + hash01(i, 77) * 0.9;
      const col = hit ? (hash01(i, 13) < 0.33 ? C.red : C.y) : C.ink;
      plane(ctx, x0 + c * gx, y0 + r * gy, 0.62 * ap, 0, col, hit);
    }
    tag(ctx, 'THOUSANDS OF FLIGHTS', W / 2, 1530, 50, tT + 0.2, t, -0.02);
    const lk = ease(t, tC, tC + 0.3);
    if (lk > 0) {
      ctx.save(); ctx.globalAlpha = lk;
      ctx.fillStyle = C.red; ctx.fillRect(W / 2 - 330, 1630, 36, 36); text(ctx, 'CANCELLED', W / 2 - 280, 1662, font(38, 700, UI), C.ink, 'left', 2);
      ctx.fillStyle = C.y; ctx.fillRect(W / 2 + 70, 1630, 36, 36); text(ctx, 'DELAYED', W / 2 + 120, 1662, font(38, 700, UI), C.ink, 'left', 2);
      ctx.restore();
    }
    ctx.restore();
  }
}
function sRare(ctx, t) {
  const tT = wt('l5', 'twice'), tA = wt('l5', 'after'), tC = wt('l5', 'twenty');
  const y = 1180, xa = 150, xb = W - 150;
  const lk = ease(t, T.l5 - 0.1, T.l5 + 0.9, E.inOutCubic);
  ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(xa, y); ctx.lineTo(lerp(xa, xb, lk), y); ctx.stroke();
  for (let yr = 2000; yr <= 2026; yr += 1) { const x = lerp(xa, xb, (yr - 2000) / 26); if (x > lerp(xa, xb, lk)) break; const big = yr % 5 === 0; ctx.lineWidth = big ? 5 : 3; ctx.beginPath(); ctx.moveTo(x, y - (big ? 22 : 12)); ctx.lineTo(x, y + (big ? 22 : 12)); ctx.stroke(); }
  const ev = [[2001, 'AFTER 9/11', tA - 0.1, -1], [2023, 'COMPUTER OUTAGE', tC - 0.1, 1], [2026, 'THIS WEEK', T.l5 + 0.3, -1]];
  ev.forEach(([yr, lab, t0, side], i) => {
    const x = lerp(xa, xb, (yr - 2000) / 26); const k = sp(t, t0); if (k <= 0) return;
    const now = i === 2;
    ctx.fillStyle = now ? C.red : C.y; ctx.beginPath(); ctx.arc(x, y, 24 * k, 0, M.TAU); ctx.fill();
    const bx = clamp(x, 250, W - 250), by = y + side * 240;
    ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(x, y + side * 30); ctx.lineTo(bx, y + side * 150 * k); ctx.stroke(); ctx.setLineDash([]);
    ctx.save(); ctx.translate(bx, by); ctx.scale(k, k);
    ctx.fillStyle = 'rgba(10,47,96,0.95)'; ctx.fillRect(-215, -90, 430, 180); ctx.strokeStyle = now ? C.red : C.y; ctx.lineWidth = 6; ctx.strokeRect(-215, -90, 430, 180);
    ctext(ctx, String(yr), 0, 0, 92, now ? C.red : C.y);
    ctext(ctx, lab, 0, 62, 38, C.ink, 700, UI, 0.06);
    ctx.restore();
  });
  if (t > tT - 0.2) tag(ctx, 'ONLY TWICE BEFORE', W / 2, 720, 50, tT - 0.2, t, -0.02);
  ctext(ctx, 'NATIONWIDE GROUND STOPS', W / 2, 820, 40, C.dim, 700, UI, 0.08);
  if (t > tC + 0.6) tag(ctx, '3RD IN 25 YEARS', W / 2 + 200, 1620, 50, tC + 0.6, t, 0.04, C.red, C.ink);
}
function sPay(ctx, t) {
  const tS = wt('l6', 'stopped'), tO = wt('l6', 'old'), tW = wt('l6', 'wires');
  const z = 1 + 0.06 * ease(t, T.l6, T.l7, E.inOutCubic);
  ctx.save(); M.zoomAbout(ctx, z, W / 2, 1100);
  usaMap(ctx, W / 2 + 10, 1150, 17.5, t, tS);
  ctx.restore();
  const wk = ease(t, tO - 0.3, tO + 0.3);
  if (wk > 0) {
    const snap = ease(t, tW, tW + 0.35, E.outBack);
    ctx.save(); ctx.globalAlpha = wk; ctx.strokeStyle = C.y; ctx.lineWidth = 10; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(100, 1480); ctx.quadraticCurveTo(300, 1540 + snap * 60, W / 2 - 14, 1510 + snap * 90); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W / 2 + 14, 1510 + snap * 90); ctx.quadraticCurveTo(780, 1540 + snap * 60, W - 100, 1480); ctx.stroke();
    ctx.restore();
    if (snap > 0 && snap < 1) for (let i = 0; i < 8; i++) { const a = (i / 8) * M.TAU, cy = 1510 + snap * 90; ctx.strokeStyle = C.y; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(W / 2 + Math.cos(a) * 30 * snap, cy + Math.sin(a) * 30 * snap); ctx.lineTo(W / 2 + Math.cos(a) * 80 * snap, cy + Math.sin(a) * 80 * snap); ctx.stroke(); }
  }
  tag(ctx, 'NOT A STORM', W / 2 - 180, 740, 52, wt('l6', 'storm') - 0.1, t, -0.05, C.ink, C.tag);
  tag(ctx, 'OLD WIRES', W / 2 + 200, 840, 72, tO - 0.05, t, 0.04);
}
function planetLogo(ctx, x, y, r) {
  if (r <= 1) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.35);
  ctx.strokeStyle = C.y; ctx.lineWidth = 10;
  ctx.beginPath(); ctx.ellipse(0, 0, r * 1.7, r * 0.42, 0, Math.PI, M.TAU); ctx.stroke();
  const g = ctx.createLinearGradient(-r, -r, r, r); g.addColorStop(0, '#6FB8FF'); g.addColorStop(1, '#2546B8');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, M.TAU); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, 0, r * 1.7, r * 0.42, 0, 0, Math.PI); ctx.stroke();
  ctx.restore();
}
function sEnd(ctx, t) {
  const t0 = T.l7, tL = wt('l7', 'like'), tF = wt('l7', 'follow');
  planetLogo(ctx, W / 2, 860 + 8 * Math.sin(t * 1.4), 140 * sp(t, t0 - 0.2));
  const pa = ease(t, t0, t0 + 1.8, E.inOutCubic);
  if (pa > 0) { const a = -Math.PI + pa * Math.PI * 1.4; plane(ctx, W / 2 + Math.cos(a) * 330, 860 + Math.sin(a) * 150, 0.6, a + Math.PI, C.ink, true); }
  popText(ctx, 'WHYVERSE', W / 2, 1150, 130, C.ink, t0, t);
  const btn = (label, x, ta, filled) => {
    const b = sp(t, ta - 0.1); if (b <= 0) return;
    const press = 1 - 0.08 * Math.max(0, wobble(t - ta - 0.35, 2.5, 5));
    ctx.save(); ctx.translate(x, 1340); ctx.scale(b * press, b * press);
    ctx.fillStyle = filled ? C.y : C.bg; ctx.strokeStyle = C.y; ctx.lineWidth = 7;
    rrect(ctx, -190, -62, 380, 124, 62); ctx.fill(); ctx.stroke();
    ctext(ctx, label, 0, 26, 70, filled ? C.tag : C.y); ctx.restore();
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
    SC.push([0, sHook], [T.l2, sGround], [T.l3, sWhy], [T.l4, sBad], [T.l5, sRare], [T.l6, sPay], [T.l7, sEnd]);
    const b = (s) => s / M.GRID.period;
    const add = (s, n, o) => HITS.push([+b(s).toFixed(3), n, ...o]);
    SC.slice(1).forEach(([tc], i) => add(tc, 'cut ' + i, ['whoosh', { len: 0.35, from: 500, to: 2200 }]));
    [[wt('l1', 'stop'), 'stop stamp'], [wt('l3', 'overloaded') + 0.15, 'overloaded'], [wt('l4', 'four'), '4+ hours'], [wt('l6', 'wires'), 'wire snaps']].forEach(([s, n]) => add(s, n, ['pop', { pitch: 'E4' }]));
    [[wt('l3', 'storm'), 'x storm'], [wt('l3', 'hackers') + 0.1, 'x hackers'], [wt('l5', 'after'), '2001'], [wt('l5', 'twenty'), '2023'], [wt('l7', 'like') + 0.35, 'like'], [wt('l7', 'follow') + 0.35, 'follow']].forEach(([s, n]) => add(s, n, ['blip', { pitch: 'A5' }]));
    [T.l2, T.l3, T.l4, T.l5].forEach((s, i) => add(s + 0.02, 'step ' + (i + 1), ['tick']));
    add(wt('l2', 'grounded') + 0.1, 'board flips', ['type', { n: 6, len: 1.0 }]);
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
