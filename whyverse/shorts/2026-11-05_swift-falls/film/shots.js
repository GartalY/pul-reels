// Whyverse short 2026-11-05 — the 8 shots. Layout on 1080x1920; text inside G.SAFE (x 60..940, y 221..1498).
(function () {
  const G = globalThis.G, U = globalThis.U, Data = globalThis.Data, S = globalThis.SCORE, P = globalThis.P;
  const { clamp, lerp, ease, pulse } = U;
  const { ev } = S; const C = P.C, CX = P.CX;
  const W = G.W, H = G.H;
  const SH = globalThis.SHOTS = [];
  const yearStr = (v) => String(Math.round(v));
  const sway = (t, a = 1) => Math.sin(t * 0.9) * a;

  // ================= S1 — planned 2 years, lasted 22 =================
  SH.push({ at: 0, in: 'cut', draw(ctx, t) {
    P.bg(ctx, t);
    // Swift, hero, gentle bob; a soft push of 3% over the shot
    const z = 1 + 0.03 * clamp(t / 5.7);
    ctx.save(); ctx.translate(CX, 900); ctx.scale(z, z); ctx.translate(-CX, -900);
    P.swift(ctx, CX + sway(t, 10), 640 + Math.sin(t * 1.6) * 10, 1.3, -0.12 + Math.sin(t * 0.7) * 0.04, t);
    ctx.restore();
    P.chip(ctx, 'NASA PLANNED', CX, 300, t + 0.3, 0, 1e9, { color: C.cyan, size: 38 });
    // counter: 2 -> 22
    const counting = t >= ev.s1_almost;
    const v = counting ? Data.count(t, ev.s1_almost, ev.sync_22, 2, 22, ease.inOutQuad) : 2;
    const land = t >= ev.sync_22 ? Math.exp(-(t - ev.sync_22) * 7) : 0;
    const k = pop(t + 0.3, 0) * (1 + 0.25 * land);
    const col = t >= ev.sync_22 ? C.coral : C.gold;
    P.at(ctx, CX, 1120, k, 0, () => P.text(ctx, yearStr(v), 0, 0, { size: 230, color: col }));
    P.text(ctx, 'YEARS', CX, 1210, { size: 64, color: C.white, alpha: fin(t + 0.3, 0) });
    if (t >= ev.sync_22) P.pText(ctx, 'IT LASTED', CX, 860, t, ev.sync_22 - 0.05, 1e9, { size: 56, color: C.coral });
    else P.pText(ctx, 'TO LAST', CX, 860, t + 0.3, 0, ev.s1_almost + 0.3, { size: 56, color: C.gold });
    // timeline bar 2004 -> 2026
    const x0 = 110, x1 = 890, y = 1330, yr = (Y) => lerp(x0, x1, (Y - 2004) / 22);
    const a = fin(t, 0.3, 0.4); ctx.save(); ctx.globalAlpha = a;
    ctx.strokeStyle = 'rgba(143,163,200,0.35)'; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
    const pPlan = clamp((t - ev.s1_bar0) / 0.5), endPlan = lerp(x0, yr(2006), ease.outCubic(pPlan));
    ctx.shadowColor = C.cyan; ctx.shadowBlur = 16; ctx.strokeStyle = C.cyan; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(Math.max(x0 + 1, endPlan), y); ctx.stroke();
    if (t >= ev.s1_almost) { const e = lerp(yr(2006), x1, ease.inOutQuad(clamp((t - ev.s1_almost) / (ev.sync_22 - ev.s1_almost)))); ctx.shadowColor = C.coral; ctx.strokeStyle = C.coral; ctx.beginPath(); ctx.moveTo(yr(2006), y); ctx.lineTo(e, y); ctx.stroke(); }
    ctx.shadowBlur = 0; ctx.restore();
    if (t >= ev.s1_planEnd - 0.1) { ctx.strokeStyle = C.white; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(yr(2006), y - 30); ctx.lineTo(yr(2006), y + 30); ctx.stroke(); P.pText(ctx, 'PLAN', yr(2006), y - 48, t, ev.s1_planEnd, 1e9, { size: 30, fam: 'Inter', weight: 800, color: C.cyan }); }
    P.text(ctx, '2004', x0, y + 70, { size: 34, fam: 'Inter', weight: 800, color: C.dim, alpha: a, glow: false });
    P.text(ctx, '2026', x1, y + 70, { size: 34, fam: 'Inter', weight: 800, color: t >= ev.sync_22 ? C.coral : C.dim, alpha: a, glow: false });
    P.flash(ctx, t, ev.sync_22, { color: '255,122,92', a: 0.25 });
  } });
  const pop = P.pop, fin = P.fin;

  // ================= S2 — the fall over Sumatra =================
  const map = Data.map({ region: [93, -9, 121, 8], x: 70, y: 760, w: 860, h: 540, pad: 0.02 });
  const [pinX, pinY] = map.proj(98.6, 3.4);
  const fx0 = 1010, fy0 = 230;
  SH.push({ at: ev.s2, in: { type: 'flash', dur: 0.3 }, draw(ctx, t) {
    P.bg(ctx, t, { drift: 1.5 });
    // map panel
    ctx.save(); ctx.globalAlpha = fin(t, ev.s2, 0.5);
    ctx.fillStyle = 'rgba(20,26,61,0.55)'; ctx.beginPath(); ctx.roundRect(60, 740, 880, 580, 28); ctx.fill();
    ctx.strokeStyle = 'rgba(79,227,255,0.4)'; ctx.lineWidth = 3; ctx.stroke();
    ctx.save(); ctx.beginPath(); ctx.roundRect(60, 740, 880, 580, 28); ctx.clip();
    Data.drawMap(ctx, map, { land: 'rgba(79,163,224,0.18)', stroke: C.cyan, lw: 2.5, highlight: { Indonesia: 'rgba(255,122,92,0.32)' }, t, t0: ev.s2, dur: 1.0 });
    ctx.restore(); ctx.restore();
    P.chip(ctx, 'THIS WEEK · 4 NOV 2026', CX, 300, t, ev.s2_week, 1e9, { color: C.gold, size: 36 });
    // Swift heats then falls along a fiery trail to the pin
    const pf = clamp((t - ev.s2_fall) / (ev.s2_burn + 0.7 - ev.s2_fall));
    if (t < ev.s2_fall) {
      const heat = clamp((t - (ev.s2 + 0.8)) / 1.2);
      P.swift(ctx, 760 + sway(t, 8), 470, 0.55, 0.5 + t * 0.2, t, { heat });
      if (heat > 0) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(760, 470, 0, 760, 470, 150); g.addColorStop(0, `rgba(255,150,60,${0.45 * heat})`); g.addColorStop(1, 'rgba(255,80,40,0)'); ctx.fillStyle = g; ctx.fillRect(560, 270, 400, 400); ctx.restore(); }
    } else if (pf < 1) {
      const sx = lerp(760, pinX, ease.inQuad(pf)), sy = lerp(470, pinY, ease.inQuad(pf));
      const [hx, hy] = P.fireTrail(ctx, fx0, fy0, sx, sy, 1, { len: 1, w: 22 });
      // break-up into fragments once it is burning
      if (t > ev.s2_burn) for (let i = 0; i < 5; i++) { const a = (t - ev.s2_burn) * (1 + i * 0.3); P.fireTrail(ctx, hx - 10, hy - 10, hx + (U.hash(i, 3) - 0.5) * 140 * a, hy + (40 + 60 * U.hash(i, 4)) * a, 1, { len: 1, w: 7, alpha: 0.8 }); }
      if (t < ev.s2_burn + 0.1) P.swift(ctx, sx, sy, 0.4 * (1 - pf * 0.6), t * 3, t, { heat: 1, alpha: 1 - pf });
    } else {
      // fading smoke trail
      const a = 1 - clamp((t - (ev.s2_burn + 0.7)) / 1.5);
      if (a > 0) P.fireTrail(ctx, fx0, fy0, pinX, pinY, 1, { len: 1, w: 14, alpha: a * 0.5 });
    }
    P.burst(ctx, pinX, pinY, t, ev.s2_burn + 0.7, { color: C.fire, size: 110, seed: 3 });
    P.stamp(ctx, 'BURNED UP', CX, 560, t, ev.s2_burn, { size: 80, color: C.fire, rot: -0.06 });
    // pin + label
    if (t >= ev.s2_pin - 0.1) {
      const k = pop(t, ev.s2_pin, 0.35, 2.5), r = 16 * k;
      ctx.save(); ctx.shadowColor = C.red; ctx.shadowBlur = 20; ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(pinX, pinY - 34 * k, r, 0, 7); ctx.fill();
      ctx.beginPath(); ctx.moveTo(pinX - r * 0.8, pinY - 34 * k + r * 0.5); ctx.lineTo(pinX, pinY); ctx.lineTo(pinX + r * 0.8, pinY - 34 * k + r * 0.5); ctx.fill(); ctx.restore();
      const rp = (t - ev.s2_pin) % 1.2; ctx.strokeStyle = `rgba(255,74,90,${1 - rp / 1.2})`; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(pinX, pinY, 20 + rp * 50, (20 + rp * 50) * 0.4, 0, 0, 7); ctx.stroke();
    }
    P.chip(ctx, 'OVER SUMATRA, INDONESIA', CX, 1400, t, ev.s2_pin, 1e9, { color: C.red, size: 36 });
  } });

  // ================= S3 — two decades of cosmic explosions =================
  const bursts3 = [[260, 640, C.pink], [760, 560, C.cyan], [520, 900, C.violet]];
  const far = [170, 440], swiftAt = [600, 1290];
  SH.push({ at: ev.s3, in: { type: 'fade', dur: 0.35 }, draw(ctx, t) {
    P.bg(ctx, t, { drift: 0.6 });
    const yv = Data.count(t, ev.s3_years0, ev.s3_years1, 2004, 2026, ease.inOutQuad);
    P.chip(ctx, '2004 → ' + yearStr(yv), CX, 300, t, ev.s3 + 0.1, 1e9, { color: C.gold, size: 44 });
    // three named explosions, then a sky that keeps popping softly
    ev.s3_bursts.forEach((tb, i) => { const [x, y, c] = bursts3[i]; P.burst(ctx, x, y, t, tb, { color: c, size: 170, seed: 10 + i }); });
    if (t < ev.s3_flash) P.pText(ctx, 'GAMMA-RAY BURSTS', CX, 1110, t, ev.s3_bursts[1], ev.s3_flash, { size: 54, color: C.pink });
    // the far flash + its light travelling to Swift
    P.burst(ctx, far[0], far[1], t, ev.s3_flash, { color: C.violet, size: 90, seed: 30 });
    if (t >= ev.s3_flash) {
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      const gl = 0.6 + 0.4 * Math.sin(t * 6); ctx.fillStyle = P.rgba(C.violet, 0.8 * gl); ctx.shadowColor = C.violet; ctx.shadowBlur = 20; ctx.beginPath(); ctx.arc(far[0], far[1], 9, 0, 7); ctx.fill(); ctx.restore();
      const p = clamp((t - ev.s3_travel) / (ev.s3_arrive - ev.s3_travel));
      const hx = lerp(far[0], swiftAt[0], p), hy = lerp(far[1], swiftAt[1] - 160, p);
      ctx.save(); ctx.setLineDash([16, 14]); ctx.lineDashOffset = -t * 120; ctx.strokeStyle = P.rgba(C.violet, 0.85); ctx.lineWidth = 5; ctx.shadowColor = C.violet; ctx.shadowBlur = 14;
      ctx.beginPath(); ctx.moveTo(far[0], far[1]); ctx.lineTo(hx, hy); ctx.stroke(); ctx.restore();
      if (p > 0 && p < 1) { ctx.save(); ctx.fillStyle = C.white; ctx.shadowColor = C.violet; ctx.shadowBlur = 30; ctx.beginPath(); ctx.arc(hx, hy, 12, 0, 7); ctx.fill(); ctx.restore(); }
    }
    // 13 billion years counter
    if (t >= ev.s3_13a - 0.3) {
      P.counter(ctx, { x: 690, y: 820, from: 0, to: 13, t, t0: ev.s3_13a, t1: ev.s3_13b, size: 190, color: C.gold });
      P.pText(ctx, 'BILLION', 690, 900, t, ev.s3_13a + 0.2, 1e9, { size: 56, color: C.white });
      P.pText(ctx, 'YEARS AWAY', 690, 970, t, ev.s3_13b, 1e9, { size: 48, color: C.white });
    }
    P.swift(ctx, swiftAt[0] + sway(t, 6), swiftAt[1], 0.62, -0.5, t);
    P.burst(ctx, swiftAt[0], swiftAt[1] - 100, t, ev.s3_arrive, { color: C.white, size: 120, seed: 40, n: 10 });
  } });

  // ================= S4 — why? the Sun, the 11-year cycle, the puffed-up air =================
  const sun = (ctx, x, y, r, t, k = 1) => {
    if (k <= 0) return;
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r * 2.4); g.addColorStop(0, `rgba(255,220,120,${0.9 * k})`); g.addColorStop(0.4, `rgba(255,140,60,${0.35 * k})`); g.addColorStop(1, 'rgba(255,80,40,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.4, 0, 7); ctx.fill(); ctx.restore();
    ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = '#FFD36B'; ctx.shadowColor = C.fire; ctx.shadowBlur = 50; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore();
    ctx.save(); ctx.globalAlpha = k; ctx.strokeStyle = C.gold; ctx.lineWidth = 6; ctx.lineCap = 'round'; ctx.shadowColor = C.gold; ctx.shadowBlur = 16;
    for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2 + t * 0.25, l = r * (0.25 + 0.12 * Math.sin(t * 3 + i * 1.7)); ctx.beginPath(); ctx.moveTo(x + Math.cos(a) * r * 1.18, y + Math.sin(a) * r * 1.18); ctx.lineTo(x + Math.cos(a) * (r * 1.18 + l), y + Math.sin(a) * (r * 1.18 + l)); ctx.stroke(); }
    ctx.restore();
  };
  const tB = ev.s4_graph - 0.2, tC = ev.s4_earth;
  SH.push({ at: ev.s4, in: { type: 'fade', dur: 0.35 }, draw(ctx, t) {
    P.bg(ctx, t, { drift: 0.5 });
    // sun: centre stage, then up to the top
    const mv = ease.inOutCubic(clamp((t - tB) / 0.7));
    const sx = CX, sy = lerp(1000, 430, mv), sr = lerp(190, 110, mv) * (1 + 0.04 * Math.sin(t * 2.5));
    const kS = pop(t, ev.s4_sun, 0.5, 1.5);
    sun(ctx, sx, sy, sr, t, kS);
    P.stamp(ctx, 'WHY DID IT FALL?', CX, 480, t, ev.s4_why, { size: 70, color: C.cyan, rot: -0.05, t1: tB + 0.2 });
    P.chip(ctx, 'BLAME THE SUN', CX, 1330, t, ev.s4_sun + 0.1, tB + 0.2, { color: C.gold, size: 42 });
    // the solar cycle graph
    const gx0 = 90, gx1 = 910, gy = 960, amp = 150, wl = 380; // one cycle = 380 px
    const xAt = (i) => gx0 + i; const yAt = (x) => gy - amp * (0.5 - 0.5 * Math.cos((x - gx0 - 30) / wl * Math.PI * 2));
    const kG = P.win(t, ev.s4_graph, tC + 0.1, 0.3);
    if (kG > 0) {
      ctx.save(); ctx.globalAlpha = kG;
      ctx.strokeStyle = 'rgba(143,163,200,0.4)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(gx0, gy + 10); ctx.lineTo(gx1, gy + 10); ctx.stroke();
      const pd = clamp((t - ev.s4_graph) / 1.6), xe = lerp(gx0, gx1, pd);
      ctx.strokeStyle = C.gold; ctx.lineWidth = 8; ctx.shadowColor = C.gold; ctx.shadowBlur = 18; ctx.beginPath();
      for (let x = gx0; x <= xe; x += 6) { const y = yAt(x); if (x === gx0) ctx.moveTo(x, y); else ctx.lineTo(x, y); } ctx.stroke(); ctx.shadowBlur = 0;
      P.text(ctx, 'SUN ACTIVITY', gx0, gy + 64, { size: 32, fam: 'Inter', weight: 800, color: C.dim, align: 'left', glow: false });
      // the 11-year bracket between two peaks
      const pk1 = gx0 + 30 + wl / 2, pk2 = pk1 + wl;
      if (t >= ev.s4_eleven - 0.1) {
        const k = pop(t, ev.s4_eleven, 0.3); const by = gy - amp - 50;
        ctx.strokeStyle = C.cyan; ctx.lineWidth = 4; ctx.shadowColor = C.cyan; ctx.shadowBlur = 12; ctx.beginPath(); ctx.moveTo(pk1, by + 16); ctx.lineTo(pk1, by); ctx.lineTo(lerp(pk1, pk2, k), by); if (k >= 1) ctx.lineTo(pk2, by + 16); ctx.stroke(); ctx.shadowBlur = 0;
        P.pText(ctx, '11 YEARS', (pk1 + pk2) / 2, by - 26, t, ev.s4_eleven, 1e9, { size: 48, color: C.cyan });
      }
      if (t >= ev.s4_max - 0.1) {
        const k = pop(t, ev.s4_max, 0.3, 2.5); ctx.fillStyle = C.coral; ctx.shadowColor = C.coral; ctx.shadowBlur = 20; ctx.beginPath(); ctx.arc(pk2, yAt(pk2), 16 * k, 0, 7); ctx.fill(); ctx.shadowBlur = 0;
        const rp = (t - ev.s4_max) % 1; ctx.strokeStyle = P.rgba(C.coral, 1 - rp); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(pk2, yAt(pk2), 16 + rp * 40, 0, 7); ctx.stroke();
        P.chip(ctx, 'SOLAR MAX · 2024', pk2 - 80, gy + 130, t, ev.s4_max, 1e9, { color: C.coral, size: 34 });
      }
      ctx.restore();
    }
    // Earth with its atmosphere puffing up
    const kE = fin(t, tC, 0.5);
    if (kE > 0) {
      const puff = ease.outBack(clamp((t - ev.s4_puff) / 0.6), 1.6);
      const ey = lerp(1250, 1080, ease.outCubic(kE));
      ctx.save(); ctx.globalAlpha = kE;
      // energy waves from the Sun to Earth
      for (let i = 0; i < 4; i++) { const ph = ((t - tC) * 0.9 + i / 4) % 1; const y = lerp(sy + sr * 1.3, ey - 300, ph); ctx.strokeStyle = P.rgba(C.gold, 0.7 * (1 - ph)); ctx.lineWidth = 5; ctx.beginPath(); for (let x = CX - 160; x <= CX + 160; x += 8) { const yy = y + Math.sin((x - CX) * 0.05 + t * 8) * 10; if (x === CX - 160) ctx.moveTo(x, yy); else ctx.lineTo(x, yy); } ctx.stroke(); }
      P.earth(ctx, CX, ey, 200, t, { atmo: 1 + 3.2 * puff, atmoGlow: clamp((t - ev.s4_heat) / 0.6) });
      ctx.restore();
      P.chip(ctx, 'UPPER AIR HEATS UP', CX, 1420, t, ev.s4_heat, ev.s4_puff, { color: C.fire, size: 36 });
      P.chip(ctx, 'AND PUFFS UP', CX, 1420, t, ev.s4_puff, 1e9, { color: C.cyan, size: 40 });
    }
  } });

  // ================= S5 — the drag spiral =================
  const E5 = [CX, 1090], R5 = 210;
  const gauge = (ctx, x, y, label, v, t, t0, col) => {
    const k = pop(t, t0, 0.3); if (k <= 0) return;
    P.at(ctx, x, y, k, 0, () => {
      ctx.fillStyle = 'rgba(20,26,61,0.7)'; ctx.beginPath(); ctx.roundRect(-190, -70, 380, 150, 24); ctx.fill(); ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.stroke();
      P.text(ctx, label, -150, -18, { size: 32, fam: 'Inter', weight: 800, color: C.white, align: 'left', glow: false });
      ctx.fillStyle = 'rgba(143,163,200,0.25)'; ctx.fillRect(-150, 20, 300, 26);
      ctx.fillStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 14; ctx.fillRect(-150, 20, 300 * v, 26); ctx.shadowBlur = 0;
    });
  };
  SH.push({ at: ev.s5, in: { type: 'fade', dur: 0.3 }, draw(ctx, t) {
    P.bg(ctx, t, { drift: 0.5 });
    const worse = t >= ev.s5_worse ? 0.5 + 0.5 * Math.sin((t - ev.s5_worse) * 12) : 0;
    P.earth(ctx, E5[0], E5[1], R5, t, { atmo: 4.2, atmoGlow: 0.6 + 0.4 * worse });
    // air particles in the thick upper atmosphere
    const nAir = Math.round(lerp(10, 70, clamp((t - ev.s5_air) / 1.2)));
    for (let i = 0; i < nAir; i++) { const a = U.hash(i, 51) * 7 + t * 0.15, r = R5 * (1.05 + 0.85 * U.hash(i, 52)); ctx.fillStyle = 'rgba(180,240,255,0.7)'; ctx.beginPath(); ctx.arc(E5[0] + Math.cos(a) * r, E5[1] + Math.sin(a) * r, 2.5, 0, 7); ctx.fill(); }
    // spiral path: radius shrinks, angular speed eases after "slowed"
    const u = clamp((t - ev.s5) / (ev.s6 - ev.s5));
    const rr = lerp(430, 300, ease.inQuad(clamp((t - ev.s5_sank + 0.6) / 2.4)));
    const ang = -Math.PI * 0.95 + (t - ev.s5) * 0.55 - 0.12 * clamp(t - ev.s5_slow, 0, 3);
    // faint orbit trail
    ctx.save(); ctx.strokeStyle = 'rgba(255,200,87,0.35)'; ctx.setLineDash([10, 12]); ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(E5[0], E5[1], rr, ang - 1.4, ang); ctx.stroke(); ctx.restore();
    const sx = E5[0] + Math.cos(ang) * rr, sy = E5[1] + Math.sin(ang) * rr;
    // drag chevrons opposite to motion (motion is +angle)
    if (t >= ev.s5_drag - 0.05) {
      const k = pop(t, ev.s5_drag, 0.3); const tx = -Math.sin(ang), ty = Math.cos(ang); // direction of travel
      ctx.save(); ctx.strokeStyle = t >= ev.s5_worse ? C.red : C.coral; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.shadowColor = ctx.strokeStyle; ctx.shadowBlur = 16;
      for (let i = 0; i < 3; i++) { const d = (70 + i * 34 + ((t * 60) % 34)) * k; const cx = sx + tx * d, cy = sy + ty * d, nx = -ty, ny = tx; ctx.globalAlpha = (1 - i * 0.25) * k; ctx.beginPath(); ctx.moveTo(cx + nx * 22 + tx * 14, cy + ny * 22 + ty * 14); ctx.lineTo(cx - tx * 6, cy - ty * 6); ctx.lineTo(cx - nx * 22 + tx * 14, cy - ny * 22 + ty * 14); ctx.stroke(); }
      ctx.restore();
    }
    P.swift(ctx, sx, sy, 0.36, ang + Math.PI / 2 + Math.sin(t * 2) * 0.05, t, { heat: 0.4 * clamp((t - ev.s5_worse) / 0.4) });
    P.pText(ctx, 'MORE AIR = MORE DRAG', CX, 510, t, ev.s5_drag, 1e9, { size: 56, color: C.coral });
    const vS = 1 - 0.55 * ease.outCubic(clamp((t - ev.s5_slow) / 0.8)) - 0.25 * clamp((t - ev.s5_worse) / 0.5);
    const vH = 1 - 0.5 * ease.outCubic(clamp((t - ev.s5_sank) / 0.8)) - 0.3 * clamp((t - ev.s5_worse) / 0.5);
    gauge(ctx, 275, 360, 'SPEED', vS, t, ev.s5 + 0.15, C.gold);
    gauge(ctx, 725, 360, 'HEIGHT', vH, t, ev.s5 + 0.3, C.cyan);
    if (t >= ev.s5_slow) P.pText(ctx, '▼', 420, 342, t, ev.s5_slow, 1e9, { size: 40, fam: 'Inter', weight: 800, color: C.red });
    if (t >= ev.s5_sank) P.pText(ctx, '▼', 870, 342, t, ev.s5_sank, 1e9, { size: 40, fam: 'Inter', weight: 800, color: C.red });
    if (worse > 0) { ctx.save(); const g = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.7); g.addColorStop(0, 'rgba(255,74,90,0)'); g.addColorStop(1, `rgba(255,74,90,${0.22 * worse})`); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  } });

  // ================= S6 — the rescue robot =================
  SH.push({ at: ev.s6, in: { type: 'fade', dur: 0.3 }, draw(ctx, t) {
    P.bg(ctx, t, { drift: 1 });
    const sxw = 640 + sway(t, 6), syw = 960 + (t - ev.s6) * 12;
    // robot: flies in, grabs, pushes up, then breaks and tumbles away
    const arrive = ease.outCubic(clamp((t - (ev.s6_robot - 0.6)) / 1.1));
    let rx = lerp(-180, sxw - 270, arrive), ry = lerp(1150, syw + 10, arrive), rrot = 0;
    const lift = t >= ev.s6_up && t < ev.s6_trouble ? ease.outCubic(clamp((t - ev.s6_up) / 0.8)) * 70 : (t >= ev.s6_trouble ? 70 : 0);
    const broken = t >= ev.s6_trouble;
    let swY = syw - lift;
    if (broken) { const a = t - ev.s6_trouble; rx -= a * 90; ry += a * a * 30 + a * 40; rrot = -a * 1.6; swY = syw - 70 + a * a * 25; }
    P.swift(ctx, sxw, swY, 0.75, 0.15 + Math.sin(t * 0.8) * 0.05 + (broken ? (t - ev.s6_trouble) * 0.25 : 0), t);
    P.robot(ctx, rx, broken ? ry : ry - lift, 1, rrot, t, { mood: broken ? 'broken' : 'ok', flame: broken ? clamp(1 - (t - ev.s6_trouble) * 2) : 1, armReach: clamp((t - ev.s6_push) / 0.3) * (broken ? 0 : 1) });
    if (t >= ev.s6_up - 0.05 && !broken) {
      const k = pop(t, ev.s6_up, 0.3); ctx.save(); ctx.strokeStyle = C.green; ctx.fillStyle = C.green; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.shadowColor = C.green; ctx.shadowBlur = 20; ctx.globalAlpha = k;
      const ax = 860, ay0 = 1080, ay1 = 860 - 30 * Math.sin(t * 5); ctx.beginPath(); ctx.moveTo(ax, ay0); ctx.lineTo(ax, ay1 + 30); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ax - 40, ay1 + 40); ctx.lineTo(ax, ay1 - 10); ctx.lineTo(ax + 40, ay1 + 40); ctx.closePath(); ctx.fill(); ctx.restore();
    }
    // sparks + warning
    if (broken) {
      [ev.s6_trouble].concat(ev.s6_sparks).forEach((ts, i) => P.burst(ctx, rx + 40, ry - 20, t, ts, { color: i % 2 ? C.gold : C.red, size: 70, n: 9, seed: 60 + i }));
      const k = pop(t, ev.s6_trouble, 0.3, 2.5); const blink = Math.floor((t - ev.s6_trouble) * 4) % 2 ? 0.55 : 1;
      P.at(ctx, CX, 700, k, 0, () => { ctx.globalAlpha *= blink; ctx.fillStyle = 'rgba(255,74,90,0.15)'; ctx.strokeStyle = C.red; ctx.lineWidth = 8; ctx.shadowColor = C.red; ctx.shadowBlur = 24; ctx.beginPath(); ctx.moveTo(0, -70); ctx.lineTo(78, 62); ctx.lineTo(-78, 62); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.shadowBlur = 0; P.text(ctx, '!', 0, 46, { size: 90, color: C.red }); });
    }
    P.chip(ctx, 'RESCUE ROBOT', CX, 300, t, ev.s6_robot, 1e9, { color: C.pink, size: 40 });
    P.pText(ctx, 'PUSH IT HIGHER', CX, 440, t, ev.s6_push, ev.s6_trouble, { size: 58, color: C.green });
    P.stamp(ctx, 'RESCUE CALLED OFF', CX, 470, t, ev.sync_off, { size: 62, color: C.red, rot: -0.07 });
    P.chip(ctx, 'AUGUST 2026', CX, 1380, t, ev.sync_off + 0.25, 1e9, { color: C.red, size: 36 });
  } });

  // ================= S7 — a shooting star of its own =================
  SH.push({ at: ev.s7, in: { type: 'fade', dur: 0.35 }, draw(ctx, t) {
    P.bg(ctx, t, { drift: 0.4, n: 280 });
    // Earth's limb at the bottom
    ctx.save(); const g = ctx.createRadialGradient(CX, 2950, 1500, CX, 2950, 1700); g.addColorStop(0, 'rgba(79,227,255,0.0)'); g.addColorStop(0.75, 'rgba(79,227,255,0.35)'); g.addColorStop(1, 'rgba(79,163,224,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 1200, W, H - 1200); ctx.fillStyle = '#0B1E4A'; ctx.beginPath(); ctx.arc(CX, 2950, 1500, 0, 7); ctx.fill();
    ctx.strokeStyle = C.cyan; ctx.lineWidth = 4; ctx.shadowColor = C.cyan; ctx.shadowBlur = 20; ctx.beginPath(); ctx.arc(CX, 2950, 1500, Math.PI * 1.2, Math.PI * 1.8); ctx.stroke(); ctx.restore();
    if (t < ev.s7_star + 0.1) { const a = 1 - clamp((t - ev.s7_star + 0.3) / 0.4); P.swift(ctx, 790 - (t - ev.s7) * 20, 420 + (t - ev.s7) * 12, 0.42, 0.6 + (t - ev.s7) * 0.15, t, { heat: clamp((t - ev.s7) / 3), alpha: a }); }
    P.pText(ctx, 'IT WATCHED STARS EXPLODE', CX, 300, t, ev.s7 + 0.3, ev.s7_score, { size: 44, color: C.pink });
    ev.s7_explode.forEach((tb, i) => P.burst(ctx, [250, 760, 500][i], [520, 470, 700][i], t, tb, { color: [C.pink, C.cyan, C.violet][i], size: 130, seed: 70 + i }));
    // the shooting star
    const p = clamp((t - ev.s7_star) / 1.3);
    if (p > 0 && p < 1) P.fireTrail(ctx, 730, 450, 80, 1180, ease.inOutQuad(p), { len: 0.4, w: 16 });
    if (p >= 1) { const a = 1 - clamp((t - ev.s7_star - 1.3) / 1.2); if (a > 0) P.fireTrail(ctx, 730, 450, 80, 1180, 1, { len: 0.5, w: 8, alpha: a * 0.6 }); }
    P.pText(ctx, 'A SHOOTING STAR', CX, 860, t, ev.s7_star + 0.1, ev.s7_score, { size: 66, color: C.gold });
    P.pText(ctx, 'OF ITS OWN', CX, 950, t, ev.s7_star + 0.45, ev.s7_score, { size: 54, color: C.white });
    // scoreboard
    const k = pop(t, ev.s7_score, 0.35, 1.6);
    if (k > 0) P.at(ctx, CX, 880, k, 0, () => {
      ctx.fillStyle = 'rgba(20,26,61,0.8)'; ctx.beginPath(); ctx.roundRect(-400, -230, 800, 460, 34); ctx.fill(); ctx.strokeStyle = C.gold; ctx.lineWidth = 4; ctx.shadowColor = C.gold; ctx.shadowBlur = 20; ctx.stroke(); ctx.shadowBlur = 0;
      P.text(ctx, 'PLANNED', -340, -110, { size: 44, color: C.dim, align: 'left', glow: false }); P.text(ctx, '2 YEARS', 340, -110, { size: 52, color: C.cyan, align: 'right' });
      ctx.strokeStyle = 'rgba(143,163,200,0.35)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-340, -50); ctx.lineTo(340, -50); ctx.stroke();
      P.text(ctx, 'ACTUAL', -340, 40, { size: 44, color: C.dim, align: 'left', glow: false }); P.text(ctx, '~22 YEARS', 340, 40, { size: 64, color: C.coral, align: 'right' });
      const kc = pop(t, ev.s7_check, 0.35, 2.4);
      if (kc > 0) { ctx.save(); ctx.scale(kc, kc); ctx.strokeStyle = C.green; ctx.lineWidth = 14; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.shadowColor = C.green; ctx.shadowBlur = 24; ctx.beginPath(); ctx.moveTo(-60, 140); ctx.lineTo(-15, 185); ctx.lineTo(70, 100); ctx.stroke(); ctx.restore(); }
    });
    P.flash(ctx, t, ev.s7_check, { color: '92,255,168', a: 0.15 });
  } });

  // ================= S8 — Whyverse end card =================
  SH.push({ at: ev.s8, in: { type: 'fade', dur: 0.4 }, draw(ctx, t) {
    P.bg(ctx, t, { drift: 0.5 });
    const k = pop(t, ev.s8 + 0.1, 0.6, 1.4);
    P.at(ctx, CX, 640 + Math.sin(t * 1.4) * 10, k, 0, () => P.planet(ctx, 0, 0, 130, t));
    P.pText(ctx, 'FOLLOW', CX, 990, t, ev.s8_follow, 1e9, { size: 70, color: C.white });
    P.pText(ctx, 'WHYVERSE', CX, 1110, t, ev.s8_follow + 0.15, 1e9, { size: 110, color: C.gold });
    P.chip(ctx, '▶ Full videos on our YouTube', CX, 1290, t, ev.s8_yt, 1e9, { color: C.red, size: 40 });
    P.text(ctx, 'IG @whyverse___ · TikTok @Whyverse', CX, 1410, { size: 30, fam: 'Inter', weight: 700, color: C.dim, alpha: fin(t, ev.s8_yt + 0.4), glow: false });
  } });
})();
