// Payoff + end card — the question again · not a patch: the warm half of a machine spanning almost halfway round the planet; the wind lets
// go, the warm water rolls east, the storms follow, the sky's winds bend (the three promises ticked) · then: fishermen and empty nets, now:
// satellites, buoys, scientists, every day · Christmas: the child is back, bigger than ever measured · CTA + sends line.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  // S1 — the question again (callback to the cold open)
  P.shot(ev.c7_s1, (ctx, t) => {
    P.duskSea(ctx, t, { sky: C.dusk }); P.boat(ctx, 700, 720, 1.0, t, { people: 2 }); P.heat(ctx, 960, 900, 900, 160, t, { a: 0.7 });
    Ch.pico(ctx, { x: 1380, y: 1000, s: 1.0, t, dir: -1, gesture: 'think', mouth: P.talk(t), look: -1 });
    P.bubble(ctx, 'SO… HOW CAN ONE PATCH OF OCEAN\nCONTROL THE WHOLE WORLD\'S WEATHER?', 880, 240, 1250, 620, t, ev.c7_q, { size: 54 });
  }, { in: { type: 'iris', color: C.yel, at: [960, 540], dur: 0.8 } });

  // S2 — the whole machine: not a patch but the warm half of a machine ≈ halfway round the planet; wind lets go → water rolls east → storms follow → winds bend
  P.shot(ev.c7_s2, (ctx, t) => {
    const roll = P.eio((t - ev.c7_lets) / Math.max(1, ev.c7_storms - ev.c7_lets + 0.8));
    P.section(ctx, t, roll, { wind: lerp(1, -0.3, P.eio((t - ev.c7_lets) / 0.8)), labels: 0, cloudX: lerp(470, 1000, P.eio((t - ev.c7_storms + 0.3) / 1.0)) });
    const bk = P.fin(t, ev.c7_bend - 0.2, 0.4); if (bk > 0) { const pts = []; for (let x = 200; x <= 1720; x += 20) pts.push([x, 120 + Math.sin(x * 0.006 + t * 0.8) * lerp(10, 50, P.eio((t - ev.c7_bend) / 1.0))]); ctx.save(); ctx.globalAlpha *= bk; P.trace(ctx, pts, 1, C.ink, 22); P.trace(ctx, pts, 1, C.yel, 13); ctx.restore(); }
    P.cstamp(ctx, 'NOT A PATCH…', 560, 140, t, ev.c7_patch, { size: 60, color: C.blue, t1: ev.c7_spans });
    P.cstamp(ctx, '…HALF A MACHINE', 1240, 140, t, ev.c7_half, { size: 60, color: C.red, t1: ev.c7_spans });
    P.dimLine(ctx, P.SEC.X0, 300, P.SEC.X1, 300, 'ALMOST HALFWAY AROUND THE PLANET', P.oc((t - ev.c7_spans) / 0.8), { size: 36, a: 1 - P.fin(t, ev.c7_lets + 0.3, 0.4) });
    // the three promises, ticked
    [[ev.c7_rolls, 'WARM WATER ROLLS EAST'], [ev.c7_storms, 'THE RAIN FOLLOWS IT'], [ev.c7_bend, 'THE SKY\'S WINDS BEND']].forEach(([t0, lab], i) => { const k = P.pop(t, t0, 0.35); if (k <= 0) return; P.at(ctx, 420 + i * 560, 930, k, 0, () => {
      const w = P.measure(ctx, lab, 36, 'Bangers', 400) + 110; P.iR(ctx, -w / 2, -40, w, 80, 6, C.cream, { lw: 5, shadow: 1 }); P.iC(ctx, -w / 2 + 40, 0, 24, C.green, { lw: 4 }); P.trace(ctx, [[-w / 2 + 28, 0], [-w / 2 + 38, 12], [-w / 2 + 54, -12]], 1, C.cream, 6); G.text(ctx, lab, 26, 13, { size: 36, fam: 'Bangers', color: C.ink, align: 'center', boil: 0 }); }); });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S3 — then: fishermen noticed it by their empty nets · now: satellites, buoys and scientists watch it every day
  P.shot(ev.c7_s3, (ctx, t) => {
    P.bgPaper(ctx, t, { rays: 0.2, rayCol: C.cyan, cy: 540 });
    P.panel(ctx, 80, 170, 820, 680, t, ev.c7_s3 + 0.1, (c) => { c.translate(-500, -260); P.duskSea(c, t, { horizon: 560 }); P.boat(c, 900, 720, 1.0, t, { people: 2, net: P.eio((t - ev.c7_nets + 0.3) / 1), catch_: 0 }); c.translate(500, 260);
      c.fillStyle = 'rgba(160,110,40,0.25)'; c.fillRect(0, 0, 820, 680); G.text(c, 'THEN: EMPTY NETS', 410, 650, { size: 50, fam: 'Bangers', color: C.cream, stroke: C.ink, strokeW: 8, align: 'center', boil: 0 }); }, { from: 'left' });
    P.cstamp(ctx, 'MORE THAN A CENTURY AGO', 490, 130, t, ev.c7_cent, { size: 44, color: C.navy });
    P.panel(ctx, 1020, 170, 820, 680, t, ev.c7_today - 0.1, (c) => { c.fillStyle = C.night; c.fillRect(0, 0, 820, 680); P.stars && 0;
      for (let i = 0; i < 40; i++) P.circ(c, U.hash(i, 3) * 820, U.hash(i, 4) * 300, 2, C.white, { a: 0.5 + 0.5 * Math.sin(t * 2 + i) });
      P.satellite(c, 220 + Math.sin(t * 0.3) * 40, 140, 0.8, t, { a: P.pop(t, ev.c7_sat, 0.35) });
      P.ink(c, (cc) => { cc.beginPath(); cc.rect(0, 420, 820, 260); }, C.sea, { lw: 0, dots: C.blue, dotA: 0.35 }); P.buoy(c, 420, 430, 0.9, t, { a: P.pop(t, ev.c7_buoy, 0.35) });
      for (let i = 0; i < 2; i++) { const k = P.pop(t, ev.c7_sci + i * 0.15, 0.35); if (k <= 0) continue; P.at(c, 620 + i * 110, 640, k, 0, () => { P.iR(c, -60, -170, 110, 80, 6, C.cyan, { lw: 4 }); P.sil(c, 0, 0, 0.3, t, {}); }); }
      G.text(c, 'NOW: WATCHED EVERY DAY', 410, 650, { size: 50, fam: 'Bangers', color: C.yel, stroke: C.ink, strokeW: 8, align: 'center', boil: 0 }); }, { from: 'right' });
    P.cstamp(ctx, 'EVERY SINGLE DAY', 1430, 930, t, ev.c7_every, { size: 54, color: C.red });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — this Christmas, right on time, the child is back — bigger than ever measured
  P.shot(ev.c7_s4, (ctx, t) => {
    ctx.save(); P.push(ctx, (t - ev.c7_s4) / 6, 960, 500, 0.03);
    P.bgFlat(ctx, t, C.night, { dotCol: '#33407A', dir: 'down', a: 0.6, dark: true });
    for (let i = 0; i < 70; i++) P.circ(ctx, U.hash(i, 13) * W, U.hash(i, 14) * 520, 1.5 + U.hash(i, 15) * 2, C.white, { a: 0.4 + 0.5 * Math.sin(t * 1.5 + i) });
    const sk = P.pop(t, ev.c7_xmas, 0.6); if (sk > 0) { P.glow(ctx, 960, 190, 360 * sk, C.yel, 1); P.ink(ctx, P.starPath(960, 190, 70 * sk, 5, 0.45, 7), C.yel, { lw: 6 }); }
    P.ink(ctx, (c) => { c.beginPath(); c.rect(-600, 600, W + 1200, 700); }, '#1E4E86', { lw: 0, dots: C.blue, dotA: 0.4 }); P.line(ctx, -100, 600, W + 100, 600, C.ink, 6);
    const hk = P.oc((t - ev.c7_back + 0.3) / 1.2); P.heat(ctx, 960, 760, 200 + 700 * hk, 60 + 120 * hk, t, { a: 0.4 + 0.6 * hk });
    P.boat(ctx, 560, 680, 0.8, t, { people: 2, col: C.red });
    Ch.pico(ctx, { x: 1460, y: 820, s: 0.85, t, dir: -1, gesture: t > ev.c7_bigger ? 'pointUp' : 'idle', mouth: P.talk(t), look: -1, eyes: t > ev.c7_bigger ? 'wide' : 'open' });
    P.iR(ctx, 1400, 820, 120, 300, 6, C.land2, { lw: 5 });
    ctx.restore();
    P.slam(ctx, 'THE CHILD IS BACK', 960, 420, t, ev.c7_back, { size: 120, color: C.yel });
    P.cstamp(ctx, 'BIGGER THAN EVER MEASURED', 960, 990, t, ev.c7_bigger, { size: 60, color: C.red });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S5 — end card: Whyverse, LIKE + SUBSCRIBE, Instagram + TikTok, the sends line
  P.shot(ev.c7_s5, (ctx, t) => {
    P.bgPaper(ctx, t, { rays: 0.5, rayCol: C.yel, cy: 470, spin: 0.04 });
    const kb = P.pop(t, ev.sync_logo, 0.5); P.brandPlanet(ctx, 640, 210, 60 * kb, t, 1); P.ctext(ctx, 'WHYVERSE', 1060, 250, { size: 120, color: C.yel, stroke: C.ink, strokeW: 14, shadow: 1, a: clamp(kb) });
    const like = P.pop(t, ev.c7_like, 0.45); P.at(ctx, 700, 470, like, -0.02, () => { const on = t > ev.c7_like + 0.3; P.iR(ctx, -200, -70, 400, 140, 70, on ? C.red : C.cream, { lw: 6, shadow: 1 });
      P.fill(ctx, P.pPoly([[-130, 30], [-130, -10], [-100, -10], [-80, -50], [-64, -48], [-70, -10], [-30, -10], [-40, 30]]), on ? C.cream : C.ink); P.ctext(ctx, 'LIKE', 40, 24, { size: 66, color: on ? C.cream : C.ink }); });
    const sub = P.pop(t, ev.c7_sub, 0.45); P.at(ctx, 1240, 470, sub, 0.02, () => { const on = t > ev.c7_sub + 0.35; P.iR(ctx, -270, -70, 540, 140, 70, on ? C.ink : C.red, { lw: 6, shadow: 1 });
      P.ctext(ctx, on ? 'SUBSCRIBED ✓' : 'SUBSCRIBE', 0, 24, { size: 64, color: C.cream }); });
    P.ring(ctx, 1240, 470, t, ev.c7_sub + 0.35, { r: 320, color: C.red });
    P.tag(ctx, 'Instagram  @whyverse___', 640, 680, t, ev.c7_ig, 1e9, { size: 46, fill: C.cream, color: C.ink, dot: C.pink, border: C.ink });
    P.tag(ctx, 'TikTok  @Whyverse', 1300, 680, t, ev.c7_tt, 1e9, { size: 46, fill: C.cream, color: C.ink, dot: C.cyan, border: C.ink });
    const sk = P.pop(t, ev.c7_send, 0.45); if (sk > 0) P.at(ctx, 960, 860, sk, -0.01, () => { const s = 'Send this to the friend who says it\'s too warm for November'; const tw = P.measure(ctx, s, 42, 'Inter', 800);
      P.iR(ctx, -tw / 2 - 110, -54, tw + 160, 108, 8, C.yel, { lw: 6, shadow: 1 }); const ex = -tw / 2 - 50; P.iR(ctx, ex - 30, -22, 60, 44, 4, C.white, { lw: 4 }); P.trace(ctx, [[ex - 30, -22], [ex, 4], [ex + 30, -22]], 1, C.ink, 4);
      G.text(ctx, s, 30, 15, { size: 42, fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0 }); });
    const fly = P.eio((t - ev.c7_bye) / 1.6);
    Ch.pico(ctx, { x: 1720 + fly * 400, y: 1060 - fly * 200, s: 0.6, t, dir: fly > 0 ? 1 : -1, gesture: fly > 0 ? 'fly' : t > ev.c7_like ? 'cheer' : 'wave', mouth: P.talk(t), eyes: 'happy', hop: (t > ev.c7_like && fly <= 0 ? ((t - ev.c7_like) * 1.2) % 1 : 0) });
  }, { in: { type: 'iris', color: C.yel, at: [960, 540], dur: 0.8 } });
})();
