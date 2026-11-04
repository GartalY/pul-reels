// Ch.luna — the episode's guide: a small flat cartoon Moon who lip-syncs to the narration and reacts.
// Origin = centre, radius 100 at s=1. o: {x,y,s,t,rot,eyes 'normal'|'happy'|'wide'|'worried'|'closed'|'sleepy',
// look (-1..1), lookY, mouth (0..1 open) | 'smile'|'o'|'frown'|'flat', armL, armR (radians, + = up), wave (0..1),
// blush, alpha, sx, sy, glow, float (bob amount), seed}
(function () {
  const G = globalThis.G, U = globalThis.U, Ch = globalThis.Ch, P = globalThis.P;
  const INK = '#1B2350';
  Ch.luna = (ctx, o = {}) => {
    const { x = 0, y = 0, s = 1, t = G.t, rot = 0, eyes = 'normal', look = 0, lookY = 0, mouth = 'smile', armL = -0.5, armR = -0.5, wave = 0,
      blush = 0.6, alpha = 1, sx = 1, sy = 1, glow = 0.6, float = 1, seed = 3 } = o;
    if (alpha <= 0.01 || s <= 0.01) return;
    ctx.save(); ctx.translate(x, y + Math.sin(t * 1.9 + seed) * 8 * float * s); ctx.rotate(rot + Math.sin(t * 1.3 + seed) * 0.03 * float); ctx.scale(s * sx, s * sy);
    if (alpha < 1) ctx.globalAlpha *= alpha;
    const R = 100;
    if (glow) P.glow(ctx, 0, 0, R * 2.6, 'rgba(210,225,255,', glow * 0.4);
    // arms (behind the body): shoulder at the side, a round little hand
    const arm = (side, a) => { const sxh = side * R * 0.92, syh = R * 0.15; const L = R * 0.62; const wv = side > 0 ? Math.sin(t * 9) * 0.35 * wave : 0;
      const ang = Math.PI / 2 - side * (Math.PI / 2 + a + wv); const hx = sxh + Math.cos(ang) * L * side * -1 * -1, hy = syh + Math.sin(ang) * L;
      const ex = sxh + side * L * Math.cos(a + wv) , ey = syh - L * Math.sin(a + wv);
      ctx.strokeStyle = '#CFC8BC'; ctx.lineWidth = 15; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(sxh * 0.8, syh); ctx.quadraticCurveTo(sxh + side * L * 0.5, syh - L * 0.1 * Math.sin(a), ex, ey); ctx.stroke();
      ctx.fillStyle = '#E9E4DA'; ctx.beginPath(); ctx.arc(ex, ey, 15, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(27,35,80,0.35)'; ctx.lineWidth = 3; ctx.stroke(); void hx; void hy; };
    arm(-1, armL); arm(1, armR);
    // body
    const g = ctx.createRadialGradient(-R * 0.38, -R * 0.42, R * 0.1, 0, 0, R * 1.02); g.addColorStop(0, '#FBF8F1'); g.addColorStop(0.65, '#E2DCD0'); g.addColorStop(1, '#B9B1A4');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, R, 0, 7); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(0, 0, R, 0, 7); ctx.clip();
    for (const [cx, cy, cr] of [[-52, -48, 17], [58, -58, 11], [62, 34, 20], [-66, 40, 12], [10, 70, 14], [30, -82, 8]]) {
      ctx.fillStyle = 'rgba(150,140,126,0.35)'; ctx.beginPath(); ctx.arc(cx, cy, cr, 0, 7); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.beginPath(); ctx.arc(cx - cr * 0.2, cy - cr * 0.25, cr * 0.65, 0, 7); ctx.fill(); }
    ctx.fillStyle = 'rgba(40,45,80,0.12)'; ctx.beginPath(); ctx.arc(R * 0.35, R * 0.35, R * 1.0, 0, 7); ctx.arc(-R * 0.1, -R * 0.1, R * 1.05, 0, 7, true); ctx.fill('evenodd');
    ctx.restore();
    ctx.strokeStyle = 'rgba(27,35,80,0.30)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, R, 0, 7); ctx.stroke();
    // blush
    if (blush > 0) { ctx.fillStyle = `rgba(245,140,150,${0.45 * blush})`; for (const bx of [-50, 50]) { ctx.beginPath(); ctx.ellipse(bx, 22, 17, 10, 0, 0, 7); ctx.fill(); } }
    // eyes
    const blink = (t * 0.45 + seed * 0.37) % 1 < 0.035;
    const ey = -14 + lookY * 5;
    for (const ex of [-34, 34]) {
      ctx.save(); ctx.translate(ex + look * 6, ey);
      if (eyes === 'happy' || blink || eyes === 'closed') {
        ctx.strokeStyle = INK; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath();
        if (eyes === 'happy') ctx.arc(0, 6, 14, Math.PI * 1.15, Math.PI * 1.85); else { ctx.moveTo(-13, 2); ctx.lineTo(13, 2); }
        ctx.stroke();
      } else {
        const big = eyes === 'wide' ? 1.25 : 1, h = eyes === 'sleepy' ? 0.55 : 1;
        ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.ellipse(0, 0, 16 * big, 20 * big * h, 0, 0, 7); ctx.fill(); ctx.strokeStyle = 'rgba(27,35,80,0.5)'; ctx.lineWidth = 3; ctx.stroke();
        ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(look * 6, lookY * 6 + 2, 9.5 * big, 0, 7); ctx.fill();
        ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(look * 6 + 3.5, lookY * 6 - 2, 3.4, 0, 7); ctx.fill();
        if (eyes === 'worried') { ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-14, -28 + (ex < 0 ? 6 : -2)); ctx.lineTo(14, -28 + (ex < 0 ? -2 : 6)); ctx.stroke(); }
        if (eyes === 'sleepy') { ctx.fillStyle = '#D8D1C5'; ctx.fillRect(-18, -24, 36, 18); }
      }
      ctx.restore();
    }
    // mouth
    ctx.save(); ctx.translate(0, 36); ctx.strokeStyle = INK; ctx.lineCap = 'round'; ctx.lineWidth = 6;
    if (typeof mouth === 'number' && mouth > 0.06) {
      const h = 6 + mouth * 22, w = 15 + mouth * 4; ctx.fillStyle = '#5A2333'; ctx.beginPath(); ctx.ellipse(0, 2, w, h / 2 + 2, 0, 0, 7); ctx.fill();
      ctx.fillStyle = '#F07A8A'; ctx.beginPath(); ctx.ellipse(0, h / 2 - 2, w * 0.55, h * 0.22 + 1, 0, 0, 7); ctx.fill();
    } else if (mouth === 'o') { ctx.fillStyle = '#5A2333'; ctx.beginPath(); ctx.ellipse(0, 2, 11, 14, 0, 0, 7); ctx.fill(); }
    else if (mouth === 'frown') { ctx.beginPath(); ctx.arc(0, 16, 16, Math.PI * 1.2, Math.PI * 1.8); ctx.stroke(); }
    else if (mouth === 'flat') { ctx.beginPath(); ctx.moveTo(-12, 4); ctx.lineTo(12, 4); ctx.stroke(); }
    else { ctx.beginPath(); ctx.arc(0, -6, 18, Math.PI * 0.2, Math.PI * 0.8); ctx.stroke(); }
    ctx.restore();
    ctx.restore();
  };
  // talking helper: open-mouth amount from the mouth track when inside a line range, else a resting mouth
  Ch.lunaMouth = (t, rest = 'smile') => { const m = P.talk(t); return m > 0.06 ? m : rest; };
})();
