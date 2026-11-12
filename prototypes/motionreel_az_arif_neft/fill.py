import json,sys
# args: real starts r0..r4, durations d0..d4, total
lines=[("Dənizin ortasında bir şəhər var.",["şəhər"]),("Neft Daşları. Min doqquz yüz qırx doqquzda batırılmış gəmilərin üstündə salınıb.",["gəmilərin"]),
("Körpülərinin uzunluğu iki yüz kilometrdən çoxdur.",["iki","yüz"]),("Ginnesə görə, dünyanın ən qədim dəniz neft platformasıdır.",["ən","qədim"]),("Bunu bilirdinizmi?",["bilirdinizmi?"])]
plan=[0.1,2.2,6.6,9.6,13.5]; 
st=json.loads(sys.argv[1]); du=json.loads(sys.argv[2]); tot=float(sys.argv[3])
vo=[[st[i],du[i],lines[i][0],lines[i][1]] for i in range(5)]
warp=[[0,0]]+[[st[i],plan[i]] for i in range(5)]+[[tot,16]]
s=open('film.tpl.js').read().replace('__VO__',json.dumps(vo,ensure_ascii=False)).replace('__WARP__',json.dumps(warp))
open('film.js','w').write(s)
j=json.load(open('film.json')); j['duration']=tot; json.dump(j,open('film.json','w'),ensure_ascii=False)
b=json.load(open('beats.json')); b['duration']=tot; json.dump(b,open('beats.json','w'))
