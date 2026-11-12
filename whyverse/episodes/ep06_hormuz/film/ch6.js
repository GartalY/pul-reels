// Chapter 6 — Small gap, big price: 1979 (−5 % supply, prices more than doubled) · nobody can stop using oil · the bidding war ·
// crude ≈ half of the US pump price · wheels, wings, keels → everything · door + fuel = a shock to your wallet.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  const yearCard = (ctx, t, t0, s, x, y) => { const k = P.pop(t, t0, 0.4); P.at(ctx, x, y, k, -0.04, () => { P.rect(ctx, -140, -70, 280, 140, 18, C.cream, { shadow: 0.3 }); P.rect(ctx, -140, -70, 280, 40, 18, C.coral); G.text(ctx, s, 0, 52, { size: 72, fam: 'Bungee', color: C.navy, align: 'center', boil: 0 }); }); };
  P.cardShot('c6', 6, 'Small gap, big price', (ctx, t) => { for (let i = 0; i < 8; i++) P.coin(ctx, 120 + i * 240, ((t * 50 + i * 170) % 1300) - 100, 26, { a: 0.12 }); });

  // S1 — 1979: supply fell only ~5 %, prices more than doubled
  P.shot(ev.c6_s1, (ctx, t) => {
    P.bgLight(ctx, t);
    yearCard(ctx, t, ev.c6_1979 - 0.1, '1979', 260, 170);
    // supply: 20 barrels, one lifts away (5 %)
    G.text(ctx, 'OIL SUPPLY', 560, 330, { size: 42, fam: 'Inter', weight: 800, color: C.navy, align: 'center', boil: 0 });
    for (let i = 0; i < 20; i++) { const x = 300 + (i % 5) * 130, y = 520 + Math.floor(i / 5) * 140; const gone = i === 19 ? P.eio((t - ev.c6_5) / 0.8) : 0; P.barrel(ctx, x + gone * 120, y - gone * 260, 0.9, { color: i === 19 ? C.coral : C.oil, a: 1 - gone * 0.8 }); }
    P.tag(ctx, '−5%', 1000, 330, t, ev.c6_5 + 0.2, 1e9, { size: 56, fill: C.coral, color: C.cream });
    // price: a bar that more than doubles
    G.text(ctx, 'PRICE', 1450, 330, { size: 42, fam: 'Inter', weight: 800, color: C.navy, align: 'center', boil: 0 });
    const h0 = 220, h = h0 * (1 + 1.25 * P.oc((t - ev.c6_doubled + 0.3) / 1.0)); P.rect(ctx, 1330, 1000 - h, 240, h, 18, C.coral, { shadow: 0.2 }); P.line(ctx, 1290, 1000 - h0, 1610, 1000 - h0, C.navy, 5, 0.6, 1, [12, 10]);
    P.stamp(ctx, '× 2+', 1450, 1000 - h - 70, t, ev.c6_doubled + 0.6, { size: 70, color: C.navy, fg: C.gold });
    P.source(ctx, 'NPR, "the 1979 oil shock"; Gulf News, anatomy of oil shocks', t, ev.c6_5);
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — in the short run nobody can stop: trucks deliver food, planes fly, farms need diesel
  P.shot(ev.c6_s2, (ctx, t) => {
    P.sky(ctx, t, { top: '#A8DDF5', bot: '#FFF3DA' }); P.rect(ctx, -20, 860, W + 40, 260, 0, '#8FCB7A'); P.rect(ctx, -20, 860, W + 40, 18, 0, '#7AB866');
    const kt = P.oc((t - ev.c6_s2) / 1.6); P.truck(ctx, lerp(-300, 420, kt) + Math.max(0, t - ev.c6_trucks) * 8, 930, 1.3, t);
    if (kt > 0) for (let i = 0; i < 3; i++) P.rect(ctx, lerp(-300, 420, kt) + (t - ev.c6_trucks) * 8 - 150 + i * 70, 760 - (i % 2) * 40, 60, 50, 6, C.gold, { a: kt });
    const kp = P.oc((t - ev.c6_planes + 0.4) / 0.8); P.plane(ctx, lerp(W + 300, 1000, kp) - (t - ev.c6_planes) * 20, 300 - kp * 40, 1.2, t, { rot: -0.08 });
    const kf = P.pop(t, ev.c6_farms, 0.4); P.tractor(ctx, 1580 + Math.sin(t) * 10, 930, 1.3 * kf, t);
    P.tag(ctx, 'food', 420, 640, t, ev.c6_trucks, 1e9, { size: 40, fill: C.navy, color: C.cream });
    P.tag(ctx, 'flights', 1000, 180, t, ev.c6_planes, 1e9, { size: 40, fill: C.navy, color: C.cream });
    P.tag(ctx, 'diesel', 1580, 620, t, ev.c6_farms, 1e9, { size: 40, fill: C.navy, color: C.cream });
    P.write(ctx, 'in the short run, almost nobody can stop', 960, 520, t, ev.c6_s2 + 0.3, { size: 58, color: C.navy, t1: ev.c6_trucks - 0.1 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — the bidding war: 5 buyers, 4 barrels; the price climbs until someone is priced out
  P.shot(ev.c6_s3, (ctx, t) => {
    P.bgNavy(ctx, t);
    P.rect(ctx, 560, 560, 800, 60, 14, C.navy3); for (let i = 0; i < 4; i++) P.barrel(ctx, 680 + i * 180, 560, 1.1, { color: C.oil });
    const price = 70 + 60 * P.eio((t - ev.c6_bids[0]) / (ev.c6_out - ev.c6_bids[0] + 0.2));
    P.rect(ctx, 760, 150, 400, 170, 24, C.cream, { shadow: 0.3 }); G.text(ctx, '$' + Math.round(price), 960, 280, { size: 110, fam: 'Bungee', color: C.coral, align: 'center', boil: 0 }); G.text(ctx, 'price per barrel', 960, 360, { size: 30, fam: 'Inter', weight: 800, color: '#AEB9E6', align: 'center', boil: 0 });
    for (let i = 0; i < 5; i++) { const x = 360 + i * 300; const bid = ev.c6_bids[i % 4] + (i === 4 ? 0.15 : 0); const up = t > bid ? (t < bid + 0.6 ? Math.sin(Math.PI * (t - bid) / 0.6) : 0.2) : 0;
      const leave = i === 4 ? P.eio((t - ev.c6_out) / 1.2) : 0; ctx.save(); ctx.globalAlpha *= 1 - leave; P.person(ctx, x + leave * 300, 1000, 1.25, { t, color: ['#5C6894', '#6F7FA8', '#8091BD', '#4E5C8C', '#7586B5'][i], arm: up });
      const ax = x + 18 + Math.cos(0.3 - up * 1.6 - Math.PI / 2) * -70; P.circ(ctx, x + 40 + leave * 300, 1000 - 220 - up * 70, 28, C.gold); ctx.restore(); }
    P.tag(ctx, 'priced out', 1560 + 120, 640, t, ev.c6_out + 0.2, 1e9, { size: 38, fill: C.coral, color: C.cream });
    P.stamp(ctx, 'BIDDING WAR', 960, 400, t, ev.c6_bids[0], { size: 60, color: C.gold, fg: C.navy, t1: ev.c6_climbs + 0.6 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — crude is about half of what US drivers pay at the pump (EIA, 2025: 51 %)
  P.shot(ev.c6_s4, (ctx, t) => {
    P.bgLight(ctx, t);
    P.pump(ctx, 300, 980, 1.6, t, { price: '$3.10', a: P.fin(t, ev.c6_s4, 0.4) });
    const D = [['crude oil', 51, C.oil], ['refining, delivery, taxes', 49, C.grey]];
    const cx = 1340, cy = 560, R = 280; const k = P.eio((t - ev.c6_spreads) / 1.4); let a0 = -Math.PI / 2;
    D.forEach(([lab, v, col], i) => { const sw = Math.PI * 2 * v / 100 * k; const pop = i === 0 ? 16 * P.fin(t, ev.c6_half, 0.3) : 0; const mid = a0 + sw / 2;
      ctx.save(); ctx.translate(Math.cos(mid) * pop, Math.sin(mid) * pop); P.fill(ctx, (c) => { c.beginPath(); c.moveTo(cx, cy); c.arc(cx, cy, R, a0, a0 + sw); c.closePath(); }, col); ctx.restore();
      if (k > 0.95) { const lx = cx + Math.cos(mid) * (R + 70), ly = cy + Math.sin(mid) * (R + 70); G.text(ctx, `${lab} ${v}%`, lx, ly + 12, { size: 32, fam: 'Inter', weight: 800, color: C.ink, align: Math.cos(mid) > 0.2 ? 'left' : Math.cos(mid) < -0.2 ? 'right' : 'center', boil: 0 }); }
      a0 += sw; });
    P.circ(ctx, cx, cy, R * 0.45, C.paper);
    P.stamp(ctx, '≈ HALF', cx, cy, t, ev.c6_half, { size: 64, color: C.oil, fg: C.gold });
    P.label(ctx, 'what a US gallon of petrol paid for, 2025', cx, 140, { size: 32, color: C.ink, align: 'center' });
    P.source(ctx, 'EIA, Gasoline explained (2025 average)', t, ev.c6_half);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S5 — it rides along into everything on wheels, wings or keels
  P.shot(ev.c6_s5, (ctx, t) => {
    P.bgNavy(ctx, t);
    const ic = [[ev.c6_wheels, 'wheels', (x, y, k) => P.truck(ctx, x, y + 80, 0.9 * k, t)], [ev.c6_wings, 'wings', (x, y, k) => P.plane(ctx, x, y, 0.9 * k, t)], [ev.c6_keels, 'keels', (x, y, k) => P.tanker(ctx, x, y + 40, 420 * k, t)]];
    ic.forEach(([tt, lab, f], i) => { const k = P.pop(t, tt, 0.4); if (k <= 0) return; const x = 380 + i * 580; f(x, 360, k); G.text(ctx, lab.toUpperCase(), x, 560, { size: 46, fam: 'Inter', weight: 800, color: C.gold, align: 'center', alpha: clamp(k), boil: 0 }); });
    const items = ['bread', 'shirts', 'phones', 'fruit', 'medicine', 'fertiliser', 'flights', 'parcels'];
    items.forEach((s, i) => { const tt = ev.c6_everything + i * 0.1; const x = 260 + (i % 4) * 460, y = 720 + Math.floor(i / 4) * 140; P.tag(ctx, s + '  ↑', x, y, t, tt, 1e9, { size: 40, fill: i % 2 ? C.cream : C.coral, color: i % 2 ? C.navy : C.cream }); });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — a narrow door + a fuel nobody can quickly live without = a shock that reaches your wallet
  P.shot(ev.c6_s6, (ctx, t) => {
    P.bgLight(ctx, t);
    const k1 = P.pop(t, ev.c6_door, 0.4), k2 = P.pop(t, ev.c6_fuel, 0.4), k3 = P.pop(t, ev.c6_wallet, 0.45);
    P.at(ctx, 360, 560, k1, 0, () => { P.door(ctx, 0, 180, 200, 330, 0.7, { color: C.coral }); G.text(ctx, 'narrow door', 0, 270, { size: 38, fam: 'Inter', weight: 800, color: C.navy, align: 'center', boil: 0 }); });
    G.text(ctx, '+', 660, 600, { size: 140, fam: 'Bungee', color: C.navy, align: 'center', alpha: clamp(k2), boil: 0 });
    P.at(ctx, 960, 540, k2, 0, () => { P.drop(ctx, 0, 0, 110, { color: C.oil }); G.text(ctx, 'fuel we can’t skip', 0, 210, { size: 38, fam: 'Inter', weight: 800, color: C.navy, align: 'center', boil: 0 }); });
    G.text(ctx, '=', 1260, 600, { size: 140, fam: 'Bungee', color: C.navy, align: 'center', alpha: clamp(k3), boil: 0 });
    P.at(ctx, 1580, 560, k3, 0, () => { P.shake(ctx, t, ev.c6_wallet + 0.05, 5, 0.3); P.rect(ctx, -170, -110, 340, 220, 30, C.brownish || '#8A5A3C', { shadow: 0.25 }); P.rect(ctx, 30, -40, 160, 80, 24, '#6E4630'); P.circ(ctx, 120, 0, 14, C.gold);
      P.fill(ctx, P.pPoly([[-20, -230], [-90, -110], [-30, -110], [-70, 10], [40, -140], [-20, -140], [20, -230]]), C.gold); G.text(ctx, 'your wallet', 0, 210, { size: 38, fam: 'Inter', weight: 800, color: C.navy, align: 'center', boil: 0 }); });
    Ch.gull(ctx, { x: 1780, y: 1040, s: 0.65, t, dir: -1, gesture: t > ev.c6_wallet ? 'shrug' : 'point', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'wipe', dir: 'left', dur: 0.5 } });
})();
