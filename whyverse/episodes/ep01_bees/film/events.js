// EVENTS — every named visual hit and its sound, per chapter. Called by score.js (Node + browser).
(function () {
  const build = ({ L, Wt, next, ev, hit, CH, U, DURATION }) => {
    // ===== c0 cold open =====
    ev.c0_card = hit(L('c0_1').t + 0.05, 'fwip', 0.8);                      // quote card slides up
    ev.c0_beeIn = hit(0.25, 'buzz', 0.7, -0.6);
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
      const l = L(c + '_1'); ev[c + '_card'] = CH[c].t0; hit(CH[c].t0 + 0.05, 'whoosh', 0.6); ev['sync_' + c] = hit(CH[c].t0 + 0.55, 'stamp', 0.8);
      ev[c + '_cardOut'] = l.end + 0.55; hit(ev[c + '_cardOut'] - 0.35, 'whoosh', 0.4);
    }

    // ===== c2 supermarket =====
    ev.c2_s1 = ev.c2_cardOut - 0.1;
    ev.c2_gone = hit(Wt('c2_2', 'gone'), 'pop', 0.7, 0.5);
    ev.c2_s2 = L('c2_3').t - 0.2;
    ev.c2_87a = Wt('c2_3', 'found'); ev.c2_87 = hit(Wt('c2_3', 'eighty'), 'ding', 0.7, -0.4);
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
