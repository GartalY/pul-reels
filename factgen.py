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
    im = shade(cover(load(photo), W, H, cy=c.get("cy", 0.35)), top=0.14, start=0.42)
    d = ImageDraw.Draw(im)
    pill(d, 60, 56, "BİLİRDİNİZMİ?", F("Black", 38), GOLD, INK)
    d.text((W - 60 - d.textlength(HANDLE, font=F("SemiBold", 32)), 66), HANDLE, font=F("SemiBold", 32), fill=WHITE)
    lines = wrap(d, c["text"], F("Bold", 58), W - 120)
    y = H - 90 - len(lines) * 58 * 1.22
    if c.get("title"):
        d.text((60, y - 90), c["title"].upper(), font=F("Black", 46), fill=GOLD)
    text_block(d, 60, y, c["text"], F("Bold", 58), WHITE, W - 120)
    im.save(out, quality=92)

# ---------- reel 1080x1920 ----------
def reel(photo, out, c):
    W, H, FPS = 1080, 1920, 30
    src = load(photo); dur = c.get("dur", 11.0)
    base = cover(src, W, H, cy=c.get("cy", 0.5)) if c.get("full", True) else fit_on_blur(src, W, H)
    tmp = tempfile.mkdtemp()
    hook_end = 2.6
    for i in range(int(dur * FPS)):
        t = i / FPS
        z = 1.0 + 0.10 * t / dur
        fr = base.resize((int(W * z), int(H * z)), Image.BILINEAR)
        fr = fr.crop(((fr.width - W) // 2, (fr.height - H) // 2, (fr.width - W) // 2 + W, (fr.height - H) // 2 + H))
        fr = shade(fr, top=0.26, start=0.48)
        d = ImageDraw.Draw(fr)
        d.text(((W - d.textlength(HANDLE, font=F("SemiBold", 34))) / 2, 110), HANDLE, font=F("SemiBold", 34), fill=WHITE)
        if t < hook_end + 0.3:
            a = ease(t / 0.35) * (1 - ease((t - hook_end) / 0.3))
            col = tuple(int(255 * a) for _ in range(3))
            lines = wrap(d, c["hook"], F("Black", 84), W - 100)
            for k, ln in enumerate(lines):
                d.text(((W - d.textlength(ln, font=F("Black", 84))) / 2, 230 + k * 108), ln, font=F("Black", 84),
                       fill=tuple(int(x * a) for x in GOLD))
        s = t - hook_end
        if s > 0:
            a = ease(s / 0.5)
            pill(d, 70, 1250, "BİLİRDİNİZMİ?", F("Black", 40), GOLD, INK) if a > 0.05 else None
            text_block(d, 70, 1360 + (1 - a) * 40, c["fact"], F("Bold", 62), tuple(int(x * a) for x in WHITE), W - 140)
        if t > dur - 2.3:
            a = ease((t - (dur - 2.3)) / 0.4)
            msg = c.get("cta", "Hekayədə viktorina var — yoxla özünü!")
            fw = d.textlength(msg, font=F("Bold", 44))
            d.rounded_rectangle([(W - fw) / 2 - 30, 1760, (W + fw) / 2 + 30, 1840], 40, fill=tuple(int(x * a) for x in GOLD))
            d.text(((W - fw) / 2, 1772), msg, font=F("Bold", 44), fill=INK)
        d.rectangle([0, H - 8, W * t / dur, H], fill=GOLD)
        fr.save(f"{tmp}/{i:05d}.jpg", quality=90)
    music(f"{tmp}/m.wav", dur, c.get("seed", 1))
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
    text_block(d, 70, 380, c["q"], F("Black", 84), WHITE, W - 140, lh=1.15)
    # space left free (≈ y 900-1500) for the Instagram quiz sticker
    hint = "Cavabı seç ↓"
    d.text(((W - d.textlength(hint, font=F("SemiBold", 44))) / 2, 1640), hint, font=F("SemiBold", 44), fill=(200, 204, 215))
    d.text(((W - d.textlength(HANDLE, font=F("SemiBold", 36))) / 2, 1760), HANDLE, font=F("SemiBold", 36), fill=GOLD)
    im.save(out, quality=92)

if __name__ == "__main__":
    kind, photo, out, cfg = sys.argv[1], sys.argv[2], sys.argv[3], json.loads(sys.argv[4])
    dict(card=card, reel=reel, story=story)[kind](photo, out, cfg)
    print(out)
