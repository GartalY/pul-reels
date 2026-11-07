# Ep03 — Why is the sky dark at night? — NOTES

status: DONE — scheduled 2026-11-08 (YouTube 19:00 London; 5 Shorts on YouTube/Instagram/TikTok 9–11 Nov, see ../../posts.json, PUBLISH.md)

- **Topic choice:** trend check first (2026-11-08 00:30 Baku = 7 Nov 20:30 London): world news searches turned up post-election US
  politics and Middle East headlines — nothing with a lasting "why / what if" science angle. Science/space news (DART/Hera, a new
  comet C/2026 S1) was too small or too early. So this is the first evergreen in the PLAN.md queue without a finished episode
  (#3 Olbers' paradox). It stays timely for weeks: long November nights, the Leonids peak around 17 Nov.
- **Style (STYLE ROTATION #3): 'neon'** — deep navy-violet night, glowing tube lines (halo + body + hot core, additive), bloom
  post-pass, Bungee neon-sign titles that flicker on, Whyverse gold → coral + cyan/magenta/violet. Guide character **Nova**, a
  small neon star (film/nova.js): lip-syncs, sunglasses when the sky blazes, sweats in the "oven", microwave goggles, lies back to
  watch the Leonids, waves on the end card. Historical people as neon line portraits (P.bust: Kepler, Halley, Olbers, Poe, Kelvin,
  Penzias, Wilson) — icons, no likeness claimed.
- **FEEDBACK applied:** text never boils (textBoil 0; shapes amp 0.12); one shake only (the "picture cracks" hit, 6 px, 0.3 s);
  pushes ≤ 3 %; a spoken + on-screen HOOK after every chapter title; end card with spoken + animated CTA (like, subscribe,
  Instagram @whyverse___, TikTok @Whyverse); no tease or mention of a next episode; no burned-in subtitles (ep03_darksky.srt).
- **Voice:** Kokoro v1.0 int8, `af_heart`, en-us, one wav per line (63 lines, 1,297 words, 415 s of speech).
- **Length:** 8:04 (484.0 s), 1920×1080, 30 fps. Final: film/out/ep03_darksky.mp4 (not in git; on whyverse-media).
- **Sound:** one score timeline (film/events.js → score.js → ch*.js + song.js), 220+ named hits, each with a synth SFX (new this
  episode: neon buzz-on, crack, wing flaps, wave stretch, tape rewind, antenna hiss, meteor swish, splat). Music bed per chapter,
  ducked + levelled to −23 dB vs the voice; SFX −20 dB; title/chapter stings −14 dB where no voice; master −14 LUFS,
  true peak ≤ −1.5 dBTP. Checked by measurement, not by listening.
- **Render:** 14,520 frames in 3,590 s (4.0 fps, 2 Chromium workers). Encode libx264 medium CRF 29 + AAC 160k, +faststart → 30.4 MB, 484.0 s, −14.0 LUFS integrated.
- **verify:** paradox, oven, crack ✓ (±1 frame). The title's seven neon words come 0.27 s apart with a buzz-on flicker, so verify sees two near-equal onsets (?) and the flicker settle (+8 f) on two of them; cmb/logo are fades, not hard cuts (±2–3 f). Picture and sound read the same event times from events.js, so they cannot drift; not re-rendered for this.
- **Media:** whyverse-media/ep03/ (ep03_darksky_long.mp4, ep03_s1…s5, thumbnail). Force-push of a fresh orphan commit was blocked by the session's safety check, so this run added a normal commit on top of the branch instead (branch now ~190 MB in total).

## Built per chapter
| t | chapter | on screen |
|---|---|---|
| 0:00 | cold open | Nova pops up over neon hills, camera tilts up, rings circle the black gaps; Sun sets, 0 → 400 YEARS, GREAT PUZZLE; ENDLESS/ETERNAL/FULL OF STARS → the sky fills with stars until it blazes white-gold (Nova's sunglasses); neon "?" clue; 7-word neon title |
| 0:39 | 1 A forest of stars | top-down forest with 8 sight lines stopping on trunks; eye-level panorama, near wide/far thin, coverage bar → ONLY WOOD; trunks morph into stars; the wall of starlight (NO GAPS, DAY/NIGHT); timeline Kepler 1610 · Halley 1720s · de Chéseaux 1744 · Olbers 1823 → OLBERS' PARADOX |
| 1:35 | 2 Far away doesn't help | five onion shells around Earth; cone of sky: ¼ as bright but 4× the stars; ¼ × 4 = 1 + equal bars; shells stack up as "your sky" fills; Σ = ∞?, −270 → 5,500 °C, thermometer, Nova sweats, AN OVEN |
| 2:29 | 3 The wrong answers | Olbers' dust clouds block rays; dust heats dark → red → white (IT GLOWS TOO); stars clump into galaxies, zoom out until the gaps close; the three-assumption neon sign cracks, ETERNAL flickers out |
| 3:11 | 4 A poet's answer | Poe portrait + raven, 1848, EUREKA, his own sentence lights up word by word; light wave crosses space, 299,792 km/s, NOT FOREVER; Moon ~1 s / Sun ~8 min / Andromeda 2.5 Myr cards; 13.8-billion-year bubble; GAPS; Webb deep field < 300 Myr; Kelvin 1901 + log timeline 10^9…10^24, TRILLIONS OF TIMES TOO YOUNG, a star burns out |
| 4:34 | 5 The glowing wall | expanding grid stretches a wave blue → red; Webb + visible/infrared bands; ◀◀ rewind into glowing gas, 3,000 K, OLBERS' WALL WAS REAL; 380,000 years, the fog clears leaving a glowing shell, light streams in; ×1000 stretch, 3,000 → 2.7 K, MICROWAVES; Penzias & Wilson, horn antenna, hiss scope, pigeons evicted, IT WAS THE GLOW; microwave goggles → the glowing oval sky |
| 6:05 | 6 The darkness we're losing | world map with city lights, > ⅓ of humanity (people grid), ~80 % North Americans donut; split screen dark site ~2,500 stars vs city "a few dozen"; GETTING WORSE, 51,351 people, brightness line ≈ +10 %/yr ≈ 2.7×; child's sky 0 → 18 years, 250 → 100 stars; birds round a lit tower, turtles walk to the city; SHIELD IT / WARMER BULBS / SWITCH OFF → stars return |
| 7:11 | payoff + end card | three neon reasons; dive ×60 into a black gap → faint galaxies → the ancient glow; a child's "?" answered by poet, physicist, radio scientists, pigeon droppings; Leonids over the hills, Nova lies back, LOOK UP; end card: WHYVERSE planet, LIKE, SUBSCRIBE → SUBSCRIBED, @whyverse___ / @Whyverse, Nova waves |

## Shorts cut points (made with tools/make_shorts.py, burned-in captions)
| # | file | from → to | hook |
|---|---|---|---|
| 1 | ep03_s1_blaze | 0:00.8 → 0:26.8 (c0_1 → c0_4) | THE NIGHT SKY SHOULD BE BLAZING |
| 2 | ep03_s2_forest | 0:48.8 → 1:19.7 (c1_2 → c1_5) | WHERE COULD YOU LOOK AND SEE NO STAR? |
| 3 | ep03_s3_oven | 1:53.0 → 2:29.7 (c2_3 → c2_7) | FAR STARS DON'T FADE AWAY |
| 4 | ep03_s4_poet | 3:14.7 → 4:00.5 (c4_1h → c4_5) | A POET GUESSED IT FIRST |
| 5 | ep03_s5_pigeons | 5:41.0 → 6:05.7 (c5_7 → c5_8) | THE HISS FROM THE BIG BANG |

## Sources
See RESEARCH.md (every number with its link). Key: Wikipedia "Olbers's paradox" (history, Kelvin 1901, 10^23 yr, absorption);
Poe, Eureka (1848); Planck 2018/NASA (13.8 Gyr); NASA Sun facts; NASA Webb (JADES-GS-z14-0, 2024); OpenStax/Lumen CMB
(380,000 yr, 3,000 K, ×1000, 2.73 K); NASA WMAP (1 part in 100,000); APS + Smithsonian (Penzias & Wilson, pigeons);
Science News on Falchi et al. 2016; Phys.org on Kyba et al. 2023 (Science); DarkSky International (wildlife, lighting);
IMO/Space.com (Leonids ~17 Nov).

## Known weak spots
- Portraits are generic neon icons (deliberately no likeness) — they read as "a person", not as the real faces.
- The top-down forest and the "your sky" window are dense small dots; on a phone they are busy but fine, on a TV they look grainy.
- Some shots hold a calm layout for 3–4 s while the voice explains (stars twinkle and Nova floats, but the composition is still).
- The microwave-sky oval is stylised (real CMB maps show the tiny 1-in-100,000 ripples exaggerated) — footnoted on screen.
- "≈2.7× brighter" and "trillions of times too young" are my arithmetic from the sourced rates (noted in RESEARCH.md).
- The dive into the black gap (7:20) passes through ~1 s of almost-empty frame before the faint galaxies appear.
- Sound checked by measurement only.
