// Chapter 3 — The reef that waits for the Moon: Great Barrier Reef mass spawning.
(function () {
  const { U, G, Ch, P, SCORE: S, Shots, K, Data } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const coral = (ctx, x, y, s, kind, col, seed) => P.at(ctx, x, y, s, 0, () => {
    ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineCap = 'round';
    if (kind === 0) { ctx.lineWidth = 16; const br = (x0, y0, a, l, d) => { if (d > 3) return; const x1 = x0 + Math.sin(a) * l, y1 = y0 - Math.cos(a) * l; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); br(x1, y1, a - 0.45 - 0.2 * U.hash(d, seed), l * 0.72, d + 1); br(x1, y1, a + 0.45 + 0.2 * U.hash(d + 5, seed), l * 0.72, d + 1); }; br(0, 0, 0, 90, 0); }
    else if (kind === 1) { ctx.beginPath(); ctx.ellipse(0, -60, 120, 70, 0, Math.PI, 0); ctx.fill(); ctx.strokeStyle = 'rgba(0,0,0,0.2)'; ctx.lineWidth = 4; for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.ellipse(0, -60, 110 - i * 20, 60 - i * 11, 0, Math.PI, 0); ctx.stroke(); } }
    else { ctx.beginPath(); ctx.moveTo(-20, 0); ctx.lineTo(-10, -60); ctx.lineTo(-150, -110); ctx.lineTo(150, -110); ctx.lineTo(10, -60); ctx.lineTo(20, 0); ctx.fill(); }
  });
  const reefBg = (ctx, t, { moon = 1 } = {}) => {
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0B3564'); g.addColorStop(0.6, '#06203F'); g.addColorStop(1, '#030E1E'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    // moonlight shafts from the surface
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 6; i++) { const x = 600 + i * 160 + Math.sin(t * 0.4 + i) * 30; const gr = ctx.createLinearGradient(x, 0, x + 200, H); gr.addColorStop(0, `rgba(150,190,255,${0.10 * moon})`); gr.addColorStop(1, 'rgba(150,190,255,0)');
      ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + 70, 0); ctx.lineTo(x + 380, H); ctx.lineTo(x + 200, H); ctx.fill(); }
    ctx.restore();
    P.glow(ctx, 1000, -40, 380, 'rgba(200,220,255,', 0.5 * moon);
    ctx.fillStyle = '#0A1A2C'; ctx.beginPath(); ctx.moveTo(0, H); for (let i = 0; i <= 20; i++) ctx.lineTo(i * 96, 960 - 40 * U.hash(i, 3)); ctx.lineTo(W, H); ctx.fill();
    const cols = ['#E7707F', '#F2A65A', '#B07CF0', '#5FC9B5', '#F59AB8'];
    for (let i = 0; i < 11; i++) coral(ctx, 80 + i * 175 + 40 * U.hash(i, 1), 980 - 20 * U.hash(i, 2), 0.8 + 0.5 * U.hash(i, 4), i % 3, cols[i % 5], i);
  };
  // rising spawn bundles (pink beads), released from t0
  const spawn = (ctx, t, t0, { n = 420, x0 = 0, x1 = W, seed = 2, rate = 1 } = {}) => {
    if (t < t0) return; for (let i = 0; i < n; i++) { const st = t0 + U.hash(i, seed) * 2.2 / rate; if (t < st) continue; const a = t - st;
      const x = lerp(x0, x1, U.hash(i, seed + 1)) + Math.sin(a * 1.2 + i) * 18, y = 960 - 40 * U.hash(i, seed + 2) - a * (70 + 60 * U.hash(i, seed + 3));
      if (y < -20) continue; ctx.fillStyle = `rgba(255,${150 + 60 * U.hash(i, seed + 4)},${170 + 50 * U.hash(i, 9)},${0.85})`; ctx.beginPath(); ctx.arc(x, y, 3.5 + 3 * U.hash(i, seed + 5), 0, 7); ctx.fill(); }
  };
  P.cardShot('c3', 3, 'The reef that waits for the Moon', (ctx, t) => { reefBg(ctx, t); spawn(ctx, t, S.CH.c3.t0 + 2, { n: 160, rate: 0.6 }); });

  // S1 — map + calendar
  P.shot(ev.c3_s1, (ctx, t) => {
    P.spaceBg(ctx, t, { top: '#06142B', bottom: '#0B2444', stars: 0 });
    const map = Data.map({ region: [110, -45, 158, -8], x: 80, y: 120, w: 860, h: 860 });
    Data.drawMap(ctx, map, { only: ['Australia', 'Papua New Guinea', 'Indonesia'], land: '#3F6E9C', stroke: 'rgba(255,255,255,0.55)', lw: 2, t, t0: ev.c3_s1, dur: 0.8 });
    const kr = clamp((t - ev.c3_gbr) / 1.2);
    if (kr > 0) { const pts = [[143.5, -11], [145.5, -15], [146.5, -18.5], [149.5, -21], [152.5, -24]]; ctx.strokeStyle = '#FF7FA8'; ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.beginPath();
      const n = Math.max(2, Math.ceil(pts.length * kr)); pts.slice(0, n).forEach(([lo, la], i) => { const [x, y] = map.proj(lo, la); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke();
      const [gx, gy] = map.proj(150, -17); P.tag(ctx, 'GREAT BARRIER REEF', gx - 120, gy + 330, t, ev.c3_gbr + 0.3, 1e9, { size: 30, border: '#FF7FA8' }); }
    P.tag(ctx, 'AUSTRALIA', 470, 560, t, ev.c3_aus, 1e9, { size: 34, border: C.dim });
    // calendar: three full moons and the 1–6 nights after
    ['OCT', 'NOV', 'DEC'].forEach((m, i) => { const k = P.pop(t, ev.c3_months[i], 0.4); if (k <= 0) return; const y = 280 + i * 230;
      P.at(ctx, 1490, y, k, 0, () => { P.panel(ctx, -400, -90, 800, 180, {}); G.text(ctx, m, -330, 22, { size: 56, fam: FT.title, weight: 400, color: C.white, align: 'center', boil: 0 });
        P.moonDisc(ctx, -170, 0, 46, { glow: 0.4 });
        for (let d = 1; d <= 6; d++) { const q = clamp((t - ev.c3_nights - d * 0.1) / 0.3); ctx.fillStyle = `rgba(255,127,168,${0.25 + 0.75 * q})`; ctx.beginPath(); ctx.arc(-80 + d * 70, 0, 22, 0, 7); ctx.fill(); G.text(ctx, String(d), -80 + d * 70, 10, { size: 26, fam: FT.ui, weight: 800, color: '#14213D', align: 'center', boil: 0 }); } }); });
    P.label(ctx, 'spawning: 1 to 6 nights after a full moon', 1460, 990, { size: 28, align: 'center', alpha: clamp((t - ev.c3_nights) / 0.4) });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — snow falling upwards
  P.shot(ev.c3_s2, (ctx, t) => {
    reefBg(ctx, t); spawn(ctx, t, ev.c3_spawn - 0.4, { n: 900, rate: 1.4 });
    P.tag(ctx, 'billions of egg-and-sperm bundles', 960, 140, t, ev.c3_spawn, 1e9, { size: 38, border: '#FF7FA8' });
    P.stamp(ctx, 'SNOW, FALLING UP', 960, 290, t, ev.c3_snow, { size: 74, color: C.white, rot: 0.03 });
  }, { in: { type: 'fade', dur: 0.6 }, cam: Shots.push(1.0, 1.03) });

  // S3 — corals can't move: timing is everything
  P.shot(ev.c3_s3, (ctx, t) => {
    reefBg(ctx, t, { moon: 0.7 });
    const L0 = 380, R0 = 1540;
    for (const [x, c] of [[L0, '#E7707F'], [R0, '#F2A65A']]) { coral(ctx, x, 980, 1.6, 0, c, x); P.at(ctx, x, 560, P.pop(t, ev.c3_timing, 0.4), 0, () => { P.panel(ctx, -70, -70, 140, 140, { r: 70 }); P.icon(ctx, 'clock', 0, 0, 56, { color: C.gold }); }); }
    P.tag(ctx, "corals can't move", 960, 160, t, ev.c3_cant, 1e9, { size: 40 });
    const tr = ev.c3_timing + 0.4; if (t > tr) { const u = clamp((t - tr) / 2.0);
      for (let i = 0; i < 26; i++) { for (const [x0, dir] of [[L0, 1], [R0, -1]]) { const v = clamp(u * (0.8 + 0.4 * U.hash(i, x0))); const x = x0 + dir * v * 520 + Math.sin(t + i) * 8, y = 820 - v * 360 - 120 * U.hash(i, x0 + 1);
        ctx.fillStyle = dir > 0 ? '#FF9DB8' : '#FFD08A'; ctx.beginPath(); ctx.arc(x, y, 7, 0, 7); ctx.fill(); } } }
    if (t > ev.c3_meet) { P.sparkle(ctx, 960, 520, t, ev.c3_meet, { n: 18, r: 160, color: '#FFE3F0' }); P.tag(ctx, 'they meet', 960, 400, t, ev.c3_meet, 1e9, { size: 44, border: '#FF7FA8' }); }
  }, { in: { type: 'push', dur: 0.5 } });

  // S4 — the season and the night
  P.shot(ev.c3_s4, (ctx, t) => {
    reefBg(ctx, t, { moon: 0.5 });
    ctx.fillStyle = 'rgba(3,10,24,0.45)'; ctx.fillRect(0, 0, W, H);
    const card = (x, t0, draw, a, b) => { const k = P.pop(t, t0, 0.45); if (k <= 0) return; P.at(ctx, x, 470, k, 0, () => { P.panel(ctx, -330, -230, 660, 460, {}); draw(); G.text(ctx, a, 0, 130, { size: 52, fam: FT.title, weight: 400, color: C.white, align: 'center', boil: 0 }); P.label(ctx, b, 0, 185, { size: 28, align: 'center' }); }); };
    card(560, ev.c3_warm, () => { ctx.fillStyle = 'rgba(255,255,255,0.15)'; P.rr(ctx, -26, -190, 52, 230, 26); ctx.fill(); const q = clamp((t - ev.c3_warm) / 1); ctx.fillStyle = C.coral; P.rr(ctx, -16, -60 - 110 * q, 32, 90 + 110 * q, 16); ctx.fill(); ctx.beginPath(); ctx.arc(0, 40, 40, 0, 7); ctx.fill(); }, 'WARM WATER', 'sets the season');
    card(1360, ev.c3_night, () => { P.moonDisc(ctx, 0, -60, 90, { glow: 0.6 }); }, 'THE MOON', 'helps pick the night');
    P.stamp(ctx, 'NOW: SPAWNING SEASON', 960, 900, t, ev.c3_now, { size: 70 });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S5 — without the Moon: the clocks drift apart
  P.shot(ev.c3_s5, (ctx, t) => {
    reefBg(ctx, t, { moon: lerp(0.7, 0, clamp((t - ev.c3_s5) / 1.5)) });
    const L0 = 380, R0 = 1540, drift = ease.inOutCubic(clamp((t - ev.c3_lose) / 1.5));
    [[L0, '#E7707F', -1], [R0, '#F2A65A', 1]].forEach(([x, c, s]) => { coral(ctx, x, 980, 1.6, 0, c, x);
      P.at(ctx, x, 560, 1, 0, () => { P.panel(ctx, -70, -70, 140, 140, { r: 70 }); ctx.save(); ctx.rotate(s * drift * 2.2); P.icon(ctx, 'clock', 0, 0, 56, { color: drift > 0.3 ? C.coral : C.gold }); ctx.restore(); }); });
    // releases at different moments: few bundles, far apart
    spawn(ctx, t, ev.c3_lose + 0.3, { n: 60, x0: 250, x1: 520, seed: 7 }); spawn(ctx, t, ev.c3_apart + 0.2, { n: 60, x0: 1400, x1: 1680, seed: 11 });
    P.tag(ctx, 'one clock lost', 960, 160, t, ev.c3_lose, 1e9, { size: 40, border: C.coral });
    Ch.luna(ctx, { x: 960, y: 520, s: 0.9, t, eyes: 'worried', mouth: Ch.lunaMouth(t, 'frown'), alpha: 1 - drift * 0.6 });
  }, { in: { type: 'fade', dur: 0.5 } });
})();
