// Whyverse trend Short 2026-11-11 — PAPER CUT-OUT prop library: warm kraft paper, flat cut shapes with soft
// drop shadows, ink outlines, digits in boxes. Pure functions of t.
// Text never boils (FEEDBACK 2026-11-04); no camera shake.
(function () {
  const G = globalThis.G, U = globalThis.U, Data = globalThis.Data;
  const { clamp, lerp, ease } = U;
  G.setStyle('flat', { textBoil: 0, amp: 0 });
  const P = {};
  const C = P.C = {
    bg0: '#F4EAD5', bg1: '#E6D6B4', line: '#2B2A33', faint: 'rgba(43,42,51,0.3)', paper: '#FFF8EA',
    yellow: '#F2C14E', ink: '#2B2A33', cyan: '#2A9D8F', mag: '#E4572E', red: '#D7263D', green: '#5E9E3E', coral: '#F08A4B', gold: '#E9B44C', dim: '#6E6A60', water: '#4C8DD6', smoke: '#8F8B96', navy: '#1E2A4A',
  };
  P.rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; };
  const SAFE = G.SAFE; P.CX = SAFE.x + SAFE.w / 2;
  P.FT = { title: 'Bungee', ui: 'Inter' };
  const pop = P.pop = (t, t0, d = 0.32, s = 2.2) => (t < t0 ? 0 : ease.outBack(clamp((t - t0) / d), s));
  const fin = P.fin = (t, t0, d = 0.3) => clamp((t - t0) / d);
  const fout = P.fout = (t, t1, d = 0.3) => 1 - clamp((t - (t1 - d)) / d);
  P.win = (t, t0, t1, d = 0.3) => Math.min(fin(t, t0, d), fout(t, t1, d));
  P.at = (ctx, x, y, s, rot, fn) => { ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot); if (s !== 1) ctx.scale(s, s); fn(); ctx.restore(); };

  // ---------- background: deep space, slow stars, faint perspective grid at the bottom ----------
  P.glow = (ctx, color, blur = 18) => { ctx.shadowColor = 'rgba(40,25,10,0.22)'; ctx.shadowBlur = 0; ctx.shadowOffsetX = 5; ctx.shadowOffsetY = 7; };
  P.noGlow = (ctx) => { ctx.shadowBlur = 0; ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 0; ctx.shadowColor = 'transparent'; };
  P.bg = (ctx, t, { drift = 1, tint = null } = {}) => {
    const g = ctx.createRadialGradient(G.W * 0.5, G.H * 0.4, 100, G.W * 0.5, G.H * 0.45, G.H * 0.85);
    g.addColorStop(0, tint || C.bg0); g.addColorStop(1, C.bg1); ctx.fillStyle = g; ctx.fillRect(0, 0, G.W, G.H);
    // paper fibres (static) + a few slow drifting paper confetti dots
    ctx.save(); ctx.globalAlpha = 0.06; ctx.fillStyle = '#5a4630';
    for (let i = 0; i < 900; i++) ctx.fillRect(U.hash(i, 7) * G.W, U.hash(i, 8) * G.H, 1 + 3 * U.hash(i, 9), 1);
    ctx.restore();
    ctx.save(); for (let i = 0; i < 14; i++) { const x = (U.hash(i, 11) * G.W + t * 8 * drift * (U.hash(i, 12) - 0.5)) % G.W, y = (U.hash(i, 13) * G.H - t * 10 * drift * U.hash(i, 14) + G.H) % G.H;
      ctx.fillStyle = P.rgba([C.yellow, C.cyan, C.coral][i % 3], 0.18); ctx.beginPath(); ctx.arc(x, y, 10 + 18 * U.hash(i, 15), 0, 7); ctx.fill(); } ctx.restore();
  };
  // glowing stroke helper
  P.neon = (ctx, color, lw, fn) => { ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; fn(); ctx.stroke(); ctx.restore(); };
  // cut-paper shape: flat fill + soft drop shadow + thin ink edge
  P.cut = (ctx, fill, fn, { edge = 3, sh = 1 } = {}) => { ctx.save(); ctx.fillStyle = fill; ctx.shadowColor = 'rgba(40,25,10,0.25)'; ctx.shadowOffsetX = 5 * sh; ctx.shadowOffsetY = 8 * sh; fn(); ctx.fill(); ctx.restore(); if (edge) { ctx.save(); ctx.strokeStyle = 'rgba(43,42,51,0.85)'; ctx.lineWidth = edge; ctx.lineJoin = 'round'; fn(); ctx.stroke(); ctx.restore(); } };

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
      ctx.fillStyle = '#FFF8EA'; ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.strokeRect(-w / 2, -h / 2, w, h);
      G.text(ctx, s, 0, size * 0.36, { size, fam, weight, color, align: 'center', boil: 0 });
    });
  };
  // stamp: slams in at t0, outlined box, slight tilt
  P.stamp = (ctx, s, x, y, t, t0, { size = 80, color = C.yellow, rot = -0.06, t1 = 1e9, fill = '#FFF8EA' } = {}) => {
    if (t < t0) return; const a = clamp((t - t0) / 0.14), k = lerp(2.0, 1, ease.outCubic(a)) * fout(t, t1, 0.3);
    if (k <= 0.01) return;
    const w = G.measure(ctx, s, size, P.FT.title, 400) + 60, h = size * 1.45;
    P.at(ctx, x, y, k, rot, () => {
      ctx.globalAlpha *= clamp(a * 2);
      ctx.fillStyle = fill; ctx.fillRect(-w / 2, -h / 2, w, h);
      P.glow(ctx, color, 24); ctx.strokeStyle = color; ctx.lineWidth = 7; ctx.strokeRect(-w / 2, -h / 2, w, h); P.noGlow(ctx);
      ctx.lineWidth = 2; ctx.strokeRect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20);
      P.text(ctx, s, 0, size * 0.36, { size, color });
    });
  };
  // digits in boxes ("7.5" -> [7][.][5]); each char gets its own box
  P.digits = (ctx, s, x, y, { size = 150, color = C.line, box = C.line, bg = '#FFF8EA', alpha = 1, accent = null } = {}) => {
    const bw = size * 0.78, bh = size * 1.12, gap = size * 0.1;
    const ws = [...s].map((ch) => (ch === '.' || ch === ',' ? size * 0.32 : bw));
    const tw = ws.reduce((a, b) => a + b, 0) + gap * (ws.length - 1);
    let cx = x - tw / 2;
    ctx.save(); ctx.globalAlpha *= alpha;
    [...s].forEach((ch, i) => {
      const w = ws[i];
      if (ch !== '.' && ch !== ',') { ctx.fillStyle = bg; ctx.fillRect(cx, y - bh / 2, w, bh); P.glow(ctx, box, 16); ctx.strokeStyle = box; ctx.lineWidth = 4; ctx.strokeRect(cx, y - bh / 2, w, bh); P.noGlow(ctx); ctx.strokeStyle = 'rgba(43,42,51,0.15)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, y); ctx.lineTo(cx + w, y); ctx.stroke(); }
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


  //__PROPS__
  // ---------- burned-in captions: <=4 words per cue, one keyword highlighted ----------
  P.KEY = {};
  P.captions = (ctx, t, lines, { y = 1440, size = 62 } = {}) => {
    for (const l of lines) {
      if (t < l.t - 0.05 || t > l.end + 0.25) continue;
      const ws = l.words; const cues = []; let cur = [];
      ws.forEach((w, i) => { cur.push(w); const brk = /[,.?!:]$/.test(w.w) || cur.length >= 4 || cur.map((x) => x.w).join(' ').length >= 17; if (brk || i === ws.length - 1) { cues.push(cur); cur = []; } });
      const cue = cues.find((c, i) => t < (cues[i + 1] ? cues[i + 1][0].t : l.end + 0.25)) || cues[cues.length - 1];
      if (!cue || t < cue[0].t - 0.05) return;
      const key = P.KEY[l.id] || [];
      const norm = (s) => s.toLowerCase().replace(/[^a-z0-9.]/g, '').replace(/\.$/, '');
      const parts = cue.map((w) => ({ s: w.w.replace(/[,]$/, '').toUpperCase(), k: key.includes(norm(w.w)), on: t >= w.t - 0.03, t0: w.t }));
      let sz = size; const meas = () => parts.reduce((a, p) => a + G.measure(ctx, p.s, sz, P.FT.title, 400), 0) + (parts.length - 1) * sz * 0.5;
      while (meas() > 860 && sz > 36) sz -= 2;
      let x = G.W / 2 - 70 - meas() / 2 + 70; x = Math.max(60, Math.min(x, 940 - meas()));
      // pill
      ctx.save(); ctx.fillStyle = 'rgba(43,42,51,0.88)'; const pw = meas() + 50, ph = sz * 1.5; ctx.beginPath(); ctx.roundRect(x - 25, y - sz * 1.05, pw, ph, 22); ctx.fill(); ctx.restore();
      for (const p of parts) { const w = G.measure(ctx, p.s, sz, P.FT.title, 400); const k = p.on ? 1 + 0.12 * Math.exp(-(t - p.t0) * 12) : 1;
        ctx.save(); ctx.translate(x + w / 2, y - sz * 0.33); ctx.scale(k, k); ctx.globalAlpha = p.on ? 1 : 0.45;
        
        G.text(ctx, p.s, 0, sz * 0.33, { size: sz, fam: P.FT.title, color: p.k ? C.yellow : '#FFF8EA', align: 'center', boil: 0 }); ctx.restore(); x += w + sz * 0.5; }
      return;
    }
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
