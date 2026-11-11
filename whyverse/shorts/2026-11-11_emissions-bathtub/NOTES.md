# Whyverse daily trend Short — 2026-11-11 — "Emissions are falling. So why the worry?"

status: scheduled 2026-11-11 19:00 Asia/Baku on YouTube Shorts, Instagram Reels, TikTok (see ../../posts.json).

- **Topic (trend, last ~48 h):** the Global Carbon Budget 2026 (21st annual report, >140 scientists, preprint in Earth
  System Science Data) came out 10 Nov 2026 during COP31 week and was covered worldwide 10–11 Nov (UEA/Tyndall, Japan Times,
  Energy Live News, Yahoo/AFP "why aren't climate experts celebrating?"). Hook: fossil CO2 is projected to FALL in 2026 —
  yet total CO2 still rises and the 1.5 °C budget is < 4 years. Bathtub explainer + payoff (59 countries decoupled; the tap
  can turn, just faster). Not in episodes/ or posts.json.
- Other candidates checked: ozone hole 2026 (released 4 Nov, too old), Homo naledi all-female burial (June study),
  Godzilla Minus Zero record (can't draw the character), São Paulo GP.
- **Neutrality:** the oil-price part is stated as "an oil price shock" only (source: "energy shock triggered by the Iran
  conflict"); no country/party blamed or praised.
- **Style:** PAPER CUT-OUT (warm kraft paper, flat cut shapes with soft drop shadows, ink edges, digits in boxes; factory,
  turbine, solar, EV, oil barrel, fires/trees, bathtub with tap, ppm columns, budget bar, calendars, globe with 59 pins).
  Differs from yesterday's neon Short. Engine style 'flat', props in film/props.js, lib in film/lib.js.
- **Format:** 9:16 1080×1920, 30 fps, 59.3 s. Text inside G.SAFE; nothing important in the bottom 22% or right 140 px.
  Burned-in captions (≤4 words / ≤17 chars per cue, keyword in yellow) at y≈1440.
- **FEEDBACK applied:** no boil, no camera shake, slow pushes ≤ 3 %; hook text ("FOSSIL FUEL EMISSIONS FALL") and motion
  from frame 0; no tease of a next topic; ends with "Follow Whyverse for more."
- **Voice:** Kokoro v1.0 int8 `af_heart` en-us, speed 1.08 (SPEED env in tools/voice.py), 9 lines. Timeline: tools/build_timeline.py.
- **Sound:** events.js → score.js → song.js (same synth bed as 2026-11-10); SFX on every hit; music −23 dB, SFX −20 dB under the voice, −14 LUFS.

## Facts + sources
All from the Global Carbon Budget 2026 press release (UEA / Tyndall Centre, 10 Nov 2026,
https://tyndall.ac.uk/news/fossil-co2-emissions-decrease-in-2026/ ; same release on EuropaWire
https://news.europawire.eu/uea-scientists-project-fall-in-fossil-co%E2%82%82-emissions-in-2026-as-total-carbon-emissions-rise/eu-press-release/2026/11/10/11/10/05/186889/),
cross-checked against newscord.org's 24-outlet comparison ("fossil CO2 emissions fall 0.4% in 2026") and Energy Live News 11 Nov
(https://www.energylivenews.com/2026/11/11/cop31-global-co2-from-fossil-fuels-to-decrease-but-its-largely-due-to-wars/).
- Fossil CO2 projected −0.4 % in 2026, 38.2 billion tonnes.
- Drivers: expansion of solar and wind (+ EVs) and an oil/energy price shock ("likely a short-term response").
- Total CO2 incl. land use 43.3 bn t in 2026, up from 42.8 bn t; land-use rise from peat fires and forest degradation (SE Asia, El Niño).
- Atmospheric CO2 427.7 ppm in 2026, 54 % above pre-industrial (≈278 ppm implied by 427.7/1.54).
- Remaining 1.5 °C budget 150 bn t CO2, "less than four years of emissions at the current rate".
- 59 countries emitted less in 2025 than in 2019 while their economies grew (script: "cut emissions while their economies grew").
- "More than 140 scientists" (Tyndall).
- Illustrative (not to scale): bathtub metaphor, globe pins (59 dots placed decoratively, not real locations), budget bar drain, chart line in shot 1.
- Not fetched: globalcarbonbudget.org, Japan Times, Oceanographic (blocked/errors this run).
