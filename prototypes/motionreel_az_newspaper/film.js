// "ABŞ-dan 2 il əvvəl" — bilirdinizmi_az test in a NEWSPAPER / editorial collage style (Motion Reel).
// 120 bpm, 1 beat = 0.5 s, 44 beats = 22 s. No music (Meta mutes music in AZ): non-melodic SFX only.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, springU, SPRING, font, layout, glyph, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const C = { paper: '#EFE6D2', paper2: '#E4D8BE', ink: '#1A1714', red: '#C8282D', grey: '#7A7062' };
const SERIF = 'Display', UI = 'UI';
const HITS = [
  [0, 'hook stamp', 'impact'], [1, 'ƏVVƏL', 'thud'], [2.5, 'nəyi?', 'click'],
  [4, 'page slam', 'thud'], [4.6, 'masthead', 'click'], [5.5, 'headline type', 'type', { len: 1.4, n: 14 }],
  [8, 'ballot drop', 'thud'], [9.5, 'stamp İLK', 'impact'],
  [13, 'whip timeline', 'whoosh', { len: 0.4, from: 2400, to: 600 }],
  [14, '1918 AZ', 'thud'], [17, '1920 ABŞ', 'click'], [20, '1944 Fransa', 'click'], [23, '1971 İsveçrə', 'click'],
  [26, '53 il', 'impact'], [28, 'whip end', 'whoosh', { len: 0.5, from: 600, to: 2000 }],
  [30.2, 'send', 'tick'], [32, 'end card', 'impact'], [32.8, 'handle', 'click'], [34.5, 'İZLƏ', 'thud'],
];
const s = FORMAT.safe, cx = s.x + s.w / 2;

// ---------------------------------------------------------------- helpers
function paperBg(ctx, u, col = C.paper) {
  fill(ctx, col);
  // newsprint fibres + faint column rules
  for (let i = 0; i < 260; i++) {
    const x = hash01(i, 11) * W, y = hash01(i, 12) * H, l = 6 + hash01(i, 13) * 30;
    ctx.strokeStyle = `rgba(80,60,30,${0.05 + 0.05 * hash01(i, 14)})`; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + l, y + l * 0.2); ctx.stroke();
  }
}
function words(ctx, str, x, y, size, color, u0, u, { weight = 700, fam = SERIF, align = 'center', track = -0.01, stagger = 0.03, from = 'down' } = {}) {
  const f = font(size, weight, fam), L = layout(ctx, str, f, track * size);
  const x0 = align === 'center' ? x - L.width / 2 : x;
  L.glyphs.forEach((g, j) => {
    const k = springU(u, u0 + j * stagger, SPRING.snappy); if (k <= 0.001) return;
    const dy = from === 'down' ? (1 - k) * size * 0.6 : 0;
    glyph(ctx, g.ch, x0 + g.cx, y + dy, f, color, Math.min(1, k * 1.2), 1);
  });
  return L.width;
}
function typed(ctx, str, x, y, size, color, u0, u, perChar = 0.09, fam = SERIF, weight = 700, align = 'center') {
  const n = Math.floor(clamp((u - u0) / perChar, 0, str.length));
  const f = font(size, weight, fam);
  ctx.font = f; const full = ctx.measureText(str).width;
  const xs = align === 'center' ? x - full / 2 : x;
  text(ctx, str.slice(0, n), xs, y, f, color, 'left');
  if (n < str.length && n > 0 && Math.floor(u * 4) % 2) { ctx.fillStyle = color; ctx.fillRect(xs + ctx.measureText(str.slice(0, n)).width + 4, y - size * 0.8, 5, size * 0.9); }
}
function stamp(ctx, label, x, y, size, u0, u, rot = -0.12, col = C.red) {
  const k = springU(u, u0, SPRING.bouncy); if (k <= 0) return;
  const sc = lerp(2.4, 1, Math.min(1, k)) * (k > 1 ? 1 + (k - 1) * 0.3 : 1);
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha = Math.min(1, k * 1.4);
  ctx.font = font(size, 800, UI); const w = ctx.measureText(label).width + size * 0.9;
  ctx.strokeStyle = col; ctx.lineWidth = size * 0.09; rrect(ctx, -w / 2, -size * 0.85, w, size * 1.25, size * 0.18); ctx.stroke();
  text(ctx, label, 0, size * 0.12, font(size, 800, UI), col, 'center', size * 0.03);
  // ink speckle
  for (let i = 0; i < 40; i++) { ctx.fillStyle = 'rgba(239,230,210,0.9)'; ctx.fillRect((hash01(i, 21) - 0.5) * w, (hash01(i, 22) - 0.5) * size * 1.1, 3 + hash01(i, 23) * 5, 2 + hash01(i, 24) * 3); }
  ctx.restore();
}
function flag(ctx, which, x, y, w, h) {
  ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  if (which === 'az') {
    ['#00B5E2', '#EF3340', '#509E2F'].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(x, y + i * h / 3, w, h / 3 + 1); });
    const mx = x + w * 0.47, my = y + h / 2, r = h * 0.12;
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(mx, my, r, 0, TAU); ctx.fill();
    ctx.fillStyle = '#EF3340'; ctx.beginPath(); ctx.arc(mx + r * 0.25, my, r * 0.8, 0, TAU); ctx.fill();
    ctx.fillStyle = '#fff'; star(ctx, mx + r * 1.05, my, r * 0.42, 8);
  } else if (which === 'us') {
    for (let i = 0; i < 13; i++) { ctx.fillStyle = i % 2 ? '#fff' : '#B22234'; ctx.fillRect(x, y + i * h / 13, w, h / 13 + 1); }
    ctx.fillStyle = '#3C3B6E'; ctx.fillRect(x, y, w * 0.4, h * 7 / 13);
  } else if (which === 'fr') {
    ['#0055A4', '#FFFFFF', '#EF4135'].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(x + i * w / 3, y, w / 3 + 1, h); });
  } else if (which === 'ch') {
    ctx.fillStyle = '#DA291C'; ctx.fillRect(x, y, w, h); ctx.fillStyle = '#fff';
    const c = h * 0.18; ctx.fillRect(x + w / 2 - c / 2, y + h * 0.2, c, h * 0.6); ctx.fillRect(x + w / 2 - h * 0.3, y + h / 2 - c / 2, h * 0.6, c);
  }
  ctx.restore(); ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.strokeRect(x, y, w, h);
}
function star(ctx, x, y, r, n) {
  ctx.beginPath();
  for (let i = 0; i < n * 2; i++) { const a = (i / (n * 2)) * TAU - Math.PI / 2, rr = i % 2 ? r * 0.45 : r; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
  ctx.closePath(); ctx.fill();
}

// ---------------------------------------------------------------- S1 hook (0..4)
function sHook(ctx, u) {
  paperBg(ctx, u);
  ctx.save(); shake(ctx, u, 0, 10);
  words(ctx, 'Azərbaycan bunu', cx, s.y + 330, 92, C.ink, -0.7, u, { stagger: 0.012 });
  words(ctx, 'ABŞ-dan 2 il', cx, s.y + 500, 150, C.ink, -0.3, u, { stagger: 0.015 });
  ctx.restore();
  stamp(ctx, 'ƏVVƏL', cx, s.y + 720, 150, 1, u, -0.08);
  words(ctx, 'etdi. Nəyi?', cx, s.y + 960, 84, C.grey, 2.5, u, { weight: 500 });
}

// ---------------------------------------------------------------- S2 front page (4..13)
function sPage(ctx, u) {
  paperBg(ctx, u, C.paper2);
  const k = springU(u, 4, SPRING.snappy);
  const rot = lerp(-0.25, -0.02, Math.min(1, k)), sc = lerp(1.6, 1, Math.min(1, k));
  ctx.save(); ctx.translate(W / 2, H / 2 - 40); ctx.rotate(rot + 0.01 * Math.sin(u * 1.3)); ctx.scale(sc, sc); ctx.translate(-W / 2, -H / 2);
  const px = 70, py = 300, pw = W - 210, ph = 1250;
  ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(px + 14, py + 18, pw, ph);
  ctx.fillStyle = C.paper; ctx.fillRect(px, py, pw, ph);
  // masthead
  if (u > 4.4) {
    text(ctx, 'BAKI XƏBƏRLƏRİ', px + pw / 2, py + 110, font(78, 700, SERIF), C.ink, 'center', 2);
    ctx.fillStyle = C.ink; ctx.fillRect(px + 40, py + 140, pw - 80, 5); ctx.fillRect(px + 40, py + 200, pw - 80, 2);
    text(ctx, '1918  ·  AZƏRBAYCAN XALQ CÜMHURİYYƏTİ', px + pw / 2, py + 183, font(30, 600, UI), C.ink, 'center', 2);
  }
  // headline typed
  typed(ctx, 'QADINLAR', px + pw / 2, py + 330, 120, C.ink, 5.5, u, 0.08);
  typed(ctx, 'SƏS VERƏ BİLƏR', px + pw / 2, py + 450, 96, C.ink, 6.3, u, 0.06);
  // columns of fake body text (lines)
  for (let c = 0; c < 2; c++) for (let i = 0; i < 9; i++) {
    const a = clamp(prog(u, 6.8 + i * 0.05, 7.2 + i * 0.05)); if (a <= 0) continue;
    ctx.fillStyle = `rgba(26,23,20,${0.35 * a})`;
    const lx = px + 50 + c * (pw / 2), lw = pw / 2 - 90 - (i === 8 ? 120 : hash01(i + c * 9, 3) * 30);
    ctx.fillRect(lx, py + 520 + i * 34, lw * a, 12);
  }
  // ballot box + paper dropping in
  const bx = px + pw / 2, by = py + 1060;
  const bk = springU(u, 7.6, SPRING.snappy);
  if (bk > 0) {
    ctx.save(); ctx.translate(bx, by + (1 - Math.min(1, bk)) * 200); ctx.globalAlpha = Math.min(1, bk);
    ctx.fillStyle = C.ink; rrect(ctx, -170, -110, 340, 200, 14); ctx.fill();
    ctx.fillStyle = C.paper; ctx.fillRect(-90, -112, 180, 14);
    text(ctx, 'SEÇKİ', 0, 30, font(54, 800, UI), C.paper, 'center', 4);
    ctx.restore();
    const dk = E.inQuad(prog(u, 7.2, 8));
    if (u < 8.3) { ctx.save(); ctx.translate(bx, lerp(by - 520, by - 115, dk)); ctx.rotate(0.3 * (1 - dk)); ctx.fillStyle = '#fff'; ctx.fillRect(-60, -80, 120, 160); ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.strokeRect(-60, -80, 120, 160);
      ctx.strokeStyle = C.red; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-30, -10); ctx.lineTo(-5, 20); ctx.lineTo(35, -40); ctx.stroke(); ctx.restore(); }
  }
  ctx.restore();
  stamp(ctx, 'MÜSƏLMAN ŞƏRQİNDƏ İLK', cx, s.y + 860, 44, 9.5, u, -0.1);
}

// ---------------------------------------------------------------- S3 timeline (13..28)
const ROWS = [[14, 'az', '1918', 'Azərbaycan', true], [17, 'us', '1920', 'ABŞ'], [20, 'fr', '1944', 'Fransa'], [23, 'ch', '1971', 'İsveçrə']];
function sTimeline(ctx, u) {
  paperBg(ctx, u);
  const slide = E.outCubic(prog(u, 13, 13.6));
  ctx.save(); ctx.translate((1 - slide) * W, 0);
  text(ctx, 'Qadınlar nə vaxt', cx, s.y + 90, font(76, 700, SERIF), C.ink, 'center');
  text(ctx, 'səs verə bildi?', cx, s.y + 180, font(76, 700, SERIF), C.ink, 'center');
  // camera scroll so the newest row stays in view
  const scroll = 0;
  ctx.save(); ctx.translate(0, -scroll);
  const lineX = s.x + 70, top = s.y + 300;
  const lineK = clamp(prog(u, 13.6, 24));
  ctx.fillStyle = C.ink; ctx.fillRect(lineX - 3, top, 6, 820 * lineK);
  ROWS.forEach(([b, fl, yr, name, hi], i) => {
    const k = springU(u, b, SPRING.snappy); if (k <= 0) return;
    const y = top + 70 + i * 205;
    ctx.save(); ctx.translate((1 - Math.min(1, k)) * 300, 0); ctx.globalAlpha = Math.min(1, k * 1.3);
    ctx.fillStyle = hi ? C.red : C.ink; ctx.beginPath(); ctx.arc(lineX, y, hi ? 22 : 14, 0, TAU); ctx.fill();
    flag(ctx, fl, lineX + 50, y - 60, 180, 120);
    text(ctx, yr, lineX + 260, y + 10, font(hi ? 130 : 110, 700, SERIF), hi ? C.red : C.ink, 'left');
    text(ctx, name, lineX + 265, y + 70, font(46, 700, UI), C.ink, 'left');
    ctx.restore();
  });
  ctx.restore();
  // payoff: 53 years
  if (u > 25.6) {
    const k = springU(u, 26, SPRING.bouncy);
    ctx.save(); ctx.translate(cx, s.y + 1190); ctx.rotate(-0.05); ctx.scale(Math.min(1.08, k), Math.min(1.08, k));
    rrect(ctx, -400, -95, 800, 170, 24); ctx.fillStyle = C.red; ctx.fill();
    text(ctx, 'İsveçrə: 53 il sonra!', 0, 22, font(80, 800, UI), '#fff', 'center');
    ctx.restore();
  }
  ctx.restore();
}

// ---------------------------------------------------------------- S4 send (28..36) + S5 end (36..44)
function sSend(ctx, u) {
  paperBg(ctx, u, C.ink);
  const k = E.outCubic(prog(u, 27.8, 28.3));
  ctx.save(); ctx.translate(0, (1 - k) * H);
  words(ctx, '1918.', cx, s.y + 360, 260, C.red, 28.4, u);
  words(ctx, 'Bakıda qadınlar', cx, s.y + 560, 92, C.paper, 29.2, u);
  words(ctx, 'səs verirdi.', cx, s.y + 670, 92, C.paper, 29.8, u);
  if (u > 30.2) { const a = clamp(prog(u, 30.2, 30.7)); ctx.globalAlpha = a;
    text(ctx, 'Bunu bilməyən dostuna göndər', cx, s.y + 900, font(54, 700, UI), C.paper, 'center'); ctx.globalAlpha = 1; }
  ctx.restore();
}
function sEnd(ctx, u) {
  paperBg(ctx, u);
  const k = springU(u, 32.3, SPRING.bouncy);
  ctx.save(); ctx.translate(cx, s.y + 470); ctx.rotate(0.08 * Math.sin(u * 2)); ctx.scale(k, k);
  ctx.fillStyle = '#F2C230'; ctx.beginPath(); ctx.arc(0, 0, 150, 0, TAU); ctx.fill();
  ctx.lineWidth = 10; ctx.strokeStyle = C.ink; ctx.stroke();
  text(ctx, '?!', 0, 55, font(170, 800, UI), C.ink, 'center');
  ctx.restore();
  words(ctx, '@bilirdinizmi_az', cx, s.y + 760, 84, C.ink, 32.8, u, { fam: UI, weight: 700, track: 0 });
  if (u > 33.5) words(ctx, 'Hər gün bilmədiyin bir fakt', cx, s.y + 860, 56, C.grey, 33.5, u, { fam: UI, weight: 600, track: 0, stagger: 0.015 });
  if (u > 34.5) stamp(ctx, 'İZLƏ', cx, s.y + 1060, 90, 34.5, u, -0.1);
}

M.film({
  fonts: [font(100, 700, SERIF), font(40, 700, UI)],
  hits: HITS,
  draw(ctx, u) {
    if (u < 4) sHook(ctx, u);
    else if (u < 13) sPage(ctx, u);
    else if (u < 28) sTimeline(ctx, u);
    else if (u < 32) sSend(ctx, u);
    else sEnd(ctx, u);
  },
  post(ctx, u) {
    // print grain + vignette
    for (let i = 0; i < 700; i++) {
      ctx.fillStyle = `rgba(40,30,20,${0.04 + 0.04 * hash01(i, 9)})`;
      ctx.fillRect(hash01(i, Math.floor(u * 24)) * W, hash01(i + 5, Math.floor(u * 24) + 1) * H, 2, 2);
    }
    const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.75);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(40,25,10,0.28)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  },
});
