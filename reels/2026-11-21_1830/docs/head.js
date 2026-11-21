// "İki ildə 36 pillə" — @bilirdinizmi_az 18:30 animated TREND reel, 21 Nov 2026. Pure function of time.
// UN E-Government Survey 2026 (EGDI, 194 countries): Azerbaijan 74th (2024) -> 38th (2026), +36; Online Services Index
// 67th -> 11th; overall above China (41st); Nov 2025 target "top 40 in five years" reached in one year
// (trend.az, apa.az, koreatimes, xinhua, un.org). Arif voice (ElevenLabs) on audio/vo.wav; every word/number timed to
// Scribe word starts remapped onto silencedetect phrases. World: cream ranking paper. No logos, no people. No music.
import * as M from './lib/motion.js';
const { W, H, FORMAT, E, prog, lerp, spring, SPRING, font, text, fill, rrect, shake, hash01, clamp, TAU } = M;

const TIMING = __TIMING__;
const C = {
  paper: '#F3E7CD', paper2: '#E8D8B4', ink: '#1C1A22', red: '#DA251D', star: '#FFDE00', gold: '#FFCD00', teal: '#178A86',
  chalk: '#FFFDF6', green: '#2FB866', grey: '#B9AE98', mute: '#7D7262', sil: '#141219', blue: '#1E5BB8', panel: '#1C1A22',
  azb: '#00B5E2', azr: '#EF3340', azg: '#509E2F',
};
const D = 'Display', UI = 'UI';
const s = FORMAT.safe, cx = s.x + s.w / 2;
const sp = (t, t0, cfg = SPRING.snappy) => (t < t0 ? 0 : spring(t - t0, cfg));
const pop = (t, t0) => Math.min(1.08, sp(t, t0, SPRING.bouncy));

const ALLW = TIMING.lines.flatMap((l) => l.words);
const T = (w, n = 0) => { const m = ALLW.filter((x) => x.w === w); return m[n] ? m[n].t : 0; };
const END = TIMING.dur + 1.3;
const S = { A: 0, B: T('BMT') - 0.12, C: T('Azərbaycan') - 0.12, E: T('Ən') - 0.12, F: T('Azərbaycan', 1) - 0.12,
  G: T('Ən', 1) - 0.12, I: T('Bəyən') - 0.12 };
const B = (t) => t / 0.5;
const WH = (t, from, to) => [B(t), 'whip', 'whoosh', { len: 0.3, from, to }];

const STOPS = [['+36', 0.1], ['38-Cİ', T('38-cidir.')], ['11-Cİ', T('11-ci')], ['ÇİN', T('Çindən')], ['HƏDƏF', T('hədəf')]];

const HITS = [
  [B(0.02), '+36', 'thud'], [B(T('36')), 'climb', 'whoosh', { len: 0.5, from: 400, to: 1600 }], [B(T('pillə!')), 'PİLLƏ', 'click'],
  WH(S.B, 600, 2200), [B(T('BMT')), 'BMT', 'thud'], [B(T('194')), '194', 'click'], [B(T('elektron')), 'E-HÖKUMƏT', 'tick'],
  [B(T('açıqladı.')), 'list stops', 'tick'],
  WH(S.C, 2200, 600), [B(T('Azərbaycan')), 'flag', 'click'], [B(T('74-cü')), '74', 'thud'], [B(T('İndi')), '2026', 'tick'],
  [B(T('38-cidir.') - 0.05), 'climb', 'whoosh', { len: 0.6, from: 400, to: 1800 }], [B(T('38-cidir.') + 0.55), '38', 'thud'],
  WH(S.E, 600, 2200), [B(T('sıçrayış')), 'stamp', 'thud'], [B(T('onlayn')), 'phone', 'click'], [B(T('dövlət')), 'tiles', 'tick'],
  [B(T('xidmətlərindədir:')), 'tiles', 'tick'], [B(T('67-cidən')), '67', 'click'], [B(T('11-ci') - 0.05), 'roll', 'whoosh', { len: 0.5, from: 500, to: 1700 }],
  [B(T('11-ci') + 0.45), '11', 'thud'],
  WH(S.F, 2200, 600), [B(T('Azərbaycan', 1)), 'AZ row', 'click'], [B(T('Çindən')), 'CN row', 'click'], [B(T('yuxarıdadır.')), 'swap', 'whoosh', { len: 0.4, from: 500, to: 1500 }],
  [B(T('yuxarıdadır.') + 0.35), 'land', 'thud'],
  WH(S.G, 600, 2200), [B(T('hədəf')), 'target', 'thud'], [B(T('5')), '5 İL', 'click'], [B(T('40-a')), 'İLK 40', 'tick'],
  [B(T('1')), 'X', 'click'], [B(T('alındı.') - 0.25), 'arrow', 'whoosh', { len: 0.35, from: 800, to: 2400 }], [B(T('alındı.') + 0.05), 'bullseye', 'thud'],
  WH(S.I, 600, 2200), [B(T('Bəyən')), 'BƏYƏN', 'click'], [B(T('izlə')), 'İZLƏ', 'thud'], [B(T('fakt!') + 0.3), 'send line', 'tick'],
];
