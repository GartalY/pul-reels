// Whyverse trend Short 2026-11-09 — "The first Muslim U.S. senator", sticker-pop flat style.
// Layout on 1080x1920; text inside G.SAFE (x 60..940, y 221..1498). Visuals stay above y≈1340; captions live at y≈1430.
(function () {
  const G = globalThis.G, U = globalThis.U, Data = globalThis.Data, S = globalThis.SCORE, P = globalThis.P;
  const { clamp, lerp, ease } = U;
  const { ev } = S; const C = P.C, CX = P.CX;
  const pop = P.pop, fin = P.fin;
  const SH = globalThis.SHOTS = [];
  const pushZ = (ctx, t, t0, t1, cx = CX, cy = 860, amt = 0.025) => { const z = 1 + amt * clamp((t - t0) / (t1 - t0)); ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy); };
  const ui = (ctx, s, x, y, o = {}) => P.text(ctx, s, x, y, Object.assign({ size: 32, fam: 'Inter', weight: 800, color: C.line }, o));

  // ---------- props ----------
  // Senate chamber: 100 seats in 4 curved rows (19+23+27+31)
  const SEATS = []; { const rows = [19, 23, 27, 31]; rows.forEach((n, r) => { const R = 175 + r * 72; for (let i = 0; i < n; i++) { const a = Math.PI + Math.PI * (i + 0.5) / n; SEATS.push({ r, a, R }); } }); }
  const GOLD_SEAT = SEATS.findIndex((s) => s.r === 3 && Math.abs(s.a - Math.PI * 1.5) < 0.06);
  const chamber = (ctx, cx, cy, t, { fillT = -1, fillD = 2, gold = -1, scale = 1 } = {}) => {
    ctx.save(); ctx.translate(cx, cy); ctx.scale(scale, scale);
    // rostrum
    P.sticker(ctx, -70, 30, 140, 60, C.plum, { r: 14, border: 5, shadow: 6 });
    SEATS.forEach((s, i) => {
      const k = fillT < 0 ? 1 : clamp((t - fillT - (i / SEATS.length) * fillD) / 0.25); if (k <= 0) return;
      const x = Math.cos(s.a) * s.R, y = Math.sin(s.a) * s.R * 0.92;
      const isG = i === GOLD_SEAT && gold >= 0 && t >= gold;
      const r = (isG ? 17 + 4 * Math.sin(t * 5) : 13) * ease.outBack(k, 2);
      ctx.fillStyle = isG ? C.yellow : 'rgba(255,246,232,0.82)'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
      if (isG) { ctx.strokeStyle = C.paper; ctx.lineWidth = 5; ctx.stroke(); }
    });
    ctx.restore();
    if (gold >= 0) { const s = SEATS[GOLD_SEAT]; P.ring(ctx, cx + Math.cos(s.a) * s.R * scale, cy + Math.sin(s.a) * s.R * 0.92 * scale, t, gold, { size: 110 }); P.ring(ctx, cx + Math.cos(s.a) * s.R * scale, cy + Math.sin(s.a) * s.R * 0.92 * scale, t, gold + 0.5, { size: 110 }); }
  };
  const seatXY = (cx, cy, scale = 1) => { const s = SEATS[GOLD_SEAT]; return [cx + Math.cos(s.a) * s.R * scale, cy + Math.sin(s.a) * s.R * 0.92 * scale]; };
  // tear-off calendar card
  const calendar = (ctx, x, y, mon, day, year, k, { w = 250, col = C.coral } = {}) => {
    if (k <= 0) return;
    P.at(ctx, x, y, k, -0.05, () => {
      P.sticker(ctx, -w / 2, -w * 0.55, w, w * 1.1, C.paper, { r: 22, border: 7 });
      ctx.fillStyle = col; P.rr(ctx, -w / 2, -w * 0.55, w, w * 0.32, 22); ctx.fill(); ctx.fillRect(-w / 2, -w * 0.3, w, w * 0.07);
      G.text(ctx, mon, 0, -w * 0.33, { size: w * 0.16, fam: P.FT.title, color: C.paper, align: 'center', boil: 0 });
      G.text(ctx, day, 0, w * 0.22, { size: w * 0.38, fam: P.FT.title, color: C.ink, align: 'center', boil: 0 });
      if (year) G.text(ctx, year, 0, w * 0.45, { size: w * 0.12, fam: 'Inter', weight: 800, color: C.plum, align: 'center', boil: 0 });
    });
  };
  // neutral illustrated portrait card: silhouette bust (no likeness), name plate
  const portrait = (ctx, x, y, s, name, sub, k, { col = C.teal } = {}) => {
    if (k <= 0) return;
    P.at(ctx, x, y, k, 0, () => {
      ctx.scale(s, s);
      P.sticker(ctx, -170, -210, 340, 360, col, { r: 40, border: 10 });
      ctx.save(); P.rr(ctx, -170, -210, 340, 360, 40); ctx.clip();
      ctx.fillStyle = 'rgba(26,20,64,0.9)';
      ctx.beginPath(); ctx.ellipse(0, 150, 150, 120, 0, Math.PI, 0); ctx.fill();          // shoulders
      ctx.fillRect(-36, -10, 72, 60);                                                     // neck
      ctx.beginPath(); ctx.ellipse(0, -60, 78, 92, 0, 0, 7); ctx.fill();                  // head
      ctx.fillStyle = C.paper; ctx.beginPath(); ctx.moveTo(-34, 40); ctx.lineTo(0, 110); ctx.lineTo(34, 40); ctx.closePath(); ctx.fill(); // shirt collar
      ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(-10, 52); ctx.lineTo(10, 52); ctx.lineTo(14, 120); ctx.lineTo(0, 140); ctx.lineTo(-14, 120); ctx.closePath(); ctx.fill(); // tie
      ctx.restore();
      if (name) { P.sticker(ctx, -230, 175, 460, 92, C.ink, { r: 22, border: 7 }); G.text(ctx, name, 0, 236, { size: 46, fam: P.FT.title, color: C.paper, align: 'center', boil: 0 }); }
      if (sub) G.text(ctx, sub, 0, 330, { size: 30, fam: 'Inter', weight: 800, color: C.yellow, align: 'center', boil: 0 });
    });
  };
  // Capitol dome icon (flat)
  const dome = (ctx, x, y, s, col = C.paper) => {
    P.at(ctx, x, y, s, 0, () => {
      ctx.fillStyle = col;
      ctx.fillRect(-150, 40, 300, 30); ctx.fillRect(-120, 0, 240, 44);
      for (let i = -4; i <= 4; i++) ctx.fillRect(i * 26 - 6, -60, 12, 64);
      ctx.fillRect(-120, -72, 240, 16);
      ctx.beginPath(); ctx.ellipse(0, -72, 100, 110, 0, Math.PI, 0); ctx.fill();
      ctx.fillRect(-12, -215, 24, 40); ctx.beginPath(); ctx.arc(0, -222, 14, 0, 7); ctx.fill();
      ctx.fillStyle = 'rgba(26,20,64,0.35)'; for (let i = -3; i <= 3; i++) ctx.fillRect(i * 26 - 3, -150, 6, 70);
    });
  };
  // a closed leather volume (respectful, no text of the book shown)
  const volume = (ctx, x, y, w, h, label, k, rot) => {
    if (k <= 0) return;
    P.at(ctx, x, y, k, rot, () => {
      ctx.fillStyle = 'rgba(0,0,0,0.35)'; P.rr(ctx, -w / 2 + 12, -h / 2 + 12, w, h, 12); ctx.fill();
      ctx.fillStyle = C.paper; P.rr(ctx, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16, 18); ctx.fill();
      ctx.fillStyle = C.leather; P.rr(ctx, -w / 2, -h / 2, w, h, 12); ctx.fill();
      // marbled board panel
      ctx.save(); P.rr(ctx, -w / 2 + 18, -h / 2 + 30, w - 36, h - 60, 8); ctx.clip();
      ctx.fillStyle = '#8A5A3A'; ctx.fillRect(-w, -h, 2 * w, 2 * h);
      ctx.strokeStyle = 'rgba(255,220,170,0.25)'; ctx.lineWidth = 5;
      for (let i = 0; i < 9; i++) { ctx.beginPath(); for (let j = 0; j <= 20; j++) { const yy = -h / 2 + 30 + j * (h - 60) / 20; const xx = -w / 2 + 18 + (i + 0.5) * (w - 36) / 9 + Math.sin(j * 0.8 + i * 1.7) * 10; j ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy); } ctx.stroke(); }
      ctx.restore();
      ctx.fillStyle = C.gold; for (const yy of [-h / 2 + 12, h / 2 - 22]) ctx.fillRect(-w / 2 + 10, yy, w - 20, 10);
      G.text(ctx, label, 0, h / 2 + 64, { size: 34, fam: P.FT.title, color: C.paper, align: 'center', boil: 0 });
    });
  };
  // Egypt flag mini (stripes only)
  const flagEG = (ctx, x, y, w) => { const h = w * 0.66; ctx.fillStyle = C.paper; P.rr(ctx, x - 5, y - 5, w + 10, h + 10, 8); ctx.fill(); ctx.fillStyle = '#CE1126'; ctx.fillRect(x, y, w, h / 3); ctx.fillStyle = '#FFFFFF'; ctx.fillRect(x, y + h / 3, w, h / 3); ctx.fillStyle = '#111'; ctx.fillRect(x, y + 2 * h / 3, w, h / 3); ctx.fillStyle = '#C09300'; ctx.beginPath(); ctx.arc(x + w / 2, y + h / 2, h * 0.1, 0, 7); ctx.fill(); };

  // ================= S1 — Since 1789… never a Muslim senator. Until now. =================
  SH.push({ at: 0, in: 'cut', draw(ctx, t) {
    P.bg(ctx, t);
    ctx.save(); pushZ(ctx, t, 0, ev.s2, CX, 950);
    chamber(ctx, CX, 1110, t, { fillT: 0.0, fillD: 1.6, gold: ev.sync_changed });
    ctx.restore();
    // keywords on screen from frame 0 (search rule)
    P.tag(ctx, 'FIRST MUSLIM U.S. SENATOR', CX, 290, t + 0.5, 0, 1e9, { size: 44, bg: C.yellow });
    P.chip(ctx, 'U.S. SENATE · 100 SEATS', CX, 400, t, ev.s1_senate, 1e9, { size: 32, color: C.dim });
    // year counter 1789 -> 2026
    const y = t < ev.s1_y0 ? 1789 : Math.round(Data.count(t, ev.s1_y0 + 0.3, ev.s1_y1, 1789, 2026, ease.inOutCubic));
    P.at(ctx, CX, 545, pop(t + 0.5, 0), 0, () => P.digits(ctx, String(y), 0, 0, { size: 120, color: y >= 2026 ? C.yellow : C.line, bg: 'rgba(26,20,64,0.75)' }));
    // 0 Muslim senators
    P.tag(ctx, 'MUSLIM SENATORS: 0', CX, 1260, t, ev.s1_zero, ev.sync_changed, { size: 44, bg: C.coral, txt: C.paper });
    P.stamp(ctx, 'UNTIL NOW', CX, 1270, t, ev.sync_changed, { size: 84, rot: -0.05 });
    P.flash(ctx, t, ev.sync_changed);
  } });

  // ================= S2 — Nov 3, Michigan, Abdul El-Sayed =================
  const map = Data.map({ region: [-125, 24, -66, 50], x: 70, y: 720, w: 860, h: 520, pad: 0.02 });
  const [miX, miY] = map.proj(-84.6, 43.6);
  SH.push({ at: ev.s2, in: { type: 'flash', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    // map fades back when the portrait arrives
    const mapA = 1 - 0.75 * fin(t, ev.s2_name, 0.4);
    ctx.save(); ctx.globalAlpha *= mapA;
    Data.drawMap(ctx, map, { land: 'rgba(255,246,232,0.10)', stroke: C.dim, lw: 2.5, highlight: { 'United States of America': 'rgba(62,200,192,0.30)' }, t, t0: ev.s2, dur: 0.8 });
    if (t >= ev.s2_map - 0.05) { const k = pop(t, ev.s2_map, 0.35, 2.5); ctx.fillStyle = C.yellow; ctx.beginPath(); ctx.arc(miX, miY, 18 * k, 0, 7); ctx.fill(); ctx.strokeStyle = C.paper; ctx.lineWidth = 5; ctx.stroke(); P.ring(ctx, miX, miY, t, ev.s2_map, { size: 100 }); P.ring(ctx, miX, miY, t, ev.s2_map + 0.6, { size: 100 }); }
    ctx.restore();
    calendar(ctx, 250, 470, 'NOV', '3', '2026', pop(t, ev.s2_cal, 0.35, 1.8), { w: 230 });
    P.tag(ctx, 'MICHIGAN', 700, 470, t, ev.s2_map, 1e9, { size: 46, bg: C.teal, txt: C.ink, rot: 0.04 });
    // ballot check mark
    if (t >= ev.s2_vote && t < ev.s2_name + 0.3) { const k = pop(t, ev.s2_vote, 0.3, 2); P.at(ctx, 700, 590, k, 0, () => { P.sticker(ctx, -60, -40, 120, 80, C.paper, { r: 12, border: 4, shadow: 5 }); }); P.check(ctx, 700, 590, 60, t, ev.s2_vote + 0.05, C.plum); }
    portrait(ctx, CX, 855, 1, 'ABDUL EL-SAYED', 'SENATOR-ELECT · MICHIGAN', pop(t, ev.s2_name, 0.45, 1.6));
    P.stamp(ctx, 'FIRST IN U.S. HISTORY', CX, 1315, t, ev.sync_first, { size: 58, rot: -0.04 });
    P.flash(ctx, t, ev.sync_first);
  } });

  // ================= S3 — son of Egyptian immigrants; public health; never held office =================
  SH.push({ at: ev.s3, in: { type: 'fade', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    portrait(ctx, 250, 520, 0.62, null, null, pop(t, ev.s3 + 0.05, 0.4, 1.6), { col: C.teal });
    ui(ctx, 'ABDUL EL-SAYED', 650, 470, { size: 40, fam: P.FT.title, alpha: fin(t, ev.s3 + 0.1) });
    ui(ctx, 'WHO IS HE?', 650, 530, { size: 34, color: C.yellow, alpha: fin(t, ev.s3 + 0.2) });
    const card = (y, t0, col, draw, line1, line2) => { const k = pop(t, t0, 0.35, 1.8); if (k <= 0) return; P.at(ctx, CX, y, k, 0, () => { P.sticker(ctx, -400, -85, 800, 170, col, { r: 30, border: 8 }); draw(); G.text(ctx, line1, -150, -6, { size: 42, fam: P.FT.title, color: C.ink, align: 'left', boil: 0 }); G.text(ctx, line2, -150, 46, { size: 30, fam: 'Inter', weight: 800, color: C.ink, align: 'left', boil: 0 }); }); };
    card(840, ev.s3_a, C.paper, () => flagEG(ctx, -360, -46, 140), 'SON OF', 'EGYPTIAN IMMIGRANTS');
    card(1050, ev.s3_b, C.teal, () => { ctx.fillStyle = C.paper; ctx.fillRect(-320, -60, 40, 120); ctx.fillRect(-360, -20, 120, 40); ctx.fillStyle = C.coral; ctx.fillRect(-312, -52, 24, 104); ctx.fillRect(-352, -12, 104, 24); }, 'PUBLIC HEALTH', 'FORMER OFFICIAL');
    card(1260, ev.s3_c, C.yellow, () => { const z = t < ev.sync_zero ? 1 : 1 + 0.25 * Math.exp(-(t - ev.sync_zero) * 6); ctx.save(); ctx.translate(-290, 0); ctx.scale(z, z); G.text(ctx, '0', 0, 42, { size: 120, fam: P.FT.title, color: C.ink, align: 'center', boil: 0 }); ctx.restore(); }, 'ELECTED OFFICE', 'NONE BEFORE THIS RACE');
  } });

  // ================= S4 — 2018: ran for governor, lost the primary =================
  SH.push({ at: ev.s4, in: { type: 'flash', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    // 2026 -> 2018 flip
    const back = t < ev.s4_year ? 2026 : Math.round(Data.count(t, ev.s4_year, ev.s4_year + 0.8, 2026, 2018, ease.outCubic));
    P.at(ctx, CX, 380, pop(t, ev.s4 + 0.05, 0.3, 1.6), 0, () => P.digits(ctx, String(back), 0, 0, { size: 110, color: back === 2018 ? C.coral : C.line, bg: 'rgba(26,20,64,0.75)' }));
    P.tag(ctx, '8 YEARS AGO', CX, 520, t, ev.s4_year + 0.6, 1e9, { size: 36, bg: C.dim });
    // ballot box
    const k = pop(t, ev.s4_ran, 0.4, 1.6);
    if (k > 0) P.at(ctx, CX, 900, k, 0, () => {
      P.sticker(ctx, -230, -120, 460, 300, C.plum, { r: 30, border: 9 });
      ctx.fillStyle = C.ink; P.rr(ctx, -140, -100, 280, 22, 10); ctx.fill();
      // ballot dropping in
      const d = clamp((t - ev.s4_ran - 0.2) / 0.7); if (d < 1) { ctx.save(); ctx.beginPath(); ctx.rect(-240, -600, 480, 510); ctx.clip(); ctx.fillStyle = C.paper; P.rr(ctx, -70, -320 + 230 * ease.inCubic(d), 140, 180, 10); ctx.fill(); ctx.restore(); }
      G.text(ctx, 'VOTE', 0, 80, { size: 70, fam: P.FT.title, color: C.paper, align: 'center', boil: 0 });
    });
    P.tag(ctx, 'MICHIGAN GOVERNOR · PARTY PRIMARY', CX, 1130, t, ev.s4_gov, 1e9, { size: 34, bg: C.paper });
    P.stamp(ctx, 'LOST', CX + 120, 780, t, ev.sync_lost, { size: 110, color: C.coral, rot: 0.12 });
    P.tag(ctx, 'BY DOUBLE DIGITS', CX, 1250, t, ev.s4_dd, 1e9, { size: 42, bg: C.coral, txt: C.paper });
    P.flash(ctx, t, ev.sync_lost, { color: '255,126,95' });
  } });

  // ================= S5 — this time: open seat, beat Mike Rogers =================
  SH.push({ at: ev.s5, in: { type: 'fade', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    // 2018 -> 2026 forward
    const fwd = t < ev.s5_time ? 2018 : Math.round(Data.count(t, ev.s5_time, ev.s5_time + 0.6, 2018, 2026, ease.outCubic));
    P.at(ctx, CX, 330, 1, 0, () => P.digits(ctx, String(fwd), 0, 0, { size: 90, color: fwd === 2026 ? C.yellow : C.line, bg: 'rgba(26,20,64,0.75)' }));
    // two neutral candidate cards (same colours: no side taken)
    const cardC = (x, t0, name, party, win) => { const k = pop(t, t0, 0.35, 1.8); if (k <= 0) return; P.at(ctx, x, 720, k, 0, () => { P.sticker(ctx, -200, -170, 400, 340, C.paper, { r: 30, border: 8 }); ctx.fillStyle = 'rgba(26,20,64,0.9)'; ctx.beginPath(); ctx.arc(0, -60, 60, 0, 7); ctx.fill(); ctx.beginPath(); ctx.ellipse(0, 70, 110, 80, 0, Math.PI, 0); ctx.fill(); G.text(ctx, name, 0, 120, { size: 40, fam: P.FT.title, color: C.ink, align: 'center', boil: 0 }); G.text(ctx, party, 0, 158, { size: 26, fam: 'Inter', weight: 800, color: C.plum, align: 'center', boil: 0 }); }); };
    cardC(280, ev.s5 + 0.1, 'EL-SAYED', 'DEMOCRAT');
    cardC(720, ev.s5_rogers, 'ROGERS', 'REPUBLICAN');
    P.stamp(ctx, 'WON', 280, 480, t, ev.sync_won, { size: 80, color: C.yellow, rot: -0.08 });
    // the open seat
    const ks = pop(t, ev.s5_seat, 0.4, 1.8);
    if (ks > 0) P.at(ctx, CX, 1120, ks, 0, () => {
      ctx.fillStyle = C.plum; P.rr(ctx, -80, -120, 160, 150, 26); ctx.fill(); P.rr(ctx, -110, 20, 220, 50, 16); ctx.fill(); ctx.fillRect(-90, 70, 18, 70); ctx.fillRect(72, 70, 18, 70);
      ctx.strokeStyle = C.paper; ctx.lineWidth = 6; P.rr(ctx, -80, -120, 160, 150, 26); ctx.stroke(); P.rr(ctx, -110, 20, 220, 50, 16); ctx.stroke();
    });
    P.tag(ctx, 'FORMER CONGRESSMAN', 720, 940, t, ev.s5_former, 1e9, { size: 26, bg: C.dim });
    P.tag(ctx, 'OPEN SEAT', CX + 260, 1080, t, ev.s5_seat + 0.15, 1e9, { size: 40, bg: C.teal, rot: 0.05 });
    P.flash(ctx, t, ev.sync_won);
  } });

  // ================= S6 — 2007: Keith Ellison, first Muslim in Congress =================
  const yrX = (y) => lerp(130, 900, (y - 2004) / (2028 - 2004));
  SH.push({ at: ev.s6, in: { type: 'flash', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    // timeline ruler 2004..2028
    const p = ease.outCubic(clamp((t - ev.s6_ruler) / 0.6));
    ctx.save(); ctx.strokeStyle = C.paper; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(110, 420); ctx.lineTo(lerp(110, 920, p), 420); ctx.stroke();
    for (let y = 2005; y <= 2027; y++) { const x = yrX(y); if (x > lerp(110, 920, p)) break; ctx.lineWidth = y % 5 === 0 ? 5 : 3; ctx.beginPath(); ctx.moveTo(x, 420); ctx.lineTo(x, y % 5 === 0 ? 450 : 438); ctx.stroke(); }
    ctx.restore();
    const mark = (y, t0, s, col) => { const k = pop(t, t0, 0.3, 2.2); if (k <= 0) return; P.at(ctx, yrX(y), 420, k, 0, () => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, 0, 20, 0, 7); ctx.fill(); ctx.strokeStyle = C.paper; ctx.lineWidth = 5; ctx.stroke(); }); ui(ctx, s, yrX(y), 370, { size: 30, color: col, alpha: clamp(k) }); };
    mark(2018, ev.s6_ruler + 0.3, '2018', C.coral); mark(2026, ev.s6_ruler + 0.45, '2026', C.yellow);
    mark(2007, ev.s6_2007, '2007', C.teal);
    ui(ctx, 'THE ROAD', 230, 300, { size: 34, color: C.dim, alpha: fin(t, ev.s6_ruler) });
    // Capitol + Ellison card
    ctx.save(); ctx.globalAlpha *= fin(t, ev.s6 + 0.1, 0.5); dome(ctx, CX, 860, 1.25 + 0.03 * clamp((t - ev.s6) / 6), 'rgba(255,246,232,0.32)'); ctx.restore();
    portrait(ctx, CX, 860, 0.85, 'KEITH ELLISON', 'U.S. HOUSE · MINNESOTA', pop(t, ev.s6_name, 0.45, 1.6), { col: C.coral });
    P.stamp(ctx, 'FIRST MUSLIM IN CONGRESS', CX, 1300, t, ev.sync_congress, { size: 52, rot: -0.03 });
    P.flash(ctx, t, ev.sync_congress);
  } });

  // ================= S7 — oath on Thomas Jefferson's Quran (English translation, London 1764) =================
  SH.push({ at: ev.s7, in: { type: 'fade', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    ctx.save(); pushZ(ctx, t, ev.s7, ev.s8, CX, 800, 0.03);
    // soft glow
    const gl = ctx.createRadialGradient(CX, 800, 40, CX, 800, 480); gl.addColorStop(0, P.rgba(C.gold, 0.28 * fin(t, ev.s7_book))); gl.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gl; ctx.fillRect(0, 300, G.W, 1000);
    volume(ctx, 370, 790, 230, 340, 'VOL. I', pop(t, ev.s7_book, 0.4, 1.6), -0.04);
    volume(ctx, 710, 800, 230, 340, 'VOL. II', pop(t, ev.s7_book + 0.15, 0.4, 1.6), 0.04);
    ctx.restore();
    P.tag(ctx, 'THE OATH BOOK', CX, 300, t, ev.s7_quran, 1e9, { size: 44, bg: C.teal });
    P.stamp(ctx, "THOMAS JEFFERSON'S", CX, 430, t, ev.sync_jeff, { size: 56, rot: -0.03 });
    P.tag(ctx, 'ENGLISH TRANSLATION', CX, 1110, t, ev.s7_eng, 1e9, { size: 38, bg: C.paper });
    P.tag(ctx, 'LONDON', 300, 1230, t, ev.s7_london, 1e9, { size: 40, bg: C.coral, txt: C.paper, rot: -0.04 });
    if (t >= ev.s7_1764 - 0.3) P.at(ctx, 700, 1235, pop(t, ev.s7_1764 - 0.3, 0.3, 1.8), 0, () => P.digits(ctx, '1764', 0, 0, { size: 80, color: C.yellow, bg: 'rgba(26,20,64,0.85)' }));
    P.flash(ctx, t, ev.sync_jeff);
  } });

  // ================= S8 — payoff: January 3, 238 years after the Senate first met =================
  SH.push({ at: ev.s8, in: { type: 'flash', dur: 0.25 }, draw(ctx, t) {
    P.bg(ctx, t);
    ctx.save(); pushZ(ctx, t, ev.s8, ev.s9, CX, 1000, 0.03);
    chamber(ctx, CX, 1080, t, { gold: ev.s8_seat });
    // seat label
    if (t >= ev.s8_seat) { const [sx, sy] = seatXY(CX, 1080); P.callout(ctx, 'EL-SAYED', sx, sy, sx + 230, sy - 70, t, ev.s8_seat + 0.1, 1e9, { size: 32 }); }
    ctx.restore();
    calendar(ctx, 250, 450, 'JAN', '3', '2027', pop(t, ev.s8_cal, 0.35, 1.8), { w: 220, col: C.teal });
    P.tag(ctx, 'SWORN IN', 660, 360, t, ev.s8_cal + 0.25, 1e9, { size: 42, bg: C.yellow });
    // 0 -> 238 years
    const v = t < ev.s8_c0 ? 0 : Math.round(Data.count(t, ev.s8_c0, ev.s8_c1, 0, 238, ease.outCubic));
    if (t >= ev.s8_c0 - 0.2) { P.at(ctx, 600, 505, pop(t, ev.s8_c0 - 0.2, 0.3, 1.6), 0, () => P.digits(ctx, String(v), 0, 0, { size: 84, color: v >= 238 ? C.yellow : C.line, bg: 'rgba(26,20,64,0.85)' })); ui(ctx, 'YEARS', 845, 530, { size: 40, fam: P.FT.title, alpha: fin(t, ev.s8_c0) }); }
    P.stamp(ctx, 'SINCE 1789', CX, 1290, t, ev.sync_238, { size: 72, rot: -0.04 });
    P.flash(ctx, t, ev.sync_238);
  } });

  // ================= S9 — Whyverse end card =================
  SH.push({ at: ev.s9, in: { type: 'fade', dur: 0.4 }, draw(ctx, t) {
    P.bg(ctx, t, { drift: 0.6 });
    const k = pop(t, ev.s9 + 0.1, 0.6, 1.4);
    P.at(ctx, CX, 600 + Math.sin(t * 1.4) * 10, k, 0, () => P.planet(ctx, 0, 0, 130, t));
    P.pText(ctx, 'FOLLOW', CX, 930, t, ev.s9_follow, 1e9, { size: 70, color: C.line });
    P.pText(ctx, 'WHYVERSE', CX, 1050, t, ev.s9_follow + 0.15, 1e9, { size: 110, color: C.yellow });
    P.tag(ctx, '▶ Full videos on our YouTube', CX, 1210, t, ev.s9_yt, 1e9, { size: 40, bg: C.red, txt: '#fff' });
    P.text(ctx, 'IG @whyverse___ · TikTok @Whyverse', CX, 1320, { size: 30, fam: 'Inter', weight: 700, color: C.dim, alpha: fin(t, ev.s9_yt + 0.4) });
  } });
})();
