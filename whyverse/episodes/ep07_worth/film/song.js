// THE SOUNDTRACK — voice (Kokoro, placed by the measured timeline) + a gentle chapter-aware music bed
// + one sound effect per visual hit (score.js sfx). Bed and SFX are levelled ≥20 dB under the voice.
const path = require('path');
const { SR, Bus, reverb } = require('./engine/audio/dsp');
const I = require('./engine/audio/instruments');
const MIX = require('./engine/audio/mix');
const sc = require('./score');
const { DURATION, m, CH, sfx, TL, ev } = sc;
const U = require('./engine/util');
const N = Math.ceil((DURATION + 0.5) * SR);
const bus = () => new Bus(N);
const out = path.join(__dirname, 'out');
const voice = MIX.loadAudio(path.join(out, 'vo.wav'), { at: 0, gain: 1, length: DURATION + 0.5 });
const pad = bus(), keys = bus(), low = bus(), perc = bus(), fx = bus(), verb = bus(), sting = bus();

// ---------- music bed: one mood per chapter ----------
const CHD = { Am: ['A3', 'C4', 'E4'], F: ['F3', 'A3', 'C4'], C: ['C4', 'E4', 'G4'], G: ['G3', 'B3', 'D4'], Dm: ['D4', 'F4', 'A4'], Bb: ['Bb3', 'D4', 'F4'], Em: ['E3', 'G3', 'B3'], D: ['D4', 'F#4', 'A4'], Bm: ['B3', 'D4', 'F#4'], A: ['A3', 'C#4', 'E4'], Gm: ['G3', 'Bb3', 'D4'], Fmaj7: ['F3', 'A3', 'C4', 'E4'], Cmaj7: ['C4', 'E4', 'G4', 'B4'] };
const MOOD = {
  c0: { prog: ['Am', 'F', 'C', 'G'], lead: 'musicBox', bpm: 84, shaker: false, kick: false, pad: 1.2 },
  c1: { prog: ['C', 'G', 'Am', 'F'], lead: 'marimba', bpm: 98, shaker: true, kick: false, pad: 0.9 },
  c2: { prog: ['Dm', 'Bb', 'F', 'C'], lead: 'guitar', bpm: 92, shaker: true, kick: false, pad: 0.9 },
  c3: { prog: ['Em', 'C', 'G', 'D'], lead: 'epiano', bpm: 88, shaker: true, kick: true, pad: 0.9 },
  c4: { prog: ['F', 'C', 'Dm', 'Bb'], lead: 'guitar', bpm: 84, shaker: false, kick: false, pad: 1.1 },
  c5: { prog: ['Fmaj7', 'C', 'Am', 'G'], lead: 'epiano', bpm: 80, shaker: false, kick: false, pad: 1.2 },
  c6: { prog: ['Am', 'Em', 'F', 'G'], lead: 'marimba', bpm: 100, shaker: true, kick: true, pad: 0.8 },
  c7: { prog: ['Cmaj7', 'G', 'Am', 'F'], lead: 'musicBox', bpm: 80, shaker: false, kick: false, pad: 1.2 },
};
const ARP = [0, 1, 2, 1, 0, 2, 1, 2];
for (const [c, mo] of Object.entries(MOOD)) {
  const { t0, t1 } = CH[c]; const beat = 60 / mo.bpm, bar = beat * 4;
  const start = c === 'c0' ? 0.2 : t0 + 0.35; // the bed restarts on each chapter card's stamp
  const end = c === 'c7' ? DURATION - 0.2 : t1 + 0.3;
  for (let b = 0; start + b * bar < end; b++) {
    const tb = start + b * bar; const name = mo.prog[b % mo.prog.length]; const notes = CHD[name].map(m);
    const dur = Math.min(bar, end - tb) + 0.4;
    for (const n of notes) { const { L, R } = I.padNote(n, dur, { cutoff: 1100, attack: 0.5, release: 1.0 }); pad.addStereo(L, R, tb, 0.06 * mo.pad); }
    low.addMono(I.bass(notes[0] - 24, beat * 1.6, { bright: 0.3, sub: 0.9 }), tb, 0.32);
    low.addMono(I.bass(notes[0] - 24 + (b % 2 ? 7 : 0), beat * 1.2, { bright: 0.3, sub: 0.9 }), tb + beat * 2, 0.24);
    for (let k = 0; k < 8; k++) {
      const t = tb + k * beat / 2; if (t >= end) break;
      if ((k === 3 || k === 7) && b % 2 === 0 && mo.lead !== 'guitar') continue; // little gaps so it breathes
      const n = notes[ARP[k] % notes.length] + 12 * (k === 6 && b % 4 === 3 ? 1 : 0);
      const pan = Math.sin((b * 8 + k) * 0.7) * 0.35;
      let buf, g = 0.2;
      if (mo.lead === 'marimba') buf = I.marimba(n + 12, { thock: 0.2, seed: k });
      else if (mo.lead === 'musicBox') { buf = I.musicBox(n + 12, { seed: k }); g = 0.14; }
      else if (mo.lead === 'guitar') { buf = I.guitar(n, 0.7, { seed: k + b }); g = 0.22; }
      else { if (k % 2) continue; buf = I.epiano(n, beat * 1.2); g = 0.2; }
      keys.addMono(buf, t, g, pan); verb.addMono(buf, t, g * 0.5, pan);
      if (mo.shaker) perc.addMono(I.shaker(k % 2 ? 0.6 : 1, 40 + k), t, 0.06, 0.3);
    }
    if (mo.kick) for (const k of [0, 2]) perc.addMono(I.kick({ punch: 0.5, tail: 0.18 }), tb + k * beat, 0.16);
  }
  // chapter-card sting: a bright bell chord on the stamp
  if (c !== 'c0' && c !== 'c7') { const tStamp = ev[c + '_stamp']; for (const n of CHD[mo.prog[0]].map(m)) { const b = I.bell(440 * Math.pow(2, (n + 12 - 69) / 12), 0.9, 1.8, 2.0); sting.addMono(b, tStamp, 0.12); verb.addMono(b, tStamp, 0.1); } }
}
// title sting: brass on each stamped word, then a held chord
ev.titleWords.forEach((w, i) => { const n = m(['A3', 'C4', 'E4', 'G4', 'A4', 'C5', 'E5'][i]); const b = I.brassNote(n, 0.32, { stab: true, seed: i }); sting.addStereo(b.L, b.R, w.t, 0.22); verb.addStereo(b.L, b.R, w.t, 0.1); });
{ const t = ev.titleBrand; for (const n of ['A3', 'C4', 'E4', 'G4'].map(m)) { const { L, R } = I.strings(n, 2.6, { attack: 0.3, release: 1.0 }); sting.addStereo(L, R, t, 0.1); } }
// end: held Fmaj9 under the end card
{ const t = ev.sync_logo; for (const n of ['F3', 'A3', 'C4', 'E4', 'G4'].map(m)) { const { L, R } = I.strings(n, DURATION - t, { attack: 0.4, release: 2 }); sting.addStereo(L, R, t, 0.08); } }

// ---------- sound effects: one per visual hit ----------
const buzz = (len = 0.9, f = 210) => { const n = Math.round(len * SR), b = new Float32Array(n); let ph = 0; for (let i = 0; i < n; i++) { const t = i / SR; const fr = f * (1 + 0.06 * Math.sin(t * 2 * Math.PI * 7)); ph += fr / SR; const saw = 2 * (ph % 1) - 1; const env = Math.min(1, t / 0.08) * Math.min(1, (len - t) / 0.25); b[i] = saw * env * 0.35; } let y = 0; for (let i = 0; i < n; i++) { y += 0.12 * (b[i] - y); b[i] = y; } return b; };
const env = (n, f) => { const o = new Float32Array(n); for (let i = 0; i < n; i++) o[i] = f(i / SR, i); return o; };
const mixb = (len, parts) => { const o = new Float32Array(Math.round(len * SR)); for (const [b, g, d = 0] of parts) { const off = Math.round(d * SR); for (let i = 0; i < b.length && i + off < o.length; i++) o[i + off] += b[i] * g; } return o; };
const SFX = {
  brush: (g, i) => I.noiseSweep(0.32, 700 + (i % 4) * 150, 2400, { q: 0.8, pink: true, seed: i }),
  harp: (g, i) => { const o = new Float32Array(Math.round(1.5 * SR)); [0, 2, 4, 7, 9, 12, 14].forEach((st, k) => { const b = I.musicBox(m('C5') + st, { seed: k + i }); const d = Math.round(k * 0.055 * SR); for (let j = 0; j < b.length && j + d < o.length; j++) o[j + d] += b[j] * 0.5; }); return o; },
  yawn: () => { let ph = 0; return env(Math.round(1.0 * SR), (t) => { const f = 520 - 300 * t + 60 * Math.sin(t * 9); ph += f / SR; const e = Math.min(1, t / 0.15) * Math.min(1, (1.0 - t) / 0.35); return (Math.sin(ph * 6.283) * 0.3 + Math.sin(ph * 2 * 6.283) * 0.1) * e; }); },
  heart: () => I.heartbeat(),
  zip: () => I.noiseSweep(0.3, 1200, 6000, { q: 1.2 }),
  sip: () => mixb(0.5, [[I.noiseSweep(0.25, 600, 1400, { q: 3, pink: true }), 0.6], [I.pop(900, 2), 0.4, 0.28]]),
  screech: () => { let ph = 0; return env(Math.round(0.8 * SR), (t, i) => { const f = 2200 - 900 * t + 120 * Math.sin(t * 90); ph += f / SR; return (Math.sin(ph * 6.283) * 0.35 + (U.hash(i, 5) - 0.5) * 0.25) * Math.min(1, t / 0.02) * Math.min(1, (0.8 - t) / 0.2); }); },
  chalk: (g, i) => I.scribble(0.35, 7 + i), slam: (g, i) => mixb(0.6, [[I.thud(80, 0.16), 1.0], [I.noiseSweep(0.18, 3000, 800, { q: 0.8, seed: i, pink: true }), 0.6]]),
  wipe: () => I.noiseSweep(0.5, 800, 2600, { q: 0.8, pink: true }),
  shrink: () => { let ph = 0; return env(Math.round(0.45 * SR), (t) => { ph += (900 - 1300 * t) / SR; return Math.sin(ph * 6.283) * 0.4 * Math.min(1, (0.45 - t) / 0.1); }); },
  spin: () => { let ph = 0; return env(Math.round(0.7 * SR), (t) => { ph += (500 + 300 * Math.sin(t * 40)) / SR; return Math.sin(ph * 6.283) * 0.3 * Math.min(1, t / 0.05) * Math.min(1, (0.7 - t) / 0.2); }); },
  pour: () => { const a = I.noiseSweep(1.6, 900, 2600, { q: 2.5, pink: true }); return env(a.length, (t, i) => a[i] * (0.6 + 0.4 * Math.sin(t * 30)) * Math.min(1, t / 0.1)); },
  clank: () => mixb(0.7, [[I.bell(620, 0.35, 3.5, 1.41), 0.6], [I.thud(140, 0.08), 0.8]]),
  crash: (g, i) => mixb(0.8, [[I.thud(70, 0.2), 0.9], [I.noiseSweep(0.6, 4000, 500, { q: 0.6, seed: i, pink: true }), 0.7]]),
  record: () => mixb(0.5, [[I.noiseSweep(0.3, 3000, 300, { q: 2.5 }), 0.8]]),
  winddown: () => { let ph = 0; return env(Math.round(1.6 * SR), (t) => { ph += (420 * Math.exp(-t * 1.3) + 40) / SR; return (2 * (ph % 1) - 1) * 0.18 * Math.min(1, t / 0.05) * Math.min(1, (1.6 - t) / 0.4); }); },
  squish: () => { let ph = 0; return env(Math.round(0.4 * SR), (t) => { ph += (300 - 500 * t) / SR; return Math.sin(ph * 6.283) * 0.45 * Math.min(1, (0.4 - t) / 0.1); }); },
  flow: () => I.noiseSweep(1.4, 300, 900, { q: 0.7, pink: true }),
  rise: () => { let ph = 0; return env(Math.round(1.0 * SR), (t) => { ph += (200 + 500 * t) / SR; return Math.sin(ph * 6.283) * 0.35 * Math.min(1, t / 0.1) * Math.min(1, (1 - t) / 0.2); }); },
  sizzle: () => I.noiseSweep(0.9, 5000, 7000, { q: 0.9, pink: false }),
  ice: (g, i) => mixb(0.8, [[I.bell(2637, 0.5, 1.2, 3.1), 0.5], [I.bell(3520, 0.4, 1.2, 3.1), 0.35, 0.06]]),
  flip: (g, i) => I.paperFwip(1.1, i), laser: () => { let ph = 0; return env(Math.round(0.4 * SR), (t) => { ph += (1800 - 2400 * t) / SR; return Math.sign(Math.sin(ph * 6.283)) * 0.15 * Math.exp(-t * 6); }); },
  pop: (g, i) => I.pop(1500 + (i % 5) * 220, i), fwip: (g, i) => I.paperFwip(0.9 + (i % 3) * 0.1, i), tick: (g, i) => I.woodTick(1 + (i % 4) * 0.12),
  stamp: () => { const a = I.thud(85, 0.14, 3), b = I.woodTick(0.7), o = new Float32Array(Math.max(a.length, b.length)); for (let i = 0; i < o.length; i++) o[i] = (a[i] || 0) * 1.0 + (b[i] || 0) * 0.5; return o; },
  whoosh: () => I.noiseSweep(0.45, 500, 3500, { q: 0.9, pink: true }), swell: () => I.noiseSweep(0.9, 300, 5000, { q: 0.8, shape: (x) => x * x, pink: true }),
  wind: () => I.noiseSweep(1.8, 200, 900, { q: 0.6, pink: true }), spray: (g, i) => I.noiseSweep(0.3, 5000, 7000, { q: 0.7, seed: i }), truck: () => I.noiseSweep(1.6, 60, 160, { q: 0.8, pink: true }),
  chime: (g, i) => I.musicBox(m(['C6', 'E6', 'G6', 'A6', 'D6'][i % 5]), { seed: i }), ding: (g, i) => I.bell(1320 + (i % 3) * 220, 0.5, 1.6, 2.0),
  coin: () => { const a = I.bell(988, 0.12, 1.2, 2), b = I.bell(1319, 0.35, 1.2, 2), o = new Float32Array(Math.round(0.5 * SR)); for (let i = 0; i < o.length; i++) o[i] = (a[i] || 0) + (b[i - Math.round(0.07 * SR)] || 0); return o; },
  vanish: () => { const a = I.noiseSweep(0.5, 6000, 300, { q: 1.2, pink: true }), b = I.bell(1760, 0.6, 1.4, 2.0), o = new Float32Array(Math.round(0.9 * SR)); for (let i = 0; i < o.length; i++) o[i] = (a[i] || 0) * 0.8 + (b[i] || 0) * 0.5; return o; },
  zap: () => { const n = Math.round(0.35 * SR), o = new Float32Array(n); let ph = 0; for (let i = 0; i < n; i++) { const t = i / SR, f = 2400 * Math.exp(-t * 9) + 300; ph += f / SR; o[i] = Math.sin(ph * 6.283) * Math.exp(-t * 7) * 0.6; } return o; },
  switch: () => { const a = I.tvClick ? I.tvClick() : I.woodTick(1.4), b = I.subBoom(0.8, 60, 30), o = new Float32Array(Math.max(a.length, b.length)); for (let i = 0; i < o.length; i++) o[i] = (a[i] || 0) + (b[i] || 0) * 0.5; return o; },
  blip: (g, i) => { const n = Math.round(0.16 * SR), o = new Float32Array(n), f = [880, 1175, 1318, 1568][i % 4]; for (let k = 0; k < n; k++) { const t = k / SR; o[k] = Math.sin(t * f * 6.283) * Math.exp(-t * 28) * 0.7 + Math.sin(t * f * 2 * 6.283) * Math.exp(-t * 40) * 0.2; } return o; },
  shimmer: (g, i) => { const o = new Float32Array(Math.round(1.4 * SR)); [0, 1, 2, 3, 4].forEach((k) => { const b = I.bell([1568, 1976, 2349, 2637, 3136][(k + i) % 5], 0.9, 1.5, 2.0); const d = Math.round(k * 0.06 * SR); for (let j = 0; j < b.length && j + d < o.length; j++) o[j + d] += b[j] * 0.35; }); return o; },
  bubble: (g, i) => { const o = new Float32Array(Math.round(0.9 * SR)); for (let k = 0; k < 9; k++) { const st = Math.round((k * 0.08 + 0.03 * U.hash(k, i)) * SR), f0 = 500 + 900 * U.hash(k, i + 3), n = Math.round(0.07 * SR); let ph = 0; for (let j = 0; j < n && st + j < o.length; j++) { const t = j / SR; ph += (f0 * (1 + t * 14)) / SR; o[st + j] += Math.sin(ph * 6.283) * Math.exp(-t * 45) * 0.35; } } return o; },
  splash: () => I.noiseSweep(0.6, 3000, 600, { q: 0.7, pink: true }),
  alarm: () => { const n = Math.round(0.6 * SR), o = new Float32Array(n); for (let i = 0; i < n; i++) { const t = i / SR, f = (Math.floor(t * 6) % 2 ? 660 : 880); o[i] = Math.sign(Math.sin(t * f * 6.283)) * 0.18 * Math.min(1, (0.6 - t) * 8); } let y = 0; for (let i = 0; i < n; i++) { y += 0.2 * (o[i] - y); o[i] = y; } return o; },
  brake: () => I.noiseSweep(0.7, 1200, 2600, { q: 6 }), release: () => I.noiseSweep(0.6, 400, 4000, { q: 0.8, pink: true }),
  impact: () => { const a = I.subBoom(2.2, 55, 25), b = I.noiseSweep(1.2, 4000, 200, { q: 0.6, pink: true }), o = new Float32Array(Math.max(a.length, b.length)); for (let i = 0; i < o.length; i++) o[i] = (a[i] || 0) + (b[i] || 0) * 0.6; return o; },
  horn: () => { const n = Math.round(1.3 * SR), o = new Float32Array(n); let p1 = 0, p2 = 0; for (let k = 0; k < n; k++) { const t = k / SR; p1 += 92 / SR; p2 += 138 / SR; const e = Math.min(1, t / 0.12) * Math.min(1, (1.3 - t) / 0.4); o[k] = ((2 * (p1 % 1) - 1) * 0.5 + (2 * (p2 % 1) - 1) * 0.3) * e * 0.5; } let y = 0; for (let k = 0; k < n; k++) { y += 0.08 * (o[k] - y); o[k] = y * 2.2; } return o; },
  knock: (g, i) => mixb(0.45, [[I.woodTick(0.55), 1.0], [I.woodTick(0.6), 0.9, 0.16]]),
  bell: () => I.bell(523, 1.6, 2.5, 2.0),
  click: () => I.woodTick(1.6),
  scribble: () => I.scribble(0.6, 3), scratch: () => I.noiseSweep(0.25, 2500, 400, { q: 2.5 }), buzz: () => buzz(1.0), boing: () => I.boing(), thud: () => I.thud(110, 0.1), boom: () => I.subBoom(1.4, 70, 30), drop: () => I.noiseSweep(0.35, 1800, 300, { q: 2 }),
  neon: (g, i) => { const n = Math.round(0.42 * SR), o = new Float32Array(n); const a = I.woodTick(1.3); let ph = 0; for (let k = 0; k < n; k++) { const t = k / SR; ph += 120 / SR; const hum = (2 * (ph % 1) - 1) * 0.22 * Math.exp(-t * 6) * (Math.floor(t * 40) % 3 === 1 && t < 0.12 ? 0.2 : 1); o[k] = hum + (a[k] || 0) * 0.9; } const b = I.bell(880 * Math.pow(2, (i % 5) / 12), 0.3, 1.4, 2.0); for (let k = 0; k < b.length && k < n; k++) o[k] += b[k] * 0.35; let y = 0; for (let k = 0; k < n; k++) { y += 0.35 * (o[k] - y); o[k] = y; } return o; },
  crack: () => { const a = I.noiseSweep(0.18, 6000, 1500, { q: 1.5 }), b = I.thud(70, 0.2), o = new Float32Array(Math.round(0.6 * SR)); for (let k = 0; k < o.length; k++) o[k] = (a[k] || 0) * 1.2 + (b[k] || 0) * 0.8; return o; },
  flap: (g, i) => { const o = new Float32Array(Math.round(0.6 * SR)); for (let j = 0; j < 4; j++) { const b = I.noiseSweep(0.09, 900, 2400, { q: 1.1, seed: i * 7 + j, pink: true }); const d = Math.round(j * 0.12 * SR); for (let k = 0; k < b.length && k + d < o.length; k++) o[k + d] += b[k] * 0.8; } return o; },
  stretch: () => { const n = Math.round(0.8 * SR), o = new Float32Array(n); let ph = 0; for (let k = 0; k < n; k++) { const t = k / SR, f = 900 * Math.exp(-t * 2.4) + 120; ph += f / SR; o[k] = Math.sin(ph * 6.283) * 0.5 * Math.min(1, t / 0.03) * Math.min(1, (0.8 - t) / 0.2); } return o; },
  rewind: () => { const n = Math.round(1.0 * SR), o = new Float32Array(n); let ph = 0; for (let k = 0; k < n; k++) { const t = k / SR, f = 300 + 2600 * t; ph += f / SR; o[k] = (Math.sin(ph * 6.283) * 0.25 + (U.hash(k, 3) - 0.5) * 0.25) * Math.min(1, t / 0.05) * Math.min(1, (1 - t) / 0.15) * (0.6 + 0.4 * Math.sin(t * 60)); } return o; },
  hiss: () => { const n = Math.round(1.2 * SR), o = new Float32Array(n); for (let k = 0; k < n; k++) { const t = k / SR; o[k] = (U.hash(k, 11) - 0.5) * 0.55 * Math.min(1, t / 0.08) * Math.min(1, (1.2 - t) / 0.4); } let y = 0; for (let k = 0; k < n; k++) { const x = o[k]; o[k] = x - y; y = x * 0.6; } return o; },
  splat: () => { const a = I.thud(140, 0.08), b = I.noiseSweep(0.2, 1200, 300, { q: 1.2, pink: true }), o = new Float32Array(Math.round(0.4 * SR)); for (let k = 0; k < o.length; k++) o[k] = (a[k] || 0) + (b[k] || 0) * 0.7; return o; },
  meteor: (g, i) => { const b = I.noiseSweep(0.55, 4500, 1500, { q: 1.4, seed: i, pink: true }); const c = I.bell(2093 + (i % 3) * 300, 0.4, 1.6, 2.0); const o = new Float32Array(Math.max(b.length, c.length)); for (let k = 0; k < o.length; k++) o[k] = (b[k] || 0) * 0.7 + (c[k] || 0) * 0.25; return o; },
};
// ep07 additions (blueprint sounds)
Object.assign(SFX, {
  pen: (g, i) => I.scribble(0.42, 11 + i),
  jet: (g, i) => mixb(0.8, [[I.noiseSweep(0.7, 260, 1900, { q: 0.9, seed: i, pink: true }), 0.7]]),
  clunk: () => SFX.clank(),
  flutter: (g, i) => mixb(0.7, [0, 1, 2, 3, 4].map((k) => [I.noiseSweep(0.07, 900 + k * 200, 2600, { q: 1.5, seed: i + k, pink: true }), 0.7, k * 0.11])),
  type: (g, i) => mixb(0.7, [0, 1, 2, 3, 4, 5].map((k) => [I.pop(1800 + (k % 3) * 300, 6), 0.4, k * 0.09])),
  beep: () => env(Math.round(0.32 * SR), (t) => (t < 0.12 || (t > 0.17 && t < 0.29) ? Math.sin(t * 2 * Math.PI * 1320) * 0.35 * Math.min(1, ((t % 0.17) / 0.01)) : 0)),
  chop: (g, i) => mixb(0.6, [[I.thud(120, 0.1), 0.9], [I.noiseSweep(0.12, 2500, 900, { q: 1, seed: i, pink: true }), 0.6]]),
  drain: (g, i) => I.noiseSweep(0.9, 1600, 250, { q: 2.5, seed: i, pink: true }),
  rain: (g, i) => mixb(1.2, Array.from({ length: 14 }, (_, k) => [I.pop(1400 + U.hash(k, i) * 1800, 8), 0.25, k * 0.08 + U.hash(k, i + 1) * 0.05])),
  glow: (g, i) => SFX.shimmer(g, i),
});
for (let k = 0; k < 6; k++) SFX['note' + k] = () => I.marimba(m(['C5', 'D5', 'E5', 'G5', 'A5', 'C6'][k]), { thock: 0.25, seed: k });
sfx.forEach(([t, kind, g, pan], i) => { const f = SFX[kind]; if (!f) { console.warn('no sfx', kind); return; } const b = f(g, i); fx.addMono(b, t, g, pan); if (kind === 'stamp' || kind === 'chime' || kind === 'ding' || kind === 'shimmer' || kind === 'vanish' || kind === 'neon' || kind === 'meteor' || kind === 'harp' || kind.startsWith('note')) verb.addMono(b, t, g * 0.25, pan); });

// ---------- mix + levelling (bed and SFX ≥ 20 dB under the voice) ----------
const wet = reverb(verb, { room: 0.8, damp: 0.4 });
const music = bus(); for (const [b, g] of [[pad, 1], [keys, 1], [low, 1], [perc, 1], [wet, 1]]) b.mixInto(music, g);
MIX.duck([music, sting], voice, { depth: 0.65, attack: 0.03, release: 0.5, threshold: 0.03 });
const speech = []; for (const l of TL.lines) speech.push([l.t, l.end]);
const rms = (b, spans) => { let s = 0, n = 0; for (const [a, z] of spans) for (let i = Math.round(a * SR); i < Math.min(b.n, Math.round(z * SR)); i++) { s += b.L[i] * b.L[i] + b.R[i] * b.R[i]; n += 2; } return Math.sqrt(s / Math.max(1, n)); };
const db = (x) => 20 * Math.log10(x + 1e-12);
const vR = rms(voice, speech);
const mR = rms(music, speech);
const hitSpans = sfx.map(([t]) => [t, t + 0.12]);
const fR = rms(fx, hitSpans);
const stingSpans = [[ev.titleWords[0].t, ev.titleBrand + 2]].concat(['c1', 'c2', 'c3', 'c4', 'c5', 'c6'].map((c) => [ev[c + '_stamp'], ev[c + '_stamp'] + 0.8]));
const sR = rms(sting, stingSpans);
const MUSIC_DB = parseFloat(process.env.MUSIC_DB || '-23'), FX_DB = parseFloat(process.env.FX_DB || '-20');
const gM = Math.pow(10, (MUSIC_DB - (db(mR) - db(vR))) / 20), gF = Math.pow(10, (FX_DB - (db(fR) - db(vR))) / 20);
const STING_DB = parseFloat(process.env.STING_DB || '-14'); const gS = Math.pow(10, (STING_DB - (db(sR) - db(vR))) / 20);
const stems = { voice, music, fx, sting };
const mix = MIX.mixdown(stems, { voice: 1, music: gM, fx: gF, sting: gS }, { stemDir: process.env.STEMS ? out : null });
MIX.highpass(mix, 30);
MIX.fadeOut(mix, DURATION - 1.4, DURATION);
const M = MIX.master(mix, 0.8, undefined, { lufs: parseFloat(process.env.LUFS || '-14') });
MIX.writeWav(path.join(out, 'music.wav'), mix);
console.log(`voice ${db(vR).toFixed(1)} dB · music bed ${(db(mR * gM) - db(vR)).toFixed(1)} dB under-voice ratio · stings (no voice under them) ${(db(sR * gS) - db(vR)).toFixed(1)} dB · sfx (per hit) ${(db(fR * gF) - db(vR)).toFixed(1)} dB · master ${M.lufs !== undefined ? M.lufs.toFixed(1) + ' LUFS' : ''}`);
console.log(`wrote out/music.wav (${DURATION.toFixed(2)}s)`);
