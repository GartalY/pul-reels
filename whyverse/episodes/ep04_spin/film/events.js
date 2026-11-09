// EVENTS — every named visual hit and its sound, per chapter. Called by score.js (Node + browser).
// hit(t, kind, gain, pan) registers a sound effect at t and returns t, so the picture uses the same number.
(function () {
  const build = ({ L, Wt, next, ev, hit, CH, U, DURATION }) => {
    const S = (id, d = 0.25) => L(id).t - d; // a shot that starts just before a line
    // ===== c0 cold open =====
    ev.c0_s1 = 0;                                                        // Axel sits in a chair on top of a small Earth
    ev.c0_sit = hit(0.35, 'pop', 0.5);
    ev.c0_moving = hit(Wt('c0_1', 'moving'), 'whoosh', 0.5);
    ev.c0_fast = hit(Wt('c0_1', 'fast'), 'zip', 0.7);
    ev.sync_fast = ev.c0_fast;
    ev.c0_s2 = S('c0_2');                                                // pull back: the globe spins, speedometer
    ev.c0_axis = hit(Wt('c0_2', 'axis'), 'tick', 0.5);
    ev.c0_gauge0 = Wt('c0_2', 'more'); ev.c0_gauge1 = hit(Wt('c0_2', 'hour', 0, true), 'ding', 0.6);
    ev.c0_s3 = S('c0_3');                                                // equator vs the speed of sound
    ev.c0_eq = hit(Wt('c0_3', 'equator'), 'blip', 0.5);
    ev.c0_1670 = hit(Wt('c0_3', 'seventy'), 'ding', 0.6);
    ev.c0_sound = hit(Wt('c0_3', 'sound'), 'boom', 0.55);
    ev.c0_s4 = S('c0_4');                                                // tea, calm … then STOP
    ev.c0_thing = hit(Wt('c0_4', 'thing'), 'sip', 0.5);
    ev.c0_stop = hit(Wt('c0_4', 'stopped'), 'screech', 0.85);
    ev.sync_stop = ev.c0_stop;
    ev.c0_s5 = S('c0_5', 0.3);                                           // winds, oceans, day length cards
    ev.c0_cards = ['winds', 'oceans', 'length'].map((w, i) => hit(Wt('c0_5', w), 'chalk', 0.6, -0.4 + i * 0.4));
    ev.c0_s6 = S('c0_6', 0.4);
    ev.c0_q = hit(Wt('c0_6', 'what'), 'swell', 0.4);
    // title (no voice): five chalk words slam onto the board one by one, then the brand
    ev.title0 = L('c0_6').end + 0.35;
    ev.titleWords = ['WHAT', 'IF', 'EARTH', 'STOPPED', 'SPINNING?'].map((w, i) => ({ w, t: hit(ev.title0 + 0.3 + i * 0.32, 'slam', i === 3 ? 1.0 : 0.65, -0.4 + i * 0.2) }));
    ev.sync_title = ev.titleWords[3].t;
    ev.titleBrand = hit(ev.titleWords[4].t + 0.95, 'chime', 0.6);

    // chapter cards: chalk swipe + stamp, hook line, card out
    for (const c of ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']) {
      ev[c + '_card'] = CH[c].t0; hit(CH[c].t0 + 0.05, 'wipe', 0.5); ev[c + '_stamp'] = hit(CH[c].t0 + 0.3, 'slam', 0.75);
      hit(CH[c].t0 + 0.45, 'scribble', 0.45);
      const h = L(c + '_1h'); ev[c + '_hook'] = h; hit(h.t - 0.05, 'chalk', 0.45);
      ev[c + '_cardOut'] = h.end + 0.5; hit(ev[c + '_cardOut'] - 0.35, 'wipe', 0.35);
    }

    // ===== c1 the ride you never feel =====
    ev.c1_s1 = ev.c1_cardOut - 0.1;                                      // globe from above the pole: one turn, clock
    ev.c1_turn = hit(Wt('c1_2', 'turns'), 'whoosh', 0.45);
    ev.c1_stars = hit(Wt('c1_2', 'stars'), 'shimmer', 0.5);
    ev.c1_2356 = hit(Wt('c1_2', 'fifty'), 'ding', 0.6);
    ev.c1_s2 = S('c1_3');                                                // a dot races around the equator
    ev.c1_around = hit(Wt('c1_3', 'around'), 'whoosh', 0.5);
    ev.c1_40k0 = Wt('c1_3', 'forty'); ev.c1_40k = hit(Wt('c1_3', 'kilometres'), 'ding', 0.55);
    ev.c1_1670 = hit(Wt('c1_3', 'seventy'), 'stamp', 0.7);
    ev.c1_s3 = S('c1_4');                                                // latitude circles shrink: city pins + bars
    ev.c1_smaller = hit(Wt('c1_4', 'smaller'), 'shrink', 0.55);
    ev.c1_baku = hit(Wt('c1_4', 'baku'), 'pop', 0.6, -0.2);
    ev.c1_london = hit(Wt('c1_4', 'london'), 'pop', 0.6, 0.2);
    ev.c1_pole = hit(Wt('c1_4', 'pole'), 'pop', 0.6, 0.4);
    ev.c1_spot = hit(Wt('c1_4', 'spot'), 'spin', 0.55);
    ev.c1_s4 = S('c1_4b');                                               // the scale: a third of a percent lighter
    ev.c1_fling = hit(Wt('c1_4b', 'flings'), 'boing', 0.45);
    ev.c1_third = hit(Wt('c1_4b', 'third'), 'ding', 0.6);
    ev.c1_s5 = S('c1_5');                                                // the plane: pour a drink at 900 km/h
    ev.c1_feel = hit(Wt('c1_5', 'changes'), 'blip', 0.5);
    ev.c1_pour = hit(Wt('c1_5', 'pour'), 'pour', 0.6);
    ev.c1_900 = hit(Wt('c1_5', 'nine'), 'ding', 0.55);
    ev.c1_s6 = S('c1_6');                                                // ground, air, ocean, you → arrows together
    ev.c1_four = ['ground', 'air', 'oceans', 'you'].map((w, i) => hit(Wt('c1_6', w), 'chalk', 0.5, -0.5 + i * 0.33));
    ev.c1_together = hit(Wt('c1_6', 'together'), 'chime', 0.5);
    ev.c1_s7 = S('c1_7');                                                // one stops…
    ev.c1_stops = hit(Wt('c1_7', 'stops'), 'thud', 0.7);
    ev.c1_dont = hit(Wt('c1_7', "don't"), 'zip', 0.55);

    // ===== c2 the sudden stop =====
    ev.c2_s1 = ev.c2_cardOut - 0.1;                                      // the ground stops, everything flies east
    ev.c2_bolted = hit(Wt('c2_2', 'bolted'), 'clank', 0.5);
    ev.c2_east = hit(Wt('c2_2', 'east'), 'whoosh', 0.7);
    ev.c2_speed = hit(Wt('c2_2', 'seventy'), 'ding', 0.5);
    ev.c2_things = ['people', 'cars', 'trees', 'rock'].map((w, i) => hit(Wt('c2_2', w), 'zip', 0.5, -0.3 + i * 0.2));
    ev.c2_s2 = S('c2_3');                                                // wind bars: tornado vs the stop
    ev.c2_air = hit(Wt('c2_3', 'air'), 'wind', 0.6);
    ev.c2_tornado = hit(Wt('c2_3', 'tornado'), 'blip', 0.55);
    ev.c2_three = hit(Wt('c2_3', 'three'), 'stamp', 0.7);
    ev.c2_planet = hit(Wt('c2_3', 'planet'), 'wind', 0.5);
    ev.c2_s3 = S('c2_4');                                                // oceans slosh over the land
    ev.c2_slosh = hit(Wt('c2_4', 'slosh'), 'splash', 0.7);
    ev.c2_surge = hit(Wt('c2_4', 'surge'), 'splash', 0.6);
    ev.c2_s4 = S('c2_4b');                                               // swept clean
    ev.c2_build = hit(Wt('c2_4b', 'buildings'), 'crash', 0.6);
    ev.c2_forest = hit(Wt('c2_4b', 'forests'), 'crash', 0.5);
    ev.c2_clean = hit(Wt('c2_4b', 'clean'), 'whoosh', 0.5);
    ev.c2_s5 = S('c2_5');                                                // honest part: CAN'T HAPPEN, 2×10^29 J
    ev.c2_honest = hit(Wt('c2_5', 'honest'), 'record', 0.7);
    ev.c2_cant = hit(Wt('c2_5', "can't"), 'stamp', 0.8);
    ev.sync_cant = ev.c2_cant;
    ev.c2_joules = hit(Wt('c2_5', 'joules'), 'ding', 0.6);
    ev.c2_s6 = S('c2_6');                                                // energy bars: humanity × 300 million years
    ev.c2_300a = Wt('c2_6', 'three'); ev.c2_300 = hit(Wt('c2_6', 'years'), 'ding', 0.6);
    ev.c2_humanity = hit(Wt('c2_6', 'humanity'), 'pop', 0.5);
    ev.c2_nothing = hit(Wt('c2_6', 'nothing'), 'thud', 0.5);
    ev.c2_s7 = S('c2_7');                                                // the dial winds down to zero
    ev.c2_slow = hit(Wt('c2_7', 'slowly'), 'winddown', 0.6);
    ev.c2_zero = hit(Wt('c2_7', 'zero'), 'clank', 0.6);
    ev.c2_unrec = hit(Wt('c2_7', 'unrecognisable'), 'swell', 0.5);

    // ===== c3 the oceans move out =====
    ev.c3_s1 = ev.c3_cardOut - 0.1;                                      // squashed Earth, 43 km
    ev.c3_squash = hit(Wt('c3_2', 'squashed'), 'squish', 0.6);
    ev.c3_43 = hit(Wt('c3_2', 'three'), 'ding', 0.6);
    ev.c3_pole = hit(Wt('c3_2', 'pole', 1), 'tick', 0.45);
    ev.c3_s2 = S('c3_3');                                                // ocean bulge 8 km
    ev.c3_fling = hit(Wt('c3_3', 'flings'), 'whoosh', 0.45);
    ev.c3_bulge = hit(Wt('c3_3', 'bulge'), 'bubble', 0.55);
    ev.c3_8km = hit(Wt('c3_3', 'eight'), 'ding', 0.6);
    ev.c3_s3 = S('c3_4');                                                // water flows to the poles
    ev.c3_stop = hit(Wt('c3_4', 'stop'), 'clank', 0.5);
    ev.c3_flow = hit(Wt('c3_4', 'downhill'), 'flow', 0.7);
    ev.c3_poles = hit(Wt('c3_4', 'poles'), 'splash', 0.5);
    ev.c3_s4 = S('c3_5');                                                // the new map: two polar oceans, one ring continent
    ev.c3_fraczek = hit(Wt('c3_5', 'witold'), 'pop', 0.55);
    ev.c3_map = hit(Wt('c3_5', 'mapping'), 'chalk', 0.5);
    ev.c3_two = hit(Wt('c3_5', 'two'), 'flow', 0.55);
    ev.c3_cont = hit(Wt('c3_5', 'continent'), 'stamp', 0.7);
    ev.sync_cont = ev.c3_cont;
    ev.c3_s5 = S('c3_6');                                                // Andes 12 km vs Everest; beach far away
    ev.c3_andes = hit(Wt('c3_6', 'andes'), 'rise', 0.6);
    ev.c3_12 = hit(Wt('c3_6', 'twelve'), 'ding', 0.6);
    ev.c3_beach = hit(Wt('c3_6', 'beach'), 'pop', 0.5);
    ev.c3_far = hit(Wt('c3_6', 'way'), 'whoosh', 0.45);
    ev.c3_s6 = S('c3_6b');                                               // inland seas; the two oceans 1.4 km apart
    ev.c3_basins = hit(Wt('c3_6b', 'basins'), 'bubble', 0.5);
    ev.c3_height = hit(Wt('c3_6b', 'height'), 'blip', 0.5);
    ev.c3_14 = hit(Wt('c3_6b', 'four'), 'ding', 0.6);

    // ===== c4 a day that lasts a year =====
    ev.c4_s1 = ev.c4_cardOut - 0.1;                                      // orbit view, the marked spot faces the Sun for half a year
    ev.c4_race = hit(Wt('c4_2', 'race'), 'whoosh', 0.5);
    ev.c4_107 = hit(Wt('c4_2', 'seven'), 'ding', 0.55);
    ev.c4_face = hit(Wt('c4_2', 'face'), 'shimmer', 0.5);
    ev.c4_away = hit(Wt('c4_2', 'away'), 'drop', 0.5);
    ev.c4_s2 = S('c4_3');                                                // split screen: bake / freeze
    ev.c4_light = hit(Wt('c4_3', 'daylight'), 'swell', 0.55);
    ev.c4_bake = hit(Wt('c4_3', 'bake'), 'sizzle', 0.6);
    ev.c4_dark = hit(Wt('c4_4', 'darkness'), 'switch', 0.6);
    ev.c4_freeze = hit(Wt('c4_4', 'freeze'), 'ice', 0.6);
    ev.c4_s3 = S('c4_4b');                                               // rooster + owl + plant confused, calendar
    ev.c4_rhythm = hit(Wt('c4_4b', 'rhythm'), 'tick', 0.5);
    ev.c4_cal = hit(Wt('c4_4b', 'calendar'), 'flip', 0.55);
    ev.c4_year = hit(Wt('c4_4b', 'year'), 'ding', 0.55);
    ev.c4_s4 = S('c4_5');                                                // Coriolis: a hurricane spins
    ev.c4_bend = hit(Wt('c4_5', 'bends'), 'whoosh', 0.45);
    ev.c4_cor = hit(Wt('c4_5', 'coriolis'), 'chalk', 0.55);
    ev.c4_hurr = hit(Wt('c4_5', 'hurricanes'), 'wind', 0.55);
    ev.c4_s5 = S('c4_6');                                                // no spin: the hurricane unwinds, one big flow hot → cold
    ev.c4_nospin = hit(Wt('c4_6', 'spinning'), 'winddown', 0.55);
    ev.c4_flow = hit(Wt('c4_6', 'flow'), 'wind', 0.55);
    ev.c4_cold = hit(Wt('c4_6', 'cold'), 'ice', 0.45);
    ev.c4_s6 = S('c4_7');                                                // magnetic field lines weaken
    ev.c4_iron = hit(Wt('c4_7', 'iron'), 'bubble', 0.5);
    ev.c4_field = hit(Wt('c4_7', 'field'), 'shimmer', 0.55);
    ev.c4_weak = hit(Wt('c4_7', 'weaken'), 'drop', 0.6);

    // ===== c5 it's already slowing down =====
    ev.c5_s1 = ev.c5_cardOut - 0.1;                                      // Moon + tidal bulges + brake
    ev.c5_moon = hit(Wt('c5_2', 'moon'), 'pop', 0.55);
    ev.c5_tides = hit(Wt('c5_2', 'tides'), 'flow', 0.5);
    ev.c5_brake = hit(Wt('c5_2', 'brake'), 'screech', 0.45);
    ev.c5_s2 = S('c5_3');                                                // 1.8 ms per century
    ev.c5_18a = Wt('c5_3', 'one'); ev.c5_18 = hit(Wt('c5_3', 'milliseconds'), 'ding', 0.6);
    ev.c5_century = hit(Wt('c5_3', 'century'), 'tick', 0.5);
    ev.c5_s3 = S('c5_4');                                                // coral fossil: count growth lines → 400 days, 22 h
    ev.c5_coral = hit(Wt('c5_4', 'corals'), 'pop', 0.55);
    ev.c5_lines = hit(Wt('c5_4', 'lines'), 'scribble', 0.5);
    ev.c5_400a = Wt('c5_4', 'around'); ev.c5_400 = hit(Wt('c5_4', 'days'), 'ding', 0.6);
    ev.c5_22 = hit(Wt('c5_4', 'twenty'), 'stamp', 0.7);
    ev.c5_s4 = S('c5_5');                                                // the Moon drifts away; laser + mirror
    ev.c5_handed = hit(Wt('c5_5', 'handed'), 'whoosh', 0.45);
    ev.c5_drift = hit(Wt('c5_5', 'drifts'), 'flow', 0.45);
    ev.c5_38 = hit(Wt('c5_5', 'centimetres'), 'ding', 0.6);
    ev.c5_mirror = hit(Wt('c5_5', 'mirrors'), 'pop', 0.55);
    ev.c5_laser = hit(Wt('c5_5', 'lasers'), 'laser', 0.6);
    ev.c5_s5 = S('c5_6');                                                // record shortest day
    ev.c5_wobble = hit(Wt('c5_6', 'wobbles'), 'boing', 0.45);
    ev.c5_july = hit(Wt('c5_6', 'july'), 'flip', 0.55);
    ev.c5_record = hit(Wt('c5_6', 'record'), 'stamp', 0.7);
    ev.c5_166 = hit(Wt('c5_6', 'milliseconds'), 'ding', 0.55);
    ev.c5_s6 = S('c5_7');                                                // leap seconds: 27, 23:59:60, retired
    ev.c5_1972 = hit(Wt('c5_7', 'nineteen'), 'tick', 0.5);
    ev.c5_27a = Wt('c5_7', 'twenty'); ev.c5_27 = hit(Wt('c5_7', 'leap'), 'ding', 0.55);
    ev.c5_retire = hit(Wt('c5_7', 'retire'), 'stamp', 0.75);

    // ===== c6 worlds that hit the brakes =====
    ev.c6_s1 = ev.c6_cardOut - 0.1;                                      // Venus turns slowly, backwards
    ev.c6_venus = hit(Wt('c6_2', 'venus'), 'pop', 0.6);
    ev.c6_back = hit(Wt('c6_2', 'backwards'), 'rewind', 0.55);
    ev.c6_243 = hit(Wt('c6_2', 'three'), 'ding', 0.55, -0.3);
    ev.c6_225 = hit(Wt('c6_2', 'five'), 'ding', 0.55, 0.3);
    ev.c6_s2 = S('c6_3');                                                // sunrise to sunrise 117 days
    ev.c6_sunrise = hit(Wt('c6_3', 'sunrise'), 'swell', 0.45);
    ev.c6_117 = hit(Wt('c6_3', 'seventeen'), 'stamp', 0.65);
    ev.c6_s3 = S('c6_3b');                                               // Mercury 3:2
    ev.c6_merc = hit(Wt('c6_3b', 'mercury'), 'pop', 0.55);
    ev.c6_spins = [0, 1, 2].map((i) => hit(Wt('c6_3b', 'spins') + 0.5 + i * 0.32, 'tick', 0.45, -0.3 + i * 0.3));
    ev.c6_twoyears = hit(Wt('c6_3b', 'years'), 'ding', 0.6);
    ev.c6_s4 = S('c6_4');                                                // no magnetic field
    ev.c6_nofield = hit(Wt('c6_4', 'magnetic'), 'drop', 0.5);
    ev.c6_debate = hit(Wt('c6_4', 'debate'), 'blip', 0.5);
    ev.c6_s5 = S('c6_5');                                                // the Moon is locked: same face
    ev.c6_locked = hit(Wt('c6_5', 'locked'), 'clank', 0.6);
    ev.c6_face = hit(Wt('c6_5', 'face'), 'chime', 0.55);
    ev.c6_s6 = S('c6_6');                                                // timeline: 5 billion → red giant; tens of billions → lock
    ev.c6_tens = hit(Wt('c6_6', 'tens'), 'tick', 0.5);
    ev.c6_five = hit(Wt('c6_6', 'five'), 'ding', 0.55);
    ev.c6_giant = hit(Wt('c6_6', 'giant'), 'swell', 0.75);

    // ===== c7 payoff + end card =====
    ev.c7_s1 = S('c7_1', 0.6);
    ev.c7_q = hit(L('c7_1').t + 0.1, 'swell', 0.4);
    ev.c7_recap = [Wt('c7_2', 'sudden'), Wt('c7_2', 'oceans'), Wt('c7_2', 'day'), Wt('c7_2', 'storms')].map((tt, i) => hit(tt, 'chalk', 0.55, -0.45 + i * 0.3));
    ev.c7_s2 = S('c7_3');
    ev.c7_gifts = [Wt('c7_3', 'sunrise'), Wt('c7_3', 'shapes'), Wt('c7_3', 'steers'), Wt('c7_3', 'shield')].map((tt, i) => hit(tt, 'pop', 0.55, -0.45 + i * 0.3));
    ev.c7_s3 = S('c7_4');
    ev.c7_turning = hit(Wt('c7_4', 'turning'), 'whoosh', 0.45);
    ev.c7_thousand = hit(Wt('c7_4', 'thousand'), 'ding', 0.5);
    ev.c7_now = hit(Wt('c7_4', 'now'), 'sip', 0.5);
    ev.c7_s5 = S('c7_5', 0.6);
    ev.sync_logo = hit(ev.c7_s5 + 0.15, 'chime', 0.7);
    ev.c7_like = hit(Wt('c7_5', 'like'), 'pop', 0.7);
    ev.c7_sub = hit(Wt('c7_5', 'subscribe'), 'click', 0.8);
    ev.c7_ig = hit(Wt('c7_5', 'instagram'), 'blip', 0.6, -0.3);
    ev.c7_tt = hit(Wt('c7_5', 'tiktok'), 'blip', 0.6, 0.3);
  };
  if (typeof module !== 'undefined') module.exports = build; else globalThis.EVENTS = build;
})();
