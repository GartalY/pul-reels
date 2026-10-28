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
