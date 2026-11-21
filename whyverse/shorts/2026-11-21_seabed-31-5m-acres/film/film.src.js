// "31.5 million acres of seabed, for $6 million." — Whyverse 19:00 Baku trend Short, Sat 21 Nov 2026.
// First US deep-sea mining lease sale (PACM-1, Thu 19 Nov 2026, off American Samoa): Wetstone U.S. Ventures, the only bidder,
// provisionally won two areas = 31.5 million acres for $6M (~19 cents an acre). Leases allow exploration only; a Hawaii federal
// judge (16 Nov) found the wildlife (ESA) review unlawful but did not block the sale.
// Look: DEEP-SEA SONAR — dark ocean gradient, cyan sonar line art, amber numbers; a LEASE BOARD (bottom) runs the whole time.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, hash01, clamp, TAU } = M;

const TIMING = __TIMING__;
const C = {
  top: '#0E4A63', mid: '#082C40', deep: '#03121D', cyan: '#4FE3D6', cyanD: 'rgba(79,227,214,0.35)', amb: '#FFC145',
  white: '#F2FBFF', grey: '#8FB3C2', red: '#FF5A4E', sand: '#2A4652', rock: '#2B3F48', rockHi: '#6A8590', land: '#3FAF7A',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const slam = (t, t0, from = 1.8) => (t < t0 ? 0 : Math.min(1.06, lerp(from, 1, E.outBack(prog(t, t0, t0 + 0.28)))));
const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const LID = (id) => TIMING.lines.find((l) => l.id === id).t0;
const END = TIMING.dur + 0.4;

const S = { A: 0, B: LID('l2') - 0.12, C: LID('l3') - 0.12, D: LID('l4') - 0.12, E: LID('l5') - 0.12, F: LID('l6') - 0.12, G: LID('l7') - 0.12, Hh: LID('l8') - 0.12, I: LID('l9') - 0.12 };
const B = (t) => t / 0.5;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.3, from, to }];
const HITS = [
  [B(0.03), 'hook', 'pop'], [B(T('acres') - 0.05), 'grid', 'type', { len: 1.0, n: 10 }], [B(T('$6 million.')), 'price tag', 'pop'],
  WH(S.B, 600, 2000), [B(T('19 cents')), 'coin', 'coins'], [B(T('acre.')), 'acre tile', 'click'],
  WH(S.C, 2000, 600), [B(T('first')), 'FIRST', 'click'], [B(T('deep-sea') + 0.2), 'sonar ping', 'tick'], [B(T('Samoa.')), 'islands', 'pop'], [B(T('off')), 'zones', 'whoosh', { len: 0.35, from: 400, to: 1400 }],
  WH(S.D, 600, 2000), [B(T('one')), 'paddle', 'pop'], [B(T('bid.')), 'BIDS 1', 'click'],
  [B(S.E), 'dive', 'whoosh', { len: 0.5, from: 1500, to: 350 }], [B(T('rocks')), 'nodules', 'tick'], [B(T('nickel')), 'Ni', 'pop'], [B(T('cobalt.')), 'Co', 'pop'],
  WH(S.F, 600, 2000), [B(T('area?')), 'PA square', 'click'], [B(T('Bigger')), 'lease square', 'whoosh', { len: 0.3, from: 500, to: 1600 }], [B(T('Pennsylvania.') + 0.3), 'bigger', 'pop'],
  WH(S.G, 2000, 600), [B(T('catch:')), 'catch', 'tick'], [B(T('no')), 'NO MINING YET', 'pop'], [B(T('exploring.')), 'sonar sweep', 'tick'],
  WH(S.Hh, 600, 2000), [B(T('judge')), 'gavel', 'click'], [B(T('faulted')), 'stamp', 'pop'],
  WH(S.I, 600, 2000), [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop'], [B(T('more.') + 0.35), 'send line', 'tick'],
];

// ---------------------------------------------------------------- helpers
function stroke(ctx, w = 4, col = C.cyan) { ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); }
function big(ctx, str, x, y, size, col, k, { rot = 0, fam = D, wt = 800, glow = false } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.font = font(size, wt, fam); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
  ctx.fillStyle = 'rgba(0,0,0,0.45)'; ctx.fillText(str, size * 0.03, size * 0.05);
  ctx.lineWidth = size * 0.08; ctx.strokeStyle = C.deep; ctx.strokeText(str, 0, 0);
  ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function chip(ctx, label, x, y, size, k, { bg = C.amb, fg = C.deep, rot = 0, fam = UI, wt = 800, edge = null } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, fam); const w = ctx.measureText(label).width + size * 1.1, h = size * 1.6;
  rrect(ctx, -w / 2, -h / 2, w, h, h / 2); ctx.fillStyle = bg; ctx.fill(); if (edge) stroke(ctx, 4, edge);
  text(ctx, label, 0, size * 0.36, font(size, wt, fam), fg, 'center'); ctx.restore();
}
// the persistent ocean: gradient, drifting particles ("marine snow"), light rays near the top
function ocean(ctx, t, depth = 0) {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  const d = clamp(depth);
  g.addColorStop(0, M.mix(C.top, C.mid, d)); g.addColorStop(0.55, M.mix(C.mid, C.deep, d)); g.addColorStop(1, C.deep);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  if (d < 0.8) { ctx.save(); ctx.globalAlpha = 0.10 * (1 - d / 0.8);
    for (let i = 0; i < 6; i++) { const x = (i / 6) * W + Math.sin(t * 0.4 + i) * 60; ctx.beginPath(); ctx.moveTo(x - 40, 0); ctx.lineTo(x + 40, 0); ctx.lineTo(x + 260, H * 0.8); ctx.lineTo(x + 120, H * 0.8); ctx.closePath(); ctx.fillStyle = '#BFF6FF'; ctx.fill(); }
    ctx.restore(); }
  for (let i = 0; i < 90; i++) { const x = (hash01(i, 1) * W + Math.sin(t * 0.7 + i) * 14) % W, y = (hash01(i, 2) * H + t * (14 + 30 * hash01(i, 3)) + depth * 900) % H;
    ctx.fillStyle = `rgba(200,240,255,${0.12 + 0.25 * hash01(i, 4)})`; ctx.beginPath(); ctx.arc(x, y, 1.5 + 2.5 * hash01(i, 5), 0, TAU); ctx.fill(); }
}
function nodule(ctx, x, y, r, seed, k = 1) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.beginPath();
  for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU, rr = r * (0.8 + 0.3 * hash01(i, seed)); ctx.lineTo(Math.cos(a) * rr * 1.25, Math.sin(a) * rr * 0.8); }
  ctx.closePath(); ctx.fillStyle = C.rock; ctx.fill(); stroke(ctx, 3, C.rockHi);
  ctx.fillStyle = 'rgba(160,200,210,0.25)'; ctx.beginPath(); ctx.ellipse(-r * 0.35, -r * 0.3, r * 0.4, r * 0.18, -0.3, 0, TAU); ctx.fill();
  ctx.restore();
}
function seafloor(ctx, y0, t, k = 1, seedOff = 0) {
  ctx.save(); ctx.beginPath(); ctx.moveTo(0, H);
  for (let x = 0; x <= W; x += 30) ctx.lineTo(x, y0 + Math.sin(x * 0.006 + seedOff) * 30 + Math.sin(x * 0.019) * 10);
  ctx.lineTo(W, H); ctx.closePath(); ctx.fillStyle = C.sand; ctx.fill(); stroke(ctx, 4, C.cyanD); ctx.restore();
}
function whip(ctx, t, t0, a, b, dur = 0.3) {
  const p = E.inOutCubic(prog(t, t0 - dur * 0.55, t0 + dur * 0.45));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(-p * W, 0); a(); ctx.restore(); ctx.save(); ctx.translate((1 - p) * W, 0); b(); ctx.restore();
  ctx.fillStyle = C.cyan; ctx.fillRect((1 - p) * W - 4, 0, 8, H);
}
function dive(ctx, t, t0, a, b, dur = 0.5) { // vertical: camera sinks, new scene comes up from below
  const p = E.inOutCubic(prog(t, t0 - dur * 0.5, t0 + dur * 0.5));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(0, -p * H); a(); ctx.restore(); ctx.save(); ctx.translate(0, (1 - p) * H); b(); ctx.restore();
}

// ---------------------------------------------------------------- persistent LEASE BOARD (bottom)
function board(ctx, t) {
  const k = clamp(prog(t, 0.05, 0.4)); if (k <= 0) return;
  const y = s.y + s.h - 40, x0 = s.x, w = s.w, h = 120;
  const acres = 31.5 * E.outCubic(prog(t, 0.0, T('seabed,') + 0.1));
  let cells = [['ACRES', `${acres.toFixed(1)}M`], ['PRICE', t >= T('$6 million.') ? '$6M' : '—']];
  if (t >= T('19 cents')) cells[1] = ['PER ACRE', '19¢'];
  let st = 'FOR LEASE', stBg = C.grey;
  if (t >= T('bid.')) { st = '1 BIDDER'; stBg = C.amb; }
  if (t >= T('no')) { st = 'EXPLORE ONLY'; stBg = C.cyan; }
  if (t >= T('faulted')) { st = 'IN COURT'; stBg = C.red; }
  const changes = [T('$6 million.'), T('19 cents'), T('bid.'), T('no'), T('faulted')];
  const last = changes.filter((c) => t >= c).pop() ?? -9; const bmp = 1 + 0.2 * Math.exp(-(t - last) * 7) * (t - last < 1);
  ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 80);
  rrect(ctx, x0, y - h / 2, w, h, 22); ctx.fillStyle = 'rgba(3,18,29,0.82)'; ctx.fill(); stroke(ctx, 3, C.cyan);
  const cw = w * 0.31;
  cells.forEach(([lab, val], i) => { const x = x0 + 30 + i * cw;
    text(ctx, lab, x, y - 18, font(26, 800, UI), C.grey, 'left', 2);
    ctx.save(); ctx.translate(x, y + 36); if (i === 1 || i === 0 && t < T('seabed,') + 0.2) ctx.scale(i === 1 ? bmp : 1, i === 1 ? bmp : 1);
    text(ctx, val, 0, 0, font(54, 800, D), C.amb, 'left'); ctx.restore(); });
  const sx = x0 + w * 0.64, sw = w * 0.34;
  ctx.save(); ctx.translate(sx + sw / 2, y); ctx.scale(bmp, bmp);
  rrect(ctx, -sw / 2 + 6, -h / 2 + 14, sw - 12, h - 28, 14); ctx.fillStyle = stBg; ctx.fill();
  text(ctx, st, 0, 15, font(st.length > 9 ? 36 : 42, 800, D), C.deep, 'center'); ctx.restore();
  ctx.restore();
}

// ---------------------------------------------------------------- captions (word by word, top)
function captions(ctx, t) {
  const L = TIMING.lines; const li = L.findIndex((l, i) => t >= l.t0 - 0.05 && t < (L[i + 1] ? L[i + 1].t0 - 0.05 : END)); if (li < 0) return;
  const all = L[li].words, ws = all.filter((w) => t >= w.t - 0.03); if (!ws.length) return;
  const start = Math.floor((ws.length - 1) / 3) * 3, chunk = all.slice(start, start + 3), shown = ws.slice(start);
  let size = 80; const gap = 22;
  const meas = (sz) => { ctx.font = font(sz, 800, D); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 20) { size = Math.floor(size * (s.w - 20) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 40;
  shown.forEach((w, i) => { const k = sp(t, w.t - 0.03, SPRING.bouncy), sc = Math.min(1.1, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.22; ctx.strokeStyle = C.deep; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.amb : C.white; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}

// ---------------------------------------------------------------- A: hook — 31.5M ACRES, lease grid lights up on the seafloor
function sHook(ctx, t) {
  ocean(ctx, t, 0.5);
  // perspective seafloor grid (the lease blocks), lighting up block by block
  const hz = s.y + 560, by = H; ctx.save();
  ctx.beginPath(); ctx.rect(0, hz, W, H - hz); ctx.fillStyle = C.sand; ctx.fill();
  const rows = 9, cols = 9, pl = prog(t, T('acres') - 0.1, T('for') + 0.2);
  const P = (u, v) => { const z = 1 / (0.25 + v * 1.6); const yy = hz + (by - hz) * (1 - (z - 1 / 1.85) / (4 - 1 / 1.85)); return [cx + (u - 0.5) * W * 2.6 * (0.25 + (1 - v) * 0.75) * 0.9, lerp(by + 40, hz + 8, Math.pow(v, 0.6))]; };
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const i = r * cols + c, on = hash01(i, 11) * 0.8 + (r / rows) * 0.2 < pl;
    const a = P(c / cols, r / rows), b = P((c + 1) / cols, r / rows), d = P((c + 1) / cols, (r + 1) / rows), e = P(c / cols, (r + 1) / rows);
    ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.lineTo(...d); ctx.lineTo(...e); ctx.closePath();
    if (on) { ctx.fillStyle = `rgba(255,193,69,${0.22 + 0.2 * hash01(i, 3)})`; ctx.fill(); }
    stroke(ctx, 2.5, on ? C.amb : C.cyanD); }
  ctx.restore();
  for (let i = 0; i < 14; i++) nodule(ctx, s.x + hash01(i, 21) * s.w, hz + 120 + hash01(i, 22) * 520, 14 + 16 * hash01(i, 23), i, 1);
  const kN = t < 0.02 ? 1 : Math.min(1.05, lerp(1.3, 1, E.outBack(prog(t, 0, 0.3))));
  big(ctx, '31.5', cx, s.y + 300, 250, C.amb, kN);
  big(ctx, 'MILLION ACRES', cx, s.y + 400, 92, C.white, kN);
  chip(ctx, 'OF SEABED', cx, s.y + 480, 40, pop(t, T('seabed,') - 0.08), { bg: C.cyan });
  // price tag drops on the grid
  const tp = T('$6 million.'), kp = slam(t, tp, 1.9);
  if (kp > 0) { ctx.save(); ctx.translate(cx + 180, s.y + 700); ctx.rotate(0.07); ctx.scale(kp, kp);
    ctx.beginPath(); ctx.moveTo(-170, -80); ctx.lineTo(120, -80); ctx.lineTo(185, 0); ctx.lineTo(120, 80); ctx.lineTo(-170, 80); ctx.closePath();
    ctx.fillStyle = C.amb; ctx.fill(); stroke(ctx, 6, C.deep); ctx.beginPath(); ctx.arc(120, 0, 14, 0, TAU); ctx.fillStyle = C.deep; ctx.fill();
    text(ctx, '$6M', -25, 38, font(110, 800, D), C.deep, 'center'); ctx.restore(); }
}

// ---------------------------------------------------------------- B: 19 cents an acre — a coin drops onto one acre tile
function sCents(ctx, t) {
  ocean(ctx, t, 0.6);
  const ta = T('acre.');
  // one acre tile in perspective
  const ka = pop(t, S.B + 0.05);
  if (ka > 0) { ctx.save(); ctx.translate(cx, s.y + 820); ctx.scale(ka, ka);
    ctx.beginPath(); ctx.moveTo(-360, 0); ctx.lineTo(0, -170); ctx.lineTo(360, 0); ctx.lineTo(0, 170); ctx.closePath();
    ctx.fillStyle = C.sand; ctx.fill(); stroke(ctx, 6, t >= ta ? C.amb : C.cyan);
    for (let i = 0; i < 9; i++) nodule(ctx, (hash01(i, 31) - 0.5) * 380, (hash01(i, 32) - 0.5) * 160, 16, i + 40);
    ctx.restore();
    chip(ctx, '1 ACRE ≈ 3/4 OF A FOOTBALL FIELD', cx, s.y + 1045, 36, pop(t, ta + 0.05), { bg: C.white }); }
  // coin falls from the top and lands with a ring
  const tc = T('19 cents'), q = t - tc + 0.25;
  if (q > 0) { const land = 0.35, yy = q < land ? lerp(s.y + 150, s.y + 640, E.inCubic(q / land)) : s.y + 640 - Math.abs(M.ring(q - land, 3, 7)) * 40;
    ctx.save(); ctx.translate(cx, yy); const sq = q < land ? 1 : 1 + M.wobble(q - land, 3, 8) * 0.12;
    ctx.scale(sq, 1 / sq);
    ctx.beginPath(); ctx.ellipse(0, 18, 170, 60, 0, 0, TAU); ctx.fillStyle = '#B07A1E'; ctx.fill();
    ctx.beginPath(); ctx.ellipse(0, 0, 170, 60, 0, 0, TAU); ctx.fillStyle = C.amb; ctx.fill(); stroke(ctx, 5, '#B07A1E');
    ctx.restore(); }
  const k19 = slam(t, tc, 1.6);
  big(ctx, '19¢', cx, s.y + 400, 230, C.amb, k19);
  big(ctx, 'PER ACRE', cx, s.y + 490, 80, C.white, pop(t, ta - 0.1));
}

// ---------------------------------------------------------------- C: the map — first US deep-sea lease sale, off American Samoa
function sMap(ctx, t) {
  fill(ctx, C.mid);
  const z = Math.exp(lerp(0, Math.log(1.15), E.inOutSine(prog(t, S.C, S.D))));
  ctx.save(); M.zoomAbout(ctx, z, cx, s.y + 640);
  // sonar grid
  ctx.strokeStyle = 'rgba(79,227,214,0.12)'; ctx.lineWidth = 2;
  for (let x = 0; x < W; x += 90) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += 90) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  // sonar ping rings from the islands
  const ix = cx - 140, iy = s.y + 480;
  for (let i = 0; i < 3; i++) { const q = (((t - S.C) * 0.8 + i / 3) % 1 + 1) % 1; ctx.beginPath(); ctx.arc(ix, iy, 40 + q * 600, 0, TAU); stroke(ctx, 3, `rgba(79,227,214,${0.5 * (1 - q)})`); }
  // islands (American Samoa: Tutuila, Aunu'u, Manu'a group, Rose Atoll, Swains)
  const ki = pop(t, S.C + 0.05);
  if (ki > 0) { const isl = [[0, 0, 46, 14, -0.2], [70, 8, 10, 6, 0], [250, -30, 26, 12, 0.1], [300, -20, 14, 8, 0], [430, 10, 9, 9, 0]];
    isl.forEach(([dx, dy, rx, ry, rot], i) => { ctx.save(); ctx.translate(ix + dx, iy + dy); ctx.scale(ki, ki); ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, rot, 0, TAU); ctx.fillStyle = C.land; ctx.fill(); stroke(ctx, 3, C.white); ctx.restore(); });
    const ks = 1 + 0.25 * Math.exp(-Math.max(0, t - T('American')) * 6) * (t >= T('American'));
    chip(ctx, 'AMERICAN SAMOA', ix + 80, iy - 80, 38, ki * ks, { bg: t >= T('American') ? C.amb : C.white }); }
  // the two lease areas appear south of the islands, outlined, then filled
  const kz = prog(t, T('lease') - 0.15, T('Samoa.') + 0.3);
  if (kz > 0) { const zones = [[[ix - 250, iy + 130], [ix + 40, iy + 130], [ix + 40, iy + 400], [ix - 250, iy + 400]], [[ix + 80, iy + 160], [ix + 390, iy + 160], [ix + 390, iy + 430], [ix + 80, iy + 430]]];
    zones.forEach((zz, j) => { const p = clamp(kz * 1.6 - j * 0.4); if (p <= 0) return; ctx.beginPath();
      const per = 4 * p; ctx.moveTo(...zz[0]); for (let e = 1; e <= Math.ceil(per); e++) { const a = zz[(e - 1) % 4], b = zz[e % 4], f = Math.min(1, per - (e - 1)); ctx.lineTo(lerp(a[0], b[0], f), lerp(a[1], b[1], f)); }
      if (p >= 1) { ctx.closePath(); ctx.fillStyle = 'rgba(255,193,69,0.28)'; ctx.fill(); }
      ctx.setLineDash([18, 10]); stroke(ctx, 6, C.amb); ctx.setLineDash([]); });
    chip(ctx, 'LEASE AREAS · 50+ MILES OFFSHORE', cx, iy + 520, 32, pop(t, T('Samoa.') + 0.15), { bg: C.amb }); }
  ctx.restore();
  // FIRST stamp + date
  const kf = slam(t, T('first'), 1.7);
  if (kf > 0) { ctx.save(); ctx.translate(cx, s.y + 245); ctx.rotate(-0.04); ctx.scale(kf, kf);
    rrect(ctx, -390, -70, 780, 140, 18); ctx.fillStyle = C.deep; ctx.fill(); stroke(ctx, 5, C.amb);
    text(ctx, 'FIRST US DEEP-SEA', 0, -6, font(56, 800, D), C.white, 'center'); text(ctx, 'MINING LEASE SALE · 19 NOV', 0, 46, font(34, 800, UI), C.amb, 'center', 2); ctx.restore(); }
}

// ---------------------------------------------------------------- D: only one company bid — an auction paddle
function sBid(ctx, t) {
  ocean(ctx, t, 0.55);
  const t1 = T('one');
  // two registered bidder cards; one stays grey, one lifts its paddle
  const kc = pop(t, S.D + 0.05);
  [['BIDDER A', -200], ['BIDDER B', 200]].forEach(([lab, dx], i) => { if (kc <= 0) return;
    ctx.save(); ctx.translate(cx + dx, s.y + 1000); ctx.scale(kc * 1.2, kc * 1.2);
    rrect(ctx, -150, -60, 300, 120, 18); ctx.fillStyle = i === 0 ? 'rgba(143,179,194,0.25)' : 'rgba(255,193,69,0.25)'; ctx.fill(); stroke(ctx, 4, i === 0 ? C.grey : C.amb);
    text(ctx, i === 0 ? 'REGISTERED' : 'REGISTERED', 0, -8, font(28, 800, UI), C.grey, 'center', 2);
    text(ctx, i === 0 ? 'NO BID' : 'BID', 0, 38, font(40, 800, D), i === 0 ? C.grey : C.amb, 'center'); ctx.restore(); });
  // paddle rises
  const kp = sp(t, t1 - 0.1, SPRING.bouncy), py = lerp(s.y + 1100, s.y + 560, Math.min(1.05, kp));
  if (kp > 0) { ctx.save(); ctx.translate(cx + 200, py); ctx.rotate(0.12 * Math.sin((t - t1) * 5) * Math.exp(-(t - t1) * 2));
    ctx.fillStyle = '#C98B4A'; ctx.fillRect(-16, 120, 32, 260); ctx.lineWidth = 4; ctx.strokeStyle = C.deep; ctx.strokeRect(-16, 120, 32, 260);
    ctx.beginPath(); ctx.arc(0, 0, 150, 0, TAU); ctx.fillStyle = C.white; ctx.fill(); stroke(ctx, 8, C.amb);
    text(ctx, '1', 0, 72, font(210, 800, D), C.deep, 'center'); ctx.restore(); }
  chip(ctx, 'LEASE AUCTION · 2 REGISTERED', cx, s.y + 860, 34, pop(t, S.D + 0.05), { bg: C.white });
  const kb = slam(t, T('bid.'), 1.7);
  big(ctx, 'ONLY 1 BID', cx - 120, s.y + 330, 110, C.amb, kb, { rot: -0.03 });
  chip(ctx, 'Wetstone U.S. Ventures', cx - 120, s.y + 430, 34, pop(t, T('bid.') + 0.15), { bg: C.white });
}

// ---------------------------------------------------------------- E: the prize — nodules on the floor, Ni + Co
function sPrize(ctx, t) {
  ocean(ctx, t, 0.95);
  seafloor(ctx, s.y + 760, t, 1, 2);
  const tr = T('rocks');
  for (let i = 0; i < 22; i++) { const x = s.x - 40 + hash01(i, 51) * (s.w + 80), y = s.y + 820 + hash01(i, 52) * 300;
    nodule(ctx, x, y, 20 + 22 * hash01(i, 53), i + 60, 1); }
  // one hero nodule lifts up, glowing amber rim
  const kh = sp(t, tr, SPRING.bouncy);
  if (kh > 0) { const y = lerp(s.y + 880, s.y + 560, Math.min(1, kh)) + Math.sin(t * 2) * 8;
    ctx.save(); ctx.globalAlpha = 0.35; ctx.beginPath(); ctx.arc(cx, y, 190, 0, TAU); ctx.fillStyle = 'rgba(255,193,69,0.25)'; ctx.fill(); ctx.restore();
    nodule(ctx, cx, y, 110, 7, Math.min(1, kh)); ctx.save(); ctx.translate(cx, y); ctx.scale(Math.min(1, kh), Math.min(1, kh)); ctx.beginPath(); ctx.ellipse(0, 0, 150, 100, 0, 0, TAU); ctx.setLineDash([14, 10]); stroke(ctx, 4, C.amb); ctx.restore(); }
  chip(ctx, 'POTATO-SIZED NODULES', cx, s.y + 300, 40, pop(t, S.E + 0.1), { bg: C.cyan });
  const el = (sym, name, x, y, t0) => { const k = slam(t, t0, 1.8); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    rrect(ctx, -95, -95, 190, 190, 22); ctx.fillStyle = C.deep; ctx.fill(); stroke(ctx, 6, C.amb);
    text(ctx, sym, 0, 30, font(100, 800, D), C.amb, 'center'); text(ctx, name, 0, 72, font(26, 800, UI), C.white, 'center', 2); ctx.restore(); };
  el('Ni', 'NICKEL', cx - 270, s.y + 520, T('nickel'));
  el('Co', 'COBALT', cx + 270, s.y + 520, T('cobalt.'));
}

// ---------------------------------------------------------------- F: scale — bigger than Pennsylvania
function sScale(ctx, t) {
  ocean(ctx, t, 0.6);
  const base = s.y + 1060, unit = 640 / Math.sqrt(49200);
  const sPA = Math.sqrt(46054) * unit, sL = Math.sqrt(49219) * unit;
  const kPA = E.outBack(prog(t, T('area?') - 0.1, T('area?') + 0.35)), kL = E.outBack(prog(t, T('Bigger') - 0.1, T('Bigger') + 0.45));
  // Pennsylvania (left-aligned square, cyan) and the lease area (amber outline) on top of it
  const x0 = cx - sL / 2;
  if (kPA > 0) { const w = sPA * Math.min(1, kPA); ctx.fillStyle = 'rgba(79,227,214,0.25)'; ctx.fillRect(x0, base - w, w, w); ctx.lineWidth = 5; ctx.strokeStyle = C.cyan; ctx.strokeRect(x0, base - w, w, w);
    text(ctx, 'PENNSYLVANIA', x0 + 24, base - 40, font(40, 800, UI), C.cyan, 'left', 1); text(ctx, '46,054 sq mi', x0 + 24, base - 90, font(34, 800, UI), C.white, 'left'); }
  if (kL > 0) { const w = sL * Math.min(1.02, kL); ctx.save(); ctx.setLineDash([22, 12]); ctx.lineWidth = 7; ctx.strokeStyle = C.amb; ctx.strokeRect(x0, base - w, w, w); ctx.restore();
    if (kL > 0.6) text(ctx, 'LEASE AREAS', x0 + w - 20, base - w + 60, font(40, 800, UI), C.amb, 'right', 1); if (kL > 0.6) text(ctx, '≈49,200 sq mi', x0 + w - 20, base - w + 108, font(34, 800, UI), C.white, 'right'); }
  big(ctx, 'BIGGER THAN', cx, s.y + 270, 78, C.white, pop(t, T('Bigger') - 0.05));
  big(ctx, 'PENNSYLVANIA', cx, s.y + 360, 92, C.amb, slam(t, T('Pennsylvania.'), 1.6));
}

// ---------------------------------------------------------------- G: the catch — no mining yet, exploring only (sonar sweep)
function sCatch(ctx, t) {
  ocean(ctx, t, 0.95);
  seafloor(ctx, s.y + 860, t, 1, 4);
  for (let i = 0; i < 16; i++) nodule(ctx, s.x + hash01(i, 71) * s.w, s.y + 920 + hash01(i, 72) * 180, 16 + 14 * hash01(i, 73), i + 80);
  // small survey sub (simple capsule + fin) sweeping a sonar fan
  const te = T('exploring.'), sx = lerp(s.x + 60, s.x + s.w - 60, E.inOutSine(prog(t, S.G, S.Hh))), sy = s.y + 640 + Math.sin(t * 2) * 10;
  const fan = prog(t, T('just') - 0.2, te + 0.3);
  if (fan > 0) { ctx.save(); ctx.globalAlpha = 0.5; const a0 = Math.PI / 2 - 0.5 + Math.sin(t * 3) * 0.3; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.arc(sx, sy, 330, a0, a0 + 0.5 * fan + 0.2); ctx.closePath();
    const g = ctx.createRadialGradient(sx, sy, 10, sx, sy, 330); g.addColorStop(0, 'rgba(79,227,214,0.7)'); g.addColorStop(1, 'rgba(79,227,214,0)'); ctx.fillStyle = g; ctx.fill(); ctx.restore(); }
  ctx.save(); ctx.translate(sx, sy); rrect(ctx, -110, -42, 220, 84, 42); ctx.fillStyle = C.amb; ctx.fill(); stroke(ctx, 5, C.deep);
  ctx.beginPath(); ctx.arc(55, -4, 20, 0, TAU); ctx.fillStyle = C.cyan; ctx.fill(); stroke(ctx, 4, C.deep);
  ctx.fillStyle = C.amb; ctx.fillRect(-30, -70, 50, 30); ctx.lineWidth = 4; ctx.strokeStyle = C.deep; ctx.strokeRect(-30, -70, 50, 30); ctx.restore();
  // NO MINING YET stamp
  const kn = slam(t, T('no'), 1.9);
  if (kn > 0) { ctx.save(); ctx.translate(cx, s.y + 330); ctx.rotate(-0.06); ctx.scale(kn, kn);
    rrect(ctx, -380, -90, 760, 180, 20); ctx.fillStyle = 'rgba(3,18,29,0.85)'; ctx.fill(); stroke(ctx, 9, C.red);
    text(ctx, 'NO MINING YET', 0, 32, font(92, 800, D), C.red, 'center'); ctx.restore(); }
  chip(ctx, 'EXPLORATION ONLY · 20-YEAR LEASE', cx, s.y + 480, 32, pop(t, te - 0.05), { bg: C.cyan });
}

// ---------------------------------------------------------------- H: a judge faulted the wildlife review (sale not blocked)
function gavel(ctx, x, y, rot, k) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.fillStyle = '#C98B4A'; ctx.fillRect(-14, -20, 28, 260); ctx.lineWidth = 5; ctx.strokeStyle = C.deep; ctx.strokeRect(-14, -20, 28, 260);
  rrect(ctx, -110, -70, 220, 100, 26); ctx.fillStyle = '#A8682F'; ctx.fill(); stroke(ctx, 5, C.deep);
  ctx.fillStyle = C.amb; ctx.fillRect(-80, -70, 18, 100); ctx.fillRect(62, -70, 18, 100); ctx.restore();
}
function sJudge(ctx, t) {
  ocean(ctx, t, 0.7);
  const tj = T('judge'), tf = T('faulted');
  // document
  const kd = pop(t, S.Hh + 0.05);
  if (kd > 0) { ctx.save(); ctx.translate(cx - 60, s.y + 700); ctx.rotate(-0.03); ctx.scale(kd * 0.92, kd * 0.92);
    rrect(ctx, -250, -320, 500, 640, 16); ctx.fillStyle = C.white; ctx.fill();
    text(ctx, 'WILDLIFE REVIEW', 0, -240, font(44, 800, D), C.deep, 'center'); text(ctx, 'Endangered Species Act', 0, -190, font(28, 600, UI), '#45606C', 'center');
    for (let i = 0; i < 7; i++) { ctx.fillStyle = '#C9D8DE'; ctx.fillRect(-190, -120 + i * 52, 380 * (0.6 + 0.4 * hash01(i, 91)), 14); }
    // turtle-free: a simple fish line icon
    ctx.restore(); }
  // gavel swings down on "faulted"
  const sw = t < tf ? lerp(-0.9, -0.6, E.outCubic(prog(t, tj - 0.2, tj + 0.3))) : -0.6 + 0.6 * E.outBack(prog(t, tf - 0.12, tf + 0.08));
  gavel(ctx, cx + 260, s.y + 560, sw, pop(t, tj - 0.1));
  const ks = slam(t, tf + 0.02, 2.0);
  if (ks > 0) { ctx.save(); ctx.translate(cx - 60, s.y + 740); ctx.rotate(-0.14); ctx.scale(ks, ks);
    rrect(ctx, -230, -70, 460, 140, 14); stroke(ctx, 10, C.red); text(ctx, 'FELL SHORT', 0, 28, font(76, 800, D), C.red, 'center'); ctx.restore(); }
  chip(ctx, 'Hawaii federal judge · 16 Nov', cx, s.y + 270, 34, pop(t, tj), { bg: C.white });
  chip(ctx, 'The sale was not blocked', cx, s.y + 1095, 36, pop(t, T('wildlife') - 0.1), { bg: C.amb });
}

// ---------------------------------------------------------------- I: end card
function envelope(ctx, x, y, w) {
  const h = w * 0.66; ctx.save(); ctx.translate(x, y); rrect(ctx, -w / 2, -h / 2, w, h, 4); ctx.fillStyle = C.white; ctx.fill();
  ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(0, h * 0.1); ctx.lineTo(w / 2, -h / 2); stroke(ctx, 4, C.deep); ctx.restore();
}
function sEnd(ctx, t) {
  ocean(ctx, t, 0.5);
  seafloor(ctx, s.y + 1180, t, 1, 6);
  big(ctx, '31.5M ACRES', cx, s.y + 300, 120, C.amb, pop(t, S.I - 0.15));
  text(ctx, 'FOR $6M · ABOUT 19¢ AN ACRE', cx, s.y + 380, font(40, 800, UI), C.white, 'center', 1);
  text(ctx, 'WHYVERSE', cx, s.y + 560, font(90, 800, D), C.cyan, 'center', 6);
  const btn = (x, label, bg, k, icon, rot) => { if (k <= 0) return; ctx.save(); ctx.translate(x, s.y + 730); ctx.rotate(rot); ctx.scale(k, k);
    rrect(ctx, -190, -72, 380, 144, 72); ctx.fillStyle = bg; ctx.fill(); stroke(ctx, 5, C.deep); icon(); text(ctx, label, 45, 24, font(62, 800, D), C.deep, 'center'); ctx.restore(); };
  btn(cx - 205, 'LIKE', C.white, pop(t, T('Like') - 0.05), () => { const hb = 1 + 0.15 * Math.max(0, Math.sin((t - T('Like')) * 9)) * Math.exp(-(t - T('Like')) * 2);
    ctx.save(); ctx.translate(-105, 6); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30); ctx.fillStyle = C.red; ctx.fill(); ctx.restore(); }, -0.04);
  btn(cx + 205, 'FOLLOW', C.amb, pop(t, T('follow') - 0.05), () => { ctx.save(); ctx.translate(-115, 4); ctx.lineWidth = 13; ctx.strokeStyle = C.deep; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-24, 0); ctx.lineTo(24, 0); ctx.moveTo(0, -24); ctx.lineTo(0, 24); ctx.stroke(); ctx.restore(); }, 0.04);
  const kS = pop(t, T('more.') + 0.3);
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 920); ctx.scale(kS, kS); rrect(ctx, -420, -72, 840, 144, 24); ctx.fillStyle = 'rgba(3,18,29,0.85)'; ctx.fill(); stroke(ctx, 3, C.cyan);
    envelope(ctx, -350, 0, 70);
    text(ctx, 'Send this to the friend', 40, -12, font(40, 800, UI), C.white, 'center'); text(ctx, 'who loves the ocean', 40, 40, font(40, 800, UI), C.amb, 'center'); ctx.restore(); }
  text(ctx, 'Sources: AP, Washington Post, Mongabay, Star-Advertiser (19–21 Nov 2026)', cx, s.y + 1060, font(24, 600, UI), C.grey, 'center');
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 600, UI)],
  hits: HITS,
  draw(ctx, u, t) {
    if (t < S.B + 0.2) whip(ctx, t, S.B, () => sHook(ctx, t), () => sCents(ctx, t));
    else if (t < S.C + 0.2) whip(ctx, t, S.C, () => sCents(ctx, t), () => sMap(ctx, t));
    else if (t < S.D + 0.2) whip(ctx, t, S.D, () => sMap(ctx, t), () => sBid(ctx, t));
    else if (t < S.E + 0.3) dive(ctx, t, S.E, () => sBid(ctx, t), () => sPrize(ctx, t));
    else if (t < S.F + 0.2) whip(ctx, t, S.F, () => sPrize(ctx, t), () => sScale(ctx, t));
    else if (t < S.G + 0.2) whip(ctx, t, S.G, () => sScale(ctx, t), () => sCatch(ctx, t));
    else if (t < S.Hh + 0.2) whip(ctx, t, S.Hh, () => sCatch(ctx, t), () => sJudge(ctx, t));
    else whip(ctx, t, S.I, () => sJudge(ctx, t), () => sEnd(ctx, t), 0.34);
    if (t < S.I - 0.15) board(ctx, t);
    captions(ctx, t);
  },
  post(ctx, u, t) { const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,8,14,0.45)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); },
});
