// Io volcano plumes motion reel — every visual is a pure function of t, timed from score.js.
(function () {
  const U = globalThis.U, G = globalThis.G, S = globalThis.SCORE, Studio = globalThis.Studio;
  const { ev } = S; const { clamp, lerp, ease, pulse } = U;
  const W = G.W, H = G.H;
  const GOLD = '#ffc43d', INK = '#0e111c', WHITE = '#fafafc', LAVA = '#ff6a2b';
  const BK = 'IDBlack', BD = 'IDBold', SB = 'IDSemi';
  let IMG = null;

  const txt = (ctx, s, x, y, o) => G.text(ctx, s, x, y, Object.assign({ boil: 0 }, o));
  function wrap(ctx, s, size, fam, maxW) {
    const out = []; let line = '';
    for (const w of s.split(' ')) { const tryL = line ? line + ' ' + w : w;
      if (line && G.measure(ctx, tryL, size, fam, 700) > maxW) { out.push(line); line = w; } else line = tryL; }
    if (line) out.push(line); return out;
  }

  function sky(ctx, t) {
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#05040c'); g.addColorStop(0.55, '#0c0818'); g.addColorStop(1, '#160c1c');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 220; i++) {
      const x = (U.hash(i, 1) * W - t * (4 + 10 * U.hash(i, 6))) % W, y = U.hash(i, 2) * H * 0.95, r = 0.7 + 2.0 * Math.pow(U.hash(i, 3), 6);
      const tw = 0.55 + 0.45 * Math.sin(t * (1 + U.hash(i, 4) * 3) + i);
      ctx.globalAlpha = (0.2 + 0.7 * U.hash(i, 5)) * tw; ctx.fillStyle = '#f0ecff'; ctx.beginPath(); ctx.arc((x + W) % W, y, r, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // disc geometry for the photo: big during the hook, shrinks to the top during beat 1
  function disc(t) {
    const k = ease.inOutCubic(clamp((t - ev.b1) / 0.9));
    const size = lerp(1150, 620, k) * (1 + 0.04 * clamp(t / ev.b1));
    return { cx: 540, cy: lerp(980, 520, k), size, r: size * 0.47 };
  }
  function photo(ctx, t) {
    if (!IMG) return;
    const a = 1 - clamp((t - ev.b2) / 0.5); if (a <= 0) return;
    const d = disc(t);
    ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'lighten'; ctx.translate(d.cx, d.cy);
    ctx.drawImage(IMG, -d.size / 2, -d.size / 2, d.size, d.size); ctx.restore();
  }

  function hook(ctx, t) {
    const a = 1 - ease.inOutQuad(clamp((t - ev.b1 + 0.05) / 0.3)); if (a <= 0) return;
    S.HOOK.forEach((ln, k) => {
      const key = k === 0, sc = key ? 1 + 0.04 * Math.sin(t * 5) : 1;
      ctx.save(); ctx.translate(540, 300 + (key ? 0 : 20) + k * 104); ctx.scale(sc, sc);
      txt(ctx, ln, 0, 0, { size: key ? 120 : 76, fam: BK, weight: 900, color: key ? GOLD : WHITE, align: 'center', alpha: a, stroke: 'rgba(0,0,0,0.65)', strokeW: 9 });
      ctx.restore();
    });
  }

  // beat 1: glowing volcano dots pop on the disc, counter to 150+, then faint ghost dots up to 400
  function volcanoes(ctx, t) {
    const a = clamp((t - ev.b1 - 0.6) / 0.3) * (1 - clamp((t - ev.b2) / 0.4)); if (a <= 0) return;
    const d = disc(t), span = ev.ringLand - ev.b1 - 0.6;
    const g = clamp((t - ev.b1 - 0.6) / span), shown = Math.floor(150 * ease.outCubic(g));
    ctx.save(); ctx.globalAlpha = a;
    for (let i = 0; i < 400; i++) {
      const v = S.volc[i], ghost = i >= 150;
      let al;
      if (!ghost) { if (i >= shown) continue; al = 1; }
      else { al = 0.45 * clamp((t - ev.ghost - (i - 150) / 250 * 0.6) / 0.25); if (al <= 0) continue; }
      const rot = 0, x = d.cx + d.r * (v.x * Math.cos(rot) - v.y * Math.sin(rot)), y = d.cy + d.r * (v.x * Math.sin(rot) + v.y * Math.cos(rot));
      const fl = 0.75 + 0.25 * Math.sin(t * 6 + v.ph * 9), rr = (ghost ? 4 : 6) * v.s * fl;
      ctx.globalAlpha = a * al;
      ctx.fillStyle = ghost ? 'rgba(255,230,200,0.9)' : LAVA;
      if (!ghost) { ctx.shadowColor = LAVA; ctx.shadowBlur = 14; }
      ctx.beginPath(); ctx.arc(x, y, rr, 0, 7); ctx.fill(); ctx.shadowBlur = 0;
    }
    ctx.globalAlpha = a;
    const land = t >= ev.ringLand ? pulse(t, ev.ringLand, 7) : 0;
    const sz = 84 * (1 + 0.2 * land);
    txt(ctx, (t >= ev.ringLand ? '150+' : String(shown)), 540, 888, { size: sz, fam: BK, weight: 900, color: GOLD, align: 'center', stroke: 'rgba(0,0,0,0.7)', strokeW: 8 });
    const gl = clamp((t - ev.ghost) / 0.4);
    txt(ctx, 'fəal vulkan', 300, 878, { size: 40, fam: BD, weight: 700, color: '#f2e6d8', align: 'center', alpha: a * clamp((t - ev.b1 - 0.8) / 0.4) });
    if (gl > 0) txt(ctx, '≈ 400-ə qədər?', 790, 878, { size: 40, fam: BD, weight: 700, color: '#f2e6d8', align: 'center', alpha: a * gl });
    ctx.restore();
  }

  // beat 2: Io limb at 1 px = 1 km, umbrella plume rises to 500 km, ISS line at 400 km
  const BASE = 840, KM = 1.0;
  function plume(ctx, t) {
    const a = clamp((t - ev.b2 + 0.1) / 0.5) * (1 - clamp((t - ev.b3) / 0.4)); if (a <= 0) return;
    const rise = ease.inOutCubic(clamp((t - ev.b2) / 0.7));
    ctx.save(); ctx.globalAlpha = a; ctx.translate(0, (1 - rise) * 300);
    // limb: radius 1 821 px (Io radius 1 821 km at this scale)
    const R = 1821, cx = 470, cy = BASE + R;
    const gl = ctx.createRadialGradient(cx, cy - R, 10, cx, cy - R + 200, 900); gl.addColorStop(0, '#e9cf6a'); gl.addColorStop(0.5, '#c79a3e'); gl.addColorStop(1, '#6e4a22');
    ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
    for (let i = 0; i < 28; i++) { const an = -Math.PI / 2 + (U.hash(i, 3) - 0.5) * 0.7, rr = R - 20 - U.hash(i, 4) * 160;
      ctx.fillStyle = i % 4 ? 'rgba(110,60,20,0.35)' : 'rgba(255,240,200,0.35)'; ctx.beginPath();
      ctx.ellipse(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, 14 + 30 * U.hash(i, 5), 5 + 8 * U.hash(i, 6), an + Math.PI / 2, 0, 7); ctx.fill(); }
    // plume
    const g = ease.outCubic(clamp((t - ev.b2 - 0.5) / (ev.house - ev.b2 - 0.5))), h = 500 * KM * g;
    if (h > 2) {
      const top = BASE - h, wid = 40 + h * 0.55;
      ctx.save(); ctx.globalCompositeOperation = 'lighter';
      for (let i = 0; i < 46; i++) {
        const f = i / 45, side = U.hash(i, 9) < 0.5 ? -1 : 1, spread = Math.sin(f * Math.PI * 0.5);
        const x = cx + side * wid * spread * (0.3 + 0.7 * U.hash(i, 10)), y = top + h * (1 - Math.sin(f * Math.PI)) * 0.25 + h * f * f * 0.75 * U.hash(i, 11);
        const r = 18 + 40 * U.hash(i, 12);
        const gr = ctx.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, 'rgba(140,170,255,0.18)'); gr.addColorStop(1, 'rgba(140,170,255,0)');
        ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
      }
      const gc = ctx.createLinearGradient(0, top, 0, BASE); gc.addColorStop(0, 'rgba(160,190,255,0.45)'); gc.addColorStop(1, 'rgba(255,150,80,0.6)');
      ctx.fillStyle = gc; ctx.beginPath(); ctx.moveTo(cx - 14, BASE); ctx.quadraticCurveTo(cx - 8, top + 60, cx - wid, top + 40);
      ctx.quadraticCurveTo(cx, top - 30, cx + wid, top + 40); ctx.quadraticCurveTo(cx + 8, top + 60, cx + 14, BASE); ctx.closePath(); ctx.fill();
      ctx.restore();
    }
    // ruler on the right (x 840), 0..500 km
    const rx = 850; ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(rx, BASE); ctx.lineTo(rx, BASE - 520); ctx.stroke();
    for (let k = 0; k <= 5; k++) { const y = BASE - k * 100; ctx.beginPath(); ctx.moveTo(rx - 14, y); ctx.lineTo(rx + 14, y); ctx.stroke(); }
    // ISS line
    const il = clamp((t - ev.thin) / 0.4);
    if (il > 0) { const y = BASE - 400 * KM;
      ctx.save(); ctx.globalAlpha = a * il; ctx.strokeStyle = '#7fd4ff'; ctx.lineWidth = 4; ctx.setLineDash([16, 12]);
      ctx.beginPath(); ctx.moveTo(70, y); ctx.lineTo(70 + 780 * ease.outCubic(il), y); ctx.stroke(); ctx.setLineDash([]);
      const sx = 120 + 600 * clamp((t - ev.thin) / 6);
      ctx.fillStyle = '#cfe9ff'; ctx.fillRect(sx - 34, y - 6, 68, 12); ctx.fillStyle = '#4a7bd0'; ctx.fillRect(sx - 30, y - 22, 22, 44); ctx.fillRect(sx + 8, y - 22, 22, 44);
      txt(ctx, 'Kosmik Stansiya ≈ 400 km', 70, y + 56, { size: 36, fam: BD, weight: 700, color: '#bfe6ff', stroke: 'rgba(0,0,0,0.7)', strokeW: 6 });
      ctx.restore(); }
    // altitude counter
    const land = t >= ev.house ? pulse(t, ev.house, 7) : 0;
    const val = t >= ev.house ? 500 : Math.round(h / 10) * 10;
    ctx.save(); ctx.translate(820, BASE - h - 30); ctx.scale(1 + 0.2 * land, 1 + 0.2 * land);
    txt(ctx, val + ' km', 0, 0, { size: 60, fam: BK, weight: 900, color: GOLD, align: 'right', stroke: 'rgba(0,0,0,0.75)', strokeW: 8 }); ctx.restore();
    ctx.restore();
  }

  // beat 3: Jupiter pulls and squeezes Io, the inside glows; then Io vs our Moon
  function squeeze(ctx, t) {
    const a = clamp((t - ev.b3) / 0.5); if (a <= 0) return;
    const u = t - ev.b3;
    ctx.save(); ctx.globalAlpha = a;
    const jx = -260 + 60 * (1 - ease.outCubic(clamp(u / 1.2))) * -1, jy = 560, JR = 560;
    const gj = ctx.createRadialGradient(jx + 160, jy - 180, 40, jx, jy, JR); gj.addColorStop(0, '#f6e2c4'); gj.addColorStop(0.7, '#c99a6c'); gj.addColorStop(1, '#6b4a33');
    ctx.fillStyle = gj; ctx.beginPath(); ctx.arc(jx, jy, JR, 0, 7); ctx.fill();
    ctx.save(); ctx.beginPath(); ctx.arc(jx, jy, JR, 0, 7); ctx.clip();
    for (let k = 0; k < 9; k++) { ctx.fillStyle = k % 2 ? 'rgba(150,90,50,0.35)' : 'rgba(255,240,220,0.25)'; ctx.fillRect(jx - JR, jy - JR + k * 125 + 20 * Math.sin(u + k), 2 * JR, 40 + 30 * U.hash(k, 2)); }
    ctx.fillStyle = 'rgba(190,80,50,0.7)'; ctx.beginPath(); ctx.ellipse(jx + 300, jy + 170, 70, 40, 0, 0, 7); ctx.fill();
    ctx.restore();
    txt(ctx, 'Yupiter', 150, 250, { size: 44, fam: BK, weight: 900, color: WHITE, stroke: 'rgba(0,0,0,0.6)', strokeW: 6 });
    // Io squeezing
    const sq = Math.sin(u * 3.2), ix = 700, iy = 520, IR = 120;
    const rx = IR * (1 + 0.13 * sq), ry = IR * (1 - 0.13 * sq);
    const heat = 0.5 + 0.5 * Math.abs(sq);
    const gi = ctx.createRadialGradient(ix, iy, 5, ix, iy, IR * 1.1); gi.addColorStop(0, `rgba(255,${120 - 60 * heat},40,1)`); gi.addColorStop(0.45, '#e8b84a'); gi.addColorStop(1, '#8a6224');
    ctx.fillStyle = gi; ctx.beginPath(); ctx.ellipse(ix, iy, rx, ry, 0, 0, 7); ctx.fill();
    ctx.strokeStyle = `rgba(255,120,40,${0.3 + 0.5 * heat})`; ctx.lineWidth = 6; ctx.stroke();
    // pull arrows toward Jupiter
    for (let k = -1; k <= 1; k++) { const ay = iy + k * 70, off = 20 * Math.sin(u * 3.2 + k);
      ctx.strokeStyle = 'rgba(255,196,61,0.85)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(ix - IR - 30 + off, ay); ctx.lineTo(ix - IR - 130 + off, ay); ctx.stroke();
      ctx.fillStyle = 'rgba(255,196,61,0.85)'; ctx.beginPath(); ctx.moveTo(ix - IR - 150 + off, ay); ctx.lineTo(ix - IR - 125 + off, ay - 12); ctx.lineTo(ix - IR - 125 + off, ay + 12); ctx.fill(); }
    txt(ctx, 'İo', ix, iy - IR - 30, { size: 48, fam: BK, weight: 900, color: GOLD, align: 'center', stroke: 'rgba(0,0,0,0.7)', strokeW: 6 });
    const lb = clamp((u - 1.0) / 0.4);
    if (lb > 0) txt(ctx, 'dartır · sıxır · qızdırır', 540, 720, { size: 42, fam: BD, weight: 700, color: '#ffd9b0', align: 'center', alpha: a * lb, stroke: 'rgba(0,0,0,0.75)', strokeW: 6 });
    // Io vs Moon (radius 1 821 vs 1 737 km)
    const mo = ease.outBack(clamp((t - ev.moon) / 0.45), 1.6);
    if (mo > 0) { const mx = 700, my = 860, MR = 60 * mo, IR2 = 63 * mo;
      ctx.fillStyle = '#e3b448'; ctx.beginPath(); ctx.arc(mx - 80, my, IR2, 0, 7); ctx.fill();
      ctx.fillStyle = '#c9ccd6'; ctx.beginPath(); ctx.arc(mx + 80, my, MR, 0, 7); ctx.fill();
      txt(ctx, 'İo', mx - 80, my + 14, { size: 36, fam: BK, weight: 900, color: INK, align: 'center' });
      txt(ctx, 'Ay', mx + 80, my + 14, { size: 36, fam: BK, weight: 900, color: INK, align: 'center' });
      txt(ctx, '>', mx, my + 16, { size: 50, fam: BK, weight: 900, color: GOLD, align: 'center' }); }
    ctx.restore();
  }

  function beatText(ctx, t) {
    for (let k = 0; k < 3; k++) {
      const t0 = S.BSTART[k], t1 = k < 2 ? S.BSTART[k + 1] : S.DURATION + 1, sb = t - t0;
      if (sb < 0 || t > t1) continue;
      let a = ease.inOutQuad(clamp(sb / 0.25)); if (k < 2) a *= 1 - ease.inOutQuad(clamp((t - (t1 - 0.25)) / 0.25));
      const lines = wrap(ctx, S.BEATS[k], 54, BD, 820);
      ctx.save(); ctx.globalAlpha = a;
      ctx.fillStyle = 'rgba(14,17,28,0.8)'; ctx.beginPath(); ctx.roundRect(40, 1040, 880, 30 + lines.length * 66 + 30, 28); ctx.fill();
      const p = k === 0 ? 'BİLİRDİNİZMİ?' : `${k + 1}/3`, pw = G.measure(ctx, p, 40, BK, 900) + 56;
      ctx.fillStyle = GOLD; ctx.beginPath(); ctx.roundRect(70, 960, pw, 74, 37); ctx.fill();
      txt(ctx, p, 98, 1011, { size: 40, fam: BK, weight: 900, color: INK });
      lines.forEach((ln, i) => txt(ctx, ln, 70, 1060 + (1 - a) * 40 + i * 66 + 52, { size: 54, fam: BD, weight: 700, color: WHITE }));
      ctx.restore();
    }
  }

  function chrome(ctx, t) {
    txt(ctx, '@bilirdinizmi_az', 540, 140, { size: 34, fam: SB, weight: 600, color: WHITE, align: 'center' });
    const c = clamp((t - ev.cta) / 0.3);
    if (c > 0) { const msg = 'Hər gün yeni fakt — izlə!', w = G.measure(ctx, msg, 42, BD, 700) + 60;
      const y = 1470 + 0; ctx.save(); ctx.globalAlpha = c; ctx.fillStyle = GOLD; ctx.beginPath(); ctx.roundRect(70, y, w, 80, 36); ctx.fill();
      txt(ctx, msg, 100, y + 54, { size: 42, fam: BD, weight: 700, color: INK }); ctx.restore(); }
    ctx.fillStyle = GOLD; ctx.fillRect(0, H - 8, W * t / S.DURATION, 8);
  }

  Studio.film({
    async init() {
      await Studio.loadFont(BK, 'assets/InterDisplay-Black.otf', 900);
      await Studio.loadFont(BD, 'assets/InterDisplay-Bold.otf', 700);
      await Studio.loadFont(SB, 'assets/InterDisplay-SemiBold.otf', 600);
      IMG = await Studio.loadImage('assets/io.jpg');
    },
    draw(ctx, t) {
      sky(ctx, t); photo(ctx, t); volcanoes(ctx, t); plume(ctx, t); squeeze(ctx, t);
      for (const t0 of [ev.ringLand, ev.house]) { const fl = t >= t0 ? 0.22 * Math.exp(-(t - t0) * 10) : 0;
        if (fl > 0.01) { ctx.fillStyle = `rgba(255,230,190,${fl})`; ctx.fillRect(0, 0, W, 940); } }
      hook(ctx, t); beatText(ctx, t); chrome(ctx, t);
    },
    post: { paper: 0, vignette: 0.35, grain: 0.03 },
    fadeOut: 0,
  });
})();
