// Chapter 1 — what a bee actually does.
(function () {
  const { U, G, Ch, P, SCORE: S, Shots, Data } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const day = (ctx, t) => {
    P.sky(ctx); P.sun(ctx, 1660, 190, 80, t);
    P.cloud(ctx, 300 + (t * 12) % 300, 170, 1.1, 3); P.cloud(ctx, 1100 + (t * 8) % 200, 120, 0.8, 7);
    G.shape(ctx, [[-300, 760], [400, 700], [1000, 760], [1600, 690], [2300, 740], [2300, 1400], [-300, 1400]], { fill: '#8CC77E', seed: 13, hatch: { color: 'rgba(30,80,30,0.18)', gap: 9 } });
    P.ground(ctx, 880, { fill: C.green, seed: 14 });
  };
  P.cardShot('c1', 1, 'What a bee actually does', (ctx, t) => { day(ctx, t); for (let i = 0; i < 8; i++) P.flower(ctx, 140 + i * 240, 980, 0.9, { color: ['#E58FB0', '#B79CFF', '#F2B84B', '#EF7B5B'][i % 4], sway: 1, seed: 60 + i, t }); });

  // S1 — she's shopping
  const F1 = [980, 900];
  P.shot(ev.c1_s1, (ctx, t, s) => {
    day(ctx, t);
    for (let i = 0; i < 7; i++) if (i !== 3) P.flower(ctx, 120 + i * 290, 960 + (i % 2) * 30, 0.85, { color: ['#E58FB0', '#B79CFF', '#F2B84B', '#EF7B5B'][i % 4], sway: 1, seed: 70 + i, t });
    const head = P.flower(ctx, F1[0], F1[1] + 60, 1.7, { color: '#E58FB0', sway: 0.4, seed: 81, t, stem: 220 });
    const u = clamp((t - ev.c1_s1) / Math.max(0.5, ev.c1_land - ev.c1_s1));
    const bx = lerp(-200, head[0] - 10, ease.outCubic(u)) , by = lerp(300, head[1] - 120, ease.inOutQuad(u)) + Math.sin(u * 9) * 30 * (1 - u);
    const landed = t >= ev.c1_land;
    Ch.bee(ctx, { x: bx, y: by, s: 1.25, t, flap: landed ? 0.3 : 1, basket: true, pollen: clamp((t - ev.c1_pollen) / 1.5) * 0.8, eyes: t > ev.c1_shop ? 'happy' : 'normal', mouth: P.talk(t), armR: -0.6 });
    P.note(ctx, 'shopping!', bx + 230, by - 170, t, ev.c1_shop, 1e9, { size: 66, fill: C.gold, rot: 0.05, seed: 3 });
    // tags
    const tag = (txt, sub, x, y, t0, col, icon) => { const k = P.pop(t, t0); if (k <= 0) return; P.at(ctx, x, y, k, -0.04, () => { G.tornPaper(ctx, -230, -80, 460, 160, { fill: col, seed: x | 0 }); G.text(ctx, txt, -200 + 90, -6, { size: 60, fam: FT.title, weight: 400, color: C.navyD }); G.text(ctx, sub, -200 + 90, 50, { size: 44, fam: FT.hand, color: C.ink }); icon(); }); };
    tag('NECTAR', '= energy', 330, 330, ev.c1_nectar, '#FFF1C9', () => { G.poly(ctx, [[-170, -40], [-140, -40], [-160, 0], [-130, 0], [-180, 60], [-165, 10], [-190, 10]], { fill: C.gold, seed: 4, lw: 3.5 }); });
    tag('POLLEN', '= food for her young', 1500, 560, ev.c1_pollen, '#FBE3EA', () => { for (let i = 0; i < 5; i++) G.ellipse(ctx, -165 + (i % 3) * 18, -20 + Math.floor(i / 3) * 22, 10, 10, { fill: '#FFC93C', seed: 30 + i, lw: 2.5 }); });
  }, { in: 'cut', cam: Shots.push(1.0, 1.07) });

  // S2 — sticky + fuzzy, the dust rides along
  const A = [430, 860], B = [1500, 860];
  P.shot(ev.c1_s2, (ctx, t, s) => {
    day(ctx, t);
    const hA = P.flower(ctx, A[0], A[1] + 100, 1.5, { color: '#B79CFF', sway: 0.5, seed: 91, t, stem: 200 });
    const hB = P.flower(ctx, B[0], B[1] + 100, 1.5, { color: '#B79CFF', sway: 0.5, seed: 92, t, stem: 200 });
    const u = clamp((t - ev.c1_fly0) / Math.max(0.6, ev.c1_fly1 - ev.c1_fly0)); const e = ease.inOutCubic(u);
    const bx = lerp(hA[0], hB[0], e), by = lerp(hA[1] - 110, hB[1] - 110, e) - Math.sin(e * Math.PI) * 300;
    // trail of pollen dust
    if (u > 0) for (let i = 0; i < 26; i++) { const v = i / 26; if (v > e) break; const px = lerp(hA[0], hB[0], v), py = lerp(hA[1] - 110, hB[1] - 110, v) - Math.sin(v * Math.PI) * 300 + 40;
      ctx.fillStyle = 'rgba(255,201,60,0.85)'; ctx.beginPath(); ctx.arc(px + Math.sin(i * 3) * 8, py + Math.cos(i * 2) * 8, 6 * (1 - (e - v) * 0.8), 0, 7); ctx.fill(); }
    const pol = clamp((t - ev.c1_s2) / 2.2);
    Ch.bee(ctx, { x: bx, y: by, s: 1.3, t, flap: u > 0 && u < 1 ? 1 : 0.4, pollen: pol, eyes: 'normal', mouth: P.talk(t), rot: u > 0 && u < 1 ? -0.2 * Math.cos(e * Math.PI) : 0 });
    P.sparkle(ctx, hB[0], hB[1], t, ev.c1_fly1, { n: 14, r: 110 });
    P.note(ctx, 'sticky', 300, 300, t, ev.c1_sticky, 1e9, { size: 70, fill: '#FFF1C9', rot: -0.06, seed: 11 });
    P.note(ctx, 'fuzzy', 620, 230, t, ev.c1_fuzzy, 1e9, { size: 70, fill: '#FBE3EA', rot: 0.05, seed: 12 });
  }, { in: { type: 'push', dir: 'left' }, cam: Shots.pan(0, 0, 0, 0) });

  // S3 — the diagram: pollen → tube → fruit → seeds
  P.shot(ev.c1_s3, (ctx, t, s) => {
    P.paperBg(ctx, '#F3E7D2');
    // grid paper
    ctx.strokeStyle = 'rgba(39,48,92,0.07)'; ctx.lineWidth = 2; for (let x = 0; x < W; x += 60) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 0; y < H; y += 60) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    P.stamp(ctx, 'POLLINATION', 520, 190, t, ev.c1_stampPoll, { size: 90, color: C.navy, rot: -0.06 });
    const cx = 1150, base = 900;
    const sw = ease.outBack(clamp((t - ev.c1_swell) / 0.9), 1.4);
    // stem
    G.line(ctx, [[cx, 1100], [cx, base]], { color: C.greenD, lw: 16, seed: 3 });
    // petals fall away as the fruit swells
    const pf = clamp((t - ev.c1_swell) / 0.8);
    for (const [dx, rot, k] of [[-1, -0.7, 0], [1, 0.7, 1]]) { ctx.save(); ctx.translate(cx + dx * 90, base - 140 + pf * 300); ctx.rotate(rot + dx * pf * 0.8); ctx.globalAlpha *= 1 - pf;
      G.ellipse(ctx, dx * 70, -60, 120, 60, { fill: '#F2A0B5', seed: 10 + k, lw: 4, hatch: { color: 'rgba(120,30,60,0.15)', gap: 8 } }); ctx.restore(); }
    // ovary → fruit
    const r = lerp(70, 230, sw);
    if (sw > 0.02) { G.ellipse(ctx, cx, base - 80 - r * 0.8, r * 1.05, r, { fill: P.mix('#9CC46A', '#D9463B', sw), seed: 20, lw: 5, hatch: { color: 'rgba(0,0,0,0.12)', gap: 8 } });
      ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.beginPath(); ctx.ellipse(cx - r * 0.45, base - 80 - r * 1.2, r * 0.22, r * 0.12, -0.6, 0, 7); ctx.fill();
      G.ellipse(ctx, cx + r * 0.35, base - 80 - r * 1.75, r * 0.3, r * 0.13, { fill: C.leaf, seed: 24, lw: 4 }); }
    else G.ellipse(ctx, cx, base - 120, 70, 60, { fill: '#9CC46A', seed: 20, lw: 5, hatch: { color: 'rgba(0,0,0,0.12)', gap: 8 } });
    // style + stigma
    const styleA = 1 - pf;
    if (styleA > 0) { ctx.save(); ctx.globalAlpha *= styleA; G.line(ctx, [[cx, base - 170], [cx, base - 460]], { color: '#8DBE6C', lw: 22, seed: 30 }); G.ellipse(ctx, cx, base - 480, 46, 26, { fill: '#C6E08A', seed: 31, lw: 4 }); ctx.restore(); }
    // labels
    if (styleA > 0.5) { P.note(ctx, 'stigma', cx + 220, base - 480, t, ev.c1_s3 + 0.4, ev.c1_swell, { size: 50, seed: 41 }); P.note(ctx, 'ovary', cx - 260, base - 120, t, ev.c1_s3 + 0.7, ev.c1_swell, { size: 50, seed: 42 }); }
    // the grain lands, the tube grows
    const g = clamp((t - (ev.c1_grain - 0.6)) / 0.6);
    if (g > 0 && g < 1) G.ellipse(ctx, lerp(600, cx, ease.outCubic(g)), lerp(260, base - 510, ease.outCubic(g)), 16, 16, { fill: '#FFC93C', seed: 50, lw: 3 });
    if (g >= 1 && styleA > 0) { G.ellipse(ctx, cx, base - 510, 16, 16, { fill: '#FFC93C', seed: 50, lw: 3 }); const tu = clamp((t - ev.c1_tube) / 1.0);
      if (tu > 0) G.line(ctx, [[cx, base - 500], [cx + 6, lerp(base - 500, base - 150, tu)]], { color: '#E89B2E', lw: 7, seed: 51 }); }
    P.sparkle(ctx, cx, base - 510, t, ev.c1_grain, { n: 12, r: 90 });
    // seeds
    ev.c1_seeds.forEach((ts, i) => { const k = P.pop(t, ts); if (k <= 0) return; const a = i / 5 * 6.283 + 0.5; P.at(ctx, cx + Math.cos(a) * r * 0.4, base - 80 - r * 0.8 + Math.sin(a) * r * 0.35, k, a, () => G.ellipse(ctx, 0, 0, 14, 24, { fill: '#5A3A22', seed: 60 + i, lw: 3 })); });
    if (t > ev.c1_seeds[4] + 0.2) P.note(ctx, 'fruit + seeds', cx + 380, base - 330, t, ev.c1_seeds[4] + 0.2, 1e9, { size: 58, fill: C.gold, seed: 43 });
    Ch.bee(ctx, { x: 420, y: 640 + Math.sin(t * 2) * 15, s: 0.9, t, eyes: 'normal', look: 0.8, mouth: P.talk(t), armR: 0.6 });
  }, { in: { type: 'wipe', dir: 'left' }, cam: Shots.push(1.0, 1.05) });

  // S4 — no delivery: small / misshapen / none
  P.shot(ev.c1_s4, (ctx, t, s) => {
    P.paperBg(ctx, '#F3E7D2');
    const k0 = P.pop(t, ev.c1_nodel);
    if (k0 > 0) P.at(ctx, W / 2, 200, k0, 0, () => { G.rrect(ctx, -120, -70, 240, 140, 10, { fill: '#D9B27A', seed: 2, lw: 5 }); G.line(ctx, [[-120, -20], [120, -20]], { color: C.ink, lw: 4, seed: 3 }); G.text(ctx, 'POLLEN', 0, 40, { size: 40, fam: FT.title, weight: 400, color: C.navyD, align: 'center' });
      G.line(ctx, [[-150, -90], [150, 90]], { color: C.red, lw: 14, seed: 4 }); G.line(ctx, [[150, -90], [-150, 90]], { color: C.red, lw: 14, seed: 5 }); });
    const cols = [[480, ev.c1_small, 'smaller'], [960, ev.c1_mis, 'misshapen'], [1440, ev.c1_none, 'no fruit']];
    cols.forEach(([x, t0, lab], i) => {
      G.line(ctx, [[x, 980], [x, 700]], { color: C.brown, lw: 14, seed: 10 + i }); G.ellipse(ctx, x + 60, 760, 46, 20, { fill: C.leaf, seed: 13 + i, lw: 3.5 });
      const k = P.pop(t, t0, 0.4);
      if (k > 0) {
        if (i === 0) G.ellipse(ctx, x, 690 - 50 * k, 50 * k, 46 * k, { fill: '#D9463B', seed: 20, lw: 4 });
        if (i === 1) G.shape(ctx, G.ellPts(x, 650, 85 * k, 70 * k).map((p, j) => [p[0] + Math.sin(j * 1.7) * 18 * k, p[1] + Math.cos(j * 2.3) * 14 * k]), { fill: '#C9503F', seed: 21, lw: 4, hatch: { color: 'rgba(0,0,0,0.12)', gap: 8 } });
        if (i === 2) { G.line(ctx, [[x - 50, 620], [x + 50, 720]], { color: C.red, lw: 12, seed: 22 }); G.line(ctx, [[x + 50, 620], [x - 50, 720]], { color: C.red, lw: 12, seed: 23 }); }
        P.note(ctx, lab, x, 860, t, t0 + 0.1, 1e9, { size: 56, seed: 30 + i, rot: (i - 1) * 0.04 });
      }
    });
    Ch.bee(ctx, { x: 1700, y: 380 + Math.sin(t * 1.7) * 12, s: 0.7, t, facing: -1, eyes: t > ev.c1_none ? 'worried' : 'normal', mouth: P.talk(t) });
  }, { in: { type: 'push', dir: 'up' }, cam: Shots.push(1.04, 1.0) });

  // S5 — 20,000 species
  const kinds = [ { s: 1.25, c: '#F5B83D', stripe: true, name: 'bumblebee' }, { s: 0.7, c: '#7FBF6A' }, { s: 0.9, c: '#4FA3E0' }, { s: 0.55, c: '#E8718D' }, { s: 1.0, c: '#C9955E' }, { s: 0.6, c: '#9B7BD6' }, { s: 0.8, c: '#3FA89B' }, { s: 0.5, c: '#EF7B5B' }, { s: 0.28, c: '#2A2320', tiny: true } ];
  P.shot(ev.c1_s5, (ctx, t, s) => {
    P.sky(ctx, '#CFE7EE', '#F4EDE0');
    { const k = 1 - P.fin(t, ev.c1_bees[0] - 0.3, 0.4); if (k > 0) Ch.bee(ctx, { x: W / 2 + Math.sin(t * 1.5) * 60, y: 620, s: 1.4 * (0.4 + 0.6 * k), alpha: k, t, mouth: P.talk(t), armR: 1.0, wave: 1, eyes: 'happy' }); }
    P.counter(ctx, { x: W / 2, y: 240, from: 0, to: 20000, t, t0: ev.c1_count0, t1: ev.c1_count1, size: 150, color: C.navy, sub: 'species of wild bees (about)', subSize: 46 });
    kinds.forEach((k, i) => {
      const t0 = ev.c1_bees[i]; const a = P.pop(t, t0, 0.4); if (a <= 0) return;
      const x = 170 + i * 200, y = 700 + Math.sin(t * 2 + i) * 14;
      const old = Ch.BEE.GOLD; // tint: draw then colour wash via body colour override is not exposed; use a halo disc instead
      G.ellipse(ctx, x, y + 10, 90 * k.s, 70 * k.s, { fill: P.mix(k.c, '#FFFFFF', 0.55), seed: 80 + i, lw: 3, stroke: 'rgba(42,35,32,0.35)' });
      Ch.bee(ctx, { x, y, s: k.s * 0.75 * a, t: t + i, seed: 10 + i, eyes: i === 0 && t > ev.c1_bumble ? 'happy' : 'normal', flap: 1 });
    });
    P.note(ctx, 'bumblebee', 170, 880, t, ev.c1_bumble, 1e9, { size: 48, seed: 91 });
    const kr = P.pop(t, ev.c1_rice);
    if (kr > 0) P.at(ctx, 1770, 700, kr, 0, () => { G.ellipse(ctx, 0, 0, 120, 120, { fill: 'rgba(255,255,255,0.85)', seed: 92, lw: 8 }); G.line(ctx, [[80, 80], [160, 170]], { color: C.brown, lw: 22, seed: 93 });
      G.ellipse(ctx, -30, 20, 34, 12, { fill: '#FFFFFF', seed: 94, lw: 3 }); Ch.bee(ctx, { x: 30, y: -10, s: 0.2, t, flap: 1, seed: 5 }); });
    P.note(ctx, 'smaller than a grain of rice', 1560, 900, t, ev.c1_rice + 0.15, 1e9, { size: 46, seed: 95 });
  }, { in: { type: 'paper' }, cam: Shots.push(1.0, 1.05) });

  // S6 — the honeybee is one of them
  P.shot(ev.c1_s6, (ctx, t, s) => {
    P.paperBg(ctx, '#F3E7D2');
    // dim crowd of tiny bee icons = 20,000
    for (let i = 0; i < 140; i++) { const x = 80 + (i % 20) * 92, y = 120 + Math.floor(i / 20) * 130; ctx.globalAlpha = 0.25; Ch.bee(ctx, { x, y, s: 0.22, t: t + i, flap: 0.5, seed: i }); }
    ctx.globalAlpha = 1;
    const k = P.pop(t, ev.c1_jar, 0.5);
    if (k > 0) P.at(ctx, W / 2, 620, k * 1.6, 0, () => { G.ellipse(ctx, 0, 0, 220, 220, { fill: 'rgba(255,248,232,0.95)', seed: 3, lw: 4 }); P.food(ctx, 'honey', 0, 20, 1.6); Ch.bee(ctx, { x: 0, y: 30, s: 0.5, t, flap: 0, eyes: 'happy' }); });
    P.note(ctx, 'honeybee = 1 of ~20,000', W / 2, 980, t, ev.c1_one, 1e9, { size: 60, fill: C.gold, seed: 7 });
  }, { in: { type: 'zoom' }, cam: Shots.push(1.0, 1.08) });
})();
