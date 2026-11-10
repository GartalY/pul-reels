// Whyverse trend Short 2026-11-10 — the 9 shots, NEON style. 1080x1920; text inside G.SAFE (x 60..940, y 221..1498).
// Captions at y≈1440 (inside SAFE, above the bottom 22%). No camera shake; slow pushes ≤ 3 %.
(function () {
  const G = globalThis.G, U = globalThis.U, Data = globalThis.Data, S = globalThis.SCORE, P = globalThis.P;
  const { clamp, lerp, ease } = U;
  const { ev } = S; const C = P.C, CX = P.CX;
  const pop = P.pop, fin = P.fin;
  const SH = globalThis.SHOTS = [];
  const pushZ = (ctx, t, t0, t1, cx = CX, cy = 860, amt = 0.03) => { const z = 1 + amt * clamp((t - t0) / (t1 - t0)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy); };
  const label = (ctx, s, x, y, o = {}) => P.text(ctx, s, x, y, Object.assign({ size: 30, fam: 'Inter', weight: 800, color: C.dim }, o));
  const ph = (t, t0, d) => ease.inOutCubic(clamp((t - t0) / d));

  P.KEY = { l1: ['first', 'robot', 'space', 'astronaut.'].map((s) => s.replace('.', '')), l2: ['astra', 'cubic'], l3: ['narrow', 'origami'], l4: ['struts', 'bay'], l5: ['net', 'next'], l6: ['eleven', 'three'], l7: ['kilometres'], l8: ['orbit'], l9: ['whyverse'] };

  // ================= S1 — first time ever; robot builds in space; 0 astronauts =================
  SH.push({ at: 0, in: 'cut', draw(ctx, t) {
    P.bg(ctx, t, { grid: false });
    ctx.save(); pushZ(ctx, t, 0, ev.s2, CX, 900, 0.03);
    P.earth(ctx, t, { y: 1380, r: 1700 });
    // arm builds a bay (fast) — motion from frame 0
    const pr = P.iso(430, 1000, 210);
    const p = clamp(t / (ev.sync_zero - 0.2));
    const V = P.bay(ctx, pr, { p, t, net: fin(t, ev.s1_space, 0.6) });
    const k = Math.min(11, Math.floor(p * 12)); const [, b] = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]][k];
    const tgt = p < 1 ? V[b] : [V[6][0] + Math.sin(t * 2) * 20, V[6][1] - 60];
    P.arm(ctx, 800, 1170, tgt[0], tgt[1], { l1: 300, l2: 280 });
    ctx.restore();
    P.tag(ctx, 'FIRST TIME EVER', CX, 300, t + 0.4, 0, 1e9, { size: 40, bg: C.yellow });
    P.pText(ctx, 'ROBOT BUILDS', CX, 440, t + 0.4, 0.05, 1e9, { size: 84, color: C.line });
    P.pText(ctx, 'IN SPACE', CX, 545, t + 0.4, 0.15, 1e9, { size: 96, color: C.cyan });
    // astronaut crossed out, 0 counter
    if (t >= ev.s1_wo - 0.1) { const kk = pop(t, ev.s1_wo, 0.3, 2); P.at(ctx, 820, 720, kk, 0, () => P.astro(ctx, 0, 0, 0.9)); P.cross(ctx, 820, 700, 70, t, ev.sync_zero); }
    P.stamp(ctx, '0 ASTRONAUTS', CX, 1260, t, ev.sync_zero, { size: 70, color: C.mag });
    P.flash(ctx, t, ev.sync_zero, { color: '255,79,216', a: 0.18 });
  } });

  // ================= S2 — ASTRA, Caltech, launched 30 March 2026, ~1 m³ box =================
  SH.push({ at: ev.s2, in: { type: 'flash', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    // launch: rocket rises with a trail
    const lt = t - ev.s2_launch; const ry = lt < 0 ? 1250 : 1250 - 380 * ease.inCubic(clamp(lt / 1.8)) - Math.max(0, lt - 1.8) * 500;
    if (lt > 0) { ctx.save(); const gr = ctx.createLinearGradient(0, ry, 0, 1300); gr.addColorStop(0, 'rgba(255,138,92,0.5)'); gr.addColorStop(1, 'rgba(255,138,92,0)'); ctx.fillStyle = gr; ctx.fillRect(250, ry, 60, 1300 - ry); ctx.restore(); }
    P.rocket(ctx, 280, ry, 64, 330, { flame: lt > 0 ? 1 : 0.15, t });
    P.neon(ctx, C.line, 3, () => { ctx.beginPath(); ctx.moveTo(130, 1262); ctx.lineTo(430, 1262); });
    label(ctx, 'VANDENBERG, CALIFORNIA', 280, 1310, { size: 24, alpha: fin(t, ev.s2_launch) });
    // payload box (wire cube) with dims
    const bt = ev.s2_box; const kb = pop(t, bt - 0.1, 0.4, 1.8);
    if (kb > 0) { ctx.save(); ctx.translate(680, 900); ctx.scale(kb, kb); ctx.translate(-680, -900);
      const pr = P.iso(600, 960, 190); const V = P.bay(ctx, pr, { p: 1, color: C.yellow, lw: 5, diag: false });
      // tiny arm folded inside
      ctx.globalAlpha = 0.7; P.arm(ctx, 640, 1010, 700, 860, { l1: 80, l2: 70, color: C.mag }); ctx.globalAlpha = 1;
      if (t > ev.s2_dim) P.dim(ctx, V[0][0] - 20, V[0][1] + 30, V[1][0] - 20, V[1][1] + 30, null, t, ev.s2_dim, { color: C.cyan });
      ctx.restore(); }
    P.tag(ctx, '≈ 1 M³', 700, 1200, t, ev.s2_dim + 0.2, 1e9, { size: 46, bg: C.cyan });
    P.stamp(ctx, 'ASTRA', CX, 330, t, ev.s2_name, { size: 96, color: C.cyan, rot: -0.03 });
    P.chip(ctx, 'MADE AT CALTECH · DARPA-FUNDED', CX, 460, t, ev.s2_cal, 1e9, { size: 32, color: C.yellow });
    // date card in digit boxes
    if (t > ev.s2_date - 0.1) { const k = pop(t, ev.s2_date, 0.35, 2); P.at(ctx, 680, 640, k, 0, () => { P.digits(ctx, '30', -150, 0, { size: 84, color: C.yellow, box: C.yellow }); P.text(ctx, 'MAR', 40, 30, { size: 64 }); P.text(ctx, '2026', 190, 30, { size: 44, color: C.dim }); }); }
    label(ctx, 'LAUNCH', 680, 560, { alpha: fin(t, ev.s2_date) });
  } });

  // ================= S3 — rockets are narrow; Webb's 6.5 m mirror folded to fit =================
  SH.push({ at: ev.s3, in: { type: 'fade', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    P.tag(ctx, 'WHY BUILD UP THERE?', CX, 300, t, ev.s3 + 0.1, 1e9, { size: 40, bg: C.yellow });
    // fairing outline (narrow)
    const fk = pop(t, ev.s3_rocket, 0.4, 1.6);
    const fold = ph(t, ev.s3_fold, ev.sync_fit - ev.s3_fold);
    if (fk > 0) { ctx.save(); ctx.globalAlpha *= clamp(fk); const fx = CX, fw = 300; const sq = 1 + 0.06 * Math.exp(-Math.max(0, t - ev.s3_narrow) * 6) * (t > ev.s3_narrow ? 1 : 0);
      P.neon(ctx, C.line, 5, () => { ctx.beginPath(); ctx.moveTo(fx - fw / 2 / sq, 1320); ctx.lineTo(fx - fw / 2 / sq, 760); ctx.quadraticCurveTo(fx - fw / 2 / sq, 520, fx, 470); ctx.quadraticCurveTo(fx + fw / 2 / sq, 520, fx + fw / 2 / sq, 760); ctx.lineTo(fx + fw / 2 / sq, 1320); });
      label(ctx, 'ROCKET FAIRING', fx, 1370, { size: 26, color: C.dim }); ctx.restore(); }
    // mirror: big, then folds and slides into the fairing
    const mk = pop(t, ev.s3_webb - 0.1, 0.45, 1.6);
    if (mk > 0) { const y = lerp(820, 900, fold), s = lerp(1, 0.78, fold);
      ctx.save(); ctx.translate(CX, y); ctx.scale(mk * s, mk * s); P.mirror(ctx, 0, 0, 62, { fold, t }); ctx.restore();
      if (fold < 0.05) P.dim(ctx, CX - 5 * 62 * 1.732 / 2 - 60, 1080, CX + 5 * 62 * 1.732 / 2 + 60, 1080, null, t, ev.s3_c0, { color: C.yellow });
      if (fold > 0.2 && fold < 0.95) { P.arrow(ctx, 160, 820, 300, 860, 1, { color: C.mag, lw: 6, head: 22 }); P.arrow(ctx, 920, 820, 780, 860, 1, { color: C.mag, lw: 6, head: 22 }); } }
    // counter 0.0 -> 6.5 m
    if (t >= ev.s3_c0 - 0.1) { const v = Data.count(t, ev.s3_c0, ev.s3_c1, 0, 6.5); const land = t >= ev.s3_c1 ? Math.exp(-(t - ev.s3_c1) * 7) : 0;
      P.at(ctx, CX - 50, 470 + (fold > 0 ? -0 : 0), pop(t, ev.s3_c0, 0.3) * (1 + 0.1 * land), 0, () => P.digits(ctx, v.toFixed(1), 0, 0, { size: 100, color: t >= ev.s3_c1 ? C.yellow : C.line, box: C.gold })); P.text(ctx, 'M', CX + 140, 505, { size: 76, alpha: fin(t, ev.s3_c0) }); }
    P.chip(ctx, 'WEBB TELESCOPE MIRROR', CX, 610, t, ev.s3_webb + 0.2, ev.s3_fold, { size: 30, color: C.gold });
    P.tag(ctx, 'FOLDED LIKE ORIGAMI', CX, 610, t, ev.s3_fold2, 1e9, { size: 36, bg: C.mag, txt: '#fff' });
    P.stamp(ctx, 'JUST TO FIT', CX, 1220, t, ev.sync_fit, { size: 64, color: C.yellow });
  } });

  // ================= S4 — arm takes struts + joints from dispensers, builds one bay =================
  SH.push({ at: ev.s4, in: { type: 'flash', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    P.tag(ctx, 'HOW ASTRA BUILDS', CX, 300, t, ev.s4 + 0.1, 1e9, { size: 40, bg: C.cyan });
    // dispensers on the left: stacks of struts and joints
    const dk = pop(t, ev.s4_struts - 0.2, 0.35, 1.6);
    if (dk > 0) { ctx.save(); ctx.globalAlpha *= clamp(dk);
      P.neon(ctx, C.line, 4, () => { ctx.beginPath(); ctx.rect(90, 600, 150, 300); ctx.rect(90, 940, 150, 200); });
      const used = t > ev.s4_b0 ? Math.floor(clamp((t - ev.s4_b0) / (ev.s4_b1 - ev.s4_b0)) * 4) : 0;
      for (let i = used; i < 8; i++) P.neon(ctx, C.cyan, 6, () => { ctx.beginPath(); ctx.moveTo(110, 630 + i * 32); ctx.lineTo(220, 630 + i * 32); }, 10);
      for (let i = 0; i < 6; i++) { if (i < used) continue; ctx.fillStyle = C.yellow; P.glow(ctx, C.yellow, 10); ctx.beginPath(); ctx.arc(120 + (i % 3) * 45, 990 + Math.floor(i / 3) * 60, 12, 0, 7); ctx.fill(); P.noGlow(ctx); }
      ctx.restore(); }
    P.callout(ctx, 'STRUTS', 165, 600, 165, 520, t, ev.s4_struts, 1e9, { size: 28, bg: C.cyan });
    P.callout(ctx, 'JOINTS', 165, 1140, 165, 1215, t, ev.s4_joints, 1e9, { size: 28 });
    P.chip(ctx, 'DISPENSERS', 165, 1290, t, ev.s4_disp, 1e9, { size: 26, color: C.line });
    // assembly plate + the bay being built
    const pr = P.iso(560, 1070, 200);
    P.neon(ctx, C.dim, 3, () => { const a = pr(-0.2, 0, -0.2), b = pr(1.2, 0, -0.2), c = pr(1.2, 0, 1.2), d = pr(-0.2, 0, 1.2); ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.lineTo(c[0], c[1]); ctx.lineTo(d[0], d[1]); ctx.closePath(); }, 6);
    const p = t < ev.s4_b0 ? 0 : clamp((t - ev.s4_b0) / (ev.s4_b1 - ev.s4_b0));
    const V = P.bay(ctx, pr, { p, t });
    // arm: shuttles between dispensers and the current edge
    const E = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]];
    let tgt;
    if (t < ev.s4_arm) tgt = [760, 640];
    else if (p <= 0) { const u = ph(t, ev.s4_arm, 0.8); tgt = [lerp(760, 230, u), lerp(640, 700 + 200 * Math.sin(u * 3), u)]; }
    else if (p < 1) { const n = p * 12, k = Math.min(11, Math.floor(n)), f = n - k; const [, b] = E[k]; const dsp = [235, k % 2 ? 1000 : 700];
      tgt = f < 0.35 ? [lerp(V[b][0], dsp[0], f / 0.35), lerp(V[b][1], dsp[1], f / 0.35)] : [lerp(dsp[0], V[b][0], (f - 0.35) / 0.65), lerp(dsp[1], V[b][1], (f - 0.35) / 0.65)]; }
    else tgt = [V[6][0], V[6][1] - 40 + Math.sin(t * 3) * 10];
    P.arm(ctx, 880, 1240, tgt[0], tgt[1], { l1: 340, l2: 330, up: 1 });
    P.callout(ctx, 'ROBOTIC ARM', 880, 1240, 800, 1330, t, ev.s4_arm, 1e9, { size: 28, bg: C.mag, txt: '#fff' });
    P.stamp(ctx, 'ONE BAY', 640, 460, t, ev.sync_bay, { size: 72, color: C.cyan });
  } });

  // ================= S5 — net across it, push the bay out, start the next =================
  SH.push({ at: ev.s5, in: { type: 'fade', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    ctx.save(); pushZ(ctx, t, ev.s5, ev.s6, CX, 900, 0.02);
    P.earth(ctx, t, { y: 1420, r: 1800, alpha: 0.8 });
    const push = ph(t, ev.s5_push, 0.9);
    const pr = P.iso(330, 1000, 170);
    // already-built bays out in space (to the right / up), then this one joins them
    const net = fin(t, ev.s5_net, 0.8);
    P.bay(ctx, pr, { ox: 1 + push, p: 1, t, net: 1, color: C.cyan });
    P.bay(ctx, pr, { ox: 2 + push, p: 1, t, net: 1, color: C.cyan });
    P.bay(ctx, pr, { ox: push, p: 1, t, net, color: push > 0 ? C.cyan : C.yellow });
    if (t >= ev.sync_next) P.bay(ctx, pr, { ox: 0, p: clamp((t - ev.sync_next) / 1.6), t, color: C.yellow });
    const V0 = pr(push + 0.5, 1.2, 0.5);
    P.arm(ctx, 140, 1210, t < ev.s5_push ? V0[0] + Math.sin(t * 5) * 30 : lerp(V0[0], 200, push), t < ev.s5_push ? V0[1] : lerp(V0[1], 900, push), { l1: 260, l2: 250 });
    if (t > ev.s5_push && t < ev.s5_push + 1.2) P.arrow(ctx, 500, 760, 760, 610, ph(t, ev.s5_push, 0.4), { color: C.mag, lw: 8, head: 28 });
    ctx.restore();
    P.tag(ctx, 'SHINY NET', 330, 560, t, ev.s5_shiny, 1e9, { size: 36, bg: C.yellow });
    P.tag(ctx, 'PUSH OUT →', 760, 470, t, ev.s5_push, 1e9, { size: 36, bg: C.mag, txt: '#fff' });
    P.stamp(ctx, 'NEXT ONE', CX, 330, t, ev.sync_next, { size: 70, color: C.yellow });
  } });

  // ================= S6 — target: 1.4 m dish of 11 bays; finished 3 =================
  SH.push({ at: ev.s6, in: { type: 'flash', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    P.tag(ctx, 'THE TARGET', CX, 300, t, ev.s6_target, 1e9, { size: 40, bg: C.cyan });
    const cx = CX, cy = 830, R = 290;
    // dish (ellipse) with the ring of 11 bays
    const dk = pop(t, ev.s6_dish - 0.1, 0.45, 1.5);
    if (dk > 0) { ctx.save(); ctx.translate(cx, cy); ctx.scale(dk, dk);
      ctx.fillStyle = 'rgba(255,225,77,0.07)'; ctx.beginPath(); ctx.arc(0, 0, R, 0, 7); ctx.fill();
      ctx.strokeStyle = 'rgba(255,225,77,0.25)'; ctx.lineWidth = 2; for (let k = 1; k < 6; k++) { ctx.beginPath(); ctx.arc(0, 0, R * k / 6, 0, 7); ctx.stroke(); } for (let k = 0; k < 11; k++) { const a = k / 11 * Math.PI * 2 - Math.PI / 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * R, Math.sin(a) * R); ctx.stroke(); }
      ctx.restore();
      const nShown = t < ev.s6_c0 ? 0 : Math.min(11, Math.floor((t - ev.s6_c0) / ((ev.s6_c1 - ev.s6_c0) / 11)) + 1);
      const done = t < ev.s6_lit[0] ? 0 : t < ev.s6_lit[1] ? 1 : t < ev.s6_lit[2] ? 2 : 3;
      for (let k = 0; k < 11; k++) { if (k >= nShown) break; const a0 = k / 11 * Math.PI * 2 - Math.PI / 2 + 0.03, a1 = (k + 1) / 11 * Math.PI * 2 - Math.PI / 2 - 0.03;
        const built = k < done, col = built ? C.cyan : C.dim; ctx.save(); ctx.globalAlpha *= built ? 1 : (t > ev.s6_time ? 0.35 : 0.7);
        P.neon(ctx, col, built ? 14 : 8, () => { ctx.beginPath(); ctx.arc(cx, cy, R * dk, a0, a1); }, built ? 22 : 6); ctx.restore(); }
      if (t > ev.s6_dim) P.dim(ctx, cx - R, cy + R + 60, cx + R, cy + R + 60, null, t, ev.s6_dim, { color: C.yellow });
    }
    P.tag(ctx, '1.4 M WIDE', CX, cy + R + 130, t, ev.s6_dim + 0.2, ev.sync_three, { size: 40, bg: C.yellow });
    // counter of bays
    if (t >= ev.s6_c0 - 0.05) { const n = t < ev.s6_lit[0] ? Math.min(11, Math.floor(Data.count(t, ev.s6_c0, ev.s6_c1, 0, 11.99, (x) => x))) : (t < ev.s6_lit[1] ? 1 : t < ev.s6_lit[2] ? 2 : 3);
      const s = t < ev.s6_lit[0] ? String(Math.max(1, n)) : n + ' / 11';
      P.text(ctx, s, cx, cy + 20, { size: 110, color: t >= ev.s6_lit[0] ? C.cyan : C.line }); label(ctx, 'BAYS', cx, cy + 80, { size: 34, color: C.line }); }
    // timer: time ran short
    if (t > ev.s6_time - 0.1) { const k = pop(t, ev.s6_time, 0.3, 2); P.at(ctx, 820, 470, k, 0, () => { P.neon(ctx, C.red, 6, () => { ctx.beginPath(); ctx.arc(0, 0, 54, 0, 7); }); const a = -Math.PI / 2 + (t - ev.s6_time) * 5; P.neon(ctx, C.red, 6, () => { ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(a) * 40, Math.sin(a) * 40); }); }); P.tag(ctx, 'TIME RAN SHORT', 790, 560, t, ev.s6_time + 0.1, 1e9, { size: 26, bg: C.red, txt: '#fff' }); }
    P.stamp(ctx, '3 BUILT', CX, 1260, t, ev.sync_three, { size: 68, color: C.cyan });
    label(ctx, '2 PRE-BUILT + 1 BUILT IN ORBIT', CX, cy + 140, { size: 26, alpha: fin(t, ev.sync_three + 0.3) });
  } });

  // ================= S7 — small? the goal: hundreds of metres, even kilometres =================
  SH.push({ at: ev.s7, in: { type: 'fade', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    // zoom out: the 1.4 m dish shrinks to a dot as the scale bar grows
    const z = t < ev.s7_c0 ? 1 : Math.pow(1000 / 1.4, -ease.inOutCubic(clamp((t - ev.s7_c0) / (ev.s7_c1 - ev.s7_c0))));
    const cx = CX, cy = 850;
    const r = 280 * z; ctx.save(); P.neon(ctx, C.cyan, Math.max(2, 12 * Math.sqrt(z)), () => { ctx.beginPath(); ctx.arc(cx, cy, Math.max(2, r), 0, 7); }, 20); ctx.restore();
    // giant structure appears (huge truss ring)
    const gk = fin(t, ev.s7_hund, 0.8);
    if (gk > 0) { ctx.save(); ctx.globalAlpha *= gk; const R = 390; for (let k = 0; k < 36; k++) { const a0 = k / 36 * Math.PI * 2 + t * 0.05, a1 = a0 + Math.PI * 2 / 36 * 0.85;
      P.neon(ctx, k % 2 ? C.mag : C.yellow, 6, () => { ctx.beginPath(); ctx.arc(cx, cy, R, a0, a1); ctx.moveTo(cx + Math.cos(a0) * R, cy + Math.sin(a0) * R); ctx.lineTo(cx + Math.cos(a1) * (R - 40), cy + Math.sin(a1) * (R - 40)); ctx.arc(cx, cy, R - 40, a1, a0, true); }, 10); }
      ctx.restore(); }
    P.chip(ctx, 'ASTRA: 1.4 M', cx, cy + 340, t, ev.s7_small - 0.1, ev.s7_hund, { size: 34, color: C.cyan });
    P.tag(ctx, 'SMALL?', 250, 420, t, ev.s7_small, 1e9, { size: 44, bg: C.yellow, rot: -0.06 });
    P.tag(ctx, 'SURE.', 820, 420, t, ev.s7_sure, 1e9, { size: 40, bg: C.line, rot: 0.06 });
    P.chip(ctx, 'THE GOAL (DARPA)', CX, 300, t, ev.s7_goal, 1e9, { size: 34, color: C.yellow });
    // scale counter
    if (t >= ev.s7_c0 - 0.05) { const v = Data.count(t, ev.s7_c0, ev.s7_c1, 1.4, 1000, (x) => Math.pow(x, 3)); const s = v < 10 ? v.toFixed(1) : Math.round(v).toLocaleString('en-US');
      P.at(ctx, CX, 1270, 1, 0, () => { P.digits(ctx, s, -60, 0, { size: 90, color: t >= ev.s7_c1 ? C.yellow : C.line, box: C.mag }); const tw = [...s].reduce((a, ch) => a + (ch === ',' || ch === '.' ? 38 : 79), 0); P.text(ctx, 'M', -60 + tw / 2 + 55, 32, { size: 64 }); }); }
    P.stamp(ctx, '1 KM+', CX, cy, t, ev.sync_km, { size: 88, color: C.yellow });
  } });

  // ================= S8 — payoff: giant telescopes built in orbit by robots =================
  SH.push({ at: ev.s8, in: { type: 'flash', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t, { grid: false });
    ctx.save(); pushZ(ctx, t, ev.s8, ev.s9, CX, 800, 0.03);
    P.earth(ctx, t, { y: 1330, r: 1700 });
    // giant mirror growing segment by segment
    const sk = fin(t, ev.s8_scope - 0.2, 0.6);
    const grow = t < ev.s8_robots ? 0.55 : lerp(0.55, 1, ph(t, ev.s8_robots, ev.sync_orbit - ev.s8_robots));
    ctx.save(); ctx.globalAlpha *= sk; ctx.translate(CX, 760); ctx.scale(1.45 * grow, 1.45 * grow); P.mirror(ctx, 0, 0, 62, { t, color: C.gold }); ctx.restore();
    // robot arms around it
    if (t >= ev.s8_robots - 0.1) { const k = fin(t, ev.s8_robots, 0.4); ctx.save(); ctx.globalAlpha *= k;
      const arms = [[170, 1050, 300, 880], [910, 1050, 780, 880], [170, 470, 300, 640], [910, 470, 780, 640]];
      arms.forEach(([bx, by, tx, ty], i) => { P.arm(ctx, bx, by, tx + Math.sin(t * 3 + i) * 30, ty + Math.cos(t * 2.6 + i) * 30, { l1: 120, l2: 110, up: i % 2 ? 1 : -1 }); });
      ctx.restore(); }
    // tiny rocket for scale, "in one piece" crossed
    const rk = pop(t, ev.s8_rocket - 0.1, 0.35, 1.6);
    if (rk > 0) { P.at(ctx, 890, 1130, rk, 0, () => P.rocket(ctx, 0, 0, 22, 120, {})); label(ctx, 'ROCKET', 890, 1170, { size: 22, alpha: rk }); }
    ctx.restore();
    P.tag(ctx, 'TOMORROW', CX, 300, t, ev.s8 + 0.1, 1e9, { size: 40, bg: C.yellow });
    P.chip(ctx, 'IN ONE PIECE?', CX, 410, t, ev.s8_rocket, 1e9, { size: 36, color: C.line });
    P.cross(ctx, CX + 210, 410, 26, t, ev.s8_x);
    P.stamp(ctx, 'BUILT IN ORBIT', CX, 1290, t, ev.sync_orbit, { size: 72, color: C.cyan });
    P.flash(ctx, t, ev.sync_orbit, { color: '60,240,255', a: 0.16 });
  } });

  // ================= S9 — Whyverse end card =================
  SH.push({ at: ev.s9, in: { type: 'fade', dur: 0.4 }, draw(ctx, t) {
    P.bg(ctx, t, { drift: 0.6 });
    const k = pop(t, ev.s9 + 0.1, 0.6, 1.4);
    P.at(ctx, CX, 640 + Math.sin(t * 1.4) * 10, k, 0, () => P.planet(ctx, 0, 0, 130, t));
    P.pText(ctx, 'FOLLOW', CX, 990, t, ev.s9_follow, 1e9, { size: 70, color: C.line });
    P.pText(ctx, 'WHYVERSE', CX, 1110, t, ev.s9_follow + 0.15, 1e9, { size: 110, color: C.yellow });
    P.tag(ctx, '▶ Full videos on our YouTube', CX, 1250, t, ev.s9_yt, 1e9, { size: 40, bg: C.red, txt: '#fff' });
    P.text(ctx, 'IG @whyverse___ · TikTok @Whyverse', CX, 1350, { size: 30, fam: 'Inter', weight: 700, color: C.dim, alpha: fin(t, ev.s9_yt + 0.4) });
  } });
})();
