// Ch.nova — the episode's guide: a small neon star who lip-syncs to the narration and reacts.
// Origin = centre, radius 100 at s=1. o: {x,y,s,t,rot,eyes 'normal'|'happy'|'wide'|'worried'|'closed', look, lookY,
// mouth (0..1 open) | 'smile'|'o'|'frown'|'flat', wave (0..1), a, glow, float, shades (0..1), sweat (0..1), goggles (0..1), seed}
// Also P.bust(ctx, who, x, y, s, a): neon line portraits of the people in the story (no likeness claimed; icons).
(function () {
  const G = globalThis.G, U = globalThis.U, Ch = globalThis.Ch, P = globalThis.P; const C = P.C;
  const starPath = (c, R, r, wave, t) => {
    c.beginPath();
    for (let i = 0; i < 10; i++) {
      let an = -Math.PI / 2 + i * Math.PI / 5; const outer = i % 2 === 0; let rr = outer ? R : r;
      if (i === 2) an += Math.sin(t * 10) * 0.18 * wave;           // right arm waves
      const px = Math.cos(an) * rr, py = Math.sin(an) * rr; i ? c.lineTo(px, py) : c.moveTo(px, py);
    }
    c.closePath();
  };
  Ch.nova = (ctx, o = {}) => {
    const { x = 0, y = 0, s = 1, t = G.t, rot = 0, eyes = 'normal', look = 0, lookY = 0, mouth = 'smile', wave = 0, a = 1, glow = 1, float = 1,
      shades = 0, sweat = 0, goggles = 0, seed = 2, color = C.gold } = o;
    if (a <= 0.01 || s <= 0.01) return;
    ctx.save(); ctx.translate(x, y + Math.sin(t * 2.1 + seed) * 7 * float * s); ctx.rotate(rot + Math.sin(t * 1.4 + seed) * 0.04 * float); ctx.scale(s, s);
    if (a < 1) ctx.globalAlpha *= a;
    const R = 112, r = 62;
    if (glow) P.glow(ctx, 0, 0, R * 2.4, color, 0.45 * glow);
    // body: rounded star (draw with round joins and a fat fill)
    ctx.save(); ctx.lineJoin = 'round'; starPath(ctx, R * 0.92, r * 0.95, wave, t);
    const g = ctx.createRadialGradient(-20, -25, 8, 0, 0, R); g.addColorStop(0, '#FFF6D2'); g.addColorStop(0.6, '#FFD66B'); g.addColorStop(1, '#FFAA3C');
    ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = 26; ctx.strokeStyle = '#FFC85A'; ctx.stroke(); ctx.restore();
    P.tube(ctx, (c) => { c.lineJoin = 'round'; starPath(c, R * 1.02, r * 1.05, wave, t); }, color, 5, 1, { core: false });
    // blush
    ctx.fillStyle = 'rgba(255,110,140,0.45)'; for (const bx of [-38, 38]) { ctx.beginPath(); ctx.ellipse(bx, 26, 13, 8, 0, 0, 7); ctx.fill(); }
    // eyes
    const blink = (t * 0.43 + seed * 0.31) % 1 < 0.035; const ey = -4 + lookY * 4;
    for (const ex of [-26, 26]) {
      ctx.save(); ctx.translate(ex + look * 5, ey);
      if (eyes === 'happy' || eyes === 'closed' || blink) { ctx.strokeStyle = '#3A1A10'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); if (eyes === 'happy') ctx.arc(0, 5, 11, Math.PI * 1.15, Math.PI * 1.85); else { ctx.moveTo(-10, 2); ctx.lineTo(10, 2); } ctx.stroke(); }
      else { const big = eyes === 'wide' ? 1.25 : 1; ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.ellipse(0, 0, 12 * big, 16 * big, 0, 0, 7); ctx.fill();
        ctx.fillStyle = '#2A1440'; ctx.beginPath(); ctx.arc(look * 4, lookY * 5 + 2, 7.5 * big, 0, 7); ctx.fill(); ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.arc(look * 4 + 2.6, lookY * 5 - 1.5, 2.6, 0, 7); ctx.fill();
        if (eyes === 'worried') { ctx.strokeStyle = '#3A1A10'; ctx.lineWidth = 4.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-11, -24 + (ex < 0 ? 5 : -2)); ctx.lineTo(11, -24 + (ex < 0 ? -2 : 5)); ctx.stroke(); } }
      ctx.restore();
    }
    // sunglasses (blazing-sky gag)
    if (shades > 0.01) { ctx.save(); ctx.globalAlpha *= shades; ctx.translate(0, -60 * (1 - shades)); ctx.fillStyle = '#120A1E'; for (const ex of [-27, 27]) { P.rr(ctx, ex - 22, -18, 44, 30, 9); ctx.fill(); }
      ctx.fillRect(-8, -10, 16, 5); ctx.strokeStyle = C.cyan; ctx.lineWidth = 2; for (const ex of [-27, 27]) { ctx.beginPath(); ctx.moveTo(ex - 14, -12); ctx.lineTo(ex - 4, -12); ctx.stroke(); } ctx.restore(); }
    // microwave goggles
    if (goggles > 0.01) { ctx.save(); ctx.globalAlpha *= goggles; ctx.translate(0, -60 * (1 - goggles)); ctx.fillStyle = 'rgba(255,95,210,0.55)'; ctx.strokeStyle = C.magenta; ctx.lineWidth = 5;
      for (const ex of [-27, 27]) { ctx.beginPath(); ctx.arc(ex, -2, 22, 0, 7); ctx.fill(); ctx.stroke(); } ctx.beginPath(); ctx.moveTo(-5, -2); ctx.lineTo(5, -2); ctx.moveTo(-49, -2); ctx.lineTo(-70, -6); ctx.moveTo(49, -2); ctx.lineTo(70, -6); ctx.stroke(); ctx.restore(); }
    // mouth
    ctx.save(); ctx.translate(0, 34); ctx.strokeStyle = '#3A1A10'; ctx.lineCap = 'round'; ctx.lineWidth = 5;
    if (typeof mouth === 'number' && mouth > 0.06) { const h = 5 + mouth * 18, w = 12 + mouth * 3; ctx.fillStyle = '#5A1E2E'; ctx.beginPath(); ctx.ellipse(0, 2, w, h / 2 + 2, 0, 0, 7); ctx.fill(); ctx.fillStyle = '#FF7A8C'; ctx.beginPath(); ctx.ellipse(0, h / 2 - 1, w * 0.55, h * 0.2 + 1, 0, 0, 7); ctx.fill(); }
    else if (mouth === 'o') { ctx.fillStyle = '#5A1E2E'; ctx.beginPath(); ctx.ellipse(0, 2, 9, 12, 0, 0, 7); ctx.fill(); }
    else if (mouth === 'frown') { ctx.beginPath(); ctx.arc(0, 14, 13, Math.PI * 1.2, Math.PI * 1.8); ctx.stroke(); }
    else if (mouth === 'flat') { ctx.beginPath(); ctx.moveTo(-10, 4); ctx.lineTo(10, 4); ctx.stroke(); }
    else { ctx.beginPath(); ctx.arc(0, -5, 15, Math.PI * 0.2, Math.PI * 0.8); ctx.stroke(); }
    ctx.restore();
    // sweat drops (oven gag)
    if (sweat > 0.01) for (let i = 0; i < 3; i++) { const ph = (t * 1.3 + i * 0.33) % 1; ctx.save(); ctx.globalAlpha *= sweat * (1 - ph); ctx.fillStyle = C.cyan; ctx.beginPath(); const sx = [-70, 66, 80][i], sy = -30 + i * 14 + ph * 50; ctx.moveTo(sx, sy - 12); ctx.quadraticCurveTo(sx + 9, sy + 4, sx, sy + 8); ctx.quadraticCurveTo(sx - 9, sy + 4, sx, sy - 12); ctx.fill(); ctx.restore(); }
    ctx.restore();
  };
  Ch.novaMouth = (t, rest = 'smile') => { const m = P.talk(t); return m > 0.06 ? m : rest; };

  // ---------- neon portraits ----------
  const PEOPLE = {
    kepler: { color: C.cyan }, halley: { color: C.violet }, cheseaux: { color: C.green }, olbers: { color: C.gold }, poe: { color: C.magenta },
    kelvin: { color: C.coral }, penzias: { color: C.cyan }, wilson: { color: C.green }, you: { color: C.white },
  };
  P.bust = (ctx, who, x, y, s = 1, a = 1, t = G.t) => {
    if (a <= 0.01 || s <= 0.01) return; const col = (PEOPLE[who] || PEOPLE.you).color;
    const T = (fn, c = col, lw = 5) => P.tube(ctx, (cx) => { cx.save(); cx.translate(x, y); cx.scale(s, s); fn(cx); cx.restore(); }, c, lw * s, a, { fill: '#0A0820', fillA: 0.9 });
    const L = (fn, c = col, lw = 5) => P.tube(ctx, (cx) => { cx.save(); cx.translate(x, y); cx.scale(s, s); fn(cx); cx.restore(); }, c, lw * s, a);
    // shoulders + head
    T((c) => { c.beginPath(); c.moveTo(-120, 150); c.quadraticCurveTo(-118, 40, -40, 30); c.lineTo(40, 30); c.quadraticCurveTo(118, 40, 120, 150); c.closePath(); });
    T((c) => { c.beginPath(); c.ellipse(0, -40, 52, 64, 0, 0, 7); });
    // eyes (dots) + mouth line
    L((c) => { c.beginPath(); c.arc(-18, -46, 3, 0, 7); c.moveTo(21, -46); c.arc(18, -46, 3, 0, 7); }, C.white, 4);
    switch (who) {
      case 'kepler': L((c) => { c.beginPath(); for (let i = 0; i <= 16; i++) { const xx = -70 + i * 140 / 16, yy = 32 + (i % 2 ? 18 : 0); i ? c.lineTo(xx, yy) : c.moveTo(xx, yy); } c.moveTo(-26, 0); c.quadraticCurveTo(0, 50, 26, 0); c.moveTo(-50, -70); c.quadraticCurveTo(0, -120, 50, -70); }); break;
      case 'halley': L((c) => { for (const sd of [-1, 1]) { c.moveTo(sd * 45, -95); for (let i = 1; i <= 6; i++) c.quadraticCurveTo(sd * (62 + (i % 2) * 18), -95 + i * 22 - 11, sd * 58, -95 + i * 22); } c.moveTo(-45, -95); c.quadraticCurveTo(0, -125, 45, -95); c.moveTo(-14, -8); c.quadraticCurveTo(0, 0, 14, -8); }); break;
      case 'cheseaux': L((c) => { c.beginPath(); c.moveTo(-50, -75); c.quadraticCurveTo(0, -115, 50, -75); c.moveTo(-12, -8); c.lineTo(12, -8); c.moveTo(-30, 45); c.lineTo(0, 70); c.lineTo(30, 45); }); break;
      case 'olbers': L((c) => { c.beginPath(); c.moveTo(-40, -95); c.quadraticCurveTo(0, -112, 40, -95); c.moveTo(-36, 34); c.lineTo(-30, 70); c.moveTo(36, 34); c.lineTo(30, 70); c.moveTo(-26, 44); c.quadraticCurveTo(0, 62, 26, 44); c.moveTo(-14, -8); c.quadraticCurveTo(0, 2, 14, -8); }); break;
      case 'poe': L((c) => { c.beginPath(); c.moveTo(-52, -60); c.quadraticCurveTo(-30, -125, 40, -100); c.quadraticCurveTo(60, -90, 52, -60); c.moveTo(-24, -14); c.quadraticCurveTo(-8, -26, 0, -16); c.quadraticCurveTo(8, -26, 24, -14); c.moveTo(-14, 4); c.lineTo(14, 4); c.moveTo(-28, 40); c.lineTo(0, 62); c.lineTo(28, 40); }); break;
      case 'kelvin': L((c) => { c.beginPath(); c.moveTo(-50, -30); c.quadraticCurveTo(-60, 40, 0, 48); c.quadraticCurveTo(60, 40, 50, -30); c.moveTo(-30, -10); c.quadraticCurveTo(0, 6, 30, -10); c.moveTo(-48, -80); c.quadraticCurveTo(0, -110, 48, -80); }); break;
      case 'penzias': L((c) => { c.beginPath(); c.arc(-18, -46, 15, 0, 7); c.moveTo(33, -46); c.arc(18, -46, 15, 0, 7); c.moveTo(-14, -6); c.quadraticCurveTo(0, 2, 14, -6); c.moveTo(0, 32); c.lineTo(-10, 90); c.lineTo(0, 110); c.lineTo(10, 90); c.closePath(); c.moveTo(-48, -78); c.quadraticCurveTo(0, -112, 48, -78); }); break;
      case 'wilson': L((c) => { c.beginPath(); c.moveTo(-14, -6); c.quadraticCurveTo(0, 2, 14, -6); c.moveTo(0, 32); c.lineTo(-10, 90); c.lineTo(0, 110); c.lineTo(10, 90); c.closePath(); c.moveTo(-52, -70); c.lineTo(-40, -102); c.lineTo(40, -102); c.lineTo(52, -70); }); break;
      default: L((c) => { c.beginPath(); c.moveTo(-14, -6); c.quadraticCurveTo(0, 4, 14, -6); });
    }
  };
  P.PEOPLE = PEOPLE;
})();
