// EVENTS — every named visual hit and its sound. Called by score.js (Node + browser).
// Whyverse short 2026-11-09 "How rain makes a glacier run" (blueprint style).
(function () {
  const build = ({ L, Wt, ev, hit, CH, U, DURATION }) => {
    for (const c of ['s2', 's3', 's4', 's5', 's6', 's7', 's8', 's9']) { ev[c] = CH[c].t0; hit(CH[c].t0 - 0.05, 'whoosh', 0.45); }

    // ===== s1 hook: 7.5 m in one day, more than double =====
    ev.s1_draw = hit(0.05, 'scribble', 0.5);
    ev.s1_rain = hit(Wt('l1', 'rain'), 'spray', 0.5);
    ev.s1_slide = hit(Wt('l1', 'slide'), 'whoosh', 0.6, 0.3);
    ev.s1_c0 = Wt('l1', 'seven'); ev.s1_c1 = Wt('l1', 'metres', 0, true);
    ev.s1_ticks = []; for (let i = 0; i < 8; i++) ev.s1_ticks.push(hit(ev.s1_c0 + (ev.s1_c1 - ev.s1_c0) * i / 8, 'tick', 0.35, -0.4 + i * 0.1));
    ev.sync_day = hit(Wt('l1', 'single'), 'stamp', 1);
    ev.s1_double = hit(Wt('l2', 'double'), 'ding', 0.8);
    ev.s1_pct = hit(Wt('l2', 'speed'), 'stamp', 0.8);

    // ===== s2 this week, Turner Glacier, Alaska =====
    ev.s2_week = hit(Wt('l3', 'week'), 'blip', 0.5);
    ev.s2_sci = hit(Wt('l3', 'scientists'), 'fwip', 0.5);
    ev.s2_pin = hit(Wt('l3', 'turner'), 'pop', 0.7, -0.2);
    ev.s2_alaska = hit(Wt('l3', 'alaska'), 'blip', 0.5, 0.2);
    ev.s2_how = hit(Wt('l3', 'how'), 'ding', 0.6);

    // ===== s3 GPS every 15 s; 9 of 16 storms =====
    ev.s3_gps = [0, 1, 2].map((i) => hit(Wt('l4', 'pinned') + i * 0.18, 'tick', 0.6, -0.4 + i * 0.4));
    ev.s3_log = hit(Wt('l4', 'logged'), 'blip', 0.5);
    ev.s3_clk0 = Wt('l4', 'position'); ev.s3_clk1 = Wt('l4', 'seconds', 0, true);
    ev.s3_15 = hit(Wt('l4', 'fifteen'), 'ding', 0.6);
    ev.s3_grid = hit(Wt('l4', 'nine'), 'fwip', 0.5);
    ev.s3_lit = []; { const a = Wt('l4', 'big'), b = Wt('l4', 'racing'); for (let i = 0; i < 9; i++) ev.s3_lit.push(hit(a + (b - a) * i / 9, 'blip', 0.4, -0.4 + i * 0.1)); }
    ev.sync_9 = hit(Wt('l4', 'racing'), 'stamp', 0.9);

    // ===== s4 how? not from above — underneath =====
    ev.s4_how = hit(Wt('l5', 'how'), 'stamp', 0.8);
    ev.s4_ice = hit(Wt('l5', 'ice'), 'scribble', 0.4);
    ev.s4_push = hit(Wt('l5', 'push'), 'whoosh', 0.5);
    ev.s4_x = hit(Wt('l5', 'above'), 'scratch', 0.7);
    ev.s4_sneak = hit(Wt('l5', 'sneaks'), 'fwip', 0.6);
    ev.sync_under = hit(Wt('l5', 'underneath'), 'ding', 0.8);

    // ===== s5 rainwater down cracks and holes to the rock =====
    ev.s5_rain = hit(Wt('l6', 'rainwater'), 'spray', 0.6);
    ev.s5_pour = hit(Wt('l6', 'pours'), 'splash', 0.6);
    ev.s5_cracks = hit(Wt('l6', 'cracks'), 'pop', 0.6, -0.3);
    ev.s5_holes = hit(Wt('l6', 'holes'), 'pop', 0.6, 0.3);
    ev.s5_down = hit(Wt('l6', 'all'), 'down', 0.5);
    ev.s5_rock = hit(Wt('l6', 'rock'), 'thud', 0.8);

    // ===== s6 drains too small -> pressure -> grip lost =====
    ev.s6_drain = hit(Wt('l7', 'drains'), 'pop', 0.6);
    ev.s6_carry = hit(Wt('l7', 'carry'), 'bubble', 0.5);
    ev.s6_clog = hit(Wt('l7', 'enough'), 'alarm', 0.4);
    ev.s6_gauge = hit(Wt('l7', 'water'), 'tick', 0.6);
    ev.s6_press = hit(Wt('l7', 'pressure'), 'swell', 0.6);
    ev.s6_builds = hit(Wt('l7', 'builds'), 'ding', 0.6);
    ev.s6_lift = hit(Wt('l7', 'ice', 1), 'whoosh', 0.4);
    ev.sync_grip = hit(Wt('l7', 'grip'), 'stamp', 1);

    // ===== s7 slide; +12 h; back within 2 weeks =====
    ev.s7_less = hit(Wt('l8', 'less'), 'down', 0.5);
    ev.s7_slide = hit(Wt('l8', 'slide'), 'whoosh', 0.7, 0.4);
    ev.s7_graph = hit(Wt('l8', 'about'), 'fwip', 0.5);
    ev.s7_rain = hit(Wt('l8', 'rain'), 'spray', 0.5);
    ev.s7_12a = Wt('l8', 'twelve'); ev.s7_12 = hit(Wt('l8', 'hours'), 'ding', 0.6);
    ev.sync_spike = hit(Wt('l8', 'sped'), 'boing', 0.7);
    ev.s7_weeks = hit(Wt('l8', 'two'), 'blip', 0.5);
    ev.s7_calm = hit(Wt('l8', 'calmed'), 'down', 0.5);

    // ===== s8 payoff: not only heat — a storm is the grease underneath =====
    ev.s8_heat = hit(Wt('l9', 'heat'), 'pop', 0.6, -0.3);
    ev.s8_x = hit(Wt('l9', 'glacier'), 'tick', 0.5);
    ev.s8_storm = hit(Wt('l9', 'storm'), 'thud', 0.7, 0.3);
    ev.sync_grease = hit(Wt('l9', 'grease'), 'stamp', 1);
    ev.s8_slide = hit(Wt('l9', 'underneath'), 'whoosh', 0.5);

    // ===== s9 end card =====
    ev.s9_follow = hit(Wt('l10', 'follow'), 'stamp', 0.7);
    ev.s9_yt = hit(Wt('l10', 'full'), 'chime', 0.6);
    ev.sync_logo = ev.s9_follow;
    // aliases used by song.js (the shared end-chord code reads s8_follow)
    ev.s8_follow = ev.s9_follow;
  };
  if (typeof module !== 'undefined') module.exports = build; else globalThis.EVENTS = build;
})();
