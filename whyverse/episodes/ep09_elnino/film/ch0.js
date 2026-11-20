// Cold open — Christmas, northern Peru: nets come up nearly empty, the sea is warm · "El Niño", the child · 2026: the child is back,
// Niño 3.4 = 29.94 °C in October, its hottest month on record · you can't see it from a beach, yet: India / Indonesia / Peru / North America
// · three promises · the question · title (8 slammed words + EL NIÑO burst).
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  // the dusk sea used by the first shots: orange sky with halftone, flat sea with scalloped waves
  P.duskSea = (ctx, t, { horizon = 560, sky = C.dusk, sea = C.sea, seed = 1 } = {}) => {
    P.bgFlat(ctx, t, sky, { dotCol: C.red, dir: 'up', a: 0.3 });
    P.iC(ctx, 1450, horizon - 40, 110, C.yel, { lw: 6, dots: C.warm, dotA: 0.35 });
    P.ink(ctx, (c) => { c.beginPath(); c.rect(-600, horizon, W + 1200, H + 600); }, sea, { lw: 0, dots: C.blue, dotA: 0.35 });
    P.line(ctx, -100, horizon, W + 100, horizon, C.ink, 6);
    for (let r = 0; r < 6; r++) { const y = horizon + 60 + r * 80, off = (t * (18 + r * 6) + r * 70) % 140; ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 4 + r * 0.6; ctx.beginPath();
      for (let x = -140 + off; x < W + 140; x += 140) { ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 35, y - 14, x + 70, y); } ctx.stroke(); ctx.restore(); }
  };
  P.pac = () => P.mapCache('pac', { lon0: 90, lon1: 300, lat0: -48, lat1: 60, w: 2400 });
  P.N34 = [-170, 5, -120, -5]; // Niño 3.4 box: 5°N–5°S, 170°W–120°W

  // S1 — Christmas, northern Peru: a boat, two fishermen, the net comes up nearly empty, the sea is warm
  P.shot(ev.c0_s1, (ctx, t) => {
    ctx.save(); P.push(ctx, t / Math.max(1, ev.c0_s2), 960, 600, 0.03);
    P.duskSea(ctx, t);
    const star = P.pop(t, ev.c0_xmas, 0.5); if (star > 0) { P.glow(ctx, 520, 150, 160, C.yel, star); P.ink(ctx, P.starPath(520, 150, 46 * star, 5, 0.45, 2), C.yel, { lw: 5 }); }
    const net = P.eio((t - ev.c0_nets + 0.3) / 1.3); P.boat(ctx, 860, 690, 1.1, t, { net, catch_: 2, people: 2 });
    Ch.pico(ctx, { x: 1440, y: 900, s: 0.9, t, dir: -1, gesture: t > ev.c0_warm ? 'shrug' : 'idle', mouth: P.talk(t), eyes: t > ev.c0_empty ? 'wide' : 'open', look: -1 });
    P.iR(ctx, 1380, 900, 120, 200, 6, C.land2, { lw: 5 }); // the pier post Pico stands on
    ctx.restore();
    P.caption(ctx, 'NORTHERN PERU · CHRISTMAS', 70, 60, t, ev.c0_xmas - 0.6, { size: 46 });
    P.bubble(ctx, 'ALMOST EMPTY?!', 620, 330, 760, 470, t, ev.c0_empty, { size: 50 });
    const th = P.pop(t, ev.c0_warm, 0.4); if (th > 0) { P.at(ctx, 300, 900, th, 0, () => P.thermo(ctx, 0, 0, 260, 0.2 + 0.6 * P.oc((t - ev.c0_warm) / 1), { label: 'WARM!' })); }
    for (let i = 0; i < 4; i++) { const a = P.fin(t, ev.c0_warm, 0.4); if (a <= 0) break; const x = 160 + i * 90, ph = (t * 0.8 + i * 0.3) % 1; P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(x, 640 - ph * 120); c.bezierCurveTo(x + 20, 610 - ph * 120, x - 20, 590 - ph * 120, x, 560 - ph * 120); }, C.red, 5, a * (1 - ph)); }
  });

  // S2 — every few years it came back, around Christmas → EL NIÑO · the child · the Christ child
  P.shot(ev.c0_s2, (ctx, t) => {
    P.bgPaper(ctx, t, { rays: 0.25, rayCol: C.yel, cy: 420 });
    // three little panels: the same warm Christmas sea, again and again
    [ev.c0_years, ev.c0_years + 0.45, ev.c0_back].forEach((t0, i) => P.panel(ctx, 150 + i * 560, 120, 500, 300, t, t0, (c) => {
      P.at(c, 250, 150, 0.45, 0, () => { c.translate(-960, -600); P.duskSea(c, t + i, { sky: C.dusk }); P.boat(c, 900, 700, 1, t + i, { people: 1 }); P.heat(c, 960, 860, 600, 160, t, { a: 0.7 }); });
      P.ink(c, P.starPath(420, 60, 26, 5, 0.45, i), C.yel, { lw: 4 }); G.text(c, ['YEAR …', 'A FEW YEARS LATER', 'AGAIN!'][i], 20, 280, { size: 34, fam: 'Bangers', color: C.cream, stroke: C.ink, strokeW: 7, boil: 0 });
    }, { t1: ev.c0_nino - 0.1 }));
    P.caption(ctx, 'EVERY FEW YEARS…', 150, 470, t, ev.c0_years, { size: 50, t1: ev.c0_nino - 0.1 });
    // the name
    P.burstStar(ctx, 960, 470, 330, t, ev.c0_nino, { color: C.yel, text: 'EL NIÑO', size: 190, tcol: C.red, n: 18 });
    P.cstamp(ctx, '= THE CHILD', 960, 800, t, ev.c0_child, { size: 70, color: C.blue });
    const sg = P.fin(t, ev.c0_christ, 0.5); if (sg > 0) { P.glow(ctx, 1650, 190, 220 * sg, C.yel, sg); P.ink(ctx, P.starPath(1650, 190, 60, 5, 0.45, 9), C.yel, { lw: 6, a: sg }); P.note(ctx, 'the Christ child, born at Christmas', 1640, 320, t, ev.c0_christ, { size: 38 }); }
    Ch.pico(ctx, { x: 260, y: 1060, s: 0.72, t, gesture: t > ev.c0_nino ? 'point' : 'idle', mouth: P.talk(t), look: 1 });
  }, { in: { type: 'wipe', dir: 'left', dur: 0.5 } });

  // S3 — 2026: the child is back · the Pacific map · the Niño 3.4 patch glows · 29.94 °C · HOTTEST MONTH ON RECORD
  P.shot(ev.c0_s3, (ctx, t) => {
    ctx.fillStyle = C.sea; ctx.fillRect(-600, -600, W + 1200, H + 1200);
    const m = P.pac(); const z = P.eio((t - ev.c0_bigger) / 3); const s = lerp(0.8, 0.95, z);
    const pj0 = m.proj(-145, 0); const cx = lerp(m.w * 0.8 / 2, pj0[0] * 0.95, z), cy = lerp(m.h * 0.8 / 2, pj0[1] * 0.95, z);
    const pj = P.drawMap(ctx, m, 960 - cx, 540 - cy, s);
    const [a0, b0, a1, b1] = P.N34; const c = pj(-145, 0); const hk = P.oc((t - ev.c0_patch + 0.2) / 0.8);
    P.heat(ctx, c[0], c[1], 520 * s * hk + 1, 120 * s * hk + 1, t, { a: hk });
    P.lonLatBox(ctx, pj, a0, b0, a1, b1, P.oc((t - ev.c0_patch) / 0.6), { col: C.yel });
    P.cstamp(ctx, '2026', 230, 140, t, ev.c0_2026, { size: 90, color: C.red });
    P.caption(ctx, 'THE CHILD IS BACK…', 380, 96, t, ev.c0_bigger, { size: 46 });
    P.lab(ctx, 'PACIFIC OCEAN', pj(-150, 22)[0], pj(-150, 22)[1], { size: 40, color: C.cream, stroke: C.ink, a: P.fin(t, ev.c0_pac, 0.4) });
    P.ccount(ctx, { x: c[0], y: c[1] + 300, to: 29.94, decimals: 2, suffix: ' °C', t, t0: ev.c0_2994a, t1: ev.c0_2994, size: 150, sub: 'NIÑO 3.4 · OCTOBER 2026 AVERAGE', subSize: 34 });
    P.slam(ctx, 'HOTTEST MONTH ON RECORD!', 960, 150, t, ev.c0_hot, { size: 96, color: C.yel, rot: -0.03 });
    P.source(ctx, 'Copernicus C3S, Nov 2026', t, ev.c0_2994);
  }, { in: { type: 'zoom', dur: 0.5 } });

  // S4a — you can't see it from any beach (Pico with binoculars on the sand)
  P.shot(ev.c0_s4, (ctx, t) => {
    P.duskSea(ctx, t, { sky: C.sky, horizon: 520 }); P.ink(ctx, P.pPoly([[-100, 820], [700, 760], [1300, 800], [2100, 760], [2100, 1200], [-100, 1200]]), C.land, { dots: C.land2, dotA: 0.5 });
    Ch.pico(ctx, { x: 900, y: 940, s: 1.05, t, gesture: 'hold', mouth: P.talk(t), look: 1, prop: (c, hx, hy) => { P.iR(c, hx - 20, hy - 60, 40, 60, 8, C.ink, { lw: 0 }); P.iR(c, hx - 70, hy - 60, 40, 60, 8, C.ink, { lw: 0 }); } });
    P.bubble(ctx, '…NOTHING TO SEE?', 1400, 260, 1100, 520, t, ev.c0_beach + 0.2, { size: 48, think: true });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S4b — yet it pulls on the whole planet's weather: four panels light up around the map
  P.shot(ev.c0_pull - 0.3, (ctx, t) => {
    ctx.fillStyle = C.sea; ctx.fillRect(-600, -600, W + 1200, H + 1200);
    const m = P.mapCache('world', { lon0: -10, lon1: 330, lat0: -50, lat1: 72, w: 2600 }); const s = 1920 / 2600 * 1.02; const pj = P.drawMap(ctx, m, -20, 540 - m.h * s / 2, s);
    const c = pj(-145, 0); P.heat(ctx, c[0], c[1], 160, 40, t);
    const tgt = [[ev.c0_india, 'India', 80, 20, 'WEAK MONSOON', 120, 70], [ev.c0_fire, 'Indonesia', 115, -2, 'FIRES', 140, 640], [ev.c0_rain, 'Peru', -76, -8, 'HEAVY RAIN AHEAD', 1450, 640], [ev.c0_na, 'United States of America', -100, 40, 'A DIFFERENT WINTER', 1400, 70]];
    tgt.forEach(([t0, name, lon, lat, lab, px, py], i) => {
      const p = pj(lon, lat); const k = P.eio((t - t0 + 0.5) / 0.6); if (k <= 0) return;
      P.countryOn(ctx, pj, name, C.yel, { a: k, lw: 4 });
      P.trace(ctx, [c, [lerp(c[0], p[0], 0.5), Math.min(c[1], p[1]) - 120], p], k, C.red, 6, 0.9, [16, 10]);
      P.panel(ctx, px, py, 380, 250, t, t0, (cx) => {
        cx.fillStyle = [C.sky2, C.sky2, '#BFD8E8', '#D9ECF7'][i]; cx.fillRect(0, 0, 380, 250);
        if (i === 0) { P.crack(cx, 30, 170, 320, 60); P.cloud(cx, 190, 80, 0.7); P.drops(cx, 120, 110, 140, 70, t, { n: 3 }); }
        if (i === 1) { P.flame(cx, 120, 220, 0.9, t); P.flame(cx, 250, 230, 0.7, t, { seed: 2 }); }
        if (i === 2) { P.stormCloud(cx, 190, 130, 0.42, t, { rain: 1 }); }
        if (i === 3) { P.sunIcon(cx, 110, 110, 40, t); P.ink(cx, P.starPath(270, 120, 50, 6, 0.4, 3), C.white, { lw: 5 }); }
        G.text(cx, lab, 190, 238, { size: 34, fam: 'Bangers', color: C.cream, stroke: C.ink, strokeW: 7, align: 'center', boil: 0 });
      });
    });
    P.caption(ctx, 'ONE PATCH OF OCEAN…', 760, 940, t, ev.c0_pull, { size: 46 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — three promises (each a panel with its own icon)
  P.shot(ev.c0_s5, (ctx, t) => {
    P.bgPaper(ctx, t, { rays: 0.3, rayCol: C.cyan, cy: 540 });
    P.caption(ctx, 'BY THE END OF THIS VIDEO, YOU\'LL KNOW…', 960, 70, t, ev.c0_s5 + 0.2, { size: 48, align: 'center' });
    const cards = [[ev.c0_q1, 'HOW WARM WATER TRAVELS\nHALFWAY ROUND THE WORLD', C.warm], [ev.c0_q2, 'WHY THE WORLD\'S RAIN\nFOLLOWS IT', C.cyan], [ev.c0_q3, 'WHY THIS ONE COULD BE\nTHE STRONGEST SINCE 1950', C.red]];
    cards.forEach(([t0, txt, col], i) => P.panel(ctx, 110 + i * 590, 220, 520, 600, t, t0, (c) => {
      c.fillStyle = col; c.fillRect(0, 0, 520, 600); P.dots(c, (cc) => { cc.beginPath(); cc.rect(0, 0, 520, 600); }, C.white, { a: 0.2 });
      P.iC(c, 260, 220, 140, C.cream, { lw: 6 });
      if (i === 0) { for (let k = 0; k < 3; k++) { const ph = (t * 0.6 + k / 3) % 1; P.fatArrow(c, 150 + ph * 60, 220 + (k - 1) * 50, 250 + ph * 80, 220 + (k - 1) * 50, { w: 22, color: C.warm, a: Math.sin(ph * Math.PI) }); } }
      if (i === 1) { P.cloud(c, 260, 200, 0.75); P.drops(c, 190, 240, 140, 90, t, { n: 8 }); }
      if (i === 2) P.thermo(c, 260, 320, 200, 0.5 + 0.4 * Math.sin(t * 2) * 0.5 + 0.2, {});
      P.iR(c, 30, 410, 460, 160, 4, C.cream, { lw: 5 });
      txt.split('\n').forEach((l, j) => G.text(c, l, 260, 478 + j * 52, { size: 42, fam: 'Bangers', color: C.ink, align: 'center', boil: 0 }));
      P.iC(c, 60, 60, 36, C.yel, { lw: 5 }); G.text(c, String(i + 1), 60, 76, { size: 44, fam: 'Bangers', color: C.ink, align: 'center', boil: 0 });
    }, { rot: (i - 1) * 0.015 }));
    Ch.pico(ctx, { x: 1800, y: 1070, s: 0.55, t, dir: -1, gesture: 'point', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'wipe', dir: 'up', dur: 0.5 } });

  // S6 — the question, then the TITLE (8 slammed words + EL NIÑO starburst + Whyverse)
  P.shot(ev.c0_s6, (ctx, t) => {
    const tt = ev.title0; const inTitle = t >= tt;
    if (!inTitle) {
      P.duskSea(ctx, t, { sky: C.dusk }); P.boat(ctx, 700, 720, 1.0, t, { people: 1 }); P.heat(ctx, 960, 900, 900, 160, t, { a: 0.5 });
      Ch.pico(ctx, { x: 1380, y: 1000, s: 1.0, t, dir: -1, gesture: 'think', mouth: P.talk(t), look: -1 });
      P.bubble(ctx, 'HOW CAN ONE PATCH OF OCEAN\nCONTROL THE WHOLE WORLD\'S WEATHER?', 900, 240, 1250, 620, t, ev.c0_s6 + 0.3, { size: 56 });
      return;
    }
    P.bgPaper(ctx, t, { rays: 0.6, rayCol: C.yel, cy: 560, spin: 0.06 });
    const rows = [[0, 4, 330], [5, 7, 560]];
    for (const [i0, i1, y] of rows) { const ws = ev.titleWords.slice(i0, i1 + 1); const sz = 150; const widths = ws.map((w) => P.measure(ctx, w.w, sz, 'Bangers', 400)); const tot = widths.reduce((a, b) => a + b, 0) + 40 * (ws.length - 1); let x = 960 - tot / 2;
      ws.forEach((w, j) => { const big = w.w === 'OCEAN' || w.w === 'WORLD'; P.slam(ctx, w.w, x + widths[j] / 2, y, t, w.t, { size: sz, color: big ? C.red : C.yel, rot: (j % 2 ? 0.03 : -0.03), strokeW: 16 }); x += widths[j] + 40; }); }
    P.burstStar(ctx, 960, 830, 200, t, ev.titleBrand, { color: C.red, text: 'EL NIÑO', size: 110, tcol: C.yel, n: 16, seed: 5 });
    const kb = P.pop(t, ev.titleBrand + 0.2, 0.5); P.brandPlanet(ctx, 1500, 860, 40 * kb, t, clamp(kb)); G.text(ctx, 'WHYVERSE', 1660, 878, { size: 48, fam: 'Bungee', color: C.ink, align: 'center', alpha: clamp(kb), boil: 0 });
    Ch.pico(ctx, { x: 330, y: 1080, s: 0.75, t, gesture: t > ev.titlePico ? 'cheer' : 'idle', eyes: 'happy', hop: t > ev.titlePico ? clamp((t - ev.titlePico) / 0.5) : 0 });
  }, { in: { type: 'fade', dur: 0.4 } });
})();
