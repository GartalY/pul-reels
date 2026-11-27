// Whyverse ep11 — RISOGRAPH look (new in the STYLE ROTATION): a two-ink print on warm recycled paper.
// Ink 1 = riso BLUE (matter), ink 2 = fluorescent PINK (antimatter); where they overprint they MULTIPLY into violet —
// the look itself is the story (matter + antimatter meeting). A third ink, YELLOW, only for light / energy flashes.
// Halftone-dot shading from cached patterns, a static paper grain + fibre overlay (it never changes frame to frame = no boil),
// a fixed 4 px pink misregistration on big type. Loaded after line.js: it re-colours the shared palette and adds riso helpers.
(function () {
  const G = globalThis.G, U = globalThis.U, P = globalThis.P, S = globalThis.SCORE; const { clamp, lerp, ease } = U; const C = P.C;
  Object.assign(C, {
    pap: '#F2ECDE', pap2: '#E6DDC9', ink: '#2457C5', ink2: 'rgba(36,87,197,0.66)', ink3: 'rgba(36,87,197,0.2)', ink4: 'rgba(36,87,197,0.08)',
    acc: '#FF4F8E', accW: 'rgba(255,79,142,0.16)', accW2: 'rgba(255,79,142,0.32)', gold: '#F6C431', yel: '#F6C431', yelW: 'rgba(246,196,49,0.35)',
    vio: '#5A3A8C', navy: '#1B2B6B', blueW: 'rgba(36,87,197,0.16)',
  });
  P.HAND = 'PatrickHand';
  P.fg = () => (P.dark ? C.pap : C.ink);
  P.fg2 = () => (P.dark ? 'rgba(242,236,222,0.72)' : C.ink2);

  // ---------- cached textures (built once; deterministic) ----------
  const TEX = {};
  const mk = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); return c; };
  const grainTile = () => TEX.grain || (TEX.grain = mk(384, 384, (g, w, h) => {
    const id = g.createImageData(w, h); for (let i = 0; i < w * h; i++) { const n = U.hash(i % w, Math.floor(i / w) * 7 + 3); const v = 255 - Math.floor(n * n * 70);
      id.data[i * 4] = v; id.data[i * 4 + 1] = v - 3; id.data[i * 4 + 2] = v - 8; id.data[i * 4 + 3] = 255; } g.putImageData(id, 0, 0);
    g.globalAlpha = 0.18; g.strokeStyle = '#B9AE96'; g.lineWidth = 1; for (let k = 0; k < 40; k++) { const x = U.hash(k, 9) * w, y = U.hash(k, 10) * h, a = U.hash(k, 11) * 6.28, L = 8 + 20 * U.hash(k, 12);
      g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + Math.cos(a) * L * 0.5 + 4, y + Math.sin(a) * L * 0.5, x + Math.cos(a) * L, y + Math.sin(a) * L); g.stroke(); } }));
  const dotTile = (color, sp, r) => { const key = color + sp + '_' + r; return TEX[key] || (TEX[key] = mk(sp, sp, (g) => { g.fillStyle = color; g.beginPath(); g.arc(sp / 2, sp / 2, r, 0, 7); g.fill(); })); };
  const patCache = new WeakMap();
  P.pattern = (ctx, tile) => { let m = patCache.get(ctx); if (!m) { m = new Map(); patCache.set(ctx, m); } let p = m.get(tile); if (!p) { p = ctx.createPattern(tile, 'repeat'); m.set(tile, p); } return p; };

  // halftone fill of a path: dot grid (rotated 15°/45° like a riso screen), clipped to the path
  P.halftone = (ctx, path, color = C.ink, { sp = 12, r = 3, a = 1, ang = 0.26 } = {}) => {
    if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; path(ctx); ctx.clip(); ctx.rotate(ang); ctx.fillStyle = P.pattern(ctx, dotTile(color, sp, r));
    ctx.fillRect(-2400, -2400, 4800 + G.W, 4800 + G.H); ctx.restore();
  };
  // an ink fill that overprints (multiply) — overlapping blue + pink become violet like real riso
  P.inkFill = (ctx, path, color, { a = 1, shade = 0, shadeColor = null, sp = 11, off = null } = {}) => {
    if (a <= 0.01) return; ctx.save(); if (!P.dark) ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha *= a; if (off) ctx.translate(off[0], off[1]);
    ctx.fillStyle = color; path(ctx); ctx.fill();
    if (shade > 0) P.halftone(ctx, path, shadeColor || P.mix(color, '#0A1030', 0.4), { sp, r: sp * 0.28 * shade + 1, a: 0.9 });
    ctx.restore();
  };
  P.iCirc = (ctx, x, y, r, color, o = {}) => P.inkFill(ctx, P.pEll(x, y, r, r), color, o);
  P.iEll = (ctx, x, y, rx, ry, color, o = {}) => P.inkFill(ctx, P.pEll(x, y, rx, ry, o.rot || 0), color, o);
  P.iRect = (ctx, x, y, w, h, r, color, o = {}) => P.inkFill(ctx, P.pRR(x, y, w, h, r), color, o);
  P.iPoly = (ctx, pts, color, o = {}) => P.inkFill(ctx, o.curve ? P.pCurve(pts, true, 0.5) : P.pPoly(pts), color, o);

  // ---------- backgrounds ----------
  P.bgLine = (ctx, t, { color = C.pap, dots = 1, corner = 1 } = {}) => {
    P.dark = false; ctx.fillStyle = color; ctx.fillRect(-600, -600, G.W + 1200, G.H + 1200);
    if (corner > 0) { // a big soft halftone gradient blob drifting slowly in one corner (ink 2), like a riso poster background
      const cx = 1720 + Math.sin(t * 0.07) * 60, cy = 120 + Math.cos(t * 0.05) * 40;
      ctx.save(); ctx.globalAlpha *= 0.55 * corner; if (!P.dark) ctx.globalCompositeOperation = 'multiply';
      for (let ring = 0; ring < 5; ring++) P.halftone(ctx, P.pEll(cx, cy, 520 - ring * 90, 420 - ring * 72), C.acc, { sp: 16, r: 1.6 + ring * 0.9, a: 0.5, ang: 0.79 });
      ctx.restore();
      const bx = 160 + Math.cos(t * 0.06) * 50, by = 980 + Math.sin(t * 0.05) * 30; ctx.save(); ctx.globalAlpha *= 0.4 * corner; for (let ring = 0; ring < 4; ring++) P.halftone(ctx, P.pEll(bx, by, 420 - ring * 90, 320 - ring * 70), '#2457C5', { sp: 16, r: 1.2 + ring * 0.8, a: 0.45, ang: 0.26 }); ctx.restore(); }
  };
  P.bgInk = (ctx, t, { color = C.navy } = {}) => { P.dark = true; ctx.fillStyle = color; ctx.fillRect(-600, -600, G.W + 1200, G.H + 1200);
    ctx.save(); ctx.globalAlpha *= 0.35; P.halftone(ctx, P.pEll(G.W * 0.5, G.H * 0.55, 1100, 700), '#3B5FC0', { sp: 14, r: 4, a: 1, ang: 0.79 }); ctx.restore(); };
  // the print texture over everything (static grain + fibres, multiplied) + faint registration marks
  P.paperPost = (ctx, a = 1) => {
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = 0.4 * a;
    ctx.fillStyle = P.pattern(ctx, grainTile()); ctx.fillRect(0, 0, G.W, G.H); ctx.restore();
  };

  // ---------- two-ink type: pink plate printed 5 px off-register under the blue plate ----------
  P.rtext = (ctx, s, x, y, { size = 120, align = 'center', a = 1, fam = 'Inter', weight = 900, top = null, under = null, off = [5, 4] } = {}) => {
    if (a <= 0.01) return; ctx.save(); if (!P.dark) ctx.globalCompositeOperation = 'multiply';
    G.text(ctx, s, x + off[0], y + off[1], { size, fam, weight, color: under || C.acc, align, boil: 0, alpha: a * 0.9 });
    G.text(ctx, s, x, y, { size, fam, weight, color: top || C.ink, align, boil: 0, alpha: a });
    ctx.restore();
  };
  // stamp a word in two inks (slams in)
  P.rslam = (ctx, s, x, y, t, t0, o = {}) => { if (t < t0) return; const k = clamp((t - t0) / 0.14); const sc = lerp(1.5, 1, ease.outCubic(k)) * P.fout(t, o.t1 || 1e9, 0.3);
    if (sc <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.globalAlpha *= clamp(k * 2); P.rtext(ctx, s, 0, 0, Object.assign({}, o, { a: 1 })); ctx.restore(); };

  // ---------- particles: the episode's visual atoms ----------
  // a particle disc: matter = blue, anti = pink; sign drawn in paper colour; halftone shading on the lower-right
  P.part = (ctx, x, y, r, kind = 'e', { a = 1, sign = true, k = 1, label = null } = {}) => {
    if (a <= 0.01 || k <= 0.01 || r < 0.5) return; const anti = kind === 'p' || kind === 'pbar' || kind === 'anti'; const col = anti ? C.acc : C.ink; const rr = r * ease.outBack(clamp(k), 2);
    ctx.save(); ctx.globalAlpha *= a; P.iCirc(ctx, x, y, rr, col, { shade: 0.9, sp: Math.max(6, r * 0.35) });
    P.iCirc(ctx, x - rr * 0.3, y - rr * 0.32, rr * 0.22, 'rgba(255,255,255,0.35)');
    if (sign && rr > 9) { ctx.strokeStyle = C.pap; ctx.lineWidth = Math.max(2, rr * 0.16); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - rr * 0.4, y); ctx.lineTo(x + rr * 0.4, y);
      const plus = kind === 'p' || kind === 'proton'; if (plus) { ctx.moveTo(x, y - rr * 0.4); ctx.lineTo(x, y + rr * 0.4); } ctx.stroke(); }
    if (label) G.text(ctx, label, x, y + rr + 40, { size: 30, fam: 'Inter', weight: 800, color: col, align: 'center', boil: 0 });
    ctx.restore();
  };
  // annihilation flash: yellow starburst + zig-zag photons flying out (t0 = moment of contact)
  P.flash = (ctx, x, y, t, t0, { r = 260, n = 8, seed = 1, dur = 1.1 } = {}) => {
    const u = (t - t0) / dur; if (u < 0 || u > 1) return; const e = ease.outCubic(u);
    ctx.save(); if (!P.dark) ctx.globalCompositeOperation = 'multiply';
    const rb = r * (0.25 + 0.75 * e), fa = 1 - u; const pts = []; for (let i = 0; i < 28; i++) { const ang = (i / 28) * 6.283; const rad = i % 2 ? rb * 0.45 : rb; pts.push([x + Math.cos(ang) * rad, y + Math.sin(ang) * rad]); }
    P.iPoly(ctx, pts, C.yel, { a: fa }); P.iCirc(ctx, x, y, rb * 0.3, C.yel, { a: fa });
    ctx.restore();
    for (let i = 0; i < n; i++) { const ang = (i / n) * 6.283 + U.hash(i, seed) * 0.5; const d0 = r * 0.3 + e * r * 1.6, d1 = d0 + 90; const pts2 = [];
      for (let j = 0; j <= 12; j++) { const d = lerp(d0, d1, j / 12); const w = Math.sin(j * 2.4) * 10; pts2.push([x + Math.cos(ang) * d - Math.sin(ang) * w, y + Math.sin(ang) * d + Math.cos(ang) * w]); }
      P.art(ctx, [pts2], 1, { color: C.yel, lw: 6, a: fa }); P.art(ctx, [pts2.map((p) => [p[0] + 3, p[1] + 2])], 1, { color: C.acc, lw: 2.5, a: fa * 0.6 }); }
  };
  // a pair being born / meeting: two particles approach and annihilate at tHit
  P.pairMeet = (ctx, x, y, t, t0, tHit, { gap = 300, r = 40, seed = 1 } = {}) => {
    if (t < t0) return; const u = P.eio((t - t0) / Math.max(0.01, tHit - t0)); const d = gap * (1 - u);
    if (t < tHit) { P.part(ctx, x - d, y, r, 'e', { k: P.dk(t, t0, 0.3) }); P.part(ctx, x + d, y, r, 'p', { k: P.dk(t, t0, 0.3) }); }
    P.flash(ctx, x, y, t, tHit, { r: r * 4, seed });
  };

  // progress counter: 6 chapter dots on a print-registration bar, top-right
  P.progress = (ctx, t, n, a = 1) => {
    if (a <= 0.01) return; const x0 = G.W - 70 - 5 * 44, y = 70; ctx.save(); ctx.globalAlpha *= a * 0.92;
    ctx.strokeStyle = C.ink2; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + 5 * 44, y); ctx.stroke();
    for (let i = 0; i < 6; i++) { const on = i < n, cur = i === n - 1; const r = cur ? 14 + Math.sin(t * 3) * 1.5 : 11;
      if (on) P.iCirc(ctx, x0 + i * 44, y, r, i % 2 ? C.acc : C.ink); else { ctx.fillStyle = C.pap; ctx.beginPath(); ctx.arc(x0 + i * 44, y, r, 0, 7); ctx.fill(); ctx.strokeStyle = C.ink2; ctx.lineWidth = 3; ctx.stroke(); } }
    G.text(ctx, 'WHYVERSE · EP 11', x0 - 30, y + 10, { size: 24, fam: 'Inter', weight: 800, color: C.ink2, align: 'right', boil: 0 });
    ctx.restore();
  };
})();
