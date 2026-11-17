## GARTAL 2026-11-17 14:42 — TOPICS + HOOKS (both brands; every task that picks a topic or writes a hook reads this first)
"What we create is mostly about space or sports. We should be broader … Top 5 most horrifying executions in history — I watched
the full video. The animation wasn't better than ours, it wasn't even 60 fps. The HOOK was great. Our videos, not a great hook."
1. TOPICS — BROADER. Per brand per week: at most 2 space and at most 2 sports pieces in total (count posts.json / day JSONs).
   If the hottest trend is space/sports again and the quota is used, take the next trend or a countdown (below).
   Rotate across: history (incl. dark history, told non-graphically), mysteries & unexplained, human body & mind, animals,
   money & business, inventions & technology, food, crime & famous cases (facts only, no gore), records & extremes, geography &
   strange places, culture & traditions (AZ: Azerbaijani history, people, places, customs).
2. HOOK FIRST. The animation is not the problem; the hook is. Before writing anything, write 5 hook titles and pick the strongest.
   A strong hook = a NUMBER + a SUPERLATIVE + an EMOTION word, promising a payoff people must stay for:
   "Top 5 most horrifying …", "The 3 strangest …", "4 deadliest …", "Tarixin ən dəhşətli 5 …", "Dünyanın ən qəribə 3 …".
   It is the first spoken sentence AND the big text on frame 0. It must be TRUE — the content must deliver what it promises.
3. COUNTDOWN FORMAT ("Top N"): N = 3–5, count DOWN, save #1 (the most shocking) for the end, one item ≈ 4–6 s, a progress counter
   on screen (5…4…3…2…1). At least 3 countdowns per brand per week (the 18:30 AZ animation and the Whyverse 19:00 Short may
   use a countdown instead of a trend whenever it's the stronger hook; a trend can also be told as a countdown).
4. Dark topics: describe, never show gore; no real victims' images; respectful tone; nothing about living private people.
5. Reports/reviews track hook type per post (countdown vs trend vs single fact) and views/sends per view — report only.

## CORE SETUP — LOCKED (Gartal 2026-11-15 21:40). Reviews never change this.
- 2 posts a day on EACH platform (Instagram, TikTok, YouTube Shorts), BOTH ANIMATED, voice = Kokoro af_heart.
  1st = 19:00 Baku daily animated trend Short. 2nd = 23:00 London: the episode's animated cut Short on the day after an episode,
  otherwise a short ANIMATED fact Short (Motion Reel, voiced). NO static "photo + words" reels on Whyverse any more (replaces the
  QUALITY RESET 23:00 static-fact rule below).
- Long videos: not part of the weekly review or the message to Gartal — don't report on them or raise them.
- Sunday/Wednesday reviews only tune topics, hooks and looks inside this setup.

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
BLUEPRINT STYLE (Gartal loved a blueprint explainer reel, 2026-11-08; see brand/STYLE_REFERENCES.md):
navy grid, white technical line art, yellow tags, digits in boxes, step-by-step worked example. Best for "how does
X actually work?" topics. NEXT 1-minute animation uses it (topic: an everyday thing with a hidden mechanism).
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
  isAiGeneratedContent true (AI voice — see AI LABELS), title ≤ 70 chars with the question, description:
  2-line hook, chapter timestamps (first at 0:00), sources list, IG/TikTok handles. Tags 8–12.
- SHORTS from each episode: 5 cuts, 9:16 (tools/make_shorts.py: blurred background + the 16:9 picture + hook title
  + "Full video on YouTube: Whyverse"; proper re-staged 9:16 versions later if Gartal wants). Each Short is posted
  as THREE separate posts (YouTube type short / Instagram REEL / TikTok), same video, same time. Slots:
  17:00 and 23:00 Europe/London, starting the day after the long video, next free slots first
  (check getScheduledPosts so nothing doubles). Captions: hook line, 1–2 lines of context, "Full video on our
  YouTube channel: Whyverse" (+ channel link on YouTube; "link in bio" on IG/TikTok), 3–5 hashtags.
- DATA RULES (weekly review 2026-11-08): (1) 1-minute animation topic = a "this week" news hook + ONE precise number in the
  first line (Swift "built for 2 years, lasted 22": IG 1 834 views vs 179 median for cuts); evergreen fallback = blueprint
  "how does X actually work?". (2) Short order from each episode: myth-bust / "no X? Y survives" / "you" hook FIRST (Einstein =
  best TikTok 933), places/process cuts later; skip a cut whose first 2 s have no motion and no number (asphalt 43 TikTok).
  (3) Whyverse YouTube Short numbers do not sync to Metricool yet — note YouTube Studio numbers from Gartal in FEEDBACK.md.
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

## DECISION 2026-11-09 (Gartal)
- Long episodes stay at 3 a week (Whyverse = mainly long videos); the weekly review's 3 → 2 idea is rejected.
- YouTube Shorts: only standalone 1-minute animations + ONE hook cut per new episode (day after the episode). Other cuts:
  Instagram + TikTok only (TikTok likes the cuts: Einstein 933). Already-scheduled extra YouTube cuts 9–11 Nov set to draft.

## DAILY TREND SHORT (Gartal 2026-11-09) — replaces the every-4-days 1-minute task
- Every day: scheduled task "Whyverse – daily trend Short" at 15:31 Baku looks for the biggest worldwide moment of
  the last ~48 h with a strong hook ("historic first", "why did this happen", a record, a discovery), animates a
  ~45–60 s vertical Short the same day and publishes it at 19:00 Baku on YouTube Shorts, Instagram and TikTok.
  If there is no good trend, an evergreen surprising fact (blueprint "how does X work?" is a good fallback).
- Long episodes stay at 3 a week (night task).
- POLITICS (Gartal 2026-11-09): neutral, factual historic moments from anywhere are allowed, incl. US elections
  (e.g. first Muslim US senator). Never take sides, praise or attack a party/politician; Azerbaijan only positive/neutral official
  news per RUNBOOK "AZ POLITICS RULE". Tragedies: sober mode (no jokes, no CTA hype).
- Every Short needs a hook in the first 2 s and a reason to watch to the end (a reveal/payoff at the end).
- TOPIC OVERRIDE for 2026-11-09 (Gartal's request): Abdul El-Sayed won Michigan's US Senate seat on 3 Nov 2026 →
  the first Muslim US senator. Son of Egyptian immigrants, former public health official, never held office, lost the
  2018 Michigan governor primary and came back. History beats: Keith Ellison, first Muslim in Congress (sworn in
  2007); Zohran Mamdani, New York City mayor since 1 Jan 2026. Neutral and factual, no party praise/attack. Re-verify.

- CUT SHORTS (2026-11-09): only the 2 strongest cut points per long episode get published (was 5).

- SEARCH (2026-11-09): searchable keywords in the first caption line, on screen in the first 2 s and in the YouTube title; 3–5 specific hashtags only (no #fyp/#viral piles).

- FABLE 5.2 TEST (Gartal 2026-11-10): the night run of Thu 12 Nov 00:23 runs on Claude Fable 5.2 instead of Opus 5.5 (model switched back on 12 Nov 09:31). Say "made with Fable 5.2 (test)" in that episode's NOTES.md and delivery message so Gartal can compare.

- AI LABELS (2026-11-11, promised to Gartal): every Whyverse video has an AI voice, so label it like bilirdinizmi does: Instagram `instagramData.isAiGenerated: true`, TikTok `tiktokData.isAigc: true`, YouTube `isAiGeneratedContent: true` (synthetic narration). Applies to long videos, cut Shorts and daily trend Shorts. Platforms say labels don't reduce reach; being caught unlabeled is the real risk.

- TOOL (2026-11-12): daily trend Shorts are made with the MOTION REEL skill (Gartal liked the 60 fps test). References: prototypes/motionreel_baku (navy kinetic type), prototypes/motionreel_az_newspaper (newspaper/editorial).
- POLITICS SHARE (2026-11-13, E6): 2–3 of the 7 daily trend Shorts per week are neutral 'historic political moment' Shorts (firsts, records, landmark elections/laws anywhere — never Azerbaijani politics, never taking sides). The other days: science/space/culture/records.
- VOICE ON DAILY SHORTS (Gartal 2026-11-12: "I want voice on the animations … the English voice is very good"): every Whyverse Short gets the Kokoro af_heart voice-over (60–90 words, hook in the first line), placed with the Motion Reel voice-over flow (audio/vo.wav, cut points on the beat grid, music ducked under the voice). On-screen text = the key words of what she says, not a transcript.
- TOPIC OVERRIDE for 2026-11-12 (Gartal: "everywhere I see it … great hook"): the Nvidia / Jensen Huang scandal. FACTS ONLY,
  careful wording (real people, ongoing story): Huang admitted this week to being unfaithful to his wife; US intelligence officials
  REPORTEDLY believe the woman was a Chinese spy (an alleged "honeypot" operation — say "reportedly"/"alleged", never as fact);
  Nvidia's board opened an investigation, said it has no reason to believe national security or company secrets were compromised,
  and is meeting to decide whether he stays (WSJ: preparing to remove him; not decided at time of writing — re-check right before
  publishing and use the latest status). Shares fell ~6% on 12 Nov. Huang co-founded Nvidia in 1993 and has led it for 33 years;
  Nvidia's chips power most of the world's AI. Do NOT name or picture the women involved; no gossip, no jokes, no judgement.
  Angle: "Why one man's affair could shake the whole AI industry." Sources: Tom's Hardware 11 Nov, Fortune 11 Nov, CNBC 8/11/12 Nov,
  Axios 8 Nov, France 24 12 Nov. political: false (business/security news).
- TREND FRESHNESS (Gartal 2026-11-12: "make sure it's a new trend, something that happened yesterday or today … we are always away
  from the trends"): daily Shorts must be about something from the last 24–48 h that people are talking about NOW (check Google
  Trends, YouTube trending, X/TikTok trending, top headlines of Reuters/AP/BBC/CNBC). Evergreen only if nothing hot exists, and say so.
  A morning scout (10:41 Baku) writes 3 ranked candidates to whyverse/trends/YYYY-MM-DD.md; the 15:31 run re-checks them (2nd trend
  check of the day) and picks the hottest.
- QUALITY RESET 2026-11-12 (Gartal: quality over quantity; "the long videos … we have to make it 60 FPS"; dream channel = Evrim Ağacı):
  * LONG EPISODES: 2 a week (Tue + Sat nights), 60 fps (FPS = 60 in score.js / render), 1920x1080. Fewer, better: research deeper,
    one strong storyline, Evrim-Ağacı-style open (see EVRIM AĞACI LESSONS). If a 60 fps render can't finish in time, finish at 60 fps
    the next night rather than drop to 30.
  * ONE cut Short per episode (Gartal 14:55: "at least one so people can come to the channel"): the single strongest moment,
    own hook in the first 2 s, burned-in captions, real payoff, end line "Full video on our YouTube".
  * TWO posts a day on EACH platform (Instagram, TikTok, YouTube Shorts):
    - 19:00 Baku = the daily animated trend Short (voiced, 60 fps) — make it great.
    - 23:00 London = second post: on the day after an episode, its cut Short; on all other days a STATIC "photo + words" fact
      reel in English (Whyverse colours, one surprising evergreen or trending fact, 10–15 s, safe-zone text), built by the
      10:41 scout task. Never the same topic as the day's trend Short.
    - Long episodes additionally on YouTube (19:00 London, Tue + Sat nights' episodes).
  * PLATFORM FREEDOM: Claude may change the mix per platform at Sunday/Wednesday decision points; keep ≥ 2 posts/day/platform.
  * EVRIM AĞACI LESSONS (apply to every long video): open INSIDE the question, not with "today we'll talk about" — a paradox,
    a myth everyone believes, or a concrete scene in the first 10 s; promise the payoff ("by the end you'll know why…") and pay it
    off at the end; one big question split into smaller questions, each answered with a reveal that raises the next question;
    real sources shown on screen, myths corrected openly; human warmth (a narrator with opinions about the wonder, jokes allowed);
    no filler intros/outros, CTA only at the end.
- STYLE LESSONS from Gartal's reference reel 2026-11-12 (sofianedevs "9 GitHub repos…", watched it twice): apply to ALL Shorts/reels
  of both brands where it fits:
  1. PROGRESS COUNTER on screen the whole time (e.g. a little machine/grid "0/5 → 5/5" in a corner) — gives a reason to stay to the end.
  2. LOOP: the last line flows back into the first ("…each one." → "9 GitHub repos…"), so the video replays itself.
  3. WORD-BY-WORD captions timed to the voice, top of frame, key word in the accent colour (yellow on cream / coral on navy).
  4. One persistent world: same paper background, flat illustrated objects with thick outlines, a recurring mascot reacting
     in a corner; a new object/action every ~1 s (springs, pops, slides), never a still frame.
  5. List format works: "5 things…", "3 reasons…" with the counter. Honest hooks only — no "serious income"-type promises.
- REAL PEOPLE ON SCREEN (Gartal 2026-11-12 20:18, after the Nvidia Short had no figure: "something like El-Sayed for the CEO"):
  when a story is about a public figure, SHOW them as a flat illustrated character like El-Sayed v2
  (whyverse/shorts/2026-11-09_first-muslim-senator, FACES in shots.js): simple face, hair, signature clothing cue
  (e.g. Jensen Huang = grey hair, black leather jacket), name plate, gentle blink/gestures — never a caricature, never mocking,
  never a photo. Private individuals (e.g. the women in the Huang story) are never drawn or named.
- FOLLOW-UP RULE: if a story we covered gets its big next step (e.g. Nvidia's board announces Huang's fate), the next daily
  Short may be the follow-up ("Update: …"), with the illustrated character, linking back to the first Short.
- PEOPLE = SILHOUETTES (Gartal 2026-11-12 23:02, replaces REAL PEOPLE ON SCREEN faces): public figures appear as dark silhouettes with a
  recognisable outline (hair shape, signature clothing), no facial features, name plate. AI-illustrated scenes were rejected — keep
  code-drawn animation.

## VOICED ANIMATION FRAMEWORK (Gartal 2026-11-15 10:33 — overrides STEADY PERIOD "no new voices" for this one change)
The AZ football reel (reels/2026-11-14_1830/, Liechtenstein 0-1 Azerbaijan) is the model: "voice of Arif, a good fast-moving
animation. This is a great combination. I want same for the English brand also." Every day, each brand has AT LEAST ONE such
animation on EACH platform (IG, TikTok, YouTube):
- bilirdinizmi: 18:30 Baku, voice Arif (ElevenLabs ZQJv3hwvRAIC7fvWZ1Qr).
- Whyverse: 19:00 Baku trend Short, voice = Kokoro af_heart as always (Gartal 10:36: "for the English brand we don't need
  11 Labs … our English brand stays the same voice"). ElevenLabs is ONLY for the Azerbaijani brand (Arif, 14:47 task).
  Whyverse takes the ANIMATION recipe from the football reel, not the voice.
- Recipe: big NUMBER on frame 0; one persistent world with a running counter/scoreboard; a new action every ~1 s; word-by-word
  captions timed to the real voice, key word in the accent colour; a flashback/comparison that gives the number scale;
  twist/payoff; spoken + on-screen CTA; 60 fps; soft SFX only; silhouettes for people; CONTEXT CHECK before writing.
- The second daily post per platform stays whatever works best (static photo + words, trial reels on IG); free choice.
- Free plan: "Səs: elevenlabs.io" in bilirdinizmi captions when Arif speaks.

## NEW LOOKS FOR THE ROTATION (Gartal 2026-11-15 20:51, from a david_knowsai reel "6 Claude skills that animate anything")
Code-drawn with Motion Reel, no new tools. Use when the topic fits:
- MAP ROUTE: animated line travelling over a simple top-down map (routes, distances, pipelines, trade roads, "how far").
- EXPLODED VIEW: an object separating into labelled layers ("what's inside"). Only objects that stay instantly recognisable.
- GROWING GRAPH: bars/line growing with a running number (any number that changes over time).
- INK SILHOUETTE: black ink figures/objects against a warm sky or paper gradient (fits rule 1g — people as silhouettes).
- LINE ART: thin single-weight lines drawing themselves on, one accent colour.
- VINTAGE COMIC: halftone dots, bold outlines, panel frames, a few speech-bubble numbers.
- PAPER CUTOUT: layered torn-paper shapes with soft shadows, slight parallax.
(from an ohneis652 reel "10 Claude animation styles", Gartal 2026-11-15 21:00; pixel/8-bit/16-bit stay banned; soft 3D / low poly
 only as a later Whyverse test — heavy to render on the 2-CPU box.)

## SENDS RULE (Gartal 2026-11-15 21:11, from a vizyonajansi reel: Mosseri — DM "sends" are the strongest signal for reaching
## NON-followers; that reel itself had 1,819 sends vs 1,033 likes)
1. Topic test before writing: "who would a viewer send this to?" (a friend from that city, a football fan, the friend who
   always argues about X). If nobody — weaker topic.
2. Every animated reel's END CARD shows, under the spoken CTA, ONE on-screen line naming a specific friend:
   AZ: "📩 …-a/ə göndər" (e.g. "📩 Ronaldonu sevən dostuna göndər"); EN: "📩 Send this to the friend who …".
   Never a generic "share this". The SPOKEN CTA stays exactly as rule 1f ("Bəyən və izlə…" / "Like and follow Whyverse…").
3. Captions keep their specific 📩 line (already the rule for bilirdinizmi; now Whyverse too).
4. Reports: track sends (shares) per post where Metricool gives them; sends per view is the main quality number.

## SUNDAY DECISIONS 2026-11-15 (weekly review, Claude as manager — reviews/2026-11-15.md)
- TREND TOPIC RANKING (E9, 16 → 29 Nov): the 10:41 scout and the 15:31 run rank candidates in this order:
  (1) a NAMED person / company / country in the day's top headlines with one big number (senator IG 1 699; Nvidia board TikTok 1 389;
  ASTRA YouTube 1 002; Swift IG 1 837); (2) a "historic first / record" anywhere; (3) only then data/report stories (studies, budgets,
  indexes) — the emissions-budget Short got IG 142 / TikTok 157 (0.32× TikTok median). Write the rank reason in the trends file.
- FOLLOW-UPS: only when the update is itself a top headline of the day (Nvidia "after Huang" 198 TikTok vs the original 1 389).
  Otherwise pick a new story.
- CUT SHORT PICK: the episode cut must open on a "you" number (ep05 "26 years of your life asleep" TikTok 1 317 vs ep04 chalk cuts
  184 / 355, ep03 cuts IG 24–177). If no "you" number exists in the episode, use its biggest single number in the first 2 s.

- YOUTUBE DESCRIPTIONS (2026-11-17, ep08): never put "<" or ">" in a YouTube title/description — YouTube rejects the upload ("invalid video description"). Write "under"/"over" instead.
