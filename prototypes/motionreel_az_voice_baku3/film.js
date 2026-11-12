// "Bakı haqqında 3 fakt" — bilirdinizmi_az demo: cream flat-illustration world, Banu voice, word-by-word captions,
// progress counter 0/3 → 3/3, something new every ~1 s. Timed in SECONDS (t) against the voice lines.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, layout, glyph, text, fill, rrect, hash01, clamp, TAU, ring } = M;

const C = { bg: '#F1E8D6', bg2: '#E8DCC3', ink: '#1E1B18', red: '#E0452B', yel: '#F5C431', blue: '#3A8FD0', sea: '#2F7FC0', green: '#3E9B5B', grey: '#8B8070', white: '#FFFDF7' };
const SERIF = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => spring(t - t0, cfg);

// ---- voice lines (seconds) — start, duration, text, keyword
const VO = [
  [0.25, 2.197, 'Bakı haqqında üç fakt. Üçüncüsünü çoxu bilmir.', ['üç', 'fakt.']],
  [2.75, 3.827, 'Bir. Bakı dəniz səviyyəsindən iyirmi səkkiz metr aşağıdadır.', ['iyirmi', 'səkkiz', 'metr']],
  [6.75, 2.136, 'Dünyanın ən aşağıda yerləşən paytaxtıdır.', ['ən', 'aşağıda']],
  [9.2, 4.651, 'İki. Min doqquz yüz on səkkizdə Azərbaycanda qadınlar artıq səs verirdi.', ['qadınlar', 'səs']],
  [14.0, 1.349, 'Amerikadan iki il əvvəl!', ['iki', 'il', 'əvvəl!']],
  [15.8, 4.230, 'Üç. Qız qalası və İçərişəhər iki min ildən UNESCO siyahısındadır.', ['UNESCO']],
  [20.4, 1.504, 'Bunu bilməyən dostuna göndər.', ['göndər.']],
];
// word timings ∝ word length
const WORDS = VO.map(([t0, d, str, keys]) => {
  const ws = str.split(' '), tot = ws.reduce((a, w) => a + w.length + 2, 0); let acc = 0;
  return ws.map((w) => { const st = t0 + (acc / tot) * d; acc += w.length + 2; return { w, t: st, key: keys.includes(w) }; });
});
const B = (sec) => sec / 0.5; // seconds -> beats for HITS
const HITS = [
  [B(0.2), 'BAKI slam', 'impact'], [B(1.3), '3 FAKT', 'thud'], [B(2.75), 'counter 1', 'click'],
  [B(3.2), 'skyline drop', 'whoosh', { len: 0.4, from: 1800, to: 500 }], [B(4.6), 'depth tick', 'tick'], [B(5.8), '-28', 'thud'],
  [B(6.8), 'stamp lowest', 'impact'], [B(9.0), 'whip', 'whoosh', { len: 0.35, from: 2400, to: 700 }], [B(9.2), 'counter 2', 'click'],
  [B(10.3), 'ballot drop', 'thud'], [B(11.6), '1918', 'impact'], [B(14.0), 'race', 'whoosh', { len: 0.5, from: 600, to: 1800 }],
  [B(14.9), '2 il əvvəl', 'impact'], [B(15.6), 'whip', 'whoosh', { len: 0.35, from: 2400, to: 700 }], [B(15.8), 'counter 3', 'click'],
  [B(16.4), 'tower rise', 'sub'], [B(18.6), 'UNESCO stamp', 'impact'], [B(20.2), 'plane', 'whoosh', { len: 0.6, from: 900, to: 2600 }],
  [B(21.4), 'handle', 'click'], [B(22.4), 'İZLƏ', 'thud'],
];

// ---------------------------------------------------------------- shared pieces
function bg(ctx, t, col = C.bg) {
  fill(ctx, col);
  ctx.fillStyle = 'rgba(120,90,40,0.06)';
  for (let i = 0; i < 90; i++) { const x = hash01(i, 3) * W, y = hash01(i, 4) * H; ctx.beginPath(); ctx.arc(x, y, 2 + hash01(i, 5) * 3, 0, TAU); ctx.fill(); }
}
function outline(ctx, w = 7) { ctx.lineWidth = w; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.stroke(); }
function popWords(ctx, str, x, y, size, color, t0, t, { fam = UI, weight = 800, stagger = 0.03 } = {}) {
  const f = font(size, weight, fam), L = layout(ctx, str, f, -0.01 * size), x0 = x - L.width / 2;
  L.glyphs.forEach((g, j) => { const k = sp(t, t0 + j * stagger, SPRING.bouncy); if (k <= 0.001) return;
    glyph(ctx, g.ch, x0 + g.cx, y + (1 - Math.min(1, k)) * size * 0.5, f, color, Math.min(1.15, k), Math.min(1.15, k)); });
}
function sticker(ctx, label, x, y, size, t0, t, { rot = -0.08, col = C.red, txt = C.white } = {}) {
  const k = sp(t, t0, SPRING.bouncy); if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot + 0.03 * ring(t - t0, 2.5, 4)); ctx.scale(k, k);
  ctx.font = font(size, 800, UI); const w = ctx.measureText(label).width + size * 0.9, h = size * 1.4;
  rrect(ctx, -w / 2 - 10, -h / 2 - 10, w + 20, h + 20, 22); ctx.fillStyle = C.white; ctx.fill(); outline(ctx, 6);
  rrect(ctx, -w / 2, -h / 2, w, h, 16); ctx.fillStyle = col; ctx.fill();
  text(ctx, label, 0, size * 0.36, font(size, 800, UI), txt, 'center');
  ctx.restore();
}
// word-by-word captions at the top (chunks of ≤ 3 words, centred, fitted to the safe width)
function captions(ctx, t) {
  const li = VO.findIndex(([t0], i) => t >= t0 - 0.05 && t < (VO[i + 1] ? VO[i + 1][0] - 0.05 : 99));
  if (li < 0) return;
  const all = WORDS[li], ws = all.filter((w) => t >= w.t); if (!ws.length) return;
  const start = Math.floor((ws.length - 1) / 3) * 3, chunk = all.slice(start, start + 3), shown = ws.slice(start);
  let size = 84; const gap = 24;
  ctx.textAlign = 'left';
  const meas = (sz) => { ctx.font = font(sz, 800, UI); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 40) { size = Math.floor(size * (s.w - 40) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 150;
  shown.forEach((w, i) => {
    const k = sp(t, w.t, SPRING.bouncy), sc = Math.min(1.12, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc);
    ctx.font = font(size, 800, UI); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.18; ctx.strokeStyle = C.ink; ctx.strokeText(w.w, 0, 0);
    ctx.fillStyle = w.key ? C.yel : C.white; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap;
  });
}
// progress machine, bottom-left
function counter(ctx, t) {
  const k = sp(t, 1.6, SPRING.snappy); if (k <= 0) return;
  const n = t >= 15.8 ? 3 : t >= 9.2 ? 2 : t >= 2.75 ? 1 : 0, last = [2.75, 9.2, 15.8][n - 1] || 0;
  const x = cx - 165, y = s.y + 210, w = 330, h = 170;
  ctx.save(); ctx.translate(x, y - (1 - Math.min(1, k)) * 400); ctx.translate(165, 85); ctx.scale(0.7, 0.7); ctx.translate(-165, -85);
  rrect(ctx, 0, 0, w, h, 24); ctx.fillStyle = '#2B2826'; ctx.fill(); outline(ctx, 6);
  for (let i = 0; i < 3; i++) {
    const on = i < n, kk = on ? sp(t, [2.75, 9.2, 15.8][i], SPRING.bouncy) : 0;
    const bx = 24 + i * 72, by = 40;
    rrect(ctx, bx, by, 58, 90, 12); ctx.fillStyle = on ? C.yel : '#45413D'; ctx.fill();
    if (on) { ctx.save(); ctx.translate(bx + 29, by + 45); ctx.scale(Math.min(1.2, kk), Math.min(1.2, kk));
      text(ctx, String(i + 1), 0, 18, font(52, 800, UI), C.ink, 'center'); ctx.restore(); }
  }
  const pulse = n ? 1 + 0.25 * Math.max(0, ring(t - last, 3, 6)) : 1;
  ctx.save(); ctx.translate(278, 90); ctx.scale(pulse, pulse);
  text(ctx, `${n}/3`, 0, 18, font(54, 800, UI), n === 3 ? C.yel : C.white, 'center'); ctx.restore();
  ctx.restore();
}
// slide transition (both scenes on screen)
function whip(ctx, t, t0, drawA, drawB, dur = 0.35) {
  const p = E.inOutCubic(prog(t, t0, t0 + dur));
  if (p <= 0) return drawA();
  if (p >= 1) return drawB();
  ctx.save(); ctx.translate(-p * W, 0); drawA(); ctx.restore();
  ctx.save(); ctx.translate((1 - p) * W, 0); drawB(); ctx.restore();
}

// ---------------------------------------------------------------- scene 0: hook (0–2.6)
function sHook(ctx, t) {
  bg(ctx, t);
  const letters = 'BAKI'.split(''), size = 330, f = font(size, 800, UI);
  ctx.font = f; const tw = letters.reduce((a, c) => a + ctx.measureText(c).width, 0) + 30 * 3; let x = cx - tw / 2;
  letters.forEach((ch, i) => {
    const k = sp(t, -0.08 + i * 0.1, SPRING.bouncy), w = ctx.measureText(ch).width;
    if (k > 0) { ctx.save(); ctx.translate(x + w / 2, s.y + 760); ctx.rotate((i % 2 ? 0.06 : -0.06) * (1 - Math.min(1, k)) * 4);
      ctx.scale(Math.min(1.1, k), Math.min(1.1, k));
      ctx.lineWidth = 22; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.textAlign = 'center'; ctx.strokeText(ch, 0, 0);
      ctx.fillStyle = [C.blue, C.red, C.green, C.yel][i]; ctx.fillText(ch, 0, 0); ctx.restore(); }
    x += w + 30;
  });
  sticker(ctx, '3 FAKT', cx + 150, s.y + 930, 80, 1.3, t, { rot: 0.07, col: C.ink, txt: C.yel });
  // little sparks
  for (let i = 0; i < 8; i++) { const k = clamp(prog(t, 0.25, 0.8)); if (k <= 0 || k >= 1) continue;
    const a = (i / 8) * TAU, r = 200 + 320 * E.outCubic(k); ctx.fillStyle = C.yel; ctx.globalAlpha = 1 - k;
    ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, s.y + 660 + Math.sin(a) * r * 0.6, 14, 0, TAU); ctx.fill(); ctx.globalAlpha = 1; }
}

// ---------------------------------------------------------------- scene 1: −28 m (2.6–9.0)
function building(ctx, x, w, h, col, base) { ctx.beginPath(); ctx.rect(x, base - h, w, h); ctx.fillStyle = col; ctx.fill(); outline(ctx, 6);
  ctx.fillStyle = 'rgba(255,253,247,0.75)'; for (let r = 0; r < Math.floor(h / 70); r++) for (let c = 0; c < Math.floor(w / 46); c++) ctx.fillRect(x + 14 + c * 46, base - h + 22 + r * 70, 20, 30); }
function flame(ctx, x, base, h, w) { ctx.beginPath(); ctx.moveTo(x - w / 2, base); ctx.quadraticCurveTo(x - w * 0.6, base - h * 0.6, x, base - h);
  ctx.quadraticCurveTo(x + w * 0.55, base - h * 0.55, x + w / 2, base); ctx.closePath(); ctx.fillStyle = C.blue; ctx.fill(); outline(ctx, 6); }
function sSea(ctx, t) {
  bg(ctx, t, C.bg); ctx.save(); M.zoomAbout(ctx, 1.12, cx, s.y + 500);
  const seaY = s.y + 620;
  // city sinks below the sea line
  const drop = E.outBack(prog(t, 3.2, 4.0)) * 300;
  const base = seaY + 80 + drop * 1.1;
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.clip();
  building(ctx, s.x + 40, 130, 220, C.bg2, base); building(ctx, s.x + 520, 150, 250, C.bg2, base);
  flame(ctx, cx - 110, base, 330, 120); flame(ctx, cx, base, 300, 110); flame(ctx, cx + 105, base, 270, 100);
  // water above the city
  ctx.fillStyle = 'rgba(58,143,208,0.18)'; ctx.fillRect(0, 0, W * clamp(prog(t, 2.8, 3.3)), seaY);
  ctx.restore();
  // sea surface line (waves) at "0 m"
  const wk = clamp(prog(t, 2.8, 3.3));
  ctx.save(); ctx.globalAlpha = 0.92;
  ctx.beginPath(); ctx.moveTo(0, seaY);
  for (let x = 0; x <= W * wk; x += 10) ctx.lineTo(x, seaY + 14 * Math.sin(x / 60 + t * 4));
  ctx.lineTo(W * wk, seaY - 220); ctx.lineTo(0, seaY - 220); ctx.closePath(); ctx.fillStyle = 'rgba(47,127,192,0.0)'; ctx.fill();
  ctx.beginPath(); for (let x = 0; x <= W * wk; x += 10) ctx.lineTo(x, seaY + 14 * Math.sin(x / 60 + t * 4)); ctx.lineWidth = 12; ctx.strokeStyle = C.sea; ctx.stroke();
  ctx.restore();
  if (t > 3.0) text(ctx, 'dəniz səviyyəsi · 0 m', s.x + s.w - 20, seaY - 30, font(40, 700, UI), C.sea, 'right');
  // depth ruler + counter
  const dk = E.outCubic(prog(t, 4.4, 6.0)), depth = Math.round(28 * dk);
  if (t > 4.3) {
    const rx = s.x + s.w - 110; ctx.fillStyle = C.ink; ctx.fillRect(rx, seaY, 8, 300 * dk + 4);
    for (let i = 0; i <= 28 * dk; i += 4) ctx.fillRect(rx - 24, seaY + (i / 28) * 300, 24, 5);
    ctx.save(); ctx.translate(cx + 120, seaY + 470); const pk = 1 + 0.2 * Math.max(0, ring(t - 6.0, 3, 6)); ctx.scale(pk, pk);
    ctx.lineWidth = 16; ctx.strokeStyle = C.ink; ctx.font = font(170, 800, UI); ctx.textAlign = 'center'; ctx.strokeText(`−${depth} m`, 0, 0);
    ctx.fillStyle = C.red; ctx.fillText(`−${depth} m`, 0, 0); ctx.restore();
  }
  sticker(ctx, 'DÜNYANIN ƏN AŞAĞI PAYTAXTI', cx, s.y + 1180, 50, 6.8, t, { rot: -0.06 });
  ctx.restore();
}

// ---------------------------------------------------------------- scene 2: 1918 (9.0–15.6)
function flagAZ(ctx, x, y, w, h) { ['#00B5E2', '#EF3340', '#509E2F'].forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(x, y + i * h / 3, w, h / 3 + 1); });
  const mx = x + w * 0.47, my = y + h / 2, r = h * 0.12; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(mx, my, r, 0, TAU); ctx.fill();
  ctx.fillStyle = '#EF3340'; ctx.beginPath(); ctx.arc(mx + r * 0.25, my, r * 0.8, 0, TAU); ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.strokeRect(x, y, w, h); }
function flagUS(ctx, x, y, w, h) { for (let i = 0; i < 13; i++) { ctx.fillStyle = i % 2 ? '#fff' : '#B22234'; ctx.fillRect(x, y + i * h / 13, w, h / 13 + 1); }
  ctx.fillStyle = '#3C3B6E'; ctx.fillRect(x, y, w * 0.4, h * 7 / 13); ctx.strokeStyle = C.ink; ctx.lineWidth = 5; ctx.strokeRect(x, y, w, h); }
function sVote(ctx, t) {
  bg(ctx, t, C.bg); ctx.save(); M.zoomAbout(ctx, 1.12, cx, s.y + 500);
  if (t < 14.0) {
    // ballot box
    const bx = cx, by = s.y + 1000, bk = sp(t, 9.3, SPRING.bouncy);
    ctx.save(); ctx.translate(bx, by + (1 - Math.min(1, bk)) * 400);
    rrect(ctx, -230, -150, 460, 300, 26); ctx.fillStyle = C.red; ctx.fill(); outline(ctx, 8);
    ctx.fillStyle = C.ink; ctx.fillRect(-120, -154, 240, 18);
    text(ctx, 'SEÇKİ', 0, 40, font(90, 800, UI), C.white, 'center');
    ctx.restore();
    // ballot paper drops in
    const dk = E.inQuad(prog(t, 9.8, 10.3));
    if (t > 9.8 && t < 10.35) { ctx.save(); ctx.translate(bx, lerp(by - 720, by - 160, dk)); ctx.rotate(0.4 * (1 - dk));
      rrect(ctx, -80, -105, 160, 210, 10); ctx.fillStyle = C.white; ctx.fill(); outline(ctx, 6);
      ctx.strokeStyle = C.green; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(-8, 34); ctx.lineTo(44, -40); ctx.stroke(); ctx.restore(); }
    // woman icon (generic, faceless) next to the box
    const wk = sp(t, 10.6, SPRING.bouncy);
    if (wk > 0) { ctx.save(); ctx.translate(s.x + 150, s.y + 1040); ctx.scale(wk, wk);
      ctx.beginPath(); ctx.arc(0, -170, 60, 0, TAU); ctx.fillStyle = '#5B4636'; ctx.fill(); outline(ctx, 6);
      ctx.beginPath(); ctx.moveTo(-90, 120); ctx.lineTo(-60, -90); ctx.lineTo(60, -90); ctx.lineTo(90, 120); ctx.closePath(); ctx.fillStyle = C.yel; ctx.fill(); outline(ctx, 6);
      ctx.restore(); }
    // big 1918
    const yk = sp(t, 11.6, SPRING.bouncy);
    if (yk > 0) { ctx.save(); ctx.translate(cx, s.y + 640); ctx.scale(Math.min(1.1, yk), Math.min(1.1, yk)); ctx.rotate(-0.04);
      ctx.lineWidth = 24; ctx.strokeStyle = C.ink; ctx.lineJoin = 'round'; ctx.font = font(300, 800, UI); ctx.textAlign = 'center';
      ctx.strokeText('1918', 0, 0); ctx.fillStyle = C.yel; ctx.fillText('1918', 0, 0); ctx.restore(); }
  } else {
    // race: AZ 1918 vs USA 1920
    const rows = [[s.y + 560, flagAZ, '1918', 'Azərbaycan', 13.85, C.green], [s.y + 860, flagUS, '1920', 'ABŞ', 14.05, C.grey]];
    rows.forEach(([y, fl, yr, name, t0, col]) => {
      const k = sp(t, t0, SPRING.snappy); if (k <= 0) return;
      ctx.save(); ctx.translate((1 - Math.min(1, k)) * -600, 0);
      fl(ctx, s.x + 30, y - 70, 180, 120);
      text(ctx, name, s.x + 240, y - 10, font(52, 800, UI), C.ink, 'left');
      const bw = (yr === '1918' ? 300 : 470) * E.outCubic(prog(t, t0, t0 + 0.6));
      rrect(ctx, s.x + 240, y + 20, bw, 80, 20); ctx.fillStyle = col; ctx.fill(); outline(ctx, 6);
      text(ctx, yr, s.x + 260 + bw, y + 90, font(96, 800, UI), C.ink, 'left');
      ctx.restore();
    });
    sticker(ctx, '2 İL ƏVVƏL!', cx, s.y + 1150, 92, 14.9, t, { rot: -0.07 });
  }
  ctx.restore();
}

// ---------------------------------------------------------------- scene 3: Qız qalası (15.6–20.2)
function tower(ctx, x, base, h, w) {
  // main cylinder
  ctx.beginPath(); ctx.moveTo(x - w / 2, base); ctx.lineTo(x - w / 2, base - h); ctx.quadraticCurveTo(x, base - h - 30, x + w / 2, base - h); ctx.lineTo(x + w / 2, base); ctx.closePath();
  ctx.fillStyle = '#D9C39A'; ctx.fill(); outline(ctx, 8);
  // buttress on the right
  ctx.beginPath(); ctx.moveTo(x + w / 2 - 6, base); ctx.lineTo(x + w / 2 - 6, base - h * 0.92); ctx.lineTo(x + w / 2 + 90, base - h * 0.88); ctx.lineTo(x + w / 2 + 110, base); ctx.closePath();
  ctx.fillStyle = '#C9AF82'; ctx.fill(); outline(ctx, 8);
  // stone rows
  ctx.strokeStyle = 'rgba(30,27,24,0.25)'; ctx.lineWidth = 3;
  for (let y = base - 50; y > base - h + 20; y -= 50) { ctx.beginPath(); ctx.moveTo(x - w / 2 + 8, y); ctx.lineTo(x + w / 2 - 8, y); ctx.stroke(); }
  // windows
  ctx.fillStyle = C.ink; [0.3, 0.55, 0.8].forEach((f) => { rrect(ctx, x - 14, base - h * f, 28, 50, 14); ctx.fill(); });
}
function sTower(ctx, t) {
  bg(ctx, t, C.bg);
  // sun
  const sk = sp(t, 15.9, SPRING.gentle || SPRING.snappy);
  if (sk > 0) { ctx.save(); ctx.translate(s.x + s.w - 160, s.y + 400); ctx.rotate(t * 0.6); ctx.scale(sk, sk);
    for (let i = 0; i < 10; i++) { ctx.rotate(TAU / 10); ctx.fillStyle = C.yel; ctx.fillRect(-8, -150, 16, 50); }
    ctx.beginPath(); ctx.arc(0, 0, 80, 0, TAU); ctx.fillStyle = C.yel; ctx.fill(); outline(ctx, 6); ctx.restore(); }
  const base = s.y + 1250, rise = E.outBack(prog(t, 15.85, 16.7));
  ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, base); ctx.clip();
  tower(ctx, cx - 60, base + (1 - rise) * 900, 720, 300);
  ctx.restore();
  // old city wall slides in
  const wk = E.outCubic(prog(t, 16.5, 17.1));
  ctx.save(); ctx.translate((1 - wk) * -W, 0);
  ctx.beginPath(); ctx.rect(0, base - 120, W, 140); ctx.fillStyle = '#C9AF82'; ctx.fill(); outline(ctx, 8);
  for (let x = 20; x < W; x += 110) { ctx.beginPath(); ctx.rect(x, base - 170, 60, 52); ctx.fillStyle = '#C9AF82'; ctx.fill(); outline(ctx, 6); }
  ctx.restore();
  text(ctx, 'İçərişəhər', cx, base + 110, font(64, 800, UI), C.ink, 'center');
  sticker(ctx, 'UNESCO · 2000', cx + 120, s.y + 460, 74, 18.6, t, { rot: 0.08, col: C.blue });
}

// ---------------------------------------------------------------- scene 4: send + end (20.2–24)
function sEnd(ctx, t) {
  bg(ctx, t, C.bg2);
  // paper plane flies across
  const pk = E.inOutCubic(prog(t, 20.2, 21.4));
  if (t < 21.6) { const x = lerp(-150, W + 150, pk), y = s.y + 700 - Math.sin(pk * Math.PI) * 260;
    ctx.save(); ctx.translate(x, y); ctx.rotate(-0.25 + pk * 0.3);
    ctx.beginPath(); ctx.moveTo(110, 0); ctx.lineTo(-90, -70); ctx.lineTo(-40, 0); ctx.lineTo(-90, 70); ctx.closePath(); ctx.fillStyle = C.white; ctx.fill(); outline(ctx, 7);
    ctx.restore(); for (let i = 1; i < 8; i++) { const q = pk - i * 0.025; if (q < 0) break; ctx.fillStyle = 'rgba(30,27,24,0.3)';
      ctx.beginPath(); ctx.arc(lerp(-150, W + 150, q) - 90, s.y + 700 - Math.sin(q * Math.PI) * 260, 7, 0, TAU); ctx.fill(); } }
  const bk = sp(t, 21.2, SPRING.bouncy);
  if (bk > 0) { ctx.save(); ctx.translate(cx, s.y + 640); ctx.rotate(0.06 * Math.sin(t * 2.4)); ctx.scale(Math.min(1.1, bk), Math.min(1.1, bk));
    ctx.beginPath(); ctx.arc(0, 0, 160, 0, TAU); ctx.fillStyle = C.yel; ctx.fill(); outline(ctx, 10);
    text(ctx, '?!', 0, 62, font(190, 800, UI), C.ink, 'center'); ctx.restore(); }
  if (t > 21.4) popWords(ctx, '@bilirdinizmi_az', cx, s.y + 950, 82, C.ink, 21.4, t, { stagger: 0.02 });
  if (t > 21.9) popWords(ctx, 'Hər gün bilmədiyin bir fakt', cx, s.y + 1050, 50, C.grey, 21.9, t, { weight: 700, stagger: 0.012 });
  sticker(ctx, 'İZLƏ', cx, s.y + 1250, 96, 22.4, t, { rot: -0.08 });
}

M.film({
  fonts: [font(100, 700, SERIF), font(40, 800, UI)],
  hits: HITS,
  draw(ctx, u, t) {
    if (t < 2.6) sHook(ctx, t);
    else if (t < 9.0) whip(ctx, t, 2.6, () => sHook(ctx, t), () => sSea(ctx, t));
    else if (t < 15.6) whip(ctx, t, 9.0, () => sSea(ctx, t), () => sVote(ctx, t));
    else if (t < 20.2) whip(ctx, t, 15.6, () => sVote(ctx, t), () => sTower(ctx, t));
    else whip(ctx, t, 20.2, () => sTower(ctx, t), () => sEnd(ctx, t));
    if (t < 20.3) counter(ctx, t);
    captions(ctx, t);
  },
  post(ctx, u, t) {
    for (let i = 0; i < 500; i++) { ctx.fillStyle = `rgba(60,40,20,${0.03 + 0.03 * hash01(i, 9)})`;
      ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); }
  },
});
