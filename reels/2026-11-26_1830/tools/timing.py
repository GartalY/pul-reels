import json
# Arif words (reels/arif/2026-11-26_1830.words.json, slowed 0.92 by the 14:47 task). Phrase starts = silencedetect ends on the mp3.
W = json.load(open('../../pul-reels/reels/arif/2026-11-26_1830.words.json'))['words']
DUR = 25.3
FIX = {5: 2.79}  # silencedetect end before "Bakı"
CH = [
 (0,  "Bir — dörd.", ["Bir", "dörd."]),
 (2,  "Amma bu gecə", []),
 (5,  "Bakı üçün tarixi idi!", ["tarixi"]),
 (9,  "Barselona Azərbaycanda ilk rəsmi oyununu", ["Barselona", "ilk", "rəsmi"]),
 (14, "«Sabah»a qarşı oynadı.", ["«Sabah»a"]),
 (17, "Qonaqlar 30 dəqiqədə 4 qol vurdu.", ["30", "4"]),
 (23, "Amma 63-cü dəqiqədə", ["63-cü"]),
 (27, "Coy-Lens Mikels cavab verdi.", ["Coy-Lens", "Mikels"]),
 (31, "Oyundan sonra dedi:", []),
 (34, "«Barselonaya 2-3 qol vura bilərdik».", ["2-3"]),
 (39, "Bəyən və izlə —", ["Bəyən", "izlə"]),
 (42, "hər gün bilmədiyin bir fakt!", ["fakt!"]),
]
out = []
for wi, txt, keys in CH:
    t0 = 0.0 if wi == 0 else round(FIX.get(wi, W[wi]['start']) - 0.06, 3)
    out.append({"t0": t0, "text": txt, "keys": keys})
for i, c in enumerate(out):
    c["t1"] = out[i + 1]["t0"] if i + 1 < len(out) else DUR
    n = len(c["text"].split()); print(f'{c["t0"]:6.2f}-{c["t1"]:6.2f} {n}w {(c["t1"]-c["t0"])/n:.2f}s/w  {c["text"]}')
words = {w['text']: round(FIX.get(i, w['start']), 3) for i, w in enumerate(W)}
words = [[w['text'], round(FIX.get(i, w['start']), 3)] for i, w in enumerate(W)]
json.dump({"dur": DUR, "chunks": out, "words": words}, open('timing.json', 'w'), ensure_ascii=False)
