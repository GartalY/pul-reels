// THE SCORE — single source of truth for picture and sound. Voice-line times come from timeline.js
// (built from the measured Kokoro wavs by ../tools/build_timeline.py); every visual hit and its sound is an
// event in events.js. Whyverse short 2026-11-05 "Why did NASA's Swift fall?" — 9:16, neon style.
(function () {
  const node = typeof require !== 'undefined';
  const U = node ? require('./engine/util') : globalThis.U;
  const MU = node ? require('./engine/music') : globalThis.MUSIC;
  const TL = node ? require('./timeline') : globalThis.TL;
  const { m, makeClock } = MU;
  const FPS = 30, STYLE = 'neon';
  const FORMAT = U.pickFormat('9:16');
  const [W, H] = U.formatSize(FORMAT);
  const SAFE = U.safeArea(W, H);
  const WIDE = W / H > 1.2;
  const DURATION = TL.DURATION;
  const clock = makeClock({ bpm: 100, offset: 0 });
  const { T, BEAT } = clock;

  const LINES = {}; TL.lines.forEach((l, i) => { l.i = i; LINES[l.id] = l; });
  const L = (id) => { const l = LINES[id]; if (!l) throw new Error('no line ' + id); return l; };
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  const Wt = (id, w, n = 0, end = false) => {
    const l = L(id), key = norm(w); let k = 0;
    for (const x of l.words) if (norm(x.w).startsWith(key)) { if (k++ === n) return end ? x.end : x.t; }
    throw new Error(`word "${w}" not in ${id}: ${l.text}`);
  };

  // shots = sections: each starts ~0.3 s before its first line (s1 starts at 0)
  const shots = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8'];
  const first = (c) => TL.lines.find((l) => l.ch === c);
  const S = {}, CH = {};
  shots.forEach((c, i) => {
    const t0 = i === 0 ? 0 : first(c).t - 0.3;
    const t1 = i + 1 < shots.length ? first(shots[i + 1]).t - 0.3 : DURATION;
    CH[c] = { t0, t1 }; S[c] = [t0, t1];
  });

  const ev = {}; const sfx = [];
  const hit = (t, kind, g = 1, pan = 0) => { sfx.push([t, kind, g, pan]); return t; };
  const build = node ? require('./events') : globalThis.EVENTS;
  build({ L, Wt, ev, hit, CH, U, DURATION });
  sfx.sort((a, b) => a[0] - b[0]);

  const markers = {};
  for (const c of shots) markers[c] = { t: CH[c].t0 };
  for (const k of Object.keys(ev)) if (k.startsWith('sync_')) markers[k.slice(5)] = { t: ev[k], sync: 'v' };

  const subtitles = TL.lines.map((l) => ({ t: l.t, end: l.end, text: l.text }));
  const SCORE = { FPS, FORMAT, STYLE, W, H, SAFE, WIDE, DURATION, clock, T, BEAT, m, S, CH, L, Wt, LINES, TL, ev, sfx, markers, subtitles, MOUTH: TL.mouth };
  if (node) module.exports = SCORE; else globalThis.SCORE = SCORE;
})();
