// Ch.pip — the episode's guide: "Pip", a small hovering drafting robot (screen face, antenna bulb, yellow pencil).
// Lip-syncs (mouth = P.talk), blinks, looks; gestures: idle | point | pointUp | cheer | shrug | think | write | hold | wave.
// Origin = the hover point under the body. Height ≈ 300 px at s = 1. dir 1 faces right, -1 left.
// P.person — a faceless technical-drawing mannequin (PLAN: people as silhouettes): outline + translucent fill, optional prop.
(function () {
  const G = globalThis.G, U = globalThis.U, Ch = globalThis.Ch, P = globalThis.P; const C = P.C; const { clamp, lerp } = U;
  const arm = (ctx, sx, sy, hx, hy, lw, col) => { // two-segment arm, elbow bent outward/down
    const mx = (sx + hx) / 2, my = (sy + hy) / 2; const dx = hx - sx, dy = hy - sy, L = Math.hypot(dx, dy) || 1; const bend = Math.max(0, 70 - L * 0.5);
    const ex = mx + (-dy / L) * bend * Math.sign(dx || 1) * -1, ey = my + Math.abs(dx / L) * bend * 0.6 + bend * 0.3;
    ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(ex, ey, hx, hy); ctx.stroke();
  };
  Ch.pip = (ctx, o = {}) => {
    const { x = 0, y = 0, s = 1, t = 0, dir = 1, gesture = 'idle', mouth = 0, eyes = 'open', look = 0, a = 1, bob = 1, rot = 0, g2 = null } = o;
    if (a <= 0.01 || s <= 0.01) return;
    ctx.save(); ctx.translate(x, y); if (a < 1) ctx.globalAlpha *= a;
    // hover shadow + jet
    ctx.save(); ctx.globalAlpha *= 0.25; ctx.fillStyle = '#04182E'; ctx.beginPath(); ctx.ellipse(0, 6 * s, 70 * s, 12 * s, 0, 0, 7); ctx.fill(); ctx.restore();
    ctx.scale(s * dir, s); ctx.rotate(rot);
    const hv = Math.sin(t * 2.4) * 7 * bob; ctx.translate(0, -26 + hv);
    const fl = 0.75 + 0.25 * Math.sin(t * 31) * Math.sin(t * 17);
    P.glow(ctx, 0, -2, 46, C.yel, 0.8);
    P.poly(ctx, [[-16, -12], [16, -12], [0, 22 * fl + 6]], C.yel, { a: 0.9 }); P.poly(ctx, [[-8, -12], [8, -12], [0, 12 * fl]], '#FFF4C4');
    const OUT = C.ln, BODY = '#0B2E57', SCR = '#123F73';
    // body
    P.rect(ctx, -52, -128, 104, 112, 26, BODY, { stroke: OUT, lw: 5 });
    P.rect(ctx, -30, -100, 60, 34, 8, 'rgba(234,244,255,0.1)', { stroke: 'rgba(234,244,255,0.5)', lw: 3 });
    for (let i = 0; i < 3; i++) P.circ(ctx, -16 + i * 16, -83, 5, [C.yel, C.cor, C.mint][i], { a: 0.5 + 0.5 * (Math.sin(t * 3 + i * 2) > 0 ? 1 : 0.3) });
    // gestures → hand targets (local coords, facing right)
    let hn = [62, -40], hf = [-62, -40]; const sw = Math.sin(t * 3) * 6;
    switch (gesture) {
      case 'point': hn = [150, -150 + sw * 0.5]; break;
      case 'pointUp': hn = [92, -250 + sw * 0.3]; break;
      case 'cheer': hn = [84, -240 + Math.sin(t * 9) * 10]; hf = [-84, -240 + Math.sin(t * 9 + 1) * 10]; break;
      case 'shrug': hn = [112, -128]; hf = [-112, -128]; break;
      case 'think': hn = [30, -168]; break;
      case 'write': hn = [104 + Math.sin(t * 11) * 14, -70 + Math.cos(t * 13) * 8]; break;
      case 'hold': hn = [96, -110]; hf = [-96, -110]; break;
      case 'wave': hn = [96 + Math.sin(t * 10) * 18, -230]; break;
    }
    if (g2 === 'hold') hf = [-96, -110];
    arm(ctx, -46, -110, hf[0], hf[1], 12, OUT); arm(ctx, -46, -110, hf[0], hf[1], 6, '#2A5C93');
    P.circ(ctx, hf[0], hf[1], 12, BODY, { stroke: OUT, lw: 4 });
    // head
    P.rect(ctx, -8, -146, 16, 22, 4, OUT);
    ctx.save(); const tilt = gesture === 'think' ? -0.08 : gesture === 'shrug' ? 0.07 : Math.sin(t * 1.3) * 0.03; ctx.translate(0, -150); ctx.rotate(tilt); ctx.translate(0, 150);
    P.rect(ctx, -82, -268, 164, 122, 30, BODY, { stroke: OUT, lw: 5 });
    P.rect(ctx, -66, -254, 132, 94, 20, SCR);
    // antenna
    P.line(ctx, 0, -268, 0, -300, OUT, 5); const bl = 0.6 + 0.4 * Math.sin(t * 4); P.glow(ctx, 0, -306, 34, C.yel, bl); P.circ(ctx, 0, -306, 11, C.yel);
    // ears
    P.rect(ctx, -94, -228, 14, 42, 6, OUT); P.rect(ctx, 80, -228, 14, 42, 6, OUT);
    // eyes (blink every ~3.7 s)
    const bph = (t + 0.7) % 3.7; const blink = bph < 0.13 ? Math.sin((bph / 0.13) * Math.PI) : 0; const lx = clamp(look, -1, 1) * 10;
    for (const ex of [-28, 28]) {
      if (eyes === 'happy') { P.stroke(ctx, (c) => { c.beginPath(); c.arc(ex + lx, -208, 14, Math.PI * 1.1, Math.PI * 1.9); }, C.cyan, 7); continue; }
      const eh = (eyes === 'wide' ? 26 : 20) * (1 - blink * 0.92);
      P.ell(ctx, ex + lx, -212, eyes === 'wide' ? 15 : 12, Math.max(1.5, eh), C.cyan); P.circ(ctx, ex + lx + 4, -218, 3.5, '#FFFFFF', { a: 1 - blink });
    }
    // mouth
    const mo = clamp(mouth); if (mo > 0.08) P.rect(ctx, -18, -184 - mo * 4, 36, 6 + mo * 14, 6, C.cyan); else P.line(ctx, -16, -180, 16, -180, C.cyan, 5);
    ctx.restore();
    // near arm + pencil
    arm(ctx, 46, -110, hn[0], hn[1], 12, OUT); arm(ctx, 46, -110, hn[0], hn[1], 6, '#2A5C93');
    ctx.save(); ctx.translate(hn[0], hn[1]); ctx.rotate(gesture === 'point' ? 0 : gesture === 'pointUp' ? -1.2 : 0.6);
    P.rect(ctx, -6, -9, 54, 18, 3, C.yel); P.poly(ctx, [[48, -9], [66, 0], [48, 9]], '#F3D9A4'); P.poly(ctx, [[60, -3], [66, 0], [60, 3]], C.ink2); P.rect(ctx, -12, -9, 8, 18, 2, C.cor);
    ctx.restore();
    P.circ(ctx, hn[0], hn[1], 13, BODY, { stroke: OUT, lw: 4 });
    ctx.restore();
  };

  // faceless mannequin, line-art. pose: stand | walk | arms | raise; prop: null | 'cap' | 'hat' | 'book' | 'paddle'
  P.person = (ctx, x, y, s, t, { pose = 'stand', prop = null, color = C.ln, fill = 'rgba(234,244,255,0.14)', a = 1, k = 1, lw = 4.5, dir = 1, seed = 0, num = '' } = {}) => {
    if (a <= 0.01 || k <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s); ctx.globalAlpha *= a * clamp(k * 1.4);
    const sway = Math.sin(t * 1.6 + seed) * 2; const wk = pose === 'walk' ? Math.sin(t * 6 + seed) : 0;
    ctx.strokeStyle = color; ctx.lineWidth = lw / s; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.fillStyle = fill;
    // legs
    ctx.beginPath(); ctx.moveTo(-10, -92); ctx.lineTo(-14 + wk * 18, 0); ctx.moveTo(10, -92); ctx.lineTo(14 - wk * 18, 0); ctx.stroke();
    // torso
    ctx.beginPath(); ctx.moveTo(-26, -190); ctx.quadraticCurveTo(-30, -130, -20, -92); ctx.lineTo(20, -92); ctx.quadraticCurveTo(30, -130, 26, -190); ctx.quadraticCurveTo(0, -200 + sway, -26, -190); ctx.closePath(); ctx.fill(); ctx.stroke();
    // arms
    ctx.beginPath();
    if (pose === 'raise') { ctx.moveTo(24, -184); ctx.lineTo(44, -240); ctx.lineTo(48 + sway, -286); ctx.moveTo(-24, -184); ctx.lineTo(-36, -130); ctx.lineTo(-34, -96); }
    else if (pose === 'arms') { ctx.moveTo(24, -184); ctx.lineTo(56, -150); ctx.lineTo(70, -110); ctx.moveTo(-24, -184); ctx.lineTo(-56, -150); ctx.lineTo(-70, -110); }
    else { ctx.moveTo(24, -184); ctx.lineTo(36 - wk * 12, -130); ctx.lineTo(34 - wk * 16, -96); ctx.moveTo(-24, -184); ctx.lineTo(-36 + wk * 12, -130); ctx.lineTo(-34 + wk * 16, -96); }
    ctx.stroke();
    // head (no face)
    ctx.beginPath(); ctx.ellipse(0, -226 + sway * 0.4, 24, 28, 0, 0, 7); ctx.fill(); ctx.stroke();
    if (prop === 'cap') { ctx.beginPath(); ctx.moveTo(-26, -236); ctx.quadraticCurveTo(0, -268, 26, -236); ctx.lineTo(44, -232); ctx.stroke(); }
    if (prop === 'hat') { ctx.beginPath(); ctx.moveTo(-46, -240); ctx.lineTo(46, -240); ctx.moveTo(-24, -240); ctx.lineTo(-18, -268); ctx.lineTo(18, -268); ctx.lineTo(24, -240); ctx.stroke(); }
    if (prop === 'nurse') { ctx.beginPath(); ctx.moveTo(-22, -244); ctx.lineTo(-18, -262); ctx.lineTo(18, -262); ctx.lineTo(22, -244); ctx.stroke(); ctx.strokeStyle = C.cor; ctx.beginPath(); ctx.moveTo(0, -259); ctx.lineTo(0, -247); ctx.moveTo(-6, -253); ctx.lineTo(6, -253); ctx.stroke(); }
    if (prop === 'book') { ctx.strokeStyle = C.yel; ctx.strokeRect(34, -150, 38, 48); ctx.beginPath(); ctx.moveTo(53, -150); ctx.lineTo(53, -102); ctx.stroke(); }
    if (prop === 'paddle') { ctx.strokeStyle = C.ln; ctx.beginPath(); ctx.moveTo(48 + sway, -286); ctx.lineTo(48 + sway, -300); ctx.stroke(); ctx.fillStyle = C.yel; ctx.beginPath(); ctx.ellipse(48 + sway, -326, 26, 30, 0, 0, 7); ctx.fill(); if (num) G.text(ctx, num, 48 + sway, -315, { size: 26, fam: 'Bungee', color: C.ink2, align: 'center', boil: 0 }); }
    ctx.restore();
  };
})();
