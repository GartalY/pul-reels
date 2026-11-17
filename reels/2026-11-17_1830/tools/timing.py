import json
# Arif word starts from ElevenLabs Scribe (reels/arif/2026-11-17_1830.words.json); sentence starts snapped to ffmpeg silencedetect (-35dB, d=0.18)
W=json.load(open('/home/claude/pul-reels/reels/arif/2026-11-17_1830.words.json'))['words']
SIL=[2.581,4.942,6.990,10.729,13.723,15.315,18.545,20.037,22.576,24.017]
KEY={"İyirmi","səkkiz","üç","qol!","Azərbaycan","Andorra","beş","Dörd","sıfır-sıfır","yoldaşlıq","Eşqin","Əhmədov","üçüncü",
 "Musa","Qurbanlı","Toral","Bayramov","üç-bir!","kapitan","Emin","Mahmudovun","son","dörd","qol","hamısından","çox!","Bəyən","izlə","fakt!"}
lines=[];cur=[]
for w in W:
    if w.get('type','word')!='word': continue
    txt=w['text']; t=w['start']
    if txt=='—':
        if cur: lines.append(cur); cur=[]
        continue
    if not cur:
        near=[s for s in SIL if abs(s-t)<0.16]
        if near: t=min(t,near[0]) if near[0]<t else t
    cur.append({"w":txt,"t":round(t,3),"key":txt in KEY})
    if txt[-1] in '.!': lines.append(cur); cur=[]
if cur: lines.append(cur)
out=[]
for i,l in enumerate(lines):
    out.append({"t0":l[0]["t"],"words":l})
for i,l in enumerate(out): l["t1"]=out[i+1]["t0"] if i+1<len(out) else 25.76
json.dump({"dur":25.76,"lines":out,"source":"ElevenLabs Scribe word starts + silencedetect"},open('timing.json','w'),ensure_ascii=False,indent=0)
for i,l in enumerate(out): print(i,' '.join(f"{w['w']}@{w['t']}" for w in l['words']))
