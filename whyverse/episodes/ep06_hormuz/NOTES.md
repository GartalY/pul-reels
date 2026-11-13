# Ep06 — Why can one narrow strait shake the world? (Strait of Hormuz) — NOTES

status: DONE — scheduled 2026-11-13 (YouTube Fri 13 Nov 19:00 London; cut Short YouTube/Instagram/TikTok Sun 15 Nov 23:00 London; see ../../posts.json, PUBLISH.md)

- **Topic choice (trend first):** the run started Thu 12 Nov 22:32 London (Fri 13 Nov 02:32 Baku, HTTP Date header). The biggest ongoing world story with a
  "why" angle that holds for weeks: the Strait of Hormuz crisis (2026 war; this week Iran says tankers hit mines, oil up on Hormuz disruption, talks stalled —
  Reuters/Al Jazeera 10–12 Nov). Angle: an evergreen geography + economics explainer (why one 33 km gap matters), with the 2026 events told neutrally and
  attributed. Not covered before (episodes/, shorts/, posts.json). The evergreen queue (#6 "How much is the whole world worth?") stays next.
- **Politics:** neutral and factual only (PLAN.md POLITICS): no sides, no blame; every 2026 claim attributed ("Iran says…", "could not be independently
  verified"); US/Israeli strikes and Iran's closure stated as dated facts; casualties of 2026 not given (sources inconsistent). The Tanker War is told soberly
  (451 ships hit, 400+ sailors killed — no jokes, no hype). Nothing about Azerbaijan.
- **Style (STYLE ROTATION #6): 'flat' infographic** — clean flat fills, no outlines, soft offset shadows, Inter 800 titles + Bungee numbers, Whyverse navy /
  sea blue / sand / gold / coral. Real Natural Earth 1:50m outlines for the Gulf (engine geo.js), drawn as flat fills with camera moves (P.cam); a custom
  flat prop kit (side-view and top-view tankers, LNG carrier, warship, barrels, mines, insurance certificate, pump, pool, trucks/planes/tractors).
  Guide character **Captain Gull** (film/chars.js): a flat seagull in a navy captain's cap — lip-syncs, blinks, points, thinks, shrugs, cheers, flies in and
  out. People are flat silhouettes without faces (PLAN.md PEOPLE = SILHOUETTES).
- **FEEDBACK applied:** no boil anywhere (flat style); one camera shake only (Bridgeton mine, 6 px / 0.3 s) + a 5 px wallet shake; pushes ≤ 3 %; spoken +
  on-screen HOOK after every chapter title (cream hook strip); open INSIDE the question (a concrete scene: the waiting supertanker) and a promise of the payoff
  (two question cards, both answered in c7); myth corrected openly (c4 "if the shooting starts, the oil stops" → crossed out); end card with spoken + animated
  CTA; no tease of another episode; no burned-in subtitles in the long video (ep06_hormuz.srt).
- **60 fps:** FPS = 60 in score.js and build_timeline.py (mouth track at 60 fps); every motion is a function of t.
- **Voice:** Kokoro v1.0 int8, `af_heart`, en-us, one wav per line (66 lines, 1,274 words, 425 s of speech). Two lines were added after the first timing pass
  (c2_3b "ten supertankers a day", c5_3b insurance premiums) to reach 8:37 and add substance; c4_7 was re-voiced ("short price spikes") so the voice matches
  the yearly-average chart.
- **Length:** 8:37 (517.4 s), 1920×1080, **60 fps** (ffprobe: r_frame_rate 60/1, 31,042 frames). Final: film/out/ep06_hormuz.mp4 (not in git;
  whyverse-media/ep06/ep06_hormuz_long.mp4). Encode libx264 medium CRF 29 + AAC 160k, +faststart → 30.8 MB. −14.0 LUFS integrated, LRA 4.0.
- **Render:** resumable 22.5 s chunks (tools/render_chunks.sh), ~6–9 fps with 2 Chromium workers (flat style is cheap). The container restarted once mid-render
  (~23:55 London); finished chunks survived, the rest re-rendered. 11 chunks were re-rendered after review fixes (2026 price shot, lane route clear of Musandam,
  UAE/Japan/Korea labels, pipe-bar flow, insurance shot, Brent tag, ships in the 2026 strait).
- **Sound:** one score timeline (events.js → score.js → ch*.js + song.js), 238 named hits, each with a synth SFX (new: ship horn, door knock, bell).
  Music bed per chapter (e-piano / marimba / guitar / music box), ducked + levelled −23 dB vs the voice; SFX −20 dB; title / chapter stings −14 dB where no
  voice. Measured, not listened to.
- **verify:** title_1, title_5, title_6, title ✓ (±1 f / +5 ms). As in ep04/ep05 the eight title words land 0.27 s apart, so verify's window picks a
  neighbouring word or brass stab for the others (?/✗ of 45–130 ms); the logo marker sits next to the end-card iris (−5 f). Picture and sound read the same
  event times from events.js, so they cannot drift; not re-rendered.
- **Thumbnail:** tools/thumb.js + thumb.sh — the strait from above with the gold 33 km line and a tanker in the gap, THIS GAP / SHAKES THE / WORLD,
  "1 IN 5 BARRELS", Captain Gull pointing. Also attached in Metricool as the video thumbnail (only shows if the channel is verified).
- **Media:** whyverse-media/ep06/ (normal commit on top of the branch).

## Built per chapter
| t | chapter | on screen |
|---|---|---|
| 0:00 | cold open | dusk off Oman: supertanker, gull lands, 3 football fields + 330 m, tanks fill → 2,000,000 barrels; map dive, ≈ 33 km vs a 42.2 km marathon (runner); 5 barrels → 1 IN 5 through the HORMUZ gap; 2026: tanker lane thins, Brent $70 → $126, MORE THAN HALF; two promise cards; title over the strait |
| 0:49 | 1 A door in the map | ALMOST A LAKE, Iran / Arabian Peninsula; ONLY ONE WAY OUT past Musandam; 167 km / 33–39 km; two lanes + buffer with moving ships; 20–25 m draught = 7 storeys; 2 LANES × 3 KM |
| 1:55 | 2 A fifth of the world | producers + Qatar gas; 20,000,000 a day, EVERY DAY; 10 supertankers sail; 230/s clock + Olympic pool; 1/5 · 1/4 · 1/5 rings; Asia routes, 84 %; BACK DOOR? |
| 3:03 | 3 The back doors | East–West pipeline to Yanbu ≈ 1,200 km; Fujairah ✓, Jask BARELY USED; 20 vs 3.5–5.5, 1 IN 4 AT BEST; LNG: NO BACK DOOR, ≈ 93 %; year rolls back to 1984 |
| 3:59 | 4 The Tanker War | 1980s map, ships hit, oil money; 451 ships, 400+ sailors; Bridgeton mine + convoys; MYTH crossed out, ≤ 2 %; Brent 1980–88 slide + 1986 CRASH below $10 |
| 5:06 | 5 The year the door almost shut | 28 FEB 2026, IRAN: "STRAIT CLOSED"; WAR RISK COVER CANCELLED; premium bars; 100+ → ≈ 5 (−95 %); Brent 2026 key points; 32 IEA tanks, 400 MILLION ≈ 20 days; THIS WEEK, Iran says mines, NOT INDEPENDENTLY VERIFIED, TALKS STALLED |
| 6:44 | 6 Small gap, big price | 1979 −5 % → × 2+; truck / plane / tractor; bidding war, priced out; pump + donut crude ≈ HALF; wheels, wings, keels → everything ↑; door + fuel = wallet |
| 7:45 | payoff + end card | four answer cards; 1984–88 vs 2026: RISK ITSELF, NO SHIPS; the opening tanker waits, the whole world pays; WHYVERSE end card, LIKE, SUBSCRIBE, handles, gull flies off |

## Cut Short (1 published, QUALITY RESET)
| file | from → to | hook (first 2 s) | payoff |
|---|---|---|---|
| ep06_s1_33km_gap | 0:10.1 → 0:33.1 (c0_2 → c0_4, 23 s, 9:16, 60 fps) | THIS 33 KM GAP MOVES 1 IN 5 BARRELS OF OIL (map dive in motion from frame 0) | 1 in 5 barrels → 2026: ships stop, oil MORE THAN HALF up; last caption FULL VIDEO ON OUR YOUTUBE: WHYVERSE |
Other good cuts if wanted later: 3:59 → 4:40 (myth: the Tanker War never stopped the oil, ≤ 2 % of ships hit); 2:11 → 2:33 (230 barrels a second, a pool a minute).

## Sources
See RESEARCH.md (every number with its link, plus what was deliberately NOT said). Key: IEA Strait of Hormuz factsheet (Feb 2026); EIA chokepoints + Today
in Energy 16 Jun 2025; Reuters factbox Feb 2026; Scientific American/EIA; Straus Center; Strauss Center Tanker War; USIP Iran Primer; NDU / Earnest Will;
Wikipedia 1980s oil glut + chronology; Energy Institute Statistical Review; Reuters/AP/Al Jazeera/S&P Global/MarineLink 2026; Fortune (IEA release); NPR; EIA gasoline.

## Known weak spots
- Ongoing story: the 2026 facts are "as of 12 Nov 2026" (said in the description); if the strait reopens soon, chapter 5's last line ages.
- Calmer holds of ~2–3 s while the voice sets up a shot: start of the four-cards payoff, the WHEELS/WINGS/KEELS shot before the first icon, the 2026 split-screen right half, the 451-ship grid after it fills.
- Lanes are schematic and widened ("drawn wider than real"); the route line is simplified. The "short spikes" on the 1980s chart are schematic.
- The gull's pointing wing reads a bit like a flipper at small sizes; people are plain silhouettes (by rule).
- In the final sunset shot the sun sits close to the gull and the currency coins.
- Kokoro reads "twenty twenty-six" and "Musandam" fine; sound checked by measurement only.
