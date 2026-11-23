// Chapter 4 — The accidental climate treaty: MYTH "the ozone hole heats the planet" → two different problems · same culprits: CFCs are
// greenhouse gases thousands of times stronger than CO2 · Nature 2021: without Montreal ≈ 2.5 °C extra by 2100 · gases + UV-burned plants ·
// Kigali 2016 (HFCs, up to 0.5 °C avoided) · healing: ~2040 most of the world, ~2066 Antarctica · so why not carbon dioxide?
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L } = S; const C = P.C;
  const W = G.W, H = G.H;
  P.cardShot('c4', 4, 'The accidental climate treaty', (ctx, t) => { P.thermo(ctx, 1810, 1040, 0.35, 1.2 + 0.2 * Math.sin(t), { k: P.dk(t, S.CH.c4.t0 + 0.3, 0.8), marks: [] }); });
  const venn = (ctx, t, sep, k, { lab = true } = {}) => { const xa = 960 - sep, xb = 960 + sep; P.art(ctx, [{ pts: P.circPts(xa, 560, 300, 70), fill: 'rgba(29,36,66,0.04)' }], k, { lw: 6 }); P.art(ctx, [{ pts: P.circPts(xb, 560, 300, 70), fill: C.accW }], k, { lw: 6, color: C.acc });
    if (lab) { G.text(ctx, 'OZONE HOLE', xa, 220, { size: 50, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0, alpha: clamp(k * 2 - 1) }); G.text(ctx, 'CLIMATE CHANGE', xb, 220, { size: 50, fam: 'Inter', weight: 900, color: C.acc, align: 'center', boil: 0, alpha: clamp(k * 2 - 1) }); } };

  // S1 — MYTH: "the ozone hole is what's heating the planet" ✗ → two different problems
  P.shot(ev.c4_s1, (ctx, t) => {
    P.bgLine(ctx, t);
    const out = P.eio((t - ev.c4_two + 0.2) / 0.5);
    ctx.save(); ctx.translate(0, -out * 700);
    P.stamp(ctx, 'MYTH', 960, 220, t, ev.c4_myth, { size: 80, color: C.acc, rot: -0.04 });
    P.head(ctx, '"THE OZONE HOLE IS', 960, 440, t, ev.c4_myth + 0.2, { size: 82, hl: [] });
    P.head(ctx, 'HEATING THE PLANET"', 960, 550, t, ev.c4_heat - 0.2, { size: 82, hl: ['HEATING'] });
    P.cross(ctx, 480, 360, 1440, 600, P.dk(t, ev.c4_isnt, 0.5), { lw: 14 });
    ctx.restore();
    if (out > 0) { venn(ctx, t, 420 - 60 * out, P.dk(t, ev.c4_two - 0.1, 0.8)); P.write(ctx, 'TWO DIFFERENT PROBLEMS', 960, 990, t, ev.c4_two + 0.3, { size: 60, weight: 900 }); }
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — same culprits: the circles overlap on a CFC; CFC ≈ thousands of times stronger than CO2 as a greenhouse gas
  P.shot(ev.c4_s2, (ctx, t) => {
    P.bgLine(ctx, t);
    const sep = lerp(360, 200, P.eio((t - ev.c4_share) / 0.8)); const mv = P.eio((t - ev.c4_ghg + 0.2) / 0.7);
    ctx.save(); ctx.translate(-mv * 480, -mv * 40); ctx.scale(1 - mv * 0.35, 1 - mv * 0.35); ctx.translate(mv * 330, mv * 200);
    venn(ctx, t, sep, 1); P.cfc(ctx, 960, 560, 26, t, { k: P.dk(t, ev.c4_cfc - 0.2, 0.5), rot: t * 0.6 });
    ctx.restore();
    P.write(ctx, 'SAME CULPRITS', 520, 150, t, ev.c4_share, { size: 60, weight: 900 });
    if (mv > 0) { const x0 = 980; P.cfc(ctx, x0 + 60, 430, 26, t, { k: P.dk(t, ev.c4_ghg, 0.5), rot: t * 0.6 });
      P.write(ctx, '=', x0 + 250, 450, t, ev.c4_thou - 0.3, { size: 90, weight: 900 });
      for (let i = 0; i < 24; i++) { const x = x0 + 330 + (i % 6) * 72, y = 340 + Math.floor(i / 6) * 70; const q = P.pop(t, ev.c4_thou - 0.2 + i * 0.03, 0.25); if (q <= 0) continue; P.at(ctx, x, y, q * 0.55, 0, () => { P.atom(ctx, 0, 0, 22, 'C'); P.atom(ctx, -42, 0, 16, 'O'); P.atom(ctx, 42, 0, 16, 'O'); }); }
      P.write(ctx, 'THOUSANDS × CO₂', x0 + 520, 700, t, ev.c4_thou, { size: 58, weight: 900, color: C.acc });
      P.note(ctx, 'as a greenhouse gas (per kilo)', null, null, x0 + 520, 760, t, ev.c4_co2, { size: 40, color: C.ink2 });
      for (let i = 0; i < 3; i++) { const u = (t * 0.6 + i / 3) % 1; P.art(ctx, [P.wave(x0 + 20, x0 + 100, 560 + u * 60, 8, 2, t * 5 + i)], 1, { lw: 4, color: C.acc, a: (1 - u) * P.fin(t, ev.c4_ghg, 0.4) }); } }
    P.source(ctx, 'IPCC AR5 (CFC-11 ≈ 4,660 × CO₂; CFC-12 ≈ 10,200 ×, 100-yr)', t, ev.c4_thou);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — 2021 model: the world without the Montreal Protocol — ≈ 2.5 °C warmer by 2100, on top of today's warming
  P.shot(ev.c4_s3, (ctx, t) => {
    P.bgLine(ctx, t);
    P.stamp(ctx, 'NATURE, 2021', 300, 290, t, ev.c4_2021, { size: 60, color: C.ink, fg: C.pap, rot: -0.03 });
    P.write(ctx, 'THE WORLD WITHOUT THE TREATY', 1000, 150, t, ev.c4_without, { size: 56, weight: 900, color: C.acc });
    const rise = P.eio((t - ev.c4_25a) / ((ev.c4_25 - ev.c4_25a) + 0.6));
    P.thermo(ctx, 560, 960, 1.15, 0.6, { k: P.dk(t, ev.c4_s3 + 0.2, 0.8), max: 3.2, marks: [] });
    P.thermo(ctx, 1060, 960, 1.15, 0.6 + 2.5 * rise, { k: P.dk(t, ev.c4_without, 0.8), max: 3.2, marks: [] });
    P.small(ctx, 'WITH THE TREATY', 560, 1050, { align: 'center', size: 32, color: C.ink }); P.small(ctx, 'WITHOUT IT', 1060, 1050, { align: 'center', size: 32, color: C.acc, alpha: P.fin(t, ev.c4_without, 0.4) });
    P.lcount(ctx, { x: 1520, y: 470, from: 0, to: 2.5, decimals: 1, t, t0: ev.c4_25a, t1: ev.c4_25, size: 140, prefix: '+', suffix: '°C' });
    P.note(ctx, 'extra, by 2100', null, null, 1520, 540, t, ev.c4_end, { size: 50 });
    P.note(ctx, 'on top of the warming we already have', null, null, 1560, 720, t, ev.c4_top, { size: 40, color: C.ink });
    P.source(ctx, 'Young et al., Nature 2021 (≈ 2.5 °C by 2100)', t, ev.c4_25);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — why: the gases themselves + plants burned by UV soaking up far less carbon
  P.shot(ev.c4_s4, (ctx, t) => {
    P.bgLine(ctx, t);
    P.dLine(ctx, 960, 160, 960, 960, P.dk(t, ev.c4_s4, 0.5), { lw: 3, color: C.ink3 });
    P.write(ctx, 'THE GASES', 480, 170, t, ev.c4_gases - 0.3, { size: 58, weight: 900 }); P.write(ctx, 'THE PLANTS', 1440, 170, t, ev.c4_plants - 0.3, { size: 58, weight: 900 });
    // left: a greenhouse dome trapping heat
    P.art(ctx, [P.circPts(480, 880, 360, 60, Math.PI, Math.PI * 2)], P.dk(t, ev.c4_gases - 0.2, 0.7), { lw: 5 }); P.ground(ctx, 880, 1);
    for (let i = 0; i < 5; i++) { const u = (t * 0.5 + i / 5) % 1; const x = 300 + i * 90; const y = 860 - u * 300; P.art(ctx, [P.wave(x - 20, x + 20, y, 8, 1, t * 4 + i)], 1, { lw: 5, color: C.acc, a: Math.sin(u * Math.PI) * P.fin(t, ev.c4_gases, 0.5) }); }
    for (let i = 0; i < 6; i++) P.cfc(ctx, 220 + i * 105, 560 + Math.sin(t + i) * 16, 11, t, { k: P.dk(t, ev.c4_gases + i * 0.05, 0.4), rot: t + i });
    // right: plants under UV — leaves droop, carbon arrows fade
    const burn = P.fin(t, ev.c4_burn, 1.0);
    for (let i = 0; i < 4; i++) { const x = 1160 + i * 170; const k = P.dk(t, ev.c4_plants + i * 0.1, 0.6); P.dLine(ctx, x, 880, x, 680, k, { lw: 5 });
      for (let j = 0; j < 3; j++) { const y = 700 + j * 50, d = (j % 2 ? 1 : -1); const ang = d * (0.5 + burn * 0.9); if (k > 0.5) P.ell(ctx, x + d * 32, y + burn * 20, 34, 13, burn > 0.5 ? C.pap : C.accW, { rot: ang, stroke: C.ink, lw: 4, a: clamp(k * 2 - 1) }); } }
    for (let i = 0; i < 4; i++) P.uv(ctx, 1200 + i * 170, 260, 1160 + i * 170, 660, clamp((t - ev.c4_burn + 0.3 - i * 0.1) / 0.6), { lw: 4 });
    const ck = 1 - P.fin(t, ev.c4_less, 0.6) * 0.75; for (let i = 0; i < 3; i++) P.carrow(ctx, 1260 + i * 200, 420, 1240 + i * 200, 620, 0.2, P.fin(t, ev.c4_plants + 0.3, 0.6), { color: C.ink, lw: 4 * ck });
    if (t > ev.c4_plants) G.text(ctx, 'CO₂', 1460, 400, { size: 40, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0, alpha: ck });
    P.note(ctx, 'far less carbon soaked up', null, null, 1440, 1000, t, ev.c4_less, { size: 50 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — Kigali 2016: the treaty grows to cut HFCs → up to 0.5 °C avoided by 2100
  P.shot(ev.c4_s5, (ctx, t) => {
    P.bgLine(ctx, t);
    P.doc(ctx, 520, 580, 1.25, t, { k: P.dk(t, ev.c4_s5 + 0.1, 0.8), title: 'KIGALI AMENDMENT', sig: P.fin(t, ev.c4_grew, 1.2), stamp: t > ev.c4_kig ? '2016' : '' });
    P.stamp(ctx, 'KIGALI 2016', 520, 140, t, ev.c4_kig, { size: 66, color: C.acc, rot: -0.03 });
    P.tag(ctx, 'HFCs', 1180, 360, t, ev.c4_hfc, 1e9, { size: 64, fill: C.acc, color: C.pap });
    P.note(ctx, 'some of the gases that replaced CFCs', null, null, 1240, 460, t, ev.c4_repl, { size: 44, color: C.ink });
    P.lcount(ctx, { x: 1380, y: 740, from: 0, to: 0.5, decimals: 1, t, t0: ev.c4_half - 0.5, t1: ev.c4_half, size: 170, prefix: 'up to ', suffix: '°C', fmt: (v) => v.toFixed(1) });
    P.write(ctx, 'OF WARMING AVOIDED BY 2100', 1380, 830, t, ev.c4_half + 0.2, { size: 46, weight: 900 });
    P.source(ctx, 'WMO / UNEP 2023 (0.3–0.5 °C)', t, ev.c4_half);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S6 — healing: the hole shrinks along a timeline — ~2040 most of the world, ~2066 Antarctica
  P.shot(ev.c4_s6, (ctx, t) => {
    P.bgLine(ctx, t);
    const u = P.eio((t - ev.c4_heal) / ((ev.c4_2066 - ev.c4_heal) + 0.4));
    P.globe(ctx, 960, 470, 320, t, { lon0: t * 3, lat0: -72, k: P.dk(t, ev.c4_s6, 0.8), hole: lerp(1, 0.05, u) });
    P.head(ctx, 'HEALING', 960, 100, t, ev.c4_heal, { size: 70, hl: ['HEALING'] });
    const x0 = 260, x1 = 1660, y = 920; P.dLine(ctx, x0, y, x1, y, P.dk(t, ev.c4_heal, 0.6), { lw: 5 });
    const yr = (v) => lerp(x0, x1, (v - 2026) / (2070 - 2026));
    P.art(ctx, [[[x0, y], [lerp(x0, x1, u * 0.91), y]]], 1, { lw: 9, color: C.acc });
    [[2026, 'NOW', ev.c4_heal], [2040, 'MOST OF THE WORLD', ev.c4_2040], [2066, 'ANTARCTICA', ev.c4_2066]].forEach(([v, lab, t0]) => { const k = P.pop(t, t0, 0.35); if (k <= 0) return; P.at(ctx, yr(v), y, k, 0, () => { P.circ(ctx, 0, 0, 16, v === 2026 ? C.ink : C.acc); G.text(ctx, String(v), 0, -40, { size: 48, fam: 'Inter', weight: 900, color: C.ink, align: 'center', boil: 0 }); G.text(ctx, lab, 0, 60, { size: 30, fam: 'Inter', weight: 800, color: C.ink2, align: 'center', boil: 0 }); }); });
    P.note(ctx, 'back to 1980 levels', null, null, 1460, 790, t, ev.c4_2040 + 0.3, { size: 44 });
    P.source(ctx, 'WMO / UNEP Scientific Assessment of Ozone Depletion 2022', t, ev.c4_2040);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S7 — so why can't the world do the same with carbon dioxide? Ozzy faces a big CO2
  P.shot(ev.c4_s7, (ctx, t) => {
    P.bgLine(ctx, t);
    const k = P.dk(t, ev.c4_co2b - 0.4, 0.7); const bob = Math.sin(t * 1.4) * 10;
    P.atom(ctx, 1280, 520 + bob, 120, 'C', { k }); P.atom(ctx, 1050, 520 + bob, 90, 'O', { k }); P.atom(ctx, 1510, 520 + bob, 90, 'O', { k });
    P.bond(ctx, 1160, 520 + bob, 1140, 520 + bob, 0, 0, { k }); P.bond(ctx, 1160, 520 + bob, 1050 + 90, 520 + bob, 0, 0, { k }); P.bond(ctx, 1400, 520 + bob, 1510 - 90, 520 + bob, 0, 0, { k });
    P.write(ctx, 'CARBON DIOXIDE', 1280, 800, t, ev.c4_co2b, { size: 64, weight: 900, color: C.acc });
    Ch.ozzy(ctx, { x: 480, y: 960, s: 1.1, t, gesture: t > ev.c4_co2b ? 'point' : 'think', mouth: P.talk(t), look: 1, eyes: t > ev.c4_co2b ? 'wide' : 'open' });
    const qk = P.pop(t, ev.c4_co2b + 0.4, 0.4); if (qk > 0) P.at(ctx, 1280, 250, qk, 0, () => G.text(ctx, '?', 0, 50, { size: 170, fam: 'Inter', weight: 900, color: C.acc, align: 'center', boil: 0 }));
  }, { in: { type: 'iris', at: [960, 540], dur: 0.6, color: C.ink } });
})();
