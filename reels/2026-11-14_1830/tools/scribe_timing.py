# Word timing from ElevenLabs Scribe (real alignment) → timing.json with display tokens (digits on screen).
import json,re,subprocess
sw=json.load(open('tools/scribe_words.json'))
SENT=[(4,[("1",1),("xaldan",1),("8",1),("xala!",1)],["1","8"]),
 (3,[("Millimiz",1),("qrupun",1),("birincisidir.",1)],["birincisidir."]),
 (9,[("Dünən",1),("Vaduzda",1),("Lixtenşteyni",1),("1:0",2),("hesabı",1),("ilə",1),("məğlub",1),("etdik.",1)],["Lixtenşteyni","1:0"]),
 (7,[("Qolu",1),("26-cı",2),("dəqiqədə",1),("Mahir",1),("Emreli",1),("vurdu.",1)],["26-cı","Emreli"]),
 (6,[("İndi",1),("4",1),("oyunda",1),("8",1),("xalımız",1),("var.",1)],["4","8"]),
 (5,[("Son",1),("oyun",1),("heç",1),("nəyi",1),("dəyişmir.",1)],["heç"]),
 (13,[("2",1),("il",1),("əvvəl",1),("isə",1),("6",1),("oyunda",1),("cəmi",1),("1",1),("xal",1),("toplayıb",1),("D",1),("liqasına",1),("düşmüşdük.",1)],["6","1","D"]),
 (5,[("İndi",1),("məğlubiyyətsiz",1),("C",1),("liqasına",1),("qayıdırıq.",1)],["məğlubiyyətsiz","C"]),
 (9,[("Bəyən",1),("və",1),("izlə",1),("—",1),("hər",1),("gün",1),("bilmədiyin",1),("bir",1),("fakt!",1)],["Bəyən","izlə"])]
dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0','audio/vo.wav'],capture_output=True,text=True).stdout)
i=0;L=[]
for n,toks,keys in SENT:
  ws=[];
  for w,k in toks:
    ws.append({"w":w,"t":round(max(0.02,sw[i][1]),3),"key":w in keys}); i+=k
  L.append({"t0":ws[0]["t"],"words":ws})
assert i==len(sw),(i,len(sw))
for j in range(len(L)): L[j]["t1"]=L[j+1]["t0"] if j+1<len(L) else dur
json.dump({"dur":dur,"lines":L,"source":"ElevenLabs Scribe word alignment"},open('timing.json','w'),ensure_ascii=False,indent=0)
for l in L: print(l["t0"]," ".join(f'{w["w"]}@{w["t"]}' for w in l["words"]))
