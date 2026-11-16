// Payoff + end card — "how do we still hear Voyager 1?" · giant ears, rationed watts, people who keep fixing it · in the 2030s the whisper
// stops, Voyager doesn't · NASA's light-day Morse "V-G-R" · ≈ 9,000 km farther while you watched · every word left it yesterday ·
// Whyverse end card: like, subscribe, Instagram @whyverse___, TikTok @Whyverse + a "send this to…" line (SENDS RULE).
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  const MORSE = { V: '...-', G: '--.', R: '.-.' };

  // S1 — Echo on a hill under the stars: the question again
  P.shot(ev.c7_s1, (ctx, t) => {
    P.sky(ctx, t, 'night', { stars: 320, seed: 151 }); P.hills(ctx, t, { y: 960, layers: 3, tint: '#3E2A66' });
    P.voyager(ctx, 1500, 260, 0.2, t, { glint: false, beam: 0.6 });
    P.signal(ctx, 1440, 280, 980, 760, t, { k: P.oc((t - ev.c7_s1) / 2.4), a: 0.8 });
    Ch.echo(ctx, { x: 900, y: 960, s: 0.85, t, gesture: 'listen', mouth: P.talk(t), look: 0.6 });
    P.write(ctx, 'so, how do we still hear Voyager 1?', 960, 170, t, ev.c7_q - 0.2, { size: 66, color: C.cream, hl: ['hear'], hlColor: C.gold });
  }, { in: { type: 'fade', dur: 0.6 } });

  // S2 — three answers: giant ears · rationed watts · people who keep fixing it
  P.shot(ev.c7_s2, (ctx, t) => {
    P.sky(ctx, t, 'dusk', { stars: 40, seed: 153 }); P.hills(ctx, t, { y: 1030, layers: 2 });
    const R = [[ev.c7_ears, 'GIANT EARS', (ctx) => P.dsn(ctx, 0, 120, 0.42, t, { tilt: -0.4, listen: 1 })],
      [ev.c7_ration, 'EVERY WATT RATIONED', (ctx) => { P.rect(ctx, -110, -40, 220, 110, 16, C.ink, { stroke: C.cream, lw: 5 }); P.rect(ctx, 110, -5, 16, 40, 5, C.cream); P.rect(ctx, -96, -26, 90 + 10 * Math.sin(t * 2), 82, 10, C.sig); }],
      [ev.c7_people, 'PEOPLE WHO KEEP FIXING IT', (ctx) => { for (let i = -1; i <= 1; i++) P.person(ctx, i * 80, 120, 0.42, t, { seed: i + 2, pose: i === 0 ? 'point' : 'stand', hair: i + 1 }); }]];
    R.forEach(([t0, lab, icon], i) => { const k = P.pop(t, t0 - 0.15, 0.45); if (k <= 0) return; const x = 380 + i * 580, y = 520;
      P.at(ctx, x, y + Math.sin(t * 1.4 + i) * 6, k, (i - 1) * 0.02, () => { P.rect(ctx, -250, -260, 500, 520, 30, P.rgba('#4A3A70', 0.94), { shadow: 0.35, stroke: P.rgba(C.rim, 0.6), lw: 3 }); ctx.save(); ctx.translate(0, -60); icon(ctx); ctx.restore();
        const words = lab.split(' '); const l1 = words.slice(0, Math.ceil(words.length / 2)).join(' '), l2 = words.slice(Math.ceil(words.length / 2)).join(' ');
        G.text(ctx, l1, 0, 150, { size: 40, fam: 'Inter', weight: 800, color: C.gold, align: 'center', boil: 0 }); G.text(ctx, l2, 0, 200, { size: 40, fam: 'Inter', weight: 800, color: C.gold, align: 'center', boil: 0 }); }); });
    P.note(ctx, 'for 49 years — on a machine nobody can touch', 960, 960, t, ev.c7_touch, { size: 46, color: C.cream });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — the 2030s: the whisper stops, Voyager keeps sailing (beam fades, record glints)
  P.shot(ev.c7_s3, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 300, seed: 155, glow: [1500, 300, 600, C.violet, 0.4] });
    const fade = 1 - P.fin(t, ev.c7_stop, 1.0); const k = P.eio((t - ev.c7_s3) / 12);
    P.voyager(ctx, lerp(700, 1300, k), lerp(600, 420, k), lerp(0.9, 0.6, k), t, { rot: -0.15, beam: fade });
    P.tag(ctx, 'THE 2030s', 420, 160, t, ev.c7_low - 0.6, 1e9, { size: 44, fill: C.cream, color: C.ink, dot: C.coral });
    ctx.save(); ctx.globalAlpha *= 0.5 + 0.5 * fade; ctx.strokeStyle = C.sig; ctx.lineWidth = 4; ctx.beginPath(); for (let x = 160; x < 760; x += 6) { const yy = 330 + Math.sin(x * 0.06 - t * 8) * 26 * fade; x === 160 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy); } ctx.stroke(); ctx.restore();
    P.note(ctx, 'the whisper stops…', 460, 440, t, ev.c7_stop, { size: 48, color: C.cream });
    P.big(ctx, 'Voyager doesn’t.', 1300, 900, t, ev.c7_wont, { size: 80, color: C.gold });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S4 — NASA's light-day moment: people flash V-G-R in Morse code at the night sky
  P.shot(ev.c7_s4, (ctx, t) => {
    P.sky(ctx, t, 'night', { stars: 300, seed: 157 }); P.hills(ctx, t, { y: 900, layers: 3, tint: '#3E2A66' });
    const code = []; let tc = ev.c7_V; ['V', 'G', 'R'].forEach((ch, ci) => { const t0 = [ev.c7_V, ev.c7_G, ev.c7_R][ci]; let u = t0; for (const s of MORSE[ch]) { const d = s === '.' ? 0.12 : 0.34; code.push([u, u + d, ch]); u += d + 0.1; } });
    const on = code.some(([a, b]) => t >= a && t < b) ? 1 : 0.0;
    for (let i = 0; i < 9; i++) { const x = 160 + i * 200 + U.hash(i, 3) * 60, y = 980 + U.hash(i, 4) * 40; P.person(ctx, x, y, 0.5 + U.hash(i, 5) * 0.15, t, { pose: 'flash', seed: i, hold: t > ev.c7_V - 0.1 ? on : 0, hair: i % 3 }); }
    P.ground(ctx, 1000, C.ink);
    // the code itself, building up letter by letter
    ['V', 'G', 'R'].forEach((ch, ci) => { const t0 = [ev.c7_V, ev.c7_G, ev.c7_R][ci]; const k = P.pop(t, t0 - 0.05, 0.3); if (k <= 0) return; const x = 640 + ci * 320;
      P.at(ctx, x, 230, k, 0, () => { G.text(ctx, ch, 0, 0, { size: 120, fam: 'Bungee', color: C.gold, align: 'center', boil: 0 }); let xx = -((MORSE[ch].length - 1) * 44) / 2; for (const s of MORSE[ch]) { if (s === '.') P.circ(ctx, xx, 70, 13, C.cream); else P.rect(ctx, xx - 26, 58, 52, 24, 12, C.cream); xx += 44; } }); });
    P.tag(ctx, 'NASA: FLASH “V-G-R” — VOYAGER’S CALL SIGN', 960, 420, t, ev.c7_nasa, 1e9, { size: 36, fill: C.cream, color: C.ink, dot: C.gold });
    P.source(ctx, 'NASA “Shine Bright”, Nov 2026', t, ev.c7_nasa);
  }, { in: { type: 'fade', dur: 0.5 } });

  // S5 — one last number: ≈ 9,000 km farther while you watched (a live counter, Earth → Voyager line stretching)
  P.shot(ev.c7_s5, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 260, seed: 159 });
    const km = Math.min(9200, Math.max(0, t) * 17); // ≈ 17 km every second since the video started
    P.earth(ctx, 200, 620, 34, t); const vx = 1500 + Math.sin(t * 0.5) * 6; P.voyager(ctx, vx, 600, 0.32, t, { glint: false });
    P.line(ctx, 250, 620, vx - 80, 620, P.rgba(C.cream, 0.3), 3, 1, 1, [4, 10]);
    P.big(ctx, 'while you watched this video…', 960, 220, t, ev.c7_num, { size: 62, color: C.cream });
    const ck = P.pop(t, ev.c7_9ka - 0.5, 0.4); if (ck > 0) P.at(ctx, 960, 430, ck, 0, () => { G.text(ctx, '+' + Data.number(Math.round(km)), 0, 0, { size: 150, fam: 'Bungee', color: C.gold, align: 'center', boil: 0 }); G.text(ctx, 'KM FARTHER FROM HOME', 0, 70, { size: 44, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 }); });
    P.note(ctx, '≈ 17 km every second', 960, 860, t, ev.c7_9k + 0.2, { size: 48, color: C.cream });
    Ch.echo(ctx, { x: 340, y: 1060, s: 0.6, t, gesture: 'point', mouth: P.talk(t), look: 1, eyes: 'wide' });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S6 — every word left it yesterday · still saying hello (a "hello" bubble arrives at Echo)
  P.shot(ev.c7_s6, (ctx, t) => {
    P.sky(ctx, t, 'dawn', { stars: 80, seed: 161 }); P.hills(ctx, t, { y: 980, layers: 3, tint: '#4A3A78' });
    P.dsn(ctx, 1420, 990, 0.9, t, { tilt: -0.5, listen: 1 });
    const k = P.oc((t - ev.c7_s6) / 3.2); P.signal(ctx, 120, 60, 1300, 640, t, { k, color: C.sig });
    P.tag(ctx, 'SENT: YESTERDAY', 520, 200, t, ev.c7_yest, 1e9, { size: 40, fill: C.ink, color: C.cream });
    const hb = P.pop(t, ev.c7_hello, 0.45); if (hb > 0) P.at(ctx, 760, 600, hb, -0.03, () => { P.rect(ctx, -170, -70, 340, 140, 70, C.cream, { shadow: 0.3 }); G.text(ctx, 'hello.', 0, 22, { size: 74, fam: P.HAND, color: C.ink, align: 'center', boil: 0 }); P.poly(ctx, [[-30, 66], [10, 66], [-60, 110]], C.cream); });
    Ch.echo(ctx, { x: 500, y: 1000, s: 0.85, t, gesture: t > ev.c7_hello ? 'wave' : 'listen', eyes: t > ev.c7_hello ? 'happy' : 'open', mouth: P.talk(t), look: 0.7 });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S7 — Whyverse end card: like, subscribe, Instagram + TikTok, and one specific "send this to…" line
  P.shot(ev.c7_s7, (ctx, t) => {
    P.sky(ctx, t, 'night', { stars: 260, seed: 163 }); P.hills(ctx, t, { y: 1020, layers: 2, tint: '#3E2A66' });
    const kb = P.pop(t, ev.sync_logo, 0.5); P.brandPlanet(ctx, 640, 220, 60 * kb, t, 1); G.text(ctx, 'WHYVERSE', 1080, 258, { size: 110, fam: 'Bungee', color: C.gold, align: 'center', alpha: clamp(kb), boil: 0 });
    const like = P.pop(t, ev.c7_like, 0.45); P.at(ctx, 700, 470, like, 0, () => { const on = t > ev.c7_like + 0.3; P.rect(ctx, -200, -70, 400, 140, 70, on ? C.coral : C.cream, { shadow: 0.3 });
      P.fill(ctx, P.pPoly([[-130, 30], [-130, -10], [-100, -10], [-80, -50], [-64, -48], [-70, -10], [-30, -10], [-40, 30]]), on ? C.cream : C.ink); G.text(ctx, 'LIKE', 40, 22, { size: 58, fam: 'Inter', weight: 800, color: on ? C.cream : C.ink, align: 'center', boil: 0 }); });
    const sub = P.pop(t, ev.c7_sub, 0.45); P.at(ctx, 1240, 470, sub, 0, () => { const on = t > ev.c7_sub + 0.35; P.rect(ctx, -270, -70, 540, 140, 70, on ? C.ink : '#E5484D', { shadow: 0.3, stroke: on ? C.cream : null, lw: 4 });
      G.text(ctx, on ? 'SUBSCRIBED ✓' : 'SUBSCRIBE', 0, 22, { size: 56, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 }); });
    P.ring(ctx, 1240, 470, t, ev.c7_sub + 0.35, { r: 320, color: C.gold });
    P.tag(ctx, 'Instagram  @whyverse___', 640, 680, t, ev.c7_ig, 1e9, { size: 46, fill: C.cream, color: C.ink, dot: '#F49AB0' });
    P.tag(ctx, 'TikTok  @Whyverse', 1300, 680, t, ev.c7_tt, 1e9, { size: 46, fill: C.cream, color: C.ink, dot: C.sig });
    // the sends line (an envelope icon + a specific friend)
    const sk = P.pop(t, ev.c7_send, 0.45); if (sk > 0) P.at(ctx, 960, 850, sk, 0, () => { const tw = P.measure(ctx, 'Send this to the friend who says old tech is useless', 44, 'Inter', 800); P.rect(ctx, -tw / 2 - 110, -54, tw + 160, 108, 54, P.rgba(C.ink, 0.92), { stroke: C.gold, lw: 4 });
      const ex = -tw / 2 - 50; P.rect(ctx, ex - 30, -22, 60, 44, 6, C.gold); P.trace(ctx, [[ex - 30, -22], [ex, 4], [ex + 30, -22]], 1, C.ink, 4);
      G.text(ctx, 'Send this to the friend who says old tech is useless', 30, 16, { size: 44, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 }); });
    const fly = P.eio((t - ev.c7_bye) / 1.6);
    Ch.echo(ctx, { x: 1740 + fly * 300, y: 1040, s: 0.62, t, dir: -1, gesture: t > ev.c7_like ? 'cheer' : 'wave', mouth: P.talk(t), eyes: 'happy', hop: (t > ev.c7_bye ? ((t - ev.c7_bye) * 1.5) % 1 : 0) });
    P.voyager(ctx, 200 + (t - ev.c7_s7) * 20, 120, 0.12, t, { glint: false });
  }, { in: { type: 'iris', color: '#FFC857', at: [960, 540], dur: 0.8 } });
})();
