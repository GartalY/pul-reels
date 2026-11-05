// Io volcano plumes motion reel (16:00, 2026-11-06) — one timeline for picture and sound.
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
    b1: T(1, 1),            // 2.5 s  beat 1: photo shrinks, volcano dots pop, counter 0 -> 150
    ringLand: T(3, 1),      // 6.5 s  counter lands on "150+"
    ghost: T(3, 3),         // 7.5 s  ghost dots: "400-ə qədər"
    b2: T(4, 1),            // 8.5 s  beat 2: Io limb, plume rises with altitude counter
    thin: T(5, 1),          // 10.5 s ISS line appears at 400 km
    house: T(6, 1),         // 12.5 s plume lands at 500 km (above the ISS)
    b3: T(7, 1),            // 14.5 s beat 3: Jupiter squeezes Io
    moon: T(9, 1),          // 18.5 s Io vs our Moon
    cta: T(11, 1),          // 22.5 s follow pill
  };
  const DURATION = ev.cta + 1.8;   // 24.3 s
  const HOOK = ['500 KM', 'HÜNDÜRLÜYƏ QALXAN', 'VULKAN BULUDU: İO'];
  const BEATS = [
    'Yupiterin peyki İo Günəş sistemində vulkanı ən çox olan dünyadır. Alimlər orada 150-dən çox fəal vulkan görüblər, cəmi 400-ə qədər ola bilər.',
    'Ən güclü püskürmələrdə vulkan buludu 300–500 kilometr hündürlüyə qalxır. Müqayisə üçün: Beynəlxalq Kosmik Stansiya Yerdən təxminən 400 kilometr yüksəkdə uçur.',
    'Səbəb Yupiterin güclü cazibəsidir: o, İonu daim dartıb-sıxır və peykin içi qızır. İo bizim Aydan bir az böyükdür. Belə bir yerə baxmaq istərdin?',
  ];
  const BSTART = [ev.b1, ev.b2, ev.b3];
  const S = { hook: [0, ev.b1], beat1: [ev.b1, ev.b2], beat2: [ev.b2, ev.b3], beat3: [ev.b3, DURATION] };
  const { chords, chordAt } = makeChords(clock, {
    Dm: { notes: ['A3', 'D4', 'F4'], bass: 'D2' }, Bb: { notes: ['Bb3', 'D4', 'F4'], bass: 'Bb1' },
    F: { notes: ['A3', 'C4', 'F4'], bass: 'F1' }, C: { notes: ['G3', 'C4', 'E4'], bass: 'C2' },
  }, [[0, 0, 4, 'Dm'], [1, 0, 4, 'Bb'], [2, 0, 4, 'F'], [3, 0, 4, 'C'], [4, 0, 4, 'Dm'], [5, 0, 4, 'Bb'],
      [6, 0, 4, 'F'], [7, 0, 4, 'C'], [8, 0, 4, 'Dm'], [9, 0, 4, 'Bb'], [10, 0, 4, 'F'], [11, 0, 6, 'Dm']]);
  // volcano pops: marimba notes on 8ths while dots appear (b1 -> ringLand)
  const ticks = []; for (let i = 0; i < 8; i++) ticks.push({ t: ev.b1 + i * BEAT / 2 + 0.25, i, midi: m(['D5', 'F5', 'A5', 'D6', 'F5', 'A5', 'C6', 'E6'][i]) });
  // seeded volcano positions on the disc (unit disc coords), 150 real + 250 ghost
  const rnd = U.mulberry32(6112026);
  const volc = []; for (let i = 0; i < 400; i++) { const r = Math.sqrt(rnd()) * 0.88, a = rnd() * 6.283; volc.push({ x: r * Math.cos(a), y: r * Math.sin(a), s: 0.6 + rnd() * 0.8, ph: rnd() }); }
  const markers = { b1: { t: ev.b1, sync: 'av' }, ringLand: { t: ev.ringLand, sync: 'av' }, b2: { t: ev.b2, sync: 'av' },
    thin: ev.thin, house: { t: ev.house, sync: 'av' }, b3: { t: ev.b3, sync: 'av' }, moon: ev.moon, cta: ev.cta };
  const SCORE = { FPS, FORMAT, STYLE, W, H, SAFE, WIDE: false, DURATION, clock, T, BEAT, S, m, chords, chordAt, ev, HOOK, BEATS, BSTART, ticks, volc, markers };
  if (node) module.exports = SCORE; else globalThis.SCORE = SCORE;
})();
