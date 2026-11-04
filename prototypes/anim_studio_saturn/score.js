// Saturn rings motion reel (16:00, 2026-11-05) — one timeline for picture and sound.
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
    b1: T(1, 1),            // 2.5 s  beat 1: pull back, ring line + counter 0 → 282 000 km
    ringLand: T(3, 1),      // 6.5 s  counter lands, Earth–Moon bar fills to ¾
    b2: T(4, 1),            // 8.5 s  beat 2: rings turn edge-on
    thin: T(5, 1),          // 10.5 s rings are a line, magnifier opens
    house: T(6, 1),         // 12.5 s 10 m vs 3-storey building
    b3: T(7, 1),            // 14.5 s beat 3: ice particles
    cta: T(10, 2),          // 21.0 s follow pill
  };
  const DURATION = ev.cta + 1.8;   // 22.8 s
  const HOOK = ['282 000 KM,', 'AMMA CƏMİ', '10 METR QALINLIQ'];
  const BEATS = [
    'Saturnun halqaları planetdən 282 000 kilometrə qədər uzanır. Bu, Yerdən Aya qədər olan yolun təxminən dörddə üçüdür.',
    'Amma NASA-ya görə, halqalar çox yerdə cəmi 10 metr qalınlığındadır. Bu, üçmərtəbəli bir binanın hündürlüyü qədərdir.',
    'Halqalar əsasən buz parçalarından ibarətdir. Bəziləri qum dənəsindən kiçikdir, bəziləri isə dağ boyda. Sən Saturnu teleskopla görmüsən?',
  ];
  const BSTART = [ev.b1, ev.b2, ev.b3];
  const S = { hook: [0, ev.b1], beat1: [ev.b1, ev.b2], beat2: [ev.b2, ev.b3], beat3: [ev.b3, DURATION] };
  const { chords, chordAt } = makeChords(clock, {
    Am: { notes: ['A3', 'C4', 'E4'], bass: 'A1' }, F: { notes: ['A3', 'C4', 'F4'], bass: 'F1' },
    C: { notes: ['G3', 'C4', 'E4'], bass: 'C2' }, G: { notes: ['G3', 'B3', 'D4'], bass: 'G1' },
  }, [[0, 0, 4, 'Am'], [1, 0, 4, 'F'], [2, 0, 4, 'C'], [3, 0, 4, 'G'], [4, 0, 4, 'Am'], [5, 0, 4, 'F'],
      [6, 0, 4, 'C'], [7, 0, 4, 'G'], [8, 0, 4, 'Am'], [9, 0, 4, 'F'], [10, 0, 6, 'C']]);
  // counter ticks: marimba notes on 8ths while the ring line grows (b1 → ringLand)
  const ticks = []; for (let i = 0; i < 8; i++) ticks.push({ t: ev.b1 + i * BEAT / 2 + 0.25, i, midi: m(['A4', 'C5', 'E5', 'A5', 'C5', 'E5', 'G5', 'B5'][i]) });
  // ice particles (beat 3): seeded, sizes from grain to "mountain"
  const rnd = U.mulberry32(5112026);
  const ice = []; for (let i = 0; i < 70; i++) ice.push({ y: 260 + rnd() * 620, sp: 60 + rnd() * 160, ph: rnd(), r: 2 + Math.pow(rnd(), 3) * 60, s: rnd() });
  const markers = { b1: { t: ev.b1, sync: 'av' }, ringLand: { t: ev.ringLand, sync: 'av' }, b2: { t: ev.b2, sync: 'av' },
    thin: ev.thin, house: { t: ev.house, sync: 'av' }, b3: { t: ev.b3, sync: 'av' }, cta: ev.cta };
  const SCORE = { FPS, FORMAT, STYLE, W, H, SAFE, WIDE: false, DURATION, clock, T, BEAT, S, m, chords, chordAt, ev, HOOK, BEATS, BSTART, ticks, ice, markers };
  if (node) module.exports = SCORE; else globalThis.SCORE = SCORE;
})();
