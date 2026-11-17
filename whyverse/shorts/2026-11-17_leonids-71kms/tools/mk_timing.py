import json,re
T=json.load(open('film/vo_timing.json'))
MERGE={('l1','Seventy-one'):('71',1,True),('l1','kilometres.'):('km',1,True),('l3','thirty-three'):('33',1,True),
 ('l4','ten'):('10',1,True),('l4','fifteen'):('15',1,True),('l5','eighteen'):('1833,',2,True),('l5','a'):('150,000',5,True)}
KEY={'second.','fast','Leonids:','comet','years.','hour.','tonight.','midnight.','Whyverse','peak','Like','follow'}
out=[]
for L in T:
    ws=L['words'];i=0;W=[]
    while i<len(ws):
        w=ws[i][0]; m=MERGE.get((L['id'],w))
        if m: W.append({'w':m[0],'t':ws[i][1],'key':m[2]}); i+=m[1]; continue
        W.append({'w':w,'t':ws[i][1],'key':w in KEY}); i+=1
    out.append({'t0':L['t'],'t1':round(L['t']+L['d'],3),'words':W})
json.dump({'dur':24.0,'lines':out},open('film/timing.json','w'))
for o in out: print(' '.join(w['w']+('*' if w['key'] else '') for w in o['words']))
