import json
T=json.load(open('vo_timing.json'))
REP={'Fifteen':'15','Three':'3','Thirty':'30','four':'4','two:':'2:'}
KEY={'15','kilometres.','war','zone.','Lewis','Pugh','Hormuz.','3','days,','Oman','Cape','30','tanker','hit','4','kilometres','2:','burning','gas','North','Pole.','risk','wildlife.','Like','follow','Whyverse'}
out=[]
for L in T:
    ws=[[REP.get(w[0],w[0]),w[1]] for w in L['words']]
    out.append({'id':L['id'],'t0':L['t'],'t1':round(L['t']+L['d'],3),'words':[{'w':w,'t':round(float(t),3),'key':w in KEY} for w,t in ws]})
json.dump({'dur':round(T[-1]['t']+T[-1]['d'],3),'lines':out},open('timing.json','w'))
