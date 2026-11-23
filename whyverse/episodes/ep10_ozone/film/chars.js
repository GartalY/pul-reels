// Ch.ozzy — the episode's guide: "Ozzy", an ozone molecule (O3) drawn in line art: a bent chain of three atoms, the middle one has the face.
// Lip-syncs (mouth = P.talk), blinks, looks; gestures: idle | point | pointUp | cheer | shrug | think | wave | hold | worried.
// Origin = under the molecule (hover point). Height ≈ 300 px at s = 1. dir 1 faces right.
// P.person — a faceless line-art mannequin (people stay faceless; real photos could not be fetched from this run).
(function () {
  const G = globalThis.G, U = globalThis.U, Ch = globalThis.Ch, P = globalThis.P; const C = P.C; const { clamp, lerp } = U;
  const limb = (ctx, sx, sy, hx, hy, lw, col) => { const mx = (sx + hx) / 2, my = (sy + hy) / 2 + 14; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(mx, my, hx, hy); ctx.stroke(); };
  Ch.ozzy = (ctx, o = {}) => {
    const { x = 0, y = 0, s = 1, t = 0, dir = 1, gesture = 'idle', mouth = 0, eyes = 'open', look = 0, a = 1, bob = 1, k = 1, sweat = 0, split = 0 } = o;
    if (a <= 0.01 || s <= 0.01) return; const INK = C.ink, FILL = C.pap;
    ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a;
    ctx.save(); ctx.globalAlpha *= 0.12; ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(0, 0, 90 * s, 12 * s, 0, 0, 7); ctx.fill(); ctx.restore();
    ctx.scale(s * dir, s); const hv = Math.sin(t * 2.2) * 8 * bob; ctx.translate(0, -60 + hv);
    const wig = Math.sin(t * 1.7) * 0.05;
    // side atoms (bent molecule, ~117°) — the right one can drift away (split = 0..1) when chlorine attacks
    const L = [-118, 36 + Math.sin(t * 2.6) * 3], R = [118 + split * 260, 36 + Math.cos(t * 2.4) * 3 - split * 60];
    ctx.lineCap = 'round';
    // bonds (double lines)
    for (const [px, py, gone] of [[L[0], L[1], 0], [R[0], R[1], split]]) { if (gone > 0.15) continue; ctx.strokeStyle = INK; ctx.lineWidth = 5; const ang = Math.atan2(py + 120, px); const nx = -Math.sin(ang) * 7, ny = Math.cos(ang) * 7;
      for (const sgn of [-1, 1]) { ctx.beginPath(); ctx.moveTo(Math.cos(ang) * 92 + nx * sgn, -120 + Math.sin(ang) * 92 + ny * sgn); ctx.lineTo(px - Math.cos(ang) * 58 + nx * sgn, py - Math.sin(ang) * 58 + ny * sgn); ctx.stroke(); } }
    for (const [px, py] of [L, R]) { ctx.fillStyle = FILL; ctx.beginPath(); ctx.arc(px, py, 58, 0, 7); ctx.fill(); P.art(ctx, [P.circPts(px, py, 58, 40)], k, { lw: 5, color: INK });
      G.text(ctx, 'O', px, py + 18, { size: 50, fam: 'Inter', weight: 800, color: C.ink2, align: 'center', boil: 0, alpha: clamp(k * 2 - 1) }); }
    // gestures → hand targets (relative to body centre 0,-120)
    let hn = [120, -150], hf = [-120, -150]; const sw = Math.sin(t * 3) * 6;
    switch (gesture) {
      case 'point': hn = [210, -190 + sw * 0.4]; break;
      case 'pointUp': hn = [130, -300 + sw * 0.3]; break;
      case 'cheer': hn = [120, -300 + Math.sin(t * 9) * 10]; hf = [-120, -300 + Math.sin(t * 9 + 1) * 10]; break;
      case 'shrug': hn = [160, -200]; hf = [-160, -200]; break;
      case 'think': hn = [40, -60]; break;
      case 'wave': hn = [150 + Math.sin(t * 10) * 20, -290]; break;
      case 'hold': hn = [150, -150]; hf = [-150, -150]; break;
      case 'worried': hn = [60, -210]; hf = [-60, -210]; break;
    }
    if (k > 0.6) { limb(ctx, -80, -130, hf[0], hf[1], 5, INK); ctx.fillStyle = FILL; ctx.beginPath(); ctx.arc(hf[0], hf[1], 11, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke(); }
    // centre atom = face
    ctx.save(); ctx.translate(0, -120); ctx.rotate(wig + (gesture === 'think' ? -0.08 : gesture === 'shrug' ? 0.07 : 0));
    ctx.fillStyle = FILL; ctx.beginPath(); ctx.arc(0, 0, 92, 0, 7); ctx.fill(); P.art(ctx, [P.circPts(0, 0, 92, 60)], k, { lw: 6, color: INK });
    const fa = clamp(k * 2 - 1); ctx.globalAlpha *= fa;
    // cheeks
    ctx.fillStyle = C.accW2; ctx.beginPath(); ctx.ellipse(-52, 22, 16, 10, 0, 0, 7); ctx.ellipse(52, 22, 16, 10, 0, 0, 7); ctx.fill();
    // eyes (blink every ~3.9 s)
    const bph = (t + 0.4) % 3.9; const blink = bph < 0.13 ? Math.sin((bph / 0.13) * Math.PI) : 0; const lx = clamp(look, -1, 1) * 9;
    for (const ex of [-30, 30]) {
      if (eyes === 'happy') { P.stroke(ctx, (c) => { c.beginPath(); c.arc(ex + lx, -10, 13, Math.PI * 1.1, Math.PI * 1.9); }, INK, 6); continue; }
      const er = eyes === 'wide' ? 15 : 11; const eh = er * (1 - blink * 0.9);
      ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(ex + lx, -14, er * 0.85, Math.max(1.5, eh * 1.15), 0, 0, 7); ctx.fill();
      if (blink < 0.5) { ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(ex + lx + 3.5, -19, 3.4, 0, 7); ctx.fill(); }
    }
    if (eyes === 'worried' || gesture === 'worried') { P.line(ctx, -46, -44, -16, -36, INK, 5); P.line(ctx, 46, -44, 16, -36, INK, 5); }
    // mouth
    const mo = clamp(mouth); if (mo > 0.08) { ctx.fillStyle = INK; ctx.beginPath(); ctx.ellipse(0, 30, 16 + mo * 4, 4 + mo * 14, 0, 0, 7); ctx.fill(); ctx.fillStyle = C.acc; ctx.beginPath(); ctx.ellipse(0, 34 + mo * 6, 9 + mo * 2, 2 + mo * 5, 0, 0, 7); ctx.fill(); }
    else { P.stroke(ctx, (c) => { c.beginPath(); c.arc(0, 18, 18, Math.PI * 0.2, Math.PI * 0.8); }, INK, 5); }
    if (sweat > 0.01) { ctx.globalAlpha *= sweat; ctx.fillStyle = '#9CC6E8'; ctx.beginPath(); ctx.moveTo(70, -50); ctx.quadraticCurveTo(80, -28, 70, -22); ctx.quadraticCurveTo(60, -28, 70, -50); ctx.fill(); }
    ctx.restore();
    if (k > 0.6) { limb(ctx, 80, -130, hn[0], hn[1], 5, INK); ctx.fillStyle = FILL; ctx.beginPath(); ctx.arc(hn[0], hn[1], 11, 0, 7); ctx.fill(); ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.stroke(); }
    ctx.restore();
  };

  // faceless mannequin in line art. pose: stand | walk | arms | raise | sit; prop: null | 'paper' | 'gavel' | 'clip' | 'mic' | 'pen'
  P.person = (ctx, x, y, s, t, { pose = 'stand', prop = null, color = null, fill = C.pap, a = 1, k = 1, lw = 4.5, dir = 1, seed = 0, name = '', sub = '', hair = 0 } = {}) => {
    if (a <= 0.01 || k <= 0.01) return; const col = color || P.fg(); ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a * clamp(k * 1.4);
    ctx.save(); ctx.scale(s * dir, s);
    const sway = Math.sin(t * 1.6 + seed) * 2; const wk = pose === 'walk' ? Math.sin(t * 6 + seed) : 0;
    ctx.strokeStyle = col; ctx.lineWidth = lw / s; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.fillStyle = fill;
    if (pose !== 'sit') { ctx.beginPath(); ctx.moveTo(-10, -92); ctx.lineTo(-14 + wk * 18, 0); ctx.moveTo(10, -92); ctx.lineTo(14 - wk * 18, 0); ctx.stroke(); }
    else { ctx.beginPath(); ctx.moveTo(-10, -92); ctx.lineTo(30, -92); ctx.lineTo(30, -10); ctx.moveTo(10, -92); ctx.lineTo(46, -90); ctx.lineTo(46, -10); ctx.stroke(); }
    ctx.beginPath(); ctx.moveTo(-26, -190); ctx.quadraticCurveTo(-30, -130, -20, -92); ctx.lineTo(20, -92); ctx.quadraticCurveTo(30, -130, 26, -190); ctx.quadraticCurveTo(0, -200 + sway, -26, -190); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); let hx = 34, hy = -96;
    if (pose === 'raise') { ctx.moveTo(24, -184); ctx.lineTo(44, -240); ctx.lineTo(48 + sway, -286); hx = 48 + sway; hy = -286; ctx.moveTo(-24, -184); ctx.lineTo(-36, -130); ctx.lineTo(-34, -96); }
    else if (pose === 'arms') { ctx.moveTo(24, -184); ctx.lineTo(56, -150); ctx.lineTo(70, -110); hx = 70; hy = -110; ctx.moveTo(-24, -184); ctx.lineTo(-56, -150); ctx.lineTo(-70, -110); }
    else if (pose === 'point') { ctx.moveTo(24, -184); ctx.lineTo(80, -186); ctx.lineTo(130, -196 + sway); hx = 130; hy = -196; ctx.moveTo(-24, -184); ctx.lineTo(-36, -130); ctx.lineTo(-34, -96); }
    else if (pose === 'hold') { ctx.moveTo(24, -184); ctx.lineTo(50, -140); ctx.lineTo(80, -150 + sway); hx = 80; hy = -150; ctx.moveTo(-24, -184); ctx.lineTo(-34, -140); ctx.lineTo(-10, -150); }
    else { ctx.moveTo(24, -184); ctx.lineTo(36 - wk * 12, -130); ctx.lineTo(34 - wk * 16, -96); hx = 34 - wk * 16; ctx.moveTo(-24, -184); ctx.lineTo(-36 + wk * 12, -130); ctx.lineTo(-34 + wk * 16, -96); }
    ctx.stroke();
    ctx.beginPath(); ctx.ellipse(0, -226 + sway * 0.4, 24, 28, 0, 0, 7); ctx.fill(); ctx.stroke();
    if (hair === 1) { ctx.beginPath(); ctx.moveTo(-24, -232); ctx.quadraticCurveTo(-10, -262, 24, -236); ctx.stroke(); }
    if (hair === 2) { ctx.beginPath(); ctx.ellipse(0, -238, 26, 20, 0, Math.PI, 0); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-26, -236); ctx.lineTo(-30, -200); ctx.moveTo(26, -236); ctx.lineTo(30, -200); ctx.stroke(); }
    if (prop === 'paper') { ctx.fillStyle = C.pap; ctx.fillRect(hx - 4, hy - 46, 40, 52); ctx.strokeRect(hx - 4, hy - 46, 40, 52); ctx.beginPath(); for (let i = 0; i < 3; i++) { ctx.moveTo(hx + 4, hy - 34 + i * 12); ctx.lineTo(hx + 28, hy - 34 + i * 12); } ctx.stroke(); }
    if (prop === 'gavel') { ctx.save(); ctx.translate(hx, hy); ctx.rotate(-0.5); ctx.strokeRect(-6, -60, 12, 60); ctx.fillStyle = C.pap; ctx.fillRect(-28, -84, 56, 26); ctx.strokeRect(-28, -84, 56, 26); ctx.restore(); }
    if (prop === 'clip') { ctx.fillStyle = C.pap; ctx.fillRect(hx - 6, hy - 60, 46, 62); ctx.strokeRect(hx - 6, hy - 60, 46, 62); ctx.beginPath(); ctx.moveTo(hx + 6, hy - 40); ctx.lineTo(hx + 18, hy - 30); ctx.lineTo(hx + 34, hy - 50); ctx.stroke(); }
    if (prop === 'pen') { ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + 30, hy - 30); ctx.stroke(); }
    ctx.restore();
    if (name) { const nk = clamp(k * 1.5 - 0.3); const w = P.measure(ctx, name, 30, 'Inter', 800) + 36;
      ctx.save(); ctx.globalAlpha *= nk; ctx.fillStyle = C.pap; ctx.fillRect(-w / 2, 26, w, 48); ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.strokeRect(-w / 2, 26, w, 48); ctx.fillStyle = C.acc; ctx.fillRect(-w / 2, 26, 8, 48);
      G.text(ctx, name, 4, 60, { size: 30, fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0 });
      if (sub) G.text(ctx, sub, 0, 108, { size: 30, fam: P.HAND, color: C.acc, align: 'center', boil: 0 });
      ctx.restore(); }
    ctx.restore();
  };
})();
