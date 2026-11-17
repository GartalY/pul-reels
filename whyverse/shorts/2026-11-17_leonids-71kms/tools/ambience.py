# quiet non-melodic night-sky ambience: filtered noise wind + low sub hum + soft air shimmer, no notes
import numpy as np, soundfile as sf, scipy.signal as ss
SR=48000; D=24.0; n=int(SR*D); rng=np.random.default_rng(1117)
t=np.arange(n)/SR
def lp(x,f,o=2): b,a=ss.butter(o,f/(SR/2)); return ss.lfilter(b,a,x)
def bp(x,f1,f2): b,a=ss.butter(2,[f1/(SR/2),f2/(SR/2)],'band'); return ss.lfilter(b,a,x)
w=np.stack([lp(rng.standard_normal(n),420) for _ in range(2)],1)
sw=0.6+0.4*np.sin(2*np.pi*t[:,None]/9.0+np.array([[0,1.3]]))       # slow swell
w*=sw
air=np.stack([bp(rng.standard_normal(n),3500,7000) for _ in range(2)],1)*0.05*(0.5+0.5*np.sin(2*np.pi*t/6.5))[:,None]
hum=(np.sin(2*np.pi*55*t)*0.5+np.sin(2*np.pi*55.4*t)*0.5)[:,None]*0.12*np.ones((1,2))
x=w*0.9+air+hum
fade=np.minimum(1,np.minimum(t/1.0,(D-t)/1.5))[:,None]; x*=fade
x=x/np.abs(x).max()*0.5
sf.write('film/audio/music.wav',x.astype(np.float32),SR)
print('ok')
