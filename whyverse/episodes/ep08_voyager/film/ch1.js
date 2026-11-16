// Chapter 1 — What is a light-day? A distance, not a time · light ≈ 300,000 km/s · Moon ≈ 1.3 s, Sun ≈ 8 min 20 s · a full day of light
// = 25.9 billion km · ≈ 173 × Earth–Sun · nothing we built got that far — until now · 49 years of flight · "how did it get so far?"
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  P.cardShot('c1', 1, 'What is a light-day?', 'night', (ctx, t) => {
    // a beam of light racing across the card, again and again
    for (let i = 0; i < 3; i++) { const ph = ((t * 0.45 + i / 3) % 1); const x = -300 + ph * (W + 600), y = 900 + i * 50; ctx.save(); const g = ctx.createLinearGradient(x - 400, y, x, y); g.addColorStop(0, 'rgba(255,200,87,0)'); g.addColorStop(1, 'rgba(255,230,160,0.8)'); ctx.strokeStyle = g; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(x - 400, y); ctx.lineTo(x, y); ctx.stroke(); ctx.restore(); P.glow(ctx, x, y, 40, C.gold, 0.8); }
    P.hills(ctx, t, { y: 1020, layers: 2, tint: '#33215C' });
  });

  // S1 — light: the fastest thing; ≈ 300,000 km every second
  P.shot(ev.c1_s1, (ctx, t) => {
    P.sky(ctx, t, 'night', { stars: 200, seed: 31 });
    // a photon streaks across, leaving tick marks, one per "second" of the counter
    const ph = ((t - ev.c1_s1) * 0.6) % 1; const x = lerp(-100, W + 100, ph);
    ctx.save(); const g = ctx.createLinearGradient(x - 700, 0, x, 0); g.addColorStop(0, 'rgba(255,200,87,0)'); g.addColorStop(1, 'rgba(255,240,190,1)'); ctx.strokeStyle = g; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(x - 700, 640); ctx.lineTo(x, 640); ctx.stroke(); ctx.restore(); P.glow(ctx, x, 640, 120, '#FFF2C0', 1);
    P.big(ctx, 'the fastest thing there is', 960, 260, t, ev.c1_fast, { size: 70, color: C.cream });
    P.inkCount(ctx, { x: 960, y: 470, to: 299792, t, t0: ev.c1_300a, t1: ev.c1_300, size: 150, sub: 'KILOMETRES EVERY SECOND', subSize: 44 });
    Ch.echo(ctx, { x: 1700, y: 1040, s: 0.7, t, dir: -1, gesture: 'point', mouth: P.talk(t), look: -1 });
    P.hills(ctx, t, { y: 1060, layers: 1, tint: '#33215C' });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — Moon ≈ 1.3 s, Sun ≈ 8 min 20 s (two light routes with their own stopwatches)
  P.shot(ev.c1_s2, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 220, seed: 33 });
    // Earth → Moon (top row), Earth → Sun (bottom row)
    const rows = [[330, ev.c1_moon, ev.c1_moonT, 'MOON', '≈ 1.3 s', 620], [720, ev.c1_sun, ev.c1_sunT, 'SUN', '≈ 8 min 20 s', 1640]];
    rows.forEach(([y, t0, t1, name, lab, x1], i) => { const a = P.fin(t, t0 - 0.5, 0.4); if (a <= 0) return; ctx.save(); ctx.globalAlpha *= a;
      P.earth(ctx, 220, y, 40, t);
      if (i === 0) P.planet(ctx, x1, y, 34, t, { col: '#2C2840', rim: '#E8E2D0', lit: 0.35 }); else P.sunDisc(ctx, x1 + 60, y, 90, t);
      const k = clamp((t - t0) / Math.max(0.3, t1 - t0)); P.signal(ctx, 270, y, i === 0 ? x1 - 40 : x1 - 40, y, t, { k, color: '#FFE6A0' });
      P.dimLine(ctx, 270, y + 90, (i === 0 ? x1 : x1 - 40), y + 90, '', k, { color: P.rgba(C.cream, 0.6) });
      G.text(ctx, name, i === 0 ? x1 : x1 + 60, y + (i === 0 ? -70 : -130), { size: 40, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 });
      ctx.restore(); P.tag(ctx, lab, i === 0 ? 1000 : 960, y + (i === 0 ? 0 : 170), t, t1, 1e9, { size: 54, fill: C.gold, color: C.ink, fam: 'Bungee', weight: 400 }); });
    P.note(ctx, 'by the time you see the Sun, that light is 8 minutes old', 960, 1000, t, ev.c1_sunT + 0.6, { size: 40, color: C.cream });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — a full day of light: a 24-hour dial sweeps; 25.9 billion km
  P.shot(ev.c1_s3, (ctx, t) => {
    P.sky(ctx, t, 'night', { stars: 220, seed: 35 });
    const sw = clamp((t - ev.c1_day) / Math.max(0.5, ev.c1_259a - ev.c1_day));
    const cx = 480, cy = 540, r = 260; P.circ(ctx, cx, cy, r + 24, C.ink, { stroke: P.rgba(C.rim, 0.7), lw: 4 });
    ctx.save(); ctx.fillStyle = P.rgba(C.gold, 0.85); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + sw * 6.283); ctx.closePath(); ctx.fill(); ctx.restore();
    for (let i = 0; i < 24; i++) { const a = i / 24 * 6.283 - Math.PI / 2; P.line(ctx, cx + Math.cos(a) * (r + 2), cy + Math.sin(a) * (r + 2), cx + Math.cos(a) * (r + (i % 6 ? 14 : 22)), cy + Math.sin(a) * (r + (i % 6 ? 14 : 22)), C.cream, i % 6 ? 3 : 6); }
    G.text(ctx, Math.round(24 * sw) + ' h', cx, cy + 30, { size: 96, fam: 'Bungee', color: C.ink, align: 'center', boil: 0 });
    P.tag(ctx, '24 HOURS OF LIGHT', cx, 900, t, ev.c1_24, 1e9, { size: 40, fill: C.cream, color: C.ink });
    P.inkCount(ctx, { x: 1330, y: 470, to: 25.9, decimals: 1, t, t0: ev.c1_259a, t1: ev.c1_259, size: 190, sub: 'BILLION KILOMETRES', subSize: 54 });
    P.note(ctx, '= 1 light-day', 1330, 720, t, ev.c1_259 + 0.4, { size: 60 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — ≈ 173 × the Earth–Sun distance: one unit, then 173 copies down the line
  P.shot(ev.c1_s4, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 160, seed: 37 });
    const x0 = 140, y = 600, u = 9.4; // 173 units × 9.4 px ≈ 1626 px
    const one = P.oc((t - ev.c1_au + 0.3) / 0.6);
    P.sunDisc(ctx, x0, y, 40, t); P.earth(ctx, x0 + 260 * one, y, 16, t, { a: one });
    if (t < ev.c1_173a) P.dimLine(ctx, x0, y + 90, x0 + 260, y + 90, 'EARTH – SUN', one, { size: 34 });
    const n = Math.round(173 * P.eio((t - ev.c1_173a) / Math.max(0.6, ev.c1_173 - ev.c1_173a + 0.4)));
    if (t >= ev.c1_173a) { for (let i = 0; i < n; i++) { const xx = x0 + 60 + i * u; P.line(ctx, xx, y - (i % 10 ? 14 : 30), xx, y + (i % 10 ? 14 : 30), i % 10 ? P.rgba(C.cream, 0.6) : C.gold, i % 10 ? 2 : 4); }
      P.voyager(ctx, x0 + 60 + n * u + 50, y - 60, 0.16, t, { glint: false }); }
    P.inkCount(ctx, { x: 960, y: 330, to: 173, t, t0: ev.c1_173a, t1: ev.c1_173, size: 170, prefix: '× ', sub: 'THE EARTH–SUN DISTANCE', subSize: 46 });
    P.note(ctx, 'each tick = Sun → Earth', 960, 820, t, ev.c1_sun2, { size: 44, color: C.cream });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S5 — nothing we built got that far… until now (rockets and probes fall short of the line; Voyager crosses it)
  P.shot(ev.c1_s5, (ctx, t) => {
    P.sky(ctx, t, 'dusk', { stars: 30, seed: 39 }); P.hills(ctx, t, { y: 980, layers: 3, tint: '#6A3A72' });
    const lx = 1500; ctx.save(); ctx.strokeStyle = C.gold; ctx.lineWidth = 6; ctx.setLineDash([24, 16]); ctx.lineDashOffset = -t * 30; ctx.beginPath(); ctx.moveTo(lx, 120); ctx.lineTo(lx, 960); ctx.stroke(); ctx.restore();
    G.text(ctx, '1 LIGHT-DAY', lx, 100, { size: 40, fam: 'Inter', weight: 800, color: C.gold, align: 'center', boil: 0 });
    // rocket silhouette
    const rk = P.oc((t - ev.c1_rocket + 0.6) / 0.8); if (rk > 0) { const rx = lerp(160, 620, rk), ry = 760 - 380 * Math.sin(rk * Math.PI * 0.7); P.at(ctx, rx, ry, 1, 0.9 * rk, () => { P.silP(ctx, [[0, -90], [22, -40], [22, 50], [40, 80], [-40, 80], [-22, 50], [-22, -40]], {}); P.glow(ctx, 0, 100, 50, C.coral, 0.8); }); if (rk >= 1) P.cross(ctx, rx - 50, ry - 50, rx + 50, ry + 50, (t - ev.c1_rocket - 0.2) / 0.3, { lw: 10 }); }
    const pk = P.oc((t - ev.c1_probe + 0.6) / 0.8); if (pk > 0) { const px = lerp(160, 1060, pk), py = 520 - 120 * Math.sin(pk * 2.4); P.at(ctx, px, py, 1, pk, () => { P.silR(ctx, -26, -20, 52, 40, 6, {}); P.inkLine(ctx, -80, 0, 80, 0, 6); P.silE(ctx, 0, -40, 40, 14, {}); }); if (pk >= 1) P.cross(ctx, px - 50, py - 50, px + 50, py + 50, (t - ev.c1_probe - 0.2) / 0.3, { lw: 10 }); }
    const vk = P.eio((t - ev.c1_now + 0.9) / 1.4); if (vk > 0) { P.voyager(ctx, lerp(300, 1680, vk), 330, 0.35, t, { rot: -0.1 }); }
    const fl = t > ev.c1_now ? Math.exp(-(t - ev.c1_now) * 3) : 0; if (fl > 0) P.glow(ctx, lx, 330, 500, C.gold, fl);
    P.stamp(ctx, 'UNTIL NOW', 960, 860, t, ev.c1_now, { size: 90, color: C.coral });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — 49 years of non-stop flight · "how did it get so far?"
  P.shot(ev.c1_s6, (ctx, t) => {
    P.sky(ctx, t, 'rose', { stars: 90, seed: 41 }); P.hills(ctx, t, { y: 1000, layers: 2, tint: '#7A3B6E' });
    const k = P.eio((t - ev.c1_s6 - 0.2) / Math.max(0.8, ev.c1_49 - ev.c1_s6));
    P.line(ctx, 240, 520, 1680, 520, P.rgba(C.cream, 0.4), 8); P.line(ctx, 240, 520, lerp(240, 1680, k), 520, C.gold, 12);
    for (let y = 1977, i = 0; y <= 2026; y++, i++) { const x = lerp(240, 1680, i / 49); if (x > lerp(240, 1680, k) + 1) break; P.line(ctx, x, 500 - (y % 10 === 0 ? 14 : 0), x, 540 + (y % 10 === 0 ? 14 : 0), C.cream, y % 10 === 0 ? 4 : 2); if (y % 10 === 0) G.text(ctx, String(y), x, 600, { size: 30, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 }); }
    G.text(ctx, '1977', 240, 460, { size: 44, fam: 'Bungee', color: C.cream, align: 'center', boil: 0 }); if (k > 0.98) G.text(ctx, '2026', 1680, 460, { size: 44, fam: 'Bungee', color: C.gold, align: 'center', boil: 0 });
    P.voyager(ctx, lerp(240, 1680, k), 380, 0.22, t, { rot: -0.1 });
    P.inkCount(ctx, { x: 960, y: 300, to: 49, t, t0: ev.c1_49 - 0.6, t1: ev.c1_49, size: 150, sub: 'YEARS OF NON-STOP FLIGHT', subSize: 44 });
    P.write(ctx, 'how did a 1970s machine get so far?', 960, 800, t, ev.c1_q, { size: 62, color: C.cream, hl: ['far?'], hlColor: C.gold });
    Ch.echo(ctx, { x: 1760, y: 1040, s: 0.6, t, dir: -1, gesture: 'think', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'fade', dur: 0.4 } });
})();
