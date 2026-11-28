import json
P={'feet':'Omar Lopez / Unsplash','hand':'Nathan Dumlao / Unsplash','shim1':'MEXT Japan / CC BY 4.0','ldp':'Lombroso / CC BY-SA 4.0',
 'yen':'Bank of Japan / public domain','diet':'Daderot / CC0','playground':'Leongsan / Unsplash','skytree':'Fabrizio Montanari / Unsplash',
 'temple':'Joris Beugels / Unsplash','shibuya':'Chintya Akemi Keirayuki / Unsplash','shim2':'Wikimedia Commons / CC BY-SA 4.0'}
P={k:{'src':f'img/{k}.jpg','credit':v} for k,v in P.items()}
T=json.load(open('timing.json'));L={l['id']:l for l in T['lines']}
l2,l3,l4,l5,l6=[L[k]['t0'] for k in ('l2','l3','l4','l5','l6')]
S=[dict(k='feet',t0=0,t1=1.55,z=[1.05,1.2],fx=0.45,fy=0.45),
   dict(k='hand',t0=1.55,t1=l2,z=[1.0,1.14],fx=0.5,fy=0.4),
   dict(k='shim1',t0=l2,t1=4.75,z=[1.0,1.1],fx=0.5,fy=0.22,label='HAKUBUN SHIMOMURA',sub='Head, LDP population strategy HQ'),
   dict(k='ldp',t0=4.75,t1=6.0,z=[1.0,1.14],fx=0.45,fy=0.4,label='LDP HEADQUARTERS · TOKYO'),
   dict(k='yen',t0=6.0,t1=7.35,z=[1.0,1.1],fx=0.78,fy=0.5,bgc='#E9E2D3'),
   dict(k='diet',t0=7.35,t1=l3,z=[1.0,1.15],fx=0.45,fy=0.4,label='NATIONAL DIET · TOKYO'),
   dict(k='playground',t0=l3,t1=10.95,z=[1.0,1.14],fx=0.5,fy=0.5),
   dict(k='skytree',t0=10.95,t1=l4,z=[1.0,1.12],fx=0.5,fy=0.4),
   dict(k='temple',t0=l4,t1=15.25,z=[1.0,1.14],fx=0.6,fy=0.5),
   dict(k='shibuya',t0=15.25,t1=l5,z=[1.0,1.14],fx=0.5,fy=0.75),
   dict(k='shim2',t0=l5,t1=l6,z=[1.0,1.12],fx=0.55,fy=0.3,label='HAKUBUN SHIMOMURA')]
b=json.load(open('beats.json'))
open('film.js','w').write(open('film.tpl.js').read().replace('__TIMING__',json.dumps(T,ensure_ascii=False)).replace('__PHOTOS__',json.dumps(P)).replace('__SHOTS__',json.dumps(S)).replace('__BEAT__',json.dumps({'offset':b['offset'],'period':b['period']})))
