// Whyverse ep06 — "flat" infographic library. Pure functions of their args + t.
// Look: clean flat fills, no outlines, soft offset shadows, Inter 800 titles + Bungee numbers; navy / sea / sand / gold / coral.
// FEEDBACK 2026-11-04: nothing boils (flat style has none); shake only on real impacts (≤ 6 px, ≤ 0.3 s); pushes ≤ 3 %.
(function () {
  const G = globalThis.G, U = globalThis.U, Data = globalThis.Data, S = globalThis.SCORE;
  const { clamp, lerp, ease } = U;
  const P = {};
  const C = P.C = {
    navy: '#14204A', navy2: '#1E2E66', navy3: '#2A3D80', ink: '#14204A', dim: '#5C6894', cream: '#FFF6E4', paper: '#F6EFE2', paper2: '#EADFC9',
    gold: '#F2B84B', coral: '#F0714F', red: '#E5484D', teal: '#2EC4B6', mint: '#7BD3A8', sky: '#7CC4F0', sea: '#1F6FA8', sea2: '#175A8C', seaDeep: '#0F3F6B',
    sand: '#F1D6A0', sand2: '#E5C17E', land: '#F3E2BC', land2: '#E9D19C', oil: '#24262F', oil2: '#3A3D4A', grey: '#9AA3BF', grey2: '#C9CFE0', white: '#FFFFFF',
    green: '#4FB477', lilac: '#9B8FE0', pink: '#F49AB0', steel: '#6E7A99', hull: '#C8463B', deck: '#E7ECF5', gas: '#8FD3F5',
  };
  P.FT = { title: 'Inter', num: 'Bungee', hand: 'Inter' };
  P.dark = false;
  P.fg = () => (P.dark ? C.cream : C.ink);
  P.fg2 = () => (P.dark ? '#AEB9E6' : C.dim);
  const pop = P.pop = (t, t0, d = 0.32, s = 2.0) => (t < t0 ? 0 : ease.outBack(clamp((t - t0) / d), s));
  const fin = P.fin = (t, t0, d = 0.3) => clamp((t - t0) / d);
  const fout = P.fout = (t, t1, d = 0.3) => 1 - clamp((t - (t1 - d)) / d);
  P.win = (t, t0, t1, d = 0.3) => Math.min(fin(t, t0, d), fout(t, t1, d));
  P.at = (ctx, x, y, s, rot, fn) => { ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot); if (s !== 1) ctx.scale(s, s); fn(); ctx.restore(); };
  P.eio = (x) => ease.inOutCubic(clamp(x));
  P.oc = (x) => ease.outCubic(clamp(x));
  const hex = (h) => { const m = /^#?([0-9a-f]{6})$/i.exec(h || ''); if (!m) return null; const n = parseInt(m[1], 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  P.mix = (a, b, k) => { const pa = hex(a), pb = hex(b); if (!pa || !pb) return a; const f = (i) => Math.round(pa[i] + (pb[i] - pa[i]) * clamp(k)); return '#' + [0, 1, 2].map((i) => f(i).toString(16).padStart(2, '0')).join(''); };
  P.rgba = (h, a) => { const p = hex(h); return p ? `rgba(${p[0]},${p[1]},${p[2]},${a})` : h; };
  P.dk = (h, k = 0.25) => P.mix(h, '#0A1030', k);
  P.lt = (h, k = 0.3) => P.mix(h, '#FFFFFF', k);

  // ---------- paths ----------
  P.pEll = (x, y, rx, ry, rot = 0) => (c) => { c.beginPath(); c.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot, 0, 6.2832); };
  P.pRR = (x, y, w, h, r = 12) => (c) => { const rr = Math.max(0, Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2)); c.beginPath(); c.moveTo(x + rr, y); c.arcTo(x + w, y, x + w, y + h, rr); c.arcTo(x + w, y + h, x, y + h, rr); c.arcTo(x, y + h, x, y, rr); c.arcTo(x, y, x + w, y, rr); c.closePath(); };
  P.pPoly = (pts, closed = true) => (c) => { c.beginPath(); pts.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); if (closed) c.closePath(); };
  P.pCurve = (pts, closed = true, k = 0.5) => (c) => { const n = pts.length; c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); const lim = closed ? n : n - 1;
    const g = (j) => (closed ? pts[((j % n) + n) % n] : pts[Math.max(0, Math.min(n - 1, j))]);
    for (let i = 0; i < lim; i++) { const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      c.bezierCurveTo(p1[0] + (p2[0] - p0[0]) * k / 3, p1[1] + (p2[1] - p0[1]) * k / 3, p2[0] - (p3[0] - p1[0]) * k / 3, p2[1] - (p3[1] - p1[1]) * k / 3, p2[0], p2[1]); }
    if (closed) c.closePath(); };

  // ---------- flat fill: colour + optional soft offset shadow + optional thin stroke ----------
  P.fill = (ctx, path, color, o = {}) => {
    const { a = 1, shadow = 0, sx = 0, sy = 8, stroke = null, lw = 4, grad = null } = o;
    if (a <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= a;
    if (shadow > 0) { ctx.save(); ctx.globalAlpha *= shadow; ctx.translate(sx, sy); ctx.fillStyle = '#0A1030'; path(ctx); ctx.fill(); ctx.restore(); }
    ctx.fillStyle = grad || color; path(ctx); ctx.fill();
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.lineJoin = 'round'; path(ctx); ctx.stroke(); }
    ctx.restore();
  };
  P.ell = (ctx, x, y, rx, ry, color, o = {}) => P.fill(ctx, P.pEll(x, y, rx, ry, o.rot || 0), color, o);
  P.circ = (ctx, x, y, r, color, o = {}) => P.fill(ctx, P.pEll(x, y, r, r), color, o);
  P.rect = (ctx, x, y, w, h, r, color, o = {}) => P.fill(ctx, P.pRR(x, y, w, h, r), color, o);
  P.poly = (ctx, pts, color, o = {}) => P.fill(ctx, o.curve ? P.pCurve(pts, true, o.k == null ? 0.5 : o.k) : P.pPoly(pts), color, o);
  P.stroke = (ctx, path, color, lw = 6, a = 1, dash = null) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); path(ctx); ctx.stroke(); ctx.restore(); };
  P.line = (ctx, x0, y0, x1, y1, color = C.ink, lw = 6, a = 1, k = 1, dash = null) => { if (k <= 0.001) return; P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(x0, y0); c.lineTo(lerp(x0, x1, k), lerp(y0, y1, k)); }, color, lw, a, dash); };
  // partial polyline (k = 0..1 of its length)
  P.trace = (ctx, pts, k, color, lw = 6, a = 1, dash = null) => {
    if (k <= 0.001 || a <= 0) return; let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    let rem = L * clamp(k); P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length && rem > 0; i++) { const d = seg[i - 1]; const f = Math.min(1, rem / d); c.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); rem -= d; } }, color, lw, a, dash);
  };
  P.along = (pts, k) => { let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
    let rem = L * clamp(k); for (let i = 1; i < pts.length; i++) { const d = seg[i - 1]; if (rem <= d) { const f = rem / d; return [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f), Math.atan2(pts[i][1] - pts[i - 1][1], pts[i][0] - pts[i - 1][0])]; } rem -= d; }
    const n = pts.length; return [pts[n - 1][0], pts[n - 1][1], Math.atan2(pts[n - 1][1] - pts[n - 2][1], pts[n - 1][0] - pts[n - 2][0])]; };
  P.arrow = (ctx, ax, ay, bx, by, { color = C.coral, lw = 10, head = 30, k = 1, a = 1 } = {}) => {
    if (k <= 0.001 || a <= 0) return; const ex = lerp(ax, bx, k), ey = lerp(ay, by, k), ang = Math.atan2(by - ay, bx - ax);
    P.line(ctx, ax, ay, ex - Math.cos(ang) * head * 0.5, ey - Math.sin(ang) * head * 0.5, color, lw, a);
    P.fill(ctx, P.pPoly([[ex, ey], [ex - Math.cos(ang - 0.45) * head, ey - Math.sin(ang - 0.45) * head], [ex - Math.cos(ang + 0.45) * head, ey - Math.sin(ang + 0.45) * head]]), color, { a });
  };
  P.ring = (ctx, x, y, t, t0, { r = 120, color = C.gold, dur = 0.7, lw = 8 } = {}) => {
    const a = (t - t0) / dur; if (a < 0 || a > 1) return; ctx.save(); ctx.globalAlpha *= (1 - a) * 0.85; ctx.strokeStyle = color; ctx.lineWidth = lw * (1 - a) + 1.5; ctx.beginPath(); ctx.arc(x, y, r * ease.outCubic(a), 0, 7); ctx.stroke(); ctx.restore();
  };
  // flat confetti bits flying off a hit
  P.burst = (ctx, x, y, t, t0, { n = 12, r = 120, colors = [C.gold, C.coral, C.teal], seed = 1 } = {}) => {
    const a = t - t0; if (a < 0 || a > 0.65) return; const k = a / 0.65;
    ctx.save(); for (let i = 0; i < n; i++) { const ang = (i / n) * 6.283 + U.hash(i, seed) * 0.6, d = r * ease.outCubic(k) * (0.5 + 0.7 * U.hash(i, seed + 1));
      ctx.globalAlpha = (1 - k); ctx.fillStyle = colors[i % colors.length]; ctx.save(); ctx.translate(x + Math.cos(ang) * d, y + Math.sin(ang) * d); ctx.rotate(ang + k * 3);
      const s = 6 + 8 * U.hash(i, seed + 2); if (i % 2) ctx.fillRect(-s, -s * 0.35, s * 2, s * 0.7); else { ctx.beginPath(); ctx.arc(0, 0, s * 0.6, 0, 7); ctx.fill(); } ctx.restore(); }
    ctx.restore();
  };
  P.glow = (ctx, x, y, r, color = C.gold, a = 1) => {
    if (a <= 0.005 || r <= 1) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, P.rgba(color, 0.45 * a)); g.addColorStop(0.45, P.rgba(color, 0.15 * a)); g.addColorStop(1, P.rgba(color, 0));
    ctx.save(); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore();
  };

  // ---------- text (static, never boils) ----------
  const W8 = (fam, w) => (fam === 'Bungee' ? 400 : w);
  P.text = (ctx, s, x, y, o = {}) => { const fam = o.fam || P.FT.title; return G.text(ctx, s, x, y, Object.assign({ size: 56, weight: 700, color: P.fg(), boil: 0 }, o, { fam, weight: W8(fam, o.weight || 700) })); };
  P.label = (ctx, s, x, y, o = {}) => G.text(ctx, String(s), x, y, Object.assign({ size: 34, fam: 'Inter', weight: 700, color: P.fg2(), boil: 0 }, o));
  P.measure = (ctx, s, size, fam = 'Inter', w = 800) => G.measure(ctx, s, size, fam, W8(fam, w));
  // a line of text that slides up word by word
  P.write = (ctx, s, x, y, t, t0, { size = 72, fam = 'Inter', weight = 800, color = null, align = 'center', a = 1, t1 = 1e9, stag = 0.06, hl = null, hlColor = C.gold } = {}) => {
    if (t < t0) return; const al = a * fout(t, t1, 0.3); if (al <= 0.01) return; const col = color || P.fg();
    const words = s.split(' '); const sp = P.measure(ctx, ' ', size, fam, weight); const ws = words.map((w) => P.measure(ctx, w, size, fam, weight));
    const tw = ws.reduce((a, b) => a + b, 0) + sp * (words.length - 1); let xx = align === 'center' ? x - tw / 2 : align === 'right' ? x - tw : x;
    words.forEach((w, i) => { const k = ease.outCubic(clamp((t - t0 - i * stag) / 0.28)); if (k > 0) {
      const c = hl && hl.includes(w.replace(/[^A-Za-z0-9%$]/g, '')) ? hlColor : col;
      G.text(ctx, w, xx, y + (1 - k) * size * 0.45, { size, fam, weight: W8(fam, weight), color: c, align: 'left', boil: 0, alpha: al * k }); }
      xx += ws[i] + sp; });
  };
  // a rounded pill label
  P.tag = (ctx, s, x, y, t, t0, t1 = 1e9, { size = 40, color = C.ink, fill = C.cream, border = null, align = 'center', pad = 26, rot = 0, fam = 'Inter', weight = 800, dot = null } = {}) => {
    const k = pop(t, t0) * fout(t, t1, 0.25); if (k <= 0.01) return 0;
    const dw = dot ? size * 0.9 : 0; const w = P.measure(ctx, s, size, fam, weight) + pad * 2 + dw, h = size * 1.6;
    const ox = align === 'left' ? w / 2 : align === 'right' ? -w / 2 : 0;
    ctx.save(); ctx.translate(x + ox, y); ctx.rotate(rot); ctx.scale(k, k); ctx.globalAlpha *= clamp(k * 1.5);
    P.rect(ctx, -w / 2, -h / 2, w, h, h / 2, fill, { shadow: 0.18, sy: 6 });
    if (border) { ctx.strokeStyle = border; ctx.lineWidth = 5; P.pRR(-w / 2, -h / 2, w, h, h / 2)(ctx); ctx.stroke(); }
    if (dot) P.circ(ctx, -w / 2 + pad + size * 0.3, 0, size * 0.28, dot);
    G.text(ctx, s, dw / 2, size * 0.36, { size, fam, weight: W8(fam, weight), color, align: 'center', boil: 0 });
    ctx.restore(); return w;
  };
  // a bold slab word that slams in
  P.stamp = (ctx, s, x, y, t, t0, { size = 96, color = C.coral, rot = -0.03, t1 = 1e9, fg = C.cream, fam = 'Inter', weight = 800 } = {}) => {
    if (t < t0) return; const a = clamp((t - t0) / 0.14), k = lerp(1.6, 1, ease.outCubic(a)) * fout(t, t1, 0.3); if (k <= 0.01) return;
    const w = P.measure(ctx, s, size, fam, weight) + 70, h = size * 1.32;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.globalAlpha *= clamp(a * 2);
    P.rect(ctx, -w / 2, -h / 2, w, h, 16, color, { shadow: 0.25, sy: 10 });
    G.text(ctx, s, 0, size * 0.36, { size, fam, weight: W8(fam, weight), color: fg, align: 'center', boil: 0 });
    ctx.restore();
    P.burst(ctx, x, y, t, t0, { r: w * 0.6, seed: s.length, colors: [color, C.gold, C.cream] });
  };
  P.counter = (ctx, { x, y, from = 0, to, t, t0, t1, size = 150, color = C.coral, prefix = '', suffix = '', decimals = 0, sub = '', subSize = 38, card = true, tEnd = 1e9, fmt, fill = C.cream, subColor = null }) => {
    const k = pop(t, t0 - 0.25, 0.35) * fout(t, tEnd, 0.3); if (k <= 0.01) return;
    const v = Data.count(t, t0, t1, from, to, ease.outCubic); const f = fmt || ((n) => Data.number(n, { decimals }));
    const str = prefix + f(v) + suffix, strF = prefix + f(to) + suffix; const land = t >= t1 ? Math.exp(-(t - t1) * 8) : 0;
    const w = Math.max(P.measure(ctx, strF, size, 'Bungee'), sub ? P.measure(ctx, sub, subSize, 'Inter', 700) : 0) + 90, h = size * 1.05 + (sub ? subSize * 1.6 : 0);
    ctx.save(); ctx.translate(x, y); const sc = k * (1 + 0.06 * land); ctx.scale(sc, sc); ctx.globalAlpha *= clamp(k * 1.4);
    if (card) { P.rect(ctx, -w / 2, -size * 0.92, w, h + 14, 24, fill, { shadow: 0.2, sy: 8 }); P.rect(ctx, -w / 2, -size * 0.92, w, 12, 6, color); }
    G.text(ctx, str, 0, size * 0.06, { size, fam: 'Bungee', weight: 400, color, align: 'center', boil: 0 });
    if (sub) G.text(ctx, sub, 0, size * 0.1 + subSize * 1.3, { size: subSize, fam: 'Inter', weight: 700, color: subColor || (card ? C.dim : P.fg2()), align: 'center', boil: 0 });
    ctx.restore();
  };
  P.kicker = (ctx, s, t, t0, { x = 90, y = 104, t1 = 1e9, color = C.coral } = {}) => {
    const a = P.win(t, t0, t1, 0.35); if (a <= 0) return; const str = s.toUpperCase(); const w = P.measure(ctx, str, 34, 'Inter', 800) + 78;
    ctx.save(); ctx.globalAlpha *= a; ctx.translate(-(1 - P.oc((t - t0) / 0.35)) * 40, 0);
    P.rect(ctx, x, y - 44, w, 62, 31, C.navy, { shadow: 0.2, sy: 5 }); P.circ(ctx, x + 32, y - 13, 10, color);
    G.text(ctx, str, x + 54, y, { size: 34, fam: 'Inter', weight: 800, color: C.cream, boil: 0 }); ctx.restore();
  };
  P.source = (ctx, s, t, t0, { t1 = 1e9 } = {}) => { const a = P.win(t, t0, t1, 0.4); if (a <= 0) return; G.text(ctx, 'Source: ' + s, G.W - 70, G.H - 40, { size: 24, fam: 'Inter', weight: 700, color: P.fg2(), alpha: a * 0.85, align: 'right', boil: 0 }); };
  P.hbar = (ctx, { x, y, w, h = 56, frac, t, t0, d = 0.8, color = C.coral, label = '', value = '', t1 = 1e9, track = null }) => {
    const k = ease.outCubic(clamp((t - t0) / d)); const a = fin(t, t0 - 0.2, 0.3) * fout(t, t1, 0.3); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a;
    P.rect(ctx, x, y, w, h, h / 2, track || (P.dark ? '#2A3A78' : C.paper2));
    if (k > 0.01) P.rect(ctx, x, y, Math.max(h, w * frac * k), h, h / 2, color);
    if (label) P.label(ctx, label, x, y - 16, { size: 34, color: P.fg() });
    if (value) G.text(ctx, value, x + Math.max(h, w * frac * k) + 22, y + h * 0.78, { size: h * 0.95, fam: 'Bungee', weight: 400, color: P.dark ? C.cream : color, alpha: fin(t, t0 + d * 0.6, 0.3), boil: 0 });
    ctx.restore();
  };

  // ---------- backgrounds ----------
  P.bgLight = (ctx, t, { grid = true, color = C.paper } = {}) => {
    P.dark = false; ctx.fillStyle = color; ctx.fillRect(-400, -400, G.W + 800, G.H + 800);
    if (grid) { ctx.save(); ctx.strokeStyle = 'rgba(20,32,74,0.05)'; ctx.lineWidth = 2; for (let x = 0; x <= G.W; x += 80) { ctx.beginPath(); ctx.moveTo(x, -400); ctx.lineTo(x, G.H + 400); ctx.stroke(); } for (let y = 0; y <= G.H; y += 80) { ctx.beginPath(); ctx.moveTo(-400, y); ctx.lineTo(G.W + 400, y); ctx.stroke(); } ctx.restore(); }
  };
  P.bgNavy = (ctx, t, { dots = true, top = C.navy, bot = '#0E1838' } = {}) => {
    P.dark = true; const g = ctx.createLinearGradient(0, 0, 0, G.H); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(-400, -400, G.W + 800, G.H + 800);
    if (dots) { ctx.save(); ctx.fillStyle = 'rgba(255,255,255,0.05)'; for (let x = 40; x < G.W; x += 80) for (let y = 40; y < G.H; y += 80) { ctx.beginPath(); ctx.arc(x, y, 2.5, 0, 7); ctx.fill(); } ctx.restore(); }
  };
  // open water with drifting flat wave dashes
  P.water = (ctx, t, { y0 = 0, color = C.sea, color2 = C.sea2, a = 1, speed = 1, seed = 1, h = G.H + 400 } = {}) => {
    P.dark = true; ctx.save(); ctx.globalAlpha *= a; const g = ctx.createLinearGradient(0, y0, 0, y0 + h); g.addColorStop(0, color); g.addColorStop(1, color2); ctx.fillStyle = g; ctx.fillRect(-400, y0, G.W + 800, h);
    ctx.strokeStyle = 'rgba(255,255,255,0.13)'; ctx.lineWidth = 4; ctx.lineCap = 'round';
    for (let i = 0; i < 46; i++) { const yy = y0 + 30 + U.hash(i, seed) * (Math.min(h, G.H) - 40); const L = 40 + 60 * U.hash(i, seed + 1); const xx = ((U.hash(i, seed + 2) * (G.W + 400) + t * 22 * speed * (0.6 + U.hash(i, seed + 3))) % (G.W + 400)) - 200;
      ctx.beginPath(); ctx.moveTo(xx, yy); ctx.quadraticCurveTo(xx + L / 2, yy - 6 * Math.sin(t * 1.5 + i), xx + L, yy); ctx.stroke(); }
    ctx.restore();
  };
  P.sky = (ctx, t, { top = '#8FD0F2', bot = '#FBE7C6', h = G.H } = {}) => { P.dark = false; const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(-400, -400, G.W + 800, h + 400); };
  P.sun = (ctx, x, y, r, t, { a = 1, color = C.gold } = {}) => { if (a <= 0.01) return; P.glow(ctx, x, y, r * 3, color, a * 0.6); P.circ(ctx, x, y, r, color, { a }); P.circ(ctx, x, y, r * 0.72, P.lt(color, 0.25), { a: a * 0.6 }); };

  // ---------- film helpers ----------
  P.talk = (t) => { const s = S && S.MOUTH; if (!s) return 0; const c = s.charCodeAt(Math.round(t * S.FPS)); return c >= 48 && c <= 57 ? (c - 48) / 9 : 0; };
  P.shot = (at, draw, o = {}) => { (globalThis.SHOTS = globalThis.SHOTS || []).push(Object.assign({ at, draw }, o)); };
  P.push = (ctx, u, cx = G.W / 2, cy = G.H / 2, amt = 0.03) => { const s = 1 + amt * ease.inOutQuad(clamp(u)); ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-cx, -cy); };
  P.shake = (ctx, t, t0, amp = 6, dur = 0.3) => { const a = (t - t0) / dur; if (a < 0 || a > 1) return; const k = (1 - a) * amp; ctx.translate(Math.sin(t * 90) * k, Math.cos(t * 77) * k); };
  // camera move between two framings {x, y, z} (z = zoom) over [t0, t1]
  P.cam = (ctx, t, t0, t1, A, B, e = P.eio) => { const k = e((t - t0) / Math.max(0.01, t1 - t0)); const x = lerp(A.x, B.x, k), y = lerp(A.y, B.y, k), z = lerp(A.z, B.z, k);
    ctx.translate(G.W / 2, G.H / 2); ctx.scale(z, z); ctx.translate(-x, -y); return { x, y, z }; };
  globalThis.P = P;
})();
