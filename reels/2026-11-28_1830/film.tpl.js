// "Azıx mağarasının 350 000 illik sirri" — @bilirdinizmi_az 18:30 animated reel, 28 Nov 2026 (trend + PHOTO STORY), Arif voice, no music.
// News: 27 Nov 2026 the Əsasnamə of the "Azıx-Tağlar Arxeoloji Parkı" state reserve was approved (trend.az, 1news.az, apa.az).
// Fact: 1968, Məmmədəli Hüseynov found the Azıxantrop jaw fragment; ≈350–400 000 years (scientists' estimate); a woman of ≈18–22.
// Sources + context check: facts/2026-11-28.json trend / reel_1830. No conflict mentions (AZ POLITICS RULE).
// VIEWER FEEDBACK 24 Nov: narration = ONE fixed subtitle bar (y 1252-1442), phrases; max ONE other text element at a time.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = __TIMING__;
const C = {
  night: '#120B07', deep: '#2B1D13', chalk: '#F4EBDD', white: '#FFFFFF', ink: '#120C08', gold: '#FFC629', red: '#D93A2B',
  paper: '#F3E9D6', bone: '#E9D9B8', ochre: '#C9782E', rock: '#3A281A',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const TOP = s.y;            // 250
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const out = (t, t1, d = 0.14) => 1 - E.inCubic(clamp((t - t1) / d));
const T = (w, n = 0) => { const m = TIMING.words.filter((x) => x[0] === w); return m[n] ? m[n][1] : 0; };
const CH = TIMING.chunks;
const S = { A: 0, B: CH[3].t0, C: CH[5].t0, D: CH[7].t0, F: CH[10].t0 };
const B = (t) => t / 0.5;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.3, from, to }];
const NB = ' ';

// ---------------------------------------------------------------- helpers
function outline(ctx, w = 6, col = C.ink) { ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineJoin = 'round'; ctx.stroke(); }
function big(ctx, str, x, y, size, col, k, { stroke = C.ink, rot = 0, fam = D, wt = 800, sw = 0.09 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, fam); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
  if (stroke) { ctx.lineWidth = size * sw; ctx.strokeStyle = stroke; ctx.strokeText(str, 0, 0); }
  ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function stamp(ctx, label, x, y, size, k, { bg = C.gold, fg = C.ink, rot = -0.07, edge = C.ink } = {}) {
  if (k <= 0) return; const q = Math.min(1, k), sc = lerp(1.8, 1, q) * (k > 1 ? k : 1);
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc);
  ctx.font = font(size, 800, D); const w = ctx.measureText(label).width + size * 1.1, h = size * 1.6;
  rrect(ctx, -w / 2, -h / 2, w, h, size * 0.25); ctx.fillStyle = bg; ctx.fill(); outline(ctx, 7, edge);
  text(ctx, label, 0, size * 0.36, font(size, 800, D), fg, 'center'); ctx.restore();
}
function whip(ctx, t, t0, a, b, dur = 0.3) {
  const p = E.inOutCubic(prog(t, t0 - dur * 0.55, t0 + dur * 0.45));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(-p * W, 0); a(); ctx.restore(); ctx.save(); ctx.translate((1 - p) * W, 0); b(); ctx.restore();
}
function envelope(ctx, x, y, w) {
  const h = w * 0.68; ctx.save(); ctx.translate(x, y);
  rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 4);
  ctx.beginPath(); ctx.moveTo(-w / 2 + 3, -h / 2 + 3); ctx.lineTo(0, h * 0.08); ctx.lineTo(w / 2 - 3, -h / 2 + 3); outline(ctx, 4); ctx.restore();
}

// a real photo in a print frame, slow push-in (log zoom), optional name plate
function photo(ctx, img, x, y, w, h, k, t, t0, { rot = 0, crop = null, zoom0 = 1.0, zoom1 = 1.12, dur = 3, fx = 0.5, fy = 0.5, name = '', sub = '', nameK = 1, gray = 0 } = {}) {
  if (k <= 0 || !img) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  const pad = 14;
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18;
  rrect(ctx, -w / 2 - pad, -h / 2 - pad, w + pad * 2, h + pad * 2, 10); ctx.fillStyle = C.paper; ctx.fill(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.clip();
  const z = zoom0 * (zoom1 / zoom0) ** clamp((t - t0) / dur);
  const [sx, sy, sw, sh] = crop || [0, 0, img.width, img.height];
  const sc = Math.max(w / sw, h / sh) * z, dw = sw * sc, dh = sh * sc;
  ctx.drawImage(img, sx, sy, sw, sh, -w / 2 + (w - dw) * fx, -h / 2 + (h - dh) * fy, dw, dh);
  if (gray > 0) { ctx.fillStyle = `rgba(14,8,4,${gray})`; ctx.fillRect(-w / 2, -h / 2, w, h); }
  ctx.restore();
  if (name && nameK > 0) {
    ctx.save(); ctx.translate(0, h / 2 - 26); ctx.scale(nameK, nameK);
    ctx.font = font(54, 800, D); let nw = ctx.measureText(name).width; if (sub) { ctx.font = font(36, 700, UI); nw = Math.max(nw, ctx.measureText(sub).width); } nw += 64;
    const nh = sub ? 134 : 90;
    rrect(ctx, -nw / 2, -nh + 22, nw, nh, 14); ctx.fillStyle = C.ink; ctx.fill(); outline(ctx, 4, C.gold);
    text(ctx, name, 0, sub ? -50 : -4, font(54, 800, D), C.chalk, 'center');
    if (sub) text(ctx, sub, 0, 4, font(36, 700, UI), C.gold, 'center');
    ctx.restore();
  }
  ctx.restore();
}
const drop = (t, t0) => { const k = sp(t, t0 - 0.04, SPRING.snappy); return { k: t < t0 - 0.04 ? 0 : 1, dy: (1 - Math.min(1, k)) * -900, r: (1 - Math.min(1, k)) * 0.25 }; };
function dropPhoto(ctx, t, t0, img, x, y, w, h, opt = {}) {
  const d = drop(t, t0); if (!d.k) return;
  const r0 = opt.rot || 0;
  ctx.save(); ctx.translate(0, d.dy); photo(ctx, img, x, y, w, h, 1, t, t0, { ...opt, rot: r0 + d.r * (r0 < 0 ? -1 : 1) }); ctx.restore();
}

// ---------------------------------------------------------------- SUBTITLE BAR (fixed, lower third, phrases)
function subtitles(ctx, t) {
  const y0 = 1252, y1 = 1442;
  ctx.save(); rrect(ctx, 36, y0, W - 72, y1 - y0, 26); ctx.fillStyle = 'rgba(10,6,3,0.86)'; ctx.fill();
  ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,198,41,0.55)'; ctx.stroke(); ctx.restore();
  const ch = CH.find((c) => t >= c.t0 && t < c.t1); if (!ch) return;
  const a = ch.t0 <= 0 ? 1 : clamp((t - ch.t0) / 0.08);
  const words = ch.text.split(' '); const maxW = W - 72 - 80;
  let size = 76, lines;
  for (;;) {
    ctx.font = font(size, 800, D); const sw = ctx.measureText(' ').width; lines = [[]]; let lw = 0;
    for (const w of words) { const ww = ctx.measureText(w).width;
      if (lines[lines.length - 1].length && lw + sw + ww > maxW) { lines.push([]); lw = 0; }
      lw += (lines[lines.length - 1].length ? sw : 0) + ww; lines[lines.length - 1].push(w); }
    if (lines.length <= 2 || size < 50) break; size -= 4;
  }
  ctx.save(); ctx.globalAlpha = a; ctx.font = font(size, 800, D); ctx.textAlign = 'left'; ctx.lineJoin = 'round';
  const sw = ctx.measureText(' ').width, lh = size * 1.18, yc = (y0 + y1) / 2 - ((lines.length - 1) * lh) / 2 + size * 0.36;
  lines.forEach((ln, li) => {
    const tw = ln.reduce((q, w) => q + ctx.measureText(w).width, 0) + sw * (ln.length - 1); let x = W / 2 - tw / 2;
    ln.forEach((w) => { ctx.lineWidth = size * 0.14; ctx.strokeStyle = C.ink; ctx.strokeText(w, x, yc + li * lh);
      ctx.fillStyle = ch.keys.includes(w) ? C.gold : C.white; ctx.fillText(w, x, yc + li * lh); x += ctx.measureText(w).width + sw; });
  });
  ctx.restore();
}

// ---------------------------------------------------------------- world: cave rock, strata bands, drifting dust, torch light
function world(ctx, t, { zoom = 1, seed = 0, torch = 0.5 } = {}) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, C.night); g.addColorStop(1, C.deep);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); M.zoomAbout(ctx, zoom, W / 2, H / 2);
  for (let r = 0; r < 9; r++) { const y = H * 0.06 + r * 210 + 30 * hash01(r, 11 + seed);
    ctx.fillStyle = `rgba(201,120,46,${0.035 + 0.03 * hash01(r, 12)})`; ctx.beginPath(); ctx.moveTo(-40, y);
    for (let x = -40; x <= W + 40; x += 30) ctx.lineTo(x, y + 22 * Math.sin(x / 210 + r * 2.1 + seed) + 10 * Math.sin(x / 57 + r));
    for (let x = W + 40; x >= -40; x -= 30) ctx.lineTo(x, y + 70 + 18 * Math.sin(x / 180 + r * 1.3 + seed));
    ctx.closePath(); ctx.fill(); }
  for (let i = 0; i < 46; i++) { const j = i + seed * 53, x0 = hash01(j, 3) * W, spd = 18 + 40 * hash01(j, 4);
    const y = (hash01(j, 5) * H + t * spd) % H, x = x0 + 30 * Math.sin(t * 0.7 + j); const r = 1.5 + 3.5 * hash01(j, 6);
    ctx.fillStyle = `rgba(255,214,150,${0.10 + 0.18 * hash01(j, 8)})`; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); }
  ctx.restore();
  const tx = W * (0.5 + 0.18 * Math.sin(t * 0.6 + seed)), ty = H * 0.42;
  const tg = ctx.createRadialGradient(tx, ty, 50, tx, ty, 900); tg.addColorStop(0, `rgba(255,190,110,${0.16 * torch})`); tg.addColorStop(1, 'rgba(255,190,110,0)');
  ctx.fillStyle = tg; ctx.fillRect(0, 0, W, H);
  const v = ctx.createRadialGradient(W / 2, H * 0.45, 200, W / 2, H * 0.45, H * 0.8);
  v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.55)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
}

// ---------------------------------------------------------------- HITS (sfx.mjs voices them; non-melodic only)
const DROPW = (t, l) => [B(t - 0.05), l, 'whoosh', { len: 0.35, from: 1800, to: 500 }];
const LAND = (t, l) => [B(t + 0.1), l + ' land', 'click'];
const HITS = [
  [B(0.02), 'hook', 'thud'], [B(0.75), 'scan', 'tick'], [B(1.35), 'bracket', 'tick'],
  DROPW(CH[1].t0, 'cave_e'), LAND(CH[1].t0, 'cave_e'), DROPW(T('çıxıb!'), 'cave_b'), LAND(T('çıxıb!'), 'cave_b'),
  DROPW(CH[2].t0, 'cave_d'), LAND(CH[2].t0, 'cave_d'), [B(T('təəccübləndirəcək.')), 'KİM?', 'thud'],
  WH(S.B, 600, 2200), [B(S.B + 0.1), 'years', 'type', { n: 14, len: 1.4 }], [B(T('səkkizdə') + 0.05), '1968', 'thud'],
  DROPW(T('arxeoloq'), 'layers'), LAND(T('arxeoloq'), 'layers'), DROPW(T('Məmmədəli'), 'hus'), LAND(T('Məmmədəli'), 'hus'),
  DROPW(T('tapıb.'), 'jaw1'), [B(T('tapıb.') + 0.12), 'TAPILDI', 'thud'],
  WH(S.C, 2200, 600), [B(T('Dünən')), 'DÜNƏN', 'thud'], DROPW(T('Azıx-Tağlar'), 'cave_f'), LAND(T('Azıx-Tağlar'), 'cave_f'),
  DROPW(T('qoruğunun'), 'plan'), LAND(T('qoruğunun'), 'plan'), [B(T('əsasnaməsi') - 0.1), 'doc', 'whoosh', { len: 0.3, from: 900, to: 300 }],
  [B(T('təsdiqləndi.') + 0.05), 'STAMP', 'impact'],
  WH(S.D, 600, 2200), [B(T('çənə', 1) - 0.05), 'head', 'sub'], [B(T('iyirmi') - 0.03), '20', 'thud'], [B(T('qadına') - 0.03), 'QADIN', 'impact'],
  WH(S.F, 2200, 600), [B(T('Bəyən')), 'BƏYƏN', 'click'], [B(T('izlə')), 'İZLƏ', 'thud'], [B(T('fakt!') + 0.3), 'send line', 'tick'],
];

// ---------------------------------------------------------------- A: hook (jaw -> Azıx cave -> who was it?)
const PH = { x: cx, y: 830, w: 820, h: 600 };
function bracket(ctx, x, y, w, h, p) { // measuring brackets drawing on around the jaw
  if (p <= 0) return; ctx.save(); ctx.strokeStyle = C.gold; ctx.lineWidth = 8; ctx.lineCap = 'round';
  const L = 70 * p;
  for (const [sx, sy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) { const px = x + sx * w / 2, py = y + sy * h / 2;
    ctx.beginPath(); ctx.moveTo(px, py - sy * L); ctx.lineTo(px, py); ctx.lineTo(px - sx * L, py); ctx.stroke(); }
  ctx.restore();
}
function mystery(ctx, t, t0, x, y, k) { // a silhouette head with a big "?" (the owner is unknown yet)
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.beginPath(); ctx.arc(0, -70, 120, 0, TAU); ctx.moveTo(-190, 230); ctx.bezierCurveTo(-180, 80, 180, 80, 190, 230); ctx.closePath();
  ctx.fillStyle = 'rgba(10,6,3,0.92)'; ctx.fill(); outline(ctx, 6, C.gold);
  big(ctx, '?', 0, -18, 170, C.gold, 1 + 0.06 * Math.sin((t - t0) * 7), { sw: 0.06 });
  ctx.restore();
}
function sHook(ctx, t, IMG) {
  world(ctx, t, { zoom: Math.exp(0.03 * t), torch: 0.9 });
  const t1 = CH[1].t0, t2 = T('çıxıb!') - 0.05, t3 = CH[2].t0, tK = T('təəccübləndirəcək.') - 0.05;
  photo(ctx, IMG.jaw2, PH.x, 900, 640, 620, 1, t, 0, { crop: [320, 540, 560, 540], rot: -0.02, zoom0: 1.0, zoom1: 1.2, dur: 2.2, fx: 0.5, fy: 0.5 });
  if (t < t1) { // scan line + brackets: an action every ~0.6 s before the first cut
    const q = prog(t, 0.6, 1.5); if (q > 0 && q < 1) { const yy = 900 - 300 + 600 * E.inOutSine(q);
      ctx.save(); ctx.fillStyle = 'rgba(255,198,41,0.85)'; ctx.fillRect(cx - 330, yy - 3, 660, 6); ctx.restore(); }
    bracket(ctx, PH.x, 900, 700, 680, E.outBack(prog(t, 1.3, 1.6)));
  }
  dropPhoto(ctx, t, t1, IMG.cave_e, PH.x + 10, PH.y + 30, PH.w - 20, 620, { rot: 0.03, zoom1: 1.14, dur: 2, fx: 0.5,
    name: 'AZIX MAĞARASI', sub: 'Xocavənd rayonu', nameK: pop(t, t1 + 0.12) * out(t, t2 - 0.1) });
  dropPhoto(ctx, t, t2, IMG.cave_b, PH.x - 6, PH.y + 20, 600, 700, { rot: -0.03, zoom1: 1.15, dur: 1.5, fy: 0.35 });
  dropPhoto(ctx, t, t3, IMG.cave_d, PH.x + 6, PH.y + 30, 760, 660, { rot: 0.025, zoom1: 1.12, dur: 2.6, fy: 0.5, gray: 0.35 });
  mystery(ctx, t, tK, cx, PH.y + 80, pop(t, tK));
  // frame 0: the hook, big (number + subject)
  const kH = (t < 0.22 ? lerp(1.1, 1, E.outBack(prog(t, 0, 0.22))) : 1) * out(t, t1 - 0.12);
  if (kH > 0) { ctx.save(); shake(ctx, B(t), B(0.02), 10, 3, 0.2); ctx.translate(cx, TOP + 130); ctx.scale(kH, kH);
    rrect(ctx, -480, -140, 960, 300, 30); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 8);
    text(ctx, `350${NB}000 İLLİK ÇƏNƏ`, 0, -34, font(86, 800, D), C.ink, 'center');
    text(ctx, 'AZIX MAĞARASINDAN', 0, 66, font(66, 800, D), C.ink, 'center');
    text(ctx, 'alimlərin hesablamasına görə', 0, 128, font(36, 700, UI), C.rock, 'center'); ctx.restore(); }
  stamp(ctx, 'SAHİBİ KİM İDİ?', cx, TOP + 130, 86, pop(t, tK + 0.02), { bg: C.chalk, rot: -0.04 });
}

// ---------------------------------------------------------------- B: 1968 — the archaeologist
function sFind(ctx, t, IMG) {
  const t0 = S.B, tY = T('səkkizdə'), tA = T('arxeoloq') - 0.05, tM = T('Məmmədəli') - 0.05, tT = T('tapıb.') - 0.05;
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 1 });
  photo(ctx, IMG.cave_a, cx, 800, 860, 560, pop(t, t0 - 0.1), t, t0, { rot: 0.02, zoom1: 1.2, dur: 2.5, fy: 0.5, gray: 0.15 });
  if (t < tA) { // year rolls back 2026 -> 1968
    const y = Math.round(lerp(2026, 1968, E.outCubic(prog(t, t0 + 0.05, tY))));
    const k = Math.max(0.85, pop(t, t0 - 0.02)) * (t > tY ? 1 + 0.07 * Math.exp(-(t - tY) * 6) : 1) * out(t, tA - 0.12);
    ctx.save(); if (t > tY) shake(ctx, B(t), B(tY), 10, 3, 0.25);
    rrect(ctx, cx - 330, TOP + 10, 660, 250, 30); ctx.fillStyle = `rgba(10,6,3,${0.88 * Math.min(1, k)})`; ctx.fill();
    big(ctx, String(y), cx, TOP + 205, 220, y === 1968 ? C.gold : C.chalk, k, { sw: 0.07 }); ctx.restore();
  }
  dropPhoto(ctx, t, tA, IMG.layers, cx + 8, 800, 560, 640, { rot: -0.03, zoom1: 1.1, dur: 2, fy: 0.45 });
  if (IMG.hus) dropPhoto(ctx, t, tM, IMG.hus, cx - 6, 800, 520, 640, { crop: [70, 250, 260, 330], rot: 0.025, zoom1: 1.1, dur: 2, fy: 0.3,
    name: 'MƏMMƏDƏLİ HÜSEYNOV', sub: 'arxeoloq', nameK: pop(t, tM + 0.12) * out(t, tT - 0.12) });
  else { const k = pop(t, tM) * out(t, tT - 0.12); if (k > 0) { ctx.save(); ctx.translate(cx, 790); ctx.scale(Math.min(1, k), Math.min(1, k));
    rrect(ctx, -330, -360, 660, 720, 20); ctx.fillStyle = C.ink; ctx.fill(); outline(ctx, 5, C.gold);
    ctx.beginPath(); ctx.arc(0, -110, 120, 0, TAU); ctx.moveTo(-220, 260); ctx.bezierCurveTo(-210, 40, 210, 40, 220, 260); ctx.closePath(); ctx.fillStyle = C.rock; ctx.fill();
    text(ctx, 'MƏMMƏDƏLİ HÜSEYNOV', 0, 320, font(52, 800, D), C.chalk, 'center'); ctx.restore(); } }
  dropPhoto(ctx, t, tT, IMG.jaw1, cx + 4, 820, 640, 430, { rot: -0.02, zoom1: 1.12, dur: 1.2, fy: 0.5 });
  stamp(ctx, 'TAPILDI · 1968', cx, TOP + 130, 84, pop(t, tT + 0.12), { bg: C.gold, rot: -0.05 });
}

// ---------------------------------------------------------------- C: yesterday — the reserve
function doc(ctx, t, x, y, k, kS) { // the regulations sheet + the approval stamp
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(0.04); const q = Math.min(1, k); ctx.scale(q, q);
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 14;
  rrect(ctx, -300, -380, 600, 760, 10); ctx.fillStyle = C.paper; ctx.fill(); ctx.restore(); outline(ctx, 4);
  text(ctx, 'ƏSASNAMƏ', 0, -270, font(78, 800, D), C.ink, 'center');
  for (let i = 0; i < 9; i++) { const w = 440 - 120 * hash01(i, 21); ctx.fillStyle = 'rgba(18,12,8,0.22)'; ctx.fillRect(-220, -190 + i * 52, w, 16); }
  if (kS > 0) { ctx.save(); ctx.translate(40, 220); ctx.rotate(-0.16); const sc = lerp(2.2, 1, Math.min(1, kS)); ctx.scale(sc, sc);
    ctx.globalAlpha = Math.min(1, kS * 1.5); ctx.fillStyle = 'rgba(217,58,43,0.12)'; rrect(ctx, -340, -76, 680, 152, 20); ctx.fill(); ctx.strokeStyle = C.red; ctx.lineWidth = 12; ctx.stroke();
    ctx.font = font(76, 800, D); text(ctx, 'TƏSDİQLƏNDİ', 0, 27, font(76, 800, D), C.red, 'center'); ctx.restore(); }
  ctx.restore();
}
function sReserve(ctx, t, IMG) {
  const t0 = S.C, tN = T('Azıx-Tağlar') - 0.05, tQ = T('qoruğunun') - 0.05, tE = T('əsasnaməsi') - 0.1, tS = T('təsdiqləndi.') + 0.05;
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 2 });
  photo(ctx, IMG.xoc, cx, 800, 860, 580, pop(t, t0 - 0.1), t, t0, { rot: -0.02, zoom1: 1.15, dur: 2, fy: 0.6 });
  stamp(ctx, 'DÜNƏN · 27 NOYABR', cx, TOP + 120, 78, pop(t, T('Dünən') - 0.04) * out(t, tN - 0.1), { bg: C.gold, rot: -0.04 });
  dropPhoto(ctx, t, tN, IMG.cave_f, cx + 8, 800, 600, 760, { rot: 0.03, zoom1: 1.12, dur: 2, fy: 0.5,
    name: 'AZIX-TAĞLAR', sub: 'Arxeoloji Parkı · qoruq', nameK: pop(t, tN + 0.12) * out(t, tE - 0.1) });
  dropPhoto(ctx, t, tQ, IMG.plan, cx - 6, 760, 820, 640, { rot: -0.025, zoom1: 1.1, dur: 2, fy: 0.5 });
  const kD = sp(t, tE, SPRING.snappy); if (kD > 0) { ctx.save(); ctx.translate((1 - Math.min(1, kD)) * W, 0); doc(ctx, t, cx, 780, 1, pop(t, tS)); ctx.restore(); }
}

// ---------------------------------------------------------------- D: payoff — a ~20-year-old woman
function head(ctx, t, x, y, k, glow) { // illustrative profile silhouette, jaw line glowing gold
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); const q = Math.min(1.05, k); ctx.scale(q, q);
  ctx.beginPath(); ctx.moveTo(-40, -280); ctx.bezierCurveTo(-200, -260, -260, -60, -230, 120); ctx.bezierCurveTo(-220, 220, -170, 300, -120, 340);
  ctx.bezierCurveTo(-130, 240, -150, 140, -110, 60); ctx.closePath(); ctx.fillStyle = 'rgba(10,6,3,0.95)'; ctx.fill(); outline(ctx, 4, C.ochre);
  ctx.beginPath(); // facing right
  ctx.moveTo(-60, 330); ctx.bezierCurveTo(-60, 250, -50, 200, -40, 170); // back of neck
  ctx.bezierCurveTo(-170, 140, -210, 20, -200, -80); ctx.bezierCurveTo(-190, -220, -80, -300, 30, -290); // back of head + crown
  ctx.bezierCurveTo(130, -280, 190, -210, 195, -120); // forehead
  ctx.bezierCurveTo(198, -80, 205, -60, 240, 0); ctx.lineTo(205, 20); // nose
  ctx.bezierCurveTo(215, 45, 210, 55, 200, 62); ctx.bezierCurveTo(212, 75, 205, 92, 192, 100); // lips
  ctx.bezierCurveTo(196, 130, 185, 150, 150, 158); // chin
  ctx.bezierCurveTo(100, 165, 60, 150, 40, 140); // under jaw
  ctx.bezierCurveTo(40, 200, 50, 260, 60, 330); ctx.closePath();
  ctx.fillStyle = 'rgba(10,6,3,0.95)'; ctx.fill(); outline(ctx, 5, C.ochre);
  if (glow > 0) { const p = clamp(glow); ctx.save(); ctx.shadowColor = C.gold; ctx.shadowBlur = 40 * p;
    ctx.beginPath(); ctx.moveTo(192, 100); ctx.bezierCurveTo(196, 130, 185, 150, 150, 158); ctx.bezierCurveTo(100, 165, 60, 150, 20, 110); ctx.lineTo(-20, 40);
    ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.strokeStyle = C.gold; ctx.setLineDash([600 * p, 1000]); ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
function sPayoff(ctx, t, IMG) {
  const t0 = S.D, tJ = T('çənə', 1) - 0.08, t20 = T('iyirmi') - 0.05, tQ = T('qadına') - 0.05;
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 3, torch: 1.2 });
  photo(ctx, IMG.maral, cx, 780, 640, 760, pop(t, t0 - 0.1) * out(t, tJ + 0.1, 0.25), t, t0, { rot: 0.02, zoom1: 1.2, dur: 2, fy: 0.5, gray: 0.2,
    name: 'AZIX TAPINTILARI', sub: 'maral sümükləri', nameK: pop(t, t0 + 0.2) * out(t, tJ - 0.1) });
  for (const [r0, c] of [[t20, C.gold], [tQ, C.chalk]]) { const q = prog(t, r0, r0 + 0.9); if (q > 0 && q < 1) {
    ctx.save(); ctx.globalAlpha = 1 - q; ctx.lineWidth = 10; ctx.strokeStyle = c; ctx.beginPath(); ctx.arc(cx, 760, 260 + 260 * E.outCubic(q), 0, TAU); ctx.stroke(); ctx.restore(); } }
  const zh = Math.exp(0.06 * Math.max(0, t - tJ)); ctx.save(); ctx.translate(cx, 760); ctx.scale(zh, zh); ctx.translate(-cx, -760);
  head(ctx, t, cx + 10, 760, pop(t, tJ), prog(t, tJ + 0.2, tJ + 0.9)); ctx.restore();
  const k20 = pop(t, t20) * out(t, tQ - 0.1);
  if (k20 > 0) stamp(ctx, `≈${NB}20 YAŞ`, cx, TOP + 120, 110, k20, { bg: C.gold, rot: -0.04 });
  const kQ = pop(t, tQ); if (kQ > 0) { ctx.save(); shake(ctx, B(t), B(tQ), 8, 3, 0.2);
    stamp(ctx, `≈${NB}20 YAŞLI QADIN`, cx, TOP + 120, 96, kQ, { bg: C.chalk, rot: 0.03 }); ctx.restore(); }
}

// ---------------------------------------------------------------- F: end card
function sEnd(ctx, t, IMG) {
  const t0 = S.F;
  world(ctx, t, { zoom: Math.exp(0.02 * (t - t0)), seed: 7 });
  ctx.save(); ctx.translate(cx, 500); ctx.scale(0.95, 0.95); ctx.translate(-cx, -500); ctx.translate(0, 10 * Math.sin((t - t0) * 2.2)); ctx.globalAlpha = 1; head(ctx, t, cx - 20, 470, pop(t, t0 - 0.1), 0.75 + 0.25 * Math.sin((t - t0) * 4)); ctx.restore();
  text(ctx, '@bilirdinizmi_az', cx, 860, font(80, 800, D), C.chalk, 'center');
  const kB = pop(t, T('Bəyən') - 0.05), kI = pop(t, T('izlə') - 0.05);
  const pulse = (x) => 1 + 0.05 * Math.sin((t - x) * 5) * (t > x + 0.6);
  if (kB > 0) { ctx.save(); ctx.translate(cx - 215, 985); ctx.scale(kB * pulse(T('Bəyən')), kB * pulse(T('Bəyən'))); ctx.rotate(-0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 6);
    ctx.save(); ctx.translate(-110, 4); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30);
    ctx.fillStyle = '#E8384F'; ctx.fill(); ctx.restore();
    text(ctx, 'BƏYƏN', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  if (kI > 0) { ctx.save(); ctx.translate(cx + 215, 985); ctx.scale(kI * pulse(T('izlə') + 0.4), kI * pulse(T('izlə') + 0.4)); ctx.rotate(0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 6);
    ctx.save(); ctx.translate(-115, 4); ctx.lineWidth = 12; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'İZLƏ', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  const kS = pop(t, T('hər') - 0.05);
  if (kS > 0) { ctx.save(); ctx.translate(cx, 1158); ctx.scale(kS, kS);
    rrect(ctx, -420, -72, 840, 144, 34); ctx.fillStyle = C.paper; ctx.fill(); outline(ctx, 5);
    const wig = 0.18 * Math.sin((t - T('hər')) * 8) * (t > T('fakt!') + 0.3 ? Math.exp(-((t - T('fakt!') - 0.3) % 1.6) * 3) : 0);
    ctx.save(); ctx.translate(-335, 0); ctx.rotate(wig); envelope(ctx, 0, 0, 90); ctx.restore();
    text(ctx, 'Tarixi sevən', 45, -10, font(52, 800, UI), C.ink, 'center'); text(ctx, 'dostuna göndər', 45, 50, font(52, 800, UI), C.ink, 'center'); ctx.restore(); }
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 700, UI)],
  images: { jaw2: 'assets/jaw2.jpg', cave_e: 'assets/cave_e.jpg', cave_b: 'assets/cave_b.jpg', cave_d: 'assets/cave_d.jpg', cave_a: 'assets/cave_a.jpg',
    layers: 'assets/layers.jpg', __HUS__ jaw1: 'assets/jaw1.jpg', cave_f: 'assets/cave_f.jpg', plan: 'assets/plan.jpg',
    maral: 'assets/maral.jpg', xoc: 'assets/xocavend.jpg' },
  hits: HITS,
  draw(ctx, u, t, IMG) {
    const seq = [[0, sHook], [S.B, sFind], [S.C, sReserve], [S.D, sPayoff], [S.F, sEnd]];
    let j = 1; while (j < seq.length && t >= seq[j][0] + 0.2) j++;
    if (j >= seq.length) sEnd(ctx, t, IMG);
    else whip(ctx, t, seq[j][0], () => seq[j - 1][1](ctx, t, IMG), () => seq[j][1](ctx, t, IMG), 0.3);
    subtitles(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 160; i++) { ctx.fillStyle = `rgba(240,230,210,${0.015 + 0.025 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
