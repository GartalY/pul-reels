// Saturn rings motion reel — every visual is a pure function of t, timed from score.js.
(function () {
  const U = globalThis.U, G = globalThis.G, S = globalThis.SCORE, Studio = globalThis.Studio, Data = globalThis.Data;
  const { ev } = S; const { clamp, lerp, ease, pulse } = U;
  const W = G.W, H = G.H;
  const GOLD = '#ffc43d', INK = '#0e111c', WHITE = '#fafafc';
  const BK = 'IDBlack', BD = 'IDBold', SB = 'IDSemi';
  let IMG = null;

  const txt = (ctx, s, x, y, o) => G.text(ctx, s, x, y, Object.assign({ boil: 0 }, o));
  function wrap(ctx, s, size, fam, maxW) {
    const out = []; let line = '';
    for (const w of s.split(' ')) { const tryL = line ? line + ' ' + w : w;
      if (line && G.measure(ctx, tryL, size, fam, 700) > maxW) { out.push(line); line = w; } else line = tryL; }
    if (line) out.push(line); return out;
  }
  const fmt = (v) => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  function sky(ctx, t) {
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#04050f'); g.addColorStop(0.55, '#080b22'); g.addColorStop(1, '#0d1030');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 240; i++) {
      const x = (U.hash(i, 1) * W - t * (4 + 10 * U.hash(i, 6))) % W, y = U.hash(i, 2) * H * 0.95, r = 0.7 + 2.0 * Math.pow(U.hash(i, 3), 6);
      const tw = 0.55 + 0.45 * Math.sin(t * (1 + U.hash(i, 4) * 3) + i);
      ctx.globalAlpha = (0.2 + 0.7 * U.hash(i, 5)) * tw; ctx.fillStyle = '#e8eeff'; ctx.beginPath(); ctx.arc((x + W) % W, y, r, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // the real Cassini photo: big during the hook, shrinks to the top during beat 1, fades out for beat 2
  function photo(ctx, t) {
    if (!IMG) return;
    const k = ease.inOutCubic(clamp((t - ev.b1) / 0.9));
    const w = lerp(1320, 600, k) * (1 + 0.035 * clamp(t / ev.b1)) , h = w * IMG.height / IMG.width;
    const cx = 540, cy = lerp(800, 440, k);
    const a = 1 - clamp((t - ev.b2) / 0.5);
    if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'lighten';
    ctx.translate(cx, cy); ctx.rotate(-0.02 + 0.01 * Math.sin(t * 0.4));
    ctx.drawImage(IMG, -w / 2, -h / 2, w, h); ctx.restore();
  }

  function hook(ctx, t) {
    const a = 1 - ease.inOutQuad(clamp((t - ev.b1 + 0.05) / 0.3));
    if (a <= 0) return;
    S.HOOK.forEach((ln, k) => {
      const key = k === 0, sc = key ? 1 + 0.04 * Math.sin(t * 5) : 1;
      ctx.save(); ctx.translate(540, 300 + k * 108); ctx.scale(sc, sc);
      txt(ctx, ln, 0, 0, { size: key ? 96 : 84, fam: BK, weight: 900, color: key ? GOLD : WHITE, align: 'center', alpha: a, stroke: 'rgba(0,0,0,0.55)', strokeW: 8 });
      ctx.restore();
    });
  }

  // beat 1: two bars — rings 282 000 km vs Earth–Moon 384 400 km (same scale: 820 px = 384 400 km)
  function bars(ctx, t) {
    const a = clamp((t - ev.b1 - 0.4) / 0.4) * (1 - clamp((t - ev.b2) / 0.4)); if (a <= 0) return;
    const x0 = 70, full = 820, ring = full * 282000 / 384400;
    ctx.save(); ctx.globalAlpha = a;
    txt(ctx, 'Saturnun halqaları', x0, 712, { size: 38, fam: BD, weight: 700, color: '#cfd6f5' });
    const g = ease.outCubic(clamp((t - ev.b1 - 0.5) / (ev.ringLand - ev.b1 - 0.5)));
    ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.beginPath(); ctx.roundRect(x0, 730, full, 34, 17); ctx.fill();
    ctx.save(); ctx.shadowColor = 'rgba(255,196,61,0.8)'; ctx.shadowBlur = 18; ctx.fillStyle = GOLD;
    ctx.beginPath(); ctx.roundRect(x0, 730, Math.max(34, ring * g), 34, 17); ctx.fill(); ctx.restore();
    for (const k of S.ticks) { const d = t - k.t; if (d < 0) continue; const fx = x0 + ring * (k.i + 1) / 8, fl = 1 - clamp(d / 0.3);
      if (fl > 0) { ctx.fillStyle = `rgba(255,240,180,${0.8 * fl})`; ctx.beginPath(); ctx.arc(Math.min(fx, x0 + ring * g), 747, 10 + 22 * fl, 0, 7); ctx.fill(); } }
    const land = t >= ev.ringLand ? pulse(t, ev.ringLand, 7) : 0;
    const v = 282000 * g; const sz = 56 * (1 + 0.2 * land);
    txt(ctx, fmt(Math.round(v / 1000) * 1000) + ' km', 890, 714, { size: sz, fam: BK, weight: 900, color: GOLD, align: 'right' });
    const b = clamp((t - ev.b1 - 0.9) / 0.4);
    ctx.globalAlpha = a * b;
    txt(ctx, 'Yer → Ay: 384 400 km', x0, 830, { size: 38, fam: BD, weight: 700, color: '#cfd6f5' });
    ctx.fillStyle = 'rgba(160,180,255,0.55)'; ctx.beginPath(); ctx.roundRect(x0, 848, full * ease.outCubic(b), 34, 17); ctx.fill();
    const c = clamp((t - ev.ringLand) / 0.35);
    if (c > 0) { const s = ease.outBack(c, 2.2); ctx.save(); ctx.globalAlpha = a; ctx.translate(x0 + ring, 776); ctx.scale(s, s);
      ctx.strokeStyle = GOLD; ctx.lineWidth = 4; ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.moveTo(0, -12); ctx.lineTo(0, 106); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = GOLD; ctx.beginPath(); ctx.roundRect(14, 0, 116, 50, 25); ctx.fill();
      txt(ctx, '≈ ¾', 72, 37, { size: 40, fam: BK, weight: 900, color: INK, align: 'center' }); ctx.restore(); }
    ctx.restore();
  }

  // beat 2: a drawn Saturn turns edge-on until the rings are a line; magnifier: 10 m vs a 3-storey building
  function edgeOn(ctx, t) {
    const a = clamp((t - ev.b2 + 0.1) / 0.5) * (1 - clamp((t - ev.b3) / 0.4)); if (a <= 0) return;
    const cx = 540, cy = 560, R = 150, RO = 420, RI = 250;
    const tilt = lerp(0.34, 0.006, ease.inOutCubic(clamp((t - ev.b2) / (ev.thin - ev.b2))));
    ctx.save(); ctx.globalAlpha = a;
    const ring = (back) => { ctx.save(); ctx.beginPath(); if (back) ctx.rect(0, 0, W, cy); else ctx.rect(0, cy, W, H); ctx.clip();
      for (let i = 0; i < 26; i++) { const f = i / 25, rr = lerp(RI, RO, f), gap = f > 0.62 && f < 0.68;
        ctx.strokeStyle = gap ? 'rgba(0,0,0,0)' : `rgba(${215 - 40 * f},${195 - 40 * f},${150 - 30 * f},${0.55 + 0.3 * U.hash(i, 7)})`;
        ctx.lineWidth = (RO - RI) / 25 * Math.max(tilt * 2.2, 0.08) + 1.2; ctx.beginPath(); ctx.ellipse(cx, cy, rr, Math.max(rr * tilt, 0.6), -0.08, 0, 7); ctx.stroke(); }
      ctx.restore(); };
    ring(true);
    const gp = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R); gp.addColorStop(0, '#f3e3b8'); gp.addColorStop(0.65, '#d1b47a'); gp.addColorStop(1, '#7d6440');
    ctx.fillStyle = gp; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip();
    for (let k = 0; k < 7; k++) { ctx.fillStyle = `rgba(150,110,60,${0.12 + 0.1 * U.hash(k, 3)})`; ctx.fillRect(cx - R, cy - R + k * R * 0.3 + 10, 2 * R, 10 + 14 * U.hash(k, 4)); }
    ctx.restore();
    ring(false);
    // magnifier
    const m = ease.outBack(clamp((t - ev.thin) / 0.45), 1.6);
    if (m > 0) {
      const ex = cx + RO * 0.93, ey = cy - 30, mx = 700, my = 330, mr = 175 * m;
      ctx.strokeStyle = 'rgba(255,196,61,0.7)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(ex, ey + 30); ctx.lineTo(mx + 40, my + mr * 0.9); ctx.stroke();
      ctx.fillStyle = 'rgba(255,196,61,0.9)'; ctx.beginPath(); ctx.arc(ex, ey + 30, 8, 0, 7); ctx.fill();
      ctx.save(); ctx.beginPath(); ctx.arc(mx, my, mr, 0, 7); ctx.fillStyle = '#0a0d26'; ctx.fill(); ctx.clip();
      // ring slab seen from the side (10 m tall)
      const slabH = 80, sy = my + 30;
      const gs = ctx.createLinearGradient(0, sy - slabH, 0, sy); gs.addColorStop(0, '#e6d3a2'); gs.addColorStop(1, '#9c8559');
      ctx.fillStyle = gs; ctx.fillRect(mx - 200, sy - slabH, 400, slabH);
      for (let i = 0; i < 40; i++) { ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.beginPath(); ctx.arc(mx - 200 + U.hash(i, 8) * 400, sy - slabH + U.hash(i, 9) * slabH, 1.5 + 3 * U.hash(i, 10), 0, 7); ctx.fill(); }
      // building pops in on 'house'
      const hb = ease.outBack(clamp((t - ev.house) / 0.35), 2);
      if (hb > 0) { ctx.save(); ctx.translate(mx + 40, sy); ctx.scale(1, hb);
        ctx.fillStyle = '#5a6aa8'; ctx.fillRect(0, -slabH, 70, slabH);
        ctx.fillStyle = '#ffd77a'; for (let f = 0; f < 3; f++) for (let w = 0; w < 2; w++) ctx.fillRect(10 + w * 32, -slabH + 6 + f * 26, 18, 14);
        ctx.restore(); }
      ctx.restore();
      ctx.strokeStyle = GOLD; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(mx, my, mr, 0, 7); ctx.stroke();
      if (hb > 0) { const s = 1 + 0.2 * pulse(t, ev.house, 7);
        ctx.save(); ctx.translate(mx - 50, my - 72); ctx.scale(s, s);
        txt(ctx, '10 m', 0, 0, { size: 60, fam: BK, weight: 900, color: GOLD, align: 'center', stroke: 'rgba(0,0,0,0.7)', strokeW: 8 }); ctx.restore(); }
    }
    ctx.restore();
  }

  // beat 3: ice particles of every size drift past
  function ice(ctx, t) {
    const a = clamp((t - ev.b3) / 0.5); if (a <= 0) return;
    const u = t - ev.b3;
    ctx.save(); ctx.globalAlpha = a;
    const rock = (x, y, r, seed) => { ctx.beginPath(); for (let i = 0; i < 12; i++) { const an = i / 12 * 6.283 + u * 0.2 * (U.hash(seed, 1) - 0.5), rr = r * (0.75 + 0.35 * U.hash(seed, i + 2));
        i ? ctx.lineTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr) : ctx.moveTo(x + Math.cos(an) * rr, y + Math.sin(an) * rr); } ctx.closePath();
      const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r * 1.1); g.addColorStop(0, '#f4fbff'); g.addColorStop(0.6, '#b9d4ea'); g.addColorStop(1, '#5d7a99');
      ctx.fillStyle = g; ctx.fill(); };
    for (const [i, p] of S.ice.entries()) { const x = W + 80 - ((p.ph * (W + 160) + u * p.sp) % (W + 160)); rock(x, p.y, p.r, i); }
    // two labelled pieces
    const gx = 300 - u * 20, gy = 470, bx = 760 - u * 28, by = 700;
    rock(bx, by, 120, 99);
    ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(gx, gy, 3, 0, 7); ctx.fill();
    const l1 = clamp((u - 0.8) / 0.4), l2 = clamp((u - 2.2) / 0.4);
    if (l1 > 0) { ctx.globalAlpha = a * l1; ctx.strokeStyle = GOLD; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(gx, gy, 22, 0, 7); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(gx, gy - 22); ctx.lineTo(gx, gy - 70); ctx.stroke();
      txt(ctx, 'qum dənəsindən kiçik', gx - 40, gy - 86, { size: 40, fam: BD, weight: 700, color: GOLD, stroke: 'rgba(0,0,0,0.7)', strokeW: 6 }); }
    if (l2 > 0) { ctx.globalAlpha = a * l2; const s = ease.outBack(l2, 2);
      ctx.save(); ctx.translate(bx - 30, by - 150); ctx.scale(s, s);
      txt(ctx, 'dağ boyda', 0, 0, { size: 56, fam: BK, weight: 900, color: GOLD, align: 'center', stroke: 'rgba(0,0,0,0.7)', strokeW: 8 }); ctx.restore(); }
    ctx.restore();
  }

  // beat text: same safe-zone design as factgen.py reel (pill at y 960, dark box 40..920, text x 70, Bold 56)
  function beatText(ctx, t) {
    for (let k = 0; k < 3; k++) {
      const t0 = S.BSTART[k], t1 = k < 2 ? S.BSTART[k + 1] : S.DURATION + 1, sb = t - t0;
      if (sb < 0 || t > t1) continue;
      let a = ease.inOutQuad(clamp(sb / 0.25)); if (k < 2) a *= 1 - ease.inOutQuad(clamp((t - (t1 - 0.25)) / 0.25));
      const lines = wrap(ctx, S.BEATS[k], 56, BD, 820);
      ctx.save(); ctx.globalAlpha = a;
      ctx.fillStyle = 'rgba(14,17,28,0.78)'; ctx.beginPath(); ctx.roundRect(40, 1040, 880, 30 + lines.length * 70 + 30, 28); ctx.fill();
      const p = k === 0 ? 'BİLİRDİNİZMİ?' : `${k + 1}/3`, pw = G.measure(ctx, p, 40, BK, 900) + 56;
      ctx.fillStyle = GOLD; ctx.beginPath(); ctx.roundRect(70, 960, pw, 74, 37); ctx.fill();
      txt(ctx, p, 98, 1011, { size: 40, fam: BK, weight: 900, color: INK });
      lines.forEach((ln, i) => txt(ctx, ln, 70, 1060 + (1 - a) * 40 + i * 70 + 54, { size: 56, fam: BD, weight: 700, color: WHITE }));
      ctx.restore();
    }
  }

  function chrome(ctx, t) {
    txt(ctx, '@bilirdinizmi_az', 540, 140, { size: 34, fam: SB, weight: 600, color: WHITE, align: 'center' });
    const c = clamp((t - ev.cta) / 0.3);
    if (c > 0) { const msg = 'Hər gün yeni fakt — izlə!', w = G.measure(ctx, msg, 42, BD, 700) + 60;
      ctx.save(); ctx.globalAlpha = c; ctx.fillStyle = GOLD; ctx.beginPath(); ctx.roundRect(70, 1470, w, 80, 36); ctx.fill();
      txt(ctx, msg, 100, 1524, { size: 42, fam: BD, weight: 700, color: INK }); ctx.restore(); }
    ctx.fillStyle = GOLD; ctx.fillRect(0, H - 8, W * t / S.DURATION, 8);
  }

  Studio.film({
    async init() {
      await Studio.loadFont(BK, 'assets/InterDisplay-Black.otf', 900);
      await Studio.loadFont(BD, 'assets/InterDisplay-Bold.otf', 700);
      await Studio.loadFont(SB, 'assets/InterDisplay-SemiBold.otf', 600);
      IMG = await Studio.loadImage('assets/saturn.jpg');
    },
    draw(ctx, t) {
      sky(ctx, t); photo(ctx, t); bars(ctx, t); edgeOn(ctx, t); ice(ctx, t);
      for (const t0 of [ev.ringLand, ev.house]) { const fl = t >= t0 ? 0.25 * Math.exp(-(t - t0) * 10) : 0;
        if (fl > 0.01) { ctx.fillStyle = `rgba(255,240,200,${fl})`; ctx.fillRect(0, 0, W, 940); } }
      hook(ctx, t); beatText(ctx, t); chrome(ctx, t);
    },
    post: { paper: 0, vignette: 0.35, grain: 0.03 },
    fadeOut: 0,
  });
})();
