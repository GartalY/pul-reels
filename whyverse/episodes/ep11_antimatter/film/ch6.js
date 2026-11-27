// Chapter 6 — The hunt for the missing piece: suspect #1 the neutrino (its matter–antimatter difference not measured yet) · compare the twins
// directly: the single positron at Northwestern · how magnetic is it vs the electron (electron known to 1 part in 10 trillion) · if they don't
// match → Gerald Gabrielse: "the biggest discovery in physics in the last century" · so far every test: the twins match (same mass, same fall)
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L } = S; const C = P.C;
  const W = G.W, H = G.H;

  P.cardShot('c6', 6, 'The hunt for the missing piece', (ctx, t) => { const x = 1700 + Math.sin(t * 1.3) * 60, y = 880; P.art(ctx, [P.circPts(x, y, 90, 40)], P.dk(t, S.CH.c6.t0 + 0.3, 0.5), { lw: 10 }); P.line(ctx, x + 64, y + 64, x + 140, y + 140, C.ink, 18, P.dk(t, S.CH.c6.t0 + 0.5, 0.3)); });

  // S1 — suspect #1: the neutrino, a ghost passing through everything; its difference not measured yet
  P.shot(ev.c6_s1, (ctx, t) => {
    P.bgLine(ctx, t);
    P.write(ctx, 'SUSPECT #1', 300, 170, t, ev.c6_nu - 0.3, { size: 60, weight: 900, color: C.acc, align: 'left' });
    P.rslam(ctx, 'THE NEUTRINO', 640, 290, t, ev.c6_nu, { size: 100 });
    // a planet that the ghost passes straight through
    P.brandPlanet(ctx, 960, 640, 150, t, P.dk(t, ev.c6_s1, 0.5));
    const gx = ((t - ev.c6_ghost) * 340) % 2600 - 300; if (t > ev.c6_ghost - 0.5) P.ghost(ctx, gx, 640, 44, t, { a: 0.95 });
    P.note(ctx, 'barely touches anything', null, null, 1500, 460, t, ev.c6_ghost + 0.3, { size: 46 });
    const mk = P.dk(t, ev.c6_maybe - 0.2, 0.5); if (mk > 0) { P.ghost(ctx, 500, 920, 40, t, { a: mk }); G.text(ctx, '≠ ?', 760, 950, { size: 90, fam: 'Inter', weight: 900, color: C.acc, align: 'center', boil: 0, alpha: mk }); ctx.save(); ctx.globalAlpha *= mk; P.art(ctx, [{ pts: P.circPts(1000, 920, 40, 40), dash: [10, 10] }], 1, { color: C.acc, lw: 4 }); P.iCirc(ctx, 1000, 920, 9, C.acc); G.text(ctx, 'anti-ν', 1000, 860, { size: 36, fam: 'Inter', weight: 900, color: C.acc, align: 'center', boil: 0 }); ctx.restore(); }
    const nk = P.pop(t, ev.c6_notyet, 0.35); if (nk > 0) P.at(ctx, 1450, 930, nk, -0.05, () => { P.iRect(ctx, -280, -60, 560, 120, 12, C.yel, {}); P.art(ctx, [P.rrPts(-280, -60, 560, 120, 12)], 1, { lw: 5 }); G.text(ctx, 'NOT MEASURED YET', 0, 20, { size: 50, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0 }); });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — compare the twins directly: electron vs positron on the scale; the Northwestern positron
  P.shot(ev.c6_s2, (ctx, t) => {
    P.bgLine(ctx, t, { corner: 0 });
    P.scale(ctx, 700, 560, 1.0, t, { k: P.dk(t, ev.c6_compare - 0.3, 0.6), tilt: Math.sin(t * 1.3) * 0.08 * (1 - P.dk(t, ev.c6_precise, 1.0)),
      left: (x, y) => P.part(ctx, x, y - 34, 44, 'e', { k: P.dk(t, ev.c6_twins - 0.2, 0.4) }), right: (x, y) => P.part(ctx, x, y - 34, 44, 'p', { k: P.dk(t, ev.c6_twins, 0.4) }) });
    P.write(ctx, 'COMPARE THE TWINS', 700, 170, t, ev.c6_compare, { size: 64, weight: 900 });
    P.note(ctx, 'as precisely as humanly possible', null, null, 700, 980, t, ev.c6_precise, { size: 46 });
    P.trap(ctx, 1540, 560, 0.75, t, { k: P.dk(t, ev.c6_nw - 0.4, 0.6), kind: 'p' });
    P.tag(ctx, 'NORTHWESTERN', 1540, 900, t, ev.c6_nw, 1e9, { size: 40, fill: C.ink, color: C.pap });
  }, { in: { type: 'push', dir: 'left', dur: 0.45 } });

  // S3 — how magnetic? positron vs electron; the electron already known to 1 part in 10 trillion
  P.shot(ev.c6_s3, (ctx, t) => {
    P.bgLine(ctx, t);
    P.write(ctx, 'HOW MAGNETIC IS IT?', 960, 160, t, ev.c6_magnet - 0.2, { size: 66, weight: 900 });
    P.spinner(ctx, 560, 470, 80, t, 'e', { k: P.dk(t, ev.c6_s3 + 0.2, 0.5) }); P.spinner(ctx, 1360, 470, 80, t + 0.2, 'p', { k: P.dk(t, ev.c6_s3 + 0.4, 0.5), ang: -1.2 });
    G.text(ctx, 'ELECTRON', 560, 690, { size: 40, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0, alpha: P.fin(t, ev.c6_el, 0.3) }); G.text(ctx, 'POSITRON', 1360, 690, { size: 40, fam: 'Inter', weight: 900, color: C.acc, align: 'center', boil: 0, alpha: P.fin(t, ev.c6_pos, 0.3) });
    G.text(ctx, '?', 1360, 800, { size: 100, fam: 'Inter', weight: 900, color: C.acc, align: 'center', boil: 0, alpha: P.fin(t, ev.c6_pos + 0.3, 0.3) });
    P.lcount(ctx, { x: 560, y: 880, from: 0, to: 10000000000000, t, t0: ev.c6_part, t1: ev.c6_tril, size: 64, prefix: '1 part in ', align: 'center' });
    P.note(ctx, 'already measured', null, null, 560, 960, t, ev.c6_tril, { size: 42 });
    P.source(ctx, 'Physics World / Sci.News, Oct 2026', t, ev.c6_tril);
  }, { in: { type: 'fade', dur: 0.35 } });

  // S4 — perfect mirrors → numbers match; if they don't → Gabrielse's quote
  P.shot(ev.c6_s4, (ctx, t) => {
    P.bgLine(ctx, t);
    const flip = t > ev.c6_dont; const mk = P.dk(t, ev.c6_s4 + 0.1, 0.5);
    P.part(ctx, 380, 330, 60, 'e', { k: mk }); P.part(ctx, 640, 330, 60, 'p', { k: mk });
    G.text(ctx, flip ? '≠' : '=', 510, 355, { size: 100, fam: 'Inter', weight: 900, color: flip ? C.acc : C.ink, align: 'center', boil: 0, alpha: P.fin(t, ev.c6_match, 0.3) });
    P.tag(ctx, flip ? "IF THEY DON'T…" : 'PERFECT MIRRORS', 510, 480, t, flip ? ev.c6_dont : ev.c6_mirror, flip ? 1e9 : ev.c6_dont, { size: 38, fill: flip ? C.acc : C.ink, color: C.pap });
    P.person(ctx, 520, 1000, 0.9, t, { pose: 'point', k: P.dk(t, ev.c6_gab - 0.3, 0.5), name: 'GERALD GABRIELSE', sub: 'Northwestern' });
    P.quote(ctx, 'It would be the biggest discovery in physics in the last century.', 'Gerald Gabrielse', 860, 380, 860, t, Math.min(ev.c6_biggest - 0.4, ev.c6_gab + 0.3), { size: 58 });
    P.underline(ctx, 1080, 1380, 470, P.dk(t, ev.c6_biggest, 0.5), { lw: 8 });
  }, { in: { type: 'push', dir: 'up', dur: 0.45 } });

  // S5 — so far every test: the twins match — same mass ✓ same fall ✓ → stranger
  P.shot(ev.c6_s5, (ctx, t) => {
    P.bgLine(ctx, t);
    P.write(ctx, 'SO FAR…', 400, 200, t, ev.c6_far - 0.2, { size: 70, weight: 900, align: 'left' });
    const rows = [['THE TWINS MATCH', ev.c6_m1], ['SAME MASS', ev.c6_mass], ['SAME FALL', ev.c6_fall]];
    rows.forEach(([s, t0], i) => { const y = 380 + i * 150; P.write(ctx, s, 520, y, t, t0 - 0.15, { size: 72, weight: 900, align: 'left' }); P.tick(ctx, 440, y - 26, 1.5, P.dk(t, t0, 0.35)); });
    const sk = P.pop(t, ev.c6_stranger - 0.1, 0.4); if (sk > 0) P.at(ctx, 960, 920, sk, -0.03, () => P.rtext(ctx, 'EVEN STRANGER.', 0, 40, { size: 110 }));
    Ch.elle(ctx, { x: 1520, y: 820, s: 0.8, t, dir: -1, gesture: 'shrug', mouth: P.talk(t), look: -1, eyes: t > ev.c6_stranger ? 'wide' : 'open' });
    Ch.posi(ctx, { x: 1760, y: 840, s: 0.6, t, dir: -1, gesture: 'shrug', look: -1, k: P.dk(t, ev.c6_m1, 0.5) });
  }, { in: { type: 'fade', dur: 0.35 } });
})();
