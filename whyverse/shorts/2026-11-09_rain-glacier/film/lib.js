// Whyverse short 2026-11-09 — BLUEPRINT prop library (brand/STYLE_REFERENCES 2026-11-08): navy grid paper,
// white technical line art, yellow tags, digits in boxes, dimension lines, callouts. Pure functions of t.
// Text never boils (FEEDBACK 2026-11-04); no camera shake.
(function () {
  const G = globalThis.G, U = globalThis.U, Data = globalThis.Data;
  const { clamp, lerp, ease } = U;
  G.setStyle('flat', { textBoil: 0, amp: 0 });
  const P = {};
  const C = P.C = {
    bg0: '#0F3F86', bg1: '#0A2B63', line: '#EAF3FF', faint: 'rgba(234,243,255,0.35)', grid: 'rgba(190,220,255,0.10)', grid2: 'rgba(190,220,255,0.20)',
    yellow: '#FFD23F', ink: '#0A2148', water: '#5FD4FF', ice: 'rgba(220,240,255,0.13)', red: '#FF5A5F', green: '#5CF2A0', coral: '#FF8A5C', gold: '#FFC857', dim: '#9DB8E0',
  };
  P.rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; };
  const SAFE = G.SAFE; P.CX = SAFE.x + SAFE.w / 2;
  P.FT = { title: 'Bungee', ui: 'Inter' };
  const pop = P.pop = (t, t0, d = 0.32, s = 2.2) => (t < t0 ? 0 : ease.outBack(clamp((t - t0) / d), s));
  const fin = P.fin = (t, t0, d = 0.3) => clamp((t - t0) / d);
  const fout = P.fout = (t, t1, d = 0.3) => 1 - clamp((t - (t1 - d)) / d);
  P.win = (t, t0, t1, d = 0.3) => Math.min(fin(t, t0, d), fout(t, t1, d));
  P.at = (ctx, x, y, s, rot, fn) => { ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot); if (s !== 1) ctx.scale(s, s); fn(); ctx.restore(); };

  // ---------- background: blueprint paper with a slowly drifting grid ----------
  P.bg = (ctx, t, { drift = 1 } = {}) => {
    const g = ctx.createLinearGradient(0, 0, G.W * 0.3, G.H);
    g.addColorStop(0, C.bg0); g.addColorStop(1, C.bg1); ctx.fillStyle = g; ctx.fillRect(0, 0, G.W, G.H);
    const ox = (t * 6 * drift) % 36, oy = (t * 3 * drift) % 36;
    ctx.lineWidth = 1;
    for (let x = -36 + ox; x < G.W + 36; x += 36) { const major = Math.round((x - ox) / 36) % 5 === 0; ctx.strokeStyle = major ? C.grid2 : C.grid; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, G.H); ctx.stroke(); }
    for (let y = -36 + oy; y < G.H + 36; y += 36) { const major = Math.round((y - oy) / 36) % 5 === 0; ctx.strokeStyle = major ? C.grid2 : C.grid; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(G.W, y); ctx.stroke(); }
    // vignette
    const v = ctx.createRadialGradient(G.W / 2, G.H * 0.42, G.H * 0.2, G.W / 2, G.H * 0.42, G.H * 0.75);
    v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(3,12,35,0.45)'); ctx.fillStyle = v; ctx.fillRect(0, 0, G.W, G.H);
    // drawing frame + title block corner marks (inside the safe width)
    ctx.strokeStyle = 'rgba(234,243,255,0.22)'; ctx.lineWidth = 2; ctx.strokeRect(40, 190, G.W - 200, G.H - 640);
    for (const [x, y] of [[40, 190], [G.W - 160, 190], [40, G.H - 450], [G.W - 160, G.H - 450]]) { ctx.beginPath(); ctx.moveTo(x - 14, y); ctx.lineTo(x + 14, y); ctx.moveTo(x, y - 14); ctx.lineTo(x, y + 14); ctx.stroke(); }
  };

  // ---------- text ----------
  P.text = (ctx, s, x, y, o = {}) => {
    const { size = 64, color = C.line, fam = P.FT.title, weight = 400, align = 'center', alpha = 1, stroke } = o;
    ctx.save(); ctx.globalAlpha *= alpha;
    G.text(ctx, s, x, y, { size, fam, weight, color, align, boil: 0, stroke, strokeW: stroke ? 6 : 8 });
    ctx.restore();
  };
  P.pText = (ctx, s, x, y, t, t0, t1 = 1e9, o = {}) => {
    const k = pop(t, t0, 0.3, 1.8) * fout(t, t1, 0.25); if (k <= 0.01) return;
    P.at(ctx, x, y, k, o.rot || 0, () => P.text(ctx, s, 0, 0, Object.assign({}, o, { alpha: (o.alpha || 1) * clamp(k * 1.5) })));
  };
  // label typed in letter by letter (technical annotation)
  P.typed = (ctx, s, x, y, t, t0, o = {}) => {
    if (t < t0) return; const n = Math.min(s.length, Math.floor((t - t0) * (o.cps || 28)) + 1);
    P.text(ctx, s.slice(0, n), x, y, Object.assign({ size: 32, fam: P.FT.ui, weight: 800, color: C.line }, o));
  };
  // yellow tag with navy text
  P.tag = (ctx, s, x, y, t, t0, t1 = 1e9, { size = 36, bg = C.yellow, txt = C.ink, rot = 0, fam = P.FT.ui, weight = 800 } = {}) => {
    const k = pop(t, t0, 0.3, 1.8) * fout(t, t1, 0.25); if (k <= 0.01) return;
    const w = G.measure(ctx, s, size, fam, weight) + size * 1.1, h = size * 1.55;
    P.at(ctx, x, y, k, rot, () => {
      ctx.globalAlpha *= clamp(k * 1.5);
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(-w / 2 + 6, -h / 2 + 6, w, h);
      ctx.fillStyle = bg; ctx.fillRect(-w / 2, -h / 2, w, h);
      G.text(ctx, s, 0, size * 0.36, { size, fam, weight, color: txt, align: 'center', boil: 0 });
    });
  };
  // outlined chip (white line)
  P.chip = (ctx, s, x, y, t, t0, t1 = 1e9, { size = 36, color = C.line, fam = P.FT.ui, weight = 800 } = {}) => {
    const k = pop(t, t0, 0.3, 1.6) * fout(t, t1, 0.25); if (k <= 0.01) return;
    const w = G.measure(ctx, s, size, fam, weight) + size * 1.2, h = size * 1.6;
    P.at(ctx, x, y, k, 0, () => {
      ctx.globalAlpha *= clamp(k * 1.5);
      ctx.fillStyle = 'rgba(10,33,72,0.75)'; ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.strokeRect(-w / 2, -h / 2, w, h);
      G.text(ctx, s, 0, size * 0.36, { size, fam, weight, color, align: 'center', boil: 0 });
    });
  };
  // stamp: slams in at t0, outlined box, slight tilt
  P.stamp = (ctx, s, x, y, t, t0, { size = 80, color = C.yellow, rot = -0.06, t1 = 1e9, fill = 'rgba(10,33,72,0.85)' } = {}) => {
    if (t < t0) return; const a = clamp((t - t0) / 0.14), k = lerp(2.0, 1, ease.outCubic(a)) * fout(t, t1, 0.3);
    if (k <= 0.01) return;
    const w = G.measure(ctx, s, size, P.FT.title, 400) + 60, h = size * 1.45;
    P.at(ctx, x, y, k, rot, () => {
      ctx.globalAlpha *= clamp(a * 2);
      ctx.fillStyle = fill; ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.strokeStyle = color; ctx.lineWidth = 7; ctx.strokeRect(-w / 2, -h / 2, w, h);
      ctx.lineWidth = 2; ctx.strokeRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20);
      P.text(ctx, s, 0, size * 0.36, { size, color });
    });
  };
  // digits in boxes ("7.5" -> [7][.][5]); each char gets its own box
  P.digits = (ctx, s, x, y, { size = 150, color = C.line, box = C.line, bg = 'rgba(10,33,72,0.7)', alpha = 1, accent = null } = {}) => {
    const bw = size * 0.78, bh = size * 1.12, gap = size * 0.1;
    const ws = [...s].map((ch) => (ch === '.' || ch === ',' ? size * 0.32 : bw));
    const tw = ws.reduce((a, b) => a + b, 0) + gap * (ws.length - 1);
    let cx = x - tw / 2;
    ctx.save(); ctx.globalAlpha *= alpha;
    [...s].forEach((ch, i) => {
      const w = ws[i];
      if (ch !== '.' && ch !== ',') { ctx.fillStyle = bg; ctx.fillRect(cx, y - bh / 2, w, bh); ctx.strokeStyle = box; ctx.lineWidth = 4; ctx.strokeRect(cx, y - bh / 2, w, bh); ctx.strokeStyle = 'rgba(234,243,255,0.25)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, y); ctx.lineTo(cx + w, y); ctx.stroke(); }
      G.text(ctx, ch, cx + w / 2, y + size * 0.36, { size, fam: P.FT.title, color: accent && accent[i] ? accent[i] : color, align: 'center', boil: 0 });
      cx += w + gap;
    });
    ctx.restore();
  };
  // callout: dot on the target, elbow leader line, then a tag
  P.callout = (ctx, s, tx, ty, lx, ly, t, t0, t1 = 1e9, o = {}) => {
    if (t < t0) return; const a = fout(t, t1, 0.25); if (a <= 0) return;
    const p = ease.outCubic(clamp((t - t0) / 0.3));
    ctx.save(); ctx.globalAlpha *= a;
    ctx.fillStyle = o.color || C.yellow; ctx.beginPath(); ctx.arc(tx, ty, 8, 0, 7); ctx.fill();
    ctx.strokeStyle = o.color || C.yellow; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(tx, ty);
    const mx = tx, my = lerp(ty, ly, p); ctx.lineTo(mx, my); if (p >= 1) ctx.lineTo(lx, ly); ctx.stroke();
    ctx.restore();
    if (p >= 1) P.tag(ctx, s, lx, ly, t, t0 + 0.28, t1, Object.assign({ size: 32 }, o));
  };
  // dimension line with arrows and a label in the middle (drawn out from t0)
  P.dim = (ctx, x0, y0, x1, y1, s, t, t0, { color = C.yellow, size = 34, off = 0 } = {}) => {
    if (t < t0) return; const p = ease.outCubic(clamp((t - t0) / 0.45));
    const xe = lerp(x0, x1, p), ye = lerp(y0, y1, p), ang = Math.atan2(y1 - y0, x1 - x0);
    ctx.save(); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(xe, ye); ctx.stroke();
    const head = (x, y, a) => { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 20 * Math.cos(a - 0.4), y - 20 * Math.sin(a - 0.4)); ctx.lineTo(x - 20 * Math.cos(a + 0.4), y - 20 * Math.sin(a + 0.4)); ctx.closePath(); ctx.fill(); };
    head(x0, y0, ang + Math.PI); if (p > 0.95) head(xe, ye, ang);
    const nx = -Math.sin(ang), ny = Math.cos(ang);
    for (const [x, y] of [[x0, y0], [xe, ye]]) { ctx.beginPath(); ctx.moveTo(x - nx * 22, y - ny * 22); ctx.lineTo(x + nx * 22, y + ny * 22); ctx.stroke(); }
    ctx.restore();
    if (s && p > 0.6) P.tag(ctx, s, (x0 + x1) / 2 + nx * off, (y0 + y1) / 2 + ny * off, t, t0 + 0.3, 1e9, { size });
  };
  P.arrow = (ctx, x0, y0, x1, y1, p, { color = C.line, lw = 8, head = 30, dash = null } = {}) => {
    if (p <= 0) return; const xe = lerp(x0, x1, p), ye = lerp(y0, y1, p), a = Math.atan2(y1 - y0, x1 - x0);
    ctx.save(); ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round'; if (dash) ctx.setLineDash(dash);
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(xe - Math.cos(a) * head * 0.6, ye - Math.sin(a) * head * 0.6); ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath(); ctx.moveTo(xe, ye); ctx.lineTo(xe - head * Math.cos(a - 0.45), ye - head * Math.sin(a - 0.45)); ctx.lineTo(xe - head * Math.cos(a + 0.45), ye - head * Math.sin(a + 0.45)); ctx.closePath(); ctx.fill();
    ctx.restore();
  };
  P.cross = (ctx, x, y, r, t, t0, color = C.red) => {
    if (t < t0) return; const p1 = clamp((t - t0) / 0.15), p2 = clamp((t - t0 - 0.12) / 0.15);
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 16; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x - r, y - r); ctx.lineTo(x - r + 2 * r * p1, y - r + 2 * r * p1); ctx.stroke();
    if (p2 > 0) { ctx.beginPath(); ctx.moveTo(x + r, y - r); ctx.lineTo(x + r - 2 * r * p2, y - r + 2 * r * p2); ctx.stroke(); }
    ctx.restore();
  };
  P.check = (ctx, x, y, s, t, t0, color = C.green) => {
    const k = pop(t, t0, 0.35, 2.4); if (k <= 0) return;
    P.at(ctx, x, y, k, 0, () => { ctx.strokeStyle = color; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-s * 0.5, 0); ctx.lineTo(-s * 0.12, s * 0.38); ctx.lineTo(s * 0.55, -s * 0.4); ctx.stroke(); });
  };
  P.flash = (ctx, t, t0, { color = '255,210,63', a = 0.22, d = 0.25 } = {}) => {
    const u = t - t0; if (u < 0 || u > d) return; ctx.fillStyle = `rgba(${color},${a * (1 - u / d)})`; ctx.fillRect(0, 0, G.W, G.H);
  };
  P.ring = (ctx, x, y, t, t0, { color = C.yellow, size = 90, d = 0.8 } = {}) => {
    const u = (t - t0) / d; if (u < 0 || u > 1) return;
    ctx.save(); ctx.strokeStyle = color; ctx.globalAlpha = 1 - u; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x, y, size * ease.outCubic(u), 0, 7); ctx.stroke(); ctx.restore();
  };

  // ---------- glacier cross-section (side view, technical drawing) ----------
  // x0..x1 horizontal extent, yTop = surface at the head, yBed = bed at the head; terminus is a cliff into the sea.
  // slide: horizontal offset of the ice over the bed; lift: px the ice rises off the bed (water layer shows).
  P.glacierGeom = (x0, x1, yTop, yBed) => {
    const w = x1 - x0;
    const T = yBed - yTop;
    const bed = (u) => yBed + 90 - 240 * Math.pow(1 - u, 1.5) + Math.sin(u * 7 + 1) * 10 + Math.sin(u * 19) * 4;
    const th = (u) => T * (0.3 + 0.7 * Math.sqrt(clamp(u / 0.3))) * (1 - 0.2 * u);
    const surf = (u) => bed(u) - th(u) + Math.sin(u * 9) * 5;
    return { x0, x1, w, surf, bed, X: (u) => x0 + w * u };
  };
  P.bedrock = (ctx, g, t, { depth = 260, alpha = 1 } = {}) => {
    ctx.save(); ctx.globalAlpha *= alpha;
    ctx.beginPath(); ctx.moveTo(g.x0 - 60, g.bed(0) - 120); ctx.lineTo(g.x0, g.bed(0));
    for (let i = 0; i <= 60; i++) { const u = i / 60; ctx.lineTo(g.X(u), g.bed(u)); }
    ctx.lineTo(g.x1 + 260, g.bed(1) + 30); ctx.lineTo(g.x1 + 260, g.bed(1) + depth); ctx.lineTo(g.x0 - 60, g.bed(1) + depth); ctx.closePath();
    { const gr = ctx.createLinearGradient(0, g.bed(1) - 60, 0, g.bed(1) + depth); gr.addColorStop(0, 'rgba(8,24,56,0.6)'); gr.addColorStop(1, 'rgba(8,24,56,0)'); ctx.fillStyle = gr; } ctx.fill();
    ctx.save(); ctx.clip(); { const gr2 = ctx.createLinearGradient(0, g.bed(1) - 60, 0, g.bed(1) + depth); gr2.addColorStop(0, 'rgba(234,243,255,0.18)'); gr2.addColorStop(1, 'rgba(234,243,255,0)'); ctx.strokeStyle = gr2; }; ctx.lineWidth = 2;
    for (let k = -40; k < 60; k++) { const x = g.x0 - 100 + k * 26; ctx.beginPath(); ctx.moveTo(x, g.bed(0) - 200); ctx.lineTo(x + 500, g.bed(0) + 300); ctx.stroke(); }
    ctx.restore();
    ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(g.x0 - 60, g.bed(0) - 120); ctx.lineTo(g.x0, g.bed(0));
    for (let i = 0; i <= 60; i++) { const u = i / 60; ctx.lineTo(g.X(u), g.bed(u)); } ctx.lineTo(g.x1 + 260, g.bed(1) + 30); ctx.stroke();
    ctx.restore();
  };
  P.sea = (ctx, g, t, { alpha = 1 } = {}) => {
    const y = g.surf(1) + (g.bed(1) - g.surf(1)) * 0.55; ctx.save(); ctx.globalAlpha *= alpha;
    ctx.fillStyle = 'rgba(95,212,255,0.12)'; ctx.beginPath(); ctx.moveTo(g.x1, y); ctx.lineTo(g.x1 + 400, y); ctx.lineTo(g.x1 + 400, g.bed(1) + 30); ctx.lineTo(g.x1, g.bed(1)); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = C.water; ctx.lineWidth = 3; ctx.beginPath();
    for (let x = g.x1; x < g.x1 + 400; x += 6) ctx.lineTo(x, y + Math.sin(x * 0.05 + t * 3) * 5); ctx.stroke(); ctx.restore();
  };
  P.ice = (ctx, g, t, { slide = 0, lift = 0, alpha = 1, crevasses = 0, layer = 0 } = {}) => {
    ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(slide, -lift);
    const path = () => { ctx.beginPath(); ctx.moveTo(g.X(0), g.bed(0)); ctx.lineTo(g.X(0), g.surf(0));
      for (let i = 0; i <= 60; i++) { const u = i / 60; ctx.lineTo(g.X(u), g.surf(u)); }
      ctx.lineTo(g.X(1), g.bed(1)); for (let i = 60; i >= 0; i--) { const u = i / 60; ctx.lineTo(g.X(u), g.bed(u)); } ctx.closePath(); };
    path(); ctx.fillStyle = 'rgba(205,232,255,0.16)'; ctx.fill();
    // flow layers (dashed, moving with the ice)
    ctx.save(); path(); ctx.clip(); ctx.strokeStyle = 'rgba(234,243,255,0.28)'; ctx.lineWidth = 2; ctx.setLineDash([22, 16]); ctx.lineDashOffset = -t * 30 - slide;
    for (let k = 1; k <= 4; k++) { ctx.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40; const y = lerp(g.surf(u), g.bed(u), k / 5); i ? ctx.lineTo(g.X(u), y) : ctx.moveTo(g.X(u), y); } ctx.stroke(); }
    ctx.setLineDash([]); ctx.restore();
    path(); ctx.strokeStyle = C.line; ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.stroke();
    // crevasses (V cuts from the surface) and a moulin (vertical shaft)
    if (crevasses > 0) {
      ctx.strokeStyle = C.line; ctx.lineWidth = 4;
      for (const [u, d] of [[0.28, 0.35], [0.47, 0.3], [0.78, 0.38]]) {
        const x = g.X(u), y = g.surf(u), dep = (g.bed(u) - y) * d * clamp(crevasses * 1.4);
        ctx.fillStyle = C.bg1; ctx.beginPath(); ctx.moveTo(x - 18, y); ctx.lineTo(x, y + dep); ctx.lineTo(x + 18, y); ctx.closePath(); ctx.fill(); ctx.stroke();
      }
      const u = 0.62, x = g.X(u), y = g.surf(u), dep = (g.bed(u) - y) * clamp(crevasses * 1.2 - 0.2);
      if (dep > 0) { ctx.fillStyle = C.bg1; ctx.fillRect(x - 14, y, 28, dep); ctx.beginPath(); ctx.moveTo(x - 14, y); ctx.lineTo(x - 14, y + dep); ctx.moveTo(x + 14, y); ctx.lineTo(x + 14, y + dep); ctx.stroke(); }
    }
    ctx.restore();
  };
  // the water film at the bed between u0..u1 (drawn in bed coords; thickness th)
  P.bedWater = (ctx, g, t, { u0 = 0, u1 = 1, th = 10, alpha = 1, slide = 0 } = {}) => {
    if (th <= 0.3) return; ctx.save(); ctx.globalAlpha *= alpha;
    ctx.beginPath(); for (let i = 0; i <= 50; i++) { const u = lerp(u0, u1, i / 50); const y = g.bed(u) - th; i ? ctx.lineTo(g.X(u), y) : ctx.moveTo(g.X(u), y); }
    for (let i = 50; i >= 0; i--) { const u = lerp(u0, u1, i / 50); ctx.lineTo(g.X(u), g.bed(u)); } ctx.closePath();
    ctx.fillStyle = P.rgba(C.water, 0.55); ctx.fill(); ctx.strokeStyle = C.water; ctx.lineWidth = 3; ctx.stroke();
    // flowing dashes
    ctx.setLineDash([14, 18]); ctx.lineDashOffset = -t * 90; ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 2;
    ctx.beginPath(); for (let i = 0; i <= 50; i++) { const u = lerp(u0, u1, i / 50); const y = g.bed(u) - th / 2; i ? ctx.lineTo(g.X(u), y) : ctx.moveTo(g.X(u), y); } ctx.stroke();
    ctx.restore();
  };
  // ---------- weather ----------
  P.cloud = (ctx, x, y, s, { color = C.line, fill = 'rgba(10,33,72,0.85)', lw = 5 } = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.beginPath(); ctx.moveTo(-90, 30); ctx.arc(-55, 5, 38, Math.PI * 0.6, Math.PI * 1.55); ctx.arc(0, -22, 52, Math.PI * 1.1, Math.PI * 1.95); ctx.arc(58, 4, 36, Math.PI * 1.45, Math.PI * 0.45); ctx.closePath();
    ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = color; ctx.lineWidth = lw / s; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore();
  };
  // rain streaks from a band [xa,xb] starting at y0 down to yEnd(x); density 0..1
  P.rain = (ctx, t, xa, xb, y0, yEnd, { n = 40, density = 1, speed = 900, color = C.water, seed = 7 } = {}) => {
    if (density <= 0) return; ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.lineCap = 'round';
    for (let i = 0; i < n; i++) { if (U.hash(i, seed) > density) continue;
      const x = lerp(xa, xb, U.hash(i, seed + 1)), ye = yEnd(x), len = ye - y0; if (len <= 0) continue;
      const ph = ((t * speed / len + U.hash(i, seed + 2)) % 1), y = y0 + ph * len;
      ctx.globalAlpha = 0.85; ctx.beginPath(); ctx.moveTo(x - 4, y - 26); ctx.lineTo(x, y); ctx.stroke();
      if (ph > 0.92) { ctx.globalAlpha = 0.6; ctx.beginPath(); ctx.arc(x, ye, 8 * (ph - 0.92) / 0.08 + 2, Math.PI, 0); ctx.stroke(); } }
    ctx.restore();
  };
  // GPS station: tripod pole + antenna + ping rings
  P.gps = (ctx, x, y, s, t, t0, { ping = 2 } = {}) => {
    const k = pop(t, t0, 0.3, 2); if (k <= 0) return;
    P.at(ctx, x, y, k * s, 0, () => {
      ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -90); ctx.moveTo(-26, 0); ctx.lineTo(0, -40); ctx.lineTo(26, 0); ctx.stroke();
      ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.ellipse(0, -96, 26, 10, 0, 0, 7); ctx.fill();
      ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(0, -60, 6 + 2 * Math.sin(t * 8), 0, 7); ctx.fill();
      for (let i = 0; i < ping; i++) { const u = ((t - t0) * 0.9 + i / ping) % 1; ctx.strokeStyle = P.rgba(C.yellow, 1 - u); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, -100, 20 + 70 * u, Math.PI * 1.15, Math.PI * 1.85); ctx.stroke(); }
    });
  };
  // a round pressure gauge, value 0..1
  P.gauge = (ctx, x, y, r, v, label, t) => {
    ctx.save(); ctx.translate(x, y);
    ctx.fillStyle = 'rgba(10,33,72,0.85)'; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 5; ctx.stroke();
    const a0 = Math.PI * 0.8, a1 = Math.PI * 2.2;
    for (let i = 0; i <= 10; i++) { const a = lerp(a0, a1, i / 10); ctx.strokeStyle = i >= 8 ? C.red : C.line; ctx.lineWidth = i % 5 ? 2 : 4; ctx.beginPath(); ctx.moveTo(Math.cos(a) * r * 0.78, Math.sin(a) * r * 0.78); ctx.lineTo(Math.cos(a) * r * 0.92, Math.sin(a) * r * 0.92); ctx.stroke(); }
    ctx.strokeStyle = C.red; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, r * 0.85, lerp(a0, a1, 0.8), a1); ctx.stroke();
    const a = lerp(a0, a1, clamp(v + Math.sin(t * 30) * 0.008 * v)); ctx.strokeStyle = C.yellow; ctx.lineWidth = 7; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * r * 0.72, Math.sin(a) * r * 0.72); ctx.stroke();
    ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(0, 0, 10, 0, 7); ctx.fill();
    G.text(ctx, label, 0, r * 0.55, { size: r * 0.2, fam: P.FT.ui, weight: 800, color: C.line, align: 'center', boil: 0 });
    ctx.restore();
  };
  // horizontal meter bar (value 0..1)
  P.meter = (ctx, x, y, w, h, v, label, color = C.green) => {
    ctx.save(); ctx.fillStyle = 'rgba(10,33,72,0.85)'; ctx.fillRect(x, y, w, h); ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.strokeRect(x, y, w, h);
    ctx.fillStyle = color; ctx.fillRect(x + 6, y + 6, Math.max(0, (w - 12) * clamp(v)), h - 12);
    for (let i = 1; i < 10; i++) { ctx.strokeStyle = 'rgba(10,33,72,0.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x + w * i / 10, y + 6); ctx.lineTo(x + w * i / 10, y + h - 6); ctx.stroke(); }
    G.text(ctx, label, x, y - 16, { size: 32, fam: P.FT.ui, weight: 800, color: C.line, align: 'left', boil: 0 });
    ctx.restore();
  };
  // sun icon (line art)
  P.sun = (ctx, x, y, r, t) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(t * 0.4); ctx.strokeStyle = C.gold; ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.stroke();
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; ctx.beginPath(); ctx.moveTo(Math.cos(a) * r * 1.3, Math.sin(a) * r * 1.3); ctx.lineTo(Math.cos(a) * r * 1.65, Math.sin(a) * r * 1.65); ctx.stroke(); }
    ctx.restore();
  };

  // ---------- Whyverse brand planet (blue, ringed) ----------
  P.planet = (ctx, x, y, r, t) => {
    ctx.save();
    const rot = -0.35;
    const ring = (front) => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.strokeStyle = C.gold; ctx.lineWidth = r * 0.09; ctx.beginPath(); ctx.ellipse(0, 0, r * 1.75, r * 0.45, 0, front ? 0 : Math.PI, front ? Math.PI : Math.PI * 2); ctx.stroke(); ctx.restore(); };
    ring(false);
    const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.35, r * 0.1, x, y, r); g.addColorStop(0, '#8FD0FF'); g.addColorStop(1, '#2A5FB0');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip(); ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = r * 0.12;
    for (let k = -1; k <= 1; k++) { ctx.beginPath(); ctx.moveTo(x - r, y + k * r * 0.4 + Math.sin(t + k) * 4); ctx.lineTo(x + r, y + k * r * 0.4 - r * 0.2 + Math.sin(t + k) * 4); ctx.stroke(); }
    ctx.restore();
    ring(true);
    ctx.restore();
  };

  globalThis.P = P;
})();
