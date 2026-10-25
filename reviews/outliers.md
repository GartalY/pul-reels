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

## Hook ranking (cumulative)
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
