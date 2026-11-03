// Whyverse ep01 prop library: paper cut-out icons, cards, stamps, counters. Pure functions of their args + t.
(function () {
  const G = globalThis.G, U = globalThis.U, Data = globalThis.Data;
  const { clamp, lerp, ease } = U;
  const P = {};
  const C = P.C = {
    navy: '#27305C', navyD: '#1A2045', night: '#141a3d', gold: '#F2B84B', coral: '#EF7B5B', planet: '#4FA3E0',
    paper: '#F4EDE0', cream: '#FFF8E8', ink: '#2A2320', red: '#D9463B', green: '#5DA35E', greenD: '#3E7F45',
    leaf: '#6DB36A', pink: '#F2A0B5', blossom: '#FBE3EA', sky: '#BFE0F0', sand: '#E9D3A6', grey: '#B9B3A8', brown: '#9A6B44',
  };
  P.FT = { title: 'Bungee', hand: 'Caveat', label: 'Patrick Hand', marker: 'Permanent Marker', ui: '"Inter", system-ui, sans-serif' };
  const pop = P.pop = (t, t0, d = 0.32, s = 2.2) => (t < t0 ? 0 : ease.outBack(clamp((t - t0) / d), s));
  const fin = P.fin = (t, t0, d = 0.3) => clamp((t - t0) / d);
  const fout = P.fout = (t, t1, d = 0.3) => 1 - clamp((t - (t1 - d)) / d);
  P.win = (t, t0, t1, d = 0.3) => Math.min(fin(t, t0, d), fout(t, t1, d));
  P.at = (ctx, x, y, s, rot, fn) => { ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot); if (s !== 1) ctx.scale(s, s); fn(); ctx.restore(); };

  // backgrounds -----------------------------------------------------------------------------------------
  P.paperBg = (ctx, color = C.paper) => { ctx.fillStyle = color; ctx.fillRect(-400, -400, G.W + 800, G.H + 800); };
  P.nightBg = (ctx, t, { stars = 160, top = C.navyD, bottom = '#2E2A5C' } = {}) => {
    const g = ctx.createLinearGradient(0, 0, 0, G.H); g.addColorStop(0, top); g.addColorStop(1, bottom);
    ctx.fillStyle = g; ctx.fillRect(-400, -400, G.W + 800, G.H + 800);
    for (let i = 0; i < stars; i++) {
      const x = U.hash(i, 1) * (G.W + 400) - 200, y = U.hash(i, 2) * (G.H + 200) - 100, r = 1 + 2.6 * Math.pow(U.hash(i, 3), 5);
      ctx.globalAlpha = (0.3 + 0.7 * U.hash(i, 5)) * (0.6 + 0.4 * Math.sin(t * (1 + U.hash(i, 4) * 2.5) + i));
      ctx.fillStyle = '#FFF4D6'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
  };
  // drifting paper dots / pollen in the air
  P.motes = (ctx, t, { n = 26, color = 'rgba(242,184,75,0.55)', seed = 3, speed = 18 } = {}) => {
    for (let i = 0; i < n; i++) {
      const x = ((U.hash(i, seed) * (G.W + 200) + t * speed * (0.5 + U.hash(i, seed + 1))) % (G.W + 200)) - 100;
      const y = U.hash(i, seed + 2) * G.H + Math.sin(t * 0.8 + i) * 14;
      ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, 2.5 + 3 * U.hash(i, seed + 3), 0, 7); ctx.fill();
    }
  };
  P.ground = (ctx, y, { fill = C.green, seed = 4, hill = 18 } = {}) => {
    const pts = []; for (let x = -300; x <= G.W + 300; x += 60) pts.push([x, y + Math.sin(x * 0.004 + seed) * hill]);
    pts.push([G.W + 300, G.H + 300], [-300, G.H + 300]);
    G.shape(ctx, pts, { fill, seed, hatch: { color: 'rgba(30,60,30,0.2)', gap: 9 } });
  };

  // text ------------------------------------------------------------------------------------------------
  P.text = (ctx, s, x, y, o = {}) => G.text(ctx, s, x, y, Object.assign({ size: 54, fam: P.FT.hand, weight: 700, color: C.ink }, o));
  // a torn paper note with a word/phrase, pops in at t0 (and fades by t1)
  P.note = (ctx, s, x, y, t, t0, t1 = 1e9, { size = 48, fill = C.cream, color = C.ink, rot = -0.03, fam = P.FT.hand, seed = 5, tape = true, pad = 26, align = 'center' } = {}) => {
    const k = pop(t, t0) * fout(t, t1, 0.25); if (k <= 0.01) return;
    const w = G.measure(ctx, s, size, fam, 700) + pad * 2, h = size * 1.35 + pad * 0.6;
    const ox = align === 'left' ? w / 2 : align === 'right' ? -w / 2 : 0;
    ctx.save(); ctx.translate(x + ox, y); ctx.rotate(rot); ctx.scale(k, k); if (k < 1) ctx.globalAlpha *= clamp(k * 1.5);
    G.tornPaper(ctx, -w / 2, -h / 2, w, h, { fill, seed, tear: 3 });
    if (tape) G.tape(ctx, -w / 2 + 14, -h / 2 - 6, 54, 20, -0.3, seed);
    G.text(ctx, s, 0, size * 0.36, { size, fam, weight: 700, color, align: 'center' });
    ctx.restore();
  };
  // a rubber stamp that slams down at t0
  P.stamp = (ctx, s, x, y, t, t0, { size = 92, color = C.red, rot = -0.12, t1 = 1e9, fam = P.FT.title } = {}) => {
    if (t < t0) return; const a = clamp((t - t0) / 0.14), k = lerp(2.4, 1, ease.outCubic(a)) * fout(t, t1, 0.3);
    if (k <= 0.01) return;
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k); ctx.globalAlpha *= clamp(a * 2) * 0.92;
    const w = G.measure(ctx, s, size, fam, 400) + 60, h = size * 1.35;
    ctx.strokeStyle = color; ctx.lineWidth = 9; ctx.setLineDash([]);
    G.rrect(ctx, -w / 2, -h / 2, w, h, 16, { stroke: color, lw: 9, seed: 31, amp: 2.2 });
    G.text(ctx, s, 0, size * 0.36, { size, fam, weight: 400, color, align: 'center', boil: 0.6 });
    ctx.restore();
  };
  // big counter in Bungee on a torn card
  P.counter = (ctx, { x, y, from = 0, to, t, t0, t1, size = 120, color = C.navy, prefix = '', suffix = '', decimals = 0, card = C.cream, rot = 0, seed = 8, sub = '', subSize = 40, alpha = 1 }) => {
    const k = pop(t, t0 - 0.25, 0.35); if (k <= 0.01 || alpha <= 0) return;
    const v = Data.count(t, t0, t1, from, to, ease.outCubic);
    const str = prefix + Data.number(v, { decimals }) + suffix, strF = prefix + Data.number(to, { decimals }) + suffix;
    const land = t >= t1 ? Math.exp(-(t - t1) * 8) : 0;
    const w = G.measure(ctx, strF, size, P.FT.title, 400) + 80, h = size * 1.3 + (sub ? subSize * 1.3 : 0);
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k * (1 + 0.08 * land), k * (1 + 0.08 * land)); ctx.globalAlpha *= alpha;
    if (card) G.tornPaper(ctx, -w / 2, -size * 0.95, w, h, { fill: card, seed, tear: 3 });
    G.text(ctx, str, 0, size * 0.2, { size, fam: P.FT.title, weight: 400, color, align: 'center', boil: 0 });
    if (sub) G.text(ctx, sub, 0, size * 0.2 + subSize * 1.15, { size: subSize, fam: P.FT.label, weight: 400, color: C.ink, align: 'center' });
    ctx.restore();
  };
  // chapter card: navy torn banner with number disc + title; enters at t0, leaves at t1
  P.chapter = (ctx, t, n, title, t0, t1) => {
    const a = clamp((t - t0) / 0.5), b = clamp((t - (t1 - 0.45)) / 0.45);
    if (a <= 0 || b >= 1) return;
    const x = lerp(-G.W, 0, ease.outCubic(a)) + lerp(0, G.W * 1.2, ease.inCubic(b));
    ctx.save(); ctx.translate(x, 0);
    G.tornPaper(ctx, 120, G.H / 2 - 150, G.W - 240, 300, { fill: C.navy, seed: 40 + n, edge: '#FFF8E8', tear: 6 });
    const d = pop(t, t0 + 0.25, 0.4);
    P.at(ctx, 330, G.H / 2, d, 0, () => { G.ellipse(ctx, 0, 0, 92, 92, { fill: C.gold, stroke: C.navyD, lw: 6, seed: 50 + n, hatch: { color: 'rgba(150,80,10,0.25)', gap: 8 } });
      G.text(ctx, String(n), 0, 44, { size: 120, fam: P.FT.title, weight: 400, color: C.navyD, align: 'center', boil: 0.3 }); });
    const ws = title.split(' '); let xx = 480; const fs = Math.min(96, 96 * (G.W - 240 - 480 - 60) / G.measure(ctx, title, 96, P.FT.title, 400));
    ws.forEach((w, i) => { const k = pop(t, t0 + 0.35 + i * 0.09, 0.3); const ww = G.measure(ctx, w + ' ', fs, P.FT.title, 400);
      if (k > 0) P.at(ctx, xx, G.H / 2 + fs * 0.37, k, 0, () => G.text(ctx, w, 0, 0, { size: fs, fam: P.FT.title, weight: 400, color: i % 2 ? C.gold : '#FFF8E8', boil: 0.3 })); xx += ww; });
    ctx.restore();
  };

  // nature ----------------------------------------------------------------------------------------------
  P.flower = (ctx, x, y, s, { color = C.pink, center = C.gold, open = 1, sway = 0, stem = 150, seed = 1, petals = 6, t = G.t, droop = 0 } = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    const sw = Math.sin(t * 1.4 + seed) * 6 * sway; const hx = sw + droop * 40, hy = -stem + droop * 50;
    G.line(ctx, [[0, 0], [sw * 0.4, -stem * 0.5], [hx, hy]], { color: C.greenD, lw: 8, seed: seed + 1 });
    G.ellipse(ctx, sw * 0.2 + 22, -stem * 0.4, 26, 11, { fill: C.leaf, seed: seed + 2, lw: 3 });
    if (open > 0.02) {
      ctx.save(); ctx.translate(hx, hy); ctx.rotate(droop * 0.9);
      for (let i = 0; i < petals; i++) { const a = (i / petals) * 6.283 + seed; const r = 38 * open;
        G.ellipse(ctx, Math.cos(a) * r, Math.sin(a) * r, 30 * open, 22 * open, { fill: color, seed: seed + 10 + i, lw: 3.5, hatch: { color: 'rgba(120,30,60,0.15)', gap: 7 } }); }
      G.ellipse(ctx, 0, 0, 24 * Math.max(0.4, open), 24 * Math.max(0.4, open), { fill: center, seed: seed + 30, lw: 3.5, hatch: { color: 'rgba(150,80,10,0.3)', gap: 5 } });
      ctx.restore();
    }
    ctx.restore();
    return [x + hx * s, y + hy * s];
  };
  P.tree = (ctx, x, y, s, { blossom = C.blossom, crown = C.leaf, n = 18, bloom = 1, seed = 1, fruit = 0, fruitColor = C.red, bare = 0 } = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    G.poly(ctx, [[-18, 0], [18, 0], [12, -150], [-12, -150]], { fill: C.brown, seed: seed + 1, hatch: { color: 'rgba(60,30,10,0.3)', gap: 6 } });
    G.line(ctx, [[0, -120], [-50, -175]], { color: C.brown, lw: 12, seed: seed + 2 }); G.line(ctx, [[0, -130], [55, -180]], { color: C.brown, lw: 12, seed: seed + 3 });
    if (bare < 1) {
      ctx.save(); ctx.globalAlpha *= 1 - bare;
      const blobs = [[0, -230, 120, 90], [-80, -190, 80, 64], [85, -195, 82, 64]];
      blobs.forEach((b, i) => G.ellipse(ctx, b[0], b[1], b[2], b[3], { fill: crown, seed: seed + 5 + i, hatch: { color: 'rgba(20,60,20,0.2)', gap: 9 } }));
      ctx.restore();
    }
    for (let i = 0; i < n; i++) {
      const k = clamp(bloom * n - i); if (k <= 0) continue;
      const a = U.hash(i, seed) * 6.283, r = Math.sqrt(U.hash(i, seed + 1));
      const bx = Math.cos(a) * 140 * r, by = -205 + Math.sin(a) * 85 * r;
      if (fruit > U.hash(i, seed + 4)) G.ellipse(ctx, bx, by, 15, 15, { fill: fruitColor, seed: seed + 40 + i, lw: 3 });
      else { ctx.fillStyle = blossom; ctx.strokeStyle = 'rgba(160,60,90,0.6)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(bx, by, 9 * k, 0, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(bx, by, 3 * k, 0, 7); ctx.fill(); }
    }
    ctx.restore();
  };

  // food icons (size ~ r=60 at s=1) ---------------------------------------------------------------------
  P.food = (ctx, kind, x, y, s = 1, o = {}) => {
    const seed = o.seed || (kind.length * 7 + 3); const grey = o.grey || 0;
    const col = (c) => (grey > 0 ? mix(c, '#C9C2B6', grey) : c);
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); if (o.rot) ctx.rotate(o.rot);
    const E = (cx, cy, rx, ry, f, k = 0, h) => G.ellipse(ctx, cx, cy, rx, ry, { fill: col(f), seed: seed + k, lw: 4, hatch: h === false ? undefined : { color: 'rgba(0,0,0,0.14)', gap: 7 } });
    const Pl = (pts, f, k = 0) => G.poly(ctx, pts, { fill: col(f), seed: seed + k, lw: 4, hatch: { color: 'rgba(0,0,0,0.14)', gap: 7 } });
    switch (kind) {
      case 'apple': E(0, 6, 54, 50, '#D9463B'); G.line(ctx, [[0, -40], [6, -62]], { color: C.brown, lw: 6, seed }); E(22, -52, 18, 9, C.leaf, 2, false); break;
      case 'pear': E(0, 18, 50, 44, '#B5C84A'); E(0, -22, 30, 32, '#B5C84A', 1); G.line(ctx, [[0, -50], [4, -70]], { color: C.brown, lw: 6, seed }); break;
      case 'cherry': G.line(ctx, [[-22, 10], [0, -50], [24, 14]], { color: C.greenD, lw: 5, seed }); E(-26, 26, 26, 26, '#B8213A', 1); E(26, 30, 26, 26, '#C8283F', 2); break;
      case 'melon': E(0, 0, 62, 50, '#9CC46A'); for (let i = -2; i <= 2; i++) G.line(ctx, [[i * 20, -46], [i * 24, 0], [i * 20, 46]], { color: col('#5E8F3A'), lw: 4, seed: seed + i }); break;
      case 'blueberry': for (const [bx, by, k] of [[-28, 14, 0], [24, 18, 1], [0, -18, 2]]) { E(bx, by, 27, 27, '#4E5FA8', k); G.line(ctx, [[bx - 6, by - 20], [bx, by - 26], [bx + 6, by - 20]], { color: C.navyD, lw: 3, seed: seed + k }); } break;
      case 'pumpkin': E(-26, 6, 34, 46, '#E8862E', 0); E(26, 6, 34, 46, '#E8862E', 1); E(0, 6, 30, 50, '#F0973A', 2); G.line(ctx, [[0, -42], [6, -62]], { color: C.greenD, lw: 8, seed }); break;
      case 'cucumber': E(0, 0, 70, 24, '#5E9B48', 0); for (let i = 0; i < 5; i++) { ctx.fillStyle = col('#C9E39A'); ctx.beginPath(); ctx.arc(-44 + i * 22, -6 + (i % 2) * 10, 3, 0, 7); ctx.fill(); } break;
      case 'carrot': Pl([[-16, -36], [16, -36], [2, 66], [-2, 66]], '#EE8A2D'); for (const a of [-0.4, 0, 0.4]) G.line(ctx, [[0, -36], [Math.sin(a) * 30, -70]], { color: C.greenD, lw: 6, seed: seed + a * 10 }); break;
      case 'onion': E(0, 10, 46, 44, '#C07BA0'); Pl([[-10, -30], [10, -30], [0, -64]], '#C07BA0', 2); break;
      case 'almond': E(0, 0, 34, 52, '#C68A55'); G.line(ctx, [[-10, -30], [-4, 0], [-10, 30]], { color: col('#8E5B32'), lw: 3, seed }); G.line(ctx, [[10, -30], [14, 4], [8, 32]], { color: col('#8E5B32'), lw: 3, seed: seed + 1 }); break;
      case 'coffee': Pl([[-44, -30], [44, -30], [34, 46], [-34, 46]], '#F6F0E2'); E(0, -30, 44, 10, '#6B3E26', 1, false); G.line(ctx, [[44, -14], [66, -6], [60, 18], [38, 22]], { color: C.ink, lw: 6, seed }); break;
      case 'bread': E(0, 6, 66, 40, '#D9A25A'); for (let i = -1; i <= 1; i++) G.line(ctx, [[i * 26 - 10, -14], [i * 26 + 10, 8]], { color: col('#9A6B30'), lw: 5, seed: seed + i }); break;
      case 'rice': Pl([[-50, -10], [50, -10], [36, 46], [-36, 46]], '#F4F1EA'); for (let i = 0; i < 9; i++) E(-36 + (i % 5) * 18, -18 - Math.floor(i / 5) * 12, 8, 5, '#FFFFFF', 10 + i, false); break;
      case 'pasta': for (let i = 0; i < 3; i++) Pl([[-40 + i * 30, -40], [-20 + i * 30, -40], [-26 + i * 30, 50], [-34 + i * 30, 50]], '#EFC35A', i); break;
      case 'corn': E(0, 0, 30, 62, '#F2C43D'); for (let i = 0; i < 4; i++) G.line(ctx, [[-22, -40 + i * 26], [22, -40 + i * 26]], { color: col('#C99A2A'), lw: 3, seed: seed + i }); Pl([[-30, 40], [0, 70], [-40, -10]], C.leaf, 5); break;
      case 'chocolate': Pl([[-56, -38], [56, -38], [56, 38], [-56, 38]], '#6B3A22'); for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) G.rrect(ctx, -48 + j * 34, -30 + i * 32, 28, 26, 4, { fill: col('#7E4A2C'), seed: seed + i * 3 + j, lw: 2.5 }); break;
      case 'plum': E(0, 6, 46, 50, '#7A3D8C'); G.line(ctx, [[0, -42], [2, -60]], { color: C.brown, lw: 5, seed }); break;
      case 'walnut': E(0, 0, 50, 44, '#B98A5E'); G.line(ctx, [[0, -44], [0, 44]], { color: col('#7A5532'), lw: 4, seed }); for (let i = 0; i < 3; i++) G.line(ctx, [[-36, -20 + i * 20], [-14, -12 + i * 20]], { color: col('#7A5532'), lw: 3, seed: seed + i }); break;
      case 'loquat': for (const [bx, by, k] of [[-24, 12, 0], [22, 16, 1], [0, -18, 2]]) E(bx, by, 26, 30, '#F2A33D', k); break;
      case 'honey': Pl([[-40, -40], [40, -40], [44, 56], [-44, 56]], '#F2B84B'); G.rrect(ctx, -46, -62, 92, 26, 6, { fill: col('#E7D6BC'), seed: seed + 1, lw: 4 }); break;
      case 'cacao': E(0, 0, 36, 64, '#D9822B'); for (let i = -1; i <= 1; i++) G.line(ctx, [[i * 16, -58], [i * 20, 0], [i * 16, 58]], { color: col('#A65A1A'), lw: 3, seed: seed + i }); break;
      default: E(0, 0, 50, 50, '#ccc');
    }
    ctx.restore();
  };
  const mix = P.mix = (a, b, k) => { const pa = hex(a), pb = hex(b); if (!pa || !pb) return a; const f = (i) => Math.round(pa[i] + (pb[i] - pa[i]) * k); return `rgb(${f(0)},${f(1)},${f(2)})`; };
  const hex = (c) => { const m = /^#([0-9a-f]{6})$/i.exec(String(c)); if (!m) return null; const n = parseInt(m[1], 16); return [n >> 16, (n >> 8) & 255, n & 255]; };

  // objects --------------------------------------------------------------------------------------------
  P.hive = (ctx, x, y, s = 1, { seed = 2, color = '#F2E3B8' } = {}) => {
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    G.rrect(ctx, -50, -70, 100, 70, 4, { fill: color, seed, lw: 4, hatch: { color: 'rgba(120,80,20,0.2)', gap: 8 } });
    G.rrect(ctx, -56, -84, 112, 16, 3, { fill: '#E07B4F', seed: seed + 1, lw: 4 });
    G.line(ctx, [[-46, -36], [46, -36]], { color: 'rgba(42,35,32,0.5)', lw: 3, seed: seed + 2 });
    ctx.fillStyle = C.ink; ctx.fillRect(-16, -10, 32, 6);
    ctx.restore();
  };
  P.truck = (ctx, x, y, s = 1, { seed = 3, color = '#E07B4F', hives = 6, t = G.t, moving = 1 } = {}) => {
    ctx.save(); ctx.translate(x, y + (moving ? Math.sin(t * 22 + seed) * 1.5 : 0)); ctx.scale(s, s);
    G.rrect(ctx, -170, -64, 250, 22, 3, { fill: '#8E8A84', seed: seed + 9, lw: 4 });
    for (let i = 0; i < hives; i++) { const c = i % 3, r = Math.floor(i / 3); P.hive(ctx, -140 + c * 78, -64 - r * 62, 0.68, { seed: seed + i, color: ['#F2E3B8', '#BFE0F0', '#F2C9C0'][i % 3] }); }
    G.rrect(ctx, 80, -130, 100, 88, 14, { fill: color, seed: seed + 1, lw: 4, hatch: { color: 'rgba(0,0,0,0.15)', gap: 8 } });
    G.rrect(ctx, 120, -118, 46, 34, 6, { fill: C.sky, seed: seed + 2, lw: 3.5 });
    for (const wx of [-120, 30, 140]) { const sp = (t * 6 * moving) % 6.283; G.ellipse(ctx, wx, -34, 24, 24, { fill: '#3A3634', seed: seed + 3 + wx, lw: 4 }); ctx.strokeStyle = '#BDB6AC'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(wx, -34); ctx.lineTo(wx + Math.cos(sp) * 14, -34 + Math.sin(sp) * 14); ctx.stroke(); }
    ctx.restore();
  };
  // a little paper "person" token for crowds and grids
  P.token = (ctx, x, y, s = 1, { color = C.navy, alpha = 1, seed = 1, head = '#E6B48C' } = {}) => {
    if (alpha <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= alpha;
    G.rrect(ctx, -22, -40, 44, 50, 18, { fill: color, seed, lw: 3.5, amp: 1 });
    G.ellipse(ctx, 0, -58, 17, 17, { fill: head, seed: seed + 1, lw: 3.5, amp: 0.8 });
    ctx.restore();
  };
  P.globe = (ctx, x, y, r, t, { spin = 0.25, alpha = 1, seed = 4, grey = 0 } = {}) => {
    ctx.save(); ctx.globalAlpha *= alpha;
    const g = ctx.createRadialGradient(x, y, r * 0.9, x, y, r * 1.25); g.addColorStop(0, 'rgba(120,190,255,0.35)'); g.addColorStop(1, 'rgba(120,190,255,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.25, 0, 7); ctx.fill();
    const disc = G.ellipse(ctx, x, y, r, r, { fill: grey ? mix('#3B8FD6', '#9BA0A8', grey) : '#3B8FD6', seed, lw: 5 });
    ctx.save(); ctx.beginPath(); G.path(ctx, disc, true); ctx.clip();
    for (let k = 0; k < 6; k++) { const cx = x - r + (((U.hash(k, 9) * 2.6 * r + t * spin * r) % (2.6 * r)) + 2.6 * r) % (2.6 * r) - 0.3 * r, cy = y + (U.hash(k, 8) - 0.5) * 1.3 * r;
      G.ellipse(ctx, cx, cy, r * (0.2 + 0.2 * U.hash(k, 3)), r * (0.14 + 0.16 * U.hash(k, 4)), { fill: grey ? mix(C.green, '#A9A9A0', grey) : C.green, seed: seed + k, lw: 3, amp: 2.5 }); }
    ctx.fillStyle = 'rgba(10,20,60,0.25)'; ctx.beginPath(); ctx.arc(x + r * 0.35, y + r * 0.3, r, 0, 7); ctx.fill();
    ctx.restore();
    G.shape(ctx, disc, { stroke: C.ink, lw: 5, seed, amp: 0.2, second: false });
    ctx.restore();
  };
  // the Whyverse planet mark (blue ringed planet)
  P.planet = (ctx, x, y, r, t, { alpha = 1 } = {}) => {
    ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, y); ctx.rotate(-0.35);
    const ring = (front) => { ctx.save(); ctx.beginPath(); if (front) ctx.rect(-r * 2.2, 0, r * 4.4, r * 2); else ctx.rect(-r * 2.2, -r * 2, r * 4.4, r * 2); ctx.clip();
      ctx.strokeStyle = C.gold; ctx.lineWidth = r * 0.16; ctx.beginPath(); ctx.ellipse(0, 0, r * 1.75, r * 0.45, 0, 0, 7); ctx.stroke();
      ctx.strokeStyle = C.coral; ctx.lineWidth = r * 0.06; ctx.beginPath(); ctx.ellipse(0, 0, r * 1.98, r * 0.53, 0, 0, 7); ctx.stroke(); ctx.restore(); };
    ring(false);
    const g = ctx.createLinearGradient(-r, -r, r, r); g.addColorStop(0, '#7CC4F2'); g.addColorStop(1, '#2F6FB8');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, r, 0, 7); ctx.fill();
    ctx.strokeStyle = C.navyD; ctx.lineWidth = Math.max(3, r * 0.05); ctx.stroke();
    ring(true);
    ctx.restore();
  };
  // a simple horizontal bar with label + value that grows from t0
  P.hbar = (ctx, { x, y, w, h = 60, frac, t, t0, d = 0.8, color = C.coral, label = '', value = '', labelSize = 44, track = 'rgba(42,35,32,0.08)', seed = 3 }) => {
    const k = ease.outCubic(clamp((t - t0) / d)); const a = fin(t, t0 - 0.2, 0.3); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha *= a;
    G.rrect(ctx, x, y, w, h, h / 2, { fill: track, stroke: 'rgba(42,35,32,0.25)', lw: 3, seed });
    if (k > 0.01) G.rrect(ctx, x, y, Math.max(h, w * frac * k), h, h / 2, { fill: color, seed: seed + 1, lw: 4, hatch: { color: 'rgba(0,0,0,0.15)', gap: 8 } });
    if (label) G.text(ctx, label, x, y - 16, { size: labelSize, fam: P.FT.label, weight: 400, color: C.ink });
    if (value) G.text(ctx, value, x + Math.max(h, w * frac * k) + 18, y + h * 0.72, { size: h * 0.8, fam: P.FT.title, weight: 400, color: C.ink, alpha: fin(t, t0 + d * 0.6, 0.3) });
    ctx.restore();
  };
  // gold pollen sparkle burst at (x,y) from t0
  P.sparkle = (ctx, x, y, t, t0, { n = 10, r = 70, color = '#FFD25A', seed = 1 } = {}) => {
    const a = t - t0; if (a < 0 || a > 0.7) return; const k = a / 0.7;
    for (let i = 0; i < n; i++) { const ang = (i / n) * 6.283 + U.hash(i, seed) * 0.6, d = r * ease.outCubic(k) * (0.6 + 0.6 * U.hash(i, seed + 1));
      ctx.fillStyle = color; ctx.globalAlpha = 1 - k; ctx.beginPath(); ctx.arc(x + Math.cos(ang) * d, y + Math.sin(ang) * d, 6 * (1 - k) + 2, 0, 7); ctx.fill(); }
    ctx.globalAlpha = 1;
  };
  // big headline words that stamp in one by one at the given times
  P.words = (ctx, words, x, y, t, { size = 84, fam = P.FT.title, color = C.navy, key = {}, lh = 1.15, maxW = 1600, align = 'left', t1 = 1e9 } = {}) => {
    let xx = 0, yy = 0; const lay = [];
    const sp = G.measure(ctx, ' ', size, fam, 400);
    let lines = [[]];
    for (const w of words) { const ww = G.measure(ctx, w.w, size, fam, 400); if (xx + ww > maxW && xx > 0) { xx = 0; yy += size * lh; lines.push([]); } lines[lines.length - 1].push({ ...w, x: xx, y: yy, ww }); xx += ww + sp; }
    const k1 = fout(t, t1, 0.3); if (k1 <= 0) return;
    for (const ln of lines) { const lw = ln.length ? ln[ln.length - 1].x + ln[ln.length - 1].ww : 0; const ox = align === 'center' ? -lw / 2 : 0;
      for (const w of ln) { const k = pop(t, w.t, 0.25, 2.6); if (k <= 0) continue;
        P.at(ctx, x + ox + w.x, y + w.y, k * k1, 0, () => G.text(ctx, w.w, 0, 0, { size, fam, weight: 400, color: key[w.w] || w.color || color, boil: 0.3 })); } }
  };
  globalThis.P = P;
})();
(function () { const P = globalThis.P; P.talk = (t) => { const s = globalThis.SCORE && SCORE.MOUTH; if (!s) return 0; const c = s.charCodeAt(Math.round(t * 30)); return c >= 48 && c <= 57 ? (c - 48) / 9 : 0; };
  P.shot = (at, draw, o = {}) => { (globalThis.SHOTS = globalThis.SHOTS || []).push(Object.assign({ at, draw }, o)); };
  // flight path helper: position along a list of keyframes [[t, x, y], ...] with smooth easing
  P.path = (t, keys) => { if (t <= keys[0][0]) return { x: keys[0][1], y: keys[0][2], vx: 0 }; for (let i = 0; i < keys.length - 1; i++) { const a = keys[i], b = keys[i + 1]; if (t <= b[0]) { const u = U.ease.inOutQuad((t - a[0]) / (b[0] - a[0])); return { x: U.lerp(a[1], b[1], u), y: U.lerp(a[2], b[2], u), vx: b[1] - a[1] }; } } const z = keys[keys.length - 1]; return { x: z[1], y: z[2], vx: 0 }; };
})();
(function () { const P = globalThis.P, S = globalThis.SCORE;
  // chapter title shot: the chapter's own background + the navy banner (P.chapter)
  P.cardShot = (c, n, title, bg, o = {}) => P.shot(S.CH[c].t0, (ctx, t, s) => {
    bg(ctx, t, s);
    const h = S.ev[c + '_hook'], up = h ? U.ease.inOutCubic(U.clamp((t - (h.t - 0.45)) / 0.5)) : 0;
    ctx.save(); ctx.translate(0, -250 * up); P.chapter(ctx, t, n, title, S.CH[c].t0 + 0.1, S.ev[c + '_cardOut']); ctx.restore();
    if (h) P.hook(ctx, h, t, S.ev[c + '_cardOut']);
  }, Object.assign({ in: { type: 'paper', dur: 0.7 }, cam: globalThis.Shots.push(1.0, 1.04) }, o));
  // the chapter's hook line: handwritten on a big torn note, each word appears as it is spoken
  P.hook = (ctx, h, t, t1) => {
    const a = U.clamp((t - (h.t - 0.3)) / 0.35), b = 1 - U.clamp((t - (t1 - 0.4)) / 0.35); const k = Math.min(U.ease.outBack(a, 1.6), b); if (k <= 0.01) return;
    const size = 84, maxW = 1400, lh = size * 1.15, sp = G.measure(ctx, ' ', size, P.FT.hand, 700);
    const lines = [[]]; let x = 0;
    for (const w of h.words) { const ww = G.measure(ctx, w.w, size, P.FT.hand, 700); if (x + ww > maxW && x > 0) { lines.push([]); x = 0; } lines[lines.length - 1].push({ ...w, x, ww }); x += ww + sp; }
    const H = lines.length * lh + 70, y0 = 640 - H / 2 + 60;
    ctx.save(); ctx.translate(G.W / 2, 640); ctx.rotate(-0.015); ctx.scale(k, k); ctx.translate(-G.W / 2, -640);
    G.tornPaper(ctx, G.W / 2 - maxW / 2 - 60, y0 - 70, maxW + 120, H + 20, { fill: '#FFF8E8', seed: 77, tear: 4 });
    G.tape(ctx, G.W / 2 - maxW / 2 - 30, y0 - 84, 90, 30, -0.2, 3); G.tape(ctx, G.W / 2 + maxW / 2 - 60, y0 - 84, 90, 30, 0.2, 4);
    lines.forEach((ln, li) => { const lw = ln.length ? ln[ln.length - 1].x + ln[ln.length - 1].ww : 0; const ox = G.W / 2 - lw / 2;
      for (const w of ln) { const q = U.clamp((t - w.t) / 0.16); if (q <= 0) continue; const key = /\?$/.test(w.w);
        P.at(ctx, ox + w.x, y0 + li * lh, 0.75 + 0.25 * U.ease.outBack(q, 2), 0, () => G.text(ctx, w.w, 0, 0, { size, fam: P.FT.hand, color: key ? P.C.coral : P.C.ink, alpha: q })); } });
    ctx.restore();
  };
  P.sky = (ctx, top = '#BFE3F2', bottom = '#F4EDE0') => { const g = ctx.createLinearGradient(0, 0, 0, G.H); g.addColorStop(0, top); g.addColorStop(1, bottom); ctx.fillStyle = g; ctx.fillRect(-400, -400, G.W + 800, G.H + 800); };
  P.sun = (ctx, x, y, r, t) => { G.rays(ctx, x, y, { n: 14, r0: r * 1.25, r1: r * 1.9, color: '#F7C85A', lw: 7, spin: t * 0.15, alpha: 0.7 }); G.ellipse(ctx, x, y, r, r, { fill: '#F9CB55', seed: 77, lw: 4, hatch: { color: 'rgba(200,120,20,0.25)', gap: 8 } }); };
  P.cloud = (ctx, x, y, s, seed = 1) => { P.at(ctx, x, y, s, 0, () => { for (const [cx, cy, r] of [[-60, 10, 50], [0, -12, 66], [66, 8, 48]]) G.ellipse(ctx, cx, cy, r * 1.2, r, { fill: '#FFFFFF', seed: seed + cx, lw: 3.5, stroke: 'rgba(42,35,32,0.5)' }); }); };
})();
