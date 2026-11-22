import json,re,numpy as np,soundfile as sf
a,sr=sf.read('audio/vo.wav'); a=a[:,0] if a.ndim>1 else a
hop=int(0.01*sr); env=np.array([np.sqrt(np.mean(a[i:i+hop]**2)) for i in range(0,len(a)-hop,hop)])
T=json.load(open('vo_timing.json'))
for L in T:
    i0=int(L['t']/0.01); i1=int((L['t']+L['d'])/0.01)
    e=env[i0:i1]; thr=e.max()*10**(-24/20); sp=e>thr
    # gaps
    gaps=[];run=0
    for k,v in enumerate(sp):
        if not v: run+=1
        else:
            if run>=3 and k-run>3: gaps.append((run,(k-run)*0.01+L['t'],k*0.01+L['t']))
            run=0
    first=L['t']+np.argmax(sp)*0.01; last=L['t']+(len(sp)-1-np.argmax(sp[::-1]))*0.01
    words=L['text'].split()
    # phrases split after punctuation
    ph=[[]]
    for w in words:
        ph[-1].append(w)
        if w[-1] in '.,:?!' and w is not words[-1]: ph.append([])
    n=len(ph)-1
    allw=[len(re.sub(r'[^A-Za-z0-9]','',x))+2 for x in words]; tot0=sum(allw); g=[]; cum=0
    for j in range(n):
        cum+=sum(len(re.sub(r'[^A-Za-z0-9]','',x))+2 for x in ph[j]); exp=first+(last-first)*cum/tot0
        cand=[x for x in gaps if x not in g and (not g or x[1]>g[-1][1])]
        g.append(min(cand,key=lambda x:abs((x[1]+x[2])/2-exp)-0.02*x[0]))
    print('  gaps',[(round(x[1],2),round(x[2],2)) for x in gaps])
    bounds=[first]+[x for gg in g for x in (gg[1],gg[2])]+[last]
    out=[]
    for j,p in enumerate(ph):
        s,e2=bounds[2*j],bounds[2*j+1]
        wt=[len(re.sub(r'[^A-Za-z0-9]','',x))+2 for x in p]; tot=sum(wt); c=s
        for x,ww in zip(p,wt):
            d=(e2-s)*ww/tot; out.append([x,round(c,3),round(c+d,3)]); c+=d
    L['words']=out
    print(L['id'],len(gaps),n,[(w[0],w[1]) for w in out])
json.dump(T,open('vo_timing.json','w'),indent=1)
