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

## Daily volume and times (ramp-up phase, started 2026-10-16)
Times chosen 2026-10-15 from research: evenings (20:00–24:00) beat daytime, Reels most of all
(Sociality.io 2025–26 study incl. Istanbul-time accounts). Re-check with Metricool/Instagram data after 2 weeks.
- 13:00 — Post 1: fact card (photo 1)   · 14:00 — Poll story 1/3 · 15:00 — Answer story 1/3
- 18:30 — Post 2: fact card (photo 2)   · 19:30 — Poll story 2/3 · 20:30 — Answer story 2/3
- 21:30 — Post 3: fact REEL (photo 3)   · 22:30 — Poll story 3/3 · 23:30 — Answer story 3/3
IMPORTANT: Gartal's Instagram has NO quiz sticker, only Poll (checked 2026-10-15). So: poll stories are
`autoPublish: false` (he adds a Poll sticker with the 3 options), and an ANSWER story is auto-published
1 hour later (`autoPublish: true`) showing the correct answer + one-line explanation.
Fact 3 is always the most surprising one (it becomes the reel).
(After ~2 weeks, if growing: 2 reels + 3 cards, 5 stories. Only change when the data supports it.)

## A. Morning task (09:10) — pick tomorrow's facts
0. If `facts/YYYY-MM-DD.json` for TOMORROW already exists (status `planned`), do NOT pick new facts:
   make sure the Drive subfolder exists, check which photos (1, 2, 3) are already uploaded, and message Gartal
   only the missing photo requests (or "all photos already uploaded"). Then stop.
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
4. For each fact write: subject, photo request (what exactly to photograph/search), card title, card text
   (≤ 30 words, AZ), reel hook (≤ 6 words) and reel fact text (≤ 35 words) for fact 3, caption
   (2–4 short lines + question to followers + 6–8 hashtags incl. #bilirdinizmi #maraqlıfaktlar #faktlar),
   quiz question (≤ 10 words) with 3 options and the correct one, and source URL(s).
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
3. Build into `out/YYYY-MM-DD/` with `factgen.py`:
   - `python3 factgen.py card <photo1> out/D/1_card.jpg '{"title":..,"text":..,"cy":..}'`
   - `python3 factgen.py card <photo2> out/D/2_card.jpg '{...}'`
   - `python3 factgen.py reel <photo3> out/D/3_reel.mp4 '{"hook":..,"fact":..,"seed":<day number>,"cy":..}'`
   - `python3 factgen.py story <photoN> out/D/sN.jpg '{"n":"N/3","q":..}'` for N = 1..3
   - `python3 factgen.py answer <photoN> out/D/aN.jpg '{"n":"N/3","q":..,"a":"<short answer>","why":"<≤ 20 words>"}'`
     for N = 1..3 (no emoji in image text — the font can't draw them)
4. **Check the output**: open both cards, all 3 stories and 2 frames of the reel (ffmpeg -ss 1.2 and -ss 9.8)
   with Read. Fix text overflow, unreadable text or bad crops before scheduling.
5. Commit and push `out/D/` and the JSON.
6. Schedule in Metricool (blogId 7443266, timezone Asia/Baku, media = raw GitHub URL):
   - posts: `autoPublish: true`, `instagramData.type` POST (cards) / REEL (reel), `isAiGenerated: false`
     (real photos with text overlay)
   - poll stories: `autoPublish: false` (Gartal gets a notification and adds a Poll sticker),
     `instagramData.type: STORY`, no text
   - answer stories: `autoPublish: true`, `instagramData.type: STORY`, no text, 1 hour after each poll
   Before scheduling, `getScheduledPosts` for tomorrow so nothing is scheduled twice.
7. Set `"status": "scheduled"` in the JSON, append the 3 subjects to `facts/used.md`, commit, push.
8. Message Gartal a short summary: what posts at which time, any fallback used, and the **poll options**
   table (question · the 3 options to type into the Poll sticker; answers are posted automatically).

## Weekly (Sunday evening task, add when ready)
Pull Metricool analytics for the week; note best reel/card, best posting hours; adjust next week.

## Rules
- Whenever Gartal needs to do something (photos, reconnect, a decision), notify him: SendUserMessage
  plus a push notification (PushNotification tool if available). Put the action in the FIRST line.
- Gartal is awake roughly 09:00–23:59 Baku time. Never schedule anything that needs him (story stickers,
  messages that need action) outside that window.
- Accuracy over volume. If not sure a fact is true, don't post it.
- No politics, religion, tragedies or anything about real private people.
- Never schedule anything into the past; never delete Gartal's posts.
- If a tool or connection fails, stop and tell Gartal exactly what failed (e.g. "Metricool reconnect needed").
