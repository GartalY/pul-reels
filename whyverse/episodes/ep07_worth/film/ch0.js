// Cold open — an auction house: "Lot number one: Planet Earth" · bids (a million? a billion? every coin?) · add it all up: > $500 trillion ·
// the number leaves out the most valuable thing (not gold, oil, land) · the promise (3 cards, Pip arrives) · title.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C; const A = P.A;
  const W = G.W, H = G.H;
  P.gavelAt = (ctx, x, y, ang, s = 1, k = 1) => { ctx.save(); ctx.translate(x, y); ctx.rotate(ang); P.art(ctx, A.gavel(s), k, { x: 0, y: -260 * s }); ctx.restore(); };
  P.drop = (r = 60) => [{ pts: [[0, -r * 1.6], ...P.circPts(0, 0, r, 30, -Math.PI * 0.15, Math.PI * 1.15)].concat([[0, -r * 1.6]]), closed: true, fill: 'rgba(234,244,255,0.12)' }];
  P.landPts = (w = 200) => [{ pts: [[-w / 2, 0], [-w * 0.2, -w * 0.35], [0, -w * 0.18], [w * 0.22, -w * 0.45], [w / 2, 0]], closed: true, fill: 'rgba(110,231,183,0.2)' }, [[-w / 2, 0], [w / 2, 0]]];

  // S1 — the auction house; the lights dim, the hammer rises, LOT 001: PLANET EARTH, everything on it and everyone
  P.shot(ev.c0_s1, (ctx, t, s) => {
    ctx.save(); P.push(ctx, s.u, 900, 560, 0.03);
    P.bp(ctx, t);
    // hall: two columns + an arch
    const hk = P.eio((t - 0.0) / 1.3);
    for (const cx of [210, 1710]) P.art(ctx, [P.rectPts(cx - 50, 200, 100, 780), [[cx - 80, 200], [cx + 80, 200]], [[cx - 80, 980], [cx + 80, 980]], [[cx - 20, 230], [cx - 20, 950]], [[cx + 20, 230], [cx + 20, 950]]], hk, { lw: 4, color: C.ln2 });
    P.art(ctx, [P.circPts(960, 420, 760, 80, Math.PI * 1.12, Math.PI * 1.88, 300)], hk, { lw: 4, color: C.ln2 });
    P.dim(ctx, 160, 1010, 1760, 1010, 'AUCTION HALL · SECTION A–A', P.fin(t, ev.c0_house + 0.6, 0.9), { size: 26, color: C.ln2 });
    // pedestal + the lot
    P.art(ctx, [{ pts: [[560, 980], [840, 980], [800, 940], [780, 720], [620, 720], [600, 940]], closed: true, fill: 'rgba(234,244,255,0.07)' }, [[580, 720], [820, 720]]], P.eio((t - 0.15) / 1.0), { lw: 4.5 });
    P.ytag(ctx, 'LOT No. 001', 700, 830, t, ev.c0_lot, 1e9, { size: 36 });
    const gk = P.oc((t - ev.c0_earth + 0.15) / 1.3);
    P.globe(ctx, 700, 470, 215, t, { lon0: 20 + t * 9, lat0: 18, k: gk });
    P.ring(ctx, 700, 470, t, ev.c0_earth, { r: 300, color: C.yel });
    P.note(ctx, 'Planet Earth', 920, 330, 1060, 250, t, ev.c0_earth + 0.1, { size: 54 });
    // everyone: tiny figures around the globe
    for (let i = 0; i < 9; i++) { const a = -2.6 + i * 0.4; const k = P.pop(t, ev.c0_everyone + i * 0.05, 0.3); if (k > 0) P.person(ctx, 700 + Math.cos(a) * 248, 470 + Math.sin(a) * 248, 0.22 * k, t, { seed: i, color: C.yel, fill: 'rgba(255,213,74,0.2)', lw: 3, a: 1 }); }
    // auctioneer + podium + gavel
    P.person(ctx, 1360, 760, 1.05, t, { pose: 'arms', k: P.fin(t, 0.35, 0.5) });
    P.art(ctx, A.podium(320), P.eio((t - 0.1) / 1.0), { x: 1360, y: 980 });
    const up = P.eio((t - ev.c0_hammer) / 0.5); const ang = lerp(0.35, -0.75, up) + (up >= 1 ? Math.sin(t * 2.2) * 0.04 : 0);
    P.gavelAt(ctx, 1440, 560, ang, 0.55, P.fin(t, 0.4, 0.6));
    // the lights dim: everything outside the spotlight darkens
    const dk = P.fin(t, ev.c0_dim, 0.7);
    if (dk > 0) { ctx.save(); const g = ctx.createRadialGradient(900, 560, 260, 900, 560, 1100); g.addColorStop(0, 'rgba(4,20,40,0)'); g.addColorStop(1, `rgba(4,20,40,${0.55 * dk})`); ctx.fillStyle = g; ctx.fillRect(-200, -200, W + 400, H + 400); ctx.restore(); }
    ctx.restore();
    P.write(ctx, '“Lot number one…”', 1400, 190, t, ev.c0_lot - 0.3, { size: 50, fam: P.HAND, weight: 400, color: C.ln });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — the bids: a million? a billion? every coin in every pocket?
  P.shot(ev.c0_s2, (ctx, t, s) => {
    P.bp(ctx, t);
    P.globe(ctx, 960, 300, 170, t, { lon0: 60 + t * 9, k: 1 });
    P.ytag(ctx, 'LOT 001 · PLANET EARTH', 960, 520, t, ev.c0_s2 + 0.1, 1e9, { size: 34 });
    const bids = [[3, ev.c0_mil, '$1M'], [5, ev.c0_bil, '$1B']];
    for (let i = 0; i < 8; i++) { const x = 170 + i * 225, b = bids.find((q) => q[0] === i); const raise = b && t > b[1] - 0.1;
      P.person(ctx, x, 1130, 1.15, t, { pose: raise ? 'raise' : 'stand', prop: raise ? 'paddle' : null, num: b ? b[2] : '', seed: i, fill: 'rgba(7,39,72,0.85)' }); }
    P.note(ctx, 'a million?', 845, 690, 700, 600, t, ev.c0_mil, { size: 52 });
    P.note(ctx, 'a billion?', 1295, 690, 1440, 600, t, ev.c0_bil, { size: 52 });
    // every coin in every pocket: coins rain
    const ck = t - ev.c0_coin; if (ck > -0.1) for (let i = 0; i < 26; i++) { const st = U.hash(i, 4) * 0.8; const u = ck - st; if (u < 0) continue; const x = 80 + U.hash(i, 5) * 1760, y = -80 + u * u * 900 + u * 200; if (y > 1200) continue; P.art(ctx, A.coin(26 + U.hash(i, 6) * 16), 1, { x, y, rot: u * 3 + i, lw: 3.5 }); }
    P.stamp(ctx, 'EVERY COIN?', 960, 640, t, ev.c0_coin + 0.15, { size: 64, color: C.yel, fg: C.ink2 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — add it all up: every home + every company + every bar of gold = more than $500 trillion
  P.shot(ev.c0_s3, (ctx, t, s) => {
    P.bp(ctx, t);
    P.kicker(ctx, 'add it all up', t, ev.c0_s3 + 0.1, { color: C.yel });
    const items = [[ev.c0_home, (k) => P.art(ctx, A.house(230), k, { x: 380, y: 520 }), 'every home'], [ev.c0_comp, (k) => P.art(ctx, A.factory(300), k, { x: 960, y: 520 }), 'every company'], [ev.c0_gold, (k) => { for (let j = 0; j < 3; j++) P.art(ctx, A.bar(170), k, { x: 1480 + (j - 1) * 90 + (j === 1 ? 0 : 0), y: 520 - (j === 1 ? 52 : 0) }); }, 'every bar of gold']];
    items.forEach(([t0, f, lab], i) => { const k = P.oc((t - t0 + 0.2) / 0.9); f(k); P.note(ctx, lab, null, null, [380, 960, 1500][i], 600, t, t0 + 0.2, { size: 44, color: C.ln });
      if (i < 2) { const pk = P.pop(t, t0 + 0.5, 0.3); if (pk > 0) G.text(ctx, '+', [670, 1230][i], 440, { size: 110 * pk, fam: 'Bungee', color: C.yel, align: 'center', boil: 0 }); } });
    const ch = [[380, 300], [960, 280], [1500, 330]]; const ci = t < ev.c0_comp ? 0 : t < ev.c0_gold ? 1 : 2; const prev = ch[Math.max(0, ci - 1)], cur = ch[ci]; const ct = [ev.c0_home, ev.c0_comp, ev.c0_gold][ci]; const mv = P.eio((t - ct + 0.3) / 0.4);
    P.crosshair(ctx, lerp(prev[0], cur[0], mv), lerp(prev[1], cur[1], mv), P.fin(t, ev.c0_home - 0.3, 0.3) * P.fout(t, ev.c0_totala, 0.3));
    P.line(ctx, 200, 680, 1720, 680, C.ln, 5, 1, P.eio((t - ev.c0_totala + 0.4) / 0.5));
    P.bcount(ctx, { x: 960, y: 860, to: 500, t, t0: ev.c0_totala, t1: ev.c0_total, size: 130, prefix: '$', suffix: ' TRILLION +', sub: '' });
  }, { in: { type: 'fade', dur: 0.35 } });

  // S4 — that giant number leaves out the most valuable thing. It isn't gold, oil or land.
  P.shot(ev.c0_s4, (ctx, t, s) => {
    P.bp(ctx, t);
    const lift = P.eio((t - ev.c0_s4) / 0.6);
    P.digits(ctx, '$500 TRILLION +', 960, lerp(860, 250, lift), { size: lerp(130, 92, lift) });
    P.note(ctx, 'the strange part…', null, null, 960, 120, t, ev.c0_strange, { size: 50 });
    // the missing piece: a dashed slot with a question mark
    const mk = P.fin(t, ev.c0_leaves, 0.6); if (mk > 0) { ctx.save(); ctx.globalAlpha *= mk; ctx.strokeStyle = C.yel; ctx.lineWidth = 5; ctx.setLineDash([18, 14]); ctx.lineDashOffset = -t * 40; ctx.strokeRect(780, 360, 360, 300); ctx.setLineDash([]);
      G.text(ctx, '?', 960, 580 + Math.sin(t * 3) * 6, { size: 220, fam: 'Bungee', color: C.yel, align: 'center', boil: 0, alpha: 0.6 + 0.4 * Math.sin(t * 4) ** 2 }); ctx.restore(); }
    P.ytag(ctx, 'MISSING: THE MOST VALUABLE THING', 960, 705, t, ev.c0_valuable, 1e9, { size: 38 });
    const nots = [[ev.c0_notgold, 420, (k) => P.art(ctx, A.bar(190), k, { x: 420, y: 890 }), 'GOLD'], [ev.c0_notoil, 960, (k) => P.art(ctx, P.drop(56), k, { x: 960, y: 860 }), 'OIL'], [ev.c0_notland, 1420, (k) => P.art(ctx, P.landPts(260), k, { x: 1400, y: 890 }), 'LAND']];
    for (const [t0, x, f, lab] of nots) { const k = P.oc((t - t0 + 0.5) / 0.5); f(k); G.text(ctx, lab, x + 185, 890, { size: 40, fam: 'Inter', weight: 800, color: C.ln2, align: 'center', alpha: k, boil: 0 }); P.cross(ctx, x - 130, 760, x + 130, 920, (t - t0) / 0.35); }
  }, { in: { type: 'fade', dur: 0.3 } });

  // S5 — the promise: three questions; Pip, the drafting robot, flies in
  P.shot(ev.c0_s5, (ctx, t, s) => {
    P.bp(ctx, t);
    const Q = [[ev.c0_q1, 'THE PRICE TAG ON THE WHOLE WORLD'], [ev.c0_q2, 'WHAT THAT NUMBER IS MISSING'], [ev.c0_q3, 'WHY IT MIGHT HAVE NO PRICE AT ALL']];
    Q.forEach(([t0, txt], i) => { const k = P.pop(t, t0 - 0.1, 0.4); if (k <= 0) return; const y = 300 + i * 220;
      P.panel(ctx, 140, y - 80, 1100, 160, clamp(k)); P.digits(ctx, String(i + 1), 230, y + 40, { size: 100, land: Math.exp(-(t - t0) * 3) });
      P.write(ctx, txt, 320, y + 18, t, t0, { size: 48, align: 'left', color: C.ln, weight: 800 }); });
    const fx = lerp(2150, 1560, P.oc((t - ev.c0_pip) / 0.9));
    Ch.pip(ctx, { x: fx, y: 860, s: 1.25, t, dir: -1, gesture: t > ev.c0_q1 ? 'point' : 'wave', mouth: 0, look: -1 });
    P.note(ctx, 'hi, I’m Pip!', null, null, 1560, 400, t, ev.c0_pip + 0.9, { size: 46, t1: ev.c0_q2 });
  }, { in: { type: 'wipe', dir: 'left', dur: 0.5 } });

  // S6 — "So, how much is the whole world actually worth?" → TITLE (words slam in, no voice) → WHYVERSE
  P.shot(ev.c0_s6, (ctx, t, s) => {
    P.bp(ctx, t);
    const tw = ev.titleWords; const into = P.eio((t - ev.title0) / 0.8);
    P.globe(ctx, lerp(960, 960, into), lerp(560, 600, into), lerp(330, 380, into), t, { lon0: 100 + t * 12, lat0: 20, k: 1, a: lerp(1, 0.55, into) });
    Ch.pip(ctx, { x: lerp(1500, 1650, into), y: 900, s: 1.0, t, dir: -1, gesture: t > ev.titleBrand ? 'cheer' : 'pointUp', mouth: P.talk(t), look: -1, eyes: t > ev.titleBrand ? 'happy' : 'open' });
    const rows = [[[0, 1, 2, 3], 290, 100], [[4, 5], 510, 150], [[6], 760, 190]]; const pos = [];
    for (const [ids, y, sz] of rows) { const ws = ids.map((i) => P.measure(ctx, tw[i].w, sz, 'Inter', 800) + 70); const tot = ws.reduce((a, b) => a + b, 0) + 34 * (ids.length - 1); let x = 960 - tot / 2; ids.forEach((i, j) => { pos[i] = [x + ws[j] / 2, y, sz]; x += ws[j] + 34; }); }
    tw.forEach((w, i) => { const [x, y, sz] = pos[i]; P.stamp(ctx, w.w, x, y, t, w.t, { size: sz, color: i === 6 ? C.yel : C.ink2, fg: i === 6 ? C.ink2 : C.ln, rot: [-0.03, 0.02, -0.01, 0.03, -0.02, 0.02, -0.025][i] }); });
    const bk = P.pop(t, ev.titleBrand, 0.4); if (bk > 0) { P.planetBP(ctx, 740, 965, 34 * bk, t, 1); G.text(ctx, 'WHYVERSE', 1030, 990, { size: 64, fam: 'Bungee', color: C.yel, align: 'center', alpha: clamp(bk), boil: 0 }); }
    P.dim(ctx, 520, 860, 1400, 860, '', P.fin(t, tw[6].t + 0.2, 0.6));
  }, { in: { type: 'fade', dur: 0.4 } });
})();
