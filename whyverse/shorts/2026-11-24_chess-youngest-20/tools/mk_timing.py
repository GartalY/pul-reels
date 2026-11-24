import json
T=json.load(open('vo_timing.json')); DUR=25.7
DISP={'Gookesh':'Gukesh'}
MERGE={('l1','Fourteen'):('14',1),('l3','twenty!'):('20!',1),('l4','two'):('$2.5 million',6)}
KEY={'14','title','today.','old','guess?','20!','Gukesh','India,','Javokhir','Sindarov','Uzbekistan.','youngest','ever.','$2.5 million','Whyverse'}
out=[]
for L in T:
    ws=L['words'];i=0;W=[]
    while i<len(ws):
        w=ws[i][0]; m=MERGE.get((L['id'],w))
        if m: W.append({'w':m[0],'t':ws[i][1],'key':m[0] in KEY}); i+=m[1]; continue
        w=DISP.get(w,w); W.append({'w':w,'t':ws[i][1],'key':w in KEY}); i+=1
    out.append({'id':L['id'],'t0':L['t'],'t1':round(L['t']+L['d'],3),'words':W})
json.dump({'dur':DUR,'lines':out},open('film/timing.json','w'))
for o in out: print(o['id'],o['t0'],' '.join(w['w']+('*' if w['key'] else '') for w in o['words']))
