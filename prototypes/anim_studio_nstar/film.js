// Neutron star motion reel — every visual is a pure function of t, timed from score.js.
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
    const d = disc(t), rot = t * 0.12;
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



  // pulsar beams: two opposite light cones sweeping around the shrunk photo (visual speed capped, counter carries the number)
  function beams(ctx, t) {
    const a = clamp((t - ev.b1 - 0.3) / 0.5) * (1 - clamp((t - ev.b2) / 0.4)); if (a <= 0) return;
    const d = disc(t), sp = lerp(0.6, 2.2, ease.inOutQuad(clamp((t - ev.b1) / (ev.ringLand - ev.b1))));
    const ang = (t - ev.b1) * sp * 6.283 * 0.5;
    ctx.save(); ctx.globalAlpha = a * 0.85; ctx.globalCompositeOperation = 'lighter'; ctx.translate(d.cx, d.cy);
    for (const s of [0, Math.PI]) {
      ctx.save(); ctx.rotate(ang + s);
      const g = ctx.createLinearGradient(0, 0, 620, 0); g.addColorStop(0, 'rgba(200,230,255,0.9)'); g.addColorStop(1, 'rgba(120,180,255,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(620, -70); ctx.lineTo(620, 70); ctx.closePath(); ctx.fill(); ctx.restore();
    }
    const gc = ctx.createRadialGradient(0, 0, 0, 0, 0, 120); gc.addColorStop(0, 'rgba(255,255,255,1)'); gc.addColorStop(1, 'rgba(150,200,255,0)');
    ctx.fillStyle = gc; ctx.beginPath(); ctx.arc(0, 0, 120, 0, 7); ctx.fill();
    ctx.restore();
    const g = ease.outCubic(clamp((t - ev.b1 - 0.4) / (ev.ringLand - ev.b1 - 0.4)));
    const land = t >= ev.ringLand ? pulse(t, ev.ringLand, 7) : 0;
    const val = t >= ev.ringLand ? 716 : Math.round(716 * g);
    ctx.save(); ctx.globalAlpha = a; ctx.translate(540, 900); ctx.scale(1 + 0.2 * land, 1 + 0.2 * land);
    txt(ctx, val + ' dəfə / saniyə', 0, 0, { size: 84, fam: BK, weight: 900, color: GOLD, align: 'center', stroke: 'rgba(0,0,0,0.75)', strokeW: 9 });
    ctx.restore();
    const lb = clamp((t - ev.ringLand - 0.2) / 0.4);
    if (lb > 0) txt(ctx, 'blenderdən 2 dəfə sürətli', 540, 200, { size: 44, fam: BD, weight: 700, color: WHITE, align: 'center', alpha: a * lb, stroke: 'rgba(0,0,0,0.75)', strokeW: 6 });
  }

  function starBall(ctx, x, y, r) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2.4);
    g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.35, 'rgba(190,220,255,0.95)'); g.addColorStop(0.42, 'rgba(120,170,255,0.45)'); g.addColorStop(1, 'rgba(80,120,255,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 2.4, 0, 7); ctx.fill();
  }
  function earth(ctx, x, y, r) {
    ctx.fillStyle = '#2f78d0'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(90,180,100,0.9)'; ctx.beginPath(); ctx.arc(x + r * 0.2, y - r * 0.15, r * 0.4, 0, 7); ctx.fill();
  }

  // beat 2: tiny star (≈ 20 km) on a scale against a growing pile of Earths; counter to 500 000 Yer
  function mass(ctx, t) {
    const a = clamp((t - ev.b2 + 0.1) / 0.5) * (1 - clamp((t - ev.b3) / 0.4)); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a;
    const p = ease.inOutQuad(clamp((t - ev.b2 - 0.6) / (ev.walk - ev.b2 - 0.6)));
    const tilt = lerp(-0.18, 0, p) ;
    // beam of the scale
    ctx.save(); ctx.translate(540, 560); ctx.rotate(tilt);
    ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-380, 0); ctx.lineTo(380, 0); ctx.stroke();
    ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-380, 0); ctx.lineTo(-380, 110); ctx.moveTo(380, 0); ctx.lineTo(380, 110); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fillRect(-470, 110, 180, 8); ctx.fillRect(290, 110, 180, 8);
    // left pan: the neutron star
    starBall(ctx, -380, 70, 22 + 2 * Math.sin(t * 8));
    // right pan: earths piling up
    const n = Math.floor(p * 36);
    for (let i = 0; i < n; i++) { const row = Math.floor(i / 6), col = i % 6; earth(ctx, 300 + col * 30 + (row % 2) * 15, 96 - row * 26, 13); }
    ctx.restore();
    ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(540, 560); ctx.lineTo(540, 820); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(470, 820); ctx.lineTo(610, 820); ctx.stroke();
    const lb = clamp((t - ev.b2 - 0.5) / 0.4);
    txt(ctx, 'eni ≈ 20 km', 160, 470, { size: 44, fam: BK, weight: 900, color: WHITE, align: 'left', alpha: lb, stroke: 'rgba(0,0,0,0.75)', strokeW: 6 });
    const land = t >= ev.walk ? pulse(t, ev.walk, 7) : 0;
    const v = t >= ev.walk ? 500000 : Math.round(500000 * p / 1000) * 1000;
    const s = String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0') + ' Yer';
    ctx.save(); ctx.translate(540, 925); ctx.scale(1 + 0.2 * land, 1 + 0.2 * land);
    txt(ctx, s, 0, 0, { size: 84, fam: BK, weight: 900, color: GOLD, align: 'center', stroke: 'rgba(0,0,0,0.75)', strokeW: 9 });
    ctx.restore();
    txt(ctx, 'çəkisi', 540, 230, { size: 44, fam: BD, weight: 700, color: WHITE, align: 'center', alpha: lb, stroke: 'rgba(0,0,0,0.75)', strokeW: 6 });
    ctx.restore();
  }

  // beat 3: a teaspoon of glowing star matter; counter to 1 milyard+ ton
  function spoon(ctx, t) {
    const a = clamp((t - ev.b3) / 0.5); if (a <= 0) return;
    ctx.save(); ctx.globalAlpha = a; ctx.translate(540, 520); ctx.rotate(-0.35 + 0.03 * Math.sin(t * 2));
    ctx.fillStyle = '#c9ced8'; ctx.beginPath(); ctx.roundRect(60, -18, 380, 36, 18); ctx.fill();
    ctx.fillStyle = '#dfe3ea'; ctx.beginPath(); ctx.ellipse(-60, 0, 150, 95, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#9aa1ae'; ctx.beginPath(); ctx.ellipse(-60, 0, 128, 76, 0, 0, 7); ctx.fill();
    const fill = ease.outCubic(clamp((t - ev.thin) / 0.8));
    if (fill > 0) { ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = a * fill;
      const g = ctx.createRadialGradient(-60, 0, 0, -60, 0, 140); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.5, 'rgba(160,200,255,0.9)'); g.addColorStop(1, 'rgba(80,120,255,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(-60, 0, 120 * fill, 70 * fill, 0, 0, 7); ctx.fill(); }
    ctx.restore();
    const p = ease.inOutQuad(clamp((t - ev.thin) / (ev.house - ev.thin)));
    const land = t >= ev.house ? pulse(t, ev.house, 7) : 0;
    let lbl;
    if (t >= ev.house) lbl = 'milyardlarla ton';
    else lbl = String(Math.round(Math.pow(10, 9 * p))).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0') + ' ton';
    ctx.save(); ctx.translate(540, 860); ctx.scale(1 + 0.2 * land, 1 + 0.2 * land);
    txt(ctx, lbl, 0, 0, { size: 84, fam: BK, weight: 900, color: GOLD, align: 'center', stroke: 'rgba(0,0,0,0.75)', strokeW: 9 });
    ctx.restore();
    txt(ctx, '1 çay qaşığı', 540, 230, { size: 48, fam: BK, weight: 900, color: WHITE, align: 'center', alpha: a, stroke: 'rgba(0,0,0,0.75)', strokeW: 6 });
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
      IMG = await Studio.loadImage('assets/star.jpg');
    },
    draw(ctx, t) {
      sky(ctx, t); photo(ctx, t); beams(ctx, t); mass(ctx, t); spoon(ctx, t);
      for (const t0 of [ev.ringLand, ev.walk, ev.house]) { const fl = t >= t0 ? 0.22 * Math.exp(-(t - t0) * 10) : 0;
        if (fl > 0.01) { ctx.fillStyle = `rgba(200,225,255,${fl})`; ctx.fillRect(0, 0, W, 940); } }
      hook(ctx, t); beatText(ctx, t); chrome(ctx, t);
    },
    post: { paper: 0, vignette: 0.35, grain: 0.03 },
    fadeOut: 0,
  });
})();
