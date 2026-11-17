// "28 ildə 3 qol" — @bilirdinizmi_az 18:30 animated reel, 17 Nov 2026. Pure function of time.
// Friendly Andorra 1-3 Azerbaijan, Encamp, Mon 16 Nov 2026 (3' Əhmədov, 47' Qurbanlı, 55' Andorra, 70' Bayramov pen).
// Before: 5 meetings 1998–2016, 3 goals total (four 0:0, 2008 Andorra 1:2 AZ). Captain Emin Mahmudov's last international.
// Arif voice (ElevenLabs) on audio/vo.wav; every word/number timed to Scribe word starts. Night stadium world, players as
// silhouettes with name plates (rule 1g). No music; soft SFX only.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = __TIMING__;
const C = {
  night: '#07101F', night2: '#10244A', grass: '#1E8A43', grass2: '#23A04F', line: 'rgba(255,255,255,0.75)', chalk: '#F6F3EA',
  gold: '#F5C33B', gold2: '#C9921C', ink: '#070B18', panel: '#0E1A36', panel2: '#1B2E5A', mute: '#9FB0D6', sil: '#04060D',
  green: '#3DDC84', red: '#E23B3B', grey: '#5B6680',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));

const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const END = TIMING.dur + 1.3;
const S = { A: 0, B: T('Azərbaycan') - 0.12, C: T('Dünən') - 0.12, D: T('Hesab') - 0.12, E: T('Bu,') - 0.12, F: T('Bir') - 0.12, G: T('Bəyən') - 0.12 };
const B = (t) => t / 0.5;
// goal moments last night (ball crosses the line)
const G1 = T('qol') + 0.05, G2 = T('Qurbanlı') + 0.3, GA = T('və', 1) - 0.05, G3 = T('Bayramov') + 0.35;
const GOALS = [G1, G2, GA, G3];
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.3, from, to }];

const HITS = [
  [B(0.02), '28 İL', 'thud'], [B(T('ildə')), 'years tick', 'type', { len: 0.4, n: 5 }],
  [B(T('üç') + 0.12), 'ball 1', 'thud'], [B(T('üç') + 0.27), 'ball 2', 'thud'], [B(T('üç') + 0.42), 'ball 3', 'thud'], [B(T('qol!') + 0.1), 'CƏMİ 3 QOL', 'click'],
  WH(S.B, 600, 2200), [B(T('Azərbaycan')), 'AZ flag', 'click'], [B(T('Andorra')), 'AND flag', 'click'],
  ...[0, 1, 2, 3, 4].map((i) => [B(T('beş') + i * 0.09), `card ${i + 1}`, 'tick']),
  ...[0, 1, 3, 4].map((i, j) => [B(T('Dörd') + 0.05 + j * 0.16), `0:0 ${i}`, 'click']), [B(T('sıfır-sıfır') + 0.05), '1:2 card', 'tick'],
  [B(T('bitib.')), 'CƏMİ 3 QOL', 'thud'],
  WH(S.C, 2200, 600), [B(T('yoldaşlıq')), 'friendly chip', 'click'], [B(T('Eşqin')), 'Əhmədov plate', 'click'], [B(T('üçüncü')), "3'", 'tick'],
  [B(G1 - 0.3), 'kick 1', 'whoosh', { len: 0.3, from: 500, to: 1800 }], [B(G1), 'GOAL 0:1', 'thud'],
  [B(T('Musa')), 'Qurbanlı plate', 'click'], [B(G2 - 0.3), 'kick 2', 'whoosh', { len: 0.3, from: 500, to: 1800 }], [B(G2), 'GOAL 0:2', 'thud'],
  [B(GA), "55' Andorra 1:2", 'tick'], [B(T('Toral')), 'Bayramov plate', 'click'],
  [B(G3 - 0.3), 'kick 3', 'whoosh', { len: 0.3, from: 500, to: 1800 }], [B(G3), 'GOAL 1:3', 'thud'],
  WH(S.D, 600, 2200), [B(T('üç-bir!')), '1 : 3 slam', 'thud'],
  WH(S.E, 2200, 600), [B(T('kapitan')), 'armband', 'click'], [B(T('Emin')), 'name plate', 'click'], [B(T('son')), 'SON OYUN', 'thud'],
  WH(S.F, 600, 2200), ...[0, 1, 2, 3].map((i) => [B(T('dörd') + i * 0.12), `night ball ${i + 1}`, 'thud']),
  ...[0, 1, 2].map((i) => [B(T('beş', 1) + i * 0.12), `old ball ${i + 1}`, 'tick']), [B(T('çox!')), '4 > 3', 'thud'],
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
function chip(ctx, label, x, y, size, k, { bg = C.gold, fg = C.ink, rot = -0.04, edge = C.ink, fam = UI, wt = 800 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, fam); const w = ctx.measureText(label).width + size * 1.0, h = size * 1.55;
  rrect(ctx, -w / 2, -h / 2, w, h, h * 0.3); ctx.fillStyle = bg; ctx.fill(); outline(ctx, 5, edge);
  text(ctx, label, 0, size * 0.36, font(size, wt, fam), fg, 'center'); ctx.restore();
}
function whip(ctx, t, t0, a, b, dur = 0.3) {
  const p = E.inOutCubic(prog(t, t0 - dur * 0.55, t0 + dur * 0.45));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(-p * W, 0); a(); ctx.restore(); ctx.save(); ctx.translate((1 - p) * W, 0); b(); ctx.restore();
}
// classic black-and-white football
function ball(ctx, x, y, r, rot = 0, k = 1, { dim = false } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(rot);
  if (dim) ctx.globalAlpha *= 0.25;
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); ctx.fillStyle = '#FFFFFF'; ctx.fill();
  ctx.save(); ctx.clip();
  const pent = (px, py, pr, a0) => { ctx.beginPath(); for (let i = 0; i < 5; i++) { const a = a0 + (i / 5) * TAU; ctx.lineTo(px + Math.cos(a) * pr, py + Math.sin(a) * pr); } ctx.closePath(); ctx.fillStyle = '#15171C'; ctx.fill(); };
  pent(0, 0, r * 0.36, -Math.PI / 2);
  ctx.strokeStyle = '#15171C'; ctx.lineWidth = Math.max(2, r * 0.06);
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i / 5) * TAU, ao = a + Math.PI / 5;
    ctx.beginPath(); ctx.moveTo(Math.cos(a) * r * 0.36, Math.sin(a) * r * 0.36); ctx.lineTo(Math.cos(a) * r * 0.7, Math.sin(a) * r * 0.7); ctx.stroke();
    pent(Math.cos(ao) * r * 1.02, Math.sin(ao) * r * 1.02, r * 0.36, ao);
  }
  ctx.fillStyle = 'rgba(0,0,0,0.12)'; ctx.beginPath(); ctx.arc(r * 0.25, r * 0.25, r, 0, TAU); ctx.arc(r * 0.05, r * 0.05, r * 0.98, 0, TAU, true); ctx.fill();
  ctx.restore();
  ctx.beginPath(); ctx.arc(0, 0, r, 0, TAU); outline(ctx, Math.max(3, r * 0.08));
  ctx.restore();
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
// Andorra: blue / yellow / red vertical, simplified shield in the middle
function flagAND(ctx, x, y, w, k, wave = 0) {
  if (k <= 0) return; const h = w / 1.43;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(wave);
  ctx.save(); rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.clip();
  ctx.fillStyle = '#10069F'; ctx.fillRect(-w / 2, -h / 2, w * 0.31, h); ctx.fillStyle = '#FEDF00'; ctx.fillRect(-w / 2 + w * 0.31, -h / 2, w * 0.38, h);
  ctx.fillStyle = '#D50032'; ctx.fillRect(w / 2 - w * 0.31, -h / 2, w * 0.31, h);
  const sw = w * 0.16, sh = h * 0.42;
  ctx.beginPath(); ctx.moveTo(-sw / 2, -sh / 2); ctx.lineTo(sw / 2, -sh / 2); ctx.lineTo(sw / 2, sh * 0.15); ctx.quadraticCurveTo(sw / 2, sh / 2, 0, sh / 2); ctx.quadraticCurveTo(-sw / 2, sh / 2, -sw / 2, sh * 0.15); ctx.closePath();
  ctx.fillStyle = '#C8102E'; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = '#8A5A00'; ctx.stroke();
  ctx.fillStyle = '#FEDF00'; ctx.fillRect(-sw / 2 + 3, -sh / 2 + 3, sw / 2 - 3, sh * 0.32); ctx.fillRect(1, sh * 0.0, sw / 2 - 4, sh * 0.28);
  ctx.restore();
  rrect(ctx, -w / 2, -h / 2, w, h, 6); outline(ctx, 5); ctx.restore();
}
// footballer silhouette (public figure → dark outline only, no face).
// kick 0 = leg back, 1 = follow-through; arm 0 = down, 1 = right arm up. armband = captain band on left arm.
function player(ctx, x, y, sc, { kick = -1, arm = 0, alpha = 1, rim = 'rgba(245,195,59,0.85)', col = C.sil, flip = 1, lean = 0, armband = 0 } = {}) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc * flip, sc); ctx.rotate(lean); ctx.globalAlpha *= alpha; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // leg geometry
  const hipL = [-28, -360], hipR = [28, -360];
  let thR, shR; // angles from straight down (positive = forward, +x)
  if (kick < 0) { thR = 0.12; shR = 0.05; } else { thR = lerp(-0.7, 1.15, kick); shR = lerp(-1.9, 1.35, E.inCubic(kick)); }
  const kneeR = [hipR[0] + Math.sin(thR) * 180, hipR[1] + Math.cos(thR) * 180], footR = [kneeR[0] + Math.sin(shR) * 175, kneeR[1] + Math.cos(shR) * 175];
  const kneeL = [-40, -180], footL = [-48, 0];
  const shape = (extra, c) => {
    ctx.strokeStyle = c; ctx.fillStyle = c;
    const limb = (pts, w) => { ctx.lineWidth = w + extra; ctx.beginPath(); pts.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py))); ctx.stroke(); };
    limb([hipL, kneeL, footL], 58); limb([footL, [footL[0] - 34, footL[1] + 2]], 34);
    limb([hipR, kneeR, footR], 58); limb([footR, [footR[0] + 34 * Math.cos(shR), footR[1] - 34 * Math.sin(shR) * 0.3]], 34);
    // shorts
    ctx.lineWidth = extra || 1; ctx.beginPath(); ctx.moveTo(-82, -470); ctx.lineTo(82, -470); ctx.lineTo(96, -330); ctx.lineTo(4, -320); ctx.lineTo(-4, -320); ctx.lineTo(-96, -330); ctx.closePath(); ctx.fill(); if (extra) ctx.stroke();
    // shirt torso
    ctx.beginPath(); ctx.moveTo(-108, -735); ctx.quadraticCurveTo(0, -760, 108, -735); ctx.lineTo(86, -455); ctx.lineTo(-86, -455); ctx.closePath(); ctx.fill(); if (extra) ctx.stroke();
    // arms: left out for balance, right raised by `arm`
    limb([[-100, -715], [-180, -600], [-215, -485]], 44);
    const ex = lerp(170, 175, arm), ey = lerp(-610, -840, arm), hx = lerp(200, 140, arm), hy = lerp(-490, -980, arm);
    limb([[100, -715], [ex, ey], [hx, hy]], 44);
    // neck + head (no features) + hair
    limb([[0, -750], [0, -785]], 50);
    ctx.beginPath(); ctx.ellipse(0, -845, 52 + extra / 2, 62 + extra / 2, 0, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.ellipse(0, -880, 55 + extra / 2, 34 + extra / 2, 0, Math.PI, TAU); ctx.fill();
  };
  shape(12, rim); shape(0, col);
  // collar line reads as a football shirt
  ctx.strokeStyle = 'rgba(245,195,59,0.5)'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-34, -748); ctx.lineTo(0, -712); ctx.lineTo(34, -748); ctx.stroke();
  if (armband > 0) { ctx.save(); ctx.translate(-150, -650); ctx.rotate(0.95); ctx.scale(armband, armband);
    rrect(ctx, -40, -24, 80, 48, 8); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 5);
    ctx.rotate(-0.95); text(ctx, 'C', 0, 14, font(40, 800, D), C.ink, 'center'); ctx.restore(); }
  ctx.restore();
  return footR;
}
function namePlate(ctx, name, role, x, y, k, rot = -0.03) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(56, 800, UI); const w = Math.max(ctx.measureText(name).width, 300) + 80;
  rrect(ctx, -w / 2, -62, w, 146, 18); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 6, C.gold);
  text(ctx, name, 0, 0, font(56, 800, UI), C.chalk, 'center', 1);
  text(ctx, role, 0, 60, font(46, 800, UI), C.gold, 'center');
  ctx.restore();
}
function net(ctx, x, y, w, h, bulge = 0) {
  ctx.save(); ctx.translate(x, y);
  ctx.strokeStyle = 'rgba(255,255,255,0.42)'; ctx.lineWidth = 3;
  for (let i = 0; i <= 12; i++) { const xx = -w / 2 + (i / 12) * w; ctx.beginPath(); ctx.moveTo(xx, -h);
    ctx.quadraticCurveTo(xx + bulge * 30 * Math.sin((i / 12) * Math.PI), -h / 2, xx, 0); ctx.stroke(); }
  for (let j = 0; j <= 8; j++) { const yy = -h + (j / 8) * h; ctx.beginPath(); ctx.moveTo(-w / 2, yy);
    ctx.quadraticCurveTo(0, yy + bulge * 40 * Math.sin((j / 8) * Math.PI), w / 2, yy); ctx.stroke(); }
  ctx.lineWidth = 16; ctx.strokeStyle = '#FFFFFF'; ctx.lineCap = 'square';
  ctx.beginPath(); ctx.moveTo(-w / 2, 0); ctx.lineTo(-w / 2, -h); ctx.lineTo(w / 2, -h); ctx.lineTo(w / 2, 0); ctx.stroke();
  ctx.lineWidth = 4; ctx.strokeStyle = C.ink; ctx.beginPath(); ctx.moveTo(-w / 2 - 8, 0); ctx.lineTo(-w / 2 - 8, -h - 8); ctx.lineTo(w / 2 + 8, -h - 8); ctx.lineTo(w / 2 + 8, 0); ctx.stroke();
  ctx.restore();
}

// ---------------------------------------------------------------- world: night stadium + pitch
function stadium(ctx, t) {
  fill(ctx, C.night);
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#040913'); g.addColorStop(0.45, C.night2); g.addColorStop(1, '#050B14');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const top = s.y + 820, bot = H + 40, drift = Math.sin(t * 0.6) * 30;
  // stands: rows of crowd dots behind the pitch
  for (let r = 0; r < 4; r++) for (let i = 0; i < 46; i++) {
    const xx = (i / 45) * (W + 80) - 40 + (r % 2) * 12 + drift * 0.3, yy = top - 30 - r * 34 + 6 * Math.sin(t * 3 + i * 0.7 + r) * hash01(i, r + 20);
    ctx.fillStyle = `rgba(160,185,230,${0.10 + 0.12 * hash01(i, r + 7)})`; ctx.beginPath(); ctx.arc(xx, yy, 11, 0, TAU); ctx.fill(); }
  ctx.save();
  ctx.beginPath(); ctx.moveTo(-200 + drift, bot); ctx.lineTo(W + 200 + drift, bot); ctx.lineTo(W - 60 + drift * 0.4, top); ctx.lineTo(60 + drift * 0.4, top); ctx.closePath();
  ctx.fillStyle = C.grass; ctx.fill(); ctx.clip();
  for (let i = 0; i < 9; i++) { if (i % 2) continue; const y0 = lerp(top, bot, (i / 9) ** 1.5), y1 = lerp(top, bot, ((i + 1) / 9) ** 1.5); ctx.fillStyle = C.grass2; ctx.fillRect(0, y0, W, y1 - y0); }
  // halfway line + centre circle in perspective
  const cy = lerp(top, bot, 0.42 ** 1.5);
  ctx.strokeStyle = C.line; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(W / 2 + drift * 0.6, cy, 260, 70, 0, 0, TAU); ctx.stroke();
  ctx.restore();
  // floodlight beams
  [[-60, 0.5], [W + 60, 2.3]].forEach(([x, ph]) => {
    const a = 0.06 + 0.03 * Math.sin(t * 1.7 + ph);
    ctx.save(); ctx.translate(x, s.y - 140); ctx.rotate((x < 0 ? 0.5 : -0.5) + 0.05 * Math.sin(t * 0.8 + ph));
    const lg = ctx.createLinearGradient(0, 0, 0, H); lg.addColorStop(0, `rgba(220,235,255,${a * 2})`); lg.addColorStop(1, 'rgba(220,235,255,0)');
    ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(30, 0); ctx.lineTo(300, H); ctx.lineTo(-300, H); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  for (let i = 0; i < 30; i++) { const x = (hash01(i, 3) * W + t * 18 * (0.5 + hash01(i, 4))) % W, y = (hash01(i, 5) * H - t * 14) % H;
    ctx.fillStyle = `rgba(230,240,255,${0.07 + 0.1 * hash01(i, 6)})`; ctx.fillRect(x, (y + H) % H, 3, 3); }
}

// ---------------------------------------------------------------- persistent bug: AND–AZE + "BİR GECƏ n/4" goal slots
function bug(ctx, t) {
  const k = clamp(prog(t, 0.15, 0.5)); if (k <= 0) return;
  const y = s.y + s.h - 30, x0 = cx - 380, w = 760;
  ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 60);
  rrect(ctx, x0, y - 46, w, 92, 16); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 4, '#000');
  flagAND(ctx, x0 + 52, y, 64, 1); flagAZ(ctx, x0 + 126, y, 64, 1);
  const n = GOALS.filter((g) => t >= g).length;
  text(ctx, 'BİR GECƏ', x0 + 176, y + 14, font(36, 800, UI), C.chalk, 'left');
  text(ctx, `${n}/4`, x0 + 420, y + 15, font(40, 800, D), n === 4 ? C.gold : C.chalk, 'center');
  GOALS.forEach((g, i) => { const bmp = t >= g ? 1 + 0.35 * Math.exp(-(t - g) * 7) : 1; ball(ctx, x0 + 500 + i * 70, y, 26, t >= g ? (t - g) * 2 : 0, bmp, { dim: t < g }); });
  ctx.restore();
}

// ---------------------------------------------------------------- A: hook "28 il — cəmi 3 qol"
function sHook(ctx, t) {
  stadium(ctx, t);
  ctx.save(); shake(ctx, B(t), B(0.02), 18, 5, 0.25);
  const k0 = t < 0.35 ? lerp(1.45, 1, E.outBack(prog(t, 0, 0.35))) : 1;
  big(ctx, '28', cx - 120, s.y + 520, 330, C.gold, k0, { sw: 0.05 });
  chip(ctx, 'İL', cx + 200, s.y + 440, 90, k0, { bg: C.chalk, rot: 0.06 });
  // year ticker 1998 → 2026 under the number
  const yp = E.outCubic(prog(t, T('ildə') - 0.1, T('cəmi') + 0.1)), yr = Math.round(lerp(1998, 2026, yp));
  chip(ctx, `1998 → ${yr}`, cx + 120, s.y + 610, 50, pop(t, T('ildə') - 0.12), { bg: C.panel, fg: C.chalk, edge: C.gold, rot: -0.03 });
  ctx.restore();
  // goal: 3 balls fly in on "üç"
  const gx = cx, gy = s.y + 1120;
  const hits = [0, 1, 2].map((i) => T('üç') + 0.12 + i * 0.15);
  const bl = hits.reduce((a, h) => a + 1.4 * M.wobble(t - h, 3, 6), 0);
  net(ctx, gx, gy, 620, 300, bl);
  hits.forEach((h, i) => { const q = prog(t, h - 0.35, h); if (q <= 0) return;
    const sx = [cx - 520, cx + 520, cx][i], sy = H + 100, ex = gx - 170 + i * 170, ey = gy - 120 - (i % 2) * 50;
    const p = E.outCubic(q), x = lerp(sx, ex, p), y = lerp(sy, ey, p) - 260 * Math.sin(p * Math.PI) * (1 - p * 0.5);
    ball(ctx, x, y, lerp(70, 52, p), q * 8 + i, 1); });
  // CƏMİ 3 QOL stamp
  const ks = pop(t, T('qol!') + 0.05);
  if (ks > 0) { ctx.save(); ctx.translate(cx, s.y + 830); ctx.rotate(-0.06); ctx.scale(lerp(1.8, 1, Math.min(1, ks)), lerp(1.8, 1, Math.min(1, ks)));
    rrect(ctx, -330, -78, 660, 156, 22); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 7);
    text(ctx, 'CƏMİ 3 QOL', 0, 32, font(96, 800, D), C.ink, 'center'); ctx.restore(); }
  else chip(ctx, 'CƏMİ', cx, s.y + 830, 60, pop(t, T('cəmi') - 0.05), { bg: C.chalk, rot: -0.04 });
}

// ---------------------------------------------------------------- B: 5 meetings 1998–2016, four 0:0
const H2H = [['1998', '0:0'], ['2000', '0:0'], ['2008', '1:2'], ['2012', '0:0'], ['2016', '0:0']];
function sHistory(ctx, t) {
  stadium(ctx, t);
  const ka = pop(t, T('Azərbaycan') - 0.05), kd = pop(t, T('Andorra') - 0.05);
  flagAZ(ctx, cx - 250, s.y + 300, 220, ka, 0.05 * Math.sin(t * 3));
  flagAND(ctx, cx + 250, s.y + 300, 200, kd, -0.05 * Math.sin(t * 3 + 1));
  big(ctx, 'vs', cx, s.y + 325, 80, C.chalk, kd, { sw: 0.1 });
  text(ctx, 'AZƏRBAYCAN', cx - 250, s.y + 420, font(36, 800, UI), C.chalk, 'center');
  if (kd > 0) text(ctx, 'ANDORRA', cx + 250, s.y + 420, font(36, 800, UI), C.chalk, 'center');
  const zeroT = [0, 1, 3, 4].reduce((o, i, j) => ((o[i] = T('Dörd') + 0.05 + j * 0.16), o), {}); zeroT[2] = T('sıfır-sıfır') + 0.05;
  H2H.forEach(([yr, sc], i) => {
    const k = sp(t, T('beş') - 0.05 + i * 0.09, SPRING.snappy); if (k <= 0) return;
    const y = s.y + 520 + i * 112, x = lerp(W + 200, s.x + 40, Math.min(1, k));
    const flipK = prog(t, zeroT[i] - 0.12, zeroT[i] + 0.08), shown = flipK >= 0.5, zero = sc === '0:0';
    ctx.save(); ctx.translate(x, y);
    rrect(ctx, 0, -54, s.w - 80, 108, 18); ctx.fillStyle = shown && !zero ? C.panel2 : C.panel; ctx.fill(); outline(ctx, 4, shown && !zero ? C.gold : '#000');
    text(ctx, `${i + 1}`, 40, 16, font(40, 800, D), C.mute, 'center');
    text(ctx, yr, 90, 18, font(52, 800, UI), C.chalk, 'left');
    // score tile flips (vertical squash) from ? to the result
    const tx = s.w - 230, sq = Math.abs(Math.cos(flipK * Math.PI));
    ctx.save(); ctx.translate(tx, 0); ctx.scale(1, Math.max(0.02, sq));
    rrect(ctx, -110, -42, 220, 84, 14); ctx.fillStyle = shown ? (zero ? C.grey : C.gold) : '#05070D'; ctx.fill(); outline(ctx, 4);
    text(ctx, shown ? sc : '?:?', 0, 20, font(60, 800, D), shown && !zero ? C.ink : C.chalk, 'center'); ctx.restore();
    ctx.restore();
  });
  // counters: "5 OYUN" then "0:0 ×4"
  chip(ctx, '5 OYUN', s.x + 110, s.y + 1090, 44, pop(t, T('dəfə') - 0.05), { bg: C.chalk, rot: -0.05 });
  const n0 = [0, 1, 3, 4].filter((i) => t >= zeroT[i]).length;
  if (n0 > 0) chip(ctx, `0:0 × ${n0}`, cx - 20, s.y + 1090, 44, pop(t, zeroT[0]), { bg: C.grey, fg: C.chalk, rot: 0.04 });
  chip(ctx, 'CƏMİ 3 QOL', s.x + s.w - 150, s.y + 1090, 44, pop(t, T('bitib.') - 0.05), { bg: C.gold, rot: -0.03 });
}

// ---------------------------------------------------------------- C: last night — three scorers, scoreboard
function scoreboard(ctx, x, y, a, b, k, tFlipA, tFlipB, sc = 1) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k * sc, k * sc);
  rrect(ctx, -400, -95, 800, 190, 24); ctx.fillStyle = '#05070D'; ctx.fill(); outline(ctx, 7, C.gold);
  flagAND(ctx, -320, -10, 96, 1); flagAZ(ctx, 320, -10, 104, 1);
  text(ctx, 'ANDORRA', -320, 70, font(28, 800, UI), C.mute, 'center'); text(ctx, 'AZƏRBAYCAN', 320, 70, font(28, 800, UI), C.mute, 'center');
  const tt = scoreboard.t;
  const dig = (v, dx, tf) => { const d = tt - tf, q = d >= 0 ? 1 + 0.35 * Math.exp(-d * 8) : 1;
    ctx.save(); ctx.translate(dx, 0); ctx.scale(q, q); text(ctx, String(v), 0, 42, font(130, 800, D), C.gold, 'center'); ctx.restore(); };
  dig(a, -110, tFlipA); text(ctx, ':', 0, 32, font(110, 800, D), C.chalk, 'center'); dig(b, 110, tFlipB);
  ctx.restore();
}
function sMatch(ctx, t) {
  stadium(ctx, t);
  scoreboard.t = t;
  const a = t >= GA ? 1 : 0, b = (t >= G1 ? 1 : 0) + (t >= G2 ? 1 : 0) + (t >= G3 ? 1 : 0);
  const lastB = t >= G3 ? G3 : t >= G2 ? G2 : G1;
  scoreboard(ctx, cx, s.y + 330, a, b, Math.min(1.05, sp(t, S.C - 0.25, SPRING.bouncy)), GA, lastB, 0.85);
  chip(ctx, 'YOLDAŞLIQ OYUNU · 16 NOYABR', cx, s.y + 470, 40, pop(t, T('yoldaşlıq') - 0.05), { bg: C.chalk, rot: -0.02 });
  // which scorer is on now
  const SC = [
    { t0: T('Eşqin') - 0.08, g: G1, name: 'EŞQİN ƏHMƏDOV', min: "3'" },
    { t0: T('Musa') - 0.08, g: G2, name: 'MUSA QURBANLI', min: "47'" },
    { t0: T('Toral') - 0.08, g: G3, name: 'TORAL BAYRAMOV', min: "70' · PENALTİ" },
  ];
  let cur = -1; SC.forEach((c, i) => { if (t >= c.t0) cur = i; });
  const gx = s.x + s.w - 170, gy = s.y + 1120;
  const bl = GOALS.filter((g) => g !== GA).reduce((acc, g) => acc + 1.4 * M.wobble(t - g, 3, 6), 0);
  net(ctx, gx, gy, 340, 300, bl);
  if (cur >= 0) {
    const c = SC[cur], kin = Math.min(1, sp(t, c.t0, SPRING.snappy));
    const px = lerp(-300, s.x + 190, kin), py = s.y + 1140;
    const kick = prog(t, c.g - 0.45, c.g - 0.25), armUp = E.outBack(prog(t, c.g + 0.1, c.g + 0.4));
    ctx.save(); shake(ctx, B(t), B(c.g), 8, 7, 0.2);
    const foot = player(ctx, px, py, 0.55, { kick: t < c.g - 0.45 ? 0 : kick, arm: armUp });
    ctx.restore();
    // ball: at the foot, then flies into the net
    const q = prog(t, c.g - 0.27, c.g);
    if (t < c.g + 0.9) { const bx0 = px + 120, by0 = py - 30, bx1 = gx + 30, by1 = gy - 170;
      const p = E.outCubic(q), bx = lerp(bx0, bx1, p), by = lerp(by0, by1, p) - 160 * Math.sin(p * Math.PI);
      const settle = t > c.g ? Math.min(1, (t - c.g) * 3) : 0;
      ball(ctx, bx, by + settle * 120, 40, q * 10 + (t - c.t0) * (q > 0 ? 0 : 1), 1); }
    namePlate(ctx, c.name, c.min, cx + 40, s.y + 650, pop(t, c.t0), 0.03 * (cur % 2 ? -1 : 1));
    chip(ctx, 'QOL!', gx - 20, gy - 345, 66, t >= c.g ? pop(t, c.g) * (1 - prog(t, c.g + 0.8, c.g + 1)) : 0, { bg: C.gold, rot: -0.08 });
  }
  // 55' Andorra goal note
  const kA = pop(t, GA - 0.05) * (1 - prog(t, T('Toral') + 0.2, T('Toral') + 0.4));
  chip(ctx, "55' ANDORRA QOL VURDU", cx, s.y + 560, 34, kA, { bg: C.red, fg: C.chalk, rot: -0.02 });
  // minute chip for goal 1
}

// ---------------------------------------------------------------- D: final score 1 : 3
function sFinal(ctx, t) {
  stadium(ctx, t);
  scoreboard.t = t;
  const tz = T('üç-bir!') - 0.05;
  const z = Math.exp(Math.log(0.85) + (Math.log(1.2) - Math.log(0.85)) * E.outBack(prog(t, tz - 0.1, tz + 0.25)));
  ctx.save(); shake(ctx, B(t), B(tz), 16, 9, 0.25);
  scoreboard(ctx, cx, s.y + 620, 1, 3, Math.min(1.05, sp(t, S.D - 0.25, SPRING.bouncy)), -9, tz, z);
  ctx.restore();
  chip(ctx, 'HESAB', cx, s.y + 360, 56, pop(t, S.D + 0.05), { bg: C.chalk, rot: -0.03 });
  const ks = pop(t, tz + 0.1);
  if (ks > 0) { ctx.save(); ctx.translate(cx, s.y + 960); ctx.rotate(-0.07); ctx.scale(lerp(1.8, 1, Math.min(1, ks)), lerp(1.8, 1, Math.min(1, ks)));
    rrect(ctx, -300, -66, 600, 132, 18); ctx.fillStyle = 'rgba(5,7,13,0.85)'; ctx.fill(); ctx.lineWidth = 12; ctx.strokeStyle = C.green; ctx.stroke();
    text(ctx, 'AZƏRBAYCAN QALİB', 0, 22, font(58, 800, D), C.green, 'center'); ctx.restore(); }
  if (t > tz) for (let i = 0; i < 30; i++) { const q = prog(t, tz + hash01(i, 2) * 0.3, tz + 1.5 + hash01(i, 2) * 0.3); if (q <= 0 || q >= 1) continue;
    const a = -Math.PI / 2 + (hash01(i, 3) - 0.5) * 2.6, v = 420 + 380 * hash01(i, 4);
    const x = cx + 330 + Math.cos(a) * v * q, y = s.y + 600 + Math.sin(a) * v * q + 700 * q * q;
    ctx.save(); ctx.translate(x, y); ctx.rotate(q * 9 * (hash01(i, 5) - 0.5)); ctx.globalAlpha = 1 - q;
    ctx.fillStyle = ['#00B5E2', '#EF3340', '#509E2F', C.gold][i % 4]; ctx.fillRect(-10, -5, 20, 10); ctx.restore(); }
}

// ---------------------------------------------------------------- E: captain's last match
function sCaptain(ctx, t) {
  stadium(ctx, t);
  const tk = T('kapitan') - 0.05, ts = T('son') - 0.05;
  const kin = Math.min(1, sp(t, S.E - 0.1, SPRING.gentle));
  const wave = Math.sin((t - ts) * 7) * 0.15 * (t > ts ? 1 : 0);
  ctx.save(); ctx.translate(lerp(-400, cx - 170, kin), s.y + 1150);
  player(ctx, 0, 0, 0.74, { arm: E.outBack(prog(t, ts, ts + 0.35)), armband: pop(t, tk), lean: wave * 0.2 });
  ctx.restore();
  namePlate(ctx, 'EMİN MAHMUDOV', 'kapitan', cx + 170, s.y + 330, pop(t, T('Emin') - 0.05), 0.04);
  flagAZ(ctx, s.x + s.w - 120, s.y + 620, 170, pop(t, T('yığmada') - 0.05), 0.08 * Math.sin(t * 5));
  chip(ctx, 'YIĞMA', s.x + s.w - 120, s.y + 730, 40, pop(t, T('yığmada')), { bg: C.chalk, rot: 0.05 });
  const kso = pop(t, ts);
  if (kso > 0) { ctx.save(); ctx.translate(cx + 190, s.y + 900); ctx.rotate(-0.08); ctx.scale(lerp(1.8, 1, Math.min(1, kso)), lerp(1.8, 1, Math.min(1, kso)));
    rrect(ctx, -250, -70, 500, 140, 20); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 7);
    text(ctx, 'SON OYUN', 0, 28, font(84, 800, D), C.ink, 'center'); ctx.restore(); }
}

// ---------------------------------------------------------------- F: payoff — 1 night 4 goals vs 5 games 3 goals
function column(ctx, x, label, sub, n, tStart, gap, tLit, k, { lit = false } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, 0);
  const baseY = s.y + 1000;
  rrect(ctx, -170, baseY - 560, 340, 580, 26); ctx.fillStyle = lit ? 'rgba(245,195,59,0.16)' : 'rgba(14,26,54,0.75)'; ctx.fill(); outline(ctx, 6, lit ? C.gold : '#000');
  for (let i = 0; i < n; i++) { const ti = tStart + i * gap, q = sp(t_, ti - 0.12, SPRING.bouncy); if (q <= 0) continue;
    const y = lerp(baseY - 900, baseY - 70 - i * 124, Math.min(1, q)); ball(ctx, 0, y, 58, (1 - Math.min(1, q)) * 4 + i, 1); }
  rrect(ctx, -170, baseY + 30, 340, 120, 20); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 5, lit ? C.gold : '#000');
  text(ctx, label, 0, baseY + 86, font(54, 800, D), lit ? C.gold : C.chalk, 'center');
  text(ctx, sub, 0, baseY + 130, font(32, 700, UI), C.mute, 'center');
  ctx.restore();
}
let t_ = 0;
function sPay(ctx, t) {
  stadium(ctx, t); t_ = t;
  const lit = t >= T('çox!') - 0.05;
  column(ctx, cx + 210, '1 GECƏ', '16 noyabr 2026', 4, T('dörd'), 0.12, 0, pop(t, S.F + 0.05), { lit });
  column(ctx, cx - 210, '5 OYUN', '1998–2016', 3, T('beş', 1), 0.12, 0, pop(t, T('əvvəlki') - 0.1));
  big(ctx, '4 QOL', cx + 210, s.y + 400, 96, C.gold, pop(t, T('qol', 1) - 0.05), { rot: 0.04, sw: 0.08 });
  big(ctx, '3 QOL', cx - 210, s.y + 400, 96, C.chalk, pop(t, T('oyunun') - 0.05), { rot: -0.04, sw: 0.08 });
  const kc = pop(t, T('çox!') - 0.05);
  if (kc > 0) { ctx.save(); ctx.translate(cx, s.y + 700); ctx.scale(kc, kc); ctx.rotate(0.02 * Math.sin(t * 4));
    ctx.beginPath(); ctx.arc(0, 0, 92, 0, TAU); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 7);
    text(ctx, '<', 0, 38, font(120, 800, D), C.ink, 'center'); ctx.restore(); }
  chip(ctx, 'DAHA ÇOX!', cx, s.y + 1230, 60, pop(t, T('çox!') + 0.1), { bg: C.gold, rot: -0.04 });
}

// ---------------------------------------------------------------- G: end card
function envelope(ctx, x, y, w) {
  const h = w * 0.68; ctx.save(); ctx.translate(x, y);
  rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 4);
  ctx.beginPath(); ctx.moveTo(-w / 2 + 3, -h / 2 + 3); ctx.lineTo(0, h * 0.08); ctx.lineTo(w / 2 - 3, -h / 2 + 3); outline(ctx, 4); ctx.restore();
}
function sEnd(ctx, t) {
  stadium(ctx, t);
  const t0 = S.G;
  ball(ctx, cx, s.y + 470 - 40 * Math.abs(Math.sin((t - t0) * 3.2)), 110, (t - t0) * 2, pop(t, t0 - 0.2));
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
  if (kS > 0) { ctx.save(); ctx.translate(cx, s.y + 1200); ctx.scale(kS, kS);
    const msg = 'Futbolsevər dostuna göndər';
    ctx.font = font(46, 800, UI); const w = ctx.measureText(msg).width + 150;
    rrect(ctx, -w / 2, -48, w, 96, 30); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 5);
    envelope(ctx, -w / 2 + 62, 0, 62); text(ctx, msg, 38, 16, font(46, 800, UI), C.ink, 'center'); ctx.restore(); }
}

// ---------------------------------------------------------------- captions (word by word, top)
function captions(ctx, t) {
  const L = TIMING.lines; const li = L.findIndex((l, i) => t >= l.t0 - 0.05 && t < (L[i + 1] ? L[i + 1].t0 - 0.05 : END)); if (li < 0) return;
  const all = L[li].words.filter((w) => w.w !== '—'), ws = all.filter((w) => t >= w.t - 0.03); if (!ws.length) return;
  const start = Math.floor((ws.length - 1) / 3) * 3, chunk = all.slice(start, start + 3), shown = ws.slice(start);
  let size = 96; const gap = 38;
  const meas = (sz) => { ctx.font = font(sz, 800, D); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 30) { size = Math.floor(size * (s.w - 30) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 110;
  shown.forEach((w, i) => { const k = sp(t, w.t - 0.03, SPRING.bouncy), sc = Math.min(1.1, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.2; ctx.strokeStyle = C.ink; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.gold : '#FFFFFF'; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 700, UI), font(40, 600, UI)],
  hits: HITS,
  draw(ctx, u, t) {
    if (t < S.B + 0.2) whip(ctx, t, S.B, () => sHook(ctx, t), () => sHistory(ctx, t));
    else if (t < S.C + 0.2) whip(ctx, t, S.C, () => sHistory(ctx, t), () => sMatch(ctx, t));
    else if (t < S.D + 0.2) whip(ctx, t, S.D, () => sMatch(ctx, t), () => sFinal(ctx, t));
    else if (t < S.E + 0.2) whip(ctx, t, S.E, () => sFinal(ctx, t), () => sCaptain(ctx, t));
    else if (t < S.F + 0.2) whip(ctx, t, S.F, () => sCaptain(ctx, t), () => sPay(ctx, t));
    else whip(ctx, t, S.G, () => sPay(ctx, t), () => sEnd(ctx, t), 0.36);
    if (t < S.F - 0.2) bug(ctx, t);
    captions(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 300; i++) { ctx.fillStyle = `rgba(255,255,240,${0.02 + 0.03 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
