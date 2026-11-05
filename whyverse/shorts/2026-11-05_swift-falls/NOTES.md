# Whyverse 1-minute short — 2026-11-05 — "Why did NASA's Swift fall out of the sky?"

status: scheduled 2026-11-05 20:00 Europe/London (= 00:00 Baku, 6 Nov) on YouTube Shorts, Instagram Reels, TikTok
(see ../../posts.json). First standalone 1-minute Whyverse animation.

- **Topic (trend):** NASA's Neil Gehrels Swift Observatory re-entered over Sumatra, Indonesia on 4 Nov 2026 after
  almost 22 years (designed for 2). "Why" angle: solar maximum puffed up the upper atmosphere → drag → re-entry;
  the robotic rescue was called off. Not in episodes/ or posts.json before.
- **Style (STYLE ROTATION):** `neon` (glowing tubes, bloom, night sky) — differs from the last post (ep02 Moon,
  realistic 3D). Custom neon props in film/lib.js: Swift (body, tube, two solar wings), a cute rescue robot,
  stylised Earth with a puffable atmosphere, Sun, bursts, fire trails, Whyverse ringed planet.
- **Format:** 9:16 1080×1920, 30 fps, 57.9 s. Text and props inside G.SAFE (x 60–940, y 221–1498).
- **FEEDBACK applied:** no text boil (neon textBoil 0, amp 0.15), no camera shake, push ≤ 3 %, hook on screen from
  frame 0 ("NASA PLANNED · TO LAST 2 YEARS"), no tease of a next topic, CTA "Follow Whyverse … full videos on our YouTube".
- **Voice:** Kokoro v1.0 int8 `af_heart` en-us, 10 lines, 144 words (tools/voice.py, tools/build_timeline.py).
- **Sound:** events.js → score.js → song.js; 61 synth SFX hits (zap, ding, stamp, fire, burst, puff, brake, spark,
  streak, coin…), music bed one mood per shot. Measured: music −23 dB, SFX −20 dB under the voice, master −14 LUFS.

## Shots
| t | shot | on screen |
|---|---|---|
| 0:00 | hook | Swift; "NASA PLANNED · TO LAST 2 YEARS"; 2004–2026 bar, PLAN mark at 2006; counter 2 → 22, IT LASTED |
| 0:06 | the fall | "THIS WEEK · 4 NOV 2026"; Swift heats, fire trail onto a neon map; BURNED UP; pin over Sumatra |
| 0:12 | 2 decades | 2004 → 2026 counter; three gamma-ray bursts; far flash, its light travels to Swift; 13 BILLION YEARS AWAY |
| 0:20 | why? | WHY DID IT FALL? stamp; the Sun; sine solar cycle, 11 YEARS bracket, SOLAR MAX · 2024; Earth's air heats + puffs up |
| 0:31 | drag | Swift spirals in thick air; drag chevrons; SPEED / HEIGHT gauges drop; red pulse on "worse" |
| 0:37 | rescue | robot tug grabs, pushes up, sparks, breaks (X eyes); warning; RESCUE CALLED OFF · AUGUST 2026 |
| 0:44 | payoff | shooting star over Earth's limb; scoreboard PLANNED 2 YEARS / ACTUAL ~22 YEARS ✓ |
| 0:52 | end card | Whyverse planet, FOLLOW WHYVERSE, "Full videos on our YouTube", IG/TikTok handles |

## Facts + sources
- Re-entered 4 Nov 2026 over Sumatra / western Indonesia — Xinhua (citing NASA), 5 Nov 2026:
  https://english.news.cn/northamerica/20261105/7bd7a50f58b74680a2b2ebb284556d7f/c.html ;
  Spaceflight Now 4 Nov 2026: https://spaceflightnow.com/2026/11/04/nasas-neil-gehrels-swift-observatory-reenters-over-western-indonesia/
- Designed for a 2-year mission, worked almost 22 years; launched 2004 — NASA Swift blog 2 Nov 2026:
  https://science.nasa.gov/blogs/swift/2026/11/02/nasas-swift-observatory-to-re-enter-atmosphere/ ; ABC News 5 Nov 2026:
  https://www.abc.net.au/news/2026-11-05/nasa-telescope-plummets-to-earth-after-decades-long-mission/107348488
- Orbit decayed because higher solar activity expanded the upper atmosphere (more drag) —
  https://en.wikipedia.org/wiki/Neil_Gehrels_Swift_Observatory
- Sun reached the maximum phase of its ~11-year cycle (announced Oct 2024) — NASA/NOAA:
  https://science.nasa.gov/science-research/heliophysics/nasa-noaa-sun-reaches-maximum-phase-in-11-year-solar-cycle
- GRB 090423, light that travelled ~13 billion years — Wikipedia (Swift; GRB 090423).
- Robotic rescue (Katalyst LINK) called off in Aug 2026 over problems with the rescue craft in space — Via Satellite
  19 Aug 2026: https://www.satellitetoday.com/technology/2026/08/19/katalyst-link-mission-is-unable-to-rescue-nasa-swift-observatory/ ;
  Reuters via Internazionale 19 Aug 2026.
- Not used: mass / casualty-risk numbers (not needed), orbital speed or altitudes (not verified this run).
- Note: the run's web fetcher could not open pages (permission prompts); facts were checked against search-result
  titles/snippets plus the 2026-11-05 research for the Azerbaijani page (facts/2026-11-05.json, trend).
