// EVENTS — every named visual hit and its sound, per chapter. Called by score.js (Node + browser).
// hit(t, kind, gain, pan) registers a sound effect at t and returns t, so the picture uses the same number.
(function () {
  const build = ({ L, Wt, next, ev, hit, CH, U, DURATION }) => {
    const S = (id, d = 0.25) => L(id).t - d; // a shot that starts just before a line
    const H = (id, w, kind, g = 0.55, pan = 0, n = 0) => hit(Wt(id, w, n), kind, g, pan);
    // ===== c0 cold open =====
    ev.c0_s1 = 0; hit(0.15, 'swell', 0.4);
    ev.c0_ant = H('c0_1', 'antalya', 'pop', 0.55); ev.c0_sun = H('c0_1', 'sunday', 'tick', 0.45); ev.c0_long = H('c0_1', 'longest', 'pen', 0.45);
    ev.c0_two = H('c0_1', 'two', 'stamp', 0.6); ev.c0_dead = H('c0_1', 'deadline', 'tick', 0.45); ev.c0_200 = H('c0_1', 'nearly', 'type', 0.45); ev.c0_room = H('c0_1', 'room', 'pop', 0.45);
    ev.c0_s2 = S('c0_2');
    ev.c0_pres = H('c0_2', 'president', 'pop', 0.5); ev.c0_quote = H('c0_2', 'understand', 'pen', 0.45); ev.c0_noag = H('c0_2', 'no', 'thud', 0.5); ev.c0_main = H('c0_2', 'main', 'pop', 0.45); ev.c0_gone = H('c0_2', 'gone', 'scratch', 0.55);
    ev.c0_s3 = S('c0_3');
    ev.c0_strange = H('c0_3', 'strange', 'boing', 0.4); ev.c0_forty = H('c0_3', 'forty', 'rewind', 0.45); ev.c0_danger = H('c0_3', 'danger', 'alarm', 0.3); ev.c0_sky = H('c0_3', 'sky', 'whoosh', 0.4);
    ev.c0_agreed = H('c0_3', 'agreed', 'ding', 0.55); ev.c0_every = H('c0_3', 'every', 'type', 0.45); ev.c0_signed = H('c0_3', 'signed', 'stamp', 0.6);
    ev.c0_s4 = S('c0_4');
    ev.c0_spray = H('c0_4', 'spray', 'spray', 0.5, -0.4); ev.c0_fridge = H('c0_4', 'fridges', 'pop', 0.5, 0); ev.c0_ac = H('c0_4', 'air', 'pop', 0.5, 0.4); ev.c0_changed = H('c0_4', 'changed', 'flip', 0.5);
    ev.c0_hole = H('c0_4', 'hole', 'whoosh', 0.45); ev.c0_ant2 = H('c0_4', 'antarctica', 'pop', 0.5); ev.c0_closing = H('c0_4', 'closing', 'shimmer', 0.5);
    ev.c0_s5 = S('c0_5');
    ev.c0_ozzy = L('c0_5').t - 0.1; hit(ev.c0_ozzy, 'boing', 0.4);
    ev.c0_q1 = H('c0_5', 'ozone', 'pop', 0.6, -0.3); ev.c0_q2 = H('c0_5', 'climate', 'pop', 0.6, 0); ev.c0_q3 = H('c0_5', 'success', 'pop', 0.6, 0.3);
    ev.c0_s6 = S('c0_6', 0.35); ev.c0_one = H('c0_6', 'one', 'pop', 0.5, -0.3); ev.c0_other = H('c0_6', 'other', 'pop', 0.5, 0.3);
    ev.title0 = L('c0_6').end + 0.35;
    ev.titleWords = ['ONE', 'SKY.', 'TWO', 'PROBLEMS.'].map((w, i) => ({ w, t: hit(ev.title0 + 0.35 + i * 0.42, 'slam', i === 3 ? 1.0 : 0.6, -0.3 + i * 0.2) }));
    ev.sync_title = ev.titleWords[3].t;
    ev.titleSub = hit(ev.titleWords[3].t + 0.7, 'pen', 0.4);
    ev.titleBrand = hit(ev.titleWords[3].t + 1.6, 'chime', 0.6);
    ev.titleOzzy = hit(ev.titleBrand + 0.6, 'boing', 0.35);

    // chapter cards: wipe + number, hook line, card out
    for (const c of ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']) {
      ev[c + '_card'] = CH[c].t0; hit(CH[c].t0 + 0.05, 'wipe', 0.5); ev[c + '_stamp'] = hit(CH[c].t0 + 0.3, 'slam', 0.75);
      const h = L(c + '_1h'); ev[c + '_hook'] = h; hit(h.t - 0.05, 'fwip', 0.45);
      ev[c + '_cardOut'] = h.end + 0.5; hit(ev[c + '_cardOut'] - 0.35, 'wipe', 0.35);
    }
    ev.c1_vote = H('c1_1h', 'vote', 'thud', 0.45); ev.c1_notone = H('c1_1h', 'not', 'scratch', 0.45);
    ev.c2_three = H('c2_1h', 'three', 'pop', 0.45); ev.c2_believe = H('c2_1h', 'believe', 'boing', 0.4);
    ev.c3_nicer = H('c3_1h', 'nicer', 'scratch', 0.4); ev.c3_cheap = H('c3_1h', 'cheap', 'coin', 0.55);
    ev.c4_more = H('c4_1h', 'more', 'rise', 0.45); ev.c4_any = H('c4_1h', 'any', 'ding', 0.45);
    ev.c5_fridge = H('c5_1h', 'fridge', 'pop', 0.45); ev.c5_every = H('c5_1h', 'everything', 'swell', 0.45);
    ev.c6_slow = H('c6_1h', 'slow', 'winddown', 0.35); ev.c6_stuck = H('c6_1h', 'stuck', 'clank', 0.45);

    // ===== c1 one voice is enough =====
    ev.c1_s1 = ev.c1_cardOut - 0.1;
    ev.c1_198 = H('c1_2', 'one', 'type', 0.5); ev.c1_198b = Wt('c1_2', 'members', 0, true); hit(ev.c1_198b, 'ding', 0.55); ev.c1_197 = H('c1_2', 'countries', 'pop', 0.45); ev.c1_eu = H('c1_2', 'european', 'pop', 0.55);
    ev.c1_s2 = S('c1_3');
    ev.c1_1995 = H('c1_3', 'nineteen', 'flip', 0.5); ev.c1_berlin = H('c1_3', 'berlin', 'pop', 0.5); ev.c1_how = H('c1_3', 'vote', 'pen', 0.45);
    ev.c1_brk = H('c1_3', 'brackets', 'clank', 0.55); ev.c1_still = H('c1_3', 'still', 'tick', 0.45); ev.c1_today = H('c1_3', 'today', 'pen', 0.45);
    ev.c1_s3 = S('c1_4');
    ev.c1_cons = H('c1_4', 'consensus', 'stamp', 0.55); ev.c1_theory = H('c1_4', 'theory', 'tick', 0.4); ev.c1_onec = H('c1_4', 'one', 'pop', 0.55); ev.c1_stop = H('c1_4', 'stop', 'scratch', 0.55);
    ev.c1_s4 = S('c1_5');
    ev.c1_cop = H('c1_5', 'copenhagen', 'pop', 0.5); ev.c1_2009 = H('c1_5', 'two', 'flip', 0.45); ev.c1_hand = H('c1_5', 'handful', 'pop', 0.5); ev.c1_obj = H('c1_5', 'objected', 'thud', 0.5);
    ev.c1_note = H('c1_5', 'note', 'pen', 0.5); ev.c1_acc = H('c1_5', 'accord', 'tick', 0.45);
    ev.c1_s5 = S('c1_6');
    ev.c1_again = H('c1_6', 'again', 'tick', 0.45); ev.c1_sides = H('c1_6', 'sides', 'stretch', 0.45); ev.c1_eu2 = H('c1_6', 'european', 'pop', 0.5, -0.4); ev.c1_uk = H('c1_6', 'u', 'pop', 0.45, -0.4); ev.c1_isl = H('c1_6', 'island', 'pop', 0.45, -0.4);
    ev.c1_ff = H('c1_6', 'fossil', 'stamp', 0.55, -0.3); ev.c1_rep = H('c1_6', 'reports', 'tick', 0.4); ev.c1_saudi = H('c1_6', 'saudi', 'pop', 0.5, 0.4); ev.c1_russia = H('c1_6', 'russia', 'pop', 0.5, 0.4); ev.c1_phase = H('c1_6', 'phasing', 'stretch', 0.5, 0.3);
    ev.c1_s6 = S('c1_7');
    ev.c1_chief = H('c1_7', 'chief', 'pop', 0.5); ev.c1_q1 = H('c1_7', 'there', 'pen', 0.4); ev.c1_room = H('c1_7', 'room', 'tick', 0.4); ev.c1_q2 = H('c1_7', 'but', 'pen', 0.4); ev.c1_sci = H('c1_7', 'science', 'ding', 0.55);
    ev.c1_s7 = S('c1_8');
    ev.c1_hard = H('c1_8', 'hard', 'thud', 0.4); ev.c1_ozone = H('c1_8', 'ozone', 'pop', 0.5, -0.3); ev.c1_same = H('c1_8', 'same', 'tick', 0.45); ev.c1_dipl = H('c1_8', 'diplomats', 'pop', 0.45, 0.3); ev.c1_diff = H('c1_8', 'different', 'boing', 0.45);

    // ===== c2 the hole in the sky =====
    ev.c2_s1 = ev.c2_cardOut - 0.1;
    ev.c2_shield = H('c2_2', 'shield', 'shimmer', 0.45); ev.c2_km = H('c2_2', 'fifteen', 'pen', 0.45); ev.c2_layer = H('c2_2', 'layer', 'swell', 0.4); ev.c2_soaks = H('c2_2', 'soaks', 'zap', 0.4); ev.c2_uv = H('c2_2', 'ultraviolet', 'zap', 0.45);
    ev.c2_s2 = S('c2_3');
    ev.c2_1974 = H('c2_3', 'nineteen', 'flip', 0.5); ev.c2_molina = H('c2_3', 'mario', 'pop', 0.5, -0.3); ev.c2_rowland = H('c2_3', 'sherwood', 'pop', 0.5, 0.3); ev.c2_cfc = H('c2_3', 'cfcs', 'stamp', 0.55); ev.c2_drift = H('c2_3', 'drift', 'rise', 0.45); ev.c2_destroy = H('c2_3', 'destroy', 'crack', 0.45);
    ev.c2_s3 = S('c2_4');
    ev.c2_every = H('c2_4', 'everywhere', 'swell', 0.4); ev.c2_can = H('c2_4', 'spray', 'spray', 0.5, -0.4); ev.c2_fr = H('c2_4', 'fridges', 'pop', 0.5, -0.1); ev.c2_acx = H('c2_4', 'air', 'pop', 0.5, 0.2); ev.c2_foam = H('c2_4', 'foam', 'squish', 0.45, 0.4);
    ev.c2_cheap = H('c2_4', 'cheap', 'pop', 0.5); ev.c2_safe = H('c2_4', 'safe', 'pop', 0.5); ev.c2_never = H('c2_4', 'never', 'pop', 0.5); ev.c2_prob = H('c2_4', 'problem', 'scratch', 0.55);
    ev.c2_s4 = S('c2_5');
    ev.c2_up = H('c2_5', 'high', 'rise', 0.4); ev.c2_sunl = H('c2_5', 'sunlight', 'zap', 0.5); ev.c2_apart = H('c2_5', 'apart', 'crack', 0.55); ev.c2_cl = H('c2_5', 'chlorine', 'pop', 0.55);
    ev.c2_again1 = H('c2_5', 'again', 'crack', 0.45, -0.2, 0); ev.c2_again2 = H('c2_5', 'again', 'crack', 0.45, 0.2, 1); ev.c2_thou = H('c2_5', 'thousands', 'stamp', 0.6);
    ev.c2_s5 = S('c2_6');
    ev.c2_may = H('c2_6', 'may', 'flip', 0.45); ev.c2_farman = H('c2_6', 'joe', 'pop', 0.45, -0.3); ev.c2_gard = H('c2_6', 'brian', 'pop', 0.45, 0); ev.c2_shank = H('c2_6', 'jonathan', 'pop', 0.45, 0.3); ev.c2_bas = H('c2_6', 'british', 'tick', 0.4);
    ev.c2_pub = H('c2_6', 'published', 'pen', 0.45); ev.c2_oct = H('c2_6', 'october', 'flip', 0.45); ev.c2_halley = H('c2_6', 'halley', 'pop', 0.45); ev.c2_drop = H('c2_6', 'dropping', 'drop', 0.5); ev.c2_third = H('c2_6', 'third', 'stamp', 0.6);
    ev.c2_s6 = S('c2_7');
    ev.c2_hole = H('c2_7', 'hole', 'whoosh', 0.5); ev.c2_antarc = H('c2_7', 'antarctica', 'pop', 0.5); ev.c2_next = H('c2_7', 'next', 'tick', 0.4); ev.c2_25 = H('c2_7', 'two', 'flip', 0.5); ev.c2_deal = H('c2_7', 'deal', 'stamp', 0.6);

    // ===== c3 how the world said yes =====
    ev.c3_s1 = ev.c3_cardOut - 0.1;
    ev.c3_date = H('c3_2', 'sixteenth', 'flip', 0.5); ev.c3_mp = H('c3_2', 'montreal', 'stamp', 0.6); ev.c3_plan = H('c3_2', 'plan', 'pen', 0.45); ev.c3_step = H('c3_2', 'step', 'tick', 0.45, 0, 0); ev.c3_step2 = H('c3_2', 'step', 'tick', 0.45, 0, 1);
    ev.c3_s2 = S('c3_3');
    ev.c3_r1 = H('c3_3', 'first', 'pop', 0.5); ev.c3_few = H('c3_3', 'few', 'pop', 0.45); ev.c3_five = H('c3_3', 'five', 'stamp', 0.55); ev.c3_1988 = H('c3_3', 'nineteen', 'flip', 0.45); ev.c3_dupont = H('c3_3', 'dupont', 'pop', 0.55); ev.c3_stop = H('c3_3', 'stop', 'ding', 0.55);
    ev.c3_s3 = S('c3_4');
    ev.c3_r2 = H('c3_4', 'second', 'pop', 0.5); ev.c3_repl = H('c3_4', 'replacements', 'flip', 0.45); ev.c3_fridge = H('c3_4', 'fridge', 'pop', 0.45, -0.3); ev.c3_deo = H('c3_4', 'deodorant', 'spray', 0.45, 0.3); ev.c3_barely = H('c3_4', 'barely', 'ding', 0.5);
    ev.c3_s4 = S('c3_5');
    ev.c3_r3 = H('c3_5', 'third', 'pop', 0.5); ev.c3_money = H('c3_5', 'money', 'coin', 0.55); ev.c3_fund = H('c3_5', 'fund', 'pop', 0.45); ev.c3_dev = H('c3_5', 'developing', 'tick', 0.4); ev.c3_5bn = Wt('c3_5', 'five'); ev.c3_5bnE = H('c3_5', 'dollars', 'coin', 0.55); ev.c3_144 = H('c3_5', 'forty', 'ding', 0.5);
    ev.c3_s5 = S('c3_6');
    ev.c3_tight = H('c3_6', 'tightened', 'clank', 0.5); ev.c3_scary = H('c3_6', 'scarier', 'alarm', 0.25); ev.c3_was = H('c3_6', 'was', 'clank', 0.45); ev.c3_ag1 = H('c3_6', 'again', 'clank', 0.45, 0, 0); ev.c3_ag2 = H('c3_6', 'again', 'clank', 0.45, 0, 1);
    ev.c3_s6 = S('c3_7');
    ev.c3_2009 = H('c3_7', 'two', 'flip', 0.5); ev.c3_last = H('c3_7', 'last', 'pop', 0.5); ev.c3_everyc = H('c3_7', 'every', 'type', 0.5); ev.c3_earth = H('c3_7', 'earth', 'ding', 0.55); ev.c3_first = H('c3_7', 'first', 'stamp', 0.6);
    ev.c3_s7 = S('c3_8');
    ev.c3_99a = Wt('c3_8', 'ninety'); ev.c3_99 = H('c3_8', 'percent', 'ding', 0.6); ev.c3_gone = H('c3_8', 'gone', 'vanish', 0.5); ev.c3_twist = H('c3_8', 'twist', 'boing', 0.5);

    // ===== c4 the accidental climate treaty =====
    ev.c4_s1 = ev.c4_cardOut - 0.1;
    ev.c4_myth = H('c4_2', 'myth', 'stamp', 0.6); ev.c4_heat = H('c4_2', 'heating', 'sizzle', 0.4); ev.c4_isnt = H('c4_2', 'isnt', 'scratch', 0.6); ev.c4_two = H('c4_2', 'two', 'pop', 0.5);
    ev.c4_s2 = S('c4_3');
    ev.c4_share = H('c4_3', 'share', 'swell', 0.4); ev.c4_cfc = H('c4_3', 'cfcs', 'pop', 0.5); ev.c4_eat = H('c4_3', 'eat', 'crack', 0.4); ev.c4_ghg = H('c4_3', 'greenhouse', 'sizzle', 0.4); ev.c4_thou = H('c4_3', 'thousands', 'stamp', 0.6); ev.c4_co2 = H('c4_3', 'carbon', 'pop', 0.45);
    ev.c4_s3 = S('c4_4');
    ev.c4_2021 = H('c4_4', 'twenty', 'flip', 0.45); ev.c4_without = H('c4_4', 'without', 'rewind', 0.4); ev.c4_end = H('c4_4', 'century', 'tick', 0.4); ev.c4_25a = Wt('c4_4', 'two', 0); ev.c4_25 = H('c4_4', 'degrees', 'rise', 0.55); ev.c4_top = H('c4_4', 'top', 'stamp', 0.55);
    ev.c4_s4 = S('c4_5');
    ev.c4_gases = H('c4_5', 'gases', 'sizzle', 0.45, -0.3); ev.c4_plants = H('c4_5', 'plants', 'pop', 0.5, 0.3); ev.c4_burn = H('c4_5', 'burned', 'zap', 0.45, 0.3); ev.c4_less = H('c4_5', 'less', 'drop', 0.5, 0.3);
    ev.c4_s5 = S('c4_6');
    ev.c4_kig = H('c4_6', 'kigali', 'stamp', 0.6); ev.c4_grew = H('c4_6', 'grew', 'rise', 0.4); ev.c4_hfc = H('c4_6', 'hfcs', 'pop', 0.55); ev.c4_repl = H('c4_6', 'replaced', 'flip', 0.4); ev.c4_half = H('c4_6', 'half', 'ding', 0.55);
    ev.c4_s6 = S('c4_7');
    ev.c4_heal = H('c4_7', 'healing', 'shimmer', 0.5); ev.c4_most = H('c4_7', 'most', 'pop', 0.45); ev.c4_2040 = H('c4_7', 'forty', 'ding', 0.5); ev.c4_antar = H('c4_7', 'antarctica', 'pop', 0.45); ev.c4_2066 = H('c4_7', 'sixtysix', 'ding', 0.55);
    ev.c4_s7 = S('c4_8');
    ev.c4_can = H('c4_8', 'can', 'pop', 0.45); ev.c4_co2b = H('c4_8', 'carbon', 'boing', 0.45);

    // ===== c5 why carbon is different =====
    ev.c5_s1 = ev.c5_cardOut - 0.1;
    ev.c5_coal = H('c5_2', 'coal', 'pop', 0.5, -0.3); ev.c5_oil = H('c5_2', 'oil', 'pop', 0.5, 0); ev.c5_gas = H('c5_2', 'gas', 'pop', 0.5, 0.3); ev.c5_86a = Wt('c5_2', 'eightysix'); ev.c5_86 = H('c5_2', 'percent', 'ding', 0.6);
    ev.c5_cars = H('c5_2', 'cars', 'pop', 0.45, -0.4); ev.c5_planes = H('c5_2', 'planes', 'jet', 0.4, -0.2); ev.c5_fact = H('c5_2', 'factories', 'pop', 0.45, 0); ev.c5_steel = H('c5_2', 'steel', 'clank', 0.4, 0.2); ev.c5_cem = H('c5_2', 'cement', 'thud', 0.4, 0.3); ev.c5_lights = H('c5_2', 'lights', 'switch', 0.4, 0.4);
    ev.c5_s2 = S('c5_3');
    ev.c5_2025 = H('c5_3', 'twenty', 'flip', 0.45); ev.c5_rec = H('c5_3', 'record', 'stamp', 0.55); ev.c5_38a = Wt('c5_3', 'thirtyeight'); ev.c5_38 = H('c5_3', 'tonnes', 'ding', 0.6); ev.c5_notfew = H('c5_3', 'not', 'scratch', 0.4); ev.c5_bil = H('c5_3', 'billions', 'swell', 0.45);
    ev.c5_s3 = S('c5_4');
    ev.c5_trap = H('c5_4', 'trap', 'clank', 0.45); ev.c5_1968 = H('c5_4', 'nineteen', 'flip', 0.45); ev.c5_tragedy = H('c5_4', 'tragedy', 'stamp', 0.55); ev.c5_field = H('c5_4', 'field', 'pop', 0.45);
    ev.c5_cow = H('c5_4', 'cow', 'pop', 0.5); ev.c5_damage = H('c5_4', 'damage', 'drop', 0.45); ev.c5_sky = H('c5_4', 'sky', 'whoosh', 0.5);
    ev.c5_s4 = S('c5_5');
    ev.c5_strict = H('c5_5', 'strict', 'pop', 0.45); ev.c5_kyoto = H('c5_5', 'kyoto', 'stamp', 0.6); ev.c5_binding = H('c5_5', 'binding', 'clank', 0.45); ev.c5_us = H('c5_5', 'united', 'pop', 0.45); ev.c5_signed = H('c5_5', 'signed', 'pen', 0.5); ev.c5_never = H('c5_5', 'never', 'scratch', 0.5); ev.c5_canada = H('c5_5', 'canada', 'pop', 0.45); ev.c5_out = H('c5_5', 'walked', 'whoosh', 0.45);
    ev.c5_s5 = S('c5_6');
    ev.c5_paris = H('c5_6', 'paris', 'stamp', 0.6); ev.c5_opp = H('c5_6', 'opposite', 'flip', 0.45); ev.c5_own = H('c5_6', 'own', 'pen', 0.45); ev.c5_join = H('c5_6', 'joined', 'type', 0.45); ev.c5_two = H('c5_6', 'two', 'tick', 0.45); ev.c5_15 = H('c5_6', 'five', 'ding', 0.5);
    ev.c5_s6 = S('c5_7');
    ev.c5_add = H('c5_7', 'add', 'pop', 0.45); ev.c5_unep = H('c5_7', 'report', 'flip', 0.45); ev.c5_28a = Wt('c5_7', 'two'); ev.c5_28 = H('c5_7', 'degrees', 'rise', 0.55); ev.c5_2100 = H('c5_7', 'hundred', 'stamp', 0.55);
    ev.c5_s7 = S('c5_8');
    ev.c5_hope = H('c5_8', 'hopeless', 'drop', 0.4); ev.c5_quite = H('c5_8', 'quite', 'boing', 0.45); ev.c5_lesson = H('c5_8', 'lesson', 'ding', 0.5);

    // ===== c6 slow, but not stuck =====
    ev.c6_s1 = ev.c6_cardOut - 0.1;
    ev.c6_dubai = H('c6_2', 'dubai', 'pop', 0.5); ev.c6_first = H('c6_2', 'first', 'stamp', 0.55); ev.c6_agreed = H('c6_2', 'agreed', 'ding', 0.5); ev.c6_avoid = H('c6_2', 'avoided', 'tick', 0.4); ev.c6_words = H('c6_2', 'transitioning', 'pen', 0.55);
    ev.c6_s2 = S('c6_3');
    ev.c6_same = H('c6_3', 'same', 'tick', 0.4); ev.c6_cons = H('c6_3', 'consensus', 'pop', 0.5); ev.c6_seas = H('c6_3', 'seas', 'splash', 0.5); ev.c6_force = H('c6_3', 'force', 'stamp', 0.55);
    ev.c6_s3 = S('c6_4');
    ev.c6_myth = H('c6_4', 'myth', 'stamp', 0.55); ev.c6_2024 = H('c6_4', 'twenty', 'flip', 0.45); ev.c6_15 = H('c6_4', 'above', 'rise', 0.5); ev.c6_doesnt = H('c6_4', 'doesnt', 'scratch', 0.5); ev.c6_20y = H('c6_4', 'averages', 'pen', 0.5); ev.c6_13 = H('c6_4', 'three', 'ding', 0.55);
    ev.c6_s4 = S('c6_5');
    ev.c6_ready = H('c6_5', 'ready', 'pop', 0.5); ev.c6_cheap = H('c6_5', 'cheap', 'coin', 0.5); ev.c6_harder = H('c6_5', 'harder', 'thud', 0.45); ev.c6_easier = H('c6_5', 'easier', 'ding', 0.55);
    ev.c6_s5 = S('c6_6');
    ev.c6_addis = H('c6_6', 'addis', 'pop', 0.55); ev.c6_nov = H('c6_6', 'november', 'flip', 0.45); ev.c6_rules = H('c6_6', 'rules', 'tick', 0.45); ev.c6_voices = H('c6_6', 'voices', 'type', 0.45);

    // ===== c7 payoff + CTA =====
    ev.c7_s1 = L('c7_1').t - 1.0; hit(ev.c7_s1 + 0.05, 'wipe', 0.45);
    ev.c7_one = H('c7_1', 'one', 'pop', 0.5, -0.3); ev.c7_other = H('c7_1', 'other', 'pop', 0.5, 0.3);
    ev.c7_s2 = S('c7_2');
    ev.c7_few = H('c7_2', 'few', 'pop', 0.5, -0.4); ev.c7_chem = H('c7_2', 'chemical', 'tick', 0.45, -0.4); ev.c7_money = H('c7_2', 'money', 'coin', 0.45, -0.4); ev.c7_every = H('c7_2', 'every', 'swell', 0.45, 0.4); ev.c7_energy = H('c7_2', 'energy', 'switch', 0.5, 0.4);
    ev.c7_s3 = S('c7_3');
    ev.c7_r = H('c7_3', 'rules', 'stamp', 0.5); ev.c7_p = H('c7_3', 'people', 'stamp', 0.5); ev.c7_price = H('c7_3', 'price', 'coin', 0.55); ev.c7_yes = H('c7_3', 'yes', 'ding', 0.6);
    ev.c7_s4 = S('c7_4');
    ev.c7_antalya = H('c7_4', 'antalya', 'pop', 0.45); ev.c7_without = H('c7_4', 'without', 'thud', 0.4); ev.c7_above = H('c7_4', 'above', 'rise', 0.45); ev.c7_1987 = H('c7_4', 'nineteen', 'flip', 0.45); ev.c7_closing = H('c7_4', 'closing', 'shimmer', 0.55);
    ev.c7_proof = H('c7_4', 'proof', 'stamp', 0.55); ev.c7_before = H('c7_4', 'before', 'ding', 0.6);
    ev.c7_s5 = S('c7_5', 0.6); ev.sync_logo = hit(ev.c7_s5 + 0.5, 'chime', 0.6);
    ev.c7_like = H('c7_5', 'like', 'pop', 0.6, -0.3); ev.c7_sub = H('c7_5', 'subscribe', 'ding', 0.6, 0); ev.c7_ig = H('c7_5', 'instagram', 'pop', 0.55, -0.2); ev.c7_tt = H('c7_5', 'tiktok', 'pop', 0.55, 0.2);
    ev.c7_send = hit(L('c7_5').end + 0.4, 'fwip', 0.45);
  };
  if (typeof module !== 'undefined') module.exports = build; else globalThis.EVENTS = build;
})();
