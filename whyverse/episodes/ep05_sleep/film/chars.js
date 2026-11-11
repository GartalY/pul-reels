// Ch.nod — the episode's guide: a small round periwinkle creature in a coral nightcap with a swinging pom-pom ("Nod").
// Lip-syncs to the narration (P.talk), acts with gestures, yawns, dozes. Painted in washes; nothing boils.
// Origin = between the feet. Height ≈ 250 px at s = 1.
// o: {x, y, s, t, rot, a, look (-1..1), lookY, eyes 'open'|'sleepy'|'closed'|'wide'|'happy'|'worried', mouth (0..1 | 'smile'|'o'|'flat'|'yawn'|'frown'),
//     gesture 'idle'|'point'|'pointUp'|'wave'|'shrug'|'cheer'|'think'|'yawn'|'hold'|'hug', dir (1 right / -1 left), swing (cap pom 0..2), shadow, color, prop 'pillow'|'cup'|'lamp'}
// P.human — simple watercolor people (teen Randy, the researcher, volunteers). Origin = feet (stand) or seat (sit). Height ≈ 335 at s = 1.
(function () {
  const G = globalThis.G, U = globalThis.U, Ch = globalThis.Ch, P = globalThis.P; const C = P.C; const { clamp, lerp } = U;
  const ik = (sx, sy, tx, ty, l1, l2, bend) => {
    let dx = tx - sx, dy = ty - sy; let d = Math.hypot(dx, dy) || 0.001; const max = l1 + l2 - 0.5;
    if (d > max) { tx = sx + dx / d * max; ty = sy + dy / d * max; dx = tx - sx; dy = ty - sy; d = max; }
    const a = Math.atan2(dy, dx), c = clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1), b = Math.acos(c) * bend;
    return [[sx + Math.cos(a - b) * l1, sy + Math.sin(a - b) * l1], [tx, ty]];
  };
  const limb = (ctx, pts, col, lw) => P.brush(ctx, (c) => { c.beginPath(); pts.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); }, col, lw, 1);
  Ch.nod = (ctx, o = {}) => {
    const { x = 0, y = 0, s = 1, t = G.t, rot = 0, a = 1, look = 0, lookY = 0, eyes = 'open', mouth = 'smile', gesture = 'idle', dir = 1, swing = 0.5, shadow = true,
      color = C.peri, seed = 3, prop = null, bob = 1, flip = false } = o;
    if (a <= 0.01 || s <= 0.01) return;
    ctx.save(); ctx.translate(x, y);
    if (shadow) { ctx.save(); ctx.globalAlpha *= 0.16 * a; ctx.fillStyle = '#10143A'; ctx.beginPath(); ctx.ellipse(0, 4 * s, 92 * s, 14 * s, 0, 0, 7); ctx.fill(); ctx.restore(); }
    ctx.scale(s * (flip ? -1 : 1), s); ctx.rotate(rot); if (a < 1) ctx.globalAlpha *= a;
    const br = Math.sin(t * 2.0 + seed) * 3 * bob; const dkc = P.dk(color, 0.22);
    for (const sx of [-1, 1]) P.ell(ctx, sx * 36, -8, 30, 14, dkc, { seed: seed + sx });
    // arms behind the body
    const w = (k) => Math.sin(t * k + seed);
    let hL = [-92, -66 + w(2) * 3], hR = [92, -66 + w(2.3) * 3];
    switch (gesture) {
      case 'point': if (dir > 0) hR = [150, -128]; else hL = [-150, -128]; break;
      case 'pointUp': hR = [84, -222]; break;
      case 'wave': hR = [118 + w(11) * 20, -200]; break;
      case 'shrug': hL = [-124, -128]; hR = [124, -128]; break;
      case 'cheer': hL = [-96, -216 + w(9) * 8]; hR = [96, -216 - w(9) * 8]; break;
      case 'think': hR = [40, -84]; break;
      case 'yawn': hR = [26, -92]; hL = [-118, -214]; break;
      case 'hold': hL = [-70, -84]; hR = [70, -84]; break;
      case 'hug': hL = [-46, -52]; hR = [46, -52]; break;
      default: break;
    }
    const shL = [-66, -112 + br], shR = [66, -112 + br];
    const armFront = gesture === 'think' || gesture === 'yawn' || gesture === 'hold' || gesture === 'hug';
    const noodle = (sh, h, side) => { const mx = (sh[0] + h[0]) / 2, my = (sh[1] + h[1]) / 2, up = h[1] < sh[1] - 20; P.brush(ctx, (c) => { c.beginPath(); c.moveTo(sh[0], sh[1]); c.quadraticCurveTo(mx + side * (up ? 26 : 30), my + (up ? 26 : 14), h[0], h[1]); }, dkc, 24, 1); };
    const arms = () => { noodle(shL, hL, -1); noodle(shR, hR, 1); P.dot(ctx, hL[0], hL[1], 15, dkc); P.dot(ctx, hR[0], hR[1], 15, dkc); };
    if (!armFront) arms();
    // body + belly
    P.shape(ctx, [[-80, -62], [-72, -132 + br], [-42, -180 + br], [0, -192 + br], [42, -180 + br], [72, -132 + br], [80, -62], [52, -14], [0, -4], [-52, -14]], color, { seed: seed + 2 });
    P.wash(ctx, P.pEll(0, -62, 46, 44), C.cream, { edge: 0, fillA: 0.55 });
    if (prop === 'pillow') P.rect(ctx, -58, -96, 116, 62, 22, C.white, { seed: seed + 20, edge: 0.3 });
    if (armFront) arms();
    if (prop === 'cup') P.cup(ctx, hR[0] + 6, hR[1] - 22, 26, t, { seed: seed + 21 });
    if (prop === 'lamp') { P.glow(ctx, hR[0], hR[1] - 30, 130, C.gold, 0.9); P.ell(ctx, hR[0], hR[1] - 30, 20, 26, C.gold, { seed: seed + 22 }); }
    // face
    const fy = -128 + br; const ex = look * 9, ey = lookY * 7;
    for (const sx of [-1, 1]) { const px = sx * 27 + ex * 0.4, py = fy;
      if (eyes === 'closed') P.arc(ctx, px, py - 2, 12, Math.PI * 0.12, Math.PI * 0.88, C.ink, 4.5);
      else if (eyes === 'happy') P.arc(ctx, px, py + 8, 12, Math.PI * 1.12, Math.PI * 1.88, C.ink, 4.5);
      else { const big = eyes === 'wide' ? 1.25 : 1; ctx.save(); ctx.fillStyle = C.white; ctx.beginPath(); ctx.ellipse(px, py, 17 * big, 20 * big, 0, 0, 7); ctx.fill(); ctx.restore();
        P.dot(ctx, px + ex, py + ey + (eyes === 'sleepy' ? 5 : 0), 9 * (eyes === 'wide' ? 0.8 : 1), C.ink); P.dot(ctx, px + ex + 3, py + ey - 3 + (eyes === 'sleepy' ? 5 : 0), 3, C.white);
        const blink = (t * 0.31 + seed * 0.17) % 1 < 0.035;
        if (eyes === 'sleepy' || blink) { ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.ellipse(px, py, 18.5, 21.5, 0, Math.PI, Math.PI * 2); ctx.lineTo(px + 18.5, py + (blink ? 16 : 2)); ctx.lineTo(px - 18.5, py + (blink ? 16 : 2)); ctx.closePath(); ctx.fill(); ctx.restore(); P.line(ctx, px - 18, py + (blink ? 16 : 2), px + 18, py + (blink ? 16 : 2), dkc, 3.5, 1); }
        if (eyes === 'worried') P.line(ctx, px - 14, py - 30 + (sx < 0 ? 7 : -3), px + 14, py - 30 + (sx < 0 ? -3 : 7), C.ink, 4, 1); } }
    P.dot(ctx, -50, fy + 26, 11, C.pink, 0.55); P.dot(ctx, 50, fy + 26, 11, C.pink, 0.55);
    const mx = ex * 0.5, my = fy + 34 + lookY * 3;
    if (typeof mouth === 'number') { const m = clamp(mouth); ctx.save(); ctx.fillStyle = '#5A2A3A'; ctx.beginPath(); ctx.ellipse(mx, my, 9 + 3 * m, 2.5 + 11 * m, 0, 0, 7); ctx.fill(); ctx.restore(); }
    else if (mouth === 'o') P.dot(ctx, mx, my + 2, 8, '#5A2A3A');
    else if (mouth === 'yawn') { ctx.save(); ctx.fillStyle = '#5A2A3A'; ctx.beginPath(); ctx.ellipse(mx, my + 4, 15, 19, 0, 0, 7); ctx.fill(); ctx.fillStyle = C.pink; ctx.beginPath(); ctx.ellipse(mx, my + 13, 9, 7, 0, 0, 7); ctx.fill(); ctx.restore(); }
    else if (mouth === 'flat') P.line(ctx, mx - 10, my, mx + 10, my, C.ink, 4.5, 1);
    else if (mouth === 'frown') P.arc(ctx, mx, my + 10, 11, Math.PI * 1.2, Math.PI * 1.8, C.ink, 4.5);
    else P.arc(ctx, mx, my - 8, 13, Math.PI * 0.2, Math.PI * 0.8, C.ink, 4.5);
    // nightcap: coral cone falling to the right, gold band, cream pom-pom
    const sw = Math.sin(t * 2.6 + seed) * 9 * swing;
    P.shape(ctx, [[-66, -164 + br], [-44, -210 + br], [8, -240 + br], [62, -234 + br], [100, -202 + br + sw * 0.5], [110, -160 + br + sw], [86, -190 + br + sw * 0.5], [58, -198 + br], [62, -166 + br]], C.coral, { seed: seed + 5 });
    P.brush(ctx, P.pCurve([[-34, -196 + br], [0, -214 + br], [40, -214 + br]], false), C.gold, 7, 0.9);
    P.rect(ctx, -70, -180 + br, 138, 24, 12, C.gold, { seed: seed + 6 });
    P.ell(ctx, 110, -150 + br + sw, 17, 17, C.cream, { seed: seed + 7, edge: 0.35 });
    ctx.restore();
  };
  Ch.nodMouth = (t, rest = 'smile') => { const m = P.talk(t); return m > 0.06 ? m : rest; };

  // o: {x, y, s, t, a, pose 'stand'|'sit', skin, hair, hairStyle 'short'|'long'|'curly'|'bald'|'crew', shirt, pants, coat (bool), glasses, eyes 'open'|'closed'|'tired'|'wide'|'happy',
  //     mouth 'smile'|'flat'|'o'|'frown'|number, armL/armR: [x, y] hand targets (local), look, lean (radians), flip, prop 'clipboard'|'cup'|'pinball', sway}
  P.human = (ctx, o = {}) => {
    const { x = 0, y = 0, s = 1, t = G.t, a = 1, pose = 'stand', skin = C.skin, hair = '#5A3E2B', hairStyle = 'short', shirt = C.sky, pants = '#3C4A7A', coat = false, glasses = false,
      eyes = 'open', mouth = 'smile', look = 0, lean = 0, flip = false, prop = null, seed = 5, sway = 0, shadow = true } = o;
    if (a <= 0.01 || s <= 0.01) return;
    ctx.save(); ctx.translate(x, y);
    if (shadow && pose === 'stand') { ctx.save(); ctx.globalAlpha *= 0.15 * a; ctx.fillStyle = '#10143A'; ctx.beginPath(); ctx.ellipse(0, 4 * s, 70 * s, 12 * s, 0, 0, 7); ctx.fill(); ctx.restore(); }
    ctx.scale(s * (flip ? -1 : 1), s); if (a < 1) ctx.globalAlpha *= a;
    const br = Math.sin(t * 1.9 + seed) * 2; const swy = Math.sin(t * 1.3 + seed) * sway;
    let hipY = -146;
    if (pose === 'sit') { hipY = 0; for (const sx of [-1, 1]) { limb(ctx, [[sx * 20, 0], [56 + sx * 8, 6], [60 + sx * 8, 128]], pants, 30); P.ell(ctx, 76 + sx * 8, 134, 26, 12, '#2B3157', { seed: seed + sx }); } }
    else for (const sx of [-1, 1]) { limb(ctx, [[sx * 22, hipY], [sx * 26, -8]], pants, 30); P.ell(ctx, sx * 30 + 6, -6, 26, 12, '#2B3157', { seed: seed + sx }); }
    ctx.translate(0, hipY); ctx.rotate(lean + swy);
    const shY = -108 + br; const sleeve = coat ? C.white : shirt;
    const hand = (side, tgt) => { const sh = [side * 48, shY + 8]; const tg = tgt || [side * 62, shY + 108]; const [e1] = ik(sh[0], sh[1], tg[0], tg[1], 60, 60, 1), [e2] = ik(sh[0], sh[1], tg[0], tg[1], 60, 60, -1); const up = tg[1] < sh[1] - 10; const sc = (q) => side * q[0] + (up ? -0.6 : 0.6) * q[1]; const e = sc(e1) > sc(e2) ? e1 : e2; limb(ctx, [sh, e, tg], sleeve, 24); P.dot(ctx, tg[0], tg[1], 14, skin); return tg; };
    const tl = o.armL ? [o.armL[0], o.armL[1]] : null, tr = o.armR ? [o.armR[0], o.armR[1]] : null;
    hand(-1, tl);
    if (coat) { P.rect(ctx, -58, shY - 8, 116, 150, 30, C.white, { seed: seed + 3, edge: 0.4 }); P.rect(ctx, -14, shY - 4, 28, 110, 8, shirt, { seed: seed + 4, edge: 0.2 }); }
    else P.rect(ctx, -50, shY - 8, 100, 130, 32, shirt, { seed: seed + 3 });
    const hr = hand(1, tr);
    if (prop === 'clipboard') { ctx.save(); ctx.translate(hr[0] + 6, hr[1] - 26); ctx.rotate(-0.15); P.rect(ctx, -34, -46, 68, 92, 8, C.wood, { seed: 31 }); P.rect(ctx, -27, -36, 54, 76, 4, C.cream, { edge: 0.15 }); for (let i = 0; i < 4; i++) P.line(ctx, -19, -22 + i * 16, 19 - (i % 2) * 10, -22 + i * 16, C.dim, 3, 0.7); ctx.restore(); }
    if (prop === 'cup') P.cup(ctx, hr[0] + 4, hr[1] - 22, 24, t, { seed: 33 });
    // head
    const hy = shY - 52; P.rect(ctx, -12, shY - 24, 24, 26, 8, P.dk(skin, 0.12), { edge: 0.2 });
    if (hairStyle === 'long') P.ell(ctx, 0, hy + 14, 50, 58, hair, { seed: seed + 6 });
    P.ell(ctx, 0, hy, 42, 44, skin, { seed: seed + 7 });
    if (hairStyle !== 'bald') { const top = hairStyle === 'curly' ? 16 : hairStyle === 'crew' ? 4 : 9;
      P.wash(ctx, (c) => { c.beginPath(); c.arc(0, hy - 2, 44 + top * 0.3, Math.PI * 1.02, Math.PI * 1.98); c.quadraticCurveTo(22, hy - 26 - top * 0.2, 0, hy - 22); c.quadraticCurveTo(-24, hy - 20, -44, hy - 2); c.closePath(); }, hair, { seed: seed + 8, edge: 0.35 });
      if (hairStyle === 'curly') for (let i = 0; i < 6; i++) P.ell(ctx, -36 + i * 14.5, hy - 40 - (i % 2) * 5, 13, 13, hair, { seed: seed + 9 + i, edge: 0.3 }); }
    const ex = look * 6;
    for (const sx of [-1, 1]) { const px = sx * 16 + ex, py = hy + 2;
      if (eyes === 'closed') P.arc(ctx, px, py - 2, 8, Math.PI * 0.15, Math.PI * 0.85, C.ink, 3.5);
      else if (eyes === 'happy') P.arc(ctx, px, py + 5, 8, Math.PI * 1.15, Math.PI * 1.85, C.ink, 3.5);
      else { const big = eyes === 'wide' ? 1.5 : 1; P.dot(ctx, px, py, 8.5 * big, C.white); P.dot(ctx, px + ex * 0.4, py + (eyes === 'tired' ? 2 : 0), 4.4 * big, C.ink);
        if (eyes === 'tired') { ctx.save(); ctx.fillStyle = skin; ctx.fillRect(px - 10, py - 10, 20, 8); ctx.restore(); P.line(ctx, px - 9, py - 2, px + 9, py - 2, C.ink, 3, 1); P.arc(ctx, px, py + 5, 10, Math.PI * 0.2, Math.PI * 0.8, '#8A7AA8', 3); } }
      if (glasses) { ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.arc(px, py, 14, 0, 7); ctx.stroke(); ctx.restore(); } }
    if (glasses) P.line(ctx, -2 + ex, hy + 2, 2 + ex, hy + 2, C.ink, 3.5, 1);
    P.dot(ctx, -26, hy + 16, 8, C.pink, 0.45); P.dot(ctx, 26, hy + 16, 8, C.pink, 0.45);
    const mx = ex * 0.6, my = hy + 22;
    if (typeof mouth === 'number') { const m = clamp(mouth); ctx.save(); ctx.fillStyle = '#7A3B3B'; ctx.beginPath(); ctx.ellipse(mx, my, 7 + 2 * m, 2 + 8 * m, 0, 0, 7); ctx.fill(); ctx.restore(); }
    else if (mouth === 'o') P.dot(ctx, mx, my + 1, 6, '#7A3B3B');
    else if (mouth === 'flat') P.line(ctx, mx - 8, my, mx + 8, my, C.ink, 3.5, 1);
    else if (mouth === 'frown') P.arc(ctx, mx, my + 9, 9, Math.PI * 1.2, Math.PI * 1.8, C.ink, 3.5);
    else P.arc(ctx, mx, my - 6, 10, Math.PI * 0.2, Math.PI * 0.8, C.ink, 3.5);
    ctx.restore();
  };
})();
