import json,re
# sentence segments from silencedetect (-35dB, d=0.18); fine gaps (-32dB, d=0.05) used to snap word starts
SEG=[(0.03,1.23,"İki il dalbadal —"),(1.64,4.22,"eyni şəhər, eyni çəki, eyni qızıl!"),
 (4.70,9.12,"Azərbaycan cüdoçusu Kənan Nəsibov Zaqreb Qran-prisində yenə qalib gəldi."),
 (9.57,11.71,"O, 100 kiloqramdan yuxarı çəkidə yarışdı."),
 (12.13,14.48,"Finalda almaniyalı rəqibini məğlub etdi."),
 (14.92,17.25,"Düz bir il əvvəl də bu turniri o qazanmışdı."),
 (17.51,18.83,"Yəni titulunu qorudu."),
 (19.28,22.03,"Eyni şəhərdə, bir il sonra — yenə Nəsibov!"),
 (22.52,23.57,"Bəyən və izlə —"),(23.86,25.40,"hər gün bilmədiyin bir fakt!")]
GAPEND=[0.689,1.638,2.585,3.159,3.539,4.704,5.885,6.812,8.858,9.097,9.572,11.176,11.5,11.659,12.127,12.751,14.204,14.432,14.924,15.312,17.209,17.513,18.02,18.758,19.284,19.971,20.286,20.434,21.25,22.522,23.858,25.221]
SAY={"100":"yüz"}
KEY={"İki","dalbadal","şəhər,","çəki,","qızıl!","Kənan","Nəsibov","Zaqreb","Qran-prisində","yenə","100","yuxarı","Finalda","almaniyalı","Düz","il","əvvəl","titulunu","qorudu.","Nəsibov!","Bəyən","izlə","fakt!"}
V=set("aeıioöuüəAEIİOÖUÜƏ")
def syl(w): return max(1,sum(c in V for c in SAY.get(w,w)))
lines=[]
OV={(1,1):1.98,(1,3):2.85,(1,4):3.16,(1,5):3.54,(9,3):24.88,(9,4):25.22,(5,1):15.12,(5,2):15.31,(5,3):15.5}
for a,b,txt in SEG:
    ws=[w for w in txt.split() if w!="—"]
    tot=sum(syl(w) for w in ws)+0.4*(len(ws)-1); acc=0; out=[]
    for w in ws:
        t=a+(b-a)*acc/tot
        prev=out[-1]["t"] if out else a-1
        near=[g for g in GAPEND if abs(g-t)<0.22 and a<g<b and g>prev+0.14]
        if near: t=min(near,key=lambda g:abs(g-t))
        if t<prev+0.14: t=prev+0.16
        out.append({"w":w,"t":round(t,2),"key":w in KEY}); acc+=syl(w)+0.4
    for k,(li,wi) in enumerate(OV):
        if li==len(lines): out[wi]['t']=OV[(li,wi)]
    lines.append({"t0":out[0]["t"],"words":out})
for j,l in enumerate(lines): l["t1"]=lines[j+1]["t0"] if j+1<len(lines) else 25.73
json.dump({"dur":25.73,"lines":lines,"source":"silencedetect + syllable interpolation"},open('timing.json','w'),ensure_ascii=False,indent=0)
for l in lines: print(' '.join(f"{w['w']}@{w['t']}" for w in l['words']))
