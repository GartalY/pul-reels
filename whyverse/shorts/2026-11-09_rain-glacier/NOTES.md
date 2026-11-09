# Whyverse 1-minute short — 2026-11-09 — "How rain makes a glacier run"

status: scheduled 2026-11-09 20:00 Europe/London (= 00:00 Baku, 10 Nov) on YouTube Shorts, Instagram Reels, TikTok
(see ../../posts.json).

- **Topic (trend, "this week"):** a new study (EGUsphere preprint, covered 7–8 Nov 2026) shows heavy rain more than doubled
  the speed of Turner Glacier (Sít' Kusá), Alaska: up to ~7.5 m in one day. "How does it actually work?" angle: rain
  reaches the bed through cracks and moulins; drainage can't keep up; water pressure builds; less friction; the ice slides.
  Not in episodes/ or posts.json before.
- **Style:** BLUEPRINT (PLAN.md: "NEXT 1-minute animation uses it"; brand/STYLE_REFERENCES 2026-11-08) — navy grid paper,
  white technical line art, yellow tags, digits in boxes, dimension lines, callouts, "SECTION A–A" / "DETAIL B".
  Differs from the last Whyverse post (ep03 dark sky / Swift short, both neon). Engine style 'flat', all props custom in film/lib.js.
- **Format:** 9:16 1080×1920, 30 fps, 59.1 s. Text inside G.SAFE; nothing important in the bottom 22% or right 140 px.
- **FEEDBACK applied:** no boil on text, no camera shake, slow pushes ≤ 3 % (one 6 % push-in on the map pin), hook number
  on screen from frame 0 with motion (rain + counter), no tease of a next topic, CTA "Follow Whyverse … full videos on our YouTube".
- **Voice:** Kokoro v1.0 int8 `af_heart` en-us, 10 lines, 151 words. tools/build_timeline.py now matches each comma/full stop
  to the nearest pause (the old "longest pauses" rule misplaced l3's words).
- **Sound:** events.js → score.js → song.js; ~75 synth SFX hits; music −23 dB, SFX −20 dB under the voice, master −14 LUFS.

## Shots
| t | shot | on screen |
|---|---|---|
| 0:00 | hook | glacier cross-section in the rain, ice slides; counter 0.0 → 7.5 M (digit boxes); IN ONE DAY; MORE THAN 2× ITS SPEED; +116% |
| 0:07 | this week | THIS WEEK · NEW STUDY; Alaska map with graticule; pin + TURNER GLACIER; ALASKA, USA |
| 0:12 | GPS | 3 GPS stations on the ice, logger clock +15 s per tick; 16 rainstorm icons, 9 light up; 9/16; SPED IT UP |
| 0:21 | how? | HOW? stamp; "push from above?" arrow crossed out; water path goes under the ice ✓ |
| 0:26 | section A–A | rain, crevasses + moulin open, water runs down to the bed; CRACKS / HOLES (MOULINS) / BEDROCK |
| 0:31 | detail B | ice over rock, water film; DRAIN · TOO SMALL!; pressure gauge rises, arrows push the ice up; GRIP meter drops; GRIP LOST |
| 0:39 | slide | friction arrows shrink, ice slides; speed graph: rain → +12 H → FAST! → < 2 WEEKS → back to normal (not to scale) |
| 0:47 | payoff | HEAT vs STORM panels; NOT ONLY…; STORM = GREASE; UP TO 7.5 M IN ONE DAY |
| 0:53 | end card | Whyverse planet, FOLLOW WHYVERSE, "Full videos on our YouTube", IG/TikTok handles |

## Facts + sources
- Study: "Rain-induced speed up events of a temperate surging glacier, AK" — EGUsphere preprint egusphere-2026-6232
  (https://egusphere.copernicus.org/preprints/2026/egusphere-2026-6232/), Boise State University researchers.
- ~7.5 m of movement in one day = 116 % increase (surge phase 2020–21); 9 of 16 major rain events followed by speed-ups;
  GPS position every 15 s — Next Horizon "5 Science News Stories — November 8, 2026"
  (https://www.nexthorizon.space/2026/11/5-science-news-stories-november-8-2026.html) and Interesting Engineering 8 Nov 2026
  (https://interestingengineering.com/science/rain-accelerates-alaskan-glacier-251-percent): "24.6 feet per day, … 116 percent".
- Speed-up began ~12 h after rain started (surge phase); speeds back to pre-event levels in under two weeks; inefficient drainage
  lets water pressure build beneath the glacier, reducing friction — Interesting Engineering 8 Nov 2026 (above).
- Not used: the 251 % figure (quiescent phase, smaller absolute change — not comparable), glacier length/area (not verified).
- The 9 lit storm icons and the graph shape are illustrative (graph marked "not to scale").
- Note: this run's web fetcher could not open phys.org or the preprint page; facts are from the two secondary articles above,
  which agree on every number used.
