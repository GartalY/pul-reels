import json,re
T=json.load(open('film/vo_timing.json'))
MERGE={('l1','Two'):('$2.36',4,True),('l2','GTA'):('GTA VI',2,True),('l3','twenty-four'):('24½',4,True),
       ('l4','twenty'):('2013,',2,True),('l4','GTA'):('GTA V',2,True),('l4','eight'):('800',2,True)}
KEY={'billion','day.','estimate.','launch','Sensor','Tower','million','PlayStation.','first','three','times','Rockstar','official','Whyverse','Like','follow'}
out=[]
for L in T:
    ws=L['words'];i=0;W=[]
    while i<len(ws):
        w=ws[i][0]; m=MERGE.get((L['id'],w))
        if m: W.append({'w':m[0],'t':ws[i][1],'key':m[2]}); i+=m[1]; continue
        W.append({'w':w,'t':ws[i][1],'key':w in KEY}); i+=1
    out.append({'t0':L['t'],'t1':round(L['t']+L['d'],3),'words':W})
json.dump({'dur':26.8,'lines':out},open('film/timing.json','w'))
for o in out: print(' '.join(w['w']+('*' if w['key'] else '') for w in o['words']))
