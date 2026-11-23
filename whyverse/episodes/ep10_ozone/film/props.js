// Line-art props for ep10. Every prop = P.art parts (draw on with k) at (x, y, s). Pure functions of args + t.
(function () {
  const G = globalThis.G, U = globalThis.U, P = globalThis.P; const C = P.C; const { clamp, lerp, ease } = U;
  const at = (x, y, s, fn) => { const o = []; for (const p of fn()) { const q = Array.isArray(p) ? { pts: p } : Object.assign({}, p); q.pts = q.pts.map(([a, b]) => [x + a * s, y + b * s]); o.push(q); } return o; };
  const R = P.rectPts, Cc = P.circPts;
  // molecules ------------------------------------------------------------------------------------------
  // an atom: circle + letter; kind 'O' plain, 'Cl' accent
  P.atom = (ctx, x, y, r, lab, { k = 1, col = null, fill = C.pap, a = 1 } = {}) => { if (a <= 0.01 || k <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = fill; ctx.beginPath(); ctx.arc(x, y, r * clamp(k * 2), 0, 7); ctx.fill(); ctx.restore();
    P.art(ctx, [Cc(x, y, r, 32)], k, { color: col || C.ink, lw: Math.max(3, r * 0.1), a }); if (lab) G.text(ctx, lab, x, y + r * 0.36, { size: r * (lab.length > 1 ? 0.8 : 1), fam: 'Inter', weight: 800, color: col || C.ink, align: 'center', boil: 0, alpha: a * clamp(k * 2 - 1) }); };
  P.bond = (ctx, x0, y0, x1, y1, r0, r1, { n = 2, k = 1, a = 1, col = null } = {}) => { const ang = Math.atan2(y1 - y0, x1 - x0), nx = -Math.sin(ang) * 6, ny = Math.cos(ang) * 6; const ax = x0 + Math.cos(ang) * r0, ay = y0 + Math.sin(ang) * r0, bx = x1 - Math.cos(ang) * r1, by = y1 - Math.sin(ang) * r1;
    const parts = n === 2 ? [[[ax + nx, ay + ny], [bx + nx, by + ny]], [[ax - nx, ay - ny], [bx - nx, by - ny]]] : [[[ax, ay], [bx, by]]]; P.art(ctx, parts, k, { color: col || C.ink, lw: 4, a }); };
  // O3 molecule (bent), small, rotating slowly
  P.o3 = (ctx, x, y, r, t, { k = 1, a = 1, rot = 0, broken = 0, seed = 0 } = {}) => { if (a <= 0.01) return; const ang = rot + Math.sin(t * 0.8 + seed) * 0.25; const d = r * 1.9;
    const c = [x, y], l = [x + Math.cos(ang + 2.1) * d, y + Math.sin(ang + 2.1) * d], rr = [x + Math.cos(ang + 1.05) * d * (1 + broken * 1.6), y + Math.sin(ang + 1.05) * d * (1 + broken * 1.6)];
    P.bond(ctx, c[0], c[1], l[0], l[1], r, r * 0.8, { k, a }); if (broken < 0.2) P.bond(ctx, c[0], c[1], rr[0], rr[1], r, r * 0.8, { k, a: a * (1 - broken * 5) });
    P.atom(ctx, l[0], l[1], r * 0.8, '', { k, a }); P.atom(ctx, rr[0], rr[1], r * 0.8, '', { k, a }); P.atom(ctx, c[0], c[1], r, '', { k, a }); };
  // a CFC molecule: C in the middle, 2 Cl (accent) + 2 F
  P.cfc = (ctx, x, y, r, t, { k = 1, a = 1, rot = 0, lose = 0 } = {}) => { if (a <= 0.01) return; const arms = [[0, 'Cl'], [Math.PI / 2, 'F'], [Math.PI, 'Cl'], [Math.PI * 1.5, 'F']];
    arms.forEach(([an, lab], i) => { if (i === 0 && lose >= 1) return; const off = (i === 0 ? lose * 4 : 0); const d = r * (2.1 + off); const px = x + Math.cos(an + rot) * d, py = y + Math.sin(an + rot) * d;
      if (i !== 0 || lose < 0.1) P.bond(ctx, x, y, px, py, r, r * 0.8, { n: 1, k, a }); P.atom(ctx, px, py, r * 0.8, lab, { k, a, col: lab === 'Cl' ? C.acc : null }); });
    P.atom(ctx, x, y, r, 'C', { k, a }); };
  // sky + sun + UV ----------------------------------------------------------------------------------------
  P.sunL = (ctx, x, y, r, t, { k = 1, a = 1 } = {}) => { if (a <= 0.01) return; P.art(ctx, [Cc(x, y, r, 40)], k, { lw: 5, a, color: C.ink, fill: null }); const rays = [];
    for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283 + t * 0.15; rays.push([[x + Math.cos(an) * r * 1.3, y + Math.sin(an) * r * 1.3], [x + Math.cos(an) * r * (1.6 + 0.08 * Math.sin(t * 3 + i)), y + Math.sin(an) * r * (1.6 + 0.08 * Math.sin(t * 3 + i))]]); }
    P.art(ctx, rays, clamp(k * 1.4 - 0.3), { lw: 5, a, color: C.ink }); };
  // a zig-zag UV ray from (x0,y0) to (x1,y1); p = 0..1 travel; blocked → stops at frac
  P.uv = (ctx, x0, y0, x1, y1, p, { stop = 1, col = C.acc, lw = 5, a = 1, n = 10, amp = 14 } = {}) => { if (p <= 0.01 || a <= 0.01) return; const pts = []; const L = Math.hypot(x1 - x0, y1 - y0), ang = Math.atan2(y1 - y0, x1 - x0); const nx = -Math.sin(ang), ny = Math.cos(ang);
    const e = Math.min(p, stop); for (let i = 0; i <= n * 4; i++) { const u = i / (n * 4); if (u > e) break; const w = (i % 4 === 1 ? 1 : i % 4 === 3 ? -1 : 0) * amp; pts.push([x0 + (x1 - x0) * u + nx * w, y0 + (y1 - y0) * u + ny * w]); }
    if (pts.length > 1) P.art(ctx, [pts], 1, { color: col, lw, a }); if (stop < 1 && p >= stop) { const bx = lerp(x0, x1, stop), by = lerp(y0, y1, stop); const f = clamp((p - stop) / 0.3); ctx.save(); ctx.globalAlpha *= a * (1 - f); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(bx, by, 10 + f * 40, 0, 7); ctx.stroke(); ctx.restore(); } };
  // a band of floating O3 molecules across the sky between y0..y1 (thin = fraction missing, holeX = centre of a gap)
  P.ozoneBand = (ctx, t, y0, y1, { k = 1, a = 1, thin = 0, hx = 960, hw = 0, n = 26, r = 14 } = {}) => { if (a <= 0.01) return;
    ctx.save(); ctx.globalAlpha *= a * 0.5; ctx.strokeStyle = C.ink3; ctx.lineWidth = 2; ctx.setLineDash([6, 10]); ctx.beginPath(); ctx.moveTo(0, y0); ctx.lineTo(G.W, y0); ctx.moveTo(0, y1); ctx.lineTo(G.W, y1); ctx.stroke(); ctx.restore();
    for (let i = 0; i < n; i++) { const xx = ((U.hash(i, 3) * (G.W + 200) + t * 14 * (0.5 + U.hash(i, 4))) % (G.W + 200)) - 100; const yy = lerp(y0 + 20, y1 - 20, U.hash(i, 5));
      const gone = Math.max(U.hash(i, 6) < thin ? 1 : 0, hw > 0 ? clamp(1 - Math.abs(xx - hx) / hw) * 1.5 : 0); if (gone >= 1) continue;
      P.o3(ctx, xx, yy, r, t, { k: clamp(k * 1.6 - U.hash(i, 7) * 0.6), a: a * (1 - gone), rot: U.hash(i, 8) * 6, seed: i }); } };
  // everyday things ----------------------------------------------------------------------------------------
  P.can = (ctx, x, y, s, t, { k = 1, a = 1, spray = 0 } = {}) => { P.art(ctx, at(x, y, s, () => [{ pts: P.rrPts(-40, -160, 80, 160, 14), fill: C.pap }, R(-20, -190, 40, 30), R(-8, -210, 16, 20), [[-40, -110], [40, -110]], [[-40, -50], [40, -50]]]), k, { lw: 4.5, a, fill: C.pap });
    if (spray > 0) { const pts = []; for (let i = 0; i < 18; i++) { const u = ((t * 1.6 + U.hash(i, 1)) % 1); const an = -0.35 + U.hash(i, 2) * 0.7; pts.push([x + 10 * s + Math.cos(an) * u * 260 * s, y - 200 * s + Math.sin(an) * u * 260 * s - u * 60 * s, u]); }
      ctx.save(); ctx.globalAlpha *= a * spray; for (const [px, py, u] of pts) { ctx.fillStyle = C.ink2; ctx.globalAlpha = a * spray * (1 - u) * 0.8; ctx.beginPath(); ctx.arc(px, py, 3 + u * 6, 0, 7); ctx.fill(); } ctx.restore(); } };
  P.fridge = (ctx, x, y, s, t, { k = 1, a = 1, open = 0 } = {}) => P.art(ctx, at(x, y, s, () => [{ pts: P.rrPts(-90, -360, 180, 360, 16), fill: C.pap }, [[-90, -240], [90, -240]], R(56, -330, 10, 60), R(56, -210, 10, 90), [[-60, 0], [-60, 14]], [[60, 0], [60, 14]], [[-70, -300], [-20, -300]]]), k, { lw: 4.5, a });
  P.ac = (ctx, x, y, s, t, { k = 1, a = 1 } = {}) => { P.art(ctx, at(x, y, s, () => [{ pts: P.rrPts(-160, -90, 320, 110, 18), fill: C.pap }, [[-140, -10], [140, -10]], [[-140, 2], [140, 2]], Cc(110, -55, 12, 16)]), k, { lw: 4.5, a });
    if (k > 0.9) for (let i = 0; i < 4; i++) { const u = (t * 0.8 + i * 0.25) % 1; P.art(ctx, [P.wave(x - 120 * s, x + 120 * s, y + (30 + u * 120) * s, 6 * s, 3, t * 4 + i)], 1, { lw: 3, a: a * (1 - u) * 0.6, color: C.ink2 }); } };
  P.factory = (ctx, x, y, s, t, { k = 1, a = 1, smoke = 1, n = 2 } = {}) => { P.art(ctx, at(x, y, s, () => { const o = [{ pts: [[-180, 0], [-180, -120], [-110, -170], [-110, -120], [-40, -170], [-40, -120], [30, -170], [30, -120], [180, -120], [180, 0], [-180, 0]], fill: C.pap }];
      for (let i = 0; i < n; i++) o.push({ pts: R(60 + i * 60, -300, 36, 180), fill: C.pap }); o.push(R(-140, -80, 40, 40), R(-60, -80, 40, 40)); return o; }), k, { lw: 4.5, a });
    if (k > 0.9 && smoke > 0) for (let i = 0; i < n; i++) for (let j = 0; j < 4; j++) { const u = (t * 0.25 + j * 0.25 + i * 0.13) % 1; const px = x + (78 + i * 60) * s + Math.sin(t + j) * 10 * s + u * 70 * s, py = y - (310 + u * 220) * s;
      ctx.save(); ctx.globalAlpha *= a * smoke * (1 - u) * 0.7; P.art(ctx, [Cc(px, py, (14 + u * 40) * s, 20)], 1, { lw: 3, color: C.ink2 }); ctx.restore(); } };
  P.car = (ctx, x, y, s, t, { k = 1, a = 1 } = {}) => { P.art(ctx, at(x, y, s, () => [{ pts: [[-150, -30], [-150, -80], [-90, -90], [-50, -140], [60, -140], [100, -90], [150, -80], [150, -30], [-150, -30]], fill: C.pap }, [[-40, -130], [-70, -92], [20, -92], [20, -130]], [[34, -130], [34, -92], [86, -92], [56, -130]]]), k, { lw: 4.5, a });
    for (const wx of [-90, 90]) { P.dCirc(ctx, x + wx * s, y - 30 * s, 30 * s, k, { lw: 4.5, a, fill: C.pap }); P.dLine(ctx, x + wx * s, y - 30 * s, x + wx * s + Math.cos(t * 8) * 20 * s, y - 30 * s + Math.sin(t * 8) * 20 * s, k, { lw: 3, a }); } };
  P.plane = (ctx, x, y, s, t, { k = 1, a = 1, rot = 0 } = {}) => P.art(ctx, at(0, 0, 1, () => [{ pts: [[-160, 0], [-120, -22], [140, -22], [180, 0], [140, 22], [-120, 22], [-160, 0]], fill: C.pap }, [[-10, -22], [-60, -110], [-20, -110], [50, -22]], [[-10, 22], [-60, 110], [-20, 110], [50, 22]], [[-120, -22], [-150, -70], [-130, -70], [-90, -22]]]), k, { lw: 4.5, a, x, y, s, rot });
  P.tower = (ctx, x, y, s, t, { k = 1, a = 1 } = {}) => { P.art(ctx, at(x, y, s, () => [{ pts: [[-110, 0], [-80, -120], [-70, -260], [70, -260], [80, -120], [110, 0], [-110, 0]], fill: C.pap }]), k, { lw: 4.5, a });
    if (k > 0.9) for (let j = 0; j < 4; j++) { const u = (t * 0.2 + j * 0.25) % 1; ctx.save(); ctx.globalAlpha *= a * (1 - u) * 0.6; P.art(ctx, [Cc(x + Math.sin(t * 0.7 + j) * 20 * s, y - (280 + u * 200) * s, (50 + u * 60) * s, 24)], 1, { lw: 3, color: C.ink2 }); ctx.restore(); } };
  P.cow = (ctx, x, y, s, t, { k = 1, a = 1, dir = 1, seed = 0 } = {}) => { const ch = Math.sin(t * 2 + seed) * 4; ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1); P.art(ctx, at(0, 0, 1, () => [{ pts: P.rrPts(-90, -120, 170, 80, 30), fill: C.pap }, [[-70, -42], [-70, 0]], [[-40, -42], [-40, 0]], [[40, -42], [40, 0]], [[60, -42], [60, 0]], { pts: P.rrPts(70, -150 + ch, 70, 56, 20), fill: C.pap }, [[80, -150 + ch], [72, -170 + ch]], [[130, -150 + ch], [138, -170 + ch]], Cc(-20, -90, 16, 12), Cc(30, -100, 12, 12), [[-90, -110], [-110, -70]]]), k, { lw: 4, a, x: 0, y: 0, s }); ctx.restore(); };
  P.thermo = (ctx, x, y, s, lvl, { k = 1, a = 1, max = 3, marks = [0, 1, 1.5, 2, 2.5, 3] } = {}) => { P.art(ctx, at(x, y, s, () => [{ pts: P.rrPts(-26, -520, 52, 470, 26), fill: C.pap }, Cc(0, -20, 52, 40)]), k, { lw: 5, a });
    if (k > 0.8) { ctx.save(); ctx.globalAlpha *= a; ctx.fillStyle = C.acc; ctx.beginPath(); ctx.arc(x, y - 20 * s, 40 * s, 0, 7); ctx.fill(); const h = (lvl / max) * 440 * s; ctx.fillRect(x - 13 * s, y - 60 * s - h, 26 * s, h + 20 * s);
      for (const m of marks) { const yy = y - 60 * s - (m / max) * 440 * s; ctx.strokeStyle = C.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 30 * s, yy); ctx.lineTo(x + 52 * s, yy); ctx.stroke(); G.text(ctx, (m === 0 ? '0' : m.toFixed(1)) + '°', x + 62 * s, yy + 11, { size: 32, fam: 'Inter', weight: 800, color: C.ink2, boil: 0 }); } ctx.restore(); } };
  P.gavel = (ctx, x, y, s, ang, { k = 1, a = 1 } = {}) => { P.art(ctx, [{ pts: P.rrPts(-30, 0, 60, 230, 10), fill: C.pap }, { pts: P.rrPts(-110, -50, 220, 70, 20), fill: C.pap }, [[-70, -50], [-70, 20]], [[70, -50], [70, 20]]], k, { lw: 5, a, x, y, s, rot: ang }); };
  P.block = (ctx, x, y, s, { k = 1, a = 1 } = {}) => P.art(ctx, at(x, y, s, () => [{ pts: P.rrPts(-110, -40, 220, 40, 10), fill: C.pap }]), k, { lw: 5, a });
  // a document with title lines and signatures appearing (sig = 0..1)
  P.doc = (ctx, x, y, s, t, { k = 1, a = 1, title = '', sig = 0, rot = 0, n = 6, stamp = '' } = {}) => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.translate(-x, -y);
    P.art(ctx, at(x, y, s, () => { const o = [{ pts: R(-150, -200, 300, 400), fill: C.pap }]; for (let i = 0; i < 7; i++) o.push([[-110, -100 + i * 26], [110 - (i % 3) * 30, -100 + i * 26]]); return o; }), k, { lw: 4, a });
    if (title) G.text(ctx, title, x, y - 140 * s, { size: Math.min(34 * s, 34 * s * 250 * s / P.measure(ctx, title, 34 * s, 'Inter', 800)), fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0, alpha: a * clamp(k * 2 - 1) });
    for (let i = 0; i < n; i++) { const q = clamp(sig * n - i); if (q <= 0) continue; const sx = x + (-100 + (i % 3) * 100) * s, sy = y + (110 + Math.floor(i / 3) * 50) * s; const pts = []; for (let j = 0; j <= 12; j++) { const u = j / 12; pts.push([sx - 40 * s + u * 80 * s, sy + Math.sin(u * 14 + i) * 9 * s - u * 6 * s]); } P.art(ctx, [pts], q, { color: C.acc, lw: 3.5, a }); }
    if (stamp) { const sk = clamp(k * 3 - 2); if (sk > 0) { ctx.save(); ctx.globalAlpha *= a * sk; ctx.translate(x + 70 * s, y - 40 * s); ctx.rotate(-0.25); ctx.scale(lerp(1.6, 1, ease.outCubic(sk)), lerp(1.6, 1, ease.outCubic(sk))); ctx.strokeStyle = C.acc; ctx.lineWidth = 6; const w = P.measure(ctx, stamp, 40 * s, 'Inter', 900) + 30; ctx.strokeRect(-w / 2, -30 * s, w, 60 * s); G.text(ctx, stamp, 0, 14 * s, { size: 40 * s, fam: 'Inter', weight: 900, color: C.acc, align: 'center', boil: 0 }); ctx.restore(); } }
    ctx.restore(); };
  // the Halley research station: a hut on stilts + an instrument dome
  P.station = (ctx, x, y, s, t, { k = 1, a = 1 } = {}) => P.art(ctx, at(x, y, s, () => [{ pts: P.rrPts(-200, -260, 400, 140, 20), fill: C.pap }, [[-160, -120], [-180, 0]], [[-60, -120], [-60, 0]], [[60, -120], [60, 0]], [[160, -120], [180, 0]], R(-150, -220, 60, 40), R(-60, -220, 60, 40), R(30, -220, 60, 40), Cc(150, -280, 30, 20, Math.PI, Math.PI * 2), [[150, -310], [150, -350]]]), k, { lw: 4.5, a });
  // snow ground line with small drifts
  P.ground = (ctx, y, k = 1, { a = 1 } = {}) => P.art(ctx, [P.wave(-100, G.W + 100, y, 6, 5)], k, { lw: 4, a });
  // a round table seen from above-ish with chairs (dots) and flags — the summit
  P.summit = (ctx, cx, cy, rx, ry, t, { k = 1, a = 1, n = 40, lit = 0, out = 0 } = {}) => { P.art(ctx, [{ pts: Cc(cx, cy, rx, 80, 0, Math.PI * 2, ry), fill: C.pap }, Cc(cx, cy, rx * 0.72, 80, 0, Math.PI * 2, ry * 0.72)], k, { lw: 4.5, a });
    for (let i = 0; i < n; i++) { const an = i / n * 6.283; const px = cx + Math.cos(an) * rx * 1.13, py = cy + Math.sin(an) * ry * 1.17; const q = clamp(k * 2 - 1 - i / n * 0.6); if (q <= 0) continue; const isOut = out > 0 && U.hash(i, 9) < out;
      ctx.save(); ctx.globalAlpha *= a * q; ctx.fillStyle = isOut ? C.acc : C.pap; ctx.strokeStyle = isOut ? C.acc : C.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(px, py - 4 * Math.sin(t * 2 + i) * (lit ? 1 : 0), 13, 0, 7); ctx.fill(); ctx.stroke(); ctx.restore(); } };
  // a field fence (commons)
  P.fence = (ctx, x0, x1, y, k = 1, { a = 1 } = {}) => { const o = [[[x0, y - 40], [x1, y - 40]], [[x0, y - 80], [x1, y - 80]]]; for (let x = x0; x <= x1; x += 80) o.push([[x, y], [x, y - 100]]); P.art(ctx, o, k, { lw: 4, a }); };
  // money bundle
  P.bill = (ctx, x, y, s, { k = 1, a = 1, rot = 0 } = {}) => { P.art(ctx, [{ pts: R(-90, -45, 180, 90), fill: C.pap }, Cc(0, 0, 26, 24)], k, { lw: 4, a, x, y, s, rot }); if (k > 0.7) G.text(ctx, '$', x, y + 14 * s, { size: 40 * s, fam: 'Inter', weight: 900, color: C.acc, align: 'center', boil: 0, alpha: a * clamp(k * 3 - 2) }); };
  // a simple flag: pole + rectangle with a single stripe (generic, no real nation)
  P.flag = (ctx, x, y, s, t, { k = 1, a = 1, seed = 0, acc = false } = {}) => { const wv = (u) => Math.sin(t * 3 + u * 4 + seed) * 6 * u; const fl = []; for (let i = 0; i <= 10; i++) fl.push([x + i * 9 * s, y - 120 * s + wv(i / 10)]); for (let i = 10; i >= 0; i--) fl.push([x + i * 9 * s, y - 64 * s + wv(i / 10)]);
    P.art(ctx, [[[x, y], [x, y - 124 * s]], { pts: fl, fill: acc ? C.accW2 : C.pap, closed: true }], k, { lw: 3.5, a }); };
})();
