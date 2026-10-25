"""PROTOTYPE (2026-10-25): animated pixel-art reel for "Bakı dənizdən 28 metr aşağıdadır".

python3 prototypes/anim_baku.py <voice_prefix> <out.mp4>
voice_prefix = files <prefix>_0.mp3 (hook) .. _3.mp3 made by voice.py.
Scene is drawn at 270x480 and scaled x4 (pixel look, like the island prototype); text is drawn crisp on top.
"""
import math, os, random, subprocess, sys, tempfile
from PIL import Image, ImageDraw
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from factgen import F, GOLD, WHITE, INK, HANDLE, pill, text_block
from reelgen import music, ease

W, H, FPS, S = 1080, 1920, 30, 4
w, h = W // S, H // S
Y0 = 120          # ocean level (0 m) in low-res px
YC = 190          # Caspian level / Baku (-28 m): 28 m drawn as 70 px (exaggerated)
BED = 300         # bottom of the scene
SHORE = 196       # city x-range ends where the Caspian starts
HOOK = "BAKI DƏNİZDƏN 28 METR AŞAĞIDADIR"
BEATS = ["Bakı dəniz səviyyəsindən təxminən 28 metr aşağıda yerləşir. Dünyada bundan aşağıda olan başqa paytaxt yoxdur.",
         "Bakı həm də dəniz səviyyəsindən aşağıda olan ən böyük şəhərdir. Burada iki milyondan çox insan yaşayır.",
         "Bəs su niyə şəhəri basmır? Çünki Xəzər okeana bağlı deyil və onun suyu da okeandan 28 metrə yaxın aşağıdadır. Sən bunu bilirdin?"]

def adur(f):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f],
                                capture_output=True, text=True).stdout)

def lerp(a, b, t): return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

rnd = random.Random(7)
CLOUDS = [(rnd.uniform(0, w), rnd.uniform(18, 70), rnd.uniform(14, 30), rnd.uniform(1.5, 4)) for _ in range(6)]
BIRDS = [(rnd.uniform(0, w), rnd.uniform(40, 90), rnd.uniform(6, 12)) for _ in range(4)]
# city blocks: (x, width, height, colour)
BLOCKS, x = [], 132
while x < SHORE - 6:
    bw = rnd.randint(5, 9); BLOCKS.append((x, bw, rnd.randint(10, 30), rnd.choice([(196, 180, 150), (170, 160, 140), (210, 196, 168), (150, 140, 126)])))
    x += bw + 1
PEOPLE = [(rnd.uniform(134, SHORE - 4), rnd.uniform(0.4, 1.2), rnd.random()) for _ in range(90)]

def scene(t, phase, pt):
    """phase: 0 hook, 1..3 beats, 4 outro; pt = time inside the phase (s)."""
    im = Image.new("RGB", (w, h)); d = ImageDraw.Draw(im)
    for y in range(BED):   # sky gradient (late afternoon)
        d.line([(0, y), (w, y)], fill=lerp((72, 118, 190), (250, 196, 140), min(1, y / 200)))
    d.ellipse([200, 30, 228, 58], fill=(255, 226, 150))                       # sun
    for cx, cy, cw, sp in CLOUDS:
        xx = (cx + t * sp) % (w + 60) - 30
        for k in range(3): d.ellipse([xx + k * cw * 0.35, cy - 4 + (k % 2) * 3, xx + k * cw * 0.35 + cw * 0.6, cy + 5], fill=(255, 244, 232))
    for bx, by, sp in BIRDS:
        xx = (bx + t * sp) % (w + 20) - 10; f = int(t * 6 + bx) % 2
        d.line([(xx - 2, by - f), (xx, by), (xx + 2, by - f)], fill=(60, 50, 60))
    # ocean (left) at 0 m
    d.rectangle([0, Y0, 66, BED], fill=(30, 92, 168))
    for i in range(0, 67, 4):
        d.point((i, Y0 + int(1.2 * math.sin(t * 3 + i * 0.5))), fill=(190, 225, 255))
    # land between ocean and Caspian: mountains falling to Baku
    poly = [(60, BED), (60, Y0 + 2), (72, Y0 - 14), (82, Y0 - 34), (92, Y0 - 22), (100, Y0 - 40), (112, Y0 - 10),
            (124, YC - 30), (132, YC - 4), (SHORE, YC - 4), (SHORE, BED)]
    d.polygon(poly, fill=(132, 112, 78))
    d.polygon([(82, Y0 - 34), (86, Y0 - 28), (78, Y0 - 28)], fill=(245, 245, 250))
    d.polygon([(100, Y0 - 40), (104, Y0 - 33), (96, Y0 - 33)], fill=(245, 245, 250))
    d.rectangle([60, BED - 40, SHORE, BED], fill=(104, 86, 60))
    # Caspian (right) at -28 m
    d.rectangle([SHORE, YC, w, BED], fill=(36, 112, 170))
    d.rectangle([0, BED, w, h], fill=(14, 17, 28))
    for i in range(SHORE, w, 4):
        d.point((i, YC + int(1.2 * math.sin(t * 3 + i * 0.4))), fill=(200, 232, 255))
    bob = math.sin(t * 2) * 1.2
    d.polygon([(226, YC - 1 + bob), (240, YC - 1 + bob), (237, YC + 2 + bob), (229, YC + 2 + bob)], fill=(240, 240, 240))
    d.line([(233, YC - 1 + bob), (233, YC - 9 + bob)], fill=(80, 60, 50)); d.polygon([(234, YC - 9 + bob), (240, YC - 3 + bob), (234, YC - 3 + bob)], fill=(250, 250, 250))
    # city
    gy = YC - 4
    for bx, bw, bh, c in BLOCKS:
        d.rectangle([bx, gy - bh, bx + bw - 1, gy], fill=c)
        for wy in range(gy - bh + 2, gy - 1, 3):
            for wx in range(bx + 1, bx + bw - 1, 2):
                d.point((wx, wy), fill=(250, 220, 120) if (wx * 7 + wy * 3 + int(t * 2)) % 9 == 0 else (90, 90, 110))
    for k, fx in enumerate((150, 158, 166)):   # Flame Towers
        hh = 46 + (k == 1) * 8
        d.polygon([(fx, gy), (fx + 6, gy), (fx + 6, gy - hh + 12), (fx + 3, gy - hh), (fx, gy - hh + 10)], fill=(60, 96, 150))
        fl = int(1.5 * math.sin(t * 8 + k)); d.line([(fx + 3, gy - hh + 4 + fl), (fx + 3, gy - 4)], fill=(255, 140, 40))
    d.rectangle([138, gy - 12, 143, gy], fill=(200, 180, 140)); d.rectangle([137, gy - 13, 144, gy - 12], fill=(180, 160, 120))   # Maiden Tower
    # 0 m dashed line across
    for xx in range(0, w, 6): d.line([(xx, Y0), (xx + 3, Y0)], fill=(255, 255, 255))
    # phase overlays (low-res parts)
    if phase == 0:   # marker drops from 0 m to the city
        a = ease(pt / 2.2); yy = Y0 + (gy - Y0) * a
        d.line([(178, Y0), (178, yy)], fill=GOLD, width=1); d.polygon([(175, yy - 3), (181, yy - 3), (178, yy)], fill=GOLD)
    if phase >= 1:
        d.line([(178, Y0), (178, gy)], fill=GOLD); d.polygon([(175, gy - 3), (181, gy - 3), (178, gy)], fill=GOLD)
    if phase == 1:   # pulsing ring around Baku
        r = 26 + 3 * math.sin(pt * 4)
        d.ellipse([162 - r, gy - 20 - r * 0.7, 162 + r, gy - 20 + r * 0.7], outline=GOLD)
    if phase >= 2:   # people appear and walk
        n = int(len(PEOPLE) * (ease(pt / 3) if phase == 2 else 1))
        for px, sp, ph in PEOPLE[:n]:
            xx = 134 + ((px - 134 + t * sp * 3) % (SHORE - 138))
            d.point((xx, gy - 1), fill=(30, 30, 40)); d.point((xx, gy - 2), fill=[(220, 60, 60), (60, 120, 220), (240, 200, 60)][int(ph * 3)])
    if phase >= 3:   # Caspian level line + land barrier
        for xx in range(SHORE - 60, w, 6): d.line([(xx, YC), (xx + 3, YC)], fill=(255, 220, 120))
    return im.resize((W, H), Image.NEAREST), gy

def T(dd, xy, s, font, fill):
    dd.text(xy, s, font=font, fill=fill, stroke_width=5, stroke_fill=(14, 17, 28))

def main():
    pre, out = sys.argv[1], sys.argv[2]
    VO = [f"{pre}_{i}.mp3" for i in range(4)]
    D = [adur(f) for f in VO]
    seg = [max(1.5, D[0] + 0.35)] + [max(2.0, x + 0.35) for x in D[1:]] + [1.8]
    starts = [sum(seg[:i]) for i in range(len(seg))]; dur = sum(seg)
    tmp = tempfile.mkdtemp()
    for i in range(int(dur * FPS)):
        t = i / FPS
        phase = max(j for j in range(len(seg)) if starts[j] <= t); pt = t - starts[phase]
        fr, gy = scene(t, phase, pt); dd = ImageDraw.Draw(fr)
        T(dd, ((W - dd.textlength(HANDLE, F("SemiBold", 34))) / 2, 70), HANDLE, F("SemiBold", 34), WHITE)
        T(dd, (14 * S, (Y0 - 9) * S), "0 m · okean", F("Bold", 34), WHITE)
        if phase == 0:   # hook text + counter
            for k, ln in enumerate(["BAKI DƏNİZDƏN", "28 METR AŞAĞIDADIR"]):
                fnt = F("Black", 88); dd.text(((W - dd.textlength(ln, font=fnt)) / 2 + 3, 150 + k * 104 + 3), ln, font=fnt, fill=INK)
                dd.text(((W - dd.textlength(ln, font=fnt)) / 2, 150 + k * 104), ln, font=fnt, fill=GOLD)
            v = int(round(28 * ease(pt / 2.2)))
            T(dd, (200 * S, (Y0 + (gy - Y0) * ease(pt / 2.2) - 20) * S), f"−{v} m", F("Black", 72), GOLD)
        else:
            T(dd, (200 * S, (gy - 20) * S), "−28 m", F("Black", 72), GOLD)
            T(dd, (206 * S, (YC + 18) * S), "Xəzər", F("Bold", 40), WHITE)
            T(dd, (4 * S, (Y0 + 18) * S), "Okean", F("Bold", 40), WHITE)
        if phase == 1:
            T(dd, (112 * S, (gy - 58) * S), "ən aşağı paytaxt", F("Bold", 40), GOLD)
        if phase == 2:
            n = int(2_000_000 * ease(pt / 3)); s = f"{n:,}".replace(",", " ") + (" +" if pt > 3 else "")
            T(dd, (112 * S, (gy - 58) * S), s + " nəfər", F("Black", 48), GOLD)
        if phase == 3:   # red X on the land between ocean and Caspian
            a = ease(pt / 0.5); cx, cy, r = 92 * S, (Y0 + 24) * S, int(34 * a) + 1
            dd.line([(cx - r, cy - r), (cx + r, cy + r)], fill=(230, 60, 60), width=14)
            dd.line([(cx - r, cy + r), (cx + r, cy - r)], fill=(230, 60, 60), width=14)
            if pt > 0.6: T(dd, (cx - 150, cy + 50), "bağlı deyil", F("Black", 44), (255, 90, 90))
        if 1 <= phase <= 3:   # beat text (bottom, like the normal reels)
            dd.rectangle([0, 1230, W, H], fill=(14, 17, 28))
            a = ease(pt / 0.25)
            if phase < 3: a *= 1 - ease((pt - (seg[phase] - 0.25)) / 0.25)
            pill(dd, 70, 1270, "BİLİRDİNİZMİ?" if phase == 1 else f"{phase}/3", F("Black", 40), GOLD, INK)
            text_block(dd, 70, 1380 + (1 - a) * 40, BEATS[phase - 1], F("Bold", 58), tuple(int(x * a) for x in WHITE), W - 140)
        if phase == 4:
            dd.rectangle([0, 1230, W, H], fill=(14, 17, 28))
            msg = "Hər gün 13:00-da yeni Bakı faktı — izlə!"; fw = dd.textlength(msg, font=F("Bold", 44)); a = ease(pt / 0.3)
            dd.rounded_rectangle([(W - fw) / 2 - 30, 1500, (W + fw) / 2 + 30, 1580], 40, fill=tuple(int(x * a) for x in GOLD))
            dd.text(((W - fw) / 2, 1512), msg, font=F("Bold", 44), fill=INK)
        dd.rectangle([0, H - 8, W * t / dur, H], fill=GOLD)
        fr.save(f"{tmp}/{i:05d}.jpg", quality=90)
    music(f"{tmp}/m.wav", dur, 26)
    ins, fl = ["-i", f"{tmp}/m.wav"], ["[0:a]volume=0.18[m]"]
    for j, f in enumerate(VO):
        ms = int((starts[j] + 0.1) * 1000); ins += ["-i", f]; fl.append(f"[{j + 1}:a]adelay={ms}|{ms},volume=1.6[v{j}]")
    fl.append("[m]" + "".join(f"[v{j}]" for j in range(4)) + "amix=inputs=5:normalize=0:duration=first[a]")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex", ";".join(fl), "-map", "[a]", "-t", str(dur), f"{tmp}/a.wav"], check=True)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", f"{tmp}/%05d.jpg", "-i", f"{tmp}/a.wav",
                    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "20", "-c:a", "aac", "-b:a", "128k", "-shortest",
                    "-movflags", "+faststart", out], check=True)
    subprocess.run(["rm", "-rf", tmp])

if __name__ == "__main__":
    main()
