// Chapter 2 — The cosmic slingshot. Myth: "fastest spacecraft ever" — it isn't · planets lined up (≈ once every 175 years) ·
// Voyager 2 launched first (Aug), Voyager 1 on 5 Sep on a faster path → Jupiter first → "1" · gravity assists at Jupiter (1979) and
// Saturn (1980) · ≈ 61,000 km/h today; Parker Solar Probe > 10× faster · the secret is time: never stopped in 49 years · Voyager 2 is
// billions of km behind → Voyager 1 = the farthest · "how does its voice reach us?"
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C;
  const W = G.W, H = G.H;
  P.cardShot('c2', 2, 'The cosmic slingshot', 'rose', (ctx, t) => {
    P.planet(ctx, 260 + Math.sin(t * 0.3) * 10, 940, 90, t, { col: C.ink, rim: C.rim, bands: ['#3A2A40', '#2A2034'] });
    P.planet(ctx, 1640, 960, 70, t, { col: C.ink, rim: C.rim, ring: true });
    P.stamp(ctx, 'MYTH', 1560, 230, t, ev.c2_isnt, { size: 70, color: C.coral, rot: 0.06 });
  });

  // a top-down solar system (shared by S1 and S3): Sun in the middle, four giant planets on circles
  const ORB = [[150, 'Jup', 34, 0], [235, 'Sat', 28, 1], [315, 'Ura', 20, 0], [385, 'Nep', 20, 0]];
  const sys = (ctx, t, cx, cy, align, { a = 1 } = {}) => {
    P.sunDisc(ctx, cx, cy, 34, t);
    ORB.forEach(([r, n, pr, ring], i) => { ctx.save(); ctx.globalAlpha *= a * 0.5; ctx.strokeStyle = C.cream; ctx.lineWidth = 2; ctx.setLineDash([4, 10]); ctx.beginPath(); ctx.ellipse(cx, cy, r * 2, r * 0.9, 0, 0, 7); ctx.stroke(); ctx.restore();
      const scat = [2.4, -1.1, 3.9, 0.9][i]; const ang = lerp(scat + t * 0.05 * (4 - i), -0.62 + i * 0.03, align);
      P.planet(ctx, cx + Math.cos(ang) * r * 2, cy + Math.sin(ang) * r * 0.9, pr, t, { ring: !!ring, a }); });
  };

  // S1 — planets line up · ≈ once every 175 years
  P.shot(ev.c2_s1, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 220, seed: 51 });
    const al = P.eio((t - ev.c2_line + 1.0) / 1.6);
    ctx.save(); ctx.translate(0, 80); sys(ctx, t, 960, 520, al); ctx.restore();
    if (al > 0.95) { ctx.save(); ctx.strokeStyle = C.gold; ctx.lineWidth = 4; ctx.setLineDash([10, 10]); ctx.globalAlpha *= P.fin(t, ev.c2_line + 0.6, 0.4); ctx.beginPath(); ctx.moveTo(960, 600); ctx.lineTo(960 + Math.cos(-0.6) * 900, 600 + Math.sin(-0.6) * 420); ctx.stroke(); ctx.restore(); }
    P.inkCount(ctx, { x: 420, y: 180, to: 175, t, t0: ev.c2_175a, t1: ev.c2_175, size: 120, prefix: '1 in ', sub: 'YEARS: THIS ALIGNMENT', subSize: 36 });
    P.source(ctx, 'NASA Voyager mission', t, ev.c2_175);
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — two launches: Voyager 2 in August, Voyager 1 on 5 September on a faster path → Jupiter first → number 1
  P.shot(ev.c2_s2, (ctx, t) => {
    P.sky(ctx, t, 'gold', { sun: [1500, 820, 120] }); P.hills(ctx, t, { y: 1000, layers: 2, tint: '#8A3E62' });
    const rocket = (x, t0, label, date, col) => { const up = t < t0 ? 0 : ease.inQuad(clamp((t - t0) / 2.6)); const y = 960 - up * 1100;
      P.inkLine(ctx, x - 70, 960, x - 70, 540, 10); P.inkLine(ctx, x - 70, 600, x - 30, 600, 6); // tower
      P.at(ctx, x, y, 1, 0, () => { P.silP(ctx, [[0, -330], [26, -270], [26, -40], [50, 0], [-50, 0], [-26, -40], [-26, -270]], {}); if (up > 0) { P.glow(ctx, 0, 30, 140, C.gold, 1); P.poly(ctx, [[-22, 0], [22, 0], [0, 120 + Math.sin(t * 40) * 20]], '#FFE6A0'); } });
      if (up > 0) { ctx.save(); ctx.globalAlpha *= 0.5 * (1 - up); for (let i = 0; i < 8; i++) P.circ(ctx, x + (U.hash(i, x) - 0.5) * 220 * up * 2, 950 - U.hash(i, 3) * 60, 50 + 50 * up, '#F6D7C8'); ctx.restore(); }
      P.tag(ctx, label, x, 470, t, t0 - 0.4, 1e9, { size: 40, fill: col, color: C.ink }); P.tag(ctx, date, x, 540, t, t0 + 0.4, 1e9, { size: 32, fill: C.ink, color: C.cream }); };
    const sw = P.eio((t - ev.c2_faster + 0.2) / 0.6);
    ctx.save(); ctx.globalAlpha *= 1 - sw;
    rocket(560, ev.c2_v2, 'VOYAGER 2', '20 AUG 1977', C.cream); rocket(1240, ev.c2_v1, 'VOYAGER 1', '5 SEP 1977', C.gold); ctx.restore();
    // the race to Jupiter
    if (sw > 0) { ctx.save(); ctx.globalAlpha *= sw; P.sky(ctx, t, 'deep', { stars: 160, seed: 53 }); P.earth(ctx, 200, 820, 30, t); P.planet(ctx, 1680, 360, 110, t, { bands: ['#3A2A40', '#2A2034', '#3A2A40'] });
      const k = P.eio((t - ev.c2_faster) / Math.max(0.8, ev.c2_jup - ev.c2_faster + 0.3)); const p1 = [[230, 800], [700, 520], [1200, 400], [1560, 380]], p2 = [[230, 840], [700, 760], [1200, 660], [1560, 560]];
      P.trace(ctx, p1, k, C.gold, 6, 1, [16, 12]); P.trace(ctx, p2, k * 0.78, C.cream, 6, 0.8, [16, 12]);
      const a1 = P.along(p1, k), a2 = P.along(p2, k * 0.78); P.voyager(ctx, a1[0], a1[1] - 30, 0.14, t, { glint: false }); P.voyager(ctx, a2[0], a2[1] - 30, 0.14, t, { glint: false });
      G.text(ctx, 'V1', a1[0], a1[1] + 50, { size: 34, fam: 'Bungee', color: C.gold, align: 'center', boil: 0 }); G.text(ctx, 'V2', a2[0], a2[1] + 50, { size: 34, fam: 'Bungee', color: C.cream, align: 'center', boil: 0 });
      G.text(ctx, 'JUPITER', 1680, 530, { size: 40, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 }); ctx.restore();
      const nk = P.pop(t, ev.c2_num, 0.4); if (nk > 0) P.at(ctx, 1460, 220, nk, -0.08, () => { P.circ(ctx, 0, 0, 90, C.gold, { shadow: 0.3 }); G.text(ctx, '1', 0, 40, { size: 120, fam: 'Bungee', color: C.ink, align: 'center', boil: 0 }); });
      P.note(ctx, 'faster path → there first', 760, 260, t, ev.c2_faster + 0.3, { color: C.cream }); }
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — the slingshot: Jupiter 1979 bends and speeds it up, Saturn 1980 flings it out of the planets' plane
  P.shot(ev.c2_s3, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 220, seed: 55, glow: [200, 900, 600, C.rose, 0.35] });
    const path = [[80, 900], [500, 760], [760, 700], [860, 640], [880, 560], [960, 470], [1240, 420], [1380, 380], [1430, 300], [1500, 200], [1640, 60]];
    P.planet(ctx, 820, 560, 120, t, { bands: ['#3A2A40', '#2A2034', '#3A2A40'] }); G.text(ctx, 'JUPITER · 1979', 820, 760, { size: 36, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0, alpha: P.fin(t, ev.c2_j79 - 0.4, 0.3) });
    P.planet(ctx, 1500, 330, 70, t, { ring: true, a: P.fin(t, ev.c2_s80 - 1.2, 0.5) }); G.text(ctx, 'SATURN · 1980', 1500, 470, { size: 36, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0, alpha: P.fin(t, ev.c2_s80 - 0.4, 0.3) });
    const k = clamp((t - ev.c2_s3 - 0.3) / Math.max(1, ev.c2_flung - ev.c2_s3 + 0.4)); const ke = k < 0.5 ? k * 0.9 : 0.45 + (k - 0.5) * 1.1;
    P.trace(ctx, path, ke, C.gold, 5, 0.9, [14, 10]); const a = P.along(path, ke); P.voyager(ctx, a[0], a[1], 0.2, t, { rot: a[2] + 0.4, glint: false });
    P.ring(ctx, 860, 640, t, ev.c2_j79, { r: 200, color: C.gold }); P.ring(ctx, 1430, 300, t, ev.c2_s80, { r: 160, color: C.gold });
    // speed gauge
    const sp = 0.25 + 0.35 * P.oc((t - ev.c2_j79) / 0.8) + 0.3 * P.oc((t - ev.c2_s80) / 0.8);
    P.at(ctx, 280, 280, 1, 0, () => { P.stroke(ctx, (c) => { c.beginPath(); c.arc(0, 0, 130, Math.PI, Math.PI * 2); }, P.rgba(C.cream, 0.4), 18); P.stroke(ctx, (c) => { c.beginPath(); c.arc(0, 0, 130, Math.PI, Math.PI * (1 + sp)); }, C.coral, 18); const na = Math.PI * (1 + sp); P.line(ctx, 0, 0, Math.cos(na) * 110, Math.sin(na) * 110, C.cream, 8); P.circ(ctx, 0, 0, 14, C.cream); G.text(ctx, 'SPEED', 0, 56, { size: 34, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0 }); });
    P.note(ctx, 'borrows a little of each planet’s motion', 960, 1000, t, ev.c2_borrow, { color: C.cream, size: 42 });
    P.big(ctx, 'FLUNG OUT', 1560, 160, t, ev.c2_flung, { size: 64, color: C.gold, fam: 'Bungee' });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — ≈ 61,000 km/h today · not a record: Parker Solar Probe > 10× faster
  P.shot(ev.c2_s4, (ctx, t) => {
    P.sky(ctx, t, 'night', { stars: 160, seed: 57 });
    P.inkCount(ctx, { x: 960, y: 260, to: 61000, t, t0: ev.c2_61a, t1: ev.c2_61, size: 150, prefix: '≈ ', sub: 'KM/H · VOYAGER 1 TODAY', subSize: 42, tEnd: ev.c2_rec + 0.2 });
    const bk = P.fin(t, ev.c2_rec - 0.1, 0.4); if (bk > 0) { ctx.save(); ctx.globalAlpha *= bk;
      const x0 = 420, w = 1300, mx = 692000; const b1 = P.oc((t - ev.c2_rec) / 0.6), b2 = P.oc((t - ev.c2_parker) / 1.0);
      G.text(ctx, 'VOYAGER 1', x0 - 30, 470, { size: 38, fam: 'Inter', weight: 800, color: C.cream, align: 'right', boil: 0 }); P.rect(ctx, x0, 430, Math.max(20, w * 61155 / mx * b1), 60, 30, C.cream); G.text(ctx, '61,000', x0 + w * 61155 / mx + 30, 474, { size: 40, fam: 'Bungee', color: C.cream, boil: 0, alpha: b1 });
      G.text(ctx, 'PARKER', x0 - 30, 610, { size: 38, fam: 'Inter', weight: 800, color: C.gold, align: 'right', boil: 0, alpha: b2 }); if (b2 > 0) P.rect(ctx, x0, 570, Math.max(20, w * b2), 60, 30, C.gold); G.text(ctx, '692,000', x0 + w * b2 - 20, 690, { size: 40, fam: 'Bungee', color: C.gold, align: 'right', boil: 0, alpha: clamp((b2 - 0.8) * 5) });
      P.sunDisc(ctx, x0 + w * b2 + 60, 600, 46, t, { a: b2 }); G.text(ctx, 'KM/H, PEAK (2024)', x0 + w - 20, 740, { size: 28, fam: 'Inter', weight: 700, color: C.cream, align: 'right', boil: 0, alpha: clamp((b2 - 0.8) * 5) * 0.8 }); ctx.restore(); }
    P.stamp(ctx, 'NOT THE FASTEST', 960, 300, t, ev.c2_rec + 0.15, { size: 84, color: C.coral, t1: ev.c2_parker + 0.2 });
    P.stamp(ctx, '> 10× FASTER', 1300, 860, t, ev.c2_10x, { size: 76, color: C.gold, fg: C.ink });
    P.source(ctx, 'NASA/JPL 2026; NASA (Parker, 24 Dec 2024)', t, ev.c2_rec);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S5 — the secret is time: an odometer of years that never stopped
  P.shot(ev.c2_s5, (ctx, t) => {
    P.sky(ctx, t, 'dusk', { stars: 50, seed: 59 }); P.hills(ctx, t, { y: 980, layers: 3 });
    P.big(ctx, 'speed?', 520, 300, t, ev.c2_s5 + 0.2, { size: 90, color: C.cream });
    P.cross(ctx, 360, 220, 680, 330, (t - ev.c2_secret) / 0.35, { lw: 12 });
    P.big(ctx, 'TIME.', 1340, 330, t, ev.c2_time, { size: 150, color: C.gold, fam: 'Bungee' });
    // odometer
    const yrs = 1977 + Math.floor(49 * P.eio((t - ev.c2_time) / 2.2)); const ox = 960, oy = 620; P.rect(ctx, ox - 330, oy - 90, 660, 180, 24, C.ink, { stroke: P.rgba(C.rim, 0.7), lw: 4 });
    String(yrs).split('').forEach((d, i) => { P.rect(ctx, ox - 290 + i * 150, oy - 70, 120, 140, 12, '#2A2244'); G.text(ctx, d, ox - 230 + i * 150, oy + 46, { size: 110, fam: 'Bungee', color: C.cream, align: 'center', boil: 0 }); });
    P.stamp(ctx, 'NEVER STOPPED', 960, 860, t, ev.c2_never, { size: 80, color: C.coral });
    P.voyager(ctx, ((t * 120) % 2400) - 240, 160, 0.14, t, { glint: false });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S6 — Earth · Voyager 2 · Voyager 1: the farthest thing we ever built
  P.shot(ev.c2_s6, (ctx, t) => {
    P.sky(ctx, t, 'deep', { stars: 240, seed: 61 });
    const y = 520; P.earth(ctx, 160, y, 30, t); P.line(ctx, 200, y, 1780, y, P.rgba(C.cream, 0.25), 3, 1, 1, [4, 10]);
    const v2 = P.oc((t - ev.c2_twin + 0.2) / 0.6); P.voyager(ctx, 1380, y - 40, 0.22 * v2, t, { glint: false }); if (v2 > 0) G.text(ctx, 'VOYAGER 2', 1380, y + 90, { size: 32, fam: 'Inter', weight: 800, color: C.cream, align: 'center', boil: 0, alpha: v2 });
    P.voyager(ctx, 1720, y - 40, 0.26, t, { beam: P.fin(t, ev.c2_voice, 0.4) }); G.text(ctx, 'VOYAGER 1', 1720, y + 90, { size: 32, fam: 'Inter', weight: 800, color: C.gold, align: 'center', boil: 0 });
    P.dimLine(ctx, 1400, y + 160, 1720, y + 160, 'BILLIONS OF KM', P.eio((t - ev.c2_behind) / 0.6), { size: 30 });
    P.stamp(ctx, 'THE FARTHEST THING WE EVER BUILT', 960, 260, t, ev.c2_far, { size: 64, color: C.gold, fg: C.ink, rot: -0.015 });
    P.write(ctx, 'so how does its tiny voice reach us?', 960, 880, t, ev.c2_voice - 0.3, { size: 60, color: C.cream, hl: ['voice'], hlColor: C.sig });
    Ch.echo(ctx, { x: 360, y: 1060, s: 0.6, t, gesture: 'listen', mouth: P.talk(t), look: 1 });
  }, { in: { type: 'fade', dur: 0.4 } });
})();
