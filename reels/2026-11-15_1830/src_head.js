// "146 qol, 234 oyun" — @bilirdinizmi_az 18:30 animated reel, 15 Nov 2026. Pure function of time.
// Portugal 1-4 Denmark (UNL, Braga, 14 Nov 2026): first match after Ronaldo left the national team; every
// player wore No. 7, applause at minute 7, "Thank you, captain" banner; Portugal already in the quarter-finals.
// Arif voice (ElevenLabs) on audio/vo.wav; captions/objects timed to ElevenLabs Scribe word starts.
// Night-stadium look in Portugal red/green; Ronaldo only as a silhouette (rule 1g). No music; soft SFX only.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = __TIMING__;
const C = {
  grass: '#0F5132', grass2: '#13603B', night: '#0A1020', chalk: '#F6F3EA', gold: '#F5C33B', ink: '#08130E',
  panel: '#0D1B2A', panel2: '#1B2E44', red: '#D7263D', pred: '#B5121B', pgreen: '#046A38', grey: '#2B2B30', grey2: '#35353B',
  mute: '#A9B4AE', sil: '#05070C', wine: '#3B0A14', wine2: '#56101F',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));

const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const LN = (i) => TIMING.lines[i].t0;
const END = TIMING.dur + 1.3;

const S = { A: 0, B: LN(1) - 0.12, C: LN(2) - 0.12, D: LN(3) - 0.12, E: LN(4) - 0.12, F: LN(5) - 0.12, G: LN(6) - 0.12, H: LN(7) - 0.12 };
const B = (t) => t / 0.5;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.3, from, to }];
const SHIRT_T = (i) => T('futbolçuların') + i * 0.11;
const HITS = [
  [B(0.02), '146', 'thud'], [B(T('qol,')), 'QOL chip', 'click'], [B(T('234')), '234', 'thud'], [B(T('oyun.')), 'OYUN chip', 'click'],
  WH(S.B, 600, 2200), [B(T('Ronaldo')), 'silhouette', 'thud'], [B(T('gedəndən')), 'walks off', 'whoosh', { len: 0.35, from: 1600, to: 500 }],
  [B(T('Portuqaliya')), 'team card', 'click'], [B(T('ilk')), '1-ci oyun stamp', 'thud'],
  WH(S.C, 2200, 600), [B(T('Braqada')), 'date chip', 'click'],
  [B(SHIRT_T(0)), 'shirt', 'tick'], [B(SHIRT_T(1)), 'shirt', 'tick'], [B(SHIRT_T(2)), 'shirt', 'tick'], [B(SHIRT_T(3)), 'shirt', 'tick'], [B(SHIRT_T(4)), 'shirt', 'tick'], [B(SHIRT_T(5)), 'shirt', 'tick'],
  [B(T('7')), 'all flip to 7', 'type', { len: 0.4, n: 6 }], [B(T('formada')), 'HAMISI 7', 'click'],
  WH(S.D, 600, 2200), [B(T('7-ci')), 'clock 07', 'type', { len: 0.45, n: 7 }], [B(T('stadion')), 'crowd up', 'whoosh', { len: 0.3, from: 500, to: 1600 }],
  [B(T('Ronaldonu')), 'mosaic 7', 'thud'], [B(T('alqışladı.')), 'clap', 'click'], [B(T('alqışladı.') + 0.18), 'clap', 'click'], [B(T('alqışladı.') + 0.36), 'clap', 'click'],
  WH(S.E, 2200, 600), [B(S.E + 0.1), 'banner unrolls', 'whoosh', { len: 0.45, from: 400, to: 1400 }], [B(T('«Sağ')), 'SAĞ OL', 'thud'], [B(T('kapitan»')), 'KAPİTAN + armband', 'thud'],
  WH(S.F, 600, 2200), [B(T('Danimarka')), 'DEN row', 'click'], [B(T('4:1')), 'goal 1', 'tick'], [B(T('4:1') + 0.1), 'goal 2', 'tick'], [B(T('4:1') + 0.2), 'goal 3', 'tick'], [B(T('4:1') + 0.3), 'goal 4', 'thud'],
  [B(T('qalib')), 'stamp', 'thud'],
  WH(S.G, 2200, 600), [B(T('Amma')), 'AMMA', 'click'], [B(T('dörddəbir')), 'flag flies in', 'whoosh', { len: 0.3, from: 600, to: 1900 }], [B(T('finala') + 0.1), 'slot lands', 'thud'], [B(T('çıxıb.')), 'check', 'click'],
  WH(S.H, 600, 2200), [B(T('Bəyən')), 'BƏYƏN', 'click'], [B(T('izlə')), 'İZLƏ', 'thud'], [B(T('fakt!') + 0.3), 'tagline', 'tick'],
];
