# Ep04 — What if Earth stopped spinning? — NOTES

status: DONE — scheduled 2026-11-10 (YouTube 19:00 London; Short 1 YouTube/Instagram/TikTok Wed 11 Nov 23:00 London, Short 2 Instagram/TikTok Thu 12 Nov 23:00 London; see ../../posts.json, PUBLISH.md)

- **Topic choice:** trend check first (run started Mon 9 Nov 20:24 London = Tue 10 Nov 00:24 Baku). The week's big world stories were
  US midterm politics, Iran/Gulf, Ukraine, a Kraków shooting, COP31 — nothing with a lasting, neutral "why / what if" science angle.
  Science news (Swift re-entry, Hubble drag) was already covered by the 5 Nov trend Short (satellite re-entry). So this is the first
  evergreen in the PLAN.md queue without a finished episode (#4). It still has a fresh hook inside: the CGPM vote this autumn to
  retire the leap second, and the record shortest day (5 Jul 2024).
- **Style (STYLE ROTATION #4): 'chalk' + stickman** — a navy slate chalkboard (Whyverse navy), chalk white + gold / coral / sky / mint,
  Permanent Marker headings, Patrick Hand handwriting that writes itself on, one static chalk-dust texture. Guide character **Axel**,
  a chalk stickman with a big round head and a gold scarf (film/axel.js): lip-syncs, sits in a chair on top of the world with his tea,
  gets flung east when the planet stops, twirls on the North Pole, weighs himself on the equator, pours a drink on a plane, sweats on
  the day side, waves on the end card. Globe = orthographic projection of real Natural Earth coastlines (any view, incl. from the pole).
- **FEEDBACK applied:** NOTHING boils — engine amp 0, textBoil 0, chalk dashes seeded once (checked: mean frame-to-frame difference at a
  calm moment 0.07/255); one 6 px / 0.3 s shake on the STOP hit and a 5 px / 0.25 s one on "STOPPED"; pushes ≤ 3 %; spoken + on-screen
  HOOK after every chapter title; end card with spoken + animated CTA (like, subscribe, Instagram @whyverse___, TikTok @Whyverse);
  no tease of another episode; no burned-in subtitles in the long video (ep04_spin.srt, 214 cues).
- **Voice:** Kokoro v1.0 int8, `af_heart`, en-us, one wav per line (62 lines, 1,261 words, 415 s of speech).
- **Length:** 8:05 (485.1 s), 1920×1080, 30 fps. Final: film/out/ep04_spin.mp4 (not in git; whyverse-media/ep04/ep04_spin_long.mp4).
- **Sound:** one score timeline (film/events.js → score.js → ch*.js + song.js), ~190 named hits, each with a synth SFX (new this episode:
  chalk scribble, slam, screech, zip, sip, pour, clank, crash, record-stop, wind-down, squish, flow, rise, sizzle, ice, laser, flip).
  Music bed per chapter (marimba / guitar / music box / e-piano, lo-fi-ish to match chalk), ducked + levelled −23 dB vs the voice; SFX −20 dB;
  title/chapter stings −14 dB where no voice. Master −14.0 LUFS integrated, LRA 3.2, peak −1.3 dBFS. Measured, not listened to.
- **Render:** 14,554 frames in 3,338 s (4.4 fps, 2 Chromium workers). Encode libx264 medium CRF 29 + AAC 160k, +faststart → 31.3 MB.
- **verify:** fast, stop, cant, cont ✓ (±1 f). The title's 5 slammed words are 0.32 s apart (slam + brass), so verify sees near-equal
  onsets (?) on words 3–5 and picks word 1's change for word 2 (−9 f); the logo marker sits 0.15 s after the end-card iris, which is the
  bigger pixel change (−6 f). Picture and sound read the same event times from events.js, so they cannot drift; not re-rendered for this.
- **Thumbnail:** tools/thumb.js — Earth with a STOP sign stuck in it, Axel flung east with his tea, WHAT IF EARTH / STOPPED? / 1,670 km/h.
  Also attached in Metricool as the video thumbnail (shows only if the channel is verified) — Gartal can still upload it in Studio.
- **Media:** whyverse-media/ep04/ (normal commit on top of the branch, as in ep03).

## Built per chapter
| t | chapter | on screen |
|---|---|---|
| 0:00 | cold open | Axel in a chair on a small spinning Earth, "right now, you are moving." FAST.; pull back, axis, speedometer > 1,000 km/h; equator 1,670 vs sound ~1,225 bars; tea … STOP! (globe brakes, cup flies east); WINDS / OCEANS / DAY cards; title slammed in chalk |
| 0:38 | 1 The ride you never feel | one turn from above the pole against a star = 23 h 56 min; dot round the equator 40,000 km ÷ 23.93 h = 1,670; latitude rings + bars Equator 1,670 / Baku 1,270 / London 1,040 / Pole 0, Axel twirls on the pole; scale 70.00 → 69.76 kg (0.35 % lighter); plane cabin pour at 900 km/h; GROUND/AIR/OCEANS/YOU arrows → the ground freezes |
| 1:50 | 2 The sudden stop | Axel, car, tree, rock fly east past a post bolted to bedrock; tornado record ~484 vs 1,670 km/h, MORE THAN 3×; sea surges over a town; SWEPT CLEAN; "the honest part": IT CAN'T HAPPEN, 2×10^29 J; 300 million years of humanity's energy grid; dial winds down to ZERO |
| 2:58 | 3 The oceans move out | globe squashes (×100), 12,756 vs 12,714 km, 43 KM WIDER; ocean shell bulge 8 km; SPIN: OFF, water drains to the poles; real world map → Fraczek sketch (NORTHERN OCEAN / ONE GIANT CONTINENT / SOUTHERN OCEAN); Everest 8.8 vs Andes 12.3 km, beach house far above the sea; inland seas; polar oceans ~1.4 km apart |
| 4:00 | 4 A day that lasts a year | orbit with a never-turning flag: ~6 months DAY / NIGHT halves, 107,000 km/h; split screen bake / freeze; rooster, owl, plant, 1 DAY = 1 YEAR; Coriolis bends a path, hurricanes spin → unwind; hot side → cold side flow ("models suggest"); liquid iron core, field lines fade: WEAKER? |
| 5:08 | 5 It's already slowing down | tidal bulge + Moon + brake; +1.8 ms per century; fossil coral lines → ~400 a year, clock 24 → 22 h; spin token hops to the Moon, 3.8 cm/yr, laser bouncing off Apollo mirror; 5 JULY 2024 shortest day −1.66 ms; 23:59:60, 27 leap seconds, RETIRED |
| 6:19 | 6 Worlds that hit the brakes | Venus spins backwards, 243 vs 225 days, DAY > YEAR; Venus sunrise ~117 days; Mercury 3 spins / 2 orbits → 1 DAY = 2 YEARS; Venus no global field, ???; locked Moon with its face dot; timeline: red giant in ~5 Gyr comes long before an Earth–Moon lock (tens of Gyr) |
| 7:21 | payoff + end card | four recap panels; SUNRISE / OCEANS / WEATHER / SHIELD round a turning globe; back to Axel's tea, "still turning: 1,000+ km/h", UNTIL NOW.; WHYVERSE end card, LIKE, SUBSCRIBE, handles, Axel walks in and waves |

## Shorts cut points (2 published, made with tools/make_shorts.py, burned-in captions)
| # | file | from → to | hook (first 2 s) | payoff |
|---|---|---|---|---|
| 1 | ep04_s1_you_are_moving | 0:00.8 → 0:23.5 (c0_1 → c0_4) | YOU'RE MOVING 1,000+ KM/H RIGHT NOW (Axel on the spinning Earth, FAST. stamp at 4 s) | the planet stops, STOP!, tea flies |
| 2 | ep04_s2_sudden_stop | 1:53.6 → 2:48.8 (c2_1h → c2_6) | THE GROUND STOPS. YOU DON'T. | the twist: it can't happen — 2×10^29 J, 300 million years of human energy |
Other good cuts if wanted later: 2:58 → 3:58 (oceans move to the poles, one giant continent); 6:19 → 6:58 (Venus: a day longer than a year).
(Hook 1 says "1,000+ km/h", not "faster than sound": that is only true near the equator.)

## Sources
See RESEARCH.md (every number with its link). Key: NASA Earth Fact Sheet; NASA Glenn (sound); Smithsonian NASM, Live Science, Space.com
(sudden stop); Bridge Creek–Moore 1999 tornado; Energy Institute Statistical Review 2024; Fraczek/Esri model; NOAA (Coriolis, circulation);
Banerdt/JPL via Astronomy + NRCan (geodynamo); IERS + Stephenson et al. 2016 (1.78 ms/cy); Wells 1963 via PRI (corals); NASA GSFC/JPL
(3.8 cm/yr); BBC Sky at Night (5 Jul 2024); IERS (27 leap seconds); Euronews/BIPM (CGPM 2026 leap-second vote); NASA Venus/Mercury facts;
Universe Today (Earth–Moon lock); NASA Space Place (red giant).

## Known weak spots
- Axel is a simple stickman: his sitting pose is stiff and the "flying" pose reads more as "flailing" than "flung".
- Text is clean digital handwriting under a chalk-dust texture — it reads well but is less chalky than the drawn lines.
- Fraczek's result is drawn as a simplified band sketch over the real map, not his actual map (labelled "simplified sketch").
- The ocean-bulge and squash diagrams are heavily exaggerated (labelled on screen).
- "Models suggest one giant flow hot → cold" and "the shield would weaken" are hedged; the science is less settled than the rest.
- A few shots hold a calm layout for ~2–3 s while the voice explains (e.g. the leap-second clock, the opening of the timeline shot).
- Sound checked by measurement only.
