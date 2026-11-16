// Cold open — 18 Nov 2026 · a car-sized machine crosses a line nothing we built has crossed · one light-day: hello takes a day, the answer
// another · Voyager 1, 1977, fridge-bulb radio, computers < one phone photo · still talking, dishes catch the whisper · promise (3 cards) ·
// "How do we still hear Voyager 1?" · stamped title.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;

  // S1 — deep space; Voyager drifts toward a glowing dashed line; date tag; "small car" for scale; FIRST EVER
  P.shot(ev.c0_s1, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 260, seed: 2, glow: [200, 980, 700, C.coral, 0.45] });
    const lx = 1360; const lk = P.eio((t - ev.c0_line) / 0.7);
    if (lk > 0) { ctx.save(); ctx.strokeStyle = C.gold; ctx.lineWidth = 6; ctx.setLineDash([26, 18]); ctx.lineDashOffset = -t * 40; ctx.beginPath(); ctx.moveTo(lx, 60); ctx.lineTo(lx, 60 + (H - 120) * lk); ctx.stroke(); ctx.restore(); P.glow(ctx, lx, 540, 300, C.gold, 0.35 * lk);
      P.note(ctx, '1 light-day from Earth', lx + 30, 120, t, ev.c0_line + 0.3, { align: 'left', size: 44 }); }
    const fl = Math.exp(-Math.max(0, t - ev.c0_ever) * 3) * (t > ev.c0_ever ? 1 : 0); if (fl > 0) P.glow(ctx, lx, 540, 600, C.gold, fl);
    const vx = lerp(300, 1240, P.oc((t - 0.2) / 7.5)), vy = 560 + Math.sin(t * 0.7) * 10;
    P.voyager(ctx, vx, vy, 0.95, t, { rot: -0.08 + Math.sin(t * 0.4) * 0.02, a: P.fin(t, 0.15, 0.8) });
    const ck = P.pop(t, ev.c0_car, 0.4) * P.fout(t, ev.c0_ever, 0.3);
    if (ck > 0) P.at(ctx, vx, vy + 300, ck, 0, () => { P.silP(ctx, [[-150, 0], [-150, -50], [-100, -60], [-60, -110], [70, -110], [110, -60], [150, -50], [150, 0]], {}); P.silE(ctx, -90, 0, 30, 30, {}); P.silE(ctx, 90, 0, 30, 30, {}); G.text(ctx, '≈ a small car', 0, 90, { size: 40, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 }); });
    P.tag(ctx, '18 NOV 2026 · 10:16 UTC', 960, 110, t, ev.c0_date, 1e9, { size: 42, fill: C.cream, color: C.ink, dot: C.coral });
    P.stamp(ctx, 'FIRST EVER', 1360, 860, t, ev.c0_ever, { size: 90, color: C.coral });
  }, { in: { type: 'fade', dur: 0.6 } });

  // S2 — hello from Earth: a day out, a day back
  P.shot(ev.c0_s2, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 220, seed: 5 });
    const ex = 230, vx = 1680, y = 520;
    P.earth(ctx, ex, y, 46, t); P.voyager(ctx, vx, y, 0.42, t, { rot: -0.1, beam: t > ev.c0_answer ? 1 : 0 });
    P.dimLine(ctx, ex + 70, 700, vx - 70, 700, 'ONE LIGHT-DAY', P.eio((t - ev.c0_ld + 0.2) / 0.6), { size: 40 });
    Ch.echo(ctx, { x: 330, y: 980, s: 0.75, t, gesture: t > ev.c0_hello - 0.3 && t < ev.c0_answer ? 'wave' : 'idle', mouth: P.talk(t), look: 1 });
    // hello bubble
    const hb = P.pop(t, ev.c0_hello, 0.35) * P.fout(t, ev.c0_fly + 0.4, 0.3); if (hb > 0) P.at(ctx, 470, 330, hb, 0, () => { P.rect(ctx, -110, -50, 220, 100, 50, C.cream, { shadow: 0.25 }); G.text(ctx, 'hello!', 0, 16, { size: 50, fam: P.HAND, color: C.ink, align: 'center', boil: 0 }); });
    // outgoing signal (one day) then the reply (another day)
    const kOut = clamp((t - ev.c0_fly) / Math.max(0.5, ev.c0_arrive - ev.c0_fly)); if (t > ev.c0_fly && t < ev.c0_answer + 0.2) P.signal(ctx, ex + 60, y, vx - 80, y, t, { k: kOut, a: P.fout(t, ev.c0_answer + 0.2, 0.3) });
    const kBack = clamp((t - ev.c0_answer) / Math.max(0.5, ev.c0_back - ev.c0_answer)); if (t > ev.c0_answer) P.signal(ctx, vx - 80, y + 20, ex + 60, y + 20, t, { k: kBack, color: C.gold });
    // a clock that runs 0 → 24 h → 48 h
    const hrs = t < ev.c0_fly ? 0 : t < ev.c0_arrive ? 24 * kOut : t < ev.c0_answer ? 24 : 24 + 24 * kBack;
    const ca = P.fin(t, ev.c0_fly - 0.3, 0.3); if (ca > 0) { ctx.save(); ctx.globalAlpha *= ca; P.circ(ctx, 960, 300, 110, C.ink, { stroke: C.cream, lw: 6 }); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; P.line(ctx, 960 + Math.cos(a) * 88, 300 + Math.sin(a) * 88, 960 + Math.cos(a) * 100, 300 + Math.sin(a) * 100, C.cream, 4); }
      const ha = hrs / 12 * 6.283 - Math.PI / 2; P.line(ctx, 960, 300, 960 + Math.cos(ha) * 80, 300 + Math.sin(ha) * 80, C.gold, 8); P.circ(ctx, 960, 300, 10, C.gold);
      G.text(ctx, Math.round(hrs) + ' HOURS', 960, 470, { size: 54, fam: 'Bungee', color: hrs >= 47.5 ? C.coral : C.cream, align: 'center', boil: 0 }); ctx.restore(); }
    P.note(ctx, 'arrives a day later', 1500, 380, t, ev.c0_arrive, { t1: ev.c0_answer + 0.5 });
    P.note(ctx, 'reply: another day', 760, 640, t, ev.c0_back - 0.6, { color: C.gold });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — Voyager 1, 1977; radio = fridge bulb; each computer < one phone photo
  P.shot(ev.c0_s3, (ctx, t) => {
    P.sky(ctx, t, 'rose', { stars: 80, seed: 8 }); P.hills(ctx, t, { y: 980, layers: 2, tint: '#7A3B6E' });
    const vs = lerp(1.05, 1.1, P.eio((t - ev.c0_s3) / 9)); P.voyager(ctx, 1020, 470, vs, t, { rot: -0.06, a: P.fin(t, ev.c0_s3, 0.5) });
    P.tag(ctx, 'VOYAGER 1', 1020, 120, t, ev.c0_v1, 1e9, { size: 50, fill: C.cream, color: C.ink, dot: C.gold });
    P.tag(ctx, 'LAUNCHED 1977', 1020, 200, t, ev.c0_1977, 1e9, { size: 36, fill: C.ink, color: C.gold });
    // fridge (left)
    const fk = P.pop(t, ev.c0_radio, 0.4); if (fk > 0) P.at(ctx, 250, 900, fk, 0, () => { P.silR(ctx, -100, -360, 200, 360, 14, {}); const op = P.oc((t - ev.c0_fridge) / 0.4);
      if (op > 0) { P.rect(ctx, -86, -346, 172, 332, 8, '#FFF1C8', { a: op }); P.glow(ctx, 0, -300, 160, '#FFF1C8', op); P.circ(ctx, 0, -320, 16, '#FFFFFF', { a: op }); P.silR(ctx, 86, -360, 70, 360, 8, { rimA: 0.3 }); }
      G.text(ctx, 'radio ≈ fridge bulb', 0, 70, { size: 38, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 }); });
    // memory vs one phone photo (right)
    const pk = P.pop(t, ev.c0_comp, 0.4); if (pk > 0) P.at(ctx, 1690, 840, pk, 0, () => { P.silR(ctx, -70, -250, 140, 250, 20, {}); P.rect(ctx, -56, -230, 112, 200, 10, '#2C2350');
      const ph = P.fin(t, ev.c0_photo, 0.4); P.rect(ctx, -56, -230, 112, 200, 10, '#8EC5FF', { a: ph }); P.poly(ctx, [[-56, -30], [-10, -110], [20, -70], [40, -95], [56, -30]], '#3C6E3A', { a: ph }); P.circ(ctx, 30, -190, 14, C.gold, { a: ph });
      G.text(ctx, 'each computer:', 0, 54, { size: 32, fam: 'Inter', weight: 700, color: C.cream, align: 'center', boil: 0 }); G.text(ctx, '< 1 PHONE PHOTO', 0, 100, { size: 40, fam: 'Inter', weight: 800, color: C.gold, align: 'center', boil: 0, alpha: ph }); });
    P.source(ctx, 'NASA/JPL; Popular Science', t, ev.c0_fridge);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — still talking: a DSN dish at night catches the whisper
  P.shot(ev.c0_s4, (ctx, t) => {
    P.sky(ctx, t, 'night', { stars: 220, seed: 11 }); P.hills(ctx, t, { y: 960, layers: 3, tint: '#3E2A66' });
    const rise = P.oc((t - ev.c0_dish + 0.4) / 0.9);
    P.dsn(ctx, 1180, 980 + (1 - rise) * 500, 1.15, t, { tilt: -0.55, listen: P.fin(t, ev.c0_whisper - 0.3, 0.5) });
    P.signal(ctx, 120, 80, 980, 560, t, { k: P.oc((t - ev.c0_s4) / 2.2), a: 0.8 });
    Ch.echo(ctx, { x: 500, y: 1000, s: 0.8, t, gesture: 'listen', mouth: P.talk(t), look: -0.6, dir: -1 });
    P.big(ctx, 'still talking.', 560, 230, t, ev.c0_still, { size: 92 });
    // whisper waveform
    const wa = P.fin(t, ev.c0_whisper, 0.4); if (wa > 0) { ctx.save(); ctx.globalAlpha *= wa; ctx.strokeStyle = C.sig; ctx.lineWidth = 4; ctx.beginPath(); for (let x = 200; x <= 1720; x += 6) { const u = (x - 200) / 1520; const yy = 1040 + Math.sin(x * 0.05 - t * 9) * 12 * Math.sin(u * Math.PI) * (0.5 + 0.5 * Math.sin(x * 0.011 + t)); x === 200 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke(); ctx.restore(); }
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — the promise: three cards
  P.shot(ev.c0_s5, (ctx, t) => {
    P.sky(ctx, t, 'dusk', { stars: 40, seed: 14 }); P.hills(ctx, t, { y: 1010, layers: 2 });
    P.big(ctx, 'by the end, you’ll know…', 960, 170, t, ev.c0_s5 + 0.2, { size: 64, color: C.cream });
    const cards = [[ev.c0_q1, 'how the whisper\ncrosses a light-day', (x, y) => P.signal(ctx, x - 90, y, x + 90, y, t, { k: 1 })], [ev.c0_q2, 'what keeps a\n49-year-old alive', (x, y) => { P.circ(ctx, x, y, 44, C.coral); P.line(ctx, x - 60, y, x - 30, y, C.cream, 6); P.trace(ctx, [[x - 30, y], [x - 15, y - 30], [x, y + 30], [x + 15, y], [x + 60, y]], 1, C.cream, 6); }], [ev.c0_q3, 'what it carries that\nmay outlast us all', (x, y) => { P.circ(ctx, x, y, 56, C.gold); P.circ(ctx, x, y, 16, '#B8862E'); for (let r = 24; r < 56; r += 8) P.stroke(ctx, P.pEll(x, y, r, r), '#D9A640', 2); }]];
    cards.forEach(([t0, txt, icon], i) => { const k = P.pop(t, t0 - 0.1, 0.45); if (k <= 0) return; const x = 400 + i * 560, y = 560;
      P.at(ctx, x, y + Math.sin(t * 1.5 + i) * 6, k, (i - 1) * 0.02, () => { P.rect(ctx, -230, -200, 460, 400, 28, C.ink, { shadow: 0.35, sy: 10, stroke: P.rgba(C.rim, 0.6), lw: 3 }); icon(0, -90);
        txt.split('\n').forEach((ln, j) => G.text(ctx, ln, 0, 50 + j * 54, { size: 42, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 })); P.circ(ctx, -190, -160, 22, C.coral); G.text(ctx, String(i + 1), -190, -148, { size: 30, fam: 'Bungee', color: C.ink, align: 'center', boil: 0 }); }); });
    Ch.echo(ctx, { x: 1780, y: 1020, s: 0.62, t, dir: -1, gesture: 'point', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'push', dir: 'up', dur: 0.5 } });

  // S6 — the question, then the stamped title over a drifting Voyager
  P.shot(ev.c0_s6, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 300, seed: 21, glow: [960, 1200, 900, C.rose, 0.5] });
    const tt = ev.title0; const q = 1 - P.fin(t, tt, 0.4);
    P.voyager(ctx, 960 + Math.sin(t * 0.3) * 30, 520, lerp(0.7, 1.25, P.eio((t - ev.c0_s6) / 5)), t, { rot: -0.1 + t * 0.01, a: 0.35 + 0.65 * q, beam: 0.6 });
    P.write(ctx, 'so… how do we still hear Voyager 1?', 960, 930, t, ev.c0_q - 0.5, { size: 64, color: C.cream, hl: ['still', 'hear'], hlColor: C.gold, t1: tt });
    Ch.echo(ctx, { x: 260, y: 1060, s: 0.7, t, gesture: 'think', mouth: P.talk(t), look: 1, a: q });
    // title
    const words = ev.titleWords; const lines = [[0, 1, 2, 3, 4], [5, 6]];
    lines.forEach((ln, li) => { const sz = li === 0 ? 120 : 190; const ws = ln.map((i) => P.measure(ctx, words[i].w, sz, li === 0 ? 'Inter' : 'Bungee', 800)); const sp = 40; const tot = ws.reduce((a, b) => a + b, 0) + sp * (ln.length - 1); let x = 960 - tot / 2;
      ln.forEach((i, j) => { const w = words[i]; const k = clamp((t - w.t) / 0.14); if (k > 0) { const s = lerp(1.7, 1, ease.outCubic(k)); P.at(ctx, x + ws[j] / 2, li === 0 ? 400 : 640, s, 0, () => G.text(ctx, w.w, 0, 0, { size: sz, fam: li === 0 ? 'Inter' : 'Bungee', weight: li === 0 ? 800 : 400, color: li === 0 ? C.cream : C.gold, align: 'center', boil: 0, alpha: clamp(k * 2) })); P.burst(ctx, x + ws[j] / 2, li === 0 ? 360 : 580, t, w.t, { r: 120, seed: i, colors: [C.gold, C.coral, C.cream] }); } x += ws[j] + sp; }); });
    const bk = P.pop(t, ev.titleBrand, 0.45); if (bk > 0) { P.brandPlanet(ctx, 760, 820, 34 * bk, t); G.text(ctx, 'WHYVERSE', 1000, 842, { size: 60, fam: 'Bungee', color: C.cream, align: 'center', alpha: clamp(bk), boil: 0 }); }
    const ek = P.oc((t - ev.titleEcho) / 0.5); if (ek > 0) Ch.echo(ctx, { x: 1700, y: 1080 + (1 - ek) * 300, s: 0.7, t, dir: -1, gesture: 'wave', eyes: 'happy', hop: clamp((t - ev.titleEcho) / 0.5) });
  }, { in: { type: 'fade', dur: 0.5 } });
})();
