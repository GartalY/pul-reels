// Chapter 2 — The hole in the sky: the shield (15–35 km, blocks most harsh UV) · 1974 Molina & Rowland: CFCs could destroy it ·
// CFCs everywhere (cheap, safe, never break down — the problem) · up high, sunlight frees chlorine, one atom breaks ozone again and again ·
// May 1985, Farman / Gardiner / Shanklin (BAS), October ozone over Halley down by about a third · a hole → a deal within 2½ years
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L } = S; const C = P.C;
  const W = G.W, H = G.H;
  P.cardShot('c2', 2, 'The hole in the sky', (ctx, t) => { P.globe(ctx, 1810, 960, 90, t, { lon0: t * 4, lat0: -70, k: P.dk(t, S.CH.c2.t0 + 0.3, 1.0), hole: 0.9, grid: false }); });

  // the sky column: altitude (km) → y
  const ky = (km) => 960 - km * 21;
  // S1 — the shield: an altitude axis, the ozone band at 15–35 km; UV rays stop in it
  P.shot(ev.c2_s1, (ctx, t) => {
    P.bgLine(ctx, t);
    const ak = P.dk(t, ev.c2_s1 + 0.1, 0.8);
    P.ground(ctx, 960, ak); for (let i = 0; i < 9; i++) { const x = 520 + i * 110, h = 40 + U.hash(i, 3) * 70; P.art(ctx, [P.rectPts(x, 960 - h, 70, h)], P.dk(t, ev.c2_s1 + 0.3 + i * 0.05, 0.4), { lw: 3.5, fill: C.pap }); }
    P.dLine(ctx, 160, 960, 160, ky(42), ak, { lw: 4 });
    [0, 10, 20, 30, 40].forEach((km, i) => { if (ak < 0.3 + i * 0.12) return; P.line(ctx, 148, ky(km), 172, ky(km), C.ink, 4); P.small(ctx, km + ' km', 140, ky(km) + 10, { align: 'right', size: 28 }); });
    const bk = P.fin(t, ev.c2_layer - 0.3, 0.8);
    ctx.save(); ctx.globalAlpha *= bk; ctx.fillStyle = C.accW; ctx.fillRect(200, ky(35), 1720, ky(15) - ky(35)); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(200, 0, 1720, H); ctx.clip(); P.ozoneBand(ctx, t, ky(35), ky(15), { k: bk, n: 30, r: 12 }); ctx.restore();
    P.dim(ctx, 240, ky(35), 240, ky(15), '', P.fin(t, ev.c2_km, 0.6), { color: C.acc });
    P.note(ctx, '≈ 15–35 km up', null, null, 420, ky(37) - 20, t, ev.c2_km, { size: 50 });
    P.head(ctx, 'THE OZONE LAYER', 760, ky(25) + 24, t, ev.c2_layer, { size: 62, hl: ['OZONE'] });
    P.sunL(ctx, 1700, 150, 60, t, { k: P.dk(t, ev.c2_s1 + 0.2, 0.8) });
    for (let i = 0; i < 5; i++) { const x0 = 1660 - i * 20, y0 = 230, x1 = 1060 + i * 160, y1 = 940; const pass = i === 2; const stop = pass ? 1 : (ky(28 - i * 2) - y0) / (y1 - y0);
      P.uv(ctx, x0, y0, x1, y1, clamp((t - ev.c2_soaks - i * 0.12) / 1.0), { stop, lw: pass ? 2.5 : 5, a: pass ? 0.5 : 1, amp: 12 }); }
    P.note(ctx, 'blocks most of the harshest UV', null, null, 1450, 1030, t, ev.c2_uv, { size: 46 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — 1974: Mario Molina & F. Sherwood Rowland — CFCs could drift up and destroy it
  P.shot(ev.c2_s2, (ctx, t) => {
    P.bgLine(ctx, t);
    P.stamp(ctx, '1974', 200, 150, t, ev.c2_1974, { size: 90, color: C.acc, rot: -0.04 });
    P.person(ctx, 260, 900, 1.05, t, { pose: 'hold', prop: 'paper', k: P.fin(t, ev.c2_molina - 0.3, 0.4), name: 'MARIO MOLINA', hair: 1, seed: 1 });
    P.person(ctx, 680, 900, 1.05, t, { pose: t > ev.c2_destroy ? 'point' : 'stand', k: P.fin(t, ev.c2_rowland - 0.3, 0.4), name: 'F. SHERWOOD ROWLAND', seed: 3 });
    P.note(ctx, 'Nobel Prize, 1995', null, null, 490, 1050, t, ev.c2_rowland + 0.6, { size: 40, color: C.ink2 });
    ctx.save(); ctx.globalAlpha *= P.fin(t, ev.c2_s2, 0.5); ctx.fillStyle = C.accW; ctx.fillRect(900, 140, 1020, 150); ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(900, 0, 1020, H); ctx.clip(); P.ozoneBand(ctx, t, 140, 290, { k: P.fin(t, ev.c2_s2, 0.6), n: 12, r: 12, hx: 1400, hw: 200 * P.fin(t, ev.c2_destroy, 0.8) }); ctx.restore();
    P.ground(ctx, 960, P.dk(t, ev.c2_s2, 0.6));
    const path = [[1100, 940], [1200, 760], [1340, 600], [1300, 420], [1400, 220]];
    P.art(ctx, [{ pts: path, dash: [12, 12] }], P.dk(t, ev.c2_drift - 0.2, 1.4), { lw: 3, color: C.ink2 });
    const u = P.eio((t - ev.c2_cfc) / ((ev.c2_destroy - ev.c2_cfc) || 1)); const p = P.along(path, u);
    P.cfc(ctx, p[0], p[1], 22, t, { k: P.dk(t, ev.c2_cfc - 0.2, 0.5), rot: t * 0.8 });
    P.tag(ctx, 'CFCs', p[0] + 120, p[1] + 10, t, ev.c2_cfc, ev.c2_destroy, { size: 40, fill: C.acc, color: C.pap });
    if (t > ev.c2_destroy) P.burst(ctx, 1400, 220, t, ev.c2_destroy, { colors: [C.acc, C.ink, C.acc], r: 150 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — CFCs everywhere: spray cans, fridges, air conditioners, foam · cheap / safe / never break down — the problem
  P.shot(ev.c2_s3, (ctx, t) => {
    P.bgLine(ctx, t);
    P.head(ctx, 'CFCs WERE EVERYWHERE', 960, 140, t, ev.c2_every - 0.2, { size: 66, hl: ['EVERYWHERE'] });
    P.can(ctx, 300, 700, 1.15, t, { k: P.dk(t, ev.c2_can - 0.3, 0.6), spray: P.fin(t, ev.c2_can, 0.3) * 0.8 });
    P.fridge(ctx, 720, 720, 1.0, t, { k: P.dk(t, ev.c2_fr - 0.3, 0.6) });
    P.ac(ctx, 1170, 560, 1.0, t, { k: P.dk(t, ev.c2_acx - 0.3, 0.6) });
    const fk = P.dk(t, ev.c2_foam - 0.3, 0.6); P.art(ctx, [{ pts: P.rrPts(1490, 470, 260, 230, 16), fill: C.pap }], fk, { lw: 4.5 }); if (fk > 0.8) for (let i = 0; i < 14; i++) P.circ(ctx, 1520 + U.hash(i, 1) * 200, 500 + U.hash(i, 2) * 170, 6 + U.hash(i, 3) * 10, C.ink3);
    P.small(ctx, 'FOAM', 1620, 740, { align: 'center', alpha: fk });
    [['CHEAP', ev.c2_cheap, 400], ['SAFE TO TOUCH', ev.c2_safe, 900], ['NEVER BREAK DOWN', ev.c2_never, 1450]].forEach(([s2, t0, x]) => P.tag(ctx, s2, x, 900, t, t0, 1e9, { size: 46, fill: C.pap, color: C.ink, border: C.ink }));
    P.circle(ctx, 1450, 900, 290, 70, P.dk(t, ev.c2_prob, 0.6));
    P.note(ctx, 'exactly the problem', 1450, 970, 1450, 1010, t, ev.c2_prob + 0.2, { size: 50 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — up high: UV breaks the CFC, a chlorine atom flies off and breaks ozone again… and again… thousands of times
  P.shot(ev.c2_s4, (ctx, t) => {
    P.bgLine(ctx, t);
    P.sunL(ctx, 160, 150, 50, t, { k: P.dk(t, ev.c2_s4, 0.6) });
    P.uv(ctx, 220, 200, 470, 470, clamp((t - ev.c2_sunl + 0.5) / 0.5), { lw: 6 });
    const T1 = ev.c2_again1, T2 = ev.c2_again2; const targets = [[900, 420], [1250, 640], [1600, 380]];
    P.cfc(ctx, 520, 540, 34, t, { k: P.dk(t, ev.c2_s4 + 0.1, 0.6), lose: t > ev.c2_apart ? 1 : 0 });
    // the chlorine atom's path: CFC → target 0 → target 1 → target 2
    const path = [[520 + 34 * 2.1, 540], targets[0], targets[1], targets[2]]; const keys = [ev.c2_apart, T1 - 0.05, T2 - 0.05, ev.c2_thou + 0.6];
    let cx = path[0][0], cy = path[0][1];
    for (let i = 0; i < 3; i++) { if (t >= keys[i]) { const u = P.eio((t - keys[i]) / (keys[i + 1] - keys[i])); cx = lerp(path[i][0], path[i + 1][0], u); cy = lerp(path[i][1], path[i + 1][1], u) - Math.sin(u * Math.PI) * 80; } }
    targets.forEach(([x, y], i) => { const hitT = keys[i + 1]; const br = P.eio((t - hitT) / 0.6); P.o3(ctx, x, y, 26, t, { k: P.dk(t, ev.c2_s4 + 0.3 + i * 0.15, 0.6), broken: br, seed: i }); if (t > hitT) P.ring(ctx, x, y, t, hitT, { r: 90, color: C.acc }); });
    if (t > ev.c2_apart) { P.atom(ctx, cx, cy, 30, 'Cl', { col: C.acc, fill: C.pap }); }
    P.note(ctx, 'chlorine', null, null, 600, 760, t, ev.c2_cl, { size: 50, t1: T1 });
    P.write(ctx, 'AGAIN…', 900, 260, t, T1, { size: 54, weight: 900, color: C.acc }); P.write(ctx, 'AND AGAIN…', 1250, 820, t, T2, { size: 54, weight: 900, color: C.acc });
    P.stamp(ctx, 'THOUSANDS OF TIMES', 1180, 980, t, ev.c2_thou, { size: 62, color: C.acc, rot: -0.03 });
    Ch.ozzy(ctx, { x: 1760, y: 1060, s: 0.55, t, dir: -1, gesture: t > T1 ? 'worried' : 'idle', eyes: t > T1 ? 'wide' : 'open', sweat: P.fin(t, T1, 0.5), mouth: P.talk(t), look: -1 });
  }, { in: { type: 'iris', at: [520, 540], dur: 0.6, color: C.ink } });

  // S5 — May 1985: Halley station, Farman · Gardiner · Shanklin (BAS) — October ozone dropping by about a third
  P.shot(ev.c2_s5, (ctx, t) => {
    P.bgLine(ctx, t);
    P.stamp(ctx, 'MAY 1985', 230, 140, t, ev.c2_may, { size: 74, color: C.acc, rot: -0.04 });
    P.station(ctx, 460, 720, 0.9, t, { k: P.dk(t, ev.c2_s5 + 0.1, 0.9) }); P.ground(ctx, 720, P.dk(t, ev.c2_s5, 0.6));
    P.note(ctx, 'Halley station, Antarctica', 460, 470, 600, 330, t, ev.c2_halley - 0.3, { size: 42 });
    [['JOE FARMAN', ev.c2_farman], ['BRIAN GARDINER', ev.c2_gard], ['JONATHAN SHANKLIN', ev.c2_shank]].forEach(([nm, t0], i) => P.person(ctx, 170 + i * 310, 950, 0.62, t, { k: P.fin(t, t0 - 0.2, 0.4), name: nm, seed: i, pose: i === 1 ? 'hold' : 'stand', prop: i === 1 ? 'clip' : null }));
    P.small(ctx, 'BRITISH ANTARCTIC SURVEY', 460, 1060, { align: 'center', size: 26, alpha: P.fin(t, ev.c2_bas, 0.4) });
    // chart: October ozone over Halley, relative to the 1960s
    const x0 = 1020, y0 = 260, w = 760, h = 520; const ck = P.dk(t, ev.c2_pub - 0.2, 0.7);
    P.card(ctx, x0 - 40, y0 - 90, w + 80, h + 200, ck);
    G.text(ctx, 'OCTOBER OZONE OVER HALLEY', x0 + w / 2, y0 - 30, { size: 34, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0, alpha: ck });
    P.dLine(ctx, x0, y0 + h, x0 + w, y0 + h, ck, { lw: 4 }); P.dLine(ctx, x0, y0, x0, y0 + h, ck, { lw: 4 });
    P.small(ctx, '1960s', x0, y0 + h + 44, { size: 28, alpha: ck }); P.small(ctx, '1984', x0 + w, y0 + h + 44, { size: 28, align: 'right', alpha: ck });
    const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; const v = 1 - 0.34 * Math.pow(clamp((u - 0.45) / 0.55), 1.4) + 0.03 * Math.sin(i * 1.7); pts.push([x0 + u * w, y0 + h - v * h * 0.85]); }
    P.art(ctx, [pts], P.dk(t, ev.c2_oct, (ev.c2_third - ev.c2_oct) + 0.2), { lw: 6, color: C.acc });
    P.dLine(ctx, x0, y0 + h - h * 0.85, x0 + w, y0 + h - h * 0.85, P.fin(t, ev.c2_oct, 0.4), { lw: 2, color: C.ink3, dash: [8, 8] });
    P.dim(ctx, x0 + w + 20, y0 + h - h * 0.85, x0 + w + 20, y0 + h - h * 0.85 * 0.66, '', P.fin(t, ev.c2_third, 0.5), { color: C.acc });
    P.stamp(ctx, '≈ −⅓', x0 + w - 120, y0 + 120, t, ev.c2_third, { size: 70, color: C.acc, rot: -0.05 });
    P.source(ctx, 'Farman, Gardiner & Shanklin, Nature, May 1985 · UKRI', t, ev.c2_pub);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — a hole over Antarctica; within 2½ years, a deal
  P.shot(ev.c2_s6, (ctx, t) => {
    P.bgLine(ctx, t);
    const hole = P.eio((t - ev.c2_hole + 0.3) / 1.0);
    P.globe(ctx, 640, 560, 380, t, { lon0: t * 3, lat0: -75, k: P.dk(t, ev.c2_s6, 0.8), hole });
    P.head(ctx, 'A HOLE', 640, 140, t, ev.c2_hole, { size: 80, hl: ['HOLE'] });
    const ck = P.dk(t, ev.c2_next - 0.2, 0.5); P.card(ctx, 1220, 250, 520, 330, ck);
    const flip = t > ev.c2_25 ? 1 : 0; G.text(ctx, flip ? 'SEP 1987' : 'MAY 1985', 1480, 450, { size: 80, fam: 'Inter', weight: 900, color: flip ? C.acc : C.ink, align: 'center', boil: 0, alpha: ck });
    P.lcount(ctx, { x: 1480, y: 760, from: 0, to: 2.5, decimals: 1, t, t0: ev.c2_25 - 0.1, t1: ev.c2_25 + 0.8, size: 110, suffix: ' YEARS', fmt: (v) => (v >= 2.45 ? '2½' : v.toFixed(1)) });
    P.stamp(ctx, 'A DEAL', 1480, 950, t, ev.c2_deal, { size: 74, color: C.acc, rot: 0.03 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });
})();
