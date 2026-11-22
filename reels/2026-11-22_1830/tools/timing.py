import json
# Arif word starts (ElevenLabs Scribe, reels/arif/2026-11-22_1830.words.json). Checked against ffmpeg silencedetect
# (-35 dB, d=0.18): phrase starts agree within ~0.05 s (İyirmi 0.19 s late) -> used as they are.
# Captions show numerals and "Claude" (voice_text spells "Klod" only so Arif says it right).
W = [w for w in json.load(open('audio/words.json'))['words'] if w.get('type', 'word') == 'word']
DUR = 25.6
DISP = {0: "167", 1: None, 2: None, 4: "1", 15: "1859-dan", 16: None, 17: None, 18: None, 19: None,
        27: "20", 31: "Claude", 39: "175", 40: None, 41: None, 55: None}
KEY = {"167", "il,", "milyon", "dollar", "türk", "əsilli", "Riman", "fərziyyəsindən", "1859-dan", "heç", "kim",
       "20", "noyabrda", "Levent", "Alpöge", "Claude", "açıqladı.", "175", "mindən", "kompüter", "faylından",
       "hələ", "təsdiqləməyib.", "Bəyən", "izlə", "fakt!"}
FIX = {10: -0.02, 27: -0.15}   # İyirmi: silencedetect says the phrase starts at 10.45
lines, cur = [], []
for i, w in enumerate(W):
    txt = DISP.get(i, w['text'])
    t = round(w['start'] + FIX.get(i, 0), 3)
    if txt is not None:
        cur.append({"w": txt, "t": t, "key": txt in KEY})
    if w['text'][-1] in '.!?:' and cur:
        lines.append(cur); cur = []
if cur: lines.append(cur)
out = [{"t0": l[0]["t"], "words": l} for l in lines]
for i, l in enumerate(out): l["t1"] = out[i + 1]["t0"] if i + 1 < len(out) else DUR
json.dump({"dur": DUR, "lines": out}, open('timing.json', 'w'), ensure_ascii=False, indent=0)
for i, l in enumerate(out): print(i, ' '.join(f"{w['w']}@{w['t']}" for w in l['words']))
