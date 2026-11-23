// Chapter 0 — cold open: Antalya, Sunday night, two days past the deadline, nearly 200 countries · "no agreement on this text" ·
// the paradox: 1987, the same world agreed, every country signed up · cans, fridges, ACs changed, the hole closing · Ozzy + 3 promises ·
// the question · TITLE "ONE SKY. TWO PROBLEMS."
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L } = S; const C = P.C;
  const W = G.W, H = G.H;
  const clock = (ctx, x, y, r, t, spin, k) => { P.dCirc(ctx, x, y, r, k, { lw: 5, fill: C.pap }); if (k < 0.8) return;
    for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; P.line(ctx, x + Math.cos(a) * r * 0.82, y + Math.sin(a) * r * 0.82, x + Math.cos(a) * r * 0.92, y + Math.sin(a) * r * 0.92, C.ink, 4); }
    const hA = -1.57 + spin * 0.52, mA = -1.57 + spin * 6.283; P.line(ctx, x, y, x + Math.cos(hA) * r * 0.5, y + Math.sin(hA) * r * 0.5, C.ink, 7); P.line(ctx, x, y, x + Math.cos(mA) * r * 0.75, y + Math.sin(mA) * r * 0.75, C.acc, 5); P.circ(ctx, x, y, 7, C.ink); };

  // S1 — Antalya, Sunday night: globe + pin, the summit table, a clock spinning past the deadline (+2 DAYS), nearly 200 countries
  P.shot(ev.c0_s1, (ctx, t) => {
    P.bgLine(ctx, t);
    ctx.save(); P.push(ctx, (t - ev.c0_s1) / 9, 960, 540, 0.03);
    const pr = P.globe(ctx, 470, 560, 300, t, { lon0: 32 - t * 0.6, lat0: 28, k: P.dk(t, 0.2, 1.4) });
    const p = pr(30.7, 36.9); const pk = P.pop(t, ev.c0_ant, 0.4);
    if (pk > 0 && p[2] > 0) { P.ring(ctx, p[0], p[1], t, ev.c0_ant, { r: 80, color: C.acc }); P.circ(ctx, p[0], p[1], 14 * pk, C.acc); P.note(ctx, 'Antalya, Türkiye', p[0], p[1], p[0] + 330, p[1] - 200, t, ev.c0_ant + 0.1, { size: 50 }); }
    P.write(ctx, 'COP31 · SUNDAY 22 NOV 2026', 90, 130, t, ev.c0_sun, { size: 46, align: 'left', weight: 800, color: C.ink2 });
    P.summit(ctx, 1300, 690, 380, 150, t, { k: P.dk(t, ev.c0_ant + 0.8, 1.2), n: 44, lit: 1 });
    P.head(ctx, 'THE LONGEST CLIMATE SUMMIT EVER', 1300, 420, t, ev.c0_long, { size: 52, hl: ['LONGEST'] });
    const spin = clamp((t - ev.c0_two + 0.6) / 2.2); clock(ctx, 1640, 220, 92, t, ease.inOutCubic(spin) * 8, P.dk(t, ev.c0_two - 0.6, 0.6));
    P.stamp(ctx, '+2 DAYS', 1400, 220, t, ev.c0_dead, { size: 64, color: C.acc, rot: -0.05 });
    P.lcount(ctx, { x: 1300, y: 990, from: 0, to: 200, t, t0: ev.c0_200, t1: ev.c0_room, size: 96, prefix: '≈ ', sub: '', align: 'center' });
    P.small(ctx, 'COUNTRIES IN THE ROOM', 1300, 1046, { align: 'center', size: 32, alpha: P.fin(t, ev.c0_room, 0.4) });
    ctx.restore();
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — the president: "I understand that there is no agreement on this text." → the main deal crossed out; seats turn accent
  P.shot(ev.c0_s2, (ctx, t) => {
    P.bgLine(ctx, t);
    P.person(ctx, 420, 900, 1.3, t, { pose: t > ev.c0_noag ? 'arms' : 'stand', k: P.fin(t, ev.c0_s2 + 0.1, 0.5), seed: 2 });
    P.art(ctx, [{ pts: P.rectPts(250, 760, 340, 40), fill: C.pap }, { pts: P.rrPts(300, 800, 240, 240, 10), fill: C.pap }], P.dk(t, ev.c0_s2, 0.8), { lw: 5 });
    const nk = P.pop(t, ev.c0_pres, 0.4); if (nk > 0) P.at(ctx, 420, 900, nk, 0, () => { const s = 'MURAT KURUM'; const w = P.measure(ctx, s, 34, 'Inter', 800) + 40; ctx.fillStyle = C.pap; ctx.fillRect(-w / 2, -34, w, 56); ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.strokeRect(-w / 2, -34, w, 56); ctx.fillStyle = C.acc; ctx.fillRect(-w / 2, -34, 8, 56); G.text(ctx, s, 4, 6, { size: 34, fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0 }); G.text(ctx, 'COP31 president', 0, 70, { size: 34, fam: P.HAND, color: C.acc, align: 'center', boil: 0 }); });
    P.summit(ctx, 1420, 930, 330, 80, t, { k: P.dk(t, ev.c0_s2 + 0.2, 0.8), n: 36, out: t > ev.c0_noag ? P.fin(t, ev.c0_noag, 2.5) : 0 });
    P.quote(ctx, 'I understand that there is no agreement on this text.', '', 760, 230, 1020, t, ev.c0_quote - 0.3, { size: 60 });
    P.doc(ctx, 1420, 620, 0.75, t, { k: P.dk(t, ev.c0_main - 0.2, 0.6), title: 'ANTALYA PACT', rot: 0.04 });
    P.cross(ctx, 1290, 460, 1550, 780, P.dk(t, ev.c0_gone, 0.5), { lw: 12 });
    P.note(ctx, 'not adopted', 1520, 700, 1740, 760, t, ev.c0_gone + 0.3, { size: 52 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — the paradox: 1987, a danger in the sky, the world agreed — every country signed up (198 dots fill a ring)
  P.shot(ev.c0_s3, (ctx, t) => {
    P.bgLine(ctx, t);
        P.stamp(ctx, '1987', 230, 150, t, ev.c0_forty + 0.2, { size: 88, color: C.acc, rot: -0.04 });
    const hole = P.eio((t - ev.c0_danger) / 1.4);
    const pr = P.globe(ctx, 960, 560, 300, t, { lon0: 20 + t * 2, lat0: -58, k: P.dk(t, ev.c0_s3 + 0.1, 1.2), hole });
    P.note(ctx, 'almost 40 years ago', null, null, 230, 260, t, ev.c0_forty + 0.4, { size: 46 });
    P.note(ctx, 'a danger in the sky', 1120, 380, 1430, 230, t, ev.c0_danger + 0.4, { size: 50 });
    const n0 = ev.c0_every - 0.2, n1 = ev.c0_signed; const f = clamp((t - n0) / (n1 - n0));
    for (let i = 0; i < 198; i++) { const a = -Math.PI / 2 + i / 198 * 6.283; const x = 960 + Math.cos(a) * 400, y = 560 + Math.sin(a) * 400; const on = i / 198 < f; const q = P.pop(t, n0 + (i / 198) * (n1 - n0), 0.25);
      if (t < ev.c0_agreed - 0.3) continue; ctx.save(); ctx.globalAlpha *= clamp((t - ev.c0_agreed + 0.3) / 0.4); ctx.fillStyle = on ? C.acc : C.pap; ctx.strokeStyle = on ? C.acc : C.ink3; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, 7 * (on ? Math.max(1, q) : 1), 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); }
    P.lcount(ctx, { x: 1640, y: 640, from: 0, to: 198, t, t0: ev.c0_every - 0.1, t1: ev.c0_signed, size: 120 });
    P.small(ctx, 'COUNTRIES (+ EU)', 1640, 700, { align: 'center', alpha: P.fin(t, ev.c0_every, 0.4) });
    P.stamp(ctx, 'EVERY COUNTRY', 1640, 820, t, ev.c0_signed, { size: 54, color: C.acc, rot: 0.03 });
    P.tick(ctx, 300, 600, 2, P.dk(t, ev.c0_agreed, 0.5));
    P.write(ctx, 'AGREED', 300, 720, t, ev.c0_agreed, { size: 60, weight: 900, color: C.acc });
  }, { in: { type: 'wipe', dir: 'right', dur: 0.5, color: C.ink } });

  // S4 — spray cans, fridges, air conditioners: CFC tags flip to NEW; then the hole slowly closing
  P.shot(ev.c0_s4, (ctx, t) => {
    P.bgLine(ctx, t);
    const out = P.eio((t - ev.c0_hole + 0.4) / 0.7);
    ctx.save(); ctx.translate(-out * 1300, 0);
    const items = [[ev.c0_spray, (k) => P.can(ctx, 360, 820, 1.4, t, { k, spray: P.win(t, ev.c0_spray + 0.3, ev.c0_changed, 0.3) }), 360, 480], [ev.c0_fridge, (k) => P.fridge(ctx, 880, 860, 1.25, t, { k }), 880, 340], [ev.c0_ac, (k) => P.ac(ctx, 1450, 640, 1.3, t, { k }), 1450, 430]];
    items.forEach(([t0, fn, tx, ty], i) => { fn(P.dk(t, t0 - 0.3, 0.7)); const flip = P.eio((t - ev.c0_changed - i * 0.12) / 0.35);
      const tk = P.pop(t, t0 + 0.2, 0.3); if (tk > 0) P.at(ctx, tx, ty, tk, 0, () => { ctx.scale(1, Math.abs(Math.cos(flip * Math.PI)) + 0.001); const lab = flip < 0.5 ? 'CFC' : '✓ NEW'; const w = P.measure(ctx, lab, 44, 'Inter', 900) + 40;
        ctx.fillStyle = flip < 0.5 ? C.acc : C.pap; ctx.fillRect(-w / 2, -36, w, 66); ctx.strokeStyle = flip < 0.5 ? C.acc : C.ink; ctx.lineWidth = 4; ctx.strokeRect(-w / 2, -36, w, 66); G.text(ctx, lab, 0, 13, { size: 44, fam: 'Inter', weight: 900, color: flip < 0.5 ? C.pap : C.ink, align: 'center', boil: 0 }); }); });
    P.head(ctx, 'ALL CHANGED', 960, 1010, t, ev.c0_changed, { size: 64, hl: ['CHANGED'] });
    ctx.restore();
    if (out > 0) { ctx.save(); ctx.translate((1 - out) * 1300, 0);
      const hole = 1 - 0.45 * P.eio((t - ev.c0_closing + 0.6) / 2.4);
      P.globe(ctx, 960, 560, 360, t, { lon0: t * 3, lat0: -72, k: 1, hole });
      P.note(ctx, 'over Antarctica', 1160, 700, 1500, 860, t, ev.c0_ant2, { size: 52 });
      P.note(ctx, 'slowly closing', null, null, 420, 300, t, ev.c0_closing, { size: 64 });
      ctx.restore(); }
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — Ozzy appears; three promise cards
  P.shot(ev.c0_s5, (ctx, t) => {
    P.bgLine(ctx, t);
    const ent = P.eio((t - ev.c0_ozzy) / 0.8);
    Ch.ozzy(ctx, { x: 300, y: 1000 + (1 - ent) * 500, s: 1.15, t, gesture: t > ev.c0_q1 - 0.2 ? 'point' : 'wave', mouth: P.talk(t), look: 1, k: P.dk(t, ev.c0_ozzy, 1.0) });
    const cards = [['WHY THE', 'OZONE DEAL', 'WORKED', ev.c0_q1], ['WHY CLIMATE', 'IS SO MUCH', 'HARDER', ev.c0_q2], ['WHAT COULD', 'WORK', 'NEXT', ev.c0_q3]];
    cards.forEach(([a, b, c2, t0], i) => { const x = 720 + i * 400, y = 300; const k = P.dk(t, t0 - 0.15, 0.6); if (k <= 0) return; P.card(ctx, x, y, 350, 420, k);
      P.dCirc(ctx, x + 175, y + 90, 46, P.dk(t, t0, 0.5), { color: C.acc, lw: 5 }); G.text(ctx, String(i + 1), x + 175, y + 116, { size: 70, fam: 'Inter', weight: 900, color: C.acc, align: 'center', boil: 0, alpha: P.fin(t, t0 + 0.1, 0.3) });
      [a, b, c2].forEach((s2, j) => P.write(ctx, s2, x + 175, y + 220 + j * 64, t, t0 + 0.15 + j * 0.1, { size: 46, weight: j === 2 ? 900 : 800, color: j === 2 ? C.acc : C.ink })); });
    P.write(ctx, 'BY THE END OF THIS VIDEO', 1120, 180, t, ev.c0_s5 + 0.2, { size: 44, weight: 800, color: C.ink2 });
  }, { in: { type: 'push', dir: 'up', dur: 0.5 } });

  // S6 — the question: one sky problem fixed (ozone band ✓), the other not (CO2 haze ?), Ozzy shrugs
  P.shot(ev.c0_s6, (ctx, t) => {
    P.bgLine(ctx, t);
    P.dLine(ctx, 960, 120, 960, 960, P.dk(t, ev.c0_s6, 0.6), { lw: 4, color: C.ink3 });
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 960, H); ctx.clip(); P.ozoneBand(ctx, t, 220, 460, { k: P.dk(t, ev.c0_s6, 1.2), n: 14 }); ctx.restore();
    P.head(ctx, 'OZONE', 480, 640, t, ev.c0_one - 0.3, { size: 80, hl: [] }); P.tick(ctx, 480, 780, 2.2, P.dk(t, ev.c0_one, 0.5));
    for (let i = 0; i < 12; i++) { const x = 1080 + (i % 4) * 230 + (Math.floor(i / 4) % 2) * 100 + Math.sin(t * 0.6 + i) * 20, y = 200 + Math.floor(i / 4) * 120 + Math.cos(t * 0.5 + i) * 14; const k = P.dk(t, ev.c0_s6 + 0.2 + i * 0.05, 0.5);
      P.atom(ctx, x, y, 26, 'C', { k }); P.atom(ctx, x - 50, y + 6, 20, 'O', { k }); P.atom(ctx, x + 50, y + 6, 20, 'O', { k }); P.bond(ctx, x - 26, y + 3, x - 50, y + 6, 0, 20, { k }); P.bond(ctx, x + 26, y + 3, x + 50, y + 6, 0, 20, { k }); }
    P.head(ctx, 'CLIMATE', 1440, 640, t, ev.c0_other - 0.3, { size: 80, hl: [] });
    const qk = P.pop(t, ev.c0_other + 0.1, 0.4); if (qk > 0) P.at(ctx, 1440, 800, qk, 0, () => G.text(ctx, '?', 0, 50, { size: 170, fam: 'Inter', weight: 900, color: C.acc, align: 'center', boil: 0 }));
    Ch.ozzy(ctx, { x: 960, y: 1060, s: 0.8, t, gesture: t > ev.c0_other ? 'shrug' : 'think', mouth: P.talk(t), look: t > ev.c0_other ? 1 : -1 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // TITLE — ink page: ONE SKY. / TWO PROBLEMS. + subtitle + Whyverse
  P.shot(ev.title0 - 0.15, (ctx, t) => {
    P.bgInk(ctx, t);
    const tw = ev.titleWords; const sz = 170;
    [[0, 1, 400], [2, 3, 600]].forEach(([i0, i1, y]) => { const ws = tw.slice(i0, i1 + 1); const widths = ws.map((w) => P.measure(ctx, w.w, sz, 'Inter', 900)); const tot = widths.reduce((a, b) => a + b, 0) + 50 * (ws.length - 1); let x = 960 - tot / 2;
      ws.forEach((w, j) => { const k = clamp((t - w.t) / 0.12); if (k > 0) { const sc = lerp(1.5, 1, ease.outCubic(k)); ctx.save(); ctx.translate(x + widths[j] / 2, y); ctx.scale(sc, sc); G.text(ctx, w.w, 0, 0, { size: sz, fam: 'Inter', weight: 900, color: (i0 + j) % 2 ? C.acc : C.pap, align: 'center', boil: 0, alpha: k }); ctx.restore(); }
        x += widths[j] + 50; }); });
    P.underline(ctx, 620, 1300, 640, P.dk(t, tw[3].t + 0.1, 0.5), { lw: 9 });
    P.write(ctx, 'Why the world fixed the ozone hole, but not the climate', 960, 760, t, ev.titleSub, { size: 46, weight: 700, color: 'rgba(244,239,228,0.8)', stag: 0.04 });
    const kb = P.pop(t, ev.titleBrand, 0.5); P.brandPlanet(ctx, 730, 905, 34 * kb, t, clamp(kb)); G.text(ctx, 'WHYVERSE', 990, 925, { size: 54, fam: 'Inter', weight: 900, color: C.gold, align: 'center', alpha: clamp(kb), boil: 0 });
    const ok = P.eio((t - ev.titleOzzy) / 0.6); if (ok > 0) Ch.ozzy(ctx, { x: 1640, y: 1120 - ok * 140, s: 0.7, t, gesture: 'wave', eyes: 'happy', a: ok });
    ctx.save(); ctx.globalAlpha *= 0.5; for (let i = 0; i < 8; i++) P.o3(ctx, 120 + i * 240 + Math.sin(t * 0.4 + i) * 20, 170 + (i % 2) * 60 + Math.cos(t * 0.5 + i) * 10, 12, t, { k: P.dk(t, ev.title0 + i * 0.08, 0.6), seed: i }); ctx.restore();
  }, { in: { type: 'flash', dur: 0.3 } });
})();
