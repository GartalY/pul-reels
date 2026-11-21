// ---------------------------------------------------------------- helpers
function outline(ctx, w = 6, col = C.ink) { ctx.lineWidth = w; ctx.strokeStyle = col; ctx.lineJoin = 'round'; ctx.stroke(); }
function big(ctx, str, x, y, size, col, k, { stroke = C.ink, rot = 0, fam = D, wt = 800, sw = 0.09 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, fam); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
  if (stroke) { ctx.lineWidth = size * sw; ctx.strokeStyle = stroke; ctx.strokeText(str, 0, 0); }
  ctx.fillStyle = col; ctx.fillText(str, 0, 0); ctx.restore();
}
function chip(ctx, label, x, y, size, k, { bg = C.gold, fg = C.ink, rot = -0.04, edge = C.ink, fam = UI, wt = 800 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k, k);
  ctx.font = font(size, wt, fam); const w = ctx.measureText(label).width + size * 1.0, h = size * 1.55;
  rrect(ctx, -w / 2, -h / 2, w, h, h * 0.3); ctx.fillStyle = bg; ctx.fill(); outline(ctx, 5, edge);
  text(ctx, label, 0, size * 0.36, font(size, wt, fam), fg, 'center'); ctx.restore();
}
function stamp(ctx, label, x, y, size, k, { bg = C.gold, fg = C.ink, rot = -0.07, edge = C.ink } = {}) {
  if (k <= 0) return; const q = Math.min(1, k), sc = lerp(1.8, 1, q) * (k > 1 ? k : 1);
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc);
  ctx.font = font(size, 800, D); const w = ctx.measureText(label).width + size * 1.1, h = size * 1.6;
  rrect(ctx, -w / 2, -h / 2, w, h, size * 0.25); ctx.fillStyle = bg; ctx.fill(); outline(ctx, 7, edge);
  text(ctx, label, 0, size * 0.36, font(size, 800, D), fg, 'center'); ctx.restore();
}
function whip(ctx, t, t0, a, b, dur = 0.3) {
  const p = E.inOutCubic(prog(t, t0 - dur * 0.55, t0 + dur * 0.45));
  if (p <= 0) return a(); if (p >= 1) return b();
  ctx.save(); ctx.translate(-p * W, 0); a(); ctx.restore(); ctx.save(); ctx.translate((1 - p) * W, 0); b(); ctx.restore();
}
function flagAZ(ctx, x, y, w, k, wave = 0) {
  if (k <= 0) return; const h = w / 2;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(wave);
  ctx.save(); rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.clip();
  ctx.fillStyle = '#00B5E2'; ctx.fillRect(-w / 2, -h / 2, w, h / 3); ctx.fillStyle = '#EF3340'; ctx.fillRect(-w / 2, -h / 6, w, h / 3);
  ctx.fillStyle = '#509E2F'; ctx.fillRect(-w / 2, h / 6, w, h / 3);
  const r = h * 0.12; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-r * 0.25, 0, r, 0, TAU); ctx.fill();
  ctx.fillStyle = '#EF3340'; ctx.beginPath(); ctx.arc(r * 0.05, 0, r * 0.8, 0, TAU); ctx.fill();
  ctx.fillStyle = '#fff'; ctx.beginPath();
  for (let i = 0; i < 16; i++) { const a = (i / 16) * TAU, rr = i % 2 ? r * 0.28 : r * 0.62; ctx.lineTo(r * 1.15 + Math.cos(a) * rr, Math.sin(a) * rr); }
  ctx.closePath(); ctx.fill(); ctx.restore();
  rrect(ctx, -w / 2, -h / 2, w, h, 6); outline(ctx, 5); ctx.restore();
}

function envelope(ctx, x, y, w) {
  const h = w * 0.68; ctx.save(); ctx.translate(x, y);
  rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 4);
  ctx.beginPath(); ctx.moveTo(-w / 2 + 3, -h / 2 + 3); ctx.lineTo(0, h * 0.08); ctx.lineTo(w / 2 - 3, -h / 2 + 3); outline(ctx, 4); ctx.restore();
}

// ---------------------------------------------------------------- captions (word by word, top)
function captions(ctx, t) {
  const L = TIMING.lines; const li = L.findIndex((l, i) => t >= l.t0 - 0.05 && t < (L[i + 1] ? L[i + 1].t0 - 0.05 : END)); if (li < 0) return;
  const all = L[li].words.filter((w) => w.w !== '—'), ws = all.filter((w) => t >= w.t - 0.03); if (!ws.length) return;
  let size = 100; const gap = 34;
  const wOf = (arr, sz) => { ctx.font = font(sz, 800, D); return arr.reduce((a, w) => a + ctx.measureText(w.w).width, 0) + gap * (arr.length - 1); };
  let n = 3; for (let i = 0; i < all.length; i += 3) if (wOf(all.slice(i, i + 3), 84) > s.w - 30) n = 2;
  const start = Math.floor((ws.length - 1) / n) * n, chunk = all.slice(start, start + n), shown = ws.slice(start);
  const meas = (sz) => { ctx.font = font(sz, 800, D); return chunk.map((w) => ctx.measureText(w.w).width); };
  let widths = meas(size), total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1);
  if (total > s.w - 30) { size = Math.floor(size * (s.w - 30) / total); widths = meas(size); total = widths.reduce((a, b) => a + b, 0) + gap * (chunk.length - 1); }
  let x = cx - total / 2; const y = s.y + 100;
  shown.forEach((w, i) => { const k = sp(t, w.t - 0.03, SPRING.bouncy), sc = Math.min(1.1, 0.6 + 0.4 * k);
    ctx.save(); ctx.translate(x + widths[i] / 2, y); ctx.scale(sc, sc); ctx.font = font(size, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round';
    ctx.lineWidth = size * 0.2; ctx.strokeStyle = C.ink; ctx.strokeText(w.w, 0, 0); ctx.fillStyle = w.key ? C.gold : '#FFFFFF'; ctx.fillText(w.w, 0, 0);
    ctx.restore(); x += widths[i] + gap; });
}



// ---------------------------------------------------------------- world: cream map paper
function world(ctx, t, { tint = 0, zoom = 1 } = {}) {
  fill(ctx, C.paper);
  ctx.save(); M.zoomAbout(ctx, zoom, W / 2, H / 2);
  ctx.strokeStyle = 'rgba(125,114,98,0.18)'; ctx.lineWidth = 3;
  const drift = (t * 18) % 120;
  for (let i = -2; i < 20; i++) { const y = i * 120 + drift; ctx.beginPath(); ctx.moveTo(-50, y); ctx.quadraticCurveTo(W / 2, y - 60, W + 50, y); ctx.stroke(); }
  for (let i = -1; i < 12; i++) { const x = i * 120 + drift * 0.5; ctx.beginPath(); ctx.moveTo(x, -50); ctx.quadraticCurveTo(x + 50, H / 2, x, H + 50); ctx.stroke(); }
  // a few soft land blobs
  ctx.fillStyle = `rgba(214,195,152,${0.45 + 0.2 * tint})`;
  for (let i = 0; i < 5; i++) { const x = hash01(i, 11) * W, y = hash01(i, 12) * H, r = 120 + 140 * hash01(i, 13);
    ctx.beginPath(); for (let j = 0; j < 14; j++) { const a = j / 14 * TAU, rr = r * (0.75 + 0.35 * hash01(i * 20 + j, 14)); ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr * 0.7); } ctx.closePath(); ctx.fill(); }
  ctx.restore();
}

// ---------------------------------------------------------------- persistent progress strip
function bug(ctx, t) {
  const k = clamp(prog(t, 0.2, 0.55)); if (k <= 0) return;
  const y = s.y + s.h - 30, x0 = cx - 420, w = 840;
  ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 60);
  rrect(ctx, x0, y - 42, w, 84, 16); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 4, C.red);
  const xs = [x0 + 85, x0 + 250, x0 + 420, x0 + 590, x0 + 755];
  let last = -1; STOPS.forEach(([, ft], i) => { if (t >= ft) last = i; });
  STOPS.forEach(([lab, ft], i) => {
    const on = t >= ft, bmp = on ? 1 + 0.4 * Math.exp(-(t - ft) * 7) : 1;
    ctx.save(); ctx.translate(xs[i], y); ctx.scale(bmp, bmp);
    text(ctx, lab, 0, 13, font(34, 800, D), i === last ? C.gold : on ? C.chalk : 'rgba(255,253,246,0.3)', 'center'); ctx.restore();
    if (i < 4) { ctx.beginPath(); ctx.arc((xs[i] + xs[i + 1]) / 2, y, 5, 0, TAU); ctx.fillStyle = 'rgba(255,253,246,0.45)'; ctx.fill(); }
  });
  ctx.restore();
}
function starPath(ctx, x, y, r) {
  ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.4 : r; ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } ctx.closePath();
}
function pin(ctx, x, y, k, col, label, sc = 1) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k * sc, k * sc);
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-46, -50, -46, -110, 0, -110); ctx.bezierCurveTo(46, -110, 46, -50, 0, 0); ctx.fillStyle = col; ctx.fill(); outline(ctx, 6);
  ctx.beginPath(); ctx.arc(0, -72, 15, 0, TAU); ctx.fillStyle = C.chalk; ctx.fill();
  if (label) { ctx.font = font(46, 800, D); const w = ctx.measureText(label).width + 40;
    rrect(ctx, -w / 2, 18, w, 66, 12); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 5); text(ctx, label, 0, 66, font(46, 800, D), C.ink, 'center'); }
  ctx.restore();
}
function calendar(ctx, x, y, w, k, label, big, col = C.red) {
  if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(-0.03);
  const h = w * 0.8;
  rrect(ctx, -w / 2, -h / 2, w, h, 24); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 7);
  ctx.save(); rrect(ctx, -w / 2, -h / 2, w, h, 24); ctx.clip(); ctx.fillStyle = col; ctx.fillRect(-w / 2, -h / 2, w, h * 0.28); ctx.restore();
  for (const dx of [-w * 0.27, w * 0.27]) { rrect(ctx, dx - 12, -h / 2 - 26, 24, 56, 9); ctx.fillStyle = C.ink; ctx.fill(); }
  text(ctx, label, 0, -h / 2 + h * 0.19, font(w * 0.1, 800, UI), C.chalk, 'center');
  text(ctx, big, 0, h * 0.3, font(w * 0.3, 800, D), C.ink, 'center');
  ctx.restore();
}
function plate(ctx, label, x, y, k, col, size = 42) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.font = font(size, 800, D); const w = ctx.measureText(label).width + 50;
  rrect(ctx, -w / 2, -size * 0.9, w, size * 1.8, 12); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 5, col);
  text(ctx, label, 0, size * 0.36, font(size, 800, D), C.chalk, 'center'); ctx.restore();
}
