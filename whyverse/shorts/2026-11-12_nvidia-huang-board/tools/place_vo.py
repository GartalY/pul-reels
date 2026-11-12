import json, numpy as np, soundfile as sf, math
L=json.load(open('lines.json')); SR=48000
import scipy.signal as ss
segs=[]; t=0.12; out=[]
for i,(ch,lid,text) in enumerate(L):
    a,sr=sf.read(f'vo/{lid}.wav')
    if sr!=SR: a=ss.resample_poly(a,SR,sr)
    env=np.abs(a); thr=10**(-40/20)*env.max()
    idx=np.where(env>thr)[0]; s0=max(0,idx[0]-int(0.03*SR)); s1=min(len(a),idx[-1]+int(0.08*SR))
    a=a[s0:s1]
    if i>0:
        t=math.ceil((t+0.12)/0.25)*0.25  # next beat after a short breath
    out.append((lid,round(t,3),round(len(a)/SR,3),text)); segs.append((t,a)); t=t+len(a)/SR
total=t+1.3
buf=np.zeros(int(total*SR))
for st,a in segs: i0=int(st*SR); buf[i0:i0+len(a)]+=a
buf=buf/np.abs(buf).max()*0.89
sf.write('nvidia/audio/vo.wav',np.stack([buf,buf],1),SR)
json.dump(out,open('nvidia/vo_timing.json','w'),indent=1)
for o in out: print(o[:3], round(o[1]+o[2],2))
print('total',round(total,2))
