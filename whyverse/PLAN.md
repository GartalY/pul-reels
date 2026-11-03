# Whyverse — night animation plan (Gartal, 2026-11-02)

Gartal: "create an 8–10 minute animation 3 times a week at nights when I'm sleeping". POSTING IS ON since
2026-11-03 (Gartal approved, starting with ep01) — see POSTING below. Gartal reviews each episode during the day
and can stop an upload before it goes live.

## Schedule
Scheduled task "Whyverse – night animation": Tue/Thu/Sat 00:23 Baku (after the Azerbaijani page's 23:59
report). Gartal 2026-11-02 14:30: "take your time … 6–10 hours … just give me something very good … use
everything you got". Use the whole night; deliver by ~09:00 Baku. Quality over speed.

## Format
- 16:9, 1920x1080, 30 fps, 8–10 min. Brand: navy space background, gold→coral accents, blue ringed planet
  (whyverse/brand/). Look: the Moon animation-studio test Gartal loved (prototypes/anim_studio_moon) —
  flat but rich, lots of motion, numbers that count up, maps, diagrams, every sound synced to the visuals.
- Built with the animation-studio skill (one score.js timeline for picture + sound). Voice: Kokoro
  (free, Apache-2.0, kokoro-onnx models from GitHub). VOICE: `af_heart` (American female) — Gartal chose it for now on 2026-11-02 (switched from male);
  Gartal liked all 3 test voices and will decide later.
- Music bed and SFX at least 20 dB under the voice (Gartal: Caspian water SFX was "too loud").
- SUBTITLES (decided 2026-11-03): no burned-in subtitles in the 16:9 master (the animation already carries a lot of
  on-screen text); write an .srt and send it to Gartal with the thumbnail so he uploads it as YouTube captions.
  SHORTS get burned-in word captions (make_shorts.py, Bungee, ≤4 words per cue) for sound-off viewing.
- THUMBNAIL: 1280x720 jpg made with the engine (pattern: episodes/ep01_bees/tools/thumb.js — guide character +
  3–5 big words + one visual of the payoff). After the long video goes live, tell Gartal and send him the
  thumbnail + .srt (he sets them in YouTube Studio).
- ENDING (Gartal 2026-11-03): payoff → end card with a spoken + animated call to action: like the video,
  subscribe to Whyverse, find us on Instagram (@whyverse___) and TikTok (@Whyverse) for shorter stories.
  Never announce the next topic.
- Structure: cold open hook (0–20 s, question + surprising number) → 5–7 chapters, each with its own
  visual idea AND its own opening hook line (a question / surprising claim right after the chapter title, so people
  stay) → payoff → Whyverse end card. NEVER tease or name the next episode (Gartal 2026-11-03: topics follow trends).
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
REAL FOOTAGE (idea from Gartal's OpenMontage reel, 2026-11-02): space episodes may mix in short public-domain
NASA clips/photos (images.nasa.gov; NASA media is generally not copyrighted — follow its media guidelines, no
NASA logo/endorsement). Wikimedia/Archive only with a checked licence + credit in NOTES.md. Animation stays
the main look — footage is seasoning, never a stitched stock-clip video (mass-produced-content risk).
Record the style used in each NOTES.md; FEEDBACK.md decides which styles win.

## Topic choice (Gartal 2026-11-03)
First check what is trending worldwide (news, Google Trends, YouTube/TikTok) for a 'why / what if' angle that will
still hold up for weeks; if nothing fits, take the first evergreen topic below that has no finished episode.

## Topic queue (evergreen fallback; take the first one not done; Gartal may reorder)
1. What if every bee disappeared?  ← tonight (2026-11-03 morning)
2. What if the Moon disappeared?
3. Why is the sky dark at night? (Olbers' paradox)
4. What if Earth stopped spinning?
5. Why do we have to sleep?
6. How much is the whole world actually worth?

## Feedback loop
Gartal's comments go into whyverse/FEEDBACK.md (newest first). Every night run reads it FIRST and fixes
those problems in the next episode.

## POSTING (Gartal 2026-11-03: "you're the one who's making the decisions here")
Metricool brand **Whyverse = 7816628** (timezone Asia/Baku in Metricool; we plan in Europe/London):
YouTube UCTWyyqP6HJP64E7fA7QphGg, Instagram whyverse___, TikTok Whyverse. Channel link for captions:
https://www.youtube.com/channel/UCTWyyqP6HJP64E7fA7QphGg
- Media hosting: public raw URLs from the orphan branch `whyverse-media` of GartalY/pul-reels
  (https://raw.githubusercontent.com/GartalY/pul-reels/whyverse-media/<file>). Metricool copies the media into its own
  storage when the post is created, so each run can rebuild the branch as one commit with only its new files and
  force-push it (never touch main's history). Files < 95 MB.
- LONG VIDEO: same day as the night build, 19:00 Europe/London (= 14:00 New York; Gartal's instinct, and it covers
  UK evening + US afternoon). YouTube only, type video, category EDUCATION, madeForKids false,
  isAiGeneratedContent false (stylised animation, not realistic), title ≤ 70 chars with the question, description:
  2-line hook, chapter timestamps (first at 0:00), sources list, IG/TikTok handles. Tags 8–12.
- SHORTS from each episode: 5 cuts, 9:16 (tools/make_shorts.py: blurred background + the 16:9 picture + hook title
  + "Full video on YouTube: Whyverse"; proper re-staged 9:16 versions later if Gartal wants). Each Short is posted
  as THREE separate posts (YouTube type short / Instagram REEL / TikTok), same video, same time. Slots:
  17:00 and 23:00 Europe/London, starting the day after the long video, next free slots first
  (check getScheduledPosts so nothing doubles). Captions: hook line, 1–2 lines of context, "Full video on our
  YouTube channel: Whyverse" (+ channel link on YouTube; "link in bio" on IG/TikTok), 3–5 hashtags.
- 1-MINUTE ANIMATIONS (Gartal 2026-11-03): a standalone ~60 s 9:16 animation every 4 days, on TikTok + Instagram
  Reels + YouTube Shorts (Gartal agreed to Shorts too), 20:00 Europe/London. Own topic (trend if any), own style.
- Log every post (network, time, Metricool id, media URL) in whyverse/posts.json.
- First data check after ~2 weeks: compare slots/topics with Metricool analytics and adjust (say so in NOTES).

## AZERBAIJANI VERSIONS (Gartal 2026-11-03)
- Free Azerbaijani TTS voices (Banu, Babək) tested on the bees opening: Gartal "it is so bad" → never use TTS here.
- Gartal records the Azerbaijani voice himself. Every WEEKEND Claude sends him the Azerbaijani scripts of that
  week's Whyverse episodes (natural, spoken Azerbaijani per RUNBOOK section L; short numbered paragraphs, one
  recording file per paragraph, numbers written as words). He records, sends back; Claude re-times each episode's
  score to his paragraph durations, translates ALL on-screen text/labels/counters to Azerbaijani, renders, and
  posts on bilirdinizmi_az: long video on its YouTube + Azerbaijani Shorts on IG/TikTok/YouTube (burned captions).
- First batch: weekend 7–8 Nov — ep01 bees, ep02, ep03.
