import json
# Arif word starts from ElevenLabs Scribe (reels/arif/2026-11-19_1830.words.json); sentence starts snapped to ffmpeg silencedetect (-35dB, d=0.18).
# Display text = the script spelling (Scribe writes Əlim Qasimov / bugün / baldən / Nelly Furtado-nun).
W=json.load(open('/home/claude/pul-reels/reels/arif/2026-11-19_1830.words.json'))['words']
SIL=[4.001,5.337,8.253,11.701,15.860,19.460,22.586]
DUR=25.63
FIX={"bugün":"bu gün","baldən":"baldan","Əlim":"Alim","Qasimov":"Qasımov","Nelly":"Nelli","Furtado-nun":"Furtadonun",
     "Say":"«Say","Right":"Right»","fakt.":"fakt!","var.":"var!"}
KEY={"On","üç","il","GTA","VI-da","Azərbaycan","sürprizi","bu gün","çıxdı.","yüz","doxsan","doqquz","rekordu","bərabərdir.","hələlik",
     "radiosunda","Alim","Qasımov","Fərqanə","Qasımova","«Say","It","Right»","milyonlarla","oyunçu","Bəyən","izlə","fakt!"}
lines=[];cur=[]
for w in W:
    if w.get('type','word')!='word': continue
    txt=FIX.get(w['text'],w['text']); t=w['start']
    if not cur:
        near=[s for s in SIL if abs(s-t)<0.25]
        if near and near[0]<t: t=near[0]
    cur.append({"w":txt,"t":round(t,3),"key":txt in KEY})
    if txt[-1] in '.!:' and txt!='bu gün': lines.append(cur); cur=[]
if cur: lines.append(cur)
out=[{"t0":l[0]["t"],"words":l} for l in lines]
for i,l in enumerate(out): l["t1"]=out[i+1]["t0"] if i+1<len(out) else DUR
json.dump({"dur":DUR,"lines":out,"source":"ElevenLabs Scribe word starts + silencedetect"},open('timing.json','w'),ensure_ascii=False,indent=0)
for i,l in enumerate(out): print(i,' '.join(f"{w['w']}@{w['t']}" for w in l['words']))
