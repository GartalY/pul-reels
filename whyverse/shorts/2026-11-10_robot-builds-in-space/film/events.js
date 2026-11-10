// EVENTS — every named visual hit and its sound. Called by score.js (Node + browser).
// Whyverse trend Short 2026-11-10 "A robot just built something in space" (neon style).
(function () {
  const build = ({ L, Wt, ev, hit, CH, U, DURATION }) => {
    for (const c of ['s2', 's3', 's4', 's5', 's6', 's7', 's8', 's9']) { ev[c] = CH[c].t0; hit(CH[c].t0 - 0.05, 'whoosh', 0.45); }

    // ===== s1 hook: first time ever, robot builds in space, 0 astronauts =====
    ev.s1_on = hit(0.05, 'zap', 0.5);
    ev.s1_first = hit(Wt('l1', 'first'), 'ding', 0.6);
    ev.s1_struts = []; { const a = Wt('l1', 'robot'), b = Wt('l1', 'space', 0, true); for (let i = 0; i < 6; i++) ev.s1_struts.push(hit(a + (b - a) * i / 6, 'click', 0.5, -0.4 + i * 0.16)); }
    ev.s1_space = hit(Wt('l1', 'space'), 'shimmer', 0.5);
    ev.s1_wo = hit(Wt('l1', 'without'), 'blip', 0.5);
    ev.sync_zero = hit(Wt('l1', 'astronaut'), 'stamp', 1);

    // ===== s2 ASTRA, Caltech; launched 30 March; 1 m3 box =====
    ev.s2_name = hit(Wt('l2', 'astra'), 'stamp', 0.8);
    ev.s2_cal = hit(Wt('l2', 'caltech'), 'pop', 0.6, 0.2);
    ev.s2_launch = hit(Wt('l2', 'launched'), 'fire', 0.7);
    ev.s2_date = hit(Wt('l2', 'thirtieth'), 'ding', 0.6);
    ev.s2_box = hit(Wt('l2', 'box'), 'thud', 0.7);
    ev.s2_dim = hit(Wt('l2', 'cubic'), 'tick', 0.6);
    ev.s2_m3 = hit(Wt('l2', 'size'), 'blip', 0.5);

    // ===== s3 rockets are narrow; Webb's 6.5 m mirror folded =====
    ev.s3_q = hit(Wt('l3', 'why'), 'blip', 0.5);
    ev.s3_rocket = hit(Wt('l3', 'rockets'), 'fwip', 0.6);
    ev.s3_narrow = hit(Wt('l3', 'narrow'), 'brake', 0.5);
    ev.s3_webb = hit(Wt('l3', 'webb'), 'shimmer', 0.5);
    ev.s3_c0 = Wt('l3', 'six'); ev.s3_c1 = Wt('l3', 'metre', 0, true);
    ev.s3_ticks = []; for (let i = 0; i < 6; i++) ev.s3_ticks.push(hit(ev.s3_c0 + (ev.s3_c1 - ev.s3_c0) * i / 6, 'tick', 0.35, -0.3 + i * 0.12));
    ev.s3_fold = hit(Wt('l3', 'fold'), 'fwip', 0.6, -0.3);
    ev.s3_fold2 = hit(Wt('l3', 'origami'), 'fwip', 0.6, 0.3);
    ev.sync_fit = hit(Wt('l3', 'fit'), 'stamp', 0.9);

    // ===== s4 the arm builds one bay from struts + joints =====
    ev.s4_diff = hit(Wt('l4', 'differently'), 'ding', 0.5);
    ev.s4_arm = hit(Wt('l4', 'robotic'), 'servo', 0.6);
    ev.s4_struts = hit(Wt('l4', 'struts'), 'pop', 0.6, -0.3);
    ev.s4_joints = hit(Wt('l4', 'joints'), 'pop', 0.6, 0.3);
    ev.s4_disp = hit(Wt('l4', 'dispensers'), 'click', 0.6);
    ev.s4_b0 = Wt('l4', 'puts'); ev.s4_b1 = Wt('l4', 'bay', 0, true);
    ev.s4_edges = []; for (let i = 0; i < 8; i++) ev.s4_edges.push(hit(ev.s4_b0 + (ev.s4_b1 - ev.s4_b0) * i / 8, 'click', 0.45, -0.35 + i * 0.1));
    ev.sync_bay = hit(Wt('l4', 'bay'), 'stamp', 0.9);

    // ===== s5 net, push out, next one =====
    ev.s5_net = hit(Wt('l5', 'stretches'), 'swell', 0.5);
    ev.s5_shiny = hit(Wt('l5', 'shiny'), 'shimmer', 0.5);
    ev.s5_push = hit(Wt('l5', 'pushes'), 'whoosh', 0.7, 0.4);
    ev.s5_space = hit(Wt('l5', 'space'), 'thud', 0.6);
    ev.sync_next = hit(Wt('l5', 'next'), 'servo', 0.7);

    // ===== s6 target 1.4 m dish of 11 bays; finished 3 =====
    ev.s6_target = hit(Wt('l6', 'target'), 'blip', 0.5);
    ev.s6_dish = hit(Wt('l6', 'dish'), 'fwip', 0.5);
    ev.s6_dim = hit(Wt('l6', 'four'), 'tick', 0.6);
    ev.s6_c0 = Wt('l6', 'made'); ev.s6_c1 = Wt('l6', 'bays', 0, true);
    ev.s6_ring = []; for (let i = 0; i < 11; i++) ev.s6_ring.push(hit(ev.s6_c0 + (ev.s6_c1 - ev.s6_c0) * i / 11, 'tick', 0.35, -0.4 + i * 0.08));
    ev.s6_time = hit(Wt('l6', 'time'), 'alarm', 0.4);
    ev.s6_lit = [0, 1, 2].map((i) => hit(Wt('l6', 'finished') + i * 0.12, 'blip', 0.5, -0.2 + i * 0.2));
    ev.sync_three = hit(Wt('l6', 'three'), 'stamp', 1);

    // ===== s7 small? goal: hundreds of metres, kilometres =====
    ev.s7_small = hit(Wt('l7', 'small'), 'boing', 0.5);
    ev.s7_sure = hit(Wt('l7', 'sure'), 'tick', 0.5);
    ev.s7_goal = hit(Wt('l7', 'goal'), 'ding', 0.6);
    ev.s7_c0 = Wt('l7', 'structures'); ev.s7_c1 = Wt('l7', 'kilometres', 0, true);
    ev.s7_ticks = []; for (let i = 0; i < 8; i++) ev.s7_ticks.push(hit(ev.s7_c0 + (ev.s7_c1 - ev.s7_c0) * i / 8, 'tick', 0.35, -0.3 + i * 0.08));
    ev.s7_hund = hit(Wt('l7', 'hundreds'), 'swell', 0.5);
    ev.sync_km = hit(Wt('l7', 'kilometres'), 'stamp', 1);

    // ===== s8 payoff: built in orbit =====
    ev.s8_scope = hit(Wt('l8', 'giant'), 'shimmer', 0.5);
    ev.s8_rocket = hit(Wt('l8', 'rocket'), 'fwip', 0.5);
    ev.s8_x = hit(Wt('l8', 'piece'), 'scratch', 0.6);
    ev.s8_robots = hit(Wt('l8', 'robots'), 'servo', 0.6);
    ev.s8_build = [0, 1, 2, 3, 4, 5].map((i) => hit(Wt('l8', 'build') + i * 0.14, 'click', 0.45, -0.4 + i * 0.16));
    ev.sync_orbit = hit(Wt('l8', 'orbit'), 'stamp', 1);

    // ===== s9 end card =====
    ev.s9_follow = hit(Wt('l9', 'follow'), 'stamp', 0.7);
    ev.s9_yt = hit(Wt('l9', 'more'), 'chime', 0.6);
    ev.sync_logo = ev.s9_follow;
    ev.s8_follow = ev.s9_follow; // song.js end chord
  };
  if (typeof module !== 'undefined') module.exports = build; else globalThis.EVENTS = build;
})();
