// Lixtenşteyn 160 km² — @bilirdinizmi_az 18:30 animated reel, 12 Nov 2026. Pure function of time.
// 120 bpm grid (1 beat = 0.5 s), 48 beats = 24 s. Look: night match-day pitch (green stripes, chalk lines,
// yellow-card accent). No music; non-melodic SFX only (impact, thud, click, tick, whoosh, sub, type, crash).
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, springU, SPRING, font, layout, glyph, text, fill, rrect, shake, hash01, clamp, fitSize, TAU } = M;

const C = { pitch: '#0C3A2B', pitch2: '#0F4533', deep: '#072219', chalk: '#F3F0E6', mute: '#9FC2B2', acc: '#FFC93C', ink: '#0B1F18' };
const D = 'Display', UI = 'UI';
const s = FORMAT.safe;               // x72 y250 w858 h1240
const cx = s.x + s.w / 2;

const HITS = [
  [0, 'hook 160', 'impact'], [1.0, 'rival line', 'click'], [2.2, 'LIXTENŞTEYN', 'thud'],
  [3.8, 'whip to squares', 'whoosh', { len: 0.4, from: 500, to: 2200 }],
  [4.0, 'AZ square', 'thud'], [5.6, 'tiny square', 'click'], [6.6, '500x', 'thud'],
  [9.8, 'whip to Baku', 'whoosh', { len: 0.4, from: 2200, to: 600 }],
  [10.0, 'Baku square', 'thud'], [11, 'squares fill', 'type', { len: 0.8, n: 13 }], [13.6, '13 lands', 'impact'],
  [15.8, 'whip to people', 'whoosh', { len: 0.4, from: 600, to: 2400 }],
  [16.2, 'counter', 'type', { len: 1.2, n: 12 }], [18.6, '41 000', 'thud'], [19.6, 'Vaduz 6 000', 'click'],
  [21.8, 'whip to stadium', 'whoosh', { len: 0.4, from: 2400, to: 600, pan: 0.3 }],
  [22.0, 'stadium', 'sub', { len: 0.5 }], [23.2, 'people pour in', 'type', { len: 1.1, n: 14 }], [25.4, 'still seats', 'thud'],
  [27.8, 'whip to army', 'whoosh', { len: 0.4, from: 500, to: 2000 }],
  [28.0, 'ORDU YOXDUR', 'impact'], [30, '1868 stamp', 'thud'],
  [32.8, 'whip to airport', 'whoosh', { len: 0.4, from: 2000, to: 500 }],
  [33.4, 'plane', 'whoosh', { len: 0.7, from: 300, to: 1600 }], [34.6, 'cross', 'thud'],
  [37.8, 'whip to scoreboard', 'whoosh', { len: 0.4, from: 600, to: 2400 }],
  [38.0, 'scoreboard', 'impact'], [39.4, 'flip ?', 'click'], [39.8, 'flip ?', 'click'], [41, 'sabah', 'tick'],
  [43, 'end card', 'impact'], [44, 'İZLƏ', 'click'], [46, 'loop line', 'tick'],
];

// ---------------------------------------------------------------- helpers
function fit(ctx, str, max, wmax = s.w, fam = D, wt = 700) { return Math.min(max, fitSize(ctx, str, wt, fam, wmax, max, -0.02)); }
// kinetic word: glyphs spring up with overlap; optional exit upward
function word(ctx, str, x, y, size, color, u0, u, { wt = 700, fam = D, exitAt = null, align = 'center', track = -0.02, stag = 0.03 } = {}) {
  const f = font(size, wt, fam), L = layout(ctx, str, f, track * size);
  const x0 = align === 'center' ? x - L.width / 2 : x;
  L.glyphs.forEach((g, j) => {
    const k = springU(u, u0 + j * stag, SPRING.bouncy);
    if (k <= 0.001) return;
    let dy = (1 - k) * size * 0.8;
    if (exitAt !== null) dy -= E.inBack(prog(u, exitAt + j * 0.015, exitAt + 0.3 + j * 0.015), 1.6) * H;
    glyph(ctx, g.ch, x0 + g.cx, y + dy, f, color, Math.min(1, k), k);
  });
}
// the pitch: mowing stripes + chalk lines, always drifting (camera never still)
function pitch(ctx, u, { drift = 1, tilt = 0 } = {}) {
  fill(ctx, C.pitch);
  ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(tilt); ctx.translate(-W / 2, -H / 2);
  const sw = 170, off = ((u * 22 * drift) % (sw * 2) + sw * 2) % (sw * 2);
  ctx.fillStyle = C.pitch2;
  for (let y = -sw * 4 + off; y < H + sw * 2; y += sw * 2) ctx.fillRect(-300, y, W + 600, sw);
  ctx.strokeStyle = 'rgba(243,240,230,0.16)'; ctx.lineWidth = 8;
  const cy = H * 0.5 + Math.sin(u * 0.2) * 60;
  ctx.beginPath(); ctx.moveTo(-300, cy); ctx.lineTo(W + 300, cy); ctx.stroke();
  ctx.beginPath(); ctx.arc(W / 2, cy, 260, 0, TAU); ctx.stroke();
  ctx.restore();
  const g = ctx.createRadialGradient(W / 2, H * 0.45, 200, W / 2, H * 0.5, H * 0.75);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,0.55)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}
// whip-pan in: dir +1 from right
function panIn(ctx, u, u0, dir = 1) { const k = E.outCubic(prog(u, u0 - 0.35, u0 + 0.25)); ctx.translate(dir * (1 - k) * W, 0); }
function pill(ctx, str, x, y, size, bg, fg, k = 1) {
  if (k <= 0) return;
  const f = font(size, 600, UI); ctx.font = f; const w = ctx.measureText(str).width + size * 1.1;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  rrect(ctx, -w / 2, -size * 1.05, w, size * 1.5, size * 0.75); ctx.fillStyle = bg; ctx.fill();
  text(ctx, str, 0, 0, f, fg, 'center'); ctx.restore();
}
function person(ctx, x, y, r, col) { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y - r * 1.6, r * 0.62, 0, TAU); ctx.fill(); rrect(ctx, x - r * 0.75, y - r * 0.85, r * 1.5, r * 1.4, r * 0.6); ctx.fill(); }

// ---------------------------------------------------------------- S1 hook (0..4)
function sHook(ctx, u) {
  pitch(ctx, u);
  const z = 1.08 - 0.08 * E.outCubic(prog(u, -1, 4));
  ctx.save(); ctx.translate(cx, H * 0.45); ctx.scale(z, z); ctx.translate(-cx, -H * 0.45);
  const ex = 3.55;
  word(ctx, 'MİLLİMİZİN SABAHKI', cx, s.y + 170, fit(ctx, 'MİLLİMİZİN SABAHKI', 92), C.chalk, 1.0, u, { exitAt: ex });
  word(ctx, 'RƏQİBİ', cx, s.y + 270, 92, C.chalk, 1.3, u, { exitAt: ex + 0.03 });
  ctx.save(); shake(ctx, u, 0, 22);
  const k = springU(u, -0.3, SPRING.bouncy);
  const big = fit(ctx, '160 km²', 250, s.w * 0.86);
  ctx.save(); ctx.translate(cx, s.y + 640); ctx.scale(k, k);
  text(ctx, '160 km²', 0, 0, font(big, 700, D), C.acc, 'center', -6);
  ctx.restore(); ctx.restore();
  if (u > 2.1) {
    const k2 = springU(u, 2.2, SPRING.snappy);
    const sz = fit(ctx, 'LİXTENŞTEYN', 150);
    ctx.save(); ctx.translate(cx, s.y + 860); ctx.scale(1 + (1 - k2) * 0.6, k2);
    text(ctx, 'LİXTENŞTEYN', 0, 0, font(sz, 700, D), C.chalk, 'center', -3); ctx.restore();
  }
  ctx.restore();
}

// ---------------------------------------------------------------- S2 area squares (4..10)
const AZ_SIDE = 760, LI_SIDE = AZ_SIDE * Math.sqrt(160 / 86600);   // ≈ 32.7 px: true area scale
function sSquares(ctx, u) {
  pitch(ctx, u, { tilt: -0.04 });
  ctx.save(); panIn(ctx, u, 4, 1);
  const zk = E.inOutCubic(prog(u, 7.6, 9.6));
  const zs = 3.2 ** zk;
  const top = s.y + 380;
  const qx = cx + AZ_SIDE / 2 - LI_SIDE - 60, qy = top + AZ_SIDE - LI_SIDE - 60;
  const px = lerp(cx, qx + LI_SIDE / 2, zk), py = lerp(top + AZ_SIDE / 2, qy + LI_SIDE / 2, zk);
  ctx.save(); ctx.translate(px, py); ctx.scale(zs, zs); ctx.translate(-px, -py);
  const k = springU(u, 3.9, SPRING.snappy);
  const side = AZ_SIDE * k, x0 = cx - side / 2, y0 = top + (AZ_SIDE - side) / 2;
  ctx.fillStyle = 'rgba(243,240,230,0.10)'; ctx.fillRect(x0, y0, side, side);
  ctx.strokeStyle = C.chalk; ctx.lineWidth = 6; ctx.strokeRect(x0, y0, side, side);
  if (k > 0.6) text(ctx, 'AZƏRBAYCAN', cx, top + 100, font(70, 700, D), C.chalk, 'center', -1);
  if (k > 0.6) text(ctx, '86 600 km²', cx, top + 170, font(64, 600, UI), C.chalk, 'center');
  const k2 = springU(u, 5.6, SPRING.wobbly);
  if (k2 > 0) {
    ctx.save(); ctx.translate(qx + LI_SIDE / 2, qy + LI_SIDE / 2); ctx.scale(k2, k2);
    ctx.fillStyle = C.acc; ctx.fillRect(-LI_SIDE / 2, -LI_SIDE / 2, LI_SIDE, LI_SIDE); ctx.restore();
    const pr = (46 + 14 * Math.sin(u * 6)) * Math.min(1, k2);
    ctx.strokeStyle = C.acc; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(qx + LI_SIDE / 2, qy + LI_SIDE / 2, pr, 0, TAU); ctx.stroke();
  }
  ctx.restore();
  if (u > 6.4) {
    word(ctx, '500 DƏFƏDƏN', cx, s.y + 140, fit(ctx, '500 DƏFƏDƏN', 140), C.acc, 6.6, u, { exitAt: 9.65 });
    word(ctx, 'ÇOX KİÇİKDİR', cx, s.y + 270, fit(ctx, 'ÇOX KİÇİKDİR', 116), C.chalk, 6.9, u, { exitAt: 9.7 });
  } else {
    word(ctx, 'ƏRAZİ MÜQAYİSƏSİ', cx, s.y + 200, fit(ctx, 'ƏRAZİ MÜQAYİSƏSİ', 84), C.chalk, 3.9, u, { exitAt: 6.1 });
  }
  if (u > 6.0) {
    ctx.globalAlpha = 1 - clamp(prog(u, 9.4, 9.7));
    pill(ctx, 'sarı kvadrat = Lixtenşteyn', cx, s.y + 1225, 50, C.acc, C.ink, springU(u, 6.0, SPRING.bouncy)); ctx.globalAlpha = 1;
  }
  ctx.restore();
}

// ---------------------------------------------------------------- S3 Baku = 13 (10..16)
function sBaku(ctx, u) {
  pitch(ctx, u, { tilt: 0.03, drift: -1 });
  ctx.save(); panIn(ctx, u, 10, -1);
  const z = 1 + 0.05 * E.inOutSine(prog(u, 10, 16)); ctx.translate(cx, H / 2); ctx.scale(z, z); ctx.translate(-cx, -H / 2);
  const side = 620, x0 = cx - side / 2, y0 = s.y + 440;
  const k = springU(u, 9.85, SPRING.snappy);
  ctx.save(); ctx.translate(cx, y0 + side / 2); ctx.scale(k, k); ctx.translate(-cx, -(y0 + side / 2));
  ctx.fillStyle = 'rgba(243,240,230,0.10)'; ctx.fillRect(x0, y0, side, side);
  ctx.strokeStyle = C.chalk; ctx.lineWidth = 6; ctx.strokeRect(x0, y0, side, side);
  ctx.restore();
  if (k > 0.5) text(ctx, 'BAKI · 2 140 km²', cx, y0 - 34, font(62, 600, UI), C.chalk, 'center');
  const q = 130, cols = 4, gap = (side - cols * q) / (cols + 1);
  let n = 0;
  for (let i = 0; i < 13; i++) {
    const kk = springU(u, 11 + i * 0.12, SPRING.bouncy); if (kk <= 0) continue; n = i + 1;
    const c = i % cols, r = Math.floor(i / cols);
    const x = x0 + gap + c * (q + gap), y = y0 + gap + r * (q + gap);
    ctx.save(); ctx.translate(x + q / 2, y + q / 2); ctx.scale(kk, kk); rrect(ctx, -q / 2, -q / 2, q, q, 6); ctx.fillStyle = C.acc; ctx.fill(); ctx.restore();
  }
  word(ctx, 'BAKIYA', cx, s.y + 120, 110, C.chalk, 9.9, u);
  if (u > 11) {
    const kk = u > 13.6 ? springU(u, 13.6, SPRING.wobbly) : 1;
    ctx.save(); ctx.translate(cx, s.y + 290); ctx.scale(kk, kk);
    text(ctx, `${n} LİXTENŞTEYN`, 0, 0, font(fit(ctx, '13 LİXTENŞTEYN', 120), 700, D), C.acc, 'center', -3); ctx.restore();
  }
  if (u > 13.8) word(ctx, 'SIĞAR', cx, y0 + side + 150, 130, C.chalk, 13.8, u);
  ctx.restore();
}

// ---------------------------------------------------------------- S4 population (16..22)
function sPeople(ctx, u) {
  pitch(ctx, u, { tilt: -0.02 });
  ctx.save(); panIn(ctx, u, 16, 1);
  const cols = 7, r = 30, gx = 112, gy = 112, x0 = cx - ((cols - 1) * gx) / 2, y0 = s.y + 470;
  for (let i = 0; i < 41; i++) {
    const kk = springU(u, 15.85 + i * 0.05, SPRING.bouncy); if (kk <= 0) continue;
    const c = i % cols, rr = Math.floor(i / cols);
    const vaduz = i < 6 && u > 19.6;
    ctx.save(); ctx.translate(x0 + c * gx, y0 + rr * gy); ctx.scale(kk, kk);
    person(ctx, 0, 30, r, vaduz ? C.acc : C.chalk); ctx.restore();
  }
  const cnt = Math.round(41000 * E.outCubic(prog(u, 15.85, 18.6)) / 100) * 100;
  const str = cnt.toLocaleString('en-US').replace(/,/g, ' ');
  const kk = u > 18.6 ? springU(u, 18.6, SPRING.wobbly) : 1;
  ctx.save(); ctx.translate(cx, s.y + 200); ctx.scale(kk, kk);
  text(ctx, (u > 18.6 ? '≈ ' : '') + str, 0, 0, font(180, 700, D), C.acc, 'center', -6); ctx.restore();
  word(ctx, 'BÜTÜN ÖLKƏNİN ƏHALİSİ', cx, s.y + 310, fit(ctx, 'BÜTÜN ÖLKƏNİN ƏHALİSİ', 70, s.w, UI, 600), C.chalk, 15.85, u, { fam: UI, wt: 600, stag: 0.015 });
  if (u > 19.6) pill(ctx, 'paytaxt Vaduz: cəmi 6 000', cx, s.y + 1240, 48, C.acc, C.ink, springU(u, 19.6, SPRING.bouncy));
  ctx.restore();
}

// ---------------------------------------------------------------- S5 stadium twist (22..28)
function sStadium(ctx, u) {
  fill(ctx, C.deep);
  ctx.save(); panIn(ctx, u, 22, -1);
  const z = 1.12 - 0.12 * E.outCubic(prog(u, 22, 28)); ctx.translate(cx, H * 0.55); ctx.scale(z, z); ctx.translate(-cx, -H * 0.55);
  const ox = cx, oy = s.y + 760, RX = 420, RY = 330;
  const fillK = clamp(prog(u, 23.2, 25.4));
  for (let ring = 0; ring < 6; ring++) {
    const rx = RX - ring * 36, ry = RY - ring * 30, seats = 70 - ring * 6;
    for (let i = 0; i < seats; i++) {
      const a = (i / seats) * TAU - Math.PI / 2;
      const filled = hash01(ring * 97 + i, 5) < 0.6 * fillK;
      ctx.fillStyle = filled ? C.acc : 'rgba(243,240,230,0.22)';
      ctx.beginPath(); ctx.arc(ox + Math.cos(a) * rx, oy + Math.sin(a) * ry, 10, 0, TAU); ctx.fill();
    }
  }
  ctx.fillStyle = C.pitch2; rrect(ctx, ox - 190, oy - 120, 380, 240, 10); ctx.fill();
  ctx.strokeStyle = 'rgba(243,240,230,0.5)'; ctx.lineWidth = 4; ctx.strokeRect(ox - 190, oy - 120, 380, 240);
  ctx.beginPath(); ctx.moveTo(ox, oy - 120); ctx.lineTo(ox, oy + 120); ctx.stroke(); ctx.beginPath(); ctx.arc(ox, oy, 46, 0, TAU); ctx.stroke();
  word(ctx, 'BÜTÜN ÖLKƏ', cx, s.y + 110, 120, C.chalk, 21.85, u);
  word(ctx, 'BAKI OLİMPİYA', cx, s.y + 220, fit(ctx, 'BAKI OLİMPİYA', 90), C.acc, 22.2, u, { stag: 0.02 });
  word(ctx, 'STADİONUNA SIĞAR', cx, s.y + 315, fit(ctx, 'STADİONUNA SIĞAR', 90), C.acc, 22.4, u, { stag: 0.02 });
  if (u > 24) { ctx.save(); ctx.translate(ox, oy); const kk = springU(u, 24, SPRING.bouncy); ctx.scale(kk, kk); text(ctx, '68 000+ yer', 0, 18, font(58, 700, D), C.chalk, 'center'); ctx.restore(); }
  if (u > 25.4) word(ctx, 'və hələ boş yer də qalar', cx, s.y + 1200, 64, C.chalk, 25.4, u, { fam: UI, wt: 600, stag: 0.012 });
  ctx.restore();
}

// ---------------------------------------------------------------- S6 army (28..33)
function sArmy(ctx, u) {
  pitch(ctx, u, { tilt: 0.05, drift: 1.5 });
  ctx.save(); panIn(ctx, u, 28, 1); shake(ctx, u, 28.2, 18);
  const z = 1 + 0.06 * E.inOutSine(prog(u, 28, 33)); ctx.translate(cx, H / 2); ctx.scale(z, z); ctx.translate(-cx, -H / 2);
  word(ctx, 'ORDUSU', cx, s.y + 400, fit(ctx, 'ORDUSU', 190), C.chalk, 27.7, u, { exitAt: 32.75 });
  word(ctx, 'YOXDUR', cx, s.y + 590, fit(ctx, 'YOXDUR', 190), C.acc, 28.0, u, { exitAt: 32.8 });
  const k = springU(u, 30, SPRING.wobbly);
  if (k > 0) {
    ctx.save(); ctx.translate(cx, s.y + 860); ctx.rotate(-0.08); ctx.scale(k, k);
    ctx.strokeStyle = C.chalk; ctx.lineWidth = 10; rrect(ctx, -340, -115, 680, 190, 24); ctx.stroke();
    text(ctx, '1868-ci ildə', 0, 18, font(92, 700, D), C.chalk, 'center', -2);
    ctx.restore();
  }
  if (u > 31) word(ctx, 'onu ləğv ediblər', cx, s.y + 1110, 78, C.mute, 31, u, { fam: UI, wt: 600, stag: 0.012, exitAt: 32.75 });
  ctx.restore();
}

// ---------------------------------------------------------------- S7 airport (33..38)
function plane(ctx, x, y, sc, rot) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.fillStyle = C.chalk;
  rrect(ctx, -110, -16, 220, 32, 16); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-10, -12); ctx.lineTo(-60, -110); ctx.lineTo(-30, -110); ctx.lineTo(40, -12); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-10, 12); ctx.lineTo(-60, 110); ctx.lineTo(-30, 110); ctx.lineTo(40, 12); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-95, -10); ctx.lineTo(-125, -55); ctx.lineTo(-105, -55); ctx.lineTo(-75, -10); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-95, 10); ctx.lineTo(-125, 55); ctx.lineTo(-105, 55); ctx.lineTo(-75, 10); ctx.fill();
  ctx.restore();
}
function sAirport(ctx, u) {
  fill(ctx, C.deep);
  ctx.save(); panIn(ctx, u, 33, -1);
  ctx.fillStyle = 'rgba(243,240,230,0.25)';
  for (let i = 0; i < 10; i++) { const y = ((i * 230 + u * 180) % (230 * 10)) - 230; ctx.fillRect(cx - 14, y, 28, 120); }
  const fly = E.inOutCubic(prog(u, 33.0, 35.0));
  plane(ctx, lerp(-260, cx, fly), lerp(s.y + 1000, s.y + 700, fly), 1.7, lerp(-0.6, -0.25, fly));
  const k = springU(u, 34.6, SPRING.snappy);
  if (k > 0) {
    ctx.save(); ctx.translate(cx, s.y + 700); ctx.strokeStyle = C.acc; ctx.lineWidth = 36; ctx.lineCap = 'round';
    const L = 250 * k;
    ctx.beginPath(); ctx.moveTo(-L, -L); ctx.lineTo(L, L); ctx.stroke(); ctx.beginPath(); ctx.moveTo(L, -L); ctx.lineTo(-L, L); ctx.stroke(); ctx.restore();
  }
  word(ctx, 'HAVA LİMANI', cx, s.y + 150, fit(ctx, 'HAVA LİMANI', 140), C.chalk, 32.8, u, { exitAt: 37.75 });
  word(ctx, 'DA YOXDUR', cx, s.y + 290, fit(ctx, 'DA YOXDUR', 140), C.acc, 34.6, u, { exitAt: 37.8 });
  ctx.restore();
}

// ---------------------------------------------------------------- S8 scoreboard payoff (38..43)
function flipDigit(ctx, x, y, u, u0) {
  const k = clamp(prog(u, u0, u0 + 0.4));
  rrect(ctx, x - 95, y - 140, 190, 240, 18); ctx.fillStyle = '#10261E'; ctx.fill();
  ctx.save(); ctx.translate(x, y); ctx.scale(1, Math.abs(Math.cos(k * Math.PI)) * 0.98 + 0.02);
  text(ctx, k < 0.5 ? '0' : '?', 0, 60, font(190, 700, D), C.acc, 'center'); ctx.restore();
  ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(x - 95, y - 22, 190, 4);
}
function sScore(ctx, u) {
  pitch(ctx, u, { drift: 0.6 });
  ctx.save(); panIn(ctx, u, 38, 1);
  const z = 1.06 - 0.06 * E.outCubic(prog(u, 38, 43)); ctx.translate(cx, H / 2); ctx.scale(z, z); ctx.translate(-cx, -H / 2);
  const k = springU(u, 37.85, SPRING.snappy);
  ctx.save(); ctx.translate(cx, s.y + 640); ctx.scale(k, k); ctx.translate(-cx, -(s.y + 640));
  rrect(ctx, s.x, s.y + 400, s.w, 520, 36); ctx.fillStyle = '#06150F'; ctx.fill();
  ctx.strokeStyle = C.acc; ctx.lineWidth = 6; ctx.stroke();
  text(ctx, 'MİLLƏTLƏR LİQASI', cx, s.y + 480, font(58, 600, UI), C.mute, 'center', 2);
  flipDigit(ctx, cx - 160, s.y + 660, u, 39.4); flipDigit(ctx, cx + 160, s.y + 660, u, 39.8);
  text(ctx, ':', cx, s.y + 700, font(150, 700, D), C.chalk, 'center');
  text(ctx, 'LİXTENŞTEYN', cx - 200, s.y + 860, font(50, 700, D), C.chalk, 'center');
  text(ctx, 'AZƏRBAYCAN', cx + 200, s.y + 860, font(50, 700, D), C.chalk, 'center');
  ctx.restore();
  word(ctx, 'SABAH AXŞAM', cx, s.y + 150, fit(ctx, 'SABAH AXŞAM', 124), C.chalk, 37.85, u, { exitAt: 42.75 });
  word(ctx, 'VADUZDA', cx, s.y + 290, 124, C.acc, 38.1, u, { exitAt: 42.8 });
  if (u > 41) word(ctx, 'Hesabı şərhə yaz!', cx, s.y + 1110, 78, C.chalk, 41, u, { fam: UI, wt: 600, stag: 0.015 });
  ctx.restore();
}

// ---------------------------------------------------------------- S9 end card (43..48)
function sEnd(ctx, u) {
  pitch(ctx, u, { drift: 0.4 });
  ctx.save(); panIn(ctx, u, 43, -1);
  const k = springU(u, 42.8, SPRING.bouncy);
  ctx.save(); ctx.translate(cx, s.y + 480); ctx.scale(k, k);
  ctx.fillStyle = C.acc; ctx.beginPath(); ctx.arc(0, -40, 150, 0, TAU); ctx.fill();
  text(ctx, '?', 0, 30, font(220, 700, D), C.ink, 'center'); ctx.restore();
  word(ctx, '@bilirdinizmi_az', cx, s.y + 770, fit(ctx, '@bilirdinizmi_az', 100), C.chalk, 42.9, u, { stag: 0.02 });
  pill(ctx, 'İZLƏ', cx, s.y + 960, 90, C.acc, C.ink, springU(u, 44, SPRING.wobbly));
  if (u > 46) word(ctx, 'cəmi 160 km²… bəs hesab?', cx, s.y + 1140, fit(ctx, 'cəmi 160 km²… bəs hesab?', 74, s.w, UI, 600), C.mute, 46, u, { fam: UI, wt: 600, stag: 0.012 });
  ctx.restore();
}

M.film({
  fonts: [font(100, 700, D), font(40, 600, UI)],
  hits: HITS,
  draw(ctx, u) {
    if (u < 4) sHook(ctx, u);
    else if (u < 10) sSquares(ctx, u);
    else if (u < 16) sBaku(ctx, u);
    else if (u < 22) sPeople(ctx, u);
    else if (u < 28) sStadium(ctx, u);
    else if (u < 33) sArmy(ctx, u);
    else if (u < 38) sAirport(ctx, u);
    else if (u < 43) sScore(ctx, u);
    else sEnd(ctx, u);
  },
  post(ctx, u) {
    for (let i = 0; i < 700; i++) {
      const x = hash01(i, Math.floor(u * 30)) * W, y = hash01(i + 7, Math.floor(u * 30) + 3) * H;
      ctx.fillStyle = `rgba(255,255,255,${0.02 + 0.03 * hash01(i, 9)})`; ctx.fillRect(x, y, 2, 2);
    }
  },
});
