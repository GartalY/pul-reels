import json
P={'p1979':'Jon Harder / CC BY 2.5','p2005':'cisc1970 / CC BY 2.0','parade18a':'Phil Roeder / CC BY 2.0','crowd07':'Ian Gampon / CC BY 2.0',
 'infl2':'Phil Roeder / CC BY 2.0','infl4':'Phil Roeder / CC BY 2.0','infl3':'Rhododendrites / CC BY-SA 4.0','hsqold':'Irving Underhill / public domain',
 'ww1b':'U.S. National Archives / public domain', 'ww2':'U.S. Navy / public domain'}
P={k:{'src':f'img/{k}.jpg','credit':v} for k,v in P.items()}
S=[dict(k='p1979',t0=0,t1=2.0,z=[1.05,1.2],fx=0.45,fy=0.5,rot=-0.025,label='1979'),
   dict(k='p2005',t0=2.0,t1=3.5,z=[1.0,1.15],fx=0.3,fy=0.5,rot=0.02,frm='l',label='2005'),
   dict(k='parade18a',t0=3.5,t1=5.4,z=[1.0,1.14],fx=0.4,fy=0.4,rot=-0.015,frm='b',label='2018'),
   dict(k='crowd07',t0=5.4,t1=7.4,z=[1.0,1.12],fx=0.5,fy=0.3,rot=0.025,frm='r',label='2007'),
   dict(k='infl3',t0=7.4,t1=8.9,z=[1.0,1.18],fx=0.5,fy=0.5,rot=-0.02,frm='l'),
   dict(k='infl4',t0=8.9,t1=10.6,z=[1.0,1.15],fx=0.5,fy=0.5,rot=0.018,frm='t'),
   dict(k='infl2',t0=10.6,t1=12.9,z=[1.0,1.12],fx=0.5,fy=0.6,rot=-0.02,frm='r'),
   dict(k='hsqold',t0=12.9,t1=15.2,z=[1.05,1.2],fx=0.4,fy=0.5,rot=0.02,frm='l',bw=1,label='MACY\'S, EARLY 1900s'),
   dict(k='ww1b',t0=15.2,t1=17.6,z=[1.0,1.12],fx=0.55,fy=0.2,label='SCRAP DRIVE, 1942',rot=-0.02,frm='b',bw=1),
   dict(k='ww2',t0=17.6,t1=19.95,z=[1.0,1.15],fx=0.5,fy=0.4,label='U.S. NAVY BLIMP, 1943',rot=0.02,frm='r',bw=1)]
for s in S:
    if 'frm' in s: s['from']=s.pop('frm')
b=json.load(open('beats.json'))
open('film.js','w').write(open('film.tpl.js').read().replace('__TIMING__',open('timing.json').read()).replace('__PHOTOS__',json.dumps(P)).replace('__SHOTS__',json.dumps(S)).replace('__BEAT__',json.dumps({'offset':b['offset'],'period':b['period']})))
