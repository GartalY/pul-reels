// "503 filmdən birinci" — @bilirdinizmi_az 18:30 animated reel, 18 Nov 2026. Pure function of time.
// Azerbaijani short film won 1st place in the main category ("Global Peace, Harmony and Human Rights") at the Hague
// International Film Festival 2026 (13–15 Nov): 503 films submitted, 63 selected from 23 countries, 4 finalists,
// 13-member jury unanimous; the film's 7th international success of 2026 (APA, AZERTAC, AzerNews, FilmFreeway).
// Arif voice (ElevenLabs) on audio/vo.wav; every word/number timed to Scribe word starts. Night cinema world (curtains,
// spotlights, film frames). Jurors = anonymous generic silhouettes (no real people). No music; soft SFX only.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = __TIMING__;
const C = {
  night: '#0B0508', wine: '#2A0912', wine2: '#4A0F1F', velvet: '#7A1426', velvet2: '#A01E33', chalk: '#F6F1E6',
  gold: '#F5C33B', gold2: '#C9921C', ink: '#0A0608', panel: '#1A0F16', panel2: '#2E1A26', mute: '#BBA9B0', sil: '#050304',
  green: '#3DDC84', grey: '#5E5257',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));

const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const END = TIMING.dur + 1.3;
const S = { A: 0, B: T('Azərbaycan') - 0.12, C: T('Bu') - 0.12, E: T('Əsas') - 0.12, F: T('On') - 0.12, G: T('Ən') - 0.12, H: T('Bəyən') - 0.12 };
const B = (t) => t / 0.5;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.3, from, to }];

// funnel moments: 503 → 63 → 4 → 1
const F503 = 0.1, F63 = T('altmış'), F4 = T('dörd'), F1 = T('seçdi.');
const FUN = [['503', F503], ['63', F63], ['4', F4], ['1', F1]];
const G_FILL0 = S.C + 0.2, G_FILL1 = T('göndərildi.') + 0.2, G_CULL = T('Cəmi') + 0.05, G_GATHER = T('üçü') - 0.1;
const JURY_IN = T('On'), JURY_YES = T('yekdilliklə') - 0.02, JURY_GAP = 0.06;
const LAUREL_T = [0, 1, 2, 3, 4, 5].map((i) => T('bu,') + 0.05 + i * 0.16).concat([T('yeddinci') - 0.02]);

const HITS = [
  [B(0.02), '503', 'thud'], [B(T('filmdən') - 0.1), 'frames swirl', 'whoosh', { len: 0.5, from: 400, to: 1600 }], [B(T('birinci!')), 'trophy 1-ci', 'thud'],
  WH(S.B, 600, 2200), [B(T('Azərbaycan')), 'clapper snap', 'click'], [B(T('filmi')), 'AZ flag', 'tick'], [B(T('Haaqada')), 'HAAQA pin', 'click'], [B(T('qalib')), 'QALİB stamp', 'thud'],
  WH(S.C, 2200, 600), [B(T('Haaqa')), 'marquee', 'click'], [B(G_FILL0), 'frames pour in', 'type', { len: 2.6, n: 20 }],
  [B(T('beş')), 'counter', 'type', { len: 0.8, n: 8 }], [B(T('göndərildi.')), '503 lands', 'thud'],
  [B(G_CULL), 'cull', 'whoosh', { len: 0.4, from: 1800, to: 500 }], [B(G_GATHER), '63 gather', 'click'], [B(T('seçildi,')), '63', 'thud'],
  ...Array.from({ length: 6 }, (_, i) => [B(T('iyirmi') + 0.05 + i * 0.1), `pins ${i}`, 'tick']), [B(T('ölkədən.')), '23 ÖLKƏ', 'click'],
  WH(S.E, 600, 2200), [B(T('Əsas')), 'category', 'click'], [B(T('finala')), 'FİNAL', 'click'],
  ...[0, 1, 2, 3].map((i) => [B(T('dörd') + i * 0.12), `poster ${i + 1}`, 'thud']),
  WH(S.F, 2200, 600), ...Array.from({ length: 5 }, (_, i) => [B(JURY_IN + i * 0.12), `jurors ${i}`, 'tick']),
  ...Array.from({ length: 13 }, (_, i) => [B(JURY_YES + i * JURY_GAP), `yes ${i + 1}`, 'click']),
  [B(T('Azərbaycanın')), 'AZ poster', 'whoosh', { len: 0.3, from: 500, to: 1800 }], [B(T('qısa')), 'QISA FİLM', 'click'], [B(F1), '1-ci YER', 'thud'],
  WH(S.G, 600, 2200), [B(T('maraqlısı:')), '?!', 'click'],
  ...LAUREL_T.slice(0, 6).map((tt, i) => [B(tt), `laurel ${i + 1}`, 'tick']), [B(LAUREL_T[6]), 'laurel 7', 'thud'], [B(T('beynəlxalq')), 'BEYNƏLXALQ', 'click'],
  WH(S.H, 2200, 600), [B(T('Bəyən')), 'BƏYƏN', 'click'], [B(T('izlə')), 'İZLƏ', 'thud'], [B(T('fakt!') + 0.3), 'send line', 'tick'],
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
// one film frame (35 mm strip piece with sprocket holes)
function frame(ctx, x, y, w, k = 1, { col = C.chalk, win = C.panel2, rot = 0, alpha = 1 } = {}) {
  if (k <= 0) return; const h = w * 0.82;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.globalAlpha *= alpha;
  ctx.fillStyle = col; ctx.fillRect(-w / 2, -h / 2, w, h);
  ctx.fillStyle = win; ctx.fillRect(-w * 0.3, -h * 0.36, w * 0.6, h * 0.72);
  ctx.fillStyle = C.ink; for (let i = 0; i < 3; i++) { const yy = -h * 0.33 + i * h * 0.33; ctx.fillRect(-w * 0.45, yy - h * 0.06, w * 0.1, h * 0.12); ctx.fillRect(w * 0.35, yy - h * 0.06, w * 0.1, h * 0.12); }
  ctx.restore();
}
// film reel: disc with 5 round holes and hub
function reel(ctx, x, y, r, rot = 0, k = 1) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(rot);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU);
  for (let i = 0; i < 5; i++) { const a = (i / 5) * TAU; ctx.moveTo(Math.cos(a) * r * 0.55 + r * 0.24, Math.sin(a) * r * 0.55); ctx.arc(Math.cos(a) * r * 0.55, Math.sin(a) * r * 0.55, r * 0.24, 0, TAU, true); }
  ctx.fillStyle = '#C9CCD3'; ctx.fill('evenodd'); ctx.lineWidth = r * 0.06; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 0, r * 0.14, 0, TAU); ctx.fillStyle = C.ink; ctx.fill();
  ctx.beginPath(); ctx.arc(0, 0, r * 0.93, 0, TAU); ctx.lineWidth = r * 0.03; ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.stroke();
  ctx.restore();
}
// trophy cup
function trophy(ctx, x, y, sc, k = 1, label = '') {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(sc * k, sc * k);
  ctx.lineWidth = 26; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.arc(-120, -230, 52, Math.PI * 0.5, Math.PI * 1.5); ctx.stroke(); ctx.beginPath(); ctx.arc(120, -230, 52, -Math.PI * 0.5, Math.PI * 0.5); ctx.stroke();
  ctx.lineWidth = 14; ctx.strokeStyle = C.gold; ctx.beginPath(); ctx.arc(-120, -230, 52, Math.PI * 0.5, Math.PI * 1.5); ctx.stroke(); ctx.beginPath(); ctx.arc(120, -230, 52, -Math.PI * 0.5, Math.PI * 0.5); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-120, -300); ctx.lineTo(120, -300); ctx.quadraticCurveTo(118, -120, 26, -80); ctx.lineTo(26, -30); ctx.lineTo(-26, -30); ctx.lineTo(-26, -80); ctx.quadraticCurveTo(-118, -120, -120, -300); ctx.closePath();
  const g = ctx.createLinearGradient(-120, 0, 120, 0); g.addColorStop(0, C.gold2); g.addColorStop(0.4, '#FFE08A'); g.addColorStop(1, C.gold2);
  ctx.fillStyle = g; ctx.fill(); outline(ctx, 8);
  rrect(ctx, -70, -34, 140, 34, 6); ctx.fillStyle = C.gold2; ctx.fill(); outline(ctx, 7);
  rrect(ctx, -110, 0, 220, 70, 10); ctx.fillStyle = '#2B1B12'; ctx.fill(); outline(ctx, 7);
  if (label) text(ctx, label, 0, -175, font(110, 800, D), C.ink, 'center');
  ctx.restore();
}
// festival laurel wreath (two leaf arcs) with a centre label
function laurel(ctx, x, y, r, k = 1, label = '', { col = C.gold, lit = false } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  if (lit) { ctx.beginPath(); ctx.arc(0, 0, r * 1.25, 0, TAU); ctx.fillStyle = 'rgba(245,195,59,0.18)'; ctx.fill(); }
  for (const side of [-1, 1]) for (let i = 0; i < 8; i++) {
    const a = Math.PI / 2 + side * (0.35 + i * 0.3), px = Math.cos(a) * r, py = Math.sin(a) * r;
    ctx.save(); ctx.translate(px, py); ctx.rotate(a + side * Math.PI / 2 - side * 0.5);
    ctx.beginPath(); ctx.ellipse(0, 0, r * 0.11, r * 0.24, 0, 0, TAU); ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore();
  }
  if (label) text(ctx, label, 0, r * 0.28, font(r * 0.8, 800, D), col, 'center');
  ctx.restore();
}
// clapperboard (slate) with an animated arm (open 0 = shut, 1 = open)
function clapper(ctx, x, y, w, open, k, lines) {
  if (k <= 0) return; const h = w * 0.62, armH = w * 0.14;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  rrect(ctx, -w / 2, -h / 2, w, h, 12); ctx.fillStyle = '#161012'; ctx.fill(); outline(ctx, 8);
  ctx.strokeStyle = 'rgba(246,241,230,0.6)'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(-w / 2 + 20, -h / 2 + h * 0.42); ctx.lineTo(w / 2 - 20, -h / 2 + h * 0.42); ctx.moveTo(0, -h / 2 + h * 0.42); ctx.lineTo(0, h / 2 - 20); ctx.stroke();
  lines(ctx, w, h);
  const bar = (yy) => { ctx.save(); rrect(ctx, -w / 2, yy, w, armH, 6); ctx.clip(); ctx.fillStyle = C.chalk; ctx.fillRect(-w / 2, yy, w, armH);
    ctx.fillStyle = C.ink; for (let i = -2; i < 10; i++) { ctx.beginPath(); const x0 = -w / 2 + i * w / 7; ctx.moveTo(x0, yy); ctx.lineTo(x0 + w / 14, yy); ctx.lineTo(x0 + w / 14 + armH, yy + armH); ctx.lineTo(x0 + armH, yy + armH); ctx.closePath(); ctx.fill(); }
    ctx.restore(); rrect(ctx, -w / 2, yy, w, armH, 6); outline(ctx, 6); };
  bar(-h / 2 - armH);
  ctx.save(); ctx.translate(-w / 2, -h / 2 - armH); ctx.rotate(-0.55 * open); ctx.translate(w / 2, h / 2 + armH); bar(-h / 2 - armH * 2 - 4); ctx.restore();
  ctx.restore();
}
// anonymous juror silhouette: head + shoulders behind the table, raising a card (yes 0..1)
function juror(ctx, x, y, sc, k, yes, i) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y + (1 - Math.min(1, k)) * 80); ctx.scale(sc, sc);
  const hair = i % 3;
  ctx.fillStyle = C.sil; ctx.strokeStyle = 'rgba(245,195,59,0.7)'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(-70, 0); ctx.quadraticCurveTo(-72, -95, 0, -100); ctx.quadraticCurveTo(72, -95, 70, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(0, -140, 36, 44, 0, 0, TAU); ctx.fill(); ctx.stroke();
  if (hair === 1) { ctx.beginPath(); ctx.ellipse(0, -160, 40, 28, 0, Math.PI, TAU); ctx.fill(); }
  if (hair === 2) { ctx.beginPath(); ctx.moveTo(-38, -150); ctx.quadraticCurveTo(-50, -90, -30, -95); ctx.lineTo(30, -95); ctx.quadraticCurveTo(50, -90, 38, -150); ctx.fill(); }
  const a = E.outBack(clamp(yes));
  const hx = lerp(40, 75, a), hy = lerp(-20, -230, a);
  ctx.lineCap = 'round'; ctx.lineWidth = 26; ctx.strokeStyle = C.sil; ctx.beginPath(); ctx.moveTo(48, -70); ctx.lineTo(hx, hy); ctx.stroke();
  if (yes > 0) { ctx.save(); ctx.translate(hx, hy - 50); ctx.rotate(0.08 * Math.sin(i));
    rrect(ctx, -42, -42, 84, 84, 12); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 5);
    text(ctx, '✓', 0, 24, font(68, 800, D), C.ink, 'center'); ctx.restore(); }
  ctx.restore();
}
// poster card for a finalist film (anonymous except the AZ one)
function poster(ctx, x, y, w, k, { az = false, dim = 0, rot = 0, t = 0 } = {}) {
  if (k <= 0) return; const h = w * 1.42;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  rrect(ctx, -w / 2, -h / 2, w, h, 12); ctx.fillStyle = az ? '#1B2A44' : C.panel2; ctx.fill(); outline(ctx, 7, az ? C.gold : C.ink);
  ctx.save(); rrect(ctx, -w / 2, -h / 2, w, h, 12); ctx.clip();
  ctx.fillStyle = 'rgba(0,0,0,0.45)'; ctx.fillRect(-w / 2, h * 0.12, w, h * 0.22);
  ctx.fillStyle = 'rgba(246,241,230,0.55)'; for (let i = 0; i < 7; i++) { ctx.fillRect(-w / 2 + 8 + i * w / 7, h * 0.13, w / 14, h * 0.03); ctx.fillRect(-w / 2 + 8 + i * w / 7, h * 0.30, w / 14, h * 0.03); }
  ctx.restore();
  reel(ctx, 0, -h * 0.17, w * 0.27, t * 1.5, 1);
  if (az) flagAZ(ctx, 0, h * 0.4, w * 0.5, 1);
  else text(ctx, '?', 0, h * 0.46, font(w * 0.3, 800, D), C.mute, 'center');
  if (dim > 0) { rrect(ctx, -w / 2, -h / 2, w, h, 12); ctx.fillStyle = `rgba(10,6,8,${0.7 * dim})`; ctx.fill(); }
  ctx.restore();
}

// ---------------------------------------------------------------- world: cinema hall at night
function hall(ctx, t, { spot = 0 } = {}) {
  fill(ctx, C.night);
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#120509'); g.addColorStop(0.5, C.wine); g.addColorStop(1, '#0A0306');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  [[W * 0.25, 0.4, 0.35], [W * 0.75, 2.1, -0.35]].forEach(([x, ph, ang]) => {
    const a = 0.07 + 0.03 * Math.sin(t * 1.6 + ph) + spot * 0.05;
    ctx.save(); ctx.translate(x, -40); ctx.rotate(ang * 0.4 + 0.12 * Math.sin(t * 0.7 + ph));
    const lg = ctx.createLinearGradient(0, 0, 0, H); lg.addColorStop(0, `rgba(255,236,200,${a * 2.2})`); lg.addColorStop(1, 'rgba(255,236,200,0)');
    ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.lineTo(330, H); ctx.lineTo(-330, H); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  const fy = s.y + 1190;
  const fg = ctx.createLinearGradient(0, fy, 0, H); fg.addColorStop(0, '#3A1E14'); fg.addColorStop(1, '#140A07');
  ctx.fillStyle = fg; ctx.fillRect(0, fy, W, H - fy);
  ctx.strokeStyle = 'rgba(0,0,0,0.35)'; ctx.lineWidth = 3;
  for (let i = -8; i <= 8; i++) { ctx.beginPath(); ctx.moveTo(W / 2 + i * 70, fy); ctx.lineTo(W / 2 + i * 260, H); ctx.stroke(); }
  ctx.fillStyle = C.gold2; ctx.fillRect(0, fy - 6, W, 8);
  for (const side of [0, 1]) {
    const x0 = side ? W : 0, dir = side ? -1 : 1, cw = 120 + 12 * Math.sin(t * 0.9 + side * 2);
    for (let f = 0; f < 4; f++) {
      const fx = x0 + dir * (f * cw / 4);
      const cg = ctx.createLinearGradient(fx, 0, fx + dir * cw / 4, 0); cg.addColorStop(0, C.velvet); cg.addColorStop(0.5, C.velvet2); cg.addColorStop(1, '#4A0A17');
      ctx.fillStyle = cg; ctx.beginPath(); ctx.moveTo(fx, 0); ctx.lineTo(fx + dir * cw / 4, 0);
      ctx.quadraticCurveTo(fx + dir * (cw / 4 + 10 * Math.sin(t * 1.3 + f)), H * 0.5, fx + dir * cw / 4, H); ctx.lineTo(fx, H); ctx.closePath(); ctx.fill();
    }
  }
  ctx.fillStyle = C.velvet; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(W, 0); ctx.lineTo(W, 70);
  for (let i = 8; i >= 1; i--) ctx.quadraticCurveTo(W * (i - 0.5) / 8, 120, W * (i - 1) / 8, 70);
  ctx.closePath(); ctx.fill(); ctx.fillStyle = C.gold2; ctx.fillRect(0, 0, W, 10);
  for (let i = 0; i < 34; i++) { const x = (hash01(i, 3) * W + t * 14 * (0.5 + hash01(i, 4))) % W, y = (hash01(i, 5) * H - t * 10) % H;
    ctx.fillStyle = `rgba(255,236,200,${0.06 + 0.1 * hash01(i, 6)})`; ctx.fillRect(x, (y + H) % H, 3, 3); }
}

// ---------------------------------------------------------------- persistent bug: funnel 503 › 63 › 4 › 1
function bug(ctx, t) {
  const k = clamp(prog(t, 0.2, 0.55)); if (k <= 0) return;
  const y = s.y + s.h - 30, x0 = cx - 380, w = 760;
  ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 60);
  rrect(ctx, x0, y - 46, w, 92, 16); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 4, '#000');
  reel(ctx, x0 + 50, y, 30, t * 2, 1);
  const xs = [x0 + 175, x0 + 345, x0 + 485, x0 + 610];
  let last = -1; FUN.forEach(([, ft], i) => { if (t >= ft) last = i; });
  FUN.forEach(([lab, ft], i) => {
    const on = t >= ft, bmp = on ? 1 + 0.4 * Math.exp(-(t - ft) * 7) : 1;
    ctx.save(); ctx.translate(xs[i], y); ctx.scale(bmp, bmp);
    text(ctx, lab, 0, 16, font(46, 800, D), i === last ? C.gold : on ? C.chalk : 'rgba(187,169,176,0.35)', 'center'); ctx.restore();
    if (i < 3) text(ctx, '›', (xs[i] + xs[i + 1]) / 2 + (i === 0 ? 12 : 0), 14, font(46, 800, D), 'rgba(187,169,176,0.6)', 'center');
  });
  ctx.save(); if (t < F1) ctx.globalAlpha = k * 0.3; trophy(ctx, x0 + 700, y + 30, 0.2, 1); ctx.restore();
  ctx.restore();
}

// ---------------------------------------------------------------- A: hook "503 filmdən birinci!"
const SW = Array.from({ length: 46 }, (_, i) => ({ a: hash01(i, 11) * TAU, r: 250 + 260 * hash01(i, 12), w: 54 + 30 * hash01(i, 13), sp: 0.6 + hash01(i, 14) }));
function sHook(ctx, t) {
  hall(ctx, t, { spot: prog(t, 1.2, 1.6) });
  const tC = T('filmdən') - 0.1, tW = T('birinci!');
  const ty = s.y + 900;
  SW.forEach((f, i) => {
    const conv = E.inCubic(prog(t, tC + i * 0.006, tW - 0.02));
    const ang = f.a + t * f.sp * 1.4, rr = f.r * (1 - conv);
    const x = lerp(cx + Math.cos(ang) * rr * 1.25, cx, conv), y = lerp(s.y + 620 + Math.sin(ang) * rr * 1.1, ty - 120, conv);
    const k = pop(t, 0.02 + i * 0.008) * (1 - conv);
    frame(ctx, x, y, f.w, k, { rot: ang * 0.5, alpha: 0.95 });
  });
  ctx.save(); shake(ctx, B(t), B(0.02), 18, 5, 0.25);
  const k0 = t < 0.35 ? lerp(1.45, 1, E.outBack(prog(t, 0, 0.35))) : 1;
  const lift = E.inOutCubic(prog(t, tW - 0.25, tW + 0.1));
  big(ctx, '503', cx, lerp(s.y + 600, s.y + 470, lift), lerp(330, 250, lift), C.gold, k0, { sw: 0.05 });
  chip(ctx, 'FİLM', cx, lerp(s.y + 700, s.y + 545, lift), 64, pop(t, T('filmdən') - 0.08), { bg: C.chalk, rot: 0.04 });
  ctx.restore();
  const kt = pop(t, tW - 0.05);
  if (kt > 0) {
    ctx.save(); ctx.translate(cx, ty - 120); ctx.rotate(t * 0.4);
    for (let i = 0; i < 14; i++) { ctx.rotate(TAU / 14); ctx.fillStyle = 'rgba(245,195,59,0.13)'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-40, -520 * Math.min(1, kt)); ctx.lineTo(40, -520 * Math.min(1, kt)); ctx.closePath(); ctx.fill(); }
    ctx.restore();
    ctx.save(); shake(ctx, B(t), B(tW), 14, 9, 0.22); trophy(ctx, cx, ty + 60, 0.95, kt, '1'); ctx.restore();
    stamp(ctx, '1-ci YER', cx, ty + 185, 70, pop(t, tW + 0.12), { rot: -0.05 });
  }
}

// ---------------------------------------------------------------- B: Azərbaycan filmi Haaqada qalib oldu
function sWin(ctx, t) {
  hall(ctx, t);
  const tS = T('Azərbaycan') - 0.02;
  const open = t < tS - 0.25 ? 1 : 1 - E.inCubic(prog(t, tS - 0.25, tS));
  const kc = Math.min(1.05, sp(t, S.B - 0.25, SPRING.bouncy));
  ctx.save(); shake(ctx, B(t), B(tS), 10, 4, 0.18);
  clapper(ctx, cx, s.y + 790, 700, open + 0.05 * M.wobble(t - tS, 4, 8), kc, (c, w, h) => {
    text(c, 'AZƏRBAYCAN', -w / 2 + 40, -h / 2 + 100, font(66, 800, D), C.chalk, 'left');
    text(c, 'QISA FİLM', -w / 2 + 40, -h / 2 + 160, font(40, 800, UI), C.mute, 'left');
    text(c, 'FESTİVAL', -w / 2 + 40, h / 2 - 120, font(30, 800, UI), C.mute, 'left');
    text(c, 'HAAQA 2026', -w / 2 + 40, h / 2 - 60, font(46, 800, UI), C.chalk, 'left');
    text(c, 'YER', 40, h / 2 - 120, font(30, 800, UI), C.mute, 'left');
    text(c, t >= T('qalib') ? '1' : '?', w / 4, h / 2 - 50, font(110, 800, D), C.gold, 'center');
  });
  ctx.restore();
  flagAZ(ctx, cx + 230, s.y + 290, 190, pop(t, T('filmi') - 0.06), 0.06 * Math.sin(t * 4));
  const kp = pop(t, T('Haaqada') - 0.08);
  if (kp > 0) { const py = s.y + 300 - (1 - Math.min(1, kp)) * 200;
    ctx.save(); ctx.translate(cx - 200, py); ctx.scale(kp, kp);
    ctx.beginPath(); ctx.moveTo(0, 60); ctx.bezierCurveTo(-70, -10, -60, -90, 0, -90); ctx.bezierCurveTo(60, -90, 70, -10, 0, 60); ctx.fillStyle = '#E8384F'; ctx.fill(); outline(ctx, 6);
    ctx.beginPath(); ctx.arc(0, -40, 22, 0, TAU); ctx.fillStyle = C.chalk; ctx.fill(); ctx.restore();
    chip(ctx, 'HAAQA · NİDERLAND', cx - 150, s.y + 395, 36, kp, { bg: C.chalk, rot: -0.03 }); }
  const kq = pop(t, T('qalib') - 0.04);
  stamp(ctx, 'QALİB!', cx + 40, s.y + 1045, 96, kq, { rot: -0.08 });
  if (t > T('qalib')) for (let i = 0; i < 34; i++) { const tq = T('qalib'), q = prog(t, tq + hash01(i, 2) * 0.25, tq + 1.4 + hash01(i, 2) * 0.3); if (q <= 0 || q >= 1) continue;
    const a = -Math.PI / 2 + (hash01(i, 3) - 0.5) * 2.8, v = 420 + 380 * hash01(i, 4);
    const x = cx + Math.cos(a) * v * q, y = s.y + 1050 + Math.sin(a) * v * q + 760 * q * q;
    ctx.save(); ctx.translate(x, y); ctx.rotate(q * 9 * (hash01(i, 5) - 0.5)); ctx.globalAlpha = 1 - q;
    ctx.fillStyle = ['#00B5E2', '#EF3340', '#509E2F', C.gold][i % 4]; ctx.fillRect(-11, -6, 22, 12); ctx.restore(); }
}

// ---------------------------------------------------------------- C+D: 503 submissions → 63 selected, 23 countries
const COLS = 23, N = 503, CELL = 36;
const GX0 = cx - (COLS * CELL) / 2 + CELL / 2, GY0 = s.y + 380;
const ORDER = Array.from({ length: N }, (_, i) => i).sort((a, b) => hash01(a, 31) - hash01(b, 31));
const PICK = new Set(ORDER.slice(0, 63));
const PICKL = ORDER.slice(0, 63).sort((a, b) => a - b);
function marquee(ctx, t, x, y, w, h, label) {
  ctx.save(); ctx.translate(x, y);
  rrect(ctx, -w / 2, -h / 2, w, h, 18); ctx.fillStyle = '#1A0B10'; ctx.fill(); outline(ctx, 7, C.gold);
  const n = 22; for (let i = 0; i < n; i++) { const on = (Math.floor(t * 8) + i) % 3 !== 0;
    const px = -w / 2 + 14 + (i / (n - 1)) * (w - 28); [-h / 2 + 12, h / 2 - 12].forEach((py) => { ctx.beginPath(); ctx.arc(px, py, 6, 0, TAU); ctx.fillStyle = on ? '#FFE08A' : '#5A4420'; ctx.fill(); }); }
  label(ctx);
  ctx.restore();
}
function globe(ctx, x, y, r, t, nPins, tPins) {
  ctx.save(); ctx.translate(x, y);
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fillStyle = '#1F4E7A'; ctx.fill();
  ctx.save(); ctx.clip();
  const rot = t * 0.4;
  ctx.fillStyle = '#3E8E5A';
  [[-0.35, -0.3, 0.32, 0.22], [0.25, -0.25, 0.28, 0.3], [0.1, 0.35, 0.22, 0.18], [-0.5, 0.3, 0.18, 0.2]].forEach(([a, b, w, h], i) => {
    const sx = ((a + rot * 0.15 + 1.5) % 2) - 0.75; ctx.beginPath(); ctx.ellipse(sx * r * 1.3, b * r, w * r, h * r, i, 0, TAU); ctx.fill(); });
  ctx.strokeStyle = 'rgba(255,255,255,0.28)'; ctx.lineWidth = 3;
  for (let i = -2; i <= 2; i++) { ctx.beginPath(); ctx.ellipse(0, 0, r, r * Math.abs(i) * 0.3 + 0.01, 0, 0, TAU); ctx.stroke(); }
  for (let i = 0; i < 4; i++) { const ph = ((rot + i * Math.PI / 2) % TAU), ex = Math.cos(ph) * r; ctx.beginPath(); ctx.ellipse(0, 0, Math.abs(ex) + 0.01, r, 0, 0, TAU); ctx.stroke(); }
  ctx.restore();
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); outline(ctx, 7);
  for (let i = 0; i < nPins; i++) { const k = pop(t, tPins + i * 0.03); if (k <= 0) continue;
    const a = hash01(i, 41) * TAU, d = Math.sqrt(hash01(i, 42)) * r * 0.82, px = Math.cos(a) * d, py = Math.sin(a) * d;
    ctx.save(); ctx.translate(px, py); ctx.scale(k, k); ctx.beginPath(); ctx.arc(0, -16, 13, 0, TAU); ctx.fillStyle = i === 0 ? '#EF3340' : C.gold; ctx.fill(); outline(ctx, 3);
    ctx.beginPath(); ctx.moveTo(0, -4); ctx.lineTo(0, 6); ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.stroke(); ctx.restore(); }
  ctx.restore();
}
function sGrid(ctx, t) {
  hall(ctx, t);
  const nFill = Math.floor(N * E.inCubic(prog(t, G_FILL0, G_FILL1)) * 0.6 + N * 0.4 * prog(t, G_FILL0, G_FILL1));
  const cull = prog(t, G_CULL, G_CULL + 0.7), gather = E.inOutCubic(prog(t, G_GATHER, G_GATHER + 0.55));
  const shrink = E.inOutCubic(prog(t, T('iyirmi') - 0.15, T('iyirmi') + 0.35));
  const km = Math.min(1.05, sp(t, S.C - 0.2, SPRING.bouncy));
  if (km > 0) { ctx.save(); ctx.translate(cx, s.y + 255); ctx.scale(km, km);
    marquee(ctx, t, 0, 0, 760, 150, (c) => {
      if (t < T('beş') - 0.05) { text(c, 'HAAQA', 0, -8, font(58, 800, D), C.gold, 'center'); text(c, 'FİLM FESTİVALI · 2026', 0, 42, font(34, 800, UI), C.chalk, 'center'); }
      else if (t < G_GATHER) { const v = Math.round(N * E.outCubic(prog(t, T('beş') - 0.05, T('göndərildi.') + 0.05)));
        const bp = t >= T('göndərildi.') ? 1 + 0.25 * Math.exp(-(t - T('göndərildi.')) * 7) : 1;
        c.save(); c.scale(bp, bp); text(c, `${v}`, -80, 34, font(100, 800, D), C.gold, 'center'); text(c, 'FİLM', 140, 24, font(52, 800, UI), C.chalk, 'center'); c.restore(); }
      else if (t < T('iyirmi') - 0.05) { const bp = t > T('seçildi,') ? 1 + 0.25 * Math.exp(-(t - T('seçildi,')) * 7) : 1;
        c.save(); c.scale(bp, bp); text(c, '63', -150, 34, font(100, 800, D), C.gold, 'center'); text(c, 'SEÇİLDİ', 110, 24, font(52, 800, UI), C.chalk, 'center'); c.restore(); }
      else { text(c, '63 FİLM', -160, 24, font(62, 800, D), C.gold, 'center'); text(c, '23 ÖLKƏ', 170, 24, font(62, 800, D), C.chalk, 'center'); }
    });
    ctx.restore(); }
  const bx = cx, by = lerp(s.y + 690, s.y + 560, shrink), bc = lerp(78, 50, shrink);
  for (let j = 0; j < nFill; j++) {
    const i = ORDER[(j * 7) % N];
    const col = i % COLS, row = Math.floor(i / COLS);
    let x = GX0 + col * CELL, y = GY0 + row * CELL;
    const tj = G_FILL0 + (j / N) * (G_FILL1 - G_FILL0), appear = prog(t, tj, tj + 0.18);
    if (!PICK.has(i)) {
      if (cull >= 1) continue;
      const drop = E.inCubic(clamp(cull * 1.6 - hash01(i, 33) * 0.6));
      y += drop * 900; x += (hash01(i, 34) - 0.5) * 200 * drop;
      frame(ctx, x, y, 30 * lerp(1.6, 1, E.outBack(appear)), 1, { win: C.panel2, alpha: (1 - drop) * (cull > 0 ? 0.55 : 1), rot: drop * 3 * (hash01(i, 35) - 0.5) });
    } else {
      const pi = PICKL.indexOf(i), tc = pi % 9, tr = Math.floor(pi / 9);
      const tx = bx - 4 * bc + tc * bc, tyy = by - 3 * bc + tr * bc;
      x = lerp(x, tx, gather); y = lerp(y, tyy, gather);
      const lit = cull > 0;
      frame(ctx, x, y, lerp(30, bc * 0.86, gather) * lerp(1.6, 1, E.outBack(appear)), 1, { col: lit ? C.gold : C.chalk, win: lit ? '#3A2A10' : C.panel2 });
    }
  }
  chip(ctx, 'GÖNDƏRİLDİ', cx + 250, s.y + 1180, 40, pop(t, T('göndərildi.') - 0.05) * (1 - prog(t, G_CULL, G_CULL + 0.2)), { bg: C.chalk, rot: 0.05 });
  const kg = pop(t, T('iyirmi') - 0.1);
  if (kg > 0) { ctx.save(); ctx.translate(cx, s.y + 990); ctx.scale(kg, kg); globe(ctx, 0, 0, 170, t, 23, T('iyirmi') + 0.02); ctx.restore();
    chip(ctx, '23 ÖLKƏ', cx + 260, s.y + 1110, 44, pop(t, T('ölkədən.') - 0.05), { bg: C.gold, rot: -0.05 }); }
}

// ---------------------------------------------------------------- E: main category final — 4 films
function sFinal(ctx, t) {
  hall(ctx, t, { spot: 0.6 });
  chip(ctx, 'ƏSAS KATEQORİYA', cx, s.y + 250, 56, pop(t, T('Əsas') - 0.05), { bg: C.gold, rot: -0.03 });
  const kn = pop(t, T('kateqoriyada') + 0.1);
  if (kn > 0) { ctx.save(); ctx.translate(cx, s.y + 370); ctx.scale(kn, kn);
    text(ctx, '“Qlobal sülh, harmoniya', 0, 0, font(40, 700, UI), C.chalk, 'center'); text(ctx, 'və insan haqları”', 0, 50, font(40, 700, UI), C.chalk, 'center'); ctx.restore(); }
  stamp(ctx, 'FİNAL', cx, s.y + 540, 70, pop(t, T('finala') - 0.05), { bg: C.chalk, rot: 0.04 });
  // the 63 selected films arrive; on "finala" 59 drop away, 4 fly to the poster spots
  const k63 = sp(t, S.E - 0.1, SPRING.snappy), drop = prog(t, T('finala') - 0.05, T('finala') + 0.5), fly = E.inOutCubic(prog(t, T('finala') + 0.05, T('dörd') - 0.05));
  const SURV = [5, 22, 40, 57];
  if (k63 > 0 && t < T('dörd') + 0.4) for (let i = 0; i < 63; i++) {
    const c = i % 9, r = Math.floor(i / 9); let x = cx - 4 * 70 + c * 70, y = s.y + 690 + r * 66 + (1 - Math.min(1, k63)) * 600;
    const si = SURV.indexOf(i);
    if (si < 0) { const d = E.inCubic(clamp(drop * 1.5 - hash01(i, 51) * 0.5)); if (d >= 1) continue;
      frame(ctx, x + (hash01(i, 52) - 0.5) * 160 * d, y + d * 800, 56, 1, { col: C.gold, win: '#3A2A10', alpha: 1 - d, rot: d * 2 * (hash01(i, 53) - 0.5) }); }
    else { const px = cx - 315 + si * 210, py = s.y + 930; const fade = 1 - prog(t, T('dörd') - 0.04 + si * 0.12, T('dörd') + 0.1 + si * 0.12);
      frame(ctx, lerp(x, px, fly), lerp(y, py, fly), lerp(56, 110, fly), 1, { col: C.gold, win: '#3A2A10', alpha: fade }); }
  }
  for (let i = 0; i < 4; i++) {
    const k = Math.min(1.04, sp(t, T('dörd') - 0.04 + i * 0.12, SPRING.bouncy));
    const x = cx - 315 + i * 210, y = s.y + 930 + (1 - Math.min(1, k)) * 500;
    if (t < T('dörd') - 0.04 + i * 0.12) continue;
    poster(ctx, x, y, 180, Math.min(1, 0.5 + k * 0.5), { rot: (i - 1.5) * 0.04, t });
    chip(ctx, `${i + 1}`, x, y + 160, 40, pop(t, T('dörd') + 0.08 + i * 0.12), { bg: C.gold, rot: 0 });
  }
}

// ---------------------------------------------------------------- F: 13 jurors, unanimous → the Azerbaijani short film
function sJury(ctx, t) {
  const tA = T('Azərbaycanın') - 0.08;
  hall(ctx, t, { spot: prog(t, tA, tA + 0.4) });
  const pick = E.inOutCubic(prog(t, tA, tA + 0.5));
  for (let i = 0; i < 4; i++) {
    const az = i === 2, k = Math.min(1.04, sp(t, S.F - 0.1 + i * 0.05, SPRING.snappy));
    let x = cx - 315 + i * 210, y = s.y + 470, w = 170;
    if (az) { x = lerp(x, cx, pick); y = lerp(y, s.y + 480, pick); w = lerp(150, 240, pick); }
    else { y += pick * 40; }
    poster(ctx, x, y, w, k, { az: az && pick > 0.3, dim: az ? 0 : pick, rot: az ? lerp(0.03, 0, pick) : (i - 1.5) * 0.04, t });
  }
  chip(ctx, 'QISA FİLM', cx + 250, s.y + 330, 40, pop(t, T('qısa') - 0.05), { bg: C.gold, rot: 0.06 });
  const ty = s.y + 1020;
  const row = [];
  for (let i = 0; i < 13; i++) { const back = i % 2 === 1; row.push({ i, x: s.x + 40 + (i / 12) * (s.w - 80), y: back ? ty - 70 : ty, sc: back ? 0.52 : 0.6 }); }
  row.filter((r) => r.y !== ty).concat(row.filter((r) => r.y === ty)).forEach((r) => {
    const k = sp(t, JURY_IN + (r.i % 5) * 0.12 + Math.floor(r.i / 5) * 0.04, SPRING.bouncy);
    const yes = prog(t, JURY_YES + r.i * JURY_GAP, JURY_YES + r.i * JURY_GAP + 0.25);
    juror(ctx, r.x, r.y, r.sc, k, yes, r.i);
  });
  rrect(ctx, s.x - 30, ty - 4, s.w + 60, 110, 12); ctx.fillStyle = '#3B1A12'; ctx.fill(); outline(ctx, 6);
  ctx.fillStyle = C.gold2; ctx.fillRect(s.x - 30, ty + 10, s.w + 60, 6);
  const nYes = Array.from({ length: 13 }, (_, i) => t >= JURY_YES + i * JURY_GAP + 0.1).filter(Boolean).length;
  text(ctx, `MÜNSİFLƏR  ${nYes}/13`, cx, ty + 70, font(44, 800, UI), nYes === 13 ? C.gold : C.chalk, 'center');
  stamp(ctx, 'YEKDİLLİKLƏ', cx, s.y + 720, 62, pop(t, JURY_YES + 13 * JURY_GAP) * (1 - prog(t, tA - 0.1, tA + 0.1)), { bg: C.green, rot: -0.05 });
  const k1 = pop(t, F1 - 0.04);
  if (k1 > 0) { trophy(ctx, cx + 270, s.y + 760, 0.4, k1, '1'); stamp(ctx, '1-ci YER', cx - 110, s.y + 720, 66, k1, { rot: -0.06 }); }
}

// ---------------------------------------------------------------- G: twist — 7th international success this year
function sTwist(ctx, t) {
  hall(ctx, t, { spot: 0.4 });
  const kq = pop(t, T('maraqlısı:') - 0.05) * (1 - prog(t, T('bu,') - 0.15, T('bu,') + 0.05));
  if (kq > 0) { ctx.save(); ctx.translate(cx, s.y + 640); ctx.scale(kq, kq); ctx.rotate(-0.06 + 0.04 * Math.sin(t * 6));
    ctx.beginPath(); ctx.arc(0, 0, 200, 0, TAU); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 8);
    text(ctx, '?!', 0, 80, font(230, 800, D), C.ink, 'center'); ctx.restore(); }
  chip(ctx, 'ƏN MARAQLISI', cx, s.y + 330, 50, pop(t, T('Ən') - 0.03), { bg: C.chalk, rot: -0.04 });
  const pos = [[-300, 560], [-100, 560], [100, 560], [300, 560], [-200, 760], [0, 760], [200, 760]];
  LAUREL_T.forEach((lt, i) => {
    if (i === 6) return;
    const [dx, dy] = pos[i];
    laurel(ctx, cx + dx, s.y + dy, 80, pop(t, lt - 0.04), `${i + 1}`, { col: C.chalk });
  });
  const k7 = pop(t, LAUREL_T[6] - 0.04);
  if (k7 > 0) { const z = Math.exp(Math.log(2.2) * (1 - Math.min(1, k7)));
    ctx.save(); shake(ctx, B(t), B(LAUREL_T[6]), 12, 7, 0.22);
    laurel(ctx, cx + 200, s.y + 760, 80 * z, Math.min(1.05, k7), '7', { lit: true }); ctx.restore();
    big(ctx, '7-ci', cx, s.y + 970, 140, C.gold, pop(t, LAUREL_T[6] + 0.1), { rot: -0.04, sw: 0.06 }); }
  chip(ctx, '2026-cı İL', cx - 250, s.y + 1085, 42, pop(t, T('bu') - 0.05), { bg: C.chalk, rot: -0.05 });
  chip(ctx, 'BEYNƏLXALQ UĞUR', cx + 170, s.y + 1085, 42, pop(t, T('beynəlxalq') - 0.05), { bg: C.gold, rot: 0.04 });
}

// ---------------------------------------------------------------- H: end card
function envelope(ctx, x, y, w) {
  const h = w * 0.68; ctx.save(); ctx.translate(x, y);
  rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 4);
  ctx.beginPath(); ctx.moveTo(-w / 2 + 3, -h / 2 + 3); ctx.lineTo(0, h * 0.08); ctx.lineTo(w / 2 - 3, -h / 2 + 3); outline(ctx, 4); ctx.restore();
}
function sEnd(ctx, t) {
  hall(ctx, t, { spot: 0.3 });
  const t0 = S.H;
  reel(ctx, cx, s.y + 450, 140, (t - t0) * 2.4, pop(t, t0 - 0.2));
  text(ctx, '@bilirdinizmi_az', cx, s.y + 700, font(76, 800, D), C.chalk, 'center');
  const kB = pop(t, T('Bəyən') - 0.05), kI = pop(t, T('izlə') - 0.05);
  if (kB > 0) { ctx.save(); ctx.translate(cx - 215, s.y + 870); ctx.scale(kB, kB); ctx.rotate(-0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 6);
    const hb = 1 + 0.12 * Math.max(0, Math.sin((t - T('Bəyən')) * 9)) * Math.exp(-(t - T('Bəyən')) * 2);
    ctx.save(); ctx.translate(-110, 4); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30);
    ctx.fillStyle = '#E8384F'; ctx.fill(); ctx.restore();
    text(ctx, 'BƏYƏN', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  if (kI > 0) { ctx.save(); ctx.translate(cx + 215, s.y + 870); ctx.scale(kI, kI); ctx.rotate(0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 6);
    ctx.save(); ctx.translate(-115, 4); ctx.lineWidth = 12; ctx.strokeStyle = C.ink; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'İZLƏ', 40, 24, font(64, 800, D), C.ink, 'center'); ctx.restore(); }
  chip(ctx, 'hər gün bilmədiyin bir fakt', cx, s.y + 1040, 48, pop(t, T('hər') - 0.05), { bg: C.panel, fg: C.chalk, edge: C.gold, rot: -0.02 });
  const kS = pop(t, T('fakt!') + 0.25);
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 1180); ctx.scale(kS, kS);
    const msg = 'Kino sevən dostuna göndər';
    ctx.font = font(46, 800, UI); const w = ctx.measureText(msg).width + 150;
    rrect(ctx, -w / 2, -48, w, 96, 30); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 5);
    envelope(ctx, -w / 2 + 62, 0, 62); text(ctx, msg, 38, 16, font(46, 800, UI), C.ink, 'center'); ctx.restore(); }
}

// ---------------------------------------------------------------- captions (word by word, top)
function captions(ctx, t) {
  const L = TIMING.lines; const li = L.findIndex((l, i) => t >= l.t0 - 0.05 && t < (L[i + 1] ? L[i + 1].t0 - 0.05 : END)); if (li < 0) return;
  const all = L[li].words.filter((w) => w.w !== '—'), ws = all.filter((w) => t >= w.t - 0.03); if (!ws.length) return;
  const start = Math.floor((ws.length - 1) / 3) * 3, chunk = all.slice(start, start + 3), shown = ws.slice(start);
  let size = 92; const gap = 34;
  const meas = (sz) => { ctx.font = font(sz, 800, D); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 30) { size = Math.floor(size * (s.w - 30) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 100;
  shown.forEach((w, i) => { const k = sp(t, w.t - 0.03, SPRING.bouncy), sc = Math.min(1.1, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.2; ctx.strokeStyle = C.ink; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.gold : '#FFFFFF'; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 700, UI), font(40, 600, UI)],
  hits: HITS,
  draw(ctx, u, t) {
    if (t < S.B + 0.2) whip(ctx, t, S.B, () => sHook(ctx, t), () => sWin(ctx, t));
    else if (t < S.C + 0.2) whip(ctx, t, S.C, () => sWin(ctx, t), () => sGrid(ctx, t));
    else if (t < S.E + 0.2) whip(ctx, t, S.E, () => sGrid(ctx, t), () => sFinal(ctx, t));
    else if (t < S.F + 0.2) whip(ctx, t, S.F, () => sFinal(ctx, t), () => sJury(ctx, t));
    else if (t < S.G + 0.2) whip(ctx, t, S.G, () => sJury(ctx, t), () => sTwist(ctx, t));
    else whip(ctx, t, S.H, () => sTwist(ctx, t), () => sEnd(ctx, t), 0.36);
    if (t < S.H - 0.2) bug(ctx, t);
    captions(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 300; i++) { ctx.fillStyle = `rgba(255,255,240,${0.02 + 0.03 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
