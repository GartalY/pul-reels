// Venus motion reel (16:00, 12 Nov 2026) — every visual is a pure function of t, timed from score.js.
(function () {
  const U = globalThis.U, G = globalThis.G, S = globalThis.SCORE, Studio = globalThis.Studio;
  const { ev } = S; const { clamp, lerp, ease, pulse } = U;
  const W = G.W, H = G.H;
  const HOT = '#ff5a2d', GOLD = '#ffc43d', INK = '#0e111c', WHITE = '#fafafc', ICE = '#dfeefa', SEA = '#1d5fae';
  const BK = 'IDBlack', BD = 'IDBold', SB = 'IDSemi';
  let IMG = null;
  const NB = (s) => s.replace(/(\d) (km|qat|milyon|gün|°C)/g, '$1 $2').replace(/(\d)–(\d)/g, '$1–$2');

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

  // Venus photo: big in the hook, shrinks onto its orbit in beat 1, returns in beat 3
  function venusAt(ctx, cx, cy, size, a) {
    if (!IMG || a <= 0) return;
    ctx.save(); ctx.globalAlpha = a; ctx.globalCompositeOperation = 'lighten';
    ctx.drawImage(IMG, cx - size / 2, cy - size / 2, size, size); ctx.restore();
  }
  function photo(ctx, t) {
    const k = ease.inOutCubic(clamp((t - ev.b1) / 1.3));
    const size = lerp(1150, 230, k) * (1 + 0.05 * clamp(t / ev.b1));
    const cx = lerp(540, 720, k), cy = lerp(680, 560, k);
    const a = 1 - clamp((t - ev.b2 + 0.2) / 0.5);
    venusAt(ctx, cx, cy, size, a);
  }
  function hook(ctx, t) {
    const a = 1 - ease.inOutQuad(clamp((t - ev.b1 + 0.05) / 0.3)); if (a <= 0) return;
    S.HOOK.forEach((ln, k) => {
      const key = /\d/.test(ln), sc = key ? 1 + 0.04 * Math.sin(t * 5) : 1;
      ctx.save(); ctx.translate(540, 300 + k * 118); ctx.scale(sc, sc);
      txt(ctx, ln, 0, 0, { size: key ? 130 : 88, fam: BK, weight: 900, color: key ? HOT : WHITE, align: 'center', alpha: a, stroke: 'rgba(0,0,0,0.7)', strokeW: 9 });
      ctx.restore();
    });
  }
  function sun(ctx, x, y, r, a) {
    ctx.save(); ctx.globalAlpha = a;
    const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r * 1.8); g.addColorStop(0, '#fff6c8'); g.addColorStop(0.35, '#ffc43d'); g.addColorStop(0.6, 'rgba(255,140,30,0.35)'); g.addColorStop(1, 'rgba(255,120,0,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 1.8, 0, 7); ctx.fill(); ctx.restore();
  }
  function mercury(ctx, x, y, r) {
    const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r); g.addColorStop(0, '#b9a796'); g.addColorStop(1, '#4e4239');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
  }
  // beat 1: Sun on the left, Mercury close, Venus about twice as far; ring lands on Venus
  function compare(ctx, t) {
    const a = clamp((t - ev.b1 - 0.4) / 0.5) * (1 - clamp((t - ev.b2 + 0.2) / 0.4)); if (a <= 0) return;
    sun(ctx, -60, 560, 190, a);
    ctx.save(); ctx.globalAlpha = a * 0.5; ctx.strokeStyle = WHITE; ctx.lineWidth = 3; ctx.setLineDash([10, 14]);
    for (const R of [390, 780]) { ctx.beginPath(); ctx.arc(-60, 560, R, -0.55, 0.55); ctx.stroke(); }
    ctx.restore();
    ctx.save(); ctx.globalAlpha = a; mercury(ctx, 330, 560, 44); ctx.restore();
    lab(ctx, 'MERKURİ', 330, 690, 48, WHITE, a); lab(ctx, '58 mln km', 330, 745, 40, WHITE, a);
    lab(ctx, 'VENERA', 720, 750, 52, GOLD, a); lab(ctx, '108 mln km', 720, 808, 42, GOLD, a);
    // distance arrows from the Sun
    const p = ease.outCubic(clamp((t - ev.b1 - 0.8) / 1.5));
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = GOLD; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(80, 880); ctx.lineTo(lerp(80, 720, p), 880); ctx.stroke();
    ctx.strokeStyle = WHITE; ctx.beginPath(); ctx.moveTo(80, 850); ctx.lineTo(lerp(80, 330, p), 850); ctx.stroke(); ctx.restore();
    const land = clamp((t - (ev.b1 + 0.9)) / (ev.ringLand - ev.b1 - 0.9));
    const r = lerp(360, 150, ease.outCubic(land)) + (t >= ev.ringLand ? 6 * Math.sin((t - ev.ringLand) * 6) : 0);
    ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = HOT; ctx.lineWidth = 7; ctx.setLineDash([26, 16]); ctx.lineDashOffset = -t * 40;
    ctx.beginPath(); ctx.arc(720, 560, r, 0, 7); ctx.stroke(); ctx.restore();
    const lb = clamp((t - ev.ringLand) / 0.4), pu = t >= ev.ringLand ? pulse(t, ev.ringLand, 7) : 0;
    if (lb > 0) { ctx.save(); ctx.translate(540, 260); ctx.scale(1 + 0.15 * pu, 1 + 0.15 * pu);
      lab(ctx, '2 dəfə uzaq, amma daha isti!', 0, 0, 52, HOT, a * lb); ctx.restore(); }
  }
  // beat 2: thermometer rises to 460 °C, passes the lead melting line (327 °C)
  function thermo(ctx, t) {
    const a = clamp((t - ev.b2 + 0.1) / 0.5) * (1 - clamp((t - ev.b3) / 0.4)); if (a <= 0) return;
    const p = ease.inOutQuad(clamp((t - ev.b2 - 0.5) / (ev.walk - ev.b2 - 0.5)));
    const x = 260, top = 300, bot = 860, maxT = 500, yOf = (v) => lerp(bot, top, v / maxT);
    const temp = p * 460;
    ctx.save(); ctx.globalAlpha = a;
    ctx.fillStyle = 'rgba(255,255,255,0.12)'; ctx.strokeStyle = WHITE; ctx.lineWidth = 5;
    ctx.beginPath(); ctx.roundRect(x - 34, top - 20, 68, bot - top + 40, 34); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(x, bot + 50, 60, 0, 7); ctx.fillStyle = HOT; ctx.fill(); ctx.stroke();
    const gy = yOf(temp); const g = ctx.createLinearGradient(0, bot, 0, top); g.addColorStop(0, '#ff8a1f'); g.addColorStop(1, '#ff2d2d');
    ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(x - 20, gy, 40, bot + 20 - gy, 20); ctx.fill();
    // lead line
    const ly = yOf(327);
    ctx.setLineDash([16, 12]); ctx.strokeStyle = '#b7c0cc'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x + 50, ly); ctx.lineTo(900, ly); ctx.stroke(); ctx.setLineDash([]);
    ctx.restore();
    const melted = temp >= 327;
    lab(ctx, 'qurğuşun əriyir: 327 °C', 360, ly - 22, 42, melted ? GOLD : '#b7c0cc', a, 'left');
    const land = t >= ev.walk ? pulse(t, ev.walk, 7) : 0;
    ctx.save(); ctx.translate(620, 720); ctx.scale(1 + 0.2 * land, 1 + 0.2 * land);
    lab(ctx, Math.round(temp) + ' °C', 0, 0, 150, HOT, a); ctx.restore();
    lab(ctx, 'Veneranın səthi', 540, 230, 52, WHITE, a);
  }
  // beat 3: Venus returns inside a thick haze; sunlight gets in, heat bounces back; day vs year counters
  function haze(ctx, t) {
    const a = clamp((t - ev.b3) / 0.5); if (a <= 0) return;
    const cx = 540, cy = 640, R = 190;
    ctx.save(); ctx.globalAlpha = a * 0.85;
    const g = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.6); g.addColorStop(0, 'rgba(255,200,90,0.85)'); g.addColorStop(1, 'rgba(255,170,60,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.6, 0, 7); ctx.fill(); ctx.restore();
    if (IMG) { ctx.save(); ctx.globalAlpha = a; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.clip(); const sz = R * 2 / 0.9; ctx.drawImage(IMG, cx - sz / 2, cy - sz / 2, sz, sz); ctx.restore(); }
    // incoming sun rays (yellow) and trapped heat (red zig-zag)
    ctx.save(); ctx.globalAlpha = a; ctx.lineWidth = 6;
    for (let i = 0; i < 3; i++) { const ph = ((t - ev.b3) * 0.8 + i / 3) % 1;
      const sx = lerp(80, cx - 60 + i * 40, ph), sy = lerp(380, cy - 40, ph);
      ctx.strokeStyle = GOLD; ctx.beginPath(); ctx.moveTo(sx - 60, sy - 40); ctx.lineTo(sx, sy); ctx.stroke(); }
    ctx.strokeStyle = HOT;
    for (let i = 0; i < 4; i++) { const ang = -2.4 + i * 1.3 + 0.3 * Math.sin(t + i), ph = ((t - ev.b3) * 1.2 + i / 4) % 1;
      const r = R * 0.5 + R * 0.9 * (ph < 0.5 ? ph * 2 : 2 - ph * 2);
      ctx.beginPath(); ctx.arc(cx + r * Math.cos(ang), cy + r * Math.sin(ang), 10, 0, 7); ctx.stroke(); }
    ctx.restore();
    lab(ctx, 'karbon qazı istini buraxmır', 540, 230, 48, WHITE, a * clamp((t - ev.b3 - 0.4) / 0.4));
    const c = clamp((t - ev.thin) / 0.4); if (c <= 0) return;
    const p = ease.inOutQuad(clamp((t - ev.thin) / (ev.house - ev.thin)));
    const day = t >= ev.house ? 243 : Math.round(243 * p), yr = t >= ev.house ? 225 : Math.round(225 * p);
    const land = t >= ev.house ? pulse(t, ev.house, 7) : 0;
    ctx.save(); ctx.globalAlpha = a * c * 0.88; ctx.fillStyle = INK; ctx.beginPath(); ctx.roundRect(90, 290, 900 - 90, 120, 26); ctx.fill(); ctx.restore();
    lab(ctx, '1 gün: ' + day + ' gün', 300, 370, 50, GOLD, a * c);
    lab(ctx, '1 il: ' + yr + ' gün', 700, 370, 50, WHITE, a * c);
    if (t >= ev.house) { ctx.save(); ctx.translate(540, 880); ctx.scale(1 + 0.2 * land, 1 + 0.2 * land);
      lab(ctx, 'gün ildən uzundur!', 0, 0, 56, GOLD, a); ctx.restore(); }
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
      IMG = await Studio.loadImage('assets/venus.jpg');
    },
    draw(ctx, t) {
      sky(ctx, t); photo(ctx, t); compare(ctx, t); thermo(ctx, t); haze(ctx, t);
      for (const t0 of [ev.ringLand, ev.walk, ev.house]) { const fl = t >= t0 ? 0.18 * Math.exp(-(t - t0) * 10) : 0;
        if (fl > 0.01) { ctx.fillStyle = `rgba(255,200,150,${fl})`; ctx.fillRect(0, 0, W, 940); } }
      hook(ctx, t); beatText(ctx, t); chrome(ctx, t);
    },
    post: { paper: 0, vignette: 0.35, grain: 0.03 },
    fadeOut: 0,
  });
})();
