import json
T=json.load(open('vo_timing.json'))
MERGE={('One','point','five'):'1.5',('two','twenty','p.m.'):'2:20 PM',('twenty','twenty-three,'):'2023,'}
REPL={'one':'1','three':'3'}
KEY={'1.5','million','Simpsons','blackout','truth.','2:20 PM','beep','1','minute.','test.','emergency','2023,','buzzed','silent.','3','years','No','blackout.','Like','follow','Whyverse','TVs','radios'}
out=[]
for L in T:
    ws=L['words'];i=0;res=[]
    while i<len(ws):
        done=False
        for k,v in MERGE.items():
            n=len(k)
            if tuple(w[0] for w in ws[i:i+n])==k: res.append([v,ws[i][1]]);i+=n;done=True;break
        if done: continue
        w=ws[i][0]
        if L['id'] in('l4','l7') and w in REPL: w=REPL[w]
        res.append([w,ws[i][1]]);i+=1
    out.append({'t0':L['t'],'t1':round(L['t']+L['d'],3),'words':[{'w':w,'t':round(float(t),3),'key':w in KEY} for w,t in res]})
json.dump({'dur':round(T[-1]['t']+T[-1]['d'],3),'lines':out},open('timing.json','w'))
for o in out: print(' '.join(x['w'] for x in o['words']))
