// "11,000+ nuclear warheads. One table." — Whyverse daily trend Short, 19 Nov 2026. Pure function of time.
// Story: Trump, Xi and Putin held their first-ever three-way talks in Shenzhen (APEC, Thu 19 Nov 2026; AP via Korea Herald,
// TRT World). Warheads (SIPRI Yearbook 2026, Jan 2026 est.): world 12,187; Russia 5,420; USA 5,042; China 620 → 11,082 = 91%.
// New START (2010) lapsed Feb 2026; China never part of it. Nuclear cuts discussed, no deal.
// Football-reel structure: number on frame 0, persistent SCOREBOARD (WARHEADS AT THE TABLE / TREATY / TALKS), a flashback
// (2010 treaty in sepia), a comparison that gives scale (9 of 10 dots), twist (treaty gone, China never in it), payoff, CTA.
// Look: LINE ART ON WARM PAPER — thin ink lines drawing themselves on, one red accent, ink silhouettes (no faces, no flags),
// warheads as a dot field (1 dot = 100 warheads). Neutral: all three leaders the same size, same ink, name plates only.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, rrect, hash01, clamp, TAU } = M;

const TIMING = {"dur": 22.302, "lines": [{"t0": 0.1, "t1": 3.131, "words": [{"w": "11,000+", "t": 0.13, "key": true}, {"w": "nuclear", "t": 1.235, "key": false}, {"w": "warheads.", "t": 1.65, "key": false}, {"w": "One", "t": 2.41, "key": false}, {"w": "table.", "t": 2.664, "key": true}]}, {"t0": 3.5, "t1": 7.105, "words": [{"w": "Trump,", "t": 3.54, "key": false}, {"w": "Xi", "t": 3.97, "key": false}, {"w": "and", "t": 4.251, "key": false}, {"w": "Putin", "t": 4.484, "key": false}, {"w": "just", "t": 4.812, "key": false}, {"w": "held", "t": 5.092, "key": false}, {"w": "their", "t": 5.373, "key": false}, {"w": "first-ever", "t": 5.7, "key": true}, {"w": "three-way", "t": 6.215, "key": false}, {"w": "talks.", "t": 6.683, "key": false}]}, {"t0": 7.5, "t1": 10.155, "words": [{"w": "Their", "t": 7.53, "key": false}, {"w": "countries", "t": 7.812, "key": false}, {"w": "hold", "t": 8.256, "key": false}, {"w": "9 in 10", "t": 8.498, "key": true}, {"w": "of", "t": 9.102, "key": false}, {"w": "the", "t": 9.264, "key": false}, {"w": "world's", "t": 9.465, "key": false}, {"w": "nukes.", "t": 9.788, "key": false}]}, {"t0": 10.5, "t1": 13.751, "words": [{"w": "The", "t": 10.53, "key": false}, {"w": "last", "t": 10.781, "key": false}, {"w": "US-Russia", "t": 11.082, "key": true}, {"w": "nuclear", "t": 11.583, "key": false}, {"w": "treaty", "t": 12.035, "key": false}, {"w": "ran", "t": 12.436, "key": false}, {"w": "out", "t": 12.687, "key": false}, {"w": "in", "t": 12.938, "key": false}, {"w": "February.", "t": 13.138, "key": true}]}, {"t0": 14.0, "t1": 15.467, "words": [{"w": "China", "t": 14.04, "key": true}, {"w": "was", "t": 14.318, "key": false}, {"w": "never", "t": 14.516, "key": true}, {"w": "part", "t": 14.794, "key": false}, {"w": "of", "t": 15.032, "key": false}, {"w": "it.", "t": 15.191, "key": false}]}, {"t0": 15.75, "t1": 20.166, "words": [{"w": "Today,", "t": 15.78, "key": false}, {"w": "nuclear", "t": 16.45, "key": false}, {"w": "cuts", "t": 16.756, "key": true}, {"w": "were", "t": 16.961, "key": false}, {"w": "on", "t": 17.165, "key": false}, {"w": "the", "t": 17.301, "key": false}, {"w": "table.", "t": 17.472, "key": true}, {"w": "No", "t": 18.15, "key": true}, {"w": "deal", "t": 18.334, "key": true}, {"w": "yet,", "t": 18.61, "key": false}, {"w": "but", "t": 19.01, "key": false}, {"w": "the", "t": 19.173, "key": false}, {"w": "talks", "t": 19.335, "key": false}, {"w": "have", "t": 19.563, "key": false}, {"w": "started.", "t": 19.758, "key": true}]}, {"t0": 20.5, "t1": 22.302, "words": [{"w": "Like", "t": 20.53, "key": true}, {"w": "and", "t": 20.778, "key": false}, {"w": "follow", "t": 20.984, "key": true}, {"w": "Whyverse", "t": 21.314, "key": true}, {"w": "for", "t": 21.726, "key": false}, {"w": "more.", "t": 21.932, "key": false}]}]};
const C = {
  paper: '#EFE7D8', paper2: '#E6DCC9', ink: '#1D1B18', ink2: '#3A3631', soft: '#9C9384', faint: '#D4C9B4',
  red: '#C8372D', red2: '#A82A22', sepia: '#C9AD7C', sepia2: '#8A6E45', white: '#FBF8F2',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const LN = (i) => TIMING.lines[i].t0;
const END = 24.3;
const S = { A: 0, B: LN(1) - 0.1, C: LN(2) - 0.1, D: LN(3) - 0.1, E: LN(4) - 0.1, F: LN(5) - 0.1, G: LN(6) - 0.1 };
const B = (t) => t / 0.500033;

// ---------------------------------------------------------------- layout
const TABLE_Y = 1085, SEATS = [{ x: 290, name: 'TRUMP', who: 'trump' }, { x: 540, name: 'XI', who: 'xi' }, { x: 790, name: 'PUTIN', who: 'putin' }];
const COUNTS = { trump: 50, xi: 6, putin: 54 }; // dots of 100 warheads (USA 5,042 · China 620 · Russia 5,420)
const REST = 11; // rest of the world ≈ 1,105
const NDOT = 50 + 6 + 54 + REST; // 121 ≈ 12,187 / 100
const tSeat = { trump: T('Trump,') - 0.05, xi: T('Xi') - 0.05, putin: T('Putin') - 0.05 };

// ---------------------------------------------------------------- helpers
function chip(ctx, label, x, y, size, k, { bg = C.ink, fg = C.paper, rot = -0.03, fam = UI, wt = 800 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, fam); const w = ctx.measureText(label).width + size * 1.0, h = size * 1.6;
  ctx.fillStyle = 'rgba(29,27,24,0.18)'; rrect(ctx, -w / 2 + 6, -h / 2 + 8, w, h, 10); ctx.fill();
  ctx.fillStyle = bg; rrect(ctx, -w / 2, -h / 2, w, h, 10); ctx.fill();
  text(ctx, label, 0, size * 0.36, font(size, wt, fam), fg, 'center', 2); ctx.restore();
}
function big(ctx, str, x, y, size, col, k, { rot = 0, stroke = C.paper, sw = 0.08 } = {}) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
  ctx.lineWidth = size * sw; ctx.strokeStyle = stroke; ctx.strokeText(str, 0, 0); ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function stamp(ctx, label, x, y, size, t, t0, col = C.red, rot = -0.08) {
  const k = t >= t0 ? Math.min(1.04, lerp(1.7, 1, E.outBack(prog(t, t0, t0 + 0.22)))) : 0; if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, 800, D); const w = ctx.measureText(label).width + size * 0.9, h = size * 1.4;
  ctx.fillStyle = 'rgba(251,248,242,0.92)'; ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.lineWidth = 9; ctx.strokeStyle = col; ctx.strokeRect(-w / 2, -h / 2, w, h); ctx.lineWidth = 3; ctx.strokeRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24);
  text(ctx, label, 0, size * 0.36, font(size, 800, D), col, 'center', 3); ctx.restore();
}
// a line that draws itself on (p 0..1) along a polyline
function drawOn(ctx, pts, p, col = C.ink, lw = 4) {
  if (p <= 0) return; let L = 0; const seg = [];
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let rem = L * p; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length && rem > 0; i++) { const f = Math.min(1, rem / seg[i - 1]);
    ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); rem -= seg[i - 1]; }
  ctx.lineWidth = lw; ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
}
function bez(a, c, b, n = 40) { const o = []; for (let i = 0; i <= n; i++) { const u = i / n;
  o.push([(1 - u) ** 2 * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0], (1 - u) ** 2 * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1]]); } return o; }
const fmt = (n) => Math.round(n).toLocaleString('en-US');

// ---------------------------------------------------------------- camera [time, zoom, fx, fy]
const CAM = [
  [0, 1.1, 540, 760], [T('One') - 0.1, 1.0, 540, 900], [S.B + 0.3, 1.0, 540, 930], [S.C + 0.05, 1.04, 540, 760],
  [S.D + 0.05, 1.0, 540, 900], [S.E + 0.0, 1.2, 540, 860], [S.F + 0.05, 1.0, 540, 930], [T('No') - 0.1, 1.06, 540, 960],
];
function camAt(t) {
  let z = CAM[0][1], fx = CAM[0][2], fy = CAM[0][3];
  for (let i = 1; i < CAM.length; i++) { const [ti, zi, xi, yi] = CAM[i];
    const p = E.inOutCubic(prog(t, ti - 0.15, ti + 0.5)); if (p <= 0) break;
    z = z * (zi / z) ** p; fx = lerp(fx, xi, p); fy = lerp(fy, yi, p); }
  z *= 1 + 0.01 * Math.sin(t * 0.9); fx += 5 * Math.sin(t * 0.7); fy += 4 * Math.cos(t * 0.6);
  return { z, fx, fy };
}

// ---------------------------------------------------------------- the world
function backdrop(ctx, t, sepia) {
  ctx.fillStyle = sepia > 0 ? M.mix(C.paper, '#E4D2AE', sepia) : C.paper; ctx.fillRect(-400, -400, 1900, 2800);
  // faint drafting grid
  ctx.strokeStyle = sepia > 0 ? M.mix(C.faint, '#CDB487', sepia) : C.faint; ctx.lineWidth = 1.5;
  for (let x = -400; x < 1500; x += 60) { ctx.beginPath(); ctx.moveTo(x, -400); ctx.lineTo(x, 2400); ctx.stroke(); }
  for (let y = -400; y < 2400; y += 60) { ctx.beginPath(); ctx.moveTo(-400, y); ctx.lineTo(1500, y); ctx.stroke(); }
  // paper fibres
  for (let i = 0; i < 90; i++) { ctx.fillStyle = `rgba(120,100,70,${0.05 + 0.05 * hash01(i, 3)})`;
    ctx.fillRect(hash01(i, 4) * 1080, hash01(i, 5) * 1920, 2 + 30 * hash01(i, 6), 1.5); }
}

// dot positions: phase 1 = loose grid (hook), phase 2 = columns behind each leader
function dotHome(i) {
  const cols = 14, gx = 58, gy = 33; const c = i % cols, r = Math.floor(i / cols);
  return [540 - (cols - 1) / 2 * gx + c * gx + (r % 2 ? 14 : -14), 450 + r * gy];
}
function dotOwner(i) { if (i < 50) return ['trump', i]; if (i < 56) return ['xi', i - 50]; if (i < 110) return ['putin', i - 56]; return ['rest', i - 110]; }
function dotCol(i) {
  const [o, k] = dotOwner(i); const g = 27;
  if (o === 'rest') { const c = k % 4, r = Math.floor(k / 4); return [960 + c * 0 + (c - 1.5) * 22 + 0, 850 - r * 22 - c * 0]; }
  const seat = SEATS.find((q) => q.who === o); const c = k % 5, r = Math.floor(k / 5);
  return [seat.x - 2 * g + c * g, 800 - r * g];
}
function dots(ctx, t) {
  const tIn = 0.0, tCol = T('hold') - 0.1;
  ctx.save(); ctx.globalAlpha = 1 - 0.75 * E.inOutCubic(prog(t, T('talks') - 0.4, T('talks') - 0.1));
  for (let i = 0; i < NDOT; i++) {
    const ti = tIn + 0.012 * i; if (t < ti) continue;
    const kIn = E.outBack(prog(t, ti, ti + 0.3)); const [hx, hy] = dotHome(i);
    let x = hx, y = lerp(hy - 120, hy, kIn), r = 11 * Math.min(1, kIn);
    const [o] = dotOwner(i);
    if (t >= tCol) { const d = 0.004 * i; const p = E.inOutCubic(prog(t, tCol + d, tCol + d + 0.55)); const [cx2, cy2] = dotCol(i);
      x = lerp(hx, cx2, p); y = lerp(hy, cy2, p) - Math.sin(p * Math.PI) * 60; r = lerp(11, o === 'rest' ? 8 : 10, p); }
    let col = C.ink;
    if (t >= T('9 in 10') - 0.05) col = o === 'rest' ? C.soft : C.red;
    // China column dashed outline later
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = col; ctx.fill();
  }
  // legend
  const kl = E.outCubic(prog(t, 0.6, 1.0)) * (1 - E.inCubic(prog(t, S.B, S.B + 0.3)));
  if (kl > 0) { ctx.save(); ctx.globalAlpha = kl; ctx.beginPath(); ctx.arc(410, 760, 9, 0, TAU); ctx.fillStyle = C.ink; ctx.fill();
    text(ctx, '= 100 WARHEADS', 430, 770, font(30, 700, UI), C.ink2, 'left', 2); ctx.restore(); }
  // column labels
  if (t >= tCol + 0.5) {
    const k = E.outCubic(prog(t, tCol + 0.5, tCol + 0.9));
    ctx.save(); ctx.globalAlpha = k;
    [['USA', 290, '5,042', 50], ['CHINA', 540, '620', 6], ['RUSSIA', 790, '5,420', 54]].forEach(([n, x, v, c]) => {
      const top = 800 - Math.ceil(c / 5) * 27 - 18;
      text(ctx, v, x, top - 4, font(40, 800, D), C.ink, 'center', 1);
    });
    text(ctx, 'REST', 960, 940 - 0, font(22, 700, UI), C.soft, 'center', 2);
    text(ctx, '1,105', 960, 966, font(22, 700, UI), C.soft, 'center', 1);
    ctx.restore();
  }
  ctx.restore();
}

// ink silhouettes: head + shoulders behind the table (no faces)
function silhouette(ctx, who, x, k, t) {
  if (k <= 0) return; const y = TABLE_Y; const bob = Math.sin(t * 1.6 + x) * 2;
  ctx.save(); ctx.translate(x, y + (1 - k) * 260 + bob); ctx.fillStyle = C.ink;
  // shoulders / suit
  const sw = who === 'putin' ? 112 : who === 'trump' ? 128 : 120;
  ctx.beginPath(); ctx.moveTo(-sw, 0); ctx.bezierCurveTo(-sw, -110, -sw * 0.6, -150, -30, -160); ctx.lineTo(30, -160);
  ctx.bezierCurveTo(sw * 0.6, -150, sw, -110, sw, 0); ctx.closePath(); ctx.fill();
  // collar / tie in paper colour (shape cue only)
  ctx.fillStyle = C.paper; ctx.beginPath(); ctx.moveTo(-26, -158); ctx.lineTo(0, -112); ctx.lineTo(26, -158); ctx.closePath(); ctx.fill();
  ctx.fillStyle = C.ink;
  if (who === 'trump') { ctx.beginPath(); ctx.moveTo(-9, -146); ctx.lineTo(9, -146); ctx.lineTo(14, -20); ctx.lineTo(0, 0); ctx.lineTo(-14, -20); ctx.closePath(); ctx.fill(); }
  else { ctx.beginPath(); ctx.moveTo(-8, -146); ctx.lineTo(8, -146); ctx.lineTo(11, -60); ctx.lineTo(0, -46); ctx.lineTo(-11, -60); ctx.closePath(); ctx.fill(); }
  // neck
  ctx.fillRect(-26, -200, 52, 50);
  // head
  const hw = who === 'xi' ? 64 : who === 'trump' ? 62 : 56, hh = who === 'putin' ? 76 : 78;
  ctx.beginPath(); ctx.ellipse(0, -262, hw, hh, 0, 0, TAU); ctx.fill();
  // ears
  ctx.beginPath(); ctx.ellipse(-hw + 2, -258, 12, 20, 0, 0, TAU); ctx.ellipse(hw - 2, -258, 12, 20, 0, 0, TAU); ctx.fill();
  // hair shapes
  if (who === 'trump') { // big swept volume forward and up
    ctx.beginPath(); ctx.moveTo(-hw - 4, -270); ctx.bezierCurveTo(-hw - 10, -350, -10, -372, 40, -352);
    ctx.bezierCurveTo(85, -342, 92, -312, hw + 22, -300); ctx.bezierCurveTo(hw + 4, -292, hw, -280, hw, -270); ctx.closePath(); ctx.fill();
  } else if (who === 'xi') { // neat, full, flat-topped, side parted
    ctx.beginPath(); ctx.moveTo(-hw - 3, -262); ctx.bezierCurveTo(-hw - 6, -332, -30, -350, 10, -348);
    ctx.bezierCurveTo(50, -348, hw + 6, -330, hw + 3, -262); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = C.ink2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-22, -346); ctx.lineTo(-30, -320); ctx.stroke();
  } else { // receding, close-cropped: thin cap only at the back/sides
    ctx.beginPath(); ctx.moveTo(-hw - 2, -250); ctx.bezierCurveTo(-hw - 4, -300, -hw * 0.6, -330, -20, -336);
    ctx.lineTo(-30, -318); ctx.bezierCurveTo(-hw * 0.6, -310, -hw + 6, -290, -hw + 6, -250); ctx.closePath(); ctx.fill();
  }
  ctx.restore();
}
function table(ctx, t) {
  const p = E.inOutCubic(prog(t, 0.35, T('table.') + 0.2));
  if (p <= 0) return;
  // table top (front view, slight perspective)
  const L = 70, R = 1010, y = TABLE_Y;
  ctx.save(); ctx.globalAlpha = Math.min(1, p * 1.6);
  ctx.fillStyle = C.white; ctx.beginPath(); ctx.moveTo(L + 30, y - 6); ctx.lineTo(R - 30, y - 6); ctx.lineTo(R, y + 60); ctx.lineTo(L, y + 60); ctx.closePath(); ctx.fill();
  ctx.fillStyle = C.paper2; ctx.fillRect(L, y + 60, R - L, 150);
  ctx.restore();
  drawOn(ctx, [[L + 30, y - 6], [R - 30, y - 6], [R, y + 60], [L, y + 60], [L + 30, y - 6]], p, C.ink, 5);
  drawOn(ctx, [[L, y + 60], [L, y + 210]], prog(p, 0.5, 1), C.ink, 5); drawOn(ctx, [[R, y + 60], [R, y + 210]], prog(p, 0.5, 1), C.ink, 5);
  // cloth hatch
  for (let i = 0; i < 18; i++) { const x = L + 20 + i * 52; drawOn(ctx, [[x, y + 80], [x + 30, y + 200]], prog(p, 0.4 + i * 0.03, 0.7 + i * 0.03), C.faint, 3); }
}
function namePlates(ctx, t) {
  SEATS.forEach((q) => { const k = pop(t, tSeat[q.who] + 0.12); if (k <= 0) return;
    ctx.save(); ctx.translate(q.x, TABLE_Y + 34); ctx.scale(k, k);
    ctx.fillStyle = C.ink; ctx.beginPath(); ctx.moveTo(-90, -26); ctx.lineTo(90, -26); ctx.lineTo(100, 26); ctx.lineTo(-100, 26); ctx.closePath(); ctx.fill();
    text(ctx, q.name, 0, 13, font(36, 800, D), C.paper, 'center', 4); ctx.restore(); });
}
// three routes into Shenzhen
function routes(ctx, t) {
  const t0 = S.B; if (t < t0 || t > S.C + 0.4) return;
  const fade = 1 - E.inCubic(prog(t, S.C - 0.1, S.C + 0.35));
  const pin = [540, TABLE_Y + 175];
  const R = [
    { from: [-20, 520], ctrl: [120, 380], label: 'WASHINGTON', lx: 110, ly: 470, t: tSeat.trump },
    { from: [1100, 470], ctrl: [940, 330], label: 'MOSCOW', lx: 945, ly: 430, t: tSeat.putin },
    { from: [540, 420], ctrl: [610, 560], label: 'BEIJING', lx: 540, ly: 455, t: tSeat.xi },
  ];
  ctx.save(); ctx.globalAlpha = fade;
  R.forEach((r) => { const p = E.inOutCubic(prog(t, r.t - 0.25, r.t + 0.45)); if (p <= 0) return;
    ctx.setLineDash([16, 12]); drawOn(ctx, bez(r.from, r.ctrl, pin), p, C.red, 5); ctx.setLineDash([]);
    const kl = pop(t, r.t - 0.2); if (kl > 0) chip(ctx, r.label, r.lx, r.ly, 30, kl, { bg: C.white, fg: C.ink, rot: 0 }); });
  ctx.restore();
}
function pinTop(ctx, t) {
  const t0 = S.B; if (t < t0 || t > S.C + 0.4) return; const pin = [540, TABLE_Y + 175];
  ctx.save(); ctx.globalAlpha = 1 - E.inCubic(prog(t, S.C - 0.1, S.C + 0.35));
  const kp = pop(t, t0 + 0.05);
  if (kp > 0) { ctx.save(); ctx.translate(pin[0], pin[1]); ctx.scale(kp, kp);
    ctx.beginPath(); ctx.arc(0, -38, 26, Math.PI * 0.85, Math.PI * 0.15); ctx.lineTo(0, 0); ctx.closePath(); ctx.fillStyle = C.red; ctx.fill();
    ctx.beginPath(); ctx.arc(0, -38, 10, 0, TAU); ctx.fillStyle = C.paper; ctx.fill(); ctx.restore();
    chip(ctx, 'SHENZHEN, CHINA', pin[0], pin[1] - 62, 34, kp, { bg: C.ink, rot: 0 }); }
  ctx.restore();
}
// 2010 flashback: the treaty sheet, the cap line, then it runs out
function treaty(ctx, t) {
  const t0 = S.D; if (t < t0 || t > S.E + 0.5) return;
  const kIn = E.outBack(prog(t, t0, t0 + 0.45), 1.1), kOut = E.inCubic(prog(t, S.E - 0.05, S.E + 0.4));
  const tExp = T('ran') - 0.05;
  ctx.save(); ctx.translate(lerp(-700, 540, kIn) + kOut * 900, 640 + kOut * 200); ctx.rotate(lerp(-0.25, -0.05, kIn) + kOut * 0.4);
  const w = 560, h = 400;
  ctx.fillStyle = 'rgba(60,40,20,0.2)'; ctx.fillRect(-w / 2 + 10, -h / 2 + 14, w, h);
  ctx.fillStyle = '#F3E6C8'; ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.lineWidth = 4; ctx.strokeStyle = C.sepia2; ctx.strokeRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32);
  text(ctx, 'NEW START', 0, -100, font(64, 800, D), C.ink, 'center', 4);
  text(ctx, 'USA  ·  RUSSIA', 0, -48, font(32, 700, UI), C.sepia2, 'center', 4);
  for (let i = 0; i < 4; i++) drawOn(ctx, [[-200, -5 + i * 30], [200 - (i === 3 ? 120 : 0), -5 + i * 30]], prog(t, t0 + 0.2 + i * 0.08, t0 + 0.5 + i * 0.08), C.sepia, 4);
  // two signatures
  const sg = (ox, seed, p) => { const pts = []; for (let i = 0; i <= 24; i++) { const u = i / 24; pts.push([ox - 80 + u * 160, 140 + Math.sin(u * 14 + seed) * 14 * (1 - u * 0.5) - u * 8]); } drawOn(ctx, pts, p, C.ink, 3); };
  sg(-130, 1, prog(t, T('treaty') - 0.25, T('treaty') + 0.2)); sg(130, 3, prog(t, T('treaty') - 0.05, T('treaty') + 0.35));
  ctx.strokeStyle = C.sepia2; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(-220, 160); ctx.lineTo(-40, 160); ctx.moveTo(40, 160); ctx.lineTo(220, 160); ctx.stroke();
  ctx.restore();
  if (t < tExp + 0.5) chip(ctx, 'SIGNED 2010', 300, 430, 40, pop(t, t0 + 0.25) * (1 - kOut), { bg: C.sepia2, fg: C.white, rot: -0.06 });
  // the cap line over the US and Russian columns
  const kc = E.outCubic(prog(t, t0 + 0.4, t0 + 0.8)); const fall = E.inCubic(prog(t, tExp + 0.05, tExp + 0.6));
  if (kc > 0 && fall < 1) { ctx.save(); ctx.globalAlpha = 1 - fall; const yC = 760 - 0 + fall * 400;
    ctx.setLineDash([14, 10]); drawOn(ctx, [[120, yC], [960, yC]], kc, C.sepia2, 5); ctx.setLineDash([]);
    text(ctx, 'CAP', 140, yC - 14, font(28, 800, UI), C.sepia2, 'left', 3); ctx.restore(); }
  if (t >= tExp) stamp(ctx, 'EXPIRED', 560, 700, 96, t, tExp, C.red, -0.1);
  if (t >= T('February.') - 0.05) chip(ctx, 'FEB 2026', 760, 820, 42, pop(t, T('February.') - 0.05), { bg: C.red, fg: C.white, rot: 0.06 });
}
// China: never part of it
function chinaNote(ctx, t) {
  const t0 = T('China') - 0.1; if (t < t0 || t > S.F + 0.4) return;
  const k = E.outCubic(prog(t, t0, t0 + 0.4)) * (1 - E.inCubic(prog(t, S.F - 0.05, S.F + 0.35)));
  ctx.save(); ctx.globalAlpha = k; ctx.setLineDash([12, 9]);
  ctx.lineWidth = 5; ctx.strokeStyle = C.red; rrect(ctx, 460, 610, 160, 230, 18); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
  if (t >= T('never') - 0.05) chip(ctx, 'NEVER SIGNED', 540, 580, 40, pop(t, T('never') - 0.05) * k, { bg: C.red, fg: C.white, rot: -0.04 });
}
// the folder on the table + talk bubbles
function talks(ctx, t) {
  const t0 = T('nuclear', 2) - 0.15; if (t < t0) return;
  const kd = E.outBack(prog(t, t0, t0 + 0.5), 1.0);
  ctx.save(); ctx.translate(540, lerp(TABLE_Y - 500, lerp(TABLE_Y - 180, TABLE_Y + 140, E.inOutCubic(prog(t, t0 + 0.5, t0 + 1.0))), kd)); ctx.rotate(lerp(-0.4, 0.02, kd)); const fz = lerp(1.9, 1.25, E.inOutCubic(prog(t, t0 + 0.5, t0 + 1.0))); ctx.scale(fz, fz);
  ctx.fillStyle = 'rgba(29,27,24,0.2)'; ctx.fillRect(-150, -40, 310, 86);
  ctx.fillStyle = C.white; ctx.fillRect(-160, -48, 310, 86); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.strokeRect(-160, -48, 310, 86);
  ctx.fillStyle = C.red; ctx.fillRect(-160, -48, 22, 86);
  text(ctx, 'NUCLEAR CUTS', 8, 6, font(34, 800, D), C.ink, 'center', 2);
  text(ctx, 'TALKS · 19 NOV', 8, 32, font(20, 700, UI), C.soft, 'center', 4);
  ctx.restore();
  // speech bubbles from each seat, alternating
  const tb = T('talks') - 0.2;
  SEATS.forEach((q, i) => { const ti = tb + i * 0.22; if (t < ti) return; const k = pop(t, ti);
    const bx = q.x + (i === 0 ? 40 : i === 2 ? -40 : 0), by = 640 + (i === 1 ? -50 : 0);
    ctx.save(); ctx.translate(bx, by); ctx.scale(k, k);
    ctx.fillStyle = C.white; ctx.strokeStyle = C.ink; ctx.lineWidth = 5; rrect(ctx, -80, -46, 160, 92, 40); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-14, 44); ctx.lineTo(0, 76); ctx.lineTo(16, 44); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = C.white; ctx.fillRect(-18, 38, 36, 9);
    for (let j = 0; j < 3; j++) { const a = 0.5 + 0.5 * Math.sin((t - ti) * 9 - j * 1.1); ctx.beginPath(); ctx.arc(-34 + j * 34, 2 - a * 8, 11, 0, TAU); ctx.fillStyle = C.ink; ctx.fill(); }
    ctx.restore(); });
}

// ---------------------------------------------------------------- scoreboard (persistent, bottom)
function board(ctx, t) {
  const k = 1;
  const y = s.y + s.h - 170 + (1 - k) * 260, h = 160, x0 = 40, w = W - 80;
  ctx.save();
  ctx.fillStyle = 'rgba(29,27,24,0.25)'; rrect(ctx, x0 + 6, y + 8, w, h, 18); ctx.fill();
  ctx.fillStyle = C.ink; rrect(ctx, x0, y, w, h, 18); ctx.fill();
  const cw = w / 3;
  const head = ['AT THE TABLE', 'TREATY', 'TALKS'];
  // values
  const nCount = Math.min(11082, 11082 * E.outCubic(prog(t, 0.0, 2.2)));
  const tExp = T('ran') - 0.05, tFirst = T('first-ever') - 0.05, tNo = T('No') - 0.05, tSt = T('started.') - 0.05;
  const vals = [
    [fmt(nCount), C.white, 'WARHEADS'],
    t < S.D ? ['—', C.soft, 'NONE IN FORCE'] : t < tExp ? ['NEW START', C.sepia, 'SINCE 2010'] : ['NONE', C.red, 'SINCE FEB 2026'],
    t < tFirst ? ['—', C.soft, ''] : t < tNo ? ['1ST EVER', C.white, 'THREE-WAY'] : t < tSt ? ['NO DEAL', C.red, 'NOT YET'] : ['STARTED', C.white, 'NO DEAL YET'],
  ];
  // the treaty cell shows "—" before the flashback only if we haven't reached it; keep NONE after expiry
  for (let i = 0; i < 3; i++) {
    const xx = x0 + i * cw; if (i) { ctx.fillStyle = '#3A3631'; ctx.fillRect(xx, y + 22, 3, h - 44); }
    text(ctx, head[i], xx + cw / 2, y + 40, font(22, 700, UI), C.soft, 'center', 3);
    const [v, col, sub] = vals[i];
    const chT = i === 0 ? 0 : i === 1 ? (t < tExp ? S.D : tExp) : (t < tNo ? tFirst : t < tSt ? tNo : tSt);
    const kk = i === 0 ? 1 : Math.min(1.08, 0.5 + 0.5 * sp(t, chT, SPRING.bouncy));
    ctx.save(); ctx.translate(xx + cw / 2, y + 98); ctx.scale(kk, kk);
    ctx.font = font(48, 800, D); const fs = Math.min(48, 48 * (cw - 30) / ctx.measureText(v).width);
    text(ctx, v, 0, 0, font(fs, 800, D), col, 'center', 1); ctx.restore();
    if (sub) text(ctx, sub, xx + cw / 2, y + 136, font(20, 700, UI), C.soft, 'center', 3);
  }
  ctx.restore();
  // source line
  if (t >= T('hold') - 0.1) { const ks = E.outCubic(prog(t, T('hold'), T('hold') + 0.4));
    ctx.save(); ctx.globalAlpha = ks; text(ctx, 'Warhead estimates: SIPRI Yearbook 2026 (Jan 2026) · 1 dot = 100', W / 2, y - 18, font(22, 600, UI), C.ink2, 'center', 1); ctx.restore(); }
}

// ---------------------------------------------------------------- captions (word by word, top)
function captions(ctx, t) {
  const L = TIMING.lines; const li = L.findIndex((l, i) => t >= l.t0 - 0.05 && t < (L[i + 1] ? L[i + 1].t0 - 0.05 : END)); if (li < 0) return;
  if (li === 0 || li === 6) return; // hook + end card carry their own type
  const all = L[li].words;
  const ws = all.filter((w) => t >= w.t - 0.03); if (!ws.length) return;
  const start = Math.floor((ws.length - 1) / 3) * 3, chunk = all.slice(start, start + 3), shown = ws.slice(start);
  let size = 88; const gap = 22;
  const meas = (sz) => { ctx.font = font(sz, 800, D); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 20) { size = Math.floor(size * (s.w - 20) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 80;
  shown.forEach((w, i) => { const k = sp(t, w.t - 0.03, SPRING.bouncy), sc = Math.min(1.1, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.24; ctx.strokeStyle = C.paper; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.red : C.ink; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}

// ---------------------------------------------------------------- screen-space overlays
function overlays(ctx, t) {
  const tOut = T('One') - 0.12;
  if (t < tOut + 0.1) { // HOOK on frame 0
    const out = E.inCubic(prog(t, tOut - 0.25, tOut + 0.05)); const k0 = t < 0.2 ? lerp(1.04, 1, E.outBack(prog(t, 0, 0.2))) : 1;
    ctx.save(); ctx.translate(0, -out * 700); ctx.globalAlpha = 1 - out;
    ctx.fillStyle = 'rgba(239,231,216,0.82)'; ctx.fillRect(0, s.y + 90, W, 470);
    big(ctx, '11,000+', cx, s.y + 300, 215, C.red, k0 * (1 + 0.01 * Math.sin(t * 7)), { sw: 0.05 });
    big(ctx, 'NUCLEAR WARHEADS', cx, s.y + 420, 86, C.ink, k0, { sw: 0.06 });
    chip(ctx, 'TRUMP · XI · PUTIN', cx, s.y + 510, 40, pop(t, 0.3), { bg: C.ink, rot: -0.02 });
    ctx.restore();
  }
  if (t >= T('One') - 0.12 && t < S.B + 0.2) { const k = pop(t, T('One') - 0.05);
    big(ctx, 'ONE TABLE.', cx, s.y + 260, 150, C.ink, k * (1 - E.inCubic(prog(t, S.B - 0.1, S.B + 0.2))), { sw: 0.06 }); }
  if (t >= T('first-ever') - 0.05 && t < S.C + 0.1) stamp(ctx, 'FIRST EVER', cx + 150, s.y + 330, 80, t, T('first-ever') - 0.05, C.red, 0.07);
  if (t >= T('9 in 10') - 0.05 && t < S.D + 0.1) {
    const k = pop(t, T('9 in 10') - 0.05) * (1 - E.inCubic(prog(t, S.D - 0.1, S.D + 0.2)));
    if (k > 0) { ctx.save(); ctx.translate(cx, s.y + 230); ctx.scale(k, k);
      ctx.fillStyle = 'rgba(251,248,242,0.95)'; rrect(ctx, -400, -70, 800, 140, 20); ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke();
      text(ctx, '9 in 10', -205, 30, font(84, 800, D), C.red, 'center', 1);
      for (let i = 0; i < 10; i++) { const kk = pop(t, T('9 in 10') + 0.04 * i); ctx.beginPath(); ctx.arc(-10 + i * 38, 0, 15 * Math.min(1, kk), 0, TAU); ctx.fillStyle = i < 9 ? C.red : C.soft; ctx.fill(); }
      ctx.restore(); }
  }
  if (t >= T('No') - 0.05 && t < S.G) stamp(ctx, 'NO DEAL YET', cx, 900, 84, t, T('No') - 0.05, C.red, -0.06);
}

// ---------------------------------------------------------------- end card
function endCard(ctx, t) {
  const k = E.outCubic(prog(t, S.G - 0.05, S.G + 0.35)); if (k <= 0) return;
  ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = C.paper; ctx.fillRect(0, 0, W, H); ctx.restore();
  // mini table with three silhouettes
  const kt = E.outBack(prog(t, S.G + 0.05, S.G + 0.6));
  if (kt > 0) { ctx.save(); ctx.translate(540, s.y + 360); ctx.scale(0.42 * kt, 0.42 * kt); ctx.translate(-540, -TABLE_Y);
    SEATS.forEach((q) => silhouette(ctx, q.who, q.x, 1, t));
    ctx.fillStyle = C.ink; ctx.fillRect(70, TABLE_Y - 6, 940, 22); ctx.restore(); }
  big(ctx, 'WHYVERSE', cx, s.y + 500, 130, C.ink, pop(t, S.G), { sw: 0.05 });
  text(ctx, '11,082 WARHEADS · 1 TABLE · NO DEAL YET', cx, s.y + 580, font(38, 800, D), C.red, 'center', 2);
  const kB = pop(t, T('Like') - 0.05), kF = pop(t, T('follow') - 0.05);
  if (kB > 0) { ctx.save(); ctx.translate(cx - 215, s.y + 770); ctx.scale(kB, kB); ctx.rotate(-0.04);
    ctx.fillStyle = C.white; rrect(ctx, -190, -72, 380, 144, 24); ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
    const hb = 1 + 0.14 * Math.max(0, Math.sin((t - T('Like')) * 9)) * Math.exp(-(t - T('Like')) * 2);
    ctx.save(); ctx.translate(-105, 4); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30);
    ctx.fillStyle = C.red; ctx.fill(); ctx.restore();
    text(ctx, 'LIKE', 45, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  if (kF > 0) { ctx.save(); ctx.translate(cx + 215, s.y + 770); ctx.scale(kF, kF); ctx.rotate(0.04);
    ctx.fillStyle = C.red; rrect(ctx, -190, -72, 380, 144, 24); ctx.fill();
    ctx.save(); ctx.translate(-130, 4); ctx.lineWidth = 13; ctx.strokeStyle = C.white; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'FOLLOW', 45, 24, font(56, 800, D), C.white, 'center'); ctx.restore(); }
  const kS = pop(t, T('more.') + 0.05);
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 970); ctx.scale(kS, kS);
    ctx.fillStyle = C.ink; rrect(ctx, -470, -80, 940, 160, 20); ctx.fill();
    ctx.save(); ctx.translate(-385, 0); ctx.fillStyle = C.white; ctx.fillRect(-36, -24, 72, 48); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.moveTo(-36, -24); ctx.lineTo(0, 6); ctx.lineTo(36, -24); ctx.stroke(); ctx.restore();
    text(ctx, 'Send this to the friend', 40, -12, font(44, 700, UI), C.white, 'center');
    text(ctx, 'who follows world news', 40, 44, font(44, 700, UI), '#F08A80', 'center');
    ctx.restore(); }
}

const HITS = [
  [B(0.02), '11,000+', 'pop', { pitch: 'D5' }], [B(0.1), 'dots rain', 'type', { len: 1.5, n: 16 }], [B(T('nuclear') - 0.1), 'WARHEADS', 'click'],
  [B(T('One') - 0.12), 'ONE TABLE', 'whoosh', { len: 0.4, from: 400, to: 1400 }], [B(T('table.') - 0.05), 'table drawn', 'tick'],
  [B(S.B + 0.05), 'pin', 'pop', { pitch: 'A4' }], [B(tSeat.trump), 'Trump', 'tok', { pitch: 'C4' }], [B(tSeat.xi), 'Xi', 'tok', { pitch: 'E4' }], [B(tSeat.putin), 'Putin', 'tok', { pitch: 'G4' }],
  [B(T('first-ever') - 0.05), 'FIRST EVER', 'pop', { pitch: 'E5' }],
  [B(T('hold') - 0.1), 'dots to columns', 'whoosh', { len: 0.5, from: 1400, to: 500 }], [B(T('9 in 10') - 0.05), '9 in 10', 'bell', { pitch: 'D5' }],
  [B(S.D), 'flashback sheet', 'whoosh', { len: 0.45, from: 300, to: 1100 }], [B(T('treaty') - 0.25), 'signature', 'type', { len: 0.6, n: 6 }], [B(T('ran') - 0.05), 'EXPIRED', 'pop', { pitch: 'D4' }],
  [B(T('February.') - 0.05), 'FEB 2026', 'click'], [B(S.E), 'sheet off', 'whoosh', { len: 0.4, from: 1100, to: 300 }],
  [B(T('China') - 0.1), 'China box', 'tick'], [B(T('never') - 0.05), 'NEVER SIGNED', 'pop', { pitch: 'A4' }],
  [B(T('nuclear', 2) - 0.15), 'folder drop', 'whoosh', { len: 0.4, from: 900, to: 300 }], [B(T('No') - 0.05), 'NO DEAL YET', 'pop', { pitch: 'C5' }],
  [B(T('talks') - 0.2), 'bubble 1', 'blip', { pitch: 'C5' }], [B(T('talks') + 0.02), 'bubble 2', 'blip', { pitch: 'E5' }], [B(T('talks') + 0.24), 'bubble 3', 'blip', { pitch: 'G5' }],
  [B(S.G), 'end', 'whoosh', { len: 0.4, from: 1600, to: 400 }], [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop', { pitch: 'A5' }], [B(T('more.') + 0.05), 'send', 'click'],
];

M.film({
  fonts: [font(40, 800, D), font(40, 700, UI)], samples: 4,
  hits: HITS,
  draw(ctx, u, t) {
    const { z, fx, fy } = camAt(t);
    const sep = E.inOutCubic(prog(t, S.D - 0.1, S.D + 0.3)) * (1 - E.inOutCubic(prog(t, S.E - 0.1, S.E + 0.3)));
    ctx.save(); ctx.translate(W / 2, 900); ctx.scale(z, z); ctx.translate(-fx, -fy);
    backdrop(ctx, t, sep);
    dots(ctx, t);
    routes(ctx, t);
    SEATS.forEach((q) => silhouette(ctx, q.who, q.x, E.outBack(prog(t, tSeat[q.who], tSeat[q.who] + 0.45), 1.0), t));
    table(ctx, t); namePlates(ctx, t); pinTop(ctx, t);
    chinaNote(ctx, t); talks(ctx, t);
    ctx.restore();
    treaty(ctx, t);
    overlays(ctx, t);
    if (t < S.G + 0.2) board(ctx, t);
    captions(ctx, t);
    endCard(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 160; i++) { ctx.fillStyle = `rgba(60,45,25,${0.02 + 0.03 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 24)) * W, hash01(i + 5, Math.floor(t * 24) + 1) * H, 2, 2); } },
});
