// Cold open — lights out · muscles off, dreams on · a third of your life (26 years) · elephants, penguins, jellyfish · danger · the title.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const room = (ctx, t, lit) => {
    P.night(ctx, t, { stars: 0, top: '#2B3068', bot: '#3C4488', seed: 2 });
    P.rect(ctx, -50, 900, W + 100, 260, 0, '#5A4A6E', { seed: 3, edge: 0.2 });
    // window with the night outside
    P.rect(ctx, 1330, 130, 380, 430, 18, C.cream, { seed: 4 });
    ctx.save(); P.pRR(1352, 152, 336, 386, 8)(ctx); ctx.clip(); ctx.fillStyle = '#141B48'; ctx.fillRect(1340, 140, 360, 410); P.stars(ctx, t, { n: 26, seed: 5, x0: 1352, y0: 152, w: 336, h: 386 }); P.moon(ctx, 1590, 250, 52, { glow: 0.6 }); ctx.restore();
    P.line(ctx, 1520, 152, 1520, 538, C.cream, 12, 1); P.line(ctx, 1352, 345, 1688, 345, C.cream, 12, 1);
    if (lit > 0) P.glow(ctx, 1380, 720, 900, C.gold, 0.5 * lit);
  };
  const cloud = (ctx, x, y, r, a) => { ctx.save(); ctx.globalAlpha *= a; for (const [dx, dy, k] of [[-0.75, 0.15, 0.55], [-0.35, -0.3, 0.7], [0.2, -0.38, 0.75], [0.7, -0.05, 0.6], [0.3, 0.3, 0.65], [-0.25, 0.32, 0.6], [0, 0, 0.8]]) P.wash(ctx, P.pEll(x + dx * r, y + dy * r, r * k, r * k * 0.8), C.cream, { edge: 0, fillA: 0.93 }); ctx.restore(); };
  P.cloud = cloud;

  // S1 — a bedroom at night: "you" in bed, Nod puts the lamp out, the hours spin by
  P.shot(ev.c0_s1, (ctx, t, s) => {
    const dark = P.fin(t, ev.c0_lose, 0.12);
    ctx.save(); P.push(ctx, s.u, 800, 700, 0.03);
    room(ctx, t, 1 - dark);
    const hrs = 23 + 8 * P.eio((t - ev.c0_hours) / 1.7); P.clock(ctx, 400, 300, 96, hrs, (hrs % 1) * 60, { rim: C.gold });
    P.bed(ctx, 800, 930, 1.55, { t, eyes: t < ev.c0_lie ? 'open' : t < ev.c0_lose ? 'open' : 'closed', mouth: t < ev.c0_lose ? 'smile' : 'sleep', blanket: C.peri, breathe: dark });
    if (dark > 0) P.zzz(ctx, 560, 640, t, { a: P.fin(t, ev.c0_lose + 0.5, 0.5), color: C.cream });
    const u = P.oc(t / 1.3); const nx = lerp(2080, 1560, u);
    Ch.nod(ctx, { x: nx, y: 960, s: 1.05, t, flip: true, gesture: t > ev.c0_hours ? 'yawn' : dark ? 'idle' : 'pointUp', prop: dark ? null : 'lamp', eyes: t > ev.c0_hours ? 'closed' : dark ? 'sleepy' : 'open', mouth: t > ev.c0_hours && t < ev.c0_hours + 1.6 ? 'yawn' : Ch.nodMouth(t), look: 0.6 });
    if (dark > 0) { ctx.save(); ctx.globalAlpha = 0.42 * dark; ctx.fillStyle = '#0B0F33'; ctx.fillRect(-100, -100, W + 200, H + 200); ctx.restore(); }
    ctx.restore();
    P.dark = true;
    P.write(ctx, 'tonight…', 400, 560, t, 0.5, { size: 96, color: C.cream, t1: ev.c0_lose + 0.1, dur: 0.5 });
    P.stamp(ctx, 'LIGHTS OUT', 420, 560, t, ev.c0_lose, { size: 84, color: C.navy, fg: C.gold, rot: -0.05, t1: ev.c0_hours + 0.4 });
    P.tag(ctx, '…for hours', 420, 560, t, ev.c0_hours + 0.5, 1e9, { size: 60, border: C.gold, fam: FT.title, rot: -0.03 });
  }, { in: { type: 'fade', dur: 0.6 } });

  // S2 — close on the sleeper: the muscle switch goes OFF, a dream bubble blooms
  P.shot(ev.c0_s2, (ctx, t, s) => {
    P.night(ctx, t, { stars: 0.5, seed: 4 });
    ctx.save(); P.push(ctx, s.u, 500, 700, 0.03);
    const dream = P.fin(t, ev.c0_show, 0.5);
    const head = P.bed(ctx, 760, 1090, 2.2, { t, eyes: dream > 0 ? 'rem' : 'closed', blanket: C.peri });
    // dream bubble
    for (let i = 0; i < 3; i++) { const k = P.pop(t, ev.c0_show + i * 0.1, 0.3); if (k > 0) P.ell(ctx, head.x + 70 + i * 70, head.y - 110 - i * 80, (14 + i * 10) * k, (12 + i * 9) * k, C.cream, { edge: 0, fillA: 0.9 }); }
    const kc = P.pop(t, ev.c0_show + 0.3, 0.5, 1.4); if (kc > 0) { cloud(ctx, 820, 330, 300 * kc, 1);
      const th = ev.c0_things; const fl = (i) => Math.sin(t * 1.6 + i * 2) * 14;
      const k0 = P.pop(t, th[0], 0.35); if (k0 > 0) { P.animal(ctx, 'dolphin', 650, 300 + fl(0), 80 * k0, { t, color: C.coral }); for (const sx of [-1, 1]) P.shape(ctx, [[650 + sx * 20, 270 + fl(0)], [650 + sx * 70, 210 + fl(0) + Math.sin(t * 9) * 14], [650 + sx * 40, 280 + fl(0)]], C.gold, { poly: true, a: k0, edge: 0.3 }); }
      const k1 = P.pop(t, th[1], 0.35); if (k1 > 0) for (let i = 0; i < 5; i++) P.rect(ctx, 800 + i * 34 * k1, 420 - i * 34 * k1 + fl(1), 40 * k1, 34 * k1, 4, i % 2 ? C.lilac : C.sky, { seed: 40 + i });
      const k2 = P.pop(t, th[2], 0.35); if (k2 > 0) { P.cup(ctx, 1010, 300 + fl(2), 70 * k2, t, { color: C.mint }); P.dot(ctx, 995, 290 + fl(2), 7 * k2); P.dot(ctx, 1028, 290 + fl(2), 7 * k2); P.arc(ctx, 1011, 304 + fl(2), 12 * k2, 0.3, 2.8, C.ink, 4); } }
    ctx.restore();
    // the muscle switch
    const off = P.fin(t, ev.c0_off, 0.14); const kp = P.pop(t, ev.c0_s2 + 0.9, 0.4);
    if (kp > 0) P.at(ctx, 1560, 560, kp, 0.02, () => {
      P.rect(ctx, -190, -150, 380, 300, 30, C.cream, { seed: 11, fillA: 0.97 });
      G.text(ctx, 'MUSCLES', 0, -76, { size: 62, fam: FT.title, weight: 700, color: C.ink, align: 'center', boil: 0 });
      P.rect(ctx, -110, -40, 220, 96, 48, P.mix(C.mint, C.grey, off), { seed: 12 });
      P.ell(ctx, lerp(62, -62, ease.outBack(off, 1.5)), 8, 40, 40, C.white, { seed: 13, edge: 0.4 });
      G.text(ctx, off > 0.5 ? 'OFF' : 'ON', 0, 122, { size: 54, fam: FT.title, weight: 700, color: off > 0.5 ? C.red : C.green, align: 'center', boil: 0 }); });
    P.ring(ctx, 1560, 570, t, ev.c0_off, { r: 260, color: C.coral });
    P.tag(ctx, 'things that are not there', 820, 660, t, ev.c0_things[0] - 0.2, 1e9, { size: 46, border: C.coral });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — the life bar: a third of it asleep → 26 years
  P.shot(ev.c0_s3, (ctx, t, s) => {
    P.paper(ctx, t);
    P.write(ctx, 'every single night…', 960, 150, t, ev.c0_s3 + 0.3, { size: 84, dur: 0.6 });
    for (let i = 0; i < 16; i++) { const k = P.pop(t, ev.c0_every + i * 0.07, 0.25); if (k > 0) P.at(ctx, 300 + i * 88, 270, k, 0, () => { P.ell(ctx, 0, 0, 30, 30, C.night2, { seed: 60 + i }); ctx.save(); ctx.translate(2, 0); ctx.rotate(-0.5); ctx.fillStyle = C.moon; ctx.beginPath(); ctx.arc(0, 0, 17, Math.PI * 0.5, Math.PI * 1.5); ctx.ellipse(0, 0, 9, 17, 0, Math.PI * 1.5, Math.PI * 0.5, true); ctx.fill(); ctx.restore(); }); }
    const bx = 210, bw = 1500, by = 470, bh = 130; const a = P.fin(t, ev.c0_third - 0.9, 0.4);
    ctx.save(); ctx.globalAlpha *= a;
    P.rect(ctx, bx, by, bw, bh, 26, C.gold, { seed: 5 });
    const k = P.eio((t - ev.c0_third) / 0.8); if (k > 0) { ctx.save(); P.pRR(bx, by, bw, bh, 26)(ctx); ctx.clip(); P.wash(ctx, (c) => { c.beginPath(); c.rect(bx - 10, by - 10, (bw / 3 + 10) * k, bh + 20); }, C.night2, { bb: [bx + bw / 6, by + bh / 2, bw / 5], seed: 6, fillA: 0.97 }); P.stars(ctx, t, { n: 24, seed: 9, x0: bx, y0: by + 10, w: bw / 3 * k, h: bh - 20 }); ctx.restore(); }
    for (let i = 0; i <= 8; i++) { P.line(ctx, bx + i * bw / 8, by + bh + 8, bx + i * bw / 8, by + bh + 28, C.ink, 4, 0.7); P.label(ctx, String(i * 10), bx + i * bw / 8, by + bh + 72, { align: 'center', size: 38 }); }
    P.label(ctx, 'a life, in years', bx, by - 22, { size: 40, color: C.ink });
    ctx.restore();
    if (k > 0.5) { G.text(ctx, 'asleep', bx + bw / 6, by + bh * 0.66, { size: 64, fam: FT.title, weight: 700, color: C.cream, align: 'center', alpha: P.fin(t, ev.c0_third + 0.5, 0.3), boil: 0 }); P.zzz(ctx, bx + bw / 3 - 90, by - 10, t, { color: C.night2, size: 50 }); }
    G.text(ctx, 'awake', bx + bw * 2 / 3, by + bh * 0.66, { size: 64, fam: FT.title, weight: 700, color: C.navy, align: 'center', alpha: a * 0.8, boil: 0 });
    P.stamp(ctx, 'ONE THIRD', bx + bw / 6, by - 80, t, ev.c0_third + 0.25, { size: 70, color: C.coral, rot: -0.04 });
    P.counter(ctx, { x: 620, y: 880, from: 0, to: 26, t, t0: ev.c0_80 + 0.3, t1: ev.c0_26 + 0.25, size: 170, sub: 'years asleep (in an 80-year life)', color: C.coral });
    Ch.nod(ctx, { x: 1500, y: 1010, s: 1.1, t, gesture: t > ev.c0_26 ? 'shrug' : 'point', dir: -1, eyes: t > ev.c0_26 ? 'wide' : 'open', mouth: Ch.nodMouth(t), look: -0.6, lookY: -0.4 });
  }, { in: { type: 'wipe', dir: 'left', dur: 0.5 } });

  // S4 — it's not just you: an elephant, a penguin, a jellyfish — all asleep
  P.shot(ev.c0_s4, (ctx, t, s) => {
    P.night(ctx, t, { seed: 6 }); P.moon(ctx, 1720, 170, 70);
    ctx.save(); P.push(ctx, s.u, 960, 600, 0.03);
    P.hill(ctx, 800, '#2A3A6E', { seed: 2, amp: 26 });
    P.write(ctx, "and it's not just you.", 960, 170, t, ev.c0_s4 + 0.25, { size: 88, color: C.cream, dur: 0.6 });
    const A = [['elephant', 380, 650, 165, 'elephants'], ['penguin', 960, 650, 150, 'penguins'], ['jelly', 1540, 690, 150, 'a jellyfish']];
    A.forEach(([kind, x, y, r, name], i) => { const k = P.pop(t, ev.c0_animals[i], 0.4); if (k <= 0) return;
      P.at(ctx, x, y, k, 0, () => P.animal(ctx, kind, 0, 0, r, { t, sleep: true, pulse: 0.2, nod: 0.6 + 0.3 * Math.sin(t * 1.2) }));
      P.ring(ctx, x, y, t, ev.c0_animals[i], { r: 260, color: C.gold });
      P.zzz(ctx, x + (i === 0 ? 150 : 60), y - r * (i === 2 ? 1.0 : 0.95), t + i * 0.3, { color: C.cream, a: P.fin(t, ev.c0_animals[i] + 0.3, 0.4) });
      P.tag(ctx, name, x, 950, t, ev.c0_animals[i] + 0.15, 1e9, { size: 48, border: C.gold }); });
    P.tag(ctx, 'no brain!', 1690, 470, t, ev.c0_nobrain, 1e9, { size: 50, border: C.coral, rot: 0.05, fam: FT.title });
    ctx.restore();
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — in the wild: asleep = easy prey. Two eyes open in the dark. Evolution kept sleep anyway.
  P.shot(ev.c0_s5, (ctx, t, s) => {
    P.night(ctx, t, { seed: 8 }); P.moon(ctx, 300, 190, 80);
    ctx.save(); P.shake(ctx, t, ev.c0_danger, 5, 0.3); P.push(ctx, s.u, 700, 760, 0.03);
    P.hill(ctx, 700, '#26386B', { seed: 5, amp: 50 }); P.hill(ctx, 850, '#1F2D5A', { seed: 7, amp: 30 });
    for (let i = 0; i < 22; i++) { const gx = 60 + i * 88 + U.hash(i, 3) * 40, gy = 880 + U.hash(i, 4) * 120; for (let j = -1; j <= 1; j++) P.line(ctx, gx, gy, gx + j * 14 + Math.sin(t * 1.5 + i) * 4, gy - 46 - U.hash(i, j + 5) * 26, '#3F6A6A', 5, 0.8); }
    P.animal(ctx, 'rat', 640, 850, 120, { t, sleep: t > ev.c0_shut, color: '#C9B79A' });
    P.zzz(ctx, 760, 760, t, { color: C.cream, a: P.fin(t, ev.c0_shut + 0.2, 0.4), size: 44 });
    // the bush and what is in it
    P.shape(ctx, [[1180, 860], [1160, 720], [1260, 620], [1400, 580], [1560, 620], [1660, 730], [1650, 870]], '#152048', { seed: 9 });
    const e = P.fin(t, ev.c0_danger, 0.12); if (e > 0) for (const sx of [-1, 1]) { P.glow(ctx, 1410 + sx * 58, 720, 70, C.gold, e * 0.8); ctx.save(); ctx.fillStyle = C.gold; ctx.beginPath(); ctx.ellipse(1410 + sx * 58, 720, 30, 17 * e, sx * -0.2, 0, 7); ctx.fill(); ctx.fillStyle = '#141838'; ctx.beginPath(); ctx.ellipse(1410 + sx * 58 - 6, 720, 6, 15 * e, 0, 0, 7); ctx.fill(); ctx.restore(); }
    ctx.restore();
    P.tag(ctx, 'eyes shut, lying still…', 660, 620, t, ev.c0_shut, ev.c0_evo - 0.2, { size: 46, border: C.gold });
    P.stamp(ctx, 'EASY PREY', 1420, 470, t, ev.c0_danger + 0.3, { size: 80, color: C.red, t1: ev.c0_evo - 0.1 });
    P.write(ctx, 'yet evolution never got rid of it.', 960, 200, t, ev.c0_evo - 0.1, { size: 84, color: C.cream, dur: 0.9 });
    P.stamp(ctx, 'NEVER', 1500, 330, t, ev.c0_never, { size: 96, color: C.gold, fg: C.navy, rot: 0.04 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S6 — the question, then the title: six painted words land on the night sky
  P.shot(ev.c0_s6, (ctx, t) => {
    P.night(ctx, t, { seed: 10 }); P.moon(ctx, 250, 230, 120);
    const q = L('c0_6');
    if (t < ev.title0 + 0.2) P.write(ctx, 'so… why?', 960, 560, t, q.t, { size: 130, color: C.cream, t1: ev.title0 + 0.2, dur: 0.8 });
    const words = ev.titleWords; const size = 210;
    const rows = [[words[0], words[1], words[2]], [words[3], words[4], words[5]]];
    rows.forEach((ws, r) => { const sp = 56; const tw = ws.reduce((a, w) => a + P.measure(ctx, w.w, size, FT.title, 700) + sp, -sp); let xx = 1010 - tw / 2;
      ws.forEach((w) => { const ww = P.measure(ctx, w.w, size, FT.title, 700); if (t >= w.t) { const k = lerp(1.7, 1, ease.outCubic(clamp((t - w.t) / 0.14))); const col = w.w === 'SLEEP?' ? C.gold : C.cream;
        P.at(ctx, xx + ww / 2, 400 + r * 220, k, (U.hash(w.t * 10, 3) - 0.5) * 0.06, () => G.text(ctx, w.w, 0, 0, { size, fam: FT.title, weight: 700, color: col, align: 'center', boil: 0 })); P.splat(ctx, xx + ww / 2, 340 + r * 220, t, w.t, { r: ww * 0.6, color: col, seed: r * 3 + 1 }); }
        xx += ww + sp; }); });
    const kb = P.pop(t, ev.titleBrand, 0.45); if (kb > 0) { P.planet(ctx, 800, 850, 38 * kb, t); G.text(ctx, 'WHYVERSE', 1010, 874, { size: 76, fam: FT.title, weight: 700, color: C.gold, align: 'center', alpha: clamp(kb), boil: 0 }); }
    const y = t > ev.titleYawn && t < ev.titleYawn + 1.5;
    Ch.nod(ctx, { x: 1690, y: 1000, s: 1.0, t, gesture: y ? 'yawn' : t > ev.sync_title ? 'cheer' : 'idle', eyes: y ? 'closed' : t > ev.titleYawn + 1.5 ? 'sleepy' : 'open', mouth: y ? 'yawn' : Ch.nodMouth(t), look: -0.6, lookY: -0.6, swing: 1 });
  }, { in: { type: 'fade', dur: 0.5 } });
})();
