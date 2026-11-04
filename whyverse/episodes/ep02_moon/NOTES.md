# Ep02 — What if the Moon disappeared? — NOTES

status: DONE — scheduled 2026-11-05 (YouTube 19:00 London; 5 Shorts on YouTube/Instagram/TikTok 6–8 Nov, see ../../posts.json, PUBLISH.md)

- **Topic choice:** trend check first (2026-11-05 00:30 Baku): the world news is dominated by the US midterm results (3 Nov),
  which has no lasting "why / what if" science angle and would go stale in days. Nothing else trending fit, so this is the
  first evergreen in the PLAN.md queue without a finished episode (#2 Moon). It is also timely for weeks: supermoons on
  24 Nov and 24 Dec 2026, Great Barrier Reef spawning season (Oct–Dec), Artemis II flew around the Moon in April 2026.
- **Style (STYLE ROTATION #2):** realistic 3D three.js space shots + flat data overlays. Earth with day/night shader,
  city lights, clouds and atmosphere, a bump-mapped Moon (NASA-based three.js example textures), 7,000-star field and a
  procedural Milky Way, rendered in WebGL (SwiftShader) into the animation-studio canvas (film/m3d.js, cam.js); flat HUD
  on top: dark glass panels, Bungee + Inter, gold → coral accents, the Whyverse planet. Flat 2D scenes for the Earth-bound
  stories (landscape, dung beetle, Arctic sea, Bay of Fundy, shore, reef). Guide character: **Luna**, a flat cartoon
  Moon (film/luna.js) who lip-syncs to the voice and reacts (waves, worried, cheering, tiptoes away, crumbles on the thumbnail).
- **FEEDBACK applied:** no boil anywhere (flat style; text static); one camera shake only (Theia impact, 6 px, 0.3 s);
  pushes ≤ 3 %; a hook line after every chapter title; end card with spoken + animated CTA (like, subscribe, Instagram
  @whyverse___, TikTok @Whyverse); no tease of a next episode; no burned-in subtitles (ep02_moon.srt instead).
- **Voice:** Kokoro v1.0 int8, `af_heart`, en-us, one wav per line (70 lines, 1,349 words, 431 s of speech).
- **Length:** 8:21 (501.5 s), 1920×1080, 30 fps. Final: film/out/ep02_moon.mp4 (not in git; on whyverse-media).
- **Sound:** one score timeline (film/events.js → score.js → ch*.js + song.js): 200 named hits, each with its own synth SFX
  (vanish, light switch, zaps, blips, shimmer, bubbles, splash, brake, impact…). Music bed per chapter (e-piano / music box /
  marimba / guitar moods), ducked and levelled to −23 dB vs the voice; SFX −20 dB; title + chapter stings −14 dB where no
  voice; master −14 LUFS, true peak ≤ −1.5 dBTP. Checked by measurement, not by listening.

## Built per chapter
| t | chapter | on screen |
|---|---|---|
| 0:00 | cold open | 3D Earth + Moon; the Moon pops on "Gone"; 1.3 s light-in-flight timer, the last moonlight lands, MOONLIGHT: OFF; Luna returns (THOUGHT EXPERIMENT); 4 tiles; giant 3D Moon, spoken question, stamped title, the Moon pops |
| 0:37 | 1 The night goes dark | Moon close-up + albedo panel (12 %, worn asphalt); log lux scale, Sun 400,000×; landscape goes moonless, lamps pop, flashlight gag; dung beetle under polarization rings (2003); Arctic zooplankton follow the Moon |
| 1:38 | 2 The tides shrink | pull arrows + bulge shell; top-down spin under the bulges with a tide chart, 2 a day, +50 min; Moon 100 % vs Sun ≈46 %; columns today vs ⅓; Bay of Fundy 16.3 m; shore strip narrows |
| 2:39 | 3 The reef that waits for the Moon | night reef; Australia map + GBR, Oct/Nov/Dec full moons + 1–6 nights; mass spawning "snow falling up"; two corals' clocks, bundles meet; WARM WATER / THE MOON, NOW: SPAWNING SEASON; clocks drift apart |
| 3:26 | 4 A wobbling planet? | 3D Earth with axis, 23.4°; dial 22.1–24.5° / 41,000 yr; Laskar 1993 chaos to 85°; Earth on its side; Lissauer 2012 band ~20–25° wide; verdict + Luna |
| 4:33 | 5 The brake on Earth's spin | top-down bulge dragged ahead; tug + BRAKE; day-length chart 18 h → 21.9 h → 24 h, ~400 days/yr; +0.002 s per century; BRAKE OFF; spin → orbit, Moon drifts |
| 5:29 | 6 The things we'd lose | 400× wider / 400× farther; totality + corona; 1868 yellow line → He; 1919 bending starlight; MONTH ← moon, 365 vs 354–355; 12 moonwalkers + Artemis II loop |
| 6:39 | 7 The real news | laser to the Apollo mirrors, 2.5 s round trip; 3.8 cm ruler vs fingernail; Theia impact + debris → close young Moon (15–20×); shrinking Moon disc, eclipses fade (~600 Myr); WON'T ESCAPE |
| 7:34 | payoff + end card | moonless Earth DARKER / QUIETER / WOBBLIER; ✗ tiles → ✓ tiles callback; the Moon returns in the cold-open shot; supermoons 24 Nov / 24 Dec, LOOK UP; end card CTA |

## Sources
All numbers with links: RESEARCH.md (every item read tonight by a research pass; nuances applied: NOAA says "about half"
for the Sun's tide; Lissauer 2012 is a 20–25° *range*, not 20–25° values — the script line was rewritten for that;
moonlight "about a tenth of a lux"; "maybe 15–20× closer" from Canup's 3–4 Earth radii).

## Shorts (built with tools/make_shorts.py, 9:16, burned-in word captions)
1. 0:00.8–0:23.7 — "Moon gone? You'd notice 1.3 s later." → Fri 6 Nov 23:00 London
2. 0:41.1–1:01.0 — "The Moon is as dark as old asphalt." → Sat 7 Nov 17:00
3. 2:43.2–3:13.6 — "A whole reef waits for the Moon." → Sat 7 Nov 23:00
4. 4:37.6–5:09.3 — "A day on Earth used to be 18 hours." → Sun 8 Nov 17:00
5. 6:43.3–7:08.8 — "The Moon is leaving us." → Sun 8 Nov 23:00

## Verify (skill's ±20 ms / ±1 frame check on the final mp4)
- Sound: title stamps 4/5 ✓ (title_4 +100 ms: the brass attack is soft, same as ep01); picture hits animate in (pop/stamp over
  0.15–0.25 s) so they measure +3–5 frames late; totality ✓ (0 f) and impact ✓ (0 f). Same event time drives both sides.
- Loudness −14.0 LUFS, true peak −1.2 dBTP. Final 34.1 MB (CRF 29), 8:21.5.
- The VM restarted at frame ~13,440 of the render; the two half-written segments were recovered (raw H.264 salvaged from
  the mdat with x264's SPS/PPS) and the 1,709 missing frames were re-rendered, then joined and checked (15,046 frames,
  seams at 3:37 and 7:58 looked at frame by frame).

## Known weak spots
- 3D is software-rendered (SwiftShader) at 0.75× internal scale and upscaled: Earth/Moon edges are a touch soft.
- Dung beetle and the shore creatures are simple flat icons; the Arctic plankton "lunar day" is stylised (fast-forwarded).
- The tidal bulge and the Earth–Moon distance are hugely exaggerated / not to scale (labelled on screen).
- Voice word timings are estimated (Kokoro gives no timestamps): word-synced pops can be ~0.1–0.3 s off.
- SFX sit −20 dB under the voice as asked; on phone speakers many will be felt more than heard.
