// Whyverse ep06 — flat props (tankers, barrels, pipes, mines, icons), the map kit (Natural Earth outlines, 1:50m in the Gulf),
// and the chapter card + hook strip.
(function () {
  const P = globalThis.P, S = globalThis.SCORE, U = globalThis.U, G = globalThis.G; const C = P.C; const { clamp, lerp, ease } = U;

  // ---------- MAPS ----------
  // P.mkMap(region, box) → map with proj + cached Path2D per country (projection is fixed; camera moves use P.cam).
  const cache = {};
  P.mkMap = (id, region, box = { x: 0, y: 0, w: G.W, h: G.H }, { pad = 0 } = {}) => {
    if (cache[id]) return cache[id];
    const m = Data.map({ region, x: box.x, y: box.y, w: box.w, h: box.h, pad }); const GEO = globalThis.GEO; m.paths = {};
    const [lon0, lat0, lon1, lat1] = m.bounds; const mg = 12;
    for (const name of Object.keys(GEO.world)) {
      const rings = (GEO.detail[name] && (m.detail || P.forceDetail)) ? GEO.detail[name] : GEO.world[name]; const ps = [];
      for (const r of rings) { let inside = false; for (let q = 0; q < r.length; q += 2) if (r[q] > lon0 - mg && r[q] < lon1 + mg && r[q + 1] > lat0 - mg && r[q + 1] < lat1 + mg) { inside = true; break; }
        if (!inside) continue; const p = new Path2D(); for (let q = 0; q < r.length; q += 2) { const [x, y] = m.proj(r[q], r[q + 1]); if (q) p.lineTo(x, y); else p.moveTo(x, y); } p.closePath(); ps.push(p); }
      if (ps.length) m.paths[name] = ps;
    }
    m.ll = (lon, lat) => m.proj(lon, lat);
    cache[id] = m; return m;
  };
  P.forceDetail = true;
  // draw: sea, then land (colours per country), coast line. z = current camera zoom (keeps strokes thin).
  P.drawMap = (ctx, m, { sea = C.sea, land = C.land, colors = {}, coast = C.land2, z = 1, a = 1, dim = {} } = {}) => {
    ctx.save(); ctx.globalAlpha *= a;
    if (sea) { ctx.fillStyle = sea; ctx.fillRect(-2000, -2000, G.W + 4000, G.H + 4000); }
    for (const [name, ps] of Object.entries(m.paths)) { const col = colors[name] || land; ctx.fillStyle = col; for (const p of ps) ctx.fill(p); }
    ctx.strokeStyle = coast; ctx.lineWidth = 2.2 / z; ctx.lineJoin = 'round';
    for (const ps of Object.values(m.paths)) for (const p of ps) ctx.stroke(p);
    for (const [name, k] of Object.entries(dim)) { if (k <= 0 || !m.paths[name]) continue; ctx.save(); ctx.globalAlpha *= k; ctx.fillStyle = '#0A1030'; for (const p of m.paths[name]) ctx.fill(p); ctx.restore(); }
    ctx.restore();
  };
  P.highlight = (ctx, m, name, color, k = 1, z = 1) => { if (k <= 0 || !m.paths[name]) return; ctx.save(); ctx.globalAlpha *= k; ctx.fillStyle = color; for (const p of m.paths[name]) ctx.fill(p); ctx.strokeStyle = P.dk(color, 0.3); ctx.lineWidth = 3 / z; for (const p of m.paths[name]) ctx.stroke(p); ctx.restore(); };
  // a pin with a label (flat, inverse-zoomed so it stays the same size on screen)
  P.pin = (ctx, x, y, t, at, { label = '', color = C.coral, z = 1, side = 'right', size = 30, t1 = 1e9 } = {}) => {
    const k = P.pop(t, at, 0.4) * P.fout(t, t1, 0.25); if (k <= 0.01) return;
    ctx.save(); ctx.translate(x, y); ctx.scale(1 / z, 1 / z);
    ctx.save(); ctx.scale(k, k); P.fill(ctx, (c) => { c.beginPath(); c.arc(0, -size * 1.2, size * 0.62, Math.PI * 0.82, Math.PI * 2.18); c.lineTo(0, 0); c.closePath(); }, color, { shadow: 0.25, sy: 4 }); P.circ(ctx, 0, -size * 1.2, size * 0.24, C.white); ctx.restore();
    if (label) { const fs = size; const w = P.measure(ctx, label, fs, 'Inter', 800) + fs * 0.9; const lx = side === 'right' ? size * 0.9 : -size * 0.9 - w; const u = P.oc((t - at - 0.2) / 0.3);
      ctx.save(); ctx.globalAlpha *= u * P.fout(t, t1, 0.25); P.rect(ctx, lx, -size * 2.0, w, fs * 1.5, fs * 0.75, C.white, { shadow: 0.2, sy: 4 }); G.text(ctx, label, lx + w / 2, -size * 2.0 + fs * 1.08, { size: fs, fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0 }); ctx.restore(); }
    ctx.restore();
  };
  P.mapLabel = (ctx, s, x, y, { z = 1, size = 34, color = C.ink, a = 1, italic = false, spacing = 0 } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.translate(x, y); ctx.scale(1 / z, 1 / z); G.text(ctx, s, 0, 0, { size, fam: 'Inter', weight: 800, color, align: 'center', alpha: a, boil: 0 }); ctx.restore(); };

  // ---------- SHIPS ----------
  // side view oil tanker. origin = waterline centre, length L. load 0..1 (how deep it sits). o: {hull, deck, name}
  P.tanker = (ctx, x, y, L, t, { a = 1, hull = C.hull, top = C.oil, load = 1, rock = 1, wake = 0, smoke = 0, fire = 0 } = {}) => {
    if (a <= 0.01) return; const H = L * 0.13; const draft = H * (0.35 + 0.35 * load);
    ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + Math.sin(t * 1.3) * 3 * rock); ctx.rotate(Math.sin(t * 0.9) * 0.006 * rock);
    // hull (bow at +x)
    const hp = P.pPoly([[-L / 2, -H + draft], [L / 2 - L * 0.04, -H + draft], [L / 2 + L * 0.02, -H * 0.2 + draft], [L / 2 - L * 0.03, draft], [-L / 2 + L * 0.02, draft]]);
    P.fill(ctx, hp, top);
    ctx.save(); hp(ctx); ctx.clip(); ctx.fillStyle = hull; ctx.fillRect(-L, -H * 0.42 + draft * 0.6, L * 2, H * 2); ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fillRect(-L, -H * 0.42 + draft * 0.6 - 5, L * 2, 5); ctx.restore();
    // deck pipes + manifold
    const dy = -H + draft;
    ctx.fillStyle = C.grey; ctx.fillRect(-L * 0.36, dy - 8, L * 0.78, 8);
    for (let i = 0; i < 6; i++) ctx.fillRect(-L * 0.3 + i * L * 0.12, dy - 18, 6, 12);
    // superstructure at the stern
    const sx = -L / 2 + L * 0.06, sw = L * 0.13, sh = H * 1.6;
    P.rect(ctx, sx, dy - sh, sw, sh, 4, C.deck);
    ctx.fillStyle = C.navy2; for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) ctx.fillRect(sx + 8 + c * (sw - 16) / 4, dy - sh + 12 + r * sh * 0.26, (sw - 16) / 4 - 6, sh * 0.12);
    P.rect(ctx, sx - 8, dy - sh - 10, sw + 16, 12, 4, C.deck);
    P.rect(ctx, sx + sw * 0.3, dy - sh - 52, sw * 0.32, 44, 4, C.coral); P.rect(ctx, sx + sw * 0.3, dy - sh - 52, sw * 0.32, 10, 3, C.oil);
    if (smoke > 0) for (let i = 0; i < 6; i++) { const u = ((t * 0.5 + i / 6) % 1); P.circ(ctx, sx + sw * 0.46 - u * 160, dy - sh - 60 - u * 120, (12 + u * 40), '#5C6276', { a: smoke * (1 - u) * 0.55 }); }
    if (fire > 0) { for (let i = 0; i < 5; i++) { const fx = L * 0.05 + i * L * 0.06, fh = (60 + 40 * Math.sin(t * 9 + i * 2)) * fire; P.fill(ctx, P.pCurve([[fx - 30, dy], [fx - 12, dy - fh * 0.6], [fx, dy - fh], [fx + 14, dy - fh * 0.5], [fx + 30, dy]], true), i % 2 ? C.gold : C.coral, { a: fire }); }
      for (let i = 0; i < 7; i++) { const u = ((t * 0.35 + i / 7) % 1); P.circ(ctx, L * 0.2 - u * 260, dy - 90 - u * 260, 30 + u * 70, '#2B2E3A', { a: fire * (1 - u) * 0.6 }); } }
    // bow wave
    if (wake > 0) { ctx.save(); ctx.globalAlpha *= wake; ctx.strokeStyle = C.white; ctx.lineWidth = 5; ctx.lineCap = 'round'; for (let i = 0; i < 3; i++) { const ph = (t * 1.2 + i / 3) % 1; ctx.globalAlpha = wake * (1 - ph) * 0.8; ctx.beginPath(); ctx.moveTo(L / 2 - ph * L * 0.5, draft + 6); ctx.lineTo(L / 2 - ph * L * 0.5 - 60, draft + 10); ctx.stroke(); } ctx.restore(); }
    ctx.restore();
  };
  // top-down tanker icon for maps (pointing along ang). len in px.
  P.tankerTop = (ctx, x, y, ang, len, { color = C.hull, a = 1, z = 1, lng = false } = {}) => {
    if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(ang); ctx.scale(1 / z, 1 / z); const w = len * 0.2;
    P.fill(ctx, P.pPoly([[-len / 2, -w / 2], [len * 0.32, -w / 2], [len / 2, 0], [len * 0.32, w / 2], [-len / 2, w / 2]]), color, { shadow: 0.25, sy: 3 });
    P.rect(ctx, -len / 2 + 2, -w / 2 + 2, len * 0.16, w - 4, 2, C.deck);
    if (lng) for (let i = 0; i < 3; i++) P.circ(ctx, -len * 0.12 + i * len * 0.17, 0, w * 0.36, C.gas);
    else { ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.fillRect(-len * 0.3, -1.5, len * 0.6, 3); }
    ctx.restore();
  };
  // LNG carrier (side view): four domes
  P.lngShip = (ctx, x, y, L, t, { a = 1 } = {}) => { if (a <= 0.01) return; P.tanker(ctx, x, y, L, t, { a, hull: C.navy3, top: C.white, load: 0.6 }); const H = L * 0.13, dy = -H + H * 0.56;
    ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + Math.sin(t * 1.3) * 3); for (let i = 0; i < 4; i++) { P.fill(ctx, (c) => { c.beginPath(); c.arc(-L * 0.22 + i * L * 0.165, dy, L * 0.07, Math.PI, 0); c.closePath(); }, C.gas); } ctx.restore(); };
  P.warship = (ctx, x, y, L, t, { a = 1, color = '#7C8AA8' } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y + Math.sin(t * 1.5 + 1) * 3); const H = L * 0.1;
    P.fill(ctx, P.pPoly([[-L / 2, -H], [L / 2 - 10, -H], [L / 2 + L * 0.06, -H * 1.3], [L / 2 - L * 0.05, H * 0.4], [-L / 2 + 6, H * 0.4]]), color);
    P.rect(ctx, -L * 0.15, -H * 2.6, L * 0.3, H * 1.7, 4, P.lt(color, 0.15)); P.rect(ctx, -L * 0.05, -H * 3.6, L * 0.08, H, 2, P.lt(color, 0.15)); P.line(ctx, 0, -H * 3.6, 0, -H * 5, color, 4);
    P.rect(ctx, L * 0.22, -H * 1.5, L * 0.1, H * 0.5, 3, P.dk(color, 0.2)); P.line(ctx, L * 0.3, -H * 1.3, L * 0.42, -H * 1.5, P.dk(color, 0.2), 5); ctx.restore(); };

  // ---------- THINGS ----------
  P.barrel = (ctx, x, y, s, { color = C.oil, band = C.gold, a = 1, rot = 0, label = '' } = {}) => { if (a <= 0.01) return; P.at(ctx, x, y, s, rot, () => { ctx.globalAlpha *= a;
    P.rect(ctx, -40, -110, 80, 110, 12, color, { shadow: 0.18, sy: 5 }); P.ell(ctx, 0, -110, 40, 10, P.lt(color, 0.18)); ctx.fillStyle = band; ctx.fillRect(-40, -78, 80, 8); ctx.fillRect(-40, -34, 80, 8);
    P.fill(ctx, P.pCurve([[0, -66], [9, -52], [0, -44], [-9, -52]], true), band); if (label) G.text(ctx, label, 0, -8, { size: 16, fam: 'Inter', weight: 800, color: band, align: 'center', boil: 0 }); }); };
  P.drop = (ctx, x, y, r, { color = C.oil, a = 1 } = {}) => P.fill(ctx, (c) => { c.beginPath(); c.moveTo(x, y - r * 1.6); c.bezierCurveTo(x + r * 0.9, y - r * 0.4, x + r, y + r * 0.2, x, y + r); c.bezierCurveTo(x - r, y + r * 0.2, x - r * 0.9, y - r * 0.4, x, y - r * 1.6); c.closePath(); }, color, { a });
  P.mine = (ctx, x, y, r, t, { a = 1, color = '#3A3F52' } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.rotate(Math.sin(t * 1.1) * 0.08);
    for (let i = 0; i < 8; i++) { const an = i * Math.PI / 4; P.line(ctx, Math.cos(an) * r * 0.8, Math.sin(an) * r * 0.8, Math.cos(an) * r * 1.3, Math.sin(an) * r * 1.3, color, r * 0.16); P.circ(ctx, Math.cos(an) * r * 1.3, Math.sin(an) * r * 1.3, r * 0.12, C.gold); }
    P.circ(ctx, 0, 0, r, color); P.circ(ctx, -r * 0.3, -r * 0.3, r * 0.25, P.lt(color, 0.25)); ctx.restore(); };
  // an insurance certificate / document card
  P.doc = (ctx, x, y, s, t, { title = 'WAR RISK COVER', a = 1, rot = 0, stamp = 0, stampText = 'CANCELLED' } = {}) => { if (a <= 0.01) return; P.at(ctx, x, y, s, rot, () => { ctx.globalAlpha *= a;
    P.rect(ctx, -170, -220, 340, 440, 18, C.white, { shadow: 0.2, sy: 10 }); P.rect(ctx, -170, -220, 340, 80, 18, C.navy);
    G.text(ctx, 'INSURANCE', 0, -168, { size: 30, fam: 'Inter', weight: 800, color: C.gold, align: 'center', boil: 0 });
    G.text(ctx, title, 0, -100, { size: 26, fam: 'Inter', weight: 800, color: C.ink, align: 'center', boil: 0 });
    for (let i = 0; i < 6; i++) P.rect(ctx, -130, -60 + i * 36, 260 - (i % 3) * 50, 12, 6, C.grey2);
    P.circ(ctx, 90, 160, 34, C.gold, { a: 0.9 });
    if (stamp > 0) { const k = lerp(1.8, 1, ease.outCubic(clamp(stamp))); ctx.save(); ctx.rotate(-0.25); ctx.scale(k, k); ctx.globalAlpha *= clamp(stamp * 2); ctx.strokeStyle = C.red; ctx.lineWidth = 8; P.pRR(-160, -40, 320, 80, 10)(ctx); ctx.stroke();
      G.text(ctx, stampText, 0, 20, { size: 50, fam: 'Inter', weight: 800, color: C.red, align: 'center', boil: 0 }); ctx.restore(); } }); };
  P.pump = (ctx, x, y, s, t, { a = 1, price = '', color = C.coral } = {}) => { if (a <= 0.01) return; P.at(ctx, x, y, s, 0, () => { ctx.globalAlpha *= a;
    P.rect(ctx, -90, -340, 180, 340, 18, color, { shadow: 0.2, sy: 8 }); P.rect(ctx, -64, -300, 128, 92, 10, C.navy); if (price) G.text(ctx, price, 0, -236, { size: 44, fam: 'Bungee', weight: 400, color: C.gold, align: 'center', boil: 0 });
    P.rect(ctx, -60, -180, 120, 36, 8, P.dk(color, 0.2)); P.rect(ctx, 90, -250, 30, 60, 8, C.oil); P.stroke(ctx, (c) => { c.beginPath(); c.moveTo(105, -190); c.quadraticCurveTo(170, -60, 120, -20); }, C.oil, 12); P.rect(ctx, -110, -10, 220, 20, 8, C.oil); }); };
  P.truck = (ctx, x, y, s, t, { color = C.teal, a = 1 } = {}) => { if (a <= 0.01) return; P.at(ctx, x, y, s, 0, () => { ctx.globalAlpha *= a; const b = Math.sin(t * 12) * 1.5;
    P.rect(ctx, -150, -150 + b, 200, 120, 10, color, { shadow: 0.15 }); P.rect(ctx, 56, -120 + b, 90, 90, 12, P.dk(color, 0.15)); P.rect(ctx, 80, -110 + b, 50, 36, 6, C.sky);
    for (const wx of [-100, 0, 100]) { P.circ(ctx, wx, -26, 26, C.oil); P.circ(ctx, wx, -26, 10, C.grey); } }); };
  P.plane = (ctx, x, y, s, t, { color = C.white, a = 1, rot = 0 } = {}) => { if (a <= 0.01) return; P.at(ctx, x, y, s, rot, () => { ctx.globalAlpha *= a;
    P.fill(ctx, P.pPoly([[-20, -6], [40, -60], [62, -60], [30, -6]]), C.grey2); P.rect(ctx, -150, -22, 300, 44, 22, color, { shadow: 0.15 }); P.fill(ctx, P.pPoly([[-140, -18], [-160, -80], [-128, -80], [-100, -18]]), C.coral);
    P.fill(ctx, P.pPoly([[-20, 6], [40, 70], [62, 70], [30, 6]]), C.grey2); for (let i = 0; i < 8; i++) P.circ(ctx, -90 + i * 26, -4, 5, C.sky); }); };
  P.tractor = (ctx, x, y, s, t, { color = C.green, a = 1 } = {}) => { if (a <= 0.01) return; P.at(ctx, x, y, s, 0, () => { ctx.globalAlpha *= a; const b = Math.sin(t * 10) * 1.5;
    P.rect(ctx, -90, -120 + b, 150, 70, 10, color); P.rect(ctx, -60, -190 + b, 70, 75, 8, P.dk(color, 0.15)); P.rect(ctx, -50, -180 + b, 50, 40, 6, C.sky); P.rect(ctx, 30, -160 + b, 12, 50, 4, C.oil);
    P.circ(ctx, -55, -50, 50, C.oil); P.circ(ctx, -55, -50, 20, C.gold); P.circ(ctx, 55, -32, 32, C.oil); P.circ(ctx, 55, -32, 12, C.gold); }); };
  P.building = (ctx, x, y, floors, fh, w, { color = C.steel, a = 1, k = 1 } = {}) => { if (a <= 0.01) return; const n = Math.ceil(floors * k); ctx.save(); ctx.globalAlpha *= a;
    for (let i = 0; i < n; i++) { const yy = y - (i + 1) * fh; P.rect(ctx, x - w / 2, yy, w, fh - 4, 4, i % 2 ? color : P.lt(color, 0.08)); for (let j = 0; j < 3; j++) P.rect(ctx, x - w / 2 + 14 + j * (w - 28) / 3, yy + fh * 0.22, (w - 28) / 3 - 12, fh * 0.45, 3, C.sky, { a: 0.85 }); }
    ctx.restore(); };
  P.pool = (ctx, x, y, w, h, fill, { a = 1, color = C.oil } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; P.rect(ctx, x - 12, y - 12, w + 24, h + 24, 18, C.white, { shadow: 0.15 }); P.rect(ctx, x, y, w, h, 10, '#BFE6F6');
    ctx.save(); P.pRR(x, y, w, h, 10)(ctx); ctx.clip(); ctx.fillStyle = color; ctx.fillRect(x, y + h * (1 - fill), w, h * fill + 2); ctx.restore();
    for (let i = 1; i < 8; i++) P.line(ctx, x + 10, y + i * h / 8, x + w - 10, y + i * h / 8, C.white, 3, 0.4, 1, [10, 12]); ctx.restore(); };
  P.planet = (ctx, x, y, r, t, { a = 1 } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y);
    ctx.save(); ctx.rotate(-0.35); ctx.strokeStyle = C.gold; ctx.lineWidth = r * 0.16; ctx.beginPath(); ctx.ellipse(0, 0, r * 1.75, r * 0.5, 0, Math.PI, Math.PI * 2); ctx.stroke(); ctx.restore();
    P.circ(ctx, 0, 0, r, C.sky); P.circ(ctx, -r * 0.3, -r * 0.3, r * 0.35, P.lt(C.sky, 0.35), { a: 0.7 });
    ctx.save(); ctx.rotate(-0.35); ctx.strokeStyle = C.coral; ctx.lineWidth = r * 0.16; ctx.beginPath(); ctx.ellipse(0, 0, r * 1.75, r * 0.5, 0, 0, Math.PI); ctx.stroke(); ctx.restore(); ctx.restore(); };
  P.flag = (ctx, x, y, s, t, colors, { a = 1 } = {}) => { if (a <= 0.01) return; ctx.save(); ctx.globalAlpha *= a; ctx.translate(x, y); ctx.scale(s, s); P.line(ctx, 0, 0, 0, -120, C.ink, 6);
    const n = colors.length; for (let i = 0; i < n; i++) P.fill(ctx, (c) => { c.beginPath(); for (let k = 0; k <= 8; k++) { const xx = k * 10, yy = -118 + i * 54 / n + Math.sin(t * 5 + k * 0.6) * 4 * (k / 8); if (k) c.lineTo(xx, yy); else c.moveTo(xx, yy); } for (let k = 8; k >= 0; k--) { const xx = k * 10, yy = -118 + (i + 1) * 54 / n + Math.sin(t * 5 + k * 0.6) * 4 * (k / 8); c.lineTo(xx, yy); } c.closePath(); }, colors[i]);
    ctx.restore(); };
  P.coin = (ctx, x, y, r, { a = 1 } = {}) => { P.circ(ctx, x, y, r, C.gold, { a, shadow: 0.2, sy: 4 }); P.circ(ctx, x, y, r * 0.74, P.lt(C.gold, 0.2), { a }); G.text(ctx, '$', x, y + r * 0.36, { size: r, fam: 'Inter', weight: 800, color: P.dk(C.gold, 0.35), align: 'center', alpha: a, boil: 0 }); };

  // ---------- CHAPTER CARD + HOOK ----------
  P.chapter = (ctx, t, n, title, t0, t1) => {
    const a = clamp((t - t0) / 0.35), b = clamp((t - (t1 - 0.45)) / 0.45); if (a <= 0 || b >= 1) return;
    ctx.save(); ctx.globalAlpha *= (1 - ease.inCubic(b)); ctx.translate(0, -40 * ease.inCubic(b));
    const d = P.pop(t, t0 + 0.2, 0.4); P.at(ctx, 330, G.H / 2, d, 0, () => { P.circ(ctx, 0, 0, 110, C.gold, { shadow: 0.3, sy: 10 }); G.text(ctx, String(n), 0, 56, { size: 150, fam: 'Bungee', weight: 400, color: C.navy, align: 'center', boil: 0 }); });
    P.ring(ctx, 330, G.H / 2, t, t0 + 0.2, { r: 220, color: C.gold });
    P.write(ctx, 'CHAPTER ' + n, 500, G.H / 2 - 70, t, t0 + 0.25, { size: 44, align: 'left', color: C.coral, weight: 800 });
    const fs = Math.min(112, 112 * (G.W - 500 - 140) / P.measure(ctx, title, 112, 'Inter', 800));
    P.write(ctx, title, 500, G.H / 2 + fs * 0.6, t, t0 + 0.4, { size: fs, align: 'left', color: C.cream, weight: 800, stag: 0.08 });
    P.rect(ctx, 500, G.H / 2 + fs * 0.6 + 34, 260 * P.oc((t - t0 - 0.7) / 0.4), 12, 6, C.coral);
    ctx.restore();
  };
  P.hook = (ctx, h, t, t1) => {
    const a = clamp((t - (h.t - 0.3)) / 0.35), b = 1 - clamp((t - (t1 - 0.4)) / 0.35); const k = Math.min(ease.outCubic(a), b); if (k <= 0.01) return;
    const size = 60, maxW = 1440, sp = P.measure(ctx, ' ', size, 'Inter', 700); const lines = [[]]; let x = 0;
    for (const w of h.words) { const ww = P.measure(ctx, w.w, size, 'Inter', 700); if (x + ww > maxW && x > 0) { lines.push([]); x = 0; } lines[lines.length - 1].push({ ...w, x, ww }); x += ww + sp; }
    const lh = size * 1.3, Hh = lines.length * lh + 60, y0 = 680;
    ctx.save(); ctx.globalAlpha *= k; ctx.translate(0, (1 - k) * 40);
    P.rect(ctx, G.W / 2 - maxW / 2 - 60, y0 - 30, maxW + 120, Hh, 26, C.cream, { shadow: 0.25, sy: 10 });
    P.rect(ctx, G.W / 2 - maxW / 2 - 60, y0 - 30, 16, Hh, 8, C.coral);
    lines.forEach((ln, li) => { const lw = ln.length ? ln[ln.length - 1].x + ln[ln.length - 1].ww : 0; const ox = G.W / 2 - lw / 2;
      for (const w of ln) { const q = clamp((t - w.t) / 0.14); const key = /[?.!:]$/.test(w.w) && li === lines.length - 1;
        G.text(ctx, w.w, ox + w.x, y0 + 42 + li * lh, { size, fam: 'Inter', weight: 700, color: key ? C.coral : C.ink, alpha: 0.2 + 0.8 * q, boil: 0 }); } });
    ctx.restore();
  };
  P.cardShot = (c, n, title, bg, o = {}) => P.shot(S.CH[c].t0, (ctx, t, s) => {
    P.bgNavy(ctx, t); bg(ctx, t, s);
    const h = S.ev[c + '_hook'], up = h ? ease.inOutCubic(clamp((t - (h.t - 0.45)) / 0.5)) : 0;
    ctx.save(); ctx.translate(0, -220 * up); P.chapter(ctx, t, n, title, S.CH[c].t0 + 0.1, S.ev[c + '_cardOut']); ctx.restore();
    if (h) P.hook(ctx, h, t, S.ev[c + '_cardOut']);
  }, Object.assign({ in: { type: 'wipe', dir: 'left', dur: 0.6 } }, o));
})();
