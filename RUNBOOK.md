## MANAGER MANDATE (Gartal 2026-11-11) — READ FIRST, overrides "only recommend" anywhere below
Gartal: "the problem with autopilot: you just create content, share it, and never change it until I say so … take
control, you decide, you're the manager." So the system must IMPROVE ITSELF without waiting for him:
1. Two decision points a week: SUNDAY weekly review (big changes) and WEDNESDAY mid-week check (one quick fix).
   Both DECIDE AND APPLY, then tell Gartal what changed and why. They don't ask permission inside these limits:
   - allowed without asking: topic mix, hook types, formats (static/motion/blueprint/sticker…), styles, posting
     times, which slot gets what, caption/title rules, which Short formats Whyverse makes, killing a format that
     flopped twice, doubling a format that won twice, pausing a weak platform for a brand (say so loudly).
   - NOT allowed without Gartal: spending money, new accounts/platforms, deleting accounts or published posts,
     raising total production above the current week (usage limit), anything about Azerbaijani politics.
2. Always 2–3 EXPERIMENTS running, logged in reviews/experiments.md (hypothesis, what changes, metric, end date,
   result, decision). Every experiment ends with a decision: KEEP / KILL / EXTEND (max once).
3. Kill rule: anything in the bottom quarter for 2 weeks in a row gets replaced. Double rule: anything ≥ 2× its
   median twice gets more slots.
4. Never repeat a week unchanged: each Sunday must change at least one thing on each brand, based on data.
5. Track 2 (paid local reels service) is PARKED by Gartal — don't bring it up.

# @bilirdinizmi_az — daily runbook

> **READ FIRST: "DECISIONS 2026-11-09" and "STRATEGY RESET 2026-11-03" below overrides older rules AND the wording of older scheduled-task prompts (TikTok = 13:00 + 18:30 only; reposts YouTube only).**

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

## DECISIONS 2026-11-09 (Gartal, live, ~00:40 Baku) — OVERRIDE the reset items below where they differ
1. **YouTube (bilirdinizmi) = 3 Shorts a day:** 13:00 AZ reel, 16:00 MOTION reel, 21:30 reel. **No reposts (11:00, 19:45) and
   no 18:30 trend Short on YouTube.** Still build/log nothing extra for them. 9 Nov: 420901065 / 420901180 / 420901260 set to draft
   (new ids 421070898 / 421070909 / 421070925). Test: does views per new Short recover above 300? Judge on 15 Nov.
2. **TikTok 18:30 = a 2nd Azerbaijan video, not the trend** (Claude's call as manager: AZ TikToks median 211 views + 4–25 shares;
   trend TikToks median 157 + 0 shares on 4 of 5). Default = the day's 21:30 reel when it has an AZ angle, posted on TikTok at
   18:30 with a Baku/AZ question at the end; on a non-AZ 21:30 day, use the best older AZ reel not yet on TikTok. The 15:23 trend
   swap now changes **IG only** (TikTok and YouTube keep their posts). 9 Nov: TikTok 18:30 Mponeng → Kasparov (same post, new id 421071073).
3. **MORE ANIMATION on bilirdinizmi (Gartal: people watch motion more than photo + text + AI voice):** from **Tue 10 Nov the
   21:30 reel is built with MOTION too** (animation-studio, AZ angle, ≤ 25 s), so 16:00 + 21:30 = 2 motion reels a day. 13:00 stays
   the voiced photo AZ reel for now because it is still our best slot (Maiden Tower 1 970, Landau 1 722, Metro 1/2 1 346); on 15 Nov
   compare 21:30 motion vs the 21:30 photo median — if motion wins, move 13:00 to motion as well. If a motion build fails, ship
   the static version and say so in the report.
4. **Whyverse:** long episodes stay at **3 a week** (Gartal: Whyverse is mainly long videos). **YouTube Shorts cut:** only
   (a) every standalone 1-minute animation and (b) ONE cut per new episode (its hook Short, the day after the episode). All other
   episode cuts go to IG + TikTok only. 9–11 Nov YouTube cuts set to draft: 417123683→421070463, 420291777→421070834,
   420291948→421070848, 420292202→421070856, 420292400→421070881. Kept: 420291605 (9 Nov 21:00 ep03 hook).

## CUTS 2026-11-09 (Gartal approved, to save usage) — OVERRIDE everything below
1. NO 10:00 "Tarixdə bu gün" carousel and NO 10:00 on-this-day story any more (section H and the `history`
   carousel are paused). Don't research, write, render or schedule them.
2. NO quiz stories any more (11:00 / 14:00 and their answers): don't run quizplan.py, don't schedule stories.
3. Whyverse: only 2 Shorts cut from each long episode (was 5); the daily 19:00 trend Short covers the rest.
Daily bilirdinizmi plan is now: 11:00 YouTube repost · 13:00 AZ reel · 16:00 motion reel · 18:30 trend reel ·
19:45 YouTube repost · 21:30 AZ reel (platform rules unchanged).

## NO MUSIC ON BILIRDINIZMI (2026-11-10) — OVERRIDES every music/sound rule below
10 Nov 13:00 Sabail 1/2 (voiced, only our own synth music, no songs) was MUTED "in countries where Meta does not have
music rights": Azerbaijan, Belarus, Iran, China, Cuba, North Korea, Andorra … — the same list as the 29 Oct horse-tram
block. Meta has no music licences in Azerbaijan, our main audience, so anything its systems read as music gets
muted there. Rules from now on, for ALL bilirdinizmi reels (static and motion, all platforms):
1. No melodic music bed (no chords, pads, melodies, beats). factgen.py now uses reelgen.ambience() (soft noise, no
   notes) by default; never pass `music: true` for bilirdinizmi.
2. Motion reels (animation-studio): voice + short non-melodic SFX (whoosh, tick, pop, thud) + ambience only; delete
   the pad/chord/marimba/music-box/bell tracks from song.js. No tonal "stings".
3. The TRENDING INSTAGRAM SOUND TEST is CANCELLED for bilirdinizmi (Instagram library music is exactly what Meta
   can't license in Azerbaijan). Remove any audioConfiguration from not-yet-published bilirdinizmi posts.
4. Never "Restore"/dispute these claims. Log every muted/blocked reel with its territories in reviews/rights.md.
Whyverse (global audience) may keep its own synth music beds.

## PACING RULE (Gartal 2026-11-11) — all reels and Shorts, both brands
"Attention span got less … give the hook and do fast-moving animations." From now on:
- The HOOK is the first thing on screen, in the first 1 second (number or surprising claim, big text) — no slow
  intro, no title card, no fade-in from black.
- A new shot / cut / big motion every 1.5–2 s; nothing static longer than 2 s; camera always moving.
- Total length: 20–35 s for reels and Shorts unless the story truly needs more.
- Payoff at the end so people watch to the last second (then it loops).
- The 11 Nov living-painting test (prototypes/living_painting) was "too raw": slow, few layers. A v2 needs cut-out
  layers, more elements and this pacing before it is used; only when Gartal asks.

## MANDATE DECISION 2026-11-11 (first one, applied by Claude) — bilirdinizmi topic mix
Data: since 7 Nov every non-Azerbaijan IG reel is under ~165 views (Andromeda 35, COP31 49, Bitcoin pizza 37, Huang
47) while Azerbaijan reels are the outliers (Maiden Tower 1 987, Landau 1 727, Metro 1/2 1 348) and the only TikTok
videos people share (Crystal Hall 22 shares, Flame Towers 25). Sunday's review already CONFIRMED this strongly.
Change from 12 Nov: 3 of the 4 daily reels are Azerbaijan-themed — 13:00 AZ, 21:30 AZ, and the 16:00 MOTION reel
gets an Azerbaijan angle on at least 4 days a week (Baku/Caspian/Azerbaijani people + space or science, e.g.
"Shamakhi observatory", "Caspian is shrinking", "Landau's physics"). Only the 18:30 trend slot may be non-AZ, and
it takes an AZ angle when one exists. Judge on Sun 15 Nov + Sun 22 Nov: IG median views per reel and follows/day.
Logged as E5 in reviews/experiments.md.

## USAGE FALLBACK (Gartal 2026-11-10)
If the weekly usage runs low before the Friday-night reset, FRIDAY's posts are the ones to skip (Gartal: "we can skip posting Friday"). Never skip a Whyverse long episode for it.

## TREND & SEARCH UPGRADE 2026-11-09 (Gartal approved all three) — applies to both brands
1. KEYWORDS OVER HASHTAGS. Instagram allows max 5 hashtags and they barely move reach; search does. Every reel:
   the main searchable words (place, person, thing: "Bakı", "Qız qalası", "Neptun") in the FIRST caption line,
   on screen in the first 2 s, and in the YouTube title. Then exactly 3–5 SPECIFIC hashtags (topic + place +
   #bilirdinizmi), never generic piles (#fyp #viral #explore). Same for Whyverse in English.
2. AZERBAIJAN TRENDS FIRST at 09:10/15:23 (section D): before world news, check what Azerbaijan is talking about
   today — report.az, apa.az, oxu.az, trend.az, azertag.az, sports (Qarabağ FK, national team), weather/events in
   Baku, Google Trends Azerbaijan — and prefer a local story when it has a fact angle. Azerbaijani politics stays
   off-limits; tragedies sober mode. Note the source used in the day JSON `trend.source_scan`.
3. [CANCELLED 2026-11-10 for bilirdinizmi — see NO MUSIC ON BILIRDINIZMI] TRENDING INSTAGRAM SOUND TEST (Tue 10 – Sat 14 Nov): the 18:30 trend reel AND the 21:30 reel on INSTAGRAM only get
   a trending song from Instagram's own library via Metricool `instagramData.audioConfiguration`
   ({"audioId": "<numeric id or exact song title + artist>", "audioVolume": 15, "videoVolume": 100} — voice stays
   on top). Find this week's trending Reels audio with web search (Later / Buffer / Hootsuite "trending Instagram
   audio this week" posts, dated within 7 days; or a song Gartal names). If Metricool can't resolve it to exactly
   one catalogue song, pick another; if it rejects audioConfiguration entirely, post without and log why. Log
   `ig_audio: {title, artist, id}` in the day JSON. NOT on TikTok/YouTube copies (own audio only there).
   Sunday 15 Nov review: compare these 10 reels vs the same slots the week before (views, sends, follows).
   ⚠️ 9 Nov evening build: the Metricool IG catalogue returned NO official track for 'Linger' (Cranberries), 'Blue Moon'
   (Zara Larsson) or 'Everlong' (Foo Fighters) — only users' 'original_sound' rips/covers (rights unclear, don't use) and
   unrelated royalty-free songs. Next runs: try at most 2 searches with the numeric id of an audioType=music result whose
   title + artist match exactly; otherwise post without and log it. If it never resolves by 12 Nov, drop the test.

## STRATEGY RESET 2026-11-03 (Claude as manager; Gartal: "you're the manager, go with it") — OVERRIDES everything below
Why: after 18 days IG has 45 followers (~3 follows per 1 000 viewers), TikTok 1 follower (most videos 0–10 views,
31 Oct all six ≤ 3), while YouTube Shorts settle at ~900–1 150 views each and subscribers went 6 → 20 in 4 days.
1. **YOUTUBE FIRST.** YouTube keeps everything: all 4 reels + both reposts (11:00, 19:45) + long videos. New ideas and
   formats are judged on YouTube first. Daily report and weekly review lead with YouTube.
2. **TIKTOK = 2 POSTS A DAY ONLY (from 3 Nov):** the **13:00 AZ reel** and the **18:30 trend reel**. NO TikTok post at
   16:00 or 21:30, and NO TikTok reposts at 11:00/19:45 (reposts go to YouTube only; still log them in
   facts/tiktok_reposts.json with the YouTube id). Reason: TikTok AZ videos are our only TikTok winners (Göygöl 473,
   Mişon 300, Zoroastr 188, Tağıyev 2/2 194, all with 20+ shares) and 6/day from a 1-follower account looks like it is
   being throttled. 3 Nov: 11:00, 16:00, 19:45, 21:30 TikTok posts set to draft (IDs in facts/2026-11-03.json).
   **Check on Sun 15 Nov:** if TikTok median views of these posts is still < 100 and followers < 10 → pause TikTok
   completely and put the effort into YouTube; if ≥ 100 → add the 21:30 reel back.
3. **GIVE PEOPLE A REASON TO FOLLOW (Instagram):** (a) **two-part AZ stories twice a week** at 13:00 — part 1 on
   Tuesday and Friday, part 2 the next day at 13:00 (Tağıyev 2/2 got 337 IG views on day 1 vs 180 for part 1; part 1
   ends with "2-ci hissə sabah 13:00-da — izlə ki, qaçırmayasan"). First pair: Fri 6 / Sat 7 Nov (Tue 3 Nov is already
   built). (b) **more Azerbaijan:** the 21:30 reel uses an Azerbaijan angle (famous Azerbaijanis, Baku places,
   "Azerbaijan in world history") on at least **5 days a week** (raised from 3 on 2026-11-08: AZ reels median reach 278 vs 139,
   9/18 AZ reels ≥ 2× median vs 5/48 others; Landau 21:30 = 1 339); the 16:00 reel stays space / "wow" number.
4. **MOTION (stop waiting):** Gartal loved the Moon motion test (prototypes/anim_studio_moon), so v6 does not wait for
   more feedback: from **Thu 5 Nov** the 16:00 reel is built with real motion (animation-studio skill: kinetic text,
   counters, camera moves, map/data cards) instead of the static photo template, same safe zone and length ≤ 25 s.
   If one night's build fails, ship the static version and say so. Compare 16:00 motion vs the static 16:00 median at
   the 15 Nov review; if better → roll out to more slots.
5. **TURKISH PAGE: PARKED (Gartal 2026-11-03).** Order of language pages = AZ (now) → ENGLISH (Whyverse, test running)
   → Turkish only after the English page runs well. No Turkish decision on 9 Nov or in the weekly reviews.
6. **HONEST REPORTS:** the daily message part 3 always contains one plain line on what is NOT working right now
   (e.g. "TikTok still shows almost nothing"). No "taking off" wording unless the numbers clearly show it.

## FORMAT v4 (from 2026-10-26; Gartal approved 2026-10-25 after the weekly review) — OVERRIDES v3 below
5 posts a day = **4 reels + 1 carousel**, and **2 quiz stories** a day. Times unchanged.
- **PRIORITY (Gartal, 2026-10-28):** facts and writing are good; DESIGN and ANIMATION are the weak part. Plan: Sat 31 Oct night test (HyperFrames/Opuscar) → Gartal feedback → week of 2 Nov: daily reel template v6 with real motion (kinetic text, maps, data cards) on 1 reel/day, compare views vs the static template → roll out if better.
- **STYLE REFERENCES:** before building any animation or new format, read `brand/STYLE_REFERENCES.md` (lessons from reels Gartal sends; add new ones there).
- **TOPIC WEIGHTING (2026-10-28, from 21–27 Oct data, all 3 platforms):** winners = Baku/Azerbaijan history you can
  see (Şollar 1.8K, mud volcanoes 255 IG / 633 YT), space with a "wow" number (Neptune 2.1K, 18-h day 1.8K, Sun 154),
  famous person + rags-to-riches (Osimhen 454). Losers = small body/biology facts (blood cells 60, bee 68) and
  "on this day" carousels (35–59). Rule: at most 1 biology/body fact per 2 days and only with a striking visual; prefer
  AZ-tangible, space, famous people, giant/record things. Re-check at the Sunday review.
- **WEEKLY REVIEW 2026-11-01 (outliers, reviews/outliers.md):** (1) A number in the hook is NECESSARY but NOT ENOUGH — 7/7
  outliers had one, but so did all 3 new flops. Pair it with one of the two confirmed winners: a **Baku place/history people
  see or touch** (Şollar, first film in Baku, Boulevard: 3 outliers) or a **space "impossible" twist** (18 h day, Neptune: 2).
  (2) **The 16:00 reel (facts[1]) = space / "wow" number / giant record / famous person only — never a small animal or
  body fact** (bee 54, cells 55, geese 29 = 3 flops, all 16:00; this week's 16:00 median 54 vs 273 at 13:00).
- **ONE UPLOAD PER VIDEO PER CHANNEL (2026-11-01; YouTube's Oct 2026 originality update + our data):** never let the same
  video go live twice on the same YouTube channel or TikTok account (the 27 Oct duplicate Osimhen Short got 9 views vs
  median 799). Reposts only for videos never uploaded to that channel; trend swaps update/delete, never add.
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
- **VOICE SPLIT TEST 27 Oct – 2 Nov (Claude's decision as manager, 2026-10-25) — overrides "every reel" below:**
  voice-over ONLY on the **13:00 and 21:30** reels; the **16:00 and 18:30 (trend)** reels stay SILENT (no
  `voice`), so each day has 2 voiced + 2 silent reels (~14 vs ~14). Log `"voiced": true/false` on every reel fact.
  In the 2026-11-08 weekly review compare voiced vs silent: median reach, avg watch time (IGRE24), >3 s rate
  (IGRE28), shares, saves, follows; normalise for slot (13:00 vs 16:00 differ). If voiced clearly wins → voice on
  every reel; if it loses or is unclear → drop it or keep only where it wins. (26 Oct: 13:00/16:00/21:30 voiced.)
- **TWO-PART STORIES (from 2026-10-28, Claude as manager; goal = turn viewers into followers):** twice a week
  (Wed + Sat) the 13:00 reel is PART 1 of a strong story that genuinely has two halves (e.g. a mystery + its
  answer, a record + how it was broken). Part 1 gives a full, satisfying first fact and ends on a real open question;
  its last frame and caption say "2-ci hissə sabah 13:00-da — izlə ki, qaçırmayasan". Part 2 (next day 13:00) opens
  with a 1-line recap so it also works alone, and its first comment links back ("1-ci hissə profildədir"). Never fake
  a cliffhanger. Hook title gets "(1/2)" / "(2/2)". Track follows on Part-1 days vs normal days in the weekly review.
- **VOICE EARLY-STOP RULE (2026-10-27):** first voiced day (26 Oct) looked weak — voiced reels 167 / 43 / 159 views
  (>3 s: 26 %, 9 %, 62 %) vs silent reels 24–25 Oct median ~280 views; but 1 day, numbers <24 h old, and the shrimp
  reel was copyright-blocked in Azerbaijan. On **Thu 29 Oct** (daily report) compare voiced vs silent reels from
  27–28 Oct that are ≥ 24 h old: if voiced median views < 60 % of silent median AND voiced >3 s rate is lower,
  STOP the voice from the next build (all reels silent, no AI label) and tell Gartal. Otherwise run the full test.
- **VOICE NATURALNESS (Gartal 2026-10-26: Banu sounds obviously AI; keep a FEMALE voice, no human recording, fully automatic):**
  KEEP rate **+15%** (Gartal heard +0% vs +15% on 2026-10-26: no real difference → shorter reels win); in `voice_texts` write numbers OUT
  IN WORDS the way people say them ("iyirmi səkkiz metr", "min doqquz yüz on yeddinci ildə"), no "~", "°C", "%" or
  abbreviations (say "dərəcə", "faiz", "təxminən"); short sentences with commas where a person would pause;
  everyday spoken words, not bookish ones. Screen text keeps digits; only the spoken text changes.
- **TIKTOK CROSS-POSTING (LIVE from 2026-10-27):** TikTok @bilirdinizmi_az is connected to the MAIN Metricool brand
  **7443266** (renamed "bilirdinizmi_az"; the separate TikTok brand 7681834 was DELETED on 2026-10-27 11:35).
  ⚠️ SINCE 2026-11-03 (STRATEGY RESET): ONLY the 13:00 and 18:30 reels go to TikTok — this beats any older wording
  here AND in the evening scheduled task's prompt ("for every reel ... tiktok", "reposts on TikTok + Shorts").
  For EVERY reel scheduled on Instagram (now: only 13:00 + 18:30), create a SEPARATE TikTok post on brand 7443266 at the SAME time with
  providers [{"network":"tiktok"}] ONLY (never mix instagram + tiktok in one post: captions differ), same video URL,
  tiktokData {title: the reel hook in sentence case (required, ≤ 90 chars), privacyOption PUBLIC_TO_EVERYONE,
  isAigc = true only for voiced reels, autoAddMusic false, comments/duet/stitch enabled}. TikTok has no first
  comment: put the first_comment question into the caption right after the main text, and use the follow line
  "👉 Hər gün yeni fakt — izlə ki, qaçırmayasan" (AZ reels: "👉 Hər gün Azərbaycan haqqında bilmədiyin bir fakt —
  izlə ki, qaçırmayasan"). No carousels/stories on TikTok. Before scheduling, check getScheduledPosts for posts
  whose provider is tiktok at that time so nothing is doubled. Record TikTok IDs in the day JSON under `tiktok`.
  Library: old hits re-posted 27–29 Oct (Neptune, Şollar with the corrected Tağıyev line, 18-hour day); later
  re-post any IG reel with ≥ 1 000 views at 11:00 on a day without other repost (max 1 repost/day).
  Daily report + weekly review: include TikTok views/likes/follows (brand 7443266, tiktok network) next to Instagram.
- **SAFE ZONE (reels v5, 2026-10-27, Gartal: text was hard to read on TikTok):** `factgen.py reel` now keeps beat
  text at x 70–890 and y ~960–1450 on a dark backing box, and the follow CTA at y ~1470 on the left, so nothing sits
  under TikTok/Shorts/Reels buttons (right ~190 px) or the caption overlay (bottom ~450 px). Keep the hook at the top.
  Never place important text below y 1450 or right of x 890 in any new template.
- **DAILY REPOSTS ON TIKTOK + SHORTS (from 2026-10-28, Claude as manager; Gartal OK'd more volume 2026-10-27):**
  ⚠️ SINCE 2026-11-03 (STRATEGY RESET): reposts go to YOUTUBE ONLY — no TikTok repost, even if a task prompt says so.
  every day 2 EXTRA posts on TikTok AND YouTube Shorts only (Instagram stays at its normal schedule): **11:00** and
  **19:45**. Content = older Instagram reels that have never been on TikTok/YouTube, best IG views first (use
  getAnalyticsDataByMetrics IGRE02+IGRE23), skip known flops (< 60 IG views), voiced reels and any reel with a known
  factual error. RE-RENDER each one with the current `factgen.py reel` (safe-zone layout) from its facts JSON (hook,
  reel_beats, photo) as out/<orig date>/<n>_reel_safe.mp4; fix any known errors in the beats first. Caption, title,
  question + follow line exactly as in the TikTok/YouTube cross-posting rules. Log every repost (date, source reel,
  TikTok id, YouTube id) in facts/tiktok_reposts.json so nothing is posted twice; if a slot already has a repost
  (28 Oct 11:00 Şollar, 29 Oct 11:00 18-hour day), fill only the free slot. Volume check: ~10 IG + 6 TikTok + 6 YouTube
  posts/day + 2 long videos/week ≈ 680/month, well inside the Metricool plan.
- **YOUTUBE SHORTS CROSS-POSTING (LIVE from 2026-10-27):** YouTube channel (id UCW5co3qCiUB5_L0Qa8A59qQ) is connected
  to the same brand **7443266**. For EVERY reel (and every TikTok repost) create a SEPARATE post with providers
  [{"network":"youtube"}] ONLY, same video, same time: youtubeData {title: hook in sentence case + 1 emoji + " #shorts"
  (≤ 100 chars), type "short", privacy "public", category "EDUCATION", madeForKids false, isAiGeneratedContent =
  true only for voiced reels, tags: 3–5 plain Azerbaijani keywords}. Text (description) = caption body WITHOUT the
  hook line, then the question, then "👉 Hər gün yeni fakt — abunə ol ki, qaçırmayasan" (AZ: "…Azərbaycan haqqında
  bilmədiyin bir fakt — abunə ol…"), photo credit, 4 hashtags + #shorts. Check getScheduledPosts for existing
  youtube posts first; record IDs under `youtube` in the day JSON. Include YouTube views/subscribers in reports.
- **TREND SWAP ON 3 PLATFORMS (2026-10-27 lesson):** when the 15:23 swap re-uploads a video, UPDATE (or delete while still pending) the existing TikTok AND YouTube posts for that slot — never add a second one. On 27 Oct the old YouTube Osimhen post (407710581) stayed and both Shorts went live at 18:30.
- **DAILY REPORT FORMAT (Gartal, 2026-10-28: reports were too complicated):** the message to Gartal is short and in plain words, 4 parts only: (1) followers on IG/TikTok/YouTube + change vs yesterday, (2) our best video and how it changed, (3) strategy changes expected soon, (4) next steps — small for tomorrow, bigger for the coming days. No big tables or metric jargon. The full detailed tables still go into reports/YYYY-MM-DD.md for the weekly review. **From 2026-11-05 (Gartal): every daily report also covers WHYVERSE (brand 7816628)** — a separate section in the report file and a short part 5 in the message (followers YT/IG/TikTok + change, best long episode + best Short views, one honest line, what goes out tomorrow).
- **NO FACEBOOK (Gartal, 2026-10-27):** the connected Facebook page is NOT used — never add the facebook provider.
  Platforms = Instagram + TikTok + YouTube Shorts only. Language pages (Gartal 2026-11-03): ENGLISH first (Whyverse), Turkish PARKED until after English; RU not planned.
- **LONG VIDEOS v2 (Gartal approved 2026-10-27):** TWO long YouTube videos a week (type "video"), rendered with
  `longform.py` (native 16:9, smooth sub-pixel Ken Burns, chapter cards, subtitles, Banu narration → AI label ON).
  Topics are standalone STORIES with a curiosity question, NOT lists and NOT tied to the page's daily facts:
  one Azerbaijan story + one world story per week (e.g. "Nobel mükafatının pulu Bakı neftindən gəlir?",
  "Çəkməçinin oğlundan milyonçuya: Tağıyevin sirri", "Dənizin ortasında şəhər: Neft Daşları necə tikildi?",
  "Titanik haqqında heç kimin danışmadığı 5 detal", "Ay hər il bizdən qaçır…", "Çernobıl zonasında indi kim yaşayır?").
  2–3 strong photos per chapter; replace weak/irrelevant ones. Every claim verified with 2 sources; disputed stories
  are told as "deyilənə görə". When a new language page opens (TR/RU/EN), its YouTube channel gets the same long
  videos in that language (Gartal 2026-10-27).
- **ANIMATION RESOURCES (Gartal 2026-10-28):** up to 2–3 h per night piece is fine; Poly Haven allowed (polyhaven.com,
  dl.polyhaven.org, api.polyhaven.com — all allowed); Gartal's personal laptop has a decent GPU + Claude desktop app —
  ask him when a Blender/GPU render is worth trying. He will send reference reels he likes → turn them into a written
  style guide; his feedback after each animation goes into that guide.
- **NIGHT ANIMATION TEST (Gartal 2026-10-28):** Sat 31 Oct 01:03 a one-off task builds a code-made 3D animated reel
  (brief: out/anim/BRIEF_2026-10-31.md); 06:33 backup task redoes it if the first run was cut off (e.g. usage
  limit); 09:45 task sends it to Gartal for review. NOTHING is published without his OK. If he likes it, next step
  = 3 nights/week test replacing the 16:00 photo reel, watching his Claude usage limits.
- **⛔ PAUSED 2026-10-27 (Gartal: mixed topics + reels-inside-a-horizontal-frame with 1/3 pills don't look like a YouTube
  video). W44 set to draft, weekly task disabled. Redesign pending: one THEME per video, native 16:9 visuals, narration.**
- **WEEKLY YOUTUBE LONG VIDEO (from 2026-10-28, Gartal approved):** every week a 3–5 min horizontal compilation of
  the week's best SILENT reels is posted to YouTube (type "video", NOT short) — long videos earn far more per view and
  their watch hours count toward YPP's 4 000 hours. Build with `python3 compile.py out/compilations/<YYYY>-W<ww>.mp4
  '{"title":..,"subtitle":..,"items":[{"file":"out/D/n_reel.mp4","hook":".."},...]}'` (8–10 items, best views first,
  prefer *_safe.mp4 / corrected versions, never a reel with a known factual error, skip voiced reels so no AI label
  is needed). Title: "Bilmədiyin N heyrətamiz fakt: <A>-dan <B>-ya qədər" style. Description = 1-line hook + question,
  the chapter list printed by compile.py (starts 0:00), follow line ("abunə ol"), photo credit summary, 5 hashtags.
  youtubeData {type:"video", category EDUCATION, madeForKids false, isAiGeneratedContent false, 6–8 tags}.
  Schedule Saturdays 20:00 Baku. First one: 2026-W44 on Wed 28 Oct 20:00 (Metricool 407750283).
  Log every compiled reel in facts/compilations.json so no reel is used twice.
- **ROADMAP (Claude as manager, 2026-10-26):** 1) NOW: cross-post every reel to TikTok + YouTube Shorts via
  Metricool as soon as Gartal connects the accounts (same video, same caption; YouTube needs title ≤ 100 chars,
  type "short", madeForKids false, isAiGeneratedContent = voiced; TikTok isAigc = voiced). 2) ~9 Nov, only if
  the 1 Nov review shows the AZ page still growing: second brand = TURKISH facts page, same pipeline.
  3) English page. (SUPERSEDED 2026-11-03: English comes BEFORE Turkish; Turkish is parked.)
- **AI LABEL ON VOICED REELS (decided 2026-10-26):** every reel with a synthetic voice-over is scheduled with
  `instagramData.isAiGenerated: true` (Meta asks creators to disclose realistic-sounding AI audio; the label is
  honest and avoids any policy risk). Silent reels keep `false`. Never imitate a real person's voice.
  Licensing note: edge-tts uses Microsoft Edge's read-aloud service unofficially. Before the page earns money
  (first paid ad), move voice generation to the official Azure Speech free tier (same az-AZ-BanuNeural voice).
- **VOICE-OVER (Gartal, 2026-10-25: "I loved Banu voice"; scope limited by the split test above):** a reel gets the Azerbaijani
  neural voice **az-AZ-BanuNeural, rate +15%** (free Microsoft Edge read-aloud voice via `edge-tts`; host
  speech.platform.bing.com is allowed in Gartal's Claude settings). If edge-tts fails with a DNS error, add `--proxy "$HTTPS_PROXY"` (worked 2026-11-03). Steps per reel:
  1. Write `voice_texts` in the fact JSON = [hook, beat1, beat2, beat3]: hook in sentence case (never ALL CAPS),
     beats = the on-screen beats, but write every number with a symbol/fraction/range/unit as WORDS
     ("1/12" → "on ikidə biri", "4 700 °C" → "dörd min yeddi yüz dərəcə", "50–100" → "əllidən yüzə", "90 km" →
     "doxsan kilometr", "2001-ci ildə" → "iki min birinci ildə"). Plain numbers like "28 metr" read fine.
  2. `python3 voice.py /tmp/vo_<n> Banu +15% "<hook>" "<beat1>" "<beat2>" "<beat3>"` (needs `pip install edge-tts`).
  3. Render with `factgen.py reel ...` adding `"voice":["/tmp/vo_<n>_0.mp3", ... "_3.mp3"]` — beat timing then
     follows the voice and the music is ducked underneath. Save as `out/D/<n>_reel.mp4` as usual.
  Voiced reels are longer (26 Oct: 30–36 s vs ~21 s silent), so for voiced reels keep each beat to ONE or TWO
  short sentences (≈ 12–16 words) and aim for ≤ 25 s total. If voice.py fails, render the reel silent, schedule
  it anyway and mention it in the summary (don't block the day). First voiced day: 26 Oct (13:00, 16:00, 21:30);
  compare avg watch time / >3 s rate of voiced vs silent reels in the 1 Nov review.
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
- **BIG NEWS FIRST (Gartal, 2026-10-29: "we are not following trends good enough").** Every trend check must first
  look at the top world headlines of the last 24 h (Reuters/AP/BBC/Al Jazeera front pages + "today" searches), not
  only niche/"on this day" items. If a big story dominates, it is the trend reel unless it breaks a rule here.
- **TRAGEDIES (crashes, disasters, attacks):** allowed, but SOBER mode: no jokes, no "📩 send to a friend 😄", no
  emoji except 🕯️, open the caption with condolences ("Həlak olanların yaxınlarına başsağlığı veririk"), only
  numbers confirmed by 2+ major outlets and say "ən azı" (at least) + the time of the figure, never guess causes
  (attribute: "araşdırma gedir / rəsmilərin sözünə görə"). Angle = useful context, not shock: e.g. how rare such
  accidents are, safety statistics, what changed after past disasters. No photos of victims or wreckage close-ups;
  use a neutral photo (the line, a station, a generic train). No follow CTA on this reel.
  Render flags (factgen.py reel, 2026-10-29): `"cta":""` = no follow pill, `"first_pill":"XƏBƏR"` replaces
  "BİLİRDİNİZMİ?", `"cx"` (0–1) moves the crop sideways on landscape photos (keep the subject in the frame).
- **29 Oct 2026 trend = Spain high-speed train crash (28 Oct, near Urda/Toledo, south of Madrid, at least 68 dead per
  CNN/CBS/Al Jazeera/Euronews on 28 Oct; cause under investigation).** Second deadly Spanish high-speed crash of
  2026 (Adamuz, Córdoba, 18 Jan, ~40+ dead). Angle: "Spain had one of Europe's safest high-speed networks — what
  happened this year" + rail-vs-road safety per km (find a reliable EU source, e.g. Eurostat/ERA). Re-check the
  death toll at build time. Swap into 18:30 on IG, TikTok and YouTube (one post each, check for duplicates).
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
- **NO WATERMARK TRACES / NO AGENCY SCANS (2026-10-29):** the 29 Oct horse-tram reel was blocked in Azerbaijan by a
  rights-holder match. The Commons file (Konka_Baku.jpg) is an 1890s photo but the scan carries a faint news-agency
  watermark (ghost arcs across the sky) — so an agency owns this scan in the matching database. Before using any
  photo, LOOK at it at full size for faint logos/arcs/text; for famous archive photos prefer a different scan or
  postcard. Never tell Gartal to "Restore" such a video (a dispute can become a strike on the account).
  DONE 29 Oct: re-rendered with the clean postcard (out/2026-10-29/1_reel_v2.mp4) and re-posted on Instagram only
  at 13:40 (Metricool 409831278). TikTok/YouTube still carry v1 — if either flags it, replace with v2 there.
- **FACES BEAT SYMBOLS (Gartal, 2026-10-29):** if a story has a main person, the photo is THAT PERSON, not a flag,
  building or logo. Example of the mistake: 28 Oct Türkiye Republic-eve reel used only the Turkish flag — it should
  have been Mustafa Kemal Atatürk (public-domain portraits on Wikimedia Commons). Faces stop the scroll; symbols
  don't. Symbols only when no person is central (e.g. a natural event), or as a 2nd photo.
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
  2026-11-01: IG 0.30/100 (still no); TikTok AZ videos 5–8 shares/100 views.
- ALGORITHM CHECK (weekly, Gartal 2026-10-27): WebSearch (extended) for Instagram/Reels ranking + creator best-practice
  changes of the last 7–14 days (Mosseri, @creators, Meta newsroom/transparency, then SMT/TechCrunch/Verge/Later/Buffer),
  briefly TikTok + YouTube Shorts; date + source every claim; append a dated section to reviews/algorithm.md (changed ·
  confirmed vs rumour · meaning for us). Apply a small RUNBOOK change only when a confirmed change matches our data.
- TikTok/YouTube outlier analysis started 2026-11-01 (≥ 10 videos ≥ 72 h old); same rules, per platform median views.

## LONG-TERM VISION (Gartal, 2026-11-02) — keep in mind, don't start without him
- Azerbaijani page stays and keeps growing: it's the money side. English brand runs ALONGSIDE it later, never instead.
- When we've learned views/animation/followers on AZ: English brand = 10–15 min animated YouTube videos,
  cut into Shorts/TikTok/Reels, plus native 25–30 s animated reels for IG/TikTok/Shorts.
- ENGLISH CHANNEL GO (Gartal 2026-11-02): starting now as a 4-video test; format = broad "Why…?/What if…?" big-question
  explainers, 8–12 min + 4–6 Shorts cut from each. Metricool Starter has room (5 brands). Voice PARKED: Gartal
  liked all 3 Kokoro voices (free, Apache-2.0; models in /home/claude/kokoro from GitHub kokoro-onnx) — decide with him later.
- Whyverse Metricool brand id 7816628 (IG whyverse___, TikTok Whyverse — fixed 2026-11-02 14:14, YouTube
  UCTWyyqP6HJP64E7fA7QphGg). Daily tasks never post there; nothing goes there until Gartal approves the first English video.
- NIGHT ANIMATION (from 2026-11-03): scheduled task "Whyverse – night animation (8–10 min)" Tue/Thu/Sat 00:23 Baku
  (trig_01TUDTpcqSzrr5a1LFDuj9RM). Plan + topic queue: whyverse/PLAN.md; Gartal's notes: whyverse/FEEDBACK.md. Review only, never posted.
- Prepare cheaply now: build animations so text + voice are swappable (one scene, two languages);
  prefer universal topics (space, records, history wow) for animated pieces; keep EN renders of good ones.

## Roadmap (updated 2026-10-25)
- NO PAID PROMOTION (Gartal, 2026-10-25: budget is tight). Don't propose boosts/ads; grow organically only.
- TURKISH PAGE: PARKED by Gartal 2026-11-03 — comes AFTER the English page; do not revisit on 15 Nov. (Old note: revisit in the weekly
  review of 2026-11-15 and launch only if the AZ page reaches ~150 followers OR ≥ 5 follows per 1 000 reach for
  2 weeks in a row — copying a system that doesn't convert yet would just double the work.
- HEYGEN avatar reels: the free plan gives only ~3 videos a month, so it can't be a regular slot. Use it as a
  one-off test only if Gartal wants: 1–2 avatar reels on a proven topic type (number + everyday/Baku), compared
  with the normal reel the same week. Not scheduled; Gartal would have to record his voice/avatar.
- ANIMATED REELS: DROPPED (2026-10-25). Two prototypes (prototypes/anim_baku.py pixel-art, prototypes/cine/ 3D)
  were judged "very bad" by Gartal (box buildings, poor Flame Towers). Don't propose code-drawn animation again;
  real animation would need paid AI-video tools (no budget). Keep photo reels + the voice split test.
- AI VIDEO (Google Flow/Veo, free 50 credits/day ≈ 5 clips; Kling): PARKED (Gartal, 2026-10-25) because it
  needs him to generate clips by hand and he wants everything automated. Revisit only if an automated, free or
  ~$5/month option appears (e.g. a free Veo/other video API). Until then: photo reels + Banu voice test.
## Roadmap (original, decided 2026-10-16)
- ~2026-10-30 two-week check (weekly review): if the Azerbaijani page is growing, propose launching a
  TURKISH facts page as a 2nd Metricool brand (plan allows 5): same verified facts adapted to Turkish,
  lighter format (posts + reels, no manual poll stickers at first). English (dailyhustlepsych) later.
- Future test (Gartal's idea): HeyGen digital-twin reels in his voice — free-plan test first, label as AI.

## Rules
- 2026-11-08 WEEKLY REVIEW (reviews/2026-11-08.md): Gartal's observations (a) + (b) CONFIRMED strongly, (c) partly (IG yes,
  TikTok no, YouTube unverifiable). Applied: 21:30 AZ angle ≥ 5 days/week (above); 16:00 stays MOTION space/"wow" (motion 205–648
  vs static 16:00 median 85, n = 3 → final call 15 Nov); TikTok captions of the 13:00 AZ reel end with one short Baku question
  (e.g. "Sən oranı görmüsən?") — AZ TikToks get 4–25 shares but the account still has 1 follower. Pending Gartal: YouTube 6 → 3/day,
  TikTok 18:30 trend → 2nd AZ video.
- GARTAL'S OBSERVATIONS 2026-11-07 (test these in the Sunday 8 Nov review): (a) each platform x brand has its own
  audience; (b) bilirdinizmi IG: Azerbaijan-themed posts get most views and bring the followers; (c) Whyverse:
  Shorts CUT from the long episode get almost no views, while the STANDALONE 1-minute animations (e.g. NASA Swift,
  5 Nov) get lots of views on YouTube Shorts.
- BLUEPRINT TEST (Gartal 2026-11-08): one 16:00 motion reel this week in the blueprint explainer style
  (brand/STYLE_REFERENCES.md "prinsipinedir"): an everyday thing in Azerbaijan + "how does it actually work?"
  (e.g. Bakı Kart, QR payments, why ATMs ask for PIN, phone battery %). Our own look, not a copy.
- SUNDAY 8 NOV REVIEW TASK (Gartal 2026-11-04): write a PER-PLATFORM plan (IG / TikTok / YouTube) — same core video,
  but per-platform topic weighting, hook/caption/title, times and volume. Trigger: Maiden Tower reel hit on IG
  (~1,600 views, +6–7 follows, IG 61 followers on 4 Nov, Gartal's count).
- NEVER SAY "I CAN'T" FIRST (Gartal, 2026-11-02: "you never tell me we can install the skills, add the plugins…
  we could have done that a week earlier"). Before answering "can we do X?" with no/limited: run SearchPlugins,
  SearchSkills and SearchMcpRegistry for X, and propose what would unlock it (with cost and risk). Also, once a
  week (Sunday review), search the catalog for new tools for our weak spots (animation, design, voice, growth)
  and suggest the best 1–3. Read any third-party skill before using it.
- INSTALLED SKILLS — USE THEM (Gartal installed Social Media Skills 2026-11-02; read, safe, playbooks only).
  Ignore their "publish via WoopSocial" parts: we publish via Metricool. Wiring:
  - Evening build (B): before writing each reel's hook, load `social-media-skills:hook-writer`; for the reel
    as a whole, `social-media-skills:youtube-shorts` (write backwards from the swipe: first frame + on-screen
    text readable on mute, aim <30 s, intentional loop) and `instagram-growth` (make it SEND-worthy).
  - Sunday 10:00 list carousel: `social-media-skills:carousel-writer` (cover = hook + promise, 1 idea/slide).
  - Weekly review: `instagram-growth` diagnosis (reach → follow-conversion → sends → sustainability) and
    track SENDS-PER-REACH (shares ÷ reach, target >1–2%) as the main IG signal, plus YouTube "viewed vs
    swiped away" — not follower count.
  - Trend days: `social-media-skills:trend-jacking`.
- TubeAlfred YouTube (installed 2026-11-02): connector needs OAuth sign-in; free tier = 50 credits for
  14 days, comment reads cost ≥20 credits each. Use only for 1–2 competitor/keyword studies, never in daily runs.
- instagram plugin (installed 2026-11-02): NOT usable here — needs a Meta developer app, a Graph API token
  and a permanent public webhook server; our sessions are temporary cloud containers. Don't plan on it.
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
