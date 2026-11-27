// Chapter 7 — payoff: the question again · honest answer: we don't know yet — but for every billion that vanished, one survived ·
// you are made of survivors · the banana again: a tiny flash replays the oldest fight in the universe — scoreboard: matter still winning ·
// END CARD (like, subscribe, Instagram, TikTok, sends line), Elle + Posi wave
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L } = S; const C = P.C;
  const W = G.W, H = G.H;

  // S1 — the question, again
  P.shot(ev.c7_s1, (ctx, t) => {
    P.bgInk(ctx, t);
    for (let i = 0; i < 24; i++) P.star(ctx, 60 + U.hash(i, 41) * 1800, 60 + U.hash(i, 42) * 960, 5 + 7 * U.hash(i, 43), i % 3 ? C.yel : C.acc, 0.5 + 0.3 * Math.sin(t * 1.3 + i));
    P.rtext(ctx, "SO, WHY DIDN'T THE UNIVERSE", 960, 420, { size: 86, a: P.fin(t, ev.c7_s1 + 0.3, 0.4), top: C.pap, under: C.acc });
    P.rslam(ctx, 'DESTROY ITSELF?', 960, 580, t, ev.c7_destroy - 0.15, { size: 120, top: C.acc, under: C.ink });
    P.pairMeet(ctx, 960, 820, t, ev.c7_s1 + 0.2, ev.c7_destroy + 0.4, { gap: 380, r: 40, seed: 11 });
  }, { in: { type: 'wipe', dir: 'left', dur: 0.6, color: C.navy } });

  // S2 — "we don't know yet" + how close it came: a field flashes out, one survives
  P.shot(ev.c7_s2, (ctx, t) => {
    P.bgLine(ctx, t);
    P.write(ctx, "THE HONEST ANSWER: WE DON'T KNOW YET.", 960, 170, t, ev.c7_honest - 0.1, { size: 60, weight: 900, hl: ['YET'], hlColor: C.acc });
    const keep = 47; const tf0 = ev.c7_billion;
    for (let i = 0; i < 96; i++) { const x = 300 + (i % 16) * 88, y = 330 + Math.floor(i / 16) * 84; const tf = tf0 + U.hash(i, 13) * 0.9; const g = clamp((t - tf) / 0.2);
      if (i === keep) continue; if (g < 1) { P.part(ctx, x - 13, y, 15, 'e', { sign: false, a: 1 - g }); P.part(ctx, x + 13, y, 15, 'p', { sign: false, a: 1 - g }); } if (t > tf && t < tf + 0.3) P.iCirc(ctx, x, y, 28 * (1 - (t - tf) / 0.3), C.yel); }
    const kx = 300 + (keep % 16) * 88 - 13, ky = 330 + Math.floor(keep / 16) * 84; const sk = P.dk(t, ev.c7_one, 0.5); P.part(ctx, kx, ky, 15 + 30 * sk, 'e', {}); if (sk > 0) { P.glow(ctx, kx, ky, 160, C.ink, sk); P.art(ctx, [P.circPts(kx, ky, 64, 30)], sk, { color: C.acc, lw: 6 }); }
    P.note(ctx, 'how close it came', null, null, 1560, 940, t, ev.c7_close, { size: 50 });
    P.rslam(ctx, '1 SURVIVED', 640, 960, t, ev.c7_one, { size: 90 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S3 — you are made of survivors: a person built from blue dots
  P.shot(ev.c7_s3, (ctx, t) => {
    P.bgLine(ctx, t);
    // dots fly in to form a figure outline
    const shape = (u) => { // a simple standing-figure silhouette as a param curve (head + body)
      if (u < 0.3) { const a = u / 0.3 * 6.283; return [960 + Math.cos(a) * 70, 300 + Math.sin(a) * 80]; }
      const v = (u - 0.3) / 0.7; const pts = [[900, 390], [860, 640], [880, 900], [930, 900], [960, 700], [990, 900], [1040, 900], [1060, 640], [1020, 390]]; const f = v * (pts.length - 1); const i = Math.min(pts.length - 2, Math.floor(f)), q = f - i; return [lerp(pts[i][0], pts[i + 1][0], q), lerp(pts[i][1], pts[i + 1][1], q)]; };
    for (let i = 0; i < 140; i++) { const u = i / 140; const [tx, ty] = shape(u); const sx = U.hash(i, 51) * W, sy = U.hash(i, 52) * H; const k = P.eio((t - ev.c7_s3 - U.hash(i, 53) * 0.8) / 1.4);
      P.part(ctx, lerp(sx, tx, k), lerp(sy, ty, k), 9 + 3 * U.hash(i, 54), 'e', { sign: false }); }
    P.rtext(ctx, 'YOU', 960, 1010, { size: 90, a: P.fin(t, ev.c7_you, 0.3) });
    P.note(ctx, 'every atom: a survivor', null, null, 1460, 420, t, ev.c7_atom, { size: 52 });
    P.write(ctx, 'THE BIGGEST DISAPPEARANCE IN HISTORY', 960, 140, t, ev.c7_biggest - 0.2, { size: 56, weight: 900, hl: ['BIGGEST'], hlColor: C.acc });
  }, { in: { type: 'iris', color: C.ink, at: [960, 540], dur: 0.6 } });

  // S4 — the banana again: a tiny flash = the oldest fight in the universe; scoreboard → MATTER IS STILL WINNING
  P.shot(ev.c7_s4, (ctx, t) => {
    P.bgLine(ctx, t);
    P.banana(ctx, 520, 520, 1.1, t, { k: P.dk(t, ev.c7_s4 + 0.1, 0.5) });
    P.flash(ctx, 660, 420, t, ev.c7_flash, { r: 110, n: 8, seed: 21, dur: 1.2 });
    P.note(ctx, 'a tiny flash', 660, 420, 520, 200, t, ev.c7_flash + 0.1, { size: 48 });
    P.write(ctx, 'THE OLDEST FIGHT IN THE UNIVERSE', 1340, 220, t, ev.c7_oldest - 0.2, { size: 50, weight: 900 });
    // scoreboard
    const bk = P.dk(t, ev.c7_oldest, 0.6); if (bk > 0) { P.iRect(ctx, 960, 330, 760, 420, 20, C.navy, { a: bk, shade: 0.3, shadeColor: '#33498F' });
      G.text(ctx, 'MATTER', 1100, 430, { size: 44, fam: 'Inter', weight: 900, color: '#9DB4FF', align: 'left', boil: 0, alpha: bk }); G.text(ctx, 'ANTIMATTER', 1100, 610, { size: 44, fam: 'Inter', weight: 900, color: C.acc, align: 'left', boil: 0, alpha: bk });
      const v = Data.count(t, ev.c7_oldest, ev.c7_winning, 0, 1000000000, ease.outCubic); const m = Math.round(v) + (t > ev.c7_winning ? 1 : 0);
      G.text(ctx, Data.number(m), 1100, 510, { size: 62, fam: 'Bungee', weight: 400, color: C.pap, align: 'left', boil: 0, alpha: bk }); G.text(ctx, Data.number(Math.round(v)), 1100, 690, { size: 62, fam: 'Bungee', weight: 400, color: C.pap, align: 'left', boil: 0, alpha: bk });
      if (t > ev.c7_winning) P.ring(ctx, 1500, 490, t, ev.c7_winning, { r: 160, color: C.yel }); }
    P.rslam(ctx, 'MATTER IS STILL WINNING', 960, 920, t, ev.c7_winning, { size: 90 });
    Ch.elle(ctx, { x: 240, y: 1070, s: 0.5, t, gesture: t > ev.c7_winning ? 'cheer' : 'idle', mouth: P.talk(t), eyes: t > ev.c7_winning ? 'happy' : 'open', look: 1 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — END CARD
  P.shot(ev.c7_s5, (ctx, t) => {
    P.bgLine(ctx, t);
    const kb = P.pop(t, ev.sync_logo, 0.5); P.brandPlanet(ctx, 600, 210, 56 * kb, t, 1); if (kb > 0) P.rtext(ctx, 'WHYVERSE', 1090, 250, { size: 120, a: clamp(kb) });
    const like = P.pop(t, ev.c7_like, 0.45); P.at(ctx, 700, 470, like, -0.02, () => { const on = t > ev.c7_like + 0.3; P.iRect(ctx, -200, -70, 400, 140, 70, on ? C.acc : C.pap); P.art(ctx, [P.rrPts(-200, -70, 400, 140, 70)], 1, { color: on ? C.acc : C.ink, lw: 6 });
      P.fill(ctx, P.pPoly([[-130, 30], [-130, -10], [-100, -10], [-80, -50], [-64, -48], [-70, -10], [-30, -10], [-40, 30]]), on ? C.pap : C.ink); G.text(ctx, 'LIKE', 50, 24, { size: 66, fam: 'Inter', weight: 900, color: on ? C.pap : C.ink, align: 'center', boil: 0 }); });
    const sub = P.pop(t, ev.c7_sub, 0.45); P.at(ctx, 1240, 470, sub, 0.02, () => { const on = t > ev.c7_sub + 0.35; P.iRect(ctx, -270, -70, 540, 140, 70, on ? C.ink : C.acc);
      G.text(ctx, on ? 'SUBSCRIBED ✓' : 'SUBSCRIBE', 0, 24, { size: 62, fam: 'Inter', weight: 900, color: C.pap, align: 'center', boil: 0 }); });
    P.ring(ctx, 1240, 470, t, ev.c7_sub + 0.35, { r: 320, color: C.acc });
    P.tag(ctx, 'Instagram  @whyverse___', 640, 680, t, ev.c7_ig, 1e9, { size: 46, fill: C.pap, color: C.ink, dot: C.acc, border: C.ink });
    P.tag(ctx, 'TikTok  @Whyverse', 1300, 680, t, ev.c7_tt, 1e9, { size: 46, fill: C.pap, color: C.ink, dot: C.ink, border: C.ink });
    const sk = P.pop(t, ev.c7_send, 0.45); if (sk > 0) P.at(ctx, 960, 860, sk, -0.01, () => { const s = "Send this to the friend who always asks 'but why?'"; const tw = P.measure(ctx, s, 42, 'Inter', 800);
      P.rect(ctx, -tw / 2 - 110, -54, tw + 160, 108, 8, C.pap, { stroke: C.ink, lw: 5 }); const ex = -tw / 2 - 50; P.rect(ctx, ex - 30, -22, 60, 44, 4, C.pap, { stroke: C.acc, lw: 4 }); P.trace(ctx, [[ex - 30, -22], [ex, 4], [ex + 30, -22]], 1, C.acc, 4);
      G.text(ctx, s, 30, 15, { size: 42, fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0 }); });
    Ch.elle(ctx, { x: 200, y: 1070, s: 0.55, t, gesture: t > ev.c7_like ? 'cheer' : 'wave', mouth: P.talk(t), eyes: 'happy', look: 1 });
    Ch.posi(ctx, { x: 1720, y: 1070, s: 0.55, t, dir: -1, gesture: t > ev.c7_sub ? 'cheer' : 'wave', eyes: 'happy', look: -1 });
  }, { in: { type: 'iris', color: C.ink, at: [960, 540], dur: 0.8 } });
})();
