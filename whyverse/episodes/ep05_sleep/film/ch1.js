// Chapter 1 — The boy who stayed awake: San Diego 1963 · friends + Dr Dement + pinball · symptoms · 264 hours · 14 h 46 min of sleep · the rat experiments · record closed.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const RANDY = { shirt: C.coral, hairStyle: 'crew', hair: '#6B4A2E', pants: '#3C4A7A' };
  const card = (ctx, x, y, w, h, col, seed, fn, k = 1, rot = 0) => P.at(ctx, x, y, k, rot, () => { ctx.save(); ctx.globalAlpha *= 0.16; ctx.fillStyle = '#10143A'; P.pRR(-w / 2 + 5, -h / 2 + 8, w, h, 22)(ctx); ctx.fill(); ctx.restore();
    P.wash(ctx, P.pRR(-w / 2, -h / 2, w, h, 22), C.cream, { fillA: 0.97, edge: 0 }); ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 6; P.pRR(-w / 2, -h / 2, w, h, 22)(ctx); ctx.stroke(); ctx.restore(); fn(); });
  P.card = card;
  const calendar = (ctx, x, y, top, big, k, col = C.coral, s = 1) => P.at(ctx, x, y, k * s, -0.04, () => { ctx.save(); ctx.globalAlpha *= 0.16; ctx.fillStyle = '#10143A'; P.pRR(-125, -112, 260, 250, 18)(ctx); ctx.fill(); ctx.restore();
    P.wash(ctx, P.pRR(-130, -120, 260, 250, 18), C.cream, { fillA: 0.98, edge: 0.25 }); P.wash(ctx, P.pRR(-130, -120, 260, 70, 18), col, { seed: 3 });
    G.text(ctx, top, 0, -72, { size: 44, fam: FT.hand, color: C.cream, align: 'center', boil: 0 }); G.text(ctx, big, 0, 80, { size: big.length > 3 ? 96 : 130, fam: FT.title, weight: 700, color: C.ink, align: 'center', boil: 0 }); });
  P.calendar = calendar;

  P.cardShot('c1', 1, 'The boy who stayed awake', (ctx, t) => {
    for (let i = 0; i < 7; i++) P.clock(ctx, 200 + i * 260, 950 + (i % 2) * 40, 46, 3 + i * 1.7 + t * 0.4, (t * 24 + i * 9) % 60, { a: 0.35, rim: i % 2 ? C.gold : C.sky, seed: i });
  });

  // S1 — the map: San Diego, December 1963; Randy Gardner, 17; a science-fair project
  P.shot(ev.c1_s1, (ctx, t, s) => {
    P.paper(ctx, t);
    ctx.save(); P.push(ctx, s.u, 420, 700, 0.03);
    const map = Data.map({ region: [-128, 23, -64, 51], x: 40, y: 150, w: 1080, h: 820 });
    Data.drawMap(ctx, map, { land: '#E3D2A6', stroke: '#8C7B5A', lw: 2.5, t, t0: ev.c1_s1 + 0.1, dur: 0.9, highlight: { 'United States of America': '#EBC98A', 'United States': '#EBC98A' }, clip: true });
    const [px, py] = map.proj(-117.16, 32.72); const kp = P.pop(t, ev.c1_sd, 0.35);
    if (kp > 0) { P.ring(ctx, px, py, t, ev.c1_sd, { r: 150, color: C.coral }); P.at(ctx, px, py, kp, 0, () => { P.wash(ctx, (c) => { c.beginPath(); c.moveTo(0, 0); c.bezierCurveTo(-40, -50, -30, -92, 0, -92); c.bezierCurveTo(30, -92, 40, -50, 0, 0); c.closePath(); }, C.coral, { seed: 2 }); P.dot(ctx, 0, -62, 11, C.cream); }); }
    P.tag(ctx, 'San Diego, California', px + 40, py + 50, t, ev.c1_sd + 0.15, 1e9, { size: 44, border: C.coral, align: 'left' });
    ctx.restore();
    calendar(ctx, 1330, 280, 'DECEMBER', '1963', P.pop(t, ev.c1_dec, 0.4));
    const kr = P.pop(t, ev.c1_17, 0.4); if (kr > 0) P.human(ctx, Object.assign({ x: 1340, y: 1010, s: 1.35 * kr, t, eyes: 'open', mouth: P.talk(t) > 0.5 ? 'smile' : 'smile', armR: t > ev.c1_fair ? [100, -140] : null }, RANDY));
    P.tag(ctx, 'Randy Gardner, 17', 1340, 500, t, ev.c1_randy, 1e9, { size: 50, border: C.coral, fam: FT.title });
    const kf = P.pop(t, ev.c1_fair, 0.4); if (kf > 0) P.at(ctx, 1680, 780, kf, 0.03, () => { P.shape(ctx, [[-150, -190], [150, -190], [190, 200], [-190, 200]], C.sky, { poly: true, seed: 5 }); P.rect(ctx, -120, -160, 240, 90, 10, C.cream, { edge: 0.2 });
      G.text(ctx, 'SCIENCE FAIR', 0, -100, { size: 40, fam: FT.title, weight: 700, color: C.ink, align: 'center', boil: 0 }); G.text(ctx, 'How long can', 0, -10, { size: 40, fam: FT.hand, color: C.cream, align: 'center', boil: 0 }); G.text(ctx, 'I stay awake?', 0, 40, { size: 40, fam: FT.hand, color: C.cream, align: 'center', boil: 0 });
      P.clock(ctx, 0, 125, 44, t * 2, (t * 40) % 60, { rim: C.gold }); });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — two friends keep him awake and run the tests; Dr Dement arrives; day ten: pinball
  P.shot(ev.c1_s2, (ctx, t, s) => {
    P.paper(ctx, t, { tint: C.gold }); P.rect(ctx, -50, 930, W + 100, 220, 0, C.paper2, { seed: 3, edge: 0.25 });
    ctx.save(); P.push(ctx, s.u, 900, 700, 0.03);
    const pin = P.pop(t, ev.c1_pinball, 0.4);
    // pinball machine
    if (pin > 0) P.at(ctx, 320, 960, pin, 0, () => { for (const sx of [-110, 110]) P.rect(ctx, sx - 12, -150, 24, 150, 6, '#4A4E7A', { seed: sx });
      P.shape(ctx, [[-150, -150], [150, -150], [150, -330], [-150, -250]], C.coral, { poly: true, seed: 7 }); P.rect(ctx, -140, -560, 280, 250, 18, C.navy, { seed: 8 });
      for (let i = 0; i < 4; i++) { const on = t > ev.c1_pins[i] && ((t - ev.c1_pins[i]) % 0.44) < 0.26; P.glow(ctx, -84 + i * 56, -500, 50, C.gold, on ? 0.9 : 0); P.ell(ctx, -84 + i * 56, -500, 18, 18, on ? C.gold : '#5A5F8E', { seed: 20 + i, edge: 0.3 }); }
      G.text(ctx, 'PINBALL', 0, -400, { size: 52, fam: FT.title, weight: 700, color: C.gold, align: 'center', boil: 0 }); const sc = Math.round(Data.count(t, ev.c1_pinball, ev.c1_pinball + 1.4, 0, 9990, ease.outCubic) / 10) * 10; G.text(ctx, String(sc).padStart(4, '0'), 0, -340, { size: 44, fam: FT.hand, color: C.cream, align: 'center', boil: 0 });
      const bt = (t * 1.4) % 1; P.dot(ctx, -100 + 200 * Math.abs(Math.sin(t * 3.1)), -200 - 60 * Math.abs(Math.sin(t * 4.3)), 9, C.cream); });
    const kf = P.pop(t, ev.c1_friends, 0.4);
    if (kf > 0) { P.human(ctx, { x: 600 + (pin > 0 ? 60 : 0), y: 1010, s: 1.25 * kf, t, shirt: C.mint, hair: '#2E2A33', prop: 'clipboard', armR: [72, -64], look: 0.6, eyes: 'open', seed: 8 });
      P.human(ctx, { x: 1230, y: 1010, s: 1.25 * kf, t, shirt: C.gold, hair: '#8A5A2E', hairStyle: 'curly', flip: true, prop: 'cup', armR: [76, -70], look: 0.6, seed: 11 }); }
    P.rect(ctx, 850, 800, 160, 26, 8, C.wood, { seed: 4 }); for (const sx of [870, 990]) P.line(ctx, sx, 824, sx, 1005, C.wood, 12, 1);
    const pb = t > ev.c1_pinball;
    P.human(ctx, Object.assign({ x: 930, y: 800, s: 1.3, t, pose: 'sit', eyes: pb ? 'happy' : 'tired', mouth: pb ? 'smile' : 'flat', sway: 0.04, armR: pb ? [84, -190] : null, armL: pb ? [-84, -190] : null }, RANDY));
    const ud = P.oc((t - ev.c1_dement) / 1.1); if (t > ev.c1_dement - 0.1) P.human(ctx, { x: lerp(2150, 1570, ud), y: 1010, s: 1.35, t, coat: true, glasses: true, shirt: C.sky, hair: '#3B2E2A', flip: true, prop: 'clipboard', armR: [70, -60], look: 0.5, mouth: pb ? 'o' : 'smile', eyes: pb ? 'wide' : 'open', seed: 14 });
    ctx.restore();
    P.tag(ctx, 'two friends: keep him awake, run the tests', 930, 180, t, ev.c1_tests - 0.5, ev.c1_day10 - 0.2, { size: 46, border: C.mint });
    P.tag(ctx, 'Dr William Dement · Stanford', 1500, 330, t, ev.c1_dement + 0.5, 1e9, { size: 44, border: C.sky });
    calendar(ctx, 250, 230, 'DAY', '10', P.pop(t, ev.c1_day10, 0.4), C.gold, 0.9);
    P.stamp(ctx, 'RANDY WINS', 900, 230, t, ev.c1_pinball + 0.5, { size: 84, color: C.coral });
    P.tag(ctx, '(or so the story goes)', 900, 340, t, ev.c1_pinball + 1.0, 1e9, { size: 40, border: C.dim });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — as the days pass: moodiness, trouble concentrating, memory lapses, hallucinations
  P.shot(ev.c1_s3, (ctx, t, s) => {
    P.paper(ctx, t, { tint: C.lilac });
    const u = clamp((t - ev.c1_days) / (ev.c1_sym[3] - ev.c1_days)); const day = Math.min(11, 2 + Math.floor(u * 9.99));
    ctx.save(); P.push(ctx, s.u, 520, 600, 0.03);
    P.human(ctx, Object.assign({ x: 520, y: 1330, s: 2.7, t, eyes: 'tired', mouth: u > 0.5 ? 'frown' : 'flat', sway: 0.03 + 0.04 * u, look: Math.sin(t * 0.9) * u, shadow: false }, RANDY));
    ctx.restore();
    calendar(ctx, 200, 210, 'DAY', String(day), P.pop(t, ev.c1_s3 + 0.2, 0.4) * (1 + 0.06 * Math.exp(-((u * 9.99) % 1) * 6)), C.gold, 0.9);
    const icons = [
      () => { P.ell(ctx, -20, -40, 60, 40, C.grey, { seed: 1 }); P.ell(ctx, 30, -30, 50, 36, C.grey, { seed: 2 }); P.shape(ctx, [[0, 0], [-22, 40], [0, 40], [-14, 78], [26, 26], [4, 26], [16, 0]], C.gold, { poly: true, edge: 0.3 }); },
      () => { for (let i = 3; i > 0; i--) { ctx.save(); ctx.globalAlpha = 0.5; P.ell(ctx, Math.sin(t * 5 + i) * 10, -10 + Math.cos(t * 4 + i) * 6, i * 24, i * 24, i % 2 ? C.coral : C.cream, { seed: i, edge: 0.3 }); ctx.restore(); } },
      () => { for (let i = 0; i < 6; i++) { const miss = i === 4 || (i === 1 && Math.sin(t * 3) > 0); P.rect(ctx, -84 + (i % 3) * 58, -60 + Math.floor(i / 3) * 58, 50, 50, 8, miss ? C.paper2 : C.sky, { seed: 30 + i, edge: miss ? 0.15 : 0.45 }); if (miss) G.text(ctx, '?', -59 + (i % 3) * 58, -20 + Math.floor(i / 3) * 58, { size: 44, fam: FT.title, weight: 700, color: C.dim, align: 'center', boil: 0 }); } },
      () => { P.wash(ctx, (c) => { c.beginPath(); c.moveTo(-90, -10); c.quadraticCurveTo(0, -80, 90, -10); c.quadraticCurveTo(0, 60, -90, -10); c.closePath(); }, C.cream, { edge: 0.5 }); P.ell(ctx, 0, -10, 34, 34, C.lilac, { seed: 5 }); P.brush(ctx, (c) => { c.beginPath(); for (let i = 0; i < 40; i++) { const an = i * 0.5 + t * 3, r = i * 0.8; i ? c.lineTo(Math.cos(an) * r, -10 + Math.sin(an) * r) : c.moveTo(0, -10); } }, C.ink, 4, 0.9); },
    ];
    const names = ['MOODY', "CAN'T FOCUS", 'MEMORY LAPSES', 'HALLUCINATIONS']; const cols = [C.sky, C.coral, C.gold, C.lilac];
    names.forEach((nm, i) => { const k = P.pop(t, ev.c1_sym[i], 0.4); if (k <= 0) return; const x = 1180 + (i % 2) * 440, y = 330 + Math.floor(i / 2) * 400;
      card(ctx, x, y, 400, 350, cols[i], i, () => { ctx.save(); ctx.translate(0, -30); icons[i](); ctx.restore(); G.text(ctx, nm, 0, 140, { size: nm.length > 12 ? 44 : 54, fam: FT.title, weight: 700, color: C.ink, align: 'center', boil: 0 }); }, k, (i % 2 ? 1 : -1) * 0.02);
      P.splat(ctx, x, y, t, ev.c1_sym[i], { color: cols[i], r: 260, seed: i }); });
    P.label(ctx, 'recorded by a Navy doctor, Lt Cmdr John Ross', 1400, 1010, { align: 'center', size: 38, alpha: P.fin(t, ev.c1_sym[0], 0.4) });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — 11 days and 25 minutes = 264 hours
  P.shot(ev.c1_s4, (ctx, t, s) => {
    P.paper(ctx, t);
    for (let i = 0; i < 11; i++) { const k = P.pop(t, ev.c1_11 - 0.3 + i * 0.09, 0.3); if (k <= 0) continue; const x = 190 + i * 154;
      P.at(ctx, x, 260, k, 0, () => { P.rect(ctx, -66, -80, 132, 160, 16, i % 2 ? C.sky : C.gold, { seed: i }); ctx.save(); ctx.beginPath(); ctx.rect(-66, 0, 132, 80); ctx.clip(); P.rect(ctx, -66, -80, 132, 160, 16, C.night2, { seed: i + 20 }); ctx.restore();
        P.ell(ctx, 0, -40, 20, 20, C.cream, { edge: 0.2 }); G.text(ctx, '☾', 0, 52, { size: 44, fam: FT.hand, color: C.moon, align: 'center', boil: 0 }); G.text(ctx, String(i + 1), 46, -50, { size: 30, fam: FT.hand, color: C.ink, align: 'center', boil: 0 }); }); }
    P.stamp(ctx, '11 DAYS, 25 MINUTES', 960, 470, t, ev.c1_25, { size: 84, color: C.navy, fg: C.gold, rot: -0.02 });
    P.counter(ctx, { x: 840, y: 800, from: 0, to: 264, t, t0: ev.c1_264a, t1: ev.c1_264, size: 220, sub: 'hours without sleep', subSize: 50, color: C.coral });
    P.ring(ctx, 840, 780, t, ev.c1_264, { r: 420, color: C.coral });
    P.human(ctx, Object.assign({ x: 1500, y: 1030, s: 1.25, t, eyes: 'tired', mouth: 'flat', sway: 0.07 }, RANDY));
    Ch.nod(ctx, { x: 1740, y: 1030, s: 0.9, t, eyes: 'wide', mouth: Ch.nodMouth(t, 'o'), look: -0.8, gesture: t > ev.c1_264 ? 'shrug' : 'idle' });
  }, { in: { type: 'wipe', dir: 'up', dur: 0.5 } });

  // S5 — then he slept almost 15 hours, and doctors found him healthy
  P.shot(ev.c1_s5, (ctx, t, s) => {
    P.night(ctx, t, { seed: 12, stars: 0.6 }); P.moon(ctx, 1650, 190, 80);
    ctx.save(); P.push(ctx, s.u, 800, 760, 0.03);
    P.rect(ctx, -50, 940, W + 100, 200, 0, '#2A2F63', { seed: 3, edge: 0.2 });
    P.bed(ctx, 780, 960, 1.7, { t, hair: '#6B4A2E', blanket: C.coral });
    P.zzz(ctx, 540, 640, t, { color: C.cream, size: 64, a: P.fin(t, ev.c1_slept, 0.4) });
    ctx.restore();
    const hrs = 14.77 * P.eio((t - ev.c1_slept) / (ev.c1_15 - ev.c1_slept + 0.2)); P.clock(ctx, 1340, 420, 120, hrs, (hrs % 1) * 60, { rim: C.gold });
    const hh = Math.floor(hrs), mm = Math.floor((hrs % 1) * 60); P.tag(ctx, `${hh} h ${String(mm).padStart(2, '0')} min asleep`, 1340, 620, t, ev.c1_slept, 1e9, { size: 54, border: C.gold, fam: FT.title });
    P.stamp(ctx, 'HEALTHY', 1400, 800, t, ev.c1_healthy, { size: 110, color: C.green, rot: -0.05 });
    P.ring(ctx, 1400, 800, t, ev.c1_healthy, { r: 320, color: C.mint });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S6 — the rat experiments of the 1980s (sober): none survived 11–32 days of total sleep loss; no clear cause
  P.shot(ev.c1_s6, (ctx, t, s) => {
    P.paper(ctx, t, { tint: C.sky });
    ctx.save(); P.push(ctx, s.u, 500, 640, 0.03);
    P.ell(ctx, 480, 760, 330, 60, C.grey, { seed: 3 }); P.rect(ctx, 440, 790, 80, 200, 10, P.dk(C.grey, 0.15), { seed: 4 });
    const kr = P.pop(t, ev.c1_rats, 0.4); if (kr > 0) P.animal(ctx, 'rat', 520, 660 + Math.sin(t * 2.4) * 3, 170 * kr, { t, sleep: false });
    ctx.restore();
    P.tag(ctx, 'lab experiments, 1980s', 480, 250, t, ev.c1_80s, 1e9, { size: 50, border: C.sky, fam: FT.title });
    P.label(ctx, 'Rechtschaffen, Bergmann, Everson et al., University of Chicago', 480, 1030, { align: 'center', size: 32, alpha: P.fin(t, ev.c1_80s, 0.4) });
    // days axis 0..35
    const ax = 980, aw = 800, ay = 560; const a = P.fin(t, ev.c1_died - 0.5, 0.4); ctx.save(); ctx.globalAlpha *= a;
    P.label(ctx, 'days kept totally awake', ax, ay - 110, { size: 42, color: C.ink });
    P.rect(ctx, ax, ay - 40, aw, 80, 16, C.paper2, { seed: 6, edge: 0.3 });
    for (let d = 0; d <= 35; d += 5) { P.line(ctx, ax + aw * d / 35, ay + 46, ax + aw * d / 35, ay + 64, C.ink, 4, 0.7); P.label(ctx, String(d), ax + aw * d / 35, ay + 106, { align: 'center', size: 36 }); }
    ctx.restore();
    const kk = P.eio((t - ev.c1_range) / 0.9); if (kk > 0) { P.wash(ctx, P.pRR(ax + aw * 11 / 35, ay - 40, aw * 21 / 35 * kk, 80, 16), C.coral, { bb: [ax + aw * 0.6, ay, 260], seed: 7 });
      G.text(ctx, '11', ax + aw * 11 / 35 + 14, ay + 22, { size: 60, fam: FT.title, weight: 700, color: C.cream, boil: 0, alpha: kk }); if (kk > 0.9) G.text(ctx, '32', ax + aw * 32 / 35 - 14, ay + 22, { size: 60, fam: FT.title, weight: 700, color: C.cream, align: 'right', boil: 0 }); }
    P.tag(ctx, 'none survived', ax + aw / 2, ay - 190, t, ev.c1_died, 1e9, { size: 52, border: C.red, fam: FT.title });
    const kq = P.pop(t, ev.c1_cause - 0.5, 0.4); if (kq > 0) { P.at(ctx, 1380, 850, kq, 0.06 * Math.sin(t * 2), () => G.text(ctx, '?', 0, 60, { size: 240, fam: FT.title, weight: 700, color: C.coral, align: 'center', boil: 0 })); }
    P.tag(ctx, 'no clear cause found', 1380, 990, t, ev.c1_cause, 1e9, { size: 46, border: C.coral });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S7 — 1997: Guinness closes the record
  P.shot(ev.c1_s7, (ctx, t, s) => {
    P.paper(ctx, t, { tint: C.gold });
    const shut = P.fin(t, ev.c1_closed, 0.12);
    ctx.save(); P.shake(ctx, t, ev.c1_closed, 6, 0.3); P.push(ctx, s.u, 800, 600, 0.03);
    if (shut < 1) { // the open book
      P.rect(ctx, 360, 250, 880, 560, 20, C.navy, { seed: 2 }); P.rect(ctx, 390, 270, 400, 520, 8, C.cream, { edge: 0.2 }); P.rect(ctx, 810, 270, 400, 520, 8, C.cream, { edge: 0.2 });
      G.text(ctx, 'LONGEST TIME', 590, 370, { size: 50, fam: FT.title, weight: 700, color: C.ink, align: 'center', boil: 0 }); G.text(ctx, 'WITHOUT SLEEP', 590, 430, { size: 50, fam: FT.title, weight: 700, color: C.ink, align: 'center', boil: 0 });
      for (let i = 0; i < 5; i++) P.line(ctx, 430, 500 + i * 50, 750 - (i % 2) * 60, 500 + i * 50, C.dim, 5, 0.5);
      P.clock(ctx, 1010, 480, 110, t * 3, (t * 60) % 60, { rim: C.gold }); for (let i = 0; i < 3; i++) P.line(ctx, 850, 660 + i * 44, 1170 - (i % 2) * 70, 660 + i * 44, C.dim, 5, 0.5);
    } else { P.rect(ctx, 520, 230, 560, 620, 24, C.navy, { seed: 2 }); P.rect(ctx, 520, 230, 50, 620, 12, P.dk(C.navy, 0.3), { seed: 3 });
      G.text(ctx, 'WORLD', 820, 440, { size: 110, fam: FT.title, weight: 700, color: C.gold, align: 'center', boil: 0 }); G.text(ctx, 'RECORDS', 820, 560, { size: 110, fam: FT.title, weight: 700, color: C.gold, align: 'center', boil: 0 }); P.splat(ctx, 800, 540, t, ev.c1_closed, { color: C.gold, r: 520, n: 18 }); }
    ctx.restore();
    calendar(ctx, 1560, 300, 'YEAR', '1997', P.pop(t, ev.c1_1997, 0.4), C.coral);
    P.stamp(ctx, 'RECORD CLOSED', 800, 720, t, ev.c1_closed + 0.2, { size: 96, color: C.red, rot: -0.07 });
    const kd = P.pop(t, ev.c1_dont, 0.4); if (kd > 0) P.at(ctx, 1560, 720, kd, 0, () => { P.shape(ctx, [[0, -150], [150, 110], [-150, 110]], C.gold, { poly: true, seed: 5 }); G.text(ctx, '!', 0, 80, { size: 190, fam: FT.title, weight: 700, color: C.navy, align: 'center', boil: 0 }); });
    P.tag(ctx, "please don't try it", 1560, 920, t, ev.c1_dont + 0.1, 1e9, { size: 50, border: C.red, fam: FT.title });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S8 — so sleep is not optional. But what is it for?
  P.shot(ev.c1_s8, (ctx, t, s) => {
    P.paper(ctx, t);
    Ch.nod(ctx, { x: 520, y: 960, s: 1.9, t, gesture: t > ev.c1_for - 0.3 ? 'think' : 'point', dir: 1, eyes: t > ev.c1_for - 0.3 ? 'open' : 'sleepy', lookY: t > ev.c1_for - 0.3 ? -0.6 : 0, look: 0.5, mouth: Ch.nodMouth(t) });
    P.write(ctx, 'sleep is…', 1240, 300, t, ev.c1_s8 + 0.3, { size: 110, dur: 0.5 });
    P.stamp(ctx, 'NOT OPTIONAL', 1240, 480, t, ev.c1_notopt, { size: 120, color: C.coral, rot: -0.03 });
    P.write(ctx, 'so what is it for?', 1240, 760, t, ev.c1_for - 0.9, { size: 110, color: C.navy, dur: 0.8, underline: C.gold });
    const kq = P.pop(t, ev.c1_for, 0.4); if (kq > 0) P.at(ctx, 880, 300, kq, 0.1 * Math.sin(t * 2.2), () => G.text(ctx, '?', 0, 0, { size: 260, fam: FT.title, weight: 700, color: C.gold, align: 'center', boil: 0 }));
  }, { in: { type: 'fade', dur: 0.4 } });
})();
