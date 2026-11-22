python3 -c "
import json;t=open('timing.json').read();s=open('film.src.js').read();open('film.js','w').write(s.replace('__TIMING__',t))"
