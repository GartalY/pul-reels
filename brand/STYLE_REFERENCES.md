# Style references Gartal sent — read before building any animation or new reel format

Every reference is turned into concrete rules here, because nothing is remembered between sessions unless written.
**Key frames of each reel are saved in `brand/refs/` (named <page>_<second>s.jpg). Open them with Read and LOOK at
them before designing — and compare your own rendered frames side by side against them before calling a piece done.**
When Gartal sends a new reference: extract 5–6 frames (ffmpeg -ss T -frames:v 1, scale 540) into brand/refs/ and add a
section below.

## 2026-10-28 — topundibine (Turkish football, IG)
- Views are huge (up to 492K) but only 425 followers → views alone don't build followers.
- Biggest hits are INTERACTIVE: empty "Worst XI" pitch with "?" → everyone comments a guess.
- Fixed template per series (same layout, colours, logo) → instantly recognisable, cheap to repeat.
- Career-map style: dark map, yellow flight arc, plane icon, club badge pin, info card (photo, years, matches, goals),
  ends with "Sıradaki durak?" teaser. → Our version: "Xəritədə bir hekayə" (Nobel oil route, Silk Road, BTC, Şollar).

## 2026-10-28 — advice.digital (Turkish, kinetic typography)
- Light background, words pop in one by one, ONE keyword per line in orange, subtitle pill under each beat.
- "01/09" progress bar at top (shows how much is left → people stay).
- UI-card visuals (GitHub card, chart, buttons) instead of photos.
- Ending: big "Kaydet." + "save it before you need it" → asks for saves. Use a save CTA on list/explainer reels.

## 2026-10-28 — weblabai ("5 Claude skills for video", 17.2K saves)
- List of useful things = massive saves. Format idea: "Bakıda X yer ki…", numbered 1–5 with chips at the top.
- Tools: HyperFrames (Apache-2.0) and Lemo-Opuscar (MIT) → use for animation. NOT onetake (non-commercial).

## 2026-10-28 — "30 best Claude plugins" (white UI-card carousel)
- White background, soft shadows, one card in focus in the centre, neighbours faded above/below (vertical carousel).
- Colour per chapter (green / blue / orange / purple / pink): chip at top "• Research and **understanding**" with
  the keyword in the chapter colour; segmented progress bar at the bottom in the same colours + "12/30" counter.
- Big chapter title "02 / 05" + two-line headline, second line coloured.
- Opens with the whole grid of 30 icons (promise of everything), ends by returning to the grid → "pick one row".
- Ending CTA: **"Comment PLUGINS and I'll send you all 30 links"** → comment-for-DM = comments explode.
  Our version: "Şərhə BAKI yaz — siyahını sənə göndərim" (only if we can actually reply; Metricool can't auto-DM, so
  use sparingly or answer manually).
- Design-quality tools found here: **Impeccable** (pbakaus/impeccable, Apache-2.0) — design critique for HTML,
  commands like critique/polish/bolder/animate and 62 "AI-looking design" detector rules → run its rules on our
  HyperFrames HTML before rendering. UI UX Pro Max (MIT) — style database, lower priority.
- Checked the other tools in that reel (2026-10-28): **OpenMontage** (calesthio/OpenMontage, AGPLv3 — fine for making
  our videos) = full agentic video pipeline: script → free footage from Archive.org/NASA/Wikimedia → Remotion or
  HyperFrames → word-level captions; has "start from a video you already love" (reference-driven). Needs those
  footage sites reachable from the container (ask Gartal to allow domains if we adopt it). **Agent Reach**
  (MIT) = read YouTube/Reddit/X/IG for trend research, but needs logins + site access → later, maybe on Gartal's laptop.
  Taste / UI UX Pro Max = design rules (Impeccable is the one to use). Rest are coding tools — not for us.

## 2026-10-29 — tahastudio.official (Turkish, "how ad money works" explainer)
- Navy gradient background, flat infographic shapes, everything centred, headline 2 lines with line 2 in a colour
  (yellow / green / blue per scene), word-by-word subtitle pill near the bottom.
- Builds explanations as DIAGRAMS: boxes + arrows flow (Seller → AdMob → your game), two phone mockups side by side
  (Player A vs B), growing coin stacks for comparison (Türkiye vs USA/Europe "kat kat"), grid of item cards.
- Things animate INTO place step by step as the narration mentions them (draw arrow, then next box).
- Series badge "SERİ 2" + numbered 3-step checklist + "Takip et" button at the end.
- Our use: "Necə işləyir?" explainers — how Şollar water reaches Baku (flow), how oil became money for Baku
  (Nobel → tanker → Europe), comparisons with growing stacks/bars (Caspian vs other lakes). Good fit for HyperFrames.

## 2026-10-29 — story.gaffer ("biggest Premier League upsets", 3D data story) — Gartal: "great animation and design"
- REAL 3D DATA VISUALISATION (three.js-style, low-poly, night lighting), not character animation → very doable
  with our headless three.js setup (prototypes/cine/render.js) or HyperFrames+WebGL.
- Each idea = one 3D METAPHOR: a roulette wheel for the odds (4.5% slice glowing yellow, ball lands on it);
  ~10,000 games as a field of glowing pillars (height = how surprising), #1 pillar golden with a light beam;
  a waffle grid of tiles (84 games) where the losses drop out and turn red; stadium stands as dark backdrop.
- Camera slowly orbits/dollies between scenes; pillars light up one by one with a small HUD card ("#3 MAN CITY 2–3
  CRYSTAL PALACE", date + odds in tiny mono caps).
- Text: top-left, white bold sans, 2–3 lines, ONE keyword/number in yellow; tiny uppercase mono labels as
  annotations. Restrained palette: navy night + wood/beige + one blue team colour + yellow highlight + red = bad.
- Ends by returning to the opening metaphor (roulette) with an open question → comments.
- Our use: number facts as 3D metaphors — Caspian vs other lakes as water columns; 47,000 Pando trunks as a
  forest field; mud volcanoes as a pillar map of Azerbaijan; "1 in X" odds facts as a wheel.

## 2026-10-29 — david_knowsai "5 skills → your video editor" (tools, not style)
- Ghost Editor (github …rbaitaev/ghost-editor, built on HyperFrames): editor for TALKING-HEAD reels — keeps the best
  take of each sentence, face-safe captions, motion-graphic scenes, can reverse-engineer a reference edit.
  → USE for Gartal's recorded long-video scripts (multiple takes → best take, captions that avoid his face).
- ffmpeg-skill (…/ffmpeg-skill, MIT): cut silences (silence.py), word-timed subtitles, karaoke pop captions,
  9:16 reframing, audio balance. → same pipeline; we already have ffmpeg, but its silence-cut + caption scripts save time.
- Claude Shorts (AgriciDaniel/claude-shorts): long video → scored Shorts with Remotion captions. → later, to cut
  Gartal's long videos into Shorts.
- OpenMontage "Start from a video you already love": breaks a reference reel into hook / pacing (cut every ~1.4 s) /
  scenes / style, then rebuilds around your topic. → matches how we use Gartal's references; try when footage
  sites are allowed.
- Higgsfield "Editorial Motion Graphics": paid AI service via its own connector → skip unless Gartal wants to pay.
- Format lesson: talking head (top half = screen recording / graphic, bottom half = face) + numbered chips "01/05"
  + "Comment EDIT and I'll send you the setup" ending (2 051 shares, 7 491 saves).

## 2026-10-30 — aitools.dailyy "I locked 300 AIs in a room" (pixel art story; LOW engagement: ~1 like, 3 saves when seen)
- Useful bits only: (1) hook as a mini story with a goal + counter ("door opens at $1,000", "$0 / $1,000" sign,
  "AI experts inside: 63 → 300"); (2) word-by-word karaoke captions where each spoken word gets a thin outlined box;
  (3) a consistent pixel-art world (dark navy room, neon sign, desks with role labels) looks fine when every
  element shares one pixel grid. Its own numbers show the format alone doesn't carry a reel.
- Tool: agency-agents (≈300 role prompts for Claude Code: designer, SEO, "TikTok strategist"…). Low value for us —
  our RUNBOOK already does this job; at most skim its TikTok/Instagram strategist prompts for ideas.
