// Chapter 1 — A forest of stars: the forest analogy, sight lines, the panorama filling in, the wall of starlight, the people.
(function () {
  const { U, G, Ch, P, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  // a deterministic forest (polar: distance d in "metres", angle a)
  const TREES = []; for (let i = 0; i < 1400; i++) { const d = 3 + Math.sqrt(U.hash(i, 21)) * 140, a = U.hash(i, 22) * 6.2832; TREES.push({ d, a, r: 0.35 + 0.25 * U.hash(i, 23), i }); }
  TREES.sort((p, q) => q.d - p.d); // far first (painter's order)
  const backdrop = (ctx, t) => { P.sky(ctx, t, { stars: 1, seed: 21 }); for (let i = 0; i < 9; i++) { const x = 80 + i * 230, h = 260 + 140 * U.hash(i, 5); P.tube(ctx, (c) => { c.beginPath(); c.moveTo(x, 1080); c.lineTo(x, 1080 - h); c.moveTo(x - 70, 1080 - h * 0.45); c.lineTo(x, 1080 - h); c.lineTo(x + 70, 1080 - h * 0.45); }, C.green, 4, 0.55); } };
  P.cardShot('c1', 1, 'A forest of stars', backdrop);

  // S1 — top-down: you in the middle of a forest, sight lines in every direction stop on trunks
  P.shot(ev.c1_s1, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.25, seed: 23, haze: 0.2 });
    const cx = 960, cy = 560, sc = 6.2; const grow = P.eio((t - ev.c1_forest + 0.3) / 1.4);
    for (const tr of TREES) { if (tr.d > 85) continue; const k = clamp(grow * 1.6 - tr.d / 85 * 0.6); if (k <= 0) continue; const x = cx + Math.cos(tr.a) * tr.d * sc, y = cy + Math.sin(tr.a) * tr.d * sc * 0.62;
      ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = '#0E2A1E'; ctx.beginPath(); ctx.arc(x, y, tr.r * sc * 2.2, 0, 7); ctx.fill(); ctx.restore(); P.circle(ctx, x, y, tr.r * sc * 2.2, C.green, 2, 0.75 * k, { core: false }); }
    // rays
    ev.c1_rays.forEach((t0, i) => { const k = clamp((t - t0) / 0.35); if (k <= 0) return; const an = i / 8 * 6.2832 + 0.2; let hitD = 999;
      for (const tr of TREES) { const dx = Math.cos(tr.a) * tr.d, dy = Math.sin(tr.a) * tr.d; const along = dx * Math.cos(an) + dy * Math.sin(an); if (along <= 0) continue; const perp = Math.abs(-dx * Math.sin(an) + dy * Math.cos(an)); if (perp < tr.r * 2.2 && along < hitD) hitD = along; }
      const d = Math.min(hitD, 85) * k; const ex = cx + Math.cos(an) * d * sc, ey = cy + Math.sin(an) * d * sc * 0.62;
      P.line(ctx, cx, cy, ex, ey, C.gold, 4, 0.95); if (k >= 1) { P.circle(ctx, ex, ey, 9, C.coral, 4, 1, { fill: true, fillA: 0.8 }); P.ring(ctx, ex, ey, t, t0 + 0.35, { r: 40, color: C.coral, dur: 0.5 }); } });
    const ky = P.pop(t, ev.c1_you, 0.4); if (ky > 0) { P.circle(ctx, cx, cy, 16 * ky, C.white, 5, 1, { fill: true, fillA: 0.9 }); P.tag(ctx, 'YOU', cx, cy - 64, t, ev.c1_you, 1e9, { size: 32, border: C.white }); }
    P.tag(ctx, 'every view ends on a trunk', 960, 980, t, ev.c1_trunk, 1e9, { size: 44, border: C.coral });
    P.kicker(ctx, 'The forest, from above', t, ev.c1_s1 + 0.2);
  }, { in: { type: 'fade', dur: 0.5 } });

  // eye-level panorama of the forest (180° view) up to radius R; returns coverage 0..1
  const panorama = (ctx, t, R, morph, y0 = 560, hgt = 520) => {
    const cols = new Uint8Array(480); const fov = Math.PI;
    for (const tr of TREES) { if (tr.d > R) continue; let a = ((tr.a + Math.PI) % 6.2832) - Math.PI; if (Math.abs(a) > fov / 2) continue;
      const x = W / 2 + a / (fov / 2) * (W / 2); const w = Math.max(1.2, (tr.r / tr.d) * (W / fov) * 2); const fade = clamp(1 - tr.d / 160);
      const c0 = Math.max(0, Math.floor((x - w / 2) / W * 480)), c1 = Math.min(479, Math.floor((x + w / 2) / W * 480)); for (let c = c0; c <= c1; c++) cols[c] = 1;
      if (morph < 0.5) { ctx.fillStyle = P.mix('#0B1A12', '#3FBF7F', 0.25 + 0.55 * fade); ctx.fillRect(x - w / 2, y0 - hgt / 2, w, hgt); }
      else { const sy = y0 - hgt / 2 + U.hash(tr.i, 30) * hgt, rr = Math.min(16, Math.max(1, w * 0.5)); ctx.fillStyle = P.mix('#FFB347', '#FFF6E0', fade); ctx.beginPath(); ctx.arc(x, sy, rr, 0, 7); ctx.fill(); } }
    let cov = 0; for (let c = 0; c < 480; c++) cov += cols[c]; return cov / 480;
  };
  // S2 — eye level: near trees wide, far trees thin; the forest grows until there are no gaps
  P.shot(ev.c1_s2, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.3, seed: 25, haze: 0.2 });
    const R = lerp(14, 160, P.eio((t - ev.c1_grow0) / Math.max(0.8, ev.c1_grow1 - ev.c1_grow0 + 0.6)));
    ctx.save(); ctx.fillStyle = '#04030C'; ctx.fillRect(0, 300, W, 520); ctx.restore();
    const cov = panorama(ctx, t, R, 0, 560, 520);
    P.tube(ctx, (c) => { c.beginPath(); c.rect(0, 300, W, 520); }, C.green, 3, 0.6, { core: false });
    P.callout && 0;
    P.tag(ctx, 'NEAR = WIDE', 360, 230, t, ev.c1_near, 1e9, { size: 40, border: C.green });
    P.tag(ctx, 'FAR = THIN', 1560, 230, t, ev.c1_far, 1e9, { size: 40, border: C.cyan });
    P.hbar(ctx, { x: 460, y: 900, w: 1000, h: 50, frac: cov, t, t0: ev.c1_s2 + 0.2, d: 0.01, color: C.green, label: 'view blocked by trunks', value: Math.round(cov * 100) + '%' });
    P.stamp(ctx, 'ONLY WOOD', 960, 560, t, ev.c1_wood, { size: 110, color: C.green });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S3 — swap the trees for stars: the panorama becomes a starry sky; sight lines end on star surfaces
  P.shot(ev.c1_s3, (ctx, t) => {
    P.sky(ctx, t, { stars: 0, haze: 0.35 });
    const m = P.fin(t, ev.c1_swap, 0.3); const R = lerp(40, 160, P.eio((t - ev.c1_swap) / 4));
    if (m < 1) { ctx.save(); ctx.globalAlpha = 1 - m; panorama(ctx, t, 160, 0, 540, 1000); ctx.restore(); }
    if (m > 0) { ctx.save(); ctx.globalAlpha = m; ctx.globalCompositeOperation = 'lighter'; panorama(ctx, t, R, 1, 540, 1000); ctx.restore(); }
    P.sparkle(ctx, 960, 540, t, ev.c1_swap, { n: 24, r: 420, color: C.gold });
    // sight lines from an eye at the bottom to star surfaces
    const ks = P.fin(t, ev.c1_sight, 0.6); if (ks > 0) { for (let i = 0; i < 7; i++) { const ex = 300 + i * 220, ey = 180 + 140 * U.hash(i, 31); P.line(ctx, 960, 1000, ex, ey, C.cyan, 3, 0.8, ks); if (t > ev.c1_surf) P.circle(ctx, ex, ey, 22, C.gold, 4, 1, { fill: true, fillA: 0.7 }); } P.icon(ctx, 'eye', 960, 1000, 50, { color: C.white, a: ks }); }
    P.tag(ctx, 'trees → stars', 300, 120, t, ev.c1_swap, 1e9, { size: 40, border: C.gold });
    P.tag(ctx, 'every line of sight ends on a star', 1300, 960, t, ev.c1_surf, 1e9, { size: 42, border: C.cyan });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — no black gaps: one continuous wall of starlight, day and night, as bright as the Sun's face
  P.shot(ev.c1_s4, (ctx, t) => {
    const f = P.eio((t - ev.c1_nogaps + 0.3) / 1.6);
    P.sky(ctx, t, { stars: 0, haze: 0.2 });
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 520; i++) { const x = U.hash(i, 41) * W, y = U.hash(i, 42) * H, r = lerp(4, 120, f) * (0.6 + 0.6 * U.hash(i, 43)); ctx.globalAlpha = 0.18 + 0.4 * f; ctx.fillStyle = P.mix('#FFB347', '#FFF6E0', U.hash(i, 44)); ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); }
    ctx.restore();
    const wl = P.fin(t, ev.c1_wall, 0.6); if (wl > 0) { ctx.fillStyle = `rgba(255,236,190,${0.75 * wl})`; ctx.fillRect(0, 0, W, H); }
    const ink = '#5A1E08';
    if (t > ev.c1_nogaps) P.stamp(ctx, 'NO GAPS', 960, 300, t, ev.c1_nogaps, { size: 100, color: C.magenta });
    const kd = P.pop(t, ev.c1_day, 0.35), kn = P.pop(t, ev.c1_night, 0.35);
    if (kd > 0) P.at(ctx, 700, 640, kd, 0, () => { P.circle(ctx, 0, 0, 70, '#E0602A', 8, 1, { fill: true, fillA: 0.5 }); P.text(ctx, 'DAY', 0, 160, { size: 54, fam: FT.title, weight: 400, color: ink, align: 'center' }); });
    if (kn > 0) P.at(ctx, 1220, 640, kn, 0, () => { P.tube(ctx, (c) => { c.beginPath(); c.arc(0, 0, 60, 0.6, 5.7); c.arc(30, -10, 45, 5.2, 1.1, true); c.closePath(); }, '#6A2AA0', 8, 1, { fill: true, fillA: 0.5 }); P.text(ctx, 'NIGHT', 0, 160, { size: 54, fam: FT.title, weight: 400, color: ink, align: 'center' }); });
    P.text(ctx, '= the face of the Sun, everywhere', 960, 1000, { size: 54, color: ink, align: 'center', alpha: P.fin(t, ev.c1_sun, 0.3) });
    Ch.nova(ctx, { x: 1620, y: 860, s: 0.6, t, eyes: 'closed', shades: 1, mouth: Ch.novaMouth(t, 'flat'), glow: 0 });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S5 — the people: a neon timeline 1600 → 1850 with portraits
  P.shot(ev.c1_s5, (ctx, t) => {
    P.sky(ctx, t, { stars: 0.6, seed: 27 });
    const X0 = 200, X1 = 1720, Y = 820; const yx = (yr) => X0 + (yr - 1600) / 250 * (X1 - X0);
    const k = P.fin(t, ev.c1_s5 + 0.1, 0.6); P.line(ctx, X0, Y, X1, Y, C.violet, 5, 1, ease.outCubic(k));
    for (let yr = 1600; yr <= 1850; yr += 50) { P.line(ctx, yx(yr), Y - 14, yx(yr), Y + 14, C.violet, 3, k); P.label(ctx, String(yr), yx(yr), Y + 60, { align: 'center', size: 28, alpha: k }); }
    const ppl = [['kepler', 1610, ev.c1_kepler, 'KEPLER', '1610'], ['halley', 1721, ev.c1_halley, 'HALLEY', '1720s'], ['olbers', 1823, ev.c1_olbers, 'OLBERS', '1823']];
    ppl.forEach(([who, yr, t0, name, ys], i) => { const kk = P.pop(t, t0, 0.45); if (kk <= 0) return; const x = yx(yr), y = 470 - (i === 2 ? 0 : 0); const s = (who === 'olbers' ? 1.25 : i === 2 ? 0.8 : 1.0);
      const yy = i === 2 ? 520 : 440;
      P.line(ctx, x, Y, x, yy + 170 * s, P.PEOPLE[who].color, 3, kk * 0.8);
      P.bust(ctx, who, x, yy, s * kk, kk, t);
      P.text(ctx, name, x, yy - 120 * s - 20, { size: i === 2 ? 30 : 40, fam: FT.title, weight: 400, color: P.PEOPLE[who].color, align: 'center', alpha: kk });
      P.circle(ctx, x, Y, 12, P.PEOPLE[who].color, 4, kk, { fill: true, fillA: 0.9 }); P.text(ctx, ys, x, Y - 30, { size: 30, color: C.white, align: 'center', alpha: kk }); });
    { const kc = P.pop(t, ev.c1_halley + 0.9, 0.4); if (kc > 0) { P.circle(ctx, yx(1744), Y, 10, C.green, 4, kc, { fill: true, fillA: 0.9 }); P.text(ctx, 'de Chéseaux · 1744', yx(1744) + 40, Y - 150, { size: 28, color: C.green, alpha: clamp(kc) }); P.line(ctx, yx(1744), Y, yx(1744) + 30, Y - 140, C.green, 2, kc); } }
    P.tag(ctx, 'German doctor + astronomer', yx(1823), 160, t, ev.c1_olbers + 0.4, ev.c1_paradox - 0.1, { size: 32, border: C.gold });
    P.stamp(ctx, "OLBERS' PARADOX", 960, 160, t, ev.c1_paradox, { size: 96, color: C.gold });
  }, { in: { type: 'push', dur: 0.5 } });
})();
