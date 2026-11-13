// Chapter 5 — The biggest asset is you: the World Bank counts buildings, machines, nature AND people ·
// not for sale: future lifetime earnings (skills, health, education) · 2018: ≈ $1,152 tn — more than a quadrillion ·
// 64 % = human capital, "us" · schools + hospitals: people are most of the balance sheet · nurse, farmer, student; gold = small change.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C; const A = P.A;
  const W = G.W, H = G.H;
  P.cardShot('c5', 5, 'The biggest asset is you', (ctx, t) => { for (let i = 0; i < 9; i++) P.person(ctx, ((t * 40 + i * 260) % 2400) - 200, 1100, 0.6, t, { pose: 'walk', seed: i, a: 0.2 }); });
  const gear = (x, y, r, t) => { const pts = []; for (let i = 0; i <= 64; i++) { const a = i / 64 * 6.283 + t * 0.6; const rr = r * (i % 8 < 4 ? 1 : 0.8); pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr]); } return [{ pts, closed: true, fill: 'rgba(234,244,255,0.08)' }, { pts: P.circPts(x, y, r * 0.35, 24) }]; };

  // S1 — the World Bank's ledger: buildings, machines, nature … and people
  P.shot(ev.c5_s1, (ctx, t, s) => {
    P.bp(ctx, t);
    P.kicker(ctx, 'World Bank · The Changing Wealth of Nations', t, ev.c5_wb, { color: C.yel });
    P.write(ctx, 'WEALTH  =', 230, 240, t, ev.c5_s1 + 0.3, { size: 80, color: C.yel, align: 'left' });
    const items = [[ev.c5_bld, (k) => P.art(ctx, A.tower(120, 300), k, { x: 330, y: 700 }), 'BUILDINGS'], [ev.c5_mach, (k) => P.art(ctx, gear(730, 560, 120, t), k, {}), 'MACHINES'], [ev.c5_nat, (k) => P.art(ctx, A.tree(300), k, { x: 1130, y: 700, color: C.mint }), 'NATURE']];
    items.forEach(([t0, f, lab], i) => { const k = P.oc((t - t0 + 0.2) / 0.7); f(k); G.text(ctx, lab, 330 + i * 400, 800, { size: 40, fam: 'Inter', weight: 800, color: C.ln, align: 'center', alpha: k, boil: 0 }); if (i < 3) { const pk = P.pop(t, t0 + 0.4, 0.3); if (pk > 0) G.text(ctx, '+', 530 + i * 400, 600, { size: 90 * pk, fam: 'Bungee', color: C.yel, align: 'center', boil: 0 }); } });
    const pk = P.pop(t, ev.c5_people, 0.5); if (pk > 0) { P.glow(ctx, 1560, 560, 260, C.yel, pk * (0.6 + 0.3 * Math.sin(t * 3))); P.person(ctx, 1560, 720, 1.1 * pk, t, { color: C.yel, fill: 'rgba(255,213,74,0.25)', lw: 5, pose: 'arms' }); G.text(ctx, 'PEOPLE', 1560, 800, { size: 48, fam: 'Inter', weight: 800, color: C.yel, align: 'center', alpha: clamp(pk), boil: 0 }); P.ring(ctx, 1560, 560, t, ev.c5_people, { r: 260, color: C.yel }); }
  }, { in: { type: 'fade', dur: 0.4 } });

  // S2 — NOT FOR SALE: it counts what people will earn over their working lives — skills, health, education
  P.shot(ev.c5_s2, (ctx, t, s) => {
    P.bp(ctx, t);
    P.stamp(ctx, 'NOT FOR SALE', 960, 170, t, ev.c5_sale, { size: 64, color: C.cor, rot: -0.04, t1: ev.c5_earn + 0.4 });
    // a working life: age 20 → 65 timeline, coins accumulate above it
    const lk = P.eio((t - ev.c5_earn + 0.3) / 2.4);
    P.line(ctx, 260, 760, 1660, 760, C.ln, 5, 1, P.fin(t, ev.c5_s2, 0.5)); for (const [x, a] of [[260, '20'], [960, '42'], [1660, '65']]) G.text(ctx, 'AGE ' + a, x, 820, { size: 32, fam: 'Inter', weight: 800, color: C.ln2, align: 'center', boil: 0, alpha: P.fin(t, ev.c5_s2 + 0.3, 0.3) });
    const px = lerp(260, 1660, lk); P.person(ctx, px, 740, 0.75, t, { pose: 'walk', seed: 3 });
    for (let i = 0; i < 16; i++) { const cx = 300 + i * 88; if (cx > px - 30) continue; const st = Math.floor(i / 1); P.art(ctx, A.coin(26), 1, { x: cx, y: 620 - (i % 4) * 16 - Math.floor(i / 4) * 10, lw: 3 }); }
    P.note(ctx, 'everything they will earn', null, null, 960, 340, t, ev.c5_earn, { size: 52 });
    const ic = [[ev.c5_skills, 'SKILLS', (x, y) => [[[x - 40, y + 30], [x + 40, y - 30]], [[x + 22, y - 44], [x + 52, y - 14]]]], [ev.c5_health, 'HEALTH', (x, y) => [{ pts: [[x, y + 36], [x - 46, y - 6], [x - 30, y - 38], [x, y - 20], [x + 30, y - 38], [x + 46, y - 6]], closed: true, fill: 'rgba(255,123,92,0.35)', color: C.cor }]], [ev.c5_edu, 'EDUCATION', (x, y) => [{ pts: [[x - 60, y - 10], [x, y - 40], [x + 60, y - 10], [x, y + 20]], closed: true, fill: 'rgba(255,213,74,0.3)' }, [[x - 34, y + 4], [x - 34, y + 34], [x + 34, y + 34], [x + 34, y + 4]]]]];
    ic.forEach(([t0, lab, f], i) => { const k = P.oc((t - t0 + 0.1) / 0.5); const x = 480 + i * 380, y = 920; P.art(ctx, f(x - 120, y - 16), k, { lw: 4 }); G.text(ctx, lab, x + 10, y, { size: 40, fam: 'Inter', weight: 800, color: C.yel, alpha: k, boil: 0 }); });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — 2018: ≈ $1,152 trillion. More than a quadrillion (1 with 15 zeros).
  P.shot(ev.c5_s3, (ctx, t, s) => {
    P.bp(ctx, t);
    P.ytag(ctx, 'WORLD BANK · 2018', 960, 180, t, ev.c5_2018, 1e9, { size: 36 });
    P.bcount(ctx, { x: 960, y: 480, to: 1152, t, t0: ev.c5_1152a, t1: ev.c5_1152, size: 170, prefix: '$', sub: 'TRILLION — THE WORLD’S TOTAL WEALTH', subSize: 44 });
    const qk = P.fin(t, ev.c5_quad - 0.2, 0.3); if (qk > 0) { P.digits(ctx, '1,000,000,000,000,000', 960, 820, { size: 66, a: qk, land: Math.exp(-(t - ev.c5_quad) * 3) }); P.note(ctx, 'a quadrillion = 1 with 15 zeros', null, null, 960, 920, t, ev.c5_quad + 0.3, { size: 42 }); }
    P.dim(ctx, 260, 640, 1660, 640, '13 × WORLD GDP (2018)', P.fin(t, ev.c5_1152 + 0.3, 0.7), { size: 32, color: C.ln2 });
  }, { in: { type: 'fade', dur: 0.35 } });

  // S4 — 64 %, almost two thirds, is human capital. Us.
  P.shot(ev.c5_s4, (ctx, t, s) => {
    P.bp(ctx, t);
    const cx = 700, cy = 560, r = 330; const k = P.eio((t - ev.c5_64 + 0.2) / 1.0);
    ctx.save(); ctx.strokeStyle = 'rgba(234,244,255,0.25)'; ctx.lineWidth = 90; ctx.beginPath(); ctx.arc(cx, cy, r - 45, 0, 7); ctx.stroke();
    ctx.strokeStyle = C.yel; ctx.beginPath(); ctx.arc(cx, cy, r - 45, -Math.PI / 2, -Math.PI / 2 + 0.64 * 6.283 * k); ctx.stroke(); ctx.restore();
    P.bcount(ctx, { x: cx, y: cy + 50, to: 64, t, t0: ev.c5_64 - 0.2, t1: ev.c5_64 + 0.8, size: 130, suffix: '%' });
    P.note(ctx, 'everything else ≈ 36 %', cx - 280, cy + 180, 330, 990, t, ev.c5_thirds + 0.4, { size: 38, color: C.ln2 });
    P.write(ctx, 'HUMAN CAPITAL', 1380, 380, t, ev.c5_64 + 0.4, { size: 70, color: C.yel });
    P.note(ctx, 'almost two thirds', null, null, 1380, 470, t, ev.c5_thirds, { size: 48, color: C.ln });
    for (let i = 0; i < 5; i++) { const kk = P.pop(t, ev.c5_us + i * 0.06, 0.35); if (kk > 0) P.person(ctx, 1180 + i * 100, 820, 0.62 * kk, t, { seed: i, color: C.yel, fill: 'rgba(255,213,74,0.22)', lw: 3.5 }); }
    P.stamp(ctx, 'US.', 1380, 950, t, ev.c5_us, { size: 90, color: C.yel, fg: C.ink2 });
    P.source(ctx, 'World Bank, The Changing Wealth of Nations 2021', t, ev.c5_s4 + 0.4);
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S5 — schools and hospitals: people aren't just a cost on the balance sheet, they're most of it
  P.shot(ev.c5_s5, (ctx, t, s) => {
    P.bp(ctx, t);
    P.art(ctx, A.school(300), P.oc((t - ev.c5_schools + 0.2) / 0.8), { x: 400, y: 600 }); P.art(ctx, A.hospital(300), P.oc((t - ev.c5_hosp + 0.2) / 0.8), { x: 400, y: 1000 });
    for (const [y, t0] of [[480, ev.c5_schools], [860, ev.c5_hosp]]) P.arrow(ctx, 620, y, 900, 640, { color: C.yel, lw: 8, head: 26, k: P.eio((t - t0 - 0.3) / 0.6) });
    P.panel(ctx, 960, 300, 800, 620, P.fin(t, ev.c5_s5 + 0.2, 0.4));
    G.text(ctx, 'BALANCE SHEET', 1360, 380, { size: 40, fam: 'Inter', weight: 800, color: C.ln2, align: 'center', alpha: P.fin(t, ev.c5_s5 + 0.4, 0.3), boil: 0 });
    const ck = P.fin(t, ev.c5_cost - 0.2, 0.3); G.text(ctx, 'PEOPLE = A COST?', 1360, 520, { size: 54, fam: 'Inter', weight: 800, color: C.ln, align: 'center', alpha: ck, boil: 0 }); P.cross(ctx, 1080, 470, 1640, 540, (t - ev.c5_cost - 0.4) / 0.4, { lw: 9 });
    const mk = P.eio((t - ev.c5_most) / 0.8); P.rect(ctx, 1060, 860 - 260 * mk, 600, 260 * mk, 6, 'rgba(255,213,74,0.5)', { stroke: C.yel, lw: 3 }); P.rect(ctx, 1060, 860 - 260 - 146 * mk, 600, 146 * mk, 6, 'rgba(234,244,255,0.15)', { stroke: C.ln2, lw: 3, a: mk > 0 ? 1 : 0 });
    if (mk > 0.6) G.text(ctx, 'PEOPLE: MOST OF IT', 1360, 760, { size: 46, fam: 'Inter', weight: 800, color: C.ink2, align: 'center', boil: 0 });
  }, { in: { type: 'fade', dur: 0.35 } });

  // S6 — every nurse, farmer, student is part of the biggest asset; next to that, all the gold is small change
  P.shot(ev.c5_s6, (ctx, t, s) => {
    P.bp(ctx, t);
    const ppl = [[ev.c5_nurse, 'nurse', 'NURSE', 420], [ev.c5_farmer, 'hat', 'FARMER', 760], [ev.c5_student, 'book', 'STUDENT', 1100]];
    ppl.forEach(([t0, prop, lab, x], i) => { const k = P.pop(t, t0, 0.45); if (k <= 0) return; P.person(ctx, x, 880, 1.45 * k, t, { prop, seed: i, lw: 5, color: C.yel, fill: 'rgba(255,213,74,0.18)' }); G.text(ctx, lab, x, 950, { size: 40, fam: 'Inter', weight: 800, color: C.yel, align: 'center', alpha: clamp(k), boil: 0 }); });
    const glk = P.fin(t, ev.c5_asset, 0.5); if (glk > 0) P.glow(ctx, 760, 600, 600, C.yel, glk * 0.45);
    const sh = P.eio((t - ev.c5_gold) / 0.9); P.art(ctx, A.cube(lerp(160, 34, sh)), 1, { x: 1560, y: lerp(700, 860, sh), color: C.yel, lw: lerp(5, 3, sh), a: P.fin(t, ev.c5_gold - 0.5, 0.3) });
    P.note(ctx, 'all the gold: small change', 1560, lerp(560, 820, sh), 1520, 420, t, ev.c5_gold + 0.6, { size: 44 });
    P.write(ctx, 'the biggest asset on the planet', 760, 200, t, ev.c5_asset - 0.3, { size: 60, color: C.ln, hl: ['biggest'], hlColor: C.yel });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S7 — what if we priced the planet itself? Rock and all.
  P.shot(ev.c5_s7, (ctx, t, s) => {
    P.bp(ctx, t);
    const k = P.oc((t - ev.c5_s7) / 1.0); P.globe(ctx, 820, 560, 340, t, { lon0: 140 + t * 12, k });
    P.ring(ctx, 820, 560, t, ev.c5_planet, { r: 460, color: C.yel });
    const tg = P.pop(t, ev.c5_rock, 0.4); if (tg > 0) P.at(ctx, 1240, 300, tg, Math.sin(t * 2) * 0.08, () => { P.line(ctx, -140, 80, 0, 0, C.ln, 3); P.rect(ctx, 0, -50, 300, 100, 12, C.yel); P.circ(ctx, 24, 0, 10, C.bp); G.text(ctx, '$ ?', 170, 18, { size: 56, fam: 'Bungee', color: C.ink2, align: 'center', boil: 0 }); });
    Ch.pip(ctx, { x: 1500, y: 920, s: 1.05, t, dir: -1, gesture: 'point', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'fade', dur: 0.35 } });
})();
