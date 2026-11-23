// Chapter 7 — payoff: the opening question again · ozone = a few factories, one chemical, replacements ready, money to help; climate =
// every country, the energy under everything · same rules, same people, a different price of yes · Antalya ended without its deal, and above it
// the hole is closing — proof the world can say yes · END CARD (like, subscribe, Instagram, TikTok, sends line), Ozzy waves
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L } = S; const C = P.C;
  const W = G.W, H = G.H;

  // S1 — the question, again (split page)
  P.shot(ev.c7_s1, (ctx, t) => {
    P.bgLine(ctx, t);
    P.dLine(ctx, 960, 120, 960, 960, P.dk(t, ev.c7_s1, 0.6), { lw: 4, color: C.ink3 });
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, 960, H); ctx.clip(); P.ozoneBand(ctx, t, 220, 460, { k: P.dk(t, ev.c7_s1, 1.0), n: 14 }); ctx.restore();
    P.head(ctx, 'OZONE', 480, 640, t, ev.c7_one - 0.3, { size: 80, hl: [] }); P.tick(ctx, 480, 780, 2.2, P.dk(t, ev.c7_one, 0.5));
    for (let i = 0; i < 12; i++) { const x = 1080 + (i % 4) * 230 + (Math.floor(i / 4) % 2) * 100 + Math.sin(t * 0.6 + i) * 20, y = 200 + Math.floor(i / 4) * 120 + Math.cos(t * 0.5 + i) * 14; const k = P.dk(t, ev.c7_s1 + 0.2 + i * 0.05, 0.5);
      P.atom(ctx, x, y, 26, 'C', { k }); P.atom(ctx, x - 50, y + 6, 20, 'O', { k }); P.atom(ctx, x + 50, y + 6, 20, 'O', { k }); }
    P.head(ctx, 'CLIMATE', 1440, 640, t, ev.c7_other - 0.3, { size: 80, hl: [] });
    const qk = P.pop(t, ev.c7_other + 0.1, 0.4); if (qk > 0) P.at(ctx, 1440, 800, qk, 0, () => G.text(ctx, '?', 0, 50, { size: 170, fam: 'Inter', weight: 900, color: C.acc, align: 'center', boil: 0 }));
    Ch.ozzy(ctx, { x: 960, y: 1060, s: 0.8, t, gesture: 'think', mouth: P.talk(t), look: 0 });
  }, { in: { type: 'wipe', dir: 'left', dur: 0.6, color: C.ink } });

  // S2 — the answer: a small change (one gas in a fridge, a few factories, money) vs a big one (the energy under everything)
  P.shot(ev.c7_s2, (ctx, t) => {
    P.bgLine(ctx, t);
    P.dLine(ctx, 760, 140, 760, 980, 1, { lw: 4, color: C.ink3 });
    P.write(ctx, 'OZONE DEAL', 380, 150, t, ev.c7_s2 + 0.1, { size: 54, weight: 900 }); P.write(ctx, 'CLIMATE DEAL', 1340, 150, t, ev.c7_s2 + 0.5, { size: 54, weight: 900, color: C.acc });
    P.fridge(ctx, 300, 760, 0.9, t, { k: P.dk(t, ev.c7_s2 + 0.2, 0.6) });
    for (let i = 0; i < 3; i++) P.factory(ctx, 560 + (i % 2) * 40, 470 + i * 150, 0.28, t, { k: P.dk(t, ev.c7_few + i * 0.1, 0.4), n: 1 });
    P.tag(ctx, '1 CHEMICAL', 300, 860, t, ev.c7_chem, 1e9, { size: 36, fill: C.pap, color: C.ink, border: C.ink });
    P.bill(ctx, 560, 900, 0.8, { k: P.dk(t, ev.c7_money - 0.2, 0.4) });
    // the climate side: a web of energy around a power tower
    const hub = [1340, 560]; const nodes = [[1000, 320], [1700, 320], [1000, 800], [1700, 800], [1340, 920], [1340, 260], [1060, 560], [1640, 560]]; const wk = P.dk(t, ev.c7_every, 1.0);
    nodes.forEach(([x, y], i) => P.dLine(ctx, hub[0], hub[1], x, y, clamp(wk * 1.4 - i * 0.05), { lw: 3, color: C.acc, dash: [10, 8] }));
    P.tower(ctx, hub[0], hub[1] + 120, 0.55, t, { k: P.dk(t, ev.c7_s2 + 0.7, 0.8) });
    P.car(ctx, 1000, 360, 0.4, t, { k: clamp(wk * 1.5 - 0.2) }); P.plane(ctx, 1700, 320, 0.4, t, { k: clamp(wk * 1.5 - 0.3) }); P.factory(ctx, 1000, 860, 0.3, t, { k: clamp(wk * 1.5 - 0.4), n: 2 });
    for (let i = 0; i < 4; i++) { const [x, y] = [[1700, 830], [1340, 960], [1340, 300], [1640, 590]][i]; P.art(ctx, [{ pts: [[x - 40, y], [x - 40, y - 50], [x, y - 80], [x + 40, y - 50], [x + 40, y], [x - 40, y]], fill: C.pap }], clamp(wk * 1.5 - 0.5 - i * 0.05), { lw: 4 }); }
    P.write(ctx, 'THE ENERGY UNDER EVERYTHING', 1340, 1040, t, ev.c7_energy, { size: 42, weight: 900, color: C.acc });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S3 — same rules · same people · a very different price of yes
  P.shot(ev.c7_s3, (ctx, t) => {
    P.bgLine(ctx, t);
    P.head(ctx, 'SAME RULES.', 960, 330, t, ev.c7_r - 0.2, { size: 100, hl: [] });
    P.head(ctx, 'SAME PEOPLE.', 960, 490, t, ev.c7_p - 0.2, { size: 100, hl: [] });
    P.head(ctx, 'A DIFFERENT PRICE OF YES.', 960, 700, t, ev.c7_price - 0.3, { size: 104, hl: ['PRICE', 'YES.'] });
    Ch.ozzy(ctx, { x: 1700, y: 1050, s: 0.6, t, dir: -1, gesture: t > ev.c7_yes ? 'cheer' : 'idle', mouth: P.talk(t), eyes: t > ev.c7_yes ? 'happy' : 'open', look: -1 });
  }, { in: { type: 'push', dir: 'up', dur: 0.5 } });

  // S4 — Antalya at night, the table empty; the camera rises into the sky: the hole the world agreed to fix in 1987 is closing
  P.shot(ev.c7_s4, (ctx, t) => {
    P.bgLine(ctx, t);
    const up = P.eio((t - ev.c7_above + 0.4) / 1.6);
    ctx.save(); ctx.translate(0, up * 820);
    P.summit(ctx, 960, 760, 520, 140, t, { k: P.dk(t, ev.c7_s4, 0.7), n: 44, out: t > ev.c7_without ? 1 : 0 });
    P.write(ctx, 'ANTALYA · SUNDAY NIGHT', 960, 440, t, ev.c7_antalya, { size: 54, weight: 900, color: C.ink2 });
    P.note(ctx, 'no main deal', null, null, 960, 1000, t, ev.c7_without, { size: 54 });
    ctx.restore();
    if (up > 0) { ctx.save(); ctx.translate(0, -(1 - up) * 820);
      P.ozoneBand(ctx, t, 150, 300, { k: up, n: 18 });
      const hole = lerp(0.9, 0.25, P.eio((t - ev.c7_closing + 0.6) / 2.4));
      P.globe(ctx, 960, 660, 260, t, { lon0: t * 3, lat0: -72, k: 1, hole });
      P.write(ctx, '1987', 420, 640, t, ev.c7_1987, { size: 90, weight: 900 }); P.carrow(ctx, 520, 610, 640, 560, -0.2, P.dk(t, ev.c7_1987 + 0.2, 0.5));
      P.write(ctx, '→ 2066', 1520, 640, t, ev.c7_closing, { size: 90, weight: 900, color: C.acc });
      ctx.restore(); }
    P.head(ctx, 'PROOF THE WORLD CAN SAY YES', 960, 1010, t, ev.c7_proof, { size: 64, hl: ['YES'] });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S5 — END CARD
  P.shot(ev.c7_s5, (ctx, t) => {
    P.bgLine(ctx, t);
    const kb = P.pop(t, ev.sync_logo, 0.5); P.brandPlanet(ctx, 600, 210, 56 * kb, t, 1); G.text(ctx, 'WHYVERSE', 1090, 250, { size: 120, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0, alpha: clamp(kb) });
    P.underline(ctx, 830, 1350, 280, P.dk(t, ev.sync_logo + 0.3, 0.5), { lw: 9, color: C.gold });
    const like = P.pop(t, ev.c7_like, 0.45); P.at(ctx, 700, 470, like, -0.02, () => { const on = t > ev.c7_like + 0.3; P.rect(ctx, -200, -70, 400, 140, 70, on ? C.acc : C.pap, { stroke: on ? C.acc : C.ink, lw: 6 });
      P.fill(ctx, P.pPoly([[-130, 30], [-130, -10], [-100, -10], [-80, -50], [-64, -48], [-70, -10], [-30, -10], [-40, 30]]), on ? C.pap : C.ink); G.text(ctx, 'LIKE', 50, 24, { size: 66, fam: 'Inter', weight: 900, color: on ? C.pap : C.ink, align: 'center', boil: 0 }); });
    const sub = P.pop(t, ev.c7_sub, 0.45); P.at(ctx, 1240, 470, sub, 0.02, () => { const on = t > ev.c7_sub + 0.35; P.rect(ctx, -270, -70, 540, 140, 70, on ? C.ink : C.acc);
      G.text(ctx, on ? 'SUBSCRIBED ✓' : 'SUBSCRIBE', 0, 24, { size: 62, fam: 'Inter', weight: 900, color: C.pap, align: 'center', boil: 0 }); });
    P.ring(ctx, 1240, 470, t, ev.c7_sub + 0.35, { r: 320, color: C.acc });
    P.tag(ctx, 'Instagram  @whyverse___', 640, 680, t, ev.c7_ig, 1e9, { size: 46, fill: C.pap, color: C.ink, dot: C.acc, border: C.ink });
    P.tag(ctx, 'TikTok  @Whyverse', 1300, 680, t, ev.c7_tt, 1e9, { size: 46, fill: C.pap, color: C.ink, dot: C.ink, border: C.ink });
    const sk = P.pop(t, ev.c7_send, 0.45); if (sk > 0) P.at(ctx, 960, 860, sk, -0.01, () => { const s = 'Send this to the friend who says nothing ever changes'; const tw = P.measure(ctx, s, 42, 'Inter', 800);
      P.rect(ctx, -tw / 2 - 110, -54, tw + 160, 108, 8, C.pap, { stroke: C.ink, lw: 5 }); const ex = -tw / 2 - 50; P.rect(ctx, ex - 30, -22, 60, 44, 4, C.pap, { stroke: C.acc, lw: 4 }); P.trace(ctx, [[ex - 30, -22], [ex, 4], [ex + 30, -22]], 1, C.acc, 4);
      G.text(ctx, s, 30, 15, { size: 42, fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0 }); });
    Ch.ozzy(ctx, { x: 1700, y: 1060, s: 0.6, t, dir: -1, gesture: t > ev.c7_like ? 'cheer' : 'wave', mouth: P.talk(t), eyes: 'happy', look: -1 });
    ctx.save(); ctx.globalAlpha *= 0.6; for (let i = 0; i < 5; i++) P.o3(ctx, 160 + i * 60, 980 - i * 30 + Math.sin(t + i) * 10, 10, t, { seed: i }); ctx.restore();
  }, { in: { type: 'iris', color: C.ink, at: [960, 540], dur: 0.8 } });
})();
