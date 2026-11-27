// Chapter 3 — How to hold nothing: traps of magnetic + electric fields in a near-perfect vacuum · CERN makes ≈ 400 million antiprotons/hour,
// experiments catch ≈ 10 % · ALPHA: up to 3,000 antihydrogen atoms/hour, kept up to 100 hours · 2023: antihydrogen falls DOWN ·
// 24 Mar 2026: 92 antiprotons ride a truck in BASE-STEP (to quieter labs) · Oct 2026: Northwestern holds ONE positron for months at ≈ 0.3 K ·
// why? they're hunting for a difference
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L } = S; const C = P.C;
  const W = G.W, H = G.H;
  const hAtom = (ctx, x, y, s, t, k = 1, a = 1) => { if (k <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; P.art(ctx, [P.circPts(x, y, 40 * s, 30, 0, 6.283, 24 * s)], k, { color: C.acc, lw: 3 }); P.part(ctx, x, y, 14 * s, 'pbar', { k, sign: false }); const q = t * 3 + x * 0.01; P.part(ctx, x + Math.cos(q) * 40 * s, y + Math.sin(q) * 24 * s, 7 * s, 'p', { k, sign: false }); ctx.restore(); };

  P.cardShot('c3', 3, 'How to hold nothing', (ctx, t) => { P.trap(ctx, 1800, 970, 0.28, t, { k: P.dk(t, S.CH.c3.t0 + 0.3, 0.8) }); });

  // S1 — the trap: magnetic field + electric field + vacuum, the particle floats touching nothing
  P.shot(ev.c3_s1, (ctx, t) => {
    P.bgLine(ctx, t);
    ctx.save(); P.push(ctx, (t - ev.c3_s1) / 10, 760, 540, 0.03);
    P.trap(ctx, 760, 560, 1.25, t, { k: P.dk(t, ev.c3_s1, 1.2) });
    ctx.restore();
    P.note(ctx, "DON'T TOUCH ANYTHING", null, null, 760, 120, t, ev.c3_touch - 0.1, { size: 56 });
    P.tag(ctx, 'MAGNETIC FIELD', 1300, 330, t, ev.c3_mag, 1e9, { size: 40, fill: C.ink, color: C.pap, align: 'left' }); P.carrow(ctx, 1290, 330, 1110, 300, 0.15, P.dk(t, ev.c3_mag, 0.5), { color: C.ink });
    P.tag(ctx, 'ELECTRIC FIELD', 1300, 520, t, ev.c3_elec, 1e9, { size: 40, fill: C.acc, color: C.pap, align: 'left' }); P.carrow(ctx, 1290, 520, 920, 520, 0.1, P.dk(t, ev.c3_elec, 0.5), { color: C.acc });
    P.tag(ctx, 'ALMOST PERFECT VACUUM', 1300, 710, t, ev.c3_vac, 1e9, { size: 40, fill: C.pap, color: C.ink, border: C.ink, align: 'left' });
    P.note(ctx, 'floating in the middle', 790, 560, 1640, 880, t, ev.c3_float, { size: 46 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — ≈ 400 million antiprotons an hour; experiments catch ≈ 10 %
  P.shot(ev.c3_s2, (ctx, t) => {
    P.bgLine(ctx, t, { corner: 0 });
    P.accel(ctx, 420, 520, 230, t, { k: P.dk(t, ev.c3_s2, 0.6), speed: 2.6, n: 7, kind: 'pbar' });
    P.lcount(ctx, { x: 420, y: 920, from: 0, to: 400000000, t, t0: ev.c3_400a, t1: ev.c3_400, size: 82, prefix: '≈ ', align: 'center' });
    P.small(ctx, 'ANTIPROTONS PER HOUR', 420, 1010, { align: 'center', size: 32, alpha: P.fin(t, ev.c3_hour, 0.4) });
    // 100 dots → 10 caught
    const ck = P.dk(t, ev.c3_catch - 0.2, 0.6);
    for (let i = 0; i < 100; i++) { const x = 1000 + (i % 10) * 76, y = 230 + Math.floor(i / 10) * 64; const caught = i % 10 === (Math.floor(i / 10) * 3) % 10; const fade = caught ? 0 : P.dk(t, ev.c3_10 - 0.3, 0.6);
      P.part(ctx, x, y, 18, 'pbar', { k: P.dk(t, ev.c3_s2 + 0.2 + i * 0.008, 0.3), sign: false, a: 1 - fade * 0.82 });
      if (caught && ck > 0.5) P.art(ctx, [P.circPts(x, y, 28, 24)], P.dk(t, ev.c3_catch + i * 0.004, 0.4), { color: C.ink, lw: 4 }); }
    P.rslam(ctx, '≈ 10 % CAUGHT', 1340, 940, t, ev.c3_10, { size: 82 });
    P.source(ctx, 'CERN', t, ev.c3_400);
  }, { in: { type: 'push', dir: 'left', dur: 0.45 } });

  // S3 — ALPHA builds anti-atoms: up to 3,000 antihydrogen atoms an hour, kept up to 100 hours
  P.shot(ev.c3_s3, (ctx, t) => {
    P.bgLine(ctx, t);
    P.rslam(ctx, 'ALPHA', 340, 210, t, Math.min(ev.c3_alpha, ev.c3_s3 + 0.2), { size: 120 });
    P.note(ctx, 'an experiment at CERN', null, null, 340, 300, t, ev.c3_alpha + 0.3, { size: 40 });
    for (let i = 0; i < 18; i++) { const k = P.dk(t, ev.c3_atoms + i * 0.12, 0.4); const x = 760 + (i % 6) * 170 + Math.sin(t + i) * 10, y = 300 + Math.floor(i / 6) * 150 + Math.cos(t * 1.1 + i) * 8; hAtom(ctx, x, y, 1.1, t, k); }
    P.lcount(ctx, { x: 560, y: 800, from: 0, to: 3000, t, t0: ev.c3_3000a, t1: ev.c3_3000, size: 120, prefix: 'up to ', align: 'center' });
    P.small(ctx, 'ANTIHYDROGEN ATOMS AN HOUR', 560, 880, { align: 'center', size: 32, alpha: P.fin(t, ev.c3_3000, 0.4) });
    const hk = P.dk(t, ev.c3_100 - 0.6, 0.5); P.clockFace(ctx, 1420, 810, 110, t, (t - ev.c3_100 + 0.6) * 2.5 * hk, hk);
    P.lcount(ctx, { x: 1420, y: 1030, from: 0, to: 100, t, t0: ev.c3_100 - 0.4, t1: ev.c3_100 + 0.4, size: 70, prefix: 'kept up to ', suffix: ' h', align: 'center' });
    P.source(ctx, 'CERN', t, ev.c3_3000);
  }, { in: { type: 'fade', dur: 0.35 } });

  // S4 — 2023: does antimatter fall down, or up? They fell down.
  P.shot(ev.c3_s4, (ctx, t) => {
    P.bgLine(ctx, t);
    P.rslam(ctx, '2023', 260, 190, t, Math.min(ev.c3_2023, ev.c3_s4 + 0.2), { size: 110 });
    // vertical trap
    const tk = P.dk(t, ev.c3_s4, 0.6); P.art(ctx, [P.rrPts(820, 140, 280, 860, 40)], tk, { lw: 6 }); for (let i = 0; i < 7; i++) P.iRect(ctx, 800, 170 + i * 120, 320, 26, 10, C.ink3, { a: tk });
    const rel = ev.c3_go; const fall = clamp((t - rel) / 1.6);
    for (let i = 0; i < 9; i++) { const x = 900 + (i % 3) * 60, y0 = 480 + Math.floor(i / 3) * 50 + Math.sin(t * 2 + i) * 6; const y = y0 + ease.inQuad(fall) * (430 + U.hash(i, 6) * 60); hAtom(ctx, x, y, 0.8, t, P.dk(t, ev.c3_s4 + 0.3 + i * 0.05, 0.3), 1 - clamp((fall - 0.85) / 0.15) * 0.6); }
    const qa = t < rel ? 1 : 1 - clamp((t - rel) / 0.4);
    P.arrow(ctx, 600, 520, 600, 260, { color: C.acc, lw: 12, head: 40, k: P.dk(t, ev.c3_up - 0.1, 0.4), a: qa }); G.text(ctx, 'UP?', 600, 220, { size: 60, fam: 'Inter', weight: 900, color: C.acc, align: 'center', boil: 0, alpha: P.fin(t, ev.c3_up, 0.3) * qa });
    P.arrow(ctx, 1320, 520, 1320, 780, { color: C.ink, lw: 12, head: 40, k: P.dk(t, ev.c3_fall - 0.1, 0.4) }); G.text(ctx, 'DOWN?', 1320, 860, { size: 60, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0, alpha: P.fin(t, ev.c3_fall, 0.3) * qa });
    const dk = P.pop(t, ev.c3_fell, 0.35); if (dk > 0) P.at(ctx, 1480, 860, dk, -0.04, () => { P.iRect(ctx, -250, -70, 500, 140, 14, C.ink, { shade: 0.3 }); G.text(ctx, 'DOWN ✓', 0, 30, { size: 80, fam: 'Inter', weight: 900, color: C.pap, align: 'center', boil: 0 }); });
    P.note(ctx, 'just like normal matter', null, null, 1480, 990, t, ev.c3_normal, { size: 46 });
    P.source(ctx, 'ALPHA, Nature, 27 Sep 2023 (within ≈20 % of g)', t, ev.c3_fell);
  }, { in: { type: 'wipe', dir: 'down', dur: 0.45, color: C.ink } });

  // S5 — 24 March 2026: 92 antiprotons on a truck in BASE-STEP; next: quieter labs away from the factory's magnetic noise
  P.shot(ev.c3_s5, (ctx, t) => {
    P.bgLine(ctx, t, { corner: 0 });
    P.write(ctx, 'ANTIMATTER ROAD TRIP', 960, 150, t, ev.c3_trip - 0.2, { size: 64, weight: 900 });
    P.tag(ctx, '24 MARCH 2026', 300, 260, t, ev.c3_march, 1e9, { size: 40, fill: C.acc, color: C.pap });
    // road
    const rk = P.dk(t, ev.c3_s5, 0.6); P.iRect(ctx, -100, 760, 2200, 70, 0, C.ink3, { a: rk }); for (let i = 0; i < 14; i++) P.iRect(ctx, ((i * 180 - (t - ev.c3_s5) * 160) % 2400 + 2400) % 2400 - 200, 790, 90, 10, 4, C.pap, { a: rk });
    const dx = (t - ev.c3_truck) * 40; P.truck(ctx, 860 + Math.max(-300, Math.min(dx, 260)), 790, 1.05, t, { k: P.dk(t, ev.c3_truck - 0.6, 0.6), d: (t - ev.c3_s5) * 160 });
    P.lcount(ctx, { x: 1560, y: 420, from: 0, to: 92, t, t0: ev.c3_92 - 0.5, t1: ev.c3_92 + 0.3, size: 130, align: 'center' });
    P.small(ctx, 'ANTIPROTONS ON BOARD', 1560, 500, { align: 'center', size: 32, alpha: P.fin(t, ev.c3_92, 0.4) });
    P.note(ctx, 'portable trap', 760, 560, 560, 420, t, ev.c3_step + 0.2, { size: 44 });
    // the plan: a quieter lab
    const qk = P.dk(t, ev.c3_quiet - 0.2, 0.6); if (qk > 0) { for (let i = 0; i < 4; i++) { const pts = []; for (let j = 0; j <= 20; j++) pts.push([120 + j * 14, 980 + Math.sin(j * 1.6 + t * 9 + i) * 12 - i * 26]); P.art(ctx, [pts], qk, { color: C.acc, lw: 3, a: 0.7 }); }
      P.small(ctx, 'FACTORY NOISE', 260, 1060, { align: 'center', size: 26, alpha: qk }); P.carrow(ctx, 460, 960, 1300, 960, -0.08, qk, { color: C.ink, dash: [12, 10] }); P.tag(ctx, 'QUIETER LABS', 1480, 960, t, ev.c3_quiet, 1e9, { size: 40, fill: C.pap, color: C.ink, border: C.ink }); }
    P.source(ctx, 'CERN / ERC, 24 Mar 2026', t, ev.c3_92);
  }, { in: { type: 'push', dir: 'left', dur: 0.45 } });

  // S6 — October 2026, Northwestern: ONE positron held for months at ≈ 0.3 K
  P.shot(ev.c3_s6, (ctx, t) => {
    P.bgLine(ctx, t);
    P.tag(ctx, 'OCTOBER 2026', 300, 160, t, ev.c3_oct, 1e9, { size: 40, fill: C.ink, color: C.pap });
    P.write(ctx, 'NORTHWESTERN UNIVERSITY, USA', 300, 250, t, ev.c3_nw, { size: 40, weight: 800, align: 'left', color: C.ink2 });
    ctx.save(); P.push(ctx, (t - ev.c3_single) / 6, 760, 600, 0.03);
    P.trap(ctx, 760, 620, 0.95, t, { k: P.dk(t, ev.c3_s6, 0.8), kind: 'p', parts: 1 });
    ctx.restore();
    P.lcount(ctx, { x: 760, y: 1010, from: 1, to: 1, t, t0: ev.c3_single - 0.3, t1: ev.c3_single + 0.1, size: 90, prefix: 'JUST ', suffix: ' POSITRON', align: 'center' });
    // calendar pages flipping = months
    const mk = P.dk(t, ev.c3_months - 0.3, 0.4); if (mk > 0) { const n = Math.floor(clamp((t - ev.c3_months) / 2.0) * 4); P.at(ctx, 1330, 420, mk, 0.04, () => { P.iRect(ctx, -110, -110, 220, 220, 14, C.pap); P.iRect(ctx, -110, -110, 220, 56, 14, C.acc); P.art(ctx, [P.rrPts(-110, -110, 220, 220, 14)], 1, { lw: 5 });
      G.text(ctx, ['NOV', 'DEC', 'JAN', 'FEB', 'MAR'][n], 0, -66, { size: 34, fam: 'Inter', weight: 900, color: C.pap, align: 'center', boil: 0 }); G.text(ctx, 'MONTHS', 0, 54, { size: 46, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0 }); }); }
    P.thermo(ctx, 1680, 820, 1.0, t, { k: P.dk(t, ev.c3_zero - 0.6, 0.5), level: lerp(0.7, 0.02, P.dk(t, ev.c3_zero - 0.2, 1.0)) });
    P.tag(ctx, '≈ 0.3 K', 1680, 980, t, ev.c3_zero, 1e9, { size: 44, fill: C.ink, color: C.pap });
    P.note(ctx, 'a third of a degree\nabove absolute zero', null, null, 1400, 650, t, ev.c3_zero + 0.3, { size: 38 });
    P.source(ctx, 'Myers, Gabrielse et al., Physical Review Letters, Oct 2026', t, ev.c3_single);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S7 — why? hunting for a difference: electron vs positron under a magnifier, "≠ ?"
  P.shot(ev.c3_s7, (ctx, t) => {
    P.bgLine(ctx, t);
    P.part(ctx, 640, 520, 120, 'e', { k: P.dk(t, ev.c3_s7, 0.4) }); P.part(ctx, 1280, 520, 120, 'p', { k: P.dk(t, ev.c3_s7 + 0.15, 0.4) });
    const dk = P.pop(t, ev.c3_diff - 0.1, 0.4); if (dk > 0) P.at(ctx, 960, 520, dk, 0, () => P.rtext(ctx, '≠ ?', 0, 50, { size: 150 }));
    // magnifier sweeping
    const mx = 960 + Math.sin(t * 1.4) * 330, my = 520 + Math.cos(t * 1.1) * 40; const mk = P.dk(t, ev.c3_effort - 0.2, 0.5); if (mk > 0) { ctx.save(); ctx.globalAlpha *= mk; P.art(ctx, [P.circPts(mx, my, 150, 50)], 1, { lw: 12 }); P.line(ctx, mx + 106, my + 106, mx + 230, my + 230, C.ink, 26); ctx.restore(); }
    P.head(ctx, 'HUNTING FOR A DIFFERENCE', 960, 920, t, ev.c3_diff - 0.3, { size: 70, hl: ['DIFFERENCE'] });
  }, { in: { type: 'push', dir: 'up', dur: 0.45 } });
})();
