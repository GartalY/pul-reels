// EVENTS — every named visual hit and its sound, per chapter. Called by score.js (Node + browser).
// hit(t, kind, gain, pan) registers a sound effect at t and returns t, so the picture uses the same number.
(function () {
  const build = ({ L, Wt, next, ev, hit, CH, U, DURATION }) => {
    const S = (id, d = 0.25) => L(id).t - d; // a shot that starts just before a line
    const H = (id, w, kind, g = 0.55, pan = 0, n = 0) => hit(Wt(id, w, n), kind, g, pan);
    // ===== c0 cold open =====
    ev.c0_s1 = 0;
    ev.c0_in = hit(0.15, 'swell', 0.4);
    ev.c0_date = H('c0_1', 'november', 'flip', 0.5);
    ev.c0_mach = H('c0_1', 'machine', 'whoosh', 0.45);
    ev.c0_car = H('c0_1', 'car', 'pop', 0.55, 0.3);
    ev.c0_line = H('c0_1', 'line', 'zip', 0.45);
    ev.c0_ever = H('c0_1', 'ever', 'stamp', 0.6);
    ev.c0_s2 = S('c0_2');
    ev.c0_ld = H('c0_2', 'lightday', 'ding', 0.6);
    ev.c0_hello = H('c0_2', 'hello', 'blip', 0.6, -0.4);
    ev.c0_fly = H('c0_2', 'flying', 'whoosh', 0.45);
    ev.c0_day = H('c0_2', 'whole', 'tick', 0.5);
    ev.c0_arrive = H('c0_2', 'there', 'beep', 0.55, 0.4);
    ev.c0_answer = H('c0_2', 'answer', 'blip', 0.55, 0.4);
    ev.c0_back = H('c0_2', 'back', 'beep', 0.55, -0.4);
    ev.c0_s3 = S('c0_3');
    ev.c0_v1 = H('c0_3', 'voyager', 'shimmer', 0.5);
    ev.c0_1977 = H('c0_3', 'nineteen', 'flip', 0.5);
    ev.c0_radio = H('c0_3', 'radio', 'pop', 0.5, -0.3);
    ev.c0_fridge = H('c0_3', 'fridge', 'click', 0.6, -0.3);
    ev.c0_comp = H('c0_3', 'computers', 'pop', 0.5, 0.3);
    ev.c0_photo = H('c0_3', 'photo', 'beep', 0.5, 0.3);
    ev.c0_s4 = S('c0_4');
    ev.c0_still = H('c0_4', 'still', 'blip', 0.5);
    ev.c0_dish = H('c0_4', 'giant', 'rise', 0.45);
    ev.c0_whisper = H('c0_4', 'whisper', 'shimmer', 0.5);
    ev.c0_s5 = S('c0_5');
    ev.c0_q1 = H('c0_5', 'whisper', 'pop', 0.6, -0.3); ev.c0_q2 = H('c0_5', 'keeps', 'pop', 0.6, 0); ev.c0_q3 = H('c0_5', 'carries', 'pop', 0.6, 0.3);
    ev.c0_s6 = S('c0_6', 0.35);
    ev.c0_q = H('c0_6', 'still', 'swell', 0.4);
    ev.title0 = L('c0_6').end + 0.35;
    ev.titleWords = ['HOW', 'DO', 'WE', 'STILL', 'HEAR', 'VOYAGER', '1?'].map((w, i) => ({ w, t: hit(ev.title0 + 0.3 + i * 0.3, 'slam', i === 6 ? 1.0 : 0.55, -0.4 + i * 0.13) }));
    ev.sync_title = ev.titleWords[6].t;
    ev.titleBrand = hit(ev.titleWords[6].t + 1.0, 'chime', 0.6);
    ev.titleEcho = hit(ev.titleBrand + 0.6, 'boing', 0.35);

    // chapter cards: wipe + number, hook line, card out
    for (const c of ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']) {
      ev[c + '_card'] = CH[c].t0; hit(CH[c].t0 + 0.05, 'wipe', 0.5); ev[c + '_stamp'] = hit(CH[c].t0 + 0.3, 'slam', 0.75);
      const h = L(c + '_1h'); ev[c + '_hook'] = h; hit(h.t - 0.05, 'fwip', 0.45);
      ev[c + '_cardOut'] = h.end + 0.5; hit(ev[c + '_cardOut'] - 0.35, 'wipe', 0.35);
    }
    ev.c1_ldword = H('c1_1h', 'distance', 'ding', 0.45); ev.c1_ridic = H('c1_1h', 'ridiculous', 'boing', 0.4);
    ev.c2_isnt = H('c2_1h', 'isnt', 'scratch', 0.5);
    ev.c3_bulb = H('c3_1h', 'bulb', 'click', 0.55);
    ev.c4_star = H('c4_1h', 'star', 'shimmer', 0.45);
    ev.c5_two = H('c5_1h', 'two', 'tick', 0.5);
    ev.c6_leave = H('c6_1h', 'leave', 'whoosh', 0.45);

    // ===== c1 what is a light-day =====
    ev.c1_s1 = ev.c1_cardOut - 0.1;
    ev.c1_fast = H('c1_2', 'fastest', 'zap', 0.5);
    ev.c1_300a = Wt('c1_2', 'almost'); ev.c1_300 = H('c1_2', 'second', 'ding', 0.6);
    ev.c1_s2 = S('c1_3');
    ev.c1_moon = H('c1_3', 'moon', 'zap', 0.5, -0.2); ev.c1_moonT = H('c1_3', 'quarter', 'ding', 0.55, -0.2);
    ev.c1_sun = H('c1_3', 'sun', 'zap', 0.5, 0.2); ev.c1_sunT = H('c1_3', 'twenty', 'ding', 0.55, 0.2);
    ev.c1_s3 = S('c1_4');
    ev.c1_day = H('c1_4', 'full', 'rise', 0.45);
    ev.c1_24 = H('c1_4', 'twentyfour', 'tick', 0.55);
    ev.c1_259a = Wt('c1_4', 'twentyfive'); ev.c1_259 = H('c1_4', 'kilometres', 'stamp', 0.6);
    ev.c1_s4 = S('c1_5');
    ev.c1_au = H('c1_5', 'distance', 'pop', 0.5); ev.c1_173a = Wt('c1_5', 'hundred'); ev.c1_173 = H('c1_5', 'times', 'ding', 0.6);
    ev.c1_sun2 = H('c1_5', 'sun', 'pop', 0.45);
    ev.c1_s5 = S('c1_6');
    ev.c1_rocket = H('c1_6', 'rocket', 'thud', 0.5, -0.3); ev.c1_probe = H('c1_6', 'probe', 'thud', 0.5, 0);
    ev.c1_now = H('c1_6', 'now', 'shimmer', 0.6, 0.3);
    ev.c1_s6 = S('c1_7');
    ev.c1_49 = H('c1_7', 'fortynine', 'ding', 0.6); ev.c1_q = H('c1_7', 'how', 'blip', 0.5);

    // ===== c2 the cosmic slingshot =====
    ev.c2_s1 = ev.c2_cardOut - 0.1;
    ev.c2_line = H('c2_2', 'lined', 'chime', 0.55); ev.c2_175a = Wt('c2_2', 'once'); ev.c2_175 = H('c2_2', 'years', 'ding', 0.6);
    ev.c2_s2 = S('c2_3');
    ev.c2_v2 = H('c2_3', 'two', 'boom', 0.5, -0.3); ev.c2_aug = H('c2_3', 'august', 'flip', 0.45, -0.3);
    ev.c2_v1 = H('c2_3', 'one', 'boom', 0.55, 0.3); ev.c2_sep = H('c2_3', 'september', 'flip', 0.45, 0.3);
    ev.c2_faster = H('c2_3', 'faster', 'whoosh', 0.45); ev.c2_jup = H('c2_3', 'jupiter', 'pop', 0.5); ev.c2_num = H('c2_3', 'number', 'stamp', 0.6);
    ev.c2_s3 = S('c2_4');
    ev.c2_trick = H('c2_4', 'trick', 'blip', 0.45); ev.c2_j79 = H('c2_4', 'jupiter', 'whoosh', 0.55, -0.2);
    ev.c2_s80 = H('c2_4', 'saturn', 'whoosh', 0.55, 0.2); ev.c2_borrow = H('c2_4', 'borrowed', 'shimmer', 0.4); ev.c2_flung = H('c2_4', 'flung', 'zap', 0.55, 0.3);
    ev.c2_s4 = S('c2_5');
    ev.c2_61a = Wt('c2_5', 'sixtyone'); ev.c2_61 = H('c2_5', 'hour', 'ding', 0.6);
    ev.c2_rec = H('c2_5', 'record', 'scratch', 0.55); ev.c2_parker = H('c2_5', 'parker', 'whoosh', 0.5); ev.c2_10x = H('c2_5', 'ten', 'stamp', 0.6);
    ev.c2_s5 = S('c2_6');
    ev.c2_secret = H('c2_6', 'secret', 'blip', 0.45); ev.c2_time = H('c2_6', 'time', 'tick', 0.6); ev.c2_never = H('c2_6', 'never', 'stamp', 0.55);
    ev.c2_s6 = S('c2_7');
    ev.c2_twin = H('c2_7', 'twin', 'pop', 0.5, -0.3); ev.c2_behind = H('c2_7', 'behind', 'drop', 0.45, -0.3); ev.c2_far = H('c2_7', 'farthest', 'ding', 0.6, 0.3); ev.c2_voice = H('c2_7', 'voice', 'blip', 0.5);

    // ===== c3 a whisper across a light-day =====
    ev.c3_s1 = ev.c3_cardOut - 0.1;
    ev.c3_dish = H('c3_2', 'dish', 'pop', 0.5); ev.c3_37 = H('c3_2', 'metres', 'ding', 0.55); ev.c3_see = H('c3_2', 'see', 'blip', 0.45);
    ev.c3_s2 = S('c3_3');
    ev.c3_spread = H('c3_3', 'spreads', 'swell', 0.4); ev.c3_nasa = H('c3_3', 'nasa', 'type', 0.5); ev.c3_watt = H('c3_3', 'watt', 'ding', 0.55); ev.c3_weaker = H('c3_3', 'weaker', 'drop', 0.5);
    ev.c3_s3 = S('c3_4');
    ev.c3_ears = H('c3_4', 'ears', 'rise', 0.45); ev.c3_70 = H('c3_4', 'seventy', 'stamp', 0.55);
    ev.c3_cal = H('c3_4', 'california', 'pop', 0.55, -0.4); ev.c3_spa = H('c3_4', 'spain', 'pop', 0.55, 0); ev.c3_aus = H('c3_4', 'australia', 'pop', 0.55, 0.4);
    ev.c3_s4 = S('c3_5');
    ev.c3_third = H('c3_5', 'third', 'tick', 0.5); ev.c3_turns = H('c3_5', 'turns', 'whoosh', 0.4); ev.c3_face = H('c3_5', 'face', 'ding', 0.5);
    ev.c3_s5 = S('c3_6');
    ev.c3_slow = H('c3_6', 'slowly', 'blip', 0.45); ev.c3_160 = H('c3_6', 'second', 'ding', 0.55); ev.c3_photo = H('c3_6', 'photo', 'pop', 0.5); ev.c3_2d = H('c3_6', 'two', 'stamp', 0.55);
    ev.c3_s6 = S('c3_7');
    ev.c3_talk = H('c3_7', 'talking', 'blip', 0.45); ev.c3_cmd = H('c3_7', 'command', 'laser', 0.5); ev.c3_canb = H('c3_7', 'canberra', 'ding', 0.55);
    ev.c3_s7 = S('c3_8');
    ev.c3_power = H('c3_8', 'power', 'pop', 0.5); ev.c3_49 = H('c3_8', 'fortynine', 'tick', 0.5); ev.c3_alive = H('c3_8', 'alive', 'heart', 0.6);

    // ===== c4 a slowly fading heart =====
    ev.c4_s1 = ev.c4_cardOut - 0.1;
    ev.c4_heat = H('c4_2', 'heat', 'sizzle', 0.4); ev.c4_three = H('c4_2', 'three', 'pop', 0.5); ev.c4_plu = H('c4_2', 'plutonium', 'shimmer', 0.45); ev.c4_elec = H('c4_2', 'electricity', 'zap', 0.55);
    ev.c4_s2 = S('c4_3');
    ev.c4_launch = H('c4_3', 'launch', 'flip', 0.45); ev.c4_470a = Wt('c4_3', 'four'); ev.c4_470 = H('c4_3', 'watts', 'ding', 0.55); ev.c4_lost = H('c4_3', 'lost', 'drop', 0.5);
    ev.c4_s3 = S('c4_4');
    ev.c4_half = H('c4_4', 'half', 'stamp', 0.55); ev.c4_house = H('c4_4', 'house', 'pop', 0.45); ev.c4_bulbs = H('c4_4', 'bulbs', 'click', 0.55); ev.c4_less = H('c4_4', 'losing', 'drop', 0.45);
    ev.c4_s4 = S('c4_5');
    ev.c4_ration = H('c4_5', 'rations', 'tick', 0.5); ev.c4_heaters = H('c4_5', 'heaters', 'switch', 0.5); ev.c4_cold = H('c4_5', 'colder', 'ice', 0.55);
    ev.c4_s5 = S('c4_6');
    ev.c4_10 = H('c4_6', 'ten', 'chime', 0.5); ev.c4_off = H('c4_6', 'one', 'click', 0.45); ev.c4_apr = H('c4_6', 'april', 'flip', 0.45); ev.c4_dark = H('c4_6', 'dark', 'switch', 0.55);
    ev.c4_s6 = S('c4_7');
    ev.c4_two = H('c4_7', 'two', 'ding', 0.55); ev.c4_mag = H('c4_7', 'magnetic', 'pop', 0.5, -0.3); ev.c4_waves = H('c4_7', 'waves', 'pop', 0.5, 0.3);
    ev.c4_s7 = S('c4_8');
    ev.c4_2030 = H('c4_8', 'twentythirties', 'ding', 0.5); ev.c4_breaks = H('c4_8', 'breaks', 'crack', 0.55); ev.c4_mech = H('c4_8', 'mechanic', 'clank', 0.5);

    // ===== c5 repairs from a light-day away =====
    ev.c5_s1 = ev.c5_cardOut - 0.1;
    ev.c5_nov = H('c5_2', 'november', 'flip', 0.45); ev.c5_non = H('c5_2', 'nonsense', 'buzz', 0.35); ev.c5_gib = H('c5_2', 'gibberish', 'type', 0.5); ev.c5_months = H('c5_2', 'months', 'tick', 0.45);
    ev.c5_s2 = S('c5_3');
    ev.c5_chip = H('c5_3', 'chip', 'crack', 0.55); ev.c5_3pc = H('c5_3', 'three', 'ding', 0.55);
    ev.c5_s3 = S('c5_4');
    ev.c5_spare = H('c5_4', 'spare', 'scratch', 0.45); ev.c5_apr = H('c5_4', 'april', 'flip', 0.45); ev.c5_split = H('c5_4', 'split', 'chop', 0.55); ev.c5_moved = H('c5_4', 'moved', 'whoosh', 0.5);
    ev.c5_2days = H('c5_4', 'two', 'tick', 0.5); ev.c5_worked = H('c5_4', 'worked', 'stamp', 0.65);
    ev.c5_s4 = S('c5_5');
    ev.c5_clog = H('c5_5', 'clogging', 'squish', 0.5); ev.c5_quarter = H('c5_5', 'quarter', 'pop', 0.45); ev.c5_035 = H('c5_5', 'thirtyfive', 'shrink', 0.55); ev.c5_switch = H('c5_5', 'switched', 'switch', 0.55);
    ev.c5_s5 = S('c5_6');
    ev.c5_2025 = H('c5_6', 'twenty', 'flip', 0.45); ev.c5_dead = H('c5_6', 'dead', 'thud', 0.5); ev.c5_21 = H('c5_6', 'twentyone', 'ding', 0.55); ev.c5_fired = H('c5_6', 'fired', 'jet', 0.6);
    ev.c5_s6 = S('c5_7');
    ev.c5_gamble = H('c5_7', 'gamble', 'blip', 0.45); ev.c5_dark = H('c5_7', 'dark', 'whoosh', 0.45); ev.c5_wait = H('c5_7', 'wait', 'tick', 0.5); ev.c5_quote = H('c5_7', 'expect', 'stamp', 0.55);
    ev.c5_s7 = S('c5_8');
    ev.c5_why = H('c5_8', 'why', 'blip', 0.45); ev.c5_shown = H('c5_8', 'shown', 'shimmer', 0.5);

    // ===== c6 leaving the bubble =====
    ev.c6_s1 = ev.c6_cardOut - 0.1;
    ev.c6_wind = H('c6_2', 'wind', 'wind', 0.4); ev.c6_aug = H('c6_2', 'august', 'flip', 0.45); ev.c6_122a = Wt('c6_2', 'hundred'); ev.c6_122 = H('c6_2', 'earth', 'ding', 0.55);
    ev.c6_edge = H('c6_2', 'edge', 'crack', 0.45); ev.c6_inter = H('c6_2', 'interstellar', 'shimmer', 0.6);
    ev.c6_s2 = S('c6_3');
    ev.c6_myth = H('c6_3', 'myth', 'stamp', 0.55); ev.c6_quite = H('c6_3', 'quite', 'scratch', 0.5); ev.c6_cloud = H('c6_3', 'cloud', 'swell', 0.45);
    ev.c6_s3 = S('c6_4');
    ev.c6_300 = H('c6_4', 'years', 'ding', 0.55); ev.c6_30k = H('c6_4', 'thirty', 'ding', 0.55, 0.3);
    ev.c6_s4 = S('c6_5');
    ev.c6_1990 = H('c6_5', 'nineteen', 'flip', 0.45); ev.c6_turn = H('c6_5', 'turned', 'whoosh', 0.45); ev.c6_look = H('c6_5', 'look', 'click', 0.6);
    ev.c6_s5 = S('c6_6', 0.35);
    ev.c6_6b = H('c6_6', 'six', 'pop', 0.45); ev.c6_speck = H('c6_6', 'speck', 'blip', 0.5); ev.c6_pixel = H('c6_6', 'pixel', 'ding', 0.5); ev.c6_pbd = H('c6_6', 'pale', 'shimmer', 0.5);
    ev.c6_s6 = S('c6_7');
    ev.c6_rec = H('c6_7', 'golden', 'shimmer', 0.55); ev.c6_115 = H('c6_7', 'pictures', 'pop', 0.55, -0.3); ev.c6_55 = H('c6_7', 'languages', 'pop', 0.55, 0); ev.c6_90 = H('c6_7', 'music', 'chime', 0.55, 0.3);
    ev.c6_s7 = S('c6_8');
    ev.c6_40k = H('c6_8', 'forty', 'ding', 0.5); ev.c6_star = H('c6_8', 'star', 'shimmer', 0.5); ev.c6_silent = H('c6_8', 'silent', 'drop', 0.35);

    // ===== c7 payoff + end card =====
    ev.c7_s1 = S('c7_1', 0.6); ev.c7_q = Wt('c7_1', 'how');
    ev.c7_s2 = S('c7_2');
    ev.c7_ears = H('c7_2', 'ears', 'pop', 0.6, -0.3); ev.c7_ration = H('c7_2', 'ration', 'pop', 0.6, 0); ev.c7_people = H('c7_2', 'people', 'pop', 0.6, 0.3); ev.c7_touch = H('c7_2', 'touch', 'chime', 0.45);
    ev.c7_s3 = S('c7_3');
    ev.c7_low = H('c7_3', 'low', 'drop', 0.4); ev.c7_stop = H('c7_3', 'stop', 'winddown', 0.4); ev.c7_wont = H('c7_3', 'wont', 'shimmer', 0.5);
    ev.c7_s4 = S('c7_4');
    ev.c7_nasa = H('c7_4', 'invited', 'pop', 0.45); ev.c7_V = H('c7_4', 'v', 'blip', 0.55, -0.3); ev.c7_G = H('c7_4', 'g', 'blip', 0.55, 0); ev.c7_R = H('c7_4', 'r', 'blip', 0.55, 0.3);
    ev.c7_s5 = S('c7_5');
    ev.c7_num = H('c7_5', 'number', 'blip', 0.45); ev.c7_9ka = Wt('c7_5', 'nine', 1); ev.c7_9k = H('c7_5', 'kilometres', 'ding', 0.6); ev.c7_home = H('c7_5', 'home', 'chime', 0.45);
    ev.c7_s6 = S('c7_6');
    ev.c7_yest = H('c7_6', 'yesterday', 'tick', 0.45); ev.c7_hello = H('c7_6', 'hello', 'shimmer', 0.55);
    ev.c7_s7 = S('c7_7', 0.6); ev.sync_logo = hit(ev.c7_s7 + 0.25, 'chime', 0.7);
    ev.c7_like = H('c7_7', 'like', 'pop', 0.6, -0.3); ev.c7_sub = H('c7_7', 'subscribe', 'ding', 0.65, 0.3);
    ev.c7_ig = H('c7_7', 'instagram', 'pop', 0.55, -0.3); ev.c7_tt = H('c7_7', 'tiktok', 'pop', 0.55, 0.3);
    ev.c7_send = hit(L('c7_7').end + 0.4, 'fwip', 0.5); ev.c7_bye = hit(L('c7_7').end + 1.6, 'boing', 0.4);
    // verified sync markers (picture + sound on a clear hit with no voice on top where possible)
    ev.sync_ever = ev.c0_ever; ev.sync_worked = ev.c5_worked; ev.sync_myth = ev.c6_myth;
  };
  if (typeof module !== 'undefined') module.exports = build; else globalThis.EVENTS = build;
})();
