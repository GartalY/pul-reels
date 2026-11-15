
// ---------------------------------------------------------------- world pieces
function nightBg(ctx, t, tint = C.wine) {
  fill(ctx, C.night);
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#05070F'); g.addColorStop(0.55, tint); g.addColorStop(1, '#0A0408');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // slow drifting light beams from two floodlight towers
  [[-60, 0.5], [W + 60, 2.3]].forEach(([x, ph]) => {
    const a = 0.07 + 0.03 * Math.sin(t * 1.7 + ph);
    ctx.save(); ctx.translate(x, s.y - 120); ctx.rotate((x < 0 ? 0.55 : -0.55) + 0.05 * Math.sin(t * 0.8 + ph));
    const lg = ctx.createLinearGradient(0, 0, 0, H * 1.1); lg.addColorStop(0, `rgba(255,248,220,${a * 2})`); lg.addColorStop(1, 'rgba(255,248,220,0)');
    ctx.fillStyle = lg; ctx.beginPath(); ctx.moveTo(-30, 0); ctx.lineTo(30, 0); ctx.lineTo(320, H * 1.1); ctx.lineTo(-320, H * 1.1); ctx.closePath(); ctx.fill(); ctx.restore();
  });
  // drifting dust
  for (let i = 0; i < 40; i++) { const x = (hash01(i, 3) * W + t * 20 * (0.5 + hash01(i, 4))) % W, y = (hash01(i, 5) * H - t * 15) % H;
    ctx.fillStyle = `rgba(255,240,210,${0.08 + 0.1 * hash01(i, 6)})`; ctx.fillRect(x, (y + H) % H, 3, 3); }
}
function flagPT(ctx, x, y, w, k, wave = 0) {
  if (k <= 0) return; const h = w * 2 / 3;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k); ctx.rotate(wave);
  ctx.save(); rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.clip();
  ctx.fillStyle = C.pgreen; ctx.fillRect(-w / 2, -h / 2, w * 0.4, h); ctx.fillStyle = '#DA291C'; ctx.fillRect(-w / 2 + w * 0.4, -h / 2, w * 0.6, h);
  const ex = -w / 2 + w * 0.4, r = h * 0.26;
  ctx.beginPath(); ctx.arc(ex, 0, r, 0, TAU); ctx.lineWidth = Math.max(3, r * 0.22); ctx.strokeStyle = '#FFE000'; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(ex, 0); ctx.ellipse(ex, 0, r * 0.85, r * 0.3, 0.5, 0, TAU); ctx.lineWidth = Math.max(2, r * 0.08); ctx.stroke();
  rrect(ctx, ex - r * 0.45, -r * 0.55, r * 0.9, r * 1.05, r * 0.3); ctx.fillStyle = '#fff'; ctx.fill();
  rrect(ctx, ex - r * 0.32, -r * 0.42, r * 0.64, r * 0.78, r * 0.25); ctx.fillStyle = '#DA291C'; ctx.fill();
  ctx.fillStyle = '#1B3A8C'; for (const [dx, dy] of [[0, -0.18], [-0.17, 0], [0, 0], [0.17, 0], [0, 0.18]]) { ctx.beginPath(); ctx.arc(ex + dx * r, dy * r, r * 0.07, 0, TAU); ctx.fill(); }
  ctx.restore(); rrect(ctx, -w / 2, -h / 2, w, h, 6); outline(ctx, 5); ctx.restore();
}
function flagDK(ctx, x, y, w, k) {
  if (k <= 0) return; const h = w * 0.66;
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k);
  ctx.save(); rrect(ctx, -w / 2, -h / 2, w, h, 6); ctx.clip();
  ctx.fillStyle = '#C8102E'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.fillStyle = '#fff';
  const cw = h * 0.14; ctx.fillRect(-w / 2 + w * 0.36 - cw / 2, -h / 2, cw, h); ctx.fillRect(-w / 2, -cw / 2, w, cw);
  ctx.restore(); rrect(ctx, -w / 2, -h / 2, w, h, 6); outline(ctx, 5); ctx.restore();
}
// football shirt, back view, with a number
function shirt(ctx, x, y, w, num, k, { body = C.pred, trim = C.pgreen, numCol = C.chalk, flip = 1, rot = 0 } = {}) {
  if (k <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(k * w / 300, k * w / 300);
  ctx.beginPath();
  ctx.moveTo(-60, -170); ctx.quadraticCurveTo(0, -150, 60, -170);
  ctx.lineTo(120, -150); ctx.lineTo(175, -70); ctx.lineTo(125, -35); ctx.lineTo(100, -70);
  ctx.lineTo(100, 170); ctx.lineTo(-100, 170); ctx.lineTo(-100, -70); ctx.lineTo(-125, -35); ctx.lineTo(-175, -70); ctx.lineTo(-120, -150); ctx.closePath();
  ctx.fillStyle = body; ctx.fill(); outline(ctx, 7, '#000');
  ctx.save(); ctx.clip(); ctx.fillStyle = trim; ctx.fillRect(-200, -60, 400, 14); ctx.restore();
  ctx.beginPath(); ctx.moveTo(-60, -170); ctx.quadraticCurveTo(0, -150, 60, -170); ctx.lineWidth = 12; ctx.strokeStyle = trim; ctx.stroke();
  ctx.save(); ctx.translate(0, 55); ctx.scale(1, flip);
  ctx.font = font(170, 800, D); ctx.textAlign = 'center'; ctx.lineJoin = 'round'; ctx.lineWidth = 12; ctx.strokeStyle = '#000';
  ctx.strokeText(num, 0, 60); ctx.fillStyle = numCol; ctx.fillText(num, 0, 60); ctx.restore();
  ctx.restore();
}
// Ronaldo as a dark silhouette (rule 1g): the famous wide-legged, arms-down-and-out celebration, quiff hair, no face.
function ronaldo(ctx, x, y, sc, alpha = 1, dashed = false) {
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.globalAlpha *= alpha; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  const shape = (extra, col) => {
    ctx.strokeStyle = col; ctx.fillStyle = col;
    const limb = (pts, w) => { ctx.lineWidth = w + extra; ctx.beginPath(); pts.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py))); ctx.stroke(); };
    limb([[-40, -250], [-120, -120], [-175, 0]], 58); limb([[40, -250], [120, -120], [175, 0]], 58);   // legs wide
    limb([[-190, 4], [-140, 4]], 34 ); limb([[190, 4], [140, 4]], 34);                                   // boots
    limb([[-82, -470], [-150, -360], [-215, -270]], 46); limb([[82, -470], [150, -360], [215, -270]], 46); // arms down-out
    limb([[-215, -270], [-245, -235]], 40); limb([[215, -270], [245, -235]], 40);                       // open hands
    ctx.lineWidth = extra || 1; ctx.beginPath(); ctx.moveTo(-92, -480); ctx.quadraticCurveTo(0, -505, 92, -480); ctx.lineTo(70, -250); ctx.lineTo(-70, -250); ctx.closePath(); ctx.fill(); if (extra) ctx.stroke();
    limb([[0, -500], [0, -525]], 44);
    ctx.beginPath(); ctx.ellipse(0, -580, 46 + extra / 2, 56 + extra / 2, 0, 0, TAU); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-50, -598); ctx.quadraticCurveTo(-54, -664, 0, -668); ctx.quadraticCurveTo(44, -676, 64, -650); ctx.quadraticCurveTo(56, -626, 46, -604); ctx.closePath(); ctx.fill(); if (extra) { ctx.lineWidth = extra; ctx.stroke(); }
  };
  if (dashed) { ctx.globalAlpha *= 0.22; shape(0, C.chalk); }
  else { shape(10, 'rgba(245,195,59,0.8)'); shape(0, C.sil); }
  ctx.restore();
}
// stands full of fans; rise lifts arms, mosaic paints a 7
const SEVEN = ['11111', '00001', '00010', '00010', '00100', '00100', '00100'];
function crowd(ctx, t, top, { arms = 0, mosaic = -1, clap = -1 } = {}) {
  const rows = 9, rh = (H - top) / rows;
  for (let r = 0; r < rows; r++) {
    const y = top + r * rh, n = 12, cw = W / n, off = (r % 2) * cw / 2;
    ctx.fillStyle = r % 2 ? '#14070C' : '#1A0A10'; ctx.fillRect(0, y + rh * 0.55, W, rh * 0.45);
    for (let i = -1; i <= n; i++) {
      const x = i * cw + off + cw / 2, id = r * 40 + i + 5, ph = hash01(id, 11) * TAU;
      const lift = arms * (0.6 + 0.4 * Math.abs(Math.sin(t * 7 + ph)));
      const clapK = clap >= 0 && t > clap ? Math.abs(Math.sin((t - clap) * 11 + ph)) : 0;
      // mosaic card
      const gx = Math.round((x - cx) / cw + 2), gy = r - 1;
      const inSeven = mosaic >= 0 && gy >= 0 && gy < 7 && gx >= 0 && gx < 5 && SEVEN[gy][gx] === '1';
      const mk = inSeven ? clamp((t - mosaic - (gy * 0.04 + gx * 0.02)) / 0.12) : 0;
      const hy = y + rh * 0.45 - lift * 6;
      const col = ['#2A1218', '#33141C', '#241016'][Math.floor(hash01(id, 2) * 3)];
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, hy, rh * 0.2, 0, TAU); ctx.fill();
      ctx.beginPath(); ctx.ellipse(x, hy + rh * 0.42, rh * 0.3, rh * 0.22, 0, Math.PI, 0); ctx.fill();
      if (lift > 0.05) { ctx.strokeStyle = col; ctx.lineWidth = rh * 0.09; ctx.lineCap = 'round';
        const sp2 = clapK ? 0.12 + 0.25 * (1 - clapK) : 0.5;
        ctx.beginPath(); ctx.moveTo(x - rh * 0.22, hy + rh * 0.25); ctx.lineTo(x - rh * sp2, hy - rh * 0.45 * lift);
        ctx.moveTo(x + rh * 0.22, hy + rh * 0.25); ctx.lineTo(x + rh * sp2, hy - rh * 0.45 * lift); ctx.stroke(); }
      const scarf = hash01(id, 7);
      if (scarf > 0.55) { ctx.fillStyle = scarf > 0.8 ? C.pgreen : C.pred; ctx.fillRect(x - rh * 0.22, hy + rh * 0.22, rh * 0.44, rh * 0.09); }
      if (false) { ctx.save(); ctx.translate(x, y + rh * 0.5); ctx.scale(1, mk); ctx.fillStyle = C.gold; ctx.fillRect(-cw * 0.45, -rh * 0.45, cw * 0.9, rh * 0.9);
        ctx.strokeStyle = '#000'; ctx.lineWidth = 3; ctx.strokeRect(-cw * 0.45, -rh * 0.45, cw * 0.9, rh * 0.9); ctx.restore(); }
    }
  }
}

// ---------------------------------------------------------------- persistent bottom bug
function bug(ctx, t) {
  const k = clamp(prog(t, 0.15, 0.5)); if (k <= 0) return;
  const y = s.y + s.h - 30, x0 = cx - 330, w = 660;
  ctx.save(); ctx.globalAlpha = k; ctx.translate(0, (1 - k) * 60);
  rrect(ctx, x0, y - 44, w, 88, 14); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 4, '#000');
  if (t < S.C) {
    flagPT(ctx, x0 + 62, y, 76, 1);
    text(ctx, 'RONALDO', x0 + 118, y + 15, font(42, 800, UI), C.chalk, 'left');
    rrect(ctx, x0 + 380, y - 44, 280, 88, 14); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 4, '#000');
    const q = E.outCubic(prog(t, 0, 0.5)), q2 = E.outCubic(prog(t, T('234'), T('234') + 0.5));
    const str = t < T('234') ? `${Math.round(146 * q)} QOL` : `${Math.round(234 * q2)} OYUN`;
    text(ctx, str, x0 + 520, y + 17, font(46, 800, D), C.ink, 'center');
  } else {
    flagPT(ctx, x0 + 62, y, 76, 1); text(ctx, 'POR', x0 + 112, y + 15, font(42, 800, UI), C.chalk, 'left');
    flagDK(ctx, x0 + w - 62, y, 76, 1); text(ctx, 'DEN', x0 + w - 112, y + 15, font(42, 800, UI), C.chalk, 'right');
    const t4 = T('4:1'); const dk = t < t4 ? '0' : `${Math.min(4, 1 + Math.floor((t - t4) / 0.1))}`;
    const scored = t >= t4;
    rrect(ctx, cx - 110, y - 44, 220, 88, 14); ctx.fillStyle = scored ? C.red : C.panel2; ctx.fill(); outline(ctx, 4, '#000');
    const bmp = scored ? 1 + 0.25 * Math.exp(-(t - t4 - 0.3) * 6) * (t > t4 + 0.3) : 1;
    ctx.save(); ctx.translate(cx, y); ctx.scale(bmp, bmp);
    text(ctx, scored ? `1 : ${dk}` : (t < T('7-ci') ? 'BRAQA' : `${String(Math.min(7, Math.round(7 * prog(t, T('7-ci'), T('7-ci') + 0.4)))).padStart(2, '0')}'`), 0, 16, font(46, 800, D), C.chalk, 'center');
    ctx.restore();
  }
  ctx.restore();
}

// ---------------------------------------------------------------- A: hook 146 / 234
function sHook(ctx, t) {
  nightBg(ctx, t);
  // goal net behind the number, balls flying in
  ctx.save(); ctx.globalAlpha = 0.18; ctx.strokeStyle = C.chalk; ctx.lineWidth = 3;
  for (let i = 0; i < 14; i++) { ctx.beginPath(); ctx.moveTo(s.x - 40 + i * 70, s.y + 260); ctx.lineTo(s.x - 80 + i * 74, s.y + 1180); ctx.stroke(); }
  for (let j = 0; j < 13; j++) { ctx.beginPath(); ctx.moveTo(s.x - 60, s.y + 260 + j * 72); ctx.lineTo(s.x + s.w + 60, s.y + 260 + j * 72); ctx.stroke(); }
  ctx.restore();
  for (let i = 0; i < 7; i++) { const t0 = i * 0.33; const q = prog(t, t0, t0 + 0.45); if (q <= 0 || q >= 1) continue;
    const sx = hash01(i, 21) < 0.5 ? -60 : W + 60, ex = s.x + 120 + hash01(i, 22) * (s.w - 240), ey = s.y + 360 + hash01(i, 23) * 700;
    ctx.save(); ctx.globalAlpha = Math.sin(q * Math.PI) * 0.8; ball(ctx, lerp(sx, ex, E.outCubic(q)), lerp(s.y + 1200, ey, E.outCubic(q)) - Math.sin(q * Math.PI) * 120, 34, q * 12); ctx.restore(); }
  const t2 = T('234');
  ctx.save(); shake(ctx, B(t), B(t < t2 ? 0.02 : t2), 16, 5, 0.25);
  const up = E.inOutCubic(prog(t, t2 - 0.2, t2 + 0.1));
  const k1 = t < 0.35 ? lerp(1.35, 1, E.outBack(prog(t, 0, 0.35))) : 1;
  big(ctx, '146', cx, lerp(s.y + 780, s.y + 610, up), lerp(400, 300, up), C.gold, k1, { sw: 0.06 });
  chip(ctx, 'QOL', cx + lerp(260, 220, up), lerp(s.y + 860, s.y + 660, up), 78, pop(t, T('qol,') - 0.03), { bg: C.chalk, rot: 0.06 });
  const k2 = t >= t2 ? Math.min(1.1, lerp(1.6, 1, E.outBack(prog(t, t2, t2 + 0.3)))) : 0;
  big(ctx, '234', cx, s.y + 990, 300, C.chalk, k2, { sw: 0.06, rot: -0.02 });
  chip(ctx, 'OYUN', cx + 230, s.y + 1040, 70, pop(t, T('oyun.') - 0.03), { bg: C.gold, rot: -0.05 });
  ctx.restore();
  // who: shirt 7 slides in at the top
  const ks = pop(t, 0.1);
  if (ks > 0) { ctx.save(); ctx.translate(cx, s.y + 300); ctx.scale(ks, ks);
    rrect(ctx, -330, -52, 660, 104, 20); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 5, C.gold);
    flagPT(ctx, -250, 0, 104, 1); text(ctx, 'RONALDO · MİLLİ', 40, 18, font(50, 800, UI), C.chalk, 'center'); ctx.restore(); }
}

// ---------------------------------------------------------------- B: Ronaldo leaves → Portugal plays again
function sLeave(ctx, t) {
  nightBg(ctx, t);
  ctx.fillStyle = '#0B2416'; ctx.fillRect(0, s.y + 1080, W, H); // pitch edge
  ctx.fillStyle = 'rgba(246,243,234,0.25)'; ctx.fillRect(0, s.y + 1080, W, 8);
  const tr = T('Ronaldo'), tg = T('gedəndən');
  const k = Math.min(1, sp(t, tr - 0.08, SPRING.snappy));
  const walk = E.inCubic(prog(t, tg, tg + 0.7));
  const rx = cx + walk * 760, ry = s.y + 1060;
  if (t >= tg) ronaldo(ctx, cx, ry, 0.95, clamp((t - tg) * 3), true);
  if (k > 0 && walk < 1) { ctx.save(); ctx.translate(rx, ry); ctx.scale(1, k); ctx.translate(-rx, -ry); ronaldo(ctx, rx, ry, 0.95, 1); ctx.restore(); }
  namePlate(ctx, 'RONALDO', 'kapitan · №7', cx - 170 + walk * 760, s.y + 330, pop(t, tr + 0.1) * clamp(1 - walk * 4), -0.04);
  chip(ctx, 'VİDA', cx + 250, s.y + 300, 64, pop(t, tg + 0.1) * (1 - clamp(prog(t, LN(1) + 1.9, LN(1) + 2.1))), { bg: C.red, fg: C.chalk, rot: 0.06 });
  // Portugal team card arrives where he stood
  const tp = T('Portuqaliya'); const kp = pop(t, tp - 0.05);
  if (kp > 0) { ctx.save(); ctx.translate(cx, s.y + 560); ctx.scale(kp, kp); ctx.rotate(-0.02);
    rrect(ctx, -330, -110, 660, 220, 26); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 6, C.gold);
    flagPT(ctx, -200, 0, 170, 1, 0.03 * Math.sin(t * 5)); text(ctx, 'PORTUQALİYA', 85, 22, font(62, 800, UI), C.chalk, 'center'); ctx.restore(); }
  const ti = T('ilk'); const kS = t >= ti ? Math.min(1.05, lerp(1.7, 1, E.outBack(prog(t, ti, ti + 0.25)))) : 0;
  if (kS > 0) { ctx.save(); ctx.translate(cx + 40, s.y + 820); ctx.rotate(-0.08); ctx.scale(kS, kS);
    rrect(ctx, -300, -95, 600, 190, 20); ctx.fillStyle = 'rgba(8,10,20,0.9)'; ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = C.gold; ctx.stroke();
    text(ctx, 'vidadan sonra', 0, -22, font(46, 700, UI), C.chalk, 'center');
    text(ctx, '1-ci OYUN', 0, 62, font(92, 800, D), C.gold, 'center', 2); ctx.restore(); }
}

// ---------------------------------------------------------------- C: every shirt becomes No. 7
const NUMS = ['10', '8', '23', '5', '11', '17'];
function sShirts(ctx, t) {
  nightBg(ctx, t, C.wine2);
  chip(ctx, 'BRAQA · 14 NOYABR', cx, s.y + 290, 52, pop(t, T('Braqada') - 0.05), { bg: C.chalk, rot: 0.03 });
  const t7 = T('7'), th = T('hamısı');
  for (let i = 0; i < 6; i++) {
    const col = i % 3, row = Math.floor(i / 3);
    const x = cx - 270 + col * 270, y = s.y + 560 + row * 380 + (col === 1 ? 30 : 0);
    const k = Math.min(1.06, sp(t, SHIRT_T(i) - 0.04, SPRING.bouncy));
    const ft = t7 + i * 0.05, fp = prog(t, ft, ft + 0.22);
    const flip = fp <= 0 ? 1 : fp >= 1 ? 1 : Math.cos(fp * Math.PI);
    const num = fp < 0.5 ? NUMS[i] : '7';
    const wob = t > th ? 0.06 * Math.sin((t - th) * 14 + i) * Math.exp(-(t - th) * 3) : 0;
    shirt(ctx, x, y + Math.sin(t * 2 + i) * 6, 240, num, k, { flip: Math.abs(flip) < 0.05 ? 0.05 : flip, numCol: fp >= 0.5 ? C.gold : C.chalk, rot: wob + (i % 2 ? 0.03 : -0.03) });
  }
  chip(ctx, 'HAMISI №7', cx, s.y + 1180, 64, pop(t, T('formada') - 0.05), { bg: C.gold, rot: -0.03 });
}

// ---------------------------------------------------------------- D: minute 7, the stadium applauds
function sClap(ctx, t) {
  nightBg(ctx, t);
  const top = s.y + 520, tst = T('stadion');
  const arms = clamp(prog(t, tst - 0.05, tst + 0.3));
  crowd(ctx, t, top, { arms, clap: T('alqışladı.') });
  const tm = T('Ronaldonu') - 0.05, cw2 = 92, ch2 = 84;
  for (let r = 0; r < 7; r++) for (let c = 0; c < 5; c++) { if (SEVEN[r][c] !== '1') continue;
    const mk = clamp((t - tm - (r * 0.035 + c * 0.02)) / 0.12); if (mk <= 0) continue;
    const x = cx - 2 * cw2 + c * cw2, y = top + 40 + r * ch2;
    ctx.save(); ctx.translate(x, y); ctx.scale(1, mk); rrect(ctx, -cw2 * 0.46, -ch2 * 0.46, cw2 * 0.92, ch2 * 0.92, 8); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 4, '#000'); ctx.restore(); }
  // match clock
  const tc = T('7-ci'); const kc = pop(t, S.D + 0.08);
  const mins = Math.round(lerp(0, 7, E.outCubic(prog(t, tc, tc + 0.45))));
  if (kc > 0) { ctx.save(); ctx.translate(cx, s.y + 330); ctx.scale(kc, kc);
    rrect(ctx, -190, -70, 380, 140, 20); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 5, C.gold);
    ctx.beginPath(); ctx.arc(-105, 0, 36, 0, TAU); ctx.strokeStyle = C.chalk; ctx.lineWidth = 6; ctx.stroke();
    ctx.save(); ctx.translate(-105, 0); ctx.rotate(t * 6); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -26); ctx.stroke(); ctx.restore();
    text(ctx, `${String(mins).padStart(2, '0')}'`, 45, 34, font(100, 800, D), mins >= 7 ? C.gold : C.chalk, 'center'); ctx.restore(); }
  // applause ripples
  const ta = T('alqışladı.');
  for (let i = 0; i < 3; i++) { const q = prog(t, ta + i * 0.18, ta + i * 0.18 + 0.6); if (q <= 0 || q >= 1) continue;
    ctx.save(); ctx.globalAlpha = (1 - q) * 0.7; ctx.strokeStyle = C.gold; ctx.lineWidth = 8;
    ctx.beginPath(); ctx.arc(cx, top + 330, 120 + q * 420, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); ctx.restore(); }
  chip(ctx, 'ALQIŞ', cx + 230, s.y + 470, 58, pop(t, ta - 0.03), { bg: C.chalk, rot: 0.05 });
}

// ---------------------------------------------------------------- E: the banner
function sBanner(ctx, t) {
  nightBg(ctx, t);
  crowd(ctx, t, s.y + 760, { arms: 0.5 });
  const ty = T('yazı'); const q = E.inOutCubic(prog(t, S.E + 0.1, ty + 0.3));
  const bx = s.x - 20, by = s.y + 470, bw = (s.w + 40) * q, bh = 300;
  if (q > 0) {
    ctx.save(); ctx.translate(0, Math.sin(t * 2) * 6);
    ctx.beginPath(); ctx.moveTo(bx, by);
    for (let i = 0; i <= 20; i++) { const x = bx + bw * i / 20; ctx.lineTo(x, by + Math.sin(i * 0.9 + t * 4) * 8); }
    for (let i = 20; i >= 0; i--) { const x = bx + bw * i / 20; ctx.lineTo(x, by + bh + Math.sin(i * 0.9 + t * 4 + 1) * 8); }
    ctx.closePath(); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 6, '#000');
    ctx.save(); ctx.clip();
    ctx.fillStyle = C.pgreen; ctx.fillRect(bx, by - 20, 1200, 40); ctx.fillStyle = C.pred; ctx.fillRect(bx, by + bh - 20, 1200, 40);
    const k1 = pop(t, T('«Sağ') - 0.03), k2 = pop(t, T('kapitan»') - 0.03);
    big(ctx, 'SAĞ OL,', cx - 10, by + 130, 104, C.ink, k1, { stroke: null });
    big(ctx, 'KAPİTAN', cx - 10, by + 245, 116, C.pred, k2, { stroke: null });
    ctx.restore();
    // roll end
    ctx.fillStyle = '#C9C3B4'; rrect(ctx, bx + bw - 22, by - 20, 44, bh + 40, 20); ctx.fill(); outline(ctx, 5, '#000');
    ctx.restore();
  }
  // captain armband
  const ka = pop(t, T('kapitan»') + 0.08);
  if (ka > 0) { ctx.save(); ctx.translate(s.x + s.w - 90, s.y + 380); ctx.rotate(0.12); ctx.scale(ka, ka);
    rrect(ctx, -90, -55, 180, 110, 30); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 6, '#000');
    text(ctx, 'C', 0, 32, font(96, 800, D), C.ink, 'center'); ctx.restore(); }
  chip(ctx, 'TRİBUNADA', cx - 170, s.y + 340, 60, pop(t, S.E + 0.1), { bg: C.panel, fg: C.chalk, edge: C.gold, rot: -0.04 });
}

// ---------------------------------------------------------------- F: Portugal 1-4 Denmark
function sScore(ctx, t) {
  nightBg(ctx, t, '#2A0A10');
  const push = 1 + 0.06 * E.inOutCubic(prog(t, S.F, S.G));
  ctx.save(); ctx.translate(cx, s.y + 720); ctx.scale(push, push);
  const t4 = T('4:1');
  const rows = [['PORTUQALİYA', S.F + 0.12, flagPT, 0, '1'], ['DANİMARKA', T('Danimarka') - 0.08, flagDK, 1, null]];
  rows.forEach(([name, t0, fl, i, fixed]) => {
    const k = Math.min(1, sp(t, t0, SPRING.snappy)); if (k <= 0) return;
    const y = -120 + i * 240, xo = (1 - k) * (i ? W : -W);
    const lost = i === 0 && t > T('qalib');
    ctx.save(); ctx.translate(xo, y); ctx.globalAlpha = lost ? 0.6 : 1;
    rrect(ctx, -430, -95, 660, 190, 18); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 6, '#000');
    fl(ctx, -345, 0, 120, 1);
    text(ctx, name, -265, 22, font(name.length > 10 ? 52 : 60, 800, UI), C.chalk, 'left');
    rrect(ctx, 250, -95, 190, 190, 18); ctx.fillStyle = i ? C.gold : C.panel2; ctx.fill(); outline(ctx, 6, '#000');
    const n = fixed ?? (t < t4 ? '0' : `${Math.min(4, 1 + Math.floor((t - t4) / 0.1))}`);
    const last = i ? (t >= t4 ? t4 + Math.min(3, Math.floor((t - t4) / 0.1)) * 0.1 : -9) : -9;
    const fl2 = Math.exp(-(t - last) * 8) * (t > last);
    ctx.save(); ctx.translate(345, 0); ctx.scale(1 + fl2 * 0.45, 1 + fl2 * 0.45); text(ctx, n, 0, 46, font(132, 800, D), i ? C.ink : C.chalk, 'center'); ctx.restore();
    ctx.restore();
  });
  ctx.restore();
  for (let i = 0; i < 4; i++) { const k = pop(t, t4 + i * 0.1); if (k <= 0) continue;
    ctx.save(); ctx.translate(cx - 240 + i * 160, s.y + 1040); ctx.scale(k, k); ball(ctx, 0, 0, 52, i + t * 2); ctx.restore(); }
  const tw = T('qalib'); const kS = t >= tw ? Math.min(1.05, lerp(1.7, 1, E.outBack(prog(t, tw, tw + 0.25)))) : 0;
  if (kS > 0) { ctx.save(); ctx.translate(cx + 40, s.y + 370); ctx.rotate(-0.1); ctx.scale(kS, kS);
    rrect(ctx, -300, -70, 600, 140, 18); ctx.fillStyle = 'rgba(8,10,20,0.88)'; ctx.fill(); ctx.lineWidth = 10; ctx.strokeStyle = C.red; ctx.stroke();
    text(ctx, 'DANİMARKA QALİB', 0, 28, font(64, 800, D), C.chalk, 'center', 1); ctx.restore(); }
}

// ---------------------------------------------------------------- G: but Portugal are already in the quarter-finals
function sQF(ctx, t) {
  nightBg(ctx, t, '#0E2A1C');
  const ta = T('Amma');
  big(ctx, 'AMMA', cx, s.y + 330, 120, C.gold, pop(t, ta - 0.04), { sw: 0.08, rot: -0.04 });
  const td = T('dörddəbir'), tf = T('finala');
  const kb = Math.min(1, sp(t, S.G - 0.15));
  if (kb > 0) { ctx.save(); ctx.translate(cx, s.y + 800); ctx.scale(kb, kb);
    rrect(ctx, -400, -330, 800, 660, 30); ctx.fillStyle = C.panel; ctx.fill(); outline(ctx, 6, C.gold);
    text(ctx, 'DÖRDDƏBİR FİNAL', 0, -250, font(62, 800, D), t >= td ? C.gold : C.chalk, 'center', 1);
    for (let i = 0; i < 8; i++) { const col = i % 2, row = Math.floor(i / 2); const x = -190 + col * 380, y = -150 + row * 120;
      rrect(ctx, x - 160, y - 42, 320, 84, 14); ctx.setLineDash([12, 10]); ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(246,243,234,0.4)'; ctx.stroke(); ctx.setLineDash([]);
      if (i === 0) continue;
      text(ctx, '?', x, y + 18, font(52, 800, D), 'rgba(246,243,234,0.35)', 'center'); }
    // Portugal flies into slot 1
    const q = E.outBack(prog(t, td, tf + 0.1));
    if (t >= td - 0.02) { const x = lerp(0, -190, q), y = lerp(520, -150, q), sc = lerp(1.8, 1, q);
      ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
      rrect(ctx, -160, -42, 320, 84, 14); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 5, '#000');
      flagPT(ctx, -95, 0, 90, 1); text(ctx, 'POR', 40, 18, font(52, 800, D), C.ink, 'center');
      ctx.restore(); }
    const tc = T('çıxıb.'); const kc = pop(t, tc - 0.03);
    if (kc > 0) { ctx.save(); ctx.translate(-190 + 175, -150); ctx.scale(kc, kc);
      ctx.beginPath(); ctx.arc(0, 0, 40, 0, TAU); ctx.fillStyle = C.pgreen; ctx.fill(); outline(ctx, 5, '#000');
      ctx.strokeStyle = C.chalk; ctx.lineWidth = 11; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-17, 2); ctx.lineTo(-4, 15); ctx.lineTo(19, -13); ctx.stroke(); ctx.restore(); }
    ctx.restore(); }
  chip(ctx, 'ONSUZ DA', cx + 250, s.y + 425, 50, pop(t, T('onsuz') - 0.03), { bg: C.chalk, rot: 0.05 });
}

// ---------------------------------------------------------------- H: payoff + end card
function sEnd(ctx, t) {
  nightBg(ctx, t);
  const t0 = S.H;
  shirt(ctx, cx, s.y + 470, 300, '7', pop(t, t0 - 0.25), { numCol: C.gold, rot: -0.04 + 0.03 * Math.sin(t * 2) });
  text(ctx, '@bilirdinizmi_az', cx, s.y + 760, font(78, 800, D), C.chalk, 'center');
  const kB = pop(t, T('Bəyən') - 0.05), kI = pop(t, T('izlə') - 0.05);
  if (kB > 0) { ctx.save(); ctx.translate(cx - 215, s.y + 930); ctx.scale(kB, kB); ctx.rotate(-0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.chalk; ctx.fill(); outline(ctx, 6, '#04100A');
    const hb = 1 + 0.12 * Math.max(0, Math.sin((t - T('Bəyən')) * 9)) * Math.exp(-(t - T('Bəyən')) * 2);
    ctx.save(); ctx.translate(-110, 4); ctx.scale(hb, hb); ctx.beginPath(); ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -40, -60, 0, -32); ctx.bezierCurveTo(40, -60, 60, -10, 0, 30);
    ctx.fillStyle = '#E8384F'; ctx.fill(); ctx.restore();
    text(ctx, 'BƏYƏN', 40, 24, font(64, 800, D), '#04100A', 'center'); ctx.restore(); }
  if (kI > 0) { ctx.save(); ctx.translate(cx + 215, s.y + 930); ctx.scale(kI, kI); ctx.rotate(0.05);
    rrect(ctx, -195, -75, 390, 150, 40); ctx.fillStyle = C.gold; ctx.fill(); outline(ctx, 6, '#04100A');
    ctx.save(); ctx.translate(-115, 4); ctx.lineWidth = 12; ctx.strokeStyle = '#04100A'; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-26, 0); ctx.lineTo(26, 0); ctx.moveTo(0, -26); ctx.lineTo(0, 26); ctx.stroke(); ctx.restore();
    text(ctx, 'İZLƏ', 40, 24, font(64, 800, D), '#04100A', 'center'); ctx.restore(); }
  chip(ctx, 'hər gün bilmədiyin bir fakt', cx, s.y + 1110, 50, pop(t, T('hər') - 0.05), { bg: C.panel, fg: C.chalk, edge: C.gold, rot: -0.02 });
  const bq = prog(t, t0, END); ball(ctx, lerp(-80, W + 80, bq), s.y + 1250, 40, bq * 30);
}

M.film({
  fonts: [font(40, 800, D), font(40, 800, UI), font(40, 700, UI), font(40, 600, UI)],
  hits: HITS,
  draw(ctx, u, t) {
    if (t < S.B + 0.2) whip(ctx, t, S.B, () => sHook(ctx, t), () => sLeave(ctx, t));
    else if (t < S.C + 0.2) whip(ctx, t, S.C, () => sLeave(ctx, t), () => sShirts(ctx, t));
    else if (t < S.D + 0.2) whip(ctx, t, S.D, () => sShirts(ctx, t), () => sClap(ctx, t));
    else if (t < S.E + 0.2) whip(ctx, t, S.E, () => sClap(ctx, t), () => sBanner(ctx, t));
    else if (t < S.F + 0.2) whip(ctx, t, S.F, () => sBanner(ctx, t), () => sScore(ctx, t));
    else if (t < S.G + 0.2) whip(ctx, t, S.G, () => sScore(ctx, t), () => sQF(ctx, t));
    else whip(ctx, t, S.H, () => sQF(ctx, t), () => sEnd(ctx, t), 0.36);
    if (t < S.H - 0.2) bug(ctx, t);
    captions(ctx, t);
  },
  post(ctx, u, t) { for (let i = 0; i < 300; i++) { ctx.fillStyle = `rgba(255,255,240,${0.02 + 0.03 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
