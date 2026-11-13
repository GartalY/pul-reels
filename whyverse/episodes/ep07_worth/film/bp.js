// Whyverse ep07 — BLUEPRINT look (STYLE ROTATION: blueprint, Gartal 2026-11-08 reference):
// deep blueprint blue + fine/major grid, white technical line art that draws itself on, yellow tags, digits in boxes,
// dimension lines, handwritten annotations, a title block (progress "SHEET n / 8") in the corner.
// Pure functions of their args + t. No boil, no shake except real impacts (FEEDBACK 4 Nov).
(function () {
  const G = globalThis.G, U = globalThis.U, Data = globalThis.Data, S = globalThis.SCORE, P = globalThis.P;
  const { clamp, lerp, ease } = U; const C = P.C;
  Object.assign(C, {
    bp: '#0F4C8A', bp2: '#0A3566', bp3: '#072748', ln: '#EAF4FF', ln2: 'rgba(234,244,255,0.5)', ln3: 'rgba(234,244,255,0.16)',
    yel: '#FFD54A', yel2: '#F2B22E', cor: '#FF7B5C', mint: '#6EE7B7', cyan: '#7FD3FF', ink2: '#0B2E57', fillW: 'rgba(234,244,255,0.07)',
  });
  P.HAND = 'PatrickHand';

  // ---------- background: blueprint paper with a slowly drifting grid ----------
  P.bp = (ctx, t, { drift = 1, top = C.bp, bot = C.bp2, grid = 1 } = {}) => {
    P.dark = true; const g = ctx.createRadialGradient(G.W / 2, G.H * 0.45, 100, G.W / 2, G.H / 2, G.W * 0.75);
    g.addColorStop(0, top); g.addColorStop(1, bot); ctx.fillStyle = g; ctx.fillRect(-600, -600, G.W + 1200, G.H + 1200);
    if (grid <= 0) return;
    const ox = (t * 6 * drift) % 40, oy = (t * 3 * drift) % 40;
    ctx.save(); ctx.globalAlpha *= grid; ctx.lineWidth = 1.5; ctx.strokeStyle = 'rgba(234,244,255,0.07)'; ctx.beginPath();
    for (let x = -600 - ox; x <= G.W + 600; x += 40) { ctx.moveTo(x, -600); ctx.lineTo(x, G.H + 600); }
    for (let y = -600 - oy; y <= G.H + 600; y += 40) { ctx.moveTo(-600, y); ctx.lineTo(G.W + 600, y); } ctx.stroke();
    ctx.lineWidth = 2.2; ctx.strokeStyle = 'rgba(234,244,255,0.13)'; ctx.beginPath();
    for (let x = -600 - ((t * 6 * drift) % 200); x <= G.W + 600; x += 200) { ctx.moveTo(x, -600); ctx.lineTo(x, G.H + 600); }
    for (let y = -600 - ((t * 3 * drift) % 200); y <= G.H + 600; y += 200) { ctx.moveTo(-600, y); ctx.lineTo(G.W + 600, y); } ctx.stroke();
    ctx.restore();
  };
  // sheet border (inner frame line) — drawn by the film on top of every blueprint shot
  P.frame = (ctx, a = 1) => { ctx.save(); ctx.globalAlpha *= a * 0.5; ctx.strokeStyle = C.ln; ctx.lineWidth = 3; ctx.strokeRect(34, 34, G.W - 68, G.H - 68); ctx.lineWidth = 1.5; ctx.strokeRect(46, 46, G.W - 92, G.H - 92); ctx.restore(); };
  // title block bottom-right: WHYVERSE · SHEET n / 8 · chapter name (the progress counter)
  P.titleBlock = (ctx, n, name, a = 1) => {
    if (a <= 0.01) return; const w = 430, h = 92, x = G.W - 46 - w, y = G.H - 46 - h;
    ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = 'rgba(7,39,72,0.78)'; ctx.fillRect(x, y, w, h); ctx.strokeStyle = 'rgba(234,244,255,0.55)'; ctx.lineWidth = 2; ctx.strokeRect(x, y, w, h);
    ctx.beginPath(); ctx.moveTo(x + 150, y); ctx.lineTo(x + 150, y + h); ctx.moveTo(x + 150, y + h / 2); ctx.lineTo(x + w, y + h / 2); ctx.stroke();
    G.text(ctx, 'WHYVERSE', x + 75, y + 38, { size: 22, fam: 'Bungee', color: C.yel, align: 'center', boil: 0 });
    G.text(ctx, 'EP 07', x + 75, y + 72, { size: 22, fam: 'Inter', weight: 800, color: C.ln, align: 'center', boil: 0 });
    G.text(ctx, 'SHEET', x + 166, y + 33, { size: 18, fam: 'Inter', weight: 700, color: C.ln2, boil: 0 });
    for (let i = 0; i < 8; i++) { const on = i < n; ctx.fillStyle = on ? C.yel : 'rgba(234,244,255,0.15)'; ctx.fillRect(x + 236 + i * 23, y + 15, 17, 22); }
    G.text(ctx, String(name).toUpperCase(), x + 166, y + 76, { size: 20, fam: 'Inter', weight: 800, color: C.ln, boil: 0 });
    ctx.restore();
  };

  // ---------- line art ----------
  // parts: array of polylines [[x,y],...] (or {pts, closed, fill, color, lw, dash}); draws them in order, k = 0..1 of total length
  const plen = (pts, closed) => { let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (closed) L += Math.hypot(pts[0][0] - pts[pts.length - 1][0], pts[0][1] - pts[pts.length - 1][1]); return L; };
  P.art = (ctx, parts, k = 1, { x = 0, y = 0, s = 1, rot = 0, color = C.ln, lw = 5, a = 1, fill = null, fillA = 1 } = {}) => {
    if (a <= 0.01 || k <= 0.001) return; const ps = parts.map((p) => (Array.isArray(p) ? { pts: p } : p)); const lens = ps.map((p) => plen(p.pts, p.closed)); const tot = lens.reduce((a, b) => a + b, 0) || 1;
    ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot); if (s !== 1) ctx.scale(s, s); ctx.globalAlpha *= a;
    // fills appear once the outline is mostly drawn
    const fk = clamp((k - 0.55) / 0.45) * fillA;
    if (fk > 0) for (const p of ps) { const f = p.fill || (p.closed && fill); if (!f) continue; ctx.save(); ctx.globalAlpha *= fk; ctx.fillStyle = f; ctx.beginPath(); p.pts.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath(); ctx.fill(); ctx.restore(); }
    let rem = tot * clamp(k);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ps.forEach((p, j) => { if (rem <= 0) return; const pts = p.closed ? p.pts.concat([p.pts[0]]) : p.pts; ctx.strokeStyle = p.color || color; ctx.lineWidth = (p.lw || lw) / s; if (p.dash) ctx.setLineDash(p.dash.map((d) => d / s)); else ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length && rem > 0; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); const f = Math.min(1, rem / (d || 1)); ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); rem -= d; }
      ctx.stroke(); });
    ctx.restore();
  };
  P.circPts = (cx, cy, r, n = 48, a0 = 0, a1 = Math.PI * 2, ry = null) => { const o = []; for (let i = 0; i <= n; i++) { const a = lerp(a0, a1, i / n); o.push([cx + Math.cos(a) * r, cy + Math.sin(a) * (ry == null ? r : ry)]); } return o; };
  P.rectPts = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]];
  // a dimension line with extension ticks, arrowheads and a boxed label
  P.dim = (ctx, x0, y0, x1, y1, label, k = 1, { color = C.yel, size = 34, a = 1, lw = 3.5, box = true, fam = 'Inter' } = {}) => {
    if (k <= 0.001 || a <= 0.01) return; const ang = Math.atan2(y1 - y0, x1 - x0), nx = -Math.sin(ang), ny = Math.cos(ang); const kk = ease.outCubic(clamp(k / 0.7));
    const mx = (x0 + x1) / 2, my = (y0 + y1) / 2; const ax = lerp(mx, x0, kk), ay = lerp(my, y0, kk), bx = lerp(mx, x1, kk), by = lerp(my, y1, kk);
    ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
    for (const [px, py] of [[x0, y0], [x1, y1]]) { ctx.moveTo(px + nx * 18, py + ny * 18); ctx.lineTo(px - nx * 18, py - ny * 18); } ctx.stroke();
    const head = (px, py, d) => { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - Math.cos(ang + 0.4) * 16 * d, py - Math.sin(ang + 0.4) * 16 * d); ctx.lineTo(px - Math.cos(ang - 0.4) * 16 * d, py - Math.sin(ang - 0.4) * 16 * d); ctx.closePath(); ctx.fill(); };
    if (kk > 0.95) { head(x1, y1, 1); head(x0, y0, -1); }
    const la = clamp((k - 0.6) / 0.4); if (label && la > 0) { ctx.globalAlpha *= la; const w = P.measure(ctx, label, size, fam, 800) + 28;
      if (box) { ctx.fillStyle = C.bp3; ctx.fillRect(mx - w / 2, my - size * 0.75, w, size * 1.5); ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.strokeRect(mx - w / 2, my - size * 0.75, w, size * 1.5); }
      G.text(ctx, label, mx, my + size * 0.36, { size, fam, weight: 800, color, align: 'center', boil: 0 }); }
    ctx.restore();
  };
  // handwritten annotation with a leader line from (px,py) to the text
  P.note = (ctx, s, px, py, tx, ty, t, t0, { t1 = 1e9, color = C.yel, size = 44, align = 'center', a = 1 } = {}) => {
    const k = clamp((t - t0) / 0.45) * P.fout(t, t1, 0.3) * a; if (k <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= Math.min(1, k * 1.6); const lk = ease.outCubic(clamp(k / 0.6));
    if (px != null) { ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(lerp(px, tx, lk), lerp(py, ty + 10, lk)); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = color; ctx.beginPath(); ctx.arc(px, py, 7, 0, 7); ctx.fill(); }
    G.text(ctx, s, tx, ty + (1 - k) * 12 + size * 0.35, { size, fam: P.HAND, weight: 400, color, align, boil: 0, alpha: clamp((k - 0.3) / 0.5) });
    ctx.restore();
  };
  // yellow tag (dark text) — the reference reel's tags
  P.ytag = (ctx, s, x, y, t, t0, t1 = 1e9, o = {}) => P.tag(ctx, s, x, y, t, t0, t1, Object.assign({ size: 40, fill: C.yel, color: C.ink2 }, o));
  // digits in boxes; value string drawn char by char, each digit in its own cell
  P.digits = (ctx, str, x, y, { size = 110, color = C.ln, box = C.ln, align = 'center', a = 1, land = 0, fillBox = 'rgba(7,39,72,0.65)', hot = C.yel } = {}) => {
    if (a <= 0.01) return; const cw = size * 0.86, gap = size * 0.12, sw = size * 0.34; const ch = String(str).split('');
    const wOf = (c) => (/[0-9]/.test(c) ? cw : /[A-Za-z$£€]/.test(c) ? cw : c === ' ' ? sw * 0.6 : sw);
    const tw = ch.reduce((s, c) => s + wOf(c) + gap, -gap); let xx = align === 'center' ? x - tw / 2 : align === 'right' ? x - tw : x;
    ctx.save(); ctx.globalAlpha *= a;
    const col = land > 0 ? P.mix(color.length === 7 ? color : '#EAF4FF', hot, land) : color;
    for (const c of ch) { const w = wOf(c);
      if (/[0-9A-Za-z$£€]/.test(c)) { ctx.fillStyle = fillBox; ctx.fillRect(xx, y - size * 0.9, w, size * 1.1); ctx.strokeStyle = land > 0 ? P.mix('#EAF4FF', hot, land) : box; ctx.lineWidth = 3; ctx.strokeRect(xx, y - size * 0.9, w, size * 1.1);
        G.text(ctx, c, xx + w / 2, y - size * 0.02, { size: size * 0.8, fam: 'Bungee', weight: 400, color: col, align: 'center', boil: 0 }); }
      else if (c !== ' ') G.text(ctx, c, xx + w / 2, y - size * 0.02, { size: size * 0.8, fam: 'Bungee', weight: 400, color: col, align: 'center', boil: 0 });
      xx += w + gap; }
    ctx.restore(); return tw;
  };
  // a counter in digit boxes (rolls, lands with a yellow flash)
  P.bcount = (ctx, { x, y, from = 0, to, t, t0, t1, size = 110, prefix = '', suffix = '', decimals = 0, sub = '', subSize = 40, tEnd = 1e9, fmt, align = 'center' }) => {
    const k = P.fin(t, t0 - 0.25, 0.3) * P.fout(t, tEnd, 0.3); if (k <= 0.01) return;
    const v = Data.count(t, t0, t1, from, to, ease.outCubic); const f = fmt || ((n) => Data.number(n, { decimals }));
    const land = t >= t1 ? Math.exp(-(t - t1) * 3) : 0; const str = prefix + f(v) + suffix;
    ctx.save(); ctx.translate(x, y); ctx.scale(1 + 0.04 * land, 1 + 0.04 * land); ctx.translate(-x, -y);
    const tw = P.digits(ctx, str, x, y, { size, a: k, land, align });
    if (sub) G.text(ctx, sub, x, y + size * 0.22 + subSize * 1.2, { size: subSize, fam: 'Inter', weight: 800, color: C.ln2, align, boil: 0, alpha: k });
    ctx.restore(); return tw;
  };
  // a boxed card (dark fill + white frame) — used for equations, questions
  P.panel = (ctx, x, y, w, h, k = 1, { color = C.ln, fill = 'rgba(7,39,72,0.8)', lw = 3 } = {}) => {
    if (k <= 0.01) return; const kk = ease.outCubic(clamp(k)); ctx.save(); ctx.globalAlpha *= clamp(k * 2); ctx.fillStyle = fill; ctx.fillRect(x + w / 2 - w / 2 * kk, y, w * kk, h);
    ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.strokeRect(x + w / 2 - w / 2 * kk, y, w * kk, h);
    // corner ticks
    ctx.lineWidth = 5; ctx.strokeStyle = C.yel; const cx0 = x + w / 2 - w / 2 * kk, cx1 = x + w / 2 + w / 2 * kk;
    ctx.beginPath(); ctx.moveTo(cx0, y + 26); ctx.lineTo(cx0, y); ctx.lineTo(cx0 + 26, y); ctx.moveTo(cx1 - 26, y + h); ctx.lineTo(cx1, y + h); ctx.lineTo(cx1, y + h - 26); ctx.stroke(); ctx.restore();
  };
  // a red-pen "crossed out" stroke over a region
  P.cross = (ctx, x0, y0, x1, y1, k, { color = C.cor, lw = 12 } = {}) => { if (k <= 0) return; P.line(ctx, x0, y0, x1, y1, color, lw, 1, ease.outCubic(clamp(k / 0.5))); P.line(ctx, x0, y1, x1, y0, color, lw, 1, ease.outCubic(clamp((k - 0.5) / 0.5))); };
  // a hand-drawn circle around something
  P.circle = (ctx, x, y, rx, ry, k, { color = C.yel, lw = 6 } = {}) => { if (k <= 0) return; const pts = []; for (let i = 0; i <= 60; i++) { const a = -1.2 + (i / 60) * 6.9; const r = 1 + 0.04 * Math.sin(i * 0.9); pts.push([x + Math.cos(a) * rx * r, y + Math.sin(a) * ry * r]); } P.art(ctx, [pts], k, { color, lw }); };
  // a plotter crosshair that glides between targets (ambient motion)
  P.crosshair = (ctx, x, y, a = 1, r = 26) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * 0.8; ctx.strokeStyle = C.yel; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.moveTo(x - r * 1.7, y); ctx.lineTo(x + r * 1.7, y); ctx.moveTo(x, y - r * 1.7); ctx.lineTo(x, y + r * 1.7); ctx.stroke(); ctx.restore(); };

  // ---------- chapter card + hook strip (blueprint versions) ----------
  P.chapterBP = (ctx, t, n, title, t0, t1) => {
    const a = P.win(t, t0, t1, 0.3); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a;
    const k = P.oc((t - t0) / 0.5);
    P.panel(ctx, 380, 330, 1160, 330, k);
    G.text(ctx, 'SHEET ' + String(n + 1).padStart(2, '0') + ' / 08', 440, 410, { size: 34, fam: 'Inter', weight: 800, color: C.yel, alpha: P.fin(t, t0 + 0.15, 0.3), boil: 0 });
    P.write(ctx, 'CHAPTER ' + n, 440, 470, t, t0 + 0.2, { size: 40, align: 'left', color: C.ln2, weight: 800 });
    const fs = Math.min(96, 96 * 1040 / P.measure(ctx, title, 96, 'Inter', 800));
    P.write(ctx, title, 440, 580, t, t0 + 0.35, { size: fs, align: 'left', color: C.ln, weight: 800, stag: 0.08 });
    P.dim(ctx, 440, 625, 440 + Math.min(1040, P.measure(ctx, title, fs, 'Inter', 800)), 625, '', P.fin(t, t0 + 0.7, 0.5), { color: C.yel });
    ctx.restore();
  };
  P.hookBP = (ctx, h, t, t1) => {
    const a = clamp((t - (h.t - 0.3)) / 0.35), b = 1 - clamp((t - (t1 - 0.4)) / 0.35); const k = Math.min(ease.outCubic(a), b); if (k <= 0.01) return;
    const size = 58, maxW = 1400, sp = P.measure(ctx, ' ', size, 'Inter', 700); const lines = [[]]; let x = 0;
    for (const w of h.words) { const ww = P.measure(ctx, w.w, size, 'Inter', 700); if (x + ww > maxW && x > 0) { lines.push([]); x = 0; } lines[lines.length - 1].push({ ...w, x, ww }); x += ww + sp; }
    const lh = size * 1.3, Hh = lines.length * lh + 60, y0 = 690;
    ctx.save(); ctx.globalAlpha *= k; ctx.translate(0, (1 - k) * 40);
    ctx.fillStyle = C.yel; ctx.fillRect(G.W / 2 - maxW / 2 - 60, y0 - 30, maxW + 120, Hh);
    ctx.fillStyle = C.ink2; ctx.fillRect(G.W / 2 - maxW / 2 - 60, y0 - 30, 14, Hh);
    lines.forEach((ln, li) => { const lw = ln.length ? ln[ln.length - 1].x + ln[ln.length - 1].ww : 0; const ox = G.W / 2 - lw / 2;
      for (const w of ln) { const q = clamp((t - w.t) / 0.14); G.text(ctx, w.w, ox + w.x, y0 + 42 + li * lh, { size, fam: 'Inter', weight: 700, color: C.ink2, alpha: 0.22 + 0.78 * q, boil: 0 }); } });
    ctx.restore();
  };
  P.cardShot = (c, n, title, bg, o = {}) => P.shot(S.CH[c].t0, (ctx, t, s) => {
    P.bp(ctx, t); bg(ctx, t, s);
    const h = S.ev[c + '_hook'], up = h ? ease.inOutCubic(clamp((t - (h.t - 0.45)) / 0.5)) : 0;
    ctx.save(); ctx.translate(0, -200 * up); P.chapterBP(ctx, t, n, title, S.CH[c].t0 + 0.1, S.ev[c + '_cardOut']); ctx.restore();
    if (h) P.hookBP(ctx, h, t, S.ev[c + '_cardOut']);
  }, Object.assign({ in: { type: 'wipe', dir: 'left', dur: 0.6 } }, o));

  // ---------- orthographic line-art globe from Natural Earth outlines ----------
  P.globe = (ctx, cx, cy, r, t, { lon0 = 0, lat0 = 15, k = 1, a = 1, color = C.ln, land = 'rgba(234,244,255,0.12)', grid = true, lw = 2.2 } = {}) => {
    if (a <= 0.01 || r < 2) return; const GEO = globalThis.GEO; const d2r = Math.PI / 180; const l0 = lon0 * d2r, p0 = lat0 * d2r;
    const pr = (lo, la) => { const l = lo * d2r - l0, p = la * d2r; const cosc = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l); return [cx + r * Math.cos(p) * Math.sin(l), cy - r * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l)), cosc]; };
    ctx.save(); ctx.globalAlpha *= a;
    ctx.fillStyle = 'rgba(7,39,72,0.85)'; ctx.beginPath(); ctx.arc(cx, cy, r * Math.min(1, k * 1.5), 0, 7); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.clip();
    if (grid) { ctx.strokeStyle = 'rgba(234,244,255,0.14)'; ctx.lineWidth = 1.5; for (let la = -60; la <= 60; la += 30) { ctx.beginPath(); let st = false; for (let lo = -180; lo <= 180; lo += 6) { const [x, y, c] = pr(lo, la); if (c > 0) { st ? ctx.lineTo(x, y) : ctx.moveTo(x, y); st = true; } else st = false; } ctx.stroke(); }
      for (let lo = -180; lo < 180; lo += 30) { ctx.beginPath(); let st = false; for (let la = -90; la <= 90; la += 6) { const [x, y, c] = pr(lo, la); if (c > 0) { st ? ctx.lineTo(x, y) : ctx.moveTo(x, y); st = true; } else st = false; } ctx.stroke(); } }
    const lk = clamp((k - 0.2) / 0.8);
    if (lk > 0) { ctx.globalAlpha *= lk; ctx.fillStyle = land; ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineJoin = 'round';
      for (const name in GEO.world) for (const ring of GEO.world[name]) { ctx.beginPath(); let st = false, vis = 0; for (let i = 0; i < ring.length; i += 2) { const [x, y, c] = pr(ring[i], ring[i + 1]); if (c > 0) { vis++; st ? ctx.lineTo(x, y) : ctx.moveTo(x, y); st = true; } else st = false; } if (vis > 2) { ctx.fill(); ctx.stroke(); } } }
    ctx.restore();
    ctx.globalAlpha = a; P.art(ctx, [P.circPts(cx, cy, r, 90, -Math.PI / 2, Math.PI * 1.5)], k, { color, lw: 4 });
    ctx.restore();
  };
})();
