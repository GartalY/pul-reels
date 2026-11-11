// NO MUSIC ON BILIRDINIZMI (RUNBOOK 2026-11-10): only non-melodic SFX (whoosh, thud, tick, pop) + soft noise ambience.
const path = require('path');
const { SR, Bus } = require('./engine/audio/dsp');
const I = require('./engine/audio/instruments');
const MIX = require('./engine/audio/mix');
const sc = require('./score');
const { DURATION, ev } = sc;
const N = Math.ceil(DURATION * SR), bus = () => new Bus(N);
const amb = bus(), fx = bus();
// ambience: overlapping slow low band-passed pink-noise swells (no pitch, no notes)
for (let t = 0, k = 0; t < DURATION; t += 3, k++) amb.addMono(I.noiseSweep(6, 180 + 60 * (k % 3), 420, { q: 0.6, pink: true, seed: 40 + k }), t - 1.5 < 0 ? 0 : t - 1.5, 0.05, k % 2 ? 0.3 : -0.3);
for (const t0 of [ev.b1, ev.b2, ev.b3]) { fx.addMono(I.noiseSweep(0.5, 400, 4000, { q: 0.8, pink: true }), t0 - 0.45, 0.10); fx.addMono(I.thud(80, 0.1), t0, 0.35); }
for (const k of sc.ticks) fx.addMono(I.woodTick(1 + 0.05 * k.i), k.t, 0.12, -0.5 + k.i * 0.14);
for (const t0 of [ev.ringLand, ev.walk, ev.house]) { fx.addMono(I.subBoom(1.0), t0, 0.3); fx.addMono(I.pop(1500), t0, 0.18); }
fx.addMono(I.paperFwip(1.0, 7), ev.thin - 0.03, 0.14, 0.3);
fx.addMono(I.pop(1.2), ev.cta, 0.3);
const out = path.join(__dirname, 'out');
const mix = MIX.mixdown({ amb, fx }, { amb: 1.0, fx: 0.8 }, {});
MIX.highpass(mix, 25); MIX.fadeOut(mix, DURATION - 1.0, DURATION);
const M = MIX.master(mix, 0.8, undefined, { lufs: -18 });
MIX.writeWav(path.join(out, 'music.wav'), mix);
console.log(`wrote out/music.wav (${DURATION.toFixed(2)}s, ${M.lufs !== undefined ? M.lufs.toFixed(1) + ' LUFS' : ''})`);
