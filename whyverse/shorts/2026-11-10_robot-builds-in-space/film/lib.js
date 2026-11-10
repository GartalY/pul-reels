// Whyverse trend Short 2026-11-10 — NEON space prop library: deep violet night, glowing cyan/magenta/yellow
// line art, digits in glowing boxes, dimension lines, callouts. Pure functions of t.
// Text never boils (FEEDBACK 2026-11-04); no camera shake.
(function () {
  const G = globalThis.G, U = globalThis.U, Data = globalThis.Data;
  const { clamp, lerp, ease } = U;
  G.setStyle('flat', { textBoil: 0, amp: 0 });
  const P = {};
  const C = P.C = {
    bg0: '#120A33', bg1: '#05030F', line: '#E9F6FF', faint: 'rgba(233,246,255,0.35)',
    yellow: '#FFE14D', ink: '#0B0620', cyan: '#3CF0FF', mag: '#FF4FD8', red: '#FF4F6A', green: '#5CFFA8', coral: '#FF8A5C', gold: '#FFC857', dim: '#A9A3D9', water: '#3CF0FF',
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
  P.glow = (ctx, color, blur = 18) => { ctx.shadowColor = color; ctx.shadowBlur = blur; };
  P.noGlow = (ctx) => { ctx.shadowBlur = 0; ctx.shadowColor = 'transparent'; };
  P.bg = (ctx, t, { drift = 1, grid = true } = {}) => {
    const g = ctx.createRadialGradient(G.W * 0.5, G.H * 0.35, 50, G.W * 0.5, G.H * 0.4, G.H * 0.8);
    g.addColorStop(0, C.bg0); g.addColorStop(1, C.bg1); ctx.fillStyle = g; ctx.fillRect(0, 0, G.W, G.H);
    for (let i = 0; i < 140; i++) {
      const x = (U.hash(i, 1) * G.W + t * (4 + 10 * U.hash(i, 3)) * drift) % G.W, y = U.hash(i, 2) * G.H;
      const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * (1 + 2 * U.hash(i, 4)) + i));
      ctx.fillStyle = `rgba(233,246,255,${0.55 * tw})`; ctx.fillRect(x, y, U.hash(i, 5) > 0.85 ? 3 : 2, U.hash(i, 5) > 0.85 ? 3 : 2);
    }
    if (grid) {
      ctx.save(); ctx.strokeStyle = 'rgba(255,79,216,0.16)'; ctx.lineWidth = 2; const hy = G.H * 0.80;
      for (let k = -12; k <= 12; k++) { ctx.beginPath(); ctx.moveTo(G.W / 2 + k * 40, hy); ctx.lineTo(G.W / 2 + k * 260, G.H); ctx.stroke(); }
      for (let j = 0; j < 9; j++) { const u = ((j + (t * 0.5 * drift) % 1) / 9); const y = hy + (G.H - hy) * u * u; ctx.globalAlpha = u; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(G.W, y); ctx.stroke(); }
      ctx.restore();
    }
  };
  // glowing stroke helper
  P.neon = (ctx, color, lw, fn, blur = 16) => { ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; P.glow(ctx, color, blur); fn(); ctx.stroke(); P.noGlow(ctx); ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = Math.max(1.5, lw * 0.3); fn(); ctx.stroke(); ctx.restore(); };

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
      ctx.fillStyle = 'rgba(18,10,51,0.8)'; ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.strokeRect(-w / 2, -h / 2, w, h);
      G.text(ctx, s, 0, size * 0.36, { size, fam, weight, color, align: 'center', boil: 0 });
    });
  };
  // stamp: slams in at t0, outlined box, slight tilt
  P.stamp = (ctx, s, x, y, t, t0, { size = 80, color = C.yellow, rot = -0.06, t1 = 1e9, fill = 'rgba(18,10,51,0.88)' } = {}) => {
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
  P.digits = (ctx, s, x, y, { size = 150, color = C.line, box = C.line, bg = 'rgba(18,10,51,0.75)', alpha = 1, accent = null } = {}) => {
    const bw = size * 0.78, bh = size * 1.12, gap = size * 0.1;
    const ws = [...s].map((ch) => (ch === '.' || ch === ',' ? size * 0.32 : bw));
    const tw = ws.reduce((a, b) => a + b, 0) + gap * (ws.length - 1);
    let cx = x - tw / 2;
    ctx.save(); ctx.globalAlpha *= alpha;
    [...s].forEach((ch, i) => {
      const w = ws[i];
      if (ch !== '.' && ch !== ',') { ctx.fillStyle = bg; ctx.fillRect(cx, y - bh / 2, w, bh); P.glow(ctx, box, 16); ctx.strokeStyle = box; ctx.lineWidth = 4; ctx.strokeRect(cx, y - bh / 2, w, bh); P.noGlow(ctx); ctx.strokeStyle = 'rgba(234,243,255,0.25)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, y); ctx.lineTo(cx + w, y); ctx.stroke(); }
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


  // ---------- neon props ----------
  // Earth limb: a big glowing arc low in frame
  P.earth = (ctx, t, { y = 1650, r = 1500, alpha = 1 } = {}) => {
    ctx.save(); ctx.globalAlpha *= alpha; const cx = G.W / 2, cy = y + r;
    const g = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 1.04); g.addColorStop(0, 'rgba(30,90,200,0.55)'); g.addColorStop(0.96, 'rgba(60,240,255,0.35)'); g.addColorStop(1, 'rgba(60,240,255,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, r * 1.04, 0, 7); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.clip(); ctx.strokeStyle = 'rgba(60,240,255,0.18)'; ctx.lineWidth = 2;
    for (let k = -8; k <= 8; k++) { ctx.beginPath(); ctx.ellipse(cx + ((k * 90 + t * 20) % 1600) - 0, cy, 30 + Math.abs(k) * 4, r, 0, 0, 7); ctx.stroke(); }
    ctx.restore();
    P.neon(ctx, C.cyan, 5, () => { ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI * 1.15, Math.PI * 1.85); }, 30);
    ctx.restore();
  };
  // isometric projection
  P.iso = (cx, cy, s) => (x, y, z) => [cx + (x - z) * 0.866 * s, cy + (x + z) * 0.5 * s - y * s];
  const BOX_E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
  const BOX_V = [[0, 0, 0], [1, 0, 0], [1, 0, 1], [0, 0, 1], [0, 1, 0], [1, 1, 0], [1, 1, 1], [0, 1, 1]];
  // one truss bay as a wire cube at offset (ox,oy,oz) in unit coords; p = build progress 0..1 (edges appear in order)
  P.bay = (ctx, pr, { ox = 0, oy = 0, oz = 0, p = 1, color = C.cyan, lw = 6, net = 0, t = 0, diag = true } = {}) => {
    const V = BOX_V.map(([x, y, z]) => pr(x + ox, y + oy, z + oz));
    const n = p * 12;
    for (let i = 0; i < 12; i++) { const q = clamp(n - i); if (q <= 0) break; const [a, b] = BOX_E[i];
      P.neon(ctx, color, lw, () => { ctx.beginPath(); ctx.moveTo(V[a][0], V[a][1]); ctx.lineTo(lerp(V[a][0], V[b][0], q), lerp(V[a][1], V[b][1], q)); }, 14); }
    if (diag && p >= 1) { ctx.save(); ctx.globalAlpha *= 0.5; P.neon(ctx, color, 3, () => { ctx.beginPath(); ctx.moveTo(V[0][0], V[0][1]); ctx.lineTo(V[5][0], V[5][1]); ctx.moveTo(V[3][0], V[3][1]); ctx.lineTo(V[6][0], V[6][1]); }, 8); ctx.restore(); }
    if (net > 0) { // shiny net on the top face (4,5,6,7)
      const f = [4, 5, 6, 7].map((k) => V[k]); ctx.save(); ctx.globalAlpha *= clamp(net);
      ctx.beginPath(); ctx.moveTo(f[0][0], f[0][1]); for (const q of f.slice(1)) ctx.lineTo(q[0], q[1]); ctx.closePath();
      ctx.fillStyle = 'rgba(255,225,77,0.16)'; ctx.fill(); ctx.clip();
      ctx.strokeStyle = 'rgba(255,225,77,0.75)'; ctx.lineWidth = 2;
      for (let k = 1; k < 8; k++) { const u = k / 8; const a0 = [lerp(f[0][0], f[1][0], u), lerp(f[0][1], f[1][1], u)], a1 = [lerp(f[3][0], f[2][0], u), lerp(f[3][1], f[2][1], u)]; const b0 = [lerp(f[0][0], f[3][0], u), lerp(f[0][1], f[3][1], u)], b1 = [lerp(f[1][0], f[2][0], u), lerp(f[1][1], f[2][1], u)];
        ctx.beginPath(); ctx.moveTo(a0[0], a0[1]); ctx.lineTo(a1[0], a1[1]); ctx.moveTo(b0[0], b0[1]); ctx.lineTo(b1[0], b1[1]); ctx.stroke(); }
      const sh = ((t * 0.7) % 1.6) - 0.3; const gx = lerp(f[0][0], f[2][0], sh), gy = lerp(f[0][1], f[2][1], sh);
      const gr = ctx.createRadialGradient(gx, gy, 0, gx, gy, 90); gr.addColorStop(0, 'rgba(255,255,255,0.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = gr; ctx.fillRect(gx - 90, gy - 90, 180, 180);
      ctx.restore(); }
    // joints
    const nj = Math.min(8, Math.floor(p * 8 + 0.001));
    for (let i = 0; i < 8; i++) { const show = p >= 1 || i < nj; if (!show) continue; ctx.save(); P.glow(ctx, C.yellow, 12); ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(V[i][0], V[i][1], lw * 1.3, 0, 7); ctx.fill(); ctx.restore(); }
    return V;
  };
  // two-link robot arm from base (bx,by) to target (tx,ty); grip 0 open .. 1 closed
  P.arm = (ctx, bx, by, tx, ty, { l1 = 260, l2 = 230, color = C.mag, grip = 1, up = -1 } = {}) => {
    let dx = tx - bx, dy = ty - by, d = Math.hypot(dx, dy); const maxd = l1 + l2 - 1; if (d > maxd) { dx *= maxd / d; dy *= maxd / d; d = maxd; }
    const a = Math.atan2(dy, dx), c = clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1), a1 = a + up * Math.acos(c);
    const ex = bx + Math.cos(a1) * l1, ey = by + Math.sin(a1) * l1, wx = bx + dx, wy = by + dy, a2 = Math.atan2(wy - ey, wx - ex);
    // base
    ctx.save(); ctx.fillStyle = 'rgba(18,10,51,0.9)'; ctx.beginPath(); ctx.moveTo(bx - 70, by + 40); ctx.lineTo(bx + 70, by + 40); ctx.lineTo(bx + 40, by - 10); ctx.lineTo(bx - 40, by - 10); ctx.closePath(); ctx.fill(); ctx.restore();
    P.neon(ctx, color, 6, () => { ctx.beginPath(); ctx.moveTo(bx - 70, by + 40); ctx.lineTo(bx + 70, by + 40); ctx.lineTo(bx + 40, by - 10); ctx.lineTo(bx - 40, by - 10); ctx.closePath(); });
    P.neon(ctx, color, 22, () => { ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(ex, ey); }, 20);
    P.neon(ctx, color, 16, () => { ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(wx, wy); }, 20);
    for (const [x, y, r] of [[bx, by, 20], [ex, ey, 16]]) { ctx.save(); ctx.fillStyle = C.ink; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore(); P.neon(ctx, C.line, 4, () => { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); }); }
    // gripper
    const o = lerp(26, 10, clamp(grip)); const px = -Math.sin(a2), py = Math.cos(a2), fx = Math.cos(a2), fy = Math.sin(a2);
    P.neon(ctx, C.line, 6, () => { ctx.beginPath();
      for (const sgn of [-1, 1]) { ctx.moveTo(wx + px * o * sgn, wy + py * o * sgn); ctx.lineTo(wx + px * o * sgn + fx * 34, wy + py * o * sgn + fy * 34); }
      ctx.moveTo(wx + px * 28, wy + py * 28); ctx.lineTo(wx - px * 28, wy - py * 28); }, 10);
    return [wx + fx * 30, wy + fy * 30, a2];
  };
  // rocket outline (nose up) centred at x, base at y; w = body width
  P.rocket = (ctx, x, y, w, h, { color = C.line, flame = 0, t = 0 } = {}) => {
    const r = w / 2;
    P.neon(ctx, color, 5, () => { ctx.beginPath(); ctx.moveTo(x - r, y); ctx.lineTo(x - r, y - h * 0.72); ctx.quadraticCurveTo(x - r, y - h * 0.95, x, y - h); ctx.quadraticCurveTo(x + r, y - h * 0.95, x + r, y - h * 0.72); ctx.lineTo(x + r, y); ctx.closePath();
      ctx.moveTo(x - r, y - h * 0.72); ctx.lineTo(x + r, y - h * 0.72);
      ctx.moveTo(x - r, y - 10); ctx.lineTo(x - r - w * 0.35, y + 20); ctx.lineTo(x - r, y - h * 0.15); ctx.moveTo(x + r, y - 10); ctx.lineTo(x + r + w * 0.35, y + 20); ctx.lineTo(x + r, y - h * 0.15); });
    if (flame > 0) { ctx.save(); P.glow(ctx, C.coral, 30); for (let k = 0; k < 3; k++) { const fl = (h * 0.28 + Math.sin(t * 40 + k) * h * 0.03) * flame * (1 - k * 0.25); ctx.fillStyle = [C.coral, C.yellow, '#fff'][k]; ctx.beginPath(); ctx.moveTo(x - r * (0.7 - k * 0.2), y); ctx.quadraticCurveTo(x, y + fl * 1.2, x + r * (0.7 - k * 0.2), y); ctx.fill(); } ctx.restore(); }
  };
  // hexagon helper
  P.hex = (ctx, x, y, r) => { ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = Math.PI / 6 + i * Math.PI / 3; const px = x + Math.cos(a) * r, py = y + Math.sin(a) * r; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.closePath(); };
  // Webb-like 18-segment mirror: central column + two side wings that fold back (fold 0..1)
  const HEXES = (() => { const out = []; const ax = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, -1], [-1, 1], [2, 0], [-2, 0], [2, -1], [-2, 1], [1, 1], [-1, -1], [2, -2], [-2, 2], [0, 2], [0, -2], [1, -2], [-1, 2]]; for (const [q, r] of ax) { if (q === 0 && r === 0) continue; out.push([q, r]); } return out.slice(0, 18); })();
  P.mirror = (ctx, x, y, R, { fold = 0, t = 0, color = C.gold } = {}) => {
    for (const [q, r] of HEXES) {
      let hx = R * 1.732 * (q + r / 2), hy = R * 1.5 * r;
      const wing = Math.abs(q + r / 2) >= 1.4 ? Math.sign(q + r / 2) : 0; // outer columns fold back
      let sx = 1;
      if (wing) { const hinge = wing * R * 1.732 * 1.0; const f = Math.cos(Math.PI * 0.92 * fold); hx = hinge + (hx - hinge) * f; sx = Math.max(0.08, Math.abs(f)); }
      ctx.save(); ctx.translate(x + hx, y + hy); ctx.scale(sx, 1);
      ctx.fillStyle = P.rgba(C.gold, 0.18 + 0.1 * Math.sin(t * 2 + q + r)); P.hex(ctx, 0, 0, R * 0.95); ctx.fill();
      P.neon(ctx, color, 3, () => P.hex(ctx, 0, 0, R * 0.95), 10); ctx.restore();
    }
  };
  // astronaut icon (helmet + body)
  P.astro = (ctx, x, y, s, color = C.line) => {
    P.neon(ctx, color, 5, () => { ctx.beginPath(); ctx.arc(x, y - 60 * s, 34 * s, 0, 7); ctx.moveTo(x - 40 * s, y + 60 * s); ctx.lineTo(x - 40 * s, y - 10 * s); ctx.quadraticCurveTo(x, y - 30 * s, x + 40 * s, y - 10 * s); ctx.lineTo(x + 40 * s, y + 60 * s); ctx.closePath(); });
    ctx.save(); ctx.fillStyle = P.rgba(C.cyan, 0.35); ctx.beginPath(); ctx.ellipse(x + 6 * s, y - 62 * s, 20 * s, 14 * s, 0, 0, 7); ctx.fill(); ctx.restore();
  };

  // ---------- burned-in captions: <=4 words per cue, one keyword highlighted ----------
  P.KEY = {};
  P.captions = (ctx, t, lines, { y = 1440, size = 62 } = {}) => {
    for (const l of lines) {
      if (t < l.t - 0.05 || t > l.end + 0.25) continue;
      const ws = l.words; const cues = []; let cur = [];
      ws.forEach((w, i) => { cur.push(w); const brk = /[,.?!:]$/.test(w.w) || cur.length >= 4; if (brk || i === ws.length - 1) { cues.push(cur); cur = []; } });
      const cue = cues.find((c, i) => t < (cues[i + 1] ? cues[i + 1][0].t : l.end + 0.25)) || cues[cues.length - 1];
      if (!cue || t < cue[0].t - 0.05) return;
      const key = P.KEY[l.id] || [];
      const norm = (s) => s.toLowerCase().replace(/[^a-z0-9.]/g, '').replace(/\.$/, '');
      const parts = cue.map((w) => ({ s: w.w.replace(/[,]$/, '').toUpperCase(), k: key.includes(norm(w.w)), on: t >= w.t - 0.03, t0: w.t }));
      let sz = size; const meas = () => parts.reduce((a, p) => a + G.measure(ctx, p.s, sz, P.FT.title, 400), 0) + (parts.length - 1) * sz * 0.5;
      while (meas() > 860 && sz > 36) sz -= 2;
      let x = G.W / 2 - 70 - meas() / 2 + 70; x = Math.max(60, Math.min(x, 940 - meas()));
      // pill
      ctx.save(); ctx.fillStyle = 'rgba(5,3,15,0.62)'; const pw = meas() + 50, ph = sz * 1.5; ctx.beginPath(); ctx.roundRect(x - 25, y - sz * 1.05, pw, ph, 22); ctx.fill(); ctx.restore();
      for (const p of parts) { const w = G.measure(ctx, p.s, sz, P.FT.title, 400); const k = p.on ? 1 + 0.12 * Math.exp(-(t - p.t0) * 12) : 1;
        ctx.save(); ctx.translate(x + w / 2, y - sz * 0.33); ctx.scale(k, k); ctx.globalAlpha = p.on ? 1 : 0.45;
        if (p.k && p.on) P.glow(ctx, C.yellow, 18);
        G.text(ctx, p.s, 0, sz * 0.33, { size: sz, fam: P.FT.title, color: p.k ? C.yellow : C.line, align: 'center', boil: 0 }); ctx.restore(); x += w + sz * 0.5; }
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
