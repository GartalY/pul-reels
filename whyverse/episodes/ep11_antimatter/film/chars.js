// Ch.twin — the episode's guides, printed in riso inks: ELLE the electron (blue, "−", the narrator; lip-syncs) and her mirror twin
// POSI the positron (fluorescent pink, "+"). Round bodies with halftone shading, paper-white eyes, ink arms.
// kind: 'e' (Elle) | 'p' (Posi). gestures: idle | point | pointUp | cheer | shrug | think | wave | hold | worried | reach
// Origin = floor shadow under the hovering body. Height ≈ 300 px at s = 1. dir 1 faces right.
// P.person — a faceless figure in two inks with a name plate (real photos could not be fetched from this run's network).
(function () {
  const G = globalThis.G, U = globalThis.U, Ch = globalThis.Ch, P = globalThis.P; const C = P.C; const { clamp, lerp } = U;
  const limb = (ctx, sx, sy, hx, hy, lw, col) => { const mx = (sx + hx) / 2, my = (sy + hy) / 2 + 14; ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(mx, my, hx, hy); ctx.stroke(); };
  Ch.twin = (ctx, o = {}) => {
    const { kind = 'e', x = 0, y = 0, s = 1, t = 0, dir = 1, gesture = 'idle', mouth = 0, eyes = 'open', look = 0, a = 1, bob = 1, k = 1, sweat = 0, squash = 0 } = o;
    if (a <= 0.01 || s <= 0.01 || k <= 0.01) return; const anti = kind === 'p'; const BODY = anti ? C.acc : C.ink; const LINE = anti ? '#C2185B' : C.navy;
    const ph = anti ? 1.3 : 0;
    ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a;
    ctx.save(); ctx.globalAlpha *= 0.16; ctx.fillStyle = C.ink; ctx.beginPath(); ctx.ellipse(0, 0, 116 * s, 15 * s, 0, 0, 7); ctx.fill(); ctx.restore();
    const kk = U.ease.outBack(clamp(k), 1.8);
    ctx.scale(1.45 * s * dir * kk, 1.45 * s * kk); const hv = Math.sin(t * 2.3 + ph) * 9 * bob; ctx.translate(0, -150 + hv);
    const sq = 1 + 0.06 * Math.sin(t * 4.6 + ph) * bob + squash; ctx.scale(1 / Math.sqrt(sq), sq);
    // gestures → hand targets (relative to body centre)
    let hn = [118, 40], hf = [-118, 40]; const sw = Math.sin(t * 3 + ph) * 6;
    switch (gesture) {
      case 'point': hn = [200, -20 + sw * 0.4]; break;
      case 'pointUp': hn = [120, -170 + sw * 0.3]; break;
      case 'cheer': hn = [110, -170 + Math.sin(t * 9) * 10]; hf = [-110, -170 + Math.sin(t * 9 + 1) * 10]; break;
      case 'shrug': hn = [150, -40]; hf = [-150, -40]; break;
      case 'think': hn = [40, 70]; break;
      case 'wave': hn = [140 + Math.sin(t * 10) * 20, -160]; break;
      case 'hold': hn = [150, 10]; hf = [-150, 10]; break;
      case 'worried': hn = [60, -90]; hf = [-60, -90]; break;
      case 'reach': hn = [210, -10 + sw * 0.3]; hf = [-100, 60]; break;
    }
    limb(ctx, -76, 20, hf[0], hf[1], 7, LINE); P.iCirc(ctx, hf[0], hf[1], 13, BODY);
    // body
    P.iCirc(ctx, 0, 0, 100, BODY, { shade: 0.8, sp: 13 });
    ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 100, 0, 7); ctx.clip(); P.iEll(ctx, -36, -46, 34, 20, 'rgba(255,255,255,0.28)', { rot: -0.5 }); ctx.restore();
    // charge badge on the belly
    ctx.save(); ctx.globalAlpha *= 0.9; ctx.strokeStyle = C.pap; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-20, 66); ctx.lineTo(20, 66); if (anti) { ctx.moveTo(0, 46); ctx.lineTo(0, 86); } ctx.stroke(); ctx.restore();
    // face
    const bph = (t + 0.4 + ph) % 4.1; const blink = bph < 0.13 ? Math.sin((bph / 0.13) * Math.PI) : 0; const lx = clamp(look, -1, 1) * 9;
    for (const ex of [-32, 32]) {
      if (eyes === 'happy') { P.stroke(ctx, (c) => { c.beginPath(); c.arc(ex + lx, -10, 14, Math.PI * 1.1, Math.PI * 1.9); }, C.pap, 7); continue; }
      const er = eyes === 'wide' ? 22 : 18; const eh = er * (1 - blink * 0.92);
      ctx.fillStyle = C.pap; ctx.beginPath(); ctx.ellipse(ex, -14, er, Math.max(1.5, eh * 1.1), 0, 0, 7); ctx.fill();
      if (blink < 0.6) { ctx.fillStyle = C.navy; ctx.beginPath(); ctx.arc(ex + lx, -12, eyes === 'wide' ? 8 : 9, 0, 7); ctx.fill(); }
    }
    if (eyes === 'worried' || gesture === 'worried') { P.line(ctx, -52, -50, -18, -40, C.pap, 6); P.line(ctx, 52, -50, 18, -40, C.pap, 6); }
    const mo = clamp(mouth); if (mo > 0.08) { ctx.fillStyle = C.navy; ctx.beginPath(); ctx.ellipse(0, 28, 15 + mo * 4, 4 + mo * 13, 0, 0, 7); ctx.fill(); ctx.fillStyle = C.acc; if (!anti) { ctx.beginPath(); ctx.ellipse(0, 32 + mo * 6, 8 + mo * 2, 2 + mo * 4, 0, 0, 7); ctx.fill(); } }
    else P.stroke(ctx, (c) => { c.beginPath(); c.arc(0, 16, 18, Math.PI * 0.2, Math.PI * 0.8); }, C.pap, 6);
    if (sweat > 0.01) { ctx.globalAlpha *= sweat; ctx.fillStyle = '#BFE3F5'; ctx.beginPath(); ctx.moveTo(78, -60); ctx.quadraticCurveTo(90, -34, 78, -28); ctx.quadraticCurveTo(66, -34, 78, -60); ctx.fill(); ctx.globalAlpha /= sweat; }
    limb(ctx, 76, 20, hn[0], hn[1], 7, LINE); P.iCirc(ctx, hn[0], hn[1], 13, BODY);
    ctx.restore();
  };
  Ch.elle = (ctx, o = {}) => Ch.twin(ctx, Object.assign({ kind: 'e' }, o));
  Ch.posi = (ctx, o = {}) => Ch.twin(ctx, Object.assign({ kind: 'p' }, o));

  // faceless figure (blue ink silhouette with a pink off-register shadow), name plate; pose: stand | walk | arms | raise | point | hold | sit
  P.person = (ctx, x, y, s, t, { pose = 'stand', prop = null, a = 1, k = 1, dir = 1, seed = 0, name = '', sub = '', hair = 0, ink = null } = {}) => {
    if (a <= 0.01 || k <= 0.01) return; const col = ink || C.ink; ctx.save(); ctx.translate(x, y); ctx.globalAlpha *= a * clamp(k * 1.4);
    const fig = (c, off) => { ctx.save(); ctx.translate(off[0], off[1]); ctx.scale(s * dir, s);
      const sway = Math.sin(t * 1.6 + seed) * 2; const wk = pose === 'walk' ? Math.sin(t * 6 + seed) : 0;
      if (!P.dark) ctx.globalCompositeOperation = 'multiply'; ctx.strokeStyle = c; ctx.fillStyle = c; ctx.lineWidth = 22; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath(); if (pose !== 'sit') { ctx.moveTo(-12, -92); ctx.lineTo(-16 + wk * 18, -6); ctx.moveTo(12, -92); ctx.lineTo(16 - wk * 18, -6); } else { ctx.moveTo(-12, -92); ctx.lineTo(34, -92); ctx.lineTo(34, -8); ctx.moveTo(12, -92); ctx.lineTo(50, -90); ctx.lineTo(50, -8); } ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-32, -196); ctx.quadraticCurveTo(-38, -130, -26, -88); ctx.lineTo(26, -88); ctx.quadraticCurveTo(38, -130, 32, -196); ctx.quadraticCurveTo(0, -206 + sway, -32, -196); ctx.closePath(); ctx.fill();
      ctx.lineWidth = 18; ctx.beginPath(); let hx = 34, hy = -96;
      if (pose === 'raise') { ctx.moveTo(26, -184); ctx.lineTo(46, -240); ctx.lineTo(50 + sway, -284); hx = 50 + sway; hy = -284; ctx.moveTo(-26, -184); ctx.lineTo(-38, -130); ctx.lineTo(-36, -98); }
      else if (pose === 'point') { ctx.moveTo(26, -184); ctx.lineTo(80, -186); ctx.lineTo(128, -196 + sway); hx = 128; hy = -196; ctx.moveTo(-26, -184); ctx.lineTo(-38, -130); ctx.lineTo(-36, -98); }
      else if (pose === 'hold') { ctx.moveTo(26, -184); ctx.lineTo(52, -140); ctx.lineTo(80, -150 + sway); hx = 80; hy = -150; ctx.moveTo(-26, -184); ctx.lineTo(-36, -140); ctx.lineTo(-10, -150); }
      else if (pose === 'arms') { ctx.moveTo(26, -184); ctx.lineTo(58, -150); ctx.lineTo(70, -110); ctx.moveTo(-26, -184); ctx.lineTo(-58, -150); ctx.lineTo(-70, -110); }
      else { ctx.moveTo(26, -184); ctx.lineTo(38 - wk * 12, -130); ctx.lineTo(36 - wk * 16, -98); hx = 36 - wk * 16; ctx.moveTo(-26, -184); ctx.lineTo(-38 + wk * 12, -130); ctx.lineTo(-36 + wk * 16, -98); }
      ctx.stroke();
      ctx.beginPath(); ctx.ellipse(0, -232 + sway * 0.4, 27, 31, 0, 0, 7); ctx.fill();
      if (hair === 1) { ctx.beginPath(); ctx.ellipse(-4, -254, 30, 14, -0.2, Math.PI, 0); ctx.fill(); }
      if (hair === 2) { ctx.beginPath(); ctx.ellipse(0, -246, 32, 24, 0, Math.PI, 0); ctx.fill(); }
      if (prop === 'paper') { ctx.fillStyle = C.pap; ctx.globalCompositeOperation = 'source-over'; ctx.fillRect(hx - 4, hy - 46, 40, 52); ctx.lineWidth = 3; ctx.strokeRect(hx - 4, hy - 46, 40, 52); }
      if (prop === 'chalk') { ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + 22, hy - 22); ctx.stroke(); }
      ctx.restore(); };
    fig(C.acc, [6, 4]); fig(col, [0, 0]);
    if (name) { const nk = clamp(k * 1.5 - 0.3); const w = P.measure(ctx, name, 30, 'Inter', 800) + 36;
      ctx.save(); ctx.globalAlpha *= nk; ctx.fillStyle = C.pap; ctx.fillRect(-w / 2, 26, w, 48); ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.strokeRect(-w / 2, 26, w, 48); ctx.fillStyle = C.acc; ctx.fillRect(-w / 2, 26, 8, 48);
      G.text(ctx, name, 4, 60, { size: 30, fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0 });
      if (sub) G.text(ctx, sub, 0, 108, { size: 32, fam: P.HAND, color: C.acc, align: 'center', boil: 0 });
      ctx.restore(); }
    ctx.restore();
  };
})();
