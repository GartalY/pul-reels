// "Bir — dörd" — @bilirdinizmi_az 18:30 animated reel, 26 Nov 2026 (TREND + PHOTO STORY), Arif voice, no music.
// Sabah 1:4 Barcelona, 25 Nov 2026, Baku Olympic Stadium, UCL league phase MD5. Barça's first official match in Azerbaijan.
// Barça goals 31', 51', 55', 60' (30 minutes); Joy-Lance Mickels ("Coy-Lens Mikels") 63' consolation. Quote = his own words.
// Sources: facts/2026-11-26.json reel_1830. Real photos (Wikimedia Commons, credited in the caption). No logos.
// VIEWER FEEDBACK 24 Nov: narration = ONE fixed subtitle bar (y 1252-1442), phrases; max ONE other text element at a time.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = __TIMING__;
const C = {
  night: '#0B1426', chalk: '#F4F1E8', white: '#FFFFFF', ink: '#0D1220', gold: '#FFC629', red: '#E5372B', green: '#2FB866',
  paper: '#F6F0E1', panel: '#0E1830', claret: '#A50044', blue: '#1E4FA0',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const TOP = s.y;            // 250
const LOW = 1225;           // nothing decorative below this (subtitle bar starts at 1252)
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const out = (t, t1, d = 0.14) => 1 - E.inCubic(clamp((t - t1) / d)); // shrink away
const T = (w, n = 0) => { const m = TIMING.words.filter((x) => x[0] === w); return m[n] ? m[n][1] : 0; };
const CH = TIMING.chunks;
const S = { A: 0, B: CH[3].t0, C: CH[5].t0, D: CH[6].t0, E: CH[8].t0, F: CH[10].t0 };
const B = (t) => t / 0.5;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.3, from, to }];

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
function ball(ctx, x, y, r, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fillStyle = C.white; ctx.fill(); outline(ctx, Math.max(3, r * 0.12));
  ctx.fillStyle = C.ink; ctx.beginPath();
  for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * TAU / 5; ctx.lineTo(Math.cos(a) * r * 0.38, Math.sin(a) * r * 0.38); } ctx.closePath(); ctx.fill();
  for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * TAU / 5 + TAU / 10; ctx.beginPath(); ctx.arc(Math.cos(a) * r * 0.92, Math.sin(a) * r * 0.92, r * 0.22, 0, TAU); ctx.fill(); }
  ctx.restore();
}

// a real photo in a white print frame, slow push-in, optional name plate on the photo
function photo(ctx, img, x, y, w, h, k, t, t0, { rot = 0, crop = null, zoom0 = 1.0, zoom1 = 1.12, dur = 3, fx = 0.5, fy = 0.5, name = '', sub = '', nameK = 1, gray = 0 } = {}) {
  if (k <= 0 || !img) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  const pad = 14;
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18;
  rrect(ctx, -w / 2 - pad, -h / 2 - pad, w + pad * 2, h + pad * 2, 10); ctx.fillStyle = C.paper; ctx.fill(); ctx.restore();
  ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.clip();
  const z = zoom0 * (zoom1 / zoom0) ** clamp((t - t0) / dur);
  const [sx, sy, sw, sh] = crop || [0, 0, img.width, img.height];
  const sc = Math.max(w / sw, h / sh) * z, dw = sw * sc, dh = sh * sc;
  ctx.drawImage(img, sx, sy, sw, sh, -w / 2 + (w - dw) * fx, -h / 2 + (h - dh) * fy, dw, dh);
  if (gray > 0) { ctx.fillStyle = `rgba(10,14,25,${gray})`; ctx.fillRect(-w / 2, -h / 2, w, h); }
  ctx.restore();
  if (name && nameK > 0) {
    ctx.save(); ctx.translate(0, h / 2 - 26); ctx.scale(nameK, nameK);
    ctx.font = font(56, 800, D); let nw = ctx.measureText(name).width; if (sub) { ctx.font = font(36, 700, UI); nw = Math.max(nw, ctx.measureText(sub).width); } nw += 64;
    const nh = sub ? 134 : 90;
    rrect(ctx, -nw / 2, -nh + 22, nw, nh, 14); ctx.fillStyle = C.ink; ctx.fill(); outline(ctx, 4, C.gold);
    text(ctx, name, 0, sub ? -50 : -4, font(56, 800, D), C.chalk, 'center');
    if (sub) text(ctx, sub, 0, 4, font(36, 700, UI), C.gold, 'center');
    ctx.restore();
  }
  ctx.restore();
}
// a print that drops in onto the stack (from above, slight rotation settle)
const drop = (t, t0) => { const k = sp(t, t0 - 0.04, SPRING.snappy); return { k: t < t0 - 0.04 ? 0 : 1, dy: (1 - Math.min(1, k)) * -900, r: (1 - Math.min(1, k)) * 0.25 }; };

// scoreboard: SABAH a : b BARSELONA
function scoreboard(ctx, x, y, k, a, b, { flash = 0, sc = 1 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k * sc, k * sc);
  rrect(ctx, -420, -110, 840, 220, 28); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 7, C.gold);
  rrect(ctx, -150, -100, 300, 200, 20); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 5);
  text(ctx, `${a}:${b}`, 0, 64, font(178, 800, D), C.ink, 'center');
  if (flash > 0) { ctx.save(); ctx.globalAlpha = flash; rrect(ctx, -150, -100, 300, 200, 20); ctx.fillStyle = C.gold; ctx.fill(); text(ctx, `${a}:${b}`, 0, 64, font(178, 800, D), C.ink, 'center'); ctx.restore(); }
  text(ctx, 'SABAH', -287, 20, font(56, 800, D), C.chalk, 'center');
  text(ctx, 'BARSELONA', 290, 16, font(40, 800, D), C.chalk, 'center');
  ctx.restore();
}

// ---------------------------------------------------------------- SUBTITLE BAR (fixed, lower third, phrases)
function subtitles(ctx, t) {
  const y0 = 1252, y1 = 1442;
  ctx.save(); rrect(ctx, 36, y0, W - 72, y1 - y0, 26); ctx.fillStyle = 'rgba(6,9,16,0.84)'; ctx.fill();
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

// ---------------------------------------------------------------- world: night stadium, pitch, sweeping floodlights
function world(ctx, t, { zoom = 1, seed = 0 } = {}) {
  fill(ctx, C.night);
  ctx.save(); M.zoomAbout(ctx, zoom, W / 2, H / 2);
  const g = ctx.createLinearGradient(0, H * 0.62, 0, H); g.addColorStop(0, '#0E3A24'); g.addColorStop(1, '#16603A');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-200, H); ctx.lineTo(W + 200, H); ctx.lineTo(W * 0.82, H * 0.64); ctx.lineTo(W * 0.18, H * 0.64); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.16)'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(W * 0.5, H * 0.64); ctx.lineTo(W * 0.5, H); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(W / 2, H * 0.8, 260, 80, 0, 0, TAU); ctx.stroke();
  for (let i = 0; i < 160; i++) { const j = i + seed * 31, x = hash01(j, 3) * W, y = H * 0.5 + hash01(j, 4) * H * 0.13;
    const tw = 0.25 + 0.25 * Math.sin(t * (2 + 3 * hash01(j, 5)) + j);
    ctx.fillStyle = `rgba(255,255,255,${0.05 + 0.1 * tw})`; ctx.fillRect(x, y, 4, 4); }
  for (let k = 0; k < 2; k++) { const ox = k ? W + 60 : -60, a = (k ? Math.PI * 0.72 : Math.PI * 0.28) + 0.12 * Math.sin(t * 0.7 + k * 2 + seed);
    ctx.save(); ctx.translate(ox, H * 0.1); ctx.rotate(a);
    const lg = ctx.createLinearGradient(0, 0, 1600, 0); lg.addColorStop(0, 'rgba(255,240,200,0.20)'); lg.addColorStop(1, 'rgba(255,240,200,0)');
    ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(1600, -260); ctx.lineTo(1600, 260); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.restore();
  const v = ctx.createRadialGradient(W / 2, H * 0.45, 200, W / 2, H * 0.45, H * 0.8);
  v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.55)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
}

// ---------------------------------------------------------------- HITS (sfx.mjs voices them; non-melodic only)
const HITS = [
  [B(0.02), '1:4', 'thud'], [B(CH[1].t0), 'baku photo', 'whoosh', { len: 0.35, from: 1800, to: 500 }], [B(CH[1].t0 + 0.12), 'land', 'click'],
  [B(CH[2].t0), 'lineup photo', 'whoosh', { len: 0.35, from: 1800, to: 500 }], [B(CH[2].t0 + 0.12), 'land2', 'click'], [B(T('tarixi') - 0.03), 'TARİXİ', 'impact'],
  WH(S.B, 600, 2200), [B(S.B + 0.15), 'BARSELONA', 'click'], [B(T('ilk') - 0.05), 'İLK', 'thud'], [B(T('«Sabah»a') - 0.05), 'sabah', 'whoosh', { len: 0.35, from: 1800, to: 500 }],
  [B(T('«Sabah»a') + 0.1), 'sabah land', 'click'],
  WH(S.C, 2200, 600), [B(T('dəqiqədə') - 0.15), 'g31', 'tick'], [B(T('dəqiqədə') + 0.15), 'g51', 'tick'], [B(T('dörd') - 0.08), 'g55', 'tick'],
  [B(T('qol') - 0.02), 'g60', 'thud'], [B(T('vurdu.') + 0.15), '30 DƏQ', 'click'],
  WH(S.D, 600, 2200), [B(T('altmış') - 0.05), "63'", 'impact'], [B(T('Coy-Lens') - 0.05), 'mikels', 'whoosh', { len: 0.35, from: 1800, to: 500 }],
  [B(T('cavab') - 0.05), 'score flip', 'thud'], [B(T('cavab') + 0.25), 'crowd', 'crash'],
  WH(S.E, 2200, 600), [B(T('«Barselonaya') - 0.05), 'bubble', 'click'], [B(T('iki-üç') - 0.02), 'b1', 'tick'], [B(T('iki-üç') + 0.18), 'b2', 'tick'],
  [B(T('qol', 1) - 0.02), 'b3', 'tick'],
  WH(S.F, 2200, 600), [B(T('Bəyən')), 'BƏYƏN', 'click'], [B(T('izlə')), 'İZLƏ', 'thud'], [B(T('fakt!') + 0.3), 'send line', 'tick'],
];

// ---------------------------------------------------------------- A: hook 1:4 + "tarixi gecə" (3 photos)
const PH = { x: cx, y: 800, w: 820, h: 560 };
function sHook(ctx, t, IMG) {
  world(ctx, t, { zoom: Math.exp(0.03 * t) });
  const t1 = CH[1].t0, t2 = CH[2].t0;
  photo(ctx, IMG.fire, PH.x, PH.y, PH.w, PH.h, 1, t, 0, { rot: -0.02, crop: [0, 0, 1234, 640], zoom0: 1.0, zoom1: 1.15, dur: 2.5, fy: 0.2 });
  { const d = drop(t, t1); if (d.k) { ctx.save(); ctx.translate(0, d.dy);
    photo(ctx, IMG.bakunight, PH.x + 10, PH.y + 10, PH.w - 40, PH.h - 20, 1, t, t1, { rot: 0.03 + d.r, zoom1: 1.12, dur: 2, fy: 0.55 }); ctx.restore(); } }
  { const d = drop(t, t2); if (d.k) { ctx.save(); ctx.translate(0, d.dy);
    photo(ctx, IMG.lineup1, PH.x - 6, PH.y + 4, PH.w, PH.h, 1, t, t2, { rot: -0.025 - d.r, crop: [0, 0, 1280, 370], zoom1: 1.14, dur: 2.2, fy: 0.4 }); ctx.restore(); } }
  // frame 0: the score, big
  const tO = T('tarixi') - 0.2;
  const kS = (t < 0.22 ? lerp(1.12, 1, E.outBack(prog(t, 0, 0.22))) : 1) * out(t, tO);
  ctx.save(); shake(ctx, B(t), B(0.02), 12, 3, 0.2); scoreboard(ctx, cx, TOP + 125, kS, 1, 4, { sc: 1 }); ctx.restore();
  stamp(ctx, 'TARİXİ GECƏ', cx + 30, TOP + 160, 84, pop(t, T('tarixi') - 0.05), { bg: C.gold, rot: -0.05 });
}

// ---------------------------------------------------------------- B: Barcelona's first official match in Azerbaijan, v Sabah
function sFirst(ctx, t, IMG) {
  const t0 = S.B, tI = T('ilk') - 0.07, tS = T('«Sabah»a') - 0.07;
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 1 });
  photo(ctx, IMG.campnou, PH.x, PH.y - 40, PH.w, 640, 1, t, t0, { rot: 0.02, zoom1: 1.18, dur: 2.5, fy: 0.5,
    name: 'BARSELONA', sub: 'İspaniya · 1899-cu ildən', nameK: pop(t, t0 + 0.1) * out(t, tI - 0.1) });
  { const d = drop(t, tI); if (d.k) { ctx.save(); ctx.translate(0, d.dy);
    photo(ctx, IMG.warm22, PH.x, PH.y + 20, PH.w, 600, 1, t, tI, { rot: -0.03 + d.r, crop: [0, 250, 640, 460], zoom1: 1.15, dur: 2, fy: 0.5 }); ctx.restore(); } }
  stamp(ctx, 'İLK RƏSMİ OYUN', cx, TOP + 150, 78, pop(t, tI + 0.05) * out(t, tS - 0.1), { bg: C.gold, rot: -0.04 });
  { const d = drop(t, tS); if (d.k) { ctx.save(); ctx.translate(0, d.dy);
    photo(ctx, IMG.sabahA, PH.x + 8, PH.y - 10, 700, 720, 1, t, tS, { rot: 0.03 - d.r, crop: [0, 250, 1080, 1060], zoom1: 1.12, dur: 2, fy: 0.3,
      name: 'SABAH', sub: 'Bakı · 2017-ci ildən', nameK: pop(t, tS + 0.2) }); ctx.restore(); } }
}

// ---------------------------------------------------------------- C: 4 goals in 30 minutes (goal timeline)
const GOALS = [31, 51, 55, 60];
function sGoals(ctx, t, IMG) {
  const t0 = S.C;
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 2 });
  const tg = [T('dəqiqədə') - 0.15, T('dəqiqədə') + 0.15, T('dörd') - 0.08, T('qol') - 0.02];
  const tP = tg[2] - 0.1;
  photo(ctx, IMG.play1, cx, TOP + 250, 840, 440, pop(t, t0 - 0.1), t, t0, { rot: -0.02, crop: [0, 150, 820, 570], zoom1: 1.16, dur: 2, fy: 0.5 });
  { const d = drop(t, tP); if (d.k) { ctx.save(); ctx.translate(0, d.dy);
    photo(ctx, IMG.play2, cx + 6, TOP + 256, 840, 440, 1, t, tP, { rot: 0.02 + d.r, crop: [0, 200, 560, 520], zoom1: 1.14, dur: 2, fy: 0.5 }); ctx.restore(); } }
  // timeline 25' -> 65' (zoomed so the four goals don't overlap)
  const kL = pop(t, t0 + 0.05); if (kL <= 0) return;
  const y = 900, x0 = s.x + 50, x1 = s.x + s.w - 50, M0 = 25, M1 = 65, X = (m) => lerp(x0, x1, (m - M0) / (M1 - M0));
  ctx.save(); ctx.translate(cx, y); ctx.scale(Math.min(1, kL), Math.min(1, kL)); ctx.translate(-cx, -y);
  rrect(ctx, s.x - 10, y - 170, s.w + 20, 330, 30); ctx.fillStyle = 'rgba(14,24,48,0.94)'; ctx.fill(); outline(ctx, 5, C.gold);
  ctx.lineCap = 'round'; ctx.strokeStyle = 'rgba(244,241,232,0.3)'; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  const cur = lerp(M0, 61, E.inOutSine(prog(t, t0 + 0.1, tg[3] + 0.05)));
  ctx.strokeStyle = C.claret; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(X(cur), y); ctx.stroke();
  
  // 30-minute bracket
  const kB = clamp(prog(t, tg[3] + 0.25, tg[3] + 0.55));
  if (kB > 0) { ctx.save(); ctx.globalAlpha = kB; ctx.strokeStyle = C.gold; ctx.lineWidth = 6; ctx.beginPath();
    ctx.moveTo(X(31), y - 70); ctx.lineTo(X(31), y - 90); ctx.lineTo(X(60), y - 90); ctx.lineTo(X(60), y - 70); ctx.stroke();
    text(ctx, '30 DƏQİQƏ', (X(31) + X(60)) / 2, y - 112, font(46, 800, D), C.gold, 'center'); ctx.restore(); }
  GOALS.forEach((m, i) => { const k = pop(t, tg[i]); if (k <= 0) return;
    ctx.save(); ctx.translate(X(m), y); ctx.scale(k, k); ball(ctx, 0, 0, 34, (t - tg[i]) * 3);
    text(ctx, `${m}'`, 0, i % 2 ? 128 : 80, font(42, 800, D), i === 3 ? C.gold : C.chalk, 'center'); ctx.restore(); });
  ctx.restore();
}

// ---------------------------------------------------------------- D: 63' Mikels answers (1:4)
function player(ctx, x, y, sc, t) { // silhouette fallback (no licensable photo of Mikels): footballer celebrating, arms up
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  const w = 0.06 * Math.sin(t * 8);
  const limbs = (col, lw) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
    ctx.moveTo(-58, -255); ctx.lineTo(-135, -370 + 20 * w); ctx.lineTo(-150, -480 + 30 * w);
    ctx.moveTo(58, -255); ctx.lineTo(135, -370 - 20 * w); ctx.lineTo(150, -480 - 30 * w);
    ctx.moveTo(-32, -70); ctx.lineTo(-62, 50); ctx.lineTo(-78, 165);
    ctx.moveTo(32, -70); ctx.lineTo(62, 50); ctx.lineTo(78, 165); ctx.stroke(); };
  const body = (col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, -330, 46, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-74, -275); ctx.quadraticCurveTo(0, -292, 74, -275); ctx.lineTo(58, -60); ctx.lineTo(-58, -60); ctx.closePath(); ctx.fill(); };
  // gold rim: draw bigger in gold first, then the dark figure
  ctx.save(); ctx.shadowColor = 'rgba(255,198,41,0.8)'; ctx.shadowBlur = 30; limbs(C.gold, 58); ctx.restore();
  ctx.save(); ctx.translate(0, 0); ctx.scale(1.07, 1.04); body(C.gold); ctx.restore();
  limbs('#05070C', 44); body('#05070C');
  ctx.restore();
}
function sMikels(ctx, t, IMG) {
  const t0 = S.D, tN = T('Coy-Lens') - 0.07, tF = T('cavab') - 0.05;
  world(ctx, t, { zoom: Math.exp(0.035 * (t - t0)), seed: 3 });
  photo(ctx, IMG.tifo, cx, 760, 820, 880, pop(t, t0 - 0.1), t, t0, { rot: -0.02, crop: [0, 180, 1200, 1290], zoom1: 1.2, dur: 3.6, fy: 0.35, gray: t > tN ? 0.35 * clamp((t - tN) / 0.3) : 0 });
  // 63' big
  const k63 = pop(t, T('altmış') - 0.05) * out(t, tN - 0.05);
  ctx.save(); shake(ctx, B(t), B(T('altmış')), 10, 3, 0.2); big(ctx, "63'", cx, 560, 300, C.gold, k63, { rot: -0.05, sw: 0.08 }); ctx.restore();
  // Mikels: photo if we have one, otherwise silhouette
  const kM = pop(t, tN);
  if (IMG.mikels) photo(ctx, IMG.mikels, cx, 640, 500, 640, kM, t, tN, { rot: 0.03, crop: [120, 0, 900, 1250], zoom1: 1.1, dur: 2.5, fy: 0.2,
    name: 'COY-LENS MİKELS', sub: 'Sabah', nameK: pop(t, tN + 0.12) * out(t, tF - 0.1) });
  else if (kM > 0) { player(ctx, cx, 975, 1.35 * Math.min(1, kM), t);
    const kP = pop(t, tN + 0.12) * out(t, tF - 0.1);
    if (kP > 0) { ctx.save(); ctx.translate(cx, 1120); ctx.scale(kP, kP); ctx.font = font(56, 800, D); const nw = ctx.measureText('COY-LENS MİKELS').width + 64;
      rrect(ctx, -nw / 2, -70, nw, 134, 14); ctx.fillStyle = C.ink; ctx.fill(); outline(ctx, 4, C.gold);
      text(ctx, 'COY-LENS MİKELS', 0, -2, font(56, 800, D), C.chalk, 'center'); text(ctx, 'Sabah', 0, 50, font(36, 700, UI), C.gold, 'center'); ctx.restore(); } }
  // scoreboard flips 0:4 -> 1:4
  const kS = pop(t, tF + 0.02); const a = t >= tF + 0.12 ? 1 : 0;
  const fl = t >= tF + 0.12 ? Math.exp(-(t - tF - 0.12) * 3) : 0;
  ctx.save(); if (t > tF + 0.12) shake(ctx, B(t), B(tF + 0.12), 10, 3, 0.25);
  scoreboard(ctx, cx, 1085, kS, a, 4, { flash: fl }); ctx.restore();
}

// ---------------------------------------------------------------- E: after the match — "we could have scored 2-3"
function sQuote(ctx, t, IMG) {
  const t0 = S.E, tQ = T('«Barselonaya') - 0.08, tP = T('vura') - 0.05;
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 4 });
  photo(ctx, IMG.wide17, cx, 600, 840, 520, pop(t, t0 - 0.1), t, t0, { rot: 0.02, crop: [300, 60, 980, 660], zoom1: 1.15, dur: 2.5, fy: 0.5 });
  { const tM = T('dedi:') - 0.1, d = drop(t, tM); if (d.k) { ctx.save(); ctx.translate(0, d.dy);
    photo(ctx, IMG.mikelsTalk, cx, 545, 560, 590, 1, t, tM, { rot: -0.025 + d.r, crop: [350, 60, 620, 900], zoom1: 1.12, dur: 3.5, fx: 0.7, fy: 0.25,
      name: 'COY-LENS MİKELS', nameK: pop(t, tM + 0.15) * out(t, tQ - 0.1) }); ctx.restore(); } }
  // speech bubble with "2-3 QOL?" + balls
  const kQ = pop(t, tQ); if (kQ <= 0) return;
  ctx.save(); ctx.translate(cx, 1010); ctx.scale(kQ, kQ); ctx.rotate(-0.02);
  ctx.beginPath(); rrect(ctx, -380, -150, 760, 300, 50); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 7);
  ctx.beginPath(); ctx.moveTo(-160, -150); ctx.lineTo(-210, -230); ctx.lineTo(-90, -150); ctx.closePath(); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 7);
  ctx.fillStyle = C.chalk; ctx.fillRect(-170, -158, 90, 16);
    const tb = [T('iki-üç') - 0.02, T('iki-üç') + 0.18, T('qol', 1) - 0.02];
  tb.forEach((x, i) => { const k = pop(t, x); if (k > 0) { ctx.save(); ctx.translate(-180 + i * 110, -60); ctx.scale(k, k); ball(ctx, 0, 0, 40, (t - x) * 2 + i); ctx.restore(); } });
  text(ctx, '2-3 QOL', 30, 100, font(120, 800, D), C.ink, 'center');
  ctx.restore();
}

// ---------------------------------------------------------------- F: end card
function sEnd(ctx, t, IMG) {
  const t0 = S.F;
  world(ctx, t, { zoom: Math.exp(0.02 * (t - t0)), seed: 7 });
  photo(ctx, IMG.olympic, cx, 520, 820, 500, pop(t, t0 - 0.1), t, t0, { rot: -0.02, zoom1: 1.15, dur: 5, fy: 0.6 });
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
    text(ctx, 'Sabahı sevən', 45, -10, font(52, 800, UI), C.ink, 'center'); text(ctx, 'dostuna göndər', 45, 50, font(52, 800, UI), C.ink, 'center'); ctx.restore(); }
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 700, UI)],
  images: { fire: 'assets/fire.jpg', bakunight: 'assets/bakunight.jpg', lineup1: 'assets/lineup1.jpg', campnou: 'assets/campnou.jpg', warm22: 'assets/warm22.jpg',
    sabahA: 'assets/sabah_hapoel2.jpg', play1: 'assets/play1.jpg', play2: 'assets/play2.jpg', tifo: 'assets/sabah_hapoel1.jpg', wide17: 'assets/wide17.jpg',
    olympic: 'assets/olympic.jpg', mikels: 'assets/mikels_pitch.jpg', mikelsTalk: 'assets/mikels_talk.jpg' },
  hits: HITS,
  draw(ctx, u, t, IMG) {
    const seq = [[0, sHook], [S.B, sFirst], [S.C, sGoals], [S.D, sMikels], [S.E, sQuote], [S.F, sEnd]];
    let j = 1; while (j < seq.length && t >= seq[j][0] + 0.2) j++;
    if (j >= seq.length) sEnd(ctx, t, IMG);
    else whip(ctx, t, seq[j][0], () => seq[j - 1][1](ctx, t, IMG), () => seq[j][1](ctx, t, IMG), 0.3);
    subtitles(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 160; i++) { ctx.fillStyle = `rgba(240,240,230,${0.015 + 0.025 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
