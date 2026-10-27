import json,sys
S="/tmp/claude-0/-home-user-teste--video/6cc7b913-5350-568f-9d6e-608b384c9a7f/scratchpad/w8"
FPS=30
# page = list of (text,start_s); words not listed are dropped
A=[
 [("Essa",0.0),("princesa",0.4),("já",1.12),("acompanhou.",1.28)],
 [("Gente,",2.4),("como",2.8),("cresceu.",3.12)],
 [("A",4.56),("gente",4.64),("é",4.96),("felicidade.",5.12)],
 [("E",9.2),("não",9.44),("só",9.68),("vim",10.0),("dar",10.24),("um",10.4),("abraço,",10.56)],
 [("só",11.04),("vim",11.28),("dar",11.44),("umas",11.6),("caixinhas.",11.84)],
 [("Umas",12.72),("caixinhas",12.96),("milagrosas",13.92),("pra",15.28),("você.",15.68)],
 [("Conseguimos",20.56),("mais",21.44),("um",22.16),("suplemento.",22.4)],
 [("Sete",23.7),("vezes.",24.1)],
 [("Mas",25.06),("cinco.",25.3)],
 [("Vou",27.06),("falar",27.22),("com",27.38),("o",27.54),("pessoal",27.62),("da",27.86),("Paisa",27.94)],
 [("pra",28.42),("ele",28.5),("pegar",28.58),("mais",28.98),("aqui",29.14),("pra",29.3),("gente.",29.46)],
 [("Ah,",29.86),("tipo,",30.18),("seu",30.9),("cabelo",31.06),("cresceu,",31.3),("olha",31.78),("só.",32.02)],
 [("Caramba.",33.22)],
 [("Isso",34.1),("faz",35.22),("tanto",35.78),("vale",36.58),("a",36.9),("pena,",36.98),("sabe?",37.22)],
 [("Pra",37.54),("gente",37.7),("é",37.94),("de",38.1),("coração.",38.26)],
 [("A",39.86),("gente",39.94),("fica",40.02),("tão",40.26),("tensa",40.42),("quanto",40.66),("você.",40.9)],
 [("Falei",41.38),("nova",41.7),("como",42.1),("o",42.26),("Betão.",42.34)],
 [("Gente,",44.02),("meu",44.34),("Deus",44.58),("do",44.66),("céu.",44.74)],
 [("Não,",44.98),("cadê",45.46),("muda,",45.78),("eu",46.02),("falei.",46.1)],
 [("E",46.74),("ela",46.82),("que",47.06),("tá",47.22),("chiquinha",47.62),("hoje.",48.18)],
 [("Ela",49.06),("fez",49.22),("até",49.46),("uma",49.7),("chiquinha",49.86),("aqui.",50.26)],
 [("Isso",54.4),("não",54.72),("tem",54.96),("preço.",55.2)],
 [("Não",55.92),("tem.",56.0)],
 [("Maria,",56.82),("gente,",57.54),("que",57.86),("mudança",58.02),("radical.",58.58)],
 [("Deixa",59.78),("eu",59.94),("te",60.02),("perguntar,",60.18)],
 [("você",60.58),("teve",60.74),("a",60.9),("sensação",61.06),("que",61.3),("passou",61.46),("rápido",61.78),("ou",62.18),("não?",62.42)],
 [("Passou",63.54),("muito",63.94),("rápido,",64.1),("né?",64.42)],
 [("É",64.66),("porque",64.82),("eu",65.22),("vim",65.38),("com",65.54),("a",65.62)],
 [("Já",70.12),("tô",70.36),("com",70.84),("cabelo,",71.08),("gente,",71.96)],
 [("tá",72.2),("perdendo",72.44),("tudo.",72.92)],
 [("O",74.76),("que",74.84),("eu",74.92),("queria",75.16),("trazer",75.4),("pra",75.72),("você",75.88)],
 [("é",76.2),("que",76.44),("a",76.6),("gente",76.76),("nunca",76.92),("teve",77.24),("tanta",77.72),("coisa",78.12),("nova",78.52)],
 [("para",79.4),("o",80.2),("seu",80.28),("diagnóstico.",80.44)],
 [("Então",81.08),("isso",81.4),("aqui",81.56),("é",81.8),("só",81.96),("um",82.36),("pouquinho",82.52)],
 [("do",83.24),("que",83.48),("a",83.64),("gente",83.72),("pode",83.8),("fazer",84.12),("por",84.44),("você",84.76)],
 [("num",85.16),("futuro",85.4),("bem",85.72),("próximo.",86.04)],
 [("Porque",86.76),("nesse",87.24),("próximo",87.8),("ano,",88.44)],
 [("além",89.0),("dessas",89.32),("medicações,",89.72),("vão",90.2),("ter",90.44),("mais",90.52),("umas",90.68),("10",90.92),("medicações.",91.16)],
 [("Já",91.8),("tem",91.96),("duas",92.12),("aprovadas.",92.44)],
 [("Uma",93.35),("sociedade",93.67),("europeia",94.07),("já",94.55),("tem",94.71),("a",95.03),("menina.",95.27)],
 [("Já",101.35),("tem",101.43),("coisas",101.75),("melhorando.",102.07)],
 [("Então",102.71),("são",102.95),("só",103.19),("essas",103.67),("duas.",103.91)],
]
B=[
 [("Toda",0.32),("clínica.",0.72)],
 [("Ai,",1.36),("minha",1.68),("mãe.",2.0)],
 [("Ai,",2.48)],
 [("Ela",3.92),("é",4.08),("uma",4.24),("princesa.",4.48)],
 [("Ela",5.92),("é",6.16),("uma",6.32),("princesa.",6.56)],
 [("Aqui",7.92),("é",8.24),("a",8.4),("tia",8.48)],
 [("Trabalha",10.48),("aqui",10.88),("na",11.04),("clínica",11.2),("também.",11.68)],
 [("Ela",12.8),("acabou",13.04),("de",13.52),("fazer",13.68),("cirurgia.",14.0)],
 [("É",15.04),("cirurgia.",16.08)],
 [("A",18.0),("cirurgia",18.16),("de",18.72),("uma",18.88),("pintinha,",19.04),("né?",19.6)],
]
def build(pages,faces,total,end_speech_hold=14):
    out=[];n=len(pages)
    for i,p in enumerate(pages):
        f0=max(0,round(p[0][1]*FPS)-1)
        nxt=round(pages[i+1][0][1]*FPS)-1 if i+1<n else total
        last=round(p[-1][1]*FPS)
        f1=max(f0+10,min(nxt,last+end_speech_hold))
        t0,t1=f0/FPS,f1/FPS
        boxes=[b for t,bs in faces if t0-0.2<=t<=t1+0.2 for b in bs]
        ok=None;bad=False
        for y in list(range(1400,200,-40)):
            top,bot=y-70,y+70
            if all(b[1]+b[3]+40<top or b[1]-40>bot for b in boxes): ok=y;break
        if ok is None:
            bad=True
            ok=min(range(200,1401,40),key=lambda y:sum(max(0,min(y+70,b[1]+b[3])-max(y-70,b[1])) for b in boxes))
        out.append({"from":f0,"to":f1,"y":ok,"bad":bad,"words":[{"t":t,"f":round(s*FPS)} for t,s in p]})
    return out
for k,pg,tot in (("1",A,round(128.7667*FPS)),("2",B,round(36.9333*FPS))):
    faces=json.load(open(f"{S}/{'a' if k=='1' else 'b'}/faces.json"))
    pages=build(pg,faces,tot if k=="2" else round(104.5*FPS))
    json.dump({"frames":tot,"pages":pages},open(f"src/vid/data{k}.json","w"),ensure_ascii=False)
    print(k,len(pages),[ (p['from'],p['y']) for p in pages if p['y']!=1400][:60], [p['from'] for p in pages if p['bad']])
