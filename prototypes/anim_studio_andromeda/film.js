// Andromeda motion reel — every visual is a pure function of t, timed from score.js.
(function () {
  const U = globalThis.U, G = globalThis.G, S = globalThis.SCORE, Studio = globalThis.Studio;
  const { ev } = S; const { clamp, lerp, ease, pulse } = U;
  const W = G.W, H = G.H;
  const GOLD = '#ffc43d', INK = '#0e111c', WHITE = '#fafafc';
  const BK = 'IDBlack', BD = 'IDBold', SB = 'IDSemi';
  let IMG = null;
  const NB = (s) => s.replace(/(\d) (milyon|trilyon|işıq)/g, '$1 $2');

  const txt = (ctx, s, x, y, o) => G.text(ctx, s, x, y, Object.assign({ boil: 0 }, o));
  function wrap(ctx, s, size, fam, maxW) {
    const out = []; let line = '';
    for (const w of s.split(' ')) { const tryL = line ? line + ' ' + w : w;
      if (line && G.measure(ctx, tryL, size, fam, 700) > maxW) { out.push(line); line = w; } else line = tryL; }
    if (line) out.push(line); return out;
  }
  const fmt = (v) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  function sky(ctx, t) {
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#03040b'); g.addColorStop(0.6, '#080a1a'); g.addColorStop(1, '#12101e');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 260; i++) {
      const x = (U.hash(i, 1) * W - t * (3 + 8 * U.hash(i, 6))) % W, y = U.hash(i, 2) * H * 0.95, r = 0.7 + 2.0 * Math.pow(U.hash(i, 3), 6);
      const tw = 0.55 + 0.45 * Math.sin(t * (1 + U.hash(i, 4) * 3) + i);
      ctx.globalAlpha = (0.2 + 0.7 * U.hash(i, 5)) * tw; ctx.fillStyle = '#eef0ff'; ctx.beginPath(); ctx.arc((x + W) % W, y, r, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // galaxy photo: big during the hook, shrinks to a faint smudge in beat 1, gone in beat 2, back big in beat 3
  function gal(t) {
    const k = ease.inOutCubic(clamp((t - ev.b1) / 1.4));
    let size = lerp(1500, 230, k) * (1 + 0.05 * clamp(t / ev.b1)), cx = 540, cy = lerp(820, 560, k), a = lerp(1, 0.75, k);
    const back = ease.outCubic(clamp((t - ev.b3) / 1.2));
    if (t >= ev.b3) { size = lerp(230, 1100, back) * (1 + 0.02 * (t - ev.b3)); cy = lerp(560, 560, back); a = lerp(0.75, 1, back); }
    const out = t >= ev.b3 ? 1 : 1 - clamp((t - ev.b2) / 0.5);
    return { cx, cy, size, a: a * out };
  }
  function photo(ctx, t) {
    if (!IMG) return;
    const d = gal(t); if (d.a <= 0) return;
    ctx.save(); ctx.globalAlpha = d.a; ctx.globalCompositeOperation = 'lighten'; ctx.translate(d.cx, d.cy); ctx.rotate(0.02 * t);
    ctx.drawImage(IMG, -d.size / 2, -d.size / 2, d.size, d.size); ctx.restore();
  }
  function hook(ctx, t) {
    const a = 1 - ease.inOutQuad(clamp((t - ev.b1 + 0.05) / 0.3)); if (a <= 0) return;
    S.HOOK.forEach((ln, k) => {
      const key = k === 0, sc = key ? 1 + 0.04 * Math.sin(t * 5) : 1;
      ctx.save(); ctx.translate(540, 300 + (key ? 0 : 20) + k * 104); ctx.scale(sc, sc);
      txt(ctx, ln, 0, 0, { size: key ? 112 : 84, fam: BK, weight: 900, color: key ? GOLD : WHITE, align: 'center', alpha: a, stroke: 'rgba(0,0,0,0.7)', strokeW: 9 });
      ctx.restore();
    });
  }

  // beat 1: pulsing ring finds the smudge
  function ring(ctx, t) {
    const a = clamp((t - ev.b1 - 0.9) / 0.4) * (1 - clamp((t - ev.b2) / 0.4)); if (a <= 0) return;
    const land = clamp((t - (ev.b1 + 0.9)) / (ev.ringLand - ev.b1 - 0.9));
    const r = lerp(420, 150, ease.outCubic(land)) + (t >= ev.ringLand ? 8 * Math.sin((t - ev.ringLand) * 6) : 0);
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = GOLD; ctx.lineWidth = 7; ctx.setLineDash([26, 16]); ctx.lineDashOffset = -t * 40;
    ctx.beginPath(); ctx.arc(540, 560, r, 0, 7); ctx.stroke(); ctx.restore();
    const lb = clamp((t - ev.ringLand) / 0.4);
    const p = t >= ev.ringLand ? pulse(t, ev.ringLand, 7) : 0;
    if (lb > 0) { ctx.save(); ctx.translate(540, 860); ctx.scale(1 + 0.2 * p, 1 + 0.2 * p);
      txt(ctx, 'ANDROMEDA', 0, 0, { size: 84, fam: BK, weight: 900, color: GOLD, align: 'center', alpha: a * lb, stroke: 'rgba(0,0,0,0.75)', strokeW: 9 }); ctx.restore();
      txt(ctx, 'adi gözlə görünür', 540, 250, { size: 48, fam: BD, weight: 700, color: WHITE, align: 'center', alpha: a * lb, stroke: 'rgba(0,0,0,0.75)', strokeW: 6 }); }
  }

  function earth(ctx, x, y, r) {
    const g = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r); g.addColorStop(0, '#5aa9ff'); g.addColorStop(1, '#1d4f9a');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(90,180,100,0.9)'; ctx.beginPath(); ctx.ellipse(x + r * 0.15, y - r * 0.1, r * 0.35, r * 0.5, 0.4, 0, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(160,210,255,0.6)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r + 4, 0, 7); ctx.stroke();
  }
  // beat 2: a light pulse travels from a small Andromeda (top) to Earth (bottom); year counter to 2 500 000
  function travel(ctx, t) {
    const a = clamp((t - ev.b2 + 0.1) / 0.5) * (1 - clamp((t - ev.b3) / 0.4)); if (a <= 0) return;
    const x0 = 540, y0 = 330, x1 = 540, y1 = 790;
    ctx.save(); ctx.globalAlpha = a;
    if (IMG) { ctx.save(); ctx.globalCompositeOperation = 'lighten'; ctx.drawImage(IMG, x0 - 150, y0 - 150, 300, 300); ctx.restore(); }
    earth(ctx, x1, y1, 46);
    const p = ease.inOutQuad(clamp((t - ev.b2 - 0.6) / (ev.walk - ev.b2 - 0.6)));
    // dotted path
    ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 4; ctx.setLineDash([10, 14]);
    ctx.beginPath(); ctx.moveTo(x0, y0 + 90); ctx.lineTo(x1, y1 - 56); ctx.stroke(); ctx.setLineDash([]);
    // travelled part + photon
    const py = lerp(y0 + 90, y1 - 56, p);
    const gl = ctx.createLinearGradient(0, y0 + 90, 0, py); gl.addColorStop(0, 'rgba(255,220,140,0)'); gl.addColorStop(1, 'rgba(255,220,140,0.95)');
    ctx.strokeStyle = gl; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(x0, y0 + 90); ctx.lineTo(x1, py); ctx.stroke();
    ctx.globalCompositeOperation = 'lighter';
    const gp = ctx.createRadialGradient(x1, py, 0, x1, py, 46); gp.addColorStop(0, 'rgba(255,255,255,1)'); gp.addColorStop(0.4, 'rgba(255,214,120,0.9)'); gp.addColorStop(1, 'rgba(255,180,60,0)');
    ctx.fillStyle = gp; ctx.beginPath(); ctx.arc(x1, py, 46, 0, 7); ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    txt(ctx, 'Yer', 620, y1 + 14, { size: 44, fam: BK, weight: 900, color: WHITE, align: 'left', stroke: 'rgba(0,0,0,0.75)', strokeW: 6 });
    const land = t >= ev.walk ? pulse(t, ev.walk, 7) : 0;
    const v = t >= ev.walk ? 2500000 : Math.round(2500000 * p / 1000) * 1000;
    ctx.save(); ctx.translate(540, 925); ctx.scale(1 + 0.2 * land, 1 + 0.2 * land);
    txt(ctx, fmt(v) + ' il', 0, 0, { size: 84, fam: BK, weight: 900, color: GOLD, align: 'center', stroke: 'rgba(0,0,0,0.75)', strokeW: 9 });
    ctx.restore();
    txt(ctx, 'işıq yolda', 540, 150 + 60, { size: 48, fam: BD, weight: 700, color: WHITE, align: 'center', alpha: clamp((t - ev.b2 - 0.4) / 0.4), stroke: 'rgba(0,0,0,0.75)', strokeW: 6 });
    ctx.restore();
  }

  // beat 3: galaxy back big, sparkles + star counter to 1 trilyon
  function stars(ctx, t) {
    const a = clamp((t - ev.b3) / 0.5); if (a <= 0) return;
    const p = ease.inOutQuad(clamp((t - ev.thin) / (ev.house - ev.thin)));
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    const n = Math.floor(p * 140);
    for (let i = 0; i < n; i++) {
      const ang = -0.6, u = (U.hash(i, 11) - 0.5) * 2, v = (U.hash(i, 12) - 0.5) * 2 * 0.32;
      const x = 540 + 420 * (u * Math.cos(ang) - v * Math.sin(ang)), y = 560 + 420 * (u * Math.sin(ang) + v * Math.cos(ang));
      const tw = 0.5 + 0.5 * Math.sin(t * 6 + i);
      ctx.globalAlpha = a * tw; ctx.fillStyle = '#fff6d8'; ctx.beginPath(); ctx.arc(x, y, 2.2 + 2.5 * U.hash(i, 13), 0, 7); ctx.fill();
    }
    ctx.restore();
    const land = t >= ev.house ? pulse(t, ev.house, 7) : 0;
    let lbl;
    if (t >= ev.house) lbl = '1 trilyon ulduz';
    else if (p <= 0) lbl = '0 ulduz';
    else lbl = fmt(Math.round(Math.pow(10, 12 * p))) + ' ulduz';
    ctx.save(); ctx.translate(540, 925); ctx.scale(1 + 0.2 * land, 1 + 0.2 * land);
    txt(ctx, lbl, 0, 0, { size: lbl.length > 16 ? 64 : 84, fam: BK, weight: 900, color: GOLD, align: 'center', alpha: a, stroke: 'rgba(0,0,0,0.75)', strokeW: 9 });
    ctx.restore();
    txt(ctx, 'təxminən', 540, 230, { size: 48, fam: BD, weight: 700, color: WHITE, align: 'center', alpha: a, stroke: 'rgba(0,0,0,0.75)', strokeW: 6 });
  }

  function beatText(ctx, t) {
    for (let k = 0; k < 3; k++) {
      const t0 = S.BSTART[k], t1 = k < 2 ? S.BSTART[k + 1] : S.DURATION + 1, sb = t - t0;
      if (sb < 0 || t > t1) continue;
      let a = ease.inOutQuad(clamp(sb / 0.25)); if (k < 2) a *= 1 - ease.inOutQuad(clamp((t - (t1 - 0.25)) / 0.25));
      const lines = wrap(ctx, NB(S.BEATS[k]), 54, BD, 820);
      ctx.save(); ctx.globalAlpha = a;
      ctx.fillStyle = 'rgba(14,17,28,0.82)'; ctx.beginPath(); ctx.roundRect(40, 1040, 880, 30 + lines.length * 66 + 30, 28); ctx.fill();
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
      const y = 1470; ctx.save(); ctx.globalAlpha = c; ctx.fillStyle = GOLD; ctx.beginPath(); ctx.roundRect(70, y, w, 80, 36); ctx.fill();
      txt(ctx, msg, 100, y + 54, { size: 42, fam: BD, weight: 700, color: INK }); ctx.restore(); }
    ctx.fillStyle = GOLD; ctx.fillRect(0, H - 8, W * t / S.DURATION, 8);
  }

  Studio.film({
    async init() {
      await Studio.loadFont(BK, 'assets/InterDisplay-Black.otf', 900);
      await Studio.loadFont(BD, 'assets/InterDisplay-Bold.otf', 700);
      await Studio.loadFont(SB, 'assets/InterDisplay-SemiBold.otf', 600);
      IMG = await Studio.loadImage('assets/gal.jpg');
    },
    draw(ctx, t) {
      sky(ctx, t); photo(ctx, t); ring(ctx, t); travel(ctx, t); stars(ctx, t);
      for (const t0 of [ev.ringLand, ev.walk, ev.house]) { const fl = t >= t0 ? 0.2 * Math.exp(-(t - t0) * 10) : 0;
        if (fl > 0.01) { ctx.fillStyle = `rgba(255,236,200,${fl})`; ctx.fillRect(0, 0, W, 940); } }
      hook(ctx, t); beatText(ctx, t); chrome(ctx, t);
    },
    post: { paper: 0, vignette: 0.35, grain: 0.03 },
    fadeOut: 0,
  });
})();
