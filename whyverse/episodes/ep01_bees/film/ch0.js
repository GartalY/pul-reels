// Chapter 0 — cold open: the fake Einstein quote → title.
(function () {
  const { U, G, Ch, P, SCORE: S, Shots } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C, FT = P.FT;
  const W = G.W, H = G.H;
  const quote = L('c0_2');
  const QX = 260, QY = 250, QW = 1400, QH = 520;

  // night meadow backdrop (paper hills + closed flowers)
  const meadow = (ctx, t, dusk = 0) => {
    P.nightBg(ctx, t, { stars: 150 });
    ctx.save(); ctx.globalAlpha = 1;
    G.shape(ctx, [[-300, 840], [300, 760], [800, 820], [1300, 740], [1900, 800], [2300, 760], [2300, 1400], [-300, 1400]], { fill: '#2C4A57', seed: 3, hatch: { color: 'rgba(0,0,0,0.2)', gap: 9 } });
    G.shape(ctx, [[-300, 930], [500, 880], [1100, 940], [1700, 890], [2300, 920], [2300, 1400], [-300, 1400]], { fill: '#365F55', seed: 4, hatch: { color: 'rgba(0,0,0,0.2)', gap: 9 } });
    for (let i = 0; i < 9; i++) P.flower(ctx, 80 + i * 230 + U.hash(i, 3) * 60, 1010 + U.hash(i, 4) * 40, 0.7, { color: ['#E58FB0', '#B79CFF', '#F2B84B'][i % 3], open: 0.6 + dusk * 0.4, sway: 1, seed: i * 5, t });
    ctx.restore();
  };

  // --- shot A: the quote card (c0_1 .. c0_4) ---
  P.shot(0, (ctx, t, s) => {
    meadow(ctx, t);
    const up = ease.outCubic(clamp((t - ev.c0_card) / 0.7));
    const cy = lerp(H + 100, QY, up);
    ctx.save(); ctx.translate(0, cy - QY);
    G.tornPaper(ctx, QX, QY, QW, QH, { fill: C.cream, seed: 12, tear: 5 });
    G.tape(ctx, QX + 40, QY - 10, 110, 34, -0.25, 3); G.tape(ctx, QX + QW - 150, QY - 10, 110, 34, 0.22, 4);
    // the quote, word by word as it is spoken
    const words = quote.words; let x = QX + 90, y = QY + 150; const size = 88;
    for (let i = 0; i < words.length; i++) {
      const w = words[i].w.replace(/^If$/, '“If').replace(/live\.$/, 'live.”');
      const ww = G.measure(ctx, w + ' ', size, FT.hand, 700);
      if (x + ww > QX + QW - 80) { x = QX + 90; y += size * 1.2; }
      const a = clamp((t - words[i].t) / 0.18);
      const key = /four|years/.test(w);
      if (a > 0) P.at(ctx, x, y, 0.7 + 0.3 * ease.outBack(a, 2), 0, () => G.text(ctx, w, 0, 0, { size, fam: FT.hand, color: key ? C.coral : C.ink, alpha: a }));
      x += ww;
    }
    // signature
    const sg = clamp((t - ev.c0_sign) / Math.max(0.3, ev.c0_signEnd - ev.c0_sign));
    if (sg > 0) {
      const sx = QX + QW - 560, sy = QY + QH - 70;
      ctx.save(); ctx.beginPath(); ctx.rect(sx - 20, sy - 90, 540 * sg + 20, 140); ctx.clip();
      G.text(ctx, '— Albert Einstein', sx, sy, { size: 66, fam: FT.marker, weight: 400, color: C.navy }); ctx.restore();
      const cr = clamp((t - ev.c0_cross) / 0.35);
      if (cr > 0) { const pts = []; for (let i = 0; i <= 14; i++) { const u = i / 14 * cr; pts.push([sx - 10 + u * 530, sy - 22 + Math.sin(u * 40) * 16]); } G.line(ctx, pts, { color: C.red, lw: 9, seed: 5 }); }
    }
    ctx.restore();
    P.stamp(ctx, 'NEVER SAID IT', QX + QW / 2 - 120, QY + QH / 2 + 60, t, ev.sync_never, { size: 120, rot: -0.1 });
    // the bee flies in on a loop and lands on the card's top edge; she reads along
    const land = [QX + QW - 260, cy - 70];
    let bx, by, rot = 0, flap = 1, facing = 1;
    if (t < ev.c0_beeLand) {
      const u = clamp((t - 0.2) / (ev.c0_beeLand - 0.2)); const e = ease.inOutCubic(u);
      bx = lerp(-150, land[0], e) + Math.sin(u * 6.283) * 160 * (1 - u); by = lerp(300, land[1], e) - Math.sin(u * 6.283 * 1) * 140 * (1 - u);
      rot = Math.cos(u * 6.283) * 0.25 * (1 - u);
    } else { bx = land[0]; by = land[1]; flap = clamp(1 - (t - ev.c0_beeLand) / 0.3); }
    const sq = t >= ev.c0_beeLand ? 1 + 0.15 * Math.exp(-(t - ev.c0_beeLand) * 7) * Math.cos((t - ev.c0_beeLand) * 18) : 1;
    const talking = t > L('c0_1').t && t < L('c0_1').end;
    const reading = t > quote.t && t < ev.sync_never;
    const cur = quote.words.findIndex((w) => w.t > t);
    const eyes = t > ev.sync_never ? 'wide' : 'normal';
    Ch.bee(ctx, { x: bx, y: by, s: 0.95, rot, flap, facing: reading ? -1 : facing, t, sx: 1 / sq, sy: sq, eyes, look: reading ? 0.6 : 0, lookY: reading ? 0.6 : 0, mouth: talking ? P.talk(t) : t > ev.sync_never ? 'o' : 'smile' });
    if (t > ev.c0_beeIn && t < ev.c0_beeLand) for (let k = 1; k < 7; k++) { const tt = t - k * 0.07; if (tt < 0.2) break; } // (trail drawn by motes)
  }, { cam: (s) => Shots.combine(Shots.push(1.0, 1.06), Shots.shake(16, ev.sync_never - s.t0, 7))(s) });

  // --- shot B: the timeline 1955 → 1965 (c0_5) ---
  P.shot(L('c0_5').t - 0.25, (ctx, t, s) => {
    P.paperBg(ctx, '#EFE3CC');
    const pan = ease.inOutCubic(clamp((t - ev.c0_mag + 0.3) / 1.2));
    ctx.save(); ctx.translate(-pan * 620, 0);
    // ribbon
    G.line(ctx, [[150, 620], [2300, 620]], { color: C.navy, lw: 10, seed: 2 });
    for (let y = 1950; y <= 1970; y++) { const x = 420 + (y - 1955) * 124; G.line(ctx, [[x, 600], [x, 640 + (y % 5 === 0 ? 20 : 0)]], { color: C.navy, lw: y % 5 ? 4 : 7, seed: y });
      if (y % 5 === 0) G.text(ctx, String(y), x, 720, { size: 50, fam: FT.title, weight: 400, color: C.navy, align: 'center' }); }
    const k55 = P.pop(t, ev.c0_t1955);
    P.at(ctx, 420, 620, k55, 0, () => { G.ellipse(ctx, 0, 0, 30, 30, { fill: C.navy, seed: 4 }); });
    P.note(ctx, 'Einstein dies · 1955', 420, 450, t, ev.c0_t1955 + 0.1, 1e9, { size: 54, seed: 6, rot: -0.04 });
    // magazine cut-out at 1965
    const km = P.pop(t, ev.c0_mag, 0.5, 1.6);
    if (km > 0) P.at(ctx, 1660, 330, km, 0.06 - (1 - km) * 0.6, () => {
      G.tornPaper(ctx, -170, -210, 340, 440, { fill: '#FFFFFF', seed: 9 });
      G.rrect(ctx, -140, -180, 280, 70, 6, { fill: C.coral, seed: 10, lw: 3 });
      G.text(ctx, 'magazine', 0, -130, { size: 46, fam: FT.marker, weight: 400, color: '#FFF', align: 'center' });
      G.text(ctx, '1965', 0, -50, { size: 40, fam: FT.title, weight: 400, color: C.ink, align: 'center' });
      for (let i = 0; i < 6; i++) G.line(ctx, [[-130, -10 + i * 30], [130 - (i % 3) * 40, -10 + i * 30]], { color: 'rgba(42,35,32,0.35)', lw: 6, seed: 20 + i });
      Ch.bee(ctx, { x: 70, y: 150, s: 0.32, t, flap: 0, seed: 3 });
    });
    const k65 = P.pop(t, ev.c0_1965);
    P.at(ctx, 420 + 10 * 124, 620, k65, 0, () => { G.ellipse(ctx, 0, 0, 34, 34, { fill: C.coral, seed: 5 }); });
    // +10 years arc
    const arc = clamp((t - ev.c0_ten) / 0.6);
    if (arc > 0) { const pts = []; for (let i = 0; i <= 30 * arc; i++) { const u = i / 30; pts.push([420 + u * 1240, 600 - Math.sin(u * Math.PI) * 220]); } G.line(ctx, pts, { color: C.coral, lw: 8, seed: 7 });
      P.note(ctx, '+10 years', 1040, 330, t, ev.c0_ten + 0.25, 1e9, { size: 70, fill: C.gold, seed: 8, rot: 0.03 }); }
    ctx.restore();
    Ch.bee(ctx, { x: 1500 + Math.sin(t * 1.3) * 40, y: 900 + Math.cos(t * 1.7) * 20, s: 0.7, t, facing: -1, eyes: 'normal', look: 0.4, mouth: P.talk(t) });
  }, { in: { type: 'paper', dur: 0.6 }, cam: Shots.push(1.02, 1.08) });

  // --- shot C: the swarm vanishes (c0_6) ---
  const swarm = []; for (let i = 0; i < 12; i++) swarm.push({ x: 300 + U.hash(i, 1) * 1300, y: 260 + U.hash(i, 2) * 420, s: 0.35 + U.hash(i, 3) * 0.25, ph: U.hash(i, 4) * 6 });
  P.shot(ev.c0_swarm - 0.2, (ctx, t, s) => {
    P.paperBg(ctx, '#CFE7EE');
    P.ground(ctx, 860, { fill: C.green, seed: 9 });
    for (let i = 0; i < 10; i++) P.flower(ctx, 90 + i * 195, 930 + U.hash(i, 9) * 30, 0.9, { color: ['#E58FB0', '#B79CFF', '#F2B84B', '#EF7B5B'][i % 4], sway: 1, seed: 40 + i, t });
    swarm.forEach((b, i) => {
      const tv = ev.c0_vanish[i];
      if (t >= tv + 0.25) return;
      const x = b.x + Math.sin(t * 1.6 + b.ph) * 60, y = b.y + Math.cos(t * 2.1 + b.ph) * 40;
      const k = t < tv ? 1 : 1 - (t - tv) / 0.25;
      Ch.bee(ctx, { x, y, s: b.s * (t < tv ? 1 : 1 + (1 - k) * 0.6), t: t + b.ph, facing: Math.cos(t * 1.6 + b.ph) > 0 ? 1 : -1, alpha: k, seed: i + 3, eyes: t > tv - 0.2 ? 'wide' : 'normal' });
      P.sparkle(ctx, x, y, t, tv, { seed: i, r: 60 });
    });
    const q = P.pop(t, ev.c0_q, 0.5, 2);
    if (q > 0) P.at(ctx, W / 2, 470, q, Math.sin(t * 2) * 0.05, () => G.text(ctx, '?', 0, 120, { size: 360, fam: FT.title, weight: 400, color: C.coral, align: 'center', stroke: C.navyD, strokeW: 14 }));
  }, { in: { type: 'whip', dir: 'left' }, cam: Shots.push(1.0, 1.05) });

  // --- shot D: end of the world? no — the supermarket (c0_7) ---
  P.shot(L('c0_7').t - 0.2, (ctx, t, s) => {
    const sw = clamp((t - ev.c0_scratch) / 0.25);
    if (sw < 1) { // doom version
      ctx.save(); ctx.globalAlpha = 1;
      const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#5A1E2E'); g.addColorStop(1, '#E0703E'); ctx.fillStyle = g; ctx.fillRect(-300, -300, W + 600, H + 600);
      const sh = t > ev.c0_end ? Math.exp(-(t - ev.c0_end) * 5) * 14 : 0;
      P.globe(ctx, W / 2 + U.noise1(t * 30, 3) * sh, 520, 300, t, { grey: 0.25 });
      if (t > ev.c0_end) { const k = clamp((t - ev.c0_end) / 0.3); G.line(ctx, [[W / 2 - 40, 270], [W / 2 + 20, 420], [W / 2 - 50, 560], [W / 2 + 30, 720]].map(([x, y]) => [x, lerp(270, y, k)]), { color: C.ink, lw: 10, seed: 3 }); }
      P.note(ctx, 'the end of the world?', W / 2, 940, t, ev.c0_end, 1e9, { size: 64, seed: 3 });
      ctx.restore();
    }
    if (sw > 0) {
      ctx.save(); ctx.globalAlpha = sw;
      P.paperBg(ctx, '#F6EEDD');
      // a supermarket front
      G.rrect(ctx, 360, 260, 1200, 620, 10, { fill: '#FFFFFF', seed: 20, hatch: { color: 'rgba(0,0,0,0.06)', gap: 10 } });
      G.rrect(ctx, 330, 200, 1260, 120, 16, { fill: C.coral, seed: 21 });
      G.text(ctx, 'SUPERMARKET', W / 2, 285, { size: 82, fam: FT.title, weight: 400, color: '#FFF8E8', align: 'center' });
      for (let i = 0; i < 3; i++) { G.rrect(ctx, 420 + i * 380, 380, 320, 300, 8, { fill: '#BFE0F0', seed: 30 + i }); for (let j = 0; j < 4; j++) P.food(ctx, ['apple', 'melon', 'bread', 'cherry', 'pumpkin', 'rice'][(i * 2 + j) % 6], 470 + i * 380 + j * 74, 600, 0.55); }
      G.rrect(ctx, 860, 700, 200, 180, 6, { fill: '#BFE0F0', seed: 40 });
      const cx = lerp(-300, 1500, ease.outCubic(clamp((t - ev.c0_cart + 0.5) / 1.0)));
      P.at(ctx, cx, 930, 1, 0, () => { G.poly(ctx, [[-90, -110], [90, -110], [70, -20], [-70, -20]], { fill: 'rgba(255,255,255,0.6)', seed: 50, lw: 5 }); G.line(ctx, [[-90, -110], [-130, -150]], { color: C.ink, lw: 6, seed: 51 }); for (const wx of [-50, 50]) G.ellipse(ctx, wx, 0, 16, 16, { fill: C.ink, seed: 52 + wx }); });
      ctx.restore();
    }
  }, { in: { type: 'dip', color: '#1A2045' }, cam: (s) => Shots.combine(Shots.push(1.0, 1.06), Shots.shake(10, ev.c0_end - s.t0, 5))(s) });

  // --- title ---
  P.shot(ev.title0, (ctx, t, s) => {
    P.nightBg(ctx, t, { stars: 200 });
    P.planet(ctx, W / 2, 870, 70, t, { alpha: P.fin(t, ev.titleBrand, 0.4) });
    G.text(ctx, 'WHYVERSE', W / 2, 1010, { size: 40, fam: FT.title, weight: 400, color: C.gold, align: 'center', alpha: P.fin(t, ev.titleBrand + 0.15, 0.4) });
    { const u = clamp((t - ev.title0) / 3.2);
      Ch.bee(ctx, { x: lerp(-200, 1650, ease.inOutQuad(u)), y: 560 - Math.sin(u * 3.14) * 380, s: 0.8, t, rot: 0.1, eyes: 'happy', wave: u > 0.9 ? 1 : 0, armR: u > 0.9 ? 1.2 : -0.3, mouth: 'smile' }); }
    const cols = [C.gold, C.cream, C.coral, '#7CC4F2', C.gold];
    let x = 0; const sizes = ev.titleWords.map((w) => G.measure(ctx, w.w, 130, FT.title, 400) + 60); const total = sizes.slice(0, 3).reduce((a, b) => a + b, 0);
    ev.titleWords.forEach((w, i) => {
      const row = i < 3 ? 0 : 1; const rowW = row ? sizes[3] + sizes[4] : total; const start = row ? 3 : 0;
      let xx = W / 2 - rowW / 2; for (let k = start; k < i; k++) xx += sizes[k];
      const k = clamp((t - w.t) / 0.14); if (k <= 0) return;
      const sc = lerp(2.6, 1, ease.outBack(k, 1.6)), rot = (U.hash(i, 3) - 0.5) * 0.12;
      P.at(ctx, xx + sizes[i] / 2, 380 + row * 230, sc, rot, () => {
        G.tornPaper(ctx, -sizes[i] / 2 + 6, -110, sizes[i] - 12, 170, { fill: cols[i], seed: 60 + i });
        G.text(ctx, w.w, 0, 30, { size: 130, fam: FT.title, weight: 400, color: i === 1 ? C.navy : C.navyD, align: 'center', boil: 0.3 });
      });
    });
  }, { in: { type: 'iris', at: [1400, 600], color: '#1A2045' }, cam: Shots.push(1.04, 1.0) });
})();
