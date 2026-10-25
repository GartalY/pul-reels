"""Composite text overlays on the 3D frames and mux with voice + music.
python3 -I compose.py <frames_dir> <voice_prefix> <out.mp4>"""
import json, math, os, subprocess, sys, tempfile
REPO = "/home/claude/pul-reels"
sys.path.insert(0, REPO)
from PIL import Image, ImageDraw
from factgen import F, GOLD, WHITE, INK, HANDLE, pill, text_block
from reelgen import music, ease

W, H, FPS = 1080, 1920, 30
SEG = [3.49, 7.91, 7.05, 9.78, 1.8]
ST = [sum(SEG[:i]) for i in range(len(SEG))]; DUR = sum(SEG)
BEATS = ["Bakı dəniz səviyyəsindən təxminən 28 metr aşağıda yerləşir. Dünyada bundan aşağıda olan başqa paytaxt yoxdur.",
         "Bakı həm də dəniz səviyyəsindən aşağıda olan ən böyük şəhərdir. Burada iki milyondan çox insan yaşayır.",
         "Bəs su niyə şəhəri basmır? Çünki Xəzər okeana bağlı deyil və onun suyu da okeandan 28 metrə yaxın aşağıdadır. Sən bunu bilirdin?"]
RED = (255, 80, 70)

def T(d, xy, s, font, fill, anchor="la"):
    d.text(xy, s, font=font, fill=fill, anchor=anchor, stroke_width=6, stroke_fill=(10, 12, 20))

def onscreen(p, m=60):
    return p is not None and m < p[0] < W - m and 200 < p[1] < 1150

def main():
    fdir, vpre, out = sys.argv[1:4]
    meta = {}
    for ln in open(os.path.join(fdir, "meta.jsonl")):
        m = json.loads(ln); meta[m["i"]] = m
    n = max(meta) + 1
    grad = Image.new("L", (1, H), 0)
    for y in range(H):
        grad.putpixel((0, y), int(235 * max(0, min(1, (y - 1080) / 300))))
    grad = grad.resize((W, H))
    shade = Image.new("RGB", (W, H), (8, 10, 18))
    tmp = tempfile.mkdtemp()
    for i in range(n):
        t = i / FPS; m = meta[i]
        sc = lambda p: None if p is None else (p[0] * 1.5, p[1] * 1.5)
        fr = Image.open(os.path.join(fdir, f"{i:05d}.jpg")).convert("RGB").resize((W, H), Image.LANCZOS)
        phase = max(j for j in range(len(SEG)) if ST[j] <= t + 1e-6); pt = t - ST[phase]
        if phase >= 1:
            a = min(1, (t - ST[1]) / 0.4)
            fr = Image.composite(shade, fr, grad.point(lambda v: int(v * a)))
        d = ImageDraw.Draw(fr)
        T(d, (W / 2, 70), HANDLE, F("SemiBold", 34), WHITE, "ma")
        pole, base = sc(m["pole"]), sc(m["poleBase"])
        if phase == 0:
            for k, ln in enumerate(["BAKI DƏNİZDƏN", "28 METR AŞAĞIDADIR"]):
                T(d, (W / 2, 170 + k * 106), ln, F("Black", 90), GOLD, "ma")
        if phase <= 1 and onscreen(pole) and m["grow"] > 0.05:
            T(d, (pole[0] + 34, pole[1] - 10), f"{int(round(28 * m['grow']))} m", F("Black", 76), GOLD, "lm")
            if m["grow"] > 0.97:
                T(d, (pole[0] + 34, pole[1] + 52), "okean səviyyəsi", F("Bold", 40), WHITE, "lm")
            if onscreen(base, 20) and m["grow"] > 0.97 and phase == 1:
                T(d, (base[0] + 30, base[1] + 30), "Xəzər və Bakı", F("Bold", 38), WHITE, "lm")
        if phase == 2:
            v = int(2_000_000 * ease(pt / 3.2)); s = f"{v:,}".replace(",", " ")
            a = ease(pt / 0.4)
            T(d, (W / 2, 230), s + ("+" if pt > 3.2 else ""), F("Black", 104), tuple(int(c * a) for c in GOLD), "ma")
            T(d, (W / 2, 350), "insan dəniz səviyyəsindən aşağıda", F("Bold", 42), tuple(int(c * a) for c in WHITE), "ma")
        if phase >= 3 and t > ST[3] + SEG[3] * 0.5:
            a = ease((t - ST[3] - SEG[3] * 0.5) / 0.6)
            oc, cs, rg = sc(m["oceanL"]), sc(m["caspL"]), sc(m["ridge"])
            if oc and 0 < oc[1] < 1150: T(d, (min(max(oc[0], 260), W - 260), oc[1] - 110), "OKEAN · 0 m", F("Black", 54), tuple(int(c * a) for c in WHITE), "ma")
            if cs and 0 < cs[1] < 1300: T(d, (min(max(cs[0], 300), W - 300), min(cs[1], 1080)), "XƏZƏR · −28 m", F("Black", 54), tuple(int(c * a) for c in GOLD), "ma")
            if rg and 0 < rg[1] < 1150:
                cx, cy, r = min(max(rg[0], 200), W - 200), rg[1], int(46 * a) + 1
                for sgn in (1, -1):
                    d.line([(cx - r, cy - sgn * r), (cx + r, cy + sgn * r)], fill=(10, 12, 20), width=26)
                    d.line([(cx - r, cy - sgn * r), (cx + r, cy + sgn * r)], fill=RED, width=16)
                T(d, (cx, cy + 64), "bağlı deyil", F("Black", 50), RED, "ma")
        if 1 <= phase <= 3:
            a = ease(pt / 0.25)
            if phase < 3: a *= 1 - ease((pt - (SEG[phase] - 0.25)) / 0.25)
            pill(d, 70, 1400, "BİLİRDİNİZMİ?" if phase == 1 else f"{phase}/3", F("Black", 40), GOLD, INK)
            text_block(d, 70, 1505 + (1 - a) * 40, BEATS[phase - 1], F("Bold", 56), tuple(int(c * a) for c in WHITE), W - 140)
        if phase == 4:
            msg = "Hər gün 13:00-da yeni Bakı faktı — izlə!"; fw = d.textlength(msg, font=F("Bold", 46)); a = ease(pt / 0.3)
            d.rounded_rectangle([(W - fw) / 2 - 32, 1620, (W + fw) / 2 + 32, 1704], 42, fill=tuple(int(c * a) for c in GOLD))
            d.text(((W - fw) / 2, 1633), msg, font=F("Bold", 46), fill=INK)
        d.rectangle([0, H - 8, W * t / DUR, H], fill=GOLD)
        fr.save(f"{tmp}/{i:05d}.jpg", quality=91)
    music(f"{tmp}/m.wav", DUR, 26)
    VO = [f"{vpre}_{k}.mp3" for k in range(4)]
    ins, fl = ["-i", f"{tmp}/m.wav"], ["[0:a]volume=0.2[m]"]
    for j, f in enumerate(VO):
        ms = int((ST[j] + 0.1) * 1000); ins += ["-i", f]; fl.append(f"[{j + 1}:a]adelay={ms}|{ms},volume=1.6[v{j}]")
    fl.append("[m]" + "".join(f"[v{j}]" for j in range(4)) + "amix=inputs=5:normalize=0:duration=first[a]")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex", ";".join(fl), "-map", "[a]", "-t", str(DUR), f"{tmp}/a.wav"], check=True)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", f"{tmp}/%05d.jpg", "-i", f"{tmp}/a.wav",
                    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "19", "-preset", "slow", "-c:a", "aac", "-b:a", "160k",
                    "-shortest", "-movflags", "+faststart", out], check=True)
    subprocess.run(["rm", "-rf", tmp])

if __name__ == "__main__":
    main()
