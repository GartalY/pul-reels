// Baku 1901 oil motion reel (21:30, 10 Nov 2026) — every visual is a pure function of t, timed from score.js.
(function () {
  const U = globalThis.U, G = globalThis.G, S = globalThis.SCORE, Studio = globalThis.Studio;
  const { ev } = S; const { clamp, lerp, ease, pulse } = U;
  const W = G.W, H = G.H;
  const GOLD = '#ffc43d', INK = '#0e111c', WHITE = '#fafafc', ICE = '#dfeefa', SEA = '#1d5fae';
  const BK = 'IDBlack', BD = 'IDBold', SB = 'IDSemi';
  let IMG = null;
  const NB = (s) => s.replace(/(\d) (km|qat|milyon|ton)/g, '$1 $2').replace(/(\d)–(\d)/g, '$1–$2');

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

  // old photochrome postcard: full frame in the hook, dim behind the charts, back in beat 3
  function photo(ctx, t) {
    if (!IMG) return;
    const dim = t < ev.b1 ? 1 : t < ev.b3 ? lerp(1, 0.22, clamp((t - ev.b1) / 0.6)) : lerp(0.22, 0.6, clamp((t - ev.b3) / 0.8));
    const z = 1.0 + 0.06 * (t / S.DURATION);
    const ih = H * z, iw = ih * IMG.width / IMG.height;
    ctx.save(); ctx.globalAlpha = dim; ctx.drawImage(IMG, 540 - iw / 2, H / 2 - ih / 2 - 120, iw, ih); ctx.restore();
    // fire flicker glow on the derrick in the hook
    const fl = (0.12 + 0.08 * Math.sin(t * 17) + 0.06 * Math.sin(t * 29)) * dim;
    const g = ctx.createRadialGradient(330, 380, 10, 330, 380, 380); g.addColorStop(0, `rgba(255,150,40,${fl})`); g.addColorStop(1, 'rgba(255,120,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, 1000);
  }
  function hook(ctx, t) {
    const a = 1 - ease.inOutQuad(clamp((t - ev.b1 + 0.05) / 0.3)); if (a <= 0) return;
    S.HOOK.forEach((ln, k) => {
      const key = /\d|BAKI/.test(ln), sc = key ? 1 + 0.03 * Math.sin(t * 5) : 1;
      ctx.save(); ctx.translate(540, 290 + k * 110); ctx.scale(sc, sc);
      txt(ctx, ln, 0, 0, { size: k === 0 ? 120 : 92, fam: BK, weight: 900, color: key ? GOLD : WHITE, align: 'center', alpha: a, stroke: 'rgba(0,0,0,0.8)', strokeW: 10 });
      ctx.restore();
    });
  }

  // beat 1: pie — Baku's share of world oil in 1901 grows to 51.5 %
  function pie(ctx, t) {
    const a = clamp((t - ev.b1 - 0.3) / 0.5) * (1 - clamp((t - ev.b2 + 0.2) / 0.4)); if (a <= 0) return;
    const cx = 540, cy = 590, r = 260;
    const p = 0.515 * ease.inOutQuad(clamp((t - ev.b1 - 0.8) / (ev.ringLand - ev.b1 - 0.8)));
    ctx.save(); ctx.globalAlpha = a;
    ctx.fillStyle = '#3a3f4e'; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill();
    if (p > 0) { ctx.fillStyle = GOLD; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r + (t >= ev.ringLand ? 10 * pulse(t, ev.ringLand, 6) : 0), -Math.PI / 2, -Math.PI / 2 + p * 2 * Math.PI); ctx.closePath(); ctx.fill(); }
    ctx.strokeStyle = 'rgba(0,0,0,0.5)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke();
    ctx.restore();
    lab(ctx, 'dünyada çıxarılan neft, 1901', 540, 250, 46, WHITE, a);
    const lb = clamp((t - ev.ringLand) / 0.3);
    lab(ctx, 'BAKI', 680, 600, 64, INK, a * lb);
    lab(ctx, 'qalan', 400, 600, 46, WHITE, a * lb);
    const land = t >= ev.ringLand ? pulse(t, ev.ringLand, 7) : 0;
    ctx.save(); ctx.translate(540, 925); ctx.scale(1 + 0.2 * land, 1 + 0.2 * land);
    lab(ctx, t >= ev.ringLand ? 'yarıdan çox' : Math.round(p * 100) + '%', 0, 0, 84, GOLD, a);
    ctx.restore();
  }

  // beat 2: bars 1900 — Baku 11,5 vs USA 9,1 million tonnes
  function bars(ctx, t) {
    const a = clamp((t - ev.b2 + 0.1) / 0.5) * (1 - clamp((t - ev.b3) / 0.4)); if (a <= 0) return;
    const p = ease.inOutQuad(clamp((t - ev.b2 - 0.6) / (ev.walk - ev.b2 - 0.6)));
    const base = 860, maxH = 410;
    const items = [['Bakı', 11.5, 330, GOLD], ['ABŞ', 9.1, 750, '#8fa6c8']];
    ctx.save(); ctx.globalAlpha = a;
    for (const [n, v, x, c] of items) {
      const h = maxH * (v / 11.5) * p;
      ctx.fillStyle = c; ctx.beginPath(); ctx.roundRect(x - 110, base - h, 220, h, 16); ctx.fill();
      lab(ctx, n, x, base + 62, 52, WHITE, 1);
      lab(ctx, (v * p).toFixed(1).replace('.', ','), x, base - h - 24, 64, c === GOLD ? GOLD : WHITE, 1);
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(150, base); ctx.lineTo(930, base); ctx.stroke();
    ctx.restore();
    lab(ctx, '1900-cü il, milyon ton neft', 540, 250, 46, WHITE, a);
    const lb = clamp((t - ev.walk) / 0.3), land = t >= ev.walk ? pulse(t, ev.walk, 7) : 0;
    if (lb > 0) { ctx.save(); ctx.translate(330, 335); ctx.scale(1 + 0.25 * land, 1 + 0.25 * land);
      ctx.globalAlpha = a * lb; ctx.fillStyle = GOLD; ctx.beginPath(); ctx.roundRect(-130, -50, 260, 72, 36); ctx.fill(); ctx.globalAlpha = 1;
      txt(ctx, '1-ci yer', 0, 0, { size: 44, fam: BK, weight: 900, color: INK, align: 'center', alpha: a * lb }); ctx.restore(); }
  }

  // beat 3: the postcard returns; three name pills pop in
  function names(ctx, t) {
    const a = clamp((t - ev.b3) / 0.5); if (a <= 0) return;
    const tt = [ev.thin, ev.thin + (ev.house - ev.thin) / 2, ev.house];
    ['Nobellər', 'Rotşildlər', 'yerli milyonçular'].forEach((n, i) => {
      const s = clamp((t - tt[i]) / 0.35); if (s <= 0) return;
      const sc = ease.outBack(s), y = 380 + i * 150, w = G.measure(ctx, n, 60, BK, 900) + 80;
      ctx.save(); ctx.translate(540, y); ctx.scale(sc, sc); ctx.globalAlpha = a;
      ctx.fillStyle = i === 2 ? GOLD : 'rgba(14,17,28,0.88)'; ctx.beginPath(); ctx.roundRect(-w / 2, -58, w, 90, 45); ctx.fill();
      txt(ctx, n, 0, 8, { size: 60, fam: BK, weight: 900, color: i === 2 ? INK : WHITE, align: 'center' });
      ctx.restore();
    });
    lab(ctx, 'Bakıda neft şirkəti qurdular', 540, 250, 46, WHITE, a);
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
      IMG = await Studio.loadImage('assets/oil.jpg');
    },
    draw(ctx, t) {
      ctx.fillStyle = '#0b0d14'; ctx.fillRect(0, 0, W, H); photo(ctx, t); pie(ctx, t); bars(ctx, t); names(ctx, t);
      for (const t0 of [ev.ringLand, ev.walk, ev.house]) { const fl = t >= t0 ? 0.18 * Math.exp(-(t - t0) * 10) : 0;
        if (fl > 0.01) { ctx.fillStyle = `rgba(255,220,160,${fl})`; ctx.fillRect(0, 0, W, 940); } }
      hook(ctx, t); beatText(ctx, t); chrome(ctx, t);
    },
    post: { paper: 0, vignette: 0.35, grain: 0.03 },
    fadeOut: 0,
  });
})();
