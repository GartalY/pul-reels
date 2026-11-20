import json
T=json.load(open('vo_timing.json'))
MERGE={('Eighty-one','billion','dollars.'):'$81 billion.',('Nine','hundred','eighty','million'):'980 million',('eighty-three','dollars'):'$83',('seventeen','percent.'):'+17%.'}
KEY={'$81 billion.','day.','guess?','Three.','Two.','One.','Anthropic,','980 million','$83','SpaceX\'s','ever.','three','2019.','+17%.','Like','follow','Whyverse'}
out=[]
for L in T:
    ws=L['words'];i=0;res=[]
    while i<len(ws):
        done=False
        for k,v in MERGE.items():
            n=len(k)
            if tuple(w[0] for w in ws[i:i+n])==k: res.append([v,ws[i][1]]);i+=n;done=True;break
        if done: continue
        res.append([ws[i][0],ws[i][1]]);i+=1
    out.append({'id':L['id'],'t0':L['t'],'t1':round(L['t']+L['d'],3),'words':[{'w':w,'t':round(float(t),3),'key':w in KEY} for w,t in res]})
json.dump({'dur':round(T[-1]['t']+T[-1]['d'],3),'lines':out},open('timing.json','w'))
for o in out: print(o['t0'],' '.join(x['w']+'@'+str(x['t']) for x in o['words']))
