// Andromeda 2.5 million-year-old light motion reel (16:00, 2026-11-09) — one timeline for picture and sound.
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
    b1: T(1, 1),            // 2.5 s  beat 1: photo shrinks to a faint smudge in the night sky, ring marker
    ringLand: T(3, 1),      // 6.5 s  ring lands on the smudge: 'adi gözlə görünür'
    b2: T(4, 1),            // 8.5 s  beat 2: light travels from Andromeda to Earth, year counter
    walk: T(7, 1),          // 14.5 s light reaches Earth: 2 500 000 il
    b3: T(8, 1),            // 16.5 s beat 3: galaxy returns big, star counter
    thin: T(8, 3),          // 17.5 s counter starts
    house: T(10, 1),        // 20.5 s counter lands: 1 trilyon ulduz
    cta: T(11, 1),          // 22.5 s follow pill
  };
  const DURATION = ev.cta + 2.2;
  const HOOK = ['2,5 MİLYON İL', 'ƏVVƏLKİ', 'İŞIQ'];
  const BEATS = ["Aysız, qaranlıq gecədə göydə kiçik dumanlı bir ləkə görə bilərsən. Bu, qonşu Andromeda qalaktikasıdır.", "O, bizdən 2,5 milyon işıq ili uzaqdadır. Yəni gözünə düşən işıq oradan 2,5 milyon il əvvəl yola çıxıb.", "Andromedada təxminən 1 trilyon ulduz var. Bu, adi gözlə rahat görə bildiyimiz ən uzaq şeydir."];
  const BSTART = [ev.b1, ev.b2, ev.b3];
  const S = { hook: [0, ev.b1], beat1: [ev.b1, ev.b2], beat2: [ev.b2, ev.b3], beat3: [ev.b3, DURATION] };
  const { chords, chordAt } = makeChords(clock, {
    Am: { notes: ['A3', 'C4', 'E4'], bass: 'A1' }, F: { notes: ['A3', 'C4', 'F4'], bass: 'F1' },
    C: { notes: ['G3', 'C4', 'E4'], bass: 'C2' }, G: { notes: ['G3', 'B3', 'D4'], bass: 'G1' },
  }, [[0, 0, 4, 'Am'], [1, 0, 4, 'F'], [2, 0, 4, 'C'], [3, 0, 4, 'G'], [4, 0, 4, 'Am'], [5, 0, 4, 'F'],
      [6, 0, 4, 'C'], [7, 0, 4, 'G'], [8, 0, 4, 'Am'], [9, 0, 4, 'F'], [10, 0, 4, 'C'], [11, 0, 6, 'Am']]);
  const ticks = []; for (let i = 0; i < 8; i++) ticks.push({ t: ev.b1 + i * BEAT / 2 + 0.25, i, midi: m(['A4', 'C5', 'E5', 'A5', 'C5', 'E5', 'G5', 'B5'][i]) });
  // seeded random walk of a photon from the core (0,0) to the surface (r = 1), unit-disc coords
  const rnd = U.mulberry32(9112026);
  const walk = [[0, 0]]; let x = 0, y = 0;
  while (Math.hypot(x, y) < 1 && walk.length < 4000) { const a = rnd() * 6.283, r = Math.hypot(x, y) || 1e-6;
    x += 0.035 * Math.cos(a) + 0.0022 * x / r; y += 0.035 * Math.sin(a) + 0.0022 * y / r; walk.push([x, y]); }
  const markers = { b1: { t: ev.b1, sync: 'av' }, ringLand: { t: ev.ringLand, sync: 'av' }, b2: { t: ev.b2, sync: 'av' },
    walk: { t: ev.walk, sync: 'av' }, b3: { t: ev.b3, sync: 'av' }, thin: ev.thin, house: { t: ev.house, sync: 'av' }, cta: ev.cta };
  const SCORE = { FPS, FORMAT, STYLE, W, H, SAFE, WIDE: false, DURATION, clock, T, BEAT, S, m, chords, chordAt, ev, HOOK, BEATS, BSTART, ticks, walk, markers };
  if (node) module.exports = SCORE; else globalThis.SCORE = SCORE;
})();
