// ---------------------------------------------------------------- AI-illustrated scenes (ElevenLabs gpt-image) + code motion
// pan(img): fill the 9:16 frame from a 16:9 picture, slide horizontally fx0→fx1 and push in z0→z1 over [t0,t1]
function pan(ctx, img, t, t0, t1, fx0, fx1, z0 = 1.0, z1 = 1.12, fy = 0.5, dim = 0) {
  if (!img) { fill(ctx, '#111'); return; }
  const p = E.inOutSine ? E.inOutSine(clamp((t - t0) / (t1 - t0))) : clamp((t - t0) / (t1 - t0));
  M.cover(ctx, img, 0, 0, W, H, { fx: lerp(fx0, fx1, p), fy, zoom: lerp(z0, z1, p) });
  if (dim) { ctx.fillStyle = `rgba(0,0,0,${dim})`; ctx.fillRect(0, 0, W, H); }
}
function vignette(ctx, a = 0.55) { const g = ctx.createRadialGradient(W / 2, H * 0.45, H * 0.25, W / 2, H / 2, H * 0.8);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${a})`); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const top = ctx.createLinearGradient(0, 0, 0, s.y + 320); top.addColorStop(0, 'rgba(0,0,0,0.55)'); top.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = top; ctx.fillRect(0, 0, W, s.y + 320); }
function flyingBills(ctx, t, t0, n = 16, seed = 1) { if (t < t0) return;
  for (let i = 0; i < n; i++) { const ph = ((t - t0) * (0.35 + 0.3 * hash01(i, seed)) + hash01(i, seed + 1)) % 1;
    const x = W * hash01(i, seed + 2) + Math.sin((t + i) * 1.3) * 60, y = lerp(-150, H + 150, ph), sc = 0.7 + hash01(i, seed + 3) * 1.4;
    bill(ctx, x, y, 120 * sc, ph * 9 * (hash01(i, seed + 4) - 0.5), 0.9); } }
function flashCut(ctx, t, t0) { const a = 1 - clamp((t - t0) / 0.12); if (a > 0 && t >= t0) { ctx.fillStyle = `rgba(255,255,255,${0.35 * a})`; ctx.fillRect(0, 0, W, H); } }

// A: hook (0–4.2) — the cracking chip tower, money flying at the lens, counter to $450 000 000 000
function sMoney(ctx, t, I) {
  pan(ctx, I.hook, t, 0, 4.2, 0.42, 0.55, 1.05, 1.25); vignette(ctx);
  flyingBills(ctx, t, 0.2, 14, 3);
  const ck = E.outCubic(prog(t, 0.05, 1.7)); bigNumber(ctx, Math.round(450e9 * ck / 1e9) * 1e9, cx, s.y + 470, 92, C.nv);
  if (t > 2.4) { ctx.save(); ctx.globalAlpha = clamp(prog(t, 2.5, 2.7)); ctx.strokeStyle = C.red; ctx.lineWidth = 22; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(s.x + 30, s.y + 490); ctx.lineTo(lerp(s.x + 30, s.x + s.w - 30, clamp(prog(t, 2.5, 2.8))), s.y + 420); ctx.stroke(); ctx.restore(); }
  tag(ctx, 'YOX OLDU', cx, s.y + 1250, 104, 2.6, t, { rot: -0.07 });
}
// B: ×5 (4.2–7.5) — pan from the small Azerbaijan stack (left) to the five towers (right)
function sCompare(ctx, t, I) {
  pan(ctx, I.compare, t, 4.2, 7.4, 0.02, 0.78, 1.0, 1.06); vignette(ctx, 0.45);
  const p = clamp((t - 4.2) / 3.2);
  if (t > 4.3 && p < 0.35) tag(ctx, 'Azərbaycan · 1 il', cx, s.y + 1180, 56, 4.35, t, { rot: -0.03, col: C.white, txt: C.ink });
  for (let i = 0; i < 5; i++) { const t0 = 5.3 + i * 0.3; if (t < t0) continue; const k = sp(t, t0, SPRING.bouncy);
    ctx.save(); ctx.translate(s.x + 120 + i * 200, s.y + 1180); ctx.scale(Math.min(1.1, k), Math.min(1.1, k));
    ctx.beginPath(); ctx.arc(0, 0, 62, 0, TAU); ctx.fillStyle = C.yel; ctx.fill(); stroke(ctx, 6); text(ctx, `×${i + 1}`, 0, 18, font(52, 800, UI), C.ink, 'center'); ctx.restore(); }
  slam(ctx, '5 DƏFƏ ÇOX', cx, s.y + 560, 150, C.red, 6.8, t, -0.04);
}
// C: why (7.5–12.4) — stage, slow push-in on the lone figure, cracked heart above
function sWhy(ctx, t, I) {
  pan(ctx, I.stage, t, 7.5, 12.4, 0.5, 0.5, 1.0, 1.35, 0.6); vignette(ctx, 0.5);
  if (t < 8.6) slam(ctx, 'SƏBƏB?', cx, s.y + 760, 200, C.yel, 7.6, t, -0.05);
  tag(ctx, 'CENSEN HUANQ · Nvidia qurucusu', cx, s.y + 1330, 44, 9.0, t, { rot: 0, col: C.nv, txt: C.ink });
  tag(ctx, 'ETİRAF', cx, s.y + 560, 90, 11.2, t, { rot: -0.08 });
}
// D: the claim + the company (12.4–18.9) — dossier card over the dimmed, blurred city
function sClaim(ctx, t, I) {
  pan(ctx, I.hookBlur, t, 12.4, 18.9, 0.2, 0.35, 1.3, 1.4, 0.5, 0.45); vignette(ctx, 0.6);
  const fk = sp(t, 12.9, SPRING.bouncy);
  if (fk > 0 && t < 16.5) { ctx.save(); ctx.translate(cx, s.y + 830); ctx.rotate(-0.05 + 0.02 * Math.sin(t)); ctx.scale(Math.min(1.08, fk), Math.min(1.08, fk));
    rrect(ctx, -330, -260, 660, 520, 20); ctx.fillStyle = '#E3C27F'; ctx.fill(); ctx.shadowBlur = 0; stroke(ctx, 8);
    rrect(ctx, -330, -310, 240, 70, 14); ctx.fillStyle = '#E3C27F'; ctx.fill(); stroke(ctx, 8);
    text(ctx, 'ABŞ KƏŞFİYYATI', 0, -170, font(56, 800, UI), C.ink, 'center'); text(ctx, 'MƏXFİ', 190, 220, font(40, 800, UI), C.red, 'center');
    ctx.fillStyle = C.ink; ctx.beginPath(); ctx.ellipse(0, -30, 150, 26, 0, 0, TAU); ctx.fill(); rrect(ctx, -80, -120, 160, 95, 20); ctx.fill();
    text(ctx, '?', 0, 170, font(190, 800, UI), C.ink, 'center'); ctx.restore(); }
  if (t < 16.5) tag(ctx, 'İDDİA · SÜBUT YOXDUR', cx, s.y + 1300, 50, 14.6, t, { rot: -0.04, col: C.yel, txt: C.ink });
  if (t > 16.4) { const k = sp(t, 16.6, SPRING.bouncy); ctx.save(); ctx.translate(cx, s.y + 800); ctx.scale(Math.min(1.1, k), Math.min(1.1, k));
        ctx.beginPath(); ctx.moveTo(0, -270); ctx.lineTo(240, -185); ctx.quadraticCurveTo(230, 120, 0, 270); ctx.quadraticCurveTo(-230, 120, -240, -185); ctx.closePath();
    ctx.fillStyle = C.nv; ctx.fill(); ctx.shadowBlur = 0; stroke(ctx, 10);
    ctx.strokeStyle = C.ink; ctx.lineWidth = 28; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-95, 0); ctx.lineTo(-20, 85); ctx.lineTo(115, -85); ctx.stroke(); ctx.restore();
    tag(ctx, 'Şirkət: sirr sızmayıb', cx, s.y + 1300, 50, 16.9, t, { rot: 0.03, col: C.white, txt: C.ink }); }
}
// E: crash + resignation (18.9–22.5) — tight on the falling red arrow
function sCrash(ctx, t, I) {
  pan(ctx, I.hook, t, 18.9, 22.5, 0.86, 0.95, 1.9, 2.3, 0.15); vignette(ctx, 0.5);
  const sh = t > 19.0 && t < 19.4 ? (hash01(Math.floor(t * 60), 4) - 0.5) * 18 : 0; ctx.save(); ctx.translate(sh, 0);
  const v = Math.round(450 * E.outCubic(prog(t, 19.0, 20.2)));
  slam(ctx, `−$${v} MLRD`, cx, s.y + 760, 130, C.red, 19.0, t, -0.03, 1.4); ctx.restore();
  ctx.save(); ctx.globalAlpha = 0.25 + 0.25 * Math.sin(t * 12); ctx.fillStyle = C.red; ctx.fillRect(0, 0, W, H); ctx.restore();
  tag(ctx, 'İSTEFA · 12 noyabr', cx, s.y + 1150, 96, 20.6, t, { rot: -0.08 });
}
// F: price of one confession (22.5–27.5) — wide city, swinging tag, money rain
function sPrice(ctx, t, I) {
  pan(ctx, I.hook, t, 22.5, 27.5, 0.5, 0.44, 1.0, 1.08); vignette(ctx, 0.55);
  const k = sp(t, 22.9, SPRING.wobbly), sw = 0.12 * Math.sin((t - 22.9) * 3) * Math.exp(-(t - 22.9) * 0.6);
  if (k > 0) { ctx.save(); ctx.translate(cx, s.y + 360); ctx.rotate(sw);
    ctx.strokeStyle = '#ddd'; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, -400); ctx.lineTo(0, 120); ctx.stroke();
    ctx.translate(0, 120 + (1 - Math.min(1, k)) * -300);
        ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(60, 0); ctx.lineTo(300, 200); ctx.lineTo(300, 700); ctx.lineTo(-300, 700); ctx.lineTo(-300, 200); ctx.closePath();
    ctx.fillStyle = C.white; ctx.fill(); ctx.shadowBlur = 0; stroke(ctx, 10);
    ctx.beginPath(); ctx.arc(0, 60, 24, 0, TAU); ctx.fillStyle = '#333'; ctx.fill(); stroke(ctx, 6);
    text(ctx, 'Bir etirafın', 0, 290, font(70, 800, UI), C.ink, 'center'); text(ctx, 'qiyməti', 0, 370, font(70, 800, UI), C.ink, 'center');
    ctx.font = font(150, 800, UI); ctx.textAlign = 'center'; ctx.lineWidth = 16; ctx.strokeStyle = C.ink; ctx.strokeText('$450', 0, 540); ctx.fillStyle = C.red; ctx.fillText('$450', 0, 540);
    text(ctx, 'MİLYARD', 0, 640, font(76, 800, UI), C.ink, 'center'); ctx.restore(); }
  flyingBills(ctx, t, 23.0, 12, 11);
}
// G: CTA end card (27.5–32.9) over the stage picture, blurred
function sEnd(ctx, t, I) {
  pan(ctx, I.stageBlur, t, 27.5, 32.9, 0.5, 0.5, 1.2, 1.3, 0.4, 0.55); vignette(ctx, 0.6);
  const k = sp(t, 27.6, SPRING.bouncy);
  if (k > 0) { ctx.save(); ctx.translate(cx, s.y + 560); ctx.rotate(0.06 * Math.sin(t * 2.4)); ctx.scale(Math.min(1.1, k), Math.min(1.1, k));
    ctx.beginPath(); ctx.arc(0, 0, 150, 0, TAU); ctx.fillStyle = C.yel; ctx.fill(); stroke(ctx, 10);
    text(ctx, '?!', 0, 58, font(180, 800, UI), C.ink, 'center'); ctx.restore(); }
  if (t > 27.9) text(ctx, '@bilirdinizmi_az', cx, s.y + 860, font(80, 800, UI), C.white, 'center');
  tag(ctx, 'BƏYƏN', cx - 200, s.y + 1060, 70, 28.1, t, { rot: -0.06, col: C.red });
  tag(ctx, 'İZLƏ', cx + 210, s.y + 1060, 70, 28.5, t, { rot: 0.05, col: C.nv, txt: C.ink });
  if (t > 29.2) text(ctx, 'Hər gün bilmədiyin bir fakt', cx, s.y + 1220, font(54, 700, UI), '#EEE', 'center');
}

M.film({
  fonts: [font(40, 800, UI)],
  images: { hook: 'assets/s1_hook.png', compare: 'assets/s2_compare.png', stage: 'assets/s3_stage.png', hookBlur: 'assets/s1_hook_blur.png', stageBlur: 'assets/s3_stage_blur.png' },
  hits: HITS,
  draw(ctx, u, tr, I) {
    const t = inv(tr);
    const cuts = [[0, sMoney], [4.2, sCompare], [7.5, sWhy], [12.4, sClaim], [18.9, sCrash], [22.5, sPrice], [27.5, sEnd]];
    let i = 0; while (i + 1 < cuts.length && t >= cuts[i + 1][0]) i++;
    cuts[i][1](ctx, t, I);
    flashCut(ctx, t, cuts[i][0]);
    captions(ctx, tr);
  },
  post(ctx, u, t) { for (let i = 0; i < 300; i++) { ctx.fillStyle = `rgba(255,255,255,${0.02 + 0.02 * hash01(i, 9)})`;
    ctx.fillRect(hash01(i, Math.floor(t * 30)) * W, hash01(i + 5, Math.floor(t * 30) + 1) * H, 2, 2); } },
});
