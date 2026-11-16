// Ep08 'INK SILHOUETTE' look (PLAN.md NEW LOOKS 2026-11-15): black-violet ink figures and objects against warm gradient skies
// (dusk gold → coral → rose → violet → night), each silhouette with a thin warm rim light. Inter 800 titles, Bungee numbers,
// Patrick Hand notes. Nothing boils; stars twinkle gently; skies drift slowly. All pure functions of t.
(function () {
  const G = globalThis.G, U = globalThis.U, P = globalThis.P, S = globalThis.SCORE; const { clamp, lerp, ease } = U; const C = P.C;
  Object.assign(C, { ink: '#120E1C', ink2: '#1D1730', ink3: '#2A2244', rim: '#FFD9A8', rim2: '#FF9E7A', cream: '#FFF3DC', gold: '#FFC857', coral: '#FF7A59',
    rose: '#D9577E', violet: '#5B3A8C', night: '#0D0B22', night2: '#1A1540', sig: '#7FE3D6', sig2: '#B8F5EE', blue: '#6FA8FF', earth: '#5BA8FF' });
  P.HAND = 'Patrick Hand';
  // ---------- skies ----------
  const SKIES = {
    dusk: ['#2A1D52', '#7A3B7E', '#D9577E', '#FF8A5B', '#FFD07A'],
    gold: ['#5A2E6E', '#C24F6E', '#FF8A5B', '#FFC46B', '#FFE6A8'],
    rose: ['#1F1846', '#4E2C6E', '#A34477', '#E8707A', '#F7A985'],
    night: ['#07061A', '#0E0C2A', '#1B1544', '#33215C', '#55306E'],
    deep: ['#050414', '#09081E', '#100D2C', '#18123A', '#221848'],
    dawn: ['#1C2A5E', '#3D4C8C', '#8E6FA8', '#F09A8A', '#FFD3A0'],
    teal: ['#081A2A', '#0F2E44', '#1B4E62', '#3E8A8A', '#9CD3C0'],
  };
  P.SKIES = SKIES;
  P.sky = (ctx, t, name = 'dusk', { stars = 0, seed = 1, drift = 1, sun = null, glow = null } = {}) => {
    P.dark = true; const s = typeof name === 'string' ? SKIES[name] : name; const g = ctx.createLinearGradient(0, -100, 0, G.H + 100);
    s.forEach((c, i) => g.addColorStop(i / (s.length - 1), c)); ctx.fillStyle = g; ctx.fillRect(-600, -600, G.W + 1200, G.H + 1200);
    if (glow) P.glow(ctx, glow[0], glow[1], glow[2], glow[3] || C.gold, glow[4] == null ? 0.7 : glow[4]);
    if (stars > 0) P.stars(ctx, t, { n: stars, seed, drift });
    if (sun) P.sunDisc(ctx, sun[0], sun[1], sun[2], t, { color: sun[3] || '#FFE7B0', a: sun[4] == null ? 1 : sun[4] });
  };
  P.stars = (ctx, t, { n = 160, seed = 1, drift = 1, a = 1, y1 = G.H, big = 0.06 } = {}) => {
    ctx.save();
    for (let i = 0; i < n; i++) { const x = ((U.hash(i, seed) * (G.W + 400) + t * 4 * drift * (0.3 + U.hash(i, seed + 5))) % (G.W + 400)) - 200, y = U.hash(i, seed + 1) * y1;
      const tw = 0.55 + 0.45 * Math.sin(t * (0.8 + 1.6 * U.hash(i, seed + 2)) + i); const r = U.hash(i, seed + 3) < big ? 2.6 : 1.3 + U.hash(i, seed + 4);
      ctx.globalAlpha = a * tw * (1 - 0.7 * y / G.H); ctx.fillStyle = U.hash(i, seed + 6) < 0.15 ? '#FFE2B8' : '#FFFFFF'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); }
    ctx.restore();
  };
  P.sunDisc = (ctx, x, y, r, t, { color = '#FFE7B0', a = 1 } = {}) => { if (a <= 0.01) return; P.glow(ctx, x, y, r * 3.2, '#FFC46B', a * 0.8); P.circ(ctx, x, y, r, color, { a }); P.circ(ctx, x - r * 0.18, y - r * 0.18, r * 0.62, '#FFF8E6', { a: a * 0.5 }); };
  // layered ink hills; layer 0 is the farthest (lighter, mixed into the sky colour)
  P.hills = (ctx, t, { y = 900, layers = 3, seed = 3, drift = 0, amp = 70, tint = '#5B2E62' } = {}) => {
    for (let L = 0; L < layers; L++) { const yy = y + L * 55, col = P.mix(tint, C.ink, 0.35 + 0.65 * L / Math.max(1, layers - 1)); const off = t * drift * (6 + L * 10);
      ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-200, G.H + 300);
      for (let x = -200; x <= G.W + 200; x += 30) { const u = (x + off) * 0.004 + L * 7 + seed; const h = Math.sin(u) * amp * 0.6 + Math.sin(u * 2.3 + 1) * amp * 0.3 + Math.sin(u * 5.1) * amp * 0.1; ctx.lineTo(x, yy - h); }
      ctx.lineTo(G.W + 200, G.H + 300); ctx.closePath(); ctx.fill(); }
  };
  P.ground = (ctx, y = 940, col = C.ink) => { ctx.fillStyle = col; ctx.fillRect(-600, y, G.W + 1200, G.H + 600); };
  // ink silhouette: fill + thin rim light offset towards the light (lx, ly)
  P.sil = (ctx, path, { a = 1, rim = C.rim, rimA = 0.85, lx = -3, ly = -3, col = C.ink, lw = 3 } = {}) => {
    if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
    if (rimA > 0) { ctx.save(); ctx.translate(lx, ly); ctx.strokeStyle = rim; ctx.globalAlpha *= rimA; ctx.lineWidth = lw; ctx.lineJoin = 'round'; path(ctx); ctx.stroke(); ctx.restore(); }
    ctx.fillStyle = col; path(ctx); ctx.fill(); ctx.restore();
  };
  P.silE = (ctx, x, y, rx, ry, o = {}) => P.sil(ctx, P.pEll(x, y, rx, ry, o.rot || 0), o);
  P.silR = (ctx, x, y, w, h, r, o = {}) => P.sil(ctx, P.pRR(x, y, w, h, r), o);
  P.silP = (ctx, pts, o = {}) => P.sil(ctx, o.curve ? P.pCurve(pts, true, 0.5) : P.pPoly(pts), o);
  P.inkLine = (ctx, x0, y0, x1, y1, lw = 6, o = {}) => { const { a = 1, rim = C.rim, rimA = 0.7 } = o; if (rimA > 0) P.line(ctx, x0 - 2, y0 - 2, x1 - 2, y1 - 2, rim, lw + 2, a * rimA); P.line(ctx, x0, y0, x1, y1, o.col || C.ink, lw, a); };

  // ---------- Voyager (ink silhouette, 3/4 view). Origin = bus centre. s=1 → dish ≈ 300 px wide ----------
  P.voyager = (ctx, x, y, s, t, { rot = 0, a = 1, beam = 0, rim = C.rim, glint = true, booms = 1 } = {}) => {
    if (a <= 0.01 || s <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha *= a;
    const O = { rim, lx: -2.5, ly: -2.5, lw: 3.5 / s };
    P.glow(ctx, 0, -10, 420, rim, 0.22);
    // magnetometer boom (long, thin) up-left
    if (booms > 0) { P.inkLine(ctx, -30, -40, -30 - 520 * booms, -260 * booms, 4 / s, { rim }); for (let i = 1; i < 6; i++) { const k = i / 6 * booms; P.inkLine(ctx, -30 - 520 * k - 8, -260 * k - 6, -30 - 520 * k + 8, -260 * k + 6, 3 / s, { rim, rimA: 0.4 }); } }
    // RTG boom (down-left) with three generators
    P.inkLine(ctx, -40, 50, -260, 170, 7 / s, { rim });
    for (let i = 0; i < 3; i++) { const k = 0.45 + i * 0.22, px = lerp(-40, -260, k), py = lerp(50, 170, k); ctx.save(); ctx.translate(px, py); ctx.rotate(0.5); P.silR(ctx, -26, -18, 52, 36, 6, O); for (let f = -2; f <= 2; f++) P.line(ctx, f * 9, -24, f * 9, 24, C.ink, 3); ctx.restore(); }
    // science boom (right) with scan platform + cameras
    P.inkLine(ctx, 40, 40, 300, 150, 8 / s, { rim });
    P.silR(ctx, 270, 120, 70, 60, 8, O); P.silR(ctx, 300, 104, 60, 26, 6, O); P.silE(ctx, 336, 117, 10, 10, O);
    // bus (decagon)
    const bus = []; for (let i = 0; i < 10; i++) { const an = i / 10 * 6.283 + 0.3; bus.push([Math.cos(an) * 90, 40 + Math.sin(an) * 34]); }
    P.silP(ctx, [[-90, 40], [-90, 74], [0, 92], [90, 74], [90, 40]], O);
    P.silP(ctx, bus, O);
    // high-gain dish (seen 3/4, concave side towards the viewer-left)
    P.sil(ctx, (c) => { c.beginPath(); c.ellipse(0, -60, 150, 64, -0.08, 0, 6.283); }, O);
    ctx.save(); ctx.globalAlpha *= 0.5; ctx.strokeStyle = P.mix(rim, C.ink, 0.45); ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(-6, -58, 120, 48, -0.08, 0.2, 2.9); ctx.stroke(); ctx.restore();
    P.inkLine(ctx, 0, -60, 0, -138, 5, { rim }); P.inkLine(ctx, -60, -40, 0, -138, 3, { rim, rimA: 0.4 }); P.inkLine(ctx, 60, -40, 0, -138, 3, { rim, rimA: 0.4 }); P.silE(ctx, 0, -142, 12, 10, O);
    // golden record on the bus (the only colour on the craft)
    P.circ(ctx, -36, 52, 17, C.gold, { a: 0.95 }); P.circ(ctx, -36, 52, 6, '#B8862E');
    if (glint) { const g = 0.5 + 0.5 * Math.sin(t * 1.7); P.glow(ctx, -36, 52, 40, C.gold, 0.4 * g); }
    if (beam > 0) for (let i = 0; i < 4; i++) { const ph = ((t * 0.9 + i / 4) % 1); ctx.save(); ctx.globalAlpha *= beam * (1 - ph) * 0.9; ctx.strokeStyle = C.sig; ctx.lineWidth = 6 / s * (1 - ph * 0.5); ctx.beginPath(); ctx.arc(0, -60 + 40, 140 + ph * 260, Math.PI * 0.62, Math.PI * 1.02); ctx.stroke(); ctx.restore(); }
    ctx.restore();
  };
  // Deep Space Network 70 m dish (ink), origin = ground centre. s=1 → dish ≈ 440 px wide. tilt: dish aim angle (rad, 0 = straight up, - = left)
  P.dsn = (ctx, x, y, s, t, { tilt = -0.5, a = 1, rim = C.rim, listen = 0, col = C.ink } = {}) => {
    if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a; const O = { rim, lx: -3, ly: -3, lw: 3.5, col };
    // pedestal + alidade
    P.silP(ctx, [[-140, 0], [-90, -170], [90, -170], [140, 0]], O); P.silR(ctx, -110, -230, 220, 70, 10, O);
    for (let i = -1; i <= 1; i += 2) P.inkLine(ctx, i * 120, 0, i * 60, -170, 6, { rim, rimA: 0.3, col });
    ctx.save(); ctx.translate(0, -250); ctx.rotate(tilt);
    // dish bowl (side view, a deep crescent) + back structure
    P.silP(ctx, [[-60, 30], [60, 30], [40, -10], [-40, -10]], O);
    P.sil(ctx, (c) => { c.beginPath(); c.moveTo(-230, -40); c.quadraticCurveTo(0, 80, 230, -40); c.lineTo(214, -58); c.quadraticCurveTo(0, 40, -214, -58); c.closePath(); }, O);
    P.sil(ctx, (c) => { c.beginPath(); c.moveTo(-200, -46); c.quadraticCurveTo(0, 60, 200, -46); c.quadraticCurveTo(0, 18, -200, -46); c.closePath(); }, Object.assign({}, O, { rimA: 0.2 }));
    // quadripod + subreflector
    P.inkLine(ctx, -150, -40, 0, -230, 6, { rim, col }); P.inkLine(ctx, 150, -40, 0, -230, 6, { rim, col }); P.inkLine(ctx, 0, 10, 0, -230, 5, { rim, rimA: 0.3, col });
    P.silE(ctx, 0, -236, 30, 12, O);
    if (listen > 0) for (let i = 0; i < 3; i++) { const ph = ((t * 0.8 + i / 3) % 1); ctx.save(); ctx.globalAlpha *= listen * ph * 0.9; ctx.strokeStyle = C.sig; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, -40, 380 - ph * 300, Math.PI * 1.25, Math.PI * 1.75); ctx.stroke(); ctx.restore(); }
    ctx.restore(); ctx.restore();
  };
  // a planet silhouette with rim light; ring for Saturn
  P.planet = (ctx, x, y, r, t, { col = C.ink, rim = C.rim, ring = false, bands = null, a = 1, lit = 0 } = {}) => {
    if (a <= 0.01 || r < 1) return; ctx.save(); ctx.globalAlpha *= a;
    if (ring) { ctx.save(); ctx.strokeStyle = P.mix(rim, C.ink, 0.35); ctx.lineWidth = r * 0.14; ctx.beginPath(); ctx.ellipse(x, y, r * 2.1, r * 0.5, -0.2, Math.PI * 1.02, Math.PI * 1.98); ctx.stroke(); ctx.restore(); }
    P.glow(ctx, x - r * 0.3, y - r * 0.3, r * 2, rim, 0.25);
    P.circ(ctx, x, y, r, col);
    if (bands) { ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip(); bands.forEach((b, i) => { ctx.fillStyle = b; ctx.globalAlpha = 0.5; ctx.fillRect(x - r, y - r + (i + 0.5) * (2 * r / (bands.length + 1)), 2 * r, r * 0.12); }); ctx.restore(); }
    // crescent rim (light from upper left)
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip(); ctx.strokeStyle = rim; ctx.lineWidth = Math.max(3, r * 0.08); ctx.globalAlpha *= 0.9; ctx.beginPath(); ctx.arc(x + r * 0.06, y + r * 0.06, r, Math.PI * 0.95, Math.PI * 1.75); ctx.stroke(); ctx.restore();
    if (lit > 0) { ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip(); P.circ(ctx, x - r * 0.45, y - r * 0.45, r * 1.05, rim, { a: lit * 0.85 }); ctx.restore(); }
    if (ring) { ctx.save(); ctx.strokeStyle = P.mix(rim, C.ink, 0.25); ctx.lineWidth = r * 0.14; ctx.beginPath(); ctx.ellipse(x, y, r * 2.1, r * 0.5, -0.2, -0.04, Math.PI * 1.02); ctx.stroke(); ctx.restore(); }
    ctx.restore();
  };
  // Earth as a small glowing blue disc (the one colour that isn't ink)
  P.earth = (ctx, x, y, r, t, { a = 1 } = {}) => { if (a <= 0.01) return; P.glow(ctx, x, y, r * 4, C.earth, a * 0.6); P.circ(ctx, x, y, r, '#3D7BE0', { a }); ctx.save(); ctx.globalAlpha *= a; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip(); P.ell(ctx, x - r * 0.25, y - r * 0.1, r * 0.45, r * 0.3, '#59B36B', { a: 0.9, rot: 0.6 }); P.ell(ctx, x + r * 0.35, y + r * 0.35, r * 0.3, r * 0.2, '#59B36B', { a: 0.9 }); P.circ(ctx, x + r * 0.35, y - r * 0.35, r * 0.9, '#FFFFFF', { a: 0.12 }); ctx.restore(); };
  // signal: dots + arcs travelling along a straight path from A to B (k = head position 0..1)
  P.signal = (ctx, ax, ay, bx, by, t, { k = 1, color = C.sig, a = 1, speed = 1, dash = 26, lw = 5 } = {}) => {
    if (a <= 0.01 || k <= 0) return; const ex = lerp(ax, bx, k), ey = lerp(ay, by, k); const L = Math.hypot(ex - ax, ey - ay); const ang = Math.atan2(by - ay, bx - ax);
    ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.setLineDash([2, dash]); ctx.lineDashOffset = -t * 120 * speed; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.setLineDash([]); ctx.translate(ex, ey); ctx.rotate(ang); for (let i = 0; i < 3; i++) { ctx.globalAlpha = a * (1 - i * 0.28); ctx.beginPath(); ctx.arc(-i * 16, 0, 14 + i * 6, -0.7, 0.7); ctx.stroke(); }
    ctx.restore(); if (L > 0) P.glow(ctx, ex, ey, 60, color, a * 0.8);
  };
  // a silhouette person (faceless), origin = feet. pose: stand | point | wave | hold | sit | flash
  P.person = (ctx, x, y, s, t, { pose = 'stand', seed = 0, a = 1, rim = C.rim, dir = 1, hair = 0, hold = null } = {}) => {
    if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s); ctx.globalAlpha *= a; const O = { rim, lx: -3, ly: -3, lw: 3 };
    const br = Math.sin(t * 1.6 + seed) * 2; const h = 1 + 0.08 * (U.hash(seed, 9) - 0.5);
    ctx.save(); ctx.scale(1, h);
    P.silP(ctx, [[-30, 0], [-22, -110], [-34, -200], [34, -200], [22, -110], [30, 0], [8, 0], [0, -100], [-8, 0]], O);
    P.silE(ctx, 0, -236 + br * 0.3, 30, 34, O);
    if (hair === 1) P.silE(ctx, 0, -252, 34, 22, O); if (hair === 2) P.silE(ctx, 22, -230, 16, 28, O);
    const arm = (sx, sy, hx, hy) => { const mx = (sx + hx) / 2 + 10, my = (sy + hy) / 2 + 12; ctx.save(); ctx.translate(-2, -2); ctx.strokeStyle = rim; ctx.globalAlpha *= 0.6; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(mx, my, hx, hy); ctx.stroke(); ctx.restore(); ctx.strokeStyle = C.ink; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(mx, my, hx, hy); ctx.stroke(); };
    let hn = [24, -96], hf = [-26, -96]; const w = Math.sin(t * 8 + seed) * 16;
    if (pose === 'point') hn = [110, -200]; else if (pose === 'wave') hn = [60 + w, -300]; else if (pose === 'hold') { hn = [50, -150]; hf = [-10, -150]; } else if (pose === 'flash') hn = [54, -300 + w * 0.2]; else if (pose === 'up') { hn = [40, -320]; hf = [-40, -320]; }
    arm(-26, -192, hf[0], hf[1]); arm(26, -192, hn[0], hn[1]);
    if (pose === 'flash') { const on = hold == null ? 1 : hold; P.silR(ctx, hn[0] - 8, hn[1] - 30, 16, 36, 4, O); if (on > 0) { P.glow(ctx, hn[0], hn[1] - 34, 120, '#FFF6D0', on); ctx.save(); ctx.globalAlpha *= on * 0.35; ctx.fillStyle = '#FFF6D0'; ctx.beginPath(); ctx.moveTo(hn[0] - 6, hn[1] - 32); ctx.lineTo(hn[0] - 120, hn[1] - 900); ctx.lineTo(hn[0] + 80, hn[1] - 900); ctx.closePath(); ctx.fill(); ctx.restore(); } }
    ctx.restore(); ctx.restore();
  };

  // ---------- Echo: the guide. A small ink creature with a radio-dish head, two glowing eyes and a glowing mouth ----------
  // gestures: idle | point | pointUp | wave | cheer | shrug | think | listen | hold | sad. Origin = feet. Height ≈ 330 px at s = 1. dir 1 faces right.
  Ch.echo = (ctx, o = {}) => {
    const { x = 0, y = 0, s = 1, t = 0, dir = 1, gesture = 'idle', mouth = 0, eyes = 'open', look = 0, a = 1, rot = 0, hop = 0, rim = C.rim, glowCol = C.sig } = o;
    if (a <= 0.01 || s <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a;
    ctx.save(); ctx.globalAlpha *= 0.3; ctx.fillStyle = '#000'; ctx.beginPath(); ctx.ellipse(0, 4 * s, 60 * s, 10 * s, 0, 0, 7); ctx.fill(); ctx.restore();
    ctx.scale(s * dir, s); ctx.rotate(rot); const by = -Math.abs(Math.sin(hop * Math.PI)) * 60 + Math.sin(t * 2.2) * 2.5; ctx.translate(0, by);
    const O = { rim, lx: -3, ly: -3, lw: 3.5 };
    // legs
    const st = Math.sin(t * 2.2) * 2; P.inkLine(ctx, -18, -70, -24, -4, 13, { rim }); P.inkLine(ctx, 18, -70, 24, -4, 13, { rim }); P.silE(ctx, -28, -4, 20, 8, O); P.silE(ctx, 28, -4, 20, 8, O);
    // body (rounded bean)
    P.silP(ctx, [[-50, -70], [-56, -130], [-34, -175], [34, -175], [56, -130], [50, -70], [0, -56]], Object.assign({ curve: true }, O));
    // arms
    let hn = [62, -112], hf = [-62, -112]; const sw = Math.sin(t * 3) * 5;
    switch (gesture) {
      case 'point': hn = [140, -170 + sw * 0.4]; break; case 'pointUp': hn = [80, -270 + sw * 0.3]; break;
      case 'wave': hn = [84 + Math.sin(t * 10) * 18, -250]; break; case 'cheer': hn = [74, -270 + Math.sin(t * 9) * 10]; hf = [-74, -270 + Math.sin(t * 9 + 1) * 10]; break;
      case 'shrug': hn = [104, -168]; hf = [-104, -168]; break; case 'think': hn = [28, -196]; break; case 'listen': hn = [70, -232]; break;
      case 'hold': hn = [86, -150]; hf = [-86, -150]; break; case 'sad': hn = [44, -84]; hf = [-44, -84]; break;
    }
    const arm = (sx, sy, hx, hy) => { const mx = (sx + hx) / 2 + (hx > sx ? 6 : -6), my = (sy + hy) / 2 + 14; ctx.save(); ctx.translate(-2.5, -2.5); ctx.strokeStyle = rim; ctx.globalAlpha *= 0.7; ctx.lineWidth = 15; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(mx, my, hx, hy); ctx.stroke(); ctx.restore(); ctx.strokeStyle = C.ink; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(mx, my, hx, hy); ctx.stroke(); P.circ(ctx, hx, hy, 10, C.ink); };
    arm(-40, -150, hf[0], hf[1]); arm(40, -150, hn[0], hn[1]);
    // neck + dish head (dish face toward viewer, tilting a little)
    P.inkLine(ctx, 0, -172, 0, -196, 12, { rim });
    ctx.save(); ctx.translate(0, -250); const tilt = gesture === 'think' ? -0.12 : gesture === 'shrug' ? 0.1 : gesture === 'listen' ? -0.18 : Math.sin(t * 1.3) * 0.05; ctx.rotate(tilt);
    P.sil(ctx, (c) => { c.beginPath(); c.ellipse(0, 0, 88, 76, 0, 0, 6.283); }, O);
    ctx.save(); ctx.globalAlpha *= 0.55; ctx.strokeStyle = P.mix(rim, C.ink, 0.5); ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(0, 2, 70, 58, 0, 0, 6.283); ctx.stroke(); ctx.restore();
    // feed horn sticking out of the dish centre, with a blinking tip
    P.inkLine(ctx, 26, -40, 52, -112, 7, { rim }); P.inkLine(ctx, -26, -40, 52, -112, 5, { rim, rimA: 0.4 }); const bl = 0.55 + 0.45 * Math.sin(t * 3.4);
    P.glow(ctx, 52, -116, 34, glowCol, bl); P.circ(ctx, 52, -116, 9, glowCol);
    // eyes (blink every ~3.9 s)
    const bph = (t + 1.1) % 3.9; const blink = bph < 0.13 ? Math.sin((bph / 0.13) * Math.PI) : 0; const lx = clamp(look, -1, 1) * 9;
    for (const ex of [-28, 22]) {
      if (eyes === 'happy') { P.stroke(ctx, (c) => { c.beginPath(); c.arc(ex + lx, 2, 13, Math.PI * 1.1, Math.PI * 1.9); }, C.cream, 7); continue; }
      if (eyes === 'sad') { P.stroke(ctx, (c) => { c.beginPath(); c.arc(ex + lx, -8, 12, Math.PI * 0.15, Math.PI * 0.85); }, C.cream, 6); continue; }
      const eh = (eyes === 'wide' ? 21 : 15) * (1 - blink * 0.92); P.glow(ctx, ex + lx, -4, 28, C.cream, 0.35);
      P.ell(ctx, ex + lx, -4, eyes === 'wide' ? 13 : 10, Math.max(1.5, eh), C.cream); P.circ(ctx, ex + lx + 3, -9, 3, '#FFFFFF', { a: 1 - blink });
    }
    const mo = clamp(mouth); if (mo > 0.08) { P.ell(ctx, -3 + lx * 0.5, 34, 13 + mo * 4, 3 + mo * 11, C.coral); } else P.stroke(ctx, (c) => { c.beginPath(); c.arc(-3 + lx * 0.5, 22, 14, Math.PI * 0.2, Math.PI * 0.8); }, C.coral, 5);
    ctx.restore(); ctx.restore();
  };
  globalThis.CAST = [{ name: 'Echo', draw: (ctx, o) => Ch.echo(ctx, o) }];

  // ---------- titles, cards, hooks ----------
  P.big = (ctx, s, x, y, t, t0, { size = 110, color = C.cream, t1 = 1e9, align = 'center', fam = 'Inter', weight = 800, stroke = null } = {}) => { const k = P.oc((t - t0) / 0.35) * P.fout(t, t1, 0.3); if (k <= 0.01) return; G.text(ctx, s, x, y + (1 - k) * 30, { size, fam, weight: fam === 'Bungee' ? 400 : weight, color, align, alpha: k, boil: 0, stroke, strokeW: 10 }); };
  P.inkCount = (ctx, o) => P.counter(ctx, Object.assign({ card: false, color: C.cream, subColor: C.gold }, o));
  P.chapterInk = (ctx, t, n, title, t0, t1) => {
    const a = P.win(t, t0, t1, 0.3); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a;
    const k = P.oc((t - t0) / 0.6);
    G.text(ctx, String(n).padStart(2, '0'), 960, 500 + (1 - k) * 60, { size: 250, fam: 'Bungee', weight: 400, color: 'rgba(255,243,220,0.0)', align: 'center', boil: 0, stroke: C.cream, strokeW: 5, alpha: 0.85 * k });
    P.write(ctx, 'CHAPTER ' + n, 960, 215, t, t0 + 0.15, { size: 40, color: C.gold, weight: 800 });
    const fs = Math.min(110, 110 * 1500 / P.measure(ctx, title, 110, 'Inter', 800));
    P.write(ctx, title, 960, 650, t, t0 + 0.3, { size: fs, color: C.cream, weight: 800, stag: 0.08 });
    ctx.restore();
  };
  P.hookInk = (ctx, h, t, t1) => {
    const a = clamp((t - (h.t - 0.3)) / 0.35), b = 1 - clamp((t - (t1 - 0.4)) / 0.35); const k = Math.min(ease.outCubic(a), b); if (k <= 0.01) return;
    const size = 56, maxW = 1440, sp = P.measure(ctx, ' ', size, 'Inter', 700); const lines = [[]]; let x = 0;
    for (const w of h.words) { const ww = P.measure(ctx, w.w, size, 'Inter', 700); if (x + ww > maxW && x > 0) { lines.push([]); x = 0; } lines[lines.length - 1].push({ ...w, x, ww }); x += ww + sp; }
    const lh = size * 1.3, Hh = lines.length * lh + 56, y0 = 760;
    ctx.save(); ctx.globalAlpha *= k; ctx.translate(0, (1 - k) * 40);
    P.rect(ctx, G.W / 2 - maxW / 2 - 60, y0 - 30, maxW + 120, Hh, 22, C.cream, { shadow: 0.3, sy: 8 });
    P.rect(ctx, G.W / 2 - maxW / 2 - 60, y0 - 30, 16, Hh, 8, C.coral);
    lines.forEach((ln, li) => { const lw = ln.length ? ln[ln.length - 1].x + ln[ln.length - 1].ww : 0; const ox = G.W / 2 - lw / 2;
      for (const w of ln) { const q = clamp((t - w.t) / 0.14); G.text(ctx, w.w, ox + w.x, y0 + 40 + li * lh, { size, fam: 'Inter', weight: 700, color: C.ink, alpha: 0.2 + 0.8 * q, boil: 0 }); } });
    ctx.restore();
  };
  // chapter card shot: sky + optional bg drawing + big chapter number, title, then the hook strip slides in and the title lifts
  P.cardShot = (c, n, title, sky, bg, o = {}) => P.shot(S.CH[c].t0, (ctx, t, s) => {
    P.sky(ctx, t, sky, { stars: sky === 'night' || sky === 'deep' ? 140 : 40, seed: n * 7 }); bg(ctx, t, s);
    const h = S.ev[c + '_hook'], up = h ? ease.inOutCubic(clamp((t - (h.t - 0.45)) / 0.5)) : 0;
    ctx.save(); ctx.translate(0, -125 * up); P.chapterInk(ctx, t, n, title, S.CH[c].t0 + 0.1, S.ev[c + '_cardOut']); ctx.restore();
    if (h) P.hookInk(ctx, h, t, S.ev[c + '_cardOut']);
  }, Object.assign({ in: { type: 'wipe', dir: 'left', dur: 0.6 } }, o));
  // progress counter: a tiny route Earth → Voyager at the bottom-left; the craft moves one step per chapter
  P.progress = (ctx, t, n, a = 1) => {
    if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a * 0.9; const x0 = 70, y = G.H - 46, w = 300;
    P.line(ctx, x0, y, x0 + w, y, 'rgba(255,243,220,0.35)', 3, 1, 1, [3, 9]);
    for (let i = 0; i <= 6; i++) P.circ(ctx, x0 + w * i / 6, y, i <= n ? 5 : 3, i <= n ? C.gold : 'rgba(255,243,220,0.45)');
    P.earth(ctx, x0 - 18, y, 9, t, { a: 1 });
    const k = clamp(n / 6); P.voyager(ctx, x0 + w * k + 4, y - 4, 0.07, t, { glint: false, booms: 0.6 });
    G.text(ctx, n > 0 ? 'CH ' + n + ' / 6' : 'START', x0 + w + 26, y + 9, { size: 24, fam: 'Inter', weight: 800, color: C.cream, alpha: 0.85, boil: 0 });
    ctx.restore();
  };
  // a source line, bottom-right (cream on any sky)
  P.source = (ctx, s, t, t0, { t1 = 1e9 } = {}) => { const a = P.win(t, t0, t1, 0.4); if (a <= 0) return; G.text(ctx, 'Source: ' + s, G.W - 60, G.H - 36, { size: 24, fam: 'Inter', weight: 700, color: C.cream, alpha: a * 0.75, align: 'right', boil: 0 }); };
  P.note = (ctx, s, x, y, t, t0, { t1 = 1e9, color = C.gold, size = 46, align = 'center', a = 1, rot = -0.02 } = {}) => { const k = P.oc((t - t0) / 0.4) * P.fout(t, t1, 0.3) * a; if (k <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); G.text(ctx, s, 0, 0, { size, fam: P.HAND, weight: 400, color, align, alpha: k, boil: 0 }); ctx.restore(); };
  // a dimension line with a label (distance callouts)
  P.dimLine = (ctx, x0, y0, x1, y1, label, k = 1, { color = C.gold, size = 36, a = 1 } = {}) => {
    if (k <= 0.01 || a <= 0) return; ctx.save(); ctx.globalAlpha *= a; const xm = lerp(x0, x1, k), ym = lerp(y0, y1, k); const ang = Math.atan2(y1 - y0, x1 - x0), nx = -Math.sin(ang) * 16, ny = Math.cos(ang) * 16;
    P.line(ctx, x0, y0, xm, ym, color, 3.5); P.line(ctx, x0 - nx, y0 - ny, x0 + nx, y0 + ny, color, 3.5); if (k > 0.98) P.line(ctx, x1 - nx, y1 - ny, x1 + nx, y1 + ny, color, 3.5);
    if (label && k > 0.6) { const w = P.measure(ctx, label, size, 'Inter', 800) + 30; const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2; P.rect(ctx, cx - w / 2, cy - size * 0.75, w, size * 1.5, 10, C.ink, { a: clamp((k - 0.6) / 0.3) }); G.text(ctx, label, cx, cy + size * 0.36, { size, fam: 'Inter', weight: 800, color, align: 'center', boil: 0, alpha: clamp((k - 0.6) / 0.3) }); }
    ctx.restore();
  };
  P.cross = (ctx, x0, y0, x1, y1, k, { color = C.coral, lw = 12 } = {}) => { if (k <= 0) return; P.line(ctx, x0, y0, x1, y1, color, lw, 1, ease.outCubic(clamp(k * 2))); P.line(ctx, x1, y0, x0, y1, color, lw, 1, ease.outCubic(clamp(k * 2 - 1))); };
  // a hand-drawn circle around something (draws itself on, k 0→1)
  P.circle = (ctx, x, y, rx, ry, k, { color = C.gold, lw = 6 } = {}) => { if (k <= 0) return; const pts = []; for (let i = 0; i <= 60; i++) { const a = -1.2 + (i / 60) * 6.9; const r = 1 + 0.04 * Math.sin(i * 0.9); pts.push([x + Math.cos(a) * rx * r, y + Math.sin(a) * ry * r]); } P.trace(ctx, pts, k, color, lw); };
  // Whyverse ringed planet (brand)
  P.brandPlanet = (ctx, x, y, r, t, a = 1) => { if (r < 1 || a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = C.gold; ctx.lineWidth = r * 0.12; ctx.beginPath(); ctx.ellipse(x, y, r * 1.8, r * 0.45, -0.3, Math.PI, Math.PI * 2); ctx.stroke();
    const g = ctx.createLinearGradient(x - r, y - r, x + r, y + r); g.addColorStop(0, '#6FA8FF'); g.addColorStop(1, '#3B5BDB'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x, y, r * 1.8, r * 0.45, -0.3, 0, Math.PI); ctx.stroke(); ctx.restore(); };
})();
