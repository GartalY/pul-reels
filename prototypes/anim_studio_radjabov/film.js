// Teymur Radjabov motion reel (21:30, 12 Nov 2026) — every visual is a pure function of t, timed from score.js.
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

  // Bahramov portrait: full frame in the hook, dim behind the graphics, back in beat 3
  function photo(ctx, t) {
    if (!IMG) return;
    const dim = t < ev.b1 ? 1 : t < ev.b3 ? lerp(1, 0.15, clamp((t - ev.b1) / 0.6)) : lerp(0.15, 0.55, clamp((t - ev.b3) / 0.8));
    const z = 1.0 + 0.06 * (t / S.DURATION);
    const ih = H * z, iw = ih * IMG.width / IMG.height;
    ctx.save(); ctx.globalAlpha = dim; ctx.drawImage(IMG, 560 - iw / 2, H / 2 - ih / 2, iw, ih); ctx.restore();
  }
  function hook(ctx, t) {
    const a = 1 - ease.inOutQuad(clamp((t - ev.b1 + 0.05) / 0.3)); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = 0.72 * a; ctx.fillStyle = '#0c0e16'; ctx.beginPath(); ctx.roundRect(30, 190, W - 60, 360, 28); ctx.fill(); ctx.restore();
    S.HOOK.forEach((ln, k) => {
      const key = /\d/.test(ln), sc = key ? 1 + 0.03 * Math.sin(t * 5) : 1;
      ctx.save(); ctx.translate(540, 300 + k * 110); ctx.scale(sc, sc);
      txt(ctx, ln, 0, 0, { size: k === 0 ? 120 : 84, fam: BK, weight: 900, color: k === 1 ? WHITE : GOLD, align: 'center', alpha: a, stroke: 'rgba(0,0,0,0.8)', strokeW: 10 });
      ctx.restore();
    });
  }
  function pill(ctx, s, x, y, a, gold, sc, size) {
    size = size || 54; const w = G.measure(ctx, s, size, BK, 900) + 80;
    ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.globalAlpha = a;
    ctx.fillStyle = gold ? GOLD : 'rgba(14,17,28,0.9)'; ctx.beginPath(); ctx.roundRect(-w / 2, -56, w, 88, 44); ctx.fill();
    if (!gold) { ctx.strokeStyle = GOLD; ctx.lineWidth = 4; ctx.stroke(); }
    txt(ctx, s, 0, 6, { size, fam: BK, weight: 900, color: gold ? INK : WHITE, align: 'center' });
    ctx.restore();
  }
  // beat 1: born in Baku 1987 -> age counter -> 14: grandmaster
  function age(ctx, t) {
    const a = clamp((t - ev.b1 - 0.2) / 0.5) * (1 - clamp((t - ev.b2 + 0.2) / 0.4)); if (a <= 0) return;
    pill(ctx, 'BAKI · 1987', 540, 300, a, false, ease.outBack(clamp((t - ev.b1 - 0.2) / 0.5)));
    const p = ease.inOutQuad(clamp((t - ev.b1 - 0.8) / (ev.ringLand - ev.b1 - 0.8)));
    const n = t >= ev.ringLand ? 14 : Math.round(14 * p), land = t >= ev.ringLand ? pulse(t, ev.ringLand, 7) : 0;
    ctx.save(); ctx.translate(540, 600); ctx.scale(1 + 0.2 * land, 1 + 0.2 * land);
    lab(ctx, n + ' yaş', 0, 0, 170, GOLD, a); ctx.restore();
    const s = clamp((t - ev.ringLand) / 0.35);
    if (s > 0) pill(ctx, '2001: qrossmeyster', 540, 780, a, true, ease.outBack(s));
  }
  function piece(ctx, x, y, r, white, king, rot) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot || 0);
    ctx.fillStyle = white ? '#f4f1ea' : '#1a1a1f'; ctx.strokeStyle = white ? '#1a1a1f' : '#f4f1ea'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.roundRect(-r * 0.8, r * 0.55, r * 1.6, r * 0.45, 6); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-r * 0.5, r * 0.55); ctx.lineTo(-r * 0.3, -r * 0.5); ctx.lineTo(r * 0.3, -r * 0.5); ctx.lineTo(r * 0.5, r * 0.55); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, -r * 0.7, r * 0.38, 0, 7); ctx.fill(); ctx.stroke();
    if (king) { ctx.fillRect(-r * 0.08, -r * 1.45, r * 0.16, r * 0.45); ctx.fillRect(-r * 0.25, -r * 1.3, r * 0.5, r * 0.14); }
    ctx.restore();
  }
  // beat 2: Linares 2003, chessboard; white king (Kasparov) topples, black wins
  function chess(ctx, t) {
    const a = clamp((t - ev.b2 + 0.1) / 0.5) * (1 - clamp((t - ev.b3) / 0.4)); if (a <= 0) return;
    lab(ctx, 'LİNARES · 2003', 540, 240, 60, GOLD, a);
    const sz = 520, x0 = 540 - sz / 2, y0 = 300, c = sz / 8;
    const tilt = ease.outCubic(clamp((t - ev.b2) / 0.8));
    ctx.save(); ctx.globalAlpha = a * tilt;
    for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { ctx.fillStyle = (i + j) % 2 ? '#8a5a3c' : '#e8d3b0'; ctx.fillRect(x0 + i * c, y0 + j * c, c, c); }
    ctx.strokeStyle = GOLD; ctx.lineWidth = 6; ctx.strokeRect(x0, y0, sz, sz);
    const fall = ease.inOutCubic(clamp((t - ev.walk + 0.6) / 0.6));
    piece(ctx, x0 + 6.5 * c, y0 + 6.5 * c + fall * 8, c * 0.42, true, true, fall * 1.45);
    piece(ctx, x0 + 1.5 * c, y0 + 1.5 * c, c * 0.42, false, true, 0);
    piece(ctx, x0 + 5.5 * c, y0 + 4.5 * c, c * 0.36, false, false, 0);
    piece(ctx, x0 + 3.5 * c, y0 + 2.5 * c, c * 0.36, true, false, 0);
    ctx.restore();
    lab(ctx, 'Kasparov · ağ · dünya №1', 540, 870, 40, WHITE, a * tilt);
    const s = clamp((t - ev.walk) / 0.35);
    if (s > 0) pill(ctx, 'QALİB: 15 YAŞLI TEYMUR', 540, 560, a, true, ease.outBack(s), 50);
  }
  // beat 3: portrait back, two pills
  function names(ctx, t) {
    const a = clamp((t - ev.b3) / 0.5); if (a <= 0) return;
    const tt = [ev.thin, ev.house];
    ['«Ən gözəl oyun» mükafatı', '2019: Dünya Kuboku'].forEach((n, i) => {
      const s = clamp((t - tt[i]) / 0.35); if (s <= 0) return;
      pill(ctx, n, 540, 300 + i * 130, a, i === 1, ease.outBack(s));
    });
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
      IMG = await Studio.loadImage('assets/rad.jpg');
    },
    draw(ctx, t) {
      ctx.fillStyle = '#0b0d14'; ctx.fillRect(0, 0, W, H); photo(ctx, t); age(ctx, t); chess(ctx, t); names(ctx, t);
      for (const t0 of [ev.ringLand, ev.walk, ev.house]) { const fl = t >= t0 ? 0.18 * Math.exp(-(t - t0) * 10) : 0;
        if (fl > 0.01) { ctx.fillStyle = `rgba(255,220,160,${fl})`; ctx.fillRect(0, 0, W, 940); } }
      hook(ctx, t); beatText(ctx, t); chrome(ctx, t);
    },
    post: { paper: 0, vignette: 0.35, grain: 0.03 },
    fadeOut: 0,
  });
})();
