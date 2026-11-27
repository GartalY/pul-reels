// Chapter 0 — cold open: a banana fires a positron roughly every 75 minutes · it meets an electron, both vanish in a flash ·
// the Big Bang made equal twins · twins that meet vanish → the universe should be empty (no stars, planets, bananas, you) ·
// "and yet, here you are" + 3 promises · the question · TITLE "THE UNIVERSE SHOULD BE EMPTY."
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L } = S; const C = P.C;
  const W = G.W, H = G.H;

  // S1 — a banana, a clock "≈ every 75 min", a pink positron shooting out
  P.shot(ev.c0_s1, (ctx, t) => {
    P.bgLine(ctx, t);
    ctx.save(); P.push(ctx, (t - ev.c0_s1) / 9, 820, 560, 0.03);
    P.banana(ctx, 760, 600, 1.35, t, { k: P.dk(t, 0.1, 0.8) });
    P.write(ctx, 'THIS IS A BANANA.', 760, 300, t, ev.c0_banana - 0.2, { size: 62, weight: 900 });
    const spin = clamp((t - ev.c0_75 + 0.3) / 3); P.clockFace(ctx, 1530, 330, 110, t, ease.inOutCubic(spin) * 1.25 * 12, P.dk(t, ev.c0_75 - 0.4, 0.5));
    P.lcount(ctx, { x: 1530, y: 560, from: 0, to: 75, t, t0: ev.c0_75, t1: ev.c0_75 + 1.4, size: 88, prefix: '≈ ', suffix: ' MIN', align: 'center' });
    P.small(ctx, 'ROUGHLY ONCE EVERY', 1530, 600 - 118, { align: 'center', size: 30, alpha: P.fin(t, ev.c0_75, 0.4) });
    // the positron leaves the banana
    const u = clamp((t - ev.c0_shoots) / 1.0); if (t >= ev.c0_shoots) {
      const pts = []; for (let i = 0; i <= 40; i++) { const v = i / 40 * ease.outCubic(u); pts.push([900 + v * 560, 560 - v * 0 + Math.sin(v * 9) * 30 * (1 - v) + v * 200]); }
      P.art(ctx, [{ pts, dash: [6, 10] }], 1, { color: C.acc, lw: 5 }); const e = pts[pts.length - 1]; P.part(ctx, e[0], e[1], 30, 'p', { k: P.dk(t, ev.c0_shoots, 0.2) }); P.ring(ctx, 900, 560, t, ev.c0_shoots, { r: 90, color: C.acc });
      P.glow(ctx, e[0], e[1], 120, C.acc, 0.6 * (0.6 + 0.4 * Math.sin(t * 8))); }
    const tk = P.pop(t, ev.c0_speck, 0.4); if (tk > 0) P.at(ctx, 1460, 900, tk, -0.03, () => P.rtext(ctx, 'ANTIMATTER', 0, 30, { size: 92 }));
    ctx.restore();
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — the positron meets an electron: flash, GONE, light
  P.shot(ev.c0_s2, (ctx, t) => {
    P.bgLine(ctx, t);
    const tm = ev.c0_vanish; const u = P.eio((t - ev.c0_meets + 0.4) / Math.max(0.3, tm - ev.c0_meets + 0.4));
    const d = 520 * (1 - u);
    if (t < tm) { P.part(ctx, 960 + d * 0.9, 520, 70, 'p', { k: P.dk(t, ev.c0_s2, 0.4) }); if (t > ev.c0_meets - 0.5) P.part(ctx, 960 - d, 520, 70, 'e', { k: P.dk(t, ev.c0_meets - 0.5, 0.3) }); }
    P.tag(ctx, 'POSITRON  e⁺', 1300, 300, t, ev.c0_positron, tm, { size: 44, fill: C.acc, color: C.pap });
    P.tag(ctx, 'ELECTRON  e⁻', 560, 300, t, ev.c0_meets, tm, { size: 44, fill: C.ink, color: C.pap });
    P.flash(ctx, 960, 520, t, tm, { r: 300, n: 12, seed: 3, dur: 1.6 });
    P.rslam(ctx, 'GONE.', 960, 880, t, ev.c0_gone, { size: 150 });
    if (t > ev.c0_light) { const k = P.dk(t, ev.c0_light, 0.8); for (let i = 0; i < 10; i++) { const a = i / 10 * 6.283; const r0 = 200 + 500 * k; const pts = []; for (let j = 0; j <= 10; j++) { const r = r0 + j * 9; pts.push([960 + Math.cos(a) * r - Math.sin(a) * Math.sin(j * 2) * 9, 520 + Math.sin(a) * r * 0.8 + Math.cos(a) * Math.sin(j * 2) * 9]); } P.art(ctx, [pts], 1, { color: C.yel, lw: 7, a: 1 - k * 0.5 }); }
      P.note(ctx, 'pure light', null, null, 1520, 760, t, ev.c0_light + 0.1, { size: 58 }); }
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — the Big Bang: a burst making particles in pairs; equal bars; "every particle got a twin"
  P.shot(ev.c0_s3, (ctx, t) => {
    P.bgLine(ctx, t, { corner: 0 });
    P.write(ctx, 'THE BIG BANG', 560, 170, t, ev.c0_bang - 0.1, { size: 64, weight: 900 });
    P.rslam(ctx, "HERE'S THE PROBLEM", 960, 540, t, ev.c0_s3 + 0.15, { size: 90, t1: ev.c0_bang - 0.05 }); Ch.elle(ctx, { x: 1700, y: 1060, s: 0.5, t, dir: -1, gesture: 'worried', mouth: P.talk(t), look: -1, a: 1 - P.dk(t, ev.c0_equal - 0.5, 0.3) });
    const bk = clamp((t - ev.c0_bang) / 0.5); if (bk > 0) { const pts = []; for (let i = 0; i < 32; i++) { const a = i / 32 * 6.283 + t * 0.1; const r = (i % 2 ? 60 : 150) * ease.outBack(bk, 1.5); pts.push([560 + Math.cos(a) * r, 560 + Math.sin(a) * r]); } P.iPoly(ctx, pts, C.yel); }
    for (let i = 0; i < 18; i++) { const t0 = ev.c0_bang + 0.2 + i * 0.12; if (t < t0) continue; const a = U.hash(i, 4) * 6.283; const dd = 120 + (t - t0) * 140 * (0.6 + 0.5 * U.hash(i, 5)); const dist = Math.min(dd, 420);
      const px = 560 + Math.cos(a) * dist, py = 560 + Math.sin(a) * dist * 0.8; const nx = -Math.sin(a) * 34, ny = Math.cos(a) * 34;
      P.part(ctx, px + nx, py + ny, 22, 'e', { sign: false }); P.part(ctx, px - nx, py - ny, 22, 'p', { sign: false }); }
    P.twinBars(ctx, 1460, 720, 380, t, { k: P.dk(t, ev.c0_equal - 0.3, 0.8) });
    P.rslam(ctx, '=', 1460, 270, t, ev.c0_equal, { size: 150 });
    P.head(ctx, 'EVERY PARTICLE GOT A TWIN', 960, 1000, t, ev.c0_twin - 0.25, { size: 60, hl: ['TWIN'] });
  }, { in: { type: 'flash', dur: 0.25 } });

  // S4 — pairs meet and vanish; NO STARS · NO PLANETS · NO BANANAS · NO YOU
  P.shot(ev.c0_s4, (ctx, t) => {
    P.bgLine(ctx, t, { corner: 0 });
    const span = Math.max(0.6, ev.c0_empty - ev.c0_meet); for (let i = 0; i < 18; i++) { const x = 230 + (i % 6) * 292, y = 170 + Math.floor(i / 6) * 120; const th = ev.c0_meet + (Math.floor(i / 6) * 6 + (i % 6)) / 18 * span; P.pairMeet(ctx, x, y, t, ev.c0_s4 + (i % 6) * 0.04, th, { gap: 90, r: 24, seed: i }); }
    P.write(ctx, 'TWINS THAT MEET → VANISH', 960, 560, t, ev.c0_s4 + 0.2, { size: 46, weight: 900, color: C.ink2, t1: ev.c0_empty - 0.1 });
    P.rslam(ctx, 'EMPTY.', 960, 540, t, ev.c0_empty, { size: 170 });
    const items = [['NO STARS', ev.c0_nostars, (x, y, k) => P.star(ctx, x, y, 60 * k, C.yel)], ['NO PLANETS', ev.c0_noplanets, (x, y, k) => P.brandPlanet(ctx, x, y, 46 * k, t, 1)],
      ['NO BANANAS', ev.c0_nobananas, (x, y, k) => P.banana(ctx, x, y, 0.38, t, { k })], ['NO YOU', ev.c0_noyou, (x, y, k) => P.person(ctx, x, y + 80, 0.5, t, { k })]];
    items.forEach(([s, t0, f], i) => { const x = 300 + i * 440, y = 820; const k = P.pop(t, t0 - 0.35, 0.35); if (k <= 0) return; const gone = P.dk(t, t0 + 0.1, 0.5); ctx.save(); ctx.globalAlpha *= 1 - gone * 0.7; f(x, y, k); ctx.restore();
      P.cross(ctx, x - 80, y - 80, x + 80, y + 80, P.dk(t, t0, 0.35), { lw: 12 }); G.text(ctx, s, x, y + 150, { size: 40, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0, alpha: clamp(k) }); });
  }, { in: { type: 'wipe', dir: 'up', dur: 0.5, color: C.acc } });

  // S5 — "and yet, here you are": Elle pops in, the world refills; three promise cards
  P.shot(ev.c0_s5, (ctx, t) => {
    P.bgLine(ctx, t);
    const rf = P.dk(t, ev.c0_here - 0.2, 1.0);
    ctx.save(); ctx.globalAlpha *= 0.85; P.galaxy(ctx, 260, 220, 170, t, { k: rf, color: C.ink }); P.galaxy(ctx, 1700, 940, 130, t, { k: rf, color: C.acc, seed: 3 }); for (let i = 0; i < 12; i++) P.star(ctx, 100 + U.hash(i, 7) * 1720, 80 + U.hash(i, 8) * 300, 14 * rf, C.yel, 0.9); ctx.restore();
    Ch.elle(ctx, { x: 280, y: 1010, s: 0.85, t, gesture: t < ev.c0_q1 ? 'wave' : 'point', mouth: P.talk(t), k: P.dk(t, ev.c0_here - 0.15, 0.4), eyes: t < ev.c0_q1 ? 'happy' : 'open', look: 1 });
    P.note(ctx, 'here you are!', null, null, 330, 640, t, ev.c0_here + 0.2, { size: 52, t1: ev.c0_q1 });
    const cards = [['WHAT IS', 'ANTIMATTER?', ev.c0_q1, C.acc], ['HOW DO YOU', 'HOLD IT?', ev.c0_q2, C.ink], ['WHY DOES ANYTHING', 'EXIST?', ev.c0_q3, C.vio]];
    cards.forEach(([a, b, t0, col], i) => { const x = 650 + i * 420, y = 360; const k = P.pop(t, t0 - 0.2, 0.4); if (k <= 0) return; P.at(ctx, x + 180, y + 170, k, (i - 1) * 0.03, () => {
      P.iRect(ctx, -180, -170, 360, 340, 22, C.pap); P.iRect(ctx, -180, -170, 360, 56, 22, col, { shade: 0.3 }); P.art(ctx, [P.rrPts(-180, -170, 360, 340, 22)], 1, { lw: 5 });
      G.text(ctx, String(i + 1), -150, -126, { size: 36, fam: 'Inter', weight: 900, color: C.pap, boil: 0 });
      G.text(ctx, a, 0, -20, { size: 34, fam: 'Inter', weight: 800, color: C.ink2, align: 'center', boil: 0 }); G.text(ctx, b, 0, 50, { size: b.length > 9 ? 46 : 58, fam: 'Inter', weight: 900, color: col, align: 'center', boil: 0 });
      if (i === 0) P.part(ctx, 0, 116, 26, 'p'); if (i === 1) P.trap(ctx, 0, 118, 0.12, t, { glow: 0 }); if (i === 2) P.star(ctx, 0, 118, 30, C.yel); }); });
  }, { in: { type: 'iris', color: C.yel, at: [960, 540], dur: 0.6 } });

  // S6 — the question
  P.shot(ev.c0_s6, (ctx, t) => {
    P.bgLine(ctx, t);
    P.rtext(ctx, "WHY DIDN'T THE UNIVERSE", 960, 400, { size: 96, a: P.fin(t, ev.c0_s6 + 0.2, 0.3) });
    P.rslam(ctx, 'DESTROY ITSELF?', 960, 560, t, ev.c0_destroy - 0.1, { size: 120, top: C.acc, under: C.ink });
    P.pairMeet(ctx, 960, 820, t, ev.c0_s6, ev.c0_destroy + 0.3, { gap: 420, r: 44, seed: 8 });
    Ch.elle(ctx, { x: 1680, y: 1060, s: 0.6, t, dir: -1, gesture: 'think', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'push', dir: 'up', dur: 0.45 } });

  // TITLE — navy page: THE UNIVERSE / SHOULD BE EMPTY. in two inks
  P.shot(ev.title0 - 0.15, (ctx, t) => {
    P.bgInk(ctx, t);
    for (let i = 0; i < 26; i++) { const x = 80 + U.hash(i, 21) * 1760, y = 80 + U.hash(i, 22) * 920; P.star(ctx, x, y, 6 + 8 * U.hash(i, 23), i % 3 ? C.yel : C.acc, 0.5 + 0.4 * Math.sin(t * 1.5 + i)); }
    const tw = ev.titleWords; const sz = 170;
    [[0, 1, 400], [2, 3, 600]].forEach(([i0, i1, y]) => { const ws = tw.slice(i0, i1 + 1); const widths = ws.map((w) => P.measure(ctx, w.w, sz, 'Inter', 900)); const tot = widths.reduce((a, b) => a + b, 0) + 50 * (ws.length - 1); let x = 960 - tot / 2;
      ws.forEach((w, j) => { const k = clamp((t - w.t) / 0.12); if (k > 0) { const sc = lerp(1.5, 1, ease.outCubic(k)); ctx.save(); ctx.translate(x + widths[j] / 2, y); ctx.scale(sc, sc); ctx.globalAlpha *= k;
        G.text(ctx, w.w, 7, 6, { size: sz, fam: 'Inter', weight: 900, color: (i0 + j) === 3 ? C.ink : C.acc, align: 'center', boil: 0, alpha: 0.85 });
        G.text(ctx, w.w, 0, 0, { size: sz, fam: 'Inter', weight: 900, color: (i0 + j) === 3 ? C.acc : C.pap, align: 'center', boil: 0 }); ctx.restore(); }
        x += widths[j] + 50; }); });
    P.write(ctx, 'Why does anything exist?  The antimatter mystery', 960, 760, t, ev.titleSub, { size: 48, weight: 700, color: 'rgba(242,236,222,0.85)', stag: 0.04 });
    const kb = P.pop(t, ev.titleBrand, 0.5); P.brandPlanet(ctx, 730, 905, 34 * kb, t, clamp(kb)); G.text(ctx, 'WHYVERSE', 990, 925, { size: 54, fam: 'Inter', weight: 900, color: C.yel, align: 'center', alpha: clamp(kb), boil: 0 });
    const ok = P.eio((t - ev.titleElle) / 0.6); if (ok > 0) { Ch.elle(ctx, { x: 240, y: 1120 - ok * 150, s: 0.6, t, gesture: 'wave', eyes: 'happy', a: ok }); Ch.posi(ctx, { x: 1680, y: 1120 - ok * 150, s: 0.6, t, dir: -1, gesture: 'wave', eyes: 'happy', a: ok }); }
  }, { in: { type: 'flash', dur: 0.3 } });
})();
