import json
# Arif word starts (ElevenLabs Scribe, reels/arif/2026-11-20_1830.words.json), remapped phrase by phrase onto the
# ffmpeg silencedetect gaps (-35 dB, d=0.18): Scribe drifts early in the first 10 s.
W=[w for w in json.load(open('/home/claude/pul-reels/reels/arif/2026-11-20_1830.words.json'))['words'] if w.get('type','word')=='word']
DUR=27.01
# (first word index, phrase start, phrase end) from silencedetect
SEG=[(0,0.03,0.63),(2,0.89,2.71),(7,3.18,6.25),(13,6.49,6.84),(14,7.23,10.43),(25,10.90,11.35),(26,11.72,12.22),(27,12.49,12.92),
     (28,13.38,14.50),(31,14.93,17.66),(39,18.01,19.46),(43,19.88,23.35),(52,23.73,24.83),(56,25.15,27.0)]
FIX={"min,":"min","yüz,":"yüz","doqquzuncu":"doqquzuncu","bir…":"bir!","Üç,":"Üç!","iki,":"iki!"}
DISP={13:"İpucu:",14:"1959-cu",15:None,16:None,17:None,18:None,19:"ildə",28:"Təxminən",29:"5 000!",30:None,46:"12",47:None,0:"500,",1:None,2:"5 000,",3:None,5:"50 000?",6:None}
KEY={"500,","5 000,","50 000?","vyetnamlı","Azərbaycanda","İpucu:","1959-cu","Ho","Şi","Min","Bakıya","Üç!","iki!","bir!","Təxminən","5 000!",
     "Vunq","Tauda","neftçi","Bakıda","«Bakı»","küçəsi","İlham","Əliyev","12","il","Vyetnamdadır.","Bəyən","izlə","fakt!"}
t=[None]*len(W)
for si,(i0,a,b) in enumerate(SEG):
    i1=SEG[si+1][0] if si+1<len(SEG) else len(W)
    s0=W[i0]['start']; s1=W[i1-1]['end'] if W[i1-1]['end']>s0 else s0+0.01
    for i in range(i0,i1):
        t[i]=round(a+(W[i]['start']-s0)/(s1-s0)*(b-a),3) if s1>s0 else a
lines=[];cur=[]
for i,w in enumerate(W):
    txt=DISP.get(i,FIX.get(w['text'],w['text']))
    if txt is None:
        if cur and cur[-1]['w'].startswith('1959'): pass
        if i in (30,):
            pass
    else:
        cur.append({"w":txt,"t":t[i],"key":txt in KEY})
    raw=w['text']
    if raw[-1] in '.!?…:' or raw in ('Üç,','iki,'):
        if cur: lines.append(cur); cur=[]
if cur: lines.append(cur)
out=[{"t0":l[0]["t"],"words":l} for l in lines]
for i,l in enumerate(out): l["t1"]=out[i+1]["t0"] if i+1<len(out) else DUR
json.dump({"dur":DUR,"lines":out,"source":"Scribe word starts remapped onto silencedetect phrases"},open('timing.json','w'),ensure_ascii=False,indent=0)
for i,l in enumerate(out): print(i,' '.join(f"{w['w']}@{w['t']}" for w in l['words']))
