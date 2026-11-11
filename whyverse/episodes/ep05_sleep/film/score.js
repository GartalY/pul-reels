// THE SCORE — single source of truth for picture and sound. Voice-line times come from timeline.js
// (built from the measured Kokoro wavs); every visual hit and every sound effect is an event here.
(function () {
  const node = typeof require !== 'undefined';
  const U = node ? require('./engine/util') : globalThis.U;
  const MU = node ? require('./engine/music') : globalThis.MUSIC;
  const TL = node ? require('./timeline') : globalThis.TL;
  const { m, makeClock } = MU;
  const FPS = 30, STYLE = 'watercolor';
  const FORMAT = U.pickFormat('16:9');
  const [W, H] = U.formatSize(FORMAT);
  const SAFE = U.safeArea(W, H);
  const WIDE = true;
  const DURATION = TL.DURATION;
  const clock = makeClock({ bpm: 80, offset: 0 });
  const { T, BEAT } = clock;

  // ---------- voice lines ----------
  const LINES = {}; TL.lines.forEach((l, i) => { l.i = i; LINES[l.id] = l; });
  const L = (id) => { const l = LINES[id]; if (!l) throw new Error('no line ' + id); return l; };
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
  // W('c0_4', 'never', n) -> start time of the n-th word starting with 'never' in that line
  const Wt = (id, w, n = 0, end = false) => {
    const l = L(id), key = norm(w); let k = 0;
    for (const x of l.words) if (norm(x.w).startsWith(key)) { if (k++ === n) return end ? x.end : x.t; }
    throw new Error(`word "${w}" not in ${id}: ${l.text}`);
  };
  const next = (id) => { const l = L(id); const n = TL.lines[l.i + 1]; return n ? n.t : DURATION; };

  // ---------- chapters (sections) ----------
  const chs = ['c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
  const first = (c) => TL.lines.find((l) => l.ch === c);
  const S = {}; const CH = {};
  chs.forEach((c, i) => {
    const t0 = i === 0 ? 0 : first(c).t - 1.15;
    const t1 = i + 1 < chs.length ? first(chs[i + 1]).t - 1.15 : DURATION;
    CH[c] = { t0, t1 }; S[c] = [t0, t1];
  });

  // ---------- events + sound effects (film.js and song.js both read these) ----------
  const ev = {}; const sfx = []; // sfx: [t, kind, gain(0..1), pan]
  const hit = (t, kind, g = 1, pan = 0) => { sfx.push([t, kind, g, pan]); return t; };
  const build = node ? require('./events') : globalThis.EVENTS;
  build({ L, Wt, next, ev, hit, CH, U, DURATION });
  sfx.sort((a, b) => a[0] - b[0]);
  const markers = {};
  // verified hits: the title stamps land in a silence (no voice), so sound + picture can be measured cleanly
  ev.titleWords.forEach((w, i) => { markers['title_' + (i + 1)] = { t: w.t, sync: 'av' }; });
  for (const k of Object.keys(ev)) if (k.startsWith('sync_')) markers[k.replace('sync_', '')] = { t: ev[k], sync: 'v' };

  const subtitles = TL.lines.map((l) => ({ t: l.t, end: l.end, text: l.text }));
  const SCORE = { FPS, FORMAT, STYLE, W, H, SAFE, WIDE, DURATION, clock, T, BEAT, m, S, CH, L, Wt, next, LINES, TL, ev, sfx, markers, subtitles, MOUTH: TL.mouth };
  if (node) module.exports = SCORE; else globalThis.SCORE = SCORE;
})();
