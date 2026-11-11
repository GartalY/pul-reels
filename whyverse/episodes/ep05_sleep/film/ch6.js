// Chapter 6 — Sleeping dangerously: dolphins (half a brain) · frigatebirds (42 min a day, in flight) · chinstrap penguins (10,000 naps of 4 s) · elephants 2 h, a bat ~20 h · the brainless jellyfish · the Rechtschaffen line.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const sea = (ctx, t, y, col = '#2A5F9E', amp = 14) => { P.wash(ctx, (c) => { c.beginPath(); c.moveTo(-50, y); for (let x = -50; x <= W + 50; x += 40) c.lineTo(x, y + Math.sin(x / 130 + t * 1.2) * amp + Math.sin(x / 47 - t * 0.8) * amp * 0.4); c.lineTo(W + 50, H + 50); c.lineTo(-50, H + 50); c.closePath(); }, col, { bb: [W / 2, y + 400, 1100], seed: 3, edge: 0.5, ew: 8 }); };

  P.cardShot('c6', 6, 'Sleeping dangerously', (ctx, t) => {
    P.animal(ctx, 'frigate', 1500 + Math.sin(t * 0.6) * 40, 900 + Math.cos(t * 0.9) * 14, 110, { t, flap: t * 0.25, a: 0.5 });
  });

  // S1 — dolphins sleep with half a brain at a time; the other half keeps them swimming and surfacing to breathe
  P.shot(ev.c6_s1, (ctx, t, s) => {
    P.night(ctx, t, { seed: 50 }); P.moon(ctx, 260, 150, 70);
    sea(ctx, t, 330);
    const up = P.eio((t - ev.c6_breathe + 0.9) / 0.9) * (1 - P.eio((t - ev.c6_breathe - 0.9) / 0.9));
    const dx = 620 + Math.sin(t * 0.7) * 70, dy = lerp(660, 400, up) + Math.sin(t * 1.4) * 16;
    for (let i = 0; i < 8; i++) { const ph = (t * 0.3 + i / 8) % 1; P.dot(ctx, dx - 260 - ph * 200, dy + (U.hash(i, 2) - 0.5) * 90, 6 + 5 * U.hash(i, 3), C.cream, 0.3 * (1 - ph)); }
    ctx.save(); ctx.translate(dx, dy); ctx.rotate(-0.25 * up + Math.sin(t * 1.4) * 0.05); P.animal(ctx, 'dolphin', 0, 0, 230, { t, sleep: false }); ctx.restore();
    if (t > ev.c6_breathe) for (let i = 0; i < 12; i++) { const u = clamp((t - ev.c6_breathe - i * 0.03) / 0.8); if (u <= 0 || u >= 1) continue; P.dot(ctx, dx + 150 + (U.hash(i, 5) - 0.5) * 120 * u, 320 - Math.sin(u * Math.PI) * (120 + 80 * U.hash(i, 6)), 7, C.cream, 0.9 * (1 - u)); }
    // the brain from above: one half asleep, the other awake; then they swap
    const kp = P.pop(t, ev.c6_half - 0.3, 0.45); const sw = t > ev.c6_swap; const swk = P.eio((t - ev.c6_swap) / 0.4);
    if (kp > 0) P.at(ctx, 1440, 620, kp, 0, () => { P.rect(ctx, -330, -300, 660, 600, 40, C.cream, { seed: 5, fillA: 0.97 });
      const half = (sx, asleep) => { const col = asleep ? C.night2 : C.gold; P.wash(ctx, (c) => { c.beginPath(); c.ellipse(sx * 14, 0, 210, 230, 0, sx > 0 ? -Math.PI / 2 : Math.PI / 2, sx > 0 ? Math.PI / 2 : Math.PI * 1.5); c.closePath(); }, col, { bb: [sx * 110, 0, 230], seed: 6 + sx });
        for (let j = 0; j < 4; j++) P.brush(ctx, P.pCurve([[sx * 40, -150 + j * 95], [sx * 110, -170 + j * 95 + (j % 2) * 30], [sx * 180, -140 + j * 90]], false), P.dk(col, 0.3), 7, 0.6);
        if (asleep) P.zzz(ctx, sx * 110 - 20, -30, t + (sx > 0 ? 0.4 : 0), { color: C.cream, size: 56, rise: 90, dx: 30 }); else { P.glow(ctx, sx * 120, 0, 190, C.gold, 0.5 + 0.2 * Math.sin(t * 5)); G.text(ctx, 'AWAKE', sx * 118, 20, { size: 48, fam: FT.title, weight: 700, color: C.navy, align: 'center', boil: 0 }); } };
      half(-1, !sw); half(1, sw); });
    if (sw) P.ring(ctx, 1440, 620, t, ev.c6_swap, { r: 400, color: C.gold });
    P.tag(ctx, 'half a brain at a time', 1440, 240, t, ev.c6_half, 1e9, { size: 56, border: C.gold, fam: FT.title });
    P.tag(ctx, 'still swimming · still surfacing to breathe', 640, 1000, t, ev.c6_swap, 1e9, { size: 44, border: C.sky });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — frigatebirds: weeks over the ocean without landing; ~42 minutes of sleep a day, in short bursts, in the air
  P.shot(ev.c6_s2, (ctx, t, s) => {
    P.paper(ctx, t); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#8FC1EE'); g.addColorStop(1, '#F6D9B0'); ctx.save(); ctx.globalAlpha = 0.9; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); P.dark = false;
    for (let i = 0; i < 5; i++) { const x = ((U.hash(i, 1) * 2400 - t * (30 + 20 * U.hash(i, 2))) % 2400 + 2400) % 2400 - 240; P.cloud(ctx, x, 140 + U.hash(i, 3) * 420, 110 + 60 * U.hash(i, 4), 0.75); }
    sea(ctx, t, 900, '#3F78B5', 10);
    const bx = 620 + Math.sin(t * 0.5) * 50, by = 470 + Math.sin(t * 0.9) * 22;
    ctx.save(); ctx.translate(bx, by); ctx.rotate(Math.sin(t * 0.5) * 0.08); P.animal(ctx, 'frigate', 0, 0, 250, { t, flap: t * 0.12 }); ctx.restore();
    P.animal(ctx, 'frigate', 240, 250 + Math.sin(t) * 10, 70, { t, flap: t * 0.15 + 0.3, a: 0.8 }); P.animal(ctx, 'frigate', 1060, 760 + Math.cos(t) * 10, 56, { t, flap: t * 0.15 + 0.6, a: 0.7 });
    if (t > ev.c6_air) P.zzz(ctx, bx + 60, by - 110, t, { color: C.navy, size: 54 });
    P.calendar(ctx, 250, 760, 'NO LANDING', 'WEEKS', P.pop(t, ev.c6_weeks, 0.4), C.sea, 0.8);
    P.counter(ctx, { x: 1440, y: 330, from: 0, to: 42, t, t0: ev.c6_42 - 0.6, t1: ev.c6_42 + 0.3, size: 190, sub: 'minutes of sleep a day, in flight', subSize: 38, color: C.coral });
    P.hbar(ctx, { x: 1120, y: 620, w: 620, h: 50, frac: 0.69 / 12.8, t, t0: ev.c6_42 + 0.4, color: C.coral, label: 'in flight', value: '42 min', seed: 3 });
    P.hbar(ctx, { x: 1120, y: 760, w: 620, h: 50, frac: 1, t, t0: ev.c6_42 + 0.7, color: C.sea, label: 'back on land', value: '', seed: 5 });
    G.text(ctx, '12+ hours', 1720, 800, { size: 44, fam: FT.title, weight: 700, color: C.cream, align: 'right', alpha: P.fin(t, ev.c6_42 + 1.4, 0.3), boil: 0 });
    // short bursts
    if (t > ev.c6_bursts - 0.3) { const a = P.fin(t, ev.c6_bursts - 0.3, 0.3); ctx.save(); ctx.globalAlpha *= a; P.rect(ctx, 1120, 880, 620, 60, 14, C.cream, { edge: 0.3, fillA: 0.95 }); for (let i = 0; i < 9; i++) { const k = P.pop(t, ev.c6_bursts + i * 0.08, 0.2); if (k > 0) P.rect(ctx, 1140 + U.hash(i, 9) * 20 + i * 64, 892, 22 * k, 36, 6, C.night2, { seed: i }); } ctx.restore(); P.label(ctx, 'bursts of a few seconds', 1430, 990, { align: 'center', size: 38, color: C.ink, alpha: a }); }
    P.label(ctx, 'Rattenborg et al., Nature Communications, 2016', 60, 1050, { size: 30, color: C.cream, alpha: P.fin(t, ev.c6_42, 0.4) });
  }, { in: { type: 'wipe', dir: 'up', dur: 0.5 } });

  // S3 — nesting chinstrap penguins: more than 10,000 naps a day, about 4 seconds each = 11 hours
  P.shot(ev.c6_s3, (ctx, t, s) => {
    P.paper(ctx, t); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#BFE0F5'); g.addColorStop(1, '#F1F7FB'); ctx.save(); ctx.globalAlpha = 0.9; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); P.dark = false;
    P.hill(ctx, 520, '#DCEBF5', { seed: 4, amp: 60 }); P.hill(ctx, 800, '#FFFFFF', { seed: 6, amp: 30 });
    const nap = (ph) => { const u = ((t * 0.45 + ph) % 1); return u < 0.42 ? Math.sin(u / 0.42 * Math.PI) : 0; };
    [[300, 620, 90, 0.3], [1120, 600, 80, 0.62], [130, 800, 70, 0.8]].forEach(([x, y, r, ph], i) => { const n = nap(ph); P.animal(ctx, 'penguin', x, y, r, { t, sleep: n > 0.3, nod: n, seed: 7 + i }); });
    const kp = P.pop(t, ev.c6_peng, 0.4); const n = nap(0);
    if (kp > 0) { P.ell(ctx, 700, 905, 150, 34, '#9AA0B5', { seed: 3, edge: 0.3 }); P.ell(ctx, 700, 880, 46, 58, C.cream, { seed: 4, edge: 0.4 }); P.animal(ctx, 'penguin', 700, 690, 230 * kp, { t, sleep: n > 0.3, nod: n }); if (n > 0.3) G.text(ctx, 'z', 850, 470 - n * 30, { size: 80, fam: FT.title, weight: 700, color: C.navy, alpha: n, boil: 0 }); }
    // nap timer: a 4-second ring that fills while the eyes are shut
    const kt = P.pop(t, ev.c6_4s, 0.4); if (kt > 0) P.at(ctx, 1010, 430, kt, 0, () => { P.ell(ctx, 0, 0, 96, 96, C.cream, { seed: 5, fillA: 0.97 }); P.brush(ctx, (c) => { c.beginPath(); c.arc(0, 0, 80, -Math.PI / 2, -Math.PI / 2 + 6.283 * clamp(n > 0 ? ((t * 0.45) % 1) / 0.42 : 0)); }, C.coral, 16, 1); G.text(ctx, '4 s', 0, 22, { size: 70, fam: FT.title, weight: 700, color: C.ink, align: 'center', boil: 0 }); });
    P.counter(ctx, { x: 1460, y: 330, from: 0, to: 10000, t, t0: ev.c6_10ka, t1: ev.c6_10k, size: 170, sub: 'naps a day (and more)', subSize: 40, color: C.coral });
    P.tag(ctx, 'each about 4 seconds long', 1460, 560, t, ev.c6_4s, 1e9, { size: 48, border: C.coral, fam: FT.title });
    P.stamp(ctx, '= 11 HOURS OF SLEEP', 1440, 760, t, ev.c6_11h, { size: 82, color: C.navy, fg: C.gold, rot: -0.03 });
    P.label(ctx, 'chinstrap penguins on the nest — Libourel et al., Science, 2023', 1880, 1050, { align: 'right', size: 30, alpha: P.fin(t, ev.c6_10k, 0.4) });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S4 — wild elephants: about 2 hours; a little brown bat in a lab: almost 20
  P.shot(ev.c6_s4, (ctx, t, s) => {
    P.night(ctx, t, { seed: 54 }); P.moon(ctx, 960, 150, 70);
    P.hill(ctx, 690, '#2A3A6E', { seed: 5, amp: 30 });
    const ke = P.pop(t, ev.c6_eleph, 0.45); if (ke > 0) { P.animal(ctx, 'elephant', 400, 510, 190 * ke, { t, sleep: Math.sin(t * 0.9) > 0.3, nod: 0.3 }); }
    P.tag(ctx, 'wild African elephants', 400, 200, t, ev.c6_eleph + 0.1, 1e9, { size: 48, border: C.grey, fam: FT.title });
    // the bat hangs from a branch
    const kb = P.pop(t, ev.c6_bat, 0.45); P.brush(ctx, P.pCurve([[1960, 120], [1700, 170], [1480, 150], [1280, 210]], false), '#6B4A33', 30, P.fin(t, ev.c6_bat - 0.4, 0.4));
    if (kb > 0) { ctx.save(); ctx.translate(1480, 160); ctx.rotate(Math.sin(t * 1.1) * 0.06); P.animal(ctx, 'bat', 0, 180 * kb, 190 * kb, { t, sleep: true }); ctx.restore(); P.zzz(ctx, 1600, 520, t, { color: C.cream, size: 50 }); }
    P.tag(ctx, 'a little brown bat (in a lab)', 1500, 620, t, ev.c6_bat + 0.1, 1e9, { size: 46, border: C.brown, fam: FT.title });
    // hours of sleep per day, out of 24
    const bars = [['elephant', 2, C.grey, ev.c6_2h, '2 h'], ['you', 8, C.gold, ev.c6_20 + 0.7, '7–9 h'], ['little brown bat', 19.9, C.brown, ev.c6_20, '~20 h']];
    bars.forEach(([lb, v, col, t0, val], i) => P.hbar(ctx, { x: 420, y: 790 + i * 92, w: 1100, h: 44, frac: v / 24, t, t0, color: col, label: '', value: val, seed: i * 2 }));
    bars.forEach(([lb, v, col, t0], i) => G.text(ctx, lb, 400, 826 + i * 92, { size: 40, fam: FT.hand, color: C.cream, align: 'right', alpha: P.fin(t, t0 - 0.2, 0.3), boil: 0 }));
    P.label(ctx, 'hours of sleep in 24', 1520, 770, { align: 'right', size: 34, alpha: P.fin(t, ev.c6_2h, 0.3) });
    P.stamp(ctx, 'LEAST OF ANY MAMMAL MEASURED', 1020, 330, t, ev.c6_2h + 0.5, { size: 46, color: C.coral, rot: -0.03, t1: ev.c6_bat });
    P.label(ctx, 'Gravett et al., PLoS ONE, 2017 · bat: 1969 lab study (Guinness World Records)', 60, 1062, { size: 28, alpha: P.fin(t, ev.c6_20, 0.4) });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — the upside-down jellyfish: no brain at all, yet quiet at night and sluggish if kept up
  P.shot(ev.c6_s5, (ctx, t, s) => {
    const nk = P.eio((t - ev.c6_quiet + 0.4) / 1.0);
    P.night(ctx, t, { stars: 0, top: P.mix('#3F9FB8', '#122250', nk), bot: P.mix('#1F5F8A', '#0C163D', nk), seed: 56 });
    for (let i = 0; i < 5; i++) { ctx.save(); ctx.globalAlpha = 0.1 * (1 - nk); ctx.fillStyle = C.cream; ctx.beginPath(); ctx.moveTo(200 + i * 340, -20); ctx.lineTo(320 + i * 340, -20); ctx.lineTo(160 + i * 340 + Math.sin(t * 0.5 + i) * 30, 900); ctx.lineTo(60 + i * 340 + Math.sin(t * 0.5 + i) * 30, 900); ctx.closePath(); ctx.fill(); ctx.restore(); }
    P.hill(ctx, 900, P.mix('#D9C48F', '#57608A', nk), { seed: 7, amp: 26 });
    for (let i = 0; i < 6; i++) { const gx = 120 + i * 330; P.brush(ctx, P.pCurve([[gx, 930], [gx + Math.sin(t + i) * 20, 840], [gx - Math.sin(t * 0.8 + i) * 26, 760]], false), '#3F8A6A', 12, 0.8); }
    const pulse = lerp(0.5 + 0.5 * Math.sin(t * 5.5), 0.5 + 0.5 * Math.sin(t * 1.7), nk);
    const poke = t > ev.c6_slug ? Math.exp(-(t - ev.c6_slug) * 1.2) * Math.sin((t - ev.c6_slug) * 5) * 26 : 0;
    const kj = P.pop(t, ev.c6_s5 + 0.15, 0.45); if (kj > 0) P.animal(ctx, 'jelly', 760 + poke, 800, 250 * kj, { t, pulse });
    for (let i = 0; i < 7; i++) { const ph = (t * 0.2 + i / 7) % 1; P.dot(ctx, 500 + U.hash(i, 3) * 600, 760 - ph * 600, 6 + 6 * U.hash(i, 4), C.cream, 0.3 * Math.sin(ph * Math.PI)); }
    if (t > ev.c6_slug - 0.2) for (let i = 0; i < 12; i++) { const u = clamp((t - ev.c6_slug + 0.2 - i * 0.03) / 0.6); if (u > 0 && u < 1) P.dot(ctx, lerp(60, 600, u), 760 + (U.hash(i, 6) - 0.5) * 100, 10, C.cream, 0.7 * (1 - u)); }
    const kb = P.pop(t, ev.c6_nobrain - 0.5, 0.4); if (kb > 0) P.at(ctx, 1440, 360, kb, 0, () => { P.ell(ctx, 0, 0, 190, 190, C.cream, { seed: 5, fillA: 0.97 }); P.brain(ctx, 0, -10, 120, {}); const kx = P.fin(t, ev.c6_nobrain, 0.15); P.line(ctx, -120, -120, lerp(-120, 120, kx), lerp(-120, 120, kx), C.red, 20, 1); });
    P.stamp(ctx, 'NO BRAIN AT ALL', 1440, 620, t, ev.c6_nobrain, { size: 76, color: C.red, rot: -0.03 });
    P.tag(ctx, 'night: pulsing slows down', 1440, 800, t, ev.c6_quiet, 1e9, { size: 46, border: C.sky });
    P.tag(ctx, 'kept awake → sluggish the next day', 1440, 910, t, ev.c6_slug, 1e9, { size: 46, border: C.coral });
    P.tag(ctx, 'the upside-down jellyfish, Cassiopea', 620, 150, t, ev.c6_jelly, 1e9, { size: 46, border: C.teal, fam: FT.title });
    P.label(ctx, 'Nath et al., Current Biology, 2017', 60, 1050, { size: 30, alpha: P.fin(t, ev.c6_jelly, 0.4) });
  }, { in: { type: 'wipe', dir: 'down', dur: 0.5 } });

  // S6 — every animal studied closely pays the price of sleep
  P.shot(ev.c6_s6, (ctx, t, s) => {
    P.night(ctx, t, { seed: 58 }); P.moon(ctx, 960, 190, 110);
    ctx.save(); P.push(ctx, s.u, 960, 700, 0.03);
    P.hill(ctx, 800, '#2A3A6E', { seed: 9, amp: 24 });
    const row = [['elephant', 250, 660, 150], ['penguin', 560, 690, 110], ['rat', 800, 760, 80], ['jelly', 1380, 740, 100], ['dolphin', 1680, 700, 120]];
    row.forEach(([k, x, y, r], i) => { const kk = P.pop(t, ev.c6_every + i * 0.12, 0.35); if (kk > 0) { P.animal(ctx, k, x, y, r * kk, { t, sleep: true, pulse: 0.2, nod: 0.7 }); P.zzz(ctx, x + r * 0.5, y - r * 0.9, t + i * 0.37, { color: C.cream, size: 40, rise: 90 }); } });
    Ch.nod(ctx, { x: 1090, y: 800, s: 0.9 * P.pop(t, ev.c6_every + 0.5, 0.35), t, gesture: 'hug', prop: 'pillow', eyes: 'closed', mouth: Ch.nodMouth(t) });
    ctx.restore();
    P.write(ctx, 'every animal studied closely…', 960, 420, t, ev.c6_every, { size: 84, color: C.cream, dur: 0.8 });
    P.stamp(ctx, 'PAYS THE PRICE', 960, 960, t, ev.c6_price, { size: 96, color: C.gold, fg: C.navy, rot: -0.02 });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S7 — the line Allan Rechtschaffen liked to say
  P.shot(ev.c6_s7, (ctx, t, s) => {
    P.paper(ctx, t, { tint: C.gold });
    ctx.save(); P.push(ctx, s.u, 960, 540, 0.03);
    G.text(ctx, '“', 170, 420, { size: 420, fam: FT.title, weight: 700, color: C.gold, alpha: 0.7 * P.fin(t, ev.c6_s7 + 0.2, 0.4), boil: 0 });
    P.tag(ctx, 'Allan Rechtschaffen, sleep scientist (1927–2021)', 960, 170, t, ev.c6_allan, 1e9, { size: 46, border: C.coral, fam: FT.title });
    const words = ev.c6_quote; const size = 108, maxW = 1500, sp = P.measure(ctx, ' ', size, FT.title, 700); const lines = [[]]; let x = 0;
    for (const w of words) { const ww = P.measure(ctx, w.w, size, FT.title, 700); if (x + ww > maxW && x > 0) { lines.push([]); x = 0; } lines[lines.length - 1].push({ ...w, x, ww }); x += ww + sp; }
    lines.forEach((ln, li) => { const lw = ln[ln.length - 1].x + ln[ln.length - 1].ww; const ox = 960 - lw / 2;
      for (const w of ln) { if (t < w.t - 0.05) continue; const q = clamp((t - w.t + 0.05) / 0.16); const key = /vital|biggest|mistake/i.test(w.w);
        if (key && /mistake/i.test(w.w)) P.brush(ctx, (c) => { c.beginPath(); c.moveTo(ox + w.x - 6, 430 + li * 132 + 22); c.lineTo(ox + w.x + w.ww * q, 430 + li * 132 + 26); }, C.gold, 14, 0.8);
        G.text(ctx, w.w, ox + w.x, 430 + li * 132 + (1 - q) * 14, { size, fam: FT.title, weight: 700, color: key ? C.coral : C.ink, alpha: q, boil: 0 }); } });
    ctx.restore();
    P.splat(ctx, 1200, 800, t, ev.c6_mistake, { color: C.coral, r: 300, n: 16 });
    Ch.nod(ctx, { x: 1700, y: 1030, s: 0.9, t, eyes: 'open', mouth: Ch.nodMouth(t), look: -0.7, lookY: -0.6, gesture: t > ev.c6_mistake ? 'shrug' : 'idle' });
    P.label(ctx, 'his words: “…the biggest mistake the evolutionary process has ever made.”', 960, 1010, { align: 'center', size: 36, alpha: P.fin(t, ev.c6_mistake + 0.3, 0.4) });
  }, { in: { type: 'push', dir: 'up', dur: 0.5 } });
})();
