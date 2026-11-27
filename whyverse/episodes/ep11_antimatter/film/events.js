// EVENTS — every named visual hit and its sound, per chapter. Called by score.js (Node + browser).
// hit(t, kind, gain, pan) registers a sound effect at t and returns t, so the picture uses the same number.
(function () {
  const build = ({ L, Wt, next, ev, hit, CH, U, DURATION }) => {
    const S = (id, d = 0.25) => L(id).t - d; // a shot that starts just before a line
    const H = (id, w, kind, g = 0.55, pan = 0, n = 0) => hit(Wt(id, w, n), kind, g, pan);
    // ===== c0 cold open =====
    ev.c0_s1 = 0; hit(0.15, 'swell', 0.35);
    ev.c0_banana = H('c0_1', 'banana', 'pop', 0.55); ev.c0_75 = H('c0_1', 'seventyfive', 'tick', 0.5); ev.c0_amazing = H('c0_1', 'amazing', 'ding', 0.45);
    ev.c0_shoots = H('c0_1', 'shoots', 'zap', 0.5); ev.c0_speck = H('c0_1', 'antimatter', 'blip', 0.55);
    ev.c0_s2 = S('c0_2');
    ev.c0_positron = H('c0_2', 'positron', 'pop', 0.55); ev.c0_meets = H('c0_2', 'electron', 'pop', 0.5); ev.c0_vanish = H('c0_2', 'vanish', 'flash', 0.6); ev.c0_gone = H('c0_2', 'gone', 'vanish', 0.45); ev.c0_light = H('c0_2', 'light', 'shimmer', 0.5);
    ev.c0_s3 = S('c0_3');
    ev.c0_problem = H('c0_3', 'problem', 'thud', 0.45); ev.c0_bang = H('c0_3', 'big', 'boom', 0.5); ev.c0_equal = H('c0_3', 'equal', 'ding', 0.5); ev.c0_twin = H('c0_3', 'twin', 'pop', 0.5);
    ev.c0_s4 = S('c0_4');
    ev.c0_meet = H('c0_4', 'meet', 'flash', 0.55); ev.c0_empty = H('c0_4', 'empty', 'drop', 0.5);
    ev.c0_nostars = H('c0_4', 'stars', 'vanish', 0.4, -0.3); ev.c0_noplanets = H('c0_4', 'planets', 'vanish', 0.4, -0.1); ev.c0_nobananas = H('c0_4', 'bananas', 'vanish', 0.4, 0.1); ev.c0_noyou = H('c0_4', 'you', 'vanish', 0.5, 0.3);
    ev.c0_s5 = S('c0_5');
    ev.c0_here = H('c0_5', 'here', 'boing', 0.45); ev.c0_q1 = H('c0_5', 'antimatter', 'pop', 0.6, -0.3); ev.c0_q2 = H('c0_5', 'hold', 'pop', 0.6, 0); ev.c0_q3 = H('c0_5', 'clue', 'pop', 0.6, 0.3); ev.c0_exists = H('c0_5', 'exists', 'shimmer', 0.4);
    ev.c0_s6 = S('c0_6', 0.35); ev.c0_destroy = H('c0_6', 'destroy', 'thud', 0.5);
    ev.title0 = L('c0_6').end + 0.35;
    ev.titleWords = ['THE', 'UNIVERSE', 'SHOULD BE', 'EMPTY.'].map((w, i) => ({ w, t: hit(ev.title0 + 0.35 + i * 0.42, 'slam', i === 3 ? 1.0 : 0.6, -0.3 + i * 0.2) }));
    ev.sync_title = ev.titleWords[3].t;
    ev.titleSub = hit(ev.titleWords[3].t + 0.7, 'pen', 0.4);
    ev.titleBrand = hit(ev.titleWords[3].t + 1.6, 'chime', 0.6);
    ev.titleElle = hit(ev.titleBrand + 0.6, 'boing', 0.35);

    // chapter cards: wipe + number, hook line, card out
    for (const c of ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']) {
      ev[c + '_card'] = CH[c].t0; hit(CH[c].t0 + 0.05, 'wipe', 0.5); ev[c + '_stamp'] = hit(CH[c].t0 + 0.3, 'slam', 0.75);
      const h = L(c + '_1h'); ev[c + '_hook'] = h; hit(h.t - 0.05, 'fwip', 0.45);
      ev[c + '_cardOut'] = h.end + 0.5; hit(ev[c + '_cardOut'] - 0.35, 'wipe', 0.35);
    }
    ev.c1_lab = H('c1_1h', 'lab', 'tick', 0.4); ev.c1_eq = H('c1_1h', 'equation', 'pen', 0.5);
    ev.c2_hands = H('c2_1h', 'shake', 'pop', 0.45); ev.c2_dis = H('c2_1h', 'disappear', 'vanish', 0.45);
    ev.c3_store = H('c3_1h', 'store', 'tick', 0.4); ev.c3_box = H('c3_1h', 'box', 'thud', 0.45);
    ev.c4_every = H('c4_1h', 'everything', 'swell', 0.4); ev.c4_left = H('c4_1h', 'leftover', 'ding', 0.5);
    ev.c5_1967 = H('c5_1h', 'nineteen', 'flip', 0.45); ev.c5_recipe = H('c5_1h', 'recipe', 'pen', 0.45);
    ev.c6_hide = H('c6_1h', 'hiding', 'whoosh', 0.4); ev.c6_small = H('c6_1h', 'smaller', 'shrink', 0.45);

    // ===== c1 the mirror twin =====
    ev.c1_s1 = ev.c1_cardOut - 0.1;
    ev.c1_1928 = H('c1_2', 'nineteen', 'flip', 0.5); ev.c1_dirac = H('c1_2', 'paul', 'pop', 0.5); ev.c1_write = H('c1_2', 'wrote', 'pen', 0.55); ev.c1_beaut = H('c1_2', 'beautifully', 'ding', 0.5);
    ev.c1_strange = H('c1_2', 'strange', 'boing', 0.45); ev.c1_opp = H('c1_2', 'opposite', 'flip', 0.55);
    ev.c1_s2 = S('c1_3');
    ev.c1_1932 = H('c1_3', 'nineteen', 'flip', 0.5); ev.c1_anderson = H('c1_3', 'carl', 'pop', 0.5); ev.c1_cosmic = H('c1_3', 'cosmic', 'rain', 0.4); ev.c1_chamber = H('c1_3', 'chamber', 'tick', 0.4);
    ev.c1_wrong = H('c1_3', 'wrong', 'scratch', 0.55); ev.c1_pos = H('c1_3', 'positive', 'pop', 0.5); ev.c1_positron = H('c1_3', 'positron', 'stamp', 0.6);
    ev.c1_s3 = S('c1_4');
    ev.c1_nob1 = H('c1_4', 'nobel', 'chime', 0.55, -0.3); ev.c1_33 = H('c1_4', 'thirtythree', 'ding', 0.45, -0.3); ev.c1_nob2 = H('c1_4', 'anderson', 'chime', 0.55, 0.3); ev.c1_36 = H('c1_4', 'thirtysix', 'ding', 0.45, 0.3);
    ev.c1_s4 = S('c1_5');
    ev.c1_every = H('c1_5', 'every', 'swell', 0.4); ev.c1_mass = H('c1_5', 'mass', 'tick', 0.45); ev.c1_charge = H('c1_5', 'charge', 'flip', 0.5); ev.c1_proton = H('c1_5', 'protons', 'pop', 0.5, -0.3); ev.c1_aproton = H('c1_5', 'antiprotons', 'pop', 0.5, 0.3);
    ev.c1_hyd = H('c1_5', 'hydrogen', 'pop', 0.5, -0.3); ev.c1_ahyd = H('c1_5', 'antihydrogen', 'pop', 0.55, 0.3);
    ev.c1_s5 = S('c1_6');
    ev.c1_myth = H('c1_6', 'myth', 'stamp', 0.6); ev.c1_isnt = H('c1_6', 'isnt', 'scratch', 0.55); ev.c1_bananas = H('c1_6', 'bananas', 'pop', 0.5); ev.c1_k40 = H('c1_6', 'potassiumforty', 'blip', 0.5);
    ev.c1_body = H('c1_6', 'body', 'heart', 0.45); ev.c1_you = H('c1_6', 'even', 'pop', 0.5); ev.c1_ypos = H('c1_6', 'positron', 'zap', 0.45);
    ev.c1_s6 = S('c1_7');
    ev.c1_born = H('c1_7', 'born', 'pop', 0.45); ev.c1_where = H('c1_7', 'where', 'boing', 0.45);

    // ===== c2 the flash =====
    ev.c2_s1 = ev.c2_cardOut - 0.1;
    ev.c2_meets = H('c2_2', 'meets', 'pop', 0.45); ev.c2_ann = H('c2_2', 'annihilate', 'flash', 0.65); ev.c2_mass = H('c2_2', 'mass', 'tick', 0.45); ev.c2_energy = H('c2_2', 'energy', 'zap', 0.5); ev.c2_light = H('c2_2', 'light', 'shimmer', 0.5);
    ev.c2_emc = H('c2_2', 'equals', 'stamp', 0.6); ev.c2_nothing = H('c2_2', 'nothing', 'vanish', 0.45);
    ev.c2_s2 = S('c2_3');
    ev.c2_enorm = H('c2_3', 'enormous', 'boom', 0.45); ev.c2_g1 = H('c2_3', 'gram', 'pop', 0.5, -0.3, 0); ev.c2_g2 = H('c2_3', 'gram', 'pop', 0.5, 0.3, 1); ev.c2_rel = H('c2_3', 'release', 'flash', 0.55);
    ev.c2_plant = H('c2_3', 'power', 'switch', 0.5); ev.c2_days = H('c2_3', 'two', 'ding', 0.55);
    ev.c2_s3 = S('c2_4');
    ev.c2_myth = H('c2_4', 'myth', 'stamp', 0.6); ev.c2_fuel = H('c2_4', 'fuel', 'pop', 0.45); ev.c2_bomb = H('c2_4', 'bomb', 'thud', 0.45); ev.c2_check = H('c2_4', 'reality', 'scratch', 0.5);
    ev.c2_s4 = S('c2_5');
    ev.c2_cern = H('c2_5', 'cern', 'pop', 0.5); ev.c2_geneva = H('c2_5', 'geneva', 'tick', 0.45); ev.c2_fact = H('c2_5', 'factory', 'clank', 0.5); ev.c2_year = H('c2_5', 'year', 'flip', 0.45);
    ev.c2_bulb = H('c2_5', 'bulb', 'switch', 0.55); ev.c2_5s = H('c2_5', 'five', 'tick', 0.55); ev.c2_sec = Wt('c2_5', 'seconds', 0, true); hit(ev.c2_sec + 0.15, 'winddown', 0.4);
    ev.c2_s5 = S('c2_6');
    ev.c2_slow = H('c2_6', 'slow', 'winddown', 0.35); ev.c2_harder = H('c2_6', 'harder', 'thud', 0.45); ev.c2_wall = H('c2_6', 'wall', 'flash', 0.55); ev.c2_gone = H('c2_6', 'gone', 'vanish', 0.5);

    // ===== c3 how to hold nothing =====
    ev.c3_s1 = ev.c3_cardOut - 0.1;
    ev.c3_touch = H('c3_2', 'touch', 'tick', 0.4); ev.c3_mag = H('c3_2', 'magnetic', 'clank', 0.5); ev.c3_elec = H('c3_2', 'electric', 'zap', 0.45); ev.c3_vac = H('c3_2', 'vacuum', 'whoosh', 0.45); ev.c3_float = H('c3_2', 'float', 'shimmer', 0.45);
    ev.c3_s2 = S('c3_3');
    ev.c3_400a = Wt('c3_3', 'four'); ev.c3_400 = H('c3_3', 'antiprotons', 'ding', 0.55); ev.c3_hour = H('c3_3', 'hour', 'tick', 0.45); ev.c3_catch = H('c3_3', 'catch', 'pop', 0.5); ev.c3_10 = H('c3_3', 'ten', 'ding', 0.55);
    ev.c3_s3 = S('c3_4');
    ev.c3_alpha = H('c3_4', 'alpha', 'stamp', 0.55); ev.c3_atoms = H('c3_4', 'antiatoms', 'pop', 0.5); ev.c3_3000a = Wt('c3_4', 'three'); ev.c3_3000 = H('c3_4', 'antihydrogen', 'ding', 0.55); ev.c3_100 = H('c3_4', 'hundred', 'ding', 0.5);
    ev.c3_s4 = S('c3_5');
    ev.c3_2023 = H('c3_5', 'twenty', 'flip', 0.45); ev.c3_fall = H('c3_5', 'fall', 'drop', 0.45); ev.c3_up = H('c3_5', 'up', 'rise', 0.4); ev.c3_go = H('c3_5', 'go', 'release', 0.45); ev.c3_fell = H('c3_5', 'fell', 'drop', 0.55); ev.c3_normal = H('c3_5', 'normal', 'ding', 0.5);
    ev.c3_s5 = S('c3_6');
    ev.c3_trip = H('c3_6', 'road', 'horn', 0.35); ev.c3_march = H('c3_6', 'twentyfourth', 'flip', 0.45); ev.c3_92 = H('c3_6', 'ninetytwo', 'ding', 0.55); ev.c3_truck = H('c3_6', 'truck', 'truck', 0.45); ev.c3_step = H('c3_6', 'basestep', 'stamp', 0.55);
    ev.c3_quiet = H('c3_6', 'quieter', 'shimmer', 0.4); ev.c3_noise = H('c3_6', 'noise', 'buzz', 0.3);
    ev.c3_s6 = S('c3_7');
    ev.c3_oct = H('c3_7', 'october', 'flip', 0.45); ev.c3_nw = H('c3_7', 'northwestern', 'pop', 0.5); ev.c3_single = H('c3_7', 'single', 'blip', 0.55); ev.c3_months = H('c3_7', 'months', 'tick', 0.5); ev.c3_zero = H('c3_7', 'absolute', 'ice', 0.5);
    ev.c3_s7 = S('c3_8');
    ev.c3_effort = H('c3_8', 'effort', 'pop', 0.4); ev.c3_diff = H('c3_8', 'difference', 'ding', 0.55);

    // ===== c4 one in a billion =====
    ev.c4_s1 = ev.c4_cardOut - 0.1;
    ev.c4_matter = H('c4_2', 'matter', 'pop', 0.5, -0.3); ev.c4_light = H('c4_2', 'light', 'shimmer', 0.45, 0.3); ev.c4_tiny = H('c4_2', 'tiny', 'shrink', 0.45);
    ev.c4_s2 = S('c4_3');
    ev.c4_billion = H('c4_3', 'billion', 'swell', 0.5); ev.c4_wiped = H('c4_3', 'wiped', 'flash', 0.55); ev.c4_one = H('c4_3', 'extra', 'ding', 0.6); ev.c4_survived = H('c4_3', 'survived', 'shimmer', 0.5); ev.c4_just = H('c4_3', 'just', 'tick', 0.45);
    ev.c4_s3 = S('c4_4');
    ev.c4_star = H('c4_4', 'star', 'pop', 0.5, -0.3); ev.c4_planet = H('c4_4', 'planet', 'pop', 0.5, 0); ev.c4_person = H('c4_4', 'person', 'pop', 0.5, 0.3); ev.c4_surv = H('c4_4', 'survivors', 'chime', 0.5); ev.c4_1in = H('c4_4', 'one', 'stamp', 0.6, 0, 0);
    ev.c4_s4 = S('c4_5');
    ev.c4_still = H('c4_5', 'still', 'shimmer', 0.45); ev.c4_411a = Wt('c4_5', 'four'); ev.c4_411 = H('c4_5', 'ancient', 'ding', 0.55); ev.c4_cm = H('c4_5', 'cubic', 'pop', 0.5); ev.c4_you = H('c4_5', 'around', 'swell', 0.35);
    ev.c4_s5 = S('c4_6');
    ev.c4_myth = H('c4_6', 'myth', 'stamp', 0.6); ev.c4_hiding = H('c4_6', 'hiding', 'whoosh', 0.4); ev.c4_astars = H('c4_6', 'antistars', 'pop', 0.5, -0.3); ev.c4_agal = H('c4_6', 'antigalaxies', 'pop', 0.5, 0.3);
    ev.c4_s6 = S('c4_7');
    ev.c4_flashes = H('c4_7', 'flashes', 'flash', 0.5); ev.c4_touch = H('c4_7', 'touch', 'zap', 0.45); ev.c4_none = H('c4_7', 'such', 'scratch', 0.55); ev.c4_found = H('c4_7', 'found', 'thud', 0.4); ev.c4_obs = H('c4_7', 'observable', 'swell', 0.4);
    ev.c4_s7 = S('c4_8');
    ev.c4_lost = H('c4_8', 'lost', 'vanish', 0.5); ev.c4_laws = H('c4_8', 'laws', 'clank', 0.45); ev.c4_favour = H('c4_8', 'favour', 'drop', 0.5); ev.c4_how = H('c4_8', 'how', 'boing', 0.45);

    // ===== c5 the rule breakers =====
    ev.c5_s1 = ev.c5_cardOut - 0.1;
    ev.c5_sakharov = H('c5_2', 'andrei', 'pop', 0.55); ev.c5_three = H('c5_2', 'three', 'ding', 0.5);
    ev.c5_s2 = S('c5_3');
    ev.c5_r1 = H('c5_3', 'one', 'pop', 0.55, -0.3); ev.c5_more = H('c5_3', 'more', 'rise', 0.4); ev.c5_r2 = H('c5_3', 'two', 'pop', 0.55, 0); ev.c5_diff = H('c5_3', 'different', 'flip', 0.45);
    ev.c5_r3 = H('c5_3', 'three', 'pop', 0.55, 0.3); ev.c5_bal = H('c5_3', 'balance', 'stretch', 0.45); ev.c5_hot = H('c5_3', 'hot', 'sizzle', 0.4);
    ev.c5_s3 = S('c5_4');
    ev.c5_cp = H('c5_4', 'c', 'stamp', 0.6, 0, 0); ev.c5_seen = H('c5_4', 'seen', 'ding', 0.45); ev.c5_1964 = H('c5_4', 'nineteen', 'flip', 0.45); ev.c5_cronin = H('c5_4', 'james', 'pop', 0.5, -0.2); ev.c5_fitch = H('c5_4', 'val', 'pop', 0.5, 0.2);
    ev.c5_tinyd = H('c5_4', 'tiny', 'tick', 0.45); ev.c5_mesons = H('c5_4', 'mesons', 'pop', 0.5);
    ev.c5_s4 = S('c5_5');
    ev.c5_2025 = H('c5_5', 'twenty', 'flip', 0.45); ev.c5_lhcb = H('c5_5', 'lhcb', 'stamp', 0.55); ev.c5_baryons = H('c5_5', 'baryons', 'pop', 0.5); ev.c5_protons = H('c5_5', 'protons', 'pop', 0.45);
    ev.c5_lambda = H('c5_5', 'beauty', 'pop', 0.5); ev.c5_decayed = H('c5_5', 'decayed', 'crack', 0.45); ev.c5_25a = Wt('c5_5', 'two'); ev.c5_25 = H('c5_5', 'percent', 'ding', 0.6);
    ev.c5_s5 = S('c5_6');
    ev.c5_80k = H('c5_6', 'eighty', 'type', 0.5); ev.c5_sure = H('c5_6', 'sure', 'ding', 0.5); ev.c5_nature = H('c5_6', 'nature', 'stamp', 0.55); ev.c5_july = H('c5_6', 'july', 'flip', 0.45);
    ev.c5_s6 = S('c5_7');
    ev.c5_twist = H('c5_7', 'twist', 'boing', 0.5); ev.c5_predicts = H('c5_7', 'predicts', 'tick', 0.45); ev.c5_orders = H('c5_7', 'orders', 'drop', 0.55); ev.c5_small = H('c5_7', 'small', 'shrink', 0.5); ev.c5_here = H('c5_7', 'here', 'pop', 0.45);
    ev.c5_s7 = S('c5_8');
    ev.c5_real = H('c5_8', 'real', 'ding', 0.5); ev.c5_enough = H('c5_8', 'enough', 'thud', 0.45); ev.c5_missing = H('c5_8', 'missing', 'vanish', 0.5);

    // ===== c6 the hunt =====
    ev.c6_s1 = ev.c6_cardOut - 0.1;
    ev.c6_nu = H('c6_2', 'neutrino', 'whoosh', 0.5); ev.c6_ghost = H('c6_2', 'ghostly', 'shimmer', 0.4); ev.c6_maybe = H('c6_2', 'may', 'tick', 0.4); ev.c6_notyet = H('c6_2', 'hasnt', 'scratch', 0.45);
    ev.c6_s2 = S('c6_3');
    ev.c6_compare = H('c6_3', 'compare', 'pop', 0.5); ev.c6_twins = H('c6_3', 'twins', 'pop', 0.5); ev.c6_precise = H('c6_3', 'precisely', 'tick', 0.45); ev.c6_nw = H('c6_3', 'northwestern', 'pop', 0.5);
    ev.c6_s3 = S('c6_4');
    ev.c6_magnet = H('c6_4', 'magnetic', 'clank', 0.5); ev.c6_pos = H('c6_4', 'positron', 'pop', 0.5, 0.3); ev.c6_el = H('c6_4', 'electron', 'pop', 0.5, -0.3, 0); ev.c6_part = H('c6_4', 'part', 'type', 0.5); ev.c6_tril = H('c6_4', 'trillion', 'ding', 0.6);
    ev.c6_s4 = S('c6_5');
    ev.c6_mirror = H('c6_5', 'mirrors', 'shimmer', 0.45); ev.c6_match = H('c6_5', 'match', 'ding', 0.5); ev.c6_dont = H('c6_5', 'dont', 'scratch', 0.5); ev.c6_gab = H('c6_5', 'gerald', 'pop', 0.5); ev.c6_biggest = H('c6_5', 'biggest', 'stamp', 0.6); ev.c6_century = H('c6_5', 'century', 'chime', 0.5);
    ev.c6_s5 = S('c6_6');
    ev.c6_far = H('c6_6', 'far', 'tick', 0.4); ev.c6_m1 = H('c6_6', 'match', 'ding', 0.5); ev.c6_mass = H('c6_6', 'mass', 'tick', 0.45, -0.3); ev.c6_fall = H('c6_6', 'fall', 'drop', 0.45, 0.3); ev.c6_stranger = H('c6_6', 'stranger', 'boing', 0.45);

    // ===== c7 payoff + CTA =====
    ev.c7_s1 = L('c7_1').t - 1.0; hit(ev.c7_s1 + 0.05, 'wipe', 0.45);
    ev.c7_destroy = H('c7_1', 'destroy', 'thud', 0.5);
    ev.c7_s2 = S('c7_2');
    ev.c7_honest = H('c7_2', 'honest', 'tick', 0.4); ev.c7_dont = H('c7_2', 'dont', 'scratch', 0.45); ev.c7_close = H('c7_2', 'close', 'drop', 0.45); ev.c7_billion = H('c7_2', 'billion', 'flash', 0.5); ev.c7_one = H('c7_2', 'one', 'ding', 0.6);
    ev.c7_s3 = S('c7_3');
    ev.c7_you = H('c7_3', 'you', 'pop', 0.5); ev.c7_atom = H('c7_3', 'atom', 'shimmer', 0.45); ev.c7_biggest = H('c7_3', 'biggest', 'stamp', 0.55);
    ev.c7_s4 = S('c7_4');
    ev.c7_banana = H('c7_4', 'banana', 'pop', 0.5); ev.c7_flash = H('c7_4', 'flash', 'flash', 0.5); ev.c7_oldest = H('c7_4', 'oldest', 'swell', 0.4); ev.c7_winning = H('c7_4', 'winning', 'ding', 0.6);
    ev.c7_s5 = S('c7_5', 0.6); ev.sync_logo = hit(ev.c7_s5 + 0.5, 'chime', 0.6);
    ev.c7_like = H('c7_5', 'like', 'pop', 0.6, -0.3); ev.c7_sub = H('c7_5', 'subscribe', 'ding', 0.6, 0); ev.c7_ig = H('c7_5', 'instagram', 'pop', 0.55, -0.2); ev.c7_tt = H('c7_5', 'tiktok', 'pop', 0.55, 0.2);
    ev.c7_send = hit(L('c7_5').end + 0.4, 'fwip', 0.45);
  };
  if (typeof module !== 'undefined') module.exports = build; else globalThis.EVENTS = build;
})();
