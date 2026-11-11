// Whyverse trend Short 2026-11-11 — the 9 shots, PAPER CUT-OUT style. 1080x1920; text inside G.SAFE (x 60..940, y 221..1498).
// Captions at y≈1440 (inside SAFE, above the bottom 22%). No camera shake; slow pushes ≤ 3 %; text never boils.
(function () {
  const G = globalThis.G, U = globalThis.U, S = globalThis.SCORE, P = globalThis.P;
  const { clamp, lerp, ease } = U;
  const { ev } = S; const C = P.C, CX = P.CX;
  const pop = P.pop, fin = P.fin;
  const SH = globalThis.SHOTS = [];
  const pushZ = (ctx, t, t0, t1, cx = CX, cy = 860, amt = 0.03) => { const z = 1 + amt * clamp((t - t0) / (t1 - t0)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy); };
  const label = (ctx, s, x, y, o = {}) => P.text(ctx, s, x, y, Object.assign({ size: 30, fam: 'Inter', weight: 800, color: C.dim }, o));
  const cnt = (t, t0, t1, a, b, dec = 1) => (a + (b - a) * ease.outCubic(clamp((t - t0) / Math.max(0.01, t1 - t0)))).toFixed(dec);
  const popAt = (ctx, x, y, t, t0, fn, s = 2) => { const k = pop(t, t0, 0.35, s); if (k > 0) P.at(ctx, x, y, k, 0, fn); };

  P.KEY = { l1: ['fall', 'celebrating?'].map((s) => s.replace('?', '')), l2: ['thirtyeight', 'zero'], l3: ['solar', 'shock'], l4: ['rise', 'fortythree'], l5: ['bathtub', 'filling'], l6: ['fiftyfour', 'twentyseven'], l7: ['four', 'fifty'], l8: ['fiftynine', 'faster'], l9: ['whyverse'] };

  // ================= S1 — emissions set to fall... so why aren't scientists celebrating? =================
  SH.push({ at: 0, in: 'cut', draw(ctx, t) {
    P.bg(ctx, t);
    ctx.save(); pushZ(ctx, t, 0, ev.s2, CX, 1000, 0.03);
    // ground strip
    P.cut(ctx, '#C9B48A', () => { ctx.beginPath(); ctx.rect(-20, 1180, G.W + 40, 120); }, { edge: 0 });
    const smoke = 1 - 0.35 * fin(t, ev.s1_fall, 0.8);
    P.factory(ctx, 330, 1185, 1.25, t, { smoke });
    // falling chart line (emissions) on the right
    const p = fin(t, ev.s1_fall - 0.2, 0.9);
    if (t > ev.s1_fall - 0.25) { ctx.save(); ctx.strokeStyle = C.red; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      const pts = [[640, 1020], [700, 960], [760, 930], [820, 900], [880, 930]]; const n = 1 + p * (pts.length - 1);
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < Math.floor(n) + 1 && i < pts.length; i++) { const q = Math.min(1, n - i + 1); ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], q), lerp(pts[i - 1][1], pts[i][1], q)); } ctx.stroke(); ctx.restore();
      P.tag(ctx, '↓ THIS YEAR', 800, 1080, t, ev.s1_fall + 0.4, 1e9, { size: 32, bg: C.cyan, txt: '#fff' }); }
    // party popper crossed out next to the question
    popAt(ctx, 820, 760, t, ev.s1_why, () => { P.cut(ctx, C.yellow, () => { ctx.beginPath(); ctx.moveTo(-40, 50); ctx.lineTo(40, 50); ctx.lineTo(0, -60); ctx.closePath(); });
      for (let k = 0; k < 6; k++) { ctx.fillStyle = [C.red, C.cyan, C.coral][k % 3]; ctx.fillRect(-60 + k * 22, -100 - (k % 2) * 30 - Math.sin(t * 4 + k) * 6, 12, 12); } });
    P.cross(ctx, 820, 740, 70, t, ev.sync_why);
    ctx.restore();
    P.tag(ctx, 'GLOBAL CARBON BUDGET 2026', CX, 290, t + 0.4, 0, 1e9, { size: 34, bg: C.ink, txt: '#FFF8EA' });
    P.pText(ctx, 'FOSSIL FUEL', CX, 420, t + 0.4, 0.05, 1e9, { size: 84, color: C.ink });
    P.pText(ctx, 'EMISSIONS FALL', CX, 525, t + 0.4, 0.15, 1e9, { size: 84, color: C.red });
    P.stamp(ctx, 'SO WHY WORRY?', 400, 680, t, ev.sync_why, { size: 66, color: C.red, rot: -0.05 });
    P.flash(ctx, t, ev.sync_why, { color: '255,255,255', a: 0.25 });
  } });

  // ================= S2 — report, 140+ scientists, 38.2 bn t, −0.4 % =================
  SH.push({ at: ev.s2, in: { type: 'wipe', dur: 0.3 }, draw(ctx, t) {
    P.bg(ctx, t);
    // report slides in
    const rk = ease.outBack(clamp((t - ev.s2 + 0.1) / 0.5), 1.4);
    P.report(ctx, lerp(-300, 290, rk), 610, 0.95, t);
    // scientists pop in a grid on the right
    ev.s2_ppl.forEach((te, i) => { const k = pop(t, te, 0.3, 2.2); if (k <= 0) return; for (let j = 0; j < 2; j++) { const x = 640 + (i % 4) * 85 + j * 40, y = 500 + Math.floor(i / 4) * 130 + j * 50; P.at(ctx, x, y, k, 0, () => P.person(ctx, 0, 0, 0.9, ['#FFFFFF', '#F7F3EA'][j], ['#E0B48A', '#9C6B48', '#F1C9A5', '#6E4B33'][(i + j) % 4])); } });
    P.tag(ctx, '140+ SCIENTISTS', 780, 820, t, ev.s2_ppl[6] + 0.1, 1e9, { size: 34, bg: C.yellow });
    // counter 38.2
    if (t > ev.s2_c0 - 0.1) { const k = pop(t, ev.s2_c0 - 0.05, 0.3, 1.8); P.at(ctx, CX, 1050, k, 0, () => { P.digits(ctx, cnt(t, ev.s2_c0, ev.s2_c1, 0, 38.2), 0, 0, { size: 130, color: C.ink, box: C.ink }); }); label(ctx, 'BILLION TONNES OF FOSSIL CO₂', CX, 1170, { alpha: fin(t, ev.s2_c0 + 0.3), color: C.ink }); }
    // −0.4 % with down arrow
    popAt(ctx, 220, 1290, t, ev.s2_down, () => P.fatArrow(ctx, 0, 0, 0.6, -1, C.cyan));
    P.stamp(ctx, '−0.4%', 560, 1290, t, ev.sync_pct, { size: 92, color: C.cyan, rot: -0.04 });
    P.flash(ctx, t, ev.sync_pct, { color: '255,255,255', a: 0.22 });
  } });

  // ================= S3 — part solar/wind/EV, part oil price shock (can bounce back) =================
  SH.push({ at: ev.s3, in: { type: 'wipe', dur: 0.3 }, draw(ctx, t) {
    P.bg(ctx, t);
    // divider
    ctx.save(); ctx.strokeStyle = 'rgba(43,42,51,0.3)'; ctx.setLineDash([14, 14]); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(CX, 340); ctx.lineTo(CX, 1300); ctx.stroke(); ctx.restore();
    // left: clean energy
    popAt(ctx, 240, 800, t, Math.min(ev.s3_wind, ev.s3 + 0.35), () => P.turbine(ctx, 0, 0, 1.15, t));
    popAt(ctx, 300, 1000, t, Math.min(ev.s3_solar, ev.s3 + 0.15), () => P.solar(ctx, 0, 0, 1.0));
    popAt(ctx, 270, 1170, t, ev.s3_ev, () => P.car(ctx, 0, 0, 1.0, t * fin(t, ev.s3_ev + 0.3, 0.1)));
    P.tag(ctx, 'SOLAR · WIND · EVs', 270, 420, t, ev.s3_solar, 1e9, { size: 32, bg: C.green, txt: '#fff' });
    // right: oil price shock
    popAt(ctx, 810, 900, t, ev.s3_oil, () => P.barrel(ctx, 0, 0, 1.3));
    if (t > ev.s3_shock - 0.1) { const k = pop(t, ev.s3_shock, 0.3, 2.4); P.at(ctx, 810, 560, k, 0, () => { P.fatArrow(ctx, 0, 0, 0.75, 1, C.red); P.text(ctx, '$', 0, 30, { size: 60, color: '#fff' }); }); }
    P.tag(ctx, 'OIL PRICE SHOCK', 810, 420, t, ev.s3_shock, 1e9, { size: 32, bg: C.red, txt: '#fff' });
    // bounce-back curved arrow
    if (t > ev.sync_bounce - 0.05) { const p = ease.outCubic(clamp((t - ev.sync_bounce) / 0.45)); ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(810, 1150, 90, Math.PI * 0.1, Math.PI * (0.1 + 1.6 * p)); ctx.stroke(); ctx.restore(); }
    P.stamp(ctx, 'CAN BOUNCE BACK', 760, 1180, t, ev.sync_bounce + 0.15, { size: 46, color: C.red, rot: 0.04 });
  } });

  // ================= S4 — fires + lost forests: total still rises to 43.3 =================
  SH.push({ at: ev.s4, in: { type: 'wipe', dur: 0.3 }, draw(ctx, t) {
    P.bg(ctx, t, { tint: '#F6E2C8' });
    P.cut(ctx, '#B7A57A', () => { ctx.beginPath(); ctx.rect(-20, 900, G.W + 40, 70); }, { edge: 0 });
    // forest: trees, some fall at "forests", fires at "fires"
    for (let i = 0; i < 6; i++) { const x = 120 + i * 165, f = i % 2 ? ease.inCubic(clamp((t - ev.s4_forest - i * 0.05) / 0.5)) : 0;
      P.tree(ctx, x, 905, 0.95 + 0.1 * U.hash(i, 3), { fall: f * (i % 4 === 1 ? 1 : -1) * 0.9 * (i === 5 ? 0 : 1) }); }
    [[220, 905], [560, 905], [880, 905]].forEach(([x, y], i) => { const k = pop(t, ev.s4_fires + i * 0.12, 0.35, 1.8); if (k > 0) { P.at(ctx, x, y, k, 0, () => P.flame(ctx, 0, 0, 0.9, t, i)); P.smoke(ctx, x, y - 160, t, { rate: k * 0.7, seed: i + 5, h: 300 }); } });
    // stacked bar: fossil 38.2 + land 5.1 = 43.3
    const bx = 260, by = 1300, bw = 560;
    if (t > ev.s4_total - 0.1) { const a = fin(t, ev.s4_total - 0.1, 0.3);
      ctx.save(); ctx.globalAlpha *= a;
      P.cut(ctx, C.smoke, () => P.rr(ctx, bx, by - 70, bw * (38.2 / 43.3), 70, 8));
      const q = ease.outCubic(clamp((t - ev.s4_rise) / 0.6)); if (q > 0) P.cut(ctx, C.red, () => P.rr(ctx, bx + bw * (38.2 / 43.3) - 4, by - 70, bw * (5.1 / 43.3) * q + 4, 70, 8));
      label(ctx, 'FOSSIL 38.2', bx + 220, by - 24, { color: '#fff', size: 30 });
      ctx.restore();
      if (q > 0.5) label(ctx, '+ FIRES & FORESTS', bx + bw - 60, by + 45, { color: C.red, size: 28, alpha: q }); }
    // big total counter
    if (t > ev.s4_c0 - 0.1) { const k = pop(t, ev.s4_c0 - 0.05, 0.3, 1.8); P.at(ctx, CX, 1060, k, 0, () => P.digits(ctx, cnt(t, ev.s4_c0, ev.s4_c1, 42.8, 43.3), 0, 0, { size: 120, color: C.red, box: C.ink })); }
    P.tag(ctx, 'TOTAL CO₂ · BILLION TONNES', CX, 290, t, ev.s4_total, 1e9, { size: 34, bg: C.ink, txt: '#FFF8EA' });
    P.chip(ctx, 'LAST YEAR: 42.8', CX, 390, t, ev.s4_total + 0.3, 1e9, { size: 32, color: C.dim });
    P.stamp(ctx, 'STILL RISING', CX, 520, t, ev.sync_total, { size: 76, color: C.red, rot: -0.04 });
    P.flash(ctx, t, ev.sync_total, { color: '255,255,255', a: 0.22 });
  } });

  // ================= S5 — the bathtub =================
  SH.push({ at: ev.s5, in: { type: 'wipe', dur: 0.3 }, draw(ctx, t) {
    P.bg(ctx, t, { tint: '#EAF0F2' });
    ctx.save(); pushZ(ctx, t, ev.s5, ev.s6, CX, 900, 0.03);
    const flow = 1 - 0.25 * ease.inOutCubic(clamp((t - ev.s5_tap) / 0.6));
    const level = 0.25 + 0.4 * clamp((t - ev.s5) / (ev.s6 - ev.s5));
    const turn = 0.7 * ease.inOutCubic(clamp((t - ev.s5_tap) / 0.6));
    const T = P.tub(ctx, CX, 950, t, { flow, level, turn });
    ctx.restore();
    label(ctx, 'TAP = EMISSIONS', 500, 640, { color: C.ink, alpha: fin(t, ev.s5_tub + 0.2) });
    label(ctx, 'WATER = CO₂ IN THE AIR', CX, 1230, { color: C.water, size: 34, alpha: fin(t, ev.s5_tub + 0.6) });
    P.tag(ctx, 'THE AIR IS A BATHTUB', CX, 300, t, ev.s5_tub, 1e9, { size: 40, bg: C.yellow });
    P.chip(ctx, 'TAP A LITTLE LOWER…', CX, 410, t, ev.s5_tap, 1e9, { size: 32, color: C.ink });
    // rising level arrow
    if (t > ev.sync_fill - 0.1) { const k = pop(t, ev.sync_fill, 0.3, 2); P.at(ctx, 170, 900 - Math.sin(t * 3) * 8, k, 0, () => P.fatArrow(ctx, 0, 0, 0.7, 1, C.water)); }
    P.stamp(ctx, 'STILL FILLING', CX, 1340, t, ev.sync_fill, { size: 70, color: C.water, rot: -0.04 });
  } });

  // ================= S6 — 427 ppm, 54 % above pre-industrial =================
  SH.push({ at: ev.s6, in: { type: 'wipe', dur: 0.3 }, draw(ctx, t) {
    P.bg(ctx, t, { tint: '#EAF0F2' });
    // two gauge columns: pre-industrial vs 2026
    const base = 1250, top = 520, max = 450;
    const col = (x, v, colr, lab, t0) => { const p = ease.outCubic(clamp((t - t0) / 0.9)); const hh = (base - top) * (v / max) * p;
      P.cut(ctx, '#FFFFFF', () => rr(ctx, x - 90, top - 10, 180, base - top + 20, 20));
      P.cut(ctx, colr, () => rr(ctx, x - 75, base - hh, 150, hh, 14), { edge: 0, sh: 0 });
      for (let k = 0; k < 4; k++) { const u = ((t * 0.3 + k / 4) % 1); const by = base - hh * u; if (hh > 60) P.co2(ctx, x - 30 + 50 * U.hash(k, x), Math.max(base - hh + 30, by), 20, { color: 'rgba(255,255,255,0.35)' }); }
      label(ctx, lab, x, base + 60, { color: C.ink, size: 30 }); };
    const rr = P.rr;
    col(300, 278, C.smoke, 'PRE-INDUSTRIAL', ev.s6 + 0.3);
    col(780, 427.7, C.water, '2026', ev.s6_c0);
    P.text(ctx, '≈278', 300, 770, { size: 54, color: C.dim, alpha: fin(t, ev.s6 + 1.0) });
    if (t > ev.s6_c0 - 0.1) { const k = pop(t, ev.s6_c0 - 0.05, 0.3, 1.8); P.at(ctx, 780, 420, k, 0, () => P.digits(ctx, cnt(t, ev.s6_c0, ev.s6_c1, 278, 427, 0), 0, 0, { size: 110, color: C.water, box: C.ink })); }
    P.tag(ctx, 'CO₂ PARTS PER MILLION', CX, 285, t, ev.s6_air, 1e9, { size: 36, bg: C.ink, txt: '#FFF8EA' });
    P.stamp(ctx, '+54%', 500, 560, t, ev.sync_54, { size: 110, color: C.red, rot: -0.06 });
    P.flash(ctx, t, ev.sync_54, { color: '255,255,255', a: 0.22 });
  } });

  // ================= S7 — 150 billion tonnes left, under 4 years =================
  SH.push({ at: ev.s7, in: { type: 'wipe', dur: 0.3 }, draw(ctx, t) {
    P.bg(ctx, t);
    // thermometer 1.5 °C
    const th = pop(t, ev.s7_deg - 0.2, 0.35, 1.8);
    if (th > 0) P.at(ctx, 170, 760, th, 0, () => { P.cut(ctx, '#FFFFFF', () => { ctx.beginPath(); ctx.roundRect(-30, -250, 60, 260, 30); ctx.arc(0, 40, 55, 0, 7); });
      ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(0, 40, 42, 0, 7); ctx.fill(); const lv = 120 + 90 * fin(t, ev.s7_deg, 1.2); ctx.fillRect(-14, 20 - lv, 28, lv);
      ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.setLineDash([10, 8]); ctx.beginPath(); ctx.moveTo(-60, -200); ctx.lineTo(60, -200); ctx.stroke(); ctx.setLineDash([]);
      P.text(ctx, '1.5°C', 0, -230, { size: 40, color: C.red }); });
    // budget bar draining
    const x0 = 330, y0 = 640, w = 600, h = 120;
    const bk = fin(t, ev.s7_budget - 0.2, 0.4);
    if (bk > 0) { ctx.save(); ctx.globalAlpha *= bk;
      P.cut(ctx, '#FFFFFF', () => P.rr(ctx, x0, y0, w, h, 16));
      const left = 1 - 0.25 * clamp((t - ev.s7_cal[0]) / 1.2) - 0.75 * ease.inOutCubic(clamp((t - ev.s7_cal[0]) / 1.4));
      P.cut(ctx, C.yellow, () => P.rr(ctx, x0 + 10, y0 + 10, (w - 20) * Math.max(0.02, left), h - 20, 10), { edge: 0, sh: 0 });
      ctx.restore();
      label(ctx, 'CARBON BUDGET LEFT', x0 + w / 2, y0 - 30, { color: C.ink }); }
    if (t > ev.s7_150 - 0.3) { const k = pop(t, ev.s7_150 - 0.2, 0.3, 1.8); P.at(ctx, 630, 920, k, 0, () => { P.digits(ctx, '150', 0, 0, { size: 120, color: C.ink, box: C.ink }); }); label(ctx, 'BILLION TONNES CO₂', 630, 1040, { color: C.ink, alpha: fin(t, ev.s7_150) }); }
    // calendars 1..4 flip in
    ev.s7_cal.forEach((tc, i) => { const k = pop(t, tc, 0.3, 2); if (k > 0) P.at(ctx, 210 + i * 220, 1210, k, (i - 1.5) * 0.04, () => P.cal(ctx, 0, 0, 0.9, String(i + 1))); });
    P.tag(ctx, 'TO STAY UNDER 1.5°C', CX, 300, t, ev.s7_deg, 1e9, { size: 38, bg: C.red, txt: '#fff' });
    P.stamp(ctx, '< 4 YEARS', CX, 450, t, ev.sync_years, { size: 96, color: C.red, rot: -0.04 });
    P.flash(ctx, t, ev.sync_years, { color: '255,255,255', a: 0.22 });
  } });

  // ================= S8 — payoff: 59 countries; the tap can turn — faster =================
  SH.push({ at: ev.s8, in: { type: 'wipe', dur: 0.3 }, draw(ctx, t) {
    P.bg(ctx, t, { tint: '#EEF3E2' });
    const toTub = ease.inOutCubic(clamp((t - (ev.s8_turn - 0.6)) / 0.6));
    // part A: globe with 59 pins + mini chart
    if (toTub < 1) { ctx.save(); ctx.globalAlpha *= 1 - toTub;
      P.globe(ctx, CX, 760, 270, t);
      const n = Math.floor(59 * clamp((t - ev.s8_c0) / (ev.s8_c1 - ev.s8_c0 + 0.3)));
      for (let i = 0; i < n; i++) { const a = U.hash(i, 31) * 6.283, r = 240 * Math.sqrt(U.hash(i, 32)); const x = CX + Math.cos(a) * r, y = 760 + Math.sin(a) * r * 0.9;
        ctx.fillStyle = C.yellow; ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 10, 0, 7); ctx.fill(); ctx.stroke(); }
      if (t > ev.s8_c0 - 0.1) { const k = pop(t, ev.s8_c0 - 0.05, 0.3, 1.8); P.at(ctx, CX, 1150, k, 0, () => P.digits(ctx, String(Math.max(1, Math.min(59, n || 1))), 0, 0, { size: 110, color: C.green, box: C.ink })); }
      label(ctx, 'COUNTRIES', CX, 1260, { color: C.ink, alpha: fin(t, ev.s8_c0 + 0.3) });
      // economy up, emissions down arrows
      popAt(ctx, 190, 1140, t, ev.s8_cut, () => { P.fatArrow(ctx, 0, 0, 0.55, -1, C.cyan); });
      label(ctx, 'EMISSIONS', 190, 1250, { color: C.cyan, alpha: fin(t, ev.s8_cut) });
      popAt(ctx, 890, 1140, t, ev.s8_grew, () => { P.fatArrow(ctx, 0, 0, 0.55, 1, C.green); });
      label(ctx, 'ECONOMY', 890, 1250, { color: C.green, alpha: fin(t, ev.s8_grew) });
      ctx.restore(); }
    // part B: the tap turns
    if (toTub > 0) { ctx.save(); ctx.globalAlpha *= toTub;
      const turn = 0.7 + 2.0 * ease.inOutCubic(clamp((t - ev.s8_turn) / 1.6));
      const flow = clamp(0.75 - 0.6 * ease.inOutCubic(clamp((t - ev.s8_turn) / 1.6)), 0.15, 1);
      P.tub(ctx, CX, 980, t, { flow, level: 0.62, turn });
      ctx.restore();
      P.chip(ctx, 'THE TAP CAN TURN', CX, 470, t, ev.s8_turn, 1e9, { size: 40, color: C.green }); }
    P.tag(ctx, 'THE GOOD NEWS', CX, 300, t, ev.s8_good, 1e9, { size: 40, bg: C.green, txt: '#fff' });
    P.stamp(ctx, 'FASTER', CX, 1330, t, ev.sync_faster, { size: 100, color: C.green, rot: -0.04 });
    P.flash(ctx, t, ev.sync_faster, { color: '255,255,255', a: 0.22 });
  } });

  // ================= S9 — Whyverse end card =================
  SH.push({ at: ev.s9, in: { type: 'fade', dur: 0.4 }, draw(ctx, t) {
    P.bg(ctx, t, { tint: '#1E2A4A' });
    ctx.fillStyle = C.navy; ctx.fillRect(0, 0, G.W, G.H);
    for (let i = 0; i < 80; i++) { ctx.fillStyle = `rgba(255,248,234,${0.3 + 0.4 * U.hash(i, 2)})`; ctx.fillRect(U.hash(i, 3) * G.W, U.hash(i, 4) * G.H, 3, 3); }
    const k = pop(t, ev.s9 + 0.1, 0.6, 1.4);
    P.at(ctx, CX, 640 + Math.sin(t * 1.4) * 10, k, 0, () => P.planet(ctx, 0, 0, 130, t));
    P.pText(ctx, 'FOLLOW', CX, 990, t, ev.s9_follow, 1e9, { size: 70, color: '#FFF8EA' });
    P.pText(ctx, 'WHYVERSE', CX, 1110, t, ev.s9_follow + 0.15, 1e9, { size: 110, color: C.yellow });
    P.tag(ctx, '▶ Full videos on our YouTube', CX, 1250, t, ev.s9_yt, 1e9, { size: 40, bg: C.red, txt: '#fff' });
    P.text(ctx, 'IG @whyverse___ · TikTok @Whyverse', CX, 1350, { size: 30, fam: 'Inter', weight: 700, color: '#C9C2B2', alpha: fin(t, ev.s9_yt + 0.4) });
  } });
})();
