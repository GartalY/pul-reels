import json,os
t=open('timing.json').read()
P={}
if os.path.exists('img/gukesh.jpg'): P['g']={'src':'img/gukesh.jpg','credit':'Frans Peeters / CC BY-SA 2.0'}
if os.path.exists('img/sindarov.jpg'): P['s']={'src':'img/sindarov.jpg','credit':'ChessKelly / CC BY 4.0'}
open('film.js','w').write(open('film.tpl.js').read().replace('__TIMING__',t).replace('__PHOTOS__',json.dumps(P)))
print('photos',list(P))
