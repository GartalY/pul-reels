import json
T=json.load(open('film/vo_timing.json'))
MERGE={('l1','a'):('100',2,True),('l3','hundredth'):('100th',1,True),('l5','nineteen'):None}
KEY={"Macy's",'Thanksgiving','Actually,','not','storm','Saturday.','never','helium','war.','Like','follow','Whyverse'}
out=[]
for L in T:
    ws=L['words'];i=0;W=[]
    while i<len(ws):
        w=ws[i][0]
        if L['id']=='l5' and w=='nineteen':
            nxt=ws[i+1][0]; W.append({'w':'19'+('42' if nxt.startswith('forty-two') else '44,'),'t':ws[i][1],'key':True}); i+=2; continue
        m=MERGE.get((L['id'],w))
        if m: W.append({'w':m[0],'t':ws[i][1],'key':m[2]}); i+=m[1]; continue
        W.append({'w':w,'t':ws[i][1],'key':w in KEY}); i+=1
    out.append({'id':L['id'],'t0':L['t'],'t1':round(L['t']+L['d'],3),'words':W})
json.dump({'dur':25.0,'lines':out},open('film/timing.json','w'))
for o in out: print(' '.join(w['w']+('*' if w['key'] else '') for w in o['words']))
