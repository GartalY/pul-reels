// EVENTS — every named visual hit and its sound, per chapter. Called by score.js (Node + browser).
// hit(t, kind, gain, pan) registers a sound effect at t and returns t, so the picture uses the same number.
(function () {
  const build = ({ L, Wt, next, ev, hit, CH, U, DURATION }) => {
    const S = (id, d = 0.25) => L(id).t - d; // a shot that starts just before a line
    // ===== c0 cold open =====
    ev.c0_s1 = 0;
    ev.c0_novaIn = hit(Wt('c0_1', 'look') - 0.05, 'boing', 0.5);
    ev.c0_tilt = Wt('c0_1', 'up');
    ev.c0_black = hit(Wt('c0_1', 'black'), 'blip', 0.6);
    ev.c0_s2 = S('c0_2');
    ev.c0_sunset = hit(Wt('c0_2', 'set'), 'drop', 0.5);
    ev.c0_dark = hit(Wt('c0_2', 'dark'), 'switch', 0.7);
    ev.c0_400a = Wt('c0_3', 'four'); ev.c0_400 = hit(Wt('c0_3', 'years', 0, true), 'ding', 0.6);
    ev.c0_puzzle = hit(Wt('c0_3', 'puzzles'), 'stamp', 0.7);
    ev.c0_s3 = S('c0_4');
    ev.c0_tags = ['endless', 'eternal', 'full'].map((w, i) => hit(Wt('c0_4', w), 'blip', 0.55, -0.4 + i * 0.4));
    ev.c0_fill0 = Wt('c0_4', 'night');
    ev.c0_blaze = hit(Wt('c0_4', 'blaze'), 'swell', 0.9);
    ev.sync_blaze = ev.c0_blaze;
    ev.c0_shades = hit(Wt('c0_4', 'direction'), 'click', 0.6);
    ev.c0_surface = hit(Wt('c0_4', 'surface'), 'ding', 0.6);
    ev.c0_s4 = S('c0_5', 0.4);
    ev.c0_clue = hit(Wt('c0_5', 'clues'), 'shimmer', 0.6);
    ev.c0_came = hit(Wt('c0_5', 'came'), 'pop', 0.5);
    ev.c0_s5 = S('c0_6', 0.5);
    ev.c0_q = hit(Wt('c0_6', 'why'), 'swell', 0.4);
    // title sequence (no voice): seven words light up like neon signs, then the brand
    ev.title0 = L('c0_6').end + 0.35;
    ev.titleWords = ['WHY', 'IS', 'THE', 'SKY', 'DARK', 'AT', 'NIGHT?'].map((w, i) => ({ w, t: hit(ev.title0 + 0.3 + i * 0.27, 'neon', i === 4 ? 1.0 : 0.6, -0.45 + i * 0.15) }));
    ev.sync_title = ev.titleWords[4].t;
    ev.titleBrand = hit(ev.titleWords[6].t + 0.9, 'chime', 0.6);

    // chapter cards: buzz-on + stamp, hook line, card out
    for (const c of ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']) {
      ev[c + '_card'] = CH[c].t0; hit(CH[c].t0 + 0.05, 'whoosh', 0.55); ev[c + '_stamp'] = hit(CH[c].t0 + 0.35, 'neon', 0.8);
      const h = L(c + '_1h'); ev[c + '_hook'] = h; hit(h.t - 0.05, 'fwip', 0.45);
      ev[c + '_cardOut'] = h.end + 0.5; hit(ev[c + '_cardOut'] - 0.35, 'whoosh', 0.4);
    }

    // ===== c1 a forest of stars =====
    ev.c1_s1 = ev.c1_cardOut - 0.1;                                   // forest from above, you in the middle
    ev.c1_you = hit(Wt('c1_2', 'standing'), 'pop', 0.6);
    ev.c1_forest = hit(Wt('c1_2', 'forest'), 'shimmer', 0.4);
    ev.c1_rays = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => hit(Wt('c1_3', 'direction') + i * 0.16, 'tick', 0.4, -0.7 + i * 0.2));
    ev.c1_trunk = hit(Wt('c1_3', 'trunk'), 'thud', 0.5);
    ev.c1_s2 = Wt('c1_3', 'near') - 0.3;                              // eye-level panorama
    ev.c1_near = hit(Wt('c1_3', 'wide'), 'blip', 0.5, -0.3);
    ev.c1_far = hit(Wt('c1_3', 'thin'), 'blip', 0.5, 0.3);
    ev.c1_grow0 = Wt('c1_3', 'forest'); ev.c1_grow1 = Wt('c1_3', 'gaps');
    ev.c1_wood = hit(Wt('c1_3', 'wood'), 'stamp', 0.7);
    ev.c1_s3 = S('c1_4');                                             // swap trees for stars
    ev.c1_swap = hit(Wt('c1_4', 'swap'), 'shimmer', 0.7);
    ev.c1_sight = hit(Wt('c1_4', 'line'), 'zap', 0.5);
    ev.c1_surf = hit(Wt('c1_4', 'surface'), 'ding', 0.5);
    ev.c1_s4 = S('c1_5');                                             // the wall of starlight
    ev.c1_nogaps = hit(Wt('c1_5', 'gaps'), 'stamp', 0.6);
    ev.c1_wall = hit(Wt('c1_5', 'wall'), 'swell', 0.7);
    ev.c1_day = hit(Wt('c1_5', 'day'), 'blip', 0.5, -0.3); ev.c1_night = hit(Wt('c1_5', 'night'), 'blip', 0.5, 0.3);
    ev.c1_sun = hit(Wt('c1_5', 'sun'), 'ding', 0.6);
    ev.c1_s5 = S('c1_6');                                             // timeline of people
    ev.c1_kepler = hit(Wt('c1_6', 'kepler'), 'pop', 0.6, -0.5);
    ev.c1_1610 = hit(Wt('c1_6', 'sixteen'), 'tick', 0.5);
    ev.c1_halley = hit(Wt('c1_6', 'halley'), 'pop', 0.6, -0.1);
    ev.c1_1720 = hit(Wt('c1_6', 'seventeen'), 'tick', 0.5);
    ev.c1_olbers = hit(Wt('c1_7', 'heinrich'), 'pop', 0.7, 0.4);
    ev.c1_1823 = hit(Wt('c1_7', 'eighteen'), 'tick', 0.5);
    ev.c1_paradox = hit(Wt('c1_7', 'paradox'), 'stamp', 0.9);
    ev.sync_paradox = ev.c1_paradox;

    // ===== c2 far away doesn't help =====
    ev.c2_s1 = ev.c2_cardOut - 0.1;                                   // onion shells
    ev.c2_shells = [0, 1, 2, 3, 4].map((i) => hit(Wt('c2_2', 'shells') + i * 0.18, 'blip', 0.45, -0.4 + i * 0.2));
    ev.c2_onion = hit(Wt('c2_2', 'onion'), 'pop', 0.5);
    ev.c2_same = hit(Wt('c2_2', 'thickness'), 'tick', 0.5);
    ev.c2_s2 = S('c2_3');                                             // 2x distance, 1/4 brightness
    ev.c2_twice = hit(Wt('c2_3', 'twice'), 'whoosh', 0.4);
    ev.c2_fainter = hit(Wt('c2_3', 'fainter'), 'drop', 0.6);
    ev.c2_bigger = hit(Wt('c2_4', 'bigger'), 'swell', 0.4);
    ev.c2_many = hit(Wt('c2_4', 'many'), 'pop', 0.6);
    ev.c2_s3 = S('c2_5');                                             // they cancel
    ev.c2_f = hit(Wt('c2_5', 'fainter'), 'blip', 0.5, -0.3);
    ev.c2_m = hit(Wt('c2_5', 'many'), 'blip', 0.5, 0.3);
    ev.c2_cancel = hit(Wt('c2_5', 'exactly'), 'ding', 0.7);
    ev.c2_same2 = hit(Wt('c2_5', 'same'), 'chime', 0.5);
    ev.c2_s4 = S('c2_6');                                             // stacking shells → light piles up
    ev.c2_stack = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => hit(Wt('c2_6', 'shell') + i * 0.22, 'tick', 0.35, -0.6 + i * 0.13));
    ev.c2_fill = hit(Wt('c2_6', 'fill'), 'shimmer', 0.6);
    ev.c2_s5 = S('c2_7');                                             // the oven
    ev.c2_sum = hit(Wt('c2_7', 'sum'), 'pop', 0.5);
    ev.c2_shock = hit(Wt('c2_7', 'shocking'), 'swell', 0.7);
    ev.c2_deg = hit(Wt('c2_7', 'thousands'), 'ding', 0.6);
    ev.c2_oven = hit(Wt('c2_7', 'oven'), 'stamp', 0.8);
    ev.sync_oven = ev.c2_oven;

    // ===== c3 wrong answers =====
    ev.c3_s1 = ev.c3_cardOut - 0.1;                                   // dust clouds block rays
    ev.c3_olbers = hit(Wt('c3_2', 'olbers'), 'pop', 0.5);
    ev.c3_dust = hit(Wt('c3_2', 'dust'), 'whoosh', 0.5);
    ev.c3_soak = hit(Wt('c3_2', 'soak'), 'drop', 0.5);
    ev.c3_s2 = S('c3_3');                                             // dust heats and glows
    ev.c3_warm = hit(Wt('c3_3', 'warms'), 'swell', 0.5);
    ev.c3_time = Wt('c3_3', 'time');
    ev.c3_hot = hit(Wt('c3_3', 'hot'), 'ding', 0.5);
    ev.c3_glow = hit(Wt('c3_3', 'glow'), 'shimmer', 0.6);
    ev.c3_part = hit(Wt('c3_4', 'part'), 'stamp', 0.7);
    ev.c3_s3 = S('c3_5');                                             // galaxies with gaps → zoom out
    ev.c3_clump = hit(Wt('c3_5', 'clumping'), 'whoosh', 0.5);
    ev.c3_gal = hit(Wt('c3_5', 'galaxies'), 'shimmer', 0.5);
    ev.c3_rearr = hit(Wt('c3_5', 'rearranges'), 'swell', 0.5);
    ev.c3_close = hit(Wt('c3_5', 'close'), 'thud', 0.6);
    ev.c3_s4 = S('c3_6');                                             // the picture cracks
    ev.c3_crack = hit(Wt('c3_6', 'wrong'), 'crack', 0.8);
    ev.sync_crack = ev.c3_crack;

    // ===== c4 a poet's answer =====
    ev.c4_s1 = ev.c4_cardOut - 0.1;                                   // Poe, The Raven, Eureka
    ev.c4_1848 = hit(Wt('c4_2', 'eighteen'), 'tick', 0.5);
    ev.c4_poe = hit(Wt('c4_2', 'edgar'), 'pop', 0.6);
    ev.c4_raven = hit(Wt('c4_2', 'raven'), 'flap', 0.6);
    ev.c4_eureka = hit(Wt('c4_2', 'eureka'), 'stamp', 0.7);
    ev.c4_quote = Wt('c4_3', 'suggested');
    ev.c4_s2 = S('c4_4');                                             // a beam of light crossing space
    ev.c4_fast = hit(Wt('c4_4', 'fast'), 'zap', 0.6);
    ev.c4_forever = hit(Wt('c4_4', 'forever'), 'thud', 0.5);
    ev.c4_s3 = S('c4_4b');                                            // look-back times
    ev.c4_moon = hit(Wt('c4_4b', 'moon'), 'pop', 0.55, -0.4);
    ev.c4_sun = hit(Wt('c4_4b', 'sun'), 'pop', 0.55, 0);
    ev.c4_andro = hit(Wt('c4_4b', 'andromeda'), 'pop', 0.6, 0.4);
    ev.c4_25 = hit(Wt('c4_4b', 'million'), 'ding', 0.5);
    ev.c4_s4 = S('c4_5');                                             // 13.8 billion + the bubble
    ev.c4_138a = Wt('c4_5', 'thirteen'); ev.c4_138 = hit(Wt('c4_5', 'old'), 'ding', 0.7);
    ev.c4_bubble = hit(Wt('c4_5', 'light'), 'swell', 0.5);
    ev.c4_way = hit(Wt('c4_5', 'way'), 'whoosh', 0.4);
    ev.c4_s5 = S('c4_6');                                             // sky coverage meter: gaps
    ev.c4_enorm = hit(Wt('c4_6', 'enormous'), 'shimmer', 0.5);
    ev.c4_cover = hit(Wt('c4_6', 'cover'), 'blip', 0.5);
    ev.c4_gaps = hit(Wt('c4_6', 'gaps'), 'stamp', 0.6);
    ev.c4_s6 = S('c4_6b');                                            // Webb deep field
    ev.c4_webb = hit(Wt('c4_6b', 'webb'), 'pop', 0.6);
    ev.c4_spot = hit(Wt('c4_6b', 'galaxies'), 'blip', 0.6);
    ev.c4_300 = hit(Wt('c4_6b', 'three'), 'ding', 0.6);
    ev.c4_s7 = S('c4_7');                                             // Kelvin + the numbers
    ev.c4_kelvin = hit(Wt('c4_7', 'kelvin'), 'pop', 0.6);
    ev.c4_works = hit(Wt('c4_7', 'works'), 'chime', 0.5);
    ev.c4_1023 = hit(Wt('c4_7', 'twenty'), 'ding', 0.7);
    ev.c4_young = hit(Wt('c4_7', 'young'), 'stamp', 0.7);
    ev.c4_burn = hit(Wt('c4_7', 'burn'), 'drop', 0.6);

    // ===== c5 the glowing wall =====
    ev.c5_s1 = ev.c5_cardOut - 0.1;                                   // expanding grid stretches a wave
    ev.c5_expand = hit(Wt('c5_2', 'expanding'), 'swell', 0.5);
    ev.c5_stretch = hit(Wt('c5_2', 'stretched'), 'stretch', 0.6);
    ev.c5_redder = hit(Wt('c5_2', 'redder'), 'blip', 0.5);
    ev.c5_dimmer = hit(Wt('c5_2', 'dimmer'), 'drop', 0.5);
    ev.c5_s2 = S('c5_2b');                                            // Webb + infrared spectrum
    ev.c5_webb = hit(Wt('c5_2b', 'james'), 'pop', 0.6);
    ev.c5_ir = hit(Wt('c5_2b', 'infrared'), 'shimmer', 0.5);
    ev.c5_out = hit(Wt('c5_2b', 'colours'), 'whoosh', 0.5);
    ev.c5_s3 = S('c5_3');                                             // rewind to the hot early universe
    ev.c5_rew = hit(Wt('c5_3', 'backwards'), 'rewind', 0.7);
    ev.c5_gas = hit(Wt('c5_3', 'hot'), 'swell', 0.6);
    ev.c5_3000 = hit(Wt('c5_3', 'degrees'), 'ding', 0.6);
    ev.c5_bright = hit(Wt('c5_4', 'bright'), 'shimmer', 0.6);
    ev.c5_real = hit(Wt('c5_4', 'real'), 'stamp', 0.7);
    ev.c5_s4 = S('c5_5');                                             // last scattering: light flies free
    ev.c5_380a = Wt('c5_5', 'three'); ev.c5_380 = hit(Wt('c5_5', 'years'), 'ding', 0.6);
    ev.c5_free = hit(Wt('c5_5', 'free'), 'release', 0.7);
    ev.c5_every = hit(Wt('c5_5', 'every'), 'shimmer', 0.5);
    ev.c5_s5 = S('c5_6');                                             // stretched x1000, 3000 K → 2.7 K
    ev.c5_1000 = hit(Wt('c5_6', 'thousand'), 'stretch', 0.6);
    ev.c5_cool0 = Wt('c5_6', 'cooled'); ev.c5_cool = hit(Wt('c5_6', 'zero'), 'ding', 0.6);
    ev.c5_micro = hit(Wt('c5_6', 'microwaves'), 'stamp', 0.7);
    ev.c5_s6 = S('c5_7');                                             // Penzias & Wilson, horn antenna, pigeons
    ev.c5_1964 = hit(Wt('c5_7', 'nineteen'), 'tick', 0.5);
    ev.c5_pw = hit(Wt('c5_7', 'arno'), 'pop', 0.6, -0.2);
    ev.c5_pw2 = hit(Wt('c5_7', 'robert'), 'pop', 0.6, 0.2);
    ev.c5_hiss = hit(Wt('c5_7', 'hiss'), 'hiss', 0.7);
    ev.c5_pigeon = hit(Wt('c5_7', 'pigeon'), 'flap', 0.6);
    ev.c5_stayed = hit(Wt('c5_7', 'stayed'), 'hiss', 0.6);
    ev.c5_glow = hit(Wt('c5_7', 'glow'), 'stamp', 0.7);
    ev.c5_s7 = S('c5_8');                                             // microwave goggles: the glowing sky
    ev.c5_goggles = hit(Wt('c5_8', 'eyes'), 'click', 0.6);
    ev.c5_cmb = hit(Wt('c5_8', 'glow'), 'swell', 0.6);
    ev.sync_cmb = ev.c5_cmb;

    // ===== c6 the darkness we're losing =====
    ev.c6_s1 = ev.c6_cardOut - 0.1;                                   // world at night + atlas stats
    ev.c6_atlas = hit(Wt('c6_2', 'atlas'), 'pop', 0.6);
    ev.c6_third = hit(Wt('c6_2', 'third'), 'ding', 0.6);
    ev.c6_milky = hit(Wt('c6_2', 'milky'), 'drop', 0.5);
    ev.c6_80 = hit(Wt('c6_2', 'eighty'), 'ding', 0.6);
    ev.c6_s2 = S('c6_2b');                                            // dark site vs city
    ev.c6_dark = hit(Wt('c6_2b', 'dark'), 'shimmer', 0.5, -0.4);
    ev.c6_2500 = hit(Wt('c6_2b', 'thousand'), 'ding', 0.5, -0.4);
    ev.c6_city = hit(Wt('c6_2b', 'city'), 'switch', 0.5, 0.4);
    ev.c6_dozen = hit(Wt('c6_2b', 'dozen'), 'drop', 0.5, 0.4);
    ev.c6_s3 = S('c6_3');                                             // Globe at Night: brighter every year
    ev.c6_worse = hit(Wt('c6_3', 'worse'), 'thud', 0.5);
    ev.c6_50k0 = Wt('c6_3', 'fifty'); ev.c6_50k = hit(Wt('c6_3', 'people'), 'ding', 0.5);
    ev.c6_10 = hit(Wt('c6_3', 'ten'), 'blip', 0.6);
    ev.c6_line0 = Wt('c6_3', 'twenty'); ev.c6_line1 = hit(Wt('c6_3', 'two', 0, true), 'ding', 0.5);
    ev.c6_s4 = S('c6_4');                                             // the child's 18 years
    ev.c6_born = hit(Wt('c6_4', 'born'), 'pop', 0.5);
    ev.c6_250 = hit(Wt('c6_4', 'fifty'), 'blip', 0.5);
    ev.c6_100a = Wt('c6_4', 'only'); ev.c6_100 = hit(Wt('c6_4', 'birthday'), 'drop', 0.6);
    ev.c6_s5 = S('c6_4b');                                            // birds + turtles
    ev.c6_birds = hit(Wt('c6_4b', 'birds'), 'flap', 0.6);
    ev.c6_turtles = hit(Wt('c6_4b', 'turtles'), 'pop', 0.5);
    ev.c6_away = hit(Wt('c6_4b', 'away'), 'drop', 0.5);
    ev.c6_s6 = S('c6_5');                                             // the fixes
    ev.c6_shield = hit(Wt('c6_5', 'shielded'), 'click', 0.6, -0.4);
    ev.c6_warm = hit(Wt('c6_5', 'warmer'), 'click', 0.6, 0);
    ev.c6_off = hit(Wt('c6_5', 'switching'), 'switch', 0.7, 0.4);
    ev.c6_stars = hit(Wt('c6_5', 'needs'), 'shimmer', 0.6);

    // ===== c7 payoff + end card =====
    ev.c7_s1 = S('c7_1', 0.6);
    ev.c7_q = hit(L('c7_1').t + 0.1, 'swell', 0.4);
    ev.c7_sun = hit(Wt('c7_1', 'sun'), 'drop', 0.4);
    ev.c7_reasons = [Wt('c7_2', 'beginning'), Wt('c7_2', 'time'), Wt('c7_2', 'stretching')].map((tt, i) => hit(tt, 'stamp', 0.55, -0.4 + i * 0.4));
    ev.c7_s2 = S('c7_3');
    ev.c7_patch = hit(Wt('c7_3', 'patch'), 'blip', 0.5);
    ev.c7_zoom = Wt('c7_3', 'look');
    ev.c7_begin = hit(Wt('c7_3', 'beginning'), 'shimmer', 0.7);
    ev.c7_s3 = S('c7_3b');
    ev.c7_child = hit(Wt('c7_3b', 'child'), 'pop', 0.5);
    ev.c7_cast = [Wt('c7_3b', 'poet'), Wt('c7_3b', 'physicist'), Wt('c7_3b', 'radio'), Wt('c7_3b', 'pigeon')].map((tt, i) => hit(tt, i === 3 ? 'splat' : 'pop', 0.55, -0.5 + i * 0.33));
    ev.c7_s4 = S('c7_4');
    ev.c7_meteors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => hit(L('c7_4').t + 0.4 + i * 0.6, 'meteor', 0.35, -0.6 + U.hash(i, 3) * 1.2));
    ev.c7_nov = hit(Wt('c7_4', 'november'), 'ding', 0.6);
    ev.c7_look = hit(Wt('c7_4', 'look'), 'swell', 0.4);
    ev.c7_s5 = S('c7_5', 0.6);
    ev.sync_logo = hit(ev.c7_s5 + 0.15, 'chime', 0.7);
    ev.c7_like = hit(Wt('c7_5', 'like'), 'pop', 0.7);
    ev.c7_sub = hit(Wt('c7_5', 'subscribe'), 'click', 0.8);
    ev.c7_ig = hit(Wt('c7_5', 'instagram'), 'blip', 0.6, -0.3);
    ev.c7_tt = hit(Wt('c7_5', 'tiktok'), 'blip', 0.6, 0.3);
  };
  if (typeof module !== 'undefined') module.exports = build; else globalThis.EVENTS = build;
})();
