// Ganymede motion reel (16:00, 11 Nov 2026) — every visual is a pure function of t, timed from score.js.
(function () {
  const U = globalThis.U, G = globalThis.G, S = globalThis.SCORE, Studio = globalThis.Studio;
  const { ev } = S; const { clamp, lerp, ease, pulse } = U;
  const W = G.W, H = G.H;
  const GOLD = '#ffc43d', INK = '#0e111c', WHITE = '#fafafc', ICE = '#dfeefa', SEA = '#1d5fae';
  const BK = 'IDBlack', BD = 'IDBold', SB = 'IDSemi';
  let IMG = null;
  const NB = (s) => s.replace(/(\d) (km|qat|milyon)/g, '$1 $2').replace(/(\d)–(\d)/g, '$1–$2');

  const txt = (ctx, s, x, y, o) => G.text(ctx, s, x, y, Object.assign({ boil: 0 }, o));
  const lab = (ctx, s, x, y, size, color, a, align) => txt(ctx, s, x, y, { size, fam: size > 60 ? BK : BD, weight: size > 60 ? 900 : 700, color, align: align || 'center', alpha: a, stroke: 'rgba(0,0,0,0.75)', strokeW: size > 60 ? 9 : 6 });
  function wrap(ctx, s, size, fam, maxW) {
    const out = []; let line = '';
    for (const w of s.split(' ')) { const tryL = line ? line + ' ' + w : w;
      if (line && G.measure(ctx, tryL, size, fam, 700) > maxW) { out.push(line); line = w; } else line = tryL; }
    if (line) out.push(line); return out;
  }

  function sky(ctx, t) {
    const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#03040b'); g.addColorStop(0.6, '#080a1a'); g.addColorStop(1, '#0d1222');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 220; i++) {
      const x = (U.hash(i, 1) * W - t * (3 + 8 * U.hash(i, 6))) % W, y = U.hash(i, 2) * H * 0.95, r = 0.7 + 2.0 * Math.pow(U.hash(i, 3), 6);
      const tw = 0.55 + 0.45 * Math.sin(t * (1 + U.hash(i, 4) * 3) + i);
      ctx.globalAlpha = (0.2 + 0.7 * U.hash(i, 5)) * tw; ctx.fillStyle = '#eef0ff'; ctx.beginPath(); ctx.arc((x + W) % W, y, r, 0, 7); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Europa photo: big in the hook, shrinks next to the Moon in beat 1, fades out for beat 2
  function photo(ctx, t) {
    if (!IMG) return;
    const k = ease.inOutCubic(clamp((t - ev.b1) / 1.3));
    const size = lerp(1250, 300, k) * (1 + 0.05 * clamp(t / ev.b1));
    const cx = lerp(540, 360, k), cy = lerp(700, 560, k);
    const a = 1 - clamp((t - ev.b2 + 0.2) / 0.5); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'lighten';
    ctx.drawImage(IMG, cx - size / 2, cy - size / 2, size, size); ctx.restore();
  }
  function hook(ctx, t) {
    const a = 1 - ease.inOutQuad(clamp((t - ev.b1 + 0.05) / 0.3)); if (a <= 0) return;
    S.HOOK.forEach((ln, k) => {
      const key = /\d/.test(ln), sc = key ? 1 + 0.04 * Math.sin(t * 5) : 1;
      ctx.save(); ctx.translate(540, 300 + k * 118); ctx.scale(sc, sc);
      txt(ctx, ln, 0, 0, { size: key ? 120 : 88, fam: BK, weight: 900, color: key ? GOLD : WHITE, align: 'center', alpha: a, stroke: 'rgba(0,0,0,0.7)', strokeW: 9 });
      ctx.restore();
    });
  }

  function mercury(ctx, x, y, r) {
    const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r); g.addColorStop(0, '#b9a796'); g.addColorStop(1, '#4e4239');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(60,50,44,0.55)';
    for (const [dx, dy, rr] of [[-0.3, -0.2, 0.16], [0.25, 0.15, 0.12], [-0.05, 0.45, 0.09], [0.4, -0.3, 0.07], [0.0, -0.5, 0.06]]) { ctx.beginPath(); ctx.arc(x + dx * r, y + dy * r, rr * r, 0, 7); ctx.fill(); }
  }
  function moon(ctx, x, y, r) {
    const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r); g.addColorStop(0, '#d9d9d9'); g.addColorStop(1, '#6d6d72');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(80,80,90,0.55)';
    for (const [dx, dy, rr] of [[-0.3, -0.2, 0.18], [0.25, 0.1, 0.14], [-0.05, 0.4, 0.1], [0.35, -0.35, 0.08]]) { ctx.beginPath(); ctx.arc(x + dx * r, y + dy * r, rr * r, 0, 7); ctx.fill(); }
  }
  // beat 1: Moon appears to the right; ring lands on Europa
  function compare(ctx, t) {
    const a = clamp((t - ev.b1 - 0.6) / 0.5) * (1 - clamp((t - ev.b2 + 0.2) / 0.4)); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a; mercury(ctx, 760, 560, 116); ctx.restore();
    lab(ctx, 'MERKURİ', 760, 760, 56, WHITE, a); lab(ctx, '4\u00a0880 km', 760, 820, 46, WHITE, a);
    const land = clamp((t - (ev.b1 + 0.9)) / (ev.ringLand - ev.b1 - 0.9));
    const r = lerp(380, 140, ease.outCubic(land)) + (t >= ev.ringLand ? 6 * Math.sin((t - ev.ringLand) * 6) : 0);
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = GOLD; ctx.lineWidth = 7; ctx.setLineDash([26, 16]); ctx.lineDashOffset = -t * 40;
    ctx.beginPath(); ctx.arc(360, 560, r, 0, 7); ctx.stroke(); ctx.restore();
    const lb = clamp((t - ev.ringLand) / 0.4), p = t >= ev.ringLand ? pulse(t, ev.ringLand, 7) : 0;
    if (lb > 0) {
      ctx.save(); ctx.translate(360, 760); ctx.scale(1 + 0.2 * p, 1 + 0.2 * p); lab(ctx, 'QANİMED', 0, 0, 64, GOLD, a * lb); ctx.restore();
      lab(ctx, '5\u00a0260 km', 360, 820, 50, GOLD, a * lb);
      lab(ctx, 'peyk planetdən böyükdür!', 540, 250, 50, WHITE, a * lb);
    }
  }

  function sphere(ctx, x, y, r) {
    if (r <= 1) return;
    const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.05, x, y, r); g.addColorStop(0, '#9fd3ff'); g.addColorStop(0.55, '#2f7fd6'); g.addColorStop(1, '#123d7a');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.beginPath(); ctx.ellipse(x - r * 0.38, y - r * 0.42, r * 0.18, r * 0.09, -0.6, 0, 7); ctx.fill();
  }
  // beat 2: mass bars — Mercury 100 % vs Ganymede ~45 % (1.48e23 vs 3.30e23 kg)
  function water(ctx, t) {
    const a = clamp((t - ev.b2 + 0.1) / 0.5) * (1 - clamp((t - ev.b3) / 0.4)); if (a <= 0) return;
    const p = ease.inOutQuad(clamp((t - ev.b2 - 0.6) / (ev.walk - ev.b2 - 0.6)));
    const base = 860, maxH = 440;
    const items = [['Merkuri', 1.0, 330, '#a08a76'], ['Qanimed', 0.45, 750, GOLD]];
    ctx.save(); ctx.globalAlpha = a;
    for (const [n, v, x, c] of items) {
      const h = maxH * v * p;
      ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect(x - 110, base - h, 220, Math.max(h, 1), 16); ctx.fill();
      lab(ctx, n, x, base + 62, 52, WHITE, 1);
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(150, base); ctx.lineTo(930, base); ctx.stroke();
    ctx.restore();
    lab(ctx, 'kütlə (ağırlıq)', 540, 250, 50, WHITE, a);
    const lb = clamp((t - ev.walk) / 0.3), land = t >= ev.walk ? pulse(t, ev.walk, 7) : 0;
    if (lb > 0) { ctx.save(); ctx.translate(700, 590); ctx.scale(1 + 0.25 * land, 1 + 0.25 * land);
      lab(ctx, 'yarısı qədər', 0, 0, 60, GOLD, a * lb); ctx.restore(); }
  }

  // beat 3: cross-section layers (ice / ocean / rock) wipe in, Europa Clipper flies in, year counter to 2030
  function layers(ctx, t) {
    const a = clamp((t - ev.b3) / 0.5); if (a <= 0) return;
    const w = ease.inOutQuad(clamp((t - ev.b3) / 1.2));
    ctx.save(); ctx.globalAlpha = a;
    ctx.beginPath(); ctx.rect(0, 0, W * w, H); ctx.clip();
    const top = 420;
    // rock
    ctx.fillStyle = '#5a4433'; ctx.fillRect(0, 800, W, 140);
    // ocean with waves
    const og = ctx.createLinearGradient(0, top + 80, 0, 800); og.addColorStop(0, '#2f7fd6'); og.addColorStop(1, '#0f2f63');
    ctx.fillStyle = og; ctx.beginPath(); ctx.moveTo(0, 800);
    for (let x = 0; x <= W; x += 20) ctx.lineTo(x, top + 80 + 8 * Math.sin(x / 60 + t * 2));
    ctx.lineTo(W, 800); ctx.closePath(); ctx.fill();
    // ice shell with cracks
    const ig = ctx.createLinearGradient(0, top, 0, top + 90); ig.addColorStop(0, '#f4fbff'); ig.addColorStop(1, '#a9cbe6');
    ctx.fillStyle = ig; ctx.beginPath(); ctx.moveTo(0, top);
    for (let x = 0; x <= W; x += 20) ctx.lineTo(x, top + 80 + 8 * Math.sin(x / 60 + t * 2));
    ctx.lineTo(W, top); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(176,90,50,0.8)'; ctx.lineWidth = 4;
    for (let i = 0; i < 6; i++) { const x = 90 + i * 180 + 30 * U.hash(i, 3); ctx.beginPath(); ctx.moveTo(x, top); ctx.lineTo(x + 25, top + 30); ctx.lineTo(x + 5, top + 60); ctx.stroke(); }
    ctx.restore();
    lab(ctx, 'buz qabığı', 70, top - 14, 46, '#cfe8ff', a * clamp((t - ev.b3 - 0.6) / 0.4), 'left');
    lab(ctx, 'duzlu okean', 70, 660, 52, WHITE, a * clamp((t - ev.b3 - 0.9) / 0.4), 'left');
    // probe
    const p = ease.inOutQuad(clamp((t - ev.thin) / (ev.house - ev.thin)));
    const px = lerp(1000, 720, p), py = lerp(150, 340, p);
    ctx.save(); ctx.globalAlpha = a; ctx.translate(px, py); ctx.rotate(0.5);
    ctx.fillStyle = '#d0d4dc'; ctx.fillRect(-14, -20, 28, 40);
    ctx.fillStyle = '#2b4f8f'; ctx.fillRect(-90, -9, 70, 18); ctx.fillRect(20, -9, 70, 18);
    ctx.restore();
    const yr = t >= ev.house ? 2031 : Math.round(lerp(2023, 2031, p));
    const land = t >= ev.house ? pulse(t, ev.house, 7) : 0;
    lab(ctx, 'JUICE aparatı', 70, 230, 46, WHITE, a * clamp((t - ev.thin + 0.3) / 0.4), 'left');
    ctx.save(); ctx.translate(70, 330); ctx.scale(1 + 0.2 * land, 1 + 0.2 * land);
    lab(ctx, '' + yr, 0, 0, 84, GOLD, a * clamp((t - ev.thin + 0.3) / 0.4), 'left');
    ctx.restore();
  }

  function beatText(ctx, t) {
    for (let k = 0; k < 3; k++) {
      const t0 = S.BSTART[k], t1 = k < 2 ? S.BSTART[k + 1] : S.DURATION + 1, sb = t - t0;
      if (sb < 0 || t > t1) continue;
      let a = ease.inOutQuad(clamp(sb / 0.25)); if (k < 2) a *= 1 - ease.inOutQuad(clamp((t - (t1 - 0.25)) / 0.25));
      const lines = wrap(ctx, NB(S.BEATS[k]), 54, BD, 820);
      ctx.save(); ctx.globalAlpha = a;
      ctx.fillStyle = 'rgba(14,17,28,0.86)'; ctx.beginPath(); ctx.roundRect(40, 1040, 880, 30 + lines.length * 66 + 30, 28); ctx.fill();
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
      IMG = await Studio.loadImage('assets/gan.jpg');
    },
    draw(ctx, t) {
      sky(ctx, t); photo(ctx, t); compare(ctx, t); water(ctx, t); layers(ctx, t);
      for (const t0 of [ev.ringLand, ev.walk, ev.house]) { const fl = t >= t0 ? 0.18 * Math.exp(-(t - t0) * 10) : 0;
        if (fl > 0.01) { ctx.fillStyle = `rgba(200,230,255,${fl})`; ctx.fillRect(0, 0, W, 940); } }
      hook(ctx, t); beatText(ctx, t); chrome(ctx, t);
    },
    post: { paper: 0, vignette: 0.35, grain: 0.03 },
    fadeOut: 0,
  });
})();
