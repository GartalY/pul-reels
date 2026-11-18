import json
# Arif word starts from ElevenLabs Scribe (reels/arif/2026-11-18_1830.words.json); sentence starts snapped to ffmpeg silencedetect (-35dB, d=0.18)
W=json.load(open('/home/claude/pul-reels/reels/arif/2026-11-18_1830.words.json'))['words']
SIL=[2.341,5.294,9.044,10.847,12.353,15.181,19.258,20.392,23.667,25.084]
DUR=26.91
KEY={"Beş","yüz","üç","birinci!","Azərbaycan","Haaqada","qalib","beş","göndərildi.","altmış","üçü","seçildi,","iyirmi","ölkədən.",
 "finala","dörd","On","münsif","yekdilliklə","Azərbaycanın","qısa","yeddinci","beynəlxalq","Bəyən","izlə","fakt!"}
lines=[];cur=[]
for w in W:
    if w.get('type','word')!='word': continue
    txt=w['text']; t=w['start']
    if txt=='—':
        if cur: lines.append(cur); cur=[]
        continue
    if not cur:
        near=[s for s in SIL if abs(s-t)<0.16]
        if near and near[0]<t: t=near[0]
    cur.append({"w":txt,"t":round(t,3),"key":txt in KEY})
    if txt[-1] in '.!:': lines.append(cur); cur=[]
if cur: lines.append(cur)
out=[{"t0":l[0]["t"],"words":l} for l in lines]
for i,l in enumerate(out): l["t1"]=out[i+1]["t0"] if i+1<len(out) else DUR
json.dump({"dur":DUR,"lines":out,"source":"ElevenLabs Scribe word starts + silencedetect"},open('timing.json','w'),ensure_ascii=False,indent=0)
for i,l in enumerate(out): print(i,' '.join(f"{w['w']}@{w['t']}" for w in l['words']))
