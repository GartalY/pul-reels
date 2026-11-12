// Ch.gull — the episode's guide: "Captain Gull", a flat white seagull in a navy captain's cap with a gold anchor badge.
// Lip-syncs (beak opens with P.talk), blinks, acts with its wings: idle | point | pointUp | cheer | shrug | think | flap | hold | worried.
// Can fly (fly: 0..1 spreads the wings and tucks the legs). Origin = between the feet. Height ≈ 260 px at s = 1. Faces right (dir 1) or left (-1).
// P.person — a plain flat silhouette (driver, sailor, farmer): no faces (PLAN: people as silhouettes).
(function () {
  const G = globalThis.G, U = globalThis.U, Ch = globalThis.Ch, P = globalThis.P; const C = P.C; const { clamp, lerp } = U;
  const wingPath = (len, wid) => (c) => { c.beginPath(); c.moveTo(0, -wid * 0.5); c.quadraticCurveTo(len * 0.55, -wid * 0.9, len, 0); c.quadraticCurveTo(len * 0.5, wid * 0.55, 0, wid * 0.5); c.closePath(); };
  const wing = (ctx, x, y, ang, len, col, tip) => { ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    P.fill(ctx, wingPath(len, 56), col); ctx.save(); wingPath(len, 56)(ctx); ctx.clip(); ctx.fillStyle = tip; ctx.fillRect(len * 0.72, -60, len, 120); ctx.restore(); ctx.restore(); };
  Ch.gull = (ctx, o = {}) => {
    const { x = 0, y = 0, s = 1, t = 0, dir = 1, gesture = 'idle', mouth = 0, eyes = 'open', look = 0, fly = 0, a = 1, shadow = true, hat = true, bob = 1, rot = 0 } = o;
    if (a <= 0.01 || s <= 0.01) return;
    ctx.save(); ctx.translate(x, y); if (a < 1) ctx.globalAlpha *= a;
    if (shadow && fly < 0.5) { ctx.save(); ctx.globalAlpha *= 0.18 * (1 - fly * 2); ctx.fillStyle = '#0A1030'; ctx.beginPath(); ctx.ellipse(0, 4 * s, 70 * s, 11 * s, 0, 0, 7); ctx.fill(); ctx.restore(); }
    ctx.scale(s * dir, s); ctx.rotate(rot);
    const br = Math.sin(t * 2.2) * 3 * bob; const hover = fly * Math.sin(t * 4.0) * 10;
    ctx.translate(0, br * 0.4 - fly * 40 + hover);
    // legs
    if (fly < 0.6) { const lk = 1 - fly / 0.6; for (const lx of [-14, 16]) { P.line(ctx, lx, -48, lx + 2, -48 + 46 * lk, '#F29A3A', 9); P.fill(ctx, P.pPoly([[lx - 14, 0 - 46 * (1 - lk)], [lx + 22, -2 - 46 * (1 - lk)], [lx + 4, -12 - 46 * (1 - lk)]]), '#F29A3A', { a: lk }); } }
    const flap = gesture === 'flap' || fly > 0.3 ? Math.sin(t * (fly > 0.3 ? 9 : 14)) : 0;
    let wa = 2.55, wb = 2.7; // near / far wing angles (radians, 0 = forward)
    switch (gesture) {
      case 'point': wa = -0.12 + Math.sin(t * 3) * 0.04; break;
      case 'pointUp': wa = -1.05; break;
      case 'cheer': wa = -1.9 + Math.sin(t * 8) * 0.15; wb = -1.3 + Math.sin(t * 8 + 1) * 0.15; break;
      case 'shrug': wa = -0.55; wb = -2.6; break;
      case 'think': wa = -0.6; break;
      case 'hold': wa = 0.35; break;
      case 'worried': wa = 1.6; wb = 1.9; break;
      case 'flap': wa = -1.2 + flap * 0.9; wb = -1.6 + flap * 0.9; break;
    }
    if (fly > 0.01) { wa = lerp(wa, -1.2 + flap * 0.85, fly); wb = lerp(wb, -1.7 + flap * 0.85, fly); }
    const wl = gesture === 'idle' || gesture === 'worried' ? 120 : 150;
    // far wing (behind the body)
    if (gesture === 'cheer' || gesture === 'shrug' || gesture === 'flap' || fly > 0.01) wing(ctx, -8, -118, wb, wl, '#9AA6C2', '#3B4466');
    // tail
    P.fill(ctx, P.pPoly([[-50, -112], [-112, -126], [-104, -84], [-44, -78]]), '#AEB8D0');
    P.fill(ctx, P.pPoly([[-96, -124], [-112, -126], [-104, -84], [-92, -86]]), '#3B4466');
    // body
    P.ell(ctx, 0, -98, 64, 54, C.white, { shadow: 0.12, sy: 6 });
    P.ell(ctx, -6, -86, 52, 34, '#EEF1F8');
    // head
    const hx = 34, hy = -170 + Math.sin(t * 2.2 + 0.6) * 2 * bob;
    P.ell(ctx, 18, -138, 34, 34, C.white);
    P.circ(ctx, hx, hy, 44, C.white);
    // beak (upper + lower; the lower jaw opens with the voice)
    const mo = typeof mouth === 'number' ? mouth : mouth === 'o' ? 0.8 : mouth === 'smile' ? 0.15 : 0;
    ctx.save(); ctx.translate(hx + 36, hy + 6); ctx.rotate(0.28 * mo);
    P.fill(ctx, P.pPoly([[0, 0], [52, 6], [0, 14]]), '#F0A030'); ctx.restore();
    P.fill(ctx, P.pPoly([[hx + 34, hy - 8], [hx + 96, hy + 4], [hx + 88, hy + 10], [hx + 34, hy + 8]]), '#F7B23B');
    P.circ(ctx, hx + 86, hy + 9, 5, C.red);
    // eye
    const blink = (U.hash(Math.floor(t / 3.3), 7) < 0.85 && (t % 3.3) > 3.15) || eyes === 'closed';
    const ex = hx + 14 + look * 4, ey = hy - 8;
    if (blink) P.line(ctx, ex - 9, ey, ex + 9, ey, C.ink, 5);
    else if (eyes === 'happy') P.stroke(ctx, (c) => { c.beginPath(); c.arc(ex, ey + 4, 9, Math.PI * 1.1, Math.PI * 1.9); }, C.ink, 5);
    else { const r = eyes === 'wide' ? 12 : 9.5; P.circ(ctx, ex, ey, r, C.ink); P.circ(ctx, ex + 3, ey - 3, r * 0.33, C.white); }
    if (eyes === 'worried' || gesture === 'worried') P.line(ctx, ex - 12, ey - 20, ex + 10, ey - 14, C.ink, 4);
    // captain's cap
    if (hat) { ctx.save(); ctx.translate(hx - 2, hy - 30); ctx.rotate(-0.12);
      P.rect(ctx, -46, -26, 84, 30, 12, C.navy); P.rect(ctx, -50, -2, 92, 12, 6, '#0C1533'); P.fill(ctx, P.pPoly([[30, 4], [70, 10], [36, 14]]), '#0C1533');
      P.rect(ctx, -46, -30, 84, 10, 5, C.white); P.circ(ctx, -4, -12, 8, C.gold); P.line(ctx, -4, -18, -4, -6, C.navy, 2.5); ctx.restore(); }
    // near wing (in front)
    wing(ctx, -4, -112, wa, wl, '#C3CBDF', '#3B4466');
    ctx.restore();
  };
  Ch.gullMouth = (t) => P.talk(t);

  // a flat silhouette person (no face). pose: 'stand' | 'drive' | 'sit'; prop: 'cap' | 'helmet' | null
  P.person = (ctx, x, y, s, { color = C.navy2, t = 0, arm = 0, hat = null, a = 1 } = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a;
    P.rect(ctx, -26, -150, 52, 100, 22, color);
    P.rect(ctx, -22, -60, 18, 60, 8, color); P.rect(ctx, 4, -60, 18, 60, 8, color);
    P.circ(ctx, 0, -178, 26, color);
    if (hat === 'helmet') P.fill(ctx, (c) => { c.beginPath(); c.arc(0, -184, 30, Math.PI, 0); c.closePath(); }, C.gold);
    if (hat === 'cap') { P.fill(ctx, (c) => { c.beginPath(); c.arc(0, -188, 27, Math.PI, 0); c.closePath(); }, C.coral); P.rect(ctx, 0, -192, 40, 8, 4, C.coral); }
    ctx.save(); ctx.translate(18, -138); ctx.rotate(0.3 - arm * 1.6 + Math.sin(t * 3) * 0.05 * arm); P.rect(ctx, -8, 0, 16, 70, 8, color); ctx.restore();
    ctx.save(); ctx.translate(-18, -138); ctx.rotate(-0.25); P.rect(ctx, -8, 0, 16, 70, 8, color); ctx.restore();
    ctx.restore();
  };
})();
