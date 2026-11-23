// Chapter 1 — One voice is enough: no final vote · 198 members (197 countries + EU) · Berlin 1995, the voting rule left in brackets ·
// consensus: 1 of 198 can block · Copenhagen 2009 "takes note" · Antalya from two sides · Guterres quote · so what made ozone different?
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L } = S; const C = P.C;
  const W = G.W, H = G.H;
  const dotRing = (ctx, cx, cy, r, n, t, t0, { acc = -1, a = 1, sz = 8 } = {}) => { for (let i = 0; i < n; i++) { const an = -Math.PI / 2 + i / n * 6.283; const q = clamp((t - t0 - i * 0.004) / 0.2); if (q <= 0) continue;
    ctx.save(); ctx.globalAlpha *= a * q; ctx.fillStyle = i === acc ? C.acc : C.pap; ctx.strokeStyle = i === acc ? C.acc : C.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(cx + Math.cos(an) * r, cy + Math.sin(an) * r, i === acc ? sz * 1.8 : sz, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); } };

  P.cardShot('c1', 1, 'One voice is enough', (ctx, t) => { dotRing(ctx, 1740, 960, 80, 40, t, S.CH.c1.t0 + 0.4, { acc: 0, a: 0.8, sz: 6 }); });

  // S1 — 198 members: a 18×11 grid of dots fills with a counter; the last one is the EU
  P.shot(ev.c1_s1, (ctx, t) => {
    P.bgLine(ctx, t);
    const t0 = ev.c1_198 - 0.2, t1 = ev.c1_198b; const n = 198;
    for (let i = 0; i < n; i++) { const c = i % 18, r = Math.floor(i / 18); const x = 820 + c * 58, y = 260 + r * 58; const q = P.pop(t, t0 + (i / n) * (t1 - t0), 0.25); if (q <= 0) continue; const eu = i === n - 1 && t > ev.c1_eu;
      ctx.save(); ctx.fillStyle = eu ? C.acc : C.pap; ctx.strokeStyle = eu ? C.acc : C.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x, y, 15 * q * (eu ? 1.3 : 1), 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); }
    if (t > ev.c1_eu) P.note(ctx, 'the European Union', 820 + 17 * 58, 260 + 10 * 58, 1500, 960, t, ev.c1_eu, { size: 48 });
    P.lcount(ctx, { x: 120, y: 520, from: 0, to: 198, t, t0, t1, size: 210, align: 'left' });
    P.write(ctx, 'MEMBERS OF THE', 124, 640, t, t1 - 0.2, { size: 44, align: 'left', weight: 800, color: C.ink2 });
    P.write(ctx, 'UN CLIMATE TREATY', 124, 700, t, t1, { size: 44, align: 'left', weight: 800 });
    P.write(ctx, '197 countries', 124, 820, t, ev.c1_197, { size: 50, align: 'left', weight: 700, fam: P.HAND, color: C.ink });
    P.write(ctx, '+ the EU', 124, 880, t, ev.c1_eu, { size: 50, align: 'left', weight: 700, fam: P.HAND, color: C.acc });
    P.source(ctx, 'UNFCCC', t, t1);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — Berlin 1995, COP1: the rule book; RULE 42 — VOTING gets big brackets that never go away
  P.shot(ev.c1_s2, (ctx, t) => {
    P.bgLine(ctx, t);
    P.stamp(ctx, 'BERLIN 1995', 380, 190, t, ev.c1_1995, { size: 70, color: C.acc, rot: -0.04 });
    P.note(ctx, 'the very first summit (COP1)', null, null, 380, 300, t, ev.c1_berlin, { size: 46 });
    const pk = P.dk(t, ev.c1_s2 + 0.2, 0.9); P.art(ctx, [{ pts: P.rectPts(760, 120, 780, 860), fill: C.pap }], pk, { lw: 5 });
    G.text(ctx, 'RULES OF PROCEDURE', 1150, 210, { size: 46, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0, alpha: P.fin(t, ev.c1_s2 + 0.6, 0.3) });
    for (let i = 0; i < 12; i++) { const y = 290 + i * 54; if (i === 6) continue; P.dLine(ctx, 820, y, 1480 - (i % 4) * 70, y, P.dk(t, ev.c1_s2 + 0.6 + i * 0.06, 0.4), { lw: 4, color: C.ink3 }); }
    const ry = 290 + 6 * 54; P.write(ctx, 'Rule 42 — Voting', 1150, ry + 14, t, ev.c1_how, { size: 56, weight: 900, color: C.ink });
    const bk = P.eio((t - ev.c1_brk) / 0.3); if (bk > 0) { const dx = lerp(380, 0, bk); for (const sg of [-1, 1]) { const x = 1150 + sg * (330 + dx); P.art(ctx, [[[x + sg * -30, ry - 60], [x, ry - 60], [x, ry + 50], [x + sg * -30, ry + 50]]], 1, { color: C.acc, lw: 12, a: bk }); } }
    P.note(ctx, 'still in brackets today', 1500, ry + 50, 1640, 900, t, ev.c1_today, { size: 52 });
    Ch.ozzy(ctx, { x: 340, y: 980, s: 0.75, t, gesture: t > ev.c1_brk ? 'shrug' : 'think', mouth: P.talk(t), look: 1, eyes: t > ev.c1_brk ? 'wide' : 'open' });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — consensus: 198 dots linked to one deal; one dot says NO and every link breaks
  P.shot(ev.c1_s3, (ctx, t) => {
    P.bgLine(ctx, t);
    P.stamp(ctx, 'CONSENSUS', 960, 120, t, ev.c1_cons, { size: 72, color: C.ink, fg: C.pap, rot: -0.02 });
    const cx = 960, cy = 590, r = 360; const brk = P.eio((t - ev.c1_stop) / 0.6); const lk = P.dk(t, ev.c1_s3 + 0.3, 1.2);
    for (let i = 0; i < 198; i += 3) { const an = -Math.PI / 2 + i / 198 * 6.283; const x = cx + Math.cos(an) * r, y = cy + Math.sin(an) * r * 0.9; const m = 1 - brk * 0.55;
      P.dLine(ctx, x, y, lerp(x, cx, m * 0.78), lerp(y, cy, m * 0.78), lk, { lw: 2, color: brk > 0 ? C.ink3 : C.ink2 }); }
    for (let i = 0; i < 198; i++) { const an = -Math.PI / 2 + i / 198 * 6.283; const x = cx + Math.cos(an) * r, y = cy + Math.sin(an) * r * 0.9; const one = i === 40 && t > ev.c1_onec; const q = clamp((t - ev.c1_s3 - i * 0.003) / 0.2);
      ctx.save(); ctx.globalAlpha *= q; ctx.fillStyle = one ? C.acc : C.pap; ctx.strokeStyle = one ? C.acc : C.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, one ? 18 : 8, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore();
      if (i === 40) { const bq = P.pop(t, ev.c1_onec + 0.15, 0.35); if (bq > 0) P.at(ctx, x + 90, y - 70, bq, 0, () => { P.rect(ctx, -70, -44, 140, 80, 20, C.acc); P.poly(ctx, [[-40, 30], [-70, 60], [-10, 30]], C.acc); G.text(ctx, 'NO', 0, 16, { size: 50, fam: 'Inter', weight: 900, color: C.pap, align: 'center', boil: 0 }); }); } }
    P.doc(ctx, cx, cy, 0.62, t, { k: P.dk(t, ev.c1_s3 + 0.2, 0.6), title: 'DEAL' });
    P.cross(ctx, cx - 110, cy - 140, cx + 110, cy + 140, P.dk(t, ev.c1_stop + 0.1, 0.5));
    P.head(ctx, '1 OF 198 CAN BLOCK', 960, 1030, t, ev.c1_theory, { size: 60, hl: ['1'] });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — Copenhagen 2009: a handful object; ADOPTED is crossed out → "takes note of"
  P.shot(ev.c1_s4, (ctx, t) => {
    P.bgLine(ctx, t);
    P.stamp(ctx, 'COPENHAGEN 2009', 480, 170, t, ev.c1_cop, { size: 70, color: C.acc, rot: -0.03 });
    P.doc(ctx, 520, 610, 1.2, t, { k: P.dk(t, ev.c1_s4 + 0.1, 0.8), title: 'COPENHAGEN ACCORD', sig: P.fin(t, ev.c1_2009, 1.2), n: 6 });
    P.summit(ctx, 1380, 640, 330, 130, t, { k: P.dk(t, ev.c1_s4 + 0.3, 0.8), n: 40, out: t > ev.c1_obj ? 0.15 : 0 });
    P.note(ctx, 'a handful objected', 1380, 800, 1400, 900, t, ev.c1_obj + 0.1, { size: 50 });
    const ak = P.pop(t, ev.c1_hand - 0.4, 0.4); if (ak > 0) P.at(ctx, 1380, 400, ak, -0.03, () => { G.text(ctx, 'ADOPTED', 0, 20, { size: 76, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0 }); });
    P.cross(ctx, 1210, 340, 1550, 440, P.dk(t, ev.c1_note - 0.3, 0.4), { lw: 9 });
    P.note(ctx, '"takes note of"', null, null, 1380, 250, t, ev.c1_note, { size: 64 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S5 — Antalya, two sides: a tug-of-war that doesn't move
  P.shot(ev.c1_s5, (ctx, t) => {
    P.bgLine(ctx, t);
    P.write(ctx, 'ANTALYA 2026', 960, 130, t, ev.c1_s5 + 0.1, { size: 54, weight: 900, color: C.ink2 });
    const jig = Math.sin(t * 2.2) * 14 * P.fin(t, ev.c1_sides, 0.5); const rk = P.dk(t, ev.c1_sides - 0.2, 0.7);
    P.art(ctx, [P.wave(260 + jig, 1660 + jig, 640, 4, 6, t * 2)], rk, { lw: 7 });
    P.art(ctx, [P.circPts(960 + jig, 640, 22, 20)], rk, { lw: 6, color: C.acc });
    P.dLine(ctx, 960, 520, 960, 760, rk, { lw: 3, color: C.ink3, dash: [10, 10] });
    const L1 = [['EU', ev.c1_eu2], ['UK', ev.c1_uk], ['SMALL ISLANDS', ev.c1_isl]], R1 = [['SAUDI ARABIA', ev.c1_saudi, 'for the Arab Group'], ['RUSSIA', ev.c1_russia]];
    L1.forEach(([nm, t0], i) => { const x = 330 + i * 170 + jig; P.person(ctx, x, 860, 0.95, t, { pose: 'arms', k: P.fin(t, ev.c1_s5 + 0.3 + i * 0.15, 0.4), seed: i, dir: -1 }); P.tag(ctx, nm, x, 920, t, t0, 1e9, { size: 28, fill: C.pap, color: C.ink, border: C.ink }); });
    R1.forEach(([nm, t0, sub], i) => { const x = 1460 + i * 200 + jig; P.person(ctx, x, 860, 0.95, t, { pose: 'arms', k: P.fin(t, ev.c1_s5 + 0.5 + i * 0.15, 0.4), seed: i + 5 }); P.tag(ctx, nm, x, 920, t, t0, 1e9, { size: 28, fill: C.pap, color: C.ink, border: C.ink }); if (sub) P.note(ctx, sub, null, null, x, 960, t, t0 + 0.4, { size: 34 }); });
    P.head(ctx, 'NAME FOSSIL FUELS', 520, 300, t, Math.min(ev.c1_ff, ev.c1_sides + 0.3), { size: 54, hl: ['FOSSIL'] });
    P.head(ctx, 'NO PHASE-OUT', 1520, 300, t, Math.min(ev.c1_phase, ev.c1_sides + 0.7), { size: 54, hl: [] });
    P.note(ctx, 'as reported', null, null, 1520, 380, t, ev.c1_rep, { size: 40, color: C.ink2 });
    P.source(ctx, 'UN News · ABC · AFP, 22–23 Nov 2026', t, ev.c1_saudi);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — the UN chief's quote
  P.shot(ev.c1_s6, (ctx, t) => {
    P.bgLine(ctx, t);
    P.person(ctx, 300, 900, 1.25, t, { pose: 'stand', k: P.fin(t, ev.c1_s6, 0.5), name: 'ANTÓNIO GUTERRES', sub: 'UN Secretary-General', hair: 1 });
    P.write(ctx, 'THE UN CHIEF:', 640, 200, t, ev.c1_chief - 0.3, { size: 56, align: 'left', weight: 900, color: C.acc });
    P.quote(ctx, 'There may be no consensus in the negotiating room.', '', 640, 300, 1120, t, ev.c1_q1 - 0.2, { size: 60 });
    P.quote(ctx, 'There is no ambiguity in the science.', 'UN chief, 22 Nov 2026', 640, 620, 1120, t, ev.c1_q2, { size: 60 });
    P.underline(ctx, 1150, 1520, 640 + 20, P.dk(t, ev.c1_sci, 0.5), { lw: 8 });
    P.source(ctx, 'UN News', t, ev.c1_q1);
  }, { in: { type: 'wipe', dir: 'right', dur: 0.5, color: C.ink } });

  // S7 — same table, two deals: 1987 OZONE ✓ / 2026 CLIMATE ✗ — what made that one different?
  P.shot(ev.c1_s7, (ctx, t) => {
    P.bgLine(ctx, t);
    P.summit(ctx, 960, 880, 520, 120, t, { k: P.dk(t, ev.c1_same - 0.3, 0.8), n: 44 });
    P.doc(ctx, 560, 420, 0.9, t, { k: P.dk(t, ev.c1_ozone - 0.3, 0.6), title: '1987 · OZONE', sig: P.fin(t, ev.c1_ozone, 1.0), n: 6 });
    P.tick(ctx, 700, 300, 1.6, P.dk(t, ev.c1_ozone + 0.6, 0.4));
    P.doc(ctx, 1360, 420, 0.9, t, { k: P.dk(t, ev.c1_s7 + 0.1, 0.6), title: '2026 · CLIMATE' });
    P.cross(ctx, 1460, 250, 1560, 350, P.dk(t, ev.c1_ozone + 0.9, 0.4), { lw: 9 });
    P.note(ctx, 'same kind of diplomats', null, null, 960, 690, t, ev.c1_dipl, { size: 48, color: C.ink2 });
    const qk = P.pop(t, ev.c1_diff, 0.4); if (qk > 0) P.at(ctx, 960, 430, qk, 0, () => G.text(ctx, '?', 0, 60, { size: 200, fam: 'Inter', weight: 900, color: C.acc, align: 'center', boil: 0 }));
    Ch.ozzy(ctx, { x: 1760, y: 1000, s: 0.6, t, dir: -1, gesture: t > ev.c1_diff ? 'shrug' : 'point', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'fade', dur: 0.4 } });
})();
