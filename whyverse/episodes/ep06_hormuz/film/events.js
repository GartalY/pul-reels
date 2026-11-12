// EVENTS — every named visual hit and its sound, per chapter. Called by score.js (Node + browser).
// hit(t, kind, gain, pan) registers a sound effect at t and returns t, so the picture uses the same number.
(function () {
  const build = ({ L, Wt, next, ev, hit, CH, U, DURATION }) => {
    const S = (id, d = 0.25) => L(id).t - d; // a shot that starts just before a line
    // ===== c0 cold open =====
    ev.c0_s1 = 0;                                                         // the waiting supertanker
    ev.c0_in = hit(0.25, 'swell', 0.4);
    ev.c0_oman = hit(Wt('c0_1', 'oman'), 'blip', 0.5);
    ev.c0_ship = hit(Wt('c0_1', 'ship'), 'horn', 0.55);
    ev.c0_fields = [0, 1, 2].map((i) => hit(Wt('c0_1', 'football') + i * 0.22, 'pop', 0.55, -0.3 + i * 0.3));
    ev.c0_wait = hit(Wt('c0_1', 'waiting'), 'tick', 0.4);
    ev.c0_belly = hit(Wt('c0_1', 'belly'), 'whoosh', 0.45);
    ev.c0_2ma = Wt('c0_1', 'two'); ev.c0_2m = hit(Wt('c0_1', 'barrels'), 'ding', 0.6);
    ev.c0_s2 = S('c0_2');                                                 // map → the gap: 33 km; narrower than a marathon
    ev.c0_gap = hit(Wt('c0_2', 'gap'), 'whoosh', 0.5);
    ev.c0_33 = hit(Wt('c0_2', 'kilometres'), 'stamp', 0.65);
    ev.c0_mar = hit(Wt('c0_2', 'marathon'), 'pop', 0.6);
    ev.c0_s3 = S('c0_3');                                                 // 1 in 5 barrels
    ev.c0_barrels = [0, 1, 2, 3, 4].map((i) => hit(Wt('c0_3', 'one') + i * 0.12, 'tick', 0.45, -0.4 + i * 0.2));
    ev.c0_five = hit(Wt('c0_3', 'five'), 'ding', 0.6);
    ev.c0_through = hit(Wt('c0_3', 'passed'), 'whoosh', 0.5);
    ev.c0_s4 = S('c0_4');                                                 // 2026: ships stop, price jumps
    ev.c0_2026 = hit(Wt('c0_4', 'twenty'), 'flip', 0.55);
    ev.c0_stopped = hit(Wt('c0_4', 'stopped'), 'thud', 0.6);
    ev.c0_shot = hit(Wt('c0_4', 'shot'), 'rise', 0.55);
    ev.c0_half = hit(Wt('c0_4', 'half'), 'stamp', 0.7);
    ev.c0_s5 = S('c0_5');                                                 // the promise: two questions
    ev.c0_end = hit(Wt('c0_5', 'end'), 'fwip', 0.5);
    ev.c0_why1 = hit(Wt('c0_5', 'shake'), 'pop', 0.6, -0.3);
    ev.c0_forty = hit(Wt('c0_5', 'forty'), 'pop', 0.6, 0.3);
    ev.c0_didnt = hit(Wt('c0_5', "didn't"), 'stamp', 0.6);
    ev.c0_s6 = S('c0_6', 0.35);
    ev.c0_q = hit(Wt('c0_6', 'strait'), 'swell', 0.4);
    // title (no voice): words slam in one by one, then the brand
    ev.title0 = L('c0_6').end + 0.35;
    ev.titleWords = ['WHY', 'CAN', 'ONE', 'NARROW', 'STRAIT', 'SHAKE', 'THE', 'WORLD?'].map((w, i) => ({ w, t: hit(ev.title0 + 0.3 + i * 0.27, 'slam', i === 7 ? 1.0 : 0.55, -0.4 + i * 0.11) }));
    ev.sync_title = ev.titleWords[7].t;
    ev.titleBrand = hit(ev.titleWords[7].t + 1.0, 'chime', 0.6);
    ev.titleGull = hit(ev.titleBrand + 0.7, 'flap', 0.5);

    // chapter cards: wipe + number, hook line, card out
    for (const c of ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']) {
      ev[c + '_card'] = CH[c].t0; hit(CH[c].t0 + 0.05, 'wipe', 0.5); ev[c + '_stamp'] = hit(CH[c].t0 + 0.3, 'slam', 0.75);
      const h = L(c + '_1h'); ev[c + '_hook'] = h; hit(h.t - 0.05, 'fwip', 0.45);
      ev[c + '_cardOut'] = h.end + 0.5; hit(ev[c + '_cardOut'] - 0.35, 'wipe', 0.35);
    }

    // ===== c1 a door in the map =====
    ev.c1_s1 = ev.c1_cardOut - 0.1;                                       // the Gulf is almost a lake
    ev.c1_lake = hit(Wt('c1_2', 'lake'), 'splash', 0.55);
    ev.c1_iran = hit(Wt('c1_2', 'iran'), 'pop', 0.6, 0.2);
    ev.c1_arab = hit(Wt('c1_2', 'arabian'), 'pop', 0.6, -0.2);
    ev.c1_s2 = S('c1_3');                                                 // only one way out
    ev.c1_one = hit(Wt('c1_3', 'one'), 'whoosh', 0.55);
    ev.c1_ocean = hit(Wt('c1_3', 'ocean'), 'splash', 0.45);
    ev.c1_musandam = hit(Wt('c1_3', 'musandam'), 'blip', 0.6);
    ev.c1_toward = hit(Wt('c1_3', 'toward'), 'pop', 0.5);
    ev.c1_s3 = S('c1_4');                                                 // the Strait of Hormuz: 167 km long, 33-39 km wide
    ev.c1_name = hit(Wt('c1_4', 'strait'), 'stamp', 0.65);
    ev.c1_167 = hit(Wt('c1_4', 'long'), 'ding', 0.55);
    ev.c1_narrow = hit(Wt('c1_4', 'narrowest'), 'tick', 0.5);
    ev.c1_3339 = hit(Wt('c1_4', 'across'), 'ding', 0.6);
    ev.c1_s4 = S('c1_5');                                                 // the two lanes
    ev.c1_lanes = hit(Wt('c1_5', 'two'), 'whoosh', 0.55);
    ev.c1_3km = hit(Wt('c1_5', 'three'), 'ding', 0.55);
    ev.c1_in = hit(Wt('c1_5', 'in,'), 'pop', 0.55, -0.3);
    ev.c1_out = hit(Wt('c1_5', 'out,'), 'pop', 0.55, 0.3);
    ev.c1_buffer = hit(Wt('c1_5', 'buffer'), 'blip', 0.5);
    ev.c1_s5 = S('c1_6');                                                 // a seven-storey draught
    ev.c1_deep = hit(Wt('c1_6', 'deep'), 'drop', 0.5);
    ev.c1_seven = hit(Wt('c1_6', 'seven'), 'ding', 0.55);
    ev.c1_channel = hit(Wt('c1_6', 'channel'), 'whoosh', 0.45);
    ev.c1_s6 = S('c1_7');                                                 // that's it
    ev.c1_thats = hit(Wt('c1_7', "that's"), 'tick', 0.5);
    ev.c1_2x3 = hit(Wt('c1_7', 'each'), 'stamp', 0.65);
    ev.c1_busiest = hit(Wt('c1_7', 'busiest'), 'ding', 0.55);
    ev.c1_s7 = S('c1_8');
    ev.c1_why = hit(Wt('c1_8', 'why'), 'swell', 0.4);

    // ===== c2 a fifth of the world =====
    ev.c2_s1 = ev.c2_cardOut - 0.1;                                       // the producers
    ev.c2_prod = ['saudi', 'iraq', 'united', 'kuwait', 'iran'].map((w, i) => hit(Wt('c2_2', w), 'pop', 0.55, -0.4 + i * 0.2));
    ev.c2_qatar = hit(Wt('c2_2', 'qatar'), 'shimmer', 0.5);
    ev.c2_gas = Wt('c2_2', 'gas');
    ev.c2_s2 = S('c2_3');                                                 // 20 million barrels a day
    ev.c2_2025 = hit(Wt('c2_3', 'twenty'), 'flip', 0.5);
    ev.c2_20ma = Wt('c2_3', 'twenty', 2); ev.c2_20m = hit(Wt('c2_3', 'barrels'), 'ding', 0.6);
    ev.c2_day = hit(Wt('c2_3', 'day'), 'stamp', 0.65);
    ev.c2_ten = [0,1,2,3,4,5,6,7,8,9].map((i) => hit(Wt('c2_3b', 'ten') + i * 0.09, 'tick', 0.4, -0.45 + i * 0.1));
    ev.c2_leave = hit(Wt('c2_3b', 'leaving'), 'horn', 0.45);
    ev.c2_s3 = S('c2_4');                                                 // 230 per second; a pool a minute
    ev.c2_230a = Wt('c2_4', 'two'); ev.c2_230 = hit(Wt('c2_4', 'second'), 'ding', 0.6);
    ev.c2_pool = hit(Wt('c2_4', 'olympic'), 'splash', 0.5);
    ev.c2_minute = hit(Wt('c2_4', 'minute'), 'stamp', 0.6);
    ev.c2_s4 = S('c2_5');                                                 // a fifth of world oil, a quarter of seaborne, a fifth of LNG
    ev.c2_fifth = hit(Wt('c2_5', 'fifth'), 'pop', 0.6, -0.3);
    ev.c2_quarter = hit(Wt('c2_5', 'quarter'), 'pop', 0.6, 0.3);
    ev.c2_lng = hit(Wt('c2_6', 'fifth'), 'shimmer', 0.55);
    ev.c2_s5 = S('c2_7');                                                 // east to Asia
    ev.c2_east = hit(Wt('c2_7', 'east'), 'whoosh', 0.55);
    ev.c2_80 = hit(Wt('c2_7', 'asia'), 'ding', 0.6);
    ev.c2_dest = ['china', 'india', 'japan', 'korea'].map((w, i) => hit(Wt('c2_7', w), 'blip', 0.55, -0.2 + i * 0.15));
    ev.c2_s6 = S('c2_8');
    ev.c2_engines = hit(Wt('c2_8', 'engines'), 'tick', 0.5);
    ev.c2_back = hit(Wt('c2_8', 'back'), 'knock', 0.6);

    // ===== c3 the back doors =====
    ev.c3_s1 = ev.c3_cardOut - 0.1;                                       // Saudi East-West pipeline to the Red Sea
    ev.c3_tried = hit(Wt('c3_2', 'tried'), 'tick', 0.45);
    ev.c3_pipe = hit(Wt('c3_2', 'pipeline'), 'flow', 0.5);
    ev.c3_1200 = hit(Wt('c3_2', 'kilometres'), 'ding', 0.55);
    ev.c3_red = hit(Wt('c3_2', 'red'), 'splash', 0.5);
    ev.c3_s2 = S('c3_3');                                                 // UAE to Fujairah, Iran to Jask
    ev.c3_uae = hit(Wt('c3_3', 'fujairah'), 'flow', 0.5);
    ev.c3_jask = hit(Wt('c3_3', 'jask'), 'pop', 0.5);
    ev.c3_barely = hit(Wt('c3_3', 'barely'), 'drop', 0.5);
    ev.c3_s3 = S('c3_4');                                                 // spare room 3.5-5.5 vs 20
    ev.c3_spare = hit(Wt('c3_4', 'spare'), 'tick', 0.5);
    ev.c3_iea = hit(Wt('c3_4', 'international'), 'blip', 0.5);
    ev.c3_range = hit(Wt('c3_4', 'million'), 'ding', 0.6);
    ev.c3_against = hit(Wt('c3_5', 'twenty'), 'thud', 0.55);
    ev.c3_one4 = hit(Wt('c3_5', 'four'), 'stamp', 0.65);
    ev.c3_s4 = S('c3_6');                                                 // gas: no back door
    ev.c3_gas = hit(Wt('c3_6', 'gas'), 'shimmer', 0.5);
    ev.c3_none = hit(Wt('c3_6', 'all'), 'slam', 0.7);
    ev.c3_qatar = hit(Wt('c3_6', 'qatar'), 'pop', 0.55);
    ev.c3_s5 = S('c3_7');
    ev.c3_open = hit(Wt('c3_7', 'open'), 'tick', 0.45);
    ev.c3_before = hit(Wt('c3_7', 'close'), 'knock', 0.6);

    // ===== c4 the Tanker War =====
    ev.c4_s1 = ev.c4_cardOut - 0.1;                                       // 1980s: Iran and Iraq at war; ships attacked
    ev.c4_80s = hit(Wt('c4_2', 'nineteen'), 'flip', 0.55);
    ev.c4_iran = hit(Wt('c4_2', 'iran'), 'pop', 0.55, 0.2);
    ev.c4_iraq = hit(Wt('c4_2', 'iraq'), 'pop', 0.55, -0.2);
    ev.c4_1984 = hit(Wt('c4_2', 'nineteen', 1), 'flip', 0.5);
    ev.c4_ships = hit(Wt('c4_2', 'ships'), 'thud', 0.5);
    ev.c4_money = hit(Wt('c4_2', 'money'), 'coin', 0.55);
    ev.c4_s2 = S('c4_3');                                                 // 451 ships hit, 400+ sailors
    ev.c4_451a = Wt('c4_3', 'four', 1); ev.c4_451 = hit(Wt('c4_3', 'ships'), 'ding', 0.55);
    ev.c4_sailors = hit(Wt('c4_3', 'sailors'), 'bell', 0.45);
    ev.c4_s3 = S('c4_4');                                                 // Bridgeton mine; escorts
    ev.c4_1987 = hit(Wt('c4_4', 'nineteen'), 'flip', 0.5);
    ev.c4_mine = hit(Wt('c4_4', 'mine'), 'boom', 0.75);
    ev.c4_escort = hit(Wt('c4_4', 'escorting'), 'whoosh', 0.5);
    ev.c4_convoy = hit(Wt('c4_4', 'convoys'), 'horn', 0.5);
    ev.c4_s4 = S('c4_5');                                                 // the myth crossed out: only ~2% of ships hit
    ev.c4_didnt = hit(Wt('c4_5', "didn't"), 'slam', 0.75);
    ev.c4_2pc = hit(Wt('c4_6', 'two'), 'ding', 0.6);
    ev.c4_cut = hit(Wt('c4_6', 'cut'), 'drop', 0.5);
    ev.c4_ins = hit(Wt('c4_6', 'insurance'), 'pop', 0.5);
    ev.c4_s5 = S('c4_7');                                                 // prices: jumped, slid, crashed in 1986
    ev.c4_jump = hit(Wt('c4_7', 'spikes'), 'rise', 0.5);
    ev.c4_slide = hit(Wt('c4_7', 'sliding'), 'winddown', 0.45);
    ev.c4_1986 = hit(Wt('c4_7', 'nineteen'), 'flip', 0.5);
    ev.c4_crash = hit(Wt('c4_7', 'crashed'), 'crash', 0.65);
    ev.c4_10 = hit(Wt('c4_7', 'ten'), 'stamp', 0.6);
    ev.c4_s6 = S('c4_8');
    ev.c4_take = hit(Wt('c4_8', 'take'), 'swell', 0.4);

    // ===== c5 the year the door almost shut =====
    ev.c5_s1 = ev.c5_cardOut - 0.1;                                       // 28 Feb 2026; Iran declares the strait closed
    ev.c5_feb = hit(Wt('c5_2', 'february'), 'flip', 0.6);
    ev.c5_strikes = hit(Wt('c5_2', 'strikes'), 'thud', 0.55);
    ev.c5_closed = hit(Wt('c5_2', 'closed'), 'slam', 0.75);
    ev.c5_s2 = S('c5_3');                                                 // insurers pull cover
    ev.c5_never = hit(Wt('c5_3', 'never'), 'tick', 0.45);
    ev.c5_pulled = hit(Wt('c5_3', 'pulled'), 'stamp', 0.7);
    ev.c5_wont = hit(Wt('c5_3', "won't"), 'thud', 0.55);
    ev.c5_prem = hit(Wt('c5_3b', 'premiums'), 'tick', 0.5);
    ev.c5_frac = hit(Wt('c5_3b', 'fraction'), 'blip', 0.5);
    ev.c5_several = hit(Wt('c5_3b', 'several'), 'rise', 0.6);
    ev.c5_voyage = hit(Wt('c5_3b', 'voyage'), 'stamp', 0.6);
    ev.c5_s3 = S('c5_4');                                                 // 100+ ships a day → 5
    ev.c5_100 = hit(Wt('c5_4', 'hundred'), 'ding', 0.55);
    ev.c5_summer = hit(Wt('c5_4', 'summer'), 'winddown', 0.5);
    ev.c5_five = hit(Wt('c5_4', 'five'), 'thud', 0.55);
    ev.c5_95 = hit(Wt('c5_4', 'ninety'), 'stamp', 0.7);
    ev.c5_s4 = S('c5_5');                                                 // Brent $70 → $126
    ev.c5_brent = hit(Wt('c5_5', 'brent'), 'blip', 0.5);
    ev.c5_70 = hit(Wt('c5_5', 'seventy'), 'tick', 0.5);
    ev.c5_april = hit(Wt('c5_5', 'april'), 'rise', 0.55);
    ev.c5_126 = hit(Wt('c5_5', 'twenty'), 'stamp', 0.7);
    ev.c5_s5 = S('c5_6');                                                 // emergency stocks: 400 million barrels
    ev.c5_tanks = hit(Wt('c5_6', 'tanks'), 'release', 0.5);
    ev.c5_32 = hit(Wt('c5_6', 'thirty'), 'pop', 0.55);
    ev.c5_400a = Wt('c5_6', 'four'); ev.c5_400 = hit(Wt('c5_6', 'barrels'), 'ding', 0.6);
    ev.c5_enorm = hit(Wt('c5_7', 'enormous'), 'pop', 0.5);
    ev.c5_20d = hit(Wt('c5_7', 'twenty'), 'thud', 0.55);
    ev.c5_s6 = S('c5_8');                                                 // autumn; this week; talks stalled
    ev.c5_autumn = hit(Wt('c5_8', 'autumn'), 'whoosh', 0.45);
    ev.c5_week = hit(Wt('c5_8', 'week'), 'flip', 0.55);
    ev.c5_mines = hit(Wt('c5_8', 'mines'), 'thud', 0.55);
    ev.c5_verified = hit(Wt('c5_8', 'verified'), 'stamp', 0.6);
    ev.c5_stalled = hit(Wt('c5_8', 'stalled'), 'stamp', 0.6);
    ev.c5_s7 = S('c5_9');
    ev.c5_wait = hit(Wt('c5_9', 'wait'), 'record', 0.5);
    ev.c5_part = hit(Wt('c5_9', 'part'), 'pop', 0.5);
    ev.c5_much = hit(Wt('c5_9', 'much'), 'rise', 0.5);

    // ===== c6 small gap, big price =====
    ev.c6_s1 = ev.c6_cardOut - 0.1;                                       // 1979: −5% supply, prices doubled
    ev.c6_1979 = hit(Wt('c6_2', 'nineteen'), 'flip', 0.55);
    ev.c6_5 = hit(Wt('c6_2', 'five'), 'drop', 0.55);
    ev.c6_doubled = hit(Wt('c6_2', 'doubled'), 'rise', 0.6);
    ev.c6_s2 = S('c6_3');                                                 // nobody can stop using oil
    ev.c6_simple = hit(Wt('c6_3', 'simple'), 'tick', 0.45);
    ev.c6_trucks = hit(Wt('c6_3', 'trucks'), 'pop', 0.55, -0.3);
    ev.c6_planes = hit(Wt('c6_3', 'planes'), 'pop', 0.55, 0);
    ev.c6_farms = hit(Wt('c6_3', 'farms'), 'pop', 0.55, 0.3);
    ev.c6_s3 = S('c6_4');                                                 // the bidding war
    ev.c6_cant = hit(Wt('c6_4', "can't"), 'tick', 0.45);
    ev.c6_bids = [0, 1, 2, 3].map((i) => hit(Wt('c6_4', 'bidding') + i * 0.3, 'knock', 0.45, -0.3 + i * 0.2));
    ev.c6_climbs = hit(Wt('c6_4', 'climbs'), 'rise', 0.5);
    ev.c6_out = hit(Wt('c6_4', 'out'), 'whoosh', 0.5);
    ev.c6_s4 = S('c6_5');                                                 // half of the pump price
    ev.c6_spreads = hit(Wt('c6_5', 'spreads'), 'whoosh', 0.45);
    ev.c6_half = hit(Wt('c6_5', 'half'), 'stamp', 0.65);
    ev.c6_pump = hit(Wt('c6_5', 'pump'), 'coin', 0.55);
    ev.c6_s5 = S('c6_6');                                                 // wheels, wings, keels
    ev.c6_wheels = hit(Wt('c6_6', 'wheels'), 'pop', 0.55, -0.3);
    ev.c6_wings = hit(Wt('c6_6', 'wings'), 'pop', 0.55, 0);
    ev.c6_keels = hit(Wt('c6_6', 'keels'), 'pop', 0.55, 0.3);
    ev.c6_everything = hit(Wt('c6_6', 'everything', 1), 'shimmer', 0.5);
    ev.c6_s6 = S('c6_7');                                                 // door + fuel = shock
    ev.c6_door = hit(Wt('c6_7', 'door'), 'pop', 0.55);
    ev.c6_fuel = hit(Wt('c6_7', 'fuel'), 'pop', 0.55);
    ev.c6_wallet = hit(Wt('c6_7', 'wallet'), 'coin', 0.6);

    // ===== c7 payoff + end card =====
    ev.c7_s1 = S('c7_1', 0.6);
    ev.c7_q = hit(L('c7_1').t + 0.1, 'swell', 0.4);
    ev.c7_reasons = [Wt('c7_2', 'geography'), Wt('c7_2', 'fifth'), Wt('c7_2', 'back'), Wt('c7_2', 'short')].map((tt, i) => hit(tt, 'pop', 0.6, -0.45 + i * 0.3));
    ev.c7_s2 = S('c7_3');                                                 // then vs now
    ev.c7_forty = hit(Wt('c7_3', 'forty'), 'flip', 0.5);
    ev.c7_sailing = hit(Wt('c7_3', 'sailing'), 'horn', 0.45);
    ev.c7_year = hit(Wt('c7_3', 'year', 1), 'flip', 0.5);
    ev.c7_risk = hit(Wt('c7_3', 'risk'), 'stamp', 0.6);
    ev.c7_noins = hit(Wt('c7_3', 'insurance'), 'thud', 0.5);
    ev.c7_noships = hit(Wt('c7_3', 'ships', 1), 'slam', 0.6);
    ev.c7_s3 = S('c7_4');                                                 // back to the tanker
    ev.c7_safe = hit(Wt('c7_4', 'safe'), 'shimmer', 0.5);
    ev.c7_pays = hit(Wt('c7_4', 'pays'), 'coin', 0.55);
    ev.c7_s4 = S('c7_5', 0.6);
    ev.sync_logo = hit(ev.c7_s4 + 0.15, 'chime', 0.7);
    ev.c7_like = hit(Wt('c7_5', 'like'), 'pop', 0.7);
    ev.c7_sub = hit(Wt('c7_5', 'subscribe'), 'click', 0.8);
    ev.c7_ig = hit(Wt('c7_5', 'instagram'), 'blip', 0.6, -0.3);
    ev.c7_tt = hit(Wt('c7_5', 'tiktok'), 'blip', 0.6, 0.3);
    ev.c7_bye = hit(L('c7_5').end + 0.3, 'flap', 0.5);
  };
  if (typeof module !== 'undefined') module.exports = build; else globalThis.EVENTS = build;
})();
