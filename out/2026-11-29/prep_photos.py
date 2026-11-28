# Pre-compose 1080x1920 frames per photo. Portrait: cropped above the studio stamp, full-bleed.
# Documents/stage photos: sharp image in the upper area (y 180..), above the beat text box (y 960+), on a dark blurred copy.
import sys; sys.path.insert(0, '.')
from PIL import Image, ImageFilter, ImageEnhance
from factgen import load, cover
W, H = 1080, 1920; D = 'out/2026-11-29/'
p = load('fetch/img/2026-11-29_1_hajibeyov1913.jpg'); p = p.crop((0, 0, p.width, int(p.height * 0.86)))
cover(p, W, H, cy=0.3).save(D + 'p0_portrait.jpg', quality=94)
def upper(src, out, box_h):
    im = load(src)
    bg = ImageEnhance.Brightness(cover(im, W, H).filter(ImageFilter.GaussianBlur(40))).enhance(0.45)
    s = min(1020 / im.width, box_h / im.height); fg = im.resize((int(im.width * s), int(im.height * s)), Image.LANCZOS)
    y = 180 + (box_h - fg.height) // 2 if fg.height < box_h else 180
    bg.paste(fg, ((W - fg.width) // 2, y)); bg.save(out, quality=94)
for name, src, bh in [('p1_poster', 'poster1908', 740), ('p2_program', 'program1908', 1300), ('p3_sarabski', 'sarabski', 820),
                      ('p4_act4', 'act4', 760), ('p5_opera', 'opera1908', 760)]:
    upper(f'fetch/img/2026-11-29_1_{src}.jpg', D + name + '.jpg', bh)
