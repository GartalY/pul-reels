import json;s=open('film.src.js').read();open('film.js','w').write(s.replace('__TIMING__',open('timing.json').read()))
