# Outliers and flops — running log (@bilirdinizmi_az)

Rule (from 2026-10-25): each weekly review pulls ALL posts and reels since launch (2026-10-15), ignores pieces
< 72 h old, computes the median reach separately for carousels/images and for reels, and flags
OUTLIER = reach ≥ 2× its format median, FLOP = reach ≤ 0.5× its format median.
A piece is logged once, in the first review where it is ≥ 72 h old. Times are Baku time.
Hook types: number · surprise · local AZ · 'you' · on-this-day · news (combinations allowed).
Conclusions only when ≥ 2 outliers (or flops) share a pattern; otherwise "not enough data yet".

## Review 2026-10-25 (data synced to 24 Oct 21:32; eligible = posted before 22 Oct 21:15)
Medians: carousels/images **30** reach (n = 15) · reels **129.5** reach (n = 14), avg watch 3.7 s, >3 s rate 28.3 %.

| Piece | Format | Posted | Cat | Hook (first line) | Hook type | Reach | × median | Avg watch | >3 s | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| Şollar water pipeline | reel | 21 Oct 13:04 | Azərbaycan | "Bakı 109 ildir bu kəmərdən su alır" | number + local AZ (personally touched: tap water) | 1 414 | 10.9× | 11.1 s (3.0× med.) | 57.8 % | OUTLIER |
| First computer "bug" | reel | 22 Oct 16:03 | Texnologiya | "İlk kompüter «baqı» əsl böcək idi" | surprise (tech origin, no number) | 64 | 0.49× | 3.0 s | 21.7 % | FLOP |
| First webcam = coffee pot | reel | 19 Oct 16:03 | Texnologiya | "Dünyanın ilk veb-kamerası... qəhvədana baxırdı" | surprise (tech origin, no number) | 21 | 0.16× | 6.0 s | 25.0 % | FLOP |

No carousel outliers or flops (range 0.57×–1.67×).

Watch list for the 2026-11-01 review (too young today, already far from the median):
- "1 gün = 18 saat" reel, 23 Oct 16:04 — 1 386 reach (10.7×), 17.5 s avg watch, 55 % >3 s — number + 'you' (your own day). Likely OUTLIER.
- "Ən çox saat qurşağı olan ölkə… Fransadır" reel, 24 Oct 16:03 — 53 reach (0.41×), 23 % — surprise, no number. Likely FLOP.
- Carousels France protests 2 (15), Annie Taylor TBG (14), El Clásico 106–106 (15) — all ≈ 0.5×.

## Hook ranking (as of 2026-10-25)
| Hook type | Outliers | Flops |
|---|---|---|
| number + local AZ / something the viewer personally touches | 1 | 0 |
| surprise "the first X was really Y" (tech origin, no number) | 0 | 2 |
| on-this-day | 0 | 0 |
| news | 0 | 0 |

Conclusions so far:
- Outliers: **not enough data yet** (1 eligible outlier). Provisional: both 10×-reels (Şollar, 18 h) open on a precise
  number about something the viewer personally touches — confirm next week when the 18 h reel becomes eligible.
- Flops: **2 flops share a pattern** — technology-origin stories ("the first webcam/bug was…") as reels with a
  surprise hook and no number. The third tech-origin reel (bubble wrap, 80 reach, 0.62×) was the next weakest.
  Both flops ran at 16:00, but the 16:00 slot also produced the 18 h hit and the beaked whale (136), so the topic/hook,
  not the hour, is the likely cause. → Applied to RUNBOOK 2026-10-25.

## Review 2026-11-01 (IG reels synced to 31 Oct 21:31; eligible = posted before 29 Oct 21:15)
Medians: reels **146** reach (n = 38), avg watch 4.4 s, >3 s 32 % · carousels/images **24** (n = 25).

### Instagram
| Piece | Format | Posted | Cat | Hook (first line) | Hook type | Reach | × median | Avg watch | >3 s | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| Neptune found by maths | reel | 25 Oct 16:03 | Kosmos | "1846: Neptunu əvvəlcə kağız üzərində tapdılar" | number + space surprise | 1 622 | 11.1× | 9.9 s | 59.9 % | OUTLIER |
| 1 day = 18 hours | reel | 23 Oct 16:04 | Kosmos | "1 gün = 18 saat: Yer əvvəl belə fırlanırdı" | number + 'you' (your day) + space | 1 434 | 9.8× | 17.1 s | 54.5 % | OUTLIER |
| Boulevard soil brought by ships | reel (voiced) | 28 Oct 13:05 | Azərbaycan | "1880-ci illər: hər gəmi Bakıya torpaq gətirməli idi" | number + local AZ (place people walk) | 1 074 | 7.4× | 9.6 s | 62.7 % | OUTLIER |
| Osimhen sold water as a child | reel (trend) | 27 Oct 18:32 | İdman | "75 milyonluq futbolçu uşaqkən tıxacda su satırdı" | number + rags-to-riches + news | 494 | 3.4× | 5.1 s | 45.7 % | OUTLIER |
| Blue whale heart 2 bpm | reel | 24 Oct 21:32 | Təbiət | "Dəqiqədə cəmi 2 dəfə vuran ürək" | number + giant record | 400 | 2.7× | 7.5 s | 49.4 % | OUTLIER |
| First film shown in Baku | reel | 25 Oct 13:05 | Azərbaycan | "128 il əvvəl Bakıda ilk kino göstərildi" | number + local AZ | 326 | 2.2× | 4.8 s | 38.5 % | OUTLIER |
| Geese over the Himalaya | reel | 28 Oct 16:03 | Təbiət | "7 290 metr: bu qaz Himalayı aşır" | number (animal fact) | 29 | 0.20× | 4.8 s | 14.8 % | FLOP |
| Bee makes 1/12 tsp of honey | reel (voiced) | 26 Oct 16:03 | Təbiət | "1/12 çay qaşığı — bir arının bütün ömrü" | number (small animal fact) | 54 | 0.37× | 3.1 s | 8.9 % | FLOP |
| 3.8 M cells renewed per second | reel | 27 Oct 16:04 | Elm/bədən | "Hər saniyə 3,8 milyon hüceyrən yenilənir" | number + 'you' (body) | 55 | 0.38× | 4.2 s | 24.2 % | FLOP |

No new carousel outliers or flops (23–29 Oct carousels 0.79–1.12×). Launch-week images (50, 50), 17 Oct (53) and Como (48) now sit at
2.0–2.2× only because the carousel median fell 30 → 24; they were judged last week and are not re-logged.
Watch list for 2026-11-08: Göygöl (325, 54 %), Tardigrades (281 = 1.9×, 58 %), Spain crash (238), Jan Koum (37 = 0.25×, likely flop), Uranus (54 = 0.37×), Halloween (25, very young).

### TikTok (first review with ≥ 10 videos ≥ 72 h: 16 videos, median 86 views)
| Piece | Posted | Hook type | Views | × median | Avg watch | Verdict |
|---|---|---|---|---|---|---|
| Spain train crash (trend) | 29 Oct 18:31 | news | 235 | 2.7× | 7 s | OUTLIER |
| Tardigrades 10 days in space | 29 Oct 16:03 | number + surprise | 181 | 2.1× | 4 s | OUTLIER |
| Horse tram (AZ) | 29 Oct 13:04 | number + local AZ | 8 | 0.09× | 12 s | FLOP (likely copyright limit) |
| Ötzi repost | 29 Oct 19:45 | number | 3 | 0.03× | 9 s | FLOP (not distributed) |
| 18 h day repost | 29 Oct 11:02 | number + 'you' | 1 | 0.01× | 4 s | FLOP (not distributed) |
| Caspian 40 % | 28 Oct 21:30 | number + local AZ | 1 | 0.01× | 7 s | FLOP (not distributed) |
Watch: Göygöl 450 / 21 shares, Mişon repost 293 / 23 shares, Zoroastr repost 179 / 15 shares (30 Oct, AZ topics).

### YouTube Shorts (16 Shorts ≥ 72 h, median 799 views)
No outliers (best Boulevard 1 330 = 1.66×). FLOPS: horse tram 4 (copyright?), Osimhen 9 (duplicate upload after trend swap),
Sun 147, Şollar repost 151, blue whale repost 198, cells 284.

## Hook ranking (cumulative, Instagram)
| Hook type | Outliers | Flops |
|---|---|---|
| number + local AZ (Baku place/history people see or touch) | **3** (Şollar, Mişon cinema, Boulevard) | 0 |
| number + space surprise / "impossible" number | **2** (18 h, Neptune) | 0 |
| number + 'you' | 1 (18 h, also counted above) | 1 (cells) |
| number + rags-to-riches / news | 1 (Osimhen) | 0 |
| number + giant nature record | 1 (blue whale) | 0 |
| number + small animal/body fact | 0 | **3** (bee, cells, geese) |
| surprise "the first X was really Y" (tech origin, no number) | 0 | **2** (webcam, bug) |
| on-this-day / news (carousels) | 0 | 0 |

Conclusions so far:
- Every one of the 7 outliers opens on a precise number — but so did the 3 new flops. **A number is necessary, not sufficient.**
- **Confirmed (≥ 2): number + Baku place/history** (3 outliers) and **number + space "impossible" twist** (2 outliers). → RUNBOOK 2026-11-01.
- **Confirmed flop pattern (3): small animal/body facts**, all at 16:00. → RUNBOOK 2026-11-01 (16:00 = space/record/famous person).
- Rags-to-riches, giant nature records: 1 each — **not enough data yet**.
- TikTok and YouTube: **not enough data yet** for hook conclusions (flops have non-topic causes: copyright, duplicates, ~0-view distribution).

## 2026-11-08 (new pieces posted 29 Oct 21:15 – 5 Nov 21:15, ≥ 72 h old)

### Instagram bilirdinizmi (reel median 148.5 reach, n = 66; avg watch 4.5 s, 33 % >3 s)
| Piece | Format | Posted (Baku) | Category | Hook type | Reach | × median | Avg watch | >3 s | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| Qız qalası 5 m walls | photo reel, voiced | 3 Nov 13:08 | Azərbaycan | number + local AZ | 1 387 | 9.3× | 17.1 s | 64 % | OUTLIER |
| Landau, Baku Nobel at 14 | photo reel, voiced | 4 Nov 21:33 | Azərbaycan | number + local AZ famous person | 1 339 | 9.0× | 14.7 s | 69 % | OUTLIER |
| Tağıyev 2/2 | photo reel, voiced (two-part) | 1 Nov 13:04 | Azərbaycan | local AZ + "part 2" | 526 | 3.5× | 7.7 s | 56 % | OUTLIER |
| Saturn rings 282 000 km / 10 m | MOTION reel | 5 Nov 16:05 | Kosmos | number + space "impossible" twist | 474 | 3.2× | 9.9 s | 51 % | OUTLIER |
| Alov qüllələri 10 000 lights | photo reel, voiced | 4 Nov 13:06 | Azərbaycan | number + local AZ | 366 | 2.5× | 11.3 s | 57 % | OUTLIER |
| Göygöl 887 years | photo reel, voiced | 30 Oct 13:05 | Azərbaycan | number + local AZ | 329 | 2.2× | 7.5 s | 54 % | OUTLIER |
| Yanar dağ 3 m flames | photo reel, voiced | 5 Nov 13:06 | Azərbaycan | number + local AZ | 319 | 2.1× | 7.5 s | 57 % | OUTLIER |
| Koum signed $19 bn deal | photo reel | 30 Oct 16:04 | Məşhur insanlar | number + rags-to-riches | 39 | 0.26× | 8.0 s | 42 % | FLOP |
| Sun rises 16×/day | photo reel (static) | 2 Nov 16:04 | Kosmos | number + space | 49 | 0.33× | 3.9 s | 23 % | FLOP |
| Angel Falls pilot 11 days | photo reel, voiced | 3 Nov 21:31 | Təbiət | number + story | 54 | 0.36× | 4.9 s | 30 % | FLOP |
| Halloween $13.5 bn | photo reel (trend) | 31 Oct 18:31 | Xəbər | number + news (money) | 55 | 0.37× | 3.1 s | 24 % | FLOP |
| Uranus 42 yrs day/night | photo reel (static) | 29 Oct 21:32 | Kosmos | number + space | 56 | 0.38× | 3.9 s | 30 % | FLOP |
Watch (< 72 h): Io volcano MOTION 648 (58 %), Metro 1/2 1 144, Leyli 446, sunlight MOTION 205.

### TikTok bilirdinizmi (median 110 views, n = 30 since 30 Oct)
OUTLIERS: Göygöl 497 (4.5×, 24 shares) · first film in Baku repost 310 (2.8×, 27 shares) · Alov 308 (2.8×, 25) · Tağıyev 2/2 290 (2.7×, 17) · Maiden 260 (2.4×, 25) · Swift trend 221 (2.0×, 0 shares).
FLOPS: all 15 posts of 31 Oct–1 Nov (1–8 views, every topic → distribution/volume cause, 6 posts/day) · Antonelli trend 0 · Qobustan 20 (2 Nov, last 6/day day).
→ **Pattern confirmed (5 outliers): number + local AZ on TikTok, and only AZ videos get shared.** Since 2/day (3 Nov) no video < 86 views.

### YouTube bilirdinizmi (median 264 views, n = 48, synced to 4 Nov)
Outliers/flops split by DATE (27–31 Oct vs 1–4 Nov: median 860 → 90) → channel slowdown, not topic. Inside both periods: trend Shorts weak (5 of 7 below period median). Maiden Tower 15 views (IG hit) → Baku topics do NOT carry over to YouTube.

### Whyverse (since 3 Nov)
Only Einstein, bread/colour, Maoxian are ≥ 72 h → **not enough data yet**. Watch: Swift standalone (69 h) IG 1 834 = 10× cut median 179; TikTok Einstein 933 = 2.5× cut median 378; YouTube Shorts not synced.

## Hook ranking (cumulative, Instagram, after 2026-11-08)
| Hook type | Outliers | Flops |
|---|---|---|
| number + local AZ (Baku place/person/history) | **9** (Şollar, Mişon, Boulevard, Göygöl, Tağıyev 2/2, Qız qalası, Alov, Landau, Yanar dağ) | 0 on IG (Qobustan 0.93× is the weakest) |
| number + space "impossible" twist | **3** (18 h, Neptune, Saturn MOTION) | 2 static plain space (Sun 16×, Uranus) |
| number + rags-to-riches / news | 1 (Osimhen) | 2 (Koum, Halloween) |
| number + giant nature record | 1 (blue whale) | 0 |
| number + small animal/body fact | 0 | 3 |
| surprise "first X was really Y" (no number) | 0 | 2 |
Conclusions: (1) local AZ is the strongest hook on IG AND TikTok (≥ 2 platforms, 9 + 5 outliers). (2) Space works when it has a visual "impossible" twist and/or MOTION; static plain-space facts flop (2). (3) Rags-to-riches/news: 1 outlier vs 2 flops → not a reliable hook.
