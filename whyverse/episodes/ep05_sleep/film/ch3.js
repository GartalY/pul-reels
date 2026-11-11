// Chapter 3 — What a night really looks like: the hypnogram (cycles of ~90 min) · sinking into deep sleep · REM · paralysis · deep first, dreams last.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  // a typical night (hours since falling asleep, level: 0 awake · 1 REM · 2 light · 3 deep) — schematic
  const NIGHT = [[0, 0], [0.25, 2], [0.6, 3], [1.2, 3], [1.4, 2], [1.55, 1], [1.7, 1], [1.8, 2], [2.2, 3], [2.8, 3], [3.0, 2], [3.15, 1], [3.45, 1], [3.55, 2], [3.9, 2.8], [4.2, 2.8], [4.4, 2], [4.6, 1], [5.15, 1], [5.25, 2], [5.7, 2.2], [6.0, 2], [6.2, 1], [6.95, 1], [7.05, 2], [7.3, 2], [7.45, 1], [7.95, 1], [8.05, 0]];
  const CYC = [0, 1.75, 3.5, 5.2, 7.0, 8.05];
  const LV = ['awake', 'REM (dreams)', 'light sleep', 'deep sleep'];
  // o: {x0, x1, yTop, yBot, k (reveal 0..1), hMin, hMax (drawn hour range), bars (0..1 REM/deep bars), labels}
  const hyp = (ctx, t, o) => {
    const { x0 = 330, x1 = 1780, yTop = 290, yBot = 700, k = 1, hMin = 0, hMax = 8.05, bars = 1, a = 1, labels = 1 } = o; if (a <= 0.01) return;
    const X = (h) => x0 + (x1 - x0) * h / 8.05, Y = (lv) => yTop + (yBot - yTop) * lv / 3; const fg = P.fg();
    ctx.save(); ctx.globalAlpha *= a;
    if (labels) { for (let i = 0; i < 4; i++) { P.line(ctx, x0, Y(i), x1, Y(i), P.fg2(), 2, 0.35); G.text(ctx, LV[i], x0 - 24, Y(i) + 14, { size: 40, fam: FT.hand, color: i === 1 ? C.coral : i === 3 ? (P.dark ? '#9DB4FF' : C.night2) : fg, align: 'right', boil: 0 }); }
      ['11 pm', '1 am', '3 am', '5 am', '7 am'].forEach((s, i) => { const h = i * 2; P.line(ctx, X(h), yBot + 30, X(h), yBot + 46, fg, 4, 0.6); G.text(ctx, s, X(h), yBot + 92, { size: 36, fam: FT.hand, color: P.fg2(), align: 'center', boil: 0 }); }); }
    const hEnd = Math.min(hMax, 8.05 * k);
    ctx.save(); ctx.beginPath(); ctx.rect(X(hMin) - 6, yTop - 60, X(hEnd) - X(hMin) + 12, yBot - yTop + 120); ctx.clip();
    if (bars > 0) for (let i = 0; i < NIGHT.length - 1; i++) { const [h0, l0] = NIGHT[i], [h1, l1] = NIGHT[i + 1]; if (l0 === 1 && l1 === 1) P.wash(ctx, P.pRR(X(h0) - 4, Y(1) - 26, X(h1) - X(h0) + 8, 52, 14), C.coral, { a: bars, seed: i }); if (l0 >= 2.7 && l1 >= 2.7) P.wash(ctx, P.pRR(X(h0) - 4, Y(l0) - 26, X(h1) - X(h0) + 8, 52, 14), P.dark ? '#6F8BF0' : C.night2, { a: bars, seed: i }); }
    P.brush(ctx, (c) => { c.beginPath(); NIGHT.forEach(([h, lv], i) => (i ? c.lineTo(X(h), Y(lv)) : c.moveTo(X(h), Y(lv)))); }, fg, 8, 1);
    ctx.restore();
    if (k < 1 && k > 0) { let lv = 0; for (let i = 0; i < NIGHT.length - 1; i++) if (hEnd >= NIGHT[i][0] && hEnd <= NIGHT[i + 1][0]) lv = lerp(NIGHT[i][1], NIGHT[i + 1][1], (hEnd - NIGHT[i][0]) / (NIGHT[i + 1][0] - NIGHT[i][0])); P.glow(ctx, X(hEnd), Y(lv), 60, C.gold, 1); P.dot(ctx, X(hEnd), Y(lv), 14, C.gold); }
    ctx.restore(); return { X, Y };
  };
  const heart = (ctx, x, y, r, col = C.coral) => P.wash(ctx, (c) => { c.beginPath(); c.moveTo(x, y + r * 0.9); c.bezierCurveTo(x - r * 1.5, y - r * 0.1, x - r * 0.8, y - r * 1.1, x, y - r * 0.35); c.bezierCurveTo(x + r * 0.8, y - r * 1.1, x + r * 1.5, y - r * 0.1, x, y + r * 0.9); c.closePath(); }, col, { bb: [x, y, r], seed: 3 });
  P.heart = heart;
  const lock = (ctx, x, y, s, k) => P.at(ctx, x, y, s * k, 0, () => { P.brush(ctx, (c) => { c.beginPath(); c.arc(0, -16, 17, Math.PI, 0); }, C.navy, 9, 1); P.rect(ctx, -26, -16, 52, 44, 9, C.gold, { seed: 5 }); P.dot(ctx, 0, 4, 6, C.navy); });

  P.cardShot('c3', 3, 'What a night really looks like', (ctx, t) => {
    P.wave(ctx, 150, 950, 1620, t, { kind: 'deep', color: C.sky, a: 0.45, lw: 7 }); P.wave(ctx, 150, 950, 1620, t, { kind: 'rem', color: C.coral, a: 0.3 });
  });

  // S1 — the night draws itself: cycles of roughly 90 minutes, four to six of them; read from the brain's electrical waves
  P.shot(ev.c3_s1, (ctx, t, s) => {
    P.night(ctx, t, { seed: 16, stars: 0.5 });
    const k = t < ev.c3_90 ? 0.215 * P.eio((t - ev.c3_cycles + 0.3) / (ev.c3_90 - ev.c3_cycles + 0.3)) : lerp(0.215, 1, P.eio((t - ev.c3_90 - 0.3) / (ev.c3_46 + 0.9 - ev.c3_90)));
    const ax = hyp(ctx, t, { k, yTop: 250, yBot: 640 });
    for (let i = 0; i < 5; i++) { const kb = i === 0 ? P.pop(t, ev.c3_90 - 0.2, 0.3) : P.pop(t, ev.c3_brks[i], 0.3); if (kb <= 0) continue; const xa = ax.X(CYC[i]) + 8, xb = ax.X(CYC[i + 1]) - 8;
      P.brush(ctx, (c) => { c.beginPath(); c.moveTo(xa, 770); c.lineTo(xa, 790); c.lineTo(lerp(xa, xb, kb), 790); if (kb >= 1) c.lineTo(xb, 770); }, C.gold, 7, 1); G.text(ctx, String(i + 1), (xa + xb) / 2, 846, { size: 48, fam: FT.title, weight: 700, color: C.gold, align: 'center', alpha: clamp(kb), boil: 0 }); }
    P.tag(ctx, 'one cycle ≈ 90 min', ax.X(0.9), 180, t, ev.c3_90, ev.c3_eeg, { size: 50, border: C.gold, fam: FT.title });
    P.tag(ctx, '4 to 6 cycles a night', 1300, 180, t, ev.c3_46, ev.c3_eeg, { size: 50, border: C.coral, fam: FT.title });
    // the EEG strip
    const ke = P.fin(t, ev.c3_eeg - 0.2, 0.4); if (ke > 0) { ctx.save(); ctx.globalAlpha *= ke; P.rect(ctx, 330, 900, 1250, 150, 26, '#141B48', { seed: 3, edge: 0.4 });
      const kind = ((t - ev.c3_eeg) % 3.6) < 1.2 ? 'awake' : ((t - ev.c3_eeg) % 3.6) < 2.4 ? 'deep' : 'rem'; ctx.save(); P.pRR(340, 905, 1230, 140, 20)(ctx); ctx.clip(); P.wave(ctx, 350, 975, 1210, t, { kind, color: kind === 'deep' ? '#8FA8FF' : kind === 'rem' ? C.coral : C.mint, lw: 5 }); ctx.restore();
      G.text(ctx, kind === 'deep' ? 'deep sleep' : kind === 'rem' ? 'REM' : 'awake', 1560, 940, { size: 38, fam: FT.hand, color: C.cream, align: 'right', boil: 0 }); ctx.restore();
      P.tag(ctx, "the brain's electrical waves", 955, 180, t, ev.c3_eeg, 1e9, { size: 50, border: C.mint, fam: FT.title }); }
    Ch.nod(ctx, { x: 1740, y: 1050, s: 0.85, t, eyes: 'open', mouth: Ch.nodMouth(t), look: -0.7, lookY: -0.5, gesture: 'point', dir: -1 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — first you sink down into deep sleep: slow, huge waves; the heart slows; very hard to wake
  P.shot(ev.c3_s2, (ctx, t, s) => {
    P.night(ctx, t, { stars: 0, top: '#5670C8', bot: '#10163F', seed: 18 });
    const bands = ['awake', 'light sleep', 'deep sleep']; bands.forEach((b, i) => { P.line(ctx, 60, 330 + i * 250, 460, 330 + i * 250, C.cream, 3, 0.35); G.text(ctx, b, 80, 315 + i * 250, { size: 44, fam: FT.hand, color: C.cream, alpha: 0.75, boil: 0 }); });
    const d = P.eio((t - ev.c3_sink) / 2.2); const by = lerp(420, 900, d);
    for (let i = 0; i < 9; i++) { const ph = (t * 0.25 + i / 9) % 1; P.dot(ctx, 560 + U.hash(i, 3) * 420, by - 190 - ph * 320, 5 + 5 * U.hash(i, 4), C.cream, 0.25 * Math.sin(ph * Math.PI) * d); }
    P.bed(ctx, 760, by, 1.15, { t, blanket: C.peri, breathe: 1 - 0.5 * d });
    P.zzz(ctx, 620, by - 220, t, { color: C.cream });
    // brain waves panel: fast + small → slow + huge
    const kw = P.eio((t - ev.c3_slow + 0.3) / 0.8);
    P.rect(ctx, 1080, 150, 760, 260, 26, '#141B48', { seed: 3, edge: 0.4 }); ctx.save(); P.pRR(1090, 156, 740, 248, 20)(ctx); ctx.clip(); P.wave(ctx, 1100, 280, 720, t, { kind: 'awake', color: C.mint, a: 1 - kw }); P.wave(ctx, 1100, 280, 720, t, { kind: 'deep', color: '#8FA8FF', a: kw, lw: 7, amp: 1.5 }); ctx.restore();
    P.tag(ctx, 'brain waves: slow and huge', 1460, 470, t, ev.c3_slow, 1e9, { size: 46, border: '#8FA8FF' });
    // the heart slows
    const kh = P.pop(t, ev.c3_heart - 0.3, 0.4); if (kh > 0) { const per = 1.1, ph = ((t - ev.c3_heart) % per + per) % per; const beat = t >= ev.c3_heart ? Math.exp(-ph * 7) : 0; heart(ctx, 1300, 700, 78 * kh * (1 + 0.2 * beat)); P.ring(ctx, 1300, 700, t, ev.c3_heart, { r: 190, color: C.coral }); P.ring(ctx, 1300, 700, t, ev.c3_heart2, { r: 190, color: C.coral }); }
    P.tag(ctx, 'heart rate drops', 1300, 850, t, ev.c3_heart, 1e9, { size: 46, border: C.coral });
    // an alarm clock that does nothing
    const ka = P.pop(t, ev.c3_wake, 0.4); if (ka > 0) { const sh = Math.sin(t * 70) * 8 * clamp(1.6 - (t - ev.c3_wake)); P.at(ctx, 1640 + sh, 700, ka, sh * 0.01, () => { P.clock(ctx, 0, 0, 80, 3, 0, { rim: C.gold }); for (const sx of [-1, 1]) { P.ell(ctx, sx * 62, -84, 30, 22, C.gold, { seed: 5, rot: sx * 0.6 }); P.line(ctx, sx * 40, 80, sx * 62, 108, C.gold, 10, 1); } }); }
    P.tag(ctx, 'very hard to wake', 1640, 850, t, ev.c3_wake + 0.2, 1e9, { size: 46, border: C.gold });
  }, { in: { type: 'wipe', dir: 'down', dur: 0.5 } });

  // S3 — then you rise back up into REM: darting eyes, a busy brain, vivid dreams
  P.shot(ev.c3_s3, (ctx, t, s) => {
    P.night(ctx, t, { stars: 0.6, top: '#10163F', bot: '#4A5CB8', seed: 20 });
    const d = P.eio((t - ev.c3_rise + 0.2) / 1.6); const by = lerp(1250, 1020, d);
    const rem = t > ev.c3_rem;
    P.bed(ctx, 880, by, 1.25, { t, blanket: C.peri, eyes: rem ? 'rem' : 'closed' });
    P.stamp(ctx, 'REM SLEEP', 960, 130, t, ev.c3_rem, { size: 100, color: C.coral, rot: -0.02 });
    P.label(ctx, 'rapid eye movement', 960, 240, { align: 'center', size: 40, color: C.cream, alpha: P.fin(t, ev.c3_rem + 0.3, 0.3) });
    // closed eyes, darting
    const ke = P.pop(t, ev.c3_eyes, 0.4); if (ke > 0) P.at(ctx, 360, 470, ke, -0.02, () => { P.rect(ctx, -270, -130, 540, 260, 40, C.skin, { seed: 4 });
      for (const sx of [-1, 1]) { const dx = Math.sin(t * 13) * 26 + Math.sin(t * 31 + sx) * 10; P.ell(ctx, sx * 125 + dx, 0, 52, 40, P.dk(C.skin, 0.12), { edge: 0.2 }); P.brush(ctx, (c) => { c.beginPath(); c.moveTo(sx * 125 - 86, 0); c.quadraticCurveTo(sx * 125, 52, sx * 125 + 86, 0); }, C.ink, 7, 1); for (let j = -2; j <= 2; j++) P.line(ctx, sx * 125 + j * 30, 30 - Math.abs(j) * 8, sx * 125 + j * 36, 50 - Math.abs(j) * 8, C.ink, 4, 0.8); } });
    P.tag(ctx, 'eyes dart around', 360, 660, t, ev.c3_eyes + 0.2, 1e9, { size: 44, border: C.skin2 });
    // the busy brain
    const kb = P.pop(t, ev.c3_busy - 0.5, 0.4); if (kb > 0) { P.brain(ctx, 1560, 450, 210 * kb, {}); if (t > ev.c3_busy) for (let i = 0; i < 14; i++) { const on = U.hash(i, Math.floor(t * 9)) > 0.5; if (!on) continue; const an = U.hash(i, 1) * 6.283, rr = Math.sqrt(U.hash(i, 2)) * 150; P.glow(ctx, 1560 + Math.cos(an) * rr, 430 + Math.sin(an) * rr * 0.7, 50, C.gold, 1); P.dot(ctx, 1560 + Math.cos(an) * rr, 430 + Math.sin(an) * rr * 0.7, 8, C.gold); } }
    P.tag(ctx, 'almost as busy as awake', 1560, 720, t, ev.c3_busy, 1e9, { size: 44, border: C.gold });
    // vivid dreams
    const kd = P.pop(t, ev.c3_dreams, 0.5, 1.3); if (kd > 0) { P.cloud(ctx, 960, 480, 230 * kd, 1); const cols = [C.coral, C.gold, C.mint, C.sky, C.lilac];
      cols.forEach((c, i) => P.brush(ctx, (cc) => { cc.beginPath(); cc.arc(960, 560, (150 - i * 18) * kd, Math.PI * 1.08, Math.PI * 1.92); }, c, 16 * kd, 1));
      Ch.nod(ctx, { x: 960 + Math.sin(t * 1.5) * 60, y: 560 + Math.cos(t * 2) * 14, s: 0.42 * kd, t, gesture: 'cheer', eyes: 'happy', shadow: false, rot: Math.sin(t * 1.5) * 0.2 }); }
  }, { in: { type: 'wipe', dir: 'up', dur: 0.5 } });

  // S4 — arms and legs are temporarily paralysed, so you don't act the dreams out
  P.shot(ev.c3_s4, (ctx, t, s) => {
    P.night(ctx, t, { stars: 0.5, seed: 22 });
    ctx.save(); P.push(ctx, s.u, 700, 800, 0.03);
    P.bed(ctx, 700, 1040, 1.75, { t, blanket: C.peri, eyes: 'rem', breathe: 0.5 });
    [[560, 800], [760, 780], [980, 820], [1120, 850]].forEach(([x, y], i) => { const k = P.pop(t, ev.c3_locks[i], 0.3); if (k > 0) { lock(ctx, x, y, 1.5, k); P.ring(ctx, x, y, t, ev.c3_locks[i], { r: 90, color: C.gold }); } });
    ctx.restore();
    P.stamp(ctx, 'MUSCLES: OFF', 560, 300, t, ev.c3_par, { size: 90, color: C.coral, rot: -0.04 });
    // the dream: running flat out
    P.cloud(ctx, 1420, 380, 300, P.fin(t, ev.c3_s4 + 0.2, 0.4));
    const run = t * 9; const kx = 1420 + Math.sin(t * 0.8) * 30;
    if (t > ev.c3_s4 + 0.4) { P.human(ctx, { x: kx, y: 560 - Math.abs(Math.sin(run)) * 14, s: 0.8, t, shirt: C.gold, armL: [-60 + Math.sin(run) * 40, -180 + Math.cos(run) * 30], armR: [60 - Math.sin(run) * 40, -180 - Math.cos(run) * 30], eyes: 'wide', mouth: 'o', lean: 0.18, shadow: false });
      for (let i = 0; i < 4; i++) { const ph = (t * 2 + i / 4) % 1; P.line(ctx, kx - 120 - ph * 90, 330 + i * 60, kx - 190 - ph * 90, 330 + i * 60, C.dim, 5, 0.6 * (1 - ph)); } }
    const ka = P.fin(t, ev.c3_act, 0.4); if (ka > 0) { P.arrow(ctx, 1240, 640, 1060, 800, { color: C.coral, k: ka, lw: 10 }); const kx2 = P.pop(t, ev.c3_act + 0.35, 0.3); P.at(ctx, 1150, 720, kx2, 0, () => { P.ell(ctx, 0, 0, 56, 56, C.cream, { edge: 0.3 }); P.line(ctx, -26, -26, 26, 26, C.red, 12, 1); P.line(ctx, 26, -26, -26, 26, C.red, 12, 1); }); }
    P.tag(ctx, "so you don't act your dreams out", 1380, 930, t, ev.c3_act, 1e9, { size: 46, border: C.coral });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S5 — the whole night: deep sleep first, dream sleep toward morning. Cut it short → mostly dreams lost.
  P.shot(ev.c3_s5, (ctx, t, s) => {
    P.night(ctx, t, { seed: 24, stars: 0.5 });
    const cut = t >= ev.c3_cut; const fall = cut ? clamp((t - ev.c3_cut) / 1.1) : 0; const HC = 5.9;
    const k1 = P.fin(t, ev.c3_first - 0.2, 0.5), k2 = P.fin(t, ev.c3_morning - 0.3, 0.5);
    const X = (h) => 330 + 1450 * h / 8.05;
    if (k1 > 0) P.wash(ctx, P.pRR(X(0) - 10, 250, X(4.3) - X(0), 560, 30), '#6F8BF0', { a: 0.22 * k1, edge: 0.6, seed: 2 });
    if (k2 > 0 && fall < 1) P.wash(ctx, P.pRR(X(4.4), 250, X(8.05) - X(4.4) + 10, 560, 30), C.coral, { a: 0.22 * k2 * (1 - fall), edge: 0.6, seed: 3 });
    hyp(ctx, t, { k: 1, yTop: 330, yBot: 700, hMax: cut ? HC : 8.05 });
    if (cut && fall < 1) { ctx.save(); ctx.translate(X(HC), 500); ctx.rotate(fall * 0.25); ctx.translate(-X(HC), -500 + 520 * fall * fall); hyp(ctx, t, { k: 1, yTop: 330, yBot: 700, hMin: HC, labels: 0, a: 1 - fall }); ctx.restore(); }
    P.tag(ctx, 'deep sleep: mostly early', X(2.1), 190, t, ev.c3_first, 1e9, { size: 48, border: '#6F8BF0', fam: FT.title });
    P.tag(ctx, 'dream sleep: toward morning', X(6.2), 190, t, ev.c3_morning, ev.c3_cut + 0.5, { size: 48, border: C.coral, fam: FT.title });
    if (cut) { P.line(ctx, X(HC), 230, X(HC), 830, C.red, 9, 1, clamp((t - ev.c3_cut) / 0.15)); P.splat(ctx, X(HC), 520, t, ev.c3_cut, { color: C.red, r: 200 });
      P.at(ctx, X(HC), 215, P.pop(t, ev.c3_cut, 0.3), 0, () => { P.clock(ctx, 0, 0, 58, 5, 0, { rim: C.red }); }); P.tag(ctx, 'alarm: 5 am', X(HC) + 210, 215, t, ev.c3_cut + 0.2, 1e9, { size: 44, border: C.red }); }
    P.stamp(ctx, 'MOSTLY DREAMS LOST', 1250, 960, t, ev.c3_lose, { size: 80, color: C.coral, rot: -0.03 });
    Ch.nod(ctx, { x: 180, y: 1050, s: 0.9, t, eyes: cut ? 'worried' : 'open', mouth: Ch.nodMouth(t), look: 0.7, lookY: -0.5 });
  }, { in: { type: 'fade', dur: 0.5 } });
})();
