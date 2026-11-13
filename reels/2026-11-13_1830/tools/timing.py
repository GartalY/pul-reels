# Estimate word starts from the Arif track: speech-time axis (pauses removed), syllables per token,
# within anchor blocks whose starts are sure (sentence pauses). Writes timing.json.
import json,re,subprocess,sys
LINES=[ # (display tokens with spoken syllables), keywords
 ([("464",5),("il.",1)],["464"]),
 ([("Şamaxıdan",4),("Dublinə.",3)],["Şamaxıdan","Dublinə."]),
 ([("Dünən",2),("Dublində",3),("Azərbaycan",4),("və",1),("Böyük",2),("Britaniya",4),("strateji",3),("tərəfdaşlıq",4),("bəyannaməsi",5),("imzaladı.",4)],["strateji","tərəfdaşlıq"]),
 ([("Sənəd",2),("üç",1),("sahəni",3),("əhatə",3),("edir:",2)],["üç"]),
 ([("müdafiə,",4),("ticarət",3),("və",1),("təhsil.",2)],["müdafiə,","ticarət","təhsil."]),
 ([("Amma",2),("tarix",2),("daha",2),("qədimdir.",3)],["qədimdir."]),
 ([("1562-ci",8),("ildə",2),("ingilis",3),("taciri",3),("Entoni",3),("Cenkinson",3),("Şamaxıya",4),("gəlib.",2)],["1562-ci","Cenkinson"]),
 ([("Şirvan",2),("hakimi",3),("Abdulla",3),("xan",1),("ingilis",3),("tacirlərinə",5),("ticarət",3),("icazəsi",4),("verib.",2)],["ticarət","icazəsi"]),
 ([("Bəyən",2),("və",1),("izlə",2),("—",0),("hər",1),("gün",1),("bilmədiyin",4),("bir",1),("fakt!",1)],["Bəyən","izlə"]),
]
wav=sys.argv[1]
out=subprocess.run(['ffmpeg','-i',wav,'-af','silencedetect=noise=-30dB:d=0.07','-f','null','-'],capture_output=True,text=True).stderr
ss=[float(x) for x in re.findall(r'silence_start: ([0-9.]+)',out)]; se=[float(x) for x in re.findall(r'silence_end: ([0-9.]+)',out)]
dur=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',wav],capture_output=True,text=True).stdout)
pauses=[(a,b) for a,b in zip(ss,se) if b-a>=0.12]
# speech intervals
iv=[];cur=0.0
for a,b in pauses:
  if a>cur: iv.append((cur,a))
  cur=b
if cur<dur: iv.append((cur,dur))
def s2axis(t):
  acc=0
  for a,b in iv:
    if t<=a: return acc
    if t<b: return acc+t-a
    acc+=b-a
  return acc
def axis2s(x):
  acc=0
  for a,b in iv:
    if x<acc+(b-a): return a+(x-acc)
    acc+=b-a
  return iv[-1][1]
# anchor blocks: (line index range, start, end) — real sentence pauses
ANCH=json.loads(sys.argv[2]) if len(sys.argv)>2 else None
first=iv[0][0] if iv[0][0]>0.02 else 0.1
blocks=ANCH or [[0,1,0.10,1.22],[1,2,1.73,2.75],[2,3,3.45,8.42],[3,4,9.05,10.53],[4,5,11.08,14.67],[5,9,15.42,27.84]]
res=[None]*len(LINES)
for i0,i1,t0,t1 in blocks:
  toks=[(li,w,sy) for li in range(i0,i1) for (w,sy) in LINES[li][0]]
  tot=sum(sy for _,_,sy in toks); x0,x1=s2axis(t0),s2axis(t1); acc=0
  for li,w,sy in toks:
    st=axis2s(x0+(x1-x0)*acc/tot); acc+=sy
    # snap: if within 0.1 s before a pause end, move to that pause end
    for a,b in pauses:
      if b-a>=0.25 and a<=st<=b: st=b
    res[li]=res[li] or []; res[li].append([w,round(st,3)])
L=[]
for li,(toks,keys) in enumerate(LINES):
  ws=res[li]; L.append({"t0":ws[0][1],"words":[{"w":w,"t":t,"key":w in keys} for w,t in ws]})
for li in range(len(L)): L[li]["t1"]=L[li+1]["t0"] if li+1<len(L) else dur
json.dump({"dur":dur,"lines":L,"pauses":pauses},open('timing.json','w'),ensure_ascii=False,indent=0)
for l in L: print(round(l["t0"],2)," ".join(f'{w["w"]}@{w["t"]:.2f}' for w in l["words"]))
