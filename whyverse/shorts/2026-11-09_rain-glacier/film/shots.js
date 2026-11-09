// Whyverse short 2026-11-09 — the 9 shots, blueprint style. Layout on 1080x1920; text inside G.SAFE (x 60..940, y 221..1498).
(function () {
  const G = globalThis.G, U = globalThis.U, Data = globalThis.Data, S = globalThis.SCORE, P = globalThis.P;
  const { clamp, lerp, ease } = U;
  const { ev } = S; const C = P.C, CX = P.CX;
  const pop = P.pop, fin = P.fin;
  const SH = globalThis.SHOTS = [];
  const pushZ = (ctx, t, t0, t1, cx = CX, cy = 860, amt = 0.03) => { const z = 1 + amt * clamp((t - t0) / (t1 - t0)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy); };
  const label = (ctx, s, x, y, o = {}) => P.text(ctx, s, x, y, Object.assign({ size: 30, fam: 'Inter', weight: 800, color: C.dim }, o));

  // ================= S1 — 7.5 m in one day =================
  const g1 = P.glacierGeom(80, 860, 560, 760);
  SH.push({ at: 0, in: 'cut', draw(ctx, t) {
    P.bg(ctx, t);
    ctx.save(); pushZ(ctx, t, 0, ev.s2);
    P.sea(ctx, g1, t); P.bedrock(ctx, g1, t);
    const sl = t < ev.s1_slide ? 0 : 70 * ease.inOutCubic(clamp((t - ev.s1_slide) / (ev.sync_day - ev.s1_slide)));
    P.bedWater(ctx, g1, t, { th: 8 * fin(t, 0.3, 1), slide: 0 });
    P.ice(ctx, g1, t, { slide: sl });
    // speed lines behind the moving ice
    if (t > ev.s1_slide && t < ev.sync_day + 0.6) { ctx.strokeStyle = 'rgba(234,243,255,0.6)'; ctx.lineWidth = 4; for (let i = 0; i < 5; i++) { const y = lerp(g1.surf(0.1), g1.bed(0.1), 0.15 + i * 0.17), x = g1.x0 - 20 + sl - ((t * 300 + i * 40) % 80); ctx.beginPath(); ctx.moveTo(x - 60, y); ctx.lineTo(x, y); ctx.stroke(); } }
    // storm cloud + rain onto the surface
    P.cloud(ctx, 330 + Math.sin(t * 0.8) * 12, 400, 1.1); P.cloud(ctx, 640 + Math.sin(t * 0.7 + 1) * 10, 430, 0.9);
    P.rain(ctx, t, 200, 760, 450, (x) => g1.surf(clamp((x - g1.x0 - sl) / g1.w)), { n: 46, density: 1 });
    // dimension line: how far it slid
    if (t >= ev.s1_slide) P.dim(ctx, g1.X(1), 940, g1.X(1) + Math.max(4, sl), 940, null, t, ev.s1_slide);
    ctx.restore();
    // hook text from frame 0
    P.tag(ctx, 'RAIN MADE A GLACIER SLIDE', CX, 285, t + 0.4, 0, ev.s1_double - 0.1, { size: 38 });
    P.tag(ctx, 'MORE THAN 2× ITS SPEED', CX, 285, t, ev.s1_double, 1e9, { size: 40, bg: C.coral });
    // counter 0.0 -> 7.5 in digit boxes
    const v = t < ev.s1_c0 ? 0 : Data.count(t, ev.s1_c0, ev.s1_c1, 0, 7.5, ease.outCubic);
    const land = t >= ev.s1_c1 ? Math.exp(-(t - ev.s1_c1) * 7) : 0;
    P.at(ctx, CX - 60, 1110, (pop(t + 0.4, 0) || 0) * (1 + 0.12 * land), 0, () => P.digits(ctx, v.toFixed(1), 0, 0, { size: 150, color: t >= ev.s1_c1 ? C.yellow : C.line }));
    P.text(ctx, 'M', CX + 240, 1160, { size: 110, color: C.line, alpha: fin(t + 0.4, 0) });
    P.stamp(ctx, 'IN ONE DAY', CX, 1330, t, ev.sync_day, { size: 76 });
    P.tag(ctx, '+116%', 800, 990, t, ev.s1_pct, 1e9, { size: 44, rot: 0.08, bg: C.coral });
    P.flash(ctx, t, ev.sync_day);
  } });

  // ================= S2 — this week: Turner Glacier, Alaska =================
  const map = Data.map({ region: [-170, 53, -128, 71.5], x: 70, y: 470, w: 860, h: 700, pad: 0.02 });
  const [pinX, pinY] = map.proj(-139.65, 59.98);
  SH.push({ at: ev.s2, in: { type: 'flash', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    ctx.save(); pushZ(ctx, t, ev.s2, ev.s3, pinX, pinY, 0.06);
    ctx.save(); ctx.beginPath(); ctx.rect(60, 450, 880, 740); ctx.clip();
    Data.drawMap(ctx, map, { land: 'rgba(205,232,255,0.10)', stroke: C.line, lw: 2.5, highlight: { 'United States of America': 'rgba(255,210,63,0.22)', Canada: 'rgba(205,232,255,0.06)' }, t, t0: ev.s2, dur: 1.0 });
    // lat/long graticule
    ctx.strokeStyle = 'rgba(234,243,255,0.18)'; ctx.lineWidth = 1.5; ctx.setLineDash([6, 8]);
    for (let lon = -165; lon <= -130; lon += 5) { const [x] = map.proj(lon, 60); ctx.beginPath(); ctx.moveTo(x, 450); ctx.lineTo(x, 1190); ctx.stroke(); }
    for (let lat = 55; lat <= 70; lat += 5) { const [, y] = map.proj(-150, lat); ctx.beginPath(); ctx.moveTo(60, y); ctx.lineTo(940, y); ctx.stroke(); }
    ctx.setLineDash([]); ctx.restore();
    ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.strokeRect(60, 450, 880, 740);
    // pin
    if (t >= ev.s2_pin - 0.05) { const k = pop(t, ev.s2_pin, 0.35, 2.5); ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(pinX, pinY, 14 * k, 0, 7); ctx.fill(); ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.stroke(); for (let i = 0; i < 3; i++) P.ring(ctx, pinX, pinY, t, ev.s2_pin + i * 0.7, { size: 90 }); }
    ctx.restore();
    P.chip(ctx, 'THIS WEEK · NEW STUDY', CX, 300, t, ev.s2_week, 1e9, { size: 38, color: C.yellow });
    P.tag(ctx, 'GPS + RAIN DATA', CX, 395, t, ev.s2_sci, 1e9, { size: 32, bg: C.line });
    P.callout(ctx, 'TURNER GLACIER', pinX, pinY, 600, 1290, t, ev.s2_pin + 0.1, 1e9, { size: 36 });
    P.tag(ctx, 'ALASKA, USA', 330, 620, t, ev.s2_alaska, 1e9, { size: 34, bg: C.line });
    P.pText(ctx, 'HOW?', 260, 1400, t, ev.s2_how, 1e9, { size: 70, color: C.yellow });
  } });

  // ================= S3 — GPS every 15 s; 9 of 16 storms =================
  const g3 = P.glacierGeom(80, 860, 560, 700);
  const cells = []; for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) cells.push([215 + c * 190, 920 + r * 100]);
  const litOrder = [0, 5, 2, 7, 9, 12, 14, 11, 3]; // which 9 of the 16 storms sped it up (illustrative positions)
  SH.push({ at: ev.s3, in: { type: 'fade', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    const gridOn = t >= ev.s3_grid;
    const up = gridOn ? ease.inOutCubic(clamp((t - ev.s3_grid) / 0.5)) : 0;
    ctx.save(); ctx.translate(0, -60 * up);
    P.bedrock(ctx, g3, t, { depth: 120 }); P.ice(ctx, g3, t, { slide: (t - ev.s3) * 6 });
    const st = [0.3, 0.5, 0.7];
    st.forEach((u, i) => P.gps(ctx, g3.X(u) + (t - ev.s3) * 6, g3.surf(u) - 2, 0.9, t, ev.s3_gps[i]));
    ctx.restore();
    // logger clock: +15 s per tick
    const nT = t < ev.s3_clk0 ? 0 : Math.min(8, Math.floor((t - ev.s3_clk0) / ((ev.s3_clk1 - ev.s3_clk0) / 4)) + 1) + Math.max(0, Math.floor((t - ev.s3_clk1) * 3));
    const secs = 15 * nT, mm = String(Math.floor(secs / 60)).padStart(2, '0'), ss = String(secs % 60).padStart(2, '0');
    P.at(ctx, CX - 110, 330, pop(t, ev.s3_log - 0.2), 0, () => P.digits(ctx, mm + ':' + ss, 0, 0, { size: 74, accent: null }));
    P.tag(ctx, 'EVERY 15 S', 790, 330, t, ev.s3_15, 1e9, { size: 36 });
    P.callout(ctx, 'POSITION', g3.X(0.5), g3.surf(0.5) - 100, 330, 440, t, ev.s3_log, ev.s3_grid, { size: 30, bg: C.line });
    // 16 big rainstorms, 9 lit
    if (gridOn) {
      cells.forEach(([x, y], i) => { const k = pop(t, ev.s3_grid + i * 0.03, 0.3, 1.8); if (k <= 0) return; const li = litOrder.indexOf(i), lit = li >= 0 && t >= ev.s3_lit[li];
        P.at(ctx, x, y, k * 0.42 * (lit ? 1 + 0.15 * Math.exp(-(t - ev.s3_lit[li]) * 6) : 1), 0, () => { P.cloud(ctx, 0, 0, 1, { color: lit ? C.yellow : C.dim, fill: lit ? 'rgba(255,210,63,0.25)' : 'rgba(10,33,72,0.85)', lw: 6 }); });
        if (lit) P.arrow(ctx, x - 30, y + 48, x + 40, y + 48, fin(t, ev.s3_lit[li], 0.25), { color: C.yellow, lw: 5, head: 16 }); });
      const nLit = ev.s3_lit.filter((x) => t >= x).length;
      P.text(ctx, 'BIG RAINSTORMS', CX, 860, { size: 34, fam: 'Inter', weight: 800, color: C.line, alpha: fin(t, ev.s3_grid) });
      P.digits(ctx, `${nLit}/16`, CX, 1380, { size: 84, color: C.yellow, alpha: fin(t, ev.s3_grid) });
    }
    P.stamp(ctx, 'SPED IT UP', CX + 150, 1180, t, ev.sync_9, { size: 60, rot: -0.1 });
    P.flash(ctx, t, ev.sync_9);
  } });

  // ================= S4 — how? not from above — underneath =================
  const g4 = P.glacierGeom(80, 860, 640, 860);
  SH.push({ at: ev.s4, in: { type: 'flash', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    ctx.save(); pushZ(ctx, t, ev.s4, ev.s5);
    P.sea(ctx, g4, t); P.bedrock(ctx, g4, t); P.ice(ctx, g4, t, { slide: (t - ev.s4) * 4 });
    // push from above?  ✗
    const pa = ease.outCubic(clamp((t - ev.s4_push) / 0.35));
    if (pa > 0) { P.arrow(ctx, 500, 430, 500, 600, pa, { color: C.line, lw: 14, head: 44 }); label(ctx, 'PUSH FROM', 740, 500, { color: C.line, alpha: pa }); label(ctx, 'ABOVE?', 740, 540, { color: C.line, alpha: pa }); }
    P.cross(ctx, 500, 520, 70, t, ev.s4_x);
    // sneaks underneath  ✓
    if (t >= ev.s4_sneak) {
      const p = clamp((t - ev.s4_sneak) / 0.9);
      const pts = []; const u0 = 0.32; pts.push([g4.X(u0), g4.surf(u0)]); pts.push([g4.X(u0), g4.bed(u0) - 6]); for (let i = 1; i <= 10; i++) { const u = u0 + 0.5 * i / 10; pts.push([g4.X(u), g4.bed(u) - 6]); }
      const segs = pts.length - 1, upto = p * segs; ctx.save(); ctx.strokeStyle = C.water; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.setLineDash([24, 14]); ctx.lineDashOffset = -t * 80;
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); let last = pts[0];
      for (let i = 1; i <= segs; i++) { if (i - 1 >= upto) break; const f = Math.min(1, upto - (i - 1)); last = [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]; ctx.lineTo(last[0], last[1]); }
      ctx.stroke(); ctx.restore(); ctx.fillStyle = C.water; ctx.beginPath(); ctx.arc(last[0], last[1], 16, 0, 7); ctx.fill();
    }
    ctx.restore();
    P.stamp(ctx, 'HOW?', CX, 300, t, ev.s4_how, { size: 90, rot: -0.04 });
    P.tag(ctx, 'IT GOES UNDERNEATH', CX, 1260, t, ev.sync_under, 1e9, { size: 44, bg: C.water });
    P.check(ctx, CX, 1390, 90, t, ev.sync_under);
  } });

  // ================= S5 — rain down cracks and holes to the rock =================
  const g5 = P.glacierGeom(70, 880, 560, 830);
  SH.push({ at: ev.s5, in: { type: 'fade', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    ctx.save(); pushZ(ctx, t, ev.s5, ev.s6);
    const crev = clamp((t - ev.s5_cracks + 0.2) / 0.5) * 0.75 + clamp((t - ev.s5_holes) / 0.5) * 0.35;
    P.bedrock(ctx, g5, t); P.ice(ctx, g5, t, { crevasses: crev });
    P.cloud(ctx, 300 + Math.sin(t) * 10, 330, 1.1); P.cloud(ctx, 640 + Math.sin(t * 0.8) * 10, 360, 1.0);
    P.rain(ctx, t, 180, 820, 390, (x) => g5.surf(clamp((x - g5.x0) / g5.w)), { n: 50, density: fin(t, ev.s5_rain - 0.6, 0.6) });
    // water running down the cracks + moulin to the bed
    const pd = clamp((t - ev.s5_down) / 1.0);
    ctx.save(); ctx.strokeStyle = C.water; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.setLineDash([16, 10]); ctx.lineDashOffset = -t * 120;
    for (const [u, d] of [[0.28, 0.35], [0.47, 0.3], [0.78, 0.38]]) { if (t < ev.s5_pour) break; const y0 = g5.surf(u), y1 = y0 + (g5.bed(u) - y0) * d * 0.95 * fin(t, ev.s5_pour, 0.6); ctx.beginPath(); ctx.moveTo(g5.X(u), y0); ctx.lineTo(g5.X(u), y1); ctx.stroke(); }
    if (pd > 0) { const u = 0.62, y0 = g5.surf(u); ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(g5.X(u), y0); ctx.lineTo(g5.X(u), lerp(y0, g5.bed(u) - 4, pd)); ctx.stroke(); }
    ctx.restore();
    if (t >= ev.s5_rock) P.bedWater(ctx, g5, t, { u0: lerp(0.62, 0.4, fin(t, ev.s5_rock, 1)), u1: lerp(0.62, 0.85, fin(t, ev.s5_rock, 1)), th: 10 });
    P.ring(ctx, g5.X(0.62), g5.bed(0.62), t, ev.s5_rock, { color: C.water, size: 80 });
    ctx.restore();
    P.chip(ctx, 'SECTION A–A · SIDE VIEW', CX, 255, t, ev.s5 + 0.1, 1e9, { size: 28, color: C.dim });
    P.callout(ctx, 'CRACKS', g5.X(0.28), g5.surf(0.28) + 40, 230, 1250, t, ev.s5_cracks, 1e9, { size: 34 });
    P.callout(ctx, 'HOLES (MOULINS)', g5.X(0.62), g5.surf(0.62) + 60, 620, 1340, t, ev.s5_holes, 1e9, { size: 34 });
    P.tag(ctx, 'BEDROCK', 760, 1150, t, ev.s5_rock, 1e9, { size: 34, bg: C.line });
  } });

  // ================= S6 — DETAIL B: drains too small -> pressure -> grip lost =================
  const yIce1 = 760; // bottom of the ice slab (before lift)
  const rockY = (x) => 790 + Math.sin(x * 0.03) * 10 + Math.sin(x * 0.011 + 1) * 14;
  SH.push({ at: ev.s6, in: { type: 'flash', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    const press = t < ev.s6_gauge ? 0.12 : lerp(0.12, 0.93, ease.inOutCubic(clamp((t - ev.s6_gauge) / (ev.s6_builds + 0.4 - ev.s6_gauge))));
    const lift = t < ev.s6_lift ? 0 : 16 * ease.outCubic(clamp((t - ev.s6_lift) / 0.6));
    const th = 10 + (press - 0.12) * 22 + lift;
    // detail frame
    ctx.save(); ctx.beginPath(); ctx.rect(60, 380, 880, 680); ctx.clip();
    // rock
    ctx.beginPath(); ctx.moveTo(60, 1100); for (let x = 60; x <= 940; x += 10) ctx.lineTo(x, rockY(x)); ctx.lineTo(940, 1100); ctx.closePath(); ctx.fillStyle = 'rgba(8,24,56,0.6)'; ctx.fill();
    ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(234,243,255,0.2)'; ctx.lineWidth = 2; for (let k = -10; k < 40; k++) { ctx.beginPath(); ctx.moveTo(k * 30, 760); ctx.lineTo(k * 30 + 340, 1100); ctx.stroke(); } ctx.restore();
    // drain channel cut into the rock (too small)
    const dx = 720, dr = 26; ctx.fillStyle = P.rgba(C.water, 0.8); ctx.beginPath(); ctx.arc(dx, rockY(dx), dr, 0, Math.PI); ctx.fill();
    ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); for (let x = 60; x <= 940; x += 10) { if (Math.abs(x - dx) < dr) continue; x < dx - dr ? (x === 60 ? ctx.moveTo(x, rockY(x)) : ctx.lineTo(x, rockY(x))) : ctx.lineTo(x, rockY(x)); } ctx.stroke();
    ctx.beginPath(); ctx.arc(dx, rockY(dx), dr, 0, Math.PI); ctx.stroke();
    // water film between rock and ice
    ctx.beginPath(); for (let x = 60; x <= 940; x += 10) ctx.lineTo(x, rockY(x) - th); for (let x = 940; x >= 60; x -= 10) ctx.lineTo(x, rockY(x)); ctx.closePath(); ctx.fillStyle = P.rgba(C.water, 0.55); ctx.fill();
    ctx.setLineDash([14, 16]); ctx.lineDashOffset = -t * 90; ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 2; ctx.beginPath(); for (let x = 60; x <= 940; x += 10) ctx.lineTo(x, rockY(x) - th / 2); ctx.stroke(); ctx.setLineDash([]);
    // ice slab (lifted)
    ctx.beginPath(); ctx.moveTo(60, 380); ctx.lineTo(940, 380); for (let x = 940; x >= 60; x -= 10) ctx.lineTo(x, rockY(x) - th); ctx.closePath(); ctx.fillStyle = 'rgba(205,232,255,0.16)'; ctx.fill();
    ctx.save(); ctx.clip(); ctx.strokeStyle = 'rgba(234,243,255,0.22)'; ctx.lineWidth = 2; ctx.setLineDash([20, 14]); ctx.lineDashOffset = -t * 20; for (let k = 0; k < 8; k++) { ctx.beginPath(); ctx.moveTo(60, 430 + k * 48 - lift); ctx.lineTo(940, 430 + k * 48 - lift); ctx.stroke(); } ctx.restore();
    ctx.strokeStyle = C.line; ctx.lineWidth = 5; ctx.beginPath(); for (let x = 60; x <= 940; x += 10) x === 60 ? ctx.moveTo(x, rockY(x) - th) : ctx.lineTo(x, rockY(x) - th); ctx.stroke();
    // incoming water arrows from the left
    for (let i = 0; i < 3; i++) { const ph = ((t * 0.9 + i / 3) % 1); P.arrow(ctx, 70 + ph * 300, rockY(100) - th / 2, 150 + ph * 300, rockY(100) - th / 2, 1, { color: C.line, lw: 4, head: 16 }); }
    // pressure arrows pushing up on the ice
    if (t >= ev.s6_press) for (let i = 0; i < 5; i++) { const x = 180 + i * 150, b = rockY(x) - th; const k = fin(t, ev.s6_press + i * 0.06, 0.3); P.arrow(ctx, x, b + 4, x, b - 40 - 50 * press, k, { color: C.yellow, lw: 7, head: 22 }); }
    ctx.restore();
    ctx.strokeStyle = C.line; ctx.lineWidth = 3; ctx.strokeRect(60, 380, 880, 680);
    label(ctx, 'ICE', 120, 440, { align: 'left', color: C.line, size: 34 });
    label(ctx, 'ROCK', 120, 1030, { align: 'left', color: C.line, size: 34 });
    P.chip(ctx, 'DETAIL B · THE BED', CX, 300, t, ev.s6 + 0.05, 1e9, { size: 32, color: C.yellow });
    P.callout(ctx, 'DRAIN', dx, rockY(dx) + 10, 760, 980, t, ev.s6_drain, 1e9, { size: 32, bg: C.line });
    P.tag(ctx, 'TOO SMALL!', 760, 900, t, ev.s6_clog, 1e9, { size: 32, bg: C.red, txt: '#fff', rot: -0.06 });
    // gauge + grip meter
    const ga = fin(t, ev.s6_gauge - 0.3, 0.3);
    if (ga > 0) P.at(ctx, 250, 1260, ga, 0, () => P.gauge(ctx, 0, 0, 140, press, 'PRESSURE', t));
    const grip = t < ev.s6_lift ? 1 : lerp(1, 0.1, ease.inOutCubic(clamp((t - ev.s6_lift) / (ev.sync_grip - ev.s6_lift))));
    if (t >= ev.s6_builds - 0.3) { ctx.save(); ctx.globalAlpha = fin(t, ev.s6_builds - 0.3); P.meter(ctx, 470, 1180, 420, 70, grip, 'GRIP', grip < 0.35 ? C.red : C.green); ctx.restore(); }
    P.stamp(ctx, 'GRIP LOST', 680, 1380, t, ev.sync_grip, { size: 62, color: C.red, rot: -0.06 });
    P.flash(ctx, t, ev.sync_grip, { color: '255,90,95', a: 0.18 });
  } });

  // ================= S7 — slide; +12 h; calm within 2 weeks =================
  const g7 = P.glacierGeom(80, 860, 440, 610);
  const gx0 = 130, gx1 = 900, gy0 = 1330, gy1 = 960;
  const xRain = 250, xPeak = 420, xCalm = 840;
  const spd = (x) => { const base = 0.18; if (x < xRain) return base; if (x < xPeak) return base + 0.62 * ease.inOutQuad((x - xRain) / (xPeak - xRain)); return base + 0.62 * Math.exp(-(x - xPeak) / 110); };
  SH.push({ at: ev.s7, in: { type: 'fade', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    const sl = t < ev.s7_slide ? (t - ev.s7) * 8 : (ev.s7_slide - ev.s7) * 8 + 50 * ease.outCubic(clamp((t - ev.s7_slide) / 0.8)) + (t - ev.s7_slide) * 4;
    P.sea(ctx, g7, t); P.bedrock(ctx, g7, t, { depth: 120 }); P.bedWater(ctx, g7, t, { th: 14 }); P.ice(ctx, g7, t, { slide: sl });
    // friction arrows shrink
    const fr = t < ev.s7_less ? 1 : lerp(1, 0.25, clamp((t - ev.s7_less) / 0.5));
    for (let i = 0; i < 4; i++) { const u = 0.15 + i * 0.2, x = g7.X(u) + sl, y = g7.bed(u) + 34; P.arrow(ctx, x, y, x - 110 * fr, y, 1, { color: C.red, lw: 6, head: 20 }); }
    label(ctx, 'FRICTION', 160, g7.bed(0.1) + 90, { align: 'left', color: C.red, alpha: 1 - fin(t, ev.s7_slide, 0.5) * 0.6 });
    P.arrow(ctx, 520, 360, 820, 360, fin(t, ev.s7_slide, 0.3), { color: C.yellow, lw: 12, head: 36 });
    P.pText(ctx, 'SLIDE', 400, 380, t, ev.s7_slide, 1e9, { size: 64, color: C.yellow });
    // speed graph
    const ga = fin(t, ev.s7_graph - 0.2, 0.3);
    if (ga > 0) {
      ctx.save(); ctx.globalAlpha = ga;
      ctx.strokeStyle = C.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(gx0, gy1 - 40); ctx.lineTo(gx0, gy0); ctx.lineTo(gx1, gy0); ctx.stroke();
      label(ctx, 'SPEED', gx0 + 10, gy1 - 50, { align: 'left', color: C.line });
      label(ctx, 'TIME →  (NOT TO SCALE)', gx1, gy0 + 50, { align: 'right' });
      // reveal the curve up to the current phase
      let xr = xRain; if (t >= ev.s7_rain) xr = lerp(xRain, xPeak - 30, clamp((t - ev.s7_rain) / (ev.sync_spike - ev.s7_rain)));
      if (t >= ev.sync_spike) xr = lerp(xPeak - 30, xPeak + 60, clamp((t - ev.sync_spike) / 0.4));
      if (t >= ev.s7_weeks) xr = lerp(xPeak + 60, xCalm, clamp((t - ev.s7_weeks) / (ev.s7_calm + 0.4 - ev.s7_weeks)));
      xr = Math.max(gx0, xr);
      ctx.strokeStyle = C.yellow; ctx.lineWidth = 7; ctx.lineJoin = 'round'; ctx.beginPath(); for (let x = gx0; x <= xr; x += 4) { const y = lerp(gy0, gy1, spd(x)); x === gx0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.stroke();
      ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(xr, lerp(gy0, gy1, spd(xr)), 11, 0, 7); ctx.fill();
      ctx.restore();
      // rain marker
      if (t >= ev.s7_rain) { ctx.strokeStyle = C.water; ctx.lineWidth = 3; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(xRain, gy0); ctx.lineTo(xRain, gy1 + 20); ctx.stroke(); ctx.setLineDash([]); P.at(ctx, xRain, gy1 - 30, pop(t, ev.s7_rain) * 0.45, 0, () => P.cloud(ctx, 0, 0, 1, { color: C.water })); P.rain(ctx, t, xRain - 30, xRain + 30, gy1, () => gy1 + 60, { n: 6 }); }
      // +12 h dimension
      if (t >= ev.s7_12a) { const h = Math.round(Data.count(t, ev.s7_12a, ev.s7_12, 0, 12)); P.dim(ctx, xRain, gy0 + 0, xPeak, gy0, null, t, ev.s7_12a); P.tag(ctx, `+${h} H`, (xRain + xPeak) / 2, gy0 + 60, t, ev.s7_12a, 1e9, { size: 36 }); }
      P.callout(ctx, 'FAST!', xPeak, lerp(gy0, gy1, spd(xPeak)), 560, gy1 - 20, t, ev.sync_spike, 1e9, { size: 36, bg: C.coral });
      if (t >= ev.s7_weeks) P.dim(ctx, xPeak, gy1 + 220, xCalm, gy1 + 220, '< 2 WEEKS', t, ev.s7_weeks, { off: -40 });
      P.tag(ctx, 'BACK TO NORMAL', 720, gy0 - 60, t, ev.s7_calm, 1e9, { size: 30, bg: C.line });
    }
    P.flash(ctx, t, ev.sync_spike);
  } });

  // ================= S8 — payoff: not only heat; a storm is the grease underneath =================
  const gm = P.glacierGeom(0, 330, 0, 120);
  SH.push({ at: ev.s8, in: { type: 'flash', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    const panel = (x, y, title, t0, fn, col) => { const k = pop(t, t0, 0.35, 1.6); if (k <= 0) return; P.at(ctx, x, y, k, 0, () => {
      ctx.fillStyle = 'rgba(10,33,72,0.7)'; ctx.fillRect(-200, -260, 400, 520); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.strokeRect(-200, -260, 400, 520);
      fn(); P.text(ctx, title, 0, 230, { size: 50, color: col }); }); };
    panel(285, 680, 'HEAT', ev.s8_heat - 0.15, () => {
      P.sun(ctx, 0, -150, 44, t);
      ctx.save(); ctx.translate(-165, -10); P.ice(ctx, gm, t, {}); ctx.restore();
      for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; ctx.fillStyle = C.water; ctx.beginPath(); ctx.arc(-80 + i * 80, 40 + ph * 80, 7, 0, 7); ctx.fill(); }
    }, C.gold);
    panel(715, 680, 'STORM', ev.s8_storm - 0.1, () => {
      P.cloud(ctx, 0, -160, 0.7); P.rain(ctx, t, -100, 100, -130, () => -20, { n: 14, seed: 11 });
      const sl = t < ev.sync_grease ? 0 : 50 * ease.outCubic(clamp((t - ev.sync_grease) / 0.7));
      ctx.save(); ctx.translate(-165, -10); P.bedWater(ctx, gm, t, { th: 14 }); P.ice(ctx, gm, t, { slide: sl }); ctx.restore();
      if (sl > 5) P.arrow(ctx, -60, 190, -60 + sl * 2.4, 190, 1, { color: C.yellow, lw: 8, head: 24 });
    }, C.water);
    P.tag(ctx, 'NOT ONLY…', 285, 360, t, ev.s8_x, 1e9, { size: 34, bg: C.coral, rot: -0.05 });
    P.stamp(ctx, 'STORM = GREASE', CX, 1110, t, ev.sync_grease, { size: 72 });
    P.tag(ctx, 'UP TO 7.5 M IN ONE DAY', CX, 1290, t, ev.s8_slide, 1e9, { size: 38, bg: C.line });
    P.flash(ctx, t, ev.sync_grease);
  } });

  // ================= S9 — Whyverse end card =================
  SH.push({ at: ev.s9, in: { type: 'fade', dur: 0.4 }, draw(ctx, t) {
    P.bg(ctx, t, { drift: 0.6 });
    const k = pop(t, ev.s9 + 0.1, 0.6, 1.4);
    P.at(ctx, CX, 640 + Math.sin(t * 1.4) * 10, k, 0, () => P.planet(ctx, 0, 0, 130, t));
    P.pText(ctx, 'FOLLOW', CX, 990, t, ev.s9_follow, 1e9, { size: 70, color: C.line });
    P.pText(ctx, 'WHYVERSE', CX, 1110, t, ev.s9_follow + 0.15, 1e9, { size: 110, color: C.yellow });
    P.tag(ctx, '▶ Full videos on our YouTube', CX, 1290, t, ev.s9_yt, 1e9, { size: 40, bg: C.red, txt: '#fff' });
    P.text(ctx, 'IG @whyverse___ · TikTok @Whyverse', CX, 1410, { size: 30, fam: 'Inter', weight: 700, color: C.dim, alpha: fin(t, ev.s9_yt + 0.4) });
  } });
})();
