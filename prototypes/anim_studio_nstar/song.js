const path = require('path');
const { SR, Bus, reverb } = require('./engine/audio/dsp');
const I = require('./engine/audio/instruments');
const MIX = require('./engine/audio/mix');
const sc = require('./score');
const { T, BEAT, DURATION, m, ev } = sc;
const N = Math.ceil(DURATION * SR), bus = () => new Bus(N);
const pad = bus(), keys = bus(), fx = bus(), drums = bus(), verb = bus();
for (const c of sc.chords) for (const n of c.notes) { if (c.t0 >= DURATION) continue; const { L, R } = I.padNote(n, Math.min(c.t1, DURATION) - c.t0, { cutoff: 1300, attack: 0.3, release: 1.2 }); pad.addStereo(L, R, c.t0, 0.07); }
// slow arpeggio (music box) on 8ths, soft, through the whole film
const arp = ['A4', 'E5', 'C5', 'E5'];
for (let t = 0, i = 0; t < DURATION - 1; t += BEAT, i++) { const x = I.musicBox(m(arp[i % 4]) + 12 * (i % 8 === 7)); keys.addMono(x, t, 0.06, -0.3 + 0.2 * (i % 4)); verb.addMono(x, t, 0.06); }
// beat changes: whoosh + soft thud
for (const t0 of [ev.b1, ev.b2, ev.b3]) { fx.addMono(I.noiseSweep(0.5, 400, 4000, { q: 0.8, pink: true }), t0 - 0.45, 0.10); fx.addMono(I.thud(80, 0.1), t0, 0.35); }
// counter ticks = marimba notes
for (const k of sc.ticks) { const x = I.marimba(k.midi, { thock: 0.3 }); keys.addMono(x, k.t, 0.26, -0.6 + k.i * 0.17); verb.addMono(x, k.t, 0.12); }
// landing + building pop: bell + sub
for (const t0 of [ev.ringLand, ev.walk, ev.house]) { const b = I.bell(1046.5, 1.4); keys.addMono(b, t0, 0.22); verb.addMono(b, t0, 0.28); fx.addMono(I.subBoom(1.0), t0, 0.3); }
fx.addMono(I.paperFwip(1.0, 7), ev.thin - 0.03, 0.14, 0.3);
const K = I.kick({ punch: 0.5 });
for (let t = ev.b3; t < ev.cta; t += BEAT * 2) drums.addMono(K, t, 0.18);
fx.addMono(I.pop(1.2), ev.cta, 0.3);
const stems = { pad, keys, fx, drums, verb: reverb(verb, { room: 0.82, damp: 0.35 }) };
const GAIN = { pad: 2.0, keys: 1.0, fx: 0.7, drums: 0.5, verb: 1 };
const out = path.join(__dirname, 'out');
const mix = MIX.mixdown(stems, GAIN, { stemDir: process.env.STEMS ? out : null });
MIX.highpass(mix, 25); MIX.fadeOut(mix, DURATION - 1.0, DURATION);
const M = MIX.master(mix, 0.8, undefined, { lufs: -16 });
MIX.writeWav(path.join(out, 'music.wav'), mix);
console.log(`wrote out/music.wav (${DURATION.toFixed(2)}s, ${M.lufs !== undefined ? M.lufs.toFixed(1) + ' LUFS' : ''})`);
