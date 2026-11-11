// EVENTS — every named visual hit and its sound, per chapter. Called by score.js (Node + browser).
// hit(t, kind, gain, pan) registers a sound effect at t and returns t, so the picture uses the same number.
(function () {
  const build = ({ L, Wt, next, ev, hit, CH, U, DURATION }) => {
    const S = (id, d = 0.25) => L(id).t - d; // a shot that starts just before a line
    // ===== c0 cold open =====
    ev.c0_s1 = 0;                                                        // bedroom at night: "you" in bed, Nod with a lamp
    ev.c0_in = hit(0.3, 'harp', 0.5);
    ev.c0_lie = hit(Wt('c0_1', 'lie'), 'fwip', 0.6);
    ev.c0_lose = hit(Wt('c0_1', 'lose'), 'switch', 0.8);
    ev.sync_lights = ev.c0_lose;
    ev.c0_hours = hit(Wt('c0_1', 'hours'), 'spin', 0.5);
    ev.c0_s2 = S('c0_2');                                                // close on the sleeper: muscles OFF, dream bubble
    ev.c0_off = hit(Wt('c0_2', 'switched'), 'click', 0.8);
    ev.c0_show = hit(Wt('c0_2', 'show'), 'shimmer', 0.55);
    ev.c0_things = [0, 1, 2].map((i) => hit(Wt('c0_2', 'things') + i * 0.3, 'pop', 0.5, -0.3 + i * 0.3));
    ev.c0_s3 = S('c0_3');                                                // the life bar: a third asleep, 26 years
    ev.c0_every = hit(Wt('c0_3', 'every'), 'tick', 0.5);
    ev.c0_third = hit(Wt('c0_3', 'third'), 'brush', 0.7);
    ev.c0_80 = hit(Wt('c0_3', 'eighty'), 'blip', 0.5);
    ev.c0_26 = hit(Wt('c0_3', 'twenty'), 'ding', 0.65);
    ev.c0_s4 = S('c0_4');                                                // elephant, penguin, jellyfish asleep
    ev.c0_animals = ['elephants', 'penguins', 'jellyfish'].map((w, i) => hit(Wt('c0_4', w), 'pop', 0.65, -0.4 + i * 0.4));
    ev.c0_nobrain = hit(Wt('c0_4', 'brain'), 'blip', 0.5);
    ev.c0_s5 = S('c0_5');                                                // in the wild: eyes in the dark
    ev.c0_shut = hit(Wt('c0_5', 'shut'), 'fwip', 0.4);
    ev.c0_danger = hit(Wt('c0_5', 'dangerous'), 'thud', 0.7);
    ev.c0_evo = hit(Wt('c0_5', 'evolution'), 'swell', 0.45);
    ev.c0_never = hit(Wt('c0_5', 'never'), 'stamp', 0.7);
    ev.c0_s6 = S('c0_6', 0.4);
    ev.c0_q = hit(Wt('c0_6', 'why'), 'swell', 0.4);
    // title (no voice): painted words land one by one, then the brand
    ev.title0 = L('c0_6').end + 0.35;
    ev.titleWords = ['WHY', 'DO', 'WE', 'HAVE', 'TO', 'SLEEP?'].map((w, i) => ({ w, t: hit(ev.title0 + 0.3 + i * 0.3, 'slam', i === 5 ? 1.0 : 0.6, -0.4 + i * 0.16) }));
    ev.sync_title = ev.titleWords[5].t;
    ev.titleBrand = hit(ev.titleWords[5].t + 1.0, 'chime', 0.6);
    ev.titleYawn = hit(ev.titleBrand + 0.9, 'yawn', 0.6);

    // chapter cards: paper wipe + painted number, hook line, card out
    for (const c of ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']) {
      ev[c + '_card'] = CH[c].t0; hit(CH[c].t0 + 0.05, 'wipe', 0.5); ev[c + '_stamp'] = hit(CH[c].t0 + 0.3, 'slam', 0.75);
      hit(CH[c].t0 + 0.5, 'brush', 0.5);
      const h = L(c + '_1h'); ev[c + '_hook'] = h; hit(h.t - 0.05, 'brush', 0.45);
      ev[c + '_cardOut'] = h.end + 0.5; hit(ev[c + '_cardOut'] - 0.35, 'wipe', 0.35);
    }

    // ===== c1 the boy who stayed awake =====
    ev.c1_s1 = ev.c1_cardOut - 0.1;                                      // map: San Diego, December 1963, Randy (17), science fair
    ev.c1_dec = hit(Wt('c1_2', 'december'), 'fwip', 0.55);
    ev.c1_17 = hit(Wt('c1_2', 'seventeen'), 'pop', 0.6);
    ev.c1_sd = hit(Wt('c1_2', 'diego'), 'thud', 0.55);
    ev.c1_randy = hit(Wt('c1_2', 'randy'), 'blip', 0.5);
    ev.c1_fair = hit(Wt('c1_2', 'science'), 'ding', 0.55);
    ev.c1_s2 = S('c1_3');                                                // the living room: two friends, tests, Dr Dement, pinball
    ev.c1_friends = hit(Wt('c1_3', 'friends'), 'pop', 0.55, -0.3);
    ev.c1_tests = hit(Wt('c1_3', 'tests'), 'scribble', 0.5, 0.3);
    ev.c1_dement = hit(Wt('c1_3', 'william'), 'whoosh', 0.5, 0.4);
    ev.c1_day10 = hit(Wt('c1_3b', 'ten'), 'flip', 0.6);
    ev.c1_pinball = hit(Wt('c1_3b', 'pinball'), 'coin', 0.65);
    ev.c1_pins = [0, 1, 2, 3].map((i) => hit(ev.c1_pinball + 0.3 + i * 0.22, 'blip', 0.4, 0.2 + (i % 2) * 0.3));
    ev.c1_s3 = S('c1_4');                                                // the days pass: symptoms
    ev.c1_days = hit(Wt('c1_4', 'days'), 'flip', 0.5);
    ev.c1_sym = ['moodiness', 'trouble', 'memory', 'hallucinations'].map((w, i) => hit(Wt('c1_4', w), i === 3 ? 'shimmer' : 'brush', 0.6, -0.45 + i * 0.3));
    ev.c1_s4 = S('c1_5');                                                // 11 days 25 min = 264 hours
    ev.c1_11 = hit(Wt('c1_5', 'eleven'), 'tick', 0.5);
    ev.c1_25 = hit(Wt('c1_5', 'minutes'), 'stamp', 0.65);
    ev.c1_264a = Wt('c1_5', 'two'); ev.c1_264 = hit(Wt('c1_5', 'hours'), 'ding', 0.7);
    ev.c1_s5 = S('c1_6');                                                // then he slept ~15 hours
    ev.c1_slept = hit(Wt('c1_6', 'slept'), 'harp', 0.5);
    ev.c1_15 = hit(Wt('c1_6', 'fifteen'), 'ding', 0.55);
    ev.c1_healthy = hit(Wt('c1_6', 'healthy'), 'stamp', 0.65);
    ev.c1_s6 = S('c1_7');                                                // the rat experiments
    ev.c1_rats = hit(Wt('c1_7', 'rats'), 'drop', 0.5);
    ev.c1_80s = hit(Wt('c1_7', 'eighties'), 'fwip', 0.5);
    ev.c1_died = hit(Wt('c1_7', 'died'), 'thud', 0.55);
    ev.c1_range = hit(Wt('c1_7', 'eleven'), 'brush', 0.55);
    ev.c1_cause = hit(Wt('c1_7', 'cause'), 'blip', 0.5);
    ev.c1_s7 = S('c1_8');                                                // Guinness closes the record; not optional
    ev.c1_1997 = hit(Wt('c1_8', 'nineteen'), 'fwip', 0.5);
    ev.c1_closed = hit(Wt('c1_8', 'stopped'), 'slam', 0.8);
    ev.c1_dont = hit(Wt('c1_8', "don't"), 'alarm', 0.45);
    ev.c1_s8 = S('c1_9');
    ev.c1_notopt = hit(Wt('c1_9', 'optional'), 'stamp', 0.7);
    ev.c1_for = hit(Wt('c1_9', 'for'), 'swell', 0.45);

    // ===== c2 two clocks inside you =====
    ev.c2_s1 = ev.c2_cardOut - 0.1;                                      // the hourglass: adenosine builds up all day
    ev.c2_hg = hit(Wt('c2_2', 'hourglass'), 'pop', 0.6);
    ev.c2_awake = hit(Wt('c2_2', 'awake'), 'flow', 0.4);
    ev.c2_aden = hit(Wt('c2_2', 'adenosine'), 'bubble', 0.5);
    ev.c2_sleepier = hit(Wt('c2_2', 'sleepier'), 'yawn', 0.55);
    ev.c2_s2 = S('c2_3');                                                // sleep empties it; coffee only blocks the sensors
    ev.c2_empties = hit(Wt('c2_3', 'empties'), 'whoosh', 0.6);
    ev.c2_coffee = hit(Wt('c2_3', 'coffee'), 'pop', 0.6);
    ev.c2_blocks = hit(Wt('c2_3', 'blocks'), 'clank', 0.55);
    ev.c2_plugs = [0, 1, 2, 3].map((i) => hit(ev.c2_blocks + 0.25 + i * 0.2, 'tick', 0.45, -0.3 + i * 0.2));
    ev.c2_still = hit(Wt('c2_3', 'still'), 'thud', 0.5);
    ev.c2_s3 = S('c2_4');                                                // the real clock: 20,000 cells, ticking in the dark; melatonin
    ev.c2_real = hit(Wt('c2_4', 'real'), 'tick', 0.6);
    ev.c2_deep = hit(Wt('c2_4', 'deep'), 'whoosh', 0.45);
    ev.c2_20ka = Wt('c2_4', 'twenty'); ev.c2_20k = hit(Wt('c2_4', 'cells'), 'ding', 0.6);
    ev.c2_dark = hit(Wt('c2_4', 'darkness'), 'switch', 0.7);
    ev.c2_s3b = S('c2_4b');
    ev.c2_evening = hit(Wt('c2_4b', 'evening'), 'swell', 0.4);
    ev.c2_mel = hit(Wt('c2_4b', 'melatonin'), 'bubble', 0.5);
    ev.c2_begun = hit(Wt('c2_4b', 'begun'), 'chime', 0.5);
    ev.c2_s4 = S('c2_5');                                                // it runs slow: 24 h 11 min; morning light resets it
    ev.c2_slow = hit(Wt('c2_5', 'slow'), 'winddown', 0.4);
    ev.c2_2411 = hit(Wt('c2_5', 'eleven'), 'ding', 0.6);
    ev.c2_light = hit(Wt('c2_5', 'light'), 'shimmer', 0.55);
    ev.c2_reset = hit(Wt('c2_5', 'resets'), 'stamp', 0.7);
    ev.c2_s5 = S('c2_6');                                                // jet lag
    ev.c2_fly = hit(Wt('c2_6', 'fly'), 'whoosh', 0.55);
    ev.c2_old = hit(Wt('c2_6', 'old'), 'tick', 0.5);
    ev.c2_jet = hit(Wt('c2_6', 'jet'), 'stamp', 0.7);
    ev.c2_s6 = S('c2_7');                                                // the two line up → asleep
    ev.c2_full = hit(Wt('c2_7', 'full'), 'pop', 0.55, -0.3);
    ev.c2_night = hit(Wt('c2_7', 'night'), 'pop', 0.55, 0.3);
    ev.c2_lineup = hit(Wt('c2_7', 'line'), 'clank', 0.6);
    ev.c2_asleep = hit(Wt('c2_7', 'asleep'), 'harp', 0.55);

    // ===== c3 what a night really looks like =====
    ev.c3_s1 = ev.c3_cardOut - 0.1;                                      // the hypnogram draws itself: cycles of ~90 min
    ev.c3_cycles = hit(Wt('c3_2', 'cycles'), 'brush', 0.55);
    ev.c3_90 = hit(Wt('c3_2', 'ninety'), 'ding', 0.55);
    ev.c3_46 = hit(Wt('c3_2', 'four'), 'pop', 0.5);
    ev.c3_brks = [0, 1, 2, 3, 4].map((i) => hit(ev.c3_46 + 0.15 + i * 0.16, 'tick', 0.4, -0.4 + i * 0.2));
    ev.c3_eeg = hit(Wt('c3_2', 'waves'), 'neon', 0.5);
    ev.c3_s2 = S('c3_3');                                                // sinking into deep sleep
    ev.c3_sink = hit(Wt('c3_3', 'sink'), 'winddown', 0.45);
    ev.c3_slow = hit(Wt('c3_3', 'slow'), 'flow', 0.5);
    ev.c3_heart = hit(Wt('c3_3', 'heart'), 'heart', 0.7);
    ev.c3_heart2 = hit(ev.c3_heart + 1.1, 'heart', 0.6);
    ev.c3_wake = hit(Wt('c3_3', 'hard'), 'alarm', 0.4);
    ev.c3_s3 = S('c3_4');                                                // rising into REM
    ev.c3_rise = hit(Wt('c3_4', 'rise'), 'rise', 0.45);
    ev.c3_rem = hit(Wt('c3_4', 'rem'), 'stamp', 0.7);
    ev.c3_eyes = hit(Wt('c3_4', 'eyes'), 'zip', 0.45);
    ev.c3_busy = hit(Wt('c3_4', 'busy'), 'zap', 0.5);
    ev.c3_dreams = hit(Wt('c3_4', 'vivid'), 'shimmer', 0.55);
    ev.c3_s4 = S('c3_5');                                                // paralysed, so you don't act the dreams out
    ev.c3_par = hit(Wt('c3_5', 'paralysed'), 'clank', 0.6);
    ev.c3_locks = [0, 1, 2, 3].map((i) => hit(ev.c3_par + 0.2 + i * 0.18, 'click', 0.5, -0.4 + i * 0.27));
    ev.c3_act = hit(Wt('c3_5', 'act'), 'whoosh', 0.45);
    ev.c3_s5 = S('c3_6');                                                // the whole night: deep first, dreams last; cut it short
    ev.c3_first = hit(Wt('c3_6', 'first'), 'brush', 0.55, -0.3);
    ev.c3_morning = hit(Wt('c3_6', 'morning'), 'brush', 0.55, 0.3);
    ev.c3_cut = hit(Wt('c3_6', 'cut'), 'scratch', 0.7);
    ev.c3_lose = hit(Wt('c3_6', 'lose'), 'drop', 0.55);

    // ===== c4 the night shift =====
    ev.c4_s1 = ev.c4_cardOut - 0.1;                                      // growth hormone in deep sleep
    ev.c4_body = hit(Wt('c4_2', 'body'), 'pop', 0.5);
    ev.c4_gh = hit(Wt('c4_2', 'growth'), 'bubble', 0.55);
    ev.c4_build = hit(Wt('c4_2', 'build'), 'tick', 0.55);
    ev.c4_repair = hit(Wt('c4_2', 'repair'), 'clank', 0.5);
    ev.c4_s2 = S('c4_3');                                                // 164 volunteers, a cold virus, < 6 h vs > 7 h
    ev.c4_immune = hit(Wt('c4_3', 'immune'), 'pop', 0.55);
    ev.c4_164a = Wt('c4_3', 'hundred'); ev.c4_164 = hit(Wt('c4_3', 'volunteers'), 'ding', 0.55);
    ev.c4_virus = hit(Wt('c4_3', 'virus'), 'spray', 0.6);
    ev.c4_six = hit(Wt('c4_3', 'six'), 'brush', 0.55, -0.3);
    ev.c4_four = hit(Wt('c4_3', 'four'), 'stamp', 0.7);
    ev.c4_seven = hit(Wt('c4_3', 'seven'), 'brush', 0.55, 0.3);
    ev.c4_s3 = S('c4_4');                                                // 2013: the space between cells grows 60 %, fluid washes through
    ev.c4_2013 = hit(Wt('c4_4', 'twenty'), 'fwip', 0.55);
    ev.c4_space = hit(Wt('c4_4', 'space'), 'stretch', 0.45);
    ev.c4_60 = hit(Wt('c4_4', 'sixty'), 'ding', 0.6);
    ev.c4_fluid = hit(Wt('c4_4', 'fluid'), 'flow', 0.6);
    ev.c4_famous = hit(Wt('c4_4', 'famous'), 'chime', 0.5);
    ev.c4_wash = hit(Wt('c4_4', 'wash', 1), 'stamp', 0.7);
    ev.c4_s4 = S('c4_5');                                                // 2024: the opposite — under debate
    ev.c4_but = hit(Wt('c4_5', 'science'), 'record', 0.6);
    ev.c4_2024 = hit(Wt('c4_5', 'twenty'), 'fwip', 0.55);
    ev.c4_opposite = hit(Wt('c4_5', 'opposite'), 'whoosh', 0.55);
    ev.c4_30 = hit(Wt('c4_5', 'thirty'), 'ding', 0.6);
    ev.c4_debate = hit(Wt('c4_5', 'debate'), 'stamp', 0.7);
    ev.c4_s5 = S('c4_6');                                                // flies and mice: damage in the gut; the whole body
    ev.c4_flies = hit(Wt('c4_6', 'flies'), 'buzz', 0.35);
    ev.c4_mice = hit(Wt('c4_6', 'mice'), 'pop', 0.5);
    ev.c4_gut = hit(Wt('c4_6', 'gut'), 'bubble', 0.55);
    ev.c4_whole = hit(Wt('c4_6', 'whole'), 'swell', 0.5);

    // ===== c5 saving the day =====
    ev.c5_s1 = ev.c5_cardOut - 0.1;                                      // 1994: a rat explores; each place fires its own cells
    ev.c5_1994 = hit(Wt('c5_2', 'nineteen'), 'fwip', 0.55);
    ev.c5_explored = hit(Wt('c5_2', 'explored'), 'whoosh', 0.4);
    ev.c5_placeT0 = Wt('c5_2', 'each'); ev.c5_placeT1 = L('c5_2').end + 0.4;
    ev.c5_places = [0, 1, 2, 3, 4, 5].map((i) => hit(ev.c5_placeT0 + (ev.c5_placeT1 - ev.c5_placeT0) * (i + 0.5) / 6, 'note' + i, 0.6, -0.5 + i * 0.2));
    ev.c5_s2 = S('c5_3');                                                // asleep: the same cells fire again — replay
    ev.c5_slept = hit(Wt('c5_3', 'slept'), 'harp', 0.45);
    ev.c5_again = Wt('c5_3', 'again');
    ev.c5_replay1 = [0, 1, 2, 3, 4, 5].map((i) => hit(ev.c5_again - 0.9 + i * 0.16, 'note' + i, 0.55, -0.5 + i * 0.2));
    ev.c5_replayW = hit(Wt('c5_3', 'replaying'), 'stamp', 0.65);
    ev.c5_replay2 = [0, 1, 2, 3, 4, 5].map((i) => hit(ev.c5_replayW + 0.5 + i * 0.12, 'note' + i, 0.5, -0.5 + i * 0.2));
    ev.c5_s3 = S('c5_4');                                                // memories move to long-term storage; babies
    ev.c5_move = hit(Wt('c5_4', 'move'), 'whoosh', 0.5);
    ev.c5_cards = [0, 1, 2, 3].map((i) => hit(ev.c5_move + 0.35 + i * 0.3, 'fwip', 0.5, -0.3 + i * 0.25));
    ev.c5_storage = hit(Wt('c5_4', 'storage'), 'thud', 0.5);
    ev.c5_s3b = S('c5_4b');
    ev.c5_baby = hit(Wt('c5_4b', 'babies'), 'chime', 0.5);
    ev.c5_learn = hit(Wt('c5_4b', 'learning'), 'shimmer', 0.45);
    ev.c5_1417 = hit(Wt('c5_4b', 'fourteen'), 'ding', 0.6);
    ev.c5_s4 = S('c5_5');                                                // synapses grow by day, shrink ~18 % at night
    ev.c5_second = hit(Wt('c5_5', 'second'), 'pop', 0.5);
    ev.c5_bigger = hit(Wt('c5_5', 'bigger'), 'stretch', 0.5);
    ev.c5_forever = hit(Wt('c5_5', 'forever'), 'alarm', 0.35);
    ev.c5_shrank = hit(Wt('c5_5', 'shrank'), 'shrink', 0.55);
    ev.c5_18 = hit(Wt('c5_5', 'eighteen'), 'ding', 0.6);
    ev.c5_noise = hit(Wt('c5_5', 'noise'), 'winddown', 0.4);
    ev.c5_s5 = S('c5_6');                                                // 1924: remember more after sleep
    ev.c5_1924 = hit(Wt('c5_6', 'nineteen'), 'fwip', 0.55);
    ev.c5_remember = hit(Wt('c5_6', 'remember'), 'rise', 0.45);
    ev.c5_awakeBar = hit(Wt('c5_6', 'awake'), 'drop', 0.5);
    ev.c5_s6 = S('c5_7');                                                // "sleep on it"
    ev.c5_sleeponit = hit(Wt('c5_7', 'sleep'), 'stamp', 0.7);
    ev.c5_filing = hit(Wt('c5_7', 'filing'), 'thud', 0.5);
    ev.c5_drawers = [0, 1, 2].map((i) => hit(ev.c5_filing + 0.3 + i * 0.25, 'clank', 0.4, -0.2 + i * 0.2));

    // ===== c6 sleeping dangerously =====
    ev.c6_s1 = ev.c6_cardOut - 0.1;                                      // dolphins: half a brain at a time
    ev.c6_dolphin = hit(Wt('c6_2', 'dolphins'), 'splash', 0.5);
    ev.c6_half = hit(Wt('c6_2', 'half'), 'brush', 0.6);
    ev.c6_swap = hit(Wt('c6_2', 'other'), 'whoosh', 0.5);
    ev.c6_breathe = hit(Wt('c6_2', 'breathe'), 'spray', 0.6);
    ev.c6_s2 = S('c6_3');                                                // frigatebirds: 42 minutes a day, in flight
    ev.c6_frig = hit(Wt('c6_3', 'frigatebirds'), 'flap', 0.5);
    ev.c6_weeks = hit(Wt('c6_3', 'weeks'), 'flip', 0.5);
    ev.c6_air = hit(Wt('c6_3', 'air'), 'wind', 0.4);
    ev.c6_42 = hit(Wt('c6_3', 'forty'), 'ding', 0.6);
    ev.c6_bursts = hit(Wt('c6_3', 'bursts'), 'blip', 0.5);
    ev.c6_s3 = S('c6_4');                                                // chinstrap penguins: 10,000 naps of 4 seconds
    ev.c6_peng = hit(Wt('c6_4', 'penguins'), 'pop', 0.55);
    ev.c6_10ka = Wt('c6_4', 'more'); ev.c6_10k = hit(Wt('c6_4', 'naps'), 'ding', 0.6);
    ev.c6_4s = hit(Wt('c6_4', 'four'), 'tick', 0.6);
    ev.c6_11h = hit(Wt('c6_4', 'eleven'), 'stamp', 0.7);
    ev.c6_s4 = S('c6_5');                                                // elephants 2 h, a bat ~20 h
    ev.c6_eleph = hit(Wt('c6_5', 'elephants'), 'thud', 0.55);
    ev.c6_2h = hit(Wt('c6_5', 'two'), 'ding', 0.55);
    ev.c6_bat = hit(Wt('c6_5', 'bat'), 'flap', 0.5);
    ev.c6_20 = hit(Wt('c6_5', 'twenty'), 'ding', 0.6);
    ev.c6_s5 = S('c6_6');                                                // the upside-down jellyfish: no brain, still sleeps
    ev.c6_jelly = hit(Wt('c6_6', 'jellyfish'), 'bubble', 0.55);
    ev.c6_nobrain = hit(Wt('c6_6', 'brain'), 'scratch', 0.6);
    ev.c6_quiet = hit(Wt('c6_6', 'quiet'), 'winddown', 0.4);
    ev.c6_slug = hit(Wt('c6_6', 'sluggish'), 'drop', 0.5);
    ev.c6_s6 = S('c6_7');                                                // every animal pays the price; the Rechtschaffen line
    ev.c6_every = hit(Wt('c6_7', 'every'), 'harp', 0.45);
    ev.c6_price = hit(Wt('c6_7', 'price'), 'coin', 0.55);
    ev.c6_s7 = Wt('c6_7', 'the', 1) - 0.3;
    ev.c6_allan = hit(Wt('c6_7', 'allan'), 'fwip', 0.5);
    ev.c6_quote = L('c6_7').words.filter((w) => w.t >= Wt('c6_7', 'if'));
    ev.c6_vital = hit(Wt('c6_7', 'vital'), 'tick', 0.5);
    ev.c6_mistake = hit(Wt('c6_7', 'mistake'), 'stamp', 0.75);

    // ===== c7 payoff + end card =====
    ev.c7_s1 = S('c7_1', 0.6);
    ev.c7_q = hit(L('c7_1').t + 0.1, 'swell', 0.4);
    ev.c7_recap = [Wt('c7_2', 'repairs'), Wt('c7_2', 'backs'), Wt('c7_2', 'files'), Wt('c7_2', 'resets')].map((tt, i) => hit(tt, 'pop', 0.6, -0.45 + i * 0.3));
    ev.c7_s2 = S('c7_3');                                                // this month: 57 brain-scan studies
    ev.c7_month = hit(Wt('c7_3', 'month'), 'fwip', 0.55);
    ev.c7_57a = Wt('c7_3', 'fifty'); ev.c7_57 = hit(Wt('c7_3', 'studies'), 'ding', 0.6);
    ev.c7_deep = hit(Wt('c7_3', 'deep'), 'zap', 0.45);
    ev.c7_s3 = S('c7_4');                                                // 17–19 h awake ≈ 0.05 % BAC on some tests
    ev.c7_skip = hit(Wt('c7_4', 'skip'), 'record', 0.5);
    ev.c7_17 = hit(Wt('c7_4', 'seventeen'), 'tick', 0.55);
    ev.c7_tests = hit(Wt('c7_4', 'tests'), 'drop', 0.5);
    ev.c7_005 = hit(Wt('c7_4', 'zero'), 'stamp', 0.7);
    ev.c7_s4 = S('c7_5');                                                // 7+ hours; the third that makes the rest work
    ev.c7_seven = hit(Wt('c7_5', 'seven'), 'ding', 0.65);
    ev.c7_s4b = S('c7_6');
    ev.c7_third = hit(Wt('c7_6', 'third'), 'brush', 0.6);
    ev.c7_work = hit(Wt('c7_6', 'work'), 'shimmer', 0.6);
    ev.c7_s5 = S('c7_7', 0.6);
    ev.sync_logo = hit(ev.c7_s5 + 0.15, 'chime', 0.7);
    ev.c7_like = hit(Wt('c7_7', 'like'), 'pop', 0.7);
    ev.c7_sub = hit(Wt('c7_7', 'subscribe'), 'click', 0.8);
    ev.c7_ig = hit(Wt('c7_7', 'instagram'), 'blip', 0.6, -0.3);
    ev.c7_tt = hit(Wt('c7_7', 'tiktok'), 'blip', 0.6, 0.3);
    ev.c7_well = hit(Wt('c7_7', 'well'), 'harp', 0.6);
  };
  if (typeof module !== 'undefined') module.exports = build; else globalThis.EVENTS = build;
})();
