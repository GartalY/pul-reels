// Moon test (5 s). Every visual is a pure function of t, timed from score.js.
(function () {
  const U = globalThis.U, G = globalThis.G, S = globalThis.SCORE, Studio = globalThis.Studio, Data = globalThis.Data;
  const { ev, BEAT, clock } = S; const { clamp, lerp, ease, pulse } = U;
  const W = G.W, H = G.H, SAFE = G.SAFE;
  const FONT = '"Inter", system-ui, sans-serif';
  const E = { x: 300, y: 1290, r: 195 };            // Earth
  const M0 = { x: 790, y: 760, r: 74 };             // Moon (today)
  const dir = (() => { const dx = M0.x - E.x, dy = M0.y - E.y, l = Math.hypot(dx, dy); return [dx / l, dy / l]; })();
  const nudge = (t) => ease.outBack(clamp((t - ev.nudge) / 0.6), 1.6) * 46;
  const moonPos = (t) => ({ x: M0.x + dir[0] * nudge(t), y: M0.y + dir[1] * nudge(t) });

  function sky(ctx, t) {
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#05071a'); g.addColorStop(0.6, '#0b1236'); g.addColorStop(1, '#151a44');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 260; i++) {
      const x = U.hash(i, 1) * W, y = U.hash(i, 2) * H, r = 0.7 + 2.2 * Math.pow(U.hash(i, 3), 6);
      const tw = 0.55 + 0.45 * Math.sin(t * (1 + U.hash(i, 4) * 3) + i);
      ctx.globalAlpha = (0.25 + 0.75 * U.hash(i, 5)) * tw; ctx.fillStyle = '#e8eeff'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
    // faint milky band
    const mb = ctx.createLinearGradient(0, H * 0.2, W, H * 0.75); mb.addColorStop(0, 'rgba(120,140,255,0)'); mb.addColorStop(0.5, 'rgba(150,160,255,0.07)'); mb.addColorStop(1, 'rgba(120,140,255,0)');
    ctx.fillStyle = mb; ctx.fillRect(0, 0, W, H);
  }

  function popScale(t, t0, d = 0.35) { return ease.outBack(clamp((t - t0) / d), 2.2); }

  function earth(ctx, t) {
    const s = popScale(t, ev.earth, 0.2); if (s <= 0) return;
    const r = E.r * s;
    // atmosphere glow
    const gl = ctx.createRadialGradient(E.x, E.y, r * 0.9, E.x, E.y, r * 1.35); gl.addColorStop(0, 'rgba(110,180,255,0.55)'); gl.addColorStop(1, 'rgba(110,180,255,0)');
    ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(E.x, E.y, r * 1.35, 0, 7); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(E.x, E.y, r, 0, 7); ctx.clip();
    const oc = ctx.createRadialGradient(E.x - r * 0.4, E.y - r * 0.45, r * 0.1, E.x, E.y, r * 1.1); oc.addColorStop(0, '#4fb3ff'); oc.addColorStop(0.6, '#1f6fd1'); oc.addColorStop(1, '#0b2f73');
    ctx.fillStyle = oc; ctx.fillRect(E.x - r, E.y - r, 2 * r, 2 * r);
    // drifting continents (blobby, deterministic)
    const spin = t * 18;
    for (let k = 0; k < 6; k++) {
      const cx = E.x - r + ((U.hash(k, 9) * 2.6 * r + spin) % (2.6 * r)) - 0.3 * r, cy = E.y + (U.hash(k, 8) - 0.5) * 1.4 * r;
      const pts = []; for (let a = 0; a < 18; a++) { const ang = (a / 18) * 6.283; const rr = r * (0.18 + 0.22 * U.hash(k, a)) ; pts.push([cx + Math.cos(ang) * rr * 1.3, cy + Math.sin(ang) * rr]); }
      G.shape(ctx, pts, { fill: k % 2 ? '#3fae6a' : '#5cc077', stroke: 'rgba(0,0,0,0)', lw: 0, seed: k, closed: true });
    }
    // clouds
    for (let k = 0; k < 7; k++) { const cx = E.x - r + ((U.hash(k, 19) * 2.4 * r + spin * 1.6) % (2.4 * r)), cy = E.y + (U.hash(k, 18) - 0.5) * 1.6 * r;
      ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.beginPath(); ctx.ellipse(cx, cy, r * 0.28, r * 0.07, -0.2, 0, 7); ctx.fill(); }
    // night side
    const sh = ctx.createLinearGradient(E.x - r * 0.2, E.y - r, E.x + r, E.y + r * 0.6); sh.addColorStop(0, 'rgba(3,6,25,0)'); sh.addColorStop(0.55, 'rgba(3,6,25,0.15)'); sh.addColorStop(1, 'rgba(3,6,25,0.85)');
    ctx.fillStyle = sh; ctx.fillRect(E.x - r, E.y - r, 2 * r, 2 * r);
    ctx.restore();
    ctx.strokeStyle = 'rgba(170,215,255,0.8)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(E.x, E.y, r, 0, 7); ctx.stroke();
    if (s > 0.6) G.text(ctx, 'YER', E.x, E.y + r + 62, { size: 32, fam: FONT, weight: 700, color: '#cfe3ff', align: 'center', alpha: clamp((t - ev.earth - 0.2) / 0.3) });
  }

  function moon(ctx, t) {
    const s = popScale(t, ev.moon, 0.2); if (s <= 0) return;
    const p = moonPos(t), r = M0.r * s;
    const gl = ctx.createRadialGradient(p.x, p.y, r * 0.9, p.x, p.y, r * 1.6); gl.addColorStop(0, 'rgba(230,230,255,0.35)'); gl.addColorStop(1, 'rgba(230,230,255,0)');
    ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(p.x, p.y, r * 1.6, 0, 7); ctx.fill();
    const g = ctx.createRadialGradient(p.x - r * 0.4, p.y - r * 0.4, r * 0.1, p.x, p.y, r); g.addColorStop(0, '#f4f2ec'); g.addColorStop(0.7, '#bdb8ae'); g.addColorStop(1, '#7c776e');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 7); ctx.fill();
    for (let k = 0; k < 9; k++) { const a = U.hash(k, 31) * 6.28, d = U.hash(k, 32) * r * 0.7, cr = r * (0.08 + 0.14 * U.hash(k, 33));
      ctx.fillStyle = 'rgba(90,85,78,0.45)'; ctx.beginPath(); ctx.arc(p.x + Math.cos(a) * d, p.y + Math.sin(a) * d, cr, 0, 7); ctx.fill(); }
    if (s > 0.6) G.text(ctx, 'AY', p.x + r + 40, p.y + 10, { size: 32, fam: FONT, weight: 700, color: '#e9e6ff', alpha: clamp((t - ev.moon - 0.2) / 0.3) });
  }

  function ruler(ctx, t) {
    if (t < ev.rulerStart - 0.05) return;
    const p = moonPos(t);
    const ax = E.x + dir[0] * (E.r + 14), ay = E.y + dir[1] * (E.r + 14);
    const bx = M0.x - dir[0] * (M0.r + 14), by = M0.y - dir[1] * (M0.r + 14);
    const grow = clamp((t - ev.rulerStart) / (ev.land - ev.rulerStart));
    const ex = lerp(ax, bx, ease.outCubic(grow)), ey = lerp(ay, by, ease.outCubic(grow));
    ctx.save(); ctx.shadowColor = 'rgba(255,196,61,0.9)'; ctx.shadowBlur = 18;
    ctx.strokeStyle = '#ffc43d'; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ex, ey); ctx.stroke(); ctx.restore();
    const nx = -dir[1], ny = dir[0];
    for (const k of S.ticks) {                                            // one tick per note
      const a = t - k.t; if (a < 0) continue;
      const f = (k.i + 1) / 8, tx = lerp(ax, bx, f), ty = lerp(ay, by, f), L = (k.i % 4 === 3 ? 30 : 18) * ease.outBack(clamp(a / 0.15), 3);
      ctx.strokeStyle = '#ffd77a'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(tx - nx * L, ty - ny * L); ctx.lineTo(tx + nx * L, ty + ny * L); ctx.stroke();
      const fl = 1 - clamp(a / 0.3); if (fl > 0) { ctx.fillStyle = `rgba(255,230,150,${0.7 * fl})`; ctx.beginPath(); ctx.arc(tx, ty, 22 * fl + 6, 0, 7); ctx.fill(); }
    }
    // the +3,8 cm extension after the nudge
    const n = nudge(t); if (n > 1) { ctx.save(); ctx.shadowColor = '#fff2b0'; ctx.shadowBlur = 24; ctx.strokeStyle = '#fff2b0'; ctx.lineWidth = 10; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx + dir[0] * n, by + dir[1] * n); ctx.stroke(); ctx.restore(); }
    // counter rides the middle of the ruler
    const mx = lerp(ax, bx, 0.5) + nx * 95, my = lerp(ay, by, 0.5) + ny * 95;
    const v = Data.count ? Data.count(t, ev.rulerStart, ev.land, 0, 384400, ease.outCubic) : 384400 * grow;
    const land = pulse(t, ev.land, 7) * (t >= ev.land ? 1 : 0);
    const txt = Math.round(v / 100) * 100;
    const str = String(txt).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' km';
    const size = 64 * (1 + 0.18 * land);
    ctx.save(); ctx.translate(mx, my);
    const w = G.measure(ctx, str, size, FONT, 800) + 44;
    ctx.fillStyle = 'rgba(6,10,28,0.85)'; ctx.strokeStyle = '#ffc43d'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(-w / 2, -size * 0.78, w, size * 1.25, 18); ctx.fill(); ctx.stroke();
    G.text(ctx, str, 0, size * 0.25, { size, fam: FONT, weight: 800, color: '#ffc43d', align: 'center', boil: 0 });
    ctx.restore();
  }

  function headline(ctx, t) {
    const size = 88, lh = 102, x0 = 76, y0 = SAFE.y + 120, maxW = W - 76 - 160;
    let x = x0, y = y0;
    for (const w of S.words) {
      const ww = G.measure(ctx, w.w + ' ', size, FONT, 800);
      if (x + ww - G.measure(ctx, ' ', size, FONT, 800) > x0 + maxW) { x = x0; y += lh; }
      const a = t - w.t; const sc = a < 0 ? 0 : ease.outBack(clamp(a / 0.22), 3);
      if (sc > 0) { ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
        G.text(ctx, w.w, 0, 0, { size, fam: FONT, weight: 800, color: w.key ? '#ffc43d' : '#ffffff', boil: 0, stroke: 'rgba(0,0,0,0.35)', strokeW: 6 }); ctx.restore(); }
      x += ww;
    }
  }

  function payoff(ctx, t) {
    const a = clamp((t - ev.nudge - 0.15) / 0.3); if (a <= 0) return;
    const p = moonPos(t), sc = ease.outBack(a, 2.4);
    const str = '+3,8 sm / il';
    ctx.save(); ctx.translate(Math.min(p.x - 30, W - 160 - 150), p.y + 150); ctx.scale(sc, sc);
    const w = G.measure(ctx, str, 50, FONT, 800) + 40;
    ctx.fillStyle = '#ffc43d'; ctx.beginPath(); ctx.roundRect(-w / 2, -42, w, 66, 33); ctx.fill();
    G.text(ctx, str, 0, 6, { size: 50, fam: FONT, weight: 800, color: '#0e111c', align: 'center', boil: 0 });
    ctx.restore();
    const b = clamp((t - ev.nudge - 0.6) / 0.4);
    if (b > 0) G.text(ctx, '≈ dırnağın bir ildə uzandığı qədər', 76, SAFE.y + 330, { size: 40, fam: FONT, weight: 700, color: '#cfd6f5', alpha: b, boil: 0 });
  }

  Studio.film({
    draw(ctx, t) {
      sky(ctx, t);
      for (const [t0, x, y, r] of [[ev.earth, E.x, E.y, E.r], [ev.moon, M0.x, M0.y, M0.r]]) {   // appear flash
        const k = t >= t0 ? Math.exp(-(t - t0) * 9) : 0;
        if (k > 0.02) { const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3); g.addColorStop(0, `rgba(255,255,255,${0.9 * k})`); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(x - r * 3, y - r * 3, r * 6, r * 6); }
      }
      earth(ctx, t); ruler(ctx, t); moon(ctx, t);
      const fl = t >= ev.land ? 0.55 * Math.exp(-(t - ev.land) * 10) : 0;
      if (fl > 0.01) { ctx.fillStyle = `rgba(255,240,200,${fl})`; ctx.fillRect(0, 0, W, H); }
      headline(ctx, t); payoff(ctx, t);
    },
    post: { paper: 0, vignette: 0.45, grain: 0.04 },
    fadeOut: 0.6,
  });
})();
