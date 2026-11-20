// EVENTS — every named visual hit and its sound, per chapter. Called by score.js (Node + browser).
// hit(t, kind, gain, pan) registers a sound effect at t and returns t, so the picture uses the same number.
(function () {
  const build = ({ L, Wt, next, ev, hit, CH, U, DURATION }) => {
    const S = (id, d = 0.25) => L(id).t - d; // a shot that starts just before a line
    const H = (id, w, kind, g = 0.55, pan = 0, n = 0) => hit(Wt(id, w, n), kind, g, pan);
    // ===== c0 cold open =====
    ev.c0_s1 = 0; ev.c0_in = hit(0.15, 'swell', 0.4);
    ev.c0_xmas = H('c0_1', 'christmas', 'chime', 0.5); ev.c0_peru = H('c0_1', 'peru', 'pop', 0.5, 0.3); ev.c0_nets = H('c0_1', 'nets', 'splash', 0.5);
    ev.c0_empty = H('c0_1', 'empty', 'boing', 0.4); ev.c0_warm = H('c0_1', 'warm', 'sizzle', 0.4);
    ev.c0_s2 = S('c0_2');
    ev.c0_years = H('c0_2', 'every', 'flip', 0.5); ev.c0_back = H('c0_2', 'back', 'whoosh', 0.45); ev.c0_name = H('c0_2', 'name', 'pop', 0.5);
    ev.c0_nino = H('c0_2', 'el', 'stamp', 0.65); ev.c0_child = H('c0_2', 'child', 'shimmer', 0.5); ev.c0_christ = H('c0_2', 'christ', 'chime', 0.5);
    ev.c0_s3 = S('c0_3');
    ev.c0_2026 = H('c0_3', 'twenty', 'flip', 0.5); ev.c0_bigger = H('c0_3', 'bigger', 'rise', 0.45); ev.c0_patch = H('c0_3', 'patch', 'pop', 0.55); ev.c0_pac = H('c0_3', 'pacific', 'whoosh', 0.4);
    ev.c0_2994a = Wt('c0_3', 'twentynine'); ev.c0_2994 = H('c0_3', 'degrees', 'ding', 0.6); ev.c0_hot = H('c0_3', 'hottest', 'stamp', 0.65);
    ev.c0_s4 = S('c0_4');
    ev.c0_beach = H('c0_4', 'beach', 'splash', 0.45); ev.c0_pull = H('c0_4', 'pulling', 'stretch', 0.45); ev.c0_india = H('c0_4', 'india', 'pop', 0.55, -0.3);
    ev.c0_fire = H('c0_4', 'fires', 'sizzle', 0.45, -0.1); ev.c0_rain = H('c0_4', 'rain', 'rain', 0.5, 0.2); ev.c0_na = H('c0_4', 'north', 'pop', 0.55, 0.3);
    ev.c0_s5 = S('c0_5');
    ev.c0_q1 = H('c0_5', 'travels', 'pop', 0.6, -0.3); ev.c0_q2 = H('c0_5', 'rain', 'pop', 0.6, 0); ev.c0_q3 = H('c0_5', 'strongest', 'pop', 0.6, 0.3);
    ev.c0_s6 = S('c0_6', 0.35); ev.c0_q = H('c0_6', 'control', 'swell', 0.4);
    ev.title0 = L('c0_6').end + 0.35;
    ev.titleWords = ['HOW', 'ONE', 'PATCH', 'OF', 'OCEAN', 'RULES', 'THE', 'WORLD'].map((w, i) => ({ w, t: hit(ev.title0 + 0.3 + i * 0.28, 'slam', i === 7 ? 1.0 : 0.55, -0.4 + i * 0.11) }));
    ev.sync_title = ev.titleWords[7].t;
    ev.titleBrand = hit(ev.titleWords[7].t + 0.9, 'chime', 0.6);
    ev.titlePico = hit(ev.titleBrand + 0.6, 'boing', 0.35);

    // chapter cards: wipe + number, hook line, card out
    for (const c of ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']) {
      ev[c + '_card'] = CH[c].t0; hit(CH[c].t0 + 0.05, 'wipe', 0.5); ev[c + '_stamp'] = hit(CH[c].t0 + 0.3, 'slam', 0.75);
      const h = L(c + '_1h'); ev[c + '_hook'] = h; hit(h.t - 0.05, 'fwip', 0.45);
      ev[c + '_cardOut'] = h.end + 0.5; hit(ev[c + '_cardOut'] - 0.35, 'wipe', 0.35);
    }
    ev.c1_fam = H('c1_1h', 'famines', 'drop', 0.4); ev.c1_other = H('c1_1h', 'other', 'whoosh', 0.4);
    ev.c2_flat = H('c2_1h', 'flat', 'boing', 0.4); ev.c2_tilt = H('c2_1h', 'tilted', 'stretch', 0.5);
    ev.c3_storm = H('c3_1h', 'storm', 'scratch', 0.5); ev.c3_grip = H('c3_1h', 'grip', 'pop', 0.45);
    ev.c4_thou = H('c4_1h', 'thousand', 'whoosh', 0.45); ev.c4_rearr = H('c4_1h', 'rearranges', 'swell', 0.4);
    ev.c5_6t = H('c5_1h', 'trillion', 'coin', 0.55);
    ev.c6_no = H('c6_1h', 'no', 'scratch', 0.5); ev.c6_whole = H('c6_1h', 'whole', 'ding', 0.45);

    // ===== c1 the Christmas child =====
    ev.c1_s1 = ev.c1_cardOut - 0.1;
    ev.c1_1877 = H('c1_2', 'eighteen', 'flip', 0.5); ev.c1_rains = H('c1_2', 'rains', 'rain', 0.45); ev.c1_failed = H('c1_2', 'failed', 'drop', 0.5); ev.c1_worst = H('c1_2', 'worst', 'thud', 0.45);
    ev.c1_s2 = S('c1_3');
    ev.c1_1904 = H('c1_3', 'nineteen', 'flip', 0.5); ev.c1_walker = H('c1_3', 'gilbert', 'pop', 0.55); ev.c1_obs = H('c1_3', 'observatories', 'click', 0.5);
    ev.c1_job = H('c1_3', 'job', 'pop', 0.5); ev.c1_predict = H('c1_3', 'predict', 'ding', 0.55);
    ev.c1_s3 = S('c1_4');
    ev.c1_read = H('c1_4', 'readings', 'type', 0.45); ev.c1_strange = H('c1_4', 'strange', 'boing', 0.4); ev.c1_rose = H('c1_4', 'rose', 'rise', 0.45, -0.3);
    ev.c1_fall = H('c1_4', 'fall', 'drop', 0.45, 0.3); ev.c1_round = H('c1_4', 'round', 'spin', 0.4); ev.c1_seesaw = H('c1_4', 'seesaw', 'stamp', 0.6);
    ev.c1_s4 = S('c1_5');
    ev.c1_1920 = H('c1_5', 'nineteen', 'flip', 0.45); ev.c1_so = H('c1_5', 'southern', 'stamp', 0.6); ev.c1_cant = H('c1_5', 'couldnt', 'scratch', 0.45); ev.c1_rock = H('c1_5', 'rocking', 'tick', 0.45);
    ev.c1_s5 = S('c1_6');
    ev.c1_1969 = H('c1_6', 'nineteen', 'flip', 0.45); ev.c1_bj = H('c1_6', 'jacob', 'pop', 0.55); ev.c1_dots = H('c1_6', 'dots', 'ding', 0.5);
    ev.c1_warm = H('c1_6', 'warm', 'pop', 0.5, -0.3); ev.c1_see = H('c1_6', 'seesaw', 'pop', 0.5, 0.3); ev.c1_same = H('c1_6', 'same', 'clank', 0.5);
    ev.c1_machine = H('c1_6', 'machine', 'clank', 0.45); ev.c1_enso = H('c1_6', 'enso', 'stamp', 0.65);
    ev.c1_s6 = S('c1_7');
    ev.c1_normal = H('c1_7', 'normal', 'pop', 0.5); ev.c1_think = H('c1_7', 'think', 'blip', 0.45);

    // ===== c2 the tilted ocean =====
    ev.c2_s1 = ev.c2_cardOut - 0.1;
    ev.c2_eq = H('c2_2', 'equator', 'zip', 0.45); ev.c2_trade = H('c2_2', 'trade', 'wind', 0.45); ev.c2_east = H('c2_2', 'east', 'whoosh', 0.45);
    ev.c2_sa = H('c2_2', 'south', 'pop', 0.5, 0.4); ev.c2_asia = H('c2_2', 'asia', 'pop', 0.5, -0.4); ev.c2_day = H('c2_2', 'day', 'tick', 0.45);
    ev.c2_s2 = S('c2_3');
    ev.c2_push = H('c2_3', 'push', 'whoosh', 0.45); ev.c2_tub = H('c2_3', 'bathtub', 'splash', 0.5); ev.c2_pile = H('c2_3', 'piles', 'flow', 0.45);
    ev.c2_indo = H('c2_3', 'indonesia', 'pop', 0.5, -0.4); ev.c2_half = H('c2_3', 'half', 'stamp', 0.65); ev.c2_ecu = H('c2_3', 'ecuador', 'pop', 0.5, 0.4);
    ev.c2_s3 = S('c2_4');
    ev.c2_8a = Wt('c2_4', 'eight'); ev.c2_8 = H('c2_4', 'degrees', 'ding', 0.55); ev.c2_pool = H('c2_4', 'pool', 'swell', 0.4); ev.c2_4x = H('c2_4', 'four', 'stamp', 0.6); ev.c2_us = H('c2_4', 'united', 'pop', 0.5);
    ev.c2_s4 = S('c2_5');
    ev.c2_other = H('c2_5', 'other', 'whoosh', 0.45); ev.c2_cold = H('c2_5', 'cold', 'ice', 0.5); ev.c2_rises = H('c2_5', 'rises', 'bubble', 0.5);
    ev.c2_nutr = H('c2_5', 'nutrients', 'shimmer', 0.45); ev.c2_fish = H('c2_5', 'fisheries', 'splash', 0.5); ev.c2_world = H('c2_5', 'world', 'ding', 0.5);
    ev.c2_s5 = S('c2_6');
    ev.c2_clouds = H('c2_6', 'clouds', 'pop', 0.5, -0.4); ev.c2_rain = H('c2_6', 'rain', 'rain', 0.45, -0.4); ev.c2_dry = H('c2_6', 'dry', 'sizzle', 0.4, 0.4);
    ev.c2_bal = H('c2_6', 'balance', 'tick', 0.5); ev.c2_wind = H('c2_6', 'wind', 'wind', 0.45); ev.c2_tired = H('c2_6', 'tired', 'winddown', 0.45);

    // ===== c3 when the wind lets go =====
    ev.c3_s1 = ev.c3_cardOut - 0.1;
    ev.c3_weak = H('c3_2', 'weaken', 'winddown', 0.45); ev.c3_rev = H('c3_2', 'reverse', 'rewind', 0.4); ev.c3_slosh = H('c3_2', 'sloshing', 'flow', 0.5); ev.c3_east = H('c3_2', 'east', 'whoosh', 0.45);
    ev.c3_s2 = S('c3_3');
    ev.c3_huge = H('c3_3', 'huge', 'swell', 0.45); ev.c3_kelvin = H('c3_3', 'kelvin', 'stamp', 0.6); ev.c3_bike = H('c3_3', 'bicycle', 'bell', 0.4); ev.c3_months = H('c3_3', 'months', 'flip', 0.45); ev.c3_cross = H('c3_3', 'cross', 'whoosh', 0.45);
    ev.c3_s3 = S('c3_4');
    ev.c3_arr = H('c3_4', 'arrives', 'flow', 0.45); ev.c3_cover = H('c3_4', 'covers', 'splat', 0.5); ev.c3_fade = H('c3_4', 'fade', 'vanish', 0.45);
    ev.c3_deep = H('c3_4', 'deeper', 'drop', 0.45); ev.c3_dis = H('c3_4', 'disappear', 'vanish', 0.45); ev.c3_xmas = H('c3_4', 'christmas', 'chime', 0.5);
    ev.c3_s4 = S('c3_5');
    ev.c3_trap = H('c3_5', 'trap', 'clank', 0.5); ev.c3_w1 = H('c3_5', 'warmer', 'pop', 0.5); ev.c3_w2 = H('c3_5', 'weakens', 'pop', 0.5); ev.c3_w3 = H('c3_5', 'weaker', 'pop', 0.5);
    ev.c3_flow = H('c3_5', 'flow', 'whoosh', 0.45); ev.c3_feeds = H('c3_5', 'feeds', 'stamp', 0.6);
    ev.c3_s5 = S('c3_6');
    ev.c3_box = H('c3_6', 'box', 'pop', 0.5); ev.c3_34 = H('c3_6', 'three', 'stamp', 0.55); ev.c3_half = H('c3_6', 'half', 'ding', 0.5); ev.c3_isnino = H('c3_6', 'thats', 'pop', 0.5);
    ev.c3_two = H('c3_6', 'two', 'ding', 0.5); ev.c3_very = H('c3_6', 'very', 'stamp', 0.55); ev.c3_super = H('c3_6', 'super', 'stamp', 0.6);
    ev.c3_s6 = S('c3_7');
    ev.c3_water = H('c3_7', 'water', 'splash', 0.45); ev.c3_rainw = H('c3_7', 'rain', 'thud', 0.55);

    // ===== c4 one ocean, the whole world =====
    ev.c4_s1 = ev.c4_cardOut - 0.1;
    ev.c4_tower = H('c4_2', 'towering', 'rise', 0.45); ev.c4_slides = H('c4_2', 'slides', 'whoosh', 0.45); ev.c4_heavy = H('c4_2', 'heaviest', 'rain', 0.5);
    ev.c4_indo = H('c4_2', 'indonesia', 'pop', 0.5, -0.4); ev.c4_mid = H('c4_2', 'middle', 'ding', 0.5, 0.2);
    ev.c4_s2 = S('c4_3');
    ev.c4_pump = H('c4_3', 'pump', 'rise', 0.45); ev.c4_bends = H('c4_3', 'bends', 'stretch', 0.45); ev.c4_jet = H('c4_3', 'jet', 'jet', 0.5); ev.c4_ripple = H('c4_3', 'ripples', 'shimmer', 0.45); ev.c4_globe = H('c4_3', 'globe', 'ding', 0.5);
    ev.c4_s3 = S('c4_4');
    ev.c4_peru = H('c4_4', 'peru', 'pop', 0.5, 0.3); ev.c4_flood = H('c4_4', 'flood', 'splash', 0.5, 0.3); ev.c4_indo2 = H('c4_4', 'indonesia', 'pop', 0.5, -0.3);
    ev.c4_aus = H('c4_4', 'australia', 'pop', 0.5, -0.2); ev.c4_drought = H('c4_4', 'drought', 'sizzle', 0.45, -0.3); ev.c4_india = H('c4_4', 'indias', 'pop', 0.5, -0.4);
    ev.c4_saf = H('c4_4', 'southern', 'pop', 0.5, -0.5); ev.c4_dry = H('c4_4', 'dry', 'sizzle', 0.4, -0.5);
    ev.c4_s4 = S('c4_5');
    ev.c4_na = H('c4_5', 'north', 'pop', 0.5); ev.c4_wet = H('c4_5', 'wetter', 'rain', 0.45); ev.c4_mild = H('c4_5', 'milder', 'chime', 0.45);
    ev.c4_atl = H('c4_5', 'atlantic', 'whoosh', 0.45, 0.3); ev.c4_tear = H('c4_5', 'tear', 'crack', 0.5, 0.3); ev.c4_pac = H('c4_5', 'pacific', 'pop', 0.5, -0.3); ev.c4_more = H('c4_5', 'more', 'spin', 0.45, -0.3);
    ev.c4_s5 = S('c4_6');
    ev.c4_myth = H('c4_6', 'myth', 'stamp', 0.6); ev.c4_doesnt = H('c4_6', 'doesnt', 'scratch', 0.5); ev.c4_hotter = H('c4_6', 'hotter', 'sizzle', 0.4);
    ev.c4_reshuf = H('c4_6', 'reshuffles', 'spin', 0.45); ev.c4_cool = H('c4_6', 'cooler', 'ice', 0.45); ev.c4_aus2 = H('c4_6', 'australia', 'pop', 0.5); ev.c4_unwet = H('c4_6', 'unusually', 'rain', 0.45);
    ev.c4_s6 = S('c4_7');
    ev.c4_avg = H('c4_7', 'averaged', 'pop', 0.5); ev.c4_rel = H('c4_7', 'releases', 'rise', 0.45); ev.c4_tenth = H('c4_7', 'tenth', 'ding', 0.55); ev.c4_while = H('c4_7', 'while', 'tick', 0.45);
    ev.c4_2016 = H('c4_7', 'sixteen', 'stamp', 0.55, -0.3); ev.c4_2024 = H('c4_7', 'twentyfour', 'stamp', 0.55, 0.3);
    ev.c4_s7 = S('c4_8');
    ev.c4_small = H('c4_8', 'small', 'shrink', 0.45); ev.c4_exp = H('c4_8', 'expensive', 'coin', 0.55);

    // ===== c5 the price of a warm patch =====
    ev.c5_s1 = ev.c5_cardOut - 0.1;
    ev.c5_fish = H('c5_2', 'fish', 'splash', 0.45); ev.c5_1970 = H('c5_2', 'seventy', 'flip', 0.45); ev.c5_10a = Wt('c5_2', 'ten'); ev.c5_10 = H('c5_2', 'tonnes', 'ding', 0.55);
    ev.c5_came = H('c5_2', 'came', 'sizzle', 0.4); ev.c5_over = H('c5_2', 'overfishing', 'pop', 0.5); ev.c5_1973 = H('c5_2', 'seventythree', 'flip', 0.45); ev.c5_crash = H('c5_2', 'crashed', 'crash', 0.5); ev.c5_2m = H('c5_2', 'two', 'drop', 0.45);
    ev.c5_s2 = S('c5_3');
    ev.c5_97 = H('c5_3', 'nineteen', 'flip', 0.45); ev.c5_flood = H('c5_3', 'floods', 'splash', 0.4, -0.3); ev.c5_drought = H('c5_3', 'droughts', 'sizzle', 0.35, 0); ev.c5_fires = H('c5_3', 'fires', 'sizzle', 0.35, 0.3);
    ev.c5_23a = Wt('c5_3', 'twentythree'); ev.c5_23 = H('c5_3', 'died', 'bell', 0.35);
    ev.c5_s3 = S('c5_4');
    ev.c5_dart = H('c5_4', 'dartmouth', 'pop', 0.5); ev.c5_money = H('c5_4', 'money', 'coin', 0.5); ev.c5_57a = Wt('c5_4', 'five'); ev.c5_57 = H('c5_4', 'trillion', 'coin', 0.6); ev.c5_5y = H('c5_4', 'years', 'tick', 0.45);
    ev.c5_s4 = S('c5_5');
    ev.c5_2023 = H('c5_5', 'twenty', 'flip', 0.45); ev.c5_pan = H('c5_5', 'panama', 'pop', 0.5); ev.c5_lakes = H('c5_5', 'lakes', 'drain', 0.45);
    ev.c5_ships = H('c5_5', 'ships', 'horn', 0.4); ev.c5_36 = H('c5_5', 'thirtysix', 'ding', 0.5); ev.c5_25 = H('c5_5', 'twentyfive', 'stamp', 0.6);
    ev.c5_s5 = S('c5_6');
    ev.c5_sea = H('c5_6', 'sea', 'bubble', 0.45); ev.c5_coral = H('c5_6', 'coral', 'shimmer', 0.45); ev.c5_bleach = H('c5_6', 'bleaching', 'vanish', 0.45);
    ev.c5_70a = Wt('c5_6', 'seventy'); ev.c5_70 = H('c5_6', 'percent', 'ding', 0.55); ev.c5_reefs = H('c5_6', 'reefs', 'pop', 0.45);
    ev.c5_s6 = S('c5_7');
    ev.c5_q = H('c5_7', 'question', 'blip', 0.45); ev.c5_cc = H('c5_7', 'climate', 'stamp', 0.55);

    // ===== c6 the record breaker =====
    ev.c6_s1 = ev.c6_cardOut - 0.1;
    ev.c6_anc = H('c6_2', 'ancient', 'stamp', 0.55); ev.c6_fossil = H('c6_2', 'fossil', 'pop', 0.5); ev.c6_rise = H('c6_2', 'rising', 'rise', 0.4); ev.c6_fall = H('c6_2', 'falling', 'drop', 0.4);
    ev.c6_7ka = Wt('c6_2', 'seven'); ev.c6_7k = H('c6_2', 'years', 'ding', 0.55); ev.c6_cars = H('c6_2', 'cars', 'pop', 0.45);
    ev.c6_s2 = S('c6_3');
    ev.c6_warmer = H('c6_3', 'warmer', 'sizzle', 0.4); ev.c6_gal = H('c6_3', 'galpagos', 'pop', 0.5); ev.c6_1000 = H('c6_3', 'thousand', 'ding', 0.55); ev.c6_stronger = H('c6_3', 'stronger', 'rise', 0.45); ev.c6_debated = H('c6_3', 'debated', 'tick', 0.45);
    ev.c6_s3 = S('c6_4');
    ev.c6_now = H('c6_4', 'now', 'pop', 0.5); ev.c6_2994a = Wt('c6_4', 'twentynine'); ev.c6_2994 = H('c6_4', 'degrees', 'ding', 0.6); ev.c6_321 = H('c6_4', 'above', 'ding', 0.55);
    ev.c6_rec = H('c6_4', 'records', 'stamp', 0.6); ev.c6_82 = H('c6_4', 'eightytwo', 'crash', 0.45, -0.3); ev.c6_97 = H('c6_4', 'ninetyseven', 'crash', 0.45, 0); ev.c6_15 = H('c6_4', 'fifteen', 'crash', 0.45, 0.3);
    ev.c6_s4 = S('c6_5');
    ev.c6_noaa = H('c6_5', 'noaa', 'pop', 0.5); ev.c6_60a = Wt('c6_5', 'sixty'); ev.c6_60 = H('c6_5', 'chance', 'ding', 0.55); ev.c6_1950 = H('c6_5', 'nineteen', 'flip', 0.45);
    ev.c6_wmo = H('c6_5', 'world', 'pop', 0.5); ev.c6_dec = H('c6_5', 'december', 'chime', 0.5); ev.c6_feb = H('c6_5', 'february', 'tick', 0.45);
    ev.c6_s5 = S('c6_6');
    ev.c6_felt = H('c6_6', 'felt', 'thud', 0.45); ev.c6_india = H('c6_6', 'indias', 'pop', 0.5, -0.3); ev.c6_13 = H('c6_6', 'thirteen', 'ding', 0.55, -0.3);
    ev.c6_indo = H('c6_6', 'indonesia', 'pop', 0.5); ev.c6_fire = H('c6_6', 'wildfires', 'sizzle', 0.4); ev.c6_peru = H('c6_6', 'peru', 'pop', 0.5, 0.3); ev.c6_extra = H('c6_6', 'extraordinary', 'stamp', 0.55, 0.3); ev.c6_rain = H('c6_6', 'rain', 'rain', 0.45, 0.3);
    ev.c6_s6 = S('c6_7');
    ev.c6_peak = H('c6_7', 'peak', 'rise', 0.45); ev.c6_met = H('c6_7', 'met', 'pop', 0.5); ev.c6_2027 = H('c6_7', 'twentyseven', 'stamp', 0.6); ev.c6_likely = H('c6_7', 'likely', 'tick', 0.45); ev.c6_hottest = H('c6_7', 'hottest', 'sizzle', 0.4);

    // ===== c7 payoff + end card =====
    ev.c7_s1 = S('c7_1', 0.6); ev.c7_q = Wt('c7_1', 'how');
    ev.c7_s2 = S('c7_2');
    ev.c7_patch = H('c7_2', 'patch', 'scratch', 0.45); ev.c7_half = H('c7_2', 'half', 'pop', 0.5); ev.c7_spans = H('c7_2', 'spans', 'zip', 0.45); ev.c7_lets = H('c7_2', 'lets', 'winddown', 0.4);
    ev.c7_rolls = H('c7_2', 'rolls', 'flow', 0.5); ev.c7_storms = H('c7_2', 'storms', 'pop', 0.55); ev.c7_bend = H('c7_2', 'bend', 'shimmer', 0.5);
    ev.c7_s3 = S('c7_3');
    ev.c7_cent = H('c7_3', 'century', 'flip', 0.45); ev.c7_nets = H('c7_3', 'nets', 'splash', 0.45); ev.c7_today = H('c7_3', 'today', 'whoosh', 0.45);
    ev.c7_sat = H('c7_3', 'satellites', 'blip', 0.5, -0.3); ev.c7_buoy = H('c7_3', 'buoys', 'pop', 0.5, 0); ev.c7_sci = H('c7_3', 'scientists', 'pop', 0.5, 0.3); ev.c7_every = H('c7_3', 'every', 'ding', 0.45);
    ev.c7_s4 = S('c7_4');
    ev.c7_xmas = H('c7_4', 'christmas', 'chime', 0.55); ev.c7_back = H('c7_4', 'back', 'shimmer', 0.5); ev.c7_bigger = H('c7_4', 'bigger', 'stamp', 0.6);
    ev.c7_s5 = S('c7_5', 0.6); ev.sync_logo = hit(ev.c7_s5 + 0.25, 'chime', 0.7);
    ev.c7_like = H('c7_5', 'like', 'pop', 0.6, -0.3); ev.c7_sub = H('c7_5', 'subscribe', 'ding', 0.65, 0.3);
    ev.c7_ig = H('c7_5', 'instagram', 'pop', 0.55, -0.3); ev.c7_tt = H('c7_5', 'tiktok', 'pop', 0.55, 0.3);
    ev.c7_send = hit(L('c7_5').end + 0.4, 'fwip', 0.5); ev.c7_bye = hit(L('c7_5').end + 1.6, 'boing', 0.4);
    // verified sync markers (clear hits)
    ev.sync_hot = ev.c0_hot; ev.sync_half = ev.c2_half; ev.sync_myth = ev.c4_myth;
  };
  if (typeof module !== 'undefined') module.exports = build; else globalThis.EVENTS = build;
})();
