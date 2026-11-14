"""Whyverse static "photo + words" fact reel (10-15 s, 1080x1920, 30 fps), adapted from factgen.reel.

python3 whyverse/static/factreel.py photo.jpg out.mp4 spec.json [preview_dir]

Layout (safe zones for TikTok / Reels / Shorts buttons and caption overlay):
  y 110        WHYVERSE wordmark
  y 200-470    hook: big number-first line (gold) + sub line (white), visible on frame 0
  y 500-1220   photo band (whole photo, slow push-in) on navy starfield
  y 1250-1450  beats, x 70..890 (kept left of the right-hand buttons), coral counter pill
  y 1480       credit / source line, then CTA in the last 2 s
Sound: quiet non-melodic ambience bed (reelgen.ambience), no music.
"""
import json, os, random, subprocess, sys, tempfile
from PIL import Image, ImageDraw, ImageFilter, ImageOps
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.insert(0, ROOT)
from factgen import F, wrap, ease          # noqa: E402
from reelgen import ambience               # noqa: E402

W, H, FPS = 1080, 1920, 30
NAVY, NAVY2 = (8, 13, 36), (26, 26, 77)
GOLD, CORAL, WHITE, MUTED = (255, 199, 77), (255, 107, 107), (248, 248, 252), (170, 176, 205)
SAFE_X0, SAFE_W = 70, 820
BAND_Y, BAND_H = 500, 720


def background(seed=7):
    bg = Image.new("RGB", (W, H), NAVY)
    g = Image.new("L", (W, H), 0); gd = ImageDraw.Draw(g)
    for r in range(1100, 0, -20):
        gd.ellipse([W / 2 - r, 760 - r, W / 2 + r, 760 + r], fill=int(160 * (1 - r / 1100)))
    bg = Image.composite(Image.new("RGB", (W, H), NAVY2), bg, g.filter(ImageFilter.GaussianBlur(60)))
    d = ImageDraw.Draw(bg); rnd = random.Random(seed)
    for _ in range(170):
        x, y, s = rnd.uniform(0, W), rnd.uniform(0, H), rnd.choice([1, 1, 1.5, 2, 2.5])
        c = int(rnd.uniform(70, 230)); d.ellipse([x - s, y - s, x + s, y + s], fill=(c, c, min(255, c + 15)))
    return bg


def band(photo, cx, cy):
    im = ImageOps.exif_transpose(Image.open(photo)).convert("RGB")
    s = max(W / im.width, BAND_H / im.height)
    r = im.resize((int(im.width * s) + 1, int(im.height * s) + 1), Image.LANCZOS)
    x = int((r.width - W) * cx); y = int((r.height - BAND_H) * cy)
    return r.crop((x, y, x + W, y + BAND_H))


def lines_block(d, x, y, text, font, fill, maxw, lh=1.2, center=False):
    ls = wrap(d, text, font, maxw)
    for i, ln in enumerate(ls):
        xx = (W - d.textlength(ln, font=font)) / 2 if center else x
        d.text((xx, y + i * font.size * lh), ln, font=font, fill=fill)
    return y + len(ls) * font.size * lh


def fadec(c, a, base=NAVY):
    return tuple(int(base[i] + (c[i] - base[i]) * a) for i in range(3))


def build(photo, out, c, previews=None):
    beats = c["beats"]
    HK, OUT = c.get("hook_dur", 1.2), c.get("out_dur", 2.2)
    BT = [max(2.6, 0.25 * len(b.split()) + 0.6) for b in beats]
    ST = [sum(BT[:j]) for j in range(len(beats))]
    dur = HK + sum(BT) + OUT
    bg = background(c.get("seed", 7)); ph = band(photo, c.get("cx", 0.5), c.get("cy", 0.5))
    tmp = tempfile.mkdtemp()
    fh, fs, fb, fp, fsm = F("Black", 170), F("Bold", 50), F("Bold", 52), F("Black", 38), F("Medium", 30)
    for i in range(int(round(dur * FPS))):
        t = i / FPS
        fr = bg.copy()
        z = 1.0 + 0.10 * t / dur                        # slow push-in on the photo band
        p = ph.resize((int(W * z), int(BAND_H * z)), Image.BILINEAR)
        p = p.crop(((p.width - W) // 2, (p.height - BAND_H) // 2, (p.width - W) // 2 + W, (p.height - BAND_H) // 2 + BAND_H))
        m = Image.new("L", (W, BAND_H), 255); md = ImageDraw.Draw(m)
        for k in range(40):                            # soft top/bottom edges into the navy
            a = int(255 * k / 40); md.line([(0, k), (W, k)], fill=a); md.line([(0, BAND_H - 1 - k), (W, BAND_H - 1 - k)], fill=a)
        fr.paste(p, (0, BAND_Y), m)
        d = ImageDraw.Draw(fr)
        wm = "WHYVERSE"; fw = F("Black", 40)
        d.text(((W - d.textlength(wm, font=fw)) / 2, 110), wm, font=fw, fill=GOLD)
        # hook: on frame 0 and kept all through (number = the thumbnail); sub line too
        y = lines_block(d, 0, 190, c["hook"], fh, GOLD, W - 120, lh=1.0, center=True)
        lines_block(d, 0, y + 4, c["hook_sub"], fs, WHITE, W - 60, lh=1.15, center=True)
        s = t - HK
        if s >= 0:
            k = max(j for j in range(len(beats)) if ST[j] <= s); sb = s - ST[k]
            a = ease(sb / 0.25)
            if k < len(beats) - 1: a *= 1 - ease((sb - (BT[k] - 0.25)) / 0.25)
            lab = c.get("first_pill", "DID YOU KNOW?") if k == 0 else f"{k + 1}/{len(beats)}"
            pw = d.textlength(lab, font=fp) + 50
            d.rounded_rectangle([SAFE_X0, 1188, SAFE_X0 + pw, 1188 + 62], 31, fill=fadec(CORAL, a))
            d.text((SAFE_X0 + 25, 1199), lab, font=fp, fill=fadec(NAVY, 1))
            lines_block(d, SAFE_X0, 1272 + (1 - a) * 30, beats[k], fb, fadec(WHITE, a), SAFE_W, lh=1.22)
        d.text((SAFE_X0, 1495), c.get("credit", ""), font=fsm, fill=MUTED)
        if t > dur - OUT:                               # CTA, above the caption overlay
            a = ease((t - (dur - OUT)) / 0.3)
            msg = c.get("cta", "Follow Whyverse for a new \"why\" every day")
            fc = F("Bold", 40); cw = d.textlength(msg, font=fc)
            d.rounded_rectangle([SAFE_X0, 1080, SAFE_X0 + cw + 56, 1080 + 76], 38, fill=fadec(GOLD, a))
            d.text((SAFE_X0 + 28, 1096), msg, font=fc, fill=NAVY)
        d.rectangle([0, H - 8, W * t / dur, H], fill=GOLD)
        fr.save(f"{tmp}/{i:05d}.jpg", quality=92)
        if previews is not None and i in [int(x * FPS) for x in c.get("preview_at", [0, 3.5, 7, 10.5, dur - 0.6])]:
            os.makedirs(previews, exist_ok=True); fr.save(f"{previews}/f_{t:05.1f}.jpg", quality=85)
    ambience(f"{tmp}/m.wav", dur, c.get("seed", 7))
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-framerate", str(FPS), "-i", f"{tmp}/%05d.jpg",
                    "-i", f"{tmp}/m.wav", "-filter:a", "volume=0.9", "-c:v", "libx264", "-pix_fmt", "yuv420p",
                    "-crf", "20", "-c:a", "aac", "-b:a", "128k", "-shortest", "-movflags", "+faststart", out], check=True)
    subprocess.run(["rm", "-rf", tmp])
    return dur


if __name__ == "__main__":
    spec = json.load(open(sys.argv[3]))
    print(build(sys.argv[1], sys.argv[2], spec, sys.argv[4] if len(sys.argv) > 4 else None))
