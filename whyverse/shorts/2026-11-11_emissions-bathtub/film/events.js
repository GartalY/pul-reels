// EVENTS — every named visual hit and its sound. Called by score.js (Node + browser).
// Whyverse trend Short 2026-11-11 "Emissions are falling. So why the worry?" (paper cut-out style).
(function () {
  const build = ({ L, Wt, ev, hit, CH, U, DURATION }) => {
    for (const c of ['s2', 's3', 's4', 's5', 's6', 's7', 's8', 's9']) { ev[c] = CH[c].t0; hit(CH[c].t0 - 0.05, 'fwip', 0.5); }

    // s1 hook
    ev.s1_on = hit(0.05, 'pop', 0.5);
    ev.s1_fossil = hit(Wt('l1', 'fossil'), 'puff', 0.5);
    ev.s1_fall = hit(Wt('l1', 'fall'), 'down', 0.6);
    ev.s1_why = hit(Wt('l1', 'why'), 'blip', 0.5);
    ev.sync_why = hit(Wt('l1', 'celebrating'), 'stamp', 1);

    // s2 report, 140+ scientists, 38.2 Gt, -0.4 %
    ev.s2_report = hit(Wt('l2', 'report'), 'fwip', 0.6);
    ev.s2_ppl = []; { const a = Wt('l2', 'hundred'), b = Wt('l2', 'scientists', 0, true); for (let i = 0; i < 7; i++) ev.s2_ppl.push(hit(a + (b - a) * i / 7, 'pop', 0.4, -0.4 + i * 0.13)); }
    ev.s2_c0 = Wt('l2', 'thirty'); ev.s2_c1 = Wt('l2', 'tonnes', 0, true);
    ev.s2_ticks = []; for (let i = 0; i < 6; i++) ev.s2_ticks.push(hit(ev.s2_c0 + (ev.s2_c1 - ev.s2_c0) * i / 6, 'tick', 0.35));
    ev.s2_down = hit(Wt('l2', 'down'), 'down', 0.6);
    ev.sync_pct = hit(Wt('l2', 'percent'), 'stamp', 1);

    // s3 solar/wind/EV vs oil shock that can bounce back
    ev.s3_solar = hit(Wt('l3', 'solar'), 'pop', 0.6, -0.3);
    ev.s3_wind = hit(Wt('l3', 'wind'), 'pop', 0.6, 0);
    ev.s3_ev = hit(Wt('l3', 'electric'), 'pop', 0.6, 0.3);
    ev.s3_oil = hit(Wt('l3', 'oil'), 'thud', 0.7);
    ev.s3_shock = hit(Wt('l3', 'shock'), 'zap', 0.5);
    ev.sync_bounce = hit(Wt('l3', 'bounce'), 'boing', 0.8);

    // s4 fires + forests, total 43.3 Gt
    ev.s4_fires = hit(Wt('l4', 'fires'), 'fire', 0.6);
    ev.s4_forest = hit(Wt('l4', 'forests'), 'thud', 0.6);
    ev.s4_total = hit(Wt('l4', 'total'), 'blip', 0.5);
    ev.s4_rise = hit(Wt('l4', 'rise'), 'swell', 0.5);
    ev.s4_c0 = Wt('l4', 'forty'); ev.s4_c1 = Wt('l4', 'tonnes', 0, true);
    ev.s4_ticks = []; for (let i = 0; i < 6; i++) ev.s4_ticks.push(hit(ev.s4_c0 + (ev.s4_c1 - ev.s4_c0) * i / 6, 'tick', 0.35));
    ev.sync_total = hit(Wt('l4', 'tonnes'), 'stamp', 1);

    // s5 bathtub
    ev.s5_tub = hit(Wt('l5', 'bathtub'), 'splash', 0.6);
    ev.s5_tap = hit(Wt('l5', 'down'), 'brake', 0.4);
    ev.s5_empty = hit(Wt('l5', 'empty'), 'blip', 0.4);
    ev.sync_fill = hit(Wt('l5', 'filling'), 'bubble', 0.8);

    // s6 427 ppm, +54 %
    ev.s6_air = hit(Wt('l6', 'air'), 'bubble', 0.5);
    ev.s6_c0 = Wt('l6', 'four'); ev.s6_c1 = Wt('l6', 'million', 0, true);
    ev.s6_ticks = []; for (let i = 0; i < 8; i++) ev.s6_ticks.push(hit(ev.s6_c0 + (ev.s6_c1 - ev.s6_c0) * i / 8, 'tick', 0.35));
    ev.s6_ppm = hit(Wt('l6', 'million'), 'ding', 0.6);
    ev.s6_pre = hit(Wt('l6', 'pre'), 'pop', 0.5);
    ev.sync_54 = hit(Wt('l6', 'fifty'), 'stamp', 1);

    // s7 budget 150 Gt, < 4 years
    ev.s7_budget = hit(Wt('l7', 'budget'), 'coin', 0.5);
    ev.s7_deg = hit(Wt('l7', 'degrees'), 'blip', 0.5);
    ev.s7_150 = hit(Wt('l7', 'fifty'), 'thud', 0.6);
    ev.s7_cal = [0, 1, 2, 3].map((i) => hit(Wt('l7', 'four') + i * 0.22, 'fwip', 0.45, -0.3 + i * 0.2));
    ev.sync_years = hit(Wt('l7', 'rate'), 'stamp', 1);

    // s8 payoff: 59 countries, tap turns
    ev.s8_good = hit(Wt('l8', 'good'), 'chime', 0.6);
    ev.s8_c0 = Wt('l8', 'fifty'); ev.s8_c1 = Wt('l8', 'countries', 0, true);
    ev.s8_pins = []; for (let i = 0; i < 8; i++) ev.s8_pins.push(hit(ev.s8_c0 + (ev.s8_c1 - ev.s8_c0) * i / 8, 'pop', 0.35, -0.4 + i * 0.1));
    ev.s8_cut = hit(Wt('l8', 'cut'), 'down', 0.5);
    ev.s8_grew = hit(Wt('l8', 'grew'), 'swell', 0.5);
    ev.s8_turn = hit(Wt('l8', 'turn'), 'servo', 0.6);
    ev.sync_faster = hit(Wt('l8', 'faster'), 'stamp', 1);

    // s9 end card
    ev.s9_follow = hit(Wt('l9', 'follow'), 'stamp', 0.7);
    ev.s9_yt = hit(Wt('l9', 'more'), 'chime', 0.6);
    ev.sync_logo = ev.s9_follow;
    ev.s8_follow = ev.s9_follow;
  };
  if (typeof module !== 'undefined') module.exports = build; else globalThis.EVENTS = build;
})();
