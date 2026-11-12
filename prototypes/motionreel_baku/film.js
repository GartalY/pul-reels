// The capital below the sea — Whyverse vertical Short test (Motion Reel). Pure function of time.
// 120 bpm, 1 beat = 0.5 s, 48 beats = 24 s. Fast pacing: a new idea every 2–4 beats.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, springU, springKeys, SPRING, wobble, font, layout, glyph, text, fill, rrect, shake, hash01, noise1, mix, clamp, TAU } = M;

const C = { navy: '#0B1026', deep: '#060915', water: '#1F5FBF', water2: '#2E86E8', paper: '#F4F1EA', ink: '#0B1026', accent: '#FF6B4A', mute: '#8A93B2' };
const DISPLAY = 'Display', UI = 'UI';

const HITS = [
  [0, 'THIS', 'impact'], [0.5, 'CAPITAL', 'pop', { pitch: 'A5' }], [1, 'IS', 'pop', { pitch: 'C6' }],
  [2, 'BELOW', 'thud'], [2.5, 'THE SEA', 'pop', { pitch: 'D6' }],
  [4, 'water rises', 'whoosh', { len: 0.6, from: 400, to: 1800 }],
  [4.5, 'sea level line', 'click'], [5.5, 'city sinks', 'sub', { len: 0.6 }],
  [6, 'counter', 'type', { len: 1.4, n: 14 }], [9, '-28 m lands', 'bell', { pitch: 'E6' }],
  [10, 'BAKU label', 'pop', { pitch: 'A5' }], [11.5, 'lowest capital', 'tick'],
  [13, 'zoom out', 'whoosh', { len: 0.5, from: 500, to: 1500 }],
  [16, 'whip to chart', 'whoosh', { len: 0.4, from: 2400, to: 600 }],
  [18, 'bar Dead Sea', 'thud'], [20, 'bar Jericho', 'thud'], [22, 'bar Baku', 'impact'],
  [24, 'crown', 'bell', { pitch: 'A6' }],
  [26, 'whip to twist', 'whoosh', { len: 0.4, from: 600, to: 2400, pan: 0.3 }],
  [26.3, 'AND', 'click'], [27.4, 'not a sea', 'thud'],
  [30, 'LAKE', 'impact'], [31, 'biggest', 'pop', { pitch: 'D6' }],
  [33, 'area counter', 'type', { len: 1.2, n: 12 }], [35.5, 'area lands', 'thud'], [36, 'Germany', 'pop', { pitch: 'E6' }],
  [40, 'end card', 'impact'], [40.5, 'logo', 'bell', { pitch: 'D6' }], [42, 'follow', 'pop', { pitch: 'A5' }], [44.5, 'loop line', 'tick'],
];

const s = FORMAT.safe;   // x72 y250 w858 h1240
const cx = s.x + s.w / 2;

// --------------------------------------------------------------- helpers
function word(ctx, str, x, y, size, color, u0, u, { weight = 800, fam = DISPLAY, exitAt = null, align = 'center', track = -0.03 } = {}) {
  const f = font(size, weight, fam), L = layout(ctx, str, f, track * size);
  const x0 = align === 'center' ? x - L.width / 2 : x;
  L.glyphs.forEach((g, j) => {
    const k = springU(u, u0 + j * 0.035, SPRING.bouncy);
    if (k <= 0.001) return;
    let dy = (1 - k) * size * 0.7;
    if (exitAt !== null) dy -= E.inBack(prog(u, exitAt + j * 0.02, exitAt + 0.35 + j * 0.02), 1.6) * (H * 0.9);
    glyph(ctx, g.ch, x0 + g.cx, y + dy, f, color, Math.min(1, k), k);
  });
  return L.width;
}
function waves(ctx, yTop, u, colA, colB, amp = 18) {
  for (let layer = 0; layer < 2; layer++) {
    ctx.beginPath(); ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 12) {
      const y = yTop + layer * 26 + Math.sin(x * 0.012 + u * (1.6 + layer) + layer) * amp * (1 - layer * 0.4) + Math.sin(x * 0.031 - u * 2.3) * amp * 0.35;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W, H); ctx.closePath(); ctx.fillStyle = layer ? colB : colA; ctx.globalAlpha = layer ? 1 : 0.65; ctx.fill(); ctx.globalAlpha = 1;
  }
}
function skyline(ctx, x0, base, scale, color) {
  // simple Baku-ish skyline: three flame towers + boxes + Maiden Tower cylinder
  ctx.fillStyle = color;
  const B = [[0, 120, 70], [80, 190, 60], [150, 90, 80], [440, 140, 70], [520, 100, 60], [590, 170, 55]];
  B.forEach(([x, h, w]) => ctx.fillRect(x0 + x * scale, base - h * scale, w * scale, h * scale));
  // Maiden Tower
  rrect(ctx, x0 + 240 * scale, base - 150 * scale, 60 * scale, 150 * scale, 8 * scale); ctx.fill();
  // flame towers
  [[330, 330], [380, 280], [425, 250]].forEach(([x, h], i) => {
    ctx.beginPath(); ctx.moveTo(x0 + x * scale, base);
    ctx.quadraticCurveTo(x0 + (x - 25) * scale, base - h * 0.55 * scale, x0 + (x + 10) * scale, base - h * scale);
    ctx.quadraticCurveTo(x0 + (x + 45) * scale, base - h * 0.5 * scale, x0 + (x + 40) * scale, base);
    ctx.closePath(); ctx.fill();
  });
}

// --------------------------------------------------------------- S1 hook (0..4)
function sHook(ctx, u) {
  fill(ctx, C.navy);
  // water already rising from the bottom from frame 0
  const wy = lerp(H * 0.92, H * 0.62, E.outCubic(prog(u, 0, 4)));
  waves(ctx, wy, u, C.water, C.water2);
  const ex = 3.5;
  word(ctx, 'THIS CAPITAL', cx, s.y + 300, 118, C.paper, -0.25, u, { exitAt: ex });
  word(ctx, 'IS', cx, s.y + 420, 118, C.paper, 1, u, { exitAt: ex + 0.05 });
  // BELOW: big, accent, drops with weight + shake
  ctx.save(); shake(ctx, u, 2, 14);
  word(ctx, 'BELOW', cx, s.y + 640, 250, C.accent, 1.8, u, { exitAt: ex + 0.1 });
  ctx.restore();
  word(ctx, 'THE SEA.', cx, s.y + 780, 130, C.paper, 2.5, u, { exitAt: null });
}

// --------------------------------------------------------------- S2 depth (4..16)
function sDepth(ctx, u) {
  fill(ctx, C.navy);
  const z = 1 + 0.06 * E.inOutSine(prog(u, 4, 16)); ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-W / 2, -H / 2);
  const seaY = s.y + 360;                         // sea level line
  // water fills above the city: the ocean is "up there"
  const fillK = E.outCubic(prog(u, 4, 5));
  ctx.fillStyle = C.water; ctx.globalAlpha = 0.9;
  ctx.fillRect(0, 0, W, lerp(H * 0.62, seaY, fillK)); ctx.globalAlpha = 1;
  waves(ctx, -9999, u, C.water, C.water2);        // no-op guard
  // ocean surface line
  const lk = springU(u, 4.5, SPRING.snappy);
  ctx.strokeStyle = C.paper; ctx.lineWidth = 6; ctx.setLineDash([22, 16]); ctx.lineDashOffset = -u * 40;
  ctx.beginPath(); ctx.moveTo(lerp(cx, 40, lk), seaY); ctx.lineTo(lerp(cx, W - 40, lk), seaY); ctx.stroke(); ctx.setLineDash([]);
  if (lk > 0.05) text(ctx, 'OCEAN LEVEL  ·  0 m', 56, seaY - 22, font(40, 700, UI), C.paper);
  // city sinks below the line
  const drop = E.outBack(prog(u, 5.5, 8), 1.2);
  const base = lerp(seaY + 40, seaY + 560, drop);
  // depth gauge on the right
  const gx = W - 200;
  ctx.strokeStyle = C.mute; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx, seaY); ctx.lineTo(gx, seaY + 640); ctx.stroke();
  for (let i = 0; i <= 8; i++) { const y = seaY + i * 80; ctx.beginPath(); ctx.moveTo(gx - (i % 2 ? 14 : 26), y); ctx.lineTo(gx, y); ctx.stroke(); }
  const arrowY = lerp(seaY, seaY + 560, drop);
  ctx.fillStyle = C.accent; ctx.beginPath(); ctx.moveTo(gx + 8, arrowY); ctx.lineTo(gx + 40, arrowY - 18); ctx.lineTo(gx + 40, arrowY + 18); ctx.fill();
  // city
  ctx.save(); ctx.globalAlpha = clamp(prog(u, 4.6, 5.2));
  skyline(ctx, 70, base, 1.05, C.paper); ctx.restore();
  // ground
  ctx.fillStyle = '#16203F'; ctx.fillRect(0, base, W, H - base);
  // bubbles rising through the water above the city (constant motion)
  for (let i = 0; i < 26; i++) {
    const speed = 0.6 + hash01(i, 4) * 0.8, ph = hash01(i, 5);
    const yy = base - ((u * speed * 120 + ph * 900) % Math.max(60, base - seaY));
    const xx = 60 + hash01(i, 6) * (W - 300) + Math.sin(u * 2 + i) * 12;
    ctx.beginPath(); ctx.arc(xx, yy, 4 + hash01(i, 7) * 9, 0, TAU); ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 3; ctx.stroke();
  }
  // counter
  const cnt = Math.round(-28 * E.outCubic(prog(u, 6, 9)));
  if (u > 6) {
    const k = springU(u, 12, SPRING.bouncy);
    const size = 200 + 40 * Math.max(0, k - 1 + 1) * (u > 12 ? 1 : 0) - (u > 12 ? 40 : 0);
    text(ctx, `${cnt} m`, cx - 60, base + 260, font(u > 9 ? 240 : 200, 800, DISPLAY), u >= 9 ? C.accent : C.paper, 'center', -6);
  }
  if (u > 10) word(ctx, 'BAKU, AZERBAIJAN', cx - 60, base + 380, 72, C.paper, 10, u, { fam: UI, weight: 700, track: 0.02 });
  if (u > 11.5) {
    const a = clamp(prog(u, 11.5, 12));
    ctx.globalAlpha = a; text(ctx, 'the lowest capital on Earth', cx - 60, base + 470, font(58, 700, UI), C.accent, 'center'); ctx.globalAlpha = 1;
  }
}

// --------------------------------------------------------------- S3 chart (16..28)
function sChart(ctx, u) {
  fill(ctx, C.paper);
  const slide = E.outCubic(prog(u, 16, 17));
  ctx.save(); ctx.translate((1 - slide) * W, 0);
  text(ctx, 'HOW LOW?', s.x, s.y + 110, font(130, 800, DISPLAY), C.ink, 'left', -4);
  if (u > 23) { const a = clamp(prog(u, 23, 23.6)); ctx.globalAlpha = a; text(ctx, 'below the ocean, in metres', s.x, s.y + 175, font(44, 600, UI), '#5A6385'); ctx.globalAlpha = 1; }
  const top = s.y + 210, maxH = 820, max = 430;
  const bars = [[18, 'Dead Sea shore', -430, '#2A3560'], [20, 'Jericho', -258, '#46518A'], [22, 'BAKU', -28, C.accent]];
  const bw = 250, gap = 34, x0 = s.x + 10;
  ctx.fillStyle = C.ink; ctx.fillRect(s.x, top, s.w, 6);
  text(ctx, '0 m', s.x + s.w - 4, top - 14, font(38, 700, UI), C.ink, 'right');
  bars.forEach(([b, name, v, col], i) => {
    const k = springU(u, b, SPRING.bouncy); if (k <= 0) return;
    const h = (-v / max) * maxH * k, x = x0 + i * (bw + gap);
    rrect(ctx, x, top + 6, bw, Math.max(6, h), 18); ctx.fillStyle = col; ctx.fill();
    text(ctx, `${v} m`, x + bw / 2, top + 6 + Math.max(h, 30) + 80, font(72, 800, DISPLAY), i === 2 ? C.accent : C.ink, 'center');
    text(ctx, name, x + bw / 2, top + 6 + Math.max(h, 30) + 140, font(44, 700, UI), C.ink, 'center');
  });
  // crown on Baku: lowest CAPITAL
  const ck = springU(u, 24, SPRING.bouncy);
  if (ck > 0) {
    const bx = x0 + 2 * (bw + gap) + bw / 2 - 60, by = top + 330;
    ctx.save(); ctx.translate(bx, by - 40 * (1 - ck)); ctx.scale(ck, ck);
    rrect(ctx, -170, -70, 340, 170, 40); ctx.fillStyle = C.accent; ctx.fill();
    text(ctx, 'LOWEST', 0, -2, font(56, 800, DISPLAY), C.paper, 'center'); text(ctx, 'CAPITAL', 0, 62, font(56, 800, DISPLAY), C.paper, 'center'); ctx.restore();
  }
  ctx.restore();
}

// --------------------------------------------------------------- S4 twist (28..42)
function sTwist(ctx, u) {
  fill(ctx, C.deep);
  const slide = E.outCubic(prog(u, 26, 26.6));
  ctx.save(); ctx.translate(-(1 - slide) * W, 0);
  word(ctx, 'AND THE CASPIAN', cx, s.y + 220, 104, C.paper, 26.3, u);
  word(ctx, 'ISN’T A SEA.', cx, s.y + 350, 104, C.paper, 27.4, u);
  // big LAKE stamp
  if (u > 29.8) {
    const k = springU(u, 30, SPRING.wobbly);
    ctx.save(); ctx.translate(cx, s.y + 600); ctx.rotate(-0.06 * k); ctx.scale(k, k);
    rrect(ctx, -380, -150, 760, 240, 40); ctx.fillStyle = C.water2; ctx.fill();
    text(ctx, 'IT’S A LAKE', 0, 30, font(130, 800, DISPLAY), C.paper, 'center', -4);
    ctx.restore();
  }
  if (u > 31) word(ctx, 'the biggest on Earth', cx, s.y + 830, 70, C.accent, 31, u, { fam: UI, weight: 700, track: 0.01 });
  // size compare: lake blob vs boxes (countries)
  if (u > 33) {
    const n = Math.round(371000 * E.outCubic(prog(u, 33, 35.5)));
    const k = springU(u, 33, SPRING.snappy);
    ctx.globalAlpha = Math.min(1, k);
    text(ctx, n.toLocaleString('en-US') + ' km\u00B2', cx, s.y + 1060, font(130, 800, DISPLAY), C.paper, 'center', -4);
    ctx.globalAlpha = 1;
    if (u > 36) word(ctx, 'bigger than all of Germany', cx, s.y + 1160, 66, C.accent, 36, u, { fam: UI, weight: 700, track: 0 });
  }
  ctx.restore();
}

// --------------------------------------------------------------- S5 end (42..48)
function sEnd(ctx, u) {
  fill(ctx, C.navy);
  waves(ctx, lerp(H, H * 0.7, E.outCubic(prog(u, 40, 41.5))), u, C.water, C.water2, 14);
  const k = springU(u, 40.5, SPRING.bouncy);
  ctx.save(); ctx.translate(cx, s.y + 470); ctx.scale(k, k);
  // logo: ? with ringed planet dot
  text(ctx, '?', -10, 60, font(300, 800, DISPLAY), C.accent, 'center');
  ctx.restore();
  word(ctx, 'WHYVERSE', cx, s.y + 700, 130, C.paper, 41, u);
  if (u > 44.5) word(ctx, 'This capital is below the sea\u2026', cx, s.y + 1000, 58, C.accent, 44.5, u, { fam: UI, weight: 700, track: 0 });
  if (u > 42) word(ctx, 'Follow for one wild fact a day', cx, s.y + 800, 56, C.paper, 42, u, { fam: UI, weight: 600, track: 0 });
}

M.film({
  fonts: [font(100, 800, DISPLAY), font(40, 700, UI)],
  hits: HITS,
  draw(ctx, u) {
    if (u < 4) sHook(ctx, u);
    else if (u < 16) sDepth(ctx, u);
    else if (u < 26) sChart(ctx, u);
    else if (u < 40) sTwist(ctx, u);
    else sEnd(ctx, u);
  },
  post(ctx, u) {   // grain
    const n = 900;
    for (let i = 0; i < n; i++) {
      const x = hash01(i, Math.floor(u * 30)) * W, y = hash01(i + 7, Math.floor(u * 30) + 3) * H;
      ctx.fillStyle = `rgba(255,255,255,${0.025 + 0.03 * hash01(i, 9)})`; ctx.fillRect(x, y, 2, 2);
    }
  },
});
