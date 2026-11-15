import json,subprocess
L=[
 [("146",.08,1),("qol,",.82,0),("234",1.3,1),("oyun.",2.32,0)],
 [("Ronaldo",3.04,0),("millidən",3.46,0),("gedəndən",3.9,0),("sonra",4.4,0),("Portuqaliya",4.78,1),("ilk",5.46,1),("dəfə",5.66,0),("meydana",5.88,0),("çıxdı.",6.28,0)],
 [("Dünən",6.96,0),("Braqada",7.28,1),("futbolçuların",7.72,0),("hamısı",8.44,1),("7",8.94,1),("nömrəli",9.26,0),("formada",9.64,0),("idi.",10.06,0)],
 [("7-ci",10.62,1),("dəqiqədə",11.06,0),("stadion",11.62,0),("Ronaldonu",12.08,1),("alqışladı.",12.58,0)],
 [("Tribunada",13.48,0),("yazı",13.98,0),("var",14.24,0),("idi:",14.42,0),("«Sağ",14.9,1),("ol,",15.2,1),("kapitan»",15.34,1)],
 [("Danimarka",16.24,1),("isə",16.74,0),("4:1",17.08,1),("qalib",17.52,0),("gəldi.",17.86,0)],
 [("Amma",18.58,0),("Portuqaliya",18.78,0),("onsuz",19.6,0),("da",19.96,0),("dörddəbir",20.12,1),("finala",20.6,1),("çıxıb.",20.96,0)],
 [("Bəyən",21.72,1),("və",22.18,0),("izlə",22.36,1),("—",22.9,0),("hər",23.02,0),("gün",23.28,0),("bilmədiyin",23.56,0),("bir",24.1,0),("fakt!",24.3,0)]]
dur=24.72
lines=[{"t0":l[0][1],"words":[{"w":w,"t":t,"key":bool(k)} for w,t,k in l]} for l in L]
for j,l in enumerate(lines): l["t1"]=lines[j+1]["t0"] if j+1<len(lines) else dur
json.dump({"dur":dur,"lines":lines,"source":"ElevenLabs Scribe word alignment"},open('timing.json','w'),ensure_ascii=False,indent=0)
