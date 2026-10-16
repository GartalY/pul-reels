# @bilirdinizmi_az — daily runbook

Instagram facts page in **Azerbaijani**, run by Claude. Owner: Gartal (gartalyusifov@gmail.com).

## Fixed IDs
- Metricool brand / blogId: **7443266** (Instagram `bilirdinizmi_az`, timezone Asia/Baku)
- GitHub repo: **GartalY/pul-reels** (public; media served from
  `https://raw.githubusercontent.com/GartalY/pul-reels/main/<path>`)
- Google Drive photo folder: **"Bilirdinizmi - Şəkillər"**, id `1IWpjrwR5xiL5GKJAQpIE1nKLT511z_7a`
  — one subfolder per post day, named `YYYY-MM-DD`, photos named `1`, `2`, `3` (any extension)

## Setup in a fresh session
1. `add_repo` GartalY/pul-reels with push access; clone to /home/claude/pul-reels.
2. Load Metricool tools (`ToolSearch "+Metricool"`) and Google Drive tools (`ToolSearch "+Google_Drive"`).
3. Commit with `git -c user.email=noreply@anthropic.com -c user.name=Claude` and push to `main`.

## Daily volume and times — FORMAT v2 (from 2026-10-17, Gartal's request 2026-10-16)
3 posts + 5 quiz stories a day. No separate answer stories any more.
- 13:00 — Post 1: CAROUSEL (photo 1)      · 18:30 — Post 2: CAROUSEL (photo 2)
- 21:30 — Post 3: REEL with 3 beats (photo 3, the most surprising fact)
- Quiz stories (all `autoPublish: false`, Gartal adds a Poll sticker with the 3 options):
  11:00 recall (random older fact from facts/db.json) · 14:00 post 1 · 16:30 recall · 19:30 post 2 · 22:30 post 3
- Each quiz is ONE Metricool story post with TWO images in `media`: [qN.jpg, qN_a.jpg] — the question
  (Gartal adds the Poll sticker) and the answer card right after it, so viewers tap once to see the answer.
  Both come in the same notification (verified 2026-10-16 that Metricool accepts 2 media in a STORY).
- Gartal's Instagram has NO quiz sticker, only Poll (checked 2026-10-15).
Why: Gartal said one-sentence facts were too thin and the quizzes too easy (photo gave the answer away).

### Caption rules (Gartal, 2026-10-16)
- Structure: hook line (with 1 emoji) · 2–4 sentences of extra story · a SHARE line · max 5 hashtags.
- SHARE line (always, its own line, starts with 📩): a playful, specific "send it to the friend who…" tied
  to THIS fact, e.g. Alexander → "20 yaşında hələ nə edəcəyini bilməyən dostuna göndər". Never generic
  ("dostlarınla paylaş"). Shares/DMs push reach the most, so this line matters more than hashtags.
- Hashtags: Instagram allows max 5 (since Dec 2025). Use exactly 5: #bilirdinizmi #maraqlıfaktlar
  + 3 specific ones in Azerbaijani for the topic/place/person (e.g. #paris #tarix #futbol). No English
  filler tags (#facts #didyouknow), no banned/spammy tags. The weekly review checks which tags bring reach.
- First comment: every post gets `firstCommentText` = one easy question that invites replies
  ("Sən 20 yaşında nə edirdin? 👇"). It posts automatically with the post.

### Content rules v2
- Carousel = cover (photo + title + 1–2 sentence hook, "Sürüşdür →") + 3–4 detail slides + outro slide.
  Each detail slide: `h` = a short big headline, ideally a number/date ("3,8 km", "1948", "0 sakin"),
  `t` = ≤ 40 words with a NEW detail (not a repeat). Every detail must be verified like the main fact.
- Reel = hook + 3 beats (each ≤ 30 words, each a new detail) → `reel_beats`.
- Quizzes: 2–3 questions per fact in `quizzes` (q ≤ 12 words, 3 plausible options of the same type,
  exactly one correct). Ask about a DETAIL from the slides/beats (a number, date, name, cause), never
  something the photo or the title gives away. Avoid yes/no and avoid joke options.
- Quiz stories never use the post photo (branded background by category: Tarix, Təbiət, Kosmos, Elm,
  Coğrafiya, Texnologiya, Azərbaycan) → set `cat` on every fact.

## D. Daily trend post (EVERY day from 2026-10-17 — Gartal, 2026-10-16; on 2026-10-16 itself do nothing)
At least one post per day is about something people are talking about TODAY, told as a richer story
(3–4+ sentences / 3–4 detail slides). Example of the style: a footballer in the news → "before he was famous,
he worked in a factory" + the details. Slot: the **18:30 carousel**.
- Night before (evening task): fact 2 is built as an evergreen BACKUP for 18:30.
- 09:10 (morning task): pick TODAY's trend topic: football/sports results and transfers, celebrities' news,
  film/music/game releases, tech launches, space, viral moments, notable "today in history" anniversaries,
  world (non-AZ) politics/elections per section T. Find a surprising, verified angle with 3–4 details,
  write it as `trend` in facts/<today>.json (same fields as a v2 carousel fact: title, text, slides, caption,
  cat, quizzes, sources). Ask Gartal for a photo in the 2026-…/<today> Drive folder named `T`,
  deadline 15:00 (action in the first line of the message).
- 15:23 (midday task): build the trend carousel (photo `T` or the `none` fallback), push, replace the 18:30
  post in Metricool (`updateScheduledPost`, keep the time), put the backup fact into a later day, then
  replace `facts[1]` with the trend fact in the JSON, re-run `quizplan.py <today>` and update ONLY the
  19:30 quiz story in Metricool (earlier ones may already be live).
- If the trend story breaks after 15:23, it can still go into tomorrow's 13:00 slot.

## T. Trend check (in every morning, midday and evening run)
Goal: keep up with the real world. Before doing the main task, search the news (WebSearch: "news today",
"Azerbaijan news today", "Xəbərlər bu gün", world events, viral/trending topics, big sports/space/science news).
- If something big is happening that a large share of our Azerbaijani audience is talking about TODAY, replace
  one not-yet-published post of today (prefer the 21:30 reel, else the 18:30 card) with a verified fact that
  connects to it. Update it in Metricool with `updateScheduledPost` (keep the time), and the quiz story about it (re-render its question; keep the previous-answer chain correct).
- Photos: ask Gartal for a related photo (notify him, action in first line, with a deadline ~2 h before posting).
  If no photo arrives in time, use a photo-free design: `reelgen.py` text/chart reel, or `factgen.py` with `none`.
- Tragedies (earthquakes, crashes, wars, attacks, deaths): respectful, useful angle only — how/why it happens,
  safety tips, science, or Azerbaijan's own history (e.g. Shamakhi 1902 earthquake). NO "worst ever" lists or
  death-toll rankings on the day, no victim/damage photos, no jokes, no emoji in the caption. If unsure, skip.
- Politics and elections OUTSIDE Azerbaijan are allowed (Gartal, 2026-10-15), but strictly neutral and factual:
  how the system works, history, records, numbers (e.g. "how the US Electoral College works", "the shortest
  term in office"). No opinions, no praising or mocking candidates/parties, no predictions.
- NEVER anything about Azerbaijan's politics, elections, government or its conflicts/relations with other
  countries. Also skip religion. Wars elsewhere follow the tragedy rules above.
- Log every swap in facts/<date>.json ("trend_swap": what, why) and put the replaced fact back into a later day.

## A. Morning task (09:10) — pick tomorrow's facts
0. If `facts/YYYY-MM-DD.json` for TOMORROW already exists (status `planned`), do NOT pick new facts:
   make sure the Drive subfolder exists, check which photos (1, 2, 3) are already uploaded, and message Gartal
   only the missing photo requests (or "all photos already uploaded"). If that file has no `"format": "v2"`,
   first UPGRADE it: add `cat`, `slides` (cards) / `reel_beats` (reel) and `quizzes` per the content rules
   v2, verifying every new detail; set `"format": "v2"`. Then stop.
1. Read `facts/used.md` so no topic repeats.
2. Pick 3 facts for TOMORROW: mix categories (history, animals/nature, space, science, human body,
   geography/places, inventions, famous people, Azerbaijan when good). Each must have a clear, iconic
   subject that a photo can show. Fact 3 must be the most surprising one (it becomes the 21:30 reel).
2b. **Quality bar (Gartal, 2026-10-15): no widely known trivia** ("sharks older than trees", "honey never
   spoils", "octopus 3 hearts"-level is too common). Prefer specific, surprising facts with a number, a date or a
   twist, that most people have NOT heard. Include an Azerbaijan/Baku angle about 1–2 times a week when it is
   genuinely surprising (e.g. Bibiheybət 1846, Nobel & Baku oil). Ask: "would someone screenshot this to a friend?"
3. **Verify every fact with WebSearch** (at least one reliable source: encyclopedia, museum, university,
   NASA/NatGeo, official site). Use conservative wording ("up to", "about"). Drop anything disputed or
   myth-like (e.g. "we use 10% of our brain", "Great Wall visible from space").
4. For each fact write (v2): subject, `cat`, photo request, title, cover text (≤ 30 words, AZ), `slides`
   (facts 1–2) or `reel_hook` + `reel_beats` (fact 3), caption (per the caption rules: hook, 2–4 sentences, 📩 share line, 5 hashtags) + `first_comment` (one question) — legacy text: (3–5 full sentences of extra story + question to followers +
   6–8 hashtags incl. #bilirdinizmi #maraqlıfaktlar #faktlar), `quizzes` (2–3), and source URL(s).
   Set `"format": "v2"`.
5. Save as `facts/YYYY-MM-DD.json` (date = tomorrow), commit, push.
6. Create Drive subfolder `YYYY-MM-DD` inside the photo folder.
7. Message Gartal (this is what he reads on his phone — keep it short, Azerbaijani or English is fine):
   "Sabahın şəkilləri (YYYY-MM-DD qovluğuna 1, 2, 3 adı ilə yüklə): 1) … 2) … 3) …" plus one line
   suggesting Wikimedia Commons / Unsplash / Pexels for copyright-safe photos.

## B. Evening task (20:45) — build and schedule tomorrow
0. If `facts/YYYY-MM-DD.json` for TOMORROW has `"status": "scheduled"`, do nothing else: confirm with
   `getScheduledPosts` that the posts exist and report "already scheduled" to Gartal.
1. Load `facts/YYYY-MM-DD.json` for TOMORROW. If missing, do step A first.
2. List the Drive subfolder; download photos 1, 2, 3 (`download_file_content` saves big results to a file —
   decode the base64 `content` with python into `photos/`). Look at each photo (Read) to confirm it
   matches the fact and choose a sensible crop (`cy`). If a photo is missing or wrong, use `none`
   (branded fallback) and say so in the summary.
3. Build into `out/YYYY-MM-DD/` (D = date):
   - Carousels for facts 1 and 2 (K = 1, 2; N = len(slides) + 2):
     `factgen.py card <photoK> out/D/K_1.jpg '{"title":..,"text":..,"cy":..,"swipe":true}'`
     `factgen.py slide <photoK> out/D/K_<i>.jpg '{"i":i,"n":N,"h":..,"t":..,"cy":..}'` for i = 2..N-1
     `factgen.py outro none out/D/K_<N>.jpg '{"i":N,"n":N}'`
   - Reel for fact 3: `factgen.py reel <photo3> out/D/3_reel.mp4 '{"hook":..,"beats":[..],"seed":<day>,"cy":..}'`
   - Quiz stories: `python3 quizplan.py D` (renders out/D/q1..q5.jpg, writes `stories` into the JSON and
     updates facts/db.json). Safe to re-run.
     No emoji in image text — the font can't draw them.
4. **Check the output**: open every carousel slide (a contact sheet is fine), all 5 quiz stories and
   3–4 frames of the reel with Read. Fix text overflow, unreadable text or bad crops before scheduling.
5. Commit and push `out/D/`, `facts/D.json` and `facts/db.json`.
6. Schedule in Metricool (blogId 7443266, timezone Asia/Baku, media = raw GitHub URLs):
   - carousels: ONE post with all slide URLs in order in `media`, `instagramData.type: POST`,
     `autoPublish: true`, `isAiGenerated: false`, `firstCommentText` = the fact's `first_comment`
   - reel: `instagramData.type: REEL`, `autoPublish: true`
   - quiz stories: `instagramData.type: STORY`, `autoPublish: false`, no text, at the times in `stories`,
     `media` = [question image URL, answer image URL]
   Before scheduling, `getScheduledPosts` for tomorrow AND check `metricool` in the JSON — skip any slot
   that is already scheduled, so nothing is scheduled twice. Record every new post ID under `metricool`.
7. Set `"status": "scheduled"` in the JSON, append the 3 subjects to `facts/used.md`, commit, push.
8. Message Gartal a short summary: what posts at which time, any fallback used, and the **poll table**
   for the 5 stories (time · the 3 options to type into the Poll sticker). Answers appear automatically
   on the next story.

## Weekly (Sunday evening task, add when ready)
Pull Metricool analytics for the week; note best reel/card, best posting hours; adjust next week.

## Rules
- Claude is the page manager (Gartal, 2026-10-16): decide what is best for the page, act, and tell him
  afterwards. Ask him only for photos, things only he can do in the app, and decisions that cost money.
- Whenever Gartal needs to do something (photos, reconnect, a decision), notify him: SendUserMessage
  plus a push notification (PushNotification tool if available). Put the action in the FIRST line.
- Gartal is awake roughly 09:00–23:59 Baku time. Never schedule anything that needs him (story stickers,
  messages that need action) outside that window.
- Accuracy over volume. If not sure a fact is true, don't post it.
- Politics only per section T (never Azerbaijani politics); no religion; nothing about private people; tragedies only per section T.
- Never schedule anything into the past; never delete Gartal's posts.
- If a tool or connection fails, stop and tell Gartal exactly what failed (e.g. "Metricool reconnect needed").
