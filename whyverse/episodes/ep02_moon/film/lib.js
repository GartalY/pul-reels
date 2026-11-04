// Whyverse ep02 prop + HUD library ("realistic 3D + flat data overlays"). Pure functions of their args + t.
// Rule from FEEDBACK 2026-11-04: nothing boils (flat style, text static), camera shake only on impacts (≤ 6 px, ≤ 0.3 s).
(function () {
  const G = globalThis.G, U = globalThis.U, Data = globalThis.Data;
  const { clamp, lerp, ease } = U;
  const P = {};
  const C = P.C = {
    space: '#04060C', navy: '#1B2350', navyD: '#0E1330', night: '#141a3d', gold: '#FFC43D', amber: '#F2B84B', coral: '#EF7B5B',
    planet: '#4FA3E0', ice: '#BFE3FF', white: '#FAFAFC', dim: '#AAB3C5', glass: 'rgba(7,10,22,0.74)', line: 'rgba(255,255,255,0.12)',
    sea: '#1E5C8C', seaD: '#0F2F52', sand: '#D9C08E', green: '#4E9C6A', red: '#E5484D', moon: '#D9D4CC', moonD: '#A49E95', pink: '#F59AB8',
  };
  P.FT = { title: 'Bungee', ui: 'Inter', hand: 'Caveat', mono: 'Inter' };
  const pop = P.pop = (t, t0, d = 0.32, s = 2.0) => (t < t0 ? 0 : ease.outBack(clamp((t - t0) / d), s));
  const fin = P.fin = (t, t0, d = 0.3) => clamp((t - t0) / d);
  const fout = P.fout = (t, t1, d = 0.3) => 1 - clamp((t - (t1 - d)) / d);
  P.win = (t, t0, t1, d = 0.3) => Math.min(fin(t, t0, d), fout(t, t1, d));
  P.at = (ctx, x, y, s, rot, fn) => { ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot); if (s !== 1) ctx.scale(s, s); fn(); ctx.restore(); };
  P.ss = (x) => x * x * (3 - 2 * x);
  P.eio = (x) => ease.inOutCubic(clamp(x));
  const hex = (h) => { const m = /^#?([0-9a-f]{6})$/i.exec(h || ''); if (!m) return null; const n = parseInt(m[1], 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  P.mix = (a, b, k) => { const pa = hex(a), pb = hex(b); if (!pa || !pb) return a; const f = (i) => Math.round(pa[i] + (pb[i] - pa[i]) * k); return `rgb(${f(0)},${f(1)},${f(2)})`; };

  // ---------- text ----------
  P.text = (ctx, s, x, y, o = {}) => G.text(ctx, s, x, y, Object.assign({ size: 54, fam: P.FT.ui, weight: 800, color: C.white, boil: 0 }, o));
  P.label = (ctx, s, x, y, o = {}) => G.text(ctx, s.toUpperCase(), x, y, Object.assign({ size: 30, fam: P.FT.ui, weight: 700, color: C.dim, boil: 0 }, o));
  P.measure = (ctx, s, size, fam = P.FT.ui, w = 800) => G.measure(ctx, s, size, fam, w);
  // rounded rect path (crisp, no wobble)
  P.rr = (ctx, x, y, w, h, r) => { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); };
  P.panel = (ctx, x, y, w, h, { r = 26, fill = C.glass, stroke = 'rgba(255,255,255,0.10)', lw = 2, glow = 0 } = {}) => {
    ctx.save(); if (glow) { ctx.shadowColor = 'rgba(255,196,61,' + glow + ')'; ctx.shadowBlur = 30; }
    P.rr(ctx, x, y, w, h, r); ctx.fillStyle = fill; ctx.fill(); ctx.shadowBlur = 0; if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); } ctx.restore();
  };
  // a pill tag with text (pops at t0, fades by t1)
  P.tag = (ctx, s, x, y, t, t0, t1 = 1e9, { size = 40, fill = C.glass, color = C.white, border = C.gold, align = 'center', fam = P.FT.ui, weight = 800, pad = 26, rot = 0 } = {}) => {
    const k = pop(t, t0) * fout(t, t1, 0.25); if (k <= 0.01) return;
    const w = P.measure(ctx, s, size, fam, weight) + pad * 2, h = size * 1.55;
    const ox = align === 'left' ? w / 2 : align === 'right' ? -w / 2 : 0;
    ctx.save(); ctx.translate(x + ox, y); ctx.rotate(rot); ctx.scale(k, k); ctx.globalAlpha *= clamp(k * 1.5);
    P.panel(ctx, -w / 2, -h / 2, w, h, { r: h / 2, fill, stroke: border, lw: 3 });
    G.text(ctx, s, 0, size * 0.36, { size, fam, weight, color, align: 'center', boil: 0 });
    ctx.restore();
    return w;
  };
  // stamp: a bold outlined word that slams down at t0 (no shake by default)
  P.stamp = (ctx, s, x, y, t, t0, { size = 92, color = C.gold, rot = -0.06, t1 = 1e9, fam = P.FT.title, fill = 'rgba(7,10,22,0.6)' } = {}) => {
    if (t < t0) return; const a = clamp((t - t0) / 0.14), k = lerp(1.9, 1, ease.outCubic(a)) * fout(t, t1, 0.3);
    if (k <= 0.01) return;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.globalAlpha *= clamp(a * 2);
    const w = P.measure(ctx, s, size, fam, 400) + 64, h = size * 1.4;
    P.rr(ctx, -w / 2, -h / 2, w, h, 18); ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = color; ctx.lineWidth = 8; ctx.stroke();
    G.text(ctx, s, 0, size * 0.36, { size, fam, weight: 400, color, align: 'center', boil: 0 });
    ctx.restore();
  };
  // big counter on a glass card
  P.counter = (ctx, { x, y, from = 0, to, t, t0, t1, size = 120, color = C.gold, prefix = '', suffix = '', decimals = 0, sub = '', subSize = 36, card = true, alpha = 1, tEnd = 1e9, fmt }) => {
    const k = pop(t, t0 - 0.25, 0.35) * fout(t, tEnd, 0.3); if (k <= 0.01 || alpha <= 0) return;
    const v = Data.count(t, t0, t1, from, to, ease.outCubic);
    const f = fmt || ((n) => Data.number(n, { decimals }));
    const str = prefix + f(v) + suffix, strF = prefix + f(to) + suffix;
    const land = t >= t1 ? Math.exp(-(t - t1) * 8) : 0;
    const w = Math.max(P.measure(ctx, strF, size, P.FT.title, 400), sub ? P.measure(ctx, sub, subSize, P.FT.ui, 700) : 0) + 90, h = size * 1.25 + (sub ? subSize * 1.5 : 0);
    ctx.save(); ctx.translate(x, y); ctx.scale(k * (1 + 0.06 * land), k * (1 + 0.06 * land)); ctx.globalAlpha *= alpha * clamp(k * 1.4);
    if (card) P.panel(ctx, -w / 2, -size * 0.95, w, h + 10, { glow: 0.25 * land });
    G.text(ctx, str, 0, size * 0.18, { size, fam: P.FT.title, weight: 400, color, align: 'center', boil: 0 });
    if (sub) G.text(ctx, sub.toUpperCase(), 0, size * 0.2 + subSize * 1.35, { size: subSize, fam: P.FT.ui, weight: 700, color: C.dim, align: 'center', boil: 0 });
    ctx.restore();
  };
  // headline words that stamp in one by one at given times
  P.words = (ctx, words, x, y, t, { size = 84, fam = P.FT.title, color = C.white, key = {}, lh = 1.15, maxW = 1600, align = 'left', t1 = 1e9, weight = 400, shadow = true } = {}) => {
    let xx = 0, yy = 0; const sp = P.measure(ctx, ' ', size, fam, weight); const lines = [[]];
    for (const w of words) { const ww = P.measure(ctx, w.w, size, fam, weight); if (xx + ww > maxW && xx > 0) { xx = 0; yy += size * lh; lines.push([]); } lines[lines.length - 1].push({ ...w, x: xx, y: yy, ww }); xx += ww + sp; }
    const k1 = fout(t, t1, 0.3); if (k1 <= 0) return;
    for (const ln of lines) { const lw = ln.length ? ln[ln.length - 1].x + ln[ln.length - 1].ww : 0; const ox = align === 'center' ? -lw / 2 : 0;
      for (const w of ln) { const k = pop(t, w.t, 0.25, 2.2); if (k <= 0) continue;
        P.at(ctx, x + ox + w.x, y + w.y, k * k1, 0, () => { if (shadow) { ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 24; }
          G.text(ctx, w.w, 0, 0, { size, fam, weight, color: key[w.w] || w.color || color, boil: 0 }); ctx.shadowBlur = 0; }); } }
  };
  // spoken caption-style line (words light up as spoken) — used for key quotes, not subtitles
  P.spoken = (ctx, line, x, y, t, { size = 64, maxW = 1500, color = C.white, dimA = 0.3, key = /\?$/, keyColor = C.gold, align = 'center', fam = P.FT.ui, weight = 800 } = {}) => {
    const sp = P.measure(ctx, ' ', size, fam, weight); const lines = [[]]; let xx = 0;
    for (const w of line.words) { const ww = P.measure(ctx, w.w, size, fam, weight); if (xx + ww > maxW && xx > 0) { lines.push([]); xx = 0; } lines[lines.length - 1].push({ ...w, x: xx, ww }); xx += ww + sp; }
    lines.forEach((ln, li) => { const lw = ln.length ? ln[ln.length - 1].x + ln[ln.length - 1].ww : 0; const ox = align === 'center' ? -lw / 2 : 0;
      for (const w of ln) { const q = clamp((t - w.t) / 0.12); const isK = key.test(w.w);
        G.text(ctx, w.w, x + ox + w.x, y + li * size * 1.2, { size, fam, weight, color: isK ? keyColor : color, alpha: dimA + (1 - dimA) * q, boil: 0 }); } });
    return lines.length;
  };

  // ---------- HUD bits ----------
  // top-left section label: gold dash + mono caps (like the Moon test)
  P.kicker = (ctx, s, t, t0, { x = 110, y = 110, t1 = 1e9 } = {}) => {
    const a = P.win(t, t0, t1, 0.35); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.gold; ctx.fillRect(x, y - 12, 46 * ease.outCubic(a), 5);
    G.text(ctx, s.toUpperCase(), x + 66, y, { size: 28, fam: P.FT.ui, weight: 700, color: C.dim, boil: 0 }); ctx.restore();
  };
  // a leader-line label attached to a point (e.g. a projected 3D position)
  P.callout = (ctx, s, px, py, t, t0, { dx = 160, dy = -110, size = 36, t1 = 1e9, color = C.white, border = C.gold, sub = '' } = {}) => {
    const a = P.win(t, t0, t1, 0.3); if (a <= 0) return; const k = ease.outCubic(a);
    ctx.save(); ctx.globalAlpha *= a;
    ctx.strokeStyle = border; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + dx * 0.6 * k, py + dy * k); ctx.lineTo(px + dx * k, py + dy * k); ctx.stroke();
    ctx.fillStyle = border; ctx.beginPath(); ctx.arc(px, py, 7, 0, 7); ctx.fill();
    ctx.restore();
    P.tag(ctx, s, px + dx + (dx >= 0 ? 0 : 0), py + dy, t, t0 + 0.15, t1, { size, align: dx >= 0 ? 'left' : 'right', color, border });
    if (sub) G.text(ctx, sub.toUpperCase(), px + dx + (dx >= 0 ? 26 : -26), py + dy + size * 1.5, { size: 24, fam: P.FT.ui, weight: 700, color: C.dim, align: dx >= 0 ? 'left' : 'right', alpha: a, boil: 0 });
  };
  // arrow (2D) from a to b
  P.arrow = (ctx, ax, ay, bx, by, { color = C.gold, lw = 8, head = 26, k = 1, alpha = 1 } = {}) => {
    if (k <= 0.001 || alpha <= 0) return; const ex = lerp(ax, bx, k), ey = lerp(ay, by, k); const ang = Math.atan2(ey - ay, ex - ax);
    ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ex - Math.cos(ang) * head * 0.6, ey - Math.sin(ang) * head * 0.6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - Math.cos(ang - 0.45) * head, ey - Math.sin(ang - 0.45) * head); ctx.lineTo(ex - Math.cos(ang + 0.45) * head, ey - Math.sin(ang + 0.45) * head); ctx.closePath(); ctx.fill();
    ctx.restore();
  };
  P.glow = (ctx, x, y, r, color = 'rgba(255,220,150,', a = 1) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, color + (0.9 * a) + ')'); g.addColorStop(0.3, color + (0.35 * a) + ')'); g.addColorStop(1, color + '0)');
    ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
  };
  P.sparkle = (ctx, x, y, t, t0, { n = 12, r = 80, color = '#FFD25A', seed = 1 } = {}) => {
    const a = t - t0; if (a < 0 || a > 0.7) return; const k = a / 0.7;
    for (let i = 0; i < n; i++) { const ang = (i / n) * 6.283 + U.hash(i, seed) * 0.6, d = r * ease.outCubic(k) * (0.6 + 0.6 * U.hash(i, seed + 1));
      ctx.fillStyle = color; ctx.globalAlpha = 1 - k; ctx.beginPath(); ctx.arc(x + Math.cos(ang) * d, y + Math.sin(ang) * d, 6 * (1 - k) + 2, 0, 7); ctx.fill(); }
    ctx.globalAlpha = 1;
  };
  P.ring = (ctx, x, y, t, t0, { r = 120, color = '255,196,61', dur = 0.8, lw = 6 } = {}) => {
    const a = (t - t0) / dur; if (a < 0 || a > 1) return; ctx.save(); ctx.strokeStyle = `rgba(${color},${1 - a})`; ctx.lineWidth = lw * (1 - a) + 1;
    ctx.beginPath(); ctx.arc(x, y, r * ease.outCubic(a), 0, 7); ctx.stroke(); ctx.restore();
  };
  // horizontal bar
  P.hbar = (ctx, { x, y, w, h = 56, frac, t, t0, d = 0.8, color = C.gold, label = '', value = '', labelSize = 34, track = 'rgba(255,255,255,0.08)', t1 = 1e9 }) => {
    const k = ease.outCubic(clamp((t - t0) / d)); const a = fin(t, t0 - 0.2, 0.3) * fout(t, t1, 0.3); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a;
    P.rr(ctx, x, y, w, h, h / 2); ctx.fillStyle = track; ctx.fill();
    if (k > 0.01) { P.rr(ctx, x, y, Math.max(h, w * frac * k), h, h / 2); ctx.fillStyle = color; ctx.fill(); }
    if (label) G.text(ctx, label.toUpperCase(), x, y - 18, { size: labelSize, fam: P.FT.ui, weight: 700, color: C.dim, boil: 0 });
    if (value) G.text(ctx, value, x + Math.max(h, w * frac * k) + 22, y + h * 0.75, { size: h * 0.85, fam: P.FT.title, weight: 400, color: C.white, alpha: fin(t, t0 + d * 0.6, 0.3), boil: 0 });
    ctx.restore();
  };
  // starfield (2D, for flat scenes)
  P.stars = (ctx, t, { n = 220, a = 1, seed = 1, y1 = G.H } = {}) => {
    for (let i = 0; i < n; i++) { const x = U.hash(i, seed) * G.W, y = U.hash(i, seed + 1) * y1, r = 0.8 + 2.4 * Math.pow(U.hash(i, seed + 2), 6);
      ctx.globalAlpha = a * (0.35 + 0.65 * U.hash(i, seed + 3)) * (0.75 + 0.25 * Math.sin(t * (0.8 + U.hash(i, seed + 4) * 2) + i));
      ctx.fillStyle = '#F4F1FF'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); }
    ctx.globalAlpha = 1;
  };
  P.spaceBg = (ctx, t, { top = '#060914', bottom = '#0D1330', stars = 1 } = {}) => {
    const g = ctx.createLinearGradient(0, 0, 0, G.H); g.addColorStop(0, top); g.addColorStop(1, bottom); ctx.fillStyle = g; ctx.fillRect(-200, -200, G.W + 400, G.H + 400);
    if (stars) P.stars(ctx, t, { a: stars });
  };
  // flat 2D moon disc (craters), phase 0..1 lit fraction from the right; used in flat scenes
  P.moonDisc = (ctx, x, y, r, { alpha = 1, glow = 0.5, seed = 3, lit = 1 } = {}) => {
    if (alpha <= 0.01 || r <= 0.5) return; ctx.save(); ctx.globalAlpha *= alpha;
    if (glow) P.glow(ctx, x, y, r * 3.2, 'rgba(220,230,255,', glow * 0.35);
    const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r); g.addColorStop(0, '#F3EFE6'); g.addColorStop(1, '#BDB6AA');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip();
    for (let i = 0; i < 9; i++) { const a = U.hash(i, seed) * 6.283, d = Math.sqrt(U.hash(i, seed + 1)) * r * 0.75, cr = r * (0.08 + 0.16 * U.hash(i, seed + 2));
      ctx.fillStyle = 'rgba(120,112,100,0.35)'; ctx.beginPath(); ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, cr, 0, 7); ctx.fill(); }
    if (lit < 1) { ctx.fillStyle = 'rgba(6,9,20,0.92)'; ctx.beginPath(); ctx.ellipse(x - r * 2 * lit + r * 0.0, y, r * 1.02, r * 1.02, 0, 0, 7); ctx.fill(); }
    ctx.restore(); ctx.restore();
  };
  // the Whyverse planet mark
  P.planet = (ctx, x, y, r, t, { alpha = 1 } = {}) => {
    if (r <= 0.5) return; ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(-0.35);
    const ring = (front) => { ctx.save(); ctx.beginPath(); if (front) ctx.rect(-r * 2.2, 0, r * 4.4, r * 2); else ctx.rect(-r * 2.2, -r * 2, r * 4.4, r * 2); ctx.clip();
      ctx.strokeStyle = C.gold; ctx.lineWidth = r * 0.16; ctx.beginPath(); ctx.ellipse(0, 0, r * 1.75, r * 0.45, 0, 0, 7); ctx.stroke();
      ctx.strokeStyle = C.coral; ctx.lineWidth = r * 0.06; ctx.beginPath(); ctx.ellipse(0, 0, r * 1.98, r * 0.53, 0, 0, 7); ctx.stroke(); ctx.restore(); };
    ring(false);
    const g = ctx.createLinearGradient(-r, -r, r, r); g.addColorStop(0, '#7CC4F2'); g.addColorStop(1, '#2F6FB8');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill();
    ring(true); ctx.restore();
  };
  // simple icons (flat), size ~ r
  P.icon = (ctx, kind, x, y, r, { color = C.white, alpha = 1, t = G.t } = {}) => {
    if (alpha <= 0.01) return; ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = r * 0.12; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const wave = (yy, amp, ph) => { ctx.beginPath(); for (let i = 0; i <= 24; i++) { const xx = -r + (i / 24) * 2 * r; const v = yy + Math.sin(i / 24 * 6.283 * 1.5 + ph) * amp; i ? ctx.lineTo(xx, v) : ctx.moveTo(xx, v); } ctx.stroke(); };
    switch (kind) {
      case 'tide': wave(-r * 0.25, r * 0.18, t * 2); wave(r * 0.25, r * 0.18, t * 2 + 1); break;
      case 'night': ctx.beginPath(); ctx.arc(0, 0, r * 0.75, 0.6, 5.7); ctx.arc(r * 0.35, -r * 0.1, r * 0.55, 5.2, 1.1, true); ctx.closePath(); ctx.fill(); break;
      case 'coral': for (const [a, l] of [[-0.6, 0.9], [0, 1.0], [0.6, 0.85]]) { ctx.beginPath(); ctx.moveTo(0, r * 0.8); ctx.lineTo(Math.sin(a) * r * l, r * 0.8 - Math.cos(a) * r * 1.5 * l); ctx.stroke(); ctx.beginPath(); ctx.arc(Math.sin(a) * r * l, r * 0.8 - Math.cos(a) * r * 1.5 * l, r * 0.14, 0, 7); ctx.fill(); } break;
      case 'season': ctx.beginPath(); ctx.arc(0, 0, r * 0.8, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-r * 0.2, -r * 1.05); ctx.lineTo(r * 0.2, r * 1.05); ctx.stroke(); ctx.beginPath(); ctx.ellipse(0, 0, r * 0.8, r * 0.25, 0.2, 0, 7); ctx.stroke(); break;
      case 'eclipse': ctx.beginPath(); ctx.arc(0, 0, r * 0.75, 0, 7); ctx.fill(); ctx.fillStyle = C.space; ctx.beginPath(); ctx.arc(r * 0.08, 0, r * 0.68, 0, 7); ctx.fill(); break;
      case 'clock': ctx.beginPath(); ctx.arc(0, 0, r * 0.8, 0, 7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -r * 0.5); ctx.moveTo(0, 0); ctx.lineTo(r * 0.35, r * 0.15); ctx.stroke(); break;
      case 'check': ctx.lineWidth = r * 0.2; ctx.beginPath(); ctx.moveTo(-r * 0.6, 0); ctx.lineTo(-r * 0.15, r * 0.45); ctx.lineTo(r * 0.65, -r * 0.5); ctx.stroke(); break;
      case 'cross': ctx.lineWidth = r * 0.2; ctx.beginPath(); ctx.moveTo(-r * 0.55, -r * 0.55); ctx.lineTo(r * 0.55, r * 0.55); ctx.moveTo(r * 0.55, -r * 0.55); ctx.lineTo(-r * 0.55, r * 0.55); ctx.stroke(); break;
      case 'person': ctx.beginPath(); ctx.arc(0, -r * 0.55, r * 0.3, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(-r * 0.5, r * 0.9); ctx.quadraticCurveTo(-r * 0.5, -r * 0.1, 0, -r * 0.15); ctx.quadraticCurveTo(r * 0.5, -r * 0.1, r * 0.5, r * 0.9); ctx.closePath(); ctx.fill(); break;
      case 'astronaut': ctx.beginPath(); ctx.arc(0, -r * 0.45, r * 0.42, 0, 7); ctx.fill(); ctx.fillStyle = C.navyD; P.rr(ctx, -r * 0.3, -r * 0.62, r * 0.6, r * 0.3, r * 0.14); ctx.fill(); ctx.fillStyle = color; P.rr(ctx, -r * 0.5, -r * 0.05, r, r * 0.95, r * 0.25); ctx.fill(); break;
      default: ctx.beginPath(); ctx.arc(0, 0, r * 0.6, 0, 7); ctx.fill();
    }
    ctx.restore();
  };
  globalThis.P = P;
})();
(function () {
  const P = globalThis.P, S = globalThis.SCORE, U = globalThis.U, G = globalThis.G;
  P.talk = (t) => { const s = S && S.MOUTH; if (!s) return 0; const c = s.charCodeAt(Math.round(t * 30)); return c >= 48 && c <= 57 ? (c - 48) / 9 : 0; };
  P.shot = (at, draw, o = {}) => { (globalThis.SHOTS = globalThis.SHOTS || []).push(Object.assign({ at, draw }, o)); };
  P.path = (t, keys) => { if (t <= keys[0][0]) return { x: keys[0][1], y: keys[0][2] }; for (let i = 0; i < keys.length - 1; i++) { const a = keys[i], b = keys[i + 1]; if (t <= b[0]) { const u = U.ease.inOutQuad((t - a[0]) / (b[0] - a[0])); return { x: U.lerp(a[1], b[1], u), y: U.lerp(a[2], b[2], u) }; } } const z = keys[keys.length - 1]; return { x: z[1], y: z[2] }; };
  // chapter card: a glass banner slides in over the chapter's backdrop, number disc + title; then the hook line
  P.chapter = (ctx, t, n, title, t0, t1) => {
    const a = U.clamp((t - t0) / 0.55), b = U.clamp((t - (t1 - 0.45)) / 0.45);
    if (a <= 0 || b >= 1) return;
    const x = U.lerp(-G.W, 0, U.ease.outCubic(a)) + U.lerp(0, G.W * 1.2, U.ease.inCubic(b));
    ctx.save(); ctx.translate(x, 0);
    P.panel(ctx, 140, G.H / 2 - 135, G.W - 280, 270, { r: 34, fill: 'rgba(8,12,28,0.82)', stroke: 'rgba(255,196,61,0.55)', lw: 3 });
    const d = P.pop(t, t0 + 0.3, 0.4);
    P.at(ctx, 320, G.H / 2, d, 0, () => { ctx.fillStyle = P.C.gold; ctx.beginPath(); ctx.arc(0, 0, 84, 0, 7); ctx.fill();
      G.text(ctx, String(n), 0, 42, { size: 112, fam: P.FT.title, weight: 400, color: P.C.navyD, align: 'center', boil: 0 }); });
    P.label(ctx, 'Chapter ' + n, 460, G.H / 2 - 52, { size: 30, color: P.C.gold });
    const ws = title.split(' '); let xx = 460; const fs = Math.min(92, 92 * (G.W - 280 - 460 - 80) / P.measure(ctx, title, 92, P.FT.title, 400));
    ws.forEach((w, i) => { const k = P.pop(t, t0 + 0.4 + i * 0.08, 0.3); const ww = P.measure(ctx, w + ' ', fs, P.FT.title, 400);
      if (k > 0) P.at(ctx, xx, G.H / 2 + fs * 0.55, k, 0, () => G.text(ctx, w, 0, 0, { size: fs, fam: P.FT.title, weight: 400, color: i % 2 ? P.C.gold : P.C.white, boil: 0 })); xx += ww; });
    ctx.restore();
  };
  // hook line under the card: words appear as spoken
  P.hook = (ctx, h, t, t1) => {
    const a = U.clamp((t - (h.t - 0.3)) / 0.35), b = 1 - U.clamp((t - (t1 - 0.4)) / 0.35); const k = Math.min(U.ease.outCubic(a), b); if (k <= 0.01) return;
    const size = 66, maxW = 1440, sp = P.measure(ctx, ' ', size, P.FT.ui, 800); const lines = [[]]; let x = 0;
    for (const w of h.words) { const ww = P.measure(ctx, w.w, size, P.FT.ui, 800); if (x + ww > maxW && x > 0) { lines.push([]); x = 0; } lines[lines.length - 1].push({ ...w, x, ww }); x += ww + sp; }
    const lh = size * 1.25, Hh = lines.length * lh + 80, y0 = 690;
    ctx.save(); ctx.globalAlpha *= k; ctx.translate(0, (1 - k) * 40);
    P.panel(ctx, G.W / 2 - maxW / 2 - 60, y0 - 30, maxW + 120, Hh, { r: 30, fill: 'rgba(8,12,28,0.80)' });
    ctx.fillStyle = P.C.gold; ctx.fillRect(G.W / 2 - maxW / 2 - 60, y0 - 30, 10, Hh);
    lines.forEach((ln, li) => { const lw = ln.length ? ln[ln.length - 1].x + ln[ln.length - 1].ww : 0; const ox = G.W / 2 - lw / 2;
      for (const w of ln) { const q = U.clamp((t - w.t) / 0.14); const key = /[?:]$/.test(w.w);
        G.text(ctx, w.w, ox + w.x, y0 + 50 + li * lh, { size, fam: P.FT.ui, weight: 800, color: key ? P.C.gold : P.C.white, alpha: 0.22 + 0.78 * q, boil: 0 }); } });
    ctx.restore();
  };
  // chapter title shot: backdrop(ctx,t) + banner + hook. The banner rises when the hook appears.
  P.cardShot = (c, n, title, bg, o = {}) => P.shot(S.CH[c].t0, (ctx, t, s) => {
    bg(ctx, t, s);
    const h = S.ev[c + '_hook'], up = h ? U.ease.inOutCubic(U.clamp((t - (h.t - 0.45)) / 0.5)) : 0;
    ctx.save(); ctx.translate(0, -230 * up); P.chapter(ctx, t, n, title, S.CH[c].t0 + 0.1, S.ev[c + '_cardOut']); ctx.restore();
    if (h) P.hook(ctx, h, t, S.ev[c + '_cardOut']);
  }, Object.assign({ in: { type: 'fade', dur: 0.5 } }, o));
})();
