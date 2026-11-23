// Chapter 3 — How the world said yes: Montreal Protocol, 16 Sep 1987, cut CFCs step by step · reason 1: few makers (5 in the US;
// DuPont 1988: we'll stop) · reason 2: replacements, daily life barely changed · reason 3: money ($5 bn+ pledged, 144 countries) ·
// tightened again and again · 2009: every country · ~99 % gone · the twist
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L } = S; const C = P.C;
  const W = G.W, H = G.H;
  P.cardShot('c3', 3, 'How the world said yes', (ctx, t) => { P.doc(ctx, 1800, 960, 0.4, t, { k: P.dk(t, S.CH.c3.t0 + 0.3, 0.8), sig: P.fin(t, S.CH.c3.t0 + 0.9, 1.5), n: 6, rot: 0.06 }); });
  const reason = (ctx, n, s, t, t0) => { const k = P.pop(t, t0, 0.4); if (k <= 0) return; P.at(ctx, 110, 120, k, 0, () => { P.circ(ctx, 0, 0, 46, C.acc); G.text(ctx, String(n), 0, 24, { size: 64, fam: 'Inter', weight: 900, color: C.pap, align: 'center', boil: 0 }); });
    P.write(ctx, s, 180, 140, t, t0 + 0.1, { size: 58, align: 'left', weight: 900 }); };

  // S1 — 16 Sep 1987: the Montreal Protocol + a staircase "cut CFCs, step by step"
  P.shot(ev.c3_s1, (ctx, t) => {
    P.bgLine(ctx, t);
    P.doc(ctx, 520, 560, 1.4, t, { k: P.dk(t, ev.c3_s1 + 0.1, 0.9), title: 'MONTREAL PROTOCOL', sig: P.fin(t, ev.c3_mp, 1.6), n: 6, stamp: t > ev.c3_date ? '16 SEP 1987' : '' });
    P.stamp(ctx, 'MONTREAL PROTOCOL', 520, 120, t, ev.c3_mp, { size: 60, color: C.ink, fg: C.pap, rot: -0.02 });
    const x0 = 1040, y0 = 280, w = 760, h = 520; const ck = P.dk(t, ev.c3_plan - 0.2, 0.6);
    P.dLine(ctx, x0, y0 + h, x0 + w, y0 + h, ck, { lw: 4 }); P.dLine(ctx, x0, y0, x0, y0 + h, ck, { lw: 4 });
    P.small(ctx, 'CFCs ALLOWED', x0, y0 - 24, { size: 30, alpha: ck });
    const steps = [[0, 1], [0.25, 1], [0.25, 0.8], [0.5, 0.8], [0.5, 0.5], [0.75, 0.5], [0.75, 0.15], [1, 0.15]].map(([u, v]) => [x0 + u * w, y0 + h - v * h * 0.9]);
    P.art(ctx, [steps], clamp((t - ev.c3_plan) / ((ev.c3_step2 - ev.c3_plan) + 0.8)), { lw: 7, color: C.acc });
    P.note(ctx, 'step by step', null, null, x0 + w / 2 + 80, y0 + 60, t, ev.c3_step, { size: 54 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — reason 1: only a few makers (five in the US); 1988 the biggest, DuPont: "we'll stop"
  P.shot(ev.c3_s2, (ctx, t) => {
    P.bgLine(ctx, t);
    reason(ctx, 1, 'ONLY A FEW MAKERS', t, ev.c3_r1);
    for (let i = 0; i < 5; i++) { const big = i === 2; P.factory(ctx, 220 + i * 360, 900, big ? 0.95 : 0.62, t, { k: P.dk(t, ev.c3_few + i * 0.12, 0.6), smoke: t > ev.c3_stop + 0.3 && big ? 0 : 1, n: big ? 3 : 2 }); }
    P.lcount(ctx, { x: 1700, y: 330, from: 0, to: 5, t, t0: ev.c3_five - 0.3, t1: ev.c3_five + 0.2, size: 170 });
    P.small(ctx, 'CFC MAKERS IN THE US', 1700, 390, { align: 'center', alpha: P.fin(t, ev.c3_five, 0.3) });
    P.tag(ctx, 'DUPONT', 940, 950, t, ev.c3_dupont, 1e9, { size: 44, fill: C.pap, color: C.ink, border: C.ink });
    P.stamp(ctx, '1988', 640, 330, t, ev.c3_1988, { size: 62, color: C.acc, rot: -0.04 });
    const bk = P.pop(t, ev.c3_stop - 0.2, 0.45); if (bk > 0) P.at(ctx, 1010, 360, bk, 0.02, () => { P.rect(ctx, -230, -70, 460, 120, 30, C.pap, { stroke: C.ink, lw: 5 }); P.poly(ctx, [[-60, 48], [-100, 130], [-10, 48]], C.pap, { stroke: C.ink, lw: 5 }); P.rect(ctx, -70, 40, 70, 14, 0, C.pap);
      G.text(ctx, 'We\'ll stop making them.', 0, 8, { size: 40, fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0 }); });
    P.source(ctx, 'CS Monitor 1988 · MIT Technology Review', t, ev.c3_five);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — reason 2: replacements existed; your fridge still worked, your deodorant still sprayed
  P.shot(ev.c3_s3, (ctx, t) => {
    P.bgLine(ctx, t);
    reason(ctx, 2, 'REPLACEMENTS WERE READY', t, ev.c3_r2);
    P.fridge(ctx, 520, 900, 1.15, t, { k: P.dk(t, ev.c3_r2 + 0.2, 0.7) });
    P.can(ctx, 1000, 900, 1.3, t, { k: P.dk(t, ev.c3_r2 + 0.5, 0.7), spray: P.fin(t, ev.c3_deo, 0.3) });
    [[520, 420, ev.c3_repl + 0.1], [1000, 560, ev.c3_repl + 0.25]].forEach(([x, y, t0]) => { const flip = P.eio((t - t0 - 0.5) / 0.35); const tk = P.pop(t, t0, 0.3); if (tk <= 0) return;
      P.at(ctx, x, y, tk, 0, () => { ctx.scale(1, Math.abs(Math.cos(flip * Math.PI)) + 0.001); const lab = flip < 0.5 ? 'CFC' : '✓ NEW GAS'; const w = P.measure(ctx, lab, 40, 'Inter', 900) + 36; ctx.fillStyle = flip < 0.5 ? C.acc : C.pap; ctx.fillRect(-w / 2, -32, w, 60); ctx.strokeStyle = flip < 0.5 ? C.acc : C.ink; ctx.lineWidth = 4; ctx.strokeRect(-w / 2, -32, w, 60); G.text(ctx, lab, 0, 12, { size: 40, fam: 'Inter', weight: 900, color: flip < 0.5 ? C.pap : C.ink, align: 'center', boil: 0 }); }); });
    Ch.ozzy(ctx, { x: 1550, y: 960, s: 0.95, t, dir: -1, gesture: t > ev.c3_barely ? 'cheer' : 'point', eyes: t > ev.c3_barely ? 'happy' : 'open', mouth: P.talk(t), look: -1 });
    P.note(ctx, 'daily life barely changed', null, null, 1450, 360, t, ev.c3_barely, { size: 56 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — reason 3: money — a fund for developing countries: $5 billion+ pledged, 144 countries helped
  P.shot(ev.c3_s4, (ctx, t) => {
    P.bgLine(ctx, t);
    reason(ctx, 3, 'MONEY TO HELP', t, ev.c3_r3);
    for (let i = 0; i < 12; i++) { const x = 300 + (i % 4) * 60 + Math.floor(i / 4) * 12, y = 900 - Math.floor(i / 4) * 0 - (i % 4) * 0 - Math.floor(i / 1) * 38; P.bill(ctx, 380 + (i % 2) * 20, 920 - i * 42, 1.1, { k: P.dk(t, ev.c3_money + i * 0.1, 0.4), rot: (i % 3 - 1) * 0.05 }); }
    P.write(ctx, 'MULTILATERAL FUND', 420, 300, t, ev.c3_fund, { size: 42, weight: 900, color: C.ink2 });
    P.lcount(ctx, { x: 1240, y: 520, from: 0, to: 5, t, t0: ev.c3_5bn - 0.1, t1: ev.c3_5bnE, size: 190, prefix: '$', suffix: ' BILLION+', fmt: (v) => Math.round(v) });
    P.small(ctx, 'PLEDGED SO FAR', 1240, 590, { align: 'center', size: 36, alpha: P.fin(t, ev.c3_5bnE, 0.4) });
    const n = 144; for (let i = 0; i < n; i++) { const c = i % 24, r = Math.floor(i / 24); const q = P.pop(t, ev.c3_144 - 0.6 + (i / n) * 0.9, 0.2); if (q <= 0) continue; ctx.save(); ctx.fillStyle = C.acc; ctx.beginPath(); ctx.arc(800 + c * 38, 720 + r * 38, 11 * q, 0, 7); ctx.fill(); ctx.restore(); }
    P.write(ctx, '144 DEVELOPING COUNTRIES HELPED', 1240, 1000, t, ev.c3_144 + 0.2, { size: 44, weight: 900 });
    P.source(ctx, 'multilateralfund.org', t, ev.c3_5bnE);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S5 — it could be tightened whenever the science got scarier — and it was, again and again (a ratchet)
  P.shot(ev.c3_s5, (ctx, t) => {
    P.bgLine(ctx, t);
    const x0 = 260, y0 = 220, w = 1400, h = 640; P.dLine(ctx, x0, y0 + h, x0 + w, y0 + h, P.dk(t, ev.c3_s5, 0.5), { lw: 4 }); P.dLine(ctx, x0, y0, x0, y0 + h, P.dk(t, ev.c3_s5, 0.5), { lw: 4 });
    P.small(ctx, 'CFCs ALLOWED', x0, y0 - 24, { size: 30, alpha: P.fin(t, ev.c3_s5, 0.4) });
    const lv = [0.9, 0.6, 0.3, 0.05]; const hits = [ev.c3_s5, ev.c3_was, ev.c3_ag1, ev.c3_ag2];
    let cur = lv[0]; for (let i = 1; i < 4; i++) cur = lerp(cur, lv[i], P.eio((t - hits[i]) / 0.3));
    const pts = []; for (let i = 0; i <= 60; i++) { const u = i / 60; let v = lv[0]; for (let j = 1; j < 4; j++) { const ux = 0.2 + j * 0.2; if (u > ux) v = lerp(v, lv[j], P.eio((t - hits[j]) / 0.3)); } pts.push([x0 + u * w, y0 + h - v * h]); }
    P.art(ctx, [pts], P.dk(t, ev.c3_s5 + 0.2, 0.8), { lw: 7, color: C.acc });
    for (let j = 1; j < 4; j++) { const ux = x0 + (0.2 + j * 0.2) * w; const k = P.pop(t, hits[j], 0.35); if (k > 0) P.at(ctx, ux, y0 + h + 60, k, 0, () => P.tag(ctx, 'TIGHTENED', 0, 0, t, -1, 1e9, { size: 30, fill: C.pap, color: C.acc, border: C.acc })); }
    P.note(ctx, 'when the science got scarier…', null, null, 1180, 220, t, ev.c3_scary - 0.2, { size: 50 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — 2009: the last country joins → every country on Earth; first global environmental treaties ratified by all
  P.shot(ev.c3_s6, (ctx, t) => {
    P.bgLine(ctx, t);
    P.stamp(ctx, '2009', 210, 140, t, ev.c3_2009, { size: 84, color: C.acc, rot: -0.04 });
    const t0 = ev.c3_s6 + 0.2, t1 = ev.c3_earth; const n = 198;
    for (let i = 0; i < n; i++) { const c = i % 20, r = Math.floor(i / 20); const x = 200 + c * 66, y = 290 + r * 60; const q = P.pop(t, t0 + (i / n) * (t1 - t0), 0.25); if (q <= 0) continue; const last = i === n - 1;
      const wv = Math.sin(t * 3 + i) * 3; ctx.save(); ctx.translate(x, y); ctx.scale(q, q); ctx.strokeStyle = C.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-18, 22); ctx.lineTo(-18, -20); ctx.stroke();
      ctx.fillStyle = last ? C.acc : (i % 3 === 0 ? C.accW2 : i % 3 === 1 ? C.pap : C.ink4); ctx.beginPath(); ctx.moveTo(-18, -20); ctx.quadraticCurveTo(0, -20 + wv, 22, -20); ctx.lineTo(22, 4); ctx.quadraticCurveTo(0, 4 + wv, -18, 4); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore(); }
    if (t > ev.c3_last) P.ring(ctx, 200 + 17 * 66, 290 + 9 * 60, t, ev.c3_last + 0.3, { r: 70, color: C.acc });
    P.lcount(ctx, { x: 1700, y: 600, from: 0, to: 198, t, t0, t1, size: 130 }); P.small(ctx, 'OF 198', 1700, 670, { align: 'center', size: 40, alpha: P.fin(t, t0, 0.4) });
    P.stamp(ctx, 'EVERY COUNTRY ON EARTH', 960, 950, t, ev.c3_earth, { size: 64, color: C.acc, rot: -0.02 });
    P.note(ctx, 'the first global environmental treaties ratified by every country', null, null, 960, 1030, t, ev.c3_first, { size: 40, color: C.ink });
    P.source(ctx, 'UNEP Ozone Secretariat', t, ev.c3_first);
  }, { in: { type: 'push', dir: 'up', dur: 0.5 } });

  // S7 — ~99 % of the banned chemicals gone… and a twist
  P.shot(ev.c3_s7, (ctx, t) => {
    P.bgLine(ctx, t);
    P.lcount(ctx, { x: 760, y: 540, from: 0, to: 99, t, t0: ev.c3_99a - 0.1, t1: ev.c3_99, size: 300, prefix: '≈', suffix: '%' });
    P.write(ctx, 'OF THE BANNED CHEMICALS', 760, 680, t, ev.c3_99, { size: 54, weight: 800 });
    P.write(ctx, 'ARE GONE', 760, 750, t, ev.c3_gone, { size: 54, weight: 900, color: C.acc });
    for (let i = 0; i < 10; i++) { const vk = P.eio((t - ev.c3_gone - i * 0.05) / 0.6); P.cfc(ctx, 1380 + (i % 5) * 110, 300 + Math.floor(i / 5) * 140 - vk * 60, 16, t, { k: 1, a: i === 9 ? 1 : 1 - vk, rot: t * 0.5 + i }); }
    Ch.ozzy(ctx, { x: 1600, y: 1010, s: 0.85, t, dir: -1, gesture: t > ev.c3_twist ? 'pointUp' : 'cheer', eyes: t > ev.c3_twist ? 'wide' : 'happy', mouth: P.talk(t), look: -1 });
    P.source(ctx, 'WMO / UNEP Ozone Assessment 2022', t, ev.c3_99);
  }, { in: { type: 'fade', dur: 0.4 } });
})();
