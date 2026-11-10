# Whyverse daily trend Short — 2026-11-10 — "A robot just built something in space"

status: scheduled 2026-11-10 19:00 Asia/Baku on YouTube Shorts, Instagram Reels, TikTok (see ../../posts.json).

- **Topic (trend, last ~48 h):** Caltech's ASTRA payload (DARPA NOM4D) built a structure in orbit with no astronauts,
  called by its PI "the first time that a structure has been autonomously constructed in space". Announced by Caltech
  5 Nov, picked up worldwide 8–10 Nov (ScienceDaily 9 Nov, Interesting Engineering 9 Nov, Tech Insider 10 Nov, phys.org).
  Historic first + "how does it work?" mechanism + a payoff (future giant telescopes built in orbit). Not in episodes/ or posts.json.
- **Style:** NEON space (deep violet night, glowing cyan/magenta/yellow line art, isometric wire truss bays, two-link robot arm).
  Differs from yesterday's Shorts (sticker-pop senator, blueprint glacier). Engine style 'flat', all props custom in film/lib.js.
- **Format:** 9:16 1080×1920, 30 fps, 60.1 s. Text inside G.SAFE; nothing important in the bottom 22% or right 140 px.
  Burned-in captions (≤4 words per cue, keyword in glowing yellow) at y≈1440.
- **FEEDBACK applied:** no boil, no camera shake, slow pushes ≤ 3 %; hook text ("FIRST TIME EVER · ROBOT BUILDS IN SPACE")
  and motion from frame 0; no tease of a next topic; ends with "Follow Whyverse for more."
- **Voice:** Kokoro v1.0 int8 `af_heart` en-us, 9 lines, 158 words. Timeline: tools/build_timeline.py (GAP 0.3 s).
- **Sound:** events.js → score.js → song.js; synth SFX on every hit (new 'servo' for the arm); music −23 dB, SFX −20 dB under the voice, −14 LUFS.

## Shots
| t | shot | on screen |
|---|---|---|
| 0:00 | hook | Earth limb, arm builds a glowing bay; FIRST TIME EVER / ROBOT BUILDS IN SPACE; astronaut crossed out; 0 ASTRONAUTS |
| 0:06 | ASTRA | ASTRA stamp, MADE AT CALTECH · DARPA-FUNDED; rocket launch (Vandenberg); 30 MAR 2026; payload box ≈ 1 m³ |
| 0:13 | why? | WHY BUILD UP THERE?; narrow rocket fairing; Webb's 18-segment mirror, counter 0 → 6.5 M; wings fold; JUST TO FIT |
| 0:22 | how | dispensers (STRUTS, JOINTS), ROBOTIC ARM shuttles parts, 12 edges of one bay on the assembly plate; ONE BAY |
| 0:30 | loop | shiny net on the bay, PUSH OUT, joins the others; NEXT ONE starts |
| 0:36 | target | 1.4 M WIDE dish, ring of 11 bays counting up; TIME RAN SHORT timer; 3 / 11; 3 BUILT (2 pre-built + 1 built in orbit) |
| 0:43 | scale | SMALL? SURE.; THE GOAL (DARPA); zoom-out counter 1.4 → 1,000 M; 1 KM+ |
| 0:49 | payoff | TOMORROW: giant mirror built by robot arms over Earth, tiny rocket, IN ONE PIECE? ✗; BUILT IN ORBIT |
| 0:56 | end card | Whyverse planet, FOLLOW WHYVERSE, "Full videos on our YouTube", IG/TikTok handles |

## Facts + sources (each checked in ≥ 2 sources)
- ASTRA = Autonomous In-Space Tensioned Reflector Assembly, built by Caltech (PI Sergio Pellegrino), funded by DARPA NOM4D —
  Caltech news (https://www.caltech.edu/about/news/caltech-robotic-space-demo-successfully-builds-in-space),
  Interesting Engineering (https://interestingengineering.com/ai-robotics/caltech-darpa-astra-robot), Tech Insider
  (https://tech-insider.org/robot-builds-structure-in-space-caltech-astra-1-4-meter-2026/).
- "First time a structure has been autonomously constructed in space", no astronauts — Caltech (Pellegrino quote), Tech Insider,
  ScienceDaily "Caltech robot makes history by building a structure in space" (https://www.sciencedaily.com/releases/2026/11/261108233043.htm).
  Nuance: the ground team sent commands and fixed problems from Earth (Caltech) — script says "without a single astronaut", not "with no humans".
- Launched 30 March 2026 from Vandenberg on SpaceX Transporter-16 (Momentus Vigoride 7); payload ≈ 1 cubic metre — Caltech, Interesting Engineering, Tech Insider.
- Arm/manipulator takes struts and joints from motorized dispensers, builds a bay on an assembly plate, attaches a reflective
  net-like film (prestressed cable nets), pushes the bay out, repeats — Caltech, Interesting Engineering. (Tech Insider calls it a gantry robot; we follow Caltech's "armlike manipulator".)
- Target: 1.4 m reflector antenna, 11 bays; time ran short; two pre-built bays deployed + a third built in orbit — Caltech, Interesting Engineering (Tech Insider: count unconfirmed).
- DARPA goal: structures hundreds of metres or kilometres across — DARPA PM Andrew Detor quoted by Caltech and Tech Insider.
- Webb: 6.5 m primary mirror of 18 hexagonal segments, folded to fit inside the Ariane 5 fairing — NASA Webb telescope overview
  (https://science.nasa.gov/mission/webb/science-overview/science-explainers/telescope-overview), Northrop Grumman JWST datasheet.
- Illustrative (not to scale): the arm shape, the bay drawing, the zoom-out ring, the "tomorrow" telescope.
- phys.org could not be fetched from this run; Wikipedia current events blocked.
