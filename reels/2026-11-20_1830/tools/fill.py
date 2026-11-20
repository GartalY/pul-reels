import json
tm=json.load(open('timing.json')); tm.pop('source',None)
s=open('film.tpl.js').read().replace('__TIMING__',json.dumps(tm,ensure_ascii=False))
open('film.js','w').write(s)
dur=round(tm['dur']+1.3,2)
j=json.load(open('film.json')); j.update(duration=dur,poster=0.9,title='Neçə vyetnamlı?'); json.dump(j,open('film.json','w'),ensure_ascii=False)
print('dur',dur)
