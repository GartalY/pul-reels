import json
P={'launch13':'ForrestXYC / CC BY-SA 4.0','tgsky':'BugWarp / CC BY 4.0','ali':'China News Service / CC BY 4.0','vab':'China News Service / CC BY 4.0',
 'launch19':'China News Service / CC BY 4.0','tgrender':'Shujianyang / CC BY-SA 4.0','tgrear':'China Manned Space Engineering Office / CC BY 4.0',
 'handshake':'China News Service / CC BY 4.0','tang':'China News Service / CC BY 4.0','wuyi':'China News Service / CC BY 4.0',
 'cabinet':'Wang Xiang, Zhang Qiao, Wang Wei / CC BY 4.0','pkspace':'NASA (ISS Expedition 6) / public domain'}
P={k:{'src':f'img/{k}.jpg','credit':v} for k,v in P.items()}
b=json.load(open('beats.json'))
open('film.js','w').write(open('film.tpl.js').read().replace('__TIMING__',open('timing.json').read()).replace('__PHOTOS__',json.dumps(P)).replace('__BEAT__',json.dumps({'offset':b['offset'],'period':b['period']})))
