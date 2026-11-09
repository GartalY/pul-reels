// Cold open — you are moving · faster than sound · you don't feel a thing · STOP · winds/oceans/day · the title in chalk.
(function () {
  const { U, G, Ch, P, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const spinLon = (t) => -t * 18;            // the globe's slow on-screen spin (degrees)

  // S1 — Axel sits in a chair on top of a little Earth; "you are moving. FAST."
  P.shot(ev.c0_s1, (ctx, t) => {
    P.board(ctx, t); P.stars(ctx, t, { n: 90, seed: 2, h: 640 });
    const fast = P.fin(t, ev.c0_fast, 0.25);
    P.globe(ctx, 960, 1380, 640, t, { lon0: spinLon(t) + 40, lat0: 35, grid: 0.3 });
    P.streaks(ctx, 900, 640, 520, 300, t, { a: fast * 0.8, dir: -1 });
    // chair
    P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(900, 745); c.lineTo(900, 640); c.moveTo(900, 690); c.lineTo(990, 690); c.lineTo(990, 745); c.moveTo(900, 690); c.lineTo(900, 600); }, '#C9A27A', 8, 1, { seed: 5 });
    const k = P.pop(t, ev.c0_sit, 0.45);
    Ch.axel(ctx, { x: 920, y: 690, s: 0.95 * k, t, pose: 'sit', eyes: t > ev.c0_fast ? 'wide' : 'normal', mouth: Ch.axelMouth(t), look: 0.3, wind: 0.3 + 1.2 * fast });
    P.write(ctx, 'right now, you are moving.', 960, 230, t, ev.c0_moving - 0.6, { size: 78, dur: 0.8 });
    P.stamp(ctx, 'FAST.', 1460, 420, t, ev.c0_fast, { size: 110, color: C.gold, rot: -0.06 });
  }, { in: { type: 'fade', dur: 0.6 } });

  // S2 — pull back: the whole globe spins about its axis; a speedometer climbs past 1,000 km/h
  P.shot(ev.c0_s2, (ctx, t) => {
    P.board(ctx, t); P.stars(ctx, t, { n: 120, seed: 4 });
    const z = lerp(1.25, 1, P.eio((t - ev.c0_s2) / 1.4));
    ctx.save(); ctx.translate(640, 560); ctx.scale(z, z); ctx.translate(-640, -560);
    const ax = P.fin(t, ev.c0_axis - 0.2, 0.6);
    P.line(ctx, 640, 560 - 430, 640, 560 - 330, C.gold, 7, ax, 1, { dash: true }); P.line(ctx, 640, 560 + 330, 640, 560 + 430, C.gold, 7, ax);
    P.globe(ctx, 640, 560, 330, t, { lon0: spinLon(t) + 20, lat0: 20 });
    P.arcArrow(ctx, 640, 560 - 360, 120, Math.PI * 0.85, Math.PI * 0.15, { ry: 30, color: C.gold, a: ax, lw: 6 });
    // a tiny Axel standing on the globe (Baku-ish latitude, front)
    const pt = P.globePt(640, 560, 330, 50, 40, spinLon(t) + 20 + 0, 20); if (pt.vis) { const sc = 0.18 + 0.1 * pt.z; Ch.axel(ctx, { x: pt.x, y: pt.y, s: sc, t, a: clamp(pt.z * 3), mouth: 'smile', look: 0.4 }); }
    ctx.restore();
    P.label(ctx, 'axis', 700, 150, { size: 40, color: C.gold, alpha: ax });
    const g = P.fin(t, ev.c0_gauge0 - 0.3, 0.3); const v = Data.count(t, ev.c0_gauge0, ev.c0_gauge1, 0, 1000, ease.outCubic) + (t > ev.c0_gauge1 ? 40 * Math.sin((t - ev.c0_gauge1) * 3) + 40 : 0);
    P.gauge(ctx, 1420, 560, 250, v, 2000, { a: g, label: 'your speed, for most people on Earth', red: 1235 });
    P.tag(ctx, 'more than 1,000 km/h', 1420, 940, t, ev.c0_gauge1, 1e9, { size: 48, border: C.gold });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S3 — the equator lights up: 1,670 km/h vs the speed of sound
  P.shot(ev.c0_s3, (ctx, t) => {
    P.board(ctx, t);
    const eq = P.fin(t, ev.c0_eq - 0.2, 0.5);
    P.globe(ctx, 480, 560, 320, t, { lon0: spinLon(t) + 70, lat0: 12, equator: eq });
    // a runner dot along the equator
    const ph = ((t - ev.c0_eq) * 0.9) % 1; if (eq > 0) for (let i = 0; i < 6; i++) { const lo = -90 + ((ph + i / 6) % 1) * 180; const p = P.globePt(480, 560, 320, lo + spinLon(t) + 70, 0, spinLon(t) + 70, 12); if (p.vis) P.circle(ctx, p.x, p.y, 7, C.gold, 4, eq * (i === 0 ? 1 : 0.4), { fill: C.gold, fillA: 1, dash: false }); }
    P.label(ctx, 'equator', 480, 940, { size: 42, align: 'center', color: C.gold, alpha: eq });
    P.counter(ctx, { x: 1300, y: 330, from: 1000, to: 1670, t, t0: ev.c0_eq + 0.2, t1: ev.c0_1670, size: 130, sub: 'km/h at the equator', color: C.gold });
    P.hbar(ctx, { x: 960, y: 640, w: 760, frac: 1, t, t0: ev.c0_1670, color: C.gold, label: 'the ground at the equator', value: '' , seed: 3 });
    P.hbar(ctx, { x: 960, y: 820, w: 760, frac: 1225 / 1670, t, t0: ev.c0_sound - 0.1, color: C.sky, label: 'the speed of sound (sea level)', value: '', seed: 5 });
    G.text(ctx, '1,670', 960 + 760 - 20, 686, { size: 40, fam: FT.num, color: '#16223A', align: 'right', alpha: P.fin(t, ev.c0_1670 + 0.6, 0.3), boil: 0 });
    G.text(ctx, '~1,225', 960 + 760 * 1225 / 1670 - 20, 866, { size: 40, fam: FT.num, color: '#16223A', align: 'right', alpha: P.fin(t, ev.c0_sound + 0.6, 0.3), boil: 0 });
    P.ring(ctx, 960 + 760 * 1225 / 1670, 847, t, ev.c0_sound, { r: 140, color: C.sky });
    P.stamp(ctx, 'FASTER THAN SOUND', 1340, 990, t, ev.c0_sound + 0.35, { size: 56, color: C.chalk, rot: -0.03 });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S4 — Axel sips tea on a calm, spinning world … the planet STOPS (screech, cup flies)
  P.shot(ev.c0_s4, (ctx, t) => {
    const st = ev.c0_stop; const stopped = t >= st;
    P.board(ctx, t); P.stars(ctx, t, { n: 90, seed: 6, h: 600 });
    ctx.save(); if (stopped) P.shake(ctx, t, st, 6, 0.3);
    // the globe decelerates hard in the last 0.25 s before the stop, then freezes
    const lon = t < st - 0.25 ? spinLon(t) : spinLon(st - 0.25) - 18 * 0.125 * (1 - Math.pow(1 - clamp((t - st + 0.25) / 0.25), 2)) * 2;
    P.globe(ctx, 960, 1400, 660, t, { lon0: lon + 40, lat0: 35, grid: 0.3 });
    P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(900, 745); c.lineTo(900, 640); c.moveTo(900, 690); c.lineTo(990, 690); c.lineTo(990, 745); c.moveTo(900, 690); c.lineTo(900, 600); }, '#C9A27A', 8, 1, { seed: 5 });
    const fly = stopped ? clamp((t - st) / 0.7) : 0;
    Ch.axel(ctx, { x: 920 + 60 * ease.outCubic(fly), y: 690 - 14 * Math.sin(fly * 3.14), s: 0.95, t, pose: 'sit', gesture: stopped ? 'flail' : 'cup', cup: t > ev.c0_thing && t < ev.c0_thing + 0.8 ? 0.5 : 0,
      eyes: stopped ? 'wide' : t > ev.c0_thing - 0.2 && t < ev.c0_thing + 0.8 ? 'happy' : 'normal', mouth: stopped ? 'o' : Ch.axelMouth(t), wind: stopped ? 1.6 : 0.3 });
    if (stopped) { // the cup and tea fly on (east = right)
      const u = t - st; const cx = 1000 + 900 * u, cy = 650 - 260 * u + 300 * u * u;
      P.at(ctx, cx, cy, 1, u * 8, () => P.icon(ctx, 'cup', 0, 0, 34, { seed: 91 }));
      for (let i = 0; i < 8; i++) { ctx.save(); ctx.globalAlpha = clamp(1 - u); ctx.fillStyle = C.coral; ctx.beginPath(); ctx.arc(cx - 30 - i * 22 * (1 + U.hash(i, 3)), cy + 10 + (U.hash(i, 4) - 0.5) * 60, 5 + 4 * U.hash(i, 5), 0, 7); ctx.fill(); ctx.restore(); }
      P.streaks(ctx, 900, 600, 600, 340, t, { a: clamp(1 - (t - st - 0.5)) * 0.8 });
    }
    ctx.restore();
    P.write(ctx, "you don't feel a thing.", 960, 210, t, L('c0_4').t, { size: 70, t1: st - 0.1, dur: 0.7 });
    P.stamp(ctx, 'STOP!', 960, 300, t, st, { size: 150, color: C.red, rot: -0.05 });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S5 — what would change: three chalk cards
  P.shot(ev.c0_s5, (ctx, t) => {
    P.board(ctx, t);
    P.write(ctx, 'no more spin. what would change?', 960, 150, t, ev.c0_s5 + 0.2, { size: 70, dur: 0.7 });
    const cards = [['THE WINDS', C.sky], ['THE OCEANS', C.ocean], ['THE LENGTH OF A DAY', C.gold]];
    cards.forEach(([s, col], i) => { const k = P.pop(t, ev.c0_cards[i], 0.4); if (k <= 0) return; const x = 340 + i * 620, y = 520;
      P.at(ctx, x, y, k, (i - 1) * 0.04, () => {
        P.box(ctx, -270, -260, 540, 520, col, { r: 26, lw: 6, seed: 20 + i });
        if (i === 0) for (let j = 0; j < 4; j++) { const yy = -120 + j * 50, ph = t * 3 + j; P.stroke(ctx, (c) => { c.beginPath(); for (let xx = -200; xx <= 200; xx += 10) { const y2 = yy + Math.sin(xx / 40 + ph) * 10; xx === -200 ? c.moveTo(xx, y2) : c.lineTo(xx, y2); } }, C.sky, 6, 0.9, { seed: 30 + j }); }
        if (i === 1) { P.icon(ctx, 'wave', 0, -40, 150, { t }); }
        if (i === 2) { const hh = (t - ev.c0_cards[2]) * 6; P.clock(ctx, 0, -50, 120, hh, (hh % 1) * 60); }
        G.text(ctx, s, 0, 190, { size: i === 2 ? 44 : 58, fam: FT.title, color: col === C.ocean ? C.sky : col, align: 'center', boil: 0 }); }); });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — the question, then the title: five chalk words slam onto the board
  P.shot(ev.c0_s6, (ctx, t) => {
    P.board(ctx, t); P.stars(ctx, t, { n: 70, seed: 8 });
    const q = L('c0_6');
    if (t < ev.title0 + 0.2) P.write(ctx, 'so… what would happen?', 960, 540, t, q.t, { size: 84, t1: ev.title0 + 0.2, dur: 0.9 });
    const words = ev.titleWords; const size = 150;
    const rows = [[words[0], words[1], words[2]], [words[3], words[4]]];
    rows.forEach((ws, r) => { const sp = 40; const tw = ws.reduce((a, w) => a + P.measure(ctx, w.w, size, FT.title) + sp, -sp); let xx = 960 - tw / 2;
      ws.forEach((w) => { const ww = P.measure(ctx, w.w, size, FT.title); if (t >= w.t) { const k = lerp(1.7, 1, ease.outCubic(clamp((t - w.t) / 0.14))); const col = w.w === 'STOPPED' ? C.red : w.w === 'SPINNING?' ? C.gold : C.chalk;
        P.at(ctx, xx + ww / 2, 330 + r * 190, k, (U.hash(w.t * 10, 3) - 0.5) * 0.06, () => G.text(ctx, w.w, 0, 0, { size, fam: FT.title, color: col, align: 'center', boil: 0 })); P.dust(ctx, xx + ww / 2, 360 + r * 190, t, w.t, { r: ww * 0.5, color: col }); }
        xx += ww + sp; }); });
    // a spin swoosh under the title
    const sw = P.fin(t, words[4].t + 0.2, 0.5); if (sw > 0) P.arcArrow(ctx, 960, 640, 520, Math.PI * 0.92, Math.PI * (0.92 - 0.84 * sw), { ry: 70, color: C.gold, lw: 8 });
    const kb = P.pop(t, ev.titleBrand, 0.45); if (kb > 0) { P.planet(ctx, 820, 840, 36 * kb, t); G.text(ctx, 'WHYVERSE', 1000, 866, { size: 64, fam: FT.title, color: C.gold, align: 'center', alpha: clamp(kb), boil: 0 }); }
    Ch.axel(ctx, { x: 1640, y: 960, s: 0.7, t, gesture: t > ev.sync_title ? 'cheer' : 'idle', eyes: t > ev.sync_title ? 'happy' : 'normal', mouth: Ch.axelMouth(t), look: -0.6, lookY: -0.6 });
  }, { in: { type: 'fade', dur: 0.5 } });
})();
