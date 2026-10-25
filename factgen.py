"""Facts-page generator for @bilirdinizmi_az.

python3 factgen.py card  photo.jpg out.jpg  '{"tag":..,"text":..}'
python3 factgen.py reel  photo.jpg out.mp4  '{"hook":..,"fact":..,"seed":1}'
python3 factgen.py story photo.jpg out.jpg  '{"n":"1/3","q":..}'
"""
import json, subprocess, sys, tempfile, os
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from reelgen import music, wrap, ease

FD = "/usr/share/fonts/opentype/inter/"
def F(w, s): return ImageFont.truetype(FD + f"InterDisplay-{w}.otf", s)
GOLD = (255, 196, 61); WHITE = (250, 250, 252); INK = (14, 17, 28)
HANDLE = "@bilirdinizmi_az"

def load(p):
    """Photo, or a branded background when p is 'none' (photo missing)."""
    if p in (None, "", "none") or not os.path.exists(p):
        im = Image.new("RGB", (1080, 1920), INK); d = ImageDraw.Draw(im)
        for r in range(900, 0, -12):
            a = int(60 * (1 - r / 900)); d.ellipse([540 - r, 700 - r, 540 + r, 700 + r], fill=(14 + a, 17 + a // 2, 28))
        f = F("Black", 520); w = d.textlength("?!", font=f)
        d.text(((1080 - w) / 2, 380), "?!", font=f, fill=(60, 52, 30))
        return im
    return ImageOps.exif_transpose(Image.open(p)).convert("RGB")

def cover(im, w, h, zoom=1.0, cx=0.5, cy=0.5):
    s = max(w / im.width, h / im.height) * zoom
    r = im.resize((int(im.width * s) + 1, int(im.height * s) + 1), Image.LANCZOS)
    x = int((r.width - w) * cx); y = int((r.height - h) * cy)
    return r.crop((x, y, x + w, y + h))

def fit_on_blur(im, w, h, zoom=1.0):
    """Whole photo visible, centred, on a blurred copy of itself."""
    bg = cover(im, w, h).filter(ImageFilter.GaussianBlur(40))
    bg = Image.blend(bg, Image.new("RGB", (w, h), INK), 0.45)
    s = min(w / im.width, h * 0.78 / im.height) * zoom
    fg = im.resize((int(im.width * s), int(im.height * s)), Image.LANCZOS)
    bg.paste(fg, ((w - fg.width) // 2, (h - fg.height) // 2))
    return bg

def shade(im, top=0.0, start=0.45):
    w, h = im.size
    g = Image.new("L", (1, h))
    for y in range(h):
        t = y / h
        a = 0
        if t > start: a = int(235 * min(1, (t - start) / (1 - start) * 1.4))
        if t < top: a = max(a, int(200 * (1 - t / top)))
        g.putpixel((0, y), a)
    return Image.composite(Image.new("RGB", (w, h), INK), im, g.resize((w, h)))

def pill(d, x, y, text, font, fill, tc):
    w = d.textlength(text, font=font) + 56
    d.rounded_rectangle([x, y, x + w, y + font.size + 34], (font.size + 34) // 2, fill=fill)
    d.text((x + 28, y + 14), text, font=font, fill=tc)

def text_block(d, x, y, text, font, fill, maxw, lh=1.22):
    for i, ln in enumerate(wrap(d, text, font, maxw)):
        d.text((x, y + i * font.size * lh), ln, font=font, fill=fill)
    return y + len(wrap(d, text, font, maxw)) * font.size * lh

# ---------- feed card 1080x1350 ----------
def card(photo, out, c):
    W, H = 1080, 1350
    im = shade(cover(load(photo), W, H, cy=c.get("cy", 0.35)), top=0.48 if c.get("hook") else 0.14,
               start=0.62 if c.get("hook") else 0.42)
    d = ImageDraw.Draw(im)
    pill(d, 60, 56, "BİLİRDİNİZMİ?", F("Black", 38), GOLD, INK)
    d.text((W - 60 - d.textlength(HANDLE, font=F("SemiBold", 32)), 66), HANDLE, font=F("SemiBold", 32), fill=WHITE)
    if c.get("hook"):   # v2 cover (2026-10-20): big gold headline on top like the reels, short line at the bottom
        fh = F("Black", 84)
        for k, ln in enumerate(wrap(d, c["hook"], fh, W - 100)):
            d.text(((W - d.textlength(ln, font=fh)) / 2, 150 + k * 104), ln, font=fh, fill=GOLD)
        if c.get("sub"):
            text_block(d, 60, H - 110 - len(wrap(d, c["sub"], F("Bold", 50), W - 120)) * 50 * 1.22 - 40,
                       c["sub"], F("Bold", 50), WHITE, W - 120)
        if c.get("swipe", True):
            sw = "Sürüşdür  →"; f = F("Black", 34); w = d.textlength(sw, font=f) + 56
            d.rounded_rectangle([W - 60 - w, H - 74, W - 60, H - 74 + 62], 31, fill=GOLD)
            d.text((W - 60 - w + 28, H - 74 + 12), sw, font=f, fill=INK)
        im.save(out, quality=92); return
    lines = wrap(d, c["text"], F("Bold", 58), W - 120)
    y = H - 90 - len(lines) * 58 * 1.22
    if c.get("title"):
        d.text((60, y - 90), c["title"].replace("i", "İ").upper(),  # AZ dotted capital İ
               font=F("Black", 46), fill=GOLD)
    text_block(d, 60, y, c["text"], F("Bold", 58), WHITE, W - 120)
    if c.get("swipe"):
        sw = "Sürüşdür  →"; f = F("Black", 34); w = d.textlength(sw, font=f) + 56
        d.rounded_rectangle([W - 60 - w, H - 74, W - 60, H - 74 + 62], 31, fill=GOLD)
        d.text((W - 60 - w + 28, H - 74 + 12), sw, font=f, fill=INK)
    im.save(out, quality=92)

# ---------- reel 1080x1920 ----------
def reel(photo, out, c):
    W, H, FPS = 1080, 1920, 30
    src = load(photo)
    beats = c.get("beats") or [c["fact"]]
    # v2 (2026-10-19): first 3 s were losing ~70% of viewers -> hook fully visible on frame 0, faster beats, ~12 s total
    HK, OUT = 2.0, 1.6
    BTS = [max(2.2, 0.3 * len(b.split()) + 0.6) for b in beats]   # reading time per beat (~3.3 words/s)
    VO = c.get("voice")   # 2026-10-25: optional voice-over, list of mp3s [hook, beat1, ...] from voice.py
    if VO:
        def adur(f): return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                                  "-of", "csv=p=0", f], capture_output=True, text=True).stdout)
        D = [adur(f) for f in VO]
        HK = max(1.5, D[0] + 0.35)
        BTS = [max(2.0, D[j + 1] + 0.35) for j in range(len(beats))]
    START = [sum(BTS[:j]) for j in range(len(beats))]
    dur = c.get("dur", HK + sum(BTS) + OUT)
    base = cover(src, W, H, cy=c.get("cy", 0.5)) if c.get("full", True) else fit_on_blur(src, W, H)
    tmp = tempfile.mkdtemp()
    hook_end = HK
    for i in range(int(dur * FPS)):
        t = i / FPS
        z = 1.0 + 0.16 * t / dur
        fr = base.resize((int(W * z), int(H * z)), Image.BILINEAR)
        fr = fr.crop(((fr.width - W) // 2, (fr.height - H) // 2, (fr.width - W) // 2 + W, (fr.height - H) // 2 + H))
        fr = shade(fr, top=0.26, start=0.48)
        d = ImageDraw.Draw(fr)
        d.text(((W - d.textlength(HANDLE, font=F("SemiBold", 34))) / 2, 110), HANDLE, font=F("SemiBold", 34), fill=WHITE)
        if t < hook_end + 0.3:
            a = 1 - ease((t - hook_end) / 0.3)   # no fade-in: frame 0 = thumbnail = hook
            col = tuple(int(255 * a) for _ in range(3))
            lines = wrap(d, c["hook"], F("Black", 84), W - 100)
            if c.get("hook_bg"):   # 2026-10-22: dark band behind the hook for bright/busy photos
                box = (30, 200, W - 30, 230 + len(lines) * 108 + 20)
                reg = fr.crop(box)
                fr.paste(Image.blend(reg, Image.new("RGB", reg.size, (12, 14, 22)), 0.72 * a), box[:2])
                d = ImageDraw.Draw(fr)
            for k, ln in enumerate(lines):
                d.text(((W - d.textlength(ln, font=F("Black", 84))) / 2, 230 + k * 108), ln, font=F("Black", 84),
                       fill=tuple(int(x * a) for x in GOLD))
        s = t - hook_end
        if s > 0:
            k = max(j for j in range(len(beats)) if START[j] <= s); sb = s - START[k]
            a = ease(sb / 0.25)
            if k < len(beats) - 1: a *= 1 - ease((sb - (BTS[k] - 0.25)) / 0.25)
            pill(d, 70, 1180, "BİLİRDİNİZMİ?" if k == 0 else f"{k + 1}/{len(beats)}", F("Black", 40), GOLD, INK)
            text_block(d, 70, 1290 + (1 - a) * 40, beats[k], F("Bold", 60), tuple(int(x * a) for x in WHITE), W - 140)
        if t > dur - OUT:
            a = ease((t - (dur - OUT)) / 0.3)
            msg = c.get("cta", "Hər gün yeni fakt — izlə!")   # v4 2026-10-25: follow CTA on every reel (was the quiz CTA)
            fw = d.textlength(msg, font=F("Bold", 44))
            d.rounded_rectangle([(W - fw) / 2 - 30, 1760, (W + fw) / 2 + 30, 1840], 40, fill=tuple(int(x * a) for x in GOLD))
            d.text(((W - fw) / 2, 1772), msg, font=F("Bold", 44), fill=INK)
        d.rectangle([0, H - 8, W * t / dur, H], fill=GOLD)
        fr.save(f"{tmp}/{i:05d}.jpg", quality=90)
    music(f"{tmp}/m.wav", dur, c.get("seed", 1))
    if VO:   # voice at its segment start, music ducked underneath
        starts = [0.1] + [HK + START[j] + 0.1 for j in range(len(beats))]
        ins, fl = ["-i", f"{tmp}/m.wav"], [f"[0:a]volume={c.get('music_vol', 0.18)}[m]"]
        for j, (f, st) in enumerate(zip(VO, starts)):
            ins += ["-i", f]; ms = int(st * 1000)
            fl.append(f"[{j + 1}:a]adelay={ms}|{ms},volume=1.6[v{j}]")
        fl.append("[m]" + "".join(f"[v{j}]" for j in range(len(VO))) + f"amix=inputs={len(VO) + 1}:normalize=0:duration=first[a]")
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *ins, "-filter_complex", ";".join(fl),
                        "-map", "[a]", "-t", str(dur), f"{tmp}/mv.wav"], check=True)
        os.replace(f"{tmp}/mv.wav", f"{tmp}/m.wav")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", f"{tmp}/%05d.jpg",
                    "-i", f"{tmp}/m.wav", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "21", "-c:a", "aac",
                    "-b:a", "128k", "-shortest", "-movflags", "+faststart", out], check=True)
    subprocess.run(["rm", "-rf", tmp])

# ---------- quiz story 1080x1920 ----------
def story(photo, out, c):
    W, H = 1080, 1920
    im = cover(load(photo), W, H, cy=c.get("cy", 0.4)).filter(ImageFilter.GaussianBlur(6))
    im = Image.blend(im, Image.new("RGB", (W, H), INK), 0.55)
    d = ImageDraw.Draw(im)
    pill(d, 70, 250, f"VİKTORİNA {c['n']}", F("Black", 42), GOLD, INK)
    y = text_block(d, 70, 380, c["q"], F("Black", 84), WHITE, W - 140, lh=1.15)
    # hint directly under the question, pointing down at the poll sticker placed below it
    hint = "Cavabı seç ↓"
    d.text(((W - d.textlength(hint, font=F("SemiBold", 48))) / 2, y + 60), hint, font=F("SemiBold", 48), fill=GOLD)
    d.text(((W - d.textlength(HANDLE, font=F("SemiBold", 36))) / 2, 1760), HANDLE, font=F("SemiBold", 36), fill=GOLD)
    im.save(out, quality=92)

# ---------- answer story 1080x1920 (auto-published after the poll) ----------
def answer(photo, out, c):
    W, H = 1080, 1920
    im = cover(load(photo), W, H, cy=c.get("cy", 0.4)).filter(ImageFilter.GaussianBlur(6))
    im = Image.blend(im, Image.new("RGB", (W, H), INK), 0.6)
    d = ImageDraw.Draw(im)
    pill(d, 70, 250, f"CAVAB {c['n']}", F("Black", 42), (72, 214, 150), INK)
    y = text_block(d, 70, 380, c["q"], F("Bold", 58), (200, 204, 215), W - 140)
    d.rounded_rectangle([70, y + 60, W - 70, y + 260], 40, fill=(72, 214, 150))
    a = "✓  " + c["a"]
    fa = F("Black", 96)
    d.text(((W - d.textlength(a, font=fa)) / 2, y + 100), a, font=fa, fill=INK)
    text_block(d, 70, y + 340, c["why"], F("SemiBold", 54), WHITE, W - 140)
    msg = "Sən düz tapdın?"
    d.text(((W - d.textlength(msg, font=F("Bold", 50))) / 2, 1620), msg, font=F("Bold", 50), fill=GOLD)
    d.text(((W - d.textlength(HANDLE, font=F("SemiBold", 36))) / 2, 1760), HANDLE, font=F("SemiBold", 36), fill=GOLD)
    im.save(out, quality=92)

# ---------- carousel detail slide 1080x1350 ----------
def slide(photo, out, c):
    """c: {"i": 2, "n": 5, "h": heading/number, "t": text, "cy": ..}"""
    W, H = 1080, 1350
    im = cover(load(photo), W, H, cy=c.get("cy", 0.4)).filter(ImageFilter.GaussianBlur(14))
    im = Image.blend(im, Image.new("RGB", (W, H), INK), 0.78)
    d = ImageDraw.Draw(im)
    pill(d, 60, 56, f"{c['i']}/{c['n']}", F("Black", 36), GOLD, INK)
    d.text((W - 60 - d.textlength(HANDLE, font=F("SemiBold", 32)), 66), HANDLE, font=F("SemiBold", 32), fill=WHITE)
    h = c["h"]; fh = F("Black", 150 if len(h) <= 9 else 84)
    hl = wrap(d, h, fh, W - 120)
    th = wrap(d, c["t"], F("Bold", 56), W - 120)
    total = len(hl) * fh.size * 1.1 + 50 + len(th) * 56 * 1.25
    y = (H - total) / 2
    for ln in hl:
        d.text((60, y), ln, font=fh, fill=GOLD); y += fh.size * 1.1
    d.rectangle([60, y + 34, 180, y + 42], fill=GOLD)
    y += 76
    text_block(d, 60, y, c["t"], F("Bold", 56), WHITE, W - 120, lh=1.25)
    if c["i"] < c["n"]:
        sw = "→"; d.text((W - 60 - d.textlength(sw, font=F("Black", 60)), H - 110), sw, font=F("Black", 60), fill=GOLD)
    im.save(out, quality=92)

# ---------- carousel last slide ----------
def outro(photo, out, c):
    W, H = 1080, 1350
    im = cover(load("none"), W, H); d = ImageDraw.Draw(im)
    pill(d, 60, 56, f"{c['i']}/{c['n']}", F("Black", 36), GOLD, INK)
    y = 430
    for ln, f, col in [("Bunu bilirdin?", F("Black", 96), WHITE),
                       ("Yadda saxla və", F("Bold", 60), (200, 204, 215)),
                       ("bilməyən dostuna göndər", F("Bold", 60), (200, 204, 215))]:
        d.text(((W - d.textlength(ln, font=f)) / 2, y), ln, font=f, fill=col); y += f.size * 1.35
    y += 70
    msg = "Hekayələrdə viktorina — yoxla özünü"; f = F("Bold", 42); w = d.textlength(msg, font=f) + 70
    d.rounded_rectangle([(W - w) / 2, y, (W + w) / 2, y + 84], 42, fill=GOLD)
    d.text(((W - w) / 2 + 35, y + 18), msg, font=f, fill=INK)
    d.text(((W - d.textlength(HANDLE, font=F("Black", 54))) / 2, H - 200), HANDLE, font=F("Black", 54), fill=GOLD)
    im.save(out, quality=92)

# ---------- quiz story v2 1080x1920 (no giveaway photo, previous answer at the bottom) ----------
CAT_COL = {"Tarix": (255, 160, 90), "Təbiət": (72, 214, 150), "Kosmos": (140, 150, 255), "Elm": (90, 200, 255),
           "Coğrafiya": (255, 120, 160), "Texnologiya": (180, 140, 255), "Azərbaycan": (255, 196, 61)}
def quizstory(photo, out, c):
    """c: {"n":"2/5","cat":"Tarix","q":..,"prev":{"q":..,"a":..} | None, "recall": bool}"""
    W, H = 1080, 1920
    col = CAT_COL.get(c.get("cat"), GOLD)
    im = Image.new("RGB", (W, H), INK); d = ImageDraw.Draw(im)
    for r in range(1100, 0, -14):
        a = (1 - r / 1100); d.ellipse([540 - r, 520 - r, 540 + r, 520 + r],
                                      fill=tuple(int(INK[i] + (col[i] - INK[i]) * 0.22 * a) for i in range(3)))
    pill(d, 70, 200, f"VİKTORİNA {c['n']}", F("Black", 42), GOLD, INK)
    x = 70 + d.textlength(f"VİKTORİNA {c['n']}", font=F("Black", 42)) + 56 + 20
    pill(d, x, 200, c.get("cat", "Fakt").replace("i", "İ").upper(), F("Black", 42), col, INK)
    if c.get("recall"):
        d.text((70, 310), "Keçən paylaşımlarımızdan", font=F("SemiBold", 40), fill=(200, 204, 215))
    y = text_block(d, 70, 380, c["q"], F("Black", 80), WHITE, W - 140, lh=1.15)
    if c.get("options"):   # printed options (fully automatic stories, no poll sticker)
        oy = max(y + 90, 760); fo = F("Bold", 58); fl = F("Black", 58)
        for i, opt in enumerate(c["options"]):
            d.rounded_rectangle([70, oy, W - 70, oy + 150], 36, fill=(32, 38, 56))
            d.rounded_rectangle([100, oy + 30, 190, oy + 120], 24, fill=col)
            L = "ABCD"[i]; d.text((145 - d.textlength(L, font=fl) / 2, oy + 38), L, font=fl, fill=INK)
            d.text((225, oy + 42), opt, font=fo, fill=WHITE)
            oy += 180
        hint = "Fikirləş… cavab növbəti hekayədə →"
        d.text(((W - d.textlength(hint, font=F("SemiBold", 46))) / 2, oy + 50), hint, font=F("SemiBold", 46), fill=GOLD)
    else:
        hint = "Cavabı seç ↓"
        d.text(((W - d.textlength(hint, font=F("SemiBold", 48))) / 2, y + 50), hint, font=F("SemiBold", 48), fill=GOLD)
    # (without options) poll sticker goes in the free band below the hint (≈ y+150 … 1440)
    if c.get("prev"):
        p = c["prev"]; top = 1470
        d.rounded_rectangle([70, top, W - 70, top + 250], 36, fill=(28, 34, 50))
        d.text((110, top + 30), "ƏVVƏLKİ SUALIN CAVABI", font=F("Black", 32), fill=(72, 214, 150))
        qq = wrap(d, p["q"], F("SemiBold", 36), W - 220)[0]
        if len(wrap(d, p["q"], F("SemiBold", 36), W - 220)) > 1: qq = qq.rstrip(" ,.") + "…"
        d.text((110, top + 82), qq, font=F("SemiBold", 36), fill=(200, 204, 215))
        d.text((110, top + 140), "✓ " + p["a"], font=F("Black", 62), fill=WHITE)
    d.text(((W - d.textlength(HANDLE, font=F("SemiBold", 36))) / 2, 1790), HANDLE, font=F("SemiBold", 36), fill=GOLD)
    im.save(out, quality=92)

# ---------- answer card shown right after the quiz story (same notification) ----------
def answerstory(photo, out, c):
    """c: {"n":"2/5","cat":..,"q":..,"a":..,"why":..}"""
    W, H = 1080, 1920
    col = CAT_COL.get(c.get("cat"), GOLD); GREEN = (72, 214, 150)
    im = Image.new("RGB", (W, H), INK); d = ImageDraw.Draw(im)
    for r in range(1100, 0, -14):
        a = (1 - r / 1100); d.ellipse([540 - r, 760 - r, 540 + r, 760 + r],
                                      fill=tuple(int(INK[i] + (GREEN[i] - INK[i]) * 0.2 * a) for i in range(3)))
    pill(d, 70, 200, f"CAVAB {c['n']}", F("Black", 42), GREEN, INK)
    x = 70 + d.textlength(f"CAVAB {c['n']}", font=F("Black", 42)) + 56 + 20
    pill(d, x, 200, c.get("cat", "Fakt").replace("i", "İ").upper(), F("Black", 42), col, INK)
    y = text_block(d, 70, 360, c["q"], F("Bold", 56), (200, 204, 215), W - 140)
    fa = F("Black", 104 if len(c["a"]) <= 12 else 76)
    al = wrap(d, "✓ " + c["a"], fa, W - 220)
    bh = len(al) * fa.size * 1.15 + 110
    d.rounded_rectangle([70, y + 60, W - 70, y + 60 + bh], 44, fill=GREEN)
    yy = y + 60 + 55
    for ln in al:
        d.text(((W - d.textlength(ln, font=fa)) / 2, yy), ln, font=fa, fill=INK); yy += fa.size * 1.15
    text_block(d, 70, y + 60 + bh + 70, c.get("why", ""), F("SemiBold", 54), WHITE, W - 140, lh=1.25)
    msg = "Sən düz tapdın?"
    d.text(((W - d.textlength(msg, font=F("Black", 60))) / 2, 1600), msg, font=F("Black", 60), fill=GOLD)
    d.text(((W - d.textlength(HANDLE, font=F("SemiBold", 36))) / 2, 1790), HANDLE, font=F("SemiBold", 36), fill=GOLD)
    im.save(out, quality=92)

# ---------- "Tarixdə bu gün" story 1080x1920 ----------
AZ_MONTHS = ["yanvar","fevral","mart","aprel","may","iyun","iyul","avqust","sentyabr","oktyabr","noyabr","dekabr"]
def todaystory(photo, out, c):
    """c: {"day":17,"month":10,"year":1956,"title":..,"text":..,"cy":..}"""
    W, H = 1080, 1920
    im = cover(load(photo), W, H, cy=c.get("cy", 0.5)).filter(ImageFilter.GaussianBlur(3))
    im = shade(Image.blend(im, Image.new("RGB", (W, H), INK), 0.35), top=0.3, start=0.35)
    d = ImageDraw.Draw(im)
    date = f"{c['day']} {AZ_MONTHS[c['month'] - 1].upper()}"
    pill(d, 70, 200, "TARİXDƏ BU GÜN", F("Black", 42), GOLD, INK)
    d.text((70, 300), date, font=F("Black", 120), fill=WHITE)
    d.text((70, 440), str(c["year"]), font=F("Black", 220), fill=GOLD)
    y = 1000
    y = text_block(d, 70, y, c["title"], F("Black", 76), WHITE, W - 140, lh=1.12) + 40
    text_block(d, 70, y, c["text"], F("SemiBold", 50), (225, 228, 236), W - 140, lh=1.28)
    if c.get("credit"):
        d.text((70, 1730), "Foto: " + c["credit"], font=F("Medium", 28), fill=(170, 175, 190))
    d.text(((W - d.textlength(HANDLE, font=F("SemiBold", 36))) / 2, 1790), HANDLE, font=F("SemiBold", 36), fill=GOLD)
    im.save(out, quality=92)

if __name__ == "__main__":
    kind, photo, out, cfg = sys.argv[1], sys.argv[2], sys.argv[3], json.loads(sys.argv[4])
    dict(card=card, reel=reel, story=story, answer=answer, slide=slide, outro=outro,
         quizstory=quizstory, answerstory=answerstory, todaystory=todaystory)[kind](photo, out, cfg)
    print(out)
