import json,re
T=json.load(open('film/vo_timing.json'))
MERGE={('l1','Three'):('3',1,True),('l2','November'):('20 Nov.',2,True),('l3','Number'):('#3',2,True),('l4','Number'):('#2',2,True),
       ('l5','number'):('#1',2,True),('l3','off-site.'):('off-site.',1,True)}
KEY={'chores','Airbnb','Airbnb\'s','rules','bookings','trash','stripping','beds.','washing','dishes.','still','sink,','towels','recycling.','Whyverse','Like','follow'}
out=[]
for L in T:
    ws=L['words'];i=0;W=[]
    while i<len(ws):
        w=ws[i][0]; m=MERGE.get((L['id'],w))
        if m: W.append({'w':m[0],'t':ws[i][1],'key':m[2]}); i+=m[1]; continue
        W.append({'w':w,'t':ws[i][1],'key':w in KEY}); i+=1
    out.append({'t0':L['t'],'t1':round(L['t']+L['d'],3),'words':W})
json.dump({'dur':21.6,'lines':out},open('film/timing.json','w'))
for o in out: print(' '.join(w['w']+('*' if w['key'] else '') for w in o['words']))
