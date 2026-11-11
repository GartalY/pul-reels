// Chapter 5 — Saving the day: 1994 place cells fire as a rat explores · asleep, they fire again (replay) · into long-term storage · babies · synapses −18 % · 1924 · "sleep on it".
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const COLS = [C.coral, C.gold, C.mint, C.sky, C.lilac, C.pink];
  const TX = 560, TY = 620, RX = 400, RY = 250;
  const pos = (i) => { const an = (i * 60 - 90) * Math.PI / 180; return [TX + Math.cos(an) * RX, TY + Math.sin(an) * RY, an]; };
  const track = (ctx, a = 1) => { ctx.save(); ctx.globalAlpha *= a; P.brush(ctx, (c) => { c.beginPath(); c.ellipse(TX, TY, RX, RY, 0, 0, 7); }, P.dark ? '#46539E' : C.paper2, 110, 1); P.brush(ctx, (c) => { c.beginPath(); c.setLineDash([18, 22]); c.ellipse(TX, TY, RX, RY, 0, 0, 7); }, P.fg2(), 4, 0.6); ctx.setLineDash([]);
    for (let i = 0; i < 6; i++) { const [x, y] = pos(i); P.ell(ctx, x, y, 50, 42, COLS[i], { seed: i, fillA: 0.7 }); } ctx.restore(); };
  // the six cells + a raster of when each fired. fires: array of arrays of times; win [ta, tb] mapped onto the raster width
  const cells = (ctx, t, fires, win, title) => { const x0 = 1130, x1 = 1800;
    P.label(ctx, title, x0 - 10, 200, { size: 42, color: P.fg() });
    for (let i = 0; i < 6; i++) { const cx = x0 + 50 + i * 120, cy = 310; let act = 0; for (const ft of fires[i]) if (t >= ft) act = Math.max(act, Math.exp(-(t - ft) * 4)); P.glow(ctx, cx, cy, 110, COLS[i], act); P.ell(ctx, cx, cy, 40 + 8 * act, 40 + 8 * act, P.mix(P.dark ? '#5A66A8' : C.grey, COLS[i], 0.35 + 0.65 * act), { seed: i }); P.dot(ctx, cx, cy, 12, P.dk(COLS[i], 0.3), 0.7);
      const ry = 450 + i * 74; P.line(ctx, x0, ry, x1, ry, P.fg2(), 2, 0.35); G.text(ctx, 'cell ' + (i + 1), x0 - 14, ry + 12, { size: 34, fam: FT.hand, color: COLS[i], align: 'right', boil: 0 });
      for (const ft of fires[i]) if (t >= ft) for (let j = 0; j < 3; j++) { const x = x0 + (x1 - x0) * clamp((ft + j * 0.045 - win[0]) / (win[1] - win[0])); P.line(ctx, x, ry - 24, x, ry + 24, COLS[i], 6, 1); } }
    const xn = x0 + (x1 - x0) * clamp((t - win[0]) / (win[1] - win[0])); P.line(ctx, xn, 420, xn, 860, C.gold, 3, 0.6); };

  P.cardShot('c5', 5, 'Saving the day', (ctx, t) => {
    for (let i = 0; i < 6; i++) P.at(ctx, 420 + i * 230, 960 + Math.sin(t * 1.4 + i) * 16, 0.8, (i - 2.5) * 0.05, () => { P.rect(ctx, -60, -70, 120, 140, 10, C.cream, { edge: 0.3, a: 0.6 }); P.rect(ctx, -46, -56, 92, 80, 6, COLS[i], { seed: i, a: 0.5 }); });
  });

  // S1 — 1994: a rat explores; each place makes its own set of cells fire
  P.shot(ev.c5_s1, (ctx, t, s) => {
    P.paper(ctx, t, { tint: C.gold });
    P.calendar(ctx, 190, 190, 'YEAR', '1994', P.pop(t, ev.c5_1994, 0.4), C.gold, 0.75);
    track(ctx);
    const u = (t - ev.c5_placeT0) / (ev.c5_placeT1 - ev.c5_placeT0) * 6 - 0.5; const an = (u * 60 - 90) * Math.PI / 180; const rx = TX + Math.cos(an) * RX, ry = TY + Math.sin(an) * RY;
    ctx.save(); ctx.translate(rx, ry); ctx.rotate(Math.atan2(Math.cos(an) * RY, -Math.sin(an) * RX)); P.animal(ctx, 'rat', 0, Math.sin(t * 20) * 3, 62, { t }); ctx.restore();
    for (let i = 0; i < 6; i++) { const [x, y] = pos(i); P.ring(ctx, x, y, t, ev.c5_places[i], { r: 130, color: COLS[i] }); }
    cells(ctx, t, ev.c5_places.map((x) => [x]), [ev.c5_placeT0 - 0.3, ev.c5_placeT1 + 0.4], 'brain cells recorded while it explores');
    P.tag(ctx, 'each place → its own cells', 560, 1010, t, ev.c5_placeT0, 1e9, { size: 48, border: C.coral, fam: FT.title });
    P.label(ctx, 'Wilson & McNaughton, Science, 1994', 1800, 940, { align: 'right', size: 32, alpha: P.fin(t, ev.c5_1994, 0.4) });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — later, asleep: the same cells fire together again — the sleeping brain replays the day
  P.shot(ev.c5_s2, (ctx, t, s) => {
    P.night(ctx, t, { seed: 40, stars: 0.5 });
    track(ctx, 0.45);
    P.animal(ctx, 'rat', TX, TY + 10, 110, { t, sleep: true }); P.zzz(ctx, TX + 110, TY - 70, t, { color: C.cream, size: 50 });
    // the dreamed run: a ghost rat laps the track with each replay
    const ghost = (t0, step) => { const u = (t - t0) / step - 0.5; if (u < -0.6 || u > 6) return; const an = (u * 60 - 90) * Math.PI / 180; ctx.save(); ctx.globalAlpha *= 0.55; ctx.translate(TX + Math.cos(an) * RX, TY + Math.sin(an) * RY); ctx.rotate(Math.atan2(Math.cos(an) * RY, -Math.sin(an) * RX)); P.animal(ctx, 'rat', 0, 0, 56, { t, color: '#DCE4FF' }); ctx.restore(); };
    ghost(ev.c5_replay1[0], 0.16); ghost(ev.c5_replay2[0], 0.12);
    for (let i = 0; i < 6; i++) { const [x, y] = pos(i); P.ring(ctx, x, y, t, ev.c5_replay1[i], { r: 110, color: COLS[i], dur: 0.5 }); P.ring(ctx, x, y, t, ev.c5_replay2[i], { r: 110, color: COLS[i], dur: 0.5 }); }
    cells(ctx, t, ev.c5_replay1.map((x, i) => [x, ev.c5_replay2[i]]), [ev.c5_replay1[0] - 0.6, ev.c5_replay2[5] + 0.8], 'the same cells, while it sleeps');
    P.tag(ctx, 'same order, much faster', 1465, 930, t, ev.c5_again, 1e9, { size: 46, border: C.gold });
    P.stamp(ctx, 'REPLAY', 560, 190, t, ev.c5_replayW, { size: 130, color: C.gold, fg: C.navy, rot: -0.04 });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S3 — replay is thought to help move fresh memories into long-term storage
  const memo = (ctx, i, x, y, s, rot) => P.at(ctx, x, y, s, rot, () => { ctx.save(); ctx.globalAlpha *= 0.16; ctx.fillStyle = '#10143A'; P.pRR(-56, -62, 120, 140, 8)(ctx); ctx.fill(); ctx.restore(); P.rect(ctx, -60, -70, 120, 140, 8, C.cream, { edge: 0.3, fillA: 0.98 }); P.rect(ctx, -48, -58, 96, 84, 5, COLS[i % 6], { seed: i });
    if (i % 4 === 0) P.ell(ctx, 0, -16, 22, 22, C.gold, { edge: 0.3 }); else if (i % 4 === 1) { P.dot(ctx, -14, -22, 6); P.dot(ctx, 14, -22, 6); P.arc(ctx, 0, -14, 16, 0.3, 2.8, C.ink, 4); } else if (i % 4 === 2) P.shape(ctx, [[-30, 14], [0, -44], [30, 14]], C.cream, { poly: true, edge: 0.2 }); else G.text(ctx, '♪', 0, 4, { size: 60, fam: FT.hand, color: C.cream, align: 'center', boil: 0 });
    for (let j = 0; j < 2; j++) P.line(ctx, -40, 42 + j * 14, 40 - j * 26, 42 + j * 14, C.dim, 3, 0.6); });
  P.shot(ev.c5_s3, (ctx, t, s) => {
    P.paper(ctx, t, { tint: C.pink });
    ctx.save(); P.push(ctx, s.u, 960, 560, 0.03);
    P.brain(ctx, 900, 560, 470, { a: 0.5, folds: 0.4 });
    // the in-tray (today) and the shelf (long-term)
    P.rect(ctx, 480, 720, 330, 46, 10, C.wood, { seed: 3 }); P.label(ctx, "today's memories", 645, 830, { align: 'center', size: 42, color: C.ink });
    P.rect(ctx, 1010, 250, 620, 30, 8, C.wood, { seed: 4 }); P.rect(ctx, 1010, 460, 620, 30, 8, C.wood, { seed: 5 }); P.rect(ctx, 1000, 80, 24, 410, 6, P.dk(C.wood, 0.2), { seed: 6 }); P.rect(ctx, 1616, 80, 24, 410, 6, P.dk(C.wood, 0.2), { seed: 7 });
    P.label(ctx, 'long-term storage', 1320, 550, { align: 'center', size: 46, color: C.ink });
    for (let i = 0; i < 4; i++) { const u = P.eio((t - ev.c5_cards[i]) / 0.75); const x0 = 520 + i * 84, y0 = 660, x1 = 1100 + (i % 2) * 300 + Math.floor(i / 2) * 110, y1 = i < 2 ? 178 : 388;
      const x = lerp(x0, x1, u), y = lerp(y0, y1, u) - Math.sin(u * Math.PI) * 220; memo(ctx, i, x, y, lerp(0.9, 1, u), lerp((i - 1.5) * 0.12, 0, u) + Math.sin(u * Math.PI) * 0.5); if (u >= 1) P.ring(ctx, x1, y1, t, ev.c5_cards[i] + 0.75, { r: 110, color: COLS[i], dur: 0.5 }); }
    ctx.restore();
    if (t > ev.c5_move) P.arcArrow(ctx, 900, 560, 330, Math.PI * 0.95, Math.PI * (0.95 + 0.75 * P.fin(t, ev.c5_move, 0.6)), { ry: 300, color: C.coral, lw: 9 });
    P.stamp(ctx, 'SAVED', 1320, 660, t, ev.c5_storage, { size: 100, color: C.green, rot: -0.04 });
    P.tag(ctx, '(the leading idea — still being studied)', 560, 150, t, ev.c5_move, 1e9, { size: 40, border: C.dim });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3b — newborn babies: learning everything at once, asleep 14–17 hours a day
  P.shot(ev.c5_s3b, (ctx, t, s) => {
    P.night(ctx, t, { seed: 44, stars: 0.4, top: '#2A2F6B', bot: '#4A4F9A' });
    ctx.save(); P.push(ctx, s.u, 620, 700, 0.03);
    // the mobile
    P.line(ctx, 620, -10, 620, 150, C.cream, 4, 0.7); P.line(ctx, 440, 150, 800, 150, C.cream, 5, 0.8);
    [-180, -60, 60, 180].forEach((dx, i) => { const sw = Math.sin(t * 1.3 + i) * 14; P.line(ctx, 620 + dx, 150, 620 + dx + sw, 240 + (i % 2) * 40, C.cream, 3, 0.7); if (i % 2) P.at(ctx, 620 + dx + sw, 270 + (i % 2) * 40, 1, t * 0.5, () => G.star(ctx, 0, 0, 30, { fill: C.gold })); else P.at(ctx, 620 + dx + sw, 270, 1, 0, () => P.moon(ctx, 0, 0, 28, { glow: 0.3 })); });
    // the crib
    P.rect(ctx, 300, 760, 640, 60, 14, C.cream, { seed: 3, edge: 0.3 });
    const br = Math.sin(t * 1.8) * 5; P.wash(ctx, (c) => { c.beginPath(); c.moveTo(500, 762); c.bezierCurveTo(540, 660 - br, 760, 650 - br, 900, 762); c.closePath(); }, C.sky, { bb: [700, 720, 200], seed: 4 });
    P.ell(ctx, 440, 700, 62, 60, C.skin, { seed: 5 }); P.brush(ctx, (c) => { c.beginPath(); c.moveTo(440, 642); c.quadraticCurveTo(462, 612, 446, 600); }, '#6B4A2E', 7, 1);
    P.arc(ctx, 418, 700, 10, 0.3, 2.8, C.ink, 4); P.arc(ctx, 462, 700, 10, 0.3, 2.8, C.ink, 4); P.dot(ctx, 404, 722, 10, C.pink, 0.6); P.dot(ctx, 476, 722, 10, C.pink, 0.6); P.dot(ctx, 440, 728, 6, '#7A3B3B');
    for (let i = 0; i < 9; i++) P.line(ctx, 290 + i * 82, 600, 290 + i * 82, 960, C.wood, 16, 1); P.rect(ctx, 270, 580, 700, 34, 12, C.wood, { seed: 6 }); P.rect(ctx, 270, 940, 700, 40, 12, C.wood, { seed: 7 });
    P.zzz(ctx, 520, 600, t, { color: C.cream, size: 60 });
    if (t > ev.c5_learn) ['A', '1', '♪', '★', '?'].forEach((ch, i) => { const k = P.pop(t, ev.c5_learn + i * 0.12, 0.3); const an = -2.6 + i * 0.5 + Math.sin(t + i) * 0.1; if (k > 0) G.text(ctx, ch, 440 + Math.cos(an) * 190 * k, 700 + Math.sin(an) * 170 * k, { size: 62, fam: FT.title, weight: 700, color: COLS[i], align: 'center', boil: 0, alpha: k }); });
    ctx.restore();
    P.tag(ctx, 'newborn babies', 1400, 180, t, ev.c5_baby, 1e9, { size: 60, border: C.pink, fam: FT.title });
    // a 24-hour dial with the sleeping share painted in
    const kd = P.pop(t, ev.c5_1417 - 0.5, 0.45); if (kd > 0) { const k = P.eio((t - ev.c5_1417 + 0.3) / 0.9); P.at(ctx, 1400, 560, kd, 0, () => { P.ell(ctx, 0, 0, 240, 240, C.cream, { seed: 8, fillA: 0.97 });
      P.wash(ctx, (c) => { c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 226, -Math.PI / 2, -Math.PI / 2 + 6.283 * (15.5 / 24) * k); c.closePath(); }, C.night2, { bb: [0, 60, 240], seed: 9 });
      for (let i = 0; i < 24; i++) { const an = i / 24 * 6.283 - 1.5708; P.line(ctx, Math.cos(an) * 200, Math.sin(an) * 200, Math.cos(an) * 222, Math.sin(an) * 222, C.dim, i % 6 ? 3 : 6, 0.8); }
      G.text(ctx, '24 h', 0, -86, { size: 44, fam: FT.hand, color: C.dim, align: 'center', boil: 0 }); }); }
    P.stamp(ctx, '14–17 HOURS A DAY', 1400, 900, t, ev.c5_1417, { size: 78, color: C.coral, rot: -0.03 });
    P.label(ctx, 'newborns, 0–3 months — National Sleep Foundation', 1400, 1010, { align: 'center', size: 32, alpha: P.fin(t, ev.c5_1417, 0.4) });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S4 — the second idea: connections grow all day; a few hours of sleep shrink them ~18 % and turn down the noise
  P.shot(ev.c5_s4, (ctx, t, s) => {
    const grow = P.eio((t - ev.c5_bigger) / (ev.c5_forever - ev.c5_bigger)), sh = P.eio((t - ev.c5_shrank) / 0.9);
    P.paper(ctx, t, { tint: C.gold }); P.night(ctx, t, { a: sh * 0.92, seed: 46, stars: 0.6 }); P.dark = sh > 0.5;
    const scale = lerp(1, 1.9, grow) * lerp(1, 0.82, sh); const noise = clamp(0.25 + 0.7 * grow - 0.6 * P.eio((t - ev.c5_noise + 0.4) / 0.8));
    P.ell(ctx, 300, 560, 190, 170, C.brain, { seed: 3 }); P.ell(ctx, 300, 560, 60, 54, P.dk(C.brain, 0.25), { seed: 4 }); P.ell(ctx, 1620, 560, 190, 170, C.brain, { seed: 5 }); P.ell(ctx, 1620, 560, 60, 54, P.dk(C.brain, 0.25), { seed: 6 });
    for (let i = 0; i < 5; i++) { const y = 270 + i * 118, jit = Math.sin(t * 30 + i * 2) * 5 * noise; const xm = 960 + (i % 2 ? 40 : -40);
      P.curveLine(ctx, [[450, 520 + (i - 2) * 30], [700, y + jit], [xm - 36, y + jit]], C.brain, 18, 1); P.curveLine(ctx, [[1470, 520 + (i - 2) * 30], [1220, y - jit], [xm + 36, y - jit]], C.brain, 18, 1);
      const r = 24 * scale * (i === 2 ? 1.15 : 1); P.ell(ctx, xm - 26 - r * 0.4, y + jit, r, r * 0.9, P.dk(C.brain, 0.12), { seed: 10 + i }); P.ell(ctx, xm + 26 + r * 0.4, y - jit, r, r * 0.9, P.dk(C.brain, 0.12), { seed: 20 + i });
      if (noise > 0.4) for (let j = 0; j < 3; j++) P.dot(ctx, xm + (U.hash(i, j, Math.floor(t * 12)) - 0.5) * 30, y + (U.hash(j, i, Math.floor(t * 12)) - 0.5) * 50, 5, C.gold, noise); }
    const ks = P.pop(t, ev.c5_second, 0.4) * P.fout(t, ev.c5_shrank + 0.3, 0.3); if (ks > 0) P.sun(ctx, 960, 150, 70 * ks, t);
    const km = P.pop(t, ev.c5_shrank, 0.4); if (km > 0) P.at(ctx, 960, 150, km, 0, () => P.moon(ctx, 0, 0, 80));
    P.tag(ctx, 'learning all day: bigger, stronger connections', 960, 970, t, ev.c5_bigger - 0.4, ev.c5_shrank, { size: 46, border: C.coral });
    P.stamp(ctx, "CAN'T GO ON FOREVER", 960, 560, t, ev.c5_forever, { size: 74, color: C.red, rot: -0.04, t1: ev.c5_shrank });
    P.counter(ctx, { x: 960, y: 950, from: 0, to: 18, t, t0: ev.c5_shrank, t1: ev.c5_18 + 0.2, size: 130, prefix: '−', suffix: '%', sub: 'smaller after a few hours of sleep (mice)', subSize: 34, color: C.night2 });
    // noise meter
    P.hbar(ctx, { x: 1380, y: 150, w: 400, h: 40, frac: noise, t, t0: ev.c5_bigger, d: 0.1, color: P.mix(C.gold, C.red, noise), label: 'noise', seed: 3 });
    P.label(ctx, 'de Vivo et al., Science, 2017', 300, 1040, { align: 'center', size: 32, alpha: P.fin(t, ev.c5_18, 0.4) });
  }, { in: { type: 'wipe', dir: 'left', dur: 0.5 } });

  // S5 — measured since 1924: people remember more after sleeping than after the same hours awake
  P.shot(ev.c5_s5, (ctx, t, s) => {
    P.paper(ctx, t, { tint: C.sky });
    P.calendar(ctx, 960, 190, 'SINCE', '1924', P.pop(t, ev.c5_1924, 0.4), C.sky, 0.85);
    const SY = ['ZUP', 'KEB', 'MIF', 'DAX', 'LOJ', 'VEP', 'TUC', 'RIN'];
    const col = (x, title, keep, t0, colr, icon) => { P.label(ctx, title, x, 430, { align: 'center', size: 50, color: C.ink }); icon();
      SY.forEach((sy, i) => { const k = P.pop(t, ev.c5_s5 + 0.5 + i * 0.06, 0.3); if (k <= 0) return; const gone = !keep.includes(i) ? P.eio((t - t0 - i * 0.05) / 0.6) : 0; const cx = x - 165 + (i % 4) * 110, cy = 540 + Math.floor(i / 4) * 110 + gone * 260;
        ctx.save(); ctx.globalAlpha *= 1 - gone; P.at(ctx, cx, cy, k, gone * (i % 2 ? 0.6 : -0.6), () => { P.rect(ctx, -48, -40, 96, 80, 10, keep.includes(i) && t > t0 ? colr : C.cream, { seed: i, edge: 0.4 }); G.text(ctx, sy, 0, 14, { size: 38, fam: FT.hand, color: C.ink, align: 'center', boil: 0 }); }); ctx.restore(); }); };
    col(520, 'after sleeping', [0, 1, 2, 4, 5, 7], ev.c5_remember, C.mint, () => { P.at(ctx, 520, 330, 0.36, 0, () => P.bed(ctx, 0, 100, 1, { t })); });
    col(1400, 'after the same hours awake', [1, 6], ev.c5_awakeBar, C.gold, () => P.sun(ctx, 1400, 310, 40, t));
    P.stamp(ctx, 'MORE REMEMBERED', 520, 860, t, ev.c5_remember + 0.4, { size: 66, color: C.green, rot: -0.03 });
    P.stamp(ctx, 'MORE FORGOTTEN', 1400, 860, t, ev.c5_awakeBar + 0.5, { size: 66, color: C.coral, rot: 0.03 });
    P.label(ctx, 'Jenkins & Dallenbach, 1924 — nonsense syllables; illustration, not their exact scores', 960, 1030, { align: 'center', size: 32, alpha: P.fin(t, ev.c5_1924, 0.4) });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — "sleep on it" is real advice: the brain does its filing at night
  P.shot(ev.c5_s6, (ctx, t, s) => {
    P.night(ctx, t, { seed: 48 }); P.moon(ctx, 300, 200, 90);
    Ch.nod(ctx, { x: 620, y: 980, s: 1.7, t, gesture: 'hug', prop: 'pillow', eyes: t > ev.c5_filing ? 'closed' : 'happy', mouth: Ch.nodMouth(t), look: 0.4 });
    if (t > ev.c5_filing) P.zzz(ctx, 760, 560, t, { color: C.cream, size: 60 });
    P.stamp(ctx, '“SLEEP ON IT”', 1260, 220, t, ev.c5_sleeponit, { size: 120, color: C.gold, fg: C.navy, rot: -0.03 });
    // the filing cabinet
    P.rect(ctx, 1150, 400, 420, 600, 24, '#5A66A8', { seed: 3 });
    for (let i = 0; i < 3; i++) { const u = t < ev.c5_filing ? 1 : 1 - P.eio((t - ev.c5_drawers[i]) / 0.22); const y = 430 + i * 185, ox = 110 * u;
      if (u > 0.05) for (let j = 0; j < 4; j++) P.rect(ctx, 1200 + j * 80 + ox, y - 30 * u, 60, 60, 6, COLS[(i * 2 + j) % 6], { seed: i * 4 + j });
      P.rect(ctx, 1180 + ox, y, 360, 160, 14, '#7C88C8', { seed: 10 + i }); P.rect(ctx, 1310 + ox, y + 60, 100, 28, 12, C.gold, { seed: 20 + i }); }
    P.tag(ctx, 'your brain does its filing at night', 1360, 1040, t, ev.c5_filing, 1e9, { size: 44, border: C.gold });
  }, { in: { type: 'fade', dur: 0.5 } });
})();
