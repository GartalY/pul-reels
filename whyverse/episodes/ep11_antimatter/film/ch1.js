// Chapter 1 — The mirror twin: Dirac's 1928 equation allows an opposite-charge electron · Anderson 1932, cosmic rays in a cloud chamber,
// a track curving the wrong way = the positron · Nobel 1933 / 1936 · every particle has a twin (p / p̄, H / H̄) · MYTH: sci-fi → bananas
// (potassium-40) and even you make positrons · where did all the twins go?
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L } = S; const C = P.C;
  const W = G.W, H = G.H;
  const atomH = (ctx, x, y, s, t, anti, k = 1) => { if (k <= 0.01) return; P.art(ctx, [P.circPts(x, y, 110 * s, 50, 0, 6.283, 60 * s)], k, { color: anti ? C.acc : C.ink, lw: 4, a: 0.8 });
    P.part(ctx, x, y, 30 * s, anti ? 'pbar' : 'proton', { k }); const a = t * 2.2 + (anti ? 1.5 : 0); P.part(ctx, x + Math.cos(a) * 110 * s, y + Math.sin(a) * 60 * s, 16 * s, anti ? 'p' : 'e', { k }); };

  P.cardShot('c1', 1, 'The mirror twin', (ctx, t) => { P.part(ctx, 1600, 990, 45, 'e', { k: P.dk(t, S.CH.c1.t0 + 0.3, 0.4) }); P.part(ctx, 1780, 990, 45, 'p', { k: P.dk(t, S.CH.c1.t0 + 0.5, 0.4) }); P.dLine(ctx, 1690, 920, 1690, 1060, P.dk(t, S.CH.c1.t0 + 0.4, 0.4), { lw: 4, dash: [8, 8] }); });

  // S1 — 1928, Dirac writes the equation; the mirror line; same particle, opposite charge
  P.shot(ev.c1_s1, (ctx, t) => {
    P.bgLine(ctx, t);
    P.rslam(ctx, '1928', 260, 190, t, ev.c1_1928, { size: 110 });
    P.person(ctx, 330, 900, 1.05, t, { pose: t > ev.c1_write ? 'point' : 'stand', k: P.dk(t, ev.c1_dirac - 0.3, 0.5), name: 'PAUL DIRAC', sub: 'physicist, UK' });
    // the board
    P.iRect(ctx, 600, 230, 1120, 380, 18, C.navy, { a: P.dk(t, ev.c1_s1 + 0.1, 0.4), shade: 0.4, shadeColor: '#33498F' });
    const ek = P.dk(t, ev.c1_write, 1.1); if (ek > 0) { ctx.save(); ctx.beginPath(); ctx.rect(600, 230, 1120 * ek, 380); ctx.clip(); G.text(ctx, '( iγ·∂ − m ) ψ = 0', 1160, 450, { size: 104, fam: 'Inter', weight: 700, color: C.pap, align: 'center', boil: 0 }); ctx.restore(); }
    P.note(ctx, 'the electron, in one line', null, null, 1160, 560, t, ev.c1_beaut - 0.2, { size: 44, color: C.yel });
    P.tick(ctx, 1640, 300, 1.4, P.dk(t, ev.c1_beaut, 0.4), { color: C.yel });
    // the twin solution
    const mk = P.dk(t, ev.c1_strange - 0.1, 0.5); P.dLine(ctx, 1160, 660, 1160, 1020, mk, { lw: 5, dash: [12, 10] });
    P.part(ctx, 930, 840, 70, 'e', { k: P.dk(t, ev.c1_strange - 0.2, 0.4), label: 'ELECTRON' });
    const ok = P.dk(t, ev.c1_opp - 0.1, 0.5); P.part(ctx, 1390, 840, 70, 'p', { k: ok, label: 'OPPOSITE CHARGE' });
    P.note(ctx, '?!', null, null, 1520, 720, t, ev.c1_strange, { size: 80, t1: ev.c1_opp });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — 1932, Anderson's cloud chamber: cosmic rays, one track curves the wrong way → THE POSITRON
  P.shot(ev.c1_s2, (ctx, t) => {
    P.bgLine(ctx, t, { corner: 0 });
    P.rslam(ctx, '1932', 260, 190, t, Math.min(ev.c1_1932, ev.c1_s2 + 0.2), { size: 110 });
    P.person(ctx, 300, 940, 1.0, t, { pose: 'point', k: P.dk(t, Math.min(ev.c1_anderson - 0.3, ev.c1_s2 + 0.5), 0.5), name: 'CARL ANDERSON', sub: 'Caltech, USA', hair: 1 });
    // cosmic rays raining in
    for (let i = 0; i < 9; i++) { const ph = ((t - ev.c1_cosmic) * 0.9 + U.hash(i, 3)) % 1; if (t < ev.c1_cosmic) break; const x = 700 + U.hash(i, 4) * 900; P.line(ctx, x - 100 + ph * 120, -40 + ph * 220, x + ph * 120, 60 + ph * 220, C.yel, 6, 1 - ph); }
    P.chamber(ctx, 640, 230, 900, 720, t, { k: P.dk(t, ev.c1_s2 + 0.3, 0.8), tr: P.dk(t, ev.c1_chamber, 1.4), wrong: P.dk(t, ev.c1_wrong - 0.2, 0.9) });
    P.note(ctx, 'curves the WRONG way', 1000, 520, 1700, 420, t, ev.c1_wrong + 0.1, { size: 46 });
    P.tag(ctx, 'SAME MASS · POSITIVE', 1500, 150, t, ev.c1_pos, 1e9, { size: 36, fill: C.acc, color: C.pap });
    P.rslam(ctx, 'THE POSITRON', 1090, 1020, t, ev.c1_positron, { size: 88, top: C.acc, under: C.ink });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — the two Nobel prizes
  P.shot(ev.c1_s3, (ctx, t) => {
    P.bgLine(ctx, t);
    P.person(ctx, 520, 900, 0.95, t, { pose: 'raise', k: P.dk(t, ev.c1_s3, 0.5), name: 'DIRAC' });
    P.medal(ctx, 820, 430, 1.4, '1933', t, { k: P.dk(t, ev.c1_nob1 - 0.1, 0.4) });
    P.person(ctx, 1260, 900, 0.95, t, { pose: 'raise', k: P.dk(t, ev.c1_s3 + 0.2, 0.5), name: 'ANDERSON', hair: 1, dir: -1 });
    P.medal(ctx, 1560, 430, 1.4, '1936', t, { k: P.dk(t, ev.c1_nob2 - 0.1, 0.4) });
    P.head(ctx, 'NOBEL PRIZE IN PHYSICS', 960, 160, t, ev.c1_nob1 - 0.3, { size: 60, hl: ['NOBEL'] });
    P.note(ctx, 'for the prediction', null, null, 820, 650, t, ev.c1_33, { size: 40 }); P.note(ctx, 'for the discovery', null, null, 1560, 650, t, ev.c1_36, { size: 40 });
  }, { in: { type: 'fade', dur: 0.35 } });

  // S4 — every particle has a mirror twin: e⁻/e⁺, p/p̄, H/H̄ (a mirror down the middle)
  P.shot(ev.c1_s4, (ctx, t) => {
    P.bgLine(ctx, t, { corner: 0 });
    P.iRect(ctx, 945, 120, 30, 900, 10, C.ink3, { a: P.dk(t, ev.c1_s4, 0.4) }); P.dLine(ctx, 960, 120, 960, 1020, P.dk(t, ev.c1_s4, 0.6), { lw: 5 });
    P.write(ctx, 'MATTER', 480, 170, t, ev.c1_s4 + 0.15, { size: 60, weight: 900 }); P.write(ctx, 'ANTIMATTER', 1440, 170, t, ev.c1_s4 + 0.35, { size: 60, weight: 900, color: C.acc });
    P.tag(ctx, 'SAME MASS', 960, 260, t, ev.c1_mass, 1e9, { size: 34, fill: C.pap, color: C.ink, border: C.ink });
    P.tag(ctx, 'OPPOSITE CHARGE', 960, 340, t, ev.c1_charge, 1e9, { size: 34, fill: C.acc, color: C.pap });
    const rows = [[460, 'e', 'p', 'electron', 'positron', ev.c1_every + 0.3, ev.c1_every + 0.5], [650, 'proton', 'pbar', 'proton', 'antiproton', ev.c1_proton, ev.c1_aproton]];
    rows.forEach(([y, a, b, la, lb, t0, t1]) => { P.part(ctx, 560, y, 48, a, { k: P.dk(t, t0, 0.35) }); P.part(ctx, 1360, y, 48, b, { k: P.dk(t, t1, 0.35) });
      G.text(ctx, la, 700, y + 14, { size: 40, fam: P.HAND, color: C.ink, boil: 0, alpha: P.fin(t, t0, 0.3) }); G.text(ctx, lb, 1220, y + 14, { size: 40, fam: P.HAND, color: C.acc, align: 'right', boil: 0, alpha: P.fin(t, t1, 0.3) }); });
    atomH(ctx, 560, 880, 0.9, t, false, P.dk(t, ev.c1_hyd, 0.4)); atomH(ctx, 1360, 880, 0.9, t, true, P.dk(t, ev.c1_ahyd, 0.4));
    G.text(ctx, 'hydrogen', 740, 894, { size: 40, fam: P.HAND, color: C.ink, boil: 0, alpha: P.fin(t, ev.c1_hyd, 0.3) }); G.text(ctx, 'antihydrogen', 1180, 894, { size: 40, fam: P.HAND, color: C.acc, align: 'right', boil: 0, alpha: P.fin(t, ev.c1_ahyd, 0.3) });
  }, { in: { type: 'wipe', dir: 'left', dur: 0.5, color: C.acc } });

  // S5 — MYTH: antimatter is science fiction ✗ → bananas (potassium-40) and even you
  P.shot(ev.c1_s5, (ctx, t) => {
    P.bgLine(ctx, t);
    const mk = P.pop(t, Math.min(ev.c1_myth, ev.c1_s5 + 0.15), 0.35) * (1 - P.dk(t, ev.c1_bananas - 0.3, 0.4)); if (mk > 0.01) P.at(ctx, 960, 300, mk, -0.03, () => {
      P.iRect(ctx, -560, -90, 1120, 180, 16, C.pap); P.art(ctx, [P.rrPts(-560, -90, 1120, 180, 16)], 1, { lw: 5 }); G.text(ctx, 'MYTH', -470, -20, { size: 40, fam: 'Inter', weight: 900, color: C.acc, boil: 0 });
      G.text(ctx, 'Antimatter is science fiction', 40, 40, { size: 70, fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0 }); P.cross(ctx, 460, -60, 540, 60, P.dk(t, ev.c1_isnt, 0.3), { lw: 14 }); });
    const bk = P.dk(t, ev.c1_bananas - 0.3, 0.5);
    P.banana(ctx, 560, 560, 1.0, t, { k: bk });
    P.tag(ctx, 'POTASSIUM-40', 560, 790, t, ev.c1_k40, 1e9, { size: 40, fill: C.yel, color: C.ink });
    for (let i = 0; i < 3; i++) { const t0 = ev.c1_k40 + 0.3 + i * 1.1; const u = clamp((t - t0) / 1.0); if (u <= 0 || u >= 1) continue; const a = -0.9 + i * 0.7; P.part(ctx, 560 + Math.cos(a) * (120 + u * 320), 520 + Math.sin(a) * (120 + u * 320), 20, 'p', { a: 1 - u * 0.5 }); }
    // you
    const yk = P.dk(t, ev.c1_body - 0.2, 0.5); P.person(ctx, 1380, 920, 1.15, t, { k: yk, name: 'YOU' });
    if (yk > 0.5) { const hb = 1 + 0.12 * Math.max(0, Math.sin(t * 7)); P.at(ctx, 1388, 760, hb, 0, () => { P.iPoly(ctx, [[0, 30], [-40, -10], [-26, -36], [0, -18], [26, -36], [40, -10]], C.acc, { curve: true }); }); }
    const pu = clamp((t - ev.c1_ypos) / 1.3); if (pu > 0 && pu < 1) { P.part(ctx, 1388 + pu * 260, 760 - pu * 260, 22, 'p', { a: 1 - pu * 0.4 }); P.flash(ctx, 1388 + 260, 760 - 260, t, ev.c1_ypos + 1.3, { r: 70, n: 6 }); }
    P.note(ctx, 'even you!', null, null, 1640, 400, t, ev.c1_you, { size: 56 });
  }, { in: { type: 'push', dir: 'up', dur: 0.45 } });

  // S6 — pairs everywhere… but the pink twins are missing: "where did all the twins go?"
  P.shot(ev.c1_s6, (ctx, t) => {
    P.bgLine(ctx, t);
    const lost = P.dk(t, ev.c1_where - 0.2, 0.9);
    for (let i = 0; i < 24; i++) { const x = 180 + (i % 8) * 220, y = 230 + Math.floor(i / 8) * 190 + Math.sin(t * 1.2 + i) * 8; const k = P.dk(t, ev.c1_s6 + i * 0.03, 0.3);
      P.part(ctx, x - 34, y, 26, 'e', { k, sign: false }); P.part(ctx, x + 34, y, 26, 'p', { k, sign: false, a: 1 - lost * 0.85 });
      if (lost > 0.4) P.art(ctx, [{ pts: P.circPts(x + 34, y, 30, 24), dash: [6, 6] }], 1, { color: C.acc, lw: 3, a: lost }); }
    P.rtext(ctx, 'WHERE DID ALL THE TWINS GO?', 960, 900, { size: 82, a: P.fin(t, ev.c1_where - 0.3, 0.3), top: C.ink, under: C.acc });
    Ch.elle(ctx, { x: 1730, y: 1080, s: 0.5, t, dir: -1, gesture: 'shrug', mouth: P.talk(t), look: -1, eyes: t > ev.c1_where ? 'wide' : 'open' });
  }, { in: { type: 'fade', dur: 0.35 } });
})();
