// Whyverse ep10 — LINE ART look (PLAN NEW LOOKS 2026-11-15: "thin single-weight lines drawing themselves on, one accent colour").
// Warm paper, navy ink lines that draw themselves on, ONE accent (coral) for what matters, Inter titles, Patrick Hand notes.
// Pure functions of their args + t. Nothing boils, no shake (FEEDBACK 4 Nov); slow drifts and pushes ≤ 3 % only.
(function () {
  const G = globalThis.G, U = globalThis.U, Data = globalThis.Data, S = globalThis.SCORE, P = globalThis.P;
  const { clamp, lerp, ease } = U; const C = P.C;
  Object.assign(C, {
    pap: '#F4EFE4', pap2: '#EAE2D1', ink: '#1D2442', ink2: 'rgba(29,36,66,0.55)', ink3: 'rgba(29,36,66,0.16)', ink4: 'rgba(29,36,66,0.07)',
    acc: '#EC5B3D', accW: 'rgba(236,91,61,0.14)', accW2: 'rgba(236,91,61,0.28)', gold: '#F2B84B', navy: '#14204A',
  });
  P.HAND = 'PatrickHand';
  P.fg = () => (P.dark ? C.pap : C.ink);
  P.fg2 = () => (P.dark ? 'rgba(244,239,228,0.7)' : C.ink2);

  // ---------- background: paper + a faint dot grid drifting very slowly ----------
  P.bgLine = (ctx, t, { drift = 1, color = C.pap, dots = 1 } = {}) => {
    P.dark = false; ctx.fillStyle = color; ctx.fillRect(-600, -600, G.W + 1200, G.H + 1200);
    if (dots > 0) { const ox = (t * 5 * drift) % 48, oy = (t * 2.5 * drift) % 48; ctx.save(); ctx.globalAlpha *= dots; ctx.fillStyle = 'rgba(29,36,66,0.09)';
      for (let x = -48 - ox; x < G.W + 48; x += 48) for (let y = -48 - oy; y < G.H + 48; y += 48) ctx.fillRect(x - 1.5, y - 1.5, 3, 3); ctx.restore(); }
  };
  P.bgInk = (ctx, t, { drift = 1 } = {}) => { // the rare dark page (title, sober moments): ink background, paper lines
    P.dark = true; ctx.fillStyle = C.ink; ctx.fillRect(-600, -600, G.W + 1200, G.H + 1200);
    const ox = (t * 5 * drift) % 48, oy = (t * 2.5 * drift) % 48; ctx.save(); ctx.fillStyle = 'rgba(244,239,228,0.07)';
    for (let x = -48 - ox; x < G.W + 48; x += 48) for (let y = -48 - oy; y < G.H + 48; y += 48) ctx.fillRect(x - 1.5, y - 1.5, 3, 3); ctx.restore();
  };

  // ---------- line art: polylines that draw themselves on ----------
  const plen = (pts, closed) => { let L = 0; for (let i = 1; i < pts.length; i++) L += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); if (closed) L += Math.hypot(pts[0][0] - pts[pts.length - 1][0], pts[0][1] - pts[pts.length - 1][1]); return L; };
  // parts: [[x,y],...] or {pts, closed, fill, color, lw, dash}; k = 0..1 of the total length (in order)
  P.art = (ctx, parts, k = 1, { x = 0, y = 0, s = 1, rot = 0, color = null, lw = 4, a = 1, fill = null, fillA = 1 } = {}) => {
    if (a <= 0.01 || k <= 0.001) return; const col = color || P.fg(); const ps = parts.map((p) => (Array.isArray(p) ? { pts: p } : p)).filter((p) => p.pts && p.pts.length > 1);
    const lens = ps.map((p) => plen(p.pts, p.closed)); const tot = lens.reduce((a, b) => a + b, 0) || 1;
    ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot); if (s !== 1) ctx.scale(s, s); ctx.globalAlpha *= a;
    const fk = clamp((k - 0.55) / 0.45) * fillA;
    if (fk > 0) for (const p of ps) { const f = p.fill || (p.closed && fill); if (!f) continue; ctx.save(); ctx.globalAlpha *= fk; ctx.fillStyle = f; ctx.beginPath(); p.pts.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]))); ctx.closePath(); ctx.fill(); ctx.restore(); }
    let rem = tot * clamp(k); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ps.forEach((p) => { if (rem <= 0) return; const pts = p.closed ? p.pts.concat([p.pts[0]]) : p.pts; ctx.strokeStyle = p.color || col; ctx.lineWidth = (p.lw || lw) / s; if (p.dash) ctx.setLineDash(p.dash.map((d) => d / s)); else ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length && rem > 0; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); const f = Math.min(1, rem / (d || 1)); ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); rem -= d; }
      ctx.stroke(); });
    ctx.restore();
  };
  P.circPts = (cx, cy, r, n = 48, a0 = -Math.PI / 2, a1 = Math.PI * 1.5, ry = null) => { const o = []; for (let i = 0; i <= n; i++) { const a = lerp(a0, a1, i / n); o.push([cx + Math.cos(a) * r, cy + Math.sin(a) * (ry == null ? r : ry)]); } return o; };
  P.rectPts = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y]];
  P.rrPts = (x, y, w, h, r) => { const o = []; const q = (cx, cy, a0) => { for (let i = 0; i <= 6; i++) { const a = a0 + (i / 6) * Math.PI / 2; o.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } };
    q(x + w - r, y + r, -Math.PI / 2); q(x + w - r, y + h - r, 0); q(x + r, y + h - r, Math.PI / 2); q(x + r, y + r, Math.PI); o.push(o[0]); return o; };
  P.wave = (x0, x1, y, amp, n, ph = 0) => { const o = []; for (let i = 0; i <= 60; i++) { const u = i / 60; o.push([lerp(x0, x1, u), y + Math.sin(u * n * 6.283 + ph) * amp]); } return o; };
  // draw-on progress from a time
  P.dk = (t, t0, d = 0.8) => ease.inOutCubic(clamp((t - t0) / d));
  // a simple draw-on circle / rect / line
  P.dCirc = (ctx, x, y, r, k, o = {}) => P.art(ctx, [{ pts: P.circPts(x, y, r, Math.max(24, Math.round(r / 4))), closed: false, fill: o.fill }], k, Object.assign({}, o, { fill: null }));
  P.dRect = (ctx, x, y, w, h, k, o = {}) => P.art(ctx, [{ pts: o.r ? P.rrPts(x, y, w, h, o.r) : P.rectPts(x, y, w, h), fill: o.fill }], k, o);
  P.dLine = (ctx, x0, y0, x1, y1, k, o = {}) => P.art(ctx, [[[x0, y0], [x1, y1]]], k, o);
  // a hand-drawn loop around something (accent)
  P.circle = (ctx, x, y, rx, ry, k, { color = C.acc, lw = 6 } = {}) => { if (k <= 0) return; const pts = []; for (let i = 0; i <= 64; i++) { const a = -2.2 + (i / 64) * 6.9; const r = 1 + 0.05 * Math.sin(i * 0.7); pts.push([x + Math.cos(a) * rx * r, y + Math.sin(a) * ry * r]); } P.art(ctx, [pts], k, { color, lw }); };
  P.underline = (ctx, x0, x1, y, k, { color = C.acc, lw = 7 } = {}) => { if (k <= 0) return; const pts = []; for (let i = 0; i <= 30; i++) { const u = i / 30; pts.push([lerp(x0, x1, u), y + Math.sin(u * 9) * 3 + u * 4]); } P.art(ctx, [pts], k, { color, lw }); };
  P.cross = (ctx, x0, y0, x1, y1, k, { color = C.acc, lw = 10 } = {}) => { if (k <= 0) return; P.dLine(ctx, x0, y0, x1, y1, clamp(k / 0.5), { color, lw }); P.dLine(ctx, x0, y1, x1, y0, clamp((k - 0.5) / 0.5), { color, lw }); };
  P.tick = (ctx, x, y, s, k, { color = C.acc, lw = 9 } = {}) => P.art(ctx, [[[x - 30 * s, y], [x - 8 * s, y + 24 * s], [x + 36 * s, y - 30 * s]]], k, { color, lw });
  // curved arrow that draws on, with a head at the end
  P.carrow = (ctx, x0, y0, x1, y1, bend, k, { color = null, lw = 5, head = 22, dash = null } = {}) => {
    if (k <= 0.01) return; const col = color || P.fg(); const mx = (x0 + x1) / 2 - (y1 - y0) * bend, my = (y0 + y1) / 2 + (x1 - x0) * bend; const pts = [];
    for (let i = 0; i <= 30; i++) { const u = i / 30; pts.push([(1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * mx + u * u * x1, (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * my + u * u * y1]); }
    P.art(ctx, [{ pts, dash }], k, { color: col, lw });
    if (k > 0.9) { const p = P.along(pts, k), ang = p[2]; ctx.save(); ctx.globalAlpha *= clamp((k - 0.9) / 0.1); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath();
      ctx.moveTo(p[0] - Math.cos(ang - 0.5) * head, p[1] - Math.sin(ang - 0.5) * head); ctx.lineTo(p[0], p[1]); ctx.lineTo(p[0] - Math.cos(ang + 0.5) * head, p[1] - Math.sin(ang + 0.5) * head); ctx.stroke(); ctx.restore(); }
  };

  // ---------- words ----------
  // headline written on word by word; words in hl get the accent colour + an underline
  P.head = (ctx, s, x, y, t, t0, o = {}) => {
    const { size = 76, align = 'center', t1 = 1e9, hl = [], color = null, weight = 800, stag = 0.07, fam = 'Inter', under = true } = o;
    P.write(ctx, s, x, y, t, t0, { size, align, t1, hl, hlColor: C.acc, color: color || P.fg(), weight, stag, fam });
    if (!under || !hl.length || t < t0) return; const words = s.split(' '); const sp = P.measure(ctx, ' ', size, fam, weight); const ws = words.map((w) => P.measure(ctx, w, size, fam, weight));
    const tw = ws.reduce((a, b) => a + b, 0) + sp * (words.length - 1); let xx = align === 'center' ? x - tw / 2 : align === 'right' ? x - tw : x; const fo = P.fout(t, t1, 0.3);
    words.forEach((w, i) => { if (hl.includes(w.replace(/[^A-Za-z0-9%$]/g, ''))) { ctx.save(); ctx.globalAlpha *= fo; P.underline(ctx, xx, xx + ws[i], y + size * 0.2, P.dk(t, t0 + i * stag + 0.2, 0.45), { lw: Math.max(5, size * 0.08) }); ctx.restore(); } xx += ws[i] + sp; });
  };
  // handwritten note with optional dashed leader from (px,py)
  P.note = (ctx, s, px, py, tx, ty, t, t0, { t1 = 1e9, color = C.acc, size = 46, align = 'center', a = 1 } = {}) => {
    const k = clamp((t - t0) / 0.45) * P.fout(t, t1, 0.3) * a; if (k <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= Math.min(1, k * 1.6); const lk = ease.outCubic(clamp(k / 0.6));
    if (px != null) { ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(lerp(px, tx, lk), lerp(py, ty - size * 0.2, lk)); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = color; ctx.beginPath(); ctx.arc(px, py, 7, 0, 7); ctx.fill(); }
    String(s).split('\n').forEach((ln, i) => G.text(ctx, ln, tx, ty + (1 - k) * 12 + size * 0.35 + i * size * 1.05, { size, fam: P.HAND, weight: 400, color, align, boil: 0, alpha: clamp((k - 0.3) / 0.5) }));
    ctx.restore();
  };
  P.small = (ctx, s, x, y, o = {}) => G.text(ctx, s, x, y, Object.assign({ size: 30, fam: 'Inter', weight: 700, color: P.fg2(), boil: 0 }, o));
  // a big number that counts and lands with an accent underline
  P.lcount = (ctx, { x, y, from = 0, to, t, t0, t1, size = 160, prefix = '', suffix = '', decimals = 0, sub = '', subSize = 40, tEnd = 1e9, fmt, align = 'center', color = null }) => {
    const k = P.fin(t, t0 - 0.25, 0.3) * P.fout(t, tEnd, 0.3); if (k <= 0.01) return;
    const v = Data.count(t, t0, t1, from, to, ease.outCubic); const f = fmt || ((n) => Data.number(n, { decimals }));
    const str = prefix + f(v) + suffix, strF = prefix + f(to) + suffix; const land = t >= t1 ? Math.exp(-(t - t1) * 5) : 0; const w = P.measure(ctx, strF, size, 'Inter', 900);
    const xl = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
    ctx.save(); ctx.globalAlpha *= k; ctx.translate(x, y); ctx.scale(1 + 0.05 * land, 1 + 0.05 * land); ctx.translate(-x, -y);
    G.text(ctx, str, xl, y, { size, fam: 'Inter', weight: 900, color: color || P.fg(), align: 'left', boil: 0 });
    ctx.restore();
    P.underline(ctx, xl, xl + w, y + size * 0.18, P.dk(t, t1 - 0.1, 0.5), { lw: Math.max(6, size * 0.06) });
    if (sub) G.text(ctx, sub, align === 'center' ? x : xl, y + size * 0.2 + subSize * 1.35, { size: subSize, fam: 'Inter', weight: 700, color: P.fg2(), align: align === 'center' ? 'center' : 'left', boil: 0, alpha: k });
  };
  // a framed card (paper fill, ink frame drawn on, accent corner ticks)
  P.card = (ctx, x, y, w, h, k, { fill = C.pap, color = null, lw = 4, a = 1, r = 18 } = {}) => {
    if (k <= 0.01 || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * clamp(k * 3);
    ctx.save(); ctx.globalAlpha *= clamp(k * 2); ctx.fillStyle = fill; P.pRR(x, y, w, h, r)(ctx); ctx.fill(); ctx.restore();
    P.art(ctx, [P.rrPts(x, y, w, h, r)], k, { color: color || P.fg(), lw });
    const tk = clamp((k - 0.7) / 0.3); if (tk > 0) { ctx.strokeStyle = C.acc; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.globalAlpha *= tk; ctx.beginPath(); ctx.moveTo(x - 8, y + 40); ctx.lineTo(x - 8, y - 8); ctx.lineTo(x + 40, y - 8); ctx.moveTo(x + w - 40, y + h + 8); ctx.lineTo(x + w + 8, y + h + 8); ctx.lineTo(x + w + 8, y + h - 40); ctx.stroke(); }
    ctx.restore();
  };
  // a quote card: big accent quote marks, the words in Inter, the name in Patrick Hand
  P.quote = (ctx, s, who, x, y, w, t, t0, { t1 = 1e9, size = 54 } = {}) => {
    const a = P.fout(t, t1, 0.3); if (t < t0 || a <= 0) return; ctx.save(); ctx.globalAlpha *= a;
    G.text(ctx, '“', x - 20, y + 40, { size: 220, fam: 'Inter', weight: 900, color: C.acc, alpha: P.fin(t, t0, 0.3), boil: 0 });
    const words = s.split(' '); const lines = [[]]; let lw = 0; const sp = P.measure(ctx, ' ', size, 'Inter', 700);
    for (const wd of words) { const ww = P.measure(ctx, wd, size, 'Inter', 700); if (lw + ww > w && lw > 0) { lines.push([]); lw = 0; } lines[lines.length - 1].push(wd); lw += ww + sp; }
    let n = 0; lines.forEach((ln, i) => P.write(ctx, ln.join(' '), x + 110, y + i * size * 1.3, t, t0 + 0.1 + (n += 0) + i * 0.25, { size, align: 'left', weight: 700, stag: 0.05 }));
    if (who) G.text(ctx, '— ' + who, x + 110, y + lines.length * size * 1.3 + 30, { size: 44, fam: P.HAND, color: C.acc, boil: 0, alpha: P.fin(t, t0 + 0.6, 0.4) });
    ctx.restore();
  };

  // ---------- chapter card + hook (line-art versions) ----------
  P.chapterLine = (ctx, t, n, title, t0, t1) => {
    const a = P.win(t, t0, t1, 0.3); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a;
    const cx = 420, cy = 430; P.dCirc(ctx, cx, cy, 120, P.dk(t, t0, 0.7), { lw: 6, color: C.acc });
    G.text(ctx, String(n), cx, cy + 62, { size: 170, fam: 'Inter', weight: 900, color: P.fg(), align: 'center', boil: 0, alpha: P.fin(t, t0 + 0.25, 0.25) });
    P.write(ctx, 'CHAPTER ' + n, 600, 390, t, t0 + 0.2, { size: 40, align: 'left', color: C.acc, weight: 800 });
    const fs = Math.min(104, 104 * 1150 / P.measure(ctx, title, 104, 'Inter', 800));
    P.write(ctx, title, 600, 500, t, t0 + 0.35, { size: fs, align: 'left', weight: 800, stag: 0.08 });
    P.dLine(ctx, 600, 545, 600 + Math.min(1150, P.measure(ctx, title, fs, 'Inter', 800)), 545, P.dk(t, t0 + 0.7, 0.6), { lw: 4 });
    ctx.restore();
  };
  P.hookLine = (ctx, h, t, t1) => {
    const a = clamp((t - (h.t - 0.3)) / 0.35), b = 1 - clamp((t - (t1 - 0.4)) / 0.35); const k = Math.min(ease.outCubic(a), b); if (k <= 0.01) return;
    const size = 60, maxW = 1380, sp = P.measure(ctx, ' ', size, 'Inter', 700); const lines = [[]]; let x = 0;
    for (const w of h.words) { const ww = P.measure(ctx, w.w, size, 'Inter', 700); if (x + ww > maxW && x > 0) { lines.push([]); x = 0; } lines[lines.length - 1].push({ ...w, x, ww }); x += ww + sp; }
    const lh = size * 1.32, Hh = lines.length * lh + 64, y0 = 700, bx = G.W / 2 - maxW / 2 - 60, bw = maxW + 120;
    ctx.save(); ctx.globalAlpha *= k; ctx.translate(0, (1 - k) * 30);
    ctx.fillStyle = C.pap; ctx.fillRect(bx, y0 - 32, bw, Hh);
    P.art(ctx, [P.rectPts(bx, y0 - 32, bw, Hh)], P.dk(t, h.t - 0.3, 0.6), { lw: 4 });
    ctx.fillStyle = C.acc; ctx.fillRect(bx, y0 - 32, 14, Hh * P.dk(t, h.t - 0.2, 0.4));
    lines.forEach((ln, li) => { const lw = ln.length ? ln[ln.length - 1].x + ln[ln.length - 1].ww : 0; const ox = G.W / 2 - lw / 2;
      for (const w of ln) { const q = clamp((t - w.t) / 0.14); G.text(ctx, w.w, ox + w.x, y0 + 44 + li * lh, { size, fam: 'Inter', weight: 700, color: C.ink, alpha: 0.2 + 0.8 * q, boil: 0 }); } });
    ctx.restore();
  };
  P.cardShot = (c, n, title, bg, o = {}) => P.shot(S.CH[c].t0, (ctx, t, s) => {
    P.bgLine(ctx, t); bg(ctx, t, s);
    const h = S.ev[c + '_hook'], up = h ? ease.inOutCubic(clamp((t - (h.t - 0.45)) / 0.5)) : 0;
    ctx.save(); ctx.translate(0, -170 * up); P.chapterLine(ctx, t, n, title, S.CH[c].t0 + 0.1, S.ev[c + '_cardOut']); ctx.restore();
    if (h) P.hookLine(ctx, h, t, S.ev[c + '_cardOut']);
  }, Object.assign({ in: { type: 'wipe', dir: 'left', dur: 0.6, color: C.ink } }, o));

  // progress counter: 6 chapter atoms on a bond line, top-right (filled accent = done)
  P.progress = (ctx, t, n, a = 1) => {
    if (a <= 0.01) return; const x0 = G.W - 70 - 5 * 46, y = 70; ctx.save(); ctx.globalAlpha *= a * 0.9;
    ctx.strokeStyle = C.ink2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + 5 * 46, y); ctx.stroke();
    for (let i = 0; i < 6; i++) { const on = i < n, cur = i === n - 1; const r = cur ? 14 + Math.sin(t * 3) * 1.5 : 11;
      ctx.fillStyle = on ? C.acc : C.pap; ctx.beginPath(); ctx.arc(x0 + i * 46, y, r, 0, 7); ctx.fill(); ctx.strokeStyle = on ? C.acc : C.ink2; ctx.lineWidth = 3; ctx.stroke(); }
    G.text(ctx, 'WHYVERSE · EP 10', x0 - 30, y + 10, { size: 24, fam: 'Inter', weight: 800, color: C.ink2, align: 'right', boil: 0 });
    ctx.restore();
  };

  // ---------- orthographic line-art globe (Natural Earth outlines) ----------
  P.globe = (ctx, cx, cy, r, t, { lon0 = 0, lat0 = 15, k = 1, a = 1, color = null, land = C.accW, sea = C.pap, grid = true, lw = 2.4, hole = 0 } = {}) => {
    if (a <= 0.01 || r < 2) return; const col = color || P.fg(); const GEO = globalThis.GEO; const d2r = Math.PI / 180; const l0 = lon0 * d2r, p0 = lat0 * d2r;
    const pr = (lo, la) => { const l = lo * d2r - l0, p = la * d2r; const cosc = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l); return [cx + r * Math.cos(p) * Math.sin(l), cy - r * (Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l)), cosc]; };
    ctx.save(); ctx.globalAlpha *= a;
    ctx.fillStyle = sea; ctx.beginPath(); ctx.arc(cx, cy, r * Math.min(1, k * 1.5), 0, 7); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.clip();
    if (grid) { ctx.strokeStyle = C.ink3; ctx.lineWidth = 1.5; for (let la = -60; la <= 60; la += 30) { ctx.beginPath(); let st = false; for (let lo = -180; lo <= 180; lo += 6) { const [x, y, c] = pr(lo, la); if (c > 0) { st ? ctx.lineTo(x, y) : ctx.moveTo(x, y); st = true; } else st = false; } ctx.stroke(); }
      for (let lo = -180; lo < 180; lo += 30) { ctx.beginPath(); let st = false; for (let la = -90; la <= 90; la += 6) { const [x, y, c] = pr(lo, la); if (c > 0) { st ? ctx.lineTo(x, y) : ctx.moveTo(x, y); st = true; } else st = false; } ctx.stroke(); } }
    const lk = clamp((k - 0.2) / 0.8);
    if (lk > 0) { ctx.globalAlpha *= lk; ctx.fillStyle = land; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineJoin = 'round';
      for (const name in GEO.world) for (const ring of GEO.world[name]) { ctx.beginPath(); let st = false, vis = 0; for (let i = 0; i < ring.length; i += 2) { const [x, y, c] = pr(ring[i], ring[i + 1]); if (c > 0) { vis++; st ? ctx.lineTo(x, y) : ctx.moveTo(x, y); st = true; } else st = false; } if (vis > 2) { ctx.fill(); ctx.stroke(); } } }
    // the ozone hole: an accent hatched blob around the south pole (hole = 0..1 size)
    if (hole > 0.01) { const pts = []; for (let i = 0; i <= 72; i++) { const lo = -180 + i * 5; const la = -90 + hole * (26 + 5 * Math.sin(i * 0.5 + 1) + 3 * Math.sin(i * 0.23)); pts.push(pr(lo, la)); }
      ctx.save(); ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); ctx.fillStyle = C.accW2; ctx.fill(); ctx.clip();
      ctx.strokeStyle = C.acc; ctx.lineWidth = 3; ctx.globalAlpha *= 0.7; ctx.beginPath(); for (let d = -2 * r; d < 2 * r; d += 18) { ctx.moveTo(cx + d - r, cy - r); ctx.lineTo(cx + d + r, cy + r); } ctx.stroke(); ctx.restore();
      ctx.save(); ctx.strokeStyle = C.acc; ctx.lineWidth = 5; ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); ctx.stroke(); ctx.restore(); }
    ctx.restore();
    ctx.globalAlpha = a; P.art(ctx, [P.circPts(cx, cy, r, 90)], k, { color: col, lw: 4 });
    ctx.restore();
    return pr;
  };
})();
// Whyverse ringed planet (brand) in line art: ink outline, blue planet, gold ring
(function () { const P = globalThis.P, C = P.C;
  P.brandPlanet = (ctx, x, y, r, t, a = 1) => { if (r < 1 || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; const ring = (a0, a1) => { ctx.beginPath(); ctx.ellipse(x, y, r * 1.8, r * 0.45, -0.3, a0, a1); ctx.strokeStyle = C.ink; ctx.lineWidth = r * 0.18; ctx.stroke(); ctx.strokeStyle = C.gold; ctx.lineWidth = r * 0.1; ctx.stroke(); };
    ring(Math.PI, Math.PI * 2); ctx.fillStyle = '#4F7FE0'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = Math.max(3, r * 0.08); ctx.stroke(); ring(0, Math.PI); ctx.restore(); };
})();
// dimension line with end ticks + arrowheads (accent), optional label
(function () { const P = globalThis.P, C = P.C, G = globalThis.G, U = globalThis.U; const { clamp, lerp, ease } = U;
  P.dim = (ctx, x0, y0, x1, y1, label, k = 1, { color = C.acc, size = 34, a = 1, lw = 3.5 } = {}) => {
    if (k <= 0.001 || a <= 0.01) return; const ang = Math.atan2(y1 - y0, x1 - x0), nx = -Math.sin(ang), ny = Math.cos(ang); const kk = ease.outCubic(clamp(k / 0.7));
    const mx = (x0 + x1) / 2, my = (y0 + y1) / 2; const ax = lerp(mx, x0, kk), ay = lerp(my, y0, kk), bx = lerp(mx, x1, kk), by = lerp(my, y1, kk);
    ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); for (const [px, py] of [[x0, y0], [x1, y1]]) { ctx.moveTo(px + nx * 18, py + ny * 18); ctx.lineTo(px - nx * 18, py - ny * 18); } ctx.stroke();
    const head = (px, py, d) => { ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - Math.cos(ang + 0.4) * 16 * d, py - Math.sin(ang + 0.4) * 16 * d); ctx.lineTo(px - Math.cos(ang - 0.4) * 16 * d, py - Math.sin(ang - 0.4) * 16 * d); ctx.closePath(); ctx.fill(); };
    if (kk > 0.95) { head(x1, y1, 1); head(x0, y0, -1); }
    const la = clamp((k - 0.6) / 0.4); if (label && la > 0) { ctx.globalAlpha *= la; G.text(ctx, label, mx + nx * 40, my + ny * 40 + size * 0.36, { size, fam: 'Inter', weight: 800, color, align: 'center', boil: 0 }); }
    ctx.restore(); };
})();
