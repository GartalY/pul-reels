// EVENTS — every named visual hit and its sound. Called by score.js (Node + browser).
(function () {
  const build = ({ L, Wt, ev, hit, CH, U, DURATION }) => {
    // shot cuts: a soft whoosh on each
    for (const c of ['s2', 's3', 's4', 's5', 's6', 's7', 's8']) { ev[c] = CH[c].t0; hit(CH[c].t0 - 0.05, 'whoosh', 0.5); }

    // ===== s1 hook: planned 2 years -> lasted 22 =====
    ev.s1_sat = hit(0.05, 'zap', 0.5, 0.2);
    ev.s1_plan = hit(Wt('l1', 'nasa'), 'blip', 0.6, -0.3);
    ev.s1_two = hit(Wt('l1', 'two'), 'ding', 0.8);
    ev.s1_bar0 = Wt('l1', 'last');
    ev.s1_planEnd = hit(Wt('l1', 'years') + 0.2, 'tick', 0.6);
    ev.s1_almost = Wt('l2', 'lasted');
    ev.sync_22 = hit(Wt('l2', 'twenty'), 'stamp', 1);
    ev.s1_ticks = []; for (let i = 0; i < 10; i++) ev.s1_ticks.push(hit(ev.s1_almost + 0.08 * i, 'tick', 0.35, -0.5 + i * 0.1));

    // ===== s2 the fall over Sumatra =====
    ev.s2_week = hit(Wt('l3', 'week'), 'blip', 0.5);
    ev.s2_fall = hit(Wt('l3', 'fell'), 'drop', 0.7, 0.3);
    ev.s2_burn = hit(Wt('l3', 'burning'), 'fire', 0.8);
    ev.s2_pin = hit(Wt('l3', 'sumatra'), 'pop', 0.7, -0.2);
    ev.s2_date = hit(Wt('l3', 'indonesia'), 'blip', 0.5, 0.2);

    // ===== s3 two decades of explosions, the 13-billion-year flash =====
    ev.s3_years0 = Wt('l4', 'two'); ev.s3_years1 = Wt('l4', 'decades', 0, true) + 0.3;
    ev.s3_bursts = ['biggest', 'explosions', 'universe'].map((w, i) => hit(Wt('l4', w), 'burst', 0.6, -0.5 + i * 0.5));
    ev.s3_flash = hit(Wt('l4', 'flash'), 'burst', 0.8, -0.6);
    ev.s3_travel = Wt('l4', 'travelled');
    ev.s3_13a = Wt('l4', 'thirteen'); ev.s3_13b = Wt('l4', 'years');
    ev.s3_arrive = hit(Wt('l4', 'reach'), 'shimmer', 0.6);

    // ===== s4 why? the Sun, the 11-year cycle, the puffed-up air =====
    ev.s4_why = hit(Wt('l5', 'so'), 'stamp', 0.8);
    ev.s4_sun = hit(Wt('l5', 'sun'), 'swell', 0.7);
    ev.s4_graph = hit(Wt('l6', 'about'), 'fwip', 0.5);
    ev.s4_eleven = hit(Wt('l6', 'eleven'), 'ding', 0.7);
    ev.s4_max = hit(Wt('l6', 'maximum'), 'blip', 0.7);
    ev.s4_earth = hit(Wt('l6', 'extra') - 0.15, 'whoosh', 0.5);
    ev.s4_heat = hit(Wt('l6', 'heats'), 'fire', 0.5);
    ev.s4_puff = hit(Wt('l6', 'puffs'), 'puff', 0.8);

    // ===== s5 drag spiral =====
    ev.s5_air = hit(Wt('l7', 'air'), 'pop', 0.5);
    ev.s5_drag = hit(Wt('l7', 'drag'), 'brake', 0.6);
    ev.s5_slow = hit(Wt('l7', 'slowed'), 'down', 0.6);
    ev.s5_sank = hit(Wt('l7', 'sank'), 'drop', 0.6);
    ev.s5_worse = hit(Wt('l7', 'worse'), 'alarm', 0.5);

    // ===== s6 the rescue robot =====
    ev.s6_robot = hit(Wt('l8', 'robot'), 'zap', 0.6, -0.5);
    ev.s6_push = hit(Wt('l8', 'push'), 'boing', 0.5);
    ev.s6_up = hit(Wt('l8', 'higher'), 'blip', 0.6);
    ev.s6_trouble = hit(Wt('l8', 'trouble'), 'spark', 0.8);
    ev.s6_sparks = [0, 1, 2].map((i) => hit(Wt('l8', 'trouble') + 0.22 + i * 0.2, 'spark', 0.4, -0.3 + i * 0.3));
    ev.sync_off = hit(Wt('l8', 'called'), 'stamp', 1);

    // ===== s7 the shooting star + scoreboard =====
    ev.s7_explode = [0, 1, 2].map((i) => hit(Wt('l9', 'explode') + i * 0.14, 'burst', 0.4, -0.5 + i * 0.5));
    ev.s7_star = hit(Wt('l9', 'shooting'), 'streak', 0.8, -0.4);
    ev.s7_score = hit(Wt('l9', 'not'), 'fwip', 0.5);
    ev.s7_check = hit(Wt('l9', 'plan'), 'coin', 0.8);

    // ===== s8 end card =====
    ev.s8_follow = hit(Wt('l10', 'follow'), 'stamp', 0.7);
    ev.s8_yt = hit(Wt('l10', 'full'), 'chime', 0.6);
    ev.sync_logo = ev.s8_follow;
  };
  if (typeof module !== 'undefined') module.exports = build; else globalThis.EVENTS = build;
})();
