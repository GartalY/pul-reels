import json, os
tm = json.load(open('timing.json'))
hus = "hus: 'assets/hus.jpg'," if os.path.exists('assets/hus.jpg') else ''
s = open('film.tpl.js').read().replace('__TIMING__', json.dumps(tm, ensure_ascii=False)).replace('__HUS__', hus)
open('film.js', 'w').write(s)
j = json.load(open('film.json')); j.update(duration=tm['dur'], poster=0.9, title='Azıx mağarasının 350 000 illik sirri')
json.dump(j, open('film.json', 'w'), ensure_ascii=False)
