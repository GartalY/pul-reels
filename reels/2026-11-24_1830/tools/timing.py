import json
# Arif words (reels/arif/2026-11-24_1830.words.json): sentence starts from silencedetect on the slowed mp3 (checked again
# 24 Nov 15:40: gaps end at 3.40 / 5.88 / 8.08 / 10.92 / 14.75 / 19.69 / 20.97 -> match), words inside spread by letters.
W = [w for w in json.load(open('audio/words.json'))['words'] if w.get('type', 'word') == 'word']
DUR = 25.4
# subtitle chunks: (first word index, display text, key words)
CH = [
 (0,  "Bir gündə 950 milyard dollar!", ["950", "milyard", "dollar!"]),
 (7,  "Censen Huanq «Nvidia»ya qayıtdı.", ["Censen", "Huanq"]),
 (11, "12 noyabrda istefa vermişdi.", ["istefa"]),
 (16, "11 gün sonra", ["11", "gün"]),
 (20, "şura onu geri qaytardı.", ["geri", "qaytardı."]),
 (24, "Elə həmin gün", ["həmin"]),
 (27, "səhmlər 31 faizdən çox bahalaşdı.", ["31", "faizdən", "bahalaşdı."]),
 (33, "Bu məbləğ Azərbaycanın illik iqtisadiyyatından", ["Azərbaycanın"]),
 (38, "12 dəfədən çoxdur!", ["12", "dəfədən"]),
 (42, "Bəyən və izlə —", ["Bəyən", "izlə"]),
 (45, "hər gün bilmədiyin bir fakt!", ["fakt!"]),
]
out = []
for i, (wi, txt, keys) in enumerate(CH):
    t0 = round(W[wi]['start'] - 0.06, 3) if wi else 0.0
    out.append({"t0": max(0, t0), "text": txt, "keys": keys})
for i, c in enumerate(out):
    c["t1"] = out[i + 1]["t0"] if i + 1 < len(out) else DUR
    n = len(c["text"].split()); print(f'{c["t0"]:6.2f}-{c["t1"]:6.2f} {n}w {(c["t1"]-c["t0"])/n:.2f}s/w  {c["text"]}')
WT = {w['text']: [] for w in W}
for w in W: WT[w['text']].append(round(w['start'], 3))
json.dump({"dur": DUR, "chunks": out, "words": [[w['text'], round(w['start'], 3)] for w in W]}, open('timing.json', 'w'), ensure_ascii=False)
