# Ep07 — How much is the whole world actually worth? — NOTES

status: DONE — scheduled 2026-11-14 (YouTube Sat 14 Nov 19:00 London / 23:00 Baku; cut Short YouTube/Instagram/TikTok Mon 16 Nov 23:00 London; see ../../posts.json, PUBLISH.md)

- **Timing:** the run started Fri 13 Nov 20:24 London (Sat 14 Nov 00:24 Baku, HTTP Date header). Fri 19:00 London had already passed (and was ep06's slot), so the
  long video goes out Sat 14 Nov at 19:00 London (the Baku "today" of this night run).
- **Topic choice:** no big worldwide story of the last days had a solid 10-minute "why / what if" angle (trend scout 13 Nov: Nvidia CEO change — business, already two
  Shorts; Kane's England record — sport; Earth's water study — weak freshness). So the first evergreen topic in the PLAN.md queue without a finished episode:
  #6 "How much is the whole world actually worth?". Not covered before (episodes/, shorts/, posts.json). Not political; nothing about Azerbaijan.
- **Style (STYLE ROTATION #7): 'blueprint'** (Gartal's 8 Nov reference, brand/STYLE_REFERENCES.md; first long episode in it): deep blueprint blue with a slowly drifting
  fine/major grid, white technical line art that draws itself on (film/bp.js P.art), yellow tags, digits in boxes (P.digits / P.bcount), dimension lines (P.dim),
  handwritten Patrick Hand annotations, step-by-step worked examples (gold ounces × price, Earth's iron × ore price). A sheet frame + title block
  "WHYVERSE · EP 07 · SHEET n / 8" on every shot = the progress counter from the 12 Nov style lessons. Line-art Earth = orthographic projection of the Natural Earth outlines.
  Guide character **Pip** (film/chars.js): a small hovering drafting robot with a screen face, antenna bulb and yellow pencil — lip-syncs, blinks, looks, points,
  thinks, shrugs, writes, cheers, waves, flies off. People are faceless line-art mannequins (PLAN.md PEOPLE = SILHOUETTES).
- **EVRIM AĞACI LESSONS applied:** opens INSIDE the question with a concrete scene (an auction: "Lot number one. Planet Earth.") + a paradox (> $500 tn, yet it leaves out
  the most valuable thing) + a 3-part promise card; one big question split into six smaller ones, each chapter = blueprint card + spoken HOOK strip + a reveal that raises
  the next question (gold? → money? → what has no price? → what else is missing? → price the rock itself?); myths corrected openly (gold-in-a-vault MYTH stamp;
  "worth ≠ a pile of stuff"); warmth (Pip; "the biggest asset is you"); payoff answers the promise (three numbers + PRICELESS, "nothing to compare it to") and closes
  the opening scene (the hammer never falls; everyone is standing on the lot). Spoken + animated CTA at the end only; no tease of another episode.
- **FEEDBACK applied:** no boil (flat engine style); no camera shake anywhere; pushes ≤ 3 %; chapter hooks; CTA; no burned-in subtitles in the long video (ep07_worth.srt).
- **60 fps:** FPS = 60 in score.js and build_timeline.py (mouth track at 60 fps); every motion is a function of t.
- **Voice:** Kokoro v1.0 int8, `af_heart`, en-us, one wav per line (67 lines, 1,297 words, 426 s of speech). Six lines were added after the first draft to reach
  8–10 min with substance (c1_4b per-adult share, c2_4b who holds the gold, c3_4b banks lend deposits, c4_5b losses, c5_5b schools/hospitals, c6_4b "nonsense").
- **Length:** 8:30 (510.1 s), 1920×1080, **60 fps** (ffprobe: r_frame_rate 60/1, 30,608 frames). Final: film/out/ep07_worth.mp4 (not in git;
  whyverse-media/ep07/ep07_worth_long.mp4). Encode libx264 medium CRF 29 + AAC 160k, +faststart → 69.9 MB. −14.0 LUFS integrated.
- **Render:** resumable 22.5 s chunks (tools/render_chunks.sh), ≈ 4.5–5.5 fps with 2 Chromium workers (the globe outlines are the heavy part), ≈ 1 h 45 min, no restarts.
- **Sound:** one score timeline (events.js → score.js → ch*.js + song.js), 240 named hits, each with a synth SFX (new: pen scribble, jet, flutter, typing, beep, chop,
  drain, rain). Music bed per chapter (music box / marimba / guitar / e-piano), ducked + levelled −23 dB vs the voice; SFX −20 dB; title / chapter stings −14 dB
  where no voice. Measured, not listened to.
- **verify:** title_7 + title ✓ (+8 ms / +1 f), title_1 sound ✓ (+2 ms), title_5 sound ✓. As in ep04–ep06 the title words land 0.3 s apart, so verify's window picks a
  neighbouring word for the others (? / ✗ of 40–130 ms; picture +2–4 f from the stamp's 0.07 s alpha ramp); the logo marker sits next to the end-card iris (−5 f).
  Picture and sound read the same event times from events.js, so they cannot drift; not re-rendered.
- **Thumbnail:** tools/thumb.js + thumb.sh — line-art Earth on the blueprint sheet with a yellow "$ ???" price tag, WHAT IS / EARTH / WORTH?, "$1,152 T" in digit
  boxes, Pip pointing. Also attached in Metricool as the video thumbnail (only shows if the channel is verified).
- **Media:** whyverse-media/ep07/ (normal commit on top of the branch).

## Built per chapter
| t | chapter | on screen |
|---|---|---|
| 0:00 | cold open | auction hall drawn in line art, lights dim, hammer rises, LOT No. 001 + line-art globe, tiny people around it; bidders' paddles $1M / $1B, coins rain, EVERY COIN?; home + company + gold bars → $500 TRILLION +; the dashed missing slot "?", gold/oil/land crossed; three promise cards, Pip flies in ("hi, I'm Pip!"); title words slam over the globe, WHYVERSE |
| 0:54 | 1 Everything we own | UBS ledger (houses, savings, shares, pensions +, debts −); $518 T counter, END OF 2025, ONLY 56 MARKETS ≈ 92 %; 500,000,000,000,000 in boxes, stopwatch, 16 MILLION YEARS timeline with the 300,000-year human sliver; 12 equal bars → ≈ $130,000 → BUT IT ISN'T (uneven bars); +11 % bar chart, ≈ 1,000,000 new millionaires; "right under our feet"; city skyline + $393 T + stacked bar homes 73 % / commercial / farmland; balance scale real estate vs shares + bonds + gold; gold bars + "?" |
| 2:17 | 2 The gold myth | mountain? city? crossed → 224,000 TONNES; bars melt into a cube, 22.6 m dimension lines, zoom out onto a football pitch with people walking around it; rings/coins/bank bars fly into the cube, vault ring; donut jewellery 44 % / central banks 18 % / bars + coins 21 % / other 17 %; worked example 7.2 bn oz × ≈ $3,900 = ≈ $28 T; 20 boxes, 1 gold = 1/20 → MYTH; banknotes flutter, "maybe it's money?" |
| 3:18 | 3 Where is the money? | US outline, SEPTEMBER 2026, $23 T (M2); 10 stacks, 1 yellow = $2.4 T paper + coins, 1 IN 10; bank screen of scrolling digits, card TAP → −$4 flies in; deposit → bank → loan → someone else → new deposit loop with coins; house + $500,000 tag + buyer, PRICE = WHAT SOMEONE PAYS TODAY; street of SALE signs at sunrise, price line CRASH, value dots evaporate; WORTH ≠ A PILE OF STUFF / WORTH = A PRICE, tree + cloud + sea, "$ ???" tag crossed |
| 4:22 | 4 The free stuff | landscape draws itself (forest + air, wetland, flowers + bees, ocean + fish) with tags; the 2014 Costanza paper + Pip; INVOICE TO HUMANITY $125 T EVERY YEAR "never sent"; bars $75 T economy vs $125 T nature, FOR FREE; trees fall, wetland drains, $4–20 T PER YEAR lost; rain bounces off the $518 T box, NOT COUNTED; ESTIMATE ≠ PRICE, "what else is missing?" |
| 5:30 | 5 The biggest asset is you | WEALTH = buildings + machines (turning gear) + nature + PEOPLE (glowing); NOT FOR SALE, a working life age 20 → 65 collecting coins, skills / health / education icons; $1,152 T, 13 × WORLD GDP, 1,000,000,000,000,000; 64 % ring HUMAN CAPITAL → US.; school + hospital → balance sheet, "PEOPLE = A COST?" crossed, PEOPLE: MOST OF IT; nurse, farmer, student grow, the gold cube shrinks to "small change"; globe + "$ ?" tag |
| 6:36 | 6 Pricing a planet | Earth cutaway (crust/mantle/core glow), Ø 12,742 km, MASS 5.97 × 10²⁴ kg, ≈ 32 % iron; worked equation → 1.9 × 10²¹ t of iron, ore pile + $90 / t tag; × $90 = $1.7 × 10²³, $170,000,000,000,000,000,000,000 typed box by box, the human-wealth sliver vs a × 300,000,000+ bar; NONSENSE, shovel, painting vs paint tubes on a scale; telescope + stars + Laughlin's formula → ≈ $5 QUADRILLION; both price tags crossed, empty BUYER / SELLER slots, Pip shrugs; NO MARKET / NO PRICE |
| 7:41 | payoff + end card | globe + Pip thinking; three answer cards $518 T+ / $1,152 T / +$125 T/yr; NO AUCTION / NO SECOND EARTH / NO BIDDER crossed → PRICELESS, "nothing to compare it to"; back at the auction, the hammer never falls, camera pulls back: everyone is standing on the planet; WHYVERSE end card, LIKE, SUBSCRIBE, handles, Pip waves and flies off |

## Cut Short (1 published, QUALITY RESET)
| file | from → to | hook (first 2 s) | payoff |
|---|---|---|---|
| ep07_s1_gold_cube | 2:20.6 → 2:43.0 (c2_1h → c2_3, 22.4 s, 9:16, 60 fps) | HOW BIG IS ALL THE GOLD EVER MINED? (+ the spoken "Picture all the gold ever mined…") | 224,000 tonnes → one 22.6 m cube that fits on a football pitch; last caption FULL VIDEO ON OUR YOUTUBE: WHYVERSE |
Other good cuts if wanted later: 1:23 → 1:33 (count a dollar a second: 16 million years); 6:53 → 7:19 (Earth at the scrapyard: 170 sextillion dollars, "nonsense").

## Sources
See RESEARCH.md (every number with its link, plus what was deliberately NOT said). Key: UBS Global Wealth Report 2026; Savills (Sep 2025); World Gold Council
above-ground stocks (Q3 2026); USAGOLD / Trading Economics gold spot 13 Nov 2026; US Federal Reserve H.6 (Sep 2026); Costanza et al. 2014; World Bank, The Changing
Wealth of Nations 2021; NASA Earth Fact Sheet; McDonough 2003; Kallanish / GMK Center iron ore; Kottke / Marron on Greg Laughlin's 2011 formula.

## Known weak spots
- Several shots open on an almost empty sheet for ~0.5–1 s before the first word draws its prop (c3 S1 US outline, c4 S4 bars, c3 S7 panel, c7 S3 crosses). The grid
  drifts and Pip hovers, but those first beats are calm.
- The ≈ $518 tn is our sum of UBS's pyramid bands for 56 markets (said as "add up the figures"); the $1,152 tn World Bank figure is for 2018 — two different measures, explained in the voice.
- Fallen trees in the c4 loss shot read a little like flat circles; the tree prop's crown is simple.
- The c7 pull-back (people standing all around the globe) happens in the last ~2 s before the end card — short.
- Title words: Pip sits close to "WORLD" at the right; the "$ ???" tag line in the thumbnail is hidden behind the tag.
- Pronunciation of "UBS", "Costanza", "Laughlin", "sextillion", "quadrillion" was not checked by ear; levels checked by measurement only.
