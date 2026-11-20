// Ep09 'VINTAGE COMIC' look (PLAN.md NEW LOOKS 2026-11-15): aged newsprint paper, Ben-Day halftone dots, bold ink outlines,
// flat four-colour fills (red / yellow / cyan / blue) with Whyverse navy + gold + coral, solid offset ink shadows, panel frames,
// yellow narration boxes, speech bubbles, starbursts. Bangers for comic lettering, Inter 800 for small labels, Bungee numbers.
// Nothing boils, no camera shake (FEEDBACK 4 Nov). Expensive things (paper texture, halftone tiles, maps) are cached once.
(function () {
  const G = globalThis.G, U = globalThis.U, P = globalThis.P, S = globalThis.SCORE; const { clamp, lerp, ease } = U; const C = P.C;
  Object.assign(C, { paper: '#F3E6C8', paper2: '#E8D6AE', paper3: '#DCC497', ink: '#1C1A24', red: '#D8392B', red2: '#B02A20', yel: '#F7C934', yel2: '#E9A91F',
    cyan: '#2FA3D6', blue: '#1F5FA8', blue2: '#163F77', navy: '#14204A', sea: '#2F86C6', sea2: '#1E5F98', deep: '#163A66', warm: '#EC6A3C', warm2: '#F59A45',
    cold: '#5CC2E6', land: '#E8C66E', land2: '#C9A24E', green: '#5FA35A', green2: '#3F7F3E', cream: '#FFF7E6', skin: '#E8B48A', grey: '#8D8A94', white: '#FFFFFF',
    sky: '#8FD0EE', sky2: '#CFEFFA', dusk: '#F2A25C', night: '#1B2550', pink: '#F49AB0', gold: '#F2B84B', coral: '#F0714F', purple: '#6E4C9E' });
  P.COMIC = 'Bangers'; P.HAND = 'Patrick Hand';
  const LW = 6; P.LW = LW;
  // ---------- caches (built once per worker, deterministic) ----------
  const cache = {};
  const off = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  P.dotTile = (color, gap = 14, r = 3.2) => { const k = 'dot' + color + gap + r; if (cache[k]) return cache[k];
    const c = off(gap * 2, gap * 2), x = c.getContext('2d'); x.fillStyle = color; for (const [a, b] of [[0, 0], [gap, gap], [gap * 2, 0], [0, gap * 2], [gap * 2, gap * 2]]) { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); }
    return (cache[k] = c); };
  // fill a path with halftone dots of a colour
  P.dots = (ctx, path, color, { gap = 14, r = 3.2, a = 1, ox = 0, oy = 0 } = {}) => { if (a <= 0.01) return; const pat = ctx.createPattern(P.dotTile(color, gap, r), 'repeat');
    ctx.save(); ctx.globalAlpha *= a; path(ctx); ctx.clip(); ctx.translate(ox, oy); ctx.fillStyle = pat; ctx.fillRect(-3000, -3000, 6000, 6000); ctx.restore(); };
  // a halftone gradient (dots growing from r0 to r1 along a direction) — cached full-frame canvas per key
  P.dotGrad = (key, color, { gap = 16, r0 = 0.5, r1 = 6.5, dir = 'down', w = G.W, h = G.H } = {}) => { const k = 'dg' + key; if (cache[k]) return cache[k];
    const c = off(w, h), x = c.getContext('2d'); x.fillStyle = color;
    for (let yy = 0, j = 0; yy <= h + gap; yy += gap * 0.866, j++) for (let xx = (j % 2) * gap / 2; xx <= w + gap; xx += gap) {
      const f = dir === 'down' ? yy / h : dir === 'up' ? 1 - yy / h : dir === 'radial' ? Math.min(1, Math.hypot(xx - w / 2, yy - h / 2) / (Math.hypot(w, h) / 2)) : xx / w;
      const r = lerp(r0, r1, f); if (r > 0.3) { x.beginPath(); x.arc(xx, yy, r, 0, 7); x.fill(); } }
    return (cache[k] = c); };
  // aged newsprint: flat paper + fibres + faint misregistered dot field (cached), optional sunburst rays
  P.paperTex = () => { if (cache.paper) return cache.paper; const c = off(G.W, G.H), x = c.getContext('2d'); x.fillStyle = C.paper; x.fillRect(0, 0, G.W, G.H);
    for (let i = 0; i < 1600; i++) { x.fillStyle = U.hash(i, 5) < 0.5 ? 'rgba(120,90,40,0.05)' : 'rgba(255,255,255,0.10)'; const px = U.hash(i, 6) * G.W, py = U.hash(i, 7) * G.H; x.fillRect(px, py, 1 + U.hash(i, 8) * 3, 1 + U.hash(i, 9) * 2); }
    const g = x.createRadialGradient(G.W / 2, G.H / 2, G.H * 0.3, G.W / 2, G.H / 2, G.W * 0.75); g.addColorStop(0, 'rgba(160,110,40,0)'); g.addColorStop(1, 'rgba(160,110,40,0.16)'); x.fillStyle = g; x.fillRect(0, 0, G.W, G.H);
    return (cache.paper = c); };
  P.bgPaper = (ctx, t, { rays = 0, rayCol = C.yel, cx = G.W / 2, cy = G.H / 2, spin = 0.03, dots = 0, dotCol = C.red, tint = null } = {}) => {
    P.dark = false; ctx.fillStyle = C.paper; ctx.fillRect(-600, -600, G.W + 1200, G.H + 1200); ctx.drawImage(P.paperTex(), 0, 0);
    if (tint) { ctx.save(); ctx.fillStyle = tint; ctx.globalAlpha = 0.9; ctx.fillRect(-600, -600, G.W + 1200, G.H + 1200); ctx.restore(); }
    if (rays > 0) { ctx.save(); ctx.translate(cx, cy); ctx.rotate(t * spin); const n = 18; for (let i = 0; i < n; i++) { const a0 = i / n * 6.283, a1 = a0 + 6.283 / n / 2; ctx.fillStyle = rayCol; ctx.globalAlpha = rays;
      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a0) * 2600, Math.sin(a0) * 2600); ctx.lineTo(Math.cos(a1) * 2600, Math.sin(a1) * 2600); ctx.closePath(); ctx.fill(); } ctx.restore(); }
    if (dots > 0) { ctx.save(); ctx.globalAlpha = dots; ctx.drawImage(P.dotGrad('paperR' + dotCol, dotCol, { dir: 'radial', r0: 0, r1: 5.5, gap: 18 }), 0, 0); ctx.restore(); }
  };
  // a flat colour background with a halftone gradient from the bottom (sky, sea, night)
  P.bgFlat = (ctx, t, col, { dotCol = null, dir = 'down', a = 0.35, dark = false } = {}) => { P.dark = dark; ctx.fillStyle = col; ctx.fillRect(-600, -600, G.W + 1200, G.H + 1200);
    if (dotCol) { ctx.save(); ctx.globalAlpha = a; ctx.drawImage(P.dotGrad('flat' + dotCol + dir, dotCol, { dir }), 0, 0); ctx.restore(); } };

  // ---------- ink primitives: flat fill + thick outline + solid offset shadow ----------
  P.ink = (ctx, path, fill, { lw = LW, shadow = 0, sx = 8, sy = 8, a = 1, stroke = C.ink, dots = null, dotA = 0.5, dotGap = 12, dotR = 2.6 } = {}) => {
    if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
    if (shadow > 0) { ctx.save(); ctx.translate(sx, sy); ctx.fillStyle = C.ink; ctx.globalAlpha *= shadow; path(ctx); ctx.fill(); ctx.restore(); }
    if (fill) { ctx.fillStyle = fill; path(ctx); ctx.fill(); }
    if (dots) P.dots(ctx, path, dots, { a: dotA, gap: dotGap, r: dotR });
    if (lw > 0) { ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.lineCap = 'round'; path(ctx); ctx.stroke(); }
    ctx.restore();
  };
  P.iE = (ctx, x, y, rx, ry, fill, o = {}) => P.ink(ctx, P.pEll(x, y, rx, ry, o.rot || 0), fill, o);
  P.iC = (ctx, x, y, r, fill, o = {}) => P.ink(ctx, P.pEll(x, y, r, r), fill, o);
  P.iR = (ctx, x, y, w, h, r, fill, o = {}) => P.ink(ctx, P.pRR(x, y, w, h, r), fill, o);
  P.iP = (ctx, pts, fill, o = {}) => P.ink(ctx, o.curve ? P.pCurve(pts, true, 0.5) : P.pPoly(pts), fill, o);
  P.iL = (ctx, x0, y0, x1, y1, lw = LW, col = C.ink, a = 1) => P.line(ctx, x0, y0, x1, y1, col, lw, a);
  // a fat comic arrow (outlined), from A to B, k = growth
  P.fatArrow = (ctx, ax, ay, bx, by, { k = 1, w = 34, color = C.red, a = 1, shadow = 0.9, head = 1.6 } = {}) => {
    if (k <= 0.01 || a <= 0.01) return; const L = Math.hypot(bx - ax, by - ay) * clamp(k), ang = Math.atan2(by - ay, bx - ax), hw = w * head, hl = w * 1.5;
    ctx.save(); ctx.translate(ax, ay); ctx.rotate(ang); const sh = Math.max(0, L - hl);
    P.iP(ctx, [[0, -w / 2], [sh, -w / 2], [sh, -hw / 2 - w / 4], [L, 0], [sh, hw / 2 + w / 4], [sh, w / 2], [0, w / 2]], color, { a, shadow, sx: 5, sy: 6, lw: 5 }); ctx.restore();
  };
  // speed / motion lines behind something moving
  P.speed = (ctx, x, y, len, t, { n = 5, dir = -1, color = C.ink, a = 0.8, spread = 60, lw = 5 } = {}) => { for (let i = 0; i < n; i++) { const yy = y + (i - (n - 1) / 2) * spread / n * 2; const ph = (t * 3 + i * 0.37) % 1;
    const x0 = x + dir * (20 + ph * 30), x1 = x0 + dir * len * (0.5 + 0.5 * U.hash(i, 3)); P.line(ctx, x0, yy, x1, yy, color, lw, a * (1 - ph * 0.6)); } };

  // ---------- lettering ----------
  P.ctext = (ctx, s, x, y, { size = 80, color = C.ink, align = 'center', stroke = null, strokeW = 10, shadow = 0, a = 1, rot = 0, fam = 'Bangers', weight = 400, sx = 6, sy = 7 } = {}) => {
    if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot);
    if (shadow > 0) G.text(ctx, s, sx, sy, { size, fam, weight, color: C.ink, align, alpha: a * shadow, boil: 0, stroke: stroke ? C.ink : null, strokeW });
    G.text(ctx, s, 0, 0, { size, fam, weight, color, align, alpha: a, boil: 0, stroke, strokeW }); ctx.restore(); };
  // a word that slams in (comic sound-effect lettering): scale 1.7→1, ink stroke, offset shadow
  P.slam = (ctx, s, x, y, t, t0, { size = 140, color = C.yel, rot = -0.05, t1 = 1e9, stroke = C.ink, strokeW = 14 } = {}) => {
    if (t < t0) return; const a = clamp((t - t0) / 0.12), k = lerp(1.7, 1, ease.outBack(a, 1.4)) * P.fout(t, t1, 0.25); if (k <= 0.01) return;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); P.ctext(ctx, s, 0, size * 0.35, { size, color, stroke, strokeW, shadow: 1, a: clamp(a * 2) }); ctx.restore(); };
  // starburst (comic explosion balloon) with optional text
  P.starPath = (x, y, r, n = 14, inner = 0.72, seed = 1) => (c) => { c.beginPath(); for (let i = 0; i <= n * 2; i++) { const a = i / (n * 2) * 6.283 - 1.57; const rr = r * (i % 2 ? inner : 1) * (1 + 0.1 * (U.hash(i, seed) - 0.5)); i ? c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr * 0.86) : c.moveTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr * 0.86); } c.closePath(); };
  P.burstStar = (ctx, x, y, r, t, t0, { color = C.yel, text = '', size = 80, tcol = C.red, t1 = 1e9, rot = -0.06, n = 14, seed = 1, sub = '', subSize = 34, wob = true } = {}) => {
    const k = P.pop(t, t0, 0.32, 2.2) * P.fout(t, t1, 0.25); if (k <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot + (wob ? Math.sin(t * 2) * 0.015 : 0)); ctx.scale(k, k);
    P.ink(ctx, P.starPath(0, 0, r, n, 0.74, seed), color, { shadow: 1, sx: 10, sy: 10, lw: 7 });
    P.ink(ctx, P.starPath(0, 0, r * 0.84, n, 0.74, seed), null, { lw: 0, dots: C.yel2 === color ? C.red : C.white, dotA: 0.25 });
    if (text) P.ctext(ctx, text, 0, size * 0.36 - (sub ? subSize * 0.5 : 0), { size, color: tcol, stroke: C.ink, strokeW: 8 });
    if (sub) G.text(ctx, sub, 0, size * 0.36 + subSize * 0.9, { size: subSize, fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0 });
    ctx.restore(); };
  // yellow narration box (top-left caption in old comics)
  P.caption = (ctx, s, x, y, t, t0, { t1 = 1e9, size = 40, fill = C.yel, color = C.ink, align = 'left', rot = -0.01, fam = 'Bangers', maxW = 900 } = {}) => {
    const k = P.oc((t - t0) / 0.25) * P.fout(t, t1, 0.25); if (k <= 0.01) return 0; const lines = String(s).split('\n'); const w = Math.min(maxW, Math.max(...lines.map((l) => P.measure(ctx, l, size, fam, 400)))) + 44, h = lines.length * size * 1.15 + 30;
    const ox = align === 'center' ? -w / 2 : align === 'right' ? -w : 0;
    ctx.save(); ctx.translate(x + ox, y + (1 - k) * -24); ctx.rotate(rot); ctx.globalAlpha *= k;
    P.iR(ctx, 0, 0, w, h, 4, fill, { shadow: 1, sx: 7, sy: 7, lw: 5 });
    lines.forEach((l, i) => G.text(ctx, l, 22, 15 + size * 0.88 + i * size * 1.15, { size, fam, weight: 400, color, boil: 0 }));
    ctx.restore(); return w; };
  // speech bubble with a tail pointing to (tx, ty); text may contain \n
  P.bubble = (ctx, s, x, y, tx, ty, t, t0, { t1 = 1e9, size = 46, fill = C.white, color = C.ink, fam = 'Bangers', think = false, w0 = 0 } = {}) => {
    const k = P.pop(t, t0, 0.3, 2.0) * P.fout(t, t1, 0.25); if (k <= 0.01) return; const lines = String(s).split('\n');
    const w = Math.max(w0, ...lines.map((l) => P.measure(ctx, l, size, fam, 400))) + 80, h = lines.length * size * 1.12 + 56;
    ctx.save(); ctx.translate(lerp(tx, x, k), lerp(ty, y, k)); ctx.scale(k, k); const dx = (tx - x), dy = (ty - y);
    const path = (c) => { c.beginPath(); c.ellipse(0, 0, w / 2, h / 2, 0, 0, 6.283); };
    const tail = (c) => { const a = Math.atan2(dy, dx); const bx = Math.cos(a) * w * 0.32, by = Math.sin(a) * h * 0.32; c.beginPath(); c.moveTo(bx + Math.cos(a + 1.57) * 22, by + Math.sin(a + 1.57) * 22); c.lineTo(dx * 0.8, dy * 0.8); c.lineTo(bx - Math.cos(a + 1.57) * 22, by - Math.sin(a + 1.57) * 22); c.closePath(); };
    ctx.save(); ctx.translate(6, 7); ctx.fillStyle = C.ink; path(ctx); ctx.fill(); if (!think) { tail(ctx); ctx.fill(); } ctx.restore();
    if (!think) P.ink(ctx, tail, fill, { lw: 5 }); P.ink(ctx, path, fill, { lw: 5 }); if (!think) { ctx.fillStyle = fill; ctx.beginPath(); ctx.ellipse(0, 0, w / 2 - 4, h / 2 - 4, 0, 0, 6.283); ctx.fill(); }
    if (think) for (let i = 1; i <= 2; i++) P.iC(ctx, dx * (0.55 + i * 0.15), dy * (0.55 + i * 0.15), 14 - i * 4, fill, { lw: 4 });
    lines.forEach((l, i) => G.text(ctx, l, 0, -((lines.length - 1) * size * 1.12) / 2 + i * size * 1.12 + size * 0.36, { size, fam, weight: 400, color, align: 'center', boil: 0 }));
    ctx.restore(); };
  // stamped label in a box (red stamp)
  P.cstamp = (ctx, s, x, y, t, t0, { size = 80, color = C.red, fg = C.cream, rot = -0.04, t1 = 1e9 } = {}) => {
    if (t < t0) return; const a = clamp((t - t0) / 0.13), k = lerp(1.6, 1, ease.outCubic(a)) * P.fout(t, t1, 0.25); if (k <= 0.01) return;
    const w = P.measure(ctx, s, size, 'Bangers', 400) + 60, h = size * 1.25; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.globalAlpha *= clamp(a * 2);
    P.iR(ctx, -w / 2, -h / 2, w, h, 8, color, { shadow: 1, sx: 8, sy: 8, lw: 6 }); P.ctext(ctx, s, 0, size * 0.36, { size, color: fg }); ctx.restore(); };
  // the comic counter: big Bangers digits with stroke + offset shadow, on a tilted card
  P.ccount = (ctx, { x, y, from = 0, to, t, t0, t1, size = 170, color = C.yel, prefix = '', suffix = '', decimals = 0, sub = '', subSize = 40, tEnd = 1e9, card = true, cardCol = C.blue, rot = -0.03, fmt }) => {
    const k = P.pop(t, t0 - 0.25, 0.35) * P.fout(t, tEnd, 0.3); if (k <= 0.01) return;
    const v = Data.count(t, t0, t1, from, to, ease.outCubic); const f = fmt || ((n) => Data.number(n, { decimals }));
    const str = prefix + f(v) + suffix, strF = prefix + f(to) + suffix; const land = t >= t1 ? Math.exp(-(t - t1) * 8) : 0;
    const w = Math.max(P.measure(ctx, strF, size, 'Bangers', 400), sub ? P.measure(ctx, sub, subSize, 'Inter', 800) : 0) + 100, h = size * 1.08 + (sub ? subSize * 1.7 : 0) + 20;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); const sc = k * (1 + 0.07 * land); ctx.scale(sc, sc);
    if (card) { P.iR(ctx, -w / 2, -size * 0.85, w, h, 10, cardCol, { shadow: 1, sx: 9, sy: 9, lw: 6, dots: C.white, dotA: 0.12 }); }
    P.ctext(ctx, str, 0, size * 0.18, { size, color, stroke: C.ink, strokeW: 12, shadow: card ? 0 : 1 });
    if (sub) G.text(ctx, sub, 0, size * 0.2 + subSize * 1.35, { size: subSize, fam: 'Inter', weight: 800, color: card ? C.cream : C.ink, align: 'center', boil: 0 });
    ctx.restore(); };
  // comic panel: frame that pops/slides in, content clipped inside. draw(ctx) draws in panel-local coords (0..w, 0..h)
  P.panel = (ctx, x, y, w, h, t, t0, draw, { t1 = 1e9, from = 'pop', bg = C.paper, lw = 8, rot = 0, shadow = 1 } = {}) => {
    const k = from === 'pop' ? P.pop(t, t0, 0.35, 1.6) : P.oc((t - t0) / 0.4); const ko = P.fout(t, t1, 0.25); if (k * ko <= 0.01) return;
    ctx.save(); let dx = 0, dy = 0; if (from === 'left') dx = -(1 - k) * 1200; if (from === 'right') dx = (1 - k) * 1200; if (from === 'up') dy = -(1 - k) * 900; if (from === 'down') dy = (1 - k) * 900;
    ctx.translate(x + w / 2 + dx, y + h / 2 + dy); ctx.rotate(rot); const s = from === 'pop' ? k : 1; ctx.scale(s, s); ctx.globalAlpha *= ko * (from === 'pop' ? clamp(k * 2) : 1); ctx.translate(-w / 2, -h / 2);
    if (shadow) { ctx.fillStyle = C.ink; ctx.fillRect(10, 12, w, h); }
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, h); ctx.clip(); ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h); draw(ctx); ctx.restore();
    ctx.strokeStyle = C.ink; ctx.lineWidth = lw; ctx.strokeRect(0, 0, w, h); ctx.restore(); };
  P.source = (ctx, s, t, t0, { t1 = 1e9, dark = null } = {}) => { const a = P.win(t, t0, t1, 0.4); if (a <= 0) return; const str = 'Source: ' + s; const w = P.measure(ctx, str, 22, 'Inter', 700) + 26;
    ctx.save(); ctx.globalAlpha *= a; P.iR(ctx, G.W - 50 - w, G.H - 62, w, 38, 4, C.cream, { lw: 3 }); G.text(ctx, str, G.W - 50 - w / 2, G.H - 36, { size: 22, fam: 'Inter', weight: 700, color: C.ink, align: 'center', boil: 0 }); ctx.restore(); };
  P.note = (ctx, s, x, y, t, t0, { t1 = 1e9, color = C.ink, size = 44, align = 'center', a = 1, rot = -0.02 } = {}) => { const k = P.oc((t - t0) / 0.4) * P.fout(t, t1, 0.3) * a; if (k <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); G.text(ctx, s, 0, 0, { size, fam: P.HAND, weight: 400, color, align, alpha: k, boil: 0 }); ctx.restore(); };
  P.lab = (ctx, s, x, y, { size = 34, color = C.ink, align = 'center', a = 1, stroke = null } = {}) => G.text(ctx, s, x, y, { size, fam: 'Inter', weight: 800, color, align, alpha: a, boil: 0, stroke, strokeW: 8 });
  P.cross = (ctx, x0, y0, x1, y1, k, { color = C.red, lw = 16 } = {}) => { if (k <= 0) return; P.line(ctx, x0, y0, x1, y1, C.ink, lw + 8, 1, ease.outCubic(clamp(k * 2))); P.line(ctx, x0, y0, x1, y1, color, lw, 1, ease.outCubic(clamp(k * 2))); P.line(ctx, x1, y0, x0, y1, C.ink, lw + 8, 1, ease.outCubic(clamp(k * 2 - 1))); P.line(ctx, x1, y0, x0, y1, color, lw, 1, ease.outCubic(clamp(k * 2 - 1))); };
  P.circle = (ctx, x, y, rx, ry, k, { color = C.red, lw = 8 } = {}) => { if (k <= 0) return; const pts = []; for (let i = 0; i <= 60; i++) { const a = -1.2 + (i / 60) * 6.9; const r = 1 + 0.04 * Math.sin(i * 0.9); pts.push([x + Math.cos(a) * rx * r, y + Math.sin(a) * ry * r]); } P.trace(ctx, pts, k, color, lw); };
  P.dimLine = (ctx, x0, y0, x1, y1, label, k = 1, { color = C.ink, size = 34, a = 1, fill = C.yel } = {}) => {
    if (k <= 0.01 || a <= 0) return; ctx.save(); ctx.globalAlpha *= a; const xm = lerp(x0, x1, k), ym = lerp(y0, y1, k); const ang = Math.atan2(y1 - y0, x1 - x0), nx = -Math.sin(ang) * 16, ny = Math.cos(ang) * 16;
    P.line(ctx, x0, y0, xm, ym, color, 5); P.line(ctx, x0 - nx, y0 - ny, x0 + nx, y0 + ny, color, 5); if (k > 0.98) P.line(ctx, x1 - nx, y1 - ny, x1 + nx, y1 + ny, color, 5);
    if (label && k > 0.6) { const w = P.measure(ctx, label, size, 'Bangers', 400) + 30; const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2; ctx.globalAlpha *= clamp((k - 0.6) / 0.3); P.iR(ctx, cx - w / 2, cy - size * 0.72, w, size * 1.44, 6, fill, { lw: 4 }); G.text(ctx, label, cx, cy + size * 0.36, { size, fam: 'Bangers', weight: 400, color: C.ink, align: 'center', boil: 0 }); }
    ctx.restore(); };

  // ---------- weather + world icons (all ink + flat) ----------
  P.cloud = (ctx, x, y, s, { col = C.white, dots = C.cyan, a = 1, dark = false, shadow = 0.9 } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const path = (c) => { c.beginPath(); c.moveTo(-120, 40); c.arc(-80, 10, 46, 2.2, 4.4); c.arc(-20, -30, 62, 3.4, 5.6); c.arc(55, -15, 52, 4.0, 6.0); c.arc(95, 18, 36, 4.9, 1.6); c.closePath(); };
    P.ink(ctx, path, dark ? '#6E7486' : col, { a, shadow, sx: 6 / s, sy: 7 / s, lw: LW / s, dots: dark ? C.ink : dots, dotA: dark ? 0.25 : 0.3 }); ctx.restore(); };
  // a tall storm cloud with a flat anvil top; rain + optional lightning
  P.stormCloud = (ctx, x, y, s, t, { rain = 1, bolt = 0, a = 1 } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a;
    if (rain > 0) { ctx.save(); ctx.beginPath(); ctx.rect(-170, 60, 340, 420); ctx.clip(); for (let i = 0; i < 26; i++) { const xx = -150 + (i * 13) % 300 + 6 * Math.sin(i), ph = ((t * 1.6 + U.hash(i, 4)) % 1); const yy = 70 + ph * 400; P.line(ctx, xx, yy, xx - 10, yy + 34, C.blue, 5, rain * (1 - ph * 0.5)); } ctx.restore(); }
    const shapes = [(c) => { c.beginPath(); c.moveTo(-230, -250); c.quadraticCurveTo(0, -300, 240, -250); c.lineTo(200, -205); c.quadraticCurveTo(0, -225, -190, -205); c.closePath(); }];
    [[-110, 40, 75], [0, 55, 85], [105, 40, 72], [-60, -40, 78], [55, -45, 80], [0, -120, 80], [-30, -175, 62], [40, -180, 60]].forEach(([px, py, r]) => shapes.push((c) => { c.beginPath(); c.arc(px, py, r, 0, 7); }));
    ctx.save(); ctx.translate(8 / s, 8 / s); ctx.fillStyle = C.ink; ctx.globalAlpha *= 0.9; for (const sh of shapes) { sh(ctx); ctx.fill(); } ctx.restore();
    ctx.strokeStyle = C.ink; ctx.lineWidth = 2 * LW / s; ctx.lineJoin = 'round'; for (const sh of shapes) { sh(ctx); ctx.stroke(); }
    ctx.fillStyle = '#EEF3F8'; for (const sh of shapes) { sh(ctx); ctx.fill(); }
    for (const sh of shapes) P.dots(ctx, sh, C.blue, { a: 0.18, gap: 12, r: 2.6 });
    ctx.save(); ctx.globalAlpha *= 0.5; ctx.fillStyle = '#B9C7D6'; ctx.beginPath(); ctx.arc(-110, 40, 60, 0.3, 2.8); ctx.arc(0, 55, 70, 0.6, 2.6); ctx.fill(); ctx.restore();
    if (bolt > 0) { const on = Math.sin(t * 9) > 0.4 ? 1 : 0; if (on) P.iP(ctx, [[10, 80], [-30, 180], [10, 175], [-20, 290], [60, 150], [20, 155], [50, 80]], C.yel, { lw: 4 / s }); }
    ctx.restore(); };
  P.drops = (ctx, x, y, w, h, t, { n = 14, col = C.blue, a = 1, speed = 1.4, seed = 2 } = {}) => { if (a <= 0.01) return; for (let i = 0; i < n; i++) { const ph = (t * speed + U.hash(i, seed)) % 1, xx = x + U.hash(i, seed + 1) * w, yy = y + ph * h; P.line(ctx, xx, yy, xx - 6, yy + 24, col, 5, a * (1 - ph * 0.4)); } };
  P.sunIcon = (ctx, x, y, r, t, { a = 1, col = C.yel } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate(t * 0.4); ctx.globalAlpha *= a; for (let i = 0; i < 10; i++) { const an = i / 10 * 6.283; P.iP(ctx, [[Math.cos(an - 0.14) * r * 1.15, Math.sin(an - 0.14) * r * 1.15], [Math.cos(an) * r * 1.65, Math.sin(an) * r * 1.65], [Math.cos(an + 0.14) * r * 1.15, Math.sin(an + 0.14) * r * 1.15]], C.warm2, { lw: 4 }); } P.iC(ctx, 0, 0, r, col, { lw: 5, dots: C.warm, dotA: 0.35 }); ctx.restore(); };
  P.flame = (ctx, x, y, s, t, { a = 1, seed = 0 } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); const f = Math.sin(t * 9 + seed) * 6, g = Math.sin(t * 7 + seed * 2) * 5;
    P.iP(ctx, [[-60, 0], [-70, -60], [-40, -90 + g], [-30, -50], [-10, -150 + f], [20, -70], [40, -110 - g], [62, -50], [60, 0]], C.red, { lw: 5 / s, curve: true, a, shadow: 0.8, sx: 5, sy: 5 });
    P.iP(ctx, [[-30, 0], [-34, -40], [-8, -90 + f], [12, -40], [26, -70 - g], [34, -20], [30, 0]], C.yel, { lw: 4 / s, curve: true, a }); ctx.restore(); };
  P.crack = (ctx, x, y, w, h, { a = 1, col = C.land2 } = {}) => { if (a <= 0.01) return; P.iR(ctx, x, y, w, h, 6, col, { lw: 5, a, dots: C.red, dotA: 0.2 }); ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    for (let i = 0; i < 9; i++) { const sx = x + U.hash(i, 3) * w, sy = y + U.hash(i, 4) * h; const pts = [[sx, sy]]; let px = sx, py = sy; for (let k = 0; k < 4; k++) { px += (U.hash(i * 7 + k, 5) - 0.5) * w * 0.4; py += (U.hash(i * 7 + k, 6) - 0.5) * h * 0.5; pts.push([px, py]); } P.trace(ctx, pts, 1, C.ink, 4); } ctx.restore(); };
  P.thermo = (ctx, x, y, h, frac, { a = 1, col = C.red, w = 44, label = '' } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
    P.iR(ctx, x - w / 2, y - h, w, h, w / 2, C.white, { shadow: 0.9, lw: 5 }); P.iC(ctx, x, y + w * 0.3, w * 0.85, col, { lw: 5 }); const fh = (h - w * 0.6) * clamp(frac);
    P.rect(ctx, x - w * 0.22, y - fh - 4, w * 0.44, fh + 12, w * 0.2, col); for (let i = 1; i < 6; i++) P.line(ctx, x + w * 0.2, y - h * i / 6, x + w / 2, y - h * i / 6, C.ink, 3);
    if (label) P.ctext(ctx, label, x, y - h - 26, { size: 44, color: C.ink }); ctx.restore(); };
  P.fish = (ctx, x, y, s, t, { col = C.cyan, dir = 1, a = 1, seed = 0 } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s); ctx.rotate(Math.sin(t * 6 + seed) * 0.08);
    P.iP(ctx, [[-50, 0], [-80, -22], [-78, 22]], col, { lw: 4 / s, a }); P.iE(ctx, 0, 0, 52, 22, col, { lw: 4 / s, a, dots: C.blue, dotA: 0.3 }); P.circ(ctx, 28, -5, 4, C.ink, { a }); ctx.restore(); };
  P.boat = (ctx, x, y, s, t, { a = 1, col = C.red, rock = 1, people = 2, net = 0, catch_ = 0 } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y + Math.sin(t * 1.6) * 6 * rock); ctx.rotate(Math.sin(t * 1.3) * 0.03 * rock); ctx.scale(s, s); ctx.globalAlpha *= a;
    for (let i = 0; i < people; i++) P.fisher(ctx, -70 + i * 120, 0, 0.75, t, { seed: i, pose: net > 0 && i === 0 ? 'pull' : 'stand' });
    P.iP(ctx, [[-230, -50], [230, -50], [180, 40], [-180, 40]], col, { lw: 6, shadow: 0.8, dots: C.red2, dotA: 0.3 }); P.line(ctx, -220, -24, 220, -24, C.ink, 4);
    if (net > 0) { const ny = lerp(260, -10, net); ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 3; for (let i = 0; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(-110 + i * 6, -40); ctx.lineTo(-170 + i * 22, ny); ctx.stroke(); }
      P.iE(ctx, -104, ny + 20, 74, 40, 'rgba(240,230,200,0.6)', { lw: 4 }); for (let i = 0; i < catch_; i++) P.fish(ctx, -130 + i * 50, ny + 22, 0.35, t, { seed: i, col: C.grey }); ctx.restore(); }
    ctx.restore(); };
  // a comic fisherman (simple, friendly; straw hat), origin = feet
  P.fisher = (ctx, x, y, s, t, { seed = 0, pose = 'stand', shirt = null, a = 1 } = {}) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a; const sh = shirt || [C.blue, C.green, C.yel, C.cyan][seed % 4];
    P.iR(ctx, -30, -170, 60, 120, 18, sh, { lw: 5 }); P.iR(ctx, -26, -60, 22, 60, 6, C.ink, { lw: 0 }); P.iR(ctx, 4, -60, 22, 60, 6, C.ink, { lw: 0 });
    const pull = pose === 'pull' ? Math.sin(t * 4 + seed) * 10 : 0; P.line(ctx, -26, -150, -70, -90 + pull, C.ink, 14); P.line(ctx, 26, -150, pose === 'pull' ? -50 : 60, pose === 'pull' ? -80 + pull : -90, C.ink, 14);
    P.line(ctx, -26, -150, -70, -90 + pull, C.skin, 8); P.line(ctx, 26, -150, pose === 'pull' ? -50 : 60, pose === 'pull' ? -80 + pull : -90, C.skin, 8);
    P.iC(ctx, 0, -200, 32, C.skin, { lw: 5 }); P.circ(ctx, 10, -204, 4, C.ink); P.iE(ctx, 0, -228, 58, 12, C.land, { lw: 5 }); P.iE(ctx, 0, -240, 30, 20, C.land, { lw: 5 }); ctx.restore(); };
  // a faceless period silhouette with a name plate (historical scientists: PLAN "PEOPLE = SILHOUETTES")
  P.sil = (ctx, x, y, s, t, { hat = 0, a = 1, name = '', sub = '', pose = 'stand', col = C.ink } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a; ctx.save(); ctx.scale(s, s);
    const br = Math.sin(t * 1.5) * 2; P.fill(ctx, P.pPoly([[-70, 0], [-62, -230], [-84, -400], [84, -400], [62, -230], [70, 0], [10, 0], [0, -200], [-10, 0]]), col);
    P.fill(ctx, P.pPoly([[-84, -400], [-120, -250 + (pose === 'shrug' ? -60 : 0)], [-96, -240 + (pose === 'shrug' ? -60 : 0)], [-70, -360]]), col);
    if (pose === 'point') P.fill(ctx, P.pPoly([[84, -400], [220, -420], [216, -392], [70, -350]]), col); else P.fill(ctx, P.pPoly([[84, -400], [120, -250 + (pose === 'shrug' ? -60 : 0)], [96, -240 + (pose === 'shrug' ? -60 : 0)], [70, -360]]), col);
    P.fill(ctx, P.pPoly([[-22, -400], [-10, -360], [0, -400], [10, -360], [22, -400]]), C.cream); P.ell(ctx, 0, -450 + br * 0.3, 48, 56, col);
    if (hat === 1) { P.rect(ctx, -70, -500, 140, 14, 6, col); P.rect(ctx, -40, -560, 80, 64, 8, col); }
    ctx.restore();
    if (name) { const w = Math.max(P.measure(ctx, name, 40, 'Bangers', 400), sub ? P.measure(ctx, sub, 24, 'Inter', 800) : 0) + 40; P.iR(ctx, -w / 2, 18, w, sub ? 88 : 60, 6, C.yel, { lw: 4, shadow: 1, sx: 5, sy: 5 });
      G.text(ctx, name, 0, 62, { size: 40, fam: 'Bangers', color: C.ink, align: 'center', boil: 0 }); if (sub) G.text(ctx, sub, 0, 92, { size: 24, fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0 }); }
    ctx.restore(); };
  // the "wind" — a classic puffed-cheek cloud face blowing; energy 0..1 (tired at 0), dir -1 blows left
  P.windFace = (ctx, x, y, s, t, { energy = 1, dir = -1, a = 1 } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * -dir, s); ctx.globalAlpha *= a;
    const puff = 1 + 0.06 * energy * Math.sin(t * 6); P.cloud(ctx, 0, 0, 1.2 * puff, { col: C.white, dots: C.cyan });
    P.iE(ctx, -60, -10, 30 * puff, 22 * puff, C.pink, { lw: 0, a: 0.55 * energy });
    const eo = energy > 0.4 ? 14 : 4; P.iE(ctx, -30, -30, 12, eo, C.white, { lw: 4 }); P.iE(ctx, 20, -34, 12, eo, C.white, { lw: 4 }); P.circ(ctx, -36, -30, 5, C.ink); P.circ(ctx, 14, -34, 5, C.ink);
    if (energy < 0.4) { P.line(ctx, -46, -44, -14, -40, C.ink, 4); P.line(ctx, 4, -46, 36, -46, C.ink, 4); }
    P.iE(ctx, -96, 14, 12 + 6 * energy, 10 + 4 * energy, C.ink, { lw: 0 });
    if (energy > 0.15) for (let i = 0; i < 4; i++) { const ph = (t * 1.5 * (0.4 + energy) + i / 4) % 1; const xx = -120 - ph * 340 * (0.4 + energy * 0.6), yy = 14 + (i - 1.5) * 24 + Math.sin(ph * 8 + i) * 8; P.line(ctx, xx, yy, xx - 70 * energy, yy, C.ink, 5, energy * (1 - ph)); }
    else { const z = (t * 0.8) % 1; P.ctext(ctx, 'z', 60 + z * 40, -100 - z * 60, { size: 40 + z * 20, color: C.blue, a: 1 - z }); }
    ctx.restore(); };
  P.buoy = (ctx, x, y, s, t, { a = 1 } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y + Math.sin(t * 2) * 6); ctx.scale(s, s); ctx.globalAlpha *= a; P.line(ctx, 0, -130, 0, -40, C.ink, 6); P.iR(ctx, -20, -150, 40, 26, 4, C.yel, { lw: 4 }); P.iP(ctx, [[-60, -40], [60, -40], [40, 20], [-40, 20]], C.red, { lw: 5 }); P.iR(ctx, -70, -46, 140, 16, 4, C.white, { lw: 4 }); ctx.restore(); };
  P.satellite = (ctx, x, y, s, t, { a = 1 } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t) * 0.1); ctx.scale(s, s); ctx.globalAlpha *= a; P.iR(ctx, -170, -30, 120, 60, 4, C.blue, { lw: 4, dots: C.white, dotA: 0.3 }); P.iR(ctx, 50, -30, 120, 60, 4, C.blue, { lw: 4, dots: C.white, dotA: 0.3 }); P.line(ctx, -50, 0, 50, 0, C.ink, 6); P.iR(ctx, -40, -44, 80, 88, 8, C.gold, { lw: 5 }); P.iE(ctx, 0, 60, 30, 12, C.white, { lw: 4 }); ctx.restore(); };
  P.ship = (ctx, x, y, s, t, { a = 1, col = C.red } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y + Math.sin(t * 1.4 + x) * 3); ctx.scale(s, s); ctx.globalAlpha *= a;
    for (let i = 0; i < 4; i++) P.iR(ctx, -110 + i * 52, -64, 46, 34, 3, [C.yel, C.cyan, C.green, C.warm][i], { lw: 3 }); P.iR(ctx, 90, -96, 40, 66, 4, C.white, { lw: 4 }); P.iP(ctx, [[-140, -30], [150, -30], [120, 20], [-120, 20]], col, { lw: 5 }); ctx.restore(); };
  P.coral = (ctx, x, y, s, t, { bleach = 0, a = 1, seed = 0 } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a; const cols = [C.coral, C.pink, C.purple, C.yel];
    for (let i = 0; i < 5; i++) { const c = P.mix(cols[(i + seed) % 4], '#FFFFFF', bleach * 0.9); const bx = -80 + i * 40, sw = Math.sin(t * 1.5 + i + seed) * 4; const pts = [[bx - 12, 0], [bx - 14 + sw, -70 - i * 8], [bx - 30 + sw, -100 - i * 6], [bx - 16 + sw, -110 - i * 6], [bx + sw, -80 - i * 8], [bx + 16 + sw, -120 - i * 4], [bx + 30 + sw, -108 - i * 4], [bx + 12 + sw, -60], [bx + 12, 0]];
      P.iP(ctx, pts, c, { lw: 4 / s, curve: true }); } ctx.restore(); };

  // ---------- the guide: PICO, a Peruvian pelican (comic). Origin = feet. Height ≈ 330 px at s = 1. dir 1 faces right ----------
  // the beak is the mouth (the pouch opens with the voice). gestures: idle | point | pointUp | wave | cheer | shrug | think | hold | sad | dive | fly
  Ch.pico = (ctx, o = {}) => {
    const { x = 0, y = 0, s = 1, t = 0, dir = 1, gesture = 'idle', mouth = 0, eyes = 'open', look = 0, a = 1, rot = 0, hop = 0, prop = null } = o;
    if (a <= 0.01 || s <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a;
    ctx.save(); ctx.globalAlpha *= 0.25; ctx.fillStyle = C.ink; ctx.beginPath(); ctx.ellipse(0, 4 * s, 70 * s, 11 * s, 0, 0, 7); ctx.fill(); ctx.restore();
    ctx.scale(s * dir, s); ctx.rotate(rot); const by = -Math.abs(Math.sin(hop * Math.PI)) * 60 + Math.sin(t * 2.2) * 2.5; ctx.translate(0, by);
    const body = '#8C97AE', body2 = '#6B7690', belly = '#E9E3D6', beak = '#F2A23A', pouch = '#E5704A';
    // legs + webbed feet
    P.line(ctx, -16, -60, -20, -8, C.ink, 9); P.line(ctx, 18, -60, 22, -8, C.ink, 9);
    P.iP(ctx, [[-44, 0], [-20, -12], [4, 0]], beak, { lw: 4 }); P.iP(ctx, [[0, 0], [24, -12], [48, 0]], beak, { lw: 4 });
    // tail + body (big pear)
    P.iP(ctx, [[-62, -90], [-104, -76], [-70, -116]], body2, { lw: 5 });
    P.iP(ctx, [[-66, -64], [-76, -120], [-50, -168], [10, -184], [56, -150], [64, -96], [40, -58], [-20, -50]], body, { lw: 6, curve: true, dots: C.ink, dotA: 0.18 });
    P.iP(ctx, [[-10, -60], [-20, -110], [10, -160], [46, -140], [50, -90], [30, -62]], belly, { lw: 0, curve: true, a: 0.9 });
    // wings as arms
    let hn = [40, -110], hf = [-50, -110]; const sw = Math.sin(t * 3) * 5;
    switch (gesture) {
      case 'point': hn = [150, -160 + sw * 0.4]; break; case 'pointUp': hn = [70, -280 + sw * 0.3]; break;
      case 'wave': hn = [70 + Math.sin(t * 10) * 18, -270]; break; case 'cheer': hn = [64, -280 + Math.sin(t * 9) * 10]; hf = [-80, -270 + Math.sin(t * 9 + 1) * 10]; break;
      case 'shrug': hn = [110, -170]; hf = [-110, -170]; break; case 'think': hn = [60, -230]; break; case 'hold': hn = [90, -150]; hf = [-90, -150]; break;
      case 'sad': hn = [36, -70]; hf = [-50, -70]; break; case 'fly': hn = [140, -220 + Math.sin(t * 8) * 60]; hf = [-150, -220 + Math.sin(t * 8) * 60]; break;
    }
    const wing = (sx, sy, hx, hy, col) => { const ang = Math.atan2(hy - sy, hx - sx), L = Math.hypot(hx - sx, hy - sy); ctx.save(); ctx.translate(sx, sy); ctx.rotate(ang);
      P.iP(ctx, [[0, -18], [L * 0.5, -22], [L, -6], [L + 14, 4], [L * 0.6, 16], [0, 18]], col, { lw: 5, curve: true }); for (let i = 1; i < 4; i++) P.line(ctx, L * (0.55 + i * 0.12), -6, L * (0.5 + i * 0.12), 12, C.ink, 3); ctx.restore(); };
    wing(-30, -140, hf[0], hf[1], body2);
    // neck + head
    P.iP(ctx, [[0, -170], [-6, -230], [20, -262], [52, -256], [40, -220], [36, -170]], belly, { lw: 6, curve: true });
    ctx.save(); ctx.translate(30, -262); const tilt = gesture === 'think' ? -0.15 : gesture === 'shrug' ? 0.12 : Math.sin(t * 1.3) * 0.05; ctx.rotate(tilt);
    P.iE(ctx, 0, 0, 44, 38, C.cream, { lw: 6 }); P.iP(ctx, [[-30, -30], [-10, -54], [12, -40], [30, -58], [36, -30]], C.yel, { lw: 5 }); // yellow crest
    // beak: upper bill + pouch (opens with the voice)
    const mo = clamp(mouth); const op = mo * 26;
    P.iP(ctx, [[18, -10], [190, 4], [196, 14], [24, 10]], beak, { lw: 5 });
    P.iP(ctx, [[24, 10], [190, 16 + op * 0.3], [150, 30 + op], [70, 44 + op * 1.1], [26, 26]], pouch, { lw: 5, curve: false, dots: C.red2, dotA: 0.25 });
    P.line(ctx, 30, 2, 186, 10, C.ink, 3);
    // eye (blink every ~4.1 s)
    const bph = (t + 0.7) % 4.1; const blink = bph < 0.13 ? Math.sin((bph / 0.13) * Math.PI) : 0; const lx = clamp(look, -1, 1) * 5;
    if (eyes === 'happy') P.stroke(ctx, (c) => { c.beginPath(); c.arc(-2 + lx, -4, 11, Math.PI * 1.1, Math.PI * 1.9); }, C.ink, 5);
    else if (eyes === 'sad') { P.stroke(ctx, (c) => { c.beginPath(); c.arc(-2, -10, 10, Math.PI * 0.15, Math.PI * 0.85); }, C.ink, 5); P.line(ctx, -18, -26, 10, -18, C.ink, 4); }
    else { const er = eyes === 'wide' ? 15 : 12; P.iE(ctx, -2, -6, er, er * (1 - blink * 0.9), C.white, { lw: 4 }); if (blink < 0.5) { P.circ(ctx, 1 + lx, -6, eyes === 'wide' ? 6 : 6.5, C.ink); P.circ(ctx, 3 + lx, -9, 2, C.white); } }
    ctx.restore();
    wing(30, -140, hn[0], hn[1], body);
    if (prop) prop(ctx, hn[0], hn[1]);
    ctx.restore();
  };
  globalThis.CAST = [{ name: 'Pico', draw: (ctx, o) => Ch.pico(ctx, o) }];

  // ---------- chapter cards + hooks ----------
  P.chapterCard = (ctx, t, n, title, t0, t1) => {
    const a = P.win(t, t0, t1, 0.3); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a;
    P.burstStar(ctx, 960, 400, 190, t, t0 + 0.1, { color: C.red, text: String(n), size: 220, tcol: C.yel, n: 16, seed: n });
    P.cstamp(ctx, 'CHAPTER ' + n, 960, 150, t, t0 + 0.2, { size: 54, color: C.blue, fg: C.cream, rot: 0.02 });
    const fs = Math.min(150, 150 * 1640 / P.measure(ctx, title.toUpperCase(), 150, 'Bangers', 400));
    P.slam(ctx, title.toUpperCase(), 960, 690, t, t0 + 0.35, { size: fs, color: C.yel, rot: -0.03, strokeW: 16 });
    ctx.restore();
  };
  P.hookBox = (ctx, h, t, t1) => {
    const a = clamp((t - (h.t - 0.3)) / 0.3), b = 1 - clamp((t - (t1 - 0.4)) / 0.35); const k = Math.min(ease.outCubic(a), b); if (k <= 0.01) return;
    const size = 54, maxW = 1460, fam = 'Inter', sp = P.measure(ctx, ' ', size, fam, 800); const lines = [[]]; let x = 0;
    for (const w of h.words) { const ww = P.measure(ctx, w.w, size, fam, 800); if (x + ww > maxW && x > 0) { lines.push([]); x = 0; } lines[lines.length - 1].push({ ...w, x, ww }); x += ww + sp; }
    const lh = size * 1.3, Hh = lines.length * lh + 50, y0 = 790;
    ctx.save(); ctx.globalAlpha *= k; ctx.translate(0, (1 - k) * 40); ctx.rotate(-0.006);
    P.iR(ctx, G.W / 2 - maxW / 2 - 50, y0 - 34, maxW + 100, Hh, 4, C.yel, { shadow: 1, sx: 9, sy: 9, lw: 6 });
    lines.forEach((ln, li) => { const lw = ln.length ? ln[ln.length - 1].x + ln[ln.length - 1].ww : 0; const ox = G.W / 2 - lw / 2;
      for (const w of ln) { const q = clamp((t - w.t) / 0.14); G.text(ctx, w.w, ox + w.x, y0 + 36 + li * lh, { size, fam, weight: 800, color: C.ink, alpha: 0.18 + 0.82 * q, boil: 0 }); } });
    ctx.restore();
  };
  // chapter card shot: halftone rays + a themed prop; title lifts when the hook box arrives
  P.cardShot = (c, n, title, rayCol, bg, o = {}) => P.shot(S.CH[c].t0, (ctx, t, s) => {
    P.bgPaper(ctx, t, { rays: 0.55, rayCol, cy: 400, spin: 0.04 }); if (bg) bg(ctx, t, s);
    const h = S.ev[c + '_hook'], up = h ? ease.inOutCubic(clamp((t - (h.t - 0.45)) / 0.5)) : 0;
    ctx.save(); ctx.translate(0, -90 * up); P.chapterCard(ctx, t, n, title, S.CH[c].t0 + 0.1, S.ev[c + '_cardOut']); ctx.restore();
    if (h) P.hookBox(ctx, h, t, S.ev[c + '_cardOut']);
  }, Object.assign({ in: { type: 'wipe', dir: 'left', dur: 0.6 } }, o));
  // progress: a tiny ocean strip; the warm blob slides west → east one step per chapter ("CH n / 6")
  P.progress = (ctx, t, n, a = 1) => {
    if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const x0 = 60, y = G.H - 64, w = 300, h = 34;
    P.iR(ctx, x0, y, w, h, 17, C.sea, { lw: 4, shadow: 0.8, sx: 4, sy: 4 }); const k = clamp(n / 6), bx = x0 + 30 + (w - 60) * k;
    ctx.save(); P.pRR(x0, y, w, h, 17)(ctx); ctx.clip(); const g = ctx.createRadialGradient(bx, y + h / 2, 2, bx, y + h / 2, 70); g.addColorStop(0, C.warm); g.addColorStop(1, 'rgba(236,106,60,0)'); ctx.fillStyle = g; ctx.fillRect(x0, y, w, h); ctx.restore();
    for (let i = 0; i <= 6; i++) P.circ(ctx, x0 + 30 + (w - 60) * i / 6, y + h / 2, i <= n ? 5 : 3, i <= n ? C.yel : 'rgba(255,255,255,0.6)');
    P.iR(ctx, x0 + w + 14, y - 2, 128, h + 4, 4, C.cream, { lw: 3 }); G.text(ctx, n > 0 ? 'CH ' + n + ' / 6' : 'START', x0 + w + 78, y + 26, { size: 24, fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0 });
    ctx.restore();
  };
  // Whyverse ringed planet (brand)
  P.brandPlanet = (ctx, x, y, r, t, a = 1) => { if (r < 1 || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.ink; ctx.lineWidth = r * 0.2; ctx.beginPath(); ctx.ellipse(x, y, r * 1.8, r * 0.45, -0.3, Math.PI, Math.PI * 2); ctx.stroke(); ctx.strokeStyle = C.gold; ctx.lineWidth = r * 0.12; ctx.stroke();
    P.iC(ctx, x, y, r, '#4F7FE0', { lw: 5, dots: C.white, dotA: 0.25 });
    ctx.beginPath(); ctx.ellipse(x, y, r * 1.8, r * 0.45, -0.3, 0, Math.PI); ctx.strokeStyle = C.ink; ctx.lineWidth = r * 0.2; ctx.stroke(); ctx.strokeStyle = C.gold; ctx.lineWidth = r * 0.12; ctx.stroke(); ctx.restore(); };
})();
