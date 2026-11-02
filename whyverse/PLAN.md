# Whyverse — night animation plan (Gartal, 2026-11-02)

Gartal: "create an 8–10 minute animation 3 times a week at nights when I'm sleeping … create one tonight
for tomorrow morning so I can watch it and let you know what's the problems." NOTHING is posted anywhere
until Gartal says "let's start posting". Then: long video on YouTube + Shorts/Reels/TikToks cut from it.

## Schedule
Scheduled task "Whyverse – night animation": Tue/Thu/Sat 00:23 Baku (after the Azerbaijani page's 23:59
report). Gartal 2026-11-02 14:30: "take your time … 6–10 hours … just give me something very good … use
everything you got". Use the whole night; deliver by ~09:00 Baku. Quality over speed.

## Format
- 16:9, 1920x1080, 30 fps, 8–10 min. Brand: navy space background, gold→coral accents, blue ringed planet
  (whyverse/brand/). Look: the Moon animation-studio test Gartal loved (prototypes/anim_studio_moon) —
  flat but rich, lots of motion, numbers that count up, maps, diagrams, every sound synced to the visuals.
- Built with the animation-studio skill (one score.js timeline for picture + sound). Voice: Kokoro
  (free, Apache-2.0, kokoro-onnx models from GitHub). VOICE IS PARKED: use `am_michael` as a placeholder;
  Gartal liked all 3 test voices and will decide later.
- Music bed and SFX at least 20 dB under the voice (Gartal: Caspian water SFX was "too loud").
- No burned-in subtitles in the 16:9 master; write an .srt next to it.
- Structure: cold open hook (0–20 s, question + surprising number) → 5–7 chapters, each with its own
  visual idea → payoff → closing question that teases the next episode.
- Mark 4–6 SHORTS CUT POINTS (start/end time + the hook line) in the episode notes. Shorts get re-staged
  in 9:16 later, not cropped.
- Fact rules as on the Azerbaijani page: every number verified with a source; listed in the notes.

## STYLE ROTATION — every episode a DIFFERENT look, so Gartal can pick favourites
Gartal: "one video can be in moon style, the other in animation style, the other a stickman style … whatever
you think is the best". Never pixel art (he disliked it). Use every tool: animation-studio styles
(paper, flat, chalk, neon, watercolor), its character system (Ch.person, Ch.dog/cat/bird, custom G.* figures,
stickmen), maps + data-viz kit, three.js 3D (prototypes/anim_caspian, the Oct 31 Moon night test), mixed per
chapter where it helps. Read the skill's references (storytelling.md, visual-style.md, custom-characters.md,
review-and-gotchas.md) before building. Plan per topic:
1. Bees → 'paper' cut-out storybook with characters (a bee guide, Maoxian farmers with brushes, supermarket).
2. Moon → realistic 3D three.js space shots (Moon-test look) + flat data overlays.
3. Dark night sky → 'neon' space style.
4. Earth stops spinning → stickman / 'chalk' explainer.
5. Sleep → 'watercolor' with characters.
6. World's worth → 'flat' infographic, maps, counters.
Record the style used in each NOTES.md; FEEDBACK.md decides which styles win.

## Topic queue (take the first one not done; Gartal may reorder)
1. What if every bee disappeared?  ← tonight (2026-11-03 morning)
2. What if the Moon disappeared?
3. Why is the sky dark at night? (Olbers' paradox)
4. What if Earth stopped spinning?
5. Why do we have to sleep?
6. How much is the whole world actually worth?

## Feedback loop
Gartal's comments go into whyverse/FEEDBACK.md (newest first). Every night run reads it FIRST and fixes
those problems in the next episode.
