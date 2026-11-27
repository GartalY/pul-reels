# Ep11 — Why Didn't the Universe Destroy Itself? The Antimatter Mystery — NOTES

status: DONE — scheduled YouTube Sat 28 Nov 2026 19:00 London / 23:00 Baku; cut Short YouTube/Instagram/TikTok Sun 29 Nov 23:00 London / Mon 30 Nov 03:00 Baku — Metricool YT 444999256; Short YT 444999378 / IG 444999391 / TT 444999409 (see ../../posts.json, PUBLISH.md)

- **Timing:** the run started Fri 27 Nov 20:24 London (Sat 28 Nov 00:24 Baku; VM clock = UTC, checked against pypi.org's HTTP Date). Baku "today" = Sat 28 Nov →
  long video Sat 19:00 London; the cut Short the day after at 23:00 London (never 19:00 Baku — the daily trend Short's slot).
- **Topic choice (trend first):** the 26–27 Nov scout files had no unused big story with a weeks-long "why" angle (Macy's parade, Tidal, NY AI-toy ban and SpaceX's
  1 M satellites were already used as Shorts; wars/tragedies skipped; Ebola = sober tragedy, not a "why" explainer). The evergreen queue is used up, so an evergreen
  "why" topic with fresh news hooks: Northwestern trapped ONE positron for months (Physical Review Letters, Oct 2026) and CERN's first antimatter road trip
  (BASE-STEP, 24 Mar 2026). Not covered before (episodes/, shorts/, posts.json: no antimatter). Physics, not space (space quota untouched). political: false.
- **Style (STYLE ROTATION, new): 'RISOGRAPH'** — a two-ink print on warm recycled paper: riso BLUE = matter, fluorescent PINK = antimatter; where they overprint
  they MULTIPLY into violet (the look is the story: matter + antimatter meeting); YELLOW only for light/energy (annihilation flashes, photons). Halftone-dot shading
  from cached patterns, slow drifting halftone blobs in two corners, a static paper grain + fibre layer printed over every frame (never changes = no boil), big type
  printed twice with a fixed 5 px off-register pink plate (P.rtext/P.rslam). Dark "night sky" pages (title, myth #3, payoff) are navy with halftone. Code: film/riso.js
  on top of ep10's line.js/lib.js toolkit. Guides **Elle** (electron, blue, "−", the narrator, lip-syncs, blinks, points, shrugs, cheers, sweats) and her mirror
  twin **Posi** (positron, pink, "+") — Ch.twin in film/chars.js. People = faceless two-ink figures with name plates (Dirac, Anderson, Sakharov, Cronin, Fitch,
  Gabrielse). Progress counter = 6 chapter dots top-right (blue/pink).
- **Real photos:** Wikimedia Commons was blocked by this run's network proxy (connection refused) → faceless figures with name plates (PLAN fallback).
- **EVRIM AĞACI LESSONS:** opens inside a concrete scene + paradox ("This is a banana… every ~75 minutes it shoots out antimatter… the Big Bang made equal twins…
  the universe should be empty. No you. And yet, here you are"); 3-card promise (what antimatter is / how you hold it / why anything exists) answered in the payoff;
  6 chapters, each = card + spoken HOOK + a reveal that raises the next question; 3 myths corrected openly ("antimatter is science fiction", "super fuel / super
  bomb", "it's hiding in anti-galaxies"); warmth (Elle, "matter is still winning"); payoff closes the opening banana scene; CTA only at the end.
- **FEEDBACK applied:** nothing boils (flat engine, amp 0, textBoil 0, static grain); no camera shake; pushes ≤ 3 %; hook after every chapter title; end card with spoken +
  animated CTA (like, subscribe, Instagram @whyverse___, TikTok @Whyverse) + SENDS line "Send this to the friend who always asks 'but why?'"; no next-episode tease;
  no burned-in subtitles in the long video (ep11_antimatter.srt, 227 cues). ALWAYS NAME IT: CERN / ALPHA / BASE-STEP / Northwestern / LHCb named on screen + voice.
- **60 fps:** FPS = 60 in score.js and build_timeline.py (mouth track at 60 fps); every motion is a function of t. ffprobe: see "Length" below.
- **Voice:** Kokoro v1.0 int8, `af_heart`, en-us, speed 0.95 (viewer feedback 24 Nov: slower voice), one wav per line (60 lines, 1,253 words, 466 s of speech).
- **Length:** 8:53.7 (533.7 s), 1920×1080, 60 fps (32,023 frames). Final: film/out/ep11_antimatter.mp4 (not in git; whyverse-media/ep11/ep11_antimatter_long.mp4),
  libx264 medium CRF 29 + AAC 160k, +faststart.
- **Render:** resumable 22.5 s chunks (tools/render_chunks.sh), 24 chunks, ≈ 3.7 fps with 2 Chromium workers (≈ 6 min per chunk — the halftone pattern fills
  cost about 2× ep10's line art), ≈ 2 h 25 min. Chunks 6–8 re-rendered after the frame check (c2 "1 g + 1 g" and MYTH #2 shots now fill from their first frame;
  chapter-3 card prop moved off the hook box).
- **Sound:** one score timeline (events.js → score.js → ch*.js + song.js), 273 named hits, each with a synth SFX (new: 'flash' = zap + noise burst + bell for every
  annihilation). Music bed per chapter, ducked + levelled −23.0 dB vs the voice; SFX −20.0 dB; title / chapter stings −14.0 dB where no voice; master −14.0 LUFS.
  Measured, not listened to.

## Built per chapter
| t | chapter | on screen |
|---|---|---|
| 0:00 | cold open | banana + clock "≈ 75 MIN" + a pink positron streaking out, ANTIMATTER · POSITRON e⁺ meets ELECTRON e⁻ → yellow flash, GONE., pure light · HERE'S THE PROBLEM → the Big Bang burst throwing out blue/pink pairs, equal bars "=", EVERY PARTICLE GOT A TWIN · 18 pairs annihilate in waves → EMPTY. NO STARS / NO PLANETS / NO BANANAS / NO YOU crossed out · Elle "here you are!", galaxies refill, 3 promise cards · WHY DIDN'T THE UNIVERSE DESTROY ITSELF? · TITLE (navy, two inks) "THE UNIVERSE SHOULD BE EMPTY." |
| 0:59 | 1 The mirror twin | 1928 Dirac at a board, the equation writes itself, a mirror line → OPPOSITE CHARGE · 1932 Anderson, cosmic rays, cloud chamber tracks, one curls the wrong way → THE POSITRON · two Nobel medals 1933 / 1936 · mirror table e⁻/e⁺, p/p̄, H/H̄ (orbiting) · MYTH card crossed → banana + POTASSIUM-40 firing positrons, YOU with a beating heart, "even you!" · 24 pairs, the pink twins fade: WHERE DID ALL THE TWINS GO? |
| 2:13 | 2 The flash | approach → ANNIHILATION, MASS → ENERGY, mostly light, E = mc², nothing left over · 1 g + 1 g collide → power station, "2 DAYS of a big (1 GW) power station" (our calculation on screen) · MYTH #2 rocket "SUPER FUEL?" + bomb "SUPER BOMB?" → REALITY CHECK · globe pin CERN near Geneva, accelerator ring, 1 YEAR NON-STOP → 100 W bulb lit with a 5.0 s countdown → OFF · MAKING IT: SLOW (clock) / KEEPING IT: HARDER (a positron drifts into the jar wall → flash → GONE.), Elle sweats |
| 3:12 | 3 How to hold nothing | Penning trap: MAGNETIC FIELD, ELECTRIC FIELD, ALMOST PERFECT VACUUM, particle floating · ring + "≈ 400,000,000 antiprotons per hour", 100-dot grid → ≈ 10 % CAUGHT · ALPHA, 18 orbiting antihydrogen atoms, "up to 3,000 an hour", clock "kept up to 100 h" · 2023: UP? / DOWN? → atoms released, they fall: DOWN ✓ · ANTIMATTER ROAD TRIP: 24 MARCH 2026, truck with BASE-STEP on a scrolling road, 92 antiprotons, factory noise → QUIETER LABS · Oct 2026 Northwestern: trap with ONE positron, calendar flipping MONTHS, thermometer to ≈ 0.3 K · magnifier: e⁻ ≠ ? e⁺, HUNTING FOR A DIFFERENCE |
| 4:37 | 4 One in a billion | balance: MATTER vs LIGHT tips, TINY. · 312 pairs flash out, counter 1,000,000,000 PAIRS → one glowing survivor, +1 SURVIVED, "just one" · EVERY STAR / PLANET / PERSON = made of survivors, 1 IN A BILLION · isometric 1 cm³ filling with wiggly photons, ≈ 411 particles of ancient light · navy: MYTH #3, blue + pink galaxies, ANTI-STARS? ANTI-GALAXIES? · galaxies drift together, border flashes → NONE FOUND · HIDDEN ✗ LOST. scale tips to matter, HOW? |
| 5:47 | 5 The rule breakers | Sakharov with a paper, RECIPE FOR A UNIVERSE LIKE OURS, a big two-ink "3" · the 3 conditions with icons (more blue than pink, two rule books, a tipped beam + flames) · CP VIOLATION: spinning twins in a mirror that isn't perfect, 1964 Cronin & Fitch, IN MESONS · 2025 LHCb detector, BARYONS label, Λb vs anti-Λb decaying into p K π π, bars differ ≈ 2.5 % · 80,000+ decay dots, 5.2 σ, NATURE · JULY 2025 · THE TWIST: predicted vs needed bars (schematic) "many orders of magnitude too small", Elle worried · REAL ✓ ENOUGH ✗, puzzle with a missing piece, SOMETHING IS MISSING |
| 7:07 | 6 The hunt for the missing piece | SUSPECT #1 THE NEUTRINO, a ghost ν passing through a planet, ν ≠ ? anti-ν, NOT MEASURED YET · COMPARE THE TWINS on a scale, the Northwestern trap · HOW MAGNETIC IS IT? spinning e⁻ and e⁺ with magnet arrows, "1 part in 10,000,000,000,000" · PERFECT MIRRORS "=" → IF THEY DON'T… "≠", Gabrielse quote card "the biggest discovery in physics in the last century" · SO FAR… THE TWINS MATCH ✓ SAME MASS ✓ SAME FALL ✓ → EVEN STRANGER., Elle + Posi shrug |
| 8:09 | payoff + end | navy: SO, WHY DIDN'T THE UNIVERSE DESTROY ITSELF? · WE DON'T KNOW YET, 96 pairs flash out, 1 SURVIVED · 140 blue particles fly in to build a person: YOU, every atom a survivor, THE BIGGEST DISAPPEARANCE IN HISTORY · the banana again with a tiny flash, scoreboard MATTER 1,000,000,001 vs ANTIMATTER 1,000,000,000, MATTER IS STILL WINNING · end card (WHYVERSE two-ink, LIKE → SUBSCRIBED ✓, Instagram/TikTok tags, sends line), Elle + Posi wave and cheer |

## Cut Short (the one published)
- **ep11_s1_one_in_a_billion** — c4_3 → c4_5 (≈ 4:52–5:20, ≈ 29 s): hook overlay "YOU ARE MADE OF / 1-IN-A-BILLION / SURVIVORS" (PLAN CUT SHORT PICK: a "you"
  number), the field of pairs flashing out → +1 SURVIVED → every star/planet/person → ≈ 411 particles of ancient light around you; payoff = 1 IN A BILLION;
  captions per the 24 Nov viewer rule (one fixed bar, 3–5-word phrases, white bold on a dark band); last caption "FULL VIDEO ON OUR YOUTUBE: WHYVERSE".

## Sources
See RESEARCH.md (every number with its source and status). Key: CERN "Antimatter" page, CERN ALPHA gravity (2023), CERN + ERC BASE-STEP (Mar 2026), Physics World /
Sci.News / Chicago Sun-Times + PRL 137, 173001 (Oct 2026), CERN + Physics Today on LHCb CP violation in baryons (Nature 643, 2025), NobelPrize.org (Anderson),
Symmetry Magazine (bananas), Wikipedia Baryogenesis / Baryon asymmetry (Sakharov, 411 photons/cm³, no antimatter regions).

## Known weak spots
- No real photos (proxy blocked Wikimedia) — faceless figures only.
- The "predicted vs needed" CP-violation bars are schematic (labelled "not to scale"); the CERN source gives only "many orders of magnitude".
- "1 g + 1 g ≈ two days of a big power station" is our own E = mc² arithmetic (labelled on screen).
- A few shots start with 0.5–1.5 s of a single headline before the next element arrives (e.g. c1 mirror table, c6 "how magnetic").
- The banana stem sits slightly above the tip in the cold-open chunks (fixed in later chunks).
- verify (on the published file): title_1 sound ✓, title_4 sound ✓; picture +2–3 f on the title stamps and the logo marker next to the end-card iris (as in ep04–ep10: the words scale in over 0.12 s), title_2/3 sounds ±45–80 ms because the stamps are 0.42 s apart. Picture and sound read the same events.js times. Not re-rendered for this.
- Mix measured, not listened to.
