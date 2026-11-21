import json
# Arif word starts (ElevenLabs Scribe, reels/arif/2026-11-21_1830.words.json), remapped phrase by phrase onto the
# ffmpeg silencedetect phrases (-35 dB, d=0.18) so every caption lands on the spoken word.
W=[w for w in json.load(open('audio/words.json'))['words'] if w.get('type','word')=='word']
DUR=27.2
SEG=[(0,0.0,1.76),(5,2.18,6.03),(14,6.22,8.93),(21,9.27,10.69),(24,10.91,13.75),(30,14.04,15.92),(35,16.32,18.09),
     (38,18.60,19.45),(40,19.67,22.30),(49,22.69,23.39),(52,24.05,25.07),(55,25.39,26.90)]
DISP={0:"2",2:"36",3:None,6:"194",7:None,8:None,15:"2",18:"74-cü",19:None,22:"38-cidir.",23:None,30:"67-cidən",31:None,
      32:"11-ci",33:None,43:"5",46:"40-a",49:"1",55:None}
KEY={"36","pillə!","BMT","194","elektron","hökumət","Azərbaycan","74-cü","38-cidir.","sıçrayış","onlayn","67-cidən","11-ci",
     "Çindən","yuxarıdadır.","hədəf","5","40-a","1","alındı.","Bəyən","izlə","fakt!"}
t=[None]*len(W)
for si,(i0,a,b) in enumerate(SEG):
    i1=SEG[si+1][0] if si+1<len(SEG) else len(W)
    s0=W[i0]['start']; s1=W[i1-1]['end']
    for i in range(i0,i1): t[i]=round(a+(W[i]['start']-s0)/(s1-s0)*(b-a),3)
lines=[];cur=[]
for i,w in enumerate(W):
    txt=DISP.get(i,w['text'])
    if txt is not None: cur.append({"w":txt,"t":t[i],"key":txt in KEY})
    if w['text'][-1] in '.!?:' and cur: lines.append(cur); cur=[]
if cur: lines.append(cur)
out=[{"t0":l[0]["t"],"words":l} for l in lines]
for i,l in enumerate(out): l["t1"]=out[i+1]["t0"] if i+1<len(out) else DUR
json.dump({"dur":DUR,"lines":out},open('timing.json','w'),ensure_ascii=False,indent=0)
for i,l in enumerate(out): print(i,' '.join(f"{w['w']}@{w['t']}" for w in l['words']))
