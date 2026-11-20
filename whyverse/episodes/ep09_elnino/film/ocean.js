// Ep09 hero systems: (1) a cached comic map (equirectangular, Atlantic seam, Pacific in the middle) with country overlays,
// (2) the Pacific CROSS-SECTION "machine" — Asia left, South America right, trade winds, the tilted sea, the warm layer and the cold
// deep water, upwelling off Peru, the storm cloud — morphing from a normal year (st = 0) to El Niño (st = 1). Pure functions of t.
(function () {
  const G = globalThis.G, U = globalThis.U, P = globalThis.P, GEO = globalThis.GEO; const { clamp, lerp, ease } = U; const C = P.C;
  const cache = {};
  // ---------- map ----------
  const SEAM = -30;
  const shiftRing = (r, seam = SEAM) => { let m = 0; for (let q = 0; q < r.length; q += 2) m += r[q]; m /= r.length / 2; return m < seam ? 360 : 0; };
  const wrapRing = (r, seam = SEAM) => { const out = []; let prev = null; for (let q = 0; q < r.length; q += 2) { let L = r[q]; if (prev == null) { while (L < seam) L += 360; while (L >= seam + 360) L -= 360; } else { while (L - prev > 180) L -= 360; while (L - prev < -180) L += 360; } out.push(L); prev = L; } return (lon, q) => out[q >> 1]; };
  P.mapCache = (key, { lon0 = 60, lon1 = 300, lat0 = -50, lat1 = 62, w = 2400, sea = C.sea, land = C.land, lw = 5, seaDots = true, skip = ['Antarctica', 'Fr. S. Antarctic Lands'] } = {}) => {
    if (cache[key]) return cache[key]; const k = w / (lon1 - lon0), h = Math.round((lat1 - lat0) * k);
    const seam = lon0 - 30; const proj = (lon, lat) => { let L = lon; if (L < seam) L += 360; return [(L - lon0) * k, (lat1 - lat) * k]; };
    const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
    x.fillStyle = sea; x.fillRect(0, 0, w, h);
    if (seaDots) { const pat = x.createPattern(P.dotTile(C.blue, 16, 3), 'repeat'); x.globalAlpha = 0.35; x.fillStyle = pat; x.fillRect(0, 0, w, h); x.globalAlpha = 1; }
    // graticule: equator + tropics, faint
    x.strokeStyle = 'rgba(255,255,255,0.35)'; x.lineWidth = 3; x.setLineDash([14, 12]); for (const lat of [0]) { const y = (lat1 - lat) * k; x.beginPath(); x.moveTo(0, y); x.lineTo(w, y); x.stroke(); } x.setLineDash([]);
    const paths = [];
    for (const [name, rings] of Object.entries(GEO.world)) { if (skip.includes(name)) continue; for (const r of rings) { const wf = wrapRing(r, seam); const pts = []; for (let q = 0; q < r.length; q += 2) pts.push([(wf(r[q], q) - lon0) * k, (lat1 - r[q + 1]) * k]); paths.push(pts); } }
    const tracePts = (pts) => { x.beginPath(); pts.forEach((p, i) => (i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1]))); x.closePath(); };
    x.fillStyle = C.ink; for (const pts of paths) { x.save(); x.translate(5, 6); tracePts(pts); x.fill(); x.restore(); }
    x.fillStyle = land; for (const pts of paths) { tracePts(pts); x.fill(); }
    const lpat = x.createPattern(P.dotTile(C.land2, 12, 2.4), 'repeat'); x.fillStyle = lpat; x.globalAlpha = 0.5; for (const pts of paths) { tracePts(pts); x.fill(); } x.globalAlpha = 1;
    x.strokeStyle = C.ink; x.lineWidth = lw; x.lineJoin = 'round'; for (const pts of paths) { tracePts(pts); x.stroke(); }
    return (cache[key] = { canvas: c, w, h, k, lon0, lon1, lat0, lat1, proj, seam });
  };
  // draw a cached map at (x, y) with scale s; returns a screen projector
  P.drawMap = (ctx, m, x, y, s = 1, a = 1) => { if (a > 0.01) { ctx.save(); ctx.globalAlpha *= a; ctx.drawImage(m.canvas, x, y, m.w * s, m.h * s); ctx.restore(); }
    const f = (lon, lat) => { const p = m.proj(lon, lat); return [x + p[0] * s, y + p[1] * s]; }; f.seam = m.seam; return f; };
  // overlay one country (fill + outline) on a drawn map; pj = projector from drawMap
  P.countryOn = (ctx, pj, name, fill, { a = 1, lw = 5, dots = null } = {}) => { const rings = GEO.world[name]; if (!rings || a <= 0.01) return;
    const path = (c) => { c.beginPath(); for (const r of rings) { const wf = wrapRing(r, pj.seam == null ? SEAM : pj.seam); for (let q = 0; q < r.length; q += 2) { const p = pj(wf(r[q], q), r[q + 1]); q ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]); } c.closePath(); } };
    P.ink(ctx, path, fill, { a, lw, dots, dotA: 0.3 }); };
  // a lon/lat box (Niño 3.4 etc.), drawn on the map projector, k = draw-on progress
  P.lonLatBox = (ctx, pj, lonA, latA, lonB, latB, k, { col = C.red, lw = 7, fill = null, a = 1 } = {}) => { if (k <= 0.01) return; const p0 = pj(lonA, latA), p1 = pj(lonB, latA), p2 = pj(lonB, latB), p3 = pj(lonA, latB);
    if (fill) P.fill(ctx, P.pPoly([p0, p1, p2, p3]), fill, { a: a * clamp(k) });
    ctx.save(); ctx.globalAlpha *= a; P.trace(ctx, [p0, p1, p2, p3, p0], k, C.ink, lw + 6); P.trace(ctx, [p0, p1, p2, p3, p0], k, col, lw); ctx.restore(); };
  // a glowing warm blob (sea-surface heat) at a point, radius r (px), pulsing
  P.heat = (ctx, x, y, rx, ry, t, { a = 1, col = C.warm, rot = 0 } = {}) => { if (a <= 0.01) return; const pul = 1 + 0.04 * Math.sin(t * 3);
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, ry / rx); const g = ctx.createRadialGradient(0, 0, 2, 0, 0, rx * pul); g.addColorStop(0, P.rgba(C.red, 0.95 * a)); g.addColorStop(0.45, P.rgba(col, 0.8 * a)); g.addColorStop(1, P.rgba(C.yel, 0)); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rx * pul, 0, 7); ctx.fill(); ctx.restore();
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(1, ry / rx); P.dots(ctx, (c) => { c.beginPath(); c.arc(0, 0, rx * 0.62, 0, 7); }, C.red, { a: 0.35 * a, gap: 12, r: 3 }); ctx.restore(); };

  // ---------- the cross-section machine ----------
  const X0 = 250, X1 = 1680; // ocean between the two coasts
  P.SEC = { X0, X1 };
  P.secSurface = (x, st) => { const u = clamp((x - X0) / (X1 - X0)); return lerp(lerp(500, 556, u), lerp(530, 532, u), st); };
  P.secThermo = (x, st, kel = null) => { const u = clamp((x - X0) / (X1 - X0)); const sm = (1 - Math.cos(u * Math.PI)) / 2; let d = lerp(lerp(850, 600, sm), lerp(760, 770, sm), st);
    if (kel && kel.a > 0) { const cx = lerp(X0 + 100, X1 - 80, kel.k); d += kel.a * 110 * Math.exp(-Math.pow((x - cx) / 170, 2)); } return d; };
  P.section = (ctx, t, st, o = {}) => {
    const { wind = 1 - st, kel = null, cloudX = null, rain = 1, labels = 1, upwell = 1 - st, sunA = 1 - st, fish = 0, bot = 1080, windFace = 1, faceE = null, tiltDim = 0, notToScale = 1 } = o;
    // sky
    P.dark = false; ctx.fillStyle = C.sky; ctx.fillRect(-900, -900, G.W + 1800, 1700); ctx.save(); ctx.globalAlpha = 0.25; ctx.drawImage(P.dotGrad('secSky', C.white, { dir: 'down', r0: 5, r1: 0, gap: 18 }), 0, 0); ctx.restore();
    // water body
    const surf = []; for (let x = X0 - 40; x <= X1 + 40; x += 20) surf.push([x, P.secSurface(x, st) + Math.sin(x * 0.03 - t * 2.2) * 5]);
    const therm = []; for (let x = X0 - 40; x <= X1 + 40; x += 20) therm.push([x, P.secThermo(x, st, kel)]);
    // cold deep water (everything below the surface), then the warm layer on top (surface → thermocline)
    P.ink(ctx, P.pPoly([...surf, [X1 + 40, bot + 100], [X0 - 40, bot + 100]]), C.deep, { lw: 0, dots: C.cold, dotA: 0.28, dotGap: 16, dotR: 3 });
    P.ink(ctx, P.pPoly([...surf, ...therm.slice().reverse()]), C.warm, { lw: 0, dots: C.red, dotA: 0.32 });
    // a soft gradient band at the thermocline
    P.trace(ctx, therm, 1, C.warm2, 10, 0.8); P.trace(ctx, therm, 1, C.ink, 4, 0.6, [16, 14]);
    P.trace(ctx, surf, 1, C.ink, 6);
    // upwelling off Peru (cold arrows rising along the east coast)
    if (upwell > 0.02) for (let i = 0; i < 3; i++) { const ph = (t * 0.45 + i / 3) % 1; const x = X1 - 70 - i * 70, y0 = 980, y1 = P.secSurface(x, st) + 30; const y = lerp(y0, y1, ph);
      P.fatArrow(ctx, x, y + 90, x, y, { k: 1, w: 22, color: C.cold, a: upwell * Math.sin(ph * Math.PI), shadow: 0.6 }); }
    if (fish > 0) for (let i = 0; i < 7; i++) P.fish(ctx, X1 - 120 - (i % 4) * 70 + Math.sin(t + i) * 14, P.secSurface(X1 - 150, st) + 60 + Math.floor(i / 4) * 50 + (i % 2) * 18, 0.42, t, { seed: i, dir: i % 2 ? 1 : -1, a: fish, col: C.cyan });
    // coasts: Asia / Indonesia (left, green islands + hills), South America / Peru (right, desert coast + Andes)
    P.iP(ctx, [[-500, bot + 300], [-500, 470], [60, 430], [150, 470], [230, 488], [X0 + 10, 520], [X0 - 30, 700], [X0 - 70, bot + 300]], C.green, { lw: 6, curve: false, dots: C.green2, dotA: 0.4 });
    for (let i = 0; i < 3; i++) { const px = 60 + i * 60, py = 470 - (i % 2) * 18; P.line(ctx, px, py, px + 6, py - 60, C.ink, 7); P.iE(ctx, px + 6, py - 66, 34, 12, C.green, { lw: 4, rot: -0.3 }); P.iE(ctx, px + 6, py - 66, 34, 12, C.green, { lw: 4, rot: 0.4 }); }
    P.iP(ctx, [[X1 - 10, 560], [X1 + 60, 480], [1780, 420], [1840, 250], [1880, 300], [1990, 200], [2500, 160], [2500, bot + 300], [X1 + 60, bot + 300], [X1 + 30, 760]], C.land, { lw: 6, dots: C.land2, dotA: 0.5 });
    P.iP(ctx, [[1810, 300], [1840, 250], [1866, 290], [1852, 286], [1840, 270], [1824, 296]], C.white, { lw: 4 });
    // sun over the dry east
    if (sunA > 0.02) P.sunIcon(ctx, 1500, 150, 56, t, { a: sunA });
    // the storm cloud with rain over the warm water
    const cx = cloudX == null ? lerp(470, 980, st) : cloudX; P.stormCloud(ctx, cx, 260, 0.8, t, { rain, bolt: 0.5 });
    // trade winds: arrows blowing east → west (right to left) above the sea; weaker with `wind`, reversed when wind < 0
    const wa = Math.abs(wind); if (wa > 0.03) for (let i = 0; i < 3; i++) { const yy = 410 + i * 34 - (i === 1 ? 4 : 0); const ph = (t * 0.55 * (0.4 + wa) + i * 0.33) % 1; const dir = wind >= 0 ? -1 : 1;
      const xs = dir < 0 ? lerp(1500, 520, ph) : lerp(560, 1400, ph); P.fatArrow(ctx, xs, yy, xs + dir * 260 * (0.4 + 0.6 * wa), yy, { k: 1, w: 18 + 10 * wa, color: C.white, a: wa * Math.sin(ph * Math.PI), shadow: 0.5 }); }
    if (windFace > 0.01) P.windFace(ctx, faceE == null ? 1640 : faceE, 300, 0.62, t, { energy: clamp(Math.abs(wind)), dir: wind >= 0 ? -1 : 1, a: windFace });
    // labels
    if (labels > 0.01) { ctx.save(); ctx.globalAlpha *= labels;
      P.lab(ctx, 'ASIA · INDONESIA', 150, 960, { size: 30, color: C.cream, stroke: C.ink });
      P.lab(ctx, 'SOUTH AMERICA · PERU', 1760, 960, { size: 30, color: C.cream, stroke: C.ink });
      const wx = 600, wy = (P.secSurface(wx, st) + P.secThermo(wx, st, kel)) / 2 + 12; P.lab(ctx, 'WARM WATER', wx, wy, { size: 34, color: C.cream, stroke: C.ink });
      P.lab(ctx, 'COLD DEEP WATER', 960, 990, { size: 34, color: C.cream, stroke: C.ink });
      ctx.restore(); }
    if (notToScale > 0.01) G.text(ctx, 'not to scale', G.W - 40, 1000, { size: 22, fam: 'Inter', weight: 700, color: C.cream, align: 'right', alpha: notToScale * 0.8, boil: 0 });
  };
  // a mini thermometer gauge for Niño 3.4 anomalies: 0 … +3.5 °C with threshold ticks
  P.ninoGauge = (ctx, x, y, h, val, t, { a = 1, marks = [[0.5, 'EL NIÑO'], [1.5, 'STRONG'], [2.0, 'VERY STRONG']], max = 3.5, hl = -1 } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a;
    const w = 90; P.iR(ctx, x - w / 2, y - h, w, h, w / 2, C.white, { shadow: 1, lw: 6 }); P.iC(ctx, x, y + 40, 70, C.red, { lw: 6, dots: C.red2, dotA: 0.3 });
    const fh = (h - 40) * clamp(val / max); P.rect(ctx, x - 22, y - fh - 10, 44, fh + 50, 20, C.red);
    marks.forEach(([v, lab], i) => { const yy = y - 20 - (h - 40) * v / max; P.line(ctx, x + w / 2 - 4, yy, x + w / 2 + 40, yy, C.ink, 5); const on = val >= v; const big = i === hl;
      G.text(ctx, '+' + v.toFixed(1) + ' °C  ' + lab, x + w / 2 + 54, yy + 14, { size: big ? 50 : 38, fam: 'Bangers', color: on ? C.red : C.ink, alpha: on ? 1 : 0.55, boil: 0 }); });
    ctx.restore(); };
})();
