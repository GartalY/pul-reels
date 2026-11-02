const path = require('path');
const { SR, Bus, reverb } = require('./engine/audio/dsp');
const I = require('./engine/audio/instruments');
const MIX = require('./engine/audio/mix');
const sc = require('./score');
const { T, BEAT, DURATION, m, ev } = sc;
const N = Math.ceil(DURATION * SR), bus = () => new Bus(N);
const pad = bus(), keys = bus(), fx = bus(), drums = bus(), verb = bus();
for (const c of sc.chords) for (const n of c.notes) { const { L, R } = I.padNote(n, Math.min(c.t1, DURATION) - c.t0, { cutoff: 1400, attack: 0.25, release: 1.2 }); pad.addStereo(L, R, c.t0, 0.08); }
// headline stamps: soft pops on the 8ths
sc.words.forEach((w, i) => fx.addMono(I.pop(w.key ? 1.4 : 1 + i * 0.05), w.t, w.key ? 0.35 : 0.18, -0.2 + i * 0.08));
// planets appear: low thud + glass
fx.addMono(I.thud(70, 0.12), ev.earth, 0.5); keys.addMono(I.musicBox(m('A5')), ev.earth, 0.22); verb.addMono(I.musicBox(m('A5')), ev.earth, 0.2);
fx.addMono(I.thud(90, 0.1), ev.moon, 0.4); keys.addMono(I.musicBox(m('E6')), ev.moon, 0.2); verb.addMono(I.musicBox(m('E6')), ev.moon, 0.2);
// ruler ticks = marimba notes, panned left->right like the ruler
for (const k of sc.ticks) { const x = I.marimba(k.midi, { thock: 0.3 }); keys.addMono(x, k.t, 0.32, -0.6 + k.i * 0.17); verb.addMono(x, k.t, 0.15); }
// soft kick on the beats of bar 1, then the landing
const K = I.kick({ punch: 0.6 });
for (let b = 0; b < 4; b++) drums.addMono(K, T(1, b), 0.35);
fx.addMono(I.noiseSweep(0.9, 300, 5000, { q: 0.9, pink: true, shape: (x) => x * x }), ev.land - 0.9, 0.14);
drums.addMono(I.crash(18), ev.land, 0.22); fx.addMono(I.subBoom(1.4), ev.land, 0.45);
const chime = I.bell(m('C6') ? 1046.5 : 1046.5, 1.6); keys.addMono(chime, ev.land, 0.25); verb.addMono(chime, ev.land, 0.3);
fx.addMono(I.paperFwip(1.2, 7), ev.nudge - 0.03, 0.2, 0.4);
const stems = { pad, keys, fx, drums, verb: reverb(verb, { room: 0.82, damp: 0.35 }) };
const GAIN = { pad: 2.0, keys: 1.0, fx: 0.7, drums: 0.5, verb: 1 };
const out = path.join(__dirname, 'out');
const mix = MIX.mixdown(stems, GAIN, { stemDir: process.env.STEMS ? out : null });
MIX.highpass(mix, 25); MIX.fadeOut(mix, DURATION - 0.8, DURATION);
const M = MIX.master(mix, 0.8, undefined, { lufs: process.env.LUFS ? parseFloat(process.env.LUFS) : -14 });
MIX.writeWav(path.join(out, 'music.wav'), mix);
console.log(`wrote out/music.wav (${DURATION.toFixed(2)}s, ${M.lufs !== undefined ? M.lufs.toFixed(1) + ' LUFS' : ''})`);
