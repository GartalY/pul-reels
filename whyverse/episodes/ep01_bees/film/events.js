// EVENTS — every named visual hit and its sound, per chapter. Called by score.js (Node + browser).
(function () {
  const build = ({ L, Wt, next, ev, hit, CH, U, DURATION }) => {
    // ===== c0 cold open =====
    ev.c0_card = hit(L('c0_1').t + 0.05, 'fwip', 0.8);                      // quote card slides up
    ev.c0_beeIn = hit(0.05, 'buzz', 0.7, -0.6);
    ev.c0_beeLand = hit(L('c0_1').t + 1.1, 'boing', 0.5, 0.1);
    ev.c0_quoteWords = L('c0_2').words.map((w) => w.t);
    ev.c0_four = hit(Wt('c0_2', 'four'), 'ding', 0.8, 0.2);
    ev.c0_sign = hit(Wt('c0_3', 'albert'), 'scribble', 0.7);
    ev.c0_signEnd = Wt('c0_3', 'einstein', 0, true);
    ev.sync_never = hit(Wt('c0_4', 'never'), 'stamp', 1);
    ev.c0_cross = hit(Wt('c0_4', 'said'), 'scribble', 0.6);
    ev.c0_t1955 = hit(L('c0_5').t + 0.2, 'fwip', 0.6, -0.4);
    ev.c0_mag = hit(Wt('c0_5', 'french'), 'whoosh', 0.6, 0.3);
    ev.c0_1965 = hit(Wt('c0_5', '1965'), 'ding', 0.8, 0.4);
    ev.c0_ten = hit(Wt('c0_5', 'ten'), 'pop', 0.7);
    ev.c0_swarm = L('c0_6').t;
    ev.c0_q = hit(Wt('c0_6', 'what'), 'swell', 0.5);
    // bees vanish one per 8th note-ish across "every bee disappeared"
    const v0 = Wt('c0_6', 'every'), v1 = Wt('c0_6', 'disappeared', 0, true);
    ev.c0_vanish = []; for (let i = 0; i < 12; i++) ev.c0_vanish.push(hit(v0 + (v1 - v0) * i / 12, 'pop', 0.45, -0.7 + 1.4 * U.hash(i, 77)));
    ev.c0_end = hit(Wt('c0_7', 'end'), 'boom', 0.5);
    ev.c0_scratch = hit(Wt('c0_7', 'more'), 'scratch', 0.6);
    ev.c0_cart = hit(Wt('c0_7', 'supermarket'), 'boing', 0.6, 0.3);
    // title sequence
    ev.title0 = L('c0_7').end + 0.45;
    ev.titleWords = ['WHAT', 'IF', 'EVERY', 'BEE', 'DISAPPEARED?'].map((w, i) => ({ w, t: hit(ev.title0 + 0.35 + i * 0.32, 'stamp', i === 3 ? 0.9 : 0.55, -0.4 + i * 0.2) }));
    ev.sync_title = ev.titleWords[3].t;
    ev.titleBrand = hit(ev.title0 + 2.4, 'chime', 0.6);


    // chapter cards: whoosh in + stamp on the number
    for (const c of ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7']) {
      const l = L(c + '_1'); ev[c + '_card'] = CH[c].t0; hit(CH[c].t0 + 0.05, 'whoosh', 0.6); ev[c + '_stamp'] = hit(CH[c].t0 + 0.35, 'stamp', 0.8);
      const h = L(c + '_1h'); ev[c + '_hook'] = h; hit(h.t - 0.05, 'fwip', 0.45);
      ev[c + '_cardOut'] = h.end + 0.5; hit(ev[c + '_cardOut'] - 0.35, 'whoosh', 0.4);
    }






    // ===== c7 real news =====
    ev.c7_s1 = ev.c7_cardOut - 0.1;
    ev.c7_line0 = Wt('c7_1b', 'last'); ev.c7_300 = hit(Wt('c7_1b', 'three'), 'ding', 0.7);
    ev.c7_more = hit(Wt('c7_1b', 'more'), 'swell', 0.5);
    ev.c7_s2 = L('c7_2').t - 0.15;
    ev.c7_q = hit(Wt('c7_2', 'disappearing'), 'pop', 0.5);
    ev.c7_not = hit(Wt('c7_2', 'not'), 'thud', 0.5);
    ev.c7_live = hit(Wt('c7_2', 'livestock'), 'fwip', 0.5);
    ev.c7_rep0 = Wt('c7_2', 'replace'); ev.c7_rep = [0, 1, 2].map((i) => hit(ev.c7_rep0 + i * 0.25, 'pop', 0.5, -0.4 + i * 0.4));
    ev.c7_s3 = L('c7_3').t - 0.15;
    ev.c7_wild = hit(Wt('c7_3', 'wild'), 'fwip', 0.5);
    ev.c7_40a = Wt('c7_3', 'more'); ev.c7_40 = hit(Wt('c7_3', 'percent'), 'ding', 0.6);
    ev.c7_ext = [0, 1, 2, 3].map((i) => hit(Wt('c7_3', 'extinction') + i * 0.15, 'drop', 0.35, -0.5 + i * 0.3));
    ev.c7_s4 = L('c7_4').t - 0.15;
    ev.c7_c = ['habitat', 'pesticide', 'climate'].map((w, i) => hit(Wt('c7_4', w), 'stamp', 0.55, -0.5 + i * 0.5));
    ev.c7_s5 = L('c7_5').t - 0.15;
    ev.c7_strip0 = L('c7_5').t + 0.3; { const z = Wt('c7_5', 'fewer') - 0.2; ev.c7_strip = []; for (let i = 0; i < 12; i++) ev.c7_strip.push(hit(ev.c7_strip0 + (z - ev.c7_strip0) * i / 11, 'chime', 0.22, -0.8 + i * 0.14)); }
    ev.c7_spray = hit(Wt('c7_5', 'fewer'), 'pop', 0.5);
    ev.c7_garden = hit(Wt('c7_5', 'corner'), 'fwip', 0.5);
    ev.c7_bees = [0, 1, 2, 3, 4].map((i) => hit(Wt('c7_5', 'wild') + 0.1 + i * 0.16, 'buzz', 0.25, -0.5 + i * 0.25));
    // ===== c8 payoff + end =====
    ev.c8_s1 = L('c8_1').t - 0.5; hit(ev.c8_s1, 'whoosh', 0.5);
    ev.c8_reason = hit(Wt('c8_1', 'reason'), 'chime', 0.5);
    ev.c8_s2 = L('c8_2').t - 0.2;
    ev.c8_dots = [0, 1, 2, 3, 4, 5, 6].map((i) => hit(Wt('c8_2', 'apples') + i * 0.35, 'chime', 0.3, -0.6 + i * 0.2));
    ev.c8_deliv = hit(Wt('c8_2', 'delivery'), 'pop', 0.6);
    ev.c8_s4 = L('c8_4').t - 0.3;
    ev.sync_logo = hit(Wt('c8_4', 'whyverse'), 'stamp', 0.8);
    ev.c8_tag = Wt('c8_4', 'big');
    ev.c8_cta = L('c8_5').t - 0.3;
    ev.c8_like = hit(Wt('c8_5', 'like'), 'pop', 0.7, -0.3);
    ev.c8_sub = hit(Wt('c8_5', 'subscribe'), 'stamp', 0.7, 0.1);
    ev.c8_ig = hit(Wt('c8_5', 'instagram'), 'pop', 0.6, -0.4);
    ev.c8_tt = hit(Wt('c8_5', 'tiktok'), 'pop', 0.6, 0.4);

    // ===== c6 other pollinators =====
    ev.c6_s1 = ev.c6_cardOut - 0.1;
    ev.c6_wait = hit(Wt('c6_2', 'wait'), 'boing', 0.6);
    ev.c6_only = hit(Wt('c6_2', 'only'), 'swell', 0.5);
    ev.c6_line = [0, 1, 2, 3, 4, 5].map((i) => hit(Wt('c6_2', 'pollinators') + i * 0.13, 'pop', 0.4, -0.6 + i * 0.25));
    ev.c6_s2 = L('c6_3').t - 0.15;
    ev.c6_choc = hit(Wt('c6_3', 'chocolate'), 'pop', 0.6);
    ev.c6_midge = hit(Wt('c6_3', 'midges'), 'whoosh', 0.5);
    ev.c6_mm = hit(Wt('c6_3', 'millimetres'), 'tick', 0.6);
    ev.c6_s3 = L('c6_4').t - 0.15;
    ev.c6_surv = hit(Wt('c6_4', 'survive'), 'stamp', 0.7);
    ev.c6_prob = hit(Wt('c6_4', 'probably'), 'boing', 0.45);
    ev.c6_s4 = L('c6_5').t - 0.15;
    ev.c6_par = ['flies', 'beetles', 'moths', 'butterflies', 'hummingbirds'].map((w, i) => hit(Wt('c6_5', w), 'pop', 0.5, -0.6 + i * 0.3));
    ev.c6_night = hit(Wt('c6_5', 'night'), 'swell', 0.5);
    ev.c6_bat = hit(Wt('c6_5', 'bats'), 'whoosh', 0.5, 0.4);
    ev.c6_agave = hit(Wt('c6_5', 'agave'), 'pop', 0.5, 0.4);
    ev.c6_s5 = L('c6_6').t - 0.15;
    ev.c6_young = hit(Wt('c6_6', 'young'), 'fwip', 0.5, -0.3);
    ev.c6_body = hit(Wt('c6_6', 'bodies'), 'swell', 0.5);
    ev.c6_coll = hit(Wt('c6_6', 'collect'), 'chime', 0.5);
    ev.c6_s6 = L('c6_7').t - 0.15;
    ev.c6_w = ['smaller', 'plainer', 'harder'].map((w, i) => hit(Wt('c6_7', w), 'stamp', 0.55, -0.5 + i * 0.5));

    // ===== c5 health bill =====
    ev.c5_s1 = ev.c5_cardOut - 0.1;
    ev.c5_money = hit(Wt('c5_2', 'money'), 'thud', 0.5, -0.3);
    ev.c5_health = hit(Wt('c5_2', 'health'), 'chime', 0.6, 0.3);
    ev.c5_s2 = L('c5_3').t - 0.15;
    ev.c5_2015 = hit(Wt('c5_3', '2015'), 'fwip', 0.5);
    ev.c5_gone0 = Wt('c5_3', 'every'); ev.c5_gone = [0, 1, 2, 3, 4, 5].map((i) => hit(Wt('c5_3', 'gone') + i * 0.14, 'pop', 0.4, -0.6 + i * 0.25));
    ev.c5_all = hit(Wt('c5_3', 'all'), 'stamp', 0.6);
    ev.c5_s3 = L('c5_4').t - 0.15;
    ev.c5_drop = [hit(Wt('c5_4', 'fell'), 'drop', 0.5, -0.5), hit(Wt('c5_4', 'vegetables'), 'drop', 0.5, 0), hit(Wt('c5_4', 'nuts'), 'drop', 0.5, 0.5)];
    ev.c5_s4 = L('c5_5').t - 0.15;
    ev.c5_71a = Wt('c5_5', 'seventy'); ev.c5_71 = hit(Wt('c5_5', 'people'), 'ding', 0.6, -0.4);
    ev.c5_173a = Wt('c5_5', 'hundred'); ev.c5_173 = hit(Wt('c5_5', 'folate'), 'ding', 0.6, 0.4);
    ev.c5_s5 = L('c5_5b').t - 0.15;
    ev.c5_22a = Wt('c5_5b', 'two'); ev.c5_22 = hit(Wt('c5_5b', 'billion'), 'swell', 0.6);
    ev.c5_s6 = L('c5_6').t - 0.15;
    ev.c5_dis = ['heart', 'strokes', 'diabetes', 'cancers'].map((w, i) => hit(Wt('c5_6', w), 'pop', 0.5, -0.6 + i * 0.4));
    ev.c5_s7 = L('c5_7').t - 0.15;
    ev.c5_14a = Wt('c5_7', 'about'); ev.c5_14 = hit(Wt('c5_7', 'deaths'), 'ding', 0.7);
    ev.c5_3pc = hit(Wt('c5_7', 'three'), 'thud', 0.5);
    ev.c5_s8 = L('c5_7b').t - 0.15;
    ev.c5_model = hit(Wt('c5_7b', 'model'), 'stamp', 0.5);
    ev.c5_dir = hit(Wt('c5_7b', 'direction'), 'whoosh', 0.4);
    ev.c5_s9 = L('c5_8').t - 0.15;
    ev.c5_2022 = hit(Wt('c5_8', '2022'), 'fwip', 0.5);
    ev.c5_35 = hit(Wt('c5_8', 'three'), 'thud', 0.6);
    ev.c5_s10 = L('c5_9').t - 0.15;
    ev.c5_427a = Wt('c5_9', 'about'); ev.c5_427 = hit(Wt('c5_9', 'excess'), 'ding', 0.7);
    ev.sync_now = hit(Wt('c5_9', 'now'), 'stamp', 1);

    // ===== c4 California almonds =====
    ev.c4_s1 = ev.c4_cardOut - 0.1;
    ev.c4_ca = hit(Wt('c4_2', 'california'), 'stamp', 0.6);
    ev.c4_s2 = L('c4_3').t - 0.15;
    ev.c4_valley = hit(Wt('c4_3', 'valley'), 'swell', 0.5);
    ev.c4_orch = Wt('c4_3', 'almond', 1);
    ev.c4_acre0 = Wt('c4_3', 'two'); ev.c4_acres = []; for (let i = 0; i < 8; i++) ev.c4_acres.push(hit(ev.c4_acre0 + i * 0.11, 'pop', 0.35, -0.7 + i * 0.2));
    ev.c4_s3 = L('c4_4').t - 0.15;
    ev.c4_load = hit(Wt('c4_4', 'load'), 'thud', 0.5);
    ev.c4_drive = hit(Wt('c4_4', 'drive'), 'truck', 0.6);
    ev.c4_arrive = []; for (let i = 0; i < 8; i++) ev.c4_arrive.push(hit(ev.c4_drive + 1.4 + i * 0.22, 'pop', 0.4, 0.5));
    ev.c4_s4 = L('c4_5').t - 0.15;
    ev.c4_m0 = Wt('c4_5', 'growers'); ev.c4_m = hit(Wt('c4_5', 'colonies'), 'ding', 0.8, -0.3);
    ev.c4_jan = hit(Wt('c4_5', 'entire'), 'ding', 0.6, 0.3);
    ev.c4_s5 = L('c4_6').t - 0.15;
    ev.c4_rent0 = Wt('c4_6', 'about'); ev.c4_rent = hit(Wt('c4_6', 'dollars'), 'coin', 0.7);
    ev.c4_weeks = hit(Wt('c4_6', 'weeks'), 'fwip', 0.5);
    ev.c4_s6 = L('c4_7').t - 0.15;
    ev.c4_usd0 = Wt('c4_7', 'more'); ev.c4_usd = hit(Wt('c4_7', 'dollars'), 'coin', 0.8);
    ev.c4_80 = hit(Wt('c4_7', 'eighty'), 'swell', 0.5);
    ev.c4_s7 = L('c4_8').t - 0.15;
    ev.c4_w = ['one', 'one', 'almost'].map((w, i) => hit(Wt('c4_8', w, i === 1 ? 1 : 0), 'stamp', 0.6, -0.5 + i * 0.5));

    // ===== c3 Maoxian =====
    ev.c3_s1 = ev.c3_cardOut - 0.1;
    ev.c3_map = hit(Wt('c3_2', 'mountains'), 'whoosh', 0.4);
    ev.c3_china = hit(Wt('c3_2', 'china'), 'stamp', 0.5);
    ev.c3_pin = hit(Wt('c3_2', 'sichuan'), 'pop', 0.7, 0.2);
    ev.c3_s2 = L('c3_3').t - 0.15;
    ev.c3_bloom = Wt('c3_3', 'bloom'); ev.c3_blooms = [0, 1, 2, 3, 4].map((i) => hit(ev.c3_bloom + i * 0.12, 'chime', 0.25, -0.6 + i * 0.3));
    ev.c3_insects = hit(Wt('c3_3', 'insects'), 'thud', 0.45);
    ev.c3_s3 = L('c3_4').t - 0.15;
    ev.c3_spr0 = Wt('c3_4', 'sprayed'); ev.c3_sprays = []; for (let i = 0; i < 10; i++) ev.c3_sprays.push(hit(ev.c3_spr0 + i * 0.2, 'spray', 0.3, -0.5 + (i % 2)));
    ev.c3_decades = hit(Wt('c3_4', 'decades'), 'stamp', 0.5);
    ev.c3_farm0 = Wt('c3_4', 'forests'); ev.c3_farm = hit(Wt('c3_4', 'farmland'), 'thud', 0.5);
    ev.c3_s4 = L('c3_5').t - 0.15;
    ev.c3_80s = hit(Wt('c3_5', 'late'), 'stamp', 0.6);
    ev.c3_people = hit(Wt('c3_5', 'people'), 'fwip', 0.5);
    ev.c3_s5 = L('c3_6').t - 0.15;
    ev.c3_collect = hit(Wt('c3_6', 'collected'), 'pop', 0.5, -0.5);
    ev.c3_stock = hit(Wt('c3_6', 'stock'), 'pop', 0.5, 0);
    ev.c3_climb = hit(Wt('c3_6', 'climbed'), 'fwip', 0.5, 0.4);
    ev.c3_dab0 = Wt('c3_6', 'dab'); ev.c3_dabs = []; for (let i = 0; i < 8; i++) ev.c3_dabs.push(hit(ev.c3_dab0 + i * 0.36, 'tick', 0.45, 0.2 + 0.05 * i));
    ev.c3_s6 = L('c3_7').t - 0.15;
    ev.c3_2001 = hit(Wt('c3_7', '2001'), 'fwip', 0.5);
    ev.c3_100 = hit(Wt('c3_7', 'every'), 'stamp', 0.9);
    ev.c3_s7 = L('c3_8').t - 0.15;
    ev.c3_clock = Wt('c3_8', 'clock');
    ev.c3_days = [0, 1, 2, 3, 4].map((i) => { const a = Wt('c3_8', 'flowers'), b = Wt('c3_8', 'days'); return hit(a + (b - a) * i / 4, 'tick', 0.55); });
    ev.c3_s8 = L('c3_9').t - 0.15;
    ev.c3_trees = []; { const a = Wt('c3_9', 'five'), b = Wt('c3_9', 'ten'); for (let i = 0; i < 5; i++) ev.c3_trees.push(hit(a + i * 0.1, 'pop', 0.4, -0.6 + i * 0.12)); for (let i = 5; i < 10; i++) ev.c3_trees.push(hit(b + (i - 5) * 0.1, 'pop', 0.35, 0 + (i - 5) * 0.12)); }
    ev.c3_s9 = L('c3_10').t - 0.15;
    ev.c3_city = hit(Wt('c3_10', 'cities'), 'whoosh', 0.45, 0.5);
    ev.c3_ten = hit(Wt('c3_10', 'tenfold'), 'stamp', 0.7);
    ev.c3_cost0 = Wt('c3_10', 'twelve'); ev.c3_cost = hit(Wt('c3_10', 'dollars'), 'coin', 0.6);
    ev.c3_s10 = L('c3_11').t - 0.15;
    ev.c3_swap = ['plums', 'loquats', 'walnuts'].map((w, i) => hit(Wt('c3_11', w), 'pop', 0.6, -0.5 + i * 0.5));
    ev.c3_giveup = hit(Wt('c3_11', 'apples'), 'thud', 0.4);
    ev.c3_s11 = L('c3_11b').t - 0.15;
    ev.c3_pa = hit(Wt('c3_11b', 'twenty'), 'coin', 0.4, -0.4);
    ev.c3_pp = hit(Wt('c3_11b', 'two'), 'coin', 0.7, 0.4);
    ev.c3_s12 = L('c3_12').t - 0.15;
    ev.c3_w = ['slowly', 'expensively', 'long'].map((w) => hit(Wt('c3_12', w), 'stamp', 0.5));

    // ===== c2 supermarket =====
    ev.c2_s1 = ev.c2_cardOut - 0.1;
    ev.c2_gone = hit(Wt('c2_2', 'gone'), 'pop', 0.7, 0.5);
    ev.c2_s2 = L('c2_3').t - 0.2;
    ev.c2_87a = L('c2_3').t + 0.2; ev.c2_87 = hit(Wt('c2_3', 'eighty'), 'ding', 0.7, -0.4);
    ev.c2_28 = hit(Wt('c2_3', 'twenty'), 'ding', 0.6, 0.4);
    ev.c2_s3 = L('c2_3b').t - 0.2;
    ev.c2_threeq = hit(Wt('c2_3b', 'three'), 'swell', 0.5);
    ev.c2_bn0 = Wt('c2_3b', 'worth'); ev.c2_bn = hit(Wt('c2_3b', 'billion'), 'coin', 0.6);
    ev.c2_s4 = L('c2_4').t - 0.2;
    ev.c2_fruit = ['apples', 'pears', 'cherries', 'melons', 'blueberries'].map((w, i) => hit(Wt('c2_4', w), 'pop', 0.55, -0.6 + i * 0.3));
    ev.c2_price = hit(Wt('c2_4', 'expensive'), 'coin', 0.6, 0.3);
    ev.c2_fewer = Wt('c2_4', 'fewer');
    ev.c2_veg0 = L('c2_5').t;
    ev.c2_veg = ['pumpkins', 'cucumbers', 'carrots', 'onions'].map((w, i) => hit(Wt('c2_5', w), 'pop', 0.55, -0.4 + i * 0.3));
    ev.c2_seeds = hit(Wt('c2_5', 'seeds'), 'fwip', 0.5);
    ev.c2_nut0 = L('c2_6').t;
    ev.c2_almond = hit(Wt('c2_6', 'almonds'), 'thud', 0.6);
    ev.c2_coffee = hit(Wt('c2_6', 'coffee'), 'pop', 0.55, 0.4);
    ev.c2_whip = hit(Wt('c2_7', 'look'), 'whoosh', 0.7);
    ev.c2_s6 = Wt('c2_7', 'look') + 0.05;
    ev.c2_carb = ['bread', 'rice', 'pasta', 'cornflakes'].map((w, i) => hit(Wt('c2_8', w), 'stamp', 0.45, -0.5 + i * 0.33));
    ev.c2_wind = hit(Wt('c2_8', 'wind'), 'wind', 0.6);
    ev.c2_single = hit(Wt('c2_8', 'single'), 'ding', 0.5);
    ev.c2_s7 = L('c2_9').t - 0.2;
    ev.c2_60 = hit(Wt('c2_9', 'sixty'), 'stamp', 0.6, -0.3);
    ev.c2_35 = hit(Wt('c2_9', 'thirty'), 'stamp', 0.6, 0.3);
    ev.c2_s8 = L('c2_10').t - 0.2;
    ev.c2_cal = hit(Wt('c2_10', 'calories'), 'ding', 0.5, -0.4);
    ev.c2_colour = hit(Wt('c2_10', 'colour'), 'thud', 0.6, 0.4);
    ev.c2_fade = Wt('c2_10', 'fade');
    ev.c2_vit = hit(Wt('c2_10', 'vitamins'), 'fwip', 0.5);

    // ===== c1 what a bee does =====
    ev.c1_s1 = ev.c1_cardOut - 0.1;
    ev.c1_land = hit(Wt('c1_2', 'help') , 'boing', 0.45, 0.1);
    ev.c1_shop = hit(Wt('c1_2', 'shopping'), 'pop', 0.7, 0.2);
    ev.c1_nectar = hit(Wt('c1_2', 'nectar'), 'fwip', 0.7, -0.3);
    ev.c1_pollen = hit(Wt('c1_2', 'pollen'), 'fwip', 0.7, 0.3);
    ev.c1_s2 = L('c1_3').t - 0.25;
    ev.c1_sticky = hit(Wt('c1_3', 'sticky'), 'pop', 0.5, -0.3);
    ev.c1_fuzzy = hit(Wt('c1_3', 'fuzzy'), 'pop', 0.5, 0.3);
    ev.c1_fly0 = hit(Wt('c1_3', 'golden'), 'buzz', 0.6, -0.5);
    ev.c1_fly1 = hit(Wt('c1_3', 'next'), 'chime', 0.6, 0.5);
    ev.c1_s3 = L('c1_4').t - 0.25;
    ev.c1_stampPoll = hit(Wt('c1_4', 'pollination'), 'stamp', 0.6);
    ev.c1_grain = hit(Wt('c1_4', 'reaches'), 'pop', 0.6);
    ev.c1_tube = Wt('c1_4', 'same');
    ev.c1_swell = hit(Wt('c1_4', 'swell'), 'swell', 0.6);
    ev.c1_seeds = [0, 1, 2, 3, 4].map((i) => hit(Wt('c1_4', 'seeds') + i * 0.1, 'tick', 0.5, -0.3 + i * 0.15));
    ev.c1_s4 = L('c1_5').t - 0.25;
    ev.c1_nodel = hit(Wt('c1_5', 'no'), 'thud', 0.6);
    ev.c1_small = hit(Wt('c1_5', 'smaller'), 'pop', 0.6, -0.5);
    ev.c1_mis = hit(Wt('c1_5', 'misshapen'), 'pop', 0.6, 0);
    ev.c1_none = hit(Wt('c1_5', 'no', 1), 'thud', 0.7, 0.5);
    ev.c1_s5 = L('c1_6').t - 0.25;
    ev.c1_count0 = Wt('c1_6', 'about'); ev.c1_count1 = hit(Wt('c1_6', 'species'), 'ding', 0.7);
    ev.c1_bees = []; for (let i = 0; i < 9; i++) ev.c1_bees.push(hit(ev.c1_count0 + i * 0.22, 'pop', 0.3, -0.8 + i * 0.2));
    ev.c1_bumble = hit(Wt('c1_6', 'bumblebees'), 'boing', 0.5, -0.4);
    ev.c1_rice = hit(Wt('c1_6', 'rice'), 'pop', 0.6, 0.4);
    ev.c1_s6 = L('c1_7').t - 0.25;
    ev.c1_jar = hit(Wt('c1_7', 'jar'), 'pop', 0.6);
    ev.c1_one = hit(Wt('c1_7', 'one'), 'ding', 0.6);

    if (globalThis.EVENTS_MORE) for (const f of globalThis.EVENTS_MORE) f({ L, Wt, next, ev, hit, CH, U, DURATION });
    if (typeof module !== 'undefined') for (const f of (module.exports.more || [])) f({ L, Wt, next, ev, hit, CH, U, DURATION });
  };
  if (typeof module !== 'undefined') module.exports = build; else globalThis.EVENTS = build;
})();
