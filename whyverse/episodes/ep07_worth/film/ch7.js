// Payoff + end card — three answers ($518 tn owned · $1,152 tn with people · +$125 tn of nature's work a year) ·
// no auction, no second Earth, no bidder → PRICELESS (nothing to compare it to) · back to the auction: the hammer never falls,
// everyone in the room is standing on the lot · Whyverse end card: like, subscribe, Instagram @whyverse___, TikTok @Whyverse.
(function () {
  const { U, G, Ch, P, Data, SCORE: S } = globalThis; const { clamp, lerp, ease } = U; const { ev, L, Wt } = S; const C = P.C; const A = P.A;
  const W = G.W, H = G.H;

  // S1 — "So, how much is the whole world worth?"
  P.shot(ev.c7_s1, (ctx, t, s) => {
    P.bp(ctx, t);
    P.globe(ctx, 760, 560, 320, t, { lon0: 260 + t * 12, k: P.oc((t - ev.c7_s1) / 0.8) });
    P.write(ctx, 'so… how much is the whole world worth?', 960, 150, t, ev.c7_q, { size: 60, color: C.ln, hl: ['worth?'], hlColor: C.yel });
    Ch.pip(ctx, { x: 1440, y: 920, s: 1.15, t, dir: -1, gesture: 'think', mouth: P.talk(t), look: -1 });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S2 — three answers on three cards
  P.shot(ev.c7_s2, (ctx, t, s) => {
    P.bp(ctx, t);
    const R = [[ev.c7_own, ev.c7_ownN, 'WHAT PEOPLE OWN', '$518 T+', (x, y) => P.art(ctx, A.house(120), 1, { x, y })], [ev.c7_people, ev.c7_peopleN, 'COUNTING PEOPLE', '$1,152 T', (x, y) => P.person(ctx, x, y + 6, 0.5, t, { color: C.yel, fill: 'rgba(255,213,74,0.2)', lw: 3 })], [ev.c7_nature, ev.c7_natureN, 'NATURE’S FREE WORK', '+$125 T / yr', (x, y) => P.art(ctx, A.tree(140), 1, { x, y, color: C.mint })]];
    R.forEach(([t0, tn, lab, num, icon], i) => { const k = P.pop(t, t0 - 0.1, 0.45); if (k <= 0) return; const x = 340 + i * 620, y = 560;
      P.at(ctx, x, y, k, (i - 1) * 0.015, () => { P.panel(ctx, -270, -300, 540, 600, 1); icon(0, -90); G.text(ctx, lab, 0, 30, { size: 34, fam: 'Inter', weight: 800, color: C.ln2, align: 'center', boil: 0 });
        const nk = P.fin(t, tn - 0.15, 0.3); if (nk > 0) P.digits(ctx, num, 0, 180, { size: 60, a: nk, land: Math.exp(-(t - tn) * 3) }); }); });
  }, { in: { type: 'push', dir: 'left', dur: 0.5 } });

  // S3 — no auction, no second Earth, no bidder → PRICELESS: nothing to compare it to
  P.shot(ev.c7_s3, (ctx, t, s) => {
    P.bp(ctx, t);
    const items = [[ev.c7_noauction, (x, y) => P.gavelAt(ctx, x + 40, y + 120, -0.4, 0.45, 1), 'NO AUCTION'], [ev.c7_nosecond, (x, y) => { ctx.save(); ctx.strokeStyle = C.ln2; ctx.lineWidth = 4; ctx.setLineDash([14, 12]); ctx.beginPath(); ctx.arc(x, y, 80, 0, 7); ctx.stroke(); ctx.restore(); }, 'NO SECOND EARTH'], [ev.c7_nobidder, (x, y) => P.person(ctx, x, y + 110, 0.75, t, { pose: 'raise', prop: 'paddle', num: '?' }), 'NO BIDDER']];
    const fade = 1 - P.fin(t, ev.c7_priceless - 0.2, 0.4) * 0.7;
    items.forEach(([t0, draw, lab], i) => { const k = P.pop(t, t0 - 0.15, 0.35); if (k <= 0) return; const x = 420 + i * 540, y = 400; ctx.save(); ctx.globalAlpha *= fade; P.at(ctx, x, y, k, 0, () => { draw(0, -40); }); G.text(ctx, lab, x, y + 170, { size: 40, fam: 'Inter', weight: 800, color: C.ln, align: 'center', alpha: clamp(k), boil: 0 }); P.cross(ctx, x - 130, y - 160, x + 130, y + 120, (t - t0) / 0.35, { lw: 9 }); ctx.restore(); });
    P.glow(ctx, 960, 760, 500, C.yel, P.fin(t, ev.c7_priceless, 0.5) * 0.5);
    P.stamp(ctx, 'PRICELESS', 960, 760, t, ev.c7_priceless, { size: 150, color: C.yel, fg: C.ink2, rot: -0.025 });
    P.note(ctx, 'nothing to compare it to', null, null, 960, 930, t, ev.c7_compare, { size: 52, color: C.ln });
  }, { in: { type: 'fade', dur: 0.4 } });

  // S4 — back at the auction: the hammer never falls; pull back → the whole room is drawn on the globe, standing on the lot
  P.shot(ev.c7_s4, (ctx, t, s) => {
    P.bp(ctx, t);
    const out = P.eio((t - ev.c7_room + 0.3) / 2.6);
    ctx.save(); P.cam(ctx, t, ev.c7_room - 0.3, ev.c7_room + 2.3, { x: 960, y: 560, z: 1 }, { x: 960, y: 900, z: 0.42 });
    // the globe under the room (grows into view as we pull back)
    P.globe(ctx, 960, 980 + 1250, 1250, t, { lon0: 20 + t * 4, lat0: 70, k: 1, a: clamp(out * 1.6) });
    P.art(ctx, A.podium(320), 1, { x: 1300, y: 980 }); P.person(ctx, 1300, 760, 1.05, t, { pose: 'arms' });
    const wob = Math.sin(t * 2.2) * 0.04; P.gavelAt(ctx, 1380, 560, -0.75 + wob, 0.55, 1);
    P.note(ctx, 'the hammer never falls', null, null, 1300, 260, t, ev.c7_never, { size: 54, a: 1 - out });
    for (let i = 0; i < 7; i++) P.person(ctx, 200 + i * 150, 1000, 0.8, t, { seed: i, fill: 'rgba(7,39,72,0.85)' });
    // people all around the planet's surface
    for (let i = 0; i < 28; i++) { const j = i >> 1, sg = i % 2 ? 1 : -1; const a = -Math.PI / 2 + sg * (0.36 + j * 0.075); const k = P.pop(t, ev.c7_standing + j * 0.05, 0.35); if (k <= 0) continue; const R0 = 1250, gx = 960 + Math.cos(a) * R0, gy = 980 + 1250 + Math.sin(a) * R0;
      ctx.save(); ctx.translate(gx, gy); ctx.rotate(a + Math.PI / 2); P.person(ctx, 0, 0, 0.9 * k, t, { seed: i, color: C.yel, fill: 'rgba(255,213,74,0.2)', lw: 4 }); ctx.restore(); }
    ctx.restore();
    P.write(ctx, 'everyone is already standing on the lot', 960, 160, t, ev.c7_standing - 0.2, { size: 60, color: C.ln, hl: ['standing', 'lot'], hlColor: C.yel });
    P.ytag(ctx, 'LOT 001 · PLANET EARTH', 960, 260, t, ev.c7_standing + 0.6, 1e9, { size: 36 });
  }, { in: { type: 'fade', dur: 0.5 } });

  // S5 — Whyverse end card: like, subscribe, Instagram + TikTok; Pip waves and flies off
  P.shot(ev.c7_s5, (ctx, t) => {
    P.bp(ctx, t);
    const kb = P.pop(t, ev.sync_logo, 0.5); P.planetBP(ctx, 590, 280, 70 * kb, t, 1); G.text(ctx, 'WHYVERSE', 1100, 318, { size: 120, fam: 'Bungee', color: C.yel, align: 'center', alpha: clamp(kb), boil: 0 });
    const like = P.pop(t, ev.c7_like, 0.45); P.at(ctx, 700, 560, like, 0, () => { const on = t > ev.c7_like + 0.3; P.rect(ctx, -200, -70, 400, 140, 70, on ? C.cor : C.ln, { shadow: 0.3 });
      P.fill(ctx, P.pPoly([[-130, 30], [-130, -10], [-100, -10], [-80, -50], [-64, -48], [-70, -10], [-30, -10], [-40, 30]]), on ? C.ln : C.ink2); G.text(ctx, 'LIKE', 40, 22, { size: 58, fam: 'Inter', weight: 800, color: on ? C.ln : C.ink2, align: 'center', boil: 0 }); });
    const sub = P.pop(t, ev.c7_sub, 0.45); P.at(ctx, 1240, 560, sub, 0, () => { const on = t > ev.c7_sub + 0.35; P.rect(ctx, -270, -70, 540, 140, 70, on ? C.ink2 : C.red, { shadow: 0.3, stroke: on ? C.ln : null, lw: 4 });
      G.text(ctx, on ? 'SUBSCRIBED ✓' : 'SUBSCRIBE', 0, 22, { size: 56, fam: 'Inter', weight: 800, color: C.ln, align: 'center', boil: 0 }); });
    P.ring(ctx, 1240, 560, t, ev.c7_sub + 0.35, { r: 320, color: C.yel });
    P.tag(ctx, 'Instagram  @whyverse___', 640, 790, t, ev.c7_ig, 1e9, { size: 46, fill: C.ln, color: C.ink2, dot: C.pink });
    P.tag(ctx, 'TikTok  @Whyverse', 1300, 790, t, ev.c7_tt, 1e9, { size: 46, fill: C.ln, color: C.ink2, dot: C.teal });
    P.label(ctx, 'shorter stories there', 960, 900, { size: 34, align: 'center', color: C.ln2, alpha: P.fin(t, ev.c7_tt + 0.4, 0.4) });
    const fly = P.eio((t - ev.c7_bye) / 1.6);
    Ch.pip(ctx, { x: 1730 + fly * 500, y: 1000 - fly * 800, s: 0.9, t, dir: -1, gesture: t > ev.c7_like ? 'cheer' : 'wave', mouth: P.talk(t), eyes: 'happy', rot: fly * 0.3 });
  }, { in: { type: 'iris', color: '#FFD54A', at: [960, 540], dur: 0.8 } });
})();
