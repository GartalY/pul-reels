# @bilirdinizmi_az — daily runbook

Instagram facts page in **Azerbaijani**, run by Claude. Owner: Gartal (gartalyusifov@gmail.com).

## Fixed IDs
- Metricool brand / blogId: **7443266** (Instagram `bilirdinizmi_az`, timezone Asia/Baku). Plan: Starter 5 (€20/mo,
  unlimited publishing) since 2026-10-16, renews monthly on the 16th.
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
- Quiz stories — FULLY AUTOMATIC since 2026-10-17 (Gartal, 2026-10-16: "I'm not posting stories any more"):
  the question image has the options printed (A/B/C, no poll sticker), `autoPublish: true`; the ANSWER
  story is a separate auto post exactly 10 minutes later. At least 5 quizzes a day:
  11:00 recall (random older fact from facts/db.json) · 14:00 post 1 · 16:30 recall · 19:30 post 2 · 22:30 post 3
  (+ answers at 11:10, 14:10, 16:40, 19:40, 22:40). Gartal does nothing for stories.
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

## H. "Tarixdə bu gün" (on this day) — daily story at 10:00 (decided 2026-10-16, Gartal's idea)
- One story every morning at 10:00 (`autoPublish: true`): something surprising that happened on this calendar
  date in history. Built in the evening task for tomorrow:
  `factgen.py todaystory <photo> out/D/tbg.jpg '{"day":..,"month":..,"year":..,"title":..,"text":..,"credit":..}'`
  (title ≤ 8 words, text ≤ 45 words, verified with WebSearch, photo per section P; no photos of victims).
- Pick events people will find surprising (science, sport incl. chess, inventions, discoveries, records,
  famous "firsts", Azerbaijan cultural/science history). Avoid tragedies/disasters/deaths, wars, religion and
  Azerbaijani politics. No alcohol-centred stories.
- Log it in `facts/history_log.json` under "MM-DD". Next year on the same date choose a DIFFERENT event.
- On a round anniversary (25, 50, 75, 100, 150, 200… years) of a big event, ALSO make it the 13:00 carousel
  that day (the planned fact moves to a later day).

## D. Daily trend post (EVERY day from 2026-10-17 — Gartal, 2026-10-16; on 2026-10-16 itself do nothing)
At least one post per day is about something people are talking about TODAY, told as a richer story
(3–4+ sentences / 3–4 detail slides). Example of the style: a footballer in the news → "before he was famous,
he worked in a factory" + the details. Slot: the **18:30 carousel**.
- Night before (evening task): fact 2 is built as an evergreen BACKUP for 18:30.
- 09:10 (morning task): pick TODAY's trend topic: football/sports results and transfers, celebrities' news,
  film/music/game releases, tech launches, space, viral moments, notable "today in history" anniversaries,
  world (non-AZ) politics/elections per section T. Find a surprising, verified angle with 3–4 details,
  write it as `trend` in facts/<today>.json (same fields as a v2 carousel fact: title, text, slides, caption,
  cat, quizzes, sources). Find the photo yourself (section P); ask Gartal (Drive folder <today>, file `T`, deadline 15:00)
  only if nothing usable exists.
- 15:23 (midday task): build the trend carousel (photo `T` or the `none` fallback), push, replace the 18:30
  post in Metricool (`updateScheduledPost`, keep the time), put the backup fact into a later day, then
  replace `facts[1]` with the trend fact in the JSON, re-run `quizplan.py <today>` and update ONLY the
  19:30 quiz story AND its 19:40 answer story in Metricool (earlier ones may already be live).
- If the trend story breaks after 15:23, it can still go into tomorrow's 13:00 slot.

## P. Photos — Claude finds them himself (from 2026-10-16; Gartal only as a last resort)
Order of sources:
1. **Unsplash** connector (`search_photos`, short query). Results can be MISLABELED (an "Everest" search
   returned Mount Cook) — use only photos whose description/alt text names the subject AND that look right
   when you open them. Prefer portrait or large images.
2. **Wikimedia Commons** for history, animals, places, satellite/NASA/NOAA images (public domain or CC BY/
   CC BY-SA). The workspace can't reach Commons directly: queue the API search through the fetch job, e.g.
   `search_x.json https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url|size|extmetadata&gsrsearch=<terms>`
   then pick a file (check license + size ≥ ~900 px) and queue its `url`.
3. Gartal's Drive folder (only if 1–2 have nothing usable; ask with a deadline).
4. `none` branded fallback.
**Fetch job:** the workspace can't download from images.unsplash.com or upload.wikimedia.org. Append lines
`<name> <url>` to `fetch/queue.txt`, commit, push; GitHub Actions (`.github/workflows/fetch.yml`) downloads
them into `fetch/img/<name>` within ~1 min; then `git pull origin main`. Name photos `<date>_<n>_<subject>.jpg`.
Record in the fact: `"photo": {"path":..,"credit":..,"cy":..,"full":true/false}`, and add a credit line
`Foto: <author> / Unsplash` or `Foto: NASA` etc. above the hashtags (required for CC BY/BY-SA, polite always).
Look at every photo with Read before using it. No photos of private people; no copyrighted press photos.

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
   find any missing photos yourself (section P) and record `photo` on each fact; ask Gartal only for what you
   truly can't find. If that file has no `"format": "v2"`,
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
6. Find all photos yourself (section P), fetch them, look at them, record `photo` on each fact. Create the
   Drive subfolder `YYYY-MM-DD` only if you need Gartal for a photo.
7. Message Gartal only if he must do something (a photo you couldn't find). Otherwise one line:
   "Sabahın 3 faktı hazırdır: …" — no action needed.

## B. Evening task (20:45) — build and schedule tomorrow
0. If `facts/YYYY-MM-DD.json` for TOMORROW has `"status": "scheduled"`, do nothing else: confirm with
   `getScheduledPosts` that the posts exist and report "already scheduled" to Gartal.
1. Load `facts/YYYY-MM-DD.json` for TOMORROW. If missing, do step A first.
2. Photos: use each fact's `photo.path` if set (fetched in the morning, section P). Otherwise find one now
   (section P). Gartal's Drive subfolder overrides when he uploaded 1/2/3 there (`download_file_content`
   saves big results to a file — decode the base64 `content` with python into `photos/`). Look at each photo (Read) to confirm it
   matches the fact and choose a sensible crop (`cy`). If a photo is missing or wrong, use `none`
   (branded fallback) and say so in the summary.
3. Build into `out/YYYY-MM-DD/` (D = date):
   - Carousels for facts 1 and 2 (K = 1, 2; N = len(slides) + 2):
     `factgen.py card <photoK> out/D/K_1.jpg '{"title":..,"text":..,"cy":..,"swipe":true}'`
     `factgen.py slide <photoK> out/D/K_<i>.jpg '{"i":i,"n":N,"h":..,"t":..,"cy":..}'` for i = 2..N-1
     `factgen.py outro none out/D/K_<N>.jpg '{"i":N,"n":N}'`
   - Reel for fact 3: `factgen.py reel <photo3> out/D/3_reel.mp4 '{"hook":..,"beats":[..],"seed":<day>,"cy":..}'`
   - Quiz stories: `python3 quizplan.py D` (renders out/D/q1..q5.jpg with printed options + q1_a..q5_a.jpg answers, writes `stories` into the JSON and
     updates facts/db.json). Safe to re-run.
     No emoji in image text — the font can't draw them.
4. **Check the output**: open every carousel slide (a contact sheet is fine), all 5 quiz stories and
   3–4 frames of the reel with Read. Fix text overflow, unreadable text or bad crops before scheduling.
5. Commit and push `out/D/`, `facts/D.json` and `facts/db.json`.
6. Schedule in Metricool (blogId 7443266, timezone Asia/Baku, media = raw GitHub URLs):
   - carousels: ONE post with all slide URLs in order in `media`, `instagramData.type: POST`,
     `autoPublish: true`, `isAiGenerated: false`, `firstCommentText` = the fact's `first_comment`
   - reel: `instagramData.type: REEL`, `autoPublish: true`
   - quiz stories: `instagramData.type: STORY`, `autoPublish: true`, no text, `media` = [qN.jpg] at the time
     in `stories`; answer stories: same but `media` = [qN_a.jpg] at time + 10 min
   Order: carousels and reel FIRST, then quiz stories (posts matter more if a limit is hit).
   If Metricool refuses because of a plan/post limit, do NOT retry in a loop: list every unscheduled item
   under `pending_schedule` in the JSON (type, time, media URLs, text, first comment) and tell Gartal in the
   first line: "Metricool limit reached — upgrade to Starter; N posts are waiting". Every later run
   (09:10, 15:23, 20:45) first retries `pending_schedule` for today/tomorrow and clears what succeeds
   (skip items whose time has passed).
   Before scheduling, `getScheduledPosts` for tomorrow AND check `metricool` in the JSON — skip any slot
   that is already scheduled, so nothing is scheduled twice. Record every new post ID under `metricool`.
7. Set `"status": "scheduled"` in the JSON, append the 3 subjects to `facts/used.md`, commit, push.
8. Message Gartal a short summary: what posts at which time and any fallback used. No action needed from
   him for stories.

## Weekly (Sunday evening task, add when ready)
Pull Metricool analytics for the week; note best reel/card, best posting hours; adjust next week.

## Roadmap (decided 2026-10-16)
- ~2026-10-30 two-week check (weekly review): if the Azerbaijani page is growing, propose launching a
  TURKISH facts page as a 2nd Metricool brand (plan allows 5): same verified facts adapted to Turkish,
  lighter format (posts + reels, no manual poll stickers at first). English (dailyhustlepsych) later.
- Future test (Gartal's idea): HeyGen digital-twin reels in his voice — free-plan test first, label as AI.

## Rules
- Metricool's story statistics lag by an hour or more (2026-10-16: a story posted at ~14:07 was not visible
  at 14:59). Never conclude "Gartal hasn't posted it" from them; check later or ask.
- Claude is the page manager (Gartal, 2026-10-16): decide what is best for the page, act, and tell him
  afterwards. Ask him only for photos, things only he can do in the app, and decisions that cost money.
- Whenever Gartal needs to do something (photos, reconnect, a decision), notify him: SendUserMessage
  plus a push notification (PushNotification tool if available). Put the action in the FIRST line.
- Gartal is awake roughly 09:00–23:59 Baku time. Never send him anything that needs action outside that window.
  Nothing on the page needs his manual action any more (posts and stories are all automatic).
- Accuracy over volume. If not sure a fact is true, don't post it.
- Politics only per section T (never Azerbaijani politics); no religion; nothing about private people; tragedies only per section T.
- Never schedule anything into the past; never delete Gartal's posts.
- If a tool or connection fails, stop and tell Gartal exactly what failed (e.g. "Metricool reconnect needed").
