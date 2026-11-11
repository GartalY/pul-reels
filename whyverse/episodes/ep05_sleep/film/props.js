// Whyverse ep05 — watercolor props (bed, brain, hourglass, clock, cup, animals…) + shot helpers (chapter card, hook, talk).
(function () {
  const P = globalThis.P, S = globalThis.SCORE, U = globalThis.U, G = globalThis.G; const C = P.C; const { clamp, lerp, ease } = U;
  const dot = (ctx, x, y, r, col = C.ink, a = 1) => { ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore(); };
  const arc = (ctx, x, y, r, a0, a1, col = C.ink, lw = 4) => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(x, y, r, a0, a1); ctx.stroke(); ctx.restore(); };
  P.dot = dot; P.arc = arc;

  // ---------- a bed with a sleeper (side view). origin = floor centre; ~600 wide, ~260 tall at s = 1. Returns the head position. ----------
  // o: {t, blanket, skin, hair, eyes 'closed'|'open'|'wide'|'rem'|'none', mouth 'sleep'|'smile'|'o', breathe (0..1), empty, pj, wood}
  P.bed = (ctx, x, y, s, o = {}) => {
    const { t = G.t, blanket = C.peri, skin = C.skin, hair = '#5A3E2B', eyes = 'closed', mouth = 'sleep', breathe = 1, empty = false, wood = C.wood, a = 1, seed = 1, lift = 0 } = o;
    if (a <= 0.01) return { x, y };
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a;
    ctx.save(); ctx.globalAlpha *= 0.14; ctx.fillStyle = '#10143A'; ctx.beginPath(); ctx.ellipse(0, 6, 320, 18, 0, 0, 7); ctx.fill(); ctx.restore();
    P.rect(ctx, -292, -40, 20, 44, 5, P.dk(wood, 0.2), { seed: seed + 1 }); P.rect(ctx, 268, -40, 20, 44, 5, P.dk(wood, 0.2), { seed: seed + 2 });
    P.rect(ctx, -312, -236, 36, 200, 14, wood, { seed: seed + 3 });                 // headboard
    P.rect(ctx, -290, -74, 590, 40, 10, wood, { seed: seed + 4 });                  // frame
    P.rect(ctx, -276, -116, 566, 48, 16, C.cream, { seed: seed + 5, edge: 0.3 });   // mattress
    P.ell(ctx, -196, -128, 76, 26, C.white, { seed: seed + 6, edge: 0.3, rot: -0.05 }); // pillow
    const hx = -190, hy = -160 - lift; const br = Math.sin(t * 1.5 + seed) * 7 * breathe;
    if (!empty) {
      P.ell(ctx, hx - 16, hy - 6, 48, 44, hair, { seed: seed + 7, edge: 0.3 });     // hair behind
      P.ell(ctx, hx, hy, 40, 40, skin, { seed: seed + 8 });
      P.wash(ctx, (c) => { c.beginPath(); c.arc(hx, hy, 41, Math.PI * 0.95, Math.PI * 1.75); c.quadraticCurveTo(hx - 6, hy - 14, hx - 40, hy - 4); c.closePath(); }, hair, { seed: seed + 9, edge: 0.3 });
      const ey = hy + 2;
      for (const sx of [-13, 15]) {
        if (eyes === 'closed') arc(ctx, hx + sx, ey - 3, 8, Math.PI * 0.15, Math.PI * 0.85, C.ink, 3.5);
        else if (eyes === 'rem') { const d = Math.sin(t * 17 + sx) * 4 + Math.sin(t * 29) * 2; arc(ctx, hx + sx + d, ey - 3, 8, Math.PI * 0.15, Math.PI * 0.85, C.ink, 3.5); arc(ctx, hx + sx + d, ey + 1, 7, Math.PI * 1.2, Math.PI * 1.8, P.dk(skin, 0.3), 2.5); }
        else if (eyes !== 'none') { const big = eyes === 'wide' ? 1.5 : 1; dot(ctx, hx + sx, ey, 8 * big, C.white); dot(ctx, hx + sx + 1, ey, 4.2 * big, C.ink); }
      }
      dot(ctx, hx - 22, hy + 14, 8, C.pink, 0.5); dot(ctx, hx + 24, hy + 14, 8, C.pink, 0.5);
      if (mouth === 'smile') arc(ctx, hx + 1, hy + 12, 9, Math.PI * 0.15, Math.PI * 0.85, C.ink, 3.5);
      else if (mouth === 'o') dot(ctx, hx + 1, hy + 20, 6, '#7A3B3B');
      else { ctx.save(); ctx.fillStyle = '#7A3B3B'; ctx.beginPath(); ctx.ellipse(hx + 1, hy + 21, 5, 3 + 2.5 * (0.5 + 0.5 * Math.sin(t * 1.5 + seed)), 0, 0, 7); ctx.fill(); ctx.restore(); }
    }
    // blanket: a breathing mound from the chin to the foot of the bed
    const top = empty ? -128 : -178 - br;
    P.wash(ctx, (c) => { c.beginPath(); c.moveTo(-150, -112); c.bezierCurveTo(-140, top - 10, -40, top - 14, 40, top + 6); c.bezierCurveTo(130, top + 26, 230, -150, 288, -118); c.lineTo(292, -70); c.lineTo(-150, -70); c.closePath(); }, blanket, { bb: [70, -120, 240], seed: seed + 10 });
    P.brush(ctx, (c) => { c.beginPath(); c.moveTo(-150, -112); c.bezierCurveTo(-140, top - 10, -40, top - 14, 40, top + 6); }, P.lt(blanket, 0.45), 9, 0.8);
    ctx.restore();
    return { x: x + hx * s, y: y + hy * s };
  };
  // floating z z z above (x, y)
  P.zzz = (ctx, x, y, t, { n = 3, color = null, size = 54, a = 1, dx = 46, rise = 120 } = {}) => {
    if (a <= 0.01) return; const col = color || P.fg();
    for (let i = 0; i < n; i++) { const ph = (t * 0.42 + i / n) % 1; const al = Math.sin(ph * Math.PI) * a; if (al <= 0.02) continue;
      G.text(ctx, i % 2 ? 'z' : 'Z', x + dx * ph * (1 + i * 0.25) + Math.sin(ph * 6 + i) * 10, y - rise * ph, { size: size * (0.6 + 0.8 * ph), fam: P.FT.title, weight: 700, color: col, alpha: al, align: 'center', boil: 0 }); }
  };
  // a brain in side view (facing left), radius ~r
  P.brain = (ctx, x, y, r, { color = C.brain, a = 1, seed = 1, folds = 1, stem = true } = {}) => {
    if (a <= 0.01 || r < 1) return; ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a;
    const q = (pts) => pts.map(([px, py]) => [px * r, py * r]);
    if (stem) P.wash(ctx, P.pRR(r * 0.12, r * 0.42, r * 0.22, r * 0.55, r * 0.1), P.dk(color, 0.18), { seed: seed + 1 });
    P.ell(ctx, r * 0.58, r * 0.52, r * 0.34, r * 0.24, P.dk(color, 0.14), { seed: seed + 2 });
    P.shape(ctx, q([[-1, 0.05], [-0.93, -0.42], [-0.6, -0.78], [-0.1, -0.93], [0.45, -0.84], [0.88, -0.46], [1, 0.02], [0.82, 0.4], [0.4, 0.5], [0, 0.44], [-0.5, 0.5], [-0.86, 0.38]]), color, { seed: seed + 3 });
    if (folds) { const f = P.dk(color, 0.32); const lw = Math.max(2.5, r * 0.045);
      for (const pts of [[[-0.75, -0.2], [-0.5, -0.45], [-0.25, -0.3], [-0.05, -0.55]], [[-0.6, 0.2], [-0.3, 0.05], [0, 0.2], [0.3, 0.02]], [[0.1, -0.7], [0.3, -0.45], [0.55, -0.55], [0.7, -0.25]], [[-0.2, -0.05], [0.1, -0.2], [0.4, -0.1], [0.65, 0.12]], [[-0.85, 0.1], [-0.7, 0.0]]])
        P.brush(ctx, P.pCurve(q(pts), false), f, lw, 0.6 * folds); }
    ctx.restore();
  };
  // an hourglass: f = share of sand that has fallen (0..1)
  P.hourglass = (ctx, x, y, h, f, t, { sand = C.gold, a = 1, running = true } = {}) => {
    if (a <= 0.01) return; const w = h * 0.52; ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a; f = clamp(f);
    const glass = (c) => { c.beginPath(); c.moveTo(-w / 2, -h / 2); c.lineTo(w / 2, -h / 2); c.bezierCurveTo(w / 2, -h * 0.18, 10, -h * 0.06, 8, 0); c.bezierCurveTo(10, h * 0.06, w / 2, h * 0.18, w / 2, h / 2); c.lineTo(-w / 2, h / 2); c.bezierCurveTo(-w / 2, h * 0.18, -10, h * 0.06, -8, 0); c.bezierCurveTo(-10, -h * 0.06, -w / 2, -h * 0.18, -w / 2, -h / 2); c.closePath(); };
    P.wash(ctx, glass, '#DCEBFA', { fillA: 0.55, edge: 0.3, seed: 3 });
    ctx.save(); glass(ctx); ctx.clip(); ctx.fillStyle = sand; ctx.globalAlpha *= 0.92;
    const topH = (h / 2 - 12) * Math.pow(1 - f, 0.6); ctx.fillRect(-w / 2, -topH - 2, w, topH + 2);
    const botH = (h / 2 - 10) * Math.pow(f, 0.6); ctx.beginPath(); ctx.moveTo(-w / 2, h / 2); ctx.lineTo(w / 2, h / 2); ctx.lineTo(w / 2, h / 2 - botH * 0.7); ctx.quadraticCurveTo(0, h / 2 - botH * 1.25, -w / 2, h / 2 - botH * 0.7); ctx.closePath(); ctx.fill();
    if (running && f < 0.995 && f > 0.001) { ctx.fillRect(-2.5, 0, 5, h / 2); for (let i = 0; i < 5; i++) { const ph = (t * 2.3 + i / 5) % 1; ctx.fillRect(-4 + U.hash(i, 3) * 8, ph * h * 0.45, 3, 6); } }
    ctx.restore();
    P.brush(ctx, glass, P.dark ? C.cream : C.ink, 4, 0.75);
    P.rect(ctx, -w / 2 - 14, -h / 2 - 18, w + 28, 20, 8, C.wood, { seed: 4 }); P.rect(ctx, -w / 2 - 14, h / 2 - 2, w + 28, 20, 8, C.wood, { seed: 5 });
    ctx.restore();
  };
  P.clock = (ctx, x, y, r, hh, mm, { a = 1, face = C.cream, rim = C.coral, hand = C.ink, seed = 1 } = {}) => {
    if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
    P.ell(ctx, x, y, r * 1.1, r * 1.1, rim, { seed }); P.ell(ctx, x, y, r, r, face, { seed: seed + 1, edge: 0.2, fillA: 0.97 });
    for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283; P.line(ctx, x + Math.sin(an) * r * 0.8, y - Math.cos(an) * r * 0.8, x + Math.sin(an) * r * 0.9, y - Math.cos(an) * r * 0.9, hand, i % 3 ? 3 : 5, 0.8); }
    const ah = ((hh % 12) + mm / 60) / 12 * 6.283, am = mm / 60 * 6.283;
    P.line(ctx, x, y, x + Math.sin(ah) * r * 0.5, y - Math.cos(ah) * r * 0.5, hand, Math.max(5, r * 0.08), 1);
    P.line(ctx, x, y, x + Math.sin(am) * r * 0.76, y - Math.cos(am) * r * 0.76, C.coral, Math.max(4, r * 0.05), 1);
    dot(ctx, x, y, Math.max(4, r * 0.06), hand); ctx.restore();
  };
  P.cup = (ctx, x, y, r, t, { color = C.coral, steam = 1, a = 1, seed = 1 } = {}) => {
    if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a;
    P.brush(ctx, (c) => { c.beginPath(); c.arc(r * 0.62, -r * 0.05, r * 0.3, -1.3, 1.3); }, color, r * 0.14, 1);
    P.wash(ctx, (c) => { c.beginPath(); c.moveTo(-r * 0.6, -r * 0.55); c.lineTo(r * 0.6, -r * 0.55); c.lineTo(r * 0.45, r * 0.55); c.lineTo(-r * 0.45, r * 0.55); c.closePath(); }, color, { bb: [0, 0, r], seed });
    P.ell(ctx, 0, -r * 0.55, r * 0.6, r * 0.13, '#5B3A2A', { seed: seed + 1, edge: 0.2 });
    if (steam > 0) for (let i = 0; i < 3; i++) { const ph = (t * 0.5 + i / 3) % 1; ctx.save(); ctx.globalAlpha *= Math.sin(ph * Math.PI) * 0.6 * steam; P.brush(ctx, (c) => { c.beginPath(); const sx = (i - 1) * r * 0.3; c.moveTo(sx, -r * 0.75 - ph * r); c.quadraticCurveTo(sx + 14, -r * 0.95 - ph * r, sx, -r * 1.15 - ph * r); c.quadraticCurveTo(sx - 14, -r * 1.35 - ph * r, sx, -r * 1.5 - ph * r); }, P.dark ? C.cream : C.grey, 5, 1); ctx.restore(); }
    ctx.restore();
  };
  // an EEG-like wave drawn left → right, scrolling. kind: 'awake' (fast, small) | 'deep' (slow, huge) | 'rem' (fast, mid)
  P.wave = (ctx, x, y, w, t, { kind = 'awake', color = C.coral, lw = 5, a = 1, k = 1, amp = 1 } = {}) => {
    if (a <= 0.01 || k <= 0) return; const f = kind === 'deep' ? 0.018 : kind === 'rem' ? 0.085 : 0.11, A = (kind === 'deep' ? 46 : kind === 'rem' ? 15 : 9) * amp, sp = kind === 'deep' ? 1.6 : 6;
    P.brush(ctx, (c) => { c.beginPath(); for (let i = 0; i <= w * k; i += 4) { const ph = (x + i) * f - t * sp; const yy = y + Math.sin(ph) * A + Math.sin(ph * 2.7 + 1) * A * 0.35 + (kind !== 'deep' ? Math.sin(ph * 5.3) * A * 0.3 : 0); i ? c.lineTo(x + i, yy) : c.moveTo(x + i, yy); } }, color, lw, a);
  };
  // Whyverse planet mark (watercolor)
  P.planet = (ctx, x, y, r, t, { a = 1 } = {}) => {
    if (r <= 0.5 || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(-0.35);
    const ring = (front) => { ctx.save(); ctx.beginPath(); if (front) ctx.rect(-r * 2.3, 0, r * 4.6, r * 2); else ctx.rect(-r * 2.3, -r * 2, r * 4.6, r * 2); ctx.clip();
      P.brush(ctx, (c) => { c.beginPath(); c.ellipse(0, 0, r * 1.75, r * 0.45, 0, 0, 7); }, C.gold, r * 0.12, 1);
      P.brush(ctx, (c) => { c.beginPath(); c.ellipse(0, 0, r * 2.0, r * 0.53, 0, 0, 7); }, C.coral, r * 0.06, 1); ctx.restore(); };
    ring(false); P.ell(ctx, 0, 0, r, r, '#4F7FE0', { seed: 53 }); P.ell(ctx, -r * 0.3, -r * 0.3, r * 0.35, r * 0.2, '#9CC0FF', { edge: 0, fillA: 0.5, rot: -0.4 }); ring(true); ctx.restore();
  };

  // ---------- animals (origin = body centre, size ~r, facing right unless flipped by the caller) ----------
  // o: {t, sleep (eyes closed), a, seed, flap, pulse, nod}
  P.animal = (ctx, kind, x, y, r, o = {}) => {
    const { t = G.t, sleep = false, a = 1, seed = 1, flap = 0, pulse = 0, nod = 0, flip = false, color = null } = o; if (a <= 0.01 || r < 1) return;
    ctx.save(); ctx.translate(x, y); if (flip) ctx.scale(-1, 1); ctx.globalAlpha *= a;
    const q = (pts) => pts.map(([px, py]) => [px * r, py * r]);
    const eye = (ex, ey, er = r * 0.05) => { if (sleep) arc(ctx, ex, ey - er * 0.4, er * 1.5, Math.PI * 0.15, Math.PI * 0.85, C.ink, Math.max(2.5, r * 0.025)); else { dot(ctx, ex, ey, er * 1.5, C.white); dot(ctx, ex + er * 0.2, ey, er * 0.85, C.ink); } };
    switch (kind) {
      case 'elephant': { const g = color || '#9AA3B8', gd = P.dk(g, 0.2);
        P.brush(ctx, P.pCurve(q([[-0.88, -0.2], [-1.05, 0.1], [-1.0, 0.4]]), false), gd, r * 0.05, 1);
        for (const lx of [-0.62, -0.28, 0.2, 0.52]) P.rect(ctx, (lx - 0.11) * r, r * 0.3, r * 0.24, r * 0.68, r * 0.08, lx === -0.28 || lx === 0.2 ? gd : g, { seed: seed + lx * 10 });
        P.ell(ctx, -0.1 * r, 0, r * 0.84, r * 0.56, g, { seed: seed + 1 });
        P.ell(ctx, r * 0.74, -r * 0.26 + nod * r * 0.1, r * 0.4, r * 0.4, g, { seed: seed + 2 });
        P.brush(ctx, P.pCurve(q([[1.02, -0.2 + nod * 0.1], [1.2, 0.1 + nod * 0.1], [1.16, 0.55], [1.02, 0.78 + 0.04 * Math.sin(t * 1.3)]]), false), g, r * 0.17, 1);
        P.brush(ctx, P.pCurve(q([[0.92, 0.0 + nod * 0.1], [1.08, 0.12 + nod * 0.1], [1.2, 0.02 + nod * 0.1]]), false), C.cream, r * 0.06, 1);
        P.ell(ctx, r * 0.5, -r * 0.24 + nod * r * 0.1, r * 0.27, r * 0.4, gd, { seed: seed + 3, rot: 0.12 + 0.06 * Math.sin(t * 1.1) });
        eye(r * 0.86, -r * 0.36 + nod * r * 0.1); break; }
      case 'penguin': { const bk = '#2A3157';
        for (const sx of [-1, 1]) P.ell(ctx, sx * r * 0.22, r * 0.86, r * 0.2, r * 0.08, C.coral, { seed: seed + sx });
        for (const sx of [-1, 1]) P.ell(ctx, sx * r * 0.5, r * 0.02, r * 0.12, r * 0.44, bk, { seed: seed + 3 + sx, rot: sx * (-0.22 - 0.2 * flap) });
        P.ell(ctx, 0, r * 0.1, r * 0.48, r * 0.76, bk, { seed: seed + 5 });
        P.ell(ctx, 0, r * 0.18, r * 0.33, r * 0.6, C.cream, { seed: seed + 6, edge: 0.2 });
        ctx.save(); ctx.translate(0, -r * 0.62); ctx.rotate(nod * 0.5); ctx.translate(0, nod * r * 0.1);
        P.ell(ctx, 0, 0, r * 0.36, r * 0.33, bk, { seed: seed + 7 });
        P.wash(ctx, (c) => { c.beginPath(); c.ellipse(0, r * 0.06, r * 0.28, r * 0.22, 0, 0, 7); }, C.cream, { edge: 0.15 });
        arc(ctx, 0, -r * 0.02, r * 0.27, Math.PI * 0.2, Math.PI * 0.8, bk, Math.max(2.5, r * 0.035));   // the chin strap
        P.shape(ctx, q([[-0.07, 0.0], [0.07, 0.0], [0, 0.12]]), '#3A3F5E', { poly: true, edge: 0.2 });
        eye(-r * 0.13, -r * 0.03, r * 0.035); eye(r * 0.13, -r * 0.03, r * 0.035); ctx.restore(); break; }
      case 'jelly': { const col = color || '#7CC5C0'; const pw = 1 + 0.12 * pulse;
        for (let i = 0; i < 7; i++) { const bx = (i - 3) * r * 0.2; const sw = Math.sin(t * 1.4 + i) * r * 0.08 * (0.3 + pulse);
          P.brush(ctx, P.pCurve([[bx, -r * 0.05], [bx + sw, -r * 0.4], [bx - sw * 0.6, -r * 0.7], [bx + sw, -r * (0.95 + 0.1 * (i % 2))]], false), i % 2 ? '#D9A2C8' : '#9AD6C3', r * 0.09, 0.9); }
        P.wash(ctx, (c) => { c.beginPath(); c.moveTo(-r * 0.85 * pw, -r * 0.02); c.bezierCurveTo(-r * 0.85 * pw, r * 0.6 / pw, r * 0.85 * pw, r * 0.6 / pw, r * 0.85 * pw, -r * 0.02); c.quadraticCurveTo(0, r * 0.12, -r * 0.85 * pw, -r * 0.02); c.closePath(); }, col, { bb: [0, r * 0.2, r], seed, fillA: 0.8 });
        for (let i = 0; i < 5; i++) dot(ctx, (i - 2) * r * 0.26, r * 0.2 + (i % 2) * r * 0.05, r * 0.045, C.cream, 0.7); break; }
      case 'dolphin': { const col = color || '#7C9CC4';
        P.shape(ctx, q([[-0.98, 0.0], [-1.34, -0.2], [-1.2, 0.02], [-1.36, 0.22]]), P.dk(col, 0.15), { seed: seed + 1, k: 0.5 });
        P.shape(ctx, q([[0.02, -0.3], [-0.12, -0.56], [-0.34, -0.6], [-0.3, -0.26]]), P.dk(col, 0.15), { seed: seed + 2, k: 0.5 });
        P.shape(ctx, q([[1.34, 0.1], [1.04, 0.02], [0.94, -0.14], [0.62, -0.3], [0.1, -0.36], [-0.5, -0.2], [-1.02, -0.02], [-0.5, 0.15], [0.2, 0.28], [0.8, 0.24], [1.04, 0.17]]), col, { seed: seed + 3 });
        P.wash(ctx, P.pCurve(q([[1.0, 0.16], [0.4, 0.27], [-0.4, 0.14], [0.2, 0.12]]), true), '#EAF2FB', { edge: 0, fillA: 0.7 });
        P.shape(ctx, q([[0.34, 0.2], [0.2, 0.5], [0.06, 0.52], [0.1, 0.24]]), P.dk(col, 0.15), { seed: seed + 4, k: 0.5 });
        eye(r * 0.8, -r * 0.03, r * 0.04); P.brush(ctx, P.pCurve(q([[1.3, 0.1], [1.05, 0.1], [0.9, 0.05]]), false), C.ink, Math.max(2, r * 0.02), 0.7); break; }
      case 'frigate': { const bk = '#2B2F4F'; const e = -0.5 + 0.25 * Math.sin(flap * 6.283);
        P.shape(ctx, q([[-1.45, -0.05 - e * 0.2], [-0.7, e], [-0.15, -0.14], [0, -0.22], [0.15, -0.14], [0.7, e], [1.45, -0.05 - e * 0.2], [0.7, e + 0.26], [0.13, 0.12], [0.07, 0.8], [0, 0.34], [-0.07, 0.8], [-0.13, 0.12], [-0.7, e + 0.26]]), bk, { poly: true, seed, edge: 0.3 });
        P.ell(ctx, 0, -r * 0.26, r * 0.1, r * 0.12, bk, { seed: seed + 1 }); P.ell(ctx, 0, -r * 0.1, r * 0.09, r * 0.1, C.red, { seed: seed + 2 });
        P.brush(ctx, (c) => { c.beginPath(); c.moveTo(0, -r * 0.36); c.lineTo(0, -r * 0.56); c.lineTo(r * 0.04, -r * 0.52); }, '#8B8FA8', Math.max(2.5, r * 0.035), 1); break; }
      case 'bat': { const br = '#8A6248';
        P.line(ctx, -r * 0.2, -r * 0.92, -r * 0.08, -r * 0.7, br, r * 0.05, 1); P.line(ctx, r * 0.2, -r * 0.92, r * 0.08, -r * 0.7, br, r * 0.05, 1);
        P.ell(ctx, 0, -r * 0.1, r * 0.3, r * 0.62, br, { seed });
        for (const sx of [-1, 1]) P.ell(ctx, sx * r * 0.22, -r * 0.1, r * 0.2, r * 0.6, '#5C4133', { seed: seed + sx + 2, rot: sx * 0.12 });
        P.ell(ctx, 0, r * 0.6, r * 0.26, r * 0.24, br, { seed: seed + 5 });
        for (const sx of [-1, 1]) P.shape(ctx, q([[sx * 0.1, 0.78], [sx * 0.3, 1.08], [sx * 0.26, 0.7]]), '#5C4133', { poly: true, edge: 0.2 });
        if (sleep) { arc(ctx, -r * 0.1, r * 0.6, r * 0.06, Math.PI * 1.15, Math.PI * 1.85, C.ink, 3); arc(ctx, r * 0.1, r * 0.6, r * 0.06, Math.PI * 1.15, Math.PI * 1.85, C.ink, 3); } else { dot(ctx, -r * 0.1, r * 0.58, r * 0.04); dot(ctx, r * 0.1, r * 0.58, r * 0.04); }
        break; }
      case 'rat': { const col = color || '#B9B2A8';
        P.brush(ctx, P.pCurve(q([[-0.85, 0.1], [-1.2, 0.3], [-1.5, 0.1], [-1.75, 0.28]]), false), C.pink, r * 0.07, 1);
        P.ell(ctx, -0.1 * r, 0, r * 0.8, r * 0.48, col, { seed });
        P.shape(ctx, q([[0.45, -0.34], [1.18, 0.12], [0.5, 0.36]]), col, { seed: seed + 1, k: 0.6 });
        P.ell(ctx, r * 0.5, -r * 0.4, r * 0.2, r * 0.2, C.pink, { seed: seed + 2 });
        dot(ctx, r * 1.17, r * 0.12, r * 0.06, C.pink); eye(r * 0.82, -r * 0.08, r * 0.045);
        for (const lx of [-0.5, 0.3]) P.ell(ctx, lx * r, r * 0.46, r * 0.16, r * 0.07, C.pink, { seed: seed + 4 }); break; }
      default: P.ell(ctx, 0, 0, r, r, C.grey, { seed });
    }
    ctx.restore();
  };

  // ---------- film helpers ----------
  P.talk = (t) => { const s = S && S.MOUTH; if (!s) return 0; const c = s.charCodeAt(Math.round(t * 30)); return c >= 48 && c <= 57 ? (c - 48) / 9 : 0; };
  P.shot = (at, draw, o = {}) => { (globalThis.SHOTS = globalThis.SHOTS || []).push(Object.assign({ at, draw }, o)); };
  P.push = (ctx, u, cx = G.W / 2, cy = G.H / 2, amt = 0.03) => { const s = 1 + amt * ease.inOutQuad(clamp(u)); ctx.translate(cx, cy); ctx.scale(s, s); ctx.translate(-cx, -cy); };
  P.shake = (ctx, t, t0, amp = 6, dur = 0.3) => { const a = (t - t0) / dur; if (a < 0 || a > 1) return; const k = (1 - a) * amp; ctx.translate(Math.sin(t * 90) * k, Math.cos(t * 77) * k); };
  // chapter card: a painted number on a gold wash + the title brushed on; then the hook line on a paper strip
  P.chapter = (ctx, t, n, title, t0, t1) => {
    const a = clamp((t - t0) / 0.35), b = clamp((t - (t1 - 0.45)) / 0.45); if (a <= 0 || b >= 1) return;
    ctx.save(); ctx.globalAlpha *= (1 - ease.inCubic(b)); ctx.translate(0, -40 * ease.inCubic(b));
    const d = P.pop(t, t0 + 0.2, 0.4); P.at(ctx, 330, G.H / 2, d, -0.05, () => { P.ell(ctx, 0, 0, 104, 100, C.gold, { seed: 70 + n }); G.text(ctx, String(n), 0, 50, { size: 170, fam: P.FT.title, weight: 700, color: C.navy, align: 'center', boil: 0 }); });
    P.splat(ctx, 330, G.H / 2, t, t0 + 0.2, { color: C.gold, r: 190, seed: n });
    P.write(ctx, 'Chapter ' + n, 480, G.H / 2 - 74, t, t0 + 0.25, { size: 56, align: 'left', color: C.coral, dur: 0.35, fam: P.FT.hand });
    const fs = Math.min(124, 124 * (G.W - 480 - 150) / P.measure(ctx, title, 124, P.FT.title, 700));
    P.write(ctx, title, 480, G.H / 2 + fs * 0.55, t, t0 + 0.4, { size: fs, align: 'left', color: C.ink, dur: 0.75, underline: C.coral });
    ctx.restore();
  };
  P.hook = (ctx, h, t, t1) => {
    const a = clamp((t - (h.t - 0.3)) / 0.35), b = 1 - clamp((t - (t1 - 0.4)) / 0.35); const k = Math.min(ease.outCubic(a), b); if (k <= 0.01) return;
    const size = 64, maxW = 1440, sp = P.measure(ctx, ' ', size); const lines = [[]]; let x = 0;
    for (const w of h.words) { const ww = P.measure(ctx, w.w, size); if (x + ww > maxW && x > 0) { lines.push([]); x = 0; } lines[lines.length - 1].push({ ...w, x, ww }); x += ww + sp; }
    const lh = size * 1.24, Hh = lines.length * lh + 64, y0 = 690;
    ctx.save(); ctx.globalAlpha *= k; ctx.translate(0, (1 - k) * 40);
    ctx.save(); ctx.globalAlpha *= 0.16; ctx.fillStyle = '#10143A'; P.pRR(G.W / 2 - maxW / 2 - 54, y0 - 22, maxW + 120, Hh, 22)(ctx); ctx.fill(); ctx.restore();
    P.wash(ctx, P.pRR(G.W / 2 - maxW / 2 - 60, y0 - 30, maxW + 120, Hh, 22), C.navy, { bb: [G.W / 2, y0 + Hh / 2, maxW / 2], seed: 77, fillA: 0.96 });
    lines.forEach((ln, li) => { const lw = ln.length ? ln[ln.length - 1].x + ln[ln.length - 1].ww : 0; const ox = G.W / 2 - lw / 2;
      for (const w of ln) { const q = clamp((t - w.t) / 0.14); const key = /[?.!]$/.test(w.w) && li === lines.length - 1;
        G.text(ctx, w.w, ox + w.x, y0 + 44 + li * lh, { size, fam: P.FT.hand, weight: 400, color: key ? C.gold : C.cream, alpha: 0.22 + 0.78 * q, boil: 0 }); } });
    ctx.restore();
  };
  P.cardShot = (c, n, title, bg, o = {}) => P.shot(S.CH[c].t0, (ctx, t, s) => {
    P.paper(ctx, t); bg(ctx, t, s);
    const h = S.ev[c + '_hook'], up = h ? ease.inOutCubic(clamp((t - (h.t - 0.45)) / 0.5)) : 0;
    ctx.save(); ctx.translate(0, -230 * up); P.chapter(ctx, t, n, title, S.CH[c].t0 + 0.1, S.ev[c + '_cardOut']); ctx.restore();
    if (h) P.hook(ctx, h, t, S.ev[c + '_cardOut']);
  }, Object.assign({ in: { type: 'wipe', dir: 'left', dur: 0.6 } }, o));
})();
