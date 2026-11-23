# Ep10 — COP31 Failed. So How Did the World Once Fix the Ozone Hole? — NOTES

status: DONE — scheduled (YouTube Tue 24 Nov 2026 19:00 London / 23:00 Baku; cut Short YouTube/Instagram/TikTok Wed 25 Nov 23:00 London / Thu 26 Nov 03:00 Baku; see ../../posts.json, PUBLISH.md)

- **Timing:** the run started Mon 23 Nov 20:24 London (Tue 24 Nov 00:24 Baku, HTTP Date header from pypi.org). Baku "today" = Tue 24 Nov → long video Tue 19:00 London;
  the cut Short the day after at 23:00 London (never 19:00 Baku — the daily trend Short's slot).
- **Topic choice (trend first):** the evergreen queue is used up, so a trend was required. The biggest worldwide story of the last days with a "why" that holds for
  weeks: COP31 in Antalya collapsed on Sun 22 Nov without its cover decision — two days over schedule, the longest COP on record, the first COP since Copenhagen 2009
  to fail to adopt its main decision (UN News, ABC, AFP 22–23 Nov). Angle: an evergreen science + history explainer — why the world fixed the ozone hole (Montreal
  Protocol, universal) but can't agree on climate (consensus rules, cost of change, commons). Holds through the COP32 run-up. Not covered before (episodes/, shorts/,
  posts.json: no COP31 / ozone). Other headlines were war/partisan or already covered as daily Shorts (Riemann, Pugh/Hormuz, India 720).
- **Politics (neutral):** both sides of the Antalya split named only "as reported" (EU/UK/small islands refused a text without fossil fuels; Saudi Arabia for the Arab
  Group and Russia resisted phase-out wording, per UN News/ABC/AFP). No blame, no praise. Quotes are the COP president's and the UN chief's own words. Nothing about
  Azerbaijan. political: true in posts.json (climate diplomacy).
- **Style (STYLE ROTATION, new): 'LINE ART'** (PLAN NEW LOOKS 2026-11-15): warm paper with a slowly drifting dot grid, navy ink single-weight lines that draw
  themselves on (film/line.js P.art), ONE accent colour (coral) for what matters (UV, chlorine, the hole, key words, signatures, numbers' underlines), Inter titles /
  Inter 900 numbers with a hand-drawn coral underline, Patrick Hand notes (OFL, film/fonts). Line-art orthographic globe from Natural Earth outlines with a hatched
  coral ozone hole that opens and heals. Title + nothing else on an ink page. Guide character **Ozzy** (Ch.ozzy in film/chars.js): an O3 molecule — three atoms, the
  middle one has the face — lip-syncs, blinks, points, shrugs, cheers, gets worried (sweat drop) when chlorine breaks ozone. Progress counter = 6 chapter atoms on a
  bond line top-right. People are faceless line-art mannequins with name plates (Kurum, Guterres, Molina, Rowland, Farman, Gardiner, Shanklin).
- **Real photos:** PLAN asks for real photos of public figures where possible — Wikimedia Commons and NASA image hosts were blocked by this run's network proxy
  (CONNECT 403), so no photos could be fetched; faceless figures with name plates instead (PLAN fallback).
- **EVRIM AĞACI LESSONS:** opens inside a concrete scene (Antalya, Sunday night, two days past the deadline, "I understand that there is no agreement on this text")
  + a paradox (1987: the same world agreed, every country signed up, the hole is closing) + a 3-card promise (why ozone worked / why climate is harder / what could
  work next) answered in the payoff. Six chapters, each = card + spoken HOOK strip + a reveal that raises the next question. Myths corrected openly: "the ozone hole
  is heating the planet" (MYTH ✗ → two different problems, shared culprits), "1.5 °C is already lost" (one year vs 20-year average). Warmth: Ozzy; "Same rules. Same
  people. A different price of yes." Payoff closes the opening scene (Antalya at night → camera rises → the hole closing). CTA only at the end.
- **FEEDBACK applied:** nothing boils (flat engine, amp 0, textBoil 0); no camera shake; pushes ≤ 3 %; hook after every chapter title; end card with spoken +
  animated CTA (like, subscribe, Instagram @whyverse___, TikTok @Whyverse) + SENDS line "✉ Send this to the friend who says nothing ever changes"; no next-episode
  tease; no burned-in subtitles in the long video (ep10_ozone.srt, 264 cues). ALWAYS NAME IT: COP31 / Antalya / Montreal Protocol on screen + title.
- **60 fps:** FPS = 60 in score.js and build_timeline.py (mouth track at 60 fps); every motion is a function of t. ffprobe: r_frame_rate 60/1, 34,656 frames.
- **Voice:** Kokoro v1.0 int8, `af_heart`, en-us, one wav per line (62 lines, 1,427 words, 510 s of speech). GAP 0.62 s.
- **Length:** 9:37.6 (577.6 s), 1920×1080, 60 fps. Final: film/out/ep10_ozone.mp4 (not in git; whyverse-media/ep10/ep10_ozone_long.mp4),
  libx264 medium CRF 29 + AAC 160k, +faststart → ≈ 44 MB.
- **Render:** resumable 22.5 s chunks (tools/render_chunks.sh), 26 chunks, ≈ 7.5 fps with 2 Chromium workers (≈ 3 min per chunk, ≈ 78 min), no restarts.
  Chunk 18 re-rendered after the final frame check (the commons shot: cows facing left were drawn upside down by a negative scale; also filled the shot's first 7 s).
- **Sound:** one score timeline (events.js → score.js → ch*.js + song.js), 315 named hits, each with a synth SFX. Music bed per chapter, ducked + levelled
  −23.0 dB vs the voice; SFX −20.0 dB; title / chapter stings −14.0 dB where no voice; master −14.0 LUFS. Measured, not listened to.
- **verify:** title_1 picture ✓ / title_4 sound ✓; as in ep04–ep09 the title words land 0.42 s apart and scale in over 0.12 s, so verify sees near-equal onsets (?)
  and the biggest pixel change 2–3 f after the stamp; the logo marker sits next to the end-card iris. Picture and sound read the same event times from events.js,
  so they cannot drift; not re-rendered for this.
- **Thumbnail:** tools/thumb.js → thumbnail.jpg (1280×720): "COP31 FAILED" tag, OZONE ✓ / CLIMATE ?, the south-pole globe with the hatched hole, Ozzy pointing,
  WHYVERSE. Attached in Metricool as the video thumbnail (shows only if the channel is verified) — Gartal can upload it in Studio.

## Built per chapter
| t | chapter | on screen |
|---|---|---|
| 0:00 | cold open | Antalya globe pin + summit table + clock "+2 DAYS" + ≈200 counter · Kurum at the podium, quote card, ANTALYA PACT crossed out, seats turn coral · 1987 stamp, hole opens, 198 dots fill a ring "EVERY COUNTRY" · can/fridge/AC tags flip CFC → NEW, hole closing · Ozzy + 3 promise cards · split sky OZONE ✓ / CLIMATE ? · TITLE "ONE SKY. TWO PROBLEMS." |
| 0:59 | 1 One voice is enough | 198-dot grid + counter (EU dot) · Berlin 1995 rule book, "Rule 42 — Voting" in coral brackets · consensus ring, one NO breaks every link · Copenhagen 2009 ADOPTED → "takes note of" · tug-of-war that doesn't move (as reported) · Guterres quote · 1987 OZONE ✓ vs 2026 CLIMATE ✗ |
| 2:20 | 2 The hole in the sky | altitude column, ozone band 15–35 km, UV zig-zags stop in it · 1974 Molina & Rowland, a CFC drifts up · CFCs everywhere (cheap / safe / never break down = the problem) · chlorine breaks O3 again and again, Ozzy worried · Halley station, Farman/Gardiner/Shanklin, October ozone chart −⅓ · the hole, May 1985 → Sep 1987 "2½ years" |
| 3:36 | 3 How the world said yes | Montreal Protocol doc + step-down chart · reason 1: 5 US makers, DuPont 1988 "We'll stop" · reason 2: tags flip to NEW GAS · reason 3: bills + "$5 BILLION+" + 144 dots · ratchet "TIGHTENED" · 198 flags "EVERY COUNTRY ON EARTH" · ≈99 % gone |
| 4:54 | 4 The accidental climate treaty | MYTH ✗ → two circles → overlap on a CFC = thousands × CO2 · two thermometers, +2.5 °C extra by 2100 (Nature 2021) · gases + UV-burned plants · Kigali 2016, HFCs, up to 0.5 °C · healing timeline 2026 → 2040 → 2066 · Ozzy faces CO2 |
| 6:14 | 5 Why carbon is different | 86 % donut + cars/planes/factories/steel/cement/lights · 38 blocks = 38 bn t CO2 · tragedy of the commons field → "the sky is that field" · Kyoto: SIGNED ✓ RATIFIED ✗, Canada walks out · Paris: own plans, 2 / 1.5 lines · thermometer to 2.8 °C · "Hopeless? — not quite" |
| 7:43 | 6 Slow, but not stuck | Dubai 2023 "transitioning away from fossil fuels" · High Seas Treaty in force Jan 2026 · MYTH "1.5 °C is lost" → one year vs 20-yr average (schematic) · see-saw "the price of yes" · COP32 Addis Ababa, Nov 2027 |
| 8:46 | payoff + end | split sky again · ozone deal (one chemical, few factories, money) vs climate deal (the energy under everything) · SAME RULES / SAME PEOPLE / A DIFFERENT PRICE OF YES · Antalya table empty → camera rises → hole closing 1987 → 2066 "PROOF THE WORLD CAN SAY YES" · end card |

## Cut Short (the one published)
- **ep10_s1_ozone_treaty_2_5c** — c4_2 → c4_4 (5:04–5:35, ≈ 32 s): hook overlay "THE 1987 OZONE DEAL / AVOIDED +2.5 °C / OF WARMING?", myth-bust first
  ("the ozone hole isn't what's heating the planet"), payoff = the +2.5 °C thermometer; last caption "FULL VIDEO ON OUR YOUTUBE: WHYVERSE".
  No "you" number in this episode → biggest single number in the hook (PLAN CUT SHORT PICK).

## Sources
See RESEARCH.md (every number with its URL and status). Key: UN News / ABC / AFP (COP31), UNFCCC, Carbon Brief + ENB (rule 42), WMO/UNEP 2022 ozone assessment,
UNEP Ozone Secretariat, Young et al. Nature 2021, Multilateral Fund, Energy Institute 2026, Global Carbon Budget 2025, UNEP Emissions Gap 2026, WMO / C3S, Hardin 1968.

## Known weak spots
- No real photos (proxy blocked Wikimedia/NASA) — faceless figures only.
- The "1.5 °C is already lost" chart is schematic (labelled) — only the 2024 point and the ≈1.3 °C long-term level are real values.
- Thermometers in ch4/ch5 are illustrations (no axis values except the labelled 1.5 / 2 °C lines in ch5).
- verify ? / ✗ on the title stamps (same as earlier episodes, see above).
- Mix measured, not listened to.
