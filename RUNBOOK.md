# @bilirdinizmi_az — daily runbook

Instagram facts page in **Azerbaijani**, run by Claude. Owner: Gartal (gartalyusifov@gmail.com).

## L. Azerbaijani language — TOP PRIORITY (Gartal, 2026-10-18: "sometimes difficult to understand, some words
## are wrong, some sentences don't make sense")
Every text (caption, slide, reel beat, quiz, story, first comment) must read like a Baku native wrote it.
- Write simple, spoken-style Azerbaijani: short sentences (≤ 15 words), one idea per sentence, common
  everyday words. If a simpler word exists, use it ("qoydular", not "yönəltdilər"; "uçdu", not "havalandı").
- Never translate English word by word. Think the sentence in Azerbaijani first. No English words in
  brackets ("(bar-tailed godwit)"); if a species/thing has no common AZ name, describe it ("bir sahil quşu").
- No Türkiye-Turkish words or endings in place of Azerbaijani ones ("çok" → "çox", "-yor" → "-ır/-ir"),
  no Russian calques.
- Check verb cases: "X ilə toqquşmaq" (not "X-a toqquşmaq"), "X-dan istifadə etmək", "X-a baxmaq",
  "qənaət etmək üçün" (not "qənaət üçün"). Check ı/i, ə/e, ö/o, ü/u and q/k spellings.
- Numbers: use a non-breaking space inside numbers on images ("13\u00a0560") so they never split across lines.
- SELF-CHECK before saving the JSON: re-read every text aloud-style, one sentence at a time, and ask
  "would a 20-year-old in Baku say it like this and understand it at once?" If not, rewrite it shorter.
  Log rewrites in the day's JSON under `language_fix` when fixing already-built content.
- If Gartal points out a wrong word, add it to the list below so it never comes back.
  Known fixes: "boşuna getməmək" → "boş yerə getməmək"; "Asiyaya toqquşanda" → "Asiya ilə toqquşanda";
  "peyk izləyicisi taxılmış" → "üzərinə GPS cihazı taxılmış"; "yerlərindən görmək" → "öz otaqlarından görmək".

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

## FORMAT v4 (from 2026-10-26; Gartal approved 2026-10-25 after the weekly review) — OVERRIDES v3 below
5 posts a day = **4 reels + 1 carousel**, and **2 quiz stories** a day. Times unchanged.
- 10:00 — "Tarixdə bu gün" CAROUSEL + 10:00 story (unchanged; the only carousel)
- 13:00 — facts[0] AZ REEL · 16:00 — facts[1] REEL · 21:30 — facts[3] REEL (unchanged)
- **18:30 — TREND REEL.** facts[2] (the evergreen backup) is now written and built as a REEL (`reel_hook` +
  `reel_beats`, same reel rules incl. number-first hook), and the daily trend (section D) is also written as a reel
  and swapped in at 15:23. Why: 19–24 Oct reels median 134 reach vs carousels 22; carousels 0 saves, 1 share.
- **Quiz stories: only 11:00 (recall) + 14:00 (facts[0]),** each with its answer 10 min later. `quizplan.py` does
  this automatically for dates ≥ 2026-10-26. No 17:00 / 19:30 / 22:30 quizzes any more (0 replies on 66 stories).
  On 26 Oct the 17:00–22:40 quiz stories were already scheduled and were set to draft in Metricool (not published).
- Transition: 26 Oct's backup (Moon trees) is still a carousel; if the 15:23 trend swap happens it becomes the trend
  REEL (updateScheduledPost: `instagramData.type: REEL`, mp4 media, `videoCoverMilliseconds: 300`). From 27 Oct the
  backup itself is a reel.
- Gartal pinned the Şollar and "1 gün = 18 saat" reels to the profile (2026-10-25).
- **FOLLOW CTA ON EVERY REEL (Gartal approved 2026-10-25; ~5 000 reached → ~10 follows in a week):**
  every reel's last frame shows a follow pill. `factgen.py reel` now defaults to "Hər gün yeni fakt — izlə!"
  (the old quiz pill is gone); the 13:00 AZ reel keeps `"cta":"Hər gün 13:00-da yeni Bakı faktı — izlə!"`.
  Every non-AZ reel caption ends (before the photo credit/hashtags) with:
  "👉 Hər gün 5 yeni fakt — izlə ki, qaçırmayasan" (the 13:00 reel keeps its Azerbaijan line).
  Starts with the 27 Oct build (26 Oct reels were already rendered). Judge in the 1 Nov / 8 Nov reviews by
  followers gained per 1 000 account reach (baseline 19–24 Oct: ≈ 2).

## Daily volume and times — FORMAT v3 (2026-10-19 → 2026-10-25): 5 posts + 5 quizzes
Feed posts (all automatic):
- 10:00 — "Tarixdə bu gün" CAROUSEL (`history` in the JSON; cover = date + year, 2–3 detail slides, outro)
  + the same-day 10:00 story (section H)
- 13:00 — facts[0]: REEL (3 beats; changed from carousel on 2026-10-18: reels reached ~119 people on
  average vs ~33 for posts in the first days, so discovery goes through reels)   · 16:00 — facts[1]: REEL (3 beats)
- Reel rules (2026-10-18): the first frame is the hook (the surprising claim, big text, no intro); 8–12 s total;
  last beat ends on a question that the first_comment repeats, to pull comments.
  Weekly review 2026-10-18: only ~30% of reel views lasted >3 s (avg watch 3.2–3.7 s) → the hook must be the
  NUMBER or twist itself as huge text ("400 YAŞ", "3 ÜRƏK"), visible from frame 1; aim for the short end (8–9 s).
  Target: >3 s view rate (IGRE28) ≥ 40%.
  Evidence 2026-10-20: "Plutonda 1 il = 248 il" 60% · "2 saat 17 dəqiqə nəfəs almadı" 49% (avg watch 19 s, 4 shares)
  vs "Dənizin ortasında 200 km yol" 14%. Winning hooks = a precise, impossible-sounding NUMBER + who/what it is about.
  Vague place/description hooks lose even on Azerbaijani topics — put the number/claim first.
  BREAKTHROUGH 2026-10-21: "109 İLDİR BAKIYA SU VERİR" (Şollar, Tağıyev) = 972 views, 18 likes, 7 comments within
  ~20 h (≈8× our normal reel) — strangers argued about the history in the comments. Formula: AZERBAIJANI/BAKU history
  or everyday-life topic people personally touch (water, metro, buildings, famous Baku figures like Tağıyev) +
  number-first hook. DECISION: from 2026-10-23 the 13:00 reel (facts[0]) is ALWAYS an Azerbaijan/Baku fact in this
  formula (history, places, records, inventions, people — never current Azerbaijani politics). Fact-check twice:
  locals know these stories and WILL correct us in the comments; prefer facts with 2+ independent sources and
  mention the commonly believed myth if one exists (e.g. "Şollar" is a village, not a person's name).
  EVIDENCE 2026-10-23/24: "1 GÜN = 18 SAAT" (world science) reached 1 386 people / 1 766 views, 39 likes, 9 saves,
  3 shares (Metricool, confirmed in the 2026-10-25 review), while
  the Azerbaijan reel "1965: BAKILI ALİM… «TƏXMİNƏN»" (Lotfi Zadeh, fuzzy logic) stalled at ~165 views / 26 %.
  So the winning ingredient is NOT "Azerbaijan" alone: it is a claim about something the viewer PERSONALLY touches
  (the water they drink, the length of their own day) + a huge/precise number. Abstract ideas (algorithms, theories)
  lose even with a famous Baku name. Keep the daily 13:00 Azerbaijan reel, but choose physical, everyday or
  place-based topics (water, food, buildings, streets, metro, oil, sea, records) — not abstract science.
  WEEKLY REVIEW 2026-10-25 (outlier analysis, reviews/outliers.md) — applies to ALL reels:
  - Every reel hook contains a precise NUMBER. Both 10×-median reels (Şollar 109 il, 1 gün = 18 saat) opened on one;
    both flops and the next-weakest reels had none.
  - NO technology-origin "the first X was really Y" stories as reels (first webcam 21 reach, first computer bug 64,
    bubble wrap 80 = the 3 weakest reels of the week; 2 confirmed flops). Such a story may run only as a carousel, or
    as a reel if it has a huge number in the hook AND links to the viewer's own phone/home.
  - Nature/space record reels are steady (median ~136, range 114–156); AZ everyday/place reels have the upside.
  FOLLOW HOOK (2026-10-22: Şollar reel reached 1 392 views but brought ~1 follower): the 13:00 Azerbaijan reel is a
  SERIES with a reason to follow. Render it with "cta":"Hər gün 13:00-da yeni Bakı faktı — izlə!" (replaces the quiz
  CTA) and end its caption (before hashtags) with: "👉 Hər gün 13:00-da Azərbaycan haqqında bilmədiyin bir fakt —
  izlə ki, qaçırmayasan". Also be precise about WHO paid/did what (Şollar: Tağıyev funded Lindley's survey and
  pushed for Şollar; construction was publicly funded — we overstated it and a commenter corrected us).
  Renderer (factgen.py reel, 2026-10-19): hook is fully visible on frame 0 (no fade-in), beat time = reading time
  (0.3 s/word + 0.6 s, min 2.2 s).
  LANGUAGE RULE (Gartal, 2026-10-19) — overrides any word limit: every beat is 1–2 COMPLETE, NATURAL Azerbaijani
  sentences (~15–22 words), the way a Baku native tells a story to a friend. NEVER compress into telegraphic
  fragments ("Alimlər boş qəhvədana getməmək üçün ona kamera qoydular" was rejected as unreadable).
  Each beat must make sense on its own and follow from the previous one. Approved reference style:
    "1991-ci il, Kembric Universiteti. Alimlər qəhvə üçün başqa mərtəbəyə enirdilər, amma maşın çox vaxt boş olurdu."
    "Ona görə maşının qarşısına kamera qoydular ki, yerlərindən qalxmadan qəhvə olub-olmadığını görsünlər."
  Before scheduling, re-read every beat out loud: if a sentence needs the caption to be understood, rewrite it. Schedule reels with "videoCoverMilliseconds": 300 (hook as cover).
- 18:30 — facts[2]: CAROUSEL = evergreen backup, replaced by the TREND post (section D)
- 21:30 — facts[3]: REEL (3 beats, the most surprising fact of the day)
Quiz stories (automatic, printed options, answer +10 min): 11:00 recall · 14:00 facts[0] · 17:00 facts[1]
· 19:30 facts[2]/trend · 22:30 facts[3]  (quizplan.py picks these slots automatically when there are 4 facts).
A cut to 3 a day was considered on 2026-10-18 and PARKED: story metrics were still incomplete (most reach = 0).
Revisit only once 2+ weeks of complete story data exist.
So the morning task picks FOUR facts (facts[0], [1], [3] as reels, facts[2] carousel/trend) plus the `history` event.
Mix = 3 reels (reach new people) + 2 carousels (saves/shares from followers). Re-check in the weekly review.
Decision 2026-10-18 (Claude as manager, Gartal delegated all format decisions): keep v3 (5 posts: 3 reels +
2 carousels) and ALL posting times unchanged until the 2026-10-25 review — too little data, and Metricool's
best-time tool is still empty. Do not add more reels or a 6th post before then.
Ramp: if the weekly review shows reach per post falling sharply, step back to 4 posts.

## (previous) FORMAT v2 — used 2026-10-17 and 2026-10-18 (from 2026-10-17, Gartal's request 2026-10-16)
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
- Carousel = cover + 3–4 detail slides + outro slide.
  COVER v2 (from 2026-10-20, all carousels incl. "Tarixdə bu gün" and trend): like the reels — the surprising
  claim as a big gold headline at the top (≤ 8 words, natural Azerbaijani), the photo, and ONE short line at the
  bottom (≤ 10 words; for TBG = the date + a detail). Render:
  `factgen.py card <photo> out/D/K_1.jpg '{"hook":"<headline>","sub":"<short line>","cy":..}'`
  (the old title+paragraph cover was unreadable in the profile grid). Longer text goes on slide 2.
  Each detail slide: `h` = a short big headline, ideally a number/date ("3,8 km", "1948", "0 sakin"),
  `t` = ≤ 40 words with a NEW detail (not a repeat). Every detail must be verified like the main fact.
- Reel = hook + 3 beats (each 1–2 complete natural sentences, ~15–22 words, each a new detail; see LANGUAGE RULE) → `reel_beats`.
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

## D. Daily trend post — EVERY day (Gartal, 2026-10-16; re-confirmed 2026-10-18 evening, overriding Claude's
## "only when strong" idea from earlier that evening)
Keep doing a trend post every day. To make it work better (the Tesla and Yamal trend cards had the lowest reach):
FROM 2026-10-26 THE TREND POST IS A REEL (format v4): write `trend` with `reel_hook` (number-first, ≤ 8 words) and
3 `reel_beats` (natural sentences per the LANGUAGE RULE), plus caption, cat, quizzes, sources, photo; no `slides`.
At 15:23 render it with `factgen.py reel <photo> out/D/T_reel.mp4 '{"hook":..,"beats":[..],"seed":<day>,"cy":..}'`
(no photo → `reelgen.py` text reel), check 3–4 frames, push, and update the 18:30 post in Metricool to
`instagramData.type: REEL`, media = the mp4 raw URL, `videoCoverMilliseconds: 300`, same time. There is no 19:30
quiz any more, so no story needs updating. (The carousel steps below are the old v3 flow.)
Pick the story most people in Azerbaijan are talking about, prefer an Azerbaijani/Turkish link when there is one,
and use a strong surprising angle (a number, a "before he was famous", a history twist).
- World political news is a valid trend topic (Gartal, 2026-10-18), e.g. protests or a government crisis in
  France. Tell it NEUTRALLY: (1) what happened — the facts only, (2) the history behind it (has it happened
  before, how the system works), (3) the commonly reported reasons, attributed ("according to Reuters…",
  "critics say… / the government says…") and always giving BOTH/all sides. Never take a side, no opinions,
  no loaded words, no predictions, no mocking or praising anyone, no emoji that judge. Verify with 2+ reliable
  sources. Azerbaijani politics stays off-limits (section T).
At least one post per day is about something people are talking about TODAY, told as a richer story
(3–4+ sentences / 3–4 detail slides). Example of the style: a footballer in the news → "before he was famous,
he worked in a factory" + the details. Slot: the **18:30 carousel**.
- Night before (evening task): fact 2 is built as an evergreen BACKUP for 18:30.
- Weekly review 2026-10-18: both measured trend cards (Tesla, Yamal) were the weakest cards (avg reach 22 vs 38,
  0 shares). When choosing between candidate trends, prefer one with an Azerbaijani/Turkish link or a big
  "everyone is talking about it" story over a niche foreign one.
- 09:10 (morning task): pick TODAY's trend topic: football/sports results and transfers, celebrities' news,
  film/music/game releases, tech launches, space, viral moments, notable "today in history" anniversaries,
  world (non-AZ) politics/elections per section T. Find a surprising, verified angle with 3–4 details,
  write it as `trend` in facts/<today>.json (same fields as a v2 carousel fact: title, text, slides, caption,
  cat, quizzes, sources). Find the photo yourself (section P); ask Gartal (Drive folder <today>, file `T`, deadline 15:00)
  only if nothing usable exists.
- 15:23 (midday task): build the trend carousel (photo `T` or the `none` fallback), push, replace the 18:30
  post in Metricool (`updateScheduledPost`, keep the time), put the backup fact into a later day, then
  replace the 18:30 fact (`facts[1]` in v2, `facts[2]` in v3) with the trend fact in the JSON, re-run `quizplan.py <today>` and update ONLY the
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
  Current political news abroad is also fine (Gartal, 2026-10-18): what happened, its history, and the
  reported reasons from all sides — see section D.
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
   subject that a photo can show. v3 (from 2026-10-19): FOUR facts — facts[0] carousel, facts[1] reel,
   facts[2] REEL from 2026-10-26 (trend backup, v4; was a carousel), facts[3] reel = the most surprising one — plus `history` (section H)
   with title/text/slides/caption/quizzes like a carousel fact. (v2 days had 3 facts.)
2b. **Quality bar (Gartal, 2026-10-15): no widely known trivia** ("sharks older than trees", "honey never
   spoils", "octopus 3 hearts"-level is too common). Prefer specific, surprising facts with a number, a date or a
   twist, that most people have NOT heard. Include an Azerbaijan/Baku or history angle about 2–3 times a week when it is
   genuinely surprising (e.g. Bibiheybət 1846, Nobel & Baku oil) — raised from 1–2 in the 2026-10-18 weekly
   review: history/AZ cards were the only ones with shares (6) and follows (2). Ask: "would someone screenshot this to a friend?"
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
3. Build into `out/YYYY-MM-DD/` (D = date). FORMAT v4 (from 2026-10-26): facts[0], [1], [2], [3] are ALL reels
   (`<n>_reel.mp4`); the only carousel is the 10:00 `history` one; `quizplan.py` makes 2 quizzes (11:00, 14:00).
   The v3 lines below still describe how each piece is rendered:
   - Carousels for facts 1 and 2 (K = 1, 2; N = len(slides) + 2):
     `factgen.py card <photoK> out/D/K_1.jpg '{"hook":..,"sub":..,"cy":..}'` (COVER v2)
     `factgen.py slide <photoK> out/D/K_<i>.jpg '{"i":i,"n":N,"h":..,"t":..,"cy":..}'` for i = 2..N-1
     `factgen.py outro none out/D/K_<N>.jpg '{"i":N,"n":N}'`
   - Reels (v2: fact 3; v3: facts[1] and facts[3]): `factgen.py reel <photo> out/D/<n>_reel.mp4 '{"hook":..,"beats":[..],"seed":<day>,"cy":..}'`
   - v3: the 10:00 "Tarixdə bu gün" carousel from `history` (cover via `card` with title like
     "17 OKTYABR 1956", then `slide`s and `outro`), plus the 10:00 story via `todaystory` (section H).
   - Quiz stories: `python3 quizplan.py D` (renders out/D/q1..qN.jpg with printed options + q1_a..qN_a.jpg answers, writes `stories` into the JSON and
     updates facts/db.json). Safe to re-run.
     No emoji in image text — the font can't draw them.
4. **Check the output** (and the Azerbaijani per section L): open every carousel slide (a contact sheet is fine), all quiz stories and
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

## Weekly (Sunday evening task)
Pull Metricool analytics for Mon–Sun (metric IDs listed at the end of reviews/2026-10-18.md; timestamps come back
in UTC, +4 h for Baku), plus `getBestTimeToPostByNetwork` for the next 7 days. Write reviews/YYYY-MM-DD.md:
followers, per-post table, best/worst, card vs reel, categories, times, story replies, 1–3 changes. Apply only
small data-backed changes here; recommend bigger ones (times, volume, format mix) to Gartal.
- Sunday's own posts are usually not synced yet at review time — count them in the next week's review.
- OUTLIER ANALYSIS (from 2026-10-25): pull ALL posts and reels since launch (2026-10-15), ignore pieces < 72 h old,
  compute the median reach per format (carousels/images vs reels), flag ≥ 2× median = OUTLIER, ≤ 0.5× = FLOP. For each:
  category, hook type of the first line (number · surprise · local AZ · 'you' · on-this-day · news), reel retention
  (IGRE24 avg watch, IGRE28 >3 s) vs the reel median, posting time. Append them to reviews/outliers.md (each piece
  once, in the first review where it is ≥ 72 h old) and update the hook ranking there. Draw a conclusion only when
  ≥ 2 outliers (or flops) share a pattern; otherwise write "not enough data yet". Also report shares per 100 reach
  (is the 📩 line working?). 2026-10-25: 0.26 shares/100 reach — the caption CTA is not producing shares.

## Roadmap (updated 2026-10-25)
- NO PAID PROMOTION (Gartal, 2026-10-25: budget is tight). Don't propose boosts/ads; grow organically only.
- TURKISH PAGE: Gartal left the decision to Claude (2026-10-25). Decision: POSTPONED. Revisit in the weekly
  review of 2026-11-15 and launch only if the AZ page reaches ~150 followers OR ≥ 5 follows per 1 000 reach for
  2 weeks in a row — copying a system that doesn't convert yet would just double the work.
- HEYGEN avatar reels: the free plan gives only ~3 videos a month, so it can't be a regular slot. Use it as a
  one-off test only if Gartal wants: 1–2 avatar reels on a proven topic type (number + everyday/Baku), compared
  with the normal reel the same week. Not scheduled; Gartal would have to record his voice/avatar.
## Roadmap (original, decided 2026-10-16)
- ~2026-10-30 two-week check (weekly review): if the Azerbaijani page is growing, propose launching a
  TURKISH facts page as a 2nd Metricool brand (plan allows 5): same verified facts adapted to Turkish,
  lighter format (posts + reels, no manual poll stickers at first). English (dailyhustlepsych) later.
- Future test (Gartal's idea): HeyGen digital-twin reels in his voice — free-plan test first, label as AI.

## Rules
- DATA BEFORE DECISIONS (Gartal, 2026-10-18): Instagram numbers keep growing for days after a post, and
  Metricool syncs late. Only judge a post once it is ≥ 3 days old. Make no sharp format/volume/time/topic-mix
  change until there are ≥ 2 full weeks of data and ≥ 5 posts in each group being compared; before that,
  write findings as "early signal" and keep watching. Small wording/quality fixes need no data.
- Metricool's story statistics lag by an hour or more (2026-10-16: a story posted at ~14:07 was not visible
  at 14:59). Never conclude "Gartal hasn't posted it" from them; check later or ask.
- Claude is the page manager (Gartal, 2026-10-16; confirmed 2026-10-18 for ALL format decisions: posting times,
  trend posts, quiz stories, number of reels/posts): decide from the data, act, and tell him afterwards —
  don't ask him to decide these. Ask him only for photos, things only he can do in the app, and decisions that cost money.
- Whenever Gartal needs to do something (photos, reconnect, a decision), notify him: SendUserMessage
  plus a push notification (PushNotification tool if available). Put the action in the FIRST line.
- Gartal is awake roughly 09:00–23:59 Baku time. Never send him anything that needs action outside that window.
  Nothing on the page needs his manual action any more (posts and stories are all automatic).
- Accuracy over volume. If not sure a fact is true, don't post it.
- Politics only per section T (never Azerbaijani politics); no religion; nothing about private people; tragedies only per section T.
- Never schedule anything into the past; never delete Gartal's posts.
- If a tool or connection fails, stop and tell Gartal exactly what failed (e.g. "Metricool reconnect needed").

## Checkpoint for the 2026-10-25 weekly review (promised to Gartal 2026-10-19)
Compare reels from 2026-10-19 on (hook-first, natural sentences) with reels before: >3 s view rate (IGRE28),
avg watch time (IGRE24), reach, shares, followers gained. If the >3 s rate is still < 40% AND followers are still
~24–30, do NOT keep the same plan: pick one bigger change (new reel style, trend-driven reels, or propose a small
paid boost test — Gartal's money, so ask him first) and tell him plainly what changed and why.

## Trial reel hook test (from 2026-10-21, decided 2026-10-20) — PAUSED 2026-10-21
PAUSED: the first TRIAL_REEL (2026-10-21 20:00) failed in Metricool: "Trial Reel Not Enough Followers: the instagram
account does not meet the trial reel follower requirement". Do not schedule TRIAL_REELs until the account qualifies
(re-test once followers grow, e.g. at the weekly review). Until then, keep putting the number-first hook on the main reels.
Instagram TRIAL reels are shown only to non-followers and do NOT appear on the profile grid, so they don't count
as a 6th post. Every day: take the 16:00 reel (facts[1]), write a SECOND hook (different angle, same natural-language
rules), render it as `out/D/2_reel_trial.mp4` (same beats, new hook) and schedule it at 20:00 with
`instagramData.type: "TRIAL_REEL"`, same caption, `videoCoverMilliseconds: 300`. Log both hooks in the day JSON
(`hook_test: {main, trial}`). In the daily report compare >3 s view rate (IGRE28) and reach of main vs trial;
in the weekly review list which hook styles win (number-first, question, "you" framing, shock word…) and write the
winning patterns into the reel rules.
