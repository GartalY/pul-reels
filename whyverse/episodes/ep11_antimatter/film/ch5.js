// Chapter 5 — The rule breakers: 1967, Andrei Sakharov's recipe (3 conditions) · CP violation · 1964 Cronin & Fitch in mesons ·
// 2025 LHCb: first in baryons, the beauty lambda decays differently by ≈ 2.5 %, 80,000+ decays, Nature, July · twist: the Standard
// Model's amount is many orders of magnitude too small · real, but not enough: something is missing
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L } = S; const C = P.C;
  const W = G.W, H = G.H;
  const book = (ctx, x, y, s, col, label, k, rot = 0) => { if (k <= 0.01) return; P.at(ctx, x, y, s * ease.outBack(clamp(k), 1.8), rot, () => { P.iRect(ctx, -90, -120, 180, 240, 10, col, { shade: 0.4 }); P.iRect(ctx, -70, -120, 14, 240, 0, 'rgba(0,0,0,0.18)'); G.text(ctx, label, 10, 10, { size: 30, fam: 'Inter', weight: 900, color: C.pap, align: 'center', boil: 0 }); }); };

  P.cardShot('c5', 5, 'The rule breakers', (ctx, t) => { book(ctx, 1600, 960, 0.6, C.ink, 'RULES', P.dk(t, S.CH.c5.t0 + 0.3, 0.4), -0.08); book(ctx, 1760, 968, 0.6, C.acc, 'RULES', P.dk(t, S.CH.c5.t0 + 0.5, 0.4), 0.12); });

  // S1 — Andrei Sakharov, 1967: three things must be true
  P.shot(ev.c5_s1, (ctx, t) => {
    P.bgLine(ctx, t);
    P.person(ctx, 520, 900, 1.15, t, { pose: 'hold', prop: 'paper', k: P.dk(t, ev.c5_s1 + 0.2, 0.5), name: 'ANDREI SAKHAROV', sub: 'physicist, USSR · 1967', hair: 2 });
    const ck = P.dk(t, ev.c5_s1 + 0.2, 0.6); P.card(ctx, 920, 220, 820, 640, ck);
    P.write(ctx, 'RECIPE FOR A UNIVERSE', 1330, 330, t, ev.c5_s1 + 0.4, { size: 54, weight: 900 });
    P.write(ctx, 'LIKE OURS', 1330, 400, t, ev.c5_s1 + 0.7, { size: 44, weight: 800, color: C.acc });
    const n = P.pop(t, ev.c5_three - 0.1, 0.4); if (n > 0) P.at(ctx, 1330, 660, n, -0.04, () => P.rtext(ctx, '3', 0, 90, { size: 300 }));
    P.note(ctx, 'things must be true', null, null, 1330, 800, t, ev.c5_three + 0.2, { size: 46 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — the three conditions as recipe lines with icons
  P.shot(ev.c5_s2, (ctx, t) => {
    P.bgLine(ctx, t, { corner: 0 });
    const rows = [[ev.c5_r1, 'MORE PARTICLES THAN ANTIPARTICLES', ev.c5_more], [ev.c5_r2, 'MATTER & ANTIMATTER FOLLOW SLIGHTLY DIFFERENT RULES', ev.c5_diff], [ev.c5_r3, 'OUT OF BALANCE — IN THE HOT, FAST EARLY UNIVERSE', ev.c5_bal]];
    rows.forEach(([t0, s, t1], i) => { const y = 250 + i * 270; const k = P.pop(t, t0 - 0.15, 0.4); if (k <= 0) return;
      P.at(ctx, 200, y, k, 0, () => { P.iCirc(ctx, 0, 0, 70, i === 1 ? C.acc : C.ink, { shade: 0.4 }); G.text(ctx, String(i + 1), 0, 34, { size: 96, fam: 'Inter', weight: 900, color: C.pap, align: 'center', boil: 0 }); });
      P.write(ctx, s, 320, y + 20, t, t0, { size: s.length > 40 ? 38 : 48, weight: 900, align: 'left', stag: 0.04 });
      const ik = P.dk(t, t1 - 0.2, 0.5); const ix = 1720;
      if (i === 0 && ik > 0) { for (let j = 0; j < 5; j++) P.part(ctx, ix - 140 + j * 52, y - 30, 20, 'e', { k: clamp(ik * 2 - j * 0.1), sign: false }); for (let j = 0; j < 4; j++) P.part(ctx, ix - 140 + j * 52, y + 34, 20, 'p', { k: clamp(ik * 2 - j * 0.1), sign: false }); }
      if (i === 1 && ik > 0) { book(ctx, ix - 90, y, 0.55, C.ink, 'RULES', ik, -0.06); book(ctx, ix + 60, y + 6, 0.55, C.acc, 'RULES', ik, 0.1); }
      if (i === 2 && ik > 0) { P.at(ctx, ix - 40, y + 40, 0.5, -0.25 * ik, () => { P.line(ctx, -150, 0, 150, 0, C.ink, 14); P.iPoly(ctx, [[-20, 0], [20, 0], [0, 60]], C.ink); }); for (let j = 0; j < 3; j++) P.iPoly(ctx, [[ix + 120 + j * 26, y + 50], [ix + 132 + j * 26, y - 10 - 20 * Math.sin(t * 8 + j) ** 2], [ix + 144 + j * 26, y + 50]], j % 2 ? C.acc : C.yel, { a: ik }); }
    });
  }, { in: { type: 'push', dir: 'left', dur: 0.45 } });

  // S3 — CP violation: the mirror is not perfect · 1964 Cronin & Fitch, mesons
  P.shot(ev.c5_s3, (ctx, t) => {
    P.bgLine(ctx, t);
    const ck = P.pop(t, ev.c5_cp - 0.05, 0.4); if (ck > 0) P.at(ctx, 960, 190, ck, -0.02, () => P.rtext(ctx, 'CP VIOLATION', 0, 40, { size: 120 }));
    // mirror with a slightly different reflection
    P.dLine(ctx, 960, 300, 960, 700, P.dk(t, ev.c5_s3 + 0.2, 0.5), { lw: 6, dash: [14, 10] });
    const dif = P.dk(t, ev.c5_seen, 0.8); P.spinner(ctx, 700, 500, 60, t, 'e', { k: P.dk(t, ev.c5_s3 + 0.3, 0.4), ang: -1.2 }); P.spinner(ctx, 1220, 500, 60, t + 0.3 * dif, 'p', { k: P.dk(t, ev.c5_s3 + 0.5, 0.4), ang: Math.PI + 1.2 - 0.5 * dif });
    P.note(ctx, 'not quite a perfect mirror', null, null, 1220, 690, t, ev.c5_seen + 0.2, { size: 42 });
    P.tag(ctx, '1964', 260, 820, t, ev.c5_1964, 1e9, { size: 44, fill: C.ink, color: C.pap });
    P.person(ctx, 640, 1000, 0.62, t, { k: P.dk(t, ev.c5_cronin - 0.2, 0.4), name: 'JAMES CRONIN', hair: 1 }); P.person(ctx, 980, 1000, 0.62, t, { k: P.dk(t, ev.c5_fitch - 0.2, 0.4), name: 'VAL FITCH', dir: -1 });
    P.tag(ctx, 'IN MESONS', 1440, 880, t, ev.c5_mesons, 1e9, { size: 40, fill: C.acc, color: C.pap });
    P.note(ctx, 'the first tiny difference', null, null, 1440, 970, t, ev.c5_tinyd, { size: 40 });
  }, { in: { type: 'fade', dur: 0.35 } });

  // S4 — 2025, LHCb at CERN: the beauty lambda (Λb) vs its antiparticle decay differently by ≈ 2.5 %
  P.shot(ev.c5_s4, (ctx, t) => {
    P.bgLine(ctx, t, { corner: 0 });
    P.rslam(ctx, '2025', 230, 170, t, Math.min(ev.c5_2025, ev.c5_s4 + 0.2), { size: 100 });
    // detector: a wedge of layers
    const dk = P.dk(t, ev.c5_s4 + 0.3, 0.8); for (let i = 0; i < 8; i++) { const x = 300 + i * 70, h = 120 + i * 40; P.iRect(ctx, x, 560 - h / 2, 40, h, 6, i % 2 ? C.ink : C.blueW, { a: dk * (0.4 + i * 0.07) }); }
    P.tag(ctx, 'LHCb · CERN', 520, 330, t, ev.c5_lhcb, 1e9, { size: 44, fill: C.ink, color: C.pap });
    P.tag(ctx, 'BARYONS = the family of protons & neutrons', 560, 830, t, ev.c5_baryons, 1e9, { size: 32, fill: C.pap, color: C.ink, border: C.ink });
    // the two decays side by side
    const sides = [[1180, 'Λb', 'e', 1.0], [1640, 'anti-Λb', 'p', 0.975]];
    sides.forEach(([x, lab, kind, f], i) => { const k = P.dk(t, ev.c5_lambda + i * 0.2, 0.4); if (k <= 0) return; P.part(ctx, x, 330, 48, kind === 'e' ? 'proton' : 'pbar', { k, sign: false }); G.text(ctx, lab, x, 250, { size: 48, fam: 'Inter', weight: 900, color: kind === 'e' ? C.ink : C.acc, align: 'center', boil: 0, alpha: k });
      const dd = P.dk(t, ev.c5_decayed, 0.6); ['p', 'K', 'π', 'π'].forEach((s, j) => { const a = 1.0 + j * 0.38; const r = 60 + 150 * dd; const px = x + Math.cos(a) * r - 40, py = 330 + Math.sin(a) * r; if (dd > 0.05) { P.line(ctx, x, 330, px, py, kind === 'e' ? C.ink2 : C.acc, 3, dd); P.iCirc(ctx, px, py, 18, kind === 'e' ? C.ink : C.acc, { a: dd }); G.text(ctx, s, px, py + 9, { size: 24, fam: 'Inter', weight: 900, color: C.pap, align: 'center', boil: 0, alpha: dd }); } });
      const bh = 380 * f * P.dk(t, ev.c5_25a - 0.4, 0.8); P.iRect(ctx, x - 70, 1000 - bh, 140, bh, 8, kind === 'e' ? C.ink : C.acc, { shade: 0.3 }); });
    P.dLine(ctx, 1040, 1000, 1780, 1000, P.dk(t, ev.c5_25a - 0.5, 0.5), { lw: 5 });
    P.lcount(ctx, { x: 1410, y: 640, from: 0, to: 2.5, decimals: 1, t, t0: ev.c5_25a, t1: ev.c5_25, size: 100, prefix: '≈ ', suffix: ' %', align: 'center' });
    P.small(ctx, 'DIFFERENCE (measured 2.45 %)', 1410, 720, { align: 'center', size: 28, alpha: P.fin(t, ev.c5_25, 0.4) });
  }, { in: { type: 'push', dir: 'left', dur: 0.45 } });

  // S5 — 80,000+ decays · 5.2σ · Nature, July 2025
  P.shot(ev.c5_s5, (ctx, t) => {
    P.bgLine(ctx, t);
    const n = Math.round(Data.count(t, ev.c5_80k - 0.2, ev.c5_sure, 0, 400, ease.outCubic)); for (let i = 0; i < n; i++) { const x = 140 + (i % 40) * 41, y = 200 + Math.floor(i / 40) * 40; P.iCirc(ctx, x, y, 9, i % 3 ? C.ink : C.acc, { a: 0.8 }); }
    P.lcount(ctx, { x: 960, y: 760, from: 0, to: 80000, t, t0: ev.c5_80k - 0.2, t1: ev.c5_sure, size: 150, suffix: '+', align: 'center' });
    P.small(ctx, 'DECAYS — 5.2 STANDARD DEVIATIONS', 960, 840, { align: 'center', size: 34, alpha: P.fin(t, ev.c5_sure, 0.4) });
    const nk = P.pop(t, ev.c5_nature, 0.4); if (nk > 0) P.at(ctx, 960, 960, nk, -0.03, () => { P.iRect(ctx, -330, -60, 660, 120, 12, C.ink, { shade: 0.3 }); G.text(ctx, 'NATURE · JULY 2025', 0, 22, { size: 56, fam: 'Inter', weight: 900, color: C.pap, align: 'center', boil: 0 }); });
    P.source(ctx, 'CERN / LHCb, Nature 643 (2025)', t, ev.c5_nature);
  }, { in: { type: 'fade', dur: 0.35 } });

  // S6 — the twist: predicted vs needed — "many orders of magnitude too small" (schematic)
  P.shot(ev.c5_s6, (ctx, t) => {
    P.bgLine(ctx, t);
    P.rslam(ctx, 'THE TWIST', 960, 170, t, ev.c5_twist, { size: 100 });
    const k1 = P.dk(t, ev.c5_predicts, 0.6), k2 = P.dk(t, ev.c5_orders - 0.2, 1.4);
    P.iRect(ctx, 560, 900 - 18 * k1, 220, 18 * k1, 6, C.ink, {}); G.text(ctx, 'WHAT OUR THEORY', 670, 960, { size: 34, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0, alpha: k1 }); G.text(ctx, 'PREDICTS', 670, 1002, { size: 34, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0, alpha: k1 });
    P.iRect(ctx, 1140, 900 - 600 * k2, 220, 600 * k2, 6, C.acc, { shade: 0.3 }); G.text(ctx, 'WHAT WE NEED', 1250, 960, { size: 34, fam: 'Inter', weight: 900, color: C.acc, align: 'center', boil: 0, alpha: k2 }); G.text(ctx, 'TO EXIST', 1250, 1002, { size: 34, fam: 'Inter', weight: 900, color: C.acc, align: 'center', boil: 0, alpha: k2 });
    P.dLine(ctx, 460, 900, 1460, 900, k1, { lw: 5 });
    P.note(ctx, 'many orders of magnitude\ntoo small', 690, 870, 520, 500, t, ev.c5_small, { size: 46 });
    P.small(ctx, 'schematic — not to scale', 1460, 1050, { align: 'right', size: 24, alpha: k2 });
    Ch.elle(ctx, { x: 1700, y: 1060, s: 0.5, t, dir: -1, gesture: t > ev.c5_small ? 'worried' : 'idle', mouth: P.talk(t), look: -1, eyes: t > ev.c5_small ? 'wide' : 'open' });
  }, { in: { type: 'push', dir: 'up', dur: 0.45 } });

  // S7 — real ✓ · enough ✗ · something is missing (a puzzle with a gap)
  P.shot(ev.c5_s7, (ctx, t) => {
    P.bgLine(ctx, t);
    P.write(ctx, 'REAL', 560, 260, t, ev.c5_real - 0.2, { size: 90, weight: 900 }); P.tick(ctx, 790, 230, 1.6, P.dk(t, ev.c5_real, 0.4));
    P.write(ctx, 'ENOUGH', 1300, 260, t, ev.c5_enough - 0.3, { size: 90, weight: 900 }); P.cross(ctx, 1500, 180, 1590, 270, P.dk(t, ev.c5_enough, 0.4), { lw: 12 });
    // puzzle 3x2 with one missing piece
    for (let i = 0; i < 6; i++) { const x = 660 + (i % 3) * 200, y = 420 + Math.floor(i / 3) * 200; if (i === 4) { P.art(ctx, [{ pts: P.rectPts(x, y, 190, 190), dash: [12, 10] }], P.dk(t, ev.c5_missing - 0.3, 0.5), { color: C.acc, lw: 5 }); continue; }
      P.iRect(ctx, x, y, 190, 190, 12, i % 2 ? C.ink : C.blueW, { a: P.dk(t, ev.c5_s7 + i * 0.08, 0.3), shade: 0.3 }); }
    P.rslam(ctx, 'SOMETHING IS MISSING', 960, 960, t, ev.c5_missing, { size: 84 });
  }, { in: { type: 'fade', dur: 0.35 } });
})();
