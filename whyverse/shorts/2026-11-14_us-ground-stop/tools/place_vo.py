import json, numpy as np, soundfile as sf, math, re
import scipy.signal as ss
L=json.load(open('lines.json')); SR=48000
segs=[]; t=0.10; out=[]
for i,(ch,lid,text) in enumerate(L):
    a,sr=sf.read(f'vo/{lid}.wav')
    if sr!=SR: a=ss.resample_poly(a,SR,sr)
    env=np.abs(a); thr=10**(-40/20)*env.max()
    idx=np.where(env>thr)[0]; s0=max(0,idx[0]-int(0.03*SR)); s1=min(len(a),idx[-1]+int(0.08*SR))
    a=a[s0:s1]
    if i>0: t=math.ceil((t+0.15)/0.25)*0.25
    d=len(a)/SR
    # word timing: weight by letters (+pause for punctuation), using the line's speech envelope
    words=text.split(); w=[len(re.sub(r'[^A-Za-z0-9]','',x))+1.5 for x in words]
    pun=[0.35 if x[-1] in '.,:?' else 0 for x in words]
    tot=sum(w)+sum(pun[:-1]); speak=d-0.1; k=speak/tot; cur=0.03; W=[]
    for x,ww,p in zip(words,w,pun):
        W.append([x,round(t+cur,3),round(t+cur+ww*k,3)]); cur+=ww*k+p*k
    out.append({'id':lid,'t':round(t,3),'d':round(d,3),'text':text,'words':W}); segs.append((t,a)); t=t+d
total=t+1.6
buf=np.zeros(int(total*SR))
for st,a in segs: i0=int(st*SR); buf[i0:i0+len(a)]+=a
buf=buf/np.abs(buf).max()*0.89
sf.write('audio/vo.wav',np.stack([buf,buf],1),SR)
json.dump(out,open('vo_timing.json','w'),indent=1)
for o in out: print(o['id'],o['t'],round(o['t']+o['d'],2))
print('total',round(total,2))
