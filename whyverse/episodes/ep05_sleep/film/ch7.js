// Payoff + end card — four jobs of sleep · this month's 57-study review · 17–19 h awake ≈ 0.05 % · 7+ hours · the third that makes the rest work · Whyverse end card.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;

  // S1 — so why? Not one answer: repair, immunity, memory, reset
  P.shot(ev.c7_s1, (ctx, t, s) => {
    P.paper(ctx, t);
    P.write(ctx, 'so, why do we have to sleep?', 960, 180, t, L('c7_1').t, { size: 110, dur: 0.9, underline: C.gold });
    const items = [['REPAIRS', 'the body', C.coral], ['BACKS UP', 'the immune system', C.mint], ['FILES AWAY', 'memories', C.sky], ['RESETS', 'the brain', C.gold]];
    const icon = [
      () => { for (let i = 0; i < 5; i++) P.rect(ctx, -90 + (i % 3) * 62 + (i > 2 ? 30 : 0), 10 - Math.floor(i / 3) * 42, 58, 38, 6, C.coral, { seed: i }); P.at(ctx, 30, -70 + Math.sin(t * 8) * 10, 1, -0.5 + Math.sin(t * 8) * 0.25, () => { P.rect(ctx, -8, -10, 16, 80, 6, C.wood, { seed: 9 }); P.rect(ctx, -34, -36, 68, 32, 8, C.grey, { seed: 8 }); }); },
      () => { P.shape(ctx, [[0, -100], [86, -70], [80, 20], [0, 100], [-80, 20], [-86, -70]], C.mint, { seed: 9, k: 0.35 }); P.line(ctx, -32, -4, -6, 26, C.cream, 14, 1); P.line(ctx, -6, 26, 40, -34, C.cream, 14, 1); },
      () => { for (let i = 0; i < 3; i++) P.at(ctx, -50 + i * 50, 0 + Math.sin(t * 2 + i) * 8, 1, (i - 1) * 0.16, () => { P.rect(ctx, -42, -52, 84, 104, 8, C.cream, { edge: 0.4 }); P.rect(ctx, -32, -42, 64, 54, 5, [C.coral, C.gold, C.lilac][i], { seed: i }); }); },
      () => { P.at(ctx, 0, 0, 1, Math.PI * P.eio(((t * 0.4) % 1) * 2.5), () => P.hourglass(ctx, 0, 0, 180, 0.1 + 0.8 * (((t * 0.4) % 1)), t)); },
    ];
    items.forEach(([a, b, col], i) => { const k = P.pop(t, ev.c7_recap[i], 0.4); if (k <= 0) return; const x = 270 + i * 460, y = 650;
      P.card(ctx, x, y, 410, 520, col, i, () => { ctx.save(); ctx.translate(0, -90); icon[i](); ctx.restore(); G.text(ctx, a, 0, 130, { size: 72, fam: FT.title, weight: 700, color: C.ink, align: 'center', boil: 0 }); G.text(ctx, b, 0, 196, { size: 44, fam: FT.hand, color: C.dim, align: 'center', boil: 0 }); }, k, (i % 2 ? 1 : -1) * 0.02);
      P.splat(ctx, x, y, t, ev.c7_recap[i], { color: col, r: 300, seed: i }); });
    P.tag(ctx, "there isn't one answer", 960, 330, t, L('c7_2').t, ev.c7_recap[0] + 0.3, { size: 54, border: C.coral, fam: FT.title });
  }, { in: { type: 'fade', dur: 0.6 } });

  // S2 — and scientists keep finding more: this month, a review of 57 brain-scan studies
  P.shot(ev.c7_s2, (ctx, t, s) => {
    P.paper(ctx, t, { tint: C.lilac });
    P.calendar(ctx, 260, 230, 'NOVEMBER', '2026', P.pop(t, ev.c7_month, 0.4), C.lilac, 0.95);
    const n = Math.round(Data.count(t, ev.c7_57a, ev.c7_57, 0, 57, ease.outCubic));
    for (let i = 0; i < n; i++) { const cx = 150 + (i % 10) * 62 + (U.hash(i, 1) - 0.5) * 8, cy = 480 + Math.floor(i / 10) * 86; P.at(ctx, cx, cy, 1, (U.hash(i, 2) - 0.5) * 0.2, () => { P.rect(ctx, -24, -32, 48, 64, 5, C.cream, { edge: 0.4, fillA: 0.98 }); P.ell(ctx, 0, -8, 14, 11, C.brain, { edge: 0.3 }); P.line(ctx, -14, 14, 14, 14, C.dim, 3, 0.6); }); }
    P.counter(ctx, { x: 1000, y: 330, from: 0, to: 57, t, t0: ev.c7_57a, t1: ev.c7_57, size: 170, sub: 'brain-scan studies, reviewed together', subSize: 38, color: C.lilac });
    ctx.save(); P.push(ctx, s.u, 1450, 680, 0.03);
    P.brain(ctx, 1450, 700, 300, {});
    const kd = P.pop(t, ev.c7_deep, 0.4); if (kd > 0) { const pr = 1 + 0.15 * Math.sin(t * 5); P.glow(ctx, 1440, 730, 150 * kd * pr, C.gold, 1); P.ell(ctx, 1440, 730, 46 * kd, 34 * kd, C.gold, { seed: 5 }); P.ring(ctx, 1440, 730, t, ev.c7_deep, { r: 260, color: C.gold }); }
    ctx.restore();
    P.tag(ctx, 'sleep disorders ↔ changes deep in the brain (thalamus)', 1300, 1000, t, ev.c7_deep, 1e9, { size: 42, border: C.gold });
    P.label(ctx, 'Crooks et al., Scientific Reports, 2026 — a link, not proof of cause', 60, 1056, { size: 30, alpha: P.fin(t, ev.c7_57, 0.4) });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — skip sleep and you pay fast: 17–19 hours awake ≈ 0.05 % blood alcohol, on some tests
  P.shot(ev.c7_s3, (ctx, t, s) => {
    P.paper(ctx, t, { tint: C.coral });
    const hrs = Data.count(t, ev.c7_skip, ev.c7_17 + 0.3, 0, 17, ease.outCubic) + (t > ev.c7_17 + 0.3 ? Math.min(2, (t - ev.c7_17 - 0.3) * 1.4) : 0);
    P.at(ctx, 400, 470, 1, 0, () => { P.ell(ctx, 0, 0, 250, 250, C.cream, { seed: 3, fillA: 0.97 }); P.wash(ctx, (c) => { c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 232, -Math.PI / 2, -Math.PI / 2 + 6.283 * hrs / 24); c.closePath(); }, P.mix(C.gold, C.coral, hrs / 19), { bb: [0, 0, 240], seed: 4 });
      for (let i = 0; i < 24; i++) { const an = i / 24 * 6.283 - 1.5708; P.line(ctx, Math.cos(an) * 205, Math.sin(an) * 205, Math.cos(an) * 228, Math.sin(an) * 228, C.dim, i % 6 ? 3 : 6, 0.8); }
      G.text(ctx, Math.floor(hrs) + ' h', 0, 30, { size: 130, fam: FT.title, weight: 700, color: C.ink, align: 'center', boil: 0 }); G.text(ctx, 'awake', 0, 92, { size: 46, fam: FT.hand, color: C.dim, align: 'center', boil: 0 }); });
    P.tag(ctx, '17 to 19 hours awake', 400, 800, t, ev.c7_17, 1e9, { size: 52, border: C.coral, fam: FT.title });
    P.human(ctx, { x: 790, y: 1050, s: 1.15, t, shirt: C.sky, eyes: hrs > 12 ? 'tired' : 'open', mouth: hrs > 12 ? 'flat' : 'smile', sway: 0.05 * hrs / 19 });
    // the test score falls
    const dr = P.eio((t - ev.c7_tests + 0.4) / 0.9);
    P.hbar(ctx, { x: 820, y: 330, w: 760, h: 56, frac: lerp(1, 0.55, dr), t, t0: ev.c7_tests - 0.9, d: 0.4, color: P.mix(C.mint, C.coral, dr), label: 'performance on some tests', seed: 3 });
    const k0 = P.pop(t, ev.c7_005 - 0.6, 0.4); if (k0 > 0) { G.text(ctx, '≈', 1070, 720, { size: 200, fam: FT.title, weight: 700, color: C.navy, align: 'center', alpha: k0, boil: 0 });
      P.at(ctx, 1350, 660, k0, 0, () => { P.wash(ctx, (c) => { c.beginPath(); c.moveTo(-80, -130); c.lineTo(80, -130); c.lineTo(62, 130); c.lineTo(-62, 130); c.closePath(); }, '#DCEBFA', { fillA: 0.6, seed: 5 }); P.wash(ctx, (c) => { c.beginPath(); c.moveTo(-72, -70 + Math.sin(t * 2) * 4); c.lineTo(72, -70 - Math.sin(t * 2) * 4); c.lineTo(60, 124); c.lineTo(-60, 124); c.closePath(); }, C.gold, { bb: [0, 30, 120], seed: 6 }); P.ell(ctx, 0, -76, 74, 20, C.cream, { edge: 0.3 }); for (let i = 0; i < 5; i++) { const ph = (t * 0.6 + i / 5) % 1; P.dot(ctx, -40 + i * 20, 110 - ph * 160, 5, C.cream, 0.7 * (1 - ph)); } }); }
    P.stamp(ctx, '0.05 % BLOOD ALCOHOL', 1380, 920, t, ev.c7_005, { size: 72, color: C.navy, fg: C.gold, rot: -0.03 });
    P.write(ctx, 'skip sleep, and you pay fast.', 1200, 170, t, ev.c7_skip - 0.2, { size: 88, dur: 0.7 });
    P.label(ctx, 'Williamson & Feyer, Occupational and Environmental Medicine, 2000', 1860, 1056, { align: 'right', size: 30, alpha: P.fin(t, ev.c7_17, 0.4) });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — for most adults: at least seven hours a night
  P.shot(ev.c7_s4, (ctx, t, s) => {
    P.night(ctx, t, { seed: 60 }); P.moon(ctx, 300, 220, 110);
    P.write(ctx, 'for most adults, the target is…', 1050, 180, t, ev.c7_s4 + 0.3, { size: 84, color: C.cream, dur: 0.7 });
    for (let i = 0; i < 7; i++) { const k = P.pop(t, ev.c7_seven - 0.7 + i * 0.1, 0.3); if (k > 0) P.at(ctx, 600 + i * 150, 330, k, 0, () => { P.ell(ctx, 0, 0, 56, 56, C.gold, { seed: i }); G.text(ctx, String(i + 1), 0, 24, { size: 70, fam: FT.title, weight: 700, color: C.navy, align: 'center', boil: 0 }); }); }
    const kk = P.pop(t, ev.c7_seven, 0.45); if (kk > 0) P.at(ctx, 1050, 640, kk, -0.02, () => { G.text(ctx, '7+', -330, 90, { size: 400, fam: FT.title, weight: 700, color: C.gold, align: 'center', boil: 0 }); G.text(ctx, 'hours', 190, -20, { size: 190, fam: FT.title, weight: 700, color: C.cream, align: 'center', boil: 0 }); G.text(ctx, 'a night', 190, 120, { size: 130, fam: FT.title, weight: 700, color: C.cream, align: 'center', boil: 0 }); });
    P.ring(ctx, 900, 620, t, ev.c7_seven, { r: 560, color: C.gold });
    P.label(ctx, 'adults — American Academy of Sleep Medicine & Sleep Research Society, 2015', 960, 1040, { align: 'center', size: 32, alpha: P.fin(t, ev.c7_seven, 0.4) });
    Ch.nod(ctx, { x: 1700, y: 1000, s: 1.0, t, gesture: 'point', dir: -1, eyes: 'happy', mouth: Ch.nodMouth(t), look: -0.6 });
  }, { in: { type: 'wipe', dir: 'left', dur: 0.5 } });

  // S4b — that third of your life isn't wasted: it is what makes the other two thirds work
  P.shot(ev.c7_s4b, (ctx, t, s) => {
    P.paper(ctx, t);
    const bx = 210, bw = 1500, by = 430, bh = 150; const lit = P.eio((t - ev.c7_work + 0.3) / 0.8);
    P.rect(ctx, bx, by, bw, bh, 30, P.mix('#D9C9A0', C.gold, lit), { seed: 5 });
    ctx.save(); P.pRR(bx, by, bw, bh, 30)(ctx); ctx.clip(); P.wash(ctx, (c) => { c.beginPath(); c.rect(bx - 10, by - 10, bw / 3 + 10, bh + 20); }, C.night2, { bb: [bx + bw / 6, by + bh / 2, bw / 5], seed: 6, fillA: 0.97 }); P.stars(ctx, t, { n: 24, seed: 9, x0: bx, y0: by + 10, w: bw / 3, h: bh - 20 }); ctx.restore();
    if (lit > 0) P.glow(ctx, bx + bw * 2 / 3, by + bh / 2, 700 * lit, C.gold, 0.5);
    G.text(ctx, 'asleep', bx + bw / 6, by + bh * 0.66, { size: 76, fam: FT.title, weight: 700, color: C.cream, align: 'center', boil: 0 });
    G.text(ctx, 'awake', bx + bw * 2 / 3, by + bh * 0.66, { size: 76, fam: FT.title, weight: 700, color: C.navy, align: 'center', boil: 0 });
    P.stamp(ctx, "NOT WASTED", bx + bw / 6, by - 90, t, ev.c7_third + 0.6, { size: 76, color: C.coral, rot: -0.04 });
    // energy flows from the third into the rest
    if (t > ev.c7_third) for (let i = 0; i < 22; i++) { const ph = ((t - ev.c7_third) * 0.5 + U.hash(i, 1)) % 1; const x = lerp(bx + bw / 3 - 40, bx + bw - 60, ph), y = by + bh / 2 + Math.sin(ph * 9 + i) * 44; P.glow(ctx, x, y, 34, C.cream, Math.sin(ph * Math.PI)); P.dot(ctx, x, y, 7, C.cream, Math.sin(ph * Math.PI)); }
    P.write(ctx, 'it makes the other two thirds work.', 960, 760, t, ev.c7_work - 1.3, { size: 100, dur: 1.0, underline: C.gold });
    const icons = [C.coral, C.mint, C.sky, C.lilac]; icons.forEach((c, i) => { const k = P.pop(t, ev.c7_work + i * 0.12, 0.35); if (k > 0) P.at(ctx, 880 + i * 220, by - 100 - Math.abs(Math.sin(t * 3 + i)) * 20, k, 0, () => { P.ell(ctx, 0, 0, 52, 52, c, { seed: i }); G.text(ctx, ['☀', '♪', '★', '♥'][i], 0, 22, { size: 60, fam: FT.hand, color: C.cream, align: 'center', boil: 0 }); }); });
    Ch.nod(ctx, { x: 300, y: 1030, s: 1.0, t, gesture: t > ev.c7_work ? 'cheer' : 'idle', eyes: t > ev.c7_work ? 'happy' : 'open', mouth: Ch.nodMouth(t), look: 0.6, lookY: -0.5 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — end card
  P.shot(ev.c7_s5, (ctx, t) => {
    P.night(ctx, t, { seed: 62 });
    const k = P.pop(t, ev.sync_logo, 0.5); const up = ease.inOutCubic(clamp((t - ev.c7_like + 0.4) / 0.6));
    ctx.save(); ctx.translate(W / 2, 520); ctx.scale(1 - 0.35 * up, 1 - 0.35 * up); ctx.translate(-W / 2, -520 - 330 * up);
    P.planet(ctx, W / 2, 430, 150 * k, t);
    if (k > 0) G.text(ctx, 'WHYVERSE', W / 2, 800, { size: 170, fam: FT.title, weight: 700, color: C.gold, align: 'center', alpha: clamp(k), boil: 0 });
    P.write(ctx, 'Big questions. Visual answers.', W / 2, 900, t, ev.sync_logo + 0.4, { size: 70, color: C.cream, dur: 0.8 });
    ctx.restore();
    const kl = P.pop(t, ev.c7_like, 0.4); if (kl > 0) P.at(ctx, 640, 640, kl * (1 + 0.08 * Math.exp(-(t - ev.c7_like) * 6)), -0.04, () => {
      P.ell(ctx, 0, 0, 116, 116, C.gold, { seed: 3 });
      P.wash(ctx, (c) => { c.beginPath(); P.pRR(-56, -10, 32, 78, 8)(c); c.moveTo(-14, -10); c.lineTo(10, -72); c.lineTo(36, -68); c.lineTo(28, -10); c.lineTo(64, -10); c.lineTo(64, 68); c.lineTo(-14, 68); c.closePath(); }, C.navy, { seed: 4, edge: 0.2 });
      G.text(ctx, 'LIKE', 0, 190, { size: 64, fam: FT.title, weight: 700, color: C.cream, align: 'center', boil: 0 }); });
    P.splat(ctx, 640, 640, t, ev.c7_like, { color: C.gold, r: 220 });
    const ks = P.pop(t, ev.c7_sub, 0.4); if (ks > 0) { const pressed = t > ev.c7_sub + 0.5; P.at(ctx, 1180, 640, ks * (pressed ? 0.96 : 1), 0, () => {
      P.wash(ctx, P.pRR(-310, -74, 620, 148, 74), pressed ? '#5A66A8' : C.red, { bb: [0, 0, 320], seed: 5 });
      G.text(ctx, pressed ? 'SUBSCRIBED' : 'SUBSCRIBE', 0, 28, { size: 84, fam: FT.title, weight: 700, color: C.cream, align: 'center', boil: 0 }); });
      P.ring(ctx, 1180, 640, t, ev.c7_sub + 0.5, { r: 380, color: C.cream, dur: 0.8 }); }
    P.tag(ctx, 'Instagram  @whyverse___', 640, 930, t, ev.c7_ig, 1e9, { size: 54, border: C.pink });
    P.tag(ctx, 'TikTok  @Whyverse', 1280, 930, t, ev.c7_tt, 1e9, { size: 54, border: C.sky });
    const u = clamp((t - ev.c7_s5) / 1.5); const zz = t > ev.c7_well + 0.5;
    Ch.nod(ctx, { x: lerp(-150, 230, ease.outCubic(u)), y: 800 - (u < 1 ? Math.abs(Math.sin(t * 9)) * 12 : 0), s: 0.95, t, eyes: zz ? 'closed' : 'happy', gesture: zz ? 'hug' : u >= 1 ? 'wave' : 'idle', prop: zz ? 'pillow' : null, mouth: Ch.nodMouth(t), swing: 1 });
    if (zz) P.zzz(ctx, 330, 560, t, { color: C.cream, size: 56 });
    P.write(ctx, 'sleep well.', 220, 1045, t, ev.c7_well, { size: 72, color: C.gold, dur: 0.5 });
  }, { in: { type: 'iris', at: [W / 2, 430], color: '#141B48' } });
})();
