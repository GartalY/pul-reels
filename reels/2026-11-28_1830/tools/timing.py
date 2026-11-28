import json
# Arif words (reels/arif/2026-11-28_1830.words.json, slowed 0.92 by the 14:47 task; scribe timings)
W = json.load(open('../../pul-reels/reels/arif/2026-11-28_1830.words.json'))['words']
DUR = 26.5
NB = ' '
CH = [
 (0,  f"350{NB}000 illik çənə", [f"350{NB}000"]),
 (6,  "Azıx mağarasından çıxıb!", ["Azıx"]),
 (9,  "Sahibi isə səni təəccübləndirəcək.", ["Sahibi"]),
 (13, "Onu 1968-də", ["1968-də"]),
 (19, "arxeoloq Məmmədəli Hüseynov tapıb.", ["Məmmədəli", "Hüseynov"]),
 (23, "Dünən Azıx-Tağlar Arxeoloji Parkı", ["Azıx-Tağlar"]),
 (27, "qoruğunun əsasnaməsi təsdiqləndi.", ["təsdiqləndi."]),
 (30, "Alimlərə görə, bu çənə", ["çənə"]),
 (34, "təxminən 20 yaşlı", ["20"]),
 (37, "bir qadına məxsus olub.", ["qadına"]),
 (41, "Bəyən və izlə —", ["Bəyən", "izlə"]),
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
