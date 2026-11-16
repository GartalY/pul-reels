# Ep08 — Voyager 1 Is One Light-Day Away. How Do We Still Hear It? — NOTES

status: DONE — scheduled 2026-11-17 (YouTube Tue 17 Nov 19:00 London / 23:00 Baku, Metricool 430729045; cut Short YouTube/Instagram/TikTok
Wed 18 Nov 23:00 London / Thu 19 Nov 03:00 Baku, Metricool 430729378 / 430729400 / 430729526; see ../../posts.json, PUBLISH.md)

- **Timing:** the run started Mon 16 Nov 20:24 London (Tue 17 Nov 00:24 Baku, HTTP Date header). Baku "today" = Tue 17 Nov → long video Tue 19:00 London,
  the evening before the crossing; the Short the day after, at 23:00 London (never 19:00 Baku — that slot is the daily trend Short's).
- **Topic choice (trend first):** the biggest worldwide science story of the week with a "why" that holds for weeks: Voyager 1 becomes the first human-made
  object one light-day from Earth on Wed 18 Nov 2026 (~10:16 UTC; NASA countdown + "Shine Bright" event; trend scout 16 Nov #3). The rest of the
  week's headlines were sport, politics, conflict or tragedies (trends/2026-11-16.md). The evergreen queue (6 topics) is used up. Not covered before
  (episodes/, shorts/, posts.json). The 14/16 Nov trend files had parked Voyager for the 18 Nov daily Short → handoff note in trends/2026-11-17.md
  so that day's trend Short picks another story. Not political; nothing about Azerbaijan.
- **Style (STYLE ROTATION, new look): 'INK SILHOUETTE'** (PLAN.md NEW LOOKS 2026-11-15) — black-violet ink silhouettes with a thin warm rim light on slow
  gradient skies (dusk / gold / rose / night / deep / dawn / teal, film/ink.js), twinkling stars, layered ink hills; Earth is the only blue thing, the
  Golden Record the only gold part of the craft, signals teal. Mixed with MAP ROUTE (light routes, slingshot path, the Earth→Voyager progress route),
  GROWING GRAPH (watts 1977→2026) and LINE timeline looks. Inter 800 titles, Bungee numbers, Patrick Hand notes. People = faceless ink silhouettes.
  Guide character **Echo** (Ch.echo in film/ink.js): a small ink creature with a radio-dish head, glowing cream eyes, coral mouth and a blinking
  feed-horn — lip-syncs, blinks, listens, points, thinks, shrugs, cheers, waves, hops.
- **EVRIM AĞACI LESSONS:** opens inside the question with a concrete scene (a gold dashed line in deep space; a hello that needs 24 h, the reply another 24)
  + a paradox (fridge-bulb radio, < one phone photo of memory, still talking) + a 3-card promise answered in the payoff (whisper / alive / carries);
  six chapters, each = card + spoken HOOK strip + a reveal raising the next question; two myths corrected openly ("fastest spacecraft ever" → Parker
  is >10× faster; "left the solar system" → Oort cloud); warmth (Echo; "a machine they can never touch"; the "hello." at the end); CTA only at the end.
- **FEEDBACK applied:** nothing boils (flat engine, amp 0, textBoil 0); no camera shake at all; slow pushes/drifts only; hook after every chapter title;
  end card with spoken + animated CTA (like, subscribe, Instagram @whyverse___, TikTok @Whyverse) + SENDS RULE line "✉ Send this to the friend who says
  old tech is useless"; no tease of another episode; no burned-in subtitles in the long video (ep08_voyager.srt, 244 cues).
- **60 fps:** FPS = 60 in score.js and build_timeline.py (mouth track at 60 fps); every motion is a function of t. ffprobe: r_frame_rate 60/1, 34,267 frames.
- **Voice:** Kokoro v1.0 int8, `af_heart`, en-us, one wav per line (65 lines, 1,425 words, 483 s of speech).
- **Length:** 9:31 (571.1 s), 1920×1080, 60 fps. Final: film/out/ep08_voyager.mp4 (not in git; whyverse-media/ep08/ep08_voyager_long.mp4).
  Encode libx264 medium CRF 29 + AAC 160k, +faststart → 38.2 MB.
- **Render:** resumable 22.5 s chunks (tools/render_chunks.sh), 26 chunks, ≈ 9–12 fps with 2 Chromium workers (ink style is cheap), ≈ 62 min, no restarts.
- **Sound:** one score timeline (events.js → score.js → ch*.js + song.js), 230 named hits, each with a synth SFX. Music bed per chapter (music box / marimba /
  guitar / e-piano), ducked + levelled −23.0 dB vs the voice; SFX −20.0 dB; title / chapter stings −14.0 dB where no voice. Master −14.0 LUFS. Measured, not listened to.
- **verify:** ever ✓, myth ✓ (±1 f); worked +3 f (the stamp scales in over 0.14 s, so the biggest pixel change lands a few frames after the hit). The 7 title
  words come 0.3 s apart (slam + brass), so verify sees near-equal onsets (?) and picks neighbouring words (as in ep03/ep04/ep07); the logo is a pop, not a cut.
  Picture and sound read the same event times from events.js, so they cannot drift; not re-rendered for this.
- **Thumbnail:** tools/thumb.js → thumbnail.jpg (1280×720): VOYAGER 1 tag, ONE / LIGHT-DAY / AWAY, coral "…and still talking" pill, big ink Voyager with
  teal beam, Echo listening, tiny blue Earth. Attached in Metricool as the video thumbnail (shows only if the channel is verified) — Gartal can upload it in Studio.

## Built per chapter
| t | chapter | on screen |
|---|---|---|
| 0:00 | cold open | deep sky, Voyager drifts to a gold "1 light-day" line, 18 NOV 2026 · 10:16 UTC, car for scale, FIRST EVER · Earth ↔ Voyager, Echo's "hello!" crawls across while a clock runs 0→24→48 h · rose dusk: VOYAGER 1 / 1977, fridge bulb, < 1 phone photo · a 70 m dish rises, "still talking." · 3 promise cards · title HOW DO WE STILL HEAR / VOYAGER 1? |
| 1:03 | 1 What is a light-day? | photon streak 299,792 km/s · Moon 1.3 s / Sun 8 min 20 s routes · 24 h dial → 25.9 BILLION KM · ×173 Earth–Sun ticks · rocket + probe fall short, UNTIL NOW · 1977→2026 ruler, 49 YEARS |
| 2:01 | 2 The cosmic slingshot | orbits line up (1 in 175 yrs) · launches 20 Aug / 5 Sep 1977, race to Jupiter, "1" · slingshot Jupiter 1979 / Saturn 1980 + speed gauge · 61,000 vs Parker 692,000 km/h · speed? ✗ TIME. odometer · Earth–V2–V1, THE FARTHEST THING WE EVER BUILT |
| 3:17 | 3 A whisper across a light-day | 3.7 m dish, Earth = a pixel · spreading beam, 0.000…0001 W · three 70 m dishes (person for scale) · Earth from above the North Pole (real outlines), dishes at their real longitudes, the one facing Voyager lights up · 160 bit/s, photo 0.3 %… ≈ 2 DAYS · Canberra DSS-43 command · fading battery + "?" heart |
| 4:34 | 4 A slowly fading heart | glowing RTGs → bulb · 470 W → ≈ 225 W (2023) graph, −4 W/yr · house on two bulbs, LESS THAN HALF · heaters off, thermometer, frost · 10 instrument lights go out, LECP APRIL 2026 · 2 still on · 2030s, crack, mechanic a light-day away |
| 5:44 | 5 Repairs from a light-day away | binary → GIBBERISH (NOV 2023) · chip grid, ≈ 3 % · code split + moved (APRIL 2024), 48 h, IT WORKED · tube 0.25 → 0.035 mm, SWITCH · "DEAD" SINCE 2004, 21 YEARS, AND THEY FIRED · command into the dark + Badaruddin quote · "why go to all this trouble?" |
| 6:58 | 6 Leaving the bubble | heliosphere + solar wind, 25 AUG 2012, ≈ 122 ×, INTERSTELLAR SPACE · MYTH card → zoom out to the Oort cloud, NOT QUITE · 300 / 30,000 yr timeline · 14 FEB 1990 turn + shutter · Pale Blue Dot ("you are here", 0.12 pixel, Sagan) · spinning Golden Record 115 / 55 / 90 · Gliese 445, 1.6 ly, 40,000 yrs |
| 8:21 | payoff + end | 3 answers (giant ears · every watt rationed · people who keep fixing it) · 2030s: beam fades, "Voyager doesn't." · people flash V-G-R in Morse · "+9,200 km farther from home" live counter · "hello." (SENT: YESTERDAY) · end card + sends line |

## Cut Short (published one, PLAN QUALITY RESET: exactly one)
- **ep08_s1_hello_takes_a_day.mp4** — 0:10.7 → 0:45.1 (34.4 s, c0_2 → c0_4), 1080×1920, 60 fps, burned-in Bungee captions, last caption "FULL VIDEO ON OUR
  YOUTUBE: WHYVERSE". Hook title "SAY HELLO TO / VOYAGER 1: / IT TAKES A DAY" — a "you" hook (your words need a whole day) with motion + the light-day line
  from frame 0; payoff: the reply takes another day (48 h clock), the fridge-bulb radio and < one photo of memory, "still talking". Wed 18 Nov 23:00 London.

## Sources
See RESEARCH.md (32 claims with links: NASA SVS 15111, NASA Science / JPL releases 2024–2026, EarthSky, ScienceDaily, Popular Science, IEEE Spectrum,
Smithsonian, Space.com, The Register). Avoided: 22.4 W transmitter, attowatt figures, an exact 2026 wattage, "121 AU", "fastest object leaving the solar system".

## Known weak spots
- A few shots open on an empty sky for ~1 s before their first prop pops on the keyed word (c1 photon shot, c3 beam shot opens with the cone already
  growing now, c5 tube shot, c6 timeline). Stars twinkle and Echo bobs, but they are the calmest frames.
- Voyager is drawn small in several deep-space wides; the ink silhouette reads mainly by its rim light there.
- The Earth-from-the-pole globe is a stylised azimuthal view (Antarctica left out), the dishes are drawn small on its rim.
- The bottom-left progress label sits close to Echo when he stands far left (c2 end, c7 counter).
- verify (?)/✗ on the title words and logo, as above.
- The 9:16 Short reuses the 16:9 picture on a blurred bed (make_shorts.py); a re-staged vertical version would be stronger.
