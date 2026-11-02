// Moon test (5 s): "Ay hər il Yerdən 3,8 sm uzaqlaşır" — one timeline for picture and sound.
(function () {
  const node = typeof require !== 'undefined';
  const U = node ? require('./engine/util') : globalThis.U;
  const MU = node ? require('./engine/music') : globalThis.MUSIC;
  const { m, makeClock, makeChords } = MU;
  const FPS = 30, STYLE = 'flat';
  const FORMAT = U.pickFormat('9:16');
  const [W, H] = U.formatSize(FORMAT);
  const SAFE = U.safeArea(W, H);
  const clock = makeClock({ bpm: 120, offset: 0.25 });
  const { T, BEAT } = clock;
  const DURATION = T(3, 2) + 0.25;                       // ≈ 7.5 s (payoff gets time to read)
  const S = { hook: [0, T(1)], measure: [T(1), T(2)], payoff: [T(2), DURATION] };
  const { chords, chordAt } = makeChords(clock, {
    Am: { notes: ['A3', 'C4', 'E4'], bass: 'A1' }, F: { notes: ['A3', 'C4', 'F4'], bass: 'F1' },
    C: { notes: ['G3', 'C4', 'E4', 'B4'], bass: 'C2' } }, [[0, 0, 4, 'Am'], [1, 0, 4, 'F'], [2, 0, 8, 'C']]);
  // headline words stamp on 8th notes
  const HEAD = ['Ay', 'hər', 'il', 'Yerdən', '3,8 sm', 'uzaqlaşır.'];
  const words = HEAD.map((w, i) => ({ w, t: T(0, i * 0.5), key: w === '3,8 sm' }));
  const ev = {
    earth: T(0, 0), moon: T(0, 2),
    rulerStart: T(1, 0), land: T(2, 0),                  // counter lands, flash
    nudge: T(2, 1),                                      // moon slides out, "+3,8 sm / il"
  };
  // ruler ticks: one per 8th note while the ruler grows (each is a note)
  const ticks = []; for (let i = 0; i < 8; i++) ticks.push({ t: T(1, i * 0.5), i, midi: m(['A4', 'C5', 'E5', 'A5', 'C5', 'E5', 'G5', 'B5'][i]) });
  const markers = { earth: { t: ev.earth, sync: 'av' }, moon: { t: ev.moon, sync: 'av' }, land: { t: ev.land, sync: 'av' }, nudge: ev.nudge };
  const SCORE = { FPS, FORMAT, STYLE, W, H, SAFE, WIDE: false, DURATION, clock, T, BEAT, S, m, chords, chordAt, words, ev, ticks, markers };
  if (node) module.exports = SCORE; else globalThis.SCORE = SCORE;
})();
