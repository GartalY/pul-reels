import json
P={'f9a':'U.S. Space Force / public domain','musk':'UK Government / CC BY 2.0','earth':'NASA / public domain','f9b':'U.S. Space Force / public domain',
 'carr':'FCC / public domain','dc':'Tony Marinescu / Unsplash','solar':'NASA / public domain','ship':'Steve Jurvetson / CC BY 2.0',
 'trails':'International Gemini Observatory/NOIRLab / CC BY 4.0','paranal':'ESO / CC BY 4.0'}
P={k:{'src':f'img/{k}.jpg','credit':v} for k,v in P.items()}
S=[dict(k='f9a',t0=0,t1=2.3,z=[1.05,1.22],fx=0.5,fy=0.4),
   dict(k='musk',t0=2.3,t1=4.6,z=[1.0,1.12],fx=0.5,fy=0.3,label='ELON MUSK · SPACEX'),
   dict(k='earth',t0=4.6,t1=7.2,z=[1.0,1.15],fx=0.5,fy=0.5,dim=0.7),
   dict(k='f9b',t0=7.2,t1=8.75,z=[1.0,1.15],fx=0.45,fy=0.4,dim=0.75),
   dict(k='carr',t0=8.75,t1=10.15,z=[1.0,1.1],fx=0.5,fy=0.25,label='BRENDAN CARR · FCC CHAIRMAN'),
   dict(k='dc',t0=10.15,t1=12.15,z=[1.0,1.15],fx=0.5,fy=0.5),
   dict(k='solar',t0=12.15,t1=14.15,z=[1.0,1.14],fx=0.5,fy=0.5),
   dict(k='ship',t0=14.15,t1=16.9,z=[1.0,1.12],fx=0.55,fy=0.4,dim=0.6),
   dict(k='trails',t0=16.9,t1=18.6,z=[1.0,1.15],fx=0.5,fy=0.5),
   dict(k='paranal',t0=18.6,t1=20.3,z=[1.0,1.12],fx=0.5,fy=0.4)]
b=json.load(open('beats.json'))
open('film.js','w').write(open('film.tpl.js').read().replace('__TIMING__',open('timing.json').read()).replace('__PHOTOS__',json.dumps(P)).replace('__SHOTS__',json.dumps(S)).replace('__BEAT__',json.dumps({'offset':b['offset'],'period':b['period']})))
