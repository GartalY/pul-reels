import json
tm=json.load(open('timing.json'))
FIX={4:{"müdafiə,":11.08,"ticarət":12.05,"və":13.58,"təhsil.":13.80},7:{"icazəsi":24.76,"verib.":25.40}}
for li,f in FIX.items():
  for w in tm['lines'][li]['words']:
    if w['w'] in f: w['t']=f[w['w']]
try:
  ov=json.load(open('timing_override.json')); tm['lines']=ov['lines']
except FileNotFoundError: pass
tm.pop('pauses',None)
s=open('film.tpl.js').read().replace('__TIMING__',json.dumps(tm,ensure_ascii=False))
open('film.js','w').write(s)
dur=round(tm['dur']+1.3,2)
j=json.load(open('film.json')); j['duration']=dur; j['poster']=0.6; json.dump(j,open('film.json','w'),ensure_ascii=False)
b=json.load(open('beats.json')); b['duration']=dur; json.dump(b,open('beats.json','w'))
print('dur',dur)
