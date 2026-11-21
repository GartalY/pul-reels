# Ep09 — El Niño: Why One Patch of Ocean Controls the World's Weather — NOTES

status: DONE — PUBLISHED Sat 21 Nov 2026 19:00 London / 23:00 Baku (https://www.youtube.com/watch?v=lhD7lgIP8e4, Metricool 436202002; thumbnail + .srt sent to Gartal 19:15 London); cut Short YouTube/Instagram/TikTok Sun 22 Nov 23:00 London / Mon 23 Nov 03:00 Baku, Metricool 436202244 / 436202260 / 436202273; see ../../posts.json, PUBLISH.md)

- **Timing:** the run started Fri 20 Nov 20:26 London (Sat 21 Nov 00:26 Baku, HTTP Date header from pypi.org). Baku "today" = Sat 21 Nov → long video Sat 19:00 London;
  the cut Short the day after at 23:00 London (never 19:00 Baku — the daily trend Short's slot).
- **Topic choice (trend first):** the biggest worldwide story of the last days with a "why" that holds for weeks: the building, possibly record El Niño.
  Copernicus (5 Nov) reported Niño 3.4 at 29.94 °C in October 2026, an all-time high (+3.21 °C); NOAA (12 Nov) gives ~60 % odds of the strongest El Niño
  since 1950; WMO expects the peak around December, lasting into Feb 2027; impacts already in the news (India's monsoon −13 %, Indonesia's fires, Peru's
  "extraordinary" coastal El Niño warning 14 Nov, NOAA's El Niño winter outlook). It stays current through the December peak and Christmas — the name's origin.
  Other headlines of the week were covered as daily Shorts (Anthropic IPO, GTA VI, Shenzhen summit) or too dark for a long animation (ICJ ruling, Cyclone Akvan).
  Not covered before (episodes/, shorts/, posts.json: no El Niño). Breaks the space streak (PLAN TOPICS: broader — weather/geography/money). Not political.
- **Style (STYLE ROTATION, new for long episodes): 'VINTAGE COMIC'** (PLAN.md NEW LOOKS 2026-11-15) + MAP ROUTE / GROWING GRAPH beats: aged newsprint, Ben-Day halftone
  dots (cached tiles + cached dot gradients), thick ink outlines with solid offset shadows, red / yellow / cyan / blue + Whyverse navy / gold / coral, Bangers
  lettering (OFL, film/fonts), starbursts, yellow narration boxes, speech bubbles, comic panels that pop / slide in. Equirectangular comic maps rendered once
  per worker (film/ocean.js mapCache, Natural Earth outlines). The hero diagram is the equatorial-Pacific cross-section "machine" (P.section) that morphs from
  a normal year to El Niño — reused in c1–c4 and the payoff. Guide character **Pico**, a Peruvian pelican (Ch.pico in film/comic.js): the beak pouch opens with
  the voice, blinks, points, thinks, shrugs, cheers, waves, flies, holds binoculars / a magnifier. Historical scientists (Walker, Bjerknes) as faceless
  silhouettes with name plates (PLAN PEOPLE = SILHOUETTES). The 1997–98 deaths beat is sober (navy card, no burst, soft bell).
- **EVRIM AĞACI LESSONS:** opens inside a concrete scene (Christmas, northern Peru, nets nearly empty, the sea warm) → the name → 2026: the child is back
  (29.94 °C) → the paradox (you can't see it from a beach, yet India / Indonesia / Peru / North America) → three promise panels, all answered in the payoff
  (warm water travels halfway round / the rain follows / why this one could be the strongest since 1950). Six chapters, each = card + spoken HOOK box + a
  reveal raising the next question. Myths corrected openly: "El Niño is a storm" (c3 hook), "El Niño makes everywhere hotter" (MYTH → BUSTED, Australia 2026
  wet), "climate change causes El Niño" (no — 7,000 years of corals — but it may be making the strong ones stronger, still debated). Warmth: Pico, the
  Christmas child, "this Christmas, right on time, the child is back". CTA only at the end.
- **FEEDBACK applied:** nothing boils (flat engine, amp 0, textBoil 0); no camera shake; pushes ≤ 3 % and slow zooms; hook after every chapter title; end card with
  spoken + animated CTA (like, subscribe, Instagram @whyverse___, TikTok @Whyverse) + SENDS line "✉ Send this to the friend who says it's too warm for November";
  no next-episode tease; no burned-in subtitles in the long video (ep09_elnino.srt). ALWAYS NAME IT: "El Niño" in the title, frame ~12 s, thumbnail, caption.
- **60 fps:** FPS = 60 in score.js and build_timeline.py (mouth track at 60 fps); every motion is a function of t.
- **Voice:** Kokoro v1.0 int8, `af_heart`, en-us, one wav per line (59 lines, 1,522 words, 533 s of speech). GAP 0.62 s between lines.
- **Length:** 9:59.9 (599.86 s), 1920×1080, 60 fps.
- **Render:** resumable 22.5 s chunks (tools/render_chunks.sh), 27 chunks, ≈ 6.5 fps with 2 Chromium workers (≈ 3.5 min per chunk, ≈ 95 min), no restarts;
  chunks 21–23 re-rendered after the final check (c6 'NOW' shot and 'already felt' opened on ~1–5 s of near-empty frames). Final: film/out/ep09_elnino.mp4
  (not in git; whyverse-media/ep09/ep09_elnino_long.mp4), libx264 medium CRF 29 + AAC 160k, +faststart → 74.3 MB; ffprobe r_frame_rate 60/1, 35,992 frames.
- **Sound:** one score timeline (events.js → score.js → ch*.js + song.js), 291 named hits, each with a synth SFX. Music bed per chapter (music box / guitar /
  marimba / e-piano), ducked + levelled −23.0 dB vs the voice; SFX −20.0 dB; title / chapter stings −14.0 dB where no voice; master −14.0 LUFS. Measured, not listened to.

## Built per chapter
| t | chapter | on screen |
|---|---|---|
| 0:00 | cold open | dusk sea, boat, nearly empty net, Pico on a pier, Christmas star, WARM! · "every few years" panels, EL NIÑO burst, = THE CHILD · 2026, Pacific map zooms to the glowing Niño 3.4 box, 29.94 °C, HOTTEST MONTH ON RECORD · Pico with binoculars → world map with 4 panels · 3 promise panels · question bubble · title HOW ONE PATCH OF OCEAN RULES THE WORLD + EL NIÑO |
| 1:06 | 1 The Christmas child | 1877 India, failed monsoon, dry field · Walker 1904, JOB: PREDICT THE MONSOON · pressure dials → see-saw across the map (HIGH/LOW flip) · 1920s SOUTHERN OSCILLATION + ? · 1969 Bjerknes: panels merge into OCEAN + AIR gears, ENSO · "a normal day" |
| 2:18 | 2 The tilted ocean | equator slice inset, trade winds, DAY counter · bathtub inset, level line, ≈ 0.5 M HIGHER · +8 °C thermometers → warm pool ×4 lower-48 US · Peru zoom: upwelling, nutrients, fish, Pico dives · rain west / dry east, balance, the wind face tires |
| 3:21 | 3 When the wind lets go | EVERY 2–7 YEARS, WEAKER → REVERSED, SLOSH! · Kelvin-wave bulge + bicycle, 8–16 KM/H, 2–3 MONTHS · warm covers cold off Peru, nutrients fade, fish sink, "at Christmas…" · THE TRAP feedback wheel, IT FEEDS ITSELF · Niño 3.4 box + gauge → SUPER EL NIÑO · IT'S THE RAIN! |
| 4:32 | 4 One ocean, the whole world | storm cloud slides east, THOUSANDS OF KM · heat pumped up, jet stream bends, ripples · typical effects map · N. America + hurricanes torn apart / more in the Pacific · MYTH → BUSTED → reshuffle tiles → Australia 2026 wet · +0.1–0.2 °C, 2016 / 2024 records · 0.1 °C → $$$ |
| 6:11 | 5 The price of a warm patch | anchovy bars 13.1 → 1.7 M t, El Niño + overfishing, CRASH! · 1997–98 panels, ≈ 23,000 (sober) · $5.7 TRILLION, 5 year cards · Panama: lakes, 36 → 25 ships/day · reef bleaching > 70 % · "is climate change behind all this?" |
| 7:32 | 6 The record breaker | fossil coral, ≥ 7,000 YEARS · warmer planet, Galápagos, 1,000-year schematic, STILL DEBATED · 29.94 °C / +3.21 °C, BOTH RECORDS!, trophies fall · NOAA 60 % dial, WMO peak Dec → Feb 2027 · India −13 %, Indonesia fires, Peru EXTRAORDINARY · 2027 VERY LIKELY THE HOTTEST YEAR |
| 9:06 | payoff + end | callback · the machine runs: NOT A PATCH… HALF A MACHINE, ALMOST HALFWAY AROUND THE PLANET, 3 ticked promises · THEN empty nets / NOW satellite, buoy, scientists · Christmas night: THE CHILD IS BACK, BIGGER THAN EVER MEASURED · end card + sends line |

## Cut Short (published one, PLAN QUALITY RESET: exactly one)
- **ep09_s1_pacific_is_tilted.mp4** — 2:22.1 → 2:50.1 (28.0 s, c2_1h → c2_3), 1080×1920, 60 fps, burned-in Bungee captions, last caption "FULL VIDEO ON OUR
  YOUTUBE: WHYVERSE". Hook title "THE SEA IS FLAT? / THE PACIFIC IS / TILTED 0.5 M" — a "you" myth hook ("you probably think the sea is flat") + the number in the
  title from frame 0; payoff: trade winds pile the water up, the sea is ≈ 0.5 m higher near Indonesia than Ecuador. Sun 22 Nov 23:00 London.

## Sources
See RESEARCH.md (48 claims with links: Copernicus C3S Oct 2026 bulletin + press release, NOAA CPC 12 Nov 2026, WMO Oct 2026, NOAA PMEL, NOAA Ocean Service,
NOAA "Understanding El Niño", Columbia IRI / Climate School, NOAA PSL, Bjerknes 1969, NOAA CPC / AOML, UK Met Office, NASA/NOAA, ABC News, FAO, World Bank,
Callahan & Mankin 2023, Carbon Brief / WWA, NOAA Coral Reef Watch, Cobb et al. 2013, Cole et al. 2026, IMD via Business Standard, Al Jazeera, ENFEN via Gestión).
Avoided: "60 cm" (sources: ~0.5 m), 1997–98 "$32–96 billion", "1998 record year", food-price claims, "2026 hottest year" (2027 is the Met Office's call),
the "40 % stronger" Live Science paraphrase.

## Known weak spots
- The storm cloud is a stylised anvil cumulonimbus; at small sizes (panels) it reads a little like a mushroom.
- The 1,000-year coral strip in c6 is labelled "schematic" (no real values plotted); the WMO curve is labelled "(shape)".
- The equirectangular maps inflate high latitudes; the 4 lower-48 outlines are squeezed by cos 37° so their area matches the warm pool honestly-ish.
- A few shots open on an almost empty frame for ~1 s before the first pop on the keyed word (c1 Walker office, c5 1997–98, c6 "already felt").
- **verify:** title_8 ✓ (±2 ms / 0 f), hot ✓, myth ✓; the 8 title words come 0.28 s apart (slam + brass), so verify picks neighbouring words (✗/? on title_1–7, as in ep03/04/07/08);
  half +6 f (the burst scales in over 0.32 s); logo −16 f (the iris transition opens before the logo pop). Picture and sound read the same event times from events.js, so they cannot drift.
- The 9:16 Short reuses the 16:9 picture on a blurred bed (make_shorts.py); a re-staged vertical version would be stronger.
