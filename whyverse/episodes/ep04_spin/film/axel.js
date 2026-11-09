// Ch.axel — the episode's guide: a chalk stickman with a big round head and a gold scarf (named after Earth's axis).
// Lip-syncs to the narration (P.talk), acts with gestures, never boils (static chalk strokes).
// Origin = between the feet (stand/walk/run) or on the seat (sit). Height ≈ 300 px at s = 1.
// o: {x, y, s, t, rot, a, look (-1..1), lookY, eyes 'normal'|'happy'|'wide'|'closed'|'worried', mouth (0..1 | 'smile'|'o'|'flat'|'frown'),
//     pose 'stand'|'sit'|'walk'|'run'|'fly', gesture 'idle'|'point'|'pointUp'|'wave'|'shrug'|'cheer'|'cup'|'flail'|'brace'|'think'|'hold',
//     dir (1 right / -1 left, for point/brace), wind (scarf flap 0..2, + blows to the left), sweat (0..1), color, cup (0..1 tilt pour)}
(function () {
  const G = globalThis.G, U = globalThis.U, Ch = globalThis.Ch, P = globalThis.P; const C = P.C; const { clamp, lerp } = U;
  const ik = (sx, sy, tx, ty, l1, l2, bend) => {
    let dx = tx - sx, dy = ty - sy; let d = Math.hypot(dx, dy); const max = l1 + l2 - 0.5;
    if (d > max) { tx = sx + dx / d * max; ty = sy + dy / d * max; dx = tx - sx; dy = ty - sy; d = max; }
    const a = Math.atan2(dy, dx), c = clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1), b = Math.acos(c) * bend;
    return [[sx + Math.cos(a - b) * l1, sy + Math.sin(a - b) * l1], [tx, ty]];
  };
  Ch.axel = (ctx, o = {}) => {
    const { x = 0, y = 0, s = 1, t = G.t, rot = 0, a = 1, look = 0, lookY = 0, eyes = 'normal', mouth = 'smile', pose = 'stand', gesture = 'idle', dir = 1,
      wind = 0.3, sweat = 0, color = C.chalk, seed = 3, cup = 0, phase = 0, bob = 1 } = o;
    if (a <= 0.01 || s <= 0.01) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(rot); if (a < 1) ctx.globalAlpha *= a;
    const lw = 9; const L = (pts, col = color, w = lw) => P.stroke(ctx, (c) => { c.beginPath(); pts.forEach((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); }, col, w, 1, { seed: seed + pts.length });
    const breathe = Math.sin(t * 2.2 + seed) * 2.5 * bob;
    // ---- legs + hip ----
    let hip = [0, -108 + breathe * 0.3], fL, fR, kL, kR;
    const ph = phase || t;
    if (pose === 'sit') { hip = [0, 0]; kL = [62, -6]; kR = [70, -2]; fL = [64, 58]; fR = [74, 60]; }
    else if (pose === 'walk' || pose === 'run') { const sp = pose === 'run' ? 11 : 7, amp = pose === 'run' ? 46 : 30, lift = pose === 'run' ? 34 : 18;
      const sw = Math.sin(ph * sp), sw2 = Math.sin(ph * sp + Math.PI); hip = [0, -108 - Math.abs(Math.cos(ph * sp)) * 6];
      fL = [sw * amp, -Math.max(0, Math.cos(ph * sp)) * lift]; fR = [sw2 * amp, -Math.max(0, -Math.cos(ph * sp)) * lift];
      [kL] = ik(hip[0], hip[1], fL[0], fL[1], 58, 58, -1); [kR] = ik(hip[0], hip[1], fR[0], fR[1], 58, 58, -1); }
    else if (pose === 'fly') { hip = [0, -108]; fL = [-70, -40 + Math.sin(t * 9) * 12]; fR = [-40, -10 + Math.sin(t * 9 + 2) * 12]; [kL] = ik(hip[0], hip[1], fL[0], fL[1], 58, 58, 1); [kR] = ik(hip[0], hip[1], fR[0], fR[1], 58, 58, 1); }
    else { fL = [-34, 0]; fR = [34, 0]; [kL] = ik(hip[0], hip[1], fL[0], fL[1], 58, 58, 1); [kR] = ik(hip[0], hip[1], fR[0], fR[1], 58, 58, -1); }
    L([fL, kL, hip]); L([fR, kR, hip]);
    // ---- body ----
    const lean = pose === 'run' ? 14 : pose === 'fly' ? 0 : 0;
    const neck = [hip[0] + lean, hip[1] - 96 + breathe], sh = [neck[0], neck[1] + 18];
    L([hip, neck]);
    // ---- arms ----
    const w = (k) => Math.sin(t * k + seed);
    let hL = [sh[0] - 46, sh[1] + 78 + w(2) * 3], hR = [sh[0] + 46, sh[1] + 78 + w(2.3) * 3];
    switch (gesture) {
      case 'point': hR = [sh[0] + 128 * dir, sh[1] - 34]; if (dir < 0) { hL = [sh[0] - 128, sh[1] - 34]; hR = [sh[0] + 46, sh[1] + 78]; } break;
      case 'pointUp': hR = [sh[0] + 60, sh[1] - 120]; break;
      case 'wave': hR = [sh[0] + 92 + w(11) * 26, sh[1] - 92]; break;
      case 'shrug': hL = [sh[0] - 92, sh[1] - 18]; hR = [sh[0] + 92, sh[1] - 18]; break;
      case 'cheer': hL = [sh[0] - 70, sh[1] - 120 + w(9) * 8]; hR = [sh[0] + 70, sh[1] - 120 - w(9) * 8]; break;
      case 'cup': hR = [sh[0] + 66, sh[1] + 30]; hL = [sh[0] - 44, sh[1] + 76]; break;
      case 'flail': hL = [sh[0] - 90 + w(13) * 30, sh[1] - 80 + w(11) * 40]; hR = [sh[0] + 80 + w(12) * 30, sh[1] - 90 + w(14) * 40]; break;
      case 'brace': hL = [sh[0] + 92 * dir, sh[1] + 10]; hR = [sh[0] + 104 * dir, sh[1] + 30]; break;
      case 'think': hR = [sh[0] + 22, sh[1] - 34]; hL = [sh[0] - 10, sh[1] + 50]; break;
      case 'hold': hL = [sh[0] - 70, sh[1] - 60]; hR = [sh[0] + 70, sh[1] - 60]; break;
      default: break;
    }
    const [eL] = ik(sh[0], sh[1], hL[0], hL[1], 66, 66, hL[1] > sh[1] ? 1 : -1), [eR] = ik(sh[0], sh[1], hR[0], hR[1], 66, 66, hR[1] > sh[1] ? -1 : 1);
    L([sh, eL, hL]); L([sh, eR, hR]);
    if (gesture === 'cup') { ctx.save(); ctx.translate(hR[0] + 18, hR[1] - 10); ctx.rotate(cup * 0.9); P.icon(ctx, 'cup', 0, 0, 30, { color: C.chalk, seed: 91 }); ctx.restore(); }
    // ---- scarf (gold) ----
    const fl = (k) => Math.sin(t * 8 + k) * 10 * clamp(wind);
    P.stroke(ctx, (c) => { c.beginPath(); c.ellipse(neck[0], neck[1] + 6, 30, 11, 0, 0, 7); }, C.gold, 9, 1, { seed: 95 });
    P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(neck[0] - 14, neck[1] + 12); c.quadraticCurveTo(neck[0] - 40 - 50 * wind, neck[1] + 20 + fl(0) - 30 * (wind - 0.3), neck[0] - 70 - 80 * wind, neck[1] + 34 + fl(1.5) - 50 * (wind - 0.3)); }, C.gold, 12, 1, { seed: 96 });
    // ---- head ----
    const hc = [neck[0] + look * 4, neck[1] - 46], R = 46;
    P.stroke(ctx, (c) => { c.beginPath(); c.arc(hc[0], hc[1], R, 0, 7); }, color, lw, 1, { fill: '#1A2742', fillA: 1, seed: 97 });
    const blink = (t * 0.37 + seed * 0.29) % 1 < 0.04; const ex = look * 9, ey = lookY * 7 - 6;
    for (const sx of [-15, 15]) { const px = hc[0] + sx + ex, py = hc[1] + ey;
      if (eyes === 'happy') P.stroke(ctx, (c) => { c.beginPath(); c.arc(px, py + 5, 8, Math.PI * 1.15, Math.PI * 1.85); }, color, 5, 1, { dash: false });
      else if (eyes === 'closed' || blink) P.line(ctx, px - 7, py, px + 7, py, color, 5, 1, 1, { dash: false });
      else { const big = eyes === 'wide' ? 1.6 : 1; ctx.save(); ctx.fillStyle = color; ctx.beginPath(); ctx.arc(px, py, 5.5 * big, 0, 7); ctx.fill(); ctx.restore();
        if (eyes === 'wide') P.circle(ctx, px, py, 13, color, 3, 0.8, { dash: false });
        if (eyes === 'worried') P.line(ctx, px - 10, py - 18 + (sx < 0 ? 6 : -2), px + 10, py - 18 + (sx < 0 ? -2 : 6), color, 4, 1, 1, { dash: false }); } }
    const mx = hc[0] + ex * 0.8, my = hc[1] + 20 + lookY * 4;
    if (typeof mouth === 'number') { const m = clamp(mouth); ctx.save(); ctx.fillStyle = '#0B1222'; ctx.strokeStyle = color; ctx.lineWidth = 4.5; ctx.beginPath(); ctx.ellipse(mx, my, 9 + 3 * m, 2.5 + 11 * m, 0, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); }
    else if (mouth === 'o') P.circle(ctx, mx, my + 2, 8, color, 4.5, 1, { dash: false });
    else if (mouth === 'flat') P.line(ctx, mx - 10, my, mx + 10, my, color, 4.5, 1, 1, { dash: false });
    else if (mouth === 'frown') P.stroke(ctx, (c) => { c.beginPath(); c.arc(mx, my + 10, 11, Math.PI * 1.2, Math.PI * 1.8); }, color, 4.5, 1, { dash: false });
    else P.stroke(ctx, (c) => { c.beginPath(); c.arc(mx, my - 6, 13, Math.PI * 0.2, Math.PI * 0.8); }, color, 4.5, 1, { dash: false });
    if (sweat > 0) { ctx.save(); ctx.globalAlpha *= sweat; ctx.fillStyle = C.sky; const dy = ((t * 1.3) % 1) * 30; ctx.beginPath(); ctx.moveTo(hc[0] + 44, hc[1] - 20 + dy); ctx.quadraticCurveTo(hc[0] + 56, hc[1] - 2 + dy, hc[0] + 44, hc[1] + 4 + dy); ctx.quadraticCurveTo(hc[0] + 32, hc[1] - 2 + dy, hc[0] + 44, hc[1] - 20 + dy); ctx.fill(); ctx.restore(); }
    ctx.restore();
  };
  Ch.axelMouth = (t, rest = 'smile') => { const m = P.talk(t); return m > 0.06 ? m : rest; };
})();
