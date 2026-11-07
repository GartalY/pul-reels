// Neutron star 716 turns/s motion reel (16:00, 2026-11-08) — one timeline for picture and sound.
// Hook + 3 beats in the @bilirdinizmi_az safe zone (text x 70–890, y 960–1450), silent (no voice), ≤ 25 s.
(function () {
  const node = typeof require !== 'undefined';
  const U = node ? require('./engine/util') : globalThis.U;
  const MU = node ? require('./engine/music') : globalThis.MUSIC;
  const { m, makeClock, makeChords } = MU;
  const FPS = 30, STYLE = 'flat';
  const FORMAT = U.pickFormat('9:16');
  const [W, H] = U.formatSize(FORMAT);
  const SAFE = U.safeArea(W, H);
  const clock = makeClock({ bpm: 120, offset: 0 });
  const { T, BEAT } = clock;
  const ev = {
    b1: T(1, 1),            // 2.5 s  beat 1: photo shrinks, core glows, temperature counter -> 15 milyon °C
    ringLand: T(3, 1),      // 6.5 s  counter lands
    b2: T(4, 1),            // 8.5 s  beat 2: cross-section, photon random walk, year counter
    walk: T(7, 1),          // 14.5 s photon reaches the surface: 170 000 il
    b3: T(8, 1),            // 16.5 s beat 3: straight beam Sun -> Earth
    thin: T(8, 3),          // 17.5 s beam leaves the Sun
    house: T(10, 1),        // 20.5 s beam hits Earth: 8 dəq 19 san
    cta: T(11, 1),          // 22.5 s follow pill
  };
  const DURATION = ev.cta + 2.2;
  const HOOK = ['716 DƏFƏ', 'SANİYƏDƏ FIRLANAN', 'ULDUZ'];
  const BEATS = ["Yerdən təxminən 28 000 işıq ili uzaqda bir neytron ulduzu var. O, hər saniyədə 716 dəfə fırlanır: adi mətbəx blenderindən iki dəfə sürətli.", "Neytron ulduzu partlayan nəhəng ulduzdan qalan nüvədir. Eni cəmi 20 kilometrə yaxındır, amma çəkisi yarım milyon Yer kürəsi qədərdir.", "Onun maddəsi o qədər sıxdır ki, bir çay qaşığı milyardlarla ton çəkər. Səncə, kosmosda bundan da qəribə nə var?"];
  const BSTART = [ev.b1, ev.b2, ev.b3];
  const S = { hook: [0, ev.b1], beat1: [ev.b1, ev.b2], beat2: [ev.b2, ev.b3], beat3: [ev.b3, DURATION] };
  const { chords, chordAt } = makeChords(clock, {
    Am: { notes: ['A3', 'C4', 'E4'], bass: 'A1' }, F: { notes: ['A3', 'C4', 'F4'], bass: 'F1' },
    C: { notes: ['G3', 'C4', 'E4'], bass: 'C2' }, G: { notes: ['G3', 'B3', 'D4'], bass: 'G1' },
  }, [[0, 0, 4, 'Am'], [1, 0, 4, 'F'], [2, 0, 4, 'C'], [3, 0, 4, 'G'], [4, 0, 4, 'Am'], [5, 0, 4, 'F'],
      [6, 0, 4, 'C'], [7, 0, 4, 'G'], [8, 0, 4, 'Am'], [9, 0, 4, 'F'], [10, 0, 4, 'C'], [11, 0, 6, 'Am']]);
  const ticks = []; for (let i = 0; i < 8; i++) ticks.push({ t: ev.b1 + i * BEAT / 2 + 0.25, i, midi: m(['A4', 'C5', 'E5', 'A5', 'C5', 'E5', 'G5', 'B5'][i]) });
  // seeded random walk of a photon from the core (0,0) to the surface (r = 1), unit-disc coords
  const rnd = U.mulberry32(8112026);
  const walk = [[0, 0]]; let x = 0, y = 0;
  while (Math.hypot(x, y) < 1 && walk.length < 4000) { const a = rnd() * 6.283, r = Math.hypot(x, y) || 1e-6;
    x += 0.035 * Math.cos(a) + 0.0022 * x / r; y += 0.035 * Math.sin(a) + 0.0022 * y / r; walk.push([x, y]); }
  const markers = { b1: { t: ev.b1, sync: 'av' }, ringLand: { t: ev.ringLand, sync: 'av' }, b2: { t: ev.b2, sync: 'av' },
    walk: { t: ev.walk, sync: 'av' }, b3: { t: ev.b3, sync: 'av' }, thin: ev.thin, house: { t: ev.house, sync: 'av' }, cta: ev.cta };
  const SCORE = { FPS, FORMAT, STYLE, W, H, SAFE, WIDE: false, DURATION, clock, T, BEAT, S, m, chords, chordAt, ev, HOOK, BEATS, BSTART, ticks, walk, markers };
  if (node) module.exports = SCORE; else globalThis.SCORE = SCORE;
})();
