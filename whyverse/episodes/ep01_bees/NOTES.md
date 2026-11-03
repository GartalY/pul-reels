# Ep01 — What if every bee disappeared? — NOTES

status: DONE — v3 PUBLISHED (scheduled 2026-11-03): YouTube 19:00 London; 5 Shorts on YouTube/Instagram/TikTok 4–6 Nov (see ../../posts.json, PUBLISH.md)

v3 changes after Gartal's review (2026-11-03): Moon tease cut; a spoken + on-screen HOOK after every chapter title;
end card call to action (like, subscribe, Instagram @whyverse___, TikTok @Whyverse). Length 9:00 (540.5 s), 78 MB, CRF 29.

- **Style:** animation-studio `paper` cut-out storybook (boiling pencil lines, hatching, torn-paper notes and tape),
  Whyverse palette (navy night skies, gold → coral accents, blue ringed planet on the title and end card).
  Guide character: a custom paper bee (film/bee.js) who lip-syncs to the narration and acts in most shots
  (shopping basket, waving, worried eyes, a 3× "blueprint" close-up). Plus `Ch.person` farmers and a beekeeper,
  `Data.map` maps (China, USA), counters, bars, donuts, line chart and a lot of hand-made paper props (film/lib.js).
- **Voice:** Kokoro v1.0 int8, `af_heart`, en-us, one wav per line (74 lines, 1,247 words, 435 s of speech).
- **Length:** 8:19 (499.5 s), 1920×1080, 30 fps, H.264 CRF 27 + AAC 160k, 92 MB, −14.0 LUFS. Final file: `film/out/ep01_bees.mp4` (not in git). Subtitles: `ep01_bees.srt` (224 cues, no burned-in subs).
- **Render:** 14,985 frames rendered twice (v1 for review, v2 after fixing what the v1 contact sheets showed), ~70 min each on 2 CPUs.
- **Sound:** one score timeline: every visual hit is a named event in film/events.js, read by both film (ch*.js) and
  song.js. Music bed (chapter moods: music box / marimba / guitar / e-piano, pads, bass, light shaker) is
  ducked under the voice and levelled to −23 dB vs the voice; sound effects are levelled to −20 dB vs the voice
  (measured per hit). Master −14 LUFS, true peak ≤ −1.5 dBTP.

## Built per chapter
| t | chapter | what's on screen |
|---|---|---|
| 0:00 | cold open | bee lands on a torn quote card, the fake Einstein quote handwrites itself word-by-word with the voice, NEVER SAID IT stamp, 1955→1965 timeline with a magazine cut-out, 12 bees vanish one per beat, doom-Earth → record scratch → supermarket |
| 0:36 | title | WHAT IF EVERY BEE DISAPPEARED? — five torn-paper word stamps on brass hits, Whyverse planet |
| 0:40 | 1 What a bee actually does | bee goes shopping (nectar/pollen tags), pollen sticks to her fur and rides to the next flower, flower cross-section (grain → tube → ovary swells into an apple → seeds), smaller / misshapen / no fruit, 20,000 species counter + parade of bee kinds, tiny bee by a rice grain, honey jar "1 of ~20,000" |
| 1:26 | 2 The supermarket test | store, bee waves goodbye; 87 vs 28 crops counting up; >¾ donut + $577 bn; one long shelf with a camera pan (fruit → veg → nuts & coffee), stock pops away, price tags flip to $$$; whip to the bread/rice/pasta aisle, wind over grain; 60/35/5 % by weight; calories ✓ / colour ✗ plates |
| 2:45 | 3 The human bees | China map dive to Maoxian, valley blossoms, sprays ×10 + forest → farmland, LATE 1980s, three farmers; collect → pollen stock → ladder + 8 dabs; 100 % BY HAND (2001); clock + five day cards; 5–10 trees a day; workers to the cities, $2 → $12–19 ×10; apples swap to plums / loquats / walnuts; <$0.20 vs ≈$2 per kg; SLOWLY / EXPENSIVELY / NOT FOR LONG |
| 4:04 | 4 One valley, almost every hive | US map dive into the Central Valley; acre plots with 2 hives each; trucks with hives converge from 8 cities; 2.7 million counter + two equal hive stacks; $180 swinging price tag; $320M+ and the ~80 % donut; truck convoy + ONE CROP / ONE VALLEY / ALMOST EVERY HIVE |
| 4:59 | 5 The health bill | piggy bank → heart; night globe with 6 pollinators popping away; supply bars drop −23/−16/−22 %; 71M + 173M people grids; zoom out to 2.2 billion; disease icons; 1.4 million + 100 figures; blueprint MODEL; 3–5 % slice; 427,000 + NOW |
| 6:17 | 6 Who else is out there? | WAIT! + line-up of other pollinators; cacao trunk + magnifier on a midge, 1–3 mm ruler; chocolate SURVIVES …probably; visitors land on flowers, day → night, agave + bat; blueprint bee with labelled hairs and pollen loads; SMALLER / PLAINER / HARDER |
| 7:01 | 7 The real news | +300 % line with the bee riding it; NOT ALL AT ONCE + beekeeper replacing hives; >40 % of wild species crossed out; why? → habitat / pesticides / climate; wildflower strip sprouts, smarter sprays, wild corner, bees come back |
| 7:53 | payoff + tease | FAKE quote card, "but a real question"; plate linked to 7 flowers by tiny bee deliveries; the Moon rises and pops away ("What if the Moon disappeared?"); end card |

## Sources (every number in the script)
- Fake Einstein quote, earliest known 1965 French magazine: Quote Investigator, https://quoteinvestigator.com/2013/08/27/einstein-bees/ (from RESEARCH.md, checked 2026-11-02; site refused automated fetch tonight)
- 87 leading crops depend on animal pollination, 28 don't; by production volume 60 % no animal pollination / 35 % pollinator-dependent / 5 % unevaluated: Klein et al. 2007, Proc. R. Soc. B 274:303–313 (abstract re-checked tonight) https://ncipmhort.cfans.umn.edu/sites/ncipmhort.cfans.umn.edu/files/2020-06/importance%20of%20pollinators%20landscapes.pdf
- >75 % of food crop types rely at least partly on pollinators; crops directly affected worth US$235–577 bn/yr; ~20,000 wild bee species; >40 % of invertebrate pollinator species face extinction where assessed; pollinator-dependent production +300 % in 50 years: IPBES press release 2016, https://ipbes.net/article/press-release-pollinators-vital-our-food-supply-under-threat (from RESEARCH.md; fetch refused tonight)
- Maoxian: large-scale hand pollination since the late 1980s; 2001 study: 100 % of apples hand-pollinated; ~4 decades of 8–10 sprays/season; habitat → farmland; within 5 days of blossoming; 5–10 trees/person/day; US$2/day (2000) → US$12–19/day, ~10× from labour migration; switch to plum, loquat, walnut; apples US$0.16–0.19/kg vs plums US$1.9–2.5/kg: Partap & Tang Ya 2012, Mountain Research and Development 32(2) https://bioone.org/journals/mountain-research-and-development/volume-32/issue-2/MRD-JOURNAL-D-11-00108.1/The-Human-Pollinators-of-Fruit-Crops-in-Maoxian-County-Sichuan/10.1659/MRD-JOURNAL-D-11-00108.1.full (re-checked tonight)
- California ≈ 80 % of the world's almonds ("most" in the script): Almond Board of California https://www.almonds.org/why-almonds/ca-advantage
- ~2 hives per acre (mature orchard): Almond Board / UC Davis slides https://www.almonds.org/sites/default/files/2025-12/Honey%20Bees%20%26%20Pollination.pdf
- ~2.7 million colonies for the 2024 bloom ≈ all US colonies on 1 Jan 2024: farmdoc daily, Feb 2025 https://farmdocdaily.illinois.edu/2025/02/where-have-all-the-honey-bees-gone-to-california-almond-orchards.html (from RESEARCH.md; Beewise 2024 also gives ">2.5 million colonies" https://beewise.ag/blog/2024-almond-pollination)
- Almond fee ≈ $181/colony in 2024; almond pollination $325.8 M = ~81 % of US pollination receipts: USDA ERS Charts of Note, 18 Jun 2025 https://ers.usda.gov/data-products/charts-of-note/112782
- Full loss of animal pollinators: fruit −22.9 %, vegetables −16.3 %, nuts/seeds −22.1 %; +71 M vitamin A deficient, +173 M folate deficient; 2.2 bn already below vitamin A needs; 1.42 M extra deaths/yr (+2.7 %); heart disease, stroke, diabetes, some cancers: Smith et al. 2015, The Lancet https://scholar.harvard.edu/sites/scholar.harvard.edu/files/mattsmith/files/lancet_smith_et_al_2015.pdf
- Today: 3–5 % loss of fruit, veg and nuts, ~427,000 excess deaths/yr: Smith et al. 2022, Environ. Health Perspect. 130(12) https://www.sciencedaily.com/releases/2022/12/221214092320.htm
- Cacao pollinated by midges 1–3 mm: Natural History Museum https://www.nhm.ac.uk/discover/flies-are-saving-your-chocolate-cravings.html
- Bats pollinate agave (tequila): e.g. https://www.museumfuernaturkunde.berlin/en/salud-a-bat-saves-tequila
- Bees smaller than a grain of rice (Perdita minima, ~2 mm): USDA Forest Service https://www.fs.usda.gov/wildflowers/pollinators/pollinator-of-the-month/perdita_minima.shtml

## Shorts (v3 times; built with tools/make_shorts.py, 9:16 framed; scheduled — see PUBLISH.md)
1. 0:00.8–0:24.0 — "Einstein never said this about bees." → Wed 4 Nov 17:00 London
2. 2:27.8–2:56.8 — "No bees? Bread survives. Colour doesn't." → Wed 4 Nov 23:00
3. 3:25.9–3:54.9 — "Every apple here was pollinated by hand." (Maoxian) → Thu 5 Nov 17:00
4. 4:34.4–5:22.0 — "Almost every beehive in America drives to one valley." → Thu 5 Nov 23:00
5. 6:53.3–7:11.6 — "Chocolate doesn't need bees." → Fri 6 Nov 17:00
(not used: the 427,000-deaths segment, too easy to misread without the model caveat)

## Verify (skill's sound ±20 ms / picture ±1 frame check on the final mp4)
- Title stamps: picture +1 frame on all 5 ✓; sound: 2 ✓, 1 ✗ (+95 ms: the brass stab's attack is softer than its body), 2 "?" (stamp and brass onsets too close to tell apart). Same event time drives both, so this is attack shape, not drift.
- Picture-only hits: NOW ✓; NEVER SAID IT +2 f and the logo +2 f (both scale in over ~0.15 s); the Moon "pop" +7 f (it fades out over 0.25 s). Visible, not out of sync — the hit animates in.
- The audio was checked by measurement (levels, LUFS, true peak), not by listening.

## Known weak spots
- Food/props are flat icons; some shots (weight bar, farm-gate prices, clock) start with 1–2 s before their main element lands.
- Voice word timings are estimated from pauses + character counts (Kokoro gives no timestamps), so word-synced pops can be ~0.1–0.3 s off.
- SFX are kept −20 dB under the voice as asked; on phone speakers many of them will be felt more than heard.
- Map borders are Natural Earth de facto lines.
