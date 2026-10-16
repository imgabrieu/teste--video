import json, os, numpy as np
from script import SCENES, FINAL
HERE = os.path.dirname(__file__)
DURS = json.load(open(os.path.join(HERE, "audio/lines/durs.json")))

def layout():
    t = 0.0; scenes = []; lines = []
    for sc in SCENES:
        start = max(sc["t0"], t); cur = start + sc["lead"]; first = True
        for lid, text, gap, lvl in sc["lines"]:
            cur += gap; lines.append(dict(id=lid, t=cur, dur=DURS[lid], lvl=lvl, scene=sc["id"])); cur += DURS[lid]
        end = max(start + sc["dur"], cur + 0.8)
        scenes.append(dict(id=sc["id"], name=sc["name"], t0=start, t1=end)); t = end
    apex = t                       # corte seco para silêncio
    f0 = apex + 1.0                # tela preta e silêncio antes do sopro
    ft = dict(black=apex, gust=f0, hebrew=f0 + 1.4, ruach=f0 + 3.6, conf=f0 + 5.6, info=f0 + 7.8, verse=f0 + 9.4)
    cur = f0 + 11.5
    for lid, text, gap, lvl in FINAL["lines"]:
        cur += gap; lines.append(dict(id=lid, t=cur, dur=DURS[lid], lvl=lvl, scene="fim")); cur += DURS[lid]
    total = cur + 1.2
    return scenes, lines, ft, apex, total

SCENES_T, LINES_T, FT, APEX, TOTAL = layout()
S = {s["id"]: s for s in SCENES_T}

def _curve(pts):
    xs, ys = zip(*pts); return lambda t: np.interp(t, xs, ys)

def _kf(spec):  # spec: [(scene_id, frac, value)]
    return _curve([(S[i]["t0"] + f * (S[i]["t1"] - S[i]["t0"]), v) for i, f, v in spec])

# intensidade musical 0..1
INTENS = _kf([("s1",0,0.0),("s1",1,0.06),("s2",0.5,0.14),("s3",1,0.28),("s4",0.1,0.2),("s4",1,0.22),
    ("s5",1,0.38),("s6",0.1,0.5),("s6",1,0.82),("s7",0.5,0.92),("s8",0.05,0.55),("s8",1,0.7),
    ("s9",0.5,0.9),("s10",0.5,0.96),("s10",1,1.0)])
# força do vento visual 0..1
WIND = _kf([("s1",0,0.0),("s1",0.5,0.05),("s1",1,0.22),("s2",1,0.45),("s3",1,0.55),("s4",0,0.0),("s4",1,0.0),
    ("s5",0.5,0.04),("s5",1,0.3),("s6",0.05,0.5),("s6",1,1.0),("s7",0.5,1.0),("s7",1,0.8),
    ("s8",0,0.12),("s8",0.6,0.3),("s8",1,0.55),("s9",0.4,0.9),("s9",1,1.0),("s10",0,0.6),("s10",1,0.95)])

def scene_at(t):
    for s in SCENES_T:
        if s["t0"] <= t < s["t1"]: return s
    return None

if __name__ == "__main__":
    for s in SCENES_T: print(s["id"], round(s["t0"],1), round(s["t1"],1))
    print("apex", round(APEX,1), {k: round(v,1) for k,v in FT.items()}, "total", round(TOTAL,1))
    json.dump(dict(scenes=SCENES_T, lines=LINES_T, final=FT, apex=APEX, total=TOTAL), open(os.path.join(HERE,"timeline.json"),"w"), indent=1)
