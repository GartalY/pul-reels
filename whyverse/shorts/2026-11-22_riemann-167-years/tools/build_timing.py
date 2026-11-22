import json
T=json.load(open('vo_timing.json'))
MERGE={('One','hundred','sixty-seven','years.'):'167 years.',('One','million','dollars.'):'$1 million.',('seventeen','million'):'17 million',('two','hundred','fifty','thousand','pages.'):'250,000 pages.',('a','hundred','sixty-seven','year'):'a 167-year'}
KEY={'167 years.','$1 million.','Riemann','hypothesis.','famous','Alpöge','says','Claude.','17 million','code.','250,000 pages.','human','checking.','holds,','a 167-year','prime','cracked.','Like','follow','Whyverse'}
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
