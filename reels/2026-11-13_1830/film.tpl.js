// "464 il: Şamaxıdan Dublinə" — @bilirdinizmi_az 18:30 animated reel, 13 Nov 2026. Pure function of time.
// Arif voice (ElevenLabs) on audio/vo.wav; every caption word / object is timed to its spoken word (TIMING, from the track).
// Two worlds: 2026 navy diplomatic desk → 1562 parchment caravan. Persistent timeline bar 1562 ⟷ 2026 at the bottom.
// No music; soft non-melodic SFX only (thud, click, tick, whoosh, type).
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, fitSize, TAU } = M;

const TIMING = __TIMING__;
const C = {
  navy: '#0E1B33', navy2: '#18294B', navy3: '#22375F', chalk: '#F4EFE4', gold: '#F2B53A', mute: '#9AABC8',
  parch: '#EAD9B5', parch2: '#DCC69B', ink: '#2B1D12', sepia: '#7A5A3A', wax: '#B3322A', sand: '#E3C48A', sand2: '#CFA867', sil: '#1F1712',
};
const D = 'Display', UI = 'UI', SR = 'Serif';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));

// word lookup: T('ticarət', 1) = start of the 2nd "ticarət"
const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const END = TIMING.dur + 1.3;

// scene clock
const S = {
  A: 0, B: TIMING.lines[2].t0 - 0.12, Cc: TIMING.lines[3].t0 - 0.15, D: TIMING.lines[5].t0 - 0.15,
  E: T('ingilis', 0) - 0.12, F: TIMING.lines[7].t0 - 0.1, G: TIMING.lines[8].t0 - 0.12,
};
const B = (t) => t / 0.5;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.35, from, to }];
const HITS = [
  [B(0.02), '464', 'thud'], [B(T('il.')), 'İL', 'click'],
  [B(T('Şamaxıdan')), 'Şamaxı pin', 'click'], [B(T('Dublinə.')), 'Dublin pin', 'thud'],
  WH(S.B, 600, 2200), [B(T('Dublində')), 'date chip', 'click'], [B(T('Azərbaycan')), 'AZ flag', 'thud'], [B(T('Britaniya')), 'UK flag', 'thud'],
  [B(T('strateji')), 'title mark', 'tick'], [B(T('imzaladı.')), 'signature', 'type', { len: 0.9, n: 9 }], [B(T('imzaladı.') + 1.0), 'stamp', 'thud'],
  WH(S.Cc, 2200, 600), [B(T('üç')), 'big 3', 'thud'], [B(T('müdafiə,')), '1/3', 'click'], [B(T('ticarət')), '2/3', 'click'], [B(T('təhsil.')), '3/3', 'click'],
  [B(S.D + 0.05), 'page turn', 'whoosh', { len: 0.45, from: 400, to: 1800 }], [B(T('tarix')), 'years roll', 'type', { len: 1.0, n: 12 }],
  [B(T('1562-ci')), '1562 stamp', 'thud'],
  WH(S.E, 500, 2000), [B(T('Entoni')), 'name plate', 'click'], [B(T('Şamaxıya')), 'signpost', 'thud'],
  WH(S.F, 2000, 500), [B(T('Abdulla')), 'name plate 2', 'click'], [B(T('ticarət', 1)), 'scroll', 'whoosh', { len: 0.4, from: 900, to: 300 }],
  [B(T('verib.')), 'wax seal', 'thud'],
  WH(S.G, 600, 2400), [B(T('Bəyən')), 'BƏYƏN', 'click'], [B(T('izlə')), 'İZLƏ', 'thud'], [B(T('fakt!') + 0.4), '464', 'tick'],
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
function chip(ctx, label, x, y, size, k, { bg = C.gold, fg = C.ink, rot = -0.04, edge = C.ink, fam = UI, wt = 800 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, fam); const w = ctx.measureText(label).width + size * 1.0, h = size * 1.55;
  rrect(ctx, -w / 2, -h / 2, w, h, h * 0.3); ctx.fillStyle = bg; ctx.fill(); outline(ctx, 5, edge);
  text(ctx, label, 0, size * 0.36, font(size, wt, fam), fg, 'center'); ctx.restore();
}
function navyBg(ctx, t) {
  fill(ctx, C.navy);
  ctx.strokeStyle = 'rgba(154,171,200,0.10)'; ctx.lineWidth = 2;
  const off = (t * 18) % 120;
  for (let x = -120 + off; x < W + 120; x += 120) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x - 200, H); ctx.stroke(); }
  for (let y = -120 + off * 0.5; y < H; y += 120) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y + 60); ctx.stroke(); }
}
function parchBg(ctx, col = C.parch) {
  fill(ctx, col); ctx.fillStyle = 'rgba(122,90,58,0.07)';
  for (let i = 0; i < 120; i++) { ctx.beginPath(); ctx.arc(hash01(i, 3) * W, hash01(i, 4) * H, 2 + hash01(i, 5) * 5, 0, TAU); ctx.fill(); }
  const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.75);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(90,60,30,0.28)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}
function pin(ctx, x, y, k, col, label, labelBelow = true, dark = false) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-46, -60, -46, -110, 0, -112); ctx.bezierCurveTo(46, -110, 46, -60, 0, 0);
  ctx.fillStyle = col; ctx.fill(); outline(ctx, 6, dark ? C.ink : C.chalk);
  ctx.beginPath(); ctx.arc(0, -76, 15, 0, TAU); ctx.fillStyle = dark ? C.parch : C.navy; ctx.fill();
  ctx.font = font(52, 800, UI); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
  const ly = labelBelow ? 66 : -140; ctx.lineWidth = 12; ctx.strokeStyle = dark ? C.parch : C.navy; ctx.strokeText(label, 0, ly);
  ctx.fillStyle = dark ? C.ink : C.chalk; ctx.fillText(label, 0, ly);
  ctx.restore();
}
// AZ flag (blue / red / green, white crescent + 8-point star) and UK Union Flag
function flagAZ(ctx, x, y, w, k, wave = 0) {
  if (k <= 0) return; const h = w / 2;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(wave);
  ctx.save(); rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.clip();
  ctx.fillStyle = '#00B5E2'; ctx.fillRect(-w / 2, -h / 2, w, h / 3); ctx.fillStyle = '#EF3340'; ctx.fillRect(-w / 2, -h / 6, w, h / 3);
  ctx.fillStyle = '#509E2F'; ctx.fillRect(-w / 2, h / 6, w, h / 3);
  const r = h * 0.12; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-r * 0.25, 0, r, 0, TAU); ctx.fill();
  ctx.fillStyle = '#EF3340'; ctx.beginPath(); ctx.arc(r * 0.05, 0, r * 0.8, 0, TAU); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath();
  for (let i = 0; i < 16; i++) { const a = (i / 16) * TAU, rr = i % 2 ? r * 0.28 : r * 0.62; ctx.lineTo(r * 1.15 + Math.cos(a) * rr, Math.sin(a) * rr); }
  ctx.closePath(); ctx.fill(); ctx.restore();
  rrect(ctx, -w / 2, -h / 2, w, h, 6); outline(ctx, 5); ctx.restore();
}
function flagUK(ctx, x, y, w, k, wave = 0) {
  if (k <= 0) return; const h = w / 2;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(wave);
  ctx.save(); rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.clip();
  ctx.fillStyle = '#012169'; ctx.fillRect(-w / 2, -h / 2, w, h);
  const diag = (col, lw) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(w / 2, h / 2); ctx.moveTo(w / 2, -h / 2); ctx.lineTo(-w / 2, h / 2); ctx.stroke(); };
  diag('#fff', h * 0.2); diag('#C8102E', h * 0.07);
  ctx.fillStyle = '#fff'; ctx.fillRect(-w / 2, -h / 6, w, h / 3); ctx.fillRect(-h / 6, -h / 2, h / 3, h);
  ctx.fillStyle = '#C8102E'; ctx.fillRect(-w / 2, -h / 10, w, h / 5); ctx.fillRect(-h / 10, -h / 2, h / 5, h);
  ctx.restore(); rrect(ctx, -w / 2, -h / 2, w, h, 6); outline(ctx, 5); ctx.restore();
}

// ---------------------------------------------------------------- persistent timeline bar 1562 ⟷ 2026
function timeline(ctx, t, dark) {
  const y = s.y + s.h - 50, x0 = s.x + 150, x1 = s.x + s.w - 150;
  const k = clamp(prog(t, 0.3, 0.8)); if (k <= 0) return;
  // marker position: 2026 → (twist) 1562 → (payoff) both
  const back = E.inOutCubic(prog(t, T('tarix'), T('1562-ci')));
  const fwd = E.inOutCubic(prog(t, S.G + 0.2, S.G + 1.0));
  const m = lerp(x1, x0, back * (1 - fwd)) ;
  const fg = dark ? C.ink : C.chalk, dim = dark ? 'rgba(43,29,18,0.35)' : 'rgba(244,239,228,0.3)';
  ctx.save(); ctx.globalAlpha = k;
  ctx.lineCap = 'round'; ctx.lineWidth = 10; ctx.strokeStyle = dim; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
  if (t > T('tarix')) { ctx.strokeStyle = C.gold; ctx.beginPath(); ctx.moveTo(m, y); ctx.lineTo(x1, y); ctx.stroke(); }
  text(ctx, '1562', x0 - 22, y + 18, font(52, 800, UI), fg, 'right');
  text(ctx, '2026', x1 + 22, y + 18, font(52, 800, UI), fg, 'left');
  ctx.beginPath(); ctx.arc(m, y, 20, 0, TAU); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 5, dark ? C.ink : C.navy);
  ctx.restore();
}

// ---------------------------------------------------------------- captions (word by word, top)
function captions(ctx, t) {
  const L = TIMING.lines; const li = L.findIndex((l, i) => t >= l.t0 - 0.05 && t < (L[i + 1] ? L[i + 1].t0 - 0.05 : END)); if (li < 0) return;
  const all = L[li].words.filter((w) => w.w !== '—'), ws = all.filter((w) => t >= w.t - 0.03); if (!ws.length) return;
  const start = Math.floor((ws.length - 1) / 3) * 3, chunk = all.slice(start, start + 3), shown = ws.slice(start);
  let size = 86; const gap = 26;
  const meas = (sz) => { ctx.font = font(sz, 800, D); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 30) { size = Math.floor(size * (s.w - 30) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 120;
  shown.forEach((w, i) => { const k = sp(t, w.t - 0.03, SPRING.bouncy), sc = Math.min(1.1, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.2; ctx.strokeStyle = '#0A0F1C'; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.gold : '#FFFFFF'; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}
function whip(ctx, t, t0, a, b, dur = 0.32) {
  const p = E.inOutCubic(prog(t, t0 - dur * 0.55, t0 + dur * 0.45));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(-p * W, 0); a(); ctx.restore(); ctx.save(); ctx.translate((1 - p) * W, 0); b(); ctx.restore();
}

// ---------------------------------------------------------------- A: hook 464 il + route Şamaxı → Dublin
const PSH = [s.x + s.w - 190, s.y + 1060], PDU = [s.x + 190, s.y + 700];
function sHook(ctx, t) {
  navyBg(ctx, t);
  const tR = T('Şamaxıdan');
  const up = E.inOutCubic(prog(t, tR - 0.25, tR + 0.25));
  ctx.save(); shake(ctx, B(t), B(0.02), 14, 5, 0.25);
  const k0 = t < 0.4 ? lerp(1.22, 1, E.outBack(prog(t, 0, 0.4))) : 1;
  const ny = lerp(s.y + 760, s.y + 380, up), nsz = lerp(400, 190, up);
  big(ctx, '464', cx, ny, nsz, C.gold, k0, { sw: 0.06 });
  chip(ctx, 'İL', cx + lerp(0, 230, up), ny + lerp(150, -40, up), lerp(90, 56, up), pop(t, T('il.')), { bg: C.chalk, rot: -0.06 });
  ctx.restore();
  // route
  const kS = pop(t, tR), kD = pop(t, T('Dublinə.'));
  const p = E.inOutCubic(prog(t, tR + 0.05, T('Dublinə.') + 0.05));
  const c1 = [cx + 120, s.y + 520];
  const at = (q) => [lerp(lerp(PSH[0], c1[0], q), lerp(c1[0], PDU[0], q), q), lerp(lerp(PSH[1] - 80, c1[1], q), lerp(c1[1], PDU[1] - 80, q), q)];
  if (p > 0) {
    ctx.save(); ctx.setLineDash([22, 18]); ctx.lineDashOffset = -t * 60; ctx.lineWidth = 9; ctx.strokeStyle = C.chalk; ctx.lineCap = 'round';
    ctx.beginPath(); for (let i = 0; i <= 40; i++) { const q = (i / 40) * p; const [x, y] = at(q); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore();
    const [hx, hy] = at(p); ctx.beginPath(); ctx.arc(hx, hy, 18, 0, TAU); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 5, C.navy);
  }
  pin(ctx, PSH[0], PSH[1], kS, C.gold, 'ŞAMAXI');
  pin(ctx, PDU[0], PDU[1], kD, C.chalk, 'DUBLİN', false);
  // small compass of years under the number

}

// ---------------------------------------------------------------- B: the declaration (12 Nov, Dublin)
function sDoc(ctx, t) {
  navyBg(ctx, t);
  const t0 = S.B; const kIn = E.outCubic(prog(t, t0 - 0.2, t0 + 0.35));
  const push = 1 + 0.05 * E.inOutCubic(prog(t, t0, S.Cc));
  const px = cx, py = s.y + 720 + (1 - kIn) * 900;
  ctx.save(); ctx.translate(px, py); ctx.scale(push, push); ctx.rotate(-0.025);
  const w = 790, h = 840;
  rrect(ctx, -w / 2 + 14, -h / 2 + 18, w, h, 18); ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fill();
  rrect(ctx, -w / 2, -h / 2, w, h, 18); ctx.fillStyle = '#FBF7EE'; ctx.fill(); outline(ctx, 6, '#0A0F1C');
  // flags
  flagAZ(ctx, -w / 2 + 130, -h / 2 + 105, 170, pop(t, T('Azərbaycan')), 0.02 * Math.sin(t * 3));
  flagUK(ctx, w / 2 - 130, -h / 2 + 105, 170, pop(t, T('Britaniya')), -0.02 * Math.sin(t * 3 + 1));
  // title (serif)
  const kT = sp(t, T('strateji') - 0.1, SPRING.gentle);
  ctx.globalAlpha = 1; text(ctx, 'STRATEJİ', 0, -h / 2 + 260, font(70, 700, SR), '#111', 'center', 3);
  text(ctx, 'TƏRƏFDAŞLIQ', 0, -h / 2 + 340, font(70, 700, SR), '#111', 'center', 3);
  text(ctx, 'BƏYANNAMƏSİ', 0, -h / 2 + 410, font(50, 600, SR), '#555', 'center', 6);
  if (kT > 0) { ctx.fillStyle = 'rgba(242,181,58,0.55)'; ctx.fillRect(-250, -h / 2 + 285, 500 * Math.min(1, kT), 70);
    text(ctx, 'TƏRƏFDAŞLIQ', 0, -h / 2 + 340, font(70, 700, SR), '#111', 'center', 3); }
  // text lines typing
  for (let i = 0; i < 5; i++) { const q = clamp(prog(t, t0 + 0.3 + i * 0.25, t0 + 0.7 + i * 0.25)); if (q <= 0) continue;
    const lw = (w - 160) * (i === 4 ? 0.6 : 0.92 - 0.06 * hash01(i, 2)) * q; ctx.fillStyle = '#CFC7B6'; rrect(ctx, -w / 2 + 80, -h / 2 + 470 + i * 46, lw, 18, 9); ctx.fill(); }
  // signature lines + scribbles
  const ts = T('imzaladı.');
  ctx.strokeStyle = '#9A917F'; ctx.lineWidth = 3;
  [[-170], [170]].forEach(([sx]) => { ctx.beginPath(); ctx.moveTo(sx - 130, h / 2 - 110); ctx.lineTo(sx + 130, h / 2 - 110); ctx.stroke(); });
  [[-170, ts], [170, ts + 0.45]].forEach(([sx, st], j) => {
    const q = clamp(prog(t, st, st + 0.5)); if (q <= 0) return;
    ctx.strokeStyle = '#1B3A8A'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath();
    const N = Math.floor(60 * q);
    for (let i = 0; i <= N; i++) { const a = i / 60; const x = sx - 120 + a * 240; const y = h / 2 - 140 + Math.sin(a * TAU * (3 + j)) * 22 * (1 - a * 0.5) + Math.sin(a * 37) * 6;
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke();
    if (q < 1) { const a = N / 60; ctx.save(); ctx.translate(sx - 120 + a * 240, h / 2 - 150 + Math.sin(a * TAU * (3 + j)) * 22); ctx.rotate(-0.7);
      rrect(ctx, -10, -120, 20, 110, 6); ctx.fillStyle = '#0A0F1C'; ctx.fill(); ctx.beginPath(); ctx.moveTo(-10, -10); ctx.lineTo(10, -10); ctx.lineTo(0, 14); ctx.closePath(); ctx.fillStyle = C.gold; ctx.fill(); ctx.restore(); }
  });
  ctx.restore();
  // date chip above paper
  chip(ctx, '12 NOYABR · DUBLİN', cx, s.y + 280, 56, pop(t, T('Dublində')), { bg: C.chalk, rot: 0.03 });
  // stamp after both signatures
  const kS = pop(t, ts + 1.0);
  if (kS > 0) { ctx.save(); ctx.translate(cx + 200, s.y + 1180); ctx.rotate(-0.18); ctx.scale(lerp(1.6, 1, Math.min(1, kS)), lerp(1.6, 1, Math.min(1, kS)));
    rrect(ctx, -200, -60, 400, 120, 16); ctx.lineWidth = 10; ctx.strokeStyle = C.gold; ctx.stroke(); ctx.fillStyle = 'rgba(14,27,51,0.85)'; ctx.fill();
    text(ctx, 'İMZALANDI', 0, 24, font(68, 800, D), C.gold, 'center', 2); ctx.restore(); }
}

// ---------------------------------------------------------------- C: 3 fields — defence, trade, education
function iconShield(ctx, x, y, r, t) {
  ctx.save(); ctx.translate(x, y);
  ctx.beginPath(); ctx.moveTo(0, -r); ctx.quadraticCurveTo(r * 0.55, -r * 0.7, r * 0.9, -r * 0.75); ctx.quadraticCurveTo(r * 0.95, r * 0.4, 0, r);
  ctx.quadraticCurveTo(-r * 0.95, r * 0.4, -r * 0.9, -r * 0.75); ctx.quadraticCurveTo(-r * 0.55, -r * 0.7, 0, -r); ctx.closePath();
  ctx.fillStyle = C.mute; ctx.fill(); outline(ctx, 6, '#0A0F1C');
  ctx.save(); ctx.clip(); const gx = ((t * 1.2) % 2) * r * 3 - r * 1.5; ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.beginPath(); ctx.moveTo(gx - 20, -r); ctx.lineTo(gx + 20, -r); ctx.lineTo(gx - 40, r); ctx.lineTo(gx - 80, r); ctx.fill(); ctx.restore();
  ctx.beginPath(); ctx.moveTo(0, -r * 0.62); ctx.lineTo(0, r * 0.7); ctx.moveTo(-r * 0.6, -r * 0.2); ctx.lineTo(r * 0.6, -r * 0.2); outline(ctx, 8, C.navy);
  ctx.restore();
}
function iconTrade(ctx, x, y, r, t) {
  ctx.save(); ctx.translate(x, y);
  rrect(ctx, -r * 0.75, -r * 0.55, r * 1.5, r * 1.1, 8); ctx.fillStyle = '#C98A4B'; ctx.fill(); outline(ctx, 6, '#0A0F1C');
  ctx.beginPath(); for (let i = -2; i <= 2; i++) { ctx.moveTo(i * r * 0.28, -r * 0.55); ctx.lineTo(i * r * 0.28, r * 0.55); } outline(ctx, 4, '#7A4E25');
  const o = Math.sin(t * 4) * 8; ctx.fillStyle = C.gold; ctx.strokeStyle = '#0A0F1C'; ctx.lineWidth = 5;
  const arrow = (yy, dir) => { ctx.beginPath(); const x0 = -r * 0.9 * dir + o * dir, x1 = r * 0.9 * dir + o * dir; ctx.moveTo(x0, yy - 9); ctx.lineTo(x1 - 26 * dir, yy - 9); ctx.lineTo(x1 - 26 * dir, yy - 24); ctx.lineTo(x1 + 8 * dir, yy); ctx.lineTo(x1 - 26 * dir, yy + 24); ctx.lineTo(x1 - 26 * dir, yy + 9); ctx.lineTo(x0, yy + 9); ctx.closePath(); ctx.fill(); ctx.stroke(); };
  arrow(-r * 0.85, 1); arrow(r * 0.85, -1);
  ctx.restore();
}
function iconCap(ctx, x, y, r, t) {
  ctx.save(); ctx.translate(x, y);
  ctx.beginPath(); ctx.moveTo(-r * 0.55, -r * 0.05); ctx.lineTo(-r * 0.55, r * 0.45); ctx.quadraticCurveTo(0, r * 0.75, r * 0.55, r * 0.45); ctx.lineTo(r * 0.55, -r * 0.05); ctx.closePath();
  ctx.fillStyle = '#2A2F3A'; ctx.fill(); outline(ctx, 6, '#0A0F1C');
  ctx.beginPath(); ctx.moveTo(0, -r * 0.65); ctx.lineTo(r * 1.05, -r * 0.18); ctx.lineTo(0, r * 0.28); ctx.lineTo(-r * 1.05, -r * 0.18); ctx.closePath(); ctx.fillStyle = '#3A4150'; ctx.fill(); outline(ctx, 6, '#0A0F1C');
  const sw = 0.3 * Math.sin(t * 3.2);
  ctx.save(); ctx.translate(r * 0.1, -r * 0.2); ctx.rotate(sw); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(r * 0.72, r * 0.05); ctx.lineTo(r * 0.72, r * 0.6); outline(ctx, 6, C.gold);
  ctx.beginPath(); ctx.arc(r * 0.72, r * 0.66, 12, 0, TAU); ctx.fillStyle = C.gold; ctx.fill(); ctx.restore();
  ctx.beginPath(); ctx.arc(r * 0.1, -r * 0.2, 9, 0, TAU); ctx.fillStyle = C.gold; ctx.fill();
  ctx.restore();
}
function sThree(ctx, t) {
  navyBg(ctx, t);
  const t3 = T('üç'), tGo = T('müdafiə,') - 0.25;
  const up = E.inOutCubic(prog(t, tGo - 0.2, tGo + 0.25));
  // big 3 → counter chip
  const k3 = pop(t, S.Cc - 0.05);
  const n = (t >= T('təhsil.')) ? 3 : (t >= T('ticarət')) ? 2 : (t >= T('müdafiə,')) ? 1 : 0;
  if (up < 1) { big(ctx, '3', cx, lerp(s.y + 900, s.y + 330, up), lerp(520, 120, up), C.gold, k3 * (1 - up * 0.2), { sw: 0.05 });
    if (up < 0.5) chip(ctx, 'SAHƏ', cx, s.y + 1060, 70, pop(t, t3 + 0.3) * (1 - up * 2), { bg: C.chalk }); }
  else { const kk = 1 + 0.12 * Math.exp(-(t - [0, T('müdafiə,'), T('ticarət'), T('təhsil.')][n]) * 8) * (n > 0);
    chip(ctx, `${n}/3`, cx, s.y + 300, 72 * kk, 1, { bg: C.gold, rot: -0.03 }); }
  // mini document in the corner (the same declaration)
  if (t < tGo) { const kD = sp(t, S.Cc - 0.1, SPRING.gentle); ctx.save(); ctx.translate(s.x + 120, s.y + 560); ctx.rotate(-0.12); ctx.scale(kD, kD);
    rrect(ctx, -70, -90, 140, 180, 10); ctx.fillStyle = '#FBF7EE'; ctx.fill(); outline(ctx, 5, '#0A0F1C');
    for (let i = 0; i < 5; i++) { ctx.fillStyle = '#CFC7B6'; ctx.fillRect(-48, -60 + i * 26, 96 - (i === 4) * 40, 10); } ctx.restore(); }
  // cards
  const rows = [['MÜDAFİƏ', T('müdafiə,'), iconShield], ['TİCARƏT', T('ticarət'), iconTrade], ['TƏHSİL', T('təhsil.'), iconCap]];
  rows.forEach(([lab, tw, ic], i) => {
    const k = sp(t, tw - 0.08, SPRING.bouncy); if (k <= 0) return;
    const y = s.y + 560 + i * 250, x = cx + (1 - Math.min(1, k)) * (i % 2 ? -W : W) * 0.6;
    ctx.save(); ctx.translate(x, y); ctx.rotate((i - 1) * 0.015);
    rrect(ctx, -s.w / 2 + 10, -100, s.w - 20, 200, 30); ctx.fillStyle = C.navy3; ctx.fill(); outline(ctx, 6, '#0A0F1C');
    rrect(ctx, -s.w / 2 + 40, -80, 160, 160, 26); ctx.fillStyle = C.navy; ctx.fill();
    ic(ctx, -s.w / 2 + 120, 0, 62, t);
    text(ctx, lab, -s.w / 2 + 240, 30, font(92, 800, D), C.chalk, 'left');
    text(ctx, `${i + 1}`, s.w / 2 - 60, 30, font(80, 800, D), C.gold, 'center');
    ctx.restore();
  });
}

// ---------------------------------------------------------------- D: twist — 2026 rolls back to 1562
function sYears(ctx, t) {
  parchBg(ctx);
  const ta = T('tarix'), tl = T('1562-ci');
  const q = E.inOutCubic(prog(t, ta, tl));
  const yr = Math.round(lerp(2026, 1562, q));
  const landed = t >= tl;
  ctx.save(); if (landed) shake(ctx, B(t), B(tl), 16, 7, 0.25);
  const kL = landed ? Math.min(1.1, lerp(1.35, 1, E.outBack(prog(t, tl, tl + 0.3)))) : 1;
  // rolling digits: each digit slides vertically
  const str = String(yr), sz = 300; ctx.font = font(sz, 800, D);
  const wTot = ctx.measureText(str).width;
  ctx.save(); ctx.translate(cx, s.y + 780); ctx.scale(kL, kL);
  big(ctx, str, 0, 0, sz, landed ? C.wax : C.ink, 1, { stroke: landed ? C.ink : null, sw: 0.04 });
  if (!landed && q > 0 && q < 1) { ctx.fillStyle = 'rgba(234,217,181,0.6)'; ctx.fillRect(-wTot / 2 - 20, -sz * 0.85 + ((t * 9) % 1) * sz, wTot + 40, 26); }
  ctx.restore(); ctx.restore();
  // hourglass-like label
  chip(ctx, 'TARİX DAHA QƏDİMDİR', cx, s.y + 470, 52, pop(t, T('qədimdir.') - 0.05), { bg: C.ink, fg: C.parch, edge: C.ink, rot: -0.03 });
  if (landed) chip(ctx, 'İL', cx + 260, s.y + 930, 64, pop(t, tl + 0.15), { bg: C.gold, rot: 0.06 });
  // torn page edge entering (page-turn): drawn by the caller
}

// ---------------------------------------------------------------- silhouettes (rule 1g: dark outline, no face)
function jenkinson(ctx, x, y, sc, t, walk) {
  // Tudor English merchant: flat cap, ruff collar, short cape, doublet, trunk-hose, pointed beard. Faces right.
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  const ph = walk ? t * 7 : 0, a = walk ? Math.sin(ph) * 0.35 : 0, bob = walk ? Math.abs(Math.cos(ph)) * 6 : 0;
  ctx.translate(0, -bob);
  ctx.fillStyle = C.sil; ctx.strokeStyle = C.sil; ctx.lineCap = 'round';
  // legs (hose) + shoes
  [[a, -14], [-a, 14]].forEach(([ang, dx]) => { ctx.save(); ctx.translate(dx, -170); ctx.rotate(ang);
    ctx.lineWidth = 26; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 160); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(14, 166, 26, 12, 0, 0, TAU); ctx.fill(); ctx.restore(); });
  // trunk hose (puffy)
  ctx.beginPath(); ctx.ellipse(0, -190, 58, 44, 0, 0, TAU); ctx.fill();
  // doublet torso
  ctx.beginPath(); ctx.moveTo(-46, -200); ctx.lineTo(-40, -330); ctx.quadraticCurveTo(0, -350, 40, -330); ctx.lineTo(52, -200); ctx.closePath(); ctx.fill();
  // short cape over the back shoulder
  ctx.beginPath(); ctx.moveTo(-30, -345); ctx.quadraticCurveTo(-95, -300, -88 - (walk ? Math.sin(ph * 0.5) * 8 : 0), -205); ctx.lineTo(-20, -230); ctx.closePath(); ctx.fill();
  // arm swinging, holding a walking staff when walking
  ctx.save(); ctx.translate(30, -320); ctx.rotate(-a * 0.6 - 0.2); ctx.lineWidth = 22; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(18, 110); ctx.stroke(); ctx.restore();
  if (walk) { ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(62 - a * 20, -230); ctx.lineTo(92 - a * 20, 0); ctx.stroke(); }
  // ruff collar: scalloped disc
  ctx.beginPath(); for (let i = 0; i <= 24; i++) { const an = (i / 24) * TAU, r = i % 2 ? 40 : 48; ctx.lineTo(Math.cos(an) * r, -358 + Math.sin(an) * r * 0.42); } ctx.closePath();
  ctx.fillStyle = '#3B2E25'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#6B5646'; ctx.stroke(); ctx.fillStyle = C.sil;
  // head + pointed beard
  ctx.beginPath(); ctx.ellipse(6, -410, 34, 40, 0, 0, TAU); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-6, -392); ctx.quadraticCurveTo(26, -386, 44, -395); ctx.lineTo(30, -352); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(36, -420); ctx.lineTo(48, -404); ctx.lineTo(36, -398); ctx.fill(); // nose outline
  // flat cap (wide, tilted)
  ctx.save(); ctx.translate(2, -446); ctx.rotate(-0.12); ctx.beginPath(); ctx.ellipse(0, 0, 66, 17, 0, 0, TAU); ctx.fill();
  ctx.beginPath(); ctx.ellipse(-4, -10, 40, 20, 0, Math.PI, TAU); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-30, -18); ctx.quadraticCurveTo(-70, -48, -50, -64); outline(ctx, 5, '#6B5646'); ctx.restore(); // feather
  ctx.restore();
}
function camel(ctx, x, y, sc, t) {
  // single-hump camel silhouette, walking, faces right
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.fillStyle = '#3A2A1E'; ctx.strokeStyle = '#3A2A1E'; ctx.lineCap = 'round';
  const ph = t * 7;
  [[-80, 0], [-50, Math.PI], [70, Math.PI * 0.5], [100, Math.PI * 1.5]].forEach(([lx, o]) => { const ang = Math.sin(ph + o) * 0.3;
    ctx.save(); ctx.translate(lx, -190); ctx.rotate(ang); ctx.lineWidth = 16; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 95); ctx.lineTo(4, 190); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(8, 192, 16, 8, 0, 0, TAU); ctx.fill(); ctx.restore(); });
  // body + hump
  ctx.beginPath(); ctx.moveTo(-130, -200); ctx.quadraticCurveTo(-140, -260, -80, -275); ctx.quadraticCurveTo(-20, -380, 50, -285);
  ctx.quadraticCurveTo(110, -275, 130, -230); ctx.quadraticCurveTo(120, -175, 60, -175); ctx.lineTo(-100, -175); ctx.quadraticCurveTo(-130, -180, -130, -200); ctx.closePath(); ctx.fill();
  // tail
  ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-128, -230); ctx.quadraticCurveTo(-150, -200, -142, -170); ctx.stroke();
  // neck + head
  ctx.lineWidth = 40; ctx.beginPath(); ctx.moveTo(115, -235); ctx.quadraticCurveTo(170, -250, 175, -330); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(200, -345, 42, 20, 0.15, 0, TAU); ctx.fill();
  ctx.beginPath(); ctx.ellipse(170, -368, 8, 13, -0.3, 0, TAU); ctx.fill(); // ear
  // load (trade bundles)
  rrect(ctx, -60, -330, 90, 60, 10); ctx.fillStyle = '#8A5A2E'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#2B1D12'; ctx.stroke();
  ctx.restore();
}
function khan(ctx, x, y, sc, t) {
  // Safavid governor: Qizilbash turban wrapped round a tall baton (taj), long kaftan, sash. Faces left.
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.fillStyle = C.sil;
  // kaftan to the floor
  ctx.beginPath(); ctx.moveTo(-50, -360); ctx.quadraticCurveTo(0, -375, 50, -360); ctx.lineTo(95, -8); ctx.quadraticCurveTo(0, 8, -95, -8); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.ellipse(-20, 0, 26, 10, 0, 0, TAU); ctx.fill(); ctx.beginPath(); ctx.ellipse(28, 0, 26, 10, 0, 0, TAU); ctx.fill();
  // sash
  ctx.fillStyle = '#5A1E18'; ctx.beginPath(); ctx.moveTo(-62, -245); ctx.lineTo(64, -245); ctx.lineTo(66, -215); ctx.lineTo(-64, -215); ctx.closePath(); ctx.fill();
  ctx.fillStyle = C.sil;
  // arm forward holding a scroll edge
  ctx.save(); ctx.translate(-30, -330); ctx.rotate(0.9 + 0.05 * Math.sin(t * 2)); ctx.lineWidth = 30; ctx.strokeStyle = C.sil; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 120); ctx.stroke(); ctx.restore();
  // head + full beard
  ctx.beginPath(); ctx.ellipse(-4, -410, 36, 42, 0, 0, TAU); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-40, -405); ctx.quadraticCurveTo(-46, -350, -8, -338); ctx.quadraticCurveTo(26, -345, 30, -390); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-36, -420); ctx.lineTo(-50, -404); ctx.lineTo(-36, -398); ctx.fill();
  // turban: big rounded wrap + tall baton with a red tip (taj)
  ctx.beginPath(); ctx.ellipse(-2, -460, 58, 34, 0, 0, TAU); ctx.fill();
  ctx.strokeStyle = '#4A3A30'; ctx.lineWidth = 4; for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.ellipse(-2, -462 + i * 10 - 10, 52, 22, -0.25, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke(); }
  ctx.fillStyle = C.sil; rrect(ctx, -12, -590, 24, 120, 8); ctx.fill();
  ctx.fillStyle = C.wax; rrect(ctx, -12, -590, 24, 40, 8); ctx.fill();
  ctx.restore();
}
function namePlate(ctx, name, role, x, y, k, rot = -0.03) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(56, 800, UI); const w = Math.max(ctx.measureText(name).width, 300) + 70;
  rrect(ctx, -w / 2, -58, w, 140, 18); ctx.fillStyle = C.ink; ctx.fill(); outline(ctx, 5, C.gold);
  text(ctx, name, 0, 0, font(56, 800, UI), C.parch, 'center', 1);
  text(ctx, role, 0, 56, font(40, 600, UI), C.gold, 'center');
  ctx.restore();
}

// ---------------------------------------------------------------- E: Jenkinson's caravan reaches Şamaxı (1562)
function sCaravan(ctx, t) {
  parchBg(ctx, '#EFD9AE');
  const t0 = S.E, ground = s.y + 1100;
  // sun + dunes (parallax)
  ctx.beginPath(); ctx.arc(s.x + s.w - 150, s.y + 470, 90, 0, TAU); ctx.fillStyle = '#F2B53A'; ctx.fill();
  const dune = (yy, amp, col, spd, ph) => { ctx.beginPath(); ctx.moveTo(0, H); for (let x = 0; x <= W; x += 20) ctx.lineTo(x, yy + amp * Math.sin((x + t * spd) / 180 + ph)); ctx.lineTo(W, H); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); };
  dune(ground - 230, 40, '#E1C58F', 40, 1); dune(ground - 90, 30, C.sand2, 90, 3);
  ctx.fillStyle = C.sand; ctx.fillRect(0, ground, W, H - ground);
  ctx.strokeStyle = 'rgba(43,29,18,0.25)'; ctx.lineWidth = 4; ctx.setLineDash([30, 26]); ctx.lineDashOffset = t * 160; ctx.beginPath(); ctx.moveTo(0, ground + 30); ctx.lineTo(W, ground + 30); ctx.stroke(); ctx.setLineDash([]);
  // signpost ŞAMAXI arrives from the right
  const tS = T('Şamaxıya');
  const kS = pop(t, tS - 0.05);
  if (kS > 0) { ctx.save(); ctx.translate(s.x + s.w - 130, ground + 10); ctx.scale(1, kS);
    ctx.fillStyle = '#6B4A2B'; ctx.fillRect(-12, -300, 24, 300); ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.strokeRect(-12, -300, 24, 300);
    ctx.beginPath(); ctx.moveTo(-150, -300); ctx.lineTo(110, -300); ctx.lineTo(150, -255); ctx.lineTo(110, -210); ctx.lineTo(-150, -210); ctx.closePath(); ctx.fillStyle = '#8A5A2E'; ctx.fill(); outline(ctx, 6);
    text(ctx, 'ŞAMAXI', -10, -238, font(56, 800, UI), C.parch, 'center'); ctx.restore(); }
  // walkers: enter from left, stop near the post
  const stop = tS + 0.3;
  const xStop = s.x + s.w - 360, v = (xStop - (s.x - 120)) / (stop - t0);
  const jx = s.x + 60 + (v * (stop - t0) - 180) / (stop - t0) * (Math.min(t, stop) - t0), walking = t < stop;
  camel(ctx, jx - 330, ground + 10, 0.95, walking ? t : stop);
  jenkinson(ctx, jx, ground + 10, 1.05, t, walking);
  namePlate(ctx, 'ENTONİ CENKİNSON', 'ingilis taciri', cx, s.y + 470, pop(t, T('Entoni') - 0.05));
  chip(ctx, '1562', s.x + 120, s.y + 640, 58, pop(t, t0 + 0.2), { bg: C.wax, fg: C.parch, rot: -0.08 });
}

// ---------------------------------------------------------------- F: Abdulla xan gives the trading permit
function sPermit(ctx, t) {
  parchBg(ctx);
  const ground = s.y + 1090;
  // palace arch backdrop (pointed arch)
  const kA = sp(t, S.F - 0.2, SPRING.gentle);
  ctx.save(); ctx.translate(cx, ground); ctx.scale(1, Math.min(1, kA));
  ctx.beginPath(); ctx.moveTo(-330, 0); ctx.lineTo(-330, -560); ctx.quadraticCurveTo(-320, -800, 0, -900); ctx.quadraticCurveTo(320, -800, 330, -560); ctx.lineTo(330, 0); ctx.closePath();
  ctx.fillStyle = C.parch2; ctx.fill(); outline(ctx, 8, C.sepia);
  ctx.beginPath(); ctx.moveTo(-260, 0); ctx.lineTo(-260, -540); ctx.quadraticCurveTo(-250, -730, 0, -810); ctx.quadraticCurveTo(250, -730, 260, -540); ctx.lineTo(260, 0); ctx.closePath();
  ctx.fillStyle = '#C9A56C'; ctx.fill(); outline(ctx, 5, C.sepia);
  ctx.restore();
  // carpet
  ctx.fillStyle = '#8E2C22'; ctx.beginPath(); ctx.moveTo(s.x - 40, ground + 130); ctx.lineTo(s.x + s.w + 40, ground + 130); ctx.lineTo(s.x + s.w - 80, ground); ctx.lineTo(s.x + 80, ground); ctx.closePath(); ctx.fill();
  ctx.strokeStyle = C.gold; ctx.lineWidth = 6; ctx.stroke();
  ctx.fillStyle = '#D9BF8C'; ctx.fillRect(0, ground + 130, W, H);
  // people
  const kK = sp(t, S.F - 0.1, SPRING.snappy);
  khan(ctx, s.x + s.w - 150 + (1 - Math.min(1, kK)) * 400, ground + 40, 1.25, t);
  const kJ = sp(t, S.F, SPRING.snappy);
  jenkinson(ctx, s.x + 140 - (1 - Math.min(1, kJ)) * 400, ground + 40, 1.2, t, false);
  namePlate(ctx, 'ABDULLA XAN', 'Şirvan hakimi', cx + 130, s.y + 450, pop(t, T('Abdulla') - 0.25), 0.03);
  // scroll unrolls between them
  const tc = T('ticarət', 1), tv = T('verib.');
  const q = E.outCubic(prog(t, tc - 0.1, tc + 0.6));
  if (q > 0) { const w = 600 * q, y0 = s.y + 640;
    ctx.save(); ctx.translate(cx, y0); ctx.rotate(-0.03);
    rrect(ctx, -w / 2, 0, w, 330, 10); ctx.fillStyle = '#F6EAD0'; ctx.fill(); outline(ctx, 6);
    [[-w / 2], [w / 2]].forEach(([xx]) => { rrect(ctx, xx - 20, -20, 40, 370, 18); ctx.fillStyle = '#8A5A2E'; ctx.fill(); outline(ctx, 5); });
    if (q > 0.7) { ctx.save(); ctx.globalAlpha = clamp((q - 0.7) / 0.3);
      text(ctx, 'TİCARƏT', 0, 120, font(76, 700, SR), C.ink, 'center', 2); text(ctx, 'İCAZƏSİ', 0, 205, font(76, 700, SR), C.ink, 'center', 2);
      ctx.strokeStyle = 'rgba(43,29,18,0.35)'; ctx.lineWidth = 4; for (let i = 0; i < 2; i++) { ctx.beginPath(); ctx.moveTo(-200, 245 + i * 28); ctx.lineTo(200 - i * 80, 245 + i * 28); ctx.stroke(); }
      ctx.restore(); }
    // wax seal
    const kW = t >= tv ? Math.min(1.05, lerp(1.8, 1, E.outBack(prog(t, tv, tv + 0.25)))) : 0;
    if (kW > 0) { ctx.save(); ctx.translate(w / 2 - 90, 290); ctx.scale(kW, kW); ctx.beginPath();
      for (let i = 0; i < 20; i++) { const an = (i / 20) * TAU, r = 62 + (i % 2) * 8; ctx.lineTo(Math.cos(an) * r, Math.sin(an) * r); } ctx.closePath();
      ctx.fillStyle = C.wax; ctx.fill(); outline(ctx, 4, '#6A1A14'); ctx.beginPath(); ctx.arc(0, 0, 40, 0, TAU); outline(ctx, 4, '#E06A5C');
      ctx.restore(); }
    ctx.restore(); }
}

// ---------------------------------------------------------------- G: payoff + end card
function sEnd(ctx, t) {
  navyBg(ctx, t);
  const t0 = S.G;
  big(ctx, '1562 → 2026', cx, s.y + 360, 92, C.chalk, sp(t, t0 - 0.1, SPRING.snappy), { stroke: null });
  big(ctx, '464 İL', cx, s.y + 570, 220, C.gold, pop(t, t0 + 0.05), { sw: 0.05, rot: -0.03 });
  text(ctx, '@bilirdinizmi_az', cx, s.y + 760, font(80, 800, D), C.chalk, 'center');
  // BƏYƏN (heart) + İZLƏ buttons
  const kB = pop(t, T('Bəyən') - 0.05), kI = pop(t, T('izlə') - 0.05);
  if (kB > 0) { ctx.save(); ctx.translate(cx - 215, s.y + 1050); ctx.scale(kB, kB); ctx.rotate(-0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 6, '#0A0F1C');
    const hb = 1 + 0.12 * Math.max(0, Math.sin((t - T('Bəyən')) * 9)) * Math.exp(-(t - T('Bəyən')) * 2);
    ctx.save(); ctx.translate(-110, 4); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30);
    ctx.fillStyle = '#E8384F'; ctx.fill(); ctx.restore();
    text(ctx, 'BƏYƏN', 40, 24, font(64, 800, D), '#0A0F1C', 'center'); ctx.restore(); }
  if (kI > 0) { ctx.save(); ctx.translate(cx + 215, s.y + 1050); ctx.scale(kI, kI); ctx.rotate(0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 6, '#0A0F1C');
    ctx.save(); ctx.translate(-115, 4); ctx.lineWidth = 12; ctx.strokeStyle = '#0A0F1C'; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'İZLƏ', 40, 24, font(64, 800, D), '#0A0F1C', 'center'); ctx.restore(); }
  if (t > T('fakt!') + 0.4) chip(ctx, 'hər gün bilmədiyin bir fakt', cx, s.y + 890, 54, pop(t, T('fakt!') + 0.4), { bg: C.navy3, fg: C.chalk, edge: C.gold, rot: -0.02 });
}

function pageTurn(ctx, t, t0, a, b, dur = 0.45) {
  // new page slides over from the right with a curled shadow edge (both pages on screen)
  const p = E.inOutCubic(prog(t, t0 - dur * 0.5, t0 + dur * 0.5));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(-p * W * 0.35, 0); a(); ctx.restore();
  const ex = W * (1 - p);
  ctx.save(); ctx.beginPath(); ctx.moveTo(ex + 120, 0); ctx.lineTo(W, 0); ctx.lineTo(W, H); ctx.lineTo(ex - 120, H); ctx.closePath(); ctx.clip();
  ctx.translate((1 - p) * 60, 0); b(); ctx.restore();
  const g = ctx.createLinearGradient(ex - 160, 0, ex + 160, 0); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.5, 'rgba(0,0,0,0.35)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(ex + 80, 0); ctx.lineTo(ex + 160, 0); ctx.lineTo(ex - 80, H); ctx.lineTo(ex - 160, H); ctx.closePath(); ctx.fill();
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 600, UI), font(40, 700, SR), font(40, 600, SR)],
  hits: HITS,
  draw(ctx, u, t) {
    if (t < S.B + 0.2) whip(ctx, t, S.B, () => sHook(ctx, t), () => sDoc(ctx, t));
    else if (t < S.Cc + 0.2) whip(ctx, t, S.Cc, () => sDoc(ctx, t), () => sThree(ctx, t));
    else if (t < S.D + 0.3) pageTurn(ctx, t, S.D, () => sThree(ctx, t), () => sYears(ctx, t));
    else if (t < S.E + 0.2) whip(ctx, t, S.E, () => sYears(ctx, t), () => sCaravan(ctx, t));
    else if (t < S.F + 0.2) whip(ctx, t, S.F, () => sCaravan(ctx, t), () => sPermit(ctx, t));
    else whip(ctx, t, S.G, () => sPermit(ctx, t), () => sEnd(ctx, t), 0.38);
    const dark = t >= S.D && t < S.G;
    if (t < S.G + 0.1 || t > S.G + 0.3) timeline(ctx, t, dark);
    captions(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 400; i++) { ctx.fillStyle = `rgba(255,240,220,${0.02 + 0.03 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
