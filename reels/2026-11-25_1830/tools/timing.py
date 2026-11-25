import json
# Arif words (reels/arif/2026-11-25_1830.words.json), slowed 0.92 by the 14:47 task; 4 pauses inserted here
# (+0.25 @2.28, +0.2 @6.36, +0.3 @15.19, +0.2 @19.15 -> audio/vo.wav 23.65 s). Sentence starts snapped to silencedetect
# ends on vo.wav (2.70 / 6.98 / 11.94 / 14.72 / 16.08 / 20.27 / 21.73).
W = json.load(open('audio/words_padded.json'))['words']
DUR = 25.2
SIL = {5: 2.70, 13: 6.98, 23: 11.94, 29: 14.72, 31: 16.08, 41: 20.27, 45: 21.73}
CH = [
 (0,  "Üç il, üç Avropa qızılı!", ["Üç", "üç", "qızılı!"]),
 (5,  "On doqquz yaşlı boksçumuz", ["On", "doqquz"]),
 (9,  "Bilalhəbaşi Nəzərov yenə birincidir.", ["Bilalhəbaşi", "Nəzərov"]),
 (13, "Xorvatiyanın Poreç şəhərində,", ["Poreç"]),
 (16, "23 yaşadək boksçular arasında qalib gəldi.", ["23", "yaşadək"]),
 (23, "Finalda 5 hakimin hamısı onu seçdi.", ["5", "hamısı"]),
 (29, "Ən maraqlısı:", ["maraqlısı:"]),
 (31, "ilk Avropa qızılını 2 il əvvəl", ["ilk", "qızılını"]),
 (37, "elə bu şəhərdə qazanmışdı.", ["bu", "şəhərdə"]),
 (41, "Bəyən və izlə —", ["Bəyən", "izlə"]),
 (45, "hər gün bilmədiyin bir fakt!", ["fakt!"]),
]
out = []
for wi, txt, keys in CH:
    t0 = 0.0 if wi == 0 else (SIL[wi] - 0.04 if wi in SIL else round(W[wi]['start'] - 0.08, 3))
    out.append({"t0": round(t0, 3), "text": txt, "keys": keys})
for i, c in enumerate(out):
    c["t1"] = out[i + 1]["t0"] if i + 1 < len(out) else DUR
    n = len(c["text"].split()); print(f'{c["t0"]:6.2f}-{c["t1"]:6.2f} {n}w {(c["t1"]-c["t0"])/n:.2f}s/w  {c["text"]}')
words = [[w['text'], round(SIL.get(i, w['start'] + 0.0) if i in SIL else w['start'] - 0.05, 3)] for i, w in enumerate(W)]
json.dump({"dur": DUR, "chunks": out, "words": words}, open('timing.json', 'w'), ensure_ascii=False)
