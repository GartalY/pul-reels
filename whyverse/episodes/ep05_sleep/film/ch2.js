// Chapter 2 — Two clocks inside you: the adenosine hourglass · coffee only blocks the sensors · the 20,000-cell clock + melatonin · 24 h 11 min, reset by light · jet lag · the two line up.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const drop = (ctx, x, y, r, col, a = 1) => P.wash(ctx, (c) => { c.beginPath(); c.moveTo(x, y - r * 1.5); c.bezierCurveTo(x + r * 1.1, y - r * 0.2, x + r, y + r, x, y + r); c.bezierCurveTo(x - r, y + r, x - r * 1.1, y - r * 0.2, x, y - r * 1.5); c.closePath(); }, col, { a, edge: 0.4 });
  P.drop = drop;

  P.cardShot('c2', 2, 'Two clocks inside you', (ctx, t) => {
    P.hourglass(ctx, 1500, 900, 200, (t * 0.12) % 1, t, { a: 0.4 }); P.clock(ctx, 1720, 900, 80, t * 0.8, (t * 48) % 60, { a: 0.4, rim: C.sky });
  });

  // S1 — clock one, the hourglass: adenosine builds up every hour you are awake
  P.shot(ev.c2_s1, (ctx, t, s) => {
    P.paper(ctx, t, { tint: C.gold });
    const f = 0.03 + 0.9 * clamp((t - ev.c2_awake) / (s.t1 - 0.4 - ev.c2_awake));
    const kh = P.pop(t, ev.c2_hg, 0.45); if (kh > 0) P.at(ctx, 420, 560, kh, 0, () => P.hourglass(ctx, 0, 0, 560, f, t));
    P.ring(ctx, 420, 560, t, ev.c2_hg, { r: 380, color: C.gold });
    const hrs = Math.round(f / 0.93 * 16); P.tag(ctx, 'awake: ' + hrs + ' h', 420, 150, t, ev.c2_awake, 1e9, { size: 56, border: C.gold, fam: FT.title });
    // the brain fills with adenosine
    const kb = P.pop(t, ev.c2_awake - 0.3, 0.45); if (kb > 0) { P.brain(ctx, 1230, 520, 330 * kb, { folds: 0.6 });
      const n = Math.floor(70 * (f - 0.03) / 0.9); for (let i = 0; i < n; i++) { const an = U.hash(i, 1) * 6.283, rr = Math.sqrt(U.hash(i, 2)) * 250; const x = 1230 + Math.cos(an) * rr * 1.05, y = 500 + Math.sin(an) * rr * 0.72 + Math.sin(t * 2 + i) * 4; P.dot(ctx, x, y, 11, C.gold, 0.95); P.dot(ctx, x - 3, y - 3, 3.5, C.cream, 0.8); } }
    P.tag(ctx, 'adenosine', 1230, 130, t, ev.c2_aden, 1e9, { size: 56, border: C.gold, fam: FT.title }); if (t > ev.c2_aden) P.arrow(ctx, 1230, 180, 1230, 270, { color: C.gold, k: P.fin(t, ev.c2_aden, 0.3) });
    // sleep pressure gauge
    const a = P.fin(t, ev.c2_aden - 0.2, 0.4); ctx.save(); ctx.globalAlpha *= a; P.rect(ctx, 1690, 250, 70, 600, 30, C.paper2, { seed: 3, edge: 0.3 }); P.wash(ctx, P.pRR(1690, 250 + 600 * (1 - f), 70, 600 * f, 30), P.mix(C.gold, C.coral, f), { bb: [1725, 700, 300], seed: 4 });
    P.label(ctx, 'sleep', 1725, 910, { align: 'center', size: 40, color: C.ink }); P.label(ctx, 'pressure', 1725, 955, { align: 'center', size: 40, color: C.ink }); ctx.restore();
    const y = t > ev.c2_sleepier && t < ev.c2_sleepier + 1.4;
    Ch.nod(ctx, { x: 850, y: 1030, s: 1.0, t, eyes: y ? 'closed' : f > 0.55 ? 'sleepy' : 'open', gesture: y ? 'yawn' : 'idle', mouth: y ? 'yawn' : Ch.nodMouth(t), look: 0.5, lookY: -0.3 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — sleep empties the hourglass; coffee doesn't: caffeine only plugs the adenosine sensors
  P.shot(ev.c2_s2, (ctx, t, s) => {
    P.paper(ctx, t, { tint: C.coral });
    const fl = P.eio((t - ev.c2_empties) / 0.7), back = P.eio((t - ev.c2_coffee) / 0.4);
    const f = t < ev.c2_coffee ? 0.93 : lerp(0.07, 0.93, back);
    P.at(ctx, 330, 470, 1, t < ev.c2_coffee ? Math.PI * fl : 0, () => P.hourglass(ctx, 0, 0, 440, f, t, { running: false }));
    const km = P.pop(t, ev.c2_empties, 0.4) * P.fout(t, ev.c2_coffee, 0.2); if (km > 0) { P.at(ctx, 330, 130, km, 0, () => { P.ell(ctx, 0, 0, 62, 62, C.night2, { seed: 5 }); P.moon(ctx, 0, 0, 36, { glow: 0 }); }); }
    P.tag(ctx, 'sleep empties it', 330, 780, t, ev.c2_empties + 0.2, ev.c2_coffee, { size: 50, border: C.night2, fam: FT.title });
    const kc = P.pop(t, ev.c2_coffee, 0.4); if (kc > 0) { P.cup(ctx, 330, 150, 78 * kc, t); }
    P.tag(ctx, "coffee doesn't", 330, 780, t, ev.c2_coffee + 0.15, 1e9, { size: 50, border: C.coral, fam: FT.title });
    // the cell surface with four adenosine sensors
    const a = P.fin(t, ev.c2_s2 + 0.3, 0.5); ctx.save(); ctx.globalAlpha *= a;
    P.wash(ctx, (c) => { c.beginPath(); c.moveTo(760, 640); c.quadraticCurveTo(1300, 590, 1840, 640); c.lineTo(1840, 1120); c.lineTo(760, 1120); c.closePath(); }, C.brain, { bb: [1300, 850, 560], seed: 6 });
    P.label(ctx, 'a brain cell', 1300, 800, { align: 'center', size: 44, color: P.dk(C.brain, 0.5) });
    for (let i = 0; i < 4; i++) { const x = 900 + i * 265, y = 612 - Math.sin((i + 0.5) / 4 * Math.PI) * 22;
      P.brush(ctx, (c) => { c.beginPath(); c.moveTo(x - 52, y - 70); c.lineTo(x - 52, y); c.quadraticCurveTo(x, y + 44, x + 52, y); c.lineTo(x + 52, y - 70); }, C.navy, 16, 1);
      const pl = P.fin(t, ev.c2_plugs[i], 0.16);
      if (pl > 0) { const yy = lerp(y - 420, y - 38, ease.outBounce(pl)); P.rect(ctx, x - 36, yy - 36, 72, 72, 12, C.coral, { seed: 30 + i }); G.text(ctx, 'c', x, yy + 16, { size: 54, fam: FT.title, weight: 700, color: C.cream, align: 'center', boil: 0 }); }
      // adenosine: docked before the plug, pushed out after
      const out = P.eio((t - ev.c2_plugs[i]) / 0.3); const ax = x + out * (i % 2 ? 60 : -60), ay = lerp(y - 26, y - 190 - (i % 2) * 50, out) + Math.sin(t * 2 + i) * 8 * out;
      if (out < 0.05) P.glow(ctx, x, y + 60, 90, C.gold, 0.5 + 0.3 * Math.sin(t * 6 + i));
      P.dot(ctx, ax, ay, 30, C.gold); P.dot(ctx, ax - 8, ay - 8, 9, C.cream, 0.8);
      for (let j = 0; j < 3; j++) { const fx = x - 80 + j * 80 + Math.sin(t * 1.3 + i + j) * 20, fy = 380 + j * 36 + Math.cos(t * 1.1 + i * 2 + j) * 24; P.dot(ctx, fx, fy, 22, C.gold, 0.9); } }
    ctx.restore();
    P.tag(ctx, 'adenosine sensors', 1300, 300, t, ev.c2_s2 + 0.8, ev.c2_blocks, { size: 46, border: C.gold });
    P.tag(ctx, 'caffeine blocks the sensors', 1300, 300, t, ev.c2_blocks, 1e9, { size: 50, border: C.coral, fam: FT.title });
    const feel = lerp(0.93, 0.22, P.eio((t - ev.c2_blocks - 0.3) / 0.9));
    P.hbar(ctx, { x: 110, y: 890, w: 440, h: 44, frac: feel, t, t0: ev.c2_blocks - 0.3, d: 0.4, color: C.sky, label: 'the pressure you feel', seed: 3 });
    P.hbar(ctx, { x: 110, y: 1000, w: 440, h: 44, frac: 0.93, t, t0: ev.c2_blocks - 0.1, d: 0.4, color: C.coral, label: 'the pressure that is there', seed: 5 });
    P.stamp(ctx, 'STILL THERE', 740, 1000, t, ev.c2_still, { size: 62, color: C.coral, rot: -0.05 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — clock two, a real one: ~20,000 nerve cells deep in the brain, ticking even in total darkness
  const scnClock = (ctx, t, x, y, r) => { P.glow(ctx, x, y, r * 1.9, C.gold, 0.8);
    for (let i = 0; i < 60; i++) { const an = U.hash(i, 5) * 6.283, rr = Math.sqrt(U.hash(i, 6)) * r * 0.95; P.dot(ctx, x + Math.cos(an) * rr, y + Math.sin(an) * rr, 9 + 5 * U.hash(i, 7), i % 3 ? C.gold : C.coral, 0.45 + 0.35 * Math.sin(t * 3 + i)); }
    P.clock(ctx, x, y, r * 0.62, t * 0.9 + 9, (t * 54) % 60, { rim: C.navy }); };
  P.shot(ev.c2_s3, (ctx, t, s) => {
    P.paper(ctx, t, { tint: C.sky });
    const dk = P.fin(t, ev.c2_dark, 0.15);
    ctx.save(); P.push(ctx, s.u, 620, 560, 0.03);
    P.brain(ctx, 600, 560, 400, {});
    const kd = P.pop(t, ev.c2_deep, 0.4); const sx = 560, sy = 680;
    if (kd > 0) { P.glow(ctx, sx, sy, 110 * kd, C.gold, 1); P.dot(ctx, sx, sy, 18 * kd, C.gold); P.ring(ctx, sx, sy, t, ev.c2_deep, { r: 200, color: C.gold }); }
    ctx.restore();
    if (dk > 0) { ctx.save(); ctx.globalAlpha = 0.78 * dk; ctx.fillStyle = '#0B0F33'; ctx.fillRect(0, 0, W, H); ctx.restore(); P.dark = true; }
    const kz = P.pop(t, ev.c2_deep + 0.3, 0.45); if (kz > 0) { P.line(ctx, sx + 20, sy - 10, 1150, 560, C.gold, 5, 0.7 * kz); P.at(ctx, 1380, 500, kz, 0, () => { P.ell(ctx, 0, 0, 270, 270, C.cream, { seed: 8, fillA: 0.97 }); scnClock(ctx, t, 0, 0, 230); }); }
    P.tag(ctx, 'a real clock', 600, 110, t, ev.c2_real, ev.c2_dark, { size: 60, border: C.sky, fam: FT.title });
    P.counter(ctx, { x: 1380, y: 930, from: 0, to: 20000, t, t0: ev.c2_20ka, t1: ev.c2_20k, size: 120, sub: 'nerve cells (about)', color: C.coral });
    P.stamp(ctx, 'EVEN IN THE DARK', 600, 150, t, ev.c2_dark + 0.2, { size: 80, color: C.gold, fg: C.navy });
    P.dark = false;
  }, { in: { type: 'fade', dur: 0.4 } });

  // S3b — evening: the clock tells the brain to release melatonin
  P.shot(ev.c2_s3b, (ctx, t, s) => {
    const ev0 = ev.c2_evening, k = P.eio((t - ev0 + 0.6) / (ev.c2_begun - ev0 + 0.6));
    P.paper(ctx, t); const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, P.mix('#F6C98E', C.night, k)); g.addColorStop(0.7, P.mix('#F3A27A', C.night2, k)); g.addColorStop(1, P.mix('#F0D9A8', '#34448F', k)); ctx.save(); ctx.globalAlpha = 0.92; ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore(); P.dark = k > 0.45;
    P.stars(ctx, t, { a: k, seed: 12 });
    P.sun(ctx, 1500, lerp(520, 980, k), 90, t, { a: 1 - k * 0.6 });
    P.hill(ctx, 860, P.mix('#6FAE6E', '#1F2D5A', k), { seed: 3, amp: 40 });
    const km = P.pop(t, ev.c2_begun, 0.45); if (km > 0) P.at(ctx, 1560, 240, km, 0, () => P.moon(ctx, 0, 0, 90));
    P.brain(ctx, 420, 470, 250, {}); P.glow(ctx, 395, 545, 70, C.gold, 1); P.clock(ctx, 395, 545, 34, t + 6, (t * 60) % 60, { rim: C.navy });
    // melatonin droplets stream out toward Nod
    if (t > ev.c2_mel - 0.3) for (let i = 0; i < 16; i++) { const ph = ((t - ev.c2_mel + 0.3) * 0.33 - i * 0.06); if (ph < 0) continue; const u = ph % 1; const x = lerp(520, 1240, u), y = 620 + Math.sin(u * 5 + i) * 60 + u * 150; drop(ctx, x, y, 15, C.lilac, Math.sin(u * Math.PI)); }
    P.tag(ctx, 'melatonin', 880, 520, t, ev.c2_mel, 1e9, { size: 60, border: C.lilac, fam: FT.title });
    Ch.nod(ctx, { x: 1320, y: 940, s: 1.15, t, eyes: t > ev.c2_mel + 0.8 ? 'sleepy' : 'open', gesture: t > ev.c2_begun ? 'yawn' : 'idle', mouth: t > ev.c2_begun && t < ev.c2_begun + 1.3 ? 'yawn' : Ch.nodMouth(t), look: -0.6 });
    P.stamp(ctx, 'NIGHT HAS BEGUN', 960, 190, t, ev.c2_begun, { size: 84, color: C.navy, fg: C.gold, rot: -0.02 });
  }, { in: { type: 'wipe', dir: 'left', dur: 0.5 } });

  // S4 — left alone it runs slow: 24 h 11 min. Morning light resets it.
  P.shot(ev.c2_s4, (ctx, t, s) => {
    P.paper(ctx, t, { tint: C.sky });
    const T0 = ev.c2_s4 + 0.3, lap = 1.5; const reset = P.eio((t - ev.c2_reset) / 0.25);
    const ph1 = ((t - T0) / lap); const lag = Math.min(0.2, 0.045 * Math.max(0, ph1)) * (1 - reset); const ph2 = ph1 - lag;
    const ring = (x, col, ph, title, sub, showLag) => { P.brush(ctx, (c) => { c.beginPath(); c.arc(x, 520, 250, 0, 7); }, P.dark ? C.cream : C.paper2, 40, 1); P.brush(ctx, (c) => { c.beginPath(); c.arc(x, 520, 250, 0, 7); }, col, 8, 0.6);
      for (let i = 0; i < 24; i++) { const an = i / 24 * 6.283 - 1.5708; P.line(ctx, x + Math.cos(an) * 205, 520 + Math.sin(an) * 205, x + Math.cos(an) * 222, 520 + Math.sin(an) * 222, C.dim, i % 6 ? 3 : 6, 0.7); }
      const an = ph * 6.283 - 1.5708;
      if (showLag && lag > 0.004) P.brush(ctx, (c) => { c.beginPath(); c.arc(x, 520, 250, an, an + lag * 6.283); }, C.coral, 40, 0.9);
      P.dot(ctx, x + Math.cos(an) * 250, 520 + Math.sin(an) * 250, 30, col); P.dot(ctx, x + Math.cos(an) * 250 - 8, 520 + Math.sin(an) * 250 - 8, 9, C.cream, 0.8);
      G.text(ctx, title, x, 500, { size: 56, fam: FT.title, weight: 700, color: C.ink, align: 'center', boil: 0 }); G.text(ctx, sub, x, 580, { size: 64, fam: FT.title, weight: 700, color: col, align: 'center', boil: 0 }); };
    ring(520, C.sky, ph1, "the planet's day", '24 h 00 min', false);
    ring(1400, C.coral, ph2, 'your inner clock', t > ev.c2_2411 ? '24 h 11 min' : '24 h …', true);
    P.ring(ctx, 1400, 520, t, ev.c2_2411, { r: 380, color: C.coral });
    P.tag(ctx, 'runs a little slow (lag exaggerated)', 1400, 880, t, ev.c2_slow, ev.c2_reset, { size: 42, border: C.coral });
    const ks = P.pop(t, ev.c2_light, 0.5); if (ks > 0) { P.sun(ctx, 960, 190, 80 * ks, t); P.glow(ctx, 960, 190, 900 * ks, C.gold, 0.35); }
    P.stamp(ctx, 'RESET', 1400, 880, t, ev.c2_reset, { size: 110, color: C.gold, fg: C.navy });
    P.label(ctx, 'average 24.18 h — Czeisler et al., Science, 1999', 960, 1030, { align: 'center', size: 32, alpha: P.fin(t, ev.c2_2411, 0.4) });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — fly across the world and the clock stays on the old time: jet lag
  P.shot(ev.c2_s5, (ctx, t, s) => {
    P.paper(ctx, t);
    const map = Data.map({ region: [-135, 5, 150, 66], x: 40, y: 60, w: 1840, h: 800 });
    Data.drawMap(ctx, map, { land: '#E3D2A6', stroke: '#B6A47C', lw: 1.5, t, t0: ev.c2_s5, dur: 0.6, clip: true });
    const A = map.proj(-74, 40.7), B = map.proj(139.7, 35.7);
    Data.route(ctx, A, B, { t, t0: ev.c2_fly, t1: ev.c2_old, color: C.coral, lw: 7, arc: 0.28, icon: 'plane' });
    P.dot(ctx, A[0], A[1], 13, C.navy); P.dot(ctx, B[0], B[1], 13, C.navy, P.fin(t, ev.c2_old - 0.2, 0.2));
    const fly = P.eio((t - ev.c2_fly) / (ev.c2_old - ev.c2_fly)); const local = 8 + 13 * fly;
    P.card(ctx, 520, 900, 520, 250, C.sky, 3, () => { P.clock(ctx, -150, 0, 84, local, (local % 1) * 60, { rim: C.sky }); G.text(ctx, 'local time', 80, -20, { size: 52, fam: FT.title, weight: 700, color: C.ink, align: 'center', boil: 0 }); G.text(ctx, String(Math.floor(local) % 24).padStart(2, '0') + ':00', 80, 60, { size: 76, fam: FT.title, weight: 700, color: C.sky, align: 'center', boil: 0 }); }, P.pop(t, ev.c2_s5 + 0.3, 0.4));
    P.card(ctx, 1400, 900, 520, 250, C.coral, 4, () => { P.clock(ctx, -150, 0, 84, 8, 0, { rim: C.coral }); G.text(ctx, 'your inner clock', 80, -20, { size: 46, fam: FT.title, weight: 700, color: C.ink, align: 'center', boil: 0 }); G.text(ctx, '08:00', 80, 60, { size: 76, fam: FT.title, weight: 700, color: C.coral, align: 'center', boil: 0 }); }, P.pop(t, ev.c2_s5 + 0.45, 0.4));
    P.stamp(ctx, 'JET LAG', 960, 420, t, ev.c2_jet, { size: 150, color: C.navy, fg: C.gold, rot: -0.04 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S6 — hourglass full + clock says night → the two line up → asleep
  P.shot(ev.c2_s6, (ctx, t, s) => {
    const k = P.eio((t - ev.c2_lineup) / 0.6);
    P.paper(ctx, t); P.night(ctx, t, { a: k, seed: 14, stars: 1 }); P.dark = k > 0.5;
    const x1 = lerp(480, 780, k), x2 = lerp(1440, 1140, k), yy = lerp(520, 330, k), sc = lerp(1, 0.72, k);
    const k1 = P.pop(t, ev.c2_full, 0.4); if (k1 > 0) P.at(ctx, x1, yy, k1 * sc, 0, () => P.hourglass(ctx, 0, 0, 440, 0.95, t, { running: false }));
    const k2 = P.pop(t, ev.c2_night, 0.4); if (k2 > 0) P.at(ctx, x2, yy, k2 * sc, 0, () => { P.clock(ctx, 0, 0, 190, 23, 0, { rim: C.night2 }); P.at(ctx, 150, -170, 1, 0, () => P.moon(ctx, 0, 0, 50)); });
    P.tag(ctx, 'hourglass: full', 480, 860, t, ev.c2_full + 0.1, ev.c2_lineup, { size: 52, border: C.gold, fam: FT.title });
    P.tag(ctx, 'clock: night', 1440, 860, t, ev.c2_night + 0.1, ev.c2_lineup, { size: 52, border: C.night2, fam: FT.title });
    if (k > 0.2) G.text(ctx, '+', 960, 370, { size: 150, fam: FT.title, weight: 700, color: C.gold, align: 'center', alpha: P.fin(t, ev.c2_lineup + 0.3, 0.2), boil: 0 });
    P.ring(ctx, 960, 330, t, ev.c2_lineup + 0.5, { r: 520, color: C.gold });
    const kb = P.pop(t, ev.c2_asleep - 0.25, 0.45, 1.3); if (kb > 0) { P.bed(ctx, 960, 1010, 1.35 * kb, { t, blanket: C.peri }); P.zzz(ctx, 760, 740, t, { color: C.cream, size: 66, a: P.fin(t, ev.c2_asleep, 0.3) }); }
    Ch.nod(ctx, { x: 1770, y: 1040, s: 0.85, t, eyes: t > ev.c2_asleep ? 'closed' : 'sleepy', gesture: t > ev.c2_asleep ? 'hug' : 'idle', prop: t > ev.c2_asleep ? 'pillow' : null, mouth: Ch.nodMouth(t), look: -0.6 });
  }, { in: { type: 'fade', dur: 0.4 } });
})();
