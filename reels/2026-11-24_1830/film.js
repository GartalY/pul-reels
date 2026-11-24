// "Bir gündə 950 milyard dollar" — @bilirdinizmi_az 18:30 animated TREND reel, 24 Nov 2026, PHOTO STORY look.
// Jensen Huang reinstated as Nvidia CEO by the board on 23 Nov 2026 (resigned 12 Nov); shares closed +31.5 %, market value
// +$950 bn+ in one day (Nvidia press release / SEC 8-K, Al Jazeera, Investing.com). AZ GDP 2025 = 129.1 bn manat ≈ $75.9 bn (report.az)
// -> "12 dəfədən çox" (scale only, not money earned). Arif voice (ElevenLabs) on audio/vo.wav.
// VIEWER FEEDBACK 24 Nov: narration = ONE fixed subtitle bar (lower third), phrases of 3-6 words, never moving;
// max ONE other text element on screen at a time, never over the bar. 11 different real photos (credits in the caption).
// No logos (cropped out). No music.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = {"dur": 25.4, "chunks": [{"t0": 0, "text": "Bir gündə 950 milyard dollar!", "keys": ["950", "milyard", "dollar!"], "t1": 3.339}, {"t0": 3.339, "text": "Censen Huanq «Nvidia»ya qayıtdı.", "keys": ["Censen", "Huanq"], "t1": 5.824}, {"t0": 5.824, "text": "12 noyabrda istefa vermişdi.", "keys": ["istefa"], "t1": 8.024}, {"t0": 8.024, "text": "11 gün sonra", "keys": ["11", "gün"], "t1": 9.052}, {"t0": 9.052, "text": "şura onu geri qaytardı.", "keys": ["geri", "qaytardı."], "t1": 10.856}, {"t0": 10.856, "text": "Elə həmin gün", "keys": ["həmin"], "t1": 11.751}, {"t0": 11.751, "text": "səhmlər 31 faizdən çox bahalaşdı.", "keys": ["31", "faizdən", "bahalaşdı."], "t1": 14.686}, {"t0": 14.686, "text": "Bu məbləğ Azərbaycanın illik iqtisadiyyatından", "keys": ["Azərbaycanın"], "t1": 17.619}, {"t0": 17.619, "text": "12 dəfədən çoxdur!", "keys": ["12", "dəfədən"], "t1": 19.625}, {"t0": 19.625, "text": "Bəyən və izlə —", "keys": ["Bəyən", "izlə"], "t1": 20.914}, {"t0": 20.914, "text": "hər gün bilmədiyin bir fakt!", "keys": ["fakt!"], "t1": 25.4}], "words": [["Bir", 0.0], ["gündə", 0.277], ["doqquz", 0.693], ["yüz", 1.179], ["əlli", 1.456], ["milyard", 1.803], ["dollar!", 2.357], ["Censen", 3.399], ["Huanq", 3.83], ["«Nvidia»ya", 4.2], ["qayıtdı.", 4.878], ["On", 5.884], ["iki", 6.047], ["noyabrda", 6.264], ["istefa", 6.752], ["vermişdi.", 7.132], ["On", 8.084], ["bir", 8.265], ["gün", 8.507], ["sonra", 8.749], ["şura", 9.112], ["onu", 9.415], ["geri", 9.657], ["qaytardı.", 9.959], ["Elə", 10.916], ["həmin", 11.172], ["gün", 11.556], ["səhmlər", 11.811], ["otuz", 12.323], ["bir", 12.643], ["faizdən", 12.899], ["çox", 13.411], ["bahalaşdı.", 13.666], ["Bu", 14.746], ["məbləğ", 14.933], ["Azərbaycanın", 15.37], ["illik", 16.182], ["iqtisadiyyatından", 16.556], ["on", 17.679], ["iki", 17.867], ["dəfədən", 18.116], ["çoxdur!", 18.616], ["Bəyən", 19.685], ["və", 20.084], ["izlə", 20.284], ["hər", 20.974], ["gün", 21.183], ["bilmədiyin", 21.392], ["bir", 21.967], ["fakt!", 22.176]]};
const C = {
  bg: '#0C1220', bg2: '#16203A', ink: '#0A0E18', paper: '#F5F1E6', white: '#FFFFFF', gold: '#FFCD00', green: '#2FD27A',
  red: '#E5372B', mute: 'rgba(245,241,230,0.12)', blue: '#0092BC',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const TOP = s.y, BOT = 1225;                 // decoration lives between TOP and BOT; the subtitle bar sits below BOT
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const out = (t, t1, d = 0.18) => 1 - E.inCubic(prog(t, t1, t1 + d));   // quick exit so only ONE text element is ever up

const WS = TIMING.words;
const T = (w, n = 0) => { const m = WS.filter((x) => x[0] === w); return m[n] ? m[n][1] : 0; };
const END = TIMING.dur;
const S = { A: 0, B: T('Censen') - 0.12, C: T('On') - 0.1, D: T('On', 1) - 0.1, E: T('Elə') - 0.1, F: T('Bu') - 0.1, G: T('Bəyən') - 0.12 };
const B = (t) => t / 0.5;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.3, from, to }];

const HITS = [
  [B(0.02), 'hook', 'thud'], [B(T('əlli') - 0.05), 'portrait', 'click'], [B(T('dollar!')), 'shake', 'thud'],
  WH(S.B, 600, 2200), [B(T('Censen')), 'name', 'click'], [B(T('«Nvidia»ya') - 0.05), 'hq', 'tick'], [B(T('qayıtdı.')), 'bump', 'tick'],
  WH(S.C, 2200, 600), [B(T('noyabrda') - 0.1), 'calendar', 'thud'], [B(T('istefa')), 'stamp', 'thud'],
  WH(S.D, 600, 2200), [B(T('On', 1) + 0.15), 'flip', 'whoosh', { len: 0.8, from: 400, to: 1600 }], [B(T('sonra')), '23', 'tick'],
  [B(T('şura') - 0.05), 'photo', 'click'], [B(T('geri')), 'checks', 'tick'], [B(T('qaytardı.')), 'stamp', 'thud'],
  WH(S.E, 2200, 600), [B(T('səhmlər') - 0.1), 'chip', 'click'], [B(T('səhmlər') - 0.05), 'climb', 'whoosh', { len: 1.8, from: 300, to: 1500 }],
  [B(T('bahalaşdı.')), '31.5', 'thud'],
  WH(S.F, 600, 2200), [B(T('Azərbaycanın')), 'flag bar', 'click'], [B(T('on') + 0.05), 'stack', 'tick'], [B(T('çoxdur!')), '12x', 'thud'],
  WH(S.G, 2200, 600), [B(T('Bəyən')), 'BƏYƏN', 'click'], [B(T('izlə')), 'İZLƏ', 'thud'], [B(T('fakt!') + 0.3), 'send line', 'tick'],
];

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
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha *= clamp(q * 3);
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
  rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.fillStyle = C.paper; ctx.fill(); outline(ctx, 4);
  ctx.beginPath(); ctx.moveTo(-w / 2 + 3, -h / 2 + 3); ctx.lineTo(0, h * 0.08); ctx.lineTo(w / 2 - 3, -h / 2 + 3); outline(ctx, 4); ctx.restore();
}
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

// draw an image to cover a box (with log zoom + pan), optionally grayscale
function cover(ctx, img, x, y, w, h, t, t0, { crop = null, zoom0 = 1.0, zoom1 = 1.12, dur = 4, fx = 0.5, fy = 0.4, gray = 0 } = {}) {
  if (!img) return;
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  const z = zoom0 * (zoom1 / zoom0) ** clamp((t - t0) / dur);
  const [sx, sy, sw, sh] = crop || [0, 0, img.width, img.height];
  const sc = Math.max(w / sw, h / sh) * z, dw = sw * sc, dh = sh * sc;
  if (gray > 0) ctx.filter = `grayscale(${gray}) brightness(${1 - 0.25 * gray})`;
  ctx.drawImage(img, sx, sy, sw, sh, x + (w - dw) * fx, y + (h - dh) * fy, dw, dh);
  ctx.filter = 'none'; ctx.restore();
}
// a real photo in a white print frame; optional name plate (counts as the one text element)
function photo(ctx, img, x, y, w, h, k, t, t0, o = {}) {
  if (k <= 0 || !img) return; const { rot = 0, name = '', sub = '', nameK = 1 } = o;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  const pad = 14;
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18;
  rrect(ctx, -w / 2 - pad, -h / 2 - pad, w + pad * 2, h + pad * 2, 10); ctx.fillStyle = C.paper; ctx.fill(); ctx.restore();
  cover(ctx, img, -w / 2, -h / 2, w, h, t, t0, o);
  if (name && nameK > 0) {
    ctx.save(); ctx.translate(0, h / 2 - 24); ctx.scale(nameK, nameK);
    ctx.font = font(58, 800, D); let nw = ctx.measureText(name).width; ctx.font = font(36, 700, UI); if (sub) nw = Math.max(nw, ctx.measureText(sub).width); nw += 64;
    const nh = sub ? 136 : 90;
    rrect(ctx, -nw / 2, -nh + 22, nw, nh, 14); ctx.fillStyle = C.ink; ctx.fill(); outline(ctx, 4, C.gold);
    text(ctx, name, 0, sub ? -52 : -6, font(58, 800, D), C.white, 'center');
    if (sub) text(ctx, sub, 0, 4, font(36, 700, UI), C.gold, 'center');
    ctx.restore();
  }
  ctx.restore();
}

// ---------------------------------------------------------------- SUBTITLE BAR (fixed, lower third, phrases)
function subtitles(ctx, t) {
  const y0 = 1252, y1 = 1442;
  ctx.save(); rrect(ctx, 36, y0, W - 72, y1 - y0, 26); ctx.fillStyle = 'rgba(6,9,16,0.80)'; ctx.fill();
  ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,205,0,0.55)'; ctx.stroke(); ctx.restore();
  const ch = TIMING.chunks.find((c) => t >= c.t0 && t < c.t1); if (!ch) return;
  const a = ch.t0 <= 0 ? 1 : clamp((t - ch.t0) / 0.08);              // 80 ms fade-in only, no movement
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

// ---------------------------------------------------------------- world: dark trading-floor grid with a drifting ticker line
function world(ctx, t, { seed = 0, tint = 0 } = {}) {
  fill(ctx, C.bg);
  const g = ctx.createRadialGradient(W / 2, H * 0.38, 80, W / 2, H * 0.38, H * 0.8);
  g.addColorStop(0, tint ? 'rgba(47,210,122,0.22)' : 'rgba(40,70,140,0.40)'); g.addColorStop(1, 'rgba(0,0,0,0.55)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = C.mute; ctx.lineWidth = 2; const off = (t * 30 + seed * 40) % 90;
  for (let x = -off; x < W; x += 90) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
  for (let y = 0; y < H; y += 90) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  // faint background price line
  ctx.beginPath(); for (let i = 0; i <= 60; i++) { const x = i * W / 60, y = H * 0.62 - i * 6 - 60 * Math.sin(i * 0.5 + seed + t * 0.8) * hash01(i, seed + 3);
    i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.strokeStyle = 'rgba(47,210,122,0.16)'; ctx.lineWidth = 6; ctx.stroke();
}

// ---------------------------------------------------------------- A: hook — "Bir gündə 950 milyard dollar!"
function sHook(ctx, t, IMG) {
  // full-bleed keynote arena, darkened
  cover(ctx, IMG.hces, 0, 0, W, H, t, 0, { zoom0: 1.0, zoom1: 1.18, dur: 3.5, fx: 0.42, fy: 0.5 });
  ctx.fillStyle = 'rgba(8,12,22,0.55)'; ctx.fillRect(0, 0, W, H);
  // Huang portrait card slides in
  const kP = pop(t, T('əlli') - 0.08);
  photo(ctx, IMG.huang, cx + 240, 1055, 300, 300, kP, t, T('əlli'), { rot: 0.06, crop: [0, 0, 942, 1250], zoom1: 1.1, dur: 2.5, fy: 0.2 });
  // the hook — ONE text block, big on frame 0
  const kk = t < 0.25 ? lerp(1.12, 1, E.outBack(prog(t, 0, 0.25))) : 1 + 0.07 * Math.exp(-(t - T('dollar!')) * 6) * (t > T('dollar!'));
  ctx.save(); shake(ctx, B(t), B(T('dollar!')), 14, 3, 0.2);
  ctx.save(); ctx.translate(cx, TOP + 140); ctx.rotate(-0.04); ctx.scale(kk, kk);
  rrect(ctx, -330, -95, 660, 120, 22); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 6);
  text(ctx, '1 GÜNDƏ', 0, 3, font(84, 800, D), C.ink, 'center'); ctx.restore();
  big(ctx, '+950', cx, TOP + 400, 300, C.green, kk, { rot: -0.04, sw: 0.07 });
  big(ctx, 'MİLYARD $', cx, TOP + 550, 130, C.white, kk, { rot: -0.04, sw: 0.1 });
  big(ctx, 'CENSEN HUANQ · «NVIDIA»', cx, TOP + 640, 52, C.gold, kk, { rot: -0.04, sw: 0.14 });
  ctx.restore();
  // rising arrow (no text)
  const ka = E.outCubic(prog(t, 0.1, 1.2));
  ctx.save(); ctx.strokeStyle = C.green; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); const pts = [[s.x + 10, 1200], [s.x + 170, 1100], [s.x + 270, 1140], [s.x + 430, 990]];
  const n = Math.max(1, Math.floor(ka * 3 * 100) / 100); ctx.moveTo(...pts[0]);
  for (let i = 1; i <= 3; i++) { const q = clamp(ka * 3 - (i - 1)); if (q <= 0) break; ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], q), lerp(pts[i - 1][1], pts[i][1], q)); }
  ctx.stroke(); ctx.restore();
}

// ---------------------------------------------------------------- B: "Censen Huanq «Nvidia»ya qayıtdı."
function sBack(ctx, t, IMG) {
  const t0 = S.B; world(ctx, t, { seed: 1 });
  // Nvidia HQ (Endeavor, Santa Clara) — no text on it
  const kH = pop(t, T('«Nvidia»ya') - 0.08);
  photo(ctx, IMG.hq2, cx - 170, TOP + 170, 560, 330, kH, t, T('«Nvidia»ya'), { rot: -0.05, crop: [0, 150, 1400, 820], zoom1: 1.12, dur: 2.5, fy: 0.45 });
  // Huang, big, with the name plate (the one text element)
  const bump = 1 + 0.04 * Math.exp(-(t - T('qayıtdı.')) * 6) * (t > T('qayıtdı.'));
  photo(ctx, IMG.hstan, cx + 70, TOP + 590, 600, 620, bump, t, t0, { rot: 0.03, crop: [0, 0, 1051, 1150], zoom0: 1.02, zoom1: 1.2, dur: 2.8, fy: 0.15,
    name: 'CENSEN HUANQ', sub: '«Nvidia»nın rəhbəri', nameK: pop(t, T('Censen') - 0.05) });
}

// ---------------------------------------------------------------- C: "12 noyabrda istefa vermişdi."
function calendar(ctx, x, y, day, k, rot = -0.05, flipP = 0) {
  if (k <= 0) return; const cw = 330, ch = 290;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  rrect(ctx, -cw / 2, -ch / 2, cw, ch, 22); ctx.fillStyle = C.paper; ctx.fill(); outline(ctx, 6);
  ctx.save(); rrect(ctx, -cw / 2, -ch / 2, cw, ch, 22); ctx.clip(); ctx.fillStyle = C.red; ctx.fillRect(-cw / 2, -ch / 2, cw, 72); ctx.restore();
  text(ctx, 'NOYABR', 0, -ch / 2 + 52, font(42, 800, UI), C.white, 'center');
  ctx.save(); ctx.scale(1, 1 - 0.9 * Math.sin(Math.PI * flipP));
  text(ctx, String(day), 0, 112, font(176, 800, D), C.ink, 'center'); ctx.restore();
  ctx.restore();
}
function sQuit(ctx, t, IMG) {
  const t0 = S.C; world(ctx, t, { seed: 2 });
  const g = clamp(prog(t, T('istefa') - 0.1, T('istefa') + 0.5));
  photo(ctx, IMG.h2016, cx + 60, TOP + 640, 680, 520, 1, t, t0, { rot: -0.03, crop: [300, 0, 900, 854], zoom0: 1.05, zoom1: 1.22, dur: 2.4, fy: 0.25, gray: g });
  // text element 1: calendar (until "istefa"), then text element 2: stamp
  const kC = pop(t, T('noyabrda') - 0.15) * out(t, T('istefa') - 0.12);
  calendar(ctx, s.x + 200, TOP + 260, 12, kC, -0.06);
  ctx.save(); shake(ctx, B(t), B(T('istefa')), 14, 3, 0.25);
  stamp(ctx, 'İSTEFA', cx + 60, TOP + 330, 96, pop(t, T('istefa') - 0.02), { bg: C.red, fg: C.white, rot: -0.08 }); ctx.restore();
}

// ---------------------------------------------------------------- D: "11 gün sonra şura onu geri qaytardı."
function sReturn(ctx, t, IMG) {
  const t0 = S.D; world(ctx, t, { seed: 3, tint: 1 });
  // calendar flips 12 -> 23 (text element), leaves when the photo comes
  const fp = prog(t, T('On', 1) + 0.1, T('sonra') + 0.1), day = 12 + Math.min(11, Math.floor(fp * 11.999));
  const flick = (fp * 11) % 1;
  const kC = pop(t, t0 - 0.15) * out(t, T('şura') - 0.12);
  calendar(ctx, cx, TOP + 480, day, kC * 1.45, 0.03, fp < 1 ? flick : 0);
  if (kC > 0 && fp > 0) { // torn pages flying off
    for (let i = 0; i < Math.floor(fp * 11); i++) { const ti = T('On', 1) + 0.1 + (i + 1) / 11 * (T('sonra') - T('On', 1)); const q = clamp((t - ti) / 0.6); if (q >= 1) continue;
      ctx.save(); ctx.globalAlpha = (1 - q) * kC; ctx.translate(cx + q * (hash01(i, 4) - 0.3) * 900, TOP + 480 - q * 500); ctx.rotate(q * (hash01(i, 5) - 0.5) * 6);
      rrect(ctx, -120, -90, 240, 180, 10); ctx.fillStyle = C.paper; ctx.fill(); outline(ctx, 4); ctx.restore(); }
  }
  // Huang in colour + the board's vote (8 checks, no text) + stamp
  const kP = pop(t, T('şura') - 0.08);
  photo(ctx, IMG.hstan3, cx - 110, TOP + 590, 600, 720, kP, t, T('şura'), { rot: -0.04, crop: [100, 0, 900, 1150], zoom1: 1.16, dur: 2.2, fy: 0.2 });
  for (let i = 0; i < 8; i++) { const k = pop(t, T('geri') - 0.1 + i * 0.06); if (k <= 0) continue;
    const x = s.x + 720 + (i % 2) * 105, y = TOP + 330 + Math.floor(i / 2) * 135;
    ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.beginPath(); ctx.arc(0, 0, 50, 0, TAU); ctx.fillStyle = C.green; ctx.fill(); outline(ctx, 5);
    ctx.strokeStyle = C.ink; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-20, 2); ctx.lineTo(-5, 18); ctx.lineTo(22, -16); ctx.stroke(); ctx.restore(); }
  stamp(ctx, 'GERİ QAYITDI', cx - 60, TOP + 150, 74, pop(t, T('qaytardı.') - 0.02), { bg: C.green, fg: C.ink, rot: -0.05 });
}

// ---------------------------------------------------------------- E: "Elə həmin gün səhmlər 31 faizdən çox bahalaşdı."
function sStock(ctx, t, IMG) {
  const t0 = S.E;
  ctx.save(); ctx.filter = 'blur(16px)'; cover(ctx, IMG.nasdaq2, 0, 0, W, H, t, t0, { crop: [250, 330, 1100, 560], zoom0: 1.0, zoom1: 1.15, dur: 4, fx: 0.5, fy: 0.5 }); ctx.restore();
  ctx.fillStyle = 'rgba(8,12,22,0.60)'; ctx.fillRect(0, 0, W, H);
  // GPU die card (no text)
  const kD = pop(t, T('səhmlər') - 0.08);
  photo(ctx, IMG.die, s.x + 190, TOP + 780, 320, 240, kD, t, T('səhmlər'), { rot: -0.08, crop: [200, 100, 1000, 700], zoom1: 1.2, dur: 3 });
  // chart that builds itself
  const x0 = s.x + 30, x1 = s.x + s.w - 30, yb = 1195, yt = TOP + 470;
  const p = E.inOutCubic(prog(t, T('səhmlər') - 0.05, T('bahalaşdı.') + 0.1));
  const pre = prog(t, t0, T('səhmlər') - 0.05);
  ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, yb); ctx.lineTo(x1, yb); ctx.stroke();
  const N = 40, pts = []; for (let i = 0; i <= N; i++) { const q = i / N; const flat = yb - 40 - 25 * Math.sin(i * 1.3) * hash01(i, 7);
    const y = q < 0.55 ? flat : lerp(yb - 40, yt, E.outCubic((q - 0.55) / 0.45)) + 18 * Math.sin(i * 2.1) * hash01(i, 8); pts.push([lerp(x0, x1, q), y]); }
  const vis = 0.55 * Math.min(1, pre * 1.3) + 0.45 * p, m = Math.floor(vis * N);
  if (vis > 0) { ctx.beginPath(); pts.slice(0, m + 1).forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    const f = vis * N - m; if (m < N) ctx.lineTo(lerp(pts[m][0], pts[m + 1][0], f), lerp(pts[m][1], pts[m + 1][1], f));
    ctx.strokeStyle = C.green; ctx.lineWidth = 14; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.stroke(); }
  ctx.restore();
  // the running number (the one text element)
  const v = lerp(0, 31.5, p), str = '+' + v.toFixed(1).replace('.', ',') + '%';
  const kN = pop(t, t0 - 0.1) * (1 + 0.08 * Math.exp(-(t - T('bahalaşdı.')) * 6) * (t > T('bahalaşdı.')));
  ctx.save(); shake(ctx, B(t), B(T('bahalaşdı.')), 12, 3, 0.2);
  big(ctx, str, cx + 40, TOP + 330, 220, p >= 1 ? C.green : C.white, kN, { rot: -0.03, sw: 0.07 }); ctx.restore();
}

// ---------------------------------------------------------------- F: "Bu məbləğ Azərbaycanın illik iqtisadiyyatından 12 dəfədən çoxdur!"
function azFlag(ctx, x, y, w, h) {
  ctx.save(); ctx.translate(x, y);
  ctx.fillStyle = '#00B5E2'; ctx.fillRect(-w / 2, -h / 2, w, h / 3); ctx.fillStyle = '#EF3340'; ctx.fillRect(-w / 2, -h / 6, w, h / 3);
  ctx.fillStyle = '#509E2F'; ctx.fillRect(-w / 2, h / 6, w, h / 3);
  const r = h * 0.12; ctx.beginPath(); ctx.arc(-r * 0.15, 0, r, 0, TAU); ctx.fillStyle = '#fff'; ctx.fill();
  ctx.beginPath(); ctx.arc(r * 0.12, 0, r * 0.8, 0, TAU); ctx.fillStyle = '#EF3340'; ctx.fill();
  ctx.beginPath(); for (let i = 0; i < 16; i++) { const a = i * TAU / 16, rr = i % 2 ? r * 0.22 : r * 0.5; ctx.lineTo(r * 0.95 + Math.cos(a) * rr * 0.6, Math.sin(a) * rr * 0.6); }
  ctx.closePath(); ctx.fillStyle = '#fff'; ctx.fill();
  ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.strokeRect(-w / 2, -h / 2, w, h); ctx.restore();
}
function sCompare(ctx, t, IMG) {
  const t0 = S.F; world(ctx, t, { seed: 4 });
  // Baku (Flame Towers) photo, top-left
  photo(ctx, IMG.flame, s.x + 175, TOP + 250, 290, 400, pop(t, T('Azərbaycanın') - 0.1), t, T('Azərbaycanın'), { rot: -0.06, crop: [0, 150, 1050, 1250], zoom1: 1.15, dur: 3, fy: 0.3 });
  // tall green "+950" bar on the right; 12 AZ blocks stack up beside it to the same height
  const bx = cx + 280, yb = 1205, full = 800, kb = E.outCubic(prog(t, t0, t0 + 0.6));
  ctx.save(); rrect(ctx, bx - 105, yb - full * kb, 210, full * kb, 16); ctx.fillStyle = C.green; ctx.fill(); outline(ctx, 6); ctx.restore();
  const bh = full / 12.5, ax = cx + 20;
  const nAZ = t < T('Azərbaycanın') ? 0 : 1 + Math.floor(11 * clamp(prog(t, T('on') - 0.05, T('dəfədən') + 0.2)) + 1e-6);
  for (let i = 0; i < nAZ; i++) { const ti = i === 0 ? T('Azərbaycanın') : T('on') - 0.05 + i / 11 * (T('dəfədən') + 0.2 - T('on') + 0.05);
    const k = pop(t, ti); if (k <= 0) continue; const drop = (1 - Math.min(1, k)) * 120;
    ctx.save(); ctx.translate(ax, yb - bh * (i + 0.5) - drop); ctx.scale(Math.min(1.05, k), Math.min(1.05, k)); azFlag(ctx, 0, 0, 200, bh - 6); ctx.restore(); }
  // ONE text element at a time: the two labels first, then "12×"
  const kL = pop(t, T('Azərbaycanın') + 0.1) * out(t, T('on') - 0.15);
  if (kL > 0) { ctx.save(); ctx.globalAlpha = clamp(kL);
    chipText(ctx, '+950 mlrd $', bx - 40, yb - full - 60, 64, C.green, kL);
    chipText(ctx, '≈76 mlrd $', ax - 290, yb - bh / 2 - 10, 62, C.paper, kL); ctx.restore(); }
  const k12 = pop(t, T('çoxdur!') - 0.1);
  ctx.save(); shake(ctx, B(t), B(T('çoxdur!')), 14, 3, 0.25);
  big(ctx, '12×', cx - 285, 1000, 220, C.gold, k12, { rot: -0.05, sw: 0.08 }); ctx.restore();
}
function chipText(ctx, label, x, y, size, bg, k) {
  ctx.save(); ctx.translate(x, y); ctx.scale(Math.min(1.05, k), Math.min(1.05, k));
  ctx.font = font(size, 800, D); const w = ctx.measureText(label).width + size * 0.9, h = size * 1.5;
  rrect(ctx, -w / 2, -h / 2, w, h, h * 0.3); ctx.fillStyle = bg; ctx.fill(); outline(ctx, 4);
  text(ctx, label, 0, size * 0.36, font(size, 800, D), C.ink, 'center'); ctx.restore();
}

// ---------------------------------------------------------------- G: end card
function sEnd(ctx, t, IMG) {
  const t0 = S.G; world(ctx, t, { seed: 6 });
  photo(ctx, IMG.h2010, cx - 210, TOP + 210, 360, 250, pop(t, t0 - 0.1), t, t0, { rot: -0.06, crop: [380, 0, 640, 788], zoom1: 1.08, dur: 5, fy: 0.2 });
  photo(ctx, IMG.hstan2, cx + 210, TOP + 210, 300, 250, pop(t, t0), t, t0, { rot: 0.05, crop: [0, 200, 1050, 900], zoom1: 1.08, dur: 5, fy: 0.3 });
  text(ctx, '@bilirdinizmi_az', cx, TOP + 450, font(80, 800, D), C.white, 'center');
  const kB = pop(t, T('Bəyən') - 0.05), kI = pop(t, T('izlə') - 0.05);
  if (kB > 0) { ctx.save(); ctx.translate(cx - 215, TOP + 600); ctx.scale(kB, kB); ctx.rotate(-0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.paper; ctx.fill(); outline(ctx, 6);
    const hb = 1 + 0.12 * Math.max(0, Math.sin((t - T('Bəyən')) * 9)) * Math.exp(-(t - T('Bəyən')) * 2);
    ctx.save(); ctx.translate(-110, 4); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30);
    ctx.fillStyle = '#E8384F'; ctx.fill(); ctx.restore();
    text(ctx, 'BƏYƏN', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  if (kI > 0) { ctx.save(); ctx.translate(cx + 215, TOP + 600); ctx.scale(kI, kI); ctx.rotate(0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 6);
    ctx.save(); ctx.translate(-115, 4); ctx.lineWidth = 12; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'İZLƏ', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  const kS = pop(t, T('hər') - 0.05);
  if (kS > 0) { ctx.save(); ctx.translate(cx, TOP + 830); ctx.scale(Math.min(1.05, kS), Math.min(1.05, kS));
    const l1 = 'Texnologiyanı sevən', l2 = 'dostuna göndər';
    rrect(ctx, -400, -95, 800, 190, 34); ctx.fillStyle = C.paper; ctx.fill(); outline(ctx, 5);
    envelope(ctx, -310, 0, 90); text(ctx, l1, 50, -12, font(50, 800, UI), C.ink, 'center'); text(ctx, l2, 50, 52, font(50, 800, UI), C.ink, 'center'); ctx.restore(); }
  // small loop cue back to the hook number
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 700, UI)],
  images: { hces: 'assets/hces.jpg', huang: 'assets/huang.jpg', hstan: 'assets/hstan.jpg', hq2: 'assets/hq2.jpg', h2016: 'assets/h2016.jpg',
    hstan3: 'assets/hstan3.jpg', nasdaq2: 'assets/nasdaq2.jpg', die: 'assets/die.jpg', flame: 'assets/flame.jpg', hstan2: 'assets/hstan2.jpg', h2010: 'assets/h2010.jpg' },
  hits: HITS,
  draw(ctx, u, t, IMG) {
    const seq = [[0, sHook], [S.B, sBack], [S.C, sQuit], [S.D, sReturn], [S.E, sStock], [S.F, sCompare], [S.G, sEnd]];
    let j = 1; while (j < seq.length && t >= seq[j][0] + 0.2) j++;
    if (j >= seq.length) sEnd(ctx, t, IMG);
    else whip(ctx, t, seq[j][0], () => seq[j - 1][1](ctx, t, IMG), () => seq[j][1](ctx, t, IMG), 0.3);
    subtitles(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 160; i++) { ctx.fillStyle = `rgba(240,240,230,${0.015 + 0.025 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
