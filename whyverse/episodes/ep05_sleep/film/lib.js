// Whyverse ep05 — "watercolor" prop + HUD library. Pure functions of their args + t.
// Look: layered translucent washes with pooled (darker) edges on warm cold-press paper; night scenes are deep indigo washes.
// FEEDBACK 2026-11-04: NOTHING boils — every wash is seeded once; text is static; shake only on real impacts (≤ 6 px, ≤ 0.3 s); pushes ≤ 3 %.
(function () {
  const G = globalThis.G, U = globalThis.U, Data = globalThis.Data;
  const { clamp, lerp, ease } = U;
  const P = {};
  const C = P.C = {
    paper: '#F4ECDC', paper2: '#E9DDC4', ink: '#232A52', dim: '#6B7096', navy: '#1B2452', night: '#1C2557', night2: '#34448F',
    gold: '#F2B84B', coral: '#F0714F', sky: '#6FA8DC', mint: '#7BC8A4', pink: '#F2A0B5', lilac: '#9B8FE0', peri: '#8795E6',
    red: '#D9483B', cream: '#FFF6E4', white: '#FFFFFF', brown: '#9A6B4B', wood: '#B98556', grey: '#9AA0B5', green: '#6FAE6E',
    teal: '#4FA7A8', sea: '#3F78B5', skin: '#F1C7A3', skin2: '#C98F66', sand: '#E8C98A', brain: '#F0A9B4', moon: '#FCE9A8',
  };
  P.FT = { title: 'Caveat', hand: 'Patrick Hand', num: 'Caveat', big: 'Bungee' };
  P.dark = false;
  P.fg = () => (P.dark ? C.cream : C.ink);
  P.fg2 = () => (P.dark ? '#B9C0EA' : C.dim);
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
  P.dk = (h, k = 0.3) => P.mix(h, '#141838', k);
  P.lt = (h, k = 0.3) => P.mix(h, '#FFFFFF', k);

  // ---------- paths ----------
  P.pEll = (x, y, rx, ry, rot = 0) => (c) => { c.beginPath(); c.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot, 0, 6.2832); };
  P.pRR = (x, y, w, h, r = 12) => (c) => { const rr = Math.max(0, Math.min(r, w / 2, h / 2)); c.beginPath(); c.moveTo(x + rr, y); c.arcTo(x + w, y, x + w, y + h, rr); c.arcTo(x + w, y + h, x, y + h, rr); c.arcTo(x, y + h, x, y, rr); c.arcTo(x, y, x + w, y, rr); c.closePath(); };
  P.pPoly = (pts, closed = true) => (c) => { c.beginPath(); pts.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); if (closed) c.closePath(); };
  P.pCurve = (pts, closed = true, k = 0.5) => (c) => { const n = pts.length; c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); const lim = closed ? n : n - 1;
    const g = (j) => (closed ? pts[((j % n) + n) % n] : pts[Math.max(0, Math.min(n - 1, j))]);
    for (let i = 0; i < lim; i++) { const p0 = g(i - 1), p1 = g(i), p2 = g(i + 1), p3 = g(i + 2);
      c.bezierCurveTo(p1[0] + (p2[0] - p0[0]) * k / 3, p1[1] + (p2[1] - p0[1]) * k / 3, p2[0] - (p3[0] - p1[0]) * k / 3, p2[1] - (p3[1] - p1[1]) * k / 3, p2[0], p2[1]); }
    if (closed) c.closePath(); };

  // ---------- the wash: translucent fill + pigment blotches + pooled darker edge (+ optional pencil line). Static (seeded). ----------
  P.wash = (ctx, path, color, o = {}) => {
    const { a = 1, edge = 0.45, line = 0, lw = 3, seed = 1, bb = null, fillA = 0.9, ink = C.ink, ew = 5 } = o;
    if (a <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= a; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.save(); ctx.globalAlpha *= fillA; ctx.fillStyle = color; path(ctx); ctx.fill(); ctx.restore();
    if (bb) { ctx.save(); path(ctx); ctx.clip(); const [cx, cy, r] = bb;
      for (let i = 0; i < 4; i++) { const x = cx + (U.hash(seed, i, 1) - 0.5) * r * 1.6, y = cy + (U.hash(seed, i, 2) - 0.5) * r * 1.6, rr = r * (0.5 + 0.6 * U.hash(seed, i, 3));
        const g = ctx.createRadialGradient(x, y, 0, x, y, rr); const lc = i % 2 ? '255,255,255' : '20,24,60', al = i % 2 ? 0.17 : 0.1;
        g.addColorStop(0, `rgba(${lc},${al})`); g.addColorStop(0.7, `rgba(${lc},${al * 0.5})`); g.addColorStop(1, `rgba(${lc},0)`); ctx.fillStyle = g; ctx.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
      ctx.restore(); }
    if (edge > 0) { ctx.save(); ctx.globalAlpha *= edge; ctx.strokeStyle = P.dk(color, 0.38); ctx.lineWidth = ew; path(ctx); ctx.stroke(); ctx.restore(); }
    if (line > 0) { ctx.save(); ctx.globalAlpha *= line; ctx.strokeStyle = ink; ctx.lineWidth = lw; path(ctx); ctx.stroke(); ctx.restore(); }
    ctx.restore();
  };
  P.ell = (ctx, x, y, rx, ry, color, o = {}) => P.wash(ctx, P.pEll(x, y, rx, ry, o.rot || 0), color, Object.assign({ bb: [x, y, Math.max(rx, ry)] }, o));
  P.rect = (ctx, x, y, w, h, r, color, o = {}) => P.wash(ctx, P.pRR(x, y, w, h, r), color, Object.assign({ bb: [x + w / 2, y + h / 2, Math.max(w, h) / 2] }, o));
  P.shape = (ctx, pts, color, o = {}) => { let cx = 0, cy = 0, r = 0; for (const p of pts) { cx += p[0]; cy += p[1]; } cx /= pts.length; cy /= pts.length; for (const p of pts) r = Math.max(r, Math.hypot(p[0] - cx, p[1] - cy));
    P.wash(ctx, o.poly ? P.pPoly(pts) : P.pCurve(pts, true, o.k == null ? 0.5 : o.k), color, Object.assign({ bb: [cx, cy, r] }, o)); };
  // a brush stroke (open path)
  P.brush = (ctx, path, color, lw = 8, a = 1) => { if (a <= 0.01) return; ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = color; ctx.globalAlpha *= a * 0.92; ctx.lineWidth = lw; path(ctx); ctx.stroke();
    ctx.globalAlpha *= 0.22; ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = lw * 0.4; path(ctx); ctx.stroke(); ctx.restore(); };
  P.line = (ctx, x0, y0, x1, y1, color = C.ink, lw = 6, a = 1, k = 1) => { if (k <= 0.001) return; P.brush(ctx, (c) => { c.beginPath(); c.moveTo(x0, y0); c.lineTo(lerp(x0, x1, k), lerp(y0, y1, k)); }, color, lw, a); };
  P.curveLine = (ctx, pts, color = C.ink, lw = 6, a = 1) => P.brush(ctx, P.pCurve(pts, false), color, lw, a);
  P.arrow = (ctx, ax, ay, bx, by, { color = C.coral, lw = 8, head = 28, k = 1, a = 1 } = {}) => {
    if (k <= 0.001 || a <= 0) return; const ex = lerp(ax, bx, k), ey = lerp(ay, by, k), ang = Math.atan2(ey - ay, ex - ax);
    P.brush(ctx, (c) => { c.beginPath(); c.moveTo(ax, ay); c.lineTo(ex, ey); c.moveTo(ex - Math.cos(ang - 0.5) * head, ey - Math.sin(ang - 0.5) * head); c.lineTo(ex, ey); c.lineTo(ex - Math.cos(ang + 0.5) * head, ey - Math.sin(ang + 0.5) * head); }, color, lw, a);
  };
  P.arcArrow = (ctx, cx, cy, r, a0, a1, { color = C.coral, lw = 8, head = 26, a = 1, ry = null } = {}) => {
    if (a <= 0) return; const ryy = ry == null ? r : ry; const ex = cx + Math.cos(a1) * r, ey = cy + Math.sin(a1) * ryy; const dir = a1 > a0 ? 1 : -1;
    const tx = -Math.sin(a1) * r * dir, ty = Math.cos(a1) * ryy * dir, ang = Math.atan2(ty, tx);
    P.brush(ctx, (c) => { c.beginPath(); c.ellipse(cx, cy, r, ryy, 0, a0, a1, a1 < a0); c.moveTo(ex - Math.cos(ang - 0.5) * head, ey - Math.sin(ang - 0.5) * head); c.lineTo(ex, ey); c.lineTo(ex - Math.cos(ang + 0.5) * head, ey - Math.sin(ang + 0.5) * head); }, color, lw, a);
  };
  // a wet ring spreading on a hit
  P.ring = (ctx, x, y, t, t0, { r = 120, color = C.gold, dur = 0.8, lw = 8 } = {}) => {
    const a = (t - t0) / dur; if (a < 0 || a > 1) return; ctx.save(); ctx.globalAlpha *= (1 - a) * 0.8; ctx.strokeStyle = color; ctx.lineWidth = lw * (1 - a) + 1.5; ctx.beginPath(); ctx.arc(x, y, r * ease.outCubic(a), 0, 7); ctx.stroke(); ctx.restore();
  };
  // paint droplets flying off a hit
  P.splat = (ctx, x, y, t, t0, { n = 12, r = 110, color = C.gold, seed = 1 } = {}) => {
    const a = t - t0; if (a < 0 || a > 0.7) return; const k = a / 0.7;
    ctx.save(); ctx.fillStyle = color; for (let i = 0; i < n; i++) { const ang = (i / n) * 6.283 + U.hash(i, seed) * 0.7, d = r * ease.outCubic(k) * (0.45 + 0.75 * U.hash(i, seed + 1));
      ctx.globalAlpha = (1 - k) * 0.75; ctx.beginPath(); ctx.arc(x + Math.cos(ang) * d, y + Math.sin(ang) * d, 3 + 7 * U.hash(i, seed + 2) * (1 - k * 0.6), 0, 7); ctx.fill(); }
    ctx.restore();
  };
  P.glow = (ctx, x, y, r, color = C.gold, a = 1) => {
    if (a <= 0.005 || r <= 1) return; const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, P.rgba(color, 0.5 * a)); g.addColorStop(0.4, P.rgba(color, 0.18 * a)); g.addColorStop(1, P.rgba(color, 0));
    ctx.save(); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); ctx.restore();
  };

  // ---------- text (never boils) ----------
  P.text = (ctx, s, x, y, o = {}) => G.text(ctx, s, x, y, Object.assign({ size: 56, fam: P.FT.hand, weight: 400, color: P.fg(), boil: 0 }, o));
  P.label = (ctx, s, x, y, o = {}) => G.text(ctx, String(s), x, y, Object.assign({ size: 36, fam: P.FT.hand, weight: 400, color: P.fg2(), boil: 0 }, o));
  P.measure = (ctx, s, size, fam = P.FT.hand, w) => G.measure(ctx, s, size, fam, w || (fam === 'Caveat' ? 700 : 400));
  P.big = (ctx, s, x, y, o = {}) => G.text(ctx, s, x, y, Object.assign({ size: 120, fam: P.FT.title, weight: 700, color: P.fg(), align: 'center', boil: 0 }, o));
  // brush handwriting: revealed left → right, a wet brush tip rides the edge
  P.write = (ctx, s, x, y, t, t0, { dur = null, size = 72, fam = P.FT.title, color = null, align = 'center', a = 1, t1 = 1e9, underline = null } = {}) => {
    if (t < t0) return; const al = a * fout(t, t1, 0.3); if (al <= 0.01) return; const col = color || P.fg(); const wt = fam === 'Caveat' ? 700 : 400;
    const w = P.measure(ctx, s, size, fam, wt), d = dur == null ? Math.min(1.1, 0.12 + s.length * 0.032) : dur, k = clamp((t - t0) / d);
    const x0 = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
    ctx.save(); ctx.beginPath(); ctx.rect(x0 - 20, y - size * 1.3, (w + 40) * k + 1, size * 2.0); ctx.clip();
    if (underline) P.brush(ctx, (c) => { c.beginPath(); c.moveTo(x0 - 6, y + size * 0.26); c.quadraticCurveTo(x0 + w / 2, y + size * 0.36, x0 + w + 6, y + size * 0.22); }, underline, Math.max(5, size * 0.1), al * 0.85);
    G.text(ctx, s, x0, y, { size, fam, weight: wt, color: col, align: 'left', boil: 0, alpha: al });
    ctx.restore();
    if (k < 1) { ctx.save(); ctx.globalAlpha = al * 0.8; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x0 + w * k, y - size * 0.25, size * 0.08, 0, 7); ctx.fill(); ctx.restore(); }
  };
  // a paper label with a painted border
  P.tag = (ctx, s, x, y, t, t0, t1 = 1e9, { size = 44, color = C.ink, border = C.gold, align = 'center', pad = 28, rot = 0, fam = P.FT.hand, fill = C.cream } = {}) => {
    const k = pop(t, t0) * fout(t, t1, 0.25); if (k <= 0.01) return;
    const w = P.measure(ctx, s, size, fam) + pad * 2, h = size * 1.55;
    const ox = align === 'left' ? w / 2 : align === 'right' ? -w / 2 : 0;
    ctx.save(); ctx.translate(x + ox, y); ctx.rotate(rot); ctx.scale(k, k); ctx.globalAlpha *= clamp(k * 1.5);
    ctx.save(); ctx.globalAlpha *= 0.18; ctx.fillStyle = '#10143A'; P.pRR(-w / 2 + 4, -h / 2 + 7, w, h, 16)(ctx); ctx.fill(); ctx.restore();
    P.wash(ctx, P.pRR(-w / 2, -h / 2, w, h, 16), fill, { fillA: 0.97, edge: 0, seed: s.length });
    ctx.save(); ctx.strokeStyle = border; ctx.lineWidth = 5; ctx.globalAlpha *= 0.9; P.pRR(-w / 2, -h / 2, w, h, 16)(ctx); ctx.stroke(); ctx.restore();
    G.text(ctx, s, 0, size * 0.34, { size, fam, weight: fam === 'Caveat' ? 700 : 400, color, align: 'center', boil: 0 });
    ctx.restore(); return w;
  };
  // a bold painted word slapped on (a colour wash block + cream letters)
  P.stamp = (ctx, s, x, y, t, t0, { size = 96, color = C.coral, rot = -0.04, t1 = 1e9, fg = C.cream, fam = P.FT.title } = {}) => {
    if (t < t0) return; const a = clamp((t - t0) / 0.14), k = lerp(1.7, 1, ease.outCubic(a)) * fout(t, t1, 0.3); if (k <= 0.01) return;
    const w = P.measure(ctx, s, size, fam) + 80, h = size * 1.3;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.globalAlpha *= clamp(a * 2);
    P.wash(ctx, P.pRR(-w / 2, -h / 2, w, h, 20), color, { bb: [0, 0, w / 2], seed: s.length + 3, fillA: 0.95 });
    G.text(ctx, s, 0, size * 0.33, { size, fam, weight: fam === 'Caveat' ? 700 : 400, color: fg, align: 'center', boil: 0 });
    ctx.restore();
    P.splat(ctx, x, y, t, t0, { color, r: w * 0.62, seed: s.length });
  };
  P.counter = (ctx, { x, y, from = 0, to, t, t0, t1, size = 150, color = C.coral, prefix = '', suffix = '', decimals = 0, sub = '', subSize = 42, card = true, tEnd = 1e9, fmt }) => {
    const k = pop(t, t0 - 0.25, 0.35) * fout(t, tEnd, 0.3); if (k <= 0.01) return;
    const v = Data.count(t, t0, t1, from, to, ease.outCubic); const f = fmt || ((n) => Data.number(n, { decimals }));
    const str = prefix + f(v) + suffix, strF = prefix + f(to) + suffix; const land = t >= t1 ? Math.exp(-(t - t1) * 8) : 0;
    const w = Math.max(P.measure(ctx, strF, size, P.FT.num, 700), sub ? P.measure(ctx, sub, subSize) : 0) + 100, h = size * 1.1 + (sub ? subSize * 1.5 : 0);
    ctx.save(); ctx.translate(x, y); const sc = k * (1 + 0.05 * land); ctx.scale(sc, sc); ctx.globalAlpha *= clamp(k * 1.4);
    if (card) { ctx.save(); ctx.globalAlpha *= 0.16; ctx.fillStyle = '#10143A'; P.pRR(-w / 2 + 5, -size * 0.9 + 8, w, h + 10, 22)(ctx); ctx.fill(); ctx.restore();
      P.wash(ctx, P.pRR(-w / 2, -size * 0.9, w, h + 10, 22), C.cream, { fillA: 0.97, edge: 0 });
      ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 5 + 3 * land; P.pRR(-w / 2, -size * 0.9, w, h + 10, 22)(ctx); ctx.stroke(); ctx.restore(); }
    G.text(ctx, str, 0, size * 0.1, { size, fam: P.FT.num, weight: 700, color: card ? color : color, align: 'center', boil: 0 });
    if (sub) G.text(ctx, sub, 0, size * 0.12 + subSize * 1.3, { size: subSize, fam: P.FT.hand, weight: 400, color: card ? C.dim : P.fg2(), align: 'center', boil: 0 });
    ctx.restore();
  };
  P.kicker = (ctx, s, t, t0, { x = 110, y = 110, t1 = 1e9, color = C.coral } = {}) => {
    const a = P.win(t, t0, t1, 0.35); if (a <= 0) return;
    P.line(ctx, x, y - 12, x + 46 * ease.outCubic(a), y - 12, color, 7, a);
    G.text(ctx, s, x + 66, y, { size: 38, fam: P.FT.hand, weight: 400, color: P.fg2(), alpha: a, boil: 0 });
  };
  // a painted horizontal bar
  P.hbar = (ctx, { x, y, w, h = 56, frac, t, t0, d = 0.8, color = C.coral, label = '', value = '', t1 = 1e9, seed = 1 }) => {
    const k = ease.outCubic(clamp((t - t0) / d)); const a = fin(t, t0 - 0.2, 0.3) * fout(t, t1, 0.3); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a;
    P.wash(ctx, P.pRR(x, y, w, h, 14), P.dark ? '#46539E' : C.paper2, { edge: 0.25, seed });
    if (k > 0.01) P.wash(ctx, P.pRR(x, y, Math.max(16, w * frac * k), h, 14), color, { bb: [x + w * frac * k / 2, y + h / 2, w * frac / 2 + 10], seed: seed + 1 });
    if (label) P.label(ctx, label, x, y - 16, { size: 38, color: P.fg() });
    if (value) G.text(ctx, value, x + Math.max(16, w * frac * k) + 22, y + h * 0.82, { size: h * 1.1, fam: P.FT.num, weight: 700, color: P.dark ? C.cream : color, alpha: fin(t, t0 + d * 0.6, 0.3), boil: 0 });
    ctx.restore();
  };

  // ---------- backgrounds ----------
  P.paper = (ctx, t, { tint = null, k = 0.25 } = {}) => {
    P.dark = false; ctx.fillStyle = C.paper; ctx.fillRect(-400, -400, G.W + 800, G.H + 800);
    for (let i = 0; i < 9; i++) { const x = U.hash(i, 11) * G.W, y = U.hash(i, 12) * G.H, r = 260 + U.hash(i, 13) * 420; const col = tint || (i % 3 === 0 ? C.gold : i % 3 === 1 ? C.pink : C.sky);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, P.rgba(col, 0.09 * (tint ? k / 0.25 * 1.6 : 1))); g.addColorStop(0.75, P.rgba(col, 0.04)); g.addColorStop(1, P.rgba(col, 0)); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); }
  };
  // a night sky wash. glow: horizon glow colour; stars 0..1
  P.night = (ctx, t, { stars = 1, a = 1, top = C.night, bot = C.night2, seed = 1 } = {}) => {
    P.dark = true; ctx.save(); ctx.globalAlpha *= a;
    const g = ctx.createLinearGradient(0, 0, 0, G.H); g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(-400, -400, G.W + 800, G.H + 800);
    for (let i = 0; i < 12; i++) { const x = U.hash(i, 21 + seed) * G.W, y = U.hash(i, 22 + seed) * G.H, r = 220 + U.hash(i, 23 + seed) * 460; const lc = i % 2 ? '150,160,255' : '8,10,40';
      const gg = ctx.createRadialGradient(x, y, 0, x, y, r); gg.addColorStop(0, `rgba(${lc},${i % 2 ? 0.1 : 0.16})`); gg.addColorStop(1, `rgba(${lc},0)`); ctx.fillStyle = gg; ctx.fillRect(x - r, y - r, 2 * r, 2 * r); }
    if (stars > 0) P.stars(ctx, t, { a: stars, seed: 30 + seed });
    ctx.restore();
  };
  P.stars = (ctx, t, { n = 110, a = 1, seed = 1, x0 = 0, y0 = 0, w = G.W, h = G.H * 0.7 } = {}) => {
    if (a <= 0.01) return; ctx.save();
    for (let i = 0; i < n; i++) { const x = x0 + U.hash(i, seed) * w, y = y0 + U.hash(i, seed + 1) * h, r = 1.4 + 3 * Math.pow(U.hash(i, seed + 2), 3);
      ctx.fillStyle = i % 5 === 0 ? C.gold : C.cream; ctx.globalAlpha = a * (0.4 + 0.5 * U.hash(i, seed + 3)) * (0.75 + 0.25 * Math.sin(t * (0.8 + U.hash(i, 9)) + i)); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); }
    ctx.restore();
  };
  P.moon = (ctx, x, y, r, { a = 1, phase = 0.55, rot = -0.5, glow = 1 } = {}) => {
    if (a <= 0.01) return; P.glow(ctx, x, y, r * 3.2, C.moon, a * 0.5 * glow);
    ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(rot);
    P.wash(ctx, (c) => { c.beginPath(); c.arc(0, 0, r, Math.PI * 0.5, Math.PI * 1.5); c.ellipse(0, 0, r * phase, r, 0, Math.PI * 1.5, Math.PI * 0.5, true); c.closePath(); }, C.moon, { bb: [-r * 0.5, 0, r], seed: 7, edge: 0.35 });
    ctx.restore();
  };
  P.sun = (ctx, x, y, r, t, { a = 1 } = {}) => {
    if (a <= 0.01) return; P.glow(ctx, x, y, r * 3, C.gold, a * 0.7);
    ctx.save(); ctx.globalAlpha *= a; for (let i = 0; i < 12; i++) { const an = i * 0.5236 + t * 0.2; P.line(ctx, x + Math.cos(an) * r * 1.25, y + Math.sin(an) * r * 1.25, x + Math.cos(an) * r * (1.55 + 0.08 * Math.sin(t * 3 + i)), y + Math.sin(an) * r * (1.55 + 0.08 * Math.sin(t * 3 + i)), C.gold, 9, 0.9); }
    P.ell(ctx, x, y, r, r, C.gold, { seed: 21 }); ctx.restore();
  };
  // rolling ground / hill wash
  P.hill = (ctx, y, color, { amp = 40, seed = 1, a = 1, x0 = -100, x1 = G.W + 100, bottom = G.H + 100 } = {}) => {
    const pts = []; for (let x = x0; x <= x1; x += 160) pts.push([x, y + Math.sin(x / 300 + seed) * amp + (U.hash(seed, x) - 0.5) * amp * 0.5]);
    P.wash(ctx, (c) => { P.pCurve(pts, false)(c); c.lineTo(x1, bottom); c.lineTo(x0, bottom); c.closePath(); }, color, { a, bb: [G.W / 2, y + 200, G.W * 0.7], seed, edge: 0.3 });
  };
  globalThis.P = P;
})();
