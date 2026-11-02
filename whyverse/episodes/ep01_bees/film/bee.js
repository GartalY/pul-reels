// Ch.bee — the Whyverse bee guide (paper cut-out, built from G.* so it boils with the rest of the film).
// Origin = body centre. o: {x, y, s, rot, facing (1 right / -1 left), t, flap (0 = wings folded, 1 = flying),
// eyes 'normal'|'happy'|'wide'|'closed'|'worried', look (-1..1), lookY, mouth (0..1 open) | 'smile'|'o'|'frown',
// armL, armR (radians, + = up), wave (0..1), pollen (0..1 dusting on the fur), basket (bool), blush, alpha, sx, sy, seed}
(function () {
  const G = globalThis.G, U = globalThis.U, Ch = globalThis.Ch;
  const GOLD = '#F5B83D', GOLD_D = '#D9962A', NAVY = '#27305C', CREAM = '#FFF8E8', CORAL = '#EF7B5B';
  Ch.BEE = { GOLD, GOLD_D, NAVY, CREAM, CORAL };
  Ch.bee = (ctx, o = {}) => {
    const { x = 0, y = 0, s = 1, rot = 0, facing = 1, t = G.t, flap = 1, eyes = 'normal', look = 0, lookY = 0,
      mouth = 'smile', armL = -0.3, armR = -0.3, wave = 0, pollen = 0, basket = false, blush = 0.5, alpha = 1, sx = 1, sy = 1, seed = 7, shadow = false } = o;
    if (alpha <= 0.01) return;
    ctx.save();
    ctx.translate(x, y);
    if (alpha < 1) ctx.globalAlpha *= alpha;
    const bob = flap > 0 ? Math.sin(t * 7.5 + seed) * 6 * flap : 0;
    ctx.translate(0, bob);
    ctx.rotate(rot);
    ctx.scale(s * sx * facing, s * sy);
    const lw = 4.5 / Math.max(0.35, s) * Math.min(1, s * 1.4);
    // wings (behind): flap fast
    const ph = Math.sin(t * 62 + seed) , wy = flap > 0 ? 0.35 + 0.65 * Math.abs(ph) * flap + (1 - flap) * 0.6 : 0.6;
    for (const [wx, wr, k] of [[-18, 0.95, 0], [8, 0.8, 1]]) {
      ctx.save(); ctx.translate(wx, -58); ctx.rotate(-0.5 + k * 0.45 - (flap ? ph * 0.12 : 0)); ctx.scale(1, wy);
      G.ellipse(ctx, 0, -46 * wr, 30 * wr, 52 * wr, { fill: 'rgba(225,240,255,0.78)', stroke: NAVY, lw: lw * 0.8, seed: seed + 3 + k, amp: 1.1 });
      G.line(ctx, [[0, -10], [0, -80 * wr]], { color: 'rgba(39,48,92,0.35)', lw: 2.2, seed: seed + 9 + k });
      ctx.restore();
    }
    // stinger
    G.poly(ctx, [[-92, 4], [-122, 12], [-90, 20]], { fill: NAVY, stroke: NAVY, lw: lw * 0.7, seed: seed + 4 });
    // legs (little dangling)
    for (let i = 0; i < 3; i++) {
      const lx = -40 + i * 26, sw = Math.sin(t * 5 + i * 1.7 + seed) * 5 * flap;
      G.line(ctx, [[lx, 44], [lx - 6 + sw, 66], [lx - 12 + sw, 72]], { color: NAVY, lw: 5, seed: seed + 20 + i });
      if (pollen > 0.05 && i === 2) G.ellipse(ctx, lx - 8 + sw, 64, 9 * pollen + 3, 7 * pollen + 3, { fill: '#FFC93C', stroke: GOLD_D, lw: 2.5, seed: seed + 26 });
    }
    // body
    ctx.save();
    const body = G.ellipse(ctx, -24, 12, 74, 56, { fill: GOLD, stroke: NAVY, lw, seed: seed + 1, hatch: { color: 'rgba(160,90,20,0.22)', gap: 8 } });
    ctx.beginPath(); G.path(ctx, body, true); ctx.clip();
    for (let i = 0; i < 3; i++) { const sxp = -64 + i * 34; G.poly(ctx, [[sxp, -60], [sxp + 16, -60], [sxp + 10, 80], [sxp - 6, 80]], { fill: NAVY, stroke: null, lw: 0, seed: seed + 30 + i, amp: 1 }); }
    // fuzz highlight
    ctx.fillStyle = 'rgba(255,255,255,0.22)'; ctx.beginPath(); ctx.ellipse(-30, -18, 46, 14, -0.1, 0, 7); ctx.fill();
    ctx.restore();
    G.shape(ctx, body, { stroke: NAVY, lw, seed: seed + 1, amp: 0.2, second: false });
    // pollen dusting on the fur
    if (pollen > 0.02) {
      for (let i = 0; i < 22; i++) {
        if (U.hash(i, seed, 5) > pollen) continue;
        const a = U.hash(i, seed, 1) * 6.283, r = 0.55 + 0.4 * U.hash(i, seed, 2);
        ctx.fillStyle = i % 3 ? '#FFD25A' : '#FFE9A0'; ctx.beginPath(); ctx.arc(-24 + Math.cos(a) * 70 * r, 12 + Math.sin(a) * 52 * r, 4 + 3 * U.hash(i, 9), 0, 7); ctx.fill();
      }
    }
    // arms
    const arm = (side, ang, wv) => {
      const sxp = side < 0 ? 6 : 26, sy0 = 26;
      const a = ang + (wv > 0 ? Math.sin(t * 12) * 0.5 * wv : 0);
      const ex = sxp + Math.cos(-a) * 30 * (side < 0 ? -1 : 1) * -1, ey = sy0 + Math.sin(-a) * 30;
      const hx = ex + Math.cos(-a * 1.2) * 18 * (side < 0 ? -1 : 1) * -1, hy = ey + Math.sin(-a * 1.2) * 18;
      G.line(ctx, [[sxp, sy0], [ex, ey], [hx, hy]], { color: NAVY, lw: 6, seed: seed + 40 + side });
      G.ellipse(ctx, hx, hy, 7, 7, { fill: NAVY, stroke: NAVY, lw: 2, seed: seed + 44 + side });
      return [hx, hy];
    };
    arm(-1, armL, 0);
    const hR = arm(1, armR, wave);
    if (basket) {
      ctx.save(); ctx.translate(hR[0] + 4, hR[1] + 8);
      G.line(ctx, [[-14, 0], [-10, -22], [10, -22], [14, 0]], { color: '#8E6444', lw: 4, seed: seed + 50 });
      G.poly(ctx, [[-20, 0], [20, 0], [15, 24], [-15, 24]], { fill: '#C9955E', stroke: NAVY, lw: 3.5, seed: seed + 51, hatch: { color: 'rgba(90,50,20,0.35)', gap: 5, angle: 0.8 } });
      if (pollen > 0.3) G.ellipse(ctx, 0, -2, 13, 7, { fill: '#FFC93C', stroke: GOLD_D, lw: 2, seed: seed + 52 });
      ctx.restore();
    }
    // head
    const hx = 58, hy = -14;
    // antennae
    for (const [ax, k] of [[-14, 0], [16, 1]]) {
      const sw = Math.sin(t * 4 + k * 2 + seed) * 4;
      G.line(ctx, [[hx + ax * 0.6, hy - 42], [hx + ax + sw, hy - 82], [hx + ax * 1.6 + sw, hy - 96]], { color: NAVY, lw: 4.5, seed: seed + 60 + k });
      G.ellipse(ctx, hx + ax * 1.6 + sw, hy - 98, 8, 8, { fill: NAVY, stroke: NAVY, lw: 2, seed: seed + 62 + k });
    }
    G.ellipse(ctx, hx, hy, 50, 48, { fill: GOLD, stroke: NAVY, lw, seed: seed + 2, hatch: { color: 'rgba(160,90,20,0.18)', gap: 8 } });
    // face (drawn un-mirrored so it reads the same both ways)
    ctx.save(); ctx.translate(hx, hy); if (facing < 0) ctx.scale(-1, 1);
    const ex = [-17, 17], lx = look * 6 * facing, ly = lookY * 5;
    for (let i = 0; i < 2; i++) {
      const cx = ex[i] + 6 * facing * (facing < 0 ? -1 : 1) * 0, cy = -6;
      if (eyes === 'happy') { G.line(ctx, [[cx - 9, cy + 3], [cx, cy - 6], [cx + 9, cy + 3]], { color: NAVY, lw: 5, seed: seed + 70 + i }); continue; }
      if (eyes === 'closed') { G.line(ctx, [[cx - 9, cy], [cx, cy + 5], [cx + 9, cy]], { color: NAVY, lw: 5, seed: seed + 70 + i }); continue; }
      const r = eyes === 'wide' ? 15 : 12.5;
      G.ellipse(ctx, cx, cy, r, r * 1.1, { fill: '#FFFFFF', stroke: NAVY, lw: 3, seed: seed + 72 + i, amp: 0.6 });
      ctx.fillStyle = NAVY; ctx.beginPath(); ctx.arc(cx + lx, cy + ly + 1, eyes === 'wide' ? 6 : 7, 0, 7); ctx.fill();
      ctx.fillStyle = '#FFFFFF'; ctx.beginPath(); ctx.arc(cx + lx + 2.5, cy + ly - 2.5, 2.4, 0, 7); ctx.fill();
      if (eyes === 'worried') G.line(ctx, [[cx - 12, cy - 19 + (i ? 0 : 5)], [cx + 12, cy - 19 + (i ? 5 : 0)]], { color: NAVY, lw: 4, seed: seed + 76 + i });
    }
    if (blush > 0) { ctx.fillStyle = `rgba(239,123,91,${0.45 * blush})`; for (const bx of [-30, 30]) { ctx.beginPath(); ctx.ellipse(bx, 12, 9, 6, 0, 0, 7); ctx.fill(); } }
    // mouth
    const my = 18;
    if (typeof mouth === 'number') {
      const op = U.clamp(mouth);
      if (op < 0.08) G.line(ctx, [[-9, my], [0, my + 5], [9, my]], { color: NAVY, lw: 4, seed: seed + 80 });
      else { ctx.fillStyle = '#7A2E2E'; ctx.strokeStyle = NAVY; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.ellipse(0, my + 2, 8 + 3 * op, 3 + 9 * op, 0, 0, 7); ctx.fill(); ctx.stroke(); }
    } else if (mouth === 'o') { ctx.fillStyle = '#7A2E2E'; ctx.strokeStyle = NAVY; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.ellipse(0, my + 3, 7, 9, 0, 0, 7); ctx.fill(); ctx.stroke(); }
    else if (mouth === 'frown') G.line(ctx, [[-10, my + 6], [0, my], [10, my + 6]], { color: NAVY, lw: 4, seed: seed + 81 });
    else G.line(ctx, [[-11, my], [0, my + 8], [11, my]], { color: NAVY, lw: 4.5, seed: seed + 82 });
    ctx.restore();
    ctx.restore();
  };
})();
