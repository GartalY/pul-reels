// Whyverse trend Short 2026-11-11 — paper cut-out props (factory, smoke, solar, wind, EV, oil barrel, fire,
// trees, bathtub, CO2 bubbles, globe, budget bar, people, calendar). Pure functions of t; no boil, no shake.
(function () {
  const G = globalThis.G, U = globalThis.U, P = globalThis.P;
  const { clamp, lerp, ease } = U; const C = P.C;
  const rr = (ctx, x, y, w, h, r) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); };
  P.rr = rr;

  // smoke puffs rising from (x,y); rate 0..1 scales size/number
  P.smoke = (ctx, x, y, t, { rate = 1, color = C.smoke, h = 420, seed = 0 } = {}) => {
    for (let i = 0; i < 9; i++) {
      const u = ((t * 0.35 + i / 9 + U.hash(i, seed) * 0.05) % 1);
      const r = (26 + 70 * u) * (0.45 + 0.55 * rate);
      const px = x + Math.sin(u * 5 + i + seed) * 26 + u * 70, py = y - u * h;
      ctx.save(); ctx.globalAlpha = (1 - u) * 0.9 * clamp(rate * 1.5);
      P.cut(ctx, color, () => { ctx.beginPath(); ctx.arc(px, py, r, 0, 7); }, { edge: 0, sh: 0.6 }); ctx.restore();
    }
  };
  P.factory = (ctx, x, y, s, t, { smoke = 1, seed = 0 } = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    P.smoke(ctx, 95, -300, t, { rate: smoke, seed });
    P.smoke(ctx, 175, -250, t + 0.6, { rate: smoke * 0.8, seed: seed + 3, h: 360 });
    P.cut(ctx, '#B5543C', () => { ctx.beginPath(); ctx.rect(70, -300, 50, 300); ctx.rect(155, -250, 42, 250); });
    P.cut(ctx, '#C9C2B2', () => { ctx.beginPath(); ctx.moveTo(-160, 0); ctx.lineTo(-160, -150); ctx.lineTo(-90, -110); ctx.lineTo(-90, -150); ctx.lineTo(-20, -110); ctx.lineTo(-20, -150); ctx.lineTo(50, -110); ctx.lineTo(220, -110); ctx.lineTo(220, 0); ctx.closePath(); });
    for (let i = 0; i < 4; i++) P.cut(ctx, C.yellow, () => rr(ctx, -135 + i * 85, -80, 46, 40, 6), { edge: 2, sh: 0.3 });
    ctx.restore();
  };
  // CO2 bubble
  P.co2 = (ctx, x, y, r, { color = C.smoke, alpha = 1 } = {}) => {
    ctx.save(); ctx.globalAlpha *= alpha;
    P.cut(ctx, color, () => { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); }, { edge: 2, sh: 0.5 });
    G.text(ctx, 'CO₂', x, y + r * 0.22, { size: r * 0.62, fam: P.FT.title, color: '#FFF8EA', align: 'center', boil: 0 });
    ctx.restore();
  };
  P.solar = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    P.cut(ctx, '#7A7F8C', () => { ctx.beginPath(); ctx.rect(-8, -10, 16, 90); });
    P.cut(ctx, '#2F4E8C', () => { ctx.beginPath(); ctx.moveTo(-120, -10); ctx.lineTo(120, -10); ctx.lineTo(90, -110); ctx.lineTo(-90, -110); ctx.closePath(); });
    ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 3; ctx.beginPath();
    for (let k = 1; k < 4; k++) { const u = k / 4; ctx.moveTo(lerp(-120, -90, 0) + 240 * u - 30 * u * 0, -10); ctx.lineTo(-90 + 180 * u, -110); }
    ctx.moveTo(-105, -60); ctx.lineTo(105, -60); ctx.stroke();
    ctx.restore();
  };
  P.turbine = (ctx, x, y, s, t) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    P.cut(ctx, '#F7F3EA', () => { ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(10, 0); ctx.lineTo(5, -260); ctx.lineTo(-5, -260); ctx.closePath(); });
    ctx.translate(0, -260); ctx.rotate(t * 2.2);
    for (let k = 0; k < 3; k++) { ctx.save(); ctx.rotate(k * 2.094); P.cut(ctx, '#F7F3EA', () => { ctx.beginPath(); ctx.moveTo(0, -8); ctx.quadraticCurveTo(30, -60, 6, -150); ctx.lineTo(-6, -150); ctx.lineTo(-8, 0); ctx.closePath(); }); ctx.restore(); }
    P.cut(ctx, C.ink, () => { ctx.beginPath(); ctx.arc(0, 0, 12, 0, 7); }, { edge: 0 });
    ctx.restore();
  };
  P.car = (ctx, x, y, s, t, { color = C.cyan, plug = true } = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    P.cut(ctx, color, () => { ctx.beginPath(); ctx.moveTo(-130, -20); ctx.lineTo(-120, -60); ctx.lineTo(-60, -65); ctx.lineTo(-30, -110); ctx.lineTo(60, -110); ctx.lineTo(95, -65); ctx.lineTo(130, -55); ctx.lineTo(135, -20); ctx.closePath(); });
    P.cut(ctx, '#CFE8F2', () => { ctx.beginPath(); ctx.moveTo(-18, -100); ctx.lineTo(55, -100); ctx.lineTo(80, -68); ctx.lineTo(-40, -68); ctx.closePath(); }, { edge: 2, sh: 0 });
    for (const wx of [-75, 80]) { P.cut(ctx, C.ink, () => { ctx.beginPath(); ctx.arc(wx, -18, 28, 0, 7); }, { edge: 0 }); ctx.save(); ctx.translate(wx, -18); ctx.rotate(t * 6); ctx.fillStyle = '#C9C2B2'; ctx.fillRect(-12, -3, 24, 6); ctx.restore(); }
    if (plug) { ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.moveTo(-10, -60); ctx.lineTo(8, -60); ctx.lineTo(0, -42); ctx.lineTo(14, -42); ctx.lineTo(-8, -10); ctx.lineTo(-2, -32); ctx.lineTo(-16, -32); ctx.closePath(); ctx.fill(); }
    ctx.restore();
  };
  P.barrel = (ctx, x, y, s) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    P.cut(ctx, '#3D3B45', () => { rr(ctx, -70, -190, 140, 190, 18); });
    ctx.fillStyle = '#5A5866'; for (const yy of [-150, -60]) ctx.fillRect(-70, yy, 140, 12);
    G.text(ctx, 'OIL', 0, -88, { size: 44, fam: P.FT.title, color: C.yellow, align: 'center', boil: 0 });
    ctx.restore();
  };
  P.flame = (ctx, x, y, s, t, seed = 0) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const f = (w, h, col, k) => { const wob = Math.sin(t * 9 + seed + k) * 6; P.cut(ctx, col, () => { ctx.beginPath(); ctx.moveTo(-w, 0); ctx.quadraticCurveTo(-w * 1.1, -h * 0.5, wob, -h); ctx.quadraticCurveTo(w * 1.1, -h * 0.5, w, 0); ctx.closePath(); }, { edge: 0, sh: 0.4 }); };
    f(60, 170, C.red, 0); f(42, 120, C.coral, 1); f(24, 70, C.yellow, 2);
    ctx.restore();
  };
  P.tree = (ctx, x, y, s, { fall = 0, color = C.green } = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(fall * 1.45); ctx.scale(s, s);
    P.cut(ctx, '#7A4E2D', () => { ctx.beginPath(); ctx.rect(-12, -110, 24, 110); });
    P.cut(ctx, color, () => { ctx.beginPath(); ctx.moveTo(0, -300); ctx.lineTo(80, -150); ctx.lineTo(45, -150); ctx.lineTo(95, -70); ctx.lineTo(-95, -70); ctx.lineTo(-45, -150); ctx.lineTo(-80, -150); ctx.closePath(); });
    ctx.restore();
  };
  // bathtub with tap: flow 0..1 (stream width), level 0..1 (water height)
  P.tub = (ctx, cx, cy, t, { flow = 1, level = 0.3, w = 640, h = 330, label = true, turn = 0 } = {}) => {
    const x0 = cx - w / 2, y0 = cy - h / 2;
    // tap + pipe (top right)
    const tx = cx + w * 0.3, ty = y0 - 190;
    P.cut(ctx, '#B9BCC4', () => { ctx.beginPath(); ctx.rect(tx + 60, ty - 30, 26, 260); ctx.rect(tx - 10, ty - 30, 96, 30); ctx.rect(tx - 10, ty - 30, 30, 70); });
    // handle (turns)
    ctx.save(); ctx.translate(tx + 73, ty - 55); ctx.rotate(turn); P.cut(ctx, C.red, () => { ctx.beginPath(); ctx.rect(-48, -10, 96, 20); ctx.rect(-10, -30, 20, 30); }); ctx.restore();
    // stream
    const sw = 6 + 30 * flow; const top = ty + 40, bot = y0 + h * (1 - level) + 10;
    if (flow > 0.01) { ctx.save(); ctx.fillStyle = P.rgba(C.water, 0.9); ctx.fillRect(tx + 5 - sw / 2, top, sw, Math.max(0, bot - top));
      ctx.fillStyle = 'rgba(255,255,255,0.5)'; for (let k = 0; k < 6; k++) { const u = ((t * 2.4 + k / 6) % 1); ctx.fillRect(tx + 5 - sw * 0.2, top + u * (bot - top), Math.max(2, sw * 0.2), 22); } ctx.restore(); }
    // tub body (back)
    ctx.save(); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + w, y0); ctx.quadraticCurveTo(x0 + w, y0 + h, x0 + w - 90, y0 + h); ctx.lineTo(x0 + 90, y0 + h); ctx.quadraticCurveTo(x0, y0 + h, x0, y0); ctx.closePath();
    ctx.save(); ctx.shadowColor = 'rgba(40,25,10,0.25)'; ctx.shadowOffsetX = 6; ctx.shadowOffsetY = 10; ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.restore();
    ctx.clip();
    // water
    const wy = y0 + h * (1 - level);
    ctx.fillStyle = P.rgba(C.water, 0.85); ctx.beginPath(); ctx.moveTo(x0, wy);
    for (let k = 0; k <= 24; k++) { const xx = x0 + (w * k) / 24; ctx.lineTo(xx, wy + Math.sin(k * 0.9 + t * 4) * 5); }
    ctx.lineTo(x0 + w, y0 + h); ctx.lineTo(x0, y0 + h); ctx.closePath(); ctx.fill();
    if (label) { // bubbles in water
      for (let k = 0; k < 7; k++) { const u = ((t * 0.25 + k / 7) % 1); const bx = x0 + 60 + (w - 120) * U.hash(k, 21), by = lerp(y0 + h - 30, wy + 25, u); if (by > wy + 20) { ctx.globalAlpha = 0.85; P.co2(ctx, bx, by, 22, { color: '#2F6FB5' }); ctx.globalAlpha = 1; } }
    }
    ctx.restore();
    ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x0 - 20, y0); ctx.lineTo(x0 + w + 20, y0); ctx.stroke();
    ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.quadraticCurveTo(x0, y0 + h, x0 + 90, y0 + h); ctx.lineTo(x0 + w - 90, y0 + h); ctx.quadraticCurveTo(x0 + w, y0 + h, x0 + w, y0); ctx.stroke();
    // feet
    for (const fx of [x0 + 110, x0 + w - 110]) P.cut(ctx, C.gold, () => { ctx.beginPath(); ctx.ellipse(fx, y0 + h + 22, 26, 20, 0, 0, 7); });
    ctx.restore();
    return { wy, x0, y0, w, h };
  };
  // simple globe with paper continents
  P.globe = (ctx, x, y, r, t) => {
    P.cut(ctx, C.water, () => { ctx.beginPath(); ctx.arc(x, y, r, 0, 7); });
    ctx.save(); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.clip();
    const off = (t * 30) % (r * 4);
    const blobs = [[-0.6, -0.35, 0.42, 0.3], [-0.45, 0.35, 0.22, 0.4], [0.2, -0.4, 0.35, 0.22], [0.3, 0.1, 0.22, 0.38], [0.85, -0.25, 0.4, 0.26], [0.9, 0.5, 0.2, 0.14]];
    for (const dx of [0, -r * 4]) for (const [bx, by, bw, bh] of blobs) {
      ctx.fillStyle = C.green; ctx.beginPath(); ctx.ellipse(x + bx * r * 1.4 + off + dx - r * 0.6, y + by * r, bw * r, bh * r, 0.3, 0, 7); ctx.fill();
    }
    ctx.restore();
    ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.stroke(); ctx.restore();
  };
  // little paper person icon (scientist): head + body; coat colour
  P.person = (ctx, x, y, s, col = '#FFFFFF', skin = '#E0B48A') => {
    P.cut(ctx, col, () => { ctx.beginPath(); ctx.moveTo(x - 28 * s, y + 50 * s); ctx.lineTo(x - 28 * s, y + 10 * s); ctx.quadraticCurveTo(x, y - 8 * s, x + 28 * s, y + 10 * s); ctx.lineTo(x + 28 * s, y + 50 * s); ctx.closePath(); }, { edge: 2, sh: 0.4 });
    P.cut(ctx, skin, () => { ctx.beginPath(); ctx.arc(x, y - 18 * s, 18 * s, 0, 7); }, { edge: 2, sh: 0.4 });
  };
  // report document card
  P.report = (ctx, x, y, s, t) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.04);
    P.cut(ctx, '#FFFFFF', () => rr(ctx, -170, -220, 340, 440, 12));
    ctx.fillStyle = C.cyan; ctx.fillRect(-170, -220, 340, 90);
    G.text(ctx, 'GLOBAL', 0, -180, { size: 34, fam: P.FT.title, color: '#fff', align: 'center', boil: 0 });
    G.text(ctx, 'CARBON BUDGET', 0, -142, { size: 30, fam: P.FT.title, color: '#fff', align: 'center', boil: 0 });
    G.text(ctx, '2026', 0, -70, { size: 54, fam: P.FT.title, color: C.ink, align: 'center', boil: 0 });
    ctx.fillStyle = 'rgba(43,42,51,0.25)'; for (let k = 0; k < 6; k++) ctx.fillRect(-130, -30 + k * 34, 260 - (k % 3) * 50, 10);
    // tiny bar chart
    for (let k = 0; k < 5; k++) { ctx.fillStyle = k === 4 ? C.red : C.smoke; const hh = 40 + k * 10 - (k === 4 ? 6 : 0); ctx.fillRect(-120 + k * 50, 200 - hh, 34, hh); }
    ctx.restore();
  };
  // calendar page with number
  P.cal = (ctx, x, y, s, label, col = C.red) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    P.cut(ctx, '#FFFFFF', () => rr(ctx, -70, -80, 140, 160, 10));
    ctx.fillStyle = col; ctx.fillRect(-70, -80, 140, 40);
    G.text(ctx, label, 0, 52, { size: 64, fam: P.FT.title, color: C.ink, align: 'center', boil: 0 });
    ctx.restore();
  };
  // up/down fat paper arrow
  P.fatArrow = (ctx, x, y, s, dir, col) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s * dir);
    P.cut(ctx, col, () => { ctx.beginPath(); ctx.moveTo(0, -90); ctx.lineTo(70, -10); ctx.lineTo(28, -10); ctx.lineTo(28, 80); ctx.lineTo(-28, 80); ctx.lineTo(-28, -10); ctx.lineTo(-70, -10); ctx.closePath(); });
    ctx.restore();
  };
})();
