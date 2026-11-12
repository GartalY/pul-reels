// Payoff + end card — four reasons · then vs now: attacks didn't shut the door, risk itself did · back to the waiting tanker ·
// Whyverse end card: like, subscribe, Instagram @whyverse___, TikTok @Whyverse.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;

  // S1 — the answer, in four cards
  P.shot(ev.c7_s1, (ctx, t) => {
    P.bgNavy(ctx, t);
    P.write(ctx, 'why can one narrow strait shake the world?', 960, 150, t, ev.c7_s1 + 0.4, { size: 60, color: C.cream, hl: ['shake', 'world?'] });
    const R = [['1', 'ONE DOOR', 'geography left the Gulf one exit', C.coral], ['2', 'A FIFTH', 'of the world’s oil and LNG', C.gold], ['3', 'SMALL BACK DOORS', 'pipes carry 1 barrel in 4, at best', C.teal], ['4', 'NO QUICK SWAP', 'the world can’t stop using oil fast', C.gas]];
    R.forEach(([n, big, sub, col], i) => { const k = P.pop(t, ev.c7_reasons[i], 0.45); if (k <= 0) return; const x = 520 + (i % 2) * 880, y = 400 + Math.floor(i / 2) * 290;
      P.at(ctx, x, y, k, (i % 2 ? 0.015 : -0.015), () => { P.rect(ctx, -400, -110, 800, 220, 26, C.cream, { shadow: 0.3, sy: 10 }); P.circ(ctx, -300, 0, 62, col); G.text(ctx, n, -300, 30, { size: 74, fam: 'Bungee', color: C.navy, align: 'center', boil: 0 });
        G.text(ctx, big, -200, -6, { size: 54, fam: 'Inter', weight: 800, color: C.navy, boil: 0 }); G.text(ctx, sub, -200, 50, { size: 32, fam: 'Inter', weight: 700, color: C.dim, boil: 0 }); }); });
  }, { in: { type: 'fade', dur: 0.6 } });

  // S2 — then vs now: 1984–88 ships kept sailing; 2026: no insurance, no ships — risk itself shut the door
  P.shot(ev.c7_s2, (ctx, t) => {
    P.bgLight(ctx, t);
    const half = (x0, dark) => { ctx.save(); ctx.beginPath(); ctx.rect(x0, 0, W / 2, H); ctx.clip(); ctx.fillStyle = dark ? C.navy : '#E9F3F8'; ctx.fillRect(x0, 0, W / 2, H); P.water(ctx, t, { y0: 640, color: dark ? C.sea2 : C.sea, color2: dark ? C.seaDeep : C.sea2, seed: dark ? 4 : 2 }); };
    half(0, false);
    const kL = P.fin(t, ev.c7_forty - 0.2, 0.3);
    for (let i = 0; i < 3; i++) { const x = ((t - ev.c7_s2) * 90 + i * 330) % 1100 - 150; P.tanker(ctx, x, 700 + i * 0, 280, t + i, { load: 1, wake: 1, a: kL }); }
    P.ring(ctx, 520, 680, t, ev.c7_forty + 0.5, { r: 90, color: C.coral }); P.ring(ctx, 300, 690, t, ev.c7_forty + 1.3, { r: 90, color: C.coral });
    G.text(ctx, '1984–88', 480, 200, { size: 84, fam: 'Bungee', color: C.navy, align: 'center', alpha: kL, boil: 0 });
    P.tag(ctx, 'attacks, but ships kept sailing ✓', 480, 330, t, ev.c7_sailing, 1e9, { size: 38, fill: C.teal, color: C.navy });
    ctx.restore();
    half(W / 2, true);
    const kR = P.fin(t, ev.c7_year - 0.2, 0.3);
    G.text(ctx, '2026', 1440, 200, { size: 84, fam: 'Bungee', color: C.gold, align: 'center', alpha: kR, boil: 0 });
    P.doc(ctx, 1440, 520, 0.7, t, { a: P.pop(t, ev.c7_noins - 0.3, 0.35), stamp: clamp((t - ev.c7_noins) / 0.18), rot: 0.05 });
    P.tanker(ctx, 1500, 730, 280, t, { load: 1, a: kR * (1 - P.fin(t, ev.c7_noships, 0.4)) });
    P.stamp(ctx, 'NO SHIPS', 1440, 880, t, ev.c7_noships, { size: 64, color: C.red });
    ctx.restore();
    P.line(ctx, W / 2, 0, W / 2, H, C.cream, 8);
    P.stamp(ctx, 'RISK ITSELF', 960, 470, t, ev.c7_risk, { size: 70, color: C.gold, fg: C.navy, rot: -0.03 });
  }, { in: { type: 'wipe', dir: 'left', dur: 0.5 } });

  // S3 — back to the supertanker from the beginning, waiting for the door to feel safe again; the whole world pays
  P.shot(ev.c7_s3, (ctx, t, s) => {
    ctx.save(); P.push(ctx, s.u, 960, 620, 0.03);
    P.sky(ctx, t, { top: '#E98E6B', bot: '#FCD9A6', h: 700 }); P.sun(ctx, 1150, 480, 90, t, { color: '#FFC56E' });
    P.poly(ctx, [[-100, 640], [200, 600], [420, 615], [700, 585], [900, 610], [1100, 640], [-100, 640]], '#B97A62', { a: 0.6, curve: true });
    P.water(ctx, t, { y0: 630, color: '#2A6E9C', color2: '#163F69', seed: 3 });
    const safe = P.fin(t, ev.c7_safe, 0.6); P.glow(ctx, 1700, 610, 300, C.mint, safe * (0.6 + 0.3 * Math.sin(t * 2)));
    P.tanker(ctx, 900, 790, 1400, t, { load: 1, smoke: 0.3 });
    Ch.gull(ctx, { x: 1420, y: 728, s: 0.95, t, dir: -1, gesture: t > ev.c7_safe ? 'point' : 'idle', mouth: P.talk(t), look: -1 });
    ctx.restore();
    const pk = P.fin(t, ev.c7_pays - 0.4, 0.5); if (pk > 0) { const tags = ['$', '€', '£', '¥', '₹', '₩']; tags.forEach((c, i) => { const u = clamp((t - ev.c7_pays - i * 0.15) / 3); const x = 260 + i * 280, y = 520 - u * 300; P.at(ctx, x, y, P.pop(t, ev.c7_pays + i * 0.15, 0.35), 0, () => { P.circ(ctx, 0, 0, 46, C.gold, { shadow: 0.2 }); G.text(ctx, c, 0, 18, { size: 50, fam: 'Inter', weight: 800, color: C.navy, align: 'center', boil: 0 }); P.arrow(ctx, 60, 20, 60, -30, { color: C.coral, lw: 8, head: 18 }); }); }); }
    P.write(ctx, 'the whole world pays', 960, 200, t, ev.c7_pays - 0.2, { size: 80, color: C.navy });
  }, { in: { type: 'fade', dur: 0.6 } });

  // S4 — Whyverse end card: like, subscribe, Instagram + TikTok; the gull waves and flies off
  P.shot(ev.c7_s4, (ctx, t) => {
    P.bgNavy(ctx, t);
    const kb = P.pop(t, ev.sync_logo, 0.5); P.planet(ctx, 660, 280, 70 * kb, t); G.text(ctx, 'WHYVERSE', 1060, 318, { size: 120, fam: 'Bungee', color: C.gold, align: 'center', alpha: clamp(kb), boil: 0 });
    const like = P.pop(t, ev.c7_like, 0.45); P.at(ctx, 700, 560, like, 0, () => { const on = t > ev.c7_like + 0.3; P.rect(ctx, -200, -70, 400, 140, 70, on ? C.coral : C.cream, { shadow: 0.3 });
      P.fill(ctx, P.pPoly([[-130, 30], [-130, -10], [-100, -10], [-80, -50], [-64, -48], [-70, -10], [-30, -10], [-40, 30]]), on ? C.cream : C.navy); G.text(ctx, 'LIKE', 40, 22, { size: 58, fam: 'Inter', weight: 800, color: on ? C.cream : C.navy, align: 'center', boil: 0 }); });
    const sub = P.pop(t, ev.c7_sub, 0.45); P.at(ctx, 1240, 560, sub, 0, () => { const on = t > ev.c7_sub + 0.35; P.rect(ctx, -270, -70, 540, 140, 70, on ? '#2A3D80' : C.red, { shadow: 0.3 });
      G.text(ctx, on ? 'SUBSCRIBED ✓' : 'SUBSCRIBE', 0, 22, { size: 56, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 }); });
    P.ring(ctx, 1240, 560, t, ev.c7_sub + 0.35, { r: 320, color: C.gold });
    P.tag(ctx, 'Instagram  @whyverse___', 640, 790, t, ev.c7_ig, 1e9, { size: 46, fill: C.cream, color: C.navy, dot: C.pink });
    P.tag(ctx, 'TikTok  @Whyverse', 1300, 790, t, ev.c7_tt, 1e9, { size: 46, fill: C.cream, color: C.navy, dot: C.teal });
    P.label(ctx, 'shorter stories there', 960, 900, { size: 34, align: 'center', color: '#AEB9E6', alpha: P.fin(t, ev.c7_tt + 0.4, 0.4) });
    const fly = P.eio((t - ev.c7_bye) / 1.6);
    Ch.gull(ctx, { x: 1660 + fly * 500, y: 1000 - fly * 700, s: 0.9, t, dir: fly > 0 ? 1 : -1, fly: P.fin(t, ev.c7_bye, 0.25), gesture: t > ev.c7_like ? 'cheer' : 'point', mouth: P.talk(t), eyes: 'happy' });
  }, { in: { type: 'iris', color: '#F2B84B', at: [960, 540], dur: 0.8 } });
})();
