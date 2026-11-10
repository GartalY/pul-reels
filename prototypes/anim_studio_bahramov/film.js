// Tofiq Bahramov 1966 motion reel (21:30, 11 Nov 2026) — every visual is a pure function of t, timed from score.js.
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
  function board(ctx, x, y, l, r, a, sc) {
    ctx.save(); ctx.translate(x, y); ctx.scale(sc || 1, sc || 1); ctx.globalAlpha = a;
    ctx.fillStyle = 'rgba(14,17,28,0.92)'; ctx.beginPath(); ctx.roundRect(-430, -90, 860, 180, 30); ctx.fill();
    ctx.strokeStyle = GOLD; ctx.lineWidth = 5; ctx.stroke();
    txt(ctx, 'İNGİLTƏRƏ', -250, 18, { size: 46, fam: BD, weight: 700, color: WHITE, align: 'center' });
    txt(ctx, 'Q. ALMANİYA', 250, 18, { size: 46, fam: BD, weight: 700, color: WHITE, align: 'center' });
    txt(ctx, l + ':' + r, 0, 34, { size: 100, fam: BK, weight: 900, color: GOLD, align: 'center' });
    ctx.restore();
  }
  // beat 1: scoreboard 2:2, the clock runs past 90' into extra time
  function score1(ctx, t) {
    const a = clamp((t - ev.b1 - 0.2) / 0.5) * (1 - clamp((t - ev.b2 + 0.2) / 0.4)); if (a <= 0) return;
    lab(ctx, 'London, 30 iyul 1966 · final', 540, 260, 46, WHITE, a);
    board(ctx, 540, 520, 2, 2, a, ease.outBack(clamp((t - ev.b1 - 0.2) / 0.5)));
    const p = clamp((t - ev.b1 - 0.9) / (ev.ringLand - ev.b1 - 0.9));
    const min = Math.round(lerp(80, 101, ease.inOutQuad(p)));
    const land = t >= ev.ringLand ? pulse(t, ev.ringLand, 7) : 0;
    ctx.save(); ctx.translate(540, 760); ctx.scale(1 + 0.2 * land, 1 + 0.2 * land);
    lab(ctx, min + "'", 0, 0, 96, min > 90 ? GOLD : WHITE, a); ctx.restore();
    const lb = clamp((t - ev.ringLand) / 0.3);
    if (lb > 0) { const w = G.measure(ctx, 'ƏLAVƏ VAXT', 50, BK, 900) + 70;
      ctx.save(); ctx.globalAlpha = a * lb; ctx.fillStyle = GOLD; ctx.beginPath(); ctx.roundRect(540 - w / 2, 820, w, 80, 40); ctx.fill(); ctx.restore();
      txt(ctx, 'ƏLAVƏ VAXT', 540, 877, { size: 50, fam: BK, weight: 900, color: INK, align: 'center', alpha: a * lb }); }
  }
  // beat 2: side-on goal: ball hits the underside of the bar, drops by the line; '?' then the linesman's flag: QOL
  function goal(ctx, t) {
    const a = clamp((t - ev.b2 + 0.1) / 0.5) * (1 - clamp((t - ev.b3) / 0.4)); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a;
    const gx = 600, bar = 380, ground = 860, depth = 230;
    ctx.fillStyle = '#1f6b3a'; ctx.fillRect(60, ground, 900, 24);
    ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 2;   // net
    for (let x = gx; x <= gx + depth; x += 30) { ctx.beginPath(); ctx.moveTo(x, bar + 8 + (x - gx) * 0.25); ctx.lineTo(x, ground); ctx.stroke(); }
    for (let y = bar + 20; y < ground; y += 30) { ctx.beginPath(); ctx.moveTo(gx, y); ctx.lineTo(gx + depth, y + 10); ctx.stroke(); }
    ctx.fillStyle = WHITE; ctx.fillRect(gx - 9, bar - 9, 18, ground - bar + 9);   // post
    ctx.fillRect(gx - 9, bar - 9, depth * 0.35, 18);                                  // crossbar (side view)
    ctx.setLineDash([14, 10]); ctx.strokeStyle = GOLD; ctx.lineWidth = 4;            // goal line
    ctx.beginPath(); ctx.moveTo(gx, ground + 30); ctx.lineTo(gx, ground + 70); ctx.stroke(); ctx.setLineDash([]);
    lab(ctx, 'qapı xətti', gx, ground + 115, 40, GOLD, 1);
    // ball path: from the left up to the bar underside, then straight down near the line, small bounce out
    const t0 = ev.b2 + 0.6, tHit = ev.b2 + 1.6, tDown = ev.b2 + 2.2, tOut = ev.b2 + 3.0;
    let bx, by;
    if (t < tHit) { const p = clamp((t - t0) / (tHit - t0)); bx = lerp(140, gx + 25, p); by = lerp(ground - 30, bar + 40, ease.outQuad(p)); }
    else if (t < tDown) { const p = clamp((t - tHit) / (tDown - tHit)); bx = gx + 25 - 10 * p; by = lerp(bar + 40, ground - 30, ease.inQuad(p)); }
    else { const p = clamp((t - tDown) / (tOut - tDown)); bx = gx + 15 - 120 * p; by = ground - 30 - 160 * Math.sin(Math.PI * p) * (1 - 0.3 * p); }
    if (t >= t0) {
      ctx.fillStyle = WHITE; ctx.beginPath(); ctx.arc(bx, by, 30, 0, 7); ctx.fill();
      ctx.fillStyle = '#222'; for (const [dx, dy] of [[0, 0], [14, -14], [-14, 12], [12, 16]]) { ctx.beginPath(); ctx.arc(bx + dx * 0.8, by + dy * 0.8, 7, 0, 7); ctx.fill(); }
    }
    if (t >= tHit) { const fl = Math.exp(-(t - tHit) * 6); if (fl > 0.02) { ctx.globalAlpha = a * fl; ctx.fillStyle = GOLD; ctx.beginPath(); ctx.arc(gx + 25, bar + 10, 70, 0, 7); ctx.fill(); ctx.globalAlpha = a; } }
    ctx.restore();
    lab(ctx, "101-ci dəqiqə · Cefri Herst", 540, 260, 46, WHITE, a);
    const q = clamp((t - tOut) / 0.3) * (1 - clamp((t - ev.walk) / 0.2));
    if (q > 0) lab(ctx, 'QOL?', 300, 560, 110, WHITE, a * q);
    const lb = clamp((t - ev.walk) / 0.3), land = t >= ev.walk ? pulse(t, ev.walk, 7) : 0;
    if (lb > 0) {
      ctx.save(); ctx.translate(290, 560); ctx.scale(1 + 0.25 * land, 1 + 0.25 * land); ctx.globalAlpha = a * lb;
      ctx.fillStyle = '#c9c9c9'; ctx.fillRect(-70, -150, 10, 230);                         // flag stick
      ctx.fillStyle = GOLD; ctx.fillRect(-60, -150, 110, 70); ctx.fillStyle = '#d23b3b'; ctx.fillRect(-60, -150, 55, 35); ctx.fillRect(-5, -115, 55, 35);
      ctx.restore();
      lab(ctx, 'QOL!', 300, 720, 110, GOLD, a * lb);
      lab(ctx, 'Tofiq Bəhramov', 300, 800, 48, WHITE, a * lb);
    }
  }
  // beat 3: photo returns; final score 4:2 and two pills
  function names(ctx, t) {
    const a = clamp((t - ev.b3) / 0.5); if (a <= 0) return;
    board(ctx, 540, 330, 4, 2, a, ease.outBack(clamp((t - ev.b3) / 0.5)));
    const tt = [ev.thin, ev.house];
    ['1966: dünya çempionu', '1993: Tofiq Bəhramov stadionu'].forEach((n, i) => {
      const s = clamp((t - tt[i]) / 0.35); if (s <= 0) return;
      const sc = ease.outBack(s), y = 560 + i * 140, w = G.measure(ctx, n, 54, BK, 900) + 80;
      ctx.save(); ctx.translate(540, y); ctx.scale(sc, sc); ctx.globalAlpha = a;
      ctx.fillStyle = i === 1 ? GOLD : 'rgba(14,17,28,0.9)'; ctx.beginPath(); ctx.roundRect(-w / 2, -56, w, 88, 44); ctx.fill();
      txt(ctx, n, 0, 6, { size: 54, fam: BK, weight: 900, color: i === 1 ? INK : WHITE, align: 'center' });
      ctx.restore();
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
      IMG = await Studio.loadImage('assets/bah.jpg');
    },
    draw(ctx, t) {
      ctx.fillStyle = '#0b0d14'; ctx.fillRect(0, 0, W, H); photo(ctx, t); score1(ctx, t); goal(ctx, t); names(ctx, t);
      for (const t0 of [ev.ringLand, ev.walk, ev.house]) { const fl = t >= t0 ? 0.18 * Math.exp(-(t - t0) * 10) : 0;
        if (fl > 0.01) { ctx.fillStyle = `rgba(255,220,160,${fl})`; ctx.fillRect(0, 0, W, 940); } }
      hook(ctx, t); beatText(ctx, t); chrome(ctx, t);
    },
    post: { paper: 0, vignette: 0.35, grain: 0.03 },
    fadeOut: 0,
  });
})();
