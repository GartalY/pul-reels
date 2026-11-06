// Sun light journey motion reel — every visual is a pure function of t, timed from score.js.
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


  // the photo: big during the hook, shrinks to the top during beat 1, fades out at beat 2
  function disc(t) {
    const k = ease.inOutCubic(clamp((t - ev.b1) / 0.9));
    const size = lerp(1250, 640, k) * (1 + 0.04 * clamp(t / ev.b1));
    return { cx: 540, cy: lerp(1000, 500, k), size, r: size * 0.43 };
  }
  function photo(ctx, t) {
    if (!IMG) return;
    const a = 1 - clamp((t - ev.b2) / 0.5); if (a <= 0) return;
    const d = disc(t), rot = t * 0.01;
    ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'lighten'; ctx.translate(d.cx, d.cy); ctx.rotate(rot);
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


  // beat 1: the core glows white-hot inside the shrunk photo, temperature counter to 15 milyon °C
  function core(ctx, t) {
    const a = clamp((t - ev.b1 - 0.5) / 0.4) * (1 - clamp((t - ev.b2) / 0.4)); if (a <= 0) return;
    const d = disc(t), g = ease.outCubic(clamp((t - ev.b1 - 0.6) / (ev.ringLand - ev.b1 - 0.6)));
    const pr = d.r * (0.22 + 0.03 * Math.sin(t * 6));
    ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'lighter';
    const gc = ctx.createRadialGradient(d.cx, d.cy, 0, d.cx, d.cy, pr * 2.2);
    gc.addColorStop(0, 'rgba(255,255,240,1)'); gc.addColorStop(0.35, 'rgba(255,230,140,0.9)'); gc.addColorStop(1, 'rgba(255,140,40,0)');
    ctx.fillStyle = gc; ctx.beginPath(); ctx.arc(d.cx, d.cy, pr * 2.2, 0, 7); ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 4; ctx.setLineDash([10, 10]);
    ctx.beginPath(); ctx.arc(d.cx, d.cy, pr * 1.3, 0, 7); ctx.stroke(); ctx.setLineDash([]);
    txt(ctx, 'mərkəz', d.cx + pr * 1.3 + 20, d.cy - 10, { size: 40, fam: BD, weight: 700, color: WHITE, stroke: 'rgba(0,0,0,0.75)', strokeW: 6 });
    const land = t >= ev.ringLand ? pulse(t, ev.ringLand, 7) : 0;
    const val = t >= ev.ringLand ? '15' : (15 * g).toFixed(1).replace('.', ',');
    ctx.save(); ctx.translate(540, 900); ctx.scale(1 + 0.2 * land, 1 + 0.2 * land);
    txt(ctx, val + ' milyon °C', 0, 0, { size: 84, fam: BK, weight: 900, color: GOLD, align: 'center', stroke: 'rgba(0,0,0,0.75)', strokeW: 9 });
    ctx.restore(); ctx.restore();
  }

  // beat 2: cross-section of the Sun, a photon zig-zags out from the core; year counter to 170 000
  const WC = { x: 540, y: 545, R: 320 };
  function walk(ctx, t) {
    const a = clamp((t - ev.b2 + 0.1) / 0.5) * (1 - clamp((t - ev.b3) / 0.4)); if (a <= 0) return;
    const { x: cx, y: cy, R } = WC;
    ctx.save(); ctx.globalAlpha = a;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    g.addColorStop(0, '#fff6d0'); g.addColorStop(0.2, '#ffd25a'); g.addColorStop(0.7, '#f08a24'); g.addColorStop(1, '#b8380e');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill();
    ctx.shadowColor = '#ff9a2a'; ctx.shadowBlur = 60; ctx.strokeStyle = 'rgba(255,200,90,0.8)'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke(); ctx.shadowBlur = 0;
    // convection cells in the outer shell
    for (let i = 0; i < 40; i++) { const an = i / 40 * 6.283 + t * 0.05, rr = R * (0.84 + 0.08 * Math.sin(t * 2 + i));
      ctx.fillStyle = 'rgba(120,30,0,0.18)'; ctx.beginPath(); ctx.arc(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr, 22, 0, 7); ctx.fill(); }
    const p = ease.inOutQuad(clamp((t - ev.b2 - 0.5) / (ev.walk - ev.b2 - 0.5)));
    const W2 = S.walk, n = Math.max(1, Math.floor(p * (W2.length - 1)));
    ctx.strokeStyle = 'rgba(40,20,80,0.85)'; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.beginPath();
    for (let i = 0; i <= n; i++) { const [ux, uy] = W2[i], X = cx + ux * R * 0.97, Y = cy + uy * R * 0.97; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
    ctx.stroke();
    const [hx, hy] = W2[n], HX = cx + hx * R * 0.97, HY = cy + hy * R * 0.97;
    ctx.shadowColor = '#ffffff'; ctx.shadowBlur = 30; ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.arc(HX, HY, 13, 0, 7); ctx.fill(); ctx.shadowBlur = 0;
    const lb = clamp((t - ev.b2 - 1.0) / 0.4);
    const land = t >= ev.walk ? pulse(t, ev.walk, 7) : 0;
    const yrs = t >= ev.walk ? 170000 : Math.round(170000 * p / 1000) * 1000;
    const s = String(yrs).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' il';
    ctx.save(); ctx.translate(540, 925); ctx.scale(1 + 0.2 * land, 1 + 0.2 * land);
    txt(ctx, s, 0, 0, { size: 84, fam: BK, weight: 900, color: GOLD, align: 'center', stroke: 'rgba(0,0,0,0.75)', strokeW: 9 });
    ctx.restore();
    if (lb > 0) txt(ctx, 'hər addım 1 mm-dən az', 540, 200, { size: 40, fam: BD, weight: 700, color: WHITE, align: 'center', alpha: a * lb, stroke: 'rgba(0,0,0,0.75)', strokeW: 6 });
    ctx.restore();
  }

  // beat 3: Sun at left, Earth at right, a straight beam with a clock 0 -> 8 dəq 19 san
  function beam(ctx, t) {
    const a = clamp((t - ev.b3) / 0.5); if (a <= 0) return;
    const sx = 150, sy = 520, SR = 150, ex = 830, ey = 520, ER = 42;
    ctx.save(); ctx.globalAlpha = a;
    const gs = ctx.createRadialGradient(sx, sy, 10, sx, sy, SR * 1.6); gs.addColorStop(0, '#fff6d0'); gs.addColorStop(0.5, '#ffb43a'); gs.addColorStop(0.62, 'rgba(255,140,40,0.5)'); gs.addColorStop(1, 'rgba(255,120,30,0)');
    ctx.fillStyle = gs; ctx.beginPath(); ctx.arc(sx, sy, SR * 1.6, 0, 7); ctx.fill();
    txt(ctx, 'Günəş', sx + 10, sy + SR + 70, { size: 44, fam: BK, weight: 900, color: WHITE, align: 'center', stroke: 'rgba(0,0,0,0.7)', strokeW: 6 });
    const ge = ctx.createRadialGradient(ex - 12, ey - 12, 4, ex, ey, ER); ge.addColorStop(0, '#9fd6ff'); ge.addColorStop(0.6, '#2f78d0'); ge.addColorStop(1, '#173c7a');
    ctx.fillStyle = ge; ctx.beginPath(); ctx.arc(ex, ey, ER, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(80,170,90,0.85)'; ctx.beginPath(); ctx.ellipse(ex + 8, ey - 6, 16, 11, 0.5, 0, 7); ctx.fill();
    txt(ctx, 'Yer', ex, ey + ER + 70, { size: 44, fam: BK, weight: 900, color: WHITE, align: 'center', stroke: 'rgba(0,0,0,0.7)', strokeW: 6 });
    const p = clamp((t - ev.thin) / (ev.house - ev.thin));
    const x0 = sx + SR, x1 = ex - ER, hx = lerp(x0, x1, p);
    if (p > 0) {
      ctx.strokeStyle = 'rgba(255,230,150,0.9)'; ctx.lineWidth = 8; ctx.shadowColor = '#ffd25a'; ctx.shadowBlur = 24;
      ctx.beginPath(); ctx.moveTo(x0, sy); ctx.lineTo(hx, sy); ctx.stroke(); ctx.shadowBlur = 0;
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(hx, sy, 12, 0, 7); ctx.fill();
    }
    txt(ctx, '150 milyon km', 490, 430, { size: 40, fam: BD, weight: 700, color: '#ffe3a8', align: 'center', alpha: a * clamp((t - ev.b3 - 0.4) / 0.4), stroke: 'rgba(0,0,0,0.7)', strokeW: 6 });
    const secs = t >= ev.house ? 499 : Math.floor(499 * p);
    const land = t >= ev.house ? pulse(t, ev.house, 7) : 0;
    const lbl = Math.floor(secs / 60) + ' dəq ' + String(secs % 60).padStart(2, '0') + ' san';
    ctx.save(); ctx.translate(540, 820); ctx.scale(1 + 0.2 * land, 1 + 0.2 * land);
    txt(ctx, lbl, 0, 0, { size: 84, fam: BK, weight: 900, color: GOLD, align: 'center', stroke: 'rgba(0,0,0,0.75)', strokeW: 9 });
    ctx.restore(); ctx.restore();
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
      IMG = await Studio.loadImage('assets/sun.jpg');
    },
    draw(ctx, t) {
      sky(ctx, t); photo(ctx, t); core(ctx, t); walk(ctx, t); beam(ctx, t);
      for (const t0 of [ev.ringLand, ev.walk, ev.house]) { const fl = t >= t0 ? 0.22 * Math.exp(-(t - t0) * 10) : 0;
        if (fl > 0.01) { ctx.fillStyle = `rgba(255,230,190,${fl})`; ctx.fillRect(0, 0, W, 940); } }
      hook(ctx, t); beatText(ctx, t); chrome(ctx, t);
    },
    post: { paper: 0, vignette: 0.35, grain: 0.03 },
    fadeOut: 0,
  });
})();
