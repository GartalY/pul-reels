import json
P={'hces':'Joseph Zadeh / CC BY-SA 4.0','nasdaq2':'Luca Marfè / CC BY 2.0','nasdaq':'ajay_suresh / CC BY 2.0','hstan':'Anderseidesvik / CC BY-SA 4.0',
 'h2010':'Masaru Kamikura / CC BY 2.0','hq':'Coolcaesar / CC BY-SA 4.0','hstan2':'Anderseidesvik / CC BY 4.0','h2016':'NVIDIA Taiwan / CC BY 2.0',
 'hstan3':'Anderseidesvik / CC BY 4.0','die':'Fritzchens Fritz / CC0','hq2':'Daniel J. Prostak / CC BY-SA 4.0'}
P={k:{'src':f'img/{k}.jpg','credit':v} for k,v in P.items()}
open('film.js','w').write(open('film.tpl.js').read().replace('__TIMING__',open('timing.json').read()).replace('__PHOTOS__',json.dumps(P)))
