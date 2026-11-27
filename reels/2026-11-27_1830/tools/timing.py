import json
# Arif words (reels/arif/2026-11-27_1830.words.json, slowed 0.92 by the 14:47 task; scribe timings)
W = json.load(open('../../pul-reels/reels/arif/2026-11-27_1830.words.json'))['words']
DUR = 27.0
NB = ' '
CH = [
 (0,  "Xəzərin suyu krana gələcək.", ["Xəzərin", "krana"]),
 (4,  "Azərbaycanda ilk böyük", ["ilk", "böyük"]),
 (7,  "duzsuzlaşdırma zavodu tikiləcək.", ["duzsuzlaşdırma"]),
 (10, "Gündə nə qədər su verəcək?", ["nə", "qədər"]),
 (15, "Sənin cavabın?", ["cavabın?"]),
 (17, "Üç, iki, bir…", ["Üç,", "iki,", "bir…"]),
 (20, f"Gündə 300{NB}000 kubmetr!", [f"300{NB}000"]),
 (25, "Təxminən 120 Olimpiya hovuzu.", ["120"]),
 (30, "Xəzər okeandan təxminən", ["Xəzər"]),
 (33, "3 dəfə az duzludur.", ["3", "az"]),
 (37, "Amma yenə də içmək olmur.", ["olmur."]),
 (42, "Bəyən və izlə —", ["Bəyən", "izlə"]),
 (45, "hər gün bilmədiyin bir fakt!", ["fakt!"]),
]
out = []
for wi, txt, keys in CH:
    t0 = 0.0 if wi == 0 else round(W[wi]['start'] - 0.06, 3)
    out.append({"t0": t0, "text": txt, "keys": keys})
for i, c in enumerate(out):
    c["t1"] = out[i + 1]["t0"] if i + 1 < len(out) else DUR
    n = len(c["text"].split()); print(f'{c["t0"]:6.2f}-{c["t1"]:6.2f} {n}w {(c["t1"]-c["t0"])/n:.2f}s/w  {c["text"]}')
words = [[w['text'], round(w['start'], 3)] for w in W]
json.dump({"dur": DUR, "chunks": out, "words": words}, open('timing.json', 'w'), ensure_ascii=False)
