import json
T=json.load(open('film/vo_timing.json'))
MERGE={('l1','Sixty-three'):('$63,000',3,True),('l2','ten'):('¥10 million,',3,True),('l3','one'):('1.14.',4,True),
       ('l4','three'):('3 in 10',3,True),('l4','sixty-five'):('65',1,True)}
KEY={'third','baby?','ruling','three.','record','low:','proposal.','Like','follow','Whyverse'}
out=[]
for L in T:
    ws=L['words'];i=0;W=[]
    while i<len(ws):
        w=ws[i][0]
        m=MERGE.get((L['id'],w))
        if m and not (L['id']=='l3' and i<8):
            W.append({'w':m[0],'t':ws[i][1],'key':m[2]}); i+=m[1]; continue
        W.append({'w':w,'t':ws[i][1],'key':w in KEY}); i+=1
    out.append({'id':L['id'],'t0':L['t'],'t1':round(L['t']+L['d'],3),'words':W})
json.dump({'dur':25.2,'lines':out},open('film/timing.json','w'),ensure_ascii=False)
for o in out: print(' '.join(w['w']+('*' if w['key'] else '') for w in o['words']))
