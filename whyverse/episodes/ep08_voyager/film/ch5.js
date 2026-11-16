// Chapter 5 — Repairs from a light-day away. Nov 2023 gibberish for months · one failed chip ≈ 3 % of one computer's memory · no spare:
// April 2024 the code is split and moved; two days later — it worked · a clogging thruster fuel tube 0.25 mm → 0.035 mm → switch sets ·
// 2025: thrusters "considered dead" for 21 years fire again · every fix a gamble with a 2-day wait; "expect the unexpected" · why bother?
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  // a 1970s terminal screen, shared by S1 and S3
  const screen = (ctx, x, y, w, h, fn) => { P.silR(ctx, x - 30, y - 30, w + 60, h + 60, 30, {}); P.rect(ctx, x, y, w, h, 18, '#0B1E1A'); ctx.save(); P.pRR(x, y, w, h, 18)(ctx); ctx.clip(); fn(); ctx.restore(); P.glow(ctx, x + w / 2, y + h / 2, w * 0.6, C.sig, 0.15); };
  P.cardShot('c5', 5, 'Repairs from a light-day away', 'teal', (ctx, t) => {
    // an hourglass that flips: two days per test
    const fl = t > ev.c5_two ? P.eio((t - ev.c5_two) / 0.5) : 0; P.at(ctx, 1660, 940, 1, fl * Math.PI, () => { P.silP(ctx, [[-70, -110], [70, -110], [10, 0], [70, 110], [-70, 110], [-10, 0]], {}); P.poly(ctx, [[-40, 80], [40, 80], [0, 30]], C.gold, { a: 0.9 }); });
    P.hills(ctx, t, { y: 1060, layers: 1, tint: '#1B4E62' });
  });

  // S1 — November 2023: nonsense on the screen, for months
  P.shot(ev.c5_s1, (ctx, t) => {
    P.sky(ctx, t, 'teal', { stars: 40, seed: 111 });
    screen(ctx, 360, 200, 1200, 640, () => {
      const g = t > ev.c5_non; const rows = 11; const scroll = (t * 3) | 0;
      for (let r = 0; r < rows; r++) { let s = ''; for (let i = 0; i < 34; i++) { const h = U.hash(r + scroll, i); s += g ? '#%&@$*?!01ÆØ¥§¤'[Math.floor(h * 16)] : (h > 0.5 ? '1' : '0'); }
        G.text(ctx, s, 400, 260 + r * 54, { size: 40, fam: 'Bungee', color: g ? (U.hash(r, scroll) > 0.8 ? C.coral : C.sig) : C.sig, boil: 0, alpha: 0.85 }); } });
    P.tag(ctx, 'NOV 2023', 960, 120, t, ev.c5_nov, 1e9, { size: 44, fill: C.cream, color: C.ink, dot: C.coral });
    P.stamp(ctx, 'GIBBERISH', 960, 520, t, ev.c5_gib, { size: 110, color: C.coral, rot: -0.05 });
    const mk = P.fin(t, ev.c5_months, 0.4); if (mk > 0) { ['DEC', 'JAN', 'FEB', 'MAR'].forEach((m, i) => P.tag(ctx, m, 520 + i * 290, 960, t, ev.c5_months + i * 0.15, 1e9, { size: 36, fill: C.ink, color: C.cream })); }
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — memory as a grid of chips; one chip fails ≈ 3 %
  P.shot(ev.c5_s2, (ctx, t) => {
    P.sky(ctx, t, 'night', { stars: 80, seed: 113 });
    const cols = 12, rows = 6, cw = 92, ch = 70, x0 = 960 - cols * cw / 2, y0 = 240; const bad = [7, 2];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const k = P.pop(t, ev.c5_s2 + 0.2 + (r * cols + c) * 0.008, 0.3); if (k <= 0) continue; const isBad = c === bad[0] && r === bad[1] && t > ev.c5_chip;
      P.at(ctx, x0 + c * cw + cw / 2, y0 + r * ch + ch / 2, k, 0, () => { P.rect(ctx, -38, -26, 76, 52, 6, isBad ? C.coral : '#2E3E5A', { stroke: isBad ? C.cream : '#5D7799', lw: 2 }); for (let p = -3; p <= 3; p++) { P.line(ctx, p * 10, -26, p * 10, -34, '#8899BB', 3); P.line(ctx, p * 10, 26, p * 10, 34, '#8899BB', 3); } }); }
    if (t > ev.c5_chip) { P.circle(ctx, x0 + bad[0] * cw + cw / 2, y0 + bad[1] * ch + ch / 2, 70, 56, P.oc((t - ev.c5_chip) / 0.4), { color: C.gold, lw: 5 }); P.burst(ctx, x0 + bad[0] * cw + cw / 2, y0 + bad[1] * ch + ch / 2, t, ev.c5_chip, { r: 120 }); }
    P.inkCount(ctx, { x: 960, y: 860, to: 3, t, t0: ev.c5_3pc - 0.4, t1: ev.c5_3pc, size: 140, prefix: '≈ ', suffix: ' %', sub: 'OF ONE COMPUTER’S MEMORY — ONE CHIP', subSize: 36 });
    P.source(ctx, 'NASA/JPL 2024', t, ev.c5_3pc);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — no spare: April 2024 the code is cut into pieces and moved; send, wait two days… IT WORKED
  P.shot(ev.c5_s3, (ctx, t) => {
    P.sky(ctx, t, 'teal', { stars: 60, seed: 115 });
    P.stamp(ctx, 'NO SPARE', 420, 150, t, ev.c5_spare, { size: 64, color: C.coral, t1: ev.c5_split });
    P.tag(ctx, 'APRIL 2024', 1500, 150, t, ev.c5_apr, 1e9, { size: 42, fill: C.cream, color: C.ink });
    // a code block that splits into 4 pieces and flies into 4 free slots
    const slots = [[420, 640], [780, 760], [1140, 640], [1500, 760]];
    slots.forEach(([x, y]) => P.rect(ctx, x - 120, y - 50, 240, 100, 14, '#1C2E44', { stroke: '#4F6B8F', lw: 3 }));
    const sp = P.oc((t - ev.c5_split) / 0.35), mv = P.eio((t - ev.c5_moved) / 0.9);
    for (let i = 0; i < 4; i++) { const sx = 960 + (i - 1.5) * 130 * (1 + sp * 0.4), sy = 380; const [tx, ty] = slots[i]; const x = lerp(sx, tx, mv), y = lerp(sy, ty, mv) - Math.sin(mv * Math.PI) * 120;
      P.rect(ctx, x - 60, y - 40, 120, 80, 10, C.sig, { shadow: 0.25 }); for (let l = 0; l < 3; l++) P.line(ctx, x - 40, y - 20 + l * 20, x - 40 + 60 + U.hash(i, l) * 20, y - 20 + l * 20, '#0B1E1A', 6); }
    if (sp > 0 && sp < 1) for (let i = 1; i < 4; i++) P.line(ctx, 960 + (i - 2) * 130, 330, 960 + (i - 2) * 130, 430, C.cream, 4, 1 - sp);
    // the wait: a small 2-day clock, then the stamp
    const wk = P.fin(t, ev.c5_2days - 0.2, 0.3) * P.fout(t, ev.c5_worked + 0.3, 0.3); if (wk > 0) { ctx.save(); ctx.globalAlpha *= wk; const hrs = 48 * clamp((t - ev.c5_2days) / Math.max(0.5, ev.c5_worked - ev.c5_2days)); G.text(ctx, 'WAIT ' + Math.round(hrs) + ' h', 960, 980, { size: 60, fam: 'Bungee', color: C.cream, align: 'center', boil: 0 }); ctx.restore(); }
    P.stamp(ctx, 'IT WORKED', 960, 940, t, ev.c5_worked, { size: 110, color: C.sig, fg: C.ink, rot: -0.03 });
    if (t > ev.c5_worked) Ch.echo(ctx, { x: 1720, y: 1060, s: 0.6, t, dir: -1, gesture: 'cheer', eyes: 'happy', mouth: P.talk(t), hop: clamp((t - ev.c5_worked) / 0.6) });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — a fuel tube narrowing: 0.25 mm → 0.035 mm (cross-sections), then switch to the other thrusters
  P.shot(ev.c5_s4, (ctx, t) => {
    P.sky(ctx, t, 'night', { stars: 100, seed: 117 });
    // a long tube with flow
    const nar = P.eio((t - ev.c5_035 + 0.3) / 0.8); const th = lerp(80, 12, nar);
    P.rect(ctx, 160, 300 - 60, 1600, 120, 60, C.ink, { stroke: P.rgba(C.rim, 0.7), lw: 4 }); P.rect(ctx, 180, 300 - th / 2, 1560, th, th / 2, '#8FD3F5', { a: 0.9 });
    for (let i = 0; i < 18; i++) { const x = 180 + ((t * 300 * (1 - nar * 0.9) + i * 90) % 1560); P.circ(ctx, x, 300, Math.max(3, th * 0.18), '#FFFFFF', { a: 0.6 }); }
    P.note(ctx, 'a thruster fuel tube', 960, 190, t, ev.c5_clog, { color: C.cream, size: 42 });
    // cross-sections
    const q = P.pop(t, ev.c5_quarter, 0.4); if (q > 0) P.at(ctx, 600, 700, q, 0, () => { P.circ(ctx, 0, 0, 170, C.ink, { stroke: C.cream, lw: 5 }); P.circ(ctx, 0, 0, 125, '#8FD3F5'); G.text(ctx, '0.25 mm', 0, 250, { size: 52, fam: 'Bungee', color: C.cream, align: 'center', boil: 0 }); G.text(ctx, 'BEFORE', 0, -210, { size: 34, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 }); });
    const n = P.pop(t, ev.c5_035, 0.4); if (n > 0) P.at(ctx, 1320, 700, n, 0, () => { P.circ(ctx, 0, 0, 170, C.ink, { stroke: C.coral, lw: 5 }); P.circ(ctx, 0, 0, 125 * 0.035 / 0.25, '#8FD3F5'); P.circle(ctx, 0, 0, 40, 40, 1, { color: C.coral, lw: 4 }); G.text(ctx, '0.035 mm', 0, 250, { size: 52, fam: 'Bungee', color: C.coral, align: 'center', boil: 0 }); G.text(ctx, 'CLOGGING', 0, -210, { size: 34, fam: 'Inter', weight: 800, color: C.coral, align: 'center', boil: 0 }); });
    // switch
    const sk = P.pop(t, ev.c5_switch - 0.1, 0.3); if (sk > 0) P.at(ctx, 960, 700, sk, 0, () => { P.rect(ctx, -70, -110, 140, 220, 24, C.ink, { stroke: C.cream, lw: 4 }); const flip = P.oc((t - ev.c5_switch) / 0.25); P.rect(ctx, -40, lerp(-80, 10, flip), 80, 70, 14, flip > 0.5 ? C.sig : C.coral); G.text(ctx, 'SWITCH', 0, 160, { size: 32, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 }); });
    P.source(ctx, 'NASA/JPL, 10 Sep 2024', t, ev.c5_035);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — 2025: thrusters "dead" for 21 years fire again
  P.shot(ev.c5_s5, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 220, seed: 119 });
    const fire = t > ev.c5_fired ? 1 : 0; const rollA = fire ? 0.25 * P.oc((t - ev.c5_fired) / 1.2) : 0;
    P.voyager(ctx, 1040, 560, 1.0, t, { rot: -0.06 + rollA });
    // thruster puffs
    if (fire) for (let i = 0; i < 2; i++) { const a = (t - ev.c5_fired - i * 0.25); if (a < 0 || a > 0.9) continue; const k = a / 0.9; ctx.save(); ctx.globalAlpha *= 1 - k; P.circ(ctx, 880 - k * 220, 640 + i * 40, 30 + k * 90, '#EAF2FF'); ctx.restore(); }
    // "considered dead" — a grey cobweb tag that snaps away
    const dk = P.pop(t, ev.c5_dead - 0.1, 0.35) * P.fout(t, ev.c5_fired + 0.2, 0.25); if (dk > 0) P.at(ctx, 840, 720, dk, -0.04, () => { P.rect(ctx, -170, -40, 340, 80, 12, '#5A5A6E'); G.text(ctx, '“DEAD” SINCE 2004', 0, 14, { size: 34, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 }); });
    P.tag(ctx, '2025', 300, 160, t, ev.c5_2025, 1e9, { size: 48, fill: C.cream, color: C.ink });
    P.inkCount(ctx, { x: 360, y: 450, to: 21, t, t0: ev.c5_21 - 0.5, t1: ev.c5_21, size: 160, sub: 'YEARS SILENT', subSize: 42 });
    P.stamp(ctx, 'AND THEY FIRED', 1300, 940, t, ev.c5_fired, { size: 84, color: C.gold, fg: C.ink });
    P.source(ctx, 'NASA/JPL, 14 May 2025', t, ev.c5_fired);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S6 — every fix is a gamble sent into the dark; two days; "expect the unexpected"
  P.shot(ev.c5_s6, (ctx, t) => {
    P.sky(ctx, t, 'night', { stars: 220, seed: 121 }); P.hills(ctx, t, { y: 1000, layers: 2, tint: '#2A2050' });
    P.dsn(ctx, 300, 1000, 0.8, t, { tilt: 0.55 });
    const g = clamp((t - ev.c5_dark) / 1.4); if (g > 0) P.signal(ctx, 430, 640, 1880, 120, t, { k: g, color: C.coral, a: 1 - clamp((g - 0.85) / 0.15) });
    P.tag(ctx, 'SENT INTO THE DARK', 1300, 220, t, ev.c5_gamble, 1e9, { size: 40, fill: C.ink, color: C.cream });
    const qk = P.pop(t, ev.c5_quote - 0.2, 0.45); if (qk > 0) P.at(ctx, 1150, 600, qk, -0.015, () => { P.rect(ctx, -500, -150, 1000, 300, 28, C.cream, { shadow: 0.35, sy: 10 }); P.rect(ctx, -500, -150, 18, 300, 9, C.coral);
      G.text(ctx, '“We have to expect', -440, -40, { size: 62, fam: 'Inter', weight: 800, color: C.ink, boil: 0 }); G.text(ctx, 'the unexpected.”', -440, 40, { size: 62, fam: 'Inter', weight: 800, color: C.coral, boil: 0 });
      G.text(ctx, '— Kareem Badaruddin, Voyager mission manager (NASA/JPL)', -440, 112, { size: 26, fam: 'Inter', weight: 700, color: '#6B6480', boil: 0 }); });
    const wk = P.fin(t, ev.c5_wait, 0.3); if (wk > 0) G.text(ctx, '48 h to know', 640, 420, { size: 54, fam: 'Bungee', color: C.gold, align: 'center', boil: 0, alpha: wk });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S7 — why bother? because of what it has already shown us (Echo looks up, the sky brightens)
  P.shot(ev.c5_s7, (ctx, t) => {
    const k = P.eio((t - ev.c5_shown) / 1.4); P.sky(ctx, t, 'deep', { stars: 300, seed: 123, glow: [960, 300, 900 * (0.3 + k), C.violet, 0.6] });
    P.hills(ctx, t, { y: 1000, layers: 3, tint: '#2A2050' });
    P.write(ctx, 'why go to all this trouble?', 960, 260, t, ev.c5_why, { size: 72, color: C.cream, hl: ['why'], hlColor: C.gold });
    Ch.echo(ctx, { x: 960, y: 1000, s: 0.8, t, gesture: k > 0.3 ? 'pointUp' : 'think', mouth: P.talk(t), look: 0, eyes: k > 0.3 ? 'wide' : 'open' });
    for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283 + t * 0.1; P.circ(ctx, 960 + Math.cos(a) * 320 * k, 520 + Math.sin(a) * 160 * k, 5, C.gold, { a: k }); }
  }, { in: { type: 'fade', dur: 0.4 } });
})();
