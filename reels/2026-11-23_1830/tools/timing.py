import json
# Arif word starts (ElevenLabs Scribe, reels/arif/2026-11-23_1830.words.json). Captions show numerals.
W = [w for w in json.load(open('audio/words.json'))['words'] if w.get('type', 'word') == 'word']
DUR = 26.2
DISP = {0: "9", 3: "127", 4: None, 5: None, 19: "2017-də", 20: None, 21: None, 22: None, 24: "4", 28: "8", 30: "18", 31: None,
        34: "3,", 36: "9", 42: "4", 46: "127", 47: None, 48: None}
KEY = {"9", "Sabah", "127", "nəhəngə", "Barselona", "Bakıya", "Çərşənbə", "Sabahla", "2017-də", "4", "təsnifat", "8", "18", "qol!",
       "3,", "xalı", "maraqlısı:", "yaşını", "Bəyən", "izlə", "fakt!"}
lines, cur = [], []
for i, w in enumerate(W):
    txt = DISP.get(i, w['text'])
    if i == 55: txt = None
    t = round(w['start'], 3)
    if txt is not None: cur.append({"w": txt, "t": t, "key": txt in KEY})
    if w['text'][-1] in '.!?:,' and i not in (29, 34) and cur or (i == 27):
        if cur: lines.append(cur); cur = []
if cur: lines.append(cur)
out = [{"t0": l[0]["t"], "words": l} for l in lines]
for i, l in enumerate(out): l["t1"] = out[i + 1]["t0"] if i + 1 < len(out) else DUR
json.dump({"dur": DUR, "lines": out}, open('timing.json', 'w'), ensure_ascii=False, indent=0)
for i, l in enumerate(out): print(i, ' '.join(f"{w['w']}@{w['t']}" for w in l['words']))
