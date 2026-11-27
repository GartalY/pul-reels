// "Xəzərin suyu krana gələcək" — @bilirdinizmi_az 18:30 animated reel, 27 Nov 2026 (Fri GUESS THE ANSWER + PHOTO STORY), Arif voice, no music.
// Azerbaijan's first large Caspian seawater desalination plant: 300 000 m³/day (≈120 Olympic pools), financing approved 24 Nov 2026.
// Caspian ≈12.8‰ vs ocean ≈35‰ (Britannica) -> "təxminən 3 dəfə". Sources: facts/2026-11-27.json reel_1830.
// Real photos (Wikimedia Commons, credited in the caption). Plant photos are EXAMPLES (labelled "nümunə"), the Baku plant isn't built yet.
// VIEWER FEEDBACK 24 Nov: narration = ONE fixed subtitle bar (y 1252-1442), phrases; max ONE other text element at a time.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = {"dur": 27.0, "chunks": [{"t0": 0.0, "text": "Xəzərin suyu krana gələcək.", "keys": ["Xəzərin", "krana"], "t1": 2.201}, {"t0": 2.201, "text": "Azərbaycanda ilk böyük", "keys": ["ilk", "böyük"], "t1": 3.853}, {"t0": 3.853, "text": "duzsuzlaşdırma zavodu tikiləcək.", "keys": ["duzsuzlaşdırma"], "t1": 6.07}, {"t0": 6.07, "text": "Gündə nə qədər su verəcək?", "keys": ["nə", "qədər"], "t1": 8.157}, {"t0": 8.157, "text": "Sənin cavabın?", "keys": ["cavabın?"], "t1": 9.505}, {"t0": 9.505, "text": "Üç, iki, bir…", "keys": ["Üç,", "iki,", "bir…"], "t1": 12.157}, {"t0": 12.157, "text": "Gündə 300 000 kubmetr!", "keys": ["300 000"], "t1": 14.418}, {"t0": 14.418, "text": "Təxminən 120 Olimpiya hovuzu.", "keys": ["120"], "t1": 17.114}, {"t0": 17.114, "text": "Xəzər okeandan təxminən", "keys": ["Xəzər"], "t1": 18.983}, {"t0": 18.983, "text": "3 dəfə az duzludur.", "keys": ["3", "az"], "t1": 20.665}, {"t0": 20.665, "text": "Amma yenə də içmək olmur.", "keys": ["olmur."], "t1": 22.491}, {"t0": 22.491, "text": "Bəyən və izlə —", "keys": ["Bəyən", "izlə"], "t1": 23.911}, {"t0": 23.911, "text": "hər gün bilmədiyin bir fakt!", "keys": ["fakt!"], "t1": 27.0}], "words": [["Xəzərin", 0.0], ["suyu", 0.609], ["krana", 0.957], ["gələcək.", 1.348], ["Azərbaycanda", 2.261], ["ilk", 3.304], ["böyük", 3.565], ["duzsuzlaşdırma", 3.913], ["zavodu", 4.783], ["tikiləcək.", 5.188], ["Gündə", 6.13], ["nə", 6.696], ["qədər", 6.87], ["su", 7.13], ["verəcək?", 7.304], ["Sənin", 8.217], ["cavabın?", 8.565], ["Üç,", 9.565], ["iki,", 10.435], ["bir…", 11.565], ["Gündə", 12.217], ["üç", 12.87], ["yüz", 13.13], ["min", 13.304], ["kubmetr!", 13.565], ["Təxminən", 14.478], ["yüz", 15.174], ["iyirmi", 15.522], ["Olimpiya", 15.913], ["hovuzu.", 16.391], ["Xəzər", 17.174], ["okeandan", 17.652], ["təxminən", 18.304], ["üç", 19.043], ["dəfə", 19.261], ["az", 19.652], ["duzludur.", 19.826], ["Amma", 20.725], ["yenə", 21.043], ["də", 21.334], ["içmək", 21.435], ["olmur.", 21.87], ["Bəyən", 22.551], ["və", 23.043], ["izlə", 23.217], ["hər", 23.971], ["gün", 24.261], ["bilmədiyin", 24.609], ["bir", 25.217], ["fakt!", 25.391]]};
const C = {
  night: '#071A2B', deep: '#0B2A44', chalk: '#F4F1E8', white: '#FFFFFF', ink: '#0D1220', gold: '#FFC629', red: '#E5372B',
  paper: '#F6F0E1', panel: '#0C2238', water: '#2EA8E0', water2: '#7FD3F5', salt: '#EDE8DA',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const TOP = s.y;            // 250
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const out = (t, t1, d = 0.14) => 1 - E.inCubic(clamp((t - t1) / d));
const T = (w, n = 0) => { const m = TIMING.words.filter((x) => x[0] === w); return m[n] ? m[n][1] : 0; };
const CH = TIMING.chunks;
const S = { A: 0, B: CH[3].t0, C: CH[5].t0, D: CH[6].t0, E: CH[8].t0, F: CH[11].t0 };
const B = (t) => t / 0.5;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.3, from, to }];
const NB = ' ';

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
function drop1(ctx, x, y, r, col = C.water) { // a water drop
  ctx.save(); ctx.translate(x, y); ctx.beginPath(); ctx.moveTo(0, -r * 1.6);
  ctx.bezierCurveTo(r * 0.9, -r * 0.4, r, r * 0.2, r, r * 0.35); ctx.arc(0, r * 0.35, r, 0, Math.PI); ctx.bezierCurveTo(-r, r * 0.2, -r * 0.9, -r * 0.4, 0, -r * 1.6);
  ctx.fillStyle = col; ctx.fill(); outline(ctx, Math.max(3, r * 0.14)); ctx.restore();
}

// a real photo in a white print frame, slow push-in (log zoom), optional name plate
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
  if (gray > 0) { ctx.fillStyle = `rgba(6,14,25,${gray})`; ctx.fillRect(-w / 2, -h / 2, w, h); }
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
  ctx.save(); rrect(ctx, 36, y0, W - 72, y1 - y0, 26); ctx.fillStyle = 'rgba(4,10,18,0.86)'; ctx.fill();
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

// ---------------------------------------------------------------- world: night sea, slow swell lines, drifting bubbles
function world(ctx, t, { zoom = 1, seed = 0, level = 0 } = {}) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, C.night); g.addColorStop(1, C.deep);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.save(); M.zoomAbout(ctx, zoom, W / 2, H / 2);
  for (let r = 0; r < 7; r++) { const y = H * 0.12 + r * 260, a = 0.05 + 0.02 * (r % 3);
    ctx.strokeStyle = `rgba(127,211,245,${a})`; ctx.lineWidth = 4; ctx.beginPath();
    for (let x = -40; x <= W + 40; x += 20) ctx.lineTo(x, y + 18 * Math.sin(x / 140 + t * 1.3 + r * 1.7 + seed));
    ctx.stroke(); }
  for (let i = 0; i < 40; i++) { const j = i + seed * 41, x = hash01(j, 3) * W, spd = 60 + 90 * hash01(j, 4);
    const y = H - ((t * spd + hash01(j, 5) * H) % (H + 100)); const r = 4 + 8 * hash01(j, 6);
    ctx.strokeStyle = 'rgba(180,230,255,0.18)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x + 12 * Math.sin(t * 2 + j), y, r, 0, TAU); ctx.stroke(); }
  ctx.restore();
  if (level > 0) { // rising water fill (reveal)
    const yl = H - level * H;
    const wg = ctx.createLinearGradient(0, yl, 0, H); wg.addColorStop(0, 'rgba(46,168,224,0.85)'); wg.addColorStop(1, 'rgba(11,60,110,0.95)');
    ctx.fillStyle = wg; ctx.beginPath(); ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 20) ctx.lineTo(x, yl + 16 * Math.sin(x / 90 + t * 5));
    ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
  }
  const v = ctx.createRadialGradient(W / 2, H * 0.45, 200, W / 2, H * 0.45, H * 0.8);
  v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,0.5)'); ctx.fillStyle = v; ctx.fillRect(0, 0, W, H);
}

// ---------------------------------------------------------------- HITS (sfx.mjs voices them; non-melodic only)
const DROPW = (t, l) => [B(t - 0.05), l, 'whoosh', { len: 0.35, from: 1800, to: 500 }];
const HITS = [
  [B(0.02), 'hook', 'thud'], [B(0.8), 'drip1', 'tick'], [B(1.4), 'drip2', 'tick'], [B(2.0), 'drip3', 'tick'], DROPW(CH[1].t0, 'pano'), [B(CH[1].t0 + 0.1), 'pano land', 'click'], [B(T('ilk') - 0.04), 'İLK BÖYÜK', 'thud'],
  DROPW(CH[2].t0, 'ro_a'), [B(CH[2].t0 + 0.1), 'ro_a land', 'click'], DROPW(T('tikiləcək.'), 'ro_b'), [B(T('tikiləcək.') + 0.1), 'ro_b land', 'click'],
  WH(S.B, 600, 2200), [B(T('nə') - 0.05), 'NƏ QƏDƏR', 'thud'], DROPW(T('verəcək?'), 'tap_b'), [B(T('verəcək?') + 0.1), 'tapb land', 'click'],
  DROPW(T('Sənin'), 'sat'), [B(T('Sənin') + 0.05), 'CAVABIN', 'thud'],
  WH(S.C, 2200, 600), [B(T('Üç,')), '3', 'tick'], [B(T('iki,')), '2', 'tick'], [B(T('bir…')), '1', 'tick'],
  [B(S.D), 'reveal', 'impact'], [B(T('kubmetr!') - 0.03), '300 000', 'thud'],
  DROPW(CH[7].t0, 'aqua'), [B(CH[7].t0 + 0.1), 'aqua land', 'click'], [B(CH[7].t0 + 0.25), 'pools', 'type', { n: 12, len: 1.8 }], [B(T('hovuzu.')), '120', 'thud'],
  WH(S.E, 2200, 600), [B(T('dəfə') - 0.05), '3x', 'thud'], DROPW(CH[10].t0, 'casp'), [B(T('olmur.') - 0.04), 'X', 'impact'],
  WH(S.F, 600, 2200), [B(T('Bəyən')), 'BƏYƏN', 'click'], [B(T('izlə')), 'İZLƏ', 'thud'], [B(T('fakt!') + 0.3), 'send line', 'tick'],
];

// ---------------------------------------------------------------- A: hook (Caspian -> Baku -> plant examples)
const PH = { x: cx, y: 830, w: 820, h: 600 };
function sHook(ctx, t, IMG) {
  world(ctx, t, { zoom: Math.exp(0.03 * t) });
  const t1 = CH[1].t0, t2 = CH[2].t0, t3 = T('tikiləcək.') - 0.05;
  photo(ctx, IMG.surf, PH.x, PH.y + 40, PH.w, 680, 1, t, 0, { rot: -0.02, zoom0: 1.0, zoom1: 1.15, dur: 2.5 });
  dropPhoto(ctx, t, t1, IMG.pano, PH.x + 10, PH.y + 30, PH.w - 20, 600, { rot: 0.03, zoom1: 1.12, dur: 2, fx: 0.55,
    name: 'BAKI', sub: 'Abşeron yarımadası', nameK: pop(t, t1 + 0.12) * out(t, T('ilk') - 0.15) });
  dropPhoto(ctx, t, t2, IMG.ro_a, PH.x - 6, PH.y + 20, 720, 720, { rot: -0.025, zoom1: 1.14, dur: 2.2, fy: 0.5,
    name: 'DUZSUZLAŞDIRMA ZAVODU', sub: 'nümunə şəkil', nameK: pop(t, t2 + 0.12) * out(t, t3 - 0.1) });
  dropPhoto(ctx, t, t3, IMG.ro_b, PH.x + 6, PH.y + 30, 720, 720, { rot: 0.03, zoom1: 1.14, dur: 2, fy: 0.5 });
  // frame 0: the hook, big (two lines)
  const kH = (t < 0.22 ? lerp(1.1, 1, E.outBack(prog(t, 0, 0.22))) : 1) * out(t, t1 - 0.12);
  if (kH > 0) { ctx.save(); shake(ctx, B(t), B(0.02), 10, 3, 0.2); ctx.translate(cx, TOP + 120); ctx.scale(kH, kH);
    rrect(ctx, -470, -125, 940, 260, 30); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 8);
    text(ctx, 'XƏZƏRİN SUYU', 0, -18, font(104, 800, D), C.ink, 'center');
    text(ctx, 'KRANA GƏLƏCƏK', 0, 92, font(96, 800, D), C.ink, 'center'); ctx.restore(); }
  // drips falling from the hook into the sea photo (an action every ~0.6 s before the first cut)
  for (let i = 0; i < 3; i++) { const st = 0.35 + i * 0.6, q = (t - st) / 0.45; if (q < 0 || q > 1 || t > t1 - 0.1) continue;
    drop1(ctx, cx + (i - 1) * 260, lerp(TOP + 270, PH.y + 300, q * q), 40, C.water2); }
  stamp(ctx, 'İLK BÖYÜK', cx, TOP + 140, 96, pop(t, T('ilk') - 0.05) * out(t, t2 - 0.08), { bg: C.gold, rot: -0.05 });
}

// ---------------------------------------------------------------- B: the question (tap -> tap -> Caspian from space)
function tapGauge(ctx, t, x, y, k) { // a measuring jug with a "?" sloshing up and down: unknown amount
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  const lv = 0.5 + 0.35 * Math.sin(t * 3.2);
  rrect(ctx, -110, -150, 220, 300, 26); ctx.fillStyle = 'rgba(7,26,43,0.85)'; ctx.fill();
  ctx.save(); rrect(ctx, -110, -150, 220, 300, 26); ctx.clip(); ctx.fillStyle = C.water;
  ctx.beginPath(); ctx.moveTo(-120, 160); for (let i = -120; i <= 120; i += 10) ctx.lineTo(i, 150 - lv * 300 + 8 * Math.sin(i / 25 + t * 6)); ctx.lineTo(120, 160); ctx.fill(); ctx.restore();
  rrect(ctx, -110, -150, 220, 300, 26); outline(ctx, 7, C.chalk);
  big(ctx, '?', 0, 60, 170, C.chalk, 1, { sw: 0.08 }); ctx.restore();
}
function sQuestion(ctx, t, IMG) {
  const t0 = S.B, tN = T('nə') - 0.07, tV = T('verəcək?') - 0.05, tC = T('Sənin') - 0.05;
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 1 });
  photo(ctx, IMG.tap_b, cx, 820, 700, 720, pop(t, t0 - 0.1), t, t0, { rot: 0.02, zoom1: 1.18, dur: 2.5, fy: 0.3 });
  dropPhoto(ctx, t, tV, IMG.tap_c, cx - 4, 820, 600, 720, { rot: -0.03, zoom1: 1.12, dur: 2, fy: 0.3 });
  dropPhoto(ctx, t, tC, IMG.sat, cx + 6, 820, 760, 680, { rot: 0.025, zoom1: 1.2, dur: 2, fy: 0.45,
    name: 'XƏZƏR DƏNİZİ', sub: 'kosmosdan · NASA', nameK: pop(t, tC + 0.15) });
  tapGauge(ctx, t, cx + 330, 1060, pop(t, t0 + 0.2) * out(t, tC - 0.1));
  stamp(ctx, 'GÜNDƏ NƏ QƏDƏR?', cx, TOP + 130, 86, pop(t, tN) * out(t, tC - 0.12), { bg: C.gold, rot: -0.04 });
  if (t > tC) { const k = pop(t, tC + 0.02); stamp(ctx, 'SƏNİN CAVABIN?', cx, TOP + 130, 86, k, { bg: C.chalk, rot: 0.04 });
    const by = TOP + 270 + 16 * Math.abs(Math.sin((t - tC) * 6)); // bouncing arrow (to the comments)
    if (k > 0.5) { ctx.save(); ctx.translate(cx, by); ctx.fillStyle = C.gold; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(40, 0); ctx.lineTo(0, 46); ctx.closePath(); ctx.fill(); outline(ctx, 5); ctx.restore(); } }
}

// ---------------------------------------------------------------- C: 3-2-1 countdown over Baku from space
function sCount(ctx, t, IMG) {
  const t0 = S.C, ts = [T('Üç,'), T('iki,'), T('bir…')];
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 2 });
  photo(ctx, IMG.esa, cx, 760, 860, 900, pop(t, t0 - 0.1), t, t0, { rot: -0.015, zoom0: 1.0, zoom1: 1.5, dur: 2.8, fy: 0.45, gray: 0.3 });
  const i = ts.findIndex((x, j) => t >= x && (j === 2 || t < ts[j + 1])); if (i < 0) return;
  const k = pop(t, ts[i]), n = 3 - i, nxt = i < 2 ? ts[i + 1] : S.D, p = clamp((t - ts[i]) / (nxt - ts[i]));
  ctx.save(); ctx.translate(cx, 760); const q = Math.min(1.08, k); ctx.scale(q, q);
  ctx.beginPath(); ctx.arc(0, 0, 250, 0, TAU); ctx.fillStyle = 'rgba(7,26,43,0.82)'; ctx.fill(); outline(ctx, 10, 'rgba(244,241,232,0.3)');
  ctx.beginPath(); ctx.arc(0, 0, 250, -Math.PI / 2, -Math.PI / 2 + TAU * (1 - p)); ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.strokeStyle = C.gold; ctx.stroke();
  ctx.restore();
  big(ctx, String(n), cx, 760 + 125, 360, C.chalk, q, { sw: 0.06 });
}

// ---------------------------------------------------------------- D: reveal 300 000 m³ + ≈120 Olympic pools
function pool(ctx, x, y, w, h) {
  rrect(ctx, x - w / 2, y - h / 2, w, h, 4); ctx.fillStyle = C.water; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = C.chalk; ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 1.5;
  for (let i = 1; i < 4; i++) { ctx.beginPath(); ctx.moveTo(x - w / 2 + 3, y - h / 2 + i * h / 4); ctx.lineTo(x + w / 2 - 3, y - h / 2 + i * h / 4); ctx.stroke(); }
}
function sReveal(ctx, t, IMG) {
  const t0 = S.D, tA = CH[7].t0, tY = CH[7].t0 + 0.25, tH = T('hovuzu.') - 0.02;
  const lvl = t < tA ? 0.62 * E.outCubic(prog(t, t0, t0 + 1.3)) : 0.62 * (1 - E.inOutCubic(prog(t, tA - 0.1, tA + 0.35)));
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 3, level: lvl });
  if (t < tA) { // big running number
    const c0 = t0 + 0.05, c1 = T('kubmetr!');
    const v = Math.round(300000 * E.outCubic(prog(t, c0, c1)) / 1000) * 1000;
    const str = v >= 1000 ? `${Math.floor(v / 1000)}${NB}${String(v % 1000).padStart(3, '0')}` : String(v);
    const k = Math.max(0.85, pop(t, t0 - 0.02));
    for (let i = 0; i < 9; i++) { const st = t0 + 0.15 + i * 0.22, q = (t - st) / 0.7; if (q < 0 || q > 1) continue;
      drop1(ctx, 140 + hash01(i, 7) * (W - 280), lerp(TOP, H - lvl * H, q * q), 22, C.water2); }
    ctx.save(); if (t > c1) shake(ctx, B(t), B(c1), 10, 3, 0.25);
    big(ctx, 'GÜNDƏ', cx, TOP + 250, 96, C.gold, k, { sw: 0.1 });
    big(ctx, str, cx, 720, 220, C.chalk, k * (t > c1 ? 1 + 0.06 * Math.exp(-(t - c1) * 6) : 1), { sw: 0.08 });
    big(ctx, 'KUBMETR', cx, 870, 110, C.chalk, pop(t, c1 - 0.05), { sw: 0.1 });
    ctx.restore(); return;
  }
  photo(ctx, IMG.aqua_a, cx, 600, 860, 560, pop(t, tA - 0.08), t, tA, { rot: 0.02, zoom1: 1.15, dur: 2.5, fy: 0.5 });
  dropPhoto(ctx, t, tH - 0.2, IMG.aqua_b, cx - 6, 610, 820, 540, { crop: [0, 390, 1280, 464], rot: -0.025, zoom1: 1.1, dur: 1.5, fy: 0.55 });
  // 120 pools: 15 x 8 grid filling
  const kG = pop(t, tA + 0.15); if (kG <= 0) return;
  ctx.save(); ctx.translate(cx, 1040); const g = Math.min(1, kG); ctx.scale(g, g);
  rrect(ctx, -440, -170, 880, 330, 28); ctx.fillStyle = 'rgba(12,34,56,0.94)'; ctx.fill(); outline(ctx, 5, C.gold);
  const n = Math.round(120 * E.inOutSine(prog(t, tY, tH)));
  for (let i = 0; i < 120; i++) { const r = Math.floor(i / 15), c = i % 15;
    const x = -395 + c * 56 + 2, y = -40 + r * 24;
    if (i < n) pool(ctx, x, y, 46, 18); else { ctx.strokeStyle = 'rgba(244,241,232,0.18)'; ctx.lineWidth = 2; ctx.strokeRect(x - 23, y - 9, 46, 18); } }
  text(ctx, `≈${NB}${n} OLİMPİYA HOVUZU`, 0, -95, font(60, 800, D), n >= 120 ? C.gold : C.chalk, 'center');
  ctx.restore();
}

// ---------------------------------------------------------------- E: twist — Caspian ≈3× less salty, still undrinkable
function glass(ctx, x, y, h, spoons, label, t, t0) {
  ctx.save(); ctx.translate(x, y);
  ctx.beginPath(); ctx.moveTo(-110, -h); ctx.lineTo(-85, 0); ctx.lineTo(85, 0); ctx.lineTo(110, -h); ctx.closePath();
  ctx.fillStyle = 'rgba(46,168,224,0.55)'; ctx.fill(); outline(ctx, 6, C.chalk);
  for (let i = 0; i < spoons; i++) { const q = E.outBack(clamp((t - t0 - i * 0.18) / 0.3)); if (q <= 0) continue; // salt piles
    ctx.save(); ctx.translate(0, -22 - i * 42); ctx.scale(q, q); ctx.beginPath(); ctx.ellipse(0, 0, 66, 18, 0, 0, TAU); ctx.fillStyle = C.salt; ctx.fill(); outline(ctx, 3); ctx.restore(); }
  text(ctx, label, 0, 66, font(60, 800, D), C.chalk, 'center'); ctx.restore();
}
function sSalt(ctx, t, IMG) {
  const t0 = S.E, tD = T('dəfə') - 0.07, tA = CH[10].t0, tX = T('olmur.') - 0.06;
  world(ctx, t, { zoom: Math.exp(0.03 * (t - t0)), seed: 4 });
  photo(ctx, IMG.salt, cx, 470, 840, 420, pop(t, t0 - 0.1), t, t0, { rot: -0.02, zoom1: 1.2, dur: 3, fy: 0.5 });
  dropPhoto(ctx, t, tA, IMG.caspbaku, cx + 4, 590, 620, 640, { rot: 0.03, zoom1: 1.12, dur: 2, fy: 0.55 });
  if (t < tA) { // comparison: OKEAN 3 piles vs XƏZƏR 1 pile, then "≈3× AZ"
    const kC = pop(t, T('okeandan') - 0.05) * out(t, tA - 0.12); if (kC > 0) {
      ctx.save(); ctx.translate(cx, 1000); const g = Math.min(1, kC); ctx.scale(g, g);
      rrect(ctx, -440, -300, 880, 480, 30); ctx.fillStyle = 'rgba(12,34,56,0.94)'; ctx.fill(); outline(ctx, 5, C.gold);
      glass(ctx, -200, 70, 230, 3, 'OKEAN', t, T('okeandan'));
      glass(ctx, 200, 70, 230, 1, 'XƏZƏR', t, T('Xəzər'));
      const k3 = pop(t, tD); if (k3 > 0) big(ctx, `≈3×${NB}AZ${NB}DUZ`, 0, -205, 100, C.gold, k3, { sw: 0.1 });
      ctx.restore(); }
    return;
  }
  // "but still undrinkable": glass + red X
  const kG = pop(t, tA + 0.1);
  if (kG > 0) { ctx.save(); ctx.translate(cx, 1150); const g = Math.min(1, kG); ctx.scale(g, g);
    ctx.beginPath(); ctx.moveTo(-95, -200); ctx.lineTo(-75, 0); ctx.lineTo(75, 0); ctx.lineTo(95, -200); ctx.closePath();
    ctx.fillStyle = 'rgba(46,168,224,0.85)'; ctx.fill(); outline(ctx, 7, C.chalk); ctx.restore(); }
  const kX = pop(t, tX); if (kX > 0) { ctx.save(); shake(ctx, B(t), B(tX), 10, 3, 0.25); ctx.translate(cx, 1050); ctx.scale(kX, kX);
    ctx.lineCap = 'round'; ctx.lineWidth = 46; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.moveTo(-120, -120); ctx.lineTo(120, 120); ctx.moveTo(120, -120); ctx.lineTo(-120, 120); ctx.stroke();
    ctx.lineWidth = 30; ctx.strokeStyle = C.red; ctx.stroke(); ctx.restore(); }
  stamp(ctx, 'İÇMƏK OLMUR', cx, TOP + 110, 84, pop(t, tX + 0.05), { bg: C.red, fg: C.white, rot: -0.05 });
}

// ---------------------------------------------------------------- F: end card
function sEnd(ctx, t, IMG) {
  const t0 = S.F;
  world(ctx, t, { zoom: Math.exp(0.02 * (t - t0)), seed: 7 });
  photo(ctx, IMG.bulvar, cx, 520, 820, 500, pop(t, t0 - 0.1), t, t0, { rot: -0.02, zoom1: 1.15, dur: 5, fy: 0.6 });
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
    text(ctx, 'Abşeronda yaşayan', 45, -10, font(52, 800, UI), C.ink, 'center'); text(ctx, 'dostuna göndər', 45, 50, font(52, 800, UI), C.ink, 'center'); ctx.restore(); }
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 700, UI)],
  images: { surf: 'assets/surf.jpg', pano: 'assets/baku_pano.jpg', ro_a: 'assets/ro_a.jpg', ro_b: 'assets/ro_b.jpg', tap_c: 'assets/tap_c.jpg',
    tap_b: 'assets/tap_b.jpg', sat: 'assets/casp_sat.jpg', esa: 'assets/baku_esa.jpg', aqua_a: 'assets/aqua_a.jpg', aqua_b: 'assets/aqua_b.jpg',
    salt: 'assets/salt.jpg', caspbaku: 'assets/caspbaku.jpg', bulvar: 'assets/bulvar.jpg' },
  hits: HITS,
  draw(ctx, u, t, IMG) {
    const seq = [[0, sHook], [S.B, sQuestion], [S.C, sCount], [S.D, sReveal], [S.E, sSalt], [S.F, sEnd]];
    let j = 1; while (j < seq.length && t >= seq[j][0] + 0.2) j++;
    if (j >= seq.length) sEnd(ctx, t, IMG);
    else whip(ctx, t, seq[j][0], () => seq[j - 1][1](ctx, t, IMG), () => seq[j][1](ctx, t, IMG), seq[j][0] === S.D ? 0.04 : 0.3);
    subtitles(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 160; i++) { ctx.fillStyle = `rgba(240,240,230,${0.015 + 0.025 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
