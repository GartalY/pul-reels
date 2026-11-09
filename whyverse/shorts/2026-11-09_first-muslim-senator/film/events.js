// EVENTS — every named visual hit and its sound. Called by score.js (Node + browser).
// Whyverse trend Short 2026-11-09 "The first Muslim U.S. senator" (sticker-pop flat style).
(function () {
  const build = ({ L, Wt, ev, hit, CH, U, DURATION }) => {
    for (const c of ['s2', 's3', 's4', 's5', 's6', 's7', 's8', 's9']) { ev[c] = CH[c].t0; hit(CH[c].t0 - 0.05, 'whoosh', 0.45); }

    // ===== s1 hook: since 1789, never a Muslim senator — until now =====
    ev.s1_open = hit(0.05, 'pop', 0.6);
    ev.s1_y0 = Wt('l1', '1789'); ev.s1_y1 = Wt('l1', 'member', 0, true);
    ev.s1_ticks = []; for (let i = 0; i < 10; i++) ev.s1_ticks.push(hit(ev.s1_y0 + 0.3 + (ev.s1_y1 - ev.s1_y0 - 0.3) * i / 10, 'tick', 0.3, -0.45 + i * 0.1));
    ev.s1_senate = hit(Wt('l1', 'senate'), 'fwip', 0.5);
    ev.s1_never = hit(Wt('l1', 'never'), 'down', 0.5);
    ev.s1_zero = hit(Wt('l1', 'muslim'), 'ding', 0.6);
    ev.sync_changed = hit(Wt('l1', 'changed'), 'stamp', 1);

    // ===== s2 Nov 3, Michigan, Abdul El-Sayed, first in history =====
    ev.s2_cal = hit(Wt('l2', 'november'), 'fwip', 0.6);
    ev.s2_map = hit(Wt('l2', 'michigan'), 'pop', 0.7, -0.2);
    ev.s2_vote = hit(Wt('l2', 'elected'), 'blip', 0.6);
    ev.s2_name = hit(Wt('l2', 'abdul'), 'chime', 0.6);
    ev.sync_first = hit(Wt('l2', 'first'), 'stamp', 1);
    ev.s2_hist = hit(Wt('l2', 'history'), 'shimmer', 0.5);

    // ===== s3 three facts =====
    ev.s3_a = hit(Wt('l3', 'son'), 'pop', 0.7, -0.3);
    ev.s3_b = hit(Wt('l3', 'public'), 'pop', 0.7, 0.3);
    ev.s3_c = hit(Wt('l3', 'never'), 'pop', 0.7, 0);
    ev.sync_zero = hit(Wt('l3', 'office'), 'ding', 0.7);

    // ===== s4 2018: lost the primary =====
    ev.s4_year = hit(Wt('l4', 'eight'), 'fwip', 0.6);
    ev.s4_ran = hit(Wt('l4', 'ran'), 'blip', 0.5);
    ev.s4_gov = hit(Wt('l4', 'governor'), 'pop', 0.6);
    ev.sync_lost = hit(Wt('l4', 'lost'), 'stamp', 0.9);
    ev.s4_dd = hit(Wt('l4', 'double'), 'down', 0.5);

    // ===== s5 this time: open seat, won =====
    ev.s5_time = hit(Wt('l5', 'time'), 'whoosh', 0.5);
    ev.sync_won = hit(Wt('l5', 'won'), 'stamp', 1);
    ev.s5_seat = hit(Wt('l5', 'open'), 'pop', 0.6);
    ev.s5_rogers = hit(Wt('l5', 'mike'), 'blip', 0.5, 0.3);
    ev.s5_former = hit(Wt('l5', 'former'), 'tick', 0.5, 0.3);

    // ===== s6 2007: Keith Ellison, first Muslim in Congress =====
    ev.s6_ruler = hit(Wt('l6', 'road'), 'fwip', 0.5);
    ev.s6_2007 = hit(Wt('l6', '2007'), 'pop', 0.7, -0.3);
    ev.s6_name = hit(Wt('l6', 'keith'), 'chime', 0.6);
    ev.sync_congress = hit(Wt('l6', 'congress'), 'stamp', 0.9);

    // ===== s7 Jefferson's Quran =====
    ev.s7_book = hit(Wt('l7', 'oath'), 'thud', 0.7);
    ev.s7_quran = hit(Wt('l7', 'quran'), 'chime', 0.6);
    ev.sync_jeff = hit(Wt('l7', 'thomas'), 'stamp', 0.9);
    ev.s7_eng = hit(Wt('l7', 'english'), 'fwip', 0.5);
    ev.s7_london = hit(Wt('l7', 'london'), 'pop', 0.6);
    ev.s7_1764 = hit(Wt('l7', '1764'), 'ding', 0.7);

    // ===== s8 payoff: January 3, 238 years =====
    ev.s8_cal = hit(Wt('l8', 'january'), 'fwip', 0.6);
    ev.s8_seat = hit(Wt('l8', 'first'), 'shimmer', 0.6);
    ev.s8_c0 = Wt('l8', 'two'); ev.s8_c1 = Wt('l8', 'years', 0, true);
    ev.s8_ticks = []; for (let i = 0; i < 8; i++) ev.s8_ticks.push(hit(ev.s8_c0 + (ev.s8_c1 - ev.s8_c0) * i / 8, 'tick', 0.35, -0.4 + i * 0.1));
    ev.sync_238 = hit(Wt('l8', 'met'), 'stamp', 1);

    // ===== s9 end card =====
    ev.s9_follow = hit(Wt('l9', 'follow'), 'stamp', 0.7);
    ev.s9_yt = hit(Wt('l9', 'more') + 0.3, 'chime', 0.6);
    ev.sync_logo = ev.s9_follow;
    ev.s8_follow = ev.s9_follow; // song.js end chord
  };
  if (typeof module !== 'undefined') module.exports = build; else globalThis.EVENTS = build;
})();
