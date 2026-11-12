# Ep05 — Why do we have to sleep? — NOTES

status: DONE — scheduled 2026-11-12 (YouTube Thu 12 Nov 19:00 London; Short 1 YouTube/Instagram/TikTok Fri 13 Nov 23:00 London, Short 2 Instagram/TikTok Sat 14 Nov 23:00 London; see ../../posts.json, PUBLISH.md)

**Made with Claude Fable 5.2 (test)** — PLAN.md "FABLE 5.2 TEST": this night run (Thu 12 Nov 00:23 Baku) ran on Fable 5.2 instead of Opus 5.5, so Gartal can compare.

- **Topic choice:** trend check first (run started Wed 11 Nov 20:24 London = Thu 12 Nov 00:24 Baku). The week's science feed had no single big "why / what if"
  story that would hold for weeks (Swift re-entry and the carbon budget were already daily trend Shorts), but it did have a fresh, neutral hook for sleep:
  a 7 Nov 2026 review of 57 brain-imaging studies linking sleep disorders to changes in the thalamus (Scientific Reports). So this is the first evergreen
  in the PLAN.md queue without a finished episode (#5), with that study as the "this month" beat in the payoff.
- **Style (STYLE ROTATION #5): 'watercolor' with characters** — translucent washes with pooled darker edges on warm cold-press paper (own wash engine in
  film/lib.js: every wash seeded once), deep indigo washes for night scenes, Caveat brush lettering + Patrick Hand labels, Whyverse navy / gold / coral.
  Guide character **Nod** (film/chars.js): a round periwinkle creature in a coral nightcap with a swinging pom-pom — lip-syncs, carries a lamp, yawns,
  hugs a pillow, shrugs at the 2024 study, falls asleep on the end card ("sleep well."). People are simple painted figures (Randy Gardner, his two
  friends, Dr Dement, a baby in a crib); animals are painted from curves (elephant, chinstrap penguin, upside-down jellyfish, dolphin, frigatebird,
  bat, rat, fruit fly). Real map outlines for San Diego and the jet-lag flight.
- **FEEDBACK applied:** NOTHING boils — engine amp 0, textBoil 0, washes seeded once (measured: mean frame-to-frame difference at a calm moment
  0.07/255, same as ep04); two small shakes only (5 px / 0.3 s on the eyes in the dark, 6 px / 0.3 s on the record book); pushes ≤ 3 %; a spoken +
  on-screen HOOK after every chapter title; end card with spoken + animated CTA (like, subscribe, Instagram @whyverse___, TikTok @Whyverse); no tease
  of another episode; no burned-in subtitles in the long video (ep05_sleep.srt, 227 cues). 11 Nov pacing note: every shot has continuous motion
  (lip-sync, Zs, counters, flows) and a new hit every 1–2 s; see "Known weak spots" for the few calmer holds.
- **Voice:** Kokoro v1.0 int8, `af_heart`, en-us, one wav per line (64 lines, 1,278 words, 426 s of speech).
- **Length:** 8:30 (509.9 s), 1920×1080, 30 fps. Final: film/out/ep05_sleep.mp4 (not in git; whyverse-media/ep05/ep05_sleep_long.mp4).
- **Sound:** one score timeline (film/events.js → score.js → ch*.js + song.js), 271 named hits, each with a synth SFX (new this episode: brush,
  harp gliss, yawn, heartbeat, six marimba "place cell" notes that play the rat's route and then replay it faster). Music bed per chapter (music box /
  guitar / marimba / e-piano, lullaby-leaning), ducked + levelled −23 dB vs the voice; SFX −20 dB; title / chapter stings −14 dB where no voice.
  Master −14.0 LUFS integrated. Measured, not listened to.
- **Render:** 15,296 frames, resumable in 45 s chunks (tools/render_chunks.sh — the container restarted once early in the night, so the render was made
  restart-safe; ~3.1 fps, 2 Chromium workers, ~85 min). One chunk re-rendered after review (the empty opening of the gut shot).
  Encode libx264 medium CRF 29 + AAC 160k, +faststart → 34.5 MB.
  The cloud machine was paused mid-encode (~02:55 Baku) and resumed at 08:16 Baku, so delivery and scheduling happened at ~08:25 Baku instead of during the night;
  nothing was lost (all frames were already rendered).
- **verify:** title_4, title_6 / title ✓ (±1 f, +0 ms). As in ep04, the six title words land 0.3 s apart, so verify's ±250 ms window picks a neighbouring
  word for title_2 and title_5 (−8 f) and reports near-equal onsets (?); "lights" is a 0.12 s dim, not a cut (+3 f); the logo marker sits 0.15 s after the
  end-card iris, which is the bigger pixel change (−6 f). Picture and sound read the same event times from events.js, so they cannot drift; not re-rendered.
  Final file: −14.0 LUFS integrated, LRA 3.5, peak −1.1 dBFS.
- **Thumbnail:** tools/thumb.js + thumb.sh — Nod yawning under the Moon, WHY DO WE / SLEEP? / 26 YEARS OF YOUR LIFE. Also attached in Metricool as
  the video thumbnail (shows only if the channel is verified) — Gartal can still upload it in Studio.
- **Media:** whyverse-media/ep05/ (normal commit on top of the branch, as in ep03/ep04).

## Built per chapter
| t | chapter | on screen |
|---|---|---|
| 0:00 | cold open | bedroom at night, Nod puts the lamp out (LIGHTS OUT), the clock spins; MUSCLES switch OFF + a dream cloud; 16 moons, an 80-year life bar, ONE THIRD → counter 26 years; elephant / penguin / jellyfish asleep ("no brain!"); a sleeping rat and two eyes in the dark (EASY PREY) → NEVER; title painted word by word |
| 0:45 | 1 The boy who stayed awake | map → San Diego pin, DECEMBER 1963, Randy (17), SCIENCE FAIR board; living room with two friends + Dr Dement + DAY 10 pinball ("or so the story goes"); tired close-up with DAY counter and 4 symptom cards; 11 day tiles → 264 hours; 14 h 46 min asleep → HEALTHY; rat study (11–32 days band, "?"); RECORD CLOSED 1997, "please don't try it"; NOT OPTIONAL |
| 1:58 | 2 Two clocks inside you | hourglass + brain filling with adenosine + pressure gauge; hourglass flips / coffee: caffeine blocks plug four sensors, "pressure you feel" vs "pressure that is there" → STILL THERE; brain → zoom to the 20,000-cell clock, lights out, still ticking; dusk + melatonin droplets → NIGHT HAS BEGUN; two ring clocks, 24 h 11 min, sunrise → RESET; world map flight, JET LAG; hourglass + clock merge → asleep |
| 3:04 | 3 What a night really looks like | hypnogram draws itself, 5 cycle brackets, ≈ 90 min, EEG strip; the bed sinks into deep sleep (slow huge waves, slow heart, useless alarm); rises into REM (darting eyes, sparkling brain, rainbow dream); padlocks: MUSCLES: OFF, runner in the dream; full night, deep early / dreams late, 5 am cut → MOSTLY DREAMS LOST |
| 4:01 | 4 The night shift | growth-hormone droplets, tiny worker Nods, BUILD + REPAIR; shield, 164 volunteer dots, virus drops, bars 4.2× vs 1×; 2013 brain cells open up +60 %, fluid washes specks away → A BRAIN WASH; 2024: −30 % bars, see-saw 2013 / 2024 → UNDER DEBATE; fly + mouse → gut with red molecules → THE WHOLE BODY |
| 5:14 | 5 Saving the day | 1994 rat on a track, six place cells with marimba notes + raster; asleep: ghost rat, same notes faster ×2 → REPLAY; memory cards fly to the long-term shelf → SAVED; baby in a crib, 24 h dial → 14–17 HOURS; synapses swell by day (noise bar, CAN'T GO ON FOREVER) and shrink at night → −18 %; SINCE 1924 syllable cards; "SLEEP ON IT" + filing drawers |
| 6:22 | 6 Sleeping dangerously | dolphin + half-asleep brain that swaps sides, surfacing to breathe; frigatebird over clouds, WEEKS, 42 minutes, bars, bursts; chinstrap penguin nodding off with a 4 s ring, 10,000 naps → 11 HOURS; elephant 2 h, bat ~20 h, "you 7–9 h" bars; upside-down jellyfish, NO BRAIN AT ALL, slows at night; all animals asleep → PAYS THE PRICE; the Rechtschaffen line word by word |
| 7:30 | payoff + end card | four cards REPAIRS / BACKS UP / FILES AWAY / RESETS; NOVEMBER 2026, 57 study sheets, glowing thalamus ("a link, not proof of cause"); 24 h dial to 17–19 h, performance bar drops ≈ glass → 0.05 % BLOOD ALCOHOL; 7+ hours a night; life bar: NOT WASTED, the third lights up the rest; WHYVERSE end card, LIKE, SUBSCRIBE, handles, Nod waves and falls asleep |

## Shorts cut points (2 published, made with tools/make_shorts.py, burned-in captions)
| # | file | from → to | hook (first 2 s) | payoff |
|---|---|---|---|---|
| 1 | ep05_s1_26_years_asleep | 0:00.8 → 0:21.9 (c0_1 → c0_3) | YOU'LL SLEEP 26 YEARS OF YOUR LIFE (Nod walks in with the lamp; LIGHTS OUT at 3 s) — a "you" hook, per the DATA RULES | the life bar washes one third indigo → counter lands on 26 years |
| 2 | ep05_s2_10000_naps | 6:32.8 → 6:58.8 (c6_2 → c6_4) | HOW ANIMALS SLEEP: 10,000 NAPS (dolphin with half a brain asleep) | frigatebird 42 min in flight → penguins: 10,000 naps of 4 s = 11 hours |
Other good cuts if wanted later: 0:49 → 1:34 (Randy Gardner: 264 hours awake, then 14 h 46 min of sleep; 45 s, longer than the 20–35 s rule);
4:26 → 4:53 + 4:53 → 5:07 (brain wash 2013 vs 2024: "under debate"); 5:19 → 5:37 (the rat's cells replay the day).

## Sources
See RESEARCH.md (every number with its link, and what was deliberately NOT said because it could not be verified: "slurred speech",
"twice as fast", the antioxidant rescue in mice). Key: NINDS; Guinness + NPR (Gardner); Everson et al. 1989; Czeisler 1999; NIGMS; Sleep Foundation;
AASM 2015; Van Cauter 2000; Prather 2015; Xie 2013; Miao 2024; Vaccaro 2020; Wilson & McNaughton 1994; de Vivo 2017; Jenkins & Dallenbach 1924;
National Sleep Foundation 2015; Rattenborg 2016; Libourel 2023; Gravett 2017; Guinness (bat); Nath 2017; U Chicago obituary (Rechtschaffen);
Crooks 2026; Williamson & Feyer 2000.

## Known weak spots
- The watercolor look is closer to soft gouache: flat translucent washes with pooled edges and paper grain, not bleeding wet-in-wet pigment.
- People are simple (round heads, tube limbs); the "runner" in the REM dream reads more as "arms up" than running.
- Calmer holds of ~2–3 s while the voice sets up a shot: the start of the rat-study shot, the first seconds of the growth-hormone shot (only the
  sleeper, Zs and droplets), the quote card before the first word, "for most adults, the target is…" before the 7+ lands.
- The gut is a stylised squiggle; the brain-cell "gaps" and the inner-clock lag are exaggerated (labelled on screen where it matters).
- The hypnogram is a schematic typical night, and the 1924 syllable cards are an illustration (said so on screen).
- The Rechtschaffen line is paraphrased by the voice ("evolution ever made"); his exact words are shown in small type under it.
- Kokoro reads "REM" as a word and "zero point zero five percent" a little flatly. Sound checked by measurement only.
- Health topic: the description says "educational, not medical advice"; the film gives the 7+ hours recommendation and nothing clinical.
