import json
T=json.load(open('film/vo_timing.json'))
MERGE={('l2','one'):('1 million.',2,True),('l4','a'):('100',2,True),('l3','A.I.'):('AI',1,True)}
KEY={'satellites','SpaceX?','guess?','historic','space,','solar','Starlink.','night','sky','Like','follow','Whyverse'}
out=[]
for L in T:
    ws=L['words'];i=0;W=[]
    while i<len(ws):
        w=ws[i][0]
        m=MERGE.get((L['id'],w))
        if m: W.append({'w':m[0],'t':ws[i][1],'key':m[2]}); i+=m[1]; continue
        W.append({'w':w,'t':ws[i][1],'key':w in KEY}); i+=1
    out.append({'id':L['id'],'t0':L['t'],'t1':round(L['t']+L['d'],3),'words':W})
json.dump({'dur':25.3,'lines':out},open('film/timing.json','w'))
for o in out: print(' '.join(w['w']+('*' if w['key'] else '') for w in o['words']))
