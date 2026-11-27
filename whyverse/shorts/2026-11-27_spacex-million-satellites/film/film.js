// "SpaceX: up to 1 million satellites" — Whyverse 19:00 Baku GUESS THE ANSWER Short, Fri 27 Nov 2026. Pure function of time.
// Facts: on 25 Nov 2026 the FCC approved SpaceX's request for up to 1 million "Starmind" satellites (orbital compute modules) to
// create data centers in space, solar powered — Chairman Brendan Carr: "in a historic first" (Carr on X; NPR / AP 26 Nov; CBS 25 Nov).
// Starlink today: just over 10,000 satellites (BGR 10,000 milestone; Space.com ~11,000). Astronomers / scientists warn about the
// night sky (NPR/AP "Scientists are skeptical"; astronomers' statement via The Orkney News 27 Nov).
// Look: ORBITAL NIGHT HUD — black-indigo starfield, full-bleed real photos with slow push, ONE accent (signal cyan) + warm amber
// for the guess, Inter Display, a live SATELLITE COUNTER in the top HUD, 3-2-1 countdown ring, dot swarm, bar race, satellite streaks.
import * as M from './lib/motion.js';
const { W, H, E, prog, lerp, spring, SPRING, font, text, hash01, clamp, TAU } = M;

const TIMING = {"dur": 25.3, "lines": [{"id": "l1", "t0": 0.1, "t1": 4.437, "words": [{"w": "How", "t": 0.15, "key": false}, {"w": "many", "t": 0.39, "key": false}, {"w": "satellites", "t": 0.678, "key": true}, {"w": "did", "t": 1.254, "key": false}, {"w": "America", "t": 1.494, "key": false}, {"w": "just", "t": 1.926, "key": false}, {"w": "approve", "t": 2.214, "key": false}, {"w": "for", "t": 2.646, "key": false}, {"w": "SpaceX?", "t": 2.886, "key": true}, {"w": "Your", "t": 3.72, "key": false}, {"w": "guess?", "t": 4.002, "key": true}]}, {"id": "l2", "t0": 7.25, "t1": 8.387, "words": [{"w": "Up", "t": 7.28, "key": false}, {"w": "to", "t": 7.455, "key": false}, {"w": "1 million.", "t": 7.629, "key": true}]}, {"id": "l3", "t0": 8.75, "t1": 13.832, "words": [{"w": "A", "t": 8.78, "key": false}, {"w": "historic", "t": 8.938, "key": true}, {"w": "first:", "t": 9.462, "key": false}, {"w": "data", "t": 10.24, "key": false}, {"w": "centers", "t": 10.538, "key": false}, {"w": "in", "t": 10.984, "key": false}, {"w": "space,", "t": 11.183, "key": true}, {"w": "running", "t": 11.59, "key": false}, {"w": "AI", "t": 12.262, "key": true}, {"w": "on", "t": 12.79, "key": false}, {"w": "solar", "t": 12.997, "key": true}, {"w": "power.", "t": 13.358, "key": false}]}, {"id": "l4", "t0": 14.25, "t1": 16.656, "words": [{"w": "That's", "t": 14.28, "key": false}, {"w": "nearly", "t": 14.583, "key": false}, {"w": "100", "t": 14.929, "key": true}, {"w": "times", "t": 15.448, "key": false}, {"w": "today's", "t": 15.751, "key": false}, {"w": "Starlink.", "t": 16.097, "key": true}]}, {"id": "l5", "t0": 17.0, "t1": 19.922, "words": [{"w": "Astronomers", "t": 17.03, "key": false}, {"w": "warn", "t": 17.635, "key": false}, {"w": "the", "t": 17.914, "key": false}, {"w": "night", "t": 18.146, "key": true}, {"w": "sky", "t": 18.472, "key": true}, {"w": "could", "t": 18.704, "key": false}, {"w": "pay", "t": 19.03, "key": false}, {"w": "the", "t": 19.262, "key": false}, {"w": "price.", "t": 19.495, "key": false}]}, {"id": "l6", "t0": 20.5, "t1": 22.486, "words": [{"w": "Like", "t": 20.53, "key": true}, {"w": "and", "t": 20.806, "key": false}, {"w": "follow", "t": 21.036, "key": true}, {"w": "Whyverse", "t": 21.404, "key": true}, {"w": "for", "t": 21.864, "key": false}, {"w": "more.", "t": 22.094, "key": false}]}]};
const PHOTOS = {"f9a": {"src": "img/f9a.jpg", "credit": "U.S. Space Force / public domain"}, "musk": {"src": "img/musk.jpg", "credit": "UK Government / CC BY 2.0"}, "earth": {"src": "img/earth.jpg", "credit": "NASA / public domain"}, "f9b": {"src": "img/f9b.jpg", "credit": "U.S. Space Force / public domain"}, "carr": {"src": "img/carr.jpg", "credit": "FCC / public domain"}, "dc": {"src": "img/dc.jpg", "credit": "Tony Marinescu / Unsplash"}, "solar": {"src": "img/solar.jpg", "credit": "NASA / public domain"}, "ship": {"src": "img/ship.jpg", "credit": "Steve Jurvetson / CC BY 2.0"}, "trails": {"src": "img/trails.jpg", "credit": "International Gemini Observatory/NOIRLab / CC BY 4.0"}, "paranal": {"src": "img/paranal.jpg", "credit": "ESO / CC BY 4.0"}};
const BEAT = {"offset": 0.00145, "period": 0.46876};
const C = { bg: '#05060F', bg2: '#0D1030', ink: '#FFFFFF', cyan: '#35E0FF', cyanD: '#0E7FA0', amber: '#FFB13B', dim: '#8C93B8', red: '#FF5A5A' };
const D = 'Display', UI = 'UI';
const s = M.FORMAT.safe, cx = W / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));
const T = (w, n = 0) => { const m = TIMING.lines.flatMap((l) => l.words).filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const LT = (id) => TIMING.lines.find((l) => l.id === id);
const END = TIMING.dur;
const B = (t) => (t - BEAT.offset) / BEAT.period;
const BAR_Y = 1370;
const fade = (t, a, b, f = 0.15) => clamp(Math.min((t - a) / f + 1, (b - t) / f + 1));
const CD0 = LT('l1').t1 + 0.15, CD1 = LT('l2').t0 - 0.05; // countdown window
const REV = T('1 million.') - 0.05;                       // the reveal
const EC = LT('l6').t0 - 0.25;                             // end card

const SHOTS = [{"k": "f9a", "t0": 0, "t1": 2.3, "z": [1.05, 1.22], "fx": 0.5, "fy": 0.4}, {"k": "musk", "t0": 2.3, "t1": 4.6, "z": [1.0, 1.12], "fx": 0.5, "fy": 0.3, "label": "ELON MUSK \u00b7 SPACEX"}, {"k": "earth", "t0": 4.6, "t1": 7.2, "z": [1.0, 1.15], "fx": 0.5, "fy": 0.5, "dim": 0.7}, {"k": "f9b", "t0": 7.2, "t1": 8.75, "z": [1.0, 1.15], "fx": 0.45, "fy": 0.4, "dim": 0.75}, {"k": "carr", "t0": 8.75, "t1": 10.15, "z": [1.0, 1.1], "fx": 0.5, "fy": 0.25, "label": "BRENDAN CARR \u00b7 FCC CHAIRMAN"}, {"k": "dc", "t0": 10.15, "t1": 12.15, "z": [1.0, 1.15], "fx": 0.5, "fy": 0.5}, {"k": "solar", "t0": 12.15, "t1": 14.15, "z": [1.0, 1.14], "fx": 0.5, "fy": 0.5}, {"k": "ship", "t0": 14.15, "t1": 16.9, "z": [1.0, 1.12], "fx": 0.55, "fy": 0.4, "dim": 0.6}, {"k": "trails", "t0": 16.9, "t1": 18.6, "z": [1.0, 1.15], "fx": 0.5, "fy": 0.5}, {"k": "paranal", "t0": 18.6, "t1": 20.3, "z": [1.0, 1.12], "fx": 0.5, "fy": 0.4}];
let IMGS = {}, STARS = null;
const PH_ = 1240; // photo band height (full width), fades into the night below

function bg(ctx) { ctx.drawImage(STARS, 0, 0); }
function shot(ctx, sh, t, alpha = 1, dx = 0) {
  const im = IMGS[sh.k]; if (!im) return;
  const p = prog(t, sh.t0 - 0.3, sh.t1 + 0.4); const z = sh.z[0] * (sh.z[1] / sh.z[0]) ** p;
  ctx.save(); ctx.globalAlpha = alpha; ctx.translate(dx, 0);
  ctx.beginPath(); ctx.rect(0, 0, W, PH_); ctx.clip();
  if (sh.dim) ctx.filter = `brightness(${sh.dim})`;
  M.cover(ctx, im, 0, 0, W, PH_, { fx: sh.fx, fy: sh.fy, zoom: z }); ctx.filter = 'none';
  const g = ctx.createLinearGradient(0, PH_ - 520, 0, PH_); g.addColorStop(0, 'rgba(5,6,15,0)'); g.addColorStop(1, 'rgba(5,6,15,1)');
  ctx.fillStyle = g; ctx.fillRect(0, PH_ - 520, W, 520);
  const g2 = ctx.createLinearGradient(0, 0, 0, 330); g2.addColorStop(0, 'rgba(5,6,15,0.85)'); g2.addColorStop(1, 'rgba(5,6,15,0)');
  ctx.fillStyle = g2; ctx.fillRect(0, 0, W, 330);
  ctx.restore();
}
function photos(ctx, t) {
  const i = SHOTS.findIndex((x) => t >= x.t0 && t < x.t1); if (i < 0) return;
  const cur = SHOTS[i], prev = SHOTS[i - 1];
  const p = i === 0 ? 1 : E.outCubic(prog(t, cur.t0, cur.t0 + 0.35));
  const dir = i % 2 ? 1 : -1;
  if (prev && p < 1) shot(ctx, prev, t, 1, -dir * 260 * p);
  shot(ctx, cur, t, p, dir * 260 * (1 - p));
  if (p < 1) { ctx.save(); ctx.globalAlpha = 0.3 * (1 - p); ctx.fillStyle = C.cyan; ctx.fillRect(0, 0, W, PH_); ctx.restore(); } // flash wipe
  // credit + optional name plate (bottom-left of the photo band, above the subtitle bar)
  const cr = PHOTOS[cur.k] && PHOTOS[cur.k].credit;
  if (cr) text(ctx, 'Photo: ' + cr, s.x + 14, PH_ - 34, font(24, 700, UI), 'rgba(255,255,255,0.75)', 'left');
  if (cur.label) { const k = sp(t, cur.t0 + 0.15); if (k > 0) { ctx.save(); ctx.globalAlpha = Math.min(1, k);
    ctx.font = font(40, 800, UI); const w = ctx.measureText(cur.label).width + 44; const x = s.x + 14, y = 290;
    ctx.fillStyle = C.cyan; ctx.fillRect(x, y, 10, 64); ctx.fillStyle = 'rgba(5,6,15,0.82)'; ctx.fillRect(x + 10, y, w * Math.min(1, k), 64);
    ctx.fillStyle = C.ink; ctx.textAlign = 'left'; ctx.fillText(cur.label, x + 32, y + 46); ctx.restore(); } }
}
// ---------------------------------------------------------------- helpers
function big(ctx, str, x, y, size, col, k, { fam = D, wt = 700, align = 'center', max = s.w - 40, glow = null } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.font = font(size, wt, fam); const mw = ctx.measureText(str).width; if (mw > max) size *= max / mw;
  ctx.translate(x, y); ctx.scale(k, k); ctx.font = font(size, wt, fam); ctx.textAlign = align;
  if (glow) { ctx.shadowColor = glow; ctx.shadowBlur = size * 0.35; }
  ctx.lineJoin = 'round'; ctx.lineWidth = size * 0.12; ctx.strokeStyle = 'rgba(5,6,15,0.9)'; ctx.strokeText(str, 0, 0);
  ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function tag(ctx, label, x, y, size, k, { bg = C.cyan, fg = C.bg } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.font = font(size, 800, UI);
  const w = ctx.measureText(label).width + size * 1.1, h = size * 1.7;
  ctx.fillStyle = bg; M.rrect(ctx, -w / 2, -h / 2, w, h, h / 2); ctx.fill();
  ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.fillText(label, 0, size * 0.36); ctx.restore();
}
function satIcon(ctx, x, y, r, col = C.ink, rot = 0) { // tiny flat satellite: body + two solar wings
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = col;
  ctx.fillRect(-r * 0.35, -r * 0.35, r * 0.7, r * 0.7);
  ctx.fillStyle = C.cyan; ctx.fillRect(-r * 1.6, -r * 0.28, r * 1.1, r * 0.56); ctx.fillRect(r * 0.5, -r * 0.28, r * 1.1, r * 0.56);
  ctx.restore();
}
// ---------------------------------------------------------------- top HUD: format tag + live satellite counter
function hud(ctx, t) {
  const y = 170;
  tag(ctx, 'GUESS THE ANSWER', s.x + 190, y, 30, 1, { bg: C.amber, fg: C.bg });
  const rp = E.outCubic(prog(t, REV, REV + 0.9));
  const n = t < REV ? 0 : Math.round(1000000 * rp);
  const str = t < REV ? '???' : n.toLocaleString('en-US');
  ctx.save(); ctx.font = font(30, 800, UI); ctx.textAlign = 'right'; ctx.fillStyle = C.ink; ctx.fillText('SATELLITES APPROVED', s.x + s.w - 14, y - 24); ctx.restore();
  satIcon(ctx, s.x + s.w - 430, y - 34, 13, C.ink, 0.2 + Math.sin(t * 1.3) * 0.1);
  text(ctx, str, s.x + s.w - 14, y + 44, font(62, 700, D), t < REV ? C.amber : C.cyan, 'right');
}
// ---------------------------------------------------------------- decoration (ONE element at a time, never over the subtitle bar)
function decor(ctx, t) {
  if (t < CD0) { // hook on frame 0
    const k = 1; big(ctx, 'HOW MANY', cx, 960, 140, C.ink, k);
    big(ctx, 'SATELLITES?', cx, 1090, 140, C.cyan, k, { glow: 'rgba(53,224,255,0.5)' });
    tag(ctx, 'FOR SPACEX ALONE', cx, 1185, 44, sp(t, T('SpaceX?') - 0.1), { bg: C.ink });
    return; }
  if (t < REV) { countdown(ctx, t); return; }
  if (t < LT('l3').t0) { swarm(ctx, t); return; }
  if (t < T('data')) { const a = fade(t, LT('l3').t0, T('data') - 0.05); ctx.globalAlpha = a;
    tag(ctx, '“A HISTORIC FIRST” — FCC', cx, 1110, 44, sp(t, T('historic') - 0.1)); ctx.globalAlpha = 1; return; }
  if (t < T('AI')) { const a = fade(t, T('data') - 0.05, T('AI') - 0.05); ctx.globalAlpha = a;
    big(ctx, 'DATA CENTERS', cx, 1000, 120, C.ink, pop(t, T('data') - 0.1));
    big(ctx, 'IN SPACE', cx, 1110, 120, C.cyan, pop(t, T('space,') - 0.1), { glow: 'rgba(53,224,255,0.5)' }); ctx.globalAlpha = 1; return; }
  if (t < LT('l4').t0 - 0.1) { sun(ctx, t, fade(t, T('AI') - 0.05, LT('l4').t0 - 0.15)); return; }
  if (t < LT('l5').t0 - 0.1) { bars(ctx, t, fade(t, LT('l4').t0 - 0.1, LT('l5').t0 - 0.15)); return; }
  if (t < EC) { streaks(ctx, t, fade(t, LT('l5').t0 - 0.1, EC - 0.03)); return; }
}
function countdown(ctx, t) { // 3 · 2 · 1 ring, one tick per number
  const span = (REV - CD0) / 3; const i = Math.min(2, Math.floor((t - CD0) / span)); const f = (t - CD0 - i * span) / span;
  const n = 3 - i, x = cx, y = 860, r = 230;
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 22; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke();
  ctx.strokeStyle = C.amber; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + TAU * (1 - f)); ctx.stroke();
  ctx.fillStyle = 'rgba(5,6,15,0.7)'; ctx.beginPath(); ctx.arc(x, y, r - 14, 0, TAU); ctx.fill();
  const k = pop(t, CD0 + i * span); big(ctx, String(n), x, y + 95, 280, C.amber, k);
  ctx.restore();
  tag(ctx, 'YOUR GUESS? 👇', cx, 1170, 44, sp(t, CD0), { bg: C.ink });
}
function swarm(ctx, t) { // the reveal: 1,000,000 + a swarm of satellite dots filling the sky
  const f = prog(t, REV, LT('l3').t0); const N = 900, shown = Math.floor(N * E.outCubic(prog(t, REV, REV + 1.2)));
  ctx.save();
  for (let i = 0; i < shown; i++) { const a = hash01(i, 11) * TAU, rr = 80 + Math.sqrt(hash01(i, 12)) * 760;
    const x = cx + Math.cos(a + t * 0.25 * (hash01(i, 13) - 0.5)) * rr, y = 760 + Math.sin(a + t * 0.25 * (hash01(i, 13) - 0.5)) * rr * 0.62;
    ctx.fillStyle = i % 9 ? 'rgba(53,224,255,0.85)' : 'rgba(255,255,255,0.95)'; ctx.fillRect(x - 3, y - 3, 6, 6); }
  ctx.restore();
  const k = pop(t, REV);
  ctx.save(); ctx.fillStyle = 'rgba(5,6,15,0.72)'; M.rrect(ctx, cx - 470, 700, 940, 300, 30); ctx.globalAlpha = Math.min(1, k); ctx.fill(); ctx.restore();
  big(ctx, 'UP TO', cx, 790, 60, C.dim, k, { fam: UI, wt: 800 });
  big(ctx, '1,000,000', cx, 950, 190, C.cyan, k, { glow: 'rgba(53,224,255,0.6)' });
}
function sun(ctx, t, a) { // solar power: a glowing sun charging a satellite
  ctx.save(); ctx.globalAlpha = a; const k = sp(t, T('AI') - 0.1);
  const x = cx - 250, y = 900, r = 120 * k;
  const g = ctx.createRadialGradient(x, y, 10, x, y, r * 2.2); g.addColorStop(0, 'rgba(255,200,80,0.9)'); g.addColorStop(1, 'rgba(255,177,59,0)');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.2, 0, TAU); ctx.fill();
  ctx.fillStyle = C.amber; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
  for (let i = 0; i < 5; i++) { const ph = ((t * 1.4 + i / 5) % 1); ctx.fillStyle = `rgba(255,200,80,${1 - ph})`;
    ctx.beginPath(); ctx.arc(lerp(x + r, cx + 210, ph), lerp(y, 900, ph) + Math.sin(ph * 6 + i) * 20, 9, 0, TAU); ctx.fill(); }
  satIcon(ctx, cx + 260, 900, 60 * sp(t, T('AI')), C.ink, Math.sin(t * 2) * 0.08);
  tag(ctx, 'AI · POWERED BY THE SUN', cx, 1130, 42, sp(t, T('solar') - 0.1), { bg: C.amber });
  ctx.restore();
}
function bars(ctx, t, a) { // bar race: Starlink today vs up to 1,000,000
  ctx.save(); ctx.globalAlpha = a; const t0 = LT('l4').t0;
  const x0 = s.x + 60, w = s.w - 120, y1 = 720, y2 = 940;
  const f1 = E.outCubic(prog(t, t0, t0 + 0.6)), f2 = E.outCubic(prog(t, T('100') - 0.1, T('100') + 1.0));
  ctx.fillStyle = 'rgba(5,6,15,0.75)'; M.rrect(ctx, x0 - 40, y1 - 110, w + 80, 470, 28); ctx.fill();
  text(ctx, 'STARLINK TODAY', x0, y1 - 30, font(36, 800, UI), C.dim, 'left', 2);
  ctx.fillStyle = C.ink; ctx.fillRect(x0, y1, Math.max(8, w * 0.011 * f1), 70);
  text(ctx, '10,000+', x0 + 40, y1 + 54, font(52, 700, D), C.ink, 'left');
  text(ctx, 'STARMIND, APPROVED', x0, y2 - 30, font(36, 800, UI), C.cyan, 'left', 2);
  ctx.fillStyle = C.cyan; ctx.fillRect(x0, y2, w * f2, 70);
  if (f2 > 0.05) text(ctx, Math.round(1000000 * f2).toLocaleString('en-US'), x0 + 20, y2 + 54, font(52, 700, D), C.bg, 'left');
  big(ctx, '×100', cx + 250, y2 + 230, 120, C.cyan, pop(t, T('times') - 0.1), { glow: 'rgba(53,224,255,0.5)' });
  ctx.restore();
}
function streaks(ctx, t, a) { // the night sky gets scratched by satellite trails
  ctx.save(); ctx.globalAlpha = a; ctx.lineCap = 'round'; const t0 = LT('l5').t0;
  for (let i = 0; i < 26; i++) { const st = t0 + 0.2 + i * 0.09; const f = prog(t, st, st + 0.9); if (f <= 0) continue;
    const y = 220 + hash01(i, 21) * 900, x0 = -100 + hash01(i, 22) * 300, x1 = W + 100 - hash01(i, 23) * 300, yy = y + (hash01(i, 24) - 0.5) * 300;
    ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(lerp(x0, x1, f), lerp(y, yy, f)); ctx.stroke(); }
  tag(ctx, 'ASTRONOMERS WARN', cx, 1120, 46, sp(t, T('Astronomers') - 0.1), { bg: C.red, fg: C.ink });
  ctx.restore();
}
// ---------------------------------------------------------------- end card
function endCard(ctx, t) {
  bg(ctx);
  for (let i = 0; i < 14; i++) { const f = t - EC; const y = 300 + hash01(i, 31) * 1300, sp0 = 120 + hash01(i, 32) * 160; // satellites crossing (keeps the card alive)
    const x = ((f * sp0 + hash01(i, 33) * W * 1.4) % (W + 200)) - 100; satIcon(ctx, x, y, 10 + hash01(i, 34) * 8, 'rgba(255,255,255,0.7)', 0.3); }
  const p = E.inOutCubic(prog(t, EC - 0.05, EC + 0.3)); ctx.save(); ctx.translate(0, (1 - p) * 300); ctx.globalAlpha = p;
  big(ctx, 'WHYVERSE', cx, 560, 150, C.ink, 1);
  text(ctx, 'big questions, visual answers', cx, 640, font(40, 700, UI), C.dim, 'center');
  const btn = (lab, x, y, t0, bg, fg) => { const k = pop(t, t0); if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
    ctx.fillStyle = bg; M.rrect(ctx, -200, -70, 400, 140, 70); ctx.fill(); text(ctx, lab, 0, 26, font(70, 800, UI), fg, 'center'); ctx.restore(); };
  btn('LIKE', cx - 220, 820, T('Like'), C.ink, C.bg);
  btn('FOLLOW', cx + 220, 820, T('follow'), C.cyan, C.bg);
  const k = sp(t, T('more.') + 0.1);
  if (k > 0) { ctx.save(); ctx.globalAlpha = p * Math.min(1, k); ctx.translate(cx, 1030 + (1 - k) * 40);
    ctx.fillStyle = 'rgba(255,255,255,0.08)'; M.rrect(ctx, -470, -80, 940, 190, 26); ctx.fill(); ctx.strokeStyle = C.cyan; ctx.lineWidth = 4; ctx.stroke();
    ctx.save(); ctx.translate(-380, 14); ctx.fillStyle = C.amber; ctx.fillRect(-40, -26, 80, 52); ctx.strokeStyle = C.bg; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(-40, -26); ctx.lineTo(0, 6); ctx.lineTo(40, -26); ctx.stroke(); ctx.restore();
    text(ctx, 'Send this to the friend', 50, -4, font(46, 800, UI), C.ink, 'center');
    text(ctx, "who's obsessed with SpaceX", 50, 56, font(46, 800, UI), C.cyan, 'center');
    ctx.restore(); }
  ctx.restore();
}
// ---------------------------------------------------------------- fixed subtitle bar (lower third), phrase chunks, never moves
const CHUNKS = (() => {
  const out = [];
  for (const L of TIMING.lines) {
    const sents = []; let cur = [];
    L.words.forEach((w) => { cur.push(w); if (/[.!?:]$/.test(w.w) || (/,$/.test(w.w) && cur.length >= 2)) { sents.push(cur); cur = []; } }); if (cur.length) sents.push(cur);
    for (const S of sents) { const n = Math.ceil(S.length / 6), per = Math.ceil(S.length / n);
      for (let i = 0; i < S.length; i += per) out.push({ t0: S[i].t - 0.08, words: S.slice(i, i + per) }); }
  }
  out.forEach((c, i) => { const L = TIMING.lines.find((l) => l.words.includes(c.words[c.words.length - 1]));
    const next = out[i + 1]; c.t1 = next ? Math.min(next.t0, L.t1 + (L.id === 'l1' ? 3.0 : 0.7)) : Math.min(END, L.t1 + 0.9); });
  return out;
})();
function subtitles(ctx, t) {
  const c = CHUNKS.find((x) => t >= x.t0 && t < x.t1); if (!c) return;
  const fs = 58; ctx.font = font(fs, 800, UI); const gap = 16, maxW = s.w - 80;
  const widths = c.words.map((w) => ctx.measureText(w.w).width);
  const total = widths.reduce((a, b) => a + b, 0) + gap * (c.words.length - 1);
  let lines = [[0, c.words.length]];
  if (total > maxW) { let best = 1, bd = 1e9; for (let k = 1; k < c.words.length; k++) { const a = widths.slice(0, k).reduce((p, q) => p + q, 0) + gap * (k - 1);
      const b = total - a - gap; const d = Math.max(a, b); if (d < bd) { bd = d; best = k; } } lines = [[0, best], [best, c.words.length]]; }
  const lh = 72, h = lines.length * lh + 40;
  ctx.fillStyle = 'rgba(5,6,15,0.88)'; M.rrect(ctx, s.x + 10, BAR_Y - h / 2, s.w - 20, h, 18); ctx.fill();
  ctx.fillStyle = C.cyan; ctx.fillRect(s.x + 10, BAR_Y - h / 2 + 14, 6, h - 28);
  lines.forEach(([a, b], li) => {
    const lw = widths.slice(a, b).reduce((p, q) => p + q, 0) + gap * (b - a - 1); let x = cx - lw / 2;
    const y = BAR_Y - h / 2 + 20 + lh * li + 54;
    for (let i = a; i < b; i++) { const w = c.words[i]; ctx.fillStyle = w.key ? C.cyan : C.ink; ctx.textAlign = 'left'; ctx.fillText(w.w, x, y); x += widths[i] + gap; }
  });
}
const CUT = (t) => [B(t), 'cut', 'whoosh', { len: 0.22, from: 900, to: 2400 }];
const span = (REV - CD0) / 3;
const HITS = [
  [B(0.03), 'hook', 'thud'],
  ...SHOTS.slice(1).map((x) => CUT(x.t0)),
  [B(T('SpaceX?') - 0.1), 'spacex tag', 'pop'],
  [B(CD0), 'tick3', 'tick'], [B(CD0 + span), 'tick2', 'tick'], [B(CD0 + 2 * span), 'tick1', 'tick'],
  [B(REV), 'reveal', 'thud'], [B(REV + 0.05), 'counter', 'type', { len: 0.9, n: 10 }], [B(REV + 0.95), 'million lands', 'bell'],
  [B(T('historic') - 0.1), 'historic', 'pop'], [B(T('data') - 0.1), 'data centers', 'thud'], [B(T('space,') - 0.1), 'in space', 'pop'],
  [B(T('solar') - 0.1), 'sun', 'click'],
  [B(T('100') - 0.1), 'bar', 'whoosh', { len: 0.9, from: 300, to: 1600 }], [B(T('times') - 0.1), 'x100', 'thud'],
  [B(T('Astronomers') - 0.1), 'warn', 'thud'],
  [B(EC - 0.05), 'end', 'whoosh', { len: 0.3, from: 600, to: 1800 }], [B(T('Like')), 'LIKE', 'click'], [B(T('follow')), 'FOLLOW', 'pop'], [B(T('more.') + 0.1), 'send', 'click'],
];
const images = {}; for (const k of Object.keys(PHOTOS)) images[k] = PHOTOS[k].src;
M.film({
  fonts: [font(40, 700, D), font(40, 800, UI), font(40, 700, UI)], samples: 5, images, hits: HITS,
  init(ctx, IMG) { IMGS = IMG;
    STARS = document.createElement('canvas'); STARS.width = W; STARS.height = H; const d = STARS.getContext('2d');
    const g = d.createLinearGradient(0, 0, 0, H); g.addColorStop(0, C.bg); g.addColorStop(0.6, C.bg2); g.addColorStop(1, C.bg); d.fillStyle = g; d.fillRect(0, 0, W, H);
    for (let i = 0; i < 700; i++) { const x = hash01(i, 1) * W, y = hash01(i, 2) * H, r = 0.6 + hash01(i, 3) ** 3 * 2.4;
      d.fillStyle = `rgba(255,255,255,${0.25 + hash01(i, 4) * 0.6})`; d.beginPath(); d.arc(x, y, r, 0, TAU); d.fill(); } },
  draw(ctx, u, t) {
    if (t < EC) { bg(ctx); photos(ctx, t); decor(ctx, t); hud(ctx, t); }
    else endCard(ctx, t);
    subtitles(ctx, t);
  },
});
