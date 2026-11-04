// EVENTS — every named visual hit and its sound, per chapter. Called by score.js (Node + browser).
// hit(t, kind, gain, pan) registers a sound effect at t and returns t, so the picture uses the same number.
(function () {
  const build = ({ L, Wt, next, ev, hit, CH, U, DURATION }) => {
    const S = (id, d = 0.25) => L(id).t - d; // a shot that starts just before a line
    // ===== c0 cold open =====
    ev.c0_s1 = 0;
    ev.c0_vanish = hit(Wt('c0_1', 'gone'), 'vanish', 1.0);
    ev.sync_vanish = ev.c0_vanish;
    ev.c0_now = hit(Wt('c0_1', 'right'), 'tick', 0.6);
    ev.c0_timer0 = Wt('c0_2', 'first'); ev.c0_timer1 = hit(Wt('c0_2', 'seconds', 0, true), 'ding', 0.6);
    ev.c0_beam = hit(Wt('c0_3', 'last'), 'zap', 0.6);
    ev.c0_beamHit = Wt('c0_3', 'eyes');
    ev.c0_off = hit(Wt('c0_3', 'switches'), 'switch', 0.9);
    ev.c0_s2 = S('c0_4');
    ev.c0_lunaIn = hit(L('c0_4').t - 0.1, 'boing', 0.6);
    ev.c0_thought = hit(Wt('c0_4', 'thought'), 'stamp', 0.7);
    ev.c0_s3 = S('c0_5');
    ev.c0_icons = ['tides', 'nights', 'reef', 'seasons'].map((w, i) => hit(Wt('c0_5', w), 'blip', 0.6, -0.5 + i * 0.33));
    ev.c0_s4 = S('c0_6', 0.75);
    ev.c0_q = hit(Wt('c0_6', 'what'), 'swell', 0.5);
    // title sequence (no voice): five stamped words, then the brand
    ev.title0 = L('c0_6').end + 0.35;
    ev.titleWords = ['WHAT', 'IF', 'THE', 'MOON', 'DISAPPEARED?'].map((w, i) => ({ w, t: hit(ev.title0 + 0.35 + i * 0.34, 'stamp', i === 3 ? 0.9 : 0.55, -0.4 + i * 0.2) }));
    ev.sync_title = ev.titleWords[3].t;
    ev.titlePop = hit(ev.titleWords[4].t + 0.75, 'vanish', 0.7);
    ev.titleBrand = hit(ev.title0 + 2.6, 'chime', 0.6);

    // chapter cards: whoosh in + stamp on the number, hook line, card out
    for (const c of ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7']) {
      ev[c + '_card'] = CH[c].t0; hit(CH[c].t0 + 0.05, 'whoosh', 0.6); ev[c + '_stamp'] = hit(CH[c].t0 + 0.4, 'stamp', 0.8);
      const h = L(c + '_1h'); ev[c + '_hook'] = h; hit(h.t - 0.05, 'fwip', 0.45);
      ev[c + '_cardOut'] = h.end + 0.5; hit(ev[c + '_cardOut'] - 0.35, 'whoosh', 0.4);
    }

    // ===== c1 the night goes dark =====
    ev.c1_s1 = ev.c1_cardOut - 0.1;                                        // moon close-up + albedo meter
    ev.c1_tenth = hit(Wt('c1_2', 'tenth'), 'ding', 0.6);
    ev.c1_asphalt = hit(Wt('c1_2', 'bright'), 'pop', 0.5);
    ev.c1_black = hit(Wt('c1_2', 'black'), 'drop', 0.4);
    ev.c1_s2 = S('c1_3');                                                   // lux meter
    ev.c1_lux = hit(Wt('c1_3', 'lux'), 'blip', 0.6);
    ev.c1_sun0 = Wt('c1_3', 'sun'); ev.c1_sun1 = hit(Wt('c1_3', 'brighter'), 'ding', 0.7);
    ev.c1_s3 = S('c1_4');                                                   // landscape at night, moon fades
    ev.c1_fade = hit(Wt('c1_4', 'without'), 'swell', 0.4);
    ev.c1_forever = hit(Wt('c1_4', 'forever'), 'stamp', 0.6);
    ev.c1_lamps = [0, 1, 2, 3, 4, 5].map((i) => hit(Wt('c1_4', 'lamps') + i * 0.12, 'tick', 0.35, -0.6 + i * 0.24));
    ev.c1_s4 = S('c1_5');                                                   // dung beetle
    ev.c1_map = hit(Wt('c1_5', 'map'), 'pop', 0.6);
    ev.c1_africa = hit(Wt('c1_6', 'africa'), 'blip', 0.5);
    ev.c1_roll = Wt('c1_6', 'roll');
    ev.c1_pol = hit(Wt('c1_6', 'polarized'), 'shimmer', 0.6);
    ev.c1_first = hit(Wt('c1_6', 'first'), 'stamp', 0.6);
    ev.c1_s5 = S('c1_7');                                                   // arctic zooplankton
    ev.c1_arctic = hit(Wt('c1_7', 'arctic'), 'wind', 0.4);
    ev.c1_months = Wt('c1_7', 'months');
    ev.c1_up = hit(Wt('c1_7', 'swim'), 'bubble', 0.5);
    ev.c1_moonOn = hit(Wt('c1_7', 'moon'), 'shimmer', 0.5);

    // ===== c2 tides =====
    ev.c2_s1 = ev.c2_cardOut - 0.1;                                         // 3D: Earth + bulge + pull arrows
    ev.c2_near = hit(Wt('c2_2', 'harder'), 'blip', 0.6, -0.3);
    ev.c2_far = hit(Wt('c2_2', 'less'), 'blip', 0.5, 0.3);
    ev.c2_bulge = hit(Wt('c2_2', 'bulge'), 'swell', 0.6);
    ev.c2_s2 = S('c2_3');                                                   // spin under the bulges
    ev.c2_spin = Wt('c2_3', 'spins');
    ev.c2_two = hit(Wt('c2_3', 'two'), 'ding', 0.6);
    ev.c2_highs = [0, 1].map((i) => hit(Wt('c2_3', 'high') + i * 0.35, 'splash', 0.45, -0.3 + i * 0.6));
    ev.c2_s3 = S('c2_4');                                                   // moon vs sun tug bars
    ev.c2_sunBar = hit(Wt('c2_4', 'sun'), 'blip', 0.5);
    ev.c2_half = hit(Wt('c2_4', 'half'), 'ding', 0.6);
    ev.c2_s4 = S('c2_5');                                                   // tide gauge shrinks
    ev.c2_stop = hit(Wt('c2_5', 'stop'), 'thud', 0.5);
    ev.c2_third = hit(Wt('c2_5', 'third'), 'drop', 0.6);
    ev.c2_s5 = S('c2_6');                                                   // Bay of Fundy
    ev.c2_fundy = hit(Wt('c2_6', 'fundy'), 'pop', 0.5);
    ev.c2_rise0 = Wt('c2_6', 'rise'); ev.c2_16 = hit(Wt('c2_6', 'sixteen'), 'ding', 0.7);
    ev.c2_over = hit(Wt('c2_6', 'over'), 'drop', 0.6);
    ev.c2_s6 = S('c2_7');                                                   // intertidal strip
    ev.c2_life = ['crabs', 'mussels', 'seaweed', 'shorebirds'].map((w, i) => hit(Wt('c2_7', w), 'pop', 0.5, -0.5 + i * 0.33));
    ev.c2_narrow = hit(Wt('c2_7', 'narrower'), 'swell', 0.5);

    // ===== c3 the reef =====
    ev.c3_s1 = ev.c3_cardOut - 0.1;                                         // map + calendar
    ev.c3_aus = hit(Wt('c3_2', 'australia'), 'pop', 0.6);
    ev.c3_gbr = hit(Wt('c3_2', 'reef'), 'shimmer', 0.5);
    ev.c3_nights = hit(Wt('c3_2', 'one'), 'blip', 0.5);
    ev.c3_months = ['october', 'november', 'december'].map((w, i) => hit(Wt('c3_2', w), 'tick', 0.5, -0.4 + i * 0.4));
    ev.c3_s2 = S('c3_3');                                                   // spawning snow upwards
    ev.c3_spawn = hit(Wt('c3_3', 'float'), 'bubble', 0.7);
    ev.c3_snow = hit(Wt('c3_3', 'snow'), 'chime', 0.5);
    ev.c3_s3 = S('c3_4');                                                   // two corals, timing
    ev.c3_cant = hit(Wt('c3_4', 'move'), 'thud', 0.4);
    ev.c3_timing = hit(Wt('c3_4', 'timing'), 'tick', 0.6);
    ev.c3_meet = hit(Wt('c3_4', 'meet'), 'chime', 0.6);
    ev.c3_s4 = S('c3_5');                                                   // season + night
    ev.c3_warm = hit(Wt('c3_5', 'warm'), 'blip', 0.5, -0.4);
    ev.c3_night = hit(Wt('c3_5', 'night'), 'blip', 0.5, 0.4);
    ev.c3_now = hit(Wt('c3_5', 'now'), 'stamp', 0.6);
    ev.c3_s5 = S('c3_6');                                                   // clocks drift apart
    ev.c3_lose = hit(Wt('c3_6', 'lose'), 'drop', 0.5);
    ev.c3_apart = hit(Wt('c3_6', 'apart'), 'thud', 0.5);

    // ===== c4 tilt =====
    ev.c4_s1 = ev.c4_cardOut - 0.1;                                         // 3D Earth + axis + 23.4
    ev.c4_axis = hit(Wt('c4_2', 'tilted'), 'whoosh', 0.4);
    ev.c4_234 = hit(Wt('c4_2', 'half'), 'ding', 0.6);
    ev.c4_seasons = hit(Wt('c4_2', 'summer'), 'blip', 0.5);
    ev.c4_s2 = S('c4_3');                                                   // gauge 22.1–24.5 over 41,000 years
    ev.c4_band = hit(Wt('c4_3', 'between'), 'blip', 0.5);
    ev.c4_41k0 = Wt('c4_3', 'over'); ev.c4_41k = hit(Wt('c4_3', 'years'), 'ding', 0.6);
    ev.c4_s3 = S('c4_4');                                                   // Laskar 1993: chaos 0–85
    ev.c4_1993 = hit(Wt('c4_4', '1993'), 'stamp', 0.6);
    ev.c4_alarm = hit(Wt('c4_4', 'alarming'), 'alarm', 0.5);
    ev.c4_chaos = hit(Wt('c4_4', 'swing'), 'swell', 0.6);
    ev.c4_85 = hit(Wt('c4_4', 'eighty'), 'ding', 0.7);
    ev.c4_s4 = S('c4_5');                                                   // Earth on its side
    ev.c4_day = hit(Wt('c4_5', 'day'), 'blip', 0.5, -0.3);
    ev.c4_night = hit(Wt('c4_5', 'night'), 'drop', 0.5, 0.3);
    ev.c4_s5 = S('c4_6');                                                   // Lissauer 2012: narrower band
    ev.c4_2012 = hit(Wt('c4_6', '2012'), 'stamp', 0.6);
    ev.c4_band2 = hit(Wt('c4_6', 'twenty'), 'blip', 0.6);
    ev.c4_hundreds = hit(Wt('c4_6', 'hundreds'), 'tick', 0.5);
    ev.c4_s6 = S('c4_7');                                                   // verdict
    ev.c4_yes = hit(Wt('c4_7', 'yes'), 'ding', 0.6, -0.3);
    ev.c4_maybe = hit(Wt('c4_7', 'maybe'), 'boing', 0.5, 0.3);
    ev.c4_stab = hit(Wt('c4_7', 'stabilizer'), 'pop', 0.5);

    // ===== c5 the brake =====
    ev.c5_s1 = ev.c5_cardOut - 0.1;                                         // 3D top-down: bulge ahead of the Moon
    ev.c5_ahead = hit(Wt('c5_2', 'ahead'), 'whoosh', 0.5);
    ev.c5_s2 = S('c5_3');
    ev.c5_tug = hit(Wt('c5_3', 'tugs'), 'thud', 0.5);
    ev.c5_brake = hit(Wt('c5_3', 'brake'), 'brake', 0.7);
    ev.c5_s3 = S('c5_4');                                                   // day length timeline
    ev.c5_620 = hit(Wt('c5_4', 'six'), 'blip', 0.5, -0.2);
    ev.c5_22 = hit(Wt('c5_4', 'twenty'), 'ding', 0.6);
    ev.c5_14 = hit(Wt('c5_4', 'one'), 'blip', 0.5, 0.2);
    ev.c5_18 = hit(Wt('c5_4', 'eighteen'), 'ding', 0.6);
    ev.c5_s4 = S('c5_5');                                                   // stopwatch +0.002 s
    ev.c5_ms = hit(Wt('c5_5', 'thousandths'), 'tick', 0.7);
    ev.c5_century = hit(Wt('c5_5', 'century'), 'ding', 0.5);
    ev.c5_s5 = S('c5_6');                                                   // brake off, sun gentler
    ev.c5_off = hit(Wt('c5_6', 'off'), 'release', 0.7);
    ev.c5_gentle = hit(Wt('c5_6', 'gently'), 'chime', 0.4);
    ev.c5_s6 = S('c5_7');                                                   // spin → orbit, moon drifts
    ev.c5_twist = hit(Wt('c5_7', 'twist'), 'stamp', 0.5);
    ev.c5_into = hit(Wt('c5_7', 'into'), 'swell', 0.5);
    ev.c5_drift = hit(Wt('c5_7', 'drifting'), 'whoosh', 0.5);

    // ===== c6 the things we'd lose =====
    ev.c6_s1 = ev.c6_cardOut - 0.1;                                         // 400 × 400
    ev.c6_wider = hit(Wt('c6_2', 'wider'), 'ding', 0.6, -0.3);
    ev.c6_farther = hit(Wt('c6_2', 'farther'), 'ding', 0.6, 0.3);
    ev.c6_same = hit(Wt('c6_2', 'same'), 'pop', 0.6);
    ev.c6_s2 = S('c6_3');                                                   // eclipse + corona
    ev.c6_cover = hit(Wt('c6_3', 'cover'), 'swell', 0.6);
    ev.sync_totality = hit(Wt('c6_3', 'glowing'), 'shimmer', 0.8);
    ev.c6_s3 = S('c6_4');                                                   // helium
    ev.c6_1868 = hit(Wt('c6_4', '1868'), 'stamp', 0.6);
    ev.c6_line = hit(Wt('c6_4', 'yellow'), 'zap', 0.6);
    ev.c6_he = hit(Wt('c6_4', 'helium'), 'ding', 0.7);
    ev.c6_s4 = S('c6_5');                                                   // 1919 starlight bending
    ev.c6_1919 = hit(Wt('c6_5', '1919'), 'stamp', 0.6);
    ev.c6_bend = hit(Wt('c6_5', 'bending'), 'swell', 0.5);
    ev.c6_einstein = hit(Wt('c6_5', 'einstein'), 'ding', 0.6);
    ev.c6_s5 = S('c6_6');                                                   // month ← moon, Hijri
    ev.c6_month = hit(Wt('c6_6', 'month'), 'pop', 0.6);
    ev.c6_moonw = hit(Wt('c6_6', 'moon'), 'chime', 0.5);
    ev.c6_islamic = hit(Wt('c6_6', 'islamic'), 'blip', 0.5);
    ev.c6_354 = hit(Wt('c6_6', 'three'), 'ding', 0.6);
    ev.c6_s6 = S('c6_7');                                                   // 12 moonwalkers + Artemis II
    ev.c6_twelve0 = Wt('c6_7', 'twelve');
    ev.c6_walkers = []; for (let i = 0; i < 12; i++) ev.c6_walkers.push(hit(ev.c6_twelve0 + i * 0.11, 'tick', 0.35, -0.7 + i * 0.12));
    ev.c6_april = hit(Wt('c6_7', 'april'), 'blip', 0.5);
    ev.c6_artemis = hit(Wt('c6_7', 'artemis'), 'whoosh', 0.6);
    ev.c6_nowhere = hit(Wt('c6_7', 'nowhere'), 'drop', 0.5);

    // ===== c7 the real news =====
    ev.c7_s1 = ev.c7_cardOut - 0.1;                                         // laser to the mirrors
    ev.c7_mirrors = hit(Wt('c7_2', 'mirrors'), 'pop', 0.5);
    ev.c7_laser = hit(Wt('c7_2', 'lasers'), 'zap', 0.7);
    ev.c7_trip = hit(Wt('c7_2', 'round'), 'blip', 0.6);
    ev.c7_s2 = S('c7_3');                                                   // 3.8 cm/yr + fingernail
    ev.c7_38 = hit(Wt('c7_3', 'three'), 'ding', 0.7);
    ev.c7_nail = hit(Wt('c7_3', 'fingernails'), 'pop', 0.5);
    ev.c7_s3 = S('c7_4');                                                   // Theia impact, close Moon
    ev.c7_theia = hit(Wt('c7_4', 'theia'), 'whoosh', 0.6);
    ev.sync_impact = hit(Wt('c7_4', 'smashed'), 'impact', 1.0);
    ev.c7_closer = hit(Wt('c7_4', 'closer'), 'ding', 0.6);
    ev.c7_s4 = S('c7_5');                                                   // shrinking Moon vs Sun
    ev.c7_600 = hit(Wt('c7_5', 'six'), 'blip', 0.6);
    ev.c7_small = hit(Wt('c7_5', 'small'), 'drop', 0.5);
    ev.c7_end = hit(Wt('c7_5', 'disappear'), 'vanish', 0.5);
    ev.c7_s5 = S('c7_6');                                                   // won't escape, Sun changes
    ev.c7_escape = hit(Wt('c7_6', 'escape'), 'thud', 0.5);
    ev.c7_sun = hit(Wt('c7_6', 'sun'), 'swell', 0.5);

    // ===== c8 payoff + end card =====
    ev.c8_s1 = S('c8_1', 0.6);
    ev.c8_back = hit(L('c8_1').t + 0.2, 'shimmer', 0.6);
    ev.c8_adj = ['darker', 'quieter', 'wobblier'].map((w, i) => hit(Wt('c8_1', w), 'stamp', 0.5, -0.4 + i * 0.4));
    ev.c8_s2 = S('c8_2');
    ev.c8_list = ['tides', 'eclipses', 'clock'].map((w, i) => hit(Wt('c8_2', w), 'pop', 0.55, -0.4 + i * 0.4));
    ev.c8_s3 = S('c8_3');
    ev.c8_born = hit(Wt('c8_3', 'born'), 'chime', 0.5);
    ev.c8_s4 = S('c8_4');
    ev.c8_nov = hit(Wt('c8_4', 'november'), 'ding', 0.6, -0.3);
    ev.c8_dec = hit(Wt('c8_4', 'christmas'), 'ding', 0.6, 0.3);
    ev.c8_look = hit(Wt('c8_4', 'look'), 'swell', 0.4);
    ev.c8_thanks = hit(Wt('c8_4', 'thanks'), 'chime', 0.6);
    ev.c8_s5 = S('c8_5', 0.5);
    ev.sync_logo = hit(L('c8_5').t - 0.3, 'chime', 0.6);
    ev.c8_like = hit(Wt('c8_5', 'like'), 'pop', 0.7, -0.3);
    ev.c8_sub = hit(Wt('c8_5', 'subscribe'), 'click', 0.8, 0.2);
    ev.c8_ig = hit(Wt('c8_5', 'instagram'), 'pop', 0.6, -0.3);
    ev.c8_tt = hit(Wt('c8_5', 'tiktok'), 'pop', 0.6, 0.3);

    // ===== extra lines =====
    ev.c1_astro = hit(Wt('c1_4b', 'astronomers'), 'pop', 0.5, -0.3);
    ev.c1_torch = hit(Wt('c1_4b', 'flashlight'), 'click', 0.6, 0.3);
    ev.c2_50 = hit(Wt('c2_3b', 'fifty'), 'ding', 0.6);
    ev.c5_400 = hit(Wt('c5_4b', 'four'), 'ding', 0.6);
    ev.c7_rt0 = Wt('c7_2b', 'pulse'); ev.c7_rt = hit(Wt('c7_2b', 'half'), 'blip', 0.6);
    ev.c8_rec = ['lights', 'lifts', 'steady', 'slows'].map((w, i) => hit(Wt('c8_2b', w), 'blip', 0.55, -0.45 + i * 0.3));
  };
  if (typeof module !== 'undefined') module.exports = build; else globalThis.EVENTS = build;
})();
