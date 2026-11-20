import json;t=open('timing.json').read();open('film.js','w').write(open('film.tpl.js').read().replace('__TIMING__',t))
