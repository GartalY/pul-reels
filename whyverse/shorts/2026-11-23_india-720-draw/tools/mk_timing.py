import json
T=json.load(open('film/vo_timing.json')); DUR=19.8
# (line, first word) -> (display, words consumed)
MERGE={('l1','Seven'):('720',4),('l2','seven'):('720/9',6),('l4','Two'):('239/5',6),('l2','New'):('New Zealand.',2),('l4','New'):('New Zealand',2)}
KEY={'720','720/9','India','win.','biggest','Test','total','Rishabh','Pant','K.L.','Rahul','hundreds.','239/5','Draw.','Whyverse','Like','follow','New Zealand.'}
out=[]
for L in T:
    ws=L['words'];i=0;W=[]
    while i<len(ws):
        w=ws[i][0]; m=MERGE.get((L['id'],w))
        if m: W.append({'w':m[0],'t':ws[i][1],'key':m[0] in KEY}); i+=m[1]; continue
        W.append({'w':w,'t':ws[i][1],'key':w in KEY}); i+=1
    out.append({'t0':L['t'],'t1':round(L['t']+L['d'],3),'words':W})
json.dump({'dur':DUR,'lines':out},open('film/timing.json','w'))
for o in out: print(' '.join(w['w']+('*' if w['key'] else '') for w in o['words']))
