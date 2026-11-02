"""Whyverse brand kit: profile picture (1080) + YouTube banner (2560x1440)."""
import cairo, math, random, numpy as np
from scipy import ndimage
from PIL import Image, ImageFilter
OUT = "/home/claude/pul-reels/whyverse/brand/"
BG1, BG2 = (0.03, 0.05, 0.14), (0.10, 0.10, 0.30)
GOLD, CORAL = (1.0, 0.78, 0.30), (1.0, 0.42, 0.42)

def surf(w, h):
    s = cairo.ImageSurface(cairo.FORMAT_ARGB32, w, h); return s, cairo.Context(s)

def space(c, w, h, seed, n):
    g = cairo.RadialGradient(w * .5, h * .35, 0, w * .5, h * .5, max(w, h) * .8)
    g.add_color_stop_rgb(0, *BG2); g.add_color_stop_rgb(1, *BG1)
    c.set_source(g); c.paint()
    r = random.Random(seed)
    for _ in range(n):
        x, y, rad = r.uniform(0, w), r.uniform(0, h), r.choice([1, 1, 1.5, 2, 2.5])
        c.set_source_rgba(1, 1, 1, r.uniform(.25, .9)); c.arc(x, y, rad * w / 1080 * .9 + .4, 0, 7); c.fill()

def qmark_mask(size, scale):
    s, c = surf(size, size)
    c.select_font_face("Inter Display", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD)
    c.set_font_size(size * scale)
    xb, yb, tw, th, _, _ = c.text_extents("?")
    c.move_to((size - tw) / 2 - xb, (size - th) / 2 - yb); c.set_source_rgb(1, 1, 1); c.text_path("?"); c.fill()
    a = np.ndarray((size, size, 4), np.uint8, s.get_data())[..., 3].astype(float) / 255
    lab, n = ndimage.label(a > .5); sizes = ndimage.sum(np.ones_like(a), lab, range(1, n + 1))
    hook = ndimage.binary_dilation(lab == (np.argmax(sizes) + 1), iterations=3) * a
    dot = lab == (np.argmin(sizes) + 1); cy, cx = ndimage.center_of_mass(dot)
    rad = math.sqrt(dot.sum() / math.pi)
    return hook, (cx, cy, rad)

def planet(c, x, y, r, ring=True):
    if ring:  # back half of ring
        ringpath(c, x, y, r, back=True)
    g = cairo.RadialGradient(x - r * .4, y - r * .45, r * .1, x, y, r * 1.05)
    g.add_color_stop_rgb(0, .55, .95, 1.0); g.add_color_stop_rgb(.55, .16, .55, .95); g.add_color_stop_rgb(1, .08, .16, .45)
    c.set_source(g); c.arc(x, y, r, 0, 2 * math.pi); c.fill()
    if ring: ringpath(c, x, y, r, back=False)

def ringpath(c, x, y, r, back):
    c.save(); c.translate(x, y); c.rotate(-0.38); c.scale(1, .28)
    if back: c.arc(0, 0, r * 1.7, math.pi, 2 * math.pi)
    else: c.arc(0, 0, r * 1.7, 0, math.pi)
    c.restore(); c.set_line_width(r * .16); c.set_line_cap(cairo.LINE_CAP_ROUND)
    c.set_source_rgba(1, .93, .8, .95); c.stroke()

def gradient_fill(mask, w, h, x0, y0, x1, y1):
    yy, xx = np.mgrid[0:h, 0:w]
    t = np.clip(((xx - x0) * (x1 - x0) + (yy - y0) * (y1 - y0)) / ((x1 - x0) ** 2 + (y1 - y0) ** 2), 0, 1)[..., None]
    col = np.array(GOLD) * (1 - t) + np.array(CORAL) * t
    rgba = np.dstack([col * 255, mask * 255]).astype(np.uint8)
    return Image.fromarray(rgba, "RGBA")

def to_pil(s):
    a = np.ndarray((s.get_height(), s.get_width(), 4), np.uint8, s.get_data()).copy()
    return Image.fromarray(a[..., [2, 1, 0, 3]], "RGBA")

def glow(img, rad, strength):
    g = img.filter(ImageFilter.GaussianBlur(rad)); a = np.array(g).astype(float); a[..., 3] *= strength
    return Image.fromarray(a.clip(0, 255).astype(np.uint8), "RGBA")

def mark(size, scale=0.82):
    """Transparent '?' mark: gradient hook + ringed planet as the dot."""
    hook, (cx, cy, rad) = qmark_mask(size, scale)
    im = gradient_fill(hook, size, size, size * .3, size * .1, size * .7, size * .9)
    s, c = surf(size, size); planet(c, cx, cy + rad * .1, rad * 1.25)
    p = to_pil(s); base = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    base.alpha_composite(glow(im, size / 40, .9)); base.alpha_composite(im); base.alpha_composite(p)
    return base

# --- profile picture
S = 1080; s, c = surf(S, S); space(c, S, S, 7, 160)
bg = to_pil(s); m = mark(S, .84); bg.alpha_composite(m, (0, -30))
bg.convert("RGB").save(OUT + "whyverse_profile_1080.png")
# circle preview (how it looks cropped)
circ = Image.new("L", (S, S), 0); from PIL import ImageDraw; ImageDraw.Draw(circ).ellipse((0, 0, S, S), fill=255)
prev = Image.new("RGB", (S, S), (255, 255, 255)); prev.paste(bg.convert("RGB"), mask=circ); prev.resize((200, 200), Image.LANCZOS).save(OUT + "_preview_circle_small.png")

# --- YouTube banner 2560x1440, safe area 1546x423 centred
W, H = 2560, 1440; s, c = surf(W, H); space(c, W, H, 3, 900)
# big planet horizon bottom-right + small moon left
g = cairo.RadialGradient(W * .86, H * 1.25, 50, W * .86, H * 1.25, 760)
g.add_color_stop_rgb(0, .2, .6, 1); g.add_color_stop_rgb(.85, .1, .25, .7); g.add_color_stop_rgba(1, .05, .1, .3, 1)
c.set_source(g); c.arc(W * .86, H * 1.25, 700, 0, 7); c.fill()
c.set_source_rgba(.5, .8, 1, .25); c.set_line_width(14); c.arc(W * .86, H * 1.25, 707, 0, 7); c.stroke()
g = cairo.RadialGradient(W * .13 - 30, H * .25 - 30, 5, W * .13, H * .25, 95)
g.add_color_stop_rgb(0, 1, .9, .7); g.add_color_stop_rgb(1, .75, .45, .35); c.set_source(g); c.arc(W * .13, H * .25, 90, 0, 7); c.fill()
# wordmark
cx, cy = W / 2, H / 2
c.select_font_face("Inter Display", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_BOLD); c.set_font_size(190)
word = "WHYVERSE"; xb, yb, tw, th, _, _ = c.text_extents(word)
mk = 400; gap = 10; total = mk + gap + tw; x0 = cx - total / 2; tx = x0 + mk + gap
base_y = cy + 10            # baseline of WHYVERSE (caps sit above it)
c.move_to(tx - xb, base_y); c.set_source_rgb(1, 1, 1); c.show_text(word)
c.select_font_face("Inter", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL); c.set_font_size(64)
tag = "Big questions. Visual answers."; xb2, yb2, tw2, th2, _, _ = c.text_extents(tag)
c.move_to(tx - xb2 + 8, base_y + 105); c.set_source_rgb(*GOLD); c.show_text(tag)
ban = to_pil(s); ban.alpha_composite(mark(mk, .95), (int(x0), int(cy - mk / 2 - 5)))
ban.convert("RGB").save(OUT + "whyverse_youtube_banner_2560x1440.png")
# safe-area check overlay
chk = ban.copy(); d = ImageDraw.Draw(chk)
d.rectangle((W/2-773, H/2-211.5, W/2+773, H/2+211.5), outline=(0, 255, 0, 255), width=6)
chk.convert("RGB").resize((1280, 720)).save(OUT + "_check_safe_area.jpg")
print("ok")
