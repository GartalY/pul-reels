import json
tm = json.load(open('timing.json'))
s = open('film.tpl.js').read().replace('__TIMING__', json.dumps(tm, ensure_ascii=False))
open('film.js', 'w').write(s)
j = json.load(open('film.json')); j.update(duration=tm['dur'], poster=0.9, title='Xəzərin suyu krana gələcək')
json.dump(j, open('film.json', 'w'), ensure_ascii=False)
